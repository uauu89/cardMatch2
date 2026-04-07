import { create } from "zustand";
import { useOptionStore } from "./useOptionStore";

interface GameProps {
    gameMode: "single" | "vs",
    gamePhase: "ready" | "gameOver" | "dealing" | "playing";
    turnState: "active" | "transition" | "paused";
    currentPlayer: "single" | "player" | "ai";

    gameOption: {
        opt_cardNum: number;
        opt_timerDuration: number;
        opt_timerNoLimit: boolean;
        opt_cardPreview: boolean;
        difficultyDetails: {
            remains: number;
        }
    };

    setGameMode: (mode: "single" | "vs") => void;
    setGamePhase: (phase: "ready" | "gameOver" | "dealing" | "playing") => void;
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
                
                3. resetOpenedCards() 실행
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
                markCardOwner()    //cards_owner[]에 정답표시
                점수 계산
                if(모든 카드를 맞췄는지){
                    게임종료 처리
                }
            }else{
                점수계산 정답콤보수 초기화    
            }
        4. resetOpenedCards() 실행
        5. turnState를 "active"로 변경
    }


    
    
    
*/


export const useGameStore = create<GameProps>(set=>({
    gameMode: "single",
    gamePhase: "ready",
    turnState: "paused",
    currentPlayer: "single",

    gameOption: {
        opt_cardNum: 6,
        opt_timerDuration: 20,
        opt_timerNoLimit: false,
        opt_cardPreview: true,
        difficultyDetails: {
            remains: 10,
        },
    },

    setGameMode: (mode: "single" | "vs") => set({gameMode: mode}),
    setGamePhase: (phase: "ready" | "gameOver" | "dealing" | "playing") => set({gamePhase: phase}),
    setTurnState: (turn: "active" | "transition" | "paused") => set({turnState: turn}),
    setCurrentPlayer: (player: "single" | "player" | "ai") => set({currentPlayer: player}),

    updateGameOption: () => {
        const option = useOptionStore.getState();
        set({
            gameOption: {
                opt_cardNum: Number(option.opt_cardNum),
                opt_timerDuration: Number(option.opt_timerDuration),
                opt_timerNoLimit: option.opt_timerNoLimit,
                opt_cardPreview: option.opt_cardPreview,
                difficultyDetails: {
                    remains: Number(option.difficultyDetails.remains),
                },
            }
        })

    }

}))