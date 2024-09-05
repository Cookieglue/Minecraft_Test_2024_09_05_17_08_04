let blockSize = 32

class Block {
  
  constructor(x,y,z, sides){
    this.x = x * blockSize
    this.y = y * blockSize
    this.z= z * blockSize
    this.sides = sides
  }
  
  update(tar){
    var pos = [this.x - plrX,this.y - plrY,this.z - plrZ]
    
    
    tar.push();
    tar.translate(0,0,710)
    tar.rotateX(pitch)
    tar.rotateY(yaw)
    tar.translate(pos[0], pos[1], pos[2]);
    tar.fill(0,255,0)
    tar.texture(this.tex);
    tar.box(this.w,this.h,this.l);
    tar.pop();
  }
  
}