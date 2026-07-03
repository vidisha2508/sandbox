import * as THREE from "three";

export class GroupGhostManager {

    constructor(scene, gridManager) {

        this.scene = scene;
        this.grid = gridManager;

        this.ghost = this.createGhost();
        this.scene.add(this.ghost);

        this.ghost.visible = false;

        this.selectedCubes = [];

    }

    createGhost() {

        const geometry = new THREE.BoxGeometry(1, 1, 1);

        const material = new THREE.MeshPhysicalMaterial({

            color: 0x38bdf8,
            transparent: true,
            opacity: 0.25,
            roughness: 0.2,
            metalness: 0.1,
            depthWrite: false,
            emissive: 0x38bdf8,
            emissiveIntensity: 0.15

        });

        const mesh = new THREE.Mesh(geometry, material);

        mesh.scale.set(1, 1, 1);

        return mesh;

    }

    computeBounds(cubes) {

        if (!cubes.length) return null;

        let minX = Infinity, minY = Infinity, minZ = Infinity;
        let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

        const s = this.grid.gridSize;

        for (const c of cubes) {

            minX = Math.min(minX, c.position.x);
            minY = Math.min(minY, c.position.y);
            minZ = Math.min(minZ, c.position.z);

            maxX = Math.max(maxX, c.position.x);
            maxY = Math.max(maxY, c.position.y);
            maxZ = Math.max(maxZ, c.position.z);

        }

        return {
            minX, minY, minZ,
            maxX, maxY, maxZ,
            size: s
        };

    }

    show(cubes) {

        this.selectedCubes = cubes;

        if (!cubes || cubes.length === 0) {

            this.ghost.visible = false;
            return;

        }

        const b = this.computeBounds(cubes);

        const s = this.grid.gridSize;

        const width  = (b.maxX - b.minX) + s;
        const height = (b.maxY - b.minY) + s;
        const depth  = (b.maxZ - b.minZ) + s;

        const centerX = (b.minX + b.maxX) / 2;
        const centerY = (b.minY + b.maxY) / 2;
        const centerZ = (b.minZ + b.maxZ) / 2;

        this.ghost.position.set(centerX, centerY, centerZ);

        this.ghost.scale.set(
            width / s,
            height / s,
            depth / s
        );

        this.ghost.visible = true;

    }

    hide() {

        this.ghost.visible = false;

        this.selectedCubes = [];

    }

    hover() {
        this.ghost.material.opacity = 0.4;
        this.ghost.material.emissiveIntensity = 0.35;
    }

    unhover() {
        this.ghost.material.opacity = 0.25;
        this.ghost.material.emissiveIntensity = 0.15;
    }

}
