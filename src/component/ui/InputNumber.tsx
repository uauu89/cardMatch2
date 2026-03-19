import { useState } from "react";
import "./InputNumber.css"

interface NumberProps {
    unit?: string;
    min?: number;
    max?: number;
    value: number;
    disabled?: boolean;
    
}

const InputNumber = ({unit, min, max, value, disabled}: NumberProps)=>{

    const [inputValue, setInputValue] = useState<number | "">(4);
    return(
        <div className="inputNumber">
            <input 
                type="number" 
                min={min}
                max={max}
                value={inputValue}
                disabled={disabled}

               
                onChange={(e)=>{
                    const inputValue = e.currentTarget.value;

                    if(inputValue === ""){
                        setInputValue("");
                        return;
                    }

                    const newValue = Number(inputValue);
                    if(Number.isNaN(newValue)) return;
                    setInputValue(newValue);
                    
                }}
                onBlur={e=>{
                    const blurValue = Number(e.currentTarget.value);
                    let newValue = blurValue;

                    if(min !== undefined && newValue < min){
                        newValue = min;
                    }
                    if(max !== undefined && newValue > max){
                        newValue = max;
                    }
                    setInputValue(newValue);
                }}
                
            />
            <span className="unit">{unit}</span>
        </div>
    )
}

export default InputNumber;