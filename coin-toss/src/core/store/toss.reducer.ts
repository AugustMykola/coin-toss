import { createReducer } from '@reduxjs/toolkit';
import {resetToss} from "./toss.actions.ts";
import {initialState} from "./toss.state.ts";
import {tossCoin} from "./toss.effects.ts";


export const tossReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(resetToss, (state) => {
            return {
                ...state,
                state: 'idle',
                prediction: null,
                result: null,
                message: null
            };
        })
        .addCase(tossCoin.pending, (state, { meta: { arg } }) => {
            console.log(arg);
            return {
                ...state,
                state: 'spinning',
                prediction: arg,
                result: null,
                message: null
            };
        })
        .addCase(tossCoin.fulfilled, (state, { payload }) => {
            const isWin = payload.prediction === payload.apiResult;
            return {
                ...state,
                state: 'display_result',
                result: payload.apiResult,
                message: isWin ? 'You won!' : 'You lost!'
            };
        })
        .addCase(tossCoin.rejected, (state, action) => {
            return {
                ...state,
                state: 'idle',
                message: action.error.message || 'Error occurred'
            };
        });
});