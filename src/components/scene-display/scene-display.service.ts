import {
  Engine,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3
} from "@babylonjs/core";

const initCamera = (canvas: HTMLCanvasElement, scene: Scene) => {
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);
  return camera;
};

const initLight = (scene: Scene) => {

  const light = new HemisphericLight(
    "light",
    new Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;
};

const initMeshes = (scene: Scene) => {
  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
  sphere.position.y = 1;
};

const initGround = (scene: Scene) => {
  MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );
};

export const createScene = (
  canvas: HTMLCanvasElement
) => {
  const engine = new Engine(canvas, true, {stencil : true}, false);
  const scene = new Scene(engine);

  initCamera(canvas, scene);
  initLight(scene);
  initGround(scene);
  initMeshes(scene);

  engine.runRenderLoop(() => scene.render());
};

