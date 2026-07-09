import * as THREE from "three";

export function setupHandController(app){

const{
camera,
handTracker,
dragController,
orbitController,
ui
}=app;

const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();

const buttons=[
document.getElementById("addCube"),
document.getElementById("deleteCube"),
document.getElementById("resetScene"),
document.getElementById("modeToggle"),
document.getElementById("startCamera")
].filter(Boolean);

let fx=.5,fy=.5;

// Button interaction
let hoverBtn=null;
let hoverStart=0;
let buttonTriggered=false;

function clearHover(){
buttons.forEach(b=>{
b.style.outline="";
b.style.boxShadow="";
});
}

function loop(){

requestAnimationFrame(loop);

const hands=handTracker.currentHands;
const gesture=handTracker.currentGesture;

if(!hands.length){

clearHover();

hoverBtn=null;
hoverStart=0;
buttonTriggered=false;

dragController.update(pointer,"RELEASE");

return;

}

const tip=hands[0][8];

fx+=(tip.x-fx)*0.25;
fy+=(tip.y-fy)*0.25;

pointer.x=1-fx*2;
pointer.y=-(fy*2-1);

// Orbit Controller
orbitController.update(
hands[0],
gesture
);

// Finger position
const x=(1-fx)*window.innerWidth;
const y=fy*window.innerHeight;

// Hover detection
clearHover();

hoverBtn=null;

for(const b of buttons){

const r=b.getBoundingClientRect();

if(
x>=r.left &&
x<=r.right &&
y>=r.top &&
y<=r.bottom
){

hoverBtn=b;

b.style.outline="2px solid #3b82f6";
b.style.boxShadow="0 0 12px #3b82f6";

break;

}

}

// -------- Button Click --------

if(hoverBtn){

if(hoverStart===0){

hoverStart=performance.now();

}

if(
!buttonTriggered &&
performance.now()-hoverStart>250
){

buttonTriggered=true;

switch(hoverBtn.id){

case "addCube":
ui.add();
break;

case "deleteCube":
ui.delete();
break;

case "resetScene":
ui.reset();
break;

case "modeToggle":
ui.mode();
break;

case "startCamera":
hoverBtn.click();
break;

}

}

}else{

hoverStart=0;
buttonTriggered=false;

}

// -------- Cube Drag --------

if(
gesture==="PINCH_START" ||
gesture==="PINCHING" ||
gesture==="RELEASE"
){

dragController.update(pointer,gesture);

}

}

loop();

}
