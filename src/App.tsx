import GameHUD from './component/GameHUD/GameHUD';
import GameBoard from './component/GameBoard/GameBoard';
import Settings from './component/Settings/Settings';
import GameOver from './component/GameOver/GameOver';

import "./CSS/fonts.css";
import "./CSS/variant.css";
import "./CSS/common.css";
import "./CSS/utility.css";
import { useGameStore } from './stores/useGameStore';

function App() {
    const gamePhase = useGameStore(state=>state.gamePhase);
    

    const gameOver = ["welcome", "gameOver"].includes(gamePhase);

    return (
        <>
            <GameHUD />
            <GameBoard />
            <Settings />
            {gameOver && <GameOver />}
        </>
    )
}

export default App
