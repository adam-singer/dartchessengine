
class Utils {
  static int col(sq) {
    var _col = sq.charCodeAt(0) - 96;
    if (_col < 1 || _col > 8) {
        throw "Invalid position";
    }
    return _col;
  }
  
  static int row(sq) {
    var _row = sq.charCodeAt(1) - 48;
    if (_row < 1 || _row > 8) {
        throw "Invalid position";
    }
    return _row;
  }
  
  static String toSquare(_col, _row) {
    if (_row < 1 || _row > 8 || _col < 1 || _col > 8) {
      return null;
    }
    
    return new String.fromCharCodes([96 + _col, 48 + _row]);
  }
  
  checkSquareValidity(sq) {
    
  }
}
