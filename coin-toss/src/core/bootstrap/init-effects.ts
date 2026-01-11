import type { Store } from 'redux';
import type { UnknownAction } from 'redux';

export async function initEffects(store: Store<any, UnknownAction>): Promise<void> {
  const { bindStoreToActionBus } = await import('../services/action-bus');
  bindStoreToActionBus(store);

  await import('../store/toss.effects');
}
