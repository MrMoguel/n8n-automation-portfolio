import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Lead } from '../../../../types/lead';
import { format, parseISO, startOfDay, isSameDay, addDays, min, max } from 'date-fns';
import { es } from 'date-fns/locale';

interface ContactsAreaChartProps {
    leads: Lead[];
}

export function ContactsAreaChart({ leads }: ContactsAreaChartProps) {
    // Filter leads that have email captured or meeting scheduled
    const relevantLeads = leads.filter(l => l.email_captured || l.meeting_scheduled);

    // Get date range
    const dates = relevantLeads.map(l => parseISO(l.last_interaction_at));

    // Handle empty state
    if (dates.length === 0) {
        return (
            <div className="h-[300px] w-full flex items-center justify-center text-gray-400">
                No hay datos suficientes para mostrar el timeline.
            </div>
        );
    }

    const startDate = min(dates);
    const endDate = max(dates);

    // Generate daily data points
    const data = [];
    let currentDate = startOfDay(startDate);
    let cumulativeCount = 0;

    // Safety check to prevent infinite loop if dates are invalid
    if (startDate > endDate) return null;

    while (currentDate <= endDate) {
        const dayLeads = relevantLeads.filter(l => isSameDay(parseISO(l.last_interaction_at), currentDate));
        cumulativeCount += dayLeads.length;

        data.push({
            date: format(currentDate, 'dd MMM', { locale: es }),
            count: cumulativeCount
        });

        currentDate = addDays(currentDate, 1);
    }

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                        itemStyle={{ color: '#f9fafb' }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
