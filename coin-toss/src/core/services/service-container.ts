import type { CoinAnimationService } from "./CoinAnimationService";
import type { ResultMessage } from "../pixi/ResultMessage";

class ServiceContainer {
    private _animationService?: CoinAnimationService;
    private _resultMessage?: ResultMessage;

    public setAnimationService(svc?: CoinAnimationService) {
        this._animationService = svc;
    }

    public getAnimationService(): CoinAnimationService | undefined {
        return this._animationService;
    }

    public setResultMessage(msg?: ResultMessage) {
        this._resultMessage = msg;
    }

    public getResultMessage(): ResultMessage | undefined {
        return this._resultMessage;
    }
}

export const serviceContainer = new ServiceContainer();
