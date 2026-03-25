import "./Card.css"


interface CardProps {
    order: number;
    cardNumber: number;
    opend: boolean;
    onClick: ()=>void;
}


export default function Card({order, cardNumber, opend, onClick} : CardProps){


    return (
        <div
            className={`card ${opend ? "card--opend" : ""} card--animation-preview`}
            style={{"--delayParam" : `${order}`} as React.CSSProperties}
            onClick={onClick}
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
    )
}