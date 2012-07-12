#import('dart:io');
#import('../../Engine/ChessEngine.dart');

printBoardCellLocations() {
  StringBuffer sb = new StringBuffer();
  for (int i=0; i<8; i++) {
    for (int j=0; j<8; j++) {
        sb.add("[$j $i] ");
    }
    sb.add("\n");
  }
  
  print(sb.toString());
}

printBoard(Engine e) {
  printBoardCellLocations();
  print("HumanPlayer = ${e.HumanPlayer}");
  print("WhoseMove = ${e.WhoseMove}");
  StringBuffer sb = new StringBuffer();
  for (int i=0; i<8; i++) {
    for (int j=0; j<8; j++) {
      var pieceColor = e.GetPieceColorAt(j, i);
      var pieceType = e.GetPieceTypeAt(j, i);
      
      
      var c = pieceColor.toString().splitChars()[0];
      var t = pieceType.toString().splitChars()[0];
      
      if (t == "N") {
        //sb.add("[$c  ] ");
        sb.add("[   ] ");
      } else {
        sb.add("[$c $t] ");
      }
    }
    sb.add("\n");
  }
  
  print(sb.toString()); 
}

void main() {
  InputStream input = stdin;
  StringInputStream string_input = new StringInputStream(input);
  Engine e = new Engine();
  printBoard(e);
  
  string_input.onData = () {
    String s = string_input.readLine();
    print(s);
    
    List l = s.trim().split(new RegExp(" ", false, true));
    print(l);
    
    int src_col = Math.parseInt(l[0]);
    int src_row = Math.parseInt(l[1]);
    int dst_col = Math.parseInt(l[2]);
    int dst_row = Math.parseInt(l[3]);
    
    print("Player = ${e.WhoseMove.toString()}");
    
    var IsValidMove = e.IsValidMove(src_col, src_row, dst_col, dst_row);
    print("IsValidMove = ${IsValidMove}");
    
    if (IsValidMove == true) {
      var MovePiece = e.MovePiece(src_col, src_row, dst_col, dst_row);
      print("MovePiece = ${MovePiece}");
    } else {
      print("Not valid move");
    }
    
    printBoard(e);
  };
  
}
