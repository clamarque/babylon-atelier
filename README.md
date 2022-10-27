# Amuses-toi en 3D avec babylonJS
### Pré-requis
 - nodeJs v16+
 - npm v8.11
 - un navigateur web pas trop vieux :-p
 - votre IDE préféré (^_^)
 - Git

### Installation et lancement
 - clonez le projet git en local: `git clone https://github.com/ineat/hands-on-babylon.git`
 - allez à la racine du projet
 - rendez-vous sur la branche step-01: `git checkout step-01`
 - executez `npm install`
 - executez `npm run start`
 - ouvrez votre navigateur sur `http://localhost:5173/`
 - pensez à coupez votre appli lorsque vous changez de branche

### Etape 1: La baaaase! 
 - Avant d'aller plus loin, prenons le temps de regarder ce projet:
   - Dans le fichier `src/components/scene-display/scene-display.vue`:
     - Dans la fonction `setup`: la référence du canvas est récupérée et passée en attribut interne du composant.
     - Dans la fonction `mounted`: la référence du canvas est valorisée puis passée dans la fonction `createScene`.
   - Dans le fichier `src/components/scene-display/scene-display.service.ts`:
     - Dans la fonction `createScene`: Le moteur de rendu et la scene sont crées. on y rajoute une camera, une source de lumière et des objets à afficher.

 - <u>À vous de jouer!</u>
   - Avant de passer à l'étape 2, nous allons nous familiariser la scene. Pour cela, vous pouvez:
     - Rajouter un model 3D en utilisant l'api `MeshBuilder` dans la fonction `initMeshes` (https://doc.babylonjs.com/typedoc/modules/BABYLON#MeshBuilder).
     - Modifier l'éclairage de la scene en changeant les propriétés de la lumière existante ou en rajoutant une autre source de lumière (une PointLight par exemple).
 - Lorsque vous aurez fini de jouer avec la scene, vous pourrez passer à l'étape suivante : `git checkout .` puis `git checkout step-02`

