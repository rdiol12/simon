var compchoice = [];
var color = ["red", "green", "yellow", "blue"];
var player = [];
var level = 1;
var gamestart = false;
var islock = false;
$("body").on("keypress", function (e) {
  if ((e.key == "a" || e.key == "A") && !gamestart) {
    gamestart = true;
    Startlogic();
  }
});
function IsEnd() {
  for (let i = 0; i < player.length; i++)
    if (player[i] != compchoice[i]) return true;
  return false;
}
function random() {
  return Math.floor(Math.random() * 4);
}
function comp() {
  if (compchoice.length < level && gamestart) {
    islock = true;
    player = [];
    var choice = color[random()];
    compchoice.push(choice);
    $("#" + choice).addClass("pressed");
    setTimeout(() => {
      islock = false;
      $("#" + choice).removeClass("pressed");
    }, 1000);
  }
}
function playerturn() {
  $(".btn").off();
  $(".btn").on("click", function (e) {
    if (islock) return;
    let id = e.target.id;
    $("id").addClass("pressed");
    setTimeout(() => {
      $("id").removeClass("pressed");
    }, 1000);
    player.push(id);
    if (IsEnd()) {
      $("body").addClass("game-over");
      $("h1").html("you lost");
      reset();
    }
    if (player.length == compchoice.length) {
      level++;
      Startlogic();
    }
  });
}
function reset() {
  setTimeout(() => {
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
function Startlogic() {
  comp();
  playerturn();
}
