import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, RefreshCw, BarChart2, Users, Menu, X, Home } from 'lucide-react';

interface NavbarProps {
    activeTab: 'leads' | 'stats';
    onTabChange: (tab: 'leads' | 'stats') => void;
    toggleTheme: () => void;
    theme: 'light' | 'dark';
    onRefresh: () => void;
    isLoading: boolean;
}

export function Navbar({ activeTab, onTabChange, toggleTheme, theme, onRefresh, isLoading }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Left: Logo + Desktop Nav */}
                <div className="flex items-center gap-4 sm:gap-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 sm:gap-3">
                        <svg viewBox="0 0 100 100" className="w-9 h-9 sm:w-10 sm:h-10">
                            <defs>
                                <linearGradient id="navGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#7C3AED" />
                                    <stop offset="100%" stopColor="#4C1D95" />
                                </linearGradient>
                            </defs>
                            <circle cx="50" cy="50" r="45" fill="url(#navGradient)" />
                            <text x="50" y="68" fontFamily="Georgia, serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="white">ë</text>
                        </svg>
                        <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white hidden sm:block">Ëlite</span>
                    </Link>

                    {/* Desktop Nav Tabs */}
                    <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 dark:bg-gray-900/50 p-1 rounded-lg">
                        <button
                            onClick={() => onTabChange('leads')}
                            className={`px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'leads'
                                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span className="hidden lg:inline">Detalle de Leads</span>
                                <span className="lg:hidden">Leads</span>
                            </div>
                        </button>
                        <button
                            onClick={() => onTabChange('stats')}
                            className={`px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'stats'
                                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <BarChart2 className="h-4 w-4" />
                                <span className="hidden lg:inline">Estadísticas</span>
                                <span className="lg:hidden">Stats</span>
                            </div>
                        </button>
                    </nav>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    {/* Home Button - Desktop */}
                    <Link
                        to="/"
                        className="hidden sm:flex p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Ir al inicio"
                    >
                        <Home className="h-5 w-5" />
                    </Link>

                    <button
                        onClick={onRefresh}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Refresh Data"
                        title="Actualizar Datos"
                    >
                        <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Menu"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-in slide-in-from-top duration-200">
                    <div className="px-4 py-3 space-y-2">
                        <Link
                            to="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <Home className="h-5 w-5" />
                            <span>Inicio</span>
                        </Link>
                        <button
                            onClick={() => { onTabChange('leads'); setMobileMenuOpen(false); }}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${activeTab === 'leads'
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            <Users className="h-5 w-5" />
                            <span>Detalle de Leads</span>
                        </button>
                        <button
                            onClick={() => { onTabChange('stats'); setMobileMenuOpen(false); }}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${activeTab === 'stats'
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            <BarChart2 className="h-5 w-5" />
                            <span>Estadísticas</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
