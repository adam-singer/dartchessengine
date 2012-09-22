#import('../Engine/ChessEngine.dart');
//#import('/Users/adam/Documents/DartEditor/dart/dart-sdk/lib/unittest/unittest.dart');
//#import('package:unittest/unittest.dart');
#import('../packages/unittest/unittest.dart');

class PGNParserTest {
  
}

printBoard(board) {
    
    for (int i = 7; i >= 0; i--) {
      StringBuffer sb = new StringBuffer();
      for (int j = 0; j < 8; j++) {
        sb.add("${board[j][i]}\t");
      }
      
      print(sb.toString());
    }
    
    print("");
  }

void main() {
  test('Print Parser Board', () {
    var p = new PGNParser();
    var c = p.createDefaultBoard();
    print(c);
    print(p.MOVE_TYPE_2_RE);
    print(p.KNIGHT_SEARCH_PATH);
    printBoard(c);
  });
}