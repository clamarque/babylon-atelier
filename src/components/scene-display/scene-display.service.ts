import { createSnowParticles } from '@/services/particles.service';
import { createSkybox } from "@/services/skybox.service";
import { AssetsManager, Color3, Engine, GlowLayer, SceneLoader, Vector3, } from "@babylonjs/core";

export const createScene = async (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas, true, { stencil: true }, false);
  const scene = await SceneLoader.LoadAsync(
    "src/assets/scene/",
    "my-scene.babylon",
    engine
  );
  scene.collisionsEnabled = true;
  scene.gravity = new Vector3(0, -1, 0);
  scene.attachControl(true, true, true);
  scene.cameras[0].attachControl(canvas);
  scene.ambientColor = new Color3(1, 1, 1);
  scene.environmentIntensity = 1;
  scene.lights[0].intensity = 5;

  const glowLayer = new GlowLayer("glow", scene);
  glowLayer.intensity = 1.5;
  const assetsManager = new AssetsManager(scene);

  createSkybox(assetsManager, scene);
  createSnowParticles(assetsManager, scene);

  await assetsManager.loadAsync();
  engine.runRenderLoop(() => scene.render());

  scene.skeletons
    .filter((_) => _.getAnimationRanges().length)
    .forEach((_) => {
      const { from, to } = _.getAnimationRanges()[0]!;
      scene.beginAnimation(_, from, to, true);
    });
};
