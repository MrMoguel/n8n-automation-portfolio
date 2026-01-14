import React, { useState } from 'react';
import { Lead } from '../../../types/lead';
import { X, Smile, Frown, Meh, AlertTriangle, Check, Mail, Phone, MessageCircle } from 'lucide-react';

interface LeadDetailModalProps {
    lead: Lead;
    onClose: () => void;
}

export function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
    const [feedback, setFeedback] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleExecuteAction = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                remote_jid: lead.remote_jid,
                custom_notes: lead.suggested_action || '',
                action_executed: "false",
                action_feedback: feedback
            };

            console.log('Sending payload to webhook:', payload);

            const response = await fetch('https://n8n.losprismas.com/webhook/action', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Webhook error! status: ${response.status}`);
            }

            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                onClose();
            }, 2000);
        } catch (error) {
            console.error('Error executing action:', error);
            // Optional: Show error state to user
        } finally {
            setIsSubmitting(false);
        }
    };

    const getSentimentIcon = (score: number) => {
        if (score > 0.3) return <Smile className="h-5 w-5 text-green-500" />;
        if (score < -0.3) return <Frown className="h-5 w-5 text-red-500" />;
        return <Meh className="h-5 w-5 text-yellow-500" />;
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl relative flex flex-col md:flex-row max-h-[90vh] overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Left Section: Lead Info */}
                <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-1 dark:text-white">{lead.last_known_name || 'Desconocido'}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{lead.remote_jid}</p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Resumen</h3>
                            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                {lead.summary_text || 'Sin resumen disponible.'}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Tópicos</h3>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(lead.topics_mentioned) && lead.topics_mentioned.length > 0 ? (
                                    lead.topics_mentioned.map((topic, i) => (
                                        <span key={i} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">
                                            {topic}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-sm italic">No hay tópicos registrados</span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Sentimiento</h3>
                                <div className="flex items-center gap-2">
                                    {getSentimentIcon(Number(lead.sentiment_score) || 0)}
                                    <span className="text-gray-900 dark:text-white font-medium">
                                        {(Number(lead.sentiment_score) || 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Trayectoria</h3>
                                <span className={`font-medium ${lead.emotional_trajectory === 'Improving' ? 'text-green-500' :
                                    lead.emotional_trajectory === 'Declining' ? 'text-red-500' : 'text-yellow-500'
                                    }`}>
                                    {lead.emotional_trajectory || 'Estable'}
                                </span>
                            </div>
                        </div>

                        {lead.churn_risk === 'High' && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800">
                                <AlertTriangle className="h-5 w-5" />
                                <span className="font-medium">Alto Riesgo de Abandono</span>
                            </div>
                        )}

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Canales</h3>
                            <div className="flex gap-3">
                                {Array.isArray(lead.contact_channels) && lead.contact_channels.includes('email') && <Mail className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
                                {Array.isArray(lead.contact_channels) && lead.contact_channels.includes('phone') && <Phone className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
                                {(Array.isArray(lead.contact_channels) && lead.contact_channels.includes('whatsapp')) || lead.remote_jid.includes('@s.whatsapp.net') ? (
                                    <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Action Panel */}
                <div className="w-full md:w-1/2 p-6 bg-gray-50 dark:bg-gray-900/50 flex flex-col">
                    <h3 className="text-lg font-bold mb-4 dark:text-white flex items-center gap-2">
                        Ejecutar Acción Sugerida
                    </h3>

                    <div className="flex-1 space-y-4">
                        <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase block mb-1">Acción Recomendada</span>
                            <p className="text-lg font-medium text-gray-900 dark:text-white">
                                {lead.suggested_action || 'Contactar manualmente'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Notas Adicionales (Feedback)
                            </label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                                placeholder="Escribe cualquier observación importante antes de ejecutar..."
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleExecuteAction}
                            disabled={isSubmitting || showSuccess}
                            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform active:scale-95 flex items-center justify-center gap-2 ${showSuccess
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                                } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {showSuccess ? (
                                <>
                                    <Check className="h-5 w-5" />
                                    Acción enviada ✓
                                </>
                            ) : isSubmitting ? (
                                'Enviando...'
                            ) : (
                                'Ejecutar Acción'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
