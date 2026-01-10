import { Application } from 'pixi.js';
import { Coin } from "./Coin";
import { CoinAnimator } from "./CoinAnimator";
import type {CoinSide} from "../../shared/enums/coin-side.ts";

export class TossScene {
    private app: Application;
    private coin: Coin;
    private coinAnimator: CoinAnimator;

    constructor(app: Application) {
        this.app = app;
        this.coin = new Coin();
        this.coinAnimator = new CoinAnimator(this.coin);
    }

    public async init() {


        this.setupScene();
        this.setupTicker();
    }

    private setupScene() {
        this.coin.x = this.app.screen.width / 2;
        this.coin.y = this.app.screen.height / 2;

        this.app.stage.addChild(this.coin);


        window.addEventListener('resize', () => {
            this.coin.x = this.app.screen.width / 2;
            this.coin.y = this.app.screen.height / 2;
        });
    }

    private setupTicker() {
        this.app.ticker.add((ticker) => {
            this.coinAnimator.update(ticker);
        });
    }


    public spinCoin() {
        this.coinAnimator.startSpin();
    }

    public stopCoin(result: CoinSide, callback: () => void) {
        this.coinAnimator.stopSpin(result, callback);
    }

    public destroy() {

        this.app.stage.removeChild(this.coin);
        this.coin.destroy();
    }
}