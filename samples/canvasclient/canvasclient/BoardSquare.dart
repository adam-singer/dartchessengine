class BoardSquare {
  int row;
  int col;
  int x, y, w, h;
  String fill;
  bool highlighted;
  String highlightFill;
  
  BoardSquare([this.col=0, this.row=0, this.x=0, this.y=0, this.w=0, this.h=0, this.fill='#AAAAAA', this.highlighted = false, this.highlightFill = "rgba(207, 247, 0, 0.9)"]); 
  
  void draw(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    if (highlighted) {
          ctx.fillStyle = highlightFill;
          ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    
  }
  
  bool contains(mx, my) {
    return  (this.x < mx) && (this.x + this.w > mx) &&
        (this.y < my) && (this.y + this.h > my);
  }
}