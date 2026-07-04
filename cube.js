import * as THREE from "three";

export function createCube() {

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    const material = new THREE.MeshPhysicalMaterial({

        color: 0x2563eb,

        metalness: 0.9,

        roughness: 0.15,

        clearcoat: 1,

        clearcoatRoughness: 0.05,
        emissive: 0x0b3d91,

    emissiveIntensity: 0.2

    });

    const cube = new THREE.Mesh(
        geometry,
        material
    );

    cube.castShadow = true;
    cube.receiveShadow = true;

    cube.position.y = 1;

    cube.userData.defaultColor = 0x3b82f6;
    cube.userData.selectedColor = 0xf97316;

    return cube;

}
