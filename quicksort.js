function quickSort (arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var left = [], right = [];
  arr.slice(1).forEach(function (el) {
    if (el < arr[0]) {
      left.push(el);
    } else {
      right.push(el);
    }
  });

  return quickSort(left).concat([arr[0]]).concat(quickSort(right));
}

function quickSortOptimized (arr, left, right) {
  left = left || 0;
  right = right || arr.length - 1;
  if (right - left > 0) {

    index = partition (arr, left, right);
    quickSortOptimized(arr, left, index - 1);
    quickSortOptimized(arr, index + 1, right);
  }

  return arr
}

function partition (arr, left, right) {
  var pivot = Math.floor((left + right)/2);
  var pivotValue = arr[pivot];

  while (left != right) {
    if (arr[left] < pivotValue) {
      left++;
    }
    if (arr[right] > pivotValue) {
      right--;
    }

    swap(arr, left, right);
  }
  return left;
}

function swap(arr, left, right) {
  var temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}
