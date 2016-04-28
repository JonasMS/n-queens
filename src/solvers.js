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

window.permutator = function(arr) {
  var permutations = [];
  if (arr.length === 0) {
    return [arr];
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

window.hasMajorDiagConflictAt = function(matrix, rowIdx, colIdx, n) {
  if ( n > 1 ) {
    for (var i = rowIdx + 1, j = colIdx + 1; i < n && j < n; i++, j++) {
      if ( matrix[i][j] === 1 ) {
        return true;
      }
    }
  } 
  return false;
};

//TODO: maybe optimize this function
window.hasMajorDiagConflict = function(matrix) {
  var n = matrix[0].length;
  if (n > 1) {
    for (var rowIdx = 0; rowIdx < n - 1; rowIdx++) {
      var colIdx = matrix[rowIdx].indexOf(1);
      if ( colIdx > -1 ) {
        if ( this.hasMajorDiagConflictAt(matrix, rowIdx, colIdx, n) ) {
          return true;
        }
      }
    }
  }
  return false;
};

window.hasMinorDiagConflictAt = function(matrix, rowIdx, colIdx, n) {
  if ( n > 1) {
    for (var i = rowIdx + 1, j = colIdx - 1; i < n && j >= 0; i++, j--) {
      if ( matrix[i][j] === 1 ) {
        return true;
      }
    }
  }
  return false;
};

window.hasMinorDiagConflict = function(matrix) {
  var n = matrix[0].length;
  if (n > 1) {
    for (var rowIdx = 0; rowIdx < n; rowIdx++) {
      var colIdx = matrix[rowIdx].lastIndexOf(1);
      if ( colIdx > -1 ) {
        if ( this.hasMinorDiagConflictAt(matrix, rowIdx, colIdx, n) ) {
          return true;
        }
      }
    }
  }
  return false;
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

  var matrix = findNRooksSolution(n);
  //var firstRow = matrix.shift();

  matrix = permutator(matrix);

  console.log('Number of solutions for ' + n + ' rooks:', matrix.length);
  return matrix.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var matrix = findNRooksSolution(n);

  if ( n > 0 ) {

    //make all permutations
    var allPermutations = permutator(matrix);

    //filter out all permutations that have conflicts
    var solutions = _.filter(allPermutations, function(matrix) {
      return !( hasMinorDiagConflict(matrix) || hasMajorDiagConflict(matrix) );
    });

  } else { return matrix; }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutions));
  return solutions.length ? solutions[0] : createMatrix(n);
  
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var matrix = findNRooksSolution(n);

  if ( n > 0 ) {

    //make all permutations
    var allPermutations = permutator(matrix);

    //filter out all permutations that have conflicts
    var solutions = _.filter(allPermutations, function(matrix) {
      return !( hasMinorDiagConflict(matrix) || hasMajorDiagConflict(matrix) );
    });

  } else { return 1; }

  console.log('Number of solutions for ' + n + ' queens:', solutions.length);
  return solutions.length ? solutions.length : 0;
};
