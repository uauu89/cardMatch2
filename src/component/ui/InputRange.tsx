import "./InputRange.css"

type NumberValue = number | "";

interface RangeProps {
    min? : number;
    max? : number;
    step? : number;
    value?: NumberValue;
    changeHandler : (num: NumberValue) => void;
}

const InputRange = ({min = 0, max = 100, step = 1, value = 0, changeHandler} : RangeProps)=>{

    const rangeValue = value === "" ? 0 : value;
    const rangePercent = (rangeValue - min) / (max - min) * 100;


    return(

        <input
            type="range"
            className="InputRange"
            min={min}
            max={max}
            step={step}
            
            style={{background : `linear-gradient(to right, var(--color_main) ${rangePercent}%, #fff ${rangePercent}%)`}}
            value={rangeValue}
            onChange={(e)=>{
                const inputValue = e.currentTarget.value;
                changeHandler(Number(inputValue));
            }}
            
        />
    )
}


export default InputRange;