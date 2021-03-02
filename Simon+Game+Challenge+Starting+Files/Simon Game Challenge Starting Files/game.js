// Test JavaScript
// alert("JavaScript OK");

// Button colours
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var gameLevel = 0;

// Detect key press to start - restart the game
// document.addEventListener("keydown", function () {
$(document).keydown(function() {

  if (!gameStarted) {
    // $("#level-title").text("Level " + gameLevel);
    nextSequence();
    gameStarted = true;
  }

});

//  Detect button pressed by the user
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animateButton(userChosenColour);

  checkAnswers(userClickedPattern.length-1);

});


//  To generate the next random button
function nextSequence() {

  userClickedPattern = [];
  gameLevel++;
  $("#level-title").text("Level " + gameLevel);

  // Use Math random() and floor() functions to get random number 0 ... 9999...
  //  multiply this by number of buttons, then floor to get number range 0 .. 3
  var randomNumber = Math.random() * 4;

  randomNumber = Math.floor(randomNumber);

  // Capture randomly chosen colour
  randomChosenColour = buttonColours[randomNumber];

// Add the random chosen colour to the end of array gamePattern
  gamePattern.push(randomChosenColour);

// Play the sound for the randomly chosen colour
  playSound(randomChosenColour);

//  Animate the button for the randonly chosen colour
  animateButton(randomChosenColour);

}

// Play sound for the button pressed
function playSound(chosenColour) {

  var sound = new Audio('sounds/' + chosenColour + ".mp3");
  sound.play();

}

function animateButton(chosenColour) {

  $("#" + chosenColour).addClass("pressed");

  setTimeout(function () {
    $("#" + chosenColour).removeClass("pressed");
  }, 100);

}

function checkAnswers(currentColour) {

  if (userClickedPattern[currentColour] == gamePattern[currentColour]) {

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {

    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    
    restartGame();
  }
  //
  // for (var i = 0; i < gamePattern.length; i++) {
  //
  //   if (userClickedPattern[i] != gamePattern[i]) {
  //     $("#level-title").text("Game Over, Press Any Key to Restart");
  //     restartGame();
  //   }
  //
  // }
  //
  // setTimeout(function () {
  //   nextSequence();
  // }, 1000);

}


// Rstart game
function restartGame() {

  gameStarted = false;
  gameLevel = 0;

  gamePattern = [];
  userclicked = [];

}
