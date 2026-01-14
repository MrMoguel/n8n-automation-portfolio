import React, { useState } from 'react';
import { Lead } from '../../../types/lead';
import { Badge } from '../../../components/ui/Badge';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowUpDown, ChevronLeft, ChevronRight, Phone, AlertCircle } from 'lucide-react';

interface SmartTableProps {
    leads: Lead[];
    onLeadClick: (lead: Lead) => void;
}

type SortField = 'lead_score' | 'last_interaction_at' | 'estimated_deal_value';
type SortDirection = 'asc' | 'desc';

export function SmartTable({ leads, onLeadClick }: SmartTableProps) {
    const [sortField, setSortField] = useState<SortField>('last_interaction_at');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const sortedLeads = [...leads].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedLeads.length / itemsPerPage);
    const paginatedLeads = sortedLeads.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getStatusVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'converted': return 'success';
            case 'new': return 'default';
            case 'qualifying': return 'secondary';
            case 'lost': return 'destructive';
            default: return 'outline';
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'bg-green-500';
        if (score >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        }).format(value);
    };

    const formatPhone = (jid: string) => {
        const number = jid.split('@')[0];
        if (number.startsWith('569')) {
            return `+56 9 ${number.slice(3, 7)} ${number.slice(7)}`;
        }
        return number;
    };

    const translateStatus = (status: string) => {
        const map: Record<string, string> = {
            'New': 'Nuevo',
            'Qualifying': 'Calificando',
            'Nurturing': 'Nutriendo',
            'Converted': 'Convertido',
            'Lost': 'Perdido'
        };
        return map[status] || status;
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm flex flex-col transition-colors">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">Lead</th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                                onClick={() => handleSort('lead_score')}
                            >
                                <div className="flex items-center gap-1">
                                    Score
                                    <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </th>
                            <th className="px-6 py-4">Intención</th>
                            <th className="px-6 py-4">Acción Sugerida</th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                                onClick={() => handleSort('estimated_deal_value')}
                            >
                                <div className="flex items-center gap-1">
                                    Valor
                                    <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                                onClick={() => handleSort('last_interaction_at')}
                            >
                                <div className="flex items-center gap-1">
                                    Última Actividad
                                    <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {paginatedLeads.map((lead) => (
                            <tr
                                key={lead.remote_jid}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                                onClick={() => onLeadClick(lead)}
                            >
                                <td className="px-6 py-4">
                                    <Badge variant={getStatusVariant(lead.current_status)}>
                                        {translateStatus(lead.current_status)}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900 dark:text-gray-100">
                                        {lead.last_known_name || <span className="text-gray-400 italic">Lead Desconocido</span>}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        <Phone className="h-3 w-3" />
                                        {formatPhone(lead.remote_jid)}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {lead.lead_score < 0 ? (
                                            <div className="flex items-center gap-1 text-red-600 font-bold">
                                                <AlertCircle className="h-4 w-4" />
                                                {lead.lead_score}
                                            </div>
                                        ) : (
                                            <>
                                                <div className="h-2 w-16 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                                                    <div
                                                        className={`h-full ${getScoreColor(lead.lead_score)}`}
                                                        style={{ width: `${Math.max(0, lead.lead_score)}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{lead.lead_score}</span>
                                            </>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 max-w-xs truncate text-gray-600 dark:text-gray-300">
                                    {lead.buying_intent}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-indigo-600 dark:text-indigo-400">{lead.suggested_action}</span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                                    {formatCurrency(lead.estimated_deal_value)}
                                </td>
                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                    {formatDistanceToNow(parseISO(lead.last_interaction_at), { addSuffix: true, locale: es })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    Mostrando <span className="font-medium text-gray-900 dark:text-gray-100">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium text-gray-900 dark:text-gray-100">{Math.min(currentPage * itemsPerPage, leads.length)}</span> de <span className="font-medium text-gray-900 dark:text-gray-100">{leads.length}</span> resultados
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 dark:text-gray-300"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 dark:text-gray-300"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
