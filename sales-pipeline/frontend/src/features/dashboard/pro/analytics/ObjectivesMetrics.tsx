import React from 'react';
import { Lead } from '../../../../types/lead';
import { Mail, Calendar, FileText, CheckCircle } from 'lucide-react';

interface ObjectivesMetricsProps {
    leads: Lead[];
}

export function ObjectivesMetrics({ leads }: ObjectivesMetricsProps) {
    const total = leads.length || 1;

    const metrics = [
        {
            label: 'Email Capturado',
            value: Math.round((leads.filter(l => l.email_captured).length / total) * 100),
            icon: Mail,
            color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
        },
        {
            label: 'Reunión Propuesta',
            value: Math.round((leads.filter(l => l.meeting_scheduled).length / total) * 100),
            icon: Calendar,
            color: 'text-green-500 bg-green-100 dark:bg-green-900/20'
        },
        {
            label: 'Presentación Enviada',
            value: 0, // Mock
            icon: FileText,
            color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/20'
        },
        {
            label: 'Seguimiento Conf.',
            value: 0, // Mock
            icon: CheckCircle,
            color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/20'
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className={`p-2 rounded-full ${m.color.split(' ')[1]}`}>
                        <m.icon className={`h-4 w-4 ${m.color.split(' ')[0]}`} />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{m.value}%</div>
                        <div className="text-[10px] text-gray-500 uppercase leading-tight">{m.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
