import GameHUD from './component/GameHUD/GameHUD';
import GameBoard from './component/GameBoard/GameBoard';
import Settings from './component/Settings/Settings';
import GameOver from './component/GameOver/GameOver';

import "./CSS/fonts.css";
import "./CSS/variant.css";
import "./CSS/common.css";
import "./CSS/utility.css";
import { useState } from 'react';

function App() {
    const [gameStart, setGameStart] = useState<boolean>(false);

    const [endRendering, setEndRendering] = useState<boolean>(false);

    const [opt_previewAnimation, setOpt_previewAnimation] = useState<boolean>(true);
    const [opt_timer, setOpt_timer] = useState<number>(5);
    

    const [gamePhase, setGamePhase] = useState<"init" | "ready" | "dealing" | "playing">("init");
    const [gameMode, setGameMode] = useState<"single" | "vs">("single");

    /* 확장 고려 phase : paused, gameOver / result ... */

    return (
        <>
            <GameHUD
                endRendering={endRendering}
                opt_timer={opt_timer}
            />
            <GameBoard 
                gameStart={gameStart}
                opt_previewAnimation = {opt_previewAnimation}
                endRendering = {endRendering}
                setEndRendering = {setEndRendering}
            />
            <Settings 
                opt_previewAnimation={opt_previewAnimation}
                setOpt_previewAnimation={setOpt_previewAnimation}
                opt_timer={opt_timer}
                setOpt_timer={setOpt_timer}
            />
            {!gameStart && <GameOver setGameStart={setGameStart}/>}
        </>
    )
}

export default App
