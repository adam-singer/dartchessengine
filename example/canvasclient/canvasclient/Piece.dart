
class Piece {
  ImageElement img;
  int ratio; 
  CanvasRenderingContext2D ctx;
  String sq;
  String data;
  int sz;
  String name; 
  
  Piece(this.ctx, this.ratio, this.name, this.data, this.sq) {
    sz = ratio * 50;
    img = new ImageElement();
    img.src = this.data;
    img.on.load.add( (e) {
      draw();
    });
    
    
  }
  
  draw() {
    var x = (sq.charCodeAt(0) - 97) * sz;
    var y = (8 * sz) - (sq.charCodeAt(1) - 48) * sz;
    ctx.drawImage(img, x, y, sz, sz);
    //print("drawImage($x, $y, $sz, $sz)");
  }
}
