import { useState } from 'react';
import { Lead } from '../../types/lead';
import { Badge } from '../../components/ui/Badge';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpDown, ChevronRight } from 'lucide-react';

interface LeadsTableProps {
    leads: Lead[];
    onLeadClick: (lead: Lead) => void;
}

type SortField = 'lead_score' | 'last_interaction_at' | 'estimated_deal_value';
type SortDirection = 'asc' | 'desc';

export function LeadsTable({ leads, onLeadClick }: LeadsTableProps) {
    const [sortField, setSortField] = useState<SortField>('last_interaction_at');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

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

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Lead</th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:text-gray-700"
                                onClick={() => handleSort('lead_score')}
                            >
                                <div className="flex items-center gap-1">
                                    Score
                                    <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </th>
                            <th className="px-6 py-4">Intent</th>
                            <th className="px-6 py-4">Suggested Action</th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:text-gray-700"
                                onClick={() => handleSort('last_interaction_at')}
                            >
                                <div className="flex items-center gap-1">
                                    Last Activity
                                    <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sortedLeads.map((lead) => (
                            <tr
                                key={lead.remote_jid}
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={() => onLeadClick(lead)}
                            >
                                <td className="px-6 py-4">
                                    <Badge variant={getStatusVariant(lead.current_status)}>
                                        {lead.current_status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{lead.last_known_name}</div>
                                    <div className="text-xs text-gray-500">{lead.remote_jid.split('@')[0]}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-16 rounded-full bg-gray-100 overflow-hidden">
                                            <div
                                                className={`h-full ${getScoreColor(lead.lead_score)}`}
                                                style={{ width: `${lead.lead_score}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium">{lead.lead_score}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 max-w-xs truncate text-gray-600">
                                    {lead.buying_intent}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-indigo-600">{lead.suggested_action}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {formatDistanceToNow(new Date(lead.last_interaction_at), { addSuffix: true })}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
