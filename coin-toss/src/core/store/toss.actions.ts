import { createAction } from '@reduxjs/toolkit';

export const resetToss = createAction('toss/resetToss');

export const startAnimation = createAction('toss/startAnimation');
export const stopAnimation = createAction('toss/stopAnimation');
export const tossRequested = createAction('toss/requested', (prediction: any) => ({ payload: prediction }));
export const tossSucceeded = createAction('toss/succeeded', (apiResult: any, prediction: any) => ({ payload: { apiResult, prediction } }));
export const tossFailed = createAction('toss/failed', (error: string) => ({ payload: error }));
