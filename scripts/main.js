const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cWidth = canvas.width;
const cHeight = canvas.height;

// creating the player
const player = new Player(50, 30, 0, 280, ctx);
//creating the sun
const sun = new Sun(550,0, 150, 0, Math.PI, "yellow", ctx);

;//creating the game
let game;


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

window.addEventListener("keydown", (e) => {
  switch (e.code)  {
      case "ArrowUp":
       player.speedY -= 2;
       break;
      case "ArrowDown":
       player.speedY += 2;  
       break;
      case "ArrowLeft":
       player.speedX -= 2;
       break;
    case "ArrowRight":
      player.speedX += 2;
      break; 
    }      
  });

document.addEventListener("keyup", (e) => {
  player.speedX = 0;
  player.speedY = 0;
}); 

