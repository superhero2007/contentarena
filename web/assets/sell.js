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
        onClick = _ref.onClick;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: "selector-item " + (selected && "selector-item-selected"), onClick: onClick },
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
            return _this2.props.items && _this2.props.items.length > 30;
        };

        _this2.setActiveFilter = function (filterName) {
            _this2.setState({ activeFilter: filterName, filterUpdated: true });
        };

        _this2.applySelection = function () {
            _this2.setState({ updated: false, filterUpdated: false });
            _this2.props.applySelection(_this2.props.type, _this2.state.selectedItem, _this2.props.multiple);
        };

        _this2.selectItem = function (item) {
            _this2.setState({ selectedItem: item, updated: true });
        };

        _this2.isItemSelected = function (item) {

            if (_this2.state.updated) {
                return _this2.state.selectedItem.external_id === item.external_id;
            } else {

                if (!_this2.props.selected) return false;

                return _this2.props.selected.length > 0 && _this2.props.multiple ? _this2.props.selected[0].external_id === item.external_id : _this2.props.selected.external_id === item.external_id;
            }
        };

        _this2.filter = function (item) {
            var filter = _this2.getActiveFilter();
            return filter.values.indexOf(item.name[0].toLowerCase()) !== -1;
        };

        _this2.getItems = function () {
            var filter = _this2.getActiveFilter();
            if (filter.type === "origin") return _this2.props[filter.value];
            if (filter.type === "firstLetter") {

                if (!_this2.shouldShowFilters()) return _this2.props.items;

                return _this2.props.items.filter(_this2.filter);
            }
        };

        _this2.state = {
            updated: false,
            filterUpdated: false,
            open: props.selector,
            items: props.items || [],
            popularItems: props.popularItems || [],
            filter: {
                "ag": { type: "firstLetter", values: ["a", 'b', 'c', 'd', 'e', 'f', 'g'] },
                "hn": { type: "firstLetter", values: ["h", 'i', 'j', 'k', 'l', 'k', 'n'] },
                "ot": { type: "firstLetter", values: ["o", 'p', 'q', 'r', 's', 't'] },
                "uz": { type: "firstLetter", values: ["u", 'v', 'w', 'x', 'y', 'z'] },
                "popular": { type: "origin", value: "popularItems" }
            },
            activeFilter: props.activeFilter || "ag",
            selectedItem: {}
        };

        __WEBPACK_IMPORTED_MODULE_2__sell_store__["a" /* default */].subscribe(function (a) {});
        return _this2;
    }

    _createClass(Selector, [{
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
                            selected: _this.isItemSelected(item) });
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
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        null,
                        'Add new Sport'
                    )
                )
            );
        }
    }]);

    return Selector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        open: state.selectorInfo.open,
        items: state.selectorInfo.selectorItems,
        popularItems: state.selectorInfo.popularItems,
        type: state.selectorInfo.selectorType,
        activeFilter: state.selectorInfo.activeFilter,
        selected: state[state.selectorInfo.selectorType],
        multiple: state.selectorInfo.multiple
    };
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
        applySelection: function applySelection(selectorType, selectedItem, multiple) {
            return dispatch({
                type: 'APPLY_SELECTION',
                selectorType: selectorType,
                selectedItem: selectedItem,
                multiple: multiple
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_SellFormStep1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__containers_SellFormStep1__);
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
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__containers_SellFormStep1__["default"], null),
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
                this.props.step === 2 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
                                checked: ContentArena.Utils.getIndex(superRight.id, _this.state.content.rights_package, "id") !== -1,
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
        step: state.step,
        superRights: state.superRights
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
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: SyntaxError: C:/dev/Content Arena/content-arena-api/src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep1.js: Unexpected token (13:25)\n\n\u001b[0m \u001b[90m 11 | \u001b[39m)\u001b[33m;\u001b[39m\n \u001b[90m 12 | \u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 13 | \u001b[39m\u001b[36mconst\u001b[39m \u001b[33mWebsite\u001b[39m \u001b[33m=\u001b[39m ({}) \u001b[33m=>\u001b[39m ()\u001b[33m;\u001b[39m\n \u001b[90m    | \u001b[39m                         \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 14 | \u001b[39m\n \u001b[90m 15 | \u001b[39m\u001b[36mclass\u001b[39m \u001b[33mSellFormStep1\u001b[39m \u001b[36mextends\u001b[39m \u001b[33mReact\u001b[39m\u001b[33m.\u001b[39m\u001b[33mComponent\u001b[39m {\n \u001b[90m 16 | \u001b[39m    constructor(props) {\u001b[0m\n");

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
        step: state.step
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
            ContentArena.ContentApi.saveContentAsDraft(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].getState()).done(function (response) {
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
        step: state.step
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
var content = function content() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        step: 1,
        rights_package: [],
        selectorInfo: {
            type: "sport",
            open: false,
            selectorItems: [],
            popularItems: []
        },
        category: null,
        sports: []
    };
    var action = arguments[1];


    switch (action.type) {
        case 'CONTENT_INIT':
            return Object.assign({}, state, action.content);
        case 'GO_TO_NEXT_STEP':
            return Object.assign({}, state, {
                step: state.step + 1
            });
        case 'GO_TO_PREVIOUS_STEP':
            return Object.assign({}, state, {
                step: state.step - 1
            });

        case 'UPDATE_CONTENT_VALUE':
            var newState = {};
            newState[action.key] = action.value;
            return Object.assign({}, state, newState);

        case 'OPEN_SELECTOR':
            return Object.assign({}, state, {
                selectorInfo: {
                    selectorType: action.selectorType,
                    open: true,
                    selectorItems: action.selectorItems,
                    popularItems: action.popularItems,
                    activeFilter: action.activeFilter,
                    multiple: action.multiple
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

            var selection = {
                selectorInfo: {
                    selectorType: "",
                    open: false,
                    selectorItems: [],
                    popularItems: []
                }
            };

            selection[action.selectorType] = action.multiple ? [action.selectedItem] : action.selectedItem;

            return Object.assign({}, state, selection);

        case 'SUPER_RIGHTS_UPDATED':

            console.log("SUPER_RIGHTS_UPDATED");
            var rights_package = state.rights_package;
            var index = ContentArena.Utils.getIndex(action.rights_package.id, rights_package, "id");
            if (index === -1) {
                rights_package.push(action.rights_package);
            } else {
                rights_package.splice(index, 1);
            }

            return Object.assign({}, state, {
                rights_package: rights_package
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

    var rounds = {};

    function fillSeasons() {
        var options = {
            selector: "#event-season-selector",
            parentSelection: "#event-tournament-selector",
            endpoint: "v1/feed/seasons",
            requestType: "POST",
            /**
             *
             * @param {{ seasons: { season: object}}} response
             * @returns {*}
             */
            getSource: function getSource(response) {

                var list;

                if (response.seasons === undefined || response.seasons.season === undefined) return false;

                if ($.isArray(response.seasons.season)) {
                    list = $.map(response.seasons.season, function (item) {
                        return { label: item['@attributes'].name, value: item['@attributes'].id };
                    }).reverse();
                } else {
                    list = [{ label: response.seasons.season['@attributes'].name, value: response.seasons.season['@attributes'].id }];
                }

                list.push({
                    label: "Add new",
                    value: "new"
                });

                return list;
            }
        };

        var el = $(options.selector),
            spinner = el.parent().find("i"),
            source;

        spinner.show();

        el.attr("disabled", "disabled");
        if (el.data('autocomplete')) el.autocomplete('destroy').off();

        $.ajax({
            url: hosturl + options.endpoint,
            type: options.requestType || "GET",
            data: { id: $(options.parentSelection).attr('externalId') },
            success: function success(response) {

                source = options.getSource(response);
                el.attr("disabled", null);
                el.autocomplete({
                    source: source,
                    minLength: 0,
                    select: function select(event, ui) {

                        // Prevent autocomplete plugin default action
                        event.preventDefault();

                        var id,
                            selected = ui.item.value;

                        // Add new functionality
                        if (selected === "new") {
                            //addCustomTemplate( false, false, false );
                            ContentArena.Form.addCustomSeason();
                            return;
                        }

                        $(".custom-template-item").hide();

                        id = selected.replace(/\:/g, '-');
                        source = $.grep(source, function (el) {
                            return el.value !== ui.item.value;
                        });

                        $('#event-schedule-subitems').append('<div class="step1-event-subitem-title standard-button-active season"  mainref="' + id + '">' + ui.item.label + '</div><div class="step1-event-subitems-container"><div class="step1-event-subitem-title" ref="' + id + '" >Fixture</div><div class="step1-event-subitems-container is-hidden" id="' + id + '" ><i class="fa fa-cog fa-spin pos-rel"></i></div></div>');

                        $("[ref=" + id + "]").on("click", function () {

                            var selector = $("#" + id);
                            $(this).toggleClass("standard-button-active");
                            selector.toggle();
                            selector.find("i").show();
                        });

                        $("[mainref=" + id + "]").on("click", function () {
                            $(this).next().remove();
                            $(this).remove();
                            source.unshift({
                                label: ui.item.label,
                                value: ui.item.value
                            });
                        });

                        $(event.target).autocomplete("option", "source", source);

                        fillSchedule(id);
                    }
                }).focus(function () {
                    $(this).autocomplete("search", "");
                });

                spinner.hide();
            }
        });
    }

    function fillSchedule(id) {
        $.ajax({
            url: hosturl + "v1/feed/schedules",
            type: "POST",
            data: { id: id.replace(/\-/g, ':') },
            /**
             *
             * @param {{sport_events: {sport_event:{tournament_round:object}}}} response
             */
            success: function success(response) {

                var source = [],
                    selector = $('#' + id);

                if (response.sport_events && response.sport_events.sport_event) {
                    $.each(response.sport_events.sport_event, function (k, item) {

                        var season_id = id,
                            round = item.tournament_round['@attributes'].number || item.tournament_round['@attributes'].type;

                        if (rounds[season_id] === undefined) rounds[season_id] = {};
                        if (rounds[season_id][round] === undefined) rounds[season_id][round] = [];
                        rounds[season_id][round].push(item);
                    });

                    source = $.map(rounds[id], function (item, k) {

                        if (k === 'undefined') k = "";
                        return { label: "Matchday " + k, value: "matchday-" + k };
                    });
                }

                $.each(source, function (k, item) {
                    var roundNumber = item.value.replace("matchday-", "");
                    $('#' + id).append('<div class="step1-event-subitem-title matchday-subitem" ref="' + id + '-' + item.value + '" >' + item.label + '</div><div class="step1-event-subitems-container is-hidden" id="' + id + '-' + item.value + '" ></div>');

                    /**
                     * @param {{competitors:{competitor}}} match
                     */
                    $.each(rounds[id][roundNumber], function (k, match) {

                        var label = "",
                            selId,
                            attrs = match['@attributes'],
                            competitors = match.competitors.competitor;

                        label += new Date(attrs.scheduled).toISOString().split('T')[0];
                        label += " - ";

                        $.each(competitors, function (k, v) {
                            label += v['@attributes'].name + " ";
                        });

                        selId = "match-" + match['@attributes'].id.split(":")[2];

                        $('#' + id + '-' + item.value).append('<div class="step1-event-subitem-title" ref="' + id + '-' + item.value + '" id="' + match['@attributes'].id + '" selId="' + selId + '" >' + label + '</div>');

                        $("[selId=" + selId + "]").data(match);
                    });
                });

                selector.append('<div class="step1-event-subitem-title matchday-subitem-showall" >Show All</div>');
                selector.find("i").remove();

                $(".matchday-subitem:nth-child(n+18)", "#" + id).hide();

                $(".matchday-subitem-showall", "#" + id).click(function () {
                    $(".matchday-subitem:nth-child(n+18)", "#" + id).show();
                    $(this).remove();
                });

                $("#" + id + " .step1-event-subitem-title").click(function () {

                    var subItemId = $(this).attr("ref");

                    $(this).toggleClass("standard-button-active");

                    if ($(this).attr("id") !== undefined) return false;

                    if ($(this).hasClass("standard-button-active")) {
                        $('#' + subItemId).show();
                    } else {
                        $('#' + subItemId).hide();
                    }
                });
            }
        });
    }

    function htmlIdToApiId(id) {
        return id.replace(/\-/g, ':');
    }

    function validateStepOne() {

        var season = $(".season"),
            sports = [],
            website = $("#event-website-selector"),
            hasErrors = false;

        $(".step1-event-item").each(function (k, item) {

            var itemInput = $(item).find(".content-input:not('.sport-selector')"),
                required = itemInput.is(":visible") && itemInput.attr("required"),
                name = itemInput.attr("id") ? itemInput.attr("id").split("-")[1] : false,
                value,
                externalId;

            if (itemInput.length > 0) {
                externalId = itemInput.attr("externalId");
                value = itemInput.val();

                if (value) {
                    ContentArena.Content[name] = ContentArena.Content[name] || {};
                    ContentArena.Content[name].value = value;
                    if (externalId) ContentArena.Content[name].externalId = externalId;
                } else {
                    ContentArena.Content[name] = null;
                }
            }

            if (!value && required) {
                $(itemInput).addClass("invalid");
                hasErrors = true;
            }
        });

        if (website.val() !== "") {
            ContentArena.Content.website = website.val().split(",");
        }

        if (ContentArena.Content.eventType === "custom") {
            $(".sport-selector").each(function () {
                sports.push({
                    value: $(this).val(),
                    externalId: $(this).attr("externalId")
                });
            });

            sports.push(ContentArena.Content.sport);
            ContentArena.Content.sports = sports;
        }

        if (ContentArena.Content.eventType === 'database') {

            // SEASON
            if (season.length > 0) {
                ContentArena.Content.seasons = [];
                season.each(function () {
                    ContentArena.Content.seasons.push({
                        value: $(this).html(),
                        externalId: htmlIdToApiId($(this).attr("mainref"))
                    });
                });
            }

            ContentArena.Content.matches = {};

            $(".step1-event-subitem-title.standard-button-active").each(function (k, v) {
                var matchday = $(v).attr("ref"),
                    matchId = $(v).attr("id");

                if (matchId === undefined) {
                    if (ContentArena.Content.matches[matchday] === undefined) ContentArena.Content.matches[matchday] = [];
                } else {
                    ContentArena.Content.matches[matchday].push($(v).data());
                }
            });
        }

        $("#event-title").html(ContentArena.Content.getTitle());

        return !hasErrors;
    }

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

    $('.file-selector').off().focus(function (e) {
        var targetId = "#" + $(this).attr("ref");
        $(this).blur();
        $(targetId).trigger("click");
        e.preventDefault();
    });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXhlbnYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZhcmlhbnQvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2NvbXBvbmVudHMvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9jb21wb25lbnRzL01vZGFsUG9ydGFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9hcmlhQXBwSGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2NsYXNzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvZm9jdXNNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9zYWZlSFRNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3Njb3BlVGFiLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy90YWJiYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL1Byb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9jb25uZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21hcERpc3BhdGNoVG9Qcm9wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tYXBTdGF0ZVRvUHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWVyZ2VQcm9wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9zZWxlY3RvckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvdmVyaWZ5U3Vic2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3dyYXBNYXBUb1Byb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvUHJvcFR5cGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9TdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3NoYWxsb3dFcXVhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvdmVyaWZ5UGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2FwcGx5TWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYmluZEFjdGlvbkNyZWF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21iaW5lUmVkdWNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbXBvc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93YXJuaW5nL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL1NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9TZWxsRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvUGFja2FnZVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9TZWxsRm9ybVN0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9idXR0b25zLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3NlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zZWxsLnN0ZXAxLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvc2VsbC5zdGVwMi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3N0b3JlLmpzIl0sIm5hbWVzIjpbImN1c3RvbVN0eWxlcyIsImNvbnRlbnQiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJtYXJnaW5SaWdodCIsInRyYW5zZm9ybSIsIk1vZGFsIiwic2V0QXBwRWxlbWVudCIsIlNlbGVjdG9ySXRlbSIsImxhYmVsIiwic2VsZWN0ZWQiLCJvbkNsaWNrIiwiU2VsZWN0b3IiLCJwcm9wcyIsImNvbXBvbmVudERpZE1vdW50Iiwib3Blbk1vZGFsIiwib3BlblNlbGVjdG9yIiwiYWZ0ZXJPcGVuTW9kYWwiLCJjbG9zZU1vZGFsIiwic2V0U3RhdGUiLCJ1cGRhdGVkIiwiZmlsdGVyVXBkYXRlZCIsImNsb3NlU2VsZWN0b3IiLCJnZXRBY3RpdmVGaWx0ZXIiLCJhY3RpdmVGaWx0ZXIiLCJnZXRBY3RpdmVGaWx0ZXJOYW1lIiwic3RhdGUiLCJmaWx0ZXIiLCJzaG91bGRTaG93RmlsdGVycyIsIml0ZW1zIiwibGVuZ3RoIiwic2V0QWN0aXZlRmlsdGVyIiwiZmlsdGVyTmFtZSIsImFwcGx5U2VsZWN0aW9uIiwidHlwZSIsInNlbGVjdGVkSXRlbSIsIm11bHRpcGxlIiwic2VsZWN0SXRlbSIsIml0ZW0iLCJpc0l0ZW1TZWxlY3RlZCIsImV4dGVybmFsX2lkIiwidmFsdWVzIiwiaW5kZXhPZiIsIm5hbWUiLCJ0b0xvd2VyQ2FzZSIsImdldEl0ZW1zIiwidmFsdWUiLCJvcGVuIiwic2VsZWN0b3IiLCJwb3B1bGFySXRlbXMiLCJzdG9yZSIsInN1YnNjcmliZSIsImEiLCJfdGhpcyIsIm1hcCIsImkiLCJSZWFjdCIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsInNlbGVjdG9ySW5mbyIsInNlbGVjdG9ySXRlbXMiLCJzZWxlY3RvclR5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsImNvbm5lY3QiLCJTZWxsRm9ybSIsImNvbnRlbnRMaXN0aW5nSW5pdCIsIkpTT04iLCJwYXJzZSIsIm93blByb3BzIiwiU3VwZXJSaWdodCIsInN1cGVyUmlnaHQiLCJvbkNoYW5nZSIsImNoZWNrZWQiLCJpZCIsIlBhY2thZ2VTZWxlY3RvciIsInBhY2thZ2VzIiwic3RlcCIsIkNvbnRlbnRBcmVuYSIsIlV0aWxzIiwiZ2V0SW5kZXgiLCJyaWdodHNfcGFja2FnZSIsInN1cGVyUmlnaHRzVXBkYXRlZCIsInN1cGVyUmlnaHRzIiwiU2VsbEZvcm1TdGVwIiwiYWN0aXZlIiwidGl0bGUiLCJTZWxsRm9ybVN0ZXBzIiwic3RlcHMiLCJTZWxsQnV0dG9ucyIsInNhdmVBc0RyYWZ0Iiwic2F2aW5nIiwiQ29udGVudEFwaSIsInNhdmVDb250ZW50QXNEcmFmdCIsImdldFN0YXRlIiwiZG9uZSIsInJlc3BvbnNlIiwic2F2aW5nU3VjY2VzcyIsImZhaWwiLCJkYXRlIiwiRGF0ZSIsImxhc3RTdGVwIiwic2F2ZUFzRHJhZnRUZXh0IiwiZ29Ub1ByZXZpb3VzU3RlcCIsImdvVG9OZXh0U3RlcCIsImNhdGVnb3J5Iiwic3BvcnRzIiwiYWN0aW9uIiwiT2JqZWN0IiwiYXNzaWduIiwibmV3U3RhdGUiLCJrZXkiLCJzZWxlY3Rpb24iLCJjb25zb2xlIiwibG9nIiwiaW5kZXgiLCJwdXNoIiwic3BsaWNlIiwic2VsbEZvcm0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkYXRhc2V0IiwiJCIsInRvb2x0aXAiLCJkYXRlcGlja2VyIiwib24iLCJyZW1vdmVDbGFzcyIsImhpZGUiLCJ3aW5kb3ciLCJNb2RlbCIsIkZvcm0iLCJUZXN0IiwiYWRkQ3VzdG9tU2Vhc29uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJjb250YWluZXIiLCJzZWFzb25OdW1iZXIiLCJzb3VyY2UiLCJhdXRvY29tcGxldGUiLCJoYXNTZWFzb24iLCJsYWJlbHMiLCJzcGxpdCIsInNlYXNvblllYXIiLCJwb3AiLCJnZXRGdWxsWWVhciIsInN0YXJ0WWVhciIsInNlYXJjaCIsIk51bWJlciIsImVuZFllYXIiLCJzZWFzb25OYW1lIiwiam9pbiIsInRlbXBsYXRlIiwidGVtcGxhdGVzIiwic2Vhc29uRGF0YSIsInNlYXNvbkVsZW1lbnQiLCJhcHBlbmQiLCJyZW1vdmUiLCJDb250ZW50Iiwicm91bmRzIiwiZmlsbFNlYXNvbnMiLCJvcHRpb25zIiwicGFyZW50U2VsZWN0aW9uIiwiZW5kcG9pbnQiLCJyZXF1ZXN0VHlwZSIsImdldFNvdXJjZSIsImxpc3QiLCJzZWFzb25zIiwidW5kZWZpbmVkIiwic2Vhc29uIiwiaXNBcnJheSIsInJldmVyc2UiLCJlbCIsInNwaW5uZXIiLCJwYXJlbnQiLCJmaW5kIiwic2hvdyIsImF0dHIiLCJkYXRhIiwib2ZmIiwiYWpheCIsInVybCIsImhvc3R1cmwiLCJzdWNjZXNzIiwibWluTGVuZ3RoIiwic2VsZWN0IiwiZXZlbnQiLCJ1aSIsInByZXZlbnREZWZhdWx0IiwicmVwbGFjZSIsImdyZXAiLCJ0b2dnbGVDbGFzcyIsInRvZ2dsZSIsIm5leHQiLCJ1bnNoaWZ0IiwidGFyZ2V0IiwiZmlsbFNjaGVkdWxlIiwiZm9jdXMiLCJzcG9ydF9ldmVudHMiLCJzcG9ydF9ldmVudCIsImVhY2giLCJrIiwic2Vhc29uX2lkIiwicm91bmQiLCJ0b3VybmFtZW50X3JvdW5kIiwibnVtYmVyIiwicm91bmROdW1iZXIiLCJtYXRjaCIsInNlbElkIiwiYXR0cnMiLCJjb21wZXRpdG9ycyIsImNvbXBldGl0b3IiLCJzY2hlZHVsZWQiLCJ0b0lTT1N0cmluZyIsInYiLCJjbGljayIsInN1Ykl0ZW1JZCIsImhhc0NsYXNzIiwiaHRtbElkVG9BcGlJZCIsInZhbGlkYXRlU3RlcE9uZSIsIndlYnNpdGUiLCJoYXNFcnJvcnMiLCJpdGVtSW5wdXQiLCJyZXF1aXJlZCIsImlzIiwiZXh0ZXJuYWxJZCIsInZhbCIsImFkZENsYXNzIiwiZXZlbnRUeXBlIiwic3BvcnQiLCJodG1sIiwibWF0Y2hlcyIsIm1hdGNoZGF5IiwibWF0Y2hJZCIsImdldFRpdGxlIiwiYWRkQ3VzdG9tRm4iLCJwbGFjZWhvbGRlciIsImFkZEN1c3RvbVRlbXBsYXRlIiwidG91cm5hbWVudCIsImFkZFNwb3J0TGF5ZXIiLCJzcG9ydFNlbGVjdG9yIiwiZXh0cmFTcG9ydHMiLCJodG1sT3V0cHV0IiwiYWZ0ZXIiLCJsYXN0IiwicmVzZXRTZWxlY3RvciIsImFkZEdlbmVyaWNFcGlzb2RlcyIsInF1YW50aXR5IiwiY3VycmVudFF1YW50aXR5IiwiY2hpbGRyZW4iLCJzdGFydCIsImVtcHR5Iiwic2VsZWN0b3JzIiwiZm9yRWFjaCIsImUiLCJ0YXJnZXRJZCIsImJsdXIiLCJ0cmlnZ2VyIiwiY2hlY2tGaWxlVHlwZSIsImFsbG93ZWRFeHRlbnNpb25zIiwiZXJyb3IiLCJkaWFsb2ciLCJzaWJsaW5ncyIsImlucHV0IiwicHJvcCIsImNvbnRleHQiLCJzZWxlY3RvclNob3ciLCJuZXdRdWFudGl0eSIsImxvY2F0aW9uIiwiZW52aG9zdHVybCIsInNlbGVjdG9yQ291bnRlciIsIm1haW5QYWNrYWdlIiwiZ2V0U2VsZWN0ZWRGdWxsUGFja2FnZXMiLCJwYWNrIiwiZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXMiLCJzZWxlY3RlZElkcyIsInNlbGVjdGVkTmFtZXMiLCJnZXRJZEJ5TmFtZSIsImNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMiLCJzZWxlY3RlZFJpZ2h0IiwiU2VsZWN0ZWRSaWdodCIsInJpZ2h0SXRlbSIsImdyb3VwIiwiZWxlbWVudCIsImlucHV0cyIsImNvbGxlY3RTZWxlY3RlZFJpZ2h0cyIsInNlbGVjdGVkUmlnaHRzIiwic2VsZWN0ZWRQYWNrYWdlcyIsInNpbmdsZSIsImNvbmNhdCIsInZhbGlkYXRlU2FsZXNQYWNrYWdlcyIsInBhY2thZ2VDb250YWluZXIiLCJzYWxlc1BhY2thZ2UiLCJTYWxlc1BhY2thZ2UiLCJ0ZXJyaXRvcmllcyIsInNhbGVzTWV0aG9kIiwiY3VycmVuY3kiLCJmZWUiLCJ0ZXJyaXRvcnlCaWRzIiwidGVycml0b3J5QXNQYWNrYWdlIiwic2VsZWN0ZWRUZXJyaXRvcmllcyIsImNob3NlbiIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJ2YWxpZGF0ZVN0ZXBUd28iLCJtZXNzYWdlcyIsImV4cGlyYXRpb25EYXRlIiwicmlnaHRzIiwibWVzc2FnZXNDb250YWluZXIiLCJ0b3RhbCIsImluc3RhbGxtZW50cyIsImNvbGxlY3RJbnN0YWxsbWVudHMiLCJzYWxlc1BhY2thZ2VzIiwidmFsaWQiLCJ2YWxpZGF0ZSIsImRlc2NyaXB0aW9uIiwiZXhwaXJlc0F0IiwibWluV2lkdGgiLCJhZGRTYWxlc1BhY2thZ2UiLCJhZGRSZWdpb25CZWhhdmlvdXIiLCJzZXR1cEluc3RhbGxtZW50IiwibWFzayIsImluc3RhbGxtZW50IiwicGVyY2VudCIsInNpZ25pbmdfZGF5IiwiZ3JhbnRlZF9kYXkiLCJzdWJtaXRmb3JtIiwiZm9ybSIsInN0cmluZ2lmeSIsImFwcGVuZFRvIiwib25iZWZvcmV1bmxvYWQiLCJzdWJtaXQiLCJqc29uIiwicG9zIiwiY2xvbmUiLCJhZGRPcmRpbmFsIiwiaW5zZXJ0QWZ0ZXIiLCJjcmVhdGVTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQUE7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDdkNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUN2RUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyx5QkFBeUIsRUFBRTtBQUNyRTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDaERBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUMzQkE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7OztBQ0xBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDN0NBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2IsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDZEE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQzs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLDZCQUE2QjtBQUM3QixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRCQUE0QjtBQUM1QixPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGdDQUFnQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMzQkE7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQSxtREFBbUQsZ0JBQWdCLHNCQUFzQixPQUFPLDJCQUEyQiwwQkFBMEIseURBQXlELDJCQUEyQixFQUFFLEVBQUUsRUFBRSxlQUFlOztBQUU5UCxnQ0FBZ0MsMkNBQTJDLGdCQUFnQixrQkFBa0IsT0FBTywyQkFBMkIsd0RBQXdELGdDQUFnQyx1REFBdUQsMkRBQTJELEVBQUUsRUFBRSx5REFBeUQscUVBQXFFLDZEQUE2RCxvQkFBb0IsR0FBRyxFQUFFOztBQUVqakI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsdUNBQXVDLDZCQUE2QixZQUFZLEVBQUUsT0FBTyxpQkFBaUIsbUJBQW1CLHVCQUF1Qiw0RUFBNEUsRUFBRSxFQUFFLHNCQUFzQixlQUFlLEVBQUU7O0FBRTNRLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RixpREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SixpREFBaUQsYUFBYSx1RkFBdUYsRUFBRSx1RkFBdUY7O0FBRTlPLDBDQUEwQywrREFBK0QscUdBQXFHLEVBQUUseUVBQXlFLGVBQWUseUVBQXlFLEVBQUUsRUFBRSx1SEFBdUg7O0FBRTVlO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG1FQUFtRSxhQUFhO0FBQ2hGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0wsc0dBQXNHLHFDQUFxQztBQUMzSTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Qjs7Ozs7Ozs7Ozs7OztBQ3RQQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxtREFBbUQsZ0JBQWdCLHNCQUFzQixPQUFPLDJCQUEyQiwwQkFBMEIseURBQXlELDJCQUEyQixFQUFFLEVBQUUsRUFBRSxlQUFlOztBQUU5UCxvR0FBb0csbUJBQW1CLEVBQUUsbUJBQW1CLDhIQUE4SDs7QUFFMVEsZ0NBQWdDLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFLEVBQUUseURBQXlELHFFQUFxRSw2REFBNkQsb0JBQW9CLEdBQUcsRUFBRTs7QUFFampCOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUF1Qyw2QkFBNkIsWUFBWSxFQUFFLE9BQU8saUJBQWlCLG1CQUFtQix1QkFBdUIsNEVBQTRFLEVBQUUsRUFBRSxzQkFBc0IsZUFBZSxFQUFFOztBQUUzUSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0YsaURBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdkosaURBQWlELGFBQWEsdUZBQXVGLEVBQUUsdUZBQXVGOztBQUU5TywwQ0FBMEMsK0RBQStELHFHQUFxRyxFQUFFLHlFQUF5RSxlQUFlLHlFQUF5RSxFQUFFLEVBQUUsdUhBQXVIOztBQUU1ZTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QyxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLGVBQWU7QUFDdkMsMEJBQTBCLGtCQUFrQjs7QUFFNUM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQix3Q0FBd0M7QUFDOUQ7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLElBQUk7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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OztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7QUM3RkE7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7O0FBRUE7O0FBRUE7O0FBRUEsa0M7Ozs7Ozs7Ozs7Ozs7QUNuQkE7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7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LyohXG4gIENvcHlyaWdodCAoYykgMjAxNSBKZWQgV2F0c29uLlxuICBCYXNlZCBvbiBjb2RlIHRoYXQgaXMgQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgY2FuVXNlRE9NID0gISEoXG5cdFx0dHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcblx0XHR3aW5kb3cuZG9jdW1lbnQgJiZcblx0XHR3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuXHQpO1xuXG5cdHZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHtcblxuXHRcdGNhblVzZURPTTogY2FuVXNlRE9NLFxuXG5cdFx0Y2FuVXNlV29ya2VyczogdHlwZW9mIFdvcmtlciAhPT0gJ3VuZGVmaW5lZCcsXG5cblx0XHRjYW5Vc2VFdmVudExpc3RlbmVyczpcblx0XHRcdGNhblVzZURPTSAmJiAhISh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciB8fCB3aW5kb3cuYXR0YWNoRXZlbnQpLFxuXG5cdFx0Y2FuVXNlVmlld3BvcnQ6IGNhblVzZURPTSAmJiAhIXdpbmRvdy5zY3JlZW5cblxuXHR9O1xuXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBFeGVjdXRpb25FbnZpcm9ubWVudDtcblx0XHR9KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gRXhlY3V0aW9uRW52aXJvbm1lbnQ7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LkV4ZWN1dGlvbkVudmlyb25tZW50ID0gRXhlY3V0aW9uRW52aXJvbm1lbnQ7XG5cdH1cblxufSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2V4ZW52L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9leGVudi9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwuaG9pc3ROb25SZWFjdFN0YXRpY3MgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBcbiAgICB2YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgICAgICAgY2hpbGRDb250ZXh0VHlwZXM6IHRydWUsXG4gICAgICAgIGNvbnRleHRUeXBlczogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgICAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgICAgICAgZ2V0RGVmYXVsdFByb3BzOiB0cnVlLFxuICAgICAgICBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHM6IHRydWUsXG4gICAgICAgIG1peGluczogdHJ1ZSxcbiAgICAgICAgcHJvcFR5cGVzOiB0cnVlLFxuICAgICAgICB0eXBlOiB0cnVlXG4gICAgfTtcbiAgICBcbiAgICB2YXIgS05PV05fU1RBVElDUyA9IHtcbiAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgbGVuZ3RoOiB0cnVlLFxuICAgICAgICBwcm90b3R5cGU6IHRydWUsXG4gICAgICAgIGNhbGxlcjogdHJ1ZSxcbiAgICAgICAgY2FsbGVlOiB0cnVlLFxuICAgICAgICBhcmd1bWVudHM6IHRydWUsXG4gICAgICAgIGFyaXR5OiB0cnVlXG4gICAgfTtcbiAgICBcbiAgICB2YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4gICAgdmFyIGdldE93blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiAgICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgICB2YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gICAgdmFyIG9iamVjdFByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mICYmIGdldFByb3RvdHlwZU9mKE9iamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50LCBibGFja2xpc3QpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7IC8vIGRvbid0IGhvaXN0IG92ZXIgc3RyaW5nIChodG1sKSBjb21wb25lbnRzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5oZXJpdGVkQ29tcG9uZW50ID0gZ2V0UHJvdG90eXBlT2Yoc291cmNlQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5oZXJpdGVkQ29tcG9uZW50ICYmIGluaGVyaXRlZENvbXBvbmVudCAhPT0gb2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgaW5oZXJpdGVkQ29tcG9uZW50LCBibGFja2xpc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZUNvbXBvbmVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZUNvbXBvbmVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIVJFQUNUX1NUQVRJQ1Nba2V5XSAmJiAhS05PV05fU1RBVElDU1trZXldICYmICghYmxhY2tsaXN0IHx8ICFibGFja2xpc3Rba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlQ29tcG9uZW50LCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICB0cnkgeyAvLyBBdm9pZCBmYWlsdXJlcyBmcm9tIHJlYWQtb25seSBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXRDb21wb25lbnQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xuICAgIH07XG59KSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ludmFyaWFudC9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9pbnZhcmlhbnQvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgZ2V0UmF3VGFnIGZyb20gJy4vX2dldFJhd1RhZy5qcyc7XG5pbXBvcnQgb2JqZWN0VG9TdHJpbmcgZnJvbSAnLi9fb2JqZWN0VG9TdHJpbmcuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldFRhZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbmV4cG9ydCBkZWZhdWx0IGZyZWVHbG9iYWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UHJvdG90eXBlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0UmF3VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJBcmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJBcmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgZnJlZUdsb2JhbCBmcm9tICcuL19mcmVlR2xvYmFsLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5leHBvcnQgZGVmYXVsdCByb290O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0TGlrZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLFxuICAgICAgICAgICAgICBwcm9wRnVsbE5hbWUsXG4gICAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAlcyBhdCBpbmRleCAlcy4nLFxuICAgICAgICAgIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSxcbiAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiZcbiAgICBTeW1ib2wuZm9yICYmXG4gICAgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpKSB8fFxuICAgIDB4ZWFjNztcblxuICB2YXIgaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIG9iamVjdCAhPT0gbnVsbCAmJlxuICAgICAgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG4gIH07XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYm9keU9wZW5DbGFzc05hbWUgPSBleHBvcnRzLnBvcnRhbENsYXNzTmFtZSA9IHVuZGVmaW5lZDtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpO1xuXG52YXIgX3JlYWN0RG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0RG9tKTtcblxudmFyIF9wcm9wVHlwZXMgPSByZXF1aXJlKFwicHJvcC10eXBlc1wiKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxudmFyIF9Nb2RhbFBvcnRhbCA9IHJlcXVpcmUoXCIuL01vZGFsUG9ydGFsXCIpO1xuXG52YXIgX01vZGFsUG9ydGFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX01vZGFsUG9ydGFsKTtcblxudmFyIF9hcmlhQXBwSGlkZXIgPSByZXF1aXJlKFwiLi4vaGVscGVycy9hcmlhQXBwSGlkZXJcIik7XG5cbnZhciBhcmlhQXBwSGlkZXIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfYXJpYUFwcEhpZGVyKTtcblxudmFyIF9zYWZlSFRNTEVsZW1lbnQgPSByZXF1aXJlKFwiLi4vaGVscGVycy9zYWZlSFRNTEVsZW1lbnRcIik7XG5cbnZhciBfc2FmZUhUTUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NhZmVIVE1MRWxlbWVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIHBvcnRhbENsYXNzTmFtZSA9IGV4cG9ydHMucG9ydGFsQ2xhc3NOYW1lID0gXCJSZWFjdE1vZGFsUG9ydGFsXCI7XG52YXIgYm9keU9wZW5DbGFzc05hbWUgPSBleHBvcnRzLmJvZHlPcGVuQ2xhc3NOYW1lID0gXCJSZWFjdE1vZGFsX19Cb2R5LS1vcGVuXCI7XG5cbnZhciBpc1JlYWN0MTYgPSBfcmVhY3REb20yLmRlZmF1bHQuY3JlYXRlUG9ydGFsICE9PSB1bmRlZmluZWQ7XG52YXIgY3JlYXRlUG9ydGFsID0gaXNSZWFjdDE2ID8gX3JlYWN0RG9tMi5kZWZhdWx0LmNyZWF0ZVBvcnRhbCA6IF9yZWFjdERvbTIuZGVmYXVsdC51bnN0YWJsZV9yZW5kZXJTdWJ0cmVlSW50b0NvbnRhaW5lcjtcblxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudChwYXJlbnRTZWxlY3Rvcikge1xuICByZXR1cm4gcGFyZW50U2VsZWN0b3IoKTtcbn1cblxudmFyIE1vZGFsID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKE1vZGFsLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBNb2RhbCgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kYWwpO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZXQgPSAoX3RlbXAgPSAoX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoX3JlZiA9IE1vZGFsLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTW9kYWwpKS5jYWxsLmFwcGx5KF9yZWYsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5yZW1vdmVQb3J0YWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAhaXNSZWFjdDE2ICYmIF9yZWFjdERvbTIuZGVmYXVsdC51bm1vdW50Q29tcG9uZW50QXROb2RlKF90aGlzLm5vZGUpO1xuICAgICAgdmFyIHBhcmVudCA9IGdldFBhcmVudEVsZW1lbnQoX3RoaXMucHJvcHMucGFyZW50U2VsZWN0b3IpO1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKF90aGlzLm5vZGUpO1xuICAgIH0sIF90aGlzLnBvcnRhbFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIF90aGlzLnBvcnRhbCA9IHJlZjtcbiAgICB9LCBfdGhpcy5yZW5kZXJQb3J0YWwgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgIHZhciBwb3J0YWwgPSBjcmVhdGVQb3J0YWwoX3RoaXMsIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Nb2RhbFBvcnRhbDIuZGVmYXVsdCwgX2V4dGVuZHMoeyBkZWZhdWx0U3R5bGVzOiBNb2RhbC5kZWZhdWx0U3R5bGVzIH0sIHByb3BzKSksIF90aGlzLm5vZGUpO1xuICAgICAgX3RoaXMucG9ydGFsUmVmKHBvcnRhbCk7XG4gICAgfSwgX3RlbXApLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTW9kYWwsIFt7XG4gICAga2V5OiBcImNvbXBvbmVudERpZE1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgaWYgKCFfc2FmZUhUTUxFbGVtZW50LmNhblVzZURPTSkgcmV0dXJuO1xuXG4gICAgICBpZiAoIWlzUmVhY3QxNikge1xuICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgfVxuICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMucHJvcHMucG9ydGFsQ2xhc3NOYW1lO1xuXG4gICAgICB2YXIgcGFyZW50ID0gZ2V0UGFyZW50RWxlbWVudCh0aGlzLnByb3BzLnBhcmVudFNlbGVjdG9yKTtcbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLm5vZGUpO1xuXG4gICAgICAhaXNSZWFjdDE2ICYmIHRoaXMucmVuZGVyUG9ydGFsKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgIGlmICghX3NhZmVIVE1MRWxlbWVudC5jYW5Vc2VET00pIHJldHVybjtcbiAgICAgIHZhciBpc09wZW4gPSBuZXdQcm9wcy5pc09wZW47XG4gICAgICAvLyBTdG9wIHVubmVjZXNzYXJ5IHJlbmRlcnMgaWYgbW9kYWwgaXMgcmVtYWluaW5nIGNsb3NlZFxuXG4gICAgICBpZiAoIXRoaXMucHJvcHMuaXNPcGVuICYmICFpc09wZW4pIHJldHVybjtcblxuICAgICAgdmFyIGN1cnJlbnRQYXJlbnQgPSBnZXRQYXJlbnRFbGVtZW50KHRoaXMucHJvcHMucGFyZW50U2VsZWN0b3IpO1xuICAgICAgdmFyIG5ld1BhcmVudCA9IGdldFBhcmVudEVsZW1lbnQobmV3UHJvcHMucGFyZW50U2VsZWN0b3IpO1xuXG4gICAgICBpZiAobmV3UGFyZW50ICE9PSBjdXJyZW50UGFyZW50KSB7XG4gICAgICAgIGN1cnJlbnRQYXJlbnQucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcbiAgICAgICAgbmV3UGFyZW50LmFwcGVuZENoaWxkKHRoaXMubm9kZSk7XG4gICAgICB9XG5cbiAgICAgICFpc1JlYWN0MTYgJiYgdGhpcy5yZW5kZXJQb3J0YWwobmV3UHJvcHMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsVXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVcGRhdGUobmV3UHJvcHMpIHtcbiAgICAgIGlmICghX3NhZmVIVE1MRWxlbWVudC5jYW5Vc2VET00pIHJldHVybjtcbiAgICAgIGlmIChuZXdQcm9wcy5wb3J0YWxDbGFzc05hbWUgIT09IHRoaXMucHJvcHMucG9ydGFsQ2xhc3NOYW1lKSB7XG4gICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSBuZXdQcm9wcy5wb3J0YWxDbGFzc05hbWU7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbXBvbmVudFdpbGxVbm1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKCFfc2FmZUhUTUxFbGVtZW50LmNhblVzZURPTSB8fCAhdGhpcy5ub2RlIHx8ICF0aGlzLnBvcnRhbCkgcmV0dXJuO1xuXG4gICAgICB2YXIgc3RhdGUgPSB0aGlzLnBvcnRhbC5zdGF0ZTtcbiAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgdmFyIGNsb3Nlc0F0ID0gc3RhdGUuaXNPcGVuICYmIHRoaXMucHJvcHMuY2xvc2VUaW1lb3V0TVMgJiYgKHN0YXRlLmNsb3Nlc0F0IHx8IG5vdyArIHRoaXMucHJvcHMuY2xvc2VUaW1lb3V0TVMpO1xuXG4gICAgICBpZiAoY2xvc2VzQXQpIHtcbiAgICAgICAgaWYgKCFzdGF0ZS5iZWZvcmVDbG9zZSkge1xuICAgICAgICAgIHRoaXMucG9ydGFsLmNsb3NlV2l0aFRpbWVvdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5yZW1vdmVQb3J0YWwsIGNsb3Nlc0F0IC0gbm93KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUG9ydGFsKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICBpZiAoIV9zYWZlSFRNTEVsZW1lbnQuY2FuVXNlRE9NIHx8ICFpc1JlYWN0MTYpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5ub2RlICYmIGlzUmVhY3QxNikge1xuICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3JlYXRlUG9ydGFsKF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Nb2RhbFBvcnRhbDIuZGVmYXVsdCwgX2V4dGVuZHMoe1xuICAgICAgICByZWY6IHRoaXMucG9ydGFsUmVmLFxuICAgICAgICBkZWZhdWx0U3R5bGVzOiBNb2RhbC5kZWZhdWx0U3R5bGVzXG4gICAgICB9LCB0aGlzLnByb3BzKSksIHRoaXMubm9kZSk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwic2V0QXBwRWxlbWVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRBcHBFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGFyaWFBcHBIaWRlci5zZXRFbGVtZW50KGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzICovXG5cbiAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzICovXG5cbiAgfV0pO1xuXG4gIHJldHVybiBNb2RhbDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbk1vZGFsLnByb3BUeXBlcyA9IHtcbiAgaXNPcGVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wuaXNSZXF1aXJlZCxcbiAgc3R5bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc2hhcGUoe1xuICAgIGNvbnRlbnQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICAgIG92ZXJsYXk6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0XG4gIH0pLFxuICBwb3J0YWxDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBib2R5T3BlbkNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGh0bWxPcGVuQ2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgY2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIF9wcm9wVHlwZXMyLmRlZmF1bHQuc2hhcGUoe1xuICAgIGJhc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYWZ0ZXJPcGVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGJlZm9yZUNsb3NlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZy5pc1JlcXVpcmVkXG4gIH0pXSksXG4gIG92ZXJsYXlDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgX3Byb3BUeXBlczIuZGVmYXVsdC5zaGFwZSh7XG4gICAgYmFzZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBhZnRlck9wZW46IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYmVmb3JlQ2xvc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLmlzUmVxdWlyZWRcbiAgfSldKSxcbiAgYXBwRWxlbWVudDogX3Byb3BUeXBlczIuZGVmYXVsdC5pbnN0YW5jZU9mKF9zYWZlSFRNTEVsZW1lbnQyLmRlZmF1bHQpLFxuICBvbkFmdGVyT3BlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuICBvblJlcXVlc3RDbG9zZTogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuICBjbG9zZVRpbWVvdXRNUzogX3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXIsXG4gIGFyaWFIaWRlQXBwOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIHNob3VsZEZvY3VzQWZ0ZXJSZW5kZXI6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgc2hvdWxkQ2xvc2VPbk92ZXJsYXlDbGljazogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBzaG91bGRSZXR1cm5Gb2N1c0FmdGVyQ2xvc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgcGFyZW50U2VsZWN0b3I6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcbiAgYXJpYTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3QsXG4gIHJvbGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBjb250ZW50TGFiZWw6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBzaG91bGRDbG9zZU9uRXNjOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIG92ZXJsYXlSZWY6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcbiAgY29udGVudFJlZjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jXG59O1xuTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICBpc09wZW46IGZhbHNlLFxuICBwb3J0YWxDbGFzc05hbWU6IHBvcnRhbENsYXNzTmFtZSxcbiAgYm9keU9wZW5DbGFzc05hbWU6IGJvZHlPcGVuQ2xhc3NOYW1lLFxuICBhcmlhSGlkZUFwcDogdHJ1ZSxcbiAgY2xvc2VUaW1lb3V0TVM6IDAsXG4gIHNob3VsZEZvY3VzQWZ0ZXJSZW5kZXI6IHRydWUsXG4gIHNob3VsZENsb3NlT25Fc2M6IHRydWUsXG4gIHNob3VsZENsb3NlT25PdmVybGF5Q2xpY2s6IHRydWUsXG4gIHNob3VsZFJldHVybkZvY3VzQWZ0ZXJDbG9zZTogdHJ1ZSxcbiAgcGFyZW50U2VsZWN0b3I6IGZ1bmN0aW9uIHBhcmVudFNlbGVjdG9yKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xuICB9XG59O1xuTW9kYWwuZGVmYXVsdFN0eWxlcyA9IHtcbiAgb3ZlcmxheToge1xuICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpXCJcbiAgfSxcbiAgY29udGVudDoge1xuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgdG9wOiBcIjQwcHhcIixcbiAgICBsZWZ0OiBcIjQwcHhcIixcbiAgICByaWdodDogXCI0MHB4XCIsXG4gICAgYm90dG9tOiBcIjQwcHhcIixcbiAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNjY2NcIixcbiAgICBiYWNrZ3JvdW5kOiBcIiNmZmZcIixcbiAgICBvdmVyZmxvdzogXCJhdXRvXCIsXG4gICAgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6IFwidG91Y2hcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgb3V0bGluZTogXCJub25lXCIsXG4gICAgcGFkZGluZzogXCIyMHB4XCJcbiAgfVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IE1vZGFsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9jb21wb25lbnRzL01vZGFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvY29tcG9uZW50cy9Nb2RhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9wcm9wVHlwZXMgPSByZXF1aXJlKFwicHJvcC10eXBlc1wiKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxudmFyIF9mb2N1c01hbmFnZXIgPSByZXF1aXJlKFwiLi4vaGVscGVycy9mb2N1c01hbmFnZXJcIik7XG5cbnZhciBmb2N1c01hbmFnZXIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZm9jdXNNYW5hZ2VyKTtcblxudmFyIF9zY29wZVRhYiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3Njb3BlVGFiXCIpO1xuXG52YXIgX3Njb3BlVGFiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Njb3BlVGFiKTtcblxudmFyIF9hcmlhQXBwSGlkZXIgPSByZXF1aXJlKFwiLi4vaGVscGVycy9hcmlhQXBwSGlkZXJcIik7XG5cbnZhciBhcmlhQXBwSGlkZXIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfYXJpYUFwcEhpZGVyKTtcblxudmFyIF9jbGFzc0xpc3QgPSByZXF1aXJlKFwiLi4vaGVscGVycy9jbGFzc0xpc3RcIik7XG5cbnZhciBjbGFzc0xpc3QgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfY2xhc3NMaXN0KTtcblxudmFyIF9zYWZlSFRNTEVsZW1lbnQgPSByZXF1aXJlKFwiLi4vaGVscGVycy9zYWZlSFRNTEVsZW1lbnRcIik7XG5cbnZhciBfc2FmZUhUTUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NhZmVIVE1MRWxlbWVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLy8gc28gdGhhdCBvdXIgQ1NTIGlzIHN0YXRpY2FsbHkgYW5hbHl6YWJsZVxudmFyIENMQVNTX05BTUVTID0ge1xuICBvdmVybGF5OiBcIlJlYWN0TW9kYWxfX092ZXJsYXlcIixcbiAgY29udGVudDogXCJSZWFjdE1vZGFsX19Db250ZW50XCJcbn07XG5cbnZhciBUQUJfS0VZID0gOTtcbnZhciBFU0NfS0VZID0gMjc7XG5cbnZhciBhcmlhSGlkZGVuSW5zdGFuY2VzID0gMDtcblxudmFyIE1vZGFsUG9ydGFsID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKE1vZGFsUG9ydGFsLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBNb2RhbFBvcnRhbChwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNb2RhbFBvcnRhbCk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoTW9kYWxQb3J0YWwuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNb2RhbFBvcnRhbCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnNldEZvY3VzQWZ0ZXJSZW5kZXIgPSBmdW5jdGlvbiAoZm9jdXMpIHtcbiAgICAgIF90aGlzLmZvY3VzQWZ0ZXJSZW5kZXIgPSBfdGhpcy5wcm9wcy5zaG91bGRGb2N1c0FmdGVyUmVuZGVyICYmIGZvY3VzO1xuICAgIH07XG5cbiAgICBfdGhpcy5zZXRPdmVybGF5UmVmID0gZnVuY3Rpb24gKG92ZXJsYXkpIHtcbiAgICAgIF90aGlzLm92ZXJsYXkgPSBvdmVybGF5O1xuICAgICAgX3RoaXMucHJvcHMub3ZlcmxheVJlZiAmJiBfdGhpcy5wcm9wcy5vdmVybGF5UmVmKG92ZXJsYXkpO1xuICAgIH07XG5cbiAgICBfdGhpcy5zZXRDb250ZW50UmVmID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIF90aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgX3RoaXMucHJvcHMuY29udGVudFJlZiAmJiBfdGhpcy5wcm9wcy5jb250ZW50UmVmKGNvbnRlbnQpO1xuICAgIH07XG5cbiAgICBfdGhpcy5hZnRlckNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgYXBwRWxlbWVudCA9IF90aGlzJHByb3BzLmFwcEVsZW1lbnQsXG4gICAgICAgICAgYXJpYUhpZGVBcHAgPSBfdGhpcyRwcm9wcy5hcmlhSGlkZUFwcCxcbiAgICAgICAgICBodG1sT3BlbkNsYXNzTmFtZSA9IF90aGlzJHByb3BzLmh0bWxPcGVuQ2xhc3NOYW1lLFxuICAgICAgICAgIGJvZHlPcGVuQ2xhc3NOYW1lID0gX3RoaXMkcHJvcHMuYm9keU9wZW5DbGFzc05hbWU7XG5cbiAgICAgIC8vIFJlbW92ZSBjbGFzc2VzLlxuXG4gICAgICBjbGFzc0xpc3QucmVtb3ZlKGRvY3VtZW50LmJvZHksIGJvZHlPcGVuQ2xhc3NOYW1lKTtcblxuICAgICAgaHRtbE9wZW5DbGFzc05hbWUgJiYgY2xhc3NMaXN0LnJlbW92ZShkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImh0bWxcIilbMF0sIGh0bWxPcGVuQ2xhc3NOYW1lKTtcblxuICAgICAgLy8gUmVzZXQgYXJpYS1oaWRkZW4gYXR0cmlidXRlIGlmIGFsbCBtb2RhbHMgaGF2ZSBiZWVuIHJlbW92ZWRcbiAgICAgIGlmIChhcmlhSGlkZUFwcCAmJiBhcmlhSGlkZGVuSW5zdGFuY2VzID4gMCkge1xuICAgICAgICBhcmlhSGlkZGVuSW5zdGFuY2VzIC09IDE7XG5cbiAgICAgICAgaWYgKGFyaWFIaWRkZW5JbnN0YW5jZXMgPT09IDApIHtcbiAgICAgICAgICBhcmlhQXBwSGlkZXIuc2hvdyhhcHBFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMucHJvcHMuc2hvdWxkRm9jdXNBZnRlclJlbmRlcikge1xuICAgICAgICBpZiAoX3RoaXMucHJvcHMuc2hvdWxkUmV0dXJuRm9jdXNBZnRlckNsb3NlKSB7XG4gICAgICAgICAgZm9jdXNNYW5hZ2VyLnJldHVybkZvY3VzKCk7XG4gICAgICAgICAgZm9jdXNNYW5hZ2VyLnRlYXJkb3duU2NvcGVkRm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb2N1c01hbmFnZXIucG9wV2l0aG91dEZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoaXMub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJlZm9yZU9wZW4oKTtcbiAgICAgIGlmIChfdGhpcy5zdGF0ZS5hZnRlck9wZW4gJiYgX3RoaXMuc3RhdGUuYmVmb3JlQ2xvc2UpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLmNsb3NlVGltZXIpO1xuICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IGJlZm9yZUNsb3NlOiBmYWxzZSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChfdGhpcy5wcm9wcy5zaG91bGRGb2N1c0FmdGVyUmVuZGVyKSB7XG4gICAgICAgICAgZm9jdXNNYW5hZ2VyLnNldHVwU2NvcGVkRm9jdXMoX3RoaXMubm9kZSk7XG4gICAgICAgICAgZm9jdXNNYW5hZ2VyLm1hcmtGb3JGb2N1c0xhdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogdHJ1ZSB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBhZnRlck9wZW46IHRydWUgfSk7XG5cbiAgICAgICAgICBpZiAoX3RoaXMucHJvcHMuaXNPcGVuICYmIF90aGlzLnByb3BzLm9uQWZ0ZXJPcGVuKSB7XG4gICAgICAgICAgICBfdGhpcy5wcm9wcy5vbkFmdGVyT3BlbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKF90aGlzLnByb3BzLmNsb3NlVGltZW91dE1TID4gMCkge1xuICAgICAgICBfdGhpcy5jbG9zZVdpdGhUaW1lb3V0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5jbG9zZVdpdGhvdXRUaW1lb3V0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmZvY3VzQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5jb250ZW50ICYmICFfdGhpcy5jb250ZW50SGFzRm9jdXMoKSAmJiBfdGhpcy5jb250ZW50LmZvY3VzKCk7XG4gICAgfTtcblxuICAgIF90aGlzLmNsb3NlV2l0aFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY2xvc2VzQXQgPSBEYXRlLm5vdygpICsgX3RoaXMucHJvcHMuY2xvc2VUaW1lb3V0TVM7XG4gICAgICBfdGhpcy5zZXRTdGF0ZSh7IGJlZm9yZUNsb3NlOiB0cnVlLCBjbG9zZXNBdDogY2xvc2VzQXQgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5jbG9zZVRpbWVyID0gc2V0VGltZW91dChfdGhpcy5jbG9zZVdpdGhvdXRUaW1lb3V0LCBfdGhpcy5zdGF0ZS5jbG9zZXNBdCAtIERhdGUubm93KCkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF90aGlzLmNsb3NlV2l0aG91dFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGJlZm9yZUNsb3NlOiBmYWxzZSxcbiAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgICAgYWZ0ZXJPcGVuOiBmYWxzZSxcbiAgICAgICAgY2xvc2VzQXQ6IG51bGxcbiAgICAgIH0sIF90aGlzLmFmdGVyQ2xvc2UpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVLZXlEb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gVEFCX0tFWSkge1xuICAgICAgICAoMCwgX3Njb3BlVGFiMi5kZWZhdWx0KShfdGhpcy5jb250ZW50LCBldmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uRXNjICYmIGV2ZW50LmtleUNvZGUgPT09IEVTQ19LRVkpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIF90aGlzLnJlcXVlc3RDbG9zZShldmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZU92ZXJsYXlPbkNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoX3RoaXMuc2hvdWxkQ2xvc2UgPT09IG51bGwpIHtcbiAgICAgICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMuc2hvdWxkQ2xvc2UgJiYgX3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPbk92ZXJsYXlDbGljaykge1xuICAgICAgICBpZiAoX3RoaXMub3duZXJIYW5kbGVzQ2xvc2UoKSkge1xuICAgICAgICAgIF90aGlzLnJlcXVlc3RDbG9zZShldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuZm9jdXNDb250ZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF90aGlzLnNob3VsZENsb3NlID0gbnVsbDtcbiAgICAgIF90aGlzLm1vdmVGcm9tQ29udGVudFRvT3ZlcmxheSA9IG51bGw7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZU92ZXJsYXlPbk1vdXNlVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoX3RoaXMubW92ZUZyb21Db250ZW50VG9PdmVybGF5ID09PSBudWxsKSB7XG4gICAgICAgIF90aGlzLnNob3VsZENsb3NlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoX3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPbk92ZXJsYXlDbGljaykge1xuICAgICAgICBfdGhpcy5zaG91bGRDbG9zZSA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUNvbnRlbnRPbk1vdXNlVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5zaG91bGRDbG9zZSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVPdmVybGF5T25Nb3VzZURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmICghX3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPbk92ZXJsYXlDbGljayAmJiBldmVudC50YXJnZXQgPT0gX3RoaXMub3ZlcmxheSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgX3RoaXMubW92ZUZyb21Db250ZW50VG9PdmVybGF5ID0gZmFsc2U7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUNvbnRlbnRPbkNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlQ29udGVudE9uTW91c2VEb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSBmYWxzZTtcbiAgICAgIF90aGlzLm1vdmVGcm9tQ29udGVudFRvT3ZlcmxheSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBfdGhpcy5yZXF1ZXN0Q2xvc2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBfdGhpcy5vd25lckhhbmRsZXNDbG9zZSgpICYmIF90aGlzLnByb3BzLm9uUmVxdWVzdENsb3NlKGV2ZW50KTtcbiAgICB9O1xuXG4gICAgX3RoaXMub3duZXJIYW5kbGVzQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucHJvcHMub25SZXF1ZXN0Q2xvc2U7XG4gICAgfTtcblxuICAgIF90aGlzLnNob3VsZEJlQ2xvc2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICFfdGhpcy5zdGF0ZS5pc09wZW4gJiYgIV90aGlzLnN0YXRlLmJlZm9yZUNsb3NlO1xuICAgIH07XG5cbiAgICBfdGhpcy5jb250ZW50SGFzRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gX3RoaXMuY29udGVudCB8fCBfdGhpcy5jb250ZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgIH07XG5cbiAgICBfdGhpcy5idWlsZENsYXNzTmFtZSA9IGZ1bmN0aW9uICh3aGljaCwgYWRkaXRpb25hbCkge1xuICAgICAgdmFyIGNsYXNzTmFtZXMgPSAodHlwZW9mIGFkZGl0aW9uYWwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihhZGRpdGlvbmFsKSkgPT09IFwib2JqZWN0XCIgPyBhZGRpdGlvbmFsIDoge1xuICAgICAgICBiYXNlOiBDTEFTU19OQU1FU1t3aGljaF0sXG4gICAgICAgIGFmdGVyT3BlbjogQ0xBU1NfTkFNRVNbd2hpY2hdICsgXCItLWFmdGVyLW9wZW5cIixcbiAgICAgICAgYmVmb3JlQ2xvc2U6IENMQVNTX05BTUVTW3doaWNoXSArIFwiLS1iZWZvcmUtY2xvc2VcIlxuICAgICAgfTtcbiAgICAgIHZhciBjbGFzc05hbWUgPSBjbGFzc05hbWVzLmJhc2U7XG4gICAgICBpZiAoX3RoaXMuc3RhdGUuYWZ0ZXJPcGVuKSB7XG4gICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZSArIFwiIFwiICsgY2xhc3NOYW1lcy5hZnRlck9wZW47XG4gICAgICB9XG4gICAgICBpZiAoX3RoaXMuc3RhdGUuYmVmb3JlQ2xvc2UpIHtcbiAgICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWVzLmJlZm9yZUNsb3NlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHR5cGVvZiBhZGRpdGlvbmFsID09PSBcInN0cmluZ1wiICYmIGFkZGl0aW9uYWwgPyBjbGFzc05hbWUgKyBcIiBcIiArIGFkZGl0aW9uYWwgOiBjbGFzc05hbWU7XG4gICAgfTtcblxuICAgIF90aGlzLmFyaWFBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoaXRlbXMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBuYW1lKSB7XG4gICAgICAgIGFjY1tcImFyaWEtXCIgKyBuYW1lXSA9IGl0ZW1zW25hbWVdO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuICAgIH07XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFmdGVyT3BlbjogZmFsc2UsXG4gICAgICBiZWZvcmVDbG9zZTogZmFsc2VcbiAgICB9O1xuXG4gICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSBudWxsO1xuICAgIF90aGlzLm1vdmVGcm9tQ29udGVudFRvT3ZlcmxheSA9IG51bGw7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE1vZGFsUG9ydGFsLCBbe1xuICAgIGtleTogXCJjb21wb25lbnREaWRNb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIC8vIEZvY3VzIG5lZWRzIHRvIGJlIHNldCB3aGVuIG1vdW50aW5nIGFuZCBhbHJlYWR5IG9wZW5cbiAgICAgIGlmICh0aGlzLnByb3BzLmlzT3Blbikge1xuICAgICAgICB0aGlzLnNldEZvY3VzQWZ0ZXJSZW5kZXIodHJ1ZSk7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmJvZHlPcGVuQ2xhc3NOYW1lICE9PSB0aGlzLnByb3BzLmJvZHlPcGVuQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1JlYWN0LU1vZGFsOiBcImJvZHlPcGVuQ2xhc3NOYW1lXCIgcHJvcCBoYXMgYmVlbiBtb2RpZmllZC4gJyArIFwiVGhpcyBtYXkgY2F1c2UgdW5leHBlY3RlZCBiZWhhdmlvciB3aGVuIG11bHRpcGxlIG1vZGFscyBhcmUgb3Blbi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1Byb3BzLmh0bWxPcGVuQ2xhc3NOYW1lICE9PSB0aGlzLnByb3BzLmh0bWxPcGVuQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1JlYWN0LU1vZGFsOiBcImh0bWxPcGVuQ2xhc3NOYW1lXCIgcHJvcCBoYXMgYmVlbiBtb2RpZmllZC4gJyArIFwiVGhpcyBtYXkgY2F1c2UgdW5leHBlY3RlZCBiZWhhdmlvciB3aGVuIG11bHRpcGxlIG1vZGFscyBhcmUgb3Blbi5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEZvY3VzIG9ubHkgbmVlZHMgdG8gYmUgc2V0IG9uY2Ugd2hlbiB0aGUgbW9kYWwgaXMgYmVpbmcgb3BlbmVkXG4gICAgICBpZiAoIXRoaXMucHJvcHMuaXNPcGVuICYmIG5ld1Byb3BzLmlzT3Blbikge1xuICAgICAgICB0aGlzLnNldEZvY3VzQWZ0ZXJSZW5kZXIodHJ1ZSk7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmlzT3BlbiAmJiAhbmV3UHJvcHMuaXNPcGVuKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkVXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgIGlmICh0aGlzLmZvY3VzQWZ0ZXJSZW5kZXIpIHtcbiAgICAgICAgdGhpcy5mb2N1c0NvbnRlbnQoKTtcbiAgICAgICAgdGhpcy5zZXRGb2N1c0FmdGVyUmVuZGVyKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFVubW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLmFmdGVyQ2xvc2UoKTtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNsb3NlVGltZXIpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJiZWZvcmVPcGVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJlZm9yZU9wZW4oKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBhcHBFbGVtZW50ID0gX3Byb3BzLmFwcEVsZW1lbnQsXG4gICAgICAgICAgYXJpYUhpZGVBcHAgPSBfcHJvcHMuYXJpYUhpZGVBcHAsXG4gICAgICAgICAgaHRtbE9wZW5DbGFzc05hbWUgPSBfcHJvcHMuaHRtbE9wZW5DbGFzc05hbWUsXG4gICAgICAgICAgYm9keU9wZW5DbGFzc05hbWUgPSBfcHJvcHMuYm9keU9wZW5DbGFzc05hbWU7XG5cbiAgICAgIC8vIEFkZCBjbGFzc2VzLlxuXG4gICAgICBjbGFzc0xpc3QuYWRkKGRvY3VtZW50LmJvZHksIGJvZHlPcGVuQ2xhc3NOYW1lKTtcblxuICAgICAgaHRtbE9wZW5DbGFzc05hbWUgJiYgY2xhc3NMaXN0LmFkZChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImh0bWxcIilbMF0sIGh0bWxPcGVuQ2xhc3NOYW1lKTtcblxuICAgICAgaWYgKGFyaWFIaWRlQXBwKSB7XG4gICAgICAgIGFyaWFIaWRkZW5JbnN0YW5jZXMgKz0gMTtcbiAgICAgICAgYXJpYUFwcEhpZGVyLmhpZGUoYXBwRWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRG9uJ3Qgc3RlYWwgZm9jdXMgZnJvbSBpbm5lciBlbGVtZW50c1xuXG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjbGFzc05hbWUgPSBfcHJvcHMyLmNsYXNzTmFtZSxcbiAgICAgICAgICBvdmVybGF5Q2xhc3NOYW1lID0gX3Byb3BzMi5vdmVybGF5Q2xhc3NOYW1lLFxuICAgICAgICAgIGRlZmF1bHRTdHlsZXMgPSBfcHJvcHMyLmRlZmF1bHRTdHlsZXM7XG5cbiAgICAgIHZhciBjb250ZW50U3R5bGVzID0gY2xhc3NOYW1lID8ge30gOiBkZWZhdWx0U3R5bGVzLmNvbnRlbnQ7XG4gICAgICB2YXIgb3ZlcmxheVN0eWxlcyA9IG92ZXJsYXlDbGFzc05hbWUgPyB7fSA6IGRlZmF1bHRTdHlsZXMub3ZlcmxheTtcblxuICAgICAgcmV0dXJuIHRoaXMuc2hvdWxkQmVDbG9zZWQoKSA/IG51bGwgOiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHJlZjogdGhpcy5zZXRPdmVybGF5UmVmLFxuICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5idWlsZENsYXNzTmFtZShcIm92ZXJsYXlcIiwgb3ZlcmxheUNsYXNzTmFtZSksXG4gICAgICAgICAgc3R5bGU6IF9leHRlbmRzKHt9LCBvdmVybGF5U3R5bGVzLCB0aGlzLnByb3BzLnN0eWxlLm92ZXJsYXkpLFxuICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlT3ZlcmxheU9uQ2xpY2ssXG4gICAgICAgICAgb25Nb3VzZURvd246IHRoaXMuaGFuZGxlT3ZlcmxheU9uTW91c2VEb3duLFxuICAgICAgICAgIG9uTW91c2VVcDogdGhpcy5oYW5kbGVPdmVybGF5T25Nb3VzZVVwLFxuICAgICAgICAgIFwiYXJpYS1tb2RhbFwiOiBcInRydWVcIlxuICAgICAgICB9LFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIF9leHRlbmRzKHtcbiAgICAgICAgICAgIHJlZjogdGhpcy5zZXRDb250ZW50UmVmLFxuICAgICAgICAgICAgc3R5bGU6IF9leHRlbmRzKHt9LCBjb250ZW50U3R5bGVzLCB0aGlzLnByb3BzLnN0eWxlLmNvbnRlbnQpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmJ1aWxkQ2xhc3NOYW1lKFwiY29udGVudFwiLCBjbGFzc05hbWUpLFxuICAgICAgICAgICAgdGFiSW5kZXg6IFwiLTFcIixcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLFxuICAgICAgICAgICAgb25Nb3VzZURvd246IHRoaXMuaGFuZGxlQ29udGVudE9uTW91c2VEb3duLFxuICAgICAgICAgICAgb25Nb3VzZVVwOiB0aGlzLmhhbmRsZUNvbnRlbnRPbk1vdXNlVXAsXG4gICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNvbnRlbnRPbkNsaWNrLFxuICAgICAgICAgICAgcm9sZTogdGhpcy5wcm9wcy5yb2xlLFxuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IHRoaXMucHJvcHMuY29udGVudExhYmVsXG4gICAgICAgICAgfSwgdGhpcy5hcmlhQXR0cmlidXRlcyh0aGlzLnByb3BzLmFyaWEgfHwge30pKSxcbiAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE1vZGFsUG9ydGFsO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuTW9kYWxQb3J0YWwuZGVmYXVsdFByb3BzID0ge1xuICBzdHlsZToge1xuICAgIG92ZXJsYXk6IHt9LFxuICAgIGNvbnRlbnQ6IHt9XG4gIH1cbn07XG5Nb2RhbFBvcnRhbC5wcm9wVHlwZXMgPSB7XG4gIGlzT3BlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLmlzUmVxdWlyZWQsXG4gIGRlZmF1bHRTdHlsZXM6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc2hhcGUoe1xuICAgIGNvbnRlbnQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICAgIG92ZXJsYXk6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0XG4gIH0pLFxuICBzdHlsZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zaGFwZSh7XG4gICAgY29udGVudDogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3QsXG4gICAgb3ZlcmxheTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3RcbiAgfSksXG4gIGNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdF0pLFxuICBvdmVybGF5Q2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0XSksXG4gIGJvZHlPcGVuQ2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgaHRtbE9wZW5DbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBhcmlhSGlkZUFwcDogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBhcHBFbGVtZW50OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lmluc3RhbmNlT2YoX3NhZmVIVE1MRWxlbWVudDIuZGVmYXVsdCksXG4gIG9uQWZ0ZXJPcGVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsXG4gIG9uUmVxdWVzdENsb3NlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsXG4gIGNsb3NlVGltZW91dE1TOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlcixcbiAgc2hvdWxkRm9jdXNBZnRlclJlbmRlcjogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBzaG91bGRDbG9zZU9uT3ZlcmxheUNsaWNrOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIHNob3VsZFJldHVybkZvY3VzQWZ0ZXJDbG9zZTogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICByb2xlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgY29udGVudExhYmVsOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgYXJpYTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3QsXG4gIGNoaWxkcmVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm5vZGUsXG4gIHNob3VsZENsb3NlT25Fc2M6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgb3ZlcmxheVJlZjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuICBjb250ZW50UmVmOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmNcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RhbFBvcnRhbDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2NvbXBvbmVudHMvTW9kYWxQb3J0YWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9jb21wb25lbnRzL01vZGFsUG9ydGFsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5hc3NlcnROb2RlTGlzdCA9IGFzc2VydE5vZGVMaXN0O1xuZXhwb3J0cy5zZXRFbGVtZW50ID0gc2V0RWxlbWVudDtcbmV4cG9ydHMudmFsaWRhdGVFbGVtZW50ID0gdmFsaWRhdGVFbGVtZW50O1xuZXhwb3J0cy5oaWRlID0gaGlkZTtcbmV4cG9ydHMuc2hvdyA9IHNob3c7XG5leHBvcnRzLmRvY3VtZW50Tm90UmVhZHlPclNTUlRlc3RpbmcgPSBkb2N1bWVudE5vdFJlYWR5T3JTU1JUZXN0aW5nO1xuZXhwb3J0cy5yZXNldEZvclRlc3RpbmcgPSByZXNldEZvclRlc3Rpbmc7XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoXCJ3YXJuaW5nXCIpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBnbG9iYWxFbGVtZW50ID0gbnVsbDtcblxuZnVuY3Rpb24gYXNzZXJ0Tm9kZUxpc3Qobm9kZUxpc3QsIHNlbGVjdG9yKSB7XG4gIGlmICghbm9kZUxpc3QgfHwgIW5vZGVMaXN0Lmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInJlYWN0LW1vZGFsOiBObyBlbGVtZW50cyB3ZXJlIGZvdW5kIGZvciBzZWxlY3RvciBcIiArIHNlbGVjdG9yICsgXCIuXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEVsZW1lbnQoZWxlbWVudCkge1xuICB2YXIgdXNlRWxlbWVudCA9IGVsZW1lbnQ7XG4gIGlmICh0eXBlb2YgdXNlRWxlbWVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodXNlRWxlbWVudCk7XG4gICAgYXNzZXJ0Tm9kZUxpc3QoZWwsIHVzZUVsZW1lbnQpO1xuICAgIHVzZUVsZW1lbnQgPSBcImxlbmd0aFwiIGluIGVsID8gZWxbMF0gOiBlbDtcbiAgfVxuICBnbG9iYWxFbGVtZW50ID0gdXNlRWxlbWVudCB8fCBnbG9iYWxFbGVtZW50O1xuICByZXR1cm4gZ2xvYmFsRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVFbGVtZW50KGFwcEVsZW1lbnQpIHtcbiAgaWYgKCFhcHBFbGVtZW50ICYmICFnbG9iYWxFbGVtZW50KSB7XG4gICAgKDAsIF93YXJuaW5nMi5kZWZhdWx0KShmYWxzZSwgW1wicmVhY3QtbW9kYWw6IEFwcCBlbGVtZW50IGlzIG5vdCBkZWZpbmVkLlwiLCBcIlBsZWFzZSB1c2UgYE1vZGFsLnNldEFwcEVsZW1lbnQoZWwpYCBvciBzZXQgYGFwcEVsZW1lbnQ9e2VsfWAuXCIsIFwiVGhpcyBpcyBuZWVkZWQgc28gc2NyZWVuIHJlYWRlcnMgZG9uJ3Qgc2VlIG1haW4gY29udGVudFwiLCBcIndoZW4gbW9kYWwgaXMgb3BlbmVkLiBJdCBpcyBub3QgcmVjb21tZW5kZWQsIGJ1dCB5b3UgY2FuIG9wdC1vdXRcIiwgXCJieSBzZXR0aW5nIGBhcmlhSGlkZUFwcD17ZmFsc2V9YC5cIl0uam9pbihcIiBcIikpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGhpZGUoYXBwRWxlbWVudCkge1xuICBpZiAodmFsaWRhdGVFbGVtZW50KGFwcEVsZW1lbnQpKSB7XG4gICAgKGFwcEVsZW1lbnQgfHwgZ2xvYmFsRWxlbWVudCkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3coYXBwRWxlbWVudCkge1xuICBpZiAodmFsaWRhdGVFbGVtZW50KGFwcEVsZW1lbnQpKSB7XG4gICAgKGFwcEVsZW1lbnQgfHwgZ2xvYmFsRWxlbWVudCkucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZG9jdW1lbnROb3RSZWFkeU9yU1NSVGVzdGluZygpIHtcbiAgZ2xvYmFsRWxlbWVudCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIHJlc2V0Rm9yVGVzdGluZygpIHtcbiAgZ2xvYmFsRWxlbWVudCA9IG51bGw7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvYXJpYUFwcEhpZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9hcmlhQXBwSGlkZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmR1bXBDbGFzc0xpc3RzID0gZHVtcENsYXNzTGlzdHM7XG52YXIgaHRtbENsYXNzTGlzdCA9IHt9O1xudmFyIGRvY0JvZHlDbGFzc0xpc3QgPSB7fTtcblxuZnVuY3Rpb24gZHVtcENsYXNzTGlzdHMoKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICB2YXIgY2xhc3NlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaHRtbFwiKVswXS5jbGFzc05hbWU7XG4gICAgdmFyIGJ1ZmZlciA9IFwiU2hvdyB0cmFja2VkIGNsYXNzZXM6XFxuXFxuXCI7XG5cbiAgICBidWZmZXIgKz0gXCI8aHRtbCAvPiAoXCIgKyBjbGFzc2VzICsgXCIpOlxcblwiO1xuICAgIGZvciAodmFyIHggaW4gaHRtbENsYXNzTGlzdCkge1xuICAgICAgYnVmZmVyICs9IFwiICBcIiArIHggKyBcIiBcIiArIGh0bWxDbGFzc0xpc3RbeF0gKyBcIlxcblwiO1xuICAgIH1cblxuICAgIGNsYXNzZXMgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgYnVmZmVyICs9IFwiXFxuXFxuZG9jLmJvZHkgKFwiICsgY2xhc3NlcyArIFwiKTpcXG5cIjtcbiAgICBmb3IgKHZhciBfeCBpbiBkb2NCb2R5Q2xhc3NMaXN0KSB7XG4gICAgICBidWZmZXIgKz0gXCIgIFwiICsgX3ggKyBcIiBcIiArIGRvY0JvZHlDbGFzc0xpc3RbX3hdICsgXCJcXG5cIjtcbiAgICB9XG5cbiAgICBidWZmZXIgKz0gXCJcXG5cIjtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coYnVmZmVyKTtcbiAgfVxufVxuXG4vKipcbiAqIFRyYWNrIHRoZSBudW1iZXIgb2YgcmVmZXJlbmNlIG9mIGEgY2xhc3MuXG4gKiBAcGFyYW0ge29iamVjdH0gcG9sbCBUaGUgcG9sbCB0byByZWNlaXZlIHRoZSByZWZlcmVuY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIFRoZSBjbGFzcyBuYW1lLlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG52YXIgaW5jcmVtZW50UmVmZXJlbmNlID0gZnVuY3Rpb24gaW5jcmVtZW50UmVmZXJlbmNlKHBvbGwsIGNsYXNzTmFtZSkge1xuICBpZiAoIXBvbGxbY2xhc3NOYW1lXSkge1xuICAgIHBvbGxbY2xhc3NOYW1lXSA9IDA7XG4gIH1cbiAgcG9sbFtjbGFzc05hbWVdICs9IDE7XG4gIHJldHVybiBjbGFzc05hbWU7XG59O1xuXG4vKipcbiAqIERyb3AgdGhlIHJlZmVyZW5jZSBvZiBhIGNsYXNzLlxuICogQHBhcmFtIHtvYmplY3R9IHBvbGwgVGhlIHBvbGwgdG8gcmVjZWl2ZSB0aGUgcmVmZXJlbmNlLlxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSBUaGUgY2xhc3MgbmFtZS5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xudmFyIGRlY3JlbWVudFJlZmVyZW5jZSA9IGZ1bmN0aW9uIGRlY3JlbWVudFJlZmVyZW5jZShwb2xsLCBjbGFzc05hbWUpIHtcbiAgaWYgKHBvbGxbY2xhc3NOYW1lXSkge1xuICAgIHBvbGxbY2xhc3NOYW1lXSAtPSAxO1xuICB9XG4gIHJldHVybiBjbGFzc05hbWU7XG59O1xuXG4vKipcbiAqIFRyYWNrIGEgY2xhc3MgYW5kIGFkZCB0byB0aGUgZ2l2ZW4gY2xhc3MgbGlzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjbGFzc0xpc3RSZWYgQSBjbGFzcyBsaXN0IG9mIGFuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gcG9sbCAgICAgICAgIFRoZSBwb2xsIHRvIGJlIHVzZWQuXG4gKiBAcGFyYW0ge0FycmF5fSAgY2xhc3NlcyAgICAgIFRoZSBsaXN0IG9mIGNsYXNzZXMgdG8gYmUgdHJhY2tlZC5cbiAqL1xudmFyIHRyYWNrQ2xhc3MgPSBmdW5jdGlvbiB0cmFja0NsYXNzKGNsYXNzTGlzdFJlZiwgcG9sbCwgY2xhc3Nlcykge1xuICBjbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgIGluY3JlbWVudFJlZmVyZW5jZShwb2xsLCBjbGFzc05hbWUpO1xuICAgIGNsYXNzTGlzdFJlZi5hZGQoY2xhc3NOYW1lKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFVudHJhY2sgYSBjbGFzcyBhbmQgcmVtb3ZlIGZyb20gdGhlIGdpdmVuIGNsYXNzIGxpc3QgaWYgdGhlIHJlZmVyZW5jZVxuICogcmVhY2hlcyAwLlxuICogQHBhcmFtIHtPYmplY3R9IGNsYXNzTGlzdFJlZiBBIGNsYXNzIGxpc3Qgb2YgYW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2xsICAgICAgICAgVGhlIHBvbGwgdG8gYmUgdXNlZC5cbiAqIEBwYXJhbSB7QXJyYXl9ICBjbGFzc2VzICAgICAgVGhlIGxpc3Qgb2YgY2xhc3NlcyB0byBiZSB1bnRyYWNrZWQuXG4gKi9cbnZhciB1bnRyYWNrQ2xhc3MgPSBmdW5jdGlvbiB1bnRyYWNrQ2xhc3MoY2xhc3NMaXN0UmVmLCBwb2xsLCBjbGFzc2VzKSB7XG4gIGNsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgZGVjcmVtZW50UmVmZXJlbmNlKHBvbGwsIGNsYXNzTmFtZSk7XG4gICAgcG9sbFtjbGFzc05hbWVdID09PSAwICYmIGNsYXNzTGlzdFJlZi5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFB1YmxpYyBpbmZlcmZhY2UgdG8gYWRkIGNsYXNzZXMgdG8gdGhlIGRvY3VtZW50LmJvZHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gYm9keUNsYXNzIFRoZSBjbGFzcyBzdHJpbmcgdG8gYmUgYWRkZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIEl0IG1heSBjb250YWluIG1vcmUgdGhlbiBvbmUgY2xhc3NcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCAnICcgYXMgc2VwYXJhdG9yLlxuICovXG52YXIgYWRkID0gZXhwb3J0cy5hZGQgPSBmdW5jdGlvbiBhZGQoZWxlbWVudCwgY2xhc3NTdHJpbmcpIHtcbiAgcmV0dXJuIHRyYWNrQ2xhc3MoZWxlbWVudC5jbGFzc0xpc3QsIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PSBcImh0bWxcIiA/IGh0bWxDbGFzc0xpc3QgOiBkb2NCb2R5Q2xhc3NMaXN0LCBjbGFzc1N0cmluZy5zcGxpdChcIiBcIikpO1xufTtcblxuLyoqXG4gKiBQdWJsaWMgaW5mZXJmYWNlIHRvIHJlbW92ZSBjbGFzc2VzIGZyb20gdGhlIGRvY3VtZW50LmJvZHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gYm9keUNsYXNzIFRoZSBjbGFzcyBzdHJpbmcgdG8gYmUgYWRkZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIEl0IG1heSBjb250YWluIG1vcmUgdGhlbiBvbmUgY2xhc3NcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCAnICcgYXMgc2VwYXJhdG9yLlxuICovXG52YXIgcmVtb3ZlID0gZXhwb3J0cy5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoZWxlbWVudCwgY2xhc3NTdHJpbmcpIHtcbiAgcmV0dXJuIHVudHJhY2tDbGFzcyhlbGVtZW50LmNsYXNzTGlzdCwgZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09IFwiaHRtbFwiID8gaHRtbENsYXNzTGlzdCA6IGRvY0JvZHlDbGFzc0xpc3QsIGNsYXNzU3RyaW5nLnNwbGl0KFwiIFwiKSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2NsYXNzTGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvY2xhc3NMaXN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5oYW5kbGVCbHVyID0gaGFuZGxlQmx1cjtcbmV4cG9ydHMuaGFuZGxlRm9jdXMgPSBoYW5kbGVGb2N1cztcbmV4cG9ydHMubWFya0ZvckZvY3VzTGF0ZXIgPSBtYXJrRm9yRm9jdXNMYXRlcjtcbmV4cG9ydHMucmV0dXJuRm9jdXMgPSByZXR1cm5Gb2N1cztcbmV4cG9ydHMucG9wV2l0aG91dEZvY3VzID0gcG9wV2l0aG91dEZvY3VzO1xuZXhwb3J0cy5zZXR1cFNjb3BlZEZvY3VzID0gc2V0dXBTY29wZWRGb2N1cztcbmV4cG9ydHMudGVhcmRvd25TY29wZWRGb2N1cyA9IHRlYXJkb3duU2NvcGVkRm9jdXM7XG5cbnZhciBfdGFiYmFibGUgPSByZXF1aXJlKFwiLi4vaGVscGVycy90YWJiYWJsZVwiKTtcblxudmFyIF90YWJiYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90YWJiYWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBmb2N1c0xhdGVyRWxlbWVudHMgPSBbXTtcbnZhciBtb2RhbEVsZW1lbnQgPSBudWxsO1xudmFyIG5lZWRUb0ZvY3VzID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGhhbmRsZUJsdXIoKSB7XG4gIG5lZWRUb0ZvY3VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9jdXMoKSB7XG4gIGlmIChuZWVkVG9Gb2N1cykge1xuICAgIG5lZWRUb0ZvY3VzID0gZmFsc2U7XG4gICAgaWYgKCFtb2RhbEVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gbmVlZCB0byBzZWUgaG93IGpRdWVyeSBzaGltcyBkb2N1bWVudC5vbignZm9jdXNpbicpIHNvIHdlIGRvbid0IG5lZWQgdGhlXG4gICAgLy8gc2V0VGltZW91dCwgZmlyZWZveCBkb2Vzbid0IHN1cHBvcnQgZm9jdXNpbiwgaWYgaXQgZGlkLCB3ZSBjb3VsZCBmb2N1c1xuICAgIC8vIHRoZSBlbGVtZW50IG91dHNpZGUgb2YgYSBzZXRUaW1lb3V0LiBTaWRlLWVmZmVjdCBvZiB0aGlzIGltcGxlbWVudGF0aW9uXG4gICAgLy8gaXMgdGhhdCB0aGUgZG9jdW1lbnQuYm9keSBnZXRzIGZvY3VzLCBhbmQgdGhlbiB3ZSBmb2N1cyBvdXIgZWxlbWVudCByaWdodFxuICAgIC8vIGFmdGVyLCBzZWVtcyBmaW5lLlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKG1vZGFsRWxlbWVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZWwgPSAoMCwgX3RhYmJhYmxlMi5kZWZhdWx0KShtb2RhbEVsZW1lbnQpWzBdIHx8IG1vZGFsRWxlbWVudDtcbiAgICAgIGVsLmZvY3VzKCk7XG4gICAgfSwgMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFya0ZvckZvY3VzTGF0ZXIoKSB7XG4gIGZvY3VzTGF0ZXJFbGVtZW50cy5wdXNoKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xufVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5mdW5jdGlvbiByZXR1cm5Gb2N1cygpIHtcbiAgdmFyIHRvRm9jdXMgPSBudWxsO1xuICB0cnkge1xuICAgIGlmIChmb2N1c0xhdGVyRWxlbWVudHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0b0ZvY3VzID0gZm9jdXNMYXRlckVsZW1lbnRzLnBvcCgpO1xuICAgICAgdG9Gb2N1cy5mb2N1cygpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oW1wiWW91IHRyaWVkIHRvIHJldHVybiBmb2N1cyB0b1wiLCB0b0ZvY3VzLCBcImJ1dCBpdCBpcyBub3QgaW4gdGhlIERPTSBhbnltb3JlXCJdLmpvaW4oXCIgXCIpKTtcbiAgfVxufVxuLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbmZ1bmN0aW9uIHBvcFdpdGhvdXRGb2N1cygpIHtcbiAgZm9jdXNMYXRlckVsZW1lbnRzLmxlbmd0aCA+IDAgJiYgZm9jdXNMYXRlckVsZW1lbnRzLnBvcCgpO1xufVxuXG5mdW5jdGlvbiBzZXR1cFNjb3BlZEZvY3VzKGVsZW1lbnQpIHtcbiAgbW9kYWxFbGVtZW50ID0gZWxlbWVudDtcblxuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgaGFuZGxlQmx1ciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBoYW5kbGVGb2N1cywgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25CbHVyXCIsIGhhbmRsZUJsdXIpO1xuICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KFwib25Gb2N1c1wiLCBoYW5kbGVGb2N1cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdGVhcmRvd25TY29wZWRGb2N1cygpIHtcbiAgbW9kYWxFbGVtZW50ID0gbnVsbDtcblxuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgaGFuZGxlQmx1cik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGhhbmRsZUZvY3VzKTtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuZGV0YWNoRXZlbnQoXCJvbkJsdXJcIiwgaGFuZGxlQmx1cik7XG4gICAgZG9jdW1lbnQuZGV0YWNoRXZlbnQoXCJvbkZvY3VzXCIsIGhhbmRsZUZvY3VzKTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2ZvY3VzTWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvZm9jdXNNYW5hZ2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jYW5Vc2VET00gPSB1bmRlZmluZWQ7XG5cbnZhciBfZXhlbnYgPSByZXF1aXJlKFwiZXhlbnZcIik7XG5cbnZhciBfZXhlbnYyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhlbnYpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRUUgPSBfZXhlbnYyLmRlZmF1bHQ7XG5cbnZhciBTYWZlSFRNTEVsZW1lbnQgPSBFRS5jYW5Vc2VET00gPyB3aW5kb3cuSFRNTEVsZW1lbnQgOiB7fTtcblxudmFyIGNhblVzZURPTSA9IGV4cG9ydHMuY2FuVXNlRE9NID0gRUUuY2FuVXNlRE9NO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTYWZlSFRNTEVsZW1lbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvc2FmZUhUTUxFbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9zYWZlSFRNTEVsZW1lbnQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzY29wZVRhYjtcblxudmFyIF90YWJiYWJsZSA9IHJlcXVpcmUoXCIuL3RhYmJhYmxlXCIpO1xuXG52YXIgX3RhYmJhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RhYmJhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gc2NvcGVUYWIobm9kZSwgZXZlbnQpIHtcbiAgdmFyIHRhYmJhYmxlID0gKDAsIF90YWJiYWJsZTIuZGVmYXVsdCkobm9kZSk7XG5cbiAgaWYgKCF0YWJiYWJsZS5sZW5ndGgpIHtcbiAgICAvLyBEbyBub3RoaW5nLCBzaW5jZSB0aGVyZSBhcmUgbm8gZWxlbWVudHMgdGhhdCBjYW4gcmVjZWl2ZSBmb2N1cy5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzaGlmdEtleSA9IGV2ZW50LnNoaWZ0S2V5O1xuICB2YXIgaGVhZCA9IHRhYmJhYmxlWzBdO1xuICB2YXIgdGFpbCA9IHRhYmJhYmxlW3RhYmJhYmxlLmxlbmd0aCAtIDFdO1xuXG4gIC8vIHByb2NlZWQgd2l0aCBkZWZhdWx0IGJyb3dzZXIgYmVoYXZpb3Igb24gdGFiLlxuICAvLyBGb2N1cyBvbiBsYXN0IGVsZW1lbnQgb24gc2hpZnQgKyB0YWIuXG4gIGlmIChub2RlID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgaWYgKCFzaGlmdEtleSkgcmV0dXJuO1xuICAgIHRhcmdldCA9IHRhaWw7XG4gIH1cblxuICB2YXIgdGFyZ2V0O1xuICBpZiAodGFpbCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAhc2hpZnRLZXkpIHtcbiAgICB0YXJnZXQgPSBoZWFkO1xuICB9XG5cbiAgaWYgKGhlYWQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgc2hpZnRLZXkpIHtcbiAgICB0YXJnZXQgPSB0YWlsO1xuICB9XG5cbiAgaWYgKHRhcmdldCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGFyZ2V0LmZvY3VzKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gU2FmYXJpIHJhZGlvIGlzc3VlLlxuICAvL1xuICAvLyBTYWZhcmkgZG9lcyBub3QgbW92ZSB0aGUgZm9jdXMgdG8gdGhlIHJhZGlvIGJ1dHRvbixcbiAgLy8gc28gd2UgbmVlZCB0byBmb3JjZSBpdCB0byByZWFsbHkgd2FsayB0aHJvdWdoIGFsbCBlbGVtZW50cy5cbiAgLy9cbiAgLy8gVGhpcyBpcyB2ZXJ5IGVycm9yIHBydW5lLCBzaW5jZSB3ZSBhcmUgdHJ5aW5nIHRvIGd1ZXNzXG4gIC8vIGlmIGl0IGlzIGEgc2FmYXJpIGJyb3dzZXIgZnJvbSB0aGUgZmlyc3Qgb2NjdXJlbmNlIGJldHdlZW5cbiAgLy8gY2hyb21lIG9yIHNhZmFyaS5cbiAgLy9cbiAgLy8gVGhlIGNocm9tZSB1c2VyIGFnZW50IGNvbnRhaW5zIHRoZSBmaXJzdCBvY3VycmVuY2VcbiAgLy8gYXMgdGhlICdjaHJvbWUvdmVyc2lvbicgYW5kIGxhdGVyIHRoZSAnc2FmYXJpL3ZlcnNpb24nLlxuICB2YXIgY2hlY2tTYWZhcmkgPSAvKFxcYkNocm9tZVxcYnxcXGJTYWZhcmlcXGIpXFwvLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICB2YXIgaXNTYWZhcmlEZXNrdG9wID0gY2hlY2tTYWZhcmkgIT0gbnVsbCAmJiBjaGVja1NhZmFyaVsxXSAhPSBcIkNocm9tZVwiICYmIC9cXGJpUG9kXFxifFxcYmlQYWRcXGIvZy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpID09IG51bGw7XG5cbiAgLy8gSWYgd2UgYXJlIG5vdCBpbiBzYWZhcmkgZGVza3RvcCwgbGV0IHRoZSBicm93c2VyIGNvbnRyb2xcbiAgLy8gdGhlIGZvY3VzXG4gIGlmICghaXNTYWZhcmlEZXNrdG9wKSByZXR1cm47XG5cbiAgdmFyIHggPSB0YWJiYWJsZS5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gIGlmICh4ID4gLTEpIHtcbiAgICB4ICs9IHNoaWZ0S2V5ID8gLTEgOiAxO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICB0YWJiYWJsZVt4XS5mb2N1cygpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9zY29wZVRhYi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvc2NvcGVUYWIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBmaW5kVGFiYmFibGVEZXNjZW5kYW50cztcbi8qIVxuICogQWRhcHRlZCBmcm9tIGpRdWVyeSBVSSBjb3JlXG4gKlxuICogaHR0cDovL2pxdWVyeXVpLmNvbVxuICpcbiAqIENvcHlyaWdodCAyMDE0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBodHRwOi8vYXBpLmpxdWVyeXVpLmNvbS9jYXRlZ29yeS91aS1jb3JlL1xuICovXG5cbnZhciB0YWJiYWJsZU5vZGUgPSAvaW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbnxvYmplY3QvO1xuXG5mdW5jdGlvbiBoaWRlc0NvbnRlbnRzKGVsZW1lbnQpIHtcbiAgdmFyIHplcm9TaXplID0gZWxlbWVudC5vZmZzZXRXaWR0aCA8PSAwICYmIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IDw9IDA7XG5cbiAgLy8gSWYgdGhlIG5vZGUgaXMgZW1wdHksIHRoaXMgaXMgZ29vZCBlbm91Z2hcbiAgaWYgKHplcm9TaXplICYmICFlbGVtZW50LmlubmVySFRNTCkgcmV0dXJuIHRydWU7XG5cbiAgLy8gT3RoZXJ3aXNlIHdlIG5lZWQgdG8gY2hlY2sgc29tZSBzdHlsZXNcbiAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gIHJldHVybiB6ZXJvU2l6ZSA/IHN0eWxlLmdldFByb3BlcnR5VmFsdWUoXCJvdmVyZmxvd1wiKSAhPT0gXCJ2aXNpYmxlXCIgOiBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKSA9PSBcIm5vbmVcIjtcbn1cblxuZnVuY3Rpb24gdmlzaWJsZShlbGVtZW50KSB7XG4gIHZhciBwYXJlbnRFbGVtZW50ID0gZWxlbWVudDtcbiAgd2hpbGUgKHBhcmVudEVsZW1lbnQpIHtcbiAgICBpZiAocGFyZW50RWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkgYnJlYWs7XG4gICAgaWYgKGhpZGVzQ29udGVudHMocGFyZW50RWxlbWVudCkpIHJldHVybiBmYWxzZTtcbiAgICBwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBmb2N1c2FibGUoZWxlbWVudCwgaXNUYWJJbmRleE5vdE5hTikge1xuICB2YXIgbm9kZU5hbWUgPSBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIHZhciByZXMgPSB0YWJiYWJsZU5vZGUudGVzdChub2RlTmFtZSkgJiYgIWVsZW1lbnQuZGlzYWJsZWQgfHwgKG5vZGVOYW1lID09PSBcImFcIiA/IGVsZW1lbnQuaHJlZiB8fCBpc1RhYkluZGV4Tm90TmFOIDogaXNUYWJJbmRleE5vdE5hTik7XG4gIHJldHVybiByZXMgJiYgdmlzaWJsZShlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gdGFiYmFibGUoZWxlbWVudCkge1xuICB2YXIgdGFiSW5kZXggPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICBpZiAodGFiSW5kZXggPT09IG51bGwpIHRhYkluZGV4ID0gdW5kZWZpbmVkO1xuICB2YXIgaXNUYWJJbmRleE5hTiA9IGlzTmFOKHRhYkluZGV4KTtcbiAgcmV0dXJuIChpc1RhYkluZGV4TmFOIHx8IHRhYkluZGV4ID49IDApICYmIGZvY3VzYWJsZShlbGVtZW50LCAhaXNUYWJJbmRleE5hTik7XG59XG5cbmZ1bmN0aW9uIGZpbmRUYWJiYWJsZURlc2NlbmRhbnRzKGVsZW1lbnQpIHtcbiAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKSwgMCkuZmlsdGVyKHRhYmJhYmxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvdGFiYmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3RhYmJhYmxlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX01vZGFsID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9Nb2RhbFwiKTtcblxudmFyIF9Nb2RhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Nb2RhbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Nb2RhbDIuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgeyBDb21wb25lbnQsIENoaWxkcmVuIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHN0b3JlU2hhcGUsIHN1YnNjcmlwdGlvblNoYXBlIH0gZnJvbSAnLi4vdXRpbHMvUHJvcFR5cGVzJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4uL3V0aWxzL3dhcm5pbmcnO1xuXG52YXIgZGlkV2FybkFib3V0UmVjZWl2aW5nU3RvcmUgPSBmYWxzZTtcbmZ1bmN0aW9uIHdhcm5BYm91dFJlY2VpdmluZ1N0b3JlKCkge1xuICBpZiAoZGlkV2FybkFib3V0UmVjZWl2aW5nU3RvcmUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZGlkV2FybkFib3V0UmVjZWl2aW5nU3RvcmUgPSB0cnVlO1xuXG4gIHdhcm5pbmcoJzxQcm92aWRlcj4gZG9lcyBub3Qgc3VwcG9ydCBjaGFuZ2luZyBgc3RvcmVgIG9uIHRoZSBmbHkuICcgKyAnSXQgaXMgbW9zdCBsaWtlbHkgdGhhdCB5b3Ugc2VlIHRoaXMgZXJyb3IgYmVjYXVzZSB5b3UgdXBkYXRlZCB0byAnICsgJ1JlZHV4IDIueCBhbmQgUmVhY3QgUmVkdXggMi54IHdoaWNoIG5vIGxvbmdlciBob3QgcmVsb2FkIHJlZHVjZXJzICcgKyAnYXV0b21hdGljYWxseS4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdGpzL3JlYWN0LXJlZHV4L3JlbGVhc2VzLycgKyAndGFnL3YyLjAuMCBmb3IgdGhlIG1pZ3JhdGlvbiBpbnN0cnVjdGlvbnMuJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm92aWRlcigpIHtcbiAgdmFyIF9Qcm92aWRlciRjaGlsZENvbnRleDtcblxuICB2YXIgc3RvcmVLZXkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICdzdG9yZSc7XG4gIHZhciBzdWJLZXkgPSBhcmd1bWVudHNbMV07XG5cbiAgdmFyIHN1YnNjcmlwdGlvbktleSA9IHN1YktleSB8fCBzdG9yZUtleSArICdTdWJzY3JpcHRpb24nO1xuXG4gIHZhciBQcm92aWRlciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKFByb3ZpZGVyLCBfQ29tcG9uZW50KTtcblxuICAgIFByb3ZpZGVyLnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgcmV0dXJuIF9yZWYgPSB7fSwgX3JlZltzdG9yZUtleV0gPSB0aGlzW3N0b3JlS2V5XSwgX3JlZltzdWJzY3JpcHRpb25LZXldID0gbnVsbCwgX3JlZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUHJvdmlkZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcm92aWRlcik7XG5cbiAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgICBfdGhpc1tzdG9yZUtleV0gPSBwcm9wcy5zdG9yZTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBQcm92aWRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIENoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfTtcblxuICAgIHJldHVybiBQcm92aWRlcjtcbiAgfShDb21wb25lbnQpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgUHJvdmlkZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG4gICAgICBpZiAodGhpc1tzdG9yZUtleV0gIT09IG5leHRQcm9wcy5zdG9yZSkge1xuICAgICAgICB3YXJuQWJvdXRSZWNlaXZpbmdTdG9yZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBQcm92aWRlci5wcm9wVHlwZXMgPSB7XG4gICAgc3RvcmU6IHN0b3JlU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmVsZW1lbnQuaXNSZXF1aXJlZFxuICB9O1xuICBQcm92aWRlci5jaGlsZENvbnRleHRUeXBlcyA9IChfUHJvdmlkZXIkY2hpbGRDb250ZXggPSB7fSwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4W3N0b3JlS2V5XSA9IHN0b3JlU2hhcGUuaXNSZXF1aXJlZCwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4W3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb25TaGFwZSwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4KTtcblxuICByZXR1cm4gUHJvdmlkZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVByb3ZpZGVyKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29tcG9uZW50cy9Qcm92aWRlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29tcG9uZW50cy9Qcm92aWRlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuaW1wb3J0IGhvaXN0U3RhdGljcyBmcm9tICdob2lzdC1ub24tcmVhY3Qtc3RhdGljcyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBTdWJzY3JpcHRpb24gZnJvbSAnLi4vdXRpbHMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHN0b3JlU2hhcGUsIHN1YnNjcmlwdGlvblNoYXBlIH0gZnJvbSAnLi4vdXRpbHMvUHJvcFR5cGVzJztcblxudmFyIGhvdFJlbG9hZGluZ1ZlcnNpb24gPSAwO1xudmFyIGR1bW15U3RhdGUgPSB7fTtcbmZ1bmN0aW9uIG5vb3AoKSB7fVxuZnVuY3Rpb24gbWFrZVNlbGVjdG9yU3RhdGVmdWwoc291cmNlU2VsZWN0b3IsIHN0b3JlKSB7XG4gIC8vIHdyYXAgdGhlIHNlbGVjdG9yIGluIGFuIG9iamVjdCB0aGF0IHRyYWNrcyBpdHMgcmVzdWx0cyBiZXR3ZWVuIHJ1bnMuXG4gIHZhciBzZWxlY3RvciA9IHtcbiAgICBydW46IGZ1bmN0aW9uIHJ1bkNvbXBvbmVudFNlbGVjdG9yKHByb3BzKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgbmV4dFByb3BzID0gc291cmNlU2VsZWN0b3Ioc3RvcmUuZ2V0U3RhdGUoKSwgcHJvcHMpO1xuICAgICAgICBpZiAobmV4dFByb3BzICE9PSBzZWxlY3Rvci5wcm9wcyB8fCBzZWxlY3Rvci5lcnJvcikge1xuICAgICAgICAgIHNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgc2VsZWN0b3IucHJvcHMgPSBuZXh0UHJvcHM7XG4gICAgICAgICAgc2VsZWN0b3IuZXJyb3IgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBzZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSB0cnVlO1xuICAgICAgICBzZWxlY3Rvci5lcnJvciA9IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gc2VsZWN0b3I7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbm5lY3RBZHZhbmNlZChcbi8qXG4gIHNlbGVjdG9yRmFjdG9yeSBpcyBhIGZ1bmMgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgcmV0dXJuaW5nIHRoZSBzZWxlY3RvciBmdW5jdGlvbiB1c2VkIHRvXG4gIGNvbXB1dGUgbmV3IHByb3BzIGZyb20gc3RhdGUsIHByb3BzLCBhbmQgZGlzcGF0Y2guIEZvciBleGFtcGxlOlxuICAgICBleHBvcnQgZGVmYXVsdCBjb25uZWN0QWR2YW5jZWQoKGRpc3BhdGNoLCBvcHRpb25zKSA9PiAoc3RhdGUsIHByb3BzKSA9PiAoe1xuICAgICAgdGhpbmc6IHN0YXRlLnRoaW5nc1twcm9wcy50aGluZ0lkXSxcbiAgICAgIHNhdmVUaGluZzogZmllbGRzID0+IGRpc3BhdGNoKGFjdGlvbkNyZWF0b3JzLnNhdmVUaGluZyhwcm9wcy50aGluZ0lkLCBmaWVsZHMpKSxcbiAgICB9KSkoWW91ckNvbXBvbmVudClcbiAgIEFjY2VzcyB0byBkaXNwYXRjaCBpcyBwcm92aWRlZCB0byB0aGUgZmFjdG9yeSBzbyBzZWxlY3RvckZhY3RvcmllcyBjYW4gYmluZCBhY3Rpb25DcmVhdG9yc1xuICBvdXRzaWRlIG9mIHRoZWlyIHNlbGVjdG9yIGFzIGFuIG9wdGltaXphdGlvbi4gT3B0aW9ucyBwYXNzZWQgdG8gY29ubmVjdEFkdmFuY2VkIGFyZSBwYXNzZWQgdG9cbiAgdGhlIHNlbGVjdG9yRmFjdG9yeSwgYWxvbmcgd2l0aCBkaXNwbGF5TmFtZSBhbmQgV3JhcHBlZENvbXBvbmVudCwgYXMgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgIE5vdGUgdGhhdCBzZWxlY3RvckZhY3RvcnkgaXMgcmVzcG9uc2libGUgZm9yIGFsbCBjYWNoaW5nL21lbW9pemF0aW9uIG9mIGluYm91bmQgYW5kIG91dGJvdW5kXG4gIHByb3BzLiBEbyBub3QgdXNlIGNvbm5lY3RBZHZhbmNlZCBkaXJlY3RseSB3aXRob3V0IG1lbW9pemluZyByZXN1bHRzIGJldHdlZW4gY2FsbHMgdG8geW91clxuICBzZWxlY3Rvciwgb3RoZXJ3aXNlIHRoZSBDb25uZWN0IGNvbXBvbmVudCB3aWxsIHJlLXJlbmRlciBvbiBldmVyeSBzdGF0ZSBvciBwcm9wcyBjaGFuZ2UuXG4qL1xuc2VsZWN0b3JGYWN0b3J5KSB7XG4gIHZhciBfY29udGV4dFR5cGVzLCBfY2hpbGRDb250ZXh0VHlwZXM7XG5cbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgX3JlZiRnZXREaXNwbGF5TmFtZSA9IF9yZWYuZ2V0RGlzcGxheU5hbWUsXG4gICAgICBnZXREaXNwbGF5TmFtZSA9IF9yZWYkZ2V0RGlzcGxheU5hbWUgPT09IHVuZGVmaW5lZCA/IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuICdDb25uZWN0QWR2YW5jZWQoJyArIG5hbWUgKyAnKSc7XG4gIH0gOiBfcmVmJGdldERpc3BsYXlOYW1lLFxuICAgICAgX3JlZiRtZXRob2ROYW1lID0gX3JlZi5tZXRob2ROYW1lLFxuICAgICAgbWV0aG9kTmFtZSA9IF9yZWYkbWV0aG9kTmFtZSA9PT0gdW5kZWZpbmVkID8gJ2Nvbm5lY3RBZHZhbmNlZCcgOiBfcmVmJG1ldGhvZE5hbWUsXG4gICAgICBfcmVmJHJlbmRlckNvdW50UHJvcCA9IF9yZWYucmVuZGVyQ291bnRQcm9wLFxuICAgICAgcmVuZGVyQ291bnRQcm9wID0gX3JlZiRyZW5kZXJDb3VudFByb3AgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IF9yZWYkcmVuZGVyQ291bnRQcm9wLFxuICAgICAgX3JlZiRzaG91bGRIYW5kbGVTdGF0ID0gX3JlZi5zaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMsXG4gICAgICBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMgPSBfcmVmJHNob3VsZEhhbmRsZVN0YXQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmJHNob3VsZEhhbmRsZVN0YXQsXG4gICAgICBfcmVmJHN0b3JlS2V5ID0gX3JlZi5zdG9yZUtleSxcbiAgICAgIHN0b3JlS2V5ID0gX3JlZiRzdG9yZUtleSA9PT0gdW5kZWZpbmVkID8gJ3N0b3JlJyA6IF9yZWYkc3RvcmVLZXksXG4gICAgICBfcmVmJHdpdGhSZWYgPSBfcmVmLndpdGhSZWYsXG4gICAgICB3aXRoUmVmID0gX3JlZiR3aXRoUmVmID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkd2l0aFJlZixcbiAgICAgIGNvbm5lY3RPcHRpb25zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnZ2V0RGlzcGxheU5hbWUnLCAnbWV0aG9kTmFtZScsICdyZW5kZXJDb3VudFByb3AnLCAnc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzJywgJ3N0b3JlS2V5JywgJ3dpdGhSZWYnXSk7XG5cbiAgdmFyIHN1YnNjcmlwdGlvbktleSA9IHN0b3JlS2V5ICsgJ1N1YnNjcmlwdGlvbic7XG4gIHZhciB2ZXJzaW9uID0gaG90UmVsb2FkaW5nVmVyc2lvbisrO1xuXG4gIHZhciBjb250ZXh0VHlwZXMgPSAoX2NvbnRleHRUeXBlcyA9IHt9LCBfY29udGV4dFR5cGVzW3N0b3JlS2V5XSA9IHN0b3JlU2hhcGUsIF9jb250ZXh0VHlwZXNbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvblNoYXBlLCBfY29udGV4dFR5cGVzKTtcbiAgdmFyIGNoaWxkQ29udGV4dFR5cGVzID0gKF9jaGlsZENvbnRleHRUeXBlcyA9IHt9LCBfY2hpbGRDb250ZXh0VHlwZXNbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvblNoYXBlLCBfY2hpbGRDb250ZXh0VHlwZXMpO1xuXG4gIHJldHVybiBmdW5jdGlvbiB3cmFwV2l0aENvbm5lY3QoV3JhcHBlZENvbXBvbmVudCkge1xuICAgIGludmFyaWFudCh0eXBlb2YgV3JhcHBlZENvbXBvbmVudCA9PSAnZnVuY3Rpb24nLCAnWW91IG11c3QgcGFzcyBhIGNvbXBvbmVudCB0byB0aGUgZnVuY3Rpb24gcmV0dXJuZWQgYnkgJyArIChtZXRob2ROYW1lICsgJy4gSW5zdGVhZCByZWNlaXZlZCAnICsgSlNPTi5zdHJpbmdpZnkoV3JhcHBlZENvbXBvbmVudCkpKTtcblxuICAgIHZhciB3cmFwcGVkQ29tcG9uZW50TmFtZSA9IFdyYXBwZWRDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgV3JhcHBlZENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnO1xuXG4gICAgdmFyIGRpc3BsYXlOYW1lID0gZ2V0RGlzcGxheU5hbWUod3JhcHBlZENvbXBvbmVudE5hbWUpO1xuXG4gICAgdmFyIHNlbGVjdG9yRmFjdG9yeU9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgY29ubmVjdE9wdGlvbnMsIHtcbiAgICAgIGdldERpc3BsYXlOYW1lOiBnZXREaXNwbGF5TmFtZSxcbiAgICAgIG1ldGhvZE5hbWU6IG1ldGhvZE5hbWUsXG4gICAgICByZW5kZXJDb3VudFByb3A6IHJlbmRlckNvdW50UHJvcCxcbiAgICAgIHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlczogc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzLFxuICAgICAgc3RvcmVLZXk6IHN0b3JlS2V5LFxuICAgICAgd2l0aFJlZjogd2l0aFJlZixcbiAgICAgIGRpc3BsYXlOYW1lOiBkaXNwbGF5TmFtZSxcbiAgICAgIHdyYXBwZWRDb21wb25lbnROYW1lOiB3cmFwcGVkQ29tcG9uZW50TmFtZSxcbiAgICAgIFdyYXBwZWRDb21wb25lbnQ6IFdyYXBwZWRDb21wb25lbnRcbiAgICB9KTtcblxuICAgIHZhciBDb25uZWN0ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICAgIF9pbmhlcml0cyhDb25uZWN0LCBfQ29tcG9uZW50KTtcblxuICAgICAgZnVuY3Rpb24gQ29ubmVjdChwcm9wcywgY29udGV4dCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29ubmVjdCk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICAgICAgX3RoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIF90aGlzLnN0YXRlID0ge307XG4gICAgICAgIF90aGlzLnJlbmRlckNvdW50ID0gMDtcbiAgICAgICAgX3RoaXMuc3RvcmUgPSBwcm9wc1tzdG9yZUtleV0gfHwgY29udGV4dFtzdG9yZUtleV07XG4gICAgICAgIF90aGlzLnByb3BzTW9kZSA9IEJvb2xlYW4ocHJvcHNbc3RvcmVLZXldKTtcbiAgICAgICAgX3RoaXMuc2V0V3JhcHBlZEluc3RhbmNlID0gX3RoaXMuc2V0V3JhcHBlZEluc3RhbmNlLmJpbmQoX3RoaXMpO1xuXG4gICAgICAgIGludmFyaWFudChfdGhpcy5zdG9yZSwgJ0NvdWxkIG5vdCBmaW5kIFwiJyArIHN0b3JlS2V5ICsgJ1wiIGluIGVpdGhlciB0aGUgY29udGV4dCBvciBwcm9wcyBvZiAnICsgKCdcIicgKyBkaXNwbGF5TmFtZSArICdcIi4gRWl0aGVyIHdyYXAgdGhlIHJvb3QgY29tcG9uZW50IGluIGEgPFByb3ZpZGVyPiwgJykgKyAoJ29yIGV4cGxpY2l0bHkgcGFzcyBcIicgKyBzdG9yZUtleSArICdcIiBhcyBhIHByb3AgdG8gXCInICsgZGlzcGxheU5hbWUgKyAnXCIuJykpO1xuXG4gICAgICAgIF90aGlzLmluaXRTZWxlY3RvcigpO1xuICAgICAgICBfdGhpcy5pbml0U3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICAgIH1cblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgICB2YXIgX3JlZjI7XG5cbiAgICAgICAgLy8gSWYgdGhpcyBjb21wb25lbnQgcmVjZWl2ZWQgc3RvcmUgZnJvbSBwcm9wcywgaXRzIHN1YnNjcmlwdGlvbiBzaG91bGQgYmUgdHJhbnNwYXJlbnRcbiAgICAgICAgLy8gdG8gYW55IGRlc2NlbmRhbnRzIHJlY2VpdmluZyBzdG9yZStzdWJzY3JpcHRpb24gZnJvbSBjb250ZXh0OyBpdCBwYXNzZXMgYWxvbmdcbiAgICAgICAgLy8gc3Vic2NyaXB0aW9uIHBhc3NlZCB0byBpdC4gT3RoZXJ3aXNlLCBpdCBzaGFkb3dzIHRoZSBwYXJlbnQgc3Vic2NyaXB0aW9uLCB3aGljaCBhbGxvd3NcbiAgICAgICAgLy8gQ29ubmVjdCB0byBjb250cm9sIG9yZGVyaW5nIG9mIG5vdGlmaWNhdGlvbnMgdG8gZmxvdyB0b3AtZG93bi5cbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRoaXMucHJvcHNNb2RlID8gbnVsbCA6IHRoaXMuc3Vic2NyaXB0aW9uO1xuICAgICAgICByZXR1cm4gX3JlZjIgPSB7fSwgX3JlZjJbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvbiB8fCB0aGlzLmNvbnRleHRbc3Vic2NyaXB0aW9uS2V5XSwgX3JlZjI7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAoIXNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcykgcmV0dXJuO1xuXG4gICAgICAgIC8vIGNvbXBvbmVudFdpbGxNb3VudCBmaXJlcyBkdXJpbmcgc2VydmVyIHNpZGUgcmVuZGVyaW5nLCBidXQgY29tcG9uZW50RGlkTW91bnQgYW5kXG4gICAgICAgIC8vIGNvbXBvbmVudFdpbGxVbm1vdW50IGRvIG5vdC4gQmVjYXVzZSBvZiB0aGlzLCB0cnlTdWJzY3JpYmUgaGFwcGVucyBkdXJpbmcgLi4uZGlkTW91bnQuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgdW5zdWJzY3JpcHRpb24gd291bGQgbmV2ZXIgdGFrZSBwbGFjZSBkdXJpbmcgU1NSLCBjYXVzaW5nIGEgbWVtb3J5IGxlYWsuXG4gICAgICAgIC8vIFRvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSBhIGNoaWxkIGNvbXBvbmVudCBtYXkgaGF2ZSB0cmlnZ2VyZWQgYSBzdGF0ZSBjaGFuZ2UgYnlcbiAgICAgICAgLy8gZGlzcGF0Y2hpbmcgYW4gYWN0aW9uIGluIGl0cyBjb21wb25lbnRXaWxsTW91bnQsIHdlIGhhdmUgdG8gcmUtcnVuIHRoZSBzZWxlY3QgYW5kIG1heWJlXG4gICAgICAgIC8vIHJlLXJlbmRlci5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udHJ5U3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKHRoaXMucHJvcHMpO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUpIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bihuZXh0UHJvcHMpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGU7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHRoaXMuc3Vic2NyaXB0aW9uLnRyeVVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzID0gbm9vcDtcbiAgICAgICAgdGhpcy5zdG9yZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuID0gbm9vcDtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmdldFdyYXBwZWRJbnN0YW5jZSA9IGZ1bmN0aW9uIGdldFdyYXBwZWRJbnN0YW5jZSgpIHtcbiAgICAgICAgaW52YXJpYW50KHdpdGhSZWYsICdUbyBhY2Nlc3MgdGhlIHdyYXBwZWQgaW5zdGFuY2UsIHlvdSBuZWVkIHRvIHNwZWNpZnkgJyArICgneyB3aXRoUmVmOiB0cnVlIH0gaW4gdGhlIG9wdGlvbnMgYXJndW1lbnQgb2YgdGhlICcgKyBtZXRob2ROYW1lICsgJygpIGNhbGwuJykpO1xuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVkSW5zdGFuY2U7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5zZXRXcmFwcGVkSW5zdGFuY2UgPSBmdW5jdGlvbiBzZXRXcmFwcGVkSW5zdGFuY2UocmVmKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZEluc3RhbmNlID0gcmVmO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuaW5pdFNlbGVjdG9yID0gZnVuY3Rpb24gaW5pdFNlbGVjdG9yKCkge1xuICAgICAgICB2YXIgc291cmNlU2VsZWN0b3IgPSBzZWxlY3RvckZhY3RvcnkodGhpcy5zdG9yZS5kaXNwYXRjaCwgc2VsZWN0b3JGYWN0b3J5T3B0aW9ucyk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBtYWtlU2VsZWN0b3JTdGF0ZWZ1bChzb3VyY2VTZWxlY3RvciwgdGhpcy5zdG9yZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKHRoaXMucHJvcHMpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuaW5pdFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uIGluaXRTdWJzY3JpcHRpb24oKSB7XG4gICAgICAgIGlmICghc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzKSByZXR1cm47XG5cbiAgICAgICAgLy8gcGFyZW50U3ViJ3Mgc291cmNlIHNob3VsZCBtYXRjaCB3aGVyZSBzdG9yZSBjYW1lIGZyb206IHByb3BzIHZzLiBjb250ZXh0LiBBIGNvbXBvbmVudFxuICAgICAgICAvLyBjb25uZWN0ZWQgdG8gdGhlIHN0b3JlIHZpYSBwcm9wcyBzaG91bGRuJ3QgdXNlIHN1YnNjcmlwdGlvbiBmcm9tIGNvbnRleHQsIG9yIHZpY2UgdmVyc2EuXG4gICAgICAgIHZhciBwYXJlbnRTdWIgPSAodGhpcy5wcm9wc01vZGUgPyB0aGlzLnByb3BzIDogdGhpcy5jb250ZXh0KVtzdWJzY3JpcHRpb25LZXldO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24odGhpcy5zdG9yZSwgcGFyZW50U3ViLCB0aGlzLm9uU3RhdGVDaGFuZ2UuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gYG5vdGlmeU5lc3RlZFN1YnNgIGlzIGR1cGxpY2F0ZWQgdG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSBjb21wb25lbnQgaXMgIHVubW91bnRlZCBpblxuICAgICAgICAvLyB0aGUgbWlkZGxlIG9mIHRoZSBub3RpZmljYXRpb24gbG9vcCwgd2hlcmUgYHRoaXMuc3Vic2NyaXB0aW9uYCB3aWxsIHRoZW4gYmUgbnVsbC4gQW5cbiAgICAgICAgLy8gZXh0cmEgbnVsbCBjaGVjayBldmVyeSBjaGFuZ2UgY2FuIGJlIGF2b2lkZWQgYnkgY29weWluZyB0aGUgbWV0aG9kIG9udG8gYHRoaXNgIGFuZCB0aGVuXG4gICAgICAgIC8vIHJlcGxhY2luZyBpdCB3aXRoIGEgbm8tb3Agb24gdW5tb3VudC4gVGhpcyBjYW4gcHJvYmFibHkgYmUgYXZvaWRlZCBpZiBTdWJzY3JpcHRpb24nc1xuICAgICAgICAvLyBsaXN0ZW5lcnMgbG9naWMgaXMgY2hhbmdlZCB0byBub3QgY2FsbCBsaXN0ZW5lcnMgdGhhdCBoYXZlIGJlZW4gdW5zdWJzY3JpYmVkIGluIHRoZVxuICAgICAgICAvLyBtaWRkbGUgb2YgdGhlIG5vdGlmaWNhdGlvbiBsb29wLlxuICAgICAgICB0aGlzLm5vdGlmeU5lc3RlZFN1YnMgPSB0aGlzLnN1YnNjcmlwdGlvbi5ub3RpZnlOZXN0ZWRTdWJzLmJpbmQodGhpcy5zdWJzY3JpcHRpb24pO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUub25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uIG9uU3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKHRoaXMucHJvcHMpO1xuXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUpIHtcbiAgICAgICAgICB0aGlzLm5vdGlmeU5lc3RlZFN1YnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSA9IHRoaXMubm90aWZ5TmVzdGVkU3Vic09uQ29tcG9uZW50RGlkVXBkYXRlO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoZHVtbXlTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLm5vdGlmeU5lc3RlZFN1YnNPbkNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIG5vdGlmeU5lc3RlZFN1YnNPbkNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgLy8gYGNvbXBvbmVudERpZFVwZGF0ZWAgaXMgY29uZGl0aW9uYWxseSBpbXBsZW1lbnRlZCB3aGVuIGBvblN0YXRlQ2hhbmdlYCBkZXRlcm1pbmVzIGl0XG4gICAgICAgIC8vIG5lZWRzIHRvIG5vdGlmeSBuZXN0ZWQgc3Vicy4gT25jZSBjYWxsZWQsIGl0IHVuaW1wbGVtZW50cyBpdHNlbGYgdW50aWwgZnVydGhlciBzdGF0ZVxuICAgICAgICAvLyBjaGFuZ2VzIG9jY3VyLiBEb2luZyBpdCB0aGlzIHdheSB2cyBoYXZpbmcgYSBwZXJtYW5lbnQgYGNvbXBvbmVudERpZFVwZGF0ZWAgdGhhdCBkb2VzXG4gICAgICAgIC8vIGEgYm9vbGVhbiBjaGVjayBldmVyeSB0aW1lIGF2b2lkcyBhbiBleHRyYSBtZXRob2QgY2FsbCBtb3N0IG9mIHRoZSB0aW1lLCByZXN1bHRpbmdcbiAgICAgICAgLy8gaW4gc29tZSBwZXJmIGJvb3N0LlxuICAgICAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzKCk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5pc1N1YnNjcmliZWQgPSBmdW5jdGlvbiBpc1N1YnNjcmliZWQoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuc3Vic2NyaXB0aW9uKSAmJiB0aGlzLnN1YnNjcmlwdGlvbi5pc1N1YnNjcmliZWQoKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmFkZEV4dHJhUHJvcHMgPSBmdW5jdGlvbiBhZGRFeHRyYVByb3BzKHByb3BzKSB7XG4gICAgICAgIGlmICghd2l0aFJlZiAmJiAhcmVuZGVyQ291bnRQcm9wICYmICEodGhpcy5wcm9wc01vZGUgJiYgdGhpcy5zdWJzY3JpcHRpb24pKSByZXR1cm4gcHJvcHM7XG4gICAgICAgIC8vIG1ha2UgYSBzaGFsbG93IGNvcHkgc28gdGhhdCBmaWVsZHMgYWRkZWQgZG9uJ3QgbGVhayB0byB0aGUgb3JpZ2luYWwgc2VsZWN0b3IuXG4gICAgICAgIC8vIHRoaXMgaXMgZXNwZWNpYWxseSBpbXBvcnRhbnQgZm9yICdyZWYnIHNpbmNlIHRoYXQncyBhIHJlZmVyZW5jZSBiYWNrIHRvIHRoZSBjb21wb25lbnRcbiAgICAgICAgLy8gaW5zdGFuY2UuIGEgc2luZ2xldG9uIG1lbW9pemVkIHNlbGVjdG9yIHdvdWxkIHRoZW4gYmUgaG9sZGluZyBhIHJlZmVyZW5jZSB0byB0aGVcbiAgICAgICAgLy8gaW5zdGFuY2UsIHByZXZlbnRpbmcgdGhlIGluc3RhbmNlIGZyb20gYmVpbmcgZ2FyYmFnZSBjb2xsZWN0ZWQsIGFuZCB0aGF0IHdvdWxkIGJlIGJhZFxuICAgICAgICB2YXIgd2l0aEV4dHJhcyA9IF9leHRlbmRzKHt9LCBwcm9wcyk7XG4gICAgICAgIGlmICh3aXRoUmVmKSB3aXRoRXh0cmFzLnJlZiA9IHRoaXMuc2V0V3JhcHBlZEluc3RhbmNlO1xuICAgICAgICBpZiAocmVuZGVyQ291bnRQcm9wKSB3aXRoRXh0cmFzW3JlbmRlckNvdW50UHJvcF0gPSB0aGlzLnJlbmRlckNvdW50Kys7XG4gICAgICAgIGlmICh0aGlzLnByb3BzTW9kZSAmJiB0aGlzLnN1YnNjcmlwdGlvbikgd2l0aEV4dHJhc1tzdWJzY3JpcHRpb25LZXldID0gdGhpcy5zdWJzY3JpcHRpb247XG4gICAgICAgIHJldHVybiB3aXRoRXh0cmFzO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yO1xuICAgICAgICBzZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmYWxzZTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IuZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBzZWxlY3Rvci5lcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChXcmFwcGVkQ29tcG9uZW50LCB0aGlzLmFkZEV4dHJhUHJvcHMoc2VsZWN0b3IucHJvcHMpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbm5lY3Q7XG4gICAgfShDb21wb25lbnQpO1xuXG4gICAgQ29ubmVjdC5XcmFwcGVkQ29tcG9uZW50ID0gV3JhcHBlZENvbXBvbmVudDtcbiAgICBDb25uZWN0LmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gICAgQ29ubmVjdC5jaGlsZENvbnRleHRUeXBlcyA9IGNoaWxkQ29udGV4dFR5cGVzO1xuICAgIENvbm5lY3QuY29udGV4dFR5cGVzID0gY29udGV4dFR5cGVzO1xuICAgIENvbm5lY3QucHJvcFR5cGVzID0gY29udGV4dFR5cGVzO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVXBkYXRlKCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAvLyBXZSBhcmUgaG90IHJlbG9hZGluZyFcbiAgICAgICAgaWYgKHRoaXMudmVyc2lvbiAhPT0gdmVyc2lvbikge1xuICAgICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgICAgdGhpcy5pbml0U2VsZWN0b3IoKTtcblxuICAgICAgICAgIC8vIElmIGFueSBjb25uZWN0ZWQgZGVzY2VuZGFudHMgZG9uJ3QgaG90IHJlbG9hZCAoYW5kIHJlc3Vic2NyaWJlIGluIHRoZSBwcm9jZXNzKSwgdGhlaXJcbiAgICAgICAgICAvLyBsaXN0ZW5lcnMgd2lsbCBiZSBsb3N0IHdoZW4gd2UgdW5zdWJzY3JpYmUuIFVuZm9ydHVuYXRlbHksIGJ5IGNvcHlpbmcgb3ZlciBhbGxcbiAgICAgICAgICAvLyBsaXN0ZW5lcnMsIHRoaXMgZG9lcyBtZWFuIHRoYXQgdGhlIG9sZCB2ZXJzaW9ucyBvZiBjb25uZWN0ZWQgZGVzY2VuZGFudHMgd2lsbCBzdGlsbCBiZVxuICAgICAgICAgIC8vIG5vdGlmaWVkIG9mIHN0YXRlIGNoYW5nZXM7IGhvd2V2ZXIsIHRoZWlyIG9uU3RhdGVDaGFuZ2UgZnVuY3Rpb24gaXMgYSBuby1vcCBzbyB0aGlzXG4gICAgICAgICAgLy8gaXNuJ3QgYSBodWdlIGRlYWwuXG4gICAgICAgICAgdmFyIG9sZExpc3RlbmVycyA9IFtdO1xuXG4gICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBvbGRMaXN0ZW5lcnMgPSB0aGlzLnN1YnNjcmlwdGlvbi5saXN0ZW5lcnMuZ2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi50cnlVbnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmluaXRTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICBpZiAoc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi50cnlTdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIG9sZExpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLnN1YnNjcmlwdGlvbi5saXN0ZW5lcnMuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaG9pc3RTdGF0aWNzKENvbm5lY3QsIFdyYXBwZWRDb21wb25lbnQpO1xuICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2NvbXBvbmVudHMvY29ubmVjdEFkdmFuY2VkLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmltcG9ydCBjb25uZWN0QWR2YW5jZWQgZnJvbSAnLi4vY29tcG9uZW50cy9jb25uZWN0QWR2YW5jZWQnO1xuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlscy9zaGFsbG93RXF1YWwnO1xuaW1wb3J0IGRlZmF1bHRNYXBEaXNwYXRjaFRvUHJvcHNGYWN0b3JpZXMgZnJvbSAnLi9tYXBEaXNwYXRjaFRvUHJvcHMnO1xuaW1wb3J0IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgZnJvbSAnLi9tYXBTdGF0ZVRvUHJvcHMnO1xuaW1wb3J0IGRlZmF1bHRNZXJnZVByb3BzRmFjdG9yaWVzIGZyb20gJy4vbWVyZ2VQcm9wcyc7XG5pbXBvcnQgZGVmYXVsdFNlbGVjdG9yRmFjdG9yeSBmcm9tICcuL3NlbGVjdG9yRmFjdG9yeSc7XG5cbi8qXG4gIGNvbm5lY3QgaXMgYSBmYWNhZGUgb3ZlciBjb25uZWN0QWR2YW5jZWQuIEl0IHR1cm5zIGl0cyBhcmdzIGludG8gYSBjb21wYXRpYmxlXG4gIHNlbGVjdG9yRmFjdG9yeSwgd2hpY2ggaGFzIHRoZSBzaWduYXR1cmU6XG5cbiAgICAoZGlzcGF0Y2gsIG9wdGlvbnMpID0+IChuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykgPT4gbmV4dEZpbmFsUHJvcHNcbiAgXG4gIGNvbm5lY3QgcGFzc2VzIGl0cyBhcmdzIHRvIGNvbm5lY3RBZHZhbmNlZCBhcyBvcHRpb25zLCB3aGljaCB3aWxsIGluIHR1cm4gcGFzcyB0aGVtIHRvXG4gIHNlbGVjdG9yRmFjdG9yeSBlYWNoIHRpbWUgYSBDb25uZWN0IGNvbXBvbmVudCBpbnN0YW5jZSBpcyBpbnN0YW50aWF0ZWQgb3IgaG90IHJlbG9hZGVkLlxuXG4gIHNlbGVjdG9yRmFjdG9yeSByZXR1cm5zIGEgZmluYWwgcHJvcHMgc2VsZWN0b3IgZnJvbSBpdHMgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLCBtZXJnZVByb3BzLFxuICBtZXJnZVByb3BzRmFjdG9yaWVzLCBhbmQgcHVyZSBhcmdzLlxuXG4gIFRoZSByZXN1bHRpbmcgZmluYWwgcHJvcHMgc2VsZWN0b3IgaXMgY2FsbGVkIGJ5IHRoZSBDb25uZWN0IGNvbXBvbmVudCBpbnN0YW5jZSB3aGVuZXZlclxuICBpdCByZWNlaXZlcyBuZXcgcHJvcHMgb3Igc3RvcmUgc3RhdGUuXG4gKi9cblxuZnVuY3Rpb24gbWF0Y2goYXJnLCBmYWN0b3JpZXMsIG5hbWUpIHtcbiAgZm9yICh2YXIgaSA9IGZhY3Rvcmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciByZXN1bHQgPSBmYWN0b3JpZXNbaV0oYXJnKTtcbiAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCwgb3B0aW9ucykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSBvZiB0eXBlICcgKyB0eXBlb2YgYXJnICsgJyBmb3IgJyArIG5hbWUgKyAnIGFyZ3VtZW50IHdoZW4gY29ubmVjdGluZyBjb21wb25lbnQgJyArIG9wdGlvbnMud3JhcHBlZENvbXBvbmVudE5hbWUgKyAnLicpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHJpY3RFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhID09PSBiO1xufVxuXG4vLyBjcmVhdGVDb25uZWN0IHdpdGggZGVmYXVsdCBhcmdzIGJ1aWxkcyB0aGUgJ29mZmljaWFsJyBjb25uZWN0IGJlaGF2aW9yLiBDYWxsaW5nIGl0IHdpdGhcbi8vIGRpZmZlcmVudCBvcHRpb25zIG9wZW5zIHVwIHNvbWUgdGVzdGluZyBhbmQgZXh0ZW5zaWJpbGl0eSBzY2VuYXJpb3NcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb25uZWN0KCkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICBfcmVmJGNvbm5lY3RIT0MgPSBfcmVmLmNvbm5lY3RIT0MsXG4gICAgICBjb25uZWN0SE9DID0gX3JlZiRjb25uZWN0SE9DID09PSB1bmRlZmluZWQgPyBjb25uZWN0QWR2YW5jZWQgOiBfcmVmJGNvbm5lY3RIT0MsXG4gICAgICBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YgPSBfcmVmLm1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWFwU3RhdGVUb1Byb3BzRiA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdE1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyA6IF9yZWYkbWFwU3RhdGVUb1Byb3BzRixcbiAgICAgIF9yZWYkbWFwRGlzcGF0Y2hUb1BybyA9IF9yZWYubWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLFxuICAgICAgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzID0gX3JlZiRtYXBEaXNwYXRjaFRvUHJvID09PSB1bmRlZmluZWQgPyBkZWZhdWx0TWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzIDogX3JlZiRtYXBEaXNwYXRjaFRvUHJvLFxuICAgICAgX3JlZiRtZXJnZVByb3BzRmFjdG9yID0gX3JlZi5tZXJnZVByb3BzRmFjdG9yaWVzLFxuICAgICAgbWVyZ2VQcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWVyZ2VQcm9wc0ZhY3RvciA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdE1lcmdlUHJvcHNGYWN0b3JpZXMgOiBfcmVmJG1lcmdlUHJvcHNGYWN0b3IsXG4gICAgICBfcmVmJHNlbGVjdG9yRmFjdG9yeSA9IF9yZWYuc2VsZWN0b3JGYWN0b3J5LFxuICAgICAgc2VsZWN0b3JGYWN0b3J5ID0gX3JlZiRzZWxlY3RvckZhY3RvcnkgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRTZWxlY3RvckZhY3RvcnkgOiBfcmVmJHNlbGVjdG9yRmFjdG9yeTtcblxuICByZXR1cm4gZnVuY3Rpb24gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcykge1xuICAgIHZhciBfcmVmMiA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDoge30sXG4gICAgICAgIF9yZWYyJHB1cmUgPSBfcmVmMi5wdXJlLFxuICAgICAgICBwdXJlID0gX3JlZjIkcHVyZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYyJHB1cmUsXG4gICAgICAgIF9yZWYyJGFyZVN0YXRlc0VxdWFsID0gX3JlZjIuYXJlU3RhdGVzRXF1YWwsXG4gICAgICAgIGFyZVN0YXRlc0VxdWFsID0gX3JlZjIkYXJlU3RhdGVzRXF1YWwgPT09IHVuZGVmaW5lZCA/IHN0cmljdEVxdWFsIDogX3JlZjIkYXJlU3RhdGVzRXF1YWwsXG4gICAgICAgIF9yZWYyJGFyZU93blByb3BzRXF1YSA9IF9yZWYyLmFyZU93blByb3BzRXF1YWwsXG4gICAgICAgIGFyZU93blByb3BzRXF1YWwgPSBfcmVmMiRhcmVPd25Qcm9wc0VxdWEgPT09IHVuZGVmaW5lZCA/IHNoYWxsb3dFcXVhbCA6IF9yZWYyJGFyZU93blByb3BzRXF1YSxcbiAgICAgICAgX3JlZjIkYXJlU3RhdGVQcm9wc0VxID0gX3JlZjIuYXJlU3RhdGVQcm9wc0VxdWFsLFxuICAgICAgICBhcmVTdGF0ZVByb3BzRXF1YWwgPSBfcmVmMiRhcmVTdGF0ZVByb3BzRXEgPT09IHVuZGVmaW5lZCA/IHNoYWxsb3dFcXVhbCA6IF9yZWYyJGFyZVN0YXRlUHJvcHNFcSxcbiAgICAgICAgX3JlZjIkYXJlTWVyZ2VkUHJvcHNFID0gX3JlZjIuYXJlTWVyZ2VkUHJvcHNFcXVhbCxcbiAgICAgICAgYXJlTWVyZ2VkUHJvcHNFcXVhbCA9IF9yZWYyJGFyZU1lcmdlZFByb3BzRSA9PT0gdW5kZWZpbmVkID8gc2hhbGxvd0VxdWFsIDogX3JlZjIkYXJlTWVyZ2VkUHJvcHNFLFxuICAgICAgICBleHRyYU9wdGlvbnMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZjIsIFsncHVyZScsICdhcmVTdGF0ZXNFcXVhbCcsICdhcmVPd25Qcm9wc0VxdWFsJywgJ2FyZVN0YXRlUHJvcHNFcXVhbCcsICdhcmVNZXJnZWRQcm9wc0VxdWFsJ10pO1xuXG4gICAgdmFyIGluaXRNYXBTdGF0ZVRvUHJvcHMgPSBtYXRjaChtYXBTdGF0ZVRvUHJvcHMsIG1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcywgJ21hcFN0YXRlVG9Qcm9wcycpO1xuICAgIHZhciBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzID0gbWF0Y2gobWFwRGlzcGF0Y2hUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHNGYWN0b3JpZXMsICdtYXBEaXNwYXRjaFRvUHJvcHMnKTtcbiAgICB2YXIgaW5pdE1lcmdlUHJvcHMgPSBtYXRjaChtZXJnZVByb3BzLCBtZXJnZVByb3BzRmFjdG9yaWVzLCAnbWVyZ2VQcm9wcycpO1xuXG4gICAgcmV0dXJuIGNvbm5lY3RIT0Moc2VsZWN0b3JGYWN0b3J5LCBfZXh0ZW5kcyh7XG4gICAgICAvLyB1c2VkIGluIGVycm9yIG1lc3NhZ2VzXG4gICAgICBtZXRob2ROYW1lOiAnY29ubmVjdCcsXG5cbiAgICAgIC8vIHVzZWQgdG8gY29tcHV0ZSBDb25uZWN0J3MgZGlzcGxheU5hbWUgZnJvbSB0aGUgd3JhcHBlZCBjb21wb25lbnQncyBkaXNwbGF5TmFtZS5cbiAgICAgIGdldERpc3BsYXlOYW1lOiBmdW5jdGlvbiBnZXREaXNwbGF5TmFtZShuYW1lKSB7XG4gICAgICAgIHJldHVybiAnQ29ubmVjdCgnICsgbmFtZSArICcpJztcbiAgICAgIH0sXG5cbiAgICAgIC8vIGlmIG1hcFN0YXRlVG9Qcm9wcyBpcyBmYWxzeSwgdGhlIENvbm5lY3QgY29tcG9uZW50IGRvZXNuJ3Qgc3Vic2NyaWJlIHRvIHN0b3JlIHN0YXRlIGNoYW5nZXNcbiAgICAgIHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlczogQm9vbGVhbihtYXBTdGF0ZVRvUHJvcHMpLFxuXG4gICAgICAvLyBwYXNzZWQgdGhyb3VnaCB0byBzZWxlY3RvckZhY3RvcnlcbiAgICAgIGluaXRNYXBTdGF0ZVRvUHJvcHM6IGluaXRNYXBTdGF0ZVRvUHJvcHMsXG4gICAgICBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzOiBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzLFxuICAgICAgaW5pdE1lcmdlUHJvcHM6IGluaXRNZXJnZVByb3BzLFxuICAgICAgcHVyZTogcHVyZSxcbiAgICAgIGFyZVN0YXRlc0VxdWFsOiBhcmVTdGF0ZXNFcXVhbCxcbiAgICAgIGFyZU93blByb3BzRXF1YWw6IGFyZU93blByb3BzRXF1YWwsXG4gICAgICBhcmVTdGF0ZVByb3BzRXF1YWw6IGFyZVN0YXRlUHJvcHNFcXVhbCxcbiAgICAgIGFyZU1lcmdlZFByb3BzRXF1YWw6IGFyZU1lcmdlZFByb3BzRXF1YWxcblxuICAgIH0sIGV4dHJhT3B0aW9ucykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb25uZWN0KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9jb25uZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L2Nvbm5lY3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgd3JhcE1hcFRvUHJvcHNDb25zdGFudCwgd3JhcE1hcFRvUHJvcHNGdW5jIH0gZnJvbSAnLi93cmFwTWFwVG9Qcm9wcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNGdW5jdGlvbihtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtYXBEaXNwYXRjaFRvUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwRGlzcGF0Y2hUb1Byb3BzLCAnbWFwRGlzcGF0Y2hUb1Byb3BzJykgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNNaXNzaW5nKG1hcERpc3BhdGNoVG9Qcm9wcykge1xuICByZXR1cm4gIW1hcERpc3BhdGNoVG9Qcm9wcyA/IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIHsgZGlzcGF0Y2g6IGRpc3BhdGNoIH07XG4gIH0pIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzT2JqZWN0KG1hcERpc3BhdGNoVG9Qcm9wcykge1xuICByZXR1cm4gbWFwRGlzcGF0Y2hUb1Byb3BzICYmIHR5cGVvZiBtYXBEaXNwYXRjaFRvUHJvcHMgPT09ICdvYmplY3QnID8gd3JhcE1hcFRvUHJvcHNDb25zdGFudChmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKG1hcERpc3BhdGNoVG9Qcm9wcywgZGlzcGF0Y2gpO1xuICB9KSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW3doZW5NYXBEaXNwYXRjaFRvUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNNaXNzaW5nLCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNPYmplY3RdO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWFwRGlzcGF0Y2hUb1Byb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21hcERpc3BhdGNoVG9Qcm9wcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgeyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50LCB3cmFwTWFwVG9Qcm9wc0Z1bmMgfSBmcm9tICcuL3dyYXBNYXBUb1Byb3BzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHdoZW5NYXBTdGF0ZVRvUHJvcHNJc0Z1bmN0aW9uKG1hcFN0YXRlVG9Qcm9wcykge1xuICByZXR1cm4gdHlwZW9mIG1hcFN0YXRlVG9Qcm9wcyA9PT0gJ2Z1bmN0aW9uJyA/IHdyYXBNYXBUb1Byb3BzRnVuYyhtYXBTdGF0ZVRvUHJvcHMsICdtYXBTdGF0ZVRvUHJvcHMnKSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdoZW5NYXBTdGF0ZVRvUHJvcHNJc01pc3NpbmcobWFwU3RhdGVUb1Byb3BzKSB7XG4gIHJldHVybiAhbWFwU3RhdGVUb1Byb3BzID8gd3JhcE1hcFRvUHJvcHNDb25zdGFudChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9KSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW3doZW5NYXBTdGF0ZVRvUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWFwU3RhdGVUb1Byb3BzSXNNaXNzaW5nXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21hcFN0YXRlVG9Qcm9wcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tYXBTdGF0ZVRvUHJvcHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuaW1wb3J0IHZlcmlmeVBsYWluT2JqZWN0IGZyb20gJy4uL3V0aWxzL3ZlcmlmeVBsYWluT2JqZWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRNZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSB7XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgb3duUHJvcHMsIHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcE1lcmdlUHJvcHNGdW5jKG1lcmdlUHJvcHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGluaXRNZXJnZVByb3BzUHJveHkoZGlzcGF0Y2gsIF9yZWYpIHtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSBfcmVmLmRpc3BsYXlOYW1lLFxuICAgICAgICBwdXJlID0gX3JlZi5wdXJlLFxuICAgICAgICBhcmVNZXJnZWRQcm9wc0VxdWFsID0gX3JlZi5hcmVNZXJnZWRQcm9wc0VxdWFsO1xuXG4gICAgdmFyIGhhc1J1bk9uY2UgPSBmYWxzZTtcbiAgICB2YXIgbWVyZ2VkUHJvcHMgPSB2b2lkIDA7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VQcm9wc1Byb3h5KHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSB7XG4gICAgICB2YXIgbmV4dE1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG5cbiAgICAgIGlmIChoYXNSdW5PbmNlKSB7XG4gICAgICAgIGlmICghcHVyZSB8fCAhYXJlTWVyZ2VkUHJvcHNFcXVhbChuZXh0TWVyZ2VkUHJvcHMsIG1lcmdlZFByb3BzKSkgbWVyZ2VkUHJvcHMgPSBuZXh0TWVyZ2VkUHJvcHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYXNSdW5PbmNlID0gdHJ1ZTtcbiAgICAgICAgbWVyZ2VkUHJvcHMgPSBuZXh0TWVyZ2VkUHJvcHM7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHZlcmlmeVBsYWluT2JqZWN0KG1lcmdlZFByb3BzLCBkaXNwbGF5TmFtZSwgJ21lcmdlUHJvcHMnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWVyZ2VQcm9wc0lzRnVuY3Rpb24obWVyZ2VQcm9wcykge1xuICByZXR1cm4gdHlwZW9mIG1lcmdlUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWVyZ2VQcm9wc0Z1bmMobWVyZ2VQcm9wcykgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWVyZ2VQcm9wc0lzT21pdHRlZChtZXJnZVByb3BzKSB7XG4gIHJldHVybiAhbWVyZ2VQcm9wcyA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1lcmdlUHJvcHM7XG4gIH0gOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFt3aGVuTWVyZ2VQcm9wc0lzRnVuY3Rpb24sIHdoZW5NZXJnZVByb3BzSXNPbWl0dGVkXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21lcmdlUHJvcHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWVyZ2VQcm9wcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmltcG9ydCB2ZXJpZnlTdWJzZWxlY3RvcnMgZnJvbSAnLi92ZXJpZnlTdWJzZWxlY3RvcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1wdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGltcHVyZUZpbmFsUHJvcHNTZWxlY3RvcihzdGF0ZSwgb3duUHJvcHMpIHtcbiAgICByZXR1cm4gbWVyZ2VQcm9wcyhtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKSwgbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyksIG93blByb3BzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1cmVGaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBkaXNwYXRjaCwgX3JlZikge1xuICB2YXIgYXJlU3RhdGVzRXF1YWwgPSBfcmVmLmFyZVN0YXRlc0VxdWFsLFxuICAgICAgYXJlT3duUHJvcHNFcXVhbCA9IF9yZWYuYXJlT3duUHJvcHNFcXVhbCxcbiAgICAgIGFyZVN0YXRlUHJvcHNFcXVhbCA9IF9yZWYuYXJlU3RhdGVQcm9wc0VxdWFsO1xuXG4gIHZhciBoYXNSdW5BdExlYXN0T25jZSA9IGZhbHNlO1xuICB2YXIgc3RhdGUgPSB2b2lkIDA7XG4gIHZhciBvd25Qcm9wcyA9IHZvaWQgMDtcbiAgdmFyIHN0YXRlUHJvcHMgPSB2b2lkIDA7XG4gIHZhciBkaXNwYXRjaFByb3BzID0gdm9pZCAwO1xuICB2YXIgbWVyZ2VkUHJvcHMgPSB2b2lkIDA7XG5cbiAgZnVuY3Rpb24gaGFuZGxlRmlyc3RDYWxsKGZpcnN0U3RhdGUsIGZpcnN0T3duUHJvcHMpIHtcbiAgICBzdGF0ZSA9IGZpcnN0U3RhdGU7XG4gICAgb3duUHJvcHMgPSBmaXJzdE93blByb3BzO1xuICAgIHN0YXRlUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKTtcbiAgICBkaXNwYXRjaFByb3BzID0gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG4gICAgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcbiAgICBoYXNSdW5BdExlYXN0T25jZSA9IHRydWU7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTmV3UHJvcHNBbmROZXdTdGF0ZSgpIHtcbiAgICBzdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG5cbiAgICBpZiAobWFwRGlzcGF0Y2hUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSBkaXNwYXRjaFByb3BzID0gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU5ld1Byb3BzKCkge1xuICAgIGlmIChtYXBTdGF0ZVRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMpIHN0YXRlUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKTtcblxuICAgIGlmIChtYXBEaXNwYXRjaFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMpIGRpc3BhdGNoUHJvcHMgPSBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG93blByb3BzKTtcblxuICAgIG1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTmV3U3RhdGUoKSB7XG4gICAgdmFyIG5leHRTdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG4gICAgdmFyIHN0YXRlUHJvcHNDaGFuZ2VkID0gIWFyZVN0YXRlUHJvcHNFcXVhbChuZXh0U3RhdGVQcm9wcywgc3RhdGVQcm9wcyk7XG4gICAgc3RhdGVQcm9wcyA9IG5leHRTdGF0ZVByb3BzO1xuXG4gICAgaWYgKHN0YXRlUHJvcHNDaGFuZ2VkKSBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuXG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlU3Vic2VxdWVudENhbGxzKG5leHRTdGF0ZSwgbmV4dE93blByb3BzKSB7XG4gICAgdmFyIHByb3BzQ2hhbmdlZCA9ICFhcmVPd25Qcm9wc0VxdWFsKG5leHRPd25Qcm9wcywgb3duUHJvcHMpO1xuICAgIHZhciBzdGF0ZUNoYW5nZWQgPSAhYXJlU3RhdGVzRXF1YWwobmV4dFN0YXRlLCBzdGF0ZSk7XG4gICAgc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgb3duUHJvcHMgPSBuZXh0T3duUHJvcHM7XG5cbiAgICBpZiAocHJvcHNDaGFuZ2VkICYmIHN0YXRlQ2hhbmdlZCkgcmV0dXJuIGhhbmRsZU5ld1Byb3BzQW5kTmV3U3RhdGUoKTtcbiAgICBpZiAocHJvcHNDaGFuZ2VkKSByZXR1cm4gaGFuZGxlTmV3UHJvcHMoKTtcbiAgICBpZiAoc3RhdGVDaGFuZ2VkKSByZXR1cm4gaGFuZGxlTmV3U3RhdGUoKTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gcHVyZUZpbmFsUHJvcHNTZWxlY3RvcihuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykge1xuICAgIHJldHVybiBoYXNSdW5BdExlYXN0T25jZSA/IGhhbmRsZVN1YnNlcXVlbnRDYWxscyhuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykgOiBoYW5kbGVGaXJzdENhbGwobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpO1xuICB9O1xufVxuXG4vLyBUT0RPOiBBZGQgbW9yZSBjb21tZW50c1xuXG4vLyBJZiBwdXJlIGlzIHRydWUsIHRoZSBzZWxlY3RvciByZXR1cm5lZCBieSBzZWxlY3RvckZhY3Rvcnkgd2lsbCBtZW1vaXplIGl0cyByZXN1bHRzLFxuLy8gYWxsb3dpbmcgY29ubmVjdEFkdmFuY2VkJ3Mgc2hvdWxkQ29tcG9uZW50VXBkYXRlIHRvIHJldHVybiBmYWxzZSBpZiBmaW5hbFxuLy8gcHJvcHMgaGF2ZSBub3QgY2hhbmdlZC4gSWYgZmFsc2UsIHRoZSBzZWxlY3RvciB3aWxsIGFsd2F5cyByZXR1cm4gYSBuZXdcbi8vIG9iamVjdCBhbmQgc2hvdWxkQ29tcG9uZW50VXBkYXRlIHdpbGwgYWx3YXlzIHJldHVybiB0cnVlLlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5KGRpc3BhdGNoLCBfcmVmMikge1xuICB2YXIgaW5pdE1hcFN0YXRlVG9Qcm9wcyA9IF9yZWYyLmluaXRNYXBTdGF0ZVRvUHJvcHMsXG4gICAgICBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzID0gX3JlZjIuaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyxcbiAgICAgIGluaXRNZXJnZVByb3BzID0gX3JlZjIuaW5pdE1lcmdlUHJvcHMsXG4gICAgICBvcHRpb25zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYyLCBbJ2luaXRNYXBTdGF0ZVRvUHJvcHMnLCAnaW5pdE1hcERpc3BhdGNoVG9Qcm9wcycsICdpbml0TWVyZ2VQcm9wcyddKTtcblxuICB2YXIgbWFwU3RhdGVUb1Byb3BzID0gaW5pdE1hcFN0YXRlVG9Qcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG4gIHZhciBtYXBEaXNwYXRjaFRvUHJvcHMgPSBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvcHRpb25zKTtcbiAgdmFyIG1lcmdlUHJvcHMgPSBpbml0TWVyZ2VQcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2ZXJpZnlTdWJzZWxlY3RvcnMobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIG9wdGlvbnMuZGlzcGxheU5hbWUpO1xuICB9XG5cbiAgdmFyIHNlbGVjdG9yRmFjdG9yeSA9IG9wdGlvbnMucHVyZSA/IHB1cmVGaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5IDogaW1wdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeTtcblxuICByZXR1cm4gc2VsZWN0b3JGYWN0b3J5KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBkaXNwYXRjaCwgb3B0aW9ucyk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9zZWxlY3RvckZhY3RvcnkuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3Qvc2VsZWN0b3JGYWN0b3J5LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCB3YXJuaW5nIGZyb20gJy4uL3V0aWxzL3dhcm5pbmcnO1xuXG5mdW5jdGlvbiB2ZXJpZnkoc2VsZWN0b3IsIG1ldGhvZE5hbWUsIGRpc3BsYXlOYW1lKSB7XG4gIGlmICghc2VsZWN0b3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgdmFsdWUgZm9yICcgKyBtZXRob2ROYW1lICsgJyBpbiAnICsgZGlzcGxheU5hbWUgKyAnLicpO1xuICB9IGVsc2UgaWYgKG1ldGhvZE5hbWUgPT09ICdtYXBTdGF0ZVRvUHJvcHMnIHx8IG1ldGhvZE5hbWUgPT09ICdtYXBEaXNwYXRjaFRvUHJvcHMnKSB7XG4gICAgaWYgKCFzZWxlY3Rvci5oYXNPd25Qcm9wZXJ0eSgnZGVwZW5kc09uT3duUHJvcHMnKSkge1xuICAgICAgd2FybmluZygnVGhlIHNlbGVjdG9yIGZvciAnICsgbWV0aG9kTmFtZSArICcgb2YgJyArIGRpc3BsYXlOYW1lICsgJyBkaWQgbm90IHNwZWNpZnkgYSB2YWx1ZSBmb3IgZGVwZW5kc09uT3duUHJvcHMuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZlcmlmeVN1YnNlbGVjdG9ycyhtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmVyaWZ5KG1hcFN0YXRlVG9Qcm9wcywgJ21hcFN0YXRlVG9Qcm9wcycsIGRpc3BsYXlOYW1lKTtcbiAgdmVyaWZ5KG1hcERpc3BhdGNoVG9Qcm9wcywgJ21hcERpc3BhdGNoVG9Qcm9wcycsIGRpc3BsYXlOYW1lKTtcbiAgdmVyaWZ5KG1lcmdlUHJvcHMsICdtZXJnZVByb3BzJywgZGlzcGxheU5hbWUpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvdmVyaWZ5U3Vic2VsZWN0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3ZlcmlmeVN1YnNlbGVjdG9ycy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgdmVyaWZ5UGxhaW5PYmplY3QgZnJvbSAnLi4vdXRpbHMvdmVyaWZ5UGxhaW5PYmplY3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gd3JhcE1hcFRvUHJvcHNDb25zdGFudChnZXRDb25zdGFudCkge1xuICByZXR1cm4gZnVuY3Rpb24gaW5pdENvbnN0YW50U2VsZWN0b3IoZGlzcGF0Y2gsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29uc3RhbnQgPSBnZXRDb25zdGFudChkaXNwYXRjaCwgb3B0aW9ucyk7XG5cbiAgICBmdW5jdGlvbiBjb25zdGFudFNlbGVjdG9yKCkge1xuICAgICAgcmV0dXJuIGNvbnN0YW50O1xuICAgIH1cbiAgICBjb25zdGFudFNlbGVjdG9yLmRlcGVuZHNPbk93blByb3BzID0gZmFsc2U7XG4gICAgcmV0dXJuIGNvbnN0YW50U2VsZWN0b3I7XG4gIH07XG59XG5cbi8vIGRlcGVuZHNPbk93blByb3BzIGlzIHVzZWQgYnkgY3JlYXRlTWFwVG9Qcm9wc1Byb3h5IHRvIGRldGVybWluZSB3aGV0aGVyIHRvIHBhc3MgcHJvcHMgYXMgYXJnc1xuLy8gdG8gdGhlIG1hcFRvUHJvcHMgZnVuY3Rpb24gYmVpbmcgd3JhcHBlZC4gSXQgaXMgYWxzbyB1c2VkIGJ5IG1ha2VQdXJlUHJvcHNTZWxlY3RvciB0byBkZXRlcm1pbmVcbi8vIHdoZXRoZXIgbWFwVG9Qcm9wcyBuZWVkcyB0byBiZSBpbnZva2VkIHdoZW4gcHJvcHMgaGF2ZSBjaGFuZ2VkLlxuLy8gXG4vLyBBIGxlbmd0aCBvZiBvbmUgc2lnbmFscyB0aGF0IG1hcFRvUHJvcHMgZG9lcyBub3QgZGVwZW5kIG9uIHByb3BzIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnQuXG4vLyBBIGxlbmd0aCBvZiB6ZXJvIGlzIGFzc3VtZWQgdG8gbWVhbiBtYXBUb1Byb3BzIGlzIGdldHRpbmcgYXJncyB2aWEgYXJndW1lbnRzIG9yIC4uLmFyZ3MgYW5kXG4vLyB0aGVyZWZvcmUgbm90IHJlcG9ydGluZyBpdHMgbGVuZ3RoIGFjY3VyYXRlbHkuLlxuZXhwb3J0IGZ1bmN0aW9uIGdldERlcGVuZHNPbk93blByb3BzKG1hcFRvUHJvcHMpIHtcbiAgcmV0dXJuIG1hcFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMgIT09IG51bGwgJiYgbWFwVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcyAhPT0gdW5kZWZpbmVkID8gQm9vbGVhbihtYXBUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSA6IG1hcFRvUHJvcHMubGVuZ3RoICE9PSAxO1xufVxuXG4vLyBVc2VkIGJ5IHdoZW5NYXBTdGF0ZVRvUHJvcHNJc0Z1bmN0aW9uIGFuZCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNGdW5jdGlvbixcbi8vIHRoaXMgZnVuY3Rpb24gd3JhcHMgbWFwVG9Qcm9wcyBpbiBhIHByb3h5IGZ1bmN0aW9uIHdoaWNoIGRvZXMgc2V2ZXJhbCB0aGluZ3M6XG4vLyBcbi8vICAqIERldGVjdHMgd2hldGhlciB0aGUgbWFwVG9Qcm9wcyBmdW5jdGlvbiBiZWluZyBjYWxsZWQgZGVwZW5kcyBvbiBwcm9wcywgd2hpY2hcbi8vICAgIGlzIHVzZWQgYnkgc2VsZWN0b3JGYWN0b3J5IHRvIGRlY2lkZSBpZiBpdCBzaG91bGQgcmVpbnZva2Ugb24gcHJvcHMgY2hhbmdlcy5cbi8vICAgIFxuLy8gICogT24gZmlyc3QgY2FsbCwgaGFuZGxlcyBtYXBUb1Byb3BzIGlmIHJldHVybnMgYW5vdGhlciBmdW5jdGlvbiwgYW5kIHRyZWF0cyB0aGF0XG4vLyAgICBuZXcgZnVuY3Rpb24gYXMgdGhlIHRydWUgbWFwVG9Qcm9wcyBmb3Igc3Vic2VxdWVudCBjYWxscy5cbi8vICAgIFxuLy8gICogT24gZmlyc3QgY2FsbCwgdmVyaWZpZXMgdGhlIGZpcnN0IHJlc3VsdCBpcyBhIHBsYWluIG9iamVjdCwgaW4gb3JkZXIgdG8gd2FyblxuLy8gICAgdGhlIGRldmVsb3BlciB0aGF0IHRoZWlyIG1hcFRvUHJvcHMgZnVuY3Rpb24gaXMgbm90IHJldHVybmluZyBhIHZhbGlkIHJlc3VsdC5cbi8vICAgIFxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBNYXBUb1Byb3BzRnVuYyhtYXBUb1Byb3BzLCBtZXRob2ROYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbml0UHJveHlTZWxlY3RvcihkaXNwYXRjaCwgX3JlZikge1xuICAgIHZhciBkaXNwbGF5TmFtZSA9IF9yZWYuZGlzcGxheU5hbWU7XG5cbiAgICB2YXIgcHJveHkgPSBmdW5jdGlvbiBtYXBUb1Byb3BzUHJveHkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcykge1xuICAgICAgcmV0dXJuIHByb3h5LmRlcGVuZHNPbk93blByb3BzID8gcHJveHkubWFwVG9Qcm9wcyhzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKSA6IHByb3h5Lm1hcFRvUHJvcHMoc3RhdGVPckRpc3BhdGNoKTtcbiAgICB9O1xuXG4gICAgLy8gYWxsb3cgZGV0ZWN0RmFjdG9yeUFuZFZlcmlmeSB0byBnZXQgb3duUHJvcHNcbiAgICBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA9IHRydWU7XG5cbiAgICBwcm94eS5tYXBUb1Byb3BzID0gZnVuY3Rpb24gZGV0ZWN0RmFjdG9yeUFuZFZlcmlmeShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKSB7XG4gICAgICBwcm94eS5tYXBUb1Byb3BzID0gbWFwVG9Qcm9wcztcbiAgICAgIHByb3h5LmRlcGVuZHNPbk93blByb3BzID0gZ2V0RGVwZW5kc09uT3duUHJvcHMobWFwVG9Qcm9wcyk7XG4gICAgICB2YXIgcHJvcHMgPSBwcm94eShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKTtcblxuICAgICAgaWYgKHR5cGVvZiBwcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcm94eS5tYXBUb1Byb3BzID0gcHJvcHM7XG4gICAgICAgIHByb3h5LmRlcGVuZHNPbk93blByb3BzID0gZ2V0RGVwZW5kc09uT3duUHJvcHMocHJvcHMpO1xuICAgICAgICBwcm9wcyA9IHByb3h5KHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgdmVyaWZ5UGxhaW5PYmplY3QocHJvcHMsIGRpc3BsYXlOYW1lLCBtZXRob2ROYW1lKTtcblxuICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH07XG5cbiAgICByZXR1cm4gcHJveHk7XG4gIH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC93cmFwTWFwVG9Qcm9wcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC93cmFwTWFwVG9Qcm9wcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgUHJvdmlkZXIsIHsgY3JlYXRlUHJvdmlkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvUHJvdmlkZXInO1xuaW1wb3J0IGNvbm5lY3RBZHZhbmNlZCBmcm9tICcuL2NvbXBvbmVudHMvY29ubmVjdEFkdmFuY2VkJztcbmltcG9ydCBjb25uZWN0IGZyb20gJy4vY29ubmVjdC9jb25uZWN0JztcblxuZXhwb3J0IHsgUHJvdmlkZXIsIGNyZWF0ZVByb3ZpZGVyLCBjb25uZWN0QWR2YW5jZWQsIGNvbm5lY3QgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZXhwb3J0IHZhciBzdWJzY3JpcHRpb25TaGFwZSA9IFByb3BUeXBlcy5zaGFwZSh7XG4gIHRyeVN1YnNjcmliZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdHJ5VW5zdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG5vdGlmeU5lc3RlZFN1YnM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlzU3Vic2NyaWJlZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufSk7XG5cbmV4cG9ydCB2YXIgc3RvcmVTaGFwZSA9IFByb3BUeXBlcy5zaGFwZSh7XG4gIHN1YnNjcmliZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldFN0YXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9Qcm9wVHlwZXMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL1Byb3BUeXBlcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vLyBlbmNhcHN1bGF0ZXMgdGhlIHN1YnNjcmlwdGlvbiBsb2dpYyBmb3IgY29ubmVjdGluZyBhIGNvbXBvbmVudCB0byB0aGUgcmVkdXggc3RvcmUsIGFzXG4vLyB3ZWxsIGFzIG5lc3Rpbmcgc3Vic2NyaXB0aW9ucyBvZiBkZXNjZW5kYW50IGNvbXBvbmVudHMsIHNvIHRoYXQgd2UgY2FuIGVuc3VyZSB0aGVcbi8vIGFuY2VzdG9yIGNvbXBvbmVudHMgcmUtcmVuZGVyIGJlZm9yZSBkZXNjZW5kYW50c1xuXG52YXIgQ0xFQVJFRCA9IG51bGw7XG52YXIgbnVsbExpc3RlbmVycyA9IHtcbiAgbm90aWZ5OiBmdW5jdGlvbiBub3RpZnkoKSB7fVxufTtcblxuZnVuY3Rpb24gY3JlYXRlTGlzdGVuZXJDb2xsZWN0aW9uKCkge1xuICAvLyB0aGUgY3VycmVudC9uZXh0IHBhdHRlcm4gaXMgY29waWVkIGZyb20gcmVkdXgncyBjcmVhdGVTdG9yZSBjb2RlLlxuICAvLyBUT0RPOiByZWZhY3RvcitleHBvc2UgdGhhdCBjb2RlIHRvIGJlIHJldXNhYmxlIGhlcmU/XG4gIHZhciBjdXJyZW50ID0gW107XG4gIHZhciBuZXh0ID0gW107XG5cbiAgcmV0dXJuIHtcbiAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICBuZXh0ID0gQ0xFQVJFRDtcbiAgICAgIGN1cnJlbnQgPSBDTEVBUkVEO1xuICAgIH0sXG4gICAgbm90aWZ5OiBmdW5jdGlvbiBub3RpZnkoKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudCA9IG5leHQ7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsaXN0ZW5lcnNbaV0oKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICBpZiAobmV4dCA9PT0gY3VycmVudCkgbmV4dCA9IGN1cnJlbnQuc2xpY2UoKTtcbiAgICAgIG5leHQucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgaWYgKCFpc1N1YnNjcmliZWQgfHwgY3VycmVudCA9PT0gQ0xFQVJFRCkgcmV0dXJuO1xuICAgICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAobmV4dCA9PT0gY3VycmVudCkgbmV4dCA9IGN1cnJlbnQuc2xpY2UoKTtcbiAgICAgICAgbmV4dC5zcGxpY2UobmV4dC5pbmRleE9mKGxpc3RlbmVyKSwgMSk7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxudmFyIFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKHN0b3JlLCBwYXJlbnRTdWIsIG9uU3RhdGVDaGFuZ2UpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3Vic2NyaXB0aW9uKTtcblxuICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcbiAgICB0aGlzLnBhcmVudFN1YiA9IHBhcmVudFN1YjtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2UgPSBvblN0YXRlQ2hhbmdlO1xuICAgIHRoaXMudW5zdWJzY3JpYmUgPSBudWxsO1xuICAgIHRoaXMubGlzdGVuZXJzID0gbnVsbExpc3RlbmVycztcbiAgfVxuXG4gIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuYWRkTmVzdGVkU3ViID0gZnVuY3Rpb24gYWRkTmVzdGVkU3ViKGxpc3RlbmVyKSB7XG4gICAgdGhpcy50cnlTdWJzY3JpYmUoKTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLm5vdGlmeU5lc3RlZFN1YnMgPSBmdW5jdGlvbiBub3RpZnlOZXN0ZWRTdWJzKCkge1xuICAgIHRoaXMubGlzdGVuZXJzLm5vdGlmeSgpO1xuICB9O1xuXG4gIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuaXNTdWJzY3JpYmVkID0gZnVuY3Rpb24gaXNTdWJzY3JpYmVkKCkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMudW5zdWJzY3JpYmUpO1xuICB9O1xuXG4gIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gdHJ5U3Vic2NyaWJlKCkge1xuICAgIGlmICghdGhpcy51bnN1YnNjcmliZSkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZSA9IHRoaXMucGFyZW50U3ViID8gdGhpcy5wYXJlbnRTdWIuYWRkTmVzdGVkU3ViKHRoaXMub25TdGF0ZUNoYW5nZSkgOiB0aGlzLnN0b3JlLnN1YnNjcmliZSh0aGlzLm9uU3RhdGVDaGFuZ2UpO1xuXG4gICAgICB0aGlzLmxpc3RlbmVycyA9IGNyZWF0ZUxpc3RlbmVyQ29sbGVjdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnRyeVVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdHJ5VW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKHRoaXMudW5zdWJzY3JpYmUpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSBudWxsO1xuICAgICAgdGhpcy5saXN0ZW5lcnMuY2xlYXIoKTtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gbnVsbExpc3RlbmVycztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKTtcblxuZXhwb3J0IHsgU3Vic2NyaXB0aW9uIGFzIGRlZmF1bHQgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9TdWJzY3JpcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL1N1YnNjcmlwdGlvbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gaXMoeCwgeSkge1xuICBpZiAoeCA9PT0geSkge1xuICAgIHJldHVybiB4ICE9PSAwIHx8IHkgIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIpIHtcbiAgaWYgKGlzKG9iakEsIG9iakIpKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAodHlwZW9mIG9iakEgIT09ICdvYmplY3QnIHx8IG9iakEgPT09IG51bGwgfHwgdHlwZW9mIG9iakIgIT09ICdvYmplY3QnIHx8IG9iakIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQS5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duLmNhbGwob2JqQiwga2V5c0FbaV0pIHx8ICFpcyhvYmpBW2tleXNBW2ldXSwgb2JqQltrZXlzQVtpXV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvc2hhbGxvd0VxdWFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9zaGFsbG93RXF1YWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi93YXJuaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmVyaWZ5UGxhaW5PYmplY3QodmFsdWUsIGRpc3BsYXlOYW1lLCBtZXRob2ROYW1lKSB7XG4gIGlmICghaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICB3YXJuaW5nKG1ldGhvZE5hbWUgKyAnKCkgaW4gJyArIGRpc3BsYXlOYW1lICsgJyBtdXN0IHJldHVybiBhIHBsYWluIG9iamVjdC4gSW5zdGVhZCByZWNlaXZlZCAnICsgdmFsdWUgKyAnLicpO1xuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvdmVyaWZ5UGxhaW5PYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3ZlcmlmeVBsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5pbXBvcnQgY29tcG9zZSBmcm9tICcuL2NvbXBvc2UnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdG9yZSBlbmhhbmNlciB0aGF0IGFwcGxpZXMgbWlkZGxld2FyZSB0byB0aGUgZGlzcGF0Y2ggbWV0aG9kXG4gKiBvZiB0aGUgUmVkdXggc3RvcmUuIFRoaXMgaXMgaGFuZHkgZm9yIGEgdmFyaWV0eSBvZiB0YXNrcywgc3VjaCBhcyBleHByZXNzaW5nXG4gKiBhc3luY2hyb25vdXMgYWN0aW9ucyBpbiBhIGNvbmNpc2UgbWFubmVyLCBvciBsb2dnaW5nIGV2ZXJ5IGFjdGlvbiBwYXlsb2FkLlxuICpcbiAqIFNlZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UgYXMgYW4gZXhhbXBsZSBvZiB0aGUgUmVkdXggbWlkZGxld2FyZS5cbiAqXG4gKiBCZWNhdXNlIG1pZGRsZXdhcmUgaXMgcG90ZW50aWFsbHkgYXN5bmNocm9ub3VzLCB0aGlzIHNob3VsZCBiZSB0aGUgZmlyc3RcbiAqIHN0b3JlIGVuaGFuY2VyIGluIHRoZSBjb21wb3NpdGlvbiBjaGFpbi5cbiAqXG4gKiBOb3RlIHRoYXQgZWFjaCBtaWRkbGV3YXJlIHdpbGwgYmUgZ2l2ZW4gdGhlIGBkaXNwYXRjaGAgYW5kIGBnZXRTdGF0ZWAgZnVuY3Rpb25zXG4gKiBhcyBuYW1lZCBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gbWlkZGxld2FyZXMgVGhlIG1pZGRsZXdhcmUgY2hhaW4gdG8gYmUgYXBwbGllZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzdG9yZSBlbmhhbmNlciBhcHBseWluZyB0aGUgbWlkZGxld2FyZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwbHlNaWRkbGV3YXJlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBtaWRkbGV3YXJlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoY3JlYXRlU3RvcmUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICAgICAgdmFyIHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKTtcbiAgICAgIHZhciBfZGlzcGF0Y2ggPSBzdG9yZS5kaXNwYXRjaDtcbiAgICAgIHZhciBjaGFpbiA9IFtdO1xuXG4gICAgICB2YXIgbWlkZGxld2FyZUFQSSA9IHtcbiAgICAgICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLFxuICAgICAgICBkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIF9kaXNwYXRjaChhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hhaW4gPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmUobWlkZGxld2FyZUFQSSk7XG4gICAgICB9KTtcbiAgICAgIF9kaXNwYXRjaCA9IGNvbXBvc2UuYXBwbHkodW5kZWZpbmVkLCBjaGFpbikoc3RvcmUuZGlzcGF0Y2gpO1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0b3JlLCB7XG4gICAgICAgIGRpc3BhdGNoOiBfZGlzcGF0Y2hcbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYXBwbHlNaWRkbGV3YXJlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9hcHBseU1pZGRsZXdhcmUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goYWN0aW9uQ3JlYXRvci5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvbiBjcmVhdG9ycywgaW50byBhbiBvYmplY3Qgd2l0aCB0aGVcbiAqIHNhbWUga2V5cywgYnV0IHdpdGggZXZlcnkgZnVuY3Rpb24gd3JhcHBlZCBpbnRvIGEgYGRpc3BhdGNoYCBjYWxsIHNvIHRoZXlcbiAqIG1heSBiZSBpbnZva2VkIGRpcmVjdGx5LiBUaGlzIGlzIGp1c3QgYSBjb252ZW5pZW5jZSBtZXRob2QsIGFzIHlvdSBjYW4gY2FsbFxuICogYHN0b3JlLmRpc3BhdGNoKE15QWN0aW9uQ3JlYXRvcnMuZG9Tb21ldGhpbmcoKSlgIHlvdXJzZWxmIGp1c3QgZmluZS5cbiAqXG4gKiBGb3IgY29udmVuaWVuY2UsIHlvdSBjYW4gYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCxcbiAqIGFuZCBnZXQgYSBmdW5jdGlvbiBpbiByZXR1cm4uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9IGFjdGlvbkNyZWF0b3JzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvblxuICogY3JlYXRvciBmdW5jdGlvbnMuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzYFxuICogc3ludGF4LiBZb3UgbWF5IGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCBUaGUgYGRpc3BhdGNoYCBmdW5jdGlvbiBhdmFpbGFibGUgb24geW91ciBSZWR1eFxuICogc3RvcmUuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufE9iamVjdH0gVGhlIG9iamVjdCBtaW1pY2tpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCwgYnV0IHdpdGhcbiAqIGV2ZXJ5IGFjdGlvbiBjcmVhdG9yIHdyYXBwZWQgaW50byB0aGUgYGRpc3BhdGNoYCBjYWxsLiBJZiB5b3UgcGFzc2VkIGFcbiAqIGZ1bmN0aW9uIGFzIGBhY3Rpb25DcmVhdG9yc2AsIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBhbHNvIGJlIGEgc2luZ2xlXG4gKiBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCkge1xuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzICE9PSAnb2JqZWN0JyB8fCBhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYmluZEFjdGlvbkNyZWF0b3JzIGV4cGVjdGVkIGFuIG9iamVjdCBvciBhIGZ1bmN0aW9uLCBpbnN0ZWFkIHJlY2VpdmVkICcgKyAoYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgYWN0aW9uQ3JlYXRvcnMpICsgJy4gJyArICdEaWQgeW91IHdyaXRlIFwiaW1wb3J0IEFjdGlvbkNyZWF0b3JzIGZyb21cIiBpbnN0ZWFkIG9mIFwiaW1wb3J0ICogYXMgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiPycpO1xuICB9XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhY3Rpb25DcmVhdG9ycyk7XG4gIHZhciBib3VuZEFjdGlvbkNyZWF0b3JzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIHZhciBhY3Rpb25DcmVhdG9yID0gYWN0aW9uQ3JlYXRvcnNba2V5XTtcbiAgICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGJvdW5kQWN0aW9uQ3JlYXRvcnNba2V5XSA9IGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvdW5kQWN0aW9uQ3JlYXRvcnM7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYmluZEFjdGlvbkNyZWF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9iaW5kQWN0aW9uQ3JlYXRvcnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IHsgQWN0aW9uVHlwZXMgfSBmcm9tICcuL2NyZWF0ZVN0b3JlJztcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0JztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vdXRpbHMvd2FybmluZyc7XG5cbmZ1bmN0aW9uIGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKGtleSwgYWN0aW9uKSB7XG4gIHZhciBhY3Rpb25UeXBlID0gYWN0aW9uICYmIGFjdGlvbi50eXBlO1xuICB2YXIgYWN0aW9uTmFtZSA9IGFjdGlvblR5cGUgJiYgJ1wiJyArIGFjdGlvblR5cGUudG9TdHJpbmcoKSArICdcIicgfHwgJ2FuIGFjdGlvbic7XG5cbiAgcmV0dXJuICdHaXZlbiBhY3Rpb24gJyArIGFjdGlvbk5hbWUgKyAnLCByZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQuICcgKyAnVG8gaWdub3JlIGFuIGFjdGlvbiwgeW91IG11c3QgZXhwbGljaXRseSByZXR1cm4gdGhlIHByZXZpb3VzIHN0YXRlLiAnICsgJ0lmIHlvdSB3YW50IHRoaXMgcmVkdWNlciB0byBob2xkIG5vIHZhbHVlLCB5b3UgY2FuIHJldHVybiBudWxsIGluc3RlYWQgb2YgdW5kZWZpbmVkLic7XG59XG5cbmZ1bmN0aW9uIGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2UoaW5wdXRTdGF0ZSwgcmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGFyZ3VtZW50TmFtZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gQWN0aW9uVHlwZXMuSU5JVCA/ICdwcmVsb2FkZWRTdGF0ZSBhcmd1bWVudCBwYXNzZWQgdG8gY3JlYXRlU3RvcmUnIDogJ3ByZXZpb3VzIHN0YXRlIHJlY2VpdmVkIGJ5IHRoZSByZWR1Y2VyJztcblxuICBpZiAocmVkdWNlcktleXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuICdTdG9yZSBkb2VzIG5vdCBoYXZlIGEgdmFsaWQgcmVkdWNlci4gTWFrZSBzdXJlIHRoZSBhcmd1bWVudCBwYXNzZWQgJyArICd0byBjb21iaW5lUmVkdWNlcnMgaXMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgcmVkdWNlcnMuJztcbiAgfVxuXG4gIGlmICghaXNQbGFpbk9iamVjdChpbnB1dFN0YXRlKSkge1xuICAgIHJldHVybiAnVGhlICcgKyBhcmd1bWVudE5hbWUgKyAnIGhhcyB1bmV4cGVjdGVkIHR5cGUgb2YgXCInICsge30udG9TdHJpbmcuY2FsbChpbnB1dFN0YXRlKS5tYXRjaCgvXFxzKFthLXp8QS1aXSspLylbMV0gKyAnXCIuIEV4cGVjdGVkIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgJyArICgna2V5czogXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCInKTtcbiAgfVxuXG4gIHZhciB1bmV4cGVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKGlucHV0U3RhdGUpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuICFyZWR1Y2Vycy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICF1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XTtcbiAgfSk7XG5cbiAgdW5leHBlY3RlZEtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdW5leHBlY3RlZEtleUNhY2hlW2tleV0gPSB0cnVlO1xuICB9KTtcblxuICBpZiAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiAnVW5leHBlY3RlZCAnICsgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDEgPyAna2V5cycgOiAna2V5JykgKyAnICcgKyAoJ1wiJyArIHVuZXhwZWN0ZWRLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiIGZvdW5kIGluICcgKyBhcmd1bWVudE5hbWUgKyAnLiAnKSArICdFeHBlY3RlZCB0byBmaW5kIG9uZSBvZiB0aGUga25vd24gcmVkdWNlciBrZXlzIGluc3RlYWQ6ICcgKyAoJ1wiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiLiBVbmV4cGVjdGVkIGtleXMgd2lsbCBiZSBpZ25vcmVkLicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFJlZHVjZXJTaGFwZShyZWR1Y2Vycykge1xuICBPYmplY3Qua2V5cyhyZWR1Y2VycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHJlZHVjZXIgPSByZWR1Y2Vyc1trZXldO1xuICAgIHZhciBpbml0aWFsU3RhdGUgPSByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCBkdXJpbmcgaW5pdGlhbGl6YXRpb24uICcgKyAnSWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGUgcmVkdWNlciBpcyB1bmRlZmluZWQsIHlvdSBtdXN0ICcgKyAnZXhwbGljaXRseSByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSAnICsgJ25vdCBiZSB1bmRlZmluZWQuIElmIHlvdSBkb25cXCd0IHdhbnQgdG8gc2V0IGEgdmFsdWUgZm9yIHRoaXMgcmVkdWNlciwgJyArICd5b3UgY2FuIHVzZSBudWxsIGluc3RlYWQgb2YgdW5kZWZpbmVkLicpO1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gJ0BAcmVkdXgvUFJPQkVfVU5LTk9XTl9BQ1RJT05fJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KS5zcGxpdCgnJykuam9pbignLicpO1xuICAgIGlmICh0eXBlb2YgcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogdHlwZSB9KSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIHdoZW4gcHJvYmVkIHdpdGggYSByYW5kb20gdHlwZS4gJyArICgnRG9uXFwndCB0cnkgdG8gaGFuZGxlICcgKyBBY3Rpb25UeXBlcy5JTklUICsgJyBvciBvdGhlciBhY3Rpb25zIGluIFwicmVkdXgvKlwiICcpICsgJ25hbWVzcGFjZS4gVGhleSBhcmUgY29uc2lkZXJlZCBwcml2YXRlLiBJbnN0ZWFkLCB5b3UgbXVzdCByZXR1cm4gdGhlICcgKyAnY3VycmVudCBzdGF0ZSBmb3IgYW55IHVua25vd24gYWN0aW9ucywgdW5sZXNzIGl0IGlzIHVuZGVmaW5lZCwgJyArICdpbiB3aGljaCBjYXNlIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZSwgcmVnYXJkbGVzcyBvZiB0aGUgJyArICdhY3Rpb24gdHlwZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBiZSB1bmRlZmluZWQsIGJ1dCBjYW4gYmUgbnVsbC4nKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGRpZmZlcmVudCByZWR1Y2VyIGZ1bmN0aW9ucywgaW50byBhIHNpbmdsZVxuICogcmVkdWNlciBmdW5jdGlvbi4gSXQgd2lsbCBjYWxsIGV2ZXJ5IGNoaWxkIHJlZHVjZXIsIGFuZCBnYXRoZXIgdGhlaXIgcmVzdWx0c1xuICogaW50byBhIHNpbmdsZSBzdGF0ZSBvYmplY3QsIHdob3NlIGtleXMgY29ycmVzcG9uZCB0byB0aGUga2V5cyBvZiB0aGUgcGFzc2VkXG4gKiByZWR1Y2VyIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVkdWNlcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBjb3JyZXNwb25kIHRvIGRpZmZlcmVudFxuICogcmVkdWNlciBmdW5jdGlvbnMgdGhhdCBuZWVkIHRvIGJlIGNvbWJpbmVkIGludG8gb25lLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpblxuICogaXQgaXMgdG8gdXNlIEVTNiBgaW1wb3J0ICogYXMgcmVkdWNlcnNgIHN5bnRheC4gVGhlIHJlZHVjZXJzIG1heSBuZXZlciByZXR1cm5cbiAqIHVuZGVmaW5lZCBmb3IgYW55IGFjdGlvbi4gSW5zdGVhZCwgdGhleSBzaG91bGQgcmV0dXJuIHRoZWlyIGluaXRpYWwgc3RhdGVcbiAqIGlmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlbSB3YXMgdW5kZWZpbmVkLCBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgZm9yIGFueVxuICogdW5yZWNvZ25pemVkIGFjdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgcmVkdWNlciBmdW5jdGlvbiB0aGF0IGludm9rZXMgZXZlcnkgcmVkdWNlciBpbnNpZGUgdGhlXG4gKiBwYXNzZWQgb2JqZWN0LCBhbmQgYnVpbGRzIGEgc3RhdGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VycyhyZWR1Y2Vycykge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBmaW5hbFJlZHVjZXJzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gcmVkdWNlcktleXNbaV07XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3YXJuaW5nKCdObyByZWR1Y2VyIHByb3ZpZGVkIGZvciBrZXkgXCInICsga2V5ICsgJ1wiJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmaW5hbFJlZHVjZXJzW2tleV0gPSByZWR1Y2Vyc1trZXldO1xuICAgIH1cbiAgfVxuICB2YXIgZmluYWxSZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKGZpbmFsUmVkdWNlcnMpO1xuXG4gIHZhciB1bmV4cGVjdGVkS2V5Q2FjaGUgPSB2b2lkIDA7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdW5leHBlY3RlZEtleUNhY2hlID0ge307XG4gIH1cblxuICB2YXIgc2hhcGVBc3NlcnRpb25FcnJvciA9IHZvaWQgMDtcbiAgdHJ5IHtcbiAgICBhc3NlcnRSZWR1Y2VyU2hhcGUoZmluYWxSZWR1Y2Vycyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzaGFwZUFzc2VydGlvbkVycm9yID0gZTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBjb21iaW5hdGlvbigpIHtcbiAgICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHNbMV07XG5cbiAgICBpZiAoc2hhcGVBc3NlcnRpb25FcnJvcikge1xuICAgICAgdGhyb3cgc2hhcGVBc3NlcnRpb25FcnJvcjtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHdhcm5pbmdNZXNzYWdlID0gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShzdGF0ZSwgZmluYWxSZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpO1xuICAgICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICAgIHdhcm5pbmcod2FybmluZ01lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBoYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgdmFyIG5leHRTdGF0ZSA9IHt9O1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBmaW5hbFJlZHVjZXJLZXlzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9rZXkgPSBmaW5hbFJlZHVjZXJLZXlzW19pXTtcbiAgICAgIHZhciByZWR1Y2VyID0gZmluYWxSZWR1Y2Vyc1tfa2V5XTtcbiAgICAgIHZhciBwcmV2aW91c1N0YXRlRm9yS2V5ID0gc3RhdGVbX2tleV07XG4gICAgICB2YXIgbmV4dFN0YXRlRm9yS2V5ID0gcmVkdWNlcihwcmV2aW91c1N0YXRlRm9yS2V5LCBhY3Rpb24pO1xuICAgICAgaWYgKHR5cGVvZiBuZXh0U3RhdGVGb3JLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShfa2V5LCBhY3Rpb24pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIG5leHRTdGF0ZVtfa2V5XSA9IG5leHRTdGF0ZUZvcktleTtcbiAgICAgIGhhc0NoYW5nZWQgPSBoYXNDaGFuZ2VkIHx8IG5leHRTdGF0ZUZvcktleSAhPT0gcHJldmlvdXNTdGF0ZUZvcktleTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NoYW5nZWQgPyBuZXh0U3RhdGUgOiBzdGF0ZTtcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21iaW5lUmVkdWNlcnMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbWJpbmVSZWR1Y2Vycy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYShiLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcblxuLyoqXG4gKiBUaGVzZSBhcmUgcHJpdmF0ZSBhY3Rpb24gdHlwZXMgcmVzZXJ2ZWQgYnkgUmVkdXguXG4gKiBGb3IgYW55IHVua25vd24gYWN0aW9ucywgeW91IG11c3QgcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlLlxuICogSWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuXG4gKiBEbyBub3QgcmVmZXJlbmNlIHRoZXNlIGFjdGlvbiB0eXBlcyBkaXJlY3RseSBpbiB5b3VyIGNvZGUuXG4gKi9cbmV4cG9ydCB2YXIgQWN0aW9uVHlwZXMgPSB7XG4gIElOSVQ6ICdAQHJlZHV4L0lOSVQnXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuICAgKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cbiAgICpcbiAgICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuICAgKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG4gICAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuICAgKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gICAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG4gICAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcbiAgICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2VuaGFuY2VyXSBUaGUgc3RvcmUgZW5oYW5jZXIuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAgICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICAgKiBpcyBgYXBwbHlNaWRkbGV3YXJlKClgLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICAgKiBhbmQgc3Vic2NyaWJlIHRvIGNoYW5nZXMuXG4gICAqL1xufTtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbiAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cbiAgICogY2FsbCBgZ2V0U3RhdGUoKWAgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGluc2lkZSB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAqIGNhdmVhdHM6XG4gICAqXG4gICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cbiAgICogSWYgeW91IHN1YnNjcmliZSBvciB1bnN1YnNjcmliZSB3aGlsZSB0aGUgbGlzdGVuZXJzIGFyZSBiZWluZyBpbnZva2VkLCB0aGlzXG4gICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcbiAgICogcmVjZW50IHNuYXBzaG90IG9mIHRoZSBzdWJzY3JpcHRpb24gbGlzdC5cbiAgICpcbiAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG4gICAqIG1pZ2h0IGhhdmUgYmVlbiB1cGRhdGVkIG11bHRpcGxlIHRpbWVzIGR1cmluZyBhIG5lc3RlZCBgZGlzcGF0Y2goKWAgYmVmb3JlXG4gICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG4gICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3RcbiAgICogc3RhdGUgYnkgdGhlIHRpbWUgaXQgZXhpdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGlzIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cbiAgICpcbiAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAqIGJlIGNvbnNpZGVyZWQgdGhlICoqbmV4dCoqIHN0YXRlIG9mIHRoZSB0cmVlLCBhbmQgdGhlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICogd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb25seSBzdXBwb3J0cyBwbGFpbiBvYmplY3QgYWN0aW9ucy4gSWYgeW91IHdhbnQgdG9cbiAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cbiAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG4gICAqIGV4YW1wbGUsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGByZWR1eC10aHVua2AgcGFja2FnZS4gRXZlbiB0aGVcbiAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS4gSXQgaXNcbiAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcbiAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcbiAgICogYSBgdHlwZWAgcHJvcGVydHkgd2hpY2ggbWF5IG5vdCBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgYSBnb29kIGlkZWEgdG8gdXNlXG4gICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gRm9yIGNvbnZlbmllbmNlLCB0aGUgc2FtZSBhY3Rpb24gb2JqZWN0IHlvdSBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG4gICAqIHJldHVybiBzb21ldGhpbmcgZWxzZSAoZm9yIGV4YW1wbGUsIGEgUHJvbWlzZSB5b3UgY2FuIGF3YWl0KS5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghaXNQbGFpbk9iamVjdChhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG4gICAgICB9XG4gICAgfSwgX3JlZlskJG9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfVxuXG4gIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyWyQkb2JzZXJ2YWJsZV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jcmVhdGVTdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY3JlYXRlU3RvcmUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IGNyZWF0ZVN0b3JlIGZyb20gJy4vY3JlYXRlU3RvcmUnO1xuaW1wb3J0IGNvbWJpbmVSZWR1Y2VycyBmcm9tICcuL2NvbWJpbmVSZWR1Y2Vycyc7XG5pbXBvcnQgYmluZEFjdGlvbkNyZWF0b3JzIGZyb20gJy4vYmluZEFjdGlvbkNyZWF0b3JzJztcbmltcG9ydCBhcHBseU1pZGRsZXdhcmUgZnJvbSAnLi9hcHBseU1pZGRsZXdhcmUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vdXRpbHMvd2FybmluZyc7XG5cbi8qXG4qIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cbiogSWYgdGhlIGZ1bmN0aW9uIGhhcyBiZWVuIG1pbmlmaWVkIGFuZCBOT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLCB3YXJuIHRoZSB1c2VyLlxuKi9cbmZ1bmN0aW9uIGlzQ3J1c2hlZCgpIHt9XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG4gIHdhcm5pbmcoJ1lvdSBhcmUgY3VycmVudGx5IHVzaW5nIG1pbmlmaWVkIGNvZGUgb3V0c2lkZSBvZiBOT0RFX0VOViA9PT0gXFwncHJvZHVjdGlvblxcJy4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIERlZmluZVBsdWdpbiBmb3Igd2VicGFjayAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDAzMDAzMSkgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnQgeyBjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBiaW5kQWN0aW9uQ3JlYXRvcnMsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuaW1wb3J0IHBvbnlmaWxsIGZyb20gJy4vcG9ueWZpbGwuanMnO1xuXG52YXIgcm9vdDtcblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gcG9ueWZpbGwocm9vdCk7XG5leHBvcnQgZGVmYXVsdCByZXN1bHQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRTeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9wb255ZmlsbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQubGVuZ3RoIDwgMTAgfHwgKC9eW3NcXFddKiQvKS50ZXN0KGZvcm1hdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSB3YXJuaW5nIGZvcm1hdCBzaG91bGQgYmUgYWJsZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzICcgK1xuICAgICAgICAnd2FybmluZy4gUGxlYXNlLCB1c2UgYSBtb3JlIGRlc2NyaXB0aXZlIGZvcm1hdCB0aGFuOiAnICsgZm9ybWF0XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2goeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2FybmluZy9icm93c2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcclxuXHRpZighb3JpZ2luYWxNb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJleHBvcnRzXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2hhcm1vbnktbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vLi4vc2VsbC9zdG9yZSc7XHJcbmltcG9ydCBNb2RhbCBmcm9tICdyZWFjdC1tb2RhbCc7XHJcblxyXG5jb25zdCBjdXN0b21TdHlsZXMgPSB7XHJcbiAgICBjb250ZW50IDoge1xyXG4gICAgICAgIHRvcCAgICAgICAgICAgICAgICAgICA6ICc1MCUnLFxyXG4gICAgICAgIGxlZnQgICAgICAgICAgICAgICAgICA6ICc1MCUnLFxyXG4gICAgICAgIHJpZ2h0ICAgICAgICAgICAgICAgICA6ICdhdXRvJyxcclxuICAgICAgICBib3R0b20gICAgICAgICAgICAgICAgOiAnYXV0bycsXHJcbiAgICAgICAgbWFyZ2luUmlnaHQgICAgICAgICAgIDogJy01MCUnLFxyXG4gICAgICAgIHRyYW5zZm9ybSAgICAgICAgICAgICA6ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknXHJcbiAgICB9XHJcbn07XHJcblxyXG5Nb2RhbC5zZXRBcHBFbGVtZW50KCcjc2VsbC1mb3JtLWNvbnRhaW5lcicpO1xyXG5cclxuY29uc3QgU2VsZWN0b3JJdGVtID0gKHtsYWJlbCwgc2VsZWN0ZWQsIG9uQ2xpY2t9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17XCJzZWxlY3Rvci1pdGVtIFwiICsgKHNlbGVjdGVkICYmIFwic2VsZWN0b3ItaXRlbS1zZWxlY3RlZFwiKX0gb25DbGljaz17b25DbGlja30+XHJcbiAgICAgICAge2xhYmVsfVxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5cclxuY2xhc3MgU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB1cGRhdGVkIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGZpbHRlclVwZGF0ZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgb3BlbiA6IHByb3BzLnNlbGVjdG9yLFxyXG4gICAgICAgICAgICBpdGVtcyA6IHByb3BzLml0ZW1zIHx8IFtdLFxyXG4gICAgICAgICAgICBwb3B1bGFySXRlbXMgOiBwcm9wcy5wb3B1bGFySXRlbXMgfHwgW10sXHJcbiAgICAgICAgICAgIGZpbHRlciA6IHtcclxuICAgICAgICAgICAgICAgIFwiYWdcIiA6IHsgdHlwZTogXCJmaXJzdExldHRlclwiLCB2YWx1ZXM6IFtcImFcIiwnYicsJ2MnLCdkJywnZScsJ2YnLCdnJ10gfSxcclxuICAgICAgICAgICAgICAgIFwiaG5cIiA6IHsgdHlwZTogXCJmaXJzdExldHRlclwiLCB2YWx1ZXM6IFtcImhcIiwnaScsJ2onLCdrJywnbCcsJ2snLCduJ10gfSxcclxuICAgICAgICAgICAgICAgIFwib3RcIiA6IHsgdHlwZTogXCJmaXJzdExldHRlclwiLCB2YWx1ZXM6IFtcIm9cIiwncCcsJ3EnLCdyJywncycsJ3QnXSB9LFxyXG4gICAgICAgICAgICAgICAgXCJ1elwiIDogeyB0eXBlOiBcImZpcnN0TGV0dGVyXCIsIHZhbHVlczogW1widVwiLCd2JywndycsJ3gnLCd5JywneiddIH0sXHJcbiAgICAgICAgICAgICAgICBcInBvcHVsYXJcIiA6IHsgdHlwZTogXCJvcmlnaW5cIiwgdmFsdWU6IFwicG9wdWxhckl0ZW1zXCJ9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFjdGl2ZUZpbHRlciA6IHByb3BzLmFjdGl2ZUZpbHRlciB8fCBcImFnXCIsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbSA6IHt9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3RvcmUuc3Vic2NyaWJlKChhKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSAoKSA9PntcclxuICAgIH07XHJcblxyXG4gICAgb3Blbk1vZGFsID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMub3BlblNlbGVjdG9yKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFmdGVyT3Blbk1vZGFsID0gKCkgPT4ge1xyXG4gICAgICAgIC8vIHJlZmVyZW5jZXMgYXJlIG5vdyBzeW5jJ2QgYW5kIGNhbiBiZSBhY2Nlc3NlZC5cclxuICAgICAgICAvL3RoaXMuc3VidGl0bGUuc3R5bGUuY29sb3IgPSAnI2YwMCc7XHJcbiAgICB9O1xyXG5cclxuICAgIGNsb3NlTW9kYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVwZGF0ZWQ6IGZhbHNlLCBmaWx0ZXJVcGRhdGVkIDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZVNlbGVjdG9yKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEFjdGl2ZUZpbHRlciA9ICgpID0+IHtcclxuICAgICAgICBsZXQgYWN0aXZlRmlsdGVyID0gdGhpcy5nZXRBY3RpdmVGaWx0ZXJOYW1lKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZmlsdGVyW2FjdGl2ZUZpbHRlcl07XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEFjdGl2ZUZpbHRlck5hbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICggdGhpcy5wcm9wcy5hY3RpdmVGaWx0ZXIgJiYgIXRoaXMuc3RhdGUuZmlsdGVyVXBkYXRlZCApID8gdGhpcy5wcm9wcy5hY3RpdmVGaWx0ZXIgOiB0aGlzLnN0YXRlLmFjdGl2ZUZpbHRlcjtcclxuICAgIH07XHJcblxyXG4gICAgc2hvdWxkU2hvd0ZpbHRlcnMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcyAmJiB0aGlzLnByb3BzLml0ZW1zLmxlbmd0aCA+IDMwXHJcbiAgICB9O1xyXG5cclxuICAgIHNldEFjdGl2ZUZpbHRlciA9ICggZmlsdGVyTmFtZSApID0+e1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgYWN0aXZlRmlsdGVyOiBmaWx0ZXJOYW1lLGZpbHRlclVwZGF0ZWQgOiB0cnVlfSlcclxuICAgIH07XHJcblxyXG4gICAgYXBwbHlTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVwZGF0ZWQ6IGZhbHNlLCBmaWx0ZXJVcGRhdGVkIDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5hcHBseVNlbGVjdGlvbih0aGlzLnByb3BzLnR5cGUsIHRoaXMuc3RhdGUuc2VsZWN0ZWRJdGVtLCB0aGlzLnByb3BzLm11bHRpcGxlKTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZWN0SXRlbSA9ICggaXRlbSApID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRJdGVtIDogaXRlbSwgdXBkYXRlZDogdHJ1ZSB9KTtcclxuICAgIH07XHJcblxyXG4gICAgaXNJdGVtU2VsZWN0ZWQgPSAoIGl0ZW0gKSA9PiB7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZS51cGRhdGVkICl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnNlbGVjdGVkSXRlbS5leHRlcm5hbF9pZCA9PT0gaXRlbS5leHRlcm5hbF9pZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNlbGVjdGVkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3RlZC5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICAodGhpcy5wcm9wcy5tdWx0aXBsZSkgPyB0aGlzLnByb3BzLnNlbGVjdGVkWzBdLmV4dGVybmFsX2lkID09PSBpdGVtLmV4dGVybmFsX2lkXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0ZWQuZXh0ZXJuYWxfaWQgPT09IGl0ZW0uZXh0ZXJuYWxfaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmaWx0ZXIgPSAoaXRlbSkgPT57XHJcbiAgICAgICAgbGV0IGZpbHRlciA9IHRoaXMuZ2V0QWN0aXZlRmlsdGVyKCk7XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlci52YWx1ZXMuaW5kZXhPZihpdGVtLm5hbWVbMF0udG9Mb3dlckNhc2UoKSkgIT09IC0xXHJcbiAgICB9O1xyXG5cclxuICAgIGdldEl0ZW1zID0gKCkgPT57XHJcbiAgICAgICAgbGV0IGZpbHRlciA9IHRoaXMuZ2V0QWN0aXZlRmlsdGVyKCk7XHJcbiAgICAgICAgaWYgKCBmaWx0ZXIudHlwZSA9PT0gXCJvcmlnaW5cIiApIHJldHVybiB0aGlzLnByb3BzW2ZpbHRlci52YWx1ZV07XHJcbiAgICAgICAgaWYgKCBmaWx0ZXIudHlwZSA9PT0gXCJmaXJzdExldHRlclwiKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICF0aGlzLnNob3VsZFNob3dGaWx0ZXJzKCkgKSByZXR1cm4gdGhpcy5wcm9wcy5pdGVtcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLml0ZW1zLmZpbHRlcih0aGlzLmZpbHRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWxcclxuICAgICAgICAgICAgICAgIGlzT3Blbj17dGhpcy5wcm9wcy5vcGVufVxyXG4gICAgICAgICAgICAgICAgb25BZnRlck9wZW49e3RoaXMuYWZ0ZXJPcGVuTW9kYWx9XHJcbiAgICAgICAgICAgICAgICBvblJlcXVlc3RDbG9zZT17dGhpcy5jbG9zZU1vZGFsfVxyXG4gICAgICAgICAgICAgICAgYm9keU9wZW5DbGFzc05hbWU9e1wic2VsZWN0b3JcIn1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXtjdXN0b21TdHlsZXN9XHJcbiAgICAgICAgICAgICAgICBjb250ZW50TGFiZWw9XCJFeGFtcGxlIE1vZGFsXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgey8qPGgyIHJlZj17c3VidGl0bGUgPT4gdGhpcy5zdWJ0aXRsZSA9IHN1YnRpdGxlfT5IZWxsbzwvaDI+Ki99XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5wb3B1bGFySXRlbXMgJiZcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJzZWxlY3Rvci1maWx0ZXIgXCIgKyAodGhpcy5nZXRBY3RpdmVGaWx0ZXJOYW1lKCkgPT09IFwicG9wdWxhclwiICYmIFwic2VsZWN0b3ItZmlsdGVyLWFjdGl2ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwicG9wdWxhclwiKX19PlBvcHVsYXI8L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnNob3VsZFNob3dGaWx0ZXJzKCkgJiYgPGJ1dHRvbiBjbGFzc05hbWU9e1wic2VsZWN0b3ItZmlsdGVyIFwiICsgKHRoaXMuZ2V0QWN0aXZlRmlsdGVyTmFtZSgpID09PSBcImFnXCIgJiYgXCJzZWxlY3Rvci1maWx0ZXItYWN0aXZlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnsgdGhpcy5zZXRBY3RpdmVGaWx0ZXIoXCJhZ1wiKX19PkEtRzwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc2hvdWxkU2hvd0ZpbHRlcnMoKSAmJiA8YnV0dG9uIGNsYXNzTmFtZT17XCJzZWxlY3Rvci1maWx0ZXIgXCIgKyAodGhpcy5nZXRBY3RpdmVGaWx0ZXJOYW1lKCkgPT09IFwiaG5cIiAmJiBcInNlbGVjdG9yLWZpbHRlci1hY3RpdmVcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+eyB0aGlzLnNldEFjdGl2ZUZpbHRlcihcImhuXCIpfX0+SC1OPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zaG91bGRTaG93RmlsdGVycygpICYmIDxidXR0b24gY2xhc3NOYW1lPXtcInNlbGVjdG9yLWZpbHRlciBcIiArICh0aGlzLmdldEFjdGl2ZUZpbHRlck5hbWUoKSA9PT0gXCJvdFwiICYmIFwic2VsZWN0b3ItZmlsdGVyLWFjdGl2ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwib3RcIil9fT5PLVQ8L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnNob3VsZFNob3dGaWx0ZXJzKCkgJiYgPGJ1dHRvbiBjbGFzc05hbWU9e1wic2VsZWN0b3ItZmlsdGVyIFwiICsgKHRoaXMuZ2V0QWN0aXZlRmlsdGVyTmFtZSgpID09PSBcInV6XCIgJiYgXCJzZWxlY3Rvci1maWx0ZXItYWN0aXZlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnsgdGhpcy5zZXRBY3RpdmVGaWx0ZXIoXCJ1elwiKX19PlUtWjwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3Rvci1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldEl0ZW1zKCkubWFwKGZ1bmN0aW9uKGl0ZW0sIGkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFNlbGVjdG9ySXRlbSBrZXk9e2l9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXtpdGVtLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBfdGhpcy5zZWxlY3RJdGVtKGl0ZW0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17IF90aGlzLmlzSXRlbVNlbGVjdGVkKGl0ZW0pIH0vPjtcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuY2xvc2VNb2RhbH0+Q2FuY2VsPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmFwcGx5U2VsZWN0aW9ufSBkaXNhYmxlZD17IXRoaXMuc3RhdGUudXBkYXRlZH0+QXBwbHk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PkNhbid0IGZpbmQgeW91ciBzcG9ydCBpbiB0aGUgbGlzdD8gPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5BZGQgbmV3IFNwb3J0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9Nb2RhbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoIHN0YXRlICkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvcGVuIDogc3RhdGUuc2VsZWN0b3JJbmZvLm9wZW4sXHJcbiAgICAgICAgaXRlbXMgOiBzdGF0ZS5zZWxlY3RvckluZm8uc2VsZWN0b3JJdGVtcyxcclxuICAgICAgICBwb3B1bGFySXRlbXM6IHN0YXRlLnNlbGVjdG9ySW5mby5wb3B1bGFySXRlbXMsXHJcbiAgICAgICAgdHlwZSA6IHN0YXRlLnNlbGVjdG9ySW5mby5zZWxlY3RvclR5cGUsXHJcbiAgICAgICAgYWN0aXZlRmlsdGVyOiBzdGF0ZS5zZWxlY3RvckluZm8uYWN0aXZlRmlsdGVyLFxyXG4gICAgICAgIHNlbGVjdGVkIDogc3RhdGVbc3RhdGUuc2VsZWN0b3JJbmZvLnNlbGVjdG9yVHlwZV0sXHJcbiAgICAgICAgbXVsdGlwbGUgOiBzdGF0ZS5zZWxlY3RvckluZm8ubXVsdGlwbGVcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb3BlblNlbGVjdG9yIDogKCkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogJ09QRU5fU0VMRUNUT1InXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgY2xvc2VTZWxlY3RvciA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdDTE9TRV9TRUxFQ1RPUidcclxuICAgICAgICB9KSxcclxuICAgICAgICBhcHBseVNlbGVjdGlvbiA6IChzZWxlY3RvclR5cGUsIHNlbGVjdGVkSXRlbSwgbXVsdGlwbGUpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdBUFBMWV9TRUxFQ1RJT04nLFxyXG4gICAgICAgICAgICBzZWxlY3RvclR5cGUgOiBzZWxlY3RvclR5cGUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbSA6IHNlbGVjdGVkSXRlbSxcclxuICAgICAgICAgICAgbXVsdGlwbGUgOiBtdWx0aXBsZVxyXG4gICAgICAgIH0pLFxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGVjdG9yKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9TZWxlY3Rvci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQYWNrYWdlU2VsZWN0b3IgZnJvbSBcIi4uL2NvbnRhaW5lcnMvUGFja2FnZVNlbGVjdG9yXCI7XHJcbmltcG9ydCBTZWxsQnV0dG9ucyBmcm9tIFwiLi4vY29udGFpbmVycy9idXR0b25zXCI7XHJcbmltcG9ydCBTZWxsRm9ybVN0ZXBzIGZyb20gXCIuLi9jb250YWluZXJzL1NlbGxGb3JtU3RlcHNcIjtcclxuaW1wb3J0IFNlbGxGb3JtU3RlcDEgZnJvbSBcIi4uL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwMVwiO1xyXG5pbXBvcnQgU2VsZWN0b3IgZnJvbSBcIi4uLy4uL21haW4vY29tcG9uZW50cy9TZWxlY3RvclwiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tICcuLi9zdG9yZSc7XHJcblxyXG5cclxuY2xhc3MgU2VsbEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgY29udGVudCA6IEpTT04ucGFyc2UocHJvcHMuY29udGVudClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKGEpID0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzdG9yZS5nZXRTdGF0ZSgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+e1xyXG4gICAgICAgIHRoaXMucHJvcHMuY29udGVudExpc3RpbmdJbml0KCB0aGlzLnN0YXRlLmNvbnRlbnQgKTtcclxuICAgIH0gO1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxTZWxlY3RvciAvPlxyXG4gICAgICAgICAgICAgICAgPFNlbGxGb3JtU3RlcHMgLz5cclxuICAgICAgICAgICAgICAgIDxTZWxsRm9ybVN0ZXAxLz5cclxuICAgICAgICAgICAgICAgIDxQYWNrYWdlU2VsZWN0b3Igey4uLiB0aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgPFNlbGxCdXR0b25zIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICggc3RhdGUsIG93blByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gb3duUHJvcHM7XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvbnRlbnRMaXN0aW5nSW5pdCA6IChjb250ZW50KSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnQ09OVEVOVF9JTklUJyxcclxuICAgICAgICAgICAgY29udGVudDogY29udGVudFxyXG4gICAgICAgIH0pLFxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxGb3JtKVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9TZWxsRm9ybS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuXHJcbmNvbnN0IFN1cGVyUmlnaHQgPSAoe3N1cGVyUmlnaHQsIG9uQ2hhbmdlLCBjaGVja2VkfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3QtYm94LWl0ZW1cIiA+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3QtYm94LWNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxyXG4gICAgICAgICAgICAgICAgICAgZGVmYXVsdENoZWNrZWQ9e2NoZWNrZWR9XHJcbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ICgpID0+IG9uQ2hhbmdlKHN1cGVyUmlnaHQpfVxyXG4gICAgICAgICAgICAgICAgICAgaWQ9e1wic3VwZXItcmlnaHQtXCIgKyBzdXBlclJpZ2h0LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicGFja2FnZS1zZWxlY3RvclwiIC8+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17XCJzdXBlci1yaWdodC1cIiArIHN1cGVyUmlnaHQuaWR9PjwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3QtYm94LWl0ZW0tbGFiZWxcIj5cclxuICAgICAgICAgICAgeyBzdXBlclJpZ2h0Lm5hbWUgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5jbGFzcyBQYWNrYWdlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcGFja2FnZXMgOiBKU09OLnBhcnNlKHByb3BzLnBhY2thZ2VzKSxcclxuICAgICAgICAgICAgY29udGVudCA6IEpTT04ucGFyc2UocHJvcHMuY29udGVudClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zdGVwID09PSAyICYmIDxkaXYgY2xhc3NOYW1lPVwiYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3gtdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUGljayByaWdodHNcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGxlci1ib3gtY29udGVudCBzZWxsZXItYm94LXBhY2thZ2VzXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUucGFja2FnZXMubWFwKGZ1bmN0aW9uKHN1cGVyUmlnaHQsIGkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxTdXBlclJpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtzdXBlclJpZ2h0LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyUmlnaHQ9e3N1cGVyUmlnaHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17IENvbnRlbnRBcmVuYS5VdGlscy5nZXRJbmRleCggc3VwZXJSaWdodC5pZCwgX3RoaXMuc3RhdGUuY29udGVudC5yaWdodHNfcGFja2FnZSwgXCJpZFwiKSAhPT0gLTEgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgX3RoaXMucHJvcHMuc3VwZXJSaWdodHNVcGRhdGVkIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdGVwIDogc3RhdGUuc3RlcCxcclxuICAgICAgICBzdXBlclJpZ2h0cyA6IHN0YXRlLnN1cGVyUmlnaHRzXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1cGVyUmlnaHRzVXBkYXRlZCA6IChyaWdodHNfcGFja2FnZSkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogJ1NVUEVSX1JJR0hUU19VUERBVEVEJyxcclxuICAgICAgICAgICAgcmlnaHRzX3BhY2thZ2U6IHJpZ2h0c19wYWNrYWdlXHJcbiAgICAgICAgfSksXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoUGFja2FnZVNlbGVjdG9yKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9QYWNrYWdlU2VsZWN0b3IuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcblxyXG5jb25zdCBTZWxsRm9ybVN0ZXAgPSAoe3N0ZXAsIGFjdGl2ZSwgdGl0bGV9KSA9PiAoXHJcbiAgICA8ZGl2ICBjbGFzc05hbWU9e1wic3RlcCBcIiArIChhY3RpdmUgJiYgXCJzdGVwLWFjdGl2ZVwiKSB9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1sYWJlbFwiPlxyXG4gICAgICAgICAgICBTdGVwIHsgc3RlcCB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLXRpdGxlXCI+XHJcbiAgICAgICAgICAgIHt0aXRsZX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtaWNvblwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5jbGFzcyBTZWxsRm9ybVN0ZXBzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHN0ZXBzOiBbXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogMSwgdGl0bGU6IFwiRXZlbnQgc2VsZWN0aW9uXCJ9LFxyXG4gICAgICAgICAgICAgICAge3N0ZXA6IDIsIHRpdGxlOiBcIkNvbmZpZ3VyZSByaWdodHNcIn0sXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogMywgdGl0bGU6IFwiRGlzdHJpYnV0aW9uIHN0eWxlXCJ9LFxyXG4gICAgICAgICAgICAgICAge3N0ZXA6IDQsIHRpdGxlOiBcIlByaWNlLCBwYXltZW50IGFuZCBsaXN0aW5nIGRldGFpbHNcIn0sXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogNSwgdGl0bGU6IFwiQ29uZmlybVwifVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5zdGVwcy5tYXAoKHN0ZXAsIGkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxTZWxsRm9ybVN0ZXAga2V5PXtpfSBzdGVwPXtzdGVwLnN0ZXB9IHRpdGxlPXtzdGVwLnRpdGxlfSBhY3RpdmU9e190aGlzLnByb3BzLnN0ZXAgPT09IHN0ZXAuc3RlcH0vPlxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RlcCA6IHN0YXRlLnN0ZXAsXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxGb3JtU3RlcHMpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb250YWluZXJzL1NlbGxGb3JtU3RlcHMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4uL3N0b3JlJztcclxuXHJcbmNsYXNzIFNlbGxCdXR0b25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIGxhc3RTdGVwIDogcHJvcHMubGFzdFN0ZXAgfHwgNSxcclxuICAgICAgICAgICAgc2F2aW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNhdmluZ1N1Y2Nlc3M6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQXNEcmFmdCA9ICgpID0+IHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLnNldFN0YXRlKHsgc2F2aW5nIDogdHJ1ZSB9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5zYXZlQ29udGVudEFzRHJhZnQoc3RvcmUuZ2V0U3RhdGUoKSkuZG9uZShmdW5jdGlvbiAoIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IHNhdmluZyA6IGZhbHNlLCBzYXZpbmdTdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IHNhdmluZyA6IGZhbHNlLCBzYXZpbmdTdWNjZXNzOiBmYWxzZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBsZXQgc2F2ZUFzRHJhZnRUZXh0ID0gKHRoaXMuc3RhdGUuc2F2aW5nKSA/IFwiU2F2aW5nLi5cIiA6ICh0aGlzLnN0YXRlLnNhdmluZ1N1Y2Nlc3MpID8gXCJTYXZlZCBhcyBEcmFmdFwiIDogXCJTYXZlIGFzIERyYWZ0XCI7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9ucy1jb250YWluZXJcIiA+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3RlcCAhPT0gMSAmJlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInByZXZpb3VzLXN0ZXBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdGFuZGFyZC1idXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5wcm9wcy5nb1RvUHJldmlvdXNTdGVwIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYXJyb3ctbGVmdFwiPjwvaT4gQmFja1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+IH1cclxuXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvblwiIG9uQ2xpY2s9eyB0aGlzLnNhdmVBc0RyYWZ0IH0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuc2F2aW5nfT5cclxuICAgICAgICAgICAgICAgICAgICB7IHNhdmVBc0RyYWZ0VGV4dCB9eyB0aGlzLnN0YXRlLnNhdmluZyAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiPjwvaT59XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3RlcCA9PT0gdGhpcy5zdGF0ZS5sYXN0U3RlcCAmJlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImRyYWZ0LWxpc3RpbmdcIiBjbGFzc05hbWU9XCJzdGFuZGFyZC1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICBTdWJtaXQgTGlzdGluZ1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+IH1cclxuXHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3RlcCAhPT0gdGhpcy5zdGF0ZS5sYXN0U3RlcCAmJlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIm5leHQtc3RlcFwiIGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvblwiIG9uQ2xpY2s9eyAoKSA9PiB0aGlzLnByb3BzLmdvVG9OZXh0U3RlcCgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgTmV4dCA8aSBjbGFzc05hbWU9XCJmYSBmYS1hcnJvdy1yaWdodFwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPiB9XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0ZXAgOiBzdGF0ZS5zdGVwXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdvVG9OZXh0U3RlcCA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdHT19UT19ORVhUX1NURVAnXHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAgIGdvVG9QcmV2aW91c1N0ZXAgOiAoKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnR09fVE9fUFJFVklPVVNfU1RFUCdcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxCdXR0b25zKVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvYnV0dG9ucy5qcyIsImNvbnN0IGNvbnRlbnQgPSAoc3RhdGUgPSB7XHJcbiAgICBzdGVwOiAxLFxyXG4gICAgcmlnaHRzX3BhY2thZ2UgOiBbXSxcclxuICAgIHNlbGVjdG9ySW5mbyA6IHtcclxuICAgICAgICB0eXBlOiBcInNwb3J0XCIsXHJcbiAgICAgICAgb3BlbiA6IGZhbHNlLFxyXG4gICAgICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxyXG4gICAgICAgIHBvcHVsYXJJdGVtczogW11cclxuICAgIH0sXHJcbiAgICBjYXRlZ29yeSA6IG51bGwsXHJcbiAgICBzcG9ydHMgOiBbXVxyXG59LCBhY3Rpb24pID0+IHtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnQ09OVEVOVF9JTklUJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uY29udGVudCk7XHJcbiAgICAgICAgY2FzZSAnR09fVE9fTkVYVF9TVEVQJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzdGVwOiBzdGF0ZS5zdGVwICsgMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlICdHT19UT19QUkVWSU9VU19TVEVQJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzdGVwOiBzdGF0ZS5zdGVwIC0gMVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2FzZSAnVVBEQVRFX0NPTlRFTlRfVkFMVUUnOlxyXG4gICAgICAgICAgICBsZXQgbmV3U3RhdGUgPSB7fTtcclxuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLmtleV0gPSBhY3Rpb24udmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xyXG5cclxuXHJcbiAgICAgICAgY2FzZSAnT1BFTl9TRUxFQ1RPUic6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBhY3Rpb24uc2VsZWN0b3JUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IGFjdGlvbi5zZWxlY3Rvckl0ZW1zLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvcHVsYXJJdGVtczogYWN0aW9uLnBvcHVsYXJJdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVGaWx0ZXIgOiBhY3Rpb24uYWN0aXZlRmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxlIDogYWN0aW9uLm11bHRpcGxlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgJ0NMT1NFX1NFTEVDVE9SJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvckluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvclR5cGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbiA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvcHVsYXJJdGVtczogW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhc2UgJ0FQUExZX1NFTEVDVElPTic6XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW4gOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzZWxlY3Rpb25bYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSAoYWN0aW9uLm11bHRpcGxlICkgPyBbYWN0aW9uLnNlbGVjdGVkSXRlbV0gOiBhY3Rpb24uc2VsZWN0ZWRJdGVtO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBzZWxlY3Rpb24pO1xyXG5cclxuICAgICAgICBjYXNlICdTVVBFUl9SSUdIVFNfVVBEQVRFRCc6XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNVUEVSX1JJR0hUU19VUERBVEVEXCIpO1xyXG4gICAgICAgICAgICBsZXQgcmlnaHRzX3BhY2thZ2UgPSBzdGF0ZS5yaWdodHNfcGFja2FnZTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gQ29udGVudEFyZW5hLlV0aWxzLmdldEluZGV4KGFjdGlvbi5yaWdodHNfcGFja2FnZS5pZCwgcmlnaHRzX3BhY2thZ2UsIFwiaWRcIik7XHJcbiAgICAgICAgICAgIGlmICggIGluZGV4ID09PSAtMSApe1xyXG4gICAgICAgICAgICAgICAgcmlnaHRzX3BhY2thZ2UucHVzaChhY3Rpb24ucmlnaHRzX3BhY2thZ2UpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByaWdodHNfcGFja2FnZS5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRzX3BhY2thZ2U6IHJpZ2h0c19wYWNrYWdlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRlbnRcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9jb250ZW50LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgU2VsbEZvcm0gZnJvbSBcIi4vY29tcG9uZW50cy9TZWxsRm9ybVwiO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XHJcblxyXG5jb25zdCBzZWxsRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxsLWZvcm0tY29udGFpbmVyJyk7XHJcblxyXG5SZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgICAgICA8U2VsbEZvcm0gey4uLnNlbGxGb3JtLmRhdGFzZXQgfSAvPlxyXG4gICAgPC9Qcm92aWRlcj4sXHJcbiAgICBzZWxsRm9ybVxyXG4pO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXJzIGFsbCB0aGUgdG9vbHRpcHNcclxuICAgICAqL1xyXG4gICAgJCggZG9jdW1lbnQgKS50b29sdGlwKCk7XHJcblxyXG4gICAgJChcIi5oYXMtZGF0ZXBpY2tlclwiKS5kYXRlcGlja2VyKCk7XHJcblxyXG4gICAgJChcImlucHV0XCIpLm9uKCdmb2N1cycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImludmFsaWRcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLm9wdGlvbmFsXCIpLmhpZGUoKTtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zZWxsLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgd2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XHJcbiAgICBDb250ZW50QXJlbmEuTW9kZWwgPSBDb250ZW50QXJlbmEuTW9kZWwgfHwge307XHJcbiAgICBDb250ZW50QXJlbmEuRm9ybSA9IENvbnRlbnRBcmVuYS5Gb3JtIHx8IHt9O1xyXG4gICAgQ29udGVudEFyZW5hLlRlc3QgPSBDb250ZW50QXJlbmEuVGVzdCB8fCB7fTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuRm9ybS5hZGRDdXN0b21TZWFzb24gPSBmdW5jdGlvbiggaWQsIGNvbnRhaW5lclNlbGVjdG9yICl7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoY29udGFpbmVyU2VsZWN0b3IgfHwgXCIjZXZlbnQtc2NoZWR1bGUtc3ViaXRlbXNcIiksXHJcbiAgICAgICAgICAgIHNlYXNvbk51bWJlciA9ICQoXCIuY3VzdG9tLXNlYXNvbi1jb250YWluZXJcIiwgY29udGFpbmVyKS5sZW5ndGggKyAxLFxyXG4gICAgICAgICAgICBzb3VyY2UgPSAkKFwiI2V2ZW50LXNlYXNvbi1zZWxlY3RvclwiKS5hdXRvY29tcGxldGUoIFwib3B0aW9uXCIsIFwic291cmNlXCIgKSxcclxuICAgICAgICAgICAgaGFzU2Vhc29uID0gc291cmNlLmxlbmd0aCA+IDAsXHJcbiAgICAgICAgICAgIGxhYmVscyA9IChoYXNTZWFzb24pID8gc291cmNlWzBdLmxhYmVsLnNwbGl0KFwiIFwiKSA6IFtdLFxyXG4gICAgICAgICAgICBzZWFzb25ZZWFyID0gKGhhc1NlYXNvbikgPyBsYWJlbHMucG9wKCkgOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLFxyXG4gICAgICAgICAgICBzdGFydFllYXIgPSAoaGFzU2Vhc29uKSA/ICggc2Vhc29uWWVhci5zZWFyY2goXCIvXCIpICE9PSAtMSApID8gTnVtYmVyKHNlYXNvblllYXIuc3BsaXQoXCIvXCIpWzBdKSArIHNlYXNvbk51bWJlciA6IE51bWJlcihzZWFzb25ZZWFyKSArIHNlYXNvbk51bWJlciA6IHNlYXNvblllYXIgLFxyXG4gICAgICAgICAgICBlbmRZZWFyID0gKGhhc1NlYXNvbikgPyAoIHNlYXNvblllYXIuc2VhcmNoKFwiL1wiKSAhPT0gLTEgKSA/IE51bWJlcihzZWFzb25ZZWFyLnNwbGl0KFwiL1wiKVsxXSkgKyBzZWFzb25OdW1iZXIgOiBudWxsIDogc2Vhc29uWWVhciAsXHJcbiAgICAgICAgICAgIHNlYXNvbk5hbWUgPSAoaGFzU2Vhc29uKSA/IGxhYmVscy5qb2luKFwiIFwiKSA6IFwiXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gJC50ZW1wbGF0ZXMoXCIjc2Vhc29uLXRlbXBsYXRlXCIpLFxyXG4gICAgICAgICAgICBzZWFzb25EYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgaWQgOiBzZWFzb25OdW1iZXIsXHJcbiAgICAgICAgICAgICAgICBuYW1lIDogc2Vhc29uTmFtZSxcclxuICAgICAgICAgICAgICAgIHN0YXJ0WWVhcjogc3RhcnRZZWFyLFxyXG4gICAgICAgICAgICAgICAgZW5kWWVhcjogZW5kWWVhclxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZWFzb25FbGVtZW50ID0gJCh0ZW1wbGF0ZS5yZW5kZXIoc2Vhc29uRGF0YSkpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kKCBzZWFzb25FbGVtZW50ICk7XHJcblxyXG4gICAgICAgICQoXCIucmVtb3ZlLXNlYXNvblwiLCBzZWFzb25FbGVtZW50ICkub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlYXNvbkVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQ29udGVudEFyZW5hLkNvbnRlbnQgPSBuZXcgQ29udGVudEFyZW5hLk1vZGVsLkNvbnRlbnQoKTtcclxuXHJcbiAgICB2YXIgcm91bmRzID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gZmlsbFNlYXNvbnMoKXtcclxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgc2VsZWN0b3IgOiBcIiNldmVudC1zZWFzb24tc2VsZWN0b3JcIixcclxuICAgICAgICAgICAgcGFyZW50U2VsZWN0aW9uIDogXCIjZXZlbnQtdG91cm5hbWVudC1zZWxlY3RvclwiLFxyXG4gICAgICAgICAgICBlbmRwb2ludCA6IFwidjEvZmVlZC9zZWFzb25zXCIsXHJcbiAgICAgICAgICAgIHJlcXVlc3RUeXBlIDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3sgc2Vhc29uczogeyBzZWFzb246IG9iamVjdH19fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7Kn1cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGdldFNvdXJjZSA6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbGlzdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnNlYXNvbnMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5zZWFzb25zLnNlYXNvbiA9PT0gdW5kZWZpbmVkICkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggJC5pc0FycmF5KHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uKSApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSAkLm1hcChyZXNwb25zZS5zZWFzb25zLnNlYXNvbiwgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtsYWJlbDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLCB2YWx1ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBbe2xhYmVsOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5uYW1lLCB2YWx1ZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uaWR9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwgOiBcIkFkZCBuZXdcIixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IFwibmV3XCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0O1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBlbCA9ICQob3B0aW9ucy5zZWxlY3RvciksXHJcbiAgICAgICAgICAgIHNwaW5uZXIgPSBlbC5wYXJlbnQoKS5maW5kKFwiaVwiKSxcclxuICAgICAgICAgICAgc291cmNlO1xyXG5cclxuICAgICAgICBzcGlubmVyLnNob3coKTtcclxuXHJcbiAgICAgICAgZWwuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgaWYgKCBlbC5kYXRhKCdhdXRvY29tcGxldGUnKSApIGVsLmF1dG9jb21wbGV0ZSgnZGVzdHJveScpLm9mZigpO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGhvc3R1cmwgKyBvcHRpb25zLmVuZHBvaW50LFxyXG4gICAgICAgICAgICB0eXBlOiBvcHRpb25zLnJlcXVlc3RUeXBlIHx8IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogJChvcHRpb25zLnBhcmVudFNlbGVjdGlvbikuYXR0cignZXh0ZXJuYWxJZCcpIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHNvdXJjZSA9IG9wdGlvbnMuZ2V0U291cmNlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIGVsLmF0dHIoXCJkaXNhYmxlZFwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIGVsLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBzb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluTGVuZ3RoIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IGF1dG9jb21wbGV0ZSBwbHVnaW4gZGVmYXVsdCBhY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdWkuaXRlbS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCBuZXcgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHNlbGVjdGVkID09PSBcIm5ld1wiICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FkZEN1c3RvbVRlbXBsYXRlKCBmYWxzZSwgZmFsc2UsIGZhbHNlICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuRm9ybS5hZGRDdXN0b21TZWFzb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5jdXN0b20tdGVtcGxhdGUtaXRlbVwiKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IHNlbGVjdGVkLnJlcGxhY2UoL1xcOi9nLCAnLScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSAkLmdyZXAoc291cmNlLCBmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbC52YWx1ZSAhPT0gdWkuaXRlbS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2V2ZW50LXNjaGVkdWxlLXN1Yml0ZW1zJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJzdGVwMS1ldmVudC1zdWJpdGVtLXRpdGxlIHN0YW5kYXJkLWJ1dHRvbi1hY3RpdmUgc2Vhc29uXCIgIG1haW5yZWY9XCInKyBpZCArJ1wiPicrdWkuaXRlbS5sYWJlbCsnPC9kaXY+PGRpdiBjbGFzcz1cInN0ZXAxLWV2ZW50LXN1Yml0ZW1zLWNvbnRhaW5lclwiPjxkaXYgY2xhc3M9XCJzdGVwMS1ldmVudC1zdWJpdGVtLXRpdGxlXCIgcmVmPVwiJysgaWQgKydcIiA+Rml4dHVyZTwvZGl2PjxkaXYgY2xhc3M9XCJzdGVwMS1ldmVudC1zdWJpdGVtcy1jb250YWluZXIgaXMtaGlkZGVuXCIgaWQ9XCInKyBpZCArJ1wiID48aSBjbGFzcz1cImZhIGZhLWNvZyBmYS1zcGluIHBvcy1yZWxcIj48L2k+PC9kaXY+PC9kaXY+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiW3JlZj1cIitpZCtcIl1cIikub24oIFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0b3IgPSAkKFwiI1wiK2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJzdGFuZGFyZC1idXR0b24tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvci5maW5kKFwiaVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIlttYWlucmVmPVwiK2lkK1wiXVwiKS5vbiggXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5uZXh0KCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLnVuc2hpZnQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsIDogdWkuaXRlbS5sYWJlbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IHVpLml0ZW0udmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoIGV2ZW50LnRhcmdldCApLmF1dG9jb21wbGV0ZSggXCJvcHRpb25cIiwgXCJzb3VyY2VcIiwgc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxTY2hlZHVsZShpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZm9jdXMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZShcInNlYXJjaFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHNwaW5uZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZmlsbFNjaGVkdWxlKCBpZCApe1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogaG9zdHVybCArIFwidjEvZmVlZC9zY2hlZHVsZXNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogaWQucmVwbGFjZSgvXFwtL2csICc6JykgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3Nwb3J0X2V2ZW50czoge3Nwb3J0X2V2ZW50Ont0b3VybmFtZW50X3JvdW5kOm9iamVjdH19fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBzb3VyY2UgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvciA9ICQoJyMnICsgaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3BvcnRfZXZlbnRzICYmIHJlc3BvbnNlLnNwb3J0X2V2ZW50cy5zcG9ydF9ldmVudCApe1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChyZXNwb25zZS5zcG9ydF9ldmVudHMuc3BvcnRfZXZlbnQsIGZ1bmN0aW9uIChrLCBpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2Vhc29uX2lkID0gaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3VuZCA9IGl0ZW0udG91cm5hbWVudF9yb3VuZFsnQGF0dHJpYnV0ZXMnXS5udW1iZXIgfHwgaXRlbS50b3VybmFtZW50X3JvdW5kWydAYXR0cmlidXRlcyddLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHJvdW5kc1tzZWFzb25faWRdID09PSB1bmRlZmluZWQpIHJvdW5kc1tzZWFzb25faWRdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcm91bmRzW3NlYXNvbl9pZF1bcm91bmRdID09PSB1bmRlZmluZWQgKSByb3VuZHNbc2Vhc29uX2lkXVtyb3VuZF0gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm91bmRzW3NlYXNvbl9pZF1bcm91bmRdLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UgPSAkLm1hcChyb3VuZHNbaWRdLCBmdW5jdGlvbiAoaXRlbSwgaykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBrID09PSAndW5kZWZpbmVkJyApIGsgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2xhYmVsOiBcIk1hdGNoZGF5IFwiICsgaywgdmFsdWU6IFwibWF0Y2hkYXktXCIra31cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAkLmVhY2goIHNvdXJjZSwgZnVuY3Rpb24oaywgaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdW5kTnVtYmVyID0gaXRlbS52YWx1ZS5yZXBsYWNlKFwibWF0Y2hkYXktXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyMnICsgaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJzdGVwMS1ldmVudC1zdWJpdGVtLXRpdGxlIG1hdGNoZGF5LXN1Yml0ZW1cIiByZWY9XCInK2lkICsgJy0nICsgIGl0ZW0udmFsdWUgKydcIiA+JytpdGVtLmxhYmVsKyc8L2Rpdj48ZGl2IGNsYXNzPVwic3RlcDEtZXZlbnQtc3ViaXRlbXMtY29udGFpbmVyIGlzLWhpZGRlblwiIGlkPVwiJysgaWQgKyAnLScgK2l0ZW0udmFsdWUgKydcIiA+PC9kaXY+Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7e2NvbXBldGl0b3JzOntjb21wZXRpdG9yfX19IG1hdGNoXHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKCByb3VuZHNbaWRdW3JvdW5kTnVtYmVyXSwgZnVuY3Rpb24oaywgbWF0Y2gpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnMgPSBtYXRjaFsnQGF0dHJpYnV0ZXMnXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBldGl0b3JzID0gbWF0Y2guY29tcGV0aXRvcnMuY29tcGV0aXRvcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsICs9IG5ldyBEYXRlKGF0dHJzLnNjaGVkdWxlZCkudG9JU09TdHJpbmcoKS5zcGxpdCgnVCcpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCArPSBcIiAtIFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGNvbXBldGl0b3JzLCBmdW5jdGlvbihrLCB2KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsICs9IHZbJ0BhdHRyaWJ1dGVzJ10ubmFtZSArIFwiIFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsSWQgPSBcIm1hdGNoLVwiICsgbWF0Y2hbJ0BhdHRyaWJ1dGVzJ10uaWQuc3BsaXQoXCI6XCIpWzJdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycrIGlkICsgJy0nICsgaXRlbS52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJzxkaXYgY2xhc3M9XCJzdGVwMS1ldmVudC1zdWJpdGVtLXRpdGxlXCIgcmVmPVwiJysgaWQgKyAnLScgKyBpdGVtLnZhbHVlICsnXCIgaWQ9XCInKyAgbWF0Y2hbJ0BhdHRyaWJ1dGVzJ10uaWQgKydcIiBzZWxJZD1cIicrc2VsSWQrJ1wiID4nK2xhYmVsKyc8L2Rpdj4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCJbc2VsSWQ9XCIrICBzZWxJZCArIFwiXVwiKS5kYXRhKG1hdGNoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rvci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJzdGVwMS1ldmVudC1zdWJpdGVtLXRpdGxlIG1hdGNoZGF5LXN1Yml0ZW0tc2hvd2FsbFwiID5TaG93IEFsbDwvZGl2PicpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3IuZmluZChcImlcIikucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIi5tYXRjaGRheS1zdWJpdGVtOm50aC1jaGlsZChuKzE4KVwiLCBcIiNcIisgaWQpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLm1hdGNoZGF5LXN1Yml0ZW0tc2hvd2FsbFwiLCBcIiNcIisgaWQpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLm1hdGNoZGF5LXN1Yml0ZW06bnRoLWNoaWxkKG4rMTgpXCIsIFwiI1wiKyBpZCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiK2lkICsgXCIgLnN0ZXAxLWV2ZW50LXN1Yml0ZW0tdGl0bGVcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1Ykl0ZW1JZCA9ICQodGhpcykuYXR0cihcInJlZlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcInN0YW5kYXJkLWJ1dHRvbi1hY3RpdmVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggJCh0aGlzKS5hdHRyKFwiaWRcIikgIT09IHVuZGVmaW5lZCApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoICQodGhpcykuaGFzQ2xhc3MoXCJzdGFuZGFyZC1idXR0b24tYWN0aXZlXCIpICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnKyBzdWJJdGVtSWQpLnNob3coKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyMnKyBzdWJJdGVtSWQpLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGh0bWxJZFRvQXBpSWQoIGlkKXtcclxuICAgICAgICByZXR1cm4gaWQucmVwbGFjZSgvXFwtL2csICc6Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVTdGVwT25lKCl7XHJcblxyXG4gICAgICAgIHZhciBzZWFzb24gPSAkKFwiLnNlYXNvblwiKSxcclxuICAgICAgICAgICAgc3BvcnRzID0gW10sXHJcbiAgICAgICAgICAgIHdlYnNpdGUgPSAkKFwiI2V2ZW50LXdlYnNpdGUtc2VsZWN0b3JcIiksXHJcbiAgICAgICAgICAgIGhhc0Vycm9ycyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAkKCBcIi5zdGVwMS1ldmVudC1pdGVtXCIgKS5lYWNoKGZ1bmN0aW9uKGssIGl0ZW0pe1xyXG5cclxuICAgICAgICAgICAgdmFyIGl0ZW1JbnB1dCA9ICQoaXRlbSkuZmluZChcIi5jb250ZW50LWlucHV0Om5vdCgnLnNwb3J0LXNlbGVjdG9yJylcIiksXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZCA9IGl0ZW1JbnB1dC5pcyhcIjp2aXNpYmxlXCIpICYmIGl0ZW1JbnB1dC5hdHRyKFwicmVxdWlyZWRcIiksXHJcbiAgICAgICAgICAgICAgICBuYW1lID0gKGl0ZW1JbnB1dC5hdHRyKFwiaWRcIikpID8gaXRlbUlucHV0LmF0dHIoXCJpZFwiKS5zcGxpdChcIi1cIilbMV0gOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDtcclxuXHJcbiAgICAgICAgICAgIGlmICggaXRlbUlucHV0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWxJZCA9IGl0ZW1JbnB1dC5hdHRyKFwiZXh0ZXJuYWxJZFwiKTtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gaXRlbUlucHV0LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggdmFsdWUgKXtcclxuICAgICAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudFtuYW1lXSA9IENvbnRlbnRBcmVuYS5Db250ZW50W25hbWVdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50W25hbWVdLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBleHRlcm5hbElkICkgQ29udGVudEFyZW5hLkNvbnRlbnRbbmFtZV0uZXh0ZXJuYWxJZCA9IGV4dGVybmFsSWQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50W25hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCAhdmFsdWUgJiYgcmVxdWlyZWQgKXtcclxuICAgICAgICAgICAgICAgICQoaXRlbUlucHV0KS5hZGRDbGFzcyhcImludmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIHdlYnNpdGUudmFsKCkgIT09IFwiXCIgKXtcclxuICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQud2Vic2l0ZSA9IHdlYnNpdGUudmFsKCkuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBDb250ZW50QXJlbmEuQ29udGVudC5ldmVudFR5cGUgPT09IFwiY3VzdG9tXCIpe1xyXG4gICAgICAgICAgICAkKFwiLnNwb3J0LXNlbGVjdG9yXCIpLmVhY2goIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzcG9ydHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiAkKHRoaXMpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4dGVybmFsSWQgOiAkKHRoaXMpLmF0dHIoXCJleHRlcm5hbElkXCIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNwb3J0cy5wdXNoKENvbnRlbnRBcmVuYS5Db250ZW50LnNwb3J0KTtcclxuICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuc3BvcnRzID0gc3BvcnRzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKENvbnRlbnRBcmVuYS5Db250ZW50LmV2ZW50VHlwZSA9PT0gJ2RhdGFiYXNlJyApe1xyXG5cclxuICAgICAgICAgICAgLy8gU0VBU09OXHJcbiAgICAgICAgICAgIGlmICggc2Vhc29uLmxlbmd0aCA+IDAgKXtcclxuICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LnNlYXNvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHNlYXNvbi5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuc2Vhc29ucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiAkKHRoaXMpLmh0bWwoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZCA6IGh0bWxJZFRvQXBpSWQoJCh0aGlzKS5hdHRyKFwibWFpbnJlZlwiKSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5tYXRjaGVzID0ge307XHJcblxyXG4gICAgICAgICAgICAkKFwiLnN0ZXAxLWV2ZW50LXN1Yml0ZW0tdGl0bGUuc3RhbmRhcmQtYnV0dG9uLWFjdGl2ZVwiKS5lYWNoKGZ1bmN0aW9uKGssdil7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hkYXkgPSAkKHYpLmF0dHIoXCJyZWZcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hJZCA9ICQodikuYXR0cihcImlkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggbWF0Y2hJZCA9PT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBDb250ZW50QXJlbmEuQ29udGVudC5tYXRjaGVzW21hdGNoZGF5XSA9PT0gdW5kZWZpbmVkICkgQ29udGVudEFyZW5hLkNvbnRlbnQubWF0Y2hlc1ttYXRjaGRheV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQubWF0Y2hlc1ttYXRjaGRheV0ucHVzaCgkKHYpLmRhdGEoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIiNldmVudC10aXRsZVwiKS5odG1sKCBDb250ZW50QXJlbmEuQ29udGVudC5nZXRUaXRsZSgpICk7XHJcblxyXG4gICAgICAgIHJldHVybiAhaGFzRXJyb3JzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEN1c3RvbUZuKCBlbCwgcGxhY2Vob2xkZXIgKXtcclxuICAgICAgICAkKGVsKVxyXG4gICAgICAgICAgICAub2ZmKClcclxuICAgICAgICAgICAgLnZhbChcIlwiKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJjdXN0b20taW5wdXRcIilcclxuICAgICAgICAgICAgLnNob3coKVxyXG4gICAgICAgICAgICAuYXR0cihcInBsYWNlaG9sZGVyXCIsIHBsYWNlaG9sZGVyKTtcclxuXHJcbiAgICAgICAgaWYgKCAkKGVsKS5kYXRhKCd1aS1hdXRvY29tcGxldGUnKSAhPT0gdW5kZWZpbmVkICkgJChlbCkuYXV0b2NvbXBsZXRlKCdkZXN0cm95Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ3VzdG9tVGVtcGxhdGUoIHNwb3J0LCBjYXRlZ29yeSwgdG91cm5hbWVudCl7XHJcblxyXG4gICAgICAgIGlmICggc3BvcnQgKSBhZGRDdXN0b21GbihcIiNldmVudC1zcG9ydC1zZWxlY3RvclwiLCBcIkVudGVyIHNwb3J0IG5hbWVcIik7XHJcblxyXG4gICAgICAgIGlmICggQ29udGVudEFyZW5hLkNvbnRlbnQuZXZlbnRUeXBlID09PSBcImN1c3RvbVwiICkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIGNhdGVnb3J5ICkgYWRkQ3VzdG9tRm4oXCIjZXZlbnQtY2F0ZWdvcnktc2VsZWN0b3JcIiwgXCJFbnRlciBDb3VudHJ5L0NhdGVnb3J5XCIpO1xyXG4gICAgICAgIGlmICggdG91cm5hbWVudCApIGFkZEN1c3RvbUZuKFwiI2V2ZW50LXRvdXJuYW1lbnQtc2VsZWN0b3JcIiwgXCJFbnRlciBUb3VybmFtZW50XCIpO1xyXG4gICAgICAgIC8qYWRkQ3VzdG9tRm4oXCIjZXZlbnQtc2Vhc29uLXNlbGVjdG9yXCIsIFwiRW50ZXIgU2Vhc29uXCIpO1xyXG4gICAgICAgICQoXCIjZXZlbnQtc2NoZWR1bGUtc3ViaXRlbXNcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAkKFwiLmN1c3RvbS10ZW1wbGF0ZS1pdGVtXCIpLnNob3coKTtcclxuICAgICAgICAkKFwiLmN1c3RvbS10ZW1wbGF0ZS1pdGVtXCIpLmNoaWxkcmVuKCkuc2hvdygpOyovXHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Gb3JtLmFkZEN1c3RvbVNlYXNvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFNwb3J0TGF5ZXIoKXtcclxuXHJcbiAgICAgICAgdmFyIHNwb3J0U2VsZWN0b3IgPSAkKFwiLnNwb3J0LXNlbGVjdG9yXCIpLFxyXG4gICAgICAgICAgICBleHRyYVNwb3J0cyA9IHNwb3J0U2VsZWN0b3IubGVuZ3RoLFxyXG4gICAgICAgICAgICBpZCA9IFwic3BvcnQtc2VsZWN0b3ItXCIgKyAoZXh0cmFTcG9ydHMgKyAxKSxcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSAkLnRlbXBsYXRlcyhcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz1cXFwic3RlcDEtZXZlbnQtaXRlbVxcXCI+XFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCIgICA8aSBjbGFzcz1cXFwiZmEgZmEtY29nIGZhLXNwaW5cXFwiPjwvaT5cXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIiAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJTcG9ydFxcXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIiAgICAgICAgICBpZD1cXFwie3s6aWR9fVxcXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIiAgICAgICAgICBjbGFzcz1cXFwiY29udGVudC1pbnB1dCBzcG9ydC1zZWxlY3RvclxcXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIiAgICAgICAgICByZXF1aXJlZC8+IFwiICtcclxuICAgICAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwicmVtb3ZlLWJ1dHRvblxcXCI+UmVtb3ZlPC9idXR0b24+XFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiksXHJcbiAgICAgICAgICAgIGh0bWxPdXRwdXQgPSB0ZW1wbGF0ZS5yZW5kZXIoe2lkOiBpZCB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoZXh0cmFTcG9ydHM9PT0wKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZnRlcihodG1sT3V0cHV0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzcG9ydFNlbGVjdG9yLmxhc3QoKS5wYXJlbnQoKS5hZnRlcihodG1sT3V0cHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjXCIraWQpLnBhcmVudCgpLmZpbmQoJ2J1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHNwb3J0U2VsZWN0b3IubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgICAgICQoXCIjZXZlbnQtdG91cm5hbWVudC1zZWxlY3RvciwgI2V2ZW50LXNlYXNvbi1zZWxlY3RvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5ldmVudFR5cGUgPSBcImRhdGFiYXNlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIiNldmVudC1jYXRlZ29yeS1zZWxlY3RvciwgI2V2ZW50LXRvdXJuYW1lbnQtc2VsZWN0b3IsICNldmVudC1zZWFzb24tc2VsZWN0b3JcIikuaGlkZSgpO1xyXG4gICAgICAgIHJlc2V0U2VsZWN0b3IoW1wiY2F0ZWdvcnlcIiwgXCJ0b3VybmFtZW50XCIsIFwic2Vhc29uXCJdKTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuZXZlbnRUeXBlID0gXCJjdXN0b21cIjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkR2VuZXJpY0VwaXNvZGVzKCBxdWFudGl0eSApe1xyXG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9ICQudGVtcGxhdGVzKFwiI2VwaXNvZGUtdGVtcGxhdGVcIiksXHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9ICQoXCIjY29udGVudC1kZXRhaWxzLW1hc2tcIiksXHJcbiAgICAgICAgICAgIGN1cnJlbnRRdWFudGl0eSA9IGNvbnRhaW5lci5jaGlsZHJlbigpLmxlbmd0aCxcclxuICAgICAgICAgICAgc3RhcnQgPSAwO1xyXG5cclxuICAgICAgICBpZiAoIGN1cnJlbnRRdWFudGl0eSA+IHF1YW50aXR5ICkgY29udGFpbmVyLmVtcHR5KCk7XHJcblxyXG4gICAgICAgIGlmICggY3VycmVudFF1YW50aXR5IDwgcXVhbnRpdHkgKSBzdGFydCA9IGN1cnJlbnRRdWFudGl0eTtcclxuXHJcbiAgICAgICAgZm9yKCB2YXIgaSA9IHN0YXJ0OyBpIDwgcXVhbnRpdHk7IGkrKyl7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQodGVtcGxhdGUucmVuZGVyKHtpZDogaSArIDEgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5lcGlzb2RlLWF2YWlsYWJpbGl0eS1kYXRlOm5vdCguaGFzRGF0ZXBpY2tlcilcIiwgY29udGFpbmVyICkuZGF0ZXBpY2tlcigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3VycmVudCA6IFwiICsgY3VycmVudFF1YW50aXR5LCBcIkdvYWw6IFwiICsgcXVhbnRpdHksIFwiU3RhcnQ6IFwiICsgc3RhcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0U2VsZWN0b3Ioc2VsZWN0b3JzKXtcclxuICAgICAgICBzZWxlY3RvcnMuZm9yRWFjaCggKHNlbGVjdG9yKSA9PiAkKFwiI2V2ZW50LVwiK3NlbGVjdG9yK1wiLXNlbGVjdG9yXCIpLnZhbChcIlwiKS5hdHRyKCdleHRlcm5hbElkJywgbnVsbCkpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYWRkLXNwb3J0LWxheWVyXCIpLm9uKFwiY2xpY2tcIiwgYWRkU3BvcnRMYXllcik7XHJcblxyXG4gICAgJChcIiNldmVudC1jdXN0b21FbmQtc2VsZWN0b3IsICNldmVudC1jdXN0b21TdGFydC1zZWxlY3RvciwgI2V2ZW50LWF2YWlsYWJpbGl0eS1zZWxlY3RvciwgI2V4cGlyYXRpb24tZGF0ZSwgLmluc3RhbGxtZW50LWRhdGVcIikuZGF0ZXBpY2tlcigpO1xyXG5cclxuICAgICQoJy5maWxlLXNlbGVjdG9yJykub2ZmKCkuZm9jdXMoZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgdmFyIHRhcmdldElkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoXCJyZWZcIik7XHJcbiAgICAgICAgJCh0aGlzKS5ibHVyKCk7XHJcbiAgICAgICAgJCggdGFyZ2V0SWQgKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2xpY2Vuc2UtZmlsZS1zZWxlY3Rvci1oaWRkZW4nKS5jaGVja0ZpbGVUeXBlKHtcclxuICAgICAgICBhbGxvd2VkRXh0ZW5zaW9uczogWyAncGRmJywgJ2RvYycsICdkb2N4J10sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJzxkaXYgLz4nKS5odG1sKCdGaWxlIHR5cGUgbm90IGFsbG93ZWQuIFBsZWFzZSB1cGxvYWQgYSAucGRmLCAuZG9jIG9yIC5kb2N4IGZpbGUnKS5kaWFsb2coKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjZXZlbnQtZmlsZS1zZWxlY3Rvci1oaWRkZW4nKS5jaGVja0ZpbGVUeXBlKHtcclxuICAgICAgICBhbGxvd2VkRXh0ZW5zaW9uczogWydqcGcnLCAnanBlZycsJ3BuZycsICdwZGYnLCAnZG9jJywgJ2RvY3gnXSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldElkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoXCJyZWZcIik7XHJcbiAgICAgICAgICAgICQoIHRhcmdldElkICkudmFsKCQodGhpcykudmFsKCkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0SWQgPSBcIiNcIiArICQodGhpcykuYXR0cihcInJlZlwiKTtcclxuICAgICAgICAgICAgJCggdGFyZ2V0SWQgKS5hdHRyKFwicGxhY2Vob2xkZXJcIiwgXCJBbGxvd2VkOiAucG5nLCAuanBnLCAucGRmLCAuZG9jLCAuZG9jeFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgICQodGhpcykudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKCc8ZGl2IC8+JykuaHRtbCgnRmlsZSB0eXBlIG5vdCBhbGxvd2VkJykuZGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2ltYWdlLXNlbGVjdG9yLWhpZGRlbicpLmNoZWNrRmlsZVR5cGUoe1xyXG4gICAgICAgIGFsbG93ZWRFeHRlbnNpb25zOiBbJ2pwZycsICdqcGVnJywncG5nJ10sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRJZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKFwicmVmXCIpO1xyXG4gICAgICAgICAgICAkKCB0YXJnZXRJZCApLnZhbCgkKHRoaXMpLnZhbCgpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldElkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoXCJyZWZcIik7XHJcbiAgICAgICAgICAgICQoIHRhcmdldElkICkuYXR0cihcInBsYWNlaG9sZGVyXCIsIFwiQWxsb3dlZDogLnBuZywgLmpwZ1wiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgICQodGhpcykudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKCc8ZGl2IC8+JykuaHRtbCgnRmlsZSB0eXBlIG5vdCBhbGxvd2VkJykuZGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjaGFuZ2VcIiwgXCIudW5zZWxlY3Qtb3RoZXJzXCIsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuZWFjaCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnNpYmxpbmdzKCksIGZ1bmN0aW9uIChrLCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICQoaXRlbSkuZmluZChcImlucHV0XCIpO1xyXG4gICAgICAgICAgICBpZiAoIF90aGlzICE9PSBpdGVtICkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImNoZWNrZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjaGFuZ2VcIiwgXCIuc2VsZWN0LWFsbFwiLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmVhY2goJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5zaWJsaW5ncygpLCBmdW5jdGlvbiAoaywgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAkKGl0ZW0pLmZpbmQoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKTtcclxuICAgICAgICAgICAgaWYgKCBfdGhpcyA9PT0gaXRlbSApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmICggX3RoaXMuY2hlY2tlZCApe1xyXG4gICAgICAgICAgICAgICAgaW5wdXQucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNoYW5nZVwiLCBcIi50b2dnbGVyLWNoZWNrYm94XCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpO1xyXG5cclxuICAgICAgICAkKCAkKHRoaXMpLmF0dHIoXCJoaWRlXCIpICsgXCIsIC5vcHRpb25hbFwiLCBjb250ZXh0ICkuaGlkZSgpLmZpbmQoXCJpbnB1dFwiKS52YWwoXCJcIik7XHJcblxyXG4gICAgICAgICQoXCJpbnB1dDpjaGVja2VkXCIsIGNvbnRleHQpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0b3JTaG93ID0gJCh0aGlzKS5hdHRyKFwic2hvd1wiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5hcHBlbmQoJCggc2VsZWN0b3JTaG93LCBjb250ZXh0ICkuc2hvdygpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmNsb3NlLWJveFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCggJCh0aGlzKS5hdHRyKFwicmVmXCIpICkucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNoYW5nZVwiLFwiLnVuc2VsZWN0LWFsbFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICQuZWFjaCgkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnNpYmxpbmdzKCksIGZ1bmN0aW9uIChrLCBpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmICggJChpdGVtKS5oYXNDbGFzcygnYWxsLXR5cGUnKSApICQoaXRlbSkuZmluZChcImlucHV0XCIpLmF0dHIoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjaGFuZ2UnLCAnI2NvbnRlbnQtZGV0YWlscy1tZXRob2QtbWFzaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZWwgPSAkKFwiI2VwaXNvZGVzLXF1YW50aXR5XCIpLFxyXG4gICAgICAgICAgICBxdWFudGl0eSA9IE51bWJlciggZWwudmFsKCkgKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jaGVja2VkKXtcclxuICAgICAgICAgICAgaWYgKCBxdWFudGl0eSAhPT0gXCJcIiApIGFkZEdlbmVyaWNFcGlzb2RlcyhxdWFudGl0eSk7XHJcbiAgICAgICAgICAgIGVsLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3UXVhbnRpdHkgPSBOdW1iZXIoICAkKHRoaXMpLnZhbCgpICk7XHJcbiAgICAgICAgICAgICAgICBhZGRHZW5lcmljRXBpc29kZXMobmV3UXVhbnRpdHkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWwub2ZmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgXCIuZXBpc29kZS1hdmFpbGFiaWxpdHlcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZXBpc29kZS1hdmFpbGFiaWxpdHktc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImVwaXNvZGUtYXZhaWxhYmlsaXR5LXNlbGVjdGVkXCIpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFwiI2Rvd25sb2FkLWNzdi1zaGVldFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBlbnZob3N0dXJsICsgXCJidW5kbGVzL2FwcC9kYXRhL2NvbnRlbnQtZGV0YWlscy5jc3ZcIjtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvc2VsbC5zdGVwMS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5UZXN0ID0gQ29udGVudEFyZW5hLlRlc3QgfHwge307XHJcblxyXG4gICAgdmFyIHNlbGVjdG9yQ291bnRlciA9IDAsXHJcbiAgICAgICAgbWFpblBhY2thZ2UgPSBudWxsO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkRnVsbFBhY2thZ2VzKCkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gW107XHJcblxyXG4gICAgICAgICQoXCIucGFja2FnZS1zZWxlY3RvcjpjaGVja2VkXCIpLmVhY2goZnVuY3Rpb24oayx2KXtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYWNrID0ge1xyXG4gICAgICAgICAgICAgICAgaWQgOiAkKHYpLmF0dHIoXCJpZFwiKS5zcGxpdChcIi1cIilbMV0sXHJcbiAgICAgICAgICAgICAgICBuYW1lIDogJCh2KS5hdHRyKFwibmFtZVwiKS5zcGxpdChcIi1cIilbMV1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxpc3QucHVzaChwYWNrKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXMoKSB7XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZCA6IHt9LFxyXG4gICAgICAgICAgICBzZWxlY3RlZElkcyA6IFtdLFxyXG4gICAgICAgICAgICBzZWxlY3RlZE5hbWVzIDogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKFwiLnBhY2thZ2Utc2VsZWN0b3I6Y2hlY2tlZFwiKS5lYWNoKGZ1bmN0aW9uKGssdil7XHJcblxyXG4gICAgICAgICAgICB2YXIgaWQgPSAkKHYpLmF0dHIoXCJpZFwiKS5zcGxpdChcIi1cIilbMV0sXHJcbiAgICAgICAgICAgICAgICBuYW1lID0gJCh2KS5hdHRyKFwibmFtZVwiKS5zcGxpdChcIi1cIilbMV07XHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5zZWxlY3RlZFtpZF0gPSB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IGlkLFxyXG4gICAgICAgICAgICAgICAgbmFtZSA6IG5hbWVcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbGVjdGVkSWRzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICByZXNwb25zZS5zZWxlY3RlZE5hbWVzLnB1c2gobmFtZSlcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlc3BvbnNlLmdldElkQnlOYW1lID0gZnVuY3Rpb24oIG5hbWUgKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJZHNbdGhpcy5zZWxlY3RlZE5hbWVzLmluZGV4T2YobmFtZSldXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMgKGNvbnRhaW5lcil7XHJcblxyXG4gICAgICAgIHZhciBsaXN0ID0gW107XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5maW5kKFwiaW5wdXQ6Y2hlY2tlZCwgLm5vdC1vcHRpb25hbFwiKS5lYWNoKGZ1bmN0aW9uIChrLCBlbCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5pcyhcIjp2aXNpYmxlXCIpICkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoICQoZWwpLmF0dHIoXCJhbGxcIikgIT09IHVuZGVmaW5lZCAgKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFJpZ2h0ID0gbmV3IENvbnRlbnRBcmVuYS5Nb2RlbC5TZWxlY3RlZFJpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICBzZWxlY3RlZFJpZ2h0LnJpZ2h0ID0gJChlbCkuYXR0cihcInJpZ2h0LWlkXCIpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFJpZ2h0LnJpZ2h0SXRlbSA9ICQoZWwpLmF0dHIoXCJyaWdodC1pdGVtLWlkXCIpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFJpZ2h0Lmdyb3VwID0gJChlbCkuZGF0YShcImdyb3VwXCIpO1xyXG5cclxuICAgICAgICAgICAgJChlbCkucGFyZW50KCkucGFyZW50KCkuZmluZChcImlucHV0Om5vdChbdHlwZT0nY2hlY2tib3gnXSk6bm90KC5jaG9zZW4tc2VhcmNoLWlucHV0KSwgdGV4dGFyZWEsIHNlbGVjdFwiKS5lYWNoKGZ1bmN0aW9uIChrZXksIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUmlnaHQuaW5wdXRzLnB1c2goICQoZWxlbWVudCkudmFsKCkgKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsaXN0LnB1c2goc2VsZWN0ZWRSaWdodCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb2xsZWN0U2VsZWN0ZWRSaWdodHMoKXtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRSaWdodHM9IFtdLFxyXG4gICAgICAgICAgICBzZWxlY3RlZFBhY2thZ2VzID0gZ2V0U2VsZWN0ZWRGdWxsUGFja2FnZXMoKSxcclxuICAgICAgICAgICAgbXVsdGlwbGUgPSAkKFwiI21haW4tbXVsdGlwbGUtcGFja2FnZVwiKSxcclxuICAgICAgICAgICAgc2luZ2xlID0gJChcIiNtYWluLXNpbmdsZS1wYWNrYWdlXCIpO1xyXG5cclxuICAgICAgICBpZiAoIG11bHRpcGxlLmlzKFwiOnZpc2libGVcIikgKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRSaWdodHMgPSBzZWxlY3RlZFJpZ2h0cy5jb25jYXQoIGNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMobXVsdGlwbGUpICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHNpbmdsZS5pcyhcIjp2aXNpYmxlXCIpICl7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmlnaHRzID0gc2VsZWN0ZWRSaWdodHMuY29uY2F0KCBjb2xsZWN0U2VsZWN0ZWRSaWdodEl0ZW1zKHNpbmdsZSkgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggc2VsZWN0ZWRQYWNrYWdlcy5sZW5ndGggPiAxICl7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUGFja2FnZXMuZm9yRWFjaChmdW5jdGlvbiAocGFjaykge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSaWdodHMgPSBzZWxlY3RlZFJpZ2h0cy5jb25jYXQoIGNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMoICQoXCIjc2VsbC1ib3gtcGFja2FnZS1cIiArIHBhY2suaWQgKSkgKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIucHJvZHVjdGlvbi1zdGFuZGFyZHM6dmlzaWJsZVwiKS5lYWNoKGZ1bmN0aW9uKGssIGVsKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRSaWdodHMgPSBzZWxlY3RlZFJpZ2h0cy5jb25jYXQoIGNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMoICQoZWwpICkgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkUmlnaHRzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZVNhbGVzUGFja2FnZXMoKXtcclxuXHJcbiAgICAgICAgdmFyIHBhY2thZ2VzID0gW107XHJcblxyXG4gICAgICAgICQoXCIuc2FsZXMtcGFja2FnZVwiKS5lYWNoKGZ1bmN0aW9uKGssIHBhY2thZ2VDb250YWluZXIpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHNhbGVzUGFja2FnZSA9IG5ldyBDb250ZW50QXJlbmEuTW9kZWwuU2FsZXNQYWNrYWdlKCk7XHJcbiAgICAgICAgICAgIHZhciBpZCA9ICQocGFja2FnZUNvbnRhaW5lcikuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJzYWxlcy1wYWNrYWdlLVwiLFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLnRlcnJpdG9yaWVzID0gJChcIi50ZXJyaXRvcmllczpjaGVja2VkXCIsIHBhY2thZ2VDb250YWluZXIpLmF0dHIoXCJ2YWxcIik7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS5zYWxlc01ldGhvZCA9ICQoXCIuc2FsZXMtbWV0aG9kOmNoZWNrZWRcIiwgcGFja2FnZUNvbnRhaW5lcikuYXR0cihcInZhbFwiKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLmN1cnJlbmN5ID0gJChcIi5jdXJyZW5jeTpjaGVja2VkXCIsIHBhY2thZ2VDb250YWluZXIpLmF0dHIoXCJ2YWxcIik7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS5pZCA9IGlkO1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2UubmFtZSA9ICQoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICtcIi1uYW1lXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2UuZmVlID0gJChcIi5mZWU6dmlzaWJsZVwiLCBwYWNrYWdlQ29udGFpbmVyKS52YWwoKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLnRlcnJpdG9yeUJpZHMgPSAkKFwiI3NhbGVzLXBhY2thZ2UtXCIgKyBpZCArXCItdGVycml0b3J5LWJpZHNcIikuaXMoXCI6Y2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLnRlcnJpdG9yeUFzUGFja2FnZSA9ICQoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICtcIi10ZXJyaXRvcmllcy1hcy1wYWNrYWdlXCIpLmlzKFwiOmNoZWNrZWRcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHNhbGVzUGFja2FnZS50ZXJyaXRvcmllcyA9PT0gXCJzZWxlY3RlZFwiKSBzYWxlc1BhY2thZ2Uuc2VsZWN0ZWRUZXJyaXRvcmllcyA9ICQoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICtcIi10ZXJyaXRvcnktc2VsZWN0ZWRcIikuY2hvc2VuKCkudmFsKCk7XHJcbiAgICAgICAgICAgIGlmICggc2FsZXNQYWNrYWdlLnRlcnJpdG9yaWVzID09PSBcImV4Y2x1ZGVkXCIpIHNhbGVzUGFja2FnZS5leGNsdWRlZFRlcnJpdG9yaWVzID0gJChcIiNzYWxlcy1wYWNrYWdlLVwiICsgaWQgK1wiLXRlcnJpdG9yeS1leGNsdWRlZFwiKS5jaG9zZW4oKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHBhY2thZ2VzLnB1c2goc2FsZXNQYWNrYWdlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhY2thZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlU3RlcFR3bygpe1xyXG5cclxuICAgICAgICB2YXIgaGFzRXJyb3JzID0gZmFsc2UsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzID0gW10sXHJcbiAgICAgICAgICAgIGV4cGlyYXRpb25EYXRlID0gJChcIiNleHBpcmF0aW9uLWRhdGVcIiksXHJcbiAgICAgICAgICAgIHJpZ2h0cyA9IGNvbGxlY3RTZWxlY3RlZFJpZ2h0cygpLFxyXG4gICAgICAgICAgICBtZXNzYWdlc0NvbnRhaW5lciA9ICQoJzxkaXYgdGl0bGU9XCJUaGUgZm9ybSBpcyBpbmNvbXBsZXRlIVwiIC8+JyksXHJcbiAgICAgICAgICAgIHRvdGFsID0gMCxcclxuICAgICAgICAgICAgc2VsZWN0ZWRQYWNrYWdlcyA9IGdldEZ1bGxTZWxlY3RlZFBhY2thZ2VzKCk7XHJcblxyXG4gICAgICAgICQoXCIuaW5zdGFsbG1lbnQtcGVyY2VudFwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRvdGFsICs9IE51bWJlciAoICQodGhpcykudmFsKCkucmVwbGFjZShcIiVcIiwgXCJcIikgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIHRvdGFsICE9PSAxMDAgKSB7XHJcbiAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goICQoJzxkaXYgY2xhc3M9XCJwb3B1cC1lcnJvci1tZXNzYWdlXCIgLz4nKS5odG1sKCdUb3RhbCBpbnN0YWxsbWVudHMgbXVzdCBzdW0gMTAwJSEnKSApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5pbnN0YWxsbWVudHMgPSBjb2xsZWN0SW5zdGFsbG1lbnRzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5zYWxlc1BhY2thZ2VzID0gdmFsaWRhdGVTYWxlc1BhY2thZ2VzKCk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuc2FsZXNQYWNrYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHNhbGVzUGFja2FnZSl7XHJcbiAgICAgICAgICAgIHZhciB2YWxpZCA9IHNhbGVzUGFja2FnZS52YWxpZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCB2YWxpZC5oYXNFcnJvcnMgKXtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKCAkKCc8ZGl2IGNsYXNzPVwicG9wdXAtZXJyb3ItbWVzc2FnZVwiIC8+JykuaHRtbCh2YWxpZC5kZXNjcmlwdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LnJpZ2h0cyA9IHJpZ2h0cztcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5wYWNrYWdlcyA9IHNlbGVjdGVkUGFja2FnZXMuc2VsZWN0ZWRJZHM7XHJcblxyXG4gICAgICAgIGlmICggZXhwaXJhdGlvbkRhdGUudmFsKCkgPT09IFwiXCIgKXtcclxuICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaCggJCgnPGRpdiBjbGFzcz1cInBvcHVwLWVycm9yLW1lc3NhZ2VcIiAvPicpLmh0bWwoJ1BsZWFzZSBzZWxlY3QgYW4gZXhwaXJhdGlvbiBkYXRlJykgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5leHBpcmVzQXQgPSAgZXhwaXJhdGlvbkRhdGUudmFsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIGhhc0Vycm9ycyApe1xyXG5cclxuICAgICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaCgoY29udGVudCk9PntcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzQ29udGFpbmVyLmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtZXNzYWdlc0NvbnRhaW5lci5kaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgbWluV2lkdGg6IDQwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAhaGFzRXJyb3JzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTYWxlc1BhY2thZ2UoKXtcclxuICAgICAgICB2YXIgdGVtcGxhdGUgPSAkLnRlbXBsYXRlcyhcIiNzYWxlcy1wYWNrYWdlLXRlbXBsYXRlXCIpLFxyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2VzID0gJChcIi5zYWxlcy1wYWNrYWdlXCIpLFxyXG4gICAgICAgICAgICBpZCA9IHNhbGVzUGFja2FnZXMubGVuZ3RoICsgMSxcclxuICAgICAgICAgICAgaHRtbE91dHB1dCA9IHRlbXBsYXRlLnJlbmRlcih7aWQ6IGlkIH0pO1xyXG5cclxuICAgICAgICBpZiAoIGlkID09PSAxICl7XHJcbiAgICAgICAgICAgICQoXCIucmlnaHRzLWxpc3RcIikubGFzdCgpLmFmdGVyKGh0bWxPdXRwdXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZXMubGFzdCgpLmFmdGVyKGh0bWxPdXRwdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5wcmljZS1vcHRpb25hbFwiLCBcIiNzYWxlcy1wYWNrYWdlLVwiICsgaWQpLmhpZGUoKTtcclxuICAgICAgICBDb250ZW50QXJlbmEuVXRpbHMuYWRkUmVnaW9uQmVoYXZpb3VyKFwiI3NhbGVzLXBhY2thZ2UtXCIgKyBpZCArIFwiIC5oYXMtcmVnaW9uLXNlbGVjdG9yXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKmZ1bmN0aW9uIGFkZERpc3RyaWJ1dGlvblBhY2thZ2VzKCBuYW1lICl7XHJcblxyXG4gICAgICAgIHZhciBkaXN0cmlidXRpb25QYWNrYWdlID0gJChcIi5wcm9kdWN0aW9uLXN0YW5kYXJkc1wiLCBcIiNib3gtdGVtcGxhdGVzXCIpLmNsb25lKCksXHJcbiAgICAgICAgICAgIHRlY2huaWNhbERlbGl2ZXJ5ID0gJChcIi50ZWNobmljYWwtZGVsaXZlcnlcIiwgXCIjYm94LXRlbXBsYXRlc1wiKS5jbG9uZSgpLFxyXG4gICAgICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlVGl0bGUgPSBkaXN0cmlidXRpb25QYWNrYWdlLmZpbmQoXCIuYm94LXRpdGxlXCIpLFxyXG4gICAgICAgICAgICB0ZWNobmljYWxEZWxpdmVyeVRpdGxlID0gdGVjaG5pY2FsRGVsaXZlcnkuZmluZChcIi5ib3gtdGl0bGVcIiksXHJcbiAgICAgICAgICAgIHRpdGxlID0gbmFtZS5yZXBsYWNlKFwiLVwiLCBcIiAtIFwiKSxcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSAkLnRlbXBsYXRlcyhcIiNjb250ZW50LWRldGFpbHMtdGVtcGxhdGVcIiksXHJcbiAgICAgICAgICAgIGVwaXNvZGVUZW1wbGF0ZSA9ICQudGVtcGxhdGVzKFwiI2VwaXNvZGUtdGVtcGxhdGVcIik7XHJcblxyXG4gICAgICAgICQoXCJbZ3JvdXA9J1Byb2R1Y3Rpb24gc3RhbmRhcmRzJ11cIiwgXCIucmlnaHRzLWxpc3RcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgdGVzdCA9ICQodGhpcykuY2xvbmUoKTtcclxuICAgICAgICAgICAgZGlzdHJpYnV0aW9uUGFja2FnZS5maW5kKFwiLnNlbGxlci1ib3gtY29udGVudFwiKS5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCJbZ3JvdXA9J1RlY2huaWNhbCBkZWxpdmVyeSddXCIsIFwiLnJpZ2h0cy1saXN0XCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHRlc3QgPSAkKHRoaXMpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRlY2huaWNhbERlbGl2ZXJ5LmZpbmQoXCIuc2VsbGVyLWJveC1jb250ZW50XCIpLmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGlzdHJpYnV0aW9uUGFja2FnZS5hdHRyKFwiaWRcIixcImRpc3RyaWJ1dGlvbi1wYWNrYWdlLVwiICsgbmFtZSkuc2hvdygpLmluc2VydEJlZm9yZShcIi5yaWdodHMtbGlzdFwiKTtcclxuICAgICAgICB0ZWNobmljYWxEZWxpdmVyeS5hdHRyKFwiaWRcIixcInRlY2huaWNhbC1kZWxpdmVyeS1cIiArIG5hbWUpLnNob3coKS5pbnNlcnRBZnRlcihkaXN0cmlidXRpb25QYWNrYWdlKTtcclxuICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlVGl0bGUuaHRtbChcIkRpc3RyaWJ1dGlvbiBwYWNrYWdlIC0gXCIgKyBkaXN0cmlidXRpb25QYWNrYWdlVGl0bGUuaHRtbCgpICsgXCIgLVwiICArIHRpdGxlKTtcclxuICAgICAgICB0ZWNobmljYWxEZWxpdmVyeVRpdGxlLmh0bWwodGVjaG5pY2FsRGVsaXZlcnlUaXRsZS5odG1sKCkgKyBcIiAtIFwiICsgdGl0bGUpO1xyXG5cclxuICAgICAgICAkKFwiLm9wdGlvbmFsXCIsdGVjaG5pY2FsRGVsaXZlcnkpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgJChcIi5vcHRpb25hbFwiLGRpc3RyaWJ1dGlvblBhY2thZ2UpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgJChcImxhYmVsXCIsIGRpc3RyaWJ1dGlvblBhY2thZ2UgKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImZvclwiLCBcImRpc3RyaWJ1dGlvbi1wYWNrYWdlLVwiICsgbmFtZSArIFwiLVwiICsgJCh0aGlzKS5hdHRyKFwiZm9yXCIpIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcImlucHV0LCBzZWxlY3RcIiwgZGlzdHJpYnV0aW9uUGFja2FnZSApLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiaWRcIiwgXCJkaXN0cmlidXRpb24tcGFja2FnZS1cIiArIG5hbWUgKyBcIi1cIiArICQodGhpcykuYXR0cihcImlkXCIpIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcImxhYmVsXCIsIHRlY2huaWNhbERlbGl2ZXJ5ICkuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJmb3JcIiwgXCJ0ZWNobmljYWwtZGVsaXZlcnktXCIgKyBuYW1lICsgXCItXCIgKyAkKHRoaXMpLmF0dHIoXCJmb3JcIikgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiaW5wdXQsIHNlbGVjdFwiLCB0ZWNobmljYWxEZWxpdmVyeSApLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiaWRcIiwgXCJ0ZWNobmljYWwtZGVsaXZlcnktXCIgKyBuYW1lICsgXCItXCIgKyAkKHRoaXMpLmF0dHIoXCJpZFwiKSApXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5MYW5ndWFnZXMuYWRkTGFuZ3VhZ2VCZWhhdmlvdXIoXCIjZGlzdHJpYnV0aW9uLXBhY2thZ2UtXCIgKyBuYW1lICsgXCIgLmhhcy1sYW5ndWFnZS10cmlnZ2VyXCIpO1xyXG5cclxuICAgICAgICBpZiggbmFtZSA9PT0gXCJQcm9ncmFtXCIgKXtcclxuICAgICAgICAgICAgdGVjaG5pY2FsRGVsaXZlcnkuZmluZChcIi5zZWxsZXItYm94LWNvbnRlbnRcIikuYXBwZW5kKHRlbXBsYXRlLnJlbmRlcigpKTtcclxuICAgICAgICAgICAgJChcIiN1cGxvYWQtY29udGVudC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICAkKCcjY3N2LXNlbGVjdG9yLWhpZGRlbicpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKENvbnRlbnRBcmVuYS5VdGlscy5pc0FQSUF2YWlsYWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjY3N2LXNlbGVjdG9yLWhpZGRlbicpLmJpbmQoJ2NoYW5nZScsIGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZXMgPSBldnQudGFyZ2V0LmZpbGVzOyAvLyBGaWxlTGlzdCBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGZpbGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcjY29udGVudC1kZXRhaWxzLW1hc2snKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAvISoqXHJcbiAgICAgICAgICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge3sgdGFyZ2V0Ont9IH19IGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICohL1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjc3YgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9ICQuY3N2LnRvQXJyYXlzKGNzdik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdywgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaW5kZXggPiAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NvbnRlbnQtZGV0YWlscy1tYXNrJykuYXBwZW5kKGVwaXNvZGVUZW1wbGF0ZS5yZW5kZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcGlzb2RlOiByb3dbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjZXBpc29kZXMtcXVhbnRpdHlcIikudmFsKGRhdGEubGVuZ3RoIC0gMSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKXsgYWxlcnQoJ1VuYWJsZSB0byByZWFkICcgKyBmaWxlLmZpbGVOYW1lKTsgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGlzdHJpYnV0aW9uUGFja2FnZTtcclxuXHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKmZ1bmN0aW9uIGFkZEV4dHJhRGlzdHJpYnV0aW9uUGFja2FnZSggZGlzdHJpYnV0aW9uUGFja2FnZSl7XHJcblxyXG4gICAgICAgIHZhciBzZWxlY3RvcnMgPSBbXSxcclxuICAgICAgICAgICAgcGFja2FnZXMgPSBnZXRGdWxsU2VsZWN0ZWRQYWNrYWdlcygpLFxyXG4gICAgICAgICAgICBoaWdobGlnaHRzID0gcGFja2FnZXMuc2VsZWN0ZWROYW1lcy5pbmRleE9mKFwiSGlnaGxpZ2h0c1wiKSAhPT0gLTEsXHJcbiAgICAgICAgICAgIGNsaXBzID0gcGFja2FnZXMuc2VsZWN0ZWROYW1lcy5pbmRleE9mKFwiQ2xpcHNcIikgIT09IC0xLFxyXG4gICAgICAgICAgICBuZXdzID0gcGFja2FnZXMuc2VsZWN0ZWROYW1lcy5pbmRleE9mKFwiTmV3cyBhY2Nlc3NcIikgIT09IC0xO1xyXG5cclxuICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlLmZpbmQoXCIuc2VsbGVyLWJveC1jb250ZW50XCIpLmFwcGVuZCggJChcIi5leHRyYS1kaXN0cmlidXRpb24tcGFja2FnZXNcIikuY2xvbmUoKS5zaG93KCkpO1xyXG5cclxuICAgICAgICBpZiAoaGlnaGxpZ2h0cyApIHNlbGVjdG9ycy5wdXNoKFwiLmV4dHJhLXBhY2thZ2UtaGlnaGxpZ2h0XCIgKTtcclxuICAgICAgICBpZiAoY2xpcHMgKSBzZWxlY3RvcnMucHVzaChcIi5leHRyYS1wYWNrYWdlLWNsaXBzXCIgKTtcclxuICAgICAgICBpZiAobmV3cyApIHNlbGVjdG9ycy5wdXNoKFwiLmV4dHJhLXBhY2thZ2UtbmV3c1wiICk7XHJcbiAgICAgICAgaWYgKGhpZ2hsaWdodHMgJiYgY2xpcHMgKSBzZWxlY3RvcnMucHVzaChcIi5leHRyYS1wYWNrYWdlLWhpZ2hsaWdodC1jbGlwc1wiICk7XHJcbiAgICAgICAgaWYgKGhpZ2hsaWdodHMgJiYgbmV3cyApIHNlbGVjdG9ycy5wdXNoKFwiLmV4dHJhLXBhY2thZ2UtaGlnaGxpZ2h0LW5ld3NcIiApO1xyXG4gICAgICAgIGlmIChjbGlwcyAmJiBuZXdzICkgc2VsZWN0b3JzLnB1c2goXCIuZXh0cmEtcGFja2FnZS1jbGlwcy1uZXdzXCIgKTtcclxuICAgICAgICBpZiAoaGlnaGxpZ2h0cyAmJiBuZXdzICYmIGNsaXBzICkgc2VsZWN0b3JzLnB1c2goXCIuZXh0cmEtcGFja2FnZS1oaWdobGlnaHQtY2xpcHMtbmV3c1wiICk7XHJcblxyXG4gICAgICAgICQoc2VsZWN0b3JzLmpvaW4oXCIsIFwiKSwgZGlzdHJpYnV0aW9uUGFja2FnZSkuc2hvdygpO1xyXG5cclxuICAgICAgICAkKFwiLmRpc3RyaWJ1dGlvbi1wYWNrYWdlLXNlbGVjdG9yXCIsIGRpc3RyaWJ1dGlvblBhY2thZ2UpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9ICQodGhpcykudmFsKCkuc3BsaXQoXCIsIFwiKTtcclxuXHJcbiAgICAgICAgICAgICQoXCIudGVjaG5pY2FsLWRlbGl2ZXJ5OnZpc2libGU6bm90KCN0ZWNobmljYWwtZGVsaXZlcnktTWFpbilcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucHJvZHVjdGlvbi1zdGFuZGFyZHM6dmlzaWJsZTpub3QoI2Rpc3RyaWJ1dGlvbi1wYWNrYWdlLU1haW4pXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgYWRkRGlzdHJpYnV0aW9uUGFja2FnZXMoIHZhbHVlcy5qb2luKFwiLVwiKSApO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSovXHJcblxyXG4gICAgLypmdW5jdGlvbiBjaGVja1NlbGVjdGVkUGFja2FnZXMoKSB7XHJcblxyXG4gICAgICAgIHZhciBmdWxsUGFja2FnZXNEYXRhID0gZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXMoKSxcclxuICAgICAgICAgICAgcGFja2FnZXMgPSBmdWxsUGFja2FnZXNEYXRhLnNlbGVjdGVkSWRzLFxyXG4gICAgICAgICAgICBwYWNrYWdlc05hbWUgPSBmdWxsUGFja2FnZXNEYXRhLnNlbGVjdGVkTmFtZXMsXHJcbiAgICAgICAgICAgIG1haW5JdGVtcyA9IFtdLFxyXG4gICAgICAgICAgICBzaW5nbGVJdGVtcyA9IFtdLFxyXG4gICAgICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlLFxyXG4gICAgICAgICAgICBtdWx0aVBhY2thZ2UgPSAoIHBhY2thZ2VzLmxlbmd0aCA+IDEpLFxyXG4gICAgICAgICAgICBtYWluVGFyZ2V0ID0gKG11bHRpUGFja2FnZSkgPyAkKFwiI21haW4tbXVsdGlwbGUtcGFja2FnZVwiKSA6ICQoXCIjbWFpbi1zaW5nbGUtcGFja2FnZVwiKTtcclxuXHJcblxyXG4gICAgICAgICQuZWFjaCgkKFwiLnNlbGxlci1ib3gtY29udGVudFwiKSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmNoaWxkcmVuKCkuZmlyc3QoKS5jc3MoXCJkaXNwbGF5XCIpID09PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuc2VsZWN0LWJveC1pdGVtLWNvbnRhaW5lclwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5yaWdodHMtY29udGFpbmVyXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnJpZ2h0cy1jb250YWluZXI6bm90KC50ZWNobmljYWwtZGVsaXZlcnkpIC5zZWxsZXItYm94LWNvbnRlbnRcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAkKFwiLnByb2R1Y3Rpb24tc3RhbmRhcmRzXCIsIFwiI3N0ZXAyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoXCIudGVjaG5pY2FsLWRlbGl2ZXJ5XCIsIFwiI3N0ZXAyXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAkLmVhY2gocGFja2FnZXMsIGZ1bmN0aW9uKGssIHYpe1xyXG5cclxuICAgICAgICAgICAgc2luZ2xlSXRlbXMucHVzaChcIi5oYXMtcGFja2FnZS1cIit2K1wiOm5vdCguaXMtY29sbGVjdGl2ZWx5KVtncm91cD0nTWFpbiBJbmZvcm1hdGlvbiddXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBtdWx0aVBhY2thZ2UgKXtcclxuICAgICAgICAgICAgICAgIG1haW5JdGVtcy5wdXNoKFwiLmhhcy1wYWNrYWdlLVwiK3YrXCIuaXMtY29sbGVjdGl2ZWx5W2dyb3VwPSdNYWluIEluZm9ybWF0aW9uJ11cIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmhhcy1wYWNrYWdlLVwiK3YrXCI6bm90KC5pcy1jb2xsZWN0aXZlbHkpW2dyb3VwPSdNYWluIEluZm9ybWF0aW9uJ11cIiwgXCIucmlnaHRzLWxpc3RcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0ID0gJCh0aGlzKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjc2VsbC1ib3gtcGFja2FnZS1cIisgdiArXCIgLnNlbGxlci1ib3gtY29udGVudFwiKS5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiI3NlbGwtYm94LXBhY2thZ2UtXCIrIHYgKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYWluSXRlbXMucHVzaChcIi5oYXMtcGFja2FnZS1cIit2K1wiW2dyb3VwPSdNYWluIEluZm9ybWF0aW9uJ11cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoXCIuaGFzLXBhY2thZ2UtXCIgKyB2KS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAkKFwibGFiZWxcIiwgXCIjc2VsbC1ib3gtcGFja2FnZS1cIiArIHYgKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJmb3JcIiwgXCJwYWNrYWdlLVwiICsgdiArIFwiLVwiICsgJCh0aGlzKS5hdHRyKFwiZm9yXCIpIClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiaW5wdXRcIiwgXCIjc2VsbC1ib3gtcGFja2FnZS1cIiArIHYgKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJpZFwiLCBcInBhY2thZ2UtXCIgKyB2ICsgXCItXCIgKyAkKHRoaXMpLmF0dHIoXCJpZFwiKSApXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcInNlbGVjdFwiLCBcIiNzZWxsLWJveC1wYWNrYWdlLVwiICsgdiApLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImlkXCIsIFwicGFja2FnZS1cIiArIHYgKyBcIi1cIiArICQodGhpcykuYXR0cihcImlkXCIpIClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuTGFuZ3VhZ2VzLmFkZExhbmd1YWdlQmVoYXZpb3VyKCBcIiNzZWxsLWJveC1wYWNrYWdlLVwiICsgdiArXCIgLmhhcy1sYW5ndWFnZS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICAkKCBcIiNzZWxsLWJveC1wYWNrYWdlLVwiICsgdiArXCIgLmhhcy1jYWxlbmRhclwiKS5lYWNoKGZ1bmN0aW9uIChrLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiICsgJChlbGVtZW50KS5hdHRyKFwiaWRcIikpLmRhdGVwaWNrZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiLm9wdGlvbmFsXCIsIFwiI3NlbGwtYm94LXBhY2thZ2UtXCIgKyB2ICkuaGlkZSgpO1xyXG5cclxuICAgICAgICB9KSA7XHJcblxyXG4gICAgICAgICQobWFpbkl0ZW1zLmpvaW4oXCIsXCIpLCBcIi5yaWdodHMtbGlzdFwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0ID0gJCh0aGlzKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBtYWluVGFyZ2V0LmZpbmQoXCIuc2VsbGVyLWJveC1jb250ZW50XCIpLmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICAgICAgbWFpblRhcmdldC5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICggcGFja2FnZXNOYW1lLmluZGV4T2YoXCJQcm9ncmFtXCIpID09PSAtMSB8fCBwYWNrYWdlc05hbWUubGVuZ3RoID4gMSApe1xyXG4gICAgICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlID0gYWRkRGlzdHJpYnV0aW9uUGFja2FnZXMoIFwiTWFpblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggcGFja2FnZXNOYW1lLmxlbmd0aCA+IDFcclxuICAgICAgICAgICAgJiYgKCBwYWNrYWdlc05hbWUuaW5kZXhPZihcIkNsaXBzXCIpICE9PSAtMVxyXG4gICAgICAgICAgICAgICAgfHwgcGFja2FnZXNOYW1lLmluZGV4T2YoXCJIaWdobGlnaHRzXCIpICE9PSAtMVxyXG4gICAgICAgICAgICAgICAgfHwgcGFja2FnZXNOYW1lLmluZGV4T2YoXCJOZXdzIGFjY2Vzc1wiKSAhPT0gLTFcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICl7XHJcbiAgICAgICAgICAgIGFkZEV4dHJhRGlzdHJpYnV0aW9uUGFja2FnZShkaXN0cmlidXRpb25QYWNrYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggcGFja2FnZXNOYW1lLmluZGV4T2YoXCJQcm9ncmFtXCIpICE9PSAtMSApe1xyXG4gICAgICAgICAgICBhZGREaXN0cmlidXRpb25QYWNrYWdlcyggXCJQcm9ncmFtXCIgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjbWFpbi1zZWxsLWJveFwiKS5zaG93KCk7XHJcbiAgICAgICAgJChcIiNwcmljZS1zZWxsLWJveFwiKS5zaG93KCk7XHJcbiAgICAgICAgJChcIi5wYWNrYWdlLXJlYWR5LWJ1dHRvblwiKS5zaG93KCk7XHJcbiAgICAgICAgJChcIiNwcmljZS1zZWxsLWJveCAuc2VsZWN0LWJveC1pdGVtLWNvbnRhaW5lclwiKS5zaG93KCk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkxhbmd1YWdlcy5hZGRMYW5ndWFnZUJlaGF2aW91ciggbWFpblRhcmdldC5maW5kKFwiLmhhcy1sYW5ndWFnZS10cmlnZ2VyXCIpICk7XHJcbiAgICAgICAgbWFpblRhcmdldC5maW5kKFwiLmhhcy1jYWxlbmRhclwiKS5lYWNoKGZ1bmN0aW9uIChrLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICQoXCIjXCIgKyAkKGVsZW1lbnQpLmF0dHIoXCJpZFwiKSkuZGF0ZXBpY2tlcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1haW5UYXJnZXQuZmluZChcIi5vcHRpb25hbFwiKS5oaWRlKCk7XHJcblxyXG4gICAgfSovXHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXBJbnN0YWxsbWVudCgpe1xyXG4gICAgICAgICQoXCIuaW5zdGFsbG1lbnQtcGVyY2VudFwiKS5vZmYoKS5tYXNrKCcwMDAlJywge3JldmVyc2U6IHRydWV9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb2xsZWN0SW5zdGFsbG1lbnRzKCl7XHJcblxyXG4gICAgICAgIHZhciBpbnN0YWxsbWVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgJChcIi5pbnN0YWxsbWVudFwiKS5lYWNoKGZ1bmN0aW9uKGssIHBhY2thZ2VDb250YWluZXIpe1xyXG5cclxuICAgICAgICAgICAgdmFyIGluc3RhbGxtZW50ID0ge307XHJcblxyXG4gICAgICAgICAgICBpbnN0YWxsbWVudC5wZXJjZW50ID0gJChcIi5pbnN0YWxsbWVudC1wZXJjZW50XCIsIHBhY2thZ2VDb250YWluZXIpLnZhbCgpLnJlcGxhY2UoXCIlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBpbnN0YWxsbWVudC5kYXRlID0gJChcIi5pbnN0YWxsbWVudC1kYXRlXCIsIHBhY2thZ2VDb250YWluZXIpLnZhbCgpO1xyXG4gICAgICAgICAgICBpbnN0YWxsbWVudC5zaWduaW5nX2RheSA9ICQoXCIuaW5zdGFsbG1lbnQtZGF5c1wiLCBwYWNrYWdlQ29udGFpbmVyKS52YWwoKTtcclxuICAgICAgICAgICAgaW5zdGFsbG1lbnQuZ3JhbnRlZF9kYXkgPSAkKFwiLmdyYW50ZWQtZGF5c1wiKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGluc3RhbGxtZW50cy5wdXNoKGluc3RhbGxtZW50KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluc3RhbGxtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJtaXRmb3JtKCkge1xyXG4gICAgICAgIHZhciB1cmwgPSBlbnZob3N0dXJsICsgJ3NlbGwvcHVibGlzaGVkJyxcclxuICAgICAgICAgICAgZm9ybSA9ICQoJyNteWZvcm0nKTtcclxuXHJcbiAgICAgICAgZm9ybS5hdHRyKCdhY3Rpb24nLCB1cmwpO1xyXG5cclxuICAgICAgICB2YXIgZGF0YSA9IEpTT04uc3RyaW5naWZ5KENvbnRlbnRBcmVuYS5Db250ZW50KTtcclxuXHJcbiAgICAgICAgJCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwianNvblwiLz4nKS52YWwoZGF0YSkuYXBwZW5kVG8oJyNteWZvcm0nKTtcclxuICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoKSB7fTtcclxuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjdXBsb2FkLWFncmVlbWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcclxuICAgICAgICAkKCcjbGljZW5zZS1maWxlLXNlbGVjdG9yLWhpZGRlbicpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjc3VibWl0LWxpc3RpbmdcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBpZiAoICF2YWxpZGF0ZVN0ZXBUd28oKSApIHJldHVybjtcclxuXHJcbiAgICAgICAgc3VibWl0Zm9ybSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiN2aWV3LWFncmVlbWVudFwiKS5vbignY2xpY2snLGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFsaWRhdGVTdGVwVHdvKCk7XHJcbiAgICAgICAgJChcIiN2aWV3LWFncmVlbWVudFwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKS5hcHBlbmQoJzxpIGNsYXNzPVwiZmEgZmEtY29nIGZhLXNwaW5cIj4nKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmwgOiBlbnZob3N0dXJsICsgJ3YxL2NvbnRyYWN0L3ByZXZpZXdzJyxcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhIDoge1xyXG4gICAgICAgICAgICAgICAganNvbiA6IEpTT04uc3RyaW5naWZ5KENvbnRlbnRBcmVuYS5Db250ZW50KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24oIHJlc3BvbnNlICl7XHJcbiAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5pZCA9IHJlc3BvbnNlLmlkO1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oZW52aG9zdHVybCArICdjb250cmFjdC9wcmV2aWV3P2lkPScrIHJlc3BvbnNlLmlkLCBcIl9ibGFua1wiLCdoZWlnaHQ9NjAwLHdpZHRoPTgwMCcpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN2aWV3LWFncmVlbWVudFwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgbnVsbCkuZmluZCgnaScpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2FkZC1pbnN0YWxsbWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmKCQoXCIuaW5zdGFsbG1lbnQ6Zmlyc3QgaW5wdXQuaW5zdGFsbG1lbnQtcGVyY2VudFwiKS52YWwoKT09JzEwMCUnKXtcclxuICAgICAgICAgICAgJChcIi5pbnN0YWxsbWVudDpmaXJzdCBpbnB1dC5pbnN0YWxsbWVudC1wZXJjZW50XCIpLnZhbCgnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcG9zID0gJChcIi5pbnN0YWxsbWVudFwiKS5sZW5ndGggKyAxLFxyXG4gICAgICAgICAgICBpdGVtID0gJChcIi5pbnN0YWxsbWVudDpsYXN0XCIpLmNsb25lKCk7XHJcblxyXG4gICAgICAgIGl0ZW0uYXR0cihcImlkXCIsIFwiaW5zdGFsbG1lbnRcIiArIHBvcyk7XHJcbiAgICAgICAgaXRlbS5maW5kKFwic3BhblwiKS5odG1sKCBDb250ZW50QXJlbmEuVXRpbHMuYWRkT3JkaW5hbChwb3MpKTtcclxuICAgICAgICBpdGVtLmZpbmQoXCJpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgaXRlbS5pbnNlcnRBZnRlcihcIi5pbnN0YWxsbWVudDpsYXN0XCIpO1xyXG5cclxuICAgICAgICBpdGVtLmZpbmQoXCJpbnB1dC5oYXNEYXRlcGlja2VyXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiaWRcIiwgbnVsbClcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiaGFzRGF0ZXBpY2tlclwiKVxyXG4gICAgICAgICAgICAuZGF0ZXBpY2tlcihcImRlc3Ryb3lcIikub2ZmKCkuZGF0ZXBpY2tlcigpO1xyXG5cclxuICAgICAgICAvL3NldHVwSW5zdGFsbG1lbnQoKVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qJChcIi5wYWNrYWdlLXNlbGVjdG9yXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpLnNwbGl0KFwiLVwiKVsxXSxcclxuICAgICAgICAgICAgbmFtZSA9ICQodGhpcykuYXR0cihcIm5hbWVcIikuc3BsaXQoXCItXCIpWzFdO1xyXG5cclxuICAgICAgICBjaGVja1NlbGVjdGVkUGFja2FnZXMoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrZWQgfHwgc2VsZWN0b3JDb3VudGVyID49IDEpIHJldHVybjtcclxuXHJcbiAgICAgICAgJC5lYWNoKCQoXCIucGFja2FnZS1zZWxlY3RvclwiKSwgZnVuY3Rpb24gKGksIHBhY2spIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYWNrYWdlcyA9ICQocGFjaykuZGF0YShcInBhY2thZ2VzXCIpLFxyXG4gICAgICAgICAgICAgICAgcGFja19pZCA9ICQocGFjaykuYXR0cihcImlkXCIpLnNwbGl0KFwiLVwiKVsxXSxcclxuICAgICAgICAgICAgICAgIGVsID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaChwYWNrYWdlcy5wYXJlbnQsIGZ1bmN0aW9uIChpLCBwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocC5pZCA9PT0gaWQpIGZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZmxhZyl7XHJcbiAgICAgICAgICAgICAgICBlbC5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYWNrX2lkICE9PSBpZCkgZWwucGFyZW50KCkubmV4dCgpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIjc2VsbC1ib3hcIikucmVtb3ZlQ2xhc3MoXCJpcy1oaWRkZW5cIik7XHJcblxyXG4gICAgICAgIG1haW5QYWNrYWdlID0gbmFtZTtcclxuICAgICAgICBzZWxlY3RvckNvdW50ZXIrKztcclxuXHJcbiAgICB9KTsqL1xyXG5cclxuICAgICQoXCIjcmVzZXQtcGFja2FnZXNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuZWFjaCgkKFwiLnBhY2thZ2Utc2VsZWN0b3JcIiksIGZ1bmN0aW9uIChpLCBwYWNrKSB7XHJcblxyXG4gICAgICAgICAgICBwYWNrLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgJChwYWNrKS5hdHRyKFwiZGlzYWJsZWRcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICQocGFjaykucGFyZW50KCkubmV4dCgpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIjbWFpbi1zZWxsLWJveFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIuc2VsZWN0LWJveC1pdGVtLWNvbnRhaW5lclwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIuc2VsbC1pdGVtcy1ib3hcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiI3ByaWNlLXNlbGwtYm94XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChcIi5wYWNrYWdlLXJlYWR5LWJ1dHRvblwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yQ291bnRlciA9IDA7XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qJChcIiNkcmFmdC1saXN0aW5nXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIGVsID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgZWwuaHRtbChcIjxpIGNsYXNzPVxcXCJmYSBmYS1jb2cgZmEtc3BpblxcXCI+XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5zYXZlQ29udGVudEFzRHJhZnQoQ29udGVudEFyZW5hLkNvbnRlbnQpLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyAhPT0gdW5kZWZpbmVkICYmIHJlc3BvbnNlLmNvbnRlbnRJZCAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5pZCA9IHJlc3BvbnNlLmNvbnRlbnRJZDtcclxuICAgICAgICAgICAgICAgIGVsLmh0bWwoXCJTYXZlZCBhcyBEcmFmdFwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoKSB7fVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsqL1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsXCIuYWRkLXNhbGVzLXBhY2thZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFkZFNhbGVzUGFja2FnZSgpXHJcbiAgICB9KTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuVGVzdC52YWxpZGF0ZVN0ZXBUd28gPSB2YWxpZGF0ZVN0ZXBUd287XHJcbiAgICBDb250ZW50QXJlbmEuVGVzdC5nZXRGdWxsU2VsZWN0ZWRQYWNrYWdlcyA9IGdldEZ1bGxTZWxlY3RlZFBhY2thZ2VzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6YXRpb25cclxuICAgICAqL1xyXG4gICAgc2V0dXBJbnN0YWxsbWVudCgpO1xyXG4gICAgYWRkU2FsZXNQYWNrYWdlKCk7XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zZWxsLnN0ZXAyLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCBjb250ZW50IGZyb20gXCIuL3JlZHVjZXJzL2NvbnRlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN0b3JlKGNvbnRlbnQpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvc3RvcmUuanMiXSwic291cmNlUm9vdCI6IiJ9