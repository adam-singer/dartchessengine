
#import('dart:html');

#source("../../canvasclient/Board.dart");
#source("../../canvasclient/BoardSquare.dart");
#source('../../canvasclient/Piece.dart');
#source('../../canvasclient/PieceData.dart');
#source('../../canvasclient/utils.dart');

void main() {
  CanvasElement canvas = query("#board");
  CanvasRenderingContext2D ctx = canvas.getContext("2d");
  
  Board board = new Board(ctx, null, height: canvas.height, width: canvas.width);
  
  canvas.on.mouseDown.add((MouseEvent e) {
    board.selectSquare(e.offsetX, e.offsetY);
  });
  
  canvas.on.touchStart.add((TouchEvent t) {
    if (t.touches.length == 1) {
      board.selectSquare(t.touches[0].clientX, t.touches[0].clientY); 
    }
  });
  
  anim(int t) {
    board.draw();
    window.requestAnimationFrame(anim);
  };
  
  window.requestAnimationFrame(anim);
}

