function Graph () {
  this.nodes = {};
  this.edges = [];
  this.nodeCount = 0;
  this.edgeCount = 0;
}

Graph.prototype.dijkstra = function (startNodeData) {
  var q = this._initDijkstra(startNodeData);
  var minDistanceData, curNode, toNode, cost;
  while (q.length) {
    minDistanceData = this._minDistanceData(q);
    curNode = this._extract(q, minDistanceData);
    curNode.adjacents.forEach(function (adj) {
      for (var to in adj) {
        toNode = this.nodes[to];
        cost = adj[to];
        if (curNode.distance + cost < toNode.distance) {
          toNode.distance = curNode.distance + cost;
          toNode.parent = curNode;
        }
      }
    }.bind(this));
  }
}

Graph.prototype._minDistanceData = function (q) {
  //use minheap instead to improve efficiency
  var minDistance = Infinity;
  var minData;
  q.forEach(function (data) {
    if (this.nodes[data].distance < minDistance) {
      minDistance = this.nodes[data].distance;
      minData = data;
    }
  }.bind(this));
  return minData;
}

Graph.prototype._extract = function (q, data) {
  var index = q.indexOf(data);
  var data = q.splice(index, 1)[0];
  return this.nodes[data];
}

Graph.prototype._initDijkstra = function (startNodeData) {
  var q = []
  for (data in graph.nodes) {
    if (data === startNodeData) {
      graph.nodes[data].distance = 0;
      q.unshift(data);
    } else {
      graph.nodes[data].distance = Infinity;
      q.push(data);
    }
    graph.nodes[data].parent = undefined;
  }
  return q;
}
Graph.prototype.density = function () {
  return this.edgeCount / (this.nodeCount * (this.nodeCount - 1))
}

Graph.prototype.addNode = function (data) {
  this.nodeCount++;
  var node = new Node(data);
  this.nodes[data] = node;
  return node;
}

Graph.prototype.addEdge = function (dataFrom, dataTo, cost) {
  this.edgeCount++;

  var nodeFrom = this.nodes[dataFrom] || this.addNode(dataFrom);
  var nodeTo = this.nodes[dataTo] || this.addNode(dataTo);

  nodeTo.incoming++;

  var edge = {}
  edge[dataTo] = cost;
  nodeFrom.adjacents.push(edge);

  return edge;
}

function Node (data) {
  this.data = data;
  this.adjacents = [];
  this.parent = undefined;
  this.distance = Infinity;
  this.incoming = 0;
  }

var graph = new Graph();
graph.addEdge('a','b', 2)
graph.addEdge('a','c', 4)
graph.addEdge('b','c', 1)
graph.addEdge('c','d', 1)
graph.addEdge('a','d', 3.5)
graph.addEdge('d','a', 3.5)
graph.dijkstra('a')

for (var data in graph.nodes) {
  console.log(data + ': '+ graph.nodes[data].distance)
}
