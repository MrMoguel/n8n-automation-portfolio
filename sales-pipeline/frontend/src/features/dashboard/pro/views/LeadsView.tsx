import React from 'react';
import { LeadsTableCaptation } from '../LeadsTableCaptation';
import { KPISectionCaptation } from '../KPISectionCaptation';
import { Lead } from '../../../../types/lead';

interface LeadsViewProps {
    leads: Lead[];
    onLeadClick: (lead: Lead) => void;
    onChatClick: (lead: Lead) => void;
}

export function LeadsView({ leads, onLeadClick, onChatClick }: LeadsViewProps) {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detalle de Leads</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Gestiona y revisa el estado de tus prospectos
                    </p>
                </div>
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                    {leads.length} Total
                </span>
            </div>

            <KPISectionCaptation leads={leads} />

            <LeadsTableCaptation
                leads={leads}
                onLeadClick={onLeadClick}
                onChatClick={onChatClick}
            />
        </div>
    );
}
