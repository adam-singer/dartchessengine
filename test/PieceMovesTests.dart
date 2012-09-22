#import('package:unittest/unittest.dart');
#import('package:dartchessengine/chess_engine.dart');
//#import('../Engine/ChessEngine.dart');
//#import('/Users/adam/Documents/DartEditor/dart/dart-sdk/lib/unittest/unittest.dart');
//#import('package:unittest/unittest.dart');
//#import('../packages/unittest/unittest.dart');

final DEBUG=1;

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
  if (DEBUG!=1) return;
  
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
        sb.add("[$c  ] ");
      } else {
        sb.add("[$c $t] ");
      }
    }
    sb.add("\n");
  }
  
  print(sb.toString()); 
}


void main() {
  /*
  group('PieceMoves', () {
    test('InitiateChessPieceMotion', (){
      var BishopTotalMoves1Data = [7, 6, 5, 4, 3, 2, 1, 0, 6, 6, 5, 4, 3, 2, 1, 0, 5, 5, 5, 4, 3, 2, 1, 0, 4, 4, 4, 4, 3, 2, 1, 0, 3, 3, 3, 3, 3, 2, 1, 0, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var BishopTotalMoves2Data = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 6, 0, 1, 2, 3, 4, 5, 5, 5, 0, 1, 2, 3, 4, 4, 4, 4, 0, 1, 2, 3, 3, 3, 3, 3, 0, 1, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
      var BishopTotalMoves3Data = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 1, 0, 3, 3, 3, 3, 3, 2, 1, 0, 4, 4, 4, 4, 3, 2, 1, 0, 5, 5, 5, 4, 3, 2, 1, 0, 6, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0];
      var BishopTotalMoves4Data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 0, 1, 2, 3, 3, 3, 3, 3, 0, 1, 2, 3, 4, 4, 4, 4, 0, 1, 2, 3, 4, 5, 5, 5, 0, 1, 2, 3, 4, 5, 6, 6, 0, 1, 2, 3, 4, 5, 6, 7];
      var BlackPawnTotalMovesData = [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 4, 4, 4, 4, 3, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0];
      var WhitePawnTotalMovesData = [0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3, 2, 3, 4, 4, 4, 4, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0];
      var KnightTotalMovesData = [2, 3, 4, 4, 4, 4, 3, 2, 3, 4, 6, 6, 6, 6, 4, 3, 4, 6, 8, 8, 8, 8, 6, 4, 4, 6, 8, 8, 8, 8, 6, 4, 4, 6, 8, 8, 8, 8, 6, 4, 4, 6, 8, 8, 8, 8, 6, 4, 3, 4, 6, 6, 6, 6, 4, 3, 2, 3, 4, 4, 4, 4, 3, 2];
      var QueenTotalMoves1Data = [7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
      var QueenTotalMoves2Data = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7];
      var QueenTotalMoves3Data = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
      var QueenTotalMoves4Data = [7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0];
      var QueenTotalMoves5Data = [7, 6, 5, 4, 3, 2, 1, 0, 6, 6, 5, 4, 3, 2, 1, 0, 5, 5, 5, 4, 3, 2, 1, 0, 4, 4, 4, 4, 3, 2, 1, 0, 3, 3, 3, 3, 3, 2, 1, 0, 2, 2, 2, 2, 2, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var QueenTotalMoves6Data = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 6, 0, 1, 2, 3, 4, 5, 5, 5, 0, 1, 2, 3, 4, 4, 4, 4, 0, 1, 2, 3, 3, 3, 3, 3, 0, 1, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
      var QueenTotalMoves7Data = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2, 2, 1, 0, 3, 3, 3, 3, 3, 2, 1, 0, 4, 4, 4, 4, 3, 2, 1, 0, 5, 5, 5, 4, 3, 2, 1, 0, 6, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0];
      var QueenTotalMoves8Data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 2, 2, 2, 2, 2, 0, 1, 2, 3, 3, 3, 3, 3, 0, 1, 2, 3, 4, 4, 4, 4, 0, 1, 2, 3, 4, 5, 5, 5, 0, 1, 2, 3, 4, 5, 6, 6, 0, 1, 2, 3, 4, 5, 6, 7];
      var RookTotalMoves1Data = [7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
      var RookTotalMoves2Data = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7];
      var RookTotalMoves3Data = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
      var RookTotalMoves4Data = [7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0];
      var KingTotalMovesData = [3, 5, 5, 5, 5, 5, 5, 3, 5, 8, 8, 8, 8, 8, 8, 5, 5, 8, 8, 8, 8, 8, 8, 5, 5, 8, 8, 8, 8, 8, 8, 5, 5, 8, 8, 8, 8, 8, 8, 5, 5, 8, 8, 8, 8, 8, 8, 5, 5, 8, 8, 8, 8, 8, 8, 5, 3, 5, 5, 5, 5, 5, 5, 3];
      
      final PieceMoves pm = new PieceMoves();
      Expect.isNotNull(pm);
      final MoveArrays ma = pm.InitiateChessPieceMotion();
      Expect.isNotNull(ma);
      for (int i=0; i<64; i++) {
        Expect.equals(BishopTotalMoves1Data[i], ma.BishopTotalMoves1[i]);
        Expect.equals(BishopTotalMoves2Data[i], ma.BishopTotalMoves2[i]);
        Expect.equals(BishopTotalMoves3Data[i], ma.BishopTotalMoves3[i]);
        Expect.equals(BishopTotalMoves4Data[i], ma.BishopTotalMoves4[i]);
        Expect.equals(BlackPawnTotalMovesData[i], ma.BlackPawnTotalMoves[i]);
        Expect.equals(WhitePawnTotalMovesData[i], ma.WhitePawnTotalMoves[i]);
        Expect.equals(KnightTotalMovesData[i], ma.KnightTotalMoves[i]);
        Expect.equals(QueenTotalMoves1Data[i], ma.QueenTotalMoves1[i]);
        Expect.equals(QueenTotalMoves2Data[i], ma.QueenTotalMoves2[i]);
        Expect.equals(QueenTotalMoves3Data[i], ma.QueenTotalMoves3[i]);
        Expect.equals(QueenTotalMoves4Data[i], ma.QueenTotalMoves4[i]);
        Expect.equals(QueenTotalMoves5Data[i], ma.QueenTotalMoves5[i]);
        Expect.equals(QueenTotalMoves6Data[i], ma.QueenTotalMoves6[i]);
        Expect.equals(QueenTotalMoves7Data[i], ma.QueenTotalMoves7[i]);
        Expect.equals(QueenTotalMoves8Data[i], ma.QueenTotalMoves8[i]);
        
      }
    });
    
  });
  */
  
  /*
  group('Board', () {
    
    test('Creating a board', () {
      Board b = new Board();
      Expect.isNotNull(b);
    });
    
  });
  */ 
  
  /*
  group('Engine', () {
    test('Creating a Engine', () {
      print("Entering unit test");
      Engine e = new Engine();
      Expect.isNotNull(e);
      
      for (int i=0; i<8; i++) {
        for (int j=0; j<8; j++) {
          var pieceColor = e.GetPieceColorAt(j, i);
          var pieceType = e.GetPieceTypeAt(j, i);
          print("[$j, $i] = ${pieceColor.toString()} ${pieceType.toString()}");
        }
      }
      
      bool v = e.IsValidMove(1, 6, 1, 5);
      print ("v  = ${v}");
      //Expect.is
      //Expect.isTrue(v,"");
      expect(v, isTrue, "");
    
      printBoard(e);
      e.MovePiece(1, 6, 1, 5);
      printBoard(e);
      e.MovePiece(1, 5, 1, 4);
      printBoard(e);
      e.MovePiece(1, 4, 1, 3);
      printBoard(e);
      e.MovePiece(1, 3, 1, 2);
      printBoard(e);
      
      v = e.IsValidMove(1, 2, 1, 1);
      print("v = $v");
      
      e.MovePiece(1, 2, 1, 1);
      printBoard(e);
      e.MovePiece(1, 1, 1, 0);
      printBoard(e);

      var moves = e.GetValidMoves(0, 6);
      StringBuffer sb = new StringBuffer();
      sb.add("GetValidMoves(0, 6)\n");
      moves.forEach((m)=>sb.add("moves = $m\n"));
      print(sb.toString());
      
      moves = e.GetValidMoves(0, 7);
      sb = new StringBuffer();
      sb.add("GetValidMoves(0, 7)\n");
      moves.forEach((m)=>sb.add("moves = $m\n"));
      print(sb.toString());
    });
    */
    test('Test Game', () {
      Engine e = new Engine();
      Expect.isNotNull(e);
      printBoard(e);
      
      checkState(player, 
        src_col, src_row,
        dst_col, dst_row,
        src_piece_color, src_piece_type, 
        pre_dst_piece_color, pre_dst_piece_type,
        dst_piece_color, dst_piece_type) {
        expect(e.WhoseMove.toString(), matches(player), "");
        expect(e.GetPieceColorAt(src_col, src_row).toString(), matches(src_piece_color));
        expect(e.GetPieceTypeAt(src_col, src_row).toString(), matches(src_piece_type));
        expect(e.GetPieceColorAt(dst_col, dst_row).toString(), matches(pre_dst_piece_color));
        expect(e.GetPieceTypeAt(dst_col, dst_row).toString(), matches(pre_dst_piece_type));
        expect(e.IsValidMove(src_col, src_row, dst_col, dst_row), isTrue, "");
        expect(e.MovePiece(src_col, src_row, dst_col, dst_row), isTrue, "");
        expect(e.GetPieceColorAt(src_col, src_row).toString(), matches("White")); // Default color for an empty space is white
        expect(e.GetPieceColorAt(dst_col, dst_row).toString(), matches(dst_piece_color));
        expect(e.GetPieceTypeAt(dst_col, dst_row).toString(), matches(dst_piece_type));
        printBoard(e);
      };
      
      checkState("White", 
        1, 6, 1, 5, 
        "White", "Pawn", 
        "White", "None", 
        "White", "Pawn");
      
      checkState("Black", // Player
        1, 1, 1, 3,       // src_col, src_row, dst_col, dst_row,
        "Black", "Pawn",  // src_piece_color, src_piece_type, 
        "White", "None",  // pre_dst_piece_color, pre_dst_piece_type,
        "Black", "Pawn"); // dst_piece_color, dst_piece_type
      
      checkState("White",           // Player
                 1, 7, 2, 5,        // src_col, src_row, dst_col, dst_row,
                 "White", "Knight",   // src_piece_color, src_piece_type, 
                 "White", "None",   // pre_dst_piece_color, pre_dst_piece_type,
                 "White", "Knight");  // dst_piece_color, dst_piece_type
      
      checkState("Black",           // Player
        7, 1, 7, 3,        // src_col, src_row, dst_col, dst_row,
        "Black", "Pawn",   // src_piece_color, src_piece_type, 
        "White", "None",   // pre_dst_piece_color, pre_dst_piece_type,
        "Black", "Pawn");  // dst_piece_color, dst_piece_type
         
      checkState("White",           // Player
                 2, 5, 1, 3,        // src_col, src_row, dst_col, dst_row,
        "White", "Knight",   // src_piece_color, src_piece_type, 
        "Black", "Pawn",   // pre_dst_piece_color, pre_dst_piece_type,
        "White", "Knight");  // dst_piece_color, dst_piece_type
            
      checkState("Black",           // Player
        0, 1, 0, 3,        // src_col, src_row, dst_col, dst_row,
        "Black", "Pawn",   // src_piece_color, src_piece_type, 
        "White", "None",   // pre_dst_piece_color, pre_dst_piece_type,
        "Black", "Pawn");  // dst_piece_color, dst_piece_type      
    });
    
    
    test('Test Board',() {
      printBoard(new Engine.fromString("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"));
      printBoard(new Engine.fromString("rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2"));
      printBoard(new Engine.fromString("rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2"));
    });
}