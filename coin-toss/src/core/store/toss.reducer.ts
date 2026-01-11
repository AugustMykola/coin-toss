import { createReducer } from '@reduxjs/toolkit';
import {resetToss, startAnimation, stopAnimation, tossRequested, tossSucceeded, tossFailed} from "./toss.actions";
import {initialState} from "./toss.state";
import { MESSAGES } from "../i18n/messages";


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
        .addCase(tossRequested, (state, { payload: prediction }) => {
            return {
                ...state,
                state: 'spinning',
                prediction: prediction,
                result: null,
                message: null
            };
        })
        .addCase(startAnimation, (state) => {
            return {
                ...state,
                isAnimating: true
            };
        })
        .addCase(stopAnimation, (state) => {
            return {
                ...state,
                isAnimating: false
            };
        })
        .addCase(tossSucceeded, (state, { payload }) => {
            const isWin = payload.prediction === payload.apiResult;
            return {
                ...state,
                state: 'display_result',
                result: payload.apiResult,
                message: isWin ? MESSAGES.WIN : MESSAGES.LOSE
            };
        })
        .addCase(tossFailed, (state, action) => {
            return {
                ...state,
                state: 'idle',
                message: action.payload || MESSAGES.ERROR_OCCURRED
            };
        });
});