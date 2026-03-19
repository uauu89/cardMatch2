import { useState } from "react";
import "./Settings.css"
import InputRadio from "../ui/InputRadio";
import InputCheck from "../ui/InputCheck";
import InputRange from "../ui/InputRange";
import InputNumber from "../ui/InputNumber";
import GameButton from "../ui/GameButton";
import IconGear from "../../assets/icons/IconGear";
import IconXmark from "../../assets/icons/IconXmark";

const Settings = ()=>{
    const [modal_settings, setModal_settings] = useState<boolean>(false);

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
                            value={4}
                        />
                    </div>

                    <div className="settings_item grid">
                        <div className="settings_itemLabel">시간 제한</div>

                        <div className="btnFlexWrap">
                            <InputNumber
                                unit={"s"}
                                min={1}
                                max={99}
                                value={4}
                            />
                            <InputCheck 
                                labelText="제한 없음"
                                checked={false}
                            />

                        </div>


                        

                    </div>

                    <div className="settings_item grid">
                        <div className="settings_itemLabel">카드 크기</div>

                        <div className="btnFlexWrap">
                            <InputRadio
                                attr_label="대"
                                attr_name="cardSize"
                                attr_checked={false}
                            />
                            <InputRadio
                                attr_label="중"
                                attr_name="cardSize"
                                attr_checked={false}
                            />
                            <InputRadio
                                attr_label="소"
                                attr_name="cardSize"
                                attr_checked={false}
                            />
                        </div>
                  
                        <div className="gridColSpan">
                            <InputCheck 
                                labelText="화면 크기에 따라 자동 변경"
                                checked={true}
                            />
                        </div>
                    </div>

                </section>


                <section className="sub">
                    <h3>싱글 옵션</h3>


                    <div className="settings_item">
                        <InputCheck 
                            labelText="카드 확인 여부"
                            checked={false}
                        />
                    </div>

                </section>

                <section className="sub">
                    <h3>대전 옵션</h3>

                    <div className="settings_item">
                        <InputCheck 
                            labelText="연속 선택 여부"
                            checked={false}
                        />
                    </div>


                    <div className="settings_item grid">
                        <div className="settings_itemLabel">난이도</div>

                        <div className="btnFlexWrap">
                            <InputRadio
                                attr_label="1단계"
                                attr_name="difficulty"
                                attr_checked={true}
                            />
                            <InputRadio
                                attr_label="2단계"
                                attr_name="difficulty"
                                attr_checked={false}
                            />
                            <InputRadio
                                attr_label="3단계"
                                attr_name="difficulty"
                                attr_checked={false}
                            />
                            <InputRadio
                                attr_label="4단계"
                                attr_name="difficulty"
                                attr_checked={false}
                            />
                        </div>
                    </div>


                    <section className="difficultyDetails">
                        <header>
                            <h4>난이도 세부 내용</h4>
                        </header>
                        
                        <div>
                            <div>
                                남은 카드 비율 ※ 열어 본 카드 비율이 설정값 이하일 경우 열어 본 카드 선택
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

                        <div>
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


                        <div>
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

                        <div>
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

                        <div>
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

                    </section>

                </section>

                <div>
                    <div>※ 카드 크기를 제외한 변경된 옵션은 다음 게임부터 적용됩니다.</div>

                    <div className="GameButton__container">
                        <GameButton gameMode="single"/>
                        <GameButton gameMode="vs"/>
                    </div>

                </div>



                
            </section>
        </div>
    )
}

export default Settings;