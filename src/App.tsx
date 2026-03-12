import GameHUD from './component/GameHUD/GameHUD'
import GameBoard from './component/GameBoard/GameBoard'
import Settings from './component/Settings/Settings'
import GameButton from './ui/GameButton'

function App() {

    return (
        <>
            <GameHUD />
            <GameBoard />
            <GameButton />
            {false && <Settings />}
        </>
    )
}

export default App
