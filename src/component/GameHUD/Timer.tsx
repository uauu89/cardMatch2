import { useEffect, useRef, useState } from "react";
import "./Timer.css"

interface TimerProps {
    endRendering: boolean;
    opt_timer: number;
}

const Timer = ({endRendering, opt_timer} : TimerProps)=>{

    const [time, setTime] = useState(opt_timer);
    const timerRef = useRef<number | null>(null);
    const [timerRunning, setTimerRunning] = useState(true);


    useEffect(()=>{

        if(!timerRunning) return;

        timerRef.current = setInterval(()=>{
            setTime(prev=>{
                if(prev <= 1){
                    setTimerRunning(false);
                    return 0
                }
                return prev -1;
            });
            
        }, 1000)

        return ()=>{
            if(timerRef.current !== null) clearInterval(timerRef.current);
        };

    }, [timerRunning])


    // useEffect(()=>{
    //     if(endRendering){
    //         console.log("timer Excute");
    //     }
    // }, [endRendering])

    return(
        <div className="Timer">

            {timerRunning && endRendering && time}
        </div>
    )
}

export default Timer;