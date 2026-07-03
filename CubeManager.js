import { createCube } from "../objects/cube.js";

export class CubeManager {

    constructor(scene, gridManager) {

        this.scene = scene;

        this.grid = gridManager;

        this.cubes = [];

        this.selectedCube = null;

        // -------------------------
        // Mode
        // -------------------------

        this.mode = "individual";

    }

    // -------------------------
    // Mode
    // -------------------------

    setMode(mode) {

        this.mode = mode;

    }

    addCube() {

        const GRID = this.grid.gridSize;

        let x = 0;

        while (

            this.grid.isOccupied({

                x: x * GRID,

                y: GRID,

                z: 0

            })

        ) {

            x++;

        }

        const cube = createCube();

        cube.position.set(

            x * GRID,

            GRID,

            0

        );

        this.scene.add(cube);

        this.cubes.push(cube);

        this.grid.occupy({

            x: cube.position.x,

            y: cube.position.y,

            z: cube.position.z

        }, cube);

        return cube;

    }

    select(cube) {

        if (this.selectedCube) {

            this.selectedCube.material.color.setHex(

                this.selectedCube.userData.defaultColor

            );

        }

        this.selectedCube = cube;

        cube.material.color.setHex(

            cube.userData.selectedColor

        );

    }

    moveSelected(targetPosition) {

        if (!this.selectedCube) return false;

        const moved = this.grid.moveCube(

            this.selectedCube,

            targetPosition

        );

        return moved;

    }
    moveGroup(dx, dz) {

    this.cubes.forEach(cube => {

        this.grid.release({

            x: cube.position.x,
            y: cube.position.y,
            z: cube.position.z

        });

    });

    this.cubes.forEach(cube => {

        cube.position.x += dx;
        cube.position.z += dz;

    });

    this.cubes.forEach(cube => {

        this.grid.occupy({

            x: cube.position.x,
            y: cube.position.y,
            z: cube.position.z

        }, cube);

    });

}

    deleteSelected() {

    if (this.mode === "group") {

        this.cubes.forEach(cube => {

            this.grid.release({

                x: cube.position.x,
                y: cube.position.y,
                z: cube.position.z

            });

            this.scene.remove(cube);

        });

        this.cubes = [];

        this.selectedCube = null;

        return;

    }

    if (!this.selectedCube) return;

    this.grid.release({

        x: this.selectedCube.position.x,
        y: this.selectedCube.position.y,
        z: this.selectedCube.position.z

    });

    this.scene.remove(this.selectedCube);

    this.cubes = this.cubes.filter(

        cube => cube !== this.selectedCube

    );

    this.selectedCube = null;

}

    reset() {

        this.cubes.forEach(cube => {

            this.grid.release({

                x: cube.position.x,

                y: cube.position.y,

                z: cube.position.z

            });

            this.scene.remove(cube);

        });

        this.cubes = [];

        this.selectedCube = null;

    }

}
