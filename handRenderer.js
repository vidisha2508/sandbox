import "./style.css";
import "@fontsource/inter";

import { setupScene } from "./setupScene";

import { setupUI } from "./controllers/uiController";

import { setupMouse } from "./controllers/mouseController";

import { animate } from "./animation";
import { setupCamera } from "./controllers/cameraController";
import { setupHandController }from "./controllers/handController";
const app = await setupScene();

setupUI(app);
setupCamera(app);
setupHandController(app);

setupMouse(app);

animate(app);
