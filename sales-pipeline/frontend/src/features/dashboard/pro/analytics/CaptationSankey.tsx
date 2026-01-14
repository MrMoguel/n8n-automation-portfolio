import React from 'react';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';
import { Lead } from '../../../../types/lead';

interface CaptationSankeyProps {
    leads: Lead[];
}

export function CaptationSankey({ leads }: CaptationSankeyProps) {
    // Transform data for Sankey
    // Nodes: Prospect, Qualified, Meeting, Lost
    const nodes = [
        { name: 'Prospectos' },      // 0
        { name: 'Calificados' },     // 1
        { name: 'Reunión' },         // 2
        { name: 'Perdidos' }         // 3
    ];

    const prospectCount = leads.length;
    const qualifiedCount = leads.filter(l => ['Lead_Qualified', 'Meeting_Booked'].includes(l.capture_status || '')).length;
    const meetingCount = leads.filter(l => l.capture_status === 'Meeting_Booked' || l.meeting_scheduled).length;
    const lostCount = leads.filter(l => l.capture_status === 'Lost').length;

    // Links logic (Simplified flow)
    // Prospect -> Qualified (Successful)
    // Prospect -> Lost (Direct loss)
    // Qualified -> Meeting (Successful)
    // Qualified -> Lost (Loss after qualification)

    // For this demo, we'll assume a linear flow for simplicity or approximate based on status
    const links = [
        { source: 0, target: 1, value: qualifiedCount },
        { source: 0, target: 3, value: prospectCount - qualifiedCount }, // Assuming rest are lost or stuck
        { source: 1, target: 2, value: meetingCount },
        { source: 1, target: 3, value: qualifiedCount - meetingCount }   // Lost after qualification
    ].filter(l => l.value > 0);

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <Sankey
                    data={{ nodes, links }}
                    node={{ strokeWidth: 0 }}
                    nodePadding={50}
                    margin={{
                        left: 10,
                        right: 10,
                        top: 10,
                        bottom: 10,
                    }}
                    link={{ stroke: '#77c878' }}
                >
                    <Tooltip />
                </Sankey>
            </ResponsiveContainer>
        </div>
    );
}
