import * as THREE from "three";

export function setupMouse(app) {

    const {

    camera,
    renderer,
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

    // Ignore UI clicks
    const toolbar = document.getElementById("toolbar");

    if (toolbar && toolbar.contains(event.target)) {

        return;

    }

    const statusPanel = document.getElementById("statusPanel");

    if (statusPanel && statusPanel.contains(event.target)) {

        return;

    }

    const rect =
        renderer.domElement.getBoundingClientRect();

    mouse.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;

    mouse.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

        // ---------------------------------
        // Ghost Click
        // ---------------------------------

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

        // ---------------------------------
        // Cube Click
        // ---------------------------------

        const cubeHits = raycaster.intersectObjects(
            cubeManager.cubes
        );

        if (cubeHits.length > 0) {

            if (cubeManager.mode === "group") {

                cubeManager.select(cubeHits[0].object);

                cubeManager.cubes.forEach(cube => {

                    cube.material.color.setHex(
                        cube.userData.selectedColor
                    );

                });

            }

            else {

                cubeManager.select(
                    cubeHits[0].object
                );

                ghostManager.show(
                    cubeHits[0].object
                );

            }

            dragging = true;

            controls.enabled = false;

            return;

        }

        // ---------------------------------
        // Empty Click
        // ---------------------------------

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
    window.addEventListener("pointerup", () => {

    dragging = false;

    controls.enabled = true;

});
    window.addEventListener("pointermove", (event) => {

        const rect =
    renderer.domElement.getBoundingClientRect();

mouse.x =
    ((event.clientX - rect.left) / rect.width) * 2 - 1;

mouse.y =
    -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // ---------------------------------
        // Ghost Hover
        // ---------------------------------

        const ghostHits = raycaster.intersectObjects(
            ghostManager.ghosts
        );

        if (ghostHits.length > 0) {

            ghostManager.hover(
                ghostHits[0].object
            );

        }

        else {

            ghostManager.unhover();

        }

        // ---------------------------------
        // Dragging
        // ---------------------------------

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

            if (cubeManager.mode === "individual") {

                cubeManager.moveSelected(
                    snapped
                );

                ghostManager.show(
                    cubeManager.selectedCube
                );

            }

            else {

                const dx =
                    snapped.x - cubeManager.selectedCube.position.x;

                const dz =
                    snapped.z - cubeManager.selectedCube.position.z;

                if (dx !== 0 || dz !== 0) {

                    cubeManager.moveGroup(
                        dx,
                        dz
                    );

                }

            }

        }

    });

    // ---------------------------------
    // Pointer Upok
    // ---------------------------------

    window.addEventListener("pointerup", () => {

        dragging = false;

        controls.enabled = true;

    });

}
