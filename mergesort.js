function mergeSort (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var mid = arr.length/2;
  var left = mergeSort(arr.slice(0, mid));
  var right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge (left, right) {
  var merged = [];
  var i = 0; j = 0
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      merged.push(left[i]);
      i++;
    } else {
      merged.push(right[j]);
      j++;
    }
  }

  return merged.concat(left.slice(i)).concat(right.slice(j));
}
