import "./InputCheck.css";

interface CheckProps {
    labelText? : string;
    checked: boolean;
}

const InputCheck = ({labelText, checked} : CheckProps)=>{

    return(
        <label className="InputCheck">
            <input type="checkbox" checked={checked}/>
            <span className="iconBox"></span>
            {labelText}
        </label>

    )
}

export default InputCheck;