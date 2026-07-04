export function setupCamera(app) {

    const {

        cameraManager,
        handTracker

    } = app;

    const button =
        document.getElementById("startCamera");

    const cameraStatus =
        document.getElementById("cameraStatus");

    const videoEl =
        document.getElementById("cameraFeed");

    let running = false;

    let initialized = false;

    button.addEventListener("click", async () => {

        if (!running) {

            button.textContent = "Starting...";
            cameraStatus.textContent = "Starting";

            // -------------------------
            // Start Webcam
            // -------------------------

            const video =
                await cameraManager.start();

            // Give tracker access to video

            handTracker.setVideo(video);

            // Initialize MediaPipe only once

            if (!initialized) {

                await handTracker.init();

                initialized = true;

            }

            // Show webcam

            videoEl.srcObject =
                video.srcObject;

            videoEl.style.display = "block";

            running = true;

            button.textContent = "Stop Camera";

            cameraStatus.textContent = "Running";

        }

        else {

            // -------------------------
            // Stop Webcam
            // -------------------------

            cameraManager.stop();

            videoEl.srcObject = null;

            videoEl.style.display = "none";

            running = false;

            button.textContent = "Start Camera";

            cameraStatus.textContent = "Off";

        }

    });

}
