export class HandRenderer {

    constructor() {

        this.canvas = document.getElementById("handCanvas");

        this.ctx = this.canvas.getContext("2d");

        this.resize();

        window.addEventListener(
            "resize",
            () => this.resize()
        );

        // MediaPipe hand connections
        this.connections = [

            [0,1],[1,2],[2,3],[3,4],

            [0,5],[5,6],[6,7],[7,8],

            [5,9],[9,10],[10,11],[11,12],

            [9,13],[13,14],[14,15],[15,16],

            [13,17],[17,18],[18,19],[19,20],

            [0,17]

        ];

    }

    resize() {

        this.canvas.width = window.innerWidth;

        this.canvas.height = window.innerHeight;

    }

    render(video, hands) {

        const ctx = this.ctx;

        ctx.clearRect(

            0,
            0,
            this.canvas.width,
            this.canvas.height

        );

        if (!hands || hands.length === 0) return;

        // Mirror drawing to match mirrored webcam
        ctx.save();

        ctx.translate(

            this.canvas.width,
            0

        );

        ctx.scale(-1,1);

        hands.forEach(hand => {

            // ------------------------
            // Connections
            // ------------------------

            ctx.strokeStyle = "#42ff88";

            ctx.lineWidth = 4;

            this.connections.forEach(([a,b]) => {

                const p1 = hand[a];

                const p2 = hand[b];

                ctx.beginPath();

                ctx.moveTo(

                    p1.x * this.canvas.width,

                    p1.y * this.canvas.height

                );

                ctx.lineTo(

                    p2.x * this.canvas.width,

                    p2.y * this.canvas.height

                );

                ctx.stroke();

            });

            // ------------------------
            // Landmarks
            // ------------------------

            hand.forEach(point => {

                ctx.beginPath();

                ctx.arc(

                    point.x * this.canvas.width,

                    point.y * this.canvas.height,

                    8,

                    0,

                    Math.PI * 2

                );

                ctx.fillStyle = "#42ff88";

                ctx.fill();

            });

        });

        ctx.restore();

    }

}
