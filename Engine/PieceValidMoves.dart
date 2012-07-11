
class PieceValidMoves {
  MoveArrays _moveArrays;
  
  PieceValidMoves(this._moveArrays);
  
  List<bool> BlackAttackBoard;
  int _blackKingPosition;

  List<bool> WhiteAttackBoard;
  int _whiteKingPosition;
  
  void _AnalyzeMovePawn(Board board, int dstPos, Piece pcMoving) {
    //Because Pawns only kill diagonaly we handle the En Passant scenario specialy
    print("board = ${board}");
    print("board.EnPassantPosition = ${board.EnPassantPosition}");
    if (board.EnPassantPosition > 0)
    {
        if (pcMoving.PieceColor != board.EnPassantColor)
        {
            if (board.EnPassantPosition == dstPos)
            {
                //We have an En Passant Possible
                pcMoving.ValidMoves.add(dstPos);

                if (pcMoving.PieceColor == ChessPieceColor.White)
                {
                    WhiteAttackBoard[dstPos] = true;
                }
                else
                {
                    BlackAttackBoard[dstPos] = true;
                }
            }
        }
    }

    Piece pcAttacked = board.Squares[dstPos].PlacedPiece;

    //If there no piece there I can potentialy kill
    if (pcAttacked == null)
        return;

    //Regardless of what is there I am attacking this square
    if (pcMoving.PieceColor == ChessPieceColor.White)
    {
        WhiteAttackBoard[dstPos] = true;

        //if that piece is the same color
        if (pcAttacked.PieceColor == pcMoving.PieceColor)
        {
            pcAttacked.DefendedValue += pcMoving.PieceActionValue;
            return;
        }

        pcAttacked.AttackedValue += pcMoving.PieceActionValue;

        //If this is a king set it in check                   
        if (pcAttacked.PieceType == ChessPieceType.King)
        {
            board.BlackCheck = true;
        }
        else
        {
            //Add this as a valid move
            pcMoving.ValidMoves.add(dstPos);
        }
    }
    else
    {
        BlackAttackBoard[dstPos] = true;

        //if that piece is the same color
        if (pcAttacked.PieceColor == pcMoving.PieceColor)
        {
            pcAttacked.DefendedValue += pcMoving.PieceActionValue;
            return;
        }

        pcAttacked.AttackedValue += pcMoving.PieceActionValue;

        //If this is a king set it in check                   
        if (pcAttacked.PieceType == ChessPieceType.King)
        {
            board.WhiteCheck = true;
        }
        else
        {
            //Add this as a valid move
            pcMoving.ValidMoves.add(dstPos);
        }
    }

    return;
  }
  
  bool _AnalyzeMove(Board board, int dstPos, Piece pcMoving) {
    //If I am not a pawn everywhere I move I can attack
    if (pcMoving.PieceColor == ChessPieceColor.White)
    {
        WhiteAttackBoard[dstPos] = true;
    }
    else
    {
        BlackAttackBoard[dstPos] = true;
    }

    //If there no piece there I can potentialy kill just add the move and exit
    if (board.Squares[dstPos].PlacedPiece == null)
    {
      print("pcMoving.ValidMoves = ${pcMoving.ValidMoves}");
        pcMoving.ValidMoves.add(dstPos);

        return true;
    }

    Piece pcAttacked = board.Squares[dstPos].PlacedPiece;

    //if that piece is a different color
    if (pcAttacked.PieceColor != pcMoving.PieceColor)
    {
        pcAttacked.AttackedValue += pcMoving.PieceActionValue;

        //If this is a king set it in check                   
        if (pcAttacked.PieceType == ChessPieceType.King)
        {
            if (pcAttacked.PieceColor == ChessPieceColor.Black)
            {
                board.BlackCheck = true;
            }
            else
            {
                board.WhiteCheck = true;
            }
        }
        else
        {
            //Add this as a valid move
            pcMoving.ValidMoves.add(dstPos);
        }


        //We don't continue movement past this piece
        return false;
    }
    
    print("pcAttacked.DefendedValue = ${pcAttacked.DefendedValue}");
    print("pcMoving.PieceActionValue = ${pcMoving.PieceActionValue}");
    
    //Same Color I am defending
    pcAttacked.DefendedValue += pcMoving.PieceActionValue;

    //Since this piece is of my kind I can't move there
    return false;
  }
  
  void _CheckValidMovesPawn(List<int> moves, Piece pcMoving, int srcPosition,
    Board board, int count) {
    for (int i = 0; i < count; i++)
    {
        int dstPos = moves[i];

        if (dstPos%8 != srcPosition%8)
        {
            //If there is a piece there I can potentialy kill
            _AnalyzeMovePawn(board, dstPos, pcMoving);

            if (pcMoving.PieceColor == ChessPieceColor.White)
            {
                WhiteAttackBoard[dstPos] = true;
            }
            else
            {
                BlackAttackBoard[dstPos] = true;
            }
        }
            // if there is something if front pawns can't move there
        else if (board.Squares[dstPos].PlacedPiece != null)
        {
            return;
        }
            //if there is nothing in front of me (blocked == false)
        else
        {
            pcMoving.ValidMoves.add(dstPos);
        }
    }
  }
  
  void GenerateValidMoves(Board board) {
    // Reset Board
    board.BlackCheck = false;
    board.WhiteCheck = false;

    WhiteAttackBoard = new List<bool>(64);
    BlackAttackBoard = new List<bool>(64);

    for (int x = 0; x < 64; x++) {
      WhiteAttackBoard[x] = false;
      BlackAttackBoard[x] = false;
    }
    
    //Generate Moves
    for (int x = 0; x < 64; x++)
    {
        Square sqr = board.Squares[x];

        if (sqr.PlacedPiece == null)
            continue;

        sqr.PlacedPiece.ValidMoves = <int>[]; // new List<int>(sqr.PlacedPiece.LastValidMoveCount);

        switch (sqr.PlacedPiece.PieceType.value)
        {
            case ChessPieceType.Pawn.value:
                {
                    if (sqr.PlacedPiece.PieceColor == ChessPieceColor.White)
                    {
                        _CheckValidMovesPawn(_moveArrays.WhitePawnMoves[x].Moves, sqr.PlacedPiece, x,
                                            board,
                                            _moveArrays.WhitePawnTotalMoves[x]);
                        break;
                    }
                    if (sqr.PlacedPiece.PieceColor == ChessPieceColor.Black)
                    {
                        _CheckValidMovesPawn(_moveArrays.BlackPawnMoves[x].Moves, sqr.PlacedPiece, x,
                                            board,
                                            _moveArrays.BlackPawnTotalMoves[x]);
                        break;
                    }

                    break;
                }
            case ChessPieceType.Knight.value:
                {
                    for (int i = 0; i < _moveArrays.KnightTotalMoves[x]; i++)
                    {
                        _AnalyzeMove(board, _moveArrays.KnightMoves[x].Moves[i], sqr.PlacedPiece);
                    }

                    break;
                }
            case ChessPieceType.Bishop.value:
                {
                    for (int i = 0; i < _moveArrays.BishopTotalMoves1[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.BishopMoves1[x].Moves[i],
                                        sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.BishopTotalMoves2[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.BishopMoves2[x].Moves[i],
                                        sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.BishopTotalMoves3[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.BishopMoves3[x].Moves[i],
                                        sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.BishopTotalMoves4[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.BishopMoves4[x].Moves[i],
                                        sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }

                    break;
                }
            case ChessPieceType.Rook.value:
                {
                    for (int i = 0; i < _moveArrays.RookTotalMoves1[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.RookMoves1[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.RookTotalMoves2[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.RookMoves2[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.RookTotalMoves3[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.RookMoves3[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.RookTotalMoves4[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.RookMoves4[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }

                    break;
                }
            case ChessPieceType.Queen.value:
                {
                    for (int i = 0; i < _moveArrays.QueenTotalMoves1[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.QueenMoves1[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.QueenTotalMoves2[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.QueenMoves2[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.QueenTotalMoves3[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.QueenMoves3[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.QueenTotalMoves4[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.QueenMoves4[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }

                    for (int i = 0; i < _moveArrays.QueenTotalMoves5[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.QueenMoves5[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.QueenTotalMoves6[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.QueenMoves6[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.QueenTotalMoves7[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.QueenMoves7[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }
                    for (int i = 0; i < _moveArrays.QueenTotalMoves8[x]; i++)
                    {
                        if (
                            _AnalyzeMove(board, _moveArrays.QueenMoves8[x].Moves[i], sqr.PlacedPiece) ==
                            false)
                        {
                            break;
                        }
                    }

                    break;
                }
            case ChessPieceType.King.value:
                {
                    if (sqr.PlacedPiece.PieceColor == ChessPieceColor.White)
                    {
                        _whiteKingPosition = x;
                    }
                    else
                    {
                        _blackKingPosition = x;
                    }

                    break;
                }
        }
    }


    if (board.WhoseMove == ChessPieceColor.White)
    {
        _GenerateValidMovesKing(board.Squares[_blackKingPosition].PlacedPiece, board,
                               _blackKingPosition);
        _GenerateValidMovesKing(board.Squares[_whiteKingPosition].PlacedPiece, board,
                               _whiteKingPosition);
    }
    else
    {
        _GenerateValidMovesKing(board.Squares[_whiteKingPosition].PlacedPiece, board,
                               _whiteKingPosition);
        _GenerateValidMovesKing(board.Squares[_blackKingPosition].PlacedPiece, board,
                               _blackKingPosition);
    }


    //Now that all the pieces were examined we know if the king is in check
    _GenerateValidMovesKingCastle(board, board.Squares[_whiteKingPosition].PlacedPiece);
    _GenerateValidMovesKingCastle(board, board.Squares[_blackKingPosition].PlacedPiece);

  }
  
  void _GenerateValidMovesKing(Piece piece, Board board, int srcPosition) {
    if (piece == null)
    {
        return;
    }

    for (int i = 0; i < _moveArrays.KingTotalMoves[srcPosition]; i++)
    {
        int dstPos = _moveArrays.KingMoves[srcPosition].Moves[i];

        if (piece.PieceColor == ChessPieceColor.White)
        {
            //I can't move where I am being attacked
            if (BlackAttackBoard[dstPos])
            {
                WhiteAttackBoard[dstPos] = true;
                continue;
            }
        }
        else
        {
            print("WhiteAttackBoard = ${WhiteAttackBoard}");
            if (WhiteAttackBoard[dstPos])
            {
                BlackAttackBoard[dstPos] = true;
                continue;
            }
        }

        _AnalyzeMove(board, dstPos, piece);
    }
  }
  
  void _GenerateValidMovesKingCastle(Board board, Piece king) {
    if (king == null)
    {
        return;
    }

    if (king.Moved)
    {
        return;
    }
    if (king.PieceColor == ChessPieceColor.White &&
        board.WhiteCastled)
    {
        return;
    }
    if (king.PieceColor == ChessPieceColor.Black &&
        board.BlackCastled)
    {
        return;
    }
    if (king.PieceColor == ChessPieceColor.Black &&
        board.BlackCheck)
    {
        return;
    }
    if (king.PieceColor == ChessPieceColor.White &&
        board.WhiteCheck)
    {
        return;
    }


    //This code will add the castleling move to the pieces available moves
    if (king.PieceColor == ChessPieceColor.White)
    {
        if (board.WhiteCheck)
        {
            return;
        }

        if (board.Squares[63].PlacedPiece != null)
        {
            //Check if the Right Rook is still in the correct position
            if (board.Squares[63].PlacedPiece.PieceType == ChessPieceType.Rook)
            {
                if (board.Squares[63].PlacedPiece.PieceColor == king.PieceColor)
                {
                    //Move one column to right see if its empty
                    if (board.Squares[62].PlacedPiece == null)
                    {
                        if (board.Squares[61].PlacedPiece == null)
                        {
                            if (BlackAttackBoard[61] == false &&
                                BlackAttackBoard[62] == false)
                            {
                                //Ok looks like move is valid lets add it
                                king.ValidMoves.add(62);
                                WhiteAttackBoard[62] = true;
                            }
                        }
                    }
                }
            }
        }

        if (board.Squares[56].PlacedPiece != null)
        {
            //Check if the Left Rook is still in the correct position
            if (board.Squares[56].PlacedPiece.PieceType == ChessPieceType.Rook)
            {
                if (board.Squares[56].PlacedPiece.PieceColor == king.PieceColor)
                {
                    //Move one column to right see if its empty
                    if (board.Squares[57].PlacedPiece == null)
                    {
                        if (board.Squares[58].PlacedPiece == null)
                        {
                            if (board.Squares[59].PlacedPiece == null)
                            {
                                if (BlackAttackBoard[58] == false &&
                                    BlackAttackBoard[59] == false)
                                {
                                    //Ok looks like move is valid lets add it
                                    king.ValidMoves.add(58);
                                    WhiteAttackBoard[58] = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    else if (king.PieceColor == ChessPieceColor.Black)
    {
        if (board.BlackCheck)
        {
            return;
        }

        //There are two ways to castle, scenario 1:
        if (board.Squares[7].PlacedPiece != null)
        {
            //Check if the Right Rook is still in the correct position
            if (board.Squares[7].PlacedPiece.PieceType == ChessPieceType.Rook
                && !board.Squares[7].PlacedPiece.Moved)
            {
                if (board.Squares[7].PlacedPiece.PieceColor == king.PieceColor)
                {
                    //Move one column to right see if its empty

                    if (board.Squares[6].PlacedPiece == null)
                    {
                        if (board.Squares[5].PlacedPiece == null)
                        {
                            if (WhiteAttackBoard[5] == false && WhiteAttackBoard[6] == false)
                            {
                                //Ok looks like move is valid lets add it
                                king.ValidMoves.add(6);
                                BlackAttackBoard[6] = true;
                            }
                        }
                    }
                }
            }
        }
        //There are two ways to castle, scenario 2:
        if (board.Squares[0].PlacedPiece != null)
        {
            //Check if the Left Rook is still in the correct position
            if (board.Squares[0].PlacedPiece.PieceType == ChessPieceType.Rook &&
                !board.Squares[0].PlacedPiece.Moved)
            {
                if (board.Squares[0].PlacedPiece.PieceColor ==
                    king.PieceColor)
                {
                    //Move one column to right see if its empty
                    if (board.Squares[1].PlacedPiece == null)
                    {
                        if (board.Squares[2].PlacedPiece == null)
                        {
                            if (board.Squares[3].PlacedPiece == null)
                            {
                                if (WhiteAttackBoard[2] == false &&
                                    WhiteAttackBoard[3] == false)
                                {
                                    //Ok looks like move is valid lets add it
                                    king.ValidMoves.add(2);
                                    BlackAttackBoard[2] = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
  }
}
