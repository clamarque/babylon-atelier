import {
  AssetsManager,
  Mesh,
  StandardMaterial,
  Texture,
  Scene,
  MeshBuilder, CubeTexture,
} from "@babylonjs/core";

export const createSkybox = (assetsManager: AssetsManager, scene: Scene) => {
  const skybox = MeshBuilder.CreateBox("skyBox", { size: 1000 }, scene);
  const skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.disableLighting = true;
  assetsManager.addCubeTextureTask(
    "skyboxTexture",
    "src/assets/skybox/skybox"
  ).onSuccess = (task) => {
    skyboxMaterial.reflectionTexture = task.texture;
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    skyboxMaterial.reflectionTexture.gammaSpace = true;
  };
  skybox.material = skyboxMaterial;
  skybox.infiniteDistance = true;
  skybox.applyFog = true;
  skybox.renderingGroupId = 0;
  skybox.freezeWorldMatrix();

  scene.environmentTexture = CubeTexture.CreateFromPrefilteredData(
    "src/assets/skybox/skybox.env",
    scene
  );
};
