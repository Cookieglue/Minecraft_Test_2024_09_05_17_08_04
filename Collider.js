//a list of all STATIC hitboxes
let hitboxes = []
const  infinity = 65536

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

        let storeTimes = []

        hitboxes.forEach((col)=>{
            let distVec = this.pos.copy();
            distVec.sub(this.vel).sub(this.pos)
            let dist = distVec.mag()
           
            //get distance
            let xEntryDist, xExitDist;
            let zEntryDist, zExitDist;

            if (this.vel.x > 0) 
            { 
                xEntryDist = this.pos.x - (col.pos.x + col.size.x);  
                xExitDist = (this.pos.x + this.size.x) - col.pos.x;
            }
            else 
            { 
                xEntryDist = (this.pos.x + this.size.x) - col.pos.x;  
                xExitDist = this.pos.x - (col.pos.x + col.size.x);  
            } 
            
            if (this.vel.z > 0) 
            { 
                zEntryDist = this.pos.z - (col.pos.z + col.size.z);  
                zExitDist = (this.pos.z + this.size.z) - col.pos.z;  
            }
            else 
            { 
                zEntryDist = (this.pos.z + this.size.z) - col.pos.z;  
                zExitDist = this.pos.z - (col.pos.z + col.size.z);  
            }

            // find time of collision and time of leaving for each axis (if statement is to prevent divide by zero) 
            let xEntry, zEntry; 
            let xExit, zExit; 

            if (this.vel.x == 0.) 
            { 
                xEntry = infinity; 
                xExit = infinity-1; 
            } 
            else 
            { 
                xEntry = xEntryDist / this.vel.x; 
                xExit = xExitDist / this.vel.x; 
            } 

            if (this.vel.z == 0) 
            { 
                zEntry = infinity 
                zExit = infinity - 1
            } 
            else 
            { 
                zEntry = zEntryDist / this.vel.z; 
                zExit = zExitDist / this.vel.z; 
            }

            // find the earliest/latest times of collision
            let entryTime = Math.max(xEntry, zEntry); 
            let exitTime = Math.min(xExit, zExit);
            let collisionTime;

            // if there was no collision, then we travel the entire frame
            if (entryTime > exitTime || xEntry < 0 && zEntry < 0 || xEntry > 1 || zEntry > 1) 
            { 
                collisionTime = 1;
            }
            else {
                collisionTime = entryTime
            }
            append(storeTimes,collisionTime)
            print(xEntry,xExit,zEntry,zEntry)
        })

        let moveTime = Math.min(storeTimes)
        this.vel.mult(moveTime)
        this.pos.sub(this.vel)

    }
}