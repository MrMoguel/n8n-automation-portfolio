import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Label } from 'recharts';
import { Lead } from '../../../../types/lead';

interface SentimentScatterPlotProps {
    leads: Lead[];
}

export function SentimentScatterPlot({ leads }: SentimentScatterPlotProps) {
    const data = leads.map(l => ({
        x: l.sentiment_score,
        y: l.lead_score,
        name: l.last_known_name || l.remote_jid,
        status: l.capture_status,
        z: 1 // Size
    }));

    const COLORS: Record<string, string> = {
        'Prospect': '#60a5fa',
        'Lead_Qualified': '#34d399',
        'Meeting_Booked': '#a78bfa',
        'Lost': '#ef4444',
        'default': '#9ca3af'
    };

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                    <XAxis type="number" dataKey="x" name="Sentimiento" domain={[-1, 1]} stroke="#9ca3af">
                        <Label value="Sentimiento" offset={-10} position="insideBottom" fill="#9ca3af" />
                    </XAxis>
                    <YAxis type="number" dataKey="y" name="Lead Score" domain={[0, 100]} stroke="#9ca3af">
                        <Label value="Lead Score" angle={-90} position="insideLeft" fill="#9ca3af" />
                    </YAxis>
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div className="bg-gray-900 text-white p-2 rounded shadow-lg text-xs">
                                        <p className="font-bold">{data.name}</p>
                                        <p>Score: {data.y}</p>
                                        <p>Sentimiento: {data.x}</p>
                                        <p>Estado: {data.status}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Scatter name="Leads" data={data} fill="#8884d8">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.status as string] || COLORS.default} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}
