class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

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

    horse1 = createSprite(100,200);
    //car1.addImage("car1",car1_img);
    horse2 = createSprite(300,200);
    //car2.addImage("car2",car2_img);
    horse3 = createSprite(500,200);
    //car3.addImage("car3",car3_img);
    horse4 = createSprite(700,200);
    //car4.addImage("car4",car4_img);
    horses = [horse1, horse2, horse3, horse4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      //image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      //var display_position = 100;
      
      //index of the array
      var index = 0;


      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        horses[index-1].x = x;
        horses[index-1].y = y;

        if (index === player.index){
          horses[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = horses[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=20
      player.update();
    }

    //if(player.distance>4000){
      //gameState=2;
    //}
     //end(){
    //console.log("GAME ENDED");

    drawSprites();

  
  }

}
 
  

