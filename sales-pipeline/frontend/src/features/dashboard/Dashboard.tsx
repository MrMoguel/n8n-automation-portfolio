import { useState, useEffect } from 'react';
import { fetchLeads } from '../../services/api';
import { Lead } from '../../types/lead';
import { KPISection } from './KPISection';
import { LeadsTable } from './LeadsTable';
import { LeadDetail } from './LeadDetail';
import { Modal } from '../../components/ui/Modal';
import { LayoutDashboard, RefreshCw } from 'lucide-react';

export function Dashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

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

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                            <LayoutDashboard className="h-5 w-5" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">Lead Intelligence Center</h1>
                    </div>
                    <button
                        onClick={loadData}
                        disabled={loading}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh Data
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {/* KPI Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
                        {loading ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-32 rounded-xl bg-gray-200 animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <KPISection leads={leads} />
                        )}
                    </section>

                    {/* Main Table Section */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h2>
                        {loading ? (
                            <div className="h-96 rounded-xl bg-gray-200 animate-pulse" />
                        ) : (
                            <LeadsTable leads={leads} onLeadClick={setSelectedLead} />
                        )}
                    </section>
                </div>
            </main>

            {/* Detail Modal */}
            <Modal
                isOpen={!!selectedLead}
                onClose={() => setSelectedLead(null)}
                title="Lead Details"
            >
                {selectedLead && <LeadDetail lead={selectedLead} />}
            </Modal>
        </div>
    );
}
