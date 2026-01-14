import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
    Users,
    BarChart3,
    MessageSquare,
    Settings,
    LogOut,
    TrendingUp,
    Target
} from 'lucide-react';

interface ModuleCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    to: string;
    color: string;
    stats?: string;
}

function ModuleCard({ title, description, icon, to, color, stats }: ModuleCardProps) {
    return (
        <Link
            to={to}
            className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-purple-500/50 dark:hover:border-purple-500/50"
        >
            <div className={`h-2 ${color}`}></div>
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                        {icon}
                    </div>
                    {stats && (
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stats}</span>
                    )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {description}
                </p>
            </div>
        </Link>
    );
}

export function DashboardHome() {
    const { user, logout } = useAuth();

    const modules = [
        {
            title: 'Leads & Captación',
            description: 'Gestiona tus prospectos, visualiza el funnel de conversión y analytics avanzados.',
            icon: <Users className="h-6 w-6 text-blue-500" />,
            to: '/leads',
            color: 'bg-blue-500',
            stats: '156 leads'
        },
        {
            title: 'Analytics',
            description: 'Métricas de rendimiento, KPIs y gráficos de tendencias en tiempo real.',
            icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
            to: '/leads?tab=stats',
            color: 'bg-purple-500',
            stats: '6 secciones'
        },
        {
            title: 'Conversaciones',
            description: 'Historial de chats de WhatsApp y análisis de sentimiento.',
            icon: <MessageSquare className="h-6 w-6 text-green-500" />,
            to: '/leads',
            color: 'bg-green-500',
            stats: 'WhatsApp'
        },
        {
            title: 'Objetivos',
            description: 'Seguimiento de metas de captación y cumplimiento de KPIs.',
            icon: <Target className="h-6 w-6 text-orange-500" />,
            to: '/leads?tab=stats',
            color: 'bg-orange-500',
            stats: '3 activos'
        },
        {
            title: 'Tendencias',
            description: 'Análisis de tópicos, temperatura de leads y proyecciones.',
            icon: <TrendingUp className="h-6 w-6 text-pink-500" />,
            to: '/leads?tab=stats',
            color: 'bg-pink-500',
            stats: 'AI Powered'
        },
        {
            title: 'Configuración',
            description: 'Ajustes de cuenta, integraciones y preferencias del sistema.',
            icon: <Settings className="h-6 w-6 text-gray-500" />,
            to: '/settings',
            color: 'bg-gray-500',
            stats: ''
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
            {/* Header */}
            <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <svg viewBox="0 0 100 100" className="w-10 h-10">
                                <defs>
                                    <linearGradient id="headerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#7C3AED" />
                                        <stop offset="100%" stopColor="#4C1D95" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="45" fill="url(#headerGradient)" />
                                <text x="50" y="68" fontFamily="Georgia, serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="white">ë</text>
                            </svg>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">Ëlite</span>
                        </div>

                        {/* User */}
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.displayName || user?.email}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                            <button
                                onClick={() => logout()}
                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                title="Cerrar sesión"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Bienvenido, {user?.displayName?.split(' ')[0] || 'Usuario'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Selecciona un módulo para comenzar
                    </p>
                </div>

                {/* Module Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module) => (
                        <ModuleCard key={module.title} {...module} />
                    ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white">
                    <h2 className="text-lg font-semibold mb-4">Resumen Rápido</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                            <p className="text-3xl font-bold">156</p>
                            <p className="text-purple-200 text-sm">Leads Totales</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">23</p>
                            <p className="text-purple-200 text-sm">Reuniones</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">68%</p>
                            <p className="text-purple-200 text-sm">Tasa Conversión</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">$45K</p>
                            <p className="text-purple-200 text-sm">Valor Pipeline</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
