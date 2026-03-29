import "./InputCheck.css";

interface CheckProps {
    // labelText? : string;
    children?: React.ReactNode;
    checked: boolean;
    checkHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputCheck = ({children, checked, checkHandler} : CheckProps)=>{

    const onCheckHandler = ()=>{
        checkHandler(prev=>!prev);
    }

    return(
        <label className="InputCheck">
            <input type="checkbox" checked={checked} onChange={onCheckHandler}/>
            <span className="iconBox"></span>
            {children}
        </label>

    )
}

export default InputCheck;