#import('../Engine/ChessEngine.dart');
//#import('/Users/adam/Documents/DartEditor/dart/dart-sdk/lib/unittest/unittest.dart');
//#import('package:unittest/unittest.dart');
#import('../packages/unittest/unittest.dart');


class PieceMovesTests {
  
}

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
  
  
  
  group('Board', () {
    
    test('Creating a board', () {
      Board b = new Board();
      Expect.isNotNull(b);
    });
    
  });
  
  
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
    
  });
  
}