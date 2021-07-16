
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
 var userClickedPattern=[];

// You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


 //1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
 $(".btn").click(function() {

//2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
  
//4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
    
    //console.log(userClickedPattern);
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  
  });


  function checkAnswer(currentLevel){
     //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");

  
      setTimeout(function () {
      $("body").removeClass("game-over");
      }, 200);
           
       //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
       $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
} 

function nextSequence(){

//6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
userClickedPattern = [];

//4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
level++;

//5. Inside nextSequence(), update the h1 with this change in the value of level.
$("#level-title").text("Level " + level);

var randomNumber=Math.random();
var rn=Math.floor(randomNumber*4);
var randomChosenColour=buttonColours[rn];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



function startOver(){
  level=0;
  gamePattern=[];
  started=false;
  }
