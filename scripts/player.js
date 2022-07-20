class Player{
  constructor(width, height, color, x, y, ctx){
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
    img.src = './docs/assets/images/swimmer-100x50-transparent.png'
    this.img = img;
  }
 

   newPos(){
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < 270) {
        this.y = 270
    }  else if(this.y + this.height > cHeight ){
      this.y = cHeight - this.height
    } else if(this.x < 0){
      this.x = 0
    } else if(this.x + this.width > cWidth){
      this.x = cWidth - this.width
    }
  }
  
    draw(){
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
    
    crashWithRay(ray){
      return !(
        this.bottom() < ray.top()  ||
        this.top() > ray.bottom()|| 
        this.right() < ray.left() || 
        this.left() > ray.right()
      );
      }
      crashWithShark(shark){
        return !(
          this.bottom() < shark.top()  ||
          this.top() > shark.bottom()|| 
          this.right() < shark.left() || 
          this.left() > shark.right()
        );
        }


    }
  