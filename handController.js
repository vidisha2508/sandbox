import * as THREE from "three";

export function setupHandController(app){

const{
camera,
handTracker,
dragController,
orbitController
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
let uiPressed=false;

function clearHover(){
buttons.forEach(b=>{
b.style.outline="";
b.style.boxShadow="";
});
}

function loop(){

requestAnimationFrame(loop);

const hands=handTracker.currentHands;

if(!hands.length){

clearHover();
uiPressed=false;
dragController.update(pointer,"RELEASE");
return;

}

const tip=hands[0][8];

fx+=(tip.x-fx)*0.25;
fy+=(tip.y-fy)*0.25;

pointer.x=1-fx*2;
pointer.y=-(fy*2-1);

orbitController.update(
hands[0],
handTracker.currentGesture
);

const x=(1-fx)*window.innerWidth;
const y=fy*window.innerHeight;

clearHover();

let hoverBtn=null;

for(const b of buttons){

const r=b.getBoundingClientRect();

if(x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom){

hoverBtn=b;
b.style.outline="2px solid #3b82f6";
b.style.boxShadow="0 0 12px #3b82f6";
break;

}

}

const gesture=handTracker.currentGesture;

if(gesture==="PINCH_START"){

if(hoverBtn&&!uiPressed){

uiPressed=true;
hoverBtn.click();

}else{

dragController.update(pointer,"PINCH_START");

}

}

else if(gesture==="PINCHING"){

dragController.update(pointer,"PINCHING");

}

else if(gesture==="RELEASE"){

uiPressed=false;
dragController.update(pointer,"RELEASE");

}

}

loop();

}
