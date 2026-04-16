import { useGameStore } from "@stores/useGameStore"

import "./ComStatus.css"
import img_default from "@img/comState/default.png"
import img_noEmotion from "@img/comState/noEmotion.png"
import img_thinking from "@img/comState/thinking.png"
import img_know from "@img/comState/know.png"
import img_correct from "@img/comState/correct.png"
import img_wrong from "@img/comState/wrong.png"
import img_confusion from "@img/comState/confusion.png"
import img_mistake from "@img/comState/mistake.png"
import img_lucky from "@img/comState/lucky.png"
import img_tricky from "@img/comState/tricky.png"
import img_tease from "@img/comState/tease.png"

/*
    1. 기본상태
    2. 감정표현 스킵            => 무표정

    3. 카드를 알고 있는 상태    => 신남
        3-1. 정답             => 당연한 일 / 신남
        3-2. 실수로 오답       => 좌절 / 놀람

    4. 카드를 모르는 상태   => 고민
        4-1. 첫번째에서 정답을 알고 있는 카드를 뽑음   => 신남
        4-2. 모르는 카드를 뽑음 => 고민
            4-2-1. 모르는 카드를 뽑았는데 정답  => 신남 / 환호
            4-2-2. 모르는 카드를 뽑았는데 오답  => 아쉬움
        4-3. 정보를 제공하지 않기 위해 뽑았던 카드만 뽑음   => 약올림
*/

const ComStatus = () => {

    const comState = useGameStore(state => state.comState);

    let imgUrl;

    switch(comState){
        case "noEmotion" :
            imgUrl = img_noEmotion;
            break;
        case "thinking" :
            imgUrl = img_thinking;
            break;
        case "knowCorrect" :
            imgUrl = img_know;
            break;
        case "correct" :
            imgUrl = img_correct
            break;
        case "wrong" :
            imgUrl = img_wrong
            break;
        case "confusion" :
            imgUrl = img_confusion
            break;
        case "mistake" :
            imgUrl = img_mistake
            break;
        case "tricky" :
            imgUrl = img_tricky;
            break;
        case "tease" :
            imgUrl = img_tease;
            break;
        case "lucky" :
            imgUrl = img_lucky;
            break;
        default :
            imgUrl = img_default
    }

    return (
        <div className="ComStateWrap">
            <img src={imgUrl} alt="" />
        </div>
    )
}


export default ComStatus;