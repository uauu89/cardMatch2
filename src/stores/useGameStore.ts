import { create } from "zustand";
import { useOptionStore } from "./useOptionStore";
import { devtools } from "zustand/middleware";
import type { Type_ComState, Type_currentPlayer, Type_GamePhase, Type_turnState } from "../types/game";

interface GameProps {
    gameVersion : number;
    gameMode: "single" | "vs",
    gamePhase: Type_GamePhase
    turnState: Type_turnState;
    currentPlayer: Type_currentPlayer;

    comState: Type_ComState;
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
    setGamePhase: (phase: Type_GamePhase) => void;
    setTurnState: (turn: Type_turnState) => void;
    setCurrentPlayer: (player: Type_currentPlayer) => void;

    setComState: (state : Type_ComState) => void;
    gameInitialSetup: (inputGameMode: "single" | "vs") => void;
    applyGameOption: () => void;
    endTurn_doneCardSelect: () => void;
    endTurn_timeOut: () => void;
    setNextPlayer: () => void;
    
}

export const useGameStore = create<GameProps>()(
    devtools(
        set => ({
            gameVersion: 0,
            gameMode: "single",
            gamePhase: "welcome",
            turnState: "ready",
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
            
            setGameMode: (mode) => set({gameMode: mode}),
            setGamePhase: (phase) => set({gamePhase: phase}),
            setTurnState: (turn) => set({turnState: turn}),
            setCurrentPlayer: (player) => set({currentPlayer: player}),
            setComState: (state) => set({comState: state}),
            applyGameOption: () => {
                const options = useOptionStore.getState();
                set({
                    opt_cardNum: Number(options.opt_cardNum),
                    opt_timerDuration: Number(options.opt_timerDuration),
                    opt_timerNoLimit: options.opt_timerNoLimit,
                    opt_cardPreview: options.opt_cardPreview,
                    opt_skipComState: options.opt_skipComState,
                    opt_continueTurn: options.opt_continueTurn,
                    difficultyDetails: {
                        remains: Number(options.difficultyDetails.remains),
                    },
                })

            },

            gameInitialSetup : (inputGameMode : "single" | "vs") => {
                const firstPlayer = inputGameMode === "single" ? "single" : "player";
                set(state => ({
                    gameVersion: state.gameVersion + 1,
                    gameMode: inputGameMode,
                    gamePhase: "gameStart",
                    turnState: "ready",
                    comState: "default",
                    currentPlayer: firstPlayer,
                }))
            },

            endTurn_doneCardSelect : () => {
                set({
                    turnState: "transition",
                })
            },

            endTurn_timeOut: () => {
                set({
                    turnState: "transition",
                })
            },
            
            setNextPlayer: () => {
                set(state => {
                    const nextPlayerMap: Record<Type_currentPlayer, Type_currentPlayer> = {
                        single: "single",
                        player: "com",
                        com: "player"
                    };
                    const currentPlayer = state.currentPlayer;
                    const resetComState = nextPlayerMap[currentPlayer] === "com"
                        ? state.opt_skipComState
                            ? "noEmotion"
                            : "default"
                        : state.comState
                    return {
                        comState: resetComState,
                        currentPlayer: nextPlayerMap[currentPlayer]
                    }
                })
            }
        }),

        {name: "useGameStore"}
    )
)