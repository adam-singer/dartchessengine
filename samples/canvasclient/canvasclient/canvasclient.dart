
#import('dart:html');
#source("Board.dart");
num rotatePos = 0;

void main() {
  //query("#text").text = "Welcome to Dart!";

  //query("#text").on.click.add(rotateText);
  Board b = new Board();
  b.draw();
}

void rotateText(Event event) {
  rotatePos += 360;

  var textElement = query("#text");

  textElement.style.transition = "1s";
  textElement.style.transform = "rotate(${rotatePos}deg)";
}
