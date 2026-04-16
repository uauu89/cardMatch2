import "./InputNumber.css"

interface NumberProps {
    unit?: string;
    min?: number;
    max?: number;
    value: number | "";
    disabled?: boolean;

    changeHandler : (num: number | "") => void;
    
}

const InputNumber = ({unit, min, max, value, disabled, changeHandler}: NumberProps)=>{

    return(
        <div className="inputNumber">
            <input 
                type="number" 
                min={min}
                max={max}
                value={value}
                disabled={disabled}

               
                onChange={(e)=>{
                    const inputValue = e.currentTarget.value;

                    if(inputValue === ""){
                        changeHandler("");
                        return;
                    }

                    const newValue = Number(inputValue);
                    if(Number.isNaN(newValue)) return;
                    changeHandler(newValue);
                    
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
                    changeHandler(newValue);
                }}
                
            />
            <span className="unit">{unit}</span>
        </div>
    )
}

export default InputNumber;