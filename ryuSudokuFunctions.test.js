const ryuSudokuFunctions = require('./ryuSudokuFunctions');

var gridString =
  '090000006\n' +
  '000960485\n' +
  '000581000\n' +
  '004000000\n' +
  '517200900\n' +
  '602000370\n' +
  '100804020\n' +
  '706000810\n' +
  '300090000';

var testSolution = [
  [8, 9, 5, 7, 4, 2, 1, 3, 6],
  [2, 7, 1, 9, 6, 3, 4, 8, 5],
  [4, 6, 3, 5, 8, 1, 7, 9, 2],
  [9, 3, 4, 6, 1, 7, 2, 5, 8],
  [5, 1, 7, 2, 3, 8, 9, 6, 4],
  [6, 8, 2, 4, 5, 9, 3, 7, 1],
  [1, 5, 9, 8, 7, 4, 6, 2, 3],
  [7, 4, 6, 3, 2, 5, 8, 1, 9],
  [3, 2, 8, 1, 9, 6, 5, 4, 7]
];

var gridObject;
var missingNumbers;
var solutionObject;

test('Check string is converted to grid object', () => {
  gridObject = ryuSudokuFunctions.createGrid(gridString);
  let testGrid = [
    [0, 9, 0, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 9, 6, 0, 4, 8, 5],
    [0, 0, 0, 5, 8, 1, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 0],
    [5, 1, 7, 2, 0, 0, 9, 0, 0],
    [6, 0, 2, 0, 0, 0, 3, 7, 0],
    [1, 0, 0, 8, 0, 4, 0, 2, 0],
    [7, 0, 6, 0, 0, 0, 8, 1, 0],
    [3, 0, 0, 0, 9, 0, 0, 0, 0]
  ];

  expect(gridObject.length).toEqual(9);
  expect(gridObject[0].length).toEqual(9);
  expect(gridObject).toEqual(testGrid);
});

test('Identify missing numbers as designated with 0s in the array', () => {
  missingNumbers = ryuSudokuFunctions.identifyMissing(gridObject);
  let testMissing = [
    [0, 0],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [0, 7],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 5],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 6],
    [2, 7],
    [2, 8],
    [3, 0],
    [3, 1],
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 7],
    [3, 8],
    [4, 4],
    [4, 5],
    [4, 7],
    [4, 8],
    [5, 1],
    [5, 3],
    [5, 4],
    [5, 5],
    [5, 8],
    [6, 1],
    [6, 2],
    [6, 4],
    [6, 6],
    [6, 8],
    [7, 1],
    [7, 3],
    [7, 4],
    [7, 5],
    [7, 8],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 5],
    [8, 6],
    [8, 7],
    [8, 8]
  ];

  expect(missingNumbers.length).toEqual(51);
  expect(missingNumbers).toEqual(testMissing);
});

test('Check if number is available in row', () => {
  expect(ryuSudokuFunctions.availableRow(gridObject, 0, 2)).toBeTruthy();
  expect(ryuSudokuFunctions.availableRow(gridObject, 0, 9)).toBeFalsy();
});

test('Check if number is available in column', () => {
  expect(ryuSudokuFunctions.availableCol(gridObject, 0, 9)).toBeTruthy();
  expect(ryuSudokuFunctions.availableCol(gridObject, 0, 5)).toBeFalsy();
});

test('Check if number is available in square', () => {
  expect(ryuSudokuFunctions.availableSquare(gridObject, 2, 2, 1)).toBeTruthy();
  expect(ryuSudokuFunctions.availableSquare(gridObject, 7, 7, 9)).toBeTruthy();
  expect(ryuSudokuFunctions.availableSquare(gridObject, 2, 2, 9)).toBeFalsy();
  expect(ryuSudokuFunctions.availableSquare(gridObject, 7, 7, 1)).toBeFalsy();
});

test('Check whether a test problem can be solved in completion', () => {
  solutionObject = ryuSudokuFunctions.iterateNums(gridObject, missingNumbers);

  expect(solutionObject).toEqual(testSolution);
});

test('Check whether we can just solve a string', () => {
  solutionObject = ryuSudokuFunctions.complete(gridString);
  expect(testSolution).toEqual(solutionObject);
});
