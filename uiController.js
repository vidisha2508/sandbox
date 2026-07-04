export function setupUI(app) {

    const {

        cubeManager,
        ghostManager,
        objectCount

    } = app;

    const addBtn = document.getElementById("addCube");
    const deleteBtn = document.getElementById("deleteCube");
    const resetBtn = document.getElementById("resetScene");

    // NEW ID
    const modeBtn = document.getElementById("modeToggle");
    const modeText = document.getElementById("modeText");

    function updateCounter() {

        objectCount.textContent = cubeManager.cubes.length;

    }

    updateCounter();

    // -------------------------
    // Add Cube
    // -------------------------

    addBtn.addEventListener("click", () => {

        cubeManager.addCube();

        updateCounter();

    });

    // -------------------------
    // Delete
    // -------------------------

 deleteBtn.addEventListener("mousedown", (e) => {

    e.preventDefault();

    cubeManager.deleteSelected();

    ghostManager.hide();

    updateCounter();

});

    // -------------------------
    // Reset
    // -------------------------

    resetBtn.addEventListener("click", () => {

        cubeManager.reset();

        ghostManager.hide();

        cubeManager.addCube();

        updateCounter();

    });

    // -------------------------
    // Mode Toggle
    // -------------------------

    modeBtn.addEventListener("click", () => {

    if (cubeManager.mode === "individual") {

        cubeManager.setMode("group");

        modeBtn.textContent = "Group";
        modeText.textContent = "Group";

        ghostManager.hide();

        cubeManager.cubes.forEach(cube => {

            cube.material.color.setHex(
                cube.userData.selectedColor
            );

        });

    }

    else {

        cubeManager.setMode("individual");

        modeBtn.textContent = "Individual";
        modeText.textContent = "Individual";

        cubeManager.cubes.forEach(cube => {

            cube.material.color.setHex(
                cube.userData.defaultColor
            );

        });

        ghostManager.hide();

        cubeManager.selectedCube = null;

    }

    // TEMP DEBUG
    document.title = cubeManager.mode;

});

}
