var colors = ["green", "red", "yellow", "blue"];
var player = [];
var comp = [];
var level = 1;
var gameStarted = false;
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
  player = [];
  console.log("playe" + " " + player);
  if (comp.length < level) {
    let num = random();
    var color = colors[num];
    $("#" + color).addClass("pressed");
    setTimeout(() => {
      $("#" + color).removeClass("pressed");
    }, 200);
    comp.push(color);
  }
  console.log("comp" + " " + comp);
}
function playerround() {
  $(".btn").off("click");
  $(".btn").on("click", function (e) {
    var id = e.target.id;
    player.push(id);
    console.log("playe" + "" + player);
    $("#" + id).addClass("pressed");
    $("#" + id).play();
    setTimeout(() => {
      $("#" + id).removeClass("pressed");
    }, 300);
    if (gameover()) {
      $("body").addClass("game-over");
      alert("you lost");
      reset();
    }
    if (player.length == comp.length) {
      level++;
      game();
    }
  });
}
function reset() {
  player = [];
  comp = [];
  level = 1;
  gameStarted = false;
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 400);

  game();
}
function game() {
  turn();
  playerround();
}

$("body").on("keypress", function (e) {
  if ((e.key === "a" || e.key === "A") && !gameStarted) {
    gameStarted = true;
    game();
  }
});
