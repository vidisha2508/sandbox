import * as THREE from "three";
let rotating=false;
let startAngle=0;
let startRotation=0;
export function setupHandController(app){

const {
camera,
controls,
cubeManager,
handTracker,
ghostManager,
gridManager
}=app;

const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();
const plane=new THREE.Plane(new THREE.Vector3(0,1,0),-1);
const hit=new THREE.Vector3();

let cube=null,drag=false,pinch=false,last=null;
let fx=.5,fy=.5;
let uiPressed=false;
const smooth=.25;

const buttons=[
document.getElementById("addCube"),
document.getElementById("deleteCube"),
document.getElementById("resetScene"),
document.getElementById("modeToggle"),
document.getElementById("startCamera")
].filter(Boolean);

function clearHover(){
buttons.forEach(b=>{
b.style.outline="";
b.style.boxShadow="";
});
}
function getAngle(hand){

const thumb=hand[4];
const index=hand[8];

return Math.atan2(
index.y-thumb.y,
index.x-thumb.x
);

}
function loop(){

requestAnimationFrame(loop);

const hands=handTracker.currentHands;
if(hands.length===2){

const l=hands[0][0];
const r=hands[1][0];

const cx=(l.x+r.x)/2;
const cy=(l.y+r.y)/2;

if(!rotating){

rotating=true;
startAngle=cx;
startRotation=cy;

}

controls.rotateLeft((cx-startAngle)*4);
controls.rotateUp((cy-startRotation)*4);

startAngle=cx;
startRotation=cy;

controls.update();

}
else{

rotating=false;

}
if(!hands.length){

drag=false;
pinch=false;
last=null;
clearHover();

cubeManager.cubes.forEach(c=>{
if(c!==cubeManager.selectedCube){
c.material.color.setHex(c.userData.defaultColor);
c.material.emissive.setHex(0x000000);
c.material.emissiveIntensity=0;
}
});

return;
}

const tip=hands[0][8];

fx+=(tip.x-fx)*smooth;
fy+=(tip.y-fy)*smooth;

pointer.x=1-fx*2;
pointer.y=-(fy*2-1);

const workspace=document.getElementById("workspace");
const w=workspace.getBoundingClientRect();

const fingerX = (1 - fx) * window.innerWidth;
const fingerY = fy * window.innerHeight;

clearHover();

let hoverBtn=null;

for(const b of buttons){

const r=b.getBoundingClientRect();

if(fingerX>=r.left&&fingerX<=r.right&&fingerY>=r.top&&fingerY<=r.bottom){

hoverBtn=b;
b.style.outline="2px solid #3b82f6";
b.style.boxShadow="0 0 12px #3b82f6";
break;

}

}

raycaster.setFromCamera(pointer,camera);

const hitCube=raycaster.intersectObjects(cubeManager.cubes)[0]?.object??null;

cubeManager.cubes.forEach(c=>{

if(c===cubeManager.selectedCube){

c.material.color.setHex(c.userData.selectedColor);
c.material.emissive.setHex(0x000000);
c.material.emissiveIntensity=0;

}

else if(c===hitCube){

c.material.color.setHex(c.userData.defaultColor);
c.material.emissive.setHex(0x3b82f6);
c.material.emissiveIntensity=.6;

}

else{

c.material.color.setHex(c.userData.defaultColor);
c.material.emissive.setHex(0x000000);
c.material.emissiveIntensity=0;

}

});

if(handTracker.currentGesture==="PINCH_START"){
document.title = "PINCH";
if(hoverBtn&&!uiPressed){
document.title = hoverBtn.id;
uiPressed=true;

hoverBtn.dispatchEvent(
    new MouseEvent("click",{
        bubbles:true,
        cancelable:true
    })
);

return;

}


if(hitCube){

cube=hitCube;
drag=true;

cubeManager.select(hitCube);
ghostManager.show(hitCube);

last={
x:hitCube.position.x,
y:hitCube.position.y,
z:hitCube.position.z
};

}

}

if(
hands.length===1 &&
drag &&
cube &&
handTracker.currentGesture==="PINCHING"
){
if(raycaster.ray.intersectPlane(plane,hit)){

const snap=gridManager.snap({
x:hit.x,
y:cube.position.y,
z:hit.z
});

if(!last||snap.x!==last.x||snap.y!==last.y||snap.z!==last.z){

last=snap;
cubeManager.moveSelected(snap);
ghostManager.show(cube);

}

}

}

if(handTracker.currentGesture==="RELEASE"){
uiPressed=false;
drag=false;
cube=null;
last=null;
}

}

loop();

}
