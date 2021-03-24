var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var car1,car2,car3,car4;
var cars;
var form, player, game;
var car1Img,car2Img,car3Img,car4Img,trackImg,groundImg;

function preload(){

  car1Img = loadImage("./images/car1.png");
  car2Img = loadImage("./images/car2.png");
  car3Img = loadImage("./images/car3.png");
  car4Img = loadImage("./images/car4.png");

  trackImg = loadImage("./images/track.jpg");
  groundImg = loadImage("./images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20,displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  this.result = createElement('h1');

}


function draw(){


  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){
    game.end();
    this.result.html("Hello "+ player.name + " ,your rank is: "+player.rank);
    this.result.position(displayWidth/2-70,displayHeight/2);
  }
}