/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

  
window.createMatrix = function(n) {
  var matrix = [];
  for (var i = 0; i < n; i++) {
    row = new Array(n).fill(0);
    matrix.push(row);
  }  
  return matrix;
};

window.findNRooksSolution = function(n) {
  var solution = [];

  solution = createMatrix(n);
  
  for (var j = 0; j < n; j++) {
    solution[j][j]++;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  var unsafeRows = [];
  var unsafeCols = [];

  var matrix = createMatrix(n);


  var permutator = function(arr) {
    var permutations = [];
    if (arr.length === 0) {
      return [];
    }

    for (var i = 0; i < arr.length; i++) {
      var subPerms = permutator(arr.slice(0, i).concat(arr.slice(i + 1)));
      for (var j = 0; j < subPerms.length; j++) {
        subPerms[j].unshift(arr[i]);
        permutations.push(subPerms[j]);
      }
    }
    return permutations;
  };

  /*var newSolution = function(matrix) {

    //place a rook in a non-conflicting position
    //TODO: change n, not efficient
    for (var row = 0; row < n; row++) {
      for (var col = 0; col < n; col++) {
        if ( !_.contains(unsafeCols, col) ) {
          matrix[row][col]++;
          unsafeCols.push(col);
          newSolution(matrix);
          break;
        }
      }
    }
  };*/



  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
