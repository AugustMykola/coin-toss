import { Container, Graphics, Text } from 'pixi.js';

export class Coin extends Container {
    private front!: Graphics;
    private back!: Graphics;

    constructor() {
        super();
        this.createCoinGraphics();
    }

    private createCoinGraphics() {
        const radius: number = 100;
        this.front = new Graphics();
        this.front.circle(0, 0, radius);
        this.front.fill(0xFFD700);
        this.front.stroke({ width: 5, color: 0xB8860B });

        const headsText = new Text({ text: 'HEADS', style: {
                fontFamily: 'Arial', fontSize: 24, fontWeight: 'bold', fill: 0xB8860B
            }});
        headsText.anchor.set(0.5);
        this.front.addChild(headsText);

        this.back = new Graphics();
        this.back.circle(0, 0, radius);
        this.back.fill(0xC0C0C0);
        this.back.stroke({ width: 5, color: 0x808080 });
        const tailsText = new Text({ text: 'TAILS', style: {
                fontFamily: 'Arial', fontSize: 24, fontWeight: 'bold', fill: 0x808080
            }});
        tailsText.anchor.set(0.5);
        this.back.addChild(tailsText);

        this.addChild(this.back);
        this.addChild(this.front);

        this.updateFaceVisibility(1);
    }

    public updateFaceVisibility(scaleX: number) {
        if (scaleX > 0) {
            this.front.visible = true;
            this.back.visible = false;
        } else {
            this.front.visible = false;
            this.back.visible = true;
        }
    }

}