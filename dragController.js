import * as THREE from "three";

export class DragController{

constructor(camera,cubeManager,ghostManager,gridManager){

this.camera=camera;
this.cubeManager=cubeManager;
this.ghostManager=ghostManager;
this.gridManager=gridManager;

this.raycaster=new THREE.Raycaster();
this.pointer=new THREE.Vector2();

this.plane=new THREE.Plane(
new THREE.Vector3(0,1,0),
-1
);

this.hit=new THREE.Vector3();

this.cube=null;
this.dragging=false;
this.last=null;

}

update(pointer,gesture){

this.pointer.copy(pointer);

this.raycaster.setFromCamera(
this.pointer,
this.camera
);

const hovered=this.raycaster.intersectObjects(
this.cubeManager.cubes
)[0]?.object??null;

if(gesture==="PINCH_START"&&hovered){

this.cube=hovered;
this.dragging=true;

this.cubeManager.select(hovered);
this.ghostManager.show(hovered);

this.last={
x:hovered.position.x,
y:hovered.position.y,
z:hovered.position.z
};

}

if(
this.dragging&&
gesture==="PINCHING"&&
this.cube
){

if(this.raycaster.ray.intersectPlane(
this.plane,
this.hit
)){

const snap=this.gridManager.snap({

x:this.hit.x,
y:this.cube.position.y,
z:this.hit.z

});

if(
!this.last||
snap.x!==this.last.x||
snap.y!==this.last.y||
snap.z!==this.last.z
){

this.last=snap;

this.cubeManager.moveSelected(snap);
this.ghostManager.show(this.cube);

}

}

}

if(gesture==="RELEASE"){

this.dragging=false;
this.cube=null;
this.last=null;

}

return hovered;

}

}
