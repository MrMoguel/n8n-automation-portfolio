import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Lead } from '../../types/lead';
import { Flame, DollarSign, Activity, Target } from 'lucide-react';

interface KPISectionProps {
    leads: Lead[];
}

export function KPISection({ leads }: KPISectionProps) {
    const hotLeadsCount = leads.filter(l => l.temperature === 'Hot').length;
    const pipelineValue = leads.reduce((sum, l) => sum + l.estimated_deal_value, 0);
    const avgScore = leads.length > 0
        ? Math.round(leads.reduce((sum, l) => sum + l.lead_score, 0) / leads.length)
        : 0;
    const convertedCount = leads.filter(l => l.current_status === 'Converted').length;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Hot Leads</CardTitle>
                    <Flame className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">{hotLeadsCount}</div>
                    <p className="text-xs text-gray-500">High priority actions</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">${pipelineValue.toLocaleString()}</div>
                    <p className="text-xs text-gray-500">Total estimated value</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Lead Score</CardTitle>
                    <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{avgScore}</div>
                    <p className="text-xs text-gray-500">Overall lead quality</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Radar</CardTitle>
                    <Target className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{convertedCount}</div>
                    <p className="text-xs text-gray-500">Leads converted</p>
                </CardContent>
            </Card>
        </div>
    );
}
