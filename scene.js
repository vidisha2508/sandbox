import * as THREE from "three";

export const scene = new THREE.Scene();

scene.background = new THREE.Color(0x111827);

scene.fog = new THREE.Fog(
    0x111827,
    15,
    40
);