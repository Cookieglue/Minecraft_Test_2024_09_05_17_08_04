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
    translate(this.x,this.y,this.z)
    switch (this.dir){
      //West
      case(0):
        translate(0,0,-blockSize/2)   
        break

      //South
      case(1):
        rotateY(1.571)
        translate(0, 0,-blockSize/2) 
        break 

      //East
      case(2):
        translate(0,0,blockSize/2)
        break


      //North
      case(3):
        rotateY(1.571)
        translate(0, 0, blockSize/2) 
        break


      //Bottom
      case(4):
        translate(0, -blockSize/2, 0)
        rotateX(1.571) 
        break

      //Top
      case(5):
        translate(0, blockSize/2, 0)
        rotateX(1.571) 
        break 


      default:
        break
    
  }
    plane(blockSize);
    pop()
  }
  
}