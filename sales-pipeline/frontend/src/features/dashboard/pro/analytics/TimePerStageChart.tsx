import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Lead } from '../../../../types/lead';

interface TimePerStageChartProps {
    leads: Lead[];
}

export function TimePerStageChart({ leads }: TimePerStageChartProps) {
    // Mock data for demo purposes as we don't have real time tracking per stage in the Lead interface yet
    const data = [
        { stage: 'Prospect', days: 2.5 },
        { stage: 'Qualified', days: 5.2 },
        { stage: 'Meeting', days: 1.8 }
    ];

    return (
        <div className="h-[200px] w-full">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Tiempo Promedio (Días)</h4>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" opacity={0.2} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="stage" type="category" width={80} stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                        itemStyle={{ color: '#f9fafb' }}
                        cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    />
                    <Bar dataKey="days" radius={[0, 4, 4, 0]} barSize={20}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`rgba(99, 102, 241, ${0.5 + (index * 0.2)})`} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
