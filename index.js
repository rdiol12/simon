var colors = ["green", "red", "yellow", "blue"];
var player = [];
var comp = [];
var level = 1;
var gameStarted = false;
var islock = false;
function random() {
  return Math.floor(Math.random() * 4);
}

function gameover() {
  for (let i = 0; i < player.length; i++) {
    if (player[i] != comp[i]) {
      return true;
    }
  }
  return false;
}
function turn() {
  if (!gameStarted) return;

  islock = true;
  player = [];

  setTimeout(() => {
    if (comp.length < level) {
      let num = random();
      var color = colors[num];

      $("#" + color).addClass("pressed");

      setTimeout(() => {
        $("#" + color).removeClass("pressed");
        islock = false;
      }, 300);

      comp.push(color);
    }
  }, 500);
}

function playerround() {
  $(".btn").off("click");
  $(".btn").on("click", function (e) {
    if (islock) return;
    var id = e.target.id;
    player.push(id);
    console.log("playe" + "" + player);
    $("#" + id).addClass("pressed");
    setTimeout(() => {
      $("#" + id).removeClass("pressed");
    }, 300);
    if (gameover()) {
      $("body").addClass("game-over");
      $("h1").html("you lost");
      reset();
    }
    if (player.length == comp.length && gameStarted) {
      level++;
      setTimeout(game, 300);
    }
  });
}
function reset() {
  $("body").off("keypress");
  player = [];
  comp = [];
  level = 1;
  gameStarted = false;
  setTimeout(() => {
    $("body").removeClass("game-over");
    $("h1").html("Press a to start");
  }, 400);
  game();
}
function game() {
  turn();
  playerround();
}
$("body").off("keypress");
$("body").on("keypress", function (e) {
  if ((e.key === "a" || e.key === "A") && !gameStarted) {
    gameStarted = true;
    game();
  }
});
