import {

    HandLandmarker,
    FilesetResolver

} from "@mediapipe/tasks-vision";

export class HandTracker {

    constructor(renderer, gestureDetector) {

        this.video = null;

        this.landmarker = null;

        this.renderer = renderer;

        this.gestureDetector = gestureDetector;

        this.currentGesture = "NONE";

        this.currentHands = [];

        // -------------------------
        // FPS Limiter
        // -------------------------

        this.lastDetection = 0;

        this.detectionInterval = 1000 / 30;

    }

    setVideo(video) {

        this.video = video;

    }

    async init() {

        const vision = await FilesetResolver.forVisionTasks(

            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"

        );

        this.landmarker = await HandLandmarker.createFromOptions(

            vision,

            {

                baseOptions: {

                    modelAssetPath:

                        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"

                },

                runningMode: "VIDEO",

                numHands: 2

            }

        );

        this.loop();

    }

    loop() {

        if (!this.video || !this.landmarker) return;

        const gestureStatus =

            document.getElementById("gestureStatus");

        const detect = (time) => {

            requestAnimationFrame(detect);

            // ---------------------------------
            // Limit MediaPipe to ~30 FPS
            // ---------------------------------

            if (

                time - this.lastDetection <

                this.detectionInterval

            ) {

                return;

            }

            this.lastDetection = time;

            // ---------------------------------
            // Detect Hands
            // ---------------------------------

            const result =

                this.landmarker.detectForVideo(

                    this.video,

                    time

                );

            this.currentHands =

                result.landmarks;

            // ---------------------------------
            // Skeleton
            // ---------------------------------

            this.renderer.render(

                this.video,

                this.currentHands

            );

            // ---------------------------------
            // Gesture
            // ---------------------------------

            if (

                this.currentHands.length > 0

            ) {

                this.currentGesture =

                    this.gestureDetector.update(

                        this.currentHands[0]

                    );

            }

            else {

                this.currentGesture =

                    this.gestureDetector.update(

                        null

                    );

            }

            // ---------------------------------
            // UI
            // ---------------------------------

            gestureStatus.textContent =

                this.currentGesture;

        };

        requestAnimationFrame(detect);

    }

}
