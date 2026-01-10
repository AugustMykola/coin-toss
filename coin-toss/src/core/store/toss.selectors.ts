import type {RootState} from "./store.ts";
import {createSelector} from "@reduxjs/toolkit";
import type {ITossState} from "../../shared/models/ITossState.ts";

const selectToss = (state: RootState) => state.toss;

export const selectTossState = createSelector(selectToss, (toss: ITossState) => toss.state);
export const selectTossPrediction = createSelector(selectToss, (toss: ITossState) => toss.prediction);
export const selectTossResult = createSelector(selectToss, (toss: ITossState) => toss.result);