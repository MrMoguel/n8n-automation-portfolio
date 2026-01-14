import React, { useEffect, useState, useMemo } from 'react';
import { fetchLeads } from '../../../services/api';
import { Lead } from '../../../types/lead';
import { FilterBar } from './FilterBar';
import { KPISectionPro } from './KPISectionPro';
import { AnalyticsGrid } from './AnalyticsGrid';
import { SmartTable } from './SmartTable';
import { LeadDetail } from '../LeadDetail';
import { Modal } from '../../../components/ui/Modal';
import { RefreshCw, Zap, Moon, Sun } from 'lucide-react';
import { parseISO, subDays, isAfter } from 'date-fns';

export function DashboardPro() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const [filters, setFilters] = useState({
        dateRange: 'all',
        temperature: 'all',
        status: 'all'
    });

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await fetchLeads();
            setLeads(data);
        } catch (error) {
            console.error('Failed to load leads', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredLeads = useMemo(() => {
        return leads.filter(lead => {
            // Date Filter
            if (filters.dateRange !== 'all') {
                const days = filters.dateRange === '7d' ? 7 : 30;
                const cutoffDate = subDays(new Date(), days);
                if (!isAfter(parseISO(lead.last_interaction_at), cutoffDate)) {
                    return false;
                }
            }

            // Temperature Filter
            if (filters.temperature !== 'all' && lead.temperature !== filters.temperature) {
                return false;
            }

            // Status Filter
            if (filters.status !== 'all' && lead.current_status !== filters.status) {
                return false;
            }

            return true;
        });
    }, [leads, filters]);

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50/50 text-gray-900'}`}>
            {/* Top Navigation Bar */}
            <header className={`sticky top-0 z-30 border-b backdrop-blur-sm transition-colors duration-300 ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
                <div className="mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
                            <Zap className="h-5 w-5" />
                        </div>
                        <h1 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Sales & AI <span className="text-indigo-500">Command Center</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            aria-label="Toggle Dark Mode"
                        >
                            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={loadData}
                            disabled={loading}
                            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${darkMode
                                    ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            <span className="hidden sm:inline">Actualizar Datos</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Global Filter Bar */}
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            <main className="mx-auto max-w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* KPI Section */}
                    <KPISectionPro leads={filteredLeads} />

                    {/* Analytics Grid */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analítica en Tiempo Real</h2>
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{filteredLeads.length} leads analizados</span>
                        </div>
                        <AnalyticsGrid leads={filteredLeads} />
                    </section>

                    {/* Smart Table */}
                    <section>
                        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Detalle de Leads</h2>
                        <SmartTable leads={filteredLeads} onLeadClick={setSelectedLead} />
                    </section>
                </div>
            </main>

            {/* Detail Modal */}
            <Modal
                isOpen={!!selectedLead}
                onClose={() => setSelectedLead(null)}
                title="Detalle del Lead"
            >
                {selectedLead && <LeadDetail lead={selectedLead} />}
            </Modal>
        </div>
    );
}
