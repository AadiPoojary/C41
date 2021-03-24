class Form {

  constructor() {
    //creating properties
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.reset = createButton('Reset');
  }
  hide(){
    //hiding the properties
    this.greeting.hide();
    this.button.hide();
    this.input.hide();    
  }

  display(){
    //Creating a heading
    var title = createElement('h2')
    title.html("Car Racing Game");
    title.position(displayWidth/2-50, 0);

    //positioning the properties
    this.input.position(displayWidth/2-40, displayHeight/2-40);
    this.button.position(displayWidth/2+30, displayHeight/2+40);
    this.reset.position(displayWidth -100,20)

    //=> links one function to another
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();

      //to replace player.name with a value in the input section
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      //greeting the active player
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2-70, displayHeight/2);
    });

    //resetting the playerCount & gameState through code in the database
    this.reset.mousePressed(()=>{
      game.update(0);
      player.updateCount(0);
      Player.updateCars(0);
      //refreshes the page on which you click reset 
      location.reload();
    })

  }
}
