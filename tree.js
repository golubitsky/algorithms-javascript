function Test (x,y){
  this.x = x;
  this.y = y;
}

Test.prototype.eq = function (obj) {
  return (this.x === obj.x && this.y === obj.y)
}

a = [new Test(0,0), new Test(0,0), new Test(1,0)]
seen = []

obj1 = a[0];
obj2 = a[1];
seen[obj1] = true
console.log(JSON.stringify(obj1))
console.log(JSON.stringify(obj2) == JSON.stringify(obj1))
