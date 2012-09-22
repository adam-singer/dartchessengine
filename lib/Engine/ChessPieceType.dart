
class ChessPieceType {
  const ChessPieceType(this._value, this._name);
  final int _value;
  final String _name;
  String toString() => _name;
  int get value() => _value;
  
  static final King = const ChessPieceType(0, "King");
  static final Queen = const ChessPieceType(1, "Queen");
  static final Rook = const ChessPieceType(2, "Rook");
  static final Bishop = const ChessPieceType(3, "Bishop");
  static final Knight = const ChessPieceType(4, "Knight");
  static final Pawn = const ChessPieceType(5, "Pawn");
  static final None = const ChessPieceType(6, "None");
 
}
