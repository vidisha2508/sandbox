export function setupUI(app){

const {cubeManager,ghostManager,objectCount}=app;

const addBtn=document.getElementById("addCube");
const deleteBtn=document.getElementById("deleteCube");
const resetBtn=document.getElementById("resetScene");
const modeBtn=document.getElementById("modeToggle");
const modeText=document.getElementById("modeText");

const updateCounter=()=>objectCount.textContent=cubeManager.cubes.length;

updateCounter();

app.ui={

add(){

cubeManager.addCube();
updateCounter();

},

delete(){

cubeManager.deleteSelected();
ghostManager.hide();
updateCounter();

},

reset(){

cubeManager.reset();
ghostManager.hide();
cubeManager.addCube();
updateCounter();

},

mode(){

if(cubeManager.mode==="individual"){

cubeManager.setMode("group");
modeBtn.textContent="Group";
modeText.textContent="Group";
ghostManager.hide();

cubeManager.cubes.forEach(c=>
c.material.color.setHex(c.userData.selectedColor)
);

}

else{

cubeManager.setMode("individual");
modeBtn.textContent="Individual";
modeText.textContent="Individual";

cubeManager.cubes.forEach(c=>
c.material.color.setHex(c.userData.defaultColor)
);

ghostManager.hide();
cubeManager.selectedCube=null;

}

}

};

addBtn.onclick=app.ui.add;
deleteBtn.onclick=app.ui.delete;
resetBtn.onclick=app.ui.reset;
modeBtn.onclick=app.ui.mode;

}
