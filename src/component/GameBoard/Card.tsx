import "./Card.css"
import { useGameStore } from "../../stores/useGameStore";

interface CardProps {
    order: number;
    cardNumber: number;
    cardsCount: number;
    opend: boolean;
    owner: "single" | "player" | "ai" | null;
    isLastCard: boolean;
    handler_animationEnd: () => void;
    handler_click: () => void;
}


export default function Card({
    order,
    cardNumber,
    cardsCount,
    opend,
    owner,
    isLastCard,
    handler_animationEnd,
    handler_click,
} : CardProps){


    const gamePhase = useGameStore(state => state.gamePhase);
    const turnState = useGameStore(state => state.turnState);
    const currentPlayer = useGameStore(state => state.currentPlayer);
    const opt_cardPreview = useGameStore(state=>state.opt_cardPreview);

    const styleAttr = {
        "--delayParam" : order,
        "--delay_preview" : cardsCount,
    } as React.CSSProperties;

    const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>)=>{

        if(isLastCard){
            const targetAnimation = opt_cardPreview
                ? "initAnimation--preview"
                : "initAnimation--bounce";
            if(e.animationName !== targetAnimation) return;
            handler_animationEnd();
        }

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
                if(gamePhase === "playing" && turnState === "active" && currentPlayer !== "ai" && !opend){
                    handler_click();
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