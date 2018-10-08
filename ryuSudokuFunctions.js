// Sudoku solution using the Backtracking algorithm: https://en.wikipedia.org/wiki/Backtracking

function createGrid(grid) {
  // Generate grid of arrays from grid string
  // Split grid into rows
  let rows = grid.split('\n');
  let output = [];

  //Create an array from row string
  for (let nums of rows) {
    output.push(
      nums
        .substring(0, 9)
        .split('')
        .map(function(character) {
          return Number(character);
        })
    );
  }
  return output;
}

function identifyMissing(grid) {
  // Create an array of missing numbers
  let missingNums = [];

  // Iterate the grid and where 0s are detected, push the coordinates to the missingNums array
  for (let i = 0; i < grid.length; i++) {
    for (let ii = 0; ii < grid[i].length; ii++) {
      if (grid[i][ii] === 0) {
        missingNums.push([i, ii]);
      }
    }
  }

  return missingNums;
}

function availableRow(grid, row, num) {
  // Determine whether a number is available in a row
  for (let i = 0; i < grid[row].length; i++) {
    if (grid[row][i] === num) {
      return false;
    }
  }

  return true;
}

function availableCol(grid, col, num) {
  // Determine whether a number is available in a column
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][col] === num) {
      return false;
    }
  }

  return true;
}

function availableSquare(grid, col, row, num) {
  let startCol = 0;
  let startRow = 0;

  // Generate square column boundries
  if (col < 3) {
    startCol = 0;
  } else if (col < 6) {
    startCol = 3;
  } else {
    startCol = 6;
  }

  // Generate square row boundries
  if (row < 3) {
    startRow = 0;
  } else if (row < 6) {
    startRow = 3;
  } else {
    startRow = 6;
  }

  // Check each cell of the square within the grid to determine if num is available
  for (let i = startRow; i < startRow + 3; i++) {
    for (let ii = startCol; ii < startCol + 3; ii++) {
      if (grid[i][ii] === num) {
        return false;
      }
    }
  }

  return true;
}

function availableAll(grid, col, row, num) {
  // Check to see if num is available on a column, row and square basis
  if (
    this.availableCol(grid, col, num) &&
    this.availableRow(grid, row, num) &&
    this.availableSquare(grid, col, row, num)
  ) {
    return true;
  }

  // Return false if not
  return false;
}

function iterateNums(grid, missingNums) {
  // Iterate through all the available numbers in missing locations until
  // a solution is found.

  // Initialise variables
  let col = 0;
  let row = 0;
  let num = null;
  let isSolution = false;

  // Iterate through missing numbers
  for (let i = 0; i < missingNums.length; ) {
    // Extract current value of the grid coordinate
    // console.log(i);
    row = missingNums[i][0];
    col = missingNums[i][1];
    // Iterate currer grid value to test new solution
    num = grid[row][col] + 1;
    isSolution = false;

    while (isSolution == false && num < 10) {
      // If solution not yet discovered, try current value and test for solution
      if (this.availableAll(grid, col, row, num)) {
        // If solution found, set grid value to solution, set solution flag and
        // iterate to next missing number
        isSolution = true;
        grid[row][col] = num;
        i++;
      } else {
        // If no solution found, iterate number
        num++;
      }
    }

    // Test for no solution found
    if (isSolution == false) {
      // If no solution possible, backtrack and start again with previous position
      grid[row][col] = 0;
      i--;
    }
  }

  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].toString());
  }

  return grid;
}

function complete(grid) {
  console.log(grid);
  console.log(grid.split('').length);
  grid = this.createGrid(grid);
  let missingNums = this.identifyMissing(grid);

  return this.iterateNums(grid, missingNums);
}

module.exports.createGrid = createGrid;
module.exports.identifyMissing = identifyMissing;
module.exports.availableRow = availableRow;
module.exports.availableCol = availableCol;
module.exports.availableSquare = availableSquare;
module.exports.availableAll = availableAll;
module.exports.iterateNums = iterateNums;
module.exports.complete = complete;
