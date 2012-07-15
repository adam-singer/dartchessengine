
class Engine {
  Board ChessBoard;
  Board PreviousChessBoard;

  ChessPieceColor HumanPlayer;
  
  ChessPieceColor get WhoseMove() => ChessBoard.WhoseMove;
  set WhoseMove(ChessPieceColor value) => ChessBoard.WhoseMove = value;
  
  PieceMoves _pieceMoves;
  PieceValidMoves _pieceValidMoves;
  MoveArrays _moveArrays;
  Board _board;
  Engine()
  {           
      _InitiateBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  }

  Engine.fromString(String fen)
  {
      _InitiateBoard(fen);
  }
  
  void _InitiateBoard(String fen)
  {
      HumanPlayer = ChessPieceColor.White;    
      ChessBoard = new Board.fromString(fen);
      ChessBoard.WhoseMove = ChessPieceColor.White;
      _pieceMoves = new PieceMoves();
      _moveArrays = _pieceMoves.InitiateChessPieceMotion();
      _pieceValidMoves = new PieceValidMoves(_moveArrays);
      _board = new Board();
      _GenerateValidMoves();           
  }
  
  void _GenerateValidMoves()
  {
    _pieceValidMoves.GenerateValidMoves(ChessBoard);
  }
  
  int _GetBoardIndex(int BoardColumn, int BoardRow)
  {
      return (BoardColumn + (BoardRow * 8)).toInt();
  }
  
  bool GetChessPieceSelected(int boardColumn, int boardRow)
  {
      int index = _GetBoardIndex(boardColumn, boardRow);

      if (ChessBoard.Squares[index].PlacedPiece == null)
      {
          return false;
      }

      return ChessBoard.Squares[index].PlacedPiece.Selected;
  }
  
  List<int> GetEnPassantMoves()
  {
      if (ChessBoard == null)
      {
          return null;
      }

      var returnArray = new List<int>(2);

      returnArray[0] = (ChessBoard.EnPassantPosition % 8).toInt();
      returnArray[1] = (ChessBoard.EnPassantPosition / 8).toInt();

      return returnArray;
  }
  
  ChessPieceColor GetPieceColorAt(int boardColumn, int boardRow)
  {
      int index = _GetBoardIndex(boardColumn, boardRow);

      if (ChessBoard.Squares[index].PlacedPiece == null)
      {
          return ChessPieceColor.White;
      }
      return ChessBoard.Squares[index].PlacedPiece.PieceColor;
  }
  
  ChessPieceColor GetPieceColorAtIndex(int index)
  {
      if (ChessBoard.Squares[index].PlacedPiece == null)
      {
          return ChessPieceColor.White;
      }
      return ChessBoard.Squares[index].PlacedPiece.PieceColor;
  }
  
  ChessPieceType GetPieceTypeAt(int boardColumn, int boardRow)
  {
      int index = _GetBoardIndex(boardColumn, boardRow);

      if (ChessBoard.Squares[index].PlacedPiece == null)
      {
          return ChessPieceType.None;
      }

      return ChessBoard.Squares[index].PlacedPiece.PieceType;
  }
  
  ChessPieceType GetPieceTypeAtIndex(int index)
  {
      if (ChessBoard.Squares[index].PlacedPiece == null)
      {
          return ChessPieceType.None;
      }

      return ChessBoard.Squares[index].PlacedPiece.PieceType;
  }
  
// TODO: GetValidMoves should return empty list
  List<List<int>> GetValidMoves(int boardColumn, int boardRow)
  {
      int index = _GetBoardIndex(boardColumn, boardRow);

      if (ChessBoard.Squares[index].PlacedPiece == null)
      {
          return null;
      }

      var returnArray = new List<List<int>>(ChessBoard.Squares[index].PlacedPiece.ValidMoves.length);
      //var returnArray = new byte[ChessBoard.Squares[index].Piece.ValidMoves.Count][];
      int counter = 0;

      for (int square in ChessBoard.Squares[index].PlacedPiece.ValidMoves)
      {
          returnArray[counter] = new List<int>(2);
          returnArray[counter][0] = (square % 8).toInt();
          returnArray[counter][1] = (square / 8).toInt();
          counter++;
      }

      return returnArray;
  }
  
  bool IsValidMove(int sourceColumn, int sourceRow, int destinationColumn, int destinationRow)
  {
      if (ChessBoard == null)
      {
          return false;
      }

      if (ChessBoard.Squares == null)
      {
          return false;
      }

      int index = _GetBoardIndex(sourceColumn, sourceRow);

      if (ChessBoard.Squares[index].PlacedPiece == null)
      {
          return false;
      }

      for (int bs in ChessBoard.Squares[index].PlacedPiece.ValidMoves)
      {
          if ((bs % 8).toInt() == destinationColumn.toInt())
          {
              if ((bs / 8).toInt() == destinationRow.toInt())
              {
                  return true;
              }
          }
      }

      index = _GetBoardIndex(destinationColumn, destinationRow);

      if (index == ChessBoard.EnPassantPosition)
      {
          return true;
      }

      return false;
  }
  
  bool MovePiece(int sourceColumn, int sourceRow, int destinationColumn, int destinationRow)
  {
    int srcPosition = (sourceColumn + (sourceRow * 8)).toInt();
    int dstPosition = (destinationColumn + (destinationRow * 8)).toInt();

      Piece piece = ChessBoard.Squares[srcPosition].PlacedPiece;

      PreviousChessBoard = new Board.fromBoard(ChessBoard);
      
      

      _board.MovePiece(ChessBoard, srcPosition, dstPosition, ChessPieceType.Queen);

      _pieceValidMoves.GenerateValidMoves(ChessBoard);
     

      //If there is a check in place, check if this is still true;
      if (piece.PieceColor == ChessPieceColor.White)
      {
          if (ChessBoard.WhiteCheck)
          {
              //Invalid Move
              ChessBoard = new Board.fromBoard(PreviousChessBoard);
              _pieceValidMoves.GenerateValidMoves(ChessBoard);
              return false;
          }
      }
      else if (piece.PieceColor == ChessPieceColor.Black)
      {
          if (ChessBoard.BlackCheck)
          {
              //Invalid Move
              ChessBoard = new Board.fromBoard(PreviousChessBoard);
              _pieceValidMoves.GenerateValidMoves(ChessBoard);
              return false;
          }
      }

      return true;

  }
  
  void SetChessPieceSelection(int boardColumn, int boardRow,
                              bool selection) {
      int index = _GetBoardIndex(boardColumn, boardRow);
      
      if (ChessBoard.Squares[index].PlacedPiece == null)
      {
          return;
      }
      //if (ChessBoard.Squares[index].PlacedPiece.PieceColor != HumanPlayer)
      //{
      //    return;
      //}
      if (ChessBoard.Squares[index].PlacedPiece.PieceColor != WhoseMove)
      {
          return;
      }
      ChessBoard.Squares[index].PlacedPiece.Selected = selection;
  }
  
}
