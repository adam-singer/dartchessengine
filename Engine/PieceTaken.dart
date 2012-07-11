
class PieceTaken {
  bool Moved;
  ChessPieceColor PieceColor;
  ChessPieceType PieceType;
  int Position;

  PieceTaken(ChessPieceColor pieceColor, ChessPieceType pieceType, bool moved,
                    int position)
  {
      PieceColor = pieceColor;
      PieceType = pieceType;
      Position = position;
      Moved = moved;
  }

  PieceTaken.fromChessPieceType(ChessPieceType pieceType)
  {
      PieceColor = ChessPieceColor.White;
      PieceType = pieceType;
      Position = 0;
      Moved = false;
  }
}
