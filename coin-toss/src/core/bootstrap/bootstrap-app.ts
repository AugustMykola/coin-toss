import { Application } from 'pixi.js';
import { store } from '../store/store';
import { TossScene } from '../pixi/TossScene';
import { CoinAnimationService } from '../services/CoinAnimationService';
import { ResultMessage } from '../pixi/ResultMessage';
import { serviceContainer } from '../services/service-container';
import { attachStoreUiBindings } from './store-ui-bindings';
import { attachPopupBindings } from './popup-bindings';
import { attachTossButtons } from './toss-buttons';
import { createPixiApp } from './create-pixi-app';
import { initEffects } from './init-effects';

export async function bootstrapApp(): Promise<void> {
  const app = await createPixiApp();

  const resultMessage = new ResultMessage();
  serviceContainer.setResultMessage(resultMessage);

  const popupState = attachPopupBindings({
    onChange: () => uiState.recomputeButtonsDisabled(),
  });

  const uiState = attachStoreUiBindings(store, {
    getIsPopupOpen: () => popupState.isOpen,
    onMessage: (msg) => resultMessage.show(msg),
  });


  popupState.setOnChange(() => uiState.recomputeButtonsDisabled());

  const scene = new TossScene(app);
  await scene.init();

  const animationService = new CoinAnimationService(scene);
  animationService.setDispatch(store.dispatch);
  serviceContainer.setAnimationService(animationService);

  await initEffects(store);

  attachTossButtons(store);

  window.addEventListener('beforeunload', () => {
    uiState.destroy();
    popupState.destroy();
  });
}