### Etape 2: De l'appli à la scene...
  Nous allons voir ensemble comment modifier notre scene à partir du modèle de l'application.
  Pour cela, nous allons devoir exporter dans un contexte partagé des fonctions qui nous permettront de modifier la scene à partir d'un autre composant.
  Cette notion de contexte partagé sera prise en charge par [Pinia](https://pinia.vuejs.org/).
  - Dans le fichier `src/model/scene-handler.ts`:
    - Nous définissons une interface `SceneHandler` qui définit les interactions que nous aurons avec notre scene.
  - Dans le fichier `src/stores/scene-handler.ts`:
    - Nous créons un store `Pinia` avec un état initial et des accesseurs pour gérer les valeurs d'un objet SceneHandler.
  - Dans le fichier `src/components/scene-display/scene-display.vue`: 
    - nous affectons une valeur au currentSceneHandler gérée par `Pinia`
  - Dans le fichier `src/components/hands-on/hands-on.vue`: 
    - nous récuperons une référence sur la valeur de `currentSceneHandler` pour en éxecuter les fonctions en cliquant sur un bouton à l'extérieur de notre canvas.

  - <u>À vous de jouer!</u>
    - Rendez-vous en `src/components/scene-display/scene-display.service.ts` et implémentez les fonctions du `sceneHandler`.
  - Lorsque vous aurez suffisamment pollué la scene avec des cubes , vous pourrez passer à l'étape suivante : `git checkout .` puis `git checkout step-03`


### Etape 3: ... et vice et versa
  Il est aussi possible de modifier l'état de notre application en intéragissant avec la scene 3D.
  Pour cela, il est possible de definir une fonction `onPointerDown` de notre objet `scene` afin de capter un clique sur notre scene et d'executer un traitement en fonction de l'élément cliqué.
  Le cas échéant, nous allons afficher un compteur qui indiquera le nombre fois où on aura cliqué sur la sphere.
  - Dans le fichier `src/stores/counter.ts`:
    - Nous créons un store `Pinia` avec un compteur `count` et une fonction d'incrément.
  - Dans le fichier `src/components/hands-on/hands-on.vue`:
    - nous récuperons une référence sur la valeur de `count` pour l'afficher à l'écran.
  - Dans le fichier `src/components/scene-display/scene-display.vue`:
    - nous récupérons la fonction d'incrément dans `Pinia` afin de la passée dans `createScene`.

  - <u>À vous de jouer!</u>
    - Rendez-vous en `src/components/scene-display/scene-display.service.ts` et implémentez `scene.onPointerDown`.
    - Indice: Vous pouvez regarder la documentation de la classe (PickingInfo)[https://doc.babylonjs.com/typedoc/classes/BABYLON.PickingInfo] de babylonjs.
  - Après avoir augmenté la valeur du compteur en cliquant sur la sphere , vous pourrez passer à l'étape suivante : `git checkout .` puis `git checkout step-04`

### Etape 4: Physique et particules
  Nous allons maintenant rajouter des propriétés physiques à notre scene:
  - Dans le fichier `src/components/scene-display/scene-display.service.ts`:
    - la gravité et la gestion des collisions de la caméra on été activées.
    - une ellipsoïde a été affectée à la caméra (ce sera son masque de collision).
    - la gestion des collisions et de la gravité a été activée au niveau de la scene
  - Si vous essayez de bouger la camera avec le clavier, celle-ci passera à travers le sol.
  - <u>À vous de jouer</u>: **_Activez la gestion des collisions au niveau du sol et de la sphere_**

  Nous allons associer les objets de notre scene à des matériaux:
  - Un matériel est une combinaison de textures utilisées pour définir les propriétés optiques d'une surface (voir [PBRMaterial](https://doc.babylonjs.com/typedoc/classes/BABYLON.PBRMaterial)).
  - Un ensemble de matériaux ont été définis dans le fichier `src/services/material.service.ts`.
  - <u>À vous de jouer</u>: **_Affectez des matériaux à la sphere et au sol._**

  Enfin, nous allons rajouter un émetteur de particule:
  - Les particules sont des sprites émis à partir d'une source (voir [ParticleSystem](https://doc.babylonjs.com/typedoc/classes/BABYLON.ParticleSystem))
  - Un generateur de particules a été défini dans le fichier `src/services/particles.service.ts`.
  - <u>À vous de jouer</u>: **_Créez un générateur de particules ayant la sphère pour émetteur _**

  Lorsque vous aurez fini, vous pourrez passer à l'étape suivante : `git checkout .` puis `git checkout step-05`


### Etape 5: Asset manager
  Dans la pratique, charger des textures comme nous l'avons fait à l'étape précédente peut prendre du temps à cause de la latence réseau.
  Il est préférable de masquer la scene tant que toutes les ressources ne sont pas chargée. C'est là qu'entre en jeu [AssetsManager](https://doc.babylonjs.com/typedoc/classes/BABYLON.AssetsManager).
  - Dans le fichier `src/components/scene-display/scene-display.service.ts`:
    - Nous créons une instance d'`AssetsManager` après la création de la scene.
    - à chaque fois que l'on devra charger une texture, on déclarera une tâche de chargement (avec la méthode [AssetsManager.addTextureTask](https://doc.babylonjs.com/typedoc/classes/BABYLON.AssetsManager#addTextureTask)).
    - Une tâche de chargement possède une callback `onSuccess` qu'il faut définir et qui sera executée à la fin du chargement de la ressource (voir [la doc de babylon](https://doc.babylonjs.com/features/featuresDeepDive/importers/assetManager)).
    - Enfin, on lance le chargement asynchrone des resources en appelant [AssetsManager.loadAsync](https://doc.babylonjs.com/typedoc/classes/BABYLON.AssetsManager#loadAsync). Le mot-clé `await` nous assure que les resources sont entièrement chargée avant de démarrer le rendu de la scène. 
  - <u>À vous de jouer</u>: 
    - **_Ajoutez les textureTasks dans `src/services/material.service.ts`._**
    - **_Ajoutez les textureTasks dans `src/services/particles.service.ts`._**

  Lorsque vous aurez fini, vous pourrez passer à l'étape finale de ce tuto : `git checkout .` puis `git checkout step-06`

### Etape 6: la totale!
  Dans cette étape, nous allons charger une scène entière (stockée dans le fichier `src/assets/scene/my-scene.babylon`).
  Cette scene comporte déjà une caméra, des objets, des matériaux et des lumières.
  Cette fois-ci, vous n'aurez rien à écrire. Tout ce que vous aurez à faire sera lire et comprendre le code du fichier `src/components/scene-display/scene-display.service.ts`.
  - Ouvrez le fichier `src/components/scene-display/scene-display.service.ts` et essayez d'identifier:
    - l'endroit où la scene est chargée
    - l'endroit où on rattache la camera de la scene au canvas de notre page
    - l'endroit où la skybox est crée (ce qui l'arrière plan de la scene et la couleur de la lumière environnante)
    - l'endroit où on crée le générateur de particule
    - l'endroit où on lance les animations pré-définis dans la scene
  - Enfin, lancer le serveur et ouvrez la page
  - Pour vous diriger dans cette nouvelle scene, vous devrez utiliser et touche directionnelles de votre clavier et votre souris 
  - Rendez-vous au pied du grand arbre décoré pour avoir une surprise;-)

  

 



