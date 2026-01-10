import {configureStore} from "@reduxjs/toolkit";
import {tossReducer} from "./toss.reducer.ts";
import {thunkServices} from "./thunk-extras.ts";

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
