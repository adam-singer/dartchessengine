
class ChessPieceColor {
  const ChessPieceColor(this._value, this._name);
  final int _value;
  final String _name;
  String toString() => _name;
  int get value() => _value;
  
  static final White = const ChessPieceColor(0, "White");
  static final Black = const ChessPieceColor(1, "Black");
}
