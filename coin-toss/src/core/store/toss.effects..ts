
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
        console.log('Toss thunk started', { prediction, extra }); // Лог на самому початку

        if (!extra || !extra.animationService) {
            console.error('Animation service missing in thunk extra argument');
            throw new Error('Animation service not initialized');
        }
        console.log('Spinning coin...');
        // Запускаємо анімацію обертання
        extra.animationService.startSpinning();

        // Отримуємо результат від API
        const response = await extra.api.getTossResult();
        console.log('API response:', response);

        // Зупиняємо анімацію на стороні, що випала
        await extra.animationService.stopSpinning(response.tossResult);

        return { apiResult: response.tossResult, prediction };
    }
);