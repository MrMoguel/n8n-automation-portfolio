import React from 'react';
import { Maximize2, Info } from 'lucide-react';

interface ChartCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    onExpand?: () => void;
    className?: string;
}

export function ChartCard({ title, subtitle, children, onExpand, className = '' }: ChartCardProps) {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-all hover:shadow-md ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                    {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors">
                        <Info className="h-5 w-5" />
                    </button>
                    {onExpand && (
                        <button
                            onClick={onExpand}
                            className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400 transition-colors"
                            title="Expandir Gráfico"
                        >
                            <Maximize2 className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
