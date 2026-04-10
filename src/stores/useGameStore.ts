import { create } from "zustand";
import { useOptionStore } from "./useOptionStore";

interface GameProps {
    gameMode: "single" | "vs",
    gamePhase: "ready" | "gameOver" | "gameStart" | "dealing" | "playing";
    turnState: "active" | "transition" | "paused";
    cardChecking: "ready" | "checking" | "done";
    currentPlayer: "single" | "player" | "ai";
    
    opt_cardNum: number;
    opt_timerDuration: number;
    opt_timerNoLimit: boolean;
    opt_cardPreview: boolean;
    opt_continueTurn: boolean;
    difficultyDetails: {
        remains: number;
    };

    setGameMode: (mode: "single" | "vs") => void;
    setGamePhase: (phase: "ready" | "gameOver" | "gameStart" | "dealing" | "playing") => void;
    setTurnState: (turn: "active" | "transition" | "paused") => void;
    setCardChecking: (step: "ready" | "checking" | "done") => void;
    setCurrentPlayer: (player: "single" | "player" | "ai") => void;
    applyGameOption: () => void;
    turnTransition: () => void;
    determineFirstPlayer: () => void;
    setNextPlayer: () => void;
    
}

export const useGameStore = create<GameProps>(set=>({
    gameMode: "single",
    gamePhase: "ready",
    turnState: "paused",
    cardChecking: "done",
    currentPlayer: "single",
    
    opt_cardNum: 6,
    opt_timerDuration: 20,
    opt_timerNoLimit: false,
    opt_cardPreview: true,
    opt_continueTurn: false,
    difficultyDetails: {
        remains: 10,
    },

    setGameMode: (mode: "single" | "vs") => set({gameMode: mode}),
    setGamePhase: (phase: "ready" | "gameOver" | "gameStart" | "dealing" | "playing") => set({gamePhase: phase}),
    setTurnState: (turn: "active" | "transition" | "paused") => set({turnState: turn}),
    setCardChecking: (step: "ready" | "checking" | "done") => set({cardChecking: step}),
    setCurrentPlayer: (player: "single" | "player" | "ai") => set({currentPlayer: player}),

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

    turnTransition : () => {
        set({
            turnState: "transition",
            cardChecking: "checking",
        })
    },

    determineFirstPlayer: () => {
        set(state => {
            const gameMode = state.gameMode;
            const firstPlayer = gameMode === "single" ? "single" : "player";
            return {
                currentPlayer: firstPlayer
            }

        })
    },
    
    setNextPlayer: () => {
        set(state => {
            type Player = "single" | "player" | "ai";
            const nextPlayerMap: Record<Player, Player> = {
                single: "single",
                player: "ai",
                ai: "player"
            };
            const currentPlayer = state.currentPlayer;
            return {
                currentPlayer: nextPlayerMap[currentPlayer]
            }
        })
    }



}))