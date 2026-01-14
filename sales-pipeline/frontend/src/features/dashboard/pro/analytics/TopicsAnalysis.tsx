import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import { Lead } from '../../../../types/lead';

interface TopicsAnalysisProps {
    leads: Lead[];
}

export function TopicsAnalysis({ leads }: TopicsAnalysisProps) {
    // Mock Topics Data
    const topics = [
        { name: 'Precio', count: 45, intensity: 0.9 },
        { name: 'Disponibilidad', count: 32, intensity: 0.7 },
        { name: 'Garantía', count: 28, intensity: 0.6 },
        { name: 'Envío', count: 20, intensity: 0.4 },
        { name: 'Financiamiento', count: 15, intensity: 0.3 },
        { name: 'Soporte', count: 12, intensity: 0.25 },
        { name: 'Características', count: 10, intensity: 0.2 },
        { name: 'Comparación', count: 8, intensity: 0.15 },
        { name: 'Descuentos', count: 5, intensity: 0.1 },
        { name: 'Ubicación', count: 3, intensity: 0.05 }
    ];

    // Mock Trend Data
    const trends = [
        { week: 'S1', t1: 10, t2: 5, t3: 8 },
        { week: 'S2', t1: 12, t2: 8, t3: 7 },
        { week: 'S3', t1: 15, t2: 12, t3: 6 },
        { week: 'S4', t1: 20, t2: 15, t3: 5 },
        { week: 'S5', t1: 25, t2: 18, t3: 8 },
        { week: 'S6', t1: 30, t2: 20, t3: 10 },
        { week: 'S7', t1: 35, t2: 25, t3: 12 },
        { week: 'S8', t1: 45, t2: 32, t3: 15 }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
            {/* Main Bar Chart (60% -> 3 cols) */}
            <div className="lg:col-span-3 h-[300px]">
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">Top 10 Tópicos Recurrentes</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={topics}
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={100} stroke="#9ca3af" fontSize={12} />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                            {topics.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`rgba(59, 130, 246, ${0.4 + entry.intensity * 0.6})`} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Right Panel (40% -> 2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Trending Lines */}
                <div className="h-[140px] w-full">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Tendencia (Top 3)</h4>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trends}>
                            <XAxis dataKey="week" hide />
                            <Tooltip contentStyle={{ backgroundColor: '#1f2937', fontSize: '12px', color: '#fff' }} />
                            <Line type="monotone" dataKey="t1" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="t2" stroke="#10b981" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="t3" stroke="#f59e0b" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Topics by Status (Mock Stacked) */}
                <div className="h-[140px] w-full">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Tópicos por Estado</h4>
                    <div className="space-y-2 mt-2">
                        {topics.slice(0, 4).map((t, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                                <span className="w-20 truncate text-gray-500 dark:text-gray-400">{t.name}</span>
                                <div className="flex-1 flex h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full" style={{ width: '40%' }} />
                                    <div className="bg-green-500 h-full" style={{ width: '30%' }} />
                                    <div className="bg-red-500 h-full" style={{ width: '30%' }} />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end gap-2 text-[10px] text-gray-400 mt-1">
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Prospect</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full" /> Qual</span>
                            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full" /> Lost</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
