import * as THREE from "three";

export function setupMouse(app) {

    const {

        camera,
        controls,

        cubeManager,
        ghostManager,
        gridManager

    } = app;

    const raycaster = new THREE.Raycaster();

    const mouse = new THREE.Vector2();

    const dragPlane = new THREE.Plane(
        new THREE.Vector3(0, 1, 0),
        -1.5
    );

    const intersection = new THREE.Vector3();

    let dragging = false;

    // ---------------------------------
    // Pointer Down
    // ---------------------------------

    window.addEventListener("pointerdown", (event) => {

        mouse.x =
            (event.clientX / window.innerWidth) * 2 - 1;

        mouse.y =
            -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // Ghost Click

        const ghostHits = raycaster.intersectObjects(
            ghostManager.ghosts
        );

        if (
            ghostHits.length > 0 &&
            cubeManager.selectedCube
        ) {

            cubeManager.moveSelected(
                ghostHits[0].object.userData.targetPosition
            );

            ghostManager.show(
                cubeManager.selectedCube
            );

            return;

        }

        // Cube Click

        const cubeHits = raycaster.intersectObjects(
            cubeManager.cubes
        );

        if (cubeHits.length > 0) {

            cubeManager.select(
                cubeHits[0].object
            );

            ghostManager.show(
                cubeHits[0].object
            );

            dragging = true;

            controls.enabled = false;

            return;

        }

        // Empty Click

        ghostManager.hide();

        if (cubeManager.selectedCube) {

            cubeManager.selectedCube.material.color.setHex(

                cubeManager.selectedCube.userData.defaultColor

            );

        }

        cubeManager.selectedCube = null;

    });

    // ---------------------------------
    // Pointer Move
    // ---------------------------------

    window.addEventListener("pointermove", (event) => {

        mouse.x =
            (event.clientX / window.innerWidth) * 2 - 1;

        mouse.y =
            -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // -------------------------
        // Ghost Hover
        // -------------------------

        const ghostHits = raycaster.intersectObjects(
            ghostManager.ghosts
        );

        if (ghostHits.length > 0) {

            ghostManager.hover(
                ghostHits[0].object
            );

        } else {

            ghostManager.unhover();

        }

        // -------------------------
        // Dragging
        // -------------------------

        if (
            !dragging ||
            !cubeManager.selectedCube
        ) return;

        if (
            raycaster.ray.intersectPlane(
                dragPlane,
                intersection
            )
        ) {

            const snapped = gridManager.snap({

                x: intersection.x,

                y: cubeManager.selectedCube.position.y,

                z: intersection.z

            });

            cubeManager.moveSelected(
                snapped
            );

            ghostManager.show(
                cubeManager.selectedCube
            );

        }

    });

    // ---------------------------------
    // Pointer Up
    // ---------------------------------

    window.addEventListener("pointerup", () => {

        dragging = false;

        controls.enabled = true;

    });

}