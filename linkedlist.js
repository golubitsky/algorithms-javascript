//doubly-linked-list
function LinkedList (data) {
  this.head;
  this.tail;
  this.size = 0;

  if (Array.isArray(data)){
    data.forEach(function (el) {
      this.push(el);
    }.bind(this));
  } else if (data) {
    this.push(data)
  }
}

LinkedList.prototype.unshift = function (data) {
  if (!this.head) {
    var node = new Node(data);
    this.head = node;
    this.tail = node;
  } else {
    var previousHead = this.head;
    this.head = new Node(data, previousHead, this.tail)
    previousHead.previous = this.head;
  }
  this.size++;
}

LinkedList.prototype.shift = function (data) {
  if (!this.head) {
    return undefined;
  }

  var popped = this.head.data;

  if (this.tail == this.head) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = this.head.next;
  }

  this.size--;
  return popped;
}

LinkedList.prototype.push = function (data) {
  if (!this.head) {
    var node = new Node(data);
    this.head = node;
    this.tail = node;
  } else {
    var previousTail = this.tail;
    this.tail = new Node(data, null, previousTail)
    previousTail.next = this.tail
  }
  this.size++;
}


LinkedList.prototype.pop = function (data) {
  if (!this.tail) {
    return undefined;
  }

  var popped = this.tail.data;

  if (this.tail == this.head) {
    this.head = null;
  }
  this.tail.previous.next = undefined;
  this.tail = this.tail.previous;

  this.size--;
  return popped;
}

LinkedList.prototype.print = function () {
  var current = this.head;
  var arr = []
  while (current) {
    arr.push(current.data)
    current = current.next
  }
  console.log(arr)
}

function Node (data, next, previous) {
  this.data = data;
  this.next = next;
  this.previous = previous;
}
