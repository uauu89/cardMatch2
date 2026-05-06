import { useGameStore } from "@/stores/useGameStore";
import Infinity from "@/assets/svg/Infinity";
import Timer from "./Timer";

const UserStatus = () => {

    const opt_timerNoLimit = useGameStore(state => state.opt_timerNoLimit);
    const opt_timerDuration = useGameStore(state => state.opt_timerDuration);

    return (
        <>
            {opt_timerNoLimit
                ? <Infinity />
                : <Timer duration={opt_timerDuration}/>
            }
        </>
    )
}

export default UserStatus;