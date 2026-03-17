import GameHUD from './component/GameHUD/GameHUD'
import GameBoard from './component/GameBoard/GameBoard'
import Settings from './component/Settings/Settings'
import GameOver from './component/GameOver/GameOver'

import "./CSS/variant.css"
import "./CSS/common.css"
function App() {
    return (
        <>
            <GameHUD />
            <GameBoard />
            <Settings />
            <GameOver />
        </>
    )
}

export default App
