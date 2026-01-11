import { filter, switchMap, mergeMap, catchError, map } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { actionBus } from '../services/action-bus';
import { getTossResult$ } from '../api/coin-toss-api';
import { tossRequested, tossSucceeded, tossFailed } from './toss.actions';
import { serviceContainer } from '../services/service-container';
import { store } from './store';

actionBus.pipe(
  filter((action) => action && action.type === tossRequested.type),
  switchMap((action) => {
    const prediction = action.payload;
    const animationService = serviceContainer.getAnimationService();
    if (!animationService) {
      return of(tossFailed('Animation service not initialized'));
    }

    animationService.startSpinning();

    return getTossResult$().pipe(
      mergeMap((response) =>
        from(animationService.stopSpinning(response.tossResult)).pipe(
          map(() => tossSucceeded(response.tossResult, prediction))
        )
      ),
      catchError((err) => of(tossFailed(err?.message || 'Unknown error')))
    );
  })
).subscribe((action) => store.dispatch(action));
