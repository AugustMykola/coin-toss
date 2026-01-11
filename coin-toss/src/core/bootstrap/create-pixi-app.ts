import { Application } from 'pixi.js';

export async function createPixiApp(): Promise<Application> {
  const app = new Application();

  await app.init({
    resizeTo: window,
    backgroundAlpha: 0,
    antialias: true,
    resolution: Math.min(devicePixelRatio, 2),
    autoDensity: true,
  });

  const container = document.getElementById('pixi-container');
  (container ?? document.body).appendChild(app.canvas);

  return app;
}