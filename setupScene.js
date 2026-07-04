import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { scene } from "./scene/scene";
import { camera } from "./scene/camera";
import { renderer } from "./scene/renderer";
import { addLights } from "./scene/lights";

import { CubeManager } from "./managers/CubeManager";
import { GridManager } from "./managers/GridManager";
import { GhostManager } from "./managers/GhostManager";

import { CameraManager } from "./camera/cameraManager";
import { HandTracker } from "./camera/handTracker";
import { HandRenderer } from "./camera/handRenderer";
import { GestureDetector } from "./camera/gestures";

export async function setupScene() {

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

            color: 0xd6dbe4,

            roughness: 1,

            transparent: true,

            opacity: 0.30

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

        0x94a3b8

    );

    grid.material.transparent = true;
    grid.material.opacity = 0.35;

    scene.add(grid);

    // -------------------------
    // Orbit Controls
    // -------------------------

    const controls = new OrbitControls(

        camera,

        renderer.domElement

    );

    controls.enableDamping = true;

    controls.target.set(0, 1.5, 0);

    controls.update();

    // -------------------------
    // Camera + Hand Tracking
    // -------------------------

    const cameraManager = new CameraManager();

    const handRenderer = new HandRenderer();

    const gestureDetector = new GestureDetector();

    const handTracker = new HandTracker(

        handRenderer,

        gestureDetector

    );

    // -------------------------
    // Renderer
    // -------------------------

    const sceneContainer =

        document.getElementById("scene");

    sceneContainer.appendChild(

        renderer.domElement

    );

    renderer.setSize(

        sceneContainer.clientWidth,

        sceneContainer.clientHeight

    );

    // -------------------------
    // Resize
    // -------------------------

    window.addEventListener("resize", () => {

        renderer.setSize(

            sceneContainer.clientWidth,

            sceneContainer.clientHeight

        );

        camera.aspect =

            sceneContainer.clientWidth /

            sceneContainer.clientHeight;

        camera.updateProjectionMatrix();

    });

    // -------------------------
    // UI References
    // -------------------------

    const fpsElement =

        document.getElementById("fps");

    const objectCount =

        document.getElementById("objectCount");

    // -------------------------
    // Return
    // -------------------------

    return {

        scene,

        camera,

        renderer,

        controls,

        cubeManager,

        gridManager,

        ghostManager,

        fpsElement,

        objectCount,

        cameraManager,

        handRenderer,

        gestureDetector,

        handTracker

    };

}
