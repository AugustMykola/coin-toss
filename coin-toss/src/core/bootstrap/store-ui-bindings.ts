import type { Store } from 'redux';
import { selectIsAnimating, selectTossMessage } from '../store/toss.selectors';

type Params = {
  getIsPopupOpen: () => boolean;
  onMessage: (msg: string) => void;
};

export function attachStoreUiBindings(store: Store, params: Params) {
  let currentMessage: string | null = null;
  let isAnimating = false;

  const setButtonsDisabled = (disabled: boolean) => {
    const btnHeadsEl = document.getElementById('btn-heads') as HTMLButtonElement | null;
    const btnTailsEl = document.getElementById('btn-tails') as HTMLButtonElement | null;
    if (btnHeadsEl) btnHeadsEl.disabled = disabled;
    if (btnTailsEl) btnTailsEl.disabled = disabled;
  };

  const recomputeButtonsDisabled = () => {
    const disabled = isAnimating || params.getIsPopupOpen();
    setButtonsDisabled(disabled);
  };

  const unsubscribe = store.subscribe(() => {
    const state = store.getState();

    const newMessage = selectTossMessage(state);
    if (newMessage && newMessage !== currentMessage) {
      params.onMessage(newMessage);
    }
    currentMessage = newMessage;

    isAnimating = !!selectIsAnimating(state);
    recomputeButtonsDisabled();
  });

  recomputeButtonsDisabled();

  return {
    recomputeButtonsDisabled,
    destroy() {
        unsubscribe();
    },
  };
}
