import * as THREE from "three";

export const renderer = new THREE.WebGLRenderer({

    antialias: true,
    alpha: true

});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(

    window.innerWidth,
    window.innerHeight

);

renderer.setClearColor(0x000000, 0);

renderer.shadowMap.enabled = true;

renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.style.zIndex = "1";
