
class PieceMoving {
  int DstPosition;
  bool Moved;
  ChessPieceColor PieceColor;
  ChessPieceType PieceType;
  int SrcPosition;
  
  PieceMoving(ChessPieceColor pieceColor, ChessPieceType pieceType, bool moved,
              int srcPosition, int dstPosition) {
    PieceColor = pieceColor;
    PieceType = pieceType;
    SrcPosition = srcPosition;
    DstPosition = dstPosition;
    Moved = moved;
  }
  
  PieceMoving.fromPieceMoving(PieceMoving pieceMoving) {
    PieceColor = pieceMoving.PieceColor;
    PieceType = pieceMoving.PieceType;
    SrcPosition = pieceMoving.SrcPosition;
    DstPosition = pieceMoving.DstPosition;
    Moved = pieceMoving.Moved;
  }
  
  PieceMoving.fromChessPieceType(ChessPieceType pieceType) {
    PieceType = pieceType;
    PieceColor = ChessPieceColor.White;
    SrcPosition = 0;
    DstPosition = 0;
    Moved = false;
  }
}
