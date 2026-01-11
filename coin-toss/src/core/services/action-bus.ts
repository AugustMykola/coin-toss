import { Subject } from 'rxjs';
import type { Store, UnknownAction, Dispatch } from 'redux';

export const actionBus = new Subject<UnknownAction>();

export type UnbindActionBus = () => void;

export function bindStoreToActionBus(store: Store): UnbindActionBus {
  const originalDispatch: Dispatch<UnknownAction> = store.dispatch;

  const patchedDispatch: Dispatch<UnknownAction> = (action) => {
    try {
      actionBus.next(action);
    } catch {
    }

    return originalDispatch(action);
  };

  store.dispatch = patchedDispatch;

  return () => {
    store.dispatch = originalDispatch;
  };
}
