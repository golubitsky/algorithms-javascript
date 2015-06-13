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

    if (y === 0 && z === 0) {
      // handle request for subsets having length 0
      return true;
    } else if (z === 0) {
      // cannot achieve a sum other than 0 with 0 elements
      return false;
    }

    // simple cases do not require generation of subsets
    if (z === 1) {
      if (x.indexOf(y) !== -1) {
        console.log("Using subsetLength === 1 special case solution.")
        return true;
      } else {
        console.log("Using subsetLength === 1 special case solution.")
        return false;
      }
    } else if (z === 2) {
      console.log("Using two-sum special case solution.")
      // use O(n) solution where n == x.length
      return subsummer.twoSum(x, y);
    }

    subsummer._calculateUpperAndLowerBounds(x);

    if (y < subsummer.lowerBound || y > subsummer.upperBound) {
      //no way to arrive at y using any combination of integers in arr
      return false;
    }
    if (subsummer.lowerBound >= 0 && y >= 0) {
      // there are no negative integers in the input array
      // use positive-only dynamic programming solution
      // target (y) is not negative

      // this solution is O(x.length * y * z) where z = subset length and
      // max and min are upper/lower bounds of possible subset sums given arr x

      return subsummer.zSumDynamicPositiveIntegers(x, y, z);
    }

    if (subsummer._numberOfSubsetsToFind(x.length, z) > 5000000) {
      // use dynamic programming solution

      // this solution is O((max - min) * z) where z = subset length and
      // max and min are upper/lower bounds of possible subset sums given arr x

      // it may be possible to further optimize this solution
      // depending on input; more ingestigation necessary
      return subsummer.zSumDynamicAllIntegers(x, y, z);
    }
    // begin generation of subsets of array x having length z
    // return true if a subset has sum y

    // this solution is O(2**n); though we only have to generate
    // subsets of a known length, growth is still exponential

    return subsummer.zSumSubsetGeneration(x, y, z);
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

  subsummer.sortNumber = function (a, b) {
    return a - b;
  }

  // dynamic solutions

  subsummer.zSumDynamicPositiveIntegers = function (arr, target, setSize) {
    console.log("Using dynamic positive-integer solution.")
    // OPTIONAL: initially sort the array in order to limit
    // the scope of the interimArr using maxPossibleSum
    // this could be beneficial when input array has values with a large range

    // if maxPossibleSum < target immediately return false

    // var sorted = arr.sort(subsummer.sortNumber);
    // var maxPossibleSum = 0;
    // for (var i = 0; i < setSize; i++) {
    //   maxPossibleSum += sorted[sorted.length - 1 - i];
    // }
    // if (maxPossibleSum === target) {
    //   return true;
    // } else if (maxPossibleSum < target) {
    //   return false;
    // }

    // generate array to hold all interim solutions
    // see method for explanation
    var interimArr = subsummer._generateInterimArrayForAllPositiveInput(arr, target, setSize);
    for (var y = 0; y < arr.length; y++) {
      for (var x = 0; x <= target; x++) {
        var curSize = 1;

        while (curSize <= setSize && curSize <= y + 1) {
          if (curSize === 1 && arr[y] === x) {
            // a subset of size 1 with the sum of x is possible
            interimArr[y][x].push(true);
          } else if (curSize === 1 && y > 0 && interimArr[y - 1][x][1]) {
            // a subset of size 1 with the sum of x was previously possible
            interimArr[y][x].push(true);
          } else if (curSize === 1) {
            // a subset of size 1 with the sum of x is impossible
            interimArr[y][x].push(false);
          }
          if (curSize === 1) {
            curSize++;
          }
          if (y === 0) {
            continue;
          }

          if (interimArr[y - 1] && interimArr[y - 1][x][curSize]) {
            // a subset of curSuze is possible because it was possible before using the current arr value
            interimArr[y][x].push(true);
          } else if (interimArr[y - 1][x - arr[y]] && interimArr[y - 1][x - arr[y]][curSize - 1]) {
            // given that a subset of curSuze - 1 having sum of x - arr[y] is possible
            // a subset of curSize using current arr[y] is possible
            interimArr[y][x].push(true);
          } else {
            // a subset of curSize is impossible
            interimArr[y][x].push(false);
          }

          if (x === target && interimArr[y][target][setSize]) {
            return true;
          }
          curSize++;
        }
      }
    }

    return false;
  }

  subsummer._generateInterimArrayForAllPositiveInput = function (arr, target) {
    // interimArr[y][x][subsetSize] will mean:
    // using any elements from arr[0] up to and including arr[y]
    // there is a subset having sum === x and length === subsetSize
    var interimArr = [];
    for (var i = 0; i < arr.length; i++) {
      var y = [];
      for (var j = 0; j <= target; j++) {
        y.push([undefined])
      }
      interimArr.push(y);
    }
    return interimArr;
  }

  subsummer.zSumDynamicAllIntegers = function (arr, target, setSize) {
    console.log("Using dynamic all-integer solution.")
    //establish upper/lower bounds of sums we care about in order to arrive at solution
    subsummer._calculateUpperAndLowerBounds(arr);
    var negSum = subsummer.lowerBound;
    var posSum = subsummer.upperBound;

    if (target < negSum || target > posSum) {
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

  subsummer._calculateUpperAndLowerBounds = function (arr) {
    if (subsummer.lowerBound) {
      return;
    }

    subsummer.lowerBound = 0;
    subsummer.upperBound = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > 0) {
        subsummer.upperBound += arr[i];
      } else {
        subsummer.lowerBound += arr[i];
      }
    }
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

  // subset-generating solution

  subsummer.zSumSubsetGeneration = function (x, y, z) {
    console.log("Using subset-generating solution.")
    for (var i = 0; i <= x.length - z; i++) {
      var remainingArr = x.slice(0, i).concat(x.slice(i + 1));
      if (subsummer._subset(remainingArr, y, z - 1, [x[i]])) {
        return true;
      }
    }

    return false;
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

  // TEST STATEMENTS

  var arr = [3, 5, 1, 2, 23, 29, -44, -2, 7, 7];

  // console.log("The first test in each duplicate-pair refers to subset-generating solution, the second to the dynamic-programming solution.");
  // console.log("Test array: " + arr);
  // console.log("29 using 1 element: " + subsummer.zSum(arr, 29, 1));
  // console.log("29 using 1 element: " + subsummer.zSumDynamicAllIntegers(arr, 29, 1));
  // for (var i = 2; i <= 6; i++) {
  //   console.log("29 using " + i + " elements: " + subsummer.zSum(arr, 29, i));
  //   console.log("29 using " + i + " elements: " + subsummer.zSumDynamicAllIntegers(arr, 29, i));
  // }
  // console.log("Does not use duplicates that don't exist:");
  // console.log("-48 using 3 elements: " + subsummer.zSum(arr, -48, 3));
  // console.log("-48 using 3 elements: " + subsummer.zSumDynamicAllIntegers(arr, -48, 3));
  // console.log("Uses duplicates found in array:");
  // console.log("12 using 3 elements: " + subsummer.zSum(arr, 12, 3));
  // console.log("12 using 3 elements: " + subsummer.zSumDynamicAllIntegers(arr, 12, 3));
  // console.log("Handles negative integers:");
  // for (var i = 2; i <= 3; i++) {
  //   console.log("-46 using " + i + " elements: " + subsummer.zSum(arr, -46, i));
  //   console.log("-46 using " + i + " elements: " + subsummer.zSumDynamicAllIntegers(arr, -46, i));
  // }

  // arr = [1,3,4,7,45,23,12,10]
  // console.log(subsummer.zSum(arr, 68,2))
  // // use random array generator for performance testing
  // arr = [];
  // for (var x = 0; x < 100; x++) {
  //   arr.push(Math.floor((Math.random() * 100 - 100)))
  //   }
  // console.log(subsummer.zSum(arr, 300, 10));
})();

