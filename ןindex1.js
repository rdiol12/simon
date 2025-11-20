var colors = ["green", "red", "yellow", "blue"];
var historyColor = [];
var client = [];
var start = false;
var level = 1;
var i = 0;
function random() {
  return Math.floor(Math.random() * 4);
}
function reset() {
  historyColor = [];
  client = [];
  start = false;
  level = 1;
  i = 0;
  $("h1").text("Press A Key to Start");
}

function checkKeyPress() {
  $("body").keypress(() => {
    if (!start) {
      start = true;
      $("h1").text("level : " + level);
      newColor();
    }
  });
}
function newColor() {
  if (start) {
    let rand = random();
    let color = colors[rand];
    historyColor.push(color);
    $("#" + color)
      .fadeOut(100)
      .fadeIn(100);
    console.log(color);
    console.log(historyColor);
    i = 0;
    client = [];
    clientTurn();
  }
}
function checkTurn(client = []) {
  // "red" "green" "red"

  if (client.length === historyColor.length) {
    if (client[i] !== historyColor[i]) {
      alert("worng !");
      reset();
    } else {
      level++;
      $("h1").text("level : " + level);
      newColor();
    }
    i++;
  } else {
    if (client[client.length - 1] !== historyColor[client.length - 1]) {
      alert("worng !");
      reset();
    }
    clientTurn();
  }
}

function clientTurn() {
  if (start) {
    let pressed = false;
    $(".btn").on("click", (e) => {
      if (!pressed) {
        pressed = true;
        client.push(e.target.id);
        $("#" + e.target.id)
          .fadeOut(100)
          .fadeIn(100);
        console.log(e.target.id);
        checkTurn(client);
      }
    });
  }
}

checkKeyPress();
