// initalized variable
var compchoice = [];
var color = ["red", "green", "yellow", "blue"];
var player = [];
var level = 1;
var gamestart = false;
var islock = false;

// wait for keypress to start the game
$("body").on("keypress", function (e) {
  if ((e.key == "a" || e.key == "A") && !gamestart) {
    gamestart = true;
    Startlogic();
  }
});

//function cheaking if player lost
function IsEnd() {
  for (let i = 0; i < player.length; i++)
    if (player[i] != compchoice[i]) return true;
  return false;
}

//random num to use with comp choice
function random() {
  return Math.floor(Math.random() * 4);
}

function comp() {
  if (compchoice.length < level && gamestart) {
    islock = true; // locking player click untill end of comp
    player = [];
    var choice = color[random()]; // using random function to randomized comp color pick
    compchoice.push(choice); //pushing random choice to comp arry
    $("#" + choice).addClass("pressed");
    setTimeout(() => {
      //using time out to remove pressed 'effect'
      islock = false; //after comp turn end relesing player click
      $("#" + choice).removeClass("pressed");
    }, 1000);
  }
}

//controling player color pick
function playerturn() {
  $(".btn").off(); //closing lissing function to prevent *2 clicks each iteration
  $(".btn").on("click", function (e) {
    //lissing to player click
    if (islock) return; // preventing click if comp did not show its choice
    let id = e.target.id;
    $("id").addClass("pressed");
    setTimeout(() => {
      $("id").removeClass("pressed");
    }, 1000);
    player.push(id); //pushing player choice into arry
    if (IsEnd()) {
      //if player lost doing reset untill next  key press
      $("body").addClass("game-over");
      $("h1").html("you lost");
      reset();
    }
    if (player.length == compchoice.length) {
      //if playerr arry match and (!IsEnd) enter next level
      level++; //next level
      Startlogic(); //start next round
    }
  });
}

//reseting after game lost
function reset() {
  setTimeout(() => {
    //removing game over and changin h1 back to be ready for next game
    $("body").removeClass("game-over");
    $("h1").html("Press a to start");
  }, 500);
  player = [];
  level = 1;
  gamestart = false;
  islock = false;
  compchoice = [];
  return;
}

//controling fucnction game logic
function Startlogic() {
  comp();
  playerturn();
}
