import type {RootState} from "./store.ts";
import { createSelector } from "@reduxjs/toolkit";
import type { ITossState } from "../../shared/models/ITossState.ts";

const selectToss = (state: RootState) => state.toss;

export const selectTossMessage = createSelector(selectToss, (toss: ITossState) => toss.message);
