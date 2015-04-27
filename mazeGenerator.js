function Cell () {
  //up right down left
  this.adjacents = new Array(4)
  this.inPath = false;
  this.nextX;
  this.nextY;
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
  return this.adjacents[2] ? " X" : "XX"
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
        this.dataStore[y - 1][x].adjacents[open + 2] = [y,x];
        this.dataStore[y][x].adjacents[open] = [y - 1, x];
      } else {
        this.dataStore[y][x + 1].adjacents[open + 2] = [y,x];
        this.dataStore[y][x].adjacents[open] = [y, x + 1];
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
  //TO DO re-initialize start/finish/
  var startX = x || Math.floor(Math.random() * this.x);
  var startY = y || Math.floor(Math.random() * this.y);

  var seen = {};
  seen[undefined] = true;
  var coord, cell, x, y;
  var q = [ [startY, startX] ];

  this.dataStore[y][x].end = true;

  while (q.length) {
    coord = q.shift();
    seen[coord] = true;

    y = coord[0];
    x = coord[1];
    cell = this.dataStore[y][x];


    cell.adjacents.forEach(function (adj) {
      if (!seen[adj]) {
        var adjY = adj[0];
        var adjX = adj[1];
        this.dataStore[adjY][adjX].nextX = x;
        this.dataStore[adjY][adjX].nextY = y;
        q.push(adj)
      }
    }.bind(this));
  }
  return [startY, startX]
}

Maze.prototype._tracePathBack = function (y,x) {
  var cell = this.dataStore[y][x];
  cell.start = true;
  while (cell.nextY !== undefined) {
    console.log(y, x)
    cell.inPath = true;
    y = cell.nextY;
    x = cell.nextX;
    cell = this.dataStore[y][x];
  }
}

a = new Maze(4,4)
a.solve(2,0)
a._tracePathBack(0,0)
a.print()
a.dataStore.forEach(function (row) {
  row.forEach(function (node) {
    console.log(node.inPath);
  });
});
