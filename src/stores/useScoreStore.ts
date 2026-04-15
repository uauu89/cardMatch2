import { create } from "zustand";
import type { Type_currentPlayer } from "../types/game";

interface scoreProps{
    playerCombo: number;
    playerScore: number;
    comCombo: number;
    comScore: number;

    setPlayerCombo: (num: number) => void;
    setPlayerScore: (num: number) => void;
    setComCombo: (num: number) => void;
    setComScore: (num: number) => void;

    correctScore: (targetPlayer: Type_currentPlayer) => void;
    wrongScore: (targetPlayer: Type_currentPlayer) => void;

    clearScore: () => void;
}

export const useScoreStore = create<scoreProps>(set => ({
    playerCombo: 0,
    playerScore: 0,
    comCombo: 0,
    comScore: 0,

    setPlayerCombo: (num) => set({playerCombo: num}),
    setPlayerScore: (num) => set({playerScore: num}),
    setComCombo: (num) => set({comCombo: num}),
    setComScore: (num) => set({comScore: num}),

    correctScore : (targetPlayer) => set(state => {
        const target = targetPlayer === "single" ? "player" : targetPlayer;
        const newCombo = state[`${target}Combo`] + 1;
        const newScore = newCombo * 100 + state[`${target}Score`];
        return {
            [`${target}Combo`]: newCombo,
            [`${target}Score`]: newScore,
        }
    }),
    wrongScore : (targetPlayer) => set(state => {
        const target = targetPlayer === "single" ? "player" : targetPlayer;
        return {
            [`${target}Combo`]: 0
        }
    }),

    clearScore: () => set({
        playerCombo: 0,
        playerScore: 0,
        comCombo: 0,
        comScore: 0,
    })


}))