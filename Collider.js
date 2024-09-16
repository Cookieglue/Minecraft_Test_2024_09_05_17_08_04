//a list of all STATIC hitboxes
let hitboxes = []

class BoxCollider {

    constructor(x,y,z, l,w,h){
        this.pos = createVector(x,y,z)
        this.size = createVector(l,w,h)
    }

}
class DynamicCollider extends BoxCollider{

    constructor(x,y,z, l,w,h, yaw = 0, pitch = 0){
        super(x,y,z,l,w,h)
        this.relativeVel = createVector(0,0,0)
        this.vel = createVector(0,0,0)
        this.yaw = yaw
        this.pitch = pitch
    }

    resetDirection(){
        this.relativeVel = createVector(0,0,0)
    }

    setDirection(dir){
        if (dir=="forward")this.relativeVel.z = 1
        if (dir=="backward")this.relativeVel.z = -1
        if (dir=="left")this.relativeVel.x = 1
        if (dir=="right")this.relativeVel.x = -1
    }

    move(){

        this.relativeVel.normalize()

        //use 2d rotation matrix
        this.vel = createVector(this.relativeVel.x*cos(-yaw) - this.relativeVel.z*sin(-yaw),
        0
        ,this.relativeVel.x*sin(-yaw) + this.relativeVel.z*cos(-yaw))
        
        this.vel.mult(plrSpeed*deltaTime)

        this.checkCollision()
        plrX = this.pos.x
        plrY = this.pos.y
        plrZ = this.pos.z
    }

    checkCollision(){

        hitboxes.forEach((col)=>{
            let newPos = this.pos.copy();
            newPos.sub(this.vel)
            newPos.sub(col.pos)
            let dist = newPos.mag()
            print(dist*dist)
            if ( dist*dist > 15000 ) this.pos.sub(this.vel)

        })

    }
}