/*
 * @author Deyan Rizov
 * 
 * This file is part of PGNParse.
 *
 * PGNParse is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * PGNParse is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PGNParse.  If not, see <http://www.gnu.org/licenses/>. 
 */
class PGNGame {
  Map<String, String> tags;
  List<PGNMove> moves;
  String pgn;
  
  PGNGame() {
    tags = {};
    moves = [];
  }
  
  PGNGame.fromString(this.pgn) : super() {
  }
  
  String toString() {
    return pgn == null ? "" : pgn;
  }
}
