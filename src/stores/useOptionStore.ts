import { create } from "zustand";

type NumberValue = number | "";

type DifficultyConfig = {
  remains: NumberValue;
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
    opt_continueTurn: boolean;
    opt_difficulty: number;

    // ditails : number;
    difficultyDetails : {
        remains : NumberValue,
    }


    setOpt_cardNum: (num: NumberValue) => void;
    setOpt_timerDuration: (num: NumberValue) => void;
    setOpt_timerNoLimit: () => void;
    
    setOpt_cardSize: (num: number) => void;
    setOpt_cardSizeResponsive: () => void;

    setOpt_cardPreview: () => void;

    setOpt_continueTurn: () => void;
    setOpt_difficulty: (num: number) => void;

    setDifficulty_update: (config: Partial<DifficultyConfig>) => void;
}

export const useOptionStore = create<OptionProps>(set => ({
    opt_cardNum: 2,
    opt_timerDuration: 20,
    opt_timerNoLimit: false,

    opt_cardSize: 1,
    opt_cardSizeResponsive: false,

    opt_cardPreview: false,

    opt_continueTurn: false,
    opt_difficulty: 3,

    difficultyDetails: {
        remains: 10,
    },

    setOpt_cardNum: (num)=>set({opt_cardNum: num}),
    setOpt_timerDuration: (num)=>set({opt_timerDuration: num}),
    setOpt_timerNoLimit: () => set(state => ({opt_timerNoLimit: !state.opt_timerNoLimit})),

    setOpt_cardSize: (num)=>set({opt_cardSize: num}),
    setOpt_cardSizeResponsive: () => set(state => ({opt_timerNoLimit: !state.opt_cardSizeResponsive})),

    setOpt_cardPreview: () => set(state => ({opt_cardPreview: !state.opt_cardPreview})),

    setOpt_continueTurn : () => set(state => ({opt_continueTurn : !state.opt_continueTurn})),
    setOpt_difficulty: (num)=>set({opt_difficulty: num}),

    setDifficulty_update: (config) => set(state => ({
        difficultyDetails: {
            ...state.difficultyDetails,
            ...config,
        }
    }))
    /*
        공통 > 
            카드 범위
            시간 제한 : number
                제한없음 : boolean
            카드 크기 : 대/중/소 >> css변수 number ?
                화면 크기에 따라 사이즈 자동변동 : boolean

        싱글모드 > 
            초기 카드 애니메이션 여부 : boolean

        대전모드 >
            정답 시 연속 선택 여부 :boolean
            난이도 선택 > 1, 2, 3, 4단계
                세부내용 - 남은 카드 비율
                세부내용 - 열어본 카드 다시 선택할 확률
                세부내용 - 열어보지 않은 카드를 선택할 확률
                세부내용 - 현재 선택한 카드와 맞는 카드를 선택할 확률
                세부내용 - 이미 열어 본 카드 중 짝이 맞는 카드를 선택할 확률
        
    */
}))