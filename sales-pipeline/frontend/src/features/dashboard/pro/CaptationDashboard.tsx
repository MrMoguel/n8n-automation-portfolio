import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { Navbar } from './Navbar';
import { LeadsView } from './views/LeadsView';
import { StatsView } from './views/StatsView';
import { LeadDetailModal } from './LeadDetailModal';
import { ChatHistoryModal } from './ChatHistoryModal';
import { Lead } from '../../../types/lead';
import { subDays } from 'date-fns';
import { fetchLeads } from '../../../services/api';

export default function CaptationDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [selectedChatLead, setSelectedChatLead] = useState<Lead | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'leads' | 'stats'>('leads');

    const [filters, setFilters] = useState({
        dateRange: 'all',
        temperature: 'all',
        status: 'all'
    });

    // Initialize Theme
    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        setTheme(initialTheme);

        // Apply class immediately
        if (initialTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);

            // Direct DOM manipulation to ensure it works
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            return newTheme;
        });
    };

    const loadLeads = async () => {
        setIsLoading(true);
        try {
            const data = await fetchLeads();
            setLeads(data);
        } catch (error) {
            console.error("Error loading leads:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Load Data on Mount
    useEffect(() => {
        loadLeads();
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = [...leads];

        // Date Filter
        const now = new Date();
        if (filters.dateRange === '7d') {
            const limit = subDays(now, 7);
            result = result.filter(l => new Date(l.last_interaction_at) >= limit);
        } else if (filters.dateRange === '30d') {
            const limit = subDays(now, 30);
            result = result.filter(l => new Date(l.last_interaction_at) >= limit);
        }

        // Status Filter
        if (filters.status !== 'all') {
            result = result.filter(l => l.capture_status === filters.status);
        }

        // Temperature Filter
        if (filters.temperature !== 'all') {
            result = result.filter(l => l.temperature === filters.temperature);
        }

        setFilteredLeads(result);
    }, [leads, filters]);

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    if (isLoading && leads.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
                <LoadingSpinner size="lg" text="Cargando leads..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 font-sans">
            <Navbar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                toggleTheme={toggleTheme}
                theme={theme}
                onRefresh={loadLeads}
                isLoading={isLoading}
            />

            <main className={`mx-auto px-4 sm:px-6 lg:px-8 py-8 ${activeTab === 'leads' ? 'w-full max-w-full' : 'max-w-7xl'}`}>
                {activeTab === 'leads' ? (
                    <LeadsView
                        leads={filteredLeads}
                        onLeadClick={setSelectedLead}
                        onChatClick={setSelectedChatLead}
                    />
                ) : (
                    <StatsView
                        leads={filteredLeads}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                    />
                )}
            </main>

            {/* Lead Detail Modal */}
            {selectedLead && (
                <LeadDetailModal
                    lead={selectedLead}
                    onClose={() => setSelectedLead(null)}
                />
            )}

            {/* Chat History Modal */}
            {selectedChatLead && (
                <ChatHistoryModal
                    lead={selectedChatLead}
                    onClose={() => setSelectedChatLead(null)}
                />
            )}
        </div>
    );
}
