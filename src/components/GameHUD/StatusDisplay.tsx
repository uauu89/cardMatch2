import { useGameStore } from "@stores/useGameStore";
import ComStatus from "./ComStatus";

import "./StatusDisplay.css"
import Spinner from "@svg/Spinner";
import { useScoreStore } from "@/stores/useScoreStore";
import UserStatus from "./UserStatus";

const StatusDisplay = () => {
    const gameMode = useGameStore(state => state.gameMode);
    const gamePhase = useGameStore(state => state.gamePhase);
    const turnState = useGameStore(state => state.turnState);
    const currentPlayer = useGameStore(state => state.currentPlayer);

    const playerScore = useScoreStore(state => state.playerScore);
    const comScore = useScoreStore(state => state.comScore);



    let printText;

    if(gamePhase === "welcome"){
        printText = "welcome";
    }else if(gamePhase === "gameOver"){
        if(gameMode === "single"){
            printText = "game end";
        }else{
            printText = playerScore === comScore 
                            ? "draw"
                            : playerScore > comScore
                                ? "win"
                                : "lose"
        }
    }else if(gamePhase === "dealing"){
        printText = "shuffle";
    }


    // const [timerOn, setTimerOn] = useState(false);
    // const handleTimeOut = useCallback(() => setTimerOn(false), []);
    
    /* 
    useEffect(()=>{
        if(
            gamePhase === "playing"
            && turnState === "active"
            && currentPlayer !== "com"
            && !opt_timerNoLimit
        ){
            setTimerOn(true);
        }else{
            setTimerOn(false);
        }
    }, [gamePhase, turnState, currentPlayer]);
    */
    
    return (
        <div className="StatusDisplay">
            {
                gamePhase === "playing" 
                    ? currentPlayer === "com"
                        ? <ComStatus />
                        : turnState === "active"
                            ? <UserStatus />
                            : turnState === "transition" && <Spinner id={"transitionLoading"} type={"loading"} strokeColor={[]} r={20} strokeWidth={3}/>
                    : printText
            }
            
            
        </div>
    )
}

export default StatusDisplay


