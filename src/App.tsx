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
import { useUIStore } from './stores/useUIStore';

function App() {
    const gamePhase = useGameStore(state=>state.gamePhase);
    const gameOver = ["welcome", "gameOver"].includes(gamePhase);

    const comLogs_isOpen = useUIStore(state => state.comLogs_isOpen);

    return (
        <div className={`gameContainer ${comLogs_isOpen && "openLog"}`}>
            <GameHUD />
            <ComLogs />
            <div className='gridContentsBox scroll'>
                <GameBoard />
            </div>
            <Settings />
            {gameOver && <GameOver />}
        </div>
    )
}

export default App;
