
#import('dart:html');
#import('../../../Engine/ChessEngine.dart', prefix: "ChessEngine");
#source("Board.dart");
#source("BoardSquare.dart");
#source('Piece.dart');
#source('PieceData.dart');
#source('utils.dart');

num rotatePos = 0;

void main() {
  CanvasElement canvas = query("#board");
  CanvasRenderingContext2D ctx = canvas.getContext("2d");
  
  ChessEngine.Engine engine = new ChessEngine.Engine();
  
  List components = [];
  
  Board b = new Board(ctx, height: canvas.height, width: canvas.width);
  b.piecemoves = (BoardSquare boardsquare) {
    List<List<int>> moves = engine.GetValidMoves(boardsquare.col, boardsquare.row);
    
    if (moves != null) {
      moves.forEach((sq) {
        b.highlight(sq[0], sq[1]);
      });
    }
  };
  b.draw();
  
  components.add(b);
  
  components.add(new Piece(b.ctx, b.ratio, "White King", PieceData.wk, "e1"));
  components.add(new Piece(b.ctx, b.ratio, "Black King", PieceData.bk, "e8"));

  components.add(new Piece(b.ctx, b.ratio, "White Queen", PieceData.wq, "d1"));
  components.add(new Piece(b.ctx, b.ratio, "Black Queen", PieceData.bq, "d8"));

  components.add(new Piece(b.ctx, b.ratio, "White Bishop", PieceData.wb, "c1"));
  components.add(new Piece(b.ctx, b.ratio, "White Bishop", PieceData.wb, "f1"));
  components.add(new Piece(b.ctx, b.ratio, "Black Bishop", PieceData.bb, "c8"));
  components.add(new Piece(b.ctx, b.ratio, "Black Bishop", PieceData.bb, "f8"));

  components.add(new Piece(b.ctx, b.ratio, "White Knight", PieceData.wn, "b1"));
  components.add(new Piece(b.ctx, b.ratio, "White Knight", PieceData.wn, "g1"));
  components.add(new Piece(b.ctx, b.ratio, "Black Knight", PieceData.bn, "b8"));
  components.add(new Piece(b.ctx, b.ratio, "Black Knight", PieceData.bn, "g8"));

  components.add(new Piece(b.ctx, b.ratio, "White Rook", PieceData.wr, "a1"));
  components.add(new Piece(b.ctx, b.ratio, "White Rook", PieceData.wr, "h1"));
  components.add(new Piece(b.ctx, b.ratio, "Black Rook", PieceData.br, "a8"));
  components.add(new Piece(b.ctx, b.ratio, "Black Rook", PieceData.br, "h8"));

  components.add(new Piece(b.ctx, b.ratio, "White Pawn", PieceData.wp, "a2"));
  components.add(new Piece(b.ctx, b.ratio, "White Pawn", PieceData.wp, "b2"));
  components.add(new Piece(b.ctx, b.ratio, "White Pawn", PieceData.wp, "c2"));
  components.add(new Piece(b.ctx, b.ratio, "White Pawn", PieceData.wp, "d2"));
  components.add(new Piece(b.ctx, b.ratio, "White Pawn", PieceData.wp, "e2"));
  components.add(new Piece(b.ctx, b.ratio, "White Pawn", PieceData.wp, "f2"));
  components.add(new Piece(b.ctx, b.ratio, "White Pawn", PieceData.wp, "g2"));
  components.add(new Piece(b.ctx, b.ratio, "White Pawn", PieceData.wp, "h2"));
  components.add(new Piece(b.ctx, b.ratio, "Black Pawn", PieceData.bp, "a7"));
  components.add(new Piece(b.ctx, b.ratio, "Black Pawn", PieceData.bp, "b7"));
  components.add(new Piece(b.ctx, b.ratio, "Black Pawn", PieceData.bp, "c7"));
  components.add(new Piece(b.ctx, b.ratio, "Black Pawn", PieceData.bp, "d7"));
  components.add(new Piece(b.ctx, b.ratio, "Black Pawn", PieceData.bp, "e7"));
  components.add(new Piece(b.ctx, b.ratio, "Black Pawn", PieceData.bp, "f7"));
  components.add(new Piece(b.ctx, b.ratio, "Black Pawn", PieceData.bp, "g7"));
  components.add(new Piece(b.ctx, b.ratio, "Black Pawn", PieceData.bp, "h7"));
 
  canvas.on.mouseDown.add((MouseEvent e) {
    b.select(e.offsetX, e.offsetY);
  });
  
  canvas.on.touchStart.add((TouchEvent t) {
    if (t.touches.length == 1) {
      b.select(t.touches[0].clientX, t.touches[0].clientY); 
    }
  });
  
  anim(int t) {
    components.forEach((c) => c.draw());
    window.requestAnimationFrame(anim);
  };
  
  window.requestAnimationFrame(anim);
}
