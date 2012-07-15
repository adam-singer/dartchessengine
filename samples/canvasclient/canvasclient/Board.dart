

class Board {
  CanvasRenderingContext2D ctx;
  int ratio;
  int width;
  int height; 
  Map<String, BoardSquare> highlightsquares;
  Map<String, BoardSquare> squares; 
  Function piecemoves;
  
  final _highlightColor = "rgba(207, 247, 0, 0.9)";
  final _boxColor1 = "rgb(0, 127, 0)";
  final _boxColor2 = "rgb(251, 246, 229)";
  
  Board(this.ctx, [this.height = 400, this.width = 400]) {
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
  
  void select(int x, int y) {
    BoardSquare boardsquare;
    
    squares.forEach((k, v) {
      if (v.contains(x, y)) {
        v.highlighted = true;
        boardsquare = v;
      } else {
        v.highlighted = false;
      }
    });
    
    if (boardsquare != null && piecemoves != null) {
      piecemoves(boardsquare);
    }
  }
  
  
  
  draw() {
    squares.forEach((k,v) => v.draw(ctx));
  }
}
