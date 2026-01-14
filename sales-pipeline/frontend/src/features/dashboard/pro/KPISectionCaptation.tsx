import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Lead } from '../../../types/lead';
import { Info, Maximize2, Users, Calendar, DollarSign, Target } from 'lucide-react';

interface KPISectionCaptationProps {
    leads: Lead[];
}

export function KPISectionCaptation({ leads }: KPISectionCaptationProps) {
    const [expandedKPI, setExpandedKPI] = useState<string | null>(null);

    // Calculations
    const leadsInCaptation = leads.filter(l => l.capture_status !== 'Lost').length;

    const meetingsScheduled = leads.filter(l => l.meeting_scheduled).length;

    const potentialValue = leads
        .filter(l => ['Lead_Qualified', 'Meeting_Booked'].includes(l.capture_status || ''))
        .reduce((sum, l) => sum + (l.estimated_contract_value || 0), 0);

    const captationRate = leads.length > 0
        ? Math.round((leads.filter(l => l.email_captured || l.meeting_scheduled).length / leads.length) * 100)
        : 0;

    const kpis = [
        {
            id: 'leads_captation',
            title: 'Leads en Captación',
            value: leadsInCaptation,
            icon: Users,
            bgColor: 'bg-blue-100 dark:bg-blue-900/20',
            tooltip: 'Clientes activos en el funnel de captación.'
        },
        {
            id: 'meetings_scheduled',
            title: 'Reuniones Agendadas',
            value: meetingsScheduled,
            icon: Calendar,
            color: 'text-purple-500',
            bgColor: 'bg-purple-100 dark:bg-purple-900/20',
            tooltip: 'Reuniones confirmadas para esta semana/mes.'
        },
        {
            id: 'potential_value',
            title: 'Valor Contractual Potencial',
            value: new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(potentialValue),
            icon: DollarSign,
            color: 'text-green-500',
            bgColor: 'bg-green-100 dark:bg-green-900/20',
            tooltip: 'Ingresos potenciales si se cierran estos leads.'
        },
        {
            id: 'captation_rate',
            title: 'Tasa de Captación',
            value: `${captationRate}%`,
            icon: Target,
            color: 'text-orange-500',
            bgColor: 'bg-orange-100 dark:bg-orange-900/20',
            tooltip: 'Qué porcentaje de tu base ha dado un paso de captación.'
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi) => (
                <Card key={kpi.id} className="relative overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {kpi.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="group relative">
                                <Info className="h-4 w-4 text-gray-400 cursor-help" />
                                <div className="absolute right-0 top-6 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                                    {kpi.tooltip}
                                </div>
                            </div>
                            <button
                                onClick={() => setExpandedKPI(kpi.id)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                            >
                                <Maximize2 className="h-4 w-4" />
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {kpi.value}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

            {/* Expanded Modal Placeholder */}
            {expandedKPI && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-6 relative">
                        <button
                            onClick={() => setExpandedKPI(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4 dark:text-white">
                            Tendencia Histórica: {kpis.find(k => k.id === expandedKPI)?.title}
                        </h2>
                        <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                            Gráfico de tendencia histórica aquí...
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
