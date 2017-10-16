(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.deepPreventExtensions = global.deepPreventExtensions || {}, global.deepPreventExtensions.js = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Internals

var isApplied = {
  freeze: Object.isFrozen,
  seal: Object.isSealed,
  preventExtensions: function preventExtensions(prop) {
    return !Object.isExtensible(prop);
  }
};

// Public

var deep = function deep(action, obj) {
  Object[action](obj);

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    var prop = obj !== Function.prototype && obj[key]; // Function.prototype is used to prevent following error on function prototype => TypeError: 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
    if (prop && ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) === 'object' || typeof prop === 'function') && !isApplied[action](prop)) {
      deep(action, prop);
    }
  });

  return obj;
};

// Public

var deepPreventExtensions = function deepPreventExtensions(obj) {
  return deep('preventExtensions', obj);
};

return deepPreventExtensions;

})));
