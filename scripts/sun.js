class Sun {
  constructor(width, height, color, x, y, ctx){
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.ctx = ctx;

  }
    drawSun(){
      this.ctx.beginPath();
      this.ctx.arc(850, 75, 60, 0, Math.PI *2);
      this.ctx.fillStyle = "yellow";
      this.ctx.fill();
      this.ctx.closePath();
    }
    shootRays(){

    }
}