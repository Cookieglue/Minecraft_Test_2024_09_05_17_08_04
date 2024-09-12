let solid, trans, ui

var skyblue = '#56CCFF'
let directionalBrightness = 200
let ambientBrightness = 150

let GRASS, DIRT, STONE, LOG

const chunkHeight = 32
const chunkSize = 32

var player;

function preload() {
  grassTexture = loadImage('textures/grass.jpg');
  log = loadImage('textures/oak_log.png');
  leavesTexture = loadImage('textures/leaves.png');
  
  grass = loadImage('textures/grass.jpg');
  side = loadImage('textures/side.png');
  dirt = loadImage('textures/dirt.jpg');
  stone = loadImage('textures/stone.jpeg')
  
  //west, south, east, north, top, bottom
  DIRT = [dirt,dirt,dirt,dirt,dirt,dirt]
  GRASS = [side,side,side,side,grass,dirt]
  STONE = [stone,stone,stone,stone,stone,stone]
  LOG = [grass,grass,grass,grass,grass,grass]
}

function setup() {
  noCursor(); 
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  cam = createCamera(plrX,plrY,plrZ)
  //60 deg fov
  cam.perspective(1.047, width/height, 1, 8000)
  //solid = createGraphics(800, 450,WEBGL);
  //trans = createGraphics(800, 450,WEBGL);
  ui = createGraphics(800, 450);
  drawCrossHair()
  GenWorld()

  player = new DynamicCollider(plrX,plrY,plrZ, 10,20,10,  yaw , pitch)
  
}

function draw() {
  noStroke()
  background(skyblue);

  directionalLight(directionalBrightness*0.95,directionalBrightness*0.95,directionalBrightness, 1, 1, 0.5)
  ambientLight(ambientBrightness, 1)

  updateCamera();
  
  chunk.builtMeshes.forEach((mesh, tex) => {
    noStroke()
    texture(tex)
    model(mesh)

  })
  
  
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

