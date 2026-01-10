import type {Coin} from "./Coin.ts";
import {CoinSide} from "../../shared/enums/coin-side.ts";

export class CoinAnimator {
    private coin: Coin;
    private isSpinning: boolean = false;
    private speed: number = 0.2;
    private targetScale: number | null = null;
    private onStopCallback: (() => void) | null = null;
    private time: number = 0;

    constructor(coin: Coin) {
        this.coin = coin;
    }

    public startSpin() {
        this.isSpinning = true;
        this.targetScale = null;
        this.onStopCallback = null;
    }

    public stopSpin(result: CoinSide, onStop: () => void) {
        this.targetScale = result === CoinSide.Heads ? 1 : -1;
        this.onStopCallback = onStop;
    }

    public update(ticker: { lastTime: number, deltaTime: number }) {
        if (!this.isSpinning && this.targetScale === null) return;

        this.time += ticker.deltaTime;

        const scaleX = Math.cos(this.time * 0.05 * this.speed);

        this.coin.scale.x = scaleX;
        this.coin.updateFaceVisibility(scaleX);

        this.checkStopCondition(scaleX);
    }

    private checkStopCondition(currentScale: number) {
        if (this.targetScale !== null) {
            const isHeadsTarget = this.targetScale === 1;
            const isFacingCorrectly = isHeadsTarget
                ? currentScale > 0.95
                : currentScale < -0.95;

            if (isFacingCorrectly) {
                this.coin.scale.x = this.targetScale;
                this.coin.updateFaceVisibility(this.targetScale);

                this.isSpinning = false;
                this.targetScale = null;

                if (this.onStopCallback) {
                    this.onStopCallback();
                }
            }
        }
    }
}