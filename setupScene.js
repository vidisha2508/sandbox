import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { scene } from "./scene/scene";
import { camera } from "./scene/camera";
import { renderer } from "./scene/renderer";
import { addLights } from "./scene/lights";

import { CubeManager } from "./managers/CubeManager";
import { GridManager } from "./managers/GridManager";
import { GhostManager } from "./managers/GhostManager";

export function setupScene() {

    // -------------------------
    // Lights
    // -------------------------

    addLights(scene);

    // -------------------------
    // Managers
    // -------------------------

    const gridManager = new GridManager(1.5);

    const cubeManager = new CubeManager(
        scene,
        gridManager
    );

    const ghostManager = new GhostManager(
        scene,
        gridManager
    );

    // -------------------------
    // First Cube
    // -------------------------

    cubeManager.addCube();

    // -------------------------
    // Floor
    // -------------------------

    const floor = new THREE.Mesh(

        new THREE.PlaneGeometry(40, 40),

        new THREE.MeshStandardMaterial({

            color: 0x111827,

            roughness: 1

        })

    );

    floor.rotation.x = -Math.PI / 2;

    floor.receiveShadow = true;

    scene.add(floor);

    // -------------------------
    // Grid
    // -------------------------

    const grid = new THREE.GridHelper(

        40,

        40,

        0x3b82f6,

        0x334155

    );

    scene.add(grid);

    // -------------------------
    // Orbit Controls
    // -------------------------

    const controls = new OrbitControls(

        camera,

        renderer.domElement

    );

    controls.enableDamping = true;

    // -------------------------
    // UI References
    // -------------------------

    const fpsElement = document.getElementById("fps");

    const objectCount = document.getElementById("objectCount");

    return {

        scene,

        camera,

        renderer,

        controls,

        cubeManager,

        gridManager,

        ghostManager,

        fpsElement,

        objectCount

    };

}
