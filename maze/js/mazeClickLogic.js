var generateButton = document.getElementById('generate');
generateButton.addEventListener('click', function() {
    // mazeSolver.maze.regenerate();
    mazeSolver.maze = new mazeSolver.Maze(10,10);
}, false);

var solveButton = document.getElementById('solve');
solveButton.addEventListener('click', function() {
    x = Math.floor(Math.random() * 10)
    y = Math.floor(Math.random() * 10)
    mazeSolver.maze.solve(y, x);
}, false);

var mazeDiv = document.getElementById('maze');
mazeDiv.addEventListener('click', function (e) {
  var x = e.target.getAttribute('data-x')
  var y = e.target.getAttribute('data-y')
  mazeSolver.maze.solve(y, x);
  mazeSolver.view.renderPath(0,0);
});
