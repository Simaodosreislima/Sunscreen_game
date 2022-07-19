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
    /* this.image =  */
    this.interval = null;
    this.isRunning = false;
    this.time = 45 
    this.timer = null
  }

  start() {
    this.interval = setInterval(this.updateGameArea, 20);
    this.timer = setInterval(() => {
      this.time--
    }, 1000)
    this.isRunning = true;
  }

  reset = () => {
    this.player.x = 0;
    this.player.y = 280;
    this.sun.x = 550;
    this.sun.y = 0;
    this.frames = 0;
    this.time = 45;
    this.rays = [];
    this.sharks = [];
    this.start();
  };

 clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);

  }

  stop() {
    clearInterval(this.interval);
    clearInterval(this.timer)
    this.isRunning = false;
  }  
   updateObstacles() {
    //rays array
    for (let i = 0; i < this.rays.length; i++) {
     if(this.player.x <= 350 && this.player.y >= 270){
        this.rays[i].x -= 3;
        this.rays[i].y += 2;
        this.rays[i].drawRays(); 
      }else if (this.player.x > 350 && this.player.x <= 500 && this.player.y >= 270){
        this.rays[i].x -= 3;
        this.rays[i].y += 2;
        this.rays[i].drawRays(); 
      } else if (this.player.x > 500 && this.player.x <= 650 && this.player.y >= 270){
        this.rays[i].x += 0;
        this.rays[i].y += 7;
        this.rays[i].drawRays(); 
      } else if (this.player.x > 650 && this.player.x <= 800 && this.player.y >= 270){
        this.rays[i].x += 3;
        this.rays[i].y += 7;
        this.rays[i].drawRays(); 
      } else if (this.player.x > 800 && this.player.x <= 900 && this.player.y >= 270){
        this.rays[i].x += 7;
        this.rays[i].y += 7;
        this.rays[i].drawRays(); 
      }else {
        this.rays[i].x += 7;
        this.rays[i].y += 7;
        this.rays[i].drawRays(); 
    }
  }

     
if(this.frames % 60 === 0){

  if(this.player.x){
  let minHeight = 20;
  let maxHeight = 100;
  let minWidth = 10;
  let maxWidth = 25;

  let width = Math.floor(Math.random () *(maxWidth - minWidth +1) + minWidth);
  let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);

  this.rays.push(new Rays(width, height, 'yellow', 520, 80, this.ctx));
  } 
}
  //sharks array 
  for(let i = 0; i <this.sharks.length; i++){
    if(this.player.y > 250){
    this.sharks[i].x -=7;
    this.sharks[i].drawSharks();
    }
  }
  

  if(this.frames %60 === 0){
    if(this.player.y > 200 && this.player.y <= 350){
      let height = 15;
      let width = 30;
      let minY = 270;
      let maxY = 350;
      let y = Math.floor(Math.random() * (maxY - minY +1) +minY);
      this.sharks.push(new Sharks(width,height, "green", 1000, y, this.ctx));
    } else if(this.player.y > 350 && this.player.y <= 400){
      let height = 15;
      let width = 30;
      let minY = 350;
      let maxY = 400;
      let y = Math.floor(Math.random() * (maxY - minY +1) +minY);
      this.sharks.push(new Sharks(width,height, "green", 1000, y, this.ctx));
    } else if(this.player.y > 400 && this.player.y <= 450){
      let height = 15;
      let width = 30;
      let minY = 400;
      let maxY = 450;
      let y = Math.floor(Math.random() * (maxY - minY +1) +minY);
      this.sharks.push(new Sharks(width,height, "green", 1000, y, this.ctx));
    } else{
      let height = 15;
      let width = 30;
      let minY = 450;
      let maxY = 470;
      let y = Math.floor(Math.random() * (maxY - minY +1) +minY);
      this.sharks.push(new Sharks(width,height, "green", 1000, y, this.ctx));

    }
  }
 

}


  checkGameOver = () => {
    const crashedRays = this.rays.some((rays) => {
      return this.player.crashWithRay(rays);
    });
    const crashedSharks = this.sharks.some((sharks) =>{
      return this.player.crashWithShark(sharks);
    }) 

    if (crashedRays) {
      this.stop();
    }
    if(crashedSharks){
      this.stop();
    }
  };

  countTime() {
    // just to test if the game stopped when countdown reached 0. It does.
    if(this.time === 0){
      this.stop();
      this.time = 0;
    }
   /*  this.ctx.strokeStyle = "red"; */
    this.ctx.fillStyle = "green";
    this.ctx.strokeRect(850, 50, 45, 20);
    this.ctx.fillRect(850, 50, this.time, 20);
    this.ctx.font = '24px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`${this.time}`, 850, 30);
  }  

  updateGameArea = () => {
    this.frames++
    /* this.time -= Math.floor(this.frames / 1000) */
    this.clear();
/*     this.drawBackground(); */
    this.checkGameOver(); 
    /* this.background.drawBackground(); */
    this.updateObstacles(); 
    this.rays.forEach((el) => {
      el.drawRays();
    })
    this.sharks.forEach((el) =>{
      el.drawSharks();
    })
   this.player.newPos();
    this.player.draw();
    this.sun.drawSun();
   this.countTime();  
  };
}