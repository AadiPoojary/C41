class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
  }

//to read the changed values of playerCount from the database
  getCount(){
    //created a variable to refer to playerCount in the database
    //.ref is to refer to a particular point
    var playerCountRef = database.ref('playerCount');
    //.on is a listener to read changed values
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

//to update the playerCount in the database
//'/'refers to the whole database
  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  //to update the player name & the distance in the database
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

  //static function is a function which refers to the whole class and not only the properties
  //it is taking the players info and is storing in the allPlayers array
  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getCarsEnd(){
    var carsEndRef = database.ref('carsEnd');
    carsEndRef.on("value",(data)=>{
      this.rank = data.val();
    })
  }

  static updateCars(rank){
    database.ref('/').update({
      carsEnd: rank
    })
  }
}
