import { useState } from "react";

import { useOptionStore } from "@stores/useOptionStore";
import { useUIStore } from "@stores/useUIStore";

import InputRadio from "@components/ui/InputRadio";
import InputCheck from "@components/ui/InputCheck";
import InputRange from "@components/ui/InputRange";
import InputNumber from "@components/ui/InputNumber";
import GameButton from "@components/ui/GameButton";

import "./Settings.css"
import IconGear from "@icons/IconGear";
import IconXmark from "@icons/IconXmark";
import IconCaretDown from "@icons/IconCaretDown";


const Settings = ()=>{

    const [switch_difficultyConfig, setSwitch_difficultyConfig]  = useState<boolean>(false);

    const modalSettings_isOpen = useUIStore(state => state.modalSettings_isOpen);
    const toggle_modalSettings = useUIStore(state => state.toggle_modalSettings);

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

    const opt_skipComState = useOptionStore(state => state.opt_skipComState);
    const setOpt_skipComState = useOptionStore(state => state.setOpt_skipComState);

    const opt_continueTurn = useOptionStore(state => state.opt_continueTurn);
    const setOpt_continueTurn = useOptionStore(state => state.setOpt_continueTurn);

    const opt_difficultyLevel = useOptionStore(state => state.opt_difficultyLevel);
    const updateDifficultyLevel = useOptionStore(state => state.updateDifficultyLevel);

    const difficultyDetails = useOptionStore(state => state.difficultyDetails);
    const setDifficulty_update = useOptionStore(state => state.setDifficulty_update);

    return (
        <div className="settings_container">

            <button
                type="button"
                className={`SettingButton ${modalSettings_isOpen && "modalOpen"}`}
                onClick={()=>toggle_modalSettings()}
            >
                {modalSettings_isOpen ? 
                    <IconXmark size={24} color="#FFF" ></IconXmark> : 
                    <span className="icon_rotate"><IconGear size={28} color="#FFF"/></span>
                }
                
            </button>


            <section className={`settings ${modalSettings_isOpen && "active"}`}>

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
                            checked={opt_skipComState}
                            checkHandler={setOpt_skipComState}
                        >
                            컴퓨터 감정 표시 생략
                        </InputCheck>
                    </div>
                    <div className="settings_item">
                        <InputCheck 
                            checked={opt_continueTurn}
                            checkHandler={setOpt_continueTurn}
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
                                checked={opt_difficultyLevel === 1}
                                changeHandler={updateDifficultyLevel}
                            />
                            <InputRadio
                                label="2단계"
                                name="difficulty"
                                value={2}
                                checked={opt_difficultyLevel === 2}
                                changeHandler={updateDifficultyLevel}
                            />
                            <InputRadio
                                label="3단계"
                                name="difficulty"
                                value={3}
                                checked={opt_difficultyLevel === 3}
                                changeHandler={updateDifficultyLevel}
                            />
                            <InputRadio
                                label="4단계"
                                name="difficulty"
                                value={4}
                                checked={opt_difficultyLevel === 4}
                                changeHandler={updateDifficultyLevel}
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
                                            위치를 아는 카드를 선택할 확률
                                        </div>
                                        <div className="InputRangeWrap">
                                            <InputRange 
                                                value={difficultyDetails.opt_pairIndices}
                                                changeHandler={(num)=>{
                                                    if(num === "") return;
                                                    setDifficulty_update({
                                                        opt_pairIndices: num,
                                                    })
                                                }}
                                            />  
                                            <InputNumber
                                                unit={"%"}
                                                min={0}
                                                max={100}
                                                value={difficultyDetails.opt_pairIndices}
                                                changeHandler={(num)=>{
                                                    
                                                    setDifficulty_update({
                                                        opt_pairIndices: num,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>


                                    <div className="diffConfig_item">
                                        <div>
                                            선택한 카드의 짝을 기억할 확률
                                        </div>
                                        <div className="InputRangeWrap">
                                            <InputRange 
                                                value={difficultyDetails.opt_pairSecondIndex}
                                                changeHandler={(num)=>{
                                                    if(num === "") return;
                                                    setDifficulty_update({
                                                        opt_pairSecondIndex: num,
                                                    })
                                                }}
                                            />  
                                            <InputNumber
                                                unit={"%"}
                                                min={0}
                                                max={100}
                                                value={difficultyDetails.opt_pairSecondIndex}
                                                changeHandler={(num)=>{
                                                    
                                                    setDifficulty_update({
                                                        opt_pairSecondIndex: num,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="diffConfig_item">
                                        <div>
                                            정답을 모를 때 열어본 적 없는 카드를 선택할 확률
                                        </div>
                                        <div className="InputRangeWrap">
                                            <InputRange 
                                                value={difficultyDetails.opt_unknownIndices}
                                                changeHandler={(num)=>{
                                                    if(num === "") return;
                                                    setDifficulty_update({
                                                        opt_unknownIndices: num,
                                                    })
                                                }}
                                            />  
                                            <InputNumber
                                                unit={"%"}
                                                min={0}
                                                max={100}
                                                value={difficultyDetails.opt_unknownIndices}
                                                changeHandler={(num)=>{
                                                    
                                                    setDifficulty_update({
                                                        opt_unknownIndices: num,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="diffConfig_item">
                                        <div>
                                            정답을 모를 때 고의로 열어본 카드를 다시 선택할 확률
                                        </div>
                                        <div className="InputRangeWrap">
                                            <InputRange 
                                                value={difficultyDetails.opt_knownIndices}
                                                changeHandler={(num)=>{
                                                    if(num === "") return;
                                                    setDifficulty_update({
                                                        opt_knownIndices: num,
                                                    })
                                                }}
                                            />  
                                            <InputNumber
                                                unit={"%"}
                                                min={0}
                                                max={100}
                                                value={difficultyDetails.opt_knownIndices}
                                                changeHandler={(num)=>{
                                                    
                                                    setDifficulty_update({
                                                        opt_knownIndices: num,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="diffConfig_item">
                                        <div>
                                            열어 본 카드 비율이 설정값보다 낮다면 재선택 행동 발생                                        </div>
                                        <div className="InputRangeWrap">
                                            <InputRange 
                                                value={difficultyDetails.opt_OpenedRatio}
                                                changeHandler={(num)=>{
                                                    if(num === "") return;
                                                    setDifficulty_update({
                                                        opt_OpenedRatio: num,
                                                    })
                                                }}
                                            />  
                                            <InputNumber
                                                unit={"%"}
                                                min={0}
                                                max={100}
                                                value={difficultyDetails.opt_OpenedRatio}
                                                changeHandler={(num)=>{
                                                    
                                                    setDifficulty_update({
                                                        opt_OpenedRatio: num,
                                                    })
                                                }}
                                            />
                                        </div>
                                    </div>


                                    <div className="diffConfig_item">
                                        <div>
                                            실수 확률
                                        </div>
                                        <div className="InputRangeWrap">
                                            <InputRange 
                                                value={difficultyDetails.opt_mistake}
                                                changeHandler={(num)=>{
                                                    if(num === "") return;
                                                    setDifficulty_update({
                                                        opt_mistake: num,
                                                    })
                                                }}
                                            />  
                                            <InputNumber
                                                unit={"%"}
                                                min={0}
                                                max={100}
                                                value={difficultyDetails.opt_mistake}
                                                changeHandler={(num)=>{
                                                    
                                                    setDifficulty_update({
                                                        opt_mistake: num,
                                                    })
                                                }}
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