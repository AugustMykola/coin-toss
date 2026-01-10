import type {Coin} from "./Coin.ts";
import {CoinSide} from "../../shared/enums/coin-side.ts";

export class CoinAnimator {
    private coin: Coin;
    private isAnimating: boolean = false;
    private duration: number = 2000;
    private elapsed: number = 0;
    private startY: number = 0;
    private jumpHeight: number = 300;
    private totalSpins: number = 10;

    private targetSide: CoinSide | null = null;
    private onStopCallback: (() => void) | null = null;

    constructor(coin: Coin) {
        this.coin = coin;
        this.startY = coin.y;
    }

    public startSpin() {
        this.isAnimating = true;
        this.elapsed = 0;
        this.targetSide = null;
        this.onStopCallback = null;

        this.startY = this.coin.y;
    }

    public stopSpin(result: CoinSide, onStop: () => void) {
        this.targetSide = result;
        this.onStopCallback = onStop;
    }

    public update(ticker: { lastTime: number, deltaTime: number }) {
        if (!this.isAnimating) return;

        const deltaMS = ticker.deltaTime * 16.66;
        this.elapsed += deltaMS;

        const progress = Math.min(this.elapsed / this.duration, 1);

        const heightOffset = 4 * this.jumpHeight * progress * (1 - progress);
        this.coin.y = this.startY - heightOffset;

        const angle = progress * Math.PI * this.totalSpins;
        const scale = Math.cos(angle);

        let visibleSide = scale > 0 ? CoinSide.Heads : CoinSide.Tails;

        this.coin.draw(visibleSide, scale);

        if (progress >= 1) {
            this.finishAnimation();
        }
    }

    private finishAnimation() {
        this.isAnimating = false;

        this.coin.y = this.startY;

        if (this.targetSide) {
            this.coin.draw(this.targetSide, 1);
        } else {
            this.coin.draw(CoinSide.Heads, 1);
        }

        if (this.onStopCallback) {
            this.onStopCallback();
        }
    }
}