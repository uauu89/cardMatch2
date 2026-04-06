import "./InputCheck.css";

interface CheckProps {
    // labelText? : string;
    children?: React.ReactNode;
    checked: boolean;
    // checkHandler: React.Dispatch<React.SetStateAction<boolean>>;
    checkHandler: () => void;
}

const InputCheck = ({children, checked, checkHandler} : CheckProps)=>{

    return(
        <label className="InputCheck">
            <input type="checkbox" checked={checked} onChange={checkHandler}/>
            <span className="iconBox"></span>
            {children}
        </label>

    )
}

export default InputCheck;