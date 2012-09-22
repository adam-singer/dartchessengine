Dart Chess Engine
=================

# Introduction #

A simple chess engine ported to dart from C#. [Adam Berent](http://www.chessbin.com/) is one of the original authors of the C# code. The port to dart was relativity direct with the idea of building chess interfaces in different dart frameworks. Current state is unstable and untested. 

## Status: Alpha ##
This code is alpha.

## Getting Started ##
Create a Dart project and add a **pubspec.yaml** file to it

```
dependencies:
  dartchessengine:
    git: https://github.com/financeCoding/dartchessengine.git
```
and run **pub install** to install **dartchessengine** (including its dependencies). 

```
#import('package:dartchessengine/chess_engine.dart');
```


Resources
---------
* [chessbin](http://www.chessbin.com/)
* [Forsyth–Edwards Notation](http://www.chessgames.com/fenhelp.html)

TODO
----
* Finish PGN 