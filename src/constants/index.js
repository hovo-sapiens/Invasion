export const GAME_MATRICES = {
    LARGE: [
        [2,0,0,0,0,0,0,0,0,2],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,1]
    ],
    MEDIUM: [
        [0,0,0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [2,0,0,0,0,0,0,0,2],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,0]
    ],
    SMALL: [
        [2,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,2]
    ]
}

export const GAME_MATRIX_SIZES = {
    LARGE: "LARGE",
    MEDIUM: "MEDIUM",
    SMALL: "SMALL"
}

export const GAME_RESULT_MESSAGES = {
    1: "YOU WIN",
    2: "YOU LOST",
    3: "DRAW"
}

export const GAME_STATUSES = {
    START: 1,
    IN_PROCESS: 2,
    FINISHED: 3
}

export const CELL_IDS = {
    PLAYER: 1,
    OPPONENT: 2,
    EMPTY: 0
}

export const ANIMATION_TYPES = {
    JUMP: "jump",
    STEP: "step",
    FINISH: "finish"
}