import { createGhostCube } from "../objects/ghostCube.js";

export class GhostManager {

    constructor(scene, gridManager) {

        this.scene = scene;
        this.grid = gridManager;

        this.ghosts = [];

        this.hoveredGhost = null;

        for (let i = 0; i < 6; i++) {

            const ghost = createGhostCube();

            this.scene.add(ghost);

            this.ghosts.push(ghost);

        }

    }

    show(cube) {

        const s = this.grid.gridSize;

        const positions = [

            { x: cube.position.x + s, y: cube.position.y, z: cube.position.z },

            { x: cube.position.x - s, y: cube.position.y, z: cube.position.z },

            { x: cube.position.x, y: cube.position.y + s, z: cube.position.z },

            { x: cube.position.x, y: cube.position.y - s, z: cube.position.z },

            { x: cube.position.x, y: cube.position.y, z: cube.position.z + s },

            { x: cube.position.x, y: cube.position.y, z: cube.position.z - s }

        ];

        for (let i = 0; i < 6; i++) {

            const ghost = this.ghosts[i];

            const pos = positions[i];

            if (this.grid.isOccupied(pos)) {

                ghost.visible = false;

                continue;

            }

            ghost.position.set(

                pos.x,

                pos.y,

                pos.z

            );

            ghost.scale.set(0.75,0.75,0.75);

            ghost.material.opacity =
                ghost.userData.defaultOpacity;

            ghost.userData.targetPosition = pos;

            ghost.visible = true;

        }

    }

    hover(ghost){

    if(this.hoveredGhost===ghost) return;

    this.unhover();

    this.hoveredGhost = ghost;

    const s = ghost.userData.hoverScale;

    ghost.scale.set(s,s,s);

    ghost.material.opacity =

        ghost.userData.hoverOpacity;

    ghost.material.emissiveIntensity =

        ghost.userData.hoverEmissive;

}

    unhover(){

    if(!this.hoveredGhost) return;

    const ghost = this.hoveredGhost;

    const s = ghost.userData.defaultScale;

    ghost.scale.set(s,s,s);

    ghost.material.opacity =

        ghost.userData.defaultOpacity;

    ghost.material.emissiveIntensity =

        ghost.userData.defaultEmissive;

    this.hoveredGhost = null;

}

    hide() {

        this.unhover();

        this.ghosts.forEach(ghost => {

            ghost.visible = false;

        });

    }
    update(time){

    if(!this.hoveredGhost) return;

    const pulse =

        1 +

        Math.sin(time * 0.008) * 0.05;

    const scale =

        this.hoveredGhost.userData.hoverScale *

        pulse;

    this.hoveredGhost.scale.set(

        scale,

        scale,

        scale

    );

}

}