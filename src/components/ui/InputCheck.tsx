import "./InputCheck.css";

interface CheckProps {
    children?: React.ReactNode;
    checked: boolean;
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