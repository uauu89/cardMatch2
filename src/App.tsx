import GameHUD from './component/GameHUD/GameHUD'
import GameBoard from './component/GameBoard/GameBoard'
import Settings from './component/Settings/Settings'
import GameButton from './ui/GameButton'

import "./CSS/common.css"
function App() {

    return (
        <>
            <GameHUD />
            <GameBoard />
            {false && <Settings />}
        </>
    )
}

export default App
