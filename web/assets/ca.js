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
    UPDATE_FILTERS_CONFIG: "UPDATE_ALL"
};

var defaultFilter = {
    rights: [],
    countries: [],
    exclusive: false,
    includeAllCountries: false,
    sport: {
        value: null,
        label: "All sports"
    },
    event: "",
    forceUpdate: true,
    syncWithLocalStorage: false
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
            return Object.assign({}, state, defaultFilter);
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
        case filterTypes.UPDATE_EXCLUSIVE:
            return Object.assign({}, state, {
                exclusive: action.exclusive
            });
        case filterTypes.UPDATE_SPORT:
            return Object.assign({}, state, {
                sport: action.sport
            });
        case filterTypes.UPDATE_FILTERS_CONFIG:
            return Object.assign({}, state, action.filters);
        case filterTypes.UPDATE_EVENT:
            return Object.assign({}, state, {
                event: action.event
            });
        case filterTypes.UPDATE_MANY:
            action.filters.forceUpdate = true;
            if (action.filters.rights) action.filters.rights = action.filters.rights.map(function (r) {
                return Number(r);
            });
            return Object.assign({}, defaultFilter, action.filters);
        default:
            return state;
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/reducers/marketplace.js":
/*!*******************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/reducers/marketplace.js ***!
  \*******************************************************************************/
/*! exports provided: marketplaceTypes, marketplace */
/*! exports used: marketplace, marketplaceTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return marketplaceTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return marketplace; });

var marketplaceTypes = {
    TEST: 'TEST'
};

var marketplace = function marketplace() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        testItem: "marketplaceReducer"

    };
    var action = arguments[1];


    switch (action.type) {
        case marketplaceTypes.TEST:
            return Object.assign({}, state, {
                test: action.text,
                id: action.id
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
    markNotificationAsSeen: function markNotificationAsSeen(id) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(envhosturl + 'api/notifications/seen', {
            id: id
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

        if (content.salesPackages) {
            content.salesPackages.forEach(function (sp) {
                if (sp.salesMethod) sp.salesMethod = sp.salesMethod.name;
                if (sp.excludedCountries) sp.excludedTerritories = sp.excludedCountries.map(function (t) {
                    return { label: t.name, value: t.name };
                });
                if (sp.territories) sp.territories = sp.territories.map(function (t) {
                    return { label: t.name, value: t.name };
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
    SET_TOTAL_COUNTRIES: 'SET_TOTAL_COUNTRIES'
};

var commonDefault = {
    totalCountries: 240
};

var common = function common() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : commonDefault;
    var action = arguments[1];


    switch (action.type) {
        case commonTypes.GET_DEFAULT_RIGHTS_PACKAGE:
            return Object.assign({}, state, { defaultRightsPackage: action.defaultRightsPackage });
        case commonTypes.SET_TOTAL_COUNTRIES:
            return Object.assign({}, state, { totalCountries: action.totalCountries });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sell_reducers_content__ = __webpack_require__(/*! ../sell/reducers/content */ "./src/AppBundle/Resources/public/javascript/sell/reducers/content.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sell_reducers_selector__ = __webpack_require__(/*! ../sell/reducers/selector */ "./src/AppBundle/Resources/public/javascript/sell/reducers/selector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__buy_reducers_filter__ = __webpack_require__(/*! ../buy/reducers/filter */ "./src/AppBundle/Resources/public/javascript/buy/reducers/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__buy_reducers_marketplace__ = __webpack_require__(/*! ../buy/reducers/marketplace */ "./src/AppBundle/Resources/public/javascript/buy/reducers/marketplace.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__manage_reducers_manage__ = __webpack_require__(/*! ../manage/reducers/manage */ "./src/AppBundle/Resources/public/javascript/manage/reducers/manage.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__reducers_user__ = __webpack_require__(/*! ./reducers/user */ "./src/AppBundle/Resources/public/javascript/main/reducers/user.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__reducers_common__ = __webpack_require__(/*! ./reducers/common */ "./src/AppBundle/Resources/public/javascript/main/reducers/common.js");













var reducers = Object(__WEBPACK_IMPORTED_MODULE_1_redux__["combineReducers"])({
    content: __WEBPACK_IMPORTED_MODULE_3__sell_reducers_content__["a" /* content */],
    selector: __WEBPACK_IMPORTED_MODULE_4__sell_reducers_selector__["a" /* selector */],
    marketplace: __WEBPACK_IMPORTED_MODULE_6__buy_reducers_marketplace__["a" /* marketplace */],
    filter: __WEBPACK_IMPORTED_MODULE_5__buy_reducers_filter__["a" /* filter */],
    manage: __WEBPACK_IMPORTED_MODULE_7__manage_reducers_manage__["a" /* manage */],
    user: __WEBPACK_IMPORTED_MODULE_8__reducers_user__["a" /* user */],
    common: __WEBPACK_IMPORTED_MODULE_9__reducers_common__["a" /* common */],
    i18nState: __WEBPACK_IMPORTED_MODULE_2_redux_i18n__["i18nState"]
});

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_redux__["createStore"])(reducers));

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

            if (action.reset) return Object.assign({}, state, { rightsPackage: [] });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL21heC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvZGF0YS9sYW5ndWFnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmNvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0xhbmd1YWdlU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy91c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3JlZHVjZXJzL21hbmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL2NvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJsYW5ndWFnZXMiLCJmaWx0ZXJUeXBlcyIsIkFERF9SSUdIVCIsIlJFTU9WRV9SSUdIVCIsIlVQREFURV9DT1VOVFJJRVMiLCJVUERBVEVfRVhDTFVTSVZFIiwiVVBEQVRFX0lOQ0xVREVEX0NPVU5UUklFUyIsIlVQREFURV9TUE9SVCIsIlVQREFURV9FVkVOVCIsIkNMRUFSIiwiQ0xFQVJfVVBEQVRFIiwiVVBEQVRFX01BTlkiLCJVUERBVEVfRklMVEVSU19DT05GSUciLCJkZWZhdWx0RmlsdGVyIiwicmlnaHRzIiwiY291bnRyaWVzIiwiZXhjbHVzaXZlIiwiaW5jbHVkZUFsbENvdW50cmllcyIsInNwb3J0IiwidmFsdWUiLCJsYWJlbCIsImV2ZW50IiwiZm9yY2VVcGRhdGUiLCJzeW5jV2l0aExvY2FsU3RvcmFnZSIsImZpbHRlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsIk9iamVjdCIsImFzc2lnbiIsImlkIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwibWFwIiwiYyIsImZpbHRlcnMiLCJOdW1iZXIiLCJyIiwibWFya2V0cGxhY2VUeXBlcyIsIlRFU1QiLCJtYXJrZXRwbGFjZSIsInRlc3RJdGVtIiwidGVzdCIsInRleHQiLCJfX2FwaVN0b3JlIiwidG91cm5hbWVudHMiLCJ3aW5kb3ciLCJDb250ZW50QXJlbmEiLCJDb250ZW50QXBpIiwic2F2ZUNvbnRlbnRBc0RyYWZ0IiwiY29udGVudCIsImRlZmVycmVkIiwialF1ZXJ5IiwiRGVmZXJyZWQiLCJfdGhpcyIsIiQiLCJhamF4IiwidXJsIiwiZW52aG9zdHVybCIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiY29udGVudFR5cGUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJyZXNvbHZlIiwiZXJyb3IiLCJzdGF0dXMiLCJyZWplY3QiLCJwcm9taXNlIiwic2F2ZUNvbnRlbnRBc0luYWN0aXZlIiwic2F2ZUNvbnRlbnRBc0FjdGl2ZSIsInJlcHVibGlzaExpc3RpbmciLCJjdXN0b21JZCIsInNlbmRNZXNzYWdlIiwibWVzc2FnZSIsImdldFVzZXJJbmZvIiwiZ2V0VXNlckluZm9CeUFjdGl2YXRpb25Db2RlIiwiYWN0aXZhdGlvbkNvZGUiLCJnZXRDb21wYW55VXNlcnMiLCJ1cGRhdGVDb21wYW55IiwiY29tcGFueSIsInVwZGF0ZVBhc3N3b3JkIiwidXBkYXRlVXNlciIsInVzZXIiLCJhY3RpdmF0ZVVzZXIiLCJwYXNzd29yZCIsInVwZGF0ZVVzZXJQcm9maWxlIiwicHJvZmlsZSIsImdldFRocmVhZCIsImdldFRocmVhZHMiLCJwbGFjZUJpZCIsImJpZCIsImFjY2VwdEJpZCIsInNpZ25hdHVyZSIsInNpZ25hdHVyZU5hbWUiLCJzaWduYXR1cmVQb3NpdGlvbiIsInJlamVjdEJpZCIsInJlbW92ZUJpZCIsInNhdmVUbXBGaWxlIiwiZmlsZXMiLCJGb3JtRGF0YSIsImFwcGVuZCIsInByb2Nlc3NEYXRhIiwic2F2ZUF0dGFjaG1lbnRGaWxlIiwiY29uc29sZSIsImxvZyIsImdldEJ5Q3VzdG9tSWQiLCJnZXREcmFmdExpc3RpbmdzIiwiZ2V0SW5hY3RpdmVMaXN0aW5ncyIsImdldEFjdGl2ZUxpc3RpbmdzIiwiZ2V0RXhwaXJlZExpc3RpbmdzIiwicmVtb3ZlTGlzdGluZyIsImR1cGxpY2F0ZUxpc3RpbmciLCJkZWFjdGl2YXRlTGlzdGluZyIsImFyY2hpdmVMaXN0aW5nIiwiZ2V0Q2xvc2VkRGVhbHMiLCJnZXRBbGxEZWFscyIsImdldFBlbmRpbmdEZWFscyIsImdldFJlamVjdGVkRGVhbHMiLCJnZXRXYXRjaGxpc3RMaXN0aW5ncyIsIkFwaSIsInNvcnRCeUxhYmVsIiwiYSIsImIiLCJuYW1lIiwic29ydEJ5U3BvcnQiLCJzcG9ydENhdGVnb3J5IiwicHJlcGFyZUxpc3QiLCJsaXN0IiwiY2F0ZWdvcnlJZCIsIml0ZW0iLCJjYXRlZ29yeSIsImV4dGVybmFsSWQiLCJzb3J0IiwiZmlsdGVyRG91YmxlcyIsInNwb3J0SWQiLCJuYW1lcyIsInJlcGxhY2UiLCJwdXNoIiwiZ2V0Q29udGVudCIsImdldEpzb25Db250ZW50Iiwic2F2ZUZpbHRlciIsImdldENvdW50cmllcyIsIkRhdGEiLCJDb3VudHJpZXMiLCJsZW5ndGgiLCJyZWdpb25zIiwiZ2V0QWN0aXZlU3BvcnRzIiwiZ2V0Q291bnRyaWVzRnVsbCIsImdldFRlcnJpdG9yaWVzIiwiZ2V0UmVnaW9ucyIsImdldFJpZ2h0cyIsInJpZ2h0c1BhY2thZ2UiLCJncm91cCIsImdldFJpZ2h0c1BhY2thZ2UiLCJnZXRTcG9ydHMiLCJleHRlcm5hbEFwaVVybCIsInNwb3J0cyIsImdldENvbnRlbnREZXRhaWxzIiwiZ2V0UGVuZGluZ0xpc3RpbmdzIiwiZ2V0Q2F0ZWdvcmllcyIsImNhdHMiLCJnZXRUb3VybmFtZW50cyIsImRvbmUiLCJ0b3VybmFtZW50Iiwic3RvcmVkUmVzcG9uc2UiLCJ1bmRlZmluZWQiLCJnZXRTZWFzb25zIiwidG91cm5hbWVudElkIiwic2Vhc29ucyIsInNlYXNvbiIsImlzQXJyYXkiLCJlbmREYXRlIiwiZW5kX2RhdGUiLCJzdGFydERhdGUiLCJzdGFydF9kYXRlIiwidG91cm5hbWVudF9pZCIsInllYXIiLCJyZXZlcnNlIiwiZ2V0U2NoZWR1bGUiLCJzZWFzb25JZCIsInNwb3J0X2V2ZW50cyIsInNwb3J0X2V2ZW50IiwiZm9yRWFjaCIsInJvdW5kIiwidG91cm5hbWVudF9yb3VuZCIsIm51bWJlciIsIm1hdGNoZXMiLCJNYXAiLCJzZXQiLCJzY2hlZHVsZWQiLCJ0b3VybmFtZW50Um91bmQiLCJjb21wZXRpdG9ycyIsImNvbXBldGl0b3IiLCJzZWFyY2hDb21wZXRpdGlvbiIsInJlcXVlc3QiLCJ0cmFkaXRpb25hbCIsImRhdGFUeXBlIiwid2F0Y2hsaXN0IiwiZ2V0Tm90aWZpY2F0aW9ucyIsImF4aW9zIiwiZ2V0IiwibWFya05vdGlmaWNhdGlvbkFzU2VlbiIsInBvc3QiLCJMYW5ndWFnZXMiLCJUb3BTcG9ydHMiLCJGdWxsU3BvcnRzIiwiQWN0aXZlU3BvcnRzIiwiVGVycml0b3JpZXMiLCJSZWdpb25zIiwiU2hvcnQiLCJMb25nIiwiVXRpbHMiLCJjb250ZW50UGFyc2VyRnJvbVNlcnZlciIsInBhcnNlZCIsImV4dHJhRGF0YSIsImVudHJpZXMiLCJrZXkiLCJBcnJheSIsInNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0IiwicnAiLCJzZWxlY3RlZFJpZ2h0cyIsImZpeHR1cmVzQnlTZWFzb24iLCJzIiwiaSIsImZpeHR1cmVzIiwibGF3Iiwic2FsZXNQYWNrYWdlcyIsInNwIiwic2FsZXNNZXRob2QiLCJleGNsdWRlZENvdW50cmllcyIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJ0IiwidGVycml0b3JpZXMiLCJpbnN0YWxsbWVudHMiLCJkYXRlIiwibW9tZW50IiwiZSIsInNvcnRTYWxlc1BhY2thZ2VzIiwiaG9zdHVybCIsInN0ZXAiLCJjdXN0b21TZWFzb25zIiwic3RhcnRzV2l0aCIsInllYXJzIiwic3BsaXQiLCJmcm9tIiwidG8iLCJjdXN0b20iLCJzZWFzb25EdXJhdGlvbnMiLCJjdXN0b21TZWFzb25EdXIiLCJjdXN0b21TdGFydERhdGUiLCJjdXN0b21FbmREYXRlIiwic3RvcmUiLCJnZXRTdGF0ZSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwidGl0bGUiLCJmaWx0ZXJDb21wYW55SW5mbyIsImxlZ2FsTmFtZSIsInJlZ2lzdHJhdGlvbk51bWJlciIsInZhdCIsImFkZHJlc3MiLCJhZGRyZXNzMiIsImNpdHkiLCJ6aXAiLCJjb3VudHJ5IiwiaXNBUElBdmFpbGFibGUiLCJGaWxlIiwiRmlsZVJlYWRlciIsIkZpbGVMaXN0IiwiQmxvYiIsImRvY3VtZW50Iiwid3JpdGVsbiIsImFkZE9yZGluYWwiLCJuIiwic3RyIiwidG9TdHJpbmciLCJzbGljZSIsIm9yZCIsImdldEluZGV4IiwiYXJyIiwicHJvcCIsImdldFdlYnNpdGVVUmwiLCJpbmNsdWRlcyIsImlzTGlzdGluZ1B1Ymxpc2hlZCIsImFsbFZhbHVlIiwiTGFuZ3VhZ2VTZWxlY3RvciIsInByb3BzIiwiaGFuZGxlT25DaGFuZ2UiLCJzZWxlY3Rpb24iLCJvbkNoYW5nZSIsImhhc0FsbCIsImZpbmQiLCJoYXNBbGxQcmV2IiwicHJldlNlbGVjdGlvbiIsIm11bHRpIiwicGxhY2Vob2xkZXIiLCJyZWFsTGFuZ3VhZ2VzIiwidmFsdWVzIiwiayIsImFsbExhbmd1YWdlcyIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29tbW9uVHlwZXMiLCJHRVRfREVGQVVMVF9SSUdIVFNfUEFDS0FHRSIsIlNFVF9UT1RBTF9DT1VOVFJJRVMiLCJjb21tb25EZWZhdWx0IiwidG90YWxDb3VudHJpZXMiLCJjb21tb24iLCJkZWZhdWx0UmlnaHRzUGFja2FnZSIsInVzZXJUeXBlcyIsIkxPR09VVCIsIkxPR0lOIiwiUFJPRklMRSIsIkxPQURfVVNFUl9EQVRBIiwiZGVmYXVsdFVzZXIiLCJlbWFpbCIsInJlZHVjZXJzIiwiY29tYmluZVJlZHVjZXJzIiwic2VsZWN0b3IiLCJtYW5hZ2UiLCJpMThuU3RhdGUiLCJjcmVhdGVTdG9yZSIsIm1hbmFnZVR5cGVzIiwiQ09OVEVOVF9JTklUIiwiU1RFUF9DSEFOR0VfUkVTRVQiLCJHT19UT19TVEVQIiwiR09fVE9fTkVYVF9TVEVQIiwiR09fVE9fUFJFVklPVVNfU1RFUCIsIkFERF9ORVciLCJSRU1PVkVfTkVXIiwiU1VQRVJfUklHSFRTX1VQREFURUQiLCJVUERBVEVfQ09OVEVOVF9WQUxVRSIsIlNFTEVDVF9UT1VSTkFNRU5UIiwiUkVNT1ZFX0ZST01fTVVMVElQTEUiLCJVUERBVEVfRlJPTV9NVUxUSVBMRSIsIkFQUExZX1NFTEVDVElPTiIsIlVQREFURV9TQUxFU19QQUNLQUdFUyIsIlVQREFURV9BVFRBQ0hNRU5UUyIsIlVQREFURV9BTk5FWCIsIkFERF9TQUxFU19QQUNLQUdFUyIsIlJFU0VUIiwiQUxMX0VQSVNPREVfVVBEQVRFX0ZMQUciLCJFbXB0eUxpc3RpbmciLCJtYXhTdGVwIiwiY3VzdG9tVG91cm5hbWVudCIsImN1c3RvbUNhdGVnb3J5IiwiZGVzY3JpcHRpb24iLCJwcm9ncmFtRGVzY3JpcHRpb24iLCJhdHRhY2htZW50cyIsImFubmV4IiwiZW5kRGF0ZUxpbWl0IiwiY291bnRlciIsImN1cnJlbmN5Iiwic3RhcnREYXRlTW9kZSIsInN0ZXBDaGFuZ2UiLCJOQV9JTlBVVCIsIkhMX0lOUFVUIiwiTElDRU5TRURfTEFOR1VBR0VTIiwiUFJPR1JBTV9MQU5HVUFHRSIsIlBST0dSQU1fU1VCVElUTEVTIiwiUFJPR1JBTV9TQ1JJUFQiLCJFRElUX1BST0dSQU1fREVTQ1JJUFRJT05fT1BUSU9OQUwiLCJ3ZWJzaXRlIiwiaW1hZ2UiLCJpbWFnZUJhc2U2NCIsInRlbXBEYXRhIiwibmV3U3RhdGUiLCJpbml0aWFsaXplZCIsIm1heCIsInBheWxvYWQiLCJuZXdTdGVwIiwic2VsZWN0b3JUeXBlIiwiY2xlYW4iLCJsaXN0aW5nRWRpdGVkIiwic2VsZWN0ZWRJdGVtcyIsIm11bHRpcGxlIiwicmVzZXQiLCJzYWxlc1BhY2thZ2UiLCJPUEVOX1NFTEVDVE9SIiwiQ0xPU0VfU0VMRUNUT1IiLCJvcGVuIiwic2VsZWN0b3JJdGVtcyIsInBvcHVsYXJJdGVtcyIsImFjdGl2ZUZpbHRlciIsImRpc2FibGVkIiwic2hvd05ld1Nwb3J0Iiwic2hvd05ld1RvdXJuYW1lbnQiLCJzaG93TmV3Q2F0ZWdvcnkiLCJzaG93TmV3U2Vhc29uIiwic2hvd0FsbENvdW50cmllcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZGOzs7Ozs7Ozs7Ozs7O0FDQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEM7QUFDNUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUNuTEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25EQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDbEJBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUN4REE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0pBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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RCxnQkFBTyxNQUROO0FBRUQsc0JBQWE7QUFGWixLQWJnQjtBQWlCckIsVUFBSztBQUNELGdCQUFPLFVBRE47QUFFRCxzQkFBYTtBQUZaLEtBakJnQjtBQXFCckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxzQkFBYTtBQUZaLEtBckJnQjtBQXlCckIsVUFBSztBQUNELGdCQUFPLFFBRE47QUFFRCxzQkFBYTtBQUZaLEtBekJnQjtBQTZCckIsVUFBSztBQUNELGdCQUFPLFdBRE47QUFFRCxzQkFBYTtBQUZaLEtBN0JnQjtBQWlDckIsVUFBSztBQUNELGdCQUFPLFVBRE47QUFFRCxzQkFBYTtBQUZaLEtBakNnQjtBQXFDckIsVUFBSztBQUNELGdCQUFPLFVBRE47QUFFRCxzQkFBYTtBQUZaLEtBckNnQjtBQXlDckIsVUFBSztBQUNELGdCQUFPLFFBRE47QUFFRCxzQkFBYTtBQUZaLEtBekNnQjtBQTZDckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxzQkFBYTtBQUZaLEtBN0NnQjtBQWlEckIsVUFBSztBQUNELGdCQUFPLFFBRE47QUFFRCxzQkFBYTtBQUZaLEtBakRnQjtBQXFEckIsVUFBSztBQUNELGdCQUFPLGFBRE47QUFFRCxzQkFBYTtBQUZaLEtBckRnQjtBQXlEckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxzQkFBYTtBQUZaLEtBekRnQjtBQTZEckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxzQkFBYTtBQUZaLEtBN0RnQjtBQWlFckIsVUFBSztBQUNELGdCQUFPLFFBRE47QUFFRCxzQkFBYTtBQUZaLEtBakVnQjtBQXFFckIsVUFBSztBQUNELGdCQUFPLFlBRE47QUFFRCxzQkFBYTtBQUZaLEtBckVnQjtBQXlFckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxzQkFBYTtBQUZaLEtBekVnQjtBQTZFckIsVUFBSztBQUNELGdCQUFPLFFBRE47QUFFRCxzQkFBYTtBQUZaLEtBN0VnQjtBQWlGckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxzQkFBYTtBQUZaLEtBakZn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QWQsRUFBa0JKLEtBQWxCLEVBQXlCO0FBQzVCNlYsOEJBQWMsRUFEYztBQUU1QlMsc0JBQU8sS0FGcUI7QUFHNUJDLCtCQUFlLEVBSGE7QUFJNUJDLDhCQUFjO0FBSmMsYUFBekIsQ0FBUDtBQU1KO0FBQ0ksbUJBQU94VyxLQUFQO0FBdENSO0FBd0NILENBaERNLEMiLCJmaWxlIjoiY2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcbnZhciBidG9hID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5idG9hICYmIHdpbmRvdy5idG9hLmJpbmQod2luZG93KSkgfHwgcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J0b2EnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgbG9hZEV2ZW50ID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG4gICAgdmFyIHhEb21haW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBJRSA4LzkgQ09SUyBzdXBwb3J0XG4gICAgLy8gT25seSBzdXBwb3J0cyBQT1NUIGFuZCBHRVQgY2FsbHMgYW5kIGRvZXNuJ3QgcmV0dXJucyB0aGUgcmVzcG9uc2UgaGVhZGVycy5cbiAgICAvLyBET04nVCBkbyB0aGlzIGZvciB0ZXN0aW5nIGIvYyBYTUxIdHRwUmVxdWVzdCBpcyBtb2NrZWQsIG5vdCBYRG9tYWluUmVxdWVzdC5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJlxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cuWERvbWFpblJlcXVlc3QgJiYgISgnd2l0aENyZWRlbnRpYWxzJyBpbiByZXF1ZXN0KSAmJlxuICAgICAgICAhaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IHdpbmRvdy5YRG9tYWluUmVxdWVzdCgpO1xuICAgICAgbG9hZEV2ZW50ID0gJ29ubG9hZCc7XG4gICAgICB4RG9tYWluID0gdHJ1ZTtcbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uIGhhbmRsZVByb2dyZXNzKCkge307XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7fTtcbiAgICB9XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0W2xvYWRFdmVudF0gPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQgJiYgIXhEb21haW4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIC8vIElFIHNlbmRzIDEyMjMgaW5zdGVhZCBvZiAyMDQgKGh0dHBzOi8vZ2l0aHViLmNvbS9heGlvcy9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9pc0NhbmNlbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi8uLi9kZWZhdWx0cycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICAgIHVybDogYXJndW1lbnRzWzBdXG4gICAgfSwgYXJndW1lbnRzWzFdKTtcbiAgfVxuXG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKGRlZmF1bHRzLCB7bWV0aG9kOiAnZ2V0J30sIHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHJldHVybiBlcnJvcjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBidG9hIHBvbHlmaWxsIGZvciBJRTwxMCBjb3VydGVzeSBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRjaGFtYmVycy9CYXNlNjQuanNcblxudmFyIGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcblxuZnVuY3Rpb24gRSgpIHtcbiAgdGhpcy5tZXNzYWdlID0gJ1N0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3Rlcic7XG59XG5FLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcbkUucHJvdG90eXBlLmNvZGUgPSA1O1xuRS5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5mdW5jdGlvbiBidG9hKGlucHV0KSB7XG4gIHZhciBzdHIgPSBTdHJpbmcoaW5wdXQpO1xuICB2YXIgb3V0cHV0ID0gJyc7XG4gIGZvciAoXG4gICAgLy8gaW5pdGlhbGl6ZSByZXN1bHQgYW5kIGNvdW50ZXJcbiAgICB2YXIgYmxvY2ssIGNoYXJDb2RlLCBpZHggPSAwLCBtYXAgPSBjaGFycztcbiAgICAvLyBpZiB0aGUgbmV4dCBzdHIgaW5kZXggZG9lcyBub3QgZXhpc3Q6XG4gICAgLy8gICBjaGFuZ2UgdGhlIG1hcHBpbmcgdGFibGUgdG8gXCI9XCJcbiAgICAvLyAgIGNoZWNrIGlmIGQgaGFzIG5vIGZyYWN0aW9uYWwgZGlnaXRzXG4gICAgc3RyLmNoYXJBdChpZHggfCAwKSB8fCAobWFwID0gJz0nLCBpZHggJSAxKTtcbiAgICAvLyBcIjggLSBpZHggJSAxICogOFwiIGdlbmVyYXRlcyB0aGUgc2VxdWVuY2UgMiwgNCwgNiwgOFxuICAgIG91dHB1dCArPSBtYXAuY2hhckF0KDYzICYgYmxvY2sgPj4gOCAtIGlkeCAlIDEgKiA4KVxuICApIHtcbiAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGlkeCArPSAzIC8gNCk7XG4gICAgaWYgKGNoYXJDb2RlID4gMHhGRikge1xuICAgICAgdGhyb3cgbmV3IEUoKTtcbiAgICB9XG4gICAgYmxvY2sgPSBibG9jayA8PCA4IHwgY2hhckNvZGU7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidG9hO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdmFyIG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKClcbik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIG1ldGhvZHMgbGlrZSBgXy5tYXhgIGFuZCBgXy5taW5gIHdoaWNoIGFjY2VwdHMgYVxuICogYGNvbXBhcmF0b3JgIHRvIGRldGVybWluZSB0aGUgZXh0cmVtdW0gdmFsdWUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgaXRlcmF0ZWUgaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyYXRvciBUaGUgY29tcGFyYXRvciB1c2VkIHRvIGNvbXBhcmUgdmFsdWVzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGV4dHJlbXVtIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlRXh0cmVtdW0oYXJyYXksIGl0ZXJhdGVlLCBjb21wYXJhdG9yKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBjdXJyZW50ID0gaXRlcmF0ZWUodmFsdWUpO1xuXG4gICAgaWYgKGN1cnJlbnQgIT0gbnVsbCAmJiAoY29tcHV0ZWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gKGN1cnJlbnQgPT09IGN1cnJlbnQgJiYgIWlzU3ltYm9sKGN1cnJlbnQpKVxuICAgICAgICAgIDogY29tcGFyYXRvcihjdXJyZW50LCBjb21wdXRlZClcbiAgICAgICAgKSkge1xuICAgICAgdmFyIGNvbXB1dGVkID0gY3VycmVudCxcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRXh0cmVtdW07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRXh0cmVtdW0uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXRUYWcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmd0YCB3aGljaCBkb2Vzbid0IGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZ3JlYXRlciB0aGFuIGBvdGhlcmAsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlR3QodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA+IG90aGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUd0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX29iamVjdFRvU3RyaW5nLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3ltYm9sO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzU3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTeW1ib2wuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgYmFzZUV4dHJlbXVtID0gcmVxdWlyZSgnLi9fYmFzZUV4dHJlbXVtJyksXG4gICAgYmFzZUd0ID0gcmVxdWlyZSgnLi9fYmFzZUd0JyksXG4gICAgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG1heGltdW0gdmFsdWUgb2YgYGFycmF5YC4gSWYgYGFycmF5YCBpcyBlbXB0eSBvciBmYWxzZXksXG4gKiBgdW5kZWZpbmVkYCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXhpbXVtIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLm1heChbNCwgMiwgOCwgNl0pO1xuICogLy8gPT4gOFxuICpcbiAqIF8ubWF4KFtdKTtcbiAqIC8vID0+IHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBtYXgoYXJyYXkpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpXG4gICAgPyBiYXNlRXh0cmVtdW0oYXJyYXksIGlkZW50aXR5LCBiYXNlR3QpXG4gICAgOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWF4O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL21heC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL21heC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsImV4cG9ydCBjb25zdCBsYW5ndWFnZXMgPSB7XG4gICAgXCJhYlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBYmtoYXpcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsNKn0YHRg9CwXCJcbiAgICB9LFxuICAgIFwiYWFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWZhclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFmYXJhZlwiXG4gICAgfSxcbiAgICBcImFmXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFmcmlrYWFuc1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFmcmlrYWFuc1wiXG4gICAgfSxcbiAgICBcImFrXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFrYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBa2FuXCJcbiAgICB9LFxuICAgIFwic3FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWxiYW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTaHFpcFwiXG4gICAgfSxcbiAgICBcImFtXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFtaGFyaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhiqDhiJvhiK3hiptcIlxuICAgIH0sXG4gICAgXCJhclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBcmFiaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLYp9mE2LnYsdio2YrYqVwiXG4gICAgfSxcbiAgICBcImFuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFyYWdvbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFyYWdvbsOpc1wiXG4gICAgfSxcbiAgICBcImh5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFybWVuaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi1YDVodW11aXWgNWl1bZcIlxuICAgIH0sXG4gICAgXCJhc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBc3NhbWVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCmheCmuOCmruCngOCmr+CmvOCmvlwiXG4gICAgfSxcbiAgICBcImF2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkF2YXJpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCw0LLQsNGAINC80LDRhtOALCDQvNCw0LPTgNCw0YDRg9C7INC80LDRhtOAXCJcbiAgICB9LFxuICAgIFwiYWVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXZlc3RhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImF2ZXN0YVwiXG4gICAgfSxcbiAgICBcImF5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkF5bWFyYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImF5bWFyIGFydVwiXG4gICAgfSxcbiAgICBcImF6XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkF6ZXJiYWlqYW5pXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYXrJmXJiYXljYW4gZGlsaVwiXG4gICAgfSxcbiAgICBcImJtXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJhbWJhcmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJiYW1hbmFua2FuXCJcbiAgICB9LFxuICAgIFwiYmFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmFzaGtpclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCx0LDRiNKh0L7RgNGCINGC0LXQu9C1XCJcbiAgICB9LFxuICAgIFwiZXVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmFzcXVlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZXVza2FyYSwgZXVza2VyYVwiXG4gICAgfSxcbiAgICBcImJlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJlbGFydXNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQkdC10LvQsNGA0YPRgdC60LDRj1wiXG4gICAgfSxcbiAgICBcImJuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJlbmdhbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpqzgpr7gpoLgprLgpr5cIlxuICAgIH0sXG4gICAgXCJiaFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCaWhhcmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpK3gpYvgpJzgpKrgpYHgpLDgpYBcIlxuICAgIH0sXG4gICAgXCJiaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCaXNsYW1hXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQmlzbGFtYVwiXG4gICAgfSxcbiAgICBcImJzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJvc25pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJib3NhbnNraSBqZXppa1wiXG4gICAgfSxcbiAgICBcImJyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJyZXRvblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJyZXpob25lZ1wiXG4gICAgfSxcbiAgICBcImJnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJ1bGdhcmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCx0YrQu9Cz0LDRgNGB0LrQuCDQtdC30LjQulwiXG4gICAgfSxcbiAgICBcIm15XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJ1cm1lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhgJfhgJnhgKzhgIXhgKxcIlxuICAgIH0sXG4gICAgXCJjYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDYXRhbGFuOyBWYWxlbmNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJDYXRhbMOgXCJcbiAgICB9LFxuICAgIFwiY2hcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2hhbW9ycm9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJDaGFtb3J1XCJcbiAgICB9LFxuICAgIFwiY2VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2hlY2hlblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC90L7RhdGH0LjQudC9INC80L7RgtGCXCJcbiAgICB9LFxuICAgIFwibnlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2hpY2hld2E7IENoZXdhOyBOeWFuamFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJjaGlDaGXFtWEsIGNoaW55YW5qYVwiXG4gICAgfSxcbiAgICBcInpoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNoaW5lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLkuK3mlocgKFpoxY1uZ3fDqW4pLCDmsYnor60sIOa8ouiqnlwiXG4gICAgfSxcbiAgICBcImN2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNodXZhc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRh9OR0LLQsNGIINGH05fQu9GF0LhcIlxuICAgIH0sXG4gICAgXCJrd1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDb3JuaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2VybmV3ZWtcIlxuICAgIH0sXG4gICAgXCJjb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDb3JzaWNhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImNvcnN1LCBsaW5ndWEgY29yc2FcIlxuICAgIH0sXG4gICAgXCJjclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDcmVlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4ZOA4ZCm4ZCD4ZSt4ZCN4ZCP4ZCjXCJcbiAgICB9LFxuICAgIFwiaHJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ3JvYXRpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJocnZhdHNraVwiXG4gICAgfSxcbiAgICBcImNzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkN6ZWNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwixI1lc2t5LCDEjWXFoXRpbmFcIlxuICAgIH0sXG4gICAgXCJkYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJEYW5pc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJkYW5za1wiXG4gICAgfSxcbiAgICBcImR2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkRpdmVoaTsgRGhpdmVoaTsgTWFsZGl2aWFuO1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIt6L3qjeiN6s3oDeqFwiXG4gICAgfSxcbiAgICBcIm5sXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkR1dGNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTmVkZXJsYW5kcywgVmxhYW1zXCJcbiAgICB9LFxuICAgIFwiZW5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRW5nbGlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkVuZ2xpc2hcIlxuICAgIH0sXG4gICAgXCJlb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJFc3BlcmFudG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFc3BlcmFudG9cIlxuICAgIH0sXG4gICAgXCJldFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJFc3RvbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImVlc3RpLCBlZXN0aSBrZWVsXCJcbiAgICB9LFxuICAgIFwiZWVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRXdlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRcqLZWdiZVwiXG4gICAgfSxcbiAgICBcImZvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZhcm9lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJmw7hyb3lza3RcIlxuICAgIH0sXG4gICAgXCJmalwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGaWppYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJ2b3NhIFZha2F2aXRpXCJcbiAgICB9LFxuICAgIFwiZmlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRmlubmlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInN1b21pLCBzdW9tZW4ga2llbGlcIlxuICAgIH0sXG4gICAgXCJmclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGcmVuY2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJmcmFuw6dhaXMsIGxhbmd1ZSBmcmFuw6dhaXNlXCJcbiAgICB9LFxuICAgIFwiZmZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRnVsYTsgRnVsYWg7IFB1bGFhcjsgUHVsYXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJGdWxmdWxkZSwgUHVsYWFyLCBQdWxhclwiXG4gICAgfSxcbiAgICBcImdsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkdhbGljaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiR2FsZWdvXCJcbiAgICB9LFxuICAgIFwia2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR2VvcmdpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhg6Xhg5Dhg6Dhg5fhg6Phg5rhg5hcIlxuICAgIH0sXG4gICAgXCJkZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHZXJtYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJEZXV0c2NoXCJcbiAgICB9LFxuICAgIFwiZWxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR3JlZWssIE1vZGVyblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIs6VzrvOu863zr3Ouc66zqxcIlxuICAgIH0sXG4gICAgXCJnblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHdWFyYW7DrVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkF2YcOxZeG6vVwiXG4gICAgfSxcbiAgICBcImd1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkd1amFyYXRpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KqX4KuB4Kqc4Kqw4Kq+4Kqk4KuAXCJcbiAgICB9LFxuICAgIFwiaHRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGFpdGlhbjsgSGFpdGlhbiBDcmVvbGVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLcmV5w7JsIGF5aXN5ZW5cIlxuICAgIH0sXG4gICAgXCJoYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIYXVzYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkhhdXNhLCDZh9mO2YjZj9iz2Y5cIlxuICAgIH0sXG4gICAgXCJoZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIZWJyZXcgKG1vZGVybilcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLXoteR16jXmdeqXCJcbiAgICB9LFxuICAgIFwiaHpcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGVyZXJvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT3RqaWhlcmVyb1wiXG4gICAgfSxcbiAgICBcImhpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhpbmRpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KS54KS/4KSo4KWN4KSm4KWALCDgpLngpL/gpILgpKbgpYBcIlxuICAgIH0sXG4gICAgXCJob1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIaXJpIE1vdHVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJIaXJpIE1vdHVcIlxuICAgIH0sXG4gICAgXCJodVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIdW5nYXJpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJNYWd5YXJcIlxuICAgIH0sXG4gICAgXCJpYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbnRlcmxpbmd1YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkludGVybGluZ3VhXCJcbiAgICB9LFxuICAgIFwiaWRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW5kb25lc2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkJhaGFzYSBJbmRvbmVzaWFcIlxuICAgIH0sXG4gICAgXCJpZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbnRlcmxpbmd1ZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk9yaWdpbmFsbHkgY2FsbGVkIE9jY2lkZW50YWw7IHRoZW4gSW50ZXJsaW5ndWUgYWZ0ZXIgV1dJSVwiXG4gICAgfSxcbiAgICBcImdhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIklyaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiR2FlaWxnZVwiXG4gICAgfSxcbiAgICBcImlnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIklnYm9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBc+G7pXPhu6UgSWdib1wiXG4gICAgfSxcbiAgICBcImlrXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkludXBpYXFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJJw7F1cGlhcSwgScOxdXBpYXR1blwiXG4gICAgfSxcbiAgICBcImlvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIklkb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIklkb1wiXG4gICAgfSxcbiAgICBcImlzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkljZWxhbmRpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIsONc2xlbnNrYVwiXG4gICAgfSxcbiAgICBcIml0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkl0YWxpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJJdGFsaWFub1wiXG4gICAgfSxcbiAgICBcIml1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkludWt0aXR1dFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGQg+GThOGSg+GRjuGRkOGRplwiXG4gICAgfSxcbiAgICBcImphXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkphcGFuZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi5pel5pys6KqeICjjgavjgbvjgpPjgZTvvI/jgavjgaPjgb3jgpPjgZQpXCJcbiAgICB9LFxuICAgIFwianZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSmF2YW5lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJiYXNhIEphd2FcIlxuICAgIH0sXG4gICAgXCJrbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYWxhYWxsaXN1dCwgR3JlZW5sYW5kaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJrYWxhYWxsaXN1dCwga2FsYWFsbGl0IG9xYWFzaWlcIlxuICAgIH0sXG4gICAgXCJrblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYW5uYWRhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LKV4LKo4LON4LKo4LKhXCJcbiAgICB9LFxuICAgIFwia3JcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2FudXJpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2FudXJpXCJcbiAgICB9LFxuICAgIFwia3NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2FzaG1pcmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpJXgpLbgpY3gpK7gpYDgpLDgpYAsINmD2LTZhdmK2LHZiuKAjlwiXG4gICAgfSxcbiAgICBcImtrXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthemFraFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItKa0LDQt9Cw0psg0YLRltC70ZZcIlxuICAgIH0sXG4gICAgXCJrbVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLaG1lclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGel+GetuGen+GetuGegeGfkuGemOGfguGemlwiXG4gICAgfSxcbiAgICBcImtpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpa3V5dSwgR2lrdXl1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiR8Spa8WpecWpXCJcbiAgICB9LFxuICAgIFwicndcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2lueWFyd2FuZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJJa2lueWFyd2FuZGFcIlxuICAgIH0sXG4gICAgXCJreVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLaXJnaGl6LCBLeXJneXpcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQutGL0YDQs9GL0Lcg0YLQuNC70LhcIlxuICAgIH0sXG4gICAgXCJrdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLb21pXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LrQvtC80Lgg0LrRi9CyXCJcbiAgICB9LFxuICAgIFwia2dcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS29uZ29cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLaUtvbmdvXCJcbiAgICB9LFxuICAgIFwia29cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS29yZWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi7ZWc6rWt7Ja0ICjpn5PlnIvoqp4pLCDsobDshKDrp5AgKOacnemuruiqnilcIlxuICAgIH0sXG4gICAgXCJrdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLdXJkaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS3VyZMOuLCDZg9mI2LHYr9uM4oCOXCJcbiAgICB9LFxuICAgIFwia2pcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS3dhbnlhbWEsIEt1YW55YW1hXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS3VhbnlhbWFcIlxuICAgIH0sXG4gICAgXCJsYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMYXRpblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImxhdGluZSwgbGluZ3VhIGxhdGluYVwiXG4gICAgfSxcbiAgICBcImxiXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkx1eGVtYm91cmdpc2gsIExldHplYnVyZ2VzY2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMw6t0emVidWVyZ2VzY2hcIlxuICAgIH0sXG4gICAgXCJsZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMdWdhbmRhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTHVnYW5kYVwiXG4gICAgfSxcbiAgICBcImxpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxpbWJ1cmdpc2gsIExpbWJ1cmdhbiwgTGltYnVyZ2VyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTGltYnVyZ3NcIlxuICAgIH0sXG4gICAgXCJsblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMaW5nYWxhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTGluZ8OhbGFcIlxuICAgIH0sXG4gICAgXCJsb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMYW9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgup7gurLguqrgurLguqXgurLguqdcIlxuICAgIH0sXG4gICAgXCJsdFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMaXRodWFuaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwibGlldHV2acWzIGthbGJhXCJcbiAgICB9LFxuICAgIFwibHVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTHViYS1LYXRhbmdhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiXCJcbiAgICB9LFxuICAgIFwibHZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGF0dmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImxhdHZpZcWhdSB2YWxvZGFcIlxuICAgIH0sXG4gICAgXCJndlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYW54XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiR2FlbGcsIEdhaWxja1wiXG4gICAgfSxcbiAgICBcIm1rXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hY2Vkb25pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQvNCw0LrQtdC00L7QvdGB0LrQuCDRmNCw0LfQuNC6XCJcbiAgICB9LFxuICAgIFwibWdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFsYWdhc3lcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJNYWxhZ2FzeSBmaXRlbnlcIlxuICAgIH0sXG4gICAgXCJtc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYWxheVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJhaGFzYSBNZWxheXUsINio2YfYp9izINmF2YTYp9mK2YjigI5cIlxuICAgIH0sXG4gICAgXCJtbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYWxheWFsYW1cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgtK7gtLLgtK/gtL7gtLPgtIJcIlxuICAgIH0sXG4gICAgXCJtdFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYWx0ZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTWFsdGlcIlxuICAgIH0sXG4gICAgXCJtaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNxIFvcmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJ0ZSByZW8gTcSBb3JpXCJcbiAgICB9LFxuICAgIFwibXJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFyYXRoaSAoTWFyxIHhua1oxKspXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KSu4KSw4KS+4KSg4KWAXCJcbiAgICB9LFxuICAgIFwibWhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFyc2hhbGxlc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLYWppbiBNzKdhamXEvFwiXG4gICAgfSxcbiAgICBcIm1uXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1vbmdvbGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC80L7QvdCz0L7Qu1wiXG4gICAgfSxcbiAgICBcIm5hXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5hdXJ1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRWtha2FpcsWpIE5hb2Vyb1wiXG4gICAgfSxcbiAgICBcIm52XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5hdmFqbywgTmF2YWhvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRGluw6kgYml6YWFkLCBEaW7DqWvKvGVox7DDrVwiXG4gICAgfSxcbiAgICBcIm5iXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcndlZ2lhbiBCb2ttw6VsXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTm9yc2sgYm9rbcOlbFwiXG4gICAgfSxcbiAgICBcIm5kXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcnRoIE5kZWJlbGVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJpc2lOZGViZWxlXCJcbiAgICB9LFxuICAgIFwibmVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTmVwYWxpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KSo4KWH4KSq4KS+4KSy4KWAXCJcbiAgICB9LFxuICAgIFwibmdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTmRvbmdhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT3dhbWJvXCJcbiAgICB9LFxuICAgIFwibm5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9yd2VnaWFuIE55bm9yc2tcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOb3JzayBueW5vcnNrXCJcbiAgICB9LFxuICAgIFwibm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9yd2VnaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTm9yc2tcIlxuICAgIH0sXG4gICAgXCJpaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOdW9zdVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuqGiOqMoOqSvyBOdW9zdWh4b3BcIlxuICAgIH0sXG4gICAgXCJuclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTb3V0aCBOZGViZWxlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiaXNpTmRlYmVsZVwiXG4gICAgfSxcbiAgICBcIm9jXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9jY2l0YW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPY2NpdGFuXCJcbiAgICB9LFxuICAgIFwib2pcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT2ppYndlLCBPamlid2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhkIrhk4LhlJHhk4jhkK/hkqfhkI7hk5BcIlxuICAgIH0sXG4gICAgXCJjdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPbGQgQ2h1cmNoIFNsYXZvbmljLCBDaHVyY2ggU2xhdmljLCBDaHVyY2ggU2xhdm9uaWMsIE9sZCBCdWxnYXJpYW4sIE9sZCBTbGF2b25pY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGp0LfRi9C60Yog0YHQu9C+0LLRo9C90YzRgdC60YpcIlxuICAgIH0sXG4gICAgXCJvbVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPcm9tb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFmYWFuIE9yb21vb1wiXG4gICAgfSxcbiAgICBcIm9yXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9yaXlhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KyT4Kyh4Ky84Ky/4KyGXCJcbiAgICB9LFxuICAgIFwib3NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT3NzZXRpYW4sIE9zc2V0aWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQuNGA0L7QvSDDptCy0LfQsNCzXCJcbiAgICB9LFxuICAgIFwicGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUGFuamFiaSwgUHVuamFiaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCoquCpsOConOCovuCorOCpgCwg2b7Zhtis2KfYqNuM4oCOXCJcbiAgICB9LFxuICAgIFwicGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUMSBbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpKrgpL7gpLTgpL9cIlxuICAgIH0sXG4gICAgXCJmYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQZXJzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi2YHYp9ix2LPbjFwiXG4gICAgfSxcbiAgICBcInBsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBvbGlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInBvbHNraVwiXG4gICAgfSxcbiAgICBcInBzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBhc2h0bywgUHVzaHRvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi2b7amtiq2YhcIlxuICAgIH0sXG4gICAgXCJwdFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQb3J0dWd1ZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiUG9ydHVndcOqc1wiXG4gICAgfSxcbiAgICBcInF1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlF1ZWNodWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJSdW5hIFNpbWksIEtpY2h3YVwiXG4gICAgfSxcbiAgICBcInJtXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlJvbWFuc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJydW1hbnRzY2ggZ3Jpc2NodW5cIlxuICAgIH0sXG4gICAgXCJyblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLaXJ1bmRpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwia2lSdW5kaVwiXG4gICAgfSxcbiAgICBcInJvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlJvbWFuaWFuLCBNb2xkYXZpYW4sIE1vbGRvdmFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwicm9tw6JuxINcIlxuICAgIH0sXG4gICAgXCJydVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJSdXNzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0YDRg9GB0YHQutC40Lkg0Y/Qt9GL0LpcIlxuICAgIH0sXG4gICAgXCJzYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTYW5za3JpdCAoU2HhuYFza+G5m3RhKVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkuOCkguCkuOCljeCkleClg+CkpOCkruCljVwiXG4gICAgfSxcbiAgICBcInNjXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNhcmRpbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInNhcmR1XCJcbiAgICB9LFxuICAgIFwic2RcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2luZGhpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KS44KS/4KSo4KWN4KSn4KWALCDYs9mG2ozZitiMINiz2YbYr9q+24zigI5cIlxuICAgIH0sXG4gICAgXCJzZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J0aGVybiBTYW1pXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRGF2dmlzw6FtZWdpZWxsYVwiXG4gICAgfSxcbiAgICBcInNtXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNhbW9hblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImdhZ2FuYSBmYWEgU2Ftb2FcIlxuICAgIH0sXG4gICAgXCJzZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTYW5nb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInnDom5nw6IgdMOuIHPDpG5nw7ZcIlxuICAgIH0sXG4gICAgXCJzclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTZXJiaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0YHRgNC/0YHQutC4INGY0LXQt9C40LpcIlxuICAgIH0sXG4gICAgXCJnZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTY290dGlzaCBHYWVsaWM7IEdhZWxpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkfDoGlkaGxpZ1wiXG4gICAgfSxcbiAgICBcInNuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNob25hXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiY2hpU2hvbmFcIlxuICAgIH0sXG4gICAgXCJzaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTaW5oYWxhLCBTaW5oYWxlc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgt4Pgt5LgtoLgt4Tgtr1cIlxuICAgIH0sXG4gICAgXCJza1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTbG92YWtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzbG92ZW7EjWluYVwiXG4gICAgfSxcbiAgICBcInNsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNsb3ZlbmVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzbG92ZW7FocSNaW5hXCJcbiAgICB9LFxuICAgIFwic29cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU29tYWxpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU29vbWFhbGlnYSwgYWYgU29vbWFhbGlcIlxuICAgIH0sXG4gICAgXCJzdFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTb3V0aGVybiBTb3Rob1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNlc290aG9cIlxuICAgIH0sXG4gICAgXCJlc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTcGFuaXNoOyBDYXN0aWxpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJlc3Bhw7FvbCwgY2FzdGVsbGFub1wiXG4gICAgfSxcbiAgICBcInN1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlN1bmRhbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkJhc2EgU3VuZGFcIlxuICAgIH0sXG4gICAgXCJzd1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTd2FoaWxpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2lzd2FoaWxpXCJcbiAgICB9LFxuICAgIFwic3NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3dhdGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTaVN3YXRpXCJcbiAgICB9LFxuICAgIFwic3ZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3dlZGlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInN2ZW5za2FcIlxuICAgIH0sXG4gICAgXCJ0YVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUYW1pbFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCupOCuruCuv+CutOCvjVwiXG4gICAgfSxcbiAgICBcInRlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRlbHVndVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCwpOCxhuCwsuCxgeCwl+CxgVwiXG4gICAgfSxcbiAgICBcInRnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRhamlrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0YLQvtK30LjQutOjLCB0b8SfaWvEqywg2KrYp9is24zaqduM4oCOXCJcbiAgICB9LFxuICAgIFwidGhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGhhaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC5hOC4l+C4olwiXG4gICAgfSxcbiAgICBcInRpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRpZ3JpbnlhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Ym14YyN4Yit4YqbXCJcbiAgICB9LFxuICAgIFwiYm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGliZXRhbiBTdGFuZGFyZCwgVGliZXRhbiwgQ2VudHJhbFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC9luC9vOC9keC8i+C9oeC9suC9glwiXG4gICAgfSxcbiAgICBcInRrXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlR1cmttZW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUw7xya21lbiwg0KLSr9GA0LrQvNC10L1cIlxuICAgIH0sXG4gICAgXCJ0bFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUYWdhbG9nXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiV2lrYW5nIFRhZ2Fsb2csIOGcj+GckuGcg+GcheGclCDhnIbhnIThnI7hnJPhnIThnJRcIlxuICAgIH0sXG4gICAgXCJ0blwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUc3dhbmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTZXRzd2FuYVwiXG4gICAgfSxcbiAgICBcInRvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRvbmdhIChUb25nYSBJc2xhbmRzKVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImZha2EgVG9uZ2FcIlxuICAgIH0sXG4gICAgXCJ0clwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUdXJraXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVMO8cmvDp2VcIlxuICAgIH0sXG4gICAgXCJ0c1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUc29uZ2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJYaXRzb25nYVwiXG4gICAgfSxcbiAgICBcInR0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRhdGFyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0YLQsNGC0LDRgNGH0LAsIHRhdGFyw6dhLCDYqtin2KrYp9ix2obYp+KAjlwiXG4gICAgfSxcbiAgICBcInR3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlR3aVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlR3aVwiXG4gICAgfSxcbiAgICBcInR5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRhaGl0aWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiUmVvIFRhaGl0aVwiXG4gICAgfSxcbiAgICBcInVnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlVpZ2h1ciwgVXlnaHVyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVXnGo3VyccmZLCDYptuH2YrYutuH2LHahtuV4oCOXCJcbiAgICB9LFxuICAgIFwidWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVWtyYWluaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0YPQutGA0LDRl9C90YHRjNC60LBcIlxuICAgIH0sXG4gICAgXCJ1clwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJVcmR1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi2KfYsdiv2YhcIlxuICAgIH0sXG4gICAgXCJ1elwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJVemJla1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInpiZWssINCO0LfQsdC10LosINij24fYstio25DZg+KAjlwiXG4gICAgfSxcbiAgICBcInZlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlZlbmRhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVHNoaXZlbuG4k2FcIlxuICAgIH0sXG4gICAgXCJ2aVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJWaWV0bmFtZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVGnhur9uZyBWaeG7h3RcIlxuICAgIH0sXG4gICAgXCJ2b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJWb2xhcMO8a1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlZvbGFww7xrXCJcbiAgICB9LFxuICAgIFwid2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiV2FsbG9vblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIldhbG9uXCJcbiAgICB9LFxuICAgIFwiY3lcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiV2Vsc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJDeW1yYWVnXCJcbiAgICB9LFxuICAgIFwid29cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiV29sb2ZcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJXb2xsb2ZcIlxuICAgIH0sXG4gICAgXCJmeVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXZXN0ZXJuIEZyaXNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJGcnlza1wiXG4gICAgfSxcbiAgICBcInhoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlhob3NhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiaXNpWGhvc2FcIlxuICAgIH0sXG4gICAgXCJ5aVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJZaWRkaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi15nXmda015PXmdepXCJcbiAgICB9LFxuICAgIFwieW9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiWW9ydWJhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiWW9yw7liw6FcIlxuICAgIH0sXG4gICAgXCJ6YVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJaaHVhbmcsIENodWFuZ1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNhya8gY3VlxYvGhSwgU2F3IGN1ZW5naFwiXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9kYXRhL2xhbmd1YWdlcy5qcyIsIlxuZXhwb3J0IGNvbnN0IGZpbHRlclR5cGVzPSB7XG4gICAgQUREX1JJR0hUOidBRERfUklHSFQnLFxuICAgIFJFTU9WRV9SSUdIVCA6ICdSRU1PVkVfUklHSFQnLFxuICAgIFVQREFURV9DT1VOVFJJRVMgOiAnVVBEQVRFX0NPVU5UUklFUycsXG4gICAgVVBEQVRFX0VYQ0xVU0lWRSA6ICdVUERBVEVfRVhDTFVTSVZFJyxcbiAgICBVUERBVEVfSU5DTFVERURfQ09VTlRSSUVTIDogJ1VQREFURV9JTkNMVURFRF9DT1VOVFJJRVMnLFxuICAgIFVQREFURV9TUE9SVCA6ICdVUERBVEVfU1BPUlQnLFxuICAgIFVQREFURV9FVkVOVCA6ICdVUERBVEVfRVZFTlQnLFxuICAgIENMRUFSIDogJ0NMRUFSJyxcbiAgICBDTEVBUl9VUERBVEUgOiAnQ0xFQVJfVVBEQVRFJyxcbiAgICBVUERBVEVfTUFOWSA6ICdVUERBVEVfTUFOWScsXG4gICAgVVBEQVRFX0ZJTFRFUlNfQ09ORklHOiBcIlVQREFURV9BTExcIlxufTtcblxuY29uc3QgZGVmYXVsdEZpbHRlciA9IHtcbiAgICByaWdodHM6IFtdLFxuICAgIGNvdW50cmllczogW10sXG4gICAgZXhjbHVzaXZlIDogZmFsc2UsXG4gICAgaW5jbHVkZUFsbENvdW50cmllcyA6IGZhbHNlLFxuICAgIHNwb3J0OiB7XG4gICAgICAgIHZhbHVlIDogbnVsbCxcbiAgICAgICAgbGFiZWwgOiBcIkFsbCBzcG9ydHNcIlxuICAgIH0sXG4gICAgZXZlbnQgOiBcIlwiLFxuICAgIGZvcmNlVXBkYXRlIDogdHJ1ZSxcbiAgICBzeW5jV2l0aExvY2FsU3RvcmFnZTogZmFsc2Vcbn07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSAoc3RhdGUgPSBkZWZhdWx0RmlsdGVyLCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfSU5DTFVERURfQ09VTlRSSUVTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUFsbENvdW50cmllczogYWN0aW9uLmluY2x1ZGVBbGxDb3VudHJpZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLkNMRUFSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkZWZhdWx0RmlsdGVyKTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5DTEVBUl9VUERBVEU6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBmb3JjZVVwZGF0ZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLkFERF9SSUdIVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHJpZ2h0czogWy4uLnN0YXRlLnJpZ2h0cywgYWN0aW9uLmlkXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuUkVNT1ZFX1JJR0hUOlxuXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBzdGF0ZS5yaWdodHMuaW5kZXhPZihhY3Rpb24uaWQpO1xuICAgICAgICAgICAgc3RhdGUucmlnaHRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICByaWdodHM6IFsuLi5zdGF0ZS5yaWdodHNdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfQ09VTlRSSUVTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgY291bnRyaWVzOiBhY3Rpb24uY291bnRyaWVzLm1hcChjPT5jLnZhbHVlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0VYQ0xVU0lWRTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGV4Y2x1c2l2ZTogYWN0aW9uLmV4Y2x1c2l2ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX1NQT1JUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3BvcnQ6IGFjdGlvbi5zcG9ydFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0ZJTFRFUlNfQ09ORklHOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uZmlsdGVycyk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0VWRU5UOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IGFjdGlvbi5ldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX01BTlk6XG4gICAgICAgICAgICBhY3Rpb24uZmlsdGVycy5mb3JjZVVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoYWN0aW9uLmZpbHRlcnMucmlnaHRzKSBhY3Rpb24uZmlsdGVycy5yaWdodHMgPSBhY3Rpb24uZmlsdGVycy5yaWdodHMubWFwKHI9Pk51bWJlcihyKSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdEZpbHRlciwgYWN0aW9uLmZpbHRlcnMpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2ZpbHRlci5qcyIsIlxuZXhwb3J0IGNvbnN0IG1hcmtldHBsYWNlVHlwZXM9IHtcbiAgICBURVNUOidURVNUJyxcbn07XG5cbmV4cG9ydCBjb25zdCBtYXJrZXRwbGFjZSA9IChzdGF0ZSA9IHtcbiAgICB0ZXN0SXRlbTogXCJtYXJrZXRwbGFjZVJlZHVjZXJcIlxuXG59LCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtYXJrZXRwbGFjZVR5cGVzLlRFU1Q6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICB0ZXN0OiBhY3Rpb24udGV4dCxcbiAgICAgICAgICAgICAgICBpZCA6IGFjdGlvbi5pZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2UuanMiLCIvKipcbiogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiovXG5cbmxldCBfX2FwaVN0b3JlID0ge1xuICAgIHRvdXJuYW1lbnRzIDoge31cbn07XG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuQ29udGVudEFyZW5hLkNvbnRlbnRBcGkgPSBDb250ZW50QXJlbmEuQ29udGVudEFwaXx8IHt9O1xuXG5Db250ZW50QXJlbmEuQ29udGVudEFwaT0ge1xuICAgIHNhdmVDb250ZW50QXNEcmFmdCAoIGNvbnRlbnQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvZHJhZnQvc2F2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzYXZlQ29udGVudEFzSW5hY3RpdmUgKCBjb250ZW50ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZy9zYXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNhdmVDb250ZW50QXNBY3RpdmUgKCBjb250ZW50ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZy9wdWJsaXNoXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlcHVibGlzaExpc3RpbmcgKCBjdXN0b21JZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmcvcmVwdWJsaXNoXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtjdXN0b21JZDogY3VzdG9tSWR9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzZW5kTWVzc2FnZSAoIG1lc3NhZ2UgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9tZXNzYWdlcy9zZW5kXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFVzZXJJbmZvICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL2luZm9cIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFVzZXJJbmZvQnlBY3RpdmF0aW9uQ29kZSAoIGFjdGl2YXRpb25Db2RlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9jb2RlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIGRhdGEgOiBKU09OLnN0cmluZ2lmeSh7YWN0aXZhdGlvbkNvZGU6IGFjdGl2YXRpb25Db2RlfSksXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q29tcGFueVVzZXJzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9jb21wYW55L3VzZXJzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB1cGRhdGVDb21wYW55ICggY29tcGFueSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2NvbXBhbnkvdXBkYXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtjb21wYW55OmNvbXBhbnl9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB1cGRhdGVQYXNzd29yZCAoIGRhdGEgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL3Bhc3N3b3JkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHVwZGF0ZVVzZXIgKCB1c2VyICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci91cGRhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXI6dXNlcn0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGFjdGl2YXRlVXNlciAoIHVzZXIsIHBhc3N3b3JkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9hY3RpdmF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcjp1c2VyLGlkOiB1c2VyLmlkLCBwYXNzd29yZCA6IHBhc3N3b3JkfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVVc2VyUHJvZmlsZSAoIHByb2ZpbGUgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL3Byb2ZpbGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3Byb2ZpbGU6cHJvZmlsZX0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRocmVhZCAoIGN1c3RvbUlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvdGhyZWFkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtjdXN0b21JZDogY3VzdG9tSWR9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRUaHJlYWRzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvdGhyZWFkc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcGxhY2VCaWQgKCBiaWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcGxhY2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBhY2NlcHRCaWQgKCBiaWQsIHNpZ25hdHVyZSwgc2lnbmF0dXJlTmFtZSwgc2lnbmF0dXJlUG9zaXRpb24gKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGJpZC5zaWduYXR1cmUgPSBzaWduYXR1cmU7XG4gICAgICAgIGJpZC5zaWduYXR1cmVOYW1lID0gc2lnbmF0dXJlTmFtZTtcbiAgICAgICAgYmlkLnNpZ25hdHVyZVBvc2l0aW9uID0gc2lnbmF0dXJlUG9zaXRpb247XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9hY2NlcHRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZWplY3RCaWQgKCBiaWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcmVqZWN0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVtb3ZlQmlkICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3JlbW92ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgc2F2ZVRtcEZpbGUgKCBmaWxlcyApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBkYXRhLmFwcGVuZCgnZmlsZScsIGZpbGVzWzBdKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L3NhdmUvZmlsZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNhdmVBdHRhY2htZW50RmlsZSAoIGZpbGVzICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlJywgZmlsZXNbMF0pO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvc2F2ZS9hdHRhY2htZW50XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZBSUxFRFwiKVxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRCeUN1c3RvbUlkICggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImxpc3RpbmcvZGV0YWlsc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBnZXREcmFmdExpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kcmFmdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0SW5hY3RpdmVMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvaW5hY3RpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFjdGl2ZUxpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9hY3RpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEV4cGlyZWRMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZXhwaXJlZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVtb3ZlTGlzdGluZyggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9yZW1vdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGR1cGxpY2F0ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZHVwbGljYXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBkZWFjdGl2YXRlTGlzdGluZyggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kZWFjdGl2YXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBhcmNoaXZlTGlzdGluZyggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9hcmNoaXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIGdldENsb3NlZERlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL2Nsb3NlZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFsbERlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL2FsbFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFBlbmRpbmdEZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9wZW5kaW5nXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmVqZWN0ZWREZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZWplY3RlZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFdhdGNobGlzdExpc3RpbmdzICgpe1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3Mvd2F0Y2hsaXN0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbi8qKlxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiAqL1xuXG5sZXQgX19hcGlTdG9yZSA9IHtcbiAgICB0b3VybmFtZW50cyA6IHt9XG59O1xuXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcblxuQ29udGVudEFyZW5hLkFwaT0ge1xuICAgIHNvcnRCeUxhYmVsIChhLCBiKSB7XG4gICAgICAgIHJldHVybiAoYS5uYW1lID4gYi5uYW1lKSA/IDEgOiAoKGIubmFtZSA+IGEubmFtZSkgPyAtMSA6IDApXG4gICAgfSxcbiAgICBzb3J0QnlTcG9ydCAoYSwgYikge1xuXG4gICAgICAgIGlmIChhLnNwb3J0Lm5hbWUgPiBiLnNwb3J0Lm5hbWUpIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lIDwgYi5zcG9ydC5uYW1lKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnNwb3J0Q2F0ZWdvcnkubmFtZSA+IGIuc3BvcnRDYXRlZ29yeS5uYW1lKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEuc3BvcnRDYXRlZ29yeS5uYW1lIDwgYi5zcG9ydENhdGVnb3J5Lm5hbWUpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEubmFtZSA+IGIubmFtZSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLm5hbWUgPCBiLm5hbWUpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIDA7XG5cbiAgICB9LFxuICAgIHByZXBhcmVMaXN0ICggbGlzdCwgY2F0ZWdvcnlJZCApIHtcblxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGxpc3QgPSAkLm1hcChsaXN0LCBmdW5jdGlvbiAoaXRlbSkge1xuXG4gICAgICAgICAgICAvLyBGaWx0ZXIgYnkgY2F0ZWdvcnlcbiAgICAgICAgICAgIGlmICggY2F0ZWdvcnlJZCAmJiBpdGVtLmNhdGVnb3J5WydAYXR0cmlidXRlcyddLmlkICE9IGNhdGVnb3J5SWQpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4ge25hbWU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10ubmFtZSwgZXh0ZXJuYWxJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGlzdC5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcblxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9LFxuICAgIGZpbHRlckRvdWJsZXMgKCBsaXN0LCBzcG9ydElkICl7XG4gICAgICAgIGxldCBuYW1lcyA9IFtdO1xuXG4gICAgICAgIGlmICggc3BvcnRJZCA9PT0gXCJzcjpzcG9ydDo1XCIgKXtcbiAgICAgICAgICAgIGxpc3QgPSBsaXN0Lm1hcChpdGVtPT57XG4gICAgICAgICAgICAgICAgaXRlbS5uYW1lID0gaXRlbS5uYW1lLnJlcGxhY2UoLyBzaW5nbGVzL2dpLCcnKS5yZXBsYWNlKC8gZG91YmxlL2dpLCcnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH0pLmZpbHRlcihpdGVtPT57XG4gICAgICAgICAgICAgICAgaWYgKG5hbWVzLmluZGV4T2YoaXRlbS5uYW1lKSA9PT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKGl0ZW0ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9LFxuICAgIGdldENvbnRlbnQgKCBmaWx0ZXIpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L3NlYXJjaFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEpzb25Db250ZW50ICggZmlsdGVyKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImxpc3RpbmdzL21hcmtldHBsYWNlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiBmaWx0ZXIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2F2ZUZpbHRlciAoIGZpbHRlcikge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJidXkvZmlsdGVyL3NhdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IGZpbHRlcixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDb3VudHJpZXMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAoIENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcyAmJiBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvY291bnRyaWVzL2FsbFwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlLm1hcChjPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBjLnJlZ2lvbnMgPSBjLnJlZ2lvbnMubWFwKHI9PnIuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5leHRlcm5hbElkID0gYy5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcyA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFjdGl2ZVNwb3J0cyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3Nwb3J0cy9hY3RpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q291bnRyaWVzRnVsbCAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL2NvdW50cmllcy9mdWxsXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRlcnJpdG9yaWVzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvdGVycml0b3JpZXNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmVnaW9ucyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3JlZ2lvbnNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmlnaHRzIChyaWdodHNQYWNrYWdlLCBncm91cCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9yaWdodHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmlnaHRzUGFja2FnZSAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvcmlnaHRzLXBhY2thZ2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0U3BvcnRzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3Nwb3J0c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7c3BvcnQ6b2JqZWN0fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3BvcnRzID0gX3RoaXMucHJlcGFyZUxpc3QoIHJlc3BvbnNlLnNwb3J0KTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNwb3J0cyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvbnRlbnREZXRhaWxzKCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9kZXRhaWxzL1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UGVuZGluZ0xpc3RpbmdzKCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9wZW5kaW5nLWxpc3RpbmdzL1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q2F0ZWdvcmllcyAoIHNwb3J0SWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgbGlzdCA9IFtdLFxuICAgICAgICAgICAgY2F0cyA9IFtdO1xuXG4gICAgICAgIF90aGlzLmdldFRvdXJuYW1lbnRzKHNwb3J0SWQpLmRvbmUoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoICEgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCBbXSApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdCA9ICQubWFwKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQgLCBmdW5jdGlvbiAoaXRlbSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaXRlbS5jYXRlZ29yeVsnQGF0dHJpYnV0ZXMnXS5pZDtcblxuICAgICAgICAgICAgICAgIGlmICggY2F0cy5pbmRleE9mKGlkKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhdHMucHVzaCggaWQgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QobGlzdCkgKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VG91cm5hbWVudHMgKCBzcG9ydElkLCBjYXRlZ29yeUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcywgc3RvcmVkUmVzcG9uc2U7XG5cbiAgICAgICAgaWYgKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdICE9PSB1bmRlZmluZWQgKXtcblxuICAgICAgICAgICAgc3RvcmVkUmVzcG9uc2UgPSBfdGhpcy5wcmVwYXJlTGlzdChfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQsIGNhdGVnb3J5SWQpXG4gICAgICAgICAgICBzdG9yZWRSZXNwb25zZSA9IF90aGlzLmZpbHRlckRvdWJsZXMoc3RvcmVkUmVzcG9uc2Usc3BvcnRJZCk7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHN0b3JlZFJlc3BvbnNlKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC90b3VybmFtZW50c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNwb3J0SWQgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBBIGNvbW1lbnRcbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnRvdXJuYW1lbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gPSByZXNwb25zZS50b3VybmFtZW50cztcblxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gX3RoaXMucHJlcGFyZUxpc3QocmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCwgY2F0ZWdvcnlJZCk7XG4gICAgICAgICAgICAgICAgbGlzdCA9IF90aGlzLmZpbHRlckRvdWJsZXMobGlzdCwgc3BvcnRJZCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRTZWFzb25zICggdG91cm5hbWVudElkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC9zZWFzb25zXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogdG91cm5hbWVudElkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpc3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnNlYXNvbnMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5zZWFzb25zLnNlYXNvbiA9PT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoW10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCAkLmlzQXJyYXkocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24pICl7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSAkLm1hcChyZXNwb25zZS5zZWFzb25zLnNlYXNvbiwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5lbmRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50SWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10udG91cm5hbWVudF9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiBpdGVtWydAYXR0cmlidXRlcyddLnllYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLmVuZF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5zdGFydF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10ueWVhcixcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFNjaGVkdWxlICggc2Vhc29uSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3NjaGVkdWxlc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNlYXNvbklkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3BvcnRfZXZlbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50ID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICByZXNwb25zZS5zcG9ydF9ldmVudHMuc3BvcnRfZXZlbnQuZm9yRWFjaCggKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcm91bmQgID0gKGl0ZW0udG91cm5hbWVudF9yb3VuZCkgPyBpdGVtLnRvdXJuYW1lbnRfcm91bmRbJ0BhdHRyaWJ1dGVzJ10gOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcm91bmQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IChyb3VuZC5udW1iZXIpID8gXCJyb3VuZF9cIiArIHJvdW5kLm51bWJlciA6IHJvdW5kLm5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXSApIGxpc3RbbmFtZV0gPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoICFsaXN0W25hbWVdLm1hdGNoZXMgKSBsaXN0W25hbWVdLm1hdGNoZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlzdFtuYW1lXS5tYXRjaGVzLnNldChpdGVtWydAYXR0cmlidXRlcyddLmlkLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zY2hlZHVsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBpdGVtWydAYXR0cmlidXRlcyddLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRSb3VuZCA6IHJvdW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGV0aXRvcnMgOiAoaXRlbS5jb21wZXRpdG9ycykgPyBpdGVtLmNvbXBldGl0b3JzLmNvbXBldGl0b3IubWFwKCggY29tcGV0aXRvcik9PnsgcmV0dXJuIGNvbXBldGl0b3JbJ0BhdHRyaWJ1dGVzJ10gIH0pICA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2VhcmNoQ29tcGV0aXRpb24ocmVxdWVzdCkge1xuXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyAnYXBpL3NlYXJjaC90b3VybmFtZW50JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogcmVxdWVzdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYWRpdGlvbmFsOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZGF0YS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0uc3BvcnQpLnNvcnQoX3RoaXMuc29ydEJ5U3BvcnQpO1xuXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB3YXRjaGxpc3QoIGlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvd2F0Y2hsaXN0L2FkZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Tm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtlbnZob3N0dXJsfWFwaS9ub3RpZmljYXRpb25zL2ApO1xuICAgIH0sXG4gICAgbWFya05vdGlmaWNhdGlvbkFzU2VlbihpZCkge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgJHtlbnZob3N0dXJsfWFwaS9ub3RpZmljYXRpb25zL3NlZW5gLCB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9KTtcbiAgICB9LFxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5cbkNvbnRlbnRBcmVuYS5EYXRhID0gQ29udGVudEFyZW5hLkRhdGEgfHwge307XG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzID0gQ29udGVudEFyZW5hLkxhbmd1YWdlcyB8fCB7fTtcblxuQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzID0gW1xuICAgIHsgbmFtZSA6IFwiU29jY2VyXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MVwifSxcbiAgICB7IG5hbWUgOiBcIkJhc2tldGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyXCJ9LFxuICAgIHsgbmFtZSA6IFwiQmFzZWJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDozXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6NVwifSxcbiAgICB7IG5hbWUgOiBcIkNyaWNrZXRcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMVwifSxcbiAgICB7IG5hbWUgOiBcIkZpZWxkIEhvY2tleVwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjI0XCJ9LFxuICAgIHsgbmFtZSA6IFwiVm9sbGV5YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIzXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGFibGUgVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjBcIn0sXG4gICAgeyBuYW1lIDogXCJHb2xmXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6OVwifSxcbiAgICB7IG5hbWUgOiBcIkFtZXJpY2FuIEZvb3RiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MTZcIn0sXG4gICAgeyBuYW1lIDogXCJIYW5kYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjZcIn1cbl07XG5cbkNvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBbXTtcbkNvbnRlbnRBcmVuYS5EYXRhLkFjdGl2ZVNwb3J0cyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gW107XG5Db250ZW50QXJlbmEuRGF0YS5UZXJyaXRvcmllcyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuUmVnaW9ucyA9IFtdO1xuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5TaG9ydCA9IHtcbiAgICBcIm1kclwiOiBcIk1hbmRhcmluXCIsXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxuICAgIFwiYm5cIjogXCJCZW5nYWxpXCIsXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcbiAgICBcImphXCI6IFwiSmFwYW5lc2VcIixcbiAgICBcImp2XCI6IFwiSmF2YW5lc2VcIixcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXG4gICAgXCJhbGxcIiA6IFwiU2hvdyBBbGxcIlxufTtcblxuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5Mb25nID0ge1xuICAgIFwiYWFcIjogXCJBZmFyXCIsXG4gICAgXCJhZlwiOiBcIkFmcmlrYWFuc1wiLFxuICAgIFwiYWluXCI6IFwiQWludVwiLFxuICAgIFwiYWt6XCI6IFwiQWxhYmFtYVwiLFxuICAgIFwic3FcIjogXCJBbGJhbmlhblwiLFxuICAgIFwiYWxlXCI6IFwiQWxldXRcIixcbiAgICBcImFycVwiOiBcIkFsZ2VyaWFuIEFyYWJpY1wiLFxuICAgIFwiZW5fVVNcIjogXCJBbWVyaWNhbiBFbmdsaXNoXCIsXG4gICAgXCJhc2VcIjogXCJBbWVyaWNhbiBTaWduIExhbmd1YWdlXCIsXG4gICAgXCJhbVwiOiBcIkFtaGFyaWNcIixcbiAgICBcImVneVwiOiBcIkFuY2llbnQgRWd5cHRpYW5cIixcbiAgICBcImdyY1wiOiBcIkFuY2llbnQgR3JlZWtcIixcbiAgICBcImFyXCI6IFwiQXJhYmljXCIsXG4gICAgXCJhcmNcIjogXCJBcmFtYWljXCIsXG4gICAgXCJhcnBcIjogXCJBcmFwYWhvXCIsXG4gICAgXCJhcndcIjogXCJBcmF3YWtcIixcbiAgICBcImh5XCI6IFwiQXJtZW5pYW5cIixcbiAgICBcImFzXCI6IFwiQXNzYW1lc2VcIixcbiAgICBcImFzYVwiOiBcIkFzdVwiLFxuICAgIFwiZW5fQVVcIjogXCJBdXN0cmFsaWFuIEVuZ2xpc2hcIixcbiAgICBcImRlX0FUXCI6IFwiQXVzdHJpYW4gR2VybWFuXCIsXG4gICAgXCJheVwiOiBcIkF5bWFyYVwiLFxuICAgIFwiYXpcIjogXCJBemVyYmFpamFuaVwiLFxuICAgIFwiYmFuXCI6IFwiQmFsaW5lc2VcIixcbiAgICBcImV1XCI6IFwiQmFzcXVlXCIsXG4gICAgXCJiYXJcIjogXCJCYXZhcmlhblwiLFxuICAgIFwiYmVcIjogXCJCZWxhcnVzaWFuXCIsXG4gICAgXCJiblwiOiBcIkJlbmdhbGlcIixcbiAgICBcImJpa1wiOiBcIkJpa29sXCIsXG4gICAgXCJiaW5cIjogXCJCaW5pXCIsXG4gICAgXCJic1wiOiBcIkJvc25pYW5cIixcbiAgICBcImJyaFwiOiBcIkJyYWh1aVwiLFxuICAgIFwiYnJhXCI6IFwiQnJhalwiLFxuICAgIFwicHRfQlJcIjogXCJCcmF6aWxpYW4gUG9ydHVndWVzZVwiLFxuICAgIFwiYnJcIjogXCJCcmV0b25cIixcbiAgICBcImVuX0dCXCI6IFwiQnJpdGlzaCBFbmdsaXNoXCIsXG4gICAgXCJiZ1wiOiBcIkJ1bGdhcmlhblwiLFxuICAgIFwibXlcIjogXCJCdXJtZXNlXCIsXG4gICAgXCJmcmNcIjogXCJDYWp1biBGcmVuY2hcIixcbiAgICBcImVuX0NBXCI6IFwiQ2FuYWRpYW4gRW5nbGlzaFwiLFxuICAgIFwiZnJfQ0FcIjogXCJDYW5hZGlhbiBGcmVuY2hcIixcbiAgICBcInl1ZVwiOiBcIkNhbnRvbmVzZVwiLFxuICAgIFwiY2FyXCI6IFwiQ2FyaWJcIixcbiAgICBcImNhXCI6IFwiQ2F0YWxhblwiLFxuICAgIFwiY2F5XCI6IFwiQ2F5dWdhXCIsXG4gICAgXCJjZWJcIjogXCJDZWJ1YW5vXCIsXG4gICAgXCJzaHVcIjogXCJDaGFkaWFuIEFyYWJpY1wiLFxuICAgIFwiY2VcIjogXCJDaGVjaGVuXCIsXG4gICAgXCJjaHJcIjogXCJDaGVyb2tlZVwiLFxuICAgIFwicXVnXCI6IFwiQ2hpbWJvcmF6byBIaWdobGFuZCBRdWljaHVhXCIsXG4gICAgXCJ6aFwiOiBcIkNoaW5lc2VcIixcbiAgICBcImNoblwiOiBcIkNoaW5vb2sgSmFyZ29uXCIsXG4gICAgXCJjaHBcIjogXCJDaGlwZXd5YW5cIixcbiAgICBcImNob1wiOiBcIkNob2N0YXdcIixcbiAgICBcImN1XCI6IFwiQ2h1cmNoIFNsYXZpY1wiLFxuICAgIFwiY3ZcIjogXCJDaHV2YXNoXCIsXG4gICAgXCJud2NcIjogXCJDbGFzc2ljYWwgTmV3YXJpXCIsXG4gICAgXCJzeWNcIjogXCJDbGFzc2ljYWwgU3lyaWFjXCIsXG4gICAgXCJzd2NcIjogXCJDb25nbyBTd2FoaWxpXCIsXG4gICAgXCJjb3BcIjogXCJDb3B0aWNcIixcbiAgICBcImt3XCI6IFwiQ29ybmlzaFwiLFxuICAgIFwiY29cIjogXCJDb3JzaWNhblwiLFxuICAgIFwiY3JcIjogXCJDcmVlXCIsXG4gICAgXCJtdXNcIjogXCJDcmVla1wiLFxuICAgIFwiY3JoXCI6IFwiQ3JpbWVhbiBUdXJraXNoXCIsXG4gICAgXCJoclwiOiBcIkNyb2F0aWFuXCIsXG4gICAgXCJjc1wiOiBcIkN6ZWNoXCIsXG4gICAgXCJkYWtcIjogXCJEYWtvdGFcIixcbiAgICBcImRhXCI6IFwiRGFuaXNoXCIsXG4gICAgXCJkZWxcIjogXCJEZWxhd2FyZVwiLFxuICAgIFwibmxcIjogXCJEdXRjaFwiLFxuICAgIFwiZnJzXCI6IFwiRWFzdGVybiBGcmlzaWFuXCIsXG4gICAgXCJhcnpcIjogXCJFZ3lwdGlhbiBBcmFiaWNcIixcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxuICAgIFwiZW9cIjogXCJFc3BlcmFudG9cIixcbiAgICBcImV0XCI6IFwiRXN0b25pYW5cIixcbiAgICBcInB0X1BUXCI6IFwiRXVyb3BlYW4gUG9ydHVndWVzZVwiLFxuICAgIFwiZXNfRVNcIjogXCJFdXJvcGVhbiBTcGFuaXNoXCIsXG4gICAgXCJlZVwiOiBcIkV3ZVwiLFxuICAgIFwiZmFuXCI6IFwiRmFuZ1wiLFxuICAgIFwiaGlmXCI6IFwiRmlqaSBIaW5kaVwiLFxuICAgIFwiZmpcIjogXCJGaWppYW5cIixcbiAgICBcImZpbFwiOiBcIkZpbGlwaW5vXCIsXG4gICAgXCJmaVwiOiBcIkZpbm5pc2hcIixcbiAgICBcIm5sX0JFXCI6IFwiRmxlbWlzaFwiLFxuICAgIFwiZm9uXCI6IFwiRm9uXCIsXG4gICAgXCJmclwiOiBcIkZyZW5jaFwiLFxuICAgIFwiZ2FhXCI6IFwiR2FcIixcbiAgICBcImdhblwiOiBcIkdhbiBDaGluZXNlXCIsXG4gICAgXCJrYVwiOiBcIkdlb3JnaWFuXCIsXG4gICAgXCJkZVwiOiBcIkdlcm1hblwiLFxuICAgIFwiZ290XCI6IFwiR290aGljXCIsXG4gICAgXCJncmJcIjogXCJHcmVib1wiLFxuICAgIFwiZWxcIjogXCJHcmVla1wiLFxuICAgIFwiZ25cIjogXCJHdWFyYW5pXCIsXG4gICAgXCJndVwiOiBcIkd1amFyYXRpXCIsXG4gICAgXCJndXpcIjogXCJHdXNpaVwiLFxuICAgIFwiaGFpXCI6IFwiSGFpZGFcIixcbiAgICBcImh0XCI6IFwiSGFpdGlhblwiLFxuICAgIFwiaGFrXCI6IFwiSGFra2EgQ2hpbmVzZVwiLFxuICAgIFwiaGFcIjogXCJIYXVzYVwiLFxuICAgIFwiaGF3XCI6IFwiSGF3YWlpYW5cIixcbiAgICBcImhlXCI6IFwiSGVicmV3XCIsXG4gICAgXCJoelwiOiBcIkhlcmVyb1wiLFxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxuICAgIFwiaGl0XCI6IFwiSGl0dGl0ZVwiLFxuICAgIFwiaG1uXCI6IFwiSG1vbmdcIixcbiAgICBcImh1XCI6IFwiSHVuZ2FyaWFuXCIsXG4gICAgXCJpc1wiOiBcIkljZWxhbmRpY1wiLFxuICAgIFwiaW9cIjogXCJJZG9cIixcbiAgICBcImlnXCI6IFwiSWdib1wiLFxuICAgIFwiaXVcIjogXCJJbnVrdGl0dXRcIixcbiAgICBcImlrXCI6IFwiSW51cGlhcVwiLFxuICAgIFwiZ2FcIjogXCJJcmlzaFwiLFxuICAgIFwiaXRcIjogXCJJdGFsaWFuXCIsXG4gICAgXCJqYW1cIjogXCJKYW1haWNhbiBDcmVvbGUgRW5nbGlzaFwiLFxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxuICAgIFwianZcIjogXCJKYXZhbmVzZVwiLFxuICAgIFwia2FqXCI6IFwiSmp1XCIsXG4gICAgXCJkeW9cIjogXCJKb2xhLUZvbnlpXCIsXG4gICAgXCJ4YWxcIjogXCJLYWxteWtcIixcbiAgICBcImthbVwiOiBcIkthbWJhXCIsXG4gICAgXCJrYmxcIjogXCJLYW5lbWJ1XCIsXG4gICAgXCJrblwiOiBcIkthbm5hZGFcIixcbiAgICBcImtyXCI6IFwiS2FudXJpXCIsXG4gICAgXCJrYWFcIjogXCJLYXJhLUthbHBha1wiLFxuICAgIFwia3JjXCI6IFwiS2FyYWNoYXktQmFsa2FyXCIsXG4gICAgXCJrcmxcIjogXCJLYXJlbGlhblwiLFxuICAgIFwia3NcIjogXCJLYXNobWlyaVwiLFxuICAgIFwiY3NiXCI6IFwiS2FzaHViaWFuXCIsXG4gICAgXCJrYXdcIjogXCJLYXdpXCIsXG4gICAgXCJra1wiOiBcIkthemFraFwiLFxuICAgIFwia2VuXCI6IFwiS2VueWFuZ1wiLFxuICAgIFwia2hhXCI6IFwiS2hhc2lcIixcbiAgICBcImttXCI6IFwiS2htZXJcIixcbiAgICBcImtob1wiOiBcIktob3RhbmVzZVwiLFxuICAgIFwia2h3XCI6IFwiS2hvd2FyXCIsXG4gICAgXCJraVwiOiBcIktpa3V5dVwiLFxuICAgIFwia21iXCI6IFwiS2ltYnVuZHVcIixcbiAgICBcImtyalwiOiBcIktpbmFyYXktYVwiLFxuICAgIFwicndcIjogXCJLaW55YXJ3YW5kYVwiLFxuICAgIFwia2l1XCI6IFwiS2lybWFuamtpXCIsXG4gICAgXCJ0bGhcIjogXCJLbGluZ29uXCIsXG4gICAgXCJia21cIjogXCJLb21cIixcbiAgICBcImt2XCI6IFwiS29taVwiLFxuICAgIFwia29pXCI6IFwiS29taS1QZXJteWFrXCIsXG4gICAgXCJrZ1wiOiBcIktvbmdvXCIsXG4gICAgXCJrb2tcIjogXCJLb25rYW5pXCIsXG4gICAgXCJrb1wiOiBcIktvcmVhblwiLFxuICAgIFwia2ZvXCI6IFwiS29yb1wiLFxuICAgIFwia29zXCI6IFwiS29zcmFlYW5cIixcbiAgICBcImF2a1wiOiBcIktvdGF2YVwiLFxuICAgIFwia2hxXCI6IFwiS295cmEgQ2hpaW5pXCIsXG4gICAgXCJzZXNcIjogXCJLb3lyYWJvcm8gU2VubmlcIixcbiAgICBcImtwZVwiOiBcIktwZWxsZVwiLFxuICAgIFwia3JpXCI6IFwiS3Jpb1wiLFxuICAgIFwia2pcIjogXCJLdWFueWFtYVwiLFxuICAgIFwia3VtXCI6IFwiS3VteWtcIixcbiAgICBcImt1XCI6IFwiS3VyZGlzaFwiLFxuICAgIFwia3J1XCI6IFwiS3VydWtoXCIsXG4gICAgXCJrdXRcIjogXCJLdXRlbmFpXCIsXG4gICAgXCJubWdcIjogXCJLd2FzaW9cIixcbiAgICBcImt5XCI6IFwiS3lyZ3l6XCIsXG4gICAgXCJxdWNcIjogXCJLXFx1MDJiY2ljaGVcXHUwMmJjXCIsXG4gICAgXCJsYWRcIjogXCJMYWRpbm9cIixcbiAgICBcImxhaFwiOiBcIkxhaG5kYVwiLFxuICAgIFwibGt0XCI6IFwiTGFrb3RhXCIsXG4gICAgXCJsYW1cIjogXCJMYW1iYVwiLFxuICAgIFwibGFnXCI6IFwiTGFuZ2lcIixcbiAgICBcImxvXCI6IFwiTGFvXCIsXG4gICAgXCJsdGdcIjogXCJMYXRnYWxpYW5cIixcbiAgICBcImxhXCI6IFwiTGF0aW5cIixcbiAgICBcImVzXzQxOVwiOiBcIkxhdGluIEFtZXJpY2FuIFNwYW5pc2hcIixcbiAgICBcImx2XCI6IFwiTGF0dmlhblwiLFxuICAgIFwibHp6XCI6IFwiTGF6XCIsXG4gICAgXCJsZXpcIjogXCJMZXpnaGlhblwiLFxuICAgIFwibGlqXCI6IFwiTGlndXJpYW5cIixcbiAgICBcImxpXCI6IFwiTGltYnVyZ2lzaFwiLFxuICAgIFwibG5cIjogXCJMaW5nYWxhXCIsXG4gICAgXCJsZm5cIjogXCJMaW5ndWEgRnJhbmNhIE5vdmFcIixcbiAgICBcImx6aFwiOiBcIkxpdGVyYXJ5IENoaW5lc2VcIixcbiAgICBcImx0XCI6IFwiTGl0aHVhbmlhblwiLFxuICAgIFwibGl2XCI6IFwiTGl2b25pYW5cIixcbiAgICBcImpib1wiOiBcIkxvamJhblwiLFxuICAgIFwibG1vXCI6IFwiTG9tYmFyZFwiLFxuICAgIFwibmRzXCI6IFwiTG93IEdlcm1hblwiLFxuICAgIFwic2xpXCI6IFwiTG93ZXIgU2lsZXNpYW5cIixcbiAgICBcImRzYlwiOiBcIkxvd2VyIFNvcmJpYW5cIixcbiAgICBcImxvelwiOiBcIkxvemlcIixcbiAgICBcImx1XCI6IFwiTHViYS1LYXRhbmdhXCIsXG4gICAgXCJsdWFcIjogXCJMdWJhLUx1bHVhXCIsXG4gICAgXCJsdWlcIjogXCJMdWlzZW5vXCIsXG4gICAgXCJzbWpcIjogXCJMdWxlIFNhbWlcIixcbiAgICBcImx1blwiOiBcIkx1bmRhXCIsXG4gICAgXCJsdW9cIjogXCJMdW9cIixcbiAgICBcImxiXCI6IFwiTHV4ZW1ib3VyZ2lzaFwiLFxuICAgIFwibHV5XCI6IFwiTHV5aWFcIixcbiAgICBcIm1kZVwiOiBcIk1hYmFcIixcbiAgICBcIm1rXCI6IFwiTWFjZWRvbmlhblwiLFxuICAgIFwiam1jXCI6IFwiTWFjaGFtZVwiLFxuICAgIFwibWFkXCI6IFwiTWFkdXJlc2VcIixcbiAgICBcIm1hZlwiOiBcIk1hZmFcIixcbiAgICBcIm1hZ1wiOiBcIk1hZ2FoaVwiLFxuICAgIFwidm1mXCI6IFwiTWFpbi1GcmFuY29uaWFuXCIsXG4gICAgXCJtYWlcIjogXCJNYWl0aGlsaVwiLFxuICAgIFwibWFrXCI6IFwiTWFrYXNhclwiLFxuICAgIFwibWdoXCI6IFwiTWFraHV3YS1NZWV0dG9cIixcbiAgICBcImtkZVwiOiBcIk1ha29uZGVcIixcbiAgICBcIm1nXCI6IFwiTWFsYWdhc3lcIixcbiAgICBcIm1zXCI6IFwiTWFsYXlcIixcbiAgICBcIm1sXCI6IFwiTWFsYXlhbGFtXCIsXG4gICAgXCJtdFwiOiBcIk1hbHRlc2VcIixcbiAgICBcIm1uY1wiOiBcIk1hbmNodVwiLFxuICAgIFwibWRyXCI6IFwiTWFuZGFyaW5cIixcbiAgICBcIm1hblwiOiBcIk1hbmRpbmdvXCIsXG4gICAgXCJtbmlcIjogXCJNYW5pcHVyaVwiLFxuICAgIFwiZ3ZcIjogXCJNYW54XCIsXG4gICAgXCJtaVwiOiBcIk1hb3JpXCIsXG4gICAgXCJhcm5cIjogXCJNYXB1Y2hlXCIsXG4gICAgXCJtclwiOiBcIk1hcmF0aGlcIixcbiAgICBcImNobVwiOiBcIk1hcmlcIixcbiAgICBcIm1oXCI6IFwiTWFyc2hhbGxlc2VcIixcbiAgICBcIm13clwiOiBcIk1hcndhcmlcIixcbiAgICBcIm1hc1wiOiBcIk1hc2FpXCIsXG4gICAgXCJtem5cIjogXCJNYXphbmRlcmFuaVwiLFxuICAgIFwiYnl2XCI6IFwiTWVkdW1iYVwiLFxuICAgIFwibWVuXCI6IFwiTWVuZGVcIixcbiAgICBcIm13dlwiOiBcIk1lbnRhd2FpXCIsXG4gICAgXCJtZXJcIjogXCJNZXJ1XCIsXG4gICAgXCJtZ29cIjogXCJNZXRhXFx1MDJiY1wiLFxuICAgIFwiZXNfTVhcIjogXCJNZXhpY2FuIFNwYW5pc2hcIixcbiAgICBcIm1pY1wiOiBcIk1pY21hY1wiLFxuICAgIFwiZHVtXCI6IFwiTWlkZGxlIER1dGNoXCIsXG4gICAgXCJlbm1cIjogXCJNaWRkbGUgRW5nbGlzaFwiLFxuICAgIFwiZnJtXCI6IFwiTWlkZGxlIEZyZW5jaFwiLFxuICAgIFwiZ21oXCI6IFwiTWlkZGxlIEhpZ2ggR2VybWFuXCIsXG4gICAgXCJtZ2FcIjogXCJNaWRkbGUgSXJpc2hcIixcbiAgICBcIm5hblwiOiBcIk1pbiBOYW4gQ2hpbmVzZVwiLFxuICAgIFwibWluXCI6IFwiTWluYW5na2FiYXVcIixcbiAgICBcInhtZlwiOiBcIk1pbmdyZWxpYW5cIixcbiAgICBcIm13bFwiOiBcIk1pcmFuZGVzZVwiLFxuICAgIFwibHVzXCI6IFwiTWl6b1wiLFxuICAgIFwiYXJfMDAxXCI6IFwiTW9kZXJuIFN0YW5kYXJkIEFyYWJpY1wiLFxuICAgIFwibW9oXCI6IFwiTW9oYXdrXCIsXG4gICAgXCJtZGZcIjogXCJNb2tzaGFcIixcbiAgICBcInJvX01EXCI6IFwiTW9sZGF2aWFuXCIsXG4gICAgXCJsb2xcIjogXCJNb25nb1wiLFxuICAgIFwibW5cIjogXCJNb25nb2xpYW5cIixcbiAgICBcIm1mZVwiOiBcIk1vcmlzeWVuXCIsXG4gICAgXCJhcnlcIjogXCJNb3JvY2NhbiBBcmFiaWNcIixcbiAgICBcIm1vc1wiOiBcIk1vc3NpXCIsXG4gICAgXCJtdWxcIjogXCJNdWx0aXBsZSBMYW5ndWFnZXNcIixcbiAgICBcIm11YVwiOiBcIk11bmRhbmdcIixcbiAgICBcInR0dFwiOiBcIk11c2xpbSBUYXRcIixcbiAgICBcIm15ZVwiOiBcIk15ZW5lXCIsXG4gICAgXCJuYXFcIjogXCJOYW1hXCIsXG4gICAgXCJuYVwiOiBcIk5hdXJ1XCIsXG4gICAgXCJudlwiOiBcIk5hdmFqb1wiLFxuICAgIFwibmdcIjogXCJOZG9uZ2FcIixcbiAgICBcIm5hcFwiOiBcIk5lYXBvbGl0YW5cIixcbiAgICBcIm5lXCI6IFwiTmVwYWxpXCIsXG4gICAgXCJuZXdcIjogXCJOZXdhcmlcIixcbiAgICBcInNiYVwiOiBcIk5nYW1iYXlcIixcbiAgICBcIm5uaFwiOiBcIk5naWVtYm9vblwiLFxuICAgIFwiamdvXCI6IFwiTmdvbWJhXCIsXG4gICAgXCJ5cmxcIjogXCJOaGVlbmdhdHVcIixcbiAgICBcIm5pYVwiOiBcIk5pYXNcIixcbiAgICBcIm5pdVwiOiBcIk5pdWVhblwiLFxuICAgIFwienh4XCI6IFwiTm8gbGluZ3Vpc3RpYyBjb250ZW50XCIsXG4gICAgXCJub2dcIjogXCJOb2dhaVwiLFxuICAgIFwibmRcIjogXCJOb3J0aCBOZGViZWxlXCIsXG4gICAgXCJmcnJcIjogXCJOb3J0aGVybiBGcmlzaWFuXCIsXG4gICAgXCJzZVwiOiBcIk5vcnRoZXJuIFNhbWlcIixcbiAgICBcIm5zb1wiOiBcIk5vcnRoZXJuIFNvdGhvXCIsXG4gICAgXCJub1wiOiBcIk5vcndlZ2lhblwiLFxuICAgIFwibmJcIjogXCJOb3J3ZWdpYW4gQm9rbVxcdTAwZTVsXCIsXG4gICAgXCJublwiOiBcIk5vcndlZ2lhbiBOeW5vcnNrXCIsXG4gICAgXCJub3ZcIjogXCJOb3ZpYWxcIixcbiAgICBcIm51c1wiOiBcIk51ZXJcIixcbiAgICBcIm55bVwiOiBcIk55YW13ZXppXCIsXG4gICAgXCJueVwiOiBcIk55YW5qYVwiLFxuICAgIFwibnluXCI6IFwiTnlhbmtvbGVcIixcbiAgICBcInRvZ1wiOiBcIk55YXNhIFRvbmdhXCIsXG4gICAgXCJueW9cIjogXCJOeW9yb1wiLFxuICAgIFwibnppXCI6IFwiTnppbWFcIixcbiAgICBcIm5xb1wiOiBcIk5cXHUwMmJjS29cIixcbiAgICBcIm9jXCI6IFwiT2NjaXRhblwiLFxuICAgIFwib2pcIjogXCJPamlid2FcIixcbiAgICBcImFuZ1wiOiBcIk9sZCBFbmdsaXNoXCIsXG4gICAgXCJmcm9cIjogXCJPbGQgRnJlbmNoXCIsXG4gICAgXCJnb2hcIjogXCJPbGQgSGlnaCBHZXJtYW5cIixcbiAgICBcInNnYVwiOiBcIk9sZCBJcmlzaFwiLFxuICAgIFwibm9uXCI6IFwiT2xkIE5vcnNlXCIsXG4gICAgXCJwZW9cIjogXCJPbGQgUGVyc2lhblwiLFxuICAgIFwicHJvXCI6IFwiT2xkIFByb3ZlblxcdTAwZTdhbFwiLFxuICAgIFwib3JcIjogXCJPcml5YVwiLFxuICAgIFwib21cIjogXCJPcm9tb1wiLFxuICAgIFwib3NhXCI6IFwiT3NhZ2VcIixcbiAgICBcIm9zXCI6IFwiT3NzZXRpY1wiLFxuICAgIFwib3RhXCI6IFwiT3R0b21hbiBUdXJraXNoXCIsXG4gICAgXCJwYWxcIjogXCJQYWhsYXZpXCIsXG4gICAgXCJwZmxcIjogXCJQYWxhdGluZSBHZXJtYW5cIixcbiAgICBcInBhdVwiOiBcIlBhbGF1YW5cIixcbiAgICBcInBpXCI6IFwiUGFsaVwiLFxuICAgIFwicGRjXCI6IFwiUGVubnN5bHZhbmlhIEdlcm1hblwiLFxuICAgIFwiZmFcIjogXCJQZXJzaWFuXCIsXG4gICAgXCJwaG5cIjogXCJQaG9lbmljaWFuXCIsXG4gICAgXCJwY2RcIjogXCJQaWNhcmRcIixcbiAgICBcInBtc1wiOiBcIlBpZWRtb250ZXNlXCIsXG4gICAgXCJwZHRcIjogXCJQbGF1dGRpZXRzY2hcIixcbiAgICBcInBvblwiOiBcIlBvaG5wZWlhblwiLFxuICAgIFwicGxcIjogXCJQb2xpc2hcIixcbiAgICBcInBudFwiOiBcIlBvbnRpY1wiLFxuICAgIFwicHRcIjogXCJQb3J0dWd1ZXNlXCIsXG4gICAgXCJwcmdcIjogXCJQcnVzc2lhblwiLFxuICAgIFwicGFcIjogXCJQdW5qYWJpXCIsXG4gICAgXCJxdVwiOiBcIlF1ZWNodWFcIixcbiAgICBcInJvXCI6IFwiUm9tYW5pYW5cIixcbiAgICBcInJtXCI6IFwiUm9tYW5zaFwiLFxuICAgIFwicm9tXCI6IFwiUm9tYW55XCIsXG4gICAgXCJyb290XCI6IFwiUm9vdFwiLFxuICAgIFwicnVcIjogXCJSdXNzaWFuXCIsXG4gICAgXCJyd2tcIjogXCJSd2FcIixcbiAgICBcInNhaFwiOiBcIlNha2hhXCIsXG4gICAgXCJzYW1cIjogXCJTYW1hcml0YW4gQXJhbWFpY1wiLFxuICAgIFwic21cIjogXCJTYW1vYW5cIixcbiAgICBcInNjb1wiOiBcIlNjb3RzXCIsXG4gICAgXCJnZFwiOiBcIlNjb3R0aXNoIEdhZWxpY1wiLFxuICAgIFwic2x5XCI6IFwiU2VsYXlhclwiLFxuICAgIFwic2VsXCI6IFwiU2Vsa3VwXCIsXG4gICAgXCJzZWhcIjogXCJTZW5hXCIsXG4gICAgXCJzZWVcIjogXCJTZW5lY2FcIixcbiAgICBcInNyXCI6IFwiU2VyYmlhblwiLFxuICAgIFwic2hcIjogXCJTZXJiby1Dcm9hdGlhblwiLFxuICAgIFwic3JyXCI6IFwiU2VyZXJcIixcbiAgICBcInNlaVwiOiBcIlNlcmlcIixcbiAgICBcImtzYlwiOiBcIlNoYW1iYWxhXCIsXG4gICAgXCJzaG5cIjogXCJTaGFuXCIsXG4gICAgXCJzblwiOiBcIlNob25hXCIsXG4gICAgXCJpaVwiOiBcIlNpY2h1YW4gWWlcIixcbiAgICBcInNjblwiOiBcIlNpY2lsaWFuXCIsXG4gICAgXCJzaWRcIjogXCJTaWRhbW9cIixcbiAgICBcImJsYVwiOiBcIlNpa3Npa2FcIixcbiAgICBcInN6bFwiOiBcIlNpbGVzaWFuXCIsXG4gICAgXCJ6aF9IYW5zXCI6IFwiU2ltcGxpZmllZCBDaGluZXNlXCIsXG4gICAgXCJzZFwiOiBcIlNpbmRoaVwiLFxuICAgIFwic2lcIjogXCJTaW5oYWxhXCIsXG4gICAgXCJzbXNcIjogXCJTa29sdCBTYW1pXCIsXG4gICAgXCJkZW5cIjogXCJTbGF2ZVwiLFxuICAgIFwic2tcIjogXCJTbG92YWtcIixcbiAgICBcInNsXCI6IFwiU2xvdmVuaWFuXCIsXG4gICAgXCJ4b2dcIjogXCJTb2dhXCIsXG4gICAgXCJzb2dcIjogXCJTb2dkaWVuXCIsXG4gICAgXCJzb1wiOiBcIlNvbWFsaVwiLFxuICAgIFwic25rXCI6IFwiU29uaW5rZVwiLFxuICAgIFwiY2tiXCI6IFwiU29yYW5pIEt1cmRpc2hcIixcbiAgICBcImF6YlwiOiBcIlNvdXRoIEF6ZXJiYWlqYW5pXCIsXG4gICAgXCJuclwiOiBcIlNvdXRoIE5kZWJlbGVcIixcbiAgICBcImFsdFwiOiBcIlNvdXRoZXJuIEFsdGFpXCIsXG4gICAgXCJzbWFcIjogXCJTb3V0aGVybiBTYW1pXCIsXG4gICAgXCJzdFwiOiBcIlNvdXRoZXJuIFNvdGhvXCIsXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcbiAgICBcInNyblwiOiBcIlNyYW5hbiBUb25nb1wiLFxuICAgIFwiemdoXCI6IFwiU3RhbmRhcmQgTW9yb2NjYW4gVGFtYXppZ2h0XCIsXG4gICAgXCJzdWtcIjogXCJTdWt1bWFcIixcbiAgICBcInN1eFwiOiBcIlN1bWVyaWFuXCIsXG4gICAgXCJzdVwiOiBcIlN1bmRhbmVzZVwiLFxuICAgIFwic3VzXCI6IFwiU3VzdVwiLFxuICAgIFwic3dcIjogXCJTd2FoaWxpXCIsXG4gICAgXCJzc1wiOiBcIlN3YXRpXCIsXG4gICAgXCJzdlwiOiBcIlN3ZWRpc2hcIixcbiAgICBcImZyX0NIXCI6IFwiU3dpc3MgRnJlbmNoXCIsXG4gICAgXCJnc3dcIjogXCJTd2lzcyBHZXJtYW5cIixcbiAgICBcImRlX0NIXCI6IFwiU3dpc3MgSGlnaCBHZXJtYW5cIixcbiAgICBcInN5clwiOiBcIlN5cmlhY1wiLFxuICAgIFwic2hpXCI6IFwiVGFjaGVsaGl0XCIsXG4gICAgXCJ0bFwiOiBcIlRhZ2Fsb2dcIixcbiAgICBcInR5XCI6IFwiVGFoaXRpYW5cIixcbiAgICBcImRhdlwiOiBcIlRhaXRhXCIsXG4gICAgXCJ0Z1wiOiBcIlRhamlrXCIsXG4gICAgXCJ0bHlcIjogXCJUYWx5c2hcIixcbiAgICBcInRtaFwiOiBcIlRhbWFzaGVrXCIsXG4gICAgXCJ0YVwiOiBcIlRhbWlsXCIsXG4gICAgXCJ0cnZcIjogXCJUYXJva29cIixcbiAgICBcInR3cVwiOiBcIlRhc2F3YXFcIixcbiAgICBcInR0XCI6IFwiVGF0YXJcIixcbiAgICBcInRlXCI6IFwiVGVsdWd1XCIsXG4gICAgXCJ0ZXJcIjogXCJUZXJlbm9cIixcbiAgICBcInRlb1wiOiBcIlRlc29cIixcbiAgICBcInRldFwiOiBcIlRldHVtXCIsXG4gICAgXCJ0aFwiOiBcIlRoYWlcIixcbiAgICBcImJvXCI6IFwiVGliZXRhblwiLFxuICAgIFwidGlnXCI6IFwiVGlncmVcIixcbiAgICBcInRpXCI6IFwiVGlncmlueWFcIixcbiAgICBcInRlbVwiOiBcIlRpbW5lXCIsXG4gICAgXCJ0aXZcIjogXCJUaXZcIixcbiAgICBcInRsaVwiOiBcIlRsaW5naXRcIixcbiAgICBcInRwaVwiOiBcIlRvayBQaXNpblwiLFxuICAgIFwidGtsXCI6IFwiVG9rZWxhdVwiLFxuICAgIFwidG9cIjogXCJUb25nYW5cIixcbiAgICBcImZpdFwiOiBcIlRvcm5lZGFsZW4gRmlubmlzaFwiLFxuICAgIFwiemhfSGFudFwiOiBcIlRyYWRpdGlvbmFsIENoaW5lc2VcIixcbiAgICBcInRrclwiOiBcIlRzYWtodXJcIixcbiAgICBcInRzZFwiOiBcIlRzYWtvbmlhblwiLFxuICAgIFwidHNpXCI6IFwiVHNpbXNoaWFuXCIsXG4gICAgXCJ0c1wiOiBcIlRzb25nYVwiLFxuICAgIFwidG5cIjogXCJUc3dhbmFcIixcbiAgICBcInRjeVwiOiBcIlR1bHVcIixcbiAgICBcInR1bVwiOiBcIlR1bWJ1a2FcIixcbiAgICBcImFlYlwiOiBcIlR1bmlzaWFuIEFyYWJpY1wiLFxuICAgIFwidHJcIjogXCJUdXJraXNoXCIsXG4gICAgXCJ0a1wiOiBcIlR1cmttZW5cIixcbiAgICBcInRydVwiOiBcIlR1cm95b1wiLFxuICAgIFwidHZsXCI6IFwiVHV2YWx1XCIsXG4gICAgXCJ0eXZcIjogXCJUdXZpbmlhblwiLFxuICAgIFwidHdcIjogXCJUd2lcIixcbiAgICBcImtjZ1wiOiBcIlR5YXBcIixcbiAgICBcInVkbVwiOiBcIlVkbXVydFwiLFxuICAgIFwidWdhXCI6IFwiVWdhcml0aWNcIixcbiAgICBcInVrXCI6IFwiVWtyYWluaWFuXCIsXG4gICAgXCJ1bWJcIjogXCJVbWJ1bmR1XCIsXG4gICAgXCJ1bmRcIjogXCJVbmtub3duIExhbmd1YWdlXCIsXG4gICAgXCJoc2JcIjogXCJVcHBlciBTb3JiaWFuXCIsXG4gICAgXCJ1clwiOiBcIlVyZHVcIixcbiAgICBcInVnXCI6IFwiVXlnaHVyXCIsXG4gICAgXCJ1elwiOiBcIlV6YmVrXCIsXG4gICAgXCJ2YWlcIjogXCJWYWlcIixcbiAgICBcInZlXCI6IFwiVmVuZGFcIixcbiAgICBcInZlY1wiOiBcIlZlbmV0aWFuXCIsXG4gICAgXCJ2ZXBcIjogXCJWZXBzXCIsXG4gICAgXCJ2aVwiOiBcIlZpZXRuYW1lc2VcIixcbiAgICBcInZvXCI6IFwiVm9sYXBcXHUwMGZja1wiLFxuICAgIFwidnJvXCI6IFwiVlxcdTAwZjVyb1wiLFxuICAgIFwidm90XCI6IFwiVm90aWNcIixcbiAgICBcInZ1blwiOiBcIlZ1bmpvXCIsXG4gICAgXCJ3YVwiOiBcIldhbGxvb25cIixcbiAgICBcIndhZVwiOiBcIldhbHNlclwiLFxuICAgIFwid2FyXCI6IFwiV2FyYXlcIixcbiAgICBcIndhc1wiOiBcIldhc2hvXCIsXG4gICAgXCJndWNcIjogXCJXYXl1dVwiLFxuICAgIFwiY3lcIjogXCJXZWxzaFwiLFxuICAgIFwidmxzXCI6IFwiV2VzdCBGbGVtaXNoXCIsXG4gICAgXCJmeVwiOiBcIldlc3Rlcm4gRnJpc2lhblwiLFxuICAgIFwibXJqXCI6IFwiV2VzdGVybiBNYXJpXCIsXG4gICAgXCJ3YWxcIjogXCJXb2xheXR0YVwiLFxuICAgIFwid29cIjogXCJXb2xvZlwiLFxuICAgIFwid3V1XCI6IFwiV3UgQ2hpbmVzZVwiLFxuICAgIFwieGhcIjogXCJYaG9zYVwiLFxuICAgIFwiaHNuXCI6IFwiWGlhbmcgQ2hpbmVzZVwiLFxuICAgIFwieWF2XCI6IFwiWWFuZ2JlblwiLFxuICAgIFwieWFvXCI6IFwiWWFvXCIsXG4gICAgXCJ5YXBcIjogXCJZYXBlc2VcIixcbiAgICBcInliYlwiOiBcIlllbWJhXCIsXG4gICAgXCJ5aVwiOiBcIllpZGRpc2hcIixcbiAgICBcInlvXCI6IFwiWW9ydWJhXCIsXG4gICAgXCJ6YXBcIjogXCJaYXBvdGVjXCIsXG4gICAgXCJkamVcIjogXCJaYXJtYVwiLFxuICAgIFwienphXCI6IFwiWmF6YVwiLFxuICAgIFwiemVhXCI6IFwiWmVlbGFuZGljXCIsXG4gICAgXCJ6ZW5cIjogXCJaZW5hZ2FcIixcbiAgICBcInphXCI6IFwiWmh1YW5nXCIsXG4gICAgXCJnYnpcIjogXCJab3JvYXN0cmlhbiBEYXJpXCIsXG4gICAgXCJ6dVwiOiBcIlp1bHVcIixcbiAgICBcInp1blwiOiBcIlp1bmlcIlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5kYXRhLmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuICovXG5cbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4uL21haW4vc3RvcmUnO1xuXG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuQ29udGVudEFyZW5hLlV0aWxzID0ge1xuXG4gICAgY29udGVudFBhcnNlckZyb21TZXJ2ZXIoY29udGVudCkge1xuXG4gICAgICAgIGlmICggY29udGVudC5wYXJzZWQgKSByZXR1cm4gY29udGVudDtcblxuICAgICAgICBsZXQgc29ydCA9IHRydWU7XG5cbiAgICAgICAgaWYgKCBjb250ZW50LmV4dHJhRGF0YSl7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhjb250ZW50LmV4dHJhRGF0YSkuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAoW2tleSwgdmFsdWVdKSA9PiBjb250ZW50W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRlbnQudG91cm5hbWVudCA9IChjb250ZW50LnRvdXJuYW1lbnQpID8gQXJyYXkuaXNBcnJheShjb250ZW50LnRvdXJuYW1lbnQpPyBjb250ZW50LnRvdXJuYW1lbnQgOiBbY29udGVudC50b3VybmFtZW50XSA6IFtdO1xuICAgICAgICBjb250ZW50LnNwb3J0Q2F0ZWdvcnkgPSAoY29udGVudC5zcG9ydENhdGVnb3J5KSA/IEFycmF5LmlzQXJyYXkoY29udGVudC5zcG9ydENhdGVnb3J5KT8gY29udGVudC5zcG9ydENhdGVnb3J5IDogW2NvbnRlbnQuc3BvcnRDYXRlZ29yeV0gOiBbXTtcblxuICAgICAgICBpZiAoY29udGVudC5zZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodCl7XG4gICAgICAgICAgICBjb250ZW50LnJpZ2h0c1BhY2thZ2UuZm9yRWFjaCggKHJwKSA9PiB7XG4gICAgICAgICAgICAgICAgcnAuc2VsZWN0ZWRSaWdodHMgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnaXRlbXMnXTtcbiAgICAgICAgICAgICAgICBycC5leGNsdXNpdmUgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnZXhjbHVzaXZlJ107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50LmZpeHR1cmVzQnlTZWFzb24pe1xuICAgICAgICAgICAgY29udGVudC5zZWFzb25zLmZvckVhY2goIChzLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcy5maXh0dXJlcyA9IGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbltpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudC5sYXcpe1xuICAgICAgICAgICAgY29udGVudC5sYXcubGFiZWwgPSBjb250ZW50Lmxhdy5uYW1lO1xuICAgICAgICAgICAgY29udGVudC5sYXcudmFsdWUgPSBjb250ZW50Lmxhdy5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBjb250ZW50LnNhbGVzUGFja2FnZXMgKSB7XG4gICAgICAgICAgICBjb250ZW50LnNhbGVzUGFja2FnZXMuZm9yRWFjaCgoc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3Auc2FsZXNNZXRob2QpIHNwLnNhbGVzTWV0aG9kID0gc3Auc2FsZXNNZXRob2QubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoc3AuZXhjbHVkZWRDb3VudHJpZXMpIHNwLmV4Y2x1ZGVkVGVycml0b3JpZXMgPSBzcC5leGNsdWRlZENvdW50cmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZX19KVxuICAgICAgICAgICAgICAgIGlmIChzcC50ZXJyaXRvcmllcykgc3AudGVycml0b3JpZXMgPSBzcC50ZXJyaXRvcmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZX19KVxuICAgICAgICAgICAgICAgIGlmICghc3AudGVycml0b3JpZXMpIHNvcnQgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwLmluc3RhbGxtZW50cyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcC5pbnN0YWxsbWVudHMuZm9yRWFjaChpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkuZGF0ZSkgaS5kYXRlID0gbW9tZW50KGkuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSl7fVxuXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNvcnQpIGNvbnRlbnQuc2FsZXNQYWNrYWdlcy5zb3J0KHRoaXMuc29ydFNhbGVzUGFja2FnZXMpLnJldmVyc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50LmVuZERhdGUpIGNvbnRlbnQuZW5kRGF0ZSA9IG1vbWVudChjb250ZW50LmVuZERhdGUpO1xuICAgICAgICBpZiAoY29udGVudC5zdGFydERhdGUpIGNvbnRlbnQuc3RhcnREYXRlID0gbW9tZW50KGNvbnRlbnQuc3RhcnREYXRlKTtcbiAgICAgICAgaWYgKGNvbnRlbnQuc2lnbmF0dXJlKSBjb250ZW50LnNpZ25hdHVyZSA9IGhvc3R1cmwgKyBjb250ZW50LnNpZ25hdHVyZTtcblxuICAgICAgICBjb250ZW50LnN0ZXAgPSBOdW1iZXIoY29udGVudC5zdGVwKTtcbiAgICAgICAgY29udGVudC5jdXN0b21TZWFzb25zID0gY29udGVudC5zZWFzb25zLmZpbHRlcihzPT57XG4gICAgICAgICAgICByZXR1cm4gcy5leHRlcm5hbElkICYmIHMuZXh0ZXJuYWxJZC5zdGFydHNXaXRoKFwiY2E6XCIpXG4gICAgICAgIH0pLm1hcCgocyxpKT0+e1xuICAgICAgICAgICAgbGV0IHllYXJzO1xuICAgICAgICAgICAgaWYgKHMueWVhcil7XG4gICAgICAgICAgICAgICAgeWVhcnMgPSBzLnllYXIuc3BsaXQoXCIvXCIpO1xuICAgICAgICAgICAgICAgIHMuZnJvbSA9IHllYXJzLmxlbmd0aCA9PT0gMSA/IHllYXJzWzBdIDogMjAwMCArIE51bWJlcih5ZWFyc1swXSk7XG4gICAgICAgICAgICAgICAgcy50byA9IHllYXJzLmxlbmd0aCA9PT0gMSA/IG51bGwgOiAyMDAwICsgTnVtYmVyKHllYXJzWzFdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbil7XG4gICAgICAgICAgICAgICAgcy5maXh0dXJlcyA9IGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbltpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgY29udGVudC5zZWFzb25zID0gY29udGVudC5zZWFzb25zLm1hcChzPT57XG4gICAgICAgICAgICBpZiAoIHMuZXh0ZXJuYWxJZCAmJiBzLmV4dGVybmFsSWQuc3RhcnRzV2l0aChcImNhOlwiKSApe1xuICAgICAgICAgICAgICAgIHMuY3VzdG9tID0gdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29udGVudC5leHRyYURhdGEgJiYgY29udGVudC5leHRyYURhdGEuc2Vhc29uRHVyYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tU2Vhc29uRHVyID0gY29udGVudC5leHRyYURhdGEuc2Vhc29uRHVyYXRpb25zW3MuZXh0ZXJuYWxJZF07XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VzdG9tU2Vhc29uRHVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuY3VzdG9tU3RhcnREYXRlID0gY3VzdG9tU2Vhc29uRHVyLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgcy5jdXN0b21FbmREYXRlID0gY3VzdG9tU2Vhc29uRHVyLmVuZERhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcztcblxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdXNlciA9IHN0b3JlLmdldFN0YXRlKCkudXNlcjtcblxuICAgICAgICBpZiAoIWNvbnRlbnQuc2lnbmF0dXJlTmFtZSkgY29udGVudC5zaWduYXR1cmVOYW1lID0gdXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXIubGFzdE5hbWU7XG4gICAgICAgIGlmICghY29udGVudC5zaWduYXR1cmVQb3NpdGlvbikgY29udGVudC5zaWduYXR1cmVQb3NpdGlvbiA9IHVzZXIudGl0bGU7XG5cbiAgICAgICAgY29udGVudC5wYXJzZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0sXG5cbiAgICBmaWx0ZXJDb21wYW55SW5mbyhkYXRhKXtcblxuICAgICAgICBsZXQgY29tcGFueSA9IHt9O1xuXG4gICAgICAgIGNvbXBhbnkubGVnYWxOYW1lID0gZGF0YS5sZWdhbE5hbWU7XG4gICAgICAgIGNvbXBhbnkucmVnaXN0cmF0aW9uTnVtYmVyID0gZGF0YS5yZWdpc3RyYXRpb25OdW1iZXI7XG4gICAgICAgIGNvbXBhbnkudmF0ID0gZGF0YS52YXQ7XG4gICAgICAgIGNvbXBhbnkuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgICAgY29tcGFueS5hZGRyZXNzMiA9IGRhdGEuYWRkcmVzczI7XG4gICAgICAgIGNvbXBhbnkuY2l0eSA9IGRhdGEuY2l0eTtcbiAgICAgICAgY29tcGFueS56aXAgPSBkYXRhLnppcDtcbiAgICAgICAgY29tcGFueS5jb3VudHJ5ID0gZGF0YS5jb3VudHJ5O1xuXG4gICAgICAgIHJldHVybiBjb21wYW55O1xuICAgIH0sXG5cbiAgICBzb3J0U2FsZXNQYWNrYWdlcyAoYSwgYil7XG4gICAgICAgIGxldCBjID0gKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoYSA+IGIpID8gMSA6ICgoYiA+IGEpID8gLTEgOiAwKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYyhhLnRlcnJpdG9yaWVzLmxlbmd0aCwgYi50ZXJyaXRvcmllcy5sZW5ndGgpIHx8IGMoYi5uYW1lLCBhLm5hbWUpO1xuICAgIH0sXG5cblxuXG4gICAgaXNBUElBdmFpbGFibGUoKSB7XG4gICAgICAgIC8vIENoZWNrIGZvciB0aGUgdmFyaW91cyBGaWxlIEFQSSBzdXBwb3J0LlxuICAgICAgICBpZiAod2luZG93LkZpbGUgJiYgd2luZG93LkZpbGVSZWFkZXIgJiYgd2luZG93LkZpbGVMaXN0ICYmIHdpbmRvdy5CbG9iKSB7XG4gICAgICAgICAgICAvLyBHcmVhdCBzdWNjZXNzISBBbGwgdGhlIEZpbGUgQVBJcyBhcmUgc3VwcG9ydGVkLlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzb3VyY2U6IEZpbGUgQVBJIGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9jYW5pdXNlLmNvbS8jZmVhdD1maWxlYXBpXG4gICAgICAgICAgICAvLyBzb3VyY2U6IDxvdXRwdXQ+IGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9odG1sNWRvY3Rvci5jb20vdGhlLW91dHB1dC1lbGVtZW50L1xuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignVGhlIEhUTUw1IEFQSXMgdXNlZCBpbiB0aGlzIGZvcm0gYXJlIG9ubHkgYXZhaWxhYmxlIGluIHRoZSBmb2xsb3dpbmcgYnJvd3NlcnM6PGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyA2LjAgRmlsZSBBUEkgJiAxMy4wIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBHb29nbGUgQ2hyb21lOiAxMy4wIG9yIGxhdGVyPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyAzLjYgRmlsZSBBUEkgJiA2LjAgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIE1vemlsbGEgRmlyZWZveDogNi4wIG9yIGxhdGVyPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyAxMC4wIEZpbGUgQVBJICYgMTAuMCA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gSW50ZXJuZXQgRXhwbG9yZXI6IE5vdCBzdXBwb3J0ZWQgKHBhcnRpYWwgc3VwcG9ydCBleHBlY3RlZCBpbiAxMC4wKTxiciAvPicpO1xuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDUuMSA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gU2FmYXJpOiBOb3Qgc3VwcG9ydGVkPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyA/IEZpbGUgQVBJICYgOS4yIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBPcGVyYTogTm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhZGRPcmRpbmFsKG4pIHtcbiAgICAgICAgdmFyIHN0ciA9IG4udG9TdHJpbmcoKS5zbGljZSgtMSksXG4gICAgICAgICAgICBvcmQgPSAnJztcbiAgICAgICAgc3dpdGNoIChzdHIpIHtcbiAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICdzdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAnbmQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgb3JkID0gJ3JkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICBjYXNlICc2JzpcbiAgICAgICAgICAgIGNhc2UgJzcnOlxuICAgICAgICAgICAgY2FzZSAnOCc6XG4gICAgICAgICAgICBjYXNlICc5JzpcbiAgICAgICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICd0aCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG4gKyBvcmQ7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhcnJcbiAgICAgKiBAcGFyYW0gcHJvcFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0SW5kZXggKHZhbHVlLCBhcnIsIHByb3ApIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoYXJyW2ldW3Byb3BdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTsgLy90byBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdGhlIHZhbHVlIGRvZXNuJ3QgZXhpc3RcbiAgICB9LFxuXG4gICAgZ2V0V2Vic2l0ZVVSbChzdHIpIHtcbiAgICAgICAgaWYgKHN0ci5pbmNsdWRlcygnaHR0cDovLycpIHx8IHN0ci5pbmNsdWRlcygnaHR0cHM6Ly8nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0clxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdodHRwOi8vJytzdHJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0xpc3RpbmdQdWJsaXNoZWQoc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiAoc3RhdHVzICYmIChzdGF0dXMubmFtZSA9PT0gXCJBUFBST1ZFRFwiIHx8IHN0YXR1cy5uYW1lID09PSBcIlBFTkRJTkdcIiB8fCBzdGF0dXMubmFtZSA9PT0gXCJFRElURURcIikpO1xuICAgIH1cblxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS51dGlscy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQge2xhbmd1YWdlc30gZnJvbSBcIi4uLy4uLy4uL2RhdGEvbGFuZ3VhZ2VzXCI7XG5cbmV4cG9ydCBjb25zdCBhbGxWYWx1ZSA9IHtcbiAgICB2YWx1ZTogJ2FsbCcsXG4gICAgbGFiZWw6ICdBbGwgbG9jYWwgbGFuZ3VhZ2VzJ1xufTtcblxuY2xhc3MgTGFuZ3VhZ2VTZWxlY3RvciBleHRlbmRzICBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcblxuICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb24gPSBwcm9wcy52YWx1ZSA/IFsuLi5wcm9wcy52YWx1ZV0gOiBbXTtcbiAgICB9XG5cbiAgICBoYW5kbGVPbkNoYW5nZSA9IChzZWxlY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgaGFzQWxsID0gISFzZWxlY3Rpb24uZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gJ2FsbCcpO1xuICAgICAgICBjb25zdCBoYXNBbGxQcmV2ID0gISF0aGlzLnByZXZTZWxlY3Rpb24uZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gJ2FsbCcpO1xuICAgICAgICAvL2NvbnN0IGl0ZW1zQ2hhbmdlZCA9IHNlbGVjdGlvbi5sZW5ndGggIT09IHRoaXMucHJldlNlbGVjdGlvbi5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGhhc0FsbCkge1xuICAgICAgICAgICAgaWYgKGhhc0FsbFByZXYpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgQWxsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gc2VsZWN0aW9uLmZpbHRlcihpdGVtID0+IGl0ZW0udmFsdWUgIT09ICdhbGwnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIEFsbCBhbmQgcmVtb3ZlIG90aGVyc1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IFthbGxWYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb24gPSBzZWxlY3Rpb247XG5cbiAgICAgICAgb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHsgdmFsdWUsIG11bHRpID0gdHJ1ZSwgcGxhY2Vob2xkZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHJlYWxMYW5ndWFnZXMgPSBPYmplY3QudmFsdWVzKGxhbmd1YWdlcykubWFwKChpLCBrKT0+KHt2YWx1ZSA6IGkubmFtZSAsIGxhYmVsIDogaS5uYW1lIH0pKTtcbiAgICAgICAgY29uc3QgYWxsTGFuZ3VhZ2VzID0gWyBhbGxWYWx1ZSwgLi4ucmVhbExhbmd1YWdlcyBdO1xuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICBuYW1lPVwiZm9ybS1maWVsZC1uYW1lXCJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgbXVsdGk9e211bHRpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXthbGxMYW5ndWFnZXN9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgeyBMYW5ndWFnZVNlbGVjdG9yIH07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9MYW5ndWFnZVNlbGVjdG9yLmpzIiwiZXhwb3J0IGNvbnN0IGNvbW1vblR5cGVzPSB7XG4gICAgR0VUX0RFRkFVTFRfUklHSFRTX1BBQ0tBR0U6J0dFVF9ERUZBVUxUX1JJR0hUU19QQUNLQUdFJyxcbiAgICBTRVRfVE9UQUxfQ09VTlRSSUVTOiAnU0VUX1RPVEFMX0NPVU5UUklFUydcbn07XG5cbmNvbnN0IGNvbW1vbkRlZmF1bHQgPSB7XG4gICAgdG90YWxDb3VudHJpZXMgOiAyNDBcbn07XG5cbmV4cG9ydCBjb25zdCBjb21tb24gPSAoc3RhdGUgPSBjb21tb25EZWZhdWx0LCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBjb21tb25UeXBlcy5HRVRfREVGQVVMVF9SSUdIVFNfUEFDS0FHRTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2RlZmF1bHRSaWdodHNQYWNrYWdlOiBhY3Rpb24uZGVmYXVsdFJpZ2h0c1BhY2thZ2V9KTtcbiAgICAgICAgY2FzZSBjb21tb25UeXBlcy5TRVRfVE9UQUxfQ09VTlRSSUVTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7dG90YWxDb3VudHJpZXM6IGFjdGlvbi50b3RhbENvdW50cmllc30pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy9jb21tb24uanMiLCJleHBvcnQgY29uc3QgdXNlclR5cGVzPSB7XG4gICAgTE9HT1VUOidMT0dPVVQnLFxuICAgIExPR0lOOidMT0dJTicsXG4gICAgUFJPRklMRTonUFJPRklMRScsXG4gICAgTE9BRF9VU0VSX0RBVEE6J0xPQURfVVNFUl9EQVRBJyxcbn07XG5cbmNvbnN0IGRlZmF1bHRVc2VyID0ge1xuICAgIHByb2ZpbGUgOiBcIlNFTExFUlwiXG5cbn07XG5cbmV4cG9ydCBjb25zdCB1c2VyID0gKHN0YXRlID0gZGVmYXVsdFVzZXIsIGFjdGlvbikgPT4ge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIHVzZXJUeXBlcy5MT0dPVVQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGRlZmF1bHRVc2VyKTtcbiAgICAgICAgY2FzZSB1c2VyVHlwZXMuTE9HSU46XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBlbWFpbDogYWN0aW9uLmVtYWlsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSB1c2VyVHlwZXMuUFJPRklMRTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHByb2ZpbGU6IGFjdGlvbi5wcm9maWxlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSB1c2VyVHlwZXMuTE9BRF9VU0VSX0RBVEE6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsuLi5hY3Rpb24udXNlcn0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy91c2VyLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHtpMThuU3RhdGV9IGZyb20gXCJyZWR1eC1pMThuXCI7XG5cbmltcG9ydCB7Y29udGVudH0gZnJvbSBcIi4uL3NlbGwvcmVkdWNlcnMvY29udGVudFwiO1xuaW1wb3J0IHtzZWxlY3Rvcn0gZnJvbSBcIi4uL3NlbGwvcmVkdWNlcnMvc2VsZWN0b3JcIjtcbmltcG9ydCB7ZmlsdGVyfSBmcm9tIFwiLi4vYnV5L3JlZHVjZXJzL2ZpbHRlclwiO1xuaW1wb3J0IHttYXJrZXRwbGFjZX0gZnJvbSBcIi4uL2J1eS9yZWR1Y2Vycy9tYXJrZXRwbGFjZVwiO1xuaW1wb3J0IHttYW5hZ2V9IGZyb20gXCIuLi9tYW5hZ2UvcmVkdWNlcnMvbWFuYWdlXCI7XG5pbXBvcnQge3VzZXJ9IGZyb20gXCIuL3JlZHVjZXJzL3VzZXJcIjtcbmltcG9ydCB7Y29tbW9ufSBmcm9tIFwiLi9yZWR1Y2Vycy9jb21tb25cIjtcblxuY29uc3QgcmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoe1xuICAgIGNvbnRlbnQsXG4gICAgc2VsZWN0b3IsXG4gICAgbWFya2V0cGxhY2UsXG4gICAgZmlsdGVyLFxuICAgIG1hbmFnZSxcbiAgICB1c2VyLFxuICAgIGNvbW1vbixcbiAgICBpMThuU3RhdGVcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyZWR1Y2Vycyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9zdG9yZS5qcyIsIlxuZXhwb3J0IGNvbnN0IG1hbmFnZVR5cGVzPSB7XG4gICAgVEVTVDonVEVTVCcsXG59O1xuXG5leHBvcnQgY29uc3QgbWFuYWdlID0gKHN0YXRlID0ge1xuICAgIHRlc3RJdGVtOiBcIm1hbmFnZVJlZHVjZXJcIlxuXG59LCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtYW5hZ2VUeXBlcy5URVNUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgdGVzdDogYWN0aW9uLnRleHQsXG4gICAgICAgICAgICAgICAgaWQgOiBhY3Rpb24uaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3JlZHVjZXJzL21hbmFnZS5qcyIsImltcG9ydCBtYXggZnJvbSAnbG9kYXNoL21heCc7XG5pbXBvcnQgeyBhbGxWYWx1ZSB9IGZyb20gJy4vLi4vLi4vbWFpbi9jb21wb25lbnRzL0xhbmd1YWdlU2VsZWN0b3InO1xuXG5leHBvcnQgY29uc3QgY29udGVudFR5cGU9IHtcbiAgICBDT05URU5UX0lOSVQ6J0NPTlRFTlRfSU5JVCcsXG4gICAgU1RFUF9DSEFOR0VfUkVTRVQgOiAnU1RFUF9DSEFOR0VfUkVTRVQnLFxuICAgIEdPX1RPX1NURVA6ICdHT19UT19TVEVQJyxcbiAgICBHT19UT19ORVhUX1NURVA6ICdHT19UT19ORVhUX1NURVAnLFxuICAgIEdPX1RPX1BSRVZJT1VTX1NURVA6ICdHT19UT19QUkVWSU9VU19TVEVQJyxcbiAgICBBRERfTkVXIDogJ0FERF9ORVcnLFxuICAgIFJFTU9WRV9ORVcgOiAnUkVNT1ZFX05FVycsXG4gICAgU1VQRVJfUklHSFRTX1VQREFURUQ6ICdTVVBFUl9SSUdIVFNfVVBEQVRFRCcsXG4gICAgVVBEQVRFX0NPTlRFTlRfVkFMVUUgOiAnVVBEQVRFX0NPTlRFTlRfVkFMVUUnLFxuICAgIFNFTEVDVF9UT1VSTkFNRU5UIDogJ1NFTEVDVF9UT1VSTkFNRU5UJyxcbiAgICBSRU1PVkVfRlJPTV9NVUxUSVBMRSA6ICdSRU1PVkVfRlJPTV9NVUxUSVBMRScsXG4gICAgVVBEQVRFX0ZST01fTVVMVElQTEUgOiAnVVBEQVRFX0ZST01fTVVMVElQTEUnLFxuICAgIEFQUExZX1NFTEVDVElPTiA6ICdBUFBMWV9TRUxFQ1RJT04nLFxuICAgIFVQREFURV9TQUxFU19QQUNLQUdFUyA6ICdVUERBVEVfU0FMRVNfUEFDS0FHRVMnLFxuICAgIFVQREFURV9BVFRBQ0hNRU5UUyA6ICdVUERBVEVfQVRUQUNITUVOVFMnLFxuICAgIFVQREFURV9BTk5FWCA6ICdVUERBVEVfQU5ORVgnLFxuICAgIEFERF9TQUxFU19QQUNLQUdFUyA6ICdBRERfU0FMRVNfUEFDS0FHRVMnLFxuICAgIFJFU0VUIDogJ1JFU0VUJyxcbiAgICBBTExfRVBJU09ERV9VUERBVEVfRkxBRzogJ1VQREFURV9BTExfRVBJU09ERVNfRkxBRydcbn07XG5cbmV4cG9ydCBjb25zdCBFbXB0eUxpc3RpbmcgPSB7XG4gICAgc3RlcDogMSxcbiAgICBtYXhTdGVwOiAxLFxuICAgIHJpZ2h0c1BhY2thZ2UgOiBbXSxcbiAgICB0b3VybmFtZW50IDogW10sXG4gICAgc3BvcnRDYXRlZ29yeSA6IFtdLFxuICAgIHNwb3J0cyA6IFtdLFxuICAgIHNlYXNvbnM6IFtdLFxuICAgIGN1c3RvbVNlYXNvbnMgOiBbXSxcbiAgICBzYWxlc1BhY2thZ2VzIDogW10sXG4gICAgY3VzdG9tVG91cm5hbWVudCA6IG51bGwsXG4gICAgY3VzdG9tQ2F0ZWdvcnkgOiBudWxsLFxuICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICBwcm9ncmFtRGVzY3JpcHRpb24gOiBudWxsLFxuICAgIGF0dGFjaG1lbnRzIDogW10sXG4gICAgYW5uZXggOiBbXSxcbiAgICBlbmREYXRlTGltaXQgOiAzMCxcbiAgICBjb3VudGVyIDogMCxcbiAgICBjdXJyZW5jeSA6IFwiRVVSXCIsXG4gICAgc3RhcnREYXRlTW9kZSA6IFwiTElDRU5TRVwiLFxuICAgIHN0ZXBDaGFuZ2UgOiBmYWxzZSxcbiAgICB2YXQgOiBcIm5vXCIsXG4gICAgTkFfSU5QVVQgOiA5MCxcbiAgICBITF9JTlBVVCA6IDUsXG4gICAgTElDRU5TRURfTEFOR1VBR0VTIDogW2FsbFZhbHVlXSxcbiAgICBQUk9HUkFNX0xBTkdVQUdFIDogW10sXG4gICAgUFJPR1JBTV9TVUJUSVRMRVMgOiBbXSxcbiAgICBQUk9HUkFNX1NDUklQVCA6IFtdLFxuICAgIEVESVRfUFJPR1JBTV9ERVNDUklQVElPTl9PUFRJT05BTDogdHJ1ZSxcbiAgICB3ZWJzaXRlIDogbnVsbCxcbiAgICBsYXcgOiBcIkVuZ2xpc2hcIixcbiAgICBpbWFnZSA6IG51bGwsXG4gICAgaW1hZ2VCYXNlNjQgOiBudWxsLFxuICAgIHRlbXBEYXRhOiB7fVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbnRlbnQgPSAoc3RhdGUgPSBFbXB0eUxpc3RpbmcsIGFjdGlvbikgPT4ge1xuXG4gICAgbGV0IG5ld1N0YXRlID0ge307XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuUkVTRVQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIEVtcHR5TGlzdGluZyk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQ09OVEVOVF9JTklUOlxuICAgICAgICAgICAgYWN0aW9uLmNvbnRlbnQuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uY29udGVudCwge21heFN0ZXA6IG1heChbYWN0aW9uLmNvbnRlbnQubWF4U3RlcCwgc3RhdGUubWF4U3RlcF0pfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQUxMX0VQSVNPREVfVVBEQVRFX0ZMQUc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtFRElUX1BST0dSQU1fREVTQ1JJUFRJT05fT1BUSU9OQUw6IGFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuR09fVE9fTkVYVF9TVEVQOlxuICAgICAgICAgICAgY29uc3QgbmV3U3RlcCA9IHN0YXRlLnN0ZXAgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3RlcDogbmV3U3RlcCxcbiAgICAgICAgICAgICAgICBzdGVwQ2hhbmdlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heFN0ZXA6IG1heChbbmV3U3RlcCwgc3RhdGUubWF4U3RlcF0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5HT19UT19TVEVQOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3RlcDogYWN0aW9uLnN0ZXAsXG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgbWF4U3RlcDogbWF4KFthY3Rpb24uc3RlcCwgc3RhdGUubWF4U3RlcF0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5TVEVQX0NIQU5HRV9SRVNFVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHN0ZXBDaGFuZ2UgOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuR09fVE9fUFJFVklPVVNfU1RFUDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHN0ZXA6IHN0YXRlLnN0ZXAgLTEsXG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZSA6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlJFTU9WRV9ORVc6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0uc3BsaWNlKGFjdGlvbi5pbmRleCwgMSk7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFERF9ORVc6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1bYWN0aW9uLmluZGV4XSA9IHtcbiAgICAgICAgICAgICAgICBjdXN0b20gOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLmNsZWFuICl7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmNsZWFuLmZvckVhY2goKHNlbGVjdG9yVHlwZSk9PntcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVbc2VsZWN0b3JUeXBlXSA9ICQuaXNBcnJheShzdGF0ZVtzZWxlY3RvclR5cGVdKSA/IFtdIDogbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX0NPTlRFTlRfVkFMVUU6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLmtleV0gPSBhY3Rpb24udmFsdWU7XG4gICAgICAgICAgICBuZXdTdGF0ZS5saXN0aW5nRWRpdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuU0VMRUNUX1RPVVJOQU1FTlQ6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGUudG91cm5hbWVudCA9IFthY3Rpb24udG91cm5hbWVudF07XG4gICAgICAgICAgICBuZXdTdGF0ZS5zcG9ydHMgPSAoYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnQgKSA/IFthY3Rpb24udG91cm5hbWVudC5zcG9ydF0gOiBbXTtcbiAgICAgICAgICAgIG5ld1N0YXRlLnNwb3J0Q2F0ZWdvcnkgPSBbYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnRDYXRlZ29yeV07XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFQUExZX1NFTEVDVElPTjpcblxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcblxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbXMgPSBBcnJheS5mcm9tKCBhY3Rpb24uc2VsZWN0ZWRJdGVtcy52YWx1ZXMoKSApO1xuXG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm11bHRpcGxlICl7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXVthY3Rpb24uaW5kZXhdID0gc2VsZWN0ZWRJdGVtc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24uY2xlYW4gKXtcbiAgICAgICAgICAgICAgICBhY3Rpb24uY2xlYW4uZm9yRWFjaCgoc2VsZWN0b3JUeXBlKT0+e1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZVtzZWxlY3RvclR5cGVdID0gJC5pc0FycmF5KHN0YXRlW3NlbGVjdG9yVHlwZV0pID8gW10gOiBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5SRU1PVkVfRlJPTV9NVUxUSVBMRTpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXS5zcGxpY2UoYWN0aW9uLmluZGV4LDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX0ZST01fTVVMVElQTEU6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1bYWN0aW9uLmluZGV4XVthY3Rpb24ua2V5XSA9IGFjdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlNVUEVSX1JJR0hUU19VUERBVEVEOlxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5yZXNldCApIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge3JpZ2h0c1BhY2thZ2UgOiBbXSB9KTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2UgOiBBcnJheS5mcm9tKGFjdGlvbi5yaWdodHNQYWNrYWdlLnZhbHVlcygpKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX1NBTEVTX1BBQ0tBR0VTOlxuXG4gICAgICAgICAgICBsZXQgc2FsZXNQYWNrYWdlcyA9IFsuLi5zdGF0ZS5zYWxlc1BhY2thZ2VzXTtcblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVcIiApIHtcblxuICAgICAgICAgICAgICAgIGlmICggc2FsZXNQYWNrYWdlcy5sZW5ndGggPj0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcy5zcGxpY2UoYWN0aW9uLmluZGV4LDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZUFsbFwiICkge1xuICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMgPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJzYXZlXCIgKSBzYWxlc1BhY2thZ2VzW2FjdGlvbi5pbmRleF0gPSBhY3Rpb24uc2FsZXNQYWNrYWdlO1xuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzYWxlc1BhY2thZ2VzIDogc2FsZXNQYWNrYWdlc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5VUERBVEVfQVRUQUNITUVOVFM6XG5cbiAgICAgICAgICAgIGxldCBhdHRhY2htZW50cyA9IFsuLi5zdGF0ZS5hdHRhY2htZW50c107XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlXCIgKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGF0dGFjaG1lbnRzLmxlbmd0aCA+PSAxICkge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50cy5zcGxpY2UoYWN0aW9uLmluZGV4LDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZUFsbFwiICkge1xuICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRzID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwic2F2ZVwiICkgYXR0YWNobWVudHNbYWN0aW9uLmluZGV4XSA9IGFjdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgYXR0YWNobWVudHMgOiBhdHRhY2htZW50c1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5VUERBVEVfQU5ORVg6XG5cbiAgICAgICAgICAgIGxldCBhbm5leCA9IFsuLi5zdGF0ZS5hbm5leF07XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlXCIgKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGFubmV4Lmxlbmd0aCA+PSAxICkge1xuICAgICAgICAgICAgICAgICAgICBhbm5leC5zcGxpY2UoYWN0aW9uLmluZGV4LDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZUFsbFwiICkge1xuICAgICAgICAgICAgICAgIGFubmV4ID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwic2F2ZVwiICkgYW5uZXhbYWN0aW9uLmluZGV4XSA9IGFjdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgYW5uZXggOiBhbm5leFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5BRERfU0FMRVNfUEFDS0FHRVM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzYWxlc1BhY2thZ2VzIDogWy4uLnN0YXRlLnNhbGVzUGFja2FnZXMsLi4uYWN0aW9uLnNhbGVzUGFja2FnZXNdXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9jb250ZW50LmpzIiwiZXhwb3J0IGNvbnN0IHNlbGVjdG9yVHlwZT0ge1xuICAgIFRFU1Q6J1RFU1QnLFxuICAgIE9QRU5fU0VMRUNUT1I6ICdPUEVOX1NFTEVDVE9SJyxcbiAgICBDTE9TRV9TRUxFQ1RPUiA6ICdDTE9TRV9TRUxFQ1RPUicsXG4gICAgQVBQTFlfU0VMRUNUSU9OIDogJ0FQUExZX1NFTEVDVElPTidcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RvciA9IChzdGF0ZSA9IHtcbiAgICB0eXBlOiBcInNwb3J0XCIsXG4gICAgb3BlbiA6IGZhbHNlLFxuICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxuICAgIHBvcHVsYXJJdGVtczogW11cblxufSwgYWN0aW9uKSA9PiB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLlRFU1Q6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBvcGVuOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBzZWxlY3RvclR5cGUuT1BFTl9TRUxFQ1RPUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogYWN0aW9uLnNlbGVjdG9yVHlwZSxcbiAgICAgICAgICAgICAgICBvcGVuIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGFjdGlvbi5pbmRleCxcbiAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBhY3Rpb24uc2VsZWN0b3JJdGVtcyxcbiAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IGFjdGlvbi5wb3B1bGFySXRlbXMsXG4gICAgICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogYWN0aW9uLmFjdGl2ZUZpbHRlcixcbiAgICAgICAgICAgICAgICBtdWx0aXBsZSA6IGFjdGlvbi5tdWx0aXBsZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogYWN0aW9uLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgIHNob3dOZXdTcG9ydCA6IGFjdGlvbi5zaG93TmV3U3BvcnQsXG4gICAgICAgICAgICAgICAgc2hvd05ld1RvdXJuYW1lbnQgOiBhY3Rpb24uc2hvd05ld1RvdXJuYW1lbnQsXG4gICAgICAgICAgICAgICAgc2hvd05ld0NhdGVnb3J5IDogYWN0aW9uLnNob3dOZXdDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICBzaG93TmV3U2Vhc29uIDogYWN0aW9uLnNob3dOZXdTZWFzb24sXG4gICAgICAgICAgICAgICAgc2hvd0FsbENvdW50cmllczogYWN0aW9uLnNob3dBbGxDb3VudHJpZXMsXG4gICAgICAgICAgICAgICAgY2xlYW4gOiBhY3Rpb24uY2xlYW4sXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtczogYWN0aW9uLnNlbGVjdGVkSXRlbXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHNlbGVjdG9yVHlwZS5DTE9TRV9TRUxFQ1RPUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogXCJcIixcbiAgICAgICAgICAgICAgICBvcGVuIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogW10sXG4gICAgICAgICAgICAgICAgcG9wdWxhckl0ZW1zOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLkFQUExZX1NFTEVDVElPTiA6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvclR5cGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgb3BlbiA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxuICAgICAgICAgICAgICAgIHBvcHVsYXJJdGVtczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9zZWxlY3Rvci5qcyJdLCJzb3VyY2VSb290IjoiIn0=