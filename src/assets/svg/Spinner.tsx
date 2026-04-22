import "./Spinner.css"

interface SpinnerType{
    id: string;
    type: "loading" | "timer";
    timerDuration?: number;
    r: number;
    strokeColor?: string | string[];
    strokeWidth: number;
}

const Spinner = ({id, type, timerDuration = 0, r, strokeColor = "var(--color_main)", strokeWidth} : SpinnerType) => {

    let strokeValue: string = "";
    let gradientColors: string[] | null = null;

    if(Array.isArray(strokeColor)){
        strokeValue = `url(#${id})`;
        gradientColors = strokeColor.length === 0 
            ? ["#4285f4", "#ea4335", "#fbbc05"] 
            : strokeColor;
    }else{
        strokeValue = strokeColor;
    }

    const circumference = r * 3.1416 * 2;
    const strokeDashOffset = 0.25 - ((strokeWidth / 2) / circumference);

    return (
        <svg className={`spinner--${type}`} viewBox="0 0 50 50">
            
            <linearGradient id={id} gradientUnits="userSpaceOnUse">
                {gradientColors !== null && 
                    gradientColors.map((color, index) => 
                        <stop key={index} offset={`${ 100 / (gradientColors.length - 1) * index }%`} stopColor={color}/>
                    )
                }
               
            </linearGradient>
            <circle
                className={`path--${type}`}
                cx="25"
                cy="25"
                r={r}
                pathLength="1"
                fill="none"
                stroke={strokeValue}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                style={{ 
                    "--timerDuration": timerDuration + "s", 
                    "--strokeDashOffset": strokeDashOffset,
                    "--strokeColor": !Array.isArray(strokeColor)? strokeValue : "",
                } as React.CSSProperties}
            />
        </svg>
    )
}

export default Spinner;