
class Board {
  ChessEngine.Engine engine;
  CanvasRenderingContext2D ctx;
  List<Piece> pieces;
  int ratio;
  int width;
  int height; 
  BoardSquare selectedSquare;
  Map<String, BoardSquare> highlightsquares;
  Map<String, BoardSquare> squares; 
  Function piecemoves;
  
  final _highlightColor = "rgba(207, 247, 0, 0.9)";
  final _boxColor1 = "rgb(0, 127, 0)";
  final _boxColor2 = "rgb(251, 246, 229)";
  
  Board(this.ctx, this.engine, [this.height = 400, this.width = 400]) {
    ratio = (height / width).toInt();
    highlightsquares = {};
    squares = {};
    
    int i, j;
    var sz = 50 * ratio;
    
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if ((i + j) % 2 == 1) {
              squares["$i $j"] = new BoardSquare(col: i, row: j, x: i*sz, y: j*sz, w: sz, h: sz, fill: _boxColor1);
            } else if ((i + j) % 2 == 0) {
              squares["$i $j"] = new BoardSquare(col: i, row: j, x: i*sz, y: j*sz, w: sz, h: sz, fill: _boxColor2);
            }
        }
    }
  }
   
  void highlight(int col, int row) {
    if (squares.containsKey("$col $row")) {
      squares["$col $row"].highlighted = true;
    }
  }
  
  void selectSquare(int x, int y) {
    // This smells of state pattern
    if (selectedSquare == null) {
      squares.forEach((k, v) {
        if (v.contains(x, y)) {
          
          print("engine.IsSquareWhoseMove(v.col, v.row) = ${engine.IsSquareWhoseMove(v.col, v.row)}");
          if (engine.IsSquareWhoseMove(v.col, v.row)) {
            v.highlighted = true;
            selectedSquare = v;
            List<List<int>> moves = engine.GetValidMoves(v.col, v.row);
            moves.forEach((sq) {
              highlight(sq[0], sq[1]);
            });
          }
        } else {
          v.highlighted = false;
        }
      });
    } else {
      bool selectedSquareMoves = true;
      var tmp_selectedSquare = null;
      squares.forEach((k, v) {
        if (v.contains(x, y)) {
          if (engine.IsSquareWhoseMove(v.col, v.row)) {
            v.highlighted = true;
            tmp_selectedSquare = v;
            selectedSquareMoves = false;
          }
        } else {
          v.highlighted = false;
        }
      });
      
        if (selectedSquareMoves == false && tmp_selectedSquare != null) {
          selectedSquare = tmp_selectedSquare;
        } else {
          // possible attacking or move selected
         
          BoardSquare dest_square;
          squares.forEach((kk, vv) {
            if (vv.contains(x, y)) {
              dest_square = vv;
            } 
          });
          
          if (dest_square != null) {
          
            bool validMove = engine.IsValidMove(selectedSquare.col, selectedSquare.row, 
              dest_square.col, dest_square.row);
            
            print("validMove = ${validMove}");
            
            if (validMove) {
              bool moveSuccess = engine.MovePiece(selectedSquare.col, selectedSquare.row, 
                dest_square.col, dest_square.row);
              
              print("selectedSquare.col = ${selectedSquare.col}");
              print("selectedSquare.row = ${selectedSquare.row}");
              print("dest_square.col = ${dest_square.col}");
              print("dest_square.row = ${dest_square.row}");
              
              String src_sq =  Utils.toSquare(1 + selectedSquare.col, 8 - selectedSquare.row);
              String dest_sq = Utils.toSquare(1 + dest_square.col, 8 - dest_square.row);
              print("src_sq = ${src_sq}");
              print("dest_sq = ${dest_sq}");
              
              pieces.forEach((p){
                if (p.sq == src_sq) {
                  print("setting p=${p} .sq = ${dest_sq}");
                  p.sq = dest_sq;
                }
              });
              
              selectedSquare = null;
            }
          }
        }
    }
  }
  
  
  
  draw() {
    squares.forEach((k,v) => v.draw(ctx));
  }
}
