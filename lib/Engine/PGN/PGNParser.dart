/*
 * @author Deyan Rizov
 * 
 * This file is part of PGNParse.
 *
 * PGNParse is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * PGNParse is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PGNParse.  If not, see <http://www.gnu.org/licenses/>. 
 */
class PGNParser {
  String PAWN = "P";
  
  String KNIGHT = "N";
  
  String BISHOP = "B";
  
  String ROOK = "R";
  
  String QUEEN = "Q";
  
  String KING = "K";
  
  final WHITE = -1;
  
  final BLACK = 1;
  
  final WHITE_PAWN = -1;
  
  final WHITE_KNIGHT = -2;
  
  final WHITE_BISHOP = -3;
  
  final WHITE_ROOK = -4;
  
  final WHITE_QUEEN = -5;
  
  final WHITE_KING = -6;
  
  final EMPTY = 0;
  
  final BLACK_PAWN = 1;
  
  final BLACK_KNIGHT = 2;
  
  final BLACK_BISHOP = 3;
  
  final BLACK_ROOK = 4;
  
  final BLACK_QUEEN = 5;
  
  final BLACK_KING = 6;
  
  String MOVE_TYPE_1_RE = "[a-h][1-8]";
  
  final int MOVE_TYPE_1_LENGTH = 2;
  
  String MOVE_TYPE_2_RE;
  
  final int MOVE_TYPE_2_LENGTH = 3;
  
  String MOVE_TYPE_3_RE;
  
  final int MOVE_TYPE_3_LENGTH = 4;
  
  String MOVE_TYPE_4_RE;
  
  final int MOVE_TYPE_4_LENGTH = 5;
  
  String MOVE_TYPE_5_RE = "[a-h][a-h][1-8]";
  
  String MOVE_TYPE_6_RE;
  
  final List<List<int>> KNIGHT_SEARCH_PATH = const [ const [ -1, 2 ], const [ 1, 2 ], const [ -1, -2 ], const [ 1, -2 ], const [ -2, 1 ], const [ -2, -1 ], const [ 2, -1 ], const [ 2, 1 ] ];
  
  final List<List<int>> BISHOP_SEARCH_PATH = const [ const [1, 1], const [1, -1], const [-1, -1], const [-1, 1] ];
  
  final List<List<int>> ROOK_SEARCH_PATH = const [ const [0, 1], const [1, 0], const [0, -1], const [-1, 0] ];
  
  final List<List<int>> QUEEN_KING_SEARCH_PATH = const [ const [1, 1], const [1, -1], const [-1, -1], const [-1, 1], const [0, 1], const [1, 0], const [0, -1], const [-1, 0] ];
  
  PGNParser() {
    MOVE_TYPE_2_RE = "[${PAWN}${KNIGHT}${BISHOP}${ROOK}${QUEEN}${KING}][a-h][1-8]";
    MOVE_TYPE_3_RE = "[${PAWN}${KNIGHT}${BISHOP}${ROOK}${QUEEN}${KING}][a-h][a-h][1-8]";
    MOVE_TYPE_4_RE = "[${PAWN}${KNIGHT}${BISHOP}${ROOK}${QUEEN}${KING}][a-h][1-8][a-h][1-8]";
    MOVE_TYPE_6_RE = "[${PAWN}${KNIGHT}${BISHOP}${ROOK}${QUEEN}${KING}][1-8][a-h][1-8]";
  }
  
  List<PGNGame> parse(String pgn) {
    throw "Not Implemented";
  }
  
  List<PGNGame> parseForce(String pgn, boolean force) {
    throw "Not Implemented";
  }
  
  PGNGame _parsePGNGame(String pgn) {
    throw "Not Implemented";
  }
  
  void _handleRawMoves(List<String> rawMoves, PGNGame game, List<List<int>> board, List<int> color) {
    throw "Not Implemented";
  }
  
  List<String> _splitPGN(String pgn) {
    throw "Not Implemented";
  }
  
  void _updateNextMove(PGNMove move, List<List<int>> board) {
    throw "Not Implemented";
  }
  
  void _handleMoveType1(PGNMove move, String strippedMove, int color, List<List<int>> board) {
    throw "Not Implemented";
  }
  
  void _handleMoveType2(PGNMove move, String strippedMove, int color, List<List<int>> board) {
    throw "Not Implemented";
  }
  
  void _handleMoveType3(PGNMove move, String strippedMove, int color, List<List<int>> board) {
    throw "Not Implemented";
  }
  
  void _handleMoveType4(PGNMove move, String strippedMove, int color, List<List<int>> board) {
    throw "Not Implemented";
  }
  
  void _handleMoveType5(PGNMove move, String strippedMove, int color, List<List<int>> board) {
    throw "Not Implemented";
  }
  
  void _handleMoveType6(PGNMove move, String strippedMove, int color, List<List<int>> board) {
    throw "Not Implemented";
  }
  
  void _switchColor(List<int> color) {
    throw "Not Implemented";
  }
  
  int _getChessATOI(String alfa) {
    return alfa.charCodeAt(0) - 'a'.charCodeAt(0);
  }
  
  String _getChessCoords(int hPos, int vPos) {
    return new String.fromCharCodes(['a'.charCodeAt(0)+hPos, vPos+1]);
  }
  
  int _getPawnvPos(int hPos, int vPos, int piece, List<List<int>> board) {
    throw "Not Implemented";
  }
  
  List<int> _getSingleMovePiecePos(int hPos, int vPos, int piece, List<List<int>> board, List<List<int>> moveData) {
    throw "Not Implemented";
  }
  
  int _getSingleMovePiecevPosFromhPos(int hPos, int vPos, int fromhPos, int piece, List<List<int>> board, List<List<int>> moveData) {
    throw "Not Implemented";
  }
  
  int _getSingleMovePiecehPos(int hPos, int vPos, int fromvPos, int piece, List<List<int>> board, List<List<int>> moveData) {
    throw "Not Implemented";
  }
  
  List<int> _getMultiMovePiecePos(int hPos, int vPos, int piece, List<List<int>> board, List<List<int>> moveData) {
    throw "Not Implemented";
  }
  
  List<int> _getMultiMovePiecePosRec(int originalhPos, int originalvPos, int hPos, int vPos, int hAdd, int vAdd, int piece, List<List<int>> board) {
    throw "Not Implemented";
  }
  
  int _getMultiMovePiecevPos(int hPos, int vPos, int fromhPos, int piece, List<List<int>> board, List<List<int>> moveData) {
    throw "Not Implemented";
  }
  
  int _getMultiMovePiecevPosRec(int originalhPos, int originalvPos, int hPos, int vPos, int hAdd, int vAdd, int fromhPos, int piece, List<List<int>> board) {
    throw "Not Implemented";
  }
  
  int _getMultiMovePiecehPos(int hPos, int vPos, int fromvPos, int piece, List<List<int>> board, List<List<int>> moveData) {
    throw "Not Implemented";
  }
  
  int _getMultiMovePiecehPosRec(int originalhPos, int originalvPos, int hPos, int vPos, int hAdd, int vAdd, int fromvPos, int piece, List<List<int>> board) {
    throw "Not Implemented";
  }
  
  bool _validateMove(PGNMove move) {
    throw "Not Implemented";
  }
  
  bool isKingInCheckAfterMove(List<List<int>> board, int color, int hPos, int vPos, int tohPos, int tovPos) {
    throw "Not Implemented";
  }
  
  bool isKingInCheckAfterMoveRec(List<List<int>> board, int piece, int hPos, int vPos, int skiphPos, int skipvPos, int tohPos, int tovPos, int hAdd, int vAdd) {
    throw "Not Implemented";
  }
  
  List<List<int>> createDefaultBoard() {
    return [
        [ WHITE_ROOK, WHITE_PAWN, EMPTY, EMPTY, EMPTY, EMPTY, BLACK_PAWN, BLACK_ROOK ],
        [ WHITE_KNIGHT, WHITE_PAWN, EMPTY, EMPTY, EMPTY, EMPTY, BLACK_PAWN, BLACK_KNIGHT ],
        [ WHITE_BISHOP, WHITE_PAWN, EMPTY, EMPTY, EMPTY, EMPTY, BLACK_PAWN, BLACK_BISHOP ],
        [ WHITE_QUEEN, WHITE_PAWN, EMPTY, EMPTY, EMPTY, EMPTY, BLACK_PAWN, BLACK_QUEEN ],
        [ WHITE_KING, WHITE_PAWN, EMPTY, EMPTY, EMPTY, EMPTY, BLACK_PAWN, BLACK_KING ],
        [ WHITE_BISHOP, WHITE_PAWN, EMPTY, EMPTY, EMPTY, EMPTY, BLACK_PAWN, BLACK_BISHOP ],
        [ WHITE_KNIGHT, WHITE_PAWN, EMPTY, EMPTY, EMPTY, EMPTY, BLACK_PAWN, BLACK_KNIGHT ],
        [ WHITE_ROOK, WHITE_PAWN, EMPTY, EMPTY, EMPTY, EMPTY, BLACK_PAWN, BLACK_ROOK ],
    ];
  }
}

