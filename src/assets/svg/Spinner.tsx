import "./Spinner.css"

const Spinner = () => {

    return (
        <svg className="spinner" viewBox="0 0 50 50">
            <linearGradient id="grad" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4285f4"/>
                <stop offset="50%" stopColor="#ea4335"/>
                <stop offset="100%" stopColor="#fbbc05"/>
            </linearGradient>
            <circle
                className="path"
                cx="25"
                cy="25"
                r="18"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}

export default Spinner;