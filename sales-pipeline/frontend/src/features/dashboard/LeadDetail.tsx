import React from 'react';
import { Lead } from '../../types/lead';
import { Badge } from '../../components/ui/Badge';
import { Smile, Frown, Meh, AlertTriangle, Phone } from 'lucide-react';

interface LeadDetailProps {
    lead: Lead;
}

export function LeadDetail({ lead }: LeadDetailProps) {
    const getSentimentIcon = (score: number) => {
        if (score >= 0.6) return <Smile className="h-5 w-5 text-green-500" />;
        if (score <= 0.3) return <Frown className="h-5 w-5 text-red-500" />;
        return <Meh className="h-5 w-5 text-yellow-500" />;
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        }).format(value);
    };

    const formatPhone = (jid: string) => {
        const number = jid.split('@')[0];
        if (number.startsWith('569')) {
            return `+56 9 ${number.slice(3, 7)} ${number.slice(7)}`;
        }
        return number;
    };

    return (
        <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {lead.last_known_name || <span className="text-gray-400 italic">Lead Desconocido</span>}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1">
                        <Phone className="h-4 w-4" />
                        <span>{formatPhone(lead.remote_jid)}</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Valor Estimado</div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(lead.estimated_deal_value)}
                    </div>
                </div>
            </div>

            {/* Summary Note */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Resumen IA</h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                    {lead.summary_text}
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Sentimiento</div>
                    <div className="flex items-center gap-2">
                        {getSentimentIcon(lead.sentiment_score)}
                        <span className="font-semibold text-gray-900 dark:text-white">{(lead.sentiment_score * 100).toFixed(0)}%</span>
                    </div>
                </div>
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Riesgo de Fuga</div>
                    <div className="flex items-center gap-2">
                        {lead.churn_risk === 'High' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                        <span className={`font-semibold ${lead.churn_risk === 'High' ? 'text-red-600 dark:text-red-400' :
                                lead.churn_risk === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
                            }`}>
                            {lead.churn_risk === 'High' ? 'Alto' : lead.churn_risk === 'Medium' ? 'Medio' : 'Bajo'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Topics */}
            <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Temas Mencionados</h4>
                <div className="flex flex-wrap gap-2">
                    {lead.topics_mentioned && lead.topics_mentioned.length > 0 ? (
                        lead.topics_mentioned.map((topic, i) => (
                            <Badge key={i} variant="secondary" className="px-3 py-1 dark:bg-gray-700 dark:text-gray-200">
                                {topic}
                            </Badge>
                        ))
                    ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400 italic">No se detectaron temas específicos</span>
                    )}
                </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Acción Sugerida</div>
                        <div className="text-indigo-600 dark:text-indigo-400 font-medium">{lead.suggested_action}</div>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                        Ejecutar Acción
                    </button>
                </div>
            </div>
        </div>
    );
}
