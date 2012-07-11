
class Piece {
  ChessPieceColor PieceColor;
  ChessPieceType PieceType;

  int PieceValue;
  int PieceActionValue;

  int AttackedValue = 0;
  int DefendedValue = 0;
  
  int LastValidMoveCount;
  bool Moved;

  bool Selected;

  List<int> ValidMoves;
  
  Piece() {}
  
  Piece.fromPiece(Piece piece) {
    PieceColor = piece.PieceColor;
    PieceType = piece.PieceType;
    Moved = piece.Moved;
    PieceValue = piece.PieceValue;
    PieceActionValue = piece.PieceActionValue;
    
    if (piece.ValidMoves != null)
        LastValidMoveCount = piece.ValidMoves.length;
  }
  
  Piece.fromType(ChessPieceType chessPiece, ChessPieceColor chessPieceColor) {
    PieceType = chessPiece;
    PieceColor = chessPieceColor;

    if (PieceType == ChessPieceType.Pawn || PieceType == ChessPieceType.Knight)
    {
        LastValidMoveCount = 2;
    }
    else
    {
        LastValidMoveCount = 0;
    }

    ValidMoves = <int>[]; //new List<int>(LastValidMoveCount);

    PieceValue = _CalculatePieceValue(PieceType);
    PieceActionValue = _CalculatePieceActionValue(PieceType);
  }
  
  int _CalculatePieceActionValue(ChessPieceType pieceType) {
    switch (pieceType.value)
    {
        case ChessPieceType.Pawn.value:
            {
                return 6;

            }
        case ChessPieceType.Knight.value:
            {
                return 3;
            }
        case ChessPieceType.Bishop.value:
            {
                return 3;
            }
        case ChessPieceType.Rook.value:
            {
                return 2;
            }

        case ChessPieceType.Queen.value:
            {
                return 1;
            }

        case ChessPieceType.King.value:
            {
                return 1;
            }
        default:
            {
                return 0;
            }
    }
  }
  
  int _CalculatePieceValue(ChessPieceType pieceType) {
    switch (pieceType.value)
    {
        case ChessPieceType.Pawn.value:
            {
                return 100;
                
            }
        case ChessPieceType.Knight.value:
            {
                return 320;
            }
        case ChessPieceType.Bishop.value:
            {
                return 325;
            }
        case ChessPieceType.Rook.value:
            {
                return 500;
            }

        case ChessPieceType.Queen.value:
            {
                return 975;
            }

        case ChessPieceType.King.value:
            {
                return 32767;
            }
        default:
            {
                return 0;
            }
    }
  }
  
  String GetPieceTypeShort(ChessPieceType pieceType) {
    switch (pieceType.value)
    {
        case ChessPieceType.Pawn.value:
            {
                return "P";
            }
        case ChessPieceType.Knight.value:
            {
                return "N";
            }
        case ChessPieceType.Bishop.value:
            {
                return "B";
            }
        case ChessPieceType.Rook.value:
            {
                return "R";
            }

        case ChessPieceType.Queen.value:
            {
                return "Q";
            }

        case ChessPieceType.King.value:
            {
                return "K";
            }
        default:
            {
                return "P";
            }
    }
  }
}
