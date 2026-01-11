import {configureStore} from "@reduxjs/toolkit";
import {tossReducer} from "./toss.reducer";
import {thunkServices} from "./thunk-extras";
import type { ThunkServices } from "./thunk-extras";

export const store = configureStore({
    reducer: {
        toss: tossReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: thunkServices
            }
        })

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = (
    dispatch: AppDispatch,
    getState: () => RootState,
    extra: ThunkServices
) => ReturnType;
