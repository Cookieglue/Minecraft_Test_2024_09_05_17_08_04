class BoxCollider {

    constructor(x,y,z, l,w,h, yaw = 0, pitch = 0){
        this.pos = createVector(x,y,z)
        this.size = createVector(l,w,h)
        this.vel = createVector(0,0,0)
        this.yaw = yaw
        this.pitch = pitch
    }

}