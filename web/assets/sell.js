webpackJsonp([1],{

/***/ "./node_modules/exenv/index.js":
/*!*************************************!*\
  !*** ./node_modules/exenv/index.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
/* global define */

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return ExecutionEnvironment;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());


/***/ }),

/***/ "./node_modules/hoist-non-react-statics/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/index.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
(function (global, factory) {
     true ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.hoistNonReactStatics = factory());
}(this, (function () {
    'use strict';
    
    var REACT_STATICS = {
        childContextTypes: true,
        contextTypes: true,
        defaultProps: true,
        displayName: true,
        getDefaultProps: true,
        getDerivedStateFromProps: true,
        mixins: true,
        propTypes: true,
        type: true
    };
    
    var KNOWN_STATICS = {
        name: true,
        length: true,
        prototype: true,
        caller: true,
        callee: true,
        arguments: true,
        arity: true
    };
    
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = getPrototypeOf && getPrototypeOf(Object);
    
    return function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
        if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
            
            if (objectPrototype) {
                var inheritedComponent = getPrototypeOf(sourceComponent);
                if (inheritedComponent && inheritedComponent !== objectPrototype) {
                    hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
                }
            }
            
            var keys = getOwnPropertyNames(sourceComponent);
            
            if (getOwnPropertySymbols) {
                keys = keys.concat(getOwnPropertySymbols(sourceComponent));
            }
            
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                    var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                    try { // Avoid failures from read-only properties
                        defineProperty(targetComponent, key, descriptor);
                    } catch (e) {}
                }
            }
            
            return targetComponent;
        }
        
        return targetComponent;
    };
})));


/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ "./node_modules/lodash-es/_Symbol.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash-es/_Symbol.js ***!
  \*******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(/*! ./_root.js */ "./node_modules/lodash-es/_root.js");


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),

/***/ "./node_modules/lodash-es/_baseGetTag.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_baseGetTag.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(/*! ./_Symbol.js */ "./node_modules/lodash-es/_Symbol.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(/*! ./_getRawTag.js */ "./node_modules/lodash-es/_getRawTag.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(/*! ./_objectToString.js */ "./node_modules/lodash-es/_objectToString.js");




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),

/***/ "./node_modules/lodash-es/_freeGlobal.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash-es/_freeGlobal.js ***!
  \***********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash-es/_getPrototype.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/_getPrototype.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(/*! ./_overArg.js */ "./node_modules/lodash-es/_overArg.js");


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),

/***/ "./node_modules/lodash-es/_getRawTag.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash-es/_getRawTag.js ***!
  \**********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(/*! ./_Symbol.js */ "./node_modules/lodash-es/_Symbol.js");


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),

/***/ "./node_modules/lodash-es/_objectToString.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash-es/_objectToString.js ***!
  \***************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),

/***/ "./node_modules/lodash-es/_overArg.js":
/*!********************************************!*\
  !*** ./node_modules/lodash-es/_overArg.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),

/***/ "./node_modules/lodash-es/_root.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash-es/_root.js ***!
  \*****************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(/*! ./_freeGlobal.js */ "./node_modules/lodash-es/_freeGlobal.js");


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),

/***/ "./node_modules/lodash-es/isObjectLike.js":
/*!************************************************!*\
  !*** ./node_modules/lodash-es/isObjectLike.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),

/***/ "./node_modules/lodash-es/isPlainObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash-es/isPlainObject.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(/*! ./_baseGetTag.js */ "./node_modules/lodash-es/_baseGetTag.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(/*! ./_getPrototype.js */ "./node_modules/lodash-es/_getPrototype.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(/*! ./isObjectLike.js */ "./node_modules/lodash-es/isObjectLike.js");




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(/*! fbjs/lib/emptyFunction */ "./node_modules/fbjs/lib/emptyFunction.js");
var invariant = __webpack_require__(/*! fbjs/lib/invariant */ "./node_modules/fbjs/lib/invariant.js");
var warning = __webpack_require__(/*! fbjs/lib/warning */ "./node_modules/fbjs/lib/warning.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}


/***/ }),

/***/ "./node_modules/react-modal/lib/components/Modal.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-modal/lib/components/Modal.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bodyOpenClassName = exports.portalClassName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ModalPortal = __webpack_require__(/*! ./ModalPortal */ "./node_modules/react-modal/lib/components/ModalPortal.js");

var _ModalPortal2 = _interopRequireDefault(_ModalPortal);

var _ariaAppHider = __webpack_require__(/*! ../helpers/ariaAppHider */ "./node_modules/react-modal/lib/helpers/ariaAppHider.js");

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _safeHTMLElement = __webpack_require__(/*! ../helpers/safeHTMLElement */ "./node_modules/react-modal/lib/helpers/safeHTMLElement.js");

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var portalClassName = exports.portalClassName = "ReactModalPortal";
var bodyOpenClassName = exports.bodyOpenClassName = "ReactModal__Body--open";

var isReact16 = _reactDom2.default.createPortal !== undefined;
var createPortal = isReact16 ? _reactDom2.default.createPortal : _reactDom2.default.unstable_renderSubtreeIntoContainer;

function getParentElement(parentSelector) {
  return parentSelector();
}

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.removePortal = function () {
      !isReact16 && _reactDom2.default.unmountComponentAtNode(_this.node);
      var parent = getParentElement(_this.props.parentSelector);
      parent.removeChild(_this.node);
    }, _this.portalRef = function (ref) {
      _this.portal = ref;
    }, _this.renderPortal = function (props) {
      var portal = createPortal(_this, _react2.default.createElement(_ModalPortal2.default, _extends({ defaultStyles: Modal.defaultStyles }, props)), _this.node);
      _this.portalRef(portal);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!_safeHTMLElement.canUseDOM) return;

      if (!isReact16) {
        this.node = document.createElement("div");
      }
      this.node.className = this.props.portalClassName;

      var parent = getParentElement(this.props.parentSelector);
      parent.appendChild(this.node);

      !isReact16 && this.renderPortal(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (!_safeHTMLElement.canUseDOM) return;
      var isOpen = newProps.isOpen;
      // Stop unnecessary renders if modal is remaining closed

      if (!this.props.isOpen && !isOpen) return;

      var currentParent = getParentElement(this.props.parentSelector);
      var newParent = getParentElement(newProps.parentSelector);

      if (newParent !== currentParent) {
        currentParent.removeChild(this.node);
        newParent.appendChild(this.node);
      }

      !isReact16 && this.renderPortal(newProps);
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(newProps) {
      if (!_safeHTMLElement.canUseDOM) return;
      if (newProps.portalClassName !== this.props.portalClassName) {
        this.node.className = newProps.portalClassName;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!_safeHTMLElement.canUseDOM || !this.node || !this.portal) return;

      var state = this.portal.state;
      var now = Date.now();
      var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);

      if (closesAt) {
        if (!state.beforeClose) {
          this.portal.closeWithTimeout();
        }

        setTimeout(this.removePortal, closesAt - now);
      } else {
        this.removePortal();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!_safeHTMLElement.canUseDOM || !isReact16) {
        return null;
      }

      if (!this.node && isReact16) {
        this.node = document.createElement("div");
      }

      return createPortal(_react2.default.createElement(_ModalPortal2.default, _extends({
        ref: this.portalRef,
        defaultStyles: Modal.defaultStyles
      }, this.props)), this.node);
    }
  }], [{
    key: "setAppElement",
    value: function setAppElement(element) {
      ariaAppHider.setElement(element);
    }

    /* eslint-disable react/no-unused-prop-types */

    /* eslint-enable react/no-unused-prop-types */

  }]);

  return Modal;
}(_react.Component);

Modal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  portalClassName: _propTypes2.default.string,
  bodyOpenClassName: _propTypes2.default.string,
  htmlOpenClassName: _propTypes2.default.string,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
  onAfterOpen: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  ariaHideApp: _propTypes2.default.bool,
  shouldFocusAfterRender: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  shouldReturnFocusAfterClose: _propTypes2.default.bool,
  parentSelector: _propTypes2.default.func,
  aria: _propTypes2.default.object,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  shouldCloseOnEsc: _propTypes2.default.bool,
  overlayRef: _propTypes2.default.func,
  contentRef: _propTypes2.default.func
};
Modal.defaultProps = {
  isOpen: false,
  portalClassName: portalClassName,
  bodyOpenClassName: bodyOpenClassName,
  ariaHideApp: true,
  closeTimeoutMS: 0,
  shouldFocusAfterRender: true,
  shouldCloseOnEsc: true,
  shouldCloseOnOverlayClick: true,
  shouldReturnFocusAfterClose: true,
  parentSelector: function parentSelector() {
    return document.body;
  }
};
Modal.defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px"
  }
};
exports.default = Modal;

/***/ }),

/***/ "./node_modules/react-modal/lib/components/ModalPortal.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-modal/lib/components/ModalPortal.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _focusManager = __webpack_require__(/*! ../helpers/focusManager */ "./node_modules/react-modal/lib/helpers/focusManager.js");

var focusManager = _interopRequireWildcard(_focusManager);

var _scopeTab = __webpack_require__(/*! ../helpers/scopeTab */ "./node_modules/react-modal/lib/helpers/scopeTab.js");

var _scopeTab2 = _interopRequireDefault(_scopeTab);

var _ariaAppHider = __webpack_require__(/*! ../helpers/ariaAppHider */ "./node_modules/react-modal/lib/helpers/ariaAppHider.js");

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _classList = __webpack_require__(/*! ../helpers/classList */ "./node_modules/react-modal/lib/helpers/classList.js");

var classList = _interopRequireWildcard(_classList);

var _safeHTMLElement = __webpack_require__(/*! ../helpers/safeHTMLElement */ "./node_modules/react-modal/lib/helpers/safeHTMLElement.js");

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// so that our CSS is statically analyzable
var CLASS_NAMES = {
  overlay: "ReactModal__Overlay",
  content: "ReactModal__Content"
};

var TAB_KEY = 9;
var ESC_KEY = 27;

var ariaHiddenInstances = 0;

var ModalPortal = function (_Component) {
  _inherits(ModalPortal, _Component);

  function ModalPortal(props) {
    _classCallCheck(this, ModalPortal);

    var _this = _possibleConstructorReturn(this, (ModalPortal.__proto__ || Object.getPrototypeOf(ModalPortal)).call(this, props));

    _this.setFocusAfterRender = function (focus) {
      _this.focusAfterRender = _this.props.shouldFocusAfterRender && focus;
    };

    _this.setOverlayRef = function (overlay) {
      _this.overlay = overlay;
      _this.props.overlayRef && _this.props.overlayRef(overlay);
    };

    _this.setContentRef = function (content) {
      _this.content = content;
      _this.props.contentRef && _this.props.contentRef(content);
    };

    _this.afterClose = function () {
      var _this$props = _this.props,
          appElement = _this$props.appElement,
          ariaHideApp = _this$props.ariaHideApp,
          htmlOpenClassName = _this$props.htmlOpenClassName,
          bodyOpenClassName = _this$props.bodyOpenClassName;

      // Remove classes.

      classList.remove(document.body, bodyOpenClassName);

      htmlOpenClassName && classList.remove(document.getElementsByTagName("html")[0], htmlOpenClassName);

      // Reset aria-hidden attribute if all modals have been removed
      if (ariaHideApp && ariaHiddenInstances > 0) {
        ariaHiddenInstances -= 1;

        if (ariaHiddenInstances === 0) {
          ariaAppHider.show(appElement);
        }
      }

      if (_this.props.shouldFocusAfterRender) {
        if (_this.props.shouldReturnFocusAfterClose) {
          focusManager.returnFocus();
          focusManager.teardownScopedFocus();
        } else {
          focusManager.popWithoutFocus();
        }
      }
    };

    _this.open = function () {
      _this.beforeOpen();
      if (_this.state.afterOpen && _this.state.beforeClose) {
        clearTimeout(_this.closeTimer);
        _this.setState({ beforeClose: false });
      } else {
        if (_this.props.shouldFocusAfterRender) {
          focusManager.setupScopedFocus(_this.node);
          focusManager.markForFocusLater();
        }

        _this.setState({ isOpen: true }, function () {
          _this.setState({ afterOpen: true });

          if (_this.props.isOpen && _this.props.onAfterOpen) {
            _this.props.onAfterOpen();
          }
        });
      }
    };

    _this.close = function () {
      if (_this.props.closeTimeoutMS > 0) {
        _this.closeWithTimeout();
      } else {
        _this.closeWithoutTimeout();
      }
    };

    _this.focusContent = function () {
      return _this.content && !_this.contentHasFocus() && _this.content.focus();
    };

    _this.closeWithTimeout = function () {
      var closesAt = Date.now() + _this.props.closeTimeoutMS;
      _this.setState({ beforeClose: true, closesAt: closesAt }, function () {
        _this.closeTimer = setTimeout(_this.closeWithoutTimeout, _this.state.closesAt - Date.now());
      });
    };

    _this.closeWithoutTimeout = function () {
      _this.setState({
        beforeClose: false,
        isOpen: false,
        afterOpen: false,
        closesAt: null
      }, _this.afterClose);
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === TAB_KEY) {
        (0, _scopeTab2.default)(_this.content, event);
      }

      if (_this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
        event.stopPropagation();
        _this.requestClose(event);
      }
    };

    _this.handleOverlayOnClick = function (event) {
      if (_this.shouldClose === null) {
        _this.shouldClose = true;
      }

      if (_this.shouldClose && _this.props.shouldCloseOnOverlayClick) {
        if (_this.ownerHandlesClose()) {
          _this.requestClose(event);
        } else {
          _this.focusContent();
        }
      }
      _this.shouldClose = null;
      _this.moveFromContentToOverlay = null;
    };

    _this.handleOverlayOnMouseUp = function () {
      if (_this.moveFromContentToOverlay === null) {
        _this.shouldClose = false;
      }
      if (_this.props.shouldCloseOnOverlayClick) {
        _this.shouldClose = true;
      }
    };

    _this.handleContentOnMouseUp = function () {
      _this.shouldClose = false;
    };

    _this.handleOverlayOnMouseDown = function (event) {
      if (!_this.props.shouldCloseOnOverlayClick && event.target == _this.overlay) {
        event.preventDefault();
      }
      _this.moveFromContentToOverlay = false;
    };

    _this.handleContentOnClick = function () {
      _this.shouldClose = false;
    };

    _this.handleContentOnMouseDown = function () {
      _this.shouldClose = false;
      _this.moveFromContentToOverlay = false;
    };

    _this.requestClose = function (event) {
      return _this.ownerHandlesClose() && _this.props.onRequestClose(event);
    };

    _this.ownerHandlesClose = function () {
      return _this.props.onRequestClose;
    };

    _this.shouldBeClosed = function () {
      return !_this.state.isOpen && !_this.state.beforeClose;
    };

    _this.contentHasFocus = function () {
      return document.activeElement === _this.content || _this.content.contains(document.activeElement);
    };

    _this.buildClassName = function (which, additional) {
      var classNames = (typeof additional === "undefined" ? "undefined" : _typeof(additional)) === "object" ? additional : {
        base: CLASS_NAMES[which],
        afterOpen: CLASS_NAMES[which] + "--after-open",
        beforeClose: CLASS_NAMES[which] + "--before-close"
      };
      var className = classNames.base;
      if (_this.state.afterOpen) {
        className = className + " " + classNames.afterOpen;
      }
      if (_this.state.beforeClose) {
        className = className + " " + classNames.beforeClose;
      }
      return typeof additional === "string" && additional ? className + " " + additional : className;
    };

    _this.ariaAttributes = function (items) {
      return Object.keys(items).reduce(function (acc, name) {
        acc["aria-" + name] = items[name];
        return acc;
      }, {});
    };

    _this.state = {
      afterOpen: false,
      beforeClose: false
    };

    _this.shouldClose = null;
    _this.moveFromContentToOverlay = null;
    return _this;
  }

  _createClass(ModalPortal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Focus needs to be set when mounting and already open
      if (this.props.isOpen) {
        this.setFocusAfterRender(true);
        this.open();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      if (true) {
        if (newProps.bodyOpenClassName !== this.props.bodyOpenClassName) {
          // eslint-disable-next-line no-console
          console.warn('React-Modal: "bodyOpenClassName" prop has been modified. ' + "This may cause unexpected behavior when multiple modals are open.");
        }
        if (newProps.htmlOpenClassName !== this.props.htmlOpenClassName) {
          // eslint-disable-next-line no-console
          console.warn('React-Modal: "htmlOpenClassName" prop has been modified. ' + "This may cause unexpected behavior when multiple modals are open.");
        }
      }
      // Focus only needs to be set once when the modal is being opened
      if (!this.props.isOpen && newProps.isOpen) {
        this.setFocusAfterRender(true);
        this.open();
      } else if (this.props.isOpen && !newProps.isOpen) {
        this.close();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.focusAfterRender) {
        this.focusContent();
        this.setFocusAfterRender(false);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.afterClose();
      clearTimeout(this.closeTimer);
    }
  }, {
    key: "beforeOpen",
    value: function beforeOpen() {
      var _props = this.props,
          appElement = _props.appElement,
          ariaHideApp = _props.ariaHideApp,
          htmlOpenClassName = _props.htmlOpenClassName,
          bodyOpenClassName = _props.bodyOpenClassName;

      // Add classes.

      classList.add(document.body, bodyOpenClassName);

      htmlOpenClassName && classList.add(document.getElementsByTagName("html")[0], htmlOpenClassName);

      if (ariaHideApp) {
        ariaHiddenInstances += 1;
        ariaAppHider.hide(appElement);
      }
    }

    // Don't steal focus from inner elements

  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          overlayClassName = _props2.overlayClassName,
          defaultStyles = _props2.defaultStyles;

      var contentStyles = className ? {} : defaultStyles.content;
      var overlayStyles = overlayClassName ? {} : defaultStyles.overlay;

      return this.shouldBeClosed() ? null : _react2.default.createElement(
        "div",
        {
          ref: this.setOverlayRef,
          className: this.buildClassName("overlay", overlayClassName),
          style: _extends({}, overlayStyles, this.props.style.overlay),
          onClick: this.handleOverlayOnClick,
          onMouseDown: this.handleOverlayOnMouseDown,
          onMouseUp: this.handleOverlayOnMouseUp,
          "aria-modal": "true"
        },
        _react2.default.createElement(
          "div",
          _extends({
            ref: this.setContentRef,
            style: _extends({}, contentStyles, this.props.style.content),
            className: this.buildClassName("content", className),
            tabIndex: "-1",
            onKeyDown: this.handleKeyDown,
            onMouseDown: this.handleContentOnMouseDown,
            onMouseUp: this.handleContentOnMouseUp,
            onClick: this.handleContentOnClick,
            role: this.props.role,
            "aria-label": this.props.contentLabel
          }, this.ariaAttributes(this.props.aria || {})),
          this.props.children
        )
      );
    }
  }]);

  return ModalPortal;
}(_react.Component);

ModalPortal.defaultProps = {
  style: {
    overlay: {},
    content: {}
  }
};
ModalPortal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  defaultStyles: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  bodyOpenClassName: _propTypes2.default.string,
  htmlOpenClassName: _propTypes2.default.string,
  ariaHideApp: _propTypes2.default.bool,
  appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
  onAfterOpen: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  shouldFocusAfterRender: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  shouldReturnFocusAfterClose: _propTypes2.default.bool,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  aria: _propTypes2.default.object,
  children: _propTypes2.default.node,
  shouldCloseOnEsc: _propTypes2.default.bool,
  overlayRef: _propTypes2.default.func,
  contentRef: _propTypes2.default.func
};
exports.default = ModalPortal;
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/ariaAppHider.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/ariaAppHider.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertNodeList = assertNodeList;
exports.setElement = setElement;
exports.validateElement = validateElement;
exports.hide = hide;
exports.show = show;
exports.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;
exports.resetForTesting = resetForTesting;

var _warning = __webpack_require__(/*! warning */ "./node_modules/warning/browser.js");

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalElement = null;

function assertNodeList(nodeList, selector) {
  if (!nodeList || !nodeList.length) {
    throw new Error("react-modal: No elements were found for selector " + selector + ".");
  }
}

function setElement(element) {
  var useElement = element;
  if (typeof useElement === "string") {
    var el = document.querySelectorAll(useElement);
    assertNodeList(el, useElement);
    useElement = "length" in el ? el[0] : el;
  }
  globalElement = useElement || globalElement;
  return globalElement;
}

function validateElement(appElement) {
  if (!appElement && !globalElement) {
    (0, _warning2.default)(false, ["react-modal: App element is not defined.", "Please use `Modal.setAppElement(el)` or set `appElement={el}`.", "This is needed so screen readers don't see main content", "when modal is opened. It is not recommended, but you can opt-out", "by setting `ariaHideApp={false}`."].join(" "));

    return false;
  }

  return true;
}

function hide(appElement) {
  if (validateElement(appElement)) {
    (appElement || globalElement).setAttribute("aria-hidden", "true");
  }
}

function show(appElement) {
  if (validateElement(appElement)) {
    (appElement || globalElement).removeAttribute("aria-hidden");
  }
}

function documentNotReadyOrSSRTesting() {
  globalElement = null;
}

function resetForTesting() {
  globalElement = null;
}

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/classList.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/classList.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dumpClassLists = dumpClassLists;
var htmlClassList = {};
var docBodyClassList = {};

function dumpClassLists() {
  if (true) {
    var classes = document.getElementsByTagName("html")[0].className;
    var buffer = "Show tracked classes:\n\n";

    buffer += "<html /> (" + classes + "):\n";
    for (var x in htmlClassList) {
      buffer += "  " + x + " " + htmlClassList[x] + "\n";
    }

    classes = document.body.className;

    // eslint-disable-next-line max-len
    buffer += "\n\ndoc.body (" + classes + "):\n";
    for (var _x in docBodyClassList) {
      buffer += "  " + _x + " " + docBodyClassList[_x] + "\n";
    }

    buffer += "\n";

    // eslint-disable-next-line no-console
    console.log(buffer);
  }
}

/**
 * Track the number of reference of a class.
 * @param {object} poll The poll to receive the reference.
 * @param {string} className The class name.
 * @return {string}
 */
var incrementReference = function incrementReference(poll, className) {
  if (!poll[className]) {
    poll[className] = 0;
  }
  poll[className] += 1;
  return className;
};

/**
 * Drop the reference of a class.
 * @param {object} poll The poll to receive the reference.
 * @param {string} className The class name.
 * @return {string}
 */
var decrementReference = function decrementReference(poll, className) {
  if (poll[className]) {
    poll[className] -= 1;
  }
  return className;
};

/**
 * Track a class and add to the given class list.
 * @param {Object} classListRef A class list of an element.
 * @param {Object} poll         The poll to be used.
 * @param {Array}  classes      The list of classes to be tracked.
 */
var trackClass = function trackClass(classListRef, poll, classes) {
  classes.forEach(function (className) {
    incrementReference(poll, className);
    classListRef.add(className);
  });
};

/**
 * Untrack a class and remove from the given class list if the reference
 * reaches 0.
 * @param {Object} classListRef A class list of an element.
 * @param {Object} poll         The poll to be used.
 * @param {Array}  classes      The list of classes to be untracked.
 */
var untrackClass = function untrackClass(classListRef, poll, classes) {
  classes.forEach(function (className) {
    decrementReference(poll, className);
    poll[className] === 0 && classListRef.remove(className);
  });
};

/**
 * Public inferface to add classes to the document.body.
 * @param {string} bodyClass The class string to be added.
 *                           It may contain more then one class
 *                           with ' ' as separator.
 */
var add = exports.add = function add(element, classString) {
  return trackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
};

/**
 * Public inferface to remove classes from the document.body.
 * @param {string} bodyClass The class string to be added.
 *                           It may contain more then one class
 *                           with ' ' as separator.
 */
var remove = exports.remove = function remove(element, classString) {
  return untrackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
};

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/focusManager.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/focusManager.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBlur = handleBlur;
exports.handleFocus = handleFocus;
exports.markForFocusLater = markForFocusLater;
exports.returnFocus = returnFocus;
exports.popWithoutFocus = popWithoutFocus;
exports.setupScopedFocus = setupScopedFocus;
exports.teardownScopedFocus = teardownScopedFocus;

var _tabbable = __webpack_require__(/*! ../helpers/tabbable */ "./node_modules/react-modal/lib/helpers/tabbable.js");

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var focusLaterElements = [];
var modalElement = null;
var needToFocus = false;

function handleBlur() {
  needToFocus = true;
}

function handleFocus() {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation
    // is that the document.body gets focus, and then we focus our element right
    // after, seems fine.
    setTimeout(function () {
      if (modalElement.contains(document.activeElement)) {
        return;
      }
      var el = (0, _tabbable2.default)(modalElement)[0] || modalElement;
      el.focus();
    }, 0);
  }
}

function markForFocusLater() {
  focusLaterElements.push(document.activeElement);
}

/* eslint-disable no-console */
function returnFocus() {
  var toFocus = null;
  try {
    if (focusLaterElements.length !== 0) {
      toFocus = focusLaterElements.pop();
      toFocus.focus();
    }
    return;
  } catch (e) {
    console.warn(["You tried to return focus to", toFocus, "but it is not in the DOM anymore"].join(" "));
  }
}
/* eslint-enable no-console */

function popWithoutFocus() {
  focusLaterElements.length > 0 && focusLaterElements.pop();
}

function setupScopedFocus(element) {
  modalElement = element;

  if (window.addEventListener) {
    window.addEventListener("blur", handleBlur, false);
    document.addEventListener("focus", handleFocus, true);
  } else {
    window.attachEvent("onBlur", handleBlur);
    document.attachEvent("onFocus", handleFocus);
  }
}

function teardownScopedFocus() {
  modalElement = null;

  if (window.addEventListener) {
    window.removeEventListener("blur", handleBlur);
    document.removeEventListener("focus", handleFocus);
  } else {
    window.detachEvent("onBlur", handleBlur);
    document.detachEvent("onFocus", handleFocus);
  }
}

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/safeHTMLElement.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/safeHTMLElement.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canUseDOM = undefined;

var _exenv = __webpack_require__(/*! exenv */ "./node_modules/exenv/index.js");

var _exenv2 = _interopRequireDefault(_exenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EE = _exenv2.default;

var SafeHTMLElement = EE.canUseDOM ? window.HTMLElement : {};

var canUseDOM = exports.canUseDOM = EE.canUseDOM;

exports.default = SafeHTMLElement;

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/scopeTab.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/scopeTab.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scopeTab;

var _tabbable = __webpack_require__(/*! ./tabbable */ "./node_modules/react-modal/lib/helpers/tabbable.js");

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scopeTab(node, event) {
  var tabbable = (0, _tabbable2.default)(node);

  if (!tabbable.length) {
    // Do nothing, since there are no elements that can receive focus.
    event.preventDefault();
    return;
  }

  var shiftKey = event.shiftKey;
  var head = tabbable[0];
  var tail = tabbable[tabbable.length - 1];

  // proceed with default browser behavior on tab.
  // Focus on last element on shift + tab.
  if (node === document.activeElement) {
    if (!shiftKey) return;
    target = tail;
  }

  var target;
  if (tail === document.activeElement && !shiftKey) {
    target = head;
  }

  if (head === document.activeElement && shiftKey) {
    target = tail;
  }

  if (target) {
    event.preventDefault();
    target.focus();
    return;
  }

  // Safari radio issue.
  //
  // Safari does not move the focus to the radio button,
  // so we need to force it to really walk through all elements.
  //
  // This is very error prune, since we are trying to guess
  // if it is a safari browser from the first occurence between
  // chrome or safari.
  //
  // The chrome user agent contains the first ocurrence
  // as the 'chrome/version' and later the 'safari/version'.
  var checkSafari = /(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);
  var isSafariDesktop = checkSafari != null && checkSafari[1] != "Chrome" && /\biPod\b|\biPad\b/g.exec(navigator.userAgent) == null;

  // If we are not in safari desktop, let the browser control
  // the focus
  if (!isSafariDesktop) return;

  var x = tabbable.indexOf(document.activeElement);

  if (x > -1) {
    x += shiftKey ? -1 : 1;
  }

  event.preventDefault();

  tabbable[x].focus();
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/react-modal/lib/helpers/tabbable.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-modal/lib/helpers/tabbable.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findTabbableDescendants;
/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

var tabbableNode = /input|select|textarea|button|object/;

function hidesContents(element) {
  var zeroSize = element.offsetWidth <= 0 && element.offsetHeight <= 0;

  // If the node is empty, this is good enough
  if (zeroSize && !element.innerHTML) return true;

  // Otherwise we need to check some styles
  var style = window.getComputedStyle(element);
  return zeroSize ? style.getPropertyValue("overflow") !== "visible" : style.getPropertyValue("display") == "none";
}

function visible(element) {
  var parentElement = element;
  while (parentElement) {
    if (parentElement === document.body) break;
    if (hidesContents(parentElement)) return false;
    parentElement = parentElement.parentNode;
  }
  return true;
}

function focusable(element, isTabIndexNotNaN) {
  var nodeName = element.nodeName.toLowerCase();
  var res = tabbableNode.test(nodeName) && !element.disabled || (nodeName === "a" ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
  return res && visible(element);
}

function tabbable(element) {
  var tabIndex = element.getAttribute("tabindex");
  if (tabIndex === null) tabIndex = undefined;
  var isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

function findTabbableDescendants(element) {
  return [].slice.call(element.querySelectorAll("*"), 0).filter(tabbable);
}
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/react-modal/lib/index.js":
/*!***********************************************!*\
  !*** ./node_modules/react-modal/lib/index.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Modal = __webpack_require__(/*! ./components/Modal */ "./node_modules/react-modal/lib/components/Modal.js");

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Modal2.default;
module.exports = exports["default"];

/***/ }),

/***/ "./node_modules/react-redux/es/components/Provider.js":
/*!************************************************************!*\
  !*** ./node_modules/react-redux/es/components/Provider.js ***!
  \************************************************************/
/*! exports provided: createProvider, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createProvider */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__ = __webpack_require__(/*! ../utils/PropTypes */ "./node_modules/react-redux/es/utils/PropTypes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_warning__ = __webpack_require__(/*! ../utils/warning */ "./node_modules/react-redux/es/utils/warning.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  Object(__WEBPACK_IMPORTED_MODULE_3__utils_warning__["a" /* default */])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    _inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      _classCallCheck(this, Provider);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(this.props.children);
    };

    return Provider;
  }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

  if (true) {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired,
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired
  };
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired, _Provider$childContex[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["b" /* subscriptionShape */], _Provider$childContex);

  return Provider;
}

/* harmony default export */ __webpack_exports__["a"] = (createProvider());

/***/ }),

/***/ "./node_modules/react-redux/es/components/connectAdvanced.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-redux/es/components/connectAdvanced.js ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = connectAdvanced;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_Subscription__ = __webpack_require__(/*! ../utils/Subscription */ "./node_modules/react-redux/es/utils/Subscription.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__ = __webpack_require__(/*! ../utils/PropTypes */ "./node_modules/react-redux/es/utils/PropTypes.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["a" /* storeShape */], _contextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["b" /* subscriptionShape */], _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["b" /* subscriptionShape */], _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    __WEBPACK_IMPORTED_MODULE_1_invariant___default()(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + (methodName + '. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      _inherits(Connect, _Component);

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        __WEBPACK_IMPORTED_MODULE_1_invariant___default()(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        __WEBPACK_IMPORTED_MODULE_1_invariant___default()(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new __WEBPACK_IMPORTED_MODULE_3__utils_Subscription__["a" /* default */](this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    if (true) {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics___default()(Connect, WrappedComponent);
  };
}

/***/ }),

/***/ "./node_modules/react-redux/es/connect/connect.js":
/*!********************************************************!*\
  !*** ./node_modules/react-redux/es/connect/connect.js ***!
  \********************************************************/
/*! exports provided: createConnect, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createConnect */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_connectAdvanced__ = __webpack_require__(/*! ../components/connectAdvanced */ "./node_modules/react-redux/es/components/connectAdvanced.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__ = __webpack_require__(/*! ../utils/shallowEqual */ "./node_modules/react-redux/es/utils/shallowEqual.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapDispatchToProps__ = __webpack_require__(/*! ./mapDispatchToProps */ "./node_modules/react-redux/es/connect/mapDispatchToProps.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mapStateToProps__ = __webpack_require__(/*! ./mapStateToProps */ "./node_modules/react-redux/es/connect/mapStateToProps.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mergeProps__ = __webpack_require__(/*! ./mergeProps */ "./node_modules/react-redux/es/connect/mergeProps.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectorFactory__ = __webpack_require__(/*! ./selectorFactory */ "./node_modules/react-redux/es/connect/selectorFactory.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + typeof arg + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? __WEBPACK_IMPORTED_MODULE_0__components_connectAdvanced__["a" /* default */] : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? __WEBPACK_IMPORTED_MODULE_3__mapStateToProps__["a" /* default */] : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? __WEBPACK_IMPORTED_MODULE_2__mapDispatchToProps__["a" /* default */] : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? __WEBPACK_IMPORTED_MODULE_4__mergeProps__["a" /* default */] : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? __WEBPACK_IMPORTED_MODULE_5__selectorFactory__["a" /* default */] : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areMergedPropsE,
        extraOptions = _objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (createConnect());

/***/ }),

/***/ "./node_modules/react-redux/es/connect/mapDispatchToProps.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-redux/es/connect/mapDispatchToProps.js ***!
  \*******************************************************************/
/*! exports provided: whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapDispatchToPropsIsFunction */
/* unused harmony export whenMapDispatchToPropsIsMissing */
/* unused harmony export whenMapDispatchToPropsIsObject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__ = __webpack_require__(/*! ./wrapMapToProps */ "./node_modules/react-redux/es/connect/wrapMapToProps.js");



function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["b" /* wrapMapToPropsFunc */])(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function (dispatch) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_redux__["a" /* bindActionCreators */])(mapDispatchToProps, dispatch);
  }) : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);

/***/ }),

/***/ "./node_modules/react-redux/es/connect/mapStateToProps.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-redux/es/connect/mapStateToProps.js ***!
  \****************************************************************/
/*! exports provided: whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapStateToPropsIsFunction */
/* unused harmony export whenMapStateToPropsIsMissing */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__ = __webpack_require__(/*! ./wrapMapToProps */ "./node_modules/react-redux/es/connect/wrapMapToProps.js");


function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["b" /* wrapMapToPropsFunc */])(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? Object(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function () {
    return {};
  }) : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);

/***/ }),

/***/ "./node_modules/react-redux/es/connect/mergeProps.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-redux/es/connect/mergeProps.js ***!
  \***********************************************************/
/*! exports provided: defaultMergeProps, wrapMergePropsFunc, whenMergePropsIsFunction, whenMergePropsIsOmitted, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultMergeProps */
/* unused harmony export wrapMergePropsFunc */
/* unused harmony export whenMergePropsIsFunction */
/* unused harmony export whenMergePropsIsOmitted */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__ = __webpack_require__(/*! ../utils/verifyPlainObject */ "./node_modules/react-redux/es/utils/verifyPlainObject.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        if (true) Object(__WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__["a" /* default */])(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);

/***/ }),

/***/ "./node_modules/react-redux/es/connect/selectorFactory.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-redux/es/connect/selectorFactory.js ***!
  \****************************************************************/
/*! exports provided: impureFinalPropsSelectorFactory, pureFinalPropsSelectorFactory, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export impureFinalPropsSelectorFactory */
/* unused harmony export pureFinalPropsSelectorFactory */
/* harmony export (immutable) */ __webpack_exports__["a"] = finalPropsSelectorFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__verifySubselectors__ = __webpack_require__(/*! ./verifySubselectors */ "./node_modules/react-redux/es/connect/verifySubselectors.js");
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (true) {
    Object(__WEBPACK_IMPORTED_MODULE_0__verifySubselectors__["a" /* default */])(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

/***/ }),

/***/ "./node_modules/react-redux/es/connect/verifySubselectors.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-redux/es/connect/verifySubselectors.js ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifySubselectors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_warning__ = __webpack_require__(/*! ../utils/warning */ "./node_modules/react-redux/es/utils/warning.js");


function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils_warning__["a" /* default */])('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

/***/ }),

/***/ "./node_modules/react-redux/es/connect/wrapMapToProps.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-redux/es/connect/wrapMapToProps.js ***!
  \***************************************************************/
/*! exports provided: wrapMapToPropsConstant, getDependsOnOwnProps, wrapMapToPropsFunc */
/*! exports used: wrapMapToPropsConstant, wrapMapToPropsFunc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = wrapMapToPropsConstant;
/* unused harmony export getDependsOnOwnProps */
/* harmony export (immutable) */ __webpack_exports__["b"] = wrapMapToPropsFunc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__ = __webpack_require__(/*! ../utils/verifyPlainObject */ "./node_modules/react-redux/es/utils/verifyPlainObject.js");


function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (true) Object(__WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__["a" /* default */])(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}

/***/ }),

/***/ "./node_modules/react-redux/es/index.js":
/*!**********************************************!*\
  !*** ./node_modules/react-redux/es/index.js ***!
  \**********************************************/
/*! exports provided: Provider, createProvider, connectAdvanced, connect */
/*! exports used: Provider, connect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Provider__ = __webpack_require__(/*! ./components/Provider */ "./node_modules/react-redux/es/components/Provider.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_connectAdvanced__ = __webpack_require__(/*! ./components/connectAdvanced */ "./node_modules/react-redux/es/components/connectAdvanced.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connect_connect__ = __webpack_require__(/*! ./connect/connect */ "./node_modules/react-redux/es/connect/connect.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Provider__["a"]; });
/* unused harmony reexport createProvider */
/* unused harmony reexport connectAdvanced */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__connect_connect__["a"]; });






/***/ }),

/***/ "./node_modules/react-redux/es/utils/PropTypes.js":
/*!********************************************************!*\
  !*** ./node_modules/react-redux/es/utils/PropTypes.js ***!
  \********************************************************/
/*! exports provided: subscriptionShape, storeShape */
/*! exports used: storeShape, subscriptionShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return subscriptionShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return storeShape; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);


var subscriptionShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  trySubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  tryUnsubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  notifyNestedSubs: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  isSubscribed: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

var storeShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  subscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  dispatch: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  getState: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

/***/ }),

/***/ "./node_modules/react-redux/es/utils/Subscription.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-redux/es/utils/Subscription.js ***!
  \***********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    _classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();



/***/ }),

/***/ "./node_modules/react-redux/es/utils/shallowEqual.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-redux/es/utils/shallowEqual.js ***!
  \***********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = shallowEqual;
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/***/ }),

/***/ "./node_modules/react-redux/es/utils/verifyPlainObject.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-redux/es/utils/verifyPlainObject.js ***!
  \****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifyPlainObject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(/*! lodash-es/isPlainObject */ "./node_modules/lodash-es/isPlainObject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__warning__ = __webpack_require__(/*! ./warning */ "./node_modules/react-redux/es/utils/warning.js");



function verifyPlainObject(value, displayName, methodName) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(value)) {
    Object(__WEBPACK_IMPORTED_MODULE_1__warning__["a" /* default */])(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

/***/ }),

/***/ "./node_modules/react-redux/es/utils/warning.js":
/*!******************************************************!*\
  !*** ./node_modules/react-redux/es/utils/warning.js ***!
  \******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),

/***/ "./node_modules/redux/es/applyMiddleware.js":
/*!**************************************************!*\
  !*** ./node_modules/redux/es/applyMiddleware.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(/*! ./compose */ "./node_modules/redux/es/compose.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),

/***/ "./node_modules/redux/es/bindActionCreators.js":
/*!*****************************************************!*\
  !*** ./node_modules/redux/es/bindActionCreators.js ***!
  \*****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),

/***/ "./node_modules/redux/es/combineReducers.js":
/*!**************************************************!*\
  !*** ./node_modules/redux/es/combineReducers.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(/*! ./createStore */ "./node_modules/redux/es/createStore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(/*! lodash-es/isPlainObject */ "./node_modules/lodash-es/isPlainObject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(/*! ./utils/warning */ "./node_modules/redux/es/utils/warning.js");




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (true) {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (true) {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (true) {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

/***/ }),

/***/ "./node_modules/redux/es/compose.js":
/*!******************************************!*\
  !*** ./node_modules/redux/es/compose.js ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),

/***/ "./node_modules/redux/es/createStore.js":
/*!**********************************************!*\
  !*** ./node_modules/redux/es/createStore.js ***!
  \**********************************************/
/*! exports provided: ActionTypes, default */
/*! exports used: ActionTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(/*! lodash-es/isPlainObject */ "./node_modules/lodash-es/isPlainObject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js");



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable__["a" /* default */]] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable__["a" /* default */]] = observable, _ref2;
}

/***/ }),

/***/ "./node_modules/redux/es/index.js":
/*!****************************************!*\
  !*** ./node_modules/redux/es/index.js ***!
  \****************************************/
/*! exports provided: createStore, combineReducers, bindActionCreators, applyMiddleware, compose */
/*! exports used: bindActionCreators, createStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(/*! ./createStore */ "./node_modules/redux/es/createStore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(/*! ./combineReducers */ "./node_modules/redux/es/combineReducers.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(/*! ./bindActionCreators */ "./node_modules/redux/es/bindActionCreators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(/*! ./applyMiddleware */ "./node_modules/redux/es/applyMiddleware.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(/*! ./compose */ "./node_modules/redux/es/compose.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(/*! ./utils/warning */ "./node_modules/redux/es/utils/warning.js");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* unused harmony reexport combineReducers */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* unused harmony reexport applyMiddleware */
/* unused harmony reexport compose */







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}



/***/ }),

/***/ "./node_modules/redux/es/utils/warning.js":
/*!************************************************!*\
  !*** ./node_modules/redux/es/utils/warning.js ***!
  \************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ponyfill_js__ = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/symbol-observable/es/ponyfill.js");
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = Object(__WEBPACK_IMPORTED_MODULE_0__ponyfill_js__["a" /* default */])(root);
/* harmony default export */ __webpack_exports__["a"] = (result);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ "./node_modules/warning/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/warning/browser.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (true) {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/FileSelector.js":
/*!***********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/FileSelector.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var FileItem = function FileItem(_ref) {
    var item = _ref.item,
        onClick = _ref.onClick;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        item.name,
        " ",
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { onClick: onClick, className: "fa fa-close" })
    );
};

var FileSelector = function (_Component) {
    _inherits(FileSelector, _Component);

    function FileSelector(props) {
        _classCallCheck(this, FileSelector);

        var _this = _possibleConstructorReturn(this, (FileSelector.__proto__ || Object.getPrototypeOf(FileSelector)).call(this, props));

        _this.handleUploadFile = function (event) {
            _this.state.form.append(event.target.files[0].size, event.target.files[0]);
            _this.setState({
                form: _this.state.form
            });
            // '/files' is your node.js route that triggers our middleware
            /* axios.post('/files', data).then((response) => {
                 console.log(response); // do something with the response
             });*/
        };

        _this.getItems = function () {
            var list = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _this.state.form.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    list.push(value);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return list;
        };

        _this.remove = function (name) {
            _this.state.form.delete(name);
            _this.setState({ form: _this.state.form });
        };

        _this.state = {
            form: new FormData()
        };
        return _this;
    }

    _createClass(FileSelector, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "button",
                    { onClick: function onClick() {
                            $("#input-" + _this2.props.target).trigger("click");
                        } },
                    "Upload File"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { className: "is-hidden",
                    onChange: this.handleUploadFile,
                    accept: ".png,.jpg, .pdf, .doc, .docx",
                    id: "input-" + this.props.target,
                    type: "file", name: this.props.target + "[]" }),
                this.getItems().map(function (item, i) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(FileItem, { key: i, item: item, onClick: function onClick() {
                            return _this2.remove(item.size);
                        } });
                })
            );
        }
    }]);

    return FileSelector;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (FileSelector);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/SearchCompetition.js":
/*!****************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/SearchCompetition.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var SearchCompetition = function (_React$Component) {
    _inherits(SearchCompetition, _React$Component);

    function SearchCompetition(props) {
        _classCallCheck(this, SearchCompetition);

        var _this2 = _possibleConstructorReturn(this, (SearchCompetition.__proto__ || Object.getPrototypeOf(SearchCompetition)).call(this, props));

        _this2.search = function () {
            var _this = _this2;

            _this2.setState({
                searching: true
            });

            ContentArena.Api.searchCompetition(_this2.state.input).done(function (results) {
                _this.setState({
                    results: results,
                    searching: false,
                    searchDone: true
                });
            });
        };

        _this2.handleInput = function (e) {

            var input = e.target.value;

            _this2.setState(function (prevState) {
                return {
                    valid: input.length > 2,
                    input: input,
                    searchDone: input.length > 0 ? prevState.searchDone : false
                };
            });
        };

        _this2.state = {
            input: "",
            valid: false,
            searching: false,
            searchDone: false,
            results: []
        };
        return _this2;
    }

    _createClass(SearchCompetition, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "step-item-description" },
                    "Do you want to list competition-based content?"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text",
                        onChange: this.handleInput,
                        placeholder: "Enter competition name (e.g. Bundesliga)" }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { disabled: !this.state.valid || this.state.searching, onClick: this.search },
                        "Search"
                    )
                ),
                this.state.searching && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" }),
                this.state.results.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "table",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "thead",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "tr",
                                null,
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "th",
                                    null,
                                    "Competition"
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "th",
                                    null,
                                    "Country/Category"
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "th",
                                    null,
                                    "Sport"
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("th", null)
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "tbody",
                            null,
                            this.state.results.map(function (result, index) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "tr",
                                    { key: index },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        result.name
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        result.sportCategory.name
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        result.sport.name
                                    ),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "td",
                                        null,
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "button",
                                            { onClick: function onClick() {
                                                    _this3.props.select(result);
                                                } },
                                            "Select"
                                        )
                                    )
                                );
                            })
                        )
                    )
                ),
                this.state.searchDone && this.state.results.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    "Your search \"",
                    this.state.input,
                    "\" did not match any products."
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    !this.state.searchDone && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        null,
                        "Do you want to list content, which is not related to a specific competition?"
                    ),
                    this.state.searchDone && this.state.results.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        null,
                        "Can't find your competition in our list? "
                    ),
                    this.state.searchDone && this.state.results.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        null,
                        "Try another search or create content manually"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { onClick: this.props.close },
                        "Create content manually"
                    )
                )
            );
        }
    }]);

    return SearchCompetition;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (SearchCompetition);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/Selector.js":
/*!*******************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/Selector.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sell_store__ = __webpack_require__(/*! ../../sell/store */ "./src/AppBundle/Resources/public/javascript/sell/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_modal__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_modal__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

__WEBPACK_IMPORTED_MODULE_3_react_modal___default.a.setAppElement('#sell-form-container');

var SelectorItem = function SelectorItem(_ref) {
    var label = _ref.label,
        selected = _ref.selected,
        onClick = _ref.onClick,
        disabled = _ref.disabled;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: "selector-item " + (selected ? "selector-item-selected " : "") + (disabled && "selector-item-disabled"), onClick: !disabled && onClick },
        label
    );
};

var Selector = function (_React$Component) {
    _inherits(Selector, _React$Component);

    function Selector(props) {
        _classCallCheck(this, Selector);

        var _this2 = _possibleConstructorReturn(this, (Selector.__proto__ || Object.getPrototypeOf(Selector)).call(this, props));

        _this2.componentDidMount = function () {};

        _this2.openModal = function () {
            _this2.props.openSelector();
        };

        _this2.afterOpenModal = function () {
            // references are now sync'd and can be accessed.
            //this.subtitle.style.color = '#f00';
        };

        _this2.closeModal = function () {
            _this2.setState({ updated: false, filterUpdated: false });
            _this2.props.closeSelector();
        };

        _this2.getActiveFilter = function () {
            var activeFilter = _this2.getActiveFilterName();
            return _this2.state.filter[activeFilter];
        };

        _this2.getActiveFilterName = function () {
            return _this2.props.activeFilter && !_this2.state.filterUpdated ? _this2.props.activeFilter : _this2.state.activeFilter;
        };

        _this2.shouldShowFilters = function () {
            return _this2.props.selectorItems && _this2.props.selectorItems.length > 30;
        };

        _this2.shouldShowInternationalFilter = function () {

            var show = false;

            _this2.props.selectorItems.some(function (item) {
                show = item.name.match(/international/gi) !== null;
                return show;
            });

            return show;
        };

        _this2.setActiveFilter = function (filterName) {
            _this2.setState({ activeFilter: filterName, filterUpdated: true });
        };

        _this2.applySelection = function () {
            _this2.setState({ updated: false, filterUpdated: false });
            _this2.props.applySelection(_this2.props.selectorType, _this2.state.selectedItem, _this2.props.multiple, _this2.props.index);
        };

        _this2.addNewSport = function () {
            _this2.setState({ updated: false, filterUpdated: false });
            _this2.props.addNewSport();
            _this2.props.closeSelector();
        };

        _this2.addNewTournament = function () {
            _this2.setState({ updated: false, filterUpdated: false });
            _this2.props.addNewTournament();
            _this2.props.closeSelector();
        };

        _this2.selectItem = function (item) {
            _this2.setState({ selectedItem: item, updated: true });
        };

        _this2.isItemSelected = function (item) {

            if (_this2.state.updated) {
                return _this2.state.selectedItem.externalId === item.externalId;
            } else {

                if (!_this2.props.selected) return false;

                return _this2.props.selected.length > 0 && _this2.props.multiple && _this2.props.selected[_this2.props.index] ? _this2.props.selected[_this2.props.index].externalId === item.externalId : _this2.props.selected.externalId === item.externalId;
            }
        };

        _this2.isItemDisabled = function (item) {

            if (_this2.state.disabled.length === 0) return false;
            return _this2.state.disabled.indexOf(item.externalId) !== -1;
        };

        _this2.filterLetter = function (item) {
            var filter = _this2.getActiveFilter();
            return filter.values.indexOf(item.name[0].toLowerCase()) !== -1;
        };

        _this2.filterInternational = function (item) {
            return item.name.match(/international/gi) !== null;
        };

        _this2.getItems = function () {
            var filter = _this2.getActiveFilter();
            if (filter.type === "origin") return _this2.props[filter.value];

            if (filter.type === "international") return _this2.props.selectorItems.filter(_this2.filterInternational);

            if (filter.type === "firstLetter") {

                if (!_this2.shouldShowFilters()) return _this2.props.selectorItems;

                return _this2.props.selectorItems.filter(_this2.filterLetter);
            }
        };

        _this2.state = {
            updated: false,
            filterUpdated: false,
            open: props.selector,
            selectorItems: props.selectorItems || [],
            popularItems: props.popularItems || [],
            filter: {
                "ag": { type: "firstLetter", values: ["a", 'b', 'c', 'd', 'e', 'f', 'g'] },
                "hn": { type: "firstLetter", values: ["h", 'i', 'j', 'k', 'l', 'k', 'n'] },
                "ot": { type: "firstLetter", values: ["o", 'p', 'q', 'r', 's', 't'] },
                "uz": { type: "firstLetter", values: ["u", 'v', 'w', 'x', 'y', 'z'] },
                "popular": { type: "origin", value: "popularItems" },
                "international": { type: "international", value: "international" }
            },
            activeFilter: props.activeFilter || "ag",
            selectedItem: {},
            disabled: []
        };

        __WEBPACK_IMPORTED_MODULE_2__sell_store__["a" /* default */].subscribe(function (a) {});
        return _this2;
    }

    _createClass(Selector, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {

            var disabled = void 0;

            if (nextProps.multiple && nextProps.index > 0) {

                disabled = nextProps.selected.filter(function (item, i) {
                    return i !== nextProps.index;
                }).map(function (item) {
                    return item.externalId;
                });

                this.setState({ disabled: disabled });
            } else {
                this.setState({ disabled: [] });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_modal___default.a,
                {
                    isOpen: this.props.open,
                    onAfterOpen: this.afterOpenModal,
                    onRequestClose: this.closeModal,
                    bodyOpenClassName: "selector",
                    style: customStyles,
                    contentLabel: 'Example Modal'
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    this.props.popularItems && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "popular" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("popular");
                            } },
                        'Popular'
                    ),
                    this.shouldShowFilters() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "ag" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("ag");
                            } },
                        'A-G'
                    ),
                    this.shouldShowFilters() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "hn" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("hn");
                            } },
                        'H-N'
                    ),
                    this.shouldShowFilters() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "ot" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("ot");
                            } },
                        'O-T'
                    ),
                    this.shouldShowFilters() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "uz" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("uz");
                            } },
                        'U-Z'
                    ),
                    this.shouldShowInternationalFilter() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "international" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("international");
                            } },
                        'International'
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'selector-content' },
                    this.getItems().map(function (item, i) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SelectorItem, { key: i,
                            label: item.name,
                            onClick: function onClick() {
                                return _this.selectItem(item);
                            },
                            selected: _this.isItemSelected(item),
                            disabled: _this.isItemDisabled(item)
                        });
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: this.closeModal },
                        'Cancel'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: this.applySelection, disabled: !this.state.updated },
                        'Apply'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        null,
                        'Can\'t find your sport in the list? '
                    ),
                    this.props.showNewSport && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: this.addNewSport },
                        'Add new Sport'
                    ),
                    this.props.showNewTournament && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: this.addNewTournament },
                        'Add new Tournament'
                    )
                )
            );
        }
    }]);

    return Selector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state.selectorInfo;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        openSelector: function openSelector() {
            return dispatch({
                type: 'OPEN_SELECTOR'
            });
        },
        closeSelector: function closeSelector() {
            return dispatch({
                type: 'CLOSE_SELECTOR'
            });
        },
        applySelection: function applySelection(selectorType, selectedItem, multiple, index) {
            return dispatch({
                type: 'APPLY_SELECTION',
                selectorType: selectorType,
                selectedItem: selectedItem,
                multiple: multiple,
                index: index
            });
        },
        addNewSport: function addNewSport() {
            return dispatch({
                type: 'ADD_NEW_SPORT'
            });
        },
        addNewTournament: function addNewTournament() {
            return dispatch({
                type: 'ADD_NEW_TOURNAMENT'
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(Selector));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/SellForm.js":
/*!*******************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/SellForm.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__containers_PackageSelector__ = __webpack_require__(/*! ../containers/PackageSelector */ "./src/AppBundle/Resources/public/javascript/sell/containers/PackageSelector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__containers_buttons__ = __webpack_require__(/*! ../containers/buttons */ "./src/AppBundle/Resources/public/javascript/sell/containers/buttons.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_SellFormSteps__ = __webpack_require__(/*! ../containers/SellFormSteps */ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormSteps.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_SellFormStep1__ = __webpack_require__(/*! ../containers/SellFormStep1 */ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep1.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_components_Selector__ = __webpack_require__(/*! ../../main/components/Selector */ "./src/AppBundle/Resources/public/javascript/main/components/Selector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__store__ = __webpack_require__(/*! ../store */ "./src/AppBundle/Resources/public/javascript/sell/store.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var SellForm = function (_React$Component) {
    _inherits(SellForm, _React$Component);

    function SellForm(props) {
        _classCallCheck(this, SellForm);

        var _this2 = _possibleConstructorReturn(this, (SellForm.__proto__ || Object.getPrototypeOf(SellForm)).call(this, props));

        _this2.componentDidMount = function () {
            _this2.props.contentListingInit(_this2.state.content);
        };

        _this2.state = {
            content: JSON.parse(props.content)
        };

        __WEBPACK_IMPORTED_MODULE_7__store__["a" /* default */].subscribe(function (a) {
            //console.log(store.getState());
        });
        return _this2;
    }

    _createClass(SellForm, [{
        key: "render",
        value: function render() {
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "main-container" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__main_components_Selector__["a" /* default */], null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__containers_SellFormSteps__["a" /* default */], null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__containers_SellFormStep1__["a" /* default */], null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__containers_PackageSelector__["a" /* default */], this.props),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__containers_buttons__["a" /* default */], null)
            );
        }
    }]);

    return SellForm;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return ownProps;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        contentListingInit: function contentListingInit(content) {
            return dispatch({
                type: 'CONTENT_INIT',
                content: content
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_6_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(SellForm));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/containers/PackageSelector.js":
/*!**************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/containers/PackageSelector.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var SuperRight = function SuperRight(_ref) {
    var superRight = _ref.superRight,
        _onChange = _ref.onChange,
        checked = _ref.checked;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "select-box-item" },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "select-box-checkbox" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "checkbox",
                defaultChecked: checked,
                onChange: function onChange() {
                    return _onChange(superRight);
                },
                id: "super-right-" + superRight.id,
                className: "package-selector" }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("label", { htmlFor: "super-right-" + superRight.id })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "select-box-item-label" },
            superRight.name
        )
    );
};

var PackageSelector = function (_React$Component) {
    _inherits(PackageSelector, _React$Component);

    function PackageSelector(props) {
        _classCallCheck(this, PackageSelector);

        var _this2 = _possibleConstructorReturn(this, (PackageSelector.__proto__ || Object.getPrototypeOf(PackageSelector)).call(this, props));

        _this2.state = {
            packages: JSON.parse(props.packages),
            content: JSON.parse(props.content)
        };
        return _this2;
    }

    _createClass(PackageSelector, [{
        key: "render",
        value: function render() {
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                this.props.listingInfo.step === 2 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "box" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "box-title" },
                        "Pick rights"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "seller-box-content seller-box-packages" },
                        this.state.packages.map(function (superRight, i) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SuperRight, {
                                key: superRight.id,
                                superRight: superRight,
                                checked: ContentArena.Utils.getIndex(superRight.id, _this.props.listingInfo.rights_package, "id") !== -1,
                                onChange: _this.props.superRightsUpdated
                            });
                        })
                    )
                )
            );
        }
    }]);

    return PackageSelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        listingInfo: state.listingInfo
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        superRightsUpdated: function superRightsUpdated(rights_package) {
            return dispatch({
                type: 'SUPER_RIGHTS_UPDATED',
                rights_package: rights_package
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(PackageSelector));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep1.js":
/*!************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep1.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_components_FileSelector__ = __webpack_require__(/*! ../../main/components/FileSelector */ "./src/AppBundle/Resources/public/javascript/main/components/FileSelector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_components_SearchCompetition__ = __webpack_require__(/*! ../../main/components/SearchCompetition */ "./src/AppBundle/Resources/public/javascript/main/components/SearchCompetition.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }





var Description = function Description(_ref) {
    var value = _ref.value,
        onBlur = _ref.onBlur;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'step-item-description' },
            'Provide a short description of your content listing'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { onBlur: onBlur, value: value })
    );
};

var Website = function Website(_ref2) {
    var value = _ref2.value,
        onBlur = _ref2.onBlur;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            className: 'website',
            type: 'text',
            onBlur: onBlur,
            value: value,
            placeholder: 'Website' })
    );
};

var NewSport = function NewSport(_ref3) {
    var onClick = _ref3.onClick;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            className: 'new-sport',
            type: 'text',
            placeholder: 'Enter sport' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { onClick: onClick, className: 'fa fa-close' })
    );
};

var NewCategory = function NewCategory(_ref4) {
    _objectDestructuringEmpty(_ref4);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            className: 'new-category',
            type: 'text',
            placeholder: 'Enter category' })
    );
};

var NewTournament = function NewTournament(_ref5) {
    var onClick = _ref5.onClick,
        showClose = _ref5.showClose,
        onBlur = _ref5.onBlur,
        value = _ref5.value;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            className: 'new-category',
            type: 'text',
            onBlur: onBlur,
            defaultValue: value,
            placeholder: 'Enter competition name' }),
        showClose && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { onClick: onClick, className: 'fa fa-close' })
    );
};
var Schedules = function Schedules(_ref6) {
    var schedules = _ref6.schedules;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'schedule' },
        schedules && Object.keys(schedules).map(function (number, i) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Round, { key: i, round: number, schedule: schedules[number] });
        })
    );
};

var Round = function (_React$Component) {
    _inherits(Round, _React$Component);

    function Round(props) {
        _classCallCheck(this, Round);

        var _this2 = _possibleConstructorReturn(this, (Round.__proto__ || Object.getPrototypeOf(Round)).call(this, props));

        _this2.toggle = function (e) {
            e.stopPropagation();
            _this2.setState(function (prevState) {
                return {
                    selected: !prevState.selected
                };
            });

            _this2.child.forEach(function (item) {
                return item.update(!_this2.state.selected);
            });
        };

        _this2.toggleMatches = function () {
            _this2.setState(function (prevState) {
                return {
                    matches: !prevState.matches
                };
            });
        };

        _this2.state = {
            round: props.round,
            schedule: props.schedule,
            selected: false,
            matches: false
        };

        _this2.child = [];
        return _this2;
    }

    _createClass(Round, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "matchday " + (this.state.selected ? "selected" : ""), onClick: this.toggleMatches },
                    'Matchday ',
                    this.state.round,
                    !this.state.selected && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { onClick: this.toggle },
                        'Select matchday'
                    ),
                    this.state.selected && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { onClick: this.toggle },
                        'Unselect'
                    )
                ),
                this.state.matches && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    this.state.schedule.length > 0 && this.state.schedule.map(function (item, i) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Match, { match: item, key: i, selected: _this3.state.selected, onRef: function onRef(ref) {
                                if (ref) {
                                    _this3.child.push(ref);
                                } else {
                                    _this3.child = [];
                                }
                            } });
                    })
                )
            );
        }
    }]);

    return Round;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var Match = function (_React$Component2) {
    _inherits(Match, _React$Component2);

    function Match(props) {
        _classCallCheck(this, Match);

        var _this4 = _possibleConstructorReturn(this, (Match.__proto__ || Object.getPrototypeOf(Match)).call(this, props));

        _this4.toggle = function () {
            _this4.setState(function (prevState) {
                return {
                    selected: !prevState.selected
                };
            });
        };

        _this4.update = function (selected) {
            _this4.setState({ selected: selected });
        };

        _this4.state = {
            match: props.match,
            selected: props.selected || false
        };
        return _this4;
    }

    _createClass(Match, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.onRef(this);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.onRef(undefined);
        }
    }, {
        key: 'render',
        value: function render() {
            var competitorsLen = this.props.match.competitors.length;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: "match " + (this.state.selected ? "selected" : ""), onClick: this.toggle },
                this.props.match.competitors.map(function (competitor, i) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        { key: i },
                        competitor.name,
                        ' ',
                        competitorsLen !== i + 1 && " vs "
                    );
                }),
                this.state.selected && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: "select" },
                    'Unselect'
                ),
                !this.state.selected && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'span',
                    { className: "select" },
                    'Select match'
                )
            );
        }
    }]);

    return Match;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var SeasonSelector = function (_React$Component3) {
    _inherits(SeasonSelector, _React$Component3);

    function SeasonSelector(props) {
        _classCallCheck(this, SeasonSelector);

        var _this5 = _possibleConstructorReturn(this, (SeasonSelector.__proto__ || Object.getPrototypeOf(SeasonSelector)).call(this, props));

        _this5.toggle = function () {
            _this5.setState(function (prevState) {
                return {
                    showSchedule: !prevState.showSchedule
                };
            });
        };

        _this5.state = {
            showSchedule: false
        };
        return _this5;
    }

    _createClass(SeasonSelector, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({ type: 'text'
                    }, this.props.inputProps, {
                        readOnly: true,
                        disabled: this.props.loading,
                        onClick: this.props.openSelector,
                        placeholder: "Season" })),
                    this.props.loading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                ),
                this.props.schedules && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: this.toggle },
                        'Event list'
                    )
                ),
                this.state.showSchedule && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Schedules, { schedules: this.props.schedules })
                ),
                this.props.showAddNew && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: this.props.addSeason },
                        'Add new season'
                    )
                )
            );
        }
    }]);

    return SeasonSelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var SportSelector = function (_React$Component4) {
    _inherits(SportSelector, _React$Component4);

    function SportSelector(props) {
        _classCallCheck(this, SportSelector);

        var _this6 = _possibleConstructorReturn(this, (SportSelector.__proto__ || Object.getPrototypeOf(SportSelector)).call(this, props));

        _this6.toggle = function () {
            _this6.setState(function (prevState) {
                return {
                    showSchedule: !prevState.showSchedule
                };
            });
        };

        _this6.state = {};
        return _this6;
    }

    _createClass(SportSelector, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({ type: 'text'
                }, this.props.inputProps, {
                    readOnly: true,
                    onClick: this.props.onClick,
                    placeholder: "Sport" })),
                this.props.showClose && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { onClick: this.props.remove, className: 'fa fa-close' }),
                this.props.showAddNew && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: this.props.addNewSport },
                        'Add new sport'
                    )
                )
            );
        }
    }]);

    return SportSelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var SellFormStep1 = function (_React$Component5) {
    _inherits(SellFormStep1, _React$Component5);

    function SellFormStep1(props) {
        _classCallCheck(this, SellFormStep1);

        var _this7 = _possibleConstructorReturn(this, (SellFormStep1.__proto__ || Object.getPrototypeOf(SellFormStep1)).call(this, props));

        _this7.updateContentValue = function (event, key) {
            _this7.props.updateContentValue(key, event.target.value);
        };

        _this7.hasCustomTournament = function () {
            return _this7.props.listingInfo.newSport || _this7.props.listingInfo.newTournament || _this7.props.listingInfo.customTournament;
        };

        _this7.addSeason = function () {
            _this7.setState(function (prevState) {
                return {
                    seasonSelectors: [].concat(_toConsumableArray(prevState.seasonSelectors), [1])
                };
            });
        };

        _this7.addSport = function () {
            _this7.setState(function (prevState) {
                return {
                    sportSelectors: [].concat(_toConsumableArray(prevState.sportSelectors), [1])
                };
            });
        };

        _this7.removeSport = function (i) {
            _this7.setState(function (prevState) {
                prevState.sportSelectors.splice(i, 1);
                return {
                    sportSelectors: prevState.sportSelectors
                };
            });

            _this7.props.removeFromMultiple(i, "sports");
        };

        _this7.toggleSearch = function () {
            _this7.setState(function (prevState) {
                return {
                    showSearch: !prevState.showSearch
                };
            });
        };

        _this7.selectTournament = function (tournament) {
            _this7.toggleSearch();
            _this7.props.selectTournament(tournament);
        };

        _this7.state = {
            title: "Step 1 - Event selection",
            lastSportId: null,
            lastCategoryId: null,
            lastTournamentId: null,
            loadingCategories: false,
            loadingTournaments: false,
            loadingSeasons: false,
            seasonSelectors: [1],
            sportSelectors: [1],
            seasons: [],
            schedules: {},
            showSearch: true
        };
        return _this7;
    }

    _createClass(SellFormStep1, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            ContentArena.Api.getSports().done(function (sports) {
                ContentArena.Data.FullSports = sports;
            });
        }
    }, {
        key: 'loadCategories',
        value: function loadCategories(nextProps) {
            var _this8 = this;

            var sportId = nextProps.listingInfo.sports[0].externalId;

            if (sportId === this.state.lastSportId) return;

            this.setState({ loadingCategories: true });
            ContentArena.Api.getCategories(sportId).done(function (categories) {
                ContentArena.Data.Categories = categories;
                _this8.setState({ lastSportId: sportId, loadingCategories: false });
            });
        }
    }, {
        key: 'loadTournaments',
        value: function loadTournaments(nextProps) {
            var _this9 = this;

            var sportId = nextProps.listingInfo.sports[0].externalId;
            var categoryId = nextProps.listingInfo.sportCategory ? nextProps.listingInfo.sportCategory.externalId : null;

            if (sportId === this.state.lastSportId && categoryId === this.state.lastCategoryId) return;

            this.setState({ loadingTournaments: true });
            ContentArena.Api.getTournaments(sportId, categoryId).done(function (tournaments) {
                ContentArena.Data.Tournaments = tournaments;
                _this9.setState({
                    lastSportId: sportId,
                    loadingTournaments: false,
                    lastCategoryId: categoryId
                });
            });
        }
    }, {
        key: 'loadSeasons',
        value: function loadSeasons(nextProps) {
            var _this10 = this;

            var tournamentId = nextProps.listingInfo.tournament ? nextProps.listingInfo.tournament.externalId : null;

            if (tournamentId === this.state.lastTournamentId) return;

            this.setState({ loadingSeasons: true });
            ContentArena.Api.getSeasons(tournamentId).done(function (seasons) {
                ContentArena.Data.Seasons = seasons;
                _this10.setState({
                    lastTournamentId: tournamentId,
                    loadingSeasons: false,
                    seasons: seasons
                });
            });
        }
    }, {
        key: 'loadSchedule',
        value: function loadSchedule(nextProps) {

            var _this = this;

            nextProps.listingInfo.seasons.forEach(function (season) {
                if (!_this.state.schedules[season.externalId]) {
                    _this.setState({ loadingSchedule: true });
                    ContentArena.Api.getSchedule(season.externalId).done(function (schedules) {
                        /*ContentArena.Data.Seasons = seasons;*/
                        console.log(schedules);
                        _this.setState(function (prevState, props) {
                            var prevSchedules = prevState.schedules;
                            prevSchedules[season.externalId] = schedules;
                            return {
                                loadingSchedule: false,
                                schedules: prevSchedules
                            };
                        });
                    });
                }
            });
        }
    }, {
        key: 'getSchedules',
        value: function getSchedules(index) {

            if (!this.props.listingInfo.seasons || !this.props.listingInfo.seasons[index]) return false;

            return this.state.schedules[this.props.listingInfo.seasons[index].externalId];
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.listingInfo.sports.length === 1) {
                this.loadCategories(nextProps);
                this.setState(function (prevState) {
                    return {
                        showSearch: false
                    };
                });
            }

            if (nextProps.listingInfo.sports.length === 1 || nextProps.listingInfo.category) this.loadTournaments(nextProps);
            if (nextProps.listingInfo.tournament) {
                this.loadSeasons(nextProps);
            }
            if (nextProps.listingInfo.seasons.length > 0) this.loadSchedule(nextProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this11 = this;

            if (this.props.listingInfo.step !== 1) return null;

            var inputProps = {
                sports: [{ value: "" }],
                sportCategory: { value: "" },
                tournament: { value: "" },
                seasons: [{ value: "" }]
            };

            if (this.props.listingInfo.sports.length > 0) {
                inputProps.sports = [];
                this.props.listingInfo.sports.forEach(function (sport) {
                    inputProps.sports.push({ value: sport.name });
                });
            }
            if (this.props.listingInfo.seasons.length > 0) {
                inputProps.seasons = [];
                this.props.listingInfo.seasons.forEach(function (season) {
                    inputProps.seasons.push({ value: season.name });
                });
            }
            if (this.props.listingInfo.sportCategory) inputProps.sportCategory.value = this.props.listingInfo.sportCategory.name;
            if (this.props.listingInfo.tournament) inputProps.tournament.value = this.props.listingInfo.tournament.name;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'step-content' },
                this.state.showSearch && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__main_components_SearchCompetition__["a" /* default */], { close: this.toggleSearch, select: this.selectTournament }),
                !this.state.showSearch && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { onClick: this.toggleSearch },
                    'Show search function'
                ),
                !this.state.showSearch && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'step-content-container' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'step-item-description' },
                        'Please select the sport(s) and competition(s) covered by your content listing:'
                    ),
                    !this.props.listingInfo.newSport && this.state.sportSelectors.map(function (item, i) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SportSelector, { key: i,
                            remove: function remove() {
                                return _this11.removeSport(i);
                            },
                            showAddNew: _this11.state.sportSelectors.length > 1 && _this11.state.sportSelectors.length === i + 1,
                            showClose: i > 0,
                            addNewSport: _this11.addSport,
                            onClick: function onClick() {
                                _this11.props.openSportSelector(i);
                            },
                            inputProps: inputProps.sports[i] });
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        null,
                        this.props.listingInfo.newSport && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NewSport, { onClick: this.props.removeNewSport })
                    ),
                    this.state.sportSelectors.length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        null,
                        'Your content covers multiple sports? ',
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'button',
                            { onClick: this.addSport },
                            'Please click here'
                        )
                    ),
                    this.state.sportSelectors.length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        null,
                        !this.props.listingInfo.newSport && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({ type: 'text'
                        }, inputProps.sportCategory, {
                            readOnly: true,
                            disabled: this.state.loadingCategories,
                            onClick: this.props.openCategorySelector,
                            placeholder: "Country/Category" })),
                        this.props.listingInfo.newSport && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NewCategory, null),
                        this.state.loadingCategories && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    this.state.sportSelectors.length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        null,
                        !this.hasCustomTournament() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({ type: 'text'
                        }, inputProps.tournament, {
                            readOnly: true,
                            disabled: this.state.loadingTournaments,
                            onClick: function onClick() {
                                _this11.props.removeNewTournament();
                                _this11.props.openTournamentSelector();
                            },
                            placeholder: "Tournament" })),
                        this.hasCustomTournament() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NewTournament, { showClose: this.props.listingInfo.newTournament || this.props.listingInfo.customTournament,
                            value: this.props.listingInfo.customTournament,
                            onBlur: function onBlur(e) {
                                return _this11.updateContentValue(e, "customTournament");
                            },
                            onClick: this.props.removeNewTournament }),
                        this.state.loadingTournaments && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    this.state.seasons.length > 0 && this.state.seasonSelectors.length > 0 && this.state.seasonSelectors.map(function (season, i) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SeasonSelector, {
                            key: i,
                            season: season,
                            addSeason: _this11.addSeason,
                            inputProps: inputProps.seasons[i],
                            schedules: _this11.getSchedules(i),
                            loading: _this11.state.loadingSeasons,
                            showAddNew: _this11.state.seasonSelectors.length === i + 1,
                            openSelector: function openSelector() {
                                return _this11.props.openSeasonSelector(i);
                            } });
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Description, { value: this.props.listingInfo.description, onBlur: function onBlur(e) {
                            return _this11.updateContentValue(e, "description");
                        } }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Website, { value: this.props.listingInfo.website, onBlur: function onBlur(e) {
                            return _this11.updateContentValue(e, "website");
                        } }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__main_components_FileSelector__["a" /* default */], { target: "brochure" })
                )
            );
        }
    }]);

    return SellFormStep1;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        listingInfo: state.listingInfo
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        openSportSelector: function openSportSelector(index) {
            return dispatch({
                type: 'OPEN_SELECTOR',
                selectorItems: ContentArena.Data.FullSports,
                popularItems: ContentArena.Data.TopSports,
                selectorType: "sports",
                activeFilter: "popular",
                multiple: true,
                showNewSport: true,
                index: index
            });
        },
        openCategorySelector: function openCategorySelector() {
            return dispatch({
                type: 'OPEN_SELECTOR',
                selectorItems: ContentArena.Data.Categories,
                selectorType: "sportCategory",
                activeFilter: "ag"
            });
        },
        openTournamentSelector: function openTournamentSelector() {
            return dispatch({
                type: 'OPEN_SELECTOR',
                selectorItems: ContentArena.Data.Tournaments,
                selectorType: "tournament",
                activeFilter: "ag",
                showNewTournament: true
            });
        },
        openSeasonSelector: function openSeasonSelector(index) {
            return dispatch({
                type: 'OPEN_SELECTOR',
                selectorItems: ContentArena.Data.Seasons,
                selectorType: "seasons",
                multiple: true,
                index: index
            });
        },
        removeFromMultiple: function removeFromMultiple(index, selectorType) {
            return dispatch({
                type: 'REMOVE_FROM_MULTIPLE',
                selectorType: selectorType,
                index: index
            });
        },
        updateContentValue: function updateContentValue(key, value) {
            return dispatch({
                type: 'UPDATE_CONTENT_VALUE',
                key: key,
                value: value
            });
        },
        removeNewSport: function removeNewSport() {
            return dispatch({ type: 'REMOVE_NEW_SPORT' });
        },
        removeNewTournament: function removeNewTournament() {
            return dispatch({ type: 'REMOVE_NEW_TOURNAMENT' });
        },
        selectTournament: function selectTournament(tournament) {
            return dispatch({ type: 'SELECT_TOURNAMENT', tournament: tournament });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(SellFormStep1));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormSteps.js":
/*!************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/containers/SellFormSteps.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var SellFormStep = function SellFormStep(_ref) {
    var step = _ref.step,
        active = _ref.active,
        title = _ref.title;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "step " + (active && "step-active") },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "step-label" },
            "Step ",
            step
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "step-title" },
            title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "step-icon" })
    );
};

var SellFormSteps = function (_React$Component) {
    _inherits(SellFormSteps, _React$Component);

    function SellFormSteps(props) {
        _classCallCheck(this, SellFormSteps);

        var _this2 = _possibleConstructorReturn(this, (SellFormSteps.__proto__ || Object.getPrototypeOf(SellFormSteps)).call(this, props));

        _this2.state = {
            steps: [{ step: 1, title: "Event selection" }, { step: 2, title: "Configure rights" }, { step: 3, title: "Distribution style" }, { step: 4, title: "Price, payment and listing details" }, { step: 5, title: "Confirm" }]
        };
        return _this2;
    }

    _createClass(SellFormSteps, [{
        key: "render",
        value: function render() {
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "box-header" },
                this.state.steps.map(function (step, i) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SellFormStep, { key: i, step: step.step, title: step.title, active: _this.props.step === step.step });
                })
            );
        }
    }]);

    return SellFormSteps;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        step: state.listingInfo.step
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(SellFormSteps));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/containers/buttons.js":
/*!******************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/containers/buttons.js ***!
  \******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(/*! ../store */ "./src/AppBundle/Resources/public/javascript/sell/store.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var SellButtons = function (_React$Component) {
    _inherits(SellButtons, _React$Component);

    function SellButtons(props) {
        _classCallCheck(this, SellButtons);

        var _this2 = _possibleConstructorReturn(this, (SellButtons.__proto__ || Object.getPrototypeOf(SellButtons)).call(this, props));

        _this2.saveAsDraft = function () {
            var _this = _this2;
            _this.setState({ saving: true });
            ContentArena.ContentApi.saveContentAsDraft(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].getState().listingInfo).done(function (response) {
                _this.setState({ saving: false, savingSuccess: true });
            }).fail(function () {
                _this.setState({ saving: false, savingSuccess: false });
            });
        };

        _this2.state = {
            date: new Date(),
            lastStep: props.lastStep || 5,
            saving: false,
            savingSuccess: false
        };
        return _this2;
    }

    _createClass(SellButtons, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var saveAsDraftText = this.state.saving ? "Saving.." : this.state.savingSuccess ? "Saved as Draft" : "Save as Draft";

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'buttons-container' },
                this.props.step !== 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { id: 'previous-step',
                        className: 'standard-button',
                        onClick: this.props.goToPreviousStep },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-arrow-left' }),
                    ' Back'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { className: 'standard-button', onClick: this.saveAsDraft, disabled: this.state.saving },
                    saveAsDraftText,
                    this.state.saving && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                ),
                this.props.step === this.state.lastStep && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { id: 'draft-listing', className: 'standard-button' },
                    'Submit Listing'
                ),
                this.props.step !== this.state.lastStep && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { id: 'next-step', className: 'standard-button', onClick: function onClick() {
                            return _this3.props.goToNextStep();
                        } },
                    'Next ',
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-arrow-right' })
                )
            );
        }
    }]);

    return SellButtons;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        step: state.listingInfo.step
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        goToNextStep: function goToNextStep() {
            return dispatch({
                type: 'GO_TO_NEXT_STEP'
            });
        },

        goToPreviousStep: function goToPreviousStep() {
            return dispatch({
                type: 'GO_TO_PREVIOUS_STEP'
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(SellButtons));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/reducers/content.js":
/*!****************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/reducers/content.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var content = function content() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        listingInfo: {
            step: 1,
            rightsPackage: [],
            category: null,
            sports: [],
            seasons: []
        },

        selectorInfo: {
            type: "sport",
            open: false,
            selectorItems: [],
            popularItems: []
        }

    };
    var action = arguments[1];


    var listingInfo = {};

    switch (action.type) {
        case 'CONTENT_INIT':
            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, action.content)
            });
        case 'GO_TO_NEXT_STEP':

            listingInfo = {
                step: state.listingInfo.step + 1
            };

            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo)
            });
        case 'GO_TO_PREVIOUS_STEP':
            listingInfo = {
                step: state.listingInfo.step - 1
            };
            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo)
            });

        case 'ADD_NEW_SPORT':
            return Object.assign({}, state, { listingInfo: Object.assign({}, state.listingInfo, { newSport: true }) });

        case 'REMOVE_NEW_SPORT':
            return Object.assign({}, state, { listingInfo: Object.assign({}, state.listingInfo, { newSport: false }) });

        case 'ADD_NEW_TOURNAMENT':
            return Object.assign({}, state, { listingInfo: Object.assign({}, state.listingInfo, {
                    newTournament: true,
                    tournament: null
                }) });

        case 'REMOVE_NEW_TOURNAMENT':
            return Object.assign({}, state, { listingInfo: Object.assign({}, state.listingInfo, {
                    newTournament: false, customTournament: null
                }) });

        case 'UPDATE_CONTENT_VALUE':
            listingInfo = {};
            listingInfo[action.key] = action.value;

            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo)
            });

        case 'SELECT_TOURNAMENT':
            listingInfo = {};
            listingInfo.tournament = action.tournament;
            listingInfo.sports = action.tournament.sport ? [action.tournament.sport] : [];
            listingInfo.sportCategory = action.tournament.sportCategory;

            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo)
            });

        case 'OPEN_SELECTOR':
            return Object.assign({}, state, {
                selectorInfo: {
                    selectorType: action.selectorType,
                    open: true,
                    selectorItems: action.selectorItems,
                    popularItems: action.popularItems,
                    activeFilter: action.activeFilter,
                    multiple: action.multiple,
                    showNewSport: action.showNewSport,
                    index: action.index,
                    showNewTournament: action.showNewTournament,
                    selected: state.listingInfo[action.selectorType]
                }
            });

        case 'CLOSE_SELECTOR':
            return Object.assign({}, state, {
                selectorInfo: {
                    selectorType: "",
                    open: false,
                    selectorItems: [],
                    popularItems: []
                }
            });

        case 'APPLY_SELECTION':

            listingInfo = {};
            listingInfo[action.selectorType] = action.multiple ? [action.selectedItem] : action.selectedItem;

            if (action.multiple) {
                listingInfo[action.selectorType] = [].concat(_toConsumableArray(state.listingInfo[action.selectorType]));
                listingInfo[action.selectorType][action.index] = action.selectedItem;
            } else {
                listingInfo[action.selectorType] = action.selectedItem;
            }

            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo),
                selectorInfo: {
                    selectorType: "",
                    open: false,
                    selectorItems: [],
                    popularItems: []
                }
            });

        case 'REMOVE_FROM_MULTIPLE':

            listingInfo = {};
            listingInfo[action.selectorType] = [].concat(_toConsumableArray(state.listingInfo[action.selectorType]));
            listingInfo[action.selectorType].splice(action.index, 1);
            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo)
            });

        case 'SUPER_RIGHTS_UPDATED':

            var rightsPackage = state.listingInfo.rightsPackage;
            var index = ContentArena.Utils.getIndex(action.rightsPackage.id, rightsPackage, "id");
            if (index === -1) {
                rightsPackage.push(action.rightsPackage);
            } else {
                rightsPackage.splice(index, 1);
            }

            listingInfo.rightsPackage = rightsPackage;

            return Object.assign({}, state, {
                listingInfo: Object.assign({}, state.listingInfo, listingInfo)
            });
        default:
            return state;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (content);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/sell.js":
/*!****************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/sell.js ***!
  \****************************************************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_SellForm__ = __webpack_require__(/*! ./components/SellForm */ "./src/AppBundle/Resources/public/javascript/sell/components/SellForm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(/*! ./store */ "./src/AppBundle/Resources/public/javascript/sell/store.js");
/**
 * Created by JuanCruz on 4/1/2018.
 */







var sellForm = document.getElementById('sell-form-container');

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_react_redux__["a" /* Provider */],
    { store: __WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */] },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_SellForm__["a" /* default */], sellForm.dataset)
), sellForm);

$(function () {

    /**
     * Renders all the tooltips
     */
    $(document).tooltip();

    $(".has-datepicker").datepicker();

    $("input").on('focus', function () {
        $(this).removeClass("invalid");
    });

    $(".optional").hide();
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/sell.step1.js":
/*!**********************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/sell.step1.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};
    ContentArena.Model = ContentArena.Model || {};
    ContentArena.Form = ContentArena.Form || {};
    ContentArena.Test = ContentArena.Test || {};

    ContentArena.Form.addCustomSeason = function (id, containerSelector) {
        var container = $(containerSelector || "#event-schedule-subitems"),
            seasonNumber = $(".custom-season-container", container).length + 1,
            source = $("#event-season-selector").autocomplete("option", "source"),
            hasSeason = source.length > 0,
            labels = hasSeason ? source[0].label.split(" ") : [],
            seasonYear = hasSeason ? labels.pop() : new Date().getFullYear(),
            startYear = hasSeason ? seasonYear.search("/") !== -1 ? Number(seasonYear.split("/")[0]) + seasonNumber : Number(seasonYear) + seasonNumber : seasonYear,
            endYear = hasSeason ? seasonYear.search("/") !== -1 ? Number(seasonYear.split("/")[1]) + seasonNumber : null : seasonYear,
            seasonName = hasSeason ? labels.join(" ") : "",
            template = $.templates("#season-template"),
            seasonData = {
            id: seasonNumber,
            name: seasonName,
            startYear: startYear,
            endYear: endYear
        },
            seasonElement = $(template.render(seasonData));

        container.append(seasonElement);

        $(".remove-season", seasonElement).on("click", function () {
            seasonElement.remove();
        });
    };
    ContentArena.Content = new ContentArena.Model.Content();

    function addCustomFn(el, placeholder) {
        $(el).off().val("").addClass("custom-input").show().attr("placeholder", placeholder);

        if ($(el).data('ui-autocomplete') !== undefined) $(el).autocomplete('destroy');
    }

    function addCustomTemplate(sport, category, tournament) {

        if (sport) addCustomFn("#event-sport-selector", "Enter sport name");

        if (ContentArena.Content.eventType === "custom") return;

        if (category) addCustomFn("#event-category-selector", "Enter Country/Category");
        if (tournament) addCustomFn("#event-tournament-selector", "Enter Tournament");
        /*addCustomFn("#event-season-selector", "Enter Season");
        $("#event-schedule-subitems").html("");
        $(".custom-template-item").show();
        $(".custom-template-item").children().show();*/

        ContentArena.Form.addCustomSeason();
    }

    function addSportLayer() {

        var sportSelector = $(".sport-selector"),
            extraSports = sportSelector.length,
            id = "sport-selector-" + (extraSports + 1),
            template = $.templates("<div class=\"step1-event-item\">\n" + "   <i class=\"fa fa-cog fa-spin\"></i>\n" + "      <input type=\"text\"\n" + "          placeholder=\"Sport\"\n" + "          id=\"{{:id}}\"\n" + "          class=\"content-input sport-selector\"\n" + "          required/> " + "<button class=\"remove-button\">Remove</button>\n" + "</div>"),
            htmlOutput = template.render({ id: id });

        if (extraSports === 0) {
            $(this).parent().after(htmlOutput);
        } else {
            sportSelector.last().parent().after(htmlOutput);
        }

        $("#" + id).parent().find('button').on('click', function () {
            $(this).parent().remove();

            if (sportSelector.length === 0) {
                $("#event-tournament-selector, #event-season-selector").show();
                ContentArena.Content.eventType = "database";
            }
        });

        $("#event-category-selector, #event-tournament-selector, #event-season-selector").hide();
        resetSelector(["category", "tournament", "season"]);

        ContentArena.Content.eventType = "custom";
    }

    function addGenericEpisodes(quantity) {
        var template = $.templates("#episode-template"),
            container = $("#content-details-mask"),
            currentQuantity = container.children().length,
            start = 0;

        if (currentQuantity > quantity) container.empty();

        if (currentQuantity < quantity) start = currentQuantity;

        for (var i = start; i < quantity; i++) {
            container.append(template.render({ id: i + 1 }));
        }

        $(".episode-availability-date:not(.hasDatepicker)", container).datepicker();
        console.log("current : " + currentQuantity, "Goal: " + quantity, "Start: " + start);
    }

    function resetSelector(selectors) {
        selectors.forEach(function (selector) {
            return $("#event-" + selector + "-selector").val("").attr('externalId', null);
        });
    }

    $("#add-sport-layer").on("click", addSportLayer);

    $("#event-customEnd-selector, #event-customStart-selector, #event-availability-selector, #expiration-date, .installment-date").datepicker();

    $('#license-file-selector-hidden').checkFileType({
        allowedExtensions: ['pdf', 'doc', 'docx'],
        success: function success() {},
        error: function error() {
            $('<div />').html('File type not allowed. Please upload a .pdf, .doc or .docx file').dialog();
        }
    });

    $('#event-file-selector-hidden').checkFileType({
        allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
        success: function success() {
            var targetId = "#" + $(this).attr("ref");
            $(targetId).val($(this).val());
        },
        error: function error() {
            var targetId = "#" + $(this).attr("ref");
            $(targetId).attr("placeholder", "Allowed: .png, .jpg, .pdf, .doc, .docx").val("");
            $(this).val("");
            $('<div />').html('File type not allowed').dialog();
        }
    });

    $('#image-selector-hidden').checkFileType({
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        success: function success() {
            var targetId = "#" + $(this).attr("ref");
            $(targetId).val($(this).val());
        },
        error: function error() {
            var targetId = "#" + $(this).attr("ref");
            $(targetId).attr("placeholder", "Allowed: .png, .jpg").val("");
            $(this).val("");
            $('<div />').html('File type not allowed').dialog();
        }
    });

    $(document).on("change", ".unselect-others", function () {

        var _this = this;

        $.each($(this).parent().parent().siblings(), function (k, item) {
            var input = $(item).find("input");
            if (_this !== item) {
                input.attr("checked", false);
            } else {}
        });
    });

    $(document).on("change", ".select-all", function () {

        var _this = this;

        $.each($(this).parent().parent().siblings(), function (k, item) {
            var input = $(item).find("input[type=checkbox]");
            if (_this === item) return;

            if (_this.checked) {
                input.prop("checked", true);
                input.attr("disabled", "disabled");
            } else {
                input.attr("disabled", false);
            }
        });
    });

    $(document).on("change", ".toggler-checkbox", function () {

        var context = $(this).parent().parent().parent().parent();

        $($(this).attr("hide") + ", .optional", context).hide().find("input").val("");

        $("input:checked", context).each(function () {
            var selectorShow = $(this).attr("show");

            if (this.checked) {
                $(this).parent().parent().parent().append($(selectorShow, context).show());
            }
        });
    });

    $(document).on("click", ".close-box", function () {
        $($(this).attr("ref")).remove();
    });

    $(document).on("change", ".unselect-all", function () {
        $.each($(this).parent().parent().siblings(), function (k, item) {
            if ($(item).hasClass('all-type')) $(item).find("input").attr("checked", false);
        });
    });

    $(document).on('change', '#content-details-method-mask', function () {
        var el = $("#episodes-quantity"),
            quantity = Number(el.val());

        if (this.checked) {
            if (quantity !== "") addGenericEpisodes(quantity);
            el.on('change', function () {
                var newQuantity = Number($(this).val());
                addGenericEpisodes(newQuantity);
            });
        } else {
            el.off();
        }
    });

    $(document).on('click', ".episode-availability", function () {
        $(this).parent().find('input').each(function () {
            $(this).removeClass("episode-availability-selected");
        });
        $(this).addClass("episode-availability-selected");
    });

    $(document).on('click', "#download-csv-sheet", function () {
        window.location = envhosturl + "bundles/app/data/content-details.csv";
    });

    $('.website').mask("A", {
        translation: {
            "A": { pattern: /[\w/\-.+]/, recursive: true }
        }
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/sell.step2.js":
/*!**********************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/sell.step2.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    ContentArena.Test = ContentArena.Test || {};

    var selectorCounter = 0,
        mainPackage = null;

    function getSelectedFullPackages() {
        var list = [];

        $(".package-selector:checked").each(function (k, v) {

            var pack = {
                id: $(v).attr("id").split("-")[1],
                name: $(v).attr("name").split("-")[1]
            };

            list.push(pack);
        });

        return list;
    }

    function getFullSelectedPackages() {
        var response = {
            selected: {},
            selectedIds: [],
            selectedNames: []
        };

        $(".package-selector:checked").each(function (k, v) {

            var id = $(v).attr("id").split("-")[1],
                name = $(v).attr("name").split("-")[1];

            response.selected[id] = {
                id: id,
                name: name
            };

            response.selectedIds.push(id);
            response.selectedNames.push(name);
        });

        response.getIdByName = function (name) {
            return this.selectedIds[this.selectedNames.indexOf(name)];
        };

        return response;
    }

    function collectSelectedRightItems(container) {

        var list = [];

        container.find("input:checked, .not-optional").each(function (k, el) {

            if (!$(this).parent().parent().parent().is(":visible")) return true;

            if ($(el).attr("all") !== undefined) return true;

            var selectedRight = new ContentArena.Model.SelectedRight();

            selectedRight.right = $(el).attr("right-id");
            selectedRight.rightItem = $(el).attr("right-item-id");
            selectedRight.group = $(el).data("group");

            $(el).parent().parent().find("input:not([type='checkbox']):not(.chosen-search-input), textarea, select").each(function (key, element) {
                selectedRight.inputs.push($(element).val());
            });

            list.push(selectedRight);
        });

        return list;
    }

    function collectSelectedRights() {
        var selectedRights = [],
            selectedPackages = getSelectedFullPackages(),
            multiple = $("#main-multiple-package"),
            single = $("#main-single-package");

        if (multiple.is(":visible")) {
            selectedRights = selectedRights.concat(collectSelectedRightItems(multiple));
        }

        if (single.is(":visible")) {
            selectedRights = selectedRights.concat(collectSelectedRightItems(single));
        }

        if (selectedPackages.length > 1) {
            selectedPackages.forEach(function (pack) {
                selectedRights = selectedRights.concat(collectSelectedRightItems($("#sell-box-package-" + pack.id)));
            });
        }

        $(".production-standards:visible").each(function (k, el) {
            selectedRights = selectedRights.concat(collectSelectedRightItems($(el)));
        });

        return selectedRights;
    }

    function validateSalesPackages() {

        var packages = [];

        $(".sales-package").each(function (k, packageContainer) {

            var salesPackage = new ContentArena.Model.SalesPackage();
            var id = $(packageContainer).attr("id").replace("sales-package-", "");

            salesPackage.territories = $(".territories:checked", packageContainer).attr("val");
            salesPackage.salesMethod = $(".sales-method:checked", packageContainer).attr("val");
            salesPackage.currency = $(".currency:checked", packageContainer).attr("val");
            salesPackage.id = id;
            salesPackage.name = $("#sales-package-" + id + "-name").val();
            salesPackage.fee = $(".fee:visible", packageContainer).val();
            salesPackage.territoryBids = $("#sales-package-" + id + "-territory-bids").is(":checked");
            salesPackage.territoryAsPackage = $("#sales-package-" + id + "-territories-as-package").is(":checked");

            if (salesPackage.territories === "selected") salesPackage.selectedTerritories = $("#sales-package-" + id + "-territory-selected").chosen().val();
            if (salesPackage.territories === "excluded") salesPackage.excludedTerritories = $("#sales-package-" + id + "-territory-excluded").chosen().val();

            packages.push(salesPackage);
        });

        return packages;
    }

    function validateStepTwo() {

        var hasErrors = false,
            messages = [],
            expirationDate = $("#expiration-date"),
            rights = collectSelectedRights(),
            messagesContainer = $('<div title="The form is incomplete!" />'),
            total = 0,
            selectedPackages = getFullSelectedPackages();

        $(".installment-percent").each(function () {
            total += Number($(this).val().replace("%", ""));
        });

        if (total !== 100) {
            hasErrors = true;
            messages.push($('<div class="popup-error-message" />').html('Total installments must sum 100%!'));
        } else {
            ContentArena.Content.installments = collectInstallments();
        }

        ContentArena.Content.salesPackages = validateSalesPackages();
        ContentArena.Content.salesPackages.forEach(function (salesPackage) {
            var valid = salesPackage.validate();

            if (valid.hasErrors) {
                hasErrors = true;
                messages.push($('<div class="popup-error-message" />').html(valid.description));
            }
        });
        ContentArena.Content.rights = rights;
        ContentArena.Content.packages = selectedPackages.selectedIds;

        if (expirationDate.val() === "") {
            hasErrors = true;
            messages.push($('<div class="popup-error-message" />').html('Please select an expiration date'));
        } else {
            ContentArena.Content.expiresAt = expirationDate.val();
        }

        if (hasErrors) {

            messages.forEach(function (content) {
                messagesContainer.append(content);
            });

            messagesContainer.dialog({
                minWidth: 400
            });
        }

        return !hasErrors;
    }

    function addSalesPackage() {
        var template = $.templates("#sales-package-template"),
            salesPackages = $(".sales-package"),
            id = salesPackages.length + 1,
            htmlOutput = template.render({ id: id });

        if (id === 1) {
            $(".rights-list").last().after(htmlOutput);
        } else {
            salesPackages.last().after(htmlOutput);
        }

        $(".price-optional", "#sales-package-" + id).hide();
        ContentArena.Utils.addRegionBehaviour("#sales-package-" + id + " .has-region-selector");
    }

    /*function addDistributionPackages( name ){
          var distributionPackage = $(".production-standards", "#box-templates").clone(),
            technicalDelivery = $(".technical-delivery", "#box-templates").clone(),
            distributionPackageTitle = distributionPackage.find(".box-title"),
            technicalDeliveryTitle = technicalDelivery.find(".box-title"),
            title = name.replace("-", " - "),
            template = $.templates("#content-details-template"),
            episodeTemplate = $.templates("#episode-template");
          $("[group='Production standards']", ".rights-list").each(function(){
            var test = $(this).clone();
            distributionPackage.find(".seller-box-content").append(test);
        });
          $("[group='Technical delivery']", ".rights-list").each(function(){
            var test = $(this).clone();
            technicalDelivery.find(".seller-box-content").append(test);
        });
          distributionPackage.attr("id","distribution-package-" + name).show().insertBefore(".rights-list");
        technicalDelivery.attr("id","technical-delivery-" + name).show().insertAfter(distributionPackage);
        distributionPackageTitle.html("Distribution package - " + distributionPackageTitle.html() + " -"  + title);
        technicalDeliveryTitle.html(technicalDeliveryTitle.html() + " - " + title);
          $(".optional",technicalDelivery).hide();
          $(".optional",distributionPackage).hide();
          $("label", distributionPackage ).each(function(){
            $(this).attr("for", "distribution-package-" + name + "-" + $(this).attr("for") )
        });
          $("input, select", distributionPackage ).each(function(){
            $(this).attr("id", "distribution-package-" + name + "-" + $(this).attr("id") )
        });
          $("label", technicalDelivery ).each(function(){
            $(this).attr("for", "technical-delivery-" + name + "-" + $(this).attr("for") )
        });
          $("input, select", technicalDelivery ).each(function(){
            $(this).attr("id", "technical-delivery-" + name + "-" + $(this).attr("id") )
        });
          ContentArena.Languages.addLanguageBehaviour("#distribution-package-" + name + " .has-language-trigger");
          if( name === "Program" ){
            technicalDelivery.find(".seller-box-content").append(template.render());
            $("#upload-content-csv").on('click', function (){
                $('#csv-selector-hidden').trigger("click");
            });
            if(ContentArena.Utils.isAPIAvailable()) {
                $('#csv-selector-hidden').bind('change', function (evt) {
                    var files = evt.target.files; // FileList object
                    var file = files[0];
                    var reader = new FileReader();
                      $('#content-details-mask').html("");
                      reader.readAsText(file);
                    /!**
                     *
                     * @param {{ target:{} }} event
                     *!/
                    reader.onload = function(event){
                        var csv = event.target.result;
                        var data = $.csv.toArrays(csv);
                          data.forEach(function (row, index) {
                            if ( index > 0 ){
                                $('#content-details-mask').append(episodeTemplate.render({
                                    episode: row[0]
                                })).show();
                            }
                        });
                          $("#episodes-quantity").val(data.length - 1);
                        };
                    reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
                });
            }
        }
          return distributionPackage;
      }*/

    /*function addExtraDistributionPackage( distributionPackage){
          var selectors = [],
            packages = getFullSelectedPackages(),
            highlights = packages.selectedNames.indexOf("Highlights") !== -1,
            clips = packages.selectedNames.indexOf("Clips") !== -1,
            news = packages.selectedNames.indexOf("News access") !== -1;
          distributionPackage.find(".seller-box-content").append( $(".extra-distribution-packages").clone().show());
          if (highlights ) selectors.push(".extra-package-highlight" );
        if (clips ) selectors.push(".extra-package-clips" );
        if (news ) selectors.push(".extra-package-news" );
        if (highlights && clips ) selectors.push(".extra-package-highlight-clips" );
        if (highlights && news ) selectors.push(".extra-package-highlight-news" );
        if (clips && news ) selectors.push(".extra-package-clips-news" );
        if (highlights && news && clips ) selectors.push(".extra-package-highlight-clips-news" );
          $(selectors.join(", "), distributionPackage).show();
          $(".distribution-package-selector", distributionPackage).on("change", function () {
            var values = $(this).val().split(", ");
              $(".technical-delivery:visible:not(#technical-delivery-Main)").remove();
            $(".production-standards:visible:not(#distribution-package-Main)").remove();
              addDistributionPackages( values.join("-") );
        })
      }*/

    /*function checkSelectedPackages() {
          var fullPackagesData = getFullSelectedPackages(),
            packages = fullPackagesData.selectedIds,
            packagesName = fullPackagesData.selectedNames,
            mainItems = [],
            singleItems = [],
            distributionPackage,
            multiPackage = ( packages.length > 1),
            mainTarget = (multiPackage) ? $("#main-multiple-package") : $("#main-single-package");
            $.each($(".seller-box-content"), function () {
            if ($(this).children().length === 0) {
                $(this).parent().hide()
            } else {
                if ($(this).children().first().css("display") === 'none') {
                    $(this).parent().hide()
                }
            }
        });
          $(".select-box-item-container").hide();
        $(".rights-container").hide();
        $(".rights-container:not(.technical-delivery) .seller-box-content").html("");
        $(".production-standards", "#step2").remove();
        $(".technical-delivery", "#step2").remove();
          $.each(packages, function(k, v){
              singleItems.push(".has-package-"+v+":not(.is-collectively)[group='Main Information']");
              if ( multiPackage ){
                mainItems.push(".has-package-"+v+".is-collectively[group='Main Information']");
                $(".has-package-"+v+":not(.is-collectively)[group='Main Information']", ".rights-list").each(function(){
                    var test = $(this).clone();
                    $("#sell-box-package-"+ v +" .seller-box-content").append(test);
                });
                  $("#sell-box-package-"+ v ).show();
            } else {
                mainItems.push(".has-package-"+v+"[group='Main Information']");
            }
              $(".has-package-" + v).show();
              $("label", "#sell-box-package-" + v ).each(function(){
                $(this).attr("for", "package-" + v + "-" + $(this).attr("for") )
            });
              $("input", "#sell-box-package-" + v ).each(function(){
                $(this).attr("id", "package-" + v + "-" + $(this).attr("id") )
            });
              $("select", "#sell-box-package-" + v ).each(function(){
                $(this).attr("id", "package-" + v + "-" + $(this).attr("id") )
            });
              ContentArena.Languages.addLanguageBehaviour( "#sell-box-package-" + v +" .has-language-trigger");
            $( "#sell-box-package-" + v +" .has-calendar").each(function (k, element) {
                $("#" + $(element).attr("id")).datepicker();
            });
              $(".optional", "#sell-box-package-" + v ).hide();
          }) ;
          $(mainItems.join(","), ".rights-list").each(function(){
            var test = $(this).clone();
            mainTarget.find(".seller-box-content").append(test);
            mainTarget.show();
        });
          if ( packagesName.indexOf("Program") === -1 || packagesName.length > 1 ){
            distributionPackage = addDistributionPackages( "Main");
        }
          if ( packagesName.length > 1
            && ( packagesName.indexOf("Clips") !== -1
                || packagesName.indexOf("Highlights") !== -1
                || packagesName.indexOf("News access") !== -1
            )
        ){
            addExtraDistributionPackage(distributionPackage);
        }
          if ( packagesName.indexOf("Program") !== -1 ){
            addDistributionPackages( "Program" );
        }
          $("#main-sell-box").show();
        $("#price-sell-box").show();
        $(".package-ready-button").show();
        $("#price-sell-box .select-box-item-container").show();
        ContentArena.Languages.addLanguageBehaviour( mainTarget.find(".has-language-trigger") );
        mainTarget.find(".has-calendar").each(function (k, element) {
            $("#" + $(element).attr("id")).datepicker();
        });
        mainTarget.find(".optional").hide();
      }*/

    function setupInstallment() {
        $(".installment-percent").off().mask('000%', { reverse: true });
    }

    function collectInstallments() {

        var installments = [];

        $(".installment").each(function (k, packageContainer) {

            var installment = {};

            installment.percent = $(".installment-percent", packageContainer).val().replace("%", "");
            installment.date = $(".installment-date", packageContainer).val();
            installment.signing_day = $(".installment-days", packageContainer).val();
            installment.granted_day = $(".granted-days").val();

            installments.push(installment);
        });

        return installments;
    }

    function submitform() {
        var url = envhosturl + 'sell/published',
            form = $('#myform');

        form.attr('action', url);

        var data = JSON.stringify(ContentArena.Content);

        $('<input type="hidden" name="json"/>').val(data).appendTo('#myform');
        window.onbeforeunload = function () {};
        form.submit();
    }

    $("#upload-agreement").on('click', function () {
        $('#license-file-selector-hidden').trigger("click");
    });

    $("#submit-listing").on("click", function () {

        if (!validateStepTwo()) return;

        submitform();
    });

    $("#view-agreement").on('click', function () {

        validateStepTwo();
        $("#view-agreement").attr("disabled", "disabled").append('<i class="fa fa-cog fa-spin">');
        $.ajax({
            url: envhosturl + 'v1/contract/previews',
            type: 'POST',
            data: {
                json: JSON.stringify(ContentArena.Content)
            },
            success: function success(response) {
                ContentArena.Content.id = response.id;
                window.open(envhosturl + 'contract/preview?id=' + response.id, "_blank", 'height=600,width=800');
                $("#view-agreement").attr("disabled", null).find('i').remove();
            }
        });
    });

    $("#add-installment").on('click', function () {

        if ($(".installment:first input.installment-percent").val() == '100%') {
            $(".installment:first input.installment-percent").val('');
        }

        var pos = $(".installment").length + 1,
            item = $(".installment:last").clone();

        item.attr("id", "installment" + pos);
        item.find("span").html(ContentArena.Utils.addOrdinal(pos));
        item.find("input").val("");
        item.insertAfter(".installment:last");

        item.find("input.hasDatepicker").attr("id", null).removeClass("hasDatepicker").datepicker("destroy").off().datepicker();

        //setupInstallment()
    });

    /*$(".package-selector").on('change', function () {
          var id = $(this).attr("id").split("-")[1],
            name = $(this).attr("name").split("-")[1];
          checkSelectedPackages();
          if (!this.checked || selectorCounter >= 1) return;
          $.each($(".package-selector"), function (i, pack) {
              var packages = $(pack).data("packages"),
                pack_id = $(pack).attr("id").split("-")[1],
                el = $(this),
                flag = false;
              $.each(packages.parent, function (i, p) {
                if (p.id === id) flag = true;
            });
              if (!flag){
                el.attr("disabled", "disabled");
                if (pack_id !== id) el.parent().next().addClass("disabled");
            }
          });
          $("#sell-box").removeClass("is-hidden");
          mainPackage = name;
        selectorCounter++;
      });*/

    $("#reset-packages").on('click', function () {
        $.each($(".package-selector"), function (i, pack) {

            pack.checked = false;
            $(pack).attr("disabled", null);
            $(pack).parent().next().removeClass("disabled");
            $("#main-sell-box").hide();
            $(".select-box-item-container").hide();
            $(".sell-items-box").hide();
            $("#price-sell-box").hide();
            $(".package-ready-button").hide();
            selectorCounter = 0;
        });
    });

    /*$("#draft-listing").on('click', function () {
          var el = $(this);
          el.html("<i class=\"fa fa-cog fa-spin\">").attr("disabled", "disabled");
          ContentArena.ContentApi.saveContentAsDraft(ContentArena.Content).done(function (response) {
            if ( response.success !== undefined && response.contentId !== undefined ){
                ContentArena.Content.id = response.contentId;
                el.html("Saved as Draft").attr("disabled", null);
                window.onbeforeunload = function () {}
            }
        });
    });*/

    $(document).on('click', ".add-sales-package", function () {
        addSalesPackage();
    });

    ContentArena.Test.validateStepTwo = validateStepTwo;
    ContentArena.Test.getFullSelectedPackages = getFullSelectedPackages;

    /**
     * Initialization
     */
    setupInstallment();
    addSalesPackage();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/store.js":
/*!*****************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/store.js ***!
  \*****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers_content__ = __webpack_require__(/*! ./reducers/content */ "./src/AppBundle/Resources/public/javascript/sell/reducers/content.js");
/**
 * Created by JuanCruz on 4/1/2018.
 */





/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_redux__["b" /* createStore */])(__WEBPACK_IMPORTED_MODULE_2__reducers_content__["a" /* default */]));

/***/ }),

/***/ 1:
/*!****************************************************************************************************************************************************************************************************!*\
  !*** multi ./src/AppBundle/Resources/public/javascript/sell/sell.js ./src/AppBundle/Resources/public/javascript/sell/sell.step1.js ./src/AppBundle/Resources/public/javascript/sell/sell.step2.js ***!
  \****************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/sell/sell.js */"./src/AppBundle/Resources/public/javascript/sell/sell.js");
__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/sell/sell.step1.js */"./src/AppBundle/Resources/public/javascript/sell/sell.step1.js");
module.exports = __webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/sell/sell.step2.js */"./src/AppBundle/Resources/public/javascript/sell/sell.step2.js");


/***/ })

},[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXhlbnYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZhcmlhbnQvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2NvbXBvbmVudHMvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9jb21wb25lbnRzL01vZGFsUG9ydGFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9hcmlhQXBwSGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2NsYXNzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvZm9jdXNNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9zYWZlSFRNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3Njb3BlVGFiLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy90YWJiYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL1Byb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9jb25uZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21hcERpc3BhdGNoVG9Qcm9wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tYXBTdGF0ZVRvUHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWVyZ2VQcm9wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9zZWxlY3RvckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvdmVyaWZ5U3Vic2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3dyYXBNYXBUb1Byb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvUHJvcFR5cGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9TdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3NoYWxsb3dFcXVhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvdmVyaWZ5UGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2FwcGx5TWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYmluZEFjdGlvbkNyZWF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21iaW5lUmVkdWNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbXBvc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93YXJuaW5nL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0ZpbGVTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvU2VhcmNoQ29tcGV0aXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL1NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9TZWxsRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvUGFja2FnZVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9TZWxsRm9ybVN0ZXAxLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9TZWxsRm9ybVN0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9idXR0b25zLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3NlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zZWxsLnN0ZXAxLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvc2VsbC5zdGVwMi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3N0b3JlLmpzIl0sIm5hbWVzIjpbIkZpbGVJdGVtIiwiaXRlbSIsIm9uQ2xpY2siLCJuYW1lIiwiRmlsZVNlbGVjdG9yIiwicHJvcHMiLCJoYW5kbGVVcGxvYWRGaWxlIiwiZXZlbnQiLCJzdGF0ZSIsImZvcm0iLCJhcHBlbmQiLCJ0YXJnZXQiLCJmaWxlcyIsInNpemUiLCJzZXRTdGF0ZSIsImdldEl0ZW1zIiwibGlzdCIsInZhbHVlcyIsInZhbHVlIiwicHVzaCIsInJlbW92ZSIsImRlbGV0ZSIsIkZvcm1EYXRhIiwiJCIsInRyaWdnZXIiLCJtYXAiLCJpIiwiU2VhcmNoQ29tcGV0aXRpb24iLCJzZWFyY2giLCJfdGhpcyIsInNlYXJjaGluZyIsIkNvbnRlbnRBcmVuYSIsIkFwaSIsInNlYXJjaENvbXBldGl0aW9uIiwiaW5wdXQiLCJkb25lIiwicmVzdWx0cyIsInNlYXJjaERvbmUiLCJoYW5kbGVJbnB1dCIsImUiLCJwcmV2U3RhdGUiLCJ2YWxpZCIsImxlbmd0aCIsInJlc3VsdCIsImluZGV4Iiwic3BvcnRDYXRlZ29yeSIsInNwb3J0Iiwic2VsZWN0IiwiY2xvc2UiLCJSZWFjdCIsIkNvbXBvbmVudCIsImN1c3RvbVN0eWxlcyIsImNvbnRlbnQiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJtYXJnaW5SaWdodCIsInRyYW5zZm9ybSIsIk1vZGFsIiwic2V0QXBwRWxlbWVudCIsIlNlbGVjdG9ySXRlbSIsImxhYmVsIiwic2VsZWN0ZWQiLCJkaXNhYmxlZCIsIlNlbGVjdG9yIiwiY29tcG9uZW50RGlkTW91bnQiLCJvcGVuTW9kYWwiLCJvcGVuU2VsZWN0b3IiLCJhZnRlck9wZW5Nb2RhbCIsImNsb3NlTW9kYWwiLCJ1cGRhdGVkIiwiZmlsdGVyVXBkYXRlZCIsImNsb3NlU2VsZWN0b3IiLCJnZXRBY3RpdmVGaWx0ZXIiLCJhY3RpdmVGaWx0ZXIiLCJnZXRBY3RpdmVGaWx0ZXJOYW1lIiwiZmlsdGVyIiwic2hvdWxkU2hvd0ZpbHRlcnMiLCJzZWxlY3Rvckl0ZW1zIiwic2hvdWxkU2hvd0ludGVybmF0aW9uYWxGaWx0ZXIiLCJzaG93Iiwic29tZSIsIm1hdGNoIiwic2V0QWN0aXZlRmlsdGVyIiwiZmlsdGVyTmFtZSIsImFwcGx5U2VsZWN0aW9uIiwic2VsZWN0b3JUeXBlIiwic2VsZWN0ZWRJdGVtIiwibXVsdGlwbGUiLCJhZGROZXdTcG9ydCIsImFkZE5ld1RvdXJuYW1lbnQiLCJzZWxlY3RJdGVtIiwiaXNJdGVtU2VsZWN0ZWQiLCJleHRlcm5hbElkIiwiaXNJdGVtRGlzYWJsZWQiLCJpbmRleE9mIiwiZmlsdGVyTGV0dGVyIiwidG9Mb3dlckNhc2UiLCJmaWx0ZXJJbnRlcm5hdGlvbmFsIiwidHlwZSIsIm9wZW4iLCJzZWxlY3RvciIsInBvcHVsYXJJdGVtcyIsInN0b3JlIiwic3Vic2NyaWJlIiwiYSIsIm5leHRQcm9wcyIsInNob3dOZXdTcG9ydCIsInNob3dOZXdUb3VybmFtZW50IiwibWFwU3RhdGVUb1Byb3BzIiwic2VsZWN0b3JJbmZvIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giLCJjb25uZWN0IiwiU2VsbEZvcm0iLCJjb250ZW50TGlzdGluZ0luaXQiLCJKU09OIiwicGFyc2UiLCJvd25Qcm9wcyIsIlN1cGVyUmlnaHQiLCJzdXBlclJpZ2h0Iiwib25DaGFuZ2UiLCJjaGVja2VkIiwiaWQiLCJQYWNrYWdlU2VsZWN0b3IiLCJwYWNrYWdlcyIsImxpc3RpbmdJbmZvIiwic3RlcCIsIlV0aWxzIiwiZ2V0SW5kZXgiLCJyaWdodHNfcGFja2FnZSIsInN1cGVyUmlnaHRzVXBkYXRlZCIsIkRlc2NyaXB0aW9uIiwib25CbHVyIiwiV2Vic2l0ZSIsIk5ld1Nwb3J0IiwiTmV3Q2F0ZWdvcnkiLCJOZXdUb3VybmFtZW50Iiwic2hvd0Nsb3NlIiwiU2NoZWR1bGVzIiwic2NoZWR1bGVzIiwiT2JqZWN0Iiwia2V5cyIsIm51bWJlciIsIlJvdW5kIiwidG9nZ2xlIiwic3RvcFByb3BhZ2F0aW9uIiwiY2hpbGQiLCJmb3JFYWNoIiwidXBkYXRlIiwidG9nZ2xlTWF0Y2hlcyIsIm1hdGNoZXMiLCJyb3VuZCIsInNjaGVkdWxlIiwicmVmIiwiTWF0Y2giLCJvblJlZiIsInVuZGVmaW5lZCIsImNvbXBldGl0b3JzTGVuIiwiY29tcGV0aXRvcnMiLCJjb21wZXRpdG9yIiwiU2Vhc29uU2VsZWN0b3IiLCJzaG93U2NoZWR1bGUiLCJpbnB1dFByb3BzIiwibG9hZGluZyIsInNob3dBZGROZXciLCJhZGRTZWFzb24iLCJTcG9ydFNlbGVjdG9yIiwiU2VsbEZvcm1TdGVwMSIsInVwZGF0ZUNvbnRlbnRWYWx1ZSIsImtleSIsImhhc0N1c3RvbVRvdXJuYW1lbnQiLCJuZXdTcG9ydCIsIm5ld1RvdXJuYW1lbnQiLCJjdXN0b21Ub3VybmFtZW50Iiwic2Vhc29uU2VsZWN0b3JzIiwiYWRkU3BvcnQiLCJzcG9ydFNlbGVjdG9ycyIsInJlbW92ZVNwb3J0Iiwic3BsaWNlIiwicmVtb3ZlRnJvbU11bHRpcGxlIiwidG9nZ2xlU2VhcmNoIiwic2hvd1NlYXJjaCIsInNlbGVjdFRvdXJuYW1lbnQiLCJ0b3VybmFtZW50IiwidGl0bGUiLCJsYXN0U3BvcnRJZCIsImxhc3RDYXRlZ29yeUlkIiwibGFzdFRvdXJuYW1lbnRJZCIsImxvYWRpbmdDYXRlZ29yaWVzIiwibG9hZGluZ1RvdXJuYW1lbnRzIiwibG9hZGluZ1NlYXNvbnMiLCJzZWFzb25zIiwiZ2V0U3BvcnRzIiwic3BvcnRzIiwiRGF0YSIsIkZ1bGxTcG9ydHMiLCJzcG9ydElkIiwiZ2V0Q2F0ZWdvcmllcyIsImNhdGVnb3JpZXMiLCJDYXRlZ29yaWVzIiwiY2F0ZWdvcnlJZCIsImdldFRvdXJuYW1lbnRzIiwidG91cm5hbWVudHMiLCJUb3VybmFtZW50cyIsInRvdXJuYW1lbnRJZCIsImdldFNlYXNvbnMiLCJTZWFzb25zIiwic2Vhc29uIiwibG9hZGluZ1NjaGVkdWxlIiwiZ2V0U2NoZWR1bGUiLCJjb25zb2xlIiwibG9nIiwicHJldlNjaGVkdWxlcyIsImxvYWRDYXRlZ29yaWVzIiwiY2F0ZWdvcnkiLCJsb2FkVG91cm5hbWVudHMiLCJsb2FkU2Vhc29ucyIsImxvYWRTY2hlZHVsZSIsIm9wZW5TcG9ydFNlbGVjdG9yIiwicmVtb3ZlTmV3U3BvcnQiLCJvcGVuQ2F0ZWdvcnlTZWxlY3RvciIsInJlbW92ZU5ld1RvdXJuYW1lbnQiLCJvcGVuVG91cm5hbWVudFNlbGVjdG9yIiwiZ2V0U2NoZWR1bGVzIiwib3BlblNlYXNvblNlbGVjdG9yIiwiZGVzY3JpcHRpb24iLCJ3ZWJzaXRlIiwiVG9wU3BvcnRzIiwiU2VsbEZvcm1TdGVwIiwiYWN0aXZlIiwiU2VsbEZvcm1TdGVwcyIsInN0ZXBzIiwiU2VsbEJ1dHRvbnMiLCJzYXZlQXNEcmFmdCIsInNhdmluZyIsIkNvbnRlbnRBcGkiLCJzYXZlQ29udGVudEFzRHJhZnQiLCJnZXRTdGF0ZSIsInJlc3BvbnNlIiwic2F2aW5nU3VjY2VzcyIsImZhaWwiLCJkYXRlIiwiRGF0ZSIsImxhc3RTdGVwIiwic2F2ZUFzRHJhZnRUZXh0IiwiZ29Ub1ByZXZpb3VzU3RlcCIsImdvVG9OZXh0U3RlcCIsInJpZ2h0c1BhY2thZ2UiLCJhY3Rpb24iLCJhc3NpZ24iLCJzZWxsRm9ybSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJSZWFjdERPTSIsInJlbmRlciIsImRhdGFzZXQiLCJ0b29sdGlwIiwiZGF0ZXBpY2tlciIsIm9uIiwicmVtb3ZlQ2xhc3MiLCJoaWRlIiwid2luZG93IiwiTW9kZWwiLCJGb3JtIiwiVGVzdCIsImFkZEN1c3RvbVNlYXNvbiIsImNvbnRhaW5lclNlbGVjdG9yIiwiY29udGFpbmVyIiwic2Vhc29uTnVtYmVyIiwic291cmNlIiwiYXV0b2NvbXBsZXRlIiwiaGFzU2Vhc29uIiwibGFiZWxzIiwic3BsaXQiLCJzZWFzb25ZZWFyIiwicG9wIiwiZ2V0RnVsbFllYXIiLCJzdGFydFllYXIiLCJOdW1iZXIiLCJlbmRZZWFyIiwic2Vhc29uTmFtZSIsImpvaW4iLCJ0ZW1wbGF0ZSIsInRlbXBsYXRlcyIsInNlYXNvbkRhdGEiLCJzZWFzb25FbGVtZW50IiwiQ29udGVudCIsImFkZEN1c3RvbUZuIiwiZWwiLCJwbGFjZWhvbGRlciIsIm9mZiIsInZhbCIsImFkZENsYXNzIiwiYXR0ciIsImRhdGEiLCJhZGRDdXN0b21UZW1wbGF0ZSIsImV2ZW50VHlwZSIsImFkZFNwb3J0TGF5ZXIiLCJzcG9ydFNlbGVjdG9yIiwiZXh0cmFTcG9ydHMiLCJodG1sT3V0cHV0IiwicGFyZW50IiwiYWZ0ZXIiLCJsYXN0IiwiZmluZCIsInJlc2V0U2VsZWN0b3IiLCJhZGRHZW5lcmljRXBpc29kZXMiLCJxdWFudGl0eSIsImN1cnJlbnRRdWFudGl0eSIsImNoaWxkcmVuIiwic3RhcnQiLCJlbXB0eSIsInNlbGVjdG9ycyIsImNoZWNrRmlsZVR5cGUiLCJhbGxvd2VkRXh0ZW5zaW9ucyIsInN1Y2Nlc3MiLCJlcnJvciIsImh0bWwiLCJkaWFsb2ciLCJ0YXJnZXRJZCIsImVhY2giLCJzaWJsaW5ncyIsImsiLCJwcm9wIiwiY29udGV4dCIsInNlbGVjdG9yU2hvdyIsImhhc0NsYXNzIiwibmV3UXVhbnRpdHkiLCJsb2NhdGlvbiIsImVudmhvc3R1cmwiLCJtYXNrIiwidHJhbnNsYXRpb24iLCJwYXR0ZXJuIiwicmVjdXJzaXZlIiwic2VsZWN0b3JDb3VudGVyIiwibWFpblBhY2thZ2UiLCJnZXRTZWxlY3RlZEZ1bGxQYWNrYWdlcyIsInYiLCJwYWNrIiwiZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXMiLCJzZWxlY3RlZElkcyIsInNlbGVjdGVkTmFtZXMiLCJnZXRJZEJ5TmFtZSIsImNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMiLCJpcyIsInNlbGVjdGVkUmlnaHQiLCJTZWxlY3RlZFJpZ2h0IiwicmlnaHRJdGVtIiwiZ3JvdXAiLCJlbGVtZW50IiwiaW5wdXRzIiwiY29sbGVjdFNlbGVjdGVkUmlnaHRzIiwic2VsZWN0ZWRSaWdodHMiLCJzZWxlY3RlZFBhY2thZ2VzIiwic2luZ2xlIiwiY29uY2F0IiwidmFsaWRhdGVTYWxlc1BhY2thZ2VzIiwicGFja2FnZUNvbnRhaW5lciIsInNhbGVzUGFja2FnZSIsIlNhbGVzUGFja2FnZSIsInJlcGxhY2UiLCJ0ZXJyaXRvcmllcyIsInNhbGVzTWV0aG9kIiwiY3VycmVuY3kiLCJmZWUiLCJ0ZXJyaXRvcnlCaWRzIiwidGVycml0b3J5QXNQYWNrYWdlIiwic2VsZWN0ZWRUZXJyaXRvcmllcyIsImNob3NlbiIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJ2YWxpZGF0ZVN0ZXBUd28iLCJoYXNFcnJvcnMiLCJtZXNzYWdlcyIsImV4cGlyYXRpb25EYXRlIiwicmlnaHRzIiwibWVzc2FnZXNDb250YWluZXIiLCJ0b3RhbCIsImluc3RhbGxtZW50cyIsImNvbGxlY3RJbnN0YWxsbWVudHMiLCJzYWxlc1BhY2thZ2VzIiwidmFsaWRhdGUiLCJleHBpcmVzQXQiLCJtaW5XaWR0aCIsImFkZFNhbGVzUGFja2FnZSIsImFkZFJlZ2lvbkJlaGF2aW91ciIsInNldHVwSW5zdGFsbG1lbnQiLCJyZXZlcnNlIiwiaW5zdGFsbG1lbnQiLCJwZXJjZW50Iiwic2lnbmluZ19kYXkiLCJncmFudGVkX2RheSIsInN1Ym1pdGZvcm0iLCJ1cmwiLCJzdHJpbmdpZnkiLCJhcHBlbmRUbyIsIm9uYmVmb3JldW5sb2FkIiwic3VibWl0IiwiYWpheCIsImpzb24iLCJwb3MiLCJjbG9uZSIsImFkZE9yZGluYWwiLCJpbnNlcnRBZnRlciIsIm5leHQiLCJjcmVhdGVTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQUE7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDdkNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUN2RUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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O0FBQ0EsVUFBVTtBQUNWLDZCQUE2QjtBQUM3QixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRCQUE0QjtBQUM1QixPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGdDQUFnQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLElBQUk7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdDQUF3QztBQUN4QywrQ0FBK0M7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFD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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7QUNyR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRW1DO0FBQ25DO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7OztBQ2JEO0FBQUEsaURBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdko7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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TyxJQUFyQjtBQUNBL08sY0FBRSxpQkFBRixFQUFxQitPLElBQXJCO0FBQ0EvTyxjQUFFLHVCQUFGLEVBQTJCK08sSUFBM0I7QUFDQTBFLDhCQUFrQixDQUFsQjtBQUdILFNBYkQ7QUFjSCxLQWZEOztBQWlCQTs7Ozs7Ozs7Ozs7O0FBZUF6VCxNQUFFc08sUUFBRixFQUFZTyxFQUFaLENBQWUsT0FBZixFQUF1QixvQkFBdkIsRUFBNkMsWUFBWTtBQUNyRDZIO0FBQ0gsS0FGRDs7QUFJQWxXLGlCQUFhMk8sSUFBYixDQUFrQjBHLGVBQWxCLEdBQW9DQSxlQUFwQztBQUNBclYsaUJBQWEyTyxJQUFiLENBQWtCMkUsdUJBQWxCLEdBQTRDQSx1QkFBNUM7O0FBRUE7OztBQUdBOEM7QUFDQUY7QUFFSCxDQXRsQkQsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUFBOzs7O0FBSUE7QUFDQTtBQUNBOztBQUVBLHlEQUFlLGtFQUFBcUIsQ0FBWSxrRUFBWixDQUFmLEUiLCJmaWxlIjoic2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTUgSmVkIFdhdHNvbi5cbiAgQmFzZWQgb24gY29kZSB0aGF0IGlzIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGNhblVzZURPTSA9ICEhKFxuXHRcdHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG5cdFx0d2luZG93LmRvY3VtZW50ICYmXG5cdFx0d2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcblx0KTtcblxuXHR2YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSB7XG5cblx0XHRjYW5Vc2VET006IGNhblVzZURPTSxcblxuXHRcdGNhblVzZVdvcmtlcnM6IHR5cGVvZiBXb3JrZXIgIT09ICd1bmRlZmluZWQnLFxuXG5cdFx0Y2FuVXNlRXZlbnRMaXN0ZW5lcnM6XG5cdFx0XHRjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuXHRcdGNhblVzZVZpZXdwb3J0OiBjYW5Vc2VET00gJiYgISF3aW5kb3cuc2NyZWVuXG5cblx0fTtcblxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gRXhlY3V0aW9uRW52aXJvbm1lbnQ7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5FeGVjdXRpb25FbnZpcm9ubWVudCA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuXHR9XG5cbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9leGVudi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvZXhlbnYvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNSwgWWFob28hIEluYy5cbiAqIENvcHlyaWdodHMgbGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgTGljZW5zZS4gU2VlIHRoZSBhY2NvbXBhbnlpbmcgTElDRU5TRSBmaWxlIGZvciB0ZXJtcy5cbiAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsLmhvaXN0Tm9uUmVhY3RTdGF0aWNzID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgXG4gICAgdmFyIFJFQUNUX1NUQVRJQ1MgPSB7XG4gICAgICAgIGNoaWxkQ29udGV4dFR5cGVzOiB0cnVlLFxuICAgICAgICBjb250ZXh0VHlwZXM6IHRydWUsXG4gICAgICAgIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICAgICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgICAgIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICAgICAgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzOiB0cnVlLFxuICAgICAgICBtaXhpbnM6IHRydWUsXG4gICAgICAgIHByb3BUeXBlczogdHJ1ZSxcbiAgICAgICAgdHlwZTogdHJ1ZVxuICAgIH07XG4gICAgXG4gICAgdmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgIGxlbmd0aDogdHJ1ZSxcbiAgICAgICAgcHJvdG90eXBlOiB0cnVlLFxuICAgICAgICBjYWxsZXI6IHRydWUsXG4gICAgICAgIGNhbGxlZTogdHJ1ZSxcbiAgICAgICAgYXJndW1lbnRzOiB0cnVlLFxuICAgICAgICBhcml0eTogdHJ1ZVxuICAgIH07XG4gICAgXG4gICAgdmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuICAgIHZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG4gICAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4gICAgdmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICAgdmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICAgIHZhciBvYmplY3RQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZiAmJiBnZXRQcm90b3R5cGVPZihPYmplY3QpO1xuICAgIFxuICAgIHJldHVybiBmdW5jdGlvbiBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIHNvdXJjZUNvbXBvbmVudCwgYmxhY2tsaXN0KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlQ29tcG9uZW50ICE9PSAnc3RyaW5nJykgeyAvLyBkb24ndCBob2lzdCBvdmVyIHN0cmluZyAoaHRtbCkgY29tcG9uZW50c1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAob2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaGVyaXRlZENvbXBvbmVudCA9IGdldFByb3RvdHlwZU9mKHNvdXJjZUNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGluaGVyaXRlZENvbXBvbmVudCAmJiBpbmhlcml0ZWRDb21wb25lbnQgIT09IG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIGluaGVyaXRlZENvbXBvbmVudCwgYmxhY2tsaXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VDb21wb25lbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2VDb21wb25lbnQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFSRUFDVF9TVEFUSUNTW2tleV0gJiYgIUtOT1dOX1NUQVRJQ1Nba2V5XSAmJiAoIWJsYWNrbGlzdCB8fCAhYmxhY2tsaXN0W2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZUNvbXBvbmVudCwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHsgLy8gQXZvaWQgZmFpbHVyZXMgZnJvbSByZWFkLW9ubHkgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0Q29tcG9uZW50LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbiAgICB9O1xufSkpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pbnZhcmlhbnQvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvaW52YXJpYW50L2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IGdldFJhd1RhZyBmcm9tICcuL19nZXRSYXdUYWcuanMnO1xuaW1wb3J0IG9iamVjdFRvU3RyaW5nIGZyb20gJy4vX29iamVjdFRvU3RyaW5nLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXRUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IG92ZXJBcmcgZnJvbSAnLi9fb3ZlckFyZy5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBnZXRQcm90b3R5cGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRQcm90b3R5cGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFJhd1RhZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX29iamVjdFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX29iamVjdFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vdmVyQXJnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJBcmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgYmFzZUdldFRhZyh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmXG4gICAgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQbGFpbk9iamVjdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNQbGFpbk9iamVjdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJyxcbiAgICAgICAgICAgICAgcHJvcEZ1bGxOYW1lLFxuICAgICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJXMgYXQgaW5kZXggJXMuJyxcbiAgICAgICAgICBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlciksXG4gICAgICAgICAgaVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9ICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmXG4gICAgU3ltYm9sLmZvciAmJlxuICAgIFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSkgfHxcbiAgICAweGVhYzc7XG5cbiAgdmFyIGlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICBvYmplY3QgIT09IG51bGwgJiZcbiAgICAgIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuICB9O1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmJvZHlPcGVuQ2xhc3NOYW1lID0gZXhwb3J0cy5wb3J0YWxDbGFzc05hbWUgPSB1bmRlZmluZWQ7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTtcblxudmFyIF9yZWFjdERvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdERvbSk7XG5cbnZhciBfcHJvcFR5cGVzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7XG5cbnZhciBfcHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BUeXBlcyk7XG5cbnZhciBfTW9kYWxQb3J0YWwgPSByZXF1aXJlKFwiLi9Nb2RhbFBvcnRhbFwiKTtcblxudmFyIF9Nb2RhbFBvcnRhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Nb2RhbFBvcnRhbCk7XG5cbnZhciBfYXJpYUFwcEhpZGVyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvYXJpYUFwcEhpZGVyXCIpO1xuXG52YXIgYXJpYUFwcEhpZGVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2FyaWFBcHBIaWRlcik7XG5cbnZhciBfc2FmZUhUTUxFbGVtZW50ID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvc2FmZUhUTUxFbGVtZW50XCIpO1xuXG52YXIgX3NhZmVIVE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zYWZlSFRNTEVsZW1lbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBwb3J0YWxDbGFzc05hbWUgPSBleHBvcnRzLnBvcnRhbENsYXNzTmFtZSA9IFwiUmVhY3RNb2RhbFBvcnRhbFwiO1xudmFyIGJvZHlPcGVuQ2xhc3NOYW1lID0gZXhwb3J0cy5ib2R5T3BlbkNsYXNzTmFtZSA9IFwiUmVhY3RNb2RhbF9fQm9keS0tb3BlblwiO1xuXG52YXIgaXNSZWFjdDE2ID0gX3JlYWN0RG9tMi5kZWZhdWx0LmNyZWF0ZVBvcnRhbCAhPT0gdW5kZWZpbmVkO1xudmFyIGNyZWF0ZVBvcnRhbCA9IGlzUmVhY3QxNiA/IF9yZWFjdERvbTIuZGVmYXVsdC5jcmVhdGVQb3J0YWwgOiBfcmVhY3REb20yLmRlZmF1bHQudW5zdGFibGVfcmVuZGVyU3VidHJlZUludG9Db250YWluZXI7XG5cbmZ1bmN0aW9uIGdldFBhcmVudEVsZW1lbnQocGFyZW50U2VsZWN0b3IpIHtcbiAgcmV0dXJuIHBhcmVudFNlbGVjdG9yKCk7XG59XG5cbnZhciBNb2RhbCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhNb2RhbCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTW9kYWwoKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICB2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1vZGFsKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKF9yZWYgPSBNb2RhbC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1vZGFsKSkuY2FsbC5hcHBseShfcmVmLCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMucmVtb3ZlUG9ydGFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgIWlzUmVhY3QxNiAmJiBfcmVhY3REb20yLmRlZmF1bHQudW5tb3VudENvbXBvbmVudEF0Tm9kZShfdGhpcy5ub2RlKTtcbiAgICAgIHZhciBwYXJlbnQgPSBnZXRQYXJlbnRFbGVtZW50KF90aGlzLnByb3BzLnBhcmVudFNlbGVjdG9yKTtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChfdGhpcy5ub2RlKTtcbiAgICB9LCBfdGhpcy5wb3J0YWxSZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgICBfdGhpcy5wb3J0YWwgPSByZWY7XG4gICAgfSwgX3RoaXMucmVuZGVyUG9ydGFsID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICB2YXIgcG9ydGFsID0gY3JlYXRlUG9ydGFsKF90aGlzLCBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfTW9kYWxQb3J0YWwyLmRlZmF1bHQsIF9leHRlbmRzKHsgZGVmYXVsdFN0eWxlczogTW9kYWwuZGVmYXVsdFN0eWxlcyB9LCBwcm9wcykpLCBfdGhpcy5ub2RlKTtcbiAgICAgIF90aGlzLnBvcnRhbFJlZihwb3J0YWwpO1xuICAgIH0sIF90ZW1wKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE1vZGFsLCBbe1xuICAgIGtleTogXCJjb21wb25lbnREaWRNb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIGlmICghX3NhZmVIVE1MRWxlbWVudC5jYW5Vc2VET00pIHJldHVybjtcblxuICAgICAgaWYgKCFpc1JlYWN0MTYpIHtcbiAgICAgICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLnByb3BzLnBvcnRhbENsYXNzTmFtZTtcblxuICAgICAgdmFyIHBhcmVudCA9IGdldFBhcmVudEVsZW1lbnQodGhpcy5wcm9wcy5wYXJlbnRTZWxlY3Rvcik7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5ub2RlKTtcblxuICAgICAgIWlzUmVhY3QxNiAmJiB0aGlzLnJlbmRlclBvcnRhbCh0aGlzLnByb3BzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICBpZiAoIV9zYWZlSFRNTEVsZW1lbnQuY2FuVXNlRE9NKSByZXR1cm47XG4gICAgICB2YXIgaXNPcGVuID0gbmV3UHJvcHMuaXNPcGVuO1xuICAgICAgLy8gU3RvcCB1bm5lY2Vzc2FyeSByZW5kZXJzIGlmIG1vZGFsIGlzIHJlbWFpbmluZyBjbG9zZWRcblxuICAgICAgaWYgKCF0aGlzLnByb3BzLmlzT3BlbiAmJiAhaXNPcGVuKSByZXR1cm47XG5cbiAgICAgIHZhciBjdXJyZW50UGFyZW50ID0gZ2V0UGFyZW50RWxlbWVudCh0aGlzLnByb3BzLnBhcmVudFNlbGVjdG9yKTtcbiAgICAgIHZhciBuZXdQYXJlbnQgPSBnZXRQYXJlbnRFbGVtZW50KG5ld1Byb3BzLnBhcmVudFNlbGVjdG9yKTtcblxuICAgICAgaWYgKG5ld1BhcmVudCAhPT0gY3VycmVudFBhcmVudCkge1xuICAgICAgICBjdXJyZW50UGFyZW50LnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XG4gICAgICAgIG5ld1BhcmVudC5hcHBlbmRDaGlsZCh0aGlzLm5vZGUpO1xuICAgICAgfVxuXG4gICAgICAhaXNSZWFjdDE2ICYmIHRoaXMucmVuZGVyUG9ydGFsKG5ld1Byb3BzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVXBkYXRlKG5ld1Byb3BzKSB7XG4gICAgICBpZiAoIV9zYWZlSFRNTEVsZW1lbnQuY2FuVXNlRE9NKSByZXR1cm47XG4gICAgICBpZiAobmV3UHJvcHMucG9ydGFsQ2xhc3NOYW1lICE9PSB0aGlzLnByb3BzLnBvcnRhbENsYXNzTmFtZSkge1xuICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gbmV3UHJvcHMucG9ydGFsQ2xhc3NOYW1lO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsVW5tb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICghX3NhZmVIVE1MRWxlbWVudC5jYW5Vc2VET00gfHwgIXRoaXMubm9kZSB8fCAhdGhpcy5wb3J0YWwpIHJldHVybjtcblxuICAgICAgdmFyIHN0YXRlID0gdGhpcy5wb3J0YWwuc3RhdGU7XG4gICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIHZhciBjbG9zZXNBdCA9IHN0YXRlLmlzT3BlbiAmJiB0aGlzLnByb3BzLmNsb3NlVGltZW91dE1TICYmIChzdGF0ZS5jbG9zZXNBdCB8fCBub3cgKyB0aGlzLnByb3BzLmNsb3NlVGltZW91dE1TKTtcblxuICAgICAgaWYgKGNsb3Nlc0F0KSB7XG4gICAgICAgIGlmICghc3RhdGUuYmVmb3JlQ2xvc2UpIHtcbiAgICAgICAgICB0aGlzLnBvcnRhbC5jbG9zZVdpdGhUaW1lb3V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMucmVtb3ZlUG9ydGFsLCBjbG9zZXNBdCAtIG5vdyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZVBvcnRhbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgaWYgKCFfc2FmZUhUTUxFbGVtZW50LmNhblVzZURPTSB8fCAhaXNSZWFjdDE2KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMubm9kZSAmJiBpc1JlYWN0MTYpIHtcbiAgICAgICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNyZWF0ZVBvcnRhbChfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfTW9kYWxQb3J0YWwyLmRlZmF1bHQsIF9leHRlbmRzKHtcbiAgICAgICAgcmVmOiB0aGlzLnBvcnRhbFJlZixcbiAgICAgICAgZGVmYXVsdFN0eWxlczogTW9kYWwuZGVmYXVsdFN0eWxlc1xuICAgICAgfSwgdGhpcy5wcm9wcykpLCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInNldEFwcEVsZW1lbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0QXBwRWxlbWVudChlbGVtZW50KSB7XG4gICAgICBhcmlhQXBwSGlkZXIuc2V0RWxlbWVudChlbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtcHJvcC10eXBlcyAqL1xuXG4gICAgLyogZXNsaW50LWVuYWJsZSByZWFjdC9uby11bnVzZWQtcHJvcC10eXBlcyAqL1xuXG4gIH1dKTtcblxuICByZXR1cm4gTW9kYWw7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5Nb2RhbC5wcm9wVHlwZXMgPSB7XG4gIGlzT3BlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLmlzUmVxdWlyZWQsXG4gIHN0eWxlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnNoYXBlKHtcbiAgICBjb250ZW50OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdCxcbiAgICBvdmVybGF5OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdFxuICB9KSxcbiAgcG9ydGFsQ2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgYm9keU9wZW5DbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBodG1sT3BlbkNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzMi5kZWZhdWx0LnNoYXBlKHtcbiAgICBiYXNlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyT3BlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBiZWZvcmVDbG9zZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcuaXNSZXF1aXJlZFxuICB9KV0pLFxuICBvdmVybGF5Q2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIF9wcm9wVHlwZXMyLmRlZmF1bHQuc2hhcGUoe1xuICAgIGJhc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYWZ0ZXJPcGVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGJlZm9yZUNsb3NlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZy5pc1JlcXVpcmVkXG4gIH0pXSksXG4gIGFwcEVsZW1lbnQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQuaW5zdGFuY2VPZihfc2FmZUhUTUxFbGVtZW50Mi5kZWZhdWx0KSxcbiAgb25BZnRlck9wZW46IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcbiAgb25SZXF1ZXN0Q2xvc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcbiAgY2xvc2VUaW1lb3V0TVM6IF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLFxuICBhcmlhSGlkZUFwcDogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBzaG91bGRGb2N1c0FmdGVyUmVuZGVyOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIHNob3VsZENsb3NlT25PdmVybGF5Q2xpY2s6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgc2hvdWxkUmV0dXJuRm9jdXNBZnRlckNsb3NlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIHBhcmVudFNlbGVjdG9yOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsXG4gIGFyaWE6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICByb2xlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgY29udGVudExhYmVsOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgc2hvdWxkQ2xvc2VPbkVzYzogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBvdmVybGF5UmVmOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsXG4gIGNvbnRlbnRSZWY6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuY1xufTtcbk1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgaXNPcGVuOiBmYWxzZSxcbiAgcG9ydGFsQ2xhc3NOYW1lOiBwb3J0YWxDbGFzc05hbWUsXG4gIGJvZHlPcGVuQ2xhc3NOYW1lOiBib2R5T3BlbkNsYXNzTmFtZSxcbiAgYXJpYUhpZGVBcHA6IHRydWUsXG4gIGNsb3NlVGltZW91dE1TOiAwLFxuICBzaG91bGRGb2N1c0FmdGVyUmVuZGVyOiB0cnVlLFxuICBzaG91bGRDbG9zZU9uRXNjOiB0cnVlLFxuICBzaG91bGRDbG9zZU9uT3ZlcmxheUNsaWNrOiB0cnVlLFxuICBzaG91bGRSZXR1cm5Gb2N1c0FmdGVyQ2xvc2U6IHRydWUsXG4gIHBhcmVudFNlbGVjdG9yOiBmdW5jdGlvbiBwYXJlbnRTZWxlY3RvcigpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgfVxufTtcbk1vZGFsLmRlZmF1bHRTdHlsZXMgPSB7XG4gIG92ZXJsYXk6IHtcbiAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgIHRvcDogMCxcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGJvdHRvbTogMCxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc1KVwiXG4gIH0sXG4gIGNvbnRlbnQ6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIHRvcDogXCI0MHB4XCIsXG4gICAgbGVmdDogXCI0MHB4XCIsXG4gICAgcmlnaHQ6IFwiNDBweFwiLFxuICAgIGJvdHRvbTogXCI0MHB4XCIsXG4gICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXG4gICAgYmFja2dyb3VuZDogXCIjZmZmXCIsXG4gICAgb3ZlcmZsb3c6IFwiYXV0b1wiLFxuICAgIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiBcInRvdWNoXCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxuICAgIG91dGxpbmU6IFwibm9uZVwiLFxuICAgIHBhZGRpbmc6IFwiMjBweFwiXG4gIH1cbn07XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RhbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvY29tcG9uZW50cy9Nb2RhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2NvbXBvbmVudHMvTW9kYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcHJvcFR5cGVzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7XG5cbnZhciBfcHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BUeXBlcyk7XG5cbnZhciBfZm9jdXNNYW5hZ2VyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvZm9jdXNNYW5hZ2VyXCIpO1xuXG52YXIgZm9jdXNNYW5hZ2VyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2ZvY3VzTWFuYWdlcik7XG5cbnZhciBfc2NvcGVUYWIgPSByZXF1aXJlKFwiLi4vaGVscGVycy9zY29wZVRhYlwiKTtcblxudmFyIF9zY29wZVRhYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zY29wZVRhYik7XG5cbnZhciBfYXJpYUFwcEhpZGVyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvYXJpYUFwcEhpZGVyXCIpO1xuXG52YXIgYXJpYUFwcEhpZGVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2FyaWFBcHBIaWRlcik7XG5cbnZhciBfY2xhc3NMaXN0ID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvY2xhc3NMaXN0XCIpO1xuXG52YXIgY2xhc3NMaXN0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2NsYXNzTGlzdCk7XG5cbnZhciBfc2FmZUhUTUxFbGVtZW50ID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvc2FmZUhUTUxFbGVtZW50XCIpO1xuXG52YXIgX3NhZmVIVE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zYWZlSFRNTEVsZW1lbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8vIHNvIHRoYXQgb3VyIENTUyBpcyBzdGF0aWNhbGx5IGFuYWx5emFibGVcbnZhciBDTEFTU19OQU1FUyA9IHtcbiAgb3ZlcmxheTogXCJSZWFjdE1vZGFsX19PdmVybGF5XCIsXG4gIGNvbnRlbnQ6IFwiUmVhY3RNb2RhbF9fQ29udGVudFwiXG59O1xuXG52YXIgVEFCX0tFWSA9IDk7XG52YXIgRVNDX0tFWSA9IDI3O1xuXG52YXIgYXJpYUhpZGRlbkluc3RhbmNlcyA9IDA7XG5cbnZhciBNb2RhbFBvcnRhbCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhNb2RhbFBvcnRhbCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTW9kYWxQb3J0YWwocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kYWxQb3J0YWwpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE1vZGFsUG9ydGFsLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTW9kYWxQb3J0YWwpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfdGhpcy5zZXRGb2N1c0FmdGVyUmVuZGVyID0gZnVuY3Rpb24gKGZvY3VzKSB7XG4gICAgICBfdGhpcy5mb2N1c0FmdGVyUmVuZGVyID0gX3RoaXMucHJvcHMuc2hvdWxkRm9jdXNBZnRlclJlbmRlciAmJiBmb2N1cztcbiAgICB9O1xuXG4gICAgX3RoaXMuc2V0T3ZlcmxheVJlZiA9IGZ1bmN0aW9uIChvdmVybGF5KSB7XG4gICAgICBfdGhpcy5vdmVybGF5ID0gb3ZlcmxheTtcbiAgICAgIF90aGlzLnByb3BzLm92ZXJsYXlSZWYgJiYgX3RoaXMucHJvcHMub3ZlcmxheVJlZihvdmVybGF5KTtcbiAgICB9O1xuXG4gICAgX3RoaXMuc2V0Q29udGVudFJlZiA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICBfdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgIF90aGlzLnByb3BzLmNvbnRlbnRSZWYgJiYgX3RoaXMucHJvcHMuY29udGVudFJlZihjb250ZW50KTtcbiAgICB9O1xuXG4gICAgX3RoaXMuYWZ0ZXJDbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wcyA9IF90aGlzLnByb3BzLFxuICAgICAgICAgIGFwcEVsZW1lbnQgPSBfdGhpcyRwcm9wcy5hcHBFbGVtZW50LFxuICAgICAgICAgIGFyaWFIaWRlQXBwID0gX3RoaXMkcHJvcHMuYXJpYUhpZGVBcHAsXG4gICAgICAgICAgaHRtbE9wZW5DbGFzc05hbWUgPSBfdGhpcyRwcm9wcy5odG1sT3BlbkNsYXNzTmFtZSxcbiAgICAgICAgICBib2R5T3BlbkNsYXNzTmFtZSA9IF90aGlzJHByb3BzLmJvZHlPcGVuQ2xhc3NOYW1lO1xuXG4gICAgICAvLyBSZW1vdmUgY2xhc3Nlcy5cblxuICAgICAgY2xhc3NMaXN0LnJlbW92ZShkb2N1bWVudC5ib2R5LCBib2R5T3BlbkNsYXNzTmFtZSk7XG5cbiAgICAgIGh0bWxPcGVuQ2xhc3NOYW1lICYmIGNsYXNzTGlzdC5yZW1vdmUoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJodG1sXCIpWzBdLCBodG1sT3BlbkNsYXNzTmFtZSk7XG5cbiAgICAgIC8vIFJlc2V0IGFyaWEtaGlkZGVuIGF0dHJpYnV0ZSBpZiBhbGwgbW9kYWxzIGhhdmUgYmVlbiByZW1vdmVkXG4gICAgICBpZiAoYXJpYUhpZGVBcHAgJiYgYXJpYUhpZGRlbkluc3RhbmNlcyA+IDApIHtcbiAgICAgICAgYXJpYUhpZGRlbkluc3RhbmNlcyAtPSAxO1xuXG4gICAgICAgIGlmIChhcmlhSGlkZGVuSW5zdGFuY2VzID09PSAwKSB7XG4gICAgICAgICAgYXJpYUFwcEhpZGVyLnNob3coYXBwRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLnByb3BzLnNob3VsZEZvY3VzQWZ0ZXJSZW5kZXIpIHtcbiAgICAgICAgaWYgKF90aGlzLnByb3BzLnNob3VsZFJldHVybkZvY3VzQWZ0ZXJDbG9zZSkge1xuICAgICAgICAgIGZvY3VzTWFuYWdlci5yZXR1cm5Gb2N1cygpO1xuICAgICAgICAgIGZvY3VzTWFuYWdlci50ZWFyZG93blNjb3BlZEZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9jdXNNYW5hZ2VyLnBvcFdpdGhvdXRGb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iZWZvcmVPcGVuKCk7XG4gICAgICBpZiAoX3RoaXMuc3RhdGUuYWZ0ZXJPcGVuICYmIF90aGlzLnN0YXRlLmJlZm9yZUNsb3NlKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChfdGhpcy5jbG9zZVRpbWVyKTtcbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBiZWZvcmVDbG9zZTogZmFsc2UgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoX3RoaXMucHJvcHMuc2hvdWxkRm9jdXNBZnRlclJlbmRlcikge1xuICAgICAgICAgIGZvY3VzTWFuYWdlci5zZXR1cFNjb3BlZEZvY3VzKF90aGlzLm5vZGUpO1xuICAgICAgICAgIGZvY3VzTWFuYWdlci5tYXJrRm9yRm9jdXNMYXRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBpc09wZW46IHRydWUgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgYWZ0ZXJPcGVuOiB0cnVlIH0pO1xuXG4gICAgICAgICAgaWYgKF90aGlzLnByb3BzLmlzT3BlbiAmJiBfdGhpcy5wcm9wcy5vbkFmdGVyT3Blbikge1xuICAgICAgICAgICAgX3RoaXMucHJvcHMub25BZnRlck9wZW4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChfdGhpcy5wcm9wcy5jbG9zZVRpbWVvdXRNUyA+IDApIHtcbiAgICAgICAgX3RoaXMuY2xvc2VXaXRoVGltZW91dCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMuY2xvc2VXaXRob3V0VGltZW91dCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5mb2N1c0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMuY29udGVudCAmJiAhX3RoaXMuY29udGVudEhhc0ZvY3VzKCkgJiYgX3RoaXMuY29udGVudC5mb2N1cygpO1xuICAgIH07XG5cbiAgICBfdGhpcy5jbG9zZVdpdGhUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNsb3Nlc0F0ID0gRGF0ZS5ub3coKSArIF90aGlzLnByb3BzLmNsb3NlVGltZW91dE1TO1xuICAgICAgX3RoaXMuc2V0U3RhdGUoeyBiZWZvcmVDbG9zZTogdHJ1ZSwgY2xvc2VzQXQ6IGNsb3Nlc0F0IH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuY2xvc2VUaW1lciA9IHNldFRpbWVvdXQoX3RoaXMuY2xvc2VXaXRob3V0VGltZW91dCwgX3RoaXMuc3RhdGUuY2xvc2VzQXQgLSBEYXRlLm5vdygpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfdGhpcy5jbG9zZVdpdGhvdXRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICBiZWZvcmVDbG9zZTogZmFsc2UsXG4gICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgICAgIGFmdGVyT3BlbjogZmFsc2UsXG4gICAgICAgIGNsb3Nlc0F0OiBudWxsXG4gICAgICB9LCBfdGhpcy5hZnRlckNsb3NlKTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IFRBQl9LRVkpIHtcbiAgICAgICAgKDAsIF9zY29wZVRhYjIuZGVmYXVsdCkoX3RoaXMuY29udGVudCwgZXZlbnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPbkVzYyAmJiBldmVudC5rZXlDb2RlID09PSBFU0NfS0VZKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBfdGhpcy5yZXF1ZXN0Q2xvc2UoZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVPdmVybGF5T25DbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKF90aGlzLnNob3VsZENsb3NlID09PSBudWxsKSB7XG4gICAgICAgIF90aGlzLnNob3VsZENsb3NlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLnNob3VsZENsb3NlICYmIF90aGlzLnByb3BzLnNob3VsZENsb3NlT25PdmVybGF5Q2xpY2spIHtcbiAgICAgICAgaWYgKF90aGlzLm93bmVySGFuZGxlc0Nsb3NlKCkpIHtcbiAgICAgICAgICBfdGhpcy5yZXF1ZXN0Q2xvc2UoZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmZvY3VzQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBfdGhpcy5zaG91bGRDbG9zZSA9IG51bGw7XG4gICAgICBfdGhpcy5tb3ZlRnJvbUNvbnRlbnRUb092ZXJsYXkgPSBudWxsO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVPdmVybGF5T25Nb3VzZVVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKF90aGlzLm1vdmVGcm9tQ29udGVudFRvT3ZlcmxheSA9PT0gbnVsbCkge1xuICAgICAgICBfdGhpcy5zaG91bGRDbG9zZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKF90aGlzLnByb3BzLnNob3VsZENsb3NlT25PdmVybGF5Q2xpY2spIHtcbiAgICAgICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVDb250ZW50T25Nb3VzZVVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlT3ZlcmxheU9uTW91c2VEb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoIV90aGlzLnByb3BzLnNob3VsZENsb3NlT25PdmVybGF5Q2xpY2sgJiYgZXZlbnQudGFyZ2V0ID09IF90aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIF90aGlzLm1vdmVGcm9tQ29udGVudFRvT3ZlcmxheSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVDb250ZW50T25DbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnNob3VsZENsb3NlID0gZmFsc2U7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUNvbnRlbnRPbk1vdXNlRG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnNob3VsZENsb3NlID0gZmFsc2U7XG4gICAgICBfdGhpcy5tb3ZlRnJvbUNvbnRlbnRUb092ZXJsYXkgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgX3RoaXMucmVxdWVzdENsb3NlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gX3RoaXMub3duZXJIYW5kbGVzQ2xvc2UoKSAmJiBfdGhpcy5wcm9wcy5vblJlcXVlc3RDbG9zZShldmVudCk7XG4gICAgfTtcblxuICAgIF90aGlzLm93bmVySGFuZGxlc0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnByb3BzLm9uUmVxdWVzdENsb3NlO1xuICAgIH07XG5cbiAgICBfdGhpcy5zaG91bGRCZUNsb3NlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAhX3RoaXMuc3RhdGUuaXNPcGVuICYmICFfdGhpcy5zdGF0ZS5iZWZvcmVDbG9zZTtcbiAgICB9O1xuXG4gICAgX3RoaXMuY29udGVudEhhc0ZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IF90aGlzLmNvbnRlbnQgfHwgX3RoaXMuY29udGVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbiAgICB9O1xuXG4gICAgX3RoaXMuYnVpbGRDbGFzc05hbWUgPSBmdW5jdGlvbiAod2hpY2gsIGFkZGl0aW9uYWwpIHtcbiAgICAgIHZhciBjbGFzc05hbWVzID0gKHR5cGVvZiBhZGRpdGlvbmFsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoYWRkaXRpb25hbCkpID09PSBcIm9iamVjdFwiID8gYWRkaXRpb25hbCA6IHtcbiAgICAgICAgYmFzZTogQ0xBU1NfTkFNRVNbd2hpY2hdLFxuICAgICAgICBhZnRlck9wZW46IENMQVNTX05BTUVTW3doaWNoXSArIFwiLS1hZnRlci1vcGVuXCIsXG4gICAgICAgIGJlZm9yZUNsb3NlOiBDTEFTU19OQU1FU1t3aGljaF0gKyBcIi0tYmVmb3JlLWNsb3NlXCJcbiAgICAgIH07XG4gICAgICB2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcy5iYXNlO1xuICAgICAgaWYgKF90aGlzLnN0YXRlLmFmdGVyT3Blbikge1xuICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUgKyBcIiBcIiArIGNsYXNzTmFtZXMuYWZ0ZXJPcGVuO1xuICAgICAgfVxuICAgICAgaWYgKF90aGlzLnN0YXRlLmJlZm9yZUNsb3NlKSB7XG4gICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZSArIFwiIFwiICsgY2xhc3NOYW1lcy5iZWZvcmVDbG9zZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlb2YgYWRkaXRpb25hbCA9PT0gXCJzdHJpbmdcIiAmJiBhZGRpdGlvbmFsID8gY2xhc3NOYW1lICsgXCIgXCIgKyBhZGRpdGlvbmFsIDogY2xhc3NOYW1lO1xuICAgIH07XG5cbiAgICBfdGhpcy5hcmlhQXR0cmlidXRlcyA9IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGl0ZW1zKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgbmFtZSkge1xuICAgICAgICBhY2NbXCJhcmlhLVwiICsgbmFtZV0gPSBpdGVtc1tuYW1lXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcbiAgICB9O1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBhZnRlck9wZW46IGZhbHNlLFxuICAgICAgYmVmb3JlQ2xvc2U6IGZhbHNlXG4gICAgfTtcblxuICAgIF90aGlzLnNob3VsZENsb3NlID0gbnVsbDtcbiAgICBfdGhpcy5tb3ZlRnJvbUNvbnRlbnRUb092ZXJsYXkgPSBudWxsO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhNb2RhbFBvcnRhbCwgW3tcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkTW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAvLyBGb2N1cyBuZWVkcyB0byBiZSBzZXQgd2hlbiBtb3VudGluZyBhbmQgYWxyZWFkeSBvcGVuXG4gICAgICBpZiAodGhpcy5wcm9wcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5zZXRGb2N1c0FmdGVyUmVuZGVyKHRydWUpO1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGlmIChuZXdQcm9wcy5ib2R5T3BlbkNsYXNzTmFtZSAhPT0gdGhpcy5wcm9wcy5ib2R5T3BlbkNsYXNzTmFtZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS53YXJuKCdSZWFjdC1Nb2RhbDogXCJib2R5T3BlbkNsYXNzTmFtZVwiIHByb3AgaGFzIGJlZW4gbW9kaWZpZWQuICcgKyBcIlRoaXMgbWF5IGNhdXNlIHVuZXhwZWN0ZWQgYmVoYXZpb3Igd2hlbiBtdWx0aXBsZSBtb2RhbHMgYXJlIG9wZW4uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdQcm9wcy5odG1sT3BlbkNsYXNzTmFtZSAhPT0gdGhpcy5wcm9wcy5odG1sT3BlbkNsYXNzTmFtZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS53YXJuKCdSZWFjdC1Nb2RhbDogXCJodG1sT3BlbkNsYXNzTmFtZVwiIHByb3AgaGFzIGJlZW4gbW9kaWZpZWQuICcgKyBcIlRoaXMgbWF5IGNhdXNlIHVuZXhwZWN0ZWQgYmVoYXZpb3Igd2hlbiBtdWx0aXBsZSBtb2RhbHMgYXJlIG9wZW4uXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBGb2N1cyBvbmx5IG5lZWRzIHRvIGJlIHNldCBvbmNlIHdoZW4gdGhlIG1vZGFsIGlzIGJlaW5nIG9wZW5lZFxuICAgICAgaWYgKCF0aGlzLnByb3BzLmlzT3BlbiAmJiBuZXdQcm9wcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5zZXRGb2N1c0FmdGVyUmVuZGVyKHRydWUpO1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5pc09wZW4gJiYgIW5ld1Byb3BzLmlzT3Blbikge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbXBvbmVudERpZFVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICBpZiAodGhpcy5mb2N1c0FmdGVyUmVuZGVyKSB7XG4gICAgICAgIHRoaXMuZm9jdXNDb250ZW50KCk7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXNBZnRlclJlbmRlcihmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbXBvbmVudFdpbGxVbm1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy5hZnRlckNsb3NlKCk7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5jbG9zZVRpbWVyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYmVmb3JlT3BlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiZWZvcmVPcGVuKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgYXBwRWxlbWVudCA9IF9wcm9wcy5hcHBFbGVtZW50LFxuICAgICAgICAgIGFyaWFIaWRlQXBwID0gX3Byb3BzLmFyaWFIaWRlQXBwLFxuICAgICAgICAgIGh0bWxPcGVuQ2xhc3NOYW1lID0gX3Byb3BzLmh0bWxPcGVuQ2xhc3NOYW1lLFxuICAgICAgICAgIGJvZHlPcGVuQ2xhc3NOYW1lID0gX3Byb3BzLmJvZHlPcGVuQ2xhc3NOYW1lO1xuXG4gICAgICAvLyBBZGQgY2xhc3Nlcy5cblxuICAgICAgY2xhc3NMaXN0LmFkZChkb2N1bWVudC5ib2R5LCBib2R5T3BlbkNsYXNzTmFtZSk7XG5cbiAgICAgIGh0bWxPcGVuQ2xhc3NOYW1lICYmIGNsYXNzTGlzdC5hZGQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJodG1sXCIpWzBdLCBodG1sT3BlbkNsYXNzTmFtZSk7XG5cbiAgICAgIGlmIChhcmlhSGlkZUFwcCkge1xuICAgICAgICBhcmlhSGlkZGVuSW5zdGFuY2VzICs9IDE7XG4gICAgICAgIGFyaWFBcHBIaWRlci5oaWRlKGFwcEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERvbid0IHN0ZWFsIGZvY3VzIGZyb20gaW5uZXIgZWxlbWVudHNcblxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY2xhc3NOYW1lID0gX3Byb3BzMi5jbGFzc05hbWUsXG4gICAgICAgICAgb3ZlcmxheUNsYXNzTmFtZSA9IF9wcm9wczIub3ZlcmxheUNsYXNzTmFtZSxcbiAgICAgICAgICBkZWZhdWx0U3R5bGVzID0gX3Byb3BzMi5kZWZhdWx0U3R5bGVzO1xuXG4gICAgICB2YXIgY29udGVudFN0eWxlcyA9IGNsYXNzTmFtZSA/IHt9IDogZGVmYXVsdFN0eWxlcy5jb250ZW50O1xuICAgICAgdmFyIG92ZXJsYXlTdHlsZXMgPSBvdmVybGF5Q2xhc3NOYW1lID8ge30gOiBkZWZhdWx0U3R5bGVzLm92ZXJsYXk7XG5cbiAgICAgIHJldHVybiB0aGlzLnNob3VsZEJlQ2xvc2VkKCkgPyBudWxsIDogX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6IHRoaXMuc2V0T3ZlcmxheVJlZixcbiAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuYnVpbGRDbGFzc05hbWUoXCJvdmVybGF5XCIsIG92ZXJsYXlDbGFzc05hbWUpLFxuICAgICAgICAgIHN0eWxlOiBfZXh0ZW5kcyh7fSwgb3ZlcmxheVN0eWxlcywgdGhpcy5wcm9wcy5zdHlsZS5vdmVybGF5KSxcbiAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZU92ZXJsYXlPbkNsaWNrLFxuICAgICAgICAgIG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZU92ZXJsYXlPbk1vdXNlRG93bixcbiAgICAgICAgICBvbk1vdXNlVXA6IHRoaXMuaGFuZGxlT3ZlcmxheU9uTW91c2VVcCxcbiAgICAgICAgICBcImFyaWEtbW9kYWxcIjogXCJ0cnVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICBfZXh0ZW5kcyh7XG4gICAgICAgICAgICByZWY6IHRoaXMuc2V0Q29udGVudFJlZixcbiAgICAgICAgICAgIHN0eWxlOiBfZXh0ZW5kcyh7fSwgY29udGVudFN0eWxlcywgdGhpcy5wcm9wcy5zdHlsZS5jb250ZW50KSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5idWlsZENsYXNzTmFtZShcImNvbnRlbnRcIiwgY2xhc3NOYW1lKSxcbiAgICAgICAgICAgIHRhYkluZGV4OiBcIi0xXCIsXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bixcbiAgICAgICAgICAgIG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZUNvbnRlbnRPbk1vdXNlRG93bixcbiAgICAgICAgICAgIG9uTW91c2VVcDogdGhpcy5oYW5kbGVDb250ZW50T25Nb3VzZVVwLFxuICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDb250ZW50T25DbGljayxcbiAgICAgICAgICAgIHJvbGU6IHRoaXMucHJvcHMucm9sZSxcbiAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiB0aGlzLnByb3BzLmNvbnRlbnRMYWJlbFxuICAgICAgICAgIH0sIHRoaXMuYXJpYUF0dHJpYnV0ZXModGhpcy5wcm9wcy5hcmlhIHx8IHt9KSksXG4gICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBNb2RhbFBvcnRhbDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbk1vZGFsUG9ydGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgc3R5bGU6IHtcbiAgICBvdmVybGF5OiB7fSxcbiAgICBjb250ZW50OiB7fVxuICB9XG59O1xuTW9kYWxQb3J0YWwucHJvcFR5cGVzID0ge1xuICBpc09wZW46IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbC5pc1JlcXVpcmVkLFxuICBkZWZhdWx0U3R5bGVzOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnNoYXBlKHtcbiAgICBjb250ZW50OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdCxcbiAgICBvdmVybGF5OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdFxuICB9KSxcbiAgc3R5bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc2hhcGUoe1xuICAgIGNvbnRlbnQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICAgIG92ZXJsYXk6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0XG4gIH0pLFxuICBjbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3RdKSxcbiAgb3ZlcmxheUNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdF0pLFxuICBib2R5T3BlbkNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGh0bWxPcGVuQ2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgYXJpYUhpZGVBcHA6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgYXBwRWxlbWVudDogX3Byb3BUeXBlczIuZGVmYXVsdC5pbnN0YW5jZU9mKF9zYWZlSFRNTEVsZW1lbnQyLmRlZmF1bHQpLFxuICBvbkFmdGVyT3BlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuICBvblJlcXVlc3RDbG9zZTogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuICBjbG9zZVRpbWVvdXRNUzogX3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXIsXG4gIHNob3VsZEZvY3VzQWZ0ZXJSZW5kZXI6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgc2hvdWxkQ2xvc2VPbk92ZXJsYXlDbGljazogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBzaG91bGRSZXR1cm5Gb2N1c0FmdGVyQ2xvc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgcm9sZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGNvbnRlbnRMYWJlbDogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGFyaWE6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICBjaGlsZHJlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5ub2RlLFxuICBzaG91bGRDbG9zZU9uRXNjOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIG92ZXJsYXlSZWY6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcbiAgY29udGVudFJlZjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gTW9kYWxQb3J0YWw7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9jb21wb25lbnRzL01vZGFsUG9ydGFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvY29tcG9uZW50cy9Nb2RhbFBvcnRhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYXNzZXJ0Tm9kZUxpc3QgPSBhc3NlcnROb2RlTGlzdDtcbmV4cG9ydHMuc2V0RWxlbWVudCA9IHNldEVsZW1lbnQ7XG5leHBvcnRzLnZhbGlkYXRlRWxlbWVudCA9IHZhbGlkYXRlRWxlbWVudDtcbmV4cG9ydHMuaGlkZSA9IGhpZGU7XG5leHBvcnRzLnNob3cgPSBzaG93O1xuZXhwb3J0cy5kb2N1bWVudE5vdFJlYWR5T3JTU1JUZXN0aW5nID0gZG9jdW1lbnROb3RSZWFkeU9yU1NSVGVzdGluZztcbmV4cG9ydHMucmVzZXRGb3JUZXN0aW5nID0gcmVzZXRGb3JUZXN0aW5nO1xuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKFwid2FybmluZ1wiKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZ2xvYmFsRWxlbWVudCA9IG51bGw7XG5cbmZ1bmN0aW9uIGFzc2VydE5vZGVMaXN0KG5vZGVMaXN0LCBzZWxlY3Rvcikge1xuICBpZiAoIW5vZGVMaXN0IHx8ICFub2RlTGlzdC5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZWFjdC1tb2RhbDogTm8gZWxlbWVudHMgd2VyZSBmb3VuZCBmb3Igc2VsZWN0b3IgXCIgKyBzZWxlY3RvciArIFwiLlwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRFbGVtZW50KGVsZW1lbnQpIHtcbiAgdmFyIHVzZUVsZW1lbnQgPSBlbGVtZW50O1xuICBpZiAodHlwZW9mIHVzZUVsZW1lbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHVzZUVsZW1lbnQpO1xuICAgIGFzc2VydE5vZGVMaXN0KGVsLCB1c2VFbGVtZW50KTtcbiAgICB1c2VFbGVtZW50ID0gXCJsZW5ndGhcIiBpbiBlbCA/IGVsWzBdIDogZWw7XG4gIH1cbiAgZ2xvYmFsRWxlbWVudCA9IHVzZUVsZW1lbnQgfHwgZ2xvYmFsRWxlbWVudDtcbiAgcmV0dXJuIGdsb2JhbEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRWxlbWVudChhcHBFbGVtZW50KSB7XG4gIGlmICghYXBwRWxlbWVudCAmJiAhZ2xvYmFsRWxlbWVudCkge1xuICAgICgwLCBfd2FybmluZzIuZGVmYXVsdCkoZmFsc2UsIFtcInJlYWN0LW1vZGFsOiBBcHAgZWxlbWVudCBpcyBub3QgZGVmaW5lZC5cIiwgXCJQbGVhc2UgdXNlIGBNb2RhbC5zZXRBcHBFbGVtZW50KGVsKWAgb3Igc2V0IGBhcHBFbGVtZW50PXtlbH1gLlwiLCBcIlRoaXMgaXMgbmVlZGVkIHNvIHNjcmVlbiByZWFkZXJzIGRvbid0IHNlZSBtYWluIGNvbnRlbnRcIiwgXCJ3aGVuIG1vZGFsIGlzIG9wZW5lZC4gSXQgaXMgbm90IHJlY29tbWVuZGVkLCBidXQgeW91IGNhbiBvcHQtb3V0XCIsIFwiYnkgc2V0dGluZyBgYXJpYUhpZGVBcHA9e2ZhbHNlfWAuXCJdLmpvaW4oXCIgXCIpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBoaWRlKGFwcEVsZW1lbnQpIHtcbiAgaWYgKHZhbGlkYXRlRWxlbWVudChhcHBFbGVtZW50KSkge1xuICAgIChhcHBFbGVtZW50IHx8IGdsb2JhbEVsZW1lbnQpLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93KGFwcEVsZW1lbnQpIHtcbiAgaWYgKHZhbGlkYXRlRWxlbWVudChhcHBFbGVtZW50KSkge1xuICAgIChhcHBFbGVtZW50IHx8IGdsb2JhbEVsZW1lbnQpLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRvY3VtZW50Tm90UmVhZHlPclNTUlRlc3RpbmcoKSB7XG4gIGdsb2JhbEVsZW1lbnQgPSBudWxsO1xufVxuXG5mdW5jdGlvbiByZXNldEZvclRlc3RpbmcoKSB7XG4gIGdsb2JhbEVsZW1lbnQgPSBudWxsO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2FyaWFBcHBIaWRlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvYXJpYUFwcEhpZGVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kdW1wQ2xhc3NMaXN0cyA9IGR1bXBDbGFzc0xpc3RzO1xudmFyIGh0bWxDbGFzc0xpc3QgPSB7fTtcbnZhciBkb2NCb2R5Q2xhc3NMaXN0ID0ge307XG5cbmZ1bmN0aW9uIGR1bXBDbGFzc0xpc3RzKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgdmFyIGNsYXNzZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImh0bWxcIilbMF0uY2xhc3NOYW1lO1xuICAgIHZhciBidWZmZXIgPSBcIlNob3cgdHJhY2tlZCBjbGFzc2VzOlxcblxcblwiO1xuXG4gICAgYnVmZmVyICs9IFwiPGh0bWwgLz4gKFwiICsgY2xhc3NlcyArIFwiKTpcXG5cIjtcbiAgICBmb3IgKHZhciB4IGluIGh0bWxDbGFzc0xpc3QpIHtcbiAgICAgIGJ1ZmZlciArPSBcIiAgXCIgKyB4ICsgXCIgXCIgKyBodG1sQ2xhc3NMaXN0W3hdICsgXCJcXG5cIjtcbiAgICB9XG5cbiAgICBjbGFzc2VzID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWU7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIGJ1ZmZlciArPSBcIlxcblxcbmRvYy5ib2R5IChcIiArIGNsYXNzZXMgKyBcIik6XFxuXCI7XG4gICAgZm9yICh2YXIgX3ggaW4gZG9jQm9keUNsYXNzTGlzdCkge1xuICAgICAgYnVmZmVyICs9IFwiICBcIiArIF94ICsgXCIgXCIgKyBkb2NCb2R5Q2xhc3NMaXN0W194XSArIFwiXFxuXCI7XG4gICAgfVxuXG4gICAgYnVmZmVyICs9IFwiXFxuXCI7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGJ1ZmZlcik7XG4gIH1cbn1cblxuLyoqXG4gKiBUcmFjayB0aGUgbnVtYmVyIG9mIHJlZmVyZW5jZSBvZiBhIGNsYXNzLlxuICogQHBhcmFtIHtvYmplY3R9IHBvbGwgVGhlIHBvbGwgdG8gcmVjZWl2ZSB0aGUgcmVmZXJlbmNlLlxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSBUaGUgY2xhc3MgbmFtZS5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xudmFyIGluY3JlbWVudFJlZmVyZW5jZSA9IGZ1bmN0aW9uIGluY3JlbWVudFJlZmVyZW5jZShwb2xsLCBjbGFzc05hbWUpIHtcbiAgaWYgKCFwb2xsW2NsYXNzTmFtZV0pIHtcbiAgICBwb2xsW2NsYXNzTmFtZV0gPSAwO1xuICB9XG4gIHBvbGxbY2xhc3NOYW1lXSArPSAxO1xuICByZXR1cm4gY2xhc3NOYW1lO1xufTtcblxuLyoqXG4gKiBEcm9wIHRoZSByZWZlcmVuY2Ugb2YgYSBjbGFzcy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBwb2xsIFRoZSBwb2xsIHRvIHJlY2VpdmUgdGhlIHJlZmVyZW5jZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgVGhlIGNsYXNzIG5hbWUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnZhciBkZWNyZW1lbnRSZWZlcmVuY2UgPSBmdW5jdGlvbiBkZWNyZW1lbnRSZWZlcmVuY2UocG9sbCwgY2xhc3NOYW1lKSB7XG4gIGlmIChwb2xsW2NsYXNzTmFtZV0pIHtcbiAgICBwb2xsW2NsYXNzTmFtZV0gLT0gMTtcbiAgfVxuICByZXR1cm4gY2xhc3NOYW1lO1xufTtcblxuLyoqXG4gKiBUcmFjayBhIGNsYXNzIGFuZCBhZGQgdG8gdGhlIGdpdmVuIGNsYXNzIGxpc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gY2xhc3NMaXN0UmVmIEEgY2xhc3MgbGlzdCBvZiBhbiBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IHBvbGwgICAgICAgICBUaGUgcG9sbCB0byBiZSB1c2VkLlxuICogQHBhcmFtIHtBcnJheX0gIGNsYXNzZXMgICAgICBUaGUgbGlzdCBvZiBjbGFzc2VzIHRvIGJlIHRyYWNrZWQuXG4gKi9cbnZhciB0cmFja0NsYXNzID0gZnVuY3Rpb24gdHJhY2tDbGFzcyhjbGFzc0xpc3RSZWYsIHBvbGwsIGNsYXNzZXMpIHtcbiAgY2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICBpbmNyZW1lbnRSZWZlcmVuY2UocG9sbCwgY2xhc3NOYW1lKTtcbiAgICBjbGFzc0xpc3RSZWYuYWRkKGNsYXNzTmFtZSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBVbnRyYWNrIGEgY2xhc3MgYW5kIHJlbW92ZSBmcm9tIHRoZSBnaXZlbiBjbGFzcyBsaXN0IGlmIHRoZSByZWZlcmVuY2VcbiAqIHJlYWNoZXMgMC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjbGFzc0xpc3RSZWYgQSBjbGFzcyBsaXN0IG9mIGFuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gcG9sbCAgICAgICAgIFRoZSBwb2xsIHRvIGJlIHVzZWQuXG4gKiBAcGFyYW0ge0FycmF5fSAgY2xhc3NlcyAgICAgIFRoZSBsaXN0IG9mIGNsYXNzZXMgdG8gYmUgdW50cmFja2VkLlxuICovXG52YXIgdW50cmFja0NsYXNzID0gZnVuY3Rpb24gdW50cmFja0NsYXNzKGNsYXNzTGlzdFJlZiwgcG9sbCwgY2xhc3Nlcykge1xuICBjbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgIGRlY3JlbWVudFJlZmVyZW5jZShwb2xsLCBjbGFzc05hbWUpO1xuICAgIHBvbGxbY2xhc3NOYW1lXSA9PT0gMCAmJiBjbGFzc0xpc3RSZWYucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBQdWJsaWMgaW5mZXJmYWNlIHRvIGFkZCBjbGFzc2VzIHRvIHRoZSBkb2N1bWVudC5ib2R5LlxuICogQHBhcmFtIHtzdHJpbmd9IGJvZHlDbGFzcyBUaGUgY2xhc3Mgc3RyaW5nIHRvIGJlIGFkZGVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBJdCBtYXkgY29udGFpbiBtb3JlIHRoZW4gb25lIGNsYXNzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggJyAnIGFzIHNlcGFyYXRvci5cbiAqL1xudmFyIGFkZCA9IGV4cG9ydHMuYWRkID0gZnVuY3Rpb24gYWRkKGVsZW1lbnQsIGNsYXNzU3RyaW5nKSB7XG4gIHJldHVybiB0cmFja0NsYXNzKGVsZW1lbnQuY2xhc3NMaXN0LCBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT0gXCJodG1sXCIgPyBodG1sQ2xhc3NMaXN0IDogZG9jQm9keUNsYXNzTGlzdCwgY2xhc3NTdHJpbmcuc3BsaXQoXCIgXCIpKTtcbn07XG5cbi8qKlxuICogUHVibGljIGluZmVyZmFjZSB0byByZW1vdmUgY2xhc3NlcyBmcm9tIHRoZSBkb2N1bWVudC5ib2R5LlxuICogQHBhcmFtIHtzdHJpbmd9IGJvZHlDbGFzcyBUaGUgY2xhc3Mgc3RyaW5nIHRvIGJlIGFkZGVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBJdCBtYXkgY29udGFpbiBtb3JlIHRoZW4gb25lIGNsYXNzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggJyAnIGFzIHNlcGFyYXRvci5cbiAqL1xudmFyIHJlbW92ZSA9IGV4cG9ydHMucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQsIGNsYXNzU3RyaW5nKSB7XG4gIHJldHVybiB1bnRyYWNrQ2xhc3MoZWxlbWVudC5jbGFzc0xpc3QsIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PSBcImh0bWxcIiA/IGh0bWxDbGFzc0xpc3QgOiBkb2NCb2R5Q2xhc3NMaXN0LCBjbGFzc1N0cmluZy5zcGxpdChcIiBcIikpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9jbGFzc0xpc3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2NsYXNzTGlzdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuaGFuZGxlQmx1ciA9IGhhbmRsZUJsdXI7XG5leHBvcnRzLmhhbmRsZUZvY3VzID0gaGFuZGxlRm9jdXM7XG5leHBvcnRzLm1hcmtGb3JGb2N1c0xhdGVyID0gbWFya0ZvckZvY3VzTGF0ZXI7XG5leHBvcnRzLnJldHVybkZvY3VzID0gcmV0dXJuRm9jdXM7XG5leHBvcnRzLnBvcFdpdGhvdXRGb2N1cyA9IHBvcFdpdGhvdXRGb2N1cztcbmV4cG9ydHMuc2V0dXBTY29wZWRGb2N1cyA9IHNldHVwU2NvcGVkRm9jdXM7XG5leHBvcnRzLnRlYXJkb3duU2NvcGVkRm9jdXMgPSB0ZWFyZG93blNjb3BlZEZvY3VzO1xuXG52YXIgX3RhYmJhYmxlID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdGFiYmFibGVcIik7XG5cbnZhciBfdGFiYmFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGFiYmFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZm9jdXNMYXRlckVsZW1lbnRzID0gW107XG52YXIgbW9kYWxFbGVtZW50ID0gbnVsbDtcbnZhciBuZWVkVG9Gb2N1cyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBoYW5kbGVCbHVyKCkge1xuICBuZWVkVG9Gb2N1cyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUZvY3VzKCkge1xuICBpZiAobmVlZFRvRm9jdXMpIHtcbiAgICBuZWVkVG9Gb2N1cyA9IGZhbHNlO1xuICAgIGlmICghbW9kYWxFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIG5lZWQgdG8gc2VlIGhvdyBqUXVlcnkgc2hpbXMgZG9jdW1lbnQub24oJ2ZvY3VzaW4nKSBzbyB3ZSBkb24ndCBuZWVkIHRoZVxuICAgIC8vIHNldFRpbWVvdXQsIGZpcmVmb3ggZG9lc24ndCBzdXBwb3J0IGZvY3VzaW4sIGlmIGl0IGRpZCwgd2UgY291bGQgZm9jdXNcbiAgICAvLyB0aGUgZWxlbWVudCBvdXRzaWRlIG9mIGEgc2V0VGltZW91dC4gU2lkZS1lZmZlY3Qgb2YgdGhpcyBpbXBsZW1lbnRhdGlvblxuICAgIC8vIGlzIHRoYXQgdGhlIGRvY3VtZW50LmJvZHkgZ2V0cyBmb2N1cywgYW5kIHRoZW4gd2UgZm9jdXMgb3VyIGVsZW1lbnQgcmlnaHRcbiAgICAvLyBhZnRlciwgc2VlbXMgZmluZS5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChtb2RhbEVsZW1lbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGVsID0gKDAsIF90YWJiYWJsZTIuZGVmYXVsdCkobW9kYWxFbGVtZW50KVswXSB8fCBtb2RhbEVsZW1lbnQ7XG4gICAgICBlbC5mb2N1cygpO1xuICAgIH0sIDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcmtGb3JGb2N1c0xhdGVyKCkge1xuICBmb2N1c0xhdGVyRWxlbWVudHMucHVzaChkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbn1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuZnVuY3Rpb24gcmV0dXJuRm9jdXMoKSB7XG4gIHZhciB0b0ZvY3VzID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBpZiAoZm9jdXNMYXRlckVsZW1lbnRzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdG9Gb2N1cyA9IGZvY3VzTGF0ZXJFbGVtZW50cy5wb3AoKTtcbiAgICAgIHRvRm9jdXMuZm9jdXMoKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKFtcIllvdSB0cmllZCB0byByZXR1cm4gZm9jdXMgdG9cIiwgdG9Gb2N1cywgXCJidXQgaXQgaXMgbm90IGluIHRoZSBET00gYW55bW9yZVwiXS5qb2luKFwiIFwiKSk7XG4gIH1cbn1cbi8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuXG5mdW5jdGlvbiBwb3BXaXRob3V0Rm9jdXMoKSB7XG4gIGZvY3VzTGF0ZXJFbGVtZW50cy5sZW5ndGggPiAwICYmIGZvY3VzTGF0ZXJFbGVtZW50cy5wb3AoKTtcbn1cblxuZnVuY3Rpb24gc2V0dXBTY29wZWRGb2N1cyhlbGVtZW50KSB7XG4gIG1vZGFsRWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGhhbmRsZUJsdXIsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgaGFuZGxlRm9jdXMsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5hdHRhY2hFdmVudChcIm9uQmx1clwiLCBoYW5kbGVCbHVyKTtcbiAgICBkb2N1bWVudC5hdHRhY2hFdmVudChcIm9uRm9jdXNcIiwgaGFuZGxlRm9jdXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRlYXJkb3duU2NvcGVkRm9jdXMoKSB7XG4gIG1vZGFsRWxlbWVudCA9IG51bGw7XG5cbiAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGhhbmRsZUJsdXIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBoYW5kbGVGb2N1cyk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93LmRldGFjaEV2ZW50KFwib25CbHVyXCIsIGhhbmRsZUJsdXIpO1xuICAgIGRvY3VtZW50LmRldGFjaEV2ZW50KFwib25Gb2N1c1wiLCBoYW5kbGVGb2N1cyk7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9mb2N1c01hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2ZvY3VzTWFuYWdlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY2FuVXNlRE9NID0gdW5kZWZpbmVkO1xuXG52YXIgX2V4ZW52ID0gcmVxdWlyZShcImV4ZW52XCIpO1xuXG52YXIgX2V4ZW52MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4ZW52KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEVFID0gX2V4ZW52Mi5kZWZhdWx0O1xuXG52YXIgU2FmZUhUTUxFbGVtZW50ID0gRUUuY2FuVXNlRE9NID8gd2luZG93LkhUTUxFbGVtZW50IDoge307XG5cbnZhciBjYW5Vc2VET00gPSBleHBvcnRzLmNhblVzZURPTSA9IEVFLmNhblVzZURPTTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2FmZUhUTUxFbGVtZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3NhZmVIVE1MRWxlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvc2FmZUhUTUxFbGVtZW50LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gc2NvcGVUYWI7XG5cbnZhciBfdGFiYmFibGUgPSByZXF1aXJlKFwiLi90YWJiYWJsZVwiKTtcblxudmFyIF90YWJiYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90YWJiYWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHNjb3BlVGFiKG5vZGUsIGV2ZW50KSB7XG4gIHZhciB0YWJiYWJsZSA9ICgwLCBfdGFiYmFibGUyLmRlZmF1bHQpKG5vZGUpO1xuXG4gIGlmICghdGFiYmFibGUubGVuZ3RoKSB7XG4gICAgLy8gRG8gbm90aGluZywgc2luY2UgdGhlcmUgYXJlIG5vIGVsZW1lbnRzIHRoYXQgY2FuIHJlY2VpdmUgZm9jdXMuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc2hpZnRLZXkgPSBldmVudC5zaGlmdEtleTtcbiAgdmFyIGhlYWQgPSB0YWJiYWJsZVswXTtcbiAgdmFyIHRhaWwgPSB0YWJiYWJsZVt0YWJiYWJsZS5sZW5ndGggLSAxXTtcblxuICAvLyBwcm9jZWVkIHdpdGggZGVmYXVsdCBicm93c2VyIGJlaGF2aW9yIG9uIHRhYi5cbiAgLy8gRm9jdXMgb24gbGFzdCBlbGVtZW50IG9uIHNoaWZ0ICsgdGFiLlxuICBpZiAobm9kZSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgIGlmICghc2hpZnRLZXkpIHJldHVybjtcbiAgICB0YXJnZXQgPSB0YWlsO1xuICB9XG5cbiAgdmFyIHRhcmdldDtcbiAgaWYgKHRhaWwgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgIXNoaWZ0S2V5KSB7XG4gICAgdGFyZ2V0ID0gaGVhZDtcbiAgfVxuXG4gIGlmIChoZWFkID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIHNoaWZ0S2V5KSB7XG4gICAgdGFyZ2V0ID0gdGFpbDtcbiAgfVxuXG4gIGlmICh0YXJnZXQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRhcmdldC5mb2N1cygpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFNhZmFyaSByYWRpbyBpc3N1ZS5cbiAgLy9cbiAgLy8gU2FmYXJpIGRvZXMgbm90IG1vdmUgdGhlIGZvY3VzIHRvIHRoZSByYWRpbyBidXR0b24sXG4gIC8vIHNvIHdlIG5lZWQgdG8gZm9yY2UgaXQgdG8gcmVhbGx5IHdhbGsgdGhyb3VnaCBhbGwgZWxlbWVudHMuXG4gIC8vXG4gIC8vIFRoaXMgaXMgdmVyeSBlcnJvciBwcnVuZSwgc2luY2Ugd2UgYXJlIHRyeWluZyB0byBndWVzc1xuICAvLyBpZiBpdCBpcyBhIHNhZmFyaSBicm93c2VyIGZyb20gdGhlIGZpcnN0IG9jY3VyZW5jZSBiZXR3ZWVuXG4gIC8vIGNocm9tZSBvciBzYWZhcmkuXG4gIC8vXG4gIC8vIFRoZSBjaHJvbWUgdXNlciBhZ2VudCBjb250YWlucyB0aGUgZmlyc3Qgb2N1cnJlbmNlXG4gIC8vIGFzIHRoZSAnY2hyb21lL3ZlcnNpb24nIGFuZCBsYXRlciB0aGUgJ3NhZmFyaS92ZXJzaW9uJy5cbiAgdmFyIGNoZWNrU2FmYXJpID0gLyhcXGJDaHJvbWVcXGJ8XFxiU2FmYXJpXFxiKVxcLy8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgdmFyIGlzU2FmYXJpRGVza3RvcCA9IGNoZWNrU2FmYXJpICE9IG51bGwgJiYgY2hlY2tTYWZhcmlbMV0gIT0gXCJDaHJvbWVcIiAmJiAvXFxiaVBvZFxcYnxcXGJpUGFkXFxiL2cuZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSA9PSBudWxsO1xuXG4gIC8vIElmIHdlIGFyZSBub3QgaW4gc2FmYXJpIGRlc2t0b3AsIGxldCB0aGUgYnJvd3NlciBjb250cm9sXG4gIC8vIHRoZSBmb2N1c1xuICBpZiAoIWlzU2FmYXJpRGVza3RvcCkgcmV0dXJuO1xuXG4gIHZhciB4ID0gdGFiYmFibGUuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICBpZiAoeCA+IC0xKSB7XG4gICAgeCArPSBzaGlmdEtleSA/IC0xIDogMTtcbiAgfVxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdGFiYmFibGVbeF0uZm9jdXMoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvc2NvcGVUYWIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3Njb3BlVGFiLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZmluZFRhYmJhYmxlRGVzY2VuZGFudHM7XG4vKiFcbiAqIEFkYXB0ZWQgZnJvbSBqUXVlcnkgVUkgY29yZVxuICpcbiAqIGh0dHA6Ly9qcXVlcnl1aS5jb21cbiAqXG4gKiBDb3B5cmlnaHQgMjAxNCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogaHR0cDovL2FwaS5qcXVlcnl1aS5jb20vY2F0ZWdvcnkvdWktY29yZS9cbiAqL1xuXG52YXIgdGFiYmFibGVOb2RlID0gL2lucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b258b2JqZWN0LztcblxuZnVuY3Rpb24gaGlkZXNDb250ZW50cyhlbGVtZW50KSB7XG4gIHZhciB6ZXJvU2l6ZSA9IGVsZW1lbnQub2Zmc2V0V2lkdGggPD0gMCAmJiBlbGVtZW50Lm9mZnNldEhlaWdodCA8PSAwO1xuXG4gIC8vIElmIHRoZSBub2RlIGlzIGVtcHR5LCB0aGlzIGlzIGdvb2QgZW5vdWdoXG4gIGlmICh6ZXJvU2l6ZSAmJiAhZWxlbWVudC5pbm5lckhUTUwpIHJldHVybiB0cnVlO1xuXG4gIC8vIE90aGVyd2lzZSB3ZSBuZWVkIHRvIGNoZWNrIHNvbWUgc3R5bGVzXG4gIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICByZXR1cm4gemVyb1NpemUgPyBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFwib3ZlcmZsb3dcIikgIT09IFwidmlzaWJsZVwiIDogc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShcImRpc3BsYXlcIikgPT0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIHZpc2libGUoZWxlbWVudCkge1xuICB2YXIgcGFyZW50RWxlbWVudCA9IGVsZW1lbnQ7XG4gIHdoaWxlIChwYXJlbnRFbGVtZW50KSB7XG4gICAgaWYgKHBhcmVudEVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIGJyZWFrO1xuICAgIGlmIChoaWRlc0NvbnRlbnRzKHBhcmVudEVsZW1lbnQpKSByZXR1cm4gZmFsc2U7XG4gICAgcGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZm9jdXNhYmxlKGVsZW1lbnQsIGlzVGFiSW5kZXhOb3ROYU4pIHtcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICB2YXIgcmVzID0gdGFiYmFibGVOb2RlLnRlc3Qobm9kZU5hbWUpICYmICFlbGVtZW50LmRpc2FibGVkIHx8IChub2RlTmFtZSA9PT0gXCJhXCIgPyBlbGVtZW50LmhyZWYgfHwgaXNUYWJJbmRleE5vdE5hTiA6IGlzVGFiSW5kZXhOb3ROYU4pO1xuICByZXR1cm4gcmVzICYmIHZpc2libGUoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHRhYmJhYmxlKGVsZW1lbnQpIHtcbiAgdmFyIHRhYkluZGV4ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgaWYgKHRhYkluZGV4ID09PSBudWxsKSB0YWJJbmRleCA9IHVuZGVmaW5lZDtcbiAgdmFyIGlzVGFiSW5kZXhOYU4gPSBpc05hTih0YWJJbmRleCk7XG4gIHJldHVybiAoaXNUYWJJbmRleE5hTiB8fCB0YWJJbmRleCA+PSAwKSAmJiBmb2N1c2FibGUoZWxlbWVudCwgIWlzVGFiSW5kZXhOYU4pO1xufVxuXG5mdW5jdGlvbiBmaW5kVGFiYmFibGVEZXNjZW5kYW50cyhlbGVtZW50KSB7XG4gIHJldHVybiBbXS5zbGljZS5jYWxsKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIipcIiksIDApLmZpbHRlcih0YWJiYWJsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3RhYmJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy90YWJiYWJsZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Nb2RhbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvTW9kYWxcIik7XG5cbnZhciBfTW9kYWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTW9kYWwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfTW9kYWwyLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBDaGlsZHJlbiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBzdG9yZVNoYXBlLCBzdWJzY3JpcHRpb25TaGFwZSB9IGZyb20gJy4uL3V0aWxzL1Byb3BUeXBlcyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuLi91dGlscy93YXJuaW5nJztcblxudmFyIGRpZFdhcm5BYm91dFJlY2VpdmluZ1N0b3JlID0gZmFsc2U7XG5mdW5jdGlvbiB3YXJuQWJvdXRSZWNlaXZpbmdTdG9yZSgpIHtcbiAgaWYgKGRpZFdhcm5BYm91dFJlY2VpdmluZ1N0b3JlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRpZFdhcm5BYm91dFJlY2VpdmluZ1N0b3JlID0gdHJ1ZTtcblxuICB3YXJuaW5nKCc8UHJvdmlkZXI+IGRvZXMgbm90IHN1cHBvcnQgY2hhbmdpbmcgYHN0b3JlYCBvbiB0aGUgZmx5LiAnICsgJ0l0IGlzIG1vc3QgbGlrZWx5IHRoYXQgeW91IHNlZSB0aGlzIGVycm9yIGJlY2F1c2UgeW91IHVwZGF0ZWQgdG8gJyArICdSZWR1eCAyLnggYW5kIFJlYWN0IFJlZHV4IDIueCB3aGljaCBubyBsb25nZXIgaG90IHJlbG9hZCByZWR1Y2VycyAnICsgJ2F1dG9tYXRpY2FsbHkuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZWFjdC1yZWR1eC9yZWxlYXNlcy8nICsgJ3RhZy92Mi4wLjAgZm9yIHRoZSBtaWdyYXRpb24gaW5zdHJ1Y3Rpb25zLicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXIoKSB7XG4gIHZhciBfUHJvdmlkZXIkY2hpbGRDb250ZXg7XG5cbiAgdmFyIHN0b3JlS2V5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnc3RvcmUnO1xuICB2YXIgc3ViS2V5ID0gYXJndW1lbnRzWzFdO1xuXG4gIHZhciBzdWJzY3JpcHRpb25LZXkgPSBzdWJLZXkgfHwgc3RvcmVLZXkgKyAnU3Vic2NyaXB0aW9uJztcblxuICB2YXIgUHJvdmlkZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhQcm92aWRlciwgX0NvbXBvbmVudCk7XG5cbiAgICBQcm92aWRlci5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIHJldHVybiBfcmVmID0ge30sIF9yZWZbc3RvcmVLZXldID0gdGhpc1tzdG9yZUtleV0sIF9yZWZbc3Vic2NyaXB0aW9uS2V5XSA9IG51bGwsIF9yZWY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFByb3ZpZGVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUHJvdmlkZXIpO1xuXG4gICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgICAgX3RoaXNbc3RvcmVLZXldID0gcHJvcHMuc3RvcmU7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgUHJvdmlkZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBDaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIH07XG5cbiAgICByZXR1cm4gUHJvdmlkZXI7XG4gIH0oQ29tcG9uZW50KTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIFByb3ZpZGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgICAgaWYgKHRoaXNbc3RvcmVLZXldICE9PSBuZXh0UHJvcHMuc3RvcmUpIHtcbiAgICAgICAgd2FybkFib3V0UmVjZWl2aW5nU3RvcmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgUHJvdmlkZXIucHJvcFR5cGVzID0ge1xuICAgIHN0b3JlOiBzdG9yZVNoYXBlLmlzUmVxdWlyZWQsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5lbGVtZW50LmlzUmVxdWlyZWRcbiAgfTtcbiAgUHJvdmlkZXIuY2hpbGRDb250ZXh0VHlwZXMgPSAoX1Byb3ZpZGVyJGNoaWxkQ29udGV4ID0ge30sIF9Qcm92aWRlciRjaGlsZENvbnRleFtzdG9yZUtleV0gPSBzdG9yZVNoYXBlLmlzUmVxdWlyZWQsIF9Qcm92aWRlciRjaGlsZENvbnRleFtzdWJzY3JpcHRpb25LZXldID0gc3Vic2NyaXB0aW9uU2hhcGUsIF9Qcm92aWRlciRjaGlsZENvbnRleCk7XG5cbiAgcmV0dXJuIFByb3ZpZGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQcm92aWRlcigpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2NvbXBvbmVudHMvUHJvdmlkZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2NvbXBvbmVudHMvUHJvdmlkZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmltcG9ydCBob2lzdFN0YXRpY3MgZnJvbSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBjcmVhdGVFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgU3Vic2NyaXB0aW9uIGZyb20gJy4uL3V0aWxzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBzdG9yZVNoYXBlLCBzdWJzY3JpcHRpb25TaGFwZSB9IGZyb20gJy4uL3V0aWxzL1Byb3BUeXBlcyc7XG5cbnZhciBob3RSZWxvYWRpbmdWZXJzaW9uID0gMDtcbnZhciBkdW1teVN0YXRlID0ge307XG5mdW5jdGlvbiBub29wKCkge31cbmZ1bmN0aW9uIG1ha2VTZWxlY3RvclN0YXRlZnVsKHNvdXJjZVNlbGVjdG9yLCBzdG9yZSkge1xuICAvLyB3cmFwIHRoZSBzZWxlY3RvciBpbiBhbiBvYmplY3QgdGhhdCB0cmFja3MgaXRzIHJlc3VsdHMgYmV0d2VlbiBydW5zLlxuICB2YXIgc2VsZWN0b3IgPSB7XG4gICAgcnVuOiBmdW5jdGlvbiBydW5Db21wb25lbnRTZWxlY3Rvcihwcm9wcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIG5leHRQcm9wcyA9IHNvdXJjZVNlbGVjdG9yKHN0b3JlLmdldFN0YXRlKCksIHByb3BzKTtcbiAgICAgICAgaWYgKG5leHRQcm9wcyAhPT0gc2VsZWN0b3IucHJvcHMgfHwgc2VsZWN0b3IuZXJyb3IpIHtcbiAgICAgICAgICBzZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgIHNlbGVjdG9yLnByb3BzID0gbmV4dFByb3BzO1xuICAgICAgICAgIHNlbGVjdG9yLmVycm9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgc2VsZWN0b3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHNlbGVjdG9yO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25uZWN0QWR2YW5jZWQoXG4vKlxuICBzZWxlY3RvckZhY3RvcnkgaXMgYSBmdW5jIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIHJldHVybmluZyB0aGUgc2VsZWN0b3IgZnVuY3Rpb24gdXNlZCB0b1xuICBjb21wdXRlIG5ldyBwcm9wcyBmcm9tIHN0YXRlLCBwcm9wcywgYW5kIGRpc3BhdGNoLiBGb3IgZXhhbXBsZTpcbiAgICAgZXhwb3J0IGRlZmF1bHQgY29ubmVjdEFkdmFuY2VkKChkaXNwYXRjaCwgb3B0aW9ucykgPT4gKHN0YXRlLCBwcm9wcykgPT4gKHtcbiAgICAgIHRoaW5nOiBzdGF0ZS50aGluZ3NbcHJvcHMudGhpbmdJZF0sXG4gICAgICBzYXZlVGhpbmc6IGZpZWxkcyA9PiBkaXNwYXRjaChhY3Rpb25DcmVhdG9ycy5zYXZlVGhpbmcocHJvcHMudGhpbmdJZCwgZmllbGRzKSksXG4gICAgfSkpKFlvdXJDb21wb25lbnQpXG4gICBBY2Nlc3MgdG8gZGlzcGF0Y2ggaXMgcHJvdmlkZWQgdG8gdGhlIGZhY3Rvcnkgc28gc2VsZWN0b3JGYWN0b3JpZXMgY2FuIGJpbmQgYWN0aW9uQ3JlYXRvcnNcbiAgb3V0c2lkZSBvZiB0aGVpciBzZWxlY3RvciBhcyBhbiBvcHRpbWl6YXRpb24uIE9wdGlvbnMgcGFzc2VkIHRvIGNvbm5lY3RBZHZhbmNlZCBhcmUgcGFzc2VkIHRvXG4gIHRoZSBzZWxlY3RvckZhY3RvcnksIGFsb25nIHdpdGggZGlzcGxheU5hbWUgYW5kIFdyYXBwZWRDb21wb25lbnQsIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICBOb3RlIHRoYXQgc2VsZWN0b3JGYWN0b3J5IGlzIHJlc3BvbnNpYmxlIGZvciBhbGwgY2FjaGluZy9tZW1vaXphdGlvbiBvZiBpbmJvdW5kIGFuZCBvdXRib3VuZFxuICBwcm9wcy4gRG8gbm90IHVzZSBjb25uZWN0QWR2YW5jZWQgZGlyZWN0bHkgd2l0aG91dCBtZW1vaXppbmcgcmVzdWx0cyBiZXR3ZWVuIGNhbGxzIHRvIHlvdXJcbiAgc2VsZWN0b3IsIG90aGVyd2lzZSB0aGUgQ29ubmVjdCBjb21wb25lbnQgd2lsbCByZS1yZW5kZXIgb24gZXZlcnkgc3RhdGUgb3IgcHJvcHMgY2hhbmdlLlxuKi9cbnNlbGVjdG9yRmFjdG9yeSkge1xuICB2YXIgX2NvbnRleHRUeXBlcywgX2NoaWxkQ29udGV4dFR5cGVzO1xuXG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICAgIF9yZWYkZ2V0RGlzcGxheU5hbWUgPSBfcmVmLmdldERpc3BsYXlOYW1lLFxuICAgICAgZ2V0RGlzcGxheU5hbWUgPSBfcmVmJGdldERpc3BsYXlOYW1lID09PSB1bmRlZmluZWQgPyBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiAnQ29ubmVjdEFkdmFuY2VkKCcgKyBuYW1lICsgJyknO1xuICB9IDogX3JlZiRnZXREaXNwbGF5TmFtZSxcbiAgICAgIF9yZWYkbWV0aG9kTmFtZSA9IF9yZWYubWV0aG9kTmFtZSxcbiAgICAgIG1ldGhvZE5hbWUgPSBfcmVmJG1ldGhvZE5hbWUgPT09IHVuZGVmaW5lZCA/ICdjb25uZWN0QWR2YW5jZWQnIDogX3JlZiRtZXRob2ROYW1lLFxuICAgICAgX3JlZiRyZW5kZXJDb3VudFByb3AgPSBfcmVmLnJlbmRlckNvdW50UHJvcCxcbiAgICAgIHJlbmRlckNvdW50UHJvcCA9IF9yZWYkcmVuZGVyQ291bnRQcm9wID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBfcmVmJHJlbmRlckNvdW50UHJvcCxcbiAgICAgIF9yZWYkc2hvdWxkSGFuZGxlU3RhdCA9IF9yZWYuc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzLFxuICAgICAgc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzID0gX3JlZiRzaG91bGRIYW5kbGVTdGF0ID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZiRzaG91bGRIYW5kbGVTdGF0LFxuICAgICAgX3JlZiRzdG9yZUtleSA9IF9yZWYuc3RvcmVLZXksXG4gICAgICBzdG9yZUtleSA9IF9yZWYkc3RvcmVLZXkgPT09IHVuZGVmaW5lZCA/ICdzdG9yZScgOiBfcmVmJHN0b3JlS2V5LFxuICAgICAgX3JlZiR3aXRoUmVmID0gX3JlZi53aXRoUmVmLFxuICAgICAgd2l0aFJlZiA9IF9yZWYkd2l0aFJlZiA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmJHdpdGhSZWYsXG4gICAgICBjb25uZWN0T3B0aW9ucyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2dldERpc3BsYXlOYW1lJywgJ21ldGhvZE5hbWUnLCAncmVuZGVyQ291bnRQcm9wJywgJ3Nob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcycsICdzdG9yZUtleScsICd3aXRoUmVmJ10pO1xuXG4gIHZhciBzdWJzY3JpcHRpb25LZXkgPSBzdG9yZUtleSArICdTdWJzY3JpcHRpb24nO1xuICB2YXIgdmVyc2lvbiA9IGhvdFJlbG9hZGluZ1ZlcnNpb24rKztcblxuICB2YXIgY29udGV4dFR5cGVzID0gKF9jb250ZXh0VHlwZXMgPSB7fSwgX2NvbnRleHRUeXBlc1tzdG9yZUtleV0gPSBzdG9yZVNoYXBlLCBfY29udGV4dFR5cGVzW3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb25TaGFwZSwgX2NvbnRleHRUeXBlcyk7XG4gIHZhciBjaGlsZENvbnRleHRUeXBlcyA9IChfY2hpbGRDb250ZXh0VHlwZXMgPSB7fSwgX2NoaWxkQ29udGV4dFR5cGVzW3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb25TaGFwZSwgX2NoaWxkQ29udGV4dFR5cGVzKTtcblxuICByZXR1cm4gZnVuY3Rpb24gd3JhcFdpdGhDb25uZWN0KFdyYXBwZWRDb21wb25lbnQpIHtcbiAgICBpbnZhcmlhbnQodHlwZW9mIFdyYXBwZWRDb21wb25lbnQgPT0gJ2Z1bmN0aW9uJywgJ1lvdSBtdXN0IHBhc3MgYSBjb21wb25lbnQgdG8gdGhlIGZ1bmN0aW9uIHJldHVybmVkIGJ5ICcgKyAobWV0aG9kTmFtZSArICcuIEluc3RlYWQgcmVjZWl2ZWQgJyArIEpTT04uc3RyaW5naWZ5KFdyYXBwZWRDb21wb25lbnQpKSk7XG5cbiAgICB2YXIgd3JhcHBlZENvbXBvbmVudE5hbWUgPSBXcmFwcGVkQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IFdyYXBwZWRDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JztcblxuICAgIHZhciBkaXNwbGF5TmFtZSA9IGdldERpc3BsYXlOYW1lKHdyYXBwZWRDb21wb25lbnROYW1lKTtcblxuICAgIHZhciBzZWxlY3RvckZhY3RvcnlPcHRpb25zID0gX2V4dGVuZHMoe30sIGNvbm5lY3RPcHRpb25zLCB7XG4gICAgICBnZXREaXNwbGF5TmFtZTogZ2V0RGlzcGxheU5hbWUsXG4gICAgICBtZXRob2ROYW1lOiBtZXRob2ROYW1lLFxuICAgICAgcmVuZGVyQ291bnRQcm9wOiByZW5kZXJDb3VudFByb3AsXG4gICAgICBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXM6IHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcyxcbiAgICAgIHN0b3JlS2V5OiBzdG9yZUtleSxcbiAgICAgIHdpdGhSZWY6IHdpdGhSZWYsXG4gICAgICBkaXNwbGF5TmFtZTogZGlzcGxheU5hbWUsXG4gICAgICB3cmFwcGVkQ29tcG9uZW50TmFtZTogd3JhcHBlZENvbXBvbmVudE5hbWUsXG4gICAgICBXcmFwcGVkQ29tcG9uZW50OiBXcmFwcGVkQ29tcG9uZW50XG4gICAgfSk7XG5cbiAgICB2YXIgQ29ubmVjdCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgICBfaW5oZXJpdHMoQ29ubmVjdCwgX0NvbXBvbmVudCk7XG5cbiAgICAgIGZ1bmN0aW9uIENvbm5lY3QocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbm5lY3QpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgICAgIF90aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICBfdGhpcy5yZW5kZXJDb3VudCA9IDA7XG4gICAgICAgIF90aGlzLnN0b3JlID0gcHJvcHNbc3RvcmVLZXldIHx8IGNvbnRleHRbc3RvcmVLZXldO1xuICAgICAgICBfdGhpcy5wcm9wc01vZGUgPSBCb29sZWFuKHByb3BzW3N0b3JlS2V5XSk7XG4gICAgICAgIF90aGlzLnNldFdyYXBwZWRJbnN0YW5jZSA9IF90aGlzLnNldFdyYXBwZWRJbnN0YW5jZS5iaW5kKF90aGlzKTtcblxuICAgICAgICBpbnZhcmlhbnQoX3RoaXMuc3RvcmUsICdDb3VsZCBub3QgZmluZCBcIicgKyBzdG9yZUtleSArICdcIiBpbiBlaXRoZXIgdGhlIGNvbnRleHQgb3IgcHJvcHMgb2YgJyArICgnXCInICsgZGlzcGxheU5hbWUgKyAnXCIuIEVpdGhlciB3cmFwIHRoZSByb290IGNvbXBvbmVudCBpbiBhIDxQcm92aWRlcj4sICcpICsgKCdvciBleHBsaWNpdGx5IHBhc3MgXCInICsgc3RvcmVLZXkgKyAnXCIgYXMgYSBwcm9wIHRvIFwiJyArIGRpc3BsYXlOYW1lICsgJ1wiLicpKTtcblxuICAgICAgICBfdGhpcy5pbml0U2VsZWN0b3IoKTtcbiAgICAgICAgX3RoaXMuaW5pdFN1YnNjcmlwdGlvbigpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICB9XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmdldENoaWxkQ29udGV4dCA9IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgIC8vIElmIHRoaXMgY29tcG9uZW50IHJlY2VpdmVkIHN0b3JlIGZyb20gcHJvcHMsIGl0cyBzdWJzY3JpcHRpb24gc2hvdWxkIGJlIHRyYW5zcGFyZW50XG4gICAgICAgIC8vIHRvIGFueSBkZXNjZW5kYW50cyByZWNlaXZpbmcgc3RvcmUrc3Vic2NyaXB0aW9uIGZyb20gY29udGV4dDsgaXQgcGFzc2VzIGFsb25nXG4gICAgICAgIC8vIHN1YnNjcmlwdGlvbiBwYXNzZWQgdG8gaXQuIE90aGVyd2lzZSwgaXQgc2hhZG93cyB0aGUgcGFyZW50IHN1YnNjcmlwdGlvbiwgd2hpY2ggYWxsb3dzXG4gICAgICAgIC8vIENvbm5lY3QgdG8gY29udHJvbCBvcmRlcmluZyBvZiBub3RpZmljYXRpb25zIHRvIGZsb3cgdG9wLWRvd24uXG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLnByb3BzTW9kZSA/IG51bGwgOiB0aGlzLnN1YnNjcmlwdGlvbjtcbiAgICAgICAgcmV0dXJuIF9yZWYyID0ge30sIF9yZWYyW3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb24gfHwgdGhpcy5jb250ZXh0W3N1YnNjcmlwdGlvbktleV0sIF9yZWYyO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKCFzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMpIHJldHVybjtcblxuICAgICAgICAvLyBjb21wb25lbnRXaWxsTW91bnQgZmlyZXMgZHVyaW5nIHNlcnZlciBzaWRlIHJlbmRlcmluZywgYnV0IGNvbXBvbmVudERpZE1vdW50IGFuZFxuICAgICAgICAvLyBjb21wb25lbnRXaWxsVW5tb3VudCBkbyBub3QuIEJlY2F1c2Ugb2YgdGhpcywgdHJ5U3Vic2NyaWJlIGhhcHBlbnMgZHVyaW5nIC4uLmRpZE1vdW50LlxuICAgICAgICAvLyBPdGhlcndpc2UsIHVuc3Vic2NyaXB0aW9uIHdvdWxkIG5ldmVyIHRha2UgcGxhY2UgZHVyaW5nIFNTUiwgY2F1c2luZyBhIG1lbW9yeSBsZWFrLlxuICAgICAgICAvLyBUbyBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgYSBjaGlsZCBjb21wb25lbnQgbWF5IGhhdmUgdHJpZ2dlcmVkIGEgc3RhdGUgY2hhbmdlIGJ5XG4gICAgICAgIC8vIGRpc3BhdGNoaW5nIGFuIGFjdGlvbiBpbiBpdHMgY29tcG9uZW50V2lsbE1vdW50LCB3ZSBoYXZlIHRvIHJlLXJ1biB0aGUgc2VsZWN0IGFuZCBtYXliZVxuICAgICAgICAvLyByZS1yZW5kZXIuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnRyeVN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bih0aGlzLnByb3BzKTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlKSB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4obmV4dFByb3BzKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB0aGlzLnN1YnNjcmlwdGlvbi50cnlVbnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicyA9IG5vb3A7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1biA9IG5vb3A7XG4gICAgICAgIHRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5nZXRXcmFwcGVkSW5zdGFuY2UgPSBmdW5jdGlvbiBnZXRXcmFwcGVkSW5zdGFuY2UoKSB7XG4gICAgICAgIGludmFyaWFudCh3aXRoUmVmLCAnVG8gYWNjZXNzIHRoZSB3cmFwcGVkIGluc3RhbmNlLCB5b3UgbmVlZCB0byBzcGVjaWZ5ICcgKyAoJ3sgd2l0aFJlZjogdHJ1ZSB9IGluIHRoZSBvcHRpb25zIGFyZ3VtZW50IG9mIHRoZSAnICsgbWV0aG9kTmFtZSArICcoKSBjYWxsLicpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZEluc3RhbmNlO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuc2V0V3JhcHBlZEluc3RhbmNlID0gZnVuY3Rpb24gc2V0V3JhcHBlZEluc3RhbmNlKHJlZikge1xuICAgICAgICB0aGlzLndyYXBwZWRJbnN0YW5jZSA9IHJlZjtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmluaXRTZWxlY3RvciA9IGZ1bmN0aW9uIGluaXRTZWxlY3RvcigpIHtcbiAgICAgICAgdmFyIHNvdXJjZVNlbGVjdG9yID0gc2VsZWN0b3JGYWN0b3J5KHRoaXMuc3RvcmUuZGlzcGF0Y2gsIHNlbGVjdG9yRmFjdG9yeU9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gbWFrZVNlbGVjdG9yU3RhdGVmdWwoc291cmNlU2VsZWN0b3IsIHRoaXMuc3RvcmUpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bih0aGlzLnByb3BzKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmluaXRTdWJzY3JpcHRpb24gPSBmdW5jdGlvbiBpbml0U3Vic2NyaXB0aW9uKCkge1xuICAgICAgICBpZiAoIXNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcykgcmV0dXJuO1xuXG4gICAgICAgIC8vIHBhcmVudFN1YidzIHNvdXJjZSBzaG91bGQgbWF0Y2ggd2hlcmUgc3RvcmUgY2FtZSBmcm9tOiBwcm9wcyB2cy4gY29udGV4dC4gQSBjb21wb25lbnRcbiAgICAgICAgLy8gY29ubmVjdGVkIHRvIHRoZSBzdG9yZSB2aWEgcHJvcHMgc2hvdWxkbid0IHVzZSBzdWJzY3JpcHRpb24gZnJvbSBjb250ZXh0LCBvciB2aWNlIHZlcnNhLlxuICAgICAgICB2YXIgcGFyZW50U3ViID0gKHRoaXMucHJvcHNNb2RlID8gdGhpcy5wcm9wcyA6IHRoaXMuY29udGV4dClbc3Vic2NyaXB0aW9uS2V5XTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKHRoaXMuc3RvcmUsIHBhcmVudFN1YiwgdGhpcy5vblN0YXRlQ2hhbmdlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIGBub3RpZnlOZXN0ZWRTdWJzYCBpcyBkdXBsaWNhdGVkIHRvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0aGUgY29tcG9uZW50IGlzICB1bm1vdW50ZWQgaW5cbiAgICAgICAgLy8gdGhlIG1pZGRsZSBvZiB0aGUgbm90aWZpY2F0aW9uIGxvb3AsIHdoZXJlIGB0aGlzLnN1YnNjcmlwdGlvbmAgd2lsbCB0aGVuIGJlIG51bGwuIEFuXG4gICAgICAgIC8vIGV4dHJhIG51bGwgY2hlY2sgZXZlcnkgY2hhbmdlIGNhbiBiZSBhdm9pZGVkIGJ5IGNvcHlpbmcgdGhlIG1ldGhvZCBvbnRvIGB0aGlzYCBhbmQgdGhlblxuICAgICAgICAvLyByZXBsYWNpbmcgaXQgd2l0aCBhIG5vLW9wIG9uIHVubW91bnQuIFRoaXMgY2FuIHByb2JhYmx5IGJlIGF2b2lkZWQgaWYgU3Vic2NyaXB0aW9uJ3NcbiAgICAgICAgLy8gbGlzdGVuZXJzIGxvZ2ljIGlzIGNoYW5nZWQgdG8gbm90IGNhbGwgbGlzdGVuZXJzIHRoYXQgaGF2ZSBiZWVuIHVuc3Vic2NyaWJlZCBpbiB0aGVcbiAgICAgICAgLy8gbWlkZGxlIG9mIHRoZSBub3RpZmljYXRpb24gbG9vcC5cbiAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzID0gdGhpcy5zdWJzY3JpcHRpb24ubm90aWZ5TmVzdGVkU3Vicy5iaW5kKHRoaXMuc3Vic2NyaXB0aW9uKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLm9uU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bih0aGlzLnByb3BzKTtcblxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlKSB7XG4gICAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUgPSB0aGlzLm5vdGlmeU5lc3RlZFN1YnNPbkNvbXBvbmVudERpZFVwZGF0ZTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKGR1bW15U3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5ub3RpZnlOZXN0ZWRTdWJzT25Db21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBub3RpZnlOZXN0ZWRTdWJzT25Db21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIC8vIGBjb21wb25lbnREaWRVcGRhdGVgIGlzIGNvbmRpdGlvbmFsbHkgaW1wbGVtZW50ZWQgd2hlbiBgb25TdGF0ZUNoYW5nZWAgZGV0ZXJtaW5lcyBpdFxuICAgICAgICAvLyBuZWVkcyB0byBub3RpZnkgbmVzdGVkIHN1YnMuIE9uY2UgY2FsbGVkLCBpdCB1bmltcGxlbWVudHMgaXRzZWxmIHVudGlsIGZ1cnRoZXIgc3RhdGVcbiAgICAgICAgLy8gY2hhbmdlcyBvY2N1ci4gRG9pbmcgaXQgdGhpcyB3YXkgdnMgaGF2aW5nIGEgcGVybWFuZW50IGBjb21wb25lbnREaWRVcGRhdGVgIHRoYXQgZG9lc1xuICAgICAgICAvLyBhIGJvb2xlYW4gY2hlY2sgZXZlcnkgdGltZSBhdm9pZHMgYW4gZXh0cmEgbWV0aG9kIGNhbGwgbW9zdCBvZiB0aGUgdGltZSwgcmVzdWx0aW5nXG4gICAgICAgIC8vIGluIHNvbWUgcGVyZiBib29zdC5cbiAgICAgICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicygpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuaXNTdWJzY3JpYmVkID0gZnVuY3Rpb24gaXNTdWJzY3JpYmVkKCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnN1YnNjcmlwdGlvbikgJiYgdGhpcy5zdWJzY3JpcHRpb24uaXNTdWJzY3JpYmVkKCk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5hZGRFeHRyYVByb3BzID0gZnVuY3Rpb24gYWRkRXh0cmFQcm9wcyhwcm9wcykge1xuICAgICAgICBpZiAoIXdpdGhSZWYgJiYgIXJlbmRlckNvdW50UHJvcCAmJiAhKHRoaXMucHJvcHNNb2RlICYmIHRoaXMuc3Vic2NyaXB0aW9uKSkgcmV0dXJuIHByb3BzO1xuICAgICAgICAvLyBtYWtlIGEgc2hhbGxvdyBjb3B5IHNvIHRoYXQgZmllbGRzIGFkZGVkIGRvbid0IGxlYWsgdG8gdGhlIG9yaWdpbmFsIHNlbGVjdG9yLlxuICAgICAgICAvLyB0aGlzIGlzIGVzcGVjaWFsbHkgaW1wb3J0YW50IGZvciAncmVmJyBzaW5jZSB0aGF0J3MgYSByZWZlcmVuY2UgYmFjayB0byB0aGUgY29tcG9uZW50XG4gICAgICAgIC8vIGluc3RhbmNlLiBhIHNpbmdsZXRvbiBtZW1vaXplZCBzZWxlY3RvciB3b3VsZCB0aGVuIGJlIGhvbGRpbmcgYSByZWZlcmVuY2UgdG8gdGhlXG4gICAgICAgIC8vIGluc3RhbmNlLCBwcmV2ZW50aW5nIHRoZSBpbnN0YW5jZSBmcm9tIGJlaW5nIGdhcmJhZ2UgY29sbGVjdGVkLCBhbmQgdGhhdCB3b3VsZCBiZSBiYWRcbiAgICAgICAgdmFyIHdpdGhFeHRyYXMgPSBfZXh0ZW5kcyh7fSwgcHJvcHMpO1xuICAgICAgICBpZiAod2l0aFJlZikgd2l0aEV4dHJhcy5yZWYgPSB0aGlzLnNldFdyYXBwZWRJbnN0YW5jZTtcbiAgICAgICAgaWYgKHJlbmRlckNvdW50UHJvcCkgd2l0aEV4dHJhc1tyZW5kZXJDb3VudFByb3BdID0gdGhpcy5yZW5kZXJDb3VudCsrO1xuICAgICAgICBpZiAodGhpcy5wcm9wc01vZGUgJiYgdGhpcy5zdWJzY3JpcHRpb24pIHdpdGhFeHRyYXNbc3Vic2NyaXB0aW9uS2V5XSA9IHRoaXMuc3Vic2NyaXB0aW9uO1xuICAgICAgICByZXR1cm4gd2l0aEV4dHJhcztcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcjtcbiAgICAgICAgc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHNlbGVjdG9yLmVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgc2VsZWN0b3IuZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoV3JhcHBlZENvbXBvbmVudCwgdGhpcy5hZGRFeHRyYVByb3BzKHNlbGVjdG9yLnByb3BzKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDb25uZWN0O1xuICAgIH0oQ29tcG9uZW50KTtcblxuICAgIENvbm5lY3QuV3JhcHBlZENvbXBvbmVudCA9IFdyYXBwZWRDb21wb25lbnQ7XG4gICAgQ29ubmVjdC5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICAgIENvbm5lY3QuY2hpbGRDb250ZXh0VHlwZXMgPSBjaGlsZENvbnRleHRUeXBlcztcbiAgICBDb25uZWN0LmNvbnRleHRUeXBlcyA9IGNvbnRleHRUeXBlcztcbiAgICBDb25uZWN0LnByb3BUeXBlcyA9IGNvbnRleHRUeXBlcztcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVXBkYXRlID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVwZGF0ZSgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgLy8gV2UgYXJlIGhvdCByZWxvYWRpbmchXG4gICAgICAgIGlmICh0aGlzLnZlcnNpb24gIT09IHZlcnNpb24pIHtcbiAgICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICAgIHRoaXMuaW5pdFNlbGVjdG9yKCk7XG5cbiAgICAgICAgICAvLyBJZiBhbnkgY29ubmVjdGVkIGRlc2NlbmRhbnRzIGRvbid0IGhvdCByZWxvYWQgKGFuZCByZXN1YnNjcmliZSBpbiB0aGUgcHJvY2VzcyksIHRoZWlyXG4gICAgICAgICAgLy8gbGlzdGVuZXJzIHdpbGwgYmUgbG9zdCB3aGVuIHdlIHVuc3Vic2NyaWJlLiBVbmZvcnR1bmF0ZWx5LCBieSBjb3B5aW5nIG92ZXIgYWxsXG4gICAgICAgICAgLy8gbGlzdGVuZXJzLCB0aGlzIGRvZXMgbWVhbiB0aGF0IHRoZSBvbGQgdmVyc2lvbnMgb2YgY29ubmVjdGVkIGRlc2NlbmRhbnRzIHdpbGwgc3RpbGwgYmVcbiAgICAgICAgICAvLyBub3RpZmllZCBvZiBzdGF0ZSBjaGFuZ2VzOyBob3dldmVyLCB0aGVpciBvblN0YXRlQ2hhbmdlIGZ1bmN0aW9uIGlzIGEgbm8tb3Agc28gdGhpc1xuICAgICAgICAgIC8vIGlzbid0IGEgaHVnZSBkZWFsLlxuICAgICAgICAgIHZhciBvbGRMaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgb2xkTGlzdGVuZXJzID0gdGhpcy5zdWJzY3JpcHRpb24ubGlzdGVuZXJzLmdldCgpO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udHJ5VW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pbml0U3Vic2NyaXB0aW9uKCk7XG4gICAgICAgICAgaWYgKHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udHJ5U3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBvbGRMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5zdWJzY3JpcHRpb24ubGlzdGVuZXJzLnN1YnNjcmliZShsaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGhvaXN0U3RhdGljcyhDb25uZWN0LCBXcmFwcGVkQ29tcG9uZW50KTtcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29tcG9uZW50cy9jb25uZWN0QWR2YW5jZWQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5pbXBvcnQgY29ubmVjdEFkdmFuY2VkIGZyb20gJy4uL2NvbXBvbmVudHMvY29ubmVjdEFkdmFuY2VkJztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbHMvc2hhbGxvd0VxdWFsJztcbmltcG9ydCBkZWZhdWx0TWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzIGZyb20gJy4vbWFwRGlzcGF0Y2hUb1Byb3BzJztcbmltcG9ydCBkZWZhdWx0TWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzIGZyb20gJy4vbWFwU3RhdGVUb1Byb3BzJztcbmltcG9ydCBkZWZhdWx0TWVyZ2VQcm9wc0ZhY3RvcmllcyBmcm9tICcuL21lcmdlUHJvcHMnO1xuaW1wb3J0IGRlZmF1bHRTZWxlY3RvckZhY3RvcnkgZnJvbSAnLi9zZWxlY3RvckZhY3RvcnknO1xuXG4vKlxuICBjb25uZWN0IGlzIGEgZmFjYWRlIG92ZXIgY29ubmVjdEFkdmFuY2VkLiBJdCB0dXJucyBpdHMgYXJncyBpbnRvIGEgY29tcGF0aWJsZVxuICBzZWxlY3RvckZhY3RvcnksIHdoaWNoIGhhcyB0aGUgc2lnbmF0dXJlOlxuXG4gICAgKGRpc3BhdGNoLCBvcHRpb25zKSA9PiAobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpID0+IG5leHRGaW5hbFByb3BzXG4gIFxuICBjb25uZWN0IHBhc3NlcyBpdHMgYXJncyB0byBjb25uZWN0QWR2YW5jZWQgYXMgb3B0aW9ucywgd2hpY2ggd2lsbCBpbiB0dXJuIHBhc3MgdGhlbSB0b1xuICBzZWxlY3RvckZhY3RvcnkgZWFjaCB0aW1lIGEgQ29ubmVjdCBjb21wb25lbnQgaW5zdGFuY2UgaXMgaW5zdGFudGlhdGVkIG9yIGhvdCByZWxvYWRlZC5cblxuICBzZWxlY3RvckZhY3RvcnkgcmV0dXJucyBhIGZpbmFsIHByb3BzIHNlbGVjdG9yIGZyb20gaXRzIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcywgbWVyZ2VQcm9wcyxcbiAgbWVyZ2VQcm9wc0ZhY3RvcmllcywgYW5kIHB1cmUgYXJncy5cblxuICBUaGUgcmVzdWx0aW5nIGZpbmFsIHByb3BzIHNlbGVjdG9yIGlzIGNhbGxlZCBieSB0aGUgQ29ubmVjdCBjb21wb25lbnQgaW5zdGFuY2Ugd2hlbmV2ZXJcbiAgaXQgcmVjZWl2ZXMgbmV3IHByb3BzIG9yIHN0b3JlIHN0YXRlLlxuICovXG5cbmZ1bmN0aW9uIG1hdGNoKGFyZywgZmFjdG9yaWVzLCBuYW1lKSB7XG4gIGZvciAodmFyIGkgPSBmYWN0b3JpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgcmVzdWx0ID0gZmFjdG9yaWVzW2ldKGFyZyk7XG4gICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gsIG9wdGlvbnMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgb2YgdHlwZSAnICsgdHlwZW9mIGFyZyArICcgZm9yICcgKyBuYW1lICsgJyBhcmd1bWVudCB3aGVuIGNvbm5lY3RpbmcgY29tcG9uZW50ICcgKyBvcHRpb25zLndyYXBwZWRDb21wb25lbnROYW1lICsgJy4nKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3RyaWN0RXF1YWwoYSwgYikge1xuICByZXR1cm4gYSA9PT0gYjtcbn1cblxuLy8gY3JlYXRlQ29ubmVjdCB3aXRoIGRlZmF1bHQgYXJncyBidWlsZHMgdGhlICdvZmZpY2lhbCcgY29ubmVjdCBiZWhhdmlvci4gQ2FsbGluZyBpdCB3aXRoXG4vLyBkaWZmZXJlbnQgb3B0aW9ucyBvcGVucyB1cCBzb21lIHRlc3RpbmcgYW5kIGV4dGVuc2liaWxpdHkgc2NlbmFyaW9zXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29ubmVjdCgpIHtcbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9LFxuICAgICAgX3JlZiRjb25uZWN0SE9DID0gX3JlZi5jb25uZWN0SE9DLFxuICAgICAgY29ubmVjdEhPQyA9IF9yZWYkY29ubmVjdEhPQyA9PT0gdW5kZWZpbmVkID8gY29ubmVjdEFkdmFuY2VkIDogX3JlZiRjb25uZWN0SE9DLFxuICAgICAgX3JlZiRtYXBTdGF0ZVRvUHJvcHNGID0gX3JlZi5tYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsXG4gICAgICBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgPSBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgOiBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YsXG4gICAgICBfcmVmJG1hcERpc3BhdGNoVG9Qcm8gPSBfcmVmLm1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWFwRGlzcGF0Y2hUb1BybyA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdE1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyA6IF9yZWYkbWFwRGlzcGF0Y2hUb1BybyxcbiAgICAgIF9yZWYkbWVyZ2VQcm9wc0ZhY3RvciA9IF9yZWYubWVyZ2VQcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1lcmdlUHJvcHNGYWN0b3JpZXMgPSBfcmVmJG1lcmdlUHJvcHNGYWN0b3IgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRNZXJnZVByb3BzRmFjdG9yaWVzIDogX3JlZiRtZXJnZVByb3BzRmFjdG9yLFxuICAgICAgX3JlZiRzZWxlY3RvckZhY3RvcnkgPSBfcmVmLnNlbGVjdG9yRmFjdG9yeSxcbiAgICAgIHNlbGVjdG9yRmFjdG9yeSA9IF9yZWYkc2VsZWN0b3JGYWN0b3J5ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0U2VsZWN0b3JGYWN0b3J5IDogX3JlZiRzZWxlY3RvckZhY3Rvcnk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMpIHtcbiAgICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHt9LFxuICAgICAgICBfcmVmMiRwdXJlID0gX3JlZjIucHVyZSxcbiAgICAgICAgcHVyZSA9IF9yZWYyJHB1cmUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmMiRwdXJlLFxuICAgICAgICBfcmVmMiRhcmVTdGF0ZXNFcXVhbCA9IF9yZWYyLmFyZVN0YXRlc0VxdWFsLFxuICAgICAgICBhcmVTdGF0ZXNFcXVhbCA9IF9yZWYyJGFyZVN0YXRlc0VxdWFsID09PSB1bmRlZmluZWQgPyBzdHJpY3RFcXVhbCA6IF9yZWYyJGFyZVN0YXRlc0VxdWFsLFxuICAgICAgICBfcmVmMiRhcmVPd25Qcm9wc0VxdWEgPSBfcmVmMi5hcmVPd25Qcm9wc0VxdWFsLFxuICAgICAgICBhcmVPd25Qcm9wc0VxdWFsID0gX3JlZjIkYXJlT3duUHJvcHNFcXVhID09PSB1bmRlZmluZWQgPyBzaGFsbG93RXF1YWwgOiBfcmVmMiRhcmVPd25Qcm9wc0VxdWEsXG4gICAgICAgIF9yZWYyJGFyZVN0YXRlUHJvcHNFcSA9IF9yZWYyLmFyZVN0YXRlUHJvcHNFcXVhbCxcbiAgICAgICAgYXJlU3RhdGVQcm9wc0VxdWFsID0gX3JlZjIkYXJlU3RhdGVQcm9wc0VxID09PSB1bmRlZmluZWQgPyBzaGFsbG93RXF1YWwgOiBfcmVmMiRhcmVTdGF0ZVByb3BzRXEsXG4gICAgICAgIF9yZWYyJGFyZU1lcmdlZFByb3BzRSA9IF9yZWYyLmFyZU1lcmdlZFByb3BzRXF1YWwsXG4gICAgICAgIGFyZU1lcmdlZFByb3BzRXF1YWwgPSBfcmVmMiRhcmVNZXJnZWRQcm9wc0UgPT09IHVuZGVmaW5lZCA/IHNoYWxsb3dFcXVhbCA6IF9yZWYyJGFyZU1lcmdlZFByb3BzRSxcbiAgICAgICAgZXh0cmFPcHRpb25zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYyLCBbJ3B1cmUnLCAnYXJlU3RhdGVzRXF1YWwnLCAnYXJlT3duUHJvcHNFcXVhbCcsICdhcmVTdGF0ZVByb3BzRXF1YWwnLCAnYXJlTWVyZ2VkUHJvcHNFcXVhbCddKTtcblxuICAgIHZhciBpbml0TWFwU3RhdGVUb1Byb3BzID0gbWF0Y2gobWFwU3RhdGVUb1Byb3BzLCBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsICdtYXBTdGF0ZVRvUHJvcHMnKTtcbiAgICB2YXIgaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyA9IG1hdGNoKG1hcERpc3BhdGNoVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLCAnbWFwRGlzcGF0Y2hUb1Byb3BzJyk7XG4gICAgdmFyIGluaXRNZXJnZVByb3BzID0gbWF0Y2gobWVyZ2VQcm9wcywgbWVyZ2VQcm9wc0ZhY3RvcmllcywgJ21lcmdlUHJvcHMnKTtcblxuICAgIHJldHVybiBjb25uZWN0SE9DKHNlbGVjdG9yRmFjdG9yeSwgX2V4dGVuZHMoe1xuICAgICAgLy8gdXNlZCBpbiBlcnJvciBtZXNzYWdlc1xuICAgICAgbWV0aG9kTmFtZTogJ2Nvbm5lY3QnLFxuXG4gICAgICAvLyB1c2VkIHRvIGNvbXB1dGUgQ29ubmVjdCdzIGRpc3BsYXlOYW1lIGZyb20gdGhlIHdyYXBwZWQgY29tcG9uZW50J3MgZGlzcGxheU5hbWUuXG4gICAgICBnZXREaXNwbGF5TmFtZTogZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUobmFtZSkge1xuICAgICAgICByZXR1cm4gJ0Nvbm5lY3QoJyArIG5hbWUgKyAnKSc7XG4gICAgICB9LFxuXG4gICAgICAvLyBpZiBtYXBTdGF0ZVRvUHJvcHMgaXMgZmFsc3ksIHRoZSBDb25uZWN0IGNvbXBvbmVudCBkb2Vzbid0IHN1YnNjcmliZSB0byBzdG9yZSBzdGF0ZSBjaGFuZ2VzXG4gICAgICBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXM6IEJvb2xlYW4obWFwU3RhdGVUb1Byb3BzKSxcblxuICAgICAgLy8gcGFzc2VkIHRocm91Z2ggdG8gc2VsZWN0b3JGYWN0b3J5XG4gICAgICBpbml0TWFwU3RhdGVUb1Byb3BzOiBpbml0TWFwU3RhdGVUb1Byb3BzLFxuICAgICAgaW5pdE1hcERpc3BhdGNoVG9Qcm9wczogaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyxcbiAgICAgIGluaXRNZXJnZVByb3BzOiBpbml0TWVyZ2VQcm9wcyxcbiAgICAgIHB1cmU6IHB1cmUsXG4gICAgICBhcmVTdGF0ZXNFcXVhbDogYXJlU3RhdGVzRXF1YWwsXG4gICAgICBhcmVPd25Qcm9wc0VxdWFsOiBhcmVPd25Qcm9wc0VxdWFsLFxuICAgICAgYXJlU3RhdGVQcm9wc0VxdWFsOiBhcmVTdGF0ZVByb3BzRXF1YWwsXG4gICAgICBhcmVNZXJnZWRQcm9wc0VxdWFsOiBhcmVNZXJnZWRQcm9wc0VxdWFsXG5cbiAgICB9LCBleHRyYU9wdGlvbnMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29ubmVjdCgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvY29ubmVjdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9jb25uZWN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQsIHdyYXBNYXBUb1Byb3BzRnVuYyB9IGZyb20gJy4vd3JhcE1hcFRvUHJvcHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzRnVuY3Rpb24obWFwRGlzcGF0Y2hUb1Byb3BzKSB7XG4gIHJldHVybiB0eXBlb2YgbWFwRGlzcGF0Y2hUb1Byb3BzID09PSAnZnVuY3Rpb24nID8gd3JhcE1hcFRvUHJvcHNGdW5jKG1hcERpc3BhdGNoVG9Qcm9wcywgJ21hcERpc3BhdGNoVG9Qcm9wcycpIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzTWlzc2luZyhtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgcmV0dXJuICFtYXBEaXNwYXRjaFRvUHJvcHMgPyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50KGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgIHJldHVybiB7IGRpc3BhdGNoOiBkaXNwYXRjaCB9O1xuICB9KSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdoZW5NYXBEaXNwYXRjaFRvUHJvcHNJc09iamVjdChtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgcmV0dXJuIG1hcERpc3BhdGNoVG9Qcm9wcyAmJiB0eXBlb2YgbWFwRGlzcGF0Y2hUb1Byb3BzID09PSAnb2JqZWN0JyA/IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyhtYXBEaXNwYXRjaFRvUHJvcHMsIGRpc3BhdGNoKTtcbiAgfSkgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFt3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNGdW5jdGlvbiwgd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzTWlzc2luZywgd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzT2JqZWN0XTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21hcERpc3BhdGNoVG9Qcm9wcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tYXBEaXNwYXRjaFRvUHJvcHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IHsgd3JhcE1hcFRvUHJvcHNDb25zdGFudCwgd3JhcE1hcFRvUHJvcHNGdW5jIH0gZnJvbSAnLi93cmFwTWFwVG9Qcm9wcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbihtYXBTdGF0ZVRvUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtYXBTdGF0ZVRvUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwU3RhdGVUb1Byb3BzLCAnbWFwU3RhdGVUb1Byb3BzJykgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWFwU3RhdGVUb1Byb3BzSXNNaXNzaW5nKG1hcFN0YXRlVG9Qcm9wcykge1xuICByZXR1cm4gIW1hcFN0YXRlVG9Qcm9wcyA/IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7fTtcbiAgfSkgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFt3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbiwgd2hlbk1hcFN0YXRlVG9Qcm9wc0lzTWlzc2luZ107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tYXBTdGF0ZVRvUHJvcHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWFwU3RhdGVUb1Byb3BzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmltcG9ydCB2ZXJpZnlQbGFpbk9iamVjdCBmcm9tICcuLi91dGlscy92ZXJpZnlQbGFpbk9iamVjdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0TWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcykge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIG93blByb3BzLCBzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBNZXJnZVByb3BzRnVuYyhtZXJnZVByb3BzKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbml0TWVyZ2VQcm9wc1Byb3h5KGRpc3BhdGNoLCBfcmVmKSB7XG4gICAgdmFyIGRpc3BsYXlOYW1lID0gX3JlZi5kaXNwbGF5TmFtZSxcbiAgICAgICAgcHVyZSA9IF9yZWYucHVyZSxcbiAgICAgICAgYXJlTWVyZ2VkUHJvcHNFcXVhbCA9IF9yZWYuYXJlTWVyZ2VkUHJvcHNFcXVhbDtcblxuICAgIHZhciBoYXNSdW5PbmNlID0gZmFsc2U7XG4gICAgdmFyIG1lcmdlZFByb3BzID0gdm9pZCAwO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlUHJvcHNQcm94eShzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcykge1xuICAgICAgdmFyIG5leHRNZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuXG4gICAgICBpZiAoaGFzUnVuT25jZSkge1xuICAgICAgICBpZiAoIXB1cmUgfHwgIWFyZU1lcmdlZFByb3BzRXF1YWwobmV4dE1lcmdlZFByb3BzLCBtZXJnZWRQcm9wcykpIG1lcmdlZFByb3BzID0gbmV4dE1lcmdlZFByb3BzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFzUnVuT25jZSA9IHRydWU7XG4gICAgICAgIG1lcmdlZFByb3BzID0gbmV4dE1lcmdlZFByb3BzO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB2ZXJpZnlQbGFpbk9iamVjdChtZXJnZWRQcm9wcywgZGlzcGxheU5hbWUsICdtZXJnZVByb3BzJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2hlbk1lcmdlUHJvcHNJc0Z1bmN0aW9uKG1lcmdlUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtZXJnZVByb3BzID09PSAnZnVuY3Rpb24nID8gd3JhcE1lcmdlUHJvcHNGdW5jKG1lcmdlUHJvcHMpIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2hlbk1lcmdlUHJvcHNJc09taXR0ZWQobWVyZ2VQcm9wcykge1xuICByZXR1cm4gIW1lcmdlUHJvcHMgPyBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNZXJnZVByb3BzO1xuICB9IDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBbd2hlbk1lcmdlUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWVyZ2VQcm9wc0lzT21pdHRlZF07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tZXJnZVByb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21lcmdlUHJvcHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5pbXBvcnQgdmVyaWZ5U3Vic2VsZWN0b3JzIGZyb20gJy4vdmVyaWZ5U3Vic2VsZWN0b3JzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGltcHVyZUZpbmFsUHJvcHNTZWxlY3RvckZhY3RvcnkobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbXB1cmVGaW5hbFByb3BzU2VsZWN0b3Ioc3RhdGUsIG93blByb3BzKSB7XG4gICAgcmV0dXJuIG1lcmdlUHJvcHMobWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyksIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpLCBvd25Qcm9wcyk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gsIF9yZWYpIHtcbiAgdmFyIGFyZVN0YXRlc0VxdWFsID0gX3JlZi5hcmVTdGF0ZXNFcXVhbCxcbiAgICAgIGFyZU93blByb3BzRXF1YWwgPSBfcmVmLmFyZU93blByb3BzRXF1YWwsXG4gICAgICBhcmVTdGF0ZVByb3BzRXF1YWwgPSBfcmVmLmFyZVN0YXRlUHJvcHNFcXVhbDtcblxuICB2YXIgaGFzUnVuQXRMZWFzdE9uY2UgPSBmYWxzZTtcbiAgdmFyIHN0YXRlID0gdm9pZCAwO1xuICB2YXIgb3duUHJvcHMgPSB2b2lkIDA7XG4gIHZhciBzdGF0ZVByb3BzID0gdm9pZCAwO1xuICB2YXIgZGlzcGF0Y2hQcm9wcyA9IHZvaWQgMDtcbiAgdmFyIG1lcmdlZFByb3BzID0gdm9pZCAwO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUZpcnN0Q2FsbChmaXJzdFN0YXRlLCBmaXJzdE93blByb3BzKSB7XG4gICAgc3RhdGUgPSBmaXJzdFN0YXRlO1xuICAgIG93blByb3BzID0gZmlyc3RPd25Qcm9wcztcbiAgICBzdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG4gICAgZGlzcGF0Y2hQcm9wcyA9IG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpO1xuICAgIG1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG4gICAgaGFzUnVuQXRMZWFzdE9uY2UgPSB0cnVlO1xuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU5ld1Byb3BzQW5kTmV3U3RhdGUoKSB7XG4gICAgc3RhdGVQcm9wcyA9IG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpO1xuXG4gICAgaWYgKG1hcERpc3BhdGNoVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgZGlzcGF0Y2hQcm9wcyA9IG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpO1xuXG4gICAgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVOZXdQcm9wcygpIHtcbiAgICBpZiAobWFwU3RhdGVUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSBzdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG5cbiAgICBpZiAobWFwRGlzcGF0Y2hUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSBkaXNwYXRjaFByb3BzID0gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU5ld1N0YXRlKCkge1xuICAgIHZhciBuZXh0U3RhdGVQcm9wcyA9IG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpO1xuICAgIHZhciBzdGF0ZVByb3BzQ2hhbmdlZCA9ICFhcmVTdGF0ZVByb3BzRXF1YWwobmV4dFN0YXRlUHJvcHMsIHN0YXRlUHJvcHMpO1xuICAgIHN0YXRlUHJvcHMgPSBuZXh0U3RhdGVQcm9wcztcblxuICAgIGlmIChzdGF0ZVByb3BzQ2hhbmdlZCkgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcblxuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVN1YnNlcXVlbnRDYWxscyhuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykge1xuICAgIHZhciBwcm9wc0NoYW5nZWQgPSAhYXJlT3duUHJvcHNFcXVhbChuZXh0T3duUHJvcHMsIG93blByb3BzKTtcbiAgICB2YXIgc3RhdGVDaGFuZ2VkID0gIWFyZVN0YXRlc0VxdWFsKG5leHRTdGF0ZSwgc3RhdGUpO1xuICAgIHN0YXRlID0gbmV4dFN0YXRlO1xuICAgIG93blByb3BzID0gbmV4dE93blByb3BzO1xuXG4gICAgaWYgKHByb3BzQ2hhbmdlZCAmJiBzdGF0ZUNoYW5nZWQpIHJldHVybiBoYW5kbGVOZXdQcm9wc0FuZE5ld1N0YXRlKCk7XG4gICAgaWYgKHByb3BzQ2hhbmdlZCkgcmV0dXJuIGhhbmRsZU5ld1Byb3BzKCk7XG4gICAgaWYgKHN0YXRlQ2hhbmdlZCkgcmV0dXJuIGhhbmRsZU5ld1N0YXRlKCk7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHB1cmVGaW5hbFByb3BzU2VsZWN0b3IobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpIHtcbiAgICByZXR1cm4gaGFzUnVuQXRMZWFzdE9uY2UgPyBoYW5kbGVTdWJzZXF1ZW50Q2FsbHMobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpIDogaGFuZGxlRmlyc3RDYWxsKG5leHRTdGF0ZSwgbmV4dE93blByb3BzKTtcbiAgfTtcbn1cblxuLy8gVE9ETzogQWRkIG1vcmUgY29tbWVudHNcblxuLy8gSWYgcHVyZSBpcyB0cnVlLCB0aGUgc2VsZWN0b3IgcmV0dXJuZWQgYnkgc2VsZWN0b3JGYWN0b3J5IHdpbGwgbWVtb2l6ZSBpdHMgcmVzdWx0cyxcbi8vIGFsbG93aW5nIGNvbm5lY3RBZHZhbmNlZCdzIHNob3VsZENvbXBvbmVudFVwZGF0ZSB0byByZXR1cm4gZmFsc2UgaWYgZmluYWxcbi8vIHByb3BzIGhhdmUgbm90IGNoYW5nZWQuIElmIGZhbHNlLCB0aGUgc2VsZWN0b3Igd2lsbCBhbHdheXMgcmV0dXJuIGEgbmV3XG4vLyBvYmplY3QgYW5kIHNob3VsZENvbXBvbmVudFVwZGF0ZSB3aWxsIGFsd2F5cyByZXR1cm4gdHJ1ZS5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShkaXNwYXRjaCwgX3JlZjIpIHtcbiAgdmFyIGluaXRNYXBTdGF0ZVRvUHJvcHMgPSBfcmVmMi5pbml0TWFwU3RhdGVUb1Byb3BzLFxuICAgICAgaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyA9IF9yZWYyLmluaXRNYXBEaXNwYXRjaFRvUHJvcHMsXG4gICAgICBpbml0TWVyZ2VQcm9wcyA9IF9yZWYyLmluaXRNZXJnZVByb3BzLFxuICAgICAgb3B0aW9ucyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmMiwgWydpbml0TWFwU3RhdGVUb1Byb3BzJywgJ2luaXRNYXBEaXNwYXRjaFRvUHJvcHMnLCAnaW5pdE1lcmdlUHJvcHMnXSk7XG5cbiAgdmFyIG1hcFN0YXRlVG9Qcm9wcyA9IGluaXRNYXBTdGF0ZVRvUHJvcHMoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuICB2YXIgbWFwRGlzcGF0Y2hUb1Byb3BzID0gaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG4gIHZhciBtZXJnZVByb3BzID0gaW5pdE1lcmdlUHJvcHMoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdmVyaWZ5U3Vic2VsZWN0b3JzKG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBvcHRpb25zLmRpc3BsYXlOYW1lKTtcbiAgfVxuXG4gIHZhciBzZWxlY3RvckZhY3RvcnkgPSBvcHRpb25zLnB1cmUgPyBwdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeSA6IGltcHVyZUZpbmFsUHJvcHNTZWxlY3RvckZhY3Rvcnk7XG5cbiAgcmV0dXJuIHNlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gsIG9wdGlvbnMpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3Qvc2VsZWN0b3JGYWN0b3J5LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3NlbGVjdG9yRmFjdG9yeS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgd2FybmluZyBmcm9tICcuLi91dGlscy93YXJuaW5nJztcblxuZnVuY3Rpb24gdmVyaWZ5KHNlbGVjdG9yLCBtZXRob2ROYW1lLCBkaXNwbGF5TmFtZSkge1xuICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHZhbHVlIGZvciAnICsgbWV0aG9kTmFtZSArICcgaW4gJyArIGRpc3BsYXlOYW1lICsgJy4nKTtcbiAgfSBlbHNlIGlmIChtZXRob2ROYW1lID09PSAnbWFwU3RhdGVUb1Byb3BzJyB8fCBtZXRob2ROYW1lID09PSAnbWFwRGlzcGF0Y2hUb1Byb3BzJykge1xuICAgIGlmICghc2VsZWN0b3IuaGFzT3duUHJvcGVydHkoJ2RlcGVuZHNPbk93blByb3BzJykpIHtcbiAgICAgIHdhcm5pbmcoJ1RoZSBzZWxlY3RvciBmb3IgJyArIG1ldGhvZE5hbWUgKyAnIG9mICcgKyBkaXNwbGF5TmFtZSArICcgZGlkIG5vdCBzcGVjaWZ5IGEgdmFsdWUgZm9yIGRlcGVuZHNPbk93blByb3BzLicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2ZXJpZnlTdWJzZWxlY3RvcnMobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZlcmlmeShtYXBTdGF0ZVRvUHJvcHMsICdtYXBTdGF0ZVRvUHJvcHMnLCBkaXNwbGF5TmFtZSk7XG4gIHZlcmlmeShtYXBEaXNwYXRjaFRvUHJvcHMsICdtYXBEaXNwYXRjaFRvUHJvcHMnLCBkaXNwbGF5TmFtZSk7XG4gIHZlcmlmeShtZXJnZVByb3BzLCAnbWVyZ2VQcm9wcycsIGRpc3BsYXlOYW1lKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3ZlcmlmeVN1YnNlbGVjdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC92ZXJpZnlTdWJzZWxlY3RvcnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IHZlcmlmeVBsYWluT2JqZWN0IGZyb20gJy4uL3V0aWxzL3ZlcmlmeVBsYWluT2JqZWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZ2V0Q29uc3RhbnQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGluaXRDb25zdGFudFNlbGVjdG9yKGRpc3BhdGNoLCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnN0YW50ID0gZ2V0Q29uc3RhbnQoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuXG4gICAgZnVuY3Rpb24gY29uc3RhbnRTZWxlY3RvcigpIHtcbiAgICAgIHJldHVybiBjb25zdGFudDtcbiAgICB9XG4gICAgY29uc3RhbnRTZWxlY3Rvci5kZXBlbmRzT25Pd25Qcm9wcyA9IGZhbHNlO1xuICAgIHJldHVybiBjb25zdGFudFNlbGVjdG9yO1xuICB9O1xufVxuXG4vLyBkZXBlbmRzT25Pd25Qcm9wcyBpcyB1c2VkIGJ5IGNyZWF0ZU1hcFRvUHJvcHNQcm94eSB0byBkZXRlcm1pbmUgd2hldGhlciB0byBwYXNzIHByb3BzIGFzIGFyZ3Ncbi8vIHRvIHRoZSBtYXBUb1Byb3BzIGZ1bmN0aW9uIGJlaW5nIHdyYXBwZWQuIEl0IGlzIGFsc28gdXNlZCBieSBtYWtlUHVyZVByb3BzU2VsZWN0b3IgdG8gZGV0ZXJtaW5lXG4vLyB3aGV0aGVyIG1hcFRvUHJvcHMgbmVlZHMgdG8gYmUgaW52b2tlZCB3aGVuIHByb3BzIGhhdmUgY2hhbmdlZC5cbi8vIFxuLy8gQSBsZW5ndGggb2Ygb25lIHNpZ25hbHMgdGhhdCBtYXBUb1Byb3BzIGRvZXMgbm90IGRlcGVuZCBvbiBwcm9wcyBmcm9tIHRoZSBwYXJlbnQgY29tcG9uZW50LlxuLy8gQSBsZW5ndGggb2YgemVybyBpcyBhc3N1bWVkIHRvIG1lYW4gbWFwVG9Qcm9wcyBpcyBnZXR0aW5nIGFyZ3MgdmlhIGFyZ3VtZW50cyBvciAuLi5hcmdzIGFuZFxuLy8gdGhlcmVmb3JlIG5vdCByZXBvcnRpbmcgaXRzIGxlbmd0aCBhY2N1cmF0ZWx5Li5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZXBlbmRzT25Pd25Qcm9wcyhtYXBUb1Byb3BzKSB7XG4gIHJldHVybiBtYXBUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzICE9PSBudWxsICYmIG1hcFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMgIT09IHVuZGVmaW5lZCA/IEJvb2xlYW4obWFwVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgOiBtYXBUb1Byb3BzLmxlbmd0aCAhPT0gMTtcbn1cblxuLy8gVXNlZCBieSB3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbiBhbmQgd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzRnVuY3Rpb24sXG4vLyB0aGlzIGZ1bmN0aW9uIHdyYXBzIG1hcFRvUHJvcHMgaW4gYSBwcm94eSBmdW5jdGlvbiB3aGljaCBkb2VzIHNldmVyYWwgdGhpbmdzOlxuLy8gXG4vLyAgKiBEZXRlY3RzIHdoZXRoZXIgdGhlIG1hcFRvUHJvcHMgZnVuY3Rpb24gYmVpbmcgY2FsbGVkIGRlcGVuZHMgb24gcHJvcHMsIHdoaWNoXG4vLyAgICBpcyB1c2VkIGJ5IHNlbGVjdG9yRmFjdG9yeSB0byBkZWNpZGUgaWYgaXQgc2hvdWxkIHJlaW52b2tlIG9uIHByb3BzIGNoYW5nZXMuXG4vLyAgICBcbi8vICAqIE9uIGZpcnN0IGNhbGwsIGhhbmRsZXMgbWFwVG9Qcm9wcyBpZiByZXR1cm5zIGFub3RoZXIgZnVuY3Rpb24sIGFuZCB0cmVhdHMgdGhhdFxuLy8gICAgbmV3IGZ1bmN0aW9uIGFzIHRoZSB0cnVlIG1hcFRvUHJvcHMgZm9yIHN1YnNlcXVlbnQgY2FsbHMuXG4vLyAgICBcbi8vICAqIE9uIGZpcnN0IGNhbGwsIHZlcmlmaWVzIHRoZSBmaXJzdCByZXN1bHQgaXMgYSBwbGFpbiBvYmplY3QsIGluIG9yZGVyIHRvIHdhcm5cbi8vICAgIHRoZSBkZXZlbG9wZXIgdGhhdCB0aGVpciBtYXBUb1Byb3BzIGZ1bmN0aW9uIGlzIG5vdCByZXR1cm5pbmcgYSB2YWxpZCByZXN1bHQuXG4vLyAgICBcbmV4cG9ydCBmdW5jdGlvbiB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwVG9Qcm9wcywgbWV0aG9kTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gaW5pdFByb3h5U2VsZWN0b3IoZGlzcGF0Y2gsIF9yZWYpIHtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSBfcmVmLmRpc3BsYXlOYW1lO1xuXG4gICAgdmFyIHByb3h5ID0gZnVuY3Rpb24gbWFwVG9Qcm9wc1Byb3h5KHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpIHtcbiAgICAgIHJldHVybiBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA/IHByb3h5Lm1hcFRvUHJvcHMoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcykgOiBwcm94eS5tYXBUb1Byb3BzKHN0YXRlT3JEaXNwYXRjaCk7XG4gICAgfTtcblxuICAgIC8vIGFsbG93IGRldGVjdEZhY3RvcnlBbmRWZXJpZnkgdG8gZ2V0IG93blByb3BzXG4gICAgcHJveHkuZGVwZW5kc09uT3duUHJvcHMgPSB0cnVlO1xuXG4gICAgcHJveHkubWFwVG9Qcm9wcyA9IGZ1bmN0aW9uIGRldGVjdEZhY3RvcnlBbmRWZXJpZnkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcykge1xuICAgICAgcHJveHkubWFwVG9Qcm9wcyA9IG1hcFRvUHJvcHM7XG4gICAgICBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA9IGdldERlcGVuZHNPbk93blByb3BzKG1hcFRvUHJvcHMpO1xuICAgICAgdmFyIHByb3BzID0gcHJveHkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICAgIGlmICh0eXBlb2YgcHJvcHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJveHkubWFwVG9Qcm9wcyA9IHByb3BzO1xuICAgICAgICBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA9IGdldERlcGVuZHNPbk93blByb3BzKHByb3BzKTtcbiAgICAgICAgcHJvcHMgPSBwcm94eShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHZlcmlmeVBsYWluT2JqZWN0KHByb3BzLCBkaXNwbGF5TmFtZSwgbWV0aG9kTmFtZSk7XG5cbiAgICAgIHJldHVybiBwcm9wcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3Qvd3JhcE1hcFRvUHJvcHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3Qvd3JhcE1hcFRvUHJvcHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFByb3ZpZGVyLCB7IGNyZWF0ZVByb3ZpZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL1Byb3ZpZGVyJztcbmltcG9ydCBjb25uZWN0QWR2YW5jZWQgZnJvbSAnLi9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZCc7XG5pbXBvcnQgY29ubmVjdCBmcm9tICcuL2Nvbm5lY3QvY29ubmVjdCc7XG5cbmV4cG9ydCB7IFByb3ZpZGVyLCBjcmVhdGVQcm92aWRlciwgY29ubmVjdEFkdmFuY2VkLCBjb25uZWN0IH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmV4cG9ydCB2YXIgc3Vic2NyaXB0aW9uU2hhcGUgPSBQcm9wVHlwZXMuc2hhcGUoe1xuICB0cnlTdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRyeVVuc3Vic2NyaWJlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBub3RpZnlOZXN0ZWRTdWJzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpc1N1YnNjcmliZWQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn0pO1xuXG5leHBvcnQgdmFyIHN0b3JlU2hhcGUgPSBQcm9wVHlwZXMuc2hhcGUoe1xuICBzdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBnZXRTdGF0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvUHJvcFR5cGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9Qcm9wVHlwZXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLy8gZW5jYXBzdWxhdGVzIHRoZSBzdWJzY3JpcHRpb24gbG9naWMgZm9yIGNvbm5lY3RpbmcgYSBjb21wb25lbnQgdG8gdGhlIHJlZHV4IHN0b3JlLCBhc1xuLy8gd2VsbCBhcyBuZXN0aW5nIHN1YnNjcmlwdGlvbnMgb2YgZGVzY2VuZGFudCBjb21wb25lbnRzLCBzbyB0aGF0IHdlIGNhbiBlbnN1cmUgdGhlXG4vLyBhbmNlc3RvciBjb21wb25lbnRzIHJlLXJlbmRlciBiZWZvcmUgZGVzY2VuZGFudHNcblxudmFyIENMRUFSRUQgPSBudWxsO1xudmFyIG51bGxMaXN0ZW5lcnMgPSB7XG4gIG5vdGlmeTogZnVuY3Rpb24gbm90aWZ5KCkge31cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RlbmVyQ29sbGVjdGlvbigpIHtcbiAgLy8gdGhlIGN1cnJlbnQvbmV4dCBwYXR0ZXJuIGlzIGNvcGllZCBmcm9tIHJlZHV4J3MgY3JlYXRlU3RvcmUgY29kZS5cbiAgLy8gVE9ETzogcmVmYWN0b3IrZXhwb3NlIHRoYXQgY29kZSB0byBiZSByZXVzYWJsZSBoZXJlP1xuICB2YXIgY3VycmVudCA9IFtdO1xuICB2YXIgbmV4dCA9IFtdO1xuXG4gIHJldHVybiB7XG4gICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgbmV4dCA9IENMRUFSRUQ7XG4gICAgICBjdXJyZW50ID0gQ0xFQVJFRDtcbiAgICB9LFxuICAgIG5vdGlmeTogZnVuY3Rpb24gbm90aWZ5KCkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnQgPSBuZXh0O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGlzdGVuZXJzW2ldKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICAgIHZhciBpc1N1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgaWYgKG5leHQgPT09IGN1cnJlbnQpIG5leHQgPSBjdXJyZW50LnNsaWNlKCk7XG4gICAgICBuZXh0LnB1c2gobGlzdGVuZXIpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIGlmICghaXNTdWJzY3JpYmVkIHx8IGN1cnJlbnQgPT09IENMRUFSRUQpIHJldHVybjtcbiAgICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG5leHQgPT09IGN1cnJlbnQpIG5leHQgPSBjdXJyZW50LnNsaWNlKCk7XG4gICAgICAgIG5leHQuc3BsaWNlKG5leHQuaW5kZXhPZihsaXN0ZW5lciksIDEpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBTdWJzY3JpcHRpb24gPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbihzdG9yZSwgcGFyZW50U3ViLCBvblN0YXRlQ2hhbmdlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN1YnNjcmlwdGlvbik7XG5cbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgdGhpcy5wYXJlbnRTdWIgPSBwYXJlbnRTdWI7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gb25TdGF0ZUNoYW5nZTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcbiAgICB0aGlzLmxpc3RlbmVycyA9IG51bGxMaXN0ZW5lcnM7XG4gIH1cblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmFkZE5lc3RlZFN1YiA9IGZ1bmN0aW9uIGFkZE5lc3RlZFN1YihsaXN0ZW5lcikge1xuICAgIHRoaXMudHJ5U3Vic2NyaWJlKCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzLnN1YnNjcmliZShsaXN0ZW5lcik7XG4gIH07XG5cbiAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5ub3RpZnlOZXN0ZWRTdWJzID0gZnVuY3Rpb24gbm90aWZ5TmVzdGVkU3VicygpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5ub3RpZnkoKTtcbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmlzU3Vic2NyaWJlZCA9IGZ1bmN0aW9uIGlzU3Vic2NyaWJlZCgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLnVuc3Vic2NyaWJlKTtcbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnRyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIHRyeVN1YnNjcmliZSgpIHtcbiAgICBpZiAoIXRoaXMudW5zdWJzY3JpYmUpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSB0aGlzLnBhcmVudFN1YiA/IHRoaXMucGFyZW50U3ViLmFkZE5lc3RlZFN1Yih0aGlzLm9uU3RhdGVDaGFuZ2UpIDogdGhpcy5zdG9yZS5zdWJzY3JpYmUodGhpcy5vblN0YXRlQ2hhbmdlKTtcblxuICAgICAgdGhpcy5saXN0ZW5lcnMgPSBjcmVhdGVMaXN0ZW5lckNvbGxlY3Rpb24oKTtcbiAgICB9XG4gIH07XG5cbiAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS50cnlVbnN1YnNjcmliZSA9IGZ1bmN0aW9uIHRyeVVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlKSB7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcbiAgICAgIHRoaXMubGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IG51bGxMaXN0ZW5lcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBTdWJzY3JpcHRpb247XG59KCk7XG5cbmV4cG9ydCB7IFN1YnNjcmlwdGlvbiBhcyBkZWZhdWx0IH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvU3Vic2NyaXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9TdWJzY3JpcHRpb24uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgaWYgKHggPT09IHkpIHtcbiAgICByZXR1cm4geCAhPT0gMCB8fCB5ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIGlmIChpcyhvYmpBLCBvYmpCKSkgcmV0dXJuIHRydWU7XG5cbiAgaWYgKHR5cGVvZiBvYmpBICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8IHR5cGVvZiBvYmpCICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuXG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093bi5jYWxsKG9iakIsIGtleXNBW2ldKSB8fCAhaXMob2JqQVtrZXlzQVtpXV0sIG9iakJba2V5c0FbaV1dKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3NoYWxsb3dFcXVhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvc2hhbGxvd0VxdWFsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0JztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vd2FybmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZlcmlmeVBsYWluT2JqZWN0KHZhbHVlLCBkaXNwbGF5TmFtZSwgbWV0aG9kTmFtZSkge1xuICBpZiAoIWlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgd2FybmluZyhtZXRob2ROYW1lICsgJygpIGluICcgKyBkaXNwbGF5TmFtZSArICcgbXVzdCByZXR1cm4gYSBwbGFpbiBvYmplY3QuIEluc3RlYWQgcmVjZWl2ZWQgJyArIHZhbHVlICsgJy4nKTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3ZlcmlmeVBsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy92ZXJpZnlQbGFpbk9iamVjdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RvcmUgZW5oYW5jZXIgdGhhdCBhcHBsaWVzIG1pZGRsZXdhcmUgdG8gdGhlIGRpc3BhdGNoIG1ldGhvZFxuICogb2YgdGhlIFJlZHV4IHN0b3JlLiBUaGlzIGlzIGhhbmR5IGZvciBhIHZhcmlldHkgb2YgdGFza3MsIHN1Y2ggYXMgZXhwcmVzc2luZ1xuICogYXN5bmNocm9ub3VzIGFjdGlvbnMgaW4gYSBjb25jaXNlIG1hbm5lciwgb3IgbG9nZ2luZyBldmVyeSBhY3Rpb24gcGF5bG9hZC5cbiAqXG4gKiBTZWUgYHJlZHV4LXRodW5rYCBwYWNrYWdlIGFzIGFuIGV4YW1wbGUgb2YgdGhlIFJlZHV4IG1pZGRsZXdhcmUuXG4gKlxuICogQmVjYXVzZSBtaWRkbGV3YXJlIGlzIHBvdGVudGlhbGx5IGFzeW5jaHJvbm91cywgdGhpcyBzaG91bGQgYmUgdGhlIGZpcnN0XG4gKiBzdG9yZSBlbmhhbmNlciBpbiB0aGUgY29tcG9zaXRpb24gY2hhaW4uXG4gKlxuICogTm90ZSB0aGF0IGVhY2ggbWlkZGxld2FyZSB3aWxsIGJlIGdpdmVuIHRoZSBgZGlzcGF0Y2hgIGFuZCBgZ2V0U3RhdGVgIGZ1bmN0aW9uc1xuICogYXMgbmFtZWQgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IG1pZGRsZXdhcmVzIFRoZSBtaWRkbGV3YXJlIGNoYWluIHRvIGJlIGFwcGxpZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgc3RvcmUgZW5oYW5jZXIgYXBwbHlpbmcgdGhlIG1pZGRsZXdhcmUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcGx5TWlkZGxld2FyZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1pZGRsZXdhcmVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgbWlkZGxld2FyZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGNyZWF0ZVN0b3JlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgICAgIHZhciBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcik7XG4gICAgICB2YXIgX2Rpc3BhdGNoID0gc3RvcmUuZGlzcGF0Y2g7XG4gICAgICB2YXIgY2hhaW4gPSBbXTtcblxuICAgICAgdmFyIG1pZGRsZXdhcmVBUEkgPSB7XG4gICAgICAgIGdldFN0YXRlOiBzdG9yZS5nZXRTdGF0ZSxcbiAgICAgICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgICAgIHJldHVybiBfZGlzcGF0Y2goYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNoYWluID0gbWlkZGxld2FyZXMubWFwKGZ1bmN0aW9uIChtaWRkbGV3YXJlKSB7XG4gICAgICAgIHJldHVybiBtaWRkbGV3YXJlKG1pZGRsZXdhcmVBUEkpO1xuICAgICAgfSk7XG4gICAgICBfZGlzcGF0Y2ggPSBjb21wb3NlLmFwcGx5KHVuZGVmaW5lZCwgY2hhaW4pKHN0b3JlLmRpc3BhdGNoKTtcblxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdG9yZSwge1xuICAgICAgICBkaXNwYXRjaDogX2Rpc3BhdGNoXG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2FwcGx5TWlkZGxld2FyZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYXBwbHlNaWRkbGV3YXJlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3IuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb24gY3JlYXRvcnMsIGludG8gYW4gb2JqZWN0IHdpdGggdGhlXG4gKiBzYW1lIGtleXMsIGJ1dCB3aXRoIGV2ZXJ5IGZ1bmN0aW9uIHdyYXBwZWQgaW50byBhIGBkaXNwYXRjaGAgY2FsbCBzbyB0aGV5XG4gKiBtYXkgYmUgaW52b2tlZCBkaXJlY3RseS4gVGhpcyBpcyBqdXN0IGEgY29udmVuaWVuY2UgbWV0aG9kLCBhcyB5b3UgY2FuIGNhbGxcbiAqIGBzdG9yZS5kaXNwYXRjaChNeUFjdGlvbkNyZWF0b3JzLmRvU29tZXRoaW5nKCkpYCB5b3Vyc2VsZiBqdXN0IGZpbmUuXG4gKlxuICogRm9yIGNvbnZlbmllbmNlLCB5b3UgY2FuIGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQsXG4gKiBhbmQgZ2V0IGEgZnVuY3Rpb24gaW4gcmV0dXJuLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBhY3Rpb25DcmVhdG9ycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb25cbiAqIGNyZWF0b3IgZnVuY3Rpb25zLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpbiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhc2BcbiAqIHN5bnRheC4gWW91IG1heSBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2ggVGhlIGBkaXNwYXRjaGAgZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHlvdXIgUmVkdXhcbiAqIHN0b3JlLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFRoZSBvYmplY3QgbWltaWNraW5nIHRoZSBvcmlnaW5hbCBvYmplY3QsIGJ1dCB3aXRoXG4gKiBldmVyeSBhY3Rpb24gY3JlYXRvciB3cmFwcGVkIGludG8gdGhlIGBkaXNwYXRjaGAgY2FsbC4gSWYgeW91IHBhc3NlZCBhXG4gKiBmdW5jdGlvbiBhcyBgYWN0aW9uQ3JlYXRvcnNgLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYWxzbyBiZSBhIHNpbmdsZVxuICogZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyAhPT0gJ29iamVjdCcgfHwgYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBY3Rpb25DcmVhdG9ycyBleHBlY3RlZCBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvbiwgaW5zdGVhZCByZWNlaXZlZCAnICsgKGFjdGlvbkNyZWF0b3JzID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGFjdGlvbkNyZWF0b3JzKSArICcuICcgKyAnRGlkIHlvdSB3cml0ZSBcImltcG9ydCBBY3Rpb25DcmVhdG9ycyBmcm9tXCIgaW5zdGVhZCBvZiBcImltcG9ydCAqIGFzIEFjdGlvbkNyZWF0b3JzIGZyb21cIj8nKTtcbiAgfVxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWN0aW9uQ3JlYXRvcnMpO1xuICB2YXIgYm91bmRBY3Rpb25DcmVhdG9ycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICB2YXIgYWN0aW9uQ3JlYXRvciA9IGFjdGlvbkNyZWF0b3JzW2tleV07XG4gICAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBib3VuZEFjdGlvbkNyZWF0b3JzW2tleV0gPSBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib3VuZEFjdGlvbkNyZWF0b3JzO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2JpbmRBY3Rpb25DcmVhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYmluZEFjdGlvbkNyZWF0b3JzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCB7IEFjdGlvblR5cGVzIH0gZnJvbSAnLi9jcmVhdGVTdG9yZSc7XG5pbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3V0aWxzL3dhcm5pbmcnO1xuXG5mdW5jdGlvbiBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbikge1xuICB2YXIgYWN0aW9uVHlwZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZTtcbiAgdmFyIGFjdGlvbk5hbWUgPSBhY3Rpb25UeXBlICYmICdcIicgKyBhY3Rpb25UeXBlLnRvU3RyaW5nKCkgKyAnXCInIHx8ICdhbiBhY3Rpb24nO1xuXG4gIHJldHVybiAnR2l2ZW4gYWN0aW9uICcgKyBhY3Rpb25OYW1lICsgJywgcmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkLiAnICsgJ1RvIGlnbm9yZSBhbiBhY3Rpb24sIHlvdSBtdXN0IGV4cGxpY2l0bHkgcmV0dXJuIHRoZSBwcmV2aW91cyBzdGF0ZS4gJyArICdJZiB5b3Ugd2FudCB0aGlzIHJlZHVjZXIgdG8gaG9sZCBubyB2YWx1ZSwgeW91IGNhbiByZXR1cm4gbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC4nO1xufVxuXG5mdW5jdGlvbiBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKGlucHV0U3RhdGUsIHJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSkge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBhcmd1bWVudE5hbWUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IEFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cbiAgaWYgKHJlZHVjZXJLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG4gIH1cblxuICBpZiAoIWlzUGxhaW5PYmplY3QoaW5wdXRTdGF0ZSkpIHtcbiAgICByZXR1cm4gJ1RoZSAnICsgYXJndW1lbnROYW1lICsgJyBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFwiJyArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgJ1wiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nICcgKyAoJ2tleXM6IFwiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJyk7XG4gIH1cblxuICB2YXIgdW5leHBlY3RlZEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG4gIH0pO1xuXG4gIHVuZXhwZWN0ZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcbiAgfSk7XG5cbiAgaWYgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgJyArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgJyAnICsgKCdcIicgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArICdcIiBmb3VuZCBpbiAnICsgYXJndW1lbnROYW1lICsgJy4gJykgKyAnRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiAnICsgKCdcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2hhcGUocmVkdWNlcnMpIHtcbiAgT2JqZWN0LmtleXMocmVkdWNlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciByZWR1Y2VyID0gcmVkdWNlcnNba2V5XTtcbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICAgIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgZHVyaW5nIGluaXRpYWxpemF0aW9uLiAnICsgJ0lmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlIHJlZHVjZXIgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCAnICsgJ2V4cGxpY2l0bHkgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgJyArICdub3QgYmUgdW5kZWZpbmVkLiBJZiB5b3UgZG9uXFwndCB3YW50IHRvIHNldCBhIHZhbHVlIGZvciB0aGlzIHJlZHVjZXIsICcgKyAneW91IGNhbiB1c2UgbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9ICdAQHJlZHV4L1BST0JFX1VOS05PV05fQUNUSU9OXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNykuc3BsaXQoJycpLmpvaW4oJy4nKTtcbiAgICBpZiAodHlwZW9mIHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IHR5cGUgfSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCB3aGVuIHByb2JlZCB3aXRoIGEgcmFuZG9tIHR5cGUuICcgKyAoJ0RvblxcJ3QgdHJ5IHRvIGhhbmRsZSAnICsgQWN0aW9uVHlwZXMuSU5JVCArICcgb3Igb3RoZXIgYWN0aW9ucyBpbiBcInJlZHV4LypcIiAnKSArICduYW1lc3BhY2UuIFRoZXkgYXJlIGNvbnNpZGVyZWQgcHJpdmF0ZS4gSW5zdGVhZCwgeW91IG11c3QgcmV0dXJuIHRoZSAnICsgJ2N1cnJlbnQgc3RhdGUgZm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHVubGVzcyBpdCBpcyB1bmRlZmluZWQsICcgKyAnaW4gd2hpY2ggY2FzZSB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUsIHJlZ2FyZGxlc3Mgb2YgdGhlICcgKyAnYWN0aW9uIHR5cGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSBub3QgYmUgdW5kZWZpbmVkLCBidXQgY2FuIGJlIG51bGwuJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBkaWZmZXJlbnQgcmVkdWNlciBmdW5jdGlvbnMsIGludG8gYSBzaW5nbGVcbiAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcbiAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuICogcmVkdWNlciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjb21iaW5lZCBpbnRvIG9uZS4gT25lIGhhbmR5IHdheSB0byBvYnRhaW5cbiAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG4gKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG4gKiBpZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZW0gd2FzIHVuZGVmaW5lZCwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGZvciBhbnlcbiAqIHVucmVjb2duaXplZCBhY3Rpb24uXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHJlZHVjZXIgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGV2ZXJ5IHJlZHVjZXIgaW5zaWRlIHRoZVxuICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2FybmluZygnTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFwiJyArIGtleSArICdcIicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cbiAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuICB2YXIgdW5leHBlY3RlZEtleUNhY2hlID0gdm9pZCAwO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHt9O1xuICB9XG5cbiAgdmFyIHNoYXBlQXNzZXJ0aW9uRXJyb3IgPSB2b2lkIDA7XG4gIHRyeSB7XG4gICAgYXNzZXJ0UmVkdWNlclNoYXBlKGZpbmFsUmVkdWNlcnMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2hhcGVBc3NlcnRpb25FcnJvciA9IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oKSB7XG4gICAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzWzFdO1xuXG4gICAgaWYgKHNoYXBlQXNzZXJ0aW9uRXJyb3IpIHtcbiAgICAgIHRocm93IHNoYXBlQXNzZXJ0aW9uRXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB3YXJuaW5nTWVzc2FnZSA9IGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2Uoc3RhdGUsIGZpbmFsUmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKTtcbiAgICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgICB3YXJuaW5nKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBuZXh0U3RhdGUgPSB7fTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgZmluYWxSZWR1Y2VyS2V5cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfa2V5ID0gZmluYWxSZWR1Y2VyS2V5c1tfaV07XG4gICAgICB2YXIgcmVkdWNlciA9IGZpbmFsUmVkdWNlcnNbX2tleV07XG4gICAgICB2YXIgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW19rZXldO1xuICAgICAgdmFyIG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2UoX2tleSwgYWN0aW9uKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBuZXh0U3RhdGVbX2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG4gICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG4gIH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tYmluZVJlZHVjZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21iaW5lUmVkdWNlcnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb21wb3NlcyBzaW5nbGUtYXJndW1lbnQgZnVuY3Rpb25zIGZyb20gcmlnaHQgdG8gbGVmdC4gVGhlIHJpZ2h0bW9zdFxuICogZnVuY3Rpb24gY2FuIHRha2UgbXVsdGlwbGUgYXJndW1lbnRzIGFzIGl0IHByb3ZpZGVzIHRoZSBzaWduYXR1cmUgZm9yXG4gKiB0aGUgcmVzdWx0aW5nIGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jcyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gb2J0YWluZWQgYnkgY29tcG9zaW5nIHRoZSBhcmd1bWVudCBmdW5jdGlvbnNcbiAqIGZyb20gcmlnaHQgdG8gbGVmdC4gRm9yIGV4YW1wbGUsIGNvbXBvc2UoZiwgZywgaCkgaXMgaWRlbnRpY2FsIHRvIGRvaW5nXG4gKiAoLi4uYXJncykgPT4gZihnKGgoLi4uYXJncykpKS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wb3NlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9O1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmdW5jc1swXTtcbiAgfVxuXG4gIHJldHVybiBmdW5jcy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGEoYi5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbXBvc2UuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbXBvc2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0ICQkb2JzZXJ2YWJsZSBmcm9tICdzeW1ib2wtb2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG5leHBvcnQgdmFyIEFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEByZWR1eC9JTklUJ1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAgICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG4gICAqXG4gICAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAgICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuICAgKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cbiAgICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuICAgKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICAgKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG4gICAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlbmhhbmNlcl0gVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG4gICAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAgICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAgICpcbiAgICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAgICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICAgKi9cbn07ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gIHZhciBfcmVmMjtcblxuICBpZiAodHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbmhhbmNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBlbmhhbmNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICB2YXIgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG4gIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpIHtcbiAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHN0YXRlIHRyZWUgbWFuYWdlZCBieSB0aGUgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuICBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG5cbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuICBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoYWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG11c3QgYmUgcGxhaW4gb2JqZWN0cy4gJyArICdVc2UgY3VzdG9tIG1pZGRsZXdhcmUgZm9yIGFzeW5jIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LiAnICsgJ0hhdmUgeW91IG1pc3NwZWxsZWQgYSBjb25zdGFudD8nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VycyBtYXkgbm90IGRpc3BhdGNoIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFJlZHVjZXIoY3VycmVudFN0YXRlLCBhY3Rpb24pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBsaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG4gICAqXG4gICAqIFlvdSBtaWdodCBuZWVkIHRoaXMgaWYgeW91ciBhcHAgaW1wbGVtZW50cyBjb2RlIHNwbGl0dGluZyBhbmQgeW91IHdhbnQgdG9cbiAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbJCRvYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIF9yZWY7XG4gIH1cblxuICAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuICAvLyByZWR1Y2VyIHJldHVybnMgdGhlaXIgaW5pdGlhbCBzdGF0ZS4gVGhpcyBlZmZlY3RpdmVseSBwb3B1bGF0ZXNcbiAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cbiAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gIHJldHVybiBfcmVmMiA9IHtcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuICB9LCBfcmVmMlskJG9ic2VydmFibGVdID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY3JlYXRlU3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBjcmVhdGVTdG9yZSBmcm9tICcuL2NyZWF0ZVN0b3JlJztcbmltcG9ydCBjb21iaW5lUmVkdWNlcnMgZnJvbSAnLi9jb21iaW5lUmVkdWNlcnMnO1xuaW1wb3J0IGJpbmRBY3Rpb25DcmVhdG9ycyBmcm9tICcuL2JpbmRBY3Rpb25DcmVhdG9ycyc7XG5pbXBvcnQgYXBwbHlNaWRkbGV3YXJlIGZyb20gJy4vYXBwbHlNaWRkbGV3YXJlJztcbmltcG9ydCBjb21wb3NlIGZyb20gJy4vY29tcG9zZSc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3V0aWxzL3dhcm5pbmcnO1xuXG4vKlxuKiBUaGlzIGlzIGEgZHVtbXkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGJlZW4gYWx0ZXJlZCBieSBtaW5pZmljYXRpb24uXG4qIElmIHRoZSBmdW5jdGlvbiBoYXMgYmVlbiBtaW5pZmllZCBhbmQgTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJywgd2FybiB0aGUgdXNlci5cbiovXG5mdW5jdGlvbiBpc0NydXNoZWQoKSB7fVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgaXNDcnVzaGVkLm5hbWUgPT09ICdzdHJpbmcnICYmIGlzQ3J1c2hlZC5uYW1lICE9PSAnaXNDcnVzaGVkJykge1xuICB3YXJuaW5nKCdZb3UgYXJlIGN1cnJlbnRseSB1c2luZyBtaW5pZmllZCBjb2RlIG91dHNpZGUgb2YgTk9ERV9FTlYgPT09IFxcJ3Byb2R1Y3Rpb25cXCcuICcgKyAnVGhpcyBtZWFucyB0aGF0IHlvdSBhcmUgcnVubmluZyBhIHNsb3dlciBkZXZlbG9wbWVudCBidWlsZCBvZiBSZWR1eC4gJyArICdZb3UgY2FuIHVzZSBsb29zZS1lbnZpZnkgKGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2xvb3NlLWVudmlmeSkgZm9yIGJyb3dzZXJpZnkgJyArICdvciBEZWZpbmVQbHVnaW4gZm9yIHdlYnBhY2sgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzAwMzAwMzEpICcgKyAndG8gZW5zdXJlIHlvdSBoYXZlIHRoZSBjb3JyZWN0IGNvZGUgZm9yIHlvdXIgcHJvZHVjdGlvbiBidWlsZC4nKTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlU3RvcmUsIGNvbWJpbmVSZWR1Y2VycywgYmluZEFjdGlvbkNyZWF0b3JzLCBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy91dGlscy93YXJuaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy91dGlscy93YXJuaW5nLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmltcG9ydCBwb255ZmlsbCBmcm9tICcuL3BvbnlmaWxsLmpzJztcblxudmFyIHJvb3Q7XG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9IHBvbnlmaWxsKHJvb3QpO1xuZXhwb3J0IGRlZmF1bHQgcmVzdWx0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuXHRpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChTeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sLm9ic2VydmFibGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbCgnb2JzZXJ2YWJsZScpO1xuXHRcdFx0U3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9ICdAQG9ic2VydmFibGUnO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9wb255ZmlsbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvcG9ueWZpbGwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0Lmxlbmd0aCA8IDEwIHx8ICgvXltzXFxXXSokLykudGVzdChmb3JtYXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUaGUgd2FybmluZyBmb3JtYXQgc2hvdWxkIGJlIGFibGUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyAnICtcbiAgICAgICAgJ3dhcm5pbmcuIFBsZWFzZSwgdXNlIGEgbW9yZSBkZXNjcmlwdGl2ZSBmb3JtYXQgdGhhbjogJyArIGZvcm1hdFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoKHgpIHt9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93YXJuaW5nL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsTW9kdWxlKSB7XHJcblx0aWYoIW9yaWdpbmFsTW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0dmFyIG1vZHVsZSA9IE9iamVjdC5jcmVhdGUob3JpZ2luYWxNb2R1bGUpO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZighbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9oYXJtb255LW1vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2hhcm1vbnktbW9kdWxlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBGaWxlSXRlbSA9ICh7aXRlbSwgb25DbGlja30pID0+IChcclxuICAgIDxkaXY+XHJcbiAgICAgICAge2l0ZW0ubmFtZX0gPGkgb25DbGljaz17b25DbGlja30gY2xhc3NOYW1lPVwiZmEgZmEtY2xvc2VcIj48L2k+XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmNsYXNzIEZpbGVTZWxlY3RvciBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGZvcm0gOiBuZXcgRm9ybURhdGEoKVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaGFuZGxlVXBsb2FkRmlsZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc3RhdGUuZm9ybS5hcHBlbmQoZXZlbnQudGFyZ2V0LmZpbGVzWzBdLnNpemUsIGV2ZW50LnRhcmdldC5maWxlc1swXSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGZvcm0gOiB0aGlzLnN0YXRlLmZvcm1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vICcvZmlsZXMnIGlzIHlvdXIgbm9kZS5qcyByb3V0ZSB0aGF0IHRyaWdnZXJzIG91ciBtaWRkbGV3YXJlXHJcbiAgICAgICAgLyogYXhpb3MucG9zdCgnL2ZpbGVzJywgZGF0YSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTsgLy8gZG8gc29tZXRoaW5nIHdpdGggdGhlIHJlc3BvbnNlXHJcbiAgICAgICAgIH0pOyovXHJcbiAgICB9O1xyXG5cclxuICAgIGdldEl0ZW1zID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBsaXN0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgdGhpcy5zdGF0ZS5mb3JtLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCggdmFsdWUgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbW92ZSA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5mb3JtLmRlbGV0ZShuYW1lKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtmb3JtOnRoaXMuc3RhdGUuZm9ybX0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT57ICQoXCIjaW5wdXQtXCIgKyB0aGlzLnByb3BzLnRhcmdldCkudHJpZ2dlcihcImNsaWNrXCIpICB9fT5VcGxvYWQgRmlsZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiaXMtaGlkZGVuXCJcclxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVVwbG9hZEZpbGV9XHJcbiAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCIucG5nLC5qcGcsIC5wZGYsIC5kb2MsIC5kb2N4XCJcclxuICAgICAgICAgICAgICAgICAgIGlkPXtcImlucHV0LVwiICsgdGhpcy5wcm9wcy50YXJnZXR9XHJcbiAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiICBuYW1lPXt0aGlzLnByb3BzLnRhcmdldCArIFwiW11cIn0gLz5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRJdGVtcygpLm1hcCgoaXRlbSwgaSk9PntcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEZpbGVJdGVtIGtleT17aX0gaXRlbT17aXRlbX0gb25DbGljaz17ICgpID0+IHRoaXMucmVtb3ZlKGl0ZW0uc2l6ZSl9IC8+XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbGVTZWxlY3RvcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0ZpbGVTZWxlY3Rvci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jbGFzcyBTZWFyY2hDb21wZXRpdGlvbiBleHRlbmRzICBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgaW5wdXQ6IFwiXCIsXHJcbiAgICAgICAgICAgIHZhbGlkIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlYXJjaGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWFyY2hEb25lIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlc3VsdHM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaCA9ICgpID0+e1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBzZWFyY2hpbmcgOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5BcGkuc2VhcmNoQ29tcGV0aXRpb24odGhpcy5zdGF0ZS5pbnB1dCkuZG9uZSgocmVzdWx0cyk9PntcclxuICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0cyA6IHJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNlYXJjaERvbmUgOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgaGFuZGxlSW5wdXQgPSAoZSkgPT57XHJcblxyXG4gICAgICAgIGxldCBpbnB1dCA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+KHtcclxuICAgICAgICAgICAgdmFsaWQgOiBpbnB1dC5sZW5ndGggPiAyLFxyXG4gICAgICAgICAgICBpbnB1dCA6IGlucHV0LFxyXG4gICAgICAgICAgICBzZWFyY2hEb25lIDogKCBpbnB1dC5sZW5ndGggPiAwICkgPyBwcmV2U3RhdGUuc2VhcmNoRG9uZSA6IGZhbHNlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtaXRlbS1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIERvIHlvdSB3YW50IHRvIGxpc3QgY29tcGV0aXRpb24tYmFzZWQgY29udGVudD9cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBjb21wZXRpdGlvbiBuYW1lIChlLmcuIEJ1bmRlc2xpZ2EpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGRpc2FibGVkPXshdGhpcy5zdGF0ZS52YWxpZCB8fCB0aGlzLnN0YXRlLnNlYXJjaGluZ30gb25DbGljaz17dGhpcy5zZWFyY2h9PlNlYXJjaDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2VhcmNoaW5nICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCI+PC9pPn1cclxuXHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5yZXN1bHRzLmxlbmd0aCA+IDAgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8dGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Q29tcGV0aXRpb248L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5Db3VudHJ5L0NhdGVnb3J5PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+U3BvcnQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUucmVzdWx0cy5tYXAoICggcmVzdWx0LCBpbmRleCApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHRyIGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntyZXN1bHQubmFtZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntyZXN1bHQuc3BvcnRDYXRlZ29yeS5uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3Jlc3VsdC5zcG9ydC5uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGJ1dHRvbiBvbkNsaWNrPXsgKCkgPT4geyB0aGlzLnByb3BzLnNlbGVjdChyZXN1bHQpIH0gfT5TZWxlY3Q8L2J1dHRvbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zZWFyY2hEb25lICYmIHRoaXMuc3RhdGUucmVzdWx0cy5sZW5ndGggPT09IDAgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICBZb3VyIHNlYXJjaCBcInt0aGlzLnN0YXRlLmlucHV0fVwiIGRpZCBub3QgbWF0Y2ggYW55IHByb2R1Y3RzLlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgeyF0aGlzLnN0YXRlLnNlYXJjaERvbmUgJiYgPHNwYW4+RG8geW91IHdhbnQgdG8gbGlzdCBjb250ZW50LCB3aGljaCBpcyBub3QgcmVsYXRlZCB0byBhIHNwZWNpZmljIGNvbXBldGl0aW9uPzwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2VhcmNoRG9uZSAmJiB0aGlzLnN0YXRlLnJlc3VsdHMubGVuZ3RoID4gMCAmJiA8c3Bhbj5DYW4ndCBmaW5kIHlvdXIgY29tcGV0aXRpb24gaW4gb3VyIGxpc3Q/IDwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2VhcmNoRG9uZSAmJiB0aGlzLnN0YXRlLnJlc3VsdHMubGVuZ3RoID09PSAwICYmIDxzcGFuPlRyeSBhbm90aGVyIHNlYXJjaCBvciBjcmVhdGUgY29udGVudCBtYW51YWxseTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLmNsb3NlfT5DcmVhdGUgY29udGVudCBtYW51YWxseTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ29tcGV0aXRpb247XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9TZWFyY2hDb21wZXRpdGlvbi5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4uLy4uL3NlbGwvc3RvcmUnO1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xyXG5cclxuY29uc3QgY3VzdG9tU3R5bGVzID0ge1xyXG4gICAgY29udGVudCA6IHtcclxuICAgICAgICB0b3AgICAgICAgICAgICAgICAgICAgOiAnNTAlJyxcclxuICAgICAgICBsZWZ0ICAgICAgICAgICAgICAgICAgOiAnNTAlJyxcclxuICAgICAgICByaWdodCAgICAgICAgICAgICAgICAgOiAnYXV0bycsXHJcbiAgICAgICAgYm90dG9tICAgICAgICAgICAgICAgIDogJ2F1dG8nLFxyXG4gICAgICAgIG1hcmdpblJpZ2h0ICAgICAgICAgICA6ICctNTAlJyxcclxuICAgICAgICB0cmFuc2Zvcm0gICAgICAgICAgICAgOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJ1xyXG4gICAgfVxyXG59O1xyXG5cclxuTW9kYWwuc2V0QXBwRWxlbWVudCgnI3NlbGwtZm9ybS1jb250YWluZXInKTtcclxuXHJcbmNvbnN0IFNlbGVjdG9ySXRlbSA9ICh7bGFiZWwsIHNlbGVjdGVkLCBvbkNsaWNrLCBkaXNhYmxlZH0pID0+IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtcInNlbGVjdG9yLWl0ZW0gXCIgKyAoKHNlbGVjdGVkKSA/XCJzZWxlY3Rvci1pdGVtLXNlbGVjdGVkIFwiOiBcIlwiKSArIChkaXNhYmxlZCAmJiBcInNlbGVjdG9yLWl0ZW0tZGlzYWJsZWRcIikgfSBvbkNsaWNrPXshZGlzYWJsZWQgJiYgb25DbGlja30+XHJcbiAgICAgICAge2xhYmVsfVxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5cclxuY2xhc3MgU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB1cGRhdGVkIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGZpbHRlclVwZGF0ZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgb3BlbiA6IHByb3BzLnNlbGVjdG9yLFxyXG4gICAgICAgICAgICBzZWxlY3Rvckl0ZW1zIDogcHJvcHMuc2VsZWN0b3JJdGVtcyB8fCBbXSxcclxuICAgICAgICAgICAgcG9wdWxhckl0ZW1zIDogcHJvcHMucG9wdWxhckl0ZW1zIHx8IFtdLFxyXG4gICAgICAgICAgICBmaWx0ZXIgOiB7XHJcbiAgICAgICAgICAgICAgICBcImFnXCIgOiB7IHR5cGU6IFwiZmlyc3RMZXR0ZXJcIiwgdmFsdWVzOiBbXCJhXCIsJ2InLCdjJywnZCcsJ2UnLCdmJywnZyddIH0sXHJcbiAgICAgICAgICAgICAgICBcImhuXCIgOiB7IHR5cGU6IFwiZmlyc3RMZXR0ZXJcIiwgdmFsdWVzOiBbXCJoXCIsJ2knLCdqJywnaycsJ2wnLCdrJywnbiddIH0sXHJcbiAgICAgICAgICAgICAgICBcIm90XCIgOiB7IHR5cGU6IFwiZmlyc3RMZXR0ZXJcIiwgdmFsdWVzOiBbXCJvXCIsJ3AnLCdxJywncicsJ3MnLCd0J10gfSxcclxuICAgICAgICAgICAgICAgIFwidXpcIiA6IHsgdHlwZTogXCJmaXJzdExldHRlclwiLCB2YWx1ZXM6IFtcInVcIiwndicsJ3cnLCd4JywneScsJ3onXSB9LFxyXG4gICAgICAgICAgICAgICAgXCJwb3B1bGFyXCIgOiB7IHR5cGU6IFwib3JpZ2luXCIsIHZhbHVlOiBcInBvcHVsYXJJdGVtc1wifSxcclxuICAgICAgICAgICAgICAgIFwiaW50ZXJuYXRpb25hbFwiIDogeyB0eXBlOiBcImludGVybmF0aW9uYWxcIiwgdmFsdWU6IFwiaW50ZXJuYXRpb25hbFwifSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogcHJvcHMuYWN0aXZlRmlsdGVyIHx8IFwiYWdcIixcclxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtIDoge30sXHJcbiAgICAgICAgICAgIGRpc2FibGVkIDogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKGEpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+e1xyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XHJcblxyXG4gICAgICAgIGxldCBkaXNhYmxlZDtcclxuXHJcbiAgICAgICAgaWYgKCBuZXh0UHJvcHMubXVsdGlwbGUgJiYgbmV4dFByb3BzLmluZGV4ID4gMCApe1xyXG5cclxuICAgICAgICAgICAgZGlzYWJsZWQgPSBuZXh0UHJvcHMuc2VsZWN0ZWQuZmlsdGVyKChpdGVtLGkpPT57XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAhPT0gbmV4dFByb3BzLmluZGV4XHJcbiAgICAgICAgICAgIH0pLm1hcCgoaXRlbSk9PntcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmV4dGVybmFsSWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGlzYWJsZWQgOiBkaXNhYmxlZH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkaXNhYmxlZCA6IFtdfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5Nb2RhbCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLm9wZW5TZWxlY3RvcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZnRlck9wZW5Nb2RhbCA9ICgpID0+IHtcclxuICAgICAgICAvLyByZWZlcmVuY2VzIGFyZSBub3cgc3luYydkIGFuZCBjYW4gYmUgYWNjZXNzZWQuXHJcbiAgICAgICAgLy90aGlzLnN1YnRpdGxlLnN0eWxlLmNvbG9yID0gJyNmMDAnO1xyXG4gICAgfTtcclxuXHJcbiAgICBjbG9zZU1vZGFsID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1cGRhdGVkOiBmYWxzZSwgZmlsdGVyVXBkYXRlZCA6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMucHJvcHMuY2xvc2VTZWxlY3RvcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRBY3RpdmVGaWx0ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZUZpbHRlciA9IHRoaXMuZ2V0QWN0aXZlRmlsdGVyTmFtZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmZpbHRlclthY3RpdmVGaWx0ZXJdO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRBY3RpdmVGaWx0ZXJOYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoIHRoaXMucHJvcHMuYWN0aXZlRmlsdGVyICYmICF0aGlzLnN0YXRlLmZpbHRlclVwZGF0ZWQgKSA/IHRoaXMucHJvcHMuYWN0aXZlRmlsdGVyIDogdGhpcy5zdGF0ZS5hY3RpdmVGaWx0ZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIHNob3VsZFNob3dGaWx0ZXJzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0b3JJdGVtcyAmJiB0aGlzLnByb3BzLnNlbGVjdG9ySXRlbXMubGVuZ3RoID4gMzBcclxuICAgIH07XHJcblxyXG4gICAgc2hvdWxkU2hvd0ludGVybmF0aW9uYWxGaWx0ZXIgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBzaG93ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuc2VsZWN0b3JJdGVtcy5zb21lKCAoIGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc2hvdyA9IGl0ZW0ubmFtZS5tYXRjaCgvaW50ZXJuYXRpb25hbC9naSkgIT09IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBzaG93O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc2hvdztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHNldEFjdGl2ZUZpbHRlciA9ICggZmlsdGVyTmFtZSApID0+e1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgYWN0aXZlRmlsdGVyOiBmaWx0ZXJOYW1lLGZpbHRlclVwZGF0ZWQgOiB0cnVlfSlcclxuICAgIH07XHJcblxyXG4gICAgYXBwbHlTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVwZGF0ZWQ6IGZhbHNlLCBmaWx0ZXJVcGRhdGVkIDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5hcHBseVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdG9yVHlwZSwgdGhpcy5zdGF0ZS5zZWxlY3RlZEl0ZW0sIHRoaXMucHJvcHMubXVsdGlwbGUsIHRoaXMucHJvcHMuaW5kZXgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGROZXdTcG9ydCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXBkYXRlZDogZmFsc2UsIGZpbHRlclVwZGF0ZWQgOiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLmFkZE5ld1Nwb3J0KCk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZVNlbGVjdG9yKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZE5ld1RvdXJuYW1lbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVwZGF0ZWQ6IGZhbHNlLCBmaWx0ZXJVcGRhdGVkIDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5hZGROZXdUb3VybmFtZW50KCk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZVNlbGVjdG9yKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGVjdEl0ZW0gPSAoIGl0ZW0gKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkSXRlbSA6IGl0ZW0sIHVwZGF0ZWQ6IHRydWUgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlzSXRlbVNlbGVjdGVkID0gKCBpdGVtICkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMuc3RhdGUudXBkYXRlZCApe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5zZWxlY3RlZEl0ZW0uZXh0ZXJuYWxJZCA9PT0gaXRlbS5leHRlcm5hbElkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMucHJvcHMuc2VsZWN0ZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdGVkLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICh0aGlzLnByb3BzLm11bHRpcGxlICYmIHRoaXMucHJvcHMuc2VsZWN0ZWRbdGhpcy5wcm9wcy5pbmRleF0pID8gdGhpcy5wcm9wcy5zZWxlY3RlZFt0aGlzLnByb3BzLmluZGV4XS5leHRlcm5hbElkID09PSBpdGVtLmV4dGVybmFsSWRcclxuICAgICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5zZWxlY3RlZC5leHRlcm5hbElkID09PSBpdGVtLmV4dGVybmFsSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpc0l0ZW1EaXNhYmxlZCA9ICggaXRlbSApID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlzYWJsZWQubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZGlzYWJsZWQuaW5kZXhPZihpdGVtLmV4dGVybmFsSWQpICE9PSAtMTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIGZpbHRlckxldHRlciA9IChpdGVtKSA9PntcclxuICAgICAgICBsZXQgZmlsdGVyID0gdGhpcy5nZXRBY3RpdmVGaWx0ZXIoKTtcclxuICAgICAgICByZXR1cm4gZmlsdGVyLnZhbHVlcy5pbmRleE9mKGl0ZW0ubmFtZVswXS50b0xvd2VyQ2FzZSgpKSAhPT0gLTFcclxuICAgIH07XHJcblxyXG4gICAgZmlsdGVySW50ZXJuYXRpb25hbCA9IChpdGVtKSA9PntcclxuICAgICAgICByZXR1cm4gaXRlbS5uYW1lLm1hdGNoKC9pbnRlcm5hdGlvbmFsL2dpKSAhPT0gbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICBnZXRJdGVtcyA9ICgpID0+e1xyXG4gICAgICAgIGxldCBmaWx0ZXIgPSB0aGlzLmdldEFjdGl2ZUZpbHRlcigpO1xyXG4gICAgICAgIGlmICggZmlsdGVyLnR5cGUgPT09IFwib3JpZ2luXCIgKSByZXR1cm4gdGhpcy5wcm9wc1tmaWx0ZXIudmFsdWVdO1xyXG5cclxuICAgICAgICBpZiAoIGZpbHRlci50eXBlID09PSBcImludGVybmF0aW9uYWxcIiApIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdG9ySXRlbXMuZmlsdGVyKHRoaXMuZmlsdGVySW50ZXJuYXRpb25hbCk7XHJcblxyXG4gICAgICAgIGlmICggZmlsdGVyLnR5cGUgPT09IFwiZmlyc3RMZXR0ZXJcIikge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhdGhpcy5zaG91bGRTaG93RmlsdGVycygpICkgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0b3JJdGVtcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdG9ySXRlbXMuZmlsdGVyKHRoaXMuZmlsdGVyTGV0dGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbFxyXG4gICAgICAgICAgICAgICAgaXNPcGVuPXt0aGlzLnByb3BzLm9wZW59XHJcbiAgICAgICAgICAgICAgICBvbkFmdGVyT3Blbj17dGhpcy5hZnRlck9wZW5Nb2RhbH1cclxuICAgICAgICAgICAgICAgIG9uUmVxdWVzdENsb3NlPXt0aGlzLmNsb3NlTW9kYWx9XHJcbiAgICAgICAgICAgICAgICBib2R5T3BlbkNsYXNzTmFtZT17XCJzZWxlY3RvclwifVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e2N1c3RvbVN0eWxlc31cclxuICAgICAgICAgICAgICAgIGNvbnRlbnRMYWJlbD1cIkV4YW1wbGUgTW9kYWxcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7Lyo8aDIgcmVmPXtzdWJ0aXRsZSA9PiB0aGlzLnN1YnRpdGxlID0gc3VidGl0bGV9PkhlbGxvPC9oMj4qL31cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnBvcHVsYXJJdGVtcyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcInNlbGVjdG9yLWZpbHRlciBcIiArICh0aGlzLmdldEFjdGl2ZUZpbHRlck5hbWUoKSA9PT0gXCJwb3B1bGFyXCIgJiYgXCJzZWxlY3Rvci1maWx0ZXItYWN0aXZlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnsgdGhpcy5zZXRBY3RpdmVGaWx0ZXIoXCJwb3B1bGFyXCIpfX0+UG9wdWxhcjwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc2hvdWxkU2hvd0ZpbHRlcnMoKSAmJiA8YnV0dG9uIGNsYXNzTmFtZT17XCJzZWxlY3Rvci1maWx0ZXIgXCIgKyAodGhpcy5nZXRBY3RpdmVGaWx0ZXJOYW1lKCkgPT09IFwiYWdcIiAmJiBcInNlbGVjdG9yLWZpbHRlci1hY3RpdmVcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+eyB0aGlzLnNldEFjdGl2ZUZpbHRlcihcImFnXCIpfX0+QS1HPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zaG91bGRTaG93RmlsdGVycygpICYmIDxidXR0b24gY2xhc3NOYW1lPXtcInNlbGVjdG9yLWZpbHRlciBcIiArICh0aGlzLmdldEFjdGl2ZUZpbHRlck5hbWUoKSA9PT0gXCJoblwiICYmIFwic2VsZWN0b3ItZmlsdGVyLWFjdGl2ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwiaG5cIil9fT5ILU48L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnNob3VsZFNob3dGaWx0ZXJzKCkgJiYgPGJ1dHRvbiBjbGFzc05hbWU9e1wic2VsZWN0b3ItZmlsdGVyIFwiICsgKHRoaXMuZ2V0QWN0aXZlRmlsdGVyTmFtZSgpID09PSBcIm90XCIgJiYgXCJzZWxlY3Rvci1maWx0ZXItYWN0aXZlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnsgdGhpcy5zZXRBY3RpdmVGaWx0ZXIoXCJvdFwiKX19Pk8tVDwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc2hvdWxkU2hvd0ZpbHRlcnMoKSAmJiA8YnV0dG9uIGNsYXNzTmFtZT17XCJzZWxlY3Rvci1maWx0ZXIgXCIgKyAodGhpcy5nZXRBY3RpdmVGaWx0ZXJOYW1lKCkgPT09IFwidXpcIiAmJiBcInNlbGVjdG9yLWZpbHRlci1hY3RpdmVcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+eyB0aGlzLnNldEFjdGl2ZUZpbHRlcihcInV6XCIpfX0+VS1aPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgICAgIHsgIHRoaXMuc2hvdWxkU2hvd0ludGVybmF0aW9uYWxGaWx0ZXIoKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcInNlbGVjdG9yLWZpbHRlciBcIiArICh0aGlzLmdldEFjdGl2ZUZpbHRlck5hbWUoKSA9PT0gXCJpbnRlcm5hdGlvbmFsXCIgJiYgXCJzZWxlY3Rvci1maWx0ZXItYWN0aXZlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnsgdGhpcy5zZXRBY3RpdmVGaWx0ZXIoXCJpbnRlcm5hdGlvbmFsXCIpfX0+SW50ZXJuYXRpb25hbDwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3Rvci1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldEl0ZW1zKCkubWFwKGZ1bmN0aW9uKGl0ZW0sIGkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFNlbGVjdG9ySXRlbSBrZXk9e2l9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXtpdGVtLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBfdGhpcy5zZWxlY3RJdGVtKGl0ZW0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17IF90aGlzLmlzSXRlbVNlbGVjdGVkKGl0ZW0pIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyBfdGhpcy5pc0l0ZW1EaXNhYmxlZChpdGVtKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5jbG9zZU1vZGFsfT5DYW5jZWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuYXBwbHlTZWxlY3Rpb259IGRpc2FibGVkPXshdGhpcy5zdGF0ZS51cGRhdGVkfT5BcHBseTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+Q2FuJ3QgZmluZCB5b3VyIHNwb3J0IGluIHRoZSBsaXN0PyA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zaG93TmV3U3BvcnQgJiYgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmFkZE5ld1Nwb3J0fSA+QWRkIG5ldyBTcG9ydDwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zaG93TmV3VG91cm5hbWVudCAmJiA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuYWRkTmV3VG91cm5hbWVudH0gPkFkZCBuZXcgVG91cm5hbWVudDwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICggc3RhdGUgKSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGUuc2VsZWN0b3JJbmZvXHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9wZW5TZWxlY3RvciA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdPUEVOX1NFTEVDVE9SJ1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGNsb3NlU2VsZWN0b3IgOiAoKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnQ0xPU0VfU0VMRUNUT1InXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYXBwbHlTZWxlY3Rpb24gOiAoc2VsZWN0b3JUeXBlLCBzZWxlY3RlZEl0ZW0sIG11bHRpcGxlLCBpbmRleCkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogJ0FQUExZX1NFTEVDVElPTicsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yVHlwZSA6IHNlbGVjdG9yVHlwZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtIDogc2VsZWN0ZWRJdGVtLFxyXG4gICAgICAgICAgICBtdWx0aXBsZSA6IG11bHRpcGxlLFxyXG4gICAgICAgICAgICBpbmRleCA6IGluZGV4XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYWRkTmV3U3BvcnQgOiAoKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnQUREX05FV19TUE9SVCcsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYWRkTmV3VG91cm5hbWVudCA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdBRERfTkVXX1RPVVJOQU1FTlQnLFxyXG4gICAgICAgIH0pLFxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGVjdG9yKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9TZWxlY3Rvci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQYWNrYWdlU2VsZWN0b3IgZnJvbSBcIi4uL2NvbnRhaW5lcnMvUGFja2FnZVNlbGVjdG9yXCI7XHJcbmltcG9ydCBTZWxsQnV0dG9ucyBmcm9tIFwiLi4vY29udGFpbmVycy9idXR0b25zXCI7XHJcbmltcG9ydCBTZWxsRm9ybVN0ZXBzIGZyb20gXCIuLi9jb250YWluZXJzL1NlbGxGb3JtU3RlcHNcIjtcclxuaW1wb3J0IFNlbGxGb3JtU3RlcDEgZnJvbSBcIi4uL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwMVwiO1xyXG5pbXBvcnQgU2VsZWN0b3IgZnJvbSBcIi4uLy4uL21haW4vY29tcG9uZW50cy9TZWxlY3RvclwiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tICcuLi9zdG9yZSc7XHJcblxyXG5cclxuY2xhc3MgU2VsbEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgY29udGVudCA6IEpTT04ucGFyc2UocHJvcHMuY29udGVudClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKGEpID0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzdG9yZS5nZXRTdGF0ZSgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+e1xyXG4gICAgICAgIHRoaXMucHJvcHMuY29udGVudExpc3RpbmdJbml0KCB0aGlzLnN0YXRlLmNvbnRlbnQgKTtcclxuICAgIH0gO1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxTZWxlY3RvciAvPlxyXG4gICAgICAgICAgICAgICAgPFNlbGxGb3JtU3RlcHMgLz5cclxuICAgICAgICAgICAgICAgIDxTZWxsRm9ybVN0ZXAxLz5cclxuICAgICAgICAgICAgICAgIDxQYWNrYWdlU2VsZWN0b3Igey4uLiB0aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgPFNlbGxCdXR0b25zIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICggc3RhdGUsIG93blByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gb3duUHJvcHM7XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvbnRlbnRMaXN0aW5nSW5pdCA6IChjb250ZW50KSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnQ09OVEVOVF9JTklUJyxcclxuICAgICAgICAgICAgY29udGVudDogY29udGVudFxyXG4gICAgICAgIH0pLFxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxGb3JtKVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9TZWxsRm9ybS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuXHJcbmNvbnN0IFN1cGVyUmlnaHQgPSAoe3N1cGVyUmlnaHQsIG9uQ2hhbmdlLCBjaGVja2VkfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3QtYm94LWl0ZW1cIiA+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3QtYm94LWNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxyXG4gICAgICAgICAgICAgICAgICAgZGVmYXVsdENoZWNrZWQ9e2NoZWNrZWR9XHJcbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ICgpID0+IG9uQ2hhbmdlKHN1cGVyUmlnaHQpfVxyXG4gICAgICAgICAgICAgICAgICAgaWQ9e1wic3VwZXItcmlnaHQtXCIgKyBzdXBlclJpZ2h0LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicGFja2FnZS1zZWxlY3RvclwiIC8+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17XCJzdXBlci1yaWdodC1cIiArIHN1cGVyUmlnaHQuaWR9PjwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3QtYm94LWl0ZW0tbGFiZWxcIj5cclxuICAgICAgICAgICAgeyBzdXBlclJpZ2h0Lm5hbWUgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5jbGFzcyBQYWNrYWdlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcGFja2FnZXMgOiBKU09OLnBhcnNlKHByb3BzLnBhY2thZ2VzKSxcclxuICAgICAgICAgICAgY29udGVudCA6IEpTT04ucGFyc2UocHJvcHMuY29udGVudClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5saXN0aW5nSW5mby5zdGVwID09PSAyICYmIDxkaXYgY2xhc3NOYW1lPVwiYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3gtdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUGljayByaWdodHNcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGxlci1ib3gtY29udGVudCBzZWxsZXItYm94LXBhY2thZ2VzXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUucGFja2FnZXMubWFwKGZ1bmN0aW9uKHN1cGVyUmlnaHQsIGkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxTdXBlclJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtzdXBlclJpZ2h0LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyUmlnaHQ9e3N1cGVyUmlnaHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17IENvbnRlbnRBcmVuYS5VdGlscy5nZXRJbmRleCggc3VwZXJSaWdodC5pZCwgX3RoaXMucHJvcHMubGlzdGluZ0luZm8ucmlnaHRzX3BhY2thZ2UsIFwiaWRcIikgIT09IC0xIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17IF90aGlzLnByb3BzLnN1cGVyUmlnaHRzVXBkYXRlZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbGlzdGluZ0luZm8gOiBzdGF0ZS5saXN0aW5nSW5mb1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdXBlclJpZ2h0c1VwZGF0ZWQgOiAocmlnaHRzX3BhY2thZ2UpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdTVVBFUl9SSUdIVFNfVVBEQVRFRCcsXHJcbiAgICAgICAgICAgIHJpZ2h0c19wYWNrYWdlOiByaWdodHNfcGFja2FnZVxyXG4gICAgICAgIH0pLFxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFBhY2thZ2VTZWxlY3RvcilcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvUGFja2FnZVNlbGVjdG9yLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgRmlsZVNlbGVjdG9yIGZyb20gJy4uLy4uL21haW4vY29tcG9uZW50cy9GaWxlU2VsZWN0b3InXHJcbmltcG9ydCBTZWFyY2hDb21wZXRpdGlvbiBmcm9tICcuLi8uLi9tYWluL2NvbXBvbmVudHMvU2VhcmNoQ29tcGV0aXRpb24nXHJcbmNvbnN0IERlc2NyaXB0aW9uID0gKHt2YWx1ZSwgb25CbHVyfSkgPT4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtaXRlbS1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICBQcm92aWRlIGEgc2hvcnQgZGVzY3JpcHRpb24gb2YgeW91ciBjb250ZW50IGxpc3RpbmdcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8dGV4dGFyZWEgb25CbHVyPXtvbkJsdXJ9IHZhbHVlPXt2YWx1ZX0+PC90ZXh0YXJlYT5cclxuICAgIDwvZGl2PlxyXG4pO1xyXG5cclxuY29uc3QgV2Vic2l0ZSA9ICh7dmFsdWUsIG9uQmx1cn0pID0+IChcclxuICAgIDxkaXY+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIndlYnNpdGVcIlxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIG9uQmx1cj17b25CbHVyfVxyXG4gICAgICAgICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2Vic2l0ZVwiLz5cclxuICAgIDwvZGl2PlxyXG4pO1xyXG5cclxuY29uc3QgTmV3U3BvcnQgPSAoe29uQ2xpY2t9KSA9PiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJuZXctc3BvcnRcIlxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgc3BvcnRcIi8+XHJcbiAgICAgICAgPGkgb25DbGljaz17b25DbGlja30gY2xhc3NOYW1lPVwiZmEgZmEtY2xvc2VcIj48L2k+XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmNvbnN0IE5ld0NhdGVnb3J5ID0gKHt9KSA9PiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJuZXctY2F0ZWdvcnlcIlxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgY2F0ZWdvcnlcIi8+XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmNvbnN0IE5ld1RvdXJuYW1lbnQgPSAoe29uQ2xpY2ssIHNob3dDbG9zZSwgb25CbHVyLCB2YWx1ZX0pID0+IChcclxuICAgIDxkaXY+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5ldy1jYXRlZ29yeVwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dmFsdWV9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgY29tcGV0aXRpb24gbmFtZVwiLz5cclxuICAgICAgICB7IHNob3dDbG9zZSAmJiA8aSBvbkNsaWNrPXtvbkNsaWNrfSBjbGFzc05hbWU9XCJmYSBmYS1jbG9zZVwiPjwvaT59XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuY29uc3QgU2NoZWR1bGVzID0gKHtzY2hlZHVsZXN9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNjaGVkdWxlXCI+XHJcbiAgICAgICAgeyBzY2hlZHVsZXMgJiYgT2JqZWN0LmtleXMoc2NoZWR1bGVzKS5tYXAoKCBudW1iZXIsIGkgKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiA8Um91bmQga2V5PXtpfSByb3VuZD17bnVtYmVyfSBzY2hlZHVsZT17c2NoZWR1bGVzW251bWJlcl19IC8+XHJcbiAgICAgICAgfSkgfVxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5jbGFzcyBSb3VuZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcm91bmQgOiBwcm9wcy5yb3VuZCxcclxuICAgICAgICAgICAgc2NoZWR1bGUgOiBwcm9wcy5zY2hlZHVsZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgbWF0Y2hlcyA6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGlsZCA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSA9IChlKSA9PiB7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+ICh7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAhcHJldlN0YXRlLnNlbGVjdGVkXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkLmZvckVhY2goIChpdGVtKSA9PiBpdGVtLnVwZGF0ZSggIXRoaXMuc3RhdGUuc2VsZWN0ZWQpICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRvZ2dsZU1hdGNoZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiAoe1xyXG4gICAgICAgICAgICBtYXRjaGVzOiAhcHJldlN0YXRlLm1hdGNoZXNcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJtYXRjaGRheSBcIiArICggKHRoaXMuc3RhdGUuc2VsZWN0ZWQpID8gXCJzZWxlY3RlZFwiIDogXCJcIiApfSBvbkNsaWNrPXt0aGlzLnRvZ2dsZU1hdGNoZXN9PlxyXG4gICAgICAgICAgICAgICAgICAgIE1hdGNoZGF5IHt0aGlzLnN0YXRlLnJvdW5kfVxyXG4gICAgICAgICAgICAgICAgICAgIHshdGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiA8c3BhbiBvbkNsaWNrPXt0aGlzLnRvZ2dsZX0+U2VsZWN0IG1hdGNoZGF5PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiA8c3BhbiBvbkNsaWNrPXt0aGlzLnRvZ2dsZX0+VW5zZWxlY3Q8L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5tYXRjaGVzICYmIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2NoZWR1bGUubGVuZ3RoID4gMCAmJiB0aGlzLnN0YXRlLnNjaGVkdWxlLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE1hdGNoIG1hdGNoPXtpdGVtfSBrZXk9e2l9IHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdGVkfSBvblJlZj17cmVmID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcmVmICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGQucHVzaChyZWYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGQgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0vPlxyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1hdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG1hdGNoIDogcHJvcHMubWF0Y2gsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkIDogcHJvcHMuc2VsZWN0ZWQgfHwgZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblJlZih0aGlzKVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblJlZih1bmRlZmluZWQpXHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4gKHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6ICFwcmV2U3RhdGUuc2VsZWN0ZWRcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZSA9IChzZWxlY3RlZCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkOiBzZWxlY3RlZH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCBjb21wZXRpdG9yc0xlbiA9IHRoaXMucHJvcHMubWF0Y2guY29tcGV0aXRvcnMubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm1hdGNoIFwiICsgKCAodGhpcy5zdGF0ZS5zZWxlY3RlZCkgPyBcInNlbGVjdGVkXCIgOiBcIlwiICl9IG9uQ2xpY2s9e3RoaXMudG9nZ2xlfT5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLm1hdGNoLmNvbXBldGl0b3JzLm1hcCgoIGNvbXBldGl0b3IsIGkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGtleT17aX0+e2NvbXBldGl0b3IubmFtZX0geyhjb21wZXRpdG9yc0xlbiAhPT0gaSArIDEpICYmIFwiIHZzIFwiIH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNlbGVjdGVkICYmIDxzcGFuIGNsYXNzTmFtZT17XCJzZWxlY3RcIn0+VW5zZWxlY3Q8L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgeyF0aGlzLnN0YXRlLnNlbGVjdGVkICYmIDxzcGFuIGNsYXNzTmFtZT17XCJzZWxlY3RcIn0+U2VsZWN0IG1hdGNoPC9zcGFuPn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTZWFzb25TZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzaG93U2NoZWR1bGUgOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4gKHtcclxuICAgICAgICAgICAgc2hvd1NjaGVkdWxlOiAhcHJldlN0YXRlLnNob3dTY2hlZHVsZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmxvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub3BlblNlbGVjdG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17XCJTZWFzb25cIn0gIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmxvYWRpbmcgJiYgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIi8+fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zY2hlZHVsZXMgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMudG9nZ2xlfT5FdmVudCBsaXN0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zaG93U2NoZWR1bGUgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8U2NoZWR1bGVzIHNjaGVkdWxlcz17dGhpcy5wcm9wcy5zY2hlZHVsZXN9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNob3dBZGROZXcgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMuYWRkU2Vhc29ufT5BZGQgbmV3IHNlYXNvbjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNwb3J0U2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+ICh7XHJcbiAgICAgICAgICAgIHNob3dTY2hlZHVsZTogIXByZXZTdGF0ZS5zaG93U2NoZWR1bGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLmlucHV0UHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtcIlNwb3J0XCJ9ICAvPlxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuc2hvd0Nsb3NlICYmIDxpIG9uQ2xpY2s9e3RoaXMucHJvcHMucmVtb3ZlfSBjbGFzc05hbWU9XCJmYSBmYS1jbG9zZVwiLz59XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zaG93QWRkTmV3ICYmIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLmFkZE5ld1Nwb3J0fT5BZGQgbmV3IHNwb3J0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNlbGxGb3JtU3RlcDEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlIDogXCJTdGVwIDEgLSBFdmVudCBzZWxlY3Rpb25cIixcclxuICAgICAgICAgICAgbGFzdFNwb3J0SWQgOiBudWxsLFxyXG4gICAgICAgICAgICBsYXN0Q2F0ZWdvcnlJZCA6IG51bGwsXHJcbiAgICAgICAgICAgIGxhc3RUb3VybmFtZW50SWQgOiBudWxsLFxyXG4gICAgICAgICAgICBsb2FkaW5nQ2F0ZWdvcmllcyA6IGZhbHNlLFxyXG4gICAgICAgICAgICBsb2FkaW5nVG91cm5hbWVudHMgOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9hZGluZ1NlYXNvbnM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWFzb25TZWxlY3RvcnMgOiBbMV0sXHJcbiAgICAgICAgICAgIHNwb3J0U2VsZWN0b3JzIDogWzFdLFxyXG4gICAgICAgICAgICBzZWFzb25zOiBbXSxcclxuICAgICAgICAgICAgc2NoZWR1bGVzOiB7fSxcclxuICAgICAgICAgICAgc2hvd1NlYXJjaCA6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldFNwb3J0cygpLmRvbmUoIChzcG9ydHMgKSA9PiB7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBzcG9ydHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZENhdGVnb3JpZXMgKG5leHRQcm9wcykge1xyXG5cclxuICAgICAgICBsZXQgc3BvcnRJZCA9IG5leHRQcm9wcy5saXN0aW5nSW5mby5zcG9ydHNbMF0uZXh0ZXJuYWxJZDtcclxuXHJcbiAgICAgICAgaWYgKCBzcG9ydElkID09PSB0aGlzLnN0YXRlLmxhc3RTcG9ydElkICkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZ0NhdGVnb3JpZXMgOiB0cnVlIH0pO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5BcGkuZ2V0Q2F0ZWdvcmllcyhzcG9ydElkKS5kb25lKCAoY2F0ZWdvcmllcyApID0+IHtcclxuICAgICAgICAgICAgQ29udGVudEFyZW5hLkRhdGEuQ2F0ZWdvcmllcyA9IGNhdGVnb3JpZXM7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsYXN0U3BvcnRJZCA6IHNwb3J0SWQsIGxvYWRpbmdDYXRlZ29yaWVzIDogZmFsc2UgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFRvdXJuYW1lbnRzIChuZXh0UHJvcHMpIHtcclxuXHJcbiAgICAgICAgbGV0IHNwb3J0SWQgPSBuZXh0UHJvcHMubGlzdGluZ0luZm8uc3BvcnRzWzBdLmV4dGVybmFsSWQ7XHJcbiAgICAgICAgbGV0IGNhdGVnb3J5SWQgPSAoIG5leHRQcm9wcy5saXN0aW5nSW5mby5zcG9ydENhdGVnb3J5ICkgPyBuZXh0UHJvcHMubGlzdGluZ0luZm8uc3BvcnRDYXRlZ29yeS5leHRlcm5hbElkIDogbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKCBzcG9ydElkID09PSB0aGlzLnN0YXRlLmxhc3RTcG9ydElkICYmIGNhdGVnb3J5SWQgPT09IHRoaXMuc3RhdGUubGFzdENhdGVnb3J5SWQgKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nVG91cm5hbWVudHMgOiB0cnVlIH0pO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5BcGkuZ2V0VG91cm5hbWVudHMoc3BvcnRJZCxjYXRlZ29yeUlkKS5kb25lKCAodG91cm5hbWVudHMgKSA9PiB7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLlRvdXJuYW1lbnRzID0gdG91cm5hbWVudHM7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgbGFzdFNwb3J0SWQgOiBzcG9ydElkLFxyXG4gICAgICAgICAgICAgICAgbG9hZGluZ1RvdXJuYW1lbnRzIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBsYXN0Q2F0ZWdvcnlJZCA6IGNhdGVnb3J5SWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFNlYXNvbnMgKG5leHRQcm9wcykge1xyXG5cclxuICAgICAgICBsZXQgdG91cm5hbWVudElkID0gKCBuZXh0UHJvcHMubGlzdGluZ0luZm8udG91cm5hbWVudCApID8gbmV4dFByb3BzLmxpc3RpbmdJbmZvLnRvdXJuYW1lbnQuZXh0ZXJuYWxJZCA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmICggdG91cm5hbWVudElkID09PSB0aGlzLnN0YXRlLmxhc3RUb3VybmFtZW50SWQgKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nU2Vhc29ucyA6IHRydWUgfSk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkFwaS5nZXRTZWFzb25zKHRvdXJuYW1lbnRJZCkuZG9uZSggKHNlYXNvbnMgKSA9PiB7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLlNlYXNvbnMgPSBzZWFzb25zO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGxhc3RUb3VybmFtZW50SWQgOiB0b3VybmFtZW50SWQsXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nU2Vhc29ucyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2Vhc29ucyA6IHNlYXNvbnNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFNjaGVkdWxlIChuZXh0UHJvcHMpIHtcclxuXHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgbmV4dFByb3BzLmxpc3RpbmdJbmZvLnNlYXNvbnMuZm9yRWFjaCgoIHNlYXNvbiApID0+e1xyXG4gICAgICAgICAgICBpZiAoICFfdGhpcy5zdGF0ZS5zY2hlZHVsZXNbc2Vhc29uLmV4dGVybmFsSWRdICl7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmdTY2hlZHVsZSA6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldFNjaGVkdWxlKHNlYXNvbi5leHRlcm5hbElkKS5kb25lKCAoc2NoZWR1bGVzICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qQ29udGVudEFyZW5hLkRhdGEuU2Vhc29ucyA9IHNlYXNvbnM7Ki9cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzY2hlZHVsZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSwgcHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByZXZTY2hlZHVsZXMgPSBwcmV2U3RhdGUuc2NoZWR1bGVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U2NoZWR1bGVzW3NlYXNvbi5leHRlcm5hbElkXSA9IHNjaGVkdWxlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdTY2hlZHVsZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVzOiBwcmV2U2NoZWR1bGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNjaGVkdWxlcyhpbmRleCl7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5saXN0aW5nSW5mby5zZWFzb25zIHx8ICF0aGlzLnByb3BzLmxpc3RpbmdJbmZvLnNlYXNvbnNbaW5kZXhdICkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5zY2hlZHVsZXNbdGhpcy5wcm9wcy5saXN0aW5nSW5mby5zZWFzb25zW2luZGV4XS5leHRlcm5hbElkXTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XHJcbiAgICAgICAgaWYgKCBuZXh0UHJvcHMubGlzdGluZ0luZm8uc3BvcnRzLmxlbmd0aCA9PT0gMSApe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRDYXRlZ29yaWVzKG5leHRQcm9wcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4gKHtcclxuICAgICAgICAgICAgICAgIHNob3dTZWFyY2g6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggbmV4dFByb3BzLmxpc3RpbmdJbmZvLnNwb3J0cy5sZW5ndGggPT09IDEgfHwgbmV4dFByb3BzLmxpc3RpbmdJbmZvLmNhdGVnb3J5ICkgdGhpcy5sb2FkVG91cm5hbWVudHMobmV4dFByb3BzKTtcclxuICAgICAgICBpZiAoIG5leHRQcm9wcy5saXN0aW5nSW5mby50b3VybmFtZW50ICl7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNlYXNvbnMobmV4dFByb3BzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCBuZXh0UHJvcHMubGlzdGluZ0luZm8uc2Vhc29ucy5sZW5ndGggPiAwICkgdGhpcy5sb2FkU2NoZWR1bGUobmV4dFByb3BzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDb250ZW50VmFsdWUgPSAoIGV2ZW50LCBrZXkgKSA9PntcclxuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUNvbnRlbnRWYWx1ZShrZXksZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgaGFzQ3VzdG9tVG91cm5hbWVudCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5saXN0aW5nSW5mby5uZXdTcG9ydCB8fCB0aGlzLnByb3BzLmxpc3RpbmdJbmZvLm5ld1RvdXJuYW1lbnRcclxuICAgICAgICAgICAgfHwgdGhpcy5wcm9wcy5saXN0aW5nSW5mby5jdXN0b21Ub3VybmFtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGRTZWFzb24gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKT0+ICh7XHJcbiAgICAgICAgICAgIHNlYXNvblNlbGVjdG9ycyA6IFsuLi5wcmV2U3RhdGUuc2Vhc29uU2VsZWN0b3JzLCAxXVxyXG4gICAgICAgIH0pKVxyXG4gICAgfTtcclxuXHJcbiAgICBhZGRTcG9ydCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpPT4gKHtcclxuICAgICAgICAgICAgc3BvcnRTZWxlY3RvcnMgOiBbLi4ucHJldlN0YXRlLnNwb3J0U2VsZWN0b3JzLCAxXVxyXG4gICAgICAgIH0pKVxyXG4gICAgfTtcclxuXHJcbiAgICByZW1vdmVTcG9ydCA9IChpKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKT0+IHtcclxuICAgICAgICAgICAgcHJldlN0YXRlLnNwb3J0U2VsZWN0b3JzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3BvcnRTZWxlY3RvcnMgOiBwcmV2U3RhdGUuc3BvcnRTZWxlY3RvcnNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BzLnJlbW92ZUZyb21NdWx0aXBsZShpLCBcInNwb3J0c1wiKTtcclxuICAgIH07XHJcblxyXG4gICAgdG9nZ2xlU2VhcmNoID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4gKHtcclxuICAgICAgICAgICAgc2hvd1NlYXJjaDogIXByZXZTdGF0ZS5zaG93U2VhcmNoXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxlY3RUb3VybmFtZW50ID0gKCB0b3VybmFtZW50ICkgPT57XHJcbiAgICAgICAgdGhpcy50b2dnbGVTZWFyY2goKTtcclxuICAgICAgICB0aGlzLnByb3BzLnNlbGVjdFRvdXJuYW1lbnQodG91cm5hbWVudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIHRoaXMucHJvcHMubGlzdGluZ0luZm8uc3RlcCAhPT0gMSkgcmV0dXJuIChudWxsKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IHtcclxuICAgICAgICAgICAgc3BvcnRzOiBbeyB2YWx1ZSA6IFwiXCIgfV0sXHJcbiAgICAgICAgICAgIHNwb3J0Q2F0ZWdvcnkgOiB7IHZhbHVlIDogXCJcIiB9LFxyXG4gICAgICAgICAgICB0b3VybmFtZW50IDogeyB2YWx1ZSA6IFwiXCIgfSxcclxuICAgICAgICAgICAgc2Vhc29ucyA6IFt7IHZhbHVlIDogXCJcIn1dXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLnByb3BzLmxpc3RpbmdJbmZvLnNwb3J0cy5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICBpbnB1dFByb3BzLnNwb3J0cyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmxpc3RpbmdJbmZvLnNwb3J0cy5mb3JFYWNoKCggc3BvcnQgKT0+e1xyXG4gICAgICAgICAgICAgICAgaW5wdXRQcm9wcy5zcG9ydHMucHVzaCh7dmFsdWU6IHNwb3J0Lm5hbWV9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzLnByb3BzLmxpc3RpbmdJbmZvLnNlYXNvbnMubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgaW5wdXRQcm9wcy5zZWFzb25zID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMubGlzdGluZ0luZm8uc2Vhc29ucy5mb3JFYWNoKCggc2Vhc29uICk9PntcclxuICAgICAgICAgICAgICAgIGlucHV0UHJvcHMuc2Vhc29ucy5wdXNoKHt2YWx1ZTogc2Vhc29uLm5hbWV9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzLnByb3BzLmxpc3RpbmdJbmZvLnNwb3J0Q2F0ZWdvcnkgKSBpbnB1dFByb3BzLnNwb3J0Q2F0ZWdvcnkudmFsdWUgPSB0aGlzLnByb3BzLmxpc3RpbmdJbmZvLnNwb3J0Q2F0ZWdvcnkubmFtZTtcclxuICAgICAgICBpZiAoIHRoaXMucHJvcHMubGlzdGluZ0luZm8udG91cm5hbWVudCApIGlucHV0UHJvcHMudG91cm5hbWVudC52YWx1ZSA9IHRoaXMucHJvcHMubGlzdGluZ0luZm8udG91cm5hbWVudC5uYW1lO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudFwiPlxyXG5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNob3dTZWFyY2ggJiYgPFNlYXJjaENvbXBldGl0aW9uIGNsb3NlPXt0aGlzLnRvZ2dsZVNlYXJjaH0gc2VsZWN0PXt0aGlzLnNlbGVjdFRvdXJuYW1lbnR9IC8+fVxyXG4gICAgICAgICAgICAgICAgeyF0aGlzLnN0YXRlLnNob3dTZWFyY2ggJiYgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVNlYXJjaH0+U2hvdyBzZWFyY2ggZnVuY3Rpb248L2J1dHRvbj59XHJcblxyXG4gICAgICAgICAgICAgICAgeyF0aGlzLnN0YXRlLnNob3dTZWFyY2ggJiYgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRlbnQtY29udGFpbmVyXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1pdGVtLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsZWFzZSBzZWxlY3QgdGhlIHNwb3J0KHMpIGFuZCBjb21wZXRpdGlvbihzKSBjb3ZlcmVkIGJ5IHlvdXIgY29udGVudCBsaXN0aW5nOlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7IXRoaXMucHJvcHMubGlzdGluZ0luZm8ubmV3U3BvcnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zcG9ydFNlbGVjdG9ycy5tYXAoKGl0ZW0sIGkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFNwb3J0U2VsZWN0b3Iga2V5PXtpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZT17KCkgPT4gdGhpcy5yZW1vdmVTcG9ydChpKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0FkZE5ldz17dGhpcy5zdGF0ZS5zcG9ydFNlbGVjdG9ycy5sZW5ndGggPiAxICYmIHRoaXMuc3RhdGUuc3BvcnRTZWxlY3RvcnMubGVuZ3RoID09PSBpICsgMX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2xvc2U9e2kgPiAwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZE5ld1Nwb3J0PXt0aGlzLmFkZFNwb3J0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5wcm9wcy5vcGVuU3BvcnRTZWxlY3RvcihpKSB9IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dFByb3BzPXtpbnB1dFByb3BzLnNwb3J0c1tpXX0gIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5saXN0aW5nSW5mby5uZXdTcG9ydCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5ld1Nwb3J0IG9uQ2xpY2s9e3RoaXMucHJvcHMucmVtb3ZlTmV3U3BvcnQgfSAvPn1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuc3BvcnRTZWxlY3RvcnMubGVuZ3RoID09PSAxICYmIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlvdXIgY29udGVudCBjb3ZlcnMgbXVsdGlwbGUgc3BvcnRzPyA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuYWRkU3BvcnR9PlBsZWFzZSBjbGljayBoZXJlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc3BvcnRTZWxlY3RvcnMubGVuZ3RoID09PSAxICYmIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshdGhpcy5wcm9wcy5saXN0aW5nSW5mby5uZXdTcG9ydCAmJiA8aW5wdXQgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmlucHV0UHJvcHMuc3BvcnRDYXRlZ29yeX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuc3RhdGUubG9hZGluZ0NhdGVnb3JpZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9wZW5DYXRlZ29yeVNlbGVjdG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1wiQ291bnRyeS9DYXRlZ29yeVwifSAgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxpc3RpbmdJbmZvLm5ld1Nwb3J0ICYmIDxOZXdDYXRlZ29yeSAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmxvYWRpbmdDYXRlZ29yaWVzICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPn1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc3BvcnRTZWxlY3RvcnMubGVuZ3RoID09PSAxICYmIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshdGhpcy5oYXNDdXN0b21Ub3VybmFtZW50KCkgJiYgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5pbnB1dFByb3BzLnRvdXJuYW1lbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnN0YXRlLmxvYWRpbmdUb3VybmFtZW50c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92ZU5ld1RvdXJuYW1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9wZW5Ub3VybmFtZW50U2VsZWN0b3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17XCJUb3VybmFtZW50XCJ9ICAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyAoIHRoaXMuaGFzQ3VzdG9tVG91cm5hbWVudCgpIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgPE5ld1RvdXJuYW1lbnQgc2hvd0Nsb3NlPXt0aGlzLnByb3BzLmxpc3RpbmdJbmZvLm5ld1RvdXJuYW1lbnQgfHwgdGhpcy5wcm9wcy5saXN0aW5nSW5mby5jdXN0b21Ub3VybmFtZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5saXN0aW5nSW5mby5jdXN0b21Ub3VybmFtZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9eyAoZSkgPT4gdGhpcy51cGRhdGVDb250ZW50VmFsdWUoZSwgXCJjdXN0b21Ub3VybmFtZW50XCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLnJlbW92ZU5ld1RvdXJuYW1lbnR9IC8+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmxvYWRpbmdUb3VybmFtZW50cyAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7ICB0aGlzLnN0YXRlLnNlYXNvbnMubGVuZ3RoID4gMCAmJiB0aGlzLnN0YXRlLnNlYXNvblNlbGVjdG9ycy5sZW5ndGggPjAgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXNvblNlbGVjdG9ycy5tYXAoIChzZWFzb24sIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxTZWFzb25TZWxlY3RvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vhc29uPXtzZWFzb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRTZWFzb249e3RoaXMuYWRkU2Vhc29ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17aW5wdXRQcm9wcy5zZWFzb25zW2ldfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVzPXt0aGlzLmdldFNjaGVkdWxlcyhpKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3RoaXMuc3RhdGUubG9hZGluZ1NlYXNvbnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93QWRkTmV3PXt0aGlzLnN0YXRlLnNlYXNvblNlbGVjdG9ycy5sZW5ndGggPT09IGkgKyAxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlblNlbGVjdG9yPXsoKT0+dGhpcy5wcm9wcy5vcGVuU2Vhc29uU2VsZWN0b3IoaSl9Lz5cclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPERlc2NyaXB0aW9uIHZhbHVlPXt0aGlzLnByb3BzLmxpc3RpbmdJbmZvLmRlc2NyaXB0aW9ufSBvbkJsdXI9eyAoZSkgPT4gdGhpcy51cGRhdGVDb250ZW50VmFsdWUoZSwgXCJkZXNjcmlwdGlvblwiKX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8V2Vic2l0ZSB2YWx1ZT17dGhpcy5wcm9wcy5saXN0aW5nSW5mby53ZWJzaXRlfSBvbkJsdXI9eyAoZSkgPT4gdGhpcy51cGRhdGVDb250ZW50VmFsdWUoZSwgXCJ3ZWJzaXRlXCIpfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGaWxlU2VsZWN0b3IgdGFyZ2V0PXtcImJyb2NodXJlXCJ9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsaXN0aW5nSW5mbyA6IHN0YXRlLmxpc3RpbmdJbmZvLFxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvcGVuU3BvcnRTZWxlY3RvciA6IChpbmRleCkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogJ09QRU5fU0VMRUNUT1InLFxyXG4gICAgICAgICAgICBzZWxlY3Rvckl0ZW1zIDogQ29udGVudEFyZW5hLkRhdGEuRnVsbFNwb3J0cyxcclxuICAgICAgICAgICAgcG9wdWxhckl0ZW1zIDogQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzLFxyXG4gICAgICAgICAgICBzZWxlY3RvclR5cGUgOiBcInNwb3J0c1wiLFxyXG4gICAgICAgICAgICBhY3RpdmVGaWx0ZXIgOiBcInBvcHVsYXJcIixcclxuICAgICAgICAgICAgbXVsdGlwbGUgOiB0cnVlLFxyXG4gICAgICAgICAgICBzaG93TmV3U3BvcnQgOiB0cnVlLFxyXG4gICAgICAgICAgICBpbmRleCA6IGluZGV4XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgb3BlbkNhdGVnb3J5U2VsZWN0b3IgOiAoKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdPUEVOX1NFTEVDVE9SJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogQ29udGVudEFyZW5hLkRhdGEuQ2F0ZWdvcmllcyxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcInNwb3J0Q2F0ZWdvcnlcIixcclxuICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogXCJhZ1wiXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgb3BlblRvdXJuYW1lbnRTZWxlY3RvciA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZTogJ09QRU5fU0VMRUNUT1InLFxyXG4gICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBDb250ZW50QXJlbmEuRGF0YS5Ub3VybmFtZW50cyxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcInRvdXJuYW1lbnRcIixcclxuICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogXCJhZ1wiLFxyXG4gICAgICAgICAgICBzaG93TmV3VG91cm5hbWVudCA6IHRydWVcclxuICAgICAgICB9KSxcclxuICAgICAgICBvcGVuU2Vhc29uU2VsZWN0b3IgOiAoaW5kZXgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZTogJ09QRU5fU0VMRUNUT1InLFxyXG4gICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBDb250ZW50QXJlbmEuRGF0YS5TZWFzb25zLFxyXG4gICAgICAgICAgICBzZWxlY3RvclR5cGU6IFwic2Vhc29uc1wiLFxyXG4gICAgICAgICAgICBtdWx0aXBsZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgcmVtb3ZlRnJvbU11bHRpcGxlIDogKGluZGV4LCBzZWxlY3RvclR5cGUpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZTogJ1JFTU9WRV9GUk9NX01VTFRJUExFJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBzZWxlY3RvclR5cGUsXHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHVwZGF0ZUNvbnRlbnRWYWx1ZSA6IChrZXksIHZhbHVlKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdVUERBVEVfQ09OVEVOVF9WQUxVRScsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICB2YWx1ZSA6IHZhbHVlXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgcmVtb3ZlTmV3U3BvcnQgOiAoKSA9PiBkaXNwYXRjaCh7IHR5cGU6ICdSRU1PVkVfTkVXX1NQT1JUJyB9KSxcclxuICAgICAgICByZW1vdmVOZXdUb3VybmFtZW50IDogKCkgPT4gZGlzcGF0Y2goeyB0eXBlOiAnUkVNT1ZFX05FV19UT1VSTkFNRU5UJyB9KSxcclxuICAgICAgICBzZWxlY3RUb3VybmFtZW50IDogKHRvdXJuYW1lbnQpID0+IGRpc3BhdGNoKHsgdHlwZTogJ1NFTEVDVF9UT1VSTkFNRU5UJywgdG91cm5hbWVudDogdG91cm5hbWVudCB9KVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxGb3JtU3RlcDEpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb250YWluZXJzL1NlbGxGb3JtU3RlcDEuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcblxyXG5jb25zdCBTZWxsRm9ybVN0ZXAgPSAoe3N0ZXAsIGFjdGl2ZSwgdGl0bGV9KSA9PiAoXHJcbiAgICA8ZGl2ICBjbGFzc05hbWU9e1wic3RlcCBcIiArIChhY3RpdmUgJiYgXCJzdGVwLWFjdGl2ZVwiKSB9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1sYWJlbFwiPlxyXG4gICAgICAgICAgICBTdGVwIHsgc3RlcCB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLXRpdGxlXCI+XHJcbiAgICAgICAgICAgIHt0aXRsZX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtaWNvblwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5jbGFzcyBTZWxsRm9ybVN0ZXBzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHN0ZXBzOiBbXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogMSwgdGl0bGU6IFwiRXZlbnQgc2VsZWN0aW9uXCJ9LFxyXG4gICAgICAgICAgICAgICAge3N0ZXA6IDIsIHRpdGxlOiBcIkNvbmZpZ3VyZSByaWdodHNcIn0sXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogMywgdGl0bGU6IFwiRGlzdHJpYnV0aW9uIHN0eWxlXCJ9LFxyXG4gICAgICAgICAgICAgICAge3N0ZXA6IDQsIHRpdGxlOiBcIlByaWNlLCBwYXltZW50IGFuZCBsaXN0aW5nIGRldGFpbHNcIn0sXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogNSwgdGl0bGU6IFwiQ29uZmlybVwifVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5zdGVwcy5tYXAoKHN0ZXAsIGkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxTZWxsRm9ybVN0ZXAga2V5PXtpfSBzdGVwPXtzdGVwLnN0ZXB9IHRpdGxlPXtzdGVwLnRpdGxlfSBhY3RpdmU9e190aGlzLnByb3BzLnN0ZXAgPT09IHN0ZXAuc3RlcH0vPlxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RlcCA6IHN0YXRlLmxpc3RpbmdJbmZvLnN0ZXAsXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxGb3JtU3RlcHMpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb250YWluZXJzL1NlbGxGb3JtU3RlcHMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4uL3N0b3JlJztcclxuXHJcbmNsYXNzIFNlbGxCdXR0b25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIGxhc3RTdGVwIDogcHJvcHMubGFzdFN0ZXAgfHwgNSxcclxuICAgICAgICAgICAgc2F2aW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNhdmluZ1N1Y2Nlc3M6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQXNEcmFmdCA9ICgpID0+IHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLnNldFN0YXRlKHsgc2F2aW5nIDogdHJ1ZSB9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5zYXZlQ29udGVudEFzRHJhZnQoc3RvcmUuZ2V0U3RhdGUoKS5saXN0aW5nSW5mbykuZG9uZShmdW5jdGlvbiAoIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IHNhdmluZyA6IGZhbHNlLCBzYXZpbmdTdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IHNhdmluZyA6IGZhbHNlLCBzYXZpbmdTdWNjZXNzOiBmYWxzZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBsZXQgc2F2ZUFzRHJhZnRUZXh0ID0gKHRoaXMuc3RhdGUuc2F2aW5nKSA/IFwiU2F2aW5nLi5cIiA6ICh0aGlzLnN0YXRlLnNhdmluZ1N1Y2Nlc3MpID8gXCJTYXZlZCBhcyBEcmFmdFwiIDogXCJTYXZlIGFzIERyYWZ0XCI7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9ucy1jb250YWluZXJcIiA+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3RlcCAhPT0gMSAmJlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInByZXZpb3VzLXN0ZXBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdGFuZGFyZC1idXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5wcm9wcy5nb1RvUHJldmlvdXNTdGVwIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYXJyb3ctbGVmdFwiPjwvaT4gQmFja1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+IH1cclxuXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvblwiIG9uQ2xpY2s9eyB0aGlzLnNhdmVBc0RyYWZ0IH0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuc2F2aW5nfT5cclxuICAgICAgICAgICAgICAgICAgICB7IHNhdmVBc0RyYWZ0VGV4dCB9eyB0aGlzLnN0YXRlLnNhdmluZyAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiPjwvaT59XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3RlcCA9PT0gdGhpcy5zdGF0ZS5sYXN0U3RlcCAmJlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImRyYWZ0LWxpc3RpbmdcIiBjbGFzc05hbWU9XCJzdGFuZGFyZC1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICBTdWJtaXQgTGlzdGluZ1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+IH1cclxuXHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3RlcCAhPT0gdGhpcy5zdGF0ZS5sYXN0U3RlcCAmJlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIm5leHQtc3RlcFwiIGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvblwiIG9uQ2xpY2s9eyAoKSA9PiB0aGlzLnByb3BzLmdvVG9OZXh0U3RlcCgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgTmV4dCA8aSBjbGFzc05hbWU9XCJmYSBmYS1hcnJvdy1yaWdodFwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPiB9XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0ZXAgOiBzdGF0ZS5saXN0aW5nSW5mby5zdGVwXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdvVG9OZXh0U3RlcCA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdHT19UT19ORVhUX1NURVAnXHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAgIGdvVG9QcmV2aW91c1N0ZXAgOiAoKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnR09fVE9fUFJFVklPVVNfU1RFUCdcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxCdXR0b25zKVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvYnV0dG9ucy5qcyIsImNvbnN0IGNvbnRlbnQgPSAoc3RhdGUgPSB7XHJcbiAgICBsaXN0aW5nSW5mbyA6IHtcclxuICAgICAgICBzdGVwOiAxLFxyXG4gICAgICAgIHJpZ2h0c1BhY2thZ2UgOiBbXSxcclxuICAgICAgICBjYXRlZ29yeSA6IG51bGwsXHJcbiAgICAgICAgc3BvcnRzIDogW10sXHJcbiAgICAgICAgc2Vhc29uczogW11cclxuICAgIH0sXHJcblxyXG4gICAgc2VsZWN0b3JJbmZvIDoge1xyXG4gICAgICAgIHR5cGU6IFwic3BvcnRcIixcclxuICAgICAgICBvcGVuIDogZmFsc2UsXHJcbiAgICAgICAgc2VsZWN0b3JJdGVtczogW10sXHJcbiAgICAgICAgcG9wdWxhckl0ZW1zOiBbXVxyXG4gICAgfSxcclxuXHJcbn0sIGFjdGlvbikgPT4ge1xyXG5cclxuICAgIGxldCBsaXN0aW5nSW5mbyA9IHt9O1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdDT05URU5UX0lOSVQnOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGxpc3RpbmdJbmZvOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5saXN0aW5nSW5mbyxhY3Rpb24uY29udGVudClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSAnR09fVE9fTkVYVF9TVEVQJzpcclxuXHJcbiAgICAgICAgICAgIGxpc3RpbmdJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgc3RlcDogc3RhdGUubGlzdGluZ0luZm8uc3RlcCArIDFcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgbGlzdGluZ0luZm86IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmxpc3RpbmdJbmZvLCBsaXN0aW5nSW5mbylcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSAnR09fVE9fUFJFVklPVVNfU1RFUCc6XHJcbiAgICAgICAgICAgIGxpc3RpbmdJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgc3RlcDogc3RhdGUubGlzdGluZ0luZm8uc3RlcCAtMVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGxpc3RpbmdJbmZvOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5saXN0aW5nSW5mbywgbGlzdGluZ0luZm8pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYXNlICdBRERfTkVXX1NQT1JUJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGxpc3RpbmdJbmZvOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5saXN0aW5nSW5mbyx7IG5ld1Nwb3J0OiB0cnVlIH0pIH0pO1xyXG5cclxuICAgICAgICBjYXNlICdSRU1PVkVfTkVXX1NQT1JUJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGxpc3RpbmdJbmZvOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5saXN0aW5nSW5mbyx7IG5ld1Nwb3J0OiBmYWxzZSB9KSB9KTtcclxuXHJcbiAgICAgICAgY2FzZSAnQUREX05FV19UT1VSTkFNRU5UJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7bGlzdGluZ0luZm86IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmxpc3RpbmdJbmZvLHtcclxuICAgICAgICAgICAgICAgIG5ld1RvdXJuYW1lbnQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0b3VybmFtZW50IDogbnVsbFxyXG4gICAgICAgICAgICB9KSB9KTtcclxuXHJcbiAgICAgICAgY2FzZSAnUkVNT1ZFX05FV19UT1VSTkFNRU5UJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7bGlzdGluZ0luZm86IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmxpc3RpbmdJbmZvLHtcclxuICAgICAgICAgICAgICAgIG5ld1RvdXJuYW1lbnQ6IGZhbHNlLCBjdXN0b21Ub3VybmFtZW50OiBudWxsXHJcbiAgICAgICAgICAgIH0pIH0pO1xyXG5cclxuICAgICAgICBjYXNlICdVUERBVEVfQ09OVEVOVF9WQUxVRSc6XHJcbiAgICAgICAgICAgIGxpc3RpbmdJbmZvID0ge307XHJcbiAgICAgICAgICAgIGxpc3RpbmdJbmZvW2FjdGlvbi5rZXldID0gYWN0aW9uLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBsaXN0aW5nSW5mbzogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubGlzdGluZ0luZm8sIGxpc3RpbmdJbmZvKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2FzZSAnU0VMRUNUX1RPVVJOQU1FTlQnOlxyXG4gICAgICAgICAgICBsaXN0aW5nSW5mbyA9IHt9O1xyXG4gICAgICAgICAgICBsaXN0aW5nSW5mby50b3VybmFtZW50ID0gYWN0aW9uLnRvdXJuYW1lbnQ7XHJcbiAgICAgICAgICAgIGxpc3RpbmdJbmZvLnNwb3J0cyA9IChhY3Rpb24udG91cm5hbWVudC5zcG9ydCApID8gW2FjdGlvbi50b3VybmFtZW50LnNwb3J0XSA6IFtdO1xyXG4gICAgICAgICAgICBsaXN0aW5nSW5mby5zcG9ydENhdGVnb3J5ID0gYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnRDYXRlZ29yeTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgbGlzdGluZ0luZm86IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmxpc3RpbmdJbmZvLCBsaXN0aW5nSW5mbylcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhc2UgJ09QRU5fU0VMRUNUT1InOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogYWN0aW9uLnNlbGVjdG9yVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBvcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBhY3Rpb24uc2VsZWN0b3JJdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IGFjdGlvbi5wb3B1bGFySXRlbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogYWN0aW9uLmFjdGl2ZUZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZSA6IGFjdGlvbi5tdWx0aXBsZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93TmV3U3BvcnQgOiBhY3Rpb24uc2hvd05ld1Nwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4IDogYWN0aW9uLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dOZXdUb3VybmFtZW50IDogYWN0aW9uLnNob3dOZXdUb3VybmFtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkIDogc3RhdGUubGlzdGluZ0luZm9bYWN0aW9uLnNlbGVjdG9yVHlwZV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhc2UgJ0NMT1NFX1NFTEVDVE9SJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvckluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvclR5cGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbiA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvcHVsYXJJdGVtczogW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhc2UgJ0FQUExZX1NFTEVDVElPTic6XHJcblxyXG4gICAgICAgICAgICBsaXN0aW5nSW5mbyA9IHt9O1xyXG4gICAgICAgICAgICBsaXN0aW5nSW5mb1thY3Rpb24uc2VsZWN0b3JUeXBlXSA9IChhY3Rpb24ubXVsdGlwbGUgKSA/IFthY3Rpb24uc2VsZWN0ZWRJdGVtXSA6IGFjdGlvbi5zZWxlY3RlZEl0ZW07XHJcblxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5tdWx0aXBsZSApe1xyXG4gICAgICAgICAgICAgICAgbGlzdGluZ0luZm9bYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGUubGlzdGluZ0luZm9bYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xyXG4gICAgICAgICAgICAgICAgbGlzdGluZ0luZm9bYWN0aW9uLnNlbGVjdG9yVHlwZV1bYWN0aW9uLmluZGV4XSA9IGFjdGlvbi5zZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0aW5nSW5mb1thY3Rpb24uc2VsZWN0b3JUeXBlXSA9IGFjdGlvbi5zZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGxpc3RpbmdJbmZvOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5saXN0aW5nSW5mbywgbGlzdGluZ0luZm8pLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW4gOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYXNlICdSRU1PVkVfRlJPTV9NVUxUSVBMRSc6XHJcblxyXG4gICAgICAgICAgICBsaXN0aW5nSW5mbyA9IHt9O1xyXG4gICAgICAgICAgICBsaXN0aW5nSW5mb1thY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZS5saXN0aW5nSW5mb1thY3Rpb24uc2VsZWN0b3JUeXBlXV07XHJcbiAgICAgICAgICAgIGxpc3RpbmdJbmZvW2FjdGlvbi5zZWxlY3RvclR5cGVdLnNwbGljZShhY3Rpb24uaW5kZXgsMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgbGlzdGluZ0luZm86IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmxpc3RpbmdJbmZvLCBsaXN0aW5nSW5mbylcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhc2UgJ1NVUEVSX1JJR0hUU19VUERBVEVEJzpcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgcmlnaHRzUGFja2FnZSA9IHN0YXRlLmxpc3RpbmdJbmZvLnJpZ2h0c1BhY2thZ2U7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IENvbnRlbnRBcmVuYS5VdGlscy5nZXRJbmRleChhY3Rpb24ucmlnaHRzUGFja2FnZS5pZCwgcmlnaHRzUGFja2FnZSwgXCJpZFwiKTtcclxuICAgICAgICAgICAgaWYgKCAgaW5kZXggPT09IC0xICl7XHJcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlLnB1c2goYWN0aW9uLnJpZ2h0c1BhY2thZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGlzdGluZ0luZm8ucmlnaHRzUGFja2FnZSA9IHJpZ2h0c1BhY2thZ2U7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGxpc3RpbmdJbmZvIDogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubGlzdGluZ0luZm8sIGxpc3RpbmdJbmZvKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb250ZW50XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvY29udGVudC5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IFNlbGxGb3JtIGZyb20gXCIuL2NvbXBvbmVudHMvU2VsbEZvcm1cIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnO1xyXG5cclxuY29uc3Qgc2VsbEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsbC1mb3JtLWNvbnRhaW5lcicpO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XHJcbiAgICAgICAgPFNlbGxGb3JtIHsuLi5zZWxsRm9ybS5kYXRhc2V0IH0gLz5cclxuICAgIDwvUHJvdmlkZXI+LFxyXG4gICAgc2VsbEZvcm1cclxuKTtcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVycyBhbGwgdGhlIHRvb2x0aXBzXHJcbiAgICAgKi9cclxuICAgICQoIGRvY3VtZW50ICkudG9vbHRpcCgpO1xyXG5cclxuICAgICQoXCIuaGFzLWRhdGVwaWNrZXJcIikuZGF0ZXBpY2tlcigpO1xyXG5cclxuICAgICQoXCJpbnB1dFwiKS5vbignZm9jdXMnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJpbnZhbGlkXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5vcHRpb25hbFwiKS5oaWRlKCk7XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvc2VsbC5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHdpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsID0gQ29udGVudEFyZW5hLk1vZGVsIHx8IHt9O1xyXG4gICAgQ29udGVudEFyZW5hLkZvcm0gPSBDb250ZW50QXJlbmEuRm9ybSB8fCB7fTtcclxuICAgIENvbnRlbnRBcmVuYS5UZXN0ID0gQ29udGVudEFyZW5hLlRlc3QgfHwge307XHJcblxyXG4gICAgQ29udGVudEFyZW5hLkZvcm0uYWRkQ3VzdG9tU2Vhc29uID0gZnVuY3Rpb24oIGlkLCBjb250YWluZXJTZWxlY3RvciApe1xyXG4gICAgICAgIHZhciBjb250YWluZXIgPSAkKGNvbnRhaW5lclNlbGVjdG9yIHx8IFwiI2V2ZW50LXNjaGVkdWxlLXN1Yml0ZW1zXCIpLFxyXG4gICAgICAgICAgICBzZWFzb25OdW1iZXIgPSAkKFwiLmN1c3RvbS1zZWFzb24tY29udGFpbmVyXCIsIGNvbnRhaW5lcikubGVuZ3RoICsgMSxcclxuICAgICAgICAgICAgc291cmNlID0gJChcIiNldmVudC1zZWFzb24tc2VsZWN0b3JcIikuYXV0b2NvbXBsZXRlKCBcIm9wdGlvblwiLCBcInNvdXJjZVwiICksXHJcbiAgICAgICAgICAgIGhhc1NlYXNvbiA9IHNvdXJjZS5sZW5ndGggPiAwLFxyXG4gICAgICAgICAgICBsYWJlbHMgPSAoaGFzU2Vhc29uKSA/IHNvdXJjZVswXS5sYWJlbC5zcGxpdChcIiBcIikgOiBbXSxcclxuICAgICAgICAgICAgc2Vhc29uWWVhciA9IChoYXNTZWFzb24pID8gbGFiZWxzLnBvcCgpIDogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpICxcclxuICAgICAgICAgICAgc3RhcnRZZWFyID0gKGhhc1NlYXNvbikgPyAoIHNlYXNvblllYXIuc2VhcmNoKFwiL1wiKSAhPT0gLTEgKSA/IE51bWJlcihzZWFzb25ZZWFyLnNwbGl0KFwiL1wiKVswXSkgKyBzZWFzb25OdW1iZXIgOiBOdW1iZXIoc2Vhc29uWWVhcikgKyBzZWFzb25OdW1iZXIgOiBzZWFzb25ZZWFyICxcclxuICAgICAgICAgICAgZW5kWWVhciA9IChoYXNTZWFzb24pID8gKCBzZWFzb25ZZWFyLnNlYXJjaChcIi9cIikgIT09IC0xICkgPyBOdW1iZXIoc2Vhc29uWWVhci5zcGxpdChcIi9cIilbMV0pICsgc2Vhc29uTnVtYmVyIDogbnVsbCA6IHNlYXNvblllYXIgLFxyXG4gICAgICAgICAgICBzZWFzb25OYW1lID0gKGhhc1NlYXNvbikgPyBsYWJlbHMuam9pbihcIiBcIikgOiBcIlwiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9ICQudGVtcGxhdGVzKFwiI3NlYXNvbi10ZW1wbGF0ZVwiKSxcclxuICAgICAgICAgICAgc2Vhc29uRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGlkIDogc2Vhc29uTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgbmFtZSA6IHNlYXNvbk5hbWUsXHJcbiAgICAgICAgICAgICAgICBzdGFydFllYXI6IHN0YXJ0WWVhcixcclxuICAgICAgICAgICAgICAgIGVuZFllYXI6IGVuZFllYXJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2Vhc29uRWxlbWVudCA9ICQodGVtcGxhdGUucmVuZGVyKHNlYXNvbkRhdGEpKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZCggc2Vhc29uRWxlbWVudCApO1xyXG5cclxuICAgICAgICAkKFwiLnJlbW92ZS1zZWFzb25cIiwgc2Vhc29uRWxlbWVudCApLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWFzb25FbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIENvbnRlbnRBcmVuYS5Db250ZW50ID0gbmV3IENvbnRlbnRBcmVuYS5Nb2RlbC5Db250ZW50KCk7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ3VzdG9tRm4oIGVsLCBwbGFjZWhvbGRlciApe1xyXG4gICAgICAgICQoZWwpXHJcbiAgICAgICAgICAgIC5vZmYoKVxyXG4gICAgICAgICAgICAudmFsKFwiXCIpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImN1c3RvbS1pbnB1dFwiKVxyXG4gICAgICAgICAgICAuc2hvdygpXHJcbiAgICAgICAgICAgIC5hdHRyKFwicGxhY2Vob2xkZXJcIiwgcGxhY2Vob2xkZXIpO1xyXG5cclxuICAgICAgICBpZiAoICQoZWwpLmRhdGEoJ3VpLWF1dG9jb21wbGV0ZScpICE9PSB1bmRlZmluZWQgKSAkKGVsKS5hdXRvY29tcGxldGUoJ2Rlc3Ryb3knKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDdXN0b21UZW1wbGF0ZSggc3BvcnQsIGNhdGVnb3J5LCB0b3VybmFtZW50KXtcclxuXHJcbiAgICAgICAgaWYgKCBzcG9ydCApIGFkZEN1c3RvbUZuKFwiI2V2ZW50LXNwb3J0LXNlbGVjdG9yXCIsIFwiRW50ZXIgc3BvcnQgbmFtZVwiKTtcclxuXHJcbiAgICAgICAgaWYgKCBDb250ZW50QXJlbmEuQ29udGVudC5ldmVudFR5cGUgPT09IFwiY3VzdG9tXCIgKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICggY2F0ZWdvcnkgKSBhZGRDdXN0b21GbihcIiNldmVudC1jYXRlZ29yeS1zZWxlY3RvclwiLCBcIkVudGVyIENvdW50cnkvQ2F0ZWdvcnlcIik7XHJcbiAgICAgICAgaWYgKCB0b3VybmFtZW50ICkgYWRkQ3VzdG9tRm4oXCIjZXZlbnQtdG91cm5hbWVudC1zZWxlY3RvclwiLCBcIkVudGVyIFRvdXJuYW1lbnRcIik7XHJcbiAgICAgICAgLyphZGRDdXN0b21GbihcIiNldmVudC1zZWFzb24tc2VsZWN0b3JcIiwgXCJFbnRlciBTZWFzb25cIik7XHJcbiAgICAgICAgJChcIiNldmVudC1zY2hlZHVsZS1zdWJpdGVtc1wiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICQoXCIuY3VzdG9tLXRlbXBsYXRlLWl0ZW1cIikuc2hvdygpO1xyXG4gICAgICAgICQoXCIuY3VzdG9tLXRlbXBsYXRlLWl0ZW1cIikuY2hpbGRyZW4oKS5zaG93KCk7Ki9cclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkZvcm0uYWRkQ3VzdG9tU2Vhc29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU3BvcnRMYXllcigpe1xyXG5cclxuICAgICAgICB2YXIgc3BvcnRTZWxlY3RvciA9ICQoXCIuc3BvcnQtc2VsZWN0b3JcIiksXHJcbiAgICAgICAgICAgIGV4dHJhU3BvcnRzID0gc3BvcnRTZWxlY3Rvci5sZW5ndGgsXHJcbiAgICAgICAgICAgIGlkID0gXCJzcG9ydC1zZWxlY3Rvci1cIiArIChleHRyYVNwb3J0cyArIDEpLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9ICQudGVtcGxhdGVzKFxyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPVxcXCJzdGVwMS1ldmVudC1pdGVtXFxcIj5cXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIiAgIDxpIGNsYXNzPVxcXCJmYSBmYS1jb2cgZmEtc3BpblxcXCI+PC9pPlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCIgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcIlNwb3J0XFxcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiICAgICAgICAgIGlkPVxcXCJ7ezppZH19XFxcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiICAgICAgICAgIGNsYXNzPVxcXCJjb250ZW50LWlucHV0IHNwb3J0LXNlbGVjdG9yXFxcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiICAgICAgICAgIHJlcXVpcmVkLz4gXCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJyZW1vdmUtYnV0dG9uXFxcIj5SZW1vdmU8L2J1dHRvbj5cXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PlwiKSxcclxuICAgICAgICAgICAgaHRtbE91dHB1dCA9IHRlbXBsYXRlLnJlbmRlcih7aWQ6IGlkIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmIChleHRyYVNwb3J0cz09PTApe1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFmdGVyKGh0bWxPdXRwdXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNwb3J0U2VsZWN0b3IubGFzdCgpLnBhcmVudCgpLmFmdGVyKGh0bWxPdXRwdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIiNcIitpZCkucGFyZW50KCkuZmluZCgnYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYoc3BvcnRTZWxlY3Rvci5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNldmVudC10b3VybmFtZW50LXNlbGVjdG9yLCAjZXZlbnQtc2Vhc29uLXNlbGVjdG9yXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LmV2ZW50VHlwZSA9IFwiZGF0YWJhc2VcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiI2V2ZW50LWNhdGVnb3J5LXNlbGVjdG9yLCAjZXZlbnQtdG91cm5hbWVudC1zZWxlY3RvciwgI2V2ZW50LXNlYXNvbi1zZWxlY3RvclwiKS5oaWRlKCk7XHJcbiAgICAgICAgcmVzZXRTZWxlY3RvcihbXCJjYXRlZ29yeVwiLCBcInRvdXJuYW1lbnRcIiwgXCJzZWFzb25cIl0pO1xyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5ldmVudFR5cGUgPSBcImN1c3RvbVwiO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRHZW5lcmljRXBpc29kZXMoIHF1YW50aXR5ICl7XHJcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gJC50ZW1wbGF0ZXMoXCIjZXBpc29kZS10ZW1wbGF0ZVwiKSxcclxuICAgICAgICAgICAgY29udGFpbmVyID0gJChcIiNjb250ZW50LWRldGFpbHMtbWFza1wiKSxcclxuICAgICAgICAgICAgY3VycmVudFF1YW50aXR5ID0gY29udGFpbmVyLmNoaWxkcmVuKCkubGVuZ3RoLFxyXG4gICAgICAgICAgICBzdGFydCA9IDA7XHJcblxyXG4gICAgICAgIGlmICggY3VycmVudFF1YW50aXR5ID4gcXVhbnRpdHkgKSBjb250YWluZXIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgaWYgKCBjdXJyZW50UXVhbnRpdHkgPCBxdWFudGl0eSApIHN0YXJ0ID0gY3VycmVudFF1YW50aXR5O1xyXG5cclxuICAgICAgICBmb3IoIHZhciBpID0gc3RhcnQ7IGkgPCBxdWFudGl0eTsgaSsrKXtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZCh0ZW1wbGF0ZS5yZW5kZXIoe2lkOiBpICsgMSB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmVwaXNvZGUtYXZhaWxhYmlsaXR5LWRhdGU6bm90KC5oYXNEYXRlcGlja2VyKVwiLCBjb250YWluZXIgKS5kYXRlcGlja2VyKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjdXJyZW50IDogXCIgKyBjdXJyZW50UXVhbnRpdHksIFwiR29hbDogXCIgKyBxdWFudGl0eSwgXCJTdGFydDogXCIgKyBzdGFydCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRTZWxlY3RvcihzZWxlY3RvcnMpe1xyXG4gICAgICAgIHNlbGVjdG9ycy5mb3JFYWNoKCAoc2VsZWN0b3IpID0+ICQoXCIjZXZlbnQtXCIrc2VsZWN0b3IrXCItc2VsZWN0b3JcIikudmFsKFwiXCIpLmF0dHIoJ2V4dGVybmFsSWQnLCBudWxsKSk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNhZGQtc3BvcnQtbGF5ZXJcIikub24oXCJjbGlja1wiLCBhZGRTcG9ydExheWVyKTtcclxuXHJcbiAgICAkKFwiI2V2ZW50LWN1c3RvbUVuZC1zZWxlY3RvciwgI2V2ZW50LWN1c3RvbVN0YXJ0LXNlbGVjdG9yLCAjZXZlbnQtYXZhaWxhYmlsaXR5LXNlbGVjdG9yLCAjZXhwaXJhdGlvbi1kYXRlLCAuaW5zdGFsbG1lbnQtZGF0ZVwiKS5kYXRlcGlja2VyKCk7XHJcblxyXG4gICAgJCgnI2xpY2Vuc2UtZmlsZS1zZWxlY3Rvci1oaWRkZW4nKS5jaGVja0ZpbGVUeXBlKHtcclxuICAgICAgICBhbGxvd2VkRXh0ZW5zaW9uczogWyAncGRmJywgJ2RvYycsICdkb2N4J10sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJzxkaXYgLz4nKS5odG1sKCdGaWxlIHR5cGUgbm90IGFsbG93ZWQuIFBsZWFzZSB1cGxvYWQgYSAucGRmLCAuZG9jIG9yIC5kb2N4IGZpbGUnKS5kaWFsb2coKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjZXZlbnQtZmlsZS1zZWxlY3Rvci1oaWRkZW4nKS5jaGVja0ZpbGVUeXBlKHtcclxuICAgICAgICBhbGxvd2VkRXh0ZW5zaW9uczogWydqcGcnLCAnanBlZycsJ3BuZycsICdwZGYnLCAnZG9jJywgJ2RvY3gnXSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldElkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoXCJyZWZcIik7XHJcbiAgICAgICAgICAgICQoIHRhcmdldElkICkudmFsKCQodGhpcykudmFsKCkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0SWQgPSBcIiNcIiArICQodGhpcykuYXR0cihcInJlZlwiKTtcclxuICAgICAgICAgICAgJCggdGFyZ2V0SWQgKS5hdHRyKFwicGxhY2Vob2xkZXJcIiwgXCJBbGxvd2VkOiAucG5nLCAuanBnLCAucGRmLCAuZG9jLCAuZG9jeFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgICQodGhpcykudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKCc8ZGl2IC8+JykuaHRtbCgnRmlsZSB0eXBlIG5vdCBhbGxvd2VkJykuZGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2ltYWdlLXNlbGVjdG9yLWhpZGRlbicpLmNoZWNrRmlsZVR5cGUoe1xyXG4gICAgICAgIGFsbG93ZWRFeHRlbnNpb25zOiBbJ2pwZycsICdqcGVnJywncG5nJ10sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRJZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKFwicmVmXCIpO1xyXG4gICAgICAgICAgICAkKCB0YXJnZXRJZCApLnZhbCgkKHRoaXMpLnZhbCgpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldElkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoXCJyZWZcIik7XHJcbiAgICAgICAgICAgICQoIHRhcmdldElkICkuYXR0cihcInBsYWNlaG9sZGVyXCIsIFwiQWxsb3dlZDogLnBuZywgLmpwZ1wiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgICQodGhpcykudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKCc8ZGl2IC8+JykuaHRtbCgnRmlsZSB0eXBlIG5vdCBhbGxvd2VkJykuZGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjaGFuZ2VcIiwgXCIudW5zZWxlY3Qtb3RoZXJzXCIsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuZWFjaCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnNpYmxpbmdzKCksIGZ1bmN0aW9uIChrLCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICQoaXRlbSkuZmluZChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBpZiAoIF90aGlzICE9PSBpdGVtICkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNoZWNrZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjaGFuZ2VcIiwgXCIuc2VsZWN0LWFsbFwiLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmVhY2goJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5zaWJsaW5ncygpLCBmdW5jdGlvbiAoaywgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAkKGl0ZW0pLmZpbmQoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKTtcclxuICAgICAgICAgICAgaWYgKCBfdGhpcyA9PT0gaXRlbSApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmICggX3RoaXMuY2hlY2tlZCApe1xyXG4gICAgICAgICAgICAgICAgaW5wdXQucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNoYW5nZVwiLCBcIi50b2dnbGVyLWNoZWNrYm94XCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICAkKCAkKHRoaXMpLmF0dHIoXCJoaWRlXCIpICsgXCIsIC5vcHRpb25hbFwiLCBjb250ZXh0ICkuaGlkZSgpLmZpbmQoXCJpbnB1dFwiKS52YWwoXCJcIik7XHJcblxyXG4gICAgICAgICQoXCJpbnB1dDpjaGVja2VkXCIsIGNvbnRleHQpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JTaG93ID0gJCh0aGlzKS5hdHRyKFwic2hvd1wiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5hcHBlbmQoJCggc2VsZWN0b3JTaG93LCBjb250ZXh0ICkuc2hvdygpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmNsb3NlLWJveFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCggJCh0aGlzKS5hdHRyKFwicmVmXCIpICkucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNoYW5nZVwiLFwiLnVuc2VsZWN0LWFsbFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQuZWFjaCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnNpYmxpbmdzKCksIGZ1bmN0aW9uIChrLCBpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICggJChpdGVtKS5oYXNDbGFzcygnYWxsLXR5cGUnKSApICQoaXRlbSkuZmluZChcImlucHV0XCIpLmF0dHIoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnI2NvbnRlbnQtZGV0YWlscy1tZXRob2QtbWFzaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWwgPSAkKFwiI2VwaXNvZGVzLXF1YW50aXR5XCIpLFxyXG4gICAgICAgICAgICBxdWFudGl0eSA9IE51bWJlciggZWwudmFsKCkgKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja2VkKXtcclxuICAgICAgICAgICAgaWYgKCBxdWFudGl0eSAhPT0gXCJcIiApIGFkZEdlbmVyaWNFcGlzb2RlcyhxdWFudGl0eSk7XHJcbiAgICAgICAgICAgIGVsLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3UXVhbnRpdHkgPSBOdW1iZXIoICAkKHRoaXMpLnZhbCgpICk7XHJcbiAgICAgICAgICAgICAgICBhZGRHZW5lcmljRXBpc29kZXMobmV3UXVhbnRpdHkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWwub2ZmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgXCIuZXBpc29kZS1hdmFpbGFiaWxpdHlcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZXBpc29kZS1hdmFpbGFiaWxpdHktc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImVwaXNvZGUtYXZhaWxhYmlsaXR5LXNlbGVjdGVkXCIpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFwiI2Rvd25sb2FkLWNzdi1zaGVldFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBlbnZob3N0dXJsICsgXCJidW5kbGVzL2FwcC9kYXRhL2NvbnRlbnQtZGV0YWlscy5jc3ZcIjtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy53ZWJzaXRlJykubWFzayhcIkFcIiwge1xyXG4gICAgICAgIHRyYW5zbGF0aW9uOiB7XHJcbiAgICAgICAgICAgIFwiQVwiOiB7IHBhdHRlcm46IC9bXFx3L1xcLS4rXS8sIHJlY3Vyc2l2ZTogdHJ1ZSB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zZWxsLnN0ZXAxLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgQ29udGVudEFyZW5hLlRlc3QgPSBDb250ZW50QXJlbmEuVGVzdCB8fCB7fTtcclxuXHJcbiAgICB2YXIgc2VsZWN0b3JDb3VudGVyID0gMCxcclxuICAgICAgICBtYWluUGFja2FnZSA9IG51bGw7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRGdWxsUGFja2FnZXMoKSB7XHJcbiAgICAgICAgdmFyIGxpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgJChcIi5wYWNrYWdlLXNlbGVjdG9yOmNoZWNrZWRcIikuZWFjaChmdW5jdGlvbihrLHYpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhY2sgPSB7XHJcbiAgICAgICAgICAgICAgICBpZCA6ICQodikuYXR0cihcImlkXCIpLnNwbGl0KFwiLVwiKVsxXSxcclxuICAgICAgICAgICAgICAgIG5hbWUgOiAkKHYpLmF0dHIoXCJuYW1lXCIpLnNwbGl0KFwiLVwiKVsxXVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGlzdC5wdXNoKHBhY2spO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRGdWxsU2VsZWN0ZWRQYWNrYWdlcygpIHtcclxuICAgICAgICB2YXIgcmVzcG9uc2UgPSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkIDoge30sXHJcbiAgICAgICAgICAgIHNlbGVjdGVkSWRzIDogW10sXHJcbiAgICAgICAgICAgIHNlbGVjdGVkTmFtZXMgOiBbXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICQoXCIucGFja2FnZS1zZWxlY3RvcjpjaGVja2VkXCIpLmVhY2goZnVuY3Rpb24oayx2KXtcclxuXHJcbiAgICAgICAgICAgIHZhciBpZCA9ICQodikuYXR0cihcImlkXCIpLnNwbGl0KFwiLVwiKVsxXSxcclxuICAgICAgICAgICAgICAgIG5hbWUgPSAkKHYpLmF0dHIoXCJuYW1lXCIpLnNwbGl0KFwiLVwiKVsxXTtcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbGVjdGVkW2lkXSA9IHtcclxuICAgICAgICAgICAgICAgIGlkIDogaWQsXHJcbiAgICAgICAgICAgICAgICBuYW1lIDogbmFtZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2Uuc2VsZWN0ZWRJZHMucHVzaChpZCk7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbGVjdGVkTmFtZXMucHVzaChuYW1lKVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVzcG9uc2UuZ2V0SWRCeU5hbWUgPSBmdW5jdGlvbiggbmFtZSApe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZElkc1t0aGlzLnNlbGVjdGVkTmFtZXMuaW5kZXhPZihuYW1lKV1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29sbGVjdFNlbGVjdGVkUmlnaHRJdGVtcyAoY29udGFpbmVyKXtcclxuXHJcbiAgICAgICAgdmFyIGxpc3QgPSBbXTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmZpbmQoXCJpbnB1dDpjaGVja2VkLCAubm90LW9wdGlvbmFsXCIpLmVhY2goZnVuY3Rpb24gKGssIGVsKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICEkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmlzKFwiOnZpc2libGVcIikgKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggJChlbCkuYXR0cihcImFsbFwiKSAhPT0gdW5kZWZpbmVkICApIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkUmlnaHQgPSBuZXcgQ29udGVudEFyZW5hLk1vZGVsLlNlbGVjdGVkUmlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmlnaHQucmlnaHQgPSAkKGVsKS5hdHRyKFwicmlnaHQtaWRcIik7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmlnaHQucmlnaHRJdGVtID0gJChlbCkuYXR0cihcInJpZ2h0LWl0ZW0taWRcIik7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmlnaHQuZ3JvdXAgPSAkKGVsKS5kYXRhKFwiZ3JvdXBcIik7XHJcblxyXG4gICAgICAgICAgICAkKGVsKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiaW5wdXQ6bm90KFt0eXBlPSdjaGVja2JveCddKTpub3QoLmNob3Nlbi1zZWFyY2gtaW5wdXQpLCB0ZXh0YXJlYSwgc2VsZWN0XCIpLmVhY2goZnVuY3Rpb24gKGtleSwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSaWdodC5pbnB1dHMucHVzaCggJChlbGVtZW50KS52YWwoKSApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxpc3QucHVzaChzZWxlY3RlZFJpZ2h0KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbGxlY3RTZWxlY3RlZFJpZ2h0cygpe1xyXG4gICAgICAgIHZhciBzZWxlY3RlZFJpZ2h0cz0gW10sXHJcbiAgICAgICAgICAgIHNlbGVjdGVkUGFja2FnZXMgPSBnZXRTZWxlY3RlZEZ1bGxQYWNrYWdlcygpLFxyXG4gICAgICAgICAgICBtdWx0aXBsZSA9ICQoXCIjbWFpbi1tdWx0aXBsZS1wYWNrYWdlXCIpLFxyXG4gICAgICAgICAgICBzaW5nbGUgPSAkKFwiI21haW4tc2luZ2xlLXBhY2thZ2VcIik7XHJcblxyXG4gICAgICAgIGlmICggbXVsdGlwbGUuaXMoXCI6dmlzaWJsZVwiKSApe1xyXG4gICAgICAgICAgICBzZWxlY3RlZFJpZ2h0cyA9IHNlbGVjdGVkUmlnaHRzLmNvbmNhdCggY29sbGVjdFNlbGVjdGVkUmlnaHRJdGVtcyhtdWx0aXBsZSkgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggc2luZ2xlLmlzKFwiOnZpc2libGVcIikgKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRSaWdodHMgPSBzZWxlY3RlZFJpZ2h0cy5jb25jYXQoIGNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMoc2luZ2xlKSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBzZWxlY3RlZFBhY2thZ2VzLmxlbmd0aCA+IDEgKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRQYWNrYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChwYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFJpZ2h0cyA9IHNlbGVjdGVkUmlnaHRzLmNvbmNhdCggY29sbGVjdFNlbGVjdGVkUmlnaHRJdGVtcyggJChcIiNzZWxsLWJveC1wYWNrYWdlLVwiICsgcGFjay5pZCApKSApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5wcm9kdWN0aW9uLXN0YW5kYXJkczp2aXNpYmxlXCIpLmVhY2goZnVuY3Rpb24oaywgZWwpe1xyXG4gICAgICAgICAgICBzZWxlY3RlZFJpZ2h0cyA9IHNlbGVjdGVkUmlnaHRzLmNvbmNhdCggY29sbGVjdFNlbGVjdGVkUmlnaHRJdGVtcyggJChlbCkgKSApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRSaWdodHM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlU2FsZXNQYWNrYWdlcygpe1xyXG5cclxuICAgICAgICB2YXIgcGFja2FnZXMgPSBbXTtcclxuXHJcbiAgICAgICAgJChcIi5zYWxlcy1wYWNrYWdlXCIpLmVhY2goZnVuY3Rpb24oaywgcGFja2FnZUNvbnRhaW5lcil7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2FsZXNQYWNrYWdlID0gbmV3IENvbnRlbnRBcmVuYS5Nb2RlbC5TYWxlc1BhY2thZ2UoKTtcclxuICAgICAgICAgICAgdmFyIGlkID0gJChwYWNrYWdlQ29udGFpbmVyKS5hdHRyKFwiaWRcIikucmVwbGFjZShcInNhbGVzLXBhY2thZ2UtXCIsXCJcIik7XHJcblxyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2UudGVycml0b3JpZXMgPSAkKFwiLnRlcnJpdG9yaWVzOmNoZWNrZWRcIiwgcGFja2FnZUNvbnRhaW5lcikuYXR0cihcInZhbFwiKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLnNhbGVzTWV0aG9kID0gJChcIi5zYWxlcy1tZXRob2Q6Y2hlY2tlZFwiLCBwYWNrYWdlQ29udGFpbmVyKS5hdHRyKFwidmFsXCIpO1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2UuY3VycmVuY3kgPSAkKFwiLmN1cnJlbmN5OmNoZWNrZWRcIiwgcGFja2FnZUNvbnRhaW5lcikuYXR0cihcInZhbFwiKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLmlkID0gaWQ7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS5uYW1lID0gJChcIiNzYWxlcy1wYWNrYWdlLVwiICsgaWQgK1wiLW5hbWVcIikudmFsKCk7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS5mZWUgPSAkKFwiLmZlZTp2aXNpYmxlXCIsIHBhY2thZ2VDb250YWluZXIpLnZhbCgpO1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2UudGVycml0b3J5QmlkcyA9ICQoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICtcIi10ZXJyaXRvcnktYmlkc1wiKS5pcyhcIjpjaGVja2VkXCIpO1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2UudGVycml0b3J5QXNQYWNrYWdlID0gJChcIiNzYWxlcy1wYWNrYWdlLVwiICsgaWQgK1wiLXRlcnJpdG9yaWVzLWFzLXBhY2thZ2VcIikuaXMoXCI6Y2hlY2tlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICggc2FsZXNQYWNrYWdlLnRlcnJpdG9yaWVzID09PSBcInNlbGVjdGVkXCIpIHNhbGVzUGFja2FnZS5zZWxlY3RlZFRlcnJpdG9yaWVzID0gJChcIiNzYWxlcy1wYWNrYWdlLVwiICsgaWQgK1wiLXRlcnJpdG9yeS1zZWxlY3RlZFwiKS5jaG9zZW4oKS52YWwoKTtcclxuICAgICAgICAgICAgaWYgKCBzYWxlc1BhY2thZ2UudGVycml0b3JpZXMgPT09IFwiZXhjbHVkZWRcIikgc2FsZXNQYWNrYWdlLmV4Y2x1ZGVkVGVycml0b3JpZXMgPSAkKFwiI3NhbGVzLXBhY2thZ2UtXCIgKyBpZCArXCItdGVycml0b3J5LWV4Y2x1ZGVkXCIpLmNob3NlbigpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgcGFja2FnZXMucHVzaChzYWxlc1BhY2thZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcGFja2FnZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVTdGVwVHdvKCl7XHJcblxyXG4gICAgICAgIHZhciBoYXNFcnJvcnMgPSBmYWxzZSxcclxuICAgICAgICAgICAgbWVzc2FnZXMgPSBbXSxcclxuICAgICAgICAgICAgZXhwaXJhdGlvbkRhdGUgPSAkKFwiI2V4cGlyYXRpb24tZGF0ZVwiKSxcclxuICAgICAgICAgICAgcmlnaHRzID0gY29sbGVjdFNlbGVjdGVkUmlnaHRzKCksXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzQ29udGFpbmVyID0gJCgnPGRpdiB0aXRsZT1cIlRoZSBmb3JtIGlzIGluY29tcGxldGUhXCIgLz4nKSxcclxuICAgICAgICAgICAgdG90YWwgPSAwLFxyXG4gICAgICAgICAgICBzZWxlY3RlZFBhY2thZ2VzID0gZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXMoKTtcclxuXHJcbiAgICAgICAgJChcIi5pbnN0YWxsbWVudC1wZXJjZW50XCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdG90YWwgKz0gTnVtYmVyICggJCh0aGlzKS52YWwoKS5yZXBsYWNlKFwiJVwiLCBcIlwiKSApXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICggdG90YWwgIT09IDEwMCApIHtcclxuICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaCggJCgnPGRpdiBjbGFzcz1cInBvcHVwLWVycm9yLW1lc3NhZ2VcIiAvPicpLmh0bWwoJ1RvdGFsIGluc3RhbGxtZW50cyBtdXN0IHN1bSAxMDAlIScpICk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50Lmluc3RhbGxtZW50cyA9IGNvbGxlY3RJbnN0YWxsbWVudHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LnNhbGVzUGFja2FnZXMgPSB2YWxpZGF0ZVNhbGVzUGFja2FnZXMoKTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5zYWxlc1BhY2thZ2VzLmZvckVhY2goZnVuY3Rpb24oc2FsZXNQYWNrYWdlKXtcclxuICAgICAgICAgICAgdmFyIHZhbGlkID0gc2FsZXNQYWNrYWdlLnZhbGlkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHZhbGlkLmhhc0Vycm9ycyApe1xyXG4gICAgICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goICQoJzxkaXYgY2xhc3M9XCJwb3B1cC1lcnJvci1tZXNzYWdlXCIgLz4nKS5odG1sKHZhbGlkLmRlc2NyaXB0aW9uKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQucmlnaHRzID0gcmlnaHRzO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LnBhY2thZ2VzID0gc2VsZWN0ZWRQYWNrYWdlcy5zZWxlY3RlZElkcztcclxuXHJcbiAgICAgICAgaWYgKCBleHBpcmF0aW9uRGF0ZS52YWwoKSA9PT0gXCJcIiApe1xyXG4gICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKCAkKCc8ZGl2IGNsYXNzPVwicG9wdXAtZXJyb3ItbWVzc2FnZVwiIC8+JykuaHRtbCgnUGxlYXNlIHNlbGVjdCBhbiBleHBpcmF0aW9uIGRhdGUnKSApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LmV4cGlyZXNBdCA9ICBleHBpcmF0aW9uRGF0ZS52YWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggaGFzRXJyb3JzICl7XHJcblxyXG4gICAgICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKChjb250ZW50KT0+e1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNDb250YWluZXIuYXBwZW5kKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzQ29udGFpbmVyLmRpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogNDAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICFoYXNFcnJvcnM7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFNhbGVzUGFja2FnZSgpe1xyXG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9ICQudGVtcGxhdGVzKFwiI3NhbGVzLXBhY2thZ2UtdGVtcGxhdGVcIiksXHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZXMgPSAkKFwiLnNhbGVzLXBhY2thZ2VcIiksXHJcbiAgICAgICAgICAgIGlkID0gc2FsZXNQYWNrYWdlcy5sZW5ndGggKyAxLFxyXG4gICAgICAgICAgICBodG1sT3V0cHV0ID0gdGVtcGxhdGUucmVuZGVyKHtpZDogaWQgfSk7XHJcblxyXG4gICAgICAgIGlmICggaWQgPT09IDEgKXtcclxuICAgICAgICAgICAgJChcIi5yaWdodHMtbGlzdFwiKS5sYXN0KCkuYWZ0ZXIoaHRtbE91dHB1dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlcy5sYXN0KCkuYWZ0ZXIoaHRtbE91dHB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLnByaWNlLW9wdGlvbmFsXCIsIFwiI3NhbGVzLXBhY2thZ2UtXCIgKyBpZCkuaGlkZSgpO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5VdGlscy5hZGRSZWdpb25CZWhhdmlvdXIoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICsgXCIgLmhhcy1yZWdpb24tc2VsZWN0b3JcIik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qZnVuY3Rpb24gYWRkRGlzdHJpYnV0aW9uUGFja2FnZXMoIG5hbWUgKXtcclxuXHJcbiAgICAgICAgdmFyIGRpc3RyaWJ1dGlvblBhY2thZ2UgPSAkKFwiLnByb2R1Y3Rpb24tc3RhbmRhcmRzXCIsIFwiI2JveC10ZW1wbGF0ZXNcIikuY2xvbmUoKSxcclxuICAgICAgICAgICAgdGVjaG5pY2FsRGVsaXZlcnkgPSAkKFwiLnRlY2huaWNhbC1kZWxpdmVyeVwiLCBcIiNib3gtdGVtcGxhdGVzXCIpLmNsb25lKCksXHJcbiAgICAgICAgICAgIGRpc3RyaWJ1dGlvblBhY2thZ2VUaXRsZSA9IGRpc3RyaWJ1dGlvblBhY2thZ2UuZmluZChcIi5ib3gtdGl0bGVcIiksXHJcbiAgICAgICAgICAgIHRlY2huaWNhbERlbGl2ZXJ5VGl0bGUgPSB0ZWNobmljYWxEZWxpdmVyeS5maW5kKFwiLmJveC10aXRsZVwiKSxcclxuICAgICAgICAgICAgdGl0bGUgPSBuYW1lLnJlcGxhY2UoXCItXCIsIFwiIC0gXCIpLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9ICQudGVtcGxhdGVzKFwiI2NvbnRlbnQtZGV0YWlscy10ZW1wbGF0ZVwiKSxcclxuICAgICAgICAgICAgZXBpc29kZVRlbXBsYXRlID0gJC50ZW1wbGF0ZXMoXCIjZXBpc29kZS10ZW1wbGF0ZVwiKTtcclxuXHJcbiAgICAgICAgJChcIltncm91cD0nUHJvZHVjdGlvbiBzdGFuZGFyZHMnXVwiLCBcIi5yaWdodHMtbGlzdFwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0ID0gJCh0aGlzKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlLmZpbmQoXCIuc2VsbGVyLWJveC1jb250ZW50XCIpLmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIltncm91cD0nVGVjaG5pY2FsIGRlbGl2ZXJ5J11cIiwgXCIucmlnaHRzLWxpc3RcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgdGVzdCA9ICQodGhpcykuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGVjaG5pY2FsRGVsaXZlcnkuZmluZChcIi5zZWxsZXItYm94LWNvbnRlbnRcIikuYXBwZW5kKHRlc3QpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlLmF0dHIoXCJpZFwiLFwiZGlzdHJpYnV0aW9uLXBhY2thZ2UtXCIgKyBuYW1lKS5zaG93KCkuaW5zZXJ0QmVmb3JlKFwiLnJpZ2h0cy1saXN0XCIpO1xyXG4gICAgICAgIHRlY2huaWNhbERlbGl2ZXJ5LmF0dHIoXCJpZFwiLFwidGVjaG5pY2FsLWRlbGl2ZXJ5LVwiICsgbmFtZSkuc2hvdygpLmluc2VydEFmdGVyKGRpc3RyaWJ1dGlvblBhY2thZ2UpO1xyXG4gICAgICAgIGRpc3RyaWJ1dGlvblBhY2thZ2VUaXRsZS5odG1sKFwiRGlzdHJpYnV0aW9uIHBhY2thZ2UgLSBcIiArIGRpc3RyaWJ1dGlvblBhY2thZ2VUaXRsZS5odG1sKCkgKyBcIiAtXCIgICsgdGl0bGUpO1xyXG4gICAgICAgIHRlY2huaWNhbERlbGl2ZXJ5VGl0bGUuaHRtbCh0ZWNobmljYWxEZWxpdmVyeVRpdGxlLmh0bWwoKSArIFwiIC0gXCIgKyB0aXRsZSk7XHJcblxyXG4gICAgICAgICQoXCIub3B0aW9uYWxcIix0ZWNobmljYWxEZWxpdmVyeSkuaGlkZSgpO1xyXG5cclxuICAgICAgICAkKFwiLm9wdGlvbmFsXCIsZGlzdHJpYnV0aW9uUGFja2FnZSkuaGlkZSgpO1xyXG5cclxuICAgICAgICAkKFwibGFiZWxcIiwgZGlzdHJpYnV0aW9uUGFja2FnZSApLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZm9yXCIsIFwiZGlzdHJpYnV0aW9uLXBhY2thZ2UtXCIgKyBuYW1lICsgXCItXCIgKyAkKHRoaXMpLmF0dHIoXCJmb3JcIikgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiaW5wdXQsIHNlbGVjdFwiLCBkaXN0cmlidXRpb25QYWNrYWdlICkuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJpZFwiLCBcImRpc3RyaWJ1dGlvbi1wYWNrYWdlLVwiICsgbmFtZSArIFwiLVwiICsgJCh0aGlzKS5hdHRyKFwiaWRcIikgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwibGFiZWxcIiwgdGVjaG5pY2FsRGVsaXZlcnkgKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImZvclwiLCBcInRlY2huaWNhbC1kZWxpdmVyeS1cIiArIG5hbWUgKyBcIi1cIiArICQodGhpcykuYXR0cihcImZvclwiKSApXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCJpbnB1dCwgc2VsZWN0XCIsIHRlY2huaWNhbERlbGl2ZXJ5ICkuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJpZFwiLCBcInRlY2huaWNhbC1kZWxpdmVyeS1cIiArIG5hbWUgKyBcIi1cIiArICQodGhpcykuYXR0cihcImlkXCIpIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkxhbmd1YWdlcy5hZGRMYW5ndWFnZUJlaGF2aW91cihcIiNkaXN0cmlidXRpb24tcGFja2FnZS1cIiArIG5hbWUgKyBcIiAuaGFzLWxhbmd1YWdlLXRyaWdnZXJcIik7XHJcblxyXG4gICAgICAgIGlmKCBuYW1lID09PSBcIlByb2dyYW1cIiApe1xyXG4gICAgICAgICAgICB0ZWNobmljYWxEZWxpdmVyeS5maW5kKFwiLnNlbGxlci1ib3gtY29udGVudFwiKS5hcHBlbmQodGVtcGxhdGUucmVuZGVyKCkpO1xyXG4gICAgICAgICAgICAkKFwiI3VwbG9hZC1jb250ZW50LWNzdlwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgICQoJyNjc3Ytc2VsZWN0b3ItaGlkZGVuJykudHJpZ2dlcihcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoQ29udGVudEFyZW5hLlV0aWxzLmlzQVBJQXZhaWxhYmxlKCkpIHtcclxuICAgICAgICAgICAgICAgICQoJyNjc3Ytc2VsZWN0b3ItaGlkZGVuJykuYmluZCgnY2hhbmdlJywgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWxlcyA9IGV2dC50YXJnZXQuZmlsZXM7IC8vIEZpbGVMaXN0IG9iamVjdFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWxlID0gZmlsZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJyNjb250ZW50LWRldGFpbHMtbWFzaycpLmh0bWwoXCJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8hKipcclxuICAgICAgICAgICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7eyB0YXJnZXQ6e30gfX0gZXZlbnRcclxuICAgICAgICAgICAgICAgICAgICAgKiEvXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNzdiA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJC5jc3YudG9BcnJheXMoY3N2KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm93LCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBpbmRleCA+IDAgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjY29udGVudC1kZXRhaWxzLW1hc2snKS5hcHBlbmQoZXBpc29kZVRlbXBsYXRlLnJlbmRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVwaXNvZGU6IHJvd1swXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNlcGlzb2Rlcy1xdWFudGl0eVwiKS52YWwoZGF0YS5sZW5ndGggLSAxKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpeyBhbGVydCgnVW5hYmxlIHRvIHJlYWQgJyArIGZpbGUuZmlsZU5hbWUpOyB9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkaXN0cmlidXRpb25QYWNrYWdlO1xyXG5cclxuICAgIH0qL1xyXG5cclxuICAgIC8qZnVuY3Rpb24gYWRkRXh0cmFEaXN0cmlidXRpb25QYWNrYWdlKCBkaXN0cmlidXRpb25QYWNrYWdlKXtcclxuXHJcbiAgICAgICAgdmFyIHNlbGVjdG9ycyA9IFtdLFxyXG4gICAgICAgICAgICBwYWNrYWdlcyA9IGdldEZ1bGxTZWxlY3RlZFBhY2thZ2VzKCksXHJcbiAgICAgICAgICAgIGhpZ2hsaWdodHMgPSBwYWNrYWdlcy5zZWxlY3RlZE5hbWVzLmluZGV4T2YoXCJIaWdobGlnaHRzXCIpICE9PSAtMSxcclxuICAgICAgICAgICAgY2xpcHMgPSBwYWNrYWdlcy5zZWxlY3RlZE5hbWVzLmluZGV4T2YoXCJDbGlwc1wiKSAhPT0gLTEsXHJcbiAgICAgICAgICAgIG5ld3MgPSBwYWNrYWdlcy5zZWxlY3RlZE5hbWVzLmluZGV4T2YoXCJOZXdzIGFjY2Vzc1wiKSAhPT0gLTE7XHJcblxyXG4gICAgICAgIGRpc3RyaWJ1dGlvblBhY2thZ2UuZmluZChcIi5zZWxsZXItYm94LWNvbnRlbnRcIikuYXBwZW5kKCAkKFwiLmV4dHJhLWRpc3RyaWJ1dGlvbi1wYWNrYWdlc1wiKS5jbG9uZSgpLnNob3coKSk7XHJcblxyXG4gICAgICAgIGlmIChoaWdobGlnaHRzICkgc2VsZWN0b3JzLnB1c2goXCIuZXh0cmEtcGFja2FnZS1oaWdobGlnaHRcIiApO1xyXG4gICAgICAgIGlmIChjbGlwcyApIHNlbGVjdG9ycy5wdXNoKFwiLmV4dHJhLXBhY2thZ2UtY2xpcHNcIiApO1xyXG4gICAgICAgIGlmIChuZXdzICkgc2VsZWN0b3JzLnB1c2goXCIuZXh0cmEtcGFja2FnZS1uZXdzXCIgKTtcclxuICAgICAgICBpZiAoaGlnaGxpZ2h0cyAmJiBjbGlwcyApIHNlbGVjdG9ycy5wdXNoKFwiLmV4dHJhLXBhY2thZ2UtaGlnaGxpZ2h0LWNsaXBzXCIgKTtcclxuICAgICAgICBpZiAoaGlnaGxpZ2h0cyAmJiBuZXdzICkgc2VsZWN0b3JzLnB1c2goXCIuZXh0cmEtcGFja2FnZS1oaWdobGlnaHQtbmV3c1wiICk7XHJcbiAgICAgICAgaWYgKGNsaXBzICYmIG5ld3MgKSBzZWxlY3RvcnMucHVzaChcIi5leHRyYS1wYWNrYWdlLWNsaXBzLW5ld3NcIiApO1xyXG4gICAgICAgIGlmIChoaWdobGlnaHRzICYmIG5ld3MgJiYgY2xpcHMgKSBzZWxlY3RvcnMucHVzaChcIi5leHRyYS1wYWNrYWdlLWhpZ2hsaWdodC1jbGlwcy1uZXdzXCIgKTtcclxuXHJcbiAgICAgICAgJChzZWxlY3RvcnMuam9pbihcIiwgXCIpLCBkaXN0cmlidXRpb25QYWNrYWdlKS5zaG93KCk7XHJcblxyXG4gICAgICAgICQoXCIuZGlzdHJpYnV0aW9uLXBhY2thZ2Utc2VsZWN0b3JcIiwgZGlzdHJpYnV0aW9uUGFja2FnZSkub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gJCh0aGlzKS52YWwoKS5zcGxpdChcIiwgXCIpO1xyXG5cclxuICAgICAgICAgICAgJChcIi50ZWNobmljYWwtZGVsaXZlcnk6dmlzaWJsZTpub3QoI3RlY2huaWNhbC1kZWxpdmVyeS1NYWluKVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJChcIi5wcm9kdWN0aW9uLXN0YW5kYXJkczp2aXNpYmxlOm5vdCgjZGlzdHJpYnV0aW9uLXBhY2thZ2UtTWFpbilcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICBhZGREaXN0cmlidXRpb25QYWNrYWdlcyggdmFsdWVzLmpvaW4oXCItXCIpICk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKmZ1bmN0aW9uIGNoZWNrU2VsZWN0ZWRQYWNrYWdlcygpIHtcclxuXHJcbiAgICAgICAgdmFyIGZ1bGxQYWNrYWdlc0RhdGEgPSBnZXRGdWxsU2VsZWN0ZWRQYWNrYWdlcygpLFxyXG4gICAgICAgICAgICBwYWNrYWdlcyA9IGZ1bGxQYWNrYWdlc0RhdGEuc2VsZWN0ZWRJZHMsXHJcbiAgICAgICAgICAgIHBhY2thZ2VzTmFtZSA9IGZ1bGxQYWNrYWdlc0RhdGEuc2VsZWN0ZWROYW1lcyxcclxuICAgICAgICAgICAgbWFpbkl0ZW1zID0gW10sXHJcbiAgICAgICAgICAgIHNpbmdsZUl0ZW1zID0gW10sXHJcbiAgICAgICAgICAgIGRpc3RyaWJ1dGlvblBhY2thZ2UsXHJcbiAgICAgICAgICAgIG11bHRpUGFja2FnZSA9ICggcGFja2FnZXMubGVuZ3RoID4gMSksXHJcbiAgICAgICAgICAgIG1haW5UYXJnZXQgPSAobXVsdGlQYWNrYWdlKSA/ICQoXCIjbWFpbi1tdWx0aXBsZS1wYWNrYWdlXCIpIDogJChcIiNtYWluLXNpbmdsZS1wYWNrYWdlXCIpO1xyXG5cclxuXHJcbiAgICAgICAgJC5lYWNoKCQoXCIuc2VsbGVyLWJveC1jb250ZW50XCIpLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmNoaWxkcmVuKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuY2hpbGRyZW4oKS5maXJzdCgpLmNzcyhcImRpc3BsYXlcIikgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi5zZWxlY3QtYm94LWl0ZW0tY29udGFpbmVyXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnJpZ2h0cy1jb250YWluZXJcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucmlnaHRzLWNvbnRhaW5lcjpub3QoLnRlY2huaWNhbC1kZWxpdmVyeSkgLnNlbGxlci1ib3gtY29udGVudFwiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICQoXCIucHJvZHVjdGlvbi1zdGFuZGFyZHNcIiwgXCIjc3RlcDJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgJChcIi50ZWNobmljYWwtZGVsaXZlcnlcIiwgXCIjc3RlcDJcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICQuZWFjaChwYWNrYWdlcywgZnVuY3Rpb24oaywgdil7XHJcblxyXG4gICAgICAgICAgICBzaW5nbGVJdGVtcy5wdXNoKFwiLmhhcy1wYWNrYWdlLVwiK3YrXCI6bm90KC5pcy1jb2xsZWN0aXZlbHkpW2dyb3VwPSdNYWluIEluZm9ybWF0aW9uJ11cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIG11bHRpUGFja2FnZSApe1xyXG4gICAgICAgICAgICAgICAgbWFpbkl0ZW1zLnB1c2goXCIuaGFzLXBhY2thZ2UtXCIrditcIi5pcy1jb2xsZWN0aXZlbHlbZ3JvdXA9J01haW4gSW5mb3JtYXRpb24nXVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIuaGFzLXBhY2thZ2UtXCIrditcIjpub3QoLmlzLWNvbGxlY3RpdmVseSlbZ3JvdXA9J01haW4gSW5mb3JtYXRpb24nXVwiLCBcIi5yaWdodHMtbGlzdFwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlc3QgPSAkKHRoaXMpLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNzZWxsLWJveC1wYWNrYWdlLVwiKyB2ICtcIiAuc2VsbGVyLWJveC1jb250ZW50XCIpLmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQoXCIjc2VsbC1ib3gtcGFja2FnZS1cIisgdiApLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1haW5JdGVtcy5wdXNoKFwiLmhhcy1wYWNrYWdlLVwiK3YrXCJbZ3JvdXA9J01haW4gSW5mb3JtYXRpb24nXVwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJChcIi5oYXMtcGFja2FnZS1cIiArIHYpLnNob3coKTtcclxuXHJcbiAgICAgICAgICAgICQoXCJsYWJlbFwiLCBcIiNzZWxsLWJveC1wYWNrYWdlLVwiICsgdiApLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImZvclwiLCBcInBhY2thZ2UtXCIgKyB2ICsgXCItXCIgKyAkKHRoaXMpLmF0dHIoXCJmb3JcIikgKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCJpbnB1dFwiLCBcIiNzZWxsLWJveC1wYWNrYWdlLVwiICsgdiApLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImlkXCIsIFwicGFja2FnZS1cIiArIHYgKyBcIi1cIiArICQodGhpcykuYXR0cihcImlkXCIpIClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwic2VsZWN0XCIsIFwiI3NlbGwtYm94LXBhY2thZ2UtXCIgKyB2ICkuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiaWRcIiwgXCJwYWNrYWdlLVwiICsgdiArIFwiLVwiICsgJCh0aGlzKS5hdHRyKFwiaWRcIikgKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5MYW5ndWFnZXMuYWRkTGFuZ3VhZ2VCZWhhdmlvdXIoIFwiI3NlbGwtYm94LXBhY2thZ2UtXCIgKyB2ICtcIiAuaGFzLWxhbmd1YWdlLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICQoIFwiI3NlbGwtYm94LXBhY2thZ2UtXCIgKyB2ICtcIiAuaGFzLWNhbGVuZGFyXCIpLmVhY2goZnVuY3Rpb24gKGssIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIgKyAkKGVsZW1lbnQpLmF0dHIoXCJpZFwiKSkuZGF0ZXBpY2tlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCIub3B0aW9uYWxcIiwgXCIjc2VsbC1ib3gtcGFja2FnZS1cIiArIHYgKS5oaWRlKCk7XHJcblxyXG4gICAgICAgIH0pIDtcclxuXHJcbiAgICAgICAgJChtYWluSXRlbXMuam9pbihcIixcIiksIFwiLnJpZ2h0cy1saXN0XCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHRlc3QgPSAkKHRoaXMpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIG1haW5UYXJnZXQuZmluZChcIi5zZWxsZXItYm94LWNvbnRlbnRcIikuYXBwZW5kKHRlc3QpO1xyXG4gICAgICAgICAgICBtYWluVGFyZ2V0LnNob3coKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCBwYWNrYWdlc05hbWUuaW5kZXhPZihcIlByb2dyYW1cIikgPT09IC0xIHx8IHBhY2thZ2VzTmFtZS5sZW5ndGggPiAxICl7XHJcbiAgICAgICAgICAgIGRpc3RyaWJ1dGlvblBhY2thZ2UgPSBhZGREaXN0cmlidXRpb25QYWNrYWdlcyggXCJNYWluXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBwYWNrYWdlc05hbWUubGVuZ3RoID4gMVxyXG4gICAgICAgICAgICAmJiAoIHBhY2thZ2VzTmFtZS5pbmRleE9mKFwiQ2xpcHNcIikgIT09IC0xXHJcbiAgICAgICAgICAgICAgICB8fCBwYWNrYWdlc05hbWUuaW5kZXhPZihcIkhpZ2hsaWdodHNcIikgIT09IC0xXHJcbiAgICAgICAgICAgICAgICB8fCBwYWNrYWdlc05hbWUuaW5kZXhPZihcIk5ld3MgYWNjZXNzXCIpICE9PSAtMVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKXtcclxuICAgICAgICAgICAgYWRkRXh0cmFEaXN0cmlidXRpb25QYWNrYWdlKGRpc3RyaWJ1dGlvblBhY2thZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBwYWNrYWdlc05hbWUuaW5kZXhPZihcIlByb2dyYW1cIikgIT09IC0xICl7XHJcbiAgICAgICAgICAgIGFkZERpc3RyaWJ1dGlvblBhY2thZ2VzKCBcIlByb2dyYW1cIiApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIiNtYWluLXNlbGwtYm94XCIpLnNob3coKTtcclxuICAgICAgICAkKFwiI3ByaWNlLXNlbGwtYm94XCIpLnNob3coKTtcclxuICAgICAgICAkKFwiLnBhY2thZ2UtcmVhZHktYnV0dG9uXCIpLnNob3coKTtcclxuICAgICAgICAkKFwiI3ByaWNlLXNlbGwtYm94IC5zZWxlY3QtYm94LWl0ZW0tY29udGFpbmVyXCIpLnNob3coKTtcclxuICAgICAgICBDb250ZW50QXJlbmEuTGFuZ3VhZ2VzLmFkZExhbmd1YWdlQmVoYXZpb3VyKCBtYWluVGFyZ2V0LmZpbmQoXCIuaGFzLWxhbmd1YWdlLXRyaWdnZXJcIikgKTtcclxuICAgICAgICBtYWluVGFyZ2V0LmZpbmQoXCIuaGFzLWNhbGVuZGFyXCIpLmVhY2goZnVuY3Rpb24gKGssIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgJChcIiNcIiArICQoZWxlbWVudCkuYXR0cihcImlkXCIpKS5kYXRlcGlja2VyKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWFpblRhcmdldC5maW5kKFwiLm9wdGlvbmFsXCIpLmhpZGUoKTtcclxuXHJcbiAgICB9Ki9cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cEluc3RhbGxtZW50KCl7XHJcbiAgICAgICAgJChcIi5pbnN0YWxsbWVudC1wZXJjZW50XCIpLm9mZigpLm1hc2soJzAwMCUnLCB7cmV2ZXJzZTogdHJ1ZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbGxlY3RJbnN0YWxsbWVudHMoKXtcclxuXHJcbiAgICAgICAgdmFyIGluc3RhbGxtZW50cyA9IFtdO1xyXG5cclxuICAgICAgICAkKFwiLmluc3RhbGxtZW50XCIpLmVhY2goZnVuY3Rpb24oaywgcGFja2FnZUNvbnRhaW5lcil7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5zdGFsbG1lbnQgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGluc3RhbGxtZW50LnBlcmNlbnQgPSAkKFwiLmluc3RhbGxtZW50LXBlcmNlbnRcIiwgcGFja2FnZUNvbnRhaW5lcikudmFsKCkucmVwbGFjZShcIiVcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGluc3RhbGxtZW50LmRhdGUgPSAkKFwiLmluc3RhbGxtZW50LWRhdGVcIiwgcGFja2FnZUNvbnRhaW5lcikudmFsKCk7XHJcbiAgICAgICAgICAgIGluc3RhbGxtZW50LnNpZ25pbmdfZGF5ID0gJChcIi5pbnN0YWxsbWVudC1kYXlzXCIsIHBhY2thZ2VDb250YWluZXIpLnZhbCgpO1xyXG4gICAgICAgICAgICBpbnN0YWxsbWVudC5ncmFudGVkX2RheSA9ICQoXCIuZ3JhbnRlZC1kYXlzXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgaW5zdGFsbG1lbnRzLnB1c2goaW5zdGFsbG1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5zdGFsbG1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN1Ym1pdGZvcm0oKSB7XHJcbiAgICAgICAgdmFyIHVybCA9IGVudmhvc3R1cmwgKyAnc2VsbC9wdWJsaXNoZWQnLFxyXG4gICAgICAgICAgICBmb3JtID0gJCgnI215Zm9ybScpO1xyXG5cclxuICAgICAgICBmb3JtLmF0dHIoJ2FjdGlvbicsIHVybCk7XHJcblxyXG4gICAgICAgIHZhciBkYXRhID0gSlNPTi5zdHJpbmdpZnkoQ29udGVudEFyZW5hLkNvbnRlbnQpO1xyXG5cclxuICAgICAgICAkKCc8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJqc29uXCIvPicpLnZhbChkYXRhKS5hcHBlbmRUbygnI215Zm9ybScpO1xyXG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uICgpIHt9O1xyXG4gICAgICAgIGZvcm0uc3VibWl0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIiN1cGxvYWQtYWdyZWVtZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICQoJyNsaWNlbnNlLWZpbGUtc2VsZWN0b3ItaGlkZGVuJykudHJpZ2dlcihcImNsaWNrXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNzdWJtaXQtbGlzdGluZ1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIGlmICggIXZhbGlkYXRlU3RlcFR3bygpICkgcmV0dXJuO1xyXG5cclxuICAgICAgICBzdWJtaXRmb3JtKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3ZpZXctYWdyZWVtZW50XCIpLm9uKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YWxpZGF0ZVN0ZXBUd28oKTtcclxuICAgICAgICAkKFwiI3ZpZXctYWdyZWVtZW50XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpLmFwcGVuZCgnPGkgY2xhc3M9XCJmYSBmYS1jb2cgZmEtc3BpblwiPicpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybCA6IGVudmhvc3R1cmwgKyAndjEvY29udHJhY3QvcHJldmlld3MnLFxyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGRhdGEgOiB7XHJcbiAgICAgICAgICAgICAgICBqc29uIDogSlNPTi5zdHJpbmdpZnkoQ29udGVudEFyZW5hLkNvbnRlbnQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiggcmVzcG9uc2UgKXtcclxuICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LmlkID0gcmVzcG9uc2UuaWQ7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihlbnZob3N0dXJsICsgJ2NvbnRyYWN0L3ByZXZpZXc/aWQ9JysgcmVzcG9uc2UuaWQsIFwiX2JsYW5rXCIsJ2hlaWdodD02MDAsd2lkdGg9ODAwJyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI3ZpZXctYWdyZWVtZW50XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBudWxsKS5maW5kKCdpJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYWRkLWluc3RhbGxtZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgaWYoJChcIi5pbnN0YWxsbWVudDpmaXJzdCBpbnB1dC5pbnN0YWxsbWVudC1wZXJjZW50XCIpLnZhbCgpPT0nMTAwJScpe1xyXG4gICAgICAgICAgICAkKFwiLmluc3RhbGxtZW50OmZpcnN0IGlucHV0Lmluc3RhbGxtZW50LXBlcmNlbnRcIikudmFsKCcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwb3MgPSAkKFwiLmluc3RhbGxtZW50XCIpLmxlbmd0aCArIDEsXHJcbiAgICAgICAgICAgIGl0ZW0gPSAkKFwiLmluc3RhbGxtZW50Omxhc3RcIikuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgaXRlbS5hdHRyKFwiaWRcIiwgXCJpbnN0YWxsbWVudFwiICsgcG9zKTtcclxuICAgICAgICBpdGVtLmZpbmQoXCJzcGFuXCIpLmh0bWwoIENvbnRlbnRBcmVuYS5VdGlscy5hZGRPcmRpbmFsKHBvcykpO1xyXG4gICAgICAgIGl0ZW0uZmluZChcImlucHV0XCIpLnZhbChcIlwiKTtcclxuICAgICAgICBpdGVtLmluc2VydEFmdGVyKFwiLmluc3RhbGxtZW50Omxhc3RcIik7XHJcblxyXG4gICAgICAgIGl0ZW0uZmluZChcImlucHV0Lmhhc0RhdGVwaWNrZXJcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJpZFwiLCBudWxsKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJoYXNEYXRlcGlja2VyXCIpXHJcbiAgICAgICAgICAgIC5kYXRlcGlja2VyKFwiZGVzdHJveVwiKS5vZmYoKS5kYXRlcGlja2VyKCk7XHJcblxyXG4gICAgICAgIC8vc2V0dXBJbnN0YWxsbWVudCgpXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyokKFwiLnBhY2thZ2Utc2VsZWN0b3JcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKFwiaWRcIikuc3BsaXQoXCItXCIpWzFdLFxyXG4gICAgICAgICAgICBuYW1lID0gJCh0aGlzKS5hdHRyKFwibmFtZVwiKS5zcGxpdChcIi1cIilbMV07XHJcblxyXG4gICAgICAgIGNoZWNrU2VsZWN0ZWRQYWNrYWdlcygpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tlZCB8fCBzZWxlY3RvckNvdW50ZXIgPj0gMSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAkLmVhY2goJChcIi5wYWNrYWdlLXNlbGVjdG9yXCIpLCBmdW5jdGlvbiAoaSwgcGFjaykge1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhY2thZ2VzID0gJChwYWNrKS5kYXRhKFwicGFja2FnZXNcIiksXHJcbiAgICAgICAgICAgICAgICBwYWNrX2lkID0gJChwYWNrKS5hdHRyKFwiaWRcIikuc3BsaXQoXCItXCIpWzFdLFxyXG4gICAgICAgICAgICAgICAgZWwgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKHBhY2thZ2VzLnBhcmVudCwgZnVuY3Rpb24gKGksIHApIHtcclxuICAgICAgICAgICAgICAgIGlmIChwLmlkID09PSBpZCkgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFmbGFnKXtcclxuICAgICAgICAgICAgICAgIGVsLmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhY2tfaWQgIT09IGlkKSBlbC5wYXJlbnQoKS5uZXh0KCkuYWRkQ2xhc3MoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIiNzZWxsLWJveFwiKS5yZW1vdmVDbGFzcyhcImlzLWhpZGRlblwiKTtcclxuXHJcbiAgICAgICAgbWFpblBhY2thZ2UgPSBuYW1lO1xyXG4gICAgICAgIHNlbGVjdG9yQ291bnRlcisrO1xyXG5cclxuICAgIH0pOyovXHJcblxyXG4gICAgJChcIiNyZXNldC1wYWNrYWdlc1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5lYWNoKCQoXCIucGFja2FnZS1zZWxlY3RvclwiKSwgZnVuY3Rpb24gKGksIHBhY2spIHtcclxuXHJcbiAgICAgICAgICAgIHBhY2suY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkKHBhY2spLmF0dHIoXCJkaXNhYmxlZFwiLCBudWxsKTtcclxuICAgICAgICAgICAgJChwYWNrKS5wYXJlbnQoKS5uZXh0KCkucmVtb3ZlQ2xhc3MoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgJChcIiNtYWluLXNlbGwtYm94XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChcIi5zZWxlY3QtYm94LWl0ZW0tY29udGFpbmVyXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChcIi5zZWxsLWl0ZW1zLWJveFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIjcHJpY2Utc2VsbC1ib3hcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnBhY2thZ2UtcmVhZHktYnV0dG9uXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgc2VsZWN0b3JDb3VudGVyID0gMDtcclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyokKFwiI2RyYWZ0LWxpc3RpbmdcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgZWwgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICBlbC5odG1sKFwiPGkgY2xhc3M9XFxcImZhIGZhLWNvZyBmYS1zcGluXFxcIj5cIikuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnNhdmVDb250ZW50QXNEcmFmdChDb250ZW50QXJlbmEuQ29udGVudCkuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zdWNjZXNzICE9PSB1bmRlZmluZWQgJiYgcmVzcG9uc2UuY29udGVudElkICE9PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LmlkID0gcmVzcG9uc2UuY29udGVudElkO1xyXG4gICAgICAgICAgICAgICAgZWwuaHRtbChcIlNhdmVkIGFzIERyYWZ0XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uICgpIHt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pOyovXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJyxcIi5hZGQtc2FsZXMtcGFja2FnZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYWRkU2FsZXNQYWNrYWdlKClcclxuICAgIH0pO1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5UZXN0LnZhbGlkYXRlU3RlcFR3byA9IHZhbGlkYXRlU3RlcFR3bztcclxuICAgIENvbnRlbnRBcmVuYS5UZXN0LmdldEZ1bGxTZWxlY3RlZFBhY2thZ2VzID0gZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXphdGlvblxyXG4gICAgICovXHJcbiAgICBzZXR1cEluc3RhbGxtZW50KCk7XHJcbiAgICBhZGRTYWxlc1BhY2thZ2UoKTtcclxuXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3NlbGwuc3RlcDIuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IGNvbnRlbnQgZnJvbSBcIi4vcmVkdWNlcnMvY29udGVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU3RvcmUoY29udGVudCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zdG9yZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=