import { create } from "zustand";

interface GameProps {
    gameMode: "single" | "vs",
    gamePhase: "init" | "ready" | "dealing" | "playing";
    turnState: "active" | "transition" | "paused";
    currentPlayer: "single" | "player" | "ai";


    setGameMode: (mode: "single" | "vs") => void;
    setGamePhase: (phase: "init" | "ready" | "dealing" | "playing") => void;
    setTurnState: (turn: "active" | "transition" | "paused") => void;
    setCurrentPlayer: (player: "single" | "player" | "ai") => void;
    
}


/*
    타이머 여부

    - 타이머 작동 > setInterval
    - 타임아웃 > state 
    - 타이머 리셋 > 타이머 초기화
    
    >>> 타이머 자체는 타이머 로컬로 작성



    게임 시작버튼 클릭하면(){
        1. cardShuffle()  // 카드배열(cards_value) 생성
        2. gamePhase를 "dealing"으로 변경
            * 1, 2번 조건으로 카드 컴포넌트 렌더링, 
            * 카드 렌더링 완료 후 카드컴포넌트에서 1) gamePhase를 "playing"으로 변경, 2)turnState를 "active"로 변경
    }


    타이머 컴포넌트에서
    useEffect(()=>{
        if(turnState가 active일 때){
            
            타이머 작동 setInterval(()=>{

            if(타이머가 0초가 되면){
                1. turnState를 "transition"으로 변경
                
                3. resetOpendCards() 실행
                4. 점수계산 정답콤보수 초기화
                5. turnState를 "active"로 변경
            }
            
            
            }, 1000)
            
        }else if(turnState가 transition일 때){
            1. clearInterval
            2. 타이머 남은시간 초기화
        }
        
    }, [turnState])


    카드 컴포넌트 클릭 이벤트에서
    if(카드 두 장을 선택하면 ){
        1. turnState를 "transition"으로 변경
        
        3. 두 장의 카드 정답여부 체크
            if(정답이면){
                markingCardOwner()    //cards_owner[]에 정답표시
                점수 계산
                if(모든 카드를 맞췄는지){
                    게임종료 처리
                }
            }else{
                점수계산 정답콤보수 초기화    
            }
        4. resetOpendCards() 실행
        5. turnState를 "active"로 변경
    }


    
    
    
*/


export const useGameStore = create<GameProps>(set=>({
    gameMode: "single",
    gamePhase: "init",
    turnState: "paused",
    currentPlayer: "single",

    setGameMode: (mode: "single" | "vs") => set({gameMode: mode}),
    setGamePhase: (phase: "init" | "ready" | "dealing" | "playing") => set({gamePhase: phase}),
    setTurnState: (turn: "active" | "transition" | "paused") => set({turnState: turn}),
    setCurrentPlayer: (player: "single" | "player" | "ai") => set({currentPlayer: player}),

}))