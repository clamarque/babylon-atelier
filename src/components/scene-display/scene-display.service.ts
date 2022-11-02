import {
  createGrassMaterial,
  createStoneMaterial,
} from "@/services/material.service";
import { createSmokeParticles } from "@/services/particles.service";
import {
  AssetsManager,
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  UniversalCamera,
  Vector3,
} from "@babylonjs/core";

const initCamera = (canvas: HTMLCanvasElement, scene: Scene) => {
  const camera = new UniversalCamera("camera1", new Vector3(0, 4, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);
  camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.ellipsoid = new Vector3(1, 2, 1);
  return camera;
};

const initLight = (scene: Scene) => {
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 1;
};

const initMeshes = (assetsManager: AssetsManager, scene: Scene) => {
  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
  sphere.position.y = 1;
  sphere.checkCollisions = true;
  sphere.material = createStoneMaterial(assetsManager);
  createSmokeParticles(sphere, assetsManager, scene);
};

const initGround = (assetsManager: AssetsManager, scene: Scene) => {
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 100, height: 100 },
    scene
  );
  ground.checkCollisions = true;
  ground.material = createGrassMaterial(assetsManager);
};

export const createScene = async (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas, true, { stencil: true }, false);
  const scene = new Scene(engine);
  scene.collisionsEnabled = true;
  scene.gravity = new Vector3(0, -1, 0);

  const assetsManager = new AssetsManager(scene);

  initCamera(canvas, scene);
  initLight(scene);
  initGround(assetsManager, scene);
  initMeshes(assetsManager, scene);

  await assetsManager.loadAsync();
  engine.runRenderLoop(() => scene.render());
};
