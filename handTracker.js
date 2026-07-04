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

    }

    setVideo(video) {

        this.video = video;

    }

    async init() {

        const vision =
            await FilesetResolver.forVisionTasks(

                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"

            );

        this.landmarker =
            await HandLandmarker.createFromOptions(

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

    const detect = () => {

        const result =
            this.landmarker.detectForVideo(

                this.video,

                performance.now()

            );

        this.currentHands =
            result.landmarks;

        this.renderer.render(

            this.video,

            this.currentHands

        );

        if (this.currentHands.length > 0) {

            this.currentGesture =

                this.gestureDetector.update(

                    this.currentHands[0]

                );

        }

        else {

            this.currentGesture =

                this.gestureDetector.update(null);

        }

        // UPDATE UI
        gestureStatus.textContent =
            this.currentGesture;

        requestAnimationFrame(detect);

    };

    detect();

}

}
