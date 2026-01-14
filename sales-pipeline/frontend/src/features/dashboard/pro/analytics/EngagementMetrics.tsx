import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Lead } from '../../../../types/lead';

interface EngagementMetricsProps {
    leads: Lead[];
}

export function EngagementMetrics({ leads }: EngagementMetricsProps) {
    // 1. Engagement Levels (Horizontal Stacked Mock)
    const levels = [
        { name: 'Alto (10+)', value: leads.filter(l => (l.conversation_turn_count || 0) > 10).length, color: '#10b981' },
        { name: 'Medio (5-10)', value: leads.filter(l => (l.conversation_turn_count || 0) >= 5 && (l.conversation_turn_count || 0) <= 10).length, color: '#3b82f6' },
        { name: 'Bajo (<5)', value: leads.filter(l => (l.conversation_turn_count || 0) < 5).length, color: '#9ca3af' }
    ];

    // 3. First Message Latency (Mock)
    const latencyData = [
        { name: '<1m', value: 12, color: '#10b981' },
        { name: '1-5m', value: 8, color: '#34d399' },
        { name: '5-30m', value: 5, color: '#f59e0b' },
        { name: '>30m', value: 2, color: '#ef4444' }
    ];

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Engagement Levels */}
            <div className="h-[120px] w-full">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Niveles de Engagement</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={levels} margin={{ left: 40 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} stroke="#9ca3af" fontSize={10} />
                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#1f2937', fontSize: '12px', color: '#fff' }} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={15}>
                            {levels.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Latency */}
            <div className="h-[120px] w-full">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Latencia 1er Mensaje</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={latencyData}>
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#1f2937', fontSize: '12px', color: '#fff' }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={30}>
                            {latencyData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
