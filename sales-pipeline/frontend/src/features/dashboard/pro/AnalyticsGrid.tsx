import React, { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';
import { Lead } from '../../../types/lead';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface AnalyticsGridProps {
    leads: Lead[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const RISK_COLORS = { Low: '#10B981', Medium: '#F59E0B', High: '#EF4444' };

export function AnalyticsGrid({ leads }: AnalyticsGridProps) {

    // A. Pipeline Health (Embudo)
    const pipelineData = useMemo(() => {
        const stages = ['New', 'Qualifying', 'Nurturing', 'Converted', 'Lost'];
        const stageLabels: Record<string, string> = {
            'New': 'Nuevo',
            'Qualifying': 'Calificando',
            'Nurturing': 'Nutriendo',
            'Converted': 'Convertido',
            'Lost': 'Perdido'
        };
        return stages.map(stage => {
            const stageLeads = leads.filter(l => l.current_status === stage);
            return {
                name: stageLabels[stage],
                count: stageLeads.length,
                value: stageLeads.reduce((sum, l) => sum + l.estimated_deal_value, 0)
            };
        });
    }, [leads]);

    // B. Revenue Forecast (Donut)
    const revenueData = useMemo(() => {
        const risks = ['Low', 'Medium', 'High'];
        const riskLabels: Record<string, string> = { 'Low': 'Bajo', 'Medium': 'Medio', 'High': 'Alto' };
        return risks.map(risk => {
            const riskLeads = leads.filter(l => l.churn_risk === risk);
            return {
                name: `Riesgo ${riskLabels[risk]}`,
                value: riskLeads.reduce((sum, l) => sum + l.estimated_deal_value, 0),
                color: RISK_COLORS[risk as keyof typeof RISK_COLORS]
            };
        }).filter(d => d.value > 0);
    }, [leads]);

    const totalRevenue = revenueData.reduce((sum, d) => sum + d.value, 0);

    // C. Engagement Timeline (Area)
    const timelineData = useMemo(() => {
        const grouped = leads.reduce((acc, lead) => {
            const date = format(parseISO(lead.last_interaction_at), 'yyyy-MM-dd');
            if (!acc[date]) {
                acc[date] = { date, interactions: 0, sentimentSum: 0, count: 0 };
            }
            acc[date].interactions += 1;
            acc[date].sentimentSum += lead.sentiment_score;
            acc[date].count += 1;
            return acc;
        }, {} as Record<string, any>);

        return Object.values(grouped)
            .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((d: any) => ({
                ...d,
                avgSentiment: (d.sentimentSum / d.count).toFixed(2),
                displayDate: format(parseISO(d.date), 'dd MMM', { locale: es })
            }));
    }, [leads]);

    // D. Topics Cloud (Bar Vertical)
    const topicsData = useMemo(() => {
        const topicCounts: Record<string, number> = {};
        leads.forEach(lead => {
            lead.topics_mentioned?.forEach(topic => {
                topicCounts[topic] = (topicCounts[topic] || 0) + 1;
            });
        });

        return Object.entries(topicCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [leads]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg text-sm">
                    <p className="font-bold mb-1 text-gray-900 dark:text-white">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}: {entry.value.toLocaleString()}
                            {entry.dataKey === 'value' && typeof entry.value === 'number' && entry.name !== 'count' ? '$' : ''}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Pipeline Health */}
            <Card className="col-span-1 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="dark:text-white">Salud del Pipeline</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={pipelineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" strokeOpacity={0.2} />
                            <XAxis type="number" stroke="#9CA3AF" />
                            <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" fill="#4F46E5" radius={[0, 4, 4, 0]} name="Leads" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Revenue Forecast */}
            <Card className="col-span-1 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="dark:text-white">Previsión de Ingresos (Riesgo)</CardTitle>
                </CardHeader>
                <CardContent className="h-80 relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center mt-8">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Total Pipeline</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">${(totalRevenue / 1000).toFixed(1)}k</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={revenueData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {revenueData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="bottom" height={36} formatter={(value) => <span className="text-gray-600 dark:text-gray-300">{value}</span>} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Engagement Timeline */}
            <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="dark:text-white">Línea de Tiempo de Interacciones</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timelineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="displayDate" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.2} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="interactions" stroke="#8884d8" fillOpacity={1} fill="url(#colorInteractions)" name="Interacciones" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Topics Cloud */}
            <Card className="col-span-1 md:col-span-2 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="dark:text-white">Top Temas de Conversación</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={topicsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.2} />
                            <XAxis dataKey="name" stroke="#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                            <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} name="Menciones" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
