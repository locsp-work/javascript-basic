Array.prototype.forEach2 = function (callBack, thisArg) {
  Array.prototype.forEach2.bind(thisArg);
  var result;
  for (var index in this) {
    if (this.hasOwnProperty(index)) {
      result = callBack(this[index], index, this);
    }
  }
  return result;
};
class Counter {
  constructor() {
    this.count = 0;
    this.total = 0;
  }
  add(arr) {
    arr.forEach2((e, i) => {
      this.count = arr.length;
      this.total += e;
    });
  }
}
const obj = new Counter();
obj.add([2, 5, 9, 4]);
console.log(obj.count); // 3
console.log(obj.total);
