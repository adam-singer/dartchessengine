
class Board {
  int ratio;
  CanvasRenderingContext2D ctx;
  
  Board() {
    CanvasElement canvas = query("#board");
    ratio = (canvas.height / 400).toInt();
    ctx = canvas.getContext("2d");
  }
  
  draw() {
    int i, j;
    var sz = 50 * ratio;
    ctx.fillStyle = "rgb(0,127,0)";
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if ((i + j) % 2 == 1) {
                ctx.fillRect (i*sz, j*sz, sz, sz);
            }
        }
    }
    ctx.fillStyle = "rgb(251,246,229)";
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if ((i + j) % 2 == 0) {
                ctx.fillRect (i*sz, j*sz, sz, sz);
            }
        }
    }
  }
}
