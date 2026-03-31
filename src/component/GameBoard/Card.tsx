import type { Dispatch, SetStateAction } from "react";
import "./Card.css"


interface CardProps {
    order: number;
    cardNumber: number;
    cardsCount: number;
    opend: boolean;
    opt_previewAnimation: boolean;

    isLastCard: boolean;

    gamePhase: "init" | "ready" | "dealing" | "playing";
    setGamePhase: Dispatch<SetStateAction<"init" | "ready" | "dealing" | "playing">>;

    
    onClick: ()=>void;

}


export default function Card({order, cardNumber, cardsCount, opend, opt_previewAnimation, isLastCard, gamePhase, setGamePhase, onClick} : CardProps){

    const styleAttr = {
        "--delayParam" : order,
        "--delay_preview" : cardsCount,
    } as React.CSSProperties;

    const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>)=>{
        if(!isLastCard) return;

        const targetAnimation = opt_previewAnimation
            ? "initAnimation--preview"
            : "initAnimation--bounce";
        if(e.animationName !== targetAnimation) return;

        setGamePhase("playing");

        // setEndRendering(true);
    }

    return (
        <div
            className={[
                "card",
                opend && "card--opend",
                gamePhase === "dealing" && "card--animation-rendering",
            ].filter(Boolean).join(" ")}

            style={styleAttr}

            onClick={()=>{
                if(gamePhase === "playing"){
                    onClick();
                }
            }}
            // onAnimationEnd={(e)=>{
            //     if(isLastCard){
            //         const animationName = opt_previewAnimation? "initAnimation--preview" : "initAnimation--bounce";
            //         if(e.animationName === animationName){
            //             console.log("test, animation finish");
            //             setEndRendering(true);
            //         }
            //     }
            // }}
            onAnimationEnd={handleAnimationEnd}
        >
            <div 
                className={[
                    "card__previewWrapper", 
                    (opt_previewAnimation && gamePhase==="dealing" ) && "card--animation-preview",
                ].filter(Boolean).join(" " )}
                
            >
                <div className="card__face back">
                    <div className="card__deco--diamond top"></div>
                    <div className="card__deco--diamond bottom"></div>
                </div>

                <div className="card__face front">
                    <div className="card__deco--diamond top"></div>
                    <div className="card__deco--diamond bottom"></div>
                    <span className="card__number">
                        {cardNumber}
                    </span>
                </div>
            </div>
        </div>
    )
}