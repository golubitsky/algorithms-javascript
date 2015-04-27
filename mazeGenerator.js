function Cell () {
  //up right down left
  this.children = new Array(4)
  this.inPath = false;
  this.nextX;
  this.nextY;
  this.start;
  this.end;
}

Cell.prototype._printTopLine = function () {
  var str;
  var char = " "
  if (this.inPath) {
    char = "O"
  } else if (this.end) {
    char = "F"
  } else if (this.start) {
    char = "S"
  }

  str = this.children[1] ? char + " " : char + "X"
  return str;
}

Cell.prototype._printBottomLine = function () {
  return this.children[2] ? " X" : "XX"
}

function Maze (yMax, xMax) {
  this.x = xMax;
  this.y = yMax;
  this.dataStore = this._generate();
  this._randomize()
}

Maze.prototype._generate = function () {
  var dataStore = [];
  for (var y = 0; y < this.y; y++) {
    var row = [];
    for (var x = 0; x < this.x; x++) {
      row.push(new Cell());
    }
    dataStore.push(row)
  }
  return dataStore;
}

Maze.prototype._randomize = function () {
  var open;

  for (var y = this.y - 1; y >= 0; y--) {
    for (var x = 0; x < this.x; x++) {
      open = null;

      if (y > 0 && x < this.x - 1) {
        open = Math.round(Math.random())
      } else if (y > 0) {
        open = 0;
      } else if (x < this.x - 1) {
        open = 1;
      } else {
        //do nothing for upper-right
        break
      }

      //open opposite node for searching
      if (open === 0) {
        this.dataStore[y - 1][x].children[open + 2] = [y,x];
        this.dataStore[y][x].children[open] = [y - 1, x];
      } else {
        this.dataStore[y][x + 1].children[open + 2] = [y,x];
        this.dataStore[y][x].children[open] = [y, x + 1];
      }
    }
  }
}

Maze.prototype.print = function () {
  var cell, topRow, bottomRow;
  //top row
  console.log(new Array(this.x * 2 + 2).join('X'));

  for (y = 0; y < this.y; y++) {
    topRow = ['X'], bottomRow = ['X'];
    for (x = 0; x < this.x; x++) {
      cell = this.dataStore[y][x];
      topRow.push(cell._printTopLine());
      bottomRow.push(cell._printBottomLine());
    }
    console.log(topRow.join(''));
    console.log(bottomRow.join(''));
  }
}

Maze.prototype.solve = function (y,x) {
  var startX = x || Math.floor(Math.random() * this.x);
  var startY = y || Math.floor(Math.random() * this.y);

  var seen = {};
  seen[undefined] = true;
  var coord, cell, x, y;
  var q = [ [startY, startX] ];
  var curCell;

  while (q.length) {
    coord = q.shift();

    y = coord[0];
    x = coord[1];
    cell = this.dataStore[y][x];

    cell.children.forEach(function (childCoord) {
      if (!seen[childCoord]) {
        seen[childCoord] = true;
        var childY = childCoord[0];
        var childX = childCoord[1];
        this.dataStore[childY][childX].nextX = x;
        this.dataStore[childY][childX].nextY = y;
        q.push(childCoord)
      }
    }.bind(this));
  }
  return [startX, startY]
}

Maze.prototype._tracePathBack = function (coord) {
  var y = coord[0]
  var x = coord[1]
  var original = this.dataStore[y][x];
  var cell = this.dataStore[y][x];
  cell.start = true;
  while (cell) {
    if (cell.inPath) {
      return
    }
    cell.inPath = true;
    y = cell.nextY;
    x = cell.nextX;
    cell = this.dataStore[y][x];
  }
}

a = new Maze(10,20)
startEnd = a.solve(9, 1)
a._tracePathBack([0,0])
a.print()
// a.dataStore.forEach(function (row) {
//   row.forEach(function (node) {
//     console.log(node.nextY);
//     console.log(node.nextX);
//   });
// });
