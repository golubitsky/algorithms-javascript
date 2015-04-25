function Heap () {
  this.dataStore = [];
  this.size = 0;
  this.count = 0;
}

Heap.build = function (arr) {
  var heap = new Heap();
  heap.dataStore = arr;
  heap.size = arr.length;
  if (heap.size <= 1) { return heap }

  heap._build();

  return heap;
}

Heap.prototype._build = function () {
  for (i = this._startEl(); i >= 0; i--) {
    //TO DO investigate why this is overall slower than building heap by
    //repeatedly inserting; even though this method cuts down the number of swaps performed
    this._siftDown(i);
  }
}

Heap.prototype._siftDown = function (i) {
  var min = i;

  while (true) {
    l = this._youngChild(i);
    r = this._oldChild(i);

    if (this.dataStore[min] > this.dataStore[r]) {
      min = r;
    }

    if (this.dataStore[min] > this.dataStore[l]) {
      min = l;
    }

    if (i === min) { break }

    this._swap(i, min);
    i = min;
  }

}

Heap.prototype._siftDownAlt = function (i) {
  //alternate version of siftDown
  l = this._youngChild(i);
  r = this._oldChild(i);

  while ((this.dataStore[i] > this.dataStore[l]) || (this.dataStore[i] > this.dataStore[r])) {
    if (this.dataStore[r] < this.dataStore[l]) {
      this._swap(i, r);
      i = r;
    } else {
      this._swap(i, l);
      i = l;
    }
    l = this._youngChild(i);
    r = this._oldChild(i);
  }
}

Heap.prototype._startEl = function () {
  //finds index of element in last complete level
  var el = 0;
  var i = 0
  while (el + Math.pow(2, i) < this.size) {
    el += Math.pow(2, i)
    i += 1
  }
  return el;
}

Heap.prototype.print = function () {
  console.log(this.dataStore);
}

Heap.prototype.min = function () {
  return this.dataStore[0];
}

Heap.prototype.insert = function (val) {
  this.dataStore[this.size++] = val;
  this._heapifyUp();
}

Heap.prototype.removeMin = function (val) {
  el = this.dataStore[0];
  this.size--;
  this._heapifyDown();
  return el;
}

Heap.prototype._heapifyUp = function () {
  var idx = this.size - 1;
  var parentIdx = this._parent(idx);
  while (this.dataStore[idx] < this.dataStore[parentIdx]) {
    this._swap(idx, parentIdx)
    idx = parentIdx;
    parentIdx = this._parent(idx);
  }
}


Heap.prototype._heapifyDown = function () {
  this.dataStore[0] = this.dataStore.pop();

  var idx = 0;
  leftIdx = this._youngChild(idx);
  rightIdx = this._oldChild(idx);

  while ((this.dataStore[idx] > this.dataStore[leftIdx]) || (this.dataStore[idx] > this.dataStore[rightIdx])) {
    if (this.dataStore[rightIdx] < this.dataStore[leftIdx]) {
      this._swap(idx, rightIdx);
      idx = rightIdx;
    } else {
      this._swap(idx, leftIdx);
      idx = leftIdx;
    }
    leftIdx = this._youngChild(idx);
    rightIdx = this._oldChild(idx);
  }
}

Heap.prototype._swap = function (i, j) {
  this.count += 1;
  var temp = this.dataStore[i];
  this.dataStore[i] = this.dataStore[j];
  this.dataStore[j] = temp;
}

Heap.prototype._youngChild = function (index) {
  return 2 * index + 1;
}

Heap.prototype._oldChild = function (index) {
  return 2 * index + 2;
}

Heap.prototype._parent = function (index) {
  return index % 2 === 0 ? (index / 2) - 1 : Math.floor(index / 2);
}

function heapsort (arr) {
  //naive implementation; see heapsort.js for in-place version
  var heap = new Heap ();
  var sorted = [];

  arr.forEach(function (el) {
    heap.insert(el);
  });

  for (i = 0; i < arr.length; i++) {
    sorted.push(heap.removeMin());
  }
  return sorted;
}


function buildRandArray() {
  var arr = []
  for (var i = 0; i < 50000; i++) {
    arr.push(Math.round(Math.random() * 100));
  }
  return arr;
}
var arr = buildRandArray();
var arr2 = arr.slice();

var t1 = Date.now();
a = Heap.build(arr);
console.log(a.count);
console.log(Date.now() - t1);

var t2 = Date.now();
b = new Heap();
arr2.forEach(function (el) {
  b.insert(el)
});

console.log(b.count)
console.log(Date.now() - t2);
console.log(a.dataStore[50] === b.dataStore[50])

