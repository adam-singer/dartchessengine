
class MoveContent {
  bool EnPassantOccured = false;
  PieceMoving MovingPiecePrimary;
  PieceMoving MovingPieceSecondary;
  bool PawnPromoted = false;
  PieceTaken TakenPiece;
  
  MoveContent()
  {
    MovingPiecePrimary = new PieceMoving.fromChessPieceType(ChessPieceType.None);
    MovingPieceSecondary = new PieceMoving.fromChessPieceType(ChessPieceType.None);
    TakenPiece = new PieceTaken.fromChessPieceType(ChessPieceType.None);
  }
  
  MoveContent.fromMoveContent(MoveContent moveContent)
  {
    MovingPiecePrimary = new PieceMoving.fromPieceMoving(moveContent.MovingPiecePrimary);
    MovingPieceSecondary = new PieceMoving.fromPieceMoving(moveContent.MovingPieceSecondary);

    TakenPiece = new PieceTaken(moveContent.TakenPiece.PieceColor,
                                moveContent.TakenPiece.PieceType,
                                moveContent.TakenPiece.Moved,
                                moveContent.TakenPiece.Position);

    EnPassantOccured = moveContent.EnPassantOccured;
    PawnPromoted = moveContent.PawnPromoted;
  }
  
  MoveContent.fromString(String move)
  {
    MovingPiecePrimary = new PieceMoving.fromChessPieceType(ChessPieceType.None);
    MovingPieceSecondary = new PieceMoving.fromChessPieceType(ChessPieceType.None);
    TakenPiece = new PieceTaken.fromChessPieceType(ChessPieceType.None);
    
    int srcCol =-1;
    
    bool comment = false;
    bool srcFound = false;

    if (move.contains(const RegExp("=Q")))
    {
        PawnPromoted = true;
    }

    for (String c in move.splitChars())
    {
        if (c=='{')
        {
            comment = true;
            continue;
        }
        if (c == '}')
        {
            comment = false;
            continue;
        }

        if (comment)
        {
            continue;
        }

        if (MovingPiecePrimary.PieceType == ChessPieceType.None)
        {
            //Get Piece Type
            MovingPiecePrimary.PieceType = _GetPieceType(c);

            if (MovingPiecePrimary.PieceType == ChessPieceType.None)
            {
                MovingPiecePrimary.PieceType = ChessPieceType.Pawn;

                //This is a column character
                srcCol= _GetIntFromColumn(c);
            }
            continue;
        }
        if (srcCol < 0)
        {
            srcCol = _GetIntFromColumn(c);
            continue;
        }
        if (srcCol >= 0)
        {
            
            int srcRow = Math.parseInt(c.toString());

            if (!srcFound)
            {
                MovingPiecePrimary.SrcPosition = _GetBoardIndex(srcCol, 8 - srcRow);
                srcFound = true;
            }
            else
            {
                MovingPiecePrimary.DstPosition = _GetBoardIndex(srcCol, 8 - srcRow);
            }

            srcCol = -1;
            continue;
        }
    }
  }
  
  int _GetBoardIndex(int col, int row) {
    return (col + (row * 8)).toInt();
  }
  
  String _GetColumnFromInt(int column) {
    switch (column)
    {
        case 0:
            return "a";
        case 1:
            return "b";
        case 2:
            return "c";
        case 3:
            return "d";
        case 4:
            return "e";
        case 5:
            return "f";
        case 6:
            return "g";
        case 7:
            return "h";
        default:
            return "Unknown";
    }
  }
  
  int _GetIntFromColumn(String column) {
    switch (column)
    {
        case 'a':
            return 0;
        case 'b':
            return 1;
        case 'c':
            return 2;
        case 'd':
            return 3;
        case 'e':
            return 4;
        case 'f':
            return 5;
        case 'g':
            return 6;
        case 'h':
            return 7;
        default:
            return -1;
    }
  }
  
  String _GetPgnMove(ChessPieceType pieceType) {
    switch (pieceType.value)
    {
        case ChessPieceType.Bishop.value:
            return "B";

        case ChessPieceType.King.value:
            return "K";

        case ChessPieceType.Knight.value:
            return "N";

        case ChessPieceType.Queen.value:
            return "Q";

        case ChessPieceType.Rook.value:
            return "R";
        default:
            return "";
    }
  }
  
  ChessPieceType _GetPieceType(String c) {
    switch (c)
    {
        case 'B':
            return ChessPieceType.Bishop;
        case 'K':
            return ChessPieceType.King;
        case 'N':
            return ChessPieceType.Knight;
        case 'Q':
            return ChessPieceType.Queen;
        case 'R':
            return ChessPieceType.Rook;
        default:
            return ChessPieceType.None;
    }
  }
  
  String toString() {
    StringBuffer value = new StringBuffer();

    var srcCol = (MovingPiecePrimary.SrcPosition%8).toInt();
    var srcRow = (8 - (MovingPiecePrimary.SrcPosition / 8)).toInt();
    var dstCol = (MovingPiecePrimary.DstPosition%8).toInt();
    var dstRow = (8 - (MovingPiecePrimary.DstPosition/8)).toInt();

    if (MovingPieceSecondary.PieceType == ChessPieceType.Rook)
    {
        if (MovingPieceSecondary.PieceColor == ChessPieceColor.Black)
        {
            if (MovingPieceSecondary.SrcPosition == 7)
            {
                value.add("O-O");
            }
            else if (MovingPieceSecondary.SrcPosition == 0)
            {
                value.add("O-O-O");
            }
        }
        else if (MovingPieceSecondary.PieceColor == ChessPieceColor.White)
        {
            if (MovingPieceSecondary.SrcPosition == 63)
            {
                value.add("O-O");
            }
            else if (MovingPieceSecondary.SrcPosition == 56)
            {
                value.add("O-O-O");
            }
        }
    }
    else
    {
        value.add(_GetPgnMove(MovingPiecePrimary.PieceType).toString());

        switch (MovingPiecePrimary.PieceType.value)
        {
            case ChessPieceType.Knight.value:
                value.add(_GetColumnFromInt(srcCol).toString());
                value.add(srcRow.toString());
                break;
            case ChessPieceType.Rook.value:
                value.add(_GetColumnFromInt(srcCol).toString());
                value.add(srcRow.toString());
                break;
            case ChessPieceType.Pawn.value:
                if (srcCol != dstCol)
                {
                    value.add(_GetColumnFromInt(srcCol).toString());
                }
                break;
        }

        if (TakenPiece.PieceType != ChessPieceType.None)
        {
            value.add("x");
        }

        value.add(_GetColumnFromInt(dstCol).toString());

        value.add(dstRow.toString());

        if (PawnPromoted)
        {
            value.add("=Q");
        }
    }

    return value.toString();
  }
}
