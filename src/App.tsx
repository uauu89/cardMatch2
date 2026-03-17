import GameHUD from './component/GameHUD/GameHUD'
import GameBoard from './component/GameBoard/GameBoard'
import Settings from './component/Settings/Settings'
import GameButton from './ui/GameButton'

import "./CSS/common.css"
function App() {

    return (
        <>
            <div>깃허브 푸쉬 테스트</div>
            <GameHUD />
            <GameBoard />
            {false && <Settings />}
        </>
    )
}

export default App
