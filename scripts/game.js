class Game {
  constructor(ctx, width, height, player, sun) {
    this.frames = 0;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.sun = sun;
    this.rays = [];
    this.interval = null;
    this.isRunning = false;
  }

  start() {
    this.interval = setInterval(this.updateGameArea, 20);
    this.isRunning = true;
  }

  reset = () => {
    this.player.x = 0;
    this.player.y = 280;
    this.sun.x = 550;
    this.sun.y = 75;
    this.rays.x = 520 ;
    this.rays.y = 60; 
    this.frames = 0;
    this.rays = [];
    this.start();
  };

 clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);

  }

  stop() {
    clearInterval(this.interval);
    this.isRunning = false;
  } 
   updateObstacles() {
    for (let i = 0; i < this.rays.length; i++) {
      if(this.player.x <= 550 && this.player.y <= 200){
        this.rays[i].x -= 2;
        this.rays[i].drawRays(); 
      } else if(this.player.x <= 550 && this.player.y > 200){
        this.rays[i].x -= 3;
        this.rays[i].y += 2;
        this.rays[i].drawRays(); 
      } else if(this.player.x > 550 && this.player.y <=200){
        this.rays[i].x += 2;
        this.rays[i].drawRays(); 
      }else{
        this.rays[i].x += 3;
        this.rays[i].y += 2;
        this.rays[i].drawRays(); 
      }
    }
    this.frames += 1;

     
if(this.frames % 60 === 0){

  if(this.player.x <= 550){
  let minHeight = 20;
  let maxHeight = 100;
  let minWidth = 10;
  let maxWidth = 25;

  let width = Math.floor(Math.random () *(maxWidth - minWidth +1) + minWidth);
  let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);

  this.rays.push(new Rays(width, height, 'yellow', 520, 80, this.ctx));
  } else{
  let minHeight = 20;
  let maxHeight = 100;
  let minWidth = 10;
  let maxWidth = 25;

  let width = Math.floor(Math.random () *(maxWidth - minWidth +1) + minWidth);
  let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);

  this.rays.push(new Rays(width, height, 'yellow', 600, 80, this.ctx));
  }
}
}

  checkGameOver = () => {
    const crashed = this.rays.some((rays) => {
      return this.player.crashWith(rays);
    });

    if (crashed) {
      this.stop();
    }
  };

  score() {
    const points = Math.floor(this.frames / 5);
    this.ctx.font = '24px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`Score: ${points}`, 850, 50);
  }  

  updateGameArea = () => {
    this.clear();
    this.checkGameOver(); 
    this.updateObstacles(); 
    this.rays.forEach((el) => {
      el.drawRays()
    })
   this.player.newPos();
    this.player.draw();
    this.sun.drawSun();
   this.score();  
  };
}
