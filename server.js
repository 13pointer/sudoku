var express = require('express');
var app = express();

var sudoku = require('./ryuSudokuFunctions');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// Return basic page
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submitgrid', function(req, res) {
  //   let gridString = req.body.gridText;
  //   console.log(gridString);
  let sudokuSolution = sudoku.complete(req.body.gridText);
  let output = '';
  for (i = 0; i < 9; i++) {
    output = output + '<p>' + sudokuSolution[i] + '</p>';
  }

  res.send("Here's the solution. \n" + output);
});

let server = app.listen(5000, function() {
  console.log('Server listening on port 5000');
});
