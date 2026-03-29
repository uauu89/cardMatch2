import { useEffect, useState } from "react";
import "./Timer.css"

interface TimerProps {
    endRendering: boolean;
    opt_timer: number;
}

const Timer = ({endRendering, opt_timer} : TimerProps)=>{

    const [time, setTime] = useState(opt_timer);


    useEffect(()=>{
        if(endRendering){
            console.log("timer Excute");
        }
    }, [endRendering])

    return(
        <div className="Timer">
            {endRendering && time}
        </div>
    )
}

export default Timer;