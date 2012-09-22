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
class PGNMove {
  String move;

  String fullMove;
  
  String fromSquare;
  
  String toSquare;
  
  String piece;
  
  ChessPieceColor color;
  
  String comment;

  bool checked;
  
  bool checkMated;

  bool captured;

  bool promoted;

  String promotion;

  bool endGameMarked;

  String endGameMark;
  
  bool kingSideCastle;
  
  bool queenSideCastle;
  
  bool enpassant;
  
  bool enpassantCapture;
  
  String enpassantPieceSquare;
  
  PGNMove(String fullMove, [String comment=""]) {
    this.fullMove = fullMove;
    this.comment = comment;
    _parse();
  }
  
  _parse() {
    if (fullMove == null) {
      throw "fullMove is null";
    }
    
    String move = fullMove;
    PGNParser p = new PGNParser();
    
    if (move.startsWith(p.PAWN)) {
      this.piece = p.PAWN;
    } else if (move.startsWith(p.KNIGHT)) {
      this.piece = p.KNIGHT;
    } else if (move.startsWith(p.BISHOP)) {
      this.piece = p.BISHOP;
    } else if (move.startsWith(p.ROOK)) {
      this.piece = p.ROOK;
    } else if (move.startsWith(p.QUEEN)) {
      this.piece = p.QUEEN;
    } else if (move.startsWith(p.KING)) {
      this.piece = p.KING;
    } else {
      this.piece = p.PAWN;
    }
    
    if (move.contains(new RegExp("x"))) {
      this.captured = true;
      move = move.replaceFirst(new RegExp("x"), "");
    }
    
    if (move.contains(new RegExp("+"))) {
      this.checked = true;
      move = move.replaceFirst(new RegExp("+"), "");
    }
    
    if (move.contains(new RegExp("#"))) {
      this.checkMated = true;
      move = move.replaceFirst(new RegExp("#"), "");
    }
    
    if (move.contains(new RegExp("="))) {
      try {
        String promotedPiece = move.substring(move.indexOf('=') + 1);
        
        if (promotedPiece.compareTo(p.PAWN)
            || promotedPiece.compareTo(p.KNIGHT)
            || promotedPiece.compareTo(p.BISHOP)
            || promotedPiece.compareTo(p.ROOK)
            || promotedPiece.compareTo(p.QUEEN)
            || promotedPiece.compareTo(p.KING))
        {
          move = move.substring(0, move.indexOf('='));
          this.promoted = true;
          this.promotion = promotedPiece;
        }
        else
        {
          //throw new MalformedMoveException("Wrong piece abr [" + promotedPiece + "]");
          throw "Wrong piece abr [$promotedPiece]";
        }
      } catch (e) {
        //throw new MalformedMoveException(e);
        throw "parser MalformedMove $e";
      }
    }
    
    
    throw "Not Implemented";
  }
}
