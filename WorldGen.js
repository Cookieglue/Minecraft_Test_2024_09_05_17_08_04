var grid = []
var chunk

let cubeList = [] ;//ns stands for noise sensitivity
let ns = 0.1

//map [texture->meshes]
let meshGroup = new Map()
//map [texture->single large mesh]
let builtMeshes = new Map()

function GenWorld(){
  initializeChunk();
  buildChunk();
  /**
  for (var x = -chunkSize ; x <= chunkSize ; x++ ){
    for (var z = -chunkSize ; z <= chunkSize ; z++ ){
      
      var xpos = x*cs
      var ypos = cs*round(4*noise(x*ns,z*ns))
      var zpos = z * cs
      
      cubeList.push(
        new Cube(xpos,ypos,zpos,cs,cs,cs, grassTexture)
      );
        
        if (random(0,100) > 99.5){
          GenTree(xpos,ypos,zpos);
        }
        
    }
  }
  **/
}

function initializeChunk(){
  
  for (var y = 0 ; y < chunkSize ; y++){
    //if (y < 6) 
    var zGrid = []
    for (var z = 0 ; z < chunkSize ; z++){
      var xGrid = []
      for (var x = 0 ; x < chunkSize ; x++){
        if (noise(x*0.1,z*0.1) < 0.9/y){
          xGrid.push("Air")
          continue
        }
        
        let blockType = DIRT
        if(y>4) blockType= STONE
        xGrid.push(new Block(
          x-chunkSize/2,y-chunkSize/2,z-chunkSize/2, blockType
        ))
      }
      zGrid.push(xGrid)
    }
    grid.push(zGrid)
  }
  
  grid[chunkSize-2][0][chunkSize-2] = "Air"
  
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

  for (let z = 0; z < chunkSize; z++) {
    for (let y = 0; y < chunkSize; y++) {
      for (let x = 0; x < chunkSize; x++) {
        const blk = grid[z][y][x];
        if (blk === "Air") continue;
        
        directions.forEach((dir, i) => {
          const neighborX = x + dir.x;
          const neighborY = y + dir.y;
          const neighborZ = z + dir.z;

          if (
            neighborX < 0 || neighborX >= chunkSize ||
            neighborY < 0 || neighborY >= chunkSize ||
            neighborZ < 0 || neighborZ >= chunkSize ||
            grid[neighborZ]?.[neighborY]?.[neighborX] === "Air"
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
    builtMeshes.set(tex, builtMesh);
  });
}

function AddFaceToGeometry(x,y,z,dir,side){
  face = new Plane(x,y,z,dir, side)
  //categorize by texture
  buffer = meshGroup.get(side)
  
  //start a new buffer if using a new texture
  if (buffer != undefined){
    buffer.push(face)
  }
  else buffer = [face]
  //update meshgroup
  meshGroup.set(side,buffer)
  print(meshGroup.get(side))
  
}
         
function FillLayer(blockType){
  const xGrid = Array(chunkSize).fill(
          new Block(-chunkSize / 2, y - chunkSize / 2, -chunkSize / 2, blockType)
        );
      zGrid.push(xGrid);
}
//this makes tree :)
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
