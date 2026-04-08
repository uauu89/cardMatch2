import { create } from "zustand";

interface scoreProps{
    playerCombo: number;
    playerScore: number;
    aiCombo: number;
    aiScore: number;

    setPlayerCombo: (num: number) => void;
    setPlayerScore: (num: number) => void;
    setAiCombo: (num: number) => void;
    setAiScore: (num: number) => void;

    correctScore: (targetPlayer: "single" | "player" | "ai") => void;
    wrongScore: (targetPlayer: "single" | "player" | "ai") => void;

    clearScore: () => void;
}

export const useScoreStore = create<scoreProps>(set => ({
    playerCombo: 0,
    playerScore: 0,
    aiCombo: 0,
    aiScore: 0,

    setPlayerCombo: (num) => set({playerCombo: num}),
    setPlayerScore: (num) => set({playerScore: num}),
    setAiCombo: (num) => set({aiCombo: num}),
    setAiScore: (num) => set({aiScore: num}),

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
        aiCombo: 0,
        aiScore: 0,
    })


}))