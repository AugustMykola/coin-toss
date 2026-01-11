import type {CoinSide} from "../enums/coin-side";

export interface ITossState {
    state: GameStateType;
    prediction: CoinSide | null;
    result: CoinSide | null;
    message: string | null;
    isAnimating?: boolean;
}

export type GameStateType = 'idle' | 'spinning' | 'display_result';