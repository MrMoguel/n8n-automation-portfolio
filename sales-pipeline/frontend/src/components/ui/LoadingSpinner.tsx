interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-32 h-32'
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className={`${sizeClasses[size]} animate-pulse`}>
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                    <defs>
                        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#7C3AED" />
                            <stop offset="100%" stopColor="#4C1D95" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" fill="url(#purpleGradient)" className="animate-spin origin-center" style={{ animationDuration: '3s' }} />
                    <text x="50" y="68" fontFamily="Georgia, serif" fontSize="60" fontWeight="bold" textAnchor="middle" fill="white" stroke="white" strokeWidth="1">ë</text>
                </svg>
            </div>
            {text && (
                <p className="text-gray-600 dark:text-gray-400 text-sm animate-pulse">{text}</p>
            )}
        </div>
    );
}
