export class CameraManager {

    constructor() {

        this.video = document.createElement("video");

        this.video.autoplay = true;
        this.video.playsInline = true;
        this.video.muted = true;

    }

    async start() {

        const stream = await navigator.mediaDevices.getUserMedia({

            video: true,
            audio: false

        });

        this.video.srcObject = stream;

        await this.video.play();

        return this.video;

    }

    stop() {

        const stream = this.video.srcObject;

        if (stream) {

            stream.getTracks().forEach(track => track.stop());

        }

        this.video.srcObject = null;

    }
}
