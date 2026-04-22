import { useLogStore } from "@/stores/useLogStore";
import "./ComLogs.css"
import { useUIStore } from "@/stores/useUIStore";
import IconCaretRight from "@/assets/icons/IconCaretRight";
import { useEffect, useRef } from "react";

const ComLogs = () => {
    const comLogs_isOpen = useUIStore(state => state.comLogs_isOpen);
    const toggle_modalComLogs = useUIStore(state => state.toggle_modalComLogs);

    const logEntries = useLogStore(state => state.logEntries);
    const clearLogEntries = useLogStore(state => state.clearLogEntries);

    const logEntriesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(logEntriesRef.current){
            logEntriesRef.current.scrollTop = logEntriesRef.current.scrollHeight;
        }

    }, [logEntries])

    return(

        <div className="ComLogsContainer">
            <button type="button" className={`comLogButton ${comLogs_isOpen && "opend"}`} onClick={toggle_modalComLogs}>
                <IconCaretRight size={12}/>
            </button>
            
            {comLogs_isOpen && 
                <div className="ComLogs">
                    <div className="ComLogsScrollBox" ref={logEntriesRef}>
                        <ul>
                            {logEntries.length > 0
                                ? logEntries.map(logEvent => 
                                    <li key={logEvent.id} className={`logEvent ${logEvent.class}`}>
                                        <div className="logClass">{logEvent.caseID}</div>
                                        <div>{logEvent.log}</div>
                                    </li>
                                )
                                : <li className="empty">출력할 내용이 없습니다</li>
                            }
                        </ul>
                    </div>

                    <button type="button" className="logEntriesClearButton" onClick={clearLogEntries}>clear</button>
                </div>
            }
        </div>
    )
}


export default ComLogs;