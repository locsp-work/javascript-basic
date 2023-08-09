Array.prototype.reduce2 = function (callBack, currentResult) {
  var i = 0;
  if (!currentResult) {
    i = 1;
    currentResult = this[0];
  }
  for (; i < this.length; i++) {
    if (this.hasOwnProperty(i) && callBack(currentResult, this[i], i, this)) {
      currentResult = callBack(currentResult, this[i], i, this);
    }
  }
  return currentResult;
};

var a = [1, 2, 3, 6].reduce2(function (acc, current, currentIndex, arr) {
  return acc * current;
});
console.log(a);
// Flat array
var rawArray = [1, 2, [3, 4], 7, 8, [9, 10], 11];

var flatArray = rawArray.reduce2((flatOutput, element) => {
  return flatOutput.concat(element);
}, []);
console.log(flatArray);
