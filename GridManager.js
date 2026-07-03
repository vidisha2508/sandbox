export class GridManager {

    constructor(gridSize = 1.5) {

        this.gridSize = gridSize;

        this.occupied = new Map();

    }

    key(x, y, z) {

        return `${x},${y},${z}`;

    }

    snap(position) {

        return {

            x: Math.round(position.x / this.gridSize) * this.gridSize,

            y: Math.round(position.y / this.gridSize) * this.gridSize,

            z: Math.round(position.z / this.gridSize) * this.gridSize

        };

    }

    isOccupied(position) {

        return this.occupied.has(

            this.key(

                position.x,

                position.y,

                position.z

            )

        );

    }

    occupy(position, cube) {

        this.occupied.set(

            this.key(

                position.x,

                position.y,

                position.z

            ),

            cube

        );

    }

    release(position) {

        this.occupied.delete(

            this.key(

                position.x,

                position.y,

                position.z

            )

        );

    }

    moveCube(cube, targetPosition) {

        const snapped = this.snap(targetPosition);

        const current = {

            x: cube.position.x,

            y: cube.position.y,

            z: cube.position.z

        };


        if (this.isOccupied(snapped)) {

            return false;

        }

        this.release(current);

        cube.position.set(

            snapped.x,

            snapped.y,

            snapped.z

        );

        this.occupy(snapped, cube);

        return true;

    }

}