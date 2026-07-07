export class OrbitController{

constructor(controls){

this.controls=controls;

this.lastX=null;
this.lastY=null;
this.smoothX=0;
this.smoothY=0;
this.speed=5;

}

update(hand,gesture){

if(gesture!=="ROTATE"){

this.lastX=null;
this.lastY=null;
return;

}

const wrist=hand[0];

if(this.lastX===null){

this.lastX=wrist.x;
this.lastY=wrist.y;
return;

}

this.smoothX += ((wrist.x - this.lastX) - this.smoothX) * 0.2;
this.smoothY += ((wrist.y - this.lastY) - this.smoothY) * 0.2;

this.controls.rotateLeft(this.smoothX * this.speed);
this.controls.rotateUp(this.smoothY * this.speed);

this.controls.update();

this.lastX=wrist.x;
this.lastY=wrist.y;

}

}
