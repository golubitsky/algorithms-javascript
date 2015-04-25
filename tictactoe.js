require('./graph.js')

function Board (startMark) {
  this.mark = startMark || 'x';
  this.data = Board._generateBoard();
  }

Board._generateBoard = function () {
  var board = []
  for (i = 0; i < 3; i++) {
    var row = [];
    for (j = 0; j < 3; j++) {
      row.push(undefined);
    }
    board.push(row)
  }
  return board;
}
Board.prototype.placeMark = function(x, y) {
  var square = this.data[y][x]
  if (square !== undefined || square === this.mark) {
    //TO DO error
    return false;
  } else {
    this.data[y][x] = this.mark;

    var winMark = this.isWon()

    this.mark = this.mark === 'x' ? 'o' : 'x'
    return winMark || true;

  }
}

Board.prototype.isWon = function () {
  return this._checkRowsCols || this._checkDiags;
}

Board.prototype._checkRowsCols = function () {
  var row = true;
  var col = true;
  for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
      if (this.data[y][x] !== this.mark) { row = false }
      if (this.data[x][y] !== this.mark) { col = false }
      if (row === false && col === false) { return false }
    }
  }
  return row || col;
}

Board.prototype._checkDiags = function () {
  diag1 = true;
  diag2 = true;
  for (var i = 0; i < 3; i++) {
    if (this.data[i][i] !== this.mark) { diag1 = false }
    if (this.data[i][2 - i] !== this.mark) { diag2 = false }
  }
  return diag1 || diag2;
}

a = new Board()
a.placeMark(1,2)
a.placeMark(1,1)
a.placeMark(1,2)
console.log(a.data)
