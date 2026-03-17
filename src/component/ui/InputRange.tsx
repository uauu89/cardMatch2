
import { useState } from "react";
import "./InputRange.css"

const InputRange = ()=>{

    const [value, setValue] = useState(30);


    return(

        <input
            type="range"
            className="InputRange"
            style={{background : `linear-gradient(to right, var(--color_main) ${value}%, #fff ${value}%)`}}
            value={value}
            onChange={e=>{
                const changeValue = Number(e.target.value);
                setValue(changeValue)
            }}
        />
    )
}


export default InputRange;