# Sandbox

Sandbox is a vision-based three-dimensional interaction environment that enables users to manipulate virtual objects using natural hand gestures through a conventional webcam. The project explores Human–Computer Interaction (HCI) by replacing traditional mouse-based interaction with a computer vision pipeline built on MediaPipe and a real-time rendering engine powered by Three.js.

Unlike conventional desktop editors, Sandbox introduces a touchless workflow in which object manipulation, camera navigation and interface interaction are performed entirely through gesture recognition.

---

## Motivation

Most desktop modelling software depends on keyboard and mouse input despite significant advances in computer vision. Sandbox investigates whether modern hand tracking can provide a practical interaction layer for everyday 3D environments without requiring specialized hardware such as VR headsets or depth cameras.

The project was developed to study the intersection of

- Computer Vision
- Human–Computer Interaction
- Real-Time Graphics
- Spatial Computing

---

## Features

- Real-time hand tracking using MediaPipe Tasks Vision
- Gesture-based object manipulation
- Gesture-controlled camera orbit
- Dynamic grid-based object placement
- Collision-aware grid occupancy management
- Ghost object visualization during placement
- Individual and group manipulation modes
- Modular interaction architecture
- Browser-based execution with no external hardware

---

## System Architecture

```
                 Webcam
                    │
                    ▼
          MediaPipe Hand Tracking
                    │
                    ▼
           Gesture Recognition Layer
                    │
                    ▼
          Interaction Controller
         ┌──────────┴──────────┐
         ▼                     ▼
   User Interface        Scene Interaction
         │                     │
         └──────────┬──────────┘
                    ▼
             Three.js Renderer
                    │
                    ▼
              Interactive Scene
```

---

## Interaction Pipeline

Each rendered frame follows the execution pipeline below.

1. Webcam frames are captured.
2. MediaPipe extracts twenty-one hand landmarks.
3. The Gesture Detector classifies the current interaction state.
4. The Hand Controller converts gestures into application commands.
5. Scene controllers update object transformations.
6. Three.js renders the updated scene.

---

## Gesture Vocabulary

| Gesture | Operation |
|----------|-----------|
| Index Cursor | Interface Navigation |
| Hover | UI Selection |
| Pinch | Object Selection |
| Pinch + Motion | Object Translation |
| Two-Finger Gesture | Camera Orbit |
| Release | Object Placement |

---

## Project Structure

```
sandbox/
│
├── backend/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── camera/
│   │   │   ├── cameraManager.js
│   │   │   ├── gestures.js
│   │   │   ├── handRenderer.js
│   │   │   └── handTracker.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── cameraController.js
│   │   │   ├── dragController.js
│   │   │   ├── handController.js
│   │   │   ├── mouseController.js
│   │   │   ├── orbitController.js
│   │   │   └── uiController.js
│   │   │
│   │   ├── managers/
│   │   │   ├── cameraManager.js
│   │   │   ├── CubeManager.js
│   │   │   ├── GhostManager.js
│   │   │   ├── GridManager.js
│   │   │   └── GroupGhostManager.js
│   │   │
│   │   ├── objects/
│   │   │   ├── cube.js
│   │   │   └── ghostCube.js
│   │   │
│   │   ├── scene/
│   │   │   ├── camera.js
│   │   │   ├── lights.js
│   │   │   ├── renderer.js
│   │   │   └── scene.js
│   │   │
│   │   ├── animation.js
│   │   ├── main.js
│   │   ├── setupScene.js
│   │   └── style.css
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
├── package.json
└── package-lock.json
```

---

## Core Components

### CubeManager

Responsible for scene object lifecycle.

- Object creation
- Object deletion
- Selection management
- Translation
- Group manipulation
- Scene reset

---

### GridManager

Maintains a discrete spatial occupancy model.

Responsibilities include

- Position quantization
- Grid snapping
- Occupancy tracking
- Collision prevention

---

### GhostManager

Provides predictive visual feedback during object manipulation through a temporary transparent proxy.

---

### HandTracker

Processes MediaPipe landmark output and exposes normalized hand coordinates for higher-level interaction modules.

---

### GestureDetector

Implements the project's gesture recognition logic using landmark relationships and temporal filtering.

Recognized interaction states include

- Open
- Pinch Start
- Pinching
- Release
- Two-Finger Orbit

---

### HandController

Acts as the interaction middleware between gesture recognition and scene manipulation.

It coordinates

- User interface interaction
- Object manipulation
- Camera control

---

## Technology Stack

Rendering

- Three.js
- WebGL

Computer Vision

- MediaPipe Tasks Vision

Frontend

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vite

---

## Installation

Clone the repository

```bash
git clone https://github.com/<username>/sandbox.git
```

Navigate to the frontend

```bash
cd sandbox/frontend
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

---

## Future Work

Future iterations will investigate

- Continuous object rotation
- Gesture-based scaling
- Primitive generation beyond cubes
- Scene persistence
- Undo/Redo architecture
- Physics simulation
- Multi-user collaboration
- Voice-assisted interaction
- AI-assisted scene generation
for (v2.0)
---

## License

MIT License
## Developed by
### Vidisha Jain
