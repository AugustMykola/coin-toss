import { Container, Graphics } from 'pixi.js';
import { CoinSide } from '../../shared/enums/coin-side';

export class Coin extends Container {
    private graphics: Graphics;
    private readonly radius: number = 60;
    private readonly thickness: number = 7;

    constructor() {
        super();
        this.graphics = new Graphics();
        this.addChild(this.graphics);

        this.draw(CoinSide.Heads);
    }

    public draw(side: CoinSide, faceScale: number = 1): void {
        this.graphics.clear();

        const color = 0xFFD700;
        const sideColor = 0xC5A000;
        const symbolColor = 0xB8860B;
        const symbolDepthColor = 0x8B4500;

        const absScale = Math.abs(faceScale);

        if (absScale > 0.05) {
            this.graphics.context.fillStyle = sideColor;
            this.graphics.ellipse(0, this.thickness * absScale, this.radius, this.radius * absScale);
            this.graphics.rect(-this.radius, 0, this.radius * 2, this.thickness * absScale);
            this.graphics.fill();
        }

        this.graphics.context.fillStyle = color;
        this.graphics.ellipse(0, 0, this.radius, this.radius * absScale);
        this.graphics.fill();

        if (absScale > 0.2) {
            if (side === CoinSide.Heads) {
                this.drawSun(absScale, symbolColor, symbolDepthColor);
            } else {
                this.drawMoon(absScale, symbolColor, symbolDepthColor);
            }
        }
    }

    private drawSun(scaleY: number, color: number, depthColor: number): void {
        const depth = 4 * scaleY;

        const drawLayer = (offsetY: number, drawColor: number) => {
            this.graphics.context.fillStyle = drawColor;

            this.graphics.ellipse(0, offsetY, 20, 20 * scaleY);
            this.graphics.fill();

            const rayStart = 28;
            const rayLength = 12;

            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI * 2) / 8;
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);

                this.graphics.moveTo(cos * rayStart, sin * rayStart * scaleY + offsetY);
                this.graphics.lineTo(cos * (rayStart + rayLength), sin * (rayStart + rayLength) * scaleY + offsetY);
                this.graphics.stroke({ width: 4, color: drawColor, cap: 'round' });
            }
        };

        drawLayer(depth, depthColor);
        drawLayer(0, color);
    }

    private drawMoon(scaleY: number, color: number, depthColor: number): void {
        const startY = -30 * scaleY;
        const endY = 30 * scaleY;
        const depth = 4 * scaleY;

        const drawLayer = (offsetY: number, drawColor: number) => {
            this.graphics.context.fillStyle = drawColor;
            this.graphics.beginPath();

            this.graphics.moveTo(0, startY + offsetY);
            this.graphics.quadraticCurveTo(50, offsetY, 0, endY + offsetY);
            this.graphics.quadraticCurveTo(15, offsetY, 0, startY + offsetY);

            this.graphics.fill();
        };

        drawLayer(depth, depthColor);
        drawLayer(0, color);
    }
}