
class Square {
  Piece PlacedPiece;
  Square(Piece piece) {
    PlacedPiece = new Piece.fromPiece(piece);
  }
  
  Square.empty() {
    PlacedPiece = null;
  }
}
