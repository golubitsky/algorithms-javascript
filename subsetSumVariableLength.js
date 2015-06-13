// In javascript: Write a function that,
// given an array of integers (x), and an integer (y),
// returns true if any two of the integers in x add up to y.
// (Optional) Now, write a function that,
// given the above arguments and an additional integer (z),
// returns true if any z of the integers in x add up to y.
(function () {
  var subsummer = {};

  if (typeof window === 'undefined') {
    //export module
  } else {
    window.subsummer = subsummer;
  }

  subsummer.twoSum = function (x, y) {
    // are there 2 integers in x having sum of y?
    var remainders = {};

    for (var i = 0; i < x.length; i++) {
      if (remainders[x[i]]) {
        return true;
      }
      remainders[y - x[i]] = true;
    }

    return false;
  }

  subsummer.zSum = function (x, y, z) {
    // are there z integers in x having sum of y?
    if (x.length < z) {
      // not enough integers
      return false;
    }

    // simple cases do not require generation of subsets
    if (z === 1) {
      if (x.indexOf(y) !== -1) {
        return true;
      } else {
        return false;
      }
    } else if (z === 2) {
      // use O(n) solution where n == x.length
      return subsummer.twoSum(x, y);
    }

    if (subsummer._numberOfSubsetsToFind(x.length, z) > 5000000) {
      // use dynamic programming solution

      // this solution is O((max - min) * z) where z = subset length and
      // max and min are upper/lower bounds of possible subset sums given arr x

      // it may be possible to further optimize this solution
      // depending on input; more ingestigation necessary
      return subsummer.zSumDynamicProgramming(x, y, z);
    }
    // begin generation of subsets of array x having length z
    // return true if a subset has sum y

    // this solution is O(2**n); though we only have to generate
    // subsets of a known length, growth is still exponential
    for (var i = 0; i <= x.length - z; i++) {
      var remainingArr = x.slice(0, i).concat(x.slice(i + 1));
      if (subsummer._subset(remainingArr, y, z - 1, [x[i]])) {
        return true;
      }
    }

    return false;
  }

  subsummer._numberOfSubsetsToFind = function (n, k) {
    return subsummer._fact(n)/(subsummer._fact(k) * subsummer._fact(n-k));
  }

  subsummer._fact = function (n) {
    result = 1;
    var i = 1;
    while (i <= n) {
      result *= i;
      i++;
    }
    return result;
  }

  subsummer._subset = function (x, y, z, currentSet) {
    // find subset and return true if subSum === y
    // "current" keeps track of the subset so far
    // each level of recursion adds one element, decreasing z by 1
    if (z === 0 && subsummer._sum(currentSet) === y) {
      return true;
    } else if (z === 0) {
      return false;
    }


    var dupSet = currentSet.slice();

    for (var i = 0; i < x.length; i++) {
      dupSet.push(x[i]);
      //only generate subsets using elements to the right of current element
      //this will find combinations rather than permutations
      var remainingArr = x.slice(i + 1);

      if (subsummer._subset(remainingArr, y, z - 1, dupSet)) {
        return true;
      }

      dupSet.pop();
    }

    return false;
  }

  subsummer._sum = function (arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }

  subsummer.sortNumber = function (a, b) {
    return a - b;
  }

  // dynamic solution

  subsummer.zSumDynamicProgramming = function (arr, target, setSize) {
    //establish upper/lower bounds of sums we care about in order to arrive at solution
    var bounds = subsummer._upperAndLowerBounds(arr);
    var negSum = bounds[0];
    var posSum = bounds[1];

    if (target < negSum || target > posSum) {
      //no way to arrive at target using any combination of integers in arr
      return false;
    }

    var elCount = subsummer._countElements(arr);
    // key: el in input arr; val: number of occurences in arr
    var hash = subsummer._createHash(negSum, posSum, setSize);
    // hash will have three dimensions:
    //  (1) sum; (2) n elements in subset yielding that sum; (3) either false
    //    (meaning that there doesn't exist a subset of length n yielding particular sum) or
    //    a hashmap with key: element used in subset; val: number of occurences in subset.
    //    The number of occurences in any given subset can never exceed the number of
    //    occurences in the input array (stored in elCount)

    for (var size = 1; size <= setSize; size++) { // size is the current setSize
      for (sum in hash) { //current sum we are considering
        if (size === 1 && elCount[sum]) {
          hash[sum][size] = {};
          hash[sum][size][sum] = 1
        }

        if (size > 1) {
          for (var i = 0; i < arr.length; i++) { // i indexes into array
            var remainder = sum - arr[i];
            // current el (arr[i]) + remainder = sum
            // if there is a subset using 1 fewer elements without
            // already using all occurences of current el, we are golden!
            if (hash[remainder]) {
              if (hash[remainder][size - 1]) {
                // there is such a subset
                previousUsage = hash[remainder][size - 1]
                if (!previousUsage[arr[i]] || previousUsage[arr[i]] < elCount[arr[i]]) {
                  // in the subset having 1 fewer elements we still have not used
                  // all of the current el (arr[i]) available in the input array
                  hash[sum][size] = subsummer._copyHash(previousUsage);
                  if (hash[sum][size][arr[i]]) {
                    hash[sum][size][arr[i]]++;
                  } else {
                    hash[sum][size][arr[i]] = 1;
                  }
                }
              }
            }
          }
        }
      }
    }

    return hash[target][setSize] ? true : false;
  }

  subsummer._upperAndLowerBounds = function (arr) {
    var negSum = 0;
    var posSum = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > 0) {
        posSum += arr[i];
      } else {
        negSum += arr[i];
      }
    }
    return [negSum, posSum]
  }
  subsummer._copyHash = function (hash) {
    var newObj = {};

    Object.keys(hash).forEach(function(key) {
      newObj[key] = hash[key];
    });
    return newObj;
  }
  subsummer._createHash = function (min, max, setSize) {
    //use a hash to allow negative indexing
    var hash = {};
    for (var i = min; i <= max; i++) {
      hash[i] = []
      for (var j = 0; j <= setSize; j++) {
        if (j === 0) {
          hash[i][j] = {};
        } else {
          hash[i][j] = false;
        }
      }
    }
    return hash;
  }

  subsummer._countElements = function (arr) {
    var hash = {}
    for (var i = 0; i < arr.length; i++) {
      if (hash[arr[i]]) {
        hash[arr[i]]++;
      } else {
        hash[arr[i]] = 1;
      }
    }
    return hash;
  }

  var arr = [3, 5, 1, 2, 23, 29, -44, -2, 7, 7];

  console.log("The first test in each duplicate-pair refers to subset-generating solution, the second to the dynamic-programming solution.");
  console.log("Test array: " + arr);
  console.log("29 using 1 element: " + subsummer.zSum(arr, 29, 1));
  console.log("29 using 1 element: " + subsummer.zSumDynamicProgramming(arr, 29, 1));
  for (var i = 2; i <= 6; i++) {
    console.log("29 using " + i + " elements: " + subsummer.zSum(arr, 29, i));
    console.log("29 using " + i + " elements: " + subsummer.zSumDynamicProgramming(arr, 29, i));
  }
  console.log("Does not use duplicates that don't exist:");
  console.log("-48 using 3 elements: " + subsummer.zSum(arr, -48, 3));
  console.log("-48 using 3 elements: " + subsummer.zSumDynamicProgramming(arr, -48, 3));
  console.log("Uses duplicates found in array:");
  console.log("12 using 3 elements: " + subsummer.zSum(arr, 12, 3));
  console.log("12 using 3 elements: " + subsummer.zSumDynamicProgramming(arr, 12, 3));
  console.log("Handles negative integers:");
  for (var i = 2; i <= 3; i++) {
    console.log("-46 using " + i + " elements: " + subsummer.zSum(arr, -46, i));
    console.log("-46 using " + i + " elements: " + subsummer.zSumDynamicProgramming(arr, -46, i));
  }

  // use random array generator for performance testing
  // arr = [];
  // for (var x = 0; x < 100; x++) {
  //   arr.push(Math.floor((Math.random() * 30)))
  //   }
  // console.log(subsummer.zSum(arr, 1000, 50));
})();

