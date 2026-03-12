import { useState } from "react";
import "./Timer.css"

const Timer = ()=>{

    const [time, setTime] = useState(89)

    return(
        <div className="Timer">
            {time}
        </div>
    )
}

export default Timer;