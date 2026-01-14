import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Lead } from '../../../../types/lead';

interface FunnelGaugesProps {
    leads: Lead[];
}

export function FunnelGauges({ leads }: FunnelGaugesProps) {
    const total = leads.length;
    const qualified = leads.filter(l => ['Lead_Qualified', 'Meeting_Booked'].includes(l.capture_status || '')).length;
    const meetings = leads.filter(l => l.meeting_scheduled).length;

    const rate1 = total > 0 ? (qualified / total) * 100 : 0;
    const rate2 = qualified > 0 ? (meetings / qualified) * 100 : 0;
    const rateTotal = total > 0 ? (meetings / total) * 100 : 0;

    const Gauge = ({ value, label }: { value: number, label: string }) => {
        const data = [
            { value: value, fill: value > 60 ? '#34d399' : value > 30 ? '#facc15' : '#ef4444' },
            { value: 100 - value, fill: '#e5e7eb' }
        ];

        return (
            <div className="flex flex-col items-center justify-center h-24">
                <div className="h-16 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="100%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius={30}
                                outerRadius={45}
                                paddingAngle={0}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute bottom-0 left-0 right-0 text-center text-sm font-bold text-gray-700 dark:text-gray-200">
                        {Math.round(value)}%
                    </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">{label}</span>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-4 h-full justify-center">
            <Gauge value={rate1} label="Tasa de Interés" />
            <Gauge value={rate2} label="Tasa de Cierre" />
            <Gauge value={rateTotal} label="Conversión Total" />
        </div>
    );
}
