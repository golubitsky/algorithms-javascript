function Cell (y,x) {
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

function Maze (yMax, xMax) {
  this.x = xMax;
  this.y = yMax;
  this.dataStore = this._generate();
  this._randomize()
  this._generateHTML();
}

Maze.prototype.regenerate = function () {
  this._randomize()
  this._reset()
}
Maze.prototype._generate = function () {
  var dataStore = [];
  for (var y = 0; y < this.y; y++) {
    var row = [];
    for (var x = 0; x < this.x; x++) {
      row.push(new Cell(y, x));
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

Maze.prototype._generateHTML = function () {
  var maze = document.getElementById('maze');
  for (var y= 0; y < this.y; y++) {
    for (var x = 0; x < this.x; x++) {
      var el = document.createElement('div')
      el.setAttribute('x', x)
      el.setAttribute('y', y)
      var classes = []

      this.dataStore[y][x].adjacents.forEach(function (adj, index) {
        if (adj) {
          switch(index) {
            case 0:
              classes.push('up-open');
              break;
            case 1:
              classes.push('right-open');
              break;
            case 2:
              classes.push('down-open');
              break;
            case 3:
              classes.push('left-open');
              break;
          }
        }
      });

      el.className = classes.join(' ');
      maze.appendChild(el);
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
  this.end = [y,x];
  //TO DO re-initialize start/finish/
  this._reset()

  var seen = {undefined: true};

  var coord, cell, x, y;
  var q = [ [y, x] ];

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
        this.dataStore[adjY][adjX].parent = cell;
        q.push(adj)
      }
    }.bind(this));
  }
  this._tracePathBack(0,0);
}

Maze.prototype._tracePathBack = function (y,x) {
  this.start = [y,x]
  var cell = this.dataStore[y][x];
  var el;
  cell.start = true;
  while (cell) {
    el = document.querySelector('[x=\"' + cell.x + '\"][y=\"'+ cell.y +'\"]');
    el.className += " in-path"
    cell = cell.parent
  }
}

Maze.prototype._reset = function () {


  for (var y = 0; y < this.y; y++) {
    for (var x = 0; x < this.x; x++) {

      this.dataStore[y][x].parent = undefined;
    }
  }
  var maze = document.getElementById('maze').innerHTML = ''
  this._generateHTML();
}
