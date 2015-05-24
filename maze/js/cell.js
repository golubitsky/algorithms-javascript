;(function() {
  if (typeof mazeSolver === "undefined") {
    window.mazeSolver = {};
  }

  Cell = mazeSolver.Cell = function (y,x) {
    //up right down left
    this.y = y;
    this.x = x;
    this.adjacents = new Array(4)
    this.inPath = false;
    this.parent;
    this.start;
    this.end;
  }

  Cell.prototype._printTopLine = function () {
    var str;
    var char = " "
    if (this.start) {
      char = "S"
    } else if (this.end) {
      char = "F"
    } else if (this.inPath) {
      char = "O"
    }

    str = this.adjacents[1] ? char + " " : char + "X"
    return str;
  }

  Cell.prototype._printBottomLine = function () {
    var char = this.inPath ? "O" : " "
    // if (this.parent && this.parent.x != this.x) {
    //   char = "X"
    // }
    return this.adjacents[2] ? char + "X" : "XX"
  }
}());
