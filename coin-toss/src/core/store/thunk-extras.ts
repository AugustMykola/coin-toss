import { getTossResult$ } from "../api/coin-toss-api";
import type { Observable } from 'rxjs';
import type {ITossResult} from "../../shared/models/ITossResult";

export interface ThunkServices {
    api: {
        getTossResult$: () => Observable<ITossResult>;
    };
}

export const thunkServices: ThunkServices = {
    api: {
        getTossResult$: getTossResult$
    }
};