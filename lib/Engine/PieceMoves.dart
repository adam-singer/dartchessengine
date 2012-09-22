
class PieceMoves {

  MoveArrays _moveArrays;
  
  
  
  void SetMovesBlackPawn()
  {
      for (int index = 8; index <= 55; index++)
      {
          var moveset = new PieceMoveSet(new List<int>());
          
          int x = (index % 8).toInt();
          int y = (index / 8).toInt();
          
          //Diagonal Kill
          if (y < 7 && x < 7)
          {
              moveset.Moves.add((index + 8 + 1).toInt());
              _moveArrays.BlackPawnTotalMoves[index]++;
          }
          if (x > 0 && y < 7)
          {
              moveset.Moves.add((index + 8 - 1).toInt());
              _moveArrays.BlackPawnTotalMoves[index]++;
          }
          
          //One Forward
          moveset.Moves.add((index + 8).toInt());
          _moveArrays.BlackPawnTotalMoves[index]++;

          //Starting Position we can jump 2
          if (y == 1)
          {
              moveset.Moves.add((index + 16).toInt());
              _moveArrays.BlackPawnTotalMoves[index]++;
          }

          _moveArrays.BlackPawnMoves[index] = moveset;
      }
  }
  
  void SetMovesWhitePawn()
  {
      for (int index = 8; index <= 55; index++)
      {
          int x = (index % 8).toInt();
          int y = (index / 8).toInt();

          var moveset = new PieceMoveSet(new List<int>());
         
          //Diagonal Kill
          if (x < 7 && y > 0)
          {
              moveset.Moves.add((index - 8 + 1).toInt());
              _moveArrays.WhitePawnTotalMoves[index]++;
          }
          if (x > 0 && y > 0)
          {
              moveset.Moves.add((index - 8 - 1).toInt());
              _moveArrays.WhitePawnTotalMoves[index]++;
          }

          //One Forward
          moveset.Moves.add((index - 8).toInt());
          _moveArrays.WhitePawnTotalMoves[index]++;

          //Starting Position we can jump 2
          if (y == 6)
          {
              moveset.Moves.add((index - 16).toInt());
              _moveArrays.WhitePawnTotalMoves[index]++;
          }

          _moveArrays.WhitePawnMoves[index] = moveset;
      }
  }
  
  void SetMovesKnight()
  {
      for (int y = 0; y < 8; y++)
      {
          for (int x = 0; x < 8; x++)
          {
              int index = (y + (x * 8)).toInt();

              var moveset = new PieceMoveSet(new List<int>());
              
              int move;

              if (y < 6 && x > 0)
              {
                  move = Position((y + 2).toInt(), (x - 1).toInt());

                  if (move < 64)
                  {
                      moveset.Moves.add(move);
                      _moveArrays.KnightTotalMoves[index]++;
                  }
              }

              if (y > 1 && x < 7)
              {
                  move = Position((y - 2).toInt(), (x + 1).toInt());

                  if (move < 64)
                  {
                      moveset.Moves.add(move);
                      _moveArrays.KnightTotalMoves[index]++;
                  }
              }

              if (y > 1 && x > 0)
              {
                  move = Position((y - 2).toInt(), (x - 1).toInt());

                  if (move < 64)
                  {
                      moveset.Moves.add(move);
                      _moveArrays.KnightTotalMoves[index]++;
                  }
              }

              if (y < 6 && x < 7)
              {
                  move = Position((y + 2).toInt(), (x + 1).toInt());

                  if (move < 64)
                  {
                      moveset.Moves.add(move);
                      _moveArrays.KnightTotalMoves[index]++;
                  }
              }

              if (y > 0 && x < 6)
              {
                  move = Position((y - 1).toInt(), (x + 2).toInt());

                  if (move < 64)
                  {
                      moveset.Moves.add(move);
                      _moveArrays.KnightTotalMoves[index]++;
                  }
              }

              if (y < 7 && x > 1)
              {
                  move = Position((y + 1).toInt(), (x - 2).toInt());

                  if (move < 64)
                  {
                      moveset.Moves.add(move);
                      _moveArrays.KnightTotalMoves[index]++;
                  }
              }

              if (y > 0 && x > 1)
              {
                  move = Position((y - 1).toInt(), (x - 2).toInt());

                  if (move < 64)
                  {
                      moveset.Moves.add(move);
                      _moveArrays.KnightTotalMoves[index]++;
                  }
              }
              
              if (y < 7 && x < 6)
              {
                  move = Position((y + 1).toInt(), (x + 2).toInt());

                  if (move < 64)
                  {
                      moveset.Moves.add(move);
                      _moveArrays.KnightTotalMoves[index]++;
                  }
              }

              _moveArrays.KnightMoves[index] = moveset;
          }
      }
  }
  
  void SetMovesBishop()
  {
      for (int y = 0; y < 8; y++)
      {
          for (int x = 0; x < 8; x++)
          {
              int index = (y + (x * 8)).toInt();

              var moveset = new PieceMoveSet(new List<int>());
              int move;

              int row = x;
              int col = y;

              while (row < 7 && col < 7)
              {
                  row++;
                  col++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.BishopTotalMoves1[index]++;
              }

              _moveArrays.BishopMoves1[index] = moveset;
              moveset = new PieceMoveSet(new List<int>());

              row = x;
              col = y;

              while (row < 7 && col > 0)
              {
                  row++;
                  col--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.BishopTotalMoves2[index]++;
              }

              _moveArrays.BishopMoves2[index] = moveset;
              moveset = new PieceMoveSet(new List<int>());

              row = x;
              col = y;

              while (row > 0 && col < 7)
              {
                  row--;
                  col++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.BishopTotalMoves3[index]++;
              }

              _moveArrays.BishopMoves3[index] = moveset;
              moveset = new PieceMoveSet(new List<int>());

              row = x;
              col = y;

              while (row > 0 && col > 0)
              {
                  row--;
                  col--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.BishopTotalMoves4[index]++;
              }

              _moveArrays.BishopMoves4[index] = moveset;
          }
      }
  }
  
  
  void SetMovesRook()
  {
      for (int y = 0; y < 8; y++)
      {
          for (int x = 0; x < 8; x++)
          {
              int index = (y + (x * 8)).toInt();

              var moveset = new PieceMoveSet(new List<int>());
              int move;

              int row = x;
              int col = y;

              while (row < 7)
              {
                  row++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.RookTotalMoves1[index]++;
              }

              _moveArrays.RookMoves1[index] = moveset;

              moveset = new PieceMoveSet(new List<int>());
              row = x;
              col = y;

              while (row > 0)
              {
                  row--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.RookTotalMoves2[index]++;
              }

              _moveArrays.RookMoves2[index] = moveset;

              moveset = new PieceMoveSet(new List<int>());
              row = x;
              col = y;

              while (col > 0)
              {
                  col--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.RookTotalMoves3[index]++;
              }

              _moveArrays.RookMoves3[index] = moveset;

              moveset = new PieceMoveSet(new List<int>());
              row = x;
              col = y;

              while (col < 7)
              {
                  col++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.RookTotalMoves4[index]++;
              }

              _moveArrays.RookMoves4[index] = moveset;
          }
      }
  }
  
  
  void SetMovesQueen()
  {
      for (int y = 0; y < 8; y++)
      {
          for (int x = 0; x < 8; x++)
          {
              int index = (y + (x * 8)).toInt();

              var moveset = new PieceMoveSet(new List<int>());
              int move;

              int row = x;
              int col = y;

              while (row < 7)
              {
                  row++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.QueenTotalMoves1[index]++;
              }

              _moveArrays.QueenMoves1[index] = moveset;

              moveset = new PieceMoveSet(new List<int>());
              row = x;
              col = y;

              while (row > 0)
              {
                  row--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.QueenTotalMoves2[index]++;
              }

              _moveArrays.QueenMoves2[index] = moveset;

              moveset = new PieceMoveSet(new List<int>());
              row = x;
              col = y;

              while (col > 0)
              {
                  col--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.QueenTotalMoves3[index]++;
              }

              _moveArrays.QueenMoves3[index] = moveset;

              moveset = new PieceMoveSet(new List<int>());
              row = x;
              col = y;

              while (col < 7)
              {
                  col++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.QueenTotalMoves4[index]++;
              }

              _moveArrays.QueenMoves4[index] = moveset;

              moveset = new PieceMoveSet(new List<int>());
              row = x;
              col = y;

              while (row < 7 && col < 7)
              {
                  row++;
                  col++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.QueenTotalMoves5[index]++;
              }

              _moveArrays.QueenMoves5[index] = moveset;

              moveset = new PieceMoveSet(new List<int>());
              row = x;
              col = y;

              while (row < 7 && col > 0)
              {
                  row++;
                  col--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.QueenTotalMoves6[index]++;
              }

              _moveArrays.QueenMoves6[index] = moveset;

              moveset = new PieceMoveSet(new List<int>());
              row = x;
              col = y;

              while (row > 0 && col < 7)
              {
                  row--;
                  col++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.QueenTotalMoves7[index]++;
              }

              _moveArrays.QueenMoves7[index] = moveset;

              moveset = new PieceMoveSet(new List<int>());
              row = x;
              col = y;

              while (row > 0 && col > 0)
              {
                  row--;
                  col--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.QueenTotalMoves8[index]++;
              }

              _moveArrays.QueenMoves8[index] = moveset;
          }
      }
  }
  
  void SetMovesKing()
  {
      for (int y = 0; y < 8; y++)
      {
          for (int x = 0; x < 8; x++)
          {
              int index = (y + (x * 8)).toInt();

              var moveset = new PieceMoveSet(new List<int>());
              int move;

              int row = x;
              int col = y;

              if (row < 7)
              {
                  row++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.KingTotalMoves[index]++;
              }

              row = x;
              col = y;

              if (row > 0)
              {
                  row--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.KingTotalMoves[index]++;
              }

              row = x;
              col = y;

              if (col > 0)
              {
                  col--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.KingTotalMoves[index]++;
              }

              row = x;
              col = y;

              if (col < 7)
              {
                  col++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.KingTotalMoves[index]++;
              }

              row = x;
              col = y;

              if (row < 7 && col < 7)
              {
                  row++;
                  col++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.KingTotalMoves[index]++;
              }

              row = x;
              col = y;

              if (row < 7 && col > 0)
              {
                  row++;
                  col--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.KingTotalMoves[index]++;
              }

              row = x;
              col = y;

              if (row > 0 && col < 7)
              {
                  row--;
                  col++;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.KingTotalMoves[index]++;
              }


              row = x;
              col = y;

              if (row > 0 && col > 0)
              {
                  row--;
                  col--;

                  move = Position(col, row);
                  moveset.Moves.add(move);
                  _moveArrays.KingTotalMoves[index]++;
              }

              _moveArrays.KingMoves[index] = moveset;
          }
      }
  }

  
  
  int Position(int col, int row)
  {
      return col + (row * 8);
  }
  
