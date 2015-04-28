var generate = document.getElementById('generate');
var solve = document.getElementById('solve');

generate.addEventListener('click', function() {
    maze.regenerate();
}, false);

solve.addEventListener('click', function() {
    x = Math.floor(Math.random() * 10)
    y = Math.floor(Math.random() * 10)
    maze.solve(y, x);
}, false);

var maze = document.getElementById('maze');
maze.addEventListener('click', function (e) {
  var x = e.target.getAttribute('x')
  var y = e.target.getAttribute('y')
  maze.solve(y, x);
});
