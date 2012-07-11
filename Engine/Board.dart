
class Board {
  List<Square> Squares;
  
  bool InsufficientMaterial = false;

  int Score = 0;

  num ZobristHash;
 
  //Game Over Flags
  bool BlackCheck = false;
  bool BlackMate = false;
  bool WhiteCheck = false;
  bool WhiteMate = false;
  bool StaleMate = false;

  int FiftyMove = 0;
  int RepeatedMove = 0;

  bool BlackCastled = false;
  bool WhiteCastled = false;

  bool EndGamePhase = false;

  MoveContent LastMove;

  
  //Who initated En Passant
  ChessPieceColor EnPassantColor;
  //Positions liable to En Passant
  int EnPassantPosition = 0;

  ChessPieceColor WhoseMove;
  
  int MoveCount = 0;
  
  _initBoard() {
  
    Squares = new List<Square>(64);

    for (int i = 0; i < 64; i++)
    {
        Squares[i] = new Square.empty();
    }

    LastMove = new MoveContent();
  }
  
  Board() {
    _initBoard();
  }
  
  Board.fromString(String fen) {
    _initBoard();
    
    int index = 0;
    int spc = 0;

    WhiteCastled = true;
    BlackCastled = true;
    int spacers = 0;

    WhoseMove = ChessPieceColor.White;

    if (fen.contains(const RegExp("a3")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 40;
    }
    else if (fen.contains(const RegExp("b3")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 41;
    }
    else if (fen.contains(const RegExp("c3")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 42;
    }
    else if (fen.contains(const RegExp("d3")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 43;
    }
    else if (fen.contains(const RegExp("e3")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 44;
    }
    else if (fen.contains(const RegExp("f3")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 45;
    }
    else if (fen.contains(const RegExp("g3")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 46;
    }
    else if (fen.contains(const RegExp("h3")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 47;
    }


    if (fen.contains(const RegExp("a6")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 16;
    }
    else if (fen.contains(const RegExp("b6")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 17;
    }
    else if (fen.contains(const RegExp("c6")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition =18;
    }
    else if (fen.contains(const RegExp("d6")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 19;
    }
    else if (fen.contains(const RegExp("e6")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 20;
    }
    else if (fen.contains(const RegExp("f6")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 21;
    }
    else if (fen.contains(const RegExp("g6")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 22;
    }
    else if (fen.contains(const RegExp("h6")))
    {
        EnPassantColor = ChessPieceColor.White;
        EnPassantPosition = 23;
    }

    //foreach(String c : fen.splitChars())
    fen.splitChars().forEach((c) 
    {

        if (index < 64 && spc == 0)
        {
            if (c == '1' && index < 63)
            {
                index++;
            }
            else if (c == '2' && index < 62)
            {
                index += 2;
            }
            else if (c == '3' && index < 61)
            {
                index += 3;
            }
            else if (c == '4' && index < 60)
            {
                index += 4;
            }
            else if (c == '5' && index < 59)
            {
                index += 5;
            }
            else if (c == '6' && index < 58)
            {
                index += 6;
            }
            else if (c == '7' && index < 57)
            {
                index += 7;
            }
            else if (c == '8' && index < 56)
            {
                index += 8;
            }
            else if (c == 'P')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.Pawn, ChessPieceColor.White);
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == 'N')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.Knight, ChessPieceColor.White);
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == 'B')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.Bishop, ChessPieceColor.White);
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == 'R')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.Rook, ChessPieceColor.White);
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == 'Q')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.Queen, ChessPieceColor.White);
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == 'K')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.King, ChessPieceColor.White);
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == 'p')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.Pawn, ChessPieceColor.Black);
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == 'n')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.Knight, ChessPieceColor.Black);
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == 'b')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.Bishop, ChessPieceColor.Black);
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == 'r')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.Rook, ChessPieceColor.Black);
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == 'q')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.Queen, ChessPieceColor.Black);
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == 'k')
            {
                Squares[index].PlacedPiece = new Piece.fromType(ChessPieceType.King, ChessPieceColor.Black);      
                Squares[index].PlacedPiece.Moved = true;
                index++;
            }
            else if (c == '/')
            {
                //continue;
            }
            else if (c == ' ')
            {
                spc++;
            }
        }
        else
        {
            if (c == 'w')
            {
                WhoseMove = ChessPieceColor.White;
            }
            else if (c == 'b')
            {
                WhoseMove = ChessPieceColor.Black;
            }
            else if (c == 'K')
            {
                if (Squares[60].PlacedPiece != null)
                {
                    if (Squares[60].PlacedPiece.PieceType == ChessPieceType.King)
                    {
                        Squares[60].PlacedPiece.Moved = false;
                    }
                }

                if (Squares[63].PlacedPiece != null)
                {
                    if (Squares[63].PlacedPiece.PieceType == ChessPieceType.Rook)
                    {
                        Squares[63].PlacedPiece.Moved = false;
                    }
                }

                WhiteCastled = false;
            }
            else if (c == 'Q')
            {
                if (Squares[60].PlacedPiece != null)
                {
                    if (Squares[60].PlacedPiece.PieceType == ChessPieceType.King)
                    {
                        Squares[60].PlacedPiece.Moved = false;
                    }
                }

                if (Squares[56].PlacedPiece != null)
                {
                    if (Squares[56].PlacedPiece.PieceType == ChessPieceType.Rook)
                    {
                        Squares[56].PlacedPiece.Moved = false;
                    }
                }

                WhiteCastled = false;
            }
            else if (c == 'k')
            {
                if (Squares[4].PlacedPiece != null)
                {
                    if (Squares[4].PlacedPiece.PieceType == ChessPieceType.King)
                    {
                        Squares[4].PlacedPiece.Moved = false;
                    }
                }

                if (Squares[7].PlacedPiece != null)
                {
                    if (Squares[7].PlacedPiece.PieceType == ChessPieceType.Rook)
                    {
                        Squares[7].PlacedPiece.Moved = false;
                    }
                }

                BlackCastled = false;
            }
            else if (c == 'q')
            {
                if (Squares[4].PlacedPiece != null)
                {
                    if (Squares[4].PlacedPiece.PieceType == ChessPieceType.King)
                    {
                        Squares[4].PlacedPiece.Moved = false;
                    }
                }

                if (Squares[0].PlacedPiece != null)
                {
                    if (Squares[0].PlacedPiece.PieceType == ChessPieceType.Rook)
                    {
                        Squares[0].PlacedPiece.Moved = false;
                    }
                }

                BlackCastled = false;
            }
            else if (c == ' ')
            {
                spacers++;
            }
            else if (c == '1' && spacers == 4)
            {
                FiftyMove = ((FiftyMove * 10) + 1);
            }
            else if (c == '2' && spacers == 4)
            {
                FiftyMove = ((FiftyMove * 10) + 2);
            }
            else if (c == '3' && spacers == 4)
            {
                FiftyMove = ((FiftyMove * 10) + 3);
            }
            else if (c == '4' && spacers == 4)
            {
                FiftyMove = ((FiftyMove * 10) + 4);
            }
            else if (c == '5' && spacers == 4)
            {
                FiftyMove = ((FiftyMove * 10) + 5);
            }
            else if (c == '6' && spacers == 4)
            {
                FiftyMove = ((FiftyMove * 10) + 6);
            }
            else if (c == '7' && spacers == 4)
            {
                FiftyMove = ((FiftyMove * 10) + 7);
            }
            else if (c == '8' && spacers == 4)
            {
                FiftyMove = ((FiftyMove * 10) + 8);
            }
            else if (c == '9' && spacers == 4)
            {
                FiftyMove = ((FiftyMove * 10) + 9);
            }
            else if (c == '0' && spacers == 4)
            {
                MoveCount = ((MoveCount * 10) + 0);
            }
            else if (c == '1' && spacers == 5)
            {
                MoveCount = ((MoveCount * 10) + 1);
            }
            else if (c == '2' && spacers == 5)
            {
                MoveCount = ((MoveCount * 10) + 2);
            }
            else if (c == '3' && spacers == 5)
            {
                MoveCount = ((MoveCount * 10) + 3);
            }
            else if (c == '4' && spacers == 5)
            {
                MoveCount = ((MoveCount * 10) + 4);
            }
            else if (c == '5' && spacers == 5)
            {
                MoveCount = ((MoveCount * 10) + 5);
            }
            else if (c == '6' && spacers == 5)
            {
                MoveCount = ((MoveCount * 10) + 6);
            }
            else if (c == '7' && spacers == 5)
            {
                MoveCount = ((MoveCount * 10) + 7);
            }
            else if (c == '8' && spacers == 5)
            {
                MoveCount = ((MoveCount * 10) + 8);
            }
            else if (c == '9' && spacers == 5)
            {
                MoveCount = ((MoveCount * 10) + 9);
            }
            else if (c == '0' && spacers == 5)
            {
                MoveCount = ((MoveCount * 10) + 0);
            }

        }
    });
    
  }
  
  Board.fromScore(int score) {
    _initBoard();
    Score = score;
  }
  
  Board.fromSquare(List<Square> squares) {
    Squares = new List<Square>(64);

    for (int x = 0; x < 64; x++)
    {
        if (squares[x].PlacedPiece != null)
        {
            Squares[x].PlacedPiece = new Piece.fromPiece(squares[x].PlacedPiece);
        }
    } 
  }
  
  Board.fromBoard(Board board) {
    Squares = new List<Square>(64);

    for (int x = 0; x < 64; x++)
    {
        if (board.Squares[x].PlacedPiece != null)
        {
            Squares[x] = new Square(board.Squares[x].PlacedPiece);
        }
    }
    EndGamePhase = board.EndGamePhase;

    FiftyMove = board.FiftyMove;
    RepeatedMove = board.RepeatedMove;
   
    WhiteCastled = board.WhiteCastled;
    BlackCastled = board.BlackCastled;

    BlackCheck = board.BlackCheck;
    WhiteCheck = board.WhiteCheck;
    StaleMate = board.StaleMate;
    WhiteMate = board.WhiteMate;
    BlackMate = board.BlackMate;
    WhoseMove = board.WhoseMove;
    EnPassantPosition = board.EnPassantPosition;
    EnPassantColor = board.EnPassantColor;

    ZobristHash = board.ZobristHash;

    Score = board.Score;

    LastMove = new MoveContent.fromMoveContent(board.LastMove);

    MoveCount = board.MoveCount;
  }
  
  
  Board FastCopy() {
    Board clonedBoard = new Board.fromSquare(Squares);

    clonedBoard.EndGamePhase = EndGamePhase;
    clonedBoard.WhoseMove = WhoseMove;
    clonedBoard.MoveCount = MoveCount;
    clonedBoard.FiftyMove = FiftyMove;
    clonedBoard.ZobristHash = ZobristHash;
    clonedBoard.BlackCastled = BlackCastled;
    clonedBoard.WhiteCastled = WhiteCastled;
    return clonedBoard;
  }
  
  String Fen(bool boardOnly, Board board) {
    StringBuffer output = new StringBuffer();
    int blankSquares = 0;
    Piece pieceHelper = new Piece();
    
    for (int x = 0; x < 64; x++)
    {
        int index = x;

        if (board.Squares[index].PlacedPiece != null)
        {
            if (blankSquares > 0)
            {
                output.add(blankSquares.toString());
                blankSquares = 0;
            }

            if (board.Squares[index].PlacedPiece.PieceColor == ChessPieceColor.Black)
            {
                output.add(pieceHelper.GetPieceTypeShort(board.Squares[index].PlacedPiece.PieceType).toLowerCase());
            }
            else
            {
                output.add(pieceHelper.GetPieceTypeShort(board.Squares[index].PlacedPiece.PieceType));
            }
        }
        else
        {
            blankSquares++;
        }

        if (x % 8 == 7)
        {
            if (blankSquares > 0)
            {
                output.add(blankSquares.toString());
                output.add("/");
                blankSquares = 0;
            }
            else
            {
                if (x > 0 && x != 63)
                {
                    output.add("/");
                }
            }
        }
    }

    if (board.WhoseMove == ChessPieceColor.White)
    {
        output.add(" w ");
    }
    else
    {
        output.add(" b ");
    }

    String spacer = "";

    if (board.WhiteCastled == false)
    {
        if (board.Squares[60].PlacedPiece != null)
        {
            if (board.Squares[60].PlacedPiece.Moved == false)
            {
                if (board.Squares[63].PlacedPiece != null)
                {
                    if (board.Squares[63].PlacedPiece.Moved == false)
                    {
                        output.add("K");
                        spacer = " ";
                    }
                }
                if (board.Squares[56].PlacedPiece != null)
                {
                    if (board.Squares[56].PlacedPiece.Moved == false)
                    {
                        output.add("Q");
                        spacer = " ";
                    }
                }
            }
        }
    }

    if (board.BlackCastled == false)
    {
        if (board.Squares[4].PlacedPiece != null)
        {
            if (board.Squares[4].PlacedPiece.Moved == false)
            {
                if (board.Squares[7].PlacedPiece != null)
                {
                    if (board.Squares[7].PlacedPiece.Moved == false)
                    {
                        output.add("k");
                        spacer = " ";
                    }
                }
                if (board.Squares[0].PlacedPiece != null)
                {
                    if (board.Squares[0].PlacedPiece.Moved == false)
                    {
                        output.add("q");
                        spacer = " ";
                    }
                }
            }
        }

        
    }
    
    String _o = output.toString();

    if (_o.endsWith("/"))
    {
        _o = _o.substring(0, _o.length - 1);
        //output.TrimEnd('/');
        output = new StringBuffer(_o);
    }


    if (board.EnPassantPosition != 0)
    {
        output.add("${spacer}${GetColumnFromByte((board.EnPassantPosition % 8).toInt())}${(8 - (board.EnPassantPosition / 8).toInt()).toInt()} ");
        //output += spacer + GetColumnFromByte((board.EnPassantPosition % 8).toInt()) + "" + (8 - (board.EnPassantPosition / 8).toInt()).toInt() + " ";
    }
    else
    {
        output.add("${spacer}- ");
        //output += spacer + "- ";
    }

    if (!boardOnly)
    {
      output.add("${board.FiftyMove} ");
      output.add("${(board.MoveCount + 1).toString()}");
//        output += board.FiftyMove + " ";
//        output += board.MoveCount + 1;
    }
    
    String ret_str = output.toString();
    
    return ret_str.trim();
  }
  
  String GetColumnFromByte(int column) {
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
            return "a";
    }
  }
  
  void KingCastle(Board board, Piece piece, int srcPosition, int dstPosition) {
    if (piece.PieceType != ChessPieceType.King)
    {
        return;
    }

    //Lets see if this is a casteling move.
    if (piece.PieceColor == ChessPieceColor.White && srcPosition == 60)
    {
        //Castle Right
        if (dstPosition == 62)
        {
            //Ok we are casteling we need to move the Rook
            if (board.Squares[63].PlacedPiece != null)
            {
                board.Squares[61].PlacedPiece = board.Squares[63].PlacedPiece;
                board.Squares[63].PlacedPiece = null;
                board.WhiteCastled = true;
                board.LastMove.MovingPieceSecondary = new PieceMoving(board.Squares[61].PlacedPiece.PieceColor, board.Squares[61].PlacedPiece.PieceType, board.Squares[61].PlacedPiece.Moved, 63, 61);
                board.Squares[61].PlacedPiece.Moved = true;
                return;
            }
        }
        //Castle Left
        else if (dstPosition == 58)
        {   
            //Ok we are casteling we need to move the Rook
            if (board.Squares[56].PlacedPiece != null)
            {
                board.Squares[59].PlacedPiece = board.Squares[56].PlacedPiece;
                board.Squares[56].PlacedPiece = null;
                board.WhiteCastled = true;
                board.LastMove.MovingPieceSecondary = new PieceMoving(board.Squares[59].PlacedPiece.PieceColor, board.Squares[59].PlacedPiece.PieceType, board.Squares[59].PlacedPiece.Moved, 56, 59);
                board.Squares[59].PlacedPiece.Moved = true;
                return;
            }
        }
    }
    else if (piece.PieceColor == ChessPieceColor.Black && srcPosition == 4)
    {
        if (dstPosition == 6)
        {
            //Ok we are casteling we need to move the Rook
            if (board.Squares[7].PlacedPiece != null)
            {
                board.Squares[5].PlacedPiece = board.Squares[7].PlacedPiece;
                board.Squares[7].PlacedPiece = null;
                board.BlackCastled = true;
                board.LastMove.MovingPieceSecondary = new PieceMoving(board.Squares[5].PlacedPiece.PieceColor, board.Squares[5].PlacedPiece.PieceType, board.Squares[5].PlacedPiece.Moved, 7, 5);
                board.Squares[5].PlacedPiece.Moved = true;
                return;
            }
        }
            //Castle Left
        else if (dstPosition == 2)
        {
            //Ok we are casteling we need to move the Rook
            if (board.Squares[0].PlacedPiece != null)
            {
                board.Squares[3].PlacedPiece = board.Squares[0].PlacedPiece;
                board.Squares[0].PlacedPiece = null;
                board.BlackCastled = true;
                board.LastMove.MovingPieceSecondary = new PieceMoving(board.Squares[3].PlacedPiece.PieceColor, board.Squares[3].PlacedPiece.PieceType, board.Squares[3].PlacedPiece.Moved, 0, 3);
                board.Squares[3].PlacedPiece.Moved = true;
                return;
            }
        }
    }

    return;
  }
  
  MoveContent MovePiece(Board board, int srcPosition, int dstPosition, ChessPieceType promoteToPiece) {
    Piece piece = board.Squares[srcPosition].PlacedPiece;

    //Record my last move
    board.LastMove = new MoveContent();

    //Add One to FiftyMoveCount to check for tie.
    board.FiftyMove++;

    if (piece.PieceColor == ChessPieceColor.Black)
    {
        board.MoveCount++;
    }

    //En Passant
    if (board.EnPassantPosition > 0)
    {
        board.LastMove.EnPassantOccured = SetEnpassantMove(board, dstPosition, piece.PieceColor);
    }

    if (!board.LastMove.EnPassantOccured)
    {
        Square sqr = board.Squares[dstPosition];

        if (sqr.PlacedPiece != null)
        {
            board.LastMove.TakenPiece = new PieceTaken(sqr.PlacedPiece.PieceColor, sqr.PlacedPiece.PieceType,
                                                       sqr.PlacedPiece.Moved, dstPosition);
            board.FiftyMove = 0;
        }
        else
        {
            board.LastMove.TakenPiece = new PieceTaken(ChessPieceColor.White, ChessPieceType.None, false,
                                                       dstPosition);
            
        }
    }

    board.LastMove.MovingPiecePrimary = new PieceMoving(piece.PieceColor, piece.PieceType, piece.Moved, srcPosition, dstPosition);

    //Delete the piece in its source position
    board.Squares[srcPosition].PlacedPiece = null;

    //Add the piece to its new position
    piece.Moved = true;
    piece.Selected = false;
    board.Squares[dstPosition].PlacedPiece = piece;

    //Reset EnPassantPosition
    board.EnPassantPosition = 0;
  
    //Record En Passant if Pawn Moving
    if (piece.PieceType == ChessPieceType.Pawn)
    {
       board.FiftyMove = 0;
       RecordEnPassant(piece.PieceColor, piece.PieceType, board, srcPosition, dstPosition);
    }

    board.WhoseMove = board.WhoseMove == ChessPieceColor.White ? ChessPieceColor.Black : ChessPieceColor.White;

    KingCastle(board, piece, srcPosition, dstPosition);

    //Promote Pawns 
    if (PromotePawns(board, piece, dstPosition, promoteToPiece))
    {
        board.LastMove.PawnPromoted = true;
    }
    else
    {
        board.LastMove.PawnPromoted = false;
    }

    if ( board.FiftyMove >= 50)
    {
        board.StaleMate = true;
    }

    return board.LastMove;
  }
  
  bool PromotePawns(Board board, Piece piece, int dstPosition, ChessPieceType promoteToPiece) {
    if (piece.PieceType == ChessPieceType.Pawn)
    {
        if (dstPosition < 8)
        {
            board.Squares[dstPosition].PlacedPiece.PieceType = promoteToPiece;
            return true;
        }
        if (dstPosition > 55)
        {
            board.Squares[dstPosition].PlacedPiece.PieceType = promoteToPiece;
            return true;
        }
    }

    return false;
  }
  
  void RecordEnPassant(ChessPieceColor pcColor, ChessPieceType pcType, Board board, int srcPosition, int dstPosition) {
    //Record En Passant if Pawn Moving
    if (pcType == ChessPieceType.Pawn)
    {
        //Reset FiftyMoveCount if pawn moved
        board.FiftyMove = 0;

        int difference = srcPosition - dstPosition; 

        if (difference == 16 || difference == -16)
        {
            board.EnPassantPosition = (dstPosition + (difference / 2)).toInt();
            board.EnPassantColor = pcColor;
        }
    }
  }
  
  bool SetEnpassantMove(Board board, int dstPosition, ChessPieceColor pcColor) {
    //En Passant
    if (board.EnPassantPosition == dstPosition)
    {
        //We have an En Passant Possible
        if (pcColor != board.EnPassantColor)
        {
            int pieceLocationOffset = 8;

            if (board.EnPassantColor == ChessPieceColor.White)
            {
                pieceLocationOffset = -8;
            }

            dstPosition = (dstPosition + pieceLocationOffset).toInt();

            Square sqr = board.Squares[dstPosition];

            board.LastMove.TakenPiece = new PieceTaken(sqr.PlacedPiece.PieceColor, sqr.PlacedPiece.PieceType, sqr.PlacedPiece.Moved, dstPosition);

            board.Squares[dstPosition].PlacedPiece = null;
            
            //Reset FiftyMoveCount if capture
            board.FiftyMove = 0;

            return true;
        }
    }

    return false;
  }
}
