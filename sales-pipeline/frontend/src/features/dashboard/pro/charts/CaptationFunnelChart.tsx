import { Lead } from '../../../../types/lead';

interface CaptationFunnelChartProps {
    leads: Lead[];
}

export function CaptationFunnelChart({ leads }: CaptationFunnelChartProps) {
    // Calculate metrics
    const total = leads.length;
    const qualified = leads.filter(l => ['Lead_Qualified', 'Meeting_Booked'].includes(l.capture_status || '')).length;
    const meetings = leads.filter(l => l.meeting_scheduled).length;

    // Calculate conversion rates
    const conversion1 = total > 0 ? Math.round((qualified / total) * 100) : 0;
    const conversion2 = qualified > 0 ? Math.round((meetings / qualified) * 100) : 0;

    return (
        <div className="h-[300px] w-full flex items-center justify-center p-4">
            <svg viewBox="0 0 500 300" className="w-full h-full max-w-lg drop-shadow-sm">
                <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
                    </filter>
                    <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="gradYellow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#facc15" />
                        <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                    <linearGradient id="gradGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>

                {/* Stage 1: Contactados (Blue) */}
                <g transform="translate(50, 0)">
                    <path
                        d="M 0,0 L 400,0 L 360,90 L 40,90 Z"
                        fill="url(#gradBlue)"
                        className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                    />
                    <text x="200" y="40" textAnchor="middle" fill="white" className="text-sm font-medium uppercase tracking-wider opacity-90">Contactados</text>
                    <text x="200" y="70" textAnchor="middle" fill="white" className="text-3xl font-bold">{total}</text>
                </g>

                {/* Connector 1 */}
                <g transform="translate(460, 95)">
                    <text x="0" y="0" textAnchor="middle" className="text-xs font-bold fill-gray-500 dark:fill-gray-400">{conversion1}%</text>
                    <path d="M -5,5 L 0,10 L 5,5" stroke="currentColor" fill="none" className="text-gray-400" />
                </g>

                {/* Stage 2: Interesados (Yellow) */}
                <g transform="translate(50, 100)">
                    <path
                        d="M 40,0 L 360,0 L 320,90 L 80,90 Z"
                        fill="url(#gradYellow)"
                        className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                    />
                    <text x="200" y="40" textAnchor="middle" fill="white" className="text-sm font-medium uppercase tracking-wider opacity-90 shadow-sm">Interesados</text>
                    <text x="200" y="70" textAnchor="middle" fill="white" className="text-3xl font-bold shadow-sm">{qualified}</text>
                </g>

                {/* Connector 2 */}
                <g transform="translate(460, 195)">
                    <text x="0" y="0" textAnchor="middle" className="text-xs font-bold fill-gray-500 dark:fill-gray-400">{conversion2}%</text>
                    <path d="M -5,5 L 0,10 L 5,5" stroke="currentColor" fill="none" className="text-gray-400" />
                </g>

                {/* Stage 3: Reuniones (Green) */}
                <g transform="translate(50, 200)">
                    <path
                        d="M 80,0 L 320,0 L 280,90 L 120,90 Z"
                        fill="url(#gradGreen)"
                        className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                    />
                    <text x="200" y="40" textAnchor="middle" fill="white" className="text-sm font-medium uppercase tracking-wider opacity-90">Reuniones</text>
                    <text x="200" y="70" textAnchor="middle" fill="white" className="text-3xl font-bold">{meetings}</text>
                </g>
            </svg>
        </div>
    );
}
