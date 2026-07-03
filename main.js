import "./style.css";
import "@fontsource/inter";

import { setupScene } from "./setupScene";

import { setupUI } from "./controllers/uiController";

import { setupMouse } from "./controllers/mouseController";

import { animate } from "./animation";

const app = setupScene();

setupUI(app);

setupMouse(app);

animate(app);