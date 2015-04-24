function heapsort (arr) {
  for (i = 0; i < arr.length; i++) {
    heapifyUp(i, arr);
  }

  for (i = 0; i < arr.length; i++) {
    var lastUnsorted = arr.length - 1 - i;
    heapifyDown(lastUnsorted, arr);
  }

  return arr.reverse();
}

function heapifyUp (idx, arr) {
  var parentIdx = parent(idx);
  while (arr[idx] < arr[parentIdx]) {
    swap(arr, idx, parentIdx)
    idx = parentIdx;
    parentIdx = parent(idx);
  }
}

function heapifyDown (lastUnsorted, arr) {
  swap (arr, 0, lastUnsorted)

  var idx = 0, leftIdx = 1, rightIdx = 2;

  while (true) {
    var leftChild = undefined, rightChild = undefined;
    if (rightIdx < lastUnsorted && arr[idx] > arr[rightIdx]) {
      rightChild = arr[rightIdx]
    }
    if (leftIdx < lastUnsorted && arr[idx] > arr[leftIdx]) {
      leftChild = arr[leftIdx]
    }

    if (!(rightChild || leftChild)) {
      return;
    } else if (!rightChild) {
      swap(arr, idx, leftIdx);
      idx = leftIdx;
    } else {
      if (leftChild < rightChild) {
        swap(arr, idx, leftIdx);
        idx = leftIdx;
      } else {
        swap(arr, idx, rightIdx);
        idx = rightIdx;
      }

    }
    leftIdx = lChild(idx)
    rightIdx = rChild(idx)
  }

}

function swap (arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function lChild (index) {
  return 2 * index + 1;
}

function rChild (index) {
  return 2 * index + 2;
}

function parent (index) {
  return index % 2 === 0 ? (index / 2) - 1 : Math.floor(index / 2);
}

console.log(heapsort([1,2,3,2,5,9,4,2]))
