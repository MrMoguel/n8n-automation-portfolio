import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Lead } from '../../../../types/lead';

interface TemperatureOverviewProps {
    leads: Lead[];
}

export function TemperatureOverview({ leads }: TemperatureOverviewProps) {
    // Temperature Distribution
    const hot = leads.filter(l => (l.lead_score > 70 && l.sentiment_score > 0.5)).length;
    const cold = leads.filter(l => (l.lead_score < 30 || l.sentiment_score < -0.2)).length;
    const warm = leads.length - hot - cold;

    const donutData = [
        { name: 'Hot', value: hot, color: '#ef4444' },
        { name: 'Warm', value: warm, color: '#f59e0b' },
        { name: 'Cold', value: cold, color: '#3b82f6' }
    ];

    // Trajectory (Mock data based on recent interaction vs old)
    const trajectoryData = [
        { name: 'Mejorando', value: Math.round(leads.length * 0.4), color: '#10b981' },
        { name: 'Estable', value: Math.round(leads.length * 0.4), color: '#9ca3af' },
        { name: 'Declinando', value: Math.round(leads.length * 0.2), color: '#ef4444' }
    ];

    return (
        <div className="flex flex-col h-full gap-4">
            {/* Donut Chart */}
            <div className="h-[140px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={donutData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {donutData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <span className="block text-xl font-bold text-gray-900 dark:text-white">{hot}</span>
                        <span className="text-[10px] text-red-500 font-medium">HOT LEADS</span>
                    </div>
                </div>
            </div>

            {/* Trajectory Bars */}
            <div className="flex-1">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Trayectoria</h4>
                <div className="space-y-2">
                    {trajectoryData.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                            <span className="w-16 text-gray-500 dark:text-gray-400">{item.name}</span>
                            <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full"
                                    style={{ width: `${(item.value / leads.length) * 100}%`, backgroundColor: item.color }}
                                />
                            </div>
                            <span className="w-6 text-right font-medium text-gray-700 dark:text-gray-300">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
