import "./InputRadio.css";

type RadioProps<T> = {
    label: string;
    name: string;
    value: T;
    checked: boolean;
    changeHandler: (val: T) => void;
}

const InputRadio = <T,>({label, name, checked, value, changeHandler}: RadioProps<T>)=>{

    
    return (

        <label className="InputRadio">
            <input
                type="Radio"
                name={name}
                value={value as any}
                checked={checked}
                onChange={() => {changeHandler(value)}}
            />
            {label}
        </label>
    )
}

export default InputRadio;