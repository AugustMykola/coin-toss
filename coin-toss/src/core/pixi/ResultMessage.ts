export class ResultMessage {
    private container: HTMLElement;
    private textElement: HTMLElement;
    private timeoutId: any = null;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'popup-message';

        this.textElement = document.createElement('h1');
        this.textElement.className = 'popup-text';

        this.container.appendChild(this.textElement);

        let uiLayer = document.querySelector('.ui-layer');
        if (!uiLayer) {
            uiLayer = document.createElement('div');
            uiLayer.className = 'ui-layer';
            document.body.appendChild(uiLayer);
        }

        uiLayer.appendChild(this.container);
    }

    public show(message: string): void {
        this.textElement.innerText = message;

        requestAnimationFrame(() => {
            this.container.classList.add('visible');
        });

        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
            this.hide();
        }, 2000);
    }

    private hide(): void {
        this.container.classList.remove('visible');
        this.timeoutId = null;
    }
}