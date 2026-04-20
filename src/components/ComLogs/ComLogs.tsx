import { useLogStore } from "@/stores/useLogStore";
import "./ComLogs.css"

const ComLogs = () => {

    // const [logState, setLogState] = useState([

    // ])
    const logEntries = useLogStore(state => state.logEntries);

    const updateLogEntries = useLogStore(state => state.updateLogEntries);
    const clearLogEntries = useLogStore(state => state.clearLogEntries);

    return(

        <div className="ComLogs">

            <div>
                <button type="button" onClick={clearLogEntries}>클리어버튼</button>
            </div>

            <div>
                <ul>
                    {
                        logEntries.length > 0
                            ? logEntries.map(logEvent => <li key={logEvent.id} className={logEvent.class}>{logEvent.log}</li>)
                            : <li>출력할 내용이 없습니다</li>
                    }
                    {/* <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li> */}
                </ul>
            </div>

            {/* <div>
                <button type="button" onClick={()=>{updateLogEntries("test", "첫번째 카드 선택")}}>첫번째 카드 선택 케이스</button>
                <button type="button" onClick={()=>{updateLogEntries("logTestSubDepth1", "두번째 카드 선택")}}>두번째 카드 선택 케이스</button>
                <button type="button" onClick={()=>{updateLogEntries("logTestSubDepth2", "첫번째 카드 짝 알고 있음")}}>첫번째 카드 짝 알고 있음</button>
            </div> */}
        </div>

    )

}


export default ComLogs;