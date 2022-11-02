import { AssetsManager, PBRMaterial, TextureAssetTask } from "@babylonjs/core";

export const createGrassMaterial = (assetsManager: AssetsManager) => {
  const grassMaterial = new PBRMaterial("grass");
  grassMaterial.roughness = 1;

  // Ancien chargement des textures:
  /*
    const XXXTexture = new Texture("uri/vers/ma/ressource.png");
    XXXTexture.uScale = 10;
    XXXTexture.vScale = 10;
    grassMaterial.XXXTexture = XXXTexture;
   */

  // TODO: declarer les taches de chargement dans l'assetsManager
  // sachant que les resources a charger sont les suivantes:
  //  - albedoTexture: src/assets/textures/ground_grass.png
  //  - bumpTexture: src/assets/textures/ground_grass_NRM.png
  /*
  assetsManager.addTextureTask(
    "nom_de_ma_task",
    "uri/vers/ma/ressource.png"
  ).onSuccess = (task: TextureAssetTask) => {
    const { texture } = task;
    texture.uScale = 10;
    texture.vScale = 10;
    grassMaterial.XXXTexture = texture;
  };
 */
  return grassMaterial;
};

export const createStoneMaterial = (assetsManager: AssetsManager) => {
  const stoneMaterial = new PBRMaterial("stone");
  stoneMaterial.roughness = 0.5;

  // Ancien chargement des textures:
  /*
    stoneMaterial.XXXTexture = new Texture("uri/vers/ma/ressource.png");
   */

  // TODO: declarer les taches de chargement dans l'assetsManager
  // sachant que les resources a charger sont les suivantes:
  //  - albedoTexture: src/assets/textures/stone-grey.png
  //  - bumpTexture: src/assets/textures/stone-grey_NRM.png
  /*
  assetsManager.addTextureTask(
    "nom_de_ma_task",
    "uri/vers/ma/ressource.png"
  ).onSuccess = (task: TextureAssetTask) => stoneMaterial.XXXTexture = task.texture;
 */
  return stoneMaterial;
};
