import { PBRMaterial, Texture } from '@babylonjs/core';

export const createGrassMaterial = () => {
  const grassMaterial = new PBRMaterial("grass");
  const albedoTexture = new Texture(
    "src/assets/textures/ground_grass.png"
  );
  albedoTexture.uScale = 10;
  albedoTexture.vScale = 10;
  grassMaterial.albedoTexture = albedoTexture;

  const bumpTexture = new Texture(
    "src/assets/textures/ground_grass_NRM.png"
  );
  bumpTexture.uScale = 10;
  bumpTexture.vScale = 10;
  grassMaterial.bumpTexture = bumpTexture;

  grassMaterial.roughness = 1;
  return grassMaterial;
};

export const createStoneMaterial = () => {
  const stoneMaterial = new PBRMaterial("stone");
  const albedoTexture = new Texture(
    "src/assets/textures/stone-grey.png"
  );
  stoneMaterial.albedoTexture = albedoTexture;

  const bumpTexture = new Texture(
    "src/assets/textures/stone-grey_NRM.png"
  );
  stoneMaterial.bumpTexture = bumpTexture;

  stoneMaterial.roughness = 0.5;
  return stoneMaterial;
};
