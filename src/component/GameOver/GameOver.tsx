import GameButton from "../ui/GameButton";
import "./GameOver.css"

const GameOver = ()=>{

    return (
        <div className="GameOver__bg">

            <div className="GameOver__window">
                {/* <>
                    새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.
                </> */}

                {/* <>
                    <h2 className="GameOver__title">게임 종료</h2>
                    <p>최종점수 : 900</p>
                    <div>
                        <p>게임이 끝났습니다.</p>
                        <p>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>
                    </div>
                </> */}

                <>
                    <h2 className="GameOver__title">승리</h2>
                    <p>800점 : 400점 으로 승리했습니다.</p>
                    <div className="div">
                        <p>게임이 끝났습니다.</p>
                        <p>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>
                    </div>
                </>

                <div className="GameButtonWrap">
                    <GameButton inputGameMode="single"/>
                    <GameButton inputGameMode="vs"/>
                </div>
            </div>


        </div>

    )
}

export default GameOver;