import GameHUD from './component/GameHUD/GameHUD';
import GameBoard from './component/GameBoard/GameBoard';
import Settings from './component/Settings/Settings';
import GameOver from './component/GameOver/GameOver';

import "./CSS/variant.css";
import "./CSS/common.css";
import "./CSS/utility.css";

function App() {
    return (
        <>
            <div>깃허브 푸쉬 테스트</div>
            <GameHUD />
            <GameBoard />
            <Settings />
            <GameOver />
        </>
    )
}

export default App
