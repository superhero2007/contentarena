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
            _this2.setState({ updated: false });
            _this2.props.closeSelector();
        };

        _this2.getActiveFilter = function () {
            return _this2.state.filter[_this2.state.activeFilter];
        };

        _this2.setActiveFilter = function (filterName) {
            _this2.setState({ activeFilter: filterName });
        };

        _this2.applySelection = function () {
            _this2.props.applySelection(_this2.props.type, _this2.state.selectedItem);
        };

        _this2.selectItem = function (item) {
            _this2.setState({ selectedItem: item, updated: true });
        };

        _this2.isItemSelected = function (item) {

            if (_this2.state.updated) {
                return _this2.state.selectedItem.external_id === item.external_id;
            } else {
                return _this2.props.selected[0].external_id === item.external_id;
            }
        };

        _this2.filter = function (item) {
            var filter = _this2.getActiveFilter();
            return filter.values.indexOf(item.name[0].toLowerCase()) !== -1;
        };

        _this2.getItems = function () {
            var filter = _this2.getActiveFilter();
            if (filter.type === "origin") return _this2.props[filter.value];
            if (filter.type === "firstLetter") return _this2.props.items.filter(_this2.filter);
        };

        _this2.state = {
            updated: false,
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
            activeFilter: props.activeFilter || "popular",
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
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: function onClick() {
                                _this3.setActiveFilter("popular");
                            } },
                        'Popular'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: function onClick() {
                                _this3.setActiveFilter("ag");
                            } },
                        'A-G'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: function onClick() {
                                _this3.setActiveFilter("hn");
                            } },
                        'H-N'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: function onClick() {
                                _this3.setActiveFilter("ot");
                            } },
                        'O-T'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: function onClick() {
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
                        { onClick: this.applySelection },
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
        selected: state[state.selectorInfo.selectorType]
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
        applySelection: function applySelection(selectorType, selectedItem) {
            return dispatch({
                type: 'APPLY_SELECTION',
                selectorType: selectorType,
                selectedItem: selectedItem
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
            console.log(__WEBPACK_IMPORTED_MODULE_7__store__["a" /* default */].getState());
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
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var SellFormStep1 = function (_React$Component) {
    _inherits(SellFormStep1, _React$Component);

    function SellFormStep1(props) {
        _classCallCheck(this, SellFormStep1);

        var _this2 = _possibleConstructorReturn(this, (SellFormStep1.__proto__ || Object.getPrototypeOf(SellFormStep1)).call(this, props));

        _this2.state = {
            title: "Step 1 - Event selection"
        };
        return _this2;
    }

    _createClass(SellFormStep1, [{
        key: "render",
        value: function render() {
            var _this = this;

            if (this.props.step !== 1) return null;

            var inputProps = {
                sports: {
                    value: ""
                }
            };

            if (this.props.sports.length > 0) inputProps.sports.value = this.props.sports[0].name;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "step-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "step-title" },
                    this.state.title
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "step-item-description" },
                        "Please enter the name of the competition for which you would like to sell content. In case you can't find your competition, please follow the steps below"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text",
                        id: "search-sport",
                        placeholder: "Enter competition name (e.g. Bundesliga)" }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "step-item-description" },
                        "Please select the sport(s) and competition(s) covered by your content listing:"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", _extends({ type: "text"
                    }, inputProps.sports, {
                        readOnly: true,
                        onClick: this.props.openSportSelector,
                        placeholder: "Sport" }))
                )
            );
        }
    }]);

    return SellFormStep1;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        step: state.step,
        sports: state.sports
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        openSportSelector: function openSportSelector() {
            return dispatch({
                type: 'OPEN_SELECTOR',
                selectorItems: ContentArena.Data.FullSports,
                popularItems: ContentArena.Data.TopSports,
                selectorType: "sports"
            });
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

        case 'OPEN_SELECTOR':
            return Object.assign({}, state, {
                selectorInfo: {
                    selectorType: action.selectorType,
                    open: true,
                    selectorItems: action.selectorItems,
                    popularItems: action.popularItems
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

            selection[action.selectorType] = [action.selectedItem];

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

    function split(val) {
        return val.split(/,\s*/);
    }

    function extractLast(term) {
        return split(term).pop();
    }

    function fillSports(selector, topSports, fullSports, callback) {

        var el = $(selector),
            fullSportsLoaded;

        el.autocomplete({
            source: topSports,
            minLength: 0,
            delay: 500,
            search: function search(event) {
                if (!fullSportsLoaded && $(event.target).val() !== "") {
                    $(event.target).autocomplete("option", "source", fullSports);
                }
                fullSportsLoaded = true;
            },
            select: function select(event, ui) {

                var target = $(event.target),
                    value = ui.item.value;

                event.preventDefault();

                if (value === "all") {
                    target.autocomplete("option", "source", fullSports);
                    setTimeout(function () {
                        target.autocomplete("search", "");
                    }, 500);
                    return;
                }

                if (value === "new") {
                    addCustomTemplate(true, true, true);
                    return;
                }

                target.val(ui.item.label).attr("externalId", value).trigger('blur');

                if (callback) callback.apply(this, arguments);
            }
        }).focus(function () {
            $(this).autocomplete("search", "");
        });
    }

    function fillCategories() {

        var el = $("#event-category-selector"),
            sportId = $("#event-sport-selector").attr("externalId"),
            spinner = el.parent().find("i");

        spinner.show();
        el.attr("disabled", "disabled");
        if (el.data('autocomplete')) el.autocomplete('destroy').off();

        ContentArena.Api.getCategories(sportId).done(function (categories) {
            el.attr("disabled", null);

            if (categories.length === 0) {
                addCustomTemplate(false, true, true);
                spinner.hide();
                return;
            }

            el.show();
            el.autocomplete({
                source: categories,
                minLength: 0,
                select: function select(event, ui) {

                    event.preventDefault();
                    if (ui.item.value === "new") {
                        addCustomTemplate(false, true, true);
                        return;
                    }

                    $(event.target).val(ui.item.label).attr("externalId", ui.item.value).blur();
                    fillTournaments(true);
                    $.each(["#event-tournament-selector", "#event-season-selector"], function (k, id) {
                        $(id).val("").removeClass("custom-input");
                    });
                    $("#event-schedule-subitems").html("");
                    $(".custom-template-item").hide();
                }
            }).focus(function () {
                $(this).autocomplete("search", "");
            });

            spinner.hide();
        });
    }

    function fillTournaments(silent) {

        var sportId = $("#event-sport-selector").attr('externalId'),
            categoryId = $("#event-category-selector").attr('externalId'),
            el = $("#event-tournament-selector"),
            spinner = el.parent().find("i");

        spinner.show();

        el.attr("disabled", "disabled");
        if (el.data('autocomplete')) el.autocomplete('destroy').off();

        ContentArena.Api.getTournaments(sportId, categoryId).done(function (tournaments) {

            if (sportId === "sr:sport:5") {

                tournaments = tournaments.filter(function (tournament) {
                    return tournament.label.search("Double") === -1;
                });

                tournaments = tournaments.map(function (tournament) {
                    tournament.label = tournament.label.replace(" Singles", "");
                    return tournament;
                });
            }

            if (!silent) fillCategories();

            el.attr("disabled", null);

            if (tournaments.length === 0) {
                addCustomTemplate(false, true, true);
                spinner.hide();
                return;
            }

            el.autocomplete({
                source: function source(request, response) {
                    var results = $.ui.autocomplete.filter(tournaments, request.term);

                    response(results.slice(0, 300));
                },
                minLength: 0,
                select: function select(event, ui) {
                    event.preventDefault();

                    if (ui.item.value === "new") {
                        addCustomTemplate(false, false, true);
                        return;
                    }

                    $(event.target).val(ui.item.label).attr("externalId", ui.item.value).blur();
                    fillSeasons();
                    $("#event-season-selector").val("").removeClass("custom-input");
                    $("#event-schedule-subitems").html("");
                    $(".custom-template-item").children().hide();
                }
            }).focus(function () {
                $(this).autocomplete("search", "");
            });

            spinner.hide();
        });
    }

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
        fillSports("#" + id, ContentArena.Data.TopSports, ContentArena.Data.FullSports);
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

    function onSelectAutocompleteTag(event, ui) {
        var terms = split(this.value);
        // remove the current input
        terms.pop();
        // add the selected item
        if (terms.indexOf(ui.item.label) === -1) terms.push(ui.item.label);
        // add placeholder to get the comma-and-space at the end
        terms.push("");
        this.value = terms.join(", ");

        $(event.target).blur();

        return false;
    }

    function resetSelector(selectors) {
        selectors.forEach(function (selector) {
            return $("#event-" + selector + "-selector").val("").attr('externalId', null);
        });
    }

    $("#add-sport-layer").on("click", addSportLayer);

    $(".go-to-rights").on("click", function () {

        if (!validateStepOne()) return;

        $("#step2").show();
        $("#step1").hide();

        window.onbeforeunload = confirmExit;
        function confirmExit() {
            console.log("leaving page");
            return "You have attempted to leave this page. Are you sure?";
        }
    });

    $("#event-customEnd-selector, #event-customStart-selector, #event-availability-selector, #expiration-date, .installment-date").datepicker();

    $('.file-selector').off().focus(function (e) {
        var targetId = "#" + $(this).attr("ref");
        $(this).blur();
        $(targetId).trigger("click");
        e.preventDefault();
    });

    $('#event-website-selector').mask("A", {
        translation: {
            "A": { pattern: /[\w/\-.+]/, recursive: true }
        }
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

    /**
     * Fills the sport selector
     */
    ContentArena.Api.getSports().done(function (sports) {
        ContentArena.Data.FullSports = sports;
        fillSports("#event-sport-selector", ContentArena.Data.TopSports, ContentArena.Data.FullSports, function (event, ui) {
            ContentArena.Content.sport = {
                value: ui.item.label,
                externalId: ui.item.value
            };

            if (ContentArena.Content.eventType === "custom") return;

            $("#event-schedule-subitems").html("");

            resetSelector(["category", "tournament", "season"]);
            fillTournaments();
        });
    });

    /**
     * Fills company users tagging tool
     */
    $.ajax({
        url: envhosturl + "v1/feed/company",
        type: "GET",

        success: function success(response) {
            /**
             * @param {{email:string}} item
             */
            var _source = $.map(response, function (item) {
                return { label: item.email, value: item.id };
            });

            $("#tag-members").autocomplete({
                source: function source(request, response) {
                    // delegate back to autocomplete, but extract the last term
                    response($.ui.autocomplete.filter(_source, extractLast(request.term)));
                },
                minLength: 0,
                select: onSelectAutocompleteTag
            }).focus(function () {
                $(this).autocomplete("search", "");
            });
        }
    });

    $(".package-ready-button").hide();
    $(".custom-template-item").hide();
    $(".step1-container").show();

    ContentArena.Test.validateStepOne = validateStepOne;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZXhlbnYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pbnZhcmlhbnQvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3RMaWtlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNQbGFpbk9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2NvbXBvbmVudHMvTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9jb21wb25lbnRzL01vZGFsUG9ydGFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9hcmlhQXBwSGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2NsYXNzTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvZm9jdXNNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9zYWZlSFRNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3Njb3BlVGFiLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy90YWJiYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL1Byb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9jb25uZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21hcERpc3BhdGNoVG9Qcm9wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tYXBTdGF0ZVRvUHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWVyZ2VQcm9wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9zZWxlY3RvckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvdmVyaWZ5U3Vic2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3dyYXBNYXBUb1Byb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvUHJvcFR5cGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9TdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3NoYWxsb3dFcXVhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvdmVyaWZ5UGxhaW5PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2FwcGx5TWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYmluZEFjdGlvbkNyZWF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21iaW5lUmVkdWNlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbXBvc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NyZWF0ZVN0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93YXJuaW5nL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL1NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9TZWxsRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvUGFja2FnZVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9TZWxsRm9ybVN0ZXAxLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9TZWxsRm9ybVN0ZXBzLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9idXR0b25zLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3NlbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zZWxsLnN0ZXAxLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvc2VsbC5zdGVwMi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3N0b3JlLmpzIl0sIm5hbWVzIjpbImN1c3RvbVN0eWxlcyIsImNvbnRlbnQiLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJtYXJnaW5SaWdodCIsInRyYW5zZm9ybSIsIk1vZGFsIiwic2V0QXBwRWxlbWVudCIsIlNlbGVjdG9ySXRlbSIsImxhYmVsIiwic2VsZWN0ZWQiLCJvbkNsaWNrIiwiU2VsZWN0b3IiLCJwcm9wcyIsImNvbXBvbmVudERpZE1vdW50Iiwib3Blbk1vZGFsIiwib3BlblNlbGVjdG9yIiwiYWZ0ZXJPcGVuTW9kYWwiLCJjbG9zZU1vZGFsIiwic2V0U3RhdGUiLCJ1cGRhdGVkIiwiY2xvc2VTZWxlY3RvciIsImdldEFjdGl2ZUZpbHRlciIsInN0YXRlIiwiZmlsdGVyIiwiYWN0aXZlRmlsdGVyIiwic2V0QWN0aXZlRmlsdGVyIiwiZmlsdGVyTmFtZSIsImFwcGx5U2VsZWN0aW9uIiwidHlwZSIsInNlbGVjdGVkSXRlbSIsInNlbGVjdEl0ZW0iLCJpdGVtIiwiaXNJdGVtU2VsZWN0ZWQiLCJleHRlcm5hbF9pZCIsInZhbHVlcyIsImluZGV4T2YiLCJuYW1lIiwidG9Mb3dlckNhc2UiLCJnZXRJdGVtcyIsInZhbHVlIiwiaXRlbXMiLCJvcGVuIiwic2VsZWN0b3IiLCJwb3B1bGFySXRlbXMiLCJzdG9yZSIsInN1YnNjcmliZSIsImEiLCJfdGhpcyIsIm1hcCIsImkiLCJSZWFjdCIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsInNlbGVjdG9ySW5mbyIsInNlbGVjdG9ySXRlbXMiLCJzZWxlY3RvclR5cGUiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsImNvbm5lY3QiLCJTZWxsRm9ybSIsImNvbnRlbnRMaXN0aW5nSW5pdCIsIkpTT04iLCJwYXJzZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRTdGF0ZSIsIm93blByb3BzIiwiU3VwZXJSaWdodCIsInN1cGVyUmlnaHQiLCJvbkNoYW5nZSIsImNoZWNrZWQiLCJpZCIsIlBhY2thZ2VTZWxlY3RvciIsInBhY2thZ2VzIiwic3RlcCIsIkNvbnRlbnRBcmVuYSIsIlV0aWxzIiwiZ2V0SW5kZXgiLCJyaWdodHNfcGFja2FnZSIsInN1cGVyUmlnaHRzVXBkYXRlZCIsInN1cGVyUmlnaHRzIiwiU2VsbEZvcm1TdGVwMSIsInRpdGxlIiwiaW5wdXRQcm9wcyIsInNwb3J0cyIsImxlbmd0aCIsIm9wZW5TcG9ydFNlbGVjdG9yIiwiRGF0YSIsIkZ1bGxTcG9ydHMiLCJUb3BTcG9ydHMiLCJTZWxsRm9ybVN0ZXAiLCJhY3RpdmUiLCJTZWxsRm9ybVN0ZXBzIiwic3RlcHMiLCJTZWxsQnV0dG9ucyIsInNhdmVBc0RyYWZ0Iiwic2F2aW5nIiwiQ29udGVudEFwaSIsInNhdmVDb250ZW50QXNEcmFmdCIsImRvbmUiLCJyZXNwb25zZSIsInNhdmluZ1N1Y2Nlc3MiLCJmYWlsIiwiZGF0ZSIsIkRhdGUiLCJsYXN0U3RlcCIsInNhdmVBc0RyYWZ0VGV4dCIsImdvVG9QcmV2aW91c1N0ZXAiLCJnb1RvTmV4dFN0ZXAiLCJhY3Rpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJzZWxlY3Rpb24iLCJpbmRleCIsInB1c2giLCJzcGxpY2UiLCJzZWxsRm9ybSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJSZWFjdERPTSIsInJlbmRlciIsImRhdGFzZXQiLCIkIiwidG9vbHRpcCIsImRhdGVwaWNrZXIiLCJvbiIsInJlbW92ZUNsYXNzIiwiaGlkZSIsIndpbmRvdyIsIk1vZGVsIiwiRm9ybSIsIlRlc3QiLCJhZGRDdXN0b21TZWFzb24iLCJjb250YWluZXJTZWxlY3RvciIsImNvbnRhaW5lciIsInNlYXNvbk51bWJlciIsInNvdXJjZSIsImF1dG9jb21wbGV0ZSIsImhhc1NlYXNvbiIsImxhYmVscyIsInNwbGl0Iiwic2Vhc29uWWVhciIsInBvcCIsImdldEZ1bGxZZWFyIiwic3RhcnRZZWFyIiwic2VhcmNoIiwiTnVtYmVyIiwiZW5kWWVhciIsInNlYXNvbk5hbWUiLCJqb2luIiwidGVtcGxhdGUiLCJ0ZW1wbGF0ZXMiLCJzZWFzb25EYXRhIiwic2Vhc29uRWxlbWVudCIsImFwcGVuZCIsInJlbW92ZSIsIkNvbnRlbnQiLCJyb3VuZHMiLCJ2YWwiLCJleHRyYWN0TGFzdCIsInRlcm0iLCJmaWxsU3BvcnRzIiwidG9wU3BvcnRzIiwiZnVsbFNwb3J0cyIsImNhbGxiYWNrIiwiZWwiLCJmdWxsU3BvcnRzTG9hZGVkIiwibWluTGVuZ3RoIiwiZGVsYXkiLCJldmVudCIsInRhcmdldCIsInNlbGVjdCIsInVpIiwicHJldmVudERlZmF1bHQiLCJzZXRUaW1lb3V0IiwiYWRkQ3VzdG9tVGVtcGxhdGUiLCJhdHRyIiwidHJpZ2dlciIsImFwcGx5IiwiYXJndW1lbnRzIiwiZm9jdXMiLCJmaWxsQ2F0ZWdvcmllcyIsInNwb3J0SWQiLCJzcGlubmVyIiwicGFyZW50IiwiZmluZCIsInNob3ciLCJkYXRhIiwib2ZmIiwiQXBpIiwiZ2V0Q2F0ZWdvcmllcyIsImNhdGVnb3JpZXMiLCJibHVyIiwiZmlsbFRvdXJuYW1lbnRzIiwiZWFjaCIsImsiLCJodG1sIiwic2lsZW50IiwiY2F0ZWdvcnlJZCIsImdldFRvdXJuYW1lbnRzIiwidG91cm5hbWVudHMiLCJ0b3VybmFtZW50IiwicmVwbGFjZSIsInJlcXVlc3QiLCJyZXN1bHRzIiwic2xpY2UiLCJmaWxsU2Vhc29ucyIsImNoaWxkcmVuIiwib3B0aW9ucyIsInBhcmVudFNlbGVjdGlvbiIsImVuZHBvaW50IiwicmVxdWVzdFR5cGUiLCJnZXRTb3VyY2UiLCJsaXN0Iiwic2Vhc29ucyIsInVuZGVmaW5lZCIsInNlYXNvbiIsImlzQXJyYXkiLCJyZXZlcnNlIiwiYWpheCIsInVybCIsImhvc3R1cmwiLCJzdWNjZXNzIiwiZ3JlcCIsInRvZ2dsZUNsYXNzIiwidG9nZ2xlIiwibmV4dCIsInVuc2hpZnQiLCJmaWxsU2NoZWR1bGUiLCJzcG9ydF9ldmVudHMiLCJzcG9ydF9ldmVudCIsInNlYXNvbl9pZCIsInJvdW5kIiwidG91cm5hbWVudF9yb3VuZCIsIm51bWJlciIsInJvdW5kTnVtYmVyIiwibWF0Y2giLCJzZWxJZCIsImF0dHJzIiwiY29tcGV0aXRvcnMiLCJjb21wZXRpdG9yIiwic2NoZWR1bGVkIiwidG9JU09TdHJpbmciLCJ2IiwiY2xpY2siLCJzdWJJdGVtSWQiLCJoYXNDbGFzcyIsImh0bWxJZFRvQXBpSWQiLCJ2YWxpZGF0ZVN0ZXBPbmUiLCJ3ZWJzaXRlIiwiaGFzRXJyb3JzIiwiaXRlbUlucHV0IiwicmVxdWlyZWQiLCJpcyIsImV4dGVybmFsSWQiLCJhZGRDbGFzcyIsImV2ZW50VHlwZSIsInNwb3J0IiwibWF0Y2hlcyIsIm1hdGNoZGF5IiwibWF0Y2hJZCIsImdldFRpdGxlIiwiYWRkQ3VzdG9tRm4iLCJwbGFjZWhvbGRlciIsImNhdGVnb3J5IiwiYWRkU3BvcnRMYXllciIsInNwb3J0U2VsZWN0b3IiLCJleHRyYVNwb3J0cyIsImh0bWxPdXRwdXQiLCJhZnRlciIsImxhc3QiLCJyZXNldFNlbGVjdG9yIiwiYWRkR2VuZXJpY0VwaXNvZGVzIiwicXVhbnRpdHkiLCJjdXJyZW50UXVhbnRpdHkiLCJzdGFydCIsImVtcHR5Iiwib25TZWxlY3RBdXRvY29tcGxldGVUYWciLCJ0ZXJtcyIsInNlbGVjdG9ycyIsImZvckVhY2giLCJvbmJlZm9yZXVubG9hZCIsImNvbmZpcm1FeGl0IiwiZSIsInRhcmdldElkIiwibWFzayIsInRyYW5zbGF0aW9uIiwicGF0dGVybiIsInJlY3Vyc2l2ZSIsImNoZWNrRmlsZVR5cGUiLCJhbGxvd2VkRXh0ZW5zaW9ucyIsImVycm9yIiwiZGlhbG9nIiwiZ2V0U3BvcnRzIiwiZW52aG9zdHVybCIsImVtYWlsIiwic2libGluZ3MiLCJpbnB1dCIsInByb3AiLCJjb250ZXh0Iiwic2VsZWN0b3JTaG93IiwibmV3UXVhbnRpdHkiLCJsb2NhdGlvbiIsInNlbGVjdG9yQ291bnRlciIsIm1haW5QYWNrYWdlIiwiZ2V0U2VsZWN0ZWRGdWxsUGFja2FnZXMiLCJwYWNrIiwiZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXMiLCJzZWxlY3RlZElkcyIsInNlbGVjdGVkTmFtZXMiLCJnZXRJZEJ5TmFtZSIsImNvbGxlY3RTZWxlY3RlZFJpZ2h0SXRlbXMiLCJzZWxlY3RlZFJpZ2h0IiwiU2VsZWN0ZWRSaWdodCIsInJpZ2h0SXRlbSIsImdyb3VwIiwia2V5IiwiZWxlbWVudCIsImlucHV0cyIsImNvbGxlY3RTZWxlY3RlZFJpZ2h0cyIsInNlbGVjdGVkUmlnaHRzIiwic2VsZWN0ZWRQYWNrYWdlcyIsIm11bHRpcGxlIiwic2luZ2xlIiwiY29uY2F0IiwidmFsaWRhdGVTYWxlc1BhY2thZ2VzIiwicGFja2FnZUNvbnRhaW5lciIsInNhbGVzUGFja2FnZSIsIlNhbGVzUGFja2FnZSIsInRlcnJpdG9yaWVzIiwic2FsZXNNZXRob2QiLCJjdXJyZW5jeSIsImZlZSIsInRlcnJpdG9yeUJpZHMiLCJ0ZXJyaXRvcnlBc1BhY2thZ2UiLCJzZWxlY3RlZFRlcnJpdG9yaWVzIiwiY2hvc2VuIiwiZXhjbHVkZWRUZXJyaXRvcmllcyIsInZhbGlkYXRlU3RlcFR3byIsIm1lc3NhZ2VzIiwiZXhwaXJhdGlvbkRhdGUiLCJyaWdodHMiLCJtZXNzYWdlc0NvbnRhaW5lciIsInRvdGFsIiwiaW5zdGFsbG1lbnRzIiwiY29sbGVjdEluc3RhbGxtZW50cyIsInNhbGVzUGFja2FnZXMiLCJ2YWxpZCIsInZhbGlkYXRlIiwiZGVzY3JpcHRpb24iLCJleHBpcmVzQXQiLCJtaW5XaWR0aCIsImFkZFNhbGVzUGFja2FnZSIsImFkZFJlZ2lvbkJlaGF2aW91ciIsInNldHVwSW5zdGFsbG1lbnQiLCJpbnN0YWxsbWVudCIsInBlcmNlbnQiLCJzaWduaW5nX2RheSIsImdyYW50ZWRfZGF5Iiwic3VibWl0Zm9ybSIsImZvcm0iLCJzdHJpbmdpZnkiLCJhcHBlbmRUbyIsInN1Ym1pdCIsImpzb24iLCJwb3MiLCJjbG9uZSIsImFkZE9yZGluYWwiLCJpbnNlcnRBZnRlciIsImNyZWF0ZVN0b3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFBQTtBQUNILEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN2Q0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7O0FBRWxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ3ZFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsNkJBQTZCO0FBQzdCLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixLQUFLO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCO0FBQzVCLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzNCQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLG1EQUFtRCxnQkFBZ0Isc0JBQXNCLE9BQU8sMkJBQTJCLDBCQUEwQix5REFBeUQsMkJBQTJC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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sSUFBSTtBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDO0FBQ3hDLCtDQUErQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0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RUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7OztBQzdGQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3Rjs7QUFFQTs7QUFFQTs7QUFFQSxrQzs7Ozs7Ozs7Ozs7OztBQ25CQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7Ozs7OztBQzVFQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9DOzs7Ozs7Ozs7Ozs7O0FDekRBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBOztBQUVBLHNDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBLG9DOzs7Ozs7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O0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7OztBQ3JHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEJBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xFbUM7QUFDbkM7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFOzs7Ozs7Ozs7Ozs7O0FDYkQ7QUFBQSxpREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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RixDQUFPeEUsRUFBRSxtQkFBRixDQUFQLEVBQStCLFVBQVV6RSxDQUFWLEVBQWFpUSxJQUFiLEVBQW1COztBQUU5Q0EsaUJBQUs1TyxPQUFMLEdBQWUsS0FBZjtBQUNBb0QsY0FBRXdMLElBQUYsRUFBUWxJLElBQVIsQ0FBYSxVQUFiLEVBQXlCLElBQXpCO0FBQ0F0RCxjQUFFd0wsSUFBRixFQUFRMUgsTUFBUixHQUFpQjBDLElBQWpCLEdBQXdCcEcsV0FBeEIsQ0FBb0MsVUFBcEM7QUFDQUosY0FBRSxnQkFBRixFQUFvQkssSUFBcEI7QUFDQUwsY0FBRSw0QkFBRixFQUFnQ0ssSUFBaEM7QUFDQUwsY0FBRSxpQkFBRixFQUFxQkssSUFBckI7QUFDQUwsY0FBRSxpQkFBRixFQUFxQkssSUFBckI7QUFDQUwsY0FBRSx1QkFBRixFQUEyQkssSUFBM0I7QUFDQWdMLDhCQUFrQixDQUFsQjtBQUdILFNBYkQ7QUFjSCxLQWZEOztBQWlCQTs7Ozs7Ozs7Ozs7O0FBZUFyTCxNQUFFTCxRQUFGLEVBQVlRLEVBQVosQ0FBZSxPQUFmLEVBQXVCLG9CQUF2QixFQUE2QyxZQUFZO0FBQ3JEbU87QUFDSCxLQUZEOztBQUlBclIsaUJBQWF3RCxJQUFiLENBQWtCK00sZUFBbEIsR0FBb0NBLGVBQXBDO0FBQ0F2USxpQkFBYXdELElBQWIsQ0FBa0JnTCx1QkFBbEIsR0FBNENBLHVCQUE1Qzs7QUFFQTs7O0FBR0ErQztBQUNBRjtBQUVILENBdGxCRCxFOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQUE7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUEseURBQWUsa0VBQUFpQixDQUFZLGtFQUFaLENBQWYsRSIsImZpbGUiOiJzZWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNSBKZWQgV2F0c29uLlxuICBCYXNlZCBvbiBjb2RlIHRoYXQgaXMgQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgY2FuVXNlRE9NID0gISEoXG5cdFx0dHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcblx0XHR3aW5kb3cuZG9jdW1lbnQgJiZcblx0XHR3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudFxuXHQpO1xuXG5cdHZhciBFeGVjdXRpb25FbnZpcm9ubWVudCA9IHtcblxuXHRcdGNhblVzZURPTTogY2FuVXNlRE9NLFxuXG5cdFx0Y2FuVXNlV29ya2VyczogdHlwZW9mIFdvcmtlciAhPT0gJ3VuZGVmaW5lZCcsXG5cblx0XHRjYW5Vc2VFdmVudExpc3RlbmVyczpcblx0XHRcdGNhblVzZURPTSAmJiAhISh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciB8fCB3aW5kb3cuYXR0YWNoRXZlbnQpLFxuXG5cdFx0Y2FuVXNlVmlld3BvcnQ6IGNhblVzZURPTSAmJiAhIXdpbmRvdy5zY3JlZW5cblxuXHR9O1xuXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBFeGVjdXRpb25FbnZpcm9ubWVudDtcblx0XHR9KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gRXhlY3V0aW9uRW52aXJvbm1lbnQ7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LkV4ZWN1dGlvbkVudmlyb25tZW50ID0gRXhlY3V0aW9uRW52aXJvbm1lbnQ7XG5cdH1cblxufSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2V4ZW52L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9leGVudi9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAgIChnbG9iYWwuaG9pc3ROb25SZWFjdFN0YXRpY3MgPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBcbiAgICB2YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgICAgICAgY2hpbGRDb250ZXh0VHlwZXM6IHRydWUsXG4gICAgICAgIGNvbnRleHRUeXBlczogdHJ1ZSxcbiAgICAgICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgICAgICBkaXNwbGF5TmFtZTogdHJ1ZSxcbiAgICAgICAgZ2V0RGVmYXVsdFByb3BzOiB0cnVlLFxuICAgICAgICBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHM6IHRydWUsXG4gICAgICAgIG1peGluczogdHJ1ZSxcbiAgICAgICAgcHJvcFR5cGVzOiB0cnVlLFxuICAgICAgICB0eXBlOiB0cnVlXG4gICAgfTtcbiAgICBcbiAgICB2YXIgS05PV05fU1RBVElDUyA9IHtcbiAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgbGVuZ3RoOiB0cnVlLFxuICAgICAgICBwcm90b3R5cGU6IHRydWUsXG4gICAgICAgIGNhbGxlcjogdHJ1ZSxcbiAgICAgICAgY2FsbGVlOiB0cnVlLFxuICAgICAgICBhcmd1bWVudHM6IHRydWUsXG4gICAgICAgIGFyaXR5OiB0cnVlXG4gICAgfTtcbiAgICBcbiAgICB2YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4gICAgdmFyIGdldE93blByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiAgICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgICB2YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gICAgdmFyIG9iamVjdFByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mICYmIGdldFByb3RvdHlwZU9mKE9iamVjdCk7XG4gICAgXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50LCBibGFja2xpc3QpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7IC8vIGRvbid0IGhvaXN0IG92ZXIgc3RyaW5nIChodG1sKSBjb21wb25lbnRzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5oZXJpdGVkQ29tcG9uZW50ID0gZ2V0UHJvdG90eXBlT2Yoc291cmNlQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5oZXJpdGVkQ29tcG9uZW50ICYmIGluaGVyaXRlZENvbXBvbmVudCAhPT0gb2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgaW5oZXJpdGVkQ29tcG9uZW50LCBibGFja2xpc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZUNvbXBvbmVudCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZUNvbXBvbmVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIVJFQUNUX1NUQVRJQ1Nba2V5XSAmJiAhS05PV05fU1RBVElDU1trZXldICYmICghYmxhY2tsaXN0IHx8ICFibGFja2xpc3Rba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlQ29tcG9uZW50LCBrZXkpO1xuICAgICAgICAgICAgICAgICAgICB0cnkgeyAvLyBBdm9pZCBmYWlsdXJlcyBmcm9tIHJlYWQtb25seSBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXRDb21wb25lbnQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xuICAgIH07XG59KSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24oY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24oKSB7IHJldHVybiBhcmdzW2FyZ0luZGV4KytdOyB9KVxuICAgICAgKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ludmFyaWFudC9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9pbnZhcmlhbnQvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbmV4cG9ydCBkZWZhdWx0IFN5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgZ2V0UmF3VGFnIGZyb20gJy4vX2dldFJhd1RhZy5qcyc7XG5pbXBvcnQgb2JqZWN0VG9TdHJpbmcgZnJvbSAnLi9fb2JqZWN0VG9TdHJpbmcuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldFRhZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbmV4cG9ydCBkZWZhdWx0IGZyZWVHbG9iYWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2ZyZWVHbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UHJvdG90eXBlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFByb3RvdHlwZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0UmF3VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb2JqZWN0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJBcmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJBcmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlckFyZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgZnJlZUdsb2JhbCBmcm9tICcuL19mcmVlR2xvYmFsLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5leHBvcnQgZGVmYXVsdCByb290O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19yb290LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3Jvb3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0TGlrZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgZ2V0UHJvdG90eXBlIGZyb20gJy4vX2dldFByb3RvdHlwZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiZcbiAgICBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1BsYWluT2JqZWN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLFxuICAgICAgICAgICAgICBwcm9wRnVsbE5hbWUsXG4gICAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAlcyBhdCBpbmRleCAlcy4nLFxuICAgICAgICAgIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSxcbiAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiZcbiAgICBTeW1ib2wuZm9yICYmXG4gICAgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpKSB8fFxuICAgIDB4ZWFjNztcblxuICB2YXIgaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIG9iamVjdCAhPT0gbnVsbCAmJlxuICAgICAgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG4gIH07XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuYm9keU9wZW5DbGFzc05hbWUgPSBleHBvcnRzLnBvcnRhbENsYXNzTmFtZSA9IHVuZGVmaW5lZDtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKFwicmVhY3QtZG9tXCIpO1xuXG52YXIgX3JlYWN0RG9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0RG9tKTtcblxudmFyIF9wcm9wVHlwZXMgPSByZXF1aXJlKFwicHJvcC10eXBlc1wiKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxudmFyIF9Nb2RhbFBvcnRhbCA9IHJlcXVpcmUoXCIuL01vZGFsUG9ydGFsXCIpO1xuXG52YXIgX01vZGFsUG9ydGFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX01vZGFsUG9ydGFsKTtcblxudmFyIF9hcmlhQXBwSGlkZXIgPSByZXF1aXJlKFwiLi4vaGVscGVycy9hcmlhQXBwSGlkZXJcIik7XG5cbnZhciBhcmlhQXBwSGlkZXIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfYXJpYUFwcEhpZGVyKTtcblxudmFyIF9zYWZlSFRNTEVsZW1lbnQgPSByZXF1aXJlKFwiLi4vaGVscGVycy9zYWZlSFRNTEVsZW1lbnRcIik7XG5cbnZhciBfc2FmZUhUTUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NhZmVIVE1MRWxlbWVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIHBvcnRhbENsYXNzTmFtZSA9IGV4cG9ydHMucG9ydGFsQ2xhc3NOYW1lID0gXCJSZWFjdE1vZGFsUG9ydGFsXCI7XG52YXIgYm9keU9wZW5DbGFzc05hbWUgPSBleHBvcnRzLmJvZHlPcGVuQ2xhc3NOYW1lID0gXCJSZWFjdE1vZGFsX19Cb2R5LS1vcGVuXCI7XG5cbnZhciBpc1JlYWN0MTYgPSBfcmVhY3REb20yLmRlZmF1bHQuY3JlYXRlUG9ydGFsICE9PSB1bmRlZmluZWQ7XG52YXIgY3JlYXRlUG9ydGFsID0gaXNSZWFjdDE2ID8gX3JlYWN0RG9tMi5kZWZhdWx0LmNyZWF0ZVBvcnRhbCA6IF9yZWFjdERvbTIuZGVmYXVsdC51bnN0YWJsZV9yZW5kZXJTdWJ0cmVlSW50b0NvbnRhaW5lcjtcblxuZnVuY3Rpb24gZ2V0UGFyZW50RWxlbWVudChwYXJlbnRTZWxlY3Rvcikge1xuICByZXR1cm4gcGFyZW50U2VsZWN0b3IoKTtcbn1cblxudmFyIE1vZGFsID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKE1vZGFsLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBNb2RhbCgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBfdGVtcCwgX3RoaXMsIF9yZXQ7XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kYWwpO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZXQgPSAoX3RlbXAgPSAoX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoX3JlZiA9IE1vZGFsLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTW9kYWwpKS5jYWxsLmFwcGx5KF9yZWYsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5yZW1vdmVQb3J0YWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAhaXNSZWFjdDE2ICYmIF9yZWFjdERvbTIuZGVmYXVsdC51bm1vdW50Q29tcG9uZW50QXROb2RlKF90aGlzLm5vZGUpO1xuICAgICAgdmFyIHBhcmVudCA9IGdldFBhcmVudEVsZW1lbnQoX3RoaXMucHJvcHMucGFyZW50U2VsZWN0b3IpO1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKF90aGlzLm5vZGUpO1xuICAgIH0sIF90aGlzLnBvcnRhbFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIF90aGlzLnBvcnRhbCA9IHJlZjtcbiAgICB9LCBfdGhpcy5yZW5kZXJQb3J0YWwgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgIHZhciBwb3J0YWwgPSBjcmVhdGVQb3J0YWwoX3RoaXMsIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Nb2RhbFBvcnRhbDIuZGVmYXVsdCwgX2V4dGVuZHMoeyBkZWZhdWx0U3R5bGVzOiBNb2RhbC5kZWZhdWx0U3R5bGVzIH0sIHByb3BzKSksIF90aGlzLm5vZGUpO1xuICAgICAgX3RoaXMucG9ydGFsUmVmKHBvcnRhbCk7XG4gICAgfSwgX3RlbXApLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTW9kYWwsIFt7XG4gICAga2V5OiBcImNvbXBvbmVudERpZE1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgaWYgKCFfc2FmZUhUTUxFbGVtZW50LmNhblVzZURPTSkgcmV0dXJuO1xuXG4gICAgICBpZiAoIWlzUmVhY3QxNikge1xuICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgfVxuICAgICAgdGhpcy5ub2RlLmNsYXNzTmFtZSA9IHRoaXMucHJvcHMucG9ydGFsQ2xhc3NOYW1lO1xuXG4gICAgICB2YXIgcGFyZW50ID0gZ2V0UGFyZW50RWxlbWVudCh0aGlzLnByb3BzLnBhcmVudFNlbGVjdG9yKTtcbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLm5vZGUpO1xuXG4gICAgICAhaXNSZWFjdDE2ICYmIHRoaXMucmVuZGVyUG9ydGFsKHRoaXMucHJvcHMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgIGlmICghX3NhZmVIVE1MRWxlbWVudC5jYW5Vc2VET00pIHJldHVybjtcbiAgICAgIHZhciBpc09wZW4gPSBuZXdQcm9wcy5pc09wZW47XG4gICAgICAvLyBTdG9wIHVubmVjZXNzYXJ5IHJlbmRlcnMgaWYgbW9kYWwgaXMgcmVtYWluaW5nIGNsb3NlZFxuXG4gICAgICBpZiAoIXRoaXMucHJvcHMuaXNPcGVuICYmICFpc09wZW4pIHJldHVybjtcblxuICAgICAgdmFyIGN1cnJlbnRQYXJlbnQgPSBnZXRQYXJlbnRFbGVtZW50KHRoaXMucHJvcHMucGFyZW50U2VsZWN0b3IpO1xuICAgICAgdmFyIG5ld1BhcmVudCA9IGdldFBhcmVudEVsZW1lbnQobmV3UHJvcHMucGFyZW50U2VsZWN0b3IpO1xuXG4gICAgICBpZiAobmV3UGFyZW50ICE9PSBjdXJyZW50UGFyZW50KSB7XG4gICAgICAgIGN1cnJlbnRQYXJlbnQucmVtb3ZlQ2hpbGQodGhpcy5ub2RlKTtcbiAgICAgICAgbmV3UGFyZW50LmFwcGVuZENoaWxkKHRoaXMubm9kZSk7XG4gICAgICB9XG5cbiAgICAgICFpc1JlYWN0MTYgJiYgdGhpcy5yZW5kZXJQb3J0YWwobmV3UHJvcHMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsVXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVcGRhdGUobmV3UHJvcHMpIHtcbiAgICAgIGlmICghX3NhZmVIVE1MRWxlbWVudC5jYW5Vc2VET00pIHJldHVybjtcbiAgICAgIGlmIChuZXdQcm9wcy5wb3J0YWxDbGFzc05hbWUgIT09IHRoaXMucHJvcHMucG9ydGFsQ2xhc3NOYW1lKSB7XG4gICAgICAgIHRoaXMubm9kZS5jbGFzc05hbWUgPSBuZXdQcm9wcy5wb3J0YWxDbGFzc05hbWU7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbXBvbmVudFdpbGxVbm1vdW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKCFfc2FmZUhUTUxFbGVtZW50LmNhblVzZURPTSB8fCAhdGhpcy5ub2RlIHx8ICF0aGlzLnBvcnRhbCkgcmV0dXJuO1xuXG4gICAgICB2YXIgc3RhdGUgPSB0aGlzLnBvcnRhbC5zdGF0ZTtcbiAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgdmFyIGNsb3Nlc0F0ID0gc3RhdGUuaXNPcGVuICYmIHRoaXMucHJvcHMuY2xvc2VUaW1lb3V0TVMgJiYgKHN0YXRlLmNsb3Nlc0F0IHx8IG5vdyArIHRoaXMucHJvcHMuY2xvc2VUaW1lb3V0TVMpO1xuXG4gICAgICBpZiAoY2xvc2VzQXQpIHtcbiAgICAgICAgaWYgKCFzdGF0ZS5iZWZvcmVDbG9zZSkge1xuICAgICAgICAgIHRoaXMucG9ydGFsLmNsb3NlV2l0aFRpbWVvdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5yZW1vdmVQb3J0YWwsIGNsb3Nlc0F0IC0gbm93KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlUG9ydGFsKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInJlbmRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICBpZiAoIV9zYWZlSFRNTEVsZW1lbnQuY2FuVXNlRE9NIHx8ICFpc1JlYWN0MTYpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5ub2RlICYmIGlzUmVhY3QxNikge1xuICAgICAgICB0aGlzLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3JlYXRlUG9ydGFsKF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9Nb2RhbFBvcnRhbDIuZGVmYXVsdCwgX2V4dGVuZHMoe1xuICAgICAgICByZWY6IHRoaXMucG9ydGFsUmVmLFxuICAgICAgICBkZWZhdWx0U3R5bGVzOiBNb2RhbC5kZWZhdWx0U3R5bGVzXG4gICAgICB9LCB0aGlzLnByb3BzKSksIHRoaXMubm9kZSk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwic2V0QXBwRWxlbWVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRBcHBFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgIGFyaWFBcHBIaWRlci5zZXRFbGVtZW50KGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzICovXG5cbiAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzICovXG5cbiAgfV0pO1xuXG4gIHJldHVybiBNb2RhbDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbk1vZGFsLnByb3BUeXBlcyA9IHtcbiAgaXNPcGVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wuaXNSZXF1aXJlZCxcbiAgc3R5bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc2hhcGUoe1xuICAgIGNvbnRlbnQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICAgIG92ZXJsYXk6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0XG4gIH0pLFxuICBwb3J0YWxDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBib2R5T3BlbkNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsXG4gIGh0bWxPcGVuQ2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgY2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIF9wcm9wVHlwZXMyLmRlZmF1bHQuc2hhcGUoe1xuICAgIGJhc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYWZ0ZXJPcGVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGJlZm9yZUNsb3NlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZy5pc1JlcXVpcmVkXG4gIH0pXSksXG4gIG92ZXJsYXlDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFtfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgX3Byb3BUeXBlczIuZGVmYXVsdC5zaGFwZSh7XG4gICAgYmFzZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBhZnRlck9wZW46IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYmVmb3JlQ2xvc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLmlzUmVxdWlyZWRcbiAgfSldKSxcbiAgYXBwRWxlbWVudDogX3Byb3BUeXBlczIuZGVmYXVsdC5pbnN0YW5jZU9mKF9zYWZlSFRNTEVsZW1lbnQyLmRlZmF1bHQpLFxuICBvbkFmdGVyT3BlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuICBvblJlcXVlc3RDbG9zZTogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuICBjbG9zZVRpbWVvdXRNUzogX3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXIsXG4gIGFyaWFIaWRlQXBwOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIHNob3VsZEZvY3VzQWZ0ZXJSZW5kZXI6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgc2hvdWxkQ2xvc2VPbk92ZXJsYXlDbGljazogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBzaG91bGRSZXR1cm5Gb2N1c0FmdGVyQ2xvc2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgcGFyZW50U2VsZWN0b3I6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcbiAgYXJpYTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3QsXG4gIHJvbGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBjb250ZW50TGFiZWw6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBzaG91bGRDbG9zZU9uRXNjOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIG92ZXJsYXlSZWY6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYyxcbiAgY29udGVudFJlZjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jXG59O1xuTW9kYWwuZGVmYXVsdFByb3BzID0ge1xuICBpc09wZW46IGZhbHNlLFxuICBwb3J0YWxDbGFzc05hbWU6IHBvcnRhbENsYXNzTmFtZSxcbiAgYm9keU9wZW5DbGFzc05hbWU6IGJvZHlPcGVuQ2xhc3NOYW1lLFxuICBhcmlhSGlkZUFwcDogdHJ1ZSxcbiAgY2xvc2VUaW1lb3V0TVM6IDAsXG4gIHNob3VsZEZvY3VzQWZ0ZXJSZW5kZXI6IHRydWUsXG4gIHNob3VsZENsb3NlT25Fc2M6IHRydWUsXG4gIHNob3VsZENsb3NlT25PdmVybGF5Q2xpY2s6IHRydWUsXG4gIHNob3VsZFJldHVybkZvY3VzQWZ0ZXJDbG9zZTogdHJ1ZSxcbiAgcGFyZW50U2VsZWN0b3I6IGZ1bmN0aW9uIHBhcmVudFNlbGVjdG9yKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xuICB9XG59O1xuTW9kYWwuZGVmYXVsdFN0eWxlcyA9IHtcbiAgb3ZlcmxheToge1xuICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgdG9wOiAwLFxuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpXCJcbiAgfSxcbiAgY29udGVudDoge1xuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgdG9wOiBcIjQwcHhcIixcbiAgICBsZWZ0OiBcIjQwcHhcIixcbiAgICByaWdodDogXCI0MHB4XCIsXG4gICAgYm90dG9tOiBcIjQwcHhcIixcbiAgICBib3JkZXI6IFwiMXB4IHNvbGlkICNjY2NcIixcbiAgICBiYWNrZ3JvdW5kOiBcIiNmZmZcIixcbiAgICBvdmVyZmxvdzogXCJhdXRvXCIsXG4gICAgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6IFwidG91Y2hcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgb3V0bGluZTogXCJub25lXCIsXG4gICAgcGFkZGluZzogXCIyMHB4XCJcbiAgfVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IE1vZGFsO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9jb21wb25lbnRzL01vZGFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvY29tcG9uZW50cy9Nb2RhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9wcm9wVHlwZXMgPSByZXF1aXJlKFwicHJvcC10eXBlc1wiKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxudmFyIF9mb2N1c01hbmFnZXIgPSByZXF1aXJlKFwiLi4vaGVscGVycy9mb2N1c01hbmFnZXJcIik7XG5cbnZhciBmb2N1c01hbmFnZXIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZm9jdXNNYW5hZ2VyKTtcblxudmFyIF9zY29wZVRhYiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3Njb3BlVGFiXCIpO1xuXG52YXIgX3Njb3BlVGFiMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Njb3BlVGFiKTtcblxudmFyIF9hcmlhQXBwSGlkZXIgPSByZXF1aXJlKFwiLi4vaGVscGVycy9hcmlhQXBwSGlkZXJcIik7XG5cbnZhciBhcmlhQXBwSGlkZXIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfYXJpYUFwcEhpZGVyKTtcblxudmFyIF9jbGFzc0xpc3QgPSByZXF1aXJlKFwiLi4vaGVscGVycy9jbGFzc0xpc3RcIik7XG5cbnZhciBjbGFzc0xpc3QgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfY2xhc3NMaXN0KTtcblxudmFyIF9zYWZlSFRNTEVsZW1lbnQgPSByZXF1aXJlKFwiLi4vaGVscGVycy9zYWZlSFRNTEVsZW1lbnRcIik7XG5cbnZhciBfc2FmZUhUTUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NhZmVIVE1MRWxlbWVudCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLy8gc28gdGhhdCBvdXIgQ1NTIGlzIHN0YXRpY2FsbHkgYW5hbHl6YWJsZVxudmFyIENMQVNTX05BTUVTID0ge1xuICBvdmVybGF5OiBcIlJlYWN0TW9kYWxfX092ZXJsYXlcIixcbiAgY29udGVudDogXCJSZWFjdE1vZGFsX19Db250ZW50XCJcbn07XG5cbnZhciBUQUJfS0VZID0gOTtcbnZhciBFU0NfS0VZID0gMjc7XG5cbnZhciBhcmlhSGlkZGVuSW5zdGFuY2VzID0gMDtcblxudmFyIE1vZGFsUG9ydGFsID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKE1vZGFsUG9ydGFsLCBfQ29tcG9uZW50KTtcblxuICBmdW5jdGlvbiBNb2RhbFBvcnRhbChwcm9wcykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNb2RhbFBvcnRhbCk7XG5cbiAgICB2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoTW9kYWxQb3J0YWwuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihNb2RhbFBvcnRhbCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuICAgIF90aGlzLnNldEZvY3VzQWZ0ZXJSZW5kZXIgPSBmdW5jdGlvbiAoZm9jdXMpIHtcbiAgICAgIF90aGlzLmZvY3VzQWZ0ZXJSZW5kZXIgPSBfdGhpcy5wcm9wcy5zaG91bGRGb2N1c0FmdGVyUmVuZGVyICYmIGZvY3VzO1xuICAgIH07XG5cbiAgICBfdGhpcy5zZXRPdmVybGF5UmVmID0gZnVuY3Rpb24gKG92ZXJsYXkpIHtcbiAgICAgIF90aGlzLm92ZXJsYXkgPSBvdmVybGF5O1xuICAgICAgX3RoaXMucHJvcHMub3ZlcmxheVJlZiAmJiBfdGhpcy5wcm9wcy5vdmVybGF5UmVmKG92ZXJsYXkpO1xuICAgIH07XG5cbiAgICBfdGhpcy5zZXRDb250ZW50UmVmID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgIF90aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgX3RoaXMucHJvcHMuY29udGVudFJlZiAmJiBfdGhpcy5wcm9wcy5jb250ZW50UmVmKGNvbnRlbnQpO1xuICAgIH07XG5cbiAgICBfdGhpcy5hZnRlckNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG4gICAgICAgICAgYXBwRWxlbWVudCA9IF90aGlzJHByb3BzLmFwcEVsZW1lbnQsXG4gICAgICAgICAgYXJpYUhpZGVBcHAgPSBfdGhpcyRwcm9wcy5hcmlhSGlkZUFwcCxcbiAgICAgICAgICBodG1sT3BlbkNsYXNzTmFtZSA9IF90aGlzJHByb3BzLmh0bWxPcGVuQ2xhc3NOYW1lLFxuICAgICAgICAgIGJvZHlPcGVuQ2xhc3NOYW1lID0gX3RoaXMkcHJvcHMuYm9keU9wZW5DbGFzc05hbWU7XG5cbiAgICAgIC8vIFJlbW92ZSBjbGFzc2VzLlxuXG4gICAgICBjbGFzc0xpc3QucmVtb3ZlKGRvY3VtZW50LmJvZHksIGJvZHlPcGVuQ2xhc3NOYW1lKTtcblxuICAgICAgaHRtbE9wZW5DbGFzc05hbWUgJiYgY2xhc3NMaXN0LnJlbW92ZShkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImh0bWxcIilbMF0sIGh0bWxPcGVuQ2xhc3NOYW1lKTtcblxuICAgICAgLy8gUmVzZXQgYXJpYS1oaWRkZW4gYXR0cmlidXRlIGlmIGFsbCBtb2RhbHMgaGF2ZSBiZWVuIHJlbW92ZWRcbiAgICAgIGlmIChhcmlhSGlkZUFwcCAmJiBhcmlhSGlkZGVuSW5zdGFuY2VzID4gMCkge1xuICAgICAgICBhcmlhSGlkZGVuSW5zdGFuY2VzIC09IDE7XG5cbiAgICAgICAgaWYgKGFyaWFIaWRkZW5JbnN0YW5jZXMgPT09IDApIHtcbiAgICAgICAgICBhcmlhQXBwSGlkZXIuc2hvdyhhcHBFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMucHJvcHMuc2hvdWxkRm9jdXNBZnRlclJlbmRlcikge1xuICAgICAgICBpZiAoX3RoaXMucHJvcHMuc2hvdWxkUmV0dXJuRm9jdXNBZnRlckNsb3NlKSB7XG4gICAgICAgICAgZm9jdXNNYW5hZ2VyLnJldHVybkZvY3VzKCk7XG4gICAgICAgICAgZm9jdXNNYW5hZ2VyLnRlYXJkb3duU2NvcGVkRm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb2N1c01hbmFnZXIucG9wV2l0aG91dEZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoaXMub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmJlZm9yZU9wZW4oKTtcbiAgICAgIGlmIChfdGhpcy5zdGF0ZS5hZnRlck9wZW4gJiYgX3RoaXMuc3RhdGUuYmVmb3JlQ2xvc2UpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLmNsb3NlVGltZXIpO1xuICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IGJlZm9yZUNsb3NlOiBmYWxzZSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChfdGhpcy5wcm9wcy5zaG91bGRGb2N1c0FmdGVyUmVuZGVyKSB7XG4gICAgICAgICAgZm9jdXNNYW5hZ2VyLnNldHVwU2NvcGVkRm9jdXMoX3RoaXMubm9kZSk7XG4gICAgICAgICAgZm9jdXNNYW5hZ2VyLm1hcmtGb3JGb2N1c0xhdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogdHJ1ZSB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBhZnRlck9wZW46IHRydWUgfSk7XG5cbiAgICAgICAgICBpZiAoX3RoaXMucHJvcHMuaXNPcGVuICYmIF90aGlzLnByb3BzLm9uQWZ0ZXJPcGVuKSB7XG4gICAgICAgICAgICBfdGhpcy5wcm9wcy5vbkFmdGVyT3BlbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKF90aGlzLnByb3BzLmNsb3NlVGltZW91dE1TID4gMCkge1xuICAgICAgICBfdGhpcy5jbG9zZVdpdGhUaW1lb3V0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5jbG9zZVdpdGhvdXRUaW1lb3V0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmZvY3VzQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfdGhpcy5jb250ZW50ICYmICFfdGhpcy5jb250ZW50SGFzRm9jdXMoKSAmJiBfdGhpcy5jb250ZW50LmZvY3VzKCk7XG4gICAgfTtcblxuICAgIF90aGlzLmNsb3NlV2l0aFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY2xvc2VzQXQgPSBEYXRlLm5vdygpICsgX3RoaXMucHJvcHMuY2xvc2VUaW1lb3V0TVM7XG4gICAgICBfdGhpcy5zZXRTdGF0ZSh7IGJlZm9yZUNsb3NlOiB0cnVlLCBjbG9zZXNBdDogY2xvc2VzQXQgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpcy5jbG9zZVRpbWVyID0gc2V0VGltZW91dChfdGhpcy5jbG9zZVdpdGhvdXRUaW1lb3V0LCBfdGhpcy5zdGF0ZS5jbG9zZXNBdCAtIERhdGUubm93KCkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF90aGlzLmNsb3NlV2l0aG91dFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGJlZm9yZUNsb3NlOiBmYWxzZSxcbiAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgICAgYWZ0ZXJPcGVuOiBmYWxzZSxcbiAgICAgICAgY2xvc2VzQXQ6IG51bGxcbiAgICAgIH0sIF90aGlzLmFmdGVyQ2xvc2UpO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVLZXlEb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gVEFCX0tFWSkge1xuICAgICAgICAoMCwgX3Njb3BlVGFiMi5kZWZhdWx0KShfdGhpcy5jb250ZW50LCBldmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpcy5wcm9wcy5zaG91bGRDbG9zZU9uRXNjICYmIGV2ZW50LmtleUNvZGUgPT09IEVTQ19LRVkpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIF90aGlzLnJlcXVlc3RDbG9zZShldmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZU92ZXJsYXlPbkNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoX3RoaXMuc2hvdWxkQ2xvc2UgPT09IG51bGwpIHtcbiAgICAgICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMuc2hvdWxkQ2xvc2UgJiYgX3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPbk92ZXJsYXlDbGljaykge1xuICAgICAgICBpZiAoX3RoaXMub3duZXJIYW5kbGVzQ2xvc2UoKSkge1xuICAgICAgICAgIF90aGlzLnJlcXVlc3RDbG9zZShldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuZm9jdXNDb250ZW50KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF90aGlzLnNob3VsZENsb3NlID0gbnVsbDtcbiAgICAgIF90aGlzLm1vdmVGcm9tQ29udGVudFRvT3ZlcmxheSA9IG51bGw7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZU92ZXJsYXlPbk1vdXNlVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoX3RoaXMubW92ZUZyb21Db250ZW50VG9PdmVybGF5ID09PSBudWxsKSB7XG4gICAgICAgIF90aGlzLnNob3VsZENsb3NlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoX3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPbk92ZXJsYXlDbGljaykge1xuICAgICAgICBfdGhpcy5zaG91bGRDbG9zZSA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUNvbnRlbnRPbk1vdXNlVXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5zaG91bGRDbG9zZSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBfdGhpcy5oYW5kbGVPdmVybGF5T25Nb3VzZURvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmICghX3RoaXMucHJvcHMuc2hvdWxkQ2xvc2VPbk92ZXJsYXlDbGljayAmJiBldmVudC50YXJnZXQgPT0gX3RoaXMub3ZlcmxheSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgX3RoaXMubW92ZUZyb21Db250ZW50VG9PdmVybGF5ID0gZmFsc2U7XG4gICAgfTtcblxuICAgIF90aGlzLmhhbmRsZUNvbnRlbnRPbkNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgX3RoaXMuaGFuZGxlQ29udGVudE9uTW91c2VEb3duID0gZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSBmYWxzZTtcbiAgICAgIF90aGlzLm1vdmVGcm9tQ29udGVudFRvT3ZlcmxheSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICBfdGhpcy5yZXF1ZXN0Q2xvc2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBfdGhpcy5vd25lckhhbmRsZXNDbG9zZSgpICYmIF90aGlzLnByb3BzLm9uUmVxdWVzdENsb3NlKGV2ZW50KTtcbiAgICB9O1xuXG4gICAgX3RoaXMub3duZXJIYW5kbGVzQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gX3RoaXMucHJvcHMub25SZXF1ZXN0Q2xvc2U7XG4gICAgfTtcblxuICAgIF90aGlzLnNob3VsZEJlQ2xvc2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICFfdGhpcy5zdGF0ZS5pc09wZW4gJiYgIV90aGlzLnN0YXRlLmJlZm9yZUNsb3NlO1xuICAgIH07XG5cbiAgICBfdGhpcy5jb250ZW50SGFzRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gX3RoaXMuY29udGVudCB8fCBfdGhpcy5jb250ZW50LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuICAgIH07XG5cbiAgICBfdGhpcy5idWlsZENsYXNzTmFtZSA9IGZ1bmN0aW9uICh3aGljaCwgYWRkaXRpb25hbCkge1xuICAgICAgdmFyIGNsYXNzTmFtZXMgPSAodHlwZW9mIGFkZGl0aW9uYWwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihhZGRpdGlvbmFsKSkgPT09IFwib2JqZWN0XCIgPyBhZGRpdGlvbmFsIDoge1xuICAgICAgICBiYXNlOiBDTEFTU19OQU1FU1t3aGljaF0sXG4gICAgICAgIGFmdGVyT3BlbjogQ0xBU1NfTkFNRVNbd2hpY2hdICsgXCItLWFmdGVyLW9wZW5cIixcbiAgICAgICAgYmVmb3JlQ2xvc2U6IENMQVNTX05BTUVTW3doaWNoXSArIFwiLS1iZWZvcmUtY2xvc2VcIlxuICAgICAgfTtcbiAgICAgIHZhciBjbGFzc05hbWUgPSBjbGFzc05hbWVzLmJhc2U7XG4gICAgICBpZiAoX3RoaXMuc3RhdGUuYWZ0ZXJPcGVuKSB7XG4gICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZSArIFwiIFwiICsgY2xhc3NOYW1lcy5hZnRlck9wZW47XG4gICAgICB9XG4gICAgICBpZiAoX3RoaXMuc3RhdGUuYmVmb3JlQ2xvc2UpIHtcbiAgICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWVzLmJlZm9yZUNsb3NlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHR5cGVvZiBhZGRpdGlvbmFsID09PSBcInN0cmluZ1wiICYmIGFkZGl0aW9uYWwgPyBjbGFzc05hbWUgKyBcIiBcIiArIGFkZGl0aW9uYWwgOiBjbGFzc05hbWU7XG4gICAgfTtcblxuICAgIF90aGlzLmFyaWFBdHRyaWJ1dGVzID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoaXRlbXMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBuYW1lKSB7XG4gICAgICAgIGFjY1tcImFyaWEtXCIgKyBuYW1lXSA9IGl0ZW1zW25hbWVdO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgfSwge30pO1xuICAgIH07XG5cbiAgICBfdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFmdGVyT3BlbjogZmFsc2UsXG4gICAgICBiZWZvcmVDbG9zZTogZmFsc2VcbiAgICB9O1xuXG4gICAgX3RoaXMuc2hvdWxkQ2xvc2UgPSBudWxsO1xuICAgIF90aGlzLm1vdmVGcm9tQ29udGVudFRvT3ZlcmxheSA9IG51bGw7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE1vZGFsUG9ydGFsLCBbe1xuICAgIGtleTogXCJjb21wb25lbnREaWRNb3VudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIC8vIEZvY3VzIG5lZWRzIHRvIGJlIHNldCB3aGVuIG1vdW50aW5nIGFuZCBhbHJlYWR5IG9wZW5cbiAgICAgIGlmICh0aGlzLnByb3BzLmlzT3Blbikge1xuICAgICAgICB0aGlzLnNldEZvY3VzQWZ0ZXJSZW5kZXIodHJ1ZSk7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgaWYgKG5ld1Byb3BzLmJvZHlPcGVuQ2xhc3NOYW1lICE9PSB0aGlzLnByb3BzLmJvZHlPcGVuQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1JlYWN0LU1vZGFsOiBcImJvZHlPcGVuQ2xhc3NOYW1lXCIgcHJvcCBoYXMgYmVlbiBtb2RpZmllZC4gJyArIFwiVGhpcyBtYXkgY2F1c2UgdW5leHBlY3RlZCBiZWhhdmlvciB3aGVuIG11bHRpcGxlIG1vZGFscyBhcmUgb3Blbi5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1Byb3BzLmh0bWxPcGVuQ2xhc3NOYW1lICE9PSB0aGlzLnByb3BzLmh0bWxPcGVuQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1JlYWN0LU1vZGFsOiBcImh0bWxPcGVuQ2xhc3NOYW1lXCIgcHJvcCBoYXMgYmVlbiBtb2RpZmllZC4gJyArIFwiVGhpcyBtYXkgY2F1c2UgdW5leHBlY3RlZCBiZWhhdmlvciB3aGVuIG11bHRpcGxlIG1vZGFscyBhcmUgb3Blbi5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEZvY3VzIG9ubHkgbmVlZHMgdG8gYmUgc2V0IG9uY2Ugd2hlbiB0aGUgbW9kYWwgaXMgYmVpbmcgb3BlbmVkXG4gICAgICBpZiAoIXRoaXMucHJvcHMuaXNPcGVuICYmIG5ld1Byb3BzLmlzT3Blbikge1xuICAgICAgICB0aGlzLnNldEZvY3VzQWZ0ZXJSZW5kZXIodHJ1ZSk7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmlzT3BlbiAmJiAhbmV3UHJvcHMuaXNPcGVuKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50RGlkVXBkYXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgIGlmICh0aGlzLmZvY3VzQWZ0ZXJSZW5kZXIpIHtcbiAgICAgICAgdGhpcy5mb2N1c0NvbnRlbnQoKTtcbiAgICAgICAgdGhpcy5zZXRGb2N1c0FmdGVyUmVuZGVyKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29tcG9uZW50V2lsbFVubW91bnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICB0aGlzLmFmdGVyQ2xvc2UoKTtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNsb3NlVGltZXIpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJiZWZvcmVPcGVuXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGJlZm9yZU9wZW4oKSB7XG4gICAgICB2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBhcHBFbGVtZW50ID0gX3Byb3BzLmFwcEVsZW1lbnQsXG4gICAgICAgICAgYXJpYUhpZGVBcHAgPSBfcHJvcHMuYXJpYUhpZGVBcHAsXG4gICAgICAgICAgaHRtbE9wZW5DbGFzc05hbWUgPSBfcHJvcHMuaHRtbE9wZW5DbGFzc05hbWUsXG4gICAgICAgICAgYm9keU9wZW5DbGFzc05hbWUgPSBfcHJvcHMuYm9keU9wZW5DbGFzc05hbWU7XG5cbiAgICAgIC8vIEFkZCBjbGFzc2VzLlxuXG4gICAgICBjbGFzc0xpc3QuYWRkKGRvY3VtZW50LmJvZHksIGJvZHlPcGVuQ2xhc3NOYW1lKTtcblxuICAgICAgaHRtbE9wZW5DbGFzc05hbWUgJiYgY2xhc3NMaXN0LmFkZChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImh0bWxcIilbMF0sIGh0bWxPcGVuQ2xhc3NOYW1lKTtcblxuICAgICAgaWYgKGFyaWFIaWRlQXBwKSB7XG4gICAgICAgIGFyaWFIaWRkZW5JbnN0YW5jZXMgKz0gMTtcbiAgICAgICAgYXJpYUFwcEhpZGVyLmhpZGUoYXBwRWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRG9uJ3Qgc3RlYWwgZm9jdXMgZnJvbSBpbm5lciBlbGVtZW50c1xuXG4gIH0sIHtcbiAgICBrZXk6IFwicmVuZGVyXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBjbGFzc05hbWUgPSBfcHJvcHMyLmNsYXNzTmFtZSxcbiAgICAgICAgICBvdmVybGF5Q2xhc3NOYW1lID0gX3Byb3BzMi5vdmVybGF5Q2xhc3NOYW1lLFxuICAgICAgICAgIGRlZmF1bHRTdHlsZXMgPSBfcHJvcHMyLmRlZmF1bHRTdHlsZXM7XG5cbiAgICAgIHZhciBjb250ZW50U3R5bGVzID0gY2xhc3NOYW1lID8ge30gOiBkZWZhdWx0U3R5bGVzLmNvbnRlbnQ7XG4gICAgICB2YXIgb3ZlcmxheVN0eWxlcyA9IG92ZXJsYXlDbGFzc05hbWUgPyB7fSA6IGRlZmF1bHRTdHlsZXMub3ZlcmxheTtcblxuICAgICAgcmV0dXJuIHRoaXMuc2hvdWxkQmVDbG9zZWQoKSA/IG51bGwgOiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAge1xuICAgICAgICAgIHJlZjogdGhpcy5zZXRPdmVybGF5UmVmLFxuICAgICAgICAgIGNsYXNzTmFtZTogdGhpcy5idWlsZENsYXNzTmFtZShcIm92ZXJsYXlcIiwgb3ZlcmxheUNsYXNzTmFtZSksXG4gICAgICAgICAgc3R5bGU6IF9leHRlbmRzKHt9LCBvdmVybGF5U3R5bGVzLCB0aGlzLnByb3BzLnN0eWxlLm92ZXJsYXkpLFxuICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlT3ZlcmxheU9uQ2xpY2ssXG4gICAgICAgICAgb25Nb3VzZURvd246IHRoaXMuaGFuZGxlT3ZlcmxheU9uTW91c2VEb3duLFxuICAgICAgICAgIG9uTW91c2VVcDogdGhpcy5oYW5kbGVPdmVybGF5T25Nb3VzZVVwLFxuICAgICAgICAgIFwiYXJpYS1tb2RhbFwiOiBcInRydWVcIlxuICAgICAgICB9LFxuICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIF9leHRlbmRzKHtcbiAgICAgICAgICAgIHJlZjogdGhpcy5zZXRDb250ZW50UmVmLFxuICAgICAgICAgICAgc3R5bGU6IF9leHRlbmRzKHt9LCBjb250ZW50U3R5bGVzLCB0aGlzLnByb3BzLnN0eWxlLmNvbnRlbnQpLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiB0aGlzLmJ1aWxkQ2xhc3NOYW1lKFwiY29udGVudFwiLCBjbGFzc05hbWUpLFxuICAgICAgICAgICAgdGFiSW5kZXg6IFwiLTFcIixcbiAgICAgICAgICAgIG9uS2V5RG93bjogdGhpcy5oYW5kbGVLZXlEb3duLFxuICAgICAgICAgICAgb25Nb3VzZURvd246IHRoaXMuaGFuZGxlQ29udGVudE9uTW91c2VEb3duLFxuICAgICAgICAgICAgb25Nb3VzZVVwOiB0aGlzLmhhbmRsZUNvbnRlbnRPbk1vdXNlVXAsXG4gICAgICAgICAgICBvbkNsaWNrOiB0aGlzLmhhbmRsZUNvbnRlbnRPbkNsaWNrLFxuICAgICAgICAgICAgcm9sZTogdGhpcy5wcm9wcy5yb2xlLFxuICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IHRoaXMucHJvcHMuY29udGVudExhYmVsXG4gICAgICAgICAgfSwgdGhpcy5hcmlhQXR0cmlidXRlcyh0aGlzLnByb3BzLmFyaWEgfHwge30pKSxcbiAgICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE1vZGFsUG9ydGFsO1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuTW9kYWxQb3J0YWwuZGVmYXVsdFByb3BzID0ge1xuICBzdHlsZToge1xuICAgIG92ZXJsYXk6IHt9LFxuICAgIGNvbnRlbnQ6IHt9XG4gIH1cbn07XG5Nb2RhbFBvcnRhbC5wcm9wVHlwZXMgPSB7XG4gIGlzT3BlbjogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLmlzUmVxdWlyZWQsXG4gIGRlZmF1bHRTdHlsZXM6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc2hhcGUoe1xuICAgIGNvbnRlbnQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LFxuICAgIG92ZXJsYXk6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0XG4gIH0pLFxuICBzdHlsZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zaGFwZSh7XG4gICAgY29udGVudDogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3QsXG4gICAgb3ZlcmxheTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3RcbiAgfSksXG4gIGNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoW19wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdF0pLFxuICBvdmVybGF5Q2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0XSksXG4gIGJvZHlPcGVuQ2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgaHRtbE9wZW5DbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLFxuICBhcmlhSGlkZUFwcDogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBhcHBFbGVtZW50OiBfcHJvcFR5cGVzMi5kZWZhdWx0Lmluc3RhbmNlT2YoX3NhZmVIVE1MRWxlbWVudDIuZGVmYXVsdCksXG4gIG9uQWZ0ZXJPcGVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsXG4gIG9uUmVxdWVzdENsb3NlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsXG4gIGNsb3NlVGltZW91dE1TOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlcixcbiAgc2hvdWxkRm9jdXNBZnRlclJlbmRlcjogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICBzaG91bGRDbG9zZU9uT3ZlcmxheUNsaWNrOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsXG4gIHNob3VsZFJldHVybkZvY3VzQWZ0ZXJDbG9zZTogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLFxuICByb2xlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgY29udGVudExhYmVsOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZyxcbiAgYXJpYTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3QsXG4gIGNoaWxkcmVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm5vZGUsXG4gIHNob3VsZENsb3NlT25Fc2M6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCxcbiAgb3ZlcmxheVJlZjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLFxuICBjb250ZW50UmVmOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmNcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBNb2RhbFBvcnRhbDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2NvbXBvbmVudHMvTW9kYWxQb3J0YWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9jb21wb25lbnRzL01vZGFsUG9ydGFsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5hc3NlcnROb2RlTGlzdCA9IGFzc2VydE5vZGVMaXN0O1xuZXhwb3J0cy5zZXRFbGVtZW50ID0gc2V0RWxlbWVudDtcbmV4cG9ydHMudmFsaWRhdGVFbGVtZW50ID0gdmFsaWRhdGVFbGVtZW50O1xuZXhwb3J0cy5oaWRlID0gaGlkZTtcbmV4cG9ydHMuc2hvdyA9IHNob3c7XG5leHBvcnRzLmRvY3VtZW50Tm90UmVhZHlPclNTUlRlc3RpbmcgPSBkb2N1bWVudE5vdFJlYWR5T3JTU1JUZXN0aW5nO1xuZXhwb3J0cy5yZXNldEZvclRlc3RpbmcgPSByZXNldEZvclRlc3Rpbmc7XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoXCJ3YXJuaW5nXCIpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBnbG9iYWxFbGVtZW50ID0gbnVsbDtcblxuZnVuY3Rpb24gYXNzZXJ0Tm9kZUxpc3Qobm9kZUxpc3QsIHNlbGVjdG9yKSB7XG4gIGlmICghbm9kZUxpc3QgfHwgIW5vZGVMaXN0Lmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInJlYWN0LW1vZGFsOiBObyBlbGVtZW50cyB3ZXJlIGZvdW5kIGZvciBzZWxlY3RvciBcIiArIHNlbGVjdG9yICsgXCIuXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldEVsZW1lbnQoZWxlbWVudCkge1xuICB2YXIgdXNlRWxlbWVudCA9IGVsZW1lbnQ7XG4gIGlmICh0eXBlb2YgdXNlRWxlbWVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodXNlRWxlbWVudCk7XG4gICAgYXNzZXJ0Tm9kZUxpc3QoZWwsIHVzZUVsZW1lbnQpO1xuICAgIHVzZUVsZW1lbnQgPSBcImxlbmd0aFwiIGluIGVsID8gZWxbMF0gOiBlbDtcbiAgfVxuICBnbG9iYWxFbGVtZW50ID0gdXNlRWxlbWVudCB8fCBnbG9iYWxFbGVtZW50O1xuICByZXR1cm4gZ2xvYmFsRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVFbGVtZW50KGFwcEVsZW1lbnQpIHtcbiAgaWYgKCFhcHBFbGVtZW50ICYmICFnbG9iYWxFbGVtZW50KSB7XG4gICAgKDAsIF93YXJuaW5nMi5kZWZhdWx0KShmYWxzZSwgW1wicmVhY3QtbW9kYWw6IEFwcCBlbGVtZW50IGlzIG5vdCBkZWZpbmVkLlwiLCBcIlBsZWFzZSB1c2UgYE1vZGFsLnNldEFwcEVsZW1lbnQoZWwpYCBvciBzZXQgYGFwcEVsZW1lbnQ9e2VsfWAuXCIsIFwiVGhpcyBpcyBuZWVkZWQgc28gc2NyZWVuIHJlYWRlcnMgZG9uJ3Qgc2VlIG1haW4gY29udGVudFwiLCBcIndoZW4gbW9kYWwgaXMgb3BlbmVkLiBJdCBpcyBub3QgcmVjb21tZW5kZWQsIGJ1dCB5b3UgY2FuIG9wdC1vdXRcIiwgXCJieSBzZXR0aW5nIGBhcmlhSGlkZUFwcD17ZmFsc2V9YC5cIl0uam9pbihcIiBcIikpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGhpZGUoYXBwRWxlbWVudCkge1xuICBpZiAodmFsaWRhdGVFbGVtZW50KGFwcEVsZW1lbnQpKSB7XG4gICAgKGFwcEVsZW1lbnQgfHwgZ2xvYmFsRWxlbWVudCkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNob3coYXBwRWxlbWVudCkge1xuICBpZiAodmFsaWRhdGVFbGVtZW50KGFwcEVsZW1lbnQpKSB7XG4gICAgKGFwcEVsZW1lbnQgfHwgZ2xvYmFsRWxlbWVudCkucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZG9jdW1lbnROb3RSZWFkeU9yU1NSVGVzdGluZygpIHtcbiAgZ2xvYmFsRWxlbWVudCA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIHJlc2V0Rm9yVGVzdGluZygpIHtcbiAgZ2xvYmFsRWxlbWVudCA9IG51bGw7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvYXJpYUFwcEhpZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9hcmlhQXBwSGlkZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmR1bXBDbGFzc0xpc3RzID0gZHVtcENsYXNzTGlzdHM7XG52YXIgaHRtbENsYXNzTGlzdCA9IHt9O1xudmFyIGRvY0JvZHlDbGFzc0xpc3QgPSB7fTtcblxuZnVuY3Rpb24gZHVtcENsYXNzTGlzdHMoKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICB2YXIgY2xhc3NlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaHRtbFwiKVswXS5jbGFzc05hbWU7XG4gICAgdmFyIGJ1ZmZlciA9IFwiU2hvdyB0cmFja2VkIGNsYXNzZXM6XFxuXFxuXCI7XG5cbiAgICBidWZmZXIgKz0gXCI8aHRtbCAvPiAoXCIgKyBjbGFzc2VzICsgXCIpOlxcblwiO1xuICAgIGZvciAodmFyIHggaW4gaHRtbENsYXNzTGlzdCkge1xuICAgICAgYnVmZmVyICs9IFwiICBcIiArIHggKyBcIiBcIiArIGh0bWxDbGFzc0xpc3RbeF0gKyBcIlxcblwiO1xuICAgIH1cblxuICAgIGNsYXNzZXMgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgYnVmZmVyICs9IFwiXFxuXFxuZG9jLmJvZHkgKFwiICsgY2xhc3NlcyArIFwiKTpcXG5cIjtcbiAgICBmb3IgKHZhciBfeCBpbiBkb2NCb2R5Q2xhc3NMaXN0KSB7XG4gICAgICBidWZmZXIgKz0gXCIgIFwiICsgX3ggKyBcIiBcIiArIGRvY0JvZHlDbGFzc0xpc3RbX3hdICsgXCJcXG5cIjtcbiAgICB9XG5cbiAgICBidWZmZXIgKz0gXCJcXG5cIjtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5sb2coYnVmZmVyKTtcbiAgfVxufVxuXG4vKipcbiAqIFRyYWNrIHRoZSBudW1iZXIgb2YgcmVmZXJlbmNlIG9mIGEgY2xhc3MuXG4gKiBAcGFyYW0ge29iamVjdH0gcG9sbCBUaGUgcG9sbCB0byByZWNlaXZlIHRoZSByZWZlcmVuY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lIFRoZSBjbGFzcyBuYW1lLlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG52YXIgaW5jcmVtZW50UmVmZXJlbmNlID0gZnVuY3Rpb24gaW5jcmVtZW50UmVmZXJlbmNlKHBvbGwsIGNsYXNzTmFtZSkge1xuICBpZiAoIXBvbGxbY2xhc3NOYW1lXSkge1xuICAgIHBvbGxbY2xhc3NOYW1lXSA9IDA7XG4gIH1cbiAgcG9sbFtjbGFzc05hbWVdICs9IDE7XG4gIHJldHVybiBjbGFzc05hbWU7XG59O1xuXG4vKipcbiAqIERyb3AgdGhlIHJlZmVyZW5jZSBvZiBhIGNsYXNzLlxuICogQHBhcmFtIHtvYmplY3R9IHBvbGwgVGhlIHBvbGwgdG8gcmVjZWl2ZSB0aGUgcmVmZXJlbmNlLlxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSBUaGUgY2xhc3MgbmFtZS5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xudmFyIGRlY3JlbWVudFJlZmVyZW5jZSA9IGZ1bmN0aW9uIGRlY3JlbWVudFJlZmVyZW5jZShwb2xsLCBjbGFzc05hbWUpIHtcbiAgaWYgKHBvbGxbY2xhc3NOYW1lXSkge1xuICAgIHBvbGxbY2xhc3NOYW1lXSAtPSAxO1xuICB9XG4gIHJldHVybiBjbGFzc05hbWU7XG59O1xuXG4vKipcbiAqIFRyYWNrIGEgY2xhc3MgYW5kIGFkZCB0byB0aGUgZ2l2ZW4gY2xhc3MgbGlzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjbGFzc0xpc3RSZWYgQSBjbGFzcyBsaXN0IG9mIGFuIGVsZW1lbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gcG9sbCAgICAgICAgIFRoZSBwb2xsIHRvIGJlIHVzZWQuXG4gKiBAcGFyYW0ge0FycmF5fSAgY2xhc3NlcyAgICAgIFRoZSBsaXN0IG9mIGNsYXNzZXMgdG8gYmUgdHJhY2tlZC5cbiAqL1xudmFyIHRyYWNrQ2xhc3MgPSBmdW5jdGlvbiB0cmFja0NsYXNzKGNsYXNzTGlzdFJlZiwgcG9sbCwgY2xhc3Nlcykge1xuICBjbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgIGluY3JlbWVudFJlZmVyZW5jZShwb2xsLCBjbGFzc05hbWUpO1xuICAgIGNsYXNzTGlzdFJlZi5hZGQoY2xhc3NOYW1lKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFVudHJhY2sgYSBjbGFzcyBhbmQgcmVtb3ZlIGZyb20gdGhlIGdpdmVuIGNsYXNzIGxpc3QgaWYgdGhlIHJlZmVyZW5jZVxuICogcmVhY2hlcyAwLlxuICogQHBhcmFtIHtPYmplY3R9IGNsYXNzTGlzdFJlZiBBIGNsYXNzIGxpc3Qgb2YgYW4gZWxlbWVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2xsICAgICAgICAgVGhlIHBvbGwgdG8gYmUgdXNlZC5cbiAqIEBwYXJhbSB7QXJyYXl9ICBjbGFzc2VzICAgICAgVGhlIGxpc3Qgb2YgY2xhc3NlcyB0byBiZSB1bnRyYWNrZWQuXG4gKi9cbnZhciB1bnRyYWNrQ2xhc3MgPSBmdW5jdGlvbiB1bnRyYWNrQ2xhc3MoY2xhc3NMaXN0UmVmLCBwb2xsLCBjbGFzc2VzKSB7XG4gIGNsYXNzZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgZGVjcmVtZW50UmVmZXJlbmNlKHBvbGwsIGNsYXNzTmFtZSk7XG4gICAgcG9sbFtjbGFzc05hbWVdID09PSAwICYmIGNsYXNzTGlzdFJlZi5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFB1YmxpYyBpbmZlcmZhY2UgdG8gYWRkIGNsYXNzZXMgdG8gdGhlIGRvY3VtZW50LmJvZHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gYm9keUNsYXNzIFRoZSBjbGFzcyBzdHJpbmcgdG8gYmUgYWRkZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIEl0IG1heSBjb250YWluIG1vcmUgdGhlbiBvbmUgY2xhc3NcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCAnICcgYXMgc2VwYXJhdG9yLlxuICovXG52YXIgYWRkID0gZXhwb3J0cy5hZGQgPSBmdW5jdGlvbiBhZGQoZWxlbWVudCwgY2xhc3NTdHJpbmcpIHtcbiAgcmV0dXJuIHRyYWNrQ2xhc3MoZWxlbWVudC5jbGFzc0xpc3QsIGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PSBcImh0bWxcIiA/IGh0bWxDbGFzc0xpc3QgOiBkb2NCb2R5Q2xhc3NMaXN0LCBjbGFzc1N0cmluZy5zcGxpdChcIiBcIikpO1xufTtcblxuLyoqXG4gKiBQdWJsaWMgaW5mZXJmYWNlIHRvIHJlbW92ZSBjbGFzc2VzIGZyb20gdGhlIGRvY3VtZW50LmJvZHkuXG4gKiBAcGFyYW0ge3N0cmluZ30gYm9keUNsYXNzIFRoZSBjbGFzcyBzdHJpbmcgdG8gYmUgYWRkZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIEl0IG1heSBjb250YWluIG1vcmUgdGhlbiBvbmUgY2xhc3NcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCAnICcgYXMgc2VwYXJhdG9yLlxuICovXG52YXIgcmVtb3ZlID0gZXhwb3J0cy5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoZWxlbWVudCwgY2xhc3NTdHJpbmcpIHtcbiAgcmV0dXJuIHVudHJhY2tDbGFzcyhlbGVtZW50LmNsYXNzTGlzdCwgZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09IFwiaHRtbFwiID8gaHRtbENsYXNzTGlzdCA6IGRvY0JvZHlDbGFzc0xpc3QsIGNsYXNzU3RyaW5nLnNwbGl0KFwiIFwiKSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2NsYXNzTGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvY2xhc3NMaXN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5oYW5kbGVCbHVyID0gaGFuZGxlQmx1cjtcbmV4cG9ydHMuaGFuZGxlRm9jdXMgPSBoYW5kbGVGb2N1cztcbmV4cG9ydHMubWFya0ZvckZvY3VzTGF0ZXIgPSBtYXJrRm9yRm9jdXNMYXRlcjtcbmV4cG9ydHMucmV0dXJuRm9jdXMgPSByZXR1cm5Gb2N1cztcbmV4cG9ydHMucG9wV2l0aG91dEZvY3VzID0gcG9wV2l0aG91dEZvY3VzO1xuZXhwb3J0cy5zZXR1cFNjb3BlZEZvY3VzID0gc2V0dXBTY29wZWRGb2N1cztcbmV4cG9ydHMudGVhcmRvd25TY29wZWRGb2N1cyA9IHRlYXJkb3duU2NvcGVkRm9jdXM7XG5cbnZhciBfdGFiYmFibGUgPSByZXF1aXJlKFwiLi4vaGVscGVycy90YWJiYWJsZVwiKTtcblxudmFyIF90YWJiYWJsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90YWJiYWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBmb2N1c0xhdGVyRWxlbWVudHMgPSBbXTtcbnZhciBtb2RhbEVsZW1lbnQgPSBudWxsO1xudmFyIG5lZWRUb0ZvY3VzID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGhhbmRsZUJsdXIoKSB7XG4gIG5lZWRUb0ZvY3VzID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRm9jdXMoKSB7XG4gIGlmIChuZWVkVG9Gb2N1cykge1xuICAgIG5lZWRUb0ZvY3VzID0gZmFsc2U7XG4gICAgaWYgKCFtb2RhbEVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gbmVlZCB0byBzZWUgaG93IGpRdWVyeSBzaGltcyBkb2N1bWVudC5vbignZm9jdXNpbicpIHNvIHdlIGRvbid0IG5lZWQgdGhlXG4gICAgLy8gc2V0VGltZW91dCwgZmlyZWZveCBkb2Vzbid0IHN1cHBvcnQgZm9jdXNpbiwgaWYgaXQgZGlkLCB3ZSBjb3VsZCBmb2N1c1xuICAgIC8vIHRoZSBlbGVtZW50IG91dHNpZGUgb2YgYSBzZXRUaW1lb3V0LiBTaWRlLWVmZmVjdCBvZiB0aGlzIGltcGxlbWVudGF0aW9uXG4gICAgLy8gaXMgdGhhdCB0aGUgZG9jdW1lbnQuYm9keSBnZXRzIGZvY3VzLCBhbmQgdGhlbiB3ZSBmb2N1cyBvdXIgZWxlbWVudCByaWdodFxuICAgIC8vIGFmdGVyLCBzZWVtcyBmaW5lLlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKG1vZGFsRWxlbWVudC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZWwgPSAoMCwgX3RhYmJhYmxlMi5kZWZhdWx0KShtb2RhbEVsZW1lbnQpWzBdIHx8IG1vZGFsRWxlbWVudDtcbiAgICAgIGVsLmZvY3VzKCk7XG4gICAgfSwgMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFya0ZvckZvY3VzTGF0ZXIoKSB7XG4gIGZvY3VzTGF0ZXJFbGVtZW50cy5wdXNoKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xufVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5mdW5jdGlvbiByZXR1cm5Gb2N1cygpIHtcbiAgdmFyIHRvRm9jdXMgPSBudWxsO1xuICB0cnkge1xuICAgIGlmIChmb2N1c0xhdGVyRWxlbWVudHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0b0ZvY3VzID0gZm9jdXNMYXRlckVsZW1lbnRzLnBvcCgpO1xuICAgICAgdG9Gb2N1cy5mb2N1cygpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLndhcm4oW1wiWW91IHRyaWVkIHRvIHJldHVybiBmb2N1cyB0b1wiLCB0b0ZvY3VzLCBcImJ1dCBpdCBpcyBub3QgaW4gdGhlIERPTSBhbnltb3JlXCJdLmpvaW4oXCIgXCIpKTtcbiAgfVxufVxuLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG5cbmZ1bmN0aW9uIHBvcFdpdGhvdXRGb2N1cygpIHtcbiAgZm9jdXNMYXRlckVsZW1lbnRzLmxlbmd0aCA+IDAgJiYgZm9jdXNMYXRlckVsZW1lbnRzLnBvcCgpO1xufVxuXG5mdW5jdGlvbiBzZXR1cFNjb3BlZEZvY3VzKGVsZW1lbnQpIHtcbiAgbW9kYWxFbGVtZW50ID0gZWxlbWVudDtcblxuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgaGFuZGxlQmx1ciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBoYW5kbGVGb2N1cywgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25CbHVyXCIsIGhhbmRsZUJsdXIpO1xuICAgIGRvY3VtZW50LmF0dGFjaEV2ZW50KFwib25Gb2N1c1wiLCBoYW5kbGVGb2N1cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdGVhcmRvd25TY29wZWRGb2N1cygpIHtcbiAgbW9kYWxFbGVtZW50ID0gbnVsbDtcblxuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgaGFuZGxlQmx1cik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGhhbmRsZUZvY3VzKTtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuZGV0YWNoRXZlbnQoXCJvbkJsdXJcIiwgaGFuZGxlQmx1cik7XG4gICAgZG9jdW1lbnQuZGV0YWNoRXZlbnQoXCJvbkZvY3VzXCIsIGhhbmRsZUZvY3VzKTtcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL2ZvY3VzTWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvZm9jdXNNYW5hZ2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jYW5Vc2VET00gPSB1bmRlZmluZWQ7XG5cbnZhciBfZXhlbnYgPSByZXF1aXJlKFwiZXhlbnZcIik7XG5cbnZhciBfZXhlbnYyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhlbnYpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRUUgPSBfZXhlbnYyLmRlZmF1bHQ7XG5cbnZhciBTYWZlSFRNTEVsZW1lbnQgPSBFRS5jYW5Vc2VET00gPyB3aW5kb3cuSFRNTEVsZW1lbnQgOiB7fTtcblxudmFyIGNhblVzZURPTSA9IGV4cG9ydHMuY2FuVXNlRE9NID0gRUUuY2FuVXNlRE9NO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTYWZlSFRNTEVsZW1lbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvc2FmZUhUTUxFbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9zYWZlSFRNTEVsZW1lbnQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzY29wZVRhYjtcblxudmFyIF90YWJiYWJsZSA9IHJlcXVpcmUoXCIuL3RhYmJhYmxlXCIpO1xuXG52YXIgX3RhYmJhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RhYmJhYmxlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gc2NvcGVUYWIobm9kZSwgZXZlbnQpIHtcbiAgdmFyIHRhYmJhYmxlID0gKDAsIF90YWJiYWJsZTIuZGVmYXVsdCkobm9kZSk7XG5cbiAgaWYgKCF0YWJiYWJsZS5sZW5ndGgpIHtcbiAgICAvLyBEbyBub3RoaW5nLCBzaW5jZSB0aGVyZSBhcmUgbm8gZWxlbWVudHMgdGhhdCBjYW4gcmVjZWl2ZSBmb2N1cy5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzaGlmdEtleSA9IGV2ZW50LnNoaWZ0S2V5O1xuICB2YXIgaGVhZCA9IHRhYmJhYmxlWzBdO1xuICB2YXIgdGFpbCA9IHRhYmJhYmxlW3RhYmJhYmxlLmxlbmd0aCAtIDFdO1xuXG4gIC8vIHByb2NlZWQgd2l0aCBkZWZhdWx0IGJyb3dzZXIgYmVoYXZpb3Igb24gdGFiLlxuICAvLyBGb2N1cyBvbiBsYXN0IGVsZW1lbnQgb24gc2hpZnQgKyB0YWIuXG4gIGlmIChub2RlID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgaWYgKCFzaGlmdEtleSkgcmV0dXJuO1xuICAgIHRhcmdldCA9IHRhaWw7XG4gIH1cblxuICB2YXIgdGFyZ2V0O1xuICBpZiAodGFpbCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAhc2hpZnRLZXkpIHtcbiAgICB0YXJnZXQgPSBoZWFkO1xuICB9XG5cbiAgaWYgKGhlYWQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgc2hpZnRLZXkpIHtcbiAgICB0YXJnZXQgPSB0YWlsO1xuICB9XG5cbiAgaWYgKHRhcmdldCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGFyZ2V0LmZvY3VzKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gU2FmYXJpIHJhZGlvIGlzc3VlLlxuICAvL1xuICAvLyBTYWZhcmkgZG9lcyBub3QgbW92ZSB0aGUgZm9jdXMgdG8gdGhlIHJhZGlvIGJ1dHRvbixcbiAgLy8gc28gd2UgbmVlZCB0byBmb3JjZSBpdCB0byByZWFsbHkgd2FsayB0aHJvdWdoIGFsbCBlbGVtZW50cy5cbiAgLy9cbiAgLy8gVGhpcyBpcyB2ZXJ5IGVycm9yIHBydW5lLCBzaW5jZSB3ZSBhcmUgdHJ5aW5nIHRvIGd1ZXNzXG4gIC8vIGlmIGl0IGlzIGEgc2FmYXJpIGJyb3dzZXIgZnJvbSB0aGUgZmlyc3Qgb2NjdXJlbmNlIGJldHdlZW5cbiAgLy8gY2hyb21lIG9yIHNhZmFyaS5cbiAgLy9cbiAgLy8gVGhlIGNocm9tZSB1c2VyIGFnZW50IGNvbnRhaW5zIHRoZSBmaXJzdCBvY3VycmVuY2VcbiAgLy8gYXMgdGhlICdjaHJvbWUvdmVyc2lvbicgYW5kIGxhdGVyIHRoZSAnc2FmYXJpL3ZlcnNpb24nLlxuICB2YXIgY2hlY2tTYWZhcmkgPSAvKFxcYkNocm9tZVxcYnxcXGJTYWZhcmlcXGIpXFwvLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICB2YXIgaXNTYWZhcmlEZXNrdG9wID0gY2hlY2tTYWZhcmkgIT0gbnVsbCAmJiBjaGVja1NhZmFyaVsxXSAhPSBcIkNocm9tZVwiICYmIC9cXGJpUG9kXFxifFxcYmlQYWRcXGIvZy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpID09IG51bGw7XG5cbiAgLy8gSWYgd2UgYXJlIG5vdCBpbiBzYWZhcmkgZGVza3RvcCwgbGV0IHRoZSBicm93c2VyIGNvbnRyb2xcbiAgLy8gdGhlIGZvY3VzXG4gIGlmICghaXNTYWZhcmlEZXNrdG9wKSByZXR1cm47XG5cbiAgdmFyIHggPSB0YWJiYWJsZS5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gIGlmICh4ID4gLTEpIHtcbiAgICB4ICs9IHNoaWZ0S2V5ID8gLTEgOiAxO1xuICB9XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICB0YWJiYWJsZVt4XS5mb2N1cygpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaGVscGVycy9zY29wZVRhYi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvc2NvcGVUYWIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBmaW5kVGFiYmFibGVEZXNjZW5kYW50cztcbi8qIVxuICogQWRhcHRlZCBmcm9tIGpRdWVyeSBVSSBjb3JlXG4gKlxuICogaHR0cDovL2pxdWVyeXVpLmNvbVxuICpcbiAqIENvcHlyaWdodCAyMDE0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqXG4gKiBodHRwOi8vYXBpLmpxdWVyeXVpLmNvbS9jYXRlZ29yeS91aS1jb3JlL1xuICovXG5cbnZhciB0YWJiYWJsZU5vZGUgPSAvaW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbnxvYmplY3QvO1xuXG5mdW5jdGlvbiBoaWRlc0NvbnRlbnRzKGVsZW1lbnQpIHtcbiAgdmFyIHplcm9TaXplID0gZWxlbWVudC5vZmZzZXRXaWR0aCA8PSAwICYmIGVsZW1lbnQub2Zmc2V0SGVpZ2h0IDw9IDA7XG5cbiAgLy8gSWYgdGhlIG5vZGUgaXMgZW1wdHksIHRoaXMgaXMgZ29vZCBlbm91Z2hcbiAgaWYgKHplcm9TaXplICYmICFlbGVtZW50LmlubmVySFRNTCkgcmV0dXJuIHRydWU7XG5cbiAgLy8gT3RoZXJ3aXNlIHdlIG5lZWQgdG8gY2hlY2sgc29tZSBzdHlsZXNcbiAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gIHJldHVybiB6ZXJvU2l6ZSA/IHN0eWxlLmdldFByb3BlcnR5VmFsdWUoXCJvdmVyZmxvd1wiKSAhPT0gXCJ2aXNpYmxlXCIgOiBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKFwiZGlzcGxheVwiKSA9PSBcIm5vbmVcIjtcbn1cblxuZnVuY3Rpb24gdmlzaWJsZShlbGVtZW50KSB7XG4gIHZhciBwYXJlbnRFbGVtZW50ID0gZWxlbWVudDtcbiAgd2hpbGUgKHBhcmVudEVsZW1lbnQpIHtcbiAgICBpZiAocGFyZW50RWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSkgYnJlYWs7XG4gICAgaWYgKGhpZGVzQ29udGVudHMocGFyZW50RWxlbWVudCkpIHJldHVybiBmYWxzZTtcbiAgICBwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBmb2N1c2FibGUoZWxlbWVudCwgaXNUYWJJbmRleE5vdE5hTikge1xuICB2YXIgbm9kZU5hbWUgPSBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIHZhciByZXMgPSB0YWJiYWJsZU5vZGUudGVzdChub2RlTmFtZSkgJiYgIWVsZW1lbnQuZGlzYWJsZWQgfHwgKG5vZGVOYW1lID09PSBcImFcIiA/IGVsZW1lbnQuaHJlZiB8fCBpc1RhYkluZGV4Tm90TmFOIDogaXNUYWJJbmRleE5vdE5hTik7XG4gIHJldHVybiByZXMgJiYgdmlzaWJsZShlbGVtZW50KTtcbn1cblxuZnVuY3Rpb24gdGFiYmFibGUoZWxlbWVudCkge1xuICB2YXIgdGFiSW5kZXggPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcInRhYmluZGV4XCIpO1xuICBpZiAodGFiSW5kZXggPT09IG51bGwpIHRhYkluZGV4ID0gdW5kZWZpbmVkO1xuICB2YXIgaXNUYWJJbmRleE5hTiA9IGlzTmFOKHRhYkluZGV4KTtcbiAgcmV0dXJuIChpc1RhYkluZGV4TmFOIHx8IHRhYkluZGV4ID49IDApICYmIGZvY3VzYWJsZShlbGVtZW50LCAhaXNUYWJJbmRleE5hTik7XG59XG5cbmZ1bmN0aW9uIGZpbmRUYWJiYWJsZURlc2NlbmRhbnRzKGVsZW1lbnQpIHtcbiAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKSwgMCkuZmlsdGVyKHRhYmJhYmxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2hlbHBlcnMvdGFiYmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LW1vZGFsL2xpYi9oZWxwZXJzL3RhYmJhYmxlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX01vZGFsID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9Nb2RhbFwiKTtcblxudmFyIF9Nb2RhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Nb2RhbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9Nb2RhbDIuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1tcImRlZmF1bHRcIl07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtbW9kYWwvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1tb2RhbC9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5pbXBvcnQgeyBDb21wb25lbnQsIENoaWxkcmVuIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IHN0b3JlU2hhcGUsIHN1YnNjcmlwdGlvblNoYXBlIH0gZnJvbSAnLi4vdXRpbHMvUHJvcFR5cGVzJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4uL3V0aWxzL3dhcm5pbmcnO1xuXG52YXIgZGlkV2FybkFib3V0UmVjZWl2aW5nU3RvcmUgPSBmYWxzZTtcbmZ1bmN0aW9uIHdhcm5BYm91dFJlY2VpdmluZ1N0b3JlKCkge1xuICBpZiAoZGlkV2FybkFib3V0UmVjZWl2aW5nU3RvcmUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZGlkV2FybkFib3V0UmVjZWl2aW5nU3RvcmUgPSB0cnVlO1xuXG4gIHdhcm5pbmcoJzxQcm92aWRlcj4gZG9lcyBub3Qgc3VwcG9ydCBjaGFuZ2luZyBgc3RvcmVgIG9uIHRoZSBmbHkuICcgKyAnSXQgaXMgbW9zdCBsaWtlbHkgdGhhdCB5b3Ugc2VlIHRoaXMgZXJyb3IgYmVjYXVzZSB5b3UgdXBkYXRlZCB0byAnICsgJ1JlZHV4IDIueCBhbmQgUmVhY3QgUmVkdXggMi54IHdoaWNoIG5vIGxvbmdlciBob3QgcmVsb2FkIHJlZHVjZXJzICcgKyAnYXV0b21hdGljYWxseS4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdGpzL3JlYWN0LXJlZHV4L3JlbGVhc2VzLycgKyAndGFnL3YyLjAuMCBmb3IgdGhlIG1pZ3JhdGlvbiBpbnN0cnVjdGlvbnMuJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQcm92aWRlcigpIHtcbiAgdmFyIF9Qcm92aWRlciRjaGlsZENvbnRleDtcblxuICB2YXIgc3RvcmVLZXkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICdzdG9yZSc7XG4gIHZhciBzdWJLZXkgPSBhcmd1bWVudHNbMV07XG5cbiAgdmFyIHN1YnNjcmlwdGlvbktleSA9IHN1YktleSB8fCBzdG9yZUtleSArICdTdWJzY3JpcHRpb24nO1xuXG4gIHZhciBQcm92aWRlciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKFByb3ZpZGVyLCBfQ29tcG9uZW50KTtcblxuICAgIFByb3ZpZGVyLnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgcmV0dXJuIF9yZWYgPSB7fSwgX3JlZltzdG9yZUtleV0gPSB0aGlzW3N0b3JlS2V5XSwgX3JlZltzdWJzY3JpcHRpb25LZXldID0gbnVsbCwgX3JlZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUHJvdmlkZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcm92aWRlcik7XG5cbiAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgICBfdGhpc1tzdG9yZUtleV0gPSBwcm9wcy5zdG9yZTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBQcm92aWRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIENoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfTtcblxuICAgIHJldHVybiBQcm92aWRlcjtcbiAgfShDb21wb25lbnQpO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgUHJvdmlkZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG4gICAgICBpZiAodGhpc1tzdG9yZUtleV0gIT09IG5leHRQcm9wcy5zdG9yZSkge1xuICAgICAgICB3YXJuQWJvdXRSZWNlaXZpbmdTdG9yZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBQcm92aWRlci5wcm9wVHlwZXMgPSB7XG4gICAgc3RvcmU6IHN0b3JlU2hhcGUuaXNSZXF1aXJlZCxcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmVsZW1lbnQuaXNSZXF1aXJlZFxuICB9O1xuICBQcm92aWRlci5jaGlsZENvbnRleHRUeXBlcyA9IChfUHJvdmlkZXIkY2hpbGRDb250ZXggPSB7fSwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4W3N0b3JlS2V5XSA9IHN0b3JlU2hhcGUuaXNSZXF1aXJlZCwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4W3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb25TaGFwZSwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4KTtcblxuICByZXR1cm4gUHJvdmlkZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVByb3ZpZGVyKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29tcG9uZW50cy9Qcm92aWRlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29tcG9uZW50cy9Qcm92aWRlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuaW1wb3J0IGhvaXN0U3RhdGljcyBmcm9tICdob2lzdC1ub24tcmVhY3Qtc3RhdGljcyc7XG5pbXBvcnQgaW52YXJpYW50IGZyb20gJ2ludmFyaWFudCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBTdWJzY3JpcHRpb24gZnJvbSAnLi4vdXRpbHMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHN0b3JlU2hhcGUsIHN1YnNjcmlwdGlvblNoYXBlIH0gZnJvbSAnLi4vdXRpbHMvUHJvcFR5cGVzJztcblxudmFyIGhvdFJlbG9hZGluZ1ZlcnNpb24gPSAwO1xudmFyIGR1bW15U3RhdGUgPSB7fTtcbmZ1bmN0aW9uIG5vb3AoKSB7fVxuZnVuY3Rpb24gbWFrZVNlbGVjdG9yU3RhdGVmdWwoc291cmNlU2VsZWN0b3IsIHN0b3JlKSB7XG4gIC8vIHdyYXAgdGhlIHNlbGVjdG9yIGluIGFuIG9iamVjdCB0aGF0IHRyYWNrcyBpdHMgcmVzdWx0cyBiZXR3ZWVuIHJ1bnMuXG4gIHZhciBzZWxlY3RvciA9IHtcbiAgICBydW46IGZ1bmN0aW9uIHJ1bkNvbXBvbmVudFNlbGVjdG9yKHByb3BzKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgbmV4dFByb3BzID0gc291cmNlU2VsZWN0b3Ioc3RvcmUuZ2V0U3RhdGUoKSwgcHJvcHMpO1xuICAgICAgICBpZiAobmV4dFByb3BzICE9PSBzZWxlY3Rvci5wcm9wcyB8fCBzZWxlY3Rvci5lcnJvcikge1xuICAgICAgICAgIHNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgc2VsZWN0b3IucHJvcHMgPSBuZXh0UHJvcHM7XG4gICAgICAgICAgc2VsZWN0b3IuZXJyb3IgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBzZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSB0cnVlO1xuICAgICAgICBzZWxlY3Rvci5lcnJvciA9IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gc2VsZWN0b3I7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbm5lY3RBZHZhbmNlZChcbi8qXG4gIHNlbGVjdG9yRmFjdG9yeSBpcyBhIGZ1bmMgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgcmV0dXJuaW5nIHRoZSBzZWxlY3RvciBmdW5jdGlvbiB1c2VkIHRvXG4gIGNvbXB1dGUgbmV3IHByb3BzIGZyb20gc3RhdGUsIHByb3BzLCBhbmQgZGlzcGF0Y2guIEZvciBleGFtcGxlOlxuICAgICBleHBvcnQgZGVmYXVsdCBjb25uZWN0QWR2YW5jZWQoKGRpc3BhdGNoLCBvcHRpb25zKSA9PiAoc3RhdGUsIHByb3BzKSA9PiAoe1xuICAgICAgdGhpbmc6IHN0YXRlLnRoaW5nc1twcm9wcy50aGluZ0lkXSxcbiAgICAgIHNhdmVUaGluZzogZmllbGRzID0+IGRpc3BhdGNoKGFjdGlvbkNyZWF0b3JzLnNhdmVUaGluZyhwcm9wcy50aGluZ0lkLCBmaWVsZHMpKSxcbiAgICB9KSkoWW91ckNvbXBvbmVudClcbiAgIEFjY2VzcyB0byBkaXNwYXRjaCBpcyBwcm92aWRlZCB0byB0aGUgZmFjdG9yeSBzbyBzZWxlY3RvckZhY3RvcmllcyBjYW4gYmluZCBhY3Rpb25DcmVhdG9yc1xuICBvdXRzaWRlIG9mIHRoZWlyIHNlbGVjdG9yIGFzIGFuIG9wdGltaXphdGlvbi4gT3B0aW9ucyBwYXNzZWQgdG8gY29ubmVjdEFkdmFuY2VkIGFyZSBwYXNzZWQgdG9cbiAgdGhlIHNlbGVjdG9yRmFjdG9yeSwgYWxvbmcgd2l0aCBkaXNwbGF5TmFtZSBhbmQgV3JhcHBlZENvbXBvbmVudCwgYXMgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgIE5vdGUgdGhhdCBzZWxlY3RvckZhY3RvcnkgaXMgcmVzcG9uc2libGUgZm9yIGFsbCBjYWNoaW5nL21lbW9pemF0aW9uIG9mIGluYm91bmQgYW5kIG91dGJvdW5kXG4gIHByb3BzLiBEbyBub3QgdXNlIGNvbm5lY3RBZHZhbmNlZCBkaXJlY3RseSB3aXRob3V0IG1lbW9pemluZyByZXN1bHRzIGJldHdlZW4gY2FsbHMgdG8geW91clxuICBzZWxlY3Rvciwgb3RoZXJ3aXNlIHRoZSBDb25uZWN0IGNvbXBvbmVudCB3aWxsIHJlLXJlbmRlciBvbiBldmVyeSBzdGF0ZSBvciBwcm9wcyBjaGFuZ2UuXG4qL1xuc2VsZWN0b3JGYWN0b3J5KSB7XG4gIHZhciBfY29udGV4dFR5cGVzLCBfY2hpbGRDb250ZXh0VHlwZXM7XG5cbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgX3JlZiRnZXREaXNwbGF5TmFtZSA9IF9yZWYuZ2V0RGlzcGxheU5hbWUsXG4gICAgICBnZXREaXNwbGF5TmFtZSA9IF9yZWYkZ2V0RGlzcGxheU5hbWUgPT09IHVuZGVmaW5lZCA/IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuICdDb25uZWN0QWR2YW5jZWQoJyArIG5hbWUgKyAnKSc7XG4gIH0gOiBfcmVmJGdldERpc3BsYXlOYW1lLFxuICAgICAgX3JlZiRtZXRob2ROYW1lID0gX3JlZi5tZXRob2ROYW1lLFxuICAgICAgbWV0aG9kTmFtZSA9IF9yZWYkbWV0aG9kTmFtZSA9PT0gdW5kZWZpbmVkID8gJ2Nvbm5lY3RBZHZhbmNlZCcgOiBfcmVmJG1ldGhvZE5hbWUsXG4gICAgICBfcmVmJHJlbmRlckNvdW50UHJvcCA9IF9yZWYucmVuZGVyQ291bnRQcm9wLFxuICAgICAgcmVuZGVyQ291bnRQcm9wID0gX3JlZiRyZW5kZXJDb3VudFByb3AgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IF9yZWYkcmVuZGVyQ291bnRQcm9wLFxuICAgICAgX3JlZiRzaG91bGRIYW5kbGVTdGF0ID0gX3JlZi5zaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMsXG4gICAgICBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMgPSBfcmVmJHNob3VsZEhhbmRsZVN0YXQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmJHNob3VsZEhhbmRsZVN0YXQsXG4gICAgICBfcmVmJHN0b3JlS2V5ID0gX3JlZi5zdG9yZUtleSxcbiAgICAgIHN0b3JlS2V5ID0gX3JlZiRzdG9yZUtleSA9PT0gdW5kZWZpbmVkID8gJ3N0b3JlJyA6IF9yZWYkc3RvcmVLZXksXG4gICAgICBfcmVmJHdpdGhSZWYgPSBfcmVmLndpdGhSZWYsXG4gICAgICB3aXRoUmVmID0gX3JlZiR3aXRoUmVmID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkd2l0aFJlZixcbiAgICAgIGNvbm5lY3RPcHRpb25zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnZ2V0RGlzcGxheU5hbWUnLCAnbWV0aG9kTmFtZScsICdyZW5kZXJDb3VudFByb3AnLCAnc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzJywgJ3N0b3JlS2V5JywgJ3dpdGhSZWYnXSk7XG5cbiAgdmFyIHN1YnNjcmlwdGlvbktleSA9IHN0b3JlS2V5ICsgJ1N1YnNjcmlwdGlvbic7XG4gIHZhciB2ZXJzaW9uID0gaG90UmVsb2FkaW5nVmVyc2lvbisrO1xuXG4gIHZhciBjb250ZXh0VHlwZXMgPSAoX2NvbnRleHRUeXBlcyA9IHt9LCBfY29udGV4dFR5cGVzW3N0b3JlS2V5XSA9IHN0b3JlU2hhcGUsIF9jb250ZXh0VHlwZXNbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvblNoYXBlLCBfY29udGV4dFR5cGVzKTtcbiAgdmFyIGNoaWxkQ29udGV4dFR5cGVzID0gKF9jaGlsZENvbnRleHRUeXBlcyA9IHt9LCBfY2hpbGRDb250ZXh0VHlwZXNbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvblNoYXBlLCBfY2hpbGRDb250ZXh0VHlwZXMpO1xuXG4gIHJldHVybiBmdW5jdGlvbiB3cmFwV2l0aENvbm5lY3QoV3JhcHBlZENvbXBvbmVudCkge1xuICAgIGludmFyaWFudCh0eXBlb2YgV3JhcHBlZENvbXBvbmVudCA9PSAnZnVuY3Rpb24nLCAnWW91IG11c3QgcGFzcyBhIGNvbXBvbmVudCB0byB0aGUgZnVuY3Rpb24gcmV0dXJuZWQgYnkgJyArIChtZXRob2ROYW1lICsgJy4gSW5zdGVhZCByZWNlaXZlZCAnICsgSlNPTi5zdHJpbmdpZnkoV3JhcHBlZENvbXBvbmVudCkpKTtcblxuICAgIHZhciB3cmFwcGVkQ29tcG9uZW50TmFtZSA9IFdyYXBwZWRDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgV3JhcHBlZENvbXBvbmVudC5uYW1lIHx8ICdDb21wb25lbnQnO1xuXG4gICAgdmFyIGRpc3BsYXlOYW1lID0gZ2V0RGlzcGxheU5hbWUod3JhcHBlZENvbXBvbmVudE5hbWUpO1xuXG4gICAgdmFyIHNlbGVjdG9yRmFjdG9yeU9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgY29ubmVjdE9wdGlvbnMsIHtcbiAgICAgIGdldERpc3BsYXlOYW1lOiBnZXREaXNwbGF5TmFtZSxcbiAgICAgIG1ldGhvZE5hbWU6IG1ldGhvZE5hbWUsXG4gICAgICByZW5kZXJDb3VudFByb3A6IHJlbmRlckNvdW50UHJvcCxcbiAgICAgIHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlczogc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzLFxuICAgICAgc3RvcmVLZXk6IHN0b3JlS2V5LFxuICAgICAgd2l0aFJlZjogd2l0aFJlZixcbiAgICAgIGRpc3BsYXlOYW1lOiBkaXNwbGF5TmFtZSxcbiAgICAgIHdyYXBwZWRDb21wb25lbnROYW1lOiB3cmFwcGVkQ29tcG9uZW50TmFtZSxcbiAgICAgIFdyYXBwZWRDb21wb25lbnQ6IFdyYXBwZWRDb21wb25lbnRcbiAgICB9KTtcblxuICAgIHZhciBDb25uZWN0ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgICAgIF9pbmhlcml0cyhDb25uZWN0LCBfQ29tcG9uZW50KTtcblxuICAgICAgZnVuY3Rpb24gQ29ubmVjdChwcm9wcywgY29udGV4dCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29ubmVjdCk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICAgICAgX3RoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIF90aGlzLnN0YXRlID0ge307XG4gICAgICAgIF90aGlzLnJlbmRlckNvdW50ID0gMDtcbiAgICAgICAgX3RoaXMuc3RvcmUgPSBwcm9wc1tzdG9yZUtleV0gfHwgY29udGV4dFtzdG9yZUtleV07XG4gICAgICAgIF90aGlzLnByb3BzTW9kZSA9IEJvb2xlYW4ocHJvcHNbc3RvcmVLZXldKTtcbiAgICAgICAgX3RoaXMuc2V0V3JhcHBlZEluc3RhbmNlID0gX3RoaXMuc2V0V3JhcHBlZEluc3RhbmNlLmJpbmQoX3RoaXMpO1xuXG4gICAgICAgIGludmFyaWFudChfdGhpcy5zdG9yZSwgJ0NvdWxkIG5vdCBmaW5kIFwiJyArIHN0b3JlS2V5ICsgJ1wiIGluIGVpdGhlciB0aGUgY29udGV4dCBvciBwcm9wcyBvZiAnICsgKCdcIicgKyBkaXNwbGF5TmFtZSArICdcIi4gRWl0aGVyIHdyYXAgdGhlIHJvb3QgY29tcG9uZW50IGluIGEgPFByb3ZpZGVyPiwgJykgKyAoJ29yIGV4cGxpY2l0bHkgcGFzcyBcIicgKyBzdG9yZUtleSArICdcIiBhcyBhIHByb3AgdG8gXCInICsgZGlzcGxheU5hbWUgKyAnXCIuJykpO1xuXG4gICAgICAgIF90aGlzLmluaXRTZWxlY3RvcigpO1xuICAgICAgICBfdGhpcy5pbml0U3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICAgIH1cblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ID0gZnVuY3Rpb24gZ2V0Q2hpbGRDb250ZXh0KCkge1xuICAgICAgICB2YXIgX3JlZjI7XG5cbiAgICAgICAgLy8gSWYgdGhpcyBjb21wb25lbnQgcmVjZWl2ZWQgc3RvcmUgZnJvbSBwcm9wcywgaXRzIHN1YnNjcmlwdGlvbiBzaG91bGQgYmUgdHJhbnNwYXJlbnRcbiAgICAgICAgLy8gdG8gYW55IGRlc2NlbmRhbnRzIHJlY2VpdmluZyBzdG9yZStzdWJzY3JpcHRpb24gZnJvbSBjb250ZXh0OyBpdCBwYXNzZXMgYWxvbmdcbiAgICAgICAgLy8gc3Vic2NyaXB0aW9uIHBhc3NlZCB0byBpdC4gT3RoZXJ3aXNlLCBpdCBzaGFkb3dzIHRoZSBwYXJlbnQgc3Vic2NyaXB0aW9uLCB3aGljaCBhbGxvd3NcbiAgICAgICAgLy8gQ29ubmVjdCB0byBjb250cm9sIG9yZGVyaW5nIG9mIG5vdGlmaWNhdGlvbnMgdG8gZmxvdyB0b3AtZG93bi5cbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRoaXMucHJvcHNNb2RlID8gbnVsbCA6IHRoaXMuc3Vic2NyaXB0aW9uO1xuICAgICAgICByZXR1cm4gX3JlZjIgPSB7fSwgX3JlZjJbc3Vic2NyaXB0aW9uS2V5XSA9IHN1YnNjcmlwdGlvbiB8fCB0aGlzLmNvbnRleHRbc3Vic2NyaXB0aW9uS2V5XSwgX3JlZjI7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAoIXNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcykgcmV0dXJuO1xuXG4gICAgICAgIC8vIGNvbXBvbmVudFdpbGxNb3VudCBmaXJlcyBkdXJpbmcgc2VydmVyIHNpZGUgcmVuZGVyaW5nLCBidXQgY29tcG9uZW50RGlkTW91bnQgYW5kXG4gICAgICAgIC8vIGNvbXBvbmVudFdpbGxVbm1vdW50IGRvIG5vdC4gQmVjYXVzZSBvZiB0aGlzLCB0cnlTdWJzY3JpYmUgaGFwcGVucyBkdXJpbmcgLi4uZGlkTW91bnQuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgdW5zdWJzY3JpcHRpb24gd291bGQgbmV2ZXIgdGFrZSBwbGFjZSBkdXJpbmcgU1NSLCBjYXVzaW5nIGEgbWVtb3J5IGxlYWsuXG4gICAgICAgIC8vIFRvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSBhIGNoaWxkIGNvbXBvbmVudCBtYXkgaGF2ZSB0cmlnZ2VyZWQgYSBzdGF0ZSBjaGFuZ2UgYnlcbiAgICAgICAgLy8gZGlzcGF0Y2hpbmcgYW4gYWN0aW9uIGluIGl0cyBjb21wb25lbnRXaWxsTW91bnQsIHdlIGhhdmUgdG8gcmUtcnVuIHRoZSBzZWxlY3QgYW5kIG1heWJlXG4gICAgICAgIC8vIHJlLXJlbmRlci5cbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udHJ5U3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKHRoaXMucHJvcHMpO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUpIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bihuZXh0UHJvcHMpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGU7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVW5tb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHRoaXMuc3Vic2NyaXB0aW9uLnRyeVVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzID0gbm9vcDtcbiAgICAgICAgdGhpcy5zdG9yZSA9IG51bGw7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuID0gbm9vcDtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmYWxzZTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmdldFdyYXBwZWRJbnN0YW5jZSA9IGZ1bmN0aW9uIGdldFdyYXBwZWRJbnN0YW5jZSgpIHtcbiAgICAgICAgaW52YXJpYW50KHdpdGhSZWYsICdUbyBhY2Nlc3MgdGhlIHdyYXBwZWQgaW5zdGFuY2UsIHlvdSBuZWVkIHRvIHNwZWNpZnkgJyArICgneyB3aXRoUmVmOiB0cnVlIH0gaW4gdGhlIG9wdGlvbnMgYXJndW1lbnQgb2YgdGhlICcgKyBtZXRob2ROYW1lICsgJygpIGNhbGwuJykpO1xuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVkSW5zdGFuY2U7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5zZXRXcmFwcGVkSW5zdGFuY2UgPSBmdW5jdGlvbiBzZXRXcmFwcGVkSW5zdGFuY2UocmVmKSB7XG4gICAgICAgIHRoaXMud3JhcHBlZEluc3RhbmNlID0gcmVmO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuaW5pdFNlbGVjdG9yID0gZnVuY3Rpb24gaW5pdFNlbGVjdG9yKCkge1xuICAgICAgICB2YXIgc291cmNlU2VsZWN0b3IgPSBzZWxlY3RvckZhY3RvcnkodGhpcy5zdG9yZS5kaXNwYXRjaCwgc2VsZWN0b3JGYWN0b3J5T3B0aW9ucyk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSBtYWtlU2VsZWN0b3JTdGF0ZWZ1bChzb3VyY2VTZWxlY3RvciwgdGhpcy5zdG9yZSk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKHRoaXMucHJvcHMpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuaW5pdFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uIGluaXRTdWJzY3JpcHRpb24oKSB7XG4gICAgICAgIGlmICghc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzKSByZXR1cm47XG5cbiAgICAgICAgLy8gcGFyZW50U3ViJ3Mgc291cmNlIHNob3VsZCBtYXRjaCB3aGVyZSBzdG9yZSBjYW1lIGZyb206IHByb3BzIHZzLiBjb250ZXh0LiBBIGNvbXBvbmVudFxuICAgICAgICAvLyBjb25uZWN0ZWQgdG8gdGhlIHN0b3JlIHZpYSBwcm9wcyBzaG91bGRuJ3QgdXNlIHN1YnNjcmlwdGlvbiBmcm9tIGNvbnRleHQsIG9yIHZpY2UgdmVyc2EuXG4gICAgICAgIHZhciBwYXJlbnRTdWIgPSAodGhpcy5wcm9wc01vZGUgPyB0aGlzLnByb3BzIDogdGhpcy5jb250ZXh0KVtzdWJzY3JpcHRpb25LZXldO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24odGhpcy5zdG9yZSwgcGFyZW50U3ViLCB0aGlzLm9uU3RhdGVDaGFuZ2UuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gYG5vdGlmeU5lc3RlZFN1YnNgIGlzIGR1cGxpY2F0ZWQgdG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSBjb21wb25lbnQgaXMgIHVubW91bnRlZCBpblxuICAgICAgICAvLyB0aGUgbWlkZGxlIG9mIHRoZSBub3RpZmljYXRpb24gbG9vcCwgd2hlcmUgYHRoaXMuc3Vic2NyaXB0aW9uYCB3aWxsIHRoZW4gYmUgbnVsbC4gQW5cbiAgICAgICAgLy8gZXh0cmEgbnVsbCBjaGVjayBldmVyeSBjaGFuZ2UgY2FuIGJlIGF2b2lkZWQgYnkgY29weWluZyB0aGUgbWV0aG9kIG9udG8gYHRoaXNgIGFuZCB0aGVuXG4gICAgICAgIC8vIHJlcGxhY2luZyBpdCB3aXRoIGEgbm8tb3Agb24gdW5tb3VudC4gVGhpcyBjYW4gcHJvYmFibHkgYmUgYXZvaWRlZCBpZiBTdWJzY3JpcHRpb24nc1xuICAgICAgICAvLyBsaXN0ZW5lcnMgbG9naWMgaXMgY2hhbmdlZCB0byBub3QgY2FsbCBsaXN0ZW5lcnMgdGhhdCBoYXZlIGJlZW4gdW5zdWJzY3JpYmVkIGluIHRoZVxuICAgICAgICAvLyBtaWRkbGUgb2YgdGhlIG5vdGlmaWNhdGlvbiBsb29wLlxuICAgICAgICB0aGlzLm5vdGlmeU5lc3RlZFN1YnMgPSB0aGlzLnN1YnNjcmlwdGlvbi5ub3RpZnlOZXN0ZWRTdWJzLmJpbmQodGhpcy5zdWJzY3JpcHRpb24pO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUub25TdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uIG9uU3RhdGVDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKHRoaXMucHJvcHMpO1xuXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUpIHtcbiAgICAgICAgICB0aGlzLm5vdGlmeU5lc3RlZFN1YnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSA9IHRoaXMubm90aWZ5TmVzdGVkU3Vic09uQ29tcG9uZW50RGlkVXBkYXRlO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoZHVtbXlTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLm5vdGlmeU5lc3RlZFN1YnNPbkNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIG5vdGlmeU5lc3RlZFN1YnNPbkNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgLy8gYGNvbXBvbmVudERpZFVwZGF0ZWAgaXMgY29uZGl0aW9uYWxseSBpbXBsZW1lbnRlZCB3aGVuIGBvblN0YXRlQ2hhbmdlYCBkZXRlcm1pbmVzIGl0XG4gICAgICAgIC8vIG5lZWRzIHRvIG5vdGlmeSBuZXN0ZWQgc3Vicy4gT25jZSBjYWxsZWQsIGl0IHVuaW1wbGVtZW50cyBpdHNlbGYgdW50aWwgZnVydGhlciBzdGF0ZVxuICAgICAgICAvLyBjaGFuZ2VzIG9jY3VyLiBEb2luZyBpdCB0aGlzIHdheSB2cyBoYXZpbmcgYSBwZXJtYW5lbnQgYGNvbXBvbmVudERpZFVwZGF0ZWAgdGhhdCBkb2VzXG4gICAgICAgIC8vIGEgYm9vbGVhbiBjaGVjayBldmVyeSB0aW1lIGF2b2lkcyBhbiBleHRyYSBtZXRob2QgY2FsbCBtb3N0IG9mIHRoZSB0aW1lLCByZXN1bHRpbmdcbiAgICAgICAgLy8gaW4gc29tZSBwZXJmIGJvb3N0LlxuICAgICAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzKCk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5pc1N1YnNjcmliZWQgPSBmdW5jdGlvbiBpc1N1YnNjcmliZWQoKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKHRoaXMuc3Vic2NyaXB0aW9uKSAmJiB0aGlzLnN1YnNjcmlwdGlvbi5pc1N1YnNjcmliZWQoKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmFkZEV4dHJhUHJvcHMgPSBmdW5jdGlvbiBhZGRFeHRyYVByb3BzKHByb3BzKSB7XG4gICAgICAgIGlmICghd2l0aFJlZiAmJiAhcmVuZGVyQ291bnRQcm9wICYmICEodGhpcy5wcm9wc01vZGUgJiYgdGhpcy5zdWJzY3JpcHRpb24pKSByZXR1cm4gcHJvcHM7XG4gICAgICAgIC8vIG1ha2UgYSBzaGFsbG93IGNvcHkgc28gdGhhdCBmaWVsZHMgYWRkZWQgZG9uJ3QgbGVhayB0byB0aGUgb3JpZ2luYWwgc2VsZWN0b3IuXG4gICAgICAgIC8vIHRoaXMgaXMgZXNwZWNpYWxseSBpbXBvcnRhbnQgZm9yICdyZWYnIHNpbmNlIHRoYXQncyBhIHJlZmVyZW5jZSBiYWNrIHRvIHRoZSBjb21wb25lbnRcbiAgICAgICAgLy8gaW5zdGFuY2UuIGEgc2luZ2xldG9uIG1lbW9pemVkIHNlbGVjdG9yIHdvdWxkIHRoZW4gYmUgaG9sZGluZyBhIHJlZmVyZW5jZSB0byB0aGVcbiAgICAgICAgLy8gaW5zdGFuY2UsIHByZXZlbnRpbmcgdGhlIGluc3RhbmNlIGZyb20gYmVpbmcgZ2FyYmFnZSBjb2xsZWN0ZWQsIGFuZCB0aGF0IHdvdWxkIGJlIGJhZFxuICAgICAgICB2YXIgd2l0aEV4dHJhcyA9IF9leHRlbmRzKHt9LCBwcm9wcyk7XG4gICAgICAgIGlmICh3aXRoUmVmKSB3aXRoRXh0cmFzLnJlZiA9IHRoaXMuc2V0V3JhcHBlZEluc3RhbmNlO1xuICAgICAgICBpZiAocmVuZGVyQ291bnRQcm9wKSB3aXRoRXh0cmFzW3JlbmRlckNvdW50UHJvcF0gPSB0aGlzLnJlbmRlckNvdW50Kys7XG4gICAgICAgIGlmICh0aGlzLnByb3BzTW9kZSAmJiB0aGlzLnN1YnNjcmlwdGlvbikgd2l0aEV4dHJhc1tzdWJzY3JpcHRpb25LZXldID0gdGhpcy5zdWJzY3JpcHRpb247XG4gICAgICAgIHJldHVybiB3aXRoRXh0cmFzO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICB2YXIgc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yO1xuICAgICAgICBzZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmYWxzZTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IuZXJyb3IpIHtcbiAgICAgICAgICB0aHJvdyBzZWxlY3Rvci5lcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY3JlYXRlRWxlbWVudChXcmFwcGVkQ29tcG9uZW50LCB0aGlzLmFkZEV4dHJhUHJvcHMoc2VsZWN0b3IucHJvcHMpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbm5lY3Q7XG4gICAgfShDb21wb25lbnQpO1xuXG4gICAgQ29ubmVjdC5XcmFwcGVkQ29tcG9uZW50ID0gV3JhcHBlZENvbXBvbmVudDtcbiAgICBDb25uZWN0LmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gICAgQ29ubmVjdC5jaGlsZENvbnRleHRUeXBlcyA9IGNoaWxkQ29udGV4dFR5cGVzO1xuICAgIENvbm5lY3QuY29udGV4dFR5cGVzID0gY29udGV4dFR5cGVzO1xuICAgIENvbm5lY3QucHJvcFR5cGVzID0gY29udGV4dFR5cGVzO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVXBkYXRlKCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAvLyBXZSBhcmUgaG90IHJlbG9hZGluZyFcbiAgICAgICAgaWYgKHRoaXMudmVyc2lvbiAhPT0gdmVyc2lvbikge1xuICAgICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgICAgdGhpcy5pbml0U2VsZWN0b3IoKTtcblxuICAgICAgICAgIC8vIElmIGFueSBjb25uZWN0ZWQgZGVzY2VuZGFudHMgZG9uJ3QgaG90IHJlbG9hZCAoYW5kIHJlc3Vic2NyaWJlIGluIHRoZSBwcm9jZXNzKSwgdGhlaXJcbiAgICAgICAgICAvLyBsaXN0ZW5lcnMgd2lsbCBiZSBsb3N0IHdoZW4gd2UgdW5zdWJzY3JpYmUuIFVuZm9ydHVuYXRlbHksIGJ5IGNvcHlpbmcgb3ZlciBhbGxcbiAgICAgICAgICAvLyBsaXN0ZW5lcnMsIHRoaXMgZG9lcyBtZWFuIHRoYXQgdGhlIG9sZCB2ZXJzaW9ucyBvZiBjb25uZWN0ZWQgZGVzY2VuZGFudHMgd2lsbCBzdGlsbCBiZVxuICAgICAgICAgIC8vIG5vdGlmaWVkIG9mIHN0YXRlIGNoYW5nZXM7IGhvd2V2ZXIsIHRoZWlyIG9uU3RhdGVDaGFuZ2UgZnVuY3Rpb24gaXMgYSBuby1vcCBzbyB0aGlzXG4gICAgICAgICAgLy8gaXNuJ3QgYSBodWdlIGRlYWwuXG4gICAgICAgICAgdmFyIG9sZExpc3RlbmVycyA9IFtdO1xuXG4gICAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBvbGRMaXN0ZW5lcnMgPSB0aGlzLnN1YnNjcmlwdGlvbi5saXN0ZW5lcnMuZ2V0KCk7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi50cnlVbnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmluaXRTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgICBpZiAoc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi50cnlTdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIG9sZExpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLnN1YnNjcmlwdGlvbi5saXN0ZW5lcnMuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaG9pc3RTdGF0aWNzKENvbm5lY3QsIFdyYXBwZWRDb21wb25lbnQpO1xuICB9O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2NvbXBvbmVudHMvY29ubmVjdEFkdmFuY2VkLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb21wb25lbnRzL2Nvbm5lY3RBZHZhbmNlZC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmltcG9ydCBjb25uZWN0QWR2YW5jZWQgZnJvbSAnLi4vY29tcG9uZW50cy9jb25uZWN0QWR2YW5jZWQnO1xuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlscy9zaGFsbG93RXF1YWwnO1xuaW1wb3J0IGRlZmF1bHRNYXBEaXNwYXRjaFRvUHJvcHNGYWN0b3JpZXMgZnJvbSAnLi9tYXBEaXNwYXRjaFRvUHJvcHMnO1xuaW1wb3J0IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgZnJvbSAnLi9tYXBTdGF0ZVRvUHJvcHMnO1xuaW1wb3J0IGRlZmF1bHRNZXJnZVByb3BzRmFjdG9yaWVzIGZyb20gJy4vbWVyZ2VQcm9wcyc7XG5pbXBvcnQgZGVmYXVsdFNlbGVjdG9yRmFjdG9yeSBmcm9tICcuL3NlbGVjdG9yRmFjdG9yeSc7XG5cbi8qXG4gIGNvbm5lY3QgaXMgYSBmYWNhZGUgb3ZlciBjb25uZWN0QWR2YW5jZWQuIEl0IHR1cm5zIGl0cyBhcmdzIGludG8gYSBjb21wYXRpYmxlXG4gIHNlbGVjdG9yRmFjdG9yeSwgd2hpY2ggaGFzIHRoZSBzaWduYXR1cmU6XG5cbiAgICAoZGlzcGF0Y2gsIG9wdGlvbnMpID0+IChuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykgPT4gbmV4dEZpbmFsUHJvcHNcbiAgXG4gIGNvbm5lY3QgcGFzc2VzIGl0cyBhcmdzIHRvIGNvbm5lY3RBZHZhbmNlZCBhcyBvcHRpb25zLCB3aGljaCB3aWxsIGluIHR1cm4gcGFzcyB0aGVtIHRvXG4gIHNlbGVjdG9yRmFjdG9yeSBlYWNoIHRpbWUgYSBDb25uZWN0IGNvbXBvbmVudCBpbnN0YW5jZSBpcyBpbnN0YW50aWF0ZWQgb3IgaG90IHJlbG9hZGVkLlxuXG4gIHNlbGVjdG9yRmFjdG9yeSByZXR1cm5zIGEgZmluYWwgcHJvcHMgc2VsZWN0b3IgZnJvbSBpdHMgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLCBtZXJnZVByb3BzLFxuICBtZXJnZVByb3BzRmFjdG9yaWVzLCBhbmQgcHVyZSBhcmdzLlxuXG4gIFRoZSByZXN1bHRpbmcgZmluYWwgcHJvcHMgc2VsZWN0b3IgaXMgY2FsbGVkIGJ5IHRoZSBDb25uZWN0IGNvbXBvbmVudCBpbnN0YW5jZSB3aGVuZXZlclxuICBpdCByZWNlaXZlcyBuZXcgcHJvcHMgb3Igc3RvcmUgc3RhdGUuXG4gKi9cblxuZnVuY3Rpb24gbWF0Y2goYXJnLCBmYWN0b3JpZXMsIG5hbWUpIHtcbiAgZm9yICh2YXIgaSA9IGZhY3Rvcmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciByZXN1bHQgPSBmYWN0b3JpZXNbaV0oYXJnKTtcbiAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCwgb3B0aW9ucykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSBvZiB0eXBlICcgKyB0eXBlb2YgYXJnICsgJyBmb3IgJyArIG5hbWUgKyAnIGFyZ3VtZW50IHdoZW4gY29ubmVjdGluZyBjb21wb25lbnQgJyArIG9wdGlvbnMud3JhcHBlZENvbXBvbmVudE5hbWUgKyAnLicpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHJpY3RFcXVhbChhLCBiKSB7XG4gIHJldHVybiBhID09PSBiO1xufVxuXG4vLyBjcmVhdGVDb25uZWN0IHdpdGggZGVmYXVsdCBhcmdzIGJ1aWxkcyB0aGUgJ29mZmljaWFsJyBjb25uZWN0IGJlaGF2aW9yLiBDYWxsaW5nIGl0IHdpdGhcbi8vIGRpZmZlcmVudCBvcHRpb25zIG9wZW5zIHVwIHNvbWUgdGVzdGluZyBhbmQgZXh0ZW5zaWJpbGl0eSBzY2VuYXJpb3NcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb25uZWN0KCkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICBfcmVmJGNvbm5lY3RIT0MgPSBfcmVmLmNvbm5lY3RIT0MsXG4gICAgICBjb25uZWN0SE9DID0gX3JlZiRjb25uZWN0SE9DID09PSB1bmRlZmluZWQgPyBjb25uZWN0QWR2YW5jZWQgOiBfcmVmJGNvbm5lY3RIT0MsXG4gICAgICBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YgPSBfcmVmLm1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWFwU3RhdGVUb1Byb3BzRiA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdE1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyA6IF9yZWYkbWFwU3RhdGVUb1Byb3BzRixcbiAgICAgIF9yZWYkbWFwRGlzcGF0Y2hUb1BybyA9IF9yZWYubWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLFxuICAgICAgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzID0gX3JlZiRtYXBEaXNwYXRjaFRvUHJvID09PSB1bmRlZmluZWQgPyBkZWZhdWx0TWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzIDogX3JlZiRtYXBEaXNwYXRjaFRvUHJvLFxuICAgICAgX3JlZiRtZXJnZVByb3BzRmFjdG9yID0gX3JlZi5tZXJnZVByb3BzRmFjdG9yaWVzLFxuICAgICAgbWVyZ2VQcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWVyZ2VQcm9wc0ZhY3RvciA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdE1lcmdlUHJvcHNGYWN0b3JpZXMgOiBfcmVmJG1lcmdlUHJvcHNGYWN0b3IsXG4gICAgICBfcmVmJHNlbGVjdG9yRmFjdG9yeSA9IF9yZWYuc2VsZWN0b3JGYWN0b3J5LFxuICAgICAgc2VsZWN0b3JGYWN0b3J5ID0gX3JlZiRzZWxlY3RvckZhY3RvcnkgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRTZWxlY3RvckZhY3RvcnkgOiBfcmVmJHNlbGVjdG9yRmFjdG9yeTtcblxuICByZXR1cm4gZnVuY3Rpb24gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcykge1xuICAgIHZhciBfcmVmMiA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDoge30sXG4gICAgICAgIF9yZWYyJHB1cmUgPSBfcmVmMi5wdXJlLFxuICAgICAgICBwdXJlID0gX3JlZjIkcHVyZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYyJHB1cmUsXG4gICAgICAgIF9yZWYyJGFyZVN0YXRlc0VxdWFsID0gX3JlZjIuYXJlU3RhdGVzRXF1YWwsXG4gICAgICAgIGFyZVN0YXRlc0VxdWFsID0gX3JlZjIkYXJlU3RhdGVzRXF1YWwgPT09IHVuZGVmaW5lZCA/IHN0cmljdEVxdWFsIDogX3JlZjIkYXJlU3RhdGVzRXF1YWwsXG4gICAgICAgIF9yZWYyJGFyZU93blByb3BzRXF1YSA9IF9yZWYyLmFyZU93blByb3BzRXF1YWwsXG4gICAgICAgIGFyZU93blByb3BzRXF1YWwgPSBfcmVmMiRhcmVPd25Qcm9wc0VxdWEgPT09IHVuZGVmaW5lZCA/IHNoYWxsb3dFcXVhbCA6IF9yZWYyJGFyZU93blByb3BzRXF1YSxcbiAgICAgICAgX3JlZjIkYXJlU3RhdGVQcm9wc0VxID0gX3JlZjIuYXJlU3RhdGVQcm9wc0VxdWFsLFxuICAgICAgICBhcmVTdGF0ZVByb3BzRXF1YWwgPSBfcmVmMiRhcmVTdGF0ZVByb3BzRXEgPT09IHVuZGVmaW5lZCA/IHNoYWxsb3dFcXVhbCA6IF9yZWYyJGFyZVN0YXRlUHJvcHNFcSxcbiAgICAgICAgX3JlZjIkYXJlTWVyZ2VkUHJvcHNFID0gX3JlZjIuYXJlTWVyZ2VkUHJvcHNFcXVhbCxcbiAgICAgICAgYXJlTWVyZ2VkUHJvcHNFcXVhbCA9IF9yZWYyJGFyZU1lcmdlZFByb3BzRSA9PT0gdW5kZWZpbmVkID8gc2hhbGxvd0VxdWFsIDogX3JlZjIkYXJlTWVyZ2VkUHJvcHNFLFxuICAgICAgICBleHRyYU9wdGlvbnMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZjIsIFsncHVyZScsICdhcmVTdGF0ZXNFcXVhbCcsICdhcmVPd25Qcm9wc0VxdWFsJywgJ2FyZVN0YXRlUHJvcHNFcXVhbCcsICdhcmVNZXJnZWRQcm9wc0VxdWFsJ10pO1xuXG4gICAgdmFyIGluaXRNYXBTdGF0ZVRvUHJvcHMgPSBtYXRjaChtYXBTdGF0ZVRvUHJvcHMsIG1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcywgJ21hcFN0YXRlVG9Qcm9wcycpO1xuICAgIHZhciBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzID0gbWF0Y2gobWFwRGlzcGF0Y2hUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHNGYWN0b3JpZXMsICdtYXBEaXNwYXRjaFRvUHJvcHMnKTtcbiAgICB2YXIgaW5pdE1lcmdlUHJvcHMgPSBtYXRjaChtZXJnZVByb3BzLCBtZXJnZVByb3BzRmFjdG9yaWVzLCAnbWVyZ2VQcm9wcycpO1xuXG4gICAgcmV0dXJuIGNvbm5lY3RIT0Moc2VsZWN0b3JGYWN0b3J5LCBfZXh0ZW5kcyh7XG4gICAgICAvLyB1c2VkIGluIGVycm9yIG1lc3NhZ2VzXG4gICAgICBtZXRob2ROYW1lOiAnY29ubmVjdCcsXG5cbiAgICAgIC8vIHVzZWQgdG8gY29tcHV0ZSBDb25uZWN0J3MgZGlzcGxheU5hbWUgZnJvbSB0aGUgd3JhcHBlZCBjb21wb25lbnQncyBkaXNwbGF5TmFtZS5cbiAgICAgIGdldERpc3BsYXlOYW1lOiBmdW5jdGlvbiBnZXREaXNwbGF5TmFtZShuYW1lKSB7XG4gICAgICAgIHJldHVybiAnQ29ubmVjdCgnICsgbmFtZSArICcpJztcbiAgICAgIH0sXG5cbiAgICAgIC8vIGlmIG1hcFN0YXRlVG9Qcm9wcyBpcyBmYWxzeSwgdGhlIENvbm5lY3QgY29tcG9uZW50IGRvZXNuJ3Qgc3Vic2NyaWJlIHRvIHN0b3JlIHN0YXRlIGNoYW5nZXNcbiAgICAgIHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlczogQm9vbGVhbihtYXBTdGF0ZVRvUHJvcHMpLFxuXG4gICAgICAvLyBwYXNzZWQgdGhyb3VnaCB0byBzZWxlY3RvckZhY3RvcnlcbiAgICAgIGluaXRNYXBTdGF0ZVRvUHJvcHM6IGluaXRNYXBTdGF0ZVRvUHJvcHMsXG4gICAgICBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzOiBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzLFxuICAgICAgaW5pdE1lcmdlUHJvcHM6IGluaXRNZXJnZVByb3BzLFxuICAgICAgcHVyZTogcHVyZSxcbiAgICAgIGFyZVN0YXRlc0VxdWFsOiBhcmVTdGF0ZXNFcXVhbCxcbiAgICAgIGFyZU93blByb3BzRXF1YWw6IGFyZU93blByb3BzRXF1YWwsXG4gICAgICBhcmVTdGF0ZVByb3BzRXF1YWw6IGFyZVN0YXRlUHJvcHNFcXVhbCxcbiAgICAgIGFyZU1lcmdlZFByb3BzRXF1YWw6IGFyZU1lcmdlZFByb3BzRXF1YWxcblxuICAgIH0sIGV4dHJhT3B0aW9ucykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb25uZWN0KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9jb25uZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L2Nvbm5lY3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgd3JhcE1hcFRvUHJvcHNDb25zdGFudCwgd3JhcE1hcFRvUHJvcHNGdW5jIH0gZnJvbSAnLi93cmFwTWFwVG9Qcm9wcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNGdW5jdGlvbihtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtYXBEaXNwYXRjaFRvUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwRGlzcGF0Y2hUb1Byb3BzLCAnbWFwRGlzcGF0Y2hUb1Byb3BzJykgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNNaXNzaW5nKG1hcERpc3BhdGNoVG9Qcm9wcykge1xuICByZXR1cm4gIW1hcERpc3BhdGNoVG9Qcm9wcyA/IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIHsgZGlzcGF0Y2g6IGRpc3BhdGNoIH07XG4gIH0pIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzT2JqZWN0KG1hcERpc3BhdGNoVG9Qcm9wcykge1xuICByZXR1cm4gbWFwRGlzcGF0Y2hUb1Byb3BzICYmIHR5cGVvZiBtYXBEaXNwYXRjaFRvUHJvcHMgPT09ICdvYmplY3QnID8gd3JhcE1hcFRvUHJvcHNDb25zdGFudChmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKG1hcERpc3BhdGNoVG9Qcm9wcywgZGlzcGF0Y2gpO1xuICB9KSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW3doZW5NYXBEaXNwYXRjaFRvUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNNaXNzaW5nLCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNPYmplY3RdO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWFwRGlzcGF0Y2hUb1Byb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21hcERpc3BhdGNoVG9Qcm9wcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgeyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50LCB3cmFwTWFwVG9Qcm9wc0Z1bmMgfSBmcm9tICcuL3dyYXBNYXBUb1Byb3BzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHdoZW5NYXBTdGF0ZVRvUHJvcHNJc0Z1bmN0aW9uKG1hcFN0YXRlVG9Qcm9wcykge1xuICByZXR1cm4gdHlwZW9mIG1hcFN0YXRlVG9Qcm9wcyA9PT0gJ2Z1bmN0aW9uJyA/IHdyYXBNYXBUb1Byb3BzRnVuYyhtYXBTdGF0ZVRvUHJvcHMsICdtYXBTdGF0ZVRvUHJvcHMnKSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdoZW5NYXBTdGF0ZVRvUHJvcHNJc01pc3NpbmcobWFwU3RhdGVUb1Byb3BzKSB7XG4gIHJldHVybiAhbWFwU3RhdGVUb1Byb3BzID8gd3JhcE1hcFRvUHJvcHNDb25zdGFudChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9KSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgW3doZW5NYXBTdGF0ZVRvUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWFwU3RhdGVUb1Byb3BzSXNNaXNzaW5nXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21hcFN0YXRlVG9Qcm9wcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9tYXBTdGF0ZVRvUHJvcHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuaW1wb3J0IHZlcmlmeVBsYWluT2JqZWN0IGZyb20gJy4uL3V0aWxzL3ZlcmlmeVBsYWluT2JqZWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRNZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSB7XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgb3duUHJvcHMsIHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcE1lcmdlUHJvcHNGdW5jKG1lcmdlUHJvcHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGluaXRNZXJnZVByb3BzUHJveHkoZGlzcGF0Y2gsIF9yZWYpIHtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSBfcmVmLmRpc3BsYXlOYW1lLFxuICAgICAgICBwdXJlID0gX3JlZi5wdXJlLFxuICAgICAgICBhcmVNZXJnZWRQcm9wc0VxdWFsID0gX3JlZi5hcmVNZXJnZWRQcm9wc0VxdWFsO1xuXG4gICAgdmFyIGhhc1J1bk9uY2UgPSBmYWxzZTtcbiAgICB2YXIgbWVyZ2VkUHJvcHMgPSB2b2lkIDA7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VQcm9wc1Byb3h5KHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSB7XG4gICAgICB2YXIgbmV4dE1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG5cbiAgICAgIGlmIChoYXNSdW5PbmNlKSB7XG4gICAgICAgIGlmICghcHVyZSB8fCAhYXJlTWVyZ2VkUHJvcHNFcXVhbChuZXh0TWVyZ2VkUHJvcHMsIG1lcmdlZFByb3BzKSkgbWVyZ2VkUHJvcHMgPSBuZXh0TWVyZ2VkUHJvcHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYXNSdW5PbmNlID0gdHJ1ZTtcbiAgICAgICAgbWVyZ2VkUHJvcHMgPSBuZXh0TWVyZ2VkUHJvcHM7XG5cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHZlcmlmeVBsYWluT2JqZWN0KG1lcmdlZFByb3BzLCBkaXNwbGF5TmFtZSwgJ21lcmdlUHJvcHMnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICAgIH07XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWVyZ2VQcm9wc0lzRnVuY3Rpb24obWVyZ2VQcm9wcykge1xuICByZXR1cm4gdHlwZW9mIG1lcmdlUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWVyZ2VQcm9wc0Z1bmMobWVyZ2VQcm9wcykgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aGVuTWVyZ2VQcm9wc0lzT21pdHRlZChtZXJnZVByb3BzKSB7XG4gIHJldHVybiAhbWVyZ2VQcm9wcyA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1lcmdlUHJvcHM7XG4gIH0gOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFt3aGVuTWVyZ2VQcm9wc0lzRnVuY3Rpb24sIHdoZW5NZXJnZVByb3BzSXNPbWl0dGVkXTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L21lcmdlUHJvcHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvbWVyZ2VQcm9wcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJmdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmltcG9ydCB2ZXJpZnlTdWJzZWxlY3RvcnMgZnJvbSAnLi92ZXJpZnlTdWJzZWxlY3RvcnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1wdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGltcHVyZUZpbmFsUHJvcHNTZWxlY3RvcihzdGF0ZSwgb3duUHJvcHMpIHtcbiAgICByZXR1cm4gbWVyZ2VQcm9wcyhtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKSwgbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyksIG93blByb3BzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1cmVGaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBkaXNwYXRjaCwgX3JlZikge1xuICB2YXIgYXJlU3RhdGVzRXF1YWwgPSBfcmVmLmFyZVN0YXRlc0VxdWFsLFxuICAgICAgYXJlT3duUHJvcHNFcXVhbCA9IF9yZWYuYXJlT3duUHJvcHNFcXVhbCxcbiAgICAgIGFyZVN0YXRlUHJvcHNFcXVhbCA9IF9yZWYuYXJlU3RhdGVQcm9wc0VxdWFsO1xuXG4gIHZhciBoYXNSdW5BdExlYXN0T25jZSA9IGZhbHNlO1xuICB2YXIgc3RhdGUgPSB2b2lkIDA7XG4gIHZhciBvd25Qcm9wcyA9IHZvaWQgMDtcbiAgdmFyIHN0YXRlUHJvcHMgPSB2b2lkIDA7XG4gIHZhciBkaXNwYXRjaFByb3BzID0gdm9pZCAwO1xuICB2YXIgbWVyZ2VkUHJvcHMgPSB2b2lkIDA7XG5cbiAgZnVuY3Rpb24gaGFuZGxlRmlyc3RDYWxsKGZpcnN0U3RhdGUsIGZpcnN0T3duUHJvcHMpIHtcbiAgICBzdGF0ZSA9IGZpcnN0U3RhdGU7XG4gICAgb3duUHJvcHMgPSBmaXJzdE93blByb3BzO1xuICAgIHN0YXRlUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKTtcbiAgICBkaXNwYXRjaFByb3BzID0gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG4gICAgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcbiAgICBoYXNSdW5BdExlYXN0T25jZSA9IHRydWU7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTmV3UHJvcHNBbmROZXdTdGF0ZSgpIHtcbiAgICBzdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG5cbiAgICBpZiAobWFwRGlzcGF0Y2hUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSBkaXNwYXRjaFByb3BzID0gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU5ld1Byb3BzKCkge1xuICAgIGlmIChtYXBTdGF0ZVRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMpIHN0YXRlUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKTtcblxuICAgIGlmIChtYXBEaXNwYXRjaFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMpIGRpc3BhdGNoUHJvcHMgPSBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG93blByb3BzKTtcblxuICAgIG1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTmV3U3RhdGUoKSB7XG4gICAgdmFyIG5leHRTdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG4gICAgdmFyIHN0YXRlUHJvcHNDaGFuZ2VkID0gIWFyZVN0YXRlUHJvcHNFcXVhbChuZXh0U3RhdGVQcm9wcywgc3RhdGVQcm9wcyk7XG4gICAgc3RhdGVQcm9wcyA9IG5leHRTdGF0ZVByb3BzO1xuXG4gICAgaWYgKHN0YXRlUHJvcHNDaGFuZ2VkKSBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuXG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlU3Vic2VxdWVudENhbGxzKG5leHRTdGF0ZSwgbmV4dE93blByb3BzKSB7XG4gICAgdmFyIHByb3BzQ2hhbmdlZCA9ICFhcmVPd25Qcm9wc0VxdWFsKG5leHRPd25Qcm9wcywgb3duUHJvcHMpO1xuICAgIHZhciBzdGF0ZUNoYW5nZWQgPSAhYXJlU3RhdGVzRXF1YWwobmV4dFN0YXRlLCBzdGF0ZSk7XG4gICAgc3RhdGUgPSBuZXh0U3RhdGU7XG4gICAgb3duUHJvcHMgPSBuZXh0T3duUHJvcHM7XG5cbiAgICBpZiAocHJvcHNDaGFuZ2VkICYmIHN0YXRlQ2hhbmdlZCkgcmV0dXJuIGhhbmRsZU5ld1Byb3BzQW5kTmV3U3RhdGUoKTtcbiAgICBpZiAocHJvcHNDaGFuZ2VkKSByZXR1cm4gaGFuZGxlTmV3UHJvcHMoKTtcbiAgICBpZiAoc3RhdGVDaGFuZ2VkKSByZXR1cm4gaGFuZGxlTmV3U3RhdGUoKTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gcHVyZUZpbmFsUHJvcHNTZWxlY3RvcihuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykge1xuICAgIHJldHVybiBoYXNSdW5BdExlYXN0T25jZSA/IGhhbmRsZVN1YnNlcXVlbnRDYWxscyhuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykgOiBoYW5kbGVGaXJzdENhbGwobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpO1xuICB9O1xufVxuXG4vLyBUT0RPOiBBZGQgbW9yZSBjb21tZW50c1xuXG4vLyBJZiBwdXJlIGlzIHRydWUsIHRoZSBzZWxlY3RvciByZXR1cm5lZCBieSBzZWxlY3RvckZhY3Rvcnkgd2lsbCBtZW1vaXplIGl0cyByZXN1bHRzLFxuLy8gYWxsb3dpbmcgY29ubmVjdEFkdmFuY2VkJ3Mgc2hvdWxkQ29tcG9uZW50VXBkYXRlIHRvIHJldHVybiBmYWxzZSBpZiBmaW5hbFxuLy8gcHJvcHMgaGF2ZSBub3QgY2hhbmdlZC4gSWYgZmFsc2UsIHRoZSBzZWxlY3RvciB3aWxsIGFsd2F5cyByZXR1cm4gYSBuZXdcbi8vIG9iamVjdCBhbmQgc2hvdWxkQ29tcG9uZW50VXBkYXRlIHdpbGwgYWx3YXlzIHJldHVybiB0cnVlLlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5KGRpc3BhdGNoLCBfcmVmMikge1xuICB2YXIgaW5pdE1hcFN0YXRlVG9Qcm9wcyA9IF9yZWYyLmluaXRNYXBTdGF0ZVRvUHJvcHMsXG4gICAgICBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzID0gX3JlZjIuaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyxcbiAgICAgIGluaXRNZXJnZVByb3BzID0gX3JlZjIuaW5pdE1lcmdlUHJvcHMsXG4gICAgICBvcHRpb25zID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYyLCBbJ2luaXRNYXBTdGF0ZVRvUHJvcHMnLCAnaW5pdE1hcERpc3BhdGNoVG9Qcm9wcycsICdpbml0TWVyZ2VQcm9wcyddKTtcblxuICB2YXIgbWFwU3RhdGVUb1Byb3BzID0gaW5pdE1hcFN0YXRlVG9Qcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG4gIHZhciBtYXBEaXNwYXRjaFRvUHJvcHMgPSBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvcHRpb25zKTtcbiAgdmFyIG1lcmdlUHJvcHMgPSBpbml0TWVyZ2VQcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2ZXJpZnlTdWJzZWxlY3RvcnMobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIG9wdGlvbnMuZGlzcGxheU5hbWUpO1xuICB9XG5cbiAgdmFyIHNlbGVjdG9yRmFjdG9yeSA9IG9wdGlvbnMucHVyZSA/IHB1cmVGaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5IDogaW1wdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeTtcblxuICByZXR1cm4gc2VsZWN0b3JGYWN0b3J5KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBkaXNwYXRjaCwgb3B0aW9ucyk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC9zZWxlY3RvckZhY3RvcnkuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3Qvc2VsZWN0b3JGYWN0b3J5LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCB3YXJuaW5nIGZyb20gJy4uL3V0aWxzL3dhcm5pbmcnO1xuXG5mdW5jdGlvbiB2ZXJpZnkoc2VsZWN0b3IsIG1ldGhvZE5hbWUsIGRpc3BsYXlOYW1lKSB7XG4gIGlmICghc2VsZWN0b3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgdmFsdWUgZm9yICcgKyBtZXRob2ROYW1lICsgJyBpbiAnICsgZGlzcGxheU5hbWUgKyAnLicpO1xuICB9IGVsc2UgaWYgKG1ldGhvZE5hbWUgPT09ICdtYXBTdGF0ZVRvUHJvcHMnIHx8IG1ldGhvZE5hbWUgPT09ICdtYXBEaXNwYXRjaFRvUHJvcHMnKSB7XG4gICAgaWYgKCFzZWxlY3Rvci5oYXNPd25Qcm9wZXJ0eSgnZGVwZW5kc09uT3duUHJvcHMnKSkge1xuICAgICAgd2FybmluZygnVGhlIHNlbGVjdG9yIGZvciAnICsgbWV0aG9kTmFtZSArICcgb2YgJyArIGRpc3BsYXlOYW1lICsgJyBkaWQgbm90IHNwZWNpZnkgYSB2YWx1ZSBmb3IgZGVwZW5kc09uT3duUHJvcHMuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZlcmlmeVN1YnNlbGVjdG9ycyhtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmVyaWZ5KG1hcFN0YXRlVG9Qcm9wcywgJ21hcFN0YXRlVG9Qcm9wcycsIGRpc3BsYXlOYW1lKTtcbiAgdmVyaWZ5KG1hcERpc3BhdGNoVG9Qcm9wcywgJ21hcERpc3BhdGNoVG9Qcm9wcycsIGRpc3BsYXlOYW1lKTtcbiAgdmVyaWZ5KG1lcmdlUHJvcHMsICdtZXJnZVByb3BzJywgZGlzcGxheU5hbWUpO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL2Nvbm5lY3QvdmVyaWZ5U3Vic2VsZWN0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9jb25uZWN0L3ZlcmlmeVN1YnNlbGVjdG9ycy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgdmVyaWZ5UGxhaW5PYmplY3QgZnJvbSAnLi4vdXRpbHMvdmVyaWZ5UGxhaW5PYmplY3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gd3JhcE1hcFRvUHJvcHNDb25zdGFudChnZXRDb25zdGFudCkge1xuICByZXR1cm4gZnVuY3Rpb24gaW5pdENvbnN0YW50U2VsZWN0b3IoZGlzcGF0Y2gsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29uc3RhbnQgPSBnZXRDb25zdGFudChkaXNwYXRjaCwgb3B0aW9ucyk7XG5cbiAgICBmdW5jdGlvbiBjb25zdGFudFNlbGVjdG9yKCkge1xuICAgICAgcmV0dXJuIGNvbnN0YW50O1xuICAgIH1cbiAgICBjb25zdGFudFNlbGVjdG9yLmRlcGVuZHNPbk93blByb3BzID0gZmFsc2U7XG4gICAgcmV0dXJuIGNvbnN0YW50U2VsZWN0b3I7XG4gIH07XG59XG5cbi8vIGRlcGVuZHNPbk93blByb3BzIGlzIHVzZWQgYnkgY3JlYXRlTWFwVG9Qcm9wc1Byb3h5IHRvIGRldGVybWluZSB3aGV0aGVyIHRvIHBhc3MgcHJvcHMgYXMgYXJnc1xuLy8gdG8gdGhlIG1hcFRvUHJvcHMgZnVuY3Rpb24gYmVpbmcgd3JhcHBlZC4gSXQgaXMgYWxzbyB1c2VkIGJ5IG1ha2VQdXJlUHJvcHNTZWxlY3RvciB0byBkZXRlcm1pbmVcbi8vIHdoZXRoZXIgbWFwVG9Qcm9wcyBuZWVkcyB0byBiZSBpbnZva2VkIHdoZW4gcHJvcHMgaGF2ZSBjaGFuZ2VkLlxuLy8gXG4vLyBBIGxlbmd0aCBvZiBvbmUgc2lnbmFscyB0aGF0IG1hcFRvUHJvcHMgZG9lcyBub3QgZGVwZW5kIG9uIHByb3BzIGZyb20gdGhlIHBhcmVudCBjb21wb25lbnQuXG4vLyBBIGxlbmd0aCBvZiB6ZXJvIGlzIGFzc3VtZWQgdG8gbWVhbiBtYXBUb1Byb3BzIGlzIGdldHRpbmcgYXJncyB2aWEgYXJndW1lbnRzIG9yIC4uLmFyZ3MgYW5kXG4vLyB0aGVyZWZvcmUgbm90IHJlcG9ydGluZyBpdHMgbGVuZ3RoIGFjY3VyYXRlbHkuLlxuZXhwb3J0IGZ1bmN0aW9uIGdldERlcGVuZHNPbk93blByb3BzKG1hcFRvUHJvcHMpIHtcbiAgcmV0dXJuIG1hcFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMgIT09IG51bGwgJiYgbWFwVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcyAhPT0gdW5kZWZpbmVkID8gQm9vbGVhbihtYXBUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSA6IG1hcFRvUHJvcHMubGVuZ3RoICE9PSAxO1xufVxuXG4vLyBVc2VkIGJ5IHdoZW5NYXBTdGF0ZVRvUHJvcHNJc0Z1bmN0aW9uIGFuZCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNGdW5jdGlvbixcbi8vIHRoaXMgZnVuY3Rpb24gd3JhcHMgbWFwVG9Qcm9wcyBpbiBhIHByb3h5IGZ1bmN0aW9uIHdoaWNoIGRvZXMgc2V2ZXJhbCB0aGluZ3M6XG4vLyBcbi8vICAqIERldGVjdHMgd2hldGhlciB0aGUgbWFwVG9Qcm9wcyBmdW5jdGlvbiBiZWluZyBjYWxsZWQgZGVwZW5kcyBvbiBwcm9wcywgd2hpY2hcbi8vICAgIGlzIHVzZWQgYnkgc2VsZWN0b3JGYWN0b3J5IHRvIGRlY2lkZSBpZiBpdCBzaG91bGQgcmVpbnZva2Ugb24gcHJvcHMgY2hhbmdlcy5cbi8vICAgIFxuLy8gICogT24gZmlyc3QgY2FsbCwgaGFuZGxlcyBtYXBUb1Byb3BzIGlmIHJldHVybnMgYW5vdGhlciBmdW5jdGlvbiwgYW5kIHRyZWF0cyB0aGF0XG4vLyAgICBuZXcgZnVuY3Rpb24gYXMgdGhlIHRydWUgbWFwVG9Qcm9wcyBmb3Igc3Vic2VxdWVudCBjYWxscy5cbi8vICAgIFxuLy8gICogT24gZmlyc3QgY2FsbCwgdmVyaWZpZXMgdGhlIGZpcnN0IHJlc3VsdCBpcyBhIHBsYWluIG9iamVjdCwgaW4gb3JkZXIgdG8gd2FyblxuLy8gICAgdGhlIGRldmVsb3BlciB0aGF0IHRoZWlyIG1hcFRvUHJvcHMgZnVuY3Rpb24gaXMgbm90IHJldHVybmluZyBhIHZhbGlkIHJlc3VsdC5cbi8vICAgIFxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBNYXBUb1Byb3BzRnVuYyhtYXBUb1Byb3BzLCBtZXRob2ROYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbml0UHJveHlTZWxlY3RvcihkaXNwYXRjaCwgX3JlZikge1xuICAgIHZhciBkaXNwbGF5TmFtZSA9IF9yZWYuZGlzcGxheU5hbWU7XG5cbiAgICB2YXIgcHJveHkgPSBmdW5jdGlvbiBtYXBUb1Byb3BzUHJveHkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcykge1xuICAgICAgcmV0dXJuIHByb3h5LmRlcGVuZHNPbk93blByb3BzID8gcHJveHkubWFwVG9Qcm9wcyhzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKSA6IHByb3h5Lm1hcFRvUHJvcHMoc3RhdGVPckRpc3BhdGNoKTtcbiAgICB9O1xuXG4gICAgLy8gYWxsb3cgZGV0ZWN0RmFjdG9yeUFuZFZlcmlmeSB0byBnZXQgb3duUHJvcHNcbiAgICBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA9IHRydWU7XG5cbiAgICBwcm94eS5tYXBUb1Byb3BzID0gZnVuY3Rpb24gZGV0ZWN0RmFjdG9yeUFuZFZlcmlmeShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKSB7XG4gICAgICBwcm94eS5tYXBUb1Byb3BzID0gbWFwVG9Qcm9wcztcbiAgICAgIHByb3h5LmRlcGVuZHNPbk93blByb3BzID0gZ2V0RGVwZW5kc09uT3duUHJvcHMobWFwVG9Qcm9wcyk7XG4gICAgICB2YXIgcHJvcHMgPSBwcm94eShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKTtcblxuICAgICAgaWYgKHR5cGVvZiBwcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcm94eS5tYXBUb1Byb3BzID0gcHJvcHM7XG4gICAgICAgIHByb3h5LmRlcGVuZHNPbk93blByb3BzID0gZ2V0RGVwZW5kc09uT3duUHJvcHMocHJvcHMpO1xuICAgICAgICBwcm9wcyA9IHByb3h5KHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgdmVyaWZ5UGxhaW5PYmplY3QocHJvcHMsIGRpc3BsYXlOYW1lLCBtZXRob2ROYW1lKTtcblxuICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH07XG5cbiAgICByZXR1cm4gcHJveHk7XG4gIH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC93cmFwTWFwVG9Qcm9wcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvY29ubmVjdC93cmFwTWFwVG9Qcm9wcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgUHJvdmlkZXIsIHsgY3JlYXRlUHJvdmlkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvUHJvdmlkZXInO1xuaW1wb3J0IGNvbm5lY3RBZHZhbmNlZCBmcm9tICcuL2NvbXBvbmVudHMvY29ubmVjdEFkdmFuY2VkJztcbmltcG9ydCBjb25uZWN0IGZyb20gJy4vY29ubmVjdC9jb25uZWN0JztcblxuZXhwb3J0IHsgUHJvdmlkZXIsIGNyZWF0ZVByb3ZpZGVyLCBjb25uZWN0QWR2YW5jZWQsIGNvbm5lY3QgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuZXhwb3J0IHZhciBzdWJzY3JpcHRpb25TaGFwZSA9IFByb3BUeXBlcy5zaGFwZSh7XG4gIHRyeVN1YnNjcmliZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdHJ5VW5zdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG5vdGlmeU5lc3RlZFN1YnM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlzU3Vic2NyaWJlZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufSk7XG5cbmV4cG9ydCB2YXIgc3RvcmVTaGFwZSA9IFByb3BUeXBlcy5zaGFwZSh7XG4gIHN1YnNjcmliZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldFN0YXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9Qcm9wVHlwZXMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL1Byb3BUeXBlcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vLyBlbmNhcHN1bGF0ZXMgdGhlIHN1YnNjcmlwdGlvbiBsb2dpYyBmb3IgY29ubmVjdGluZyBhIGNvbXBvbmVudCB0byB0aGUgcmVkdXggc3RvcmUsIGFzXG4vLyB3ZWxsIGFzIG5lc3Rpbmcgc3Vic2NyaXB0aW9ucyBvZiBkZXNjZW5kYW50IGNvbXBvbmVudHMsIHNvIHRoYXQgd2UgY2FuIGVuc3VyZSB0aGVcbi8vIGFuY2VzdG9yIGNvbXBvbmVudHMgcmUtcmVuZGVyIGJlZm9yZSBkZXNjZW5kYW50c1xuXG52YXIgQ0xFQVJFRCA9IG51bGw7XG52YXIgbnVsbExpc3RlbmVycyA9IHtcbiAgbm90aWZ5OiBmdW5jdGlvbiBub3RpZnkoKSB7fVxufTtcblxuZnVuY3Rpb24gY3JlYXRlTGlzdGVuZXJDb2xsZWN0aW9uKCkge1xuICAvLyB0aGUgY3VycmVudC9uZXh0IHBhdHRlcm4gaXMgY29waWVkIGZyb20gcmVkdXgncyBjcmVhdGVTdG9yZSBjb2RlLlxuICAvLyBUT0RPOiByZWZhY3RvcitleHBvc2UgdGhhdCBjb2RlIHRvIGJlIHJldXNhYmxlIGhlcmU/XG4gIHZhciBjdXJyZW50ID0gW107XG4gIHZhciBuZXh0ID0gW107XG5cbiAgcmV0dXJuIHtcbiAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICBuZXh0ID0gQ0xFQVJFRDtcbiAgICAgIGN1cnJlbnQgPSBDTEVBUkVEO1xuICAgIH0sXG4gICAgbm90aWZ5OiBmdW5jdGlvbiBub3RpZnkoKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudCA9IG5leHQ7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsaXN0ZW5lcnNbaV0oKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSxcbiAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICBpZiAobmV4dCA9PT0gY3VycmVudCkgbmV4dCA9IGN1cnJlbnQuc2xpY2UoKTtcbiAgICAgIG5leHQucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgaWYgKCFpc1N1YnNjcmliZWQgfHwgY3VycmVudCA9PT0gQ0xFQVJFRCkgcmV0dXJuO1xuICAgICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAobmV4dCA9PT0gY3VycmVudCkgbmV4dCA9IGN1cnJlbnQuc2xpY2UoKTtcbiAgICAgICAgbmV4dC5zcGxpY2UobmV4dC5pbmRleE9mKGxpc3RlbmVyKSwgMSk7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cblxudmFyIFN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKHN0b3JlLCBwYXJlbnRTdWIsIG9uU3RhdGVDaGFuZ2UpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3Vic2NyaXB0aW9uKTtcblxuICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcbiAgICB0aGlzLnBhcmVudFN1YiA9IHBhcmVudFN1YjtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2UgPSBvblN0YXRlQ2hhbmdlO1xuICAgIHRoaXMudW5zdWJzY3JpYmUgPSBudWxsO1xuICAgIHRoaXMubGlzdGVuZXJzID0gbnVsbExpc3RlbmVycztcbiAgfVxuXG4gIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuYWRkTmVzdGVkU3ViID0gZnVuY3Rpb24gYWRkTmVzdGVkU3ViKGxpc3RlbmVyKSB7XG4gICAgdGhpcy50cnlTdWJzY3JpYmUoKTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLm5vdGlmeU5lc3RlZFN1YnMgPSBmdW5jdGlvbiBub3RpZnlOZXN0ZWRTdWJzKCkge1xuICAgIHRoaXMubGlzdGVuZXJzLm5vdGlmeSgpO1xuICB9O1xuXG4gIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuaXNTdWJzY3JpYmVkID0gZnVuY3Rpb24gaXNTdWJzY3JpYmVkKCkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMudW5zdWJzY3JpYmUpO1xuICB9O1xuXG4gIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gdHJ5U3Vic2NyaWJlKCkge1xuICAgIGlmICghdGhpcy51bnN1YnNjcmliZSkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZSA9IHRoaXMucGFyZW50U3ViID8gdGhpcy5wYXJlbnRTdWIuYWRkTmVzdGVkU3ViKHRoaXMub25TdGF0ZUNoYW5nZSkgOiB0aGlzLnN0b3JlLnN1YnNjcmliZSh0aGlzLm9uU3RhdGVDaGFuZ2UpO1xuXG4gICAgICB0aGlzLmxpc3RlbmVycyA9IGNyZWF0ZUxpc3RlbmVyQ29sbGVjdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnRyeVVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdHJ5VW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKHRoaXMudW5zdWJzY3JpYmUpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSBudWxsO1xuICAgICAgdGhpcy5saXN0ZW5lcnMuY2xlYXIoKTtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gbnVsbExpc3RlbmVycztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKTtcblxuZXhwb3J0IHsgU3Vic2NyaXB0aW9uIGFzIGRlZmF1bHQgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9TdWJzY3JpcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL1N1YnNjcmlwdGlvbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gaXMoeCwgeSkge1xuICBpZiAoeCA9PT0geSkge1xuICAgIHJldHVybiB4ICE9PSAwIHx8IHkgIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIpIHtcbiAgaWYgKGlzKG9iakEsIG9iakIpKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAodHlwZW9mIG9iakEgIT09ICdvYmplY3QnIHx8IG9iakEgPT09IG51bGwgfHwgdHlwZW9mIG9iakIgIT09ICdvYmplY3QnIHx8IG9iakIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQS5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duLmNhbGwob2JqQiwga2V5c0FbaV0pIHx8ICFpcyhvYmpBW2tleXNBW2ldXSwgb2JqQltrZXlzQVtpXV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvc2hhbGxvd0VxdWFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1yZWR1eC9lcy91dGlscy9zaGFsbG93RXF1YWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IGlzUGxhaW5PYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QnO1xuaW1wb3J0IHdhcm5pbmcgZnJvbSAnLi93YXJuaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmVyaWZ5UGxhaW5PYmplY3QodmFsdWUsIGRpc3BsYXlOYW1lLCBtZXRob2ROYW1lKSB7XG4gIGlmICghaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICB3YXJuaW5nKG1ldGhvZE5hbWUgKyAnKCkgaW4gJyArIGRpc3BsYXlOYW1lICsgJyBtdXN0IHJldHVybiBhIHBsYWluIG9iamVjdC4gSW5zdGVhZCByZWNlaXZlZCAnICsgdmFsdWUgKyAnLicpO1xuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvdmVyaWZ5UGxhaW5PYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXJlZHV4L2VzL3V0aWxzL3ZlcmlmeVBsYWluT2JqZWN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtcmVkdXgvZXMvdXRpbHMvd2FybmluZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5pbXBvcnQgY29tcG9zZSBmcm9tICcuL2NvbXBvc2UnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdG9yZSBlbmhhbmNlciB0aGF0IGFwcGxpZXMgbWlkZGxld2FyZSB0byB0aGUgZGlzcGF0Y2ggbWV0aG9kXG4gKiBvZiB0aGUgUmVkdXggc3RvcmUuIFRoaXMgaXMgaGFuZHkgZm9yIGEgdmFyaWV0eSBvZiB0YXNrcywgc3VjaCBhcyBleHByZXNzaW5nXG4gKiBhc3luY2hyb25vdXMgYWN0aW9ucyBpbiBhIGNvbmNpc2UgbWFubmVyLCBvciBsb2dnaW5nIGV2ZXJ5IGFjdGlvbiBwYXlsb2FkLlxuICpcbiAqIFNlZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UgYXMgYW4gZXhhbXBsZSBvZiB0aGUgUmVkdXggbWlkZGxld2FyZS5cbiAqXG4gKiBCZWNhdXNlIG1pZGRsZXdhcmUgaXMgcG90ZW50aWFsbHkgYXN5bmNocm9ub3VzLCB0aGlzIHNob3VsZCBiZSB0aGUgZmlyc3RcbiAqIHN0b3JlIGVuaGFuY2VyIGluIHRoZSBjb21wb3NpdGlvbiBjaGFpbi5cbiAqXG4gKiBOb3RlIHRoYXQgZWFjaCBtaWRkbGV3YXJlIHdpbGwgYmUgZ2l2ZW4gdGhlIGBkaXNwYXRjaGAgYW5kIGBnZXRTdGF0ZWAgZnVuY3Rpb25zXG4gKiBhcyBuYW1lZCBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gbWlkZGxld2FyZXMgVGhlIG1pZGRsZXdhcmUgY2hhaW4gdG8gYmUgYXBwbGllZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzdG9yZSBlbmhhbmNlciBhcHBseWluZyB0aGUgbWlkZGxld2FyZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBwbHlNaWRkbGV3YXJlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBtaWRkbGV3YXJlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoY3JlYXRlU3RvcmUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICAgICAgdmFyIHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKTtcbiAgICAgIHZhciBfZGlzcGF0Y2ggPSBzdG9yZS5kaXNwYXRjaDtcbiAgICAgIHZhciBjaGFpbiA9IFtdO1xuXG4gICAgICB2YXIgbWlkZGxld2FyZUFQSSA9IHtcbiAgICAgICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLFxuICAgICAgICBkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIF9kaXNwYXRjaChhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hhaW4gPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmUobWlkZGxld2FyZUFQSSk7XG4gICAgICB9KTtcbiAgICAgIF9kaXNwYXRjaCA9IGNvbXBvc2UuYXBwbHkodW5kZWZpbmVkLCBjaGFpbikoc3RvcmUuZGlzcGF0Y2gpO1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0b3JlLCB7XG4gICAgICAgIGRpc3BhdGNoOiBfZGlzcGF0Y2hcbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYXBwbHlNaWRkbGV3YXJlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9hcHBseU1pZGRsZXdhcmUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goYWN0aW9uQ3JlYXRvci5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvbiBjcmVhdG9ycywgaW50byBhbiBvYmplY3Qgd2l0aCB0aGVcbiAqIHNhbWUga2V5cywgYnV0IHdpdGggZXZlcnkgZnVuY3Rpb24gd3JhcHBlZCBpbnRvIGEgYGRpc3BhdGNoYCBjYWxsIHNvIHRoZXlcbiAqIG1heSBiZSBpbnZva2VkIGRpcmVjdGx5LiBUaGlzIGlzIGp1c3QgYSBjb252ZW5pZW5jZSBtZXRob2QsIGFzIHlvdSBjYW4gY2FsbFxuICogYHN0b3JlLmRpc3BhdGNoKE15QWN0aW9uQ3JlYXRvcnMuZG9Tb21ldGhpbmcoKSlgIHlvdXJzZWxmIGp1c3QgZmluZS5cbiAqXG4gKiBGb3IgY29udmVuaWVuY2UsIHlvdSBjYW4gYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCxcbiAqIGFuZCBnZXQgYSBmdW5jdGlvbiBpbiByZXR1cm4uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9IGFjdGlvbkNyZWF0b3JzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvblxuICogY3JlYXRvciBmdW5jdGlvbnMuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzYFxuICogc3ludGF4LiBZb3UgbWF5IGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCBUaGUgYGRpc3BhdGNoYCBmdW5jdGlvbiBhdmFpbGFibGUgb24geW91ciBSZWR1eFxuICogc3RvcmUuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufE9iamVjdH0gVGhlIG9iamVjdCBtaW1pY2tpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCwgYnV0IHdpdGhcbiAqIGV2ZXJ5IGFjdGlvbiBjcmVhdG9yIHdyYXBwZWQgaW50byB0aGUgYGRpc3BhdGNoYCBjYWxsLiBJZiB5b3UgcGFzc2VkIGFcbiAqIGZ1bmN0aW9uIGFzIGBhY3Rpb25DcmVhdG9yc2AsIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBhbHNvIGJlIGEgc2luZ2xlXG4gKiBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCkge1xuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzICE9PSAnb2JqZWN0JyB8fCBhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYmluZEFjdGlvbkNyZWF0b3JzIGV4cGVjdGVkIGFuIG9iamVjdCBvciBhIGZ1bmN0aW9uLCBpbnN0ZWFkIHJlY2VpdmVkICcgKyAoYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgYWN0aW9uQ3JlYXRvcnMpICsgJy4gJyArICdEaWQgeW91IHdyaXRlIFwiaW1wb3J0IEFjdGlvbkNyZWF0b3JzIGZyb21cIiBpbnN0ZWFkIG9mIFwiaW1wb3J0ICogYXMgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiPycpO1xuICB9XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhY3Rpb25DcmVhdG9ycyk7XG4gIHZhciBib3VuZEFjdGlvbkNyZWF0b3JzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIHZhciBhY3Rpb25DcmVhdG9yID0gYWN0aW9uQ3JlYXRvcnNba2V5XTtcbiAgICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGJvdW5kQWN0aW9uQ3JlYXRvcnNba2V5XSA9IGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvdW5kQWN0aW9uQ3JlYXRvcnM7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvYmluZEFjdGlvbkNyZWF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9iaW5kQWN0aW9uQ3JlYXRvcnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IHsgQWN0aW9uVHlwZXMgfSBmcm9tICcuL2NyZWF0ZVN0b3JlJztcbmltcG9ydCBpc1BsYWluT2JqZWN0IGZyb20gJ2xvZGFzaC1lcy9pc1BsYWluT2JqZWN0JztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vdXRpbHMvd2FybmluZyc7XG5cbmZ1bmN0aW9uIGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKGtleSwgYWN0aW9uKSB7XG4gIHZhciBhY3Rpb25UeXBlID0gYWN0aW9uICYmIGFjdGlvbi50eXBlO1xuICB2YXIgYWN0aW9uTmFtZSA9IGFjdGlvblR5cGUgJiYgJ1wiJyArIGFjdGlvblR5cGUudG9TdHJpbmcoKSArICdcIicgfHwgJ2FuIGFjdGlvbic7XG5cbiAgcmV0dXJuICdHaXZlbiBhY3Rpb24gJyArIGFjdGlvbk5hbWUgKyAnLCByZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQuICcgKyAnVG8gaWdub3JlIGFuIGFjdGlvbiwgeW91IG11c3QgZXhwbGljaXRseSByZXR1cm4gdGhlIHByZXZpb3VzIHN0YXRlLiAnICsgJ0lmIHlvdSB3YW50IHRoaXMgcmVkdWNlciB0byBob2xkIG5vIHZhbHVlLCB5b3UgY2FuIHJldHVybiBudWxsIGluc3RlYWQgb2YgdW5kZWZpbmVkLic7XG59XG5cbmZ1bmN0aW9uIGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2UoaW5wdXRTdGF0ZSwgcmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGFyZ3VtZW50TmFtZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gQWN0aW9uVHlwZXMuSU5JVCA/ICdwcmVsb2FkZWRTdGF0ZSBhcmd1bWVudCBwYXNzZWQgdG8gY3JlYXRlU3RvcmUnIDogJ3ByZXZpb3VzIHN0YXRlIHJlY2VpdmVkIGJ5IHRoZSByZWR1Y2VyJztcblxuICBpZiAocmVkdWNlcktleXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuICdTdG9yZSBkb2VzIG5vdCBoYXZlIGEgdmFsaWQgcmVkdWNlci4gTWFrZSBzdXJlIHRoZSBhcmd1bWVudCBwYXNzZWQgJyArICd0byBjb21iaW5lUmVkdWNlcnMgaXMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgcmVkdWNlcnMuJztcbiAgfVxuXG4gIGlmICghaXNQbGFpbk9iamVjdChpbnB1dFN0YXRlKSkge1xuICAgIHJldHVybiAnVGhlICcgKyBhcmd1bWVudE5hbWUgKyAnIGhhcyB1bmV4cGVjdGVkIHR5cGUgb2YgXCInICsge30udG9TdHJpbmcuY2FsbChpbnB1dFN0YXRlKS5tYXRjaCgvXFxzKFthLXp8QS1aXSspLylbMV0gKyAnXCIuIEV4cGVjdGVkIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgJyArICgna2V5czogXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCInKTtcbiAgfVxuXG4gIHZhciB1bmV4cGVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKGlucHV0U3RhdGUpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuICFyZWR1Y2Vycy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICF1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XTtcbiAgfSk7XG5cbiAgdW5leHBlY3RlZEtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdW5leHBlY3RlZEtleUNhY2hlW2tleV0gPSB0cnVlO1xuICB9KTtcblxuICBpZiAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiAnVW5leHBlY3RlZCAnICsgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDEgPyAna2V5cycgOiAna2V5JykgKyAnICcgKyAoJ1wiJyArIHVuZXhwZWN0ZWRLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiIGZvdW5kIGluICcgKyBhcmd1bWVudE5hbWUgKyAnLiAnKSArICdFeHBlY3RlZCB0byBmaW5kIG9uZSBvZiB0aGUga25vd24gcmVkdWNlciBrZXlzIGluc3RlYWQ6ICcgKyAoJ1wiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiLiBVbmV4cGVjdGVkIGtleXMgd2lsbCBiZSBpZ25vcmVkLicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFJlZHVjZXJTaGFwZShyZWR1Y2Vycykge1xuICBPYmplY3Qua2V5cyhyZWR1Y2VycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHJlZHVjZXIgPSByZWR1Y2Vyc1trZXldO1xuICAgIHZhciBpbml0aWFsU3RhdGUgPSByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCBkdXJpbmcgaW5pdGlhbGl6YXRpb24uICcgKyAnSWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGUgcmVkdWNlciBpcyB1bmRlZmluZWQsIHlvdSBtdXN0ICcgKyAnZXhwbGljaXRseSByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSAnICsgJ25vdCBiZSB1bmRlZmluZWQuIElmIHlvdSBkb25cXCd0IHdhbnQgdG8gc2V0IGEgdmFsdWUgZm9yIHRoaXMgcmVkdWNlciwgJyArICd5b3UgY2FuIHVzZSBudWxsIGluc3RlYWQgb2YgdW5kZWZpbmVkLicpO1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gJ0BAcmVkdXgvUFJPQkVfVU5LTk9XTl9BQ1RJT05fJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KS5zcGxpdCgnJykuam9pbignLicpO1xuICAgIGlmICh0eXBlb2YgcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogdHlwZSB9KSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIHdoZW4gcHJvYmVkIHdpdGggYSByYW5kb20gdHlwZS4gJyArICgnRG9uXFwndCB0cnkgdG8gaGFuZGxlICcgKyBBY3Rpb25UeXBlcy5JTklUICsgJyBvciBvdGhlciBhY3Rpb25zIGluIFwicmVkdXgvKlwiICcpICsgJ25hbWVzcGFjZS4gVGhleSBhcmUgY29uc2lkZXJlZCBwcml2YXRlLiBJbnN0ZWFkLCB5b3UgbXVzdCByZXR1cm4gdGhlICcgKyAnY3VycmVudCBzdGF0ZSBmb3IgYW55IHVua25vd24gYWN0aW9ucywgdW5sZXNzIGl0IGlzIHVuZGVmaW5lZCwgJyArICdpbiB3aGljaCBjYXNlIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZSwgcmVnYXJkbGVzcyBvZiB0aGUgJyArICdhY3Rpb24gdHlwZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBiZSB1bmRlZmluZWQsIGJ1dCBjYW4gYmUgbnVsbC4nKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGRpZmZlcmVudCByZWR1Y2VyIGZ1bmN0aW9ucywgaW50byBhIHNpbmdsZVxuICogcmVkdWNlciBmdW5jdGlvbi4gSXQgd2lsbCBjYWxsIGV2ZXJ5IGNoaWxkIHJlZHVjZXIsIGFuZCBnYXRoZXIgdGhlaXIgcmVzdWx0c1xuICogaW50byBhIHNpbmdsZSBzdGF0ZSBvYmplY3QsIHdob3NlIGtleXMgY29ycmVzcG9uZCB0byB0aGUga2V5cyBvZiB0aGUgcGFzc2VkXG4gKiByZWR1Y2VyIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVkdWNlcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBjb3JyZXNwb25kIHRvIGRpZmZlcmVudFxuICogcmVkdWNlciBmdW5jdGlvbnMgdGhhdCBuZWVkIHRvIGJlIGNvbWJpbmVkIGludG8gb25lLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpblxuICogaXQgaXMgdG8gdXNlIEVTNiBgaW1wb3J0ICogYXMgcmVkdWNlcnNgIHN5bnRheC4gVGhlIHJlZHVjZXJzIG1heSBuZXZlciByZXR1cm5cbiAqIHVuZGVmaW5lZCBmb3IgYW55IGFjdGlvbi4gSW5zdGVhZCwgdGhleSBzaG91bGQgcmV0dXJuIHRoZWlyIGluaXRpYWwgc3RhdGVcbiAqIGlmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlbSB3YXMgdW5kZWZpbmVkLCBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgZm9yIGFueVxuICogdW5yZWNvZ25pemVkIGFjdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgcmVkdWNlciBmdW5jdGlvbiB0aGF0IGludm9rZXMgZXZlcnkgcmVkdWNlciBpbnNpZGUgdGhlXG4gKiBwYXNzZWQgb2JqZWN0LCBhbmQgYnVpbGRzIGEgc3RhdGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VycyhyZWR1Y2Vycykge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBmaW5hbFJlZHVjZXJzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gcmVkdWNlcktleXNbaV07XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3YXJuaW5nKCdObyByZWR1Y2VyIHByb3ZpZGVkIGZvciBrZXkgXCInICsga2V5ICsgJ1wiJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiByZWR1Y2Vyc1trZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmaW5hbFJlZHVjZXJzW2tleV0gPSByZWR1Y2Vyc1trZXldO1xuICAgIH1cbiAgfVxuICB2YXIgZmluYWxSZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKGZpbmFsUmVkdWNlcnMpO1xuXG4gIHZhciB1bmV4cGVjdGVkS2V5Q2FjaGUgPSB2b2lkIDA7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdW5leHBlY3RlZEtleUNhY2hlID0ge307XG4gIH1cblxuICB2YXIgc2hhcGVBc3NlcnRpb25FcnJvciA9IHZvaWQgMDtcbiAgdHJ5IHtcbiAgICBhc3NlcnRSZWR1Y2VyU2hhcGUoZmluYWxSZWR1Y2Vycyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzaGFwZUFzc2VydGlvbkVycm9yID0gZTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBjb21iaW5hdGlvbigpIHtcbiAgICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIHZhciBhY3Rpb24gPSBhcmd1bWVudHNbMV07XG5cbiAgICBpZiAoc2hhcGVBc3NlcnRpb25FcnJvcikge1xuICAgICAgdGhyb3cgc2hhcGVBc3NlcnRpb25FcnJvcjtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHdhcm5pbmdNZXNzYWdlID0gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShzdGF0ZSwgZmluYWxSZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpO1xuICAgICAgaWYgKHdhcm5pbmdNZXNzYWdlKSB7XG4gICAgICAgIHdhcm5pbmcod2FybmluZ01lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBoYXNDaGFuZ2VkID0gZmFsc2U7XG4gICAgdmFyIG5leHRTdGF0ZSA9IHt9O1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBmaW5hbFJlZHVjZXJLZXlzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9rZXkgPSBmaW5hbFJlZHVjZXJLZXlzW19pXTtcbiAgICAgIHZhciByZWR1Y2VyID0gZmluYWxSZWR1Y2Vyc1tfa2V5XTtcbiAgICAgIHZhciBwcmV2aW91c1N0YXRlRm9yS2V5ID0gc3RhdGVbX2tleV07XG4gICAgICB2YXIgbmV4dFN0YXRlRm9yS2V5ID0gcmVkdWNlcihwcmV2aW91c1N0YXRlRm9yS2V5LCBhY3Rpb24pO1xuICAgICAgaWYgKHR5cGVvZiBuZXh0U3RhdGVGb3JLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShfa2V5LCBhY3Rpb24pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIG5leHRTdGF0ZVtfa2V5XSA9IG5leHRTdGF0ZUZvcktleTtcbiAgICAgIGhhc0NoYW5nZWQgPSBoYXNDaGFuZ2VkIHx8IG5leHRTdGF0ZUZvcktleSAhPT0gcHJldmlvdXNTdGF0ZUZvcktleTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NoYW5nZWQgPyBuZXh0U3RhdGUgOiBzdGF0ZTtcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jb21iaW5lUmVkdWNlcnMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2NvbWJpbmVSZWR1Y2Vycy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmNzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYShiLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY29tcG9zZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNQbGFpbk9iamVjdCc7XG5pbXBvcnQgJCRvYnNlcnZhYmxlIGZyb20gJ3N5bWJvbC1vYnNlcnZhYmxlJztcblxuLyoqXG4gKiBUaGVzZSBhcmUgcHJpdmF0ZSBhY3Rpb24gdHlwZXMgcmVzZXJ2ZWQgYnkgUmVkdXguXG4gKiBGb3IgYW55IHVua25vd24gYWN0aW9ucywgeW91IG11c3QgcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlLlxuICogSWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuXG4gKiBEbyBub3QgcmVmZXJlbmNlIHRoZXNlIGFjdGlvbiB0eXBlcyBkaXJlY3RseSBpbiB5b3VyIGNvZGUuXG4gKi9cbmV4cG9ydCB2YXIgQWN0aW9uVHlwZXMgPSB7XG4gIElOSVQ6ICdAQHJlZHV4L0lOSVQnXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuICAgKiBUaGUgb25seSB3YXkgdG8gY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZSBpcyB0byBjYWxsIGBkaXNwYXRjaCgpYCBvbiBpdC5cbiAgICpcbiAgICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuICAgKiBwYXJ0cyBvZiB0aGUgc3RhdGUgdHJlZSByZXNwb25kIHRvIGFjdGlvbnMsIHlvdSBtYXkgY29tYmluZSBzZXZlcmFsIHJlZHVjZXJzXG4gICAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcmVkdWNlciBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbmV4dCBzdGF0ZSB0cmVlLCBnaXZlblxuICAgKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAgICpcbiAgICogQHBhcmFtIHthbnl9IFtwcmVsb2FkZWRTdGF0ZV0gVGhlIGluaXRpYWwgc3RhdGUuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gICAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG4gICAqIElmIHlvdSB1c2UgYGNvbWJpbmVSZWR1Y2Vyc2AgdG8gcHJvZHVjZSB0aGUgcm9vdCByZWR1Y2VyIGZ1bmN0aW9uLCB0aGlzIG11c3QgYmVcbiAgICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2VuaGFuY2VyXSBUaGUgc3RvcmUgZW5oYW5jZXIuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gICAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAgICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICAgKiBpcyBgYXBwbHlNaWRkbGV3YXJlKClgLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICAgKiBhbmQgc3Vic2NyaWJlIHRvIGNoYW5nZXMuXG4gICAqL1xufTtleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbiAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cbiAgICogY2FsbCBgZ2V0U3RhdGUoKWAgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGluc2lkZSB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAqIGNhdmVhdHM6XG4gICAqXG4gICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cbiAgICogSWYgeW91IHN1YnNjcmliZSBvciB1bnN1YnNjcmliZSB3aGlsZSB0aGUgbGlzdGVuZXJzIGFyZSBiZWluZyBpbnZva2VkLCB0aGlzXG4gICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcbiAgICogcmVjZW50IHNuYXBzaG90IG9mIHRoZSBzdWJzY3JpcHRpb24gbGlzdC5cbiAgICpcbiAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG4gICAqIG1pZ2h0IGhhdmUgYmVlbiB1cGRhdGVkIG11bHRpcGxlIHRpbWVzIGR1cmluZyBhIG5lc3RlZCBgZGlzcGF0Y2goKWAgYmVmb3JlXG4gICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG4gICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3RcbiAgICogc3RhdGUgYnkgdGhlIHRpbWUgaXQgZXhpdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGlzIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cbiAgICpcbiAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAqIGJlIGNvbnNpZGVyZWQgdGhlICoqbmV4dCoqIHN0YXRlIG9mIHRoZSB0cmVlLCBhbmQgdGhlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICogd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb25seSBzdXBwb3J0cyBwbGFpbiBvYmplY3QgYWN0aW9ucy4gSWYgeW91IHdhbnQgdG9cbiAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cbiAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG4gICAqIGV4YW1wbGUsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGByZWR1eC10aHVua2AgcGFja2FnZS4gRXZlbiB0aGVcbiAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS4gSXQgaXNcbiAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcbiAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcbiAgICogYSBgdHlwZWAgcHJvcGVydHkgd2hpY2ggbWF5IG5vdCBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgYSBnb29kIGlkZWEgdG8gdXNlXG4gICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gRm9yIGNvbnZlbmllbmNlLCB0aGUgc2FtZSBhY3Rpb24gb2JqZWN0IHlvdSBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG4gICAqIHJldHVybiBzb21ldGhpbmcgZWxzZSAoZm9yIGV4YW1wbGUsIGEgUHJvbWlzZSB5b3UgY2FuIGF3YWl0KS5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghaXNQbGFpbk9iamVjdChhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG4gICAgICB9XG4gICAgfSwgX3JlZlskJG9ic2VydmFibGVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSwgX3JlZjtcbiAgfVxuXG4gIC8vIFdoZW4gYSBzdG9yZSBpcyBjcmVhdGVkLCBhbiBcIklOSVRcIiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCBzbyB0aGF0IGV2ZXJ5XG4gIC8vIHJlZHVjZXIgcmV0dXJucyB0aGVpciBpbml0aWFsIHN0YXRlLiBUaGlzIGVmZmVjdGl2ZWx5IHBvcHVsYXRlc1xuICAvLyB0aGUgaW5pdGlhbCBzdGF0ZSB0cmVlLlxuICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgcmV0dXJuIF9yZWYyID0ge1xuICAgIGRpc3BhdGNoOiBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gICAgcmVwbGFjZVJlZHVjZXI6IHJlcGxhY2VSZWR1Y2VyXG4gIH0sIF9yZWYyWyQkb2JzZXJ2YWJsZV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9jcmVhdGVTdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVkdXgvZXMvY3JlYXRlU3RvcmUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IGNyZWF0ZVN0b3JlIGZyb20gJy4vY3JlYXRlU3RvcmUnO1xuaW1wb3J0IGNvbWJpbmVSZWR1Y2VycyBmcm9tICcuL2NvbWJpbmVSZWR1Y2Vycyc7XG5pbXBvcnQgYmluZEFjdGlvbkNyZWF0b3JzIGZyb20gJy4vYmluZEFjdGlvbkNyZWF0b3JzJztcbmltcG9ydCBhcHBseU1pZGRsZXdhcmUgZnJvbSAnLi9hcHBseU1pZGRsZXdhcmUnO1xuaW1wb3J0IGNvbXBvc2UgZnJvbSAnLi9jb21wb3NlJztcbmltcG9ydCB3YXJuaW5nIGZyb20gJy4vdXRpbHMvd2FybmluZyc7XG5cbi8qXG4qIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cbiogSWYgdGhlIGZ1bmN0aW9uIGhhcyBiZWVuIG1pbmlmaWVkIGFuZCBOT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLCB3YXJuIHRoZSB1c2VyLlxuKi9cbmZ1bmN0aW9uIGlzQ3J1c2hlZCgpIHt9XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG4gIHdhcm5pbmcoJ1lvdSBhcmUgY3VycmVudGx5IHVzaW5nIG1pbmlmaWVkIGNvZGUgb3V0c2lkZSBvZiBOT0RFX0VOViA9PT0gXFwncHJvZHVjdGlvblxcJy4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIERlZmluZVBsdWdpbiBmb3Igd2VicGFjayAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDAzMDAzMSkgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnQgeyBjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBiaW5kQWN0aW9uQ3JlYXRvcnMsIGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWR1eC9lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlZHV4L2VzL3V0aWxzL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuaW1wb3J0IHBvbnlmaWxsIGZyb20gJy4vcG9ueWZpbGwuanMnO1xuXG52YXIgcm9vdDtcblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gcG9ueWZpbGwocm9vdCk7XG5leHBvcnQgZGVmYXVsdCByZXN1bHQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKFN5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRTeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL3BvbnlmaWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9wb255ZmlsbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQubGVuZ3RoIDwgMTAgfHwgKC9eW3NcXFddKiQvKS50ZXN0KGZvcm1hdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSB3YXJuaW5nIGZvcm1hdCBzaG91bGQgYmUgYWJsZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzICcgK1xuICAgICAgICAnd2FybmluZy4gUGxlYXNlLCB1c2UgYSBtb3JlIGRlc2NyaXB0aXZlIGZvcm1hdCB0aGFuOiAnICsgZm9ybWF0XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2goeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dhcm5pbmcvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2FybmluZy9icm93c2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcclxuXHRpZighb3JpZ2luYWxNb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJleHBvcnRzXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2hhcm1vbnktbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vLi4vc2VsbC9zdG9yZSc7XHJcbmltcG9ydCBNb2RhbCBmcm9tICdyZWFjdC1tb2RhbCc7XHJcblxyXG5jb25zdCBjdXN0b21TdHlsZXMgPSB7XHJcbiAgICBjb250ZW50IDoge1xyXG4gICAgICAgIHRvcCAgICAgICAgICAgICAgICAgICA6ICc1MCUnLFxyXG4gICAgICAgIGxlZnQgICAgICAgICAgICAgICAgICA6ICc1MCUnLFxyXG4gICAgICAgIHJpZ2h0ICAgICAgICAgICAgICAgICA6ICdhdXRvJyxcclxuICAgICAgICBib3R0b20gICAgICAgICAgICAgICAgOiAnYXV0bycsXHJcbiAgICAgICAgbWFyZ2luUmlnaHQgICAgICAgICAgIDogJy01MCUnLFxyXG4gICAgICAgIHRyYW5zZm9ybSAgICAgICAgICAgICA6ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknXHJcbiAgICB9XHJcbn07XHJcblxyXG5Nb2RhbC5zZXRBcHBFbGVtZW50KCcjc2VsbC1mb3JtLWNvbnRhaW5lcicpO1xyXG5cclxuY29uc3QgU2VsZWN0b3JJdGVtID0gKHtsYWJlbCwgc2VsZWN0ZWQsIG9uQ2xpY2t9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17XCJzZWxlY3Rvci1pdGVtIFwiICsgKHNlbGVjdGVkICYmIFwic2VsZWN0b3ItaXRlbS1zZWxlY3RlZFwiKX0gb25DbGljaz17b25DbGlja30+XHJcbiAgICAgICAge2xhYmVsfVxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5cclxuY2xhc3MgU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgb3BlbiA6IHByb3BzLnNlbGVjdG9yLFxyXG4gICAgICAgICAgICBpdGVtcyA6IHByb3BzLml0ZW1zIHx8IFtdLFxyXG4gICAgICAgICAgICBwb3B1bGFySXRlbXMgOiBwcm9wcy5wb3B1bGFySXRlbXMgfHwgW10sXHJcbiAgICAgICAgICAgIGZpbHRlciA6IHtcclxuICAgICAgICAgICAgICAgIFwiYWdcIiA6IHsgdHlwZTogXCJmaXJzdExldHRlclwiLCB2YWx1ZXM6IFtcImFcIiwnYicsJ2MnLCdkJywnZScsJ2YnLCdnJ10gfSxcclxuICAgICAgICAgICAgICAgIFwiaG5cIiA6IHsgdHlwZTogXCJmaXJzdExldHRlclwiLCB2YWx1ZXM6IFtcImhcIiwnaScsJ2onLCdrJywnbCcsJ2snLCduJ10gfSxcclxuICAgICAgICAgICAgICAgIFwib3RcIiA6IHsgdHlwZTogXCJmaXJzdExldHRlclwiLCB2YWx1ZXM6IFtcIm9cIiwncCcsJ3EnLCdyJywncycsJ3QnXSB9LFxyXG4gICAgICAgICAgICAgICAgXCJ1elwiIDogeyB0eXBlOiBcImZpcnN0TGV0dGVyXCIsIHZhbHVlczogW1widVwiLCd2JywndycsJ3gnLCd5JywneiddIH0sXHJcbiAgICAgICAgICAgICAgICBcInBvcHVsYXJcIiA6IHsgdHlwZTogXCJvcmlnaW5cIiwgdmFsdWU6IFwicG9wdWxhckl0ZW1zXCJ9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFjdGl2ZUZpbHRlciA6IHByb3BzLmFjdGl2ZUZpbHRlciB8fCBcInBvcHVsYXJcIixcclxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtIDoge31cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKGEpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+e1xyXG4gICAgfTtcclxuXHJcbiAgICBvcGVuTW9kYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vcGVuU2VsZWN0b3IoKTtcclxuICAgIH07XHJcblxyXG4gICAgYWZ0ZXJPcGVuTW9kYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgLy8gcmVmZXJlbmNlcyBhcmUgbm93IHN5bmMnZCBhbmQgY2FuIGJlIGFjY2Vzc2VkLlxyXG4gICAgICAgIC8vdGhpcy5zdWJ0aXRsZS5zdHlsZS5jb2xvciA9ICcjZjAwJztcclxuICAgIH07XHJcblxyXG4gICAgY2xvc2VNb2RhbCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXBkYXRlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZVNlbGVjdG9yKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEFjdGl2ZUZpbHRlciA9ICgpID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZmlsdGVyW3RoaXMuc3RhdGUuYWN0aXZlRmlsdGVyXTtcclxuICAgIH07XHJcblxyXG4gICAgc2V0QWN0aXZlRmlsdGVyID0gKCBmaWx0ZXJOYW1lICkgPT57XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBhY3RpdmVGaWx0ZXI6IGZpbHRlck5hbWV9KVxyXG4gICAgfTtcclxuXHJcbiAgICBhcHBseVNlbGVjdGlvbiA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLmFwcGx5U2VsZWN0aW9uKHRoaXMucHJvcHMudHlwZSwgdGhpcy5zdGF0ZS5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZWxlY3RJdGVtID0gKCBpdGVtICkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEl0ZW0gOiBpdGVtLCB1cGRhdGVkOiB0cnVlIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBpc0l0ZW1TZWxlY3RlZCA9ICggaXRlbSApID0+IHtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlLnVwZGF0ZWQgKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuc2VsZWN0ZWRJdGVtLmV4dGVybmFsX2lkID09PSBpdGVtLmV4dGVybmFsX2lkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnNlbGVjdGVkWzBdLmV4dGVybmFsX2lkID09PSBpdGVtLmV4dGVybmFsX2lkO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZmlsdGVyID0gKGl0ZW0pID0+e1xyXG4gICAgICAgIGxldCBmaWx0ZXIgPSB0aGlzLmdldEFjdGl2ZUZpbHRlcigpO1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXIudmFsdWVzLmluZGV4T2YoaXRlbS5uYW1lWzBdLnRvTG93ZXJDYXNlKCkpICE9PSAtMVxyXG4gICAgfTtcclxuXHJcbiAgICBnZXRJdGVtcyA9ICgpID0+e1xyXG4gICAgICAgIGxldCBmaWx0ZXIgPSB0aGlzLmdldEFjdGl2ZUZpbHRlcigpO1xyXG4gICAgICAgIGlmICggZmlsdGVyLnR5cGUgPT09IFwib3JpZ2luXCIgKSByZXR1cm4gdGhpcy5wcm9wc1tmaWx0ZXIudmFsdWVdO1xyXG4gICAgICAgIGlmICggZmlsdGVyLnR5cGUgPT09IFwiZmlyc3RMZXR0ZXJcIikgcmV0dXJuIHRoaXMucHJvcHMuaXRlbXMuZmlsdGVyKHRoaXMuZmlsdGVyKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPE1vZGFsXHJcbiAgICAgICAgICAgICAgICBpc09wZW49e3RoaXMucHJvcHMub3Blbn1cclxuICAgICAgICAgICAgICAgIG9uQWZ0ZXJPcGVuPXt0aGlzLmFmdGVyT3Blbk1vZGFsfVxyXG4gICAgICAgICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e3RoaXMuY2xvc2VNb2RhbH1cclxuICAgICAgICAgICAgICAgIGJvZHlPcGVuQ2xhc3NOYW1lPXtcInNlbGVjdG9yXCJ9XHJcbiAgICAgICAgICAgICAgICBzdHlsZT17Y3VzdG9tU3R5bGVzfVxyXG4gICAgICAgICAgICAgICAgY29udGVudExhYmVsPVwiRXhhbXBsZSBNb2RhbFwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHsvKjxoMiByZWY9e3N1YnRpdGxlID0+IHRoaXMuc3VidGl0bGUgPSBzdWJ0aXRsZX0+SGVsbG88L2gyPiovfVxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwicG9wdWxhclwiKX19PlBvcHVsYXI8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwiYWdcIil9fT5BLUc8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwiaG5cIil9fT5ILU48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwib3RcIil9fT5PLVQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwidXpcIil9fT5VLVo8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3Rvci1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldEl0ZW1zKCkubWFwKGZ1bmN0aW9uKGl0ZW0sIGkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFNlbGVjdG9ySXRlbSBrZXk9e2l9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXtpdGVtLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyAoKSA9PiBfdGhpcy5zZWxlY3RJdGVtKGl0ZW0pfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17IF90aGlzLmlzSXRlbVNlbGVjdGVkKGl0ZW0pIH0vPjtcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuY2xvc2VNb2RhbH0+Q2FuY2VsPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAgb25DbGljaz17dGhpcy5hcHBseVNlbGVjdGlvbn0+QXBwbHk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PkNhbid0IGZpbmQgeW91ciBzcG9ydCBpbiB0aGUgbGlzdD8gPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5BZGQgbmV3IFNwb3J0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9Nb2RhbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoIHN0YXRlICkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvcGVuIDogc3RhdGUuc2VsZWN0b3JJbmZvLm9wZW4sXHJcbiAgICAgICAgaXRlbXMgOiBzdGF0ZS5zZWxlY3RvckluZm8uc2VsZWN0b3JJdGVtcyxcclxuICAgICAgICBwb3B1bGFySXRlbXM6IHN0YXRlLnNlbGVjdG9ySW5mby5wb3B1bGFySXRlbXMsXHJcbiAgICAgICAgdHlwZSA6IHN0YXRlLnNlbGVjdG9ySW5mby5zZWxlY3RvclR5cGUsXHJcbiAgICAgICAgc2VsZWN0ZWQgOiBzdGF0ZVtzdGF0ZS5zZWxlY3RvckluZm8uc2VsZWN0b3JUeXBlXVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvcGVuU2VsZWN0b3IgOiAoKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnT1BFTl9TRUxFQ1RPUidcclxuICAgICAgICB9KSxcclxuICAgICAgICBjbG9zZVNlbGVjdG9yIDogKCkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogJ0NMT1NFX1NFTEVDVE9SJ1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFwcGx5U2VsZWN0aW9uIDogKHNlbGVjdG9yVHlwZSwgc2VsZWN0ZWRJdGVtKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnQVBQTFlfU0VMRUNUSU9OJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlIDogc2VsZWN0b3JUeXBlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW0gOiBzZWxlY3RlZEl0ZW1cclxuICAgICAgICB9KSxcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShTZWxlY3RvcilcclxuXHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvU2VsZWN0b3IuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUGFja2FnZVNlbGVjdG9yIGZyb20gXCIuLi9jb250YWluZXJzL1BhY2thZ2VTZWxlY3RvclwiO1xyXG5pbXBvcnQgU2VsbEJ1dHRvbnMgZnJvbSBcIi4uL2NvbnRhaW5lcnMvYnV0dG9uc1wiO1xyXG5pbXBvcnQgU2VsbEZvcm1TdGVwcyBmcm9tIFwiLi4vY29udGFpbmVycy9TZWxsRm9ybVN0ZXBzXCI7XHJcbmltcG9ydCBTZWxsRm9ybVN0ZXAxIGZyb20gXCIuLi9jb250YWluZXJzL1NlbGxGb3JtU3RlcDFcIjtcclxuaW1wb3J0IFNlbGVjdG9yIGZyb20gXCIuLi8uLi9tYWluL2NvbXBvbmVudHMvU2VsZWN0b3JcIjtcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vc3RvcmUnO1xyXG5cclxuXHJcbmNsYXNzIFNlbGxGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgOiBKU09OLnBhcnNlKHByb3BzLmNvbnRlbnQpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgc3RvcmUuc3Vic2NyaWJlKChhKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0b3JlLmdldFN0YXRlKCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ID0gKCkgPT57XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jb250ZW50TGlzdGluZ0luaXQoIHRoaXMuc3RhdGUuY29udGVudCApO1xyXG4gICAgfSA7XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYWluLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPFNlbGVjdG9yIC8+XHJcbiAgICAgICAgICAgICAgICA8U2VsbEZvcm1TdGVwcyAvPlxyXG4gICAgICAgICAgICAgICAgPFNlbGxGb3JtU3RlcDEvPlxyXG4gICAgICAgICAgICAgICAgPFBhY2thZ2VTZWxlY3RvciB7Li4uIHRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICA8U2VsbEJ1dHRvbnMgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCBzdGF0ZSwgb3duUHJvcHMpID0+IHtcclxuICAgIHJldHVybiBvd25Qcm9wcztcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29udGVudExpc3RpbmdJbml0IDogKGNvbnRlbnQpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdDT05URU5UX0lOSVQnLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50XHJcbiAgICAgICAgfSksXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoU2VsbEZvcm0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL1NlbGxGb3JtLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5cclxuY29uc3QgU3VwZXJSaWdodCA9ICh7c3VwZXJSaWdodCwgb25DaGFuZ2UsIGNoZWNrZWR9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1ib3gtaXRlbVwiID5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1ib3gtY2hlY2tib3hcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q2hlY2tlZD17Y2hlY2tlZH1cclxuICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgKCkgPT4gb25DaGFuZ2Uoc3VwZXJSaWdodCl9XHJcbiAgICAgICAgICAgICAgICAgICBpZD17XCJzdXBlci1yaWdodC1cIiArIHN1cGVyUmlnaHQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwYWNrYWdlLXNlbGVjdG9yXCIgLz5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtcInN1cGVyLXJpZ2h0LVwiICsgc3VwZXJSaWdodC5pZH0+PC9sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1ib3gtaXRlbS1sYWJlbFwiPlxyXG4gICAgICAgICAgICB7IHN1cGVyUmlnaHQubmFtZSB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmNsYXNzIFBhY2thZ2VTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBwYWNrYWdlcyA6IEpTT04ucGFyc2UocHJvcHMucGFja2FnZXMpLFxyXG4gICAgICAgICAgICBjb250ZW50IDogSlNPTi5wYXJzZShwcm9wcy5jb250ZW50KVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnN0ZXAgPT09IDIgJiYgPGRpdiBjbGFzc05hbWU9XCJib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveC10aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQaWNrIHJpZ2h0c1xyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsbGVyLWJveC1jb250ZW50IHNlbGxlci1ib3gtcGFja2FnZXNcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5wYWNrYWdlcy5tYXAoZnVuY3Rpb24oc3VwZXJSaWdodCwgaSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFN1cGVyUmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3N1cGVyUmlnaHQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXJSaWdodD17c3VwZXJSaWdodH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXsgQ29udGVudEFyZW5hLlV0aWxzLmdldEluZGV4KCBzdXBlclJpZ2h0LmlkLCBfdGhpcy5zdGF0ZS5jb250ZW50LnJpZ2h0c19wYWNrYWdlLCBcImlkXCIpICE9PSAtMSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyBfdGhpcy5wcm9wcy5zdXBlclJpZ2h0c1VwZGF0ZWQgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0ZXAgOiBzdGF0ZS5zdGVwLFxyXG4gICAgICAgIHN1cGVyUmlnaHRzIDogc3RhdGUuc3VwZXJSaWdodHNcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3VwZXJSaWdodHNVcGRhdGVkIDogKHJpZ2h0c19wYWNrYWdlKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnU1VQRVJfUklHSFRTX1VQREFURUQnLFxyXG4gICAgICAgICAgICByaWdodHNfcGFja2FnZTogcmlnaHRzX3BhY2thZ2VcclxuICAgICAgICB9KSxcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShQYWNrYWdlU2VsZWN0b3IpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb250YWluZXJzL1BhY2thZ2VTZWxlY3Rvci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuXHJcbmNsYXNzIFNlbGxGb3JtU3RlcDEgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdGl0bGUgOiBcIlN0ZXAgMSAtIEV2ZW50IHNlbGVjdGlvblwiXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLnByb3BzLnN0ZXAgIT09IDEpIHJldHVybiAobnVsbCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSB7XHJcbiAgICAgICAgICAgIHNwb3J0czoge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgOiBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMucHJvcHMuc3BvcnRzLmxlbmd0aCA+IDAgKSBpbnB1dFByb3BzLnNwb3J0cy52YWx1ZSA9IHRoaXMucHJvcHMuc3BvcnRzWzBdLm5hbWU7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudGl0bGUgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1pdGVtLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsZWFzZSBlbnRlciB0aGUgbmFtZSBvZiB0aGUgY29tcGV0aXRpb24gZm9yIHdoaWNoIHlvdSB3b3VsZCBsaWtlIHRvIHNlbGwgY29udGVudC4gSW4gY2FzZSB5b3UgY2FuJ3QgZmluZCB5b3VyIGNvbXBldGl0aW9uLCBwbGVhc2UgZm9sbG93IHRoZSBzdGVwcyBiZWxvd1xyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwic2VhcmNoLXNwb3J0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBjb21wZXRpdGlvbiBuYW1lIChlLmcuIEJ1bmRlc2xpZ2EpXCIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWl0ZW0tZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgUGxlYXNlIHNlbGVjdCB0aGUgc3BvcnQocykgYW5kIGNvbXBldGl0aW9uKHMpIGNvdmVyZWQgYnkgeW91ciBjb250ZW50IGxpc3Rpbmc6XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmlucHV0UHJvcHMuc3BvcnRzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vcGVuU3BvcnRTZWxlY3Rvcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1wiU3BvcnRcIn0gIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0ZXAgOiBzdGF0ZS5zdGVwLFxyXG4gICAgICAgIHNwb3J0czogc3RhdGUuc3BvcnRzXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9wZW5TcG9ydFNlbGVjdG9yIDogKCkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogJ09QRU5fU0VMRUNUT1InLFxyXG4gICAgICAgICAgICBzZWxlY3Rvckl0ZW1zIDogQ29udGVudEFyZW5hLkRhdGEuRnVsbFNwb3J0cyxcclxuICAgICAgICAgICAgcG9wdWxhckl0ZW1zIDogQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzLFxyXG4gICAgICAgICAgICBzZWxlY3RvclR5cGUgOiBcInNwb3J0c1wiXHJcbiAgICAgICAgfSksXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoU2VsbEZvcm1TdGVwMSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwMS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuXHJcbmNvbnN0IFNlbGxGb3JtU3RlcCA9ICh7c3RlcCwgYWN0aXZlLCB0aXRsZX0pID0+IChcclxuICAgIDxkaXYgIGNsYXNzTmFtZT17XCJzdGVwIFwiICsgKGFjdGl2ZSAmJiBcInN0ZXAtYWN0aXZlXCIpIH0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWxhYmVsXCI+XHJcbiAgICAgICAgICAgIFN0ZXAgeyBzdGVwIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtdGl0bGVcIj5cclxuICAgICAgICAgICAge3RpdGxlfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1pY29uXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmNsYXNzIFNlbGxGb3JtU3RlcHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgc3RlcHM6IFtcclxuICAgICAgICAgICAgICAgIHtzdGVwOiAxLCB0aXRsZTogXCJFdmVudCBzZWxlY3Rpb25cIn0sXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogMiwgdGl0bGU6IFwiQ29uZmlndXJlIHJpZ2h0c1wifSxcclxuICAgICAgICAgICAgICAgIHtzdGVwOiAzLCB0aXRsZTogXCJEaXN0cmlidXRpb24gc3R5bGVcIn0sXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogNCwgdGl0bGU6IFwiUHJpY2UsIHBheW1lbnQgYW5kIGxpc3RpbmcgZGV0YWlsc1wifSxcclxuICAgICAgICAgICAgICAgIHtzdGVwOiA1LCB0aXRsZTogXCJDb25maXJtXCJ9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94LWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnN0ZXBzLm1hcCgoc3RlcCwgaSk9PntcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFNlbGxGb3JtU3RlcCBrZXk9e2l9IHN0ZXA9e3N0ZXAuc3RlcH0gdGl0bGU9e3N0ZXAudGl0bGV9IGFjdGl2ZT17X3RoaXMucHJvcHMuc3RlcCA9PT0gc3RlcC5zdGVwfS8+XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdGVwIDogc3RhdGUuc3RlcCxcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoU2VsbEZvcm1TdGVwcylcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vc3RvcmUnO1xyXG5cclxuY2xhc3MgU2VsbEJ1dHRvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgbGFzdFN0ZXAgOiBwcm9wcy5sYXN0U3RlcCB8fCA1LFxyXG4gICAgICAgICAgICBzYXZpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgc2F2aW5nU3VjY2VzczogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVBc0RyYWZ0ID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoeyBzYXZpbmcgOiB0cnVlIH0pO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnNhdmVDb250ZW50QXNEcmFmdChzdG9yZS5nZXRTdGF0ZSgpKS5kb25lKGZ1bmN0aW9uICggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgc2F2aW5nIDogZmFsc2UsIHNhdmluZ1N1Y2Nlc3M6IHRydWUgfSk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgc2F2aW5nIDogZmFsc2UsIHNhdmluZ1N1Y2Nlc3M6IGZhbHNlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIGxldCBzYXZlQXNEcmFmdFRleHQgPSAodGhpcy5zdGF0ZS5zYXZpbmcpID8gXCJTYXZpbmcuLlwiIDogKHRoaXMuc3RhdGUuc2F2aW5nU3VjY2VzcykgPyBcIlNhdmVkIGFzIERyYWZ0XCIgOiBcIlNhdmUgYXMgRHJhZnRcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zLWNvbnRhaW5lclwiID5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zdGVwICE9PSAxICYmXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwicHJldmlvdXMtc3RlcFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLnByb3BzLmdvVG9QcmV2aW91c1N0ZXAgfT5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1hcnJvdy1sZWZ0XCI+PC9pPiBCYWNrXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj4gfVxyXG5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RhbmRhcmQtYnV0dG9uXCIgb25DbGljaz17IHRoaXMuc2F2ZUFzRHJhZnQgfSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5zYXZpbmd9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgc2F2ZUFzRHJhZnRUZXh0IH17IHRoaXMuc3RhdGUuc2F2aW5nICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCI+PC9pPn1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zdGVwID09PSB0aGlzLnN0YXRlLmxhc3RTdGVwICYmXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiZHJhZnQtbGlzdGluZ1wiIGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIFN1Ym1pdCBMaXN0aW5nXHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj4gfVxyXG5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zdGVwICE9PSB0aGlzLnN0YXRlLmxhc3RTdGVwICYmXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwibmV4dC1zdGVwXCIgY2xhc3NOYW1lPVwic3RhbmRhcmQtYnV0dG9uXCIgb25DbGljaz17ICgpID0+IHRoaXMucHJvcHMuZ29Ub05leHRTdGVwKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICBOZXh0IDxpIGNsYXNzTmFtZT1cImZhIGZhLWFycm93LXJpZ2h0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+IH1cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc3RlcCA6IHN0YXRlLnN0ZXBcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ29Ub05leHRTdGVwIDogKCkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogJ0dPX1RPX05FWFRfU1RFUCdcclxuICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgZ29Ub1ByZXZpb3VzU3RlcCA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdHT19UT19QUkVWSU9VU19TVEVQJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoU2VsbEJ1dHRvbnMpXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9idXR0b25zLmpzIiwiY29uc3QgY29udGVudCA9IChzdGF0ZSA9IHtcclxuICAgIHN0ZXA6IDEsXHJcbiAgICByaWdodHNfcGFja2FnZSA6IFtdLFxyXG4gICAgc2VsZWN0b3JJbmZvIDoge1xyXG4gICAgICAgIHR5cGU6IFwic3BvcnRcIixcclxuICAgICAgICBvcGVuIDogZmFsc2UsXHJcbiAgICAgICAgc2VsZWN0b3JJdGVtczogW10sXHJcbiAgICAgICAgcG9wdWxhckl0ZW1zOiBbXVxyXG4gICAgfSxcclxuICAgIHNwb3J0cyA6IFtdXHJcbn0sIGFjdGlvbikgPT4ge1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlICdDT05URU5UX0lOSVQnOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5jb250ZW50KTtcclxuICAgICAgICBjYXNlICdHT19UT19ORVhUX1NURVAnOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHN0ZXA6IHN0YXRlLnN0ZXAgKyAxXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgJ0dPX1RPX1BSRVZJT1VTX1NURVAnOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHN0ZXA6IHN0YXRlLnN0ZXAgLSAxXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYXNlICdPUEVOX1NFTEVDVE9SJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvckluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvclR5cGU6IGFjdGlvbi5zZWxlY3RvclR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogYWN0aW9uLnNlbGVjdG9ySXRlbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9wdWxhckl0ZW1zOiBhY3Rpb24ucG9wdWxhckl0ZW1zXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgJ0NMT1NFX1NFTEVDVE9SJzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvckluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvclR5cGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbiA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvcHVsYXJJdGVtczogW11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhc2UgJ0FQUExZX1NFTEVDVElPTic6XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wZW4gOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzZWxlY3Rpb25bYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbYWN0aW9uLnNlbGVjdGVkSXRlbV07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHNlbGVjdGlvbik7XHJcblxyXG4gICAgICAgIGNhc2UgJ1NVUEVSX1JJR0hUU19VUERBVEVEJzpcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU1VQRVJfUklHSFRTX1VQREFURURcIik7XHJcbiAgICAgICAgICAgIGxldCByaWdodHNfcGFja2FnZSA9IHN0YXRlLnJpZ2h0c19wYWNrYWdlO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBDb250ZW50QXJlbmEuVXRpbHMuZ2V0SW5kZXgoYWN0aW9uLnJpZ2h0c19wYWNrYWdlLmlkLCByaWdodHNfcGFja2FnZSwgXCJpZFwiKTtcclxuICAgICAgICAgICAgaWYgKCAgaW5kZXggPT09IC0xICl7XHJcbiAgICAgICAgICAgICAgICByaWdodHNfcGFja2FnZS5wdXNoKGFjdGlvbi5yaWdodHNfcGFja2FnZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0c19wYWNrYWdlLnNwbGljZShpbmRleCwgMSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICByaWdodHNfcGFja2FnZTogcmlnaHRzX3BhY2thZ2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29udGVudFxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL2NvbnRlbnQuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCBTZWxsRm9ybSBmcm9tIFwiLi9jb21wb25lbnRzL1NlbGxGb3JtXCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcclxuXHJcbmNvbnN0IHNlbGxGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGwtZm9ybS1jb250YWluZXInKTtcclxuXHJcblJlYWN0RE9NLnJlbmRlcihcclxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgICAgIDxTZWxsRm9ybSB7Li4uc2VsbEZvcm0uZGF0YXNldCB9IC8+XHJcbiAgICA8L1Byb3ZpZGVyPixcclxuICAgIHNlbGxGb3JtXHJcbik7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgYWxsIHRoZSB0b29sdGlwc1xyXG4gICAgICovXHJcbiAgICAkKCBkb2N1bWVudCApLnRvb2x0aXAoKTtcclxuXHJcbiAgICAkKFwiLmhhcy1kYXRlcGlja2VyXCIpLmRhdGVwaWNrZXIoKTtcclxuXHJcbiAgICAkKFwiaW5wdXRcIikub24oJ2ZvY3VzJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiaW52YWxpZFwiKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIub3B0aW9uYWxcIikuaGlkZSgpO1xyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3NlbGwuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB3aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuICAgIENvbnRlbnRBcmVuYS5Nb2RlbCA9IENvbnRlbnRBcmVuYS5Nb2RlbCB8fCB7fTtcclxuICAgIENvbnRlbnRBcmVuYS5Gb3JtID0gQ29udGVudEFyZW5hLkZvcm0gfHwge307XHJcbiAgICBDb250ZW50QXJlbmEuVGVzdCA9IENvbnRlbnRBcmVuYS5UZXN0IHx8IHt9O1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5Gb3JtLmFkZEN1c3RvbVNlYXNvbiA9IGZ1bmN0aW9uKCBpZCwgY29udGFpbmVyU2VsZWN0b3IgKXtcclxuICAgICAgICB2YXIgY29udGFpbmVyID0gJChjb250YWluZXJTZWxlY3RvciB8fCBcIiNldmVudC1zY2hlZHVsZS1zdWJpdGVtc1wiKSxcclxuICAgICAgICAgICAgc2Vhc29uTnVtYmVyID0gJChcIi5jdXN0b20tc2Vhc29uLWNvbnRhaW5lclwiLCBjb250YWluZXIpLmxlbmd0aCArIDEsXHJcbiAgICAgICAgICAgIHNvdXJjZSA9ICQoXCIjZXZlbnQtc2Vhc29uLXNlbGVjdG9yXCIpLmF1dG9jb21wbGV0ZSggXCJvcHRpb25cIiwgXCJzb3VyY2VcIiApLFxyXG4gICAgICAgICAgICBoYXNTZWFzb24gPSBzb3VyY2UubGVuZ3RoID4gMCxcclxuICAgICAgICAgICAgbGFiZWxzID0gKGhhc1NlYXNvbikgPyBzb3VyY2VbMF0ubGFiZWwuc3BsaXQoXCIgXCIpIDogW10sXHJcbiAgICAgICAgICAgIHNlYXNvblllYXIgPSAoaGFzU2Vhc29uKSA/IGxhYmVscy5wb3AoKSA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSAsXHJcbiAgICAgICAgICAgIHN0YXJ0WWVhciA9IChoYXNTZWFzb24pID8gKCBzZWFzb25ZZWFyLnNlYXJjaChcIi9cIikgIT09IC0xICkgPyBOdW1iZXIoc2Vhc29uWWVhci5zcGxpdChcIi9cIilbMF0pICsgc2Vhc29uTnVtYmVyIDogTnVtYmVyKHNlYXNvblllYXIpICsgc2Vhc29uTnVtYmVyIDogc2Vhc29uWWVhciAsXHJcbiAgICAgICAgICAgIGVuZFllYXIgPSAoaGFzU2Vhc29uKSA/ICggc2Vhc29uWWVhci5zZWFyY2goXCIvXCIpICE9PSAtMSApID8gTnVtYmVyKHNlYXNvblllYXIuc3BsaXQoXCIvXCIpWzFdKSArIHNlYXNvbk51bWJlciA6IG51bGwgOiBzZWFzb25ZZWFyICxcclxuICAgICAgICAgICAgc2Vhc29uTmFtZSA9IChoYXNTZWFzb24pID8gbGFiZWxzLmpvaW4oXCIgXCIpIDogXCJcIixcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSAkLnRlbXBsYXRlcyhcIiNzZWFzb24tdGVtcGxhdGVcIiksXHJcbiAgICAgICAgICAgIHNlYXNvbkRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBpZCA6IHNlYXNvbk51bWJlcixcclxuICAgICAgICAgICAgICAgIG5hbWUgOiBzZWFzb25OYW1lLFxyXG4gICAgICAgICAgICAgICAgc3RhcnRZZWFyOiBzdGFydFllYXIsXHJcbiAgICAgICAgICAgICAgICBlbmRZZWFyOiBlbmRZZWFyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlYXNvbkVsZW1lbnQgPSAkKHRlbXBsYXRlLnJlbmRlcihzZWFzb25EYXRhKSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmQoIHNlYXNvbkVsZW1lbnQgKTtcclxuXHJcbiAgICAgICAgJChcIi5yZW1vdmUtc2Vhc29uXCIsIHNlYXNvbkVsZW1lbnQgKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2Vhc29uRWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBDb250ZW50QXJlbmEuQ29udGVudCA9IG5ldyBDb250ZW50QXJlbmEuTW9kZWwuQ29udGVudCgpO1xyXG5cclxuICAgIHZhciByb3VuZHMgPSB7fTtcclxuXHJcbiAgICBmdW5jdGlvbiBzcGxpdCggdmFsICkge1xyXG4gICAgICAgIHJldHVybiB2YWwuc3BsaXQoIC8sXFxzKi8gKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHRyYWN0TGFzdCggdGVybSApIHtcclxuICAgICAgICByZXR1cm4gc3BsaXQoIHRlcm0gKS5wb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaWxsU3BvcnRzKHNlbGVjdG9yLCB0b3BTcG9ydHMsIGZ1bGxTcG9ydHMsIGNhbGxiYWNrKXtcclxuXHJcbiAgICAgICAgdmFyIGVsID0gJChzZWxlY3RvciksIGZ1bGxTcG9ydHNMb2FkZWQ7XHJcblxyXG4gICAgICAgIGVsLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdG9wU3BvcnRzLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDAsXHJcbiAgICAgICAgICAgIGRlbGF5OiA1MDAsXHJcbiAgICAgICAgICAgIHNlYXJjaCA6IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgICAgIGlmICggIWZ1bGxTcG9ydHNMb2FkZWQgJiYgJChldmVudC50YXJnZXQpLnZhbCgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLmF1dG9jb21wbGV0ZShcIm9wdGlvblwiLCBcInNvdXJjZVwiLCBmdWxsU3BvcnRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZ1bGxTcG9ydHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHVpLml0ZW0udmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwiYWxsXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5hdXRvY29tcGxldGUoIFwib3B0aW9uXCIsIFwic291cmNlXCIsIGZ1bGxTcG9ydHMgKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5hdXRvY29tcGxldGUoXCJzZWFyY2hcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcIm5ld1wiKXtcclxuICAgICAgICAgICAgICAgICAgICBhZGRDdXN0b21UZW1wbGF0ZSh0cnVlLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgLnZhbCh1aS5pdGVtLmxhYmVsKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiZXh0ZXJuYWxJZFwiLCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAudHJpZ2dlcignYmx1cicpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggY2FsbGJhY2sgKSBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLmZvY3VzKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKFwic2VhcmNoXCIsIFwiXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbGxDYXRlZ29yaWVzKCl7XHJcblxyXG4gICAgICAgIHZhciBlbCA9ICQoXCIjZXZlbnQtY2F0ZWdvcnktc2VsZWN0b3JcIiksXHJcbiAgICAgICAgICAgIHNwb3J0SWQgPSAkKFwiI2V2ZW50LXNwb3J0LXNlbGVjdG9yXCIpLmF0dHIoXCJleHRlcm5hbElkXCIpLFxyXG4gICAgICAgICAgICBzcGlubmVyID0gZWwucGFyZW50KCkuZmluZChcImlcIik7XHJcblxyXG4gICAgICAgIHNwaW5uZXIuc2hvdygpO1xyXG4gICAgICAgIGVsLmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIGlmICggZWwuZGF0YSgnYXV0b2NvbXBsZXRlJykgKSBlbC5hdXRvY29tcGxldGUoJ2Rlc3Ryb3knKS5vZmYoKTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkFwaS5nZXRDYXRlZ29yaWVzKHNwb3J0SWQpLmRvbmUoZnVuY3Rpb24gKCBjYXRlZ29yaWVzICkge1xyXG4gICAgICAgICAgICBlbC5hdHRyKFwiZGlzYWJsZWRcIiwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIGNhdGVnb3JpZXMubGVuZ3RoID09PSAwICl7XHJcbiAgICAgICAgICAgICAgICBhZGRDdXN0b21UZW1wbGF0ZSggZmFsc2UsIHRydWUsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgIHNwaW5uZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbC5zaG93KCk7XHJcbiAgICAgICAgICAgIGVsLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IGNhdGVnb3JpZXMsXHJcbiAgICAgICAgICAgICAgICBtaW5MZW5ndGggOiAwLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0OiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdWkuaXRlbS52YWx1ZSA9PT0gXCJuZXdcIiApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRDdXN0b21UZW1wbGF0ZSggZmFsc2UsIHRydWUsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLnZhbCh1aS5pdGVtLmxhYmVsKS5hdHRyKFwiZXh0ZXJuYWxJZFwiLCB1aS5pdGVtLnZhbHVlKS5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsbFRvdXJuYW1lbnRzKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChbXCIjZXZlbnQtdG91cm5hbWVudC1zZWxlY3RvclwiLCBcIiNldmVudC1zZWFzb24tc2VsZWN0b3JcIl0sIGZ1bmN0aW9uKGssIGlkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChpZCkudmFsKFwiXCIpLnJlbW92ZUNsYXNzKFwiY3VzdG9tLWlucHV0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjZXZlbnQtc2NoZWR1bGUtc3ViaXRlbXNcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmN1c3RvbS10ZW1wbGF0ZS1pdGVtXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuZm9jdXMoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKFwic2VhcmNoXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNwaW5uZXIuaGlkZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaWxsVG91cm5hbWVudHMoc2lsZW50KXtcclxuXHJcbiAgICAgICAgdmFyIHNwb3J0SWQgPSAkKFwiI2V2ZW50LXNwb3J0LXNlbGVjdG9yXCIpLmF0dHIoJ2V4dGVybmFsSWQnKSxcclxuICAgICAgICAgICAgY2F0ZWdvcnlJZCA9ICQoXCIjZXZlbnQtY2F0ZWdvcnktc2VsZWN0b3JcIikuYXR0cignZXh0ZXJuYWxJZCcpLFxyXG4gICAgICAgICAgICBlbCA9ICQoXCIjZXZlbnQtdG91cm5hbWVudC1zZWxlY3RvclwiKSxcclxuICAgICAgICAgICAgc3Bpbm5lciA9IGVsLnBhcmVudCgpLmZpbmQoXCJpXCIpO1xyXG5cclxuICAgICAgICBzcGlubmVyLnNob3coKTtcclxuXHJcbiAgICAgICAgZWwuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgaWYgKCBlbC5kYXRhKCdhdXRvY29tcGxldGUnKSApIGVsLmF1dG9jb21wbGV0ZSgnZGVzdHJveScpLm9mZigpO1xyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldFRvdXJuYW1lbnRzKCBzcG9ydElkLCBjYXRlZ29yeUlkICkuZG9uZSgoIHRvdXJuYW1lbnRzICkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKCBzcG9ydElkID09PSBcInNyOnNwb3J0OjVcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgdG91cm5hbWVudHMgPSB0b3VybmFtZW50cy5maWx0ZXIoZnVuY3Rpb24odG91cm5hbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0b3VybmFtZW50LmxhYmVsLnNlYXJjaChcIkRvdWJsZVwiKSA9PT0gLTEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdG91cm5hbWVudHMgPSB0b3VybmFtZW50cy5tYXAoZnVuY3Rpb24gKHRvdXJuYW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50LmxhYmVsID0gdG91cm5hbWVudC5sYWJlbC5yZXBsYWNlKFwiIFNpbmdsZXNcIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvdXJuYW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCAhc2lsZW50ICkgZmlsbENhdGVnb3JpZXMoKTtcclxuXHJcbiAgICAgICAgICAgIGVsLmF0dHIoXCJkaXNhYmxlZFwiLCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICggdG91cm5hbWVudHMubGVuZ3RoID09PSAwICl7XHJcbiAgICAgICAgICAgICAgICBhZGRDdXN0b21UZW1wbGF0ZSggZmFsc2UsIHRydWUsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgIHNwaW5uZXIuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlbC5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICAgICAgc291cmNlOiBmdW5jdGlvbihyZXF1ZXN0LCByZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gJC51aS5hdXRvY29tcGxldGUuZmlsdGVyKHRvdXJuYW1lbnRzLCByZXF1ZXN0LnRlcm0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZShyZXN1bHRzLnNsaWNlKDAsIDMwMCkpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1pbkxlbmd0aCA6IDAsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB1aS5pdGVtLnZhbHVlID09PSBcIm5ld1wiICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEN1c3RvbVRlbXBsYXRlKCBmYWxzZSwgZmFsc2UsIHRydWUgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLnZhbCh1aS5pdGVtLmxhYmVsKS5hdHRyKFwiZXh0ZXJuYWxJZFwiLCB1aS5pdGVtLnZhbHVlKS5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsbFNlYXNvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2V2ZW50LXNlYXNvbi1zZWxlY3RvclwiKS52YWwoXCJcIikucmVtb3ZlQ2xhc3MoXCJjdXN0b20taW5wdXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNldmVudC1zY2hlZHVsZS1zdWJpdGVtc1wiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuY3VzdG9tLXRlbXBsYXRlLWl0ZW1cIikuY2hpbGRyZW4oKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmZvY3VzKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZShcInNlYXJjaFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzcGlubmVyLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaWxsU2Vhc29ucygpe1xyXG4gICAgICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICBzZWxlY3RvciA6IFwiI2V2ZW50LXNlYXNvbi1zZWxlY3RvclwiLFxyXG4gICAgICAgICAgICBwYXJlbnRTZWxlY3Rpb24gOiBcIiNldmVudC10b3VybmFtZW50LXNlbGVjdG9yXCIsXHJcbiAgICAgICAgICAgIGVuZHBvaW50IDogXCJ2MS9mZWVkL3NlYXNvbnNcIixcclxuICAgICAgICAgICAgcmVxdWVzdFR5cGUgOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7eyBzZWFzb25zOiB7IHNlYXNvbjogb2JqZWN0fX19IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZ2V0U291cmNlIDogZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsaXN0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc2Vhc29ucyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAkLmlzQXJyYXkocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24pICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9ICQubWFwKHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2xhYmVsOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsIHZhbHVlOiBpdGVtWydAYXR0cmlidXRlcyddLmlkfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IFt7bGFiZWw6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLm5hbWUsIHZhbHVlOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5pZH1dXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbCA6IFwiQWRkIG5ld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlIDogXCJuZXdcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGVsID0gJChvcHRpb25zLnNlbGVjdG9yKSxcclxuICAgICAgICAgICAgc3Bpbm5lciA9IGVsLnBhcmVudCgpLmZpbmQoXCJpXCIpLFxyXG4gICAgICAgICAgICBzb3VyY2U7XHJcblxyXG4gICAgICAgIHNwaW5uZXIuc2hvdygpO1xyXG5cclxuICAgICAgICBlbC5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICBpZiAoIGVsLmRhdGEoJ2F1dG9jb21wbGV0ZScpICkgZWwuYXV0b2NvbXBsZXRlKCdkZXN0cm95Jykub2ZmKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogaG9zdHVybCArIG9wdGlvbnMuZW5kcG9pbnQsXHJcbiAgICAgICAgICAgIHR5cGU6IG9wdGlvbnMucmVxdWVzdFR5cGUgfHwgXCJHRVRcIixcclxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiAkKG9wdGlvbnMucGFyZW50U2VsZWN0aW9uKS5hdHRyKCdleHRlcm5hbElkJykgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc291cmNlID0gb3B0aW9ucy5nZXRTb3VyY2UocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgZWwuYXR0cihcImRpc2FibGVkXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgZWwuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5MZW5ndGggOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdDogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgYXV0b2NvbXBsZXRlIHBsdWdpbiBkZWZhdWx0IGFjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB1aS5pdGVtLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIG5ldyBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggc2VsZWN0ZWQgPT09IFwibmV3XCIgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWRkQ3VzdG9tVGVtcGxhdGUoIGZhbHNlLCBmYWxzZSwgZmFsc2UgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Gb3JtLmFkZEN1c3RvbVNlYXNvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmN1c3RvbS10ZW1wbGF0ZS1pdGVtXCIpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gc2VsZWN0ZWQucmVwbGFjZSgvXFw6L2csICctJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZSA9ICQuZ3JlcChzb3VyY2UsIGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsLnZhbHVlICE9PSB1aS5pdGVtLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjZXZlbnQtc2NoZWR1bGUtc3ViaXRlbXMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cInN0ZXAxLWV2ZW50LXN1Yml0ZW0tdGl0bGUgc3RhbmRhcmQtYnV0dG9uLWFjdGl2ZSBzZWFzb25cIiAgbWFpbnJlZj1cIicrIGlkICsnXCI+Jyt1aS5pdGVtLmxhYmVsKyc8L2Rpdj48ZGl2IGNsYXNzPVwic3RlcDEtZXZlbnQtc3ViaXRlbXMtY29udGFpbmVyXCI+PGRpdiBjbGFzcz1cInN0ZXAxLWV2ZW50LXN1Yml0ZW0tdGl0bGVcIiByZWY9XCInKyBpZCArJ1wiID5GaXh0dXJlPC9kaXY+PGRpdiBjbGFzcz1cInN0ZXAxLWV2ZW50LXN1Yml0ZW1zLWNvbnRhaW5lciBpcy1oaWRkZW5cIiBpZD1cIicrIGlkICsnXCIgPjxpIGNsYXNzPVwiZmEgZmEtY29nIGZhLXNwaW4gcG9zLXJlbFwiPjwvaT48L2Rpdj48L2Rpdj4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCJbcmVmPVwiK2lkK1wiXVwiKS5vbiggXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9ICQoXCIjXCIraWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcInN0YW5kYXJkLWJ1dHRvbi1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rvci50b2dnbGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yLmZpbmQoXCJpXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiW21haW5yZWY9XCIraWQrXCJdXCIpLm9uKCBcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm5leHQoKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UudW5zaGlmdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgOiB1aS5pdGVtLmxhYmVsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlIDogdWkuaXRlbS52YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJCggZXZlbnQudGFyZ2V0ICkuYXV0b2NvbXBsZXRlKCBcIm9wdGlvblwiLCBcInNvdXJjZVwiLCBzb3VyY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsbFNjaGVkdWxlKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5mb2N1cyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKFwic2VhcmNoXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc3Bpbm5lci5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaWxsU2NoZWR1bGUoIGlkICl7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBob3N0dXJsICsgXCJ2MS9mZWVkL3NjaGVkdWxlc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiBpZC5yZXBsYWNlKC9cXC0vZywgJzonKSB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICpcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7c3BvcnRfZXZlbnRzOiB7c3BvcnRfZXZlbnQ6e3RvdXJuYW1lbnRfcm91bmQ6b2JqZWN0fX19fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNvdXJjZSA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gJCgnIycgKyBpZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zcG9ydF9ldmVudHMgJiYgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50ICl7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLnNwb3J0X2V2ZW50cy5zcG9ydF9ldmVudCwgZnVuY3Rpb24gKGssIGl0ZW0pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWFzb25faWQgPSBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdW5kID0gaXRlbS50b3VybmFtZW50X3JvdW5kWydAYXR0cmlidXRlcyddLm51bWJlciB8fCBpdGVtLnRvdXJuYW1lbnRfcm91bmRbJ0BhdHRyaWJ1dGVzJ10udHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcm91bmRzW3NlYXNvbl9pZF0gPT09IHVuZGVmaW5lZCkgcm91bmRzW3NlYXNvbl9pZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCByb3VuZHNbc2Vhc29uX2lkXVtyb3VuZF0gPT09IHVuZGVmaW5lZCApIHJvdW5kc1tzZWFzb25faWRdW3JvdW5kXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3VuZHNbc2Vhc29uX2lkXVtyb3VuZF0ucHVzaChpdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZSA9ICQubWFwKHJvdW5kc1tpZF0sIGZ1bmN0aW9uIChpdGVtLCBrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGsgPT09ICd1bmRlZmluZWQnICkgayA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7bGFiZWw6IFwiTWF0Y2hkYXkgXCIgKyBrLCB2YWx1ZTogXCJtYXRjaGRheS1cIitrfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQuZWFjaCggc291cmNlLCBmdW5jdGlvbihrLCBpdGVtKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm91bmROdW1iZXIgPSBpdGVtLnZhbHVlLnJlcGxhY2UoXCJtYXRjaGRheS1cIiwgXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnIycgKyBpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cInN0ZXAxLWV2ZW50LXN1Yml0ZW0tdGl0bGUgbWF0Y2hkYXktc3ViaXRlbVwiIHJlZj1cIicraWQgKyAnLScgKyAgaXRlbS52YWx1ZSArJ1wiID4nK2l0ZW0ubGFiZWwrJzwvZGl2PjxkaXYgY2xhc3M9XCJzdGVwMS1ldmVudC1zdWJpdGVtcy1jb250YWluZXIgaXMtaGlkZGVuXCIgaWQ9XCInKyBpZCArICctJyAraXRlbS52YWx1ZSArJ1wiID48L2Rpdj4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIHt7Y29tcGV0aXRvcnM6e2NvbXBldGl0b3J9fX0gbWF0Y2hcclxuICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goIHJvdW5kc1tpZF1bcm91bmROdW1iZXJdLCBmdW5jdGlvbihrLCBtYXRjaCl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRycyA9IG1hdGNoWydAYXR0cmlidXRlcyddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGV0aXRvcnMgPSBtYXRjaC5jb21wZXRpdG9ycy5jb21wZXRpdG9yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgKz0gbmV3IERhdGUoYXR0cnMuc2NoZWR1bGVkKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsICs9IFwiIC0gXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goY29tcGV0aXRvcnMsIGZ1bmN0aW9uKGssIHYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgKz0gdlsnQGF0dHJpYnV0ZXMnXS5uYW1lICsgXCIgXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxJZCA9IFwibWF0Y2gtXCIgKyBtYXRjaFsnQGF0dHJpYnV0ZXMnXS5pZC5zcGxpdChcIjpcIilbMl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjJysgaWQgKyAnLScgKyBpdGVtLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cInN0ZXAxLWV2ZW50LXN1Yml0ZW0tdGl0bGVcIiByZWY9XCInKyBpZCArICctJyArIGl0ZW0udmFsdWUgKydcIiBpZD1cIicrICBtYXRjaFsnQGF0dHJpYnV0ZXMnXS5pZCArJ1wiIHNlbElkPVwiJytzZWxJZCsnXCIgPicrbGFiZWwrJzwvZGl2PicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIltzZWxJZD1cIisgIHNlbElkICsgXCJdXCIpLmRhdGEobWF0Y2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yLmFwcGVuZCgnPGRpdiBjbGFzcz1cInN0ZXAxLWV2ZW50LXN1Yml0ZW0tdGl0bGUgbWF0Y2hkYXktc3ViaXRlbS1zaG93YWxsXCIgPlNob3cgQWxsPC9kaXY+Jyk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rvci5maW5kKFwiaVwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLm1hdGNoZGF5LXN1Yml0ZW06bnRoLWNoaWxkKG4rMTgpXCIsIFwiI1wiKyBpZCkuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICQoXCIubWF0Y2hkYXktc3ViaXRlbS1zaG93YWxsXCIsIFwiI1wiKyBpZCkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIubWF0Y2hkYXktc3ViaXRlbTpudGgtY2hpbGQobisxOClcIiwgXCIjXCIrIGlkKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQoXCIjXCIraWQgKyBcIiAuc3RlcDEtZXZlbnQtc3ViaXRlbS10aXRsZVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3ViSXRlbUlkID0gJCh0aGlzKS5hdHRyKFwicmVmXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwic3RhbmRhcmQtYnV0dG9uLWFjdGl2ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAkKHRoaXMpLmF0dHIoXCJpZFwiKSAhPT0gdW5kZWZpbmVkICkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiggJCh0aGlzKS5oYXNDbGFzcyhcInN0YW5kYXJkLWJ1dHRvbi1hY3RpdmVcIikgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycrIHN1Ykl0ZW1JZCkuc2hvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycrIHN1Ykl0ZW1JZCkuaGlkZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaHRtbElkVG9BcGlJZCggaWQpe1xyXG4gICAgICAgIHJldHVybiBpZC5yZXBsYWNlKC9cXC0vZywgJzonKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZVN0ZXBPbmUoKXtcclxuXHJcbiAgICAgICAgdmFyIHNlYXNvbiA9ICQoXCIuc2Vhc29uXCIpLFxyXG4gICAgICAgICAgICBzcG9ydHMgPSBbXSxcclxuICAgICAgICAgICAgd2Vic2l0ZSA9ICQoXCIjZXZlbnQtd2Vic2l0ZS1zZWxlY3RvclwiKSxcclxuICAgICAgICAgICAgaGFzRXJyb3JzID0gZmFsc2U7XHJcblxyXG4gICAgICAgICQoIFwiLnN0ZXAxLWV2ZW50LWl0ZW1cIiApLmVhY2goZnVuY3Rpb24oaywgaXRlbSl7XHJcblxyXG4gICAgICAgICAgICB2YXIgaXRlbUlucHV0ID0gJChpdGVtKS5maW5kKFwiLmNvbnRlbnQtaW5wdXQ6bm90KCcuc3BvcnQtc2VsZWN0b3InKVwiKSxcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVkID0gaXRlbUlucHV0LmlzKFwiOnZpc2libGVcIikgJiYgaXRlbUlucHV0LmF0dHIoXCJyZXF1aXJlZFwiKSxcclxuICAgICAgICAgICAgICAgIG5hbWUgPSAoaXRlbUlucHV0LmF0dHIoXCJpZFwiKSkgPyBpdGVtSW5wdXQuYXR0cihcImlkXCIpLnNwbGl0KFwiLVwiKVsxXSA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICBleHRlcm5hbElkO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBpdGVtSW5wdXQubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBleHRlcm5hbElkID0gaXRlbUlucHV0LmF0dHIoXCJleHRlcm5hbElkXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBpdGVtSW5wdXQudmFsKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZSApe1xyXG4gICAgICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50W25hbWVdID0gQ29udGVudEFyZW5hLkNvbnRlbnRbbmFtZV0gfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRbbmFtZV0udmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGV4dGVybmFsSWQgKSBDb250ZW50QXJlbmEuQ29udGVudFtuYW1lXS5leHRlcm5hbElkID0gZXh0ZXJuYWxJZDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRbbmFtZV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoICF2YWx1ZSAmJiByZXF1aXJlZCApe1xyXG4gICAgICAgICAgICAgICAgJChpdGVtSW5wdXQpLmFkZENsYXNzKFwiaW52YWxpZFwiKTtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICggd2Vic2l0ZS52YWwoKSAhPT0gXCJcIiApe1xyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC53ZWJzaXRlID0gd2Vic2l0ZS52YWwoKS5zcGxpdChcIixcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIENvbnRlbnRBcmVuYS5Db250ZW50LmV2ZW50VHlwZSA9PT0gXCJjdXN0b21cIil7XHJcbiAgICAgICAgICAgICQoXCIuc3BvcnQtc2VsZWN0b3JcIikuZWFjaCggZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNwb3J0cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6ICQodGhpcykudmFsKCksXHJcbiAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZCA6ICQodGhpcykuYXR0cihcImV4dGVybmFsSWRcIilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc3BvcnRzLnB1c2goQ29udGVudEFyZW5hLkNvbnRlbnQuc3BvcnQpO1xyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5zcG9ydHMgPSBzcG9ydHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQ29udGVudEFyZW5hLkNvbnRlbnQuZXZlbnRUeXBlID09PSAnZGF0YWJhc2UnICl7XHJcblxyXG4gICAgICAgICAgICAvLyBTRUFTT05cclxuICAgICAgICAgICAgaWYgKCBzZWFzb24ubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuc2Vhc29ucyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgc2Vhc29uLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5zZWFzb25zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6ICQodGhpcykuaHRtbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkIDogaHRtbElkVG9BcGlJZCgkKHRoaXMpLmF0dHIoXCJtYWlucmVmXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50Lm1hdGNoZXMgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICQoXCIuc3RlcDEtZXZlbnQtc3ViaXRlbS10aXRsZS5zdGFuZGFyZC1idXR0b24tYWN0aXZlXCIpLmVhY2goZnVuY3Rpb24oayx2KXtcclxuICAgICAgICAgICAgICAgIHZhciBtYXRjaGRheSA9ICQodikuYXR0cihcInJlZlwiKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXRjaElkID0gJCh2KS5hdHRyKFwiaWRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBtYXRjaElkID09PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIENvbnRlbnRBcmVuYS5Db250ZW50Lm1hdGNoZXNbbWF0Y2hkYXldID09PSB1bmRlZmluZWQgKSBDb250ZW50QXJlbmEuQ29udGVudC5tYXRjaGVzW21hdGNoZGF5XSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5tYXRjaGVzW21hdGNoZGF5XS5wdXNoKCQodikuZGF0YSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiI2V2ZW50LXRpdGxlXCIpLmh0bWwoIENvbnRlbnRBcmVuYS5Db250ZW50LmdldFRpdGxlKCkgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICFoYXNFcnJvcnM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ3VzdG9tRm4oIGVsLCBwbGFjZWhvbGRlciApe1xyXG4gICAgICAgICQoZWwpXHJcbiAgICAgICAgICAgIC5vZmYoKVxyXG4gICAgICAgICAgICAudmFsKFwiXCIpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhcImN1c3RvbS1pbnB1dFwiKVxyXG4gICAgICAgICAgICAuc2hvdygpXHJcbiAgICAgICAgICAgIC5hdHRyKFwicGxhY2Vob2xkZXJcIiwgcGxhY2Vob2xkZXIpO1xyXG5cclxuICAgICAgICBpZiAoICQoZWwpLmRhdGEoJ3VpLWF1dG9jb21wbGV0ZScpICE9PSB1bmRlZmluZWQgKSAkKGVsKS5hdXRvY29tcGxldGUoJ2Rlc3Ryb3knKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDdXN0b21UZW1wbGF0ZSggc3BvcnQsIGNhdGVnb3J5LCB0b3VybmFtZW50KXtcclxuXHJcbiAgICAgICAgaWYgKCBzcG9ydCApIGFkZEN1c3RvbUZuKFwiI2V2ZW50LXNwb3J0LXNlbGVjdG9yXCIsIFwiRW50ZXIgc3BvcnQgbmFtZVwiKTtcclxuXHJcbiAgICAgICAgaWYgKCBDb250ZW50QXJlbmEuQ29udGVudC5ldmVudFR5cGUgPT09IFwiY3VzdG9tXCIgKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICggY2F0ZWdvcnkgKSBhZGRDdXN0b21GbihcIiNldmVudC1jYXRlZ29yeS1zZWxlY3RvclwiLCBcIkVudGVyIENvdW50cnkvQ2F0ZWdvcnlcIik7XHJcbiAgICAgICAgaWYgKCB0b3VybmFtZW50ICkgYWRkQ3VzdG9tRm4oXCIjZXZlbnQtdG91cm5hbWVudC1zZWxlY3RvclwiLCBcIkVudGVyIFRvdXJuYW1lbnRcIik7XHJcbiAgICAgICAgLyphZGRDdXN0b21GbihcIiNldmVudC1zZWFzb24tc2VsZWN0b3JcIiwgXCJFbnRlciBTZWFzb25cIik7XHJcbiAgICAgICAgJChcIiNldmVudC1zY2hlZHVsZS1zdWJpdGVtc1wiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICQoXCIuY3VzdG9tLXRlbXBsYXRlLWl0ZW1cIikuc2hvdygpO1xyXG4gICAgICAgICQoXCIuY3VzdG9tLXRlbXBsYXRlLWl0ZW1cIikuY2hpbGRyZW4oKS5zaG93KCk7Ki9cclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkZvcm0uYWRkQ3VzdG9tU2Vhc29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU3BvcnRMYXllcigpe1xyXG5cclxuICAgICAgICB2YXIgc3BvcnRTZWxlY3RvciA9ICQoXCIuc3BvcnQtc2VsZWN0b3JcIiksXHJcbiAgICAgICAgICAgIGV4dHJhU3BvcnRzID0gc3BvcnRTZWxlY3Rvci5sZW5ndGgsXHJcbiAgICAgICAgICAgIGlkID0gXCJzcG9ydC1zZWxlY3Rvci1cIiArIChleHRyYVNwb3J0cyArIDEpLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9ICQudGVtcGxhdGVzKFxyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPVxcXCJzdGVwMS1ldmVudC1pdGVtXFxcIj5cXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIiAgIDxpIGNsYXNzPVxcXCJmYSBmYS1jb2cgZmEtc3BpblxcXCI+PC9pPlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiICAgICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCIgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcIlNwb3J0XFxcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiICAgICAgICAgIGlkPVxcXCJ7ezppZH19XFxcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiICAgICAgICAgIGNsYXNzPVxcXCJjb250ZW50LWlucHV0IHNwb3J0LXNlbGVjdG9yXFxcIlxcblwiICtcclxuICAgICAgICAgICAgICAgIFwiICAgICAgICAgIHJlcXVpcmVkLz4gXCIgK1xyXG4gICAgICAgICAgICAgICAgXCI8YnV0dG9uIGNsYXNzPVxcXCJyZW1vdmUtYnV0dG9uXFxcIj5SZW1vdmU8L2J1dHRvbj5cXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIjwvZGl2PlwiKSxcclxuICAgICAgICAgICAgaHRtbE91dHB1dCA9IHRlbXBsYXRlLnJlbmRlcih7aWQ6IGlkIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmIChleHRyYVNwb3J0cz09PTApe1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFmdGVyKGh0bWxPdXRwdXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNwb3J0U2VsZWN0b3IubGFzdCgpLnBhcmVudCgpLmFmdGVyKGh0bWxPdXRwdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJChcIiNcIitpZCkucGFyZW50KCkuZmluZCgnYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYoc3BvcnRTZWxlY3Rvci5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgICAgICAgJChcIiNldmVudC10b3VybmFtZW50LXNlbGVjdG9yLCAjZXZlbnQtc2Vhc29uLXNlbGVjdG9yXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LmV2ZW50VHlwZSA9IFwiZGF0YWJhc2VcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiI2V2ZW50LWNhdGVnb3J5LXNlbGVjdG9yLCAjZXZlbnQtdG91cm5hbWVudC1zZWxlY3RvciwgI2V2ZW50LXNlYXNvbi1zZWxlY3RvclwiKS5oaWRlKCk7XHJcbiAgICAgICAgcmVzZXRTZWxlY3RvcihbXCJjYXRlZ29yeVwiLCBcInRvdXJuYW1lbnRcIiwgXCJzZWFzb25cIl0pO1xyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5ldmVudFR5cGUgPSBcImN1c3RvbVwiO1xyXG4gICAgICAgIGZpbGxTcG9ydHMoIFwiI1wiK2lkLCBDb250ZW50QXJlbmEuRGF0YS5Ub3BTcG9ydHMsIENvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRHZW5lcmljRXBpc29kZXMoIHF1YW50aXR5ICl7XHJcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gJC50ZW1wbGF0ZXMoXCIjZXBpc29kZS10ZW1wbGF0ZVwiKSxcclxuICAgICAgICAgICAgY29udGFpbmVyID0gJChcIiNjb250ZW50LWRldGFpbHMtbWFza1wiKSxcclxuICAgICAgICAgICAgY3VycmVudFF1YW50aXR5ID0gY29udGFpbmVyLmNoaWxkcmVuKCkubGVuZ3RoLFxyXG4gICAgICAgICAgICBzdGFydCA9IDA7XHJcblxyXG4gICAgICAgIGlmICggY3VycmVudFF1YW50aXR5ID4gcXVhbnRpdHkgKSBjb250YWluZXIuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgaWYgKCBjdXJyZW50UXVhbnRpdHkgPCBxdWFudGl0eSApIHN0YXJ0ID0gY3VycmVudFF1YW50aXR5O1xyXG5cclxuICAgICAgICBmb3IoIHZhciBpID0gc3RhcnQ7IGkgPCBxdWFudGl0eTsgaSsrKXtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZCh0ZW1wbGF0ZS5yZW5kZXIoe2lkOiBpICsgMSB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLmVwaXNvZGUtYXZhaWxhYmlsaXR5LWRhdGU6bm90KC5oYXNEYXRlcGlja2VyKVwiLCBjb250YWluZXIgKS5kYXRlcGlja2VyKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjdXJyZW50IDogXCIgKyBjdXJyZW50UXVhbnRpdHksIFwiR29hbDogXCIgKyBxdWFudGl0eSwgXCJTdGFydDogXCIgKyBzdGFydCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25TZWxlY3RBdXRvY29tcGxldGVUYWcoZXZlbnQsIHVpICl7XHJcbiAgICAgICAgdmFyIHRlcm1zID0gc3BsaXQoIHRoaXMudmFsdWUgKTtcclxuICAgICAgICAvLyByZW1vdmUgdGhlIGN1cnJlbnQgaW5wdXRcclxuICAgICAgICB0ZXJtcy5wb3AoKTtcclxuICAgICAgICAvLyBhZGQgdGhlIHNlbGVjdGVkIGl0ZW1cclxuICAgICAgICBpZiAoIHRlcm1zLmluZGV4T2YodWkuaXRlbS5sYWJlbCkgPT09IC0xICkgdGVybXMucHVzaCggdWkuaXRlbS5sYWJlbCApO1xyXG4gICAgICAgIC8vIGFkZCBwbGFjZWhvbGRlciB0byBnZXQgdGhlIGNvbW1hLWFuZC1zcGFjZSBhdCB0aGUgZW5kXHJcbiAgICAgICAgdGVybXMucHVzaCggXCJcIiApO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB0ZXJtcy5qb2luKCBcIiwgXCIgKTtcclxuXHJcbiAgICAgICAgJChldmVudC50YXJnZXQpLmJsdXIoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0U2VsZWN0b3Ioc2VsZWN0b3JzKXtcclxuICAgICAgICBzZWxlY3RvcnMuZm9yRWFjaCggKHNlbGVjdG9yKSA9PiAkKFwiI2V2ZW50LVwiK3NlbGVjdG9yK1wiLXNlbGVjdG9yXCIpLnZhbChcIlwiKS5hdHRyKCdleHRlcm5hbElkJywgbnVsbCkpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjYWRkLXNwb3J0LWxheWVyXCIpLm9uKFwiY2xpY2tcIiwgYWRkU3BvcnRMYXllcik7XHJcblxyXG4gICAgJChcIi5nby10by1yaWdodHNcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBpZiAoICF2YWxpZGF0ZVN0ZXBPbmUoKSApIHJldHVybjtcclxuXHJcbiAgICAgICAgJChcIiNzdGVwMlwiKS5zaG93KCk7XHJcbiAgICAgICAgJChcIiNzdGVwMVwiKS5oaWRlKCk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGNvbmZpcm1FeGl0O1xyXG4gICAgICAgIGZ1bmN0aW9uIGNvbmZpcm1FeGl0KCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImxlYXZpbmcgcGFnZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIFwiWW91IGhhdmUgYXR0ZW1wdGVkIHRvIGxlYXZlIHRoaXMgcGFnZS4gQXJlIHlvdSBzdXJlP1wiO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZXZlbnQtY3VzdG9tRW5kLXNlbGVjdG9yLCAjZXZlbnQtY3VzdG9tU3RhcnQtc2VsZWN0b3IsICNldmVudC1hdmFpbGFiaWxpdHktc2VsZWN0b3IsICNleHBpcmF0aW9uLWRhdGUsIC5pbnN0YWxsbWVudC1kYXRlXCIpLmRhdGVwaWNrZXIoKTtcclxuXHJcbiAgICAkKCcuZmlsZS1zZWxlY3RvcicpLm9mZigpLmZvY3VzKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHZhciB0YXJnZXRJZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKFwicmVmXCIpO1xyXG4gICAgICAgICQodGhpcykuYmx1cigpO1xyXG4gICAgICAgICQoIHRhcmdldElkICkudHJpZ2dlcihcImNsaWNrXCIpO1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNldmVudC13ZWJzaXRlLXNlbGVjdG9yJykubWFzayhcIkFcIiwge1xyXG4gICAgICAgIHRyYW5zbGF0aW9uOiB7XHJcbiAgICAgICAgICAgIFwiQVwiOiB7IHBhdHRlcm46IC9bXFx3L1xcLS4rXS8sIHJlY3Vyc2l2ZTogdHJ1ZSB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2xpY2Vuc2UtZmlsZS1zZWxlY3Rvci1oaWRkZW4nKS5jaGVja0ZpbGVUeXBlKHtcclxuICAgICAgICBhbGxvd2VkRXh0ZW5zaW9uczogWyAncGRmJywgJ2RvYycsICdkb2N4J10sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJzxkaXYgLz4nKS5odG1sKCdGaWxlIHR5cGUgbm90IGFsbG93ZWQuIFBsZWFzZSB1cGxvYWQgYSAucGRmLCAuZG9jIG9yIC5kb2N4IGZpbGUnKS5kaWFsb2coKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjZXZlbnQtZmlsZS1zZWxlY3Rvci1oaWRkZW4nKS5jaGVja0ZpbGVUeXBlKHtcclxuICAgICAgICBhbGxvd2VkRXh0ZW5zaW9uczogWydqcGcnLCAnanBlZycsJ3BuZycsICdwZGYnLCAnZG9jJywgJ2RvY3gnXSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldElkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoXCJyZWZcIik7XHJcbiAgICAgICAgICAgICQoIHRhcmdldElkICkudmFsKCQodGhpcykudmFsKCkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0SWQgPSBcIiNcIiArICQodGhpcykuYXR0cihcInJlZlwiKTtcclxuICAgICAgICAgICAgJCggdGFyZ2V0SWQgKS5hdHRyKFwicGxhY2Vob2xkZXJcIiwgXCJBbGxvd2VkOiAucG5nLCAuanBnLCAucGRmLCAuZG9jLCAuZG9jeFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgICQodGhpcykudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKCc8ZGl2IC8+JykuaHRtbCgnRmlsZSB0eXBlIG5vdCBhbGxvd2VkJykuZGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI2ltYWdlLXNlbGVjdG9yLWhpZGRlbicpLmNoZWNrRmlsZVR5cGUoe1xyXG4gICAgICAgIGFsbG93ZWRFeHRlbnNpb25zOiBbJ2pwZycsICdqcGVnJywncG5nJ10sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRJZCA9IFwiI1wiICsgJCh0aGlzKS5hdHRyKFwicmVmXCIpO1xyXG4gICAgICAgICAgICAkKCB0YXJnZXRJZCApLnZhbCgkKHRoaXMpLnZhbCgpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldElkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoXCJyZWZcIik7XHJcbiAgICAgICAgICAgICQoIHRhcmdldElkICkuYXR0cihcInBsYWNlaG9sZGVyXCIsIFwiQWxsb3dlZDogLnBuZywgLmpwZ1wiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgICQodGhpcykudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKCc8ZGl2IC8+JykuaHRtbCgnRmlsZSB0eXBlIG5vdCBhbGxvd2VkJykuZGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWxscyB0aGUgc3BvcnQgc2VsZWN0b3JcclxuICAgICAqL1xyXG4gICAgQ29udGVudEFyZW5hLkFwaS5nZXRTcG9ydHMoKS5kb25lKCAoc3BvcnRzICkgPT4ge1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBzcG9ydHM7XHJcbiAgICAgICAgZmlsbFNwb3J0cyggXCIjZXZlbnQtc3BvcnQtc2VsZWN0b3JcIiwgQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzLCBDb250ZW50QXJlbmEuRGF0YS5GdWxsU3BvcnRzLCBmdW5jdGlvbiggZXZlbnQsIHVpKXtcclxuICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuc3BvcnQgPSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA6IHVpLml0ZW0ubGFiZWwsXHJcbiAgICAgICAgICAgICAgICBleHRlcm5hbElkIDp1aS5pdGVtLnZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoIENvbnRlbnRBcmVuYS5Db250ZW50LmV2ZW50VHlwZSA9PT0gXCJjdXN0b21cIikgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgJChcIiNldmVudC1zY2hlZHVsZS1zdWJpdGVtc1wiKS5odG1sKFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgcmVzZXRTZWxlY3RvcihbXCJjYXRlZ29yeVwiLCBcInRvdXJuYW1lbnRcIiwgXCJzZWFzb25cIl0pO1xyXG4gICAgICAgICAgICBmaWxsVG91cm5hbWVudHMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlsbHMgY29tcGFueSB1c2VycyB0YWdnaW5nIHRvb2xcclxuICAgICAqL1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcInYxL2ZlZWQvY29tcGFueVwiLFxyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcblxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7ZW1haWw6c3RyaW5nfX0gaXRlbVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9ICQubWFwKHJlc3BvbnNlLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtsYWJlbDogaXRlbS5lbWFpbCwgdmFsdWU6IGl0ZW0uaWR9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCggIFwiI3RhZy1tZW1iZXJzXCIgKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICAgICAgc291cmNlOiBmdW5jdGlvbiggcmVxdWVzdCwgcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVsZWdhdGUgYmFjayB0byBhdXRvY29tcGxldGUsIGJ1dCBleHRyYWN0IHRoZSBsYXN0IHRlcm1cclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSggJC51aS5hdXRvY29tcGxldGUuZmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UsIGV4dHJhY3RMYXN0KCByZXF1ZXN0LnRlcm0gKSApICk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbWluTGVuZ3RoOiAwLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0OiBvblNlbGVjdEF1dG9jb21wbGV0ZVRhZ1xyXG4gICAgICAgICAgICB9KS5mb2N1cyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoXCJzZWFyY2hcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIucGFja2FnZS1yZWFkeS1idXR0b25cIikuaGlkZSgpO1xyXG4gICAgJChcIi5jdXN0b20tdGVtcGxhdGUtaXRlbVwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnN0ZXAxLWNvbnRhaW5lclwiKS5zaG93KCk7XHJcblxyXG4gICAgQ29udGVudEFyZW5hLlRlc3QudmFsaWRhdGVTdGVwT25lID0gdmFsaWRhdGVTdGVwT25lO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2hhbmdlXCIsIFwiLnVuc2VsZWN0LW90aGVyc1wiLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmVhY2goJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5zaWJsaW5ncygpLCBmdW5jdGlvbiAoaywgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAkKGl0ZW0pLmZpbmQoXCJpbnB1dFwiKTtcclxuICAgICAgICAgICAgaWYgKCBfdGhpcyAhPT0gaXRlbSApIHtcclxuICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2hhbmdlXCIsIFwiLnNlbGVjdC1hbGxcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5lYWNoKCQodGhpcykucGFyZW50KCkucGFyZW50KCkuc2libGluZ3MoKSwgZnVuY3Rpb24gKGssIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlucHV0ID0gJChpdGVtKS5maW5kKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIik7XHJcbiAgICAgICAgICAgIGlmICggX3RoaXMgPT09IGl0ZW0gKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAoIF90aGlzLmNoZWNrZWQgKXtcclxuICAgICAgICAgICAgICAgIGlucHV0LnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjaGFuZ2VcIiwgXCIudG9nZ2xlci1jaGVja2JveFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBjb250ZXh0ID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKTtcclxuXHJcbiAgICAgICAgJCggJCh0aGlzKS5hdHRyKFwiaGlkZVwiKSArIFwiLCAub3B0aW9uYWxcIiwgY29udGV4dCApLmhpZGUoKS5maW5kKFwiaW5wdXRcIikudmFsKFwiXCIpO1xyXG5cclxuICAgICAgICAkKFwiaW5wdXQ6Y2hlY2tlZFwiLCBjb250ZXh0KS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdG9yU2hvdyA9ICQodGhpcykuYXR0cihcInNob3dcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuYXBwZW5kKCQoIHNlbGVjdG9yU2hvdywgY29udGV4dCApLnNob3coKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5jbG9zZS1ib3hcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoICQodGhpcykuYXR0cihcInJlZlwiKSApLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjaGFuZ2VcIixcIi51bnNlbGVjdC1hbGxcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAkLmVhY2goJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5zaWJsaW5ncygpLCBmdW5jdGlvbiAoaywgaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoICQoaXRlbSkuaGFzQ2xhc3MoJ2FsbC10eXBlJykgKSAkKGl0ZW0pLmZpbmQoXCJpbnB1dFwiKS5hdHRyKFwiY2hlY2tlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2hhbmdlJywgJyNjb250ZW50LWRldGFpbHMtbWV0aG9kLW1hc2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGVsID0gJChcIiNlcGlzb2Rlcy1xdWFudGl0eVwiKSxcclxuICAgICAgICAgICAgcXVhbnRpdHkgPSBOdW1iZXIoIGVsLnZhbCgpICk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tlZCl7XHJcbiAgICAgICAgICAgIGlmICggcXVhbnRpdHkgIT09IFwiXCIgKSBhZGRHZW5lcmljRXBpc29kZXMocXVhbnRpdHkpO1xyXG4gICAgICAgICAgICBlbC5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1F1YW50aXR5ID0gTnVtYmVyKCAgJCh0aGlzKS52YWwoKSApO1xyXG4gICAgICAgICAgICAgICAgYWRkR2VuZXJpY0VwaXNvZGVzKG5ld1F1YW50aXR5KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsLm9mZigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFwiLmVwaXNvZGUtYXZhaWxhYmlsaXR5XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImVwaXNvZGUtYXZhaWxhYmlsaXR5LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJlcGlzb2RlLWF2YWlsYWJpbGl0eS1zZWxlY3RlZFwiKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBcIiNkb3dubG9hZC1jc3Ytc2hlZXRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gZW52aG9zdHVybCArIFwiYnVuZGxlcy9hcHAvZGF0YS9jb250ZW50LWRldGFpbHMuY3N2XCI7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3NlbGwuc3RlcDEuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuVGVzdCA9IENvbnRlbnRBcmVuYS5UZXN0IHx8IHt9O1xyXG5cclxuICAgIHZhciBzZWxlY3RvckNvdW50ZXIgPSAwLFxyXG4gICAgICAgIG1haW5QYWNrYWdlID0gbnVsbDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZEZ1bGxQYWNrYWdlcygpIHtcclxuICAgICAgICB2YXIgbGlzdCA9IFtdO1xyXG5cclxuICAgICAgICAkKFwiLnBhY2thZ2Utc2VsZWN0b3I6Y2hlY2tlZFwiKS5lYWNoKGZ1bmN0aW9uKGssdil7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFjayA9IHtcclxuICAgICAgICAgICAgICAgIGlkIDogJCh2KS5hdHRyKFwiaWRcIikuc3BsaXQoXCItXCIpWzFdLFxyXG4gICAgICAgICAgICAgICAgbmFtZSA6ICQodikuYXR0cihcIm5hbWVcIikuc3BsaXQoXCItXCIpWzFdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsaXN0LnB1c2gocGFjayk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldEZ1bGxTZWxlY3RlZFBhY2thZ2VzKCkge1xyXG4gICAgICAgIHZhciByZXNwb25zZSA9IHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQgOiB7fSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRJZHMgOiBbXSxcclxuICAgICAgICAgICAgc2VsZWN0ZWROYW1lcyA6IFtdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJChcIi5wYWNrYWdlLXNlbGVjdG9yOmNoZWNrZWRcIikuZWFjaChmdW5jdGlvbihrLHYpe1xyXG5cclxuICAgICAgICAgICAgdmFyIGlkID0gJCh2KS5hdHRyKFwiaWRcIikuc3BsaXQoXCItXCIpWzFdLFxyXG4gICAgICAgICAgICAgICAgbmFtZSA9ICQodikuYXR0cihcIm5hbWVcIikuc3BsaXQoXCItXCIpWzFdO1xyXG5cclxuICAgICAgICAgICAgcmVzcG9uc2Uuc2VsZWN0ZWRbaWRdID0ge1xyXG4gICAgICAgICAgICAgICAgaWQgOiBpZCxcclxuICAgICAgICAgICAgICAgIG5hbWUgOiBuYW1lXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXNwb25zZS5zZWxlY3RlZElkcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgcmVzcG9uc2Uuc2VsZWN0ZWROYW1lcy5wdXNoKG5hbWUpXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXNwb25zZS5nZXRJZEJ5TmFtZSA9IGZ1bmN0aW9uKCBuYW1lICl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSWRzW3RoaXMuc2VsZWN0ZWROYW1lcy5pbmRleE9mKG5hbWUpXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb2xsZWN0U2VsZWN0ZWRSaWdodEl0ZW1zIChjb250YWluZXIpe1xyXG5cclxuICAgICAgICB2YXIgbGlzdCA9IFtdO1xyXG5cclxuICAgICAgICBjb250YWluZXIuZmluZChcImlucHV0OmNoZWNrZWQsIC5ub3Qtb3B0aW9uYWxcIikuZWFjaChmdW5jdGlvbiAoaywgZWwpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggISQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuaXMoXCI6dmlzaWJsZVwiKSApIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAkKGVsKS5hdHRyKFwiYWxsXCIpICE9PSB1bmRlZmluZWQgICkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRSaWdodCA9IG5ldyBDb250ZW50QXJlbmEuTW9kZWwuU2VsZWN0ZWRSaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgc2VsZWN0ZWRSaWdodC5yaWdodCA9ICQoZWwpLmF0dHIoXCJyaWdodC1pZFwiKTtcclxuICAgICAgICAgICAgc2VsZWN0ZWRSaWdodC5yaWdodEl0ZW0gPSAkKGVsKS5hdHRyKFwicmlnaHQtaXRlbS1pZFwiKTtcclxuICAgICAgICAgICAgc2VsZWN0ZWRSaWdodC5ncm91cCA9ICQoZWwpLmRhdGEoXCJncm91cFwiKTtcclxuXHJcbiAgICAgICAgICAgICQoZWwpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCJpbnB1dDpub3QoW3R5cGU9J2NoZWNrYm94J10pOm5vdCguY2hvc2VuLXNlYXJjaC1pbnB1dCksIHRleHRhcmVhLCBzZWxlY3RcIikuZWFjaChmdW5jdGlvbiAoa2V5LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFJpZ2h0LmlucHV0cy5wdXNoKCAkKGVsZW1lbnQpLnZhbCgpICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGlzdC5wdXNoKHNlbGVjdGVkUmlnaHQpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29sbGVjdFNlbGVjdGVkUmlnaHRzKCl7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkUmlnaHRzPSBbXSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRQYWNrYWdlcyA9IGdldFNlbGVjdGVkRnVsbFBhY2thZ2VzKCksXHJcbiAgICAgICAgICAgIG11bHRpcGxlID0gJChcIiNtYWluLW11bHRpcGxlLXBhY2thZ2VcIiksXHJcbiAgICAgICAgICAgIHNpbmdsZSA9ICQoXCIjbWFpbi1zaW5nbGUtcGFja2FnZVwiKTtcclxuXHJcbiAgICAgICAgaWYgKCBtdWx0aXBsZS5pcyhcIjp2aXNpYmxlXCIpICl7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmlnaHRzID0gc2VsZWN0ZWRSaWdodHMuY29uY2F0KCBjb2xsZWN0U2VsZWN0ZWRSaWdodEl0ZW1zKG11bHRpcGxlKSApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBzaW5nbGUuaXMoXCI6dmlzaWJsZVwiKSApe1xyXG4gICAgICAgICAgICBzZWxlY3RlZFJpZ2h0cyA9IHNlbGVjdGVkUmlnaHRzLmNvbmNhdCggY29sbGVjdFNlbGVjdGVkUmlnaHRJdGVtcyhzaW5nbGUpICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHNlbGVjdGVkUGFja2FnZXMubGVuZ3RoID4gMSApe1xyXG4gICAgICAgICAgICBzZWxlY3RlZFBhY2thZ2VzLmZvckVhY2goZnVuY3Rpb24gKHBhY2spIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUmlnaHRzID0gc2VsZWN0ZWRSaWdodHMuY29uY2F0KCBjb2xsZWN0U2VsZWN0ZWRSaWdodEl0ZW1zKCAkKFwiI3NlbGwtYm94LXBhY2thZ2UtXCIgKyBwYWNrLmlkICkpICk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiLnByb2R1Y3Rpb24tc3RhbmRhcmRzOnZpc2libGVcIikuZWFjaChmdW5jdGlvbihrLCBlbCl7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmlnaHRzID0gc2VsZWN0ZWRSaWdodHMuY29uY2F0KCBjb2xsZWN0U2VsZWN0ZWRSaWdodEl0ZW1zKCAkKGVsKSApICk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZFJpZ2h0cztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVTYWxlc1BhY2thZ2VzKCl7XHJcblxyXG4gICAgICAgIHZhciBwYWNrYWdlcyA9IFtdO1xyXG5cclxuICAgICAgICAkKFwiLnNhbGVzLXBhY2thZ2VcIikuZWFjaChmdW5jdGlvbihrLCBwYWNrYWdlQ29udGFpbmVyKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBzYWxlc1BhY2thZ2UgPSBuZXcgQ29udGVudEFyZW5hLk1vZGVsLlNhbGVzUGFja2FnZSgpO1xyXG4gICAgICAgICAgICB2YXIgaWQgPSAkKHBhY2thZ2VDb250YWluZXIpLmF0dHIoXCJpZFwiKS5yZXBsYWNlKFwic2FsZXMtcGFja2FnZS1cIixcIlwiKTtcclxuXHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS50ZXJyaXRvcmllcyA9ICQoXCIudGVycml0b3JpZXM6Y2hlY2tlZFwiLCBwYWNrYWdlQ29udGFpbmVyKS5hdHRyKFwidmFsXCIpO1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2Uuc2FsZXNNZXRob2QgPSAkKFwiLnNhbGVzLW1ldGhvZDpjaGVja2VkXCIsIHBhY2thZ2VDb250YWluZXIpLmF0dHIoXCJ2YWxcIik7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS5jdXJyZW5jeSA9ICQoXCIuY3VycmVuY3k6Y2hlY2tlZFwiLCBwYWNrYWdlQ29udGFpbmVyKS5hdHRyKFwidmFsXCIpO1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2UuaWQgPSBpZDtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLm5hbWUgPSAkKFwiI3NhbGVzLXBhY2thZ2UtXCIgKyBpZCArXCItbmFtZVwiKS52YWwoKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLmZlZSA9ICQoXCIuZmVlOnZpc2libGVcIiwgcGFja2FnZUNvbnRhaW5lcikudmFsKCk7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS50ZXJyaXRvcnlCaWRzID0gJChcIiNzYWxlcy1wYWNrYWdlLVwiICsgaWQgK1wiLXRlcnJpdG9yeS1iaWRzXCIpLmlzKFwiOmNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS50ZXJyaXRvcnlBc1BhY2thZ2UgPSAkKFwiI3NhbGVzLXBhY2thZ2UtXCIgKyBpZCArXCItdGVycml0b3JpZXMtYXMtcGFja2FnZVwiKS5pcyhcIjpjaGVja2VkXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBzYWxlc1BhY2thZ2UudGVycml0b3JpZXMgPT09IFwic2VsZWN0ZWRcIikgc2FsZXNQYWNrYWdlLnNlbGVjdGVkVGVycml0b3JpZXMgPSAkKFwiI3NhbGVzLXBhY2thZ2UtXCIgKyBpZCArXCItdGVycml0b3J5LXNlbGVjdGVkXCIpLmNob3NlbigpLnZhbCgpO1xyXG4gICAgICAgICAgICBpZiAoIHNhbGVzUGFja2FnZS50ZXJyaXRvcmllcyA9PT0gXCJleGNsdWRlZFwiKSBzYWxlc1BhY2thZ2UuZXhjbHVkZWRUZXJyaXRvcmllcyA9ICQoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICtcIi10ZXJyaXRvcnktZXhjbHVkZWRcIikuY2hvc2VuKCkudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBwYWNrYWdlcy5wdXNoKHNhbGVzUGFja2FnZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwYWNrYWdlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZVN0ZXBUd28oKXtcclxuXHJcbiAgICAgICAgdmFyIGhhc0Vycm9ycyA9IGZhbHNlLFxyXG4gICAgICAgICAgICBtZXNzYWdlcyA9IFtdLFxyXG4gICAgICAgICAgICBleHBpcmF0aW9uRGF0ZSA9ICQoXCIjZXhwaXJhdGlvbi1kYXRlXCIpLFxyXG4gICAgICAgICAgICByaWdodHMgPSBjb2xsZWN0U2VsZWN0ZWRSaWdodHMoKSxcclxuICAgICAgICAgICAgbWVzc2FnZXNDb250YWluZXIgPSAkKCc8ZGl2IHRpdGxlPVwiVGhlIGZvcm0gaXMgaW5jb21wbGV0ZSFcIiAvPicpLFxyXG4gICAgICAgICAgICB0b3RhbCA9IDAsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkUGFja2FnZXMgPSBnZXRGdWxsU2VsZWN0ZWRQYWNrYWdlcygpO1xyXG5cclxuICAgICAgICAkKFwiLmluc3RhbGxtZW50LXBlcmNlbnRcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0b3RhbCArPSBOdW1iZXIgKCAkKHRoaXMpLnZhbCgpLnJlcGxhY2UoXCIlXCIsIFwiXCIpIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCB0b3RhbCAhPT0gMTAwICkge1xyXG4gICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKCAkKCc8ZGl2IGNsYXNzPVwicG9wdXAtZXJyb3ItbWVzc2FnZVwiIC8+JykuaHRtbCgnVG90YWwgaW5zdGFsbG1lbnRzIG11c3Qgc3VtIDEwMCUhJykgKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuaW5zdGFsbG1lbnRzID0gY29sbGVjdEluc3RhbGxtZW50cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuc2FsZXNQYWNrYWdlcyA9IHZhbGlkYXRlU2FsZXNQYWNrYWdlcygpO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LnNhbGVzUGFja2FnZXMuZm9yRWFjaChmdW5jdGlvbihzYWxlc1BhY2thZ2Upe1xyXG4gICAgICAgICAgICB2YXIgdmFsaWQgPSBzYWxlc1BhY2thZ2UudmFsaWRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICggdmFsaWQuaGFzRXJyb3JzICl7XHJcbiAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaCggJCgnPGRpdiBjbGFzcz1cInBvcHVwLWVycm9yLW1lc3NhZ2VcIiAvPicpLmh0bWwodmFsaWQuZGVzY3JpcHRpb24pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5yaWdodHMgPSByaWdodHM7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQucGFja2FnZXMgPSBzZWxlY3RlZFBhY2thZ2VzLnNlbGVjdGVkSWRzO1xyXG5cclxuICAgICAgICBpZiAoIGV4cGlyYXRpb25EYXRlLnZhbCgpID09PSBcIlwiICl7XHJcbiAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goICQoJzxkaXYgY2xhc3M9XCJwb3B1cC1lcnJvci1tZXNzYWdlXCIgLz4nKS5odG1sKCdQbGVhc2Ugc2VsZWN0IGFuIGV4cGlyYXRpb24gZGF0ZScpICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuZXhwaXJlc0F0ID0gIGV4cGlyYXRpb25EYXRlLnZhbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCBoYXNFcnJvcnMgKXtcclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLmZvckVhY2goKGNvbnRlbnQpPT57XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlc0NvbnRhaW5lci5hcHBlbmQoY29udGVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbWVzc2FnZXNDb250YWluZXIuZGlhbG9nKHtcclxuICAgICAgICAgICAgICAgIG1pbldpZHRoOiA0MDBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gIWhhc0Vycm9ycztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU2FsZXNQYWNrYWdlKCl7XHJcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gJC50ZW1wbGF0ZXMoXCIjc2FsZXMtcGFja2FnZS10ZW1wbGF0ZVwiKSxcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlcyA9ICQoXCIuc2FsZXMtcGFja2FnZVwiKSxcclxuICAgICAgICAgICAgaWQgPSBzYWxlc1BhY2thZ2VzLmxlbmd0aCArIDEsXHJcbiAgICAgICAgICAgIGh0bWxPdXRwdXQgPSB0ZW1wbGF0ZS5yZW5kZXIoe2lkOiBpZCB9KTtcclxuXHJcbiAgICAgICAgaWYgKCBpZCA9PT0gMSApe1xyXG4gICAgICAgICAgICAkKFwiLnJpZ2h0cy1saXN0XCIpLmxhc3QoKS5hZnRlcihodG1sT3V0cHV0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2VzLmxhc3QoKS5hZnRlcihodG1sT3V0cHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoXCIucHJpY2Utb3B0aW9uYWxcIiwgXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkKS5oaWRlKCk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLlV0aWxzLmFkZFJlZ2lvbkJlaGF2aW91cihcIiNzYWxlcy1wYWNrYWdlLVwiICsgaWQgKyBcIiAuaGFzLXJlZ2lvbi1zZWxlY3RvclwiKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypmdW5jdGlvbiBhZGREaXN0cmlidXRpb25QYWNrYWdlcyggbmFtZSApe1xyXG5cclxuICAgICAgICB2YXIgZGlzdHJpYnV0aW9uUGFja2FnZSA9ICQoXCIucHJvZHVjdGlvbi1zdGFuZGFyZHNcIiwgXCIjYm94LXRlbXBsYXRlc1wiKS5jbG9uZSgpLFxyXG4gICAgICAgICAgICB0ZWNobmljYWxEZWxpdmVyeSA9ICQoXCIudGVjaG5pY2FsLWRlbGl2ZXJ5XCIsIFwiI2JveC10ZW1wbGF0ZXNcIikuY2xvbmUoKSxcclxuICAgICAgICAgICAgZGlzdHJpYnV0aW9uUGFja2FnZVRpdGxlID0gZGlzdHJpYnV0aW9uUGFja2FnZS5maW5kKFwiLmJveC10aXRsZVwiKSxcclxuICAgICAgICAgICAgdGVjaG5pY2FsRGVsaXZlcnlUaXRsZSA9IHRlY2huaWNhbERlbGl2ZXJ5LmZpbmQoXCIuYm94LXRpdGxlXCIpLFxyXG4gICAgICAgICAgICB0aXRsZSA9IG5hbWUucmVwbGFjZShcIi1cIiwgXCIgLSBcIiksXHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gJC50ZW1wbGF0ZXMoXCIjY29udGVudC1kZXRhaWxzLXRlbXBsYXRlXCIpLFxyXG4gICAgICAgICAgICBlcGlzb2RlVGVtcGxhdGUgPSAkLnRlbXBsYXRlcyhcIiNlcGlzb2RlLXRlbXBsYXRlXCIpO1xyXG5cclxuICAgICAgICAkKFwiW2dyb3VwPSdQcm9kdWN0aW9uIHN0YW5kYXJkcyddXCIsIFwiLnJpZ2h0cy1saXN0XCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHRlc3QgPSAkKHRoaXMpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGRpc3RyaWJ1dGlvblBhY2thZ2UuZmluZChcIi5zZWxsZXItYm94LWNvbnRlbnRcIikuYXBwZW5kKHRlc3QpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiW2dyb3VwPSdUZWNobmljYWwgZGVsaXZlcnknXVwiLCBcIi5yaWdodHMtbGlzdFwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0ID0gJCh0aGlzKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0ZWNobmljYWxEZWxpdmVyeS5maW5kKFwiLnNlbGxlci1ib3gtY29udGVudFwiKS5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRpc3RyaWJ1dGlvblBhY2thZ2UuYXR0cihcImlkXCIsXCJkaXN0cmlidXRpb24tcGFja2FnZS1cIiArIG5hbWUpLnNob3coKS5pbnNlcnRCZWZvcmUoXCIucmlnaHRzLWxpc3RcIik7XHJcbiAgICAgICAgdGVjaG5pY2FsRGVsaXZlcnkuYXR0cihcImlkXCIsXCJ0ZWNobmljYWwtZGVsaXZlcnktXCIgKyBuYW1lKS5zaG93KCkuaW5zZXJ0QWZ0ZXIoZGlzdHJpYnV0aW9uUGFja2FnZSk7XHJcbiAgICAgICAgZGlzdHJpYnV0aW9uUGFja2FnZVRpdGxlLmh0bWwoXCJEaXN0cmlidXRpb24gcGFja2FnZSAtIFwiICsgZGlzdHJpYnV0aW9uUGFja2FnZVRpdGxlLmh0bWwoKSArIFwiIC1cIiAgKyB0aXRsZSk7XHJcbiAgICAgICAgdGVjaG5pY2FsRGVsaXZlcnlUaXRsZS5odG1sKHRlY2huaWNhbERlbGl2ZXJ5VGl0bGUuaHRtbCgpICsgXCIgLSBcIiArIHRpdGxlKTtcclxuXHJcbiAgICAgICAgJChcIi5vcHRpb25hbFwiLHRlY2huaWNhbERlbGl2ZXJ5KS5oaWRlKCk7XHJcblxyXG4gICAgICAgICQoXCIub3B0aW9uYWxcIixkaXN0cmlidXRpb25QYWNrYWdlKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICQoXCJsYWJlbFwiLCBkaXN0cmlidXRpb25QYWNrYWdlICkuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJmb3JcIiwgXCJkaXN0cmlidXRpb24tcGFja2FnZS1cIiArIG5hbWUgKyBcIi1cIiArICQodGhpcykuYXR0cihcImZvclwiKSApXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCJpbnB1dCwgc2VsZWN0XCIsIGRpc3RyaWJ1dGlvblBhY2thZ2UgKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImlkXCIsIFwiZGlzdHJpYnV0aW9uLXBhY2thZ2UtXCIgKyBuYW1lICsgXCItXCIgKyAkKHRoaXMpLmF0dHIoXCJpZFwiKSApXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCJsYWJlbFwiLCB0ZWNobmljYWxEZWxpdmVyeSApLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZm9yXCIsIFwidGVjaG5pY2FsLWRlbGl2ZXJ5LVwiICsgbmFtZSArIFwiLVwiICsgJCh0aGlzKS5hdHRyKFwiZm9yXCIpIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcImlucHV0LCBzZWxlY3RcIiwgdGVjaG5pY2FsRGVsaXZlcnkgKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykuYXR0cihcImlkXCIsIFwidGVjaG5pY2FsLWRlbGl2ZXJ5LVwiICsgbmFtZSArIFwiLVwiICsgJCh0aGlzKS5hdHRyKFwiaWRcIikgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuTGFuZ3VhZ2VzLmFkZExhbmd1YWdlQmVoYXZpb3VyKFwiI2Rpc3RyaWJ1dGlvbi1wYWNrYWdlLVwiICsgbmFtZSArIFwiIC5oYXMtbGFuZ3VhZ2UtdHJpZ2dlclwiKTtcclxuXHJcbiAgICAgICAgaWYoIG5hbWUgPT09IFwiUHJvZ3JhbVwiICl7XHJcbiAgICAgICAgICAgIHRlY2huaWNhbERlbGl2ZXJ5LmZpbmQoXCIuc2VsbGVyLWJveC1jb250ZW50XCIpLmFwcGVuZCh0ZW1wbGF0ZS5yZW5kZXIoKSk7XHJcbiAgICAgICAgICAgICQoXCIjdXBsb2FkLWNvbnRlbnQtY3N2XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgJCgnI2Nzdi1zZWxlY3Rvci1oaWRkZW4nKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZihDb250ZW50QXJlbmEuVXRpbHMuaXNBUElBdmFpbGFibGUoKSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2Nzdi1zZWxlY3Rvci1oaWRkZW4nKS5iaW5kKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVzID0gZXZ0LnRhcmdldC5maWxlczsgLy8gRmlsZUxpc3Qgb2JqZWN0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBmaWxlc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2NvbnRlbnQtZGV0YWlscy1tYXNrJykuaHRtbChcIlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLyEqKlxyXG4gICAgICAgICAgICAgICAgICAgICAqXHJcbiAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIHt7IHRhcmdldDp7fSB9fSBldmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAqIS9cclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3N2ID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSAkLmNzdi50b0FycmF5cyhjc3YpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3csIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGluZGV4ID4gMCApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNjb250ZW50LWRldGFpbHMtbWFzaycpLmFwcGVuZChlcGlzb2RlVGVtcGxhdGUucmVuZGVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXBpc29kZTogcm93WzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2VwaXNvZGVzLXF1YW50aXR5XCIpLnZhbChkYXRhLmxlbmd0aCAtIDEpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCl7IGFsZXJ0KCdVbmFibGUgdG8gcmVhZCAnICsgZmlsZS5maWxlTmFtZSk7IH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRpc3RyaWJ1dGlvblBhY2thZ2U7XHJcblxyXG4gICAgfSovXHJcblxyXG4gICAgLypmdW5jdGlvbiBhZGRFeHRyYURpc3RyaWJ1dGlvblBhY2thZ2UoIGRpc3RyaWJ1dGlvblBhY2thZ2Upe1xyXG5cclxuICAgICAgICB2YXIgc2VsZWN0b3JzID0gW10sXHJcbiAgICAgICAgICAgIHBhY2thZ2VzID0gZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXMoKSxcclxuICAgICAgICAgICAgaGlnaGxpZ2h0cyA9IHBhY2thZ2VzLnNlbGVjdGVkTmFtZXMuaW5kZXhPZihcIkhpZ2hsaWdodHNcIikgIT09IC0xLFxyXG4gICAgICAgICAgICBjbGlwcyA9IHBhY2thZ2VzLnNlbGVjdGVkTmFtZXMuaW5kZXhPZihcIkNsaXBzXCIpICE9PSAtMSxcclxuICAgICAgICAgICAgbmV3cyA9IHBhY2thZ2VzLnNlbGVjdGVkTmFtZXMuaW5kZXhPZihcIk5ld3MgYWNjZXNzXCIpICE9PSAtMTtcclxuXHJcbiAgICAgICAgZGlzdHJpYnV0aW9uUGFja2FnZS5maW5kKFwiLnNlbGxlci1ib3gtY29udGVudFwiKS5hcHBlbmQoICQoXCIuZXh0cmEtZGlzdHJpYnV0aW9uLXBhY2thZ2VzXCIpLmNsb25lKCkuc2hvdygpKTtcclxuXHJcbiAgICAgICAgaWYgKGhpZ2hsaWdodHMgKSBzZWxlY3RvcnMucHVzaChcIi5leHRyYS1wYWNrYWdlLWhpZ2hsaWdodFwiICk7XHJcbiAgICAgICAgaWYgKGNsaXBzICkgc2VsZWN0b3JzLnB1c2goXCIuZXh0cmEtcGFja2FnZS1jbGlwc1wiICk7XHJcbiAgICAgICAgaWYgKG5ld3MgKSBzZWxlY3RvcnMucHVzaChcIi5leHRyYS1wYWNrYWdlLW5ld3NcIiApO1xyXG4gICAgICAgIGlmIChoaWdobGlnaHRzICYmIGNsaXBzICkgc2VsZWN0b3JzLnB1c2goXCIuZXh0cmEtcGFja2FnZS1oaWdobGlnaHQtY2xpcHNcIiApO1xyXG4gICAgICAgIGlmIChoaWdobGlnaHRzICYmIG5ld3MgKSBzZWxlY3RvcnMucHVzaChcIi5leHRyYS1wYWNrYWdlLWhpZ2hsaWdodC1uZXdzXCIgKTtcclxuICAgICAgICBpZiAoY2xpcHMgJiYgbmV3cyApIHNlbGVjdG9ycy5wdXNoKFwiLmV4dHJhLXBhY2thZ2UtY2xpcHMtbmV3c1wiICk7XHJcbiAgICAgICAgaWYgKGhpZ2hsaWdodHMgJiYgbmV3cyAmJiBjbGlwcyApIHNlbGVjdG9ycy5wdXNoKFwiLmV4dHJhLXBhY2thZ2UtaGlnaGxpZ2h0LWNsaXBzLW5ld3NcIiApO1xyXG5cclxuICAgICAgICAkKHNlbGVjdG9ycy5qb2luKFwiLCBcIiksIGRpc3RyaWJ1dGlvblBhY2thZ2UpLnNob3coKTtcclxuXHJcbiAgICAgICAgJChcIi5kaXN0cmlidXRpb24tcGFja2FnZS1zZWxlY3RvclwiLCBkaXN0cmlidXRpb25QYWNrYWdlKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSAkKHRoaXMpLnZhbCgpLnNwbGl0KFwiLCBcIik7XHJcblxyXG4gICAgICAgICAgICAkKFwiLnRlY2huaWNhbC1kZWxpdmVyeTp2aXNpYmxlOm5vdCgjdGVjaG5pY2FsLWRlbGl2ZXJ5LU1haW4pXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnByb2R1Y3Rpb24tc3RhbmRhcmRzOnZpc2libGU6bm90KCNkaXN0cmlidXRpb24tcGFja2FnZS1NYWluKVwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGFkZERpc3RyaWJ1dGlvblBhY2thZ2VzKCB2YWx1ZXMuam9pbihcIi1cIikgKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0qL1xyXG5cclxuICAgIC8qZnVuY3Rpb24gY2hlY2tTZWxlY3RlZFBhY2thZ2VzKCkge1xyXG5cclxuICAgICAgICB2YXIgZnVsbFBhY2thZ2VzRGF0YSA9IGdldEZ1bGxTZWxlY3RlZFBhY2thZ2VzKCksXHJcbiAgICAgICAgICAgIHBhY2thZ2VzID0gZnVsbFBhY2thZ2VzRGF0YS5zZWxlY3RlZElkcyxcclxuICAgICAgICAgICAgcGFja2FnZXNOYW1lID0gZnVsbFBhY2thZ2VzRGF0YS5zZWxlY3RlZE5hbWVzLFxyXG4gICAgICAgICAgICBtYWluSXRlbXMgPSBbXSxcclxuICAgICAgICAgICAgc2luZ2xlSXRlbXMgPSBbXSxcclxuICAgICAgICAgICAgZGlzdHJpYnV0aW9uUGFja2FnZSxcclxuICAgICAgICAgICAgbXVsdGlQYWNrYWdlID0gKCBwYWNrYWdlcy5sZW5ndGggPiAxKSxcclxuICAgICAgICAgICAgbWFpblRhcmdldCA9IChtdWx0aVBhY2thZ2UpID8gJChcIiNtYWluLW11bHRpcGxlLXBhY2thZ2VcIikgOiAkKFwiI21haW4tc2luZ2xlLXBhY2thZ2VcIik7XHJcblxyXG5cclxuICAgICAgICAkLmVhY2goJChcIi5zZWxsZXItYm94LWNvbnRlbnRcIiksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuY2hpbGRyZW4oKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5jaGlsZHJlbigpLmZpcnN0KCkuY3NzKFwiZGlzcGxheVwiKSA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLnNlbGVjdC1ib3gtaXRlbS1jb250YWluZXJcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucmlnaHRzLWNvbnRhaW5lclwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5yaWdodHMtY29udGFpbmVyOm5vdCgudGVjaG5pY2FsLWRlbGl2ZXJ5KSAuc2VsbGVyLWJveC1jb250ZW50XCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgJChcIi5wcm9kdWN0aW9uLXN0YW5kYXJkc1wiLCBcIiNzdGVwMlwiKS5yZW1vdmUoKTtcclxuICAgICAgICAkKFwiLnRlY2huaWNhbC1kZWxpdmVyeVwiLCBcIiNzdGVwMlwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgJC5lYWNoKHBhY2thZ2VzLCBmdW5jdGlvbihrLCB2KXtcclxuXHJcbiAgICAgICAgICAgIHNpbmdsZUl0ZW1zLnB1c2goXCIuaGFzLXBhY2thZ2UtXCIrditcIjpub3QoLmlzLWNvbGxlY3RpdmVseSlbZ3JvdXA9J01haW4gSW5mb3JtYXRpb24nXVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICggbXVsdGlQYWNrYWdlICl7XHJcbiAgICAgICAgICAgICAgICBtYWluSXRlbXMucHVzaChcIi5oYXMtcGFja2FnZS1cIit2K1wiLmlzLWNvbGxlY3RpdmVseVtncm91cD0nTWFpbiBJbmZvcm1hdGlvbiddXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5oYXMtcGFja2FnZS1cIit2K1wiOm5vdCguaXMtY29sbGVjdGl2ZWx5KVtncm91cD0nTWFpbiBJbmZvcm1hdGlvbiddXCIsIFwiLnJpZ2h0cy1saXN0XCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVzdCA9ICQodGhpcykuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3NlbGwtYm94LXBhY2thZ2UtXCIrIHYgK1wiIC5zZWxsZXItYm94LWNvbnRlbnRcIikuYXBwZW5kKHRlc3QpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiNzZWxsLWJveC1wYWNrYWdlLVwiKyB2ICkuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFpbkl0ZW1zLnB1c2goXCIuaGFzLXBhY2thZ2UtXCIrditcIltncm91cD0nTWFpbiBJbmZvcm1hdGlvbiddXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKFwiLmhhcy1wYWNrYWdlLVwiICsgdikuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgJChcImxhYmVsXCIsIFwiI3NlbGwtYm94LXBhY2thZ2UtXCIgKyB2ICkuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZm9yXCIsIFwicGFja2FnZS1cIiArIHYgKyBcIi1cIiArICQodGhpcykuYXR0cihcImZvclwiKSApXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcImlucHV0XCIsIFwiI3NlbGwtYm94LXBhY2thZ2UtXCIgKyB2ICkuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiaWRcIiwgXCJwYWNrYWdlLVwiICsgdiArIFwiLVwiICsgJCh0aGlzKS5hdHRyKFwiaWRcIikgKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCJzZWxlY3RcIiwgXCIjc2VsbC1ib3gtcGFja2FnZS1cIiArIHYgKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJpZFwiLCBcInBhY2thZ2UtXCIgKyB2ICsgXCItXCIgKyAkKHRoaXMpLmF0dHIoXCJpZFwiKSApXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgQ29udGVudEFyZW5hLkxhbmd1YWdlcy5hZGRMYW5ndWFnZUJlaGF2aW91ciggXCIjc2VsbC1ib3gtcGFja2FnZS1cIiArIHYgK1wiIC5oYXMtbGFuZ3VhZ2UtdHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgJCggXCIjc2VsbC1ib3gtcGFja2FnZS1cIiArIHYgK1wiIC5oYXMtY2FsZW5kYXJcIikuZWFjaChmdW5jdGlvbiAoaywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIiArICQoZWxlbWVudCkuYXR0cihcImlkXCIpKS5kYXRlcGlja2VyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIi5vcHRpb25hbFwiLCBcIiNzZWxsLWJveC1wYWNrYWdlLVwiICsgdiApLmhpZGUoKTtcclxuXHJcbiAgICAgICAgfSkgO1xyXG5cclxuICAgICAgICAkKG1haW5JdGVtcy5qb2luKFwiLFwiKSwgXCIucmlnaHRzLWxpc3RcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgdGVzdCA9ICQodGhpcykuY2xvbmUoKTtcclxuICAgICAgICAgICAgbWFpblRhcmdldC5maW5kKFwiLnNlbGxlci1ib3gtY29udGVudFwiKS5hcHBlbmQodGVzdCk7XHJcbiAgICAgICAgICAgIG1haW5UYXJnZXQuc2hvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIHBhY2thZ2VzTmFtZS5pbmRleE9mKFwiUHJvZ3JhbVwiKSA9PT0gLTEgfHwgcGFja2FnZXNOYW1lLmxlbmd0aCA+IDEgKXtcclxuICAgICAgICAgICAgZGlzdHJpYnV0aW9uUGFja2FnZSA9IGFkZERpc3RyaWJ1dGlvblBhY2thZ2VzKCBcIk1haW5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHBhY2thZ2VzTmFtZS5sZW5ndGggPiAxXHJcbiAgICAgICAgICAgICYmICggcGFja2FnZXNOYW1lLmluZGV4T2YoXCJDbGlwc1wiKSAhPT0gLTFcclxuICAgICAgICAgICAgICAgIHx8IHBhY2thZ2VzTmFtZS5pbmRleE9mKFwiSGlnaGxpZ2h0c1wiKSAhPT0gLTFcclxuICAgICAgICAgICAgICAgIHx8IHBhY2thZ2VzTmFtZS5pbmRleE9mKFwiTmV3cyBhY2Nlc3NcIikgIT09IC0xXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApe1xyXG4gICAgICAgICAgICBhZGRFeHRyYURpc3RyaWJ1dGlvblBhY2thZ2UoZGlzdHJpYnV0aW9uUGFja2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIHBhY2thZ2VzTmFtZS5pbmRleE9mKFwiUHJvZ3JhbVwiKSAhPT0gLTEgKXtcclxuICAgICAgICAgICAgYWRkRGlzdHJpYnV0aW9uUGFja2FnZXMoIFwiUHJvZ3JhbVwiICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKFwiI21haW4tc2VsbC1ib3hcIikuc2hvdygpO1xyXG4gICAgICAgICQoXCIjcHJpY2Utc2VsbC1ib3hcIikuc2hvdygpO1xyXG4gICAgICAgICQoXCIucGFja2FnZS1yZWFkeS1idXR0b25cIikuc2hvdygpO1xyXG4gICAgICAgICQoXCIjcHJpY2Utc2VsbC1ib3ggLnNlbGVjdC1ib3gtaXRlbS1jb250YWluZXJcIikuc2hvdygpO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5MYW5ndWFnZXMuYWRkTGFuZ3VhZ2VCZWhhdmlvdXIoIG1haW5UYXJnZXQuZmluZChcIi5oYXMtbGFuZ3VhZ2UtdHJpZ2dlclwiKSApO1xyXG4gICAgICAgIG1haW5UYXJnZXQuZmluZChcIi5oYXMtY2FsZW5kYXJcIikuZWFjaChmdW5jdGlvbiAoaywgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAkKFwiI1wiICsgJChlbGVtZW50KS5hdHRyKFwiaWRcIikpLmRhdGVwaWNrZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBtYWluVGFyZ2V0LmZpbmQoXCIub3B0aW9uYWxcIikuaGlkZSgpO1xyXG5cclxuICAgIH0qL1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldHVwSW5zdGFsbG1lbnQoKXtcclxuICAgICAgICAkKFwiLmluc3RhbGxtZW50LXBlcmNlbnRcIikub2ZmKCkubWFzaygnMDAwJScsIHtyZXZlcnNlOiB0cnVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29sbGVjdEluc3RhbGxtZW50cygpe1xyXG5cclxuICAgICAgICB2YXIgaW5zdGFsbG1lbnRzID0gW107XHJcblxyXG4gICAgICAgICQoXCIuaW5zdGFsbG1lbnRcIikuZWFjaChmdW5jdGlvbihrLCBwYWNrYWdlQ29udGFpbmVyKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBpbnN0YWxsbWVudCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgaW5zdGFsbG1lbnQucGVyY2VudCA9ICQoXCIuaW5zdGFsbG1lbnQtcGVyY2VudFwiLCBwYWNrYWdlQ29udGFpbmVyKS52YWwoKS5yZXBsYWNlKFwiJVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgaW5zdGFsbG1lbnQuZGF0ZSA9ICQoXCIuaW5zdGFsbG1lbnQtZGF0ZVwiLCBwYWNrYWdlQ29udGFpbmVyKS52YWwoKTtcclxuICAgICAgICAgICAgaW5zdGFsbG1lbnQuc2lnbmluZ19kYXkgPSAkKFwiLmluc3RhbGxtZW50LWRheXNcIiwgcGFja2FnZUNvbnRhaW5lcikudmFsKCk7XHJcbiAgICAgICAgICAgIGluc3RhbGxtZW50LmdyYW50ZWRfZGF5ID0gJChcIi5ncmFudGVkLWRheXNcIikudmFsKCk7XHJcblxyXG4gICAgICAgICAgICBpbnN0YWxsbWVudHMucHVzaChpbnN0YWxsbWVudCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpbnN0YWxsbWVudHM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3VibWl0Zm9ybSgpIHtcclxuICAgICAgICB2YXIgdXJsID0gZW52aG9zdHVybCArICdzZWxsL3B1Ymxpc2hlZCcsXHJcbiAgICAgICAgICAgIGZvcm0gPSAkKCcjbXlmb3JtJyk7XHJcblxyXG4gICAgICAgIGZvcm0uYXR0cignYWN0aW9uJywgdXJsKTtcclxuXHJcbiAgICAgICAgdmFyIGRhdGEgPSBKU09OLnN0cmluZ2lmeShDb250ZW50QXJlbmEuQ29udGVudCk7XHJcblxyXG4gICAgICAgICQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImpzb25cIi8+JykudmFsKGRhdGEpLmFwcGVuZFRvKCcjbXlmb3JtJyk7XHJcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKCkge307XHJcbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI3VwbG9hZC1hZ3JlZW1lbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgJCgnI2xpY2Vuc2UtZmlsZS1zZWxlY3Rvci1oaWRkZW4nKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3N1Ym1pdC1saXN0aW5nXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgaWYgKCAhdmFsaWRhdGVTdGVwVHdvKCkgKSByZXR1cm47XHJcblxyXG4gICAgICAgIHN1Ym1pdGZvcm0oKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjdmlldy1hZ3JlZW1lbnRcIikub24oJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhbGlkYXRlU3RlcFR3bygpO1xyXG4gICAgICAgICQoXCIjdmlldy1hZ3JlZW1lbnRcIikuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIikuYXBwZW5kKCc8aSBjbGFzcz1cImZhIGZhLWNvZyBmYS1zcGluXCI+Jyk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsIDogZW52aG9zdHVybCArICd2MS9jb250cmFjdC9wcmV2aWV3cycsXHJcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgICAgIGpzb24gOiBKU09OLnN0cmluZ2lmeShDb250ZW50QXJlbmEuQ29udGVudClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKCByZXNwb25zZSApe1xyXG4gICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuaWQgPSByZXNwb25zZS5pZDtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGVudmhvc3R1cmwgKyAnY29udHJhY3QvcHJldmlldz9pZD0nKyByZXNwb25zZS5pZCwgXCJfYmxhbmtcIiwnaGVpZ2h0PTYwMCx3aWR0aD04MDAnKTtcclxuICAgICAgICAgICAgICAgICQoXCIjdmlldy1hZ3JlZW1lbnRcIikuYXR0cihcImRpc2FibGVkXCIsIG51bGwpLmZpbmQoJ2knKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNhZGQtaW5zdGFsbG1lbnRcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBpZigkKFwiLmluc3RhbGxtZW50OmZpcnN0IGlucHV0Lmluc3RhbGxtZW50LXBlcmNlbnRcIikudmFsKCk9PScxMDAlJyl7XHJcbiAgICAgICAgICAgICQoXCIuaW5zdGFsbG1lbnQ6Zmlyc3QgaW5wdXQuaW5zdGFsbG1lbnQtcGVyY2VudFwiKS52YWwoJycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHBvcyA9ICQoXCIuaW5zdGFsbG1lbnRcIikubGVuZ3RoICsgMSxcclxuICAgICAgICAgICAgaXRlbSA9ICQoXCIuaW5zdGFsbG1lbnQ6bGFzdFwiKS5jbG9uZSgpO1xyXG5cclxuICAgICAgICBpdGVtLmF0dHIoXCJpZFwiLCBcImluc3RhbGxtZW50XCIgKyBwb3MpO1xyXG4gICAgICAgIGl0ZW0uZmluZChcInNwYW5cIikuaHRtbCggQ29udGVudEFyZW5hLlV0aWxzLmFkZE9yZGluYWwocG9zKSk7XHJcbiAgICAgICAgaXRlbS5maW5kKFwiaW5wdXRcIikudmFsKFwiXCIpO1xyXG4gICAgICAgIGl0ZW0uaW5zZXJ0QWZ0ZXIoXCIuaW5zdGFsbG1lbnQ6bGFzdFwiKTtcclxuXHJcbiAgICAgICAgaXRlbS5maW5kKFwiaW5wdXQuaGFzRGF0ZXBpY2tlclwiKVxyXG4gICAgICAgICAgICAuYXR0cihcImlkXCIsIG51bGwpXHJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImhhc0RhdGVwaWNrZXJcIilcclxuICAgICAgICAgICAgLmRhdGVwaWNrZXIoXCJkZXN0cm95XCIpLm9mZigpLmRhdGVwaWNrZXIoKTtcclxuXHJcbiAgICAgICAgLy9zZXR1cEluc3RhbGxtZW50KClcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiQoXCIucGFja2FnZS1zZWxlY3RvclwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoXCJpZFwiKS5zcGxpdChcIi1cIilbMV0sXHJcbiAgICAgICAgICAgIG5hbWUgPSAkKHRoaXMpLmF0dHIoXCJuYW1lXCIpLnNwbGl0KFwiLVwiKVsxXTtcclxuXHJcbiAgICAgICAgY2hlY2tTZWxlY3RlZFBhY2thZ2VzKCk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jaGVja2VkIHx8IHNlbGVjdG9yQ291bnRlciA+PSAxKSByZXR1cm47XHJcblxyXG4gICAgICAgICQuZWFjaCgkKFwiLnBhY2thZ2Utc2VsZWN0b3JcIiksIGZ1bmN0aW9uIChpLCBwYWNrKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFja2FnZXMgPSAkKHBhY2spLmRhdGEoXCJwYWNrYWdlc1wiKSxcclxuICAgICAgICAgICAgICAgIHBhY2tfaWQgPSAkKHBhY2spLmF0dHIoXCJpZFwiKS5zcGxpdChcIi1cIilbMV0sXHJcbiAgICAgICAgICAgICAgICBlbCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAkLmVhY2gocGFja2FnZXMucGFyZW50LCBmdW5jdGlvbiAoaSwgcCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHAuaWQgPT09IGlkKSBmbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWZsYWcpe1xyXG4gICAgICAgICAgICAgICAgZWwuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFja19pZCAhPT0gaWQpIGVsLnBhcmVudCgpLm5leHQoKS5hZGRDbGFzcyhcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiI3NlbGwtYm94XCIpLnJlbW92ZUNsYXNzKFwiaXMtaGlkZGVuXCIpO1xyXG5cclxuICAgICAgICBtYWluUGFja2FnZSA9IG5hbWU7XHJcbiAgICAgICAgc2VsZWN0b3JDb3VudGVyKys7XHJcblxyXG4gICAgfSk7Ki9cclxuXHJcbiAgICAkKFwiI3Jlc2V0LXBhY2thZ2VzXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmVhY2goJChcIi5wYWNrYWdlLXNlbGVjdG9yXCIpLCBmdW5jdGlvbiAoaSwgcGFjaykge1xyXG5cclxuICAgICAgICAgICAgcGFjay5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICQocGFjaykuYXR0cihcImRpc2FibGVkXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAkKHBhY2spLnBhcmVudCgpLm5leHQoKS5yZW1vdmVDbGFzcyhcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAkKFwiI21haW4tc2VsbC1ib3hcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnNlbGVjdC1ib3gtaXRlbS1jb250YWluZXJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnNlbGwtaXRlbXMtYm94XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChcIiNwcmljZS1zZWxsLWJveFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIucGFja2FnZS1yZWFkeS1idXR0b25cIikuaGlkZSgpO1xyXG4gICAgICAgICAgICBzZWxlY3RvckNvdW50ZXIgPSAwO1xyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiQoXCIjZHJhZnQtbGlzdGluZ1wiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBlbCA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgIGVsLmh0bWwoXCI8aSBjbGFzcz1cXFwiZmEgZmEtY29nIGZhLXNwaW5cXFwiPlwiKS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuc2F2ZUNvbnRlbnRBc0RyYWZ0KENvbnRlbnRBcmVuYS5Db250ZW50KS5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnN1Y2Nlc3MgIT09IHVuZGVmaW5lZCAmJiByZXNwb25zZS5jb250ZW50SWQgIT09IHVuZGVmaW5lZCApe1xyXG4gICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuaWQgPSByZXNwb25zZS5jb250ZW50SWQ7XHJcbiAgICAgICAgICAgICAgICBlbC5odG1sKFwiU2F2ZWQgYXMgRHJhZnRcIikuYXR0cihcImRpc2FibGVkXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKCkge31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7Ki9cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLFwiLmFkZC1zYWxlcy1wYWNrYWdlXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhZGRTYWxlc1BhY2thZ2UoKVxyXG4gICAgfSk7XHJcblxyXG4gICAgQ29udGVudEFyZW5hLlRlc3QudmFsaWRhdGVTdGVwVHdvID0gdmFsaWRhdGVTdGVwVHdvO1xyXG4gICAgQ29udGVudEFyZW5hLlRlc3QuZ2V0RnVsbFNlbGVjdGVkUGFja2FnZXMgPSBnZXRGdWxsU2VsZWN0ZWRQYWNrYWdlcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemF0aW9uXHJcbiAgICAgKi9cclxuICAgIHNldHVwSW5zdGFsbG1lbnQoKTtcclxuICAgIGFkZFNhbGVzUGFja2FnZSgpO1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvc2VsbC5zdGVwMi5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgY29udGVudCBmcm9tIFwiLi9yZWR1Y2Vycy9jb250ZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShjb250ZW50KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3N0b3JlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==