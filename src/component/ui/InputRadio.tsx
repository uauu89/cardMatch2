import "./InputRadio.css";

type RadioProps = {
    attr_label: string,
    attr_name: string,
    attr_checked: boolean,
}

const InputRadio = ({attr_label, attr_name, attr_checked}: RadioProps)=>{

    
    return (

        <label className="InputRadio">
            <input
                type="Radio"
                name={attr_name}
                checked={attr_checked}
            />
            {attr_label}
        </label>
    )
}

export default InputRadio;