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

    const modal_comLogs = useUIStore(state => state.modal_comLogs);

    return (
        <div className={`gameContainer ${modal_comLogs && "openLog"}`}>
            <GameHUD />
            {/* <div className='gridContentsB'> */}
            <ComLogs />
            {/* </div> */}
            <div className='gridContentsBox scroll'>
                <GameBoard />
            </div>
            <Settings />
            {gameOver && <GameOver />}
        </div>
    )
}

export default App;
