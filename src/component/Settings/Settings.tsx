import { useState } from "react";
import "./Settings.css"
import InputRadio from "../ui/InputRadio";
import InputCheck from "../ui/InputCheck";
import InputRange from "../ui/InputRange";
import InputNumber from "../ui/InputNumber";
import GameButton from "../ui/GameButton";
import IconGear from "../../assets/icons/IconGear";
import IconXmark from "../../assets/icons/IconXmark";
import IconCaretDown from "../../assets/icons/IconCaretDown";
import { useOptionStore } from "../../stores/useOptionStore";
import { useShallow } from "zustand/shallow";

interface SettingsProps{
    opt_previewAnimation: boolean;
    setOpt_previewAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    opt_timer: number;
    setOpt_timer: React.Dispatch<React.SetStateAction<number>>;
}

const Settings = ()=>{
    const [modal_settings, setModal_settings] = useState<boolean>(false);
    const [switch_difficultyConfig, setSwitch_difficultyConfig]  = useState<boolean>(false);

    // const {opt_cardNum, updateCardNum} = useOptionStore(useShallow(state => ({
    //     opt_cardNum: state.opt_cardNum,
    //     updateCardNum: state.updateCardNum,
    // })));

    const opt_cardNum = useOptionStore(state => state.opt_cardNum);
    const setOpt_cardNum = useOptionStore(state => state.setOpt_cardNum);

    const opt_timerDuration = useOptionStore(state => state.opt_timerDuration);
    const setOpt_timerDuration = useOptionStore(state => state.setOpt_timerDuration);

    const opt_timerNoLimit = useOptionStore(state => state.opt_timerNoLimit);
    const setOpt_timerNoLimit = useOptionStore(state => state.setOpt_timerNoLimit);

    const opt_cardSize = useOptionStore(state => state.opt_cardSize);
    const setOpt_cardSize = useOptionStore(state => state.setOpt_cardSize);

    const opt_cardSizeResponsive = useOptionStore(state => state.opt_cardSizeResponsive);
    const setOpt_cardSizeResponsive = useOptionStore(state => state.setOpt_cardSizeResponsive);

    const opt_cardPreview = useOptionStore(state => state.opt_cardPreview);
    const setOpt_cardPreview = useOptionStore(state => state.setOpt_cardPreview);

    const opt_difficulty = useOptionStore(state => state.opt_difficulty);
    const setOpt_difficulty = useOptionStore(state => state.setOpt_difficulty);

    const difficultyDetails = useOptionStore(state => state.difficultyDetails);
    const setDifficulty_update = useOptionStore(state => state.setDifficulty_update);



    // setDifficultyConfigPartial({ mistakeProbability: 0.3 });




    return (
        <div className="settings_container">

            <button
                type="button"
                className={`SettingButton ${modal_settings && "modalOpen"}`}
                onClick={()=>setModal_settings(prev=>!prev)}
            >
                {modal_settings ? 
                    <IconXmark size={24} color="#FFF" ></IconXmark> : 
                    <span className="icon_rotate"><IconGear size={28} color="#FFF"/></span>
                }
                
            </button>


            <section className={`settings ${modal_settings && "active"}`}>

                <h2>옵션</h2>

                <section className="sub">
                    <h3>공통 옵션</h3>

                    <div className="settings_item grid">
                        <div className="settings_itemLabel">카드범위</div>

                        <InputNumber
                            min={2}
                            value={opt_cardNum}
                            changeHandler={setOpt_cardNum}
                        />
                    </div>

                    <div className="settings_item grid">
                        <div className="settings_itemLabel">시간 제한</div>

                        <div className="btnFlexWrap">
                            <InputNumber
                                unit={"s"}
                                min={1}
                                max={99}
                                disabled={opt_timerNoLimit}
                                value={opt_timerDuration}
                                changeHandler={setOpt_timerDuration}
                            />
                            <InputCheck 
                                checked={opt_timerNoLimit}
                                checkHandler={setOpt_timerNoLimit}
                            >
                                제한 없음
                            </InputCheck>

                        </div>


                        

                    </div>

                    <div className="settings_item grid">
                        <div className="settings_itemLabel">카드 크기</div>

                        <div className="btnFlexWrap">
                            <InputRadio
                                label="대"
                                name="cardSize"
                                value={1}
                                checked={opt_cardSize === 1}
                                changeHandler={setOpt_cardSize}
                            />
                            <InputRadio
                                label="중"
                                name="cardSize"
                                value={0.8}
                                checked={opt_cardSize === 0.8}
                                changeHandler={setOpt_cardSize}
                            />
                            <InputRadio
                                label="소"
                                name="cardSize"
                                value={0.6}
                                checked={opt_cardSize === 0.6}
                                changeHandler={setOpt_cardSize}
                            />
                        </div>
                  
                        <div className="gridColSpan">
                            <InputCheck
                                checked={opt_cardSizeResponsive}
                                checkHandler={setOpt_cardSizeResponsive}
                            >
                                화면 크기에 따라 자동 변경
                            </InputCheck>
                        </div>
                    </div>

                </section>


                <section className="sub">
                    <h3>싱글 옵션</h3>


                    <div className="settings_item">
                        <InputCheck 
                            checked={opt_cardPreview}
                            checkHandler={setOpt_cardPreview}
                        >
                        카드 확인 여부
                        </InputCheck>
                    </div>

                </section>

                <section className="sub">
                    <h3>대전 옵션</h3>

                    <div className="settings_item">
                        <InputCheck 
                            checked={false}
                            checkHandler={()=>{console.log("emptyAction")}}
                        >
                            연속 선택 여부
                        </InputCheck>
                    </div>

                    <div className="settings_item grid">
                        <div className="settings_itemLabel">난이도</div>

                        <div className="btnFlexWrap">
                            <InputRadio
                                label="1단계"
                                name="difficulty"
                                value={1}
                                checked={opt_difficulty === 1}
                                changeHandler={setOpt_difficulty}
                            />
                            <InputRadio
                                label="2단계"
                                name="difficulty"
                                value={2}
                                checked={opt_difficulty === 2}
                                changeHandler={setOpt_difficulty}
                            />
                            <InputRadio
                                label="3단계"
                                name="difficulty"
                                value={3}
                                checked={opt_difficulty === 3}
                                changeHandler={setOpt_difficulty}
                            />
                            <InputRadio
                                label="4단계"
                                name="difficulty"
                                value={4}
                                checked={opt_difficulty === 4}
                                changeHandler={setOpt_difficulty}
                            />
                        </div>

                        <section className="difficultyConfig">
                            <header>
                                <h4 >
                                    <button type="button"
                                        className={`diffTabButton ${switch_difficultyConfig && "open"}`}
                                        onClick={()=>{setSwitch_difficultyConfig(prev=>!prev)}}
                                    >
                                        난이도 세부 내용
                                        <span className="diffTabButton_icon">
                                            <IconCaretDown size={14}/>
                                        </span>
                                    </button>
                                </h4>
                            </header>

                            <div className={`diffConfig_container ${switch_difficultyConfig && "open"}`}>
                                <div className="diffConfig_list">
                                    <div className="diffConfig_item">
                                        <div>
                                            남은 카드 비율 ※ 열어 본 카드 비율이 설정값 이하일 경우 열어 본 카드 선택
                                        </div>
                                        <div className="InputRangeWrap">
                                            <InputRange 
                                                value={difficultyDetails.remains}
                                                changeHandler={(num)=>{
                                                    if(num === "") return;
                                                    setDifficulty_update({
                                                        remains: num,
                                                    })
                                                }}
                                            />  
                                            <InputNumber
                                                unit={"%"}
                                                min={0}
                                                max={100}
                                                value={difficultyDetails.remains}
                                                changeHandler={(num)=>{
                                                    
                                                    setDifficulty_update({
                                                        remains: num,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="diffConfig_item">
                                        <div>
                                            임의선택 : 이미 열어 본 카드를 다시 선택할 확률
                                        </div>
                                        <div className="InputRangeWrap">
                                            <InputRange />  
                                            <InputNumber
                                                unit={"%"}
                                                min={1}
                                                max={99}
                                                value={4}
                                            />
                                        </div>
                                    </div>


                                    <div className="diffConfig_item">
                                        <div>
                                            임의선택 : 열어보지 않은 카드를 선택할 확률
                                        </div>
                                        <div className="InputRangeWrap">
                                            <InputRange />  
                                            <InputNumber
                                                unit={"%"}
                                                min={1}
                                                max={99}
                                                value={4}
                                            />
                                        </div>
                                    </div>

                                    <div className="diffConfig_item">
                                        <div>
                                            확정선택 : 현재 선택한 카드와 맞는 카드를 선택할 확률
                                        </div>
                                        <div className="InputRangeWrap">
                                            <InputRange />  
                                            <InputNumber
                                                unit={"%"}
                                                min={1}
                                                max={99}
                                                value={4}
                                            />
                                        </div>
                                    </div>

                                    <div className="diffConfig_item">
                                        <div>
                                            확정선택 : 이미 열어 본 카드 중 짝이 맞는 카드를 선택할 확률
                                        </div>
                                        <div className="InputRangeWrap">
                                            <InputRange />  
                                            <InputNumber
                                                unit={"%"}
                                                min={1}
                                                max={99}
                                                value={4}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>



                </section>

                <div className="settingDone_container">
                    <div>※ 카드 크기를 제외한 변경된 옵션은 다음 게임부터 적용됩니다.</div>

                    <div className="GameButton__container">
                        <GameButton inputGameMode="single"/>
                        <GameButton inputGameMode="vs"/>
                    </div>

                </div>



                
            </section>
        </div>
    )
}

export default Settings;