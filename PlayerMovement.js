let mouseSensitivity = 0.00005
let plrSpeed = 0.4
let cam

let keysPressed = []

var plrX = chunkSize/2 * blockSize
var plrY = 0
var plrZ = chunkSize/2 * blockSize;
var yaw = 0;
var pitch = 0;


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

  cam.slerp(cam,newCam,0.001)
}

function playerMovement(){

  player.resetDirection()
  if (keyIsDown(87)){
    player.setDirection("forward")
  }
  if (keyIsDown(83)){
    player.setDirection("backward")
  }
  if (keyIsDown(65)){
    player.setDirection("left")
  }
  if (keyIsDown(68)){
    player.setDirection("right")
  }

  if (keyIsDown(88)){
    player.setDirection("down")
  }
  if (keyIsDown(90)){
    player.setDirection("up")
  }
  player.move()
    
}