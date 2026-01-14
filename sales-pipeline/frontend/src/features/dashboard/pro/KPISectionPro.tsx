import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Lead } from '../../../types/lead';
import { Flame, DollarSign, Activity, Target } from 'lucide-react';

interface KPISectionProProps {
    leads: Lead[];
}

export function KPISectionPro({ leads }: KPISectionProProps) {
    const hotLeadsCount = leads.filter(l => l.temperature === 'Hot').length;
    const pipelineValue = leads.reduce((sum, l) => sum + l.estimated_deal_value, 0);
    const avgScore = leads.length > 0
        ? Math.round(leads.reduce((sum, l) => sum + l.lead_score, 0) / leads.length)
        : 0;
    const convertedCount = leads.filter(l => l.current_status === 'Converted').length;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Leads Calientes</CardTitle>
                    <Flame className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{hotLeadsCount}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Acción prioritaria requerida</p>
                </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Valor en Pipeline</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(pipelineValue)}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Valor total estimado</p>
                </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Score Promedio</CardTitle>
                    <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{avgScore}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Calidad general de leads</p>
                </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Conversiones</CardTitle>
                    <Target className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{convertedCount}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Leads convertidos exitosamente</p>
                </CardContent>
            </Card>
        </div>
    );
}
