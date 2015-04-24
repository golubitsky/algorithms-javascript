function secondSmallest (arr) {
  if (arr.length === 0) {
    return undefined;
  } else if (arr.length === 1) {
    return arr[0];
  }

  var smallest = Infinity;
  var secondSmallest = Infinity;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === smallest) {
      secondSmallest = arr[i];
    } else if (arr[i] < smallest) {
      secondSmallest = smallest;
      smallest = arr[i];
    } else if (arr[i] > smallest && arr[i] < secondSmallest) {
      secondSmallest = arr[i];
    }
  }

  return secondSmallest;
}


function squareRoot (n) {
  comparisons = 0
  var mid, l = 1, r = n;
  while ((r - l) > 0.0000001) {
    comparisons += 1;
    mid = (l + r)/2
    if (Math.pow(mid, 2) < n) {
      l = mid;
    } else {
      r = mid;
    }
  }
  console.log(comparisons)
  return (l + r)/2;
}

console.log(squareRoot(1000000000000000000))
