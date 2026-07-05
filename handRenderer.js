export class HandRenderer {

    constructor() {

        this.canvas = document.getElementById("handCanvas");

        this.ctx = this.canvas.getContext("2d");

        this.resize();

        window.addEventListener(
            "resize",
            () => this.resize()
        );

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

        const width = this.canvas.width;

        const height = this.canvas.height;

        ctx.clearRect(0, 0, width, height);

        if (!hands || hands.length === 0) return;

        ctx.save();

        ctx.translate(width, 0);

        ctx.scale(-1, 1);

        ctx.strokeStyle = "#42ff88";
        ctx.fillStyle = "#42ff88";
        ctx.lineWidth = 4;

        for (const hand of hands) {

            // ------------------------
            // Connections
            // ------------------------

            for (const [a, b] of this.connections) {

                const p1 = hand[a];

                const p2 = hand[b];

                ctx.beginPath();

                ctx.moveTo(

                    p1.x * width,

                    p1.y * height

                );

                ctx.lineTo(

                    p2.x * width,

                    p2.y * height

                );

                ctx.stroke();

            }

            // ------------------------
            // Landmarks
            // ------------------------

            for (const point of hand) {

                ctx.beginPath();

                ctx.arc(

                    point.x * width,

                    point.y * height,

                    8,

                    0,

                    Math.PI * 2

                );

                ctx.fill();

            }

        }

        ctx.restore();

    }

}
