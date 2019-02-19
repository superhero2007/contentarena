webpackJsonp([2],{

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_baseExtremum.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseExtremum.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/**
 * The base implementation of methods like `_.max` and `_.min` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per iteration.
 * @param {Function} comparator The comparator used to compare values.
 * @returns {*} Returns the extremum value.
 */
function baseExtremum(array, iteratee, comparator) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index],
        current = iteratee(value);

    if (current != null && (computed === undefined
          ? (current === current && !isSymbol(current))
          : comparator(current, computed)
        )) {
      var computed = current,
          result = value;
    }
  }
  return result;
}

module.exports = baseExtremum;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

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
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseGt.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_baseGt.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.gt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is greater than `other`,
 *  else `false`.
 */
function baseGt(value, other) {
  return value > other;
}

module.exports = baseGt;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

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
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

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

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

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

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

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

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/max.js":
/*!************************************!*\
  !*** ./node_modules/lodash/max.js ***!
  \************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var baseExtremum = __webpack_require__(/*! ./_baseExtremum */ "./node_modules/lodash/_baseExtremum.js"),
    baseGt = __webpack_require__(/*! ./_baseGt */ "./node_modules/lodash/_baseGt.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");

/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => undefined
 */
function max(array) {
  return (array && array.length)
    ? baseExtremum(array, identity, baseGt)
    : undefined;
}

module.exports = max;


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/redux-thunk/es/index.js":
/*!**********************************************!*\
  !*** ./node_modules/redux-thunk/es/index.js ***!
  \**********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

/* harmony default export */ __webpack_exports__["a"] = (thunk);

/***/ }),

/***/ "./src/AppBundle/Resources/public/data/languages.js":
/*!**********************************************************!*\
  !*** ./src/AppBundle/Resources/public/data/languages.js ***!
  \**********************************************************/
/*! exports provided: languages */
/*! exports used: languages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return languages; });
var languages = {
    "ab": {
        "name": "Abkhaz",
        "nativeName": "аҧсуа"
    },
    "aa": {
        "name": "Afar",
        "nativeName": "Afaraf"
    },
    "af": {
        "name": "Afrikaans",
        "nativeName": "Afrikaans"
    },
    "ak": {
        "name": "Akan",
        "nativeName": "Akan"
    },
    "sq": {
        "name": "Albanian",
        "nativeName": "Shqip"
    },
    "am": {
        "name": "Amharic",
        "nativeName": "አማርኛ"
    },
    "ar": {
        "name": "Arabic",
        "nativeName": "العربية"
    },
    "an": {
        "name": "Aragonese",
        "nativeName": "Aragonés"
    },
    "hy": {
        "name": "Armenian",
        "nativeName": "Հայերեն"
    },
    "as": {
        "name": "Assamese",
        "nativeName": "অসমীয়া"
    },
    "av": {
        "name": "Avaric",
        "nativeName": "авар мацӀ, магӀарул мацӀ"
    },
    "ae": {
        "name": "Avestan",
        "nativeName": "avesta"
    },
    "ay": {
        "name": "Aymara",
        "nativeName": "aymar aru"
    },
    "az": {
        "name": "Azerbaijani",
        "nativeName": "azərbaycan dili"
    },
    "bm": {
        "name": "Bambara",
        "nativeName": "bamanankan"
    },
    "ba": {
        "name": "Bashkir",
        "nativeName": "башҡорт теле"
    },
    "eu": {
        "name": "Basque",
        "nativeName": "euskara, euskera"
    },
    "be": {
        "name": "Belarusian",
        "nativeName": "Беларуская"
    },
    "bn": {
        "name": "Bengali",
        "nativeName": "বাংলা"
    },
    "bh": {
        "name": "Bihari",
        "nativeName": "भोजपुरी"
    },
    "bi": {
        "name": "Bislama",
        "nativeName": "Bislama"
    },
    "bs": {
        "name": "Bosnian",
        "nativeName": "bosanski jezik"
    },
    "br": {
        "name": "Breton",
        "nativeName": "brezhoneg"
    },
    "bg": {
        "name": "Bulgarian",
        "nativeName": "български език"
    },
    "my": {
        "name": "Burmese",
        "nativeName": "ဗမာစာ"
    },
    "ca": {
        "name": "Catalan; Valencian",
        "nativeName": "Català"
    },
    "ch": {
        "name": "Chamorro",
        "nativeName": "Chamoru"
    },
    "ce": {
        "name": "Chechen",
        "nativeName": "нохчийн мотт"
    },
    "ny": {
        "name": "Chichewa; Chewa; Nyanja",
        "nativeName": "chiCheŵa, chinyanja"
    },
    "zh": {
        "name": "Chinese",
        "nativeName": "中文 (Zhōngwén), 汉语, 漢語"
    },
    "cv": {
        "name": "Chuvash",
        "nativeName": "чӑваш чӗлхи"
    },
    "kw": {
        "name": "Cornish",
        "nativeName": "Kernewek"
    },
    "co": {
        "name": "Corsican",
        "nativeName": "corsu, lingua corsa"
    },
    "cr": {
        "name": "Cree",
        "nativeName": "ᓀᐦᐃᔭᐍᐏᐣ"
    },
    "hr": {
        "name": "Croatian",
        "nativeName": "hrvatski"
    },
    "cs": {
        "name": "Czech",
        "nativeName": "česky, čeština"
    },
    "da": {
        "name": "Danish",
        "nativeName": "dansk"
    },
    "dv": {
        "name": "Divehi; Dhivehi; Maldivian;",
        "nativeName": "ދިވެހި"
    },
    "nl": {
        "name": "Dutch",
        "nativeName": "Nederlands, Vlaams"
    },
    "en": {
        "name": "English",
        "nativeName": "English"
    },
    "eo": {
        "name": "Esperanto",
        "nativeName": "Esperanto"
    },
    "et": {
        "name": "Estonian",
        "nativeName": "eesti, eesti keel"
    },
    "ee": {
        "name": "Ewe",
        "nativeName": "Eʋegbe"
    },
    "fo": {
        "name": "Faroese",
        "nativeName": "føroyskt"
    },
    "fj": {
        "name": "Fijian",
        "nativeName": "vosa Vakaviti"
    },
    "fi": {
        "name": "Finnish",
        "nativeName": "suomi, suomen kieli"
    },
    "fr": {
        "name": "French",
        "nativeName": "français, langue française"
    },
    "ff": {
        "name": "Fula; Fulah; Pulaar; Pular",
        "nativeName": "Fulfulde, Pulaar, Pular"
    },
    "gl": {
        "name": "Galician",
        "nativeName": "Galego"
    },
    "ka": {
        "name": "Georgian",
        "nativeName": "ქართული"
    },
    "de": {
        "name": "German",
        "nativeName": "Deutsch"
    },
    "el": {
        "name": "Greek, Modern",
        "nativeName": "Ελληνικά"
    },
    "gn": {
        "name": "Guaraní",
        "nativeName": "Avañeẽ"
    },
    "gu": {
        "name": "Gujarati",
        "nativeName": "ગુજરાતી"
    },
    "ht": {
        "name": "Haitian; Haitian Creole",
        "nativeName": "Kreyòl ayisyen"
    },
    "ha": {
        "name": "Hausa",
        "nativeName": "Hausa, هَوُسَ"
    },
    "he": {
        "name": "Hebrew (modern)",
        "nativeName": "עברית"
    },
    "hz": {
        "name": "Herero",
        "nativeName": "Otjiherero"
    },
    "hi": {
        "name": "Hindi",
        "nativeName": "हिन्दी, हिंदी"
    },
    "ho": {
        "name": "Hiri Motu",
        "nativeName": "Hiri Motu"
    },
    "hu": {
        "name": "Hungarian",
        "nativeName": "Magyar"
    },
    "ia": {
        "name": "Interlingua",
        "nativeName": "Interlingua"
    },
    "id": {
        "name": "Indonesian",
        "nativeName": "Bahasa Indonesia"
    },
    "ie": {
        "name": "Interlingue",
        "nativeName": "Originally called Occidental; then Interlingue after WWII"
    },
    "ga": {
        "name": "Irish",
        "nativeName": "Gaeilge"
    },
    "ig": {
        "name": "Igbo",
        "nativeName": "Asụsụ Igbo"
    },
    "ik": {
        "name": "Inupiaq",
        "nativeName": "Iñupiaq, Iñupiatun"
    },
    "io": {
        "name": "Ido",
        "nativeName": "Ido"
    },
    "is": {
        "name": "Icelandic",
        "nativeName": "Íslenska"
    },
    "it": {
        "name": "Italian",
        "nativeName": "Italiano"
    },
    "iu": {
        "name": "Inuktitut",
        "nativeName": "ᐃᓄᒃᑎᑐᑦ"
    },
    "ja": {
        "name": "Japanese",
        "nativeName": "日本語 (にほんご／にっぽんご)"
    },
    "jv": {
        "name": "Javanese",
        "nativeName": "basa Jawa"
    },
    "kl": {
        "name": "Kalaallisut, Greenlandic",
        "nativeName": "kalaallisut, kalaallit oqaasii"
    },
    "kn": {
        "name": "Kannada",
        "nativeName": "ಕನ್ನಡ"
    },
    "kr": {
        "name": "Kanuri",
        "nativeName": "Kanuri"
    },
    "ks": {
        "name": "Kashmiri",
        "nativeName": "कश्मीरी, كشميري‎"
    },
    "kk": {
        "name": "Kazakh",
        "nativeName": "Қазақ тілі"
    },
    "km": {
        "name": "Khmer",
        "nativeName": "ភាសាខ្មែរ"
    },
    "ki": {
        "name": "Kikuyu, Gikuyu",
        "nativeName": "Gĩkũyũ"
    },
    "rw": {
        "name": "Kinyarwanda",
        "nativeName": "Ikinyarwanda"
    },
    "ky": {
        "name": "Kirghiz, Kyrgyz",
        "nativeName": "кыргыз тили"
    },
    "kv": {
        "name": "Komi",
        "nativeName": "коми кыв"
    },
    "kg": {
        "name": "Kongo",
        "nativeName": "KiKongo"
    },
    "ko": {
        "name": "Korean",
        "nativeName": "한국어 (韓國語), 조선말 (朝鮮語)"
    },
    "ku": {
        "name": "Kurdish",
        "nativeName": "Kurdî, كوردی‎"
    },
    "kj": {
        "name": "Kwanyama, Kuanyama",
        "nativeName": "Kuanyama"
    },
    "la": {
        "name": "Latin",
        "nativeName": "latine, lingua latina"
    },
    "lb": {
        "name": "Luxembourgish, Letzeburgesch",
        "nativeName": "Lëtzebuergesch"
    },
    "lg": {
        "name": "Luganda",
        "nativeName": "Luganda"
    },
    "li": {
        "name": "Limburgish, Limburgan, Limburger",
        "nativeName": "Limburgs"
    },
    "ln": {
        "name": "Lingala",
        "nativeName": "Lingála"
    },
    "lo": {
        "name": "Lao",
        "nativeName": "ພາສາລາວ"
    },
    "lt": {
        "name": "Lithuanian",
        "nativeName": "lietuvių kalba"
    },
    "lu": {
        "name": "Luba-Katanga",
        "nativeName": ""
    },
    "lv": {
        "name": "Latvian",
        "nativeName": "latviešu valoda"
    },
    "gv": {
        "name": "Manx",
        "nativeName": "Gaelg, Gailck"
    },
    "mk": {
        "name": "Macedonian",
        "nativeName": "македонски јазик"
    },
    "mg": {
        "name": "Malagasy",
        "nativeName": "Malagasy fiteny"
    },
    "ms": {
        "name": "Malay",
        "nativeName": "bahasa Melayu, بهاس ملايو‎"
    },
    "ml": {
        "name": "Malayalam",
        "nativeName": "മലയാളം"
    },
    "mt": {
        "name": "Maltese",
        "nativeName": "Malti"
    },
    "mi": {
        "name": "Māori",
        "nativeName": "te reo Māori"
    },
    "mr": {
        "name": "Marathi (Marāṭhī)",
        "nativeName": "मराठी"
    },
    "mh": {
        "name": "Marshallese",
        "nativeName": "Kajin M̧ajeļ"
    },
    "mn": {
        "name": "Mongolian",
        "nativeName": "монгол"
    },
    "na": {
        "name": "Nauru",
        "nativeName": "Ekakairũ Naoero"
    },
    "nv": {
        "name": "Navajo, Navaho",
        "nativeName": "Diné bizaad, Dinékʼehǰí"
    },
    "nb": {
        "name": "Norwegian Bokmål",
        "nativeName": "Norsk bokmål"
    },
    "nd": {
        "name": "North Ndebele",
        "nativeName": "isiNdebele"
    },
    "ne": {
        "name": "Nepali",
        "nativeName": "नेपाली"
    },
    "ng": {
        "name": "Ndonga",
        "nativeName": "Owambo"
    },
    "nn": {
        "name": "Norwegian Nynorsk",
        "nativeName": "Norsk nynorsk"
    },
    "no": {
        "name": "Norwegian",
        "nativeName": "Norsk"
    },
    "ii": {
        "name": "Nuosu",
        "nativeName": "ꆈꌠ꒿ Nuosuhxop"
    },
    "nr": {
        "name": "South Ndebele",
        "nativeName": "isiNdebele"
    },
    "oc": {
        "name": "Occitan",
        "nativeName": "Occitan"
    },
    "oj": {
        "name": "Ojibwe, Ojibwa",
        "nativeName": "ᐊᓂᔑᓈᐯᒧᐎᓐ"
    },
    "cu": {
        "name": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
        "nativeName": "ѩзыкъ словѣньскъ"
    },
    "om": {
        "name": "Oromo",
        "nativeName": "Afaan Oromoo"
    },
    "or": {
        "name": "Oriya",
        "nativeName": "ଓଡ଼ିଆ"
    },
    "os": {
        "name": "Ossetian, Ossetic",
        "nativeName": "ирон æвзаг"
    },
    "pa": {
        "name": "Panjabi, Punjabi",
        "nativeName": "ਪੰਜਾਬੀ, پنجابی‎"
    },
    "pi": {
        "name": "Pāli",
        "nativeName": "पाऴि"
    },
    "fa": {
        "name": "Persian",
        "nativeName": "فارسی"
    },
    "pl": {
        "name": "Polish",
        "nativeName": "polski"
    },
    "ps": {
        "name": "Pashto, Pushto",
        "nativeName": "پښتو"
    },
    "pt": {
        "name": "Portuguese",
        "nativeName": "Português"
    },
    "qu": {
        "name": "Quechua",
        "nativeName": "Runa Simi, Kichwa"
    },
    "rm": {
        "name": "Romansh",
        "nativeName": "rumantsch grischun"
    },
    "rn": {
        "name": "Kirundi",
        "nativeName": "kiRundi"
    },
    "ro": {
        "name": "Romanian, Moldavian, Moldovan",
        "nativeName": "română"
    },
    "ru": {
        "name": "Russian",
        "nativeName": "русский язык"
    },
    "sa": {
        "name": "Sanskrit (Saṁskṛta)",
        "nativeName": "संस्कृतम्"
    },
    "sc": {
        "name": "Sardinian",
        "nativeName": "sardu"
    },
    "sd": {
        "name": "Sindhi",
        "nativeName": "सिन्धी, سنڌي، سندھی‎"
    },
    "se": {
        "name": "Northern Sami",
        "nativeName": "Davvisámegiella"
    },
    "sm": {
        "name": "Samoan",
        "nativeName": "gagana faa Samoa"
    },
    "sg": {
        "name": "Sango",
        "nativeName": "yângâ tî sängö"
    },
    "sr": {
        "name": "Serbian",
        "nativeName": "српски језик"
    },
    "gd": {
        "name": "Scottish Gaelic; Gaelic",
        "nativeName": "Gàidhlig"
    },
    "sn": {
        "name": "Shona",
        "nativeName": "chiShona"
    },
    "si": {
        "name": "Sinhala, Sinhalese",
        "nativeName": "සිංහල"
    },
    "sk": {
        "name": "Slovak",
        "nativeName": "slovenčina"
    },
    "sl": {
        "name": "Slovene",
        "nativeName": "slovenščina"
    },
    "so": {
        "name": "Somali",
        "nativeName": "Soomaaliga, af Soomaali"
    },
    "st": {
        "name": "Southern Sotho",
        "nativeName": "Sesotho"
    },
    "es": {
        "name": "Spanish; Castilian",
        "nativeName": "español, castellano"
    },
    "su": {
        "name": "Sundanese",
        "nativeName": "Basa Sunda"
    },
    "sw": {
        "name": "Swahili",
        "nativeName": "Kiswahili"
    },
    "ss": {
        "name": "Swati",
        "nativeName": "SiSwati"
    },
    "sv": {
        "name": "Swedish",
        "nativeName": "svenska"
    },
    "ta": {
        "name": "Tamil",
        "nativeName": "தமிழ்"
    },
    "te": {
        "name": "Telugu",
        "nativeName": "తెలుగు"
    },
    "tg": {
        "name": "Tajik",
        "nativeName": "тоҷикӣ, toğikī, تاجیکی‎"
    },
    "th": {
        "name": "Thai",
        "nativeName": "ไทย"
    },
    "ti": {
        "name": "Tigrinya",
        "nativeName": "ትግርኛ"
    },
    "bo": {
        "name": "Tibetan Standard, Tibetan, Central",
        "nativeName": "བོད་ཡིག"
    },
    "tk": {
        "name": "Turkmen",
        "nativeName": "Türkmen, Түркмен"
    },
    "tl": {
        "name": "Tagalog",
        "nativeName": "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"
    },
    "tn": {
        "name": "Tswana",
        "nativeName": "Setswana"
    },
    "to": {
        "name": "Tonga (Tonga Islands)",
        "nativeName": "faka Tonga"
    },
    "tr": {
        "name": "Turkish",
        "nativeName": "Türkçe"
    },
    "ts": {
        "name": "Tsonga",
        "nativeName": "Xitsonga"
    },
    "tt": {
        "name": "Tatar",
        "nativeName": "татарча, tatarça, تاتارچا‎"
    },
    "tw": {
        "name": "Twi",
        "nativeName": "Twi"
    },
    "ty": {
        "name": "Tahitian",
        "nativeName": "Reo Tahiti"
    },
    "ug": {
        "name": "Uighur, Uyghur",
        "nativeName": "Uyƣurqə, ئۇيغۇرچە‎"
    },
    "uk": {
        "name": "Ukrainian",
        "nativeName": "українська"
    },
    "ur": {
        "name": "Urdu",
        "nativeName": "اردو"
    },
    "uz": {
        "name": "Uzbek",
        "nativeName": "zbek, Ўзбек, أۇزبېك‎"
    },
    "ve": {
        "name": "Venda",
        "nativeName": "Tshivenḓa"
    },
    "vi": {
        "name": "Vietnamese",
        "nativeName": "Tiếng Việt"
    },
    "vo": {
        "name": "Volapük",
        "nativeName": "Volapük"
    },
    "wa": {
        "name": "Walloon",
        "nativeName": "Walon"
    },
    "cy": {
        "name": "Welsh",
        "nativeName": "Cymraeg"
    },
    "wo": {
        "name": "Wolof",
        "nativeName": "Wollof"
    },
    "fy": {
        "name": "Western Frisian",
        "nativeName": "Frysk"
    },
    "xh": {
        "name": "Xhosa",
        "nativeName": "isiXhosa"
    },
    "yi": {
        "name": "Yiddish",
        "nativeName": "ייִדיש"
    },
    "yo": {
        "name": "Yoruba",
        "nativeName": "Yorùbá"
    },
    "za": {
        "name": "Zhuang, Chuang",
        "nativeName": "Saɯ cueŋƅ, Saw cuengh"
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/reducers/filter.js":
/*!**************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/reducers/filter.js ***!
  \**************************************************************************/
/*! exports provided: filterTypes, filter */
/*! exports used: filter, filterTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return filterTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return filter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(/*! @constants */ "./src/AppBundle/Resources/public/javascript/common/constants.js");
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }


var filterTypes = {
    ADD_RIGHT: 'ADD_RIGHT',
    REMOVE_RIGHT: 'REMOVE_RIGHT',
    UPDATE_COUNTRIES: 'UPDATE_COUNTRIES',
    UPDATE_EXCLUSIVE: 'UPDATE_EXCLUSIVE',
    UPDATE_INCLUDED_COUNTRIES: 'UPDATE_INCLUDED_COUNTRIES',
    UPDATE_SPORT: 'UPDATE_SPORT',
    UPDATE_EVENT: 'UPDATE_EVENT',
    CLEAR: 'CLEAR',
    CLEAR_UPDATE: 'CLEAR_UPDATE',
    UPDATE_MANY: 'UPDATE_MANY',
    UPDATE_FILTERS_CONFIG: "UPDATE_ALL",
    UPDATE_EVENT_DATE_FROM_TO: "UPDATE_FROM_TO",
    UPDATE_LIST_VIEW: "UPDATE_LIST_VIEW"
};

var defaultFilter = {
    rights: [],
    countries: [],
    exclusive: false,
    includeAllCountries: false,
    sport: [{
        value: null,
        label: "All sports"
    }],
    event: "",
    forceUpdate: true,
    eventDateFrom: "",
    eventDateTo: "",
    listType: __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CONTENT_LISTING_VIEW */].LIST
};

var filter = function filter() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultFilter;
    var action = arguments[1];

    switch (action.type) {
        case filterTypes.UPDATE_INCLUDED_COUNTRIES:
            return Object.assign({}, state, {
                includeAllCountries: action.includeAllCountries
            });
        case filterTypes.CLEAR:
            return Object.assign({}, defaultFilter);
        case filterTypes.CLEAR_UPDATE:
            return Object.assign({}, state, {
                forceUpdate: false
            });
        case filterTypes.ADD_RIGHT:
            return Object.assign({}, state, {
                rights: [].concat(_toConsumableArray(state.rights), [action.id])
            });
        case filterTypes.REMOVE_RIGHT:
            var index = state.rights.indexOf(action.id);
            state.rights.splice(index, 1);
            return Object.assign({}, state, {
                rights: [].concat(_toConsumableArray(state.rights))
            });
        case filterTypes.UPDATE_COUNTRIES:
            return Object.assign({}, state, {
                countries: action.countries.map(function (c) {
                    return c.value;
                })
            });
        case filterTypes.UPDATE_EVENT_DATE_FROM_TO:
            return Object.assign({}, state, { eventDateFrom: action.from, eventDateTo: action.to });
        case filterTypes.UPDATE_EXCLUSIVE:
            return Object.assign({}, state, {
                exclusive: action.exclusive
            });
        case filterTypes.UPDATE_SPORT:
            return Object.assign({}, state, {
                sport: [].concat(_toConsumableArray(state.sport), _toConsumableArray(action.sport))
            });
        case filterTypes.UPDATE_FILTERS_CONFIG:
            return Object.assign({}, state, action.filters);
        case filterTypes.UPDATE_LIST_VIEW:
            return Object.assign({}, state, { listType: action.listType });
        case filterTypes.UPDATE_EVENT:
            return Object.assign({}, state, {
                event: action.event
            });
        case filterTypes.UPDATE_MANY:
            action.filters.forceUpdate = true;
            if (action.filters.rights) action.filters.rights = action.filters.rights.map(function (r) {
                return Number(r);
            });
            return Object.assign({}, state, action.filters);
        default:
            return state;
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/reducers/marketplace.js":
/*!*******************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/reducers/marketplace.js ***!
  \*******************************************************************************/
/*! exports provided: marketplaceTypes, initialState, marketplace */
/*! exports used: marketplace, marketplaceTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return marketplaceTypes; });
/* unused harmony export initialState */
/* harmony export (immutable) */ __webpack_exports__["a"] = marketplace;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var marketplaceTypes = {
    FETCH_LISTING_REQUEST: "FETCH_LISTING_REQUEST",
    FETCH_LISTING_ERROR: "FETCH_LISTING_ERROR",
    FETCH_LISTING_SUCCESS: "FETCH_LISTING_SUCCESS"
};

var initialState = {
    listingsData: {
        success: false,
        loading: false,
        error: null,
        listings: [],
        totalItems: null
    }
};

function marketplace() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case marketplaceTypes.FETCH_LISTING_REQUEST:
        case marketplaceTypes.FETCH_LISTING_ERROR:
        case marketplaceTypes.FETCH_LISTING_SUCCESS:
            return _extends({}, state, {
                listingsData: updateListings(state.listingsData, action)
            });

        default:
            return state;
    }
}

