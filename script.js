// let nextLevel = 'index.html';

// const shoot = () => {
//   const bullet = document.createElement("a-sphere");
//   let pos = myCamera.getAttribute("position");
//   bullet.setAttribute("position", pos);
//   bullet.setAttribute("velocity", getDirection(myCamera, 30));
//   bullet.setAttribute("dynamic-body", true);
//   bullet.setAttribute("radius", 0.5);
//   bullet.setAttribute("src", "https://i.imgur.com/H8e3Vnu.png");
//   myScene.appendChild(bullet);
//   bullet.addEventListener('collide', shootCollided);
// };

// const teleport = () => {
//   console.log('Pressing teleport...');
//   const bullet = document.createElement("a-torus");
//   let pos = myCamera.getAttribute("position");
//   bullet.setAttribute("position", pos);
//   bullet.setAttribute("velocity", getDirection(myCamera, 30));
//   bullet.setAttribute("dynamic-body", true);
//   bullet.setAttribute("radius", 0.5);
//   bullet.setAttribute("arc", 360);
//   bullet.setAttribute("radius-tubular", 0.1);
//   bullet.setAttribute("rotation", { x: 90, y: 0, z: 0 });
//   bullet.setAttribute("src", "https://i.imgur.com/H8e3Vnu.png");
//   myScene.appendChild(bullet);
//   bullet.addEventListener('collide', teleportCollided);
// };

// const shootCollided = event => {
//   if (event.detail.body.el.id === 'floor') {
//     console.log('Hit the floor');
//     event.detail.target.el.removeEventListener('collide', shootCollided);
//     myScene.removeChild(event.detail.target.el);
//   } else if (event.detail.body.el.className === 'target') {
//     console.log('Hit the target!');
//     event.detail.target.el.removeEventListener('collide', shootCollided);
//     myScene.removeChild(event.detail.target.el);
//     myScene.removeChild(event.detail.body.el);
//   }
//   if (document.querySelectorAll('.target').length === 0) {
//     console.log('You win!');
//     location.href = nextLevel;
//   }
// };

// const teleportCollided = event => {
//   if (event.detail.body.el.id === 'floor') {
//     console.log('Hit the floor');
//     event.detail.target.el.removeEventListener('collide', teleportCollided);
//     let pos = event.detail.target.el.getAttribute('position');
//     myScene.removeChild(event.detail.target.el);
//     myCamera.setAttribute('position', { x: pos.x, y: 2, z: pos.z });
//   }
// };

document.addEventListener("keydown",(event)=>{
    if(event.code==="Space"){
      // startTime();
      shootWaste();
    }
});
let score=1;
let interval=null;
function shootWaste(){
  const waste=document.createElement("a-entity");
  let camera_position=myCamera.getAttribute("position");
  waste.setAttribute("position",camera_position);
  waste.setAttribute("velocity",getDirection(myCamera,20));
  waste.setAttribute("dyanmic-body",true);
  waste.setAttribute("obj-model","obj: #waste-bag");
  waste.setAttribute("material","color:green");
  waste.setAttribute("dynamic-body","mass:100")
  myScene.appendChild(waste);
  waste.addEventListener("collide",wasteCollideBin);
  startTime();
}
function wasteCollideBin(event){
  if(event.detail.body.el.className=="target"){
    console.log(event.detail.body.el.className)
    points.setAttribute("text",`value: points : ${score++}`)
    myScene.removeChild(event.detail.target.el);
    event.detail.target.el.removeEventListener('collide', wasteCollideBin);
    changeBinPosition();
  }
}
function getDirection(camera, speed) {
  var y = camera.getAttribute('rotation').y + 90;
  var x = camera.getAttribute('rotation').x;

  var moveX = Math.cos(y / 360 * (Math.PI * 2));
  var moveY = Math.sin(x / 360 * (Math.PI * 2));
  var moveZ = Math.sin(y / 360 * (Math.PI * 2));
  var moveXRatio = (Math.pow(moveX, 2)) / (Math.pow(moveX, 2) + Math.pow(moveZ, 2));
  var moveZRatio = (Math.pow(moveZ, 2)) / (Math.pow(moveX, 2) + Math.pow(moveZ, 2));

  if (moveX <= 0) {
      moveX = -Math.sqrt((1 - Math.pow(moveY, 2)) * moveXRatio);
  } else {
      moveX = Math.sqrt((1 - Math.pow(moveY, 2)) * moveXRatio);
  }

  if (moveZ <= 0) {
      moveZ = -Math.sqrt((1 - Math.pow(moveY, 2)) * moveZRatio);
  } else {
      moveZ = Math.sqrt((1 - Math.pow(moveY, 2)) * moveZRatio);
  }

  return { x: moveX * speed, y: moveY * speed, z: -moveZ * speed };
}
function changeBinPosition(){
  let x=Math.floor(Math.random()*10);
  let z=-Math.floor(Math.random()*10);
 let wasteBinPosition=wasteBin.getAttribute("position");
 let wasteBinPlanePos=wasteBinPlane.getAttribute("position");
 wasteBinPosition.x=x;
 wasteBinPosition.z=z;
 wasteBinPlanePos.x=x;
 wasteBinPlanePos.z=z+0.5;
 console.log(wasteBinPosition)
 wasteBin.setAttribute("position",wasteBinPosition);
 wasteBinPlane.setAttribute("position",wasteBinPlanePos);
}
let seconds=90;
function startTime(){
if(!interval){
  interval= setInterval(()=>{
    time.setAttribute("text",`value: Time : ${seconds} s`)
    seconds--;
    if(seconds==0){
      clearInterval(interval);
      alert("game over")
    }
  },1000)
}
 
}