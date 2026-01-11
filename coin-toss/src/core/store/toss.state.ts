import type {ITossState} from "../../shared/models/ITossState";

export const initialState: ITossState = {
    state: 'idle',
    prediction: null,
    result: null,
    message: null,
    isAnimating: false,
};
