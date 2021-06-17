class Quiz {
  constructor(){}

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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    this.resultHeading = createElement('h1');
    this.resultHeading.html("Result Of The Quiz");
    this.resultHeading.position(350,10);

    //call getContestantInfo( ) here
   Contestant.getPlayerInfo();

   //write condition to check if contestantInfo is not undefined
    if(allContestants!==undefined){
         //write code to highlight contest who answered correctly
      for(var plr in allContestants ){
        var correctAnswer = 2;
        if(correctAnswer===allContestants[plr].answer){
          fill("green");
        }else{
          fill("red");
        }
        var displayPosition= 230;
        displayPosition+=20;
        textSize(15);
        text(allContestants[plr].input1+ ": "+ allContestants[plr].input2,120,displayPosition);

      //write code to add a note here
      fill("blue")
      textSize(20);
      text("*Note : Contestant who gave the correct answer are highlighted in green colour!*",130,230);
    }
    }

    

    

 
    
  }

}
