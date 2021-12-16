import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';

var HandleType = {
  unHandled: 0,
  then: 1,
  catch: 2
};

var DefaultErrorHandlerPromise = /*#__PURE__*/function () {
  function DefaultErrorHandlerPromise(promise, defaultErrorHandler) {
    var _this = this;

    _classCallCheck(this, DefaultErrorHandlerPromise);

    this.defaultErrorHandler = defaultErrorHandler;
    this.origin = promise;
    promise.catch(function (err) {
      if (_this.handleType === HandleType.unHandled) {
        var _this$defaultErrorHan;

        (_this$defaultErrorHan = _this.defaultErrorHandler) === null || _this$defaultErrorHan === void 0 ? void 0 : _this$defaultErrorHan.call(null, err);
      }
    });
    this.handleType = HandleType.unHandled;
  }

  _createClass(DefaultErrorHandlerPromise, [{
    key: "then",
    value: function then(sucessHandler, errorHandler) {
      if (errorHandler != null) {
        this.handleType |= HandleType.catch;
      } else {
        this.handleType |= HandleType.then;
      }

      var promise = this.origin.then(sucessHandler, errorHandler);
      return new DefaultErrorHandlerPromise(promise, this.defaultErrorHandler);
    }
  }, {
    key: "catch",
    value: function _catch(errorHandler) {
      this.handleType |= HandleType.catch;
      var promise = this.origin.catch(errorHandler);
      return new DefaultErrorHandlerPromise(promise, this.defaultErrorHandler);
    }
  }], [{
    key: "all",
    value: function all(promises, defaultErrorHandler) {
      var transformed = getOriginPromises(promises);
      return new DefaultErrorHandlerPromise(_Promise.all(transformed), defaultErrorHandler);
    }
  }, {
    key: "race",
    value: function race(promises) {
      var transformed = getOriginPromises(promises);
      return new DefaultErrorHandlerPromise(_Promise.race(transformed), defaultErrorHandler);
    }
  }]);

  return DefaultErrorHandlerPromise;
}();

function getOriginPromises(promises) {
  return _mapInstanceProperty(promises).call(promises, function (promise) {
    if (promise instanceof DefaultErrorHandlerPromise) {
      promise.defaultErrorHandler = null;
      return promise.origin;
    }

    return promise;
  });
}

export { DefaultErrorHandlerPromise as default };
