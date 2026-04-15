export type Type_turnState = 
    "ready"
    | "active"
    | "transition"
    | "paused";

export type Type_GamePhase = 
    "welcome"
    | "gameOver"
    | "gameStart"
    | "dealing"
    | "playing";

export type Type_ComState = 
    "default" 
    | "noEmotion" 
    | "knowCorrect" 
    | "tricky" 
    | "thinking" 
    | "correct" 
    | "wrong" 
    | "mistake" 
    | "lucky";

export type Type_currentPlayer = 
    "single"
    | "player"
    | "com";
