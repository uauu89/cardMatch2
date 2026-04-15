import { useGameStore } from "../../stores/useGameStore";

import "./ComStatus.css"
import img_default from "../../assets/img/comState/default.png"
import img_noEmotion from "../../assets/img/comState/noEmotion.png"
import img_thinking from "../../assets/img/comState/thinking.png"
import img_know from "../../assets/img/comState/know.png"
import img_correct from "../../assets/img/comState/correct.png"
import img_wrong from "../../assets/img/comState/wrong.png"
import img_mistake from "../../assets/img/comState/mistake.png"
import img_lucky from "../../assets/img/comState/lucky.png"
import img_tricky from "../../assets/img/comState/tricky.png"

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
        // case "default" : 
        //     imgUrl = img_default;
        //     break;
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
        case "mistake" :
            imgUrl = img_mistake
            break;
        case "tricky" :
            imgUrl = img_tricky;
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