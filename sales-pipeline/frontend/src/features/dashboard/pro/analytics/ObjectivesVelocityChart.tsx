import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Lead } from '../../../../types/lead';
import { format, subDays, startOfDay, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

interface ObjectivesVelocityChartProps {
    leads: Lead[];
}

export function ObjectivesVelocityChart({ leads }: ObjectivesVelocityChartProps) {
    // Last 14 days
    const days = Array.from({ length: 14 }, (_, i) => subDays(new Date(), i)).reverse();

    const data = days.map(day => {
        // Count leads with at least one objective achieved by this day (cumulative)
        // For simplicity, we'll just count daily achievements
        const count = leads.filter(l =>
            (l.email_captured || l.meeting_scheduled) &&
            isSameDay(new Date(l.last_interaction_at), day)
        ).length;

        return {
            date: format(day, 'dd/MM', { locale: es }),
            value: count
        };
    });

    return (
        <div className="h-[100px] w-full mt-4">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Velocidad de Captación</h4>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb', fontSize: '12px' }}
                        itemStyle={{ color: '#f9fafb' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
