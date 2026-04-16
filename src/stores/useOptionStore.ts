import { create } from "zustand";

type NumberValue = number | "";

type DifficultyConfig = {
    opt_pairIndices: NumberValue;
    opt_pairSecondIndex: NumberValue;
    opt_unknownIndices: NumberValue;
    opt_knownIndices: NumberValue;
    opt_remainRatio: NumberValue;
    opt_mistake: NumberValue;
};

interface OptionProps{
    // 공통 옵션
    opt_cardNum: NumberValue;
    opt_timerDuration: NumberValue;
    opt_timerNoLimit: boolean;

    opt_cardSize: number;
    opt_cardSizeResponsive: boolean;

    // 싱글 옵션
    opt_cardPreview: boolean;

    // 대전 옵션
    opt_skipComState: boolean;
    opt_continueTurn: boolean;
    opt_difficultyLevel: number;

    // ditails : number;
    difficultyDetails : {
        opt_pairIndices: NumberValue,
        opt_pairSecondIndex: NumberValue,
        opt_unknownIndices: NumberValue,
        opt_knownIndices: NumberValue,
        opt_remainRatio: NumberValue,
        opt_mistake: NumberValue,
    }


    setOpt_cardNum: (num: NumberValue) => void;
    setOpt_timerDuration: (num: NumberValue) => void;
    setOpt_timerNoLimit: () => void;
    
    setOpt_cardSize: (num: number) => void;
    setOpt_cardSizeResponsive: () => void;

    setOpt_cardPreview: () => void;

    setOpt_skipComState: () => void;
    setOpt_continueTurn: () => void;

    setDifficulty_update: (config: Partial<DifficultyConfig>) => void;
    updateDifficultyLevel: (level: number) => void;
}

export const useOptionStore = create<OptionProps>(set => ({
    opt_cardNum: 4,
    opt_timerDuration: 3,
    opt_timerNoLimit: false,

    opt_cardSize: 1,
    opt_cardSizeResponsive: false,

    opt_cardPreview: false,

    opt_skipComState: false,
    opt_continueTurn: false,
    opt_difficultyLevel: 3,

    difficultyDetails: {
        opt_pairIndices: 80,
        opt_pairSecondIndex: 80,
        opt_unknownIndices: 80,
        opt_knownIndices: 30,
        opt_remainRatio: 10,
        opt_mistake: 30,
    },

    setOpt_cardNum: (num)=>set({opt_cardNum: num}),
    setOpt_timerDuration: (num)=>set({opt_timerDuration: num}),
    setOpt_timerNoLimit: () => set(state => ({opt_timerNoLimit: !state.opt_timerNoLimit})),

    setOpt_cardSize: (num) => set(state => {
        if(state.opt_cardSize === num) return state;
        return {opt_cardSize: num};
    }),
    setOpt_cardSizeResponsive: () => set(state => ({opt_cardSizeResponsive: !state.opt_cardSizeResponsive})),

    setOpt_cardPreview: () => set(state => ({opt_cardPreview: !state.opt_cardPreview})),

    setOpt_skipComState : () => set(state => ({opt_skipComState : !state.opt_skipComState})),
    setOpt_continueTurn : () => set(state => ({opt_continueTurn : !state.opt_continueTurn})),

    setDifficulty_update: (config) => set(state => ({
        difficultyDetails: {
            ...state.difficultyDetails,
            ...config,
        }
    })),

    updateDifficultyLevel: (level) => set(state => {
        
        const difficultyMap = [
            {
                opt_pairIndices: 70,
                opt_pairSecondIndex: 70,
                opt_unknownIndices: 80,
                opt_knownIndices: 0,
                opt_remainRatio: 0,
                opt_mistake: 60,
            }, {
                opt_pairIndices: 80,
                opt_pairSecondIndex: 80,
                opt_unknownIndices: 80,
                opt_knownIndices: 10,
                opt_remainRatio: 0,
                opt_mistake: 40,
            }, {
                opt_pairIndices: 80,
                opt_pairSecondIndex: 80,
                opt_unknownIndices: 80,
                opt_knownIndices: 30,
                opt_remainRatio: 10,
                opt_mistake: 30,
            }, {
                opt_pairIndices: 95,
                opt_pairSecondIndex: 95,
                opt_unknownIndices: 90,
                opt_knownIndices: 70,
                opt_remainRatio: 20,
                opt_mistake: 10,
            }   
        ]

        return {
            opt_difficultyLevel: level,
            difficultyDetails: difficultyMap[level - 1]
        }
            
        
    })
}))