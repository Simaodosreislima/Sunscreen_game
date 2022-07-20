class Sharks {
  constructor (width, height, color, x, y, ctx){
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.speedX = 0;
    this.speedY = 0;
    const img = new Image();
    img.addEventListener('load', () => {} )
    img.src = '../docs/assets/images/shark-50x25-transparent.png'
    this.img = img;

  } 
    drawSharks(){  
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    left(){
      return this.x;
    }
    right(){
      return this.x + this.width;
    }
    top(){
      return this.y;
    }
    bottom(){
      return this.y + this.height;
    }
    
  }

 
