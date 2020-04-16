var gamePattern=[];

var userClickedPattern=[];

var buttonColours=["red","blue","green","yellow"];

var started=false;

var level=0;

function playSound(name)
{
  var aud=new Audio(name+".mp3");
  aud.play();
}

$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }

});


$(".btn").click(function(){

  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userChosenColour.length-1);
});


function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}



function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

     //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
     if (userClickedPattern.length === gamePattern.length){

       //5. Call nextSequence() after a 1000 millisecond delay.
       setTimeout(function () {
         nextSequence();
       }, 1000);

     }

   } else {
     var sep=new Audio("sounds/wrong.mp3");
     sep.play();
     $("body").addClass("game-over");
     $("#level-title").text("Game Over, Press Any Key to Restart");
     setTimeout(function(){
       $("body").removeClass("game-over");
     },200);
      startover();
   }

}
function startover()
{
  started=false;
  gamePattern=[];
  level=0;
}
