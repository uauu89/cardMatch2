import type { Dispatch, SetStateAction } from "react";
import "./Card.css"
import { useGameStore } from "../../stores/useGameStore";
import { useShallow } from "zustand/shallow";
import { useOptionStore } from "../../stores/useOptionStore";


interface CardProps {
    order: number;
    cardNumber: number;
    cardsCount: number;
    opend: boolean;
    owner: "single" | "player" | "ai" | null;
    isLastCard: boolean;
    onClick: ()=>void;
}


export default function Card({order, cardNumber, cardsCount, opend, owner, isLastCard, onClick} : CardProps){


    const {gamePhase, turnState, setGamePhase, setTurnState} = useGameStore(useShallow(state=>({
        gamePhase: state.gamePhase,
        turnState: state.turnState,
        
        setGamePhase: state.setGamePhase,
        setTurnState: state.setTurnState,
    })))

    const {opt_cardPreview} = useOptionStore(useShallow(state=>({
        opt_cardPreview: state.opt_cardPreview,
    })))

    const styleAttr = {
        "--delayParam" : order,
        "--delay_preview" : cardsCount,
    } as React.CSSProperties;

    const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>)=>{
        if(!isLastCard) return;

        const targetAnimation = opt_cardPreview
            ? "initAnimation--preview"
            : "initAnimation--bounce";
        if(e.animationName !== targetAnimation) return;

        setGamePhase("playing");

        setTimeout(()=>{
            setTurnState("active");
            console.log("animation end, turnState > active")
        }, 500)
    }

    return (
        <div
            className={[
                "card",
                opend && "card--opend",
                gamePhase === "dealing" && "card--animation-rendering",
            ].filter(Boolean).join(" ")}

            style={styleAttr}

            onAnimationEnd={handleAnimationEnd}

            onClick={()=>{
                if(gamePhase === "playing" && turnState === "active" && !opend){
                    onClick();
                }
            }}
        >
            <div 
                className={[
                    "card__previewWrapper", 
                    (opt_cardPreview && gamePhase==="dealing" ) && "card--animation-preview",
                    owner !== null && owner,
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