import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell, ReferenceArea, Label } from 'recharts';
import { Lead } from '../../../../types/lead';

interface SentimentHeatmapProps {
    leads: Lead[];
}

export function SentimentHeatmap({ leads }: SentimentHeatmapProps) {
    const data = leads.map(l => ({
        x: l.sentiment_score,
        y: l.lead_score,
        z: l.conversation_quality_score || 50, // Size
        name: l.last_known_name || l.remote_jid,
        status: l.capture_status
    }));

    // Quadrant colors
    const COLORS = {
        hot: '#ef4444',
        warm: '#f59e0b',
        cold: '#3b82f6'
    };

    const getColor = (sentiment: number, score: number) => {
        if (sentiment > 0.5 && score > 70) return COLORS.hot;
        if (sentiment < -0.2 || score < 30) return COLORS.cold;
        return COLORS.warm;
    };

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                    <XAxis type="number" dataKey="x" name="Sentimiento" domain={[-1, 1]} stroke="#9ca3af">
                        <Label value="Sentimiento (-1 a 1)" offset={-10} position="insideBottom" fill="#9ca3af" fontSize={12} />
                    </XAxis>
                    <YAxis type="number" dataKey="y" name="Lead Score" domain={[0, 100]} stroke="#9ca3af">
                        <Label value="Lead Score (0-100)" angle={-90} position="insideLeft" fill="#9ca3af" fontSize={12} />
                    </YAxis>
                    <ZAxis type="number" dataKey="z" range={[50, 400]} name="Calidad Conversación" />
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="bg-gray-900 text-white p-2 rounded shadow-lg text-xs border border-gray-700">
                                        <p className="font-bold mb-1">{data.name}</p>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                            <span>Score:</span> <span className="font-mono">{data.y}</span>
                                            <span>Sentimiento:</span> <span className="font-mono">{data.x}</span>
                                            <span>Calidad:</span> <span className="font-mono">{data.z}</span>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    {/* Quadrant Backgrounds (Simulated) */}
                    <ReferenceArea x1={0.5} x2={1} y1={70} y2={100} fill="#ef4444" fillOpacity={0.05} />
                    <ReferenceArea x1={-1} x2={-0.2} y1={0} y2={40} fill="#3b82f6" fillOpacity={0.05} />

                    <Scatter name="Leads" data={data}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColor(entry.x, entry.y)} fillOpacity={0.7} stroke={getColor(entry.x, entry.y)} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}
