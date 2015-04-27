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

function mergeSortOptimized (arr, l, r) {
  if ( (l+r)/2 <= 1) {
    return arr.slice(l,1);
  }

  l = l ? 0 : l
  l = r ? arr.length - 1 : r

  return merge(
    mergeSortOptimized(arr, l, Math.floor((l + r)/2)),
    mergeSortOptimized(arr, Math.floor((l + r)/2 + 1), r)
    );
}


a = [3,4,1,3]
console.log(mergeSortOptimized(a))
