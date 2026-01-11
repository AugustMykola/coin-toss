import type { Store } from 'redux';
import { tossRequested } from '../store/toss.actions';
import { CoinSide } from '../../shared/enums/coin-side';
import { selectIsAnimating } from '../store/toss.selectors';

export function attachTossButtons(store: Store) {
  const btnHeads = document.getElementById('btn-heads');
  const btnTails = document.getElementById('btn-tails');

  btnHeads?.addEventListener('click', () => {
    const state = store.getState();
    if (selectIsAnimating(state)) return;
    store.dispatch(tossRequested(CoinSide.Heads));
  });

  btnTails?.addEventListener('click', () => {
    const state = store.getState();
    if (selectIsAnimating(state)) return;
    store.dispatch(tossRequested(CoinSide.Tails));
  });
}
