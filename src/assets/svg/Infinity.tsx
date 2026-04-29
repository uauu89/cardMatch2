

const Infinity = () => {
    return(
        <svg width="200" height="100" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#4F46E5" />
                    <stop offset="100%" stop-color="#EC4899" />
                </linearGradient>
            </defs>
            <path 
                d="M50,50 C50,20 90,20 100,50 C110,80 150,80 150,50 C150,20 110,20 100,50 C90,80 50,80 50,50 Z" 
                pathLength="100"
                fill="none" 
                stroke="url(#spinnerGradient)" 
                strokeWidth="12" 
                strokeLinecap="round"
                strokeDasharray="90 10" 
            >
            <animate 
                attributeName="stroke-dashoffset" 
                from="100" 
                to="0" 
                dur="3s"
                repeatCount="indefinite" 
                calcMode="paced"
            />
            </path>
        </svg>
    )
}

export default Infinity;