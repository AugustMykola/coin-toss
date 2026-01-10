import type {ITossState} from "../../shared/models/ITossState.ts";

export const initialState: ITossState = {
    state: 'idle',
    prediction: null,
    result: null,
    message: null,
};
