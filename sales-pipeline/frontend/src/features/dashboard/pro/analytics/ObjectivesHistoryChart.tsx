import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Lead } from '../../../../types/lead';
import { format, subWeeks, startOfWeek, endOfWeek, isWithinInterval, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface ObjectivesHistoryChartProps {
    leads: Lead[];
}

export function ObjectivesHistoryChart({ leads }: ObjectivesHistoryChartProps) {
    // Generate last 8 weeks data
    const weeks = Array.from({ length: 8 }, (_, i) => {
        const date = subWeeks(new Date(), i);
        return {
            start: startOfWeek(date, { weekStartsOn: 1 }),
            end: endOfWeek(date, { weekStartsOn: 1 }),
            label: `Sem ${format(date, 'w', { locale: es })}`
        };
    }).reverse();

    const data = weeks.map(week => {
        const weekLeads = leads.filter(l => {
            try {
                return isWithinInterval(parseISO(l.last_interaction_at), { start: week.start, end: week.end });
            } catch {
                return false;
            }
        });

        return {
            name: week.label,
            email_captured: weekLeads.filter(l => l.email_captured).length,
            meeting_proposed: weekLeads.filter(l => l.meeting_scheduled).length, // Using meeting_scheduled as proxy
            presentation_sent: 0, // Mock as we don't have this field yet
            followup_confirmed: 0, // Mock
            none: weekLeads.filter(l => !l.email_captured && !l.meeting_scheduled).length
        };
    });

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                        itemStyle={{ color: '#f9fafb' }}
                    />
                    <Legend />
                    <Bar dataKey="email_captured" stackId="a" fill="#3b82f6" name="Email Capturado" />
                    <Bar dataKey="meeting_proposed" stackId="a" fill="#10b981" name="Reunión Propuesta" />
                    <Bar dataKey="presentation_sent" stackId="a" fill="#f59e0b" name="Presentación" />
                    <Bar dataKey="followup_confirmed" stackId="a" fill="#8b5cf6" name="Seguimiento" />
                    <Bar dataKey="none" stackId="a" fill="#e5e7eb" name="Sin Objetivo" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