  MoveArrays InitiateChessPieceMotion()
  {
      _moveArrays = new MoveArrays();
    
      _moveArrays.WhitePawnMoves = new List<PieceMoveSet>(64);
      _moveArrays.WhitePawnTotalMoves = new List<int>(64);

      _moveArrays.BlackPawnMoves = new List<PieceMoveSet>(64);
      _moveArrays.BlackPawnTotalMoves = new List<int>(64);

      _moveArrays.KnightMoves = new List<PieceMoveSet>(64);
      _moveArrays.KnightTotalMoves = new List<int>(64);

      _moveArrays.BishopMoves1 = new List<PieceMoveSet>(64);
      _moveArrays.BishopTotalMoves1 = new List<int>(64);

      _moveArrays.BishopMoves2 = new List<PieceMoveSet>(64);
      _moveArrays.BishopTotalMoves2 = new List<int>(64);

      _moveArrays.BishopMoves3 = new List<PieceMoveSet>(64);
      _moveArrays.BishopTotalMoves3 = new List<int>(64);

      _moveArrays.BishopMoves4 = new List<PieceMoveSet>(64);
      _moveArrays.BishopTotalMoves4 = new List<int>(64);

      _moveArrays.RookMoves1 = new List<PieceMoveSet>(64);
      _moveArrays.RookTotalMoves1 = new List<int>(64);

      _moveArrays.RookMoves2 = new List<PieceMoveSet>(64);
      _moveArrays.RookTotalMoves2 = new List<int>(64);

      _moveArrays.RookMoves3 = new List<PieceMoveSet>(64);
      _moveArrays.RookTotalMoves3 = new List<int>(64);

      _moveArrays.RookMoves4 = new List<PieceMoveSet>(64);
      _moveArrays.RookTotalMoves4 = new List<int>(64);

      _moveArrays.QueenMoves1 = new List<PieceMoveSet>(64);
      _moveArrays.QueenTotalMoves1 = new List<int>(64);

      _moveArrays.QueenMoves2 = new List<PieceMoveSet>(64);
      _moveArrays.QueenTotalMoves2 = new List<int>(64);

      _moveArrays.QueenMoves3 = new List<PieceMoveSet>(64);
      _moveArrays.QueenTotalMoves3 = new List<int>(64);

      _moveArrays.QueenMoves4 = new List<PieceMoveSet>(64);
      _moveArrays.QueenTotalMoves4 = new List<int>(64);

      _moveArrays.QueenMoves5 = new List<PieceMoveSet>(64);
      _moveArrays.QueenTotalMoves5 = new List<int>(64);

      _moveArrays.QueenMoves6 = new List<PieceMoveSet>(64);
      _moveArrays.QueenTotalMoves6 = new List<int>(64);

      _moveArrays.QueenMoves7 = new List<PieceMoveSet>(64);
      _moveArrays.QueenTotalMoves7 = new List<int>(64);

      _moveArrays.QueenMoves8 = new List<PieceMoveSet>(64);
      _moveArrays.QueenTotalMoves8 = new List<int>(64);

      _moveArrays.KingMoves = new List<PieceMoveSet>(64);
      _moveArrays.KingTotalMoves = new List<int>(64);
      
      for (int i=0; i<64; i++) {
        _moveArrays.WhitePawnTotalMoves[i]=0;
        _moveArrays.BlackPawnTotalMoves[i]=0;
        _moveArrays.KnightTotalMoves[i]=0;
        _moveArrays.BishopTotalMoves1[i]=0;
        _moveArrays.BishopTotalMoves2[i]=0;
        _moveArrays.BishopTotalMoves3[i]=0;
        _moveArrays.BishopTotalMoves4[i]=0;
        _moveArrays.RookTotalMoves1[i]=0;
        _moveArrays.RookTotalMoves2[i]=0;
        _moveArrays.RookTotalMoves3[i]=0;
        _moveArrays.RookTotalMoves4[i]=0;
        _moveArrays.QueenTotalMoves1[i]=0;
        _moveArrays.QueenTotalMoves2[i]=0;
        _moveArrays.QueenTotalMoves3[i]=0;
        _moveArrays.QueenTotalMoves4[i]=0;
        _moveArrays.QueenTotalMoves5[i]=0;
        _moveArrays.QueenTotalMoves6[i]=0;
        _moveArrays.QueenTotalMoves7[i]=0;
        _moveArrays.QueenTotalMoves8[i]=0;
        _moveArrays.KingTotalMoves[i]=0;
      }
      
      SetMovesWhitePawn();
      SetMovesBlackPawn();
      SetMovesKnight();
      SetMovesBishop();
      SetMovesRook();
      SetMovesQueen();
      SetMovesKing();
      
      return _moveArrays;
  }
}
