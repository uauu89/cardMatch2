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
    const [gameStart, setGameStart] = useState<boolean>(true);

    return (
        <>
            <GameHUD />
            <GameBoard 
                gameStart={gameStart}
                setGameStart={setGameStart}
            />
            <Settings />
            {false && <GameOver />}
        </>
    )
}

export default App
