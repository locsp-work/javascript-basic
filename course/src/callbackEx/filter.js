Array.prototype.filter2 = function (callback) {
  var result = [];
  for (var i in this) {
    if (callback(this[i], i) && this.hasOwnProperty(i)) {
      callback(this[i], i);
      result.push(this[i]);
    }
  }
  return result;
};

var a = Array(10, 20, 30).filter2(function (e) {
  return e >= 201;
});
console.log(a);