var updateListings = function updateListings() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState.listingsData;
    var action = arguments[1];

    switch (action.type) {
        case marketplaceTypes.FETCH_LISTING_REQUEST:
            return _extends({}, state, {
                loading: true,
                error: null,
                listings: [],
                totalItems: null
            });
        case marketplaceTypes.FETCH_LISTING_SUCCESS:
            return _extends({}, state, {
                loading: false,
                error: null,
                success: true,
                listings: action.listings,
                totalItems: action.totalItems
            });
        case marketplaceTypes.FETCH_LISTING_ERROR:
            return _extends({}, state, {
                success: false,
                loading: false,
                error: action.error,
                listings: [],
                totalItems: null
            });
        default:
            return state;
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js":
/*!************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery, $) {/**
* Created by JuanCruz on 4/1/2018.
*/

var __apiStore = {
    tournaments: {}
};

window.ContentArena = window.ContentArena || {};
ContentArena.ContentApi = ContentArena.ContentApi || {};

ContentArena.ContentApi = {
    saveContentAsDraft: function saveContentAsDraft(content) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "content/draft/save",
            type: "POST",
            data: JSON.stringify(content),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    saveContentAsInactive: function saveContentAsInactive(content) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listing/save",
            type: "POST",
            data: JSON.stringify(content),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    saveContentAsActive: function saveContentAsActive(content) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listing/publish",
            type: "POST",
            data: JSON.stringify(content),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    republishListing: function republishListing(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listing/republish",
            type: "POST",
            data: JSON.stringify({ customId: customId }),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    sendMessage: function sendMessage(message) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/messages/send",
            type: "POST",
            data: JSON.stringify(message),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getUserInfo: function getUserInfo() {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/user/info",
            type: "POST",
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getUserInfoByActivationCode: function getUserInfoByActivationCode(activationCode) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/user/code",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ activationCode: activationCode }),
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getCompanyUsers: function getCompanyUsers() {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/company/users",
            type: "POST",
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    updateCompany: function updateCompany(company) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/company/update",
            type: "POST",
            data: JSON.stringify({ company: company }),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    updatePassword: function updatePassword(data) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/user/password",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    updateUser: function updateUser(user) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/user/update",
            type: "POST",
            data: JSON.stringify({ user: user }),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    activateUser: function activateUser(user, password) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/user/activate",
            type: "POST",
            data: JSON.stringify({ user: user, id: user.id, password: password }),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    updateUserProfile: function updateUserProfile(profile) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/user/profile",
            type: "POST",
            data: JSON.stringify({ profile: profile }),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getThread: function getThread(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/messages/thread",
            type: "POST",
            data: JSON.stringify({ customId: customId }),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getThreads: function getThreads() {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/messages/threads",
            type: "POST",
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    placeBid: function placeBid(bid) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/bid/place",
            type: "POST",
            data: JSON.stringify(bid),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    placeBids: function placeBids(bid) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/bids/place",
            type: "POST",
            data: JSON.stringify(bid),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    acceptBid: function acceptBid(bid, signature, signatureName, signaturePosition) {
        var deferred = jQuery.Deferred(),
            _this = this;

        bid.signature = signature;
        bid.signatureName = signatureName;
        bid.signaturePosition = signaturePosition;

        $.ajax({
            url: envhosturl + "api/bid/accept",
            type: "POST",
            data: JSON.stringify(bid),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    rejectBid: function rejectBid(bid) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/bid/reject",
            type: "POST",
            data: JSON.stringify(bid),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    removeBid: function removeBid(bid) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/bid/remove",
            type: "POST",
            data: JSON.stringify(bid),
            contentType: "application/json",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    saveTmpFile: function saveTmpFile(files) {
        var deferred = jQuery.Deferred(),
            _this = this;

        var data = new FormData();
        data.append('file', files[0]);

        $.ajax({
            url: envhosturl + "content/save/file",
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    saveAttachmentFile: function saveAttachmentFile(files) {
        var deferred = jQuery.Deferred(),
            _this = this;

        var data = new FormData();
        data.append('file', files[0]);

        $.ajax({
            url: envhosturl + "content/save/attachment",
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                console.log("FAILED");
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    removeAttachmentFile: function removeAttachmentFile(file) {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "content/remove/attachment",
            type: "POST",
            data: {
                file: file
            },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                console.log("FAILED");
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getByCustomId: function getByCustomId(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "listing/details",
            type: "POST",
            data: {
                customId: customId
            },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getDraftListings: function getDraftListings() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/draft",
            type: "POST",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getInactiveListings: function getInactiveListings() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/inactive",
            type: "POST",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getActiveListings: function getActiveListings() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/active",
            type: "POST",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getExpiredListings: function getExpiredListings() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/listings/expired",
            type: "POST",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    removeListing: function removeListing(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/remove",
            type: "POST",
            data: {
                customId: customId
            },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    duplicateListing: function duplicateListing(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/duplicate",
            type: "POST",
            data: {
                customId: customId
            },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    deactivateListing: function deactivateListing(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/deactivate",
            type: "POST",
            data: {
                customId: customId
            },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    archiveListing: function archiveListing(customId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/archive",
            type: "POST",
            data: {
                customId: customId
            },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getClosedDeals: function getClosedDeals() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/closed",
            type: "POST",
            data: {},
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getAllDeals: function getAllDeals() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/all",
            type: "POST",
            data: {},
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getPendingDeals: function getPendingDeals() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/pending",
            type: "POST",
            data: {},
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getRejectedDeals: function getRejectedDeals() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/bid/rejected",
            type: "POST",
            data: {},
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getWatchlistListings: function getWatchlistListings() {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/listings/watchlist",
            type: "POST",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/ca/ca.api.js":
/*!****************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/ca/ca.api.js ***!
  \****************************************************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($, jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


/**
 * Created by JuanCruz on 4/1/2018.
 */

var __apiStore = {
    tournaments: {}
};

window.ContentArena = window.ContentArena || {};

ContentArena.Api = {
    sortByLabel: function sortByLabel(a, b) {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
    },
    sortBySport: function sortBySport(a, b) {

        if (a.sport.name > b.sport.name) return 1;
        if (a.sport.name < b.sport.name) return -1;
        if (a.sportCategory.name > b.sportCategory.name) return 1;
        if (a.sportCategory.name < b.sportCategory.name) return -1;
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    },
    prepareList: function prepareList(list, categoryId) {

        var _this = this;

        list = $.map(list, function (item) {

            // Filter by category
            if (categoryId && item.category['@attributes'].id != categoryId) return null;

            return { name: item['@attributes'].name, externalId: item['@attributes'].id };
        });

        list.sort(_this.sortByLabel);

        return list;
    },
    filterDoubles: function filterDoubles(list, sportId) {
        var names = [];

        if (sportId === "sr:sport:5") {
            list = list.map(function (item) {
                item.name = item.name.replace(/ singles/gi, '').replace(/ double/gi, '');
                return item;
            }).filter(function (item) {
                if (names.indexOf(item.name) === -1) {
                    names.push(item.name);
                    return true;
                }
                return false;
            });
        }

        return list;
    },
    getCompanyTerms: function getCompanyTerms() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/terms/company",
            type: "POST",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getCompanyDefinitions: function getCompanyDefinitions() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/definitions/company",
            type: "POST",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    restoreCompanyTerms: function restoreCompanyTerms() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/terms/restore",
            type: "POST",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    restoreDefinitions: function restoreDefinitions() {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/definitions/restore",
            type: "POST",
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    updateTerms: function updateTerms(terms, definitions) {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "api/terms/update",
            type: "POST",
            data: {
                terms: terms,
                definitions: definitions
            },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getContent: function getContent(filter) {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "buy/search",
            type: "POST",
            data: filter,
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getJsonContent: function getJsonContent(filter) {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "listings/marketplace",
            type: "POST",
            data: filter,
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    saveFilter: function saveFilter(filter) {
        var deferred = jQuery.Deferred();

        $.ajax({
            url: envhosturl + "buy/filter/save",
            type: "POST",
            data: filter,
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getCountries: function getCountries() {
        var deferred = jQuery.Deferred();
        var _this = this;

        if (ContentArena.Data.Countries && ContentArena.Data.Countries.length > 0) {
            deferred.resolve(ContentArena.Data.Countries);
        } else {
            $.ajax({
                url: envhosturl + "api/search/countries/all",
                type: "POST",
                /**
                 * @param {array} response
                 */
                success: function success(response) {
                    response.sort(_this.sortByLabel);
                    response = response.map(function (c) {
                        c.regions = c.regions.map(function (r) {
                            return r.id;
                        });
                        c.externalId = c.id;
                        return c;
                    });
                    ContentArena.Data.Countries = response;
                    deferred.resolve(response);
                },
                error: function error(data, status) {
                    deferred.reject({
                        data: data,
                        status: status
                    });
                }
            });
        }

        return deferred.promise();
    },
    getActiveSports: function getActiveSports() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "api/search/sports/active",
            type: "POST",
            /**
             * @param {array} response
             */
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getAllSports: function getAllSports(flags) {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "api/search/sports/all",
            type: "POST",
            data: {
                flags: flags
            },
            /**
             * @param {array} response
             */
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getSportsGroups: function getSportsGroups() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "api/search/sports/groups",
            type: "POST",
            /**
             * @param {array} response
             */
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getCountriesFull: function getCountriesFull() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "api/search/countries/full",
            type: "POST",
            /**
             * @param {array} response
             */
            success: function success(response) {
                response.sort(_this.sortByLabel);
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getTerritories: function getTerritories() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "api/search/territories",
            type: "POST",
            /**
             * @param {array} response
             */
            success: function success(response) {
                response.sort(_this.sortByLabel);
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getRegions: function getRegions() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "api/search/regions",
            type: "POST",
            /**
             * @param {array} response
             */
            success: function success(response) {
                response.sort(_this.sortByLabel);
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getRights: function getRights(rightsPackage, group) {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "api/search/rights",
            type: "POST",
            data: {
                rightsPackage: rightsPackage,
                group: group
            },

            /**
             * @param {array} response
             */
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getRightsPackage: function getRightsPackage(rightsPackage, group) {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "api/search/rights-package",
            type: "POST",
            data: {
                rightsPackage: rightsPackage,
                group: group
            },

            /**
             * @param {array} response
             */
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getSports: function getSports() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: externalApiUrl + "v1/feed/sports",
            type: "GET",
            /**
             * @param {{sport:object}} response
             */
            success: function success(response) {

                var sports = _this.prepareList(response.sport);
                deferred.resolve(sports);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getContentDetails: function getContentDetails(id) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "content/details/",
            type: "POST",
            data: { id: id },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getPendingListings: function getPendingListings(id) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "content/pending-listings/",
            type: "POST",
            data: { id: id },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getCategories: function getCategories(sportId) {
        var deferred = jQuery.Deferred(),
            _this = this,
            list = [],
            cats = [];

        _this.getTournaments(sportId).done(function () {

            if (!__apiStore.tournaments[sportId]) {
                deferred.resolve([]);
                return;
            }

            list = $.map(__apiStore.tournaments[sportId].tournament, function (item) {

                var id = item.category['@attributes'].id;

                if (cats.indexOf(id) !== -1) {
                    return null;
                } else {
                    cats.push(id);
                    return item.category;
                }
            });

            deferred.resolve(_this.prepareList(list));
        });

        return deferred.promise();
    },
    getTournaments: function getTournaments(sportId, categoryId) {
        var deferred = jQuery.Deferred(),
            _this = this,
            storedResponse;

        if (__apiStore.tournaments[sportId] !== undefined) {

            storedResponse = _this.prepareList(__apiStore.tournaments[sportId].tournament, categoryId);
            storedResponse = _this.filterDoubles(storedResponse, sportId);
            deferred.resolve(storedResponse);
            return deferred.promise();
        }

        $.ajax({
            url: externalApiUrl + "v1/feed/tournaments",
            type: "POST",
            data: { id: sportId },
            /**
             * @param {{tournaments:{tournament:Array}}} response
             */
            success: function success(response) {

                // A comment
                if (response.tournaments === undefined || response.tournaments.tournament === undefined) {
                    deferred.resolve([]);
                    return;
                }

                __apiStore.tournaments[sportId] = response.tournaments;

                var list = _this.prepareList(response.tournaments.tournament, categoryId);
                list = _this.filterDoubles(list, sportId);
                deferred.resolve(list);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });
        return deferred.promise();
    },
    getSeasons: function getSeasons(tournamentId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: externalApiUrl + "v1/feed/seasons",
            type: "POST",
            data: { id: tournamentId },
            /**
             * @param {{tournaments:{tournament:Array}}} response
             */
            success: function success(response) {

                var list;

                if (response.seasons === undefined || response.seasons.season === undefined) {
                    deferred.resolve([]);
                    return false;
                }

                if ($.isArray(response.seasons.season)) {
                    list = $.map(response.seasons.season, function (item) {
                        return {
                            name: item['@attributes'].name,
                            externalId: item['@attributes'].id,
                            endDate: item['@attributes'].end_date,
                            startDate: item['@attributes'].start_date,
                            tournamentId: item['@attributes'].tournament_id,
                            year: item['@attributes'].year
                        };
                    }).reverse();
                } else {
                    list = [{
                        name: response.seasons.season['@attributes'].name,
                        externalId: response.seasons.season['@attributes'].id,
                        endDate: response.seasons.season['@attributes'].end_date,
                        startDate: response.seasons.season['@attributes'].start_date,
                        tournamentId: response.seasons.season['@attributes'].tournament_id,
                        year: response.seasons.season['@attributes'].year
                    }];
                }

                deferred.resolve(list);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });
        return deferred.promise();
    },
    getSchedule: function getSchedule(seasonId) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: externalApiUrl + "v1/feed/schedules",
            type: "POST",
            data: { id: seasonId },
            /**
             * @param {{tournaments:{tournament:Array}}} response
             */
            success: function success(response) {

                var list = {};

                if (response.sport_events === undefined || response.sport_events.sport_event === undefined) return false;

                response.sport_events.sport_event.forEach(function (item) {

                    var round = item.tournament_round ? item.tournament_round['@attributes'] : null;

                    if (!round) return;

                    var name = round.number ? "round_" + round.number : round.name;

                    if (!list[name]) list[name] = {};

                    if (!list[name].matches) list[name].matches = new Map();

                    list[name].matches.set(item['@attributes'].id, {
                        scheduled: item['@attributes'].scheduled,
                        externalId: item['@attributes'].id,
                        status: item['@attributes'].status,
                        tournamentRound: round,
                        competitors: item.competitors ? item.competitors.competitor.map(function (competitor) {
                            return competitor['@attributes'];
                        }) : null
                    });
                });

                deferred.resolve(list);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });
        return deferred.promise();
    },
    searchCompetition: function searchCompetition(request) {

        var deferred = jQuery.Deferred();
        var _this = this;

        $.ajax({
            url: envhosturl + 'api/search/tournament',
            data: {
                "content": request
            },
            traditional: true,
            type: "POST",
            dataType: "json",
            success: function success(data) {

                data.filter(function (item) {
                    return !!item.sport;
                }).sort(_this.sortBySport);

                deferred.resolve(data);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });
        return deferred.promise();
    },
    watchlist: function watchlist(id) {
        var deferred = jQuery.Deferred(),
            _this = this;

        $.ajax({
            url: envhosturl + "api/watchlist/add",
            type: "POST",
            data: { id: id },
            success: function success(response) {
                deferred.resolve(response);
            },
            error: function error(data, status) {
                deferred.reject({
                    data: data,
                    status: status
                });
            }
        });

        return deferred.promise();
    },
    getNotifications: function getNotifications() {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(envhosturl + 'api/notifications/');
    },
    markNotificationAsVisited: function markNotificationAsVisited(id) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(envhosturl + 'api/notifications/visited', {
            id: id
        });
    },
    markNotificationAsSeen: function markNotificationAsSeen() {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(envhosturl + 'api/notifications/seen');
    },
    signInUser: function signInUser(username, password) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(envhosturl + 'api/users/login', {
            username: username, password: password
        });
    },
    recoverPassword: function recoverPassword(email) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(envhosturl + 'api/users/password/recover', {
            email: email
        });
    },
    resetPassword: function resetPassword(password, confirmationToken) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(envhosturl + 'api/users/password/update', {
            password: password, confirmationToken: confirmationToken
        });
    },
    signUpUser: function signUpUser(firstName, lastName, email, companyLegalName) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(envhosturl + 'api/users/register', {
            firstName: firstName, lastName: lastName, email: email, companyLegalName: companyLegalName
        });
    }
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/ca/ca.data.js":
/*!*****************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/ca/ca.data.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Created by JuanCruz on 4/1/2018.
 */

window.ContentArena = window.ContentArena || {};

ContentArena.Data = ContentArena.Data || {};
ContentArena.Languages = ContentArena.Languages || {};

ContentArena.Data.TopSports = [{ name: "Soccer", externalId: "sr:sport:1" }, { name: "Basketball", externalId: "sr:sport:2" }, { name: "Baseball", externalId: "sr:sport:3" }, { name: "Tennis", externalId: "sr:sport:5" }, { name: "Cricket", externalId: "sr:sport:21" }, { name: "Field Hockey", externalId: "sr:sport:24" }, { name: "Volleyball", externalId: "sr:sport:23" }, { name: "Table Tennis", externalId: "sr:sport:20" }, { name: "Golf", externalId: "sr:sport:9" }, { name: "American Football", externalId: "sr:sport:16" }, { name: "Handball", externalId: "sr:sport:6" }];

ContentArena.Data.FullSports = [];
ContentArena.Data.ActiveSports = [];
ContentArena.Data.Countries = [];
ContentArena.Data.Territories = [];
ContentArena.Data.Regions = [];
ContentArena.Languages.Short = {
    "mdr": "Mandarin",
    "es": "Spanish",
    "en": "English",
    "hi": "Hindi",
    "ar": "Arabic",
    "pt": "Portuguese",
    "bn": "Bengali",
    "ru": "Russian",
    "ja": "Japanese",
    "jv": "Javanese",
    "de": "German",
    "all": "Show All"
};

ContentArena.Languages.Long = {
    "aa": "Afar",
    "af": "Afrikaans",
    "ain": "Ainu",
    "akz": "Alabama",
    "sq": "Albanian",
    "ale": "Aleut",
    "arq": "Algerian Arabic",
    "en_US": "American English",
    "ase": "American Sign Language",
    "am": "Amharic",
    "egy": "Ancient Egyptian",
    "grc": "Ancient Greek",
    "ar": "Arabic",
    "arc": "Aramaic",
    "arp": "Arapaho",
    "arw": "Arawak",
    "hy": "Armenian",
    "as": "Assamese",
    "asa": "Asu",
    "en_AU": "Australian English",
    "de_AT": "Austrian German",
    "ay": "Aymara",
    "az": "Azerbaijani",
    "ban": "Balinese",
    "eu": "Basque",
    "bar": "Bavarian",
    "be": "Belarusian",
    "bn": "Bengali",
    "bik": "Bikol",
    "bin": "Bini",
    "bs": "Bosnian",
    "brh": "Brahui",
    "bra": "Braj",
    "pt_BR": "Brazilian Portuguese",
    "br": "Breton",
    "en_GB": "British English",
    "bg": "Bulgarian",
    "my": "Burmese",
    "frc": "Cajun French",
    "en_CA": "Canadian English",
    "fr_CA": "Canadian French",
    "yue": "Cantonese",
    "car": "Carib",
    "ca": "Catalan",
    "cay": "Cayuga",
    "ceb": "Cebuano",
    "shu": "Chadian Arabic",
    "ce": "Chechen",
    "chr": "Cherokee",
    "qug": "Chimborazo Highland Quichua",
    "zh": "Chinese",
    "chn": "Chinook Jargon",
    "chp": "Chipewyan",
    "cho": "Choctaw",
    "cu": "Church Slavic",
    "cv": "Chuvash",
    "nwc": "Classical Newari",
    "syc": "Classical Syriac",
    "swc": "Congo Swahili",
    "cop": "Coptic",
    "kw": "Cornish",
    "co": "Corsican",
    "cr": "Cree",
    "mus": "Creek",
    "crh": "Crimean Turkish",
    "hr": "Croatian",
    "cs": "Czech",
    "dak": "Dakota",
    "da": "Danish",
    "del": "Delaware",
    "nl": "Dutch",
    "frs": "Eastern Frisian",
    "arz": "Egyptian Arabic",
    "en": "English",
    "eo": "Esperanto",
    "et": "Estonian",
    "pt_PT": "European Portuguese",
    "es_ES": "European Spanish",
    "ee": "Ewe",
    "fan": "Fang",
    "hif": "Fiji Hindi",
    "fj": "Fijian",
    "fil": "Filipino",
    "fi": "Finnish",
    "nl_BE": "Flemish",
    "fon": "Fon",
    "fr": "French",
    "gaa": "Ga",
    "gan": "Gan Chinese",
    "ka": "Georgian",
    "de": "German",
    "got": "Gothic",
    "grb": "Grebo",
    "el": "Greek",
    "gn": "Guarani",
    "gu": "Gujarati",
    "guz": "Gusii",
    "hai": "Haida",
    "ht": "Haitian",
    "hak": "Hakka Chinese",
    "ha": "Hausa",
    "haw": "Hawaiian",
    "he": "Hebrew",
    "hz": "Herero",
    "hi": "Hindi",
    "hit": "Hittite",
    "hmn": "Hmong",
    "hu": "Hungarian",
    "is": "Icelandic",
    "io": "Ido",
    "ig": "Igbo",
    "iu": "Inuktitut",
    "ik": "Inupiaq",
    "ga": "Irish",
    "it": "Italian",
    "jam": "Jamaican Creole English",
    "ja": "Japanese",
    "jv": "Javanese",
    "kaj": "Jju",
    "dyo": "Jola-Fonyi",
    "xal": "Kalmyk",
    "kam": "Kamba",
    "kbl": "Kanembu",
    "kn": "Kannada",
    "kr": "Kanuri",
    "kaa": "Kara-Kalpak",
    "krc": "Karachay-Balkar",
    "krl": "Karelian",
    "ks": "Kashmiri",
    "csb": "Kashubian",
    "kaw": "Kawi",
    "kk": "Kazakh",
    "ken": "Kenyang",
    "kha": "Khasi",
    "km": "Khmer",
    "kho": "Khotanese",
    "khw": "Khowar",
    "ki": "Kikuyu",
    "kmb": "Kimbundu",
    "krj": "Kinaray-a",
    "rw": "Kinyarwanda",
    "kiu": "Kirmanjki",
    "tlh": "Klingon",
    "bkm": "Kom",
    "kv": "Komi",
    "koi": "Komi-Permyak",
    "kg": "Kongo",
    "kok": "Konkani",
    "ko": "Korean",
    "kfo": "Koro",
    "kos": "Kosraean",
    "avk": "Kotava",
    "khq": "Koyra Chiini",
    "ses": "Koyraboro Senni",
    "kpe": "Kpelle",
    "kri": "Krio",
    "kj": "Kuanyama",
    "kum": "Kumyk",
    "ku": "Kurdish",
    "kru": "Kurukh",
    "kut": "Kutenai",
    "nmg": "Kwasio",
    "ky": "Kyrgyz",
    "quc": "K\u02BCiche\u02BC",
    "lad": "Ladino",
    "lah": "Lahnda",
    "lkt": "Lakota",
    "lam": "Lamba",
    "lag": "Langi",
    "lo": "Lao",
    "ltg": "Latgalian",
    "la": "Latin",
    "es_419": "Latin American Spanish",
    "lv": "Latvian",
    "lzz": "Laz",
    "lez": "Lezghian",
    "lij": "Ligurian",
    "li": "Limburgish",
    "ln": "Lingala",
    "lfn": "Lingua Franca Nova",
    "lzh": "Literary Chinese",
    "lt": "Lithuanian",
    "liv": "Livonian",
    "jbo": "Lojban",
    "lmo": "Lombard",
    "nds": "Low German",
    "sli": "Lower Silesian",
    "dsb": "Lower Sorbian",
    "loz": "Lozi",
    "lu": "Luba-Katanga",
    "lua": "Luba-Lulua",
    "lui": "Luiseno",
    "smj": "Lule Sami",
    "lun": "Lunda",
    "luo": "Luo",
    "lb": "Luxembourgish",
    "luy": "Luyia",
    "mde": "Maba",
    "mk": "Macedonian",
    "jmc": "Machame",
    "mad": "Madurese",
    "maf": "Mafa",
    "mag": "Magahi",
    "vmf": "Main-Franconian",
    "mai": "Maithili",
    "mak": "Makasar",
    "mgh": "Makhuwa-Meetto",
    "kde": "Makonde",
    "mg": "Malagasy",
    "ms": "Malay",
    "ml": "Malayalam",
    "mt": "Maltese",
    "mnc": "Manchu",
    "mdr": "Mandarin",
    "man": "Mandingo",
    "mni": "Manipuri",
    "gv": "Manx",
    "mi": "Maori",
    "arn": "Mapuche",
    "mr": "Marathi",
    "chm": "Mari",
    "mh": "Marshallese",
    "mwr": "Marwari",
    "mas": "Masai",
    "mzn": "Mazanderani",
    "byv": "Medumba",
    "men": "Mende",
    "mwv": "Mentawai",
    "mer": "Meru",
    "mgo": "Meta\u02BC",
    "es_MX": "Mexican Spanish",
    "mic": "Micmac",
    "dum": "Middle Dutch",
    "enm": "Middle English",
    "frm": "Middle French",
    "gmh": "Middle High German",
    "mga": "Middle Irish",
    "nan": "Min Nan Chinese",
    "min": "Minangkabau",
    "xmf": "Mingrelian",
    "mwl": "Mirandese",
    "lus": "Mizo",
    "ar_001": "Modern Standard Arabic",
    "moh": "Mohawk",
    "mdf": "Moksha",
    "ro_MD": "Moldavian",
    "lol": "Mongo",
    "mn": "Mongolian",
    "mfe": "Morisyen",
    "ary": "Moroccan Arabic",
    "mos": "Mossi",
    "mul": "Multiple Languages",
    "mua": "Mundang",
    "ttt": "Muslim Tat",
    "mye": "Myene",
    "naq": "Nama",
    "na": "Nauru",
    "nv": "Navajo",
    "ng": "Ndonga",
    "nap": "Neapolitan",
    "ne": "Nepali",
    "new": "Newari",
    "sba": "Ngambay",
    "nnh": "Ngiemboon",
    "jgo": "Ngomba",
    "yrl": "Nheengatu",
    "nia": "Nias",
    "niu": "Niuean",
    "zxx": "No linguistic content",
    "nog": "Nogai",
    "nd": "North Ndebele",
    "frr": "Northern Frisian",
    "se": "Northern Sami",
    "nso": "Northern Sotho",
    "no": "Norwegian",
    "nb": "Norwegian Bokm\xE5l",
    "nn": "Norwegian Nynorsk",
    "nov": "Novial",
    "nus": "Nuer",
    "nym": "Nyamwezi",
    "ny": "Nyanja",
    "nyn": "Nyankole",
    "tog": "Nyasa Tonga",
    "nyo": "Nyoro",
    "nzi": "Nzima",
    "nqo": "N\u02BCKo",
    "oc": "Occitan",
    "oj": "Ojibwa",
    "ang": "Old English",
    "fro": "Old French",
    "goh": "Old High German",
    "sga": "Old Irish",
    "non": "Old Norse",
    "peo": "Old Persian",
    "pro": "Old Proven\xE7al",
    "or": "Oriya",
    "om": "Oromo",
    "osa": "Osage",
    "os": "Ossetic",
    "ota": "Ottoman Turkish",
    "pal": "Pahlavi",
    "pfl": "Palatine German",
    "pau": "Palauan",
    "pi": "Pali",
    "pdc": "Pennsylvania German",
    "fa": "Persian",
    "phn": "Phoenician",
    "pcd": "Picard",
    "pms": "Piedmontese",
    "pdt": "Plautdietsch",
    "pon": "Pohnpeian",
    "pl": "Polish",
    "pnt": "Pontic",
    "pt": "Portuguese",
    "prg": "Prussian",
    "pa": "Punjabi",
    "qu": "Quechua",
    "ro": "Romanian",
    "rm": "Romansh",
    "rom": "Romany",
    "root": "Root",
    "ru": "Russian",
    "rwk": "Rwa",
    "sah": "Sakha",
    "sam": "Samaritan Aramaic",
    "sm": "Samoan",
    "sco": "Scots",
    "gd": "Scottish Gaelic",
    "sly": "Selayar",
    "sel": "Selkup",
    "seh": "Sena",
    "see": "Seneca",
    "sr": "Serbian",
    "sh": "Serbo-Croatian",
    "srr": "Serer",
    "sei": "Seri",
    "ksb": "Shambala",
    "shn": "Shan",
    "sn": "Shona",
    "ii": "Sichuan Yi",
    "scn": "Sicilian",
    "sid": "Sidamo",
    "bla": "Siksika",
    "szl": "Silesian",
    "zh_Hans": "Simplified Chinese",
    "sd": "Sindhi",
    "si": "Sinhala",
    "sms": "Skolt Sami",
    "den": "Slave",
    "sk": "Slovak",
    "sl": "Slovenian",
    "xog": "Soga",
    "sog": "Sogdien",
    "so": "Somali",
    "snk": "Soninke",
    "ckb": "Sorani Kurdish",
    "azb": "South Azerbaijani",
    "nr": "South Ndebele",
    "alt": "Southern Altai",
    "sma": "Southern Sami",
    "st": "Southern Sotho",
    "es": "Spanish",
    "srn": "Sranan Tongo",
    "zgh": "Standard Moroccan Tamazight",
    "suk": "Sukuma",
    "sux": "Sumerian",
    "su": "Sundanese",
    "sus": "Susu",
    "sw": "Swahili",
    "ss": "Swati",
    "sv": "Swedish",
    "fr_CH": "Swiss French",
    "gsw": "Swiss German",
    "de_CH": "Swiss High German",
    "syr": "Syriac",
    "shi": "Tachelhit",
    "tl": "Tagalog",
    "ty": "Tahitian",
    "dav": "Taita",
    "tg": "Tajik",
    "tly": "Talysh",
    "tmh": "Tamashek",
    "ta": "Tamil",
    "trv": "Taroko",
    "twq": "Tasawaq",
    "tt": "Tatar",
    "te": "Telugu",
    "ter": "Tereno",
    "teo": "Teso",
    "tet": "Tetum",
    "th": "Thai",
    "bo": "Tibetan",
    "tig": "Tigre",
    "ti": "Tigrinya",
    "tem": "Timne",
    "tiv": "Tiv",
    "tli": "Tlingit",
    "tpi": "Tok Pisin",
    "tkl": "Tokelau",
    "to": "Tongan",
    "fit": "Tornedalen Finnish",
    "zh_Hant": "Traditional Chinese",
    "tkr": "Tsakhur",
    "tsd": "Tsakonian",
    "tsi": "Tsimshian",
    "ts": "Tsonga",
    "tn": "Tswana",
    "tcy": "Tulu",
    "tum": "Tumbuka",
    "aeb": "Tunisian Arabic",
    "tr": "Turkish",
    "tk": "Turkmen",
    "tru": "Turoyo",
    "tvl": "Tuvalu",
    "tyv": "Tuvinian",
    "tw": "Twi",
    "kcg": "Tyap",
    "udm": "Udmurt",
    "uga": "Ugaritic",
    "uk": "Ukrainian",
    "umb": "Umbundu",
    "und": "Unknown Language",
    "hsb": "Upper Sorbian",
    "ur": "Urdu",
    "ug": "Uyghur",
    "uz": "Uzbek",
    "vai": "Vai",
    "ve": "Venda",
    "vec": "Venetian",
    "vep": "Veps",
    "vi": "Vietnamese",
    "vo": "Volap\xFCk",
    "vro": "V\xF5ro",
    "vot": "Votic",
    "vun": "Vunjo",
    "wa": "Walloon",
    "wae": "Walser",
    "war": "Waray",
    "was": "Washo",
    "guc": "Wayuu",
    "cy": "Welsh",
    "vls": "West Flemish",
    "fy": "Western Frisian",
    "mrj": "Western Mari",
    "wal": "Wolaytta",
    "wo": "Wolof",
    "wuu": "Wu Chinese",
    "xh": "Xhosa",
    "hsn": "Xiang Chinese",
    "yav": "Yangben",
    "yao": "Yao",
    "yap": "Yapese",
    "ybb": "Yemba",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "zap": "Zapotec",
    "dje": "Zarma",
    "zza": "Zaza",
    "zea": "Zeelandic",
    "zen": "Zenaga",
    "za": "Zhuang",
    "gbz": "Zoroastrian Dari",
    "zu": "Zulu",
    "zun": "Zuni"
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/ca/ca.utils.js":
/*!******************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/ca/ca.utils.js ***!
  \******************************************************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_store__ = __webpack_require__(/*! ../main/store */ "./src/AppBundle/Resources/public/javascript/main/store.js");
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Created by JuanCruz on 4/1/2018.
 */




window.ContentArena = window.ContentArena || {};
ContentArena.Utils = {
    contentParserFromServer: function contentParserFromServer(content) {

        if (content.parsed) return content;

        var sort = true;

        if (content.extraData) {
            Object.entries(content.extraData).forEach(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                return content[key] = value;
            });
        }

        content.tournament = content.tournament ? Array.isArray(content.tournament) ? content.tournament : [content.tournament] : [];
        content.sportCategory = content.sportCategory ? Array.isArray(content.sportCategory) ? content.sportCategory : [content.sportCategory] : [];

        if (content.selectedRightsBySuperRight) {
            content.rightsPackage.forEach(function (rp) {
                rp.selectedRights = content.selectedRightsBySuperRight[rp.id]['items'];
                rp.exclusive = content.selectedRightsBySuperRight[rp.id]['exclusive'];
            });
        }

        if (content.fixturesBySeason) {
            content.seasons.forEach(function (s, i) {
                s.fixtures = content.fixturesBySeason[i];
            });
        }

        if (content.law) {
            content.law.label = content.law.name;
            content.law.value = content.law.name;
        }

        if (content.customBundles) {
            content.customBundles.forEach(function (sp) {
                if (sp.salesMethod) sp.salesMethod = sp.salesMethod.name;
                if (sp.excludedCountries) sp.excludedTerritories = sp.excludedCountries.map(function (t) {
                    return { label: t.name, value: t.name, regions: t.regions, territoryId: t.territoryId };
                });
                if (sp.territories) sp.territories = sp.territories.map(function (t) {
                    return { name: t.name, label: t.name, value: t.name, regions: t.regions, territoryId: t.territoryId };
                });
                if (!sp.territories) sort = false;

                try {
                    if (sp.installments) {
                        sp.installments.forEach(function (i) {
                            if (i.date) i.date = __WEBPACK_IMPORTED_MODULE_0_moment___default()(i.date);
                        });
                    }
                } catch (e) {}
            });
        }

        if (content.salesPackages) {
            content.salesPackages.forEach(function (sp) {
                if (sp.salesMethod) sp.salesMethod = sp.salesMethod.name;
                if (sp.excludedCountries) sp.excludedTerritories = sp.excludedCountries.map(function (t) {
                    return { label: t.name, value: t.name, regions: t.regions, territoryId: t.territoryId };
                });
                if (sp.territories) sp.territories = sp.territories.map(function (t) {
                    return { label: t.name, value: t.name, regions: t.regions, territoryId: t.territoryId };
                });
                if (!sp.territories) sort = false;

                try {
                    if (sp.installments) {
                        sp.installments.forEach(function (i) {
                            if (i.date) i.date = __WEBPACK_IMPORTED_MODULE_0_moment___default()(i.date);
                        });
                    }
                } catch (e) {}
            });
            if (sort) content.salesPackages.sort(this.sortSalesPackages).reverse();
        }

        if (content.endDate) content.endDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(content.endDate);
        if (content.startDate) content.startDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(content.startDate);
        if (content.signature) content.signature = hosturl + content.signature;

        content.step = Number(content.step);
        content.customSeasons = content.seasons.filter(function (s) {
            return s.externalId && s.externalId.startsWith("ca:");
        }).map(function (s, i) {
            var years = void 0;
            if (s.year) {
                years = s.year.split("/");
                s.from = years.length === 1 ? years[0] : 2000 + Number(years[0]);
                s.to = years.length === 1 ? null : 2000 + Number(years[1]);
            }

            if (content.fixturesBySeason) {
                s.fixtures = content.fixturesBySeason[i];
            }
            return s;
        });

        content.seasons = content.seasons.map(function (s) {
            if (s.externalId && s.externalId.startsWith("ca:")) {
                s.custom = true;
            }

            if (content.extraData && content.extraData.seasonDurations) {
                var customSeasonDur = content.extraData.seasonDurations[s.externalId];

                if (customSeasonDur) {
                    s.customStartDate = customSeasonDur.startDate;
                    s.customEndDate = customSeasonDur.endDate;
                }
            }

            return s;
        });

        var user = __WEBPACK_IMPORTED_MODULE_1__main_store__["a" /* default */].getState().user;

        if (!content.signatureName) content.signatureName = user.firstName + " " + user.lastName;
        if (!content.signaturePosition) content.signaturePosition = user.title;

        content.parsed = true;

        return content;
    },
    filterCompanyInfo: function filterCompanyInfo(data) {

        var company = {};

        company.legalName = data.legalName;
        company.registrationNumber = data.registrationNumber;
        company.vat = data.vat;
        company.address = data.address;
        company.address2 = data.address2;
        company.city = data.city;
        company.zip = data.zip;
        company.country = data.country;

        return company;
    },
    sortSalesPackages: function sortSalesPackages(a, b) {
        var c = function c(a, b) {
            return a > b ? 1 : b > a ? -1 : 0;
        };
        return c(a.territories.length, b.territories.length) || c(b.name, a.name);
    },
    isAPIAvailable: function isAPIAvailable() {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
            return true;
        } else {
            // source: File API availability - http://caniuse.com/#feat=fileapi
            // source: <output> availability - http://html5doctor.com/the-output-element/
            document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
            // 6.0 File API & 13.0 <output>
            document.writeln(' - Google Chrome: 13.0 or later<br />');
            // 3.6 File API & 6.0 <output>
            document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
            // 10.0 File API & 10.0 <output>
            document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
            // ? File API & 5.1 <output>
            document.writeln(' - Safari: Not supported<br />');
            // ? File API & 9.2 <output>
            document.writeln(' - Opera: Not supported');
            return false;
        }
    },
    addOrdinal: function addOrdinal(n) {
        var str = n.toString().slice(-1),
            ord = '';
        switch (str) {
            case '1':
                ord = 'st';
                break;
            case '2':
                ord = 'nd';
                break;
            case '3':
                ord = 'rd';
                break;
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                ord = 'th';
                break;
        }
        return n + ord;
    },

    /**
     *
     * @param value
     * @param arr
     * @param prop
     * @returns {number}
     */
    getIndex: function getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    },
    getWebsiteURl: function getWebsiteURl(str) {
        if (str.includes('http://') || str.includes('https://')) {
            return str;
        } else {
            return 'http://' + str;
        }
    },
    isListingPublished: function isListingPublished(status) {
        return status && (status.name === "APPROVED" || status.name === "PENDING" || status.name === "EDITED");
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/common/constants.js":
/*!***********************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/common/constants.js ***!
  \***********************************************************************/
/*! exports provided: DATE_FORMAT, SERVER_DATE_TIME_FORMAT, TIME_FORMAT, YEAR_FORMAT, DATE_TIME_FORMAT, CONTENT_LISTING_VIEW, LISTING_SORT_OPTIONS, LOGIN_VIEW_TYPE, SIGN_UP_FIELDS, LANDING_LINKS, API_URLS, SITE_URLS, REGIONS_ENUMS */
/*! exports used: API_URLS, CONTENT_LISTING_VIEW, DATE_FORMAT, DATE_TIME_FORMAT, LANDING_LINKS, LISTING_SORT_OPTIONS, LOGIN_VIEW_TYPE, REGIONS_ENUMS, SERVER_DATE_TIME_FORMAT, SIGN_UP_FIELDS, SITE_URLS, TIME_FORMAT, YEAR_FORMAT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DATE_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SERVER_DATE_TIME_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return TIME_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return YEAR_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DATE_TIME_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CONTENT_LISTING_VIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return LISTING_SORT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return LOGIN_VIEW_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return SIGN_UP_FIELDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return LANDING_LINKS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return API_URLS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return SITE_URLS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return REGIONS_ENUMS; });
var DATE_FORMAT = 'DD.MM.YYYY';
var SERVER_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
var TIME_FORMAT = 'HH:mm';
var YEAR_FORMAT = 'YYYY';
var DATE_TIME_FORMAT = DATE_FORMAT + ' ' + TIME_FORMAT;
var CONTENT_LISTING_VIEW = {
    LIST: 'list',
    TABLE: 'table'
};

var LISTING_SORT_OPTIONS = {
    PUBLISH_DATE: 'publishing',
    UPCOMING_EVENT: 'upcoming',
    /*EVENT_DATE: 'event',*/
    EXPIRY_DATE: 'expiry'
};

var LOGIN_VIEW_TYPE = {
    LANDING: 'landing',
    LOGIN: 'login',
    RECOVER: 'recover',
    REVIEW: 'review',
    REGISTRATION: 'registration',
    REGISTERED: 'registered',
    RESET_PASSWORD: 'reset_password'
};

var SIGN_UP_FIELDS = {
    NAME: 'name',
    LAST_NAME: 'lastName',
    EMAIL: 'email',
    COMPANY: 'company'
};

var LANDING_LINKS = {
    PRIVACY: "https://contentarena.com/web/privacy-policy/",
    TERMS: "https://contentarena.com/web/terms-of-use/",
    FAQ: "https://contentarena.com/web/faq/",
    COOKIE: "https://contentarena.com/web/cookie-policy/",
    HOME: "https://contentarena.com/"
};

var API_URLS = {
    INVITE_USERS: "api/company/invite"
};

var SITE_URLS = {
    HOME_URL: "https://www.contentarena.com"
};

var REGIONS_ENUMS = {
    "Algeria": "DZA",
    "Angola": "AGO",
    "Benin": "BEN",
    "Botswana": "BWA",
    "Burkina Faso": "BFA",
    "Burundi": "BDI",
    "Cameroon": "CMR",
    "Cabo Verde": "CPV",
    "Central African Republic": "CAF",
    "Chad": "TCD",
    "Comoros": "COM",
    "Congo": "COG",
    "Congo (Democratic Republic of the)": "COD",
    "Côte d'Ivoire": "CIV",
    "Djibouti": "DJI",
    "Egypt": "EGY",
    "Equatorial Guinea": "GNQ",
    "Eritrea": "ERI",
    "Ethiopia": "ETH",
    "Gabon": "GAB",
    "Gambia": "GMB",
    "Ghana": "GHA",
    "Guinea": "GIN",
    "Guinea-Bissau": "GNB",
    "Kenya": "KEN",
    "Lesotho": "LSO",
    "Liberia": "LBR",
    "Libya": "LBY",
    "Madagascar": "MDG",
    "Malawi": "MWI",
    "Mali": "MLI",
    "Mauritania": "MRT",
    "Mauritius": "MUS",
    "Mayotte": "MYT",
    "Morocco": "MAR",
    "Mozambique": "MOZ",
    "Namibia": "NAM",
    "Niger": "NER",
    "Nigeria": "NGA",
    "Réunion": "REU",
    "Rwanda": "RWA",
    "Saint Helena, Ascension and Tristan da Cunha": "SHN",
    "Sao Tome and Principe": "STP",
    "Senegal": "SEN",
    "Seychelles": "SYC",
    "Sierra Leone": "SLE",
    "Somalia": "SOM",
    "South Africa": "ZAF",
    "South Sudan": "SSD",
    "Sudan": "SDN",
    "Swaziland": "SWZ",
    "Tanzania, United Republic of": "TZA",
    "Togo": "TGO",
    "Tunisia": "TUN",
    "Uganda": "UGA",
    "Western Sahara": "ESH",
    "Zambia": "ZMB",
    "Zimbabwe": "ZWE",
    "American Samoa": "ASM",
    "Australia": "AUS",
    "Cook Islands": "COK",
    "Fiji": "FJI",
    "French Polynesia": "PYF",
    "Guam": "GUM",
    "Kiribati": "KIR",
    "Marshall Islands": "MHL",
    "Micronesia (Federated States of)": "FSM",
    "Nauru": "NRU",
    "New Caledonia": "NCL",
    "New Zealand": "NZL",
    "Niue": "NIU",
    "Norfolk Island": "NFK",
    "Northern Mariana Islands": "MNP",
    "Palau": "PLW",
    "Papua New Guinea": "PNG",
    "Pitcairn": "PCN",
    "Samoa": "WSM",
    "Solomon Islands": "SLB",
    "Tokelau": "TKL",
    "Tonga": "TON",
    "Tuvalu": "TUV",
    "Vanuatu": "VUT",
    "Wallis and Futuna": "WLF",
    "Anguilla": "AIA",
    "Antigua and Barbuda": "ATG",
    "Argentina": "ARG",
    "Aruba": "ABW",
    "Bahamas": "BHS",
    "Barbados": "BRB",
    "Belize": "BLZ",
    "Bermuda": "BMU",
    "Bolivia (Plurinational State of)": "BOL",
    "Bonaire, Sint Eustatius and Saba": "BES",
    "Brazil": "BRA",
    "Canada": "CAN",
    "Cayman Islands": "CYM",
    "Chile": "CHL",
    "Colombia": "COL",
    "Costa Rica": "CRI",
    "Cuba": "CUB",
    "Curaçao": "CUW",
    "Dominica": "DMA",
    "Dominican Republic": "DOM",
    "Ecuador": "ECU",
    "El Salvador": "SLV",
    "Falkland Islands (Malvinas)": "FLK",
    "French Guiana": "GUF",
    "Greenland": "GRL",
    "Grenada": "GRD",
    "Guadeloupe": "GLP",
    "Guatemala": "GTM",
    "Guyana": "GUY",
    "Haiti": "HTI",
    "Honduras": "HND",
    "Jamaica": "JAM",
    "Martinique": "MTQ",
    "Mexico": "MEX",
    "Montserrat": "MSR",
    "Nicaragua": "NIC",
    "Panama": "PAN",
    "Paraguay": "PRY",
    "Peru": "PER",
    "Puerto Rico": "PRI",
    "Saint Barthélemy": "BLM",
    "Saint Kitts and Nevis": "KNA",
    "Saint Lucia": "LCA",
    "Saint Martin (French part)": "MAF",
    "Saint Pierre and Miquelon": "SPM",
    "Saint Vincent and the Grenadines": "VCT",
    "Sint Maarten (Dutch part)": "SXM",
    "Suriname": "SUR",
    "Trinidad and Tobago": "TTO",
    "Turks and Caicos Islands": "TCA",
    "USA": "USA",
    "Uruguay": "URY",
    "Venezuela (Bolivarian Republic of)": "VEN",
    "Virgin Islands (British)": "VGB",
    "Virgin Islands (U.S.)": "VIR",
    "Afghanistan": "AFG",
    "Armenia": "ARM",
    "Azerbaijan": "AZE",
    "Bahrain": "BHR",
    "Bangladesh": "BGD",
    "Bhutan": "BTN",
    "Brunei Darussalam": "BRN",
    "Cambodia": "KHM",
    "China": "CHN",
    "Cyprus": "CYP",
    "Georgia": "GEO",
    "Hong Kong": "HKG",
    "India": "IND",
    "Indonesia": "IDN",
    "Iran (Islamic Republic of)": "IRN",
    "Iraq": "IRQ",
    "Israel": "ISR",
    "Japan": "JPN",
    "Jordan": "JOR",
    "Kazakhstan": "KAZ",
    "Korea (Democratic People's Republic of)": "PRK",
    "Korea (Republic of)": "KOR",
    "Kuwait": "KWT",
    "Kyrgyzstan": "KGZ",
    "Lao People's Democratic Republic": "LAO",
    "Lebanon": "LBN",
    "Macao": "MAC",
    "Malaysia": "MYS",
    "Maldives": "MDV",
    "Mongolia": "MNG",
    "Myanmar": "MMR",
    "Nepal": "NPL",
    "Oman": "OMN",
    "Pakistan": "PAK",
    "Palestine, State of": "PSE",
    "Philippines": "PHL",
    "Qatar": "QAT",
    "Saudi Arabia": "SAU",
    "Singapore": "SGP",
    "Sri Lanka": "LKA",
    "Syrian Arab Republic": "SYR",
    "Taiwan, Province of China": "TWN",
    "Tajikistan": "TJK",
    "Thailand": "THA",
    "Timor-Leste": "TLS",
    "Turkey": "TUR",
    "Turkmenistan": "TKM",
    "United Arab Emirates": "ARE",
    "Uzbekistan": "UZB",
    "Viet Nam": "VNM",
    "Yemen": "YEM",
    "Åland Islands": "ALA",
    "Albania": "ALB",
    "Andorra": "AND",
    "Austria": "AUT",
    "Belarus": "BLR",
    "Belgium": "BEL",
    "Bosnia and Herzegovina": "BIH",
    "Bulgaria": "BGR",
    "Croatia": "HRV",
    "Czech Republic": "CZE",
    "Denmark": "DNK",
    "Estonia": "EST",
    "Faroe Islands": "FRO",
    "Finland": "FIN",
    "France": "FRA",
    "Germany": "DEU",
    "Gibraltar": "GIB",
    "Greece": "GRC",
    "Guernsey": "GGY",
    "Holy See": "VAT",
    "Hungary": "HUN",
    "Iceland": "ISL",
    "Ireland": "IRL",
    "Isle of Man": "IMN",
    "Italy": "ITA",
    "Jersey": "JEY",
    "Latvia": "LVA",
    "Liechtenstein": "LIE",
    "Lithuania": "LTU",
    "Luxembourg": "LUX",
    "Macedonia (the former Yugoslav Republic of)": "MKD",
    "Malta": "MLT",
    "Moldova (Republic of)": "MDA",
    "Monaco": "MCO",
    "Montenegro": "MNE",
    "Netherlands": "NLD",
    "Norway": "NOR",
    "Poland": "POL",
    "Portugal": "PRT",
    "Romania": "ROU",
    "Russian Federation": "RUS",
    "San Marino": "SMR",
    "Serbia": "SRB",
    "Slovakia": "SVK",
    "Slovenia": "SVN",
    "Spain": "ESP",
    "Svalbard and Jan Mayen": "SJM",
    "Sweden": "SWE",
    "Switzerland": "CHE",
    "Ukraine": "UKR",
    "United Kingdom of Great Britain and Northern Ireland": "GBR",
    "England": "ENG",
    "Antarctica": "ATA",
    "Bouvet Island": "BVT",
    "British Indian Ocean Territory": "IOT",
    "Christmas Island": "CXR",
    "Cocos (Keeling) Islands": "CCK",
    "French Southern Territories": "ATF",
    "Heard Island and McDonald Islands": "HMD",
    "South Georgia and the South Sandwich Islands": "SGS",
    "United States Minor Outlying Islands": "UMI"
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/landing/reducers/landing.js":
/*!*******************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/landing/reducers/landing.js ***!
  \*******************************************************************************/
/*! exports provided: landingTypes, landing */
/*! exports used: landing, landingTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return landingTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return landing; });
var landingTypes = {
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    CLEAR_RESET_PASSWORD: 'CLEAR_RESET_PASSWORD',
    SET_REFERER_DATA: 'SET_REFERER_DATA'
};

var DEFAULT_STATE = {
    resetPasswordSuccess: false
};

var landing = function landing() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    var action = arguments[1];

    switch (action.type) {
        case landingTypes.RESET_PASSWORD_SUCCESS:
            return Object.assign({}, state, { resetPasswordSuccess: true });

        case landingTypes.CLEAR_RESET_PASSWORD:
            return Object.assign({}, state, { resetPasswordSuccess: false });

        case landingTypes.SET_REFERER_DATA:
            return Object.assign({}, state, { refererEmail: action.refererEmail, refererListingId: action.refererListingId });

        default:
            return DEFAULT_STATE;
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/LanguageSelector.js":
/*!***************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/LanguageSelector.js ***!
  \***************************************************************************************/
/*! exports provided: allValue, LanguageSelector */
/*! exports used: LanguageSelector, allValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return allValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguageSelector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_select__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_languages__ = __webpack_require__(/*! ../../../data/languages */ "./src/AppBundle/Resources/public/data/languages.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var allValue = {
    value: 'all',
    label: 'All local languages'
};

var LanguageSelector = function (_React$Component) {
    _inherits(LanguageSelector, _React$Component);

    function LanguageSelector(props) {
        _classCallCheck(this, LanguageSelector);

        var _this = _possibleConstructorReturn(this, (LanguageSelector.__proto__ || Object.getPrototypeOf(LanguageSelector)).call(this, props));

        _this.handleOnChange = function (selection) {
            var onChange = _this.props.onChange;

            var hasAll = !!selection.find(function (item) {
                return item.value === 'all';
            });
            var hasAllPrev = !!_this.prevSelection.find(function (item) {
                return item.value === 'all';
            });
            //const itemsChanged = selection.length !== this.prevSelection.length;

            if (hasAll) {
                if (hasAllPrev) {
                    // Remove All
                    selection = selection.filter(function (item) {
                        return item.value !== 'all';
                    });
                } else {
                    // Add All and remove others
                    selection = [allValue];
                }
            }

            _this.prevSelection = selection;

            onChange(selection);
        };

        _this.state = {};

        _this.prevSelection = props.value ? [].concat(_toConsumableArray(props.value)) : [];
        return _this;
    }

    _createClass(LanguageSelector, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                value = _props.value,
                _props$multi = _props.multi,
                multi = _props$multi === undefined ? true : _props$multi,
                placeholder = _props.placeholder;

            var realLanguages = Object.values(__WEBPACK_IMPORTED_MODULE_2__data_languages__["a" /* languages */]).map(function (i, k) {
                return { value: i.name, label: i.name };
            });
            var allLanguages = [allValue].concat(_toConsumableArray(realLanguages));

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_select__["default"], {
                name: 'form-field-name',
                onChange: this.handleOnChange,
                value: value,
                multi: multi,
                placeholder: placeholder,
                options: allLanguages
            });
        }
    }]);

    return LanguageSelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/reducers/common.js":
/*!***************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/reducers/common.js ***!
  \***************************************************************************/
/*! exports provided: commonTypes, common */
/*! exports used: common, commonTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return commonTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return common; });
var commonTypes = {
    GET_DEFAULT_RIGHTS_PACKAGE: 'GET_DEFAULT_RIGHTS_PACKAGE',
    SET_TOTAL_COUNTRIES: 'SET_TOTAL_COUNTRIES',
    SET_TEST_STAGE_MODE: 'SET_TEST_STAGE_MODE',
    SET_ENV_HOST_URL: 'SET_ENV_HOST_URL'
};

var commonDefault = {
    totalCountries: 240,
    testStageMode: false
};

var common = function common() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : commonDefault;
    var action = arguments[1];


    switch (action.type) {
        case commonTypes.GET_DEFAULT_RIGHTS_PACKAGE:
            return Object.assign({}, state, { defaultRightsPackage: action.defaultRightsPackage });
        case commonTypes.SET_TOTAL_COUNTRIES:
            return Object.assign({}, state, { totalCountries: action.totalCountries });
        case commonTypes.SET_TEST_STAGE_MODE:
            return Object.assign({}, state, { testStageMode: action.testStageMode });
        case commonTypes.SET_ENV_HOST_URL:
            return Object.assign({}, state, { envHostUrl: action.envHostUrl });
        default:
            return state;
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/reducers/user.js":
/*!*************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/reducers/user.js ***!
  \*************************************************************************/
/*! exports provided: userTypes, user */
/*! exports used: user, userTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return userTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return user; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var userTypes = {
    LOGOUT: 'LOGOUT',
    LOGIN: 'LOGIN',
    PROFILE: 'PROFILE',
    LOAD_USER_DATA: 'LOAD_USER_DATA'
};

var defaultUser = {
    profile: "SELLER"

};

var user = function user() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultUser;
    var action = arguments[1];


    switch (action.type) {
        case userTypes.LOGOUT:
            return Object.assign({}, state, defaultUser);
        case userTypes.LOGIN:
            return Object.assign({}, state, {
                email: action.email
            });
        case userTypes.PROFILE:
            return Object.assign({}, state, {
                profile: action.profile
            });
        case userTypes.LOAD_USER_DATA:
            return Object.assign({}, state, _extends({}, action.user));
        default:
            return state;
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/reducers/validation.js":
/*!*******************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/reducers/validation.js ***!
  \*******************************************************************************/
/*! exports provided: validationTypes, validation */
/*! exports used: validation, validationTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return validationTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return validation; });
var validationTypes = {
    ENABLE_VALIDATION: 'ENABLE_VALIDATION',
    DISABLE_VALIDATION: 'DISABLE_VALIDATION'
};

var validation = function validation() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var action = arguments[1];

    switch (action.type) {

        case validationTypes.ENABLE_VALIDATION:
            return true;

        case validationTypes.DISABLE_VALIDATION:
            return false;

        default:
            return state;
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/store.js":
/*!*****************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/store.js ***!
  \*****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_i18n__ = __webpack_require__(/*! redux-i18n */ "./node_modules/redux-i18n/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_i18n___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_i18n__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_thunk__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sell_reducers_content__ = __webpack_require__(/*! ../sell/reducers/content */ "./src/AppBundle/Resources/public/javascript/sell/reducers/content.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sell_reducers_selector__ = __webpack_require__(/*! ../sell/reducers/selector */ "./src/AppBundle/Resources/public/javascript/sell/reducers/selector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__buy_reducers_filter__ = __webpack_require__(/*! ../buy/reducers/filter */ "./src/AppBundle/Resources/public/javascript/buy/reducers/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__buy_reducers_marketplace__ = __webpack_require__(/*! ../buy/reducers/marketplace */ "./src/AppBundle/Resources/public/javascript/buy/reducers/marketplace.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__manage_reducers_manage__ = __webpack_require__(/*! ../manage/reducers/manage */ "./src/AppBundle/Resources/public/javascript/manage/reducers/manage.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__reducers_user__ = __webpack_require__(/*! ./reducers/user */ "./src/AppBundle/Resources/public/javascript/main/reducers/user.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__reducers_common__ = __webpack_require__(/*! ./reducers/common */ "./src/AppBundle/Resources/public/javascript/main/reducers/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__reducers_validation__ = __webpack_require__(/*! ./reducers/validation */ "./src/AppBundle/Resources/public/javascript/main/reducers/validation.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__landing_reducers_landing__ = __webpack_require__(/*! ./../landing/reducers/landing */ "./src/AppBundle/Resources/public/javascript/landing/reducers/landing.js");















var reducers = Object(__WEBPACK_IMPORTED_MODULE_1_redux__["combineReducers"])({
    content: __WEBPACK_IMPORTED_MODULE_4__sell_reducers_content__["a" /* content */],
    selector: __WEBPACK_IMPORTED_MODULE_5__sell_reducers_selector__["a" /* selector */],
    marketplace: __WEBPACK_IMPORTED_MODULE_7__buy_reducers_marketplace__["a" /* marketplace */],
    filter: __WEBPACK_IMPORTED_MODULE_6__buy_reducers_filter__["a" /* filter */],
    manage: __WEBPACK_IMPORTED_MODULE_8__manage_reducers_manage__["a" /* manage */],
    user: __WEBPACK_IMPORTED_MODULE_9__reducers_user__["a" /* user */],
    common: __WEBPACK_IMPORTED_MODULE_10__reducers_common__["a" /* common */],
    validation: __WEBPACK_IMPORTED_MODULE_11__reducers_validation__["a" /* validation */],
    landing: __WEBPACK_IMPORTED_MODULE_12__landing_reducers_landing__["a" /* landing */],
    i18nState: __WEBPACK_IMPORTED_MODULE_2_redux_i18n__["i18nState"]
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_redux__["createStore"])(reducers, Object(__WEBPACK_IMPORTED_MODULE_1_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_3_redux_thunk__["a" /* default */])));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/reducers/manage.js":
/*!*****************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/reducers/manage.js ***!
  \*****************************************************************************/
/*! exports provided: manageTypes, manage */
/*! exports used: manage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export manageTypes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return manage; });

var manageTypes = {
    TEST: 'TEST'
};

var manage = function manage() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        testItem: "manageReducer"

    };
    var action = arguments[1];


    switch (action.type) {
        case manageTypes.TEST:
            return Object.assign({}, state, {
                test: action.text,
                id: action.id
            });
        default:
            return state;
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/reducers/content.js":
/*!****************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/reducers/content.js ***!
  \****************************************************************************/
/*! exports provided: contentType, EmptyListing, content */
/*! exports used: content, contentType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return contentType; });
/* unused harmony export EmptyListing */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return content; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_max__ = __webpack_require__(/*! lodash/max */ "./node_modules/lodash/max.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_max___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_max__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_components_LanguageSelector__ = __webpack_require__(/*! ./../../main/components/LanguageSelector */ "./src/AppBundle/Resources/public/javascript/main/components/LanguageSelector.js");
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }




var contentType = {
    CONTENT_INIT: 'CONTENT_INIT',
    STEP_CHANGE_RESET: 'STEP_CHANGE_RESET',
    GO_TO_STEP: 'GO_TO_STEP',
    GO_TO_NEXT_STEP: 'GO_TO_NEXT_STEP',
    GO_TO_PREVIOUS_STEP: 'GO_TO_PREVIOUS_STEP',
    ADD_NEW: 'ADD_NEW',
    REMOVE_NEW: 'REMOVE_NEW',
    SUPER_RIGHTS_UPDATED: 'SUPER_RIGHTS_UPDATED',
    UPDATE_CONTENT_VALUE: 'UPDATE_CONTENT_VALUE',
    SELECT_TOURNAMENT: 'SELECT_TOURNAMENT',
    REMOVE_FROM_MULTIPLE: 'REMOVE_FROM_MULTIPLE',
    UPDATE_FROM_MULTIPLE: 'UPDATE_FROM_MULTIPLE',
    APPLY_SELECTION: 'APPLY_SELECTION',
    UPDATE_SALES_PACKAGES: 'UPDATE_SALES_PACKAGES',
    UPDATE_ATTACHMENTS: 'UPDATE_ATTACHMENTS',
    UPDATE_ANNEX: 'UPDATE_ANNEX',
    ADD_SALES_PACKAGES: 'ADD_SALES_PACKAGES',
    RESET: 'RESET',
    ALL_EPISODE_UPDATE_FLAG: 'UPDATE_ALL_EPISODES_FLAG'
};

var EmptyListing = {
    step: 1,
    maxStep: 1,
    rightsPackage: [],
    tournament: [],
    sportCategory: [],
    sports: [],
    seasons: [],
    customSeasons: [],
    salesPackages: [],
    customTournament: null,
    customCategory: null,
    description: '',
    programDescription: null,
    attachments: [],
    annex: [],
    endDateLimit: 30,
    counter: 0,
    currency: "EUR",
    startDateMode: "LICENSE",
    stepChange: false,
    vat: "no",
    NA_INPUT: 90,
    HL_INPUT: 5,
    LICENSED_LANGUAGES: [__WEBPACK_IMPORTED_MODULE_1__main_components_LanguageSelector__["b" /* allValue */]],
    PROGRAM_LANGUAGE: [],
    PROGRAM_SUBTITLES: [],
    PROGRAM_SCRIPT: [],
    EDIT_PROGRAM_DESCRIPTION_OPTIONAL: true,
    website: null,
    law: "English",
    image: null,
    imageBase64: null,
    tempData: {}
};

var content = function content() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EmptyListing;
    var action = arguments[1];


    var newState = {};

    switch (action.type) {
        case contentType.RESET:
            return Object.assign({}, state, EmptyListing);
        case contentType.CONTENT_INIT:
            action.content.initialized = true;
            return Object.assign({}, state, action.content, { maxStep: __WEBPACK_IMPORTED_MODULE_0_lodash_max___default()([action.content.maxStep, state.maxStep]) });
        case contentType.ALL_EPISODE_UPDATE_FLAG:
            return Object.assign({}, state, { EDIT_PROGRAM_DESCRIPTION_OPTIONAL: action.payload });
        case contentType.GO_TO_NEXT_STEP:
            var newStep = state.step + 1;
            return Object.assign({}, state, {
                step: newStep,
                stepChange: true,
                maxStep: __WEBPACK_IMPORTED_MODULE_0_lodash_max___default()([newStep, state.maxStep])
            });
        case contentType.GO_TO_STEP:
            return Object.assign({}, state, {
                step: action.step,
                stepChange: true,
                maxStep: __WEBPACK_IMPORTED_MODULE_0_lodash_max___default()([action.step, state.maxStep])
            });
        case contentType.STEP_CHANGE_RESET:
            return Object.assign({}, state, {
                stepChange: false
            });
        case contentType.GO_TO_PREVIOUS_STEP:
            return Object.assign({}, state, {
                step: state.step - 1,
                stepChange: true
            });
        case contentType.REMOVE_NEW:
            newState = {};
            newState[action.selectorType] = [].concat(_toConsumableArray(state[action.selectorType]));
            newState[action.selectorType].splice(action.index, 1);

            return Object.assign({}, state, newState);
        case contentType.ADD_NEW:
            newState = {};
            newState[action.selectorType] = [].concat(_toConsumableArray(state[action.selectorType]));
            newState[action.selectorType][action.index] = {
                custom: true,
                name: ""
            };

            if (action.clean) {
                action.clean.forEach(function (selectorType) {
                    newState[selectorType] = $.isArray(state[selectorType]) ? [] : null;
                });
            }

            return Object.assign({}, state, newState);
        case contentType.UPDATE_CONTENT_VALUE:
            newState = {};
            newState[action.key] = action.value;
            newState.listingEdited = true;

            return Object.assign({}, state, newState);
        case contentType.SELECT_TOURNAMENT:
            newState = {};
            newState.tournament = [action.tournament];
            newState.sports = action.tournament.sport ? [action.tournament.sport] : [];
            newState.sportCategory = [action.tournament.sportCategory];

            return Object.assign({}, state, newState);
        case contentType.APPLY_SELECTION:

            newState = {};

            var selectedItems = Array.from(action.selectedItems.values());

            newState[action.selectorType] = [].concat(_toConsumableArray(state[action.selectorType]));

            if (action.multiple) {
                newState[action.selectorType] = selectedItems;
            } else {
                newState[action.selectorType][action.index] = selectedItems[0];
            }

            if (action.clean) {
                action.clean.forEach(function (selectorType) {
                    newState[selectorType] = $.isArray(state[selectorType]) ? [] : null;
                });
            }

            return Object.assign({}, state, newState);
        case contentType.REMOVE_FROM_MULTIPLE:
            newState = {};
            newState[action.selectorType] = [].concat(_toConsumableArray(state[action.selectorType]));
            newState[action.selectorType].splice(action.index, 1);
            return Object.assign({}, state, newState);
        case contentType.UPDATE_FROM_MULTIPLE:
            newState = {};
            newState[action.selectorType] = [].concat(_toConsumableArray(state[action.selectorType]));
            newState[action.selectorType][action.index][action.key] = action.value;
            return Object.assign({}, state, newState);
        case contentType.SUPER_RIGHTS_UPDATED:
            return Object.assign({}, state, {
                rightsPackage: Array.from(action.rightsPackage.values())
            });
        case contentType.UPDATE_SALES_PACKAGES:

            var salesPackages = [].concat(_toConsumableArray(state.salesPackages));

            if (action.name === "remove") {

                if (salesPackages.length >= 1) {
                    salesPackages.splice(action.index, 1);
                }
            }

            if (action.name === "removeAll") {
                salesPackages = [];
            }

            if (action.name === "save") salesPackages[action.index] = action.salesPackage;

            return Object.assign({}, state, {
                salesPackages: salesPackages
            });

        case contentType.UPDATE_ATTACHMENTS:

            var attachments = [].concat(_toConsumableArray(state.attachments));

            if (action.name === "remove") {

                if (attachments.length >= 1) {
                    attachments.splice(action.index, 1);
                }
            }

            if (action.name === "removeAll") {
                attachments = [];
            }

            if (action.name === "save") attachments[action.index] = action.value;

            return Object.assign({}, state, {
                attachments: attachments
            });

        case contentType.UPDATE_ANNEX:

            var annex = [].concat(_toConsumableArray(state.annex));

            if (action.name === "remove") {

                if (annex.length >= 1) {
                    annex.splice(action.index, 1);
                }
            }

            if (action.name === "removeAll") {
                annex = [];
            }

            if (action.name === "save") annex[action.index] = action.value;

            return Object.assign({}, state, {
                annex: annex
            });

        case contentType.ADD_SALES_PACKAGES:
            return Object.assign({}, state, {
                salesPackages: [].concat(_toConsumableArray(state.salesPackages), _toConsumableArray(action.salesPackages))
            });

        default:
            return state;
    }
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/reducers/selector.js":
/*!*****************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/reducers/selector.js ***!
  \*****************************************************************************/
/*! exports provided: selectorType, selector */
/*! exports used: selector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export selectorType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selector; });
var selectorType = {
    TEST: 'TEST',
    OPEN_SELECTOR: 'OPEN_SELECTOR',
    CLOSE_SELECTOR: 'CLOSE_SELECTOR',
    APPLY_SELECTION: 'APPLY_SELECTION'
};

var selector = function selector() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        type: "sport",
        open: false,
        selectorItems: [],
        popularItems: []

    };
    var action = arguments[1];


    switch (action.type) {
        case selectorType.TEST:
            return Object.assign({}, state, {
                open: true
            });
        case selectorType.OPEN_SELECTOR:
            return Object.assign({}, state, {
                selectorType: action.selectorType,
                open: true,
                index: action.index,
                selectorItems: action.selectorItems,
                popularItems: action.popularItems,
                activeFilter: action.activeFilter,
                multiple: action.multiple,
                disabled: action.disabled,
                showNewSport: action.showNewSport,
                showNewTournament: action.showNewTournament,
                showNewCategory: action.showNewCategory,
                showNewSeason: action.showNewSeason,
                showAllCountries: action.showAllCountries,
                clean: action.clean,
                selectedItems: action.selectedItems
            });
        case selectorType.CLOSE_SELECTOR:
            return Object.assign({}, state, {
                selectorType: "",
                open: false,
                selectorItems: [],
                popularItems: []
            });
        case selectorType.APPLY_SELECTION:
            return Object.assign({}, state, {
                selectorType: "",
                open: false,
                selectorItems: [],
                popularItems: []
            });
        default:
            return state;
    }
};

/***/ }),

/***/ 1:
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./src/AppBundle/Resources/public/javascript/ca/ca.api.js ./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js ./src/AppBundle/Resources/public/javascript/ca/ca.data.js ./src/AppBundle/Resources/public/javascript/ca/ca.utils.js ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.api.js */"./src/AppBundle/Resources/public/javascript/ca/ca.api.js");
__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js */"./src/AppBundle/Resources/public/javascript/ca/ca.api.content.js");
__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.data.js */"./src/AppBundle/Resources/public/javascript/ca/ca.data.js");
module.exports = __webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/ca/ca.utils.js */"./src/AppBundle/Resources/public/javascript/ca/ca.utils.js");


/***/ })

},[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL21heC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvZGF0YS9sYW5ndWFnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmNvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY29tbW9uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9sYW5kaW5nL3JlZHVjZXJzL2xhbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0xhbmd1YWdlU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy91c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vcmVkdWNlcnMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9yZWR1Y2Vycy9tYW5hZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvc2VsZWN0b3IuanMiXSwibmFtZXMiOlsibGFuZ3VhZ2VzIiwiZmlsdGVyVHlwZXMiLCJBRERfUklHSFQiLCJSRU1PVkVfUklHSFQiLCJVUERBVEVfQ09VTlRSSUVTIiwiVVBEQVRFX0VYQ0xVU0lWRSIsIlVQREFURV9JTkNMVURFRF9DT1VOVFJJRVMiLCJVUERBVEVfU1BPUlQiLCJVUERBVEVfRVZFTlQiLCJDTEVBUiIsIkNMRUFSX1VQREFURSIsIlVQREFURV9NQU5ZIiwiVVBEQVRFX0ZJTFRFUlNfQ09ORklHIiwiVVBEQVRFX0VWRU5UX0RBVEVfRlJPTV9UTyIsIlVQREFURV9MSVNUX1ZJRVciLCJkZWZhdWx0RmlsdGVyIiwicmlnaHRzIiwiY291bnRyaWVzIiwiZXhjbHVzaXZlIiwiaW5jbHVkZUFsbENvdW50cmllcyIsInNwb3J0IiwidmFsdWUiLCJsYWJlbCIsImV2ZW50IiwiZm9yY2VVcGRhdGUiLCJldmVudERhdGVGcm9tIiwiZXZlbnREYXRlVG8iLCJsaXN0VHlwZSIsIkNPTlRFTlRfTElTVElOR19WSUVXIiwiTElTVCIsImZpbHRlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsIk9iamVjdCIsImFzc2lnbiIsImlkIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwibWFwIiwiYyIsImZyb20iLCJ0byIsImZpbHRlcnMiLCJOdW1iZXIiLCJyIiwibWFya2V0cGxhY2VUeXBlcyIsIkZFVENIX0xJU1RJTkdfUkVRVUVTVCIsIkZFVENIX0xJU1RJTkdfRVJST1IiLCJGRVRDSF9MSVNUSU5HX1NVQ0NFU1MiLCJpbml0aWFsU3RhdGUiLCJsaXN0aW5nc0RhdGEiLCJzdWNjZXNzIiwibG9hZGluZyIsImVycm9yIiwibGlzdGluZ3MiLCJ0b3RhbEl0ZW1zIiwibWFya2V0cGxhY2UiLCJ1cGRhdGVMaXN0aW5ncyIsIl9fYXBpU3RvcmUiLCJ0b3VybmFtZW50cyIsIndpbmRvdyIsIkNvbnRlbnRBcmVuYSIsIkNvbnRlbnRBcGkiLCJzYXZlQ29udGVudEFzRHJhZnQiLCJjb250ZW50IiwiZGVmZXJyZWQiLCJqUXVlcnkiLCJEZWZlcnJlZCIsIl90aGlzIiwiJCIsImFqYXgiLCJ1cmwiLCJlbnZob3N0dXJsIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInJlc3BvbnNlIiwicmVzb2x2ZSIsInN0YXR1cyIsInJlamVjdCIsInByb21pc2UiLCJzYXZlQ29udGVudEFzSW5hY3RpdmUiLCJzYXZlQ29udGVudEFzQWN0aXZlIiwicmVwdWJsaXNoTGlzdGluZyIsImN1c3RvbUlkIiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwiZ2V0VXNlckluZm8iLCJnZXRVc2VySW5mb0J5QWN0aXZhdGlvbkNvZGUiLCJhY3RpdmF0aW9uQ29kZSIsImdldENvbXBhbnlVc2VycyIsInVwZGF0ZUNvbXBhbnkiLCJjb21wYW55IiwidXBkYXRlUGFzc3dvcmQiLCJ1cGRhdGVVc2VyIiwidXNlciIsImFjdGl2YXRlVXNlciIsInBhc3N3b3JkIiwidXBkYXRlVXNlclByb2ZpbGUiLCJwcm9maWxlIiwiZ2V0VGhyZWFkIiwiZ2V0VGhyZWFkcyIsInBsYWNlQmlkIiwiYmlkIiwicGxhY2VCaWRzIiwiYWNjZXB0QmlkIiwic2lnbmF0dXJlIiwic2lnbmF0dXJlTmFtZSIsInNpZ25hdHVyZVBvc2l0aW9uIiwicmVqZWN0QmlkIiwicmVtb3ZlQmlkIiwic2F2ZVRtcEZpbGUiLCJmaWxlcyIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicHJvY2Vzc0RhdGEiLCJzYXZlQXR0YWNobWVudEZpbGUiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlQXR0YWNobWVudEZpbGUiLCJmaWxlIiwiZ2V0QnlDdXN0b21JZCIsImdldERyYWZ0TGlzdGluZ3MiLCJnZXRJbmFjdGl2ZUxpc3RpbmdzIiwiZ2V0QWN0aXZlTGlzdGluZ3MiLCJnZXRFeHBpcmVkTGlzdGluZ3MiLCJyZW1vdmVMaXN0aW5nIiwiZHVwbGljYXRlTGlzdGluZyIsImRlYWN0aXZhdGVMaXN0aW5nIiwiYXJjaGl2ZUxpc3RpbmciLCJnZXRDbG9zZWREZWFscyIsImdldEFsbERlYWxzIiwiZ2V0UGVuZGluZ0RlYWxzIiwiZ2V0UmVqZWN0ZWREZWFscyIsImdldFdhdGNobGlzdExpc3RpbmdzIiwiQXBpIiwic29ydEJ5TGFiZWwiLCJhIiwiYiIsIm5hbWUiLCJzb3J0QnlTcG9ydCIsInNwb3J0Q2F0ZWdvcnkiLCJwcmVwYXJlTGlzdCIsImxpc3QiLCJjYXRlZ29yeUlkIiwiaXRlbSIsImNhdGVnb3J5IiwiZXh0ZXJuYWxJZCIsInNvcnQiLCJmaWx0ZXJEb3VibGVzIiwic3BvcnRJZCIsIm5hbWVzIiwicmVwbGFjZSIsInB1c2giLCJnZXRDb21wYW55VGVybXMiLCJnZXRDb21wYW55RGVmaW5pdGlvbnMiLCJyZXN0b3JlQ29tcGFueVRlcm1zIiwicmVzdG9yZURlZmluaXRpb25zIiwidXBkYXRlVGVybXMiLCJ0ZXJtcyIsImRlZmluaXRpb25zIiwiZ2V0Q29udGVudCIsImdldEpzb25Db250ZW50Iiwic2F2ZUZpbHRlciIsImdldENvdW50cmllcyIsIkRhdGEiLCJDb3VudHJpZXMiLCJsZW5ndGgiLCJyZWdpb25zIiwiZ2V0QWN0aXZlU3BvcnRzIiwiZ2V0QWxsU3BvcnRzIiwiZmxhZ3MiLCJnZXRTcG9ydHNHcm91cHMiLCJnZXRDb3VudHJpZXNGdWxsIiwiZ2V0VGVycml0b3JpZXMiLCJnZXRSZWdpb25zIiwiZ2V0UmlnaHRzIiwicmlnaHRzUGFja2FnZSIsImdyb3VwIiwiZ2V0UmlnaHRzUGFja2FnZSIsImdldFNwb3J0cyIsImV4dGVybmFsQXBpVXJsIiwic3BvcnRzIiwiZ2V0Q29udGVudERldGFpbHMiLCJnZXRQZW5kaW5nTGlzdGluZ3MiLCJnZXRDYXRlZ29yaWVzIiwiY2F0cyIsImdldFRvdXJuYW1lbnRzIiwiZG9uZSIsInRvdXJuYW1lbnQiLCJzdG9yZWRSZXNwb25zZSIsInVuZGVmaW5lZCIsImdldFNlYXNvbnMiLCJ0b3VybmFtZW50SWQiLCJzZWFzb25zIiwic2Vhc29uIiwiaXNBcnJheSIsImVuZERhdGUiLCJlbmRfZGF0ZSIsInN0YXJ0RGF0ZSIsInN0YXJ0X2RhdGUiLCJ0b3VybmFtZW50X2lkIiwieWVhciIsInJldmVyc2UiLCJnZXRTY2hlZHVsZSIsInNlYXNvbklkIiwic3BvcnRfZXZlbnRzIiwic3BvcnRfZXZlbnQiLCJmb3JFYWNoIiwicm91bmQiLCJ0b3VybmFtZW50X3JvdW5kIiwibnVtYmVyIiwibWF0Y2hlcyIsIk1hcCIsInNldCIsInNjaGVkdWxlZCIsInRvdXJuYW1lbnRSb3VuZCIsImNvbXBldGl0b3JzIiwiY29tcGV0aXRvciIsInNlYXJjaENvbXBldGl0aW9uIiwicmVxdWVzdCIsInRyYWRpdGlvbmFsIiwiZGF0YVR5cGUiLCJ3YXRjaGxpc3QiLCJnZXROb3RpZmljYXRpb25zIiwiYXhpb3MiLCJnZXQiLCJtYXJrTm90aWZpY2F0aW9uQXNWaXNpdGVkIiwicG9zdCIsIm1hcmtOb3RpZmljYXRpb25Bc1NlZW4iLCJzaWduSW5Vc2VyIiwidXNlcm5hbWUiLCJyZWNvdmVyUGFzc3dvcmQiLCJlbWFpbCIsInJlc2V0UGFzc3dvcmQiLCJjb25maXJtYXRpb25Ub2tlbiIsInNpZ25VcFVzZXIiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImNvbXBhbnlMZWdhbE5hbWUiLCJMYW5ndWFnZXMiLCJUb3BTcG9ydHMiLCJGdWxsU3BvcnRzIiwiQWN0aXZlU3BvcnRzIiwiVGVycml0b3JpZXMiLCJSZWdpb25zIiwiU2hvcnQiLCJMb25nIiwiVXRpbHMiLCJjb250ZW50UGFyc2VyRnJvbVNlcnZlciIsInBhcnNlZCIsImV4dHJhRGF0YSIsImVudHJpZXMiLCJrZXkiLCJBcnJheSIsInNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0IiwicnAiLCJzZWxlY3RlZFJpZ2h0cyIsImZpeHR1cmVzQnlTZWFzb24iLCJzIiwiaSIsImZpeHR1cmVzIiwibGF3IiwiY3VzdG9tQnVuZGxlcyIsInNwIiwic2FsZXNNZXRob2QiLCJleGNsdWRlZENvdW50cmllcyIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJ0IiwidGVycml0b3J5SWQiLCJ0ZXJyaXRvcmllcyIsImluc3RhbGxtZW50cyIsImRhdGUiLCJtb21lbnQiLCJlIiwic2FsZXNQYWNrYWdlcyIsInNvcnRTYWxlc1BhY2thZ2VzIiwiaG9zdHVybCIsInN0ZXAiLCJjdXN0b21TZWFzb25zIiwic3RhcnRzV2l0aCIsInllYXJzIiwic3BsaXQiLCJjdXN0b20iLCJzZWFzb25EdXJhdGlvbnMiLCJjdXN0b21TZWFzb25EdXIiLCJjdXN0b21TdGFydERhdGUiLCJjdXN0b21FbmREYXRlIiwic3RvcmUiLCJnZXRTdGF0ZSIsInRpdGxlIiwiZmlsdGVyQ29tcGFueUluZm8iLCJsZWdhbE5hbWUiLCJyZWdpc3RyYXRpb25OdW1iZXIiLCJ2YXQiLCJhZGRyZXNzIiwiYWRkcmVzczIiLCJjaXR5IiwiemlwIiwiY291bnRyeSIsImlzQVBJQXZhaWxhYmxlIiwiRmlsZSIsIkZpbGVSZWFkZXIiLCJGaWxlTGlzdCIsIkJsb2IiLCJkb2N1bWVudCIsIndyaXRlbG4iLCJhZGRPcmRpbmFsIiwibiIsInN0ciIsInRvU3RyaW5nIiwic2xpY2UiLCJvcmQiLCJnZXRJbmRleCIsImFyciIsInByb3AiLCJnZXRXZWJzaXRlVVJsIiwiaW5jbHVkZXMiLCJpc0xpc3RpbmdQdWJsaXNoZWQiLCJEQVRFX0ZPUk1BVCIsIlNFUlZFUl9EQVRFX1RJTUVfRk9STUFUIiwiVElNRV9GT1JNQVQiLCJZRUFSX0ZPUk1BVCIsIkRBVEVfVElNRV9GT1JNQVQiLCJUQUJMRSIsIkxJU1RJTkdfU09SVF9PUFRJT05TIiwiUFVCTElTSF9EQVRFIiwiVVBDT01JTkdfRVZFTlQiLCJFWFBJUllfREFURSIsIkxPR0lOX1ZJRVdfVFlQRSIsIkxBTkRJTkciLCJMT0dJTiIsIlJFQ09WRVIiLCJSRVZJRVciLCJSRUdJU1RSQVRJT04iLCJSRUdJU1RFUkVEIiwiUkVTRVRfUEFTU1dPUkQiLCJTSUdOX1VQX0ZJRUxEUyIsIk5BTUUiLCJMQVNUX05BTUUiLCJFTUFJTCIsIkNPTVBBTlkiLCJMQU5ESU5HX0xJTktTIiwiUFJJVkFDWSIsIlRFUk1TIiwiRkFRIiwiQ09PS0lFIiwiSE9NRSIsIkFQSV9VUkxTIiwiSU5WSVRFX1VTRVJTIiwiU0lURV9VUkxTIiwiSE9NRV9VUkwiLCJSRUdJT05TX0VOVU1TIiwibGFuZGluZ1R5cGVzIiwiUkVTRVRfUEFTU1dPUkRfU1VDQ0VTUyIsIkNMRUFSX1JFU0VUX1BBU1NXT1JEIiwiU0VUX1JFRkVSRVJfREFUQSIsIkRFRkFVTFRfU1RBVEUiLCJyZXNldFBhc3N3b3JkU3VjY2VzcyIsImxhbmRpbmciLCJyZWZlcmVyRW1haWwiLCJyZWZlcmVyTGlzdGluZ0lkIiwiYWxsVmFsdWUiLCJMYW5ndWFnZVNlbGVjdG9yIiwicHJvcHMiLCJoYW5kbGVPbkNoYW5nZSIsInNlbGVjdGlvbiIsIm9uQ2hhbmdlIiwiaGFzQWxsIiwiZmluZCIsImhhc0FsbFByZXYiLCJwcmV2U2VsZWN0aW9uIiwibXVsdGkiLCJwbGFjZWhvbGRlciIsInJlYWxMYW5ndWFnZXMiLCJ2YWx1ZXMiLCJrIiwiYWxsTGFuZ3VhZ2VzIiwiUmVhY3QiLCJDb21wb25lbnQiLCJjb21tb25UeXBlcyIsIkdFVF9ERUZBVUxUX1JJR0hUU19QQUNLQUdFIiwiU0VUX1RPVEFMX0NPVU5UUklFUyIsIlNFVF9URVNUX1NUQUdFX01PREUiLCJTRVRfRU5WX0hPU1RfVVJMIiwiY29tbW9uRGVmYXVsdCIsInRvdGFsQ291bnRyaWVzIiwidGVzdFN0YWdlTW9kZSIsImNvbW1vbiIsImRlZmF1bHRSaWdodHNQYWNrYWdlIiwiZW52SG9zdFVybCIsInVzZXJUeXBlcyIsIkxPR09VVCIsIlBST0ZJTEUiLCJMT0FEX1VTRVJfREFUQSIsImRlZmF1bHRVc2VyIiwidmFsaWRhdGlvblR5cGVzIiwiRU5BQkxFX1ZBTElEQVRJT04iLCJESVNBQkxFX1ZBTElEQVRJT04iLCJ2YWxpZGF0aW9uIiwicmVkdWNlcnMiLCJjb21iaW5lUmVkdWNlcnMiLCJzZWxlY3RvciIsIm1hbmFnZSIsImkxOG5TdGF0ZSIsImNyZWF0ZVN0b3JlIiwiYXBwbHlNaWRkbGV3YXJlIiwibWFuYWdlVHlwZXMiLCJURVNUIiwidGVzdEl0ZW0iLCJ0ZXN0IiwidGV4dCIsIkNPTlRFTlRfSU5JVCIsIlNURVBfQ0hBTkdFX1JFU0VUIiwiR09fVE9fU1RFUCIsIkdPX1RPX05FWFRfU1RFUCIsIkdPX1RPX1BSRVZJT1VTX1NURVAiLCJBRERfTkVXIiwiUkVNT1ZFX05FVyIsIlNVUEVSX1JJR0hUU19VUERBVEVEIiwiVVBEQVRFX0NPTlRFTlRfVkFMVUUiLCJTRUxFQ1RfVE9VUk5BTUVOVCIsIlJFTU9WRV9GUk9NX01VTFRJUExFIiwiVVBEQVRFX0ZST01fTVVMVElQTEUiLCJBUFBMWV9TRUxFQ1RJT04iLCJVUERBVEVfU0FMRVNfUEFDS0FHRVMiLCJVUERBVEVfQVRUQUNITUVOVFMiLCJVUERBVEVfQU5ORVgiLCJBRERfU0FMRVNfUEFDS0FHRVMiLCJSRVNFVCIsIkFMTF9FUElTT0RFX1VQREFURV9GTEFHIiwiRW1wdHlMaXN0aW5nIiwibWF4U3RlcCIsImN1c3RvbVRvdXJuYW1lbnQiLCJjdXN0b21DYXRlZ29yeSIsImRlc2NyaXB0aW9uIiwicHJvZ3JhbURlc2NyaXB0aW9uIiwiYXR0YWNobWVudHMiLCJhbm5leCIsImVuZERhdGVMaW1pdCIsImNvdW50ZXIiLCJjdXJyZW5jeSIsInN0YXJ0RGF0ZU1vZGUiLCJzdGVwQ2hhbmdlIiwiTkFfSU5QVVQiLCJITF9JTlBVVCIsIkxJQ0VOU0VEX0xBTkdVQUdFUyIsIlBST0dSQU1fTEFOR1VBR0UiLCJQUk9HUkFNX1NVQlRJVExFUyIsIlBST0dSQU1fU0NSSVBUIiwiRURJVF9QUk9HUkFNX0RFU0NSSVBUSU9OX09QVElPTkFMIiwid2Vic2l0ZSIsImltYWdlIiwiaW1hZ2VCYXNlNjQiLCJ0ZW1wRGF0YSIsIm5ld1N0YXRlIiwiaW5pdGlhbGl6ZWQiLCJtYXgiLCJwYXlsb2FkIiwibmV3U3RlcCIsInNlbGVjdG9yVHlwZSIsImNsZWFuIiwibGlzdGluZ0VkaXRlZCIsInNlbGVjdGVkSXRlbXMiLCJtdWx0aXBsZSIsInNhbGVzUGFja2FnZSIsIk9QRU5fU0VMRUNUT1IiLCJDTE9TRV9TRUxFQ1RPUiIsIm9wZW4iLCJzZWxlY3Rvckl0ZW1zIiwicG9wdWxhckl0ZW1zIiwiYWN0aXZlRmlsdGVyIiwiZGlzYWJsZWQiLCJzaG93TmV3U3BvcnQiLCJzaG93TmV3VG91cm5hbWVudCIsInNob3dOZXdDYXRlZ29yeSIsInNob3dOZXdTZWFzb24iLCJzaG93QWxsQ291bnRyaWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkY7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QztBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Es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O0FBdENSO0FBd0NILENBaERNLEMiLCJmaWxlIjoiY2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcbnZhciBidG9hID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5idG9hICYmIHdpbmRvdy5idG9hLmJpbmQod2luZG93KSkgfHwgcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J0b2EnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgbG9hZEV2ZW50ID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG4gICAgdmFyIHhEb21haW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBJRSA4LzkgQ09SUyBzdXBwb3J0XG4gICAgLy8gT25seSBzdXBwb3J0cyBQT1NUIGFuZCBHRVQgY2FsbHMgYW5kIGRvZXNuJ3QgcmV0dXJucyB0aGUgcmVzcG9uc2UgaGVhZGVycy5cbiAgICAvLyBET04nVCBkbyB0aGlzIGZvciB0ZXN0aW5nIGIvYyBYTUxIdHRwUmVxdWVzdCBpcyBtb2NrZWQsIG5vdCBYRG9tYWluUmVxdWVzdC5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJlxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cuWERvbWFpblJlcXVlc3QgJiYgISgnd2l0aENyZWRlbnRpYWxzJyBpbiByZXF1ZXN0KSAmJlxuICAgICAgICAhaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IHdpbmRvdy5YRG9tYWluUmVxdWVzdCgpO1xuICAgICAgbG9hZEV2ZW50ID0gJ29ubG9hZCc7XG4gICAgICB4RG9tYWluID0gdHJ1ZTtcbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uIGhhbmRsZVByb2dyZXNzKCkge307XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7fTtcbiAgICB9XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0W2xvYWRFdmVudF0gPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQgJiYgIXhEb21haW4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIC8vIElFIHNlbmRzIDEyMjMgaW5zdGVhZCBvZiAyMDQgKGh0dHBzOi8vZ2l0aHViLmNvbS9heGlvcy9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi8uLi9kZWZhdWx0cycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICAgIHVybDogYXJndW1lbnRzWzBdXG4gICAgfSwgYXJndW1lbnRzWzFdKTtcbiAgfVxuXG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKGRlZmF1bHRzLCB7bWV0aG9kOiAnZ2V0J30sIHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHJldHVybiBlcnJvcjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBidG9hIHBvbHlmaWxsIGZvciBJRTwxMCBjb3VydGVzeSBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRjaGFtYmVycy9CYXNlNjQuanNcblxudmFyIGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcblxuZnVuY3Rpb24gRSgpIHtcbiAgdGhpcy5tZXNzYWdlID0gJ1N0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3Rlcic7XG59XG5FLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcbkUucHJvdG90eXBlLmNvZGUgPSA1O1xuRS5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5mdW5jdGlvbiBidG9hKGlucHV0KSB7XG4gIHZhciBzdHIgPSBTdHJpbmcoaW5wdXQpO1xuICB2YXIgb3V0cHV0ID0gJyc7XG4gIGZvciAoXG4gICAgLy8gaW5pdGlhbGl6ZSByZXN1bHQgYW5kIGNvdW50ZXJcbiAgICB2YXIgYmxvY2ssIGNoYXJDb2RlLCBpZHggPSAwLCBtYXAgPSBjaGFycztcbiAgICAvLyBpZiB0aGUgbmV4dCBzdHIgaW5kZXggZG9lcyBub3QgZXhpc3Q6XG4gICAgLy8gICBjaGFuZ2UgdGhlIG1hcHBpbmcgdGFibGUgdG8gXCI9XCJcbiAgICAvLyAgIGNoZWNrIGlmIGQgaGFzIG5vIGZyYWN0aW9uYWwgZGlnaXRzXG4gICAgc3RyLmNoYXJBdChpZHggfCAwKSB8fCAobWFwID0gJz0nLCBpZHggJSAxKTtcbiAgICAvLyBcIjggLSBpZHggJSAxICogOFwiIGdlbmVyYXRlcyB0aGUgc2VxdWVuY2UgMiwgNCwgNiwgOFxuICAgIG91dHB1dCArPSBtYXAuY2hhckF0KDYzICYgYmxvY2sgPj4gOCAtIGlkeCAlIDEgKiA4KVxuICApIHtcbiAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGlkeCArPSAzIC8gNCk7XG4gICAgaWYgKGNoYXJDb2RlID4gMHhGRikge1xuICAgICAgdGhyb3cgbmV3IEUoKTtcbiAgICB9XG4gICAgYmxvY2sgPSBibG9jayA8PCA4IHwgY2hhckNvZGU7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidG9hO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdmFyIG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKClcbik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIG1ldGhvZHMgbGlrZSBgXy5tYXhgIGFuZCBgXy5taW5gIHdoaWNoIGFjY2VwdHMgYVxuICogYGNvbXBhcmF0b3JgIHRvIGRldGVybWluZSB0aGUgZXh0cmVtdW0gdmFsdWUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyYXRvciBUaGUgY29tcGFyYXRvciB1c2VkIHRvIGNvbXBhcmUgdmFsdWVzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGV4dHJlbXVtIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlRXh0cmVtdW0oYXJyYXksIGl0ZXJhdGVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjdXJyZW50ID0gaXRlcmF0ZWUodmFsdWUpO1xuXG4gICAgaWYgKGN1cnJlbnQgIT0gbnVsbCAmJiAoY29tcHV0ZWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gKGN1cnJlbnQgPT09IGN1cnJlbnQgJiYgIWlzU3ltYm9sKGN1cnJlbnQpKVxuICAgICAgICAgIDogY29tcGFyYXRvcihjdXJyZW50LCBjb21wdXRlZClcbiAgICAgICAgKSkge1xuICAgICAgdmFyIGNvbXB1dGVkID0gY3VycmVudCxcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRXh0cmVtdW07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRXh0cmVtdW0uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXRUYWcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmd0YCB3aGljaCBkb2Vzbid0IGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZ3JlYXRlciB0aGFuIGBvdGhlcmAsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlR3QodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA+IG90aGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUd0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3ltYm9sO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzU3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTeW1ib2wuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgYmFzZUV4dHJlbXVtID0gcmVxdWlyZSgnLi9fYmFzZUV4dHJlbXVtJyksXG4gICAgYmFzZUd0ID0gcmVxdWlyZSgnLi9fYmFzZUd0JyksXG4gICAgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1heGltdW0gdmFsdWUgb2YgYGFycmF5YC4gSWYgYGFycmF5YCBpcyBlbXB0eSBvciBmYWxzZXksXG4gKiBgdW5kZWZpbmVkYCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXhpbXVtIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLm1heChbNCwgMiwgOCwgNl0pO1xuICogLy8gPT4gOFxuICpcbiAqIF8ubWF4KFtdKTtcbiAqIC8vID0+IHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBtYXgoYXJyYXkpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpXG4gICAgPyBiYXNlRXh0cmVtdW0oYXJyYXksIGlkZW50aXR5LCBiYXNlR3QpXG4gICAgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWF4O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL21heC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL21heC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsImZ1bmN0aW9uIGNyZWF0ZVRodW5rTWlkZGxld2FyZShleHRyYUFyZ3VtZW50KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBkaXNwYXRjaCA9IF9yZWYuZGlzcGF0Y2gsXG4gICAgICAgIGdldFN0YXRlID0gX3JlZi5nZXRTdGF0ZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGFjdGlvbihkaXNwYXRjaCwgZ2V0U3RhdGUsIGV4dHJhQXJndW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn1cblxudmFyIHRodW5rID0gY3JlYXRlVGh1bmtNaWRkbGV3YXJlKCk7XG50aHVuay53aXRoRXh0cmFBcmd1bWVudCA9IGNyZWF0ZVRodW5rTWlkZGxld2FyZTtcblxuZXhwb3J0IGRlZmF1bHQgdGh1bms7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgtdGh1bmsvZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2VzL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiZXhwb3J0IGNvbnN0IGxhbmd1YWdlcyA9IHtcbiAgICBcImFiXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFia2hhelwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCw0qfRgdGD0LBcIlxuICAgIH0sXG4gICAgXCJhYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBZmFyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZhcmFmXCJcbiAgICB9LFxuICAgIFwiYWZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWZyaWthYW5zXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZyaWthYW5zXCJcbiAgICB9LFxuICAgIFwiYWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWthblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFrYW5cIlxuICAgIH0sXG4gICAgXCJzcVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBbGJhbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNocWlwXCJcbiAgICB9LFxuICAgIFwiYW1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQW1oYXJpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGKoOGIm+GIreGKm1wiXG4gICAgfSxcbiAgICBcImFyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFyYWJpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItin2YTYudix2KjZitipXCJcbiAgICB9LFxuICAgIFwiYW5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXJhZ29uZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXJhZ29uw6lzXCJcbiAgICB9LFxuICAgIFwiaHlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXJtZW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLVgNWh1bXVpdaA1aXVtlwiXG4gICAgfSxcbiAgICBcImFzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFzc2FtZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KaF4Ka44Kau4KeA4Kav4Ka84Ka+XCJcbiAgICB9LFxuICAgIFwiYXZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXZhcmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LDQstCw0YAg0LzQsNGG04AsINC80LDQs9OA0LDRgNGD0Lsg0LzQsNGG04BcIlxuICAgIH0sXG4gICAgXCJhZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBdmVzdGFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYXZlc3RhXCJcbiAgICB9LFxuICAgIFwiYXlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXltYXJhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYXltYXIgYXJ1XCJcbiAgICB9LFxuICAgIFwiYXpcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXplcmJhaWphbmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJhesmZcmJheWNhbiBkaWxpXCJcbiAgICB9LFxuICAgIFwiYm1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmFtYmFyYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJhbWFuYW5rYW5cIlxuICAgIH0sXG4gICAgXCJiYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCYXNoa2lyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LHQsNGI0qHQvtGA0YIg0YLQtdC70LVcIlxuICAgIH0sXG4gICAgXCJldVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCYXNxdWVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJldXNrYXJhLCBldXNrZXJhXCJcbiAgICB9LFxuICAgIFwiYmVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmVsYXJ1c2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCR0LXQu9Cw0YDRg9GB0LrQsNGPXCJcbiAgICB9LFxuICAgIFwiYm5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmVuZ2FsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCmrOCmvuCmguCmsuCmvlwiXG4gICAgfSxcbiAgICBcImJoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJpaGFyaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkreCli+CknOCkquClgeCksOClgFwiXG4gICAgfSxcbiAgICBcImJpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJpc2xhbWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJCaXNsYW1hXCJcbiAgICB9LFxuICAgIFwiYnNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQm9zbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJvc2Fuc2tpIGplemlrXCJcbiAgICB9LFxuICAgIFwiYnJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnJldG9uXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYnJlemhvbmVnXCJcbiAgICB9LFxuICAgIFwiYmdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnVsZ2FyaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LHRitC70LPQsNGA0YHQutC4INC10LfQuNC6XCJcbiAgICB9LFxuICAgIFwibXlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnVybWVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGAl+GAmeGArOGAheGArFwiXG4gICAgfSxcbiAgICBcImNhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNhdGFsYW47IFZhbGVuY2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkNhdGFsw6BcIlxuICAgIH0sXG4gICAgXCJjaFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGFtb3Jyb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkNoYW1vcnVcIlxuICAgIH0sXG4gICAgXCJjZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGVjaGVuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0L3QvtGF0YfQuNC50L0g0LzQvtGC0YJcIlxuICAgIH0sXG4gICAgXCJueVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGljaGV3YTsgQ2hld2E7IE55YW5qYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImNoaUNoZcW1YSwgY2hpbnlhbmphXCJcbiAgICB9LFxuICAgIFwiemhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2hpbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuS4reaWhyAoWmjFjW5nd8OpbiksIOaxieivrSwg5ryi6KqeXCJcbiAgICB9LFxuICAgIFwiY3ZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2h1dmFzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGH05HQstCw0Ygg0YfTl9C70YXQuFwiXG4gICAgfSxcbiAgICBcImt3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNvcm5pc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLZXJuZXdla1wiXG4gICAgfSxcbiAgICBcImNvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNvcnNpY2FuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiY29yc3UsIGxpbmd1YSBjb3JzYVwiXG4gICAgfSxcbiAgICBcImNyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNyZWVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhk4DhkKbhkIPhlK3hkI3hkI/hkKNcIlxuICAgIH0sXG4gICAgXCJoclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDcm9hdGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImhydmF0c2tpXCJcbiAgICB9LFxuICAgIFwiY3NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ3plY2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLEjWVza3ksIMSNZcWhdGluYVwiXG4gICAgfSxcbiAgICBcImRhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkRhbmlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImRhbnNrXCJcbiAgICB9LFxuICAgIFwiZHZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRGl2ZWhpOyBEaGl2ZWhpOyBNYWxkaXZpYW47XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi3oveqN6I3qzegN6oXCJcbiAgICB9LFxuICAgIFwibmxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRHV0Y2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOZWRlcmxhbmRzLCBWbGFhbXNcIlxuICAgIH0sXG4gICAgXCJlblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJFbmdsaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRW5nbGlzaFwiXG4gICAgfSxcbiAgICBcImVvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkVzcGVyYW50b1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkVzcGVyYW50b1wiXG4gICAgfSxcbiAgICBcImV0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkVzdG9uaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZWVzdGksIGVlc3RpIGtlZWxcIlxuICAgIH0sXG4gICAgXCJlZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJFd2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFyotlZ2JlXCJcbiAgICB9LFxuICAgIFwiZm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRmFyb2VzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImbDuHJveXNrdFwiXG4gICAgfSxcbiAgICBcImZqXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZpamlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInZvc2EgVmFrYXZpdGlcIlxuICAgIH0sXG4gICAgXCJmaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGaW5uaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic3VvbWksIHN1b21lbiBraWVsaVwiXG4gICAgfSxcbiAgICBcImZyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZyZW5jaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImZyYW7Dp2FpcywgbGFuZ3VlIGZyYW7Dp2Fpc2VcIlxuICAgIH0sXG4gICAgXCJmZlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGdWxhOyBGdWxhaDsgUHVsYWFyOyBQdWxhclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkZ1bGZ1bGRlLCBQdWxhYXIsIFB1bGFyXCJcbiAgICB9LFxuICAgIFwiZ2xcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR2FsaWNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWxlZ29cIlxuICAgIH0sXG4gICAgXCJrYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHZW9yZ2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGDpeGDkOGDoOGDl+GDo+GDmuGDmFwiXG4gICAgfSxcbiAgICBcImRlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkdlcm1hblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkRldXRzY2hcIlxuICAgIH0sXG4gICAgXCJlbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHcmVlaywgTW9kZXJuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwizpXOu867zrfOvc65zrrOrFwiXG4gICAgfSxcbiAgICBcImduXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkd1YXJhbsOtXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXZhw7Fl4bq9XCJcbiAgICB9LFxuICAgIFwiZ3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR3VqYXJhdGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgqpfgq4HgqpzgqrDgqr7gqqTgq4BcIlxuICAgIH0sXG4gICAgXCJodFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIYWl0aWFuOyBIYWl0aWFuIENyZW9sZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktyZXnDsmwgYXlpc3llblwiXG4gICAgfSxcbiAgICBcImhhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhhdXNhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSGF1c2EsINmH2Y7ZiNmP2LPZjlwiXG4gICAgfSxcbiAgICBcImhlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhlYnJldyAobW9kZXJuKVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItei15HXqNeZ16pcIlxuICAgIH0sXG4gICAgXCJoelwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIZXJlcm9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPdGppaGVyZXJvXCJcbiAgICB9LFxuICAgIFwiaGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGluZGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLngpL/gpKjgpY3gpKbgpYAsIOCkueCkv+CkguCkpuClgFwiXG4gICAgfSxcbiAgICBcImhvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhpcmkgTW90dVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkhpcmkgTW90dVwiXG4gICAgfSxcbiAgICBcImh1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkh1bmdhcmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hZ3lhclwiXG4gICAgfSxcbiAgICBcImlhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkludGVybGluZ3VhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSW50ZXJsaW5ndWFcIlxuICAgIH0sXG4gICAgXCJpZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbmRvbmVzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQmFoYXNhIEluZG9uZXNpYVwiXG4gICAgfSxcbiAgICBcImllXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkludGVybGluZ3VlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT3JpZ2luYWxseSBjYWxsZWQgT2NjaWRlbnRhbDsgdGhlbiBJbnRlcmxpbmd1ZSBhZnRlciBXV0lJXCJcbiAgICB9LFxuICAgIFwiZ2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSXJpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWVpbGdlXCJcbiAgICB9LFxuICAgIFwiaWdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWdib1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFz4bulc+G7pSBJZ2JvXCJcbiAgICB9LFxuICAgIFwiaWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW51cGlhcVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIknDsXVwaWFxLCBJw7F1cGlhdHVuXCJcbiAgICB9LFxuICAgIFwiaW9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWRvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSWRvXCJcbiAgICB9LFxuICAgIFwiaXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWNlbGFuZGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiw41zbGVuc2thXCJcbiAgICB9LFxuICAgIFwiaXRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSXRhbGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkl0YWxpYW5vXCJcbiAgICB9LFxuICAgIFwiaXVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW51a3RpdHV0XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4ZCD4ZOE4ZKD4ZGO4ZGQ4ZGmXCJcbiAgICB9LFxuICAgIFwiamFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSmFwYW5lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLml6XmnKzoqp4gKOOBq+OBu+OCk+OBlO+8j+OBq+OBo+OBveOCk+OBlClcIlxuICAgIH0sXG4gICAgXCJqdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJKYXZhbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJhc2EgSmF3YVwiXG4gICAgfSxcbiAgICBcImtsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthbGFhbGxpc3V0LCBHcmVlbmxhbmRpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImthbGFhbGxpc3V0LCBrYWxhYWxsaXQgb3FhYXNpaVwiXG4gICAgfSxcbiAgICBcImtuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthbm5hZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgspXgsqjgs43gsqjgsqFcIlxuICAgIH0sXG4gICAgXCJrclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYW51cmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLYW51cmlcIlxuICAgIH0sXG4gICAgXCJrc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYXNobWlyaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkleCktuCljeCkruClgOCksOClgCwg2YPYtNmF2YrYsdmK4oCOXCJcbiAgICB9LFxuICAgIFwia2tcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2F6YWtoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0prQsNC30LDSmyDRgtGW0LvRllwiXG4gICAgfSxcbiAgICBcImttXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktobWVyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Z6X4Z624Z6f4Z624Z6B4Z+S4Z6Y4Z+C4Z6aXCJcbiAgICB9LFxuICAgIFwia2lcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2lrdXl1LCBHaWt1eXVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHxKlrxal5xalcIlxuICAgIH0sXG4gICAgXCJyd1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLaW55YXJ3YW5kYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIklraW55YXJ3YW5kYVwiXG4gICAgfSxcbiAgICBcImt5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpcmdoaXosIEt5cmd5elwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC60YvRgNCz0YvQtyDRgtC40LvQuFwiXG4gICAgfSxcbiAgICBcImt2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktvbWlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQutC+0LzQuCDQutGL0LJcIlxuICAgIH0sXG4gICAgXCJrZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLb25nb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktpS29uZ29cIlxuICAgIH0sXG4gICAgXCJrb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLb3JlYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLtlZzqta3slrQgKOmfk+Wci+iqniksIOyhsOyEoOunkCAo5pyd6a6u6KqeKVwiXG4gICAgfSxcbiAgICBcImt1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkt1cmRpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLdXJkw64sINmD2YjYsdiv24zigI5cIlxuICAgIH0sXG4gICAgXCJralwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLd2FueWFtYSwgS3VhbnlhbWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLdWFueWFtYVwiXG4gICAgfSxcbiAgICBcImxhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxhdGluXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwibGF0aW5lLCBsaW5ndWEgbGF0aW5hXCJcbiAgICB9LFxuICAgIFwibGJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTHV4ZW1ib3VyZ2lzaCwgTGV0emVidXJnZXNjaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkzDq3R6ZWJ1ZXJnZXNjaFwiXG4gICAgfSxcbiAgICBcImxnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkx1Z2FuZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMdWdhbmRhXCJcbiAgICB9LFxuICAgIFwibGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGltYnVyZ2lzaCwgTGltYnVyZ2FuLCBMaW1idXJnZXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMaW1idXJnc1wiXG4gICAgfSxcbiAgICBcImxuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxpbmdhbGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMaW5nw6FsYVwiXG4gICAgfSxcbiAgICBcImxvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxhb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC6nuC6suC6quC6suC6peC6suC6p1wiXG4gICAgfSxcbiAgICBcImx0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxpdGh1YW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJsaWV0dXZpxbMga2FsYmFcIlxuICAgIH0sXG4gICAgXCJsdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMdWJhLUthdGFuZ2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJcIlxuICAgIH0sXG4gICAgXCJsdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMYXR2aWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwibGF0dmllxaF1IHZhbG9kYVwiXG4gICAgfSxcbiAgICBcImd2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbnhcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWVsZywgR2FpbGNrXCJcbiAgICB9LFxuICAgIFwibWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFjZWRvbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC80LDQutC10LTQvtC90YHQutC4INGY0LDQt9C40LpcIlxuICAgIH0sXG4gICAgXCJtZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYWxhZ2FzeVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hbGFnYXN5IGZpdGVueVwiXG4gICAgfSxcbiAgICBcIm1zXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbGF5XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYmFoYXNhIE1lbGF5dSwg2KjZh9in2LMg2YXZhNin2YrZiOKAjlwiXG4gICAgfSxcbiAgICBcIm1sXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbGF5YWxhbVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC0ruC0suC0r+C0vuC0s+C0glwiXG4gICAgfSxcbiAgICBcIm10XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbHRlc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJNYWx0aVwiXG4gICAgfSxcbiAgICBcIm1pXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk3EgW9yaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInRlIHJlbyBNxIFvcmlcIlxuICAgIH0sXG4gICAgXCJtclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYXJhdGhpIChNYXLEgeG5rWjEqylcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpK7gpLDgpL7gpKDgpYBcIlxuICAgIH0sXG4gICAgXCJtaFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYXJzaGFsbGVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkthamluIE3Mp2FqZcS8XCJcbiAgICB9LFxuICAgIFwibW5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTW9uZ29saWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LzQvtC90LPQvtC7XCJcbiAgICB9LFxuICAgIFwibmFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTmF1cnVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFa2FrYWlyxakgTmFvZXJvXCJcbiAgICB9LFxuICAgIFwibnZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTmF2YWpvLCBOYXZhaG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJEaW7DqSBiaXphYWQsIERpbsOpa8q8ZWjHsMOtXCJcbiAgICB9LFxuICAgIFwibmJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9yd2VnaWFuIEJva23DpWxcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOb3JzayBib2ttw6VsXCJcbiAgICB9LFxuICAgIFwibmRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9ydGggTmRlYmVsZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImlzaU5kZWJlbGVcIlxuICAgIH0sXG4gICAgXCJuZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOZXBhbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpKjgpYfgpKrgpL7gpLLgpYBcIlxuICAgIH0sXG4gICAgXCJuZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOZG9uZ2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPd2FtYm9cIlxuICAgIH0sXG4gICAgXCJublwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW4gTnlub3Jza1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrIG55bm9yc2tcIlxuICAgIH0sXG4gICAgXCJub1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOb3Jza1wiXG4gICAgfSxcbiAgICBcImlpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk51b3N1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi6oaI6oyg6pK/IE51b3N1aHhvcFwiXG4gICAgfSxcbiAgICBcIm5yXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNvdXRoIE5kZWJlbGVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJpc2lOZGViZWxlXCJcbiAgICB9LFxuICAgIFwib2NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT2NjaXRhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk9jY2l0YW5cIlxuICAgIH0sXG4gICAgXCJvalwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPamlid2UsIE9qaWJ3YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGQiuGTguGUkeGTiOGQr+GSp+GQjuGTkFwiXG4gICAgfSxcbiAgICBcImN1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9sZCBDaHVyY2ggU2xhdm9uaWMsIENodXJjaCBTbGF2aWMsIENodXJjaCBTbGF2b25pYywgT2xkIEJ1bGdhcmlhbiwgT2xkIFNsYXZvbmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0anQt9GL0LrRiiDRgdC70L7QstGj0L3RjNGB0LrRilwiXG4gICAgfSxcbiAgICBcIm9tXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9yb21vXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZhYW4gT3JvbW9vXCJcbiAgICB9LFxuICAgIFwib3JcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT3JpeWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgrJPgrKHgrLzgrL/grIZcIlxuICAgIH0sXG4gICAgXCJvc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPc3NldGlhbiwgT3NzZXRpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC40YDQvtC9IMOm0LLQt9Cw0LNcIlxuICAgIH0sXG4gICAgXCJwYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQYW5qYWJpLCBQdW5qYWJpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Kiq4Kmw4Kic4Ki+4Kis4KmALCDZvtmG2KzYp9io24zigI5cIlxuICAgIH0sXG4gICAgXCJwaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQxIFsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkquCkvuCktOCkv1wiXG4gICAgfSxcbiAgICBcImZhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBlcnNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLZgdin2LHYs9uMXCJcbiAgICB9LFxuICAgIFwicGxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUG9saXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwicG9sc2tpXCJcbiAgICB9LFxuICAgIFwicHNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUGFzaHRvLCBQdXNodG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLZvtqa2KrZiFwiXG4gICAgfSxcbiAgICBcInB0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBvcnR1Z3Vlc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJQb3J0dWd1w6pzXCJcbiAgICB9LFxuICAgIFwicXVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUXVlY2h1YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlJ1bmEgU2ltaSwgS2ljaHdhXCJcbiAgICB9LFxuICAgIFwicm1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUm9tYW5zaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInJ1bWFudHNjaCBncmlzY2h1blwiXG4gICAgfSxcbiAgICBcInJuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpcnVuZGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJraVJ1bmRpXCJcbiAgICB9LFxuICAgIFwicm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUm9tYW5pYW4sIE1vbGRhdmlhbiwgTW9sZG92YW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJyb23Dom7Eg1wiXG4gICAgfSxcbiAgICBcInJ1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlJ1c3NpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgNGD0YHRgdC60LjQuSDRj9C30YvQulwiXG4gICAgfSxcbiAgICBcInNhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNhbnNrcml0IChTYeG5gXNr4bmbdGEpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KS44KSC4KS44KWN4KSV4KWD4KSk4KSu4KWNXCJcbiAgICB9LFxuICAgIFwic2NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2FyZGluaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic2FyZHVcIlxuICAgIH0sXG4gICAgXCJzZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTaW5kaGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLjgpL/gpKjgpY3gpKfgpYAsINiz2YbajNmK2Iwg2LPZhtiv2r7bjOKAjlwiXG4gICAgfSxcbiAgICBcInNlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcnRoZXJuIFNhbWlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJEYXZ2aXPDoW1lZ2llbGxhXCJcbiAgICB9LFxuICAgIFwic21cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2Ftb2FuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZ2FnYW5hIGZhYSBTYW1vYVwiXG4gICAgfSxcbiAgICBcInNnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNhbmdvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiecOibmfDoiB0w64gc8OkbmfDtlwiXG4gICAgfSxcbiAgICBcInNyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNlcmJpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgdGA0L/RgdC60Lgg0ZjQtdC30LjQulwiXG4gICAgfSxcbiAgICBcImdkXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNjb3R0aXNoIEdhZWxpYzsgR2FlbGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiR8OgaWRobGlnXCJcbiAgICB9LFxuICAgIFwic25cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2hvbmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJjaGlTaG9uYVwiXG4gICAgfSxcbiAgICBcInNpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNpbmhhbGEsIFNpbmhhbGVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC3g+C3kuC2guC3hOC2vVwiXG4gICAgfSxcbiAgICBcInNrXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNsb3Zha1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInNsb3ZlbsSNaW5hXCJcbiAgICB9LFxuICAgIFwic2xcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2xvdmVuZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInNsb3ZlbsWhxI1pbmFcIlxuICAgIH0sXG4gICAgXCJzb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTb21hbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTb29tYWFsaWdhLCBhZiBTb29tYWFsaVwiXG4gICAgfSxcbiAgICBcInN0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNvdXRoZXJuIFNvdGhvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2Vzb3Rob1wiXG4gICAgfSxcbiAgICBcImVzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNwYW5pc2g7IENhc3RpbGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImVzcGHDsW9sLCBjYXN0ZWxsYW5vXCJcbiAgICB9LFxuICAgIFwic3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3VuZGFuZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQmFzYSBTdW5kYVwiXG4gICAgfSxcbiAgICBcInN3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlN3YWhpbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLaXN3YWhpbGlcIlxuICAgIH0sXG4gICAgXCJzc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTd2F0aVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNpU3dhdGlcIlxuICAgIH0sXG4gICAgXCJzdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTd2VkaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic3ZlbnNrYVwiXG4gICAgfSxcbiAgICBcInRhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRhbWlsXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4K6k4K6u4K6/4K604K+NXCJcbiAgICB9LFxuICAgIFwidGVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGVsdWd1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LCk4LGG4LCy4LGB4LCX4LGBXCJcbiAgICB9LFxuICAgIFwidGdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFqaWtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgtC+0rfQuNC606MsIHRvxJ9pa8SrLCDYqtin2KzbjNqp24zigI5cIlxuICAgIH0sXG4gICAgXCJ0aFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUaGFpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LmE4LiX4LiiXCJcbiAgICB9LFxuICAgIFwidGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGlncmlueWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhibXhjI3hiK3hiptcIlxuICAgIH0sXG4gICAgXCJib1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUaWJldGFuIFN0YW5kYXJkLCBUaWJldGFuLCBDZW50cmFsXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4L2W4L284L2R4LyL4L2h4L2y4L2CXCJcbiAgICB9LFxuICAgIFwidGtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHVya21lblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlTDvHJrbWVuLCDQotKv0YDQutC80LXQvVwiXG4gICAgfSxcbiAgICBcInRsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRhZ2Fsb2dcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJXaWthbmcgVGFnYWxvZywg4ZyP4ZyS4ZyD4ZyF4ZyUIOGchuGchOGcjuGck+GchOGclFwiXG4gICAgfSxcbiAgICBcInRuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRzd2FuYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNldHN3YW5hXCJcbiAgICB9LFxuICAgIFwidG9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVG9uZ2EgKFRvbmdhIElzbGFuZHMpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZmFrYSBUb25nYVwiXG4gICAgfSxcbiAgICBcInRyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlR1cmtpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUw7xya8OnZVwiXG4gICAgfSxcbiAgICBcInRzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRzb25nYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlhpdHNvbmdhXCJcbiAgICB9LFxuICAgIFwidHRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGF0YXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgtCw0YLQsNGA0YfQsCwgdGF0YXLDp2EsINiq2KfYqtin2LHahtin4oCOXCJcbiAgICB9LFxuICAgIFwidHdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHdpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVHdpXCJcbiAgICB9LFxuICAgIFwidHlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFoaXRpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJSZW8gVGFoaXRpXCJcbiAgICB9LFxuICAgIFwidWdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVWlnaHVyLCBVeWdodXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJVecajdXJxyZksINim24fZiti624fYsdqG25XigI5cIlxuICAgIH0sXG4gICAgXCJ1a1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJVa3JhaW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRg9C60YDQsNGX0L3RgdGM0LrQsFwiXG4gICAgfSxcbiAgICBcInVyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlVyZHVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLYp9ix2K/ZiFwiXG4gICAgfSxcbiAgICBcInV6XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlV6YmVrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiemJlaywg0I7Qt9Cx0LXQuiwg2KPbh9iy2KjbkNmD4oCOXCJcbiAgICB9LFxuICAgIFwidmVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVmVuZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUc2hpdmVu4biTYVwiXG4gICAgfSxcbiAgICBcInZpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlZpZXRuYW1lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUaeG6v25nIFZp4buHdFwiXG4gICAgfSxcbiAgICBcInZvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlZvbGFww7xrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVm9sYXDDvGtcIlxuICAgIH0sXG4gICAgXCJ3YVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXYWxsb29uXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiV2Fsb25cIlxuICAgIH0sXG4gICAgXCJjeVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXZWxzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkN5bXJhZWdcIlxuICAgIH0sXG4gICAgXCJ3b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXb2xvZlwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIldvbGxvZlwiXG4gICAgfSxcbiAgICBcImZ5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldlc3Rlcm4gRnJpc2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkZyeXNrXCJcbiAgICB9LFxuICAgIFwieGhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiWGhvc2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJpc2lYaG9zYVwiXG4gICAgfSxcbiAgICBcInlpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIllpZGRpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLXmdeZ1rTXk9eZ16lcIlxuICAgIH0sXG4gICAgXCJ5b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJZb3J1YmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJZb3LDuWLDoVwiXG4gICAgfSxcbiAgICBcInphXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlpodWFuZywgQ2h1YW5nXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2HJryBjdWXFi8aFLCBTYXcgY3VlbmdoXCJcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2RhdGEvbGFuZ3VhZ2VzLmpzIiwiaW1wb3J0IHsgQ09OVEVOVF9MSVNUSU5HX1ZJRVcgfSBmcm9tIFwiQGNvbnN0YW50c1wiO1xuZXhwb3J0IGNvbnN0IGZpbHRlclR5cGVzPSB7XG4gICAgQUREX1JJR0hUOidBRERfUklHSFQnLFxuICAgIFJFTU9WRV9SSUdIVCA6ICdSRU1PVkVfUklHSFQnLFxuICAgIFVQREFURV9DT1VOVFJJRVMgOiAnVVBEQVRFX0NPVU5UUklFUycsXG4gICAgVVBEQVRFX0VYQ0xVU0lWRSA6ICdVUERBVEVfRVhDTFVTSVZFJyxcbiAgICBVUERBVEVfSU5DTFVERURfQ09VTlRSSUVTIDogJ1VQREFURV9JTkNMVURFRF9DT1VOVFJJRVMnLFxuICAgIFVQREFURV9TUE9SVCA6ICdVUERBVEVfU1BPUlQnLFxuICAgIFVQREFURV9FVkVOVCA6ICdVUERBVEVfRVZFTlQnLFxuICAgIENMRUFSIDogJ0NMRUFSJyxcbiAgICBDTEVBUl9VUERBVEUgOiAnQ0xFQVJfVVBEQVRFJyxcbiAgICBVUERBVEVfTUFOWSA6ICdVUERBVEVfTUFOWScsXG4gICAgVVBEQVRFX0ZJTFRFUlNfQ09ORklHOiBcIlVQREFURV9BTExcIixcbiAgICBVUERBVEVfRVZFTlRfREFURV9GUk9NX1RPOiBcIlVQREFURV9GUk9NX1RPXCIsXG4gICAgVVBEQVRFX0xJU1RfVklFVzogXCJVUERBVEVfTElTVF9WSUVXXCJcbn07XG5cbmNvbnN0IGRlZmF1bHRGaWx0ZXIgPSB7XG4gICAgcmlnaHRzOiBbXSxcbiAgICBjb3VudHJpZXM6IFtdLFxuICAgIGV4Y2x1c2l2ZSA6IGZhbHNlLFxuICAgIGluY2x1ZGVBbGxDb3VudHJpZXMgOiBmYWxzZSxcbiAgICBzcG9ydDogW3tcbiAgICAgICAgdmFsdWUgOiBudWxsLFxuICAgICAgICBsYWJlbCA6IFwiQWxsIHNwb3J0c1wiXG4gICAgfV0sXG4gICAgZXZlbnQgOiBcIlwiLFxuICAgIGZvcmNlVXBkYXRlIDogdHJ1ZSxcbiAgICBldmVudERhdGVGcm9tOiBcIlwiLFxuICAgIGV2ZW50RGF0ZVRvOiBcIlwiLFxuICAgIGxpc3RUeXBlOiBDT05URU5UX0xJU1RJTkdfVklFVy5MSVNUXG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyID0gKHN0YXRlID0gZGVmYXVsdEZpbHRlciwgYWN0aW9uKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9JTkNMVURFRF9DT1VOVFJJRVM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlQWxsQ291bnRyaWVzOiBhY3Rpb24uaW5jbHVkZUFsbENvdW50cmllc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuQ0xFQVI6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdEZpbHRlcik7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuQ0xFQVJfVVBEQVRFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZm9yY2VVcGRhdGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5BRERfUklHSFQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICByaWdodHM6IFsuLi5zdGF0ZS5yaWdodHMsIGFjdGlvbi5pZF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlJFTU9WRV9SSUdIVDpcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHN0YXRlLnJpZ2h0cy5pbmRleE9mKGFjdGlvbi5pZCk7XG4gICAgICAgICAgICBzdGF0ZS5yaWdodHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHJpZ2h0czogWy4uLnN0YXRlLnJpZ2h0c11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9DT1VOVFJJRVM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBjb3VudHJpZXM6IGFjdGlvbi5jb3VudHJpZXMubWFwKGM9PmMudmFsdWUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfRVZFTlRfREFURV9GUk9NX1RPOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7ZXZlbnREYXRlRnJvbTogYWN0aW9uLmZyb20sIGV2ZW50RGF0ZVRvOiBhY3Rpb24udG99KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfRVhDTFVTSVZFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZXhjbHVzaXZlOiBhY3Rpb24uZXhjbHVzaXZlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfU1BPUlQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzcG9ydDogWy4uLnN0YXRlLnNwb3J0LCAuLi5hY3Rpb24uc3BvcnRdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfRklMVEVSU19DT05GSUc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5maWx0ZXJzKTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfTElTVF9WSUVXOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGxpc3RUeXBlOiBhY3Rpb24ubGlzdFR5cGUgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0VWRU5UOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IGFjdGlvbi5ldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX01BTlk6XG4gICAgICAgICAgICBhY3Rpb24uZmlsdGVycy5mb3JjZVVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoYWN0aW9uLmZpbHRlcnMucmlnaHRzKSBhY3Rpb24uZmlsdGVycy5yaWdodHMgPSBhY3Rpb24uZmlsdGVycy5yaWdodHMubWFwKHI9Pk51bWJlcihyKSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5maWx0ZXJzKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9yZWR1Y2Vycy9maWx0ZXIuanMiLCJleHBvcnQgY29uc3QgbWFya2V0cGxhY2VUeXBlcyA9IHtcbiAgICBGRVRDSF9MSVNUSU5HX1JFUVVFU1Q6IFwiRkVUQ0hfTElTVElOR19SRVFVRVNUXCIsXG4gICAgRkVUQ0hfTElTVElOR19FUlJPUjogXCJGRVRDSF9MSVNUSU5HX0VSUk9SXCIsXG4gICAgRkVUQ0hfTElTVElOR19TVUNDRVNTOiBcIkZFVENIX0xJU1RJTkdfU1VDQ0VTU1wiXG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgIGxpc3RpbmdzRGF0YToge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICBsaXN0aW5nczogW10sXG4gICAgICAgIHRvdGFsSXRlbXM6IG51bGxcbiAgICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbWFya2V0cGxhY2Uoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtYXJrZXRwbGFjZVR5cGVzLkZFVENIX0xJU1RJTkdfUkVRVUVTVDpcbiAgICAgICAgY2FzZSBtYXJrZXRwbGFjZVR5cGVzLkZFVENIX0xJU1RJTkdfRVJST1I6XG4gICAgICAgIGNhc2UgbWFya2V0cGxhY2VUeXBlcy5GRVRDSF9MSVNUSU5HX1NVQ0NFU1M6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIGxpc3RpbmdzRGF0YTogdXBkYXRlTGlzdGluZ3Moc3RhdGUubGlzdGluZ3NEYXRhLCBhY3Rpb24pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuXG5jb25zdCB1cGRhdGVMaXN0aW5ncyA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZS5saXN0aW5nc0RhdGEsIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtYXJrZXRwbGFjZVR5cGVzLkZFVENIX0xJU1RJTkdfUkVRVUVTVDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBsaXN0aW5nczogW10sXG4gICAgICAgICAgICAgICAgdG90YWxJdGVtczogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBtYXJrZXRwbGFjZVR5cGVzLkZFVENIX0xJU1RJTkdfU1VDQ0VTUzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsaXN0aW5nczogYWN0aW9uLmxpc3RpbmdzLFxuICAgICAgICAgICAgICAgIHRvdGFsSXRlbXM6IGFjdGlvbi50b3RhbEl0ZW1zXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIG1hcmtldHBsYWNlVHlwZXMuRkVUQ0hfTElTVElOR19FUlJPUjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGFjdGlvbi5lcnJvcixcbiAgICAgICAgICAgICAgICBsaXN0aW5nczogW10sXG4gICAgICAgICAgICAgICAgdG90YWxJdGVtczogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL21hcmtldHBsYWNlLmpzIiwiLyoqXG4qIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4qL1xuXG5sZXQgX19hcGlTdG9yZSA9IHtcbiAgICB0b3VybmFtZW50cyA6IHt9XG59O1xuXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpID0gQ29udGVudEFyZW5hLkNvbnRlbnRBcGl8fCB7fTtcblxuQ29udGVudEFyZW5hLkNvbnRlbnRBcGk9IHtcbiAgICBzYXZlQ29udGVudEFzRHJhZnQgKCBjb250ZW50ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L2RyYWZ0L3NhdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2F2ZUNvbnRlbnRBc0luYWN0aXZlICggY29udGVudCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3Rpbmcvc2F2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzYXZlQ29udGVudEFzQWN0aXZlICggY29udGVudCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmcvcHVibGlzaFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZXB1Ymxpc2hMaXN0aW5nICggY3VzdG9tSWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5nL3JlcHVibGlzaFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y3VzdG9tSWQ6IGN1c3RvbUlkfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2VuZE1lc3NhZ2UgKCBtZXNzYWdlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvc2VuZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRVc2VySW5mbyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9pbmZvXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRVc2VySW5mb0J5QWN0aXZhdGlvbkNvZGUgKCBhY3RpdmF0aW9uQ29kZSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvY29kZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBkYXRhIDogSlNPTi5zdHJpbmdpZnkoe2FjdGl2YXRpb25Db2RlOiBhY3RpdmF0aW9uQ29kZX0pLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvbXBhbnlVc2VycyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvY29tcGFueS91c2Vyc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgdXBkYXRlQ29tcGFueSAoIGNvbXBhbnkgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9jb21wYW55L3VwZGF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y29tcGFueTpjb21wYW55fSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgdXBkYXRlUGFzc3dvcmQgKCBkYXRhICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9wYXNzd29yZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB1cGRhdGVVc2VyICggdXNlciApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvdXBkYXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHt1c2VyOnVzZXJ9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBhY3RpdmF0ZVVzZXIgKCB1c2VyLCBwYXNzd29yZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvYWN0aXZhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXI6dXNlcixpZDogdXNlci5pZCwgcGFzc3dvcmQgOiBwYXNzd29yZH0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlVXNlclByb2ZpbGUgKCBwcm9maWxlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9wcm9maWxlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtwcm9maWxlOnByb2ZpbGV9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRUaHJlYWQgKCBjdXN0b21JZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3RocmVhZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y3VzdG9tSWQ6IGN1c3RvbUlkfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VGhyZWFkcyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3RocmVhZHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHBsYWNlQmlkICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3BsYWNlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcGxhY2VCaWRzICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkcy9wbGFjZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGFjY2VwdEJpZCAoIGJpZCwgc2lnbmF0dXJlLCBzaWduYXR1cmVOYW1lLCBzaWduYXR1cmVQb3NpdGlvbiApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgYmlkLnNpZ25hdHVyZSA9IHNpZ25hdHVyZTtcbiAgICAgICAgYmlkLnNpZ25hdHVyZU5hbWUgPSBzaWduYXR1cmVOYW1lO1xuICAgICAgICBiaWQuc2lnbmF0dXJlUG9zaXRpb24gPSBzaWduYXR1cmVQb3NpdGlvbjtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL2FjY2VwdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlamVjdEJpZCAoIGJpZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZWplY3RcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZW1vdmVCaWQgKCBiaWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcmVtb3ZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBzYXZlVG1wRmlsZSAoIGZpbGVzICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlJywgZmlsZXNbMF0pO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvc2F2ZS9maWxlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2F2ZUF0dGFjaG1lbnRGaWxlICggZmlsZXMgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlc1swXSk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9zYXZlL2F0dGFjaG1lbnRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRkFJTEVEXCIpXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlbW92ZUF0dGFjaG1lbnRGaWxlICggZmlsZSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L3JlbW92ZS9hdHRhY2htZW50XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBmaWxlIDogZmlsZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRkFJTEVEXCIpXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEJ5Q3VzdG9tSWQgKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwibGlzdGluZy9kZXRhaWxzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIGdldERyYWZ0TGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2RyYWZ0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRJbmFjdGl2ZUxpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9pbmFjdGl2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0QWN0aXZlTGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2FjdGl2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0RXhwaXJlZExpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9leHBpcmVkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZW1vdmVMaXN0aW5nKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL3JlbW92ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZHVwbGljYXRlTGlzdGluZyggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kdXBsaWNhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGRlYWN0aXZhdGVMaXN0aW5nKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2RlYWN0aXZhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGFyY2hpdmVMaXN0aW5nKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2FyY2hpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgZ2V0Q2xvc2VkRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvY2xvc2VkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0QWxsRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvYWxsXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UGVuZGluZ0RlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3BlbmRpbmdcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRSZWplY3RlZERlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3JlamVjdGVkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0V2F0Y2hsaXN0TGlzdGluZ3MgKCl7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy93YXRjaGxpc3RcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5jb250ZW50LmpzIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuLyoqXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuICovXG5cbmxldCBfX2FwaVN0b3JlID0ge1xuICAgIHRvdXJuYW1lbnRzIDoge31cbn07XG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuXG5Db250ZW50QXJlbmEuQXBpPSB7XG4gICAgc29ydEJ5TGFiZWwgKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhLm5hbWUgPiBiLm5hbWUpID8gMSA6ICgoYi5uYW1lID4gYS5uYW1lKSA/IC0xIDogMClcbiAgICB9LFxuICAgIHNvcnRCeVNwb3J0IChhLCBiKSB7XG5cbiAgICAgICAgaWYgKGEuc3BvcnQubmFtZSA+IGIuc3BvcnQubmFtZSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLnNwb3J0Lm5hbWUgPCBiLnNwb3J0Lm5hbWUpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEuc3BvcnRDYXRlZ29yeS5uYW1lID4gYi5zcG9ydENhdGVnb3J5Lm5hbWUpIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5zcG9ydENhdGVnb3J5Lm5hbWUgPCBiLnNwb3J0Q2F0ZWdvcnkubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5uYW1lID4gYi5uYW1lKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gMDtcblxuICAgIH0sXG4gICAgcHJlcGFyZUxpc3QgKCBsaXN0LCBjYXRlZ29yeUlkICkge1xuXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgbGlzdCA9ICQubWFwKGxpc3QsIGZ1bmN0aW9uIChpdGVtKSB7XG5cbiAgICAgICAgICAgIC8vIEZpbHRlciBieSBjYXRlZ29yeVxuICAgICAgICAgICAgaWYgKCBjYXRlZ29yeUlkICYmIGl0ZW0uY2F0ZWdvcnlbJ0BhdHRyaWJ1dGVzJ10uaWQgIT0gY2F0ZWdvcnlJZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiB7bmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLCBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkfVxuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0LnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xuXG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH0sXG4gICAgZmlsdGVyRG91YmxlcyAoIGxpc3QsIHNwb3J0SWQgKXtcbiAgICAgICAgbGV0IG5hbWVzID0gW107XG5cbiAgICAgICAgaWYgKCBzcG9ydElkID09PSBcInNyOnNwb3J0OjVcIiApe1xuICAgICAgICAgICAgbGlzdCA9IGxpc3QubWFwKGl0ZW09PntcbiAgICAgICAgICAgICAgICBpdGVtLm5hbWUgPSBpdGVtLm5hbWUucmVwbGFjZSgvIHNpbmdsZXMvZ2ksJycpLnJlcGxhY2UoLyBkb3VibGUvZ2ksJycpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfSkuZmlsdGVyKGl0ZW09PntcbiAgICAgICAgICAgICAgICBpZiAobmFtZXMuaW5kZXhPZihpdGVtLm5hbWUpID09PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVzLnB1c2goaXRlbS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH0sXG4gICAgZ2V0Q29tcGFueVRlcm1zICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS90ZXJtcy9jb21wYW55XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIGdldENvbXBhbnlEZWZpbml0aW9ucyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvZGVmaW5pdGlvbnMvY29tcGFueVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICByZXN0b3JlQ29tcGFueVRlcm1zICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS90ZXJtcy9yZXN0b3JlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIHJlc3RvcmVEZWZpbml0aW9ucyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvZGVmaW5pdGlvbnMvcmVzdG9yZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVUZXJtcyAoIHRlcm1zLCBkZWZpbml0aW9ucyApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3Rlcm1zL3VwZGF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDoge1xuICAgICAgICAgICAgICAgIHRlcm1zIDogdGVybXMsXG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbnMgOiBkZWZpbml0aW9uc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDb250ZW50ICggZmlsdGVyKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImJ1eS9zZWFyY2hcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IGZpbHRlcixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRKc29uQ29udGVudCAoIGZpbHRlcikge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJsaXN0aW5ncy9tYXJrZXRwbGFjZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNhdmVGaWx0ZXIgKCBmaWx0ZXIpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L2ZpbHRlci9zYXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiBmaWx0ZXIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q291bnRyaWVzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMgJiYgQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzLmxlbmd0aCA+IDAgKXtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL2NvdW50cmllcy9hbGxcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZS5tYXAoYz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5yZWdpb25zID0gYy5yZWdpb25zLm1hcChyPT5yLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuZXh0ZXJuYWxJZCA9IGMuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMgPSByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBY3RpdmVTcG9ydHMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9zcG9ydHMvYWN0aXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFsbFNwb3J0cyAoZmxhZ3MpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvc3BvcnRzL2FsbFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZmxhZ3M6IGZsYWdzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFNwb3J0c0dyb3VwcyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3Nwb3J0cy9ncm91cHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q291bnRyaWVzRnVsbCAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL2NvdW50cmllcy9mdWxsXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRlcnJpdG9yaWVzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvdGVycml0b3JpZXNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmVnaW9ucyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3JlZ2lvbnNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmlnaHRzIChyaWdodHNQYWNrYWdlLCBncm91cCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9yaWdodHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmlnaHRzUGFja2FnZSAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvcmlnaHRzLXBhY2thZ2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0U3BvcnRzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3Nwb3J0c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7c3BvcnQ6b2JqZWN0fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3BvcnRzID0gX3RoaXMucHJlcGFyZUxpc3QoIHJlc3BvbnNlLnNwb3J0KTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNwb3J0cyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvbnRlbnREZXRhaWxzKCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9kZXRhaWxzL1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UGVuZGluZ0xpc3RpbmdzKCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9wZW5kaW5nLWxpc3RpbmdzL1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q2F0ZWdvcmllcyAoIHNwb3J0SWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgbGlzdCA9IFtdLFxuICAgICAgICAgICAgY2F0cyA9IFtdO1xuXG4gICAgICAgIF90aGlzLmdldFRvdXJuYW1lbnRzKHNwb3J0SWQpLmRvbmUoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoICEgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCBbXSApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdCA9ICQubWFwKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQgLCBmdW5jdGlvbiAoaXRlbSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaXRlbS5jYXRlZ29yeVsnQGF0dHJpYnV0ZXMnXS5pZDtcblxuICAgICAgICAgICAgICAgIGlmICggY2F0cy5pbmRleE9mKGlkKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhdHMucHVzaCggaWQgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QobGlzdCkgKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VG91cm5hbWVudHMgKCBzcG9ydElkLCBjYXRlZ29yeUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcywgc3RvcmVkUmVzcG9uc2U7XG5cbiAgICAgICAgaWYgKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdICE9PSB1bmRlZmluZWQgKXtcblxuICAgICAgICAgICAgc3RvcmVkUmVzcG9uc2UgPSBfdGhpcy5wcmVwYXJlTGlzdChfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQsIGNhdGVnb3J5SWQpXG4gICAgICAgICAgICBzdG9yZWRSZXNwb25zZSA9IF90aGlzLmZpbHRlckRvdWJsZXMoc3RvcmVkUmVzcG9uc2Usc3BvcnRJZCk7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHN0b3JlZFJlc3BvbnNlKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC90b3VybmFtZW50c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNwb3J0SWQgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBBIGNvbW1lbnRcbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnRvdXJuYW1lbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gPSByZXNwb25zZS50b3VybmFtZW50cztcblxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gX3RoaXMucHJlcGFyZUxpc3QocmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCwgY2F0ZWdvcnlJZCk7XG4gICAgICAgICAgICAgICAgbGlzdCA9IF90aGlzLmZpbHRlckRvdWJsZXMobGlzdCwgc3BvcnRJZCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRTZWFzb25zICggdG91cm5hbWVudElkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC9zZWFzb25zXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogdG91cm5hbWVudElkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpc3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnNlYXNvbnMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5zZWFzb25zLnNlYXNvbiA9PT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoW10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCAkLmlzQXJyYXkocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24pICl7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSAkLm1hcChyZXNwb25zZS5zZWFzb25zLnNlYXNvbiwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5lbmRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50SWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10udG91cm5hbWVudF9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiBpdGVtWydAYXR0cmlidXRlcyddLnllYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLmVuZF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5zdGFydF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10ueWVhcixcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFNjaGVkdWxlICggc2Vhc29uSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3NjaGVkdWxlc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNlYXNvbklkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3BvcnRfZXZlbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50ID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICByZXNwb25zZS5zcG9ydF9ldmVudHMuc3BvcnRfZXZlbnQuZm9yRWFjaCggKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcm91bmQgID0gKGl0ZW0udG91cm5hbWVudF9yb3VuZCkgPyBpdGVtLnRvdXJuYW1lbnRfcm91bmRbJ0BhdHRyaWJ1dGVzJ10gOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcm91bmQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IChyb3VuZC5udW1iZXIpID8gXCJyb3VuZF9cIiArIHJvdW5kLm51bWJlciA6IHJvdW5kLm5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXSApIGxpc3RbbmFtZV0gPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoICFsaXN0W25hbWVdLm1hdGNoZXMgKSBsaXN0W25hbWVdLm1hdGNoZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlzdFtuYW1lXS5tYXRjaGVzLnNldChpdGVtWydAYXR0cmlidXRlcyddLmlkLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zY2hlZHVsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBpdGVtWydAYXR0cmlidXRlcyddLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRSb3VuZCA6IHJvdW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGV0aXRvcnMgOiAoaXRlbS5jb21wZXRpdG9ycykgPyBpdGVtLmNvbXBldGl0b3JzLmNvbXBldGl0b3IubWFwKCggY29tcGV0aXRvcik9PnsgcmV0dXJuIGNvbXBldGl0b3JbJ0BhdHRyaWJ1dGVzJ10gIH0pICA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2VhcmNoQ29tcGV0aXRpb24ocmVxdWVzdCkge1xuXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyAnYXBpL3NlYXJjaC90b3VybmFtZW50JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogcmVxdWVzdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYWRpdGlvbmFsOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZGF0YS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0uc3BvcnQpLnNvcnQoX3RoaXMuc29ydEJ5U3BvcnQpO1xuXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB3YXRjaGxpc3QoIGlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvd2F0Y2hsaXN0L2FkZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Tm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtlbnZob3N0dXJsfWFwaS9ub3RpZmljYXRpb25zL2ApO1xuICAgIH0sXG4gICAgbWFya05vdGlmaWNhdGlvbkFzVmlzaXRlZChpZCkge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgJHtlbnZob3N0dXJsfWFwaS9ub3RpZmljYXRpb25zL3Zpc2l0ZWRgLCB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG1hcmtOb3RpZmljYXRpb25Bc1NlZW4oKSB7XG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7ZW52aG9zdHVybH1hcGkvbm90aWZpY2F0aW9ucy9zZWVuYCk7XG4gICAgfSxcbiAgICBzaWduSW5Vc2VyKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgJHtlbnZob3N0dXJsfWFwaS91c2Vycy9sb2dpbmAsIHtcbiAgICAgICAgICAgIHVzZXJuYW1lLCBwYXNzd29yZFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlY292ZXJQYXNzd29yZChlbWFpbCkge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgJHtlbnZob3N0dXJsfWFwaS91c2Vycy9wYXNzd29yZC9yZWNvdmVyYCwge1xuICAgICAgICAgICAgZW1haWxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNldFBhc3N3b3JkKHBhc3N3b3JkLCBjb25maXJtYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgJHtlbnZob3N0dXJsfWFwaS91c2Vycy9wYXNzd29yZC91cGRhdGVgLCB7XG4gICAgICAgICAgICBwYXNzd29yZCwgY29uZmlybWF0aW9uVG9rZW5cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzaWduVXBVc2VyKGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBjb21wYW55TGVnYWxOYW1lKSB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KGAke2Vudmhvc3R1cmx9YXBpL3VzZXJzL3JlZ2lzdGVyYCwge1xuICAgICAgICAgICAgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGNvbXBhbnlMZWdhbE5hbWVcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5cbkNvbnRlbnRBcmVuYS5EYXRhID0gQ29udGVudEFyZW5hLkRhdGEgfHwge307XG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzID0gQ29udGVudEFyZW5hLkxhbmd1YWdlcyB8fCB7fTtcblxuQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzID0gW1xuICAgIHsgbmFtZSA6IFwiU29jY2VyXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MVwifSxcbiAgICB7IG5hbWUgOiBcIkJhc2tldGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyXCJ9LFxuICAgIHsgbmFtZSA6IFwiQmFzZWJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDozXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6NVwifSxcbiAgICB7IG5hbWUgOiBcIkNyaWNrZXRcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMVwifSxcbiAgICB7IG5hbWUgOiBcIkZpZWxkIEhvY2tleVwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjI0XCJ9LFxuICAgIHsgbmFtZSA6IFwiVm9sbGV5YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIzXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGFibGUgVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjBcIn0sXG4gICAgeyBuYW1lIDogXCJHb2xmXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6OVwifSxcbiAgICB7IG5hbWUgOiBcIkFtZXJpY2FuIEZvb3RiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MTZcIn0sXG4gICAgeyBuYW1lIDogXCJIYW5kYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjZcIn1cbl07XG5cbkNvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBbXTtcbkNvbnRlbnRBcmVuYS5EYXRhLkFjdGl2ZVNwb3J0cyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gW107XG5Db250ZW50QXJlbmEuRGF0YS5UZXJyaXRvcmllcyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuUmVnaW9ucyA9IFtdO1xuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5TaG9ydCA9IHtcbiAgICBcIm1kclwiOiBcIk1hbmRhcmluXCIsXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxuICAgIFwiYm5cIjogXCJCZW5nYWxpXCIsXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcbiAgICBcImphXCI6IFwiSmFwYW5lc2VcIixcbiAgICBcImp2XCI6IFwiSmF2YW5lc2VcIixcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXG4gICAgXCJhbGxcIiA6IFwiU2hvdyBBbGxcIlxufTtcblxuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5Mb25nID0ge1xuICAgIFwiYWFcIjogXCJBZmFyXCIsXG4gICAgXCJhZlwiOiBcIkFmcmlrYWFuc1wiLFxuICAgIFwiYWluXCI6IFwiQWludVwiLFxuICAgIFwiYWt6XCI6IFwiQWxhYmFtYVwiLFxuICAgIFwic3FcIjogXCJBbGJhbmlhblwiLFxuICAgIFwiYWxlXCI6IFwiQWxldXRcIixcbiAgICBcImFycVwiOiBcIkFsZ2VyaWFuIEFyYWJpY1wiLFxuICAgIFwiZW5fVVNcIjogXCJBbWVyaWNhbiBFbmdsaXNoXCIsXG4gICAgXCJhc2VcIjogXCJBbWVyaWNhbiBTaWduIExhbmd1YWdlXCIsXG4gICAgXCJhbVwiOiBcIkFtaGFyaWNcIixcbiAgICBcImVneVwiOiBcIkFuY2llbnQgRWd5cHRpYW5cIixcbiAgICBcImdyY1wiOiBcIkFuY2llbnQgR3JlZWtcIixcbiAgICBcImFyXCI6IFwiQXJhYmljXCIsXG4gICAgXCJhcmNcIjogXCJBcmFtYWljXCIsXG4gICAgXCJhcnBcIjogXCJBcmFwYWhvXCIsXG4gICAgXCJhcndcIjogXCJBcmF3YWtcIixcbiAgICBcImh5XCI6IFwiQXJtZW5pYW5cIixcbiAgICBcImFzXCI6IFwiQXNzYW1lc2VcIixcbiAgICBcImFzYVwiOiBcIkFzdVwiLFxuICAgIFwiZW5fQVVcIjogXCJBdXN0cmFsaWFuIEVuZ2xpc2hcIixcbiAgICBcImRlX0FUXCI6IFwiQXVzdHJpYW4gR2VybWFuXCIsXG4gICAgXCJheVwiOiBcIkF5bWFyYVwiLFxuICAgIFwiYXpcIjogXCJBemVyYmFpamFuaVwiLFxuICAgIFwiYmFuXCI6IFwiQmFsaW5lc2VcIixcbiAgICBcImV1XCI6IFwiQmFzcXVlXCIsXG4gICAgXCJiYXJcIjogXCJCYXZhcmlhblwiLFxuICAgIFwiYmVcIjogXCJCZWxhcnVzaWFuXCIsXG4gICAgXCJiblwiOiBcIkJlbmdhbGlcIixcbiAgICBcImJpa1wiOiBcIkJpa29sXCIsXG4gICAgXCJiaW5cIjogXCJCaW5pXCIsXG4gICAgXCJic1wiOiBcIkJvc25pYW5cIixcbiAgICBcImJyaFwiOiBcIkJyYWh1aVwiLFxuICAgIFwiYnJhXCI6IFwiQnJhalwiLFxuICAgIFwicHRfQlJcIjogXCJCcmF6aWxpYW4gUG9ydHVndWVzZVwiLFxuICAgIFwiYnJcIjogXCJCcmV0b25cIixcbiAgICBcImVuX0dCXCI6IFwiQnJpdGlzaCBFbmdsaXNoXCIsXG4gICAgXCJiZ1wiOiBcIkJ1bGdhcmlhblwiLFxuICAgIFwibXlcIjogXCJCdXJtZXNlXCIsXG4gICAgXCJmcmNcIjogXCJDYWp1biBGcmVuY2hcIixcbiAgICBcImVuX0NBXCI6IFwiQ2FuYWRpYW4gRW5nbGlzaFwiLFxuICAgIFwiZnJfQ0FcIjogXCJDYW5hZGlhbiBGcmVuY2hcIixcbiAgICBcInl1ZVwiOiBcIkNhbnRvbmVzZVwiLFxuICAgIFwiY2FyXCI6IFwiQ2FyaWJcIixcbiAgICBcImNhXCI6IFwiQ2F0YWxhblwiLFxuICAgIFwiY2F5XCI6IFwiQ2F5dWdhXCIsXG4gICAgXCJjZWJcIjogXCJDZWJ1YW5vXCIsXG4gICAgXCJzaHVcIjogXCJDaGFkaWFuIEFyYWJpY1wiLFxuICAgIFwiY2VcIjogXCJDaGVjaGVuXCIsXG4gICAgXCJjaHJcIjogXCJDaGVyb2tlZVwiLFxuICAgIFwicXVnXCI6IFwiQ2hpbWJvcmF6byBIaWdobGFuZCBRdWljaHVhXCIsXG4gICAgXCJ6aFwiOiBcIkNoaW5lc2VcIixcbiAgICBcImNoblwiOiBcIkNoaW5vb2sgSmFyZ29uXCIsXG4gICAgXCJjaHBcIjogXCJDaGlwZXd5YW5cIixcbiAgICBcImNob1wiOiBcIkNob2N0YXdcIixcbiAgICBcImN1XCI6IFwiQ2h1cmNoIFNsYXZpY1wiLFxuICAgIFwiY3ZcIjogXCJDaHV2YXNoXCIsXG4gICAgXCJud2NcIjogXCJDbGFzc2ljYWwgTmV3YXJpXCIsXG4gICAgXCJzeWNcIjogXCJDbGFzc2ljYWwgU3lyaWFjXCIsXG4gICAgXCJzd2NcIjogXCJDb25nbyBTd2FoaWxpXCIsXG4gICAgXCJjb3BcIjogXCJDb3B0aWNcIixcbiAgICBcImt3XCI6IFwiQ29ybmlzaFwiLFxuICAgIFwiY29cIjogXCJDb3JzaWNhblwiLFxuICAgIFwiY3JcIjogXCJDcmVlXCIsXG4gICAgXCJtdXNcIjogXCJDcmVla1wiLFxuICAgIFwiY3JoXCI6IFwiQ3JpbWVhbiBUdXJraXNoXCIsXG4gICAgXCJoclwiOiBcIkNyb2F0aWFuXCIsXG4gICAgXCJjc1wiOiBcIkN6ZWNoXCIsXG4gICAgXCJkYWtcIjogXCJEYWtvdGFcIixcbiAgICBcImRhXCI6IFwiRGFuaXNoXCIsXG4gICAgXCJkZWxcIjogXCJEZWxhd2FyZVwiLFxuICAgIFwibmxcIjogXCJEdXRjaFwiLFxuICAgIFwiZnJzXCI6IFwiRWFzdGVybiBGcmlzaWFuXCIsXG4gICAgXCJhcnpcIjogXCJFZ3lwdGlhbiBBcmFiaWNcIixcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxuICAgIFwiZW9cIjogXCJFc3BlcmFudG9cIixcbiAgICBcImV0XCI6IFwiRXN0b25pYW5cIixcbiAgICBcInB0X1BUXCI6IFwiRXVyb3BlYW4gUG9ydHVndWVzZVwiLFxuICAgIFwiZXNfRVNcIjogXCJFdXJvcGVhbiBTcGFuaXNoXCIsXG4gICAgXCJlZVwiOiBcIkV3ZVwiLFxuICAgIFwiZmFuXCI6IFwiRmFuZ1wiLFxuICAgIFwiaGlmXCI6IFwiRmlqaSBIaW5kaVwiLFxuICAgIFwiZmpcIjogXCJGaWppYW5cIixcbiAgICBcImZpbFwiOiBcIkZpbGlwaW5vXCIsXG4gICAgXCJmaVwiOiBcIkZpbm5pc2hcIixcbiAgICBcIm5sX0JFXCI6IFwiRmxlbWlzaFwiLFxuICAgIFwiZm9uXCI6IFwiRm9uXCIsXG4gICAgXCJmclwiOiBcIkZyZW5jaFwiLFxuICAgIFwiZ2FhXCI6IFwiR2FcIixcbiAgICBcImdhblwiOiBcIkdhbiBDaGluZXNlXCIsXG4gICAgXCJrYVwiOiBcIkdlb3JnaWFuXCIsXG4gICAgXCJkZVwiOiBcIkdlcm1hblwiLFxuICAgIFwiZ290XCI6IFwiR290aGljXCIsXG4gICAgXCJncmJcIjogXCJHcmVib1wiLFxuICAgIFwiZWxcIjogXCJHcmVla1wiLFxuICAgIFwiZ25cIjogXCJHdWFyYW5pXCIsXG4gICAgXCJndVwiOiBcIkd1amFyYXRpXCIsXG4gICAgXCJndXpcIjogXCJHdXNpaVwiLFxuICAgIFwiaGFpXCI6IFwiSGFpZGFcIixcbiAgICBcImh0XCI6IFwiSGFpdGlhblwiLFxuICAgIFwiaGFrXCI6IFwiSGFra2EgQ2hpbmVzZVwiLFxuICAgIFwiaGFcIjogXCJIYXVzYVwiLFxuICAgIFwiaGF3XCI6IFwiSGF3YWlpYW5cIixcbiAgICBcImhlXCI6IFwiSGVicmV3XCIsXG4gICAgXCJoelwiOiBcIkhlcmVyb1wiLFxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxuICAgIFwiaGl0XCI6IFwiSGl0dGl0ZVwiLFxuICAgIFwiaG1uXCI6IFwiSG1vbmdcIixcbiAgICBcImh1XCI6IFwiSHVuZ2FyaWFuXCIsXG4gICAgXCJpc1wiOiBcIkljZWxhbmRpY1wiLFxuICAgIFwiaW9cIjogXCJJZG9cIixcbiAgICBcImlnXCI6IFwiSWdib1wiLFxuICAgIFwiaXVcIjogXCJJbnVrdGl0dXRcIixcbiAgICBcImlrXCI6IFwiSW51cGlhcVwiLFxuICAgIFwiZ2FcIjogXCJJcmlzaFwiLFxuICAgIFwiaXRcIjogXCJJdGFsaWFuXCIsXG4gICAgXCJqYW1cIjogXCJKYW1haWNhbiBDcmVvbGUgRW5nbGlzaFwiLFxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxuICAgIFwianZcIjogXCJKYXZhbmVzZVwiLFxuICAgIFwia2FqXCI6IFwiSmp1XCIsXG4gICAgXCJkeW9cIjogXCJKb2xhLUZvbnlpXCIsXG4gICAgXCJ4YWxcIjogXCJLYWxteWtcIixcbiAgICBcImthbVwiOiBcIkthbWJhXCIsXG4gICAgXCJrYmxcIjogXCJLYW5lbWJ1XCIsXG4gICAgXCJrblwiOiBcIkthbm5hZGFcIixcbiAgICBcImtyXCI6IFwiS2FudXJpXCIsXG4gICAgXCJrYWFcIjogXCJLYXJhLUthbHBha1wiLFxuICAgIFwia3JjXCI6IFwiS2FyYWNoYXktQmFsa2FyXCIsXG4gICAgXCJrcmxcIjogXCJLYXJlbGlhblwiLFxuICAgIFwia3NcIjogXCJLYXNobWlyaVwiLFxuICAgIFwiY3NiXCI6IFwiS2FzaHViaWFuXCIsXG4gICAgXCJrYXdcIjogXCJLYXdpXCIsXG4gICAgXCJra1wiOiBcIkthemFraFwiLFxuICAgIFwia2VuXCI6IFwiS2VueWFuZ1wiLFxuICAgIFwia2hhXCI6IFwiS2hhc2lcIixcbiAgICBcImttXCI6IFwiS2htZXJcIixcbiAgICBcImtob1wiOiBcIktob3RhbmVzZVwiLFxuICAgIFwia2h3XCI6IFwiS2hvd2FyXCIsXG4gICAgXCJraVwiOiBcIktpa3V5dVwiLFxuICAgIFwia21iXCI6IFwiS2ltYnVuZHVcIixcbiAgICBcImtyalwiOiBcIktpbmFyYXktYVwiLFxuICAgIFwicndcIjogXCJLaW55YXJ3YW5kYVwiLFxuICAgIFwia2l1XCI6IFwiS2lybWFuamtpXCIsXG4gICAgXCJ0bGhcIjogXCJLbGluZ29uXCIsXG4gICAgXCJia21cIjogXCJLb21cIixcbiAgICBcImt2XCI6IFwiS29taVwiLFxuICAgIFwia29pXCI6IFwiS29taS1QZXJteWFrXCIsXG4gICAgXCJrZ1wiOiBcIktvbmdvXCIsXG4gICAgXCJrb2tcIjogXCJLb25rYW5pXCIsXG4gICAgXCJrb1wiOiBcIktvcmVhblwiLFxuICAgIFwia2ZvXCI6IFwiS29yb1wiLFxuICAgIFwia29zXCI6IFwiS29zcmFlYW5cIixcbiAgICBcImF2a1wiOiBcIktvdGF2YVwiLFxuICAgIFwia2hxXCI6IFwiS295cmEgQ2hpaW5pXCIsXG4gICAgXCJzZXNcIjogXCJLb3lyYWJvcm8gU2VubmlcIixcbiAgICBcImtwZVwiOiBcIktwZWxsZVwiLFxuICAgIFwia3JpXCI6IFwiS3Jpb1wiLFxuICAgIFwia2pcIjogXCJLdWFueWFtYVwiLFxuICAgIFwia3VtXCI6IFwiS3VteWtcIixcbiAgICBcImt1XCI6IFwiS3VyZGlzaFwiLFxuICAgIFwia3J1XCI6IFwiS3VydWtoXCIsXG4gICAgXCJrdXRcIjogXCJLdXRlbmFpXCIsXG4gICAgXCJubWdcIjogXCJLd2FzaW9cIixcbiAgICBcImt5XCI6IFwiS3lyZ3l6XCIsXG4gICAgXCJxdWNcIjogXCJLXFx1MDJiY2ljaGVcXHUwMmJjXCIsXG4gICAgXCJsYWRcIjogXCJMYWRpbm9cIixcbiAgICBcImxhaFwiOiBcIkxhaG5kYVwiLFxuICAgIFwibGt0XCI6IFwiTGFrb3RhXCIsXG4gICAgXCJsYW1cIjogXCJMYW1iYVwiLFxuICAgIFwibGFnXCI6IFwiTGFuZ2lcIixcbiAgICBcImxvXCI6IFwiTGFvXCIsXG4gICAgXCJsdGdcIjogXCJMYXRnYWxpYW5cIixcbiAgICBcImxhXCI6IFwiTGF0aW5cIixcbiAgICBcImVzXzQxOVwiOiBcIkxhdGluIEFtZXJpY2FuIFNwYW5pc2hcIixcbiAgICBcImx2XCI6IFwiTGF0dmlhblwiLFxuICAgIFwibHp6XCI6IFwiTGF6XCIsXG4gICAgXCJsZXpcIjogXCJMZXpnaGlhblwiLFxuICAgIFwibGlqXCI6IFwiTGlndXJpYW5cIixcbiAgICBcImxpXCI6IFwiTGltYnVyZ2lzaFwiLFxuICAgIFwibG5cIjogXCJMaW5nYWxhXCIsXG4gICAgXCJsZm5cIjogXCJMaW5ndWEgRnJhbmNhIE5vdmFcIixcbiAgICBcImx6aFwiOiBcIkxpdGVyYXJ5IENoaW5lc2VcIixcbiAgICBcImx0XCI6IFwiTGl0aHVhbmlhblwiLFxuICAgIFwibGl2XCI6IFwiTGl2b25pYW5cIixcbiAgICBcImpib1wiOiBcIkxvamJhblwiLFxuICAgIFwibG1vXCI6IFwiTG9tYmFyZFwiLFxuICAgIFwibmRzXCI6IFwiTG93IEdlcm1hblwiLFxuICAgIFwic2xpXCI6IFwiTG93ZXIgU2lsZXNpYW5cIixcbiAgICBcImRzYlwiOiBcIkxvd2VyIFNvcmJpYW5cIixcbiAgICBcImxvelwiOiBcIkxvemlcIixcbiAgICBcImx1XCI6IFwiTHViYS1LYXRhbmdhXCIsXG4gICAgXCJsdWFcIjogXCJMdWJhLUx1bHVhXCIsXG4gICAgXCJsdWlcIjogXCJMdWlzZW5vXCIsXG4gICAgXCJzbWpcIjogXCJMdWxlIFNhbWlcIixcbiAgICBcImx1blwiOiBcIkx1bmRhXCIsXG4gICAgXCJsdW9cIjogXCJMdW9cIixcbiAgICBcImxiXCI6IFwiTHV4ZW1ib3VyZ2lzaFwiLFxuICAgIFwibHV5XCI6IFwiTHV5aWFcIixcbiAgICBcIm1kZVwiOiBcIk1hYmFcIixcbiAgICBcIm1rXCI6IFwiTWFjZWRvbmlhblwiLFxuICAgIFwiam1jXCI6IFwiTWFjaGFtZVwiLFxuICAgIFwibWFkXCI6IFwiTWFkdXJlc2VcIixcbiAgICBcIm1hZlwiOiBcIk1hZmFcIixcbiAgICBcIm1hZ1wiOiBcIk1hZ2FoaVwiLFxuICAgIFwidm1mXCI6IFwiTWFpbi1GcmFuY29uaWFuXCIsXG4gICAgXCJtYWlcIjogXCJNYWl0aGlsaVwiLFxuICAgIFwibWFrXCI6IFwiTWFrYXNhclwiLFxuICAgIFwibWdoXCI6IFwiTWFraHV3YS1NZWV0dG9cIixcbiAgICBcImtkZVwiOiBcIk1ha29uZGVcIixcbiAgICBcIm1nXCI6IFwiTWFsYWdhc3lcIixcbiAgICBcIm1zXCI6IFwiTWFsYXlcIixcbiAgICBcIm1sXCI6IFwiTWFsYXlhbGFtXCIsXG4gICAgXCJtdFwiOiBcIk1hbHRlc2VcIixcbiAgICBcIm1uY1wiOiBcIk1hbmNodVwiLFxuICAgIFwibWRyXCI6IFwiTWFuZGFyaW5cIixcbiAgICBcIm1hblwiOiBcIk1hbmRpbmdvXCIsXG4gICAgXCJtbmlcIjogXCJNYW5pcHVyaVwiLFxuICAgIFwiZ3ZcIjogXCJNYW54XCIsXG4gICAgXCJtaVwiOiBcIk1hb3JpXCIsXG4gICAgXCJhcm5cIjogXCJNYXB1Y2hlXCIsXG4gICAgXCJtclwiOiBcIk1hcmF0aGlcIixcbiAgICBcImNobVwiOiBcIk1hcmlcIixcbiAgICBcIm1oXCI6IFwiTWFyc2hhbGxlc2VcIixcbiAgICBcIm13clwiOiBcIk1hcndhcmlcIixcbiAgICBcIm1hc1wiOiBcIk1hc2FpXCIsXG4gICAgXCJtem5cIjogXCJNYXphbmRlcmFuaVwiLFxuICAgIFwiYnl2XCI6IFwiTWVkdW1iYVwiLFxuICAgIFwibWVuXCI6IFwiTWVuZGVcIixcbiAgICBcIm13dlwiOiBcIk1lbnRhd2FpXCIsXG4gICAgXCJtZXJcIjogXCJNZXJ1XCIsXG4gICAgXCJtZ29cIjogXCJNZXRhXFx1MDJiY1wiLFxuICAgIFwiZXNfTVhcIjogXCJNZXhpY2FuIFNwYW5pc2hcIixcbiAgICBcIm1pY1wiOiBcIk1pY21hY1wiLFxuICAgIFwiZHVtXCI6IFwiTWlkZGxlIER1dGNoXCIsXG4gICAgXCJlbm1cIjogXCJNaWRkbGUgRW5nbGlzaFwiLFxuICAgIFwiZnJtXCI6IFwiTWlkZGxlIEZyZW5jaFwiLFxuICAgIFwiZ21oXCI6IFwiTWlkZGxlIEhpZ2ggR2VybWFuXCIsXG4gICAgXCJtZ2FcIjogXCJNaWRkbGUgSXJpc2hcIixcbiAgICBcIm5hblwiOiBcIk1pbiBOYW4gQ2hpbmVzZVwiLFxuICAgIFwibWluXCI6IFwiTWluYW5na2FiYXVcIixcbiAgICBcInhtZlwiOiBcIk1pbmdyZWxpYW5cIixcbiAgICBcIm13bFwiOiBcIk1pcmFuZGVzZVwiLFxuICAgIFwibHVzXCI6IFwiTWl6b1wiLFxuICAgIFwiYXJfMDAxXCI6IFwiTW9kZXJuIFN0YW5kYXJkIEFyYWJpY1wiLFxuICAgIFwibW9oXCI6IFwiTW9oYXdrXCIsXG4gICAgXCJtZGZcIjogXCJNb2tzaGFcIixcbiAgICBcInJvX01EXCI6IFwiTW9sZGF2aWFuXCIsXG4gICAgXCJsb2xcIjogXCJNb25nb1wiLFxuICAgIFwibW5cIjogXCJNb25nb2xpYW5cIixcbiAgICBcIm1mZVwiOiBcIk1vcmlzeWVuXCIsXG4gICAgXCJhcnlcIjogXCJNb3JvY2NhbiBBcmFiaWNcIixcbiAgICBcIm1vc1wiOiBcIk1vc3NpXCIsXG4gICAgXCJtdWxcIjogXCJNdWx0aXBsZSBMYW5ndWFnZXNcIixcbiAgICBcIm11YVwiOiBcIk11bmRhbmdcIixcbiAgICBcInR0dFwiOiBcIk11c2xpbSBUYXRcIixcbiAgICBcIm15ZVwiOiBcIk15ZW5lXCIsXG4gICAgXCJuYXFcIjogXCJOYW1hXCIsXG4gICAgXCJuYVwiOiBcIk5hdXJ1XCIsXG4gICAgXCJudlwiOiBcIk5hdmFqb1wiLFxuICAgIFwibmdcIjogXCJOZG9uZ2FcIixcbiAgICBcIm5hcFwiOiBcIk5lYXBvbGl0YW5cIixcbiAgICBcIm5lXCI6IFwiTmVwYWxpXCIsXG4gICAgXCJuZXdcIjogXCJOZXdhcmlcIixcbiAgICBcInNiYVwiOiBcIk5nYW1iYXlcIixcbiAgICBcIm5uaFwiOiBcIk5naWVtYm9vblwiLFxuICAgIFwiamdvXCI6IFwiTmdvbWJhXCIsXG4gICAgXCJ5cmxcIjogXCJOaGVlbmdhdHVcIixcbiAgICBcIm5pYVwiOiBcIk5pYXNcIixcbiAgICBcIm5pdVwiOiBcIk5pdWVhblwiLFxuICAgIFwienh4XCI6IFwiTm8gbGluZ3Vpc3RpYyBjb250ZW50XCIsXG4gICAgXCJub2dcIjogXCJOb2dhaVwiLFxuICAgIFwibmRcIjogXCJOb3J0aCBOZGViZWxlXCIsXG4gICAgXCJmcnJcIjogXCJOb3J0aGVybiBGcmlzaWFuXCIsXG4gICAgXCJzZVwiOiBcIk5vcnRoZXJuIFNhbWlcIixcbiAgICBcIm5zb1wiOiBcIk5vcnRoZXJuIFNvdGhvXCIsXG4gICAgXCJub1wiOiBcIk5vcndlZ2lhblwiLFxuICAgIFwibmJcIjogXCJOb3J3ZWdpYW4gQm9rbVxcdTAwZTVsXCIsXG4gICAgXCJublwiOiBcIk5vcndlZ2lhbiBOeW5vcnNrXCIsXG4gICAgXCJub3ZcIjogXCJOb3ZpYWxcIixcbiAgICBcIm51c1wiOiBcIk51ZXJcIixcbiAgICBcIm55bVwiOiBcIk55YW13ZXppXCIsXG4gICAgXCJueVwiOiBcIk55YW5qYVwiLFxuICAgIFwibnluXCI6IFwiTnlhbmtvbGVcIixcbiAgICBcInRvZ1wiOiBcIk55YXNhIFRvbmdhXCIsXG4gICAgXCJueW9cIjogXCJOeW9yb1wiLFxuICAgIFwibnppXCI6IFwiTnppbWFcIixcbiAgICBcIm5xb1wiOiBcIk5cXHUwMmJjS29cIixcbiAgICBcIm9jXCI6IFwiT2NjaXRhblwiLFxuICAgIFwib2pcIjogXCJPamlid2FcIixcbiAgICBcImFuZ1wiOiBcIk9sZCBFbmdsaXNoXCIsXG4gICAgXCJmcm9cIjogXCJPbGQgRnJlbmNoXCIsXG4gICAgXCJnb2hcIjogXCJPbGQgSGlnaCBHZXJtYW5cIixcbiAgICBcInNnYVwiOiBcIk9sZCBJcmlzaFwiLFxuICAgIFwibm9uXCI6IFwiT2xkIE5vcnNlXCIsXG4gICAgXCJwZW9cIjogXCJPbGQgUGVyc2lhblwiLFxuICAgIFwicHJvXCI6IFwiT2xkIFByb3ZlblxcdTAwZTdhbFwiLFxuICAgIFwib3JcIjogXCJPcml5YVwiLFxuICAgIFwib21cIjogXCJPcm9tb1wiLFxuICAgIFwib3NhXCI6IFwiT3NhZ2VcIixcbiAgICBcIm9zXCI6IFwiT3NzZXRpY1wiLFxuICAgIFwib3RhXCI6IFwiT3R0b21hbiBUdXJraXNoXCIsXG4gICAgXCJwYWxcIjogXCJQYWhsYXZpXCIsXG4gICAgXCJwZmxcIjogXCJQYWxhdGluZSBHZXJtYW5cIixcbiAgICBcInBhdVwiOiBcIlBhbGF1YW5cIixcbiAgICBcInBpXCI6IFwiUGFsaVwiLFxuICAgIFwicGRjXCI6IFwiUGVubnN5bHZhbmlhIEdlcm1hblwiLFxuICAgIFwiZmFcIjogXCJQZXJzaWFuXCIsXG4gICAgXCJwaG5cIjogXCJQaG9lbmljaWFuXCIsXG4gICAgXCJwY2RcIjogXCJQaWNhcmRcIixcbiAgICBcInBtc1wiOiBcIlBpZWRtb250ZXNlXCIsXG4gICAgXCJwZHRcIjogXCJQbGF1dGRpZXRzY2hcIixcbiAgICBcInBvblwiOiBcIlBvaG5wZWlhblwiLFxuICAgIFwicGxcIjogXCJQb2xpc2hcIixcbiAgICBcInBudFwiOiBcIlBvbnRpY1wiLFxuICAgIFwicHRcIjogXCJQb3J0dWd1ZXNlXCIsXG4gICAgXCJwcmdcIjogXCJQcnVzc2lhblwiLFxuICAgIFwicGFcIjogXCJQdW5qYWJpXCIsXG4gICAgXCJxdVwiOiBcIlF1ZWNodWFcIixcbiAgICBcInJvXCI6IFwiUm9tYW5pYW5cIixcbiAgICBcInJtXCI6IFwiUm9tYW5zaFwiLFxuICAgIFwicm9tXCI6IFwiUm9tYW55XCIsXG4gICAgXCJyb290XCI6IFwiUm9vdFwiLFxuICAgIFwicnVcIjogXCJSdXNzaWFuXCIsXG4gICAgXCJyd2tcIjogXCJSd2FcIixcbiAgICBcInNhaFwiOiBcIlNha2hhXCIsXG4gICAgXCJzYW1cIjogXCJTYW1hcml0YW4gQXJhbWFpY1wiLFxuICAgIFwic21cIjogXCJTYW1vYW5cIixcbiAgICBcInNjb1wiOiBcIlNjb3RzXCIsXG4gICAgXCJnZFwiOiBcIlNjb3R0aXNoIEdhZWxpY1wiLFxuICAgIFwic2x5XCI6IFwiU2VsYXlhclwiLFxuICAgIFwic2VsXCI6IFwiU2Vsa3VwXCIsXG4gICAgXCJzZWhcIjogXCJTZW5hXCIsXG4gICAgXCJzZWVcIjogXCJTZW5lY2FcIixcbiAgICBcInNyXCI6IFwiU2VyYmlhblwiLFxuICAgIFwic2hcIjogXCJTZXJiby1Dcm9hdGlhblwiLFxuICAgIFwic3JyXCI6IFwiU2VyZXJcIixcbiAgICBcInNlaVwiOiBcIlNlcmlcIixcbiAgICBcImtzYlwiOiBcIlNoYW1iYWxhXCIsXG4gICAgXCJzaG5cIjogXCJTaGFuXCIsXG4gICAgXCJzblwiOiBcIlNob25hXCIsXG4gICAgXCJpaVwiOiBcIlNpY2h1YW4gWWlcIixcbiAgICBcInNjblwiOiBcIlNpY2lsaWFuXCIsXG4gICAgXCJzaWRcIjogXCJTaWRhbW9cIixcbiAgICBcImJsYVwiOiBcIlNpa3Npa2FcIixcbiAgICBcInN6bFwiOiBcIlNpbGVzaWFuXCIsXG4gICAgXCJ6aF9IYW5zXCI6IFwiU2ltcGxpZmllZCBDaGluZXNlXCIsXG4gICAgXCJzZFwiOiBcIlNpbmRoaVwiLFxuICAgIFwic2lcIjogXCJTaW5oYWxhXCIsXG4gICAgXCJzbXNcIjogXCJTa29sdCBTYW1pXCIsXG4gICAgXCJkZW5cIjogXCJTbGF2ZVwiLFxuICAgIFwic2tcIjogXCJTbG92YWtcIixcbiAgICBcInNsXCI6IFwiU2xvdmVuaWFuXCIsXG4gICAgXCJ4b2dcIjogXCJTb2dhXCIsXG4gICAgXCJzb2dcIjogXCJTb2dkaWVuXCIsXG4gICAgXCJzb1wiOiBcIlNvbWFsaVwiLFxuICAgIFwic25rXCI6IFwiU29uaW5rZVwiLFxuICAgIFwiY2tiXCI6IFwiU29yYW5pIEt1cmRpc2hcIixcbiAgICBcImF6YlwiOiBcIlNvdXRoIEF6ZXJiYWlqYW5pXCIsXG4gICAgXCJuclwiOiBcIlNvdXRoIE5kZWJlbGVcIixcbiAgICBcImFsdFwiOiBcIlNvdXRoZXJuIEFsdGFpXCIsXG4gICAgXCJzbWFcIjogXCJTb3V0aGVybiBTYW1pXCIsXG4gICAgXCJzdFwiOiBcIlNvdXRoZXJuIFNvdGhvXCIsXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcbiAgICBcInNyblwiOiBcIlNyYW5hbiBUb25nb1wiLFxuICAgIFwiemdoXCI6IFwiU3RhbmRhcmQgTW9yb2NjYW4gVGFtYXppZ2h0XCIsXG4gICAgXCJzdWtcIjogXCJTdWt1bWFcIixcbiAgICBcInN1eFwiOiBcIlN1bWVyaWFuXCIsXG4gICAgXCJzdVwiOiBcIlN1bmRhbmVzZVwiLFxuICAgIFwic3VzXCI6IFwiU3VzdVwiLFxuICAgIFwic3dcIjogXCJTd2FoaWxpXCIsXG4gICAgXCJzc1wiOiBcIlN3YXRpXCIsXG4gICAgXCJzdlwiOiBcIlN3ZWRpc2hcIixcbiAgICBcImZyX0NIXCI6IFwiU3dpc3MgRnJlbmNoXCIsXG4gICAgXCJnc3dcIjogXCJTd2lzcyBHZXJtYW5cIixcbiAgICBcImRlX0NIXCI6IFwiU3dpc3MgSGlnaCBHZXJtYW5cIixcbiAgICBcInN5clwiOiBcIlN5cmlhY1wiLFxuICAgIFwic2hpXCI6IFwiVGFjaGVsaGl0XCIsXG4gICAgXCJ0bFwiOiBcIlRhZ2Fsb2dcIixcbiAgICBcInR5XCI6IFwiVGFoaXRpYW5cIixcbiAgICBcImRhdlwiOiBcIlRhaXRhXCIsXG4gICAgXCJ0Z1wiOiBcIlRhamlrXCIsXG4gICAgXCJ0bHlcIjogXCJUYWx5c2hcIixcbiAgICBcInRtaFwiOiBcIlRhbWFzaGVrXCIsXG4gICAgXCJ0YVwiOiBcIlRhbWlsXCIsXG4gICAgXCJ0cnZcIjogXCJUYXJva29cIixcbiAgICBcInR3cVwiOiBcIlRhc2F3YXFcIixcbiAgICBcInR0XCI6IFwiVGF0YXJcIixcbiAgICBcInRlXCI6IFwiVGVsdWd1XCIsXG4gICAgXCJ0ZXJcIjogXCJUZXJlbm9cIixcbiAgICBcInRlb1wiOiBcIlRlc29cIixcbiAgICBcInRldFwiOiBcIlRldHVtXCIsXG4gICAgXCJ0aFwiOiBcIlRoYWlcIixcbiAgICBcImJvXCI6IFwiVGliZXRhblwiLFxuICAgIFwidGlnXCI6IFwiVGlncmVcIixcbiAgICBcInRpXCI6IFwiVGlncmlueWFcIixcbiAgICBcInRlbVwiOiBcIlRpbW5lXCIsXG4gICAgXCJ0aXZcIjogXCJUaXZcIixcbiAgICBcInRsaVwiOiBcIlRsaW5naXRcIixcbiAgICBcInRwaVwiOiBcIlRvayBQaXNpblwiLFxuICAgIFwidGtsXCI6IFwiVG9rZWxhdVwiLFxuICAgIFwidG9cIjogXCJUb25nYW5cIixcbiAgICBcImZpdFwiOiBcIlRvcm5lZGFsZW4gRmlubmlzaFwiLFxuICAgIFwiemhfSGFudFwiOiBcIlRyYWRpdGlvbmFsIENoaW5lc2VcIixcbiAgICBcInRrclwiOiBcIlRzYWtodXJcIixcbiAgICBcInRzZFwiOiBcIlRzYWtvbmlhblwiLFxuICAgIFwidHNpXCI6IFwiVHNpbXNoaWFuXCIsXG4gICAgXCJ0c1wiOiBcIlRzb25nYVwiLFxuICAgIFwidG5cIjogXCJUc3dhbmFcIixcbiAgICBcInRjeVwiOiBcIlR1bHVcIixcbiAgICBcInR1bVwiOiBcIlR1bWJ1a2FcIixcbiAgICBcImFlYlwiOiBcIlR1bmlzaWFuIEFyYWJpY1wiLFxuICAgIFwidHJcIjogXCJUdXJraXNoXCIsXG4gICAgXCJ0a1wiOiBcIlR1cmttZW5cIixcbiAgICBcInRydVwiOiBcIlR1cm95b1wiLFxuICAgIFwidHZsXCI6IFwiVHV2YWx1XCIsXG4gICAgXCJ0eXZcIjogXCJUdXZpbmlhblwiLFxuICAgIFwidHdcIjogXCJUd2lcIixcbiAgICBcImtjZ1wiOiBcIlR5YXBcIixcbiAgICBcInVkbVwiOiBcIlVkbXVydFwiLFxuICAgIFwidWdhXCI6IFwiVWdhcml0aWNcIixcbiAgICBcInVrXCI6IFwiVWtyYWluaWFuXCIsXG4gICAgXCJ1bWJcIjogXCJVbWJ1bmR1XCIsXG4gICAgXCJ1bmRcIjogXCJVbmtub3duIExhbmd1YWdlXCIsXG4gICAgXCJoc2JcIjogXCJVcHBlciBTb3JiaWFuXCIsXG4gICAgXCJ1clwiOiBcIlVyZHVcIixcbiAgICBcInVnXCI6IFwiVXlnaHVyXCIsXG4gICAgXCJ1elwiOiBcIlV6YmVrXCIsXG4gICAgXCJ2YWlcIjogXCJWYWlcIixcbiAgICBcInZlXCI6IFwiVmVuZGFcIixcbiAgICBcInZlY1wiOiBcIlZlbmV0aWFuXCIsXG4gICAgXCJ2ZXBcIjogXCJWZXBzXCIsXG4gICAgXCJ2aVwiOiBcIlZpZXRuYW1lc2VcIixcbiAgICBcInZvXCI6IFwiVm9sYXBcXHUwMGZja1wiLFxuICAgIFwidnJvXCI6IFwiVlxcdTAwZjVyb1wiLFxuICAgIFwidm90XCI6IFwiVm90aWNcIixcbiAgICBcInZ1blwiOiBcIlZ1bmpvXCIsXG4gICAgXCJ3YVwiOiBcIldhbGxvb25cIixcbiAgICBcIndhZVwiOiBcIldhbHNlclwiLFxuICAgIFwid2FyXCI6IFwiV2FyYXlcIixcbiAgICBcIndhc1wiOiBcIldhc2hvXCIsXG4gICAgXCJndWNcIjogXCJXYXl1dVwiLFxuICAgIFwiY3lcIjogXCJXZWxzaFwiLFxuICAgIFwidmxzXCI6IFwiV2VzdCBGbGVtaXNoXCIsXG4gICAgXCJmeVwiOiBcIldlc3Rlcm4gRnJpc2lhblwiLFxuICAgIFwibXJqXCI6IFwiV2VzdGVybiBNYXJpXCIsXG4gICAgXCJ3YWxcIjogXCJXb2xheXR0YVwiLFxuICAgIFwid29cIjogXCJXb2xvZlwiLFxuICAgIFwid3V1XCI6IFwiV3UgQ2hpbmVzZVwiLFxuICAgIFwieGhcIjogXCJYaG9zYVwiLFxuICAgIFwiaHNuXCI6IFwiWGlhbmcgQ2hpbmVzZVwiLFxuICAgIFwieWF2XCI6IFwiWWFuZ2JlblwiLFxuICAgIFwieWFvXCI6IFwiWWFvXCIsXG4gICAgXCJ5YXBcIjogXCJZYXBlc2VcIixcbiAgICBcInliYlwiOiBcIlllbWJhXCIsXG4gICAgXCJ5aVwiOiBcIllpZGRpc2hcIixcbiAgICBcInlvXCI6IFwiWW9ydWJhXCIsXG4gICAgXCJ6YXBcIjogXCJaYXBvdGVjXCIsXG4gICAgXCJkamVcIjogXCJaYXJtYVwiLFxuICAgIFwienphXCI6IFwiWmF6YVwiLFxuICAgIFwiemVhXCI6IFwiWmVlbGFuZGljXCIsXG4gICAgXCJ6ZW5cIjogXCJaZW5hZ2FcIixcbiAgICBcInphXCI6IFwiWmh1YW5nXCIsXG4gICAgXCJnYnpcIjogXCJab3JvYXN0cmlhbiBEYXJpXCIsXG4gICAgXCJ6dVwiOiBcIlp1bHVcIixcbiAgICBcInp1blwiOiBcIlp1bmlcIlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5kYXRhLmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuICovXG5cbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4uL21haW4vc3RvcmUnO1xuXG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuQ29udGVudEFyZW5hLlV0aWxzID0ge1xuXG4gICAgY29udGVudFBhcnNlckZyb21TZXJ2ZXIoY29udGVudCkge1xuXG4gICAgICAgIGlmICggY29udGVudC5wYXJzZWQgKSByZXR1cm4gY29udGVudDtcblxuICAgICAgICBsZXQgc29ydCA9IHRydWU7XG5cbiAgICAgICAgaWYgKCBjb250ZW50LmV4dHJhRGF0YSl7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhjb250ZW50LmV4dHJhRGF0YSkuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAoW2tleSwgdmFsdWVdKSA9PiBjb250ZW50W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRlbnQudG91cm5hbWVudCA9IChjb250ZW50LnRvdXJuYW1lbnQpID8gQXJyYXkuaXNBcnJheShjb250ZW50LnRvdXJuYW1lbnQpPyBjb250ZW50LnRvdXJuYW1lbnQgOiBbY29udGVudC50b3VybmFtZW50XSA6IFtdO1xuICAgICAgICBjb250ZW50LnNwb3J0Q2F0ZWdvcnkgPSAoY29udGVudC5zcG9ydENhdGVnb3J5KSA/IEFycmF5LmlzQXJyYXkoY29udGVudC5zcG9ydENhdGVnb3J5KT8gY29udGVudC5zcG9ydENhdGVnb3J5IDogW2NvbnRlbnQuc3BvcnRDYXRlZ29yeV0gOiBbXTtcblxuICAgICAgICBpZiAoY29udGVudC5zZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodCl7XG4gICAgICAgICAgICBjb250ZW50LnJpZ2h0c1BhY2thZ2UuZm9yRWFjaCggKHJwKSA9PiB7XG4gICAgICAgICAgICAgICAgcnAuc2VsZWN0ZWRSaWdodHMgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnaXRlbXMnXTtcbiAgICAgICAgICAgICAgICBycC5leGNsdXNpdmUgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnZXhjbHVzaXZlJ107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50LmZpeHR1cmVzQnlTZWFzb24pe1xuICAgICAgICAgICAgY29udGVudC5zZWFzb25zLmZvckVhY2goIChzLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcy5maXh0dXJlcyA9IGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbltpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudC5sYXcpe1xuICAgICAgICAgICAgY29udGVudC5sYXcubGFiZWwgPSBjb250ZW50Lmxhdy5uYW1lO1xuICAgICAgICAgICAgY29udGVudC5sYXcudmFsdWUgPSBjb250ZW50Lmxhdy5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBjb250ZW50LmN1c3RvbUJ1bmRsZXMgKSB7XG4gICAgICAgICAgICBjb250ZW50LmN1c3RvbUJ1bmRsZXMuZm9yRWFjaCgoc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3Auc2FsZXNNZXRob2QpIHNwLnNhbGVzTWV0aG9kID0gc3Auc2FsZXNNZXRob2QubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoc3AuZXhjbHVkZWRDb3VudHJpZXMpIHNwLmV4Y2x1ZGVkVGVycml0b3JpZXMgPSBzcC5leGNsdWRlZENvdW50cmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZSwgcmVnaW9uczp0LnJlZ2lvbnMsIHRlcnJpdG9yeUlkOnQudGVycml0b3J5SWR9fSlcbiAgICAgICAgICAgICAgICBpZiAoc3AudGVycml0b3JpZXMpIHNwLnRlcnJpdG9yaWVzID0gc3AudGVycml0b3JpZXMubWFwKHQ9PntyZXR1cm57bmFtZTp0Lm5hbWUsbGFiZWw6dC5uYW1lLCB2YWx1ZTp0Lm5hbWUsIHJlZ2lvbnM6dC5yZWdpb25zLCB0ZXJyaXRvcnlJZDp0LnRlcnJpdG9yeUlkfX0pXG4gICAgICAgICAgICAgICAgaWYgKCFzcC50ZXJyaXRvcmllcykgc29ydCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwLmluc3RhbGxtZW50cyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcC5pbnN0YWxsbWVudHMuZm9yRWFjaChpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkuZGF0ZSkgaS5kYXRlID0gbW9tZW50KGkuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSl7fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGNvbnRlbnQuc2FsZXNQYWNrYWdlcyApIHtcbiAgICAgICAgICAgIGNvbnRlbnQuc2FsZXNQYWNrYWdlcy5mb3JFYWNoKChzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzcC5zYWxlc01ldGhvZCkgc3Auc2FsZXNNZXRob2QgPSBzcC5zYWxlc01ldGhvZC5uYW1lO1xuICAgICAgICAgICAgICAgIGlmIChzcC5leGNsdWRlZENvdW50cmllcykgc3AuZXhjbHVkZWRUZXJyaXRvcmllcyA9IHNwLmV4Y2x1ZGVkQ291bnRyaWVzLm1hcCh0PT57cmV0dXJue2xhYmVsOnQubmFtZSwgdmFsdWU6dC5uYW1lLCByZWdpb25zOnQucmVnaW9ucywgdGVycml0b3J5SWQ6dC50ZXJyaXRvcnlJZH19KVxuICAgICAgICAgICAgICAgIGlmIChzcC50ZXJyaXRvcmllcykgc3AudGVycml0b3JpZXMgPSBzcC50ZXJyaXRvcmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZSwgcmVnaW9uczp0LnJlZ2lvbnMsIHRlcnJpdG9yeUlkOnQudGVycml0b3J5SWR9fSlcbiAgICAgICAgICAgICAgICBpZiAoIXNwLnRlcnJpdG9yaWVzKSBzb3J0ID0gZmFsc2VcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcC5pbnN0YWxsbWVudHMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3AuaW5zdGFsbG1lbnRzLmZvckVhY2goaT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLmRhdGUpIGkuZGF0ZSA9IG1vbWVudChpLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpe31cblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzb3J0KSBjb250ZW50LnNhbGVzUGFja2FnZXMuc29ydCh0aGlzLnNvcnRTYWxlc1BhY2thZ2VzKS5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudC5lbmREYXRlKSBjb250ZW50LmVuZERhdGUgPSBtb21lbnQoY29udGVudC5lbmREYXRlKTtcbiAgICAgICAgaWYgKGNvbnRlbnQuc3RhcnREYXRlKSBjb250ZW50LnN0YXJ0RGF0ZSA9IG1vbWVudChjb250ZW50LnN0YXJ0RGF0ZSk7XG4gICAgICAgIGlmIChjb250ZW50LnNpZ25hdHVyZSkgY29udGVudC5zaWduYXR1cmUgPSBob3N0dXJsICsgY29udGVudC5zaWduYXR1cmU7XG5cbiAgICAgICAgY29udGVudC5zdGVwID0gTnVtYmVyKGNvbnRlbnQuc3RlcCk7XG4gICAgICAgIGNvbnRlbnQuY3VzdG9tU2Vhc29ucyA9IGNvbnRlbnQuc2Vhc29ucy5maWx0ZXIocz0+e1xuICAgICAgICAgICAgcmV0dXJuIHMuZXh0ZXJuYWxJZCAmJiBzLmV4dGVybmFsSWQuc3RhcnRzV2l0aChcImNhOlwiKVxuICAgICAgICB9KS5tYXAoKHMsaSk9PntcbiAgICAgICAgICAgIGxldCB5ZWFycztcbiAgICAgICAgICAgIGlmIChzLnllYXIpe1xuICAgICAgICAgICAgICAgIHllYXJzID0gcy55ZWFyLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgICAgICAgICBzLmZyb20gPSB5ZWFycy5sZW5ndGggPT09IDEgPyB5ZWFyc1swXSA6IDIwMDAgKyBOdW1iZXIoeWVhcnNbMF0pO1xuICAgICAgICAgICAgICAgIHMudG8gPSB5ZWFycy5sZW5ndGggPT09IDEgPyBudWxsIDogMjAwMCArIE51bWJlcih5ZWFyc1sxXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb250ZW50LmZpeHR1cmVzQnlTZWFzb24pe1xuICAgICAgICAgICAgICAgIHMuZml4dHVyZXMgPSBjb250ZW50LmZpeHR1cmVzQnlTZWFzb25baV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGNvbnRlbnQuc2Vhc29ucyA9IGNvbnRlbnQuc2Vhc29ucy5tYXAocz0+e1xuICAgICAgICAgICAgaWYgKCBzLmV4dGVybmFsSWQgJiYgcy5leHRlcm5hbElkLnN0YXJ0c1dpdGgoXCJjYTpcIikgKXtcbiAgICAgICAgICAgICAgICBzLmN1c3RvbSA9IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuZXh0cmFEYXRhICYmIGNvbnRlbnQuZXh0cmFEYXRhLnNlYXNvbkR1cmF0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1c3RvbVNlYXNvbkR1ciA9IGNvbnRlbnQuZXh0cmFEYXRhLnNlYXNvbkR1cmF0aW9uc1tzLmV4dGVybmFsSWRdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1c3RvbVNlYXNvbkR1cikge1xuICAgICAgICAgICAgICAgICAgICBzLmN1c3RvbVN0YXJ0RGF0ZSA9IGN1c3RvbVNlYXNvbkR1ci5zdGFydERhdGU7XG4gICAgICAgICAgICAgICAgICAgIHMuY3VzdG9tRW5kRGF0ZSA9IGN1c3RvbVNlYXNvbkR1ci5lbmREYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHM7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHVzZXIgPSBzdG9yZS5nZXRTdGF0ZSgpLnVzZXI7XG5cbiAgICAgICAgaWYgKCFjb250ZW50LnNpZ25hdHVyZU5hbWUpIGNvbnRlbnQuc2lnbmF0dXJlTmFtZSA9IHVzZXIuZmlyc3ROYW1lICsgXCIgXCIgKyB1c2VyLmxhc3ROYW1lO1xuICAgICAgICBpZiAoIWNvbnRlbnQuc2lnbmF0dXJlUG9zaXRpb24pIGNvbnRlbnQuc2lnbmF0dXJlUG9zaXRpb24gPSB1c2VyLnRpdGxlO1xuXG4gICAgICAgIGNvbnRlbnQucGFyc2VkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9LFxuXG4gICAgZmlsdGVyQ29tcGFueUluZm8oZGF0YSl7XG5cbiAgICAgICAgbGV0IGNvbXBhbnkgPSB7fTtcblxuICAgICAgICBjb21wYW55LmxlZ2FsTmFtZSA9IGRhdGEubGVnYWxOYW1lO1xuICAgICAgICBjb21wYW55LnJlZ2lzdHJhdGlvbk51bWJlciA9IGRhdGEucmVnaXN0cmF0aW9uTnVtYmVyO1xuICAgICAgICBjb21wYW55LnZhdCA9IGRhdGEudmF0O1xuICAgICAgICBjb21wYW55LmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICAgIGNvbXBhbnkuYWRkcmVzczIgPSBkYXRhLmFkZHJlc3MyO1xuICAgICAgICBjb21wYW55LmNpdHkgPSBkYXRhLmNpdHk7XG4gICAgICAgIGNvbXBhbnkuemlwID0gZGF0YS56aXA7XG4gICAgICAgIGNvbXBhbnkuY291bnRyeSA9IGRhdGEuY291bnRyeTtcblxuICAgICAgICByZXR1cm4gY29tcGFueTtcbiAgICB9LFxuXG4gICAgc29ydFNhbGVzUGFja2FnZXMgKGEsIGIpe1xuICAgICAgICBsZXQgYyA9IChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGEgPiBiKSA/IDEgOiAoKGIgPiBhKSA/IC0xIDogMClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGMoYS50ZXJyaXRvcmllcy5sZW5ndGgsIGIudGVycml0b3JpZXMubGVuZ3RoKSB8fCBjKGIubmFtZSwgYS5uYW1lKTtcbiAgICB9LFxuXG5cblxuICAgIGlzQVBJQXZhaWxhYmxlKCkge1xuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIHZhcmlvdXMgRmlsZSBBUEkgc3VwcG9ydC5cbiAgICAgICAgaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xuICAgICAgICAgICAgLy8gR3JlYXQgc3VjY2VzcyEgQWxsIHRoZSBGaWxlIEFQSXMgYXJlIHN1cHBvcnRlZC5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc291cmNlOiBGaWxlIEFQSSBhdmFpbGFiaWxpdHkgLSBodHRwOi8vY2FuaXVzZS5jb20vI2ZlYXQ9ZmlsZWFwaVxuICAgICAgICAgICAgLy8gc291cmNlOiA8b3V0cHV0PiBhdmFpbGFiaWxpdHkgLSBodHRwOi8vaHRtbDVkb2N0b3IuY29tL3RoZS1vdXRwdXQtZWxlbWVudC9cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJ1RoZSBIVE1MNSBBUElzIHVzZWQgaW4gdGhpcyBmb3JtIGFyZSBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgZm9sbG93aW5nIGJyb3dzZXJzOjxiciAvPicpO1xuICAgICAgICAgICAgLy8gNi4wIEZpbGUgQVBJICYgMTMuMCA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gR29vZ2xlIENocm9tZTogMTMuMCBvciBsYXRlcjxiciAvPicpO1xuICAgICAgICAgICAgLy8gMy42IEZpbGUgQVBJICYgNi4wIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBNb3ppbGxhIEZpcmVmb3g6IDYuMCBvciBsYXRlcjxiciAvPicpO1xuICAgICAgICAgICAgLy8gMTAuMCBGaWxlIEFQSSAmIDEwLjAgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIEludGVybmV0IEV4cGxvcmVyOiBOb3Qgc3VwcG9ydGVkIChwYXJ0aWFsIHN1cHBvcnQgZXhwZWN0ZWQgaW4gMTAuMCk8YnIgLz4nKTtcbiAgICAgICAgICAgIC8vID8gRmlsZSBBUEkgJiA1LjEgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIFNhZmFyaTogTm90IHN1cHBvcnRlZDxiciAvPicpO1xuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDkuMiA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gT3BlcmE6IE5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYWRkT3JkaW5hbChuKSB7XG4gICAgICAgIHZhciBzdHIgPSBuLnRvU3RyaW5nKCkuc2xpY2UoLTEpLFxuICAgICAgICAgICAgb3JkID0gJyc7XG4gICAgICAgIHN3aXRjaCAoc3RyKSB7XG4gICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAnc3QnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgICAgb3JkID0gJ25kJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICdyZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgY2FzZSAnNic6XG4gICAgICAgICAgICBjYXNlICc3JzpcbiAgICAgICAgICAgIGNhc2UgJzgnOlxuICAgICAgICAgICAgY2FzZSAnOSc6XG4gICAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAndGgnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuICsgb3JkO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gYXJyXG4gICAgICogQHBhcmFtIHByb3BcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldEluZGV4ICh2YWx1ZSwgYXJyLCBwcm9wKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGFycltpXVtwcm9wXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7IC8vdG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSB2YWx1ZSBkb2Vzbid0IGV4aXN0XG4gICAgfSxcblxuICAgIGdldFdlYnNpdGVVUmwoc3RyKSB7XG4gICAgICAgIGlmIChzdHIuaW5jbHVkZXMoJ2h0dHA6Ly8nKSB8fCBzdHIuaW5jbHVkZXMoJ2h0dHBzOi8vJykpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnaHR0cDovLycrc3RyXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNMaXN0aW5nUHVibGlzaGVkKHN0YXR1cykge1xuICAgICAgICByZXR1cm4gKHN0YXR1cyAmJiAoc3RhdHVzLm5hbWUgPT09IFwiQVBQUk9WRURcIiB8fCBzdGF0dXMubmFtZSA9PT0gXCJQRU5ESU5HXCIgfHwgc3RhdHVzLm5hbWUgPT09IFwiRURJVEVEXCIpKTtcbiAgICB9XG5cbn07XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiLCJleHBvcnQgY29uc3QgREFURV9GT1JNQVQgPSAnREQuTU0uWVlZWSc7XG5leHBvcnQgY29uc3QgU0VSVkVSX0RBVEVfVElNRV9GT1JNQVQgPSAnWVlZWS1NTS1ERFRISDptbTpzcyc7XG5leHBvcnQgY29uc3QgVElNRV9GT1JNQVQgPSAnSEg6bW0nO1xuZXhwb3J0IGNvbnN0IFlFQVJfRk9STUFUID0gJ1lZWVknO1xuZXhwb3J0IGNvbnN0IERBVEVfVElNRV9GT1JNQVQgPSBgJHtEQVRFX0ZPUk1BVH0gJHtUSU1FX0ZPUk1BVH1gO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTElTVElOR19WSUVXID0ge1xuICAgIExJU1Q6ICdsaXN0JyxcbiAgICBUQUJMRTogJ3RhYmxlJ1xufTtcblxuZXhwb3J0IGNvbnN0IExJU1RJTkdfU09SVF9PUFRJT05TID0ge1xuICAgIFBVQkxJU0hfREFURTogJ3B1Ymxpc2hpbmcnLFxuICAgIFVQQ09NSU5HX0VWRU5UOiAndXBjb21pbmcnLFxuICAgIC8qRVZFTlRfREFURTogJ2V2ZW50JywqL1xuICAgIEVYUElSWV9EQVRFOiAnZXhwaXJ5J1xufTtcblxuZXhwb3J0IGNvbnN0IExPR0lOX1ZJRVdfVFlQRSA9IHtcbiAgICBMQU5ESU5HOiAnbGFuZGluZycsXG4gICAgTE9HSU46ICdsb2dpbicsXG4gICAgUkVDT1ZFUjogJ3JlY292ZXInLFxuICAgIFJFVklFVzogJ3JldmlldycsXG4gICAgUkVHSVNUUkFUSU9OOiAncmVnaXN0cmF0aW9uJyxcbiAgICBSRUdJU1RFUkVEOiAncmVnaXN0ZXJlZCcsXG4gICAgUkVTRVRfUEFTU1dPUkQ6ICdyZXNldF9wYXNzd29yZCdcbn07XG5cbmV4cG9ydCBjb25zdCBTSUdOX1VQX0ZJRUxEUyA9e1xuICAgIE5BTUU6ICduYW1lJyxcbiAgICBMQVNUX05BTUU6ICdsYXN0TmFtZScsXG4gICAgRU1BSUw6ICdlbWFpbCcsXG4gICAgQ09NUEFOWTogJ2NvbXBhbnknXG59O1xuXG5leHBvcnQgY29uc3QgTEFORElOR19MSU5LUyA9IHtcbiAgICBQUklWQUNZOiBcImh0dHBzOi8vY29udGVudGFyZW5hLmNvbS93ZWIvcHJpdmFjeS1wb2xpY3kvXCIsXG4gICAgVEVSTVM6IFwiaHR0cHM6Ly9jb250ZW50YXJlbmEuY29tL3dlYi90ZXJtcy1vZi11c2UvXCIsXG4gICAgRkFROiBcImh0dHBzOi8vY29udGVudGFyZW5hLmNvbS93ZWIvZmFxL1wiLFxuICAgIENPT0tJRTogXCJodHRwczovL2NvbnRlbnRhcmVuYS5jb20vd2ViL2Nvb2tpZS1wb2xpY3kvXCIsXG4gICAgSE9NRTogXCJodHRwczovL2NvbnRlbnRhcmVuYS5jb20vXCJcbn07XG5cbmV4cG9ydCBjb25zdCBBUElfVVJMUyA9IHtcbiAgICBJTlZJVEVfVVNFUlMgOiBcImFwaS9jb21wYW55L2ludml0ZVwiXG59O1xuXG5leHBvcnQgY29uc3QgU0lURV9VUkxTID0ge1xuICAgIEhPTUVfVVJMIDogXCJodHRwczovL3d3dy5jb250ZW50YXJlbmEuY29tXCJcbn07XG5cbmV4cG9ydCBjb25zdCBSRUdJT05TX0VOVU1TID0ge1xuICAgIFwiQWxnZXJpYVwiOlwiRFpBXCIsXG4gICAgXCJBbmdvbGFcIjpcIkFHT1wiLFxuICAgIFwiQmVuaW5cIjpcIkJFTlwiLFxuICAgIFwiQm90c3dhbmFcIjogXCJCV0FcIixcbiAgICBcIkJ1cmtpbmEgRmFzb1wiOiBcIkJGQVwiLFxuICAgIFwiQnVydW5kaVwiOiBcIkJESVwiLFxuICAgIFwiQ2FtZXJvb25cIjogXCJDTVJcIixcbiAgICBcIkNhYm8gVmVyZGVcIjogXCJDUFZcIixcbiAgICBcIkNlbnRyYWwgQWZyaWNhbiBSZXB1YmxpY1wiOiBcIkNBRlwiLFxuICAgIFwiQ2hhZFwiOlwiVENEXCIsXG4gICAgXCJDb21vcm9zXCI6XCJDT01cIixcbiAgICBcIkNvbmdvXCI6IFwiQ09HXCIsXG4gICAgXCJDb25nbyAoRGVtb2NyYXRpYyBSZXB1YmxpYyBvZiB0aGUpXCI6XCJDT0RcIixcbiAgICBcIkPDtHRlIGQnSXZvaXJlXCI6IFwiQ0lWXCIsXG4gICAgXCJEamlib3V0aVwiOiBcIkRKSVwiLFxuICAgIFwiRWd5cHRcIjogXCJFR1lcIixcbiAgICBcIkVxdWF0b3JpYWwgR3VpbmVhXCI6XCJHTlFcIixcbiAgICAgXCJFcml0cmVhXCI6XCJFUklcIixcbiAgICAgXCJFdGhpb3BpYVwiOlwiRVRIXCIsXG4gICAgIFwiR2Fib25cIjpcIkdBQlwiLFxuICAgICBcIkdhbWJpYVwiOlwiR01CXCIsXG4gICAgIFwiR2hhbmFcIjpcIkdIQVwiLFxuICAgICBcIkd1aW5lYVwiOlwiR0lOXCIsXG4gICAgIFwiR3VpbmVhLUJpc3NhdVwiOlwiR05CXCIsXG4gICAgIFwiS2VueWFcIjpcIktFTlwiLFxuICAgICBcIkxlc290aG9cIjpcIkxTT1wiLFxuICAgICBcIkxpYmVyaWFcIjpcIkxCUlwiLFxuICAgICBcIkxpYnlhXCI6XCJMQllcIixcbiAgICAgXCJNYWRhZ2FzY2FyXCI6XCJNREdcIixcbiAgICAgXCJNYWxhd2lcIjpcIk1XSVwiLFxuICAgICBcIk1hbGlcIjpcIk1MSVwiLFxuICAgICBcIk1hdXJpdGFuaWFcIjpcIk1SVFwiLFxuICAgICBcIk1hdXJpdGl1c1wiOlwiTVVTXCIsXG4gICAgIFwiTWF5b3R0ZVwiOlwiTVlUXCIsXG4gICAgIFwiTW9yb2Njb1wiOlwiTUFSXCIsXG4gICAgIFwiTW96YW1iaXF1ZVwiOlwiTU9aXCIsXG4gICAgIFwiTmFtaWJpYVwiOlwiTkFNXCIsXG4gICAgIFwiTmlnZXJcIjpcIk5FUlwiLFxuICAgICBcIk5pZ2VyaWFcIjpcIk5HQVwiLFxuICAgICBcIlLDqXVuaW9uXCI6XCJSRVVcIixcbiAgICAgXCJSd2FuZGFcIjpcIlJXQVwiLFxuICAgICBcIlNhaW50IEhlbGVuYSwgQXNjZW5zaW9uIGFuZCBUcmlzdGFuIGRhIEN1bmhhXCI6XCJTSE5cIixcbiAgICBcIlNhbyBUb21lIGFuZCBQcmluY2lwZVwiOlwiU1RQXCIsXG4gICAgIFwiU2VuZWdhbFwiOlwiU0VOXCIsXG4gICAgIFwiU2V5Y2hlbGxlc1wiOlwiU1lDXCIsXG4gICAgIFwiU2llcnJhIExlb25lXCI6XCJTTEVcIixcbiAgICAgXCJTb21hbGlhXCI6XCJTT01cIixcbiAgICAgXCJTb3V0aCBBZnJpY2FcIjpcIlpBRlwiLFxuICAgICBcIlNvdXRoIFN1ZGFuXCI6XCJTU0RcIixcbiAgICAgXCJTdWRhblwiOlwiU0ROXCIsXG4gICAgIFwiU3dhemlsYW5kXCI6XCJTV1pcIixcbiAgICAgXCJUYW56YW5pYSwgVW5pdGVkIFJlcHVibGljIG9mXCI6XCJUWkFcIixcbiAgICAgXCJUb2dvXCI6XCJUR09cIixcbiAgICAgXCJUdW5pc2lhXCI6XCJUVU5cIixcbiAgICAgXCJVZ2FuZGFcIjpcIlVHQVwiLFxuICAgICBcIldlc3Rlcm4gU2FoYXJhXCI6XCJFU0hcIixcbiAgICAgXCJaYW1iaWFcIjpcIlpNQlwiLFxuICAgICBcIlppbWJhYndlXCI6XCJaV0VcIixcbiAgICAgXCJBbWVyaWNhbiBTYW1vYVwiOlwiQVNNXCIsXG4gICAgIFwiQXVzdHJhbGlhXCI6XCJBVVNcIixcbiAgICAgXCJDb29rIElzbGFuZHNcIjpcIkNPS1wiLFxuICAgICBcIkZpamlcIjpcIkZKSVwiLFxuICAgICBcIkZyZW5jaCBQb2x5bmVzaWFcIjpcIlBZRlwiLFxuICAgICBcIkd1YW1cIjpcIkdVTVwiLFxuICAgICBcIktpcmliYXRpXCI6XCJLSVJcIixcbiAgICAgXCJNYXJzaGFsbCBJc2xhbmRzXCI6XCJNSExcIixcbiAgICAgXCJNaWNyb25lc2lhIChGZWRlcmF0ZWQgU3RhdGVzIG9mKVwiOlwiRlNNXCIsXG4gICAgIFwiTmF1cnVcIjpcIk5SVVwiLFxuICAgICBcIk5ldyBDYWxlZG9uaWFcIjpcIk5DTFwiLFxuICAgICBcIk5ldyBaZWFsYW5kXCI6XCJOWkxcIixcbiAgICAgXCJOaXVlXCI6XCJOSVVcIixcbiAgICAgXCJOb3Jmb2xrIElzbGFuZFwiOlwiTkZLXCIsXG4gICAgIFwiTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzXCI6XCJNTlBcIixcbiAgICAgXCJQYWxhdVwiOlwiUExXXCIsXG4gICAgIFwiUGFwdWEgTmV3IEd1aW5lYVwiOlwiUE5HXCIsXG4gICAgIFwiUGl0Y2Fpcm5cIjpcIlBDTlwiLFxuICAgICBcIlNhbW9hXCI6XCJXU01cIixcbiAgICAgXCJTb2xvbW9uIElzbGFuZHNcIjpcIlNMQlwiLFxuICAgICBcIlRva2VsYXVcIjpcIlRLTFwiLFxuICAgICBcIlRvbmdhXCI6XCJUT05cIixcbiAgICAgXCJUdXZhbHVcIjpcIlRVVlwiLFxuICAgICBcIlZhbnVhdHVcIjpcIlZVVFwiLFxuICAgICBcIldhbGxpcyBhbmQgRnV0dW5hXCI6XCJXTEZcIixcbiAgICAgXCJBbmd1aWxsYVwiOlwiQUlBXCIsXG4gICAgIFwiQW50aWd1YSBhbmQgQmFyYnVkYVwiOlwiQVRHXCIsXG4gICAgIFwiQXJnZW50aW5hXCI6XCJBUkdcIixcbiAgICAgXCJBcnViYVwiOlwiQUJXXCIsXG4gICAgIFwiQmFoYW1hc1wiOlwiQkhTXCIsXG4gICAgIFwiQmFyYmFkb3NcIjpcIkJSQlwiLFxuICAgICBcIkJlbGl6ZVwiOlwiQkxaXCIsXG4gICAgIFwiQmVybXVkYVwiOlwiQk1VXCIsXG4gICAgIFwiQm9saXZpYSAoUGx1cmluYXRpb25hbCBTdGF0ZSBvZilcIjpcIkJPTFwiLFxuICAgICBcIkJvbmFpcmUsIFNpbnQgRXVzdGF0aXVzIGFuZCBTYWJhXCI6XCJCRVNcIixcbiAgICAgXCJCcmF6aWxcIjpcIkJSQVwiLFxuICAgICBcIkNhbmFkYVwiOlwiQ0FOXCIsXG4gICAgIFwiQ2F5bWFuIElzbGFuZHNcIjpcIkNZTVwiLFxuICAgICBcIkNoaWxlXCI6XCJDSExcIixcbiAgICAgXCJDb2xvbWJpYVwiOlwiQ09MXCIsXG4gICAgIFwiQ29zdGEgUmljYVwiOlwiQ1JJXCIsXG4gICAgIFwiQ3ViYVwiOlwiQ1VCXCIsXG4gICAgIFwiQ3VyYcOnYW9cIjpcIkNVV1wiLFxuICAgICBcIkRvbWluaWNhXCI6XCJETUFcIixcbiAgICAgXCJEb21pbmljYW4gUmVwdWJsaWNcIjpcIkRPTVwiLFxuICAgICBcIkVjdWFkb3JcIjpcIkVDVVwiLFxuICAgICBcIkVsIFNhbHZhZG9yXCI6XCJTTFZcIixcbiAgICAgXCJGYWxrbGFuZCBJc2xhbmRzIChNYWx2aW5hcylcIjpcIkZMS1wiLFxuICAgICBcIkZyZW5jaCBHdWlhbmFcIjpcIkdVRlwiLFxuICAgICBcIkdyZWVubGFuZFwiOlwiR1JMXCIsXG4gICAgIFwiR3JlbmFkYVwiOlwiR1JEXCIsXG4gICAgIFwiR3VhZGVsb3VwZVwiOlwiR0xQXCIsXG4gICAgIFwiR3VhdGVtYWxhXCI6XCJHVE1cIixcbiAgICAgXCJHdXlhbmFcIjpcIkdVWVwiLFxuICAgICBcIkhhaXRpXCI6XCJIVElcIixcbiAgICAgXCJIb25kdXJhc1wiOlwiSE5EXCIsXG4gICAgIFwiSmFtYWljYVwiOlwiSkFNXCIsXG4gICAgIFwiTWFydGluaXF1ZVwiOlwiTVRRXCIsXG4gICAgIFwiTWV4aWNvXCI6XCJNRVhcIixcbiAgICAgXCJNb250c2VycmF0XCI6XCJNU1JcIixcbiAgICAgXCJOaWNhcmFndWFcIjpcIk5JQ1wiLFxuICAgICBcIlBhbmFtYVwiOlwiUEFOXCIsXG4gICAgIFwiUGFyYWd1YXlcIjpcIlBSWVwiLFxuICAgICBcIlBlcnVcIjpcIlBFUlwiLFxuICAgICBcIlB1ZXJ0byBSaWNvXCI6XCJQUklcIixcbiAgICAgXCJTYWludCBCYXJ0aMOpbGVteVwiOlwiQkxNXCIsXG4gICAgIFwiU2FpbnQgS2l0dHMgYW5kIE5ldmlzXCI6XCJLTkFcIixcbiAgICAgXCJTYWludCBMdWNpYVwiOlwiTENBXCIsXG4gICAgIFwiU2FpbnQgTWFydGluIChGcmVuY2ggcGFydClcIjpcIk1BRlwiLFxuICAgICBcIlNhaW50IFBpZXJyZSBhbmQgTWlxdWVsb25cIjpcIlNQTVwiLFxuICAgICBcIlNhaW50IFZpbmNlbnQgYW5kIHRoZSBHcmVuYWRpbmVzXCI6XCJWQ1RcIixcbiAgICAgXCJTaW50IE1hYXJ0ZW4gKER1dGNoIHBhcnQpXCI6XCJTWE1cIixcbiAgICAgXCJTdXJpbmFtZVwiOlwiU1VSXCIsXG4gICAgIFwiVHJpbmlkYWQgYW5kIFRvYmFnb1wiOlwiVFRPXCIsXG4gICAgIFwiVHVya3MgYW5kIENhaWNvcyBJc2xhbmRzXCI6XCJUQ0FcIixcbiAgICAgXCJVU0FcIjpcIlVTQVwiLFxuICAgICBcIlVydWd1YXlcIjpcIlVSWVwiLFxuICAgICBcIlZlbmV6dWVsYSAoQm9saXZhcmlhbiBSZXB1YmxpYyBvZilcIjpcIlZFTlwiLFxuICAgICBcIlZpcmdpbiBJc2xhbmRzIChCcml0aXNoKVwiOlwiVkdCXCIsXG4gICAgIFwiVmlyZ2luIElzbGFuZHMgKFUuUy4pXCI6XCJWSVJcIixcbiAgICAgXCJBZmdoYW5pc3RhblwiOlwiQUZHXCIsXG4gICAgIFwiQXJtZW5pYVwiOlwiQVJNXCIsXG4gICAgIFwiQXplcmJhaWphblwiOlwiQVpFXCIsXG4gICAgIFwiQmFocmFpblwiOlwiQkhSXCIsXG4gICAgIFwiQmFuZ2xhZGVzaFwiOlwiQkdEXCIsXG4gICAgIFwiQmh1dGFuXCI6XCJCVE5cIixcbiAgICAgXCJCcnVuZWkgRGFydXNzYWxhbVwiOlwiQlJOXCIsXG4gICAgIFwiQ2FtYm9kaWFcIjpcIktITVwiLFxuICAgICBcIkNoaW5hXCI6XCJDSE5cIixcbiAgICAgXCJDeXBydXNcIjpcIkNZUFwiLFxuICAgICBcIkdlb3JnaWFcIjpcIkdFT1wiLFxuICAgICBcIkhvbmcgS29uZ1wiOlwiSEtHXCIsXG4gICAgIFwiSW5kaWFcIjpcIklORFwiLFxuICAgICBcIkluZG9uZXNpYVwiOlwiSUROXCIsXG4gICAgIFwiSXJhbiAoSXNsYW1pYyBSZXB1YmxpYyBvZilcIjpcIklSTlwiLFxuICAgICBcIklyYXFcIjpcIklSUVwiLFxuICAgICBcIklzcmFlbFwiOlwiSVNSXCIsXG4gICAgIFwiSmFwYW5cIjpcIkpQTlwiLFxuICAgICBcIkpvcmRhblwiOlwiSk9SXCIsXG4gICAgIFwiS2F6YWtoc3RhblwiOlwiS0FaXCIsXG4gICAgIFwiS29yZWEgKERlbW9jcmF0aWMgUGVvcGxlJ3MgUmVwdWJsaWMgb2YpXCI6XCJQUktcIixcbiAgICAgXCJLb3JlYSAoUmVwdWJsaWMgb2YpXCI6XCJLT1JcIixcbiAgICAgXCJLdXdhaXRcIjpcIktXVFwiLFxuICAgICBcIkt5cmd5enN0YW5cIjpcIktHWlwiLFxuICAgICBcIkxhbyBQZW9wbGUncyBEZW1vY3JhdGljIFJlcHVibGljXCI6XCJMQU9cIixcbiAgICAgXCJMZWJhbm9uXCI6XCJMQk5cIixcbiAgICAgXCJNYWNhb1wiOlwiTUFDXCIsXG4gICAgIFwiTWFsYXlzaWFcIjpcIk1ZU1wiLFxuICAgICBcIk1hbGRpdmVzXCI6XCJNRFZcIixcbiAgICAgXCJNb25nb2xpYVwiOlwiTU5HXCIsXG4gICAgIFwiTXlhbm1hclwiOlwiTU1SXCIsXG4gICAgIFwiTmVwYWxcIjpcIk5QTFwiLFxuICAgICBcIk9tYW5cIjpcIk9NTlwiLFxuICAgICBcIlBha2lzdGFuXCI6XCJQQUtcIixcbiAgICAgXCJQYWxlc3RpbmUsIFN0YXRlIG9mXCI6XCJQU0VcIixcbiAgICAgXCJQaGlsaXBwaW5lc1wiOlwiUEhMXCIsXG4gICAgIFwiUWF0YXJcIjpcIlFBVFwiLFxuICAgICBcIlNhdWRpIEFyYWJpYVwiOlwiU0FVXCIsXG4gICAgIFwiU2luZ2Fwb3JlXCI6XCJTR1BcIixcbiAgICAgXCJTcmkgTGFua2FcIjpcIkxLQVwiLFxuICAgICBcIlN5cmlhbiBBcmFiIFJlcHVibGljXCI6XCJTWVJcIixcbiAgICAgXCJUYWl3YW4sIFByb3ZpbmNlIG9mIENoaW5hXCI6XCJUV05cIixcbiAgICAgXCJUYWppa2lzdGFuXCI6XCJUSktcIixcbiAgICAgXCJUaGFpbGFuZFwiOlwiVEhBXCIsXG4gICAgIFwiVGltb3ItTGVzdGVcIjpcIlRMU1wiLFxuICAgICBcIlR1cmtleVwiOlwiVFVSXCIsXG4gICAgIFwiVHVya21lbmlzdGFuXCI6XCJUS01cIixcbiAgICAgXCJVbml0ZWQgQXJhYiBFbWlyYXRlc1wiOlwiQVJFXCIsXG4gICAgIFwiVXpiZWtpc3RhblwiOlwiVVpCXCIsXG4gICAgIFwiVmlldCBOYW1cIjpcIlZOTVwiLFxuICAgICBcIlllbWVuXCI6XCJZRU1cIixcbiAgICAgXCLDhWxhbmQgSXNsYW5kc1wiOlwiQUxBXCIsXG4gICAgIFwiQWxiYW5pYVwiOlwiQUxCXCIsXG4gICAgIFwiQW5kb3JyYVwiOlwiQU5EXCIsXG4gICAgIFwiQXVzdHJpYVwiOlwiQVVUXCIsXG4gICAgIFwiQmVsYXJ1c1wiOlwiQkxSXCIsXG4gICAgIFwiQmVsZ2l1bVwiOlwiQkVMXCIsXG4gICAgIFwiQm9zbmlhIGFuZCBIZXJ6ZWdvdmluYVwiOlwiQklIXCIsXG4gICAgIFwiQnVsZ2FyaWFcIjpcIkJHUlwiLFxuICAgICBcIkNyb2F0aWFcIjpcIkhSVlwiLFxuICAgICBcIkN6ZWNoIFJlcHVibGljXCI6XCJDWkVcIixcbiAgICAgXCJEZW5tYXJrXCI6XCJETktcIixcbiAgICAgXCJFc3RvbmlhXCI6XCJFU1RcIixcbiAgICAgXCJGYXJvZSBJc2xhbmRzXCI6XCJGUk9cIixcbiAgICAgXCJGaW5sYW5kXCI6XCJGSU5cIixcbiAgICAgXCJGcmFuY2VcIjpcIkZSQVwiLFxuICAgICBcIkdlcm1hbnlcIjpcIkRFVVwiLFxuICAgICBcIkdpYnJhbHRhclwiOlwiR0lCXCIsXG4gICAgIFwiR3JlZWNlXCI6XCJHUkNcIixcbiAgICAgXCJHdWVybnNleVwiOlwiR0dZXCIsXG4gICAgIFwiSG9seSBTZWVcIjpcIlZBVFwiLFxuICAgICBcIkh1bmdhcnlcIjpcIkhVTlwiLFxuICAgICBcIkljZWxhbmRcIjpcIklTTFwiLFxuICAgICBcIklyZWxhbmRcIjpcIklSTFwiLFxuICAgICBcIklzbGUgb2YgTWFuXCI6XCJJTU5cIixcbiAgICAgXCJJdGFseVwiOlwiSVRBXCIsXG4gICAgIFwiSmVyc2V5XCI6XCJKRVlcIixcbiAgICAgXCJMYXR2aWFcIjpcIkxWQVwiLFxuICAgICBcIkxpZWNodGVuc3RlaW5cIjpcIkxJRVwiLFxuICAgICBcIkxpdGh1YW5pYVwiOlwiTFRVXCIsXG4gICAgIFwiTHV4ZW1ib3VyZ1wiOlwiTFVYXCIsXG4gICAgIFwiTWFjZWRvbmlhICh0aGUgZm9ybWVyIFl1Z29zbGF2IFJlcHVibGljIG9mKVwiOlwiTUtEXCIsXG4gICAgIFwiTWFsdGFcIjpcIk1MVFwiLFxuICAgICBcIk1vbGRvdmEgKFJlcHVibGljIG9mKVwiOlwiTURBXCIsXG4gICAgIFwiTW9uYWNvXCI6XCJNQ09cIixcbiAgICAgXCJNb250ZW5lZ3JvXCI6XCJNTkVcIixcbiAgICAgXCJOZXRoZXJsYW5kc1wiOlwiTkxEXCIsXG4gICAgIFwiTm9yd2F5XCI6XCJOT1JcIixcbiAgICAgXCJQb2xhbmRcIjpcIlBPTFwiLFxuICAgICBcIlBvcnR1Z2FsXCI6XCJQUlRcIixcbiAgICAgXCJSb21hbmlhXCI6XCJST1VcIixcbiAgICAgXCJSdXNzaWFuIEZlZGVyYXRpb25cIjpcIlJVU1wiLFxuICAgICBcIlNhbiBNYXJpbm9cIjpcIlNNUlwiLFxuICAgICBcIlNlcmJpYVwiOlwiU1JCXCIsXG4gICAgIFwiU2xvdmFraWFcIjpcIlNWS1wiLFxuICAgICBcIlNsb3ZlbmlhXCI6XCJTVk5cIixcbiAgICAgXCJTcGFpblwiOlwiRVNQXCIsXG4gICAgIFwiU3ZhbGJhcmQgYW5kIEphbiBNYXllblwiOlwiU0pNXCIsXG4gICAgIFwiU3dlZGVuXCI6XCJTV0VcIixcbiAgICAgXCJTd2l0emVybGFuZFwiOlwiQ0hFXCIsXG4gICAgIFwiVWtyYWluZVwiOlwiVUtSXCIsXG4gICAgIFwiVW5pdGVkIEtpbmdkb20gb2YgR3JlYXQgQnJpdGFpbiBhbmQgTm9ydGhlcm4gSXJlbGFuZFwiOlwiR0JSXCIsXG4gICAgIFwiRW5nbGFuZFwiOlwiRU5HXCIsXG4gICAgIFwiQW50YXJjdGljYVwiOlwiQVRBXCIsXG4gICAgIFwiQm91dmV0IElzbGFuZFwiOlwiQlZUXCIsXG4gICAgIFwiQnJpdGlzaCBJbmRpYW4gT2NlYW4gVGVycml0b3J5XCI6XCJJT1RcIixcbiAgICAgXCJDaHJpc3RtYXMgSXNsYW5kXCI6XCJDWFJcIixcbiAgICAgXCJDb2NvcyAoS2VlbGluZykgSXNsYW5kc1wiOlwiQ0NLXCIsXG4gICAgIFwiRnJlbmNoIFNvdXRoZXJuIFRlcnJpdG9yaWVzXCI6XCJBVEZcIixcbiAgICAgXCJIZWFyZCBJc2xhbmQgYW5kIE1jRG9uYWxkIElzbGFuZHNcIjpcIkhNRFwiLFxuICAgICBcIlNvdXRoIEdlb3JnaWEgYW5kIHRoZSBTb3V0aCBTYW5kd2ljaCBJc2xhbmRzXCI6XCJTR1NcIixcbiAgICAgXCJVbml0ZWQgU3RhdGVzIE1pbm9yIE91dGx5aW5nIElzbGFuZHNcIjpcIlVNSVwiXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NvbW1vbi9jb25zdGFudHMuanMiLCJleHBvcnQgY29uc3QgbGFuZGluZ1R5cGVzID0ge1xuICAgIFJFU0VUX1BBU1NXT1JEX1NVQ0NFU1M6ICdSRVNFVF9QQVNTV09SRF9TVUNDRVNTJyxcbiAgICBDTEVBUl9SRVNFVF9QQVNTV09SRDogJ0NMRUFSX1JFU0VUX1BBU1NXT1JEJyxcbiAgICBTRVRfUkVGRVJFUl9EQVRBIDogJ1NFVF9SRUZFUkVSX0RBVEEnLFxufTtcblxuY29uc3QgREVGQVVMVF9TVEFURSA9IHtcbiAgICByZXNldFBhc3N3b3JkU3VjY2VzczogZmFsc2Vcbn07XG5cbmV4cG9ydCBjb25zdCBsYW5kaW5nID0gKHN0YXRlID0gREVGQVVMVF9TVEFURSwgYWN0aW9uKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGxhbmRpbmdUeXBlcy5SRVNFVF9QQVNTV09SRF9TVUNDRVNTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7cmVzZXRQYXNzd29yZFN1Y2Nlc3M6IHRydWV9KTtcblxuICAgICAgICBjYXNlIGxhbmRpbmdUeXBlcy5DTEVBUl9SRVNFVF9QQVNTV09SRDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge3Jlc2V0UGFzc3dvcmRTdWNjZXNzOiBmYWxzZX0pO1xuXG4gICAgICAgIGNhc2UgbGFuZGluZ1R5cGVzLlNFVF9SRUZFUkVSX0RBVEE6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtyZWZlcmVyRW1haWw6IGFjdGlvbi5yZWZlcmVyRW1haWwsIHJlZmVyZXJMaXN0aW5nSWQgOiBhY3Rpb24ucmVmZXJlckxpc3RpbmdJZH0pO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gREVGQVVMVF9TVEFURTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2xhbmRpbmcvcmVkdWNlcnMvbGFuZGluZy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQge2xhbmd1YWdlc30gZnJvbSBcIi4uLy4uLy4uL2RhdGEvbGFuZ3VhZ2VzXCI7XG5cbmV4cG9ydCBjb25zdCBhbGxWYWx1ZSA9IHtcbiAgICB2YWx1ZTogJ2FsbCcsXG4gICAgbGFiZWw6ICdBbGwgbG9jYWwgbGFuZ3VhZ2VzJ1xufTtcblxuY2xhc3MgTGFuZ3VhZ2VTZWxlY3RvciBleHRlbmRzICBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcblxuICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb24gPSBwcm9wcy52YWx1ZSA/IFsuLi5wcm9wcy52YWx1ZV0gOiBbXTtcbiAgICB9XG5cbiAgICBoYW5kbGVPbkNoYW5nZSA9IChzZWxlY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgaGFzQWxsID0gISFzZWxlY3Rpb24uZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gJ2FsbCcpO1xuICAgICAgICBjb25zdCBoYXNBbGxQcmV2ID0gISF0aGlzLnByZXZTZWxlY3Rpb24uZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gJ2FsbCcpO1xuICAgICAgICAvL2NvbnN0IGl0ZW1zQ2hhbmdlZCA9IHNlbGVjdGlvbi5sZW5ndGggIT09IHRoaXMucHJldlNlbGVjdGlvbi5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGhhc0FsbCkge1xuICAgICAgICAgICAgaWYgKGhhc0FsbFByZXYpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgQWxsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gc2VsZWN0aW9uLmZpbHRlcihpdGVtID0+IGl0ZW0udmFsdWUgIT09ICdhbGwnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIEFsbCBhbmQgcmVtb3ZlIG90aGVyc1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IFthbGxWYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb24gPSBzZWxlY3Rpb247XG5cbiAgICAgICAgb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHsgdmFsdWUsIG11bHRpID0gdHJ1ZSwgcGxhY2Vob2xkZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHJlYWxMYW5ndWFnZXMgPSBPYmplY3QudmFsdWVzKGxhbmd1YWdlcykubWFwKChpLCBrKT0+KHt2YWx1ZSA6IGkubmFtZSAsIGxhYmVsIDogaS5uYW1lIH0pKTtcbiAgICAgICAgY29uc3QgYWxsTGFuZ3VhZ2VzID0gWyBhbGxWYWx1ZSwgLi4ucmVhbExhbmd1YWdlcyBdO1xuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICBuYW1lPVwiZm9ybS1maWVsZC1uYW1lXCJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgbXVsdGk9e211bHRpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXthbGxMYW5ndWFnZXN9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgeyBMYW5ndWFnZVNlbGVjdG9yIH07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9MYW5ndWFnZVNlbGVjdG9yLmpzIiwiZXhwb3J0IGNvbnN0IGNvbW1vblR5cGVzPSB7XG4gICAgR0VUX0RFRkFVTFRfUklHSFRTX1BBQ0tBR0U6J0dFVF9ERUZBVUxUX1JJR0hUU19QQUNLQUdFJyxcbiAgICBTRVRfVE9UQUxfQ09VTlRSSUVTOiAnU0VUX1RPVEFMX0NPVU5UUklFUycsXG4gICAgU0VUX1RFU1RfU1RBR0VfTU9ERTogJ1NFVF9URVNUX1NUQUdFX01PREUnLFxuICAgIFNFVF9FTlZfSE9TVF9VUkw6ICdTRVRfRU5WX0hPU1RfVVJMJ1xufTtcblxuY29uc3QgY29tbW9uRGVmYXVsdCA9IHtcbiAgICB0b3RhbENvdW50cmllcyA6IDI0MCxcbiAgICB0ZXN0U3RhZ2VNb2RlOiBmYWxzZVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbW1vbiA9IChzdGF0ZSA9IGNvbW1vbkRlZmF1bHQsIGFjdGlvbikgPT4ge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGNvbW1vblR5cGVzLkdFVF9ERUZBVUxUX1JJR0hUU19QQUNLQUdFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7ZGVmYXVsdFJpZ2h0c1BhY2thZ2U6IGFjdGlvbi5kZWZhdWx0UmlnaHRzUGFja2FnZX0pO1xuICAgICAgICBjYXNlIGNvbW1vblR5cGVzLlNFVF9UT1RBTF9DT1VOVFJJRVM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHt0b3RhbENvdW50cmllczogYWN0aW9uLnRvdGFsQ291bnRyaWVzfSk7XG4gICAgICAgIGNhc2UgY29tbW9uVHlwZXMuU0VUX1RFU1RfU1RBR0VfTU9ERTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge3Rlc3RTdGFnZU1vZGU6IGFjdGlvbi50ZXN0U3RhZ2VNb2RlfSk7XG4gICAgICAgIGNhc2UgY29tbW9uVHlwZXMuU0VUX0VOVl9IT1NUX1VSTDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2Vudkhvc3RVcmw6IGFjdGlvbi5lbnZIb3N0VXJsfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3JlZHVjZXJzL2NvbW1vbi5qcyIsImV4cG9ydCBjb25zdCB1c2VyVHlwZXM9IHtcbiAgICBMT0dPVVQ6J0xPR09VVCcsXG4gICAgTE9HSU46J0xPR0lOJyxcbiAgICBQUk9GSUxFOidQUk9GSUxFJyxcbiAgICBMT0FEX1VTRVJfREFUQTonTE9BRF9VU0VSX0RBVEEnLFxufTtcblxuY29uc3QgZGVmYXVsdFVzZXIgPSB7XG4gICAgcHJvZmlsZSA6IFwiU0VMTEVSXCJcblxufTtcblxuZXhwb3J0IGNvbnN0IHVzZXIgPSAoc3RhdGUgPSBkZWZhdWx0VXNlciwgYWN0aW9uKSA9PiB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgdXNlclR5cGVzLkxPR09VVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGVmYXVsdFVzZXIpO1xuICAgICAgICBjYXNlIHVzZXJUeXBlcy5MT0dJTjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGVtYWlsOiBhY3Rpb24uZW1haWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHVzZXJUeXBlcy5QUk9GSUxFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgcHJvZmlsZTogYWN0aW9uLnByb2ZpbGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHVzZXJUeXBlcy5MT0FEX1VTRVJfREFUQTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgey4uLmFjdGlvbi51c2VyfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3JlZHVjZXJzL3VzZXIuanMiLCJleHBvcnQgY29uc3QgdmFsaWRhdGlvblR5cGVzID0ge1xuICAgIEVOQUJMRV9WQUxJREFUSU9OOiAnRU5BQkxFX1ZBTElEQVRJT04nLFxuICAgIERJU0FCTEVfVkFMSURBVElPTjogJ0RJU0FCTEVfVkFMSURBVElPTidcbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0aW9uID0gKHN0YXRlID0gZmFsc2UsIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgICAgICBjYXNlIHZhbGlkYXRpb25UeXBlcy5FTkFCTEVfVkFMSURBVElPTjpcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG5cbiAgICAgICAgY2FzZSB2YWxpZGF0aW9uVHlwZXMuRElTQUJMRV9WQUxJREFUSU9OOlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy92YWxpZGF0aW9uLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnXG5pbXBvcnQge2kxOG5TdGF0ZX0gZnJvbSBcInJlZHV4LWkxOG5cIjtcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQge2NvbnRlbnR9IGZyb20gXCIuLi9zZWxsL3JlZHVjZXJzL2NvbnRlbnRcIjtcbmltcG9ydCB7c2VsZWN0b3J9IGZyb20gXCIuLi9zZWxsL3JlZHVjZXJzL3NlbGVjdG9yXCI7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSBcIi4uL2J1eS9yZWR1Y2Vycy9maWx0ZXJcIjtcbmltcG9ydCB7bWFya2V0cGxhY2V9IGZyb20gXCIuLi9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2VcIjtcbmltcG9ydCB7bWFuYWdlfSBmcm9tIFwiLi4vbWFuYWdlL3JlZHVjZXJzL21hbmFnZVwiO1xuaW1wb3J0IHt1c2VyfSBmcm9tIFwiLi9yZWR1Y2Vycy91c2VyXCI7XG5pbXBvcnQge2NvbW1vbn0gZnJvbSBcIi4vcmVkdWNlcnMvY29tbW9uXCI7XG5pbXBvcnQge3ZhbGlkYXRpb259IGZyb20gXCIuL3JlZHVjZXJzL3ZhbGlkYXRpb25cIjtcbmltcG9ydCB7bGFuZGluZ30gZnJvbSBcIi4vLi4vbGFuZGluZy9yZWR1Y2Vycy9sYW5kaW5nXCI7XG5cbmNvbnN0IHJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBjb250ZW50LFxuICAgIHNlbGVjdG9yLFxuICAgIG1hcmtldHBsYWNlLFxuICAgIGZpbHRlcixcbiAgICBtYW5hZ2UsXG4gICAgdXNlcixcbiAgICBjb21tb24sXG4gICAgdmFsaWRhdGlvbixcbiAgICBsYW5kaW5nLFxuICAgIGkxOG5TdGF0ZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN0b3JlKHJlZHVjZXJzLCBhcHBseU1pZGRsZXdhcmUodGh1bmspKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3N0b3JlLmpzIiwiXG5leHBvcnQgY29uc3QgbWFuYWdlVHlwZXM9IHtcbiAgICBURVNUOidURVNUJyxcbn07XG5cbmV4cG9ydCBjb25zdCBtYW5hZ2UgPSAoc3RhdGUgPSB7XG4gICAgdGVzdEl0ZW06IFwibWFuYWdlUmVkdWNlclwiXG5cbn0sIGFjdGlvbikgPT4ge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIG1hbmFnZVR5cGVzLlRFU1Q6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICB0ZXN0OiBhY3Rpb24udGV4dCxcbiAgICAgICAgICAgICAgICBpZCA6IGFjdGlvbi5pZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvcmVkdWNlcnMvbWFuYWdlLmpzIiwiaW1wb3J0IG1heCBmcm9tICdsb2Rhc2gvbWF4JztcbmltcG9ydCB7IGFsbFZhbHVlIH0gZnJvbSAnLi8uLi8uLi9tYWluL2NvbXBvbmVudHMvTGFuZ3VhZ2VTZWxlY3Rvcic7XG5cbmV4cG9ydCBjb25zdCBjb250ZW50VHlwZT0ge1xuICAgIENPTlRFTlRfSU5JVDonQ09OVEVOVF9JTklUJyxcbiAgICBTVEVQX0NIQU5HRV9SRVNFVCA6ICdTVEVQX0NIQU5HRV9SRVNFVCcsXG4gICAgR09fVE9fU1RFUDogJ0dPX1RPX1NURVAnLFxuICAgIEdPX1RPX05FWFRfU1RFUDogJ0dPX1RPX05FWFRfU1RFUCcsXG4gICAgR09fVE9fUFJFVklPVVNfU1RFUDogJ0dPX1RPX1BSRVZJT1VTX1NURVAnLFxuICAgIEFERF9ORVcgOiAnQUREX05FVycsXG4gICAgUkVNT1ZFX05FVyA6ICdSRU1PVkVfTkVXJyxcbiAgICBTVVBFUl9SSUdIVFNfVVBEQVRFRDogJ1NVUEVSX1JJR0hUU19VUERBVEVEJyxcbiAgICBVUERBVEVfQ09OVEVOVF9WQUxVRSA6ICdVUERBVEVfQ09OVEVOVF9WQUxVRScsXG4gICAgU0VMRUNUX1RPVVJOQU1FTlQgOiAnU0VMRUNUX1RPVVJOQU1FTlQnLFxuICAgIFJFTU9WRV9GUk9NX01VTFRJUExFIDogJ1JFTU9WRV9GUk9NX01VTFRJUExFJyxcbiAgICBVUERBVEVfRlJPTV9NVUxUSVBMRSA6ICdVUERBVEVfRlJPTV9NVUxUSVBMRScsXG4gICAgQVBQTFlfU0VMRUNUSU9OIDogJ0FQUExZX1NFTEVDVElPTicsXG4gICAgVVBEQVRFX1NBTEVTX1BBQ0tBR0VTIDogJ1VQREFURV9TQUxFU19QQUNLQUdFUycsXG4gICAgVVBEQVRFX0FUVEFDSE1FTlRTIDogJ1VQREFURV9BVFRBQ0hNRU5UUycsXG4gICAgVVBEQVRFX0FOTkVYIDogJ1VQREFURV9BTk5FWCcsXG4gICAgQUREX1NBTEVTX1BBQ0tBR0VTIDogJ0FERF9TQUxFU19QQUNLQUdFUycsXG4gICAgUkVTRVQgOiAnUkVTRVQnLFxuICAgIEFMTF9FUElTT0RFX1VQREFURV9GTEFHOiAnVVBEQVRFX0FMTF9FUElTT0RFU19GTEFHJ1xufTtcblxuZXhwb3J0IGNvbnN0IEVtcHR5TGlzdGluZyA9IHtcbiAgICBzdGVwOiAxLFxuICAgIG1heFN0ZXA6IDEsXG4gICAgcmlnaHRzUGFja2FnZSA6IFtdLFxuICAgIHRvdXJuYW1lbnQgOiBbXSxcbiAgICBzcG9ydENhdGVnb3J5IDogW10sXG4gICAgc3BvcnRzIDogW10sXG4gICAgc2Vhc29uczogW10sXG4gICAgY3VzdG9tU2Vhc29ucyA6IFtdLFxuICAgIHNhbGVzUGFja2FnZXMgOiBbXSxcbiAgICBjdXN0b21Ub3VybmFtZW50IDogbnVsbCxcbiAgICBjdXN0b21DYXRlZ29yeSA6IG51bGwsXG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIHByb2dyYW1EZXNjcmlwdGlvbiA6IG51bGwsXG4gICAgYXR0YWNobWVudHMgOiBbXSxcbiAgICBhbm5leCA6IFtdLFxuICAgIGVuZERhdGVMaW1pdCA6IDMwLFxuICAgIGNvdW50ZXIgOiAwLFxuICAgIGN1cnJlbmN5IDogXCJFVVJcIixcbiAgICBzdGFydERhdGVNb2RlIDogXCJMSUNFTlNFXCIsXG4gICAgc3RlcENoYW5nZSA6IGZhbHNlLFxuICAgIHZhdCA6IFwibm9cIixcbiAgICBOQV9JTlBVVCA6IDkwLFxuICAgIEhMX0lOUFVUIDogNSxcbiAgICBMSUNFTlNFRF9MQU5HVUFHRVMgOiBbYWxsVmFsdWVdLFxuICAgIFBST0dSQU1fTEFOR1VBR0UgOiBbXSxcbiAgICBQUk9HUkFNX1NVQlRJVExFUyA6IFtdLFxuICAgIFBST0dSQU1fU0NSSVBUIDogW10sXG4gICAgRURJVF9QUk9HUkFNX0RFU0NSSVBUSU9OX09QVElPTkFMOiB0cnVlLFxuICAgIHdlYnNpdGUgOiBudWxsLFxuICAgIGxhdyA6IFwiRW5nbGlzaFwiLFxuICAgIGltYWdlIDogbnVsbCxcbiAgICBpbWFnZUJhc2U2NCA6IG51bGwsXG4gICAgdGVtcERhdGE6IHt9XG59O1xuXG5leHBvcnQgY29uc3QgY29udGVudCA9IChzdGF0ZSA9IEVtcHR5TGlzdGluZywgYWN0aW9uKSA9PiB7XG5cbiAgICBsZXQgbmV3U3RhdGUgPSB7fTtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5SRVNFVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgRW1wdHlMaXN0aW5nKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5DT05URU5UX0lOSVQ6XG4gICAgICAgICAgICBhY3Rpb24uY29udGVudC5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5jb250ZW50LCB7bWF4U3RlcDogbWF4KFthY3Rpb24uY29udGVudC5tYXhTdGVwLCBzdGF0ZS5tYXhTdGVwXSl9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5BTExfRVBJU09ERV9VUERBVEVfRkxBRzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge0VESVRfUFJPR1JBTV9ERVNDUklQVElPTl9PUFRJT05BTDogYWN0aW9uLnBheWxvYWR9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5HT19UT19ORVhUX1NURVA6XG4gICAgICAgICAgICBjb25zdCBuZXdTdGVwID0gc3RhdGUuc3RlcCArIDE7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzdGVwOiBuZXdTdGVwLFxuICAgICAgICAgICAgICAgIHN0ZXBDaGFuZ2U6IHRydWUsXG4gICAgICAgICAgICAgICAgbWF4U3RlcDogbWF4KFtuZXdTdGVwLCBzdGF0ZS5tYXhTdGVwXSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkdPX1RPX1NURVA6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzdGVwOiBhY3Rpb24uc3RlcCxcbiAgICAgICAgICAgICAgICBzdGVwQ2hhbmdlIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXhTdGVwOiBtYXgoW2FjdGlvbi5zdGVwLCBzdGF0ZS5tYXhTdGVwXSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlNURVBfQ0hBTkdFX1JFU0VUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZSA6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5HT19UT19QUkVWSU9VU19TVEVQOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3RlcDogc3RhdGUuc3RlcCAtMSxcbiAgICAgICAgICAgICAgICBzdGVwQ2hhbmdlIDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuUkVNT1ZFX05FVzpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXS5zcGxpY2UoYWN0aW9uLmluZGV4LCAxKTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQUREX05FVzpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXVthY3Rpb24uaW5kZXhdID0ge1xuICAgICAgICAgICAgICAgIGN1c3RvbSA6IHRydWUsXG4gICAgICAgICAgICAgICAgbmFtZTogXCJcIlxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24uY2xlYW4gKXtcbiAgICAgICAgICAgICAgICBhY3Rpb24uY2xlYW4uZm9yRWFjaCgoc2VsZWN0b3JUeXBlKT0+e1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZVtzZWxlY3RvclR5cGVdID0gJC5pc0FycmF5KHN0YXRlW3NlbGVjdG9yVHlwZV0pID8gW10gOiBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5VUERBVEVfQ09OVEVOVF9WQUxVRTpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24ua2V5XSA9IGFjdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIG5ld1N0YXRlLmxpc3RpbmdFZGl0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5TRUxFQ1RfVE9VUk5BTUVOVDpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZS50b3VybmFtZW50ID0gW2FjdGlvbi50b3VybmFtZW50XTtcbiAgICAgICAgICAgIG5ld1N0YXRlLnNwb3J0cyA9IChhY3Rpb24udG91cm5hbWVudC5zcG9ydCApID8gW2FjdGlvbi50b3VybmFtZW50LnNwb3J0XSA6IFtdO1xuICAgICAgICAgICAgbmV3U3RhdGUuc3BvcnRDYXRlZ29yeSA9IFthY3Rpb24udG91cm5hbWVudC5zcG9ydENhdGVnb3J5XTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQVBQTFlfU0VMRUNUSU9OOlxuXG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtcyA9IEFycmF5LmZyb20oIGFjdGlvbi5zZWxlY3RlZEl0ZW1zLnZhbHVlcygpICk7XG5cbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gWy4uLnN0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdXTtcblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubXVsdGlwbGUgKXtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IHNlbGVjdGVkSXRlbXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdW2FjdGlvbi5pbmRleF0gPSBzZWxlY3RlZEl0ZW1zWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5jbGVhbiApe1xuICAgICAgICAgICAgICAgIGFjdGlvbi5jbGVhbi5mb3JFYWNoKChzZWxlY3RvclR5cGUpPT57XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlW3NlbGVjdG9yVHlwZV0gPSAkLmlzQXJyYXkoc3RhdGVbc2VsZWN0b3JUeXBlXSkgPyBbXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlJFTU9WRV9GUk9NX01VTFRJUExFOlxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gWy4uLnN0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdXTtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdLnNwbGljZShhY3Rpb24uaW5kZXgsMSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5VUERBVEVfRlJPTV9NVUxUSVBMRTpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXVthY3Rpb24uaW5kZXhdW2FjdGlvbi5rZXldID0gYWN0aW9uLnZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuU1VQRVJfUklHSFRTX1VQREFURUQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlIDogQXJyYXkuZnJvbShhY3Rpb24ucmlnaHRzUGFja2FnZS52YWx1ZXMoKSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9TQUxFU19QQUNLQUdFUzpcblxuICAgICAgICAgICAgbGV0IHNhbGVzUGFja2FnZXMgPSBbLi4uc3RhdGUuc2FsZXNQYWNrYWdlc107XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlXCIgKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHNhbGVzUGFja2FnZXMubGVuZ3RoID49IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMuc3BsaWNlKGFjdGlvbi5pbmRleCwxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVBbGxcIiApIHtcbiAgICAgICAgICAgICAgICBzYWxlc1BhY2thZ2VzID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwic2F2ZVwiICkgc2FsZXNQYWNrYWdlc1thY3Rpb24uaW5kZXhdID0gYWN0aW9uLnNhbGVzUGFja2FnZTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcyA6IHNhbGVzUGFja2FnZXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX0FUVEFDSE1FTlRTOlxuXG4gICAgICAgICAgICBsZXQgYXR0YWNobWVudHMgPSBbLi4uc3RhdGUuYXR0YWNobWVudHNdO1xuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZVwiICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBhdHRhY2htZW50cy5sZW5ndGggPj0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudHMuc3BsaWNlKGFjdGlvbi5pbmRleCwxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVBbGxcIiApIHtcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50cyA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInNhdmVcIiApIGF0dGFjaG1lbnRzW2FjdGlvbi5pbmRleF0gPSBhY3Rpb24udmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRzIDogYXR0YWNobWVudHNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX0FOTkVYOlxuXG4gICAgICAgICAgICBsZXQgYW5uZXggPSBbLi4uc3RhdGUuYW5uZXhdO1xuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZVwiICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBhbm5leC5sZW5ndGggPj0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgYW5uZXguc3BsaWNlKGFjdGlvbi5pbmRleCwxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVBbGxcIiApIHtcbiAgICAgICAgICAgICAgICBhbm5leCA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInNhdmVcIiApIGFubmV4W2FjdGlvbi5pbmRleF0gPSBhY3Rpb24udmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGFubmV4IDogYW5uZXhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQUREX1NBTEVTX1BBQ0tBR0VTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcyA6IFsuLi5zdGF0ZS5zYWxlc1BhY2thZ2VzLC4uLmFjdGlvbi5zYWxlc1BhY2thZ2VzXVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvY29udGVudC5qcyIsImV4cG9ydCBjb25zdCBzZWxlY3RvclR5cGU9IHtcbiAgICBURVNUOidURVNUJyxcbiAgICBPUEVOX1NFTEVDVE9SOiAnT1BFTl9TRUxFQ1RPUicsXG4gICAgQ0xPU0VfU0VMRUNUT1IgOiAnQ0xPU0VfU0VMRUNUT1InLFxuICAgIEFQUExZX1NFTEVDVElPTiA6ICdBUFBMWV9TRUxFQ1RJT04nXG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0b3IgPSAoc3RhdGUgPSB7XG4gICAgdHlwZTogXCJzcG9ydFwiLFxuICAgIG9wZW4gOiBmYWxzZSxcbiAgICBzZWxlY3Rvckl0ZW1zOiBbXSxcbiAgICBwb3B1bGFySXRlbXM6IFtdXG5cbn0sIGFjdGlvbikgPT4ge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIHNlbGVjdG9yVHlwZS5URVNUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgb3BlbjogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLk9QRU5fU0VMRUNUT1I6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvclR5cGU6IGFjdGlvbi5zZWxlY3RvclR5cGUsXG4gICAgICAgICAgICAgICAgb3BlbiA6IHRydWUsXG4gICAgICAgICAgICAgICAgaW5kZXggOiBhY3Rpb24uaW5kZXgsXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogYWN0aW9uLnNlbGVjdG9ySXRlbXMsXG4gICAgICAgICAgICAgICAgcG9wdWxhckl0ZW1zOiBhY3Rpb24ucG9wdWxhckl0ZW1zLFxuICAgICAgICAgICAgICAgIGFjdGl2ZUZpbHRlciA6IGFjdGlvbi5hY3RpdmVGaWx0ZXIsXG4gICAgICAgICAgICAgICAgbXVsdGlwbGUgOiBhY3Rpb24ubXVsdGlwbGUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGFjdGlvbi5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICBzaG93TmV3U3BvcnQgOiBhY3Rpb24uc2hvd05ld1Nwb3J0LFxuICAgICAgICAgICAgICAgIHNob3dOZXdUb3VybmFtZW50IDogYWN0aW9uLnNob3dOZXdUb3VybmFtZW50LFxuICAgICAgICAgICAgICAgIHNob3dOZXdDYXRlZ29yeSA6IGFjdGlvbi5zaG93TmV3Q2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgc2hvd05ld1NlYXNvbiA6IGFjdGlvbi5zaG93TmV3U2Vhc29uLFxuICAgICAgICAgICAgICAgIHNob3dBbGxDb3VudHJpZXM6IGFjdGlvbi5zaG93QWxsQ291bnRyaWVzLFxuICAgICAgICAgICAgICAgIGNsZWFuIDogYWN0aW9uLmNsZWFuLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM6IGFjdGlvbi5zZWxlY3RlZEl0ZW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBzZWxlY3RvclR5cGUuQ0xPU0VfU0VMRUNUT1I6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvclR5cGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgb3BlbiA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxuICAgICAgICAgICAgICAgIHBvcHVsYXJJdGVtczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHNlbGVjdG9yVHlwZS5BUFBMWV9TRUxFQ1RJT04gOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcIlwiLFxuICAgICAgICAgICAgICAgIG9wZW4gOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBbXSxcbiAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvc2VsZWN0b3IuanMiXSwic291cmNlUm9vdCI6IiJ9