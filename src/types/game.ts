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
    "knowCorrect"
    | "tricky"
    | "thinking"
    | "noEmotion"
    | "default" 
    | "correct" 
    | "wrong" 
    | "confusion" 
    | "lucky"
    | "tease"
    | "mistake";

export type Type_ComActionState = Extract<Type_ComState,
    "knowCorrect"
    | "tricky"
    | "thinking"
    | "lucky"
    | "noEmotion"
>

export type Type_currentPlayer = 
    "single"
    | "player"
    | "com";
