import { Application } from 'pixi.js';
import './styles.css';
import { store } from "./core/store/store.ts";
import { TossScene } from "./core/pixi/TossScene.ts";
import {CoinAnimationService} from "./core/services/CoinAnimationService.ts";
import {tossCoin} from "./core/store/toss.effects..ts";
import {CoinSide} from "./shared/enums/coin-side.ts";
import {thunkServices} from "./core/store/thunk-extras.ts";


export let animationService: CoinAnimationService;

(async () => {
    const app = new Application();

    await app.init({
        resizeTo: window,
        backgroundAlpha: 0,
        antialias: true,
        resolution: Math.min(devicePixelRatio, 2),
        autoDensity: true,
    });

    const container = document.getElementById('pixi-container');
    if (container) {
        container.appendChild(app.canvas);
    } else {
        document.body.appendChild(app.canvas);
        console.warn('pixi-container not found, appending to body');
    }

    const gameScene = new TossScene(app);
    await gameScene.init();

    animationService = new CoinAnimationService(gameScene);
    thunkServices.animationService = animationService;

    const btnHeads = document.getElementById('btn-heads');
    const btnTails = document.getElementById('btn-tails');

    btnHeads?.addEventListener('click', () => {
        console.log('Heads clicked');
        // Спочатку скидаємо, якщо потрібно, або одразу запускаємо підкидання
        // tossStore.dispatch(resetToss());
        store.dispatch(tossCoin(CoinSide.Heads));
    });

    btnTails?.addEventListener('click', () => {
        console.log('Tails clicked');
        // tossStore.dispatch(resetToss());
        store.dispatch(tossCoin(CoinSide.Tails));
    });


})();