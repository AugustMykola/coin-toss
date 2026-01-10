import {getTossResult} from "../api/coin-toss-api.ts";
import {CoinAnimationService} from "../services/CoinAnimationService.ts";
import type {ITossResult} from "../../shared/models/ITossResult.ts";

export interface ThunkServices {
    api: {
        getTossResult: () => Promise<ITossResult>;
    };
    animationService?: CoinAnimationService;
}

export const thunkServices: ThunkServices = {
    api: {
        getTossResult
    },
    animationService: undefined
};