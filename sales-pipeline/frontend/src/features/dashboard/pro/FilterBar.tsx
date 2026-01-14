import React from 'react';
import { Filter, Calendar, Thermometer, Activity } from 'lucide-react';

interface FilterBarProps {
    filters: {
        dateRange: string;
        temperature: string;
        status: string;
    };
    onFilterChange: (key: string, value: string) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
    return (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-16 z-20 shadow-sm transition-colors">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Filter className="h-5 w-5" />
                <span className="text-sm font-medium">Filtros Globales:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {/* Date Range Filter */}
                <div className="relative group w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                        value={filters.dateRange}
                        onChange={(e) => onFilterChange('dateRange', e.target.value)}
                        className="w-full sm:w-auto pl-9 pr-8 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-600 transition-colors cursor-pointer appearance-none"
                    >
                        <option value="all">Todo el tiempo</option>
                        <option value="7d">Últimos 7 días</option>
                        <option value="30d">Últimos 30 días</option>
                    </select>
                </div>

                {/* Temperature Filter */}
                <div className="relative w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Thermometer className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                        value={filters.temperature}
                        onChange={(e) => onFilterChange('temperature', e.target.value)}
                        className="w-full sm:w-auto pl-9 pr-8 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-600 transition-colors cursor-pointer appearance-none"
                    >
                        <option value="all">Todas las Temperaturas</option>
                        <option value="Hot">Alta 🔥</option>
                        <option value="Warm">Media 🌤️</option>
                        <option value="Cold">Baja ❄️</option>
                    </select>
                </div>

                {/* Status Filter */}
                <div className="relative w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Activity className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                        value={filters.status}
                        onChange={(e) => onFilterChange('status', e.target.value)}
                        className="w-full sm:w-auto pl-9 pr-8 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-600 transition-colors cursor-pointer appearance-none"
                    >
                        <option value="all">Todos los Estados</option>
                        <option value="Prospect">Prospecto</option>
                        <option value="Lead_Qualified">Lead Calificado</option>
                        <option value="Meeting_Booked">Reunión Agendada</option>
                        <option value="Lost">Perdido</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
