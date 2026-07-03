import * as THREE from "three";

export const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;

document
    .getElementById("scene")
    .appendChild(renderer.domElement);