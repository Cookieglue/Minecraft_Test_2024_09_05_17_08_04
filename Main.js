let solid, trans, ui

var skyblue = '#56CCFF'

let DIRT, STONE, LOG

function preload() {
  grassTexture = loadImage('textures/grass.jpg');
  log = loadImage('textures/oak_log.png');
  leavesTexture = loadImage('textures/leaves.png');
  
  grass = loadImage('textures/grass.jpg');
  side = loadImage('textures/side.png');
  dirt = loadImage('textures/dirt.jpg');
  stone = loadImage('textures/stone.jpeg')
  
  //west, south, east, north, top, bottom
  DIRT = [side,side,side,side,grass,dirt]
  STONE = [stone,stone,stone,stone,stone,stone]
  LOG = [grass,grass,grass,grass,grass,grass]
}

function setup() {
  noCursor(); 
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  //solid = createGraphics(800, 450,WEBGL);
  //trans = createGraphics(800, 450,WEBGL);
  ui = createGraphics(800, 450);
  drawCrossHair()
  GenWorld()
  
}

function draw() {
  noStroke()
  background(skyblue);
  
  push()
  updateTransform()
  
  builtMeshes.forEach((mesh, tex) => {
    texture(tex)
    model(mesh)
  })
  
  
  pop()
  
  //image(solid,-width/2,-height/2)
  //image(ui,-width/2,-height/2)
  
  playerMovement()

}


//UI
function drawCrossHair(){
  //ui.translate(width/2,height/2)
  //draw crosshair
  ui.stroke(30)
  ui.strokeWeight(0.5)
  let crossHairSize = width/100
  ui.line(-crossHairSize, 0, crossHairSize, 0)
  ui.line(0,-crossHairSize,0,crossHairSize)
  ui.strokeWeight(0.1)
}

