import { useGameStore } from '@stores/useGameStore';

import GameHUD from '@components/GameHUD/GameHUD';
import GameBoard from '@components/GameBoard/GameBoard';
import Settings from '@components/Settings/Settings';
import ComLogs from '@/components/ComLogs/ComLogs';
import GameOver from '@components/GameOver/GameOver';

import "@css/fonts.css";
import "@css/variant.css";
import "@css/common.css";
import "@css/utility.css";

function App() {
    const gamePhase = useGameStore(state=>state.gamePhase);
    const gameOver = ["welcome", "gameOver"].includes(gamePhase);

    return (
        <>
            <GameHUD />
            <GameBoard />
            <Settings />
            <ComLogs />
            {/* {gameOver && <GameOver />} */}
        </>
    )
}

export default App;
