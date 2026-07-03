export function setupUI(app) {

    const {

        cubeManager,

        ghostManager,

        objectCount

    } = app;

    // -------------------------
    // Buttons
    // -------------------------

    const addBtn = document.getElementById("addCube");

    const deleteBtn = document.getElementById("deleteCube");
    console.log(deleteBtn);
    const resetBtn = document.getElementById("resetScene");

    const modeBtn = document.getElementById("modeBtn");

    // -------------------------
    // Counter
    // -------------------------

    function updateCounter() {

        objectCount.textContent =

            cubeManager.cubes.length;

    }

    updateCounter();

    // -------------------------
    // Add Cube
    // -------------------------

    addBtn.addEventListener(

        "click",

        () => {

            cubeManager.addCube();

            updateCounter();

        }

    );

    // -------------------------
    // Delete Cube
    // -------------------------

    deleteBtn.addEventListener("click", () => {

    console.log("DELETE BUTTON CLICKED");

    cubeManager.deleteSelected();

    ghostManager.hide();

    updateCounter();

});

    // -------------------------
    // Reset Scene
    // -------------------------

    resetBtn.addEventListener(

        "click",

        () => {

            cubeManager.reset();

            ghostManager.hide();

            cubeManager.addCube();

            updateCounter();

        }

    );

    // -------------------------
    // Toggle Mode
    // -------------------------

    modeBtn.addEventListener(

        "click",

        () => {

            if (cubeManager.mode === "individual") {

    cubeManager.setMode("group");

    modeBtn.textContent = "Individual Mode";

    ghostManager.hide();

    cubeManager.cubes.forEach(cube => {

        cube.material.color.setHex(
            cube.userData.selectedColor
        );

    });

} else {

    cubeManager.setMode("individual");

    modeBtn.textContent = "Group Mode";

    cubeManager.cubes.forEach(cube => {

        cube.material.color.setHex(
            cube.userData.defaultColor
        );

    });

    cubeManager.selectedCube = null;

}

        }

    );

}
