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

    const resetBtn = document.getElementById("resetScene");

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

    deleteBtn.addEventListener(

        "click",

        () => {

            cubeManager.deleteSelected();

            ghostManager.hide();

            updateCounter();

        }

    );

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

}