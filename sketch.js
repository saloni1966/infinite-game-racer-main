var c1, c2, c3, c4, c5;
var car;
var carG;

var coin, movingCoin;
var coinG;
var road, movingRoad;

var drivingMotorcycle;
var motorcycle;

var edges;

var horn
var vroom
var coinCollect

var score = 0

var gameState = "play"

function preload() {
  movingRoad = loadImage("road.png");
  drivingMotorcycle = loadAnimation(
    "motorcycle1.svg",
    "motorcycle2.svg",
    "motorcycle3.svg"
  );
  c1 = loadImage("car1.svg");
  c2 = loadImage("car2.svg");
  c3 = loadImage("car3.svg");
  c4 = loadImage("car4.svg");
  c5 = loadImage("car5.svg");
  movingCoin = loadImage("coin.svg");
  
  //horn = loadSound("CarHorn.wav");
  //vroom = loadSound("CarVroom.wav")

  //dom library was missing , i added it and now its working fine, you cxan add rest all sounds to your game
  //also covert files to mp3, link is given below
  // https://cloudconvert.com/wav-to-mp3
  coinCollect = loadSound("CoinCollect.mp3")


  
}

function setup() {
  createCanvas(400, 600);
  road = createSprite(240, 0);
  road.addImage("roadSprite", movingRoad);

  motorcycle = createSprite(200, 500);
  motorcycle.addAnimation("motorbike", drivingMotorcycle);
  motorcycle.scale = 0.55;
  motorcycle.setCollider("rectangle",0,0,60,130)

  carG = createGroup();
  coinG = createGroup();
}

function draw() {
  background("white");
  edges = createEdgeSprites();
  motorcycle.collide(edges);
    
  if(gameState === "play"){

  road.velocityY = 8;

  if (road.y > 570) {
    road.y = 300;
  }

  carSpawn();
  coinSpawn();

if(coinG.isTouching(carG)){
  coinG.x = coinG.x - 50
}

if(motorcycle.isTouching(coinG)){
    score = score + 1
    coinCollect.play()
   coinG.destroyEach()
  } 
 motorcycle.x = mouseX
 
if(motorcycle.isTouching(carG)){
  gameState = "end"
}
  }
if(keyDown("7")){
  gameState = "play"
  score = 0
}

  drawSprites();
if(gameState === "end"){
reset();
}
  textSize(24)
  textFont("Arial")
  fill("lime")
  text("$: "+ score, 340,25)

}

function carSpawn() {
  if (frameCount % 80 === 0) {
    car = createSprite(Math.round(random(50, 350)), 0);
    var randCar = Math.round(random(1, 5));
    switch (randCar) {
      case 1:
        car.addImage("movingCar", c1);
        break;
      case 2:
        car.addImage("movingCar", c2);
        break;
      case 3:
        car.addImage("movingCar", c3);
        break;
      case 4:
        car.addImage("movingCar", c4);
        break;
      case 5:
        car.addImage("movingCar", c5);
        break;
      default:
        break;
    }

    
    
    
    car.scale = 0.5;
    car.setVelocity(0, 19);
    car.lifetime = 80;
    carG.add(car);
  }
}
function coinSpawn() {
  if (frameCount % 110 === 0) {
    coin = createSprite(Math.round(random(50, 350)), 0);
    coin.addImage("collect", movingCoin);
   
    if(coinG.isTouching(carG)){
      coinG.x = coinG.x - 100
    }
    
    
    
    coin.scale = 0.4;
    coin.setVelocity(0, 19);
    coin.lifetime = 80;
    coinG.add(coin);
  }
}

function reset(){
  

coinG.destroyEach()
coinG.visibility = false

carG.destroyEach()
carG.visibility = false

road.velocityY = 0


fill("cyan")
textSize(20)
textFont("Georgia")
text("if you would like to play again please press 7", 5, 300)

}







