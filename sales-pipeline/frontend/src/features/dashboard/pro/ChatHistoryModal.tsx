import React, { useEffect, useState, useRef } from 'react';
import { X, MessageCircle, Calendar, User, Bot } from 'lucide-react';
import { Lead } from '../../../types/lead';
import { ChatMessage } from '../../../types/chat';
import { fetchChatHistory } from '../../../services/api';

interface ChatHistoryModalProps {
    lead: Lead;
    onClose: () => void;
}

export function ChatHistoryModal({ lead, onClose }: ChatHistoryModalProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadChat = async () => {
            setIsLoading(true);
            try {
                const data = await fetchChatHistory(lead.remote_jid);
                // Sort by date ascending
                const sorted = data.sort((a, b) =>
                    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                );
                setMessages(sorted);
            } catch (error) {
                console.error("Error loading chat:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadChat();
    }, [lead.remote_jid]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('es-ES', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-950 rounded-xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[85vh] overflow-hidden border border-gray-200 dark:border-gray-800">
                {/* Header */}
                <div className="bg-white dark:bg-gray-950 px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                                Historial de Chat
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {lead.last_known_name || lead.remote_jid}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="bg-white dark:bg-gray-950 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none transition-colors"
                        onClick={onClose}
                    >
                        <span className="sr-only">Cerrar</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* Chat Content */}
                <div className="flex-1 px-4 py-4 sm:p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                            <MessageCircle className="h-12 w-12 mb-2 opacity-20" />
                            <p>No hay mensajes registrados</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((msg) => {
                                const isAi = msg.role === 'ai';
                                return (
                                    <div key={msg.id} className={`flex ${isAi ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`flex max-w-[80%] ${isAi ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isAi ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'bg-gray-200 dark:bg-gray-700'
                                                }`}>
                                                {isAi ? (
                                                    <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                ) : (
                                                    <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                                )}
                                            </div>
                                            <div className={`flex flex-col ${isAi ? 'items-end' : 'items-start'}`}>
                                                <div className={`px-4 py-2 rounded-2xl text-sm ${isAi
                                                    ? 'bg-indigo-600 text-white rounded-br-none'
                                                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'
                                                    }`}>
                                                    {msg.content}
                                                </div>
                                                <span className="text-[10px] text-gray-400 mt-1 px-1">
                                                    {formatDate(msg.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
