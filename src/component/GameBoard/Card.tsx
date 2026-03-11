import "./Card.css"


interface CardProps {
    opend: boolean;
    cardNumber: number;
    onClick: ()=>void;
}


export default function Card({opend, cardNumber, onClick} : CardProps){


    return (
        <div className={`card ${opend ? "card--opend" : ""}`} onClick={onClick}>
            <div className="card__face back">
                <div className="card__deco--diamond top"></div>
                <div className="card__deco--diamond bottom"></div>
            </div>

            <div className="card__face front">
                <div className="card__deco--diamond top"></div>
                <div className="card__deco--diamond bottom"></div>
                <span className="card__number">{cardNumber}</span>
            </div>
        </div>
    )
}