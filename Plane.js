const faceDir = [
  { z: blockSize/2 , theta: 3.1416, phi: 0},  // West
  { z: blockSize/2  , theta: -1.571, phi: 0},  // South
  { z: blockSize/2  , theta: 0, phi: 0},   // East
  { z: blockSize/2  , theta: 1.571, phi: 0},   // North
  { z: blockSize/2  , theta: 0, phi: 1.571},  // Top
  { z: blockSize/2  , theta: 0, phi: -1.571},   // Bottom
];

class Plane{
  constructor(x,y,z, dir,texture){
    this.x = x * blockSize
    this.y = y * blockSize
    this.z= z * blockSize
    //0 = West
    //1= South
    //2 = East
    //3 = North
    //4 = Bottom
    //5 = t=Top
    this.dir = dir
    this.texture = texture
  }

  place(){
    push()
    let temp_transform = faceDir[this.dir]
    translate(this.x,this.y,this.z)
    rotateY(temp_transform.theta)
    rotateX(temp_transform.phi)
    translate(0,0,temp_transform.z)
    plane(blockSize);
    pop()
    
  }
  
}