console.log('probability');

//find probability of getting (goal int) given (nestings int) nested calls to rand, given (start int)
function probRand (start, nestings, goal) {
  if (nestings === 1 && start > goal) {
    return 1/start;
  } else if (nestings === 1) {
    return 0;
  }

  var p = 0;
  for (var i = start - 1; i > goal; i--) {
    var inner = probRand(i, nestings - 1, goal);
    var current = (1/start) * inner;
    p += current;
  }

  return p;
}

//find probability a knight exits the chess board given starting position from 1-8(x),1-8(y) and number of jumps(n); once exited the knight cannot return;

function Knight (pos) {
  this.x = pos[0];
  this.y = pos[1];
}

Knight.moves = function () {
  return [[1,2], [1,-2], [2,1], [2,-1], [-1,-2], [-1,2], [-2,-1], [-2,1] ]
}

Knight.prototype.nextPositions = function () {
  var positions = [];
  var newPos, newX, newY;
  Knight.moves().forEach(function (move) {
    newPos = [];
    newX = this.x + move[0];
    newY = this.y + move[1];
    if (newX <= 8 && newX >= 1 && newY <=8 && newY >= 1) {
      newPos.push(newX);
      newPos.push(newY);
      positions.push(newPos);
    }
  }.bind(this));
  return positions;
}

Knight.prototype.offProb = function () {
  return 1 - this.nextPositions().length/8;
}

Knight.prototype.onProb = function () {
  return this._onProb || this.nextPositions().length/8;
}

function onBoardProbability (pos, n) {
  //too slow!
  var currentKnight = new Knight(pos);
  if (n === 1) {
    return currentKnight.onProb();
  }
  var prob = 0;
  var nextKnight;
  currentKnight.nextPositions().forEach(function (nextPos) {
    prob += (1/8) * onBoardProbability(nextPos, n - 1);
  });
  return prob;
}

// console.log(onBoardProbability([1,1],8));
function Board () {
  this.grid = this._constructGrid();
}

Board.prototype._constructGrid = function () {
  var grid = [null]
  var row;
  for (var y = 1; y <= 8; y++) {
    row = [null]
    for (var x = 1; x <= 8; x++) {
      row.push(new Knight([x,y]));
    }
    grid.push(row);
  }
  return grid;
}

Board.prototype.computeNext = function () {
  var newGrid = [null];
  var row, knight, newKnight, otherKnight, otherKnightProbabilityTotal;
  for (var y = 1; y <= 8; y++) {
    row = [null];
    for (var x = 1; x <= 8; x++) {
      otherKnightProbabilityTotal = 0;
      knight = this.getPos([x,y]);

      knight.nextPositions().forEach(function (pos) {
        otherKnight = this.getPos(pos);
        otherKnightProbabilityTotal += otherKnight.onProb();
      }.bind(this));

      newKnight = new Knight([x,y]);
      newKnight._onProb = ((1 * otherKnightProbabilityTotal)/8);
      row.push(newKnight);
    }
    newGrid.push(row);
  }
  this.grid = newGrid;
}

Board.prototype.computeN = function (n) {
  //board initializes with probabilities so first iteration unnecessary
  for (var i = 1; i < n; i++) {
    this.computeNext();
  }
}
Board.prototype.getPos = function (pos) {
  return this.grid[pos[1]][pos[0]];
}

b = new Board();
b.computeN(3)

console.log(b.getPos([4,4]).onProb());
