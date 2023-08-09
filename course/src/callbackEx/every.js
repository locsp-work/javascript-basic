Array.prototype.every2 = function (callBack) {
  var count = 0;
  for (var i in this) {
    if (this.hasOwnProperty(i) && callBack(this[i], i)) {
      ++count;
    }
  }
  if (count === this.length) {
    return true;
  }
  return false;
};

var a = Array(1, 3, 4, 5).every2((e) => e >= 1);
console.log(a);
