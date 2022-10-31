import {
  Engine,
  HemisphericLight,
  MeshBuilder,
  Scene,
  UniversalCamera,
  Vector3
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

const initMeshes = (scene: Scene) => {
  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
  sphere.position.y = 1;

  // TODO: activez la gestion des collisions

  // TODO: affectez un material
  // sphere.material = XXX

  // TODO: associé un emetteur de particules
};

const initGround = (scene: Scene) => {
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 100, height: 100 },
    scene
  );
  // TODO: activez la gestion des collisions

  // TODO: affectez un material
  // ground.material = XXX
};

export const createScene = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas, true, { stencil: true }, false);
  const scene = new Scene(engine);
  scene.collisionsEnabled = true;
  scene.gravity = new Vector3(0, -1, 0);

  initCamera(canvas, scene);
  initLight(scene);
  initGround(scene);
  initMeshes(scene);

  engine.runRenderLoop(() => scene.render());
};
