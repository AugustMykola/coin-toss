import type {RootState} from "./store";
import { createSelector } from "@reduxjs/toolkit";
import type { ITossState } from "../../shared/models/ITossState";

const selectToss = (state: RootState) => state.toss;

export const selectTossMessage = createSelector(selectToss, (toss: ITossState) => toss.message);

export const selectIsAnimating = createSelector(selectToss, (toss: ITossState) => !!toss.isAnimating);
