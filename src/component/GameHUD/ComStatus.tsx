import { useGameStore } from "../../stores/useGameStore";

const ComStatus = () => {

    const comState = useGameStore(state => state.comState);

    return (
        <div>
            {comState};
        </div>
    )
}


export default ComStatus;