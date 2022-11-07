import type { Scene } from "@babylonjs/core";
import {
  AssetsManager,
  Color4,
  ParticleSystem,
  Vector3,
} from "@babylonjs/core";

export const createSnowParticles = (
  assetsManager: AssetsManager,
  scene: Scene
) => {
  const particleSystem = new ParticleSystem("particles", 2000, scene);

  assetsManager.addTextureTask(
    "snow_particle",
    "src/assets/textures/particle_snow.png"
  ).onSuccess = (task) => (particleSystem.particleTexture = task.texture);

  particleSystem.emitter = new Vector3(0, 20, 0);
  particleSystem.minEmitBox = new Vector3(-100, 0, -100);
  particleSystem.maxEmitBox = new Vector3(100, 10, 100);
  particleSystem.color1 = new Color4(1, 1, 1, 0.1);
  particleSystem.color2 = new Color4(1, 1, 1, 0.1);
  particleSystem.colorDead = new Color4(0, 0, 0, 0.0);
  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 0.2;
  particleSystem.minLifeTime = 5;
  particleSystem.maxLifeTime = 7;
  particleSystem.minInitialRotation = 0;
  particleSystem.maxInitialRotation = Math.PI;
  particleSystem.emitRate = 1000;
  particleSystem.direction1 = new Vector3(1, 0, 1);
  particleSystem.direction2 = new Vector3(-1, 0, -1);
  particleSystem.gravity = new Vector3(0, -5, 0);
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 1.5;

  particleSystem.start();
};
