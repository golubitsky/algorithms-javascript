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
  var mid, l = 1, r = n;
  while ((r - l) > 0.0000001) {
    comparisons += 1;
    mid = (l + r)/2
    if (Math.pow(mid, 2) < n) {v
      l = mid;
    } else {
      r = mid;
    }
  }
  return (l + r)/2;
}

function longestCommonSubstring (str, str2) {
  //TO DO finish
  letters = {}
  for (var i = 0; i < str2.length; i++) {
    var char = str2.charAt(i)
    letters[char] = letters[char] ? letters[char] += 1 : 1
  }
}


var arr = [10,11,12,13,14,15,1,2,3,4,5,]

function longestIncreasingSubsequence (arr) {
  var length = [arr[0]]
  var prev = [undefined]
  var max;
  for (var i = 1; i < arr.length; i++) {
    max = 0
    for (var j = 0; j < i; j++) {
      length[i] += [
    }
  }
}
