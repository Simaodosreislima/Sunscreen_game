class Sun {
  constructor (x,y, radius,startAngle, endAngle,width,height, color, ctx){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.width = width;
    this.height = height;
    this.color = color;
    this.ctx = ctx;

  }
  
    drawSun(){
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, this.startAngle,this.endAngle);
      this.ctx.fill();
      this.ctx.closePath();
    }
  }