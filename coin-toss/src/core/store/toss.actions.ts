import { createAction } from '@reduxjs/toolkit';
import {CoinSide} from "../../shared/enums/coin-side.ts";

export const resetToss = createAction('toss/resetToss');
export const startToss = createAction<{ side: CoinSide }>('toss/start');
