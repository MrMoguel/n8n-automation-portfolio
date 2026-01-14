import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell, Label } from 'recharts';
import { Lead } from '../../../../types/lead';

interface EngagementBubbleChartProps {
    leads: Lead[];
}

export function EngagementBubbleChart({ leads }: EngagementBubbleChartProps) {
    const data = leads.map(l => ({
        x: l.conversation_turn_count || 0,
        y: l.conversation_quality_score || 0,
        z: 100, // Mock response time size inverse or just fixed for now as we don't have response_time_avg
        name: l.last_known_name || l.remote_jid,
        status: l.capture_status
    }));

    const COLORS: Record<string, string> = {
        'Prospect': '#9ca3af',
        'Lead_Qualified': '#34d399',
        'Meeting_Booked': '#f59e0b',
        'Lost': '#ef4444',
        'default': '#6b7280'
    };

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                    <XAxis type="number" dataKey="x" name="Turnos de Conversación" stroke="#9ca3af">
                        <Label value="Turnos de Conversación" offset={-10} position="insideBottom" fill="#9ca3af" fontSize={12} />
                    </XAxis>
                    <YAxis type="number" dataKey="y" name="Quality Score" domain={[0, 100]} stroke="#9ca3af">
                        <Label value="Quality Score" angle={-90} position="insideLeft" fill="#9ca3af" fontSize={12} />
                    </YAxis>
                    <ZAxis type="number" dataKey="z" range={[50, 400]} name="Response Time" />
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="bg-gray-900 text-white p-2 rounded shadow-lg text-xs border border-gray-700">
                                        <p className="font-bold mb-1">{data.name}</p>
                                        <p>Turnos: {data.x}</p>
                                        <p>Quality: {data.y}</p>
                                        <p>Status: {data.status}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Scatter name="Leads" data={data}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.status as string] || COLORS.default} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}
