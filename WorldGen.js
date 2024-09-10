var chunk
var airCutoff = 1
var stoneCutoff = 25
var grassCenter = (airCutoff + stoneCutoff)/2

const airStrength = (y)=>{Math.max(10-sq(airCutoff-y),0)}
const grassStrength = (y)=>{Math.max(10-sq(grassCenter-y),0)}
const stoneStrength = (y)=>{Math.max(10-sq(stoneCutoff-y),0)}


let cubeList = [] ;//ns stands for noise sensitivity
let ns = 0.1

function GenWorld(){
  chunk = new Chunk()
  chunk.initializeChunk();
  chunk.buildChunk();
}

function initializeChunk(){
  
  for (var y = 0 ; y < chunkHeight ; y++){

    //upper cutoff
    if(y<airCutoff) {
      grid.push(FillLayer("Air",y))
      continue
    }
    //lower cutoff
    else if (y > stoneCutoff){
      grid.push(FillLayer(STONE,y))
      continue
    }
    let zGrid = []
    for (var z = 0 ; z < chunkSize ; z++){
      let xGrid = []
      for (var x = 0 ; x < chunkSize ; x++){
        
        let blockType = GetBlock(x,y,z)
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
    grid.push(zGrid)
    }
  
}

function buildChunk() {
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
        const blk = grid[y][z][x];
        if (blk === "Air") continue;
        
        directions.forEach((dir, i) => {
          const neighborX = x + dir.x;
          const neighborY = y + dir.y;
          const neighborZ = z + dir.z;

          if (
            neighborX < 0 || neighborX >= chunkSize ||
            neighborY < 0 || neighborY >= chunkHeight ||
            neighborZ < 0 || neighborZ >= chunkSize ||
            grid[neighborY]?.[neighborZ]?.[neighborX] === "Air"
          ) {
            AddFaceToGeometry(x, y, z, i, blk.sides[i]);
          }
        });
      }
    }
  }

  meshGroup.forEach((textureGroup, tex) => {
    const builtMesh = buildGeometry(() => {
      textureGroup.forEach(face => face.place());
    });
    //builtMesh.computeNormals(SMOOTH);
    builtMeshes.set(tex, builtMesh);
  });
}
function GenTree(x,y,z){
  
  let treeHeight = round(random(3,4))
  
  for (var i = 0 ; i <= treeHeight; i++){
    cubeList.push(new Cube(x,y-i*cs,z, cs,cs,cs, oakTexture));
  }
  
  for (var addX = -2 ; addX <= 2 ; addX++ ){
    for (var addZ = -2 ; addZ <= 2 ; addZ++ ){
      //layer 1
      if(abs(addX) != 2 || abs(addZ) != 2){
        cubeList.push(new Cube(x+addX*cs,y-treeHeight*cs,z+addZ*cs, cs,cs,cs, leavesTexture));
      }
      //layer 2
      if(abs(addX) + abs(addZ) < 3){
        cubeList.push(new Cube(x+addX*cs,y-(treeHeight+1)*cs,z+addZ*cs, cs,cs,cs, leavesTexture));
      }
      
    }
  }
  //layer 3
  for (var addX = -1 ; addX <= 1 ; addX++ ){
    for (var addZ = -1 ; addZ <= 1 ; addZ++ ){
      cubeList.push(new Cube(x+addX*cs,y-(treeHeight+2)*cs,z+addZ*cs, cs,cs,cs, leavesTexture));
    }
  }

  
}
