import "./InputRadio.css";

type RadioProps = {
    attr_name: string,
    attr_checked: boolean,
}

const InputRadio = ({attr_name, attr_checked}: RadioProps)=>{

    return (

        <label className="InputRadio">
            <input
                type="Radio"
                name={attr_name}
                checked={attr_checked}
            />
            라디오버튼
        </label>
    )
}

export default InputRadio;