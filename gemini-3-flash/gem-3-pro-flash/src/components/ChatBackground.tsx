export const ChatBackground = () => (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none z-0 overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M10 10 L20 10 L20 20 L10 20 Z" fill="currentColor" />
                    <path d="M50 50 L60 50 L60 60 L50 60 Z" fill="currentColor" />
                    <circle cx="80" cy="20" r="2" fill="currentColor" />
                    <circle cx="30" cy="70" r="2" fill="currentColor" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
    </div>
);
