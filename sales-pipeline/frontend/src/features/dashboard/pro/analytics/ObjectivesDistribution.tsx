import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Lead } from '../../../../types/lead';

interface ObjectivesDistributionProps {
    leads: Lead[];
}

export function ObjectivesDistribution({ leads }: ObjectivesDistributionProps) {
    const emailCount = leads.filter(l => l.email_captured).length;
    const meetingCount = leads.filter(l => l.meeting_scheduled).length;
    const total = leads.length;
    const noneCount = total - emailCount - meetingCount; // Simplified overlap logic

    const data = [
        { name: 'Email', value: emailCount, color: '#3b82f6' },
        { name: 'Reunión', value: meetingCount, color: '#10b981' },
        { name: 'Ninguno', value: noneCount > 0 ? noneCount : 0, color: '#e5e7eb' }
    ];

    return (
        <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{total}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Total Leads</span>
            </div>
        </div>
    );
}
