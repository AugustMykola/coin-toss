import { defer, map, timer } from 'rxjs';
import type { Observable } from 'rxjs';

import type { ITossResult } from '../../shared/models/ITossResult';
import { CoinSide } from '../../shared/enums/coin-side';

export const getTossResult$ = (): Observable<ITossResult> =>
  defer(() => {
    const delayMs = Math.floor(Math.random() * 1000) + 1;

    return timer(delayMs).pipe(
      map(() => ({
        tossResult: Math.random() > 0.5 ? CoinSide.Heads : CoinSide.Tails,
      })),
    );
  });
