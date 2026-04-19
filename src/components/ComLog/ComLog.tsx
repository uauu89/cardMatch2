import "./ComLog.css"

const ComLog = () => {

    return(

        <div className="ComLog">
            <div className="logEvent">
                <ul>
                    <li>
                        두 번째 카드 선택
                        <ul>
                            <li>
                                첫번째 선택한 카드의 위치를 알고 있음
                                <ul>
                                    <li>행동확률 미달(50%)</li>
                                </ul>
                            </li>
                            <li>
                                랜덤 선택
                                <ul>
                                    <li>
                                        열어본 적 있는 카드 재선택
                                        <ul>
                                            <li>
                                                행동확률 충족 (90%)
                                                <ul>
                                                    <li>실수 발생</li>
                                                    <li>카드 인덱스 : 4</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            
                        </ul>
                    </li>
                </ul>
            </div>

            <div className="logEvent">
                <ul>
                    <li>
                        첫 번째 카드 선택
                        <ul>
                            <li>
                                짝이 맞는 카드의 위치를 알고 있음
                                <ul>
                                    <li>행동확률 충족(90%)</li>
                                    <ul>
                                        <li>카드 인덱스 : 2, 5</li>
                                    </ul>
                                </ul>
                            </li>
                            
                        </ul>
                    </li>
                </ul>
            </div>

            <div className="logEvent">
                <ul>
                    <li>
                        첫 번째 카드 선택
                        <ul>
                            <li>
                                짝이 맞는 카드의 위치를 알고 있음
                                <ul>
                                    <li>행동확률 미달(10%)</li>
                                </ul>
                            </li>
                            <li>
                                랜덤 선택
                                <ul>
                                    <li>
                                        열어본 적 없는 카드배열에서 랜덤선택
                                        <ul>
                                            <li>확률 미달 (10%)</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                완전 랜덤 선택
                                <ul>
                                    <li>
                                        카드 인덱스 : 5, 7
                                    </li>
                                </ul>
                            </li>
                            
                        </ul>
                    </li>
                </ul>
            </div>
            

        </div>

    )

}


export default ComLog;