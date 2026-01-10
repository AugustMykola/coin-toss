
import { createAsyncThunk } from '@reduxjs/toolkit';
import type {CoinSide} from "../../shared/enums/coin-side.ts";
import type {ThunkServices} from "./thunk-extras.ts"; // Імпорт типу

export const tossCoin = createAsyncThunk<
    { apiResult: CoinSide, prediction: CoinSide },
    CoinSide,
    { extra: ThunkServices }
>(
    'toss/spin',
    async (prediction, { extra }) => {

        if (!extra || !extra.animationService) {
            throw new Error('Animation service not initialized');
        }
        console.log('Spinning coin...');
        extra.animationService.startSpinning();

        const response = await extra.api.getTossResult();
        console.log('API response:', response);

        await extra.animationService.stopSpinning(response.tossResult);

        return { apiResult: response.tossResult, prediction };
    }
);