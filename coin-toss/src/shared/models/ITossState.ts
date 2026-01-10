import type {CoinSide} from "../enums/coin-side.ts";

export interface ITossState {
    state: GameStateType;
    prediction: CoinSide | null;
    result: CoinSide | null;
    message: string | null;
}

export type GameStateType = 'idle' | 'spinning' | 'display_result';