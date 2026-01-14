import React, { useState } from 'react';
import { Lead } from '../../../types/lead';
import { Mail, Phone, MessageCircle, Play, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface LeadsTableCaptationProps {
    leads: Lead[];
    onLeadClick: (lead: Lead) => void;
    onChatClick: (lead: Lead) => void;
}

type SortKey = 'status' | 'lead' | 'date' | 'score' | 'confidence';
type SortDirection = 'asc' | 'desc';

export function LeadsTableCaptation({ leads, onLeadClick, onChatClick }: LeadsTableCaptationProps) {
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>({ key: 'confidence', direction: 'desc' });

    const handleSort = (key: SortKey) => {
        let direction: SortDirection = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedLeads = React.useMemo(() => {
        let sortableLeads = [...leads];
        if (sortConfig !== null) {
            sortableLeads.sort((a, b) => {
                let aValue: any;
                let bValue: any;

                switch (sortConfig.key) {
                    case 'status':
                        aValue = a.capture_status || a.current_status;
                        bValue = b.capture_status || b.current_status;
                        break;
                    case 'lead':
                        aValue = a.last_known_name || '';
                        bValue = b.last_known_name || '';
                        break;
                    case 'date':
                        aValue = new Date(a.last_interaction_at).getTime();
                        bValue = new Date(b.last_interaction_at).getTime();
                        break;
                    case 'score':
                    case 'confidence': // Using score for confidence column for now
                        aValue = a.lead_score;
                        bValue = b.lead_score;
                        break;
                    default:
                        return 0;
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableLeads;
    }, [leads, sortConfig]);

    const getSortIcon = (key: SortKey) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <ArrowUpDown className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-50 transition-opacity" />;
        }
        return sortConfig.direction === 'asc'
            ? <ArrowUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            : <ArrowDown className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />;
    };

    const SortableHeader = ({ label, sortKey, className = "" }: { label: string, sortKey: SortKey, className?: string }) => (
        <th
            scope="col"
            className={`px-3 md:px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors select-none ${className}`}
            onClick={() => handleSort(sortKey)}
        >
            <div className="flex items-center gap-1">
                {label}
                {getSortIcon(sortKey)}
            </div>
        </th>
    );

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            'Prospect': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700',
            'Lead_Qualified': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800',
            'Meeting_Booked': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800',
            'Lost': 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 border border-red-100 dark:border-red-800',
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap ${styles[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
                {status.replace('_', ' ')}
            </span>
        );
    };

    const getGoalBadge = (lead: Lead) => {
        if (lead.meeting_scheduled) return <span className="px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800 whitespace-nowrap">Reunión</span>;
        if (lead.email_captured) return <span className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-100 dark:border-blue-800 whitespace-nowrap">Email</span>;
        return <span className="px-2 py-0.5 rounded text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">Pendiente</span>;
    };

    return (
        <div className="w-full overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-950">
                    <thead className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
                        <tr>
                            <SortableHeader label="Status" sortKey="status" className="hidden md:table-cell" />
                            <SortableHeader label="Lead" sortKey="lead" />
                            <SortableHeader label="Fecha" sortKey="date" className="hidden sm:table-cell" />
                            <th scope="col" className="hidden lg:table-cell px-3 md:px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Capture Goal</th>
                            <SortableHeader label="Score" sortKey="confidence" className="hidden xl:table-cell" />
                            <th scope="col" className="hidden xl:table-cell px-3 md:px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Canales</th>
                            <th scope="col" className="hidden lg:table-cell px-3 md:px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Próximo Paso</th>
                            <th scope="col" className="px-3 md:px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {sortedLeads.map((lead) => {
                            const isWhatsapp = lead.contact_channels?.includes('whatsapp') || lead.remote_jid.includes('@s.whatsapp.net');
                            return (
                                <tr
                                    key={lead.remote_jid}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-900/60 transition-colors group"
                                >
                                    <td className="hidden md:table-cell px-3 md:px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(lead.capture_status || lead.current_status)}
                                    </td>
                                    <td className="px-3 md:px-6 py-4">
                                        <div className="flex flex-col min-w-0">
                                            <span
                                                onClick={() => onLeadClick(lead)}
                                                className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                                                title={lead.last_known_name || 'Desconocido'}
                                            >
                                                {lead.last_known_name || 'Desconocido'}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-500 truncate font-mono md:hidden">{lead.remote_jid.slice(0, 20)}...</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-500 truncate font-mono hidden md:inline">{lead.remote_jid}</span>
                                            {/* Mobile: Show status badge below name */}
                                            <div className="md:hidden mt-1">
                                                {getStatusBadge(lead.capture_status || lead.current_status)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden sm:table-cell px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                                        {new Date(lead.last_interaction_at).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                                    </td>
                                    <td className="hidden lg:table-cell px-3 md:px-6 py-4 whitespace-nowrap">
                                        {getGoalBadge(lead)}
                                    </td>
                                    <td className="hidden xl:table-cell px-3 md:px-6 py-4 whitespace-nowrap align-middle">
                                        <div className="w-full max-w-[100px]">
                                            <div className="flex items-center justify-between text-xs mb-1">
                                                <span className="text-gray-500 dark:text-gray-400 font-mono">{lead.lead_score}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className={`h-1.5 rounded-full ${lead.lead_score > 70 ? 'bg-emerald-500' :
                                                        lead.lead_score > 40 ? 'bg-amber-500' : 'bg-red-500'
                                                        }`}
                                                    style={{ width: `${lead.lead_score}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden xl:table-cell px-3 md:px-6 py-4 whitespace-nowrap">
                                        <div className="flex gap-2">
                                            {lead.contact_channels?.includes('email') && <Mail className="h-4 w-4 text-gray-400 dark:text-gray-600" />}
                                            {lead.contact_channels?.includes('phone') && <Phone className="h-4 w-4 text-gray-400 dark:text-gray-600" />}
                                            {isWhatsapp && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onChatClick(lead);
                                                    }}
                                                    className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full transition-colors group/icon"
                                                    title="Ver historial de chat"
                                                >
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="h-4 w-4 text-gray-400 dark:text-gray-600 group-hover/icon:text-green-500 dark:group-hover/icon:text-green-400 transition-colors fill-current"
                                                    >
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="hidden lg:table-cell px-3 md:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        <p className="truncate max-w-[200px] xl:max-w-[400px]" title={lead.recommended_next_step || 'N/A'}>
                                            {lead.recommended_next_step || 'N/A'}
                                        </p>
                                    </td>
                                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onLeadClick(lead);
                                            }}
                                            className="inline-flex items-center px-2 md:px-3 py-1.5 border border-gray-200 dark:border-gray-700 text-xs font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm hover:shadow"
                                        >
                                            <Play className="h-3 w-3 mr-0 md:mr-1.5 text-indigo-500" />
                                            <span className="hidden md:inline">Ejecutar</span>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
