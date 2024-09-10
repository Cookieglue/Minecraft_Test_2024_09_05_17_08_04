class Chunk{

    constructor(){
        //3d grid of all blocks in the chunk
        this.grid = []
        //map [texture->meshes]
        this.meshGroup = new Map()
        //map [texture->single large mesh]
        this.builtMeshes = new Map()

    }

    initializeChunk(){
  
        for (var y = 0 ; y < chunkHeight ; y++){
      
          //upper cutoff
          if(y<airCutoff) {
            this.grid.push(this.fillLayer("Air",y))
            continue
          }
          //lower cutoff
          else if (y > stoneCutoff){
            this.grid.push(this.fillLayer(STONE,y))
            continue
          }
          let zGrid = []
          for (var z = 0 ; z < chunkSize ; z++){
            let xGrid = []
            for (var x = 0 ; x < chunkSize ; x++){
              
              let blockType = this.getBlock(x,y,z)
              if (blockType == "Air"){
                xGrid.push("Air")
                continue
              }
              xGrid.push(new Block(
                x-chunkSize/2,y-chunkSize/2,z-chunkSize/2, blockType
              ))
            }
            zGrid.push(xGrid)
          }
          this.grid.push(zGrid)
          }
        
    }
      
    buildChunk() {
        const directions = [
          { x: 0, y: 0, z: -1 },  // West
          { x: -1, y: 0, z: 0 },  // South
          { x: 0, y: 0, z: 1 },   // East
          { x: 1, y: 0, z: 0 },   // North
          { x: 0, y: -1, z: 0 },  // Bottom
          { x: 0, y: 1, z: 0 },   // Top
        ];
       //cull faces
        for (let y = 0; y < chunkHeight; y++) {
          for (let z = 0; z < chunkSize; z++) {
            for (let x = 0; x < chunkSize; x++) {
              const blk = this.grid[y][z][x];
              if (blk === "Air") continue;
              
              directions.forEach((dir, i) => {
                const neighborX = x + dir.x;
                const neighborY = y + dir.y;
                const neighborZ = z + dir.z;
      
                if (
                  neighborX < 0 || neighborX >= chunkSize ||
                  neighborY < 0 || neighborY >= chunkHeight ||
                  neighborZ < 0 || neighborZ >= chunkSize ||
                  this.grid[neighborY]?.[neighborZ]?.[neighborX] === "Air"
                ) {
                  this.addFaceToGeometry(x, y, z, i, blk.sides[i]);
                }
              });
            }
          }
        }
      
        this.meshGroup.forEach((textureGroup, tex) => {
          const builtMesh = buildGeometry(() => {
            textureGroup.forEach(face => face.place());
          });
          //builtMesh.computeNormals(SMOOTH);
          this.builtMeshes.set(tex, builtMesh);
        });
    }

    getBlock(x,y,z){
        //air logic
        let type;
        let rand = noise(x*ns,z*ns)
        if (y<grassCenter){
          if (rand<(grassCenter-y)/grassCenter){
            type = "Air"
          }
          else{
            type = (this.grid[y-1][z][x] == "Air")? GRASS : DIRT;
          }
        }
        else{
          type = (rand<(y-grassCenter)/grassCenter)? STONE : DIRT;
        }
        return type
    }

    addFaceToGeometry(x,y,z,dir,side){
        let face = new Plane(x,y,z,dir, side)
        //categorize by texture
        let buffer = this.meshGroup.get(side)
        
        //start a new buffer if using a new texture
        if (buffer != undefined){
          buffer.push(face)
        }
        else buffer = [face]
        //update meshgroup
        this.meshGroup.set(side,buffer)
        
    }
               
    fillLayer(blockType,y){
    
    let zGrid =[];
    if (blockType === "Air"){
        for (let z = 0; z < chunkSize; z++) {
        const xGrid = Array(chunkSize).fill("Air");
        zGrid.push(xGrid);
        }
        return zGrid
    }
    
    for (let z = 0; z < chunkSize; z++) {
        const xGrid = Array(chunkSize).fill(
        new Block(-chunkSize / 2, y - chunkSize / 2, -chunkSize / 2, blockType)
        );
        zGrid.push(xGrid);
    }
    return zGrid
    }
      
      
    
}