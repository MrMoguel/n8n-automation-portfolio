import React from 'react';
import { X } from 'lucide-react';

interface ChartModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

export function ChartModal({ title, children, onClose }: ChartModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Vista detallada</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex-1 p-6 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}
