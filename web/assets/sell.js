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
            return _this2.props.selectorItems && _this2.props.selectorItems.length > 30;
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
                return _this2.state.selectedItem.external_id === item.external_id;
            } else {

                if (!_this2.props.selected) return false;

                return _this2.props.selected.length > 0 && _this2.props.multiple && _this2.props.selected[_this2.props.index] ? _this2.props.selected[_this2.props.index].external_id === item.external_id : _this2.props.selected.external_id === item.external_id;
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

                if (!_this2.shouldShowFilters()) return _this2.props.selectorItems;

                return _this2.props.selectorItems.filter(_this2.filter);
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

        _this2.toggle = function () {
            _this2.setState(function (prevState, props) {
                return {
                    selected: !prevState.selected
                };
            });
        };

        _this2.state = {
            round: props.round,
            schedule: props.schedule,
            selected: false
        };
        return _this2;
    }

    _createClass(Round, [{
        key: 'render',
        value: function render() {

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { onClick: this.toggle },
                    'Round ',
                    this.state.round,
                    this.state.selected && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        'Unselect'
                    )
                ),
                this.state.selected && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    this.state.schedule.length > 0 && this.state.schedule.map(function (item, i) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Match, { match: item, key: i });
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

        var _this3 = _possibleConstructorReturn(this, (Match.__proto__ || Object.getPrototypeOf(Match)).call(this, props));

        _this3.toggle = function () {
            _this3.setState(function (prevState, props) {
                return {
                    selected: !prevState.selected
                };
            });
        };

        _this3.state = {
            match: props.match,
            selected: false
        };
        return _this3;
    }

    _createClass(Match, [{
        key: 'render',
        value: function render() {
            var competitorsLen = this.props.match.competitors.length;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { onClick: this.toggle },
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
                    null,
                    'Unselect'
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

        var _this4 = _possibleConstructorReturn(this, (SeasonSelector.__proto__ || Object.getPrototypeOf(SeasonSelector)).call(this, props));

        _this4.toggle = function () {
            _this4.setState(function (prevState, props) {
                return {
                    showSchedule: !prevState.showSchedule
                };
            });
        };

        _this4.state = {
            showSchedule: false
        };
        return _this4;
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
                        'div',
                        { onClick: this.toggle },
                        'Show schedule'
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
                        'div',
                        { onClick: this.props.addSeason },
                        'Add new season'
                    )
                )
            );
        }
    }]);

    return SeasonSelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var SellFormStep1 = function (_React$Component4) {
    _inherits(SellFormStep1, _React$Component4);

    function SellFormStep1(props) {
        _classCallCheck(this, SellFormStep1);

        var _this5 = _possibleConstructorReturn(this, (SellFormStep1.__proto__ || Object.getPrototypeOf(SellFormStep1)).call(this, props));

        _this5.updateContentValue = function (event, key) {
            _this5.props.updateContentValue(key, event.target.value);
        };

        _this5.hasCustomTournament = function () {
            return _this5.props.listingInfo.newSport || _this5.props.listingInfo.newTournament || _this5.props.listingInfo.custom_tournament;
        };

        _this5.addNewSeason = function () {
            _this5.setState(function (prevState, props) {
                return {
                    seasonSelectors: [].concat(_toConsumableArray(prevState.seasonSelectors), [1])
                };
            });
        };

        _this5.toggleSearch = function () {
            _this5.setState(function (prevState, props) {
                return {
                    showSearch: !prevState.showSearch
                };
            });
        };

        _this5.selectTournament = function (tournament) {
            _this5.toggleSearch();
            _this5.props.selectTournament(tournament);
        };

        _this5.state = {
            title: "Step 1 - Event selection",
            lastSportId: null,
            lastCategoryId: null,
            lastTournamentId: null,
            loadingCategories: false,
            loadingTournaments: false,
            loadingSeasons: false,
            seasonSelectors: [1],
            seasons: [],
            schedules: {},
            showSearch: true
        };
        return _this5;
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
            var _this6 = this;

            var sportId = nextProps.listingInfo.sports[0].external_id;

            if (sportId === this.state.lastSportId) return;

            this.setState({ loadingCategories: true });
            ContentArena.Api.getCategories(sportId).done(function (categories) {
                ContentArena.Data.Categories = categories;
                _this6.setState({ lastSportId: sportId, loadingCategories: false });
            });
        }
    }, {
        key: 'loadTournaments',
        value: function loadTournaments(nextProps) {
            var _this7 = this;

            var sportId = nextProps.listingInfo.sports[0].external_id;
            var categoryId = nextProps.listingInfo.sport_category ? nextProps.listingInfo.sport_category.external_id : null;

            if (sportId === this.state.lastSportId && categoryId === this.state.lastCategoryId) return;

            this.setState({ loadingTournaments: true });
            ContentArena.Api.getTournaments(sportId, categoryId).done(function (tournaments) {
                ContentArena.Data.Tournaments = tournaments;
                _this7.setState({
                    lastSportId: sportId,
                    loadingTournaments: false,
                    lastCategoryId: categoryId
                });
            });
        }
    }, {
        key: 'loadSeasons',
        value: function loadSeasons(nextProps) {
            var _this8 = this;

            var tournamentId = nextProps.listingInfo.tournament ? nextProps.listingInfo.tournament.external_id : null;

            if (tournamentId === this.state.lastTournamentId) return;

            this.setState({ loadingSeasons: true });
            ContentArena.Api.getSeasons(tournamentId).done(function (seasons) {
                ContentArena.Data.Seasons = seasons;
                _this8.setState({
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
                if (!_this.state.schedules[season.external_id]) {
                    _this.setState({ loadingSchedule: true });
                    ContentArena.Api.getSchedule(season.external_id).done(function (schedules) {
                        /*ContentArena.Data.Seasons = seasons;*/
                        console.log(schedules);
                        _this.setState(function (prevState, props) {
                            var prevSchedules = prevState.schedules;
                            prevSchedules[season.external_id] = schedules;
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

            if (!this.props.listingInfo.seasons || !this.props.listingInfo.seasons[index]) return [];

            return this.state.schedules[this.props.listingInfo.seasons[index].external_id];
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.listingInfo.sports.length > 0) this.loadCategories(nextProps);
            if (nextProps.listingInfo.sports.length > 0 || nextProps.listingInfo.category) this.loadTournaments(nextProps);
            if (nextProps.listingInfo.tournament) {
                this.loadSeasons(nextProps);
            }
            if (nextProps.listingInfo.seasons.length > 0) this.loadSchedule(nextProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var _this = this;

            if (this.props.listingInfo.step !== 1) return null;

            var inputProps = {
                sports: { value: "" },
                sport_category: { value: "" },
                tournament: { value: "" },
                seasons: [{ value: "" }]
            };

            if (this.props.listingInfo.sports.length > 0) {
                inputProps.sports.value = this.props.listingInfo.sports[0].name;
            }
            if (this.props.listingInfo.seasons.length > 0) {
                inputProps.seasons = [];
                this.props.listingInfo.seasons.forEach(function (season) {
                    inputProps.seasons.push({ value: season.name });
                });
            }
            if (this.props.listingInfo.sport_category) inputProps.sport_category.value = this.props.listingInfo.sport_category.name;
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
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        null,
                        !this.props.listingInfo.newSport && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({ type: 'text'
                        }, inputProps.sports, {
                            readOnly: true,
                            onClick: this.props.openSportSelector,
                            placeholder: "Sport" })),
                        this.props.listingInfo.newSport && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NewSport, { onClick: this.props.removeNewSport })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        null,
                        !this.props.listingInfo.newSport && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({ type: 'text'
                        }, inputProps.sport_category, {
                            readOnly: true,
                            disabled: this.state.loadingCategories,
                            onClick: this.props.openCategorySelector,
                            placeholder: "Country/Category" })),
                        this.props.listingInfo.newSport && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NewCategory, null),
                        this.state.loadingCategories && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        null,
                        !this.hasCustomTournament() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({ type: 'text'
                        }, inputProps.tournament, {
                            readOnly: true,
                            disabled: this.state.loadingTournaments,
                            onClick: this.props.openTournamentSelector,
                            placeholder: "Tournament" })),
                        this.hasCustomTournament() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NewTournament, { showClose: this.props.listingInfo.newTournament || this.props.listingInfo.custom_tournament,
                            value: this.props.listingInfo.custom_tournament,
                            onBlur: function onBlur(e) {
                                return _this9.updateContentValue(e, "custom_tournament");
                            },
                            onClick: this.props.removeNewTournament }),
                        this.state.loadingTournaments && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    this.state.seasons.length > 0 && this.state.seasonSelectors.length > 0 && this.state.seasonSelectors.map(function (season, i) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SeasonSelector, {
                            key: i,
                            season: season,
                            addSeason: _this9.addNewSeason,
                            inputProps: inputProps.seasons[i],
                            schedules: _this9.getSchedules(i),
                            loading: _this9.state.loadingSeasons,
                            showAddNew: _this9.state.seasonSelectors.length === i + 1,
                            openSelector: function openSelector() {
                                return _this9.props.openSeasonSelector(i);
                            } });
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Description, { value: this.props.listingInfo.description, onBlur: function onBlur(e) {
                            return _this9.updateContentValue(e, "description");
                        } }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Website, { value: this.props.listingInfo.website, onBlur: function onBlur(e) {
                            return _this9.updateContentValue(e, "website");
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
        openSportSelector: function openSportSelector() {
            return dispatch({
                type: 'OPEN_SELECTOR',
                selectorItems: ContentArena.Data.FullSports,
                popularItems: ContentArena.Data.TopSports,
                selectorType: "sports",
                activeFilter: "popular",
                multiple: true,
                showNewSport: true,
                index: 0
            });
        },
        openCategorySelector: function openCategorySelector() {
            return dispatch({
                type: 'OPEN_SELECTOR',
                selectorItems: ContentArena.Data.Categories,
                selectorType: "sport_category",
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
            rights_package: [],
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
                    newTournament: false, custom_tournament: null
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
            listingInfo.sport_category = action.tournament.sportCategory;

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
                listingInfo[action.selectorType] = [].concat(_toConsumableArray(state.listingInfo[action.selectorType]), [action.selectedItem]);
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

        case 'SUPER_RIGHTS_UPDATED':

            var rights_package = state.listingInfo.rights_package;
            var index = ContentArena.Utils.getIndex(action.rights_package.id, rights_package, "id");
            if (index === -1) {
                rights_package.push(action.rights_package);
            } else {
                rights_package.splice(index, 1);
            }

            listingInfo.rights_package = rights_package;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXhlbnYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZhcmlhbnQvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2NvbXBvbmVudHMvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9jb21wb25lbnRzL01vZGFsUG9ydGFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9hcmlhQXBwSGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2NsYXNzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvZm9jdXNNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9zYWZlSFRNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3Njb3BlVGFiLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy90YWJiYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL1Byb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9jb25uZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21hcERpc3BhdGNoVG9Qcm9wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tYXBTdGF0ZVRvUHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWVyZ2VQcm9wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9zZWxlY3RvckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvdmVyaWZ5U3Vic2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3dyYXBNYXBUb1Byb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvUHJvcFR5cGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9TdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3NoYWxsb3dFcXVhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvdmVyaWZ5UGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2FwcGx5TWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYmluZEFjdGlvbkNyZWF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21iaW5lUmVkdWNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbXBvc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93YXJuaW5nL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0ZpbGVTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvU2VhcmNoQ29tcGV0aXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL1NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9TZWxsRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvUGFja2FnZVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9TZWxsRm9ybVN0ZXAxLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9TZWxsRm9ybVN0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9idXR0b25zLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3NlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zZWxsLnN0ZXAxLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvc2VsbC5zdGVwMi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3N0b3JlLmpzIl0sIm5hbWVzIjpbIkZpbGVJdGVtIiwiaXRlbSIsIm9uQ2xpY2siLCJuYW1lIiwiRmlsZVNlbGVjdG9yIiwicHJvcHMiLCJoYW5kbGVVcGxvYWRGaWxlIiwiZXZlbnQiLCJzdGF0ZSIsImZvcm0iLCJhcHBlbmQiLCJ0YXJnZXQiLCJmaWxlcyIsInNpemUiLCJzZXRTdGF0ZSIsImdldEl0ZW1zIiwibGlzdCIsInZhbHVlcyIsInZhbHVlIiwicHVzaCIsInJlbW92ZSIsImRlbGV0ZSIsIkZvcm1EYXRhIiwiJCIsInRyaWdnZXIiLCJtYXAiLCJpIiwiU2VhcmNoQ29tcGV0aXRpb24iLCJzZWFyY2giLCJfdGhpcyIsInNlYXJjaGluZyIsIkNvbnRlbnRBcmVuYSIsIkFwaSIsInNlYXJjaENvbXBldGl0aW9uIiwiaW5wdXQiLCJkb25lIiwicmVzdWx0cyIsInNlYXJjaERvbmUiLCJoYW5kbGVJbnB1dCIsImUiLCJwcmV2U3RhdGUiLCJ2YWxpZCIsImxlbmd0aCIsInJlc3VsdCIsImluZGV4Iiwic3BvcnRDYXRlZ29yeSIsInNwb3J0Iiwic2VsZWN0IiwiY2xvc2UiLCJSZWFjdCIsIkNvbXBvbmVudCIsImN1c3RvbVN0eWxlcyIsImNvbnRlbnQiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJtYXJnaW5SaWdodCIsInRyYW5zZm9ybSIsIk1vZGFsIiwic2V0QXBwRWxlbWVudCIsIlNlbGVjdG9ySXRlbSIsImxhYmVsIiwic2VsZWN0ZWQiLCJTZWxlY3RvciIsImNvbXBvbmVudERpZE1vdW50Iiwib3Blbk1vZGFsIiwib3BlblNlbGVjdG9yIiwiYWZ0ZXJPcGVuTW9kYWwiLCJjbG9zZU1vZGFsIiwidXBkYXRlZCIsImZpbHRlclVwZGF0ZWQiLCJjbG9zZVNlbGVjdG9yIiwiZ2V0QWN0aXZlRmlsdGVyIiwiYWN0aXZlRmlsdGVyIiwiZ2V0QWN0aXZlRmlsdGVyTmFtZSIsImZpbHRlciIsInNob3VsZFNob3dGaWx0ZXJzIiwic2VsZWN0b3JJdGVtcyIsInNldEFjdGl2ZUZpbHRlciIsImZpbHRlck5hbWUiLCJhcHBseVNlbGVjdGlvbiIsInNlbGVjdG9yVHlwZSIsInNlbGVjdGVkSXRlbSIsIm11bHRpcGxlIiwiYWRkTmV3U3BvcnQiLCJhZGROZXdUb3VybmFtZW50Iiwic2VsZWN0SXRlbSIsImlzSXRlbVNlbGVjdGVkIiwiZXh0ZXJuYWxfaWQiLCJpbmRleE9mIiwidG9Mb3dlckNhc2UiLCJ0eXBlIiwib3BlbiIsInNlbGVjdG9yIiwicG9wdWxhckl0ZW1zIiwic3RvcmUiLCJzdWJzY3JpYmUiLCJhIiwic2hvd05ld1Nwb3J0Iiwic2hvd05ld1RvdXJuYW1lbnQiLCJtYXBTdGF0ZVRvUHJvcHMiLCJzZWxlY3RvckluZm8iLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsImNvbm5lY3QiLCJTZWxsRm9ybSIsImNvbnRlbnRMaXN0aW5nSW5pdCIsIkpTT04iLCJwYXJzZSIsIm93blByb3BzIiwiU3VwZXJSaWdodCIsInN1cGVyUmlnaHQiLCJvbkNoYW5nZSIsImNoZWNrZWQiLCJpZCIsIlBhY2thZ2VTZWxlY3RvciIsInBhY2thZ2VzIiwibGlzdGluZ0luZm8iLCJzdGVwIiwiVXRpbHMiLCJnZXRJbmRleCIsInJpZ2h0c19wYWNrYWdlIiwic3VwZXJSaWdodHNVcGRhdGVkIiwiRGVzY3JpcHRpb24iLCJvbkJsdXIiLCJXZWJzaXRlIiwiTmV3U3BvcnQiLCJOZXdDYXRlZ29yeSIsIk5ld1RvdXJuYW1lbnQiLCJzaG93Q2xvc2UiLCJTY2hlZHVsZXMiLCJzY2hlZHVsZXMiLCJPYmplY3QiLCJrZXlzIiwibnVtYmVyIiwiUm91bmQiLCJ0b2dnbGUiLCJyb3VuZCIsInNjaGVkdWxlIiwiTWF0Y2giLCJtYXRjaCIsImNvbXBldGl0b3JzTGVuIiwiY29tcGV0aXRvcnMiLCJjb21wZXRpdG9yIiwiU2Vhc29uU2VsZWN0b3IiLCJzaG93U2NoZWR1bGUiLCJpbnB1dFByb3BzIiwibG9hZGluZyIsInNob3dBZGROZXciLCJhZGRTZWFzb24iLCJTZWxsRm9ybVN0ZXAxIiwidXBkYXRlQ29udGVudFZhbHVlIiwia2V5IiwiaGFzQ3VzdG9tVG91cm5hbWVudCIsIm5ld1Nwb3J0IiwibmV3VG91cm5hbWVudCIsImN1c3RvbV90b3VybmFtZW50IiwiYWRkTmV3U2Vhc29uIiwic2Vhc29uU2VsZWN0b3JzIiwidG9nZ2xlU2VhcmNoIiwic2hvd1NlYXJjaCIsInNlbGVjdFRvdXJuYW1lbnQiLCJ0b3VybmFtZW50IiwidGl0bGUiLCJsYXN0U3BvcnRJZCIsImxhc3RDYXRlZ29yeUlkIiwibGFzdFRvdXJuYW1lbnRJZCIsImxvYWRpbmdDYXRlZ29yaWVzIiwibG9hZGluZ1RvdXJuYW1lbnRzIiwibG9hZGluZ1NlYXNvbnMiLCJzZWFzb25zIiwiZ2V0U3BvcnRzIiwic3BvcnRzIiwiRGF0YSIsIkZ1bGxTcG9ydHMiLCJuZXh0UHJvcHMiLCJzcG9ydElkIiwiZ2V0Q2F0ZWdvcmllcyIsImNhdGVnb3JpZXMiLCJDYXRlZ29yaWVzIiwiY2F0ZWdvcnlJZCIsInNwb3J0X2NhdGVnb3J5IiwiZ2V0VG91cm5hbWVudHMiLCJ0b3VybmFtZW50cyIsIlRvdXJuYW1lbnRzIiwidG91cm5hbWVudElkIiwiZ2V0U2Vhc29ucyIsIlNlYXNvbnMiLCJmb3JFYWNoIiwic2Vhc29uIiwibG9hZGluZ1NjaGVkdWxlIiwiZ2V0U2NoZWR1bGUiLCJjb25zb2xlIiwibG9nIiwicHJldlNjaGVkdWxlcyIsImxvYWRDYXRlZ29yaWVzIiwiY2F0ZWdvcnkiLCJsb2FkVG91cm5hbWVudHMiLCJsb2FkU2Vhc29ucyIsImxvYWRTY2hlZHVsZSIsIm9wZW5TcG9ydFNlbGVjdG9yIiwicmVtb3ZlTmV3U3BvcnQiLCJvcGVuQ2F0ZWdvcnlTZWxlY3RvciIsIm9wZW5Ub3VybmFtZW50U2VsZWN0b3IiLCJyZW1vdmVOZXdUb3VybmFtZW50IiwiZ2V0U2NoZWR1bGVzIiwib3BlblNlYXNvblNlbGVjdG9yIiwiZGVzY3JpcHRpb24iLCJ3ZWJzaXRlIiwiVG9wU3BvcnRzIiwiU2VsbEZvcm1TdGVwIiwiYWN0aXZlIiwiU2VsbEZvcm1TdGVwcyIsInN0ZXBzIiwiU2VsbEJ1dHRvbnMiLCJzYXZlQXNEcmFmdCIsInNhdmluZyIsIkNvbnRlbnRBcGkiLCJzYXZlQ29udGVudEFzRHJhZnQiLCJnZXRTdGF0ZSIsInJlc3BvbnNlIiwic2F2aW5nU3VjY2VzcyIsImZhaWwiLCJkYXRlIiwiRGF0ZSIsImxhc3RTdGVwIiwic2F2ZUFzRHJhZnRUZXh0IiwiZ29Ub1ByZXZpb3VzU3RlcCIsImdvVG9OZXh0U3RlcCIsImFjdGlvbiIsImFzc2lnbiIsInNwbGljZSIsInNlbGxGb3JtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZGF0YXNldCIsInRvb2x0aXAiLCJkYXRlcGlja2VyIiwib24iLCJyZW1vdmVDbGFzcyIsImhpZGUiLCJ3aW5kb3ciLCJNb2RlbCIsIkZvcm0iLCJUZXN0IiwiYWRkQ3VzdG9tU2Vhc29uIiwiY29udGFpbmVyU2VsZWN0b3IiLCJjb250YWluZXIiLCJzZWFzb25OdW1iZXIiLCJzb3VyY2UiLCJhdXRvY29tcGxldGUiLCJoYXNTZWFzb24iLCJsYWJlbHMiLCJzcGxpdCIsInNlYXNvblllYXIiLCJwb3AiLCJnZXRGdWxsWWVhciIsInN0YXJ0WWVhciIsIk51bWJlciIsImVuZFllYXIiLCJzZWFzb25OYW1lIiwiam9pbiIsInRlbXBsYXRlIiwidGVtcGxhdGVzIiwic2Vhc29uRGF0YSIsInNlYXNvbkVsZW1lbnQiLCJDb250ZW50IiwiYWRkQ3VzdG9tRm4iLCJlbCIsInBsYWNlaG9sZGVyIiwib2ZmIiwidmFsIiwiYWRkQ2xhc3MiLCJzaG93IiwiYXR0ciIsImRhdGEiLCJ1bmRlZmluZWQiLCJhZGRDdXN0b21UZW1wbGF0ZSIsImV2ZW50VHlwZSIsImFkZFNwb3J0TGF5ZXIiLCJzcG9ydFNlbGVjdG9yIiwiZXh0cmFTcG9ydHMiLCJodG1sT3V0cHV0IiwicGFyZW50IiwiYWZ0ZXIiLCJsYXN0IiwiZmluZCIsInJlc2V0U2VsZWN0b3IiLCJhZGRHZW5lcmljRXBpc29kZXMiLCJxdWFudGl0eSIsImN1cnJlbnRRdWFudGl0eSIsImNoaWxkcmVuIiwic3RhcnQiLCJlbXB0eSIsInNlbGVjdG9ycyIsImNoZWNrRmlsZVR5cGUiLCJhbGxvd2VkRXh0ZW5zaW9ucyIsInN1Y2Nlc3MiLCJlcnJvciIsImh0bWwiLCJkaWFsb2ciLCJ0YXJnZXRJZCIsImVhY2giLCJzaWJsaW5ncyIsImsiLCJwcm9wIiwiY29udGV4dCIsInNlbGVjdG9yU2hvdyIsImhhc0NsYXNzIiwibmV3UXVhbnRpdHkiLCJsb2NhdGlvbiIsImVudmhvc3R1cmwiLCJtYXNrIiwidHJhbnNsYXRpb24iLCJwYXR0ZXJuIiwicmVjdXJzaXZlIiwic2VsZWN0b3JDb3VudGVyIiwibWFpblBhY2thZ2UiLCJnZXRTZWxlY3RlZEZ1bGxQYWNrYWdlcyIsInYiLCJwYWNrIiwiZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXMiLCJzZWxlY3RlZElkcyIsInNlbGVjdGVkTmFtZXMiLCJnZXRJZEJ5TmFtZSIsImNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMiLCJpcyIsInNlbGVjdGVkUmlnaHQiLCJTZWxlY3RlZFJpZ2h0IiwicmlnaHRJdGVtIiwiZ3JvdXAiLCJlbGVtZW50IiwiaW5wdXRzIiwiY29sbGVjdFNlbGVjdGVkUmlnaHRzIiwic2VsZWN0ZWRSaWdodHMiLCJzZWxlY3RlZFBhY2thZ2VzIiwic2luZ2xlIiwiY29uY2F0IiwidmFsaWRhdGVTYWxlc1BhY2thZ2VzIiwicGFja2FnZUNvbnRhaW5lciIsInNhbGVzUGFja2FnZSIsIlNhbGVzUGFja2FnZSIsInJlcGxhY2UiLCJ0ZXJyaXRvcmllcyIsInNhbGVzTWV0aG9kIiwiY3VycmVuY3kiLCJmZWUiLCJ0ZXJyaXRvcnlCaWRzIiwidGVycml0b3J5QXNQYWNrYWdlIiwic2VsZWN0ZWRUZXJyaXRvcmllcyIsImNob3NlbiIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJ2YWxpZGF0ZVN0ZXBUd28iLCJoYXNFcnJvcnMiLCJtZXNzYWdlcyIsImV4cGlyYXRpb25EYXRlIiwicmlnaHRzIiwibWVzc2FnZXNDb250YWluZXIiLCJ0b3RhbCIsImluc3RhbGxtZW50cyIsImNvbGxlY3RJbnN0YWxsbWVudHMiLCJzYWxlc1BhY2thZ2VzIiwidmFsaWRhdGUiLCJleHBpcmVzQXQiLCJtaW5XaWR0aCIsImFkZFNhbGVzUGFja2FnZSIsImFkZFJlZ2lvbkJlaGF2aW91ciIsInNldHVwSW5zdGFsbG1lbnQiLCJyZXZlcnNlIiwiaW5zdGFsbG1lbnQiLCJwZXJjZW50Iiwic2lnbmluZ19kYXkiLCJncmFudGVkX2RheSIsInN1Ym1pdGZvcm0iLCJ1cmwiLCJzdHJpbmdpZnkiLCJhcHBlbmRUbyIsIm9uYmVmb3JldW5sb2FkIiwic3VibWl0IiwiYWpheCIsImpzb24iLCJwb3MiLCJjbG9uZSIsImFkZE9yZGluYWwiLCJpbnNlcnRBZnRlciIsIm5leHQiLCJjcmVhdGVTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGdDQUFnQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QkFBRixFQUFvQjROLElBQXBCO0FBQ0E1TixjQUFFLDRCQUFGLEVBQWdDNE4sSUFBaEM7QUFDQTVOLGNBQUUsaUJBQUYsRUFBcUI0TixJQUFyQjtBQUNBNU4sY0FBRSxpQkFBRixFQUFxQjROLElBQXJCO0FBQ0E1TixjQUFFLHVCQUFGLEVBQTJCNE4sSUFBM0I7QUFDQTRFLDhCQUFrQixDQUFsQjtBQUdILFNBYkQ7QUFjSCxLQWZEOztBQWlCQTs7Ozs7Ozs7Ozs7O0FBZUF4UyxNQUFFbU4sUUFBRixFQUFZTyxFQUFaLENBQWUsT0FBZixFQUF1QixvQkFBdkIsRUFBNkMsWUFBWTtBQUNyRCtIO0FBQ0gsS0FGRDs7QUFJQWpWLGlCQUFhd04sSUFBYixDQUFrQjRHLGVBQWxCLEdBQW9DQSxlQUFwQztBQUNBcFUsaUJBQWF3TixJQUFiLENBQWtCNkUsdUJBQWxCLEdBQTRDQSx1QkFBNUM7O0FBRUE7OztBQUdBOEM7QUFDQUY7QUFFSCxDQXRsQkQsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUFBOzs7O0FBSUE7QUFDQTtBQUNBOztBQUVBLHlEQUFlLGtFQUFBcUIsQ0FBWSxrRUFBWixDQUFmLEUiLCJmaWxlIjoic2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTUgSmVkIFdhdHNvbi5cbiAgQmFzZWQgb24gY29kZSB0aGF0IGlzIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGNhblVzZURPTSA9ICEhKFxuXHRcdHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG5cdFx0d2luZG93LmRvY3VtZW50ICYmXG5cdFx0d2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcblx0KTtcblxuXHR2YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSB7XG5cblx0XHRjYW5Vc2VET006IGNhblVzZURPTSxcblxuXHRcdGNhblVzZVdvcmtlcnM6IHR5cGVvZiBXb3JrZXIgIT09ICd1bmRlZmluZWQnLFxuXG5cdFx0Y2FuVXNlRXZlbnRMaXN0ZW5lcnM6XG5cdFx0XHRjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuXHRcdGNhblVzZVZpZXdwb3J0OiBjYW5Vc2VET00gJiYgISF3aW5kb3cuc2NyZWVuXG5cblx0fTtcblxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gRXhlY3V0aW9uRW52aXJvbm1lbnQ7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5FeGVjdXRpb25FbnZpcm9ubWVudCA9IEV4ZWN1dGlvbkVudmlyb25tZW50O1xuXHR9XG5cbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9leGVudi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvZXhlbnYvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNSwgWWFob28hIEluYy5cbiAqIENvcHlyaWdodHMgbGljZW5zZWQgdW5kZXIgdGhlIE5ldyBCU0QgTGljZW5zZS4gU2VlIHRoZSBhY2NvbXBhbnlpbmcgTElDRU5TRSBmaWxlIGZvciB0ZXJtcy5cbiAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gICAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgICAoZ2xvYmFsLmhvaXN0Tm9uUmVhY3RTdGF0aWNzID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgXG4gICAgdmFyIFJFQUNUX1NUQVRJQ1MgPSB7XG4gICAgICAgIGNoaWxkQ29udGV4dFR5cGVzOiB0cnVlLFxuICAgICAgICBjb250ZXh0VHlwZXM6IHRydWUsXG4gICAgICAgIGRlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICAgICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgICAgIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICAgICAgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzOiB0cnVlLFxuICAgICAgICBtaXhpbnM6IHRydWUsXG4gICAgICAgIHByb3BUeXBlczogdHJ1ZSxcbiAgICAgICAgdHlwZTogdHJ1ZVxuICAgIH07XG4gICAgXG4gICAgdmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgIGxlbmd0aDogdHJ1ZSxcbiAgICAgICAgcHJvdG90eXBlOiB0cnVlLFxuICAgICAgICBjYWxsZXI6IHRydWUsXG4gICAgICAgIGNhbGxlZTogdHJ1ZSxcbiAgICAgICAgYXJndW1lbnRzOiB0cnVlLFxuICAgICAgICBhcml0eTogdHJ1ZVxuICAgIH07XG4gICAgXG4gICAgdmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuICAgIHZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG4gICAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4gICAgdmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICAgdmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICAgIHZhciBvYmplY3RQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZiAmJiBnZXRQcm90b3R5cGVPZihPYmplY3QpO1xuICAgIFxuICAgIHJldHVybiBmdW5jdGlvbiBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIHNvdXJjZUNvbXBvbmVudCwgYmxhY2tsaXN0KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlQ29tcG9uZW50ICE9PSAnc3RyaW5nJykgeyAvLyBkb24ndCBob2lzdCBvdmVyIHN0cmluZyAoaHRtbCkgY29tcG9uZW50c1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAob2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaGVyaXRlZENvbXBvbmVudCA9IGdldFByb3RvdHlwZU9mKHNvdXJjZUNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGluaGVyaXRlZENvbXBvbmVudCAmJiBpbmhlcml0ZWRDb21wb25lbnQgIT09IG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIGluaGVyaXRlZENvbXBvbmVudCwgYmxhY2tsaXN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VDb21wb25lbnQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2VDb21wb25lbnQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFSRUFDVF9TVEFUSUNTW2tleV0gJiYgIUtOT1dOX1NUQVRJQ1Nba2V5XSAmJiAoIWJsYWNrbGlzdCB8fCAhYmxhY2tsaXN0W2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZUNvbXBvbmVudCwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHsgLy8gQXZvaWQgZmFpbHVyZXMgZnJvbSByZWFkLW9ubHkgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0Q29tcG9uZW50LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbiAgICB9O1xufSkpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgK1xuICAgICAgICAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJnc1thcmdJbmRleCsrXTsgfSlcbiAgICAgICk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pbnZhcmlhbnQvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvaW52YXJpYW50L2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IGdldFJhd1RhZyBmcm9tICcuL19nZXRSYXdUYWcuanMnO1xuaW1wb3J0IG9iamVjdFRvU3RyaW5nIGZyb20gJy4vX29iamVjdFRvU3RyaW5nLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VHZXRUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXRUYWcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IG92ZXJBcmcgZnJvbSAnLi9fb3ZlckFyZy5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5leHBvcnQgZGVmYXVsdCBnZXRQcm90b3R5cGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRQcm90b3R5cGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFJhd1RhZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb2JqZWN0VG9TdHJpbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX29iamVjdFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX29iamVjdFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vdmVyQXJnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJBcmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgYmFzZUdldFRhZyh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmXG4gICAgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQbGFpbk9iamVjdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNQbGFpbk9iamVjdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG52YXIgY2hlY2tQcm9wVHlwZXMgPSByZXF1aXJlKCcuL2NoZWNrUHJvcFR5cGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICAgIG5vZGU6IGNyZWF0ZU5vZGVDaGVja2VyKCksXG4gICAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gICAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgICBvbmVPZlR5cGU6IGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIsXG4gICAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIsXG4gICAgZXhhY3Q6IGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIsXG4gIH07XG5cbiAgLyoqXG4gICAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gICAqL1xuICAvKmVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSovXG4gIGZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gICAgaWYgKHggPT09IHkpIHtcbiAgICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAgIHJldHVybiB4ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gICAgfVxuICB9XG4gIC8qZXNsaW50LWVuYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuXG4gIC8qKlxuICAgKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gICAqIFByb3BUeXBlcyBkaXJlY3RseSBhbmQgaW5zcGVjdCB0aGVpciBvdXRwdXQuIEhvd2V2ZXIsIHdlIGRvbid0IHVzZSByZWFsXG4gICAqIEVycm9ycyBhbnltb3JlLiBXZSBkb24ndCBpbnNwZWN0IHRoZWlyIHN0YWNrIGFueXdheSwgYW5kIGNyZWF0aW5nIHRoZW1cbiAgICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICAgKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gICAqL1xuICBmdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuc3RhY2sgPSAnJztcbiAgfVxuICAvLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG4gIFByb3BUeXBlRXJyb3IucHJvdG90eXBlID0gRXJyb3IucHJvdG90eXBlO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50ID0gMDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG5cbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAgIGlmICh0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gICAgICAgICAgLy8gTmV3IGJlaGF2aW9yIG9ubHkgZm9yIHVzZXJzIG9mIGBwcm9wLXR5cGVzYCBwYWNrYWdlXG4gICAgICAgICAgaW52YXJpYW50KFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBPbGQgYmVoYXZpb3IgZm9yIHBlb3BsZSB1c2luZyBSZWFjdC5Qcm9wVHlwZXNcbiAgICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSAmJlxuICAgICAgICAgICAgLy8gQXZvaWQgc3BhbW1pbmcgdGhlIGNvbnNvbGUgYmVjYXVzZSB0aGV5IGFyZSBvZnRlbiBub3QgYWN0aW9uYWJsZSBleGNlcHQgZm9yIGxpYiBhdXRob3JzXG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA8IDNcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArXG4gICAgICAgICAgICAgICdhbmQgd2lsbCB0aHJvdyBpbiB0aGUgc3RhbmRhbG9uZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAgICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgK1xuICAgICAgICAgICAgICAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJyxcbiAgICAgICAgICAgICAgcHJvcEZ1bGxOYW1lLFxuICAgICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBhcnJheU9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGlmICghaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIHNpbmdsZSBSZWFjdEVsZW1lbnQuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyKGV4cGVjdGVkQ2xhc3MpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHdhcm5pbmcoXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJXMgYXQgaW5kZXggJXMuJyxcbiAgICAgICAgICBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlciksXG4gICAgICAgICAgaVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9ICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmXG4gICAgU3ltYm9sLmZvciAmJlxuICAgIFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSkgfHxcbiAgICAweGVhYzc7XG5cbiAgdmFyIGlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICBvYmplY3QgIT09IG51bGwgJiZcbiAgICAgIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuICB9O1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmJvZHlPcGVuQ2xhc3NOYW1lID0gZXhwb3J0cy5wb3J0YWxDbGFzc05hbWUgPSB1bmRlZmluZWQ7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKFwicmVhY3RcIik7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3JlYWN0RG9tID0gcmVxdWlyZShcInJlYWN0LWRvbVwiKTtcblxudmFyIF9yZWFjdERvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdERvbSk7XG5cbnZhciBfcHJvcFR5cGVzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7XG5cbnZhciBfcHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BUeXBlcyk7XG5cbnZhciBfTW9kYWxQb3J0YWwgPSByZXF1aXJlKFwiLi9Nb2RhbFBvcnRhbFwiKTtcblxudmFyIF9Nb2RhbFBvcnRhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Nb2RhbFBvcnRhbCk7XG5cbnZhciBfYXJpYUFwcEhpZGVyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvYXJpYUFwcEhpZGVyXCIpO1xuXG52YXIgYXJpYUFwcEhpZGVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2FyaWFBcHBIaWRlcik7XG5cbnZhciBfc2FmZUhUTUxFbGVtZW50ID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvc2FmZUhUTUxFbGVtZW50XCIpO1xuXG52YXIgX3NhZmVIVE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zYWZlSFRNTEVsZW1lbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBwb3J0YWxDbGFzc05hbWUgPSBleHBvcnRzLnBvcnRhbENsYXNzTmFtZSA9IFwiUmVhY3RNb2RhbFBvcnRhbFwiO1xudmFyIGJvZHlPcGVuQ2xhc3NOYW1lID0gZXhwb3J0cy5ib2R5T3BlbkNsYXNzTmFtZSA9IFwiUmVhY3RNb2RhbF9fQm9keS0tb3BlblwiO1xuXG52YXIgaXNSZWFjdDE2ID0gX3JlYWN0RG9tMi5kZWZhdWx0LmNyZWF0ZVBvcnRhbCAhPT0gdW5kZWZpbmVkO1xudmFyIGNyZWF0ZVBvcnRhbCA9IGlzUmVhY3QxNiA/IF9yZWFjdERvbTIuZGVmYXVsdC5jcmVhdGVQb3J0YWwgOiBfcmVhY3REb20yLmRlZmF1bHQudW5zdGFibGVfcmVuZGVyU3VidHJlZUludG9Db250YWluZXI7XG5cbmZ1bmN0aW9uIGdldFBhcmVudEVsZW1lbnQocGFyZW50U2VsZWN0b3IpIHtcbiAgcmV0dXJuIHBhcmVudFNlbGVjdG9yKCk7XG59XG5cbnZhciBNb2RhbCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhNb2RhbCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTW9kYWwoKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICB2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1vZGFsKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKF9yZWYgPSBNb2RhbC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1vZGFsKSkuY2FsbC5hcHBseShfcmVmLCBbdGhpc10uY29uY2F0KGFyZ3MpKSksIF90aGlzKSwgX3RoaXMucmVtb3ZlUG9ydGFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgIWlzUmVhY3QxNiAmJiBfcmVhY3REb20yLmRlZmF1bHQudW5tb3VudENvbXBvbmVudEF0Tm9kZShfdGhpcy5ub2RlKTtcbiAgICAgIHZhciBwYXJlbnQgPSBnZXRQYXJlbnRFbGVtZW50KF90aGlzLnByb3BzLnBhcmVudFNlbGVjdG9yKTtcbiAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChfdGhpcy5ub2RlKTtcbiAgICB9LCBfdGhpcy5wb3J0YWxSZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gICAgICBfdGhpcy5wb3J0YWwgPSByZWY7XG4gICAgfSwgX3RoaXMucmVuZGVyUG9ydGFsID0gZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICB2YXIgcG9ydGFsID0gY3JlYXRlUG9ydGFsKF90aGlzLCBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfTW9kYWxQb3J0YWwyLmRlZmF1bHQsIF9leHRlbmRzKHsgZGVmYXVsdFN0eWxlczogTW9kYWwuZGVmYXVsdFN0eWxlcyB9LCBwcm9wcykpLCBfdGhpcy5ub2RlKTtcbiAgICAgIF90aGlzLnBvcnRhbFJlZihwb3J0YWwpO1xuICAgIH0sIF90ZW1wKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE1vZGFsLCBbe1xuICAgIGtleTogXCJjb21wb25lbnREaWRNb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIGlmICghX3NhZmVIVE1MRWxlbWVudC5jYW5Vc2VET00pIHJldHVybjtcblxuICAgICAgaWYgKCFpc1JlYWN0MTYpIHtcbiAgICAgICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSB0aGlzLnByb3BzLnBvcnRhbENsYXNzTmFtZTtcblxuICAgICAgdmFyIHBhcmVudCA9IGdldFBhcmVudEVsZW1lbnQodGhpcy5wcm9wcy5wYXJlbnRTZWxlY3Rvcik7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGhpcy5ub2RlKTtcblxuICAgICAgIWlzUmVhY3QxNiAmJiB0aGlzLnJlbmRlclBvcnRhbCh0aGlzLnByb3BzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICBpZiAoIV9zYWZlSFRNTEVsZW1lbnQuY2FuVXNlRE9NKSByZXR1cm47XG4gICAgICB2YXIgaXNPcGVuID0gbmV3UHJvcHMuaXNPcGVuO1xuICAgICAgLy8gU3RvcCB1bm5lY2Vzc2FyeSByZW5kZXJzIGlmIG1vZGFsIGlzIHJlbWFpbmluZyBjbG9zZWRcblxuICAgICAgaWYgKCF0aGlzLnByb3BzLmlzT3BlbiAmJiAhaXNPcGVuKSByZXR1cm47XG5cbiAgICAgIHZhciBjdXJyZW50UGFyZW50ID0gZ2V0UGFyZW50RWxlbWVudCh0aGlzLnByb3BzLnBhcmVudFNlbGVjdG9yKTtcbiAgICAgIHZhciBuZXdQYXJlbnQgPSBnZXRQYXJlbnRFbGVtZW50KG5ld1Byb3BzLnBhcmVudFNlbGVjdG9yKTtcblxuICAgICAgaWYgKG5ld1BhcmVudCAhPT0gY3VycmVudFBhcmVudCkge1xuICAgICAgICBjdXJyZW50UGFyZW50LnJlbW92ZUNoaWxkKHRoaXMubm9kZSk7XG4gICAgICAgIG5ld1BhcmVudC5hcHBlbmRDaGlsZCh0aGlzLm5vZGUpO1xuICAgICAgfVxuXG4gICAgICAhaXNSZWFjdDE2ICYmIHRoaXMucmVuZGVyUG9ydGFsKG5ld1Byb3BzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVXBkYXRlKG5ld1Byb3BzKSB7XG4gICAgICBpZiAoIV9zYWZlSFRNTEVsZW1lbnQuY2FuVXNlRE9NKSByZXR1cm47XG4gICAgICBpZiAobmV3UHJvcHMucG9ydGFsQ2xhc3NOYW1lICE9PSB0aGlzLnByb3BzLnBvcnRhbENsYXNzTmFtZSkge1xuICAgICAgICB0aGlzLm5vZGUuY2xhc3NOYW1lID0gbmV3UHJvcHMucG9ydGFsQ2xhc3NOYW1lO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsVW5tb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgIGlmICghX3NhZmVIVE1MRWxlbWVudC5jYW5Vc2VET00gfHwgIXRoaXMubm9kZSB8fCAhdGhpcy5wb3J0YWwpIHJldHVybjtcblxuICAgICAgdmFyIHN0YXRlID0gdGhpcy5wb3J0YWwuc3RhdGU7XG4gICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIHZhciBjbG9zZXNBdCA9IHN0YXRlLmlzT3BlbiAmJiB0aGlzLnByb3BzLmNsb3NlVGltZW91dE1TICYmIChzdGF0ZS5jbG9zZXNBdCB8fCBub3cgKyB0aGlzLnByb3BzLmNsb3NlVGltZW91dE1TKTtcblxuICAgICAgaWYgKGNsb3Nlc0F0KSB7XG4gICAgICAgIGlmICghc3RhdGUuYmVmb3JlQ2xvc2UpIHtcbiAgICAgICAgICB0aGlzLnBvcnRhbC5jbG9zZVdpdGhUaW1lb3V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KHRoaXMucmVtb3ZlUG9ydGFsLCBjbG9zZXNBdCAtIG5vdyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZVBvcnRhbCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJyZW5kZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgaWYgKCFfc2FmZUhUTUxFbGVtZW50LmNhblVzZURPTSB8fCAhaXNSZWFjdDE2KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMubm9kZSAmJiBpc1JlYWN0MTYpIHtcbiAgICAgICAgdGhpcy5ub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNyZWF0ZVBvcnRhbChfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChfTW9kYWxQb3J0YWwyLmRlZmF1bHQsIF9leHRlbmRzKHtcbiAgICAgICAgcmVmOiB0aGlzLnBvcnRhbFJlZixcbiAgICAgICAgZGVmYXVsdFN0eWxlczogTW9kYWwuZGVmYXVsdFN0eWxlc1xuICAgICAgfSwgdGhpcy5wcm9wcykpLCB0aGlzLm5vZGUpO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiBcInNldEFwcEVsZW1lbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0QXBwRWxlbWVudChlbGVtZW50KSB7XG4gICAgICBhcmlhQXBwSGlkZXIuc2V0RWxlbWVudChlbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby11bnVzZWQtcHJvcC10eXBlcyAqL1xuXG4gICAgLyogZXNsaW50LWVuYWJsZSByZWFjdC9uby11bnVzZWQtcHJvcC10eXBlcyAqL1xuXG4gIH1dKTtcblxuICByZXR1cm4gTW9kYWw7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5Nb2RhbC5wcm9wVHlwZXMgPSB7XG4gIGlzT3BlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLmlzUmVxdWlyZWQsXG4gIHN0eWxlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnNoYXBlKHtcbiAgICBjb250ZW50OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdCxcbiAgICBvdmVybGF5OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdFxuICB9KSxcbiAgcG9ydGFsQ2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgYm9keU9wZW5DbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBodG1sT3BlbkNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzMi5kZWZhdWx0LnNoYXBlKHtcbiAgICBiYXNlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGFmdGVyT3BlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBiZWZvcmVDbG9zZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcuaXNSZXF1aXJlZFxuICB9KV0pLFxuICBvdmVybGF5Q2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIF9wcm9wVHlwZXMyLmRlZmF1bHQuc2hhcGUoe1xuICAgIGJhc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYWZ0ZXJPcGVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGJlZm9yZUNsb3NlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZy5pc1JlcXVpcmVkXG4gIH0pXSksXG4gIGFwcEVsZW1lbnQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQuaW5zdGFuY2VPZihfc2FmZUhUTUxFbGVtZW50Mi5kZWZhdWx0KSxcbiAgb25BZnRlck9wZW46IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcbiAgb25SZXF1ZXN0Q2xvc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcbiAgY2xvc2VUaW1lb3V0TVM6IF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLFxuICBhcmlhSGlkZUFwcDogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBzaG91bGRGb2N1c0FmdGVyUmVuZGVyOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIHNob3VsZENsb3NlT25PdmVybGF5Q2xpY2s6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgc2hvdWxkUmV0dXJuRm9jdXNBZnRlckNsb3NlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIHBhcmVudFNlbGVjdG9yOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsXG4gIGFyaWE6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICByb2xlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgY29udGVudExhYmVsOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgc2hvdWxkQ2xvc2VPbkVzYzogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBvdmVybGF5UmVmOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsXG4gIGNvbnRlbnRSZWY6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuY1xufTtcbk1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgaXNPcGVuOiBmYWxzZSxcbiAgcG9ydGFsQ2xhc3NOYW1lOiBwb3J0YWxDbGFzc05hbWUsXG4gIGJvZHlPcGVuQ2xhc3NOYW1lOiBib2R5T3BlbkNsYXNzTmFtZSxcbiAgYXJpYUhpZGVBcHA6IHRydWUsXG4gIGNsb3NlVGltZW91dE1TOiAwLFxuICBzaG91bGRGb2N1c0FmdGVyUmVuZGVyOiB0cnVlLFxuICBzaG91bGRDbG9zZU9uRXNjOiB0cnVlLFxuICBzaG91bGRDbG9zZU9uT3ZlcmxheUNsaWNrOiB0cnVlLFxuICBzaG91bGRSZXR1cm5Gb2N1c0FmdGVyQ2xvc2U6IHRydWUsXG4gIHBhcmVudFNlbGVjdG9yOiBmdW5jdGlvbiBwYXJlbnRTZWxlY3RvcigpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgfVxufTtcbk1vZGFsLmRlZmF1bHRTdHlsZXMgPSB7XG4gIG92ZXJsYXk6IHtcbiAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgIHRvcDogMCxcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAwLFxuICAgIGJvdHRvbTogMCxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc1KVwiXG4gIH0sXG4gIGNvbnRlbnQ6IHtcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIHRvcDogXCI0MHB4XCIsXG4gICAgbGVmdDogXCI0MHB4XCIsXG4gICAgcmlnaHQ6IFwiNDBweFwiLFxuICAgIGJvdHRvbTogXCI0MHB4XCIsXG4gICAgYm9yZGVyOiBcIjFweCBzb2xpZCAjY2NjXCIsXG4gICAgYmFja2dyb3VuZDogXCIjZmZmXCIsXG4gICAgb3ZlcmZsb3c6IFwiYXV0b1wiLFxuICAgIFdlYmtpdE92ZXJmbG93U2Nyb2xsaW5nOiBcInRvdWNoXCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxuICAgIG91dGxpbmU6IFwibm9uZVwiLFxuICAgIHBhZGRpbmc6IFwiMjBweFwiXG4gIH1cbn07XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RhbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvY29tcG9uZW50cy9Nb2RhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2NvbXBvbmVudHMvTW9kYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcHJvcFR5cGVzID0gcmVxdWlyZShcInByb3AtdHlwZXNcIik7XG5cbnZhciBfcHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BUeXBlcyk7XG5cbnZhciBfZm9jdXNNYW5hZ2VyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvZm9jdXNNYW5hZ2VyXCIpO1xuXG52YXIgZm9jdXNNYW5hZ2VyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2ZvY3VzTWFuYWdlcik7XG5cbnZhciBfc2NvcGVUYWIgPSByZXF1aXJlKFwiLi4vaGVscGVycy9zY29wZVRhYlwiKTtcblxudmFyIF9zY29wZVRhYjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zY29wZVRhYik7XG5cbnZhciBfYXJpYUFwcEhpZGVyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvYXJpYUFwcEhpZGVyXCIpO1xuXG52YXIgYXJpYUFwcEhpZGVyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2FyaWFBcHBIaWRlcik7XG5cbnZhciBfY2xhc3NMaXN0ID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvY2xhc3NMaXN0XCIpO1xuXG52YXIgY2xhc3NMaXN0ID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2NsYXNzTGlzdCk7XG5cbnZhciBfc2FmZUhUTUxFbGVtZW50ID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvc2FmZUhUTUxFbGVtZW50XCIpO1xuXG52YXIgX3NhZmVIVE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zYWZlSFRNTEVsZW1lbnQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldOyB9IH0gbmV3T2JqLmRlZmF1bHQgPSBvYmo7IHJldHVybiBuZXdPYmo7IH0gfVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8vIHNvIHRoYXQgb3VyIENTUyBpcyBzdGF0aWNhbGx5IGFuYWx5emFibGVcbnZhciBDTEFTU19OQU1FUyA9IHtcbiAgb3ZlcmxheTogXCJSZWFjdE1vZGFsX19PdmVybGF5XCIsXG4gIGNvbnRlbnQ6IFwiUmVhY3RNb2RhbF9fQ29udGVudFwiXG59O1xuXG52YXIgVEFCX0tFWSA9IDk7XG52YXIgRVNDX0tFWSA9IDI3O1xuXG52YXIgYXJpYUhpZGRlbkluc3RhbmNlcyA9IDA7XG5cbnZhciBNb2RhbFBvcnRhbCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhNb2RhbFBvcnRhbCwgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gTW9kYWxQb3J0YWwocHJvcHMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kYWxQb3J0YWwpO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE1vZGFsUG9ydGFsLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTW9kYWxQb3J0YWwpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cbiAgICBfdGhpcy5zZXRGb2N1c0FmdGVyUmVuZGVyID0gZnVuY3Rpb24gKGZvY3VzKSB7XG4gICAgICBfdGhpcy5mb2N1c0FmdGVyUmVuZGVyID0gX3RoaXMucHJvcHMuc2hvdWxkRm9jdXNBZnRlclJlbmRlciAmJiBmb2N1cztcbiAgICB9O1xuXG4gICAgX3RoaXMuc2V0T3ZlcmxheVJlZiA9IGZ1bmN0aW9uIChvdmVybGF5KSB7XG4gICAgICBfdGhpcy5vdmVybGF5ID0gb3ZlcmxheTtcbiAgICAgIF90aGlzLnByb3BzLm92ZXJsYXlSZWYgJiYgX3RoaXMucHJvcHMub3ZlcmxheVJlZihvdmVybGF5KTtcbiAgICB9O1xuXG4gICAgX3RoaXMuc2V0Q29udGVudFJlZiA9IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICBfdGhpcy5jb250ZW50ID0gY29udGVudDtcbiAgICAgIF90aGlzLnByb3BzLmNvbnRlbnRSZWYgJiYgX3RoaXMucHJvcHMuY29udGVudFJlZihjb250ZW50KTtcbiAgICB9O1xuXG4gICAgX3RoaXMuYWZ0ZXJDbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdGhpcyRwcm9wcyA9IF90aGlzLnByb3BzLFxuICAgICAgICAgIGFwcEVsZW1lbnQgPSBfdGhpcyRwcm9wcy5hcHBFbGVtZW50LFxuICAgICAgICAgIGFyaWFIaWRlQXBwID0gX3RoaXMkcHJvcHMuYXJpYUhpZGVBcHAsXG4gICAgICAgICAgaHRtbE9wZW5DbGFzc05hbWUgPSBfdGhpcyRwcm9wcy5odG1sT3BlbkNsYXNzTmFtZSxcbiAgICAgICAgICBib2R5T3BlbkNsYXNzTmFtZSA9IF90aGlzJHByb3BzLmJvZHlPcGVuQ2xhc3NOYW1lO1xuXG4gICAgICAvLyBSZW1vdmUgY2xhc3Nlcy5cblxuICAgICAgY2xhc3NMaXN0LnJlbW92ZShkb2N1bWVudC5ib2R5LCBib2R5T3BlbkNsYXNzTmFtZSk7XG5cbiAgICAgIGh0bWxPcGVuQ2xhc3NOYW1lICYmIGNsYXNzTGlzdC5yZW1vdmUoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJodG1sXCIpWzBdLCBodG1sT3BlbkNsYXNzTmFtZSk7XG5cbiAgICAgIC8vIFJlc2V0IGFyaWEtaGlkZGVuIGF0dHJpYnV0ZSBpZiBhbGwgbW9kYWxzIGhhdmUgYmVlbiByZW1vdmVkXG4gICAgICBpZiAoYXJpYUhpZGVBcHAgJiYgYXJpYUhpZGRlbkluc3RhbmNlcyA+IDApIHtcbiAgICAgICAgYXJpYUhpZGRlbkluc3RhbmNlcyAtPSAxO1xuXG4gICAgICAgIGlmIChhcmlhSGlkZGVuSW5zdGFuY2VzID09PSAwKSB7XG4gICAgICAgICAgYXJpYUFwcEhpZGVyLnNob3coYXBwRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLnByb3BzLnNob3VsZEZvY3VzQWZ0ZXJSZW5kZXIpIHtcbiAgICAgICAgaWYgKF90aGlzLnByb3BzLnNob3VsZFJldHVybkZvY3VzQWZ0ZXJDbG9zZSkge1xuICAgICAgICAgIGZvY3VzTWFuYWdlci5yZXR1cm5Gb2N1cygpO1xuICAgICAgICAgIGZvY3VzTWFuYWdlci50ZWFyZG93blNjb3BlZEZvY3VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9jdXNNYW5hZ2VyLnBvcFdpdGhvdXRGb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5iZWZvcmVPcGVuKCk7XG4gICAgICBpZiAoX3RoaXMuc3RhdGUuYWZ0ZXJPcGVuICYmIF90aGlzLnN0YXRlLmJlZm9yZUNsb3NlKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChfdGhpcy5jbG9zZVRpbWVyKTtcbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBiZWZvcmVDbG9zZTogZmFsc2UgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoX3RoaXMucHJvcHMuc2hvdWxkRm9jdXNBZnRlclJlbmRlcikge1xuICAgICAgICAgIGZvY3VzTWFuYWdlci5zZXR1cFNjb3BlZEZvY3VzKF90aGlzLm5vZGUpO1xuICAgICAgICAgIGZvY3VzTWFuYWdlci5tYXJrRm9yRm9jdXNMYXRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBpc09wZW46IHRydWUgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgYWZ0ZXJPcGVuOiB0cnVlIH0pO1xuXG4gICAgICAgICAgaWYgKF90aGlzLnByb3BzLmlzT3BlbiAmJiBfdGhpcy5wcm9wcy5vbkFmdGVyT3Blbikge1xuICAgICAgICAgICAgX3RoaXMucHJvcHMub25BZnRlck9wZW4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChfdGhpcy5wcm9wcy5jbG9zZVRpbWVvdXRNUyA+IDApIHtcbiAgICAgICAgX3RoaXMuY2xvc2VXaXRoVGltZW91dCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMuY2xvc2VXaXRob3V0VGltZW91dCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5mb2N1c0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMuY29udGVudCAmJiAhX3RoaXMuY29udGVudEhhc0ZvY3VzKCkgJiYgX3RoaXMuY29udGVudC5mb2N1cygpO1xuICAgIH07XG5cbiAgICBfdGhpcy5jbG9zZVdpdGhUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNsb3Nlc0F0ID0gRGF0ZS5ub3coKSArIF90aGlzLnByb3BzLmNsb3NlVGltZW91dE1TO1xuICAgICAgX3RoaXMuc2V0U3RhdGUoeyBiZWZvcmVDbG9zZTogdHJ1ZSwgY2xvc2VzQXQ6IGNsb3Nlc0F0IH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuY2xvc2VUaW1lciA9IHNldFRpbWVvdXQoX3RoaXMuY2xvc2VXaXRob3V0VGltZW91dCwgX3RoaXMuc3RhdGUuY2xvc2VzQXQgLSBEYXRlLm5vdygpKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfdGhpcy5jbG9zZVdpdGhvdXRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuc2V0U3RhdGUoe1xuICAgICAgICBiZWZvcmVDbG9zZTogZmFsc2UsXG4gICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgICAgIGFmdGVyT3BlbjogZmFsc2UsXG4gICAgICAgIGNsb3Nlc0F0OiBudWxsXG4gICAgICB9LCBfdGhpcy5hZnRlckNsb3NlKTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IFRBQl9LRVkpIHtcbiAgICAgICAgKDAsIF9zY29wZVRhYjIuZGVmYXVsdCkoX3RoaXMuY29udGVudCwgZXZlbnQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPbkVzYyAmJiBldmVudC5rZXlDb2RlID09PSBFU0NfS0VZKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBfdGhpcy5yZXF1ZXN0Q2xvc2UoZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVPdmVybGF5T25DbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKF90aGlzLnNob3VsZENsb3NlID09PSBudWxsKSB7XG4gICAgICAgIF90aGlzLnNob3VsZENsb3NlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLnNob3VsZENsb3NlICYmIF90aGlzLnByb3BzLnNob3VsZENsb3NlT25PdmVybGF5Q2xpY2spIHtcbiAgICAgICAgaWYgKF90aGlzLm93bmVySGFuZGxlc0Nsb3NlKCkpIHtcbiAgICAgICAgICBfdGhpcy5yZXF1ZXN0Q2xvc2UoZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLmZvY3VzQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBfdGhpcy5zaG91bGRDbG9zZSA9IG51bGw7XG4gICAgICBfdGhpcy5tb3ZlRnJvbUNvbnRlbnRUb092ZXJsYXkgPSBudWxsO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVPdmVybGF5T25Nb3VzZVVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKF90aGlzLm1vdmVGcm9tQ29udGVudFRvT3ZlcmxheSA9PT0gbnVsbCkge1xuICAgICAgICBfdGhpcy5zaG91bGRDbG9zZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKF90aGlzLnByb3BzLnNob3VsZENsb3NlT25PdmVybGF5Q2xpY2spIHtcbiAgICAgICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVDb250ZW50T25Nb3VzZVVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlT3ZlcmxheU9uTW91c2VEb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoIV90aGlzLnByb3BzLnNob3VsZENsb3NlT25PdmVybGF5Q2xpY2sgJiYgZXZlbnQudGFyZ2V0ID09IF90aGlzLm92ZXJsYXkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIF90aGlzLm1vdmVGcm9tQ29udGVudFRvT3ZlcmxheSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVDb250ZW50T25DbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnNob3VsZENsb3NlID0gZmFsc2U7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUNvbnRlbnRPbk1vdXNlRG93biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLnNob3VsZENsb3NlID0gZmFsc2U7XG4gICAgICBfdGhpcy5tb3ZlRnJvbUNvbnRlbnRUb092ZXJsYXkgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgX3RoaXMucmVxdWVzdENsb3NlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gX3RoaXMub3duZXJIYW5kbGVzQ2xvc2UoKSAmJiBfdGhpcy5wcm9wcy5vblJlcXVlc3RDbG9zZShldmVudCk7XG4gICAgfTtcblxuICAgIF90aGlzLm93bmVySGFuZGxlc0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLnByb3BzLm9uUmVxdWVzdENsb3NlO1xuICAgIH07XG5cbiAgICBfdGhpcy5zaG91bGRCZUNsb3NlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAhX3RoaXMuc3RhdGUuaXNPcGVuICYmICFfdGhpcy5zdGF0ZS5iZWZvcmVDbG9zZTtcbiAgICB9O1xuXG4gICAgX3RoaXMuY29udGVudEhhc0ZvY3VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IF90aGlzLmNvbnRlbnQgfHwgX3RoaXMuY29udGVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbiAgICB9O1xuXG4gICAgX3RoaXMuYnVpbGRDbGFzc05hbWUgPSBmdW5jdGlvbiAod2hpY2gsIGFkZGl0aW9uYWwpIHtcbiAgICAgIHZhciBjbGFzc05hbWVzID0gKHR5cGVvZiBhZGRpdGlvbmFsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoYWRkaXRpb25hbCkpID09PSBcIm9iamVjdFwiID8gYWRkaXRpb25hbCA6IHtcbiAgICAgICAgYmFzZTogQ0xBU1NfTkFNRVNbd2hpY2hdLFxuICAgICAgICBhZnRlck9wZW46IENMQVNTX05BTUVTW3doaWNoXSArIFwiLS1hZnRlci1vcGVuXCIsXG4gICAgICAgIGJlZm9yZUNsb3NlOiBDTEFTU19OQU1FU1t3aGljaF0gKyBcIi0tYmVmb3JlLWNsb3NlXCJcbiAgICAgIH07XG4gICAgICB2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcy5iYXNlO1xuICAgICAgaWYgKF90aGlzLnN0YXRlLmFmdGVyT3Blbikge1xuICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUgKyBcIiBcIiArIGNsYXNzTmFtZXMuYWZ0ZXJPcGVuO1xuICAgICAgfVxuICAgICAgaWYgKF90aGlzLnN0YXRlLmJlZm9yZUNsb3NlKSB7XG4gICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZSArIFwiIFwiICsgY2xhc3NOYW1lcy5iZWZvcmVDbG9zZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0eXBlb2YgYWRkaXRpb25hbCA9PT0gXCJzdHJpbmdcIiAmJiBhZGRpdGlvbmFsID8gY2xhc3NOYW1lICsgXCIgXCIgKyBhZGRpdGlvbmFsIDogY2xhc3NOYW1lO1xuICAgIH07XG5cbiAgICBfdGhpcy5hcmlhQXR0cmlidXRlcyA9IGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGl0ZW1zKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgbmFtZSkge1xuICAgICAgICBhY2NbXCJhcmlhLVwiICsgbmFtZV0gPSBpdGVtc1tuYW1lXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sIHt9KTtcbiAgICB9O1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBhZnRlck9wZW46IGZhbHNlLFxuICAgICAgYmVmb3JlQ2xvc2U6IGZhbHNlXG4gICAgfTtcblxuICAgIF90aGlzLnNob3VsZENsb3NlID0gbnVsbDtcbiAgICBfdGhpcy5tb3ZlRnJvbUNvbnRlbnRUb092ZXJsYXkgPSBudWxsO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhNb2RhbFBvcnRhbCwgW3tcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkTW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAvLyBGb2N1cyBuZWVkcyB0byBiZSBzZXQgd2hlbiBtb3VudGluZyBhbmQgYWxyZWFkeSBvcGVuXG4gICAgICBpZiAodGhpcy5wcm9wcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5zZXRGb2N1c0FmdGVyUmVuZGVyKHRydWUpO1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGlmIChuZXdQcm9wcy5ib2R5T3BlbkNsYXNzTmFtZSAhPT0gdGhpcy5wcm9wcy5ib2R5T3BlbkNsYXNzTmFtZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS53YXJuKCdSZWFjdC1Nb2RhbDogXCJib2R5T3BlbkNsYXNzTmFtZVwiIHByb3AgaGFzIGJlZW4gbW9kaWZpZWQuICcgKyBcIlRoaXMgbWF5IGNhdXNlIHVuZXhwZWN0ZWQgYmVoYXZpb3Igd2hlbiBtdWx0aXBsZSBtb2RhbHMgYXJlIG9wZW4uXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdQcm9wcy5odG1sT3BlbkNsYXNzTmFtZSAhPT0gdGhpcy5wcm9wcy5odG1sT3BlbkNsYXNzTmFtZSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS53YXJuKCdSZWFjdC1Nb2RhbDogXCJodG1sT3BlbkNsYXNzTmFtZVwiIHByb3AgaGFzIGJlZW4gbW9kaWZpZWQuICcgKyBcIlRoaXMgbWF5IGNhdXNlIHVuZXhwZWN0ZWQgYmVoYXZpb3Igd2hlbiBtdWx0aXBsZSBtb2RhbHMgYXJlIG9wZW4uXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBGb2N1cyBvbmx5IG5lZWRzIHRvIGJlIHNldCBvbmNlIHdoZW4gdGhlIG1vZGFsIGlzIGJlaW5nIG9wZW5lZFxuICAgICAgaWYgKCF0aGlzLnByb3BzLmlzT3BlbiAmJiBuZXdQcm9wcy5pc09wZW4pIHtcbiAgICAgICAgdGhpcy5zZXRGb2N1c0FmdGVyUmVuZGVyKHRydWUpO1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5pc09wZW4gJiYgIW5ld1Byb3BzLmlzT3Blbikge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbXBvbmVudERpZFVwZGF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICBpZiAodGhpcy5mb2N1c0FmdGVyUmVuZGVyKSB7XG4gICAgICAgIHRoaXMuZm9jdXNDb250ZW50KCk7XG4gICAgICAgIHRoaXMuc2V0Rm9jdXNBZnRlclJlbmRlcihmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbXBvbmVudFdpbGxVbm1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy5hZnRlckNsb3NlKCk7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5jbG9zZVRpbWVyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiYmVmb3JlT3BlblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBiZWZvcmVPcGVuKCkge1xuICAgICAgdmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgYXBwRWxlbWVudCA9IF9wcm9wcy5hcHBFbGVtZW50LFxuICAgICAgICAgIGFyaWFIaWRlQXBwID0gX3Byb3BzLmFyaWFIaWRlQXBwLFxuICAgICAgICAgIGh0bWxPcGVuQ2xhc3NOYW1lID0gX3Byb3BzLmh0bWxPcGVuQ2xhc3NOYW1lLFxuICAgICAgICAgIGJvZHlPcGVuQ2xhc3NOYW1lID0gX3Byb3BzLmJvZHlPcGVuQ2xhc3NOYW1lO1xuXG4gICAgICAvLyBBZGQgY2xhc3Nlcy5cblxuICAgICAgY2xhc3NMaXN0LmFkZChkb2N1bWVudC5ib2R5LCBib2R5T3BlbkNsYXNzTmFtZSk7XG5cbiAgICAgIGh0bWxPcGVuQ2xhc3NOYW1lICYmIGNsYXNzTGlzdC5hZGQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJodG1sXCIpWzBdLCBodG1sT3BlbkNsYXNzTmFtZSk7XG5cbiAgICAgIGlmIChhcmlhSGlkZUFwcCkge1xuICAgICAgICBhcmlhSGlkZGVuSW5zdGFuY2VzICs9IDE7XG4gICAgICAgIGFyaWFBcHBIaWRlci5oaWRlKGFwcEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERvbid0IHN0ZWFsIGZvY3VzIGZyb20gaW5uZXIgZWxlbWVudHNcblxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICB2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHMsXG4gICAgICAgICAgY2xhc3NOYW1lID0gX3Byb3BzMi5jbGFzc05hbWUsXG4gICAgICAgICAgb3ZlcmxheUNsYXNzTmFtZSA9IF9wcm9wczIub3ZlcmxheUNsYXNzTmFtZSxcbiAgICAgICAgICBkZWZhdWx0U3R5bGVzID0gX3Byb3BzMi5kZWZhdWx0U3R5bGVzO1xuXG4gICAgICB2YXIgY29udGVudFN0eWxlcyA9IGNsYXNzTmFtZSA/IHt9IDogZGVmYXVsdFN0eWxlcy5jb250ZW50O1xuICAgICAgdmFyIG92ZXJsYXlTdHlsZXMgPSBvdmVybGF5Q2xhc3NOYW1lID8ge30gOiBkZWZhdWx0U3R5bGVzLm92ZXJsYXk7XG5cbiAgICAgIHJldHVybiB0aGlzLnNob3VsZEJlQ2xvc2VkKCkgPyBudWxsIDogX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6IHRoaXMuc2V0T3ZlcmxheVJlZixcbiAgICAgICAgICBjbGFzc05hbWU6IHRoaXMuYnVpbGRDbGFzc05hbWUoXCJvdmVybGF5XCIsIG92ZXJsYXlDbGFzc05hbWUpLFxuICAgICAgICAgIHN0eWxlOiBfZXh0ZW5kcyh7fSwgb3ZlcmxheVN0eWxlcywgdGhpcy5wcm9wcy5zdHlsZS5vdmVybGF5KSxcbiAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZU92ZXJsYXlPbkNsaWNrLFxuICAgICAgICAgIG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZU92ZXJsYXlPbk1vdXNlRG93bixcbiAgICAgICAgICBvbk1vdXNlVXA6IHRoaXMuaGFuZGxlT3ZlcmxheU9uTW91c2VVcCxcbiAgICAgICAgICBcImFyaWEtbW9kYWxcIjogXCJ0cnVlXCJcbiAgICAgICAgfSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICBfZXh0ZW5kcyh7XG4gICAgICAgICAgICByZWY6IHRoaXMuc2V0Q29udGVudFJlZixcbiAgICAgICAgICAgIHN0eWxlOiBfZXh0ZW5kcyh7fSwgY29udGVudFN0eWxlcywgdGhpcy5wcm9wcy5zdHlsZS5jb250ZW50KSxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5idWlsZENsYXNzTmFtZShcImNvbnRlbnRcIiwgY2xhc3NOYW1lKSxcbiAgICAgICAgICAgIHRhYkluZGV4OiBcIi0xXCIsXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bixcbiAgICAgICAgICAgIG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZUNvbnRlbnRPbk1vdXNlRG93bixcbiAgICAgICAgICAgIG9uTW91c2VVcDogdGhpcy5oYW5kbGVDb250ZW50T25Nb3VzZVVwLFxuICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVDb250ZW50T25DbGljayxcbiAgICAgICAgICAgIHJvbGU6IHRoaXMucHJvcHMucm9sZSxcbiAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiB0aGlzLnByb3BzLmNvbnRlbnRMYWJlbFxuICAgICAgICAgIH0sIHRoaXMuYXJpYUF0dHJpYnV0ZXModGhpcy5wcm9wcy5hcmlhIHx8IHt9KSksXG4gICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBNb2RhbFBvcnRhbDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbk1vZGFsUG9ydGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgc3R5bGU6IHtcbiAgICBvdmVybGF5OiB7fSxcbiAgICBjb250ZW50OiB7fVxuICB9XG59O1xuTW9kYWxQb3J0YWwucHJvcFR5cGVzID0ge1xuICBpc09wZW46IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbC5pc1JlcXVpcmVkLFxuICBkZWZhdWx0U3R5bGVzOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnNoYXBlKHtcbiAgICBjb250ZW50OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdCxcbiAgICBvdmVybGF5OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdFxuICB9KSxcbiAgc3R5bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc2hhcGUoe1xuICAgIGNvbnRlbnQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICAgIG92ZXJsYXk6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0XG4gIH0pLFxuICBjbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3RdKSxcbiAgb3ZlcmxheUNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdF0pLFxuICBib2R5T3BlbkNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGh0bWxPcGVuQ2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgYXJpYUhpZGVBcHA6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgYXBwRWxlbWVudDogX3Byb3BUeXBlczIuZGVmYXVsdC5pbnN0YW5jZU9mKF9zYWZlSFRNTEVsZW1lbnQyLmRlZmF1bHQpLFxuICBvbkFmdGVyT3BlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuICBvblJlcXVlc3RDbG9zZTogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuICBjbG9zZVRpbWVvdXRNUzogX3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXIsXG4gIHNob3VsZEZvY3VzQWZ0ZXJSZW5kZXI6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgc2hvdWxkQ2xvc2VPbk92ZXJsYXlDbGljazogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBzaG91bGRSZXR1cm5Gb2N1c0FmdGVyQ2xvc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgcm9sZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGNvbnRlbnRMYWJlbDogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGFyaWE6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICBjaGlsZHJlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5ub2RlLFxuICBzaG91bGRDbG9zZU9uRXNjOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIG92ZXJsYXlSZWY6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcbiAgY29udGVudFJlZjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gTW9kYWxQb3J0YWw7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9jb21wb25lbnRzL01vZGFsUG9ydGFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvY29tcG9uZW50cy9Nb2RhbFBvcnRhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYXNzZXJ0Tm9kZUxpc3QgPSBhc3NlcnROb2RlTGlzdDtcbmV4cG9ydHMuc2V0RWxlbWVudCA9IHNldEVsZW1lbnQ7XG5leHBvcnRzLnZhbGlkYXRlRWxlbWVudCA9IHZhbGlkYXRlRWxlbWVudDtcbmV4cG9ydHMuaGlkZSA9IGhpZGU7XG5leHBvcnRzLnNob3cgPSBzaG93O1xuZXhwb3J0cy5kb2N1bWVudE5vdFJlYWR5T3JTU1JUZXN0aW5nID0gZG9jdW1lbnROb3RSZWFkeU9yU1NSVGVzdGluZztcbmV4cG9ydHMucmVzZXRGb3JUZXN0aW5nID0gcmVzZXRGb3JUZXN0aW5nO1xuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKFwid2FybmluZ1wiKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZ2xvYmFsRWxlbWVudCA9IG51bGw7XG5cbmZ1bmN0aW9uIGFzc2VydE5vZGVMaXN0KG5vZGVMaXN0LCBzZWxlY3Rvcikge1xuICBpZiAoIW5vZGVMaXN0IHx8ICFub2RlTGlzdC5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJyZWFjdC1tb2RhbDogTm8gZWxlbWVudHMgd2VyZSBmb3VuZCBmb3Igc2VsZWN0b3IgXCIgKyBzZWxlY3RvciArIFwiLlwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRFbGVtZW50KGVsZW1lbnQpIHtcbiAgdmFyIHVzZUVsZW1lbnQgPSBlbGVtZW50O1xuICBpZiAodHlwZW9mIHVzZUVsZW1lbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHVzZUVsZW1lbnQpO1xuICAgIGFzc2VydE5vZGVMaXN0KGVsLCB1c2VFbGVtZW50KTtcbiAgICB1c2VFbGVtZW50ID0gXCJsZW5ndGhcIiBpbiBlbCA/IGVsWzBdIDogZWw7XG4gIH1cbiAgZ2xvYmFsRWxlbWVudCA9IHVzZUVsZW1lbnQgfHwgZ2xvYmFsRWxlbWVudDtcbiAgcmV0dXJuIGdsb2JhbEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRWxlbWVudChhcHBFbGVtZW50KSB7XG4gIGlmICghYXBwRWxlbWVudCAmJiAhZ2xvYmFsRWxlbWVudCkge1xuICAgICgwLCBfd2FybmluZzIuZGVmYXVsdCkoZmFsc2UsIFtcInJlYWN0LW1vZGFsOiBBcHAgZWxlbWVudCBpcyBub3QgZGVmaW5lZC5cIiwgXCJQbGVhc2UgdXNlIGBNb2RhbC5zZXRBcHBFbGVtZW50KGVsKWAgb3Igc2V0IGBhcHBFbGVtZW50PXtlbH1gLlwiLCBcIlRoaXMgaXMgbmVlZGVkIHNvIHNjcmVlbiByZWFkZXJzIGRvbid0IHNlZSBtYWluIGNvbnRlbnRcIiwgXCJ3aGVuIG1vZGFsIGlzIG9wZW5lZC4gSXQgaXMgbm90IHJlY29tbWVuZGVkLCBidXQgeW91IGNhbiBvcHQtb3V0XCIsIFwiYnkgc2V0dGluZyBgYXJpYUhpZGVBcHA9e2ZhbHNlfWAuXCJdLmpvaW4oXCIgXCIpKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBoaWRlKGFwcEVsZW1lbnQpIHtcbiAgaWYgKHZhbGlkYXRlRWxlbWVudChhcHBFbGVtZW50KSkge1xuICAgIChhcHBFbGVtZW50IHx8IGdsb2JhbEVsZW1lbnQpLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93KGFwcEVsZW1lbnQpIHtcbiAgaWYgKHZhbGlkYXRlRWxlbWVudChhcHBFbGVtZW50KSkge1xuICAgIChhcHBFbGVtZW50IHx8IGdsb2JhbEVsZW1lbnQpLnJlbW92ZUF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRvY3VtZW50Tm90UmVhZHlPclNTUlRlc3RpbmcoKSB7XG4gIGdsb2JhbEVsZW1lbnQgPSBudWxsO1xufVxuXG5mdW5jdGlvbiByZXNldEZvclRlc3RpbmcoKSB7XG4gIGdsb2JhbEVsZW1lbnQgPSBudWxsO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2FyaWFBcHBIaWRlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvYXJpYUFwcEhpZGVyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kdW1wQ2xhc3NMaXN0cyA9IGR1bXBDbGFzc0xpc3RzO1xudmFyIGh0bWxDbGFzc0xpc3QgPSB7fTtcbnZhciBkb2NCb2R5Q2xhc3NMaXN0ID0ge307XG5cbmZ1bmN0aW9uIGR1bXBDbGFzc0xpc3RzKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgdmFyIGNsYXNzZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImh0bWxcIilbMF0uY2xhc3NOYW1lO1xuICAgIHZhciBidWZmZXIgPSBcIlNob3cgdHJhY2tlZCBjbGFzc2VzOlxcblxcblwiO1xuXG4gICAgYnVmZmVyICs9IFwiPGh0bWwgLz4gKFwiICsgY2xhc3NlcyArIFwiKTpcXG5cIjtcbiAgICBmb3IgKHZhciB4IGluIGh0bWxDbGFzc0xpc3QpIHtcbiAgICAgIGJ1ZmZlciArPSBcIiAgXCIgKyB4ICsgXCIgXCIgKyBodG1sQ2xhc3NMaXN0W3hdICsgXCJcXG5cIjtcbiAgICB9XG5cbiAgICBjbGFzc2VzID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWU7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIGJ1ZmZlciArPSBcIlxcblxcbmRvYy5ib2R5IChcIiArIGNsYXNzZXMgKyBcIik6XFxuXCI7XG4gICAgZm9yICh2YXIgX3ggaW4gZG9jQm9keUNsYXNzTGlzdCkge1xuICAgICAgYnVmZmVyICs9IFwiICBcIiArIF94ICsgXCIgXCIgKyBkb2NCb2R5Q2xhc3NMaXN0W194XSArIFwiXFxuXCI7XG4gICAgfVxuXG4gICAgYnVmZmVyICs9IFwiXFxuXCI7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKGJ1ZmZlcik7XG4gIH1cbn1cblxuLyoqXG4gKiBUcmFjayB0aGUgbnVtYmVyIG9mIHJlZmVyZW5jZSBvZiBhIGNsYXNzLlxuICogQHBhcmFtIHtvYmplY3R9IHBvbGwgVGhlIHBvbGwgdG8gcmVjZWl2ZSB0aGUgcmVmZXJlbmNlLlxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSBUaGUgY2xhc3MgbmFtZS5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xudmFyIGluY3JlbWVudFJlZmVyZW5jZSA9IGZ1bmN0aW9uIGluY3JlbWVudFJlZmVyZW5jZShwb2xsLCBjbGFzc05hbWUpIHtcbiAgaWYgKCFwb2xsW2NsYXNzTmFtZV0pIHtcbiAgICBwb2xsW2NsYXNzTmFtZV0gPSAwO1xuICB9XG4gIHBvbGxbY2xhc3NOYW1lXSArPSAxO1xuICByZXR1cm4gY2xhc3NOYW1lO1xufTtcblxuLyoqXG4gKiBEcm9wIHRoZSByZWZlcmVuY2Ugb2YgYSBjbGFzcy5cbiAqIEBwYXJhbSB7b2JqZWN0fSBwb2xsIFRoZSBwb2xsIHRvIHJlY2VpdmUgdGhlIHJlZmVyZW5jZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgVGhlIGNsYXNzIG5hbWUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbnZhciBkZWNyZW1lbnRSZWZlcmVuY2UgPSBmdW5jdGlvbiBkZWNyZW1lbnRSZWZlcmVuY2UocG9sbCwgY2xhc3NOYW1lKSB7XG4gIGlmIChwb2xsW2NsYXNzTmFtZV0pIHtcbiAgICBwb2xsW2NsYXNzTmFtZV0gLT0gMTtcbiAgfVxuICByZXR1cm4gY2xhc3NOYW1lO1xufTtcblxuLyoqXG4gKiBUcmFjayBhIGNsYXNzIGFuZCBhZGQgdG8gdGhlIGdpdmVuIGNsYXNzIGxpc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gY2xhc3NMaXN0UmVmIEEgY2xhc3MgbGlzdCBvZiBhbiBlbGVtZW50LlxuICogQHBhcmFtIHtPYmplY3R9IHBvbGwgICAgICAgICBUaGUgcG9sbCB0byBiZSB1c2VkLlxuICogQHBhcmFtIHtBcnJheX0gIGNsYXNzZXMgICAgICBUaGUgbGlzdCBvZiBjbGFzc2VzIHRvIGJlIHRyYWNrZWQuXG4gKi9cbnZhciB0cmFja0NsYXNzID0gZnVuY3Rpb24gdHJhY2tDbGFzcyhjbGFzc0xpc3RSZWYsIHBvbGwsIGNsYXNzZXMpIHtcbiAgY2xhc3Nlcy5mb3JFYWNoKGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICBpbmNyZW1lbnRSZWZlcmVuY2UocG9sbCwgY2xhc3NOYW1lKTtcbiAgICBjbGFzc0xpc3RSZWYuYWRkKGNsYXNzTmFtZSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBVbnRyYWNrIGEgY2xhc3MgYW5kIHJlbW92ZSBmcm9tIHRoZSBnaXZlbiBjbGFzcyBsaXN0IGlmIHRoZSByZWZlcmVuY2VcbiAqIHJlYWNoZXMgMC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjbGFzc0xpc3RSZWYgQSBjbGFzcyBsaXN0IG9mIGFuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gcG9sbCAgICAgICAgIFRoZSBwb2xsIHRvIGJlIHVzZWQuXG4gKiBAcGFyYW0ge0FycmF5fSAgY2xhc3NlcyAgICAgIFRoZSBsaXN0IG9mIGNsYXNzZXMgdG8gYmUgdW50cmFja2VkLlxuICovXG52YXIgdW50cmFja0NsYXNzID0gZnVuY3Rpb24gdW50cmFja0NsYXNzKGNsYXNzTGlzdFJlZiwgcG9sbCwgY2xhc3Nlcykge1xuICBjbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgIGRlY3JlbWVudFJlZmVyZW5jZShwb2xsLCBjbGFzc05hbWUpO1xuICAgIHBvbGxbY2xhc3NOYW1lXSA9PT0gMCAmJiBjbGFzc0xpc3RSZWYucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBQdWJsaWMgaW5mZXJmYWNlIHRvIGFkZCBjbGFzc2VzIHRvIHRoZSBkb2N1bWVudC5ib2R5LlxuICogQHBhcmFtIHtzdHJpbmd9IGJvZHlDbGFzcyBUaGUgY2xhc3Mgc3RyaW5nIHRvIGJlIGFkZGVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBJdCBtYXkgY29udGFpbiBtb3JlIHRoZW4gb25lIGNsYXNzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggJyAnIGFzIHNlcGFyYXRvci5cbiAqL1xudmFyIGFkZCA9IGV4cG9ydHMuYWRkID0gZnVuY3Rpb24gYWRkKGVsZW1lbnQsIGNsYXNzU3RyaW5nKSB7XG4gIHJldHVybiB0cmFja0NsYXNzKGVsZW1lbnQuY2xhc3NMaXN0LCBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT0gXCJodG1sXCIgPyBodG1sQ2xhc3NMaXN0IDogZG9jQm9keUNsYXNzTGlzdCwgY2xhc3NTdHJpbmcuc3BsaXQoXCIgXCIpKTtcbn07XG5cbi8qKlxuICogUHVibGljIGluZmVyZmFjZSB0byByZW1vdmUgY2xhc3NlcyBmcm9tIHRoZSBkb2N1bWVudC5ib2R5LlxuICogQHBhcmFtIHtzdHJpbmd9IGJvZHlDbGFzcyBUaGUgY2xhc3Mgc3RyaW5nIHRvIGJlIGFkZGVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICBJdCBtYXkgY29udGFpbiBtb3JlIHRoZW4gb25lIGNsYXNzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggJyAnIGFzIHNlcGFyYXRvci5cbiAqL1xudmFyIHJlbW92ZSA9IGV4cG9ydHMucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQsIGNsYXNzU3RyaW5nKSB7XG4gIHJldHVybiB1bnRyYWNrQ2xhc3MoZWxlbWVudC5jbGFzc0xpc3QsIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PSBcImh0bWxcIiA/IGh0bWxDbGFzc0xpc3QgOiBkb2NCb2R5Q2xhc3NMaXN0LCBjbGFzc1N0cmluZy5zcGxpdChcIiBcIikpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9jbGFzc0xpc3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2NsYXNzTGlzdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuaGFuZGxlQmx1ciA9IGhhbmRsZUJsdXI7XG5leHBvcnRzLmhhbmRsZUZvY3VzID0gaGFuZGxlRm9jdXM7XG5leHBvcnRzLm1hcmtGb3JGb2N1c0xhdGVyID0gbWFya0ZvckZvY3VzTGF0ZXI7XG5leHBvcnRzLnJldHVybkZvY3VzID0gcmV0dXJuRm9jdXM7XG5leHBvcnRzLnBvcFdpdGhvdXRGb2N1cyA9IHBvcFdpdGhvdXRGb2N1cztcbmV4cG9ydHMuc2V0dXBTY29wZWRGb2N1cyA9IHNldHVwU2NvcGVkRm9jdXM7XG5leHBvcnRzLnRlYXJkb3duU2NvcGVkRm9jdXMgPSB0ZWFyZG93blNjb3BlZEZvY3VzO1xuXG52YXIgX3RhYmJhYmxlID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdGFiYmFibGVcIik7XG5cbnZhciBfdGFiYmFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGFiYmFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZm9jdXNMYXRlckVsZW1lbnRzID0gW107XG52YXIgbW9kYWxFbGVtZW50ID0gbnVsbDtcbnZhciBuZWVkVG9Gb2N1cyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBoYW5kbGVCbHVyKCkge1xuICBuZWVkVG9Gb2N1cyA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUZvY3VzKCkge1xuICBpZiAobmVlZFRvRm9jdXMpIHtcbiAgICBuZWVkVG9Gb2N1cyA9IGZhbHNlO1xuICAgIGlmICghbW9kYWxFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIG5lZWQgdG8gc2VlIGhvdyBqUXVlcnkgc2hpbXMgZG9jdW1lbnQub24oJ2ZvY3VzaW4nKSBzbyB3ZSBkb24ndCBuZWVkIHRoZVxuICAgIC8vIHNldFRpbWVvdXQsIGZpcmVmb3ggZG9lc24ndCBzdXBwb3J0IGZvY3VzaW4sIGlmIGl0IGRpZCwgd2UgY291bGQgZm9jdXNcbiAgICAvLyB0aGUgZWxlbWVudCBvdXRzaWRlIG9mIGEgc2V0VGltZW91dC4gU2lkZS1lZmZlY3Qgb2YgdGhpcyBpbXBsZW1lbnRhdGlvblxuICAgIC8vIGlzIHRoYXQgdGhlIGRvY3VtZW50LmJvZHkgZ2V0cyBmb2N1cywgYW5kIHRoZW4gd2UgZm9jdXMgb3VyIGVsZW1lbnQgcmlnaHRcbiAgICAvLyBhZnRlciwgc2VlbXMgZmluZS5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChtb2RhbEVsZW1lbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGVsID0gKDAsIF90YWJiYWJsZTIuZGVmYXVsdCkobW9kYWxFbGVtZW50KVswXSB8fCBtb2RhbEVsZW1lbnQ7XG4gICAgICBlbC5mb2N1cygpO1xuICAgIH0sIDApO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcmtGb3JGb2N1c0xhdGVyKCkge1xuICBmb2N1c0xhdGVyRWxlbWVudHMucHVzaChkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcbn1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuZnVuY3Rpb24gcmV0dXJuRm9jdXMoKSB7XG4gIHZhciB0b0ZvY3VzID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBpZiAoZm9jdXNMYXRlckVsZW1lbnRzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdG9Gb2N1cyA9IGZvY3VzTGF0ZXJFbGVtZW50cy5wb3AoKTtcbiAgICAgIHRvRm9jdXMuZm9jdXMoKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS53YXJuKFtcIllvdSB0cmllZCB0byByZXR1cm4gZm9jdXMgdG9cIiwgdG9Gb2N1cywgXCJidXQgaXQgaXMgbm90IGluIHRoZSBET00gYW55bW9yZVwiXS5qb2luKFwiIFwiKSk7XG4gIH1cbn1cbi8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuXG5mdW5jdGlvbiBwb3BXaXRob3V0Rm9jdXMoKSB7XG4gIGZvY3VzTGF0ZXJFbGVtZW50cy5sZW5ndGggPiAwICYmIGZvY3VzTGF0ZXJFbGVtZW50cy5wb3AoKTtcbn1cblxuZnVuY3Rpb24gc2V0dXBTY29wZWRGb2N1cyhlbGVtZW50KSB7XG4gIG1vZGFsRWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGhhbmRsZUJsdXIsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgaGFuZGxlRm9jdXMsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHdpbmRvdy5hdHRhY2hFdmVudChcIm9uQmx1clwiLCBoYW5kbGVCbHVyKTtcbiAgICBkb2N1bWVudC5hdHRhY2hFdmVudChcIm9uRm9jdXNcIiwgaGFuZGxlRm9jdXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRlYXJkb3duU2NvcGVkRm9jdXMoKSB7XG4gIG1vZGFsRWxlbWVudCA9IG51bGw7XG5cbiAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGhhbmRsZUJsdXIpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBoYW5kbGVGb2N1cyk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93LmRldGFjaEV2ZW50KFwib25CbHVyXCIsIGhhbmRsZUJsdXIpO1xuICAgIGRvY3VtZW50LmRldGFjaEV2ZW50KFwib25Gb2N1c1wiLCBoYW5kbGVGb2N1cyk7XG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9mb2N1c01hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2ZvY3VzTWFuYWdlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY2FuVXNlRE9NID0gdW5kZWZpbmVkO1xuXG52YXIgX2V4ZW52ID0gcmVxdWlyZShcImV4ZW52XCIpO1xuXG52YXIgX2V4ZW52MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4ZW52KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIEVFID0gX2V4ZW52Mi5kZWZhdWx0O1xuXG52YXIgU2FmZUhUTUxFbGVtZW50ID0gRUUuY2FuVXNlRE9NID8gd2luZG93LkhUTUxFbGVtZW50IDoge307XG5cbnZhciBjYW5Vc2VET00gPSBleHBvcnRzLmNhblVzZURPTSA9IEVFLmNhblVzZURPTTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2FmZUhUTUxFbGVtZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3NhZmVIVE1MRWxlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvc2FmZUhUTUxFbGVtZW50LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gc2NvcGVUYWI7XG5cbnZhciBfdGFiYmFibGUgPSByZXF1aXJlKFwiLi90YWJiYWJsZVwiKTtcblxudmFyIF90YWJiYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90YWJiYWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHNjb3BlVGFiKG5vZGUsIGV2ZW50KSB7XG4gIHZhciB0YWJiYWJsZSA9ICgwLCBfdGFiYmFibGUyLmRlZmF1bHQpKG5vZGUpO1xuXG4gIGlmICghdGFiYmFibGUubGVuZ3RoKSB7XG4gICAgLy8gRG8gbm90aGluZywgc2luY2UgdGhlcmUgYXJlIG5vIGVsZW1lbnRzIHRoYXQgY2FuIHJlY2VpdmUgZm9jdXMuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc2hpZnRLZXkgPSBldmVudC5zaGlmdEtleTtcbiAgdmFyIGhlYWQgPSB0YWJiYWJsZVswXTtcbiAgdmFyIHRhaWwgPSB0YWJiYWJsZVt0YWJiYWJsZS5sZW5ndGggLSAxXTtcblxuICAvLyBwcm9jZWVkIHdpdGggZGVmYXVsdCBicm93c2VyIGJlaGF2aW9yIG9uIHRhYi5cbiAgLy8gRm9jdXMgb24gbGFzdCBlbGVtZW50IG9uIHNoaWZ0ICsgdGFiLlxuICBpZiAobm9kZSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgIGlmICghc2hpZnRLZXkpIHJldHVybjtcbiAgICB0YXJnZXQgPSB0YWlsO1xuICB9XG5cbiAgdmFyIHRhcmdldDtcbiAgaWYgKHRhaWwgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgIXNoaWZ0S2V5KSB7XG4gICAgdGFyZ2V0ID0gaGVhZDtcbiAgfVxuXG4gIGlmIChoZWFkID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIHNoaWZ0S2V5KSB7XG4gICAgdGFyZ2V0ID0gdGFpbDtcbiAgfVxuXG4gIGlmICh0YXJnZXQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRhcmdldC5mb2N1cygpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFNhZmFyaSByYWRpbyBpc3N1ZS5cbiAgLy9cbiAgLy8gU2FmYXJpIGRvZXMgbm90IG1vdmUgdGhlIGZvY3VzIHRvIHRoZSByYWRpbyBidXR0b24sXG4gIC8vIHNvIHdlIG5lZWQgdG8gZm9yY2UgaXQgdG8gcmVhbGx5IHdhbGsgdGhyb3VnaCBhbGwgZWxlbWVudHMuXG4gIC8vXG4gIC8vIFRoaXMgaXMgdmVyeSBlcnJvciBwcnVuZSwgc2luY2Ugd2UgYXJlIHRyeWluZyB0byBndWVzc1xuICAvLyBpZiBpdCBpcyBhIHNhZmFyaSBicm93c2VyIGZyb20gdGhlIGZpcnN0IG9jY3VyZW5jZSBiZXR3ZWVuXG4gIC8vIGNocm9tZSBvciBzYWZhcmkuXG4gIC8vXG4gIC8vIFRoZSBjaHJvbWUgdXNlciBhZ2VudCBjb250YWlucyB0aGUgZmlyc3Qgb2N1cnJlbmNlXG4gIC8vIGFzIHRoZSAnY2hyb21lL3ZlcnNpb24nIGFuZCBsYXRlciB0aGUgJ3NhZmFyaS92ZXJzaW9uJy5cbiAgdmFyIGNoZWNrU2FmYXJpID0gLyhcXGJDaHJvbWVcXGJ8XFxiU2FmYXJpXFxiKVxcLy8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgdmFyIGlzU2FmYXJpRGVza3RvcCA9IGNoZWNrU2FmYXJpICE9IG51bGwgJiYgY2hlY2tTYWZhcmlbMV0gIT0gXCJDaHJvbWVcIiAmJiAvXFxiaVBvZFxcYnxcXGJpUGFkXFxiL2cuZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSA9PSBudWxsO1xuXG4gIC8vIElmIHdlIGFyZSBub3QgaW4gc2FmYXJpIGRlc2t0b3AsIGxldCB0aGUgYnJvd3NlciBjb250cm9sXG4gIC8vIHRoZSBmb2N1c1xuICBpZiAoIWlzU2FmYXJpRGVza3RvcCkgcmV0dXJuO1xuXG4gIHZhciB4ID0gdGFiYmFibGUuaW5kZXhPZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KTtcblxuICBpZiAoeCA+IC0xKSB7XG4gICAgeCArPSBzaGlmdEtleSA/IC0xIDogMTtcbiAgfVxuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdGFiYmFibGVbeF0uZm9jdXMoKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvc2NvcGVUYWIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3Njb3BlVGFiLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZmluZFRhYmJhYmxlRGVzY2VuZGFudHM7XG4vKiFcbiAqIEFkYXB0ZWQgZnJvbSBqUXVlcnkgVUkgY29yZVxuICpcbiAqIGh0dHA6Ly9qcXVlcnl1aS5jb21cbiAqXG4gKiBDb3B5cmlnaHQgMjAxNCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogaHR0cDovL2FwaS5qcXVlcnl1aS5jb20vY2F0ZWdvcnkvdWktY29yZS9cbiAqL1xuXG52YXIgdGFiYmFibGVOb2RlID0gL2lucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b258b2JqZWN0LztcblxuZnVuY3Rpb24gaGlkZXNDb250ZW50cyhlbGVtZW50KSB7XG4gIHZhciB6ZXJvU2l6ZSA9IGVsZW1lbnQub2Zmc2V0V2lkdGggPD0gMCAmJiBlbGVtZW50Lm9mZnNldEhlaWdodCA8PSAwO1xuXG4gIC8vIElmIHRoZSBub2RlIGlzIGVtcHR5LCB0aGlzIGlzIGdvb2QgZW5vdWdoXG4gIGlmICh6ZXJvU2l6ZSAmJiAhZWxlbWVudC5pbm5lckhUTUwpIHJldHVybiB0cnVlO1xuXG4gIC8vIE90aGVyd2lzZSB3ZSBuZWVkIHRvIGNoZWNrIHNvbWUgc3R5bGVzXG4gIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICByZXR1cm4gemVyb1NpemUgPyBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFwib3ZlcmZsb3dcIikgIT09IFwidmlzaWJsZVwiIDogc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShcImRpc3BsYXlcIikgPT0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIHZpc2libGUoZWxlbWVudCkge1xuICB2YXIgcGFyZW50RWxlbWVudCA9IGVsZW1lbnQ7XG4gIHdoaWxlIChwYXJlbnRFbGVtZW50KSB7XG4gICAgaWYgKHBhcmVudEVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIGJyZWFrO1xuICAgIGlmIChoaWRlc0NvbnRlbnRzKHBhcmVudEVsZW1lbnQpKSByZXR1cm4gZmFsc2U7XG4gICAgcGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZm9jdXNhYmxlKGVsZW1lbnQsIGlzVGFiSW5kZXhOb3ROYU4pIHtcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICB2YXIgcmVzID0gdGFiYmFibGVOb2RlLnRlc3Qobm9kZU5hbWUpICYmICFlbGVtZW50LmRpc2FibGVkIHx8IChub2RlTmFtZSA9PT0gXCJhXCIgPyBlbGVtZW50LmhyZWYgfHwgaXNUYWJJbmRleE5vdE5hTiA6IGlzVGFiSW5kZXhOb3ROYU4pO1xuICByZXR1cm4gcmVzICYmIHZpc2libGUoZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIHRhYmJhYmxlKGVsZW1lbnQpIHtcbiAgdmFyIHRhYkluZGV4ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKTtcbiAgaWYgKHRhYkluZGV4ID09PSBudWxsKSB0YWJJbmRleCA9IHVuZGVmaW5lZDtcbiAgdmFyIGlzVGFiSW5kZXhOYU4gPSBpc05hTih0YWJJbmRleCk7XG4gIHJldHVybiAoaXNUYWJJbmRleE5hTiB8fCB0YWJJbmRleCA+PSAwKSAmJiBmb2N1c2FibGUoZWxlbWVudCwgIWlzVGFiSW5kZXhOYU4pO1xufVxuXG5mdW5jdGlvbiBmaW5kVGFiYmFibGVEZXNjZW5kYW50cyhlbGVtZW50KSB7XG4gIHJldHVybiBbXS5zbGljZS5jYWxsKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcIipcIiksIDApLmZpbHRlcih0YWJiYWJsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3RhYmJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy90YWJiYWJsZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9Nb2RhbCA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHMvTW9kYWxcIik7XG5cbnZhciBfTW9kYWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTW9kYWwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfTW9kYWwyLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBDaGlsZHJlbiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBzdG9yZVNoYXBlLCBzdWJzY3JpcHRpb25TaGFwZSB9IGZyb20gJy4uL3V0aWxzL1Byb3BUeXBlcyc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuLi91dGlscy93YXJuaW5nJztcblxudmFyIGRpZFdhcm5BYm91dFJlY2VpdmluZ1N0b3JlID0gZmFsc2U7XG5mdW5jdGlvbiB3YXJuQWJvdXRSZWNlaXZpbmdTdG9yZSgpIHtcbiAgaWYgKGRpZFdhcm5BYm91dFJlY2VpdmluZ1N0b3JlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRpZFdhcm5BYm91dFJlY2VpdmluZ1N0b3JlID0gdHJ1ZTtcblxuICB3YXJuaW5nKCc8UHJvdmlkZXI+IGRvZXMgbm90IHN1cHBvcnQgY2hhbmdpbmcgYHN0b3JlYCBvbiB0aGUgZmx5LiAnICsgJ0l0IGlzIG1vc3QgbGlrZWx5IHRoYXQgeW91IHNlZSB0aGlzIGVycm9yIGJlY2F1c2UgeW91IHVwZGF0ZWQgdG8gJyArICdSZWR1eCAyLnggYW5kIFJlYWN0IFJlZHV4IDIueCB3aGljaCBubyBsb25nZXIgaG90IHJlbG9hZCByZWR1Y2VycyAnICsgJ2F1dG9tYXRpY2FsbHkuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZWFjdC1yZWR1eC9yZWxlYXNlcy8nICsgJ3RhZy92Mi4wLjAgZm9yIHRoZSBtaWdyYXRpb24gaW5zdHJ1Y3Rpb25zLicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXIoKSB7XG4gIHZhciBfUHJvdmlkZXIkY2hpbGRDb250ZXg7XG5cbiAgdmFyIHN0b3JlS2V5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnc3RvcmUnO1xuICB2YXIgc3ViS2V5ID0gYXJndW1lbnRzWzFdO1xuXG4gIHZhciBzdWJzY3JpcHRpb25LZXkgPSBzdWJLZXkgfHwgc3RvcmVLZXkgKyAnU3Vic2NyaXB0aW9uJztcblxuICB2YXIgUHJvdmlkZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIF9pbmhlcml0cyhQcm92aWRlciwgX0NvbXBvbmVudCk7XG5cbiAgICBQcm92aWRlci5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgdmFyIF9yZWY7XG5cbiAgICAgIHJldHVybiBfcmVmID0ge30sIF9yZWZbc3RvcmVLZXldID0gdGhpc1tzdG9yZUtleV0sIF9yZWZbc3Vic2NyaXB0aW9uS2V5XSA9IG51bGwsIF9yZWY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFByb3ZpZGVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUHJvdmlkZXIpO1xuXG4gICAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgICAgX3RoaXNbc3RvcmVLZXldID0gcHJvcHMuc3RvcmU7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgUHJvdmlkZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBDaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIH07XG5cbiAgICByZXR1cm4gUHJvdmlkZXI7XG4gIH0oQ29tcG9uZW50KTtcblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIFByb3ZpZGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgICAgaWYgKHRoaXNbc3RvcmVLZXldICE9PSBuZXh0UHJvcHMuc3RvcmUpIHtcbiAgICAgICAgd2FybkFib3V0UmVjZWl2aW5nU3RvcmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgUHJvdmlkZXIucHJvcFR5cGVzID0ge1xuICAgIHN0b3JlOiBzdG9yZVNoYXBlLmlzUmVxdWlyZWQsXG4gICAgY2hpbGRyZW46IFByb3BUeXBlcy5lbGVtZW50LmlzUmVxdWlyZWRcbiAgfTtcbiAgUHJvdmlkZXIuY2hpbGRDb250ZXh0VHlwZXMgPSAoX1Byb3ZpZGVyJGNoaWxkQ29udGV4ID0ge30sIF9Qcm92aWRlciRjaGlsZENvbnRleFtzdG9yZUtleV0gPSBzdG9yZVNoYXBlLmlzUmVxdWlyZWQsIF9Qcm92aWRlciRjaGlsZENvbnRleFtzdWJzY3JpcHRpb25LZXldID0gc3Vic2NyaXB0aW9uU2hhcGUsIF9Qcm92aWRlciRjaGlsZENvbnRleCk7XG5cbiAgcmV0dXJuIFByb3ZpZGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQcm92aWRlcigpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2NvbXBvbmVudHMvUHJvdmlkZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2NvbXBvbmVudHMvUHJvdmlkZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmltcG9ydCBob2lzdFN0YXRpY3MgZnJvbSAnaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MnO1xuaW1wb3J0IGludmFyaWFudCBmcm9tICdpbnZhcmlhbnQnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBjcmVhdGVFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgU3Vic2NyaXB0aW9uIGZyb20gJy4uL3V0aWxzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBzdG9yZVNoYXBlLCBzdWJzY3JpcHRpb25TaGFwZSB9IGZyb20gJy4uL3V0aWxzL1Byb3BUeXBlcyc7XG5cbnZhciBob3RSZWxvYWRpbmdWZXJzaW9uID0gMDtcbnZhciBkdW1teVN0YXRlID0ge307XG5mdW5jdGlvbiBub29wKCkge31cbmZ1bmN0aW9uIG1ha2VTZWxlY3RvclN0YXRlZnVsKHNvdXJjZVNlbGVjdG9yLCBzdG9yZSkge1xuICAvLyB3cmFwIHRoZSBzZWxlY3RvciBpbiBhbiBvYmplY3QgdGhhdCB0cmFja3MgaXRzIHJlc3VsdHMgYmV0d2VlbiBydW5zLlxuICB2YXIgc2VsZWN0b3IgPSB7XG4gICAgcnVuOiBmdW5jdGlvbiBydW5Db21wb25lbnRTZWxlY3Rvcihwcm9wcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIG5leHRQcm9wcyA9IHNvdXJjZVNlbGVjdG9yKHN0b3JlLmdldFN0YXRlKCksIHByb3BzKTtcbiAgICAgICAgaWYgKG5leHRQcm9wcyAhPT0gc2VsZWN0b3IucHJvcHMgfHwgc2VsZWN0b3IuZXJyb3IpIHtcbiAgICAgICAgICBzZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgIHNlbGVjdG9yLnByb3BzID0gbmV4dFByb3BzO1xuICAgICAgICAgIHNlbGVjdG9yLmVycm9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgc2VsZWN0b3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHNlbGVjdG9yO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25uZWN0QWR2YW5jZWQoXG4vKlxuICBzZWxlY3RvckZhY3RvcnkgaXMgYSBmdW5jIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIHJldHVybmluZyB0aGUgc2VsZWN0b3IgZnVuY3Rpb24gdXNlZCB0b1xuICBjb21wdXRlIG5ldyBwcm9wcyBmcm9tIHN0YXRlLCBwcm9wcywgYW5kIGRpc3BhdGNoLiBGb3IgZXhhbXBsZTpcbiAgICAgZXhwb3J0IGRlZmF1bHQgY29ubmVjdEFkdmFuY2VkKChkaXNwYXRjaCwgb3B0aW9ucykgPT4gKHN0YXRlLCBwcm9wcykgPT4gKHtcbiAgICAgIHRoaW5nOiBzdGF0ZS50aGluZ3NbcHJvcHMudGhpbmdJZF0sXG4gICAgICBzYXZlVGhpbmc6IGZpZWxkcyA9PiBkaXNwYXRjaChhY3Rpb25DcmVhdG9ycy5zYXZlVGhpbmcocHJvcHMudGhpbmdJZCwgZmllbGRzKSksXG4gICAgfSkpKFlvdXJDb21wb25lbnQpXG4gICBBY2Nlc3MgdG8gZGlzcGF0Y2ggaXMgcHJvdmlkZWQgdG8gdGhlIGZhY3Rvcnkgc28gc2VsZWN0b3JGYWN0b3JpZXMgY2FuIGJpbmQgYWN0aW9uQ3JlYXRvcnNcbiAgb3V0c2lkZSBvZiB0aGVpciBzZWxlY3RvciBhcyBhbiBvcHRpbWl6YXRpb24uIE9wdGlvbnMgcGFzc2VkIHRvIGNvbm5lY3RBZHZhbmNlZCBhcmUgcGFzc2VkIHRvXG4gIHRoZSBzZWxlY3RvckZhY3RvcnksIGFsb25nIHdpdGggZGlzcGxheU5hbWUgYW5kIFdyYXBwZWRDb21wb25lbnQsIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICBOb3RlIHRoYXQgc2VsZWN0b3JGYWN0b3J5IGlzIHJlc3BvbnNpYmxlIGZvciBhbGwgY2FjaGluZy9tZW1vaXphdGlvbiBvZiBpbmJvdW5kIGFuZCBvdXRib3VuZFxuICBwcm9wcy4gRG8gbm90IHVzZSBjb25uZWN0QWR2YW5jZWQgZGlyZWN0bHkgd2l0aG91dCBtZW1vaXppbmcgcmVzdWx0cyBiZXR3ZWVuIGNhbGxzIHRvIHlvdXJcbiAgc2VsZWN0b3IsIG90aGVyd2lzZSB0aGUgQ29ubmVjdCBjb21wb25lbnQgd2lsbCByZS1yZW5kZXIgb24gZXZlcnkgc3RhdGUgb3IgcHJvcHMgY2hhbmdlLlxuKi9cbnNlbGVjdG9yRmFjdG9yeSkge1xuICB2YXIgX2NvbnRleHRUeXBlcywgX2NoaWxkQ29udGV4dFR5cGVzO1xuXG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICAgIF9yZWYkZ2V0RGlzcGxheU5hbWUgPSBfcmVmLmdldERpc3BsYXlOYW1lLFxuICAgICAgZ2V0RGlzcGxheU5hbWUgPSBfcmVmJGdldERpc3BsYXlOYW1lID09PSB1bmRlZmluZWQgPyBmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiAnQ29ubmVjdEFkdmFuY2VkKCcgKyBuYW1lICsgJyknO1xuICB9IDogX3JlZiRnZXREaXNwbGF5TmFtZSxcbiAgICAgIF9yZWYkbWV0aG9kTmFtZSA9IF9yZWYubWV0aG9kTmFtZSxcbiAgICAgIG1ldGhvZE5hbWUgPSBfcmVmJG1ldGhvZE5hbWUgPT09IHVuZGVmaW5lZCA/ICdjb25uZWN0QWR2YW5jZWQnIDogX3JlZiRtZXRob2ROYW1lLFxuICAgICAgX3JlZiRyZW5kZXJDb3VudFByb3AgPSBfcmVmLnJlbmRlckNvdW50UHJvcCxcbiAgICAgIHJlbmRlckNvdW50UHJvcCA9IF9yZWYkcmVuZGVyQ291bnRQcm9wID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBfcmVmJHJlbmRlckNvdW50UHJvcCxcbiAgICAgIF9yZWYkc2hvdWxkSGFuZGxlU3RhdCA9IF9yZWYuc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzLFxuICAgICAgc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzID0gX3JlZiRzaG91bGRIYW5kbGVTdGF0ID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZiRzaG91bGRIYW5kbGVTdGF0LFxuICAgICAgX3JlZiRzdG9yZUtleSA9IF9yZWYuc3RvcmVLZXksXG4gICAgICBzdG9yZUtleSA9IF9yZWYkc3RvcmVLZXkgPT09IHVuZGVmaW5lZCA/ICdzdG9yZScgOiBfcmVmJHN0b3JlS2V5LFxuICAgICAgX3JlZiR3aXRoUmVmID0gX3JlZi53aXRoUmVmLFxuICAgICAgd2l0aFJlZiA9IF9yZWYkd2l0aFJlZiA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmJHdpdGhSZWYsXG4gICAgICBjb25uZWN0T3B0aW9ucyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2dldERpc3BsYXlOYW1lJywgJ21ldGhvZE5hbWUnLCAncmVuZGVyQ291bnRQcm9wJywgJ3Nob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcycsICdzdG9yZUtleScsICd3aXRoUmVmJ10pO1xuXG4gIHZhciBzdWJzY3JpcHRpb25LZXkgPSBzdG9yZUtleSArICdTdWJzY3JpcHRpb24nO1xuICB2YXIgdmVyc2lvbiA9IGhvdFJlbG9hZGluZ1ZlcnNpb24rKztcblxuICB2YXIgY29udGV4dFR5cGVzID0gKF9jb250ZXh0VHlwZXMgPSB7fSwgX2NvbnRleHRUeXBlc1tzdG9yZUtleV0gPSBzdG9yZVNoYXBlLCBfY29udGV4dFR5cGVzW3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb25TaGFwZSwgX2NvbnRleHRUeXBlcyk7XG4gIHZhciBjaGlsZENvbnRleHRUeXBlcyA9IChfY2hpbGRDb250ZXh0VHlwZXMgPSB7fSwgX2NoaWxkQ29udGV4dFR5cGVzW3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb25TaGFwZSwgX2NoaWxkQ29udGV4dFR5cGVzKTtcblxuICByZXR1cm4gZnVuY3Rpb24gd3JhcFdpdGhDb25uZWN0KFdyYXBwZWRDb21wb25lbnQpIHtcbiAgICBpbnZhcmlhbnQodHlwZW9mIFdyYXBwZWRDb21wb25lbnQgPT0gJ2Z1bmN0aW9uJywgJ1lvdSBtdXN0IHBhc3MgYSBjb21wb25lbnQgdG8gdGhlIGZ1bmN0aW9uIHJldHVybmVkIGJ5ICcgKyAobWV0aG9kTmFtZSArICcuIEluc3RlYWQgcmVjZWl2ZWQgJyArIEpTT04uc3RyaW5naWZ5KFdyYXBwZWRDb21wb25lbnQpKSk7XG5cbiAgICB2YXIgd3JhcHBlZENvbXBvbmVudE5hbWUgPSBXcmFwcGVkQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IFdyYXBwZWRDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JztcblxuICAgIHZhciBkaXNwbGF5TmFtZSA9IGdldERpc3BsYXlOYW1lKHdyYXBwZWRDb21wb25lbnROYW1lKTtcblxuICAgIHZhciBzZWxlY3RvckZhY3RvcnlPcHRpb25zID0gX2V4dGVuZHMoe30sIGNvbm5lY3RPcHRpb25zLCB7XG4gICAgICBnZXREaXNwbGF5TmFtZTogZ2V0RGlzcGxheU5hbWUsXG4gICAgICBtZXRob2ROYW1lOiBtZXRob2ROYW1lLFxuICAgICAgcmVuZGVyQ291bnRQcm9wOiByZW5kZXJDb3VudFByb3AsXG4gICAgICBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXM6IHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcyxcbiAgICAgIHN0b3JlS2V5OiBzdG9yZUtleSxcbiAgICAgIHdpdGhSZWY6IHdpdGhSZWYsXG4gICAgICBkaXNwbGF5TmFtZTogZGlzcGxheU5hbWUsXG4gICAgICB3cmFwcGVkQ29tcG9uZW50TmFtZTogd3JhcHBlZENvbXBvbmVudE5hbWUsXG4gICAgICBXcmFwcGVkQ29tcG9uZW50OiBXcmFwcGVkQ29tcG9uZW50XG4gICAgfSk7XG5cbiAgICB2YXIgQ29ubmVjdCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgICBfaW5oZXJpdHMoQ29ubmVjdCwgX0NvbXBvbmVudCk7XG5cbiAgICAgIGZ1bmN0aW9uIENvbm5lY3QocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbm5lY3QpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgICAgIF90aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICBfdGhpcy5yZW5kZXJDb3VudCA9IDA7XG4gICAgICAgIF90aGlzLnN0b3JlID0gcHJvcHNbc3RvcmVLZXldIHx8IGNvbnRleHRbc3RvcmVLZXldO1xuICAgICAgICBfdGhpcy5wcm9wc01vZGUgPSBCb29sZWFuKHByb3BzW3N0b3JlS2V5XSk7XG4gICAgICAgIF90aGlzLnNldFdyYXBwZWRJbnN0YW5jZSA9IF90aGlzLnNldFdyYXBwZWRJbnN0YW5jZS5iaW5kKF90aGlzKTtcblxuICAgICAgICBpbnZhcmlhbnQoX3RoaXMuc3RvcmUsICdDb3VsZCBub3QgZmluZCBcIicgKyBzdG9yZUtleSArICdcIiBpbiBlaXRoZXIgdGhlIGNvbnRleHQgb3IgcHJvcHMgb2YgJyArICgnXCInICsgZGlzcGxheU5hbWUgKyAnXCIuIEVpdGhlciB3cmFwIHRoZSByb290IGNvbXBvbmVudCBpbiBhIDxQcm92aWRlcj4sICcpICsgKCdvciBleHBsaWNpdGx5IHBhc3MgXCInICsgc3RvcmVLZXkgKyAnXCIgYXMgYSBwcm9wIHRvIFwiJyArIGRpc3BsYXlOYW1lICsgJ1wiLicpKTtcblxuICAgICAgICBfdGhpcy5pbml0U2VsZWN0b3IoKTtcbiAgICAgICAgX3RoaXMuaW5pdFN1YnNjcmlwdGlvbigpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICB9XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmdldENoaWxkQ29udGV4dCA9IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgIC8vIElmIHRoaXMgY29tcG9uZW50IHJlY2VpdmVkIHN0b3JlIGZyb20gcHJvcHMsIGl0cyBzdWJzY3JpcHRpb24gc2hvdWxkIGJlIHRyYW5zcGFyZW50XG4gICAgICAgIC8vIHRvIGFueSBkZXNjZW5kYW50cyByZWNlaXZpbmcgc3RvcmUrc3Vic2NyaXB0aW9uIGZyb20gY29udGV4dDsgaXQgcGFzc2VzIGFsb25nXG4gICAgICAgIC8vIHN1YnNjcmlwdGlvbiBwYXNzZWQgdG8gaXQuIE90aGVyd2lzZSwgaXQgc2hhZG93cyB0aGUgcGFyZW50IHN1YnNjcmlwdGlvbiwgd2hpY2ggYWxsb3dzXG4gICAgICAgIC8vIENvbm5lY3QgdG8gY29udHJvbCBvcmRlcmluZyBvZiBub3RpZmljYXRpb25zIHRvIGZsb3cgdG9wLWRvd24uXG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLnByb3BzTW9kZSA/IG51bGwgOiB0aGlzLnN1YnNjcmlwdGlvbjtcbiAgICAgICAgcmV0dXJuIF9yZWYyID0ge30sIF9yZWYyW3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb24gfHwgdGhpcy5jb250ZXh0W3N1YnNjcmlwdGlvbktleV0sIF9yZWYyO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKCFzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMpIHJldHVybjtcblxuICAgICAgICAvLyBjb21wb25lbnRXaWxsTW91bnQgZmlyZXMgZHVyaW5nIHNlcnZlciBzaWRlIHJlbmRlcmluZywgYnV0IGNvbXBvbmVudERpZE1vdW50IGFuZFxuICAgICAgICAvLyBjb21wb25lbnRXaWxsVW5tb3VudCBkbyBub3QuIEJlY2F1c2Ugb2YgdGhpcywgdHJ5U3Vic2NyaWJlIGhhcHBlbnMgZHVyaW5nIC4uLmRpZE1vdW50LlxuICAgICAgICAvLyBPdGhlcndpc2UsIHVuc3Vic2NyaXB0aW9uIHdvdWxkIG5ldmVyIHRha2UgcGxhY2UgZHVyaW5nIFNTUiwgY2F1c2luZyBhIG1lbW9yeSBsZWFrLlxuICAgICAgICAvLyBUbyBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgYSBjaGlsZCBjb21wb25lbnQgbWF5IGhhdmUgdHJpZ2dlcmVkIGEgc3RhdGUgY2hhbmdlIGJ5XG4gICAgICAgIC8vIGRpc3BhdGNoaW5nIGFuIGFjdGlvbiBpbiBpdHMgY29tcG9uZW50V2lsbE1vdW50LCB3ZSBoYXZlIHRvIHJlLXJ1biB0aGUgc2VsZWN0IGFuZCBtYXliZVxuICAgICAgICAvLyByZS1yZW5kZXIuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnRyeVN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bih0aGlzLnByb3BzKTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlKSB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4obmV4dFByb3BzKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB0aGlzLnN1YnNjcmlwdGlvbi50cnlVbnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicyA9IG5vb3A7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1biA9IG5vb3A7XG4gICAgICAgIHRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5nZXRXcmFwcGVkSW5zdGFuY2UgPSBmdW5jdGlvbiBnZXRXcmFwcGVkSW5zdGFuY2UoKSB7XG4gICAgICAgIGludmFyaWFudCh3aXRoUmVmLCAnVG8gYWNjZXNzIHRoZSB3cmFwcGVkIGluc3RhbmNlLCB5b3UgbmVlZCB0byBzcGVjaWZ5ICcgKyAoJ3sgd2l0aFJlZjogdHJ1ZSB9IGluIHRoZSBvcHRpb25zIGFyZ3VtZW50IG9mIHRoZSAnICsgbWV0aG9kTmFtZSArICcoKSBjYWxsLicpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZEluc3RhbmNlO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuc2V0V3JhcHBlZEluc3RhbmNlID0gZnVuY3Rpb24gc2V0V3JhcHBlZEluc3RhbmNlKHJlZikge1xuICAgICAgICB0aGlzLndyYXBwZWRJbnN0YW5jZSA9IHJlZjtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmluaXRTZWxlY3RvciA9IGZ1bmN0aW9uIGluaXRTZWxlY3RvcigpIHtcbiAgICAgICAgdmFyIHNvdXJjZVNlbGVjdG9yID0gc2VsZWN0b3JGYWN0b3J5KHRoaXMuc3RvcmUuZGlzcGF0Y2gsIHNlbGVjdG9yRmFjdG9yeU9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gbWFrZVNlbGVjdG9yU3RhdGVmdWwoc291cmNlU2VsZWN0b3IsIHRoaXMuc3RvcmUpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bih0aGlzLnByb3BzKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmluaXRTdWJzY3JpcHRpb24gPSBmdW5jdGlvbiBpbml0U3Vic2NyaXB0aW9uKCkge1xuICAgICAgICBpZiAoIXNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcykgcmV0dXJuO1xuXG4gICAgICAgIC8vIHBhcmVudFN1YidzIHNvdXJjZSBzaG91bGQgbWF0Y2ggd2hlcmUgc3RvcmUgY2FtZSBmcm9tOiBwcm9wcyB2cy4gY29udGV4dC4gQSBjb21wb25lbnRcbiAgICAgICAgLy8gY29ubmVjdGVkIHRvIHRoZSBzdG9yZSB2aWEgcHJvcHMgc2hvdWxkbid0IHVzZSBzdWJzY3JpcHRpb24gZnJvbSBjb250ZXh0LCBvciB2aWNlIHZlcnNhLlxuICAgICAgICB2YXIgcGFyZW50U3ViID0gKHRoaXMucHJvcHNNb2RlID8gdGhpcy5wcm9wcyA6IHRoaXMuY29udGV4dClbc3Vic2NyaXB0aW9uS2V5XTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKHRoaXMuc3RvcmUsIHBhcmVudFN1YiwgdGhpcy5vblN0YXRlQ2hhbmdlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIGBub3RpZnlOZXN0ZWRTdWJzYCBpcyBkdXBsaWNhdGVkIHRvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0aGUgY29tcG9uZW50IGlzICB1bm1vdW50ZWQgaW5cbiAgICAgICAgLy8gdGhlIG1pZGRsZSBvZiB0aGUgbm90aWZpY2F0aW9uIGxvb3AsIHdoZXJlIGB0aGlzLnN1YnNjcmlwdGlvbmAgd2lsbCB0aGVuIGJlIG51bGwuIEFuXG4gICAgICAgIC8vIGV4dHJhIG51bGwgY2hlY2sgZXZlcnkgY2hhbmdlIGNhbiBiZSBhdm9pZGVkIGJ5IGNvcHlpbmcgdGhlIG1ldGhvZCBvbnRvIGB0aGlzYCBhbmQgdGhlblxuICAgICAgICAvLyByZXBsYWNpbmcgaXQgd2l0aCBhIG5vLW9wIG9uIHVubW91bnQuIFRoaXMgY2FuIHByb2JhYmx5IGJlIGF2b2lkZWQgaWYgU3Vic2NyaXB0aW9uJ3NcbiAgICAgICAgLy8gbGlzdGVuZXJzIGxvZ2ljIGlzIGNoYW5nZWQgdG8gbm90IGNhbGwgbGlzdGVuZXJzIHRoYXQgaGF2ZSBiZWVuIHVuc3Vic2NyaWJlZCBpbiB0aGVcbiAgICAgICAgLy8gbWlkZGxlIG9mIHRoZSBub3RpZmljYXRpb24gbG9vcC5cbiAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzID0gdGhpcy5zdWJzY3JpcHRpb24ubm90aWZ5TmVzdGVkU3Vicy5iaW5kKHRoaXMuc3Vic2NyaXB0aW9uKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLm9uU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bih0aGlzLnByb3BzKTtcblxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlKSB7XG4gICAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUgPSB0aGlzLm5vdGlmeU5lc3RlZFN1YnNPbkNvbXBvbmVudERpZFVwZGF0ZTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKGR1bW15U3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5ub3RpZnlOZXN0ZWRTdWJzT25Db21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBub3RpZnlOZXN0ZWRTdWJzT25Db21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIC8vIGBjb21wb25lbnREaWRVcGRhdGVgIGlzIGNvbmRpdGlvbmFsbHkgaW1wbGVtZW50ZWQgd2hlbiBgb25TdGF0ZUNoYW5nZWAgZGV0ZXJtaW5lcyBpdFxuICAgICAgICAvLyBuZWVkcyB0byBub3RpZnkgbmVzdGVkIHN1YnMuIE9uY2UgY2FsbGVkLCBpdCB1bmltcGxlbWVudHMgaXRzZWxmIHVudGlsIGZ1cnRoZXIgc3RhdGVcbiAgICAgICAgLy8gY2hhbmdlcyBvY2N1ci4gRG9pbmcgaXQgdGhpcyB3YXkgdnMgaGF2aW5nIGEgcGVybWFuZW50IGBjb21wb25lbnREaWRVcGRhdGVgIHRoYXQgZG9lc1xuICAgICAgICAvLyBhIGJvb2xlYW4gY2hlY2sgZXZlcnkgdGltZSBhdm9pZHMgYW4gZXh0cmEgbWV0aG9kIGNhbGwgbW9zdCBvZiB0aGUgdGltZSwgcmVzdWx0aW5nXG4gICAgICAgIC8vIGluIHNvbWUgcGVyZiBib29zdC5cbiAgICAgICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicygpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuaXNTdWJzY3JpYmVkID0gZnVuY3Rpb24gaXNTdWJzY3JpYmVkKCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnN1YnNjcmlwdGlvbikgJiYgdGhpcy5zdWJzY3JpcHRpb24uaXNTdWJzY3JpYmVkKCk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5hZGRFeHRyYVByb3BzID0gZnVuY3Rpb24gYWRkRXh0cmFQcm9wcyhwcm9wcykge1xuICAgICAgICBpZiAoIXdpdGhSZWYgJiYgIXJlbmRlckNvdW50UHJvcCAmJiAhKHRoaXMucHJvcHNNb2RlICYmIHRoaXMuc3Vic2NyaXB0aW9uKSkgcmV0dXJuIHByb3BzO1xuICAgICAgICAvLyBtYWtlIGEgc2hhbGxvdyBjb3B5IHNvIHRoYXQgZmllbGRzIGFkZGVkIGRvbid0IGxlYWsgdG8gdGhlIG9yaWdpbmFsIHNlbGVjdG9yLlxuICAgICAgICAvLyB0aGlzIGlzIGVzcGVjaWFsbHkgaW1wb3J0YW50IGZvciAncmVmJyBzaW5jZSB0aGF0J3MgYSByZWZlcmVuY2UgYmFjayB0byB0aGUgY29tcG9uZW50XG4gICAgICAgIC8vIGluc3RhbmNlLiBhIHNpbmdsZXRvbiBtZW1vaXplZCBzZWxlY3RvciB3b3VsZCB0aGVuIGJlIGhvbGRpbmcgYSByZWZlcmVuY2UgdG8gdGhlXG4gICAgICAgIC8vIGluc3RhbmNlLCBwcmV2ZW50aW5nIHRoZSBpbnN0YW5jZSBmcm9tIGJlaW5nIGdhcmJhZ2UgY29sbGVjdGVkLCBhbmQgdGhhdCB3b3VsZCBiZSBiYWRcbiAgICAgICAgdmFyIHdpdGhFeHRyYXMgPSBfZXh0ZW5kcyh7fSwgcHJvcHMpO1xuICAgICAgICBpZiAod2l0aFJlZikgd2l0aEV4dHJhcy5yZWYgPSB0aGlzLnNldFdyYXBwZWRJbnN0YW5jZTtcbiAgICAgICAgaWYgKHJlbmRlckNvdW50UHJvcCkgd2l0aEV4dHJhc1tyZW5kZXJDb3VudFByb3BdID0gdGhpcy5yZW5kZXJDb3VudCsrO1xuICAgICAgICBpZiAodGhpcy5wcm9wc01vZGUgJiYgdGhpcy5zdWJzY3JpcHRpb24pIHdpdGhFeHRyYXNbc3Vic2NyaXB0aW9uS2V5XSA9IHRoaXMuc3Vic2NyaXB0aW9uO1xuICAgICAgICByZXR1cm4gd2l0aEV4dHJhcztcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcjtcbiAgICAgICAgc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHNlbGVjdG9yLmVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgc2VsZWN0b3IuZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoV3JhcHBlZENvbXBvbmVudCwgdGhpcy5hZGRFeHRyYVByb3BzKHNlbGVjdG9yLnByb3BzKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBDb25uZWN0O1xuICAgIH0oQ29tcG9uZW50KTtcblxuICAgIENvbm5lY3QuV3JhcHBlZENvbXBvbmVudCA9IFdyYXBwZWRDb21wb25lbnQ7XG4gICAgQ29ubmVjdC5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICAgIENvbm5lY3QuY2hpbGRDb250ZXh0VHlwZXMgPSBjaGlsZENvbnRleHRUeXBlcztcbiAgICBDb25uZWN0LmNvbnRleHRUeXBlcyA9IGNvbnRleHRUeXBlcztcbiAgICBDb25uZWN0LnByb3BUeXBlcyA9IGNvbnRleHRUeXBlcztcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVXBkYXRlID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVwZGF0ZSgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgLy8gV2UgYXJlIGhvdCByZWxvYWRpbmchXG4gICAgICAgIGlmICh0aGlzLnZlcnNpb24gIT09IHZlcnNpb24pIHtcbiAgICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICAgIHRoaXMuaW5pdFNlbGVjdG9yKCk7XG5cbiAgICAgICAgICAvLyBJZiBhbnkgY29ubmVjdGVkIGRlc2NlbmRhbnRzIGRvbid0IGhvdCByZWxvYWQgKGFuZCByZXN1YnNjcmliZSBpbiB0aGUgcHJvY2VzcyksIHRoZWlyXG4gICAgICAgICAgLy8gbGlzdGVuZXJzIHdpbGwgYmUgbG9zdCB3aGVuIHdlIHVuc3Vic2NyaWJlLiBVbmZvcnR1bmF0ZWx5LCBieSBjb3B5aW5nIG92ZXIgYWxsXG4gICAgICAgICAgLy8gbGlzdGVuZXJzLCB0aGlzIGRvZXMgbWVhbiB0aGF0IHRoZSBvbGQgdmVyc2lvbnMgb2YgY29ubmVjdGVkIGRlc2NlbmRhbnRzIHdpbGwgc3RpbGwgYmVcbiAgICAgICAgICAvLyBub3RpZmllZCBvZiBzdGF0ZSBjaGFuZ2VzOyBob3dldmVyLCB0aGVpciBvblN0YXRlQ2hhbmdlIGZ1bmN0aW9uIGlzIGEgbm8tb3Agc28gdGhpc1xuICAgICAgICAgIC8vIGlzbid0IGEgaHVnZSBkZWFsLlxuICAgICAgICAgIHZhciBvbGRMaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgb2xkTGlzdGVuZXJzID0gdGhpcy5zdWJzY3JpcHRpb24ubGlzdGVuZXJzLmdldCgpO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udHJ5VW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pbml0U3Vic2NyaXB0aW9uKCk7XG4gICAgICAgICAgaWYgKHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udHJ5U3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBvbGRMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5zdWJzY3JpcHRpb24ubGlzdGVuZXJzLnN1YnNjcmliZShsaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGhvaXN0U3RhdGljcyhDb25uZWN0LCBXcmFwcGVkQ29tcG9uZW50KTtcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29tcG9uZW50cy9jb25uZWN0QWR2YW5jZWQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5pbXBvcnQgY29ubmVjdEFkdmFuY2VkIGZyb20gJy4uL2NvbXBvbmVudHMvY29ubmVjdEFkdmFuY2VkJztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbHMvc2hhbGxvd0VxdWFsJztcbmltcG9ydCBkZWZhdWx0TWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzIGZyb20gJy4vbWFwRGlzcGF0Y2hUb1Byb3BzJztcbmltcG9ydCBkZWZhdWx0TWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzIGZyb20gJy4vbWFwU3RhdGVUb1Byb3BzJztcbmltcG9ydCBkZWZhdWx0TWVyZ2VQcm9wc0ZhY3RvcmllcyBmcm9tICcuL21lcmdlUHJvcHMnO1xuaW1wb3J0IGRlZmF1bHRTZWxlY3RvckZhY3RvcnkgZnJvbSAnLi9zZWxlY3RvckZhY3RvcnknO1xuXG4vKlxuICBjb25uZWN0IGlzIGEgZmFjYWRlIG92ZXIgY29ubmVjdEFkdmFuY2VkLiBJdCB0dXJucyBpdHMgYXJncyBpbnRvIGEgY29tcGF0aWJsZVxuICBzZWxlY3RvckZhY3RvcnksIHdoaWNoIGhhcyB0aGUgc2lnbmF0dXJlOlxuXG4gICAgKGRpc3BhdGNoLCBvcHRpb25zKSA9PiAobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpID0+IG5leHRGaW5hbFByb3BzXG4gIFxuICBjb25uZWN0IHBhc3NlcyBpdHMgYXJncyB0byBjb25uZWN0QWR2YW5jZWQgYXMgb3B0aW9ucywgd2hpY2ggd2lsbCBpbiB0dXJuIHBhc3MgdGhlbSB0b1xuICBzZWxlY3RvckZhY3RvcnkgZWFjaCB0aW1lIGEgQ29ubmVjdCBjb21wb25lbnQgaW5zdGFuY2UgaXMgaW5zdGFudGlhdGVkIG9yIGhvdCByZWxvYWRlZC5cblxuICBzZWxlY3RvckZhY3RvcnkgcmV0dXJucyBhIGZpbmFsIHByb3BzIHNlbGVjdG9yIGZyb20gaXRzIG1hcFN0YXRlVG9Qcm9wcyxcbiAgbWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcywgbWVyZ2VQcm9wcyxcbiAgbWVyZ2VQcm9wc0ZhY3RvcmllcywgYW5kIHB1cmUgYXJncy5cblxuICBUaGUgcmVzdWx0aW5nIGZpbmFsIHByb3BzIHNlbGVjdG9yIGlzIGNhbGxlZCBieSB0aGUgQ29ubmVjdCBjb21wb25lbnQgaW5zdGFuY2Ugd2hlbmV2ZXJcbiAgaXQgcmVjZWl2ZXMgbmV3IHByb3BzIG9yIHN0b3JlIHN0YXRlLlxuICovXG5cbmZ1bmN0aW9uIG1hdGNoKGFyZywgZmFjdG9yaWVzLCBuYW1lKSB7XG4gIGZvciAodmFyIGkgPSBmYWN0b3JpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgcmVzdWx0ID0gZmFjdG9yaWVzW2ldKGFyZyk7XG4gICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZGlzcGF0Y2gsIG9wdGlvbnMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdmFsdWUgb2YgdHlwZSAnICsgdHlwZW9mIGFyZyArICcgZm9yICcgKyBuYW1lICsgJyBhcmd1bWVudCB3aGVuIGNvbm5lY3RpbmcgY29tcG9uZW50ICcgKyBvcHRpb25zLndyYXBwZWRDb21wb25lbnROYW1lICsgJy4nKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3RyaWN0RXF1YWwoYSwgYikge1xuICByZXR1cm4gYSA9PT0gYjtcbn1cblxuLy8gY3JlYXRlQ29ubmVjdCB3aXRoIGRlZmF1bHQgYXJncyBidWlsZHMgdGhlICdvZmZpY2lhbCcgY29ubmVjdCBiZWhhdmlvci4gQ2FsbGluZyBpdCB3aXRoXG4vLyBkaWZmZXJlbnQgb3B0aW9ucyBvcGVucyB1cCBzb21lIHRlc3RpbmcgYW5kIGV4dGVuc2liaWxpdHkgc2NlbmFyaW9zXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29ubmVjdCgpIHtcbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9LFxuICAgICAgX3JlZiRjb25uZWN0SE9DID0gX3JlZi5jb25uZWN0SE9DLFxuICAgICAgY29ubmVjdEhPQyA9IF9yZWYkY29ubmVjdEhPQyA9PT0gdW5kZWZpbmVkID8gY29ubmVjdEFkdmFuY2VkIDogX3JlZiRjb25uZWN0SE9DLFxuICAgICAgX3JlZiRtYXBTdGF0ZVRvUHJvcHNGID0gX3JlZi5tYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsXG4gICAgICBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgPSBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgOiBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YsXG4gICAgICBfcmVmJG1hcERpc3BhdGNoVG9Qcm8gPSBfcmVmLm1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWFwRGlzcGF0Y2hUb1BybyA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdE1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyA6IF9yZWYkbWFwRGlzcGF0Y2hUb1BybyxcbiAgICAgIF9yZWYkbWVyZ2VQcm9wc0ZhY3RvciA9IF9yZWYubWVyZ2VQcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1lcmdlUHJvcHNGYWN0b3JpZXMgPSBfcmVmJG1lcmdlUHJvcHNGYWN0b3IgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRNZXJnZVByb3BzRmFjdG9yaWVzIDogX3JlZiRtZXJnZVByb3BzRmFjdG9yLFxuICAgICAgX3JlZiRzZWxlY3RvckZhY3RvcnkgPSBfcmVmLnNlbGVjdG9yRmFjdG9yeSxcbiAgICAgIHNlbGVjdG9yRmFjdG9yeSA9IF9yZWYkc2VsZWN0b3JGYWN0b3J5ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0U2VsZWN0b3JGYWN0b3J5IDogX3JlZiRzZWxlY3RvckZhY3Rvcnk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMpIHtcbiAgICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHt9LFxuICAgICAgICBfcmVmMiRwdXJlID0gX3JlZjIucHVyZSxcbiAgICAgICAgcHVyZSA9IF9yZWYyJHB1cmUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmMiRwdXJlLFxuICAgICAgICBfcmVmMiRhcmVTdGF0ZXNFcXVhbCA9IF9yZWYyLmFyZVN0YXRlc0VxdWFsLFxuICAgICAgICBhcmVTdGF0ZXNFcXVhbCA9IF9yZWYyJGFyZVN0YXRlc0VxdWFsID09PSB1bmRlZmluZWQgPyBzdHJpY3RFcXVhbCA6IF9yZWYyJGFyZVN0YXRlc0VxdWFsLFxuICAgICAgICBfcmVmMiRhcmVPd25Qcm9wc0VxdWEgPSBfcmVmMi5hcmVPd25Qcm9wc0VxdWFsLFxuICAgICAgICBhcmVPd25Qcm9wc0VxdWFsID0gX3JlZjIkYXJlT3duUHJvcHNFcXVhID09PSB1bmRlZmluZWQgPyBzaGFsbG93RXF1YWwgOiBfcmVmMiRhcmVPd25Qcm9wc0VxdWEsXG4gICAgICAgIF9yZWYyJGFyZVN0YXRlUHJvcHNFcSA9IF9yZWYyLmFyZVN0YXRlUHJvcHNFcXVhbCxcbiAgICAgICAgYXJlU3RhdGVQcm9wc0VxdWFsID0gX3JlZjIkYXJlU3RhdGVQcm9wc0VxID09PSB1bmRlZmluZWQgPyBzaGFsbG93RXF1YWwgOiBfcmVmMiRhcmVTdGF0ZVByb3BzRXEsXG4gICAgICAgIF9yZWYyJGFyZU1lcmdlZFByb3BzRSA9IF9yZWYyLmFyZU1lcmdlZFByb3BzRXF1YWwsXG4gICAgICAgIGFyZU1lcmdlZFByb3BzRXF1YWwgPSBfcmVmMiRhcmVNZXJnZWRQcm9wc0UgPT09IHVuZGVmaW5lZCA/IHNoYWxsb3dFcXVhbCA6IF9yZWYyJGFyZU1lcmdlZFByb3BzRSxcbiAgICAgICAgZXh0cmFPcHRpb25zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYyLCBbJ3B1cmUnLCAnYXJlU3RhdGVzRXF1YWwnLCAnYXJlT3duUHJvcHNFcXVhbCcsICdhcmVTdGF0ZVByb3BzRXF1YWwnLCAnYXJlTWVyZ2VkUHJvcHNFcXVhbCddKTtcblxuICAgIHZhciBpbml0TWFwU3RhdGVUb1Byb3BzID0gbWF0Y2gobWFwU3RhdGVUb1Byb3BzLCBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsICdtYXBTdGF0ZVRvUHJvcHMnKTtcbiAgICB2YXIgaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyA9IG1hdGNoKG1hcERpc3BhdGNoVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLCAnbWFwRGlzcGF0Y2hUb1Byb3BzJyk7XG4gICAgdmFyIGluaXRNZXJnZVByb3BzID0gbWF0Y2gobWVyZ2VQcm9wcywgbWVyZ2VQcm9wc0ZhY3RvcmllcywgJ21lcmdlUHJvcHMnKTtcblxuICAgIHJldHVybiBjb25uZWN0SE9DKHNlbGVjdG9yRmFjdG9yeSwgX2V4dGVuZHMoe1xuICAgICAgLy8gdXNlZCBpbiBlcnJvciBtZXNzYWdlc1xuICAgICAgbWV0aG9kTmFtZTogJ2Nvbm5lY3QnLFxuXG4gICAgICAvLyB1c2VkIHRvIGNvbXB1dGUgQ29ubmVjdCdzIGRpc3BsYXlOYW1lIGZyb20gdGhlIHdyYXBwZWQgY29tcG9uZW50J3MgZGlzcGxheU5hbWUuXG4gICAgICBnZXREaXNwbGF5TmFtZTogZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUobmFtZSkge1xuICAgICAgICByZXR1cm4gJ0Nvbm5lY3QoJyArIG5hbWUgKyAnKSc7XG4gICAgICB9LFxuXG4gICAgICAvLyBpZiBtYXBTdGF0ZVRvUHJvcHMgaXMgZmFsc3ksIHRoZSBDb25uZWN0IGNvbXBvbmVudCBkb2Vzbid0IHN1YnNjcmliZSB0byBzdG9yZSBzdGF0ZSBjaGFuZ2VzXG4gICAgICBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXM6IEJvb2xlYW4obWFwU3RhdGVUb1Byb3BzKSxcblxuICAgICAgLy8gcGFzc2VkIHRocm91Z2ggdG8gc2VsZWN0b3JGYWN0b3J5XG4gICAgICBpbml0TWFwU3RhdGVUb1Byb3BzOiBpbml0TWFwU3RhdGVUb1Byb3BzLFxuICAgICAgaW5pdE1hcERpc3BhdGNoVG9Qcm9wczogaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyxcbiAgICAgIGluaXRNZXJnZVByb3BzOiBpbml0TWVyZ2VQcm9wcyxcbiAgICAgIHB1cmU6IHB1cmUsXG4gICAgICBhcmVTdGF0ZXNFcXVhbDogYXJlU3RhdGVzRXF1YWwsXG4gICAgICBhcmVPd25Qcm9wc0VxdWFsOiBhcmVPd25Qcm9wc0VxdWFsLFxuICAgICAgYXJlU3RhdGVQcm9wc0VxdWFsOiBhcmVTdGF0ZVByb3BzRXF1YWwsXG4gICAgICBhcmVNZXJnZWRQcm9wc0VxdWFsOiBhcmVNZXJnZWRQcm9wc0VxdWFsXG5cbiAgICB9LCBleHRyYU9wdGlvbnMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29ubmVjdCgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvY29ubmVjdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9jb25uZWN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQsIHdyYXBNYXBUb1Byb3BzRnVuYyB9IGZyb20gJy4vd3JhcE1hcFRvUHJvcHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzRnVuY3Rpb24obWFwRGlzcGF0Y2hUb1Byb3BzKSB7XG4gIHJldHVybiB0eXBlb2YgbWFwRGlzcGF0Y2hUb1Byb3BzID09PSAnZnVuY3Rpb24nID8gd3JhcE1hcFRvUHJvcHNGdW5jKG1hcERpc3BhdGNoVG9Qcm9wcywgJ21hcERpc3BhdGNoVG9Qcm9wcycpIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzTWlzc2luZyhtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgcmV0dXJuICFtYXBEaXNwYXRjaFRvUHJvcHMgPyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50KGZ1bmN0aW9uIChkaXNwYXRjaCkge1xuICAgIHJldHVybiB7IGRpc3BhdGNoOiBkaXNwYXRjaCB9O1xuICB9KSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdoZW5NYXBEaXNwYXRjaFRvUHJvcHNJc09iamVjdChtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgcmV0dXJuIG1hcERpc3BhdGNoVG9Qcm9wcyAmJiB0eXBlb2YgbWFwRGlzcGF0Y2hUb1Byb3BzID09PSAnb2JqZWN0JyA/IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyhtYXBEaXNwYXRjaFRvUHJvcHMsIGRpc3BhdGNoKTtcbiAgfSkgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFt3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNGdW5jdGlvbiwgd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzTWlzc2luZywgd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzT2JqZWN0XTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21hcERpc3BhdGNoVG9Qcm9wcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tYXBEaXNwYXRjaFRvUHJvcHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IHsgd3JhcE1hcFRvUHJvcHNDb25zdGFudCwgd3JhcE1hcFRvUHJvcHNGdW5jIH0gZnJvbSAnLi93cmFwTWFwVG9Qcm9wcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbihtYXBTdGF0ZVRvUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtYXBTdGF0ZVRvUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwU3RhdGVUb1Byb3BzLCAnbWFwU3RhdGVUb1Byb3BzJykgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWFwU3RhdGVUb1Byb3BzSXNNaXNzaW5nKG1hcFN0YXRlVG9Qcm9wcykge1xuICByZXR1cm4gIW1hcFN0YXRlVG9Qcm9wcyA/IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7fTtcbiAgfSkgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFt3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbiwgd2hlbk1hcFN0YXRlVG9Qcm9wc0lzTWlzc2luZ107XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tYXBTdGF0ZVRvUHJvcHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWFwU3RhdGVUb1Byb3BzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmltcG9ydCB2ZXJpZnlQbGFpbk9iamVjdCBmcm9tICcuLi91dGlscy92ZXJpZnlQbGFpbk9iamVjdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0TWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcykge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIG93blByb3BzLCBzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBNZXJnZVByb3BzRnVuYyhtZXJnZVByb3BzKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbml0TWVyZ2VQcm9wc1Byb3h5KGRpc3BhdGNoLCBfcmVmKSB7XG4gICAgdmFyIGRpc3BsYXlOYW1lID0gX3JlZi5kaXNwbGF5TmFtZSxcbiAgICAgICAgcHVyZSA9IF9yZWYucHVyZSxcbiAgICAgICAgYXJlTWVyZ2VkUHJvcHNFcXVhbCA9IF9yZWYuYXJlTWVyZ2VkUHJvcHNFcXVhbDtcblxuICAgIHZhciBoYXNSdW5PbmNlID0gZmFsc2U7XG4gICAgdmFyIG1lcmdlZFByb3BzID0gdm9pZCAwO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlUHJvcHNQcm94eShzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcykge1xuICAgICAgdmFyIG5leHRNZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuXG4gICAgICBpZiAoaGFzUnVuT25jZSkge1xuICAgICAgICBpZiAoIXB1cmUgfHwgIWFyZU1lcmdlZFByb3BzRXF1YWwobmV4dE1lcmdlZFByb3BzLCBtZXJnZWRQcm9wcykpIG1lcmdlZFByb3BzID0gbmV4dE1lcmdlZFByb3BzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFzUnVuT25jZSA9IHRydWU7XG4gICAgICAgIG1lcmdlZFByb3BzID0gbmV4dE1lcmdlZFByb3BzO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB2ZXJpZnlQbGFpbk9iamVjdChtZXJnZWRQcm9wcywgZGlzcGxheU5hbWUsICdtZXJnZVByb3BzJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2hlbk1lcmdlUHJvcHNJc0Z1bmN0aW9uKG1lcmdlUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtZXJnZVByb3BzID09PSAnZnVuY3Rpb24nID8gd3JhcE1lcmdlUHJvcHNGdW5jKG1lcmdlUHJvcHMpIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2hlbk1lcmdlUHJvcHNJc09taXR0ZWQobWVyZ2VQcm9wcykge1xuICByZXR1cm4gIW1lcmdlUHJvcHMgPyBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNZXJnZVByb3BzO1xuICB9IDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBbd2hlbk1lcmdlUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWVyZ2VQcm9wc0lzT21pdHRlZF07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tZXJnZVByb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21lcmdlUHJvcHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5pbXBvcnQgdmVyaWZ5U3Vic2VsZWN0b3JzIGZyb20gJy4vdmVyaWZ5U3Vic2VsZWN0b3JzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGltcHVyZUZpbmFsUHJvcHNTZWxlY3RvckZhY3RvcnkobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbXB1cmVGaW5hbFByb3BzU2VsZWN0b3Ioc3RhdGUsIG93blByb3BzKSB7XG4gICAgcmV0dXJuIG1lcmdlUHJvcHMobWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyksIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpLCBvd25Qcm9wcyk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gsIF9yZWYpIHtcbiAgdmFyIGFyZVN0YXRlc0VxdWFsID0gX3JlZi5hcmVTdGF0ZXNFcXVhbCxcbiAgICAgIGFyZU93blByb3BzRXF1YWwgPSBfcmVmLmFyZU93blByb3BzRXF1YWwsXG4gICAgICBhcmVTdGF0ZVByb3BzRXF1YWwgPSBfcmVmLmFyZVN0YXRlUHJvcHNFcXVhbDtcblxuICB2YXIgaGFzUnVuQXRMZWFzdE9uY2UgPSBmYWxzZTtcbiAgdmFyIHN0YXRlID0gdm9pZCAwO1xuICB2YXIgb3duUHJvcHMgPSB2b2lkIDA7XG4gIHZhciBzdGF0ZVByb3BzID0gdm9pZCAwO1xuICB2YXIgZGlzcGF0Y2hQcm9wcyA9IHZvaWQgMDtcbiAgdmFyIG1lcmdlZFByb3BzID0gdm9pZCAwO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUZpcnN0Q2FsbChmaXJzdFN0YXRlLCBmaXJzdE93blByb3BzKSB7XG4gICAgc3RhdGUgPSBmaXJzdFN0YXRlO1xuICAgIG93blByb3BzID0gZmlyc3RPd25Qcm9wcztcbiAgICBzdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG4gICAgZGlzcGF0Y2hQcm9wcyA9IG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpO1xuICAgIG1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG4gICAgaGFzUnVuQXRMZWFzdE9uY2UgPSB0cnVlO1xuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU5ld1Byb3BzQW5kTmV3U3RhdGUoKSB7XG4gICAgc3RhdGVQcm9wcyA9IG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpO1xuXG4gICAgaWYgKG1hcERpc3BhdGNoVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgZGlzcGF0Y2hQcm9wcyA9IG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpO1xuXG4gICAgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVOZXdQcm9wcygpIHtcbiAgICBpZiAobWFwU3RhdGVUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSBzdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG5cbiAgICBpZiAobWFwRGlzcGF0Y2hUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSBkaXNwYXRjaFByb3BzID0gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU5ld1N0YXRlKCkge1xuICAgIHZhciBuZXh0U3RhdGVQcm9wcyA9IG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpO1xuICAgIHZhciBzdGF0ZVByb3BzQ2hhbmdlZCA9ICFhcmVTdGF0ZVByb3BzRXF1YWwobmV4dFN0YXRlUHJvcHMsIHN0YXRlUHJvcHMpO1xuICAgIHN0YXRlUHJvcHMgPSBuZXh0U3RhdGVQcm9wcztcblxuICAgIGlmIChzdGF0ZVByb3BzQ2hhbmdlZCkgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcblxuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVN1YnNlcXVlbnRDYWxscyhuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykge1xuICAgIHZhciBwcm9wc0NoYW5nZWQgPSAhYXJlT3duUHJvcHNFcXVhbChuZXh0T3duUHJvcHMsIG93blByb3BzKTtcbiAgICB2YXIgc3RhdGVDaGFuZ2VkID0gIWFyZVN0YXRlc0VxdWFsKG5leHRTdGF0ZSwgc3RhdGUpO1xuICAgIHN0YXRlID0gbmV4dFN0YXRlO1xuICAgIG93blByb3BzID0gbmV4dE93blByb3BzO1xuXG4gICAgaWYgKHByb3BzQ2hhbmdlZCAmJiBzdGF0ZUNoYW5nZWQpIHJldHVybiBoYW5kbGVOZXdQcm9wc0FuZE5ld1N0YXRlKCk7XG4gICAgaWYgKHByb3BzQ2hhbmdlZCkgcmV0dXJuIGhhbmRsZU5ld1Byb3BzKCk7XG4gICAgaWYgKHN0YXRlQ2hhbmdlZCkgcmV0dXJuIGhhbmRsZU5ld1N0YXRlKCk7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHB1cmVGaW5hbFByb3BzU2VsZWN0b3IobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpIHtcbiAgICByZXR1cm4gaGFzUnVuQXRMZWFzdE9uY2UgPyBoYW5kbGVTdWJzZXF1ZW50Q2FsbHMobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpIDogaGFuZGxlRmlyc3RDYWxsKG5leHRTdGF0ZSwgbmV4dE93blByb3BzKTtcbiAgfTtcbn1cblxuLy8gVE9ETzogQWRkIG1vcmUgY29tbWVudHNcblxuLy8gSWYgcHVyZSBpcyB0cnVlLCB0aGUgc2VsZWN0b3IgcmV0dXJuZWQgYnkgc2VsZWN0b3JGYWN0b3J5IHdpbGwgbWVtb2l6ZSBpdHMgcmVzdWx0cyxcbi8vIGFsbG93aW5nIGNvbm5lY3RBZHZhbmNlZCdzIHNob3VsZENvbXBvbmVudFVwZGF0ZSB0byByZXR1cm4gZmFsc2UgaWYgZmluYWxcbi8vIHByb3BzIGhhdmUgbm90IGNoYW5nZWQuIElmIGZhbHNlLCB0aGUgc2VsZWN0b3Igd2lsbCBhbHdheXMgcmV0dXJuIGEgbmV3XG4vLyBvYmplY3QgYW5kIHNob3VsZENvbXBvbmVudFVwZGF0ZSB3aWxsIGFsd2F5cyByZXR1cm4gdHJ1ZS5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShkaXNwYXRjaCwgX3JlZjIpIHtcbiAgdmFyIGluaXRNYXBTdGF0ZVRvUHJvcHMgPSBfcmVmMi5pbml0TWFwU3RhdGVUb1Byb3BzLFxuICAgICAgaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyA9IF9yZWYyLmluaXRNYXBEaXNwYXRjaFRvUHJvcHMsXG4gICAgICBpbml0TWVyZ2VQcm9wcyA9IF9yZWYyLmluaXRNZXJnZVByb3BzLFxuICAgICAgb3B0aW9ucyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmMiwgWydpbml0TWFwU3RhdGVUb1Byb3BzJywgJ2luaXRNYXBEaXNwYXRjaFRvUHJvcHMnLCAnaW5pdE1lcmdlUHJvcHMnXSk7XG5cbiAgdmFyIG1hcFN0YXRlVG9Qcm9wcyA9IGluaXRNYXBTdGF0ZVRvUHJvcHMoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuICB2YXIgbWFwRGlzcGF0Y2hUb1Byb3BzID0gaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG4gIHZhciBtZXJnZVByb3BzID0gaW5pdE1lcmdlUHJvcHMoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdmVyaWZ5U3Vic2VsZWN0b3JzKG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBvcHRpb25zLmRpc3BsYXlOYW1lKTtcbiAgfVxuXG4gIHZhciBzZWxlY3RvckZhY3RvcnkgPSBvcHRpb25zLnB1cmUgPyBwdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeSA6IGltcHVyZUZpbmFsUHJvcHNTZWxlY3RvckZhY3Rvcnk7XG5cbiAgcmV0dXJuIHNlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gsIG9wdGlvbnMpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3Qvc2VsZWN0b3JGYWN0b3J5LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3NlbGVjdG9yRmFjdG9yeS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgd2FybmluZyBmcm9tICcuLi91dGlscy93YXJuaW5nJztcblxuZnVuY3Rpb24gdmVyaWZ5KHNlbGVjdG9yLCBtZXRob2ROYW1lLCBkaXNwbGF5TmFtZSkge1xuICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHZhbHVlIGZvciAnICsgbWV0aG9kTmFtZSArICcgaW4gJyArIGRpc3BsYXlOYW1lICsgJy4nKTtcbiAgfSBlbHNlIGlmIChtZXRob2ROYW1lID09PSAnbWFwU3RhdGVUb1Byb3BzJyB8fCBtZXRob2ROYW1lID09PSAnbWFwRGlzcGF0Y2hUb1Byb3BzJykge1xuICAgIGlmICghc2VsZWN0b3IuaGFzT3duUHJvcGVydHkoJ2RlcGVuZHNPbk93blByb3BzJykpIHtcbiAgICAgIHdhcm5pbmcoJ1RoZSBzZWxlY3RvciBmb3IgJyArIG1ldGhvZE5hbWUgKyAnIG9mICcgKyBkaXNwbGF5TmFtZSArICcgZGlkIG5vdCBzcGVjaWZ5IGEgdmFsdWUgZm9yIGRlcGVuZHNPbk93blByb3BzLicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2ZXJpZnlTdWJzZWxlY3RvcnMobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZlcmlmeShtYXBTdGF0ZVRvUHJvcHMsICdtYXBTdGF0ZVRvUHJvcHMnLCBkaXNwbGF5TmFtZSk7XG4gIHZlcmlmeShtYXBEaXNwYXRjaFRvUHJvcHMsICdtYXBEaXNwYXRjaFRvUHJvcHMnLCBkaXNwbGF5TmFtZSk7XG4gIHZlcmlmeShtZXJnZVByb3BzLCAnbWVyZ2VQcm9wcycsIGRpc3BsYXlOYW1lKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3ZlcmlmeVN1YnNlbGVjdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC92ZXJpZnlTdWJzZWxlY3RvcnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IHZlcmlmeVBsYWluT2JqZWN0IGZyb20gJy4uL3V0aWxzL3ZlcmlmeVBsYWluT2JqZWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZ2V0Q29uc3RhbnQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGluaXRDb25zdGFudFNlbGVjdG9yKGRpc3BhdGNoLCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnN0YW50ID0gZ2V0Q29uc3RhbnQoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuXG4gICAgZnVuY3Rpb24gY29uc3RhbnRTZWxlY3RvcigpIHtcbiAgICAgIHJldHVybiBjb25zdGFudDtcbiAgICB9XG4gICAgY29uc3RhbnRTZWxlY3Rvci5kZXBlbmRzT25Pd25Qcm9wcyA9IGZhbHNlO1xuICAgIHJldHVybiBjb25zdGFudFNlbGVjdG9yO1xuICB9O1xufVxuXG4vLyBkZXBlbmRzT25Pd25Qcm9wcyBpcyB1c2VkIGJ5IGNyZWF0ZU1hcFRvUHJvcHNQcm94eSB0byBkZXRlcm1pbmUgd2hldGhlciB0byBwYXNzIHByb3BzIGFzIGFyZ3Ncbi8vIHRvIHRoZSBtYXBUb1Byb3BzIGZ1bmN0aW9uIGJlaW5nIHdyYXBwZWQuIEl0IGlzIGFsc28gdXNlZCBieSBtYWtlUHVyZVByb3BzU2VsZWN0b3IgdG8gZGV0ZXJtaW5lXG4vLyB3aGV0aGVyIG1hcFRvUHJvcHMgbmVlZHMgdG8gYmUgaW52b2tlZCB3aGVuIHByb3BzIGhhdmUgY2hhbmdlZC5cbi8vIFxuLy8gQSBsZW5ndGggb2Ygb25lIHNpZ25hbHMgdGhhdCBtYXBUb1Byb3BzIGRvZXMgbm90IGRlcGVuZCBvbiBwcm9wcyBmcm9tIHRoZSBwYXJlbnQgY29tcG9uZW50LlxuLy8gQSBsZW5ndGggb2YgemVybyBpcyBhc3N1bWVkIHRvIG1lYW4gbWFwVG9Qcm9wcyBpcyBnZXR0aW5nIGFyZ3MgdmlhIGFyZ3VtZW50cyBvciAuLi5hcmdzIGFuZFxuLy8gdGhlcmVmb3JlIG5vdCByZXBvcnRpbmcgaXRzIGxlbmd0aCBhY2N1cmF0ZWx5Li5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZXBlbmRzT25Pd25Qcm9wcyhtYXBUb1Byb3BzKSB7XG4gIHJldHVybiBtYXBUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzICE9PSBudWxsICYmIG1hcFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMgIT09IHVuZGVmaW5lZCA/IEJvb2xlYW4obWFwVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgOiBtYXBUb1Byb3BzLmxlbmd0aCAhPT0gMTtcbn1cblxuLy8gVXNlZCBieSB3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbiBhbmQgd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzRnVuY3Rpb24sXG4vLyB0aGlzIGZ1bmN0aW9uIHdyYXBzIG1hcFRvUHJvcHMgaW4gYSBwcm94eSBmdW5jdGlvbiB3aGljaCBkb2VzIHNldmVyYWwgdGhpbmdzOlxuLy8gXG4vLyAgKiBEZXRlY3RzIHdoZXRoZXIgdGhlIG1hcFRvUHJvcHMgZnVuY3Rpb24gYmVpbmcgY2FsbGVkIGRlcGVuZHMgb24gcHJvcHMsIHdoaWNoXG4vLyAgICBpcyB1c2VkIGJ5IHNlbGVjdG9yRmFjdG9yeSB0byBkZWNpZGUgaWYgaXQgc2hvdWxkIHJlaW52b2tlIG9uIHByb3BzIGNoYW5nZXMuXG4vLyAgICBcbi8vICAqIE9uIGZpcnN0IGNhbGwsIGhhbmRsZXMgbWFwVG9Qcm9wcyBpZiByZXR1cm5zIGFub3RoZXIgZnVuY3Rpb24sIGFuZCB0cmVhdHMgdGhhdFxuLy8gICAgbmV3IGZ1bmN0aW9uIGFzIHRoZSB0cnVlIG1hcFRvUHJvcHMgZm9yIHN1YnNlcXVlbnQgY2FsbHMuXG4vLyAgICBcbi8vICAqIE9uIGZpcnN0IGNhbGwsIHZlcmlmaWVzIHRoZSBmaXJzdCByZXN1bHQgaXMgYSBwbGFpbiBvYmplY3QsIGluIG9yZGVyIHRvIHdhcm5cbi8vICAgIHRoZSBkZXZlbG9wZXIgdGhhdCB0aGVpciBtYXBUb1Byb3BzIGZ1bmN0aW9uIGlzIG5vdCByZXR1cm5pbmcgYSB2YWxpZCByZXN1bHQuXG4vLyAgICBcbmV4cG9ydCBmdW5jdGlvbiB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwVG9Qcm9wcywgbWV0aG9kTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gaW5pdFByb3h5U2VsZWN0b3IoZGlzcGF0Y2gsIF9yZWYpIHtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSBfcmVmLmRpc3BsYXlOYW1lO1xuXG4gICAgdmFyIHByb3h5ID0gZnVuY3Rpb24gbWFwVG9Qcm9wc1Byb3h5KHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpIHtcbiAgICAgIHJldHVybiBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA/IHByb3h5Lm1hcFRvUHJvcHMoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcykgOiBwcm94eS5tYXBUb1Byb3BzKHN0YXRlT3JEaXNwYXRjaCk7XG4gICAgfTtcblxuICAgIC8vIGFsbG93IGRldGVjdEZhY3RvcnlBbmRWZXJpZnkgdG8gZ2V0IG93blByb3BzXG4gICAgcHJveHkuZGVwZW5kc09uT3duUHJvcHMgPSB0cnVlO1xuXG4gICAgcHJveHkubWFwVG9Qcm9wcyA9IGZ1bmN0aW9uIGRldGVjdEZhY3RvcnlBbmRWZXJpZnkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcykge1xuICAgICAgcHJveHkubWFwVG9Qcm9wcyA9IG1hcFRvUHJvcHM7XG4gICAgICBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA9IGdldERlcGVuZHNPbk93blByb3BzKG1hcFRvUHJvcHMpO1xuICAgICAgdmFyIHByb3BzID0gcHJveHkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICAgIGlmICh0eXBlb2YgcHJvcHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJveHkubWFwVG9Qcm9wcyA9IHByb3BzO1xuICAgICAgICBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA9IGdldERlcGVuZHNPbk93blByb3BzKHByb3BzKTtcbiAgICAgICAgcHJvcHMgPSBwcm94eShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHZlcmlmeVBsYWluT2JqZWN0KHByb3BzLCBkaXNwbGF5TmFtZSwgbWV0aG9kTmFtZSk7XG5cbiAgICAgIHJldHVybiBwcm9wcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3Qvd3JhcE1hcFRvUHJvcHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3Qvd3JhcE1hcFRvUHJvcHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFByb3ZpZGVyLCB7IGNyZWF0ZVByb3ZpZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL1Byb3ZpZGVyJztcbmltcG9ydCBjb25uZWN0QWR2YW5jZWQgZnJvbSAnLi9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZCc7XG5pbXBvcnQgY29ubmVjdCBmcm9tICcuL2Nvbm5lY3QvY29ubmVjdCc7XG5cbmV4cG9ydCB7IFByb3ZpZGVyLCBjcmVhdGVQcm92aWRlciwgY29ubmVjdEFkdmFuY2VkLCBjb25uZWN0IH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbmV4cG9ydCB2YXIgc3Vic2NyaXB0aW9uU2hhcGUgPSBQcm9wVHlwZXMuc2hhcGUoe1xuICB0cnlTdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHRyeVVuc3Vic2NyaWJlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBub3RpZnlOZXN0ZWRTdWJzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBpc1N1YnNjcmliZWQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn0pO1xuXG5leHBvcnQgdmFyIHN0b3JlU2hhcGUgPSBQcm9wVHlwZXMuc2hhcGUoe1xuICBzdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBnZXRTdGF0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvUHJvcFR5cGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9Qcm9wVHlwZXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLy8gZW5jYXBzdWxhdGVzIHRoZSBzdWJzY3JpcHRpb24gbG9naWMgZm9yIGNvbm5lY3RpbmcgYSBjb21wb25lbnQgdG8gdGhlIHJlZHV4IHN0b3JlLCBhc1xuLy8gd2VsbCBhcyBuZXN0aW5nIHN1YnNjcmlwdGlvbnMgb2YgZGVzY2VuZGFudCBjb21wb25lbnRzLCBzbyB0aGF0IHdlIGNhbiBlbnN1cmUgdGhlXG4vLyBhbmNlc3RvciBjb21wb25lbnRzIHJlLXJlbmRlciBiZWZvcmUgZGVzY2VuZGFudHNcblxudmFyIENMRUFSRUQgPSBudWxsO1xudmFyIG51bGxMaXN0ZW5lcnMgPSB7XG4gIG5vdGlmeTogZnVuY3Rpb24gbm90aWZ5KCkge31cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RlbmVyQ29sbGVjdGlvbigpIHtcbiAgLy8gdGhlIGN1cnJlbnQvbmV4dCBwYXR0ZXJuIGlzIGNvcGllZCBmcm9tIHJlZHV4J3MgY3JlYXRlU3RvcmUgY29kZS5cbiAgLy8gVE9ETzogcmVmYWN0b3IrZXhwb3NlIHRoYXQgY29kZSB0byBiZSByZXVzYWJsZSBoZXJlP1xuICB2YXIgY3VycmVudCA9IFtdO1xuICB2YXIgbmV4dCA9IFtdO1xuXG4gIHJldHVybiB7XG4gICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgbmV4dCA9IENMRUFSRUQ7XG4gICAgICBjdXJyZW50ID0gQ0xFQVJFRDtcbiAgICB9LFxuICAgIG5vdGlmeTogZnVuY3Rpb24gbm90aWZ5KCkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnQgPSBuZXh0O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGlzdGVuZXJzW2ldKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICAgIHZhciBpc1N1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgaWYgKG5leHQgPT09IGN1cnJlbnQpIG5leHQgPSBjdXJyZW50LnNsaWNlKCk7XG4gICAgICBuZXh0LnB1c2gobGlzdGVuZXIpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIGlmICghaXNTdWJzY3JpYmVkIHx8IGN1cnJlbnQgPT09IENMRUFSRUQpIHJldHVybjtcbiAgICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG5leHQgPT09IGN1cnJlbnQpIG5leHQgPSBjdXJyZW50LnNsaWNlKCk7XG4gICAgICAgIG5leHQuc3BsaWNlKG5leHQuaW5kZXhPZihsaXN0ZW5lciksIDEpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBTdWJzY3JpcHRpb24gPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbihzdG9yZSwgcGFyZW50U3ViLCBvblN0YXRlQ2hhbmdlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN1YnNjcmlwdGlvbik7XG5cbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgdGhpcy5wYXJlbnRTdWIgPSBwYXJlbnRTdWI7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gb25TdGF0ZUNoYW5nZTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcbiAgICB0aGlzLmxpc3RlbmVycyA9IG51bGxMaXN0ZW5lcnM7XG4gIH1cblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmFkZE5lc3RlZFN1YiA9IGZ1bmN0aW9uIGFkZE5lc3RlZFN1YihsaXN0ZW5lcikge1xuICAgIHRoaXMudHJ5U3Vic2NyaWJlKCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzLnN1YnNjcmliZShsaXN0ZW5lcik7XG4gIH07XG5cbiAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5ub3RpZnlOZXN0ZWRTdWJzID0gZnVuY3Rpb24gbm90aWZ5TmVzdGVkU3VicygpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5ub3RpZnkoKTtcbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmlzU3Vic2NyaWJlZCA9IGZ1bmN0aW9uIGlzU3Vic2NyaWJlZCgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLnVuc3Vic2NyaWJlKTtcbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnRyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIHRyeVN1YnNjcmliZSgpIHtcbiAgICBpZiAoIXRoaXMudW5zdWJzY3JpYmUpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSB0aGlzLnBhcmVudFN1YiA/IHRoaXMucGFyZW50U3ViLmFkZE5lc3RlZFN1Yih0aGlzLm9uU3RhdGVDaGFuZ2UpIDogdGhpcy5zdG9yZS5zdWJzY3JpYmUodGhpcy5vblN0YXRlQ2hhbmdlKTtcblxuICAgICAgdGhpcy5saXN0ZW5lcnMgPSBjcmVhdGVMaXN0ZW5lckNvbGxlY3Rpb24oKTtcbiAgICB9XG4gIH07XG5cbiAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS50cnlVbnN1YnNjcmliZSA9IGZ1bmN0aW9uIHRyeVVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlKSB7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcbiAgICAgIHRoaXMubGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IG51bGxMaXN0ZW5lcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBTdWJzY3JpcHRpb247XG59KCk7XG5cbmV4cG9ydCB7IFN1YnNjcmlwdGlvbiBhcyBkZWZhdWx0IH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvU3Vic2NyaXB0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9TdWJzY3JpcHRpb24uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgaWYgKHggPT09IHkpIHtcbiAgICByZXR1cm4geCAhPT0gMCB8fCB5ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIGlmIChpcyhvYmpBLCBvYmpCKSkgcmV0dXJuIHRydWU7XG5cbiAgaWYgKHR5cGVvZiBvYmpBICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8IHR5cGVvZiBvYmpCICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuXG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093bi5jYWxsKG9iakIsIGtleXNBW2ldKSB8fCAhaXMob2JqQVtrZXlzQVtpXV0sIG9iakJba2V5c0FbaV1dKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3NoYWxsb3dFcXVhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvc2hhbGxvd0VxdWFsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0JztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vd2FybmluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZlcmlmeVBsYWluT2JqZWN0KHZhbHVlLCBkaXNwbGF5TmFtZSwgbWV0aG9kTmFtZSkge1xuICBpZiAoIWlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgd2FybmluZyhtZXRob2ROYW1lICsgJygpIGluICcgKyBkaXNwbGF5TmFtZSArICcgbXVzdCByZXR1cm4gYSBwbGFpbiBvYmplY3QuIEluc3RlYWQgcmVjZWl2ZWQgJyArIHZhbHVlICsgJy4nKTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3ZlcmlmeVBsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy92ZXJpZnlQbGFpbk9iamVjdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RvcmUgZW5oYW5jZXIgdGhhdCBhcHBsaWVzIG1pZGRsZXdhcmUgdG8gdGhlIGRpc3BhdGNoIG1ldGhvZFxuICogb2YgdGhlIFJlZHV4IHN0b3JlLiBUaGlzIGlzIGhhbmR5IGZvciBhIHZhcmlldHkgb2YgdGFza3MsIHN1Y2ggYXMgZXhwcmVzc2luZ1xuICogYXN5bmNocm9ub3VzIGFjdGlvbnMgaW4gYSBjb25jaXNlIG1hbm5lciwgb3IgbG9nZ2luZyBldmVyeSBhY3Rpb24gcGF5bG9hZC5cbiAqXG4gKiBTZWUgYHJlZHV4LXRodW5rYCBwYWNrYWdlIGFzIGFuIGV4YW1wbGUgb2YgdGhlIFJlZHV4IG1pZGRsZXdhcmUuXG4gKlxuICogQmVjYXVzZSBtaWRkbGV3YXJlIGlzIHBvdGVudGlhbGx5IGFzeW5jaHJvbm91cywgdGhpcyBzaG91bGQgYmUgdGhlIGZpcnN0XG4gKiBzdG9yZSBlbmhhbmNlciBpbiB0aGUgY29tcG9zaXRpb24gY2hhaW4uXG4gKlxuICogTm90ZSB0aGF0IGVhY2ggbWlkZGxld2FyZSB3aWxsIGJlIGdpdmVuIHRoZSBgZGlzcGF0Y2hgIGFuZCBgZ2V0U3RhdGVgIGZ1bmN0aW9uc1xuICogYXMgbmFtZWQgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IG1pZGRsZXdhcmVzIFRoZSBtaWRkbGV3YXJlIGNoYWluIHRvIGJlIGFwcGxpZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgc3RvcmUgZW5oYW5jZXIgYXBwbHlpbmcgdGhlIG1pZGRsZXdhcmUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwcGx5TWlkZGxld2FyZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1pZGRsZXdhcmVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgbWlkZGxld2FyZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGNyZWF0ZVN0b3JlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgICAgIHZhciBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcik7XG4gICAgICB2YXIgX2Rpc3BhdGNoID0gc3RvcmUuZGlzcGF0Y2g7XG4gICAgICB2YXIgY2hhaW4gPSBbXTtcblxuICAgICAgdmFyIG1pZGRsZXdhcmVBUEkgPSB7XG4gICAgICAgIGdldFN0YXRlOiBzdG9yZS5nZXRTdGF0ZSxcbiAgICAgICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgICAgIHJldHVybiBfZGlzcGF0Y2goYWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNoYWluID0gbWlkZGxld2FyZXMubWFwKGZ1bmN0aW9uIChtaWRkbGV3YXJlKSB7XG4gICAgICAgIHJldHVybiBtaWRkbGV3YXJlKG1pZGRsZXdhcmVBUEkpO1xuICAgICAgfSk7XG4gICAgICBfZGlzcGF0Y2ggPSBjb21wb3NlLmFwcGx5KHVuZGVmaW5lZCwgY2hhaW4pKHN0b3JlLmRpc3BhdGNoKTtcblxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdG9yZSwge1xuICAgICAgICBkaXNwYXRjaDogX2Rpc3BhdGNoXG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2FwcGx5TWlkZGxld2FyZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYXBwbHlNaWRkbGV3YXJlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3IuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb24gY3JlYXRvcnMsIGludG8gYW4gb2JqZWN0IHdpdGggdGhlXG4gKiBzYW1lIGtleXMsIGJ1dCB3aXRoIGV2ZXJ5IGZ1bmN0aW9uIHdyYXBwZWQgaW50byBhIGBkaXNwYXRjaGAgY2FsbCBzbyB0aGV5XG4gKiBtYXkgYmUgaW52b2tlZCBkaXJlY3RseS4gVGhpcyBpcyBqdXN0IGEgY29udmVuaWVuY2UgbWV0aG9kLCBhcyB5b3UgY2FuIGNhbGxcbiAqIGBzdG9yZS5kaXNwYXRjaChNeUFjdGlvbkNyZWF0b3JzLmRvU29tZXRoaW5nKCkpYCB5b3Vyc2VsZiBqdXN0IGZpbmUuXG4gKlxuICogRm9yIGNvbnZlbmllbmNlLCB5b3UgY2FuIGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQsXG4gKiBhbmQgZ2V0IGEgZnVuY3Rpb24gaW4gcmV0dXJuLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBhY3Rpb25DcmVhdG9ycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb25cbiAqIGNyZWF0b3IgZnVuY3Rpb25zLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpbiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhc2BcbiAqIHN5bnRheC4gWW91IG1heSBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2ggVGhlIGBkaXNwYXRjaGAgZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHlvdXIgUmVkdXhcbiAqIHN0b3JlLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFRoZSBvYmplY3QgbWltaWNraW5nIHRoZSBvcmlnaW5hbCBvYmplY3QsIGJ1dCB3aXRoXG4gKiBldmVyeSBhY3Rpb24gY3JlYXRvciB3cmFwcGVkIGludG8gdGhlIGBkaXNwYXRjaGAgY2FsbC4gSWYgeW91IHBhc3NlZCBhXG4gKiBmdW5jdGlvbiBhcyBgYWN0aW9uQ3JlYXRvcnNgLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYWxzbyBiZSBhIHNpbmdsZVxuICogZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyAhPT0gJ29iamVjdCcgfHwgYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBY3Rpb25DcmVhdG9ycyBleHBlY3RlZCBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvbiwgaW5zdGVhZCByZWNlaXZlZCAnICsgKGFjdGlvbkNyZWF0b3JzID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGFjdGlvbkNyZWF0b3JzKSArICcuICcgKyAnRGlkIHlvdSB3cml0ZSBcImltcG9ydCBBY3Rpb25DcmVhdG9ycyBmcm9tXCIgaW5zdGVhZCBvZiBcImltcG9ydCAqIGFzIEFjdGlvbkNyZWF0b3JzIGZyb21cIj8nKTtcbiAgfVxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWN0aW9uQ3JlYXRvcnMpO1xuICB2YXIgYm91bmRBY3Rpb25DcmVhdG9ycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICB2YXIgYWN0aW9uQ3JlYXRvciA9IGFjdGlvbkNyZWF0b3JzW2tleV07XG4gICAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBib3VuZEFjdGlvbkNyZWF0b3JzW2tleV0gPSBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib3VuZEFjdGlvbkNyZWF0b3JzO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2JpbmRBY3Rpb25DcmVhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYmluZEFjdGlvbkNyZWF0b3JzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCB7IEFjdGlvblR5cGVzIH0gZnJvbSAnLi9jcmVhdGVTdG9yZSc7XG5pbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3V0aWxzL3dhcm5pbmcnO1xuXG5mdW5jdGlvbiBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbikge1xuICB2YXIgYWN0aW9uVHlwZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZTtcbiAgdmFyIGFjdGlvbk5hbWUgPSBhY3Rpb25UeXBlICYmICdcIicgKyBhY3Rpb25UeXBlLnRvU3RyaW5nKCkgKyAnXCInIHx8ICdhbiBhY3Rpb24nO1xuXG4gIHJldHVybiAnR2l2ZW4gYWN0aW9uICcgKyBhY3Rpb25OYW1lICsgJywgcmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkLiAnICsgJ1RvIGlnbm9yZSBhbiBhY3Rpb24sIHlvdSBtdXN0IGV4cGxpY2l0bHkgcmV0dXJuIHRoZSBwcmV2aW91cyBzdGF0ZS4gJyArICdJZiB5b3Ugd2FudCB0aGlzIHJlZHVjZXIgdG8gaG9sZCBubyB2YWx1ZSwgeW91IGNhbiByZXR1cm4gbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC4nO1xufVxuXG5mdW5jdGlvbiBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKGlucHV0U3RhdGUsIHJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSkge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBhcmd1bWVudE5hbWUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IEFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cbiAgaWYgKHJlZHVjZXJLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG4gIH1cblxuICBpZiAoIWlzUGxhaW5PYmplY3QoaW5wdXRTdGF0ZSkpIHtcbiAgICByZXR1cm4gJ1RoZSAnICsgYXJndW1lbnROYW1lICsgJyBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFwiJyArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgJ1wiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nICcgKyAoJ2tleXM6IFwiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJyk7XG4gIH1cblxuICB2YXIgdW5leHBlY3RlZEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG4gIH0pO1xuXG4gIHVuZXhwZWN0ZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcbiAgfSk7XG5cbiAgaWYgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgJyArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgJyAnICsgKCdcIicgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArICdcIiBmb3VuZCBpbiAnICsgYXJndW1lbnROYW1lICsgJy4gJykgKyAnRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiAnICsgKCdcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2hhcGUocmVkdWNlcnMpIHtcbiAgT2JqZWN0LmtleXMocmVkdWNlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciByZWR1Y2VyID0gcmVkdWNlcnNba2V5XTtcbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICAgIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgZHVyaW5nIGluaXRpYWxpemF0aW9uLiAnICsgJ0lmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlIHJlZHVjZXIgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCAnICsgJ2V4cGxpY2l0bHkgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgJyArICdub3QgYmUgdW5kZWZpbmVkLiBJZiB5b3UgZG9uXFwndCB3YW50IHRvIHNldCBhIHZhbHVlIGZvciB0aGlzIHJlZHVjZXIsICcgKyAneW91IGNhbiB1c2UgbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9ICdAQHJlZHV4L1BST0JFX1VOS05PV05fQUNUSU9OXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNykuc3BsaXQoJycpLmpvaW4oJy4nKTtcbiAgICBpZiAodHlwZW9mIHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IHR5cGUgfSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCB3aGVuIHByb2JlZCB3aXRoIGEgcmFuZG9tIHR5cGUuICcgKyAoJ0RvblxcJ3QgdHJ5IHRvIGhhbmRsZSAnICsgQWN0aW9uVHlwZXMuSU5JVCArICcgb3Igb3RoZXIgYWN0aW9ucyBpbiBcInJlZHV4LypcIiAnKSArICduYW1lc3BhY2UuIFRoZXkgYXJlIGNvbnNpZGVyZWQgcHJpdmF0ZS4gSW5zdGVhZCwgeW91IG11c3QgcmV0dXJuIHRoZSAnICsgJ2N1cnJlbnQgc3RhdGUgZm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHVubGVzcyBpdCBpcyB1bmRlZmluZWQsICcgKyAnaW4gd2hpY2ggY2FzZSB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUsIHJlZ2FyZGxlc3Mgb2YgdGhlICcgKyAnYWN0aW9uIHR5cGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSBub3QgYmUgdW5kZWZpbmVkLCBidXQgY2FuIGJlIG51bGwuJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBkaWZmZXJlbnQgcmVkdWNlciBmdW5jdGlvbnMsIGludG8gYSBzaW5nbGVcbiAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcbiAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuICogcmVkdWNlciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjb21iaW5lZCBpbnRvIG9uZS4gT25lIGhhbmR5IHdheSB0byBvYnRhaW5cbiAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG4gKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG4gKiBpZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZW0gd2FzIHVuZGVmaW5lZCwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGZvciBhbnlcbiAqIHVucmVjb2duaXplZCBhY3Rpb24uXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHJlZHVjZXIgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGV2ZXJ5IHJlZHVjZXIgaW5zaWRlIHRoZVxuICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2FybmluZygnTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFwiJyArIGtleSArICdcIicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cbiAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuICB2YXIgdW5leHBlY3RlZEtleUNhY2hlID0gdm9pZCAwO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHt9O1xuICB9XG5cbiAgdmFyIHNoYXBlQXNzZXJ0aW9uRXJyb3IgPSB2b2lkIDA7XG4gIHRyeSB7XG4gICAgYXNzZXJ0UmVkdWNlclNoYXBlKGZpbmFsUmVkdWNlcnMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2hhcGVBc3NlcnRpb25FcnJvciA9IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oKSB7XG4gICAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzWzFdO1xuXG4gICAgaWYgKHNoYXBlQXNzZXJ0aW9uRXJyb3IpIHtcbiAgICAgIHRocm93IHNoYXBlQXNzZXJ0aW9uRXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB3YXJuaW5nTWVzc2FnZSA9IGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2Uoc3RhdGUsIGZpbmFsUmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKTtcbiAgICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgICB3YXJuaW5nKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBuZXh0U3RhdGUgPSB7fTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgZmluYWxSZWR1Y2VyS2V5cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfa2V5ID0gZmluYWxSZWR1Y2VyS2V5c1tfaV07XG4gICAgICB2YXIgcmVkdWNlciA9IGZpbmFsUmVkdWNlcnNbX2tleV07XG4gICAgICB2YXIgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW19rZXldO1xuICAgICAgdmFyIG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2UoX2tleSwgYWN0aW9uKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBuZXh0U3RhdGVbX2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG4gICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG4gIH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tYmluZVJlZHVjZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21iaW5lUmVkdWNlcnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb21wb3NlcyBzaW5nbGUtYXJndW1lbnQgZnVuY3Rpb25zIGZyb20gcmlnaHQgdG8gbGVmdC4gVGhlIHJpZ2h0bW9zdFxuICogZnVuY3Rpb24gY2FuIHRha2UgbXVsdGlwbGUgYXJndW1lbnRzIGFzIGl0IHByb3ZpZGVzIHRoZSBzaWduYXR1cmUgZm9yXG4gKiB0aGUgcmVzdWx0aW5nIGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jcyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gb2J0YWluZWQgYnkgY29tcG9zaW5nIHRoZSBhcmd1bWVudCBmdW5jdGlvbnNcbiAqIGZyb20gcmlnaHQgdG8gbGVmdC4gRm9yIGV4YW1wbGUsIGNvbXBvc2UoZiwgZywgaCkgaXMgaWRlbnRpY2FsIHRvIGRvaW5nXG4gKiAoLi4uYXJncykgPT4gZihnKGgoLi4uYXJncykpKS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wb3NlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9O1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmdW5jc1swXTtcbiAgfVxuXG4gIHJldHVybiBmdW5jcy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGEoYi5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbXBvc2UuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbXBvc2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0ICQkb2JzZXJ2YWJsZSBmcm9tICdzeW1ib2wtb2JzZXJ2YWJsZSc7XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG5leHBvcnQgdmFyIEFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEByZWR1eC9JTklUJ1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAgICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG4gICAqXG4gICAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAgICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuICAgKiBpbnRvIGEgc2luZ2xlIHJlZHVjZXIgZnVuY3Rpb24gYnkgdXNpbmcgYGNvbWJpbmVSZWR1Y2Vyc2AuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cbiAgICogdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGFjdGlvbiB0byBoYW5kbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBoeWRyYXRlIHRoZSBzdGF0ZSBmcm9tIHRoZSBzZXJ2ZXIgaW4gdW5pdmVyc2FsIGFwcHMsIG9yIHRvIHJlc3RvcmUgYVxuICAgKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICAgKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG4gICAqIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlIGFzIGBjb21iaW5lUmVkdWNlcnNgIGtleXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtlbmhhbmNlcl0gVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICAgKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG4gICAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAgICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAgICpcbiAgICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAgICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICAgKi9cbn07ZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gIHZhciBfcmVmMjtcblxuICBpZiAodHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbmhhbmNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBlbmhhbmNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICB2YXIgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG4gIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpIHtcbiAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHN0YXRlIHRyZWUgbWFuYWdlZCBieSB0aGUgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuICBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG5cbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuICBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoYWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG11c3QgYmUgcGxhaW4gb2JqZWN0cy4gJyArICdVc2UgY3VzdG9tIG1pZGRsZXdhcmUgZm9yIGFzeW5jIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LiAnICsgJ0hhdmUgeW91IG1pc3NwZWxsZWQgYSBjb25zdGFudD8nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VycyBtYXkgbm90IGRpc3BhdGNoIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFJlZHVjZXIoY3VycmVudFN0YXRlLCBhY3Rpb24pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBsaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG4gICAqXG4gICAqIFlvdSBtaWdodCBuZWVkIHRoaXMgaWYgeW91ciBhcHAgaW1wbGVtZW50cyBjb2RlIHNwbGl0dGluZyBhbmQgeW91IHdhbnQgdG9cbiAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAodHlwZW9mIG9ic2VydmVyICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbJCRvYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIF9yZWY7XG4gIH1cblxuICAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuICAvLyByZWR1Y2VyIHJldHVybnMgdGhlaXIgaW5pdGlhbCBzdGF0ZS4gVGhpcyBlZmZlY3RpdmVseSBwb3B1bGF0ZXNcbiAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cbiAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gIHJldHVybiBfcmVmMiA9IHtcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuICB9LCBfcmVmMlskJG9ic2VydmFibGVdID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY3JlYXRlU3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBjcmVhdGVTdG9yZSBmcm9tICcuL2NyZWF0ZVN0b3JlJztcbmltcG9ydCBjb21iaW5lUmVkdWNlcnMgZnJvbSAnLi9jb21iaW5lUmVkdWNlcnMnO1xuaW1wb3J0IGJpbmRBY3Rpb25DcmVhdG9ycyBmcm9tICcuL2JpbmRBY3Rpb25DcmVhdG9ycyc7XG5pbXBvcnQgYXBwbHlNaWRkbGV3YXJlIGZyb20gJy4vYXBwbHlNaWRkbGV3YXJlJztcbmltcG9ydCBjb21wb3NlIGZyb20gJy4vY29tcG9zZSc7XG5pbXBvcnQgd2FybmluZyBmcm9tICcuL3V0aWxzL3dhcm5pbmcnO1xuXG4vKlxuKiBUaGlzIGlzIGEgZHVtbXkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGJlZW4gYWx0ZXJlZCBieSBtaW5pZmljYXRpb24uXG4qIElmIHRoZSBmdW5jdGlvbiBoYXMgYmVlbiBtaW5pZmllZCBhbmQgTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJywgd2FybiB0aGUgdXNlci5cbiovXG5mdW5jdGlvbiBpc0NydXNoZWQoKSB7fVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgaXNDcnVzaGVkLm5hbWUgPT09ICdzdHJpbmcnICYmIGlzQ3J1c2hlZC5uYW1lICE9PSAnaXNDcnVzaGVkJykge1xuICB3YXJuaW5nKCdZb3UgYXJlIGN1cnJlbnRseSB1c2luZyBtaW5pZmllZCBjb2RlIG91dHNpZGUgb2YgTk9ERV9FTlYgPT09IFxcJ3Byb2R1Y3Rpb25cXCcuICcgKyAnVGhpcyBtZWFucyB0aGF0IHlvdSBhcmUgcnVubmluZyBhIHNsb3dlciBkZXZlbG9wbWVudCBidWlsZCBvZiBSZWR1eC4gJyArICdZb3UgY2FuIHVzZSBsb29zZS1lbnZpZnkgKGh0dHBzOi8vZ2l0aHViLmNvbS96ZXJ0b3NoL2xvb3NlLWVudmlmeSkgZm9yIGJyb3dzZXJpZnkgJyArICdvciBEZWZpbmVQbHVnaW4gZm9yIHdlYnBhY2sgKGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzAwMzAwMzEpICcgKyAndG8gZW5zdXJlIHlvdSBoYXZlIHRoZSBjb3JyZWN0IGNvZGUgZm9yIHlvdXIgcHJvZHVjdGlvbiBidWlsZC4nKTtcbn1cblxuZXhwb3J0IHsgY3JlYXRlU3RvcmUsIGNvbWJpbmVSZWR1Y2VycywgYmluZEFjdGlvbkNyZWF0b3JzLCBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy91dGlscy93YXJuaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy91dGlscy93YXJuaW5nLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbmltcG9ydCBwb255ZmlsbCBmcm9tICcuL3BvbnlmaWxsLmpzJztcblxudmFyIHJvb3Q7XG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9IHBvbnlmaWxsKHJvb3QpO1xuZXhwb3J0IGRlZmF1bHQgcmVzdWx0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuXHRpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChTeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sLm9ic2VydmFibGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbCgnb2JzZXJ2YWJsZScpO1xuXHRcdFx0U3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9ICdAQG9ic2VydmFibGUnO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9wb255ZmlsbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvcG9ueWZpbGwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHdhcm5pbmcgPSBmdW5jdGlvbihjb25kaXRpb24sIGZvcm1hdCwgYXJncykge1xuICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuID4gMiA/IGxlbiAtIDIgOiAwKTtcbiAgICBmb3IgKHZhciBrZXkgPSAyOyBrZXkgPCBsZW47IGtleSsrKSB7XG4gICAgICBhcmdzW2tleSAtIDJdID0gYXJndW1lbnRzW2tleV07XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArXG4gICAgICAgICdtZXNzYWdlIGFyZ3VtZW50J1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0Lmxlbmd0aCA8IDEwIHx8ICgvXltzXFxXXSokLykudGVzdChmb3JtYXQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdUaGUgd2FybmluZyBmb3JtYXQgc2hvdWxkIGJlIGFibGUgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyAnICtcbiAgICAgICAgJ3dhcm5pbmcuIFBsZWFzZSwgdXNlIGEgbW9yZSBkZXNjcmlwdGl2ZSBmb3JtYXQgdGhhbjogJyArIGZvcm1hdFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgK1xuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICB9IGNhdGNoKHgpIHt9XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93YXJuaW5nL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsTW9kdWxlKSB7XHJcblx0aWYoIW9yaWdpbmFsTW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0dmFyIG1vZHVsZSA9IE9iamVjdC5jcmVhdGUob3JpZ2luYWxNb2R1bGUpO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZighbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9oYXJtb255LW1vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2hhcm1vbnktbW9kdWxlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBGaWxlSXRlbSA9ICh7aXRlbSwgb25DbGlja30pID0+IChcclxuICAgIDxkaXY+XHJcbiAgICAgICAge2l0ZW0ubmFtZX0gPGkgb25DbGljaz17b25DbGlja30gY2xhc3NOYW1lPVwiZmEgZmEtY2xvc2VcIj48L2k+XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmNsYXNzIEZpbGVTZWxlY3RvciBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGZvcm0gOiBuZXcgRm9ybURhdGEoKVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaGFuZGxlVXBsb2FkRmlsZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc3RhdGUuZm9ybS5hcHBlbmQoZXZlbnQudGFyZ2V0LmZpbGVzWzBdLnNpemUsIGV2ZW50LnRhcmdldC5maWxlc1swXSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGZvcm0gOiB0aGlzLnN0YXRlLmZvcm1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vICcvZmlsZXMnIGlzIHlvdXIgbm9kZS5qcyByb3V0ZSB0aGF0IHRyaWdnZXJzIG91ciBtaWRkbGV3YXJlXHJcbiAgICAgICAgLyogYXhpb3MucG9zdCgnL2ZpbGVzJywgZGF0YSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTsgLy8gZG8gc29tZXRoaW5nIHdpdGggdGhlIHJlc3BvbnNlXHJcbiAgICAgICAgIH0pOyovXHJcbiAgICB9O1xyXG5cclxuICAgIGdldEl0ZW1zID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBsaXN0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgdGhpcy5zdGF0ZS5mb3JtLnZhbHVlcygpKSB7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCggdmFsdWUgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbW92ZSA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5mb3JtLmRlbGV0ZShuYW1lKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtmb3JtOnRoaXMuc3RhdGUuZm9ybX0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT57ICQoXCIjaW5wdXQtXCIgKyB0aGlzLnByb3BzLnRhcmdldCkudHJpZ2dlcihcImNsaWNrXCIpICB9fT5VcGxvYWQgRmlsZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiaXMtaGlkZGVuXCJcclxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVVwbG9hZEZpbGV9XHJcbiAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCIucG5nLC5qcGcsIC5wZGYsIC5kb2MsIC5kb2N4XCJcclxuICAgICAgICAgICAgICAgICAgIGlkPXtcImlucHV0LVwiICsgdGhpcy5wcm9wcy50YXJnZXR9XHJcbiAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiICBuYW1lPXt0aGlzLnByb3BzLnRhcmdldCArIFwiW11cIn0gLz5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRJdGVtcygpLm1hcCgoaXRlbSwgaSk9PntcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEZpbGVJdGVtIGtleT17aX0gaXRlbT17aXRlbX0gb25DbGljaz17ICgpID0+IHRoaXMucmVtb3ZlKGl0ZW0uc2l6ZSl9IC8+XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZpbGVTZWxlY3RvcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0ZpbGVTZWxlY3Rvci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jbGFzcyBTZWFyY2hDb21wZXRpdGlvbiBleHRlbmRzICBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgaW5wdXQ6IFwiXCIsXHJcbiAgICAgICAgICAgIHZhbGlkIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlYXJjaGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWFyY2hEb25lIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHJlc3VsdHM6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlYXJjaCA9ICgpID0+e1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBzZWFyY2hpbmcgOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5BcGkuc2VhcmNoQ29tcGV0aXRpb24odGhpcy5zdGF0ZS5pbnB1dCkuZG9uZSgocmVzdWx0cyk9PntcclxuICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0cyA6IHJlc3VsdHMsXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNlYXJjaERvbmUgOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgaGFuZGxlSW5wdXQgPSAoZSkgPT57XHJcblxyXG4gICAgICAgIGxldCBpbnB1dCA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+KHtcclxuICAgICAgICAgICAgdmFsaWQgOiBpbnB1dC5sZW5ndGggPiAyLFxyXG4gICAgICAgICAgICBpbnB1dCA6IGlucHV0LFxyXG4gICAgICAgICAgICBzZWFyY2hEb25lIDogKCBpbnB1dC5sZW5ndGggPiAwICkgPyBwcmV2U3RhdGUuc2VhcmNoRG9uZSA6IGZhbHNlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtaXRlbS1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIERvIHlvdSB3YW50IHRvIGxpc3QgY29tcGV0aXRpb24tYmFzZWQgY29udGVudD9cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVJbnB1dH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBjb21wZXRpdGlvbiBuYW1lIChlLmcuIEJ1bmRlc2xpZ2EpXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGRpc2FibGVkPXshdGhpcy5zdGF0ZS52YWxpZCB8fCB0aGlzLnN0YXRlLnNlYXJjaGluZ30gb25DbGljaz17dGhpcy5zZWFyY2h9PlNlYXJjaDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2VhcmNoaW5nICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCI+PC9pPn1cclxuXHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5yZXN1bHRzLmxlbmd0aCA+IDAgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8dGFibGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+Q29tcGV0aXRpb248L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5Db3VudHJ5L0NhdGVnb3J5PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+U3BvcnQ8L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUucmVzdWx0cy5tYXAoICggcmVzdWx0LCBpbmRleCApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHRyIGtleT17aW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntyZXN1bHQubmFtZX08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntyZXN1bHQuc3BvcnRDYXRlZ29yeS5uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e3Jlc3VsdC5zcG9ydC5uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PGJ1dHRvbiBvbkNsaWNrPXsgKCkgPT4geyB0aGlzLnByb3BzLnNlbGVjdChyZXN1bHQpIH0gfT5TZWxlY3Q8L2J1dHRvbj48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zZWFyY2hEb25lICYmIHRoaXMuc3RhdGUucmVzdWx0cy5sZW5ndGggPT09IDAgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICBZb3VyIHNlYXJjaCBcInt0aGlzLnN0YXRlLmlucHV0fVwiIGRpZCBub3QgbWF0Y2ggYW55IHByb2R1Y3RzLlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgeyF0aGlzLnN0YXRlLnNlYXJjaERvbmUgJiYgPHNwYW4+RG8geW91IHdhbnQgdG8gbGlzdCBjb250ZW50LCB3aGljaCBpcyBub3QgcmVsYXRlZCB0byBhIHNwZWNpZmljIGNvbXBldGl0aW9uPzwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2VhcmNoRG9uZSAmJiB0aGlzLnN0YXRlLnJlc3VsdHMubGVuZ3RoID4gMCAmJiA8c3Bhbj5DYW4ndCBmaW5kIHlvdXIgY29tcGV0aXRpb24gaW4gb3VyIGxpc3Q/IDwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2VhcmNoRG9uZSAmJiB0aGlzLnN0YXRlLnJlc3VsdHMubGVuZ3RoID09PSAwICYmIDxzcGFuPlRyeSBhbm90aGVyIHNlYXJjaCBvciBjcmVhdGUgY29udGVudCBtYW51YWxseTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLmNsb3NlfT5DcmVhdGUgY29udGVudCBtYW51YWxseTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ29tcGV0aXRpb247XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9TZWFyY2hDb21wZXRpdGlvbi5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4uLy4uL3NlbGwvc3RvcmUnO1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xyXG5cclxuY29uc3QgY3VzdG9tU3R5bGVzID0ge1xyXG4gICAgY29udGVudCA6IHtcclxuICAgICAgICB0b3AgICAgICAgICAgICAgICAgICAgOiAnNTAlJyxcclxuICAgICAgICBsZWZ0ICAgICAgICAgICAgICAgICAgOiAnNTAlJyxcclxuICAgICAgICByaWdodCAgICAgICAgICAgICAgICAgOiAnYXV0bycsXHJcbiAgICAgICAgYm90dG9tICAgICAgICAgICAgICAgIDogJ2F1dG8nLFxyXG4gICAgICAgIG1hcmdpblJpZ2h0ICAgICAgICAgICA6ICctNTAlJyxcclxuICAgICAgICB0cmFuc2Zvcm0gICAgICAgICAgICAgOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJ1xyXG4gICAgfVxyXG59O1xyXG5cclxuTW9kYWwuc2V0QXBwRWxlbWVudCgnI3NlbGwtZm9ybS1jb250YWluZXInKTtcclxuXHJcbmNvbnN0IFNlbGVjdG9ySXRlbSA9ICh7bGFiZWwsIHNlbGVjdGVkLCBvbkNsaWNrfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e1wic2VsZWN0b3ItaXRlbSBcIiArIChzZWxlY3RlZCAmJiBcInNlbGVjdG9yLWl0ZW0tc2VsZWN0ZWRcIil9IG9uQ2xpY2s9e29uQ2xpY2t9PlxyXG4gICAgICAgIHtsYWJlbH1cclxuICAgIDwvZGl2PlxyXG4pO1xyXG5cclxuXHJcbmNsYXNzIFNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdXBkYXRlZCA6IGZhbHNlLFxyXG4gICAgICAgICAgICBmaWx0ZXJVcGRhdGVkIDogZmFsc2UsXHJcbiAgICAgICAgICAgIG9wZW4gOiBwcm9wcy5zZWxlY3RvcixcclxuICAgICAgICAgICAgc2VsZWN0b3JJdGVtcyA6IHByb3BzLnNlbGVjdG9ySXRlbXMgfHwgW10sXHJcbiAgICAgICAgICAgIHBvcHVsYXJJdGVtcyA6IHByb3BzLnBvcHVsYXJJdGVtcyB8fCBbXSxcclxuICAgICAgICAgICAgZmlsdGVyIDoge1xyXG4gICAgICAgICAgICAgICAgXCJhZ1wiIDogeyB0eXBlOiBcImZpcnN0TGV0dGVyXCIsIHZhbHVlczogW1wiYVwiLCdiJywnYycsJ2QnLCdlJywnZicsJ2cnXSB9LFxyXG4gICAgICAgICAgICAgICAgXCJoblwiIDogeyB0eXBlOiBcImZpcnN0TGV0dGVyXCIsIHZhbHVlczogW1wiaFwiLCdpJywnaicsJ2snLCdsJywnaycsJ24nXSB9LFxyXG4gICAgICAgICAgICAgICAgXCJvdFwiIDogeyB0eXBlOiBcImZpcnN0TGV0dGVyXCIsIHZhbHVlczogW1wib1wiLCdwJywncScsJ3InLCdzJywndCddIH0sXHJcbiAgICAgICAgICAgICAgICBcInV6XCIgOiB7IHR5cGU6IFwiZmlyc3RMZXR0ZXJcIiwgdmFsdWVzOiBbXCJ1XCIsJ3YnLCd3JywneCcsJ3knLCd6J10gfSxcclxuICAgICAgICAgICAgICAgIFwicG9wdWxhclwiIDogeyB0eXBlOiBcIm9yaWdpblwiLCB2YWx1ZTogXCJwb3B1bGFySXRlbXNcIn1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogcHJvcHMuYWN0aXZlRmlsdGVyIHx8IFwiYWdcIixcclxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtIDoge31cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKGEpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+e1xyXG4gICAgfTtcclxuXHJcbiAgICBvcGVuTW9kYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vcGVuU2VsZWN0b3IoKTtcclxuICAgIH07XHJcblxyXG4gICAgYWZ0ZXJPcGVuTW9kYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gcmVmZXJlbmNlcyBhcmUgbm93IHN5bmMnZCBhbmQgY2FuIGJlIGFjY2Vzc2VkLlxyXG4gICAgICAgIC8vdGhpcy5zdWJ0aXRsZS5zdHlsZS5jb2xvciA9ICcjZjAwJztcclxuICAgIH07XHJcblxyXG4gICAgY2xvc2VNb2RhbCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXBkYXRlZDogZmFsc2UsIGZpbHRlclVwZGF0ZWQgOiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLmNsb3NlU2VsZWN0b3IoKTtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0QWN0aXZlRmlsdGVyID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBhY3RpdmVGaWx0ZXIgPSB0aGlzLmdldEFjdGl2ZUZpbHRlck5hbWUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5maWx0ZXJbYWN0aXZlRmlsdGVyXTtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0QWN0aXZlRmlsdGVyTmFtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gKCB0aGlzLnByb3BzLmFjdGl2ZUZpbHRlciAmJiAhdGhpcy5zdGF0ZS5maWx0ZXJVcGRhdGVkICkgPyB0aGlzLnByb3BzLmFjdGl2ZUZpbHRlciA6IHRoaXMuc3RhdGUuYWN0aXZlRmlsdGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICBzaG91bGRTaG93RmlsdGVycyA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdG9ySXRlbXMgJiYgdGhpcy5wcm9wcy5zZWxlY3Rvckl0ZW1zLmxlbmd0aCA+IDMwXHJcbiAgICB9O1xyXG5cclxuICAgIHNldEFjdGl2ZUZpbHRlciA9ICggZmlsdGVyTmFtZSApID0+e1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgYWN0aXZlRmlsdGVyOiBmaWx0ZXJOYW1lLGZpbHRlclVwZGF0ZWQgOiB0cnVlfSlcclxuICAgIH07XHJcblxyXG4gICAgYXBwbHlTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVwZGF0ZWQ6IGZhbHNlLCBmaWx0ZXJVcGRhdGVkIDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5hcHBseVNlbGVjdGlvbih0aGlzLnByb3BzLnNlbGVjdG9yVHlwZSwgdGhpcy5zdGF0ZS5zZWxlY3RlZEl0ZW0sIHRoaXMucHJvcHMubXVsdGlwbGUsIHRoaXMucHJvcHMuaW5kZXgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGROZXdTcG9ydCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXBkYXRlZDogZmFsc2UsIGZpbHRlclVwZGF0ZWQgOiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLmFkZE5ld1Nwb3J0KCk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZVNlbGVjdG9yKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZE5ld1RvdXJuYW1lbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVwZGF0ZWQ6IGZhbHNlLCBmaWx0ZXJVcGRhdGVkIDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5hZGROZXdUb3VybmFtZW50KCk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZVNlbGVjdG9yKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGVjdEl0ZW0gPSAoIGl0ZW0gKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkSXRlbSA6IGl0ZW0sIHVwZGF0ZWQ6IHRydWUgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlzSXRlbVNlbGVjdGVkID0gKCBpdGVtICkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMuc3RhdGUudXBkYXRlZCApe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5zZWxlY3RlZEl0ZW0uZXh0ZXJuYWxfaWQgPT09IGl0ZW0uZXh0ZXJuYWxfaWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wcm9wcy5zZWxlY3RlZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0ZWQubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgKHRoaXMucHJvcHMubXVsdGlwbGUgJiYgdGhpcy5wcm9wcy5zZWxlY3RlZFt0aGlzLnByb3BzLmluZGV4XSkgPyB0aGlzLnByb3BzLnNlbGVjdGVkW3RoaXMucHJvcHMuaW5kZXhdLmV4dGVybmFsX2lkID09PSBpdGVtLmV4dGVybmFsX2lkXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuc2VsZWN0ZWQuZXh0ZXJuYWxfaWQgPT09IGl0ZW0uZXh0ZXJuYWxfaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmaWx0ZXIgPSAoaXRlbSkgPT57XHJcbiAgICAgICAgbGV0IGZpbHRlciA9IHRoaXMuZ2V0QWN0aXZlRmlsdGVyKCk7XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlci52YWx1ZXMuaW5kZXhPZihpdGVtLm5hbWVbMF0udG9Mb3dlckNhc2UoKSkgIT09IC0xXHJcbiAgICB9O1xyXG5cclxuICAgIGdldEl0ZW1zID0gKCkgPT57XHJcbiAgICAgICAgbGV0IGZpbHRlciA9IHRoaXMuZ2V0QWN0aXZlRmlsdGVyKCk7XHJcbiAgICAgICAgaWYgKCBmaWx0ZXIudHlwZSA9PT0gXCJvcmlnaW5cIiApIHJldHVybiB0aGlzLnByb3BzW2ZpbHRlci52YWx1ZV07XHJcbiAgICAgICAgaWYgKCBmaWx0ZXIudHlwZSA9PT0gXCJmaXJzdExldHRlclwiKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoICF0aGlzLnNob3VsZFNob3dGaWx0ZXJzKCkgKSByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3Rvckl0ZW1zO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2VsZWN0b3JJdGVtcy5maWx0ZXIodGhpcy5maWx0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsXHJcbiAgICAgICAgICAgICAgICBpc09wZW49e3RoaXMucHJvcHMub3Blbn1cclxuICAgICAgICAgICAgICAgIG9uQWZ0ZXJPcGVuPXt0aGlzLmFmdGVyT3Blbk1vZGFsfVxyXG4gICAgICAgICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e3RoaXMuY2xvc2VNb2RhbH1cclxuICAgICAgICAgICAgICAgIGJvZHlPcGVuQ2xhc3NOYW1lPXtcInNlbGVjdG9yXCJ9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17Y3VzdG9tU3R5bGVzfVxyXG4gICAgICAgICAgICAgICAgY29udGVudExhYmVsPVwiRXhhbXBsZSBNb2RhbFwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHsvKjxoMiByZWY9e3N1YnRpdGxlID0+IHRoaXMuc3VidGl0bGUgPSBzdWJ0aXRsZX0+SGVsbG88L2gyPiovfVxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMucG9wdWxhckl0ZW1zICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wic2VsZWN0b3ItZmlsdGVyIFwiICsgKHRoaXMuZ2V0QWN0aXZlRmlsdGVyTmFtZSgpID09PSBcInBvcHVsYXJcIiAmJiBcInNlbGVjdG9yLWZpbHRlci1hY3RpdmVcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+eyB0aGlzLnNldEFjdGl2ZUZpbHRlcihcInBvcHVsYXJcIil9fT5Qb3B1bGFyPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zaG91bGRTaG93RmlsdGVycygpICYmIDxidXR0b24gY2xhc3NOYW1lPXtcInNlbGVjdG9yLWZpbHRlciBcIiArICh0aGlzLmdldEFjdGl2ZUZpbHRlck5hbWUoKSA9PT0gXCJhZ1wiICYmIFwic2VsZWN0b3ItZmlsdGVyLWFjdGl2ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwiYWdcIil9fT5BLUc8L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnNob3VsZFNob3dGaWx0ZXJzKCkgJiYgPGJ1dHRvbiBjbGFzc05hbWU9e1wic2VsZWN0b3ItZmlsdGVyIFwiICsgKHRoaXMuZ2V0QWN0aXZlRmlsdGVyTmFtZSgpID09PSBcImhuXCIgJiYgXCJzZWxlY3Rvci1maWx0ZXItYWN0aXZlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnsgdGhpcy5zZXRBY3RpdmVGaWx0ZXIoXCJoblwiKX19PkgtTjwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc2hvdWxkU2hvd0ZpbHRlcnMoKSAmJiA8YnV0dG9uIGNsYXNzTmFtZT17XCJzZWxlY3Rvci1maWx0ZXIgXCIgKyAodGhpcy5nZXRBY3RpdmVGaWx0ZXJOYW1lKCkgPT09IFwib3RcIiAmJiBcInNlbGVjdG9yLWZpbHRlci1hY3RpdmVcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+eyB0aGlzLnNldEFjdGl2ZUZpbHRlcihcIm90XCIpfX0+Ty1UPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zaG91bGRTaG93RmlsdGVycygpICYmIDxidXR0b24gY2xhc3NOYW1lPXtcInNlbGVjdG9yLWZpbHRlciBcIiArICh0aGlzLmdldEFjdGl2ZUZpbHRlck5hbWUoKSA9PT0gXCJ1elwiICYmIFwic2VsZWN0b3ItZmlsdGVyLWFjdGl2ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwidXpcIil9fT5VLVo8L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0b3ItY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRJdGVtcygpLm1hcChmdW5jdGlvbihpdGVtLCBpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxTZWxlY3Rvckl0ZW0ga2V5PXtpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17aXRlbS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gX3RoaXMuc2VsZWN0SXRlbShpdGVtKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eyBfdGhpcy5pc0l0ZW1TZWxlY3RlZChpdGVtKSB9Lz47XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNsb3NlTW9kYWx9PkNhbmNlbDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5hcHBseVNlbGVjdGlvbn0gZGlzYWJsZWQ9eyF0aGlzLnN0YXRlLnVwZGF0ZWR9PkFwcGx5PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5DYW4ndCBmaW5kIHlvdXIgc3BvcnQgaW4gdGhlIGxpc3Q/IDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNob3dOZXdTcG9ydCAmJiA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuYWRkTmV3U3BvcnR9ID5BZGQgbmV3IFNwb3J0PC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNob3dOZXdUb3VybmFtZW50ICYmIDxidXR0b24gb25DbGljaz17dGhpcy5hZGROZXdUb3VybmFtZW50fSA+QWRkIG5ldyBUb3VybmFtZW50PC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvTW9kYWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCBzdGF0ZSApID0+IHtcclxuICAgIHJldHVybiBzdGF0ZS5zZWxlY3RvckluZm9cclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb3BlblNlbGVjdG9yIDogKCkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogJ09QRU5fU0VMRUNUT1InXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgY2xvc2VTZWxlY3RvciA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdDTE9TRV9TRUxFQ1RPUidcclxuICAgICAgICB9KSxcclxuICAgICAgICBhcHBseVNlbGVjdGlvbiA6IChzZWxlY3RvclR5cGUsIHNlbGVjdGVkSXRlbSwgbXVsdGlwbGUsIGluZGV4KSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnQVBQTFlfU0VMRUNUSU9OJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlIDogc2VsZWN0b3JUeXBlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW0gOiBzZWxlY3RlZEl0ZW0sXHJcbiAgICAgICAgICAgIG11bHRpcGxlIDogbXVsdGlwbGUsXHJcbiAgICAgICAgICAgIGluZGV4IDogaW5kZXhcclxuICAgICAgICB9KSxcclxuICAgICAgICBhZGROZXdTcG9ydCA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdBRERfTkVXX1NQT1JUJyxcclxuICAgICAgICB9KSxcclxuICAgICAgICBhZGROZXdUb3VybmFtZW50IDogKCkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogJ0FERF9ORVdfVE9VUk5BTUVOVCcsXHJcbiAgICAgICAgfSksXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoU2VsZWN0b3IpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL1NlbGVjdG9yLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFBhY2thZ2VTZWxlY3RvciBmcm9tIFwiLi4vY29udGFpbmVycy9QYWNrYWdlU2VsZWN0b3JcIjtcclxuaW1wb3J0IFNlbGxCdXR0b25zIGZyb20gXCIuLi9jb250YWluZXJzL2J1dHRvbnNcIjtcclxuaW1wb3J0IFNlbGxGb3JtU3RlcHMgZnJvbSBcIi4uL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwc1wiO1xyXG5pbXBvcnQgU2VsbEZvcm1TdGVwMSBmcm9tIFwiLi4vY29udGFpbmVycy9TZWxsRm9ybVN0ZXAxXCI7XHJcbmltcG9ydCBTZWxlY3RvciBmcm9tIFwiLi4vLi4vbWFpbi9jb21wb25lbnRzL1NlbGVjdG9yXCI7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4uL3N0b3JlJztcclxuXHJcblxyXG5jbGFzcyBTZWxsRm9ybSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBjb250ZW50IDogSlNPTi5wYXJzZShwcm9wcy5jb250ZW50KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHN0b3JlLnN1YnNjcmliZSgoYSkgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHN0b3JlLmdldFN0YXRlKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gKCkgPT57XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jb250ZW50TGlzdGluZ0luaXQoIHRoaXMuc3RhdGUuY29udGVudCApO1xyXG4gICAgfSA7XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWluLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPFNlbGVjdG9yIC8+XHJcbiAgICAgICAgICAgICAgICA8U2VsbEZvcm1TdGVwcyAvPlxyXG4gICAgICAgICAgICAgICAgPFNlbGxGb3JtU3RlcDEvPlxyXG4gICAgICAgICAgICAgICAgPFBhY2thZ2VTZWxlY3RvciB7Li4uIHRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICA8U2VsbEJ1dHRvbnMgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCBzdGF0ZSwgb3duUHJvcHMpID0+IHtcclxuICAgIHJldHVybiBvd25Qcm9wcztcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29udGVudExpc3RpbmdJbml0IDogKGNvbnRlbnQpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdDT05URU5UX0lOSVQnLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50XHJcbiAgICAgICAgfSksXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoU2VsbEZvcm0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL1NlbGxGb3JtLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5cclxuY29uc3QgU3VwZXJSaWdodCA9ICh7c3VwZXJSaWdodCwgb25DaGFuZ2UsIGNoZWNrZWR9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1ib3gtaXRlbVwiID5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1ib3gtY2hlY2tib3hcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q2hlY2tlZD17Y2hlY2tlZH1cclxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgKCkgPT4gb25DaGFuZ2Uoc3VwZXJSaWdodCl9XHJcbiAgICAgICAgICAgICAgICAgICBpZD17XCJzdXBlci1yaWdodC1cIiArIHN1cGVyUmlnaHQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwYWNrYWdlLXNlbGVjdG9yXCIgLz5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtcInN1cGVyLXJpZ2h0LVwiICsgc3VwZXJSaWdodC5pZH0+PC9sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1ib3gtaXRlbS1sYWJlbFwiPlxyXG4gICAgICAgICAgICB7IHN1cGVyUmlnaHQubmFtZSB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmNsYXNzIFBhY2thZ2VTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBwYWNrYWdlcyA6IEpTT04ucGFyc2UocHJvcHMucGFja2FnZXMpLFxyXG4gICAgICAgICAgICBjb250ZW50IDogSlNPTi5wYXJzZShwcm9wcy5jb250ZW50KVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxpc3RpbmdJbmZvLnN0ZXAgPT09IDIgJiYgPGRpdiBjbGFzc05hbWU9XCJib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveC10aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQaWNrIHJpZ2h0c1xyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsbGVyLWJveC1jb250ZW50IHNlbGxlci1ib3gtcGFja2FnZXNcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5wYWNrYWdlcy5tYXAoZnVuY3Rpb24oc3VwZXJSaWdodCwgaSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFN1cGVyUmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3N1cGVyUmlnaHQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXJSaWdodD17c3VwZXJSaWdodH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXsgQ29udGVudEFyZW5hLlV0aWxzLmdldEluZGV4KCBzdXBlclJpZ2h0LmlkLCBfdGhpcy5wcm9wcy5saXN0aW5nSW5mby5yaWdodHNfcGFja2FnZSwgXCJpZFwiKSAhPT0gLTEgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgX3RoaXMucHJvcHMuc3VwZXJSaWdodHNVcGRhdGVkIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsaXN0aW5nSW5mbyA6IHN0YXRlLmxpc3RpbmdJbmZvXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1cGVyUmlnaHRzVXBkYXRlZCA6IChyaWdodHNfcGFja2FnZSkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogJ1NVUEVSX1JJR0hUU19VUERBVEVEJyxcclxuICAgICAgICAgICAgcmlnaHRzX3BhY2thZ2U6IHJpZ2h0c19wYWNrYWdlXHJcbiAgICAgICAgfSksXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoUGFja2FnZVNlbGVjdG9yKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9QYWNrYWdlU2VsZWN0b3IuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCBGaWxlU2VsZWN0b3IgZnJvbSAnLi4vLi4vbWFpbi9jb21wb25lbnRzL0ZpbGVTZWxlY3RvcidcclxuaW1wb3J0IFNlYXJjaENvbXBldGl0aW9uIGZyb20gJy4uLy4uL21haW4vY29tcG9uZW50cy9TZWFyY2hDb21wZXRpdGlvbidcclxuY29uc3QgRGVzY3JpcHRpb24gPSAoe3ZhbHVlLCBvbkJsdXJ9KSA9PiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1pdGVtLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgIFByb3ZpZGUgYSBzaG9ydCBkZXNjcmlwdGlvbiBvZiB5b3VyIGNvbnRlbnQgbGlzdGluZ1xyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDx0ZXh0YXJlYSBvbkJsdXI9e29uQmx1cn0gdmFsdWU9e3ZhbHVlfT48L3RleHRhcmVhPlxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5jb25zdCBXZWJzaXRlID0gKHt2YWx1ZSwgb25CbHVyfSkgPT4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwid2Vic2l0ZVwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXZWJzaXRlXCIvPlxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5jb25zdCBOZXdTcG9ydCA9ICh7b25DbGlja30pID0+IChcclxuICAgIDxkaXY+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5ldy1zcG9ydFwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBzcG9ydFwiLz5cclxuICAgICAgICA8aSBvbkNsaWNrPXtvbkNsaWNrfSBjbGFzc05hbWU9XCJmYSBmYS1jbG9zZVwiPjwvaT5cclxuICAgIDwvZGl2PlxyXG4pO1xyXG5cclxuY29uc3QgTmV3Q2F0ZWdvcnkgPSAoe30pID0+IChcclxuICAgIDxkaXY+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5ldy1jYXRlZ29yeVwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBjYXRlZ29yeVwiLz5cclxuICAgIDwvZGl2PlxyXG4pO1xyXG5cclxuY29uc3QgTmV3VG91cm5hbWVudCA9ICh7b25DbGljaywgc2hvd0Nsb3NlLCBvbkJsdXIsIHZhbHVlfSkgPT4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibmV3LWNhdGVnb3J5XCJcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBjb21wZXRpdGlvbiBuYW1lXCIvPlxyXG4gICAgICAgIHsgc2hvd0Nsb3NlICYmIDxpIG9uQ2xpY2s9e29uQ2xpY2t9IGNsYXNzTmFtZT1cImZhIGZhLWNsb3NlXCI+PC9pPn1cclxuICAgIDwvZGl2PlxyXG4pO1xyXG5jb25zdCBTY2hlZHVsZXMgPSAoe3NjaGVkdWxlc30pID0+IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2NoZWR1bGVcIj5cclxuICAgICAgICB7IHNjaGVkdWxlcyAmJiBPYmplY3Qua2V5cyhzY2hlZHVsZXMpLm1hcCgoIG51bWJlciwgaSApID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIDxSb3VuZCBrZXk9e2l9IHJvdW5kPXtudW1iZXJ9IHNjaGVkdWxlPXtzY2hlZHVsZXNbbnVtYmVyXX0gLz5cclxuICAgICAgICB9KSB9XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmNsYXNzIFJvdW5kIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHJvdW5kIDogcHJvcHMucm91bmQsXHJcbiAgICAgICAgICAgIHNjaGVkdWxlIDogcHJvcHMuc2NoZWR1bGUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkIDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUsIHByb3BzKSA9PiAoe1xyXG4gICAgICAgICAgICBzZWxlY3RlZDogIXByZXZTdGF0ZS5zZWxlY3RlZFxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMudG9nZ2xlfT5cclxuICAgICAgICAgICAgICAgICAgICBSb3VuZCB7dGhpcy5zdGF0ZS5yb3VuZH1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiA8c3Bhbj5VbnNlbGVjdDwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zZWxlY3RlZCAmJiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNjaGVkdWxlLmxlbmd0aCA+IDAgJiYgdGhpcy5zdGF0ZS5zY2hlZHVsZS5tYXAoKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxNYXRjaCBtYXRjaD17aXRlbX0ga2V5PXtpfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTWF0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbWF0Y2ggOiBwcm9wcy5tYXRjaCxcclxuICAgICAgICAgICAgc2VsZWN0ZWQgOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSwgcHJvcHMpID0+ICh7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAhcHJldlN0YXRlLnNlbGVjdGVkXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCBjb21wZXRpdG9yc0xlbiA9IHRoaXMucHJvcHMubWF0Y2guY29tcGV0aXRvcnMubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgb25DbGljaz17dGhpcy50b2dnbGV9PlxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMubWF0Y2guY29tcGV0aXRvcnMubWFwKCggY29tcGV0aXRvciwgaSk9PntcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtpfT57Y29tcGV0aXRvci5uYW1lfSB7KGNvbXBldGl0b3JzTGVuICE9PSBpICsgMSkgJiYgXCIgdnMgXCIgfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2VsZWN0ZWQgJiYgPHNwYW4+VW5zZWxlY3Q8L3NwYW4+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNlYXNvblNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHNob3dTY2hlZHVsZSA6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlLCBwcm9wcykgPT4gKHtcclxuICAgICAgICAgICAgc2hvd1NjaGVkdWxlOiAhcHJldlN0YXRlLnNob3dTY2hlZHVsZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuaW5wdXRQcm9wc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmxvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub3BlblNlbGVjdG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17XCJTZWFzb25cIn0gIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmxvYWRpbmcgJiYgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIj48L2k+fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zY2hlZHVsZXMgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMudG9nZ2xlfT5TaG93IHNjaGVkdWxlPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zaG93U2NoZWR1bGUgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8U2NoZWR1bGVzIHNjaGVkdWxlcz17dGhpcy5wcm9wcy5zY2hlZHVsZXN9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNob3dBZGROZXcgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMucHJvcHMuYWRkU2Vhc29ufT5BZGQgbmV3IHNlYXNvbjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBTZWxsRm9ybVN0ZXAxIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB0aXRsZSA6IFwiU3RlcCAxIC0gRXZlbnQgc2VsZWN0aW9uXCIsXHJcbiAgICAgICAgICAgIGxhc3RTcG9ydElkIDogbnVsbCxcclxuICAgICAgICAgICAgbGFzdENhdGVnb3J5SWQgOiBudWxsLFxyXG4gICAgICAgICAgICBsYXN0VG91cm5hbWVudElkIDogbnVsbCxcclxuICAgICAgICAgICAgbG9hZGluZ0NhdGVnb3JpZXMgOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9hZGluZ1RvdXJuYW1lbnRzIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGxvYWRpbmdTZWFzb25zOiBmYWxzZSxcclxuICAgICAgICAgICAgc2Vhc29uU2VsZWN0b3JzIDogWzFdLFxyXG4gICAgICAgICAgICBzZWFzb25zOiBbXSxcclxuICAgICAgICAgICAgc2NoZWR1bGVzOiB7fSxcclxuICAgICAgICAgICAgc2hvd1NlYXJjaCA6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldFNwb3J0cygpLmRvbmUoIChzcG9ydHMgKSA9PiB7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBzcG9ydHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZENhdGVnb3JpZXMgKG5leHRQcm9wcykge1xyXG5cclxuICAgICAgICBsZXQgc3BvcnRJZCA9IG5leHRQcm9wcy5saXN0aW5nSW5mby5zcG9ydHNbMF0uZXh0ZXJuYWxfaWQ7XHJcblxyXG4gICAgICAgIGlmICggc3BvcnRJZCA9PT0gdGhpcy5zdGF0ZS5sYXN0U3BvcnRJZCApIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmdDYXRlZ29yaWVzIDogdHJ1ZSB9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldENhdGVnb3JpZXMoc3BvcnRJZCkuZG9uZSggKGNhdGVnb3JpZXMgKSA9PiB7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFNwb3J0SWQgOiBzcG9ydElkLCBsb2FkaW5nQ2F0ZWdvcmllcyA6IGZhbHNlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRUb3VybmFtZW50cyAobmV4dFByb3BzKSB7XHJcblxyXG4gICAgICAgIGxldCBzcG9ydElkID0gbmV4dFByb3BzLmxpc3RpbmdJbmZvLnNwb3J0c1swXS5leHRlcm5hbF9pZDtcclxuICAgICAgICBsZXQgY2F0ZWdvcnlJZCA9ICggbmV4dFByb3BzLmxpc3RpbmdJbmZvLnNwb3J0X2NhdGVnb3J5ICkgPyBuZXh0UHJvcHMubGlzdGluZ0luZm8uc3BvcnRfY2F0ZWdvcnkuZXh0ZXJuYWxfaWQgOiBudWxsO1xyXG5cclxuICAgICAgICBpZiAoIHNwb3J0SWQgPT09IHRoaXMuc3RhdGUubGFzdFNwb3J0SWQgJiYgY2F0ZWdvcnlJZCA9PT0gdGhpcy5zdGF0ZS5sYXN0Q2F0ZWdvcnlJZCApIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmdUb3VybmFtZW50cyA6IHRydWUgfSk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkFwaS5nZXRUb3VybmFtZW50cyhzcG9ydElkLGNhdGVnb3J5SWQpLmRvbmUoICh0b3VybmFtZW50cyApID0+IHtcclxuICAgICAgICAgICAgQ29udGVudEFyZW5hLkRhdGEuVG91cm5hbWVudHMgPSB0b3VybmFtZW50cztcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBsYXN0U3BvcnRJZCA6IHNwb3J0SWQsXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nVG91cm5hbWVudHMgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGxhc3RDYXRlZ29yeUlkIDogY2F0ZWdvcnlJZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkU2Vhc29ucyAobmV4dFByb3BzKSB7XHJcblxyXG4gICAgICAgIGxldCB0b3VybmFtZW50SWQgPSAoIG5leHRQcm9wcy5saXN0aW5nSW5mby50b3VybmFtZW50ICkgPyBuZXh0UHJvcHMubGlzdGluZ0luZm8udG91cm5hbWVudC5leHRlcm5hbF9pZCA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmICggdG91cm5hbWVudElkID09PSB0aGlzLnN0YXRlLmxhc3RUb3VybmFtZW50SWQgKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nU2Vhc29ucyA6IHRydWUgfSk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkFwaS5nZXRTZWFzb25zKHRvdXJuYW1lbnRJZCkuZG9uZSggKHNlYXNvbnMgKSA9PiB7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLlNlYXNvbnMgPSBzZWFzb25zO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGxhc3RUb3VybmFtZW50SWQgOiB0b3VybmFtZW50SWQsXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nU2Vhc29ucyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2Vhc29ucyA6IHNlYXNvbnNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFNjaGVkdWxlIChuZXh0UHJvcHMpIHtcclxuXHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgbmV4dFByb3BzLmxpc3RpbmdJbmZvLnNlYXNvbnMuZm9yRWFjaCgoIHNlYXNvbiApID0+e1xyXG4gICAgICAgICAgICBpZiAoICFfdGhpcy5zdGF0ZS5zY2hlZHVsZXNbc2Vhc29uLmV4dGVybmFsX2lkXSApe1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBsb2FkaW5nU2NoZWR1bGUgOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkFwaS5nZXRTY2hlZHVsZShzZWFzb24uZXh0ZXJuYWxfaWQpLmRvbmUoIChzY2hlZHVsZXMgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLypDb250ZW50QXJlbmEuRGF0YS5TZWFzb25zID0gc2Vhc29uczsqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNjaGVkdWxlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoZnVuY3Rpb24ocHJldlN0YXRlLCBwcm9wcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJldlNjaGVkdWxlcyA9IHByZXZTdGF0ZS5zY2hlZHVsZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTY2hlZHVsZXNbc2Vhc29uLmV4dGVybmFsX2lkXSA9IHNjaGVkdWxlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdTY2hlZHVsZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVzOiBwcmV2U2NoZWR1bGVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFNjaGVkdWxlcyhpbmRleCl7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5saXN0aW5nSW5mby5zZWFzb25zIHx8ICF0aGlzLnByb3BzLmxpc3RpbmdJbmZvLnNlYXNvbnNbaW5kZXhdICkgcmV0dXJuIFtdO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5zY2hlZHVsZXNbdGhpcy5wcm9wcy5saXN0aW5nSW5mby5zZWFzb25zW2luZGV4XS5leHRlcm5hbF9pZF07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xyXG4gICAgICAgIGlmICggbmV4dFByb3BzLmxpc3RpbmdJbmZvLnNwb3J0cy5sZW5ndGggPiAwICkgdGhpcy5sb2FkQ2F0ZWdvcmllcyhuZXh0UHJvcHMpO1xyXG4gICAgICAgIGlmICggbmV4dFByb3BzLmxpc3RpbmdJbmZvLnNwb3J0cy5sZW5ndGggPiAwIHx8IG5leHRQcm9wcy5saXN0aW5nSW5mby5jYXRlZ29yeSApIHRoaXMubG9hZFRvdXJuYW1lbnRzKG5leHRQcm9wcyk7XHJcbiAgICAgICAgaWYgKCBuZXh0UHJvcHMubGlzdGluZ0luZm8udG91cm5hbWVudCApe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTZWFzb25zKG5leHRQcm9wcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggbmV4dFByb3BzLmxpc3RpbmdJbmZvLnNlYXNvbnMubGVuZ3RoID4gMCApIHRoaXMubG9hZFNjaGVkdWxlKG5leHRQcm9wcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ29udGVudFZhbHVlID0gKCBldmVudCwga2V5ICkgPT57XHJcbiAgICAgICAgdGhpcy5wcm9wcy51cGRhdGVDb250ZW50VmFsdWUoa2V5LGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGhhc0N1c3RvbVRvdXJuYW1lbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubGlzdGluZ0luZm8ubmV3U3BvcnQgfHwgdGhpcy5wcm9wcy5saXN0aW5nSW5mby5uZXdUb3VybmFtZW50XHJcbiAgICAgICAgICAgIHx8IHRoaXMucHJvcHMubGlzdGluZ0luZm8uY3VzdG9tX3RvdXJuYW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZE5ld1NlYXNvbiA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUsIHByb3BzKT0+ICh7XHJcbiAgICAgICAgICAgIHNlYXNvblNlbGVjdG9ycyA6IFsuLi5wcmV2U3RhdGUuc2Vhc29uU2VsZWN0b3JzLCAxXVxyXG4gICAgICAgIH0pKVxyXG4gICAgfTtcclxuXHJcbiAgICB0b2dnbGVTZWFyY2ggPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlLCBwcm9wcykgPT4gKHtcclxuICAgICAgICAgICAgc2hvd1NlYXJjaDogIXByZXZTdGF0ZS5zaG93U2VhcmNoXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxlY3RUb3VybmFtZW50ID0gKCB0b3VybmFtZW50ICkgPT57XHJcbiAgICAgICAgdGhpcy50b2dnbGVTZWFyY2goKTtcclxuICAgICAgICB0aGlzLnByb3BzLnNlbGVjdFRvdXJuYW1lbnQodG91cm5hbWVudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMucHJvcHMubGlzdGluZ0luZm8uc3RlcCAhPT0gMSkgcmV0dXJuIChudWxsKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IHtcclxuICAgICAgICAgICAgc3BvcnRzOiB7IHZhbHVlIDogXCJcIiB9LFxyXG4gICAgICAgICAgICBzcG9ydF9jYXRlZ29yeSA6IHsgdmFsdWUgOiBcIlwiIH0sXHJcbiAgICAgICAgICAgIHRvdXJuYW1lbnQgOiB7IHZhbHVlIDogXCJcIiB9LFxyXG4gICAgICAgICAgICBzZWFzb25zIDogW3sgdmFsdWUgOiBcIlwifV1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMucHJvcHMubGlzdGluZ0luZm8uc3BvcnRzLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgIGlucHV0UHJvcHMuc3BvcnRzLnZhbHVlID0gdGhpcy5wcm9wcy5saXN0aW5nSW5mby5zcG9ydHNbMF0ubmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzLnByb3BzLmxpc3RpbmdJbmZvLnNlYXNvbnMubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgaW5wdXRQcm9wcy5zZWFzb25zID0gW107XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMubGlzdGluZ0luZm8uc2Vhc29ucy5mb3JFYWNoKCggc2Vhc29uICk9PntcclxuICAgICAgICAgICAgICAgIGlucHV0UHJvcHMuc2Vhc29ucy5wdXNoKHt2YWx1ZTogc2Vhc29uLm5hbWV9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzLnByb3BzLmxpc3RpbmdJbmZvLnNwb3J0X2NhdGVnb3J5ICkgaW5wdXRQcm9wcy5zcG9ydF9jYXRlZ29yeS52YWx1ZSA9IHRoaXMucHJvcHMubGlzdGluZ0luZm8uc3BvcnRfY2F0ZWdvcnkubmFtZTtcclxuICAgICAgICBpZiAoIHRoaXMucHJvcHMubGlzdGluZ0luZm8udG91cm5hbWVudCApIGlucHV0UHJvcHMudG91cm5hbWVudC52YWx1ZSA9IHRoaXMucHJvcHMubGlzdGluZ0luZm8udG91cm5hbWVudC5uYW1lO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudFwiPlxyXG5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNob3dTZWFyY2ggJiYgPFNlYXJjaENvbXBldGl0aW9uIGNsb3NlPXt0aGlzLnRvZ2dsZVNlYXJjaH0gc2VsZWN0PXt0aGlzLnNlbGVjdFRvdXJuYW1lbnR9IC8+fVxyXG4gICAgICAgICAgICAgICAgeyF0aGlzLnN0YXRlLnNob3dTZWFyY2ggJiYgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVNlYXJjaH0+U2hvdyBzZWFyY2ggZnVuY3Rpb248L2J1dHRvbj59XHJcblxyXG4gICAgICAgICAgICAgICAgeyF0aGlzLnN0YXRlLnNob3dTZWFyY2ggJiYgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRlbnQtY29udGFpbmVyXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1pdGVtLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsZWFzZSBzZWxlY3QgdGhlIHNwb3J0KHMpIGFuZCBjb21wZXRpdGlvbihzKSBjb3ZlcmVkIGJ5IHlvdXIgY29udGVudCBsaXN0aW5nOlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshdGhpcy5wcm9wcy5saXN0aW5nSW5mby5uZXdTcG9ydCAmJiA8aW5wdXQgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmlucHV0UHJvcHMuc3BvcnRzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9wZW5TcG9ydFNlbGVjdG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1wiU3BvcnRcIn0gIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5saXN0aW5nSW5mby5uZXdTcG9ydCAmJiA8TmV3U3BvcnQgb25DbGljaz17dGhpcy5wcm9wcy5yZW1vdmVOZXdTcG9ydCB9IC8+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshdGhpcy5wcm9wcy5saXN0aW5nSW5mby5uZXdTcG9ydCAmJiA8aW5wdXQgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmlucHV0UHJvcHMuc3BvcnRfY2F0ZWdvcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnN0YXRlLmxvYWRpbmdDYXRlZ29yaWVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vcGVuQ2F0ZWdvcnlTZWxlY3Rvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtcIkNvdW50cnkvQ2F0ZWdvcnlcIn0gIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5saXN0aW5nSW5mby5uZXdTcG9ydCAmJiA8TmV3Q2F0ZWdvcnkgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5sb2FkaW5nQ2F0ZWdvcmllcyAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiPjwvaT59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyF0aGlzLmhhc0N1c3RvbVRvdXJuYW1lbnQoKSAmJiA8aW5wdXQgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmlucHV0UHJvcHMudG91cm5hbWVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuc3RhdGUubG9hZGluZ1RvdXJuYW1lbnRzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vcGVuVG91cm5hbWVudFNlbGVjdG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1wiVG91cm5hbWVudFwifSAgLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgKCB0aGlzLmhhc0N1c3RvbVRvdXJuYW1lbnQoKSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIDxOZXdUb3VybmFtZW50IHNob3dDbG9zZT17dGhpcy5wcm9wcy5saXN0aW5nSW5mby5uZXdUb3VybmFtZW50IHx8IHRoaXMucHJvcHMubGlzdGluZ0luZm8uY3VzdG9tX3RvdXJuYW1lbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmxpc3RpbmdJbmZvLmN1c3RvbV90b3VybmFtZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9eyAoZSkgPT4gdGhpcy51cGRhdGVDb250ZW50VmFsdWUoZSwgXCJjdXN0b21fdG91cm5hbWVudFwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5yZW1vdmVOZXdUb3VybmFtZW50fSAvPn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5sb2FkaW5nVG91cm5hbWVudHMgJiYgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIj48L2k+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7ICB0aGlzLnN0YXRlLnNlYXNvbnMubGVuZ3RoID4gMCAmJiB0aGlzLnN0YXRlLnNlYXNvblNlbGVjdG9ycy5sZW5ndGggPjAgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNlYXNvblNlbGVjdG9ycy5tYXAoIChzZWFzb24sIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxTZWFzb25TZWxlY3RvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vhc29uPXtzZWFzb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRTZWFzb249e3RoaXMuYWRkTmV3U2Vhc29ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRQcm9wcz17aW5wdXRQcm9wcy5zZWFzb25zW2ldfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVzPXt0aGlzLmdldFNjaGVkdWxlcyhpKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3RoaXMuc3RhdGUubG9hZGluZ1NlYXNvbnN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93QWRkTmV3PXt0aGlzLnN0YXRlLnNlYXNvblNlbGVjdG9ycy5sZW5ndGggPT09IGkgKyAxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlblNlbGVjdG9yPXsoKT0+dGhpcy5wcm9wcy5vcGVuU2Vhc29uU2VsZWN0b3IoaSl9Lz5cclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPERlc2NyaXB0aW9uIHZhbHVlPXt0aGlzLnByb3BzLmxpc3RpbmdJbmZvLmRlc2NyaXB0aW9ufSBvbkJsdXI9eyAoZSkgPT4gdGhpcy51cGRhdGVDb250ZW50VmFsdWUoZSwgXCJkZXNjcmlwdGlvblwiKX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8V2Vic2l0ZSB2YWx1ZT17dGhpcy5wcm9wcy5saXN0aW5nSW5mby53ZWJzaXRlfSBvbkJsdXI9eyAoZSkgPT4gdGhpcy51cGRhdGVDb250ZW50VmFsdWUoZSwgXCJ3ZWJzaXRlXCIpfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxGaWxlU2VsZWN0b3IgdGFyZ2V0PXtcImJyb2NodXJlXCJ9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsaXN0aW5nSW5mbyA6IHN0YXRlLmxpc3RpbmdJbmZvLFxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvcGVuU3BvcnRTZWxlY3RvciA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdPUEVOX1NFTEVDVE9SJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JJdGVtcyA6IENvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMsXHJcbiAgICAgICAgICAgIHBvcHVsYXJJdGVtcyA6IENvbnRlbnRBcmVuYS5EYXRhLlRvcFNwb3J0cyxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlIDogXCJzcG9ydHNcIixcclxuICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogXCJwb3B1bGFyXCIsXHJcbiAgICAgICAgICAgIG11bHRpcGxlIDogdHJ1ZSxcclxuICAgICAgICAgICAgc2hvd05ld1Nwb3J0IDogdHJ1ZSxcclxuICAgICAgICAgICAgaW5kZXggOiAwXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgb3BlbkNhdGVnb3J5U2VsZWN0b3IgOiAoKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdPUEVOX1NFTEVDVE9SJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogQ29udGVudEFyZW5hLkRhdGEuQ2F0ZWdvcmllcyxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcInNwb3J0X2NhdGVnb3J5XCIsXHJcbiAgICAgICAgICAgIGFjdGl2ZUZpbHRlciA6IFwiYWdcIlxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIG9wZW5Ub3VybmFtZW50U2VsZWN0b3IgOiAoKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdPUEVOX1NFTEVDVE9SJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogQ29udGVudEFyZW5hLkRhdGEuVG91cm5hbWVudHMsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogXCJ0b3VybmFtZW50XCIsXHJcbiAgICAgICAgICAgIGFjdGl2ZUZpbHRlciA6IFwiYWdcIixcclxuICAgICAgICAgICAgc2hvd05ld1RvdXJuYW1lbnQgOiB0cnVlXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgb3BlblNlYXNvblNlbGVjdG9yIDogKGluZGV4KSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdPUEVOX1NFTEVDVE9SJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogQ29udGVudEFyZW5hLkRhdGEuU2Vhc29ucyxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcInNlYXNvbnNcIixcclxuICAgICAgICAgICAgbXVsdGlwbGU6IHRydWUsXHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHVwZGF0ZUNvbnRlbnRWYWx1ZSA6IChrZXksIHZhbHVlKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdVUERBVEVfQ09OVEVOVF9WQUxVRScsXHJcbiAgICAgICAgICAgIGtleToga2V5LFxyXG4gICAgICAgICAgICB2YWx1ZSA6IHZhbHVlXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgcmVtb3ZlTmV3U3BvcnQgOiAoKSA9PiBkaXNwYXRjaCh7IHR5cGU6ICdSRU1PVkVfTkVXX1NQT1JUJyB9KSxcclxuICAgICAgICByZW1vdmVOZXdUb3VybmFtZW50IDogKCkgPT4gZGlzcGF0Y2goeyB0eXBlOiAnUkVNT1ZFX05FV19UT1VSTkFNRU5UJyB9KSxcclxuICAgICAgICBzZWxlY3RUb3VybmFtZW50IDogKHRvdXJuYW1lbnQpID0+IGRpc3BhdGNoKHsgdHlwZTogJ1NFTEVDVF9UT1VSTkFNRU5UJywgdG91cm5hbWVudDogdG91cm5hbWVudCB9KVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxGb3JtU3RlcDEpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb250YWluZXJzL1NlbGxGb3JtU3RlcDEuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcblxyXG5jb25zdCBTZWxsRm9ybVN0ZXAgPSAoe3N0ZXAsIGFjdGl2ZSwgdGl0bGV9KSA9PiAoXHJcbiAgICA8ZGl2ICBjbGFzc05hbWU9e1wic3RlcCBcIiArIChhY3RpdmUgJiYgXCJzdGVwLWFjdGl2ZVwiKSB9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1sYWJlbFwiPlxyXG4gICAgICAgICAgICBTdGVwIHsgc3RlcCB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLXRpdGxlXCI+XHJcbiAgICAgICAgICAgIHt0aXRsZX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtaWNvblwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5jbGFzcyBTZWxsRm9ybVN0ZXBzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHN0ZXBzOiBbXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogMSwgdGl0bGU6IFwiRXZlbnQgc2VsZWN0aW9uXCJ9LFxyXG4gICAgICAgICAgICAgICAge3N0ZXA6IDIsIHRpdGxlOiBcIkNvbmZpZ3VyZSByaWdodHNcIn0sXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogMywgdGl0bGU6IFwiRGlzdHJpYnV0aW9uIHN0eWxlXCJ9LFxyXG4gICAgICAgICAgICAgICAge3N0ZXA6IDQsIHRpdGxlOiBcIlByaWNlLCBwYXltZW50IGFuZCBsaXN0aW5nIGRldGFpbHNcIn0sXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogNSwgdGl0bGU6IFwiQ29uZmlybVwifVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5zdGVwcy5tYXAoKHN0ZXAsIGkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxTZWxsRm9ybVN0ZXAga2V5PXtpfSBzdGVwPXtzdGVwLnN0ZXB9IHRpdGxlPXtzdGVwLnRpdGxlfSBhY3RpdmU9e190aGlzLnByb3BzLnN0ZXAgPT09IHN0ZXAuc3RlcH0vPlxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RlcCA6IHN0YXRlLmxpc3RpbmdJbmZvLnN0ZXAsXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxGb3JtU3RlcHMpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb250YWluZXJzL1NlbGxGb3JtU3RlcHMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4uL3N0b3JlJztcclxuXHJcbmNsYXNzIFNlbGxCdXR0b25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIGxhc3RTdGVwIDogcHJvcHMubGFzdFN0ZXAgfHwgNSxcclxuICAgICAgICAgICAgc2F2aW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNhdmluZ1N1Y2Nlc3M6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQXNEcmFmdCA9ICgpID0+IHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLnNldFN0YXRlKHsgc2F2aW5nIDogdHJ1ZSB9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5zYXZlQ29udGVudEFzRHJhZnQoc3RvcmUuZ2V0U3RhdGUoKS5saXN0aW5nSW5mbykuZG9uZShmdW5jdGlvbiAoIHJlc3BvbnNlICkge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IHNhdmluZyA6IGZhbHNlLCBzYXZpbmdTdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IHNhdmluZyA6IGZhbHNlLCBzYXZpbmdTdWNjZXNzOiBmYWxzZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBsZXQgc2F2ZUFzRHJhZnRUZXh0ID0gKHRoaXMuc3RhdGUuc2F2aW5nKSA/IFwiU2F2aW5nLi5cIiA6ICh0aGlzLnN0YXRlLnNhdmluZ1N1Y2Nlc3MpID8gXCJTYXZlZCBhcyBEcmFmdFwiIDogXCJTYXZlIGFzIERyYWZ0XCI7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnV0dG9ucy1jb250YWluZXJcIiA+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3RlcCAhPT0gMSAmJlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInByZXZpb3VzLXN0ZXBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdGFuZGFyZC1idXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5wcm9wcy5nb1RvUHJldmlvdXNTdGVwIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYXJyb3ctbGVmdFwiPjwvaT4gQmFja1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+IH1cclxuXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvblwiIG9uQ2xpY2s9eyB0aGlzLnNhdmVBc0RyYWZ0IH0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuc2F2aW5nfT5cclxuICAgICAgICAgICAgICAgICAgICB7IHNhdmVBc0RyYWZ0VGV4dCB9eyB0aGlzLnN0YXRlLnNhdmluZyAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiPjwvaT59XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3RlcCA9PT0gdGhpcy5zdGF0ZS5sYXN0U3RlcCAmJlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImRyYWZ0LWxpc3RpbmdcIiBjbGFzc05hbWU9XCJzdGFuZGFyZC1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICBTdWJtaXQgTGlzdGluZ1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+IH1cclxuXHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3RlcCAhPT0gdGhpcy5zdGF0ZS5sYXN0U3RlcCAmJlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cIm5leHQtc3RlcFwiIGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvblwiIG9uQ2xpY2s9eyAoKSA9PiB0aGlzLnByb3BzLmdvVG9OZXh0U3RlcCgpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgTmV4dCA8aSBjbGFzc05hbWU9XCJmYSBmYS1hcnJvdy1yaWdodFwiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPiB9XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0ZXAgOiBzdGF0ZS5saXN0aW5nSW5mby5zdGVwXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdvVG9OZXh0U3RlcCA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdHT19UT19ORVhUX1NURVAnXHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAgIGdvVG9QcmV2aW91c1N0ZXAgOiAoKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnR09fVE9fUFJFVklPVVNfU1RFUCdcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxCdXR0b25zKVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvYnV0dG9ucy5qcyIsImNvbnN0IGNvbnRlbnQgPSAoc3RhdGUgPSB7XHJcbiAgICBsaXN0aW5nSW5mbyA6IHtcclxuICAgICAgICBzdGVwOiAxLFxyXG4gICAgICAgIHJpZ2h0c19wYWNrYWdlIDogW10sXHJcbiAgICAgICAgY2F0ZWdvcnkgOiBudWxsLFxyXG4gICAgICAgIHNwb3J0cyA6IFtdLFxyXG4gICAgICAgIHNlYXNvbnM6IFtdXHJcbiAgICB9LFxyXG5cclxuICAgIHNlbGVjdG9ySW5mbyA6IHtcclxuICAgICAgICB0eXBlOiBcInNwb3J0XCIsXHJcbiAgICAgICAgb3BlbiA6IGZhbHNlLFxyXG4gICAgICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxyXG4gICAgICAgIHBvcHVsYXJJdGVtczogW11cclxuICAgIH0sXHJcblxyXG59LCBhY3Rpb24pID0+IHtcclxuXHJcbiAgICBsZXQgbGlzdGluZ0luZm8gPSB7fTtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnQ09OVEVOVF9JTklUJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBsaXN0aW5nSW5mbzogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubGlzdGluZ0luZm8sYWN0aW9uLmNvbnRlbnQpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgJ0dPX1RPX05FWFRfU1RFUCc6XHJcblxyXG4gICAgICAgICAgICBsaXN0aW5nSW5mbyA9IHtcclxuICAgICAgICAgICAgICAgIHN0ZXA6IHN0YXRlLmxpc3RpbmdJbmZvLnN0ZXAgKyAxXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGxpc3RpbmdJbmZvOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5saXN0aW5nSW5mbywgbGlzdGluZ0luZm8pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgJ0dPX1RPX1BSRVZJT1VTX1NURVAnOlxyXG4gICAgICAgICAgICBsaXN0aW5nSW5mbyA9IHtcclxuICAgICAgICAgICAgICAgIHN0ZXA6IHN0YXRlLmxpc3RpbmdJbmZvLnN0ZXAgLTFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBsaXN0aW5nSW5mbzogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubGlzdGluZ0luZm8sIGxpc3RpbmdJbmZvKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2FzZSAnQUREX05FV19TUE9SVCc6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBsaXN0aW5nSW5mbzogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubGlzdGluZ0luZm8seyBuZXdTcG9ydDogdHJ1ZSB9KSB9KTtcclxuXHJcbiAgICAgICAgY2FzZSAnUkVNT1ZFX05FV19TUE9SVCc6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBsaXN0aW5nSW5mbzogT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUubGlzdGluZ0luZm8seyBuZXdTcG9ydDogZmFsc2UgfSkgfSk7XHJcblxyXG4gICAgICAgIGNhc2UgJ0FERF9ORVdfVE9VUk5BTUVOVCc6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2xpc3RpbmdJbmZvOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5saXN0aW5nSW5mbyx7XHJcbiAgICAgICAgICAgICAgICBuZXdUb3VybmFtZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdG91cm5hbWVudCA6IG51bGxcclxuICAgICAgICAgICAgfSkgfSk7XHJcblxyXG4gICAgICAgIGNhc2UgJ1JFTU9WRV9ORVdfVE9VUk5BTUVOVCc6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2xpc3RpbmdJbmZvOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5saXN0aW5nSW5mbyx7XHJcbiAgICAgICAgICAgICAgICBuZXdUb3VybmFtZW50OiBmYWxzZSwgY3VzdG9tX3RvdXJuYW1lbnQ6IG51bGxcclxuICAgICAgICAgICAgfSkgfSk7XHJcblxyXG4gICAgICAgIGNhc2UgJ1VQREFURV9DT05URU5UX1ZBTFVFJzpcclxuICAgICAgICAgICAgbGlzdGluZ0luZm8gPSB7fTtcclxuICAgICAgICAgICAgbGlzdGluZ0luZm9bYWN0aW9uLmtleV0gPSBhY3Rpb24udmFsdWU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGxpc3RpbmdJbmZvOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5saXN0aW5nSW5mbywgbGlzdGluZ0luZm8pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYXNlICdTRUxFQ1RfVE9VUk5BTUVOVCc6XHJcbiAgICAgICAgICAgIGxpc3RpbmdJbmZvID0ge307XHJcbiAgICAgICAgICAgIGxpc3RpbmdJbmZvLnRvdXJuYW1lbnQgPSBhY3Rpb24udG91cm5hbWVudDtcclxuICAgICAgICAgICAgbGlzdGluZ0luZm8uc3BvcnRzID0gKGFjdGlvbi50b3VybmFtZW50LnNwb3J0ICkgPyBbYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnRdIDogW107XHJcbiAgICAgICAgICAgIGxpc3RpbmdJbmZvLnNwb3J0X2NhdGVnb3J5ID0gYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnRDYXRlZ29yeTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgbGlzdGluZ0luZm86IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmxpc3RpbmdJbmZvLCBsaXN0aW5nSW5mbylcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhc2UgJ09QRU5fU0VMRUNUT1InOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogYWN0aW9uLnNlbGVjdG9yVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBvcGVuIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBhY3Rpb24uc2VsZWN0b3JJdGVtcyxcclxuICAgICAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IGFjdGlvbi5wb3B1bGFySXRlbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogYWN0aW9uLmFjdGl2ZUZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZSA6IGFjdGlvbi5tdWx0aXBsZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93TmV3U3BvcnQgOiBhY3Rpb24uc2hvd05ld1Nwb3J0LFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4IDogYWN0aW9uLmluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dOZXdUb3VybmFtZW50IDogYWN0aW9uLnNob3dOZXdUb3VybmFtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkIDogc3RhdGUubGlzdGluZ0luZm9bYWN0aW9uLnNlbGVjdG9yVHlwZV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSAnQ0xPU0VfU0VMRUNUT1InOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBvcGVuIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgcG9wdWxhckl0ZW1zOiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2FzZSAnQVBQTFlfU0VMRUNUSU9OJzpcclxuXHJcbiAgICAgICAgICAgIGxpc3RpbmdJbmZvID0ge307XHJcbiAgICAgICAgICAgIGxpc3RpbmdJbmZvW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gKGFjdGlvbi5tdWx0aXBsZSApID8gW2FjdGlvbi5zZWxlY3RlZEl0ZW1dIDogYWN0aW9uLnNlbGVjdGVkSXRlbTtcclxuXHJcbiAgICAgICAgICAgIGlmICggYWN0aW9uLm11bHRpcGxlICl7XHJcbiAgICAgICAgICAgICAgICBsaXN0aW5nSW5mb1thY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZS5saXN0aW5nSW5mb1thY3Rpb24uc2VsZWN0b3JUeXBlXSwgYWN0aW9uLnNlbGVjdGVkSXRlbV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0aW5nSW5mb1thY3Rpb24uc2VsZWN0b3JUeXBlXSA9IGFjdGlvbi5zZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGxpc3RpbmdJbmZvOiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5saXN0aW5nSW5mbywgbGlzdGluZ0luZm8pLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW4gOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYXNlICdTVVBFUl9SSUdIVFNfVVBEQVRFRCc6XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHJpZ2h0c19wYWNrYWdlID0gc3RhdGUubGlzdGluZ0luZm8ucmlnaHRzX3BhY2thZ2U7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IENvbnRlbnRBcmVuYS5VdGlscy5nZXRJbmRleChhY3Rpb24ucmlnaHRzX3BhY2thZ2UuaWQsIHJpZ2h0c19wYWNrYWdlLCBcImlkXCIpO1xyXG4gICAgICAgICAgICBpZiAoICBpbmRleCA9PT0gLTEgKXtcclxuICAgICAgICAgICAgICAgIHJpZ2h0c19wYWNrYWdlLnB1c2goYWN0aW9uLnJpZ2h0c19wYWNrYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmlnaHRzX3BhY2thZ2Uuc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaXN0aW5nSW5mby5yaWdodHNfcGFja2FnZSA9IHJpZ2h0c19wYWNrYWdlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBsaXN0aW5nSW5mbyA6IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmxpc3RpbmdJbmZvLCBsaXN0aW5nSW5mbylcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGVudFxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL2NvbnRlbnQuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCBTZWxsRm9ybSBmcm9tIFwiLi9jb21wb25lbnRzL1NlbGxGb3JtXCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcclxuXHJcbmNvbnN0IHNlbGxGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGwtZm9ybS1jb250YWluZXInKTtcclxuXHJcblJlYWN0RE9NLnJlbmRlcihcclxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgICAgIDxTZWxsRm9ybSB7Li4uc2VsbEZvcm0uZGF0YXNldCB9IC8+XHJcbiAgICA8L1Byb3ZpZGVyPixcclxuICAgIHNlbGxGb3JtXHJcbik7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgYWxsIHRoZSB0b29sdGlwc1xyXG4gICAgICovXHJcbiAgICAkKCBkb2N1bWVudCApLnRvb2x0aXAoKTtcclxuXHJcbiAgICAkKFwiLmhhcy1kYXRlcGlja2VyXCIpLmRhdGVwaWNrZXIoKTtcclxuXHJcbiAgICAkKFwiaW5wdXRcIikub24oJ2ZvY3VzJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaW52YWxpZFwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIub3B0aW9uYWxcIikuaGlkZSgpO1xyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3NlbGwuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB3aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbCA9IENvbnRlbnRBcmVuYS5Nb2RlbCB8fCB7fTtcclxuICAgIENvbnRlbnRBcmVuYS5Gb3JtID0gQ29udGVudEFyZW5hLkZvcm0gfHwge307XHJcbiAgICBDb250ZW50QXJlbmEuVGVzdCA9IENvbnRlbnRBcmVuYS5UZXN0IHx8IHt9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Gb3JtLmFkZEN1c3RvbVNlYXNvbiA9IGZ1bmN0aW9uKCBpZCwgY29udGFpbmVyU2VsZWN0b3IgKXtcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gJChjb250YWluZXJTZWxlY3RvciB8fCBcIiNldmVudC1zY2hlZHVsZS1zdWJpdGVtc1wiKSxcclxuICAgICAgICAgICAgc2Vhc29uTnVtYmVyID0gJChcIi5jdXN0b20tc2Vhc29uLWNvbnRhaW5lclwiLCBjb250YWluZXIpLmxlbmd0aCArIDEsXHJcbiAgICAgICAgICAgIHNvdXJjZSA9ICQoXCIjZXZlbnQtc2Vhc29uLXNlbGVjdG9yXCIpLmF1dG9jb21wbGV0ZSggXCJvcHRpb25cIiwgXCJzb3VyY2VcIiApLFxyXG4gICAgICAgICAgICBoYXNTZWFzb24gPSBzb3VyY2UubGVuZ3RoID4gMCxcclxuICAgICAgICAgICAgbGFiZWxzID0gKGhhc1NlYXNvbikgPyBzb3VyY2VbMF0ubGFiZWwuc3BsaXQoXCIgXCIpIDogW10sXHJcbiAgICAgICAgICAgIHNlYXNvblllYXIgPSAoaGFzU2Vhc29uKSA/IGxhYmVscy5wb3AoKSA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAsXHJcbiAgICAgICAgICAgIHN0YXJ0WWVhciA9IChoYXNTZWFzb24pID8gKCBzZWFzb25ZZWFyLnNlYXJjaChcIi9cIikgIT09IC0xICkgPyBOdW1iZXIoc2Vhc29uWWVhci5zcGxpdChcIi9cIilbMF0pICsgc2Vhc29uTnVtYmVyIDogTnVtYmVyKHNlYXNvblllYXIpICsgc2Vhc29uTnVtYmVyIDogc2Vhc29uWWVhciAsXHJcbiAgICAgICAgICAgIGVuZFllYXIgPSAoaGFzU2Vhc29uKSA/ICggc2Vhc29uWWVhci5zZWFyY2goXCIvXCIpICE9PSAtMSApID8gTnVtYmVyKHNlYXNvblllYXIuc3BsaXQoXCIvXCIpWzFdKSArIHNlYXNvbk51bWJlciA6IG51bGwgOiBzZWFzb25ZZWFyICxcclxuICAgICAgICAgICAgc2Vhc29uTmFtZSA9IChoYXNTZWFzb24pID8gbGFiZWxzLmpvaW4oXCIgXCIpIDogXCJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSAkLnRlbXBsYXRlcyhcIiNzZWFzb24tdGVtcGxhdGVcIiksXHJcbiAgICAgICAgICAgIHNlYXNvbkRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IHNlYXNvbk51bWJlcixcclxuICAgICAgICAgICAgICAgIG5hbWUgOiBzZWFzb25OYW1lLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRZZWFyOiBzdGFydFllYXIsXHJcbiAgICAgICAgICAgICAgICBlbmRZZWFyOiBlbmRZZWFyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlYXNvbkVsZW1lbnQgPSAkKHRlbXBsYXRlLnJlbmRlcihzZWFzb25EYXRhKSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoIHNlYXNvbkVsZW1lbnQgKTtcclxuXHJcbiAgICAgICAgJChcIi5yZW1vdmUtc2Vhc29uXCIsIHNlYXNvbkVsZW1lbnQgKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2Vhc29uRWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBDb250ZW50QXJlbmEuQ29udGVudCA9IG5ldyBDb250ZW50QXJlbmEuTW9kZWwuQ29udGVudCgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEN1c3RvbUZuKCBlbCwgcGxhY2Vob2xkZXIgKXtcclxuICAgICAgICAkKGVsKVxyXG4gICAgICAgICAgICAub2ZmKClcclxuICAgICAgICAgICAgLnZhbChcIlwiKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoXCJjdXN0b20taW5wdXRcIilcclxuICAgICAgICAgICAgLnNob3coKVxyXG4gICAgICAgICAgICAuYXR0cihcInBsYWNlaG9sZGVyXCIsIHBsYWNlaG9sZGVyKTtcclxuXHJcbiAgICAgICAgaWYgKCAkKGVsKS5kYXRhKCd1aS1hdXRvY29tcGxldGUnKSAhPT0gdW5kZWZpbmVkICkgJChlbCkuYXV0b2NvbXBsZXRlKCdkZXN0cm95Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ3VzdG9tVGVtcGxhdGUoIHNwb3J0LCBjYXRlZ29yeSwgdG91cm5hbWVudCl7XHJcblxyXG4gICAgICAgIGlmICggc3BvcnQgKSBhZGRDdXN0b21GbihcIiNldmVudC1zcG9ydC1zZWxlY3RvclwiLCBcIkVudGVyIHNwb3J0IG5hbWVcIik7XHJcblxyXG4gICAgICAgIGlmICggQ29udGVudEFyZW5hLkNvbnRlbnQuZXZlbnRUeXBlID09PSBcImN1c3RvbVwiICkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIGNhdGVnb3J5ICkgYWRkQ3VzdG9tRm4oXCIjZXZlbnQtY2F0ZWdvcnktc2VsZWN0b3JcIiwgXCJFbnRlciBDb3VudHJ5L0NhdGVnb3J5XCIpO1xyXG4gICAgICAgIGlmICggdG91cm5hbWVudCApIGFkZEN1c3RvbUZuKFwiI2V2ZW50LXRvdXJuYW1lbnQtc2VsZWN0b3JcIiwgXCJFbnRlciBUb3VybmFtZW50XCIpO1xyXG4gICAgICAgIC8qYWRkQ3VzdG9tRm4oXCIjZXZlbnQtc2Vhc29uLXNlbGVjdG9yXCIsIFwiRW50ZXIgU2Vhc29uXCIpO1xyXG4gICAgICAgICQoXCIjZXZlbnQtc2NoZWR1bGUtc3ViaXRlbXNcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAkKFwiLmN1c3RvbS10ZW1wbGF0ZS1pdGVtXCIpLnNob3coKTtcclxuICAgICAgICAkKFwiLmN1c3RvbS10ZW1wbGF0ZS1pdGVtXCIpLmNoaWxkcmVuKCkuc2hvdygpOyovXHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Gb3JtLmFkZEN1c3RvbVNlYXNvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFNwb3J0TGF5ZXIoKXtcclxuXHJcbiAgICAgICAgdmFyIHNwb3J0U2VsZWN0b3IgPSAkKFwiLnNwb3J0LXNlbGVjdG9yXCIpLFxyXG4gICAgICAgICAgICBleHRyYVNwb3J0cyA9IHNwb3J0U2VsZWN0b3IubGVuZ3RoLFxyXG4gICAgICAgICAgICBpZCA9IFwic3BvcnQtc2VsZWN0b3ItXCIgKyAoZXh0cmFTcG9ydHMgKyAxKSxcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSAkLnRlbXBsYXRlcyhcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz1cXFwic3RlcDEtZXZlbnQtaXRlbVxcXCI+XFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCIgICA8aSBjbGFzcz1cXFwiZmEgZmEtY29nIGZhLXNwaW5cXFwiPjwvaT5cXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIiAgICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJTcG9ydFxcXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIiAgICAgICAgICBpZD1cXFwie3s6aWR9fVxcXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIiAgICAgICAgICBjbGFzcz1cXFwiY29udGVudC1pbnB1dCBzcG9ydC1zZWxlY3RvclxcXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIiAgICAgICAgICByZXF1aXJlZC8+IFwiICtcclxuICAgICAgICAgICAgICAgIFwiPGJ1dHRvbiBjbGFzcz1cXFwicmVtb3ZlLWJ1dHRvblxcXCI+UmVtb3ZlPC9idXR0b24+XFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8L2Rpdj5cIiksXHJcbiAgICAgICAgICAgIGh0bWxPdXRwdXQgPSB0ZW1wbGF0ZS5yZW5kZXIoe2lkOiBpZCB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoZXh0cmFTcG9ydHM9PT0wKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZnRlcihodG1sT3V0cHV0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzcG9ydFNlbGVjdG9yLmxhc3QoKS5wYXJlbnQoKS5hZnRlcihodG1sT3V0cHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjXCIraWQpLnBhcmVudCgpLmZpbmQoJ2J1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHNwb3J0U2VsZWN0b3IubGVuZ3RoID09PSAwKXtcclxuICAgICAgICAgICAgICAgICQoXCIjZXZlbnQtdG91cm5hbWVudC1zZWxlY3RvciwgI2V2ZW50LXNlYXNvbi1zZWxlY3RvclwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5ldmVudFR5cGUgPSBcImRhdGFiYXNlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIiNldmVudC1jYXRlZ29yeS1zZWxlY3RvciwgI2V2ZW50LXRvdXJuYW1lbnQtc2VsZWN0b3IsICNldmVudC1zZWFzb24tc2VsZWN0b3JcIikuaGlkZSgpO1xyXG4gICAgICAgIHJlc2V0U2VsZWN0b3IoW1wiY2F0ZWdvcnlcIiwgXCJ0b3VybmFtZW50XCIsIFwic2Vhc29uXCJdKTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuZXZlbnRUeXBlID0gXCJjdXN0b21cIjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkR2VuZXJpY0VwaXNvZGVzKCBxdWFudGl0eSApe1xyXG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9ICQudGVtcGxhdGVzKFwiI2VwaXNvZGUtdGVtcGxhdGVcIiksXHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9ICQoXCIjY29udGVudC1kZXRhaWxzLW1hc2tcIiksXHJcbiAgICAgICAgICAgIGN1cnJlbnRRdWFudGl0eSA9IGNvbnRhaW5lci5jaGlsZHJlbigpLmxlbmd0aCxcclxuICAgICAgICAgICAgc3RhcnQgPSAwO1xyXG5cclxuICAgICAgICBpZiAoIGN1cnJlbnRRdWFudGl0eSA+IHF1YW50aXR5ICkgY29udGFpbmVyLmVtcHR5KCk7XHJcblxyXG4gICAgICAgIGlmICggY3VycmVudFF1YW50aXR5IDwgcXVhbnRpdHkgKSBzdGFydCA9IGN1cnJlbnRRdWFudGl0eTtcclxuXHJcbiAgICAgICAgZm9yKCB2YXIgaSA9IHN0YXJ0OyBpIDwgcXVhbnRpdHk7IGkrKyl7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQodGVtcGxhdGUucmVuZGVyKHtpZDogaSArIDEgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5lcGlzb2RlLWF2YWlsYWJpbGl0eS1kYXRlOm5vdCguaGFzRGF0ZXBpY2tlcilcIiwgY29udGFpbmVyICkuZGF0ZXBpY2tlcigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3VycmVudCA6IFwiICsgY3VycmVudFF1YW50aXR5LCBcIkdvYWw6IFwiICsgcXVhbnRpdHksIFwiU3RhcnQ6IFwiICsgc3RhcnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0U2VsZWN0b3Ioc2VsZWN0b3JzKXtcclxuICAgICAgICBzZWxlY3RvcnMuZm9yRWFjaCggKHNlbGVjdG9yKSA9PiAkKFwiI2V2ZW50LVwiK3NlbGVjdG9yK1wiLXNlbGVjdG9yXCIpLnZhbChcIlwiKS5hdHRyKCdleHRlcm5hbElkJywgbnVsbCkpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYWRkLXNwb3J0LWxheWVyXCIpLm9uKFwiY2xpY2tcIiwgYWRkU3BvcnRMYXllcik7XHJcblxyXG4gICAgJChcIiNldmVudC1jdXN0b21FbmQtc2VsZWN0b3IsICNldmVudC1jdXN0b21TdGFydC1zZWxlY3RvciwgI2V2ZW50LWF2YWlsYWJpbGl0eS1zZWxlY3RvciwgI2V4cGlyYXRpb24tZGF0ZSwgLmluc3RhbGxtZW50LWRhdGVcIikuZGF0ZXBpY2tlcigpO1xyXG5cclxuICAgICQoJyNsaWNlbnNlLWZpbGUtc2VsZWN0b3ItaGlkZGVuJykuY2hlY2tGaWxlVHlwZSh7XHJcbiAgICAgICAgYWxsb3dlZEV4dGVuc2lvbnM6IFsgJ3BkZicsICdkb2MnLCAnZG9jeCddLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkKCc8ZGl2IC8+JykuaHRtbCgnRmlsZSB0eXBlIG5vdCBhbGxvd2VkLiBQbGVhc2UgdXBsb2FkIGEgLnBkZiwgLmRvYyBvciAuZG9jeCBmaWxlJykuZGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2V2ZW50LWZpbGUtc2VsZWN0b3ItaGlkZGVuJykuY2hlY2tGaWxlVHlwZSh7XHJcbiAgICAgICAgYWxsb3dlZEV4dGVuc2lvbnM6IFsnanBnJywgJ2pwZWcnLCdwbmcnLCAncGRmJywgJ2RvYycsICdkb2N4J10sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRJZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKFwicmVmXCIpO1xyXG4gICAgICAgICAgICAkKCB0YXJnZXRJZCApLnZhbCgkKHRoaXMpLnZhbCgpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldElkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoXCJyZWZcIik7XHJcbiAgICAgICAgICAgICQoIHRhcmdldElkICkuYXR0cihcInBsYWNlaG9sZGVyXCIsIFwiQWxsb3dlZDogLnBuZywgLmpwZywgLnBkZiwgLmRvYywgLmRvY3hcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgJCgnPGRpdiAvPicpLmh0bWwoJ0ZpbGUgdHlwZSBub3QgYWxsb3dlZCcpLmRpYWxvZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNpbWFnZS1zZWxlY3Rvci1oaWRkZW4nKS5jaGVja0ZpbGVUeXBlKHtcclxuICAgICAgICBhbGxvd2VkRXh0ZW5zaW9uczogWydqcGcnLCAnanBlZycsJ3BuZyddLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0SWQgPSBcIiNcIiArICQodGhpcykuYXR0cihcInJlZlwiKTtcclxuICAgICAgICAgICAgJCggdGFyZ2V0SWQgKS52YWwoJCh0aGlzKS52YWwoKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRJZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKFwicmVmXCIpO1xyXG4gICAgICAgICAgICAkKCB0YXJnZXRJZCApLmF0dHIoXCJwbGFjZWhvbGRlclwiLCBcIkFsbG93ZWQ6IC5wbmcsIC5qcGdcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgJCgnPGRpdiAvPicpLmh0bWwoJ0ZpbGUgdHlwZSBub3QgYWxsb3dlZCcpLmRpYWxvZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2hhbmdlXCIsIFwiLnVuc2VsZWN0LW90aGVyc1wiLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmVhY2goJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5zaWJsaW5ncygpLCBmdW5jdGlvbiAoaywgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAkKGl0ZW0pLmZpbmQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgaWYgKCBfdGhpcyAhPT0gaXRlbSApIHtcclxuICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2hhbmdlXCIsIFwiLnNlbGVjdC1hbGxcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5lYWNoKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuc2libGluZ3MoKSwgZnVuY3Rpb24gKGssIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlucHV0ID0gJChpdGVtKS5maW5kKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIik7XHJcbiAgICAgICAgICAgIGlmICggX3RoaXMgPT09IGl0ZW0gKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAoIF90aGlzLmNoZWNrZWQgKXtcclxuICAgICAgICAgICAgICAgIGlucHV0LnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjaGFuZ2VcIiwgXCIudG9nZ2xlci1jaGVja2JveFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBjb250ZXh0ID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKTtcclxuXHJcbiAgICAgICAgJCggJCh0aGlzKS5hdHRyKFwiaGlkZVwiKSArIFwiLCAub3B0aW9uYWxcIiwgY29udGV4dCApLmhpZGUoKS5maW5kKFwiaW5wdXRcIikudmFsKFwiXCIpO1xyXG5cclxuICAgICAgICAkKFwiaW5wdXQ6Y2hlY2tlZFwiLCBjb250ZXh0KS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdG9yU2hvdyA9ICQodGhpcykuYXR0cihcInNob3dcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuYXBwZW5kKCQoIHNlbGVjdG9yU2hvdywgY29udGV4dCApLnNob3coKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jbG9zZS1ib3hcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoICQodGhpcykuYXR0cihcInJlZlwiKSApLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjaGFuZ2VcIixcIi51bnNlbGVjdC1hbGxcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAkLmVhY2goJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5zaWJsaW5ncygpLCBmdW5jdGlvbiAoaywgaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoICQoaXRlbSkuaGFzQ2xhc3MoJ2FsbC10eXBlJykgKSAkKGl0ZW0pLmZpbmQoXCJpbnB1dFwiKS5hdHRyKFwiY2hlY2tlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNjb250ZW50LWRldGFpbHMtbWV0aG9kLW1hc2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsID0gJChcIiNlcGlzb2Rlcy1xdWFudGl0eVwiKSxcclxuICAgICAgICAgICAgcXVhbnRpdHkgPSBOdW1iZXIoIGVsLnZhbCgpICk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tlZCl7XHJcbiAgICAgICAgICAgIGlmICggcXVhbnRpdHkgIT09IFwiXCIgKSBhZGRHZW5lcmljRXBpc29kZXMocXVhbnRpdHkpO1xyXG4gICAgICAgICAgICBlbC5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1F1YW50aXR5ID0gTnVtYmVyKCAgJCh0aGlzKS52YWwoKSApO1xyXG4gICAgICAgICAgICAgICAgYWRkR2VuZXJpY0VwaXNvZGVzKG5ld1F1YW50aXR5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsLm9mZigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFwiLmVwaXNvZGUtYXZhaWxhYmlsaXR5XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImVwaXNvZGUtYXZhaWxhYmlsaXR5LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJlcGlzb2RlLWF2YWlsYWJpbGl0eS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBcIiNkb3dubG9hZC1jc3Ytc2hlZXRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gZW52aG9zdHVybCArIFwiYnVuZGxlcy9hcHAvZGF0YS9jb250ZW50LWRldGFpbHMuY3N2XCI7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcud2Vic2l0ZScpLm1hc2soXCJBXCIsIHtcclxuICAgICAgICB0cmFuc2xhdGlvbjoge1xyXG4gICAgICAgICAgICBcIkFcIjogeyBwYXR0ZXJuOiAvW1xcdy9cXC0uK10vLCByZWN1cnNpdmU6IHRydWUgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvc2VsbC5zdGVwMS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5UZXN0ID0gQ29udGVudEFyZW5hLlRlc3QgfHwge307XHJcblxyXG4gICAgdmFyIHNlbGVjdG9yQ291bnRlciA9IDAsXHJcbiAgICAgICAgbWFpblBhY2thZ2UgPSBudWxsO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkRnVsbFBhY2thZ2VzKCkge1xyXG4gICAgICAgIHZhciBsaXN0ID0gW107XHJcblxyXG4gICAgICAgICQoXCIucGFja2FnZS1zZWxlY3RvcjpjaGVja2VkXCIpLmVhY2goZnVuY3Rpb24oayx2KXtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYWNrID0ge1xyXG4gICAgICAgICAgICAgICAgaWQgOiAkKHYpLmF0dHIoXCJpZFwiKS5zcGxpdChcIi1cIilbMV0sXHJcbiAgICAgICAgICAgICAgICBuYW1lIDogJCh2KS5hdHRyKFwibmFtZVwiKS5zcGxpdChcIi1cIilbMV1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxpc3QucHVzaChwYWNrKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXMoKSB7XHJcbiAgICAgICAgdmFyIHJlc3BvbnNlID0ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZCA6IHt9LFxyXG4gICAgICAgICAgICBzZWxlY3RlZElkcyA6IFtdLFxyXG4gICAgICAgICAgICBzZWxlY3RlZE5hbWVzIDogW11cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkKFwiLnBhY2thZ2Utc2VsZWN0b3I6Y2hlY2tlZFwiKS5lYWNoKGZ1bmN0aW9uKGssdil7XHJcblxyXG4gICAgICAgICAgICB2YXIgaWQgPSAkKHYpLmF0dHIoXCJpZFwiKS5zcGxpdChcIi1cIilbMV0sXHJcbiAgICAgICAgICAgICAgICBuYW1lID0gJCh2KS5hdHRyKFwibmFtZVwiKS5zcGxpdChcIi1cIilbMV07XHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5zZWxlY3RlZFtpZF0gPSB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IGlkLFxyXG4gICAgICAgICAgICAgICAgbmFtZSA6IG5hbWVcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlc3BvbnNlLnNlbGVjdGVkSWRzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICByZXNwb25zZS5zZWxlY3RlZE5hbWVzLnB1c2gobmFtZSlcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJlc3BvbnNlLmdldElkQnlOYW1lID0gZnVuY3Rpb24oIG5hbWUgKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJZHNbdGhpcy5zZWxlY3RlZE5hbWVzLmluZGV4T2YobmFtZSldXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMgKGNvbnRhaW5lcil7XHJcblxyXG4gICAgICAgIHZhciBsaXN0ID0gW107XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5maW5kKFwiaW5wdXQ6Y2hlY2tlZCwgLm5vdC1vcHRpb25hbFwiKS5lYWNoKGZ1bmN0aW9uIChrLCBlbCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5pcyhcIjp2aXNpYmxlXCIpICkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoICQoZWwpLmF0dHIoXCJhbGxcIikgIT09IHVuZGVmaW5lZCAgKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFJpZ2h0ID0gbmV3IENvbnRlbnRBcmVuYS5Nb2RlbC5TZWxlY3RlZFJpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICBzZWxlY3RlZFJpZ2h0LnJpZ2h0ID0gJChlbCkuYXR0cihcInJpZ2h0LWlkXCIpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFJpZ2h0LnJpZ2h0SXRlbSA9ICQoZWwpLmF0dHIoXCJyaWdodC1pdGVtLWlkXCIpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFJpZ2h0Lmdyb3VwID0gJChlbCkuZGF0YShcImdyb3VwXCIpO1xyXG5cclxuICAgICAgICAgICAgJChlbCkucGFyZW50KCkucGFyZW50KCkuZmluZChcImlucHV0Om5vdChbdHlwZT0nY2hlY2tib3gnXSk6bm90KC5jaG9zZW4tc2VhcmNoLWlucHV0KSwgdGV4dGFyZWEsIHNlbGVjdFwiKS5lYWNoKGZ1bmN0aW9uIChrZXksIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUmlnaHQuaW5wdXRzLnB1c2goICQoZWxlbWVudCkudmFsKCkgKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsaXN0LnB1c2goc2VsZWN0ZWRSaWdodCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb2xsZWN0U2VsZWN0ZWRSaWdodHMoKXtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRSaWdodHM9IFtdLFxyXG4gICAgICAgICAgICBzZWxlY3RlZFBhY2thZ2VzID0gZ2V0U2VsZWN0ZWRGdWxsUGFja2FnZXMoKSxcclxuICAgICAgICAgICAgbXVsdGlwbGUgPSAkKFwiI21haW4tbXVsdGlwbGUtcGFja2FnZVwiKSxcclxuICAgICAgICAgICAgc2luZ2xlID0gJChcIiNtYWluLXNpbmdsZS1wYWNrYWdlXCIpO1xyXG5cclxuICAgICAgICBpZiAoIG11bHRpcGxlLmlzKFwiOnZpc2libGVcIikgKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRSaWdodHMgPSBzZWxlY3RlZFJpZ2h0cy5jb25jYXQoIGNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMobXVsdGlwbGUpICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHNpbmdsZS5pcyhcIjp2aXNpYmxlXCIpICl7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmlnaHRzID0gc2VsZWN0ZWRSaWdodHMuY29uY2F0KCBjb2xsZWN0U2VsZWN0ZWRSaWdodEl0ZW1zKHNpbmdsZSkgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggc2VsZWN0ZWRQYWNrYWdlcy5sZW5ndGggPiAxICl7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUGFja2FnZXMuZm9yRWFjaChmdW5jdGlvbiAocGFjaykge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSaWdodHMgPSBzZWxlY3RlZFJpZ2h0cy5jb25jYXQoIGNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMoICQoXCIjc2VsbC1ib3gtcGFja2FnZS1cIiArIHBhY2suaWQgKSkgKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIucHJvZHVjdGlvbi1zdGFuZGFyZHM6dmlzaWJsZVwiKS5lYWNoKGZ1bmN0aW9uKGssIGVsKXtcclxuICAgICAgICAgICAgc2VsZWN0ZWRSaWdodHMgPSBzZWxlY3RlZFJpZ2h0cy5jb25jYXQoIGNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMoICQoZWwpICkgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkUmlnaHRzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZVNhbGVzUGFja2FnZXMoKXtcclxuXHJcbiAgICAgICAgdmFyIHBhY2thZ2VzID0gW107XHJcblxyXG4gICAgICAgICQoXCIuc2FsZXMtcGFja2FnZVwiKS5lYWNoKGZ1bmN0aW9uKGssIHBhY2thZ2VDb250YWluZXIpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHNhbGVzUGFja2FnZSA9IG5ldyBDb250ZW50QXJlbmEuTW9kZWwuU2FsZXNQYWNrYWdlKCk7XHJcbiAgICAgICAgICAgIHZhciBpZCA9ICQocGFja2FnZUNvbnRhaW5lcikuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJzYWxlcy1wYWNrYWdlLVwiLFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLnRlcnJpdG9yaWVzID0gJChcIi50ZXJyaXRvcmllczpjaGVja2VkXCIsIHBhY2thZ2VDb250YWluZXIpLmF0dHIoXCJ2YWxcIik7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS5zYWxlc01ldGhvZCA9ICQoXCIuc2FsZXMtbWV0aG9kOmNoZWNrZWRcIiwgcGFja2FnZUNvbnRhaW5lcikuYXR0cihcInZhbFwiKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLmN1cnJlbmN5ID0gJChcIi5jdXJyZW5jeTpjaGVja2VkXCIsIHBhY2thZ2VDb250YWluZXIpLmF0dHIoXCJ2YWxcIik7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS5pZCA9IGlkO1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2UubmFtZSA9ICQoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICtcIi1uYW1lXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2UuZmVlID0gJChcIi5mZWU6dmlzaWJsZVwiLCBwYWNrYWdlQ29udGFpbmVyKS52YWwoKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLnRlcnJpdG9yeUJpZHMgPSAkKFwiI3NhbGVzLXBhY2thZ2UtXCIgKyBpZCArXCItdGVycml0b3J5LWJpZHNcIikuaXMoXCI6Y2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLnRlcnJpdG9yeUFzUGFja2FnZSA9ICQoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICtcIi10ZXJyaXRvcmllcy1hcy1wYWNrYWdlXCIpLmlzKFwiOmNoZWNrZWRcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHNhbGVzUGFja2FnZS50ZXJyaXRvcmllcyA9PT0gXCJzZWxlY3RlZFwiKSBzYWxlc1BhY2thZ2Uuc2VsZWN0ZWRUZXJyaXRvcmllcyA9ICQoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICtcIi10ZXJyaXRvcnktc2VsZWN0ZWRcIikuY2hvc2VuKCkudmFsKCk7XHJcbiAgICAgICAgICAgIGlmICggc2FsZXNQYWNrYWdlLnRlcnJpdG9yaWVzID09PSBcImV4Y2x1ZGVkXCIpIHNhbGVzUGFja2FnZS5leGNsdWRlZFRlcnJpdG9yaWVzID0gJChcIiNzYWxlcy1wYWNrYWdlLVwiICsgaWQgK1wiLXRlcnJpdG9yeS1leGNsdWRlZFwiKS5jaG9zZW4oKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHBhY2thZ2VzLnB1c2goc2FsZXNQYWNrYWdlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhY2thZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlU3RlcFR3bygpe1xyXG5cclxuICAgICAgICB2YXIgaGFzRXJyb3JzID0gZmFsc2UsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzID0gW10sXHJcbiAgICAgICAgICAgIGV4cGlyYXRpb25EYXRlID0gJChcIiNleHBpcmF0aW9uLWRhdGVcIiksXHJcbiAgICAgICAgICAgIHJpZ2h0cyA9IGNvbGxlY3RTZWxlY3RlZFJpZ2h0cygpLFxyXG4gICAgICAgICAgICBtZXNzYWdlc0NvbnRhaW5lciA9ICQoJzxkaXYgdGl0bGU9XCJUaGUgZm9ybSBpcyBpbmNvbXBsZXRlIVwiIC8+JyksXHJcbiAgICAgICAgICAgIHRvdGFsID0gMCxcclxuICAgICAgICAgICAgc2VsZWN0ZWRQYWNrYWdlcyA9IGdldEZ1bGxTZWxlY3RlZFBhY2thZ2VzKCk7XHJcblxyXG4gICAgICAgICQoXCIuaW5zdGFsbG1lbnQtcGVyY2VudFwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRvdGFsICs9IE51bWJlciAoICQodGhpcykudmFsKCkucmVwbGFjZShcIiVcIiwgXCJcIikgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIHRvdGFsICE9PSAxMDAgKSB7XHJcbiAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goICQoJzxkaXYgY2xhc3M9XCJwb3B1cC1lcnJvci1tZXNzYWdlXCIgLz4nKS5odG1sKCdUb3RhbCBpbnN0YWxsbWVudHMgbXVzdCBzdW0gMTAwJSEnKSApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5pbnN0YWxsbWVudHMgPSBjb2xsZWN0SW5zdGFsbG1lbnRzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5zYWxlc1BhY2thZ2VzID0gdmFsaWRhdGVTYWxlc1BhY2thZ2VzKCk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuc2FsZXNQYWNrYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHNhbGVzUGFja2FnZSl7XHJcbiAgICAgICAgICAgIHZhciB2YWxpZCA9IHNhbGVzUGFja2FnZS52YWxpZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCB2YWxpZC5oYXNFcnJvcnMgKXtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKCAkKCc8ZGl2IGNsYXNzPVwicG9wdXAtZXJyb3ItbWVzc2FnZVwiIC8+JykuaHRtbCh2YWxpZC5kZXNjcmlwdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LnJpZ2h0cyA9IHJpZ2h0cztcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5wYWNrYWdlcyA9IHNlbGVjdGVkUGFja2FnZXMuc2VsZWN0ZWRJZHM7XHJcblxyXG4gICAgICAgIGlmICggZXhwaXJhdGlvbkRhdGUudmFsKCkgPT09IFwiXCIgKXtcclxuICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaCggJCgnPGRpdiBjbGFzcz1cInBvcHVwLWVycm9yLW1lc3NhZ2VcIiAvPicpLmh0bWwoJ1BsZWFzZSBzZWxlY3QgYW4gZXhwaXJhdGlvbiBkYXRlJykgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5leHBpcmVzQXQgPSAgZXhwaXJhdGlvbkRhdGUudmFsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIGhhc0Vycm9ycyApe1xyXG5cclxuICAgICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaCgoY29udGVudCk9PntcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzQ29udGFpbmVyLmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtZXNzYWdlc0NvbnRhaW5lci5kaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgbWluV2lkdGg6IDQwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAhaGFzRXJyb3JzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTYWxlc1BhY2thZ2UoKXtcclxuICAgICAgICB2YXIgdGVtcGxhdGUgPSAkLnRlbXBsYXRlcyhcIiNzYWxlcy1wYWNrYWdlLXRlbXBsYXRlXCIpLFxyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2VzID0gJChcIi5zYWxlcy1wYWNrYWdlXCIpLFxyXG4gICAgICAgICAgICBpZCA9IHNhbGVzUGFja2FnZXMubGVuZ3RoICsgMSxcclxuICAgICAgICAgICAgaHRtbE91dHB1dCA9IHRlbXBsYXRlLnJlbmRlcih7aWQ6IGlkIH0pO1xyXG5cclxuICAgICAgICBpZiAoIGlkID09PSAxICl7XHJcbiAgICAgICAgICAgICQoXCIucmlnaHRzLWxpc3RcIikubGFzdCgpLmFmdGVyKGh0bWxPdXRwdXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZXMubGFzdCgpLmFmdGVyKGh0bWxPdXRwdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIi5wcmljZS1vcHRpb25hbFwiLCBcIiNzYWxlcy1wYWNrYWdlLVwiICsgaWQpLmhpZGUoKTtcclxuICAgICAgICBDb250ZW50QXJlbmEuVXRpbHMuYWRkUmVnaW9uQmVoYXZpb3VyKFwiI3NhbGVzLXBhY2thZ2UtXCIgKyBpZCArIFwiIC5oYXMtcmVnaW9uLXNlbGVjdG9yXCIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKmZ1bmN0aW9uIGFkZERpc3RyaWJ1dGlvblBhY2thZ2VzKCBuYW1lICl7XHJcblxyXG4gICAgICAgIHZhciBkaXN0cmlidXRpb25QYWNrYWdlID0gJChcIi5wcm9kdWN0aW9uLXN0YW5kYXJkc1wiLCBcIiNib3gtdGVtcGxhdGVzXCIpLmNsb25lKCksXHJcbiAgICAgICAgICAgIHRlY2huaWNhbERlbGl2ZXJ5ID0gJChcIi50ZWNobmljYWwtZGVsaXZlcnlcIiwgXCIjYm94LXRlbXBsYXRlc1wiKS5jbG9uZSgpLFxyXG4gICAgICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlVGl0bGUgPSBkaXN0cmlidXRpb25QYWNrYWdlLmZpbmQoXCIuYm94LXRpdGxlXCIpLFxyXG4gICAgICAgICAgICB0ZWNobmljYWxEZWxpdmVyeVRpdGxlID0gdGVjaG5pY2FsRGVsaXZlcnkuZmluZChcIi5ib3gtdGl0bGVcIiksXHJcbiAgICAgICAgICAgIHRpdGxlID0gbmFtZS5yZXBsYWNlKFwiLVwiLCBcIiAtIFwiKSxcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSAkLnRlbXBsYXRlcyhcIiNjb250ZW50LWRldGFpbHMtdGVtcGxhdGVcIiksXHJcbiAgICAgICAgICAgIGVwaXNvZGVUZW1wbGF0ZSA9ICQudGVtcGxhdGVzKFwiI2VwaXNvZGUtdGVtcGxhdGVcIik7XHJcblxyXG4gICAgICAgICQoXCJbZ3JvdXA9J1Byb2R1Y3Rpb24gc3RhbmRhcmRzJ11cIiwgXCIucmlnaHRzLWxpc3RcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgdGVzdCA9ICQodGhpcykuY2xvbmUoKTtcclxuICAgICAgICAgICAgZGlzdHJpYnV0aW9uUGFja2FnZS5maW5kKFwiLnNlbGxlci1ib3gtY29udGVudFwiKS5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCJbZ3JvdXA9J1RlY2huaWNhbCBkZWxpdmVyeSddXCIsIFwiLnJpZ2h0cy1saXN0XCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHRlc3QgPSAkKHRoaXMpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRlY2huaWNhbERlbGl2ZXJ5LmZpbmQoXCIuc2VsbGVyLWJveC1jb250ZW50XCIpLmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGlzdHJpYnV0aW9uUGFja2FnZS5hdHRyKFwiaWRcIixcImRpc3RyaWJ1dGlvbi1wYWNrYWdlLVwiICsgbmFtZSkuc2hvdygpLmluc2VydEJlZm9yZShcIi5yaWdodHMtbGlzdFwiKTtcclxuICAgICAgICB0ZWNobmljYWxEZWxpdmVyeS5hdHRyKFwiaWRcIixcInRlY2huaWNhbC1kZWxpdmVyeS1cIiArIG5hbWUpLnNob3coKS5pbnNlcnRBZnRlcihkaXN0cmlidXRpb25QYWNrYWdlKTtcclxuICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlVGl0bGUuaHRtbChcIkRpc3RyaWJ1dGlvbiBwYWNrYWdlIC0gXCIgKyBkaXN0cmlidXRpb25QYWNrYWdlVGl0bGUuaHRtbCgpICsgXCIgLVwiICArIHRpdGxlKTtcclxuICAgICAgICB0ZWNobmljYWxEZWxpdmVyeVRpdGxlLmh0bWwodGVjaG5pY2FsRGVsaXZlcnlUaXRsZS5odG1sKCkgKyBcIiAtIFwiICsgdGl0bGUpO1xyXG5cclxuICAgICAgICAkKFwiLm9wdGlvbmFsXCIsdGVjaG5pY2FsRGVsaXZlcnkpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgJChcIi5vcHRpb25hbFwiLGRpc3RyaWJ1dGlvblBhY2thZ2UpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgJChcImxhYmVsXCIsIGRpc3RyaWJ1dGlvblBhY2thZ2UgKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImZvclwiLCBcImRpc3RyaWJ1dGlvbi1wYWNrYWdlLVwiICsgbmFtZSArIFwiLVwiICsgJCh0aGlzKS5hdHRyKFwiZm9yXCIpIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcImlucHV0LCBzZWxlY3RcIiwgZGlzdHJpYnV0aW9uUGFja2FnZSApLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiaWRcIiwgXCJkaXN0cmlidXRpb24tcGFja2FnZS1cIiArIG5hbWUgKyBcIi1cIiArICQodGhpcykuYXR0cihcImlkXCIpIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcImxhYmVsXCIsIHRlY2huaWNhbERlbGl2ZXJ5ICkuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJmb3JcIiwgXCJ0ZWNobmljYWwtZGVsaXZlcnktXCIgKyBuYW1lICsgXCItXCIgKyAkKHRoaXMpLmF0dHIoXCJmb3JcIikgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiaW5wdXQsIHNlbGVjdFwiLCB0ZWNobmljYWxEZWxpdmVyeSApLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiaWRcIiwgXCJ0ZWNobmljYWwtZGVsaXZlcnktXCIgKyBuYW1lICsgXCItXCIgKyAkKHRoaXMpLmF0dHIoXCJpZFwiKSApXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5MYW5ndWFnZXMuYWRkTGFuZ3VhZ2VCZWhhdmlvdXIoXCIjZGlzdHJpYnV0aW9uLXBhY2thZ2UtXCIgKyBuYW1lICsgXCIgLmhhcy1sYW5ndWFnZS10cmlnZ2VyXCIpO1xyXG5cclxuICAgICAgICBpZiggbmFtZSA9PT0gXCJQcm9ncmFtXCIgKXtcclxuICAgICAgICAgICAgdGVjaG5pY2FsRGVsaXZlcnkuZmluZChcIi5zZWxsZXItYm94LWNvbnRlbnRcIikuYXBwZW5kKHRlbXBsYXRlLnJlbmRlcigpKTtcclxuICAgICAgICAgICAgJChcIiN1cGxvYWQtY29udGVudC1jc3ZcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICAkKCcjY3N2LXNlbGVjdG9yLWhpZGRlbicpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKENvbnRlbnRBcmVuYS5VdGlscy5pc0FQSUF2YWlsYWJsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjY3N2LXNlbGVjdG9yLWhpZGRlbicpLmJpbmQoJ2NoYW5nZScsIGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZXMgPSBldnQudGFyZ2V0LmZpbGVzOyAvLyBGaWxlTGlzdCBvYmplY3RcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlsZSA9IGZpbGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCcjY29udGVudC1kZXRhaWxzLW1hc2snKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAvISoqXHJcbiAgICAgICAgICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge3sgdGFyZ2V0Ont9IH19IGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICohL1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjc3YgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9ICQuY3N2LnRvQXJyYXlzKGNzdik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdywgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaW5kZXggPiAwICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2NvbnRlbnQtZGV0YWlscy1tYXNrJykuYXBwZW5kKGVwaXNvZGVUZW1wbGF0ZS5yZW5kZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcGlzb2RlOiByb3dbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjZXBpc29kZXMtcXVhbnRpdHlcIikudmFsKGRhdGEubGVuZ3RoIC0gMSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKXsgYWxlcnQoJ1VuYWJsZSB0byByZWFkICcgKyBmaWxlLmZpbGVOYW1lKTsgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGlzdHJpYnV0aW9uUGFja2FnZTtcclxuXHJcbiAgICB9Ki9cclxuXHJcbiAgICAvKmZ1bmN0aW9uIGFkZEV4dHJhRGlzdHJpYnV0aW9uUGFja2FnZSggZGlzdHJpYnV0aW9uUGFja2FnZSl7XHJcblxyXG4gICAgICAgIHZhciBzZWxlY3RvcnMgPSBbXSxcclxuICAgICAgICAgICAgcGFja2FnZXMgPSBnZXRGdWxsU2VsZWN0ZWRQYWNrYWdlcygpLFxyXG4gICAgICAgICAgICBoaWdobGlnaHRzID0gcGFja2FnZXMuc2VsZWN0ZWROYW1lcy5pbmRleE9mKFwiSGlnaGxpZ2h0c1wiKSAhPT0gLTEsXHJcbiAgICAgICAgICAgIGNsaXBzID0gcGFja2FnZXMuc2VsZWN0ZWROYW1lcy5pbmRleE9mKFwiQ2xpcHNcIikgIT09IC0xLFxyXG4gICAgICAgICAgICBuZXdzID0gcGFja2FnZXMuc2VsZWN0ZWROYW1lcy5pbmRleE9mKFwiTmV3cyBhY2Nlc3NcIikgIT09IC0xO1xyXG5cclxuICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlLmZpbmQoXCIuc2VsbGVyLWJveC1jb250ZW50XCIpLmFwcGVuZCggJChcIi5leHRyYS1kaXN0cmlidXRpb24tcGFja2FnZXNcIikuY2xvbmUoKS5zaG93KCkpO1xyXG5cclxuICAgICAgICBpZiAoaGlnaGxpZ2h0cyApIHNlbGVjdG9ycy5wdXNoKFwiLmV4dHJhLXBhY2thZ2UtaGlnaGxpZ2h0XCIgKTtcclxuICAgICAgICBpZiAoY2xpcHMgKSBzZWxlY3RvcnMucHVzaChcIi5leHRyYS1wYWNrYWdlLWNsaXBzXCIgKTtcclxuICAgICAgICBpZiAobmV3cyApIHNlbGVjdG9ycy5wdXNoKFwiLmV4dHJhLXBhY2thZ2UtbmV3c1wiICk7XHJcbiAgICAgICAgaWYgKGhpZ2hsaWdodHMgJiYgY2xpcHMgKSBzZWxlY3RvcnMucHVzaChcIi5leHRyYS1wYWNrYWdlLWhpZ2hsaWdodC1jbGlwc1wiICk7XHJcbiAgICAgICAgaWYgKGhpZ2hsaWdodHMgJiYgbmV3cyApIHNlbGVjdG9ycy5wdXNoKFwiLmV4dHJhLXBhY2thZ2UtaGlnaGxpZ2h0LW5ld3NcIiApO1xyXG4gICAgICAgIGlmIChjbGlwcyAmJiBuZXdzICkgc2VsZWN0b3JzLnB1c2goXCIuZXh0cmEtcGFja2FnZS1jbGlwcy1uZXdzXCIgKTtcclxuICAgICAgICBpZiAoaGlnaGxpZ2h0cyAmJiBuZXdzICYmIGNsaXBzICkgc2VsZWN0b3JzLnB1c2goXCIuZXh0cmEtcGFja2FnZS1oaWdobGlnaHQtY2xpcHMtbmV3c1wiICk7XHJcblxyXG4gICAgICAgICQoc2VsZWN0b3JzLmpvaW4oXCIsIFwiKSwgZGlzdHJpYnV0aW9uUGFja2FnZSkuc2hvdygpO1xyXG5cclxuICAgICAgICAkKFwiLmRpc3RyaWJ1dGlvbi1wYWNrYWdlLXNlbGVjdG9yXCIsIGRpc3RyaWJ1dGlvblBhY2thZ2UpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9ICQodGhpcykudmFsKCkuc3BsaXQoXCIsIFwiKTtcclxuXHJcbiAgICAgICAgICAgICQoXCIudGVjaG5pY2FsLWRlbGl2ZXJ5OnZpc2libGU6bm90KCN0ZWNobmljYWwtZGVsaXZlcnktTWFpbilcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucHJvZHVjdGlvbi1zdGFuZGFyZHM6dmlzaWJsZTpub3QoI2Rpc3RyaWJ1dGlvbi1wYWNrYWdlLU1haW4pXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgYWRkRGlzdHJpYnV0aW9uUGFja2FnZXMoIHZhbHVlcy5qb2luKFwiLVwiKSApO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSovXHJcblxyXG4gICAgLypmdW5jdGlvbiBjaGVja1NlbGVjdGVkUGFja2FnZXMoKSB7XHJcblxyXG4gICAgICAgIHZhciBmdWxsUGFja2FnZXNEYXRhID0gZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXMoKSxcclxuICAgICAgICAgICAgcGFja2FnZXMgPSBmdWxsUGFja2FnZXNEYXRhLnNlbGVjdGVkSWRzLFxyXG4gICAgICAgICAgICBwYWNrYWdlc05hbWUgPSBmdWxsUGFja2FnZXNEYXRhLnNlbGVjdGVkTmFtZXMsXHJcbiAgICAgICAgICAgIG1haW5JdGVtcyA9IFtdLFxyXG4gICAgICAgICAgICBzaW5nbGVJdGVtcyA9IFtdLFxyXG4gICAgICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlLFxyXG4gICAgICAgICAgICBtdWx0aVBhY2thZ2UgPSAoIHBhY2thZ2VzLmxlbmd0aCA+IDEpLFxyXG4gICAgICAgICAgICBtYWluVGFyZ2V0ID0gKG11bHRpUGFja2FnZSkgPyAkKFwiI21haW4tbXVsdGlwbGUtcGFja2FnZVwiKSA6ICQoXCIjbWFpbi1zaW5nbGUtcGFja2FnZVwiKTtcclxuXHJcblxyXG4gICAgICAgICQuZWFjaCgkKFwiLnNlbGxlci1ib3gtY29udGVudFwiKSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmNoaWxkcmVuKCkuZmlyc3QoKS5jc3MoXCJkaXNwbGF5XCIpID09PSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIuc2VsZWN0LWJveC1pdGVtLWNvbnRhaW5lclwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5yaWdodHMtY29udGFpbmVyXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnJpZ2h0cy1jb250YWluZXI6bm90KC50ZWNobmljYWwtZGVsaXZlcnkpIC5zZWxsZXItYm94LWNvbnRlbnRcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAkKFwiLnByb2R1Y3Rpb24tc3RhbmRhcmRzXCIsIFwiI3N0ZXAyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoXCIudGVjaG5pY2FsLWRlbGl2ZXJ5XCIsIFwiI3N0ZXAyXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAkLmVhY2gocGFja2FnZXMsIGZ1bmN0aW9uKGssIHYpe1xyXG5cclxuICAgICAgICAgICAgc2luZ2xlSXRlbXMucHVzaChcIi5oYXMtcGFja2FnZS1cIit2K1wiOm5vdCguaXMtY29sbGVjdGl2ZWx5KVtncm91cD0nTWFpbiBJbmZvcm1hdGlvbiddXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBtdWx0aVBhY2thZ2UgKXtcclxuICAgICAgICAgICAgICAgIG1haW5JdGVtcy5wdXNoKFwiLmhhcy1wYWNrYWdlLVwiK3YrXCIuaXMtY29sbGVjdGl2ZWx5W2dyb3VwPSdNYWluIEluZm9ybWF0aW9uJ11cIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmhhcy1wYWNrYWdlLVwiK3YrXCI6bm90KC5pcy1jb2xsZWN0aXZlbHkpW2dyb3VwPSdNYWluIEluZm9ybWF0aW9uJ11cIiwgXCIucmlnaHRzLWxpc3RcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXN0ID0gJCh0aGlzKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjc2VsbC1ib3gtcGFja2FnZS1cIisgdiArXCIgLnNlbGxlci1ib3gtY29udGVudFwiKS5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiI3NlbGwtYm94LXBhY2thZ2UtXCIrIHYgKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYWluSXRlbXMucHVzaChcIi5oYXMtcGFja2FnZS1cIit2K1wiW2dyb3VwPSdNYWluIEluZm9ybWF0aW9uJ11cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICQoXCIuaGFzLXBhY2thZ2UtXCIgKyB2KS5zaG93KCk7XHJcblxyXG4gICAgICAgICAgICAkKFwibGFiZWxcIiwgXCIjc2VsbC1ib3gtcGFja2FnZS1cIiArIHYgKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJmb3JcIiwgXCJwYWNrYWdlLVwiICsgdiArIFwiLVwiICsgJCh0aGlzKS5hdHRyKFwiZm9yXCIpIClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiaW5wdXRcIiwgXCIjc2VsbC1ib3gtcGFja2FnZS1cIiArIHYgKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJpZFwiLCBcInBhY2thZ2UtXCIgKyB2ICsgXCItXCIgKyAkKHRoaXMpLmF0dHIoXCJpZFwiKSApXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcInNlbGVjdFwiLCBcIiNzZWxsLWJveC1wYWNrYWdlLVwiICsgdiApLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImlkXCIsIFwicGFja2FnZS1cIiArIHYgKyBcIi1cIiArICQodGhpcykuYXR0cihcImlkXCIpIClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuTGFuZ3VhZ2VzLmFkZExhbmd1YWdlQmVoYXZpb3VyKCBcIiNzZWxsLWJveC1wYWNrYWdlLVwiICsgdiArXCIgLmhhcy1sYW5ndWFnZS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICAkKCBcIiNzZWxsLWJveC1wYWNrYWdlLVwiICsgdiArXCIgLmhhcy1jYWxlbmRhclwiKS5lYWNoKGZ1bmN0aW9uIChrLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiICsgJChlbGVtZW50KS5hdHRyKFwiaWRcIikpLmRhdGVwaWNrZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKFwiLm9wdGlvbmFsXCIsIFwiI3NlbGwtYm94LXBhY2thZ2UtXCIgKyB2ICkuaGlkZSgpO1xyXG5cclxuICAgICAgICB9KSA7XHJcblxyXG4gICAgICAgICQobWFpbkl0ZW1zLmpvaW4oXCIsXCIpLCBcIi5yaWdodHMtbGlzdFwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0ID0gJCh0aGlzKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBtYWluVGFyZ2V0LmZpbmQoXCIuc2VsbGVyLWJveC1jb250ZW50XCIpLmFwcGVuZCh0ZXN0KTtcclxuICAgICAgICAgICAgbWFpblRhcmdldC5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICggcGFja2FnZXNOYW1lLmluZGV4T2YoXCJQcm9ncmFtXCIpID09PSAtMSB8fCBwYWNrYWdlc05hbWUubGVuZ3RoID4gMSApe1xyXG4gICAgICAgICAgICBkaXN0cmlidXRpb25QYWNrYWdlID0gYWRkRGlzdHJpYnV0aW9uUGFja2FnZXMoIFwiTWFpblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggcGFja2FnZXNOYW1lLmxlbmd0aCA+IDFcclxuICAgICAgICAgICAgJiYgKCBwYWNrYWdlc05hbWUuaW5kZXhPZihcIkNsaXBzXCIpICE9PSAtMVxyXG4gICAgICAgICAgICAgICAgfHwgcGFja2FnZXNOYW1lLmluZGV4T2YoXCJIaWdobGlnaHRzXCIpICE9PSAtMVxyXG4gICAgICAgICAgICAgICAgfHwgcGFja2FnZXNOYW1lLmluZGV4T2YoXCJOZXdzIGFjY2Vzc1wiKSAhPT0gLTFcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICl7XHJcbiAgICAgICAgICAgIGFkZEV4dHJhRGlzdHJpYnV0aW9uUGFja2FnZShkaXN0cmlidXRpb25QYWNrYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICggcGFja2FnZXNOYW1lLmluZGV4T2YoXCJQcm9ncmFtXCIpICE9PSAtMSApe1xyXG4gICAgICAgICAgICBhZGREaXN0cmlidXRpb25QYWNrYWdlcyggXCJQcm9ncmFtXCIgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIjbWFpbi1zZWxsLWJveFwiKS5zaG93KCk7XHJcbiAgICAgICAgJChcIiNwcmljZS1zZWxsLWJveFwiKS5zaG93KCk7XHJcbiAgICAgICAgJChcIi5wYWNrYWdlLXJlYWR5LWJ1dHRvblwiKS5zaG93KCk7XHJcbiAgICAgICAgJChcIiNwcmljZS1zZWxsLWJveCAuc2VsZWN0LWJveC1pdGVtLWNvbnRhaW5lclwiKS5zaG93KCk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkxhbmd1YWdlcy5hZGRMYW5ndWFnZUJlaGF2aW91ciggbWFpblRhcmdldC5maW5kKFwiLmhhcy1sYW5ndWFnZS10cmlnZ2VyXCIpICk7XHJcbiAgICAgICAgbWFpblRhcmdldC5maW5kKFwiLmhhcy1jYWxlbmRhclwiKS5lYWNoKGZ1bmN0aW9uIChrLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICQoXCIjXCIgKyAkKGVsZW1lbnQpLmF0dHIoXCJpZFwiKSkuZGF0ZXBpY2tlcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1haW5UYXJnZXQuZmluZChcIi5vcHRpb25hbFwiKS5oaWRlKCk7XHJcblxyXG4gICAgfSovXHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXBJbnN0YWxsbWVudCgpe1xyXG4gICAgICAgICQoXCIuaW5zdGFsbG1lbnQtcGVyY2VudFwiKS5vZmYoKS5tYXNrKCcwMDAlJywge3JldmVyc2U6IHRydWV9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb2xsZWN0SW5zdGFsbG1lbnRzKCl7XHJcblxyXG4gICAgICAgIHZhciBpbnN0YWxsbWVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgJChcIi5pbnN0YWxsbWVudFwiKS5lYWNoKGZ1bmN0aW9uKGssIHBhY2thZ2VDb250YWluZXIpe1xyXG5cclxuICAgICAgICAgICAgdmFyIGluc3RhbGxtZW50ID0ge307XHJcblxyXG4gICAgICAgICAgICBpbnN0YWxsbWVudC5wZXJjZW50ID0gJChcIi5pbnN0YWxsbWVudC1wZXJjZW50XCIsIHBhY2thZ2VDb250YWluZXIpLnZhbCgpLnJlcGxhY2UoXCIlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBpbnN0YWxsbWVudC5kYXRlID0gJChcIi5pbnN0YWxsbWVudC1kYXRlXCIsIHBhY2thZ2VDb250YWluZXIpLnZhbCgpO1xyXG4gICAgICAgICAgICBpbnN0YWxsbWVudC5zaWduaW5nX2RheSA9ICQoXCIuaW5zdGFsbG1lbnQtZGF5c1wiLCBwYWNrYWdlQ29udGFpbmVyKS52YWwoKTtcclxuICAgICAgICAgICAgaW5zdGFsbG1lbnQuZ3JhbnRlZF9kYXkgPSAkKFwiLmdyYW50ZWQtZGF5c1wiKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGluc3RhbGxtZW50cy5wdXNoKGluc3RhbGxtZW50KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluc3RhbGxtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJtaXRmb3JtKCkge1xyXG4gICAgICAgIHZhciB1cmwgPSBlbnZob3N0dXJsICsgJ3NlbGwvcHVibGlzaGVkJyxcclxuICAgICAgICAgICAgZm9ybSA9ICQoJyNteWZvcm0nKTtcclxuXHJcbiAgICAgICAgZm9ybS5hdHRyKCdhY3Rpb24nLCB1cmwpO1xyXG5cclxuICAgICAgICB2YXIgZGF0YSA9IEpTT04uc3RyaW5naWZ5KENvbnRlbnRBcmVuYS5Db250ZW50KTtcclxuXHJcbiAgICAgICAgJCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwianNvblwiLz4nKS52YWwoZGF0YSkuYXBwZW5kVG8oJyNteWZvcm0nKTtcclxuICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoKSB7fTtcclxuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjdXBsb2FkLWFncmVlbWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcclxuICAgICAgICAkKCcjbGljZW5zZS1maWxlLXNlbGVjdG9yLWhpZGRlbicpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjc3VibWl0LWxpc3RpbmdcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBpZiAoICF2YWxpZGF0ZVN0ZXBUd28oKSApIHJldHVybjtcclxuXHJcbiAgICAgICAgc3VibWl0Zm9ybSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiN2aWV3LWFncmVlbWVudFwiKS5vbignY2xpY2snLGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFsaWRhdGVTdGVwVHdvKCk7XHJcbiAgICAgICAgJChcIiN2aWV3LWFncmVlbWVudFwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKS5hcHBlbmQoJzxpIGNsYXNzPVwiZmEgZmEtY29nIGZhLXNwaW5cIj4nKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmwgOiBlbnZob3N0dXJsICsgJ3YxL2NvbnRyYWN0L3ByZXZpZXdzJyxcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhIDoge1xyXG4gICAgICAgICAgICAgICAganNvbiA6IEpTT04uc3RyaW5naWZ5KENvbnRlbnRBcmVuYS5Db250ZW50KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24oIHJlc3BvbnNlICl7XHJcbiAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5pZCA9IHJlc3BvbnNlLmlkO1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oZW52aG9zdHVybCArICdjb250cmFjdC9wcmV2aWV3P2lkPScrIHJlc3BvbnNlLmlkLCBcIl9ibGFua1wiLCdoZWlnaHQ9NjAwLHdpZHRoPTgwMCcpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN2aWV3LWFncmVlbWVudFwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgbnVsbCkuZmluZCgnaScpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2FkZC1pbnN0YWxsbWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGlmKCQoXCIuaW5zdGFsbG1lbnQ6Zmlyc3QgaW5wdXQuaW5zdGFsbG1lbnQtcGVyY2VudFwiKS52YWwoKT09JzEwMCUnKXtcclxuICAgICAgICAgICAgJChcIi5pbnN0YWxsbWVudDpmaXJzdCBpbnB1dC5pbnN0YWxsbWVudC1wZXJjZW50XCIpLnZhbCgnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcG9zID0gJChcIi5pbnN0YWxsbWVudFwiKS5sZW5ndGggKyAxLFxyXG4gICAgICAgICAgICBpdGVtID0gJChcIi5pbnN0YWxsbWVudDpsYXN0XCIpLmNsb25lKCk7XHJcblxyXG4gICAgICAgIGl0ZW0uYXR0cihcImlkXCIsIFwiaW5zdGFsbG1lbnRcIiArIHBvcyk7XHJcbiAgICAgICAgaXRlbS5maW5kKFwic3BhblwiKS5odG1sKCBDb250ZW50QXJlbmEuVXRpbHMuYWRkT3JkaW5hbChwb3MpKTtcclxuICAgICAgICBpdGVtLmZpbmQoXCJpbnB1dFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgaXRlbS5pbnNlcnRBZnRlcihcIi5pbnN0YWxsbWVudDpsYXN0XCIpO1xyXG5cclxuICAgICAgICBpdGVtLmZpbmQoXCJpbnB1dC5oYXNEYXRlcGlja2VyXCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiaWRcIiwgbnVsbClcclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiaGFzRGF0ZXBpY2tlclwiKVxyXG4gICAgICAgICAgICAuZGF0ZXBpY2tlcihcImRlc3Ryb3lcIikub2ZmKCkuZGF0ZXBpY2tlcigpO1xyXG5cclxuICAgICAgICAvL3NldHVwSW5zdGFsbG1lbnQoKVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qJChcIi5wYWNrYWdlLXNlbGVjdG9yXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImlkXCIpLnNwbGl0KFwiLVwiKVsxXSxcclxuICAgICAgICAgICAgbmFtZSA9ICQodGhpcykuYXR0cihcIm5hbWVcIikuc3BsaXQoXCItXCIpWzFdO1xyXG5cclxuICAgICAgICBjaGVja1NlbGVjdGVkUGFja2FnZXMoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrZWQgfHwgc2VsZWN0b3JDb3VudGVyID49IDEpIHJldHVybjtcclxuXHJcbiAgICAgICAgJC5lYWNoKCQoXCIucGFja2FnZS1zZWxlY3RvclwiKSwgZnVuY3Rpb24gKGksIHBhY2spIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBwYWNrYWdlcyA9ICQocGFjaykuZGF0YShcInBhY2thZ2VzXCIpLFxyXG4gICAgICAgICAgICAgICAgcGFja19pZCA9ICQocGFjaykuYXR0cihcImlkXCIpLnNwbGl0KFwiLVwiKVsxXSxcclxuICAgICAgICAgICAgICAgIGVsID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICQuZWFjaChwYWNrYWdlcy5wYXJlbnQsIGZ1bmN0aW9uIChpLCBwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocC5pZCA9PT0gaWQpIGZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZmxhZyl7XHJcbiAgICAgICAgICAgICAgICBlbC5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYWNrX2lkICE9PSBpZCkgZWwucGFyZW50KCkubmV4dCgpLmFkZENsYXNzKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIjc2VsbC1ib3hcIikucmVtb3ZlQ2xhc3MoXCJpcy1oaWRkZW5cIik7XHJcblxyXG4gICAgICAgIG1haW5QYWNrYWdlID0gbmFtZTtcclxuICAgICAgICBzZWxlY3RvckNvdW50ZXIrKztcclxuXHJcbiAgICB9KTsqL1xyXG5cclxuICAgICQoXCIjcmVzZXQtcGFja2FnZXNcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuZWFjaCgkKFwiLnBhY2thZ2Utc2VsZWN0b3JcIiksIGZ1bmN0aW9uIChpLCBwYWNrKSB7XHJcblxyXG4gICAgICAgICAgICBwYWNrLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgJChwYWNrKS5hdHRyKFwiZGlzYWJsZWRcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICQocGFjaykucGFyZW50KCkubmV4dCgpLnJlbW92ZUNsYXNzKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICQoXCIjbWFpbi1zZWxsLWJveFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIuc2VsZWN0LWJveC1pdGVtLWNvbnRhaW5lclwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIuc2VsbC1pdGVtcy1ib3hcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiI3ByaWNlLXNlbGwtYm94XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChcIi5wYWNrYWdlLXJlYWR5LWJ1dHRvblwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yQ291bnRlciA9IDA7XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qJChcIiNkcmFmdC1saXN0aW5nXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIGVsID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgZWwuaHRtbChcIjxpIGNsYXNzPVxcXCJmYSBmYS1jb2cgZmEtc3BpblxcXCI+XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5zYXZlQ29udGVudEFzRHJhZnQoQ29udGVudEFyZW5hLkNvbnRlbnQpLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyAhPT0gdW5kZWZpbmVkICYmIHJlc3BvbnNlLmNvbnRlbnRJZCAhPT0gdW5kZWZpbmVkICl7XHJcbiAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5pZCA9IHJlc3BvbnNlLmNvbnRlbnRJZDtcclxuICAgICAgICAgICAgICAgIGVsLmh0bWwoXCJTYXZlZCBhcyBEcmFmdFwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoKSB7fVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsqL1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsXCIuYWRkLXNhbGVzLXBhY2thZ2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFkZFNhbGVzUGFja2FnZSgpXHJcbiAgICB9KTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuVGVzdC52YWxpZGF0ZVN0ZXBUd28gPSB2YWxpZGF0ZVN0ZXBUd287XHJcbiAgICBDb250ZW50QXJlbmEuVGVzdC5nZXRGdWxsU2VsZWN0ZWRQYWNrYWdlcyA9IGdldEZ1bGxTZWxlY3RlZFBhY2thZ2VzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6YXRpb25cclxuICAgICAqL1xyXG4gICAgc2V0dXBJbnN0YWxsbWVudCgpO1xyXG4gICAgYWRkU2FsZXNQYWNrYWdlKCk7XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zZWxsLnN0ZXAyLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCBjb250ZW50IGZyb20gXCIuL3JlZHVjZXJzL2NvbnRlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN0b3JlKGNvbnRlbnQpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvc3RvcmUuanMiXSwic291cmNlUm9vdCI6IiJ9