function Heap () {
  this.dataStore = [];
  this.size = 0;
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
  this._heapifyDown();
  return el
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
  this.size--;

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

var arr = [3,6,1,4,6,56,33]
console.log(heapsort(arr));
