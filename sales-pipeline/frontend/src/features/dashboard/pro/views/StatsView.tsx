import React, { useState } from 'react';
import { KPISectionCaptation } from '../KPISectionCaptation';
import { FilterBar } from '../FilterBar';
import { ChartCard } from '../components/ChartCard';
import { ChartModal } from '../components/ChartModal';
import { Lead } from '../../../../types/lead';

// Section 2: Funnel
import { CaptationFunnelChart } from '../charts/CaptationFunnelChart';
import { FunnelGauges } from '../analytics/FunnelGauges';
import { TimePerStageChart } from '../analytics/TimePerStageChart';

// Section 3: Objectives
import { ObjectivesHistoryChart } from '../analytics/ObjectivesHistoryChart';
import { ObjectivesDistribution } from '../analytics/ObjectivesDistribution';
import { ObjectivesMetrics } from '../analytics/ObjectivesMetrics';
import { ObjectivesVelocityChart } from '../analytics/ObjectivesVelocityChart';

// Section 4: Temperature
import { SentimentHeatmap } from '../analytics/SentimentHeatmap';
import { TemperatureOverview } from '../analytics/TemperatureOverview';
import { ScoreDistribution } from '../analytics/ScoreDistribution';

// Section 5: Engagement
import { EngagementBubbleChart } from '../analytics/EngagementBubbleChart';
import { EngagementMetrics } from '../analytics/EngagementMetrics';

// Section 6: Topics
import { TopicsAnalysis } from '../analytics/TopicsAnalysis';

interface StatsViewProps {
    leads: Lead[];
    filters: any;
    onFilterChange: (key: string, value: string) => void;
}

export function StatsView({ leads, filters, onFilterChange }: StatsViewProps) {
    const [expandedChart, setExpandedChart] = useState<string | null>(null);

    const renderExpandedChart = (chartId: string) => {
        switch (chartId) {
            case 'funnel': return <CaptationFunnelChart leads={leads} />;
            case 'objectives': return <ObjectivesHistoryChart leads={leads} />;
            case 'sentiment': return <SentimentHeatmap leads={leads} />;
            case 'engagement': return <EngagementBubbleChart leads={leads} />;
            case 'topics': return <TopicsAnalysis leads={leads} />;
            default: return null;
        }
    };

    const getChartTitle = (chartId: string) => {
        switch (chartId) {
            case 'funnel': return 'Funnel de Captación (Sankey)';
            case 'objectives': return 'Objetivos de Captación Logrados';
            case 'sentiment': return 'Matriz de Temperatura & Sentimiento';
            case 'engagement': return 'Engagement & Interacción';
            case 'topics': return 'Análisis de Tópicos';
            default: return '';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            {/* Header & Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Command Center</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Visión macro de rendimiento, conversión y calidad.
                    </p>
                </div>
                <div className="w-full sm:w-auto">
                    <FilterBar filters={filters} onFilterChange={onFilterChange} />
                </div>
            </div>

            {/* SECCIÓN 1: KPIs */}
            <KPISectionCaptation leads={leads} />

            {/* SECCIÓN 2: Funnel de Captación */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 border-l-4 border-blue-500 pl-3">
                    2. Funnel de Captación
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3">
                        <ChartCard
                            title="Funnel de Captación"
                            subtitle="Conversión por etapas (Contactados → Interesados → Reuniones)"
                            onExpand={() => setExpandedChart('funnel')}
                        >
                            <CaptationFunnelChart leads={leads} />
                        </ChartCard>
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex-1">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tasas de Conversión</h4>
                            <FunnelGauges leads={leads} />
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-[220px]">
                            <TimePerStageChart leads={leads} />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 3: Objetivos de Captación */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 border-l-4 border-green-500 pl-3">
                    3. Objetivos Logrados
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3">
                        <ChartCard
                            title="Histórico de Objetivos"
                            subtitle="Evolución semanal de hitos alcanzados"
                            onExpand={() => setExpandedChart('objectives')}
                        >
                            <ObjectivesHistoryChart leads={leads} />
                        </ChartCard>
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                <h4 className="text-xs font-medium text-gray-500 mb-2">Distribución</h4>
                                <ObjectivesDistribution leads={leads} />
                            </div>
                            <div className="flex flex-col justify-center">
                                <ObjectivesMetrics leads={leads} />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex-1">
                            <ObjectivesVelocityChart leads={leads} />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 4: Temperatura & Sentimiento */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 border-l-4 border-red-500 pl-3">
                    4. Temperatura & Sentimiento
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3">
                        <ChartCard
                            title="Matriz de Calor (Sentiment vs Score)"
                            subtitle="Correlación entre sentimiento y calificación del lead"
                            onExpand={() => setExpandedChart('sentiment')}
                        >
                            <SentimentHeatmap leads={leads} />
                        </ChartCard>
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex-1">
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Resumen de Temperatura</h4>
                            <TemperatureOverview leads={leads} />
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <ScoreDistribution leads={leads} />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 5: Engagement */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 border-l-4 border-purple-500 pl-3">
                    5. Engagement & Interacción
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3">
                        <ChartCard
                            title="Calidad vs. Interacción"
                            subtitle="Relación entre turnos de conversación y calidad"
                            onExpand={() => setExpandedChart('engagement')}
                        >
                            <EngagementBubbleChart leads={leads} />
                        </ChartCard>
                    </div>
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <EngagementMetrics leads={leads} />
                    </div>
                </div>
            </section>

            {/* SECCIÓN 6: Tópicos */}
            <section>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 border-l-4 border-yellow-500 pl-3">
                    6. Tópicos & Tendencias
                </h3>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="h-[400px]">
                        <TopicsAnalysis leads={leads} />
                    </div>
                </div>
            </section>

            {/* Modal Global */}
            {expandedChart && (
                <ChartModal
                    title={getChartTitle(expandedChart)}
                    onClose={() => setExpandedChart(null)}
                >
                    {renderExpandedChart(expandedChart)}
                </ChartModal>
            )}
        </div>
    );
}
