import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from '../../../../components/ui/Card';
import { Lead } from '../../../../types/lead';
import { Info } from 'lucide-react';
import { format, startOfWeek, subWeeks, isSameWeek } from 'date-fns';
import { es } from 'date-fns/locale';

interface ObjectivesStackedBarChartProps {
    leads: Lead[];
}

export function ObjectivesStackedBarChart({ leads }: ObjectivesStackedBarChartProps) {
    // Generate last 4 weeks data
    const weeks = Array.from({ length: 4 }).map((_, i) => {
        const date = subWeeks(new Date(), i);
        return startOfWeek(date, { weekStartsOn: 1 });
    }).reverse();

    const data = weeks.map(weekStart => {
        const weekLeads = leads.filter(l =>
            l.last_interaction_at && isSameWeek(new Date(l.last_interaction_at), weekStart, { weekStartsOn: 1 })
        );

        return {
            name: format(weekStart, 'dd MMM', { locale: es }),
            email_captured: weekLeads.filter(l => l.email_captured).length,
            meeting_proposed: weekLeads.filter(l => l.meeting_proposed).length,
            meeting_scheduled: weekLeads.filter(l => l.meeting_scheduled).length
        };
    });

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                        itemStyle={{ color: '#f9fafb' }}
                        cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="email_captured" name="Email Capturado" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="meeting_proposed" name="Reunión Propuesta" fill="#818cf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="meeting_scheduled" name="Reunión Agendada" fill="#34d399" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
