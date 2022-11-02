import type { Mesh, Scene } from "@babylonjs/core";
import {
  AssetsManager,
  Color4,
  ParticleSystem,
  Vector3,
} from "@babylonjs/core";

export const createSmokeParticles = (
  emitter: Mesh,
  assetsManager: AssetsManager,
  scene: Scene
) => {
  const particleSystem = new ParticleSystem("particles", 2000, scene);

  // Ancien chargement de la texture:
  // particleSystem.particleTexture = new Texture("src/assets/textures/particle_smoke.jpg");

  // TODO: declarer la tache de chargement dans l'assetsManager

  particleSystem.emitter = emitter;
  particleSystem.color1 = new Color4(1, 1, 1, 0.1);
  particleSystem.color2 = new Color4(1, 1, 1, 0.1);
  particleSystem.colorDead = new Color4(0, 0, 0, 0.0);
  particleSystem.minSize = 1;
  particleSystem.maxSize = 1.2;
  particleSystem.minLifeTime = 5;
  particleSystem.maxLifeTime = 5;
  particleSystem.minInitialRotation = 0;
  particleSystem.maxInitialRotation = Math.PI;
  particleSystem.emitRate = 50;
  particleSystem.direction1 = new Vector3(1, 0, 1);
  particleSystem.direction2 = new Vector3(-1, 0, -1);
  particleSystem.gravity = new Vector3(0, 0, 0);
  particleSystem.minEmitPower = 2;
  particleSystem.maxEmitPower = 3;

  particleSystem.start();
};
