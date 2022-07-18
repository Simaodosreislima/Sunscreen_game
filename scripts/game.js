class Game {
  constructor(ctx, width, height, player, sun) {
    this.frames = 0;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.sun = sun;
    this.rays = [];
    this.sharks = [];
  /*   this.background = new Image(); */
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
    this.sun.y = 0;
    this.frames = 0;
    this.rays = [];
    this.sharks = [];
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
    //rays array
    for (let i = 0; i < this.rays.length; i++) {
     if(this.player.x <= 550 && this.player.y > 270){
        this.rays[i].x -= 3;
        this.rays[i].y += 2;
        this.rays[i].drawRays(); 
      }else{
        this.rays[i].x += 3;
        this.rays[i].y += 2;
        this.rays[i].drawRays(); 
      }
    }
  /*   this.frames += 1; */

     
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
  //sharks array 
  for(let i = 0; i <this.sharks.length; i++){
    if(this.player.y > 150){
    this.sharks[i].x -=4;
    this.sharks[i].drawSharks();
    }
  }
  this.frames +=1;

  if(this.frames %60 === 0){
    if(this.player.y > 200){
      let height = 15;
      let width = 30;
      let minY = 270;
      let maxY = 499;
      let y = Math.floor(Math.random() * (maxY - minY +1) +minY);
      this.sharks.push(new Sharks(width,height, "green", 1000, y, this.ctx));
    }
  }
 

}


  checkGameOver = () => {
    const crashedRays = this.rays.some((rays) => {
      return this.player.crashWithRay(rays);
    });
/*     const crashedSharks = this.sharks.some((sharks) =>{
      return this.player.crashWith(sharks);
    }) */

    if (crashedRays) {
      this.stop();
    }
  };

  Timer() {
    const time = 45 - Math.floor(this.frames / 60); // just to test if the game stopped when countdown reached 0. It does.
    if(time === 0){
      this.stop();
      time = 0;
    }
   /*  this.ctx.strokeStyle = "red"; */
    this.ctx.fillStyle = "green";
    this.ctx.stroke();
    this.ctx.fillRect(850, 50, 100, 20);
    this.ctx.font = '24px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`${time}`, 850, 30);
  }  

  updateGameArea = () => {
    this.clear();
    this.checkGameOver(); 
    /* this.background.drawBackground(); */
    this.updateObstacles(); 
    this.rays.forEach((el) => {
      el.drawRays()
    })
    this.sharks.forEach((el) =>{
      el.drawSharks();
    })
   this.player.newPos();
    this.player.draw();
    this.sun.drawSun();
   this.Timer();  
  };
}
