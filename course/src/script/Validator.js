function Validator(formSelector) {
  this._error = [];
  this._isRequire = false;
  this._isEmail = false;
  this._password = "";
  this._isPasswordConfirm = "";
}

Object.defineProperties(Validator.prototype, {
  error: {
    get: function () {
      return this._error;
    }
  },
  isRequire: {
    get: function () {
      return this._isRequire;
    },
    set: function (value) {
      if (!value || !!!value.trim()) {
        this._isRequire = true;
        this._error.push({
          field: "isRequire",
          message: "This field is require"
        });
      }
    }
  },
  isEmail: {
    get: function () {
      return this._isEmail;
    },
    set: function (value) {
      var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!regex.test(value)) {
        this._error.push({
          field: "isEmail",
          message: "Please enter correct email format"
        });
      }
    }
  },
  isPasswordConfirm: {
    get: function () {
      return this._isPasswordConfirm;
    },
    set: function (value) {
      if (value && !!!value.trim()) {
        if (this._password !== this._isPasswordConfirm) {
          this.error.push({
            field: "isPasswordConfirm",
            message: "Please enter correct password confirm"
          });
        }
      }
    }
  }
});

module.exports.Validator = Validator;
