//a list of all STATIC hitboxes
let hitboxes = []
const  infinity = 65536

class BoxCollider {

    constructor(x,y,z, l,w,h){
        this.pos = createVector(x-l/2,y-w/2,z-h/2)
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
        if (dir=="down")this.relativeVel.y = -1
        if (dir=="up")this.relativeVel.y = 1
    }

    move(){

        this.relativeVel.normalize()

        //use 2d rotation matrix
        this.vel = createVector(this.relativeVel.x*cos(-yaw) - this.relativeVel.z*sin(-yaw),
        this.relativeVel.y
        ,this.relativeVel.x*sin(-yaw) + this.relativeVel.z*cos(-yaw))
        
        this.vel.mult(plrSpeed*deltaTime)

        this.checkCollision()
        plrX = this.pos.x + this.size.x/2
        plrY = this.pos.y + this.size.y/2
        plrZ = this.pos.z + this.size.z/2
    }

    checkCollision(){

        let storeTimes = []

        hitboxes.forEach((col)=>{

            let pos = this.pos.array()
            let size = this.size.array()
            let vel = this.vel.array()

            let colPos = col.pos.array()
            let colSize = col.size.array()


            let distVec = this.pos.copy();
            distVec.sub(this.vel).sub(this.pos)
            let dist = distVec.mag()

            //get distance
            let entryDist = [0,0,0]
            let exitDist = [0,0,0];
            let entryTimes = [0,0,0]
            let exitTimes = [0,0,0]
            for (let i = 0 ; i <3 ; i++){
                //get distance
                if (vel[i] > 0) 
                { 
                    entryDist[i] = pos[i] - (colPos[i] + colSize[i]);  
                    exitDist[i] = (pos[i] + size[i]) - colPos[i];
                }
                else 
                { 
                    entryDist[i] = (pos[i]+ size[i]) - colPos[i];  
                    exitDist[i] = pos[i]- (colPos[i] + colSize[i]);  
                } 
                // find time of collision and time of leaving for each axis (if statement is to prevent divide by zero) 
                if (vel[i] == 0.) 
                { 
                    entryTimes[i] = -infinity; 
                    exitTimes[i] = infinity; 
                } 
                else 
                { 
                    entryTimes[i] = entryDist[i] / vel[i]; 
                    exitTimes[i] = exitDist[i] / vel[i]; 
                } 

            }
            //entryTimes[1] = 0
            // find the earliest/latest times of collision
            let entryTime = max(entryTimes); 
            print(entryTime)
            let exitTime = min(exitTimes);
            let collisionTime;

            // if there was no collision, then we travel the entire frame
            if (entryTime > exitTime || entryTime < 0 || entryTimes[0] > 1 ||  entryTimes[1] > 1 || entryTimes[2] > 1) 
            { 
                collisionTime = 1;
            }
            else {
                collisionTime = entryTime
            }
            append(storeTimes,collisionTime)
        })
        
        let moveTime = min(storeTimes)
        this.vel.mult(moveTime)
        this.pos.sub(this.vel)

    }
}