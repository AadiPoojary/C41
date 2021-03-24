class Game {
  constructor(){}

  //to get the gameState from the database
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  //to update the gameState in the database
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  //the stage before starting the game
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1Img);

    car2 = createSprite(300,200);
    car2.addImage(car2Img);

    car3 = createSprite(500,200);
    car3.addImage(car3Img);

    car4 = createSprite(700,200);
    car4.addImage(car4Img);

    cars = [car1,car2,car3,car4]
  }

  //the function when the game is begun
  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsEnd();

    if(allPlayers !== undefined){

      background(groundImg);

      //image(imageName,x,y,width,height)
      image(trackImg,0,-displayHeight*4,displayWidth - 20,displayHeight*5)
      //var display_position = 130;

      //index of the car
      var index = 0;

      //position of the cars
      var x = 180;
      var y = 0;

      for(var plr in allPlayers){
        //add index by one every time a player is created
        index+=1;
        
        //placing cars 230px away from each other
        x+=230

        //y decided by the distance travelled by each player
        y = displayHeight - allPlayers[plr].distance

        cars[index-1].x = x
        cars[index-1].y = y
        if (index === player.index){
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y

          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          
        }        
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(player.distance>=4200){
      gameState = 2;
      player.rank+=1;
      Player.updateCars(player.rank);
      //text("Your Rank Is: " + player.rank,displayWidth/2, displayHeight/2);
    }

    drawSprites();
  }

  end(){    
    console.log("Game has Ended");
    console.log(player.rank);
    
    
  }
}
