export function animate(app) {

    const {

        renderer,
        scene,
        camera,
        controls,
        fpsElement

    } = app;

    let lastTime = performance.now();

    let frames = 0;

    function loop() {

        requestAnimationFrame(loop);

        controls.update();
        if(app.ghostManager){

    app.ghostManager.update(

        performance.now()

    );

}
        renderer.render(

            scene,

            camera

        );

        frames++;

        const now = performance.now();

        if (now - lastTime >= 1000) {

            fpsElement.textContent = frames;

            frames = 0;

            lastTime = now;

        }

    }

    loop();

    window.addEventListener(

        "resize",

        () => {

            camera.aspect =

                window.innerWidth /

                window.innerHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(

                window.innerWidth,

                window.innerHeight

            );

        }

    );

}
