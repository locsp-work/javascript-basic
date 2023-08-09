Array.prototype.some2 = function (callBack) {
  for (var i in this) {
    if (this.hasOwnProperty(i) && callBack(this[i], i)) {
      return true;
    }
  }
  return false;
};

var a = Array(1, 2, 3).some2((e, i) => i >= 4);
console.log(a);
