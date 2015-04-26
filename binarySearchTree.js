function BST (data) {
  this.data = data;
  this.left = null;
  this.right = null;
}

BST.prototype.add = function (newData) {
  if (!this.data) {
    this.data = newData;
  } else if (newData <= this.data && !this.left) {
    this.left = new BST(newData);
  } else if (newData <= this.data) {
    this.left.add(newData);
  } else if (newData > this.data && !this.right) {
    this.right = new BST(newData);
  } else if (newData > this.data) {
    this.right.add(newData);
  }
}

BST.prototype.remove = function (val) {
  var current = this;
  var previous;
  var branch;
  while (current) {
    if (val === current.data) {
      if (!current.left && !current.right && !previous) {
        current.data = null;
      } else if (!current.left && !current.right) {
        previous[branch] = null;
      } else if (!current.left) {
        previous[branch] = current.right;
      } else if (!current.right) {
        previous[branch] = current.left;
      } else if (current.left && current.right) {
        //find minRightSubTree
          var rst = current.right
          var minRST = rst.min();
        //replace current.data with minRST
          current.data = minRST;
        //remove minRST
          rst.remove(minRST)
      }

      return true;
    }

    previous = current;
    if (val < current.data) {
      current = current.left;
      branch = 'left';
    } else if (val > current.data) {
      current = current.right;
      branch = 'right';
    }
  }

  return false
}

BST.prototype.min = function () {
  var current = this;

  while (current.left) {
    current = current.left;
  }

  return current.data;
}

BST.prototype.max = function () {
  var current = this;

  while (current.right) {
    current = current.right;
  }

  return current.data;
}

BST.prototype.traversePreOrder = function () {
  arr = arguments[0] || [];

  arr.push(this.data)
  if (this.left) { this.left.traversePreOrder(arr) }
  if (this.right) { this.right.traversePreOrder(arr) }

  return arr;
}

BST.prototype.traverseInOrder = function () {
  arr = arguments[0] || [];

  if (this.left) { this.left.traverseInOrder(arr) }
  arr.push(this.data)
  if (this.right) { this.right.traverseInOrder(arr) }

  return arr;
}

BST.prototype.traversePostOrder = function () {
  arr = arguments[0] || [];

  if (this.left) { this.left.traversePostOrder(arr) }
  if (this.right) { this.right.traversePostOrder(arr) }
  arr.push(this.data)

  return arr;
}

BST.prototype.traverseLevelOrder = function () {
  arr = [];
  q = [this]
  var current;
  while (q.length) {
    current = q.shift();

    ["left","right"].forEach(function (child) {
      if (current[child]) { q.push(current[child]) }
    });

    arr.push(current.data)
  }
  return arr;
}
