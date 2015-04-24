function Tree (start) {
  this.head = new Node(start);
  this.currentNode;
  this.seen = { start: true };
}

Tree.prototype.bfs = function (goal) {
  var currentNode;
  if (this.head.data.length !== goal.length) {
    throw("start/end strings must be of same length");
  }

  var q = [this.head]
  while (q.length) {
    currentNode = q.shift();
    if (currentNode.data === goal) {
      return this._tracePathBack(currentNode);
    }
    currentNode.childrenStrings().forEach(function (childStr) {
      if (!this.seen[childStr]) {
        q.push(new Node(childStr, currentNode))
        this.seen[childStr] = true;
      }
    }.bind(this));
  }

  return false;
}

Tree.prototype._tracePathBack = function (node) {
  var path = []
  var currentNode = node;
  while (currentNode) {
    path.unshift(currentNode.data);
    currentNode = currentNode.parent;
  }
  return path.join('-');
}

function Node (data, parent) {
  this.data = data;
  this.parent = parent;
}

Node.prototype.childrenStrings = function () {
  var children = [];

  for (var i = 0; i < this.data.length; i++) {
    ['nextChar', 'prevChar'].forEach(function (method) {
      var charToReplace = this.data.charAt(i);
      var childStr = this.data.slice(0, i) +
                this[method](charToReplace) +
                this.data.slice(i + 1);
      children.push(childStr);
    }.bind(this));
  }

  this._children = children;
  return children;

}

Node.prototype.nextChar = function (char) {
  return char == 'z' ? 'a' : String.fromCharCode((char.charCodeAt(0) + 1));
}

Node.prototype.prevChar = function (char) {
  return char == 'a' ? 'z' : String.fromCharCode((char.charCodeAt(0) - 1));
}

a = new Tree('bag');
console.log(a.bfs('lab'))

[av bg tv]
agv
abt
act = valid
