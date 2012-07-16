
#import('dart:html');
#import('../../../Engine/ChessEngine.dart', prefix: "ChessEngine");
#source("Board.dart");
#source("BoardSquare.dart");
#source('Piece.dart');
#source('PieceData.dart');
#source('utils.dart');

class Game {
  ChessEngine.Engine engine;
  Board board;
  List<Piece> pieces;
  CanvasElement canvas;
  CanvasRenderingContext2D _ctx;
  int _ratio;
  
  Game(this.canvas, this.engine) {
    _ctx = canvas.getContext("2d");
    board = new Board(_ctx, engine, height: canvas.height, width: canvas.width);
    this._ratio = board.ratio;
    pieces = [];
    pieces.add(new Piece(_ctx, _ratio, "White King", PieceData.wk, "e1"));
    pieces.add(new Piece(_ctx, _ratio, "Black King", PieceData.bk, "e8"));

    pieces.add(new Piece(_ctx, _ratio, "White Queen", PieceData.wq, "d1"));
    pieces.add(new Piece(_ctx, _ratio, "Black Queen", PieceData.bq, "d8"));

    pieces.add(new Piece(_ctx, _ratio, "White Bishop", PieceData.wb, "c1"));
    pieces.add(new Piece(_ctx, _ratio, "White Bishop", PieceData.wb, "f1"));
    pieces.add(new Piece(_ctx, _ratio, "Black Bishop", PieceData.bb, "c8"));
    pieces.add(new Piece(_ctx, _ratio, "Black Bishop", PieceData.bb, "f8"));

    pieces.add(new Piece(_ctx, _ratio, "White Knight", PieceData.wn, "b1"));
    pieces.add(new Piece(_ctx, _ratio, "White Knight", PieceData.wn, "g1"));
    pieces.add(new Piece(_ctx, _ratio, "Black Knight", PieceData.bn, "b8"));
    pieces.add(new Piece(_ctx, _ratio, "Black Knight", PieceData.bn, "g8"));

    pieces.add(new Piece(_ctx, _ratio, "White Rook", PieceData.wr, "a1"));
    pieces.add(new Piece(_ctx, _ratio, "White Rook", PieceData.wr, "h1"));
    pieces.add(new Piece(_ctx, _ratio, "Black Rook", PieceData.br, "a8"));
    pieces.add(new Piece(_ctx, _ratio, "Black Rook", PieceData.br, "h8"));

    pieces.add(new Piece(_ctx, _ratio, "White Pawn", PieceData.wp, "a2"));
    pieces.add(new Piece(_ctx, _ratio, "White Pawn", PieceData.wp, "b2"));
    pieces.add(new Piece(_ctx, _ratio, "White Pawn", PieceData.wp, "c2"));
    pieces.add(new Piece(_ctx, _ratio, "White Pawn", PieceData.wp, "d2"));
    pieces.add(new Piece(_ctx, _ratio, "White Pawn", PieceData.wp, "e2"));
    pieces.add(new Piece(_ctx, _ratio, "White Pawn", PieceData.wp, "f2"));
    pieces.add(new Piece(_ctx, _ratio, "White Pawn", PieceData.wp, "g2"));
    pieces.add(new Piece(_ctx, _ratio, "White Pawn", PieceData.wp, "h2"));
    pieces.add(new Piece(_ctx, _ratio, "Black Pawn", PieceData.bp, "a7"));
    pieces.add(new Piece(_ctx, _ratio, "Black Pawn", PieceData.bp, "b7"));
    pieces.add(new Piece(_ctx, _ratio, "Black Pawn", PieceData.bp, "c7"));
    pieces.add(new Piece(_ctx, _ratio, "Black Pawn", PieceData.bp, "d7"));
    pieces.add(new Piece(_ctx, _ratio, "Black Pawn", PieceData.bp, "e7"));
    pieces.add(new Piece(_ctx, _ratio, "Black Pawn", PieceData.bp, "f7"));
    pieces.add(new Piece(_ctx, _ratio, "Black Pawn", PieceData.bp, "g7"));
    pieces.add(new Piece(_ctx, _ratio, "Black Pawn", PieceData.bp, "h7"));
  
    board.pieces = pieces;
    
  canvas.on.mouseDown.add((MouseEvent e) {
    board.selectSquare(e.offsetX, e.offsetY);
  });
  
  }
  
  
  draw() {
    board.draw();
    pieces.forEach((p)=>p.draw());
  }
  
  anim(int i) {
    draw();
    window.requestAnimationFrame(anim);
  }
}

void main() {
  CanvasElement canvas = query("#board");
  ChessEngine.Engine engine = new ChessEngine.Engine();
  Game game = new Game(canvas, engine);
  window.requestAnimationFrame(game.anim);
  

//    
//    print("setting piece selection");
//    
//    List<List<int>> moves = engine.GetValidMoves(boardsquare.col, boardsquare.row);
//    
//    if (moves != null) {
//      if (moves.length != 0) {
//        engine.SetChessPieceSelection(boardsquare.col, boardsquare.row, true);
//      }
//      
//      moves.forEach((sq) {
//        b.highlight(sq[0], sq[1]);
//      });
//    }
//  };
//  
//  

}
