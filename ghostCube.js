import * as THREE from "three";

export function createGhostCube() {

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    const material = new THREE.MeshPhysicalMaterial({

    color: 0x38bdf8,

    emissive: 0x38bdf8,

    emissiveIntensity: 0.15,

    transparent: true,

    opacity: 0.25,

    roughness: 0.2,

    metalness: 0.15,

    clearcoat: 1,

    depthWrite: false

});
    const cube = new THREE.Mesh(
        geometry,
        material
    );

    cube.visible = false;
    cube.scale.set(0.75, 0.75, 0.75);
    cube.userData.isGhost = true;
    cube.userData.targetPosition = null;
    cube.userData.defaultOpacity = 0.25;

cube.userData.hoverOpacity = 0.65;

cube.userData.defaultScale = 0.75;

cube.userData.hoverScale = 1;

cube.userData.defaultEmissive = 0.15;

cube.userData.hoverEmissive = 0.7;
    return cube;

}
