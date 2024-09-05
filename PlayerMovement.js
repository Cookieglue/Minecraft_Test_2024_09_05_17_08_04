let mouseSensitivity = 0.00005
let plrSpeed = 0.4

var chunkSize = 32
var plrX = chunkSize/2 * blockSize
var plrY = 0
var plrZ = chunkSize/2 * blockSize;
var yaw = 0;
var pitch = 0;

//750

function updateTransform(){
  translate(0,0,750)
  rotateY(yaw)
  rotateX(pitch*cos(yaw))
  rotateZ(pitch*sin(yaw))
  translate(-plrX,-plrY,-plrZ)
}

function mouseMoved(){
  yaw += movedX*mouseSensitivity*deltaTime
  pitch =constrain(pitch-movedY*mouseSensitivity*deltaTime ,-1.57,1.57)
}
function mousePressed() {
    requestPointerLock()
}

function playerMovement(){
  if(keyIsPressed){
    if (key === 'w'){
      plrZ -= plrSpeed * cos(yaw) * deltaTime
      plrX += plrSpeed * sin(yaw) * deltaTime
    }
    if (key === 's'){
      plrZ += plrSpeed * cos(yaw) * deltaTime
      plrX -= plrSpeed * sin(yaw) * deltaTime
    }
    if (key === 'd'){
      plrZ += plrSpeed * sin(yaw) * deltaTime
      plrX += plrSpeed * cos(yaw) * deltaTime
    }
    if (key === 'a'){
      plrZ -= plrSpeed * sin(yaw) * deltaTime
      plrX -= plrSpeed * cos(yaw) * deltaTime
    }
    if (key==='SPACE_BAR'){
      plrY -=plrSpeed;
    }
    
  }
}