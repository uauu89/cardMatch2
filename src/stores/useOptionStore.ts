import { create } from "zustand";

interface OptionProps{
    opt_cardNum: number;
    updateCardNum: (number:number)=>void;
}

export const useOptionStore = create<OptionProps>(set => ({
    opt_cardNum: 6,

    updateCardNum : (num)=>set({opt_cardNum: num}),
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