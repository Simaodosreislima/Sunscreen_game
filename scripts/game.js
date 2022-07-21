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
    this.interval = null;
    this.isRunning = false;
    this.time = 45 
    this.timer = null
    this.backgroundX = 0
    this.backgroundSpeed = -1;
    const img = new Image();
    img.addEventListener('load', () => {} )
    img.src = './docs/assets/images/background-image.jpg'
    this.img = img;
  }

  start() {
    this.interval = setInterval(this.updateGameArea, 20);
    this.timer = setInterval(() => {
      this.time--
    }, 1000)
    this.isRunning = true;
  }

  reset = () => {
    this.player.x = 1;
    this.player.y = 270;
    this.sun.x = 550;
    this.sun.y = 0;
    this.frames = 0;
    this.img.src = './docs/assets/images/background-image.jpg'; // only if i have this line, the game stop impleting the last image on reset
    this.time = 45;
    this.rays = [];
    this.sharks = [];
    this.start();
  };

 clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);

  }
// The problem should be here
  drawBackground(){
    this.backgroundX += this.backgroundSpeed;
    this.backgroundX %= this.width;
     if(this.frames > 1600){
      this.img.src = './docs/assets/images/beach.png';
      this.backgroundX = 0;
      this.player.y = 400; // mainly to fit the player in the right place in the photo
      this.sharks=[]; // eliminates sharks as the player gets to the beach
      this.rays=[]; // eliminates rays as the player gets to the beach
     
    }
     
    this.ctx.drawImage(this.img, this.backgroundX , 0)

    if(this.backgroundSpeed < 0){
      this.ctx.drawImage(this.img, this.backgroundX + this.width , 0,)
    } else {
      this.ctx.drawImage(this.img, this.backgroundX - this.img.width, 0)

    }
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
        this.rays[i].x += 2;
        this.rays[i].y += 3;
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
      let minY = 270;
      let maxY = 350;
      let y = Math.floor(Math.random() * (maxY - minY +1) +minY);
      this.sharks.push(new Sharks(50,30, "green", 1000, y, this.ctx));
    } else if(this.player.y > 350 && this.player.y <= 400){
      let minY = 350;
      let maxY = 400;
      let y = Math.floor(Math.random() * (maxY - minY +1) +minY);
      this.sharks.push(new Sharks(50,30, "green", 1000, y, this.ctx));
    } else if(this.player.y > 400 && this.player.y <= 450){
      let minY = 400;
      let maxY = 450;
      let y = Math.floor(Math.random() * (maxY - minY +1) +minY);
      this.sharks.push(new Sharks(50,30, "green", 1000, y, this.ctx));
    } else{
      let minY = 450;
      let maxY = 470;
      let y = Math.floor(Math.random() * (maxY - minY +1) +minY);
      this.sharks.push(new Sharks(50,30, "green", 1000, y, this.ctx));

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
      this.player.x = 475;
      this.player.y = 350;
      this.rays = [];
      this.sharks =[];
      this.ctx.font = "45px Edu VIC WA NT Beginner, cursive";
      this.ctx.fillStyle= "antiqueWhite";
      this.ctx.fillText("Apply sunscreen next time!", 250, 300);

    }
    if(crashedSharks){
      this.stop();
      this.player.x = 475;
      this.player.y = 350;
      this.sharks =[];
      this.rays =[];
      this.ctx.font = "45px Edu VIC WA NT Beginner, cursive";
      this.ctx.fillStyle= "antiqueWhite";
      this.ctx.fillText("Avoid being eaten next time!", 250, 300);
      
    }

    if(crashedRays && crashedSharks){
      this.stop();
      this.player.x = 475;
      this.player.y = 350;
      this.sharks =[];
      this.rays =[];
      this.ctx.font = "20px Edu VIC WA NT Beginner, cursive";
      this.ctx.fillStyle= "antiqueWhite";
      this.ctx.fillText("Damn, did you really just get hit by a ray and a shark? You suck", 250, 300);
    }

    if(this.frames >  1600  && this.player.x >= 635 && this.player.y === 400){
     /*  this.img.src = './docs/assets/images/sunscreen.png'; */
      this.stop();
    }
 
  };

  countTime() {
    // just to test if the game stopped when countdown reached 0. It does.
    if(this.time === 0){
      this.stop();
      this.time = 0;
      this.ctx.font = "45px Edu VIC WA NT Beginner, cursive";
      this.ctx.fillStyle= "antiqueWhite";
      this.ctx.fillText("Look at the clock next time!", 225, 250);
    }

    this.ctx.fillStyle = "green";
    this.ctx.strokeRect(150, 50, 45, 20);
    this.ctx.fillRect(150, 50, this.time, 20);
    this.ctx.font = '24px sans-serif';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(`${this.time} seconds`, 150, 30);
  }  

  updateGameArea = () => {
    this.frames++
    this.clear();
    this.drawBackground();
    this.checkGameOver(); 
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