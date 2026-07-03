import * as THREE from "three";

export function addLights(scene){

    const ambient = new THREE.AmbientLight(
        0xffffff,
        1
    );

    scene.add(ambient);

    const hemi = new THREE.HemisphereLight(
        0xffffff,
        0x444444,
        1.5
    );

    scene.add(hemi);

    const sun = new THREE.DirectionalLight(
        0xffffff,
        3
    );

    sun.position.set(5,8,5);

    sun.castShadow = true;

    scene.add(sun);

}