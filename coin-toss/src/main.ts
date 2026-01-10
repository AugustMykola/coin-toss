import { Application } from 'pixi.js';
import './styles.css';
import { store } from "./core/store/store.ts";
import { TossScene } from "./core/pixi/TossScene.ts";
import {CoinAnimationService} from "./core/services/CoinAnimationService.ts";
import {tossCoin} from "./core/store/toss.effects.ts";
import {CoinSide} from "./shared/enums/coin-side.ts";
import {thunkServices} from "./core/store/thunk-extras.ts";
import {ResultMessage} from "./core/pixi/ResultMessage.ts";
import {selectTossMessage} from "./core/store/toss.selectors.ts";

export let animationService: CoinAnimationService;
export let resultMessage: ResultMessage;

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
    }

    resultMessage = new ResultMessage();

    let currentMessage: string | null = null;
    store.subscribe(() => {
        const state = store.getState();
        const newMessage = selectTossMessage(state);
        console.log(newMessage);

        if (newMessage && newMessage !== currentMessage) {
            resultMessage.show(newMessage);
        }
        currentMessage = newMessage;
    });


    const gameScene = new TossScene(app);
    await gameScene.init();

    animationService = new CoinAnimationService(gameScene);
    thunkServices.animationService = animationService;

    const btnHeads = document.getElementById('btn-heads');
    const btnTails = document.getElementById('btn-tails');

    btnHeads?.addEventListener('click', () => {
        store.dispatch(tossCoin(CoinSide.Heads));
    });

    btnTails?.addEventListener('click', () => {
        store.dispatch(tossCoin(CoinSide.Tails));
    });

})();