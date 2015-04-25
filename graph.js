function Graph (directed) {
  this.nodes = [];
  this.edges = [];
  this.isDirected = directed;
}

Graph.prototype.addNode = function (data) {
  var node = new Node(data);
  this.nodes.push(node);
  return node;
}

Graph.prototype.addEdge = function (node1, node2, cost) {
  //TO DO rethink cost implementation to accomodate (cost != reverse cost)
  var edge = new Edge(node1, node2);
  this.edges.push(edge);
  node1.adjacents.push(node2)
  if (!this.isDirected) {
    var edgeReverse = new Edge(node2, node1, cost);
    this.edges.push(edgeReverse);
    node2.adjacents.push(node1)
  }

  return edge;
}

function Node (data) {
  this.data = data;
  this.adjacents = [];
  }

function Edge (start, end, cost) {
  this.cost = cost || 1;
  this.start = start;
  this.end = end;
}

var graph = new Graph();
a = graph.addNode('A')
b = graph.addNode('B')
graph.addEdge(a, b  )
console.log(graph.nodes[0].adjacents)
