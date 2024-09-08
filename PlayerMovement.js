let mouseSensitivity = 0.00005
let plrSpeed = 0.4
let cam

const chunkSize = 16
var plrX = chunkSize/2 * blockSize
var plrY = 0
var plrZ = chunkSize/2 * blockSize;
var yaw = 0;
var pitch = 0;

//750

function mouseMoved(){
  yaw -= movedX*mouseSensitivity*deltaTime
  pitch =constrain(pitch+movedY*mouseSensitivity*deltaTime ,-1.4,1.4)
}
function mousePressed() {
    requestPointerLock()
}

function updateCamera(){
  let newCam = createCamera();
  newCam.setPosition(plrX,plrY,plrZ)
  newCam.pan(yaw)
  newCam.tilt(pitch)

  cam.slerp(cam,newCam,0.1)
}

function playerMovement(){
  if(keyIsPressed){
    if (key === 'w' || key === 'W'){
      plrZ -= plrSpeed * cos(-yaw) * deltaTime
      plrX += plrSpeed * sin(-yaw) * deltaTime
    }
    if (key === 's'|| key === 'S'){
      plrZ += plrSpeed * cos(-yaw) * deltaTime
      plrX -= plrSpeed * sin(-yaw) * deltaTime
    }
    if (key === 'd'|| key === 'D'){
      plrZ += plrSpeed * sin(-yaw) * deltaTime
      plrX += plrSpeed * cos(-yaw) * deltaTime
    }
    if (key === 'a'|| key === 'A'){
      plrZ -= plrSpeed * sin(-yaw) * deltaTime
      plrX -= plrSpeed * cos(-yaw) * deltaTime
    }
    if (key==='x'){
      plrY -= plrSpeed * deltaTime;
    }
    if (key==='X'){
      plrY += plrSpeed * deltaTime;
    }
    
  }
}