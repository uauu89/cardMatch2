import { useState } from "react";
import "./Settings.css"
import InputRadio from "../ui/InputRadio";

const Settings = ()=>{
    const [modal_settings, setModal_settings] = useState<boolean>(false);

    return (
        <div className="settings_container">

            <button
                type="button"
                className={`SettingButton ${modal_settings && "modalOpen"}`}
                onClick={()=>setModal_settings(prev=>!prev)}
            >
            </button>

            <section className={`settings ${modal_settings && "active"}`}>

                <h2>옵션</h2>

                <section>
                    <h3>공통 옵션</h3>

                    <div className="settings_item">
                        <div className="settings_itemLabel">카드범위</div>

                        <div className="inputnumberWrap">
                            <input 
                                type="number" 
                                min="2"
                                value={4}
                            />
                            <span className="unit"></span>
                        </div>
                    </div>

                    <div className="settings_item">
                        <div className="settings_itemLabel">시간 제한</div>

                        <div className="inputnumberWrap">
                            <input 
                                type="number" 
                                min="2"
                                value={30}
                            />
                            <span className="unit">s</span>
                        </div>

                        <label>
                            <input type="checkbox" />
                            제한 없음
                        </label>
                    </div>

                    <div className="settings_item">
                        <div className="settings_itemLabel">카드 크기</div>

                        <div>
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

                        <label>
                            <input type="checkbox" />
                            화면 크기에 따라 자동 변경
                        </label>
                    </div>

                </section>
                <div>
                    option
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur animi, libero ad est eius deserunt earum officiis beatae expedita dolorem asperiores consequuntur, distinctio esse iusto nihil non magni dolorum necessitatibus.
                </div>

                <div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus tempora labore similique, nam voluptate dignissimos beatae consectetur maxime repudiandae ipsam, nostrum quasi itaque cumque rerum eaque sapiente consequatur, a deserunt?
                </div>
            </section>
        </div>
    )
}

export default Settings;