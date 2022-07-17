const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cWidth = canvas.width;
const cHeight = canvas.height;

// creating the player
const player = new Player(30, 30, "red", 0, 280, ctx);
//creating the sun
const sun = new Sun(850,75, 50, 0, Math.PI*2, 100, 100,"yellow", ctx);


//creating the game
let game;
//game.start();

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
  if (!game) {
    game = new Game(ctx, cWidth, cHeight, player, sun);
    game.start();
  } else if (game && !game.isRunning) {
    //when crashed
    game.reset();
  }

})

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      player.speedY -= 1;
      break;
    case "ArrowDown":
      player.speedY += 1;
      break;

    case "ArrowLeft":
      player.speedX -= 1;
      break;
    case "ArrowRight":
      player.speedX += 1;
      break;
  }

});

document.addEventListener("keyup", (e) => {
  player.speedX = 0;
  player.speedY = 0;
}); 