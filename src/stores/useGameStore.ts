import { create } from "zustand";
import { useOptionStore } from "./useOptionStore";
import { devtools } from "zustand/middleware";

interface GameProps {
    gameMode: "single" | "vs",
    gamePhase: "welcome" | "gameOver" | "gameStart" | "dealing" | "playing";
    turnState: "ready" | "active" | "transition" | "paused";
    cardChecking: "ready" | "checking" | "timeout";
    currentPlayer: "single" | "player" | "com";

    comState: "default" | "skip";
    opt_skipComState : boolean;
    
    opt_cardNum: number;
    opt_timerDuration: number;
    opt_timerNoLimit: boolean;
    opt_cardPreview: boolean;
    opt_continueTurn: boolean;
    difficultyDetails: {
        remains: number;
    };



    setGameMode: (mode: "single" | "vs") => void;
    setGamePhase: (phase: "welcome" | "gameOver" | "gameStart" | "dealing" | "playing") => void;
    setTurnState: (turn: "ready" | "active" | "transition" | "paused") => void;
    setCardChecking: (step: "ready" | "checking" | "timeout") => void;
    setCurrentPlayer: (player: "single" | "player" | "com") => void;
    gameInitialSetup: (inputGameMode: "single" | "vs") => void;
    applyGameOption: () => void;
    endTurn_doneCardSelect: () => void;
    endTurn_timeOut: () => void;
    setNextPlayer: () => void;
    
}

export const useGameStore = create<GameProps>()(
    devtools(
        set => ({
            gameMode: "single",
            gamePhase: "welcome",
            turnState: "ready",
            cardChecking: "ready",
            currentPlayer: "single",
            comState: "default",

            opt_skipComState : false,
            
            opt_cardNum: 6,
            opt_timerDuration: 20,
            opt_timerNoLimit: false,
            opt_cardPreview: true,
            opt_continueTurn: false,
            difficultyDetails: {
                remains: 10,
            },
            
            setGameMode: (mode: "single" | "vs") => set({gameMode: mode}),
            setGamePhase: (phase: "welcome" | "gameOver" | "gameStart" | "dealing" | "playing") => set({gamePhase: phase}),
            setTurnState: (turn: "ready" | "active" | "transition" | "paused") => set({turnState: turn}),
            setCardChecking: (step: "ready" | "checking" | "timeout") => set({cardChecking: step}),
            setCurrentPlayer: (player: "single" | "player" | "com") => set({currentPlayer: player}),

            applyGameOption: () => {
                const options = useOptionStore.getState();
                set({
                    opt_cardNum: Number(options.opt_cardNum),
                    opt_timerDuration: Number(options.opt_timerDuration),
                    opt_timerNoLimit: options.opt_timerNoLimit,
                    opt_cardPreview: options.opt_cardPreview,
                    opt_continueTurn: options.opt_continueTurn,
                    difficultyDetails: {
                        remains: Number(options.difficultyDetails.remains),
                    },
                })

            },

            gameInitialSetup : (inputGameMode : "single" | "vs") => {
                const firstPlayer = inputGameMode === "single" ? "single" : "player";
                set({
                    gameMode: inputGameMode,
                    gamePhase: "gameStart",
                    comState: "default",
                    cardChecking: "ready",
                    currentPlayer: firstPlayer,
                })
            },

            endTurn_doneCardSelect : () => {
                set({
                    turnState: "transition",
                    cardChecking: "checking",
                })
            },

            endTurn_timeOut: () => {
                set({
                    turnState: "transition",
                    cardChecking: "timeout",
                })
            },
            
            setNextPlayer: () => {
                set(state => {
                    type Player = "single" | "player" | "com";
                    const nextPlayerMap: Record<Player, Player> = {
                        single: "single",
                        player: "com",
                        com: "player"
                    };
                    const currentPlayer = state.currentPlayer;
                    return {
                        currentPlayer: nextPlayerMap[currentPlayer]
                    }
                })
            }
        }),

        {name: "useGameStore"}
    )
)