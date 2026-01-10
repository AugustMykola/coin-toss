import type {ITossResult} from "../../shared/models/ITossResult.ts";
import {CoinSide} from "../../shared/enums/coin-side.ts";

export const getTossResult = (): Promise<ITossResult> => {
    return new Promise((resolve) => {
        const delay: number = Math.floor(Math.random() * 1000) + 1;

        setTimeout(() => resolve(
            {tossResult: Math.random() > 0.5 ? CoinSide.Heads : CoinSide.Tails}
        ), delay);
    })
}
