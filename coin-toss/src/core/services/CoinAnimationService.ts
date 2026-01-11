import { TossScene } from "../pixi/TossScene";
import type { CoinSide } from "../../shared/enums/coin-side";
import type { Dispatch, UnknownAction } from 'redux';
import { startAnimation, stopAnimation } from "../store/toss.actions";

export class CoinAnimationService {
    private scene: TossScene;
    private dispatch: Dispatch<UnknownAction > | null = null;

    constructor(scene: TossScene) {
        this.scene = scene;
    }

    public startSpinning(): void {
        if (this.dispatch) this.dispatch(startAnimation());
        this.scene.spinCoin();
    }


    public stopSpinning(result: CoinSide): Promise<void> {
        return new Promise((resolve) => {
            this.scene.stopCoin(result, () => {
                if (this.dispatch) this.dispatch(stopAnimation());
                resolve();
            });
        });
    }

    public setDispatch(dispatch: Dispatch<UnknownAction>) {
        this.dispatch = dispatch;
    }
}