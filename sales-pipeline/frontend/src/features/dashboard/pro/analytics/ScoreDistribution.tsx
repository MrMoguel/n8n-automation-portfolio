import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Lead } from '../../../../types/lead';

interface ScoreDistributionProps {
    leads: Lead[];
}

export function ScoreDistribution({ leads }: ScoreDistributionProps) {
    const ranges = [
        { name: '0-25', min: 0, max: 25, color: '#9ca3af' },
        { name: '26-50', min: 26, max: 50, color: '#60a5fa' },
        { name: '51-75', min: 51, max: 75, color: '#f59e0b' },
        { name: '76-100', min: 76, max: 100, color: '#10b981' }
    ];

    const data = ranges.map(range => ({
        name: range.name,
        count: leads.filter(l => l.lead_score >= range.min && l.lead_score <= range.max).length,
        color: range.color
    }));

    return (
        <div className="h-[100px] w-full mt-2">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Distribución de Score</h4>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb', fontSize: '12px' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
