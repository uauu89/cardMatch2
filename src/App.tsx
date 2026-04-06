import GameHUD from './component/GameHUD/GameHUD';
import GameBoard from './component/GameBoard/GameBoard';
import Settings from './component/Settings/Settings';
import GameOver from './component/GameOver/GameOver';

import "./CSS/fonts.css";
import "./CSS/variant.css";
import "./CSS/common.css";
import "./CSS/utility.css";
import { useEffect, useState } from 'react';
import { useGameStore } from './stores/useGameStore';
import { useShallow } from 'zustand/shallow';

function App() {
    const [gameStart, setGameStart] = useState<boolean>(false);

    const {gamePhase} = useGameStore(useShallow(state=>({
        gamePhase: state.gamePhase,
    })))

    const gameOver = ["ready", "gameOver"].includes(gamePhase);

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
