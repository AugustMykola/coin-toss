import { TossScene } from "../pixi/TossScene";
import type { CoinSide } from "../../shared/enums/coin-side";

export class CoinAnimationService {
    private scene: TossScene;

    constructor(scene: TossScene) {
        this.scene = scene;
    }

    public startSpinning(): void {
        this.scene.spinCoin();
    }


    public stopSpinning(result: CoinSide): Promise<void> {
        return new Promise((resolve) => {
            this.scene.stopCoin(result, () => {
                resolve();
            });
        });
    }


    public destroy(): void {
        this.scene.destroy();
    }
}