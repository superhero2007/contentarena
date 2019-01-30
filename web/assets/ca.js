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
    UPDATE_FILTERS_CONFIG: "UPDATE_ALL",
    UPDATE_EVENT_DATE_FROM_TO: "UPDATE_FROM_TO"
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
    eventDateFrom: "",
    eventDateTo: ""
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
        case filterTypes.UPDATE_EVENT_DATE_FROM_TO:
            return Object.assign({}, state, { eventDateFrom: action.from, eventDateTo: action.to });
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
    SET_TEST_STAGE_MODE: 'SET_TEST_STAGE_MODE'
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sell_reducers_content__ = __webpack_require__(/*! ../sell/reducers/content */ "./src/AppBundle/Resources/public/javascript/sell/reducers/content.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sell_reducers_selector__ = __webpack_require__(/*! ../sell/reducers/selector */ "./src/AppBundle/Resources/public/javascript/sell/reducers/selector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__buy_reducers_filter__ = __webpack_require__(/*! ../buy/reducers/filter */ "./src/AppBundle/Resources/public/javascript/buy/reducers/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__buy_reducers_marketplace__ = __webpack_require__(/*! ../buy/reducers/marketplace */ "./src/AppBundle/Resources/public/javascript/buy/reducers/marketplace.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__manage_reducers_manage__ = __webpack_require__(/*! ../manage/reducers/manage */ "./src/AppBundle/Resources/public/javascript/manage/reducers/manage.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__reducers_user__ = __webpack_require__(/*! ./reducers/user */ "./src/AppBundle/Resources/public/javascript/main/reducers/user.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__reducers_common__ = __webpack_require__(/*! ./reducers/common */ "./src/AppBundle/Resources/public/javascript/main/reducers/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__reducers_validation__ = __webpack_require__(/*! ./reducers/validation */ "./src/AppBundle/Resources/public/javascript/main/reducers/validation.js");














var reducers = Object(__WEBPACK_IMPORTED_MODULE_1_redux__["combineReducers"])({
    content: __WEBPACK_IMPORTED_MODULE_3__sell_reducers_content__["a" /* content */],
    selector: __WEBPACK_IMPORTED_MODULE_4__sell_reducers_selector__["a" /* selector */],
    marketplace: __WEBPACK_IMPORTED_MODULE_6__buy_reducers_marketplace__["a" /* marketplace */],
    filter: __WEBPACK_IMPORTED_MODULE_5__buy_reducers_filter__["a" /* filter */],
    manage: __WEBPACK_IMPORTED_MODULE_7__manage_reducers_manage__["a" /* manage */],
    user: __WEBPACK_IMPORTED_MODULE_8__reducers_user__["a" /* user */],
    common: __WEBPACK_IMPORTED_MODULE_9__reducers_common__["a" /* common */],
    validation: __WEBPACK_IMPORTED_MODULE_10__reducers_validation__["a" /* validation */],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL21heC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvZGF0YS9sYW5ndWFnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmNvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0xhbmd1YWdlU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy91c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vcmVkdWNlcnMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9yZWR1Y2Vycy9tYW5hZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvc2VsZWN0b3IuanMiXSwibmFtZXMiOlsibGFuZ3VhZ2VzIiwiZmlsdGVyVHlwZXMiLCJBRERfUklHSFQiLCJSRU1PVkVfUklHSFQiLCJVUERBVEVfQ09VTlRSSUVTIiwiVVBEQVRFX0VYQ0xVU0lWRSIsIlVQREFURV9JTkNMVURFRF9DT1VOVFJJRVMiLCJVUERBVEVfU1BPUlQiLCJVUERBVEVfRVZFTlQiLCJDTEVBUiIsIkNMRUFSX1VQREFURSIsIlVQREFURV9NQU5ZIiwiVVBEQVRFX0ZJTFRFUlNfQ09ORklHIiwiVVBEQVRFX0VWRU5UX0RBVEVfRlJPTV9UTyIsImRlZmF1bHRGaWx0ZXIiLCJyaWdodHMiLCJjb3VudHJpZXMiLCJleGNsdXNpdmUiLCJpbmNsdWRlQWxsQ291bnRyaWVzIiwic3BvcnQiLCJ2YWx1ZSIsImxhYmVsIiwiZXZlbnQiLCJmb3JjZVVwZGF0ZSIsImV2ZW50RGF0ZUZyb20iLCJldmVudERhdGVUbyIsImZpbHRlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsIk9iamVjdCIsImFzc2lnbiIsImlkIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwibWFwIiwiYyIsImZyb20iLCJ0byIsImZpbHRlcnMiLCJOdW1iZXIiLCJyIiwibWFya2V0cGxhY2VUeXBlcyIsIlRFU1QiLCJtYXJrZXRwbGFjZSIsInRlc3RJdGVtIiwidGVzdCIsInRleHQiLCJfX2FwaVN0b3JlIiwidG91cm5hbWVudHMiLCJ3aW5kb3ciLCJDb250ZW50QXJlbmEiLCJDb250ZW50QXBpIiwic2F2ZUNvbnRlbnRBc0RyYWZ0IiwiY29udGVudCIsImRlZmVycmVkIiwialF1ZXJ5IiwiRGVmZXJyZWQiLCJfdGhpcyIsIiQiLCJhamF4IiwidXJsIiwiZW52aG9zdHVybCIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiY29udGVudFR5cGUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJyZXNvbHZlIiwiZXJyb3IiLCJzdGF0dXMiLCJyZWplY3QiLCJwcm9taXNlIiwic2F2ZUNvbnRlbnRBc0luYWN0aXZlIiwic2F2ZUNvbnRlbnRBc0FjdGl2ZSIsInJlcHVibGlzaExpc3RpbmciLCJjdXN0b21JZCIsInNlbmRNZXNzYWdlIiwibWVzc2FnZSIsImdldFVzZXJJbmZvIiwiZ2V0VXNlckluZm9CeUFjdGl2YXRpb25Db2RlIiwiYWN0aXZhdGlvbkNvZGUiLCJnZXRDb21wYW55VXNlcnMiLCJ1cGRhdGVDb21wYW55IiwiY29tcGFueSIsInVwZGF0ZVBhc3N3b3JkIiwidXBkYXRlVXNlciIsInVzZXIiLCJhY3RpdmF0ZVVzZXIiLCJwYXNzd29yZCIsInVwZGF0ZVVzZXJQcm9maWxlIiwicHJvZmlsZSIsImdldFRocmVhZCIsImdldFRocmVhZHMiLCJwbGFjZUJpZCIsImJpZCIsInBsYWNlQmlkcyIsImFjY2VwdEJpZCIsInNpZ25hdHVyZSIsInNpZ25hdHVyZU5hbWUiLCJzaWduYXR1cmVQb3NpdGlvbiIsInJlamVjdEJpZCIsInJlbW92ZUJpZCIsInNhdmVUbXBGaWxlIiwiZmlsZXMiLCJGb3JtRGF0YSIsImFwcGVuZCIsInByb2Nlc3NEYXRhIiwic2F2ZUF0dGFjaG1lbnRGaWxlIiwiY29uc29sZSIsImxvZyIsInJlbW92ZUF0dGFjaG1lbnRGaWxlIiwiZmlsZSIsImdldEJ5Q3VzdG9tSWQiLCJnZXREcmFmdExpc3RpbmdzIiwiZ2V0SW5hY3RpdmVMaXN0aW5ncyIsImdldEFjdGl2ZUxpc3RpbmdzIiwiZ2V0RXhwaXJlZExpc3RpbmdzIiwicmVtb3ZlTGlzdGluZyIsImR1cGxpY2F0ZUxpc3RpbmciLCJkZWFjdGl2YXRlTGlzdGluZyIsImFyY2hpdmVMaXN0aW5nIiwiZ2V0Q2xvc2VkRGVhbHMiLCJnZXRBbGxEZWFscyIsImdldFBlbmRpbmdEZWFscyIsImdldFJlamVjdGVkRGVhbHMiLCJnZXRXYXRjaGxpc3RMaXN0aW5ncyIsIkFwaSIsInNvcnRCeUxhYmVsIiwiYSIsImIiLCJuYW1lIiwic29ydEJ5U3BvcnQiLCJzcG9ydENhdGVnb3J5IiwicHJlcGFyZUxpc3QiLCJsaXN0IiwiY2F0ZWdvcnlJZCIsIml0ZW0iLCJjYXRlZ29yeSIsImV4dGVybmFsSWQiLCJzb3J0IiwiZmlsdGVyRG91YmxlcyIsInNwb3J0SWQiLCJuYW1lcyIsInJlcGxhY2UiLCJwdXNoIiwiZ2V0Q29tcGFueVRlcm1zIiwiZ2V0Q29tcGFueURlZmluaXRpb25zIiwicmVzdG9yZUNvbXBhbnlUZXJtcyIsInJlc3RvcmVEZWZpbml0aW9ucyIsInVwZGF0ZVRlcm1zIiwidGVybXMiLCJkZWZpbml0aW9ucyIsImdldENvbnRlbnQiLCJnZXRKc29uQ29udGVudCIsInNhdmVGaWx0ZXIiLCJnZXRDb3VudHJpZXMiLCJEYXRhIiwiQ291bnRyaWVzIiwibGVuZ3RoIiwicmVnaW9ucyIsImdldEFjdGl2ZVNwb3J0cyIsImdldEFsbFNwb3J0cyIsImZsYWdzIiwiZ2V0U3BvcnRzR3JvdXBzIiwiZ2V0Q291bnRyaWVzRnVsbCIsImdldFRlcnJpdG9yaWVzIiwiZ2V0UmVnaW9ucyIsImdldFJpZ2h0cyIsInJpZ2h0c1BhY2thZ2UiLCJncm91cCIsImdldFJpZ2h0c1BhY2thZ2UiLCJnZXRTcG9ydHMiLCJleHRlcm5hbEFwaVVybCIsInNwb3J0cyIsImdldENvbnRlbnREZXRhaWxzIiwiZ2V0UGVuZGluZ0xpc3RpbmdzIiwiZ2V0Q2F0ZWdvcmllcyIsImNhdHMiLCJnZXRUb3VybmFtZW50cyIsImRvbmUiLCJ0b3VybmFtZW50Iiwic3RvcmVkUmVzcG9uc2UiLCJ1bmRlZmluZWQiLCJnZXRTZWFzb25zIiwidG91cm5hbWVudElkIiwic2Vhc29ucyIsInNlYXNvbiIsImlzQXJyYXkiLCJlbmREYXRlIiwiZW5kX2RhdGUiLCJzdGFydERhdGUiLCJzdGFydF9kYXRlIiwidG91cm5hbWVudF9pZCIsInllYXIiLCJyZXZlcnNlIiwiZ2V0U2NoZWR1bGUiLCJzZWFzb25JZCIsInNwb3J0X2V2ZW50cyIsInNwb3J0X2V2ZW50IiwiZm9yRWFjaCIsInJvdW5kIiwidG91cm5hbWVudF9yb3VuZCIsIm51bWJlciIsIm1hdGNoZXMiLCJNYXAiLCJzZXQiLCJzY2hlZHVsZWQiLCJ0b3VybmFtZW50Um91bmQiLCJjb21wZXRpdG9ycyIsImNvbXBldGl0b3IiLCJzZWFyY2hDb21wZXRpdGlvbiIsInJlcXVlc3QiLCJ0cmFkaXRpb25hbCIsImRhdGFUeXBlIiwid2F0Y2hsaXN0IiwiZ2V0Tm90aWZpY2F0aW9ucyIsImF4aW9zIiwiZ2V0IiwibWFya05vdGlmaWNhdGlvbkFzU2VlbiIsInBvc3QiLCJMYW5ndWFnZXMiLCJUb3BTcG9ydHMiLCJGdWxsU3BvcnRzIiwiQWN0aXZlU3BvcnRzIiwiVGVycml0b3JpZXMiLCJSZWdpb25zIiwiU2hvcnQiLCJMb25nIiwiVXRpbHMiLCJjb250ZW50UGFyc2VyRnJvbVNlcnZlciIsInBhcnNlZCIsImV4dHJhRGF0YSIsImVudHJpZXMiLCJrZXkiLCJBcnJheSIsInNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0IiwicnAiLCJzZWxlY3RlZFJpZ2h0cyIsImZpeHR1cmVzQnlTZWFzb24iLCJzIiwiaSIsImZpeHR1cmVzIiwibGF3IiwiY3VzdG9tQnVuZGxlcyIsInNwIiwic2FsZXNNZXRob2QiLCJleGNsdWRlZENvdW50cmllcyIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJ0IiwidGVycml0b3J5SWQiLCJ0ZXJyaXRvcmllcyIsImluc3RhbGxtZW50cyIsImRhdGUiLCJtb21lbnQiLCJlIiwic2FsZXNQYWNrYWdlcyIsInNvcnRTYWxlc1BhY2thZ2VzIiwiaG9zdHVybCIsInN0ZXAiLCJjdXN0b21TZWFzb25zIiwic3RhcnRzV2l0aCIsInllYXJzIiwic3BsaXQiLCJjdXN0b20iLCJzZWFzb25EdXJhdGlvbnMiLCJjdXN0b21TZWFzb25EdXIiLCJjdXN0b21TdGFydERhdGUiLCJjdXN0b21FbmREYXRlIiwic3RvcmUiLCJnZXRTdGF0ZSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwidGl0bGUiLCJmaWx0ZXJDb21wYW55SW5mbyIsImxlZ2FsTmFtZSIsInJlZ2lzdHJhdGlvbk51bWJlciIsInZhdCIsImFkZHJlc3MiLCJhZGRyZXNzMiIsImNpdHkiLCJ6aXAiLCJjb3VudHJ5IiwiaXNBUElBdmFpbGFibGUiLCJGaWxlIiwiRmlsZVJlYWRlciIsIkZpbGVMaXN0IiwiQmxvYiIsImRvY3VtZW50Iiwid3JpdGVsbiIsImFkZE9yZGluYWwiLCJuIiwic3RyIiwidG9TdHJpbmciLCJzbGljZSIsIm9yZCIsImdldEluZGV4IiwiYXJyIiwicHJvcCIsImdldFdlYnNpdGVVUmwiLCJpbmNsdWRlcyIsImlzTGlzdGluZ1B1Ymxpc2hlZCIsImFsbFZhbHVlIiwiTGFuZ3VhZ2VTZWxlY3RvciIsInByb3BzIiwiaGFuZGxlT25DaGFuZ2UiLCJzZWxlY3Rpb24iLCJvbkNoYW5nZSIsImhhc0FsbCIsImZpbmQiLCJoYXNBbGxQcmV2IiwicHJldlNlbGVjdGlvbiIsIm11bHRpIiwicGxhY2Vob2xkZXIiLCJyZWFsTGFuZ3VhZ2VzIiwidmFsdWVzIiwiayIsImFsbExhbmd1YWdlcyIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29tbW9uVHlwZXMiLCJHRVRfREVGQVVMVF9SSUdIVFNfUEFDS0FHRSIsIlNFVF9UT1RBTF9DT1VOVFJJRVMiLCJTRVRfVEVTVF9TVEFHRV9NT0RFIiwiY29tbW9uRGVmYXVsdCIsInRvdGFsQ291bnRyaWVzIiwidGVzdFN0YWdlTW9kZSIsImNvbW1vbiIsImRlZmF1bHRSaWdodHNQYWNrYWdlIiwidXNlclR5cGVzIiwiTE9HT1VUIiwiTE9HSU4iLCJQUk9GSUxFIiwiTE9BRF9VU0VSX0RBVEEiLCJkZWZhdWx0VXNlciIsImVtYWlsIiwidmFsaWRhdGlvblR5cGVzIiwiRU5BQkxFX1ZBTElEQVRJT04iLCJESVNBQkxFX1ZBTElEQVRJT04iLCJ2YWxpZGF0aW9uIiwicmVkdWNlcnMiLCJjb21iaW5lUmVkdWNlcnMiLCJzZWxlY3RvciIsIm1hbmFnZSIsImkxOG5TdGF0ZSIsImNyZWF0ZVN0b3JlIiwibWFuYWdlVHlwZXMiLCJDT05URU5UX0lOSVQiLCJTVEVQX0NIQU5HRV9SRVNFVCIsIkdPX1RPX1NURVAiLCJHT19UT19ORVhUX1NURVAiLCJHT19UT19QUkVWSU9VU19TVEVQIiwiQUREX05FVyIsIlJFTU9WRV9ORVciLCJTVVBFUl9SSUdIVFNfVVBEQVRFRCIsIlVQREFURV9DT05URU5UX1ZBTFVFIiwiU0VMRUNUX1RPVVJOQU1FTlQiLCJSRU1PVkVfRlJPTV9NVUxUSVBMRSIsIlVQREFURV9GUk9NX01VTFRJUExFIiwiQVBQTFlfU0VMRUNUSU9OIiwiVVBEQVRFX1NBTEVTX1BBQ0tBR0VTIiwiVVBEQVRFX0FUVEFDSE1FTlRTIiwiVVBEQVRFX0FOTkVYIiwiQUREX1NBTEVTX1BBQ0tBR0VTIiwiUkVTRVQiLCJBTExfRVBJU09ERV9VUERBVEVfRkxBRyIsIkVtcHR5TGlzdGluZyIsIm1heFN0ZXAiLCJjdXN0b21Ub3VybmFtZW50IiwiY3VzdG9tQ2F0ZWdvcnkiLCJkZXNjcmlwdGlvbiIsInByb2dyYW1EZXNjcmlwdGlvbiIsImF0dGFjaG1lbnRzIiwiYW5uZXgiLCJlbmREYXRlTGltaXQiLCJjb3VudGVyIiwiY3VycmVuY3kiLCJzdGFydERhdGVNb2RlIiwic3RlcENoYW5nZSIsIk5BX0lOUFVUIiwiSExfSU5QVVQiLCJMSUNFTlNFRF9MQU5HVUFHRVMiLCJQUk9HUkFNX0xBTkdVQUdFIiwiUFJPR1JBTV9TVUJUSVRMRVMiLCJQUk9HUkFNX1NDUklQVCIsIkVESVRfUFJPR1JBTV9ERVNDUklQVElPTl9PUFRJT05BTCIsIndlYnNpdGUiLCJpbWFnZSIsImltYWdlQmFzZTY0IiwidGVtcERhdGEiLCJuZXdTdGF0ZSIsImluaXRpYWxpemVkIiwibWF4IiwicGF5bG9hZCIsIm5ld1N0ZXAiLCJzZWxlY3RvclR5cGUiLCJjbGVhbiIsImxpc3RpbmdFZGl0ZWQiLCJzZWxlY3RlZEl0ZW1zIiwibXVsdGlwbGUiLCJzYWxlc1BhY2thZ2UiLCJPUEVOX1NFTEVDVE9SIiwiQ0xPU0VfU0VMRUNUT1IiLCJvcGVuIiwic2VsZWN0b3JJdGVtcyIsInBvcHVsYXJJdGVtcyIsImFjdGl2ZUZpbHRlciIsImRpc2FibGVkIiwic2hvd05ld1Nwb3J0Iiwic2hvd05ld1RvdXJuYW1lbnQiLCJzaG93TmV3Q2F0ZWdvcnkiLCJzaG93TmV3U2Vhc29uIiwic2hvd0FsbENvdW50cmllcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZGOzs7Ozs7Ozs7Ozs7O0FDQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEM7QUFDNUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUNuTEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25EQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7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QkMsa0NBQWtCbFksT0FBT2tZLGdCQWJHO0FBYzVCaEIsdUJBQVFsWCxPQUFPa1gsS0FkYTtBQWU1QkUsK0JBQWVwWCxPQUFPb1g7QUFmTSxhQUF6QixDQUFQO0FBaUJKLGFBQUtILGFBQWFPLGNBQWxCO0FBQ0ksbUJBQU90WCxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosS0FBbEIsRUFBeUI7QUFDNUJrWCw4QkFBYyxFQURjO0FBRTVCUSxzQkFBTyxLQUZxQjtBQUc1QkMsK0JBQWUsRUFIYTtBQUk1QkMsOEJBQWM7QUFKYyxhQUF6QixDQUFQO0FBTUosYUFBS1YsYUFBYXBDLGVBQWxCO0FBQ0ksbUJBQU8zVSxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosS0FBbEIsRUFBeUI7QUFDNUJrWCw4QkFBYyxFQURjO0FBRTVCUSxzQkFBTyxLQUZxQjtBQUc1QkMsK0JBQWUsRUFIYTtBQUk1QkMsOEJBQWM7QUFKYyxhQUF6QixDQUFQO0FBTUo7QUFDSSxtQkFBTzVYLEtBQVA7QUF0Q1I7QUF3Q0gsQ0FoRE0sQyIsImZpbGUiOiJjYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xudmFyIGJ0b2EgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmJ0b2EgJiYgd2luZG93LmJ0b2EuYmluZCh3aW5kb3cpKSB8fCByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnRvYScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkRXZlbnQgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbiAgICB2YXIgeERvbWFpbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIElFIDgvOSBDT1JTIHN1cHBvcnRcbiAgICAvLyBPbmx5IHN1cHBvcnRzIFBPU1QgYW5kIEdFVCBjYWxscyBhbmQgZG9lc24ndCByZXR1cm5zIHRoZSByZXNwb25zZSBoZWFkZXJzLlxuICAgIC8vIERPTidUIGRvIHRoaXMgZm9yIHRlc3RpbmcgYi9jIFhNTEh0dHBSZXF1ZXN0IGlzIG1vY2tlZCwgbm90IFhEb21haW5SZXF1ZXN0LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCAmJiAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAgICFpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gICAgICBsb2FkRXZlbnQgPSAnb25sb2FkJztcbiAgICAgIHhEb21haW4gPSB0cnVlO1xuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gaGFuZGxlUHJvZ3Jlc3MoKSB7fTtcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHt9O1xuICAgIH1cblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3RbbG9hZEV2ZW50XSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCAmJiAheERvbWFpbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgLy8gSUUgc2VuZHMgMTIyMyBpbnN0ZWFkIG9mIDIwNCAoaHR0cHM6Ly9naXRodWIuY29tL2F4aW9zL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgbWV0aG9kcyBsaWtlIGBfLm1heGAgYW5kIGBfLm1pbmAgd2hpY2ggYWNjZXB0cyBhXG4gKiBgY29tcGFyYXRvcmAgdG8gZGV0ZXJtaW5lIHRoZSBleHRyZW11bSB2YWx1ZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIHVzZWQgdG8gY29tcGFyZSB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZXh0cmVtdW0gdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VFeHRyZW11bShhcnJheSwgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGN1cnJlbnQgPSBpdGVyYXRlZSh2YWx1ZSk7XG5cbiAgICBpZiAoY3VycmVudCAhPSBudWxsICYmIChjb21wdXRlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAoY3VycmVudCA9PT0gY3VycmVudCAmJiAhaXNTeW1ib2woY3VycmVudCkpXG4gICAgICAgICAgOiBjb21wYXJhdG9yKGN1cnJlbnQsIGNvbXB1dGVkKVxuICAgICAgICApKSB7XG4gICAgICB2YXIgY29tcHV0ZWQgPSBjdXJyZW50LFxuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VFeHRyZW11bTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUV4dHJlbXVtLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXRUYWcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ3RgIHdoaWNoIGRvZXNuJ3QgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBncmVhdGVyIHRoYW4gYG90aGVyYCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHdCh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID4gb3RoZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUd0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUd0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pZGVudGl0eS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBiYXNlRXh0cmVtdW0gPSByZXF1aXJlKCcuL19iYXNlRXh0cmVtdW0nKSxcbiAgICBiYXNlR3QgPSByZXF1aXJlKCcuL19iYXNlR3QnKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWF4aW11bSB2YWx1ZSBvZiBgYXJyYXlgLiBJZiBgYXJyYXlgIGlzIGVtcHR5IG9yIGZhbHNleSxcbiAqIGB1bmRlZmluZWRgIGlzIHJldHVybmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1heGltdW0gdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ubWF4KFs0LCAyLCA4LCA2XSk7XG4gKiAvLyA9PiA4XG4gKlxuICogXy5tYXgoW10pO1xuICogLy8gPT4gdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIG1heChhcnJheSkge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aClcbiAgICA/IGJhc2VFeHRyZW11bShhcnJheSwgaWRlbnRpdHksIGJhc2VHdClcbiAgICA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvbWF4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvbWF4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiZXhwb3J0IGNvbnN0IGxhbmd1YWdlcyA9IHtcbiAgICBcImFiXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFia2hhelwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCw0qfRgdGD0LBcIlxuICAgIH0sXG4gICAgXCJhYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBZmFyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZhcmFmXCJcbiAgICB9LFxuICAgIFwiYWZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWZyaWthYW5zXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZyaWthYW5zXCJcbiAgICB9LFxuICAgIFwiYWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWthblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFrYW5cIlxuICAgIH0sXG4gICAgXCJzcVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBbGJhbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNocWlwXCJcbiAgICB9LFxuICAgIFwiYW1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQW1oYXJpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGKoOGIm+GIreGKm1wiXG4gICAgfSxcbiAgICBcImFyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFyYWJpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItin2YTYudix2KjZitipXCJcbiAgICB9LFxuICAgIFwiYW5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXJhZ29uZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXJhZ29uw6lzXCJcbiAgICB9LFxuICAgIFwiaHlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXJtZW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLVgNWh1bXVpdaA1aXVtlwiXG4gICAgfSxcbiAgICBcImFzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFzc2FtZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KaF4Ka44Kau4KeA4Kav4Ka84Ka+XCJcbiAgICB9LFxuICAgIFwiYXZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXZhcmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LDQstCw0YAg0LzQsNGG04AsINC80LDQs9OA0LDRgNGD0Lsg0LzQsNGG04BcIlxuICAgIH0sXG4gICAgXCJhZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBdmVzdGFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYXZlc3RhXCJcbiAgICB9LFxuICAgIFwiYXlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXltYXJhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYXltYXIgYXJ1XCJcbiAgICB9LFxuICAgIFwiYXpcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXplcmJhaWphbmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJhesmZcmJheWNhbiBkaWxpXCJcbiAgICB9LFxuICAgIFwiYm1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmFtYmFyYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJhbWFuYW5rYW5cIlxuICAgIH0sXG4gICAgXCJiYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCYXNoa2lyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LHQsNGI0qHQvtGA0YIg0YLQtdC70LVcIlxuICAgIH0sXG4gICAgXCJldVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCYXNxdWVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJldXNrYXJhLCBldXNrZXJhXCJcbiAgICB9LFxuICAgIFwiYmVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmVsYXJ1c2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCR0LXQu9Cw0YDRg9GB0LrQsNGPXCJcbiAgICB9LFxuICAgIFwiYm5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmVuZ2FsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCmrOCmvuCmguCmsuCmvlwiXG4gICAgfSxcbiAgICBcImJoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJpaGFyaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkreCli+CknOCkquClgeCksOClgFwiXG4gICAgfSxcbiAgICBcImJpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJpc2xhbWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJCaXNsYW1hXCJcbiAgICB9LFxuICAgIFwiYnNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQm9zbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJvc2Fuc2tpIGplemlrXCJcbiAgICB9LFxuICAgIFwiYnJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnJldG9uXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYnJlemhvbmVnXCJcbiAgICB9LFxuICAgIFwiYmdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnVsZ2FyaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LHRitC70LPQsNGA0YHQutC4INC10LfQuNC6XCJcbiAgICB9LFxuICAgIFwibXlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnVybWVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGAl+GAmeGArOGAheGArFwiXG4gICAgfSxcbiAgICBcImNhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNhdGFsYW47IFZhbGVuY2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkNhdGFsw6BcIlxuICAgIH0sXG4gICAgXCJjaFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGFtb3Jyb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkNoYW1vcnVcIlxuICAgIH0sXG4gICAgXCJjZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGVjaGVuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0L3QvtGF0YfQuNC50L0g0LzQvtGC0YJcIlxuICAgIH0sXG4gICAgXCJueVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGljaGV3YTsgQ2hld2E7IE55YW5qYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImNoaUNoZcW1YSwgY2hpbnlhbmphXCJcbiAgICB9LFxuICAgIFwiemhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2hpbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuS4reaWhyAoWmjFjW5nd8OpbiksIOaxieivrSwg5ryi6KqeXCJcbiAgICB9LFxuICAgIFwiY3ZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2h1dmFzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGH05HQstCw0Ygg0YfTl9C70YXQuFwiXG4gICAgfSxcbiAgICBcImt3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNvcm5pc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLZXJuZXdla1wiXG4gICAgfSxcbiAgICBcImNvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNvcnNpY2FuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiY29yc3UsIGxpbmd1YSBjb3JzYVwiXG4gICAgfSxcbiAgICBcImNyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNyZWVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhk4DhkKbhkIPhlK3hkI3hkI/hkKNcIlxuICAgIH0sXG4gICAgXCJoclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDcm9hdGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImhydmF0c2tpXCJcbiAgICB9LFxuICAgIFwiY3NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ3plY2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLEjWVza3ksIMSNZcWhdGluYVwiXG4gICAgfSxcbiAgICBcImRhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkRhbmlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImRhbnNrXCJcbiAgICB9LFxuICAgIFwiZHZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRGl2ZWhpOyBEaGl2ZWhpOyBNYWxkaXZpYW47XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi3oveqN6I3qzegN6oXCJcbiAgICB9LFxuICAgIFwibmxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRHV0Y2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOZWRlcmxhbmRzLCBWbGFhbXNcIlxuICAgIH0sXG4gICAgXCJlblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJFbmdsaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRW5nbGlzaFwiXG4gICAgfSxcbiAgICBcImVvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkVzcGVyYW50b1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkVzcGVyYW50b1wiXG4gICAgfSxcbiAgICBcImV0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkVzdG9uaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZWVzdGksIGVlc3RpIGtlZWxcIlxuICAgIH0sXG4gICAgXCJlZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJFd2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFyotlZ2JlXCJcbiAgICB9LFxuICAgIFwiZm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRmFyb2VzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImbDuHJveXNrdFwiXG4gICAgfSxcbiAgICBcImZqXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZpamlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInZvc2EgVmFrYXZpdGlcIlxuICAgIH0sXG4gICAgXCJmaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGaW5uaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic3VvbWksIHN1b21lbiBraWVsaVwiXG4gICAgfSxcbiAgICBcImZyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZyZW5jaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImZyYW7Dp2FpcywgbGFuZ3VlIGZyYW7Dp2Fpc2VcIlxuICAgIH0sXG4gICAgXCJmZlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGdWxhOyBGdWxhaDsgUHVsYWFyOyBQdWxhclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkZ1bGZ1bGRlLCBQdWxhYXIsIFB1bGFyXCJcbiAgICB9LFxuICAgIFwiZ2xcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR2FsaWNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWxlZ29cIlxuICAgIH0sXG4gICAgXCJrYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHZW9yZ2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGDpeGDkOGDoOGDl+GDo+GDmuGDmFwiXG4gICAgfSxcbiAgICBcImRlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkdlcm1hblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkRldXRzY2hcIlxuICAgIH0sXG4gICAgXCJlbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHcmVlaywgTW9kZXJuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwizpXOu867zrfOvc65zrrOrFwiXG4gICAgfSxcbiAgICBcImduXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkd1YXJhbsOtXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXZhw7Fl4bq9XCJcbiAgICB9LFxuICAgIFwiZ3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR3VqYXJhdGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgqpfgq4HgqpzgqrDgqr7gqqTgq4BcIlxuICAgIH0sXG4gICAgXCJodFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIYWl0aWFuOyBIYWl0aWFuIENyZW9sZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktyZXnDsmwgYXlpc3llblwiXG4gICAgfSxcbiAgICBcImhhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhhdXNhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSGF1c2EsINmH2Y7ZiNmP2LPZjlwiXG4gICAgfSxcbiAgICBcImhlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhlYnJldyAobW9kZXJuKVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItei15HXqNeZ16pcIlxuICAgIH0sXG4gICAgXCJoelwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIZXJlcm9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPdGppaGVyZXJvXCJcbiAgICB9LFxuICAgIFwiaGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGluZGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLngpL/gpKjgpY3gpKbgpYAsIOCkueCkv+CkguCkpuClgFwiXG4gICAgfSxcbiAgICBcImhvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhpcmkgTW90dVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkhpcmkgTW90dVwiXG4gICAgfSxcbiAgICBcImh1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkh1bmdhcmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hZ3lhclwiXG4gICAgfSxcbiAgICBcImlhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkludGVybGluZ3VhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSW50ZXJsaW5ndWFcIlxuICAgIH0sXG4gICAgXCJpZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbmRvbmVzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQmFoYXNhIEluZG9uZXNpYVwiXG4gICAgfSxcbiAgICBcImllXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkludGVybGluZ3VlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT3JpZ2luYWxseSBjYWxsZWQgT2NjaWRlbnRhbDsgdGhlbiBJbnRlcmxpbmd1ZSBhZnRlciBXV0lJXCJcbiAgICB9LFxuICAgIFwiZ2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSXJpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWVpbGdlXCJcbiAgICB9LFxuICAgIFwiaWdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWdib1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFz4bulc+G7pSBJZ2JvXCJcbiAgICB9LFxuICAgIFwiaWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW51cGlhcVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIknDsXVwaWFxLCBJw7F1cGlhdHVuXCJcbiAgICB9LFxuICAgIFwiaW9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWRvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSWRvXCJcbiAgICB9LFxuICAgIFwiaXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWNlbGFuZGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiw41zbGVuc2thXCJcbiAgICB9LFxuICAgIFwiaXRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSXRhbGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkl0YWxpYW5vXCJcbiAgICB9LFxuICAgIFwiaXVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW51a3RpdHV0XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4ZCD4ZOE4ZKD4ZGO4ZGQ4ZGmXCJcbiAgICB9LFxuICAgIFwiamFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSmFwYW5lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLml6XmnKzoqp4gKOOBq+OBu+OCk+OBlO+8j+OBq+OBo+OBveOCk+OBlClcIlxuICAgIH0sXG4gICAgXCJqdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJKYXZhbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJhc2EgSmF3YVwiXG4gICAgfSxcbiAgICBcImtsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthbGFhbGxpc3V0LCBHcmVlbmxhbmRpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImthbGFhbGxpc3V0LCBrYWxhYWxsaXQgb3FhYXNpaVwiXG4gICAgfSxcbiAgICBcImtuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthbm5hZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgspXgsqjgs43gsqjgsqFcIlxuICAgIH0sXG4gICAgXCJrclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYW51cmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLYW51cmlcIlxuICAgIH0sXG4gICAgXCJrc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYXNobWlyaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkleCktuCljeCkruClgOCksOClgCwg2YPYtNmF2YrYsdmK4oCOXCJcbiAgICB9LFxuICAgIFwia2tcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2F6YWtoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0prQsNC30LDSmyDRgtGW0LvRllwiXG4gICAgfSxcbiAgICBcImttXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktobWVyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Z6X4Z624Z6f4Z624Z6B4Z+S4Z6Y4Z+C4Z6aXCJcbiAgICB9LFxuICAgIFwia2lcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2lrdXl1LCBHaWt1eXVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHxKlrxal5xalcIlxuICAgIH0sXG4gICAgXCJyd1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLaW55YXJ3YW5kYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIklraW55YXJ3YW5kYVwiXG4gICAgfSxcbiAgICBcImt5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpcmdoaXosIEt5cmd5elwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC60YvRgNCz0YvQtyDRgtC40LvQuFwiXG4gICAgfSxcbiAgICBcImt2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktvbWlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQutC+0LzQuCDQutGL0LJcIlxuICAgIH0sXG4gICAgXCJrZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLb25nb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktpS29uZ29cIlxuICAgIH0sXG4gICAgXCJrb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLb3JlYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLtlZzqta3slrQgKOmfk+Wci+iqniksIOyhsOyEoOunkCAo5pyd6a6u6KqeKVwiXG4gICAgfSxcbiAgICBcImt1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkt1cmRpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLdXJkw64sINmD2YjYsdiv24zigI5cIlxuICAgIH0sXG4gICAgXCJralwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLd2FueWFtYSwgS3VhbnlhbWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLdWFueWFtYVwiXG4gICAgfSxcbiAgICBcImxhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxhdGluXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwibGF0aW5lLCBsaW5ndWEgbGF0aW5hXCJcbiAgICB9LFxuICAgIFwibGJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTHV4ZW1ib3VyZ2lzaCwgTGV0emVidXJnZXNjaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkzDq3R6ZWJ1ZXJnZXNjaFwiXG4gICAgfSxcbiAgICBcImxnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkx1Z2FuZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMdWdhbmRhXCJcbiAgICB9LFxuICAgIFwibGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGltYnVyZ2lzaCwgTGltYnVyZ2FuLCBMaW1idXJnZXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMaW1idXJnc1wiXG4gICAgfSxcbiAgICBcImxuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxpbmdhbGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMaW5nw6FsYVwiXG4gICAgfSxcbiAgICBcImxvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxhb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC6nuC6suC6quC6suC6peC6suC6p1wiXG4gICAgfSxcbiAgICBcImx0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxpdGh1YW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJsaWV0dXZpxbMga2FsYmFcIlxuICAgIH0sXG4gICAgXCJsdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMdWJhLUthdGFuZ2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJcIlxuICAgIH0sXG4gICAgXCJsdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMYXR2aWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwibGF0dmllxaF1IHZhbG9kYVwiXG4gICAgfSxcbiAgICBcImd2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbnhcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWVsZywgR2FpbGNrXCJcbiAgICB9LFxuICAgIFwibWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFjZWRvbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC80LDQutC10LTQvtC90YHQutC4INGY0LDQt9C40LpcIlxuICAgIH0sXG4gICAgXCJtZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYWxhZ2FzeVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hbGFnYXN5IGZpdGVueVwiXG4gICAgfSxcbiAgICBcIm1zXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbGF5XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYmFoYXNhIE1lbGF5dSwg2KjZh9in2LMg2YXZhNin2YrZiOKAjlwiXG4gICAgfSxcbiAgICBcIm1sXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbGF5YWxhbVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC0ruC0suC0r+C0vuC0s+C0glwiXG4gICAgfSxcbiAgICBcIm10XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbHRlc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJNYWx0aVwiXG4gICAgfSxcbiAgICBcIm1pXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk3EgW9yaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInRlIHJlbyBNxIFvcmlcIlxuICAgIH0sXG4gICAgXCJtclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYXJhdGhpIChNYXLEgeG5rWjEqylcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpK7gpLDgpL7gpKDgpYBcIlxuICAgIH0sXG4gICAgXCJtaFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYXJzaGFsbGVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkthamluIE3Mp2FqZcS8XCJcbiAgICB9LFxuICAgIFwibW5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTW9uZ29saWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LzQvtC90LPQvtC7XCJcbiAgICB9LFxuICAgIFwibmFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTmF1cnVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFa2FrYWlyxakgTmFvZXJvXCJcbiAgICB9LFxuICAgIFwibnZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTmF2YWpvLCBOYXZhaG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJEaW7DqSBiaXphYWQsIERpbsOpa8q8ZWjHsMOtXCJcbiAgICB9LFxuICAgIFwibmJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9yd2VnaWFuIEJva23DpWxcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOb3JzayBib2ttw6VsXCJcbiAgICB9LFxuICAgIFwibmRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9ydGggTmRlYmVsZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImlzaU5kZWJlbGVcIlxuICAgIH0sXG4gICAgXCJuZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOZXBhbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpKjgpYfgpKrgpL7gpLLgpYBcIlxuICAgIH0sXG4gICAgXCJuZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOZG9uZ2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPd2FtYm9cIlxuICAgIH0sXG4gICAgXCJublwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW4gTnlub3Jza1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrIG55bm9yc2tcIlxuICAgIH0sXG4gICAgXCJub1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOb3Jza1wiXG4gICAgfSxcbiAgICBcImlpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk51b3N1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi6oaI6oyg6pK/IE51b3N1aHhvcFwiXG4gICAgfSxcbiAgICBcIm5yXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNvdXRoIE5kZWJlbGVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJpc2lOZGViZWxlXCJcbiAgICB9LFxuICAgIFwib2NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT2NjaXRhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk9jY2l0YW5cIlxuICAgIH0sXG4gICAgXCJvalwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPamlid2UsIE9qaWJ3YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGQiuGTguGUkeGTiOGQr+GSp+GQjuGTkFwiXG4gICAgfSxcbiAgICBcImN1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9sZCBDaHVyY2ggU2xhdm9uaWMsIENodXJjaCBTbGF2aWMsIENodXJjaCBTbGF2b25pYywgT2xkIEJ1bGdhcmlhbiwgT2xkIFNsYXZvbmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0anQt9GL0LrRiiDRgdC70L7QstGj0L3RjNGB0LrRilwiXG4gICAgfSxcbiAgICBcIm9tXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9yb21vXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZhYW4gT3JvbW9vXCJcbiAgICB9LFxuICAgIFwib3JcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT3JpeWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgrJPgrKHgrLzgrL/grIZcIlxuICAgIH0sXG4gICAgXCJvc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPc3NldGlhbiwgT3NzZXRpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC40YDQvtC9IMOm0LLQt9Cw0LNcIlxuICAgIH0sXG4gICAgXCJwYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQYW5qYWJpLCBQdW5qYWJpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Kiq4Kmw4Kic4Ki+4Kis4KmALCDZvtmG2KzYp9io24zigI5cIlxuICAgIH0sXG4gICAgXCJwaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQxIFsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkquCkvuCktOCkv1wiXG4gICAgfSxcbiAgICBcImZhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBlcnNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLZgdin2LHYs9uMXCJcbiAgICB9LFxuICAgIFwicGxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUG9saXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwicG9sc2tpXCJcbiAgICB9LFxuICAgIFwicHNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUGFzaHRvLCBQdXNodG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLZvtqa2KrZiFwiXG4gICAgfSxcbiAgICBcInB0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBvcnR1Z3Vlc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJQb3J0dWd1w6pzXCJcbiAgICB9LFxuICAgIFwicXVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUXVlY2h1YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlJ1bmEgU2ltaSwgS2ljaHdhXCJcbiAgICB9LFxuICAgIFwicm1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUm9tYW5zaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInJ1bWFudHNjaCBncmlzY2h1blwiXG4gICAgfSxcbiAgICBcInJuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpcnVuZGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJraVJ1bmRpXCJcbiAgICB9LFxuICAgIFwicm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUm9tYW5pYW4sIE1vbGRhdmlhbiwgTW9sZG92YW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJyb23Dom7Eg1wiXG4gICAgfSxcbiAgICBcInJ1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlJ1c3NpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgNGD0YHRgdC60LjQuSDRj9C30YvQulwiXG4gICAgfSxcbiAgICBcInNhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNhbnNrcml0IChTYeG5gXNr4bmbdGEpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KS44KSC4KS44KWN4KSV4KWD4KSk4KSu4KWNXCJcbiAgICB9LFxuICAgIFwic2NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2FyZGluaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic2FyZHVcIlxuICAgIH0sXG4gICAgXCJzZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTaW5kaGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLjgpL/gpKjgpY3gpKfgpYAsINiz2YbajNmK2Iwg2LPZhtiv2r7bjOKAjlwiXG4gICAgfSxcbiAgICBcInNlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcnRoZXJuIFNhbWlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJEYXZ2aXPDoW1lZ2llbGxhXCJcbiAgICB9LFxuICAgIFwic21cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2Ftb2FuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZ2FnYW5hIGZhYSBTYW1vYVwiXG4gICAgfSxcbiAgICBcInNnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNhbmdvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiecOibmfDoiB0w64gc8OkbmfDtlwiXG4gICAgfSxcbiAgICBcInNyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNlcmJpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgdGA0L/RgdC60Lgg0ZjQtdC30LjQulwiXG4gICAgfSxcbiAgICBcImdkXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNjb3R0aXNoIEdhZWxpYzsgR2FlbGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiR8OgaWRobGlnXCJcbiAgICB9LFxuICAgIFwic25cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2hvbmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJjaGlTaG9uYVwiXG4gICAgfSxcbiAgICBcInNpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNpbmhhbGEsIFNpbmhhbGVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC3g+C3kuC2guC3hOC2vVwiXG4gICAgfSxcbiAgICBcInNrXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNsb3Zha1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInNsb3ZlbsSNaW5hXCJcbiAgICB9LFxuICAgIFwic2xcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2xvdmVuZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInNsb3ZlbsWhxI1pbmFcIlxuICAgIH0sXG4gICAgXCJzb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTb21hbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTb29tYWFsaWdhLCBhZiBTb29tYWFsaVwiXG4gICAgfSxcbiAgICBcInN0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNvdXRoZXJuIFNvdGhvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2Vzb3Rob1wiXG4gICAgfSxcbiAgICBcImVzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNwYW5pc2g7IENhc3RpbGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImVzcGHDsW9sLCBjYXN0ZWxsYW5vXCJcbiAgICB9LFxuICAgIFwic3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3VuZGFuZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQmFzYSBTdW5kYVwiXG4gICAgfSxcbiAgICBcInN3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlN3YWhpbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLaXN3YWhpbGlcIlxuICAgIH0sXG4gICAgXCJzc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTd2F0aVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNpU3dhdGlcIlxuICAgIH0sXG4gICAgXCJzdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTd2VkaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic3ZlbnNrYVwiXG4gICAgfSxcbiAgICBcInRhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRhbWlsXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4K6k4K6u4K6/4K604K+NXCJcbiAgICB9LFxuICAgIFwidGVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGVsdWd1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LCk4LGG4LCy4LGB4LCX4LGBXCJcbiAgICB9LFxuICAgIFwidGdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFqaWtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgtC+0rfQuNC606MsIHRvxJ9pa8SrLCDYqtin2KzbjNqp24zigI5cIlxuICAgIH0sXG4gICAgXCJ0aFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUaGFpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LmE4LiX4LiiXCJcbiAgICB9LFxuICAgIFwidGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGlncmlueWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhibXhjI3hiK3hiptcIlxuICAgIH0sXG4gICAgXCJib1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUaWJldGFuIFN0YW5kYXJkLCBUaWJldGFuLCBDZW50cmFsXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4L2W4L284L2R4LyL4L2h4L2y4L2CXCJcbiAgICB9LFxuICAgIFwidGtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHVya21lblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlTDvHJrbWVuLCDQotKv0YDQutC80LXQvVwiXG4gICAgfSxcbiAgICBcInRsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRhZ2Fsb2dcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJXaWthbmcgVGFnYWxvZywg4ZyP4ZyS4ZyD4ZyF4ZyUIOGchuGchOGcjuGck+GchOGclFwiXG4gICAgfSxcbiAgICBcInRuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRzd2FuYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNldHN3YW5hXCJcbiAgICB9LFxuICAgIFwidG9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVG9uZ2EgKFRvbmdhIElzbGFuZHMpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZmFrYSBUb25nYVwiXG4gICAgfSxcbiAgICBcInRyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlR1cmtpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUw7xya8OnZVwiXG4gICAgfSxcbiAgICBcInRzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRzb25nYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlhpdHNvbmdhXCJcbiAgICB9LFxuICAgIFwidHRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGF0YXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgtCw0YLQsNGA0YfQsCwgdGF0YXLDp2EsINiq2KfYqtin2LHahtin4oCOXCJcbiAgICB9LFxuICAgIFwidHdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHdpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVHdpXCJcbiAgICB9LFxuICAgIFwidHlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFoaXRpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJSZW8gVGFoaXRpXCJcbiAgICB9LFxuICAgIFwidWdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVWlnaHVyLCBVeWdodXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJVecajdXJxyZksINim24fZiti624fYsdqG25XigI5cIlxuICAgIH0sXG4gICAgXCJ1a1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJVa3JhaW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRg9C60YDQsNGX0L3RgdGM0LrQsFwiXG4gICAgfSxcbiAgICBcInVyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlVyZHVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLYp9ix2K/ZiFwiXG4gICAgfSxcbiAgICBcInV6XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlV6YmVrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiemJlaywg0I7Qt9Cx0LXQuiwg2KPbh9iy2KjbkNmD4oCOXCJcbiAgICB9LFxuICAgIFwidmVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVmVuZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUc2hpdmVu4biTYVwiXG4gICAgfSxcbiAgICBcInZpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlZpZXRuYW1lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUaeG6v25nIFZp4buHdFwiXG4gICAgfSxcbiAgICBcInZvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlZvbGFww7xrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVm9sYXDDvGtcIlxuICAgIH0sXG4gICAgXCJ3YVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXYWxsb29uXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiV2Fsb25cIlxuICAgIH0sXG4gICAgXCJjeVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXZWxzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkN5bXJhZWdcIlxuICAgIH0sXG4gICAgXCJ3b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXb2xvZlwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIldvbGxvZlwiXG4gICAgfSxcbiAgICBcImZ5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldlc3Rlcm4gRnJpc2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkZyeXNrXCJcbiAgICB9LFxuICAgIFwieGhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiWGhvc2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJpc2lYaG9zYVwiXG4gICAgfSxcbiAgICBcInlpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIllpZGRpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLXmdeZ1rTXk9eZ16lcIlxuICAgIH0sXG4gICAgXCJ5b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJZb3J1YmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJZb3LDuWLDoVwiXG4gICAgfSxcbiAgICBcInphXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlpodWFuZywgQ2h1YW5nXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2HJryBjdWXFi8aFLCBTYXcgY3VlbmdoXCJcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2RhdGEvbGFuZ3VhZ2VzLmpzIiwiZXhwb3J0IGNvbnN0IGZpbHRlclR5cGVzPSB7XG4gICAgQUREX1JJR0hUOidBRERfUklHSFQnLFxuICAgIFJFTU9WRV9SSUdIVCA6ICdSRU1PVkVfUklHSFQnLFxuICAgIFVQREFURV9DT1VOVFJJRVMgOiAnVVBEQVRFX0NPVU5UUklFUycsXG4gICAgVVBEQVRFX0VYQ0xVU0lWRSA6ICdVUERBVEVfRVhDTFVTSVZFJyxcbiAgICBVUERBVEVfSU5DTFVERURfQ09VTlRSSUVTIDogJ1VQREFURV9JTkNMVURFRF9DT1VOVFJJRVMnLFxuICAgIFVQREFURV9TUE9SVCA6ICdVUERBVEVfU1BPUlQnLFxuICAgIFVQREFURV9FVkVOVCA6ICdVUERBVEVfRVZFTlQnLFxuICAgIENMRUFSIDogJ0NMRUFSJyxcbiAgICBDTEVBUl9VUERBVEUgOiAnQ0xFQVJfVVBEQVRFJyxcbiAgICBVUERBVEVfTUFOWSA6ICdVUERBVEVfTUFOWScsXG4gICAgVVBEQVRFX0ZJTFRFUlNfQ09ORklHOiBcIlVQREFURV9BTExcIixcbiAgICBVUERBVEVfRVZFTlRfREFURV9GUk9NX1RPOiBcIlVQREFURV9GUk9NX1RPXCIsXG59O1xuXG5jb25zdCBkZWZhdWx0RmlsdGVyID0ge1xuICAgIHJpZ2h0czogW10sXG4gICAgY291bnRyaWVzOiBbXSxcbiAgICBleGNsdXNpdmUgOiBmYWxzZSxcbiAgICBpbmNsdWRlQWxsQ291bnRyaWVzIDogZmFsc2UsXG4gICAgc3BvcnQ6IHtcbiAgICAgICAgdmFsdWUgOiBudWxsLFxuICAgICAgICBsYWJlbCA6IFwiQWxsIHNwb3J0c1wiXG4gICAgfSxcbiAgICBldmVudCA6IFwiXCIsXG4gICAgZm9yY2VVcGRhdGUgOiB0cnVlLFxuICAgIGV2ZW50RGF0ZUZyb206IFwiXCIsXG4gICAgZXZlbnREYXRlVG86IFwiXCJcbn07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSAoc3RhdGUgPSBkZWZhdWx0RmlsdGVyLCBhY3Rpb24pID0+IHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0lOQ0xVREVEX0NPVU5UUklFUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGVBbGxDb3VudHJpZXM6IGFjdGlvbi5pbmNsdWRlQWxsQ291bnRyaWVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5DTEVBUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGVmYXVsdEZpbHRlcik7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuQ0xFQVJfVVBEQVRFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZm9yY2VVcGRhdGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5BRERfUklHSFQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICByaWdodHM6IFsuLi5zdGF0ZS5yaWdodHMsIGFjdGlvbi5pZF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlJFTU9WRV9SSUdIVDpcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHN0YXRlLnJpZ2h0cy5pbmRleE9mKGFjdGlvbi5pZCk7XG4gICAgICAgICAgICBzdGF0ZS5yaWdodHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHJpZ2h0czogWy4uLnN0YXRlLnJpZ2h0c11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9DT1VOVFJJRVM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBjb3VudHJpZXM6IGFjdGlvbi5jb3VudHJpZXMubWFwKGM9PmMudmFsdWUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfRVZFTlRfREFURV9GUk9NX1RPOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7ZXZlbnREYXRlRnJvbTogYWN0aW9uLmZyb20sIGV2ZW50RGF0ZVRvOiBhY3Rpb24udG99KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfRVhDTFVTSVZFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZXhjbHVzaXZlOiBhY3Rpb24uZXhjbHVzaXZlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfU1BPUlQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzcG9ydDogYWN0aW9uLnNwb3J0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfRklMVEVSU19DT05GSUc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5maWx0ZXJzKTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfRVZFTlQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBldmVudDogYWN0aW9uLmV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfTUFOWTpcbiAgICAgICAgICAgIGFjdGlvbi5maWx0ZXJzLmZvcmNlVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChhY3Rpb24uZmlsdGVycy5yaWdodHMpIGFjdGlvbi5maWx0ZXJzLnJpZ2h0cyA9IGFjdGlvbi5maWx0ZXJzLnJpZ2h0cy5tYXAocj0+TnVtYmVyKHIpKTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uLmZpbHRlcnMpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2ZpbHRlci5qcyIsIlxuZXhwb3J0IGNvbnN0IG1hcmtldHBsYWNlVHlwZXM9IHtcbiAgICBURVNUOidURVNUJyxcbn07XG5cbmV4cG9ydCBjb25zdCBtYXJrZXRwbGFjZSA9IChzdGF0ZSA9IHtcbiAgICB0ZXN0SXRlbTogXCJtYXJrZXRwbGFjZVJlZHVjZXJcIlxuXG59LCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtYXJrZXRwbGFjZVR5cGVzLlRFU1Q6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICB0ZXN0OiBhY3Rpb24udGV4dCxcbiAgICAgICAgICAgICAgICBpZCA6IGFjdGlvbi5pZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2UuanMiLCIvKipcbiogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiovXG5cbmxldCBfX2FwaVN0b3JlID0ge1xuICAgIHRvdXJuYW1lbnRzIDoge31cbn07XG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuQ29udGVudEFyZW5hLkNvbnRlbnRBcGkgPSBDb250ZW50QXJlbmEuQ29udGVudEFwaXx8IHt9O1xuXG5Db250ZW50QXJlbmEuQ29udGVudEFwaT0ge1xuICAgIHNhdmVDb250ZW50QXNEcmFmdCAoIGNvbnRlbnQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvZHJhZnQvc2F2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzYXZlQ29udGVudEFzSW5hY3RpdmUgKCBjb250ZW50ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZy9zYXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNhdmVDb250ZW50QXNBY3RpdmUgKCBjb250ZW50ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZy9wdWJsaXNoXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlcHVibGlzaExpc3RpbmcgKCBjdXN0b21JZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmcvcmVwdWJsaXNoXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtjdXN0b21JZDogY3VzdG9tSWR9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzZW5kTWVzc2FnZSAoIG1lc3NhZ2UgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9tZXNzYWdlcy9zZW5kXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFVzZXJJbmZvICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL2luZm9cIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFVzZXJJbmZvQnlBY3RpdmF0aW9uQ29kZSAoIGFjdGl2YXRpb25Db2RlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9jb2RlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIGRhdGEgOiBKU09OLnN0cmluZ2lmeSh7YWN0aXZhdGlvbkNvZGU6IGFjdGl2YXRpb25Db2RlfSksXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q29tcGFueVVzZXJzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9jb21wYW55L3VzZXJzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB1cGRhdGVDb21wYW55ICggY29tcGFueSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2NvbXBhbnkvdXBkYXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtjb21wYW55OmNvbXBhbnl9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB1cGRhdGVQYXNzd29yZCAoIGRhdGEgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL3Bhc3N3b3JkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHVwZGF0ZVVzZXIgKCB1c2VyICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci91cGRhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXI6dXNlcn0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGFjdGl2YXRlVXNlciAoIHVzZXIsIHBhc3N3b3JkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9hY3RpdmF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcjp1c2VyLGlkOiB1c2VyLmlkLCBwYXNzd29yZCA6IHBhc3N3b3JkfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVVc2VyUHJvZmlsZSAoIHByb2ZpbGUgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL3Byb2ZpbGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3Byb2ZpbGU6cHJvZmlsZX0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRocmVhZCAoIGN1c3RvbUlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvdGhyZWFkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtjdXN0b21JZDogY3VzdG9tSWR9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRUaHJlYWRzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvdGhyZWFkc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcGxhY2VCaWQgKCBiaWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcGxhY2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBwbGFjZUJpZHMgKCBiaWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWRzL3BsYWNlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgYWNjZXB0QmlkICggYmlkLCBzaWduYXR1cmUsIHNpZ25hdHVyZU5hbWUsIHNpZ25hdHVyZVBvc2l0aW9uICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICBiaWQuc2lnbmF0dXJlID0gc2lnbmF0dXJlO1xuICAgICAgICBiaWQuc2lnbmF0dXJlTmFtZSA9IHNpZ25hdHVyZU5hbWU7XG4gICAgICAgIGJpZC5zaWduYXR1cmVQb3NpdGlvbiA9IHNpZ25hdHVyZVBvc2l0aW9uO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvYWNjZXB0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVqZWN0QmlkICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3JlamVjdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlbW92ZUJpZCAoIGJpZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZW1vdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIHNhdmVUbXBGaWxlICggZmlsZXMgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlc1swXSk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9zYXZlL2ZpbGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzYXZlQXR0YWNobWVudEZpbGUgKCBmaWxlcyApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBkYXRhLmFwcGVuZCgnZmlsZScsIGZpbGVzWzBdKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L3NhdmUvYXR0YWNobWVudFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGQUlMRURcIilcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVtb3ZlQXR0YWNobWVudEZpbGUgKCBmaWxlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvcmVtb3ZlL2F0dGFjaG1lbnRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGZpbGUgOiBmaWxlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGQUlMRURcIilcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0QnlDdXN0b21JZCAoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJsaXN0aW5nL2RldGFpbHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgZ2V0RHJhZnRMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZHJhZnRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEluYWN0aXZlTGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2luYWN0aXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBY3RpdmVMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvYWN0aXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRFeHBpcmVkTGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2V4cGlyZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlbW92ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvcmVtb3ZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBkdXBsaWNhdGVMaXN0aW5nKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2R1cGxpY2F0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZGVhY3RpdmF0ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZGVhY3RpdmF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgYXJjaGl2ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvYXJjaGl2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBnZXRDbG9zZWREZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9jbG9zZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBbGxEZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9hbGxcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRQZW5kaW5nRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcGVuZGluZ1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFJlamVjdGVkRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcmVqZWN0ZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRXYXRjaGxpc3RMaXN0aW5ncyAoKXtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL3dhdGNobGlzdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbn07XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmNvbnRlbnQuanMiLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG4vKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxubGV0IF9fYXBpU3RvcmUgPSB7XG4gICAgdG91cm5hbWVudHMgOiB7fVxufTtcblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5cbkNvbnRlbnRBcmVuYS5BcGk9IHtcbiAgICBzb3J0QnlMYWJlbCAoYSwgYikge1xuICAgICAgICByZXR1cm4gKGEubmFtZSA+IGIubmFtZSkgPyAxIDogKChiLm5hbWUgPiBhLm5hbWUpID8gLTEgOiAwKVxuICAgIH0sXG4gICAgc29ydEJ5U3BvcnQgKGEsIGIpIHtcblxuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lID4gYi5zcG9ydC5uYW1lKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEuc3BvcnQubmFtZSA8IGIuc3BvcnQubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5zcG9ydENhdGVnb3J5Lm5hbWUgPiBiLnNwb3J0Q2F0ZWdvcnkubmFtZSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLnNwb3J0Q2F0ZWdvcnkubmFtZSA8IGIuc3BvcnRDYXRlZ29yeS5uYW1lKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLm5hbWUgPiBiLm5hbWUpIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5uYW1lIDwgYi5uYW1lKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiAwO1xuXG4gICAgfSxcbiAgICBwcmVwYXJlTGlzdCAoIGxpc3QsIGNhdGVnb3J5SWQgKSB7XG5cbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICBsaXN0ID0gJC5tYXAobGlzdCwgZnVuY3Rpb24gKGl0ZW0pIHtcblxuICAgICAgICAgICAgLy8gRmlsdGVyIGJ5IGNhdGVnb3J5XG4gICAgICAgICAgICBpZiAoIGNhdGVnb3J5SWQgJiYgaXRlbS5jYXRlZ29yeVsnQGF0dHJpYnV0ZXMnXS5pZCAhPSBjYXRlZ29yeUlkKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWR9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3Quc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG5cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfSxcbiAgICBmaWx0ZXJEb3VibGVzICggbGlzdCwgc3BvcnRJZCApe1xuICAgICAgICBsZXQgbmFtZXMgPSBbXTtcblxuICAgICAgICBpZiAoIHNwb3J0SWQgPT09IFwic3I6c3BvcnQ6NVwiICl7XG4gICAgICAgICAgICBsaXN0ID0gbGlzdC5tYXAoaXRlbT0+e1xuICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGl0ZW0ubmFtZS5yZXBsYWNlKC8gc2luZ2xlcy9naSwnJykucmVwbGFjZSgvIGRvdWJsZS9naSwnJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9KS5maWx0ZXIoaXRlbT0+e1xuICAgICAgICAgICAgICAgIGlmIChuYW1lcy5pbmRleE9mKGl0ZW0ubmFtZSkgPT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgbmFtZXMucHVzaChpdGVtLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfSxcbiAgICBnZXRDb21wYW55VGVybXMgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3Rlcm1zL2NvbXBhbnlcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgZ2V0Q29tcGFueURlZmluaXRpb25zICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9kZWZpbml0aW9ucy9jb21wYW55XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIHJlc3RvcmVDb21wYW55VGVybXMgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3Rlcm1zL3Jlc3RvcmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgcmVzdG9yZURlZmluaXRpb25zICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9kZWZpbml0aW9ucy9yZXN0b3JlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZVRlcm1zICggdGVybXMsIGRlZmluaXRpb25zICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdGVybXMvdXBkYXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7XG4gICAgICAgICAgICAgICAgdGVybXMgOiB0ZXJtcyxcbiAgICAgICAgICAgICAgICBkZWZpbml0aW9ucyA6IGRlZmluaXRpb25zXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvbnRlbnQgKCBmaWx0ZXIpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L3NlYXJjaFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEpzb25Db250ZW50ICggZmlsdGVyKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImxpc3RpbmdzL21hcmtldHBsYWNlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiBmaWx0ZXIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2F2ZUZpbHRlciAoIGZpbHRlcikge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJidXkvZmlsdGVyL3NhdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IGZpbHRlcixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDb3VudHJpZXMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAoIENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcyAmJiBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvY291bnRyaWVzL2FsbFwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlLm1hcChjPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBjLnJlZ2lvbnMgPSBjLnJlZ2lvbnMubWFwKHI9PnIuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5leHRlcm5hbElkID0gYy5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjXG5cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcyA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFjdGl2ZVNwb3J0cyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3Nwb3J0cy9hY3RpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0QWxsU3BvcnRzIChmbGFncykge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9zcG9ydHMvYWxsXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBmbGFnczogZmxhZ3MsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0U3BvcnRzR3JvdXBzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvc3BvcnRzL2dyb3Vwc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDb3VudHJpZXNGdWxsICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvY291bnRyaWVzL2Z1bGxcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VGVycml0b3JpZXMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC90ZXJyaXRvcmllc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRSZWdpb25zICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvcmVnaW9uc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRSaWdodHMgKHJpZ2h0c1BhY2thZ2UsIGdyb3VwKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3JpZ2h0c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDoge1xuICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2U6IHJpZ2h0c1BhY2thZ2UsXG4gICAgICAgICAgICAgICAgZ3JvdXA6IGdyb3VwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRSaWdodHNQYWNrYWdlIChyaWdodHNQYWNrYWdlLCBncm91cCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9yaWdodHMtcGFja2FnZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDoge1xuICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2U6IHJpZ2h0c1BhY2thZ2UsXG4gICAgICAgICAgICAgICAgZ3JvdXA6IGdyb3VwXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRTcG9ydHMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZXh0ZXJuYWxBcGlVcmwgKyBcInYxL2ZlZWQvc3BvcnRzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3tzcG9ydDpvYmplY3R9fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIHZhciBzcG9ydHMgPSBfdGhpcy5wcmVwYXJlTGlzdCggcmVzcG9uc2Uuc3BvcnQpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoc3BvcnRzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q29udGVudERldGFpbHMoIGlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L2RldGFpbHMvXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtpZCA6IGlkfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRQZW5kaW5nTGlzdGluZ3MoIGlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L3BlbmRpbmctbGlzdGluZ3MvXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtpZCA6IGlkfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDYXRlZ29yaWVzICggc3BvcnRJZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICBsaXN0ID0gW10sXG4gICAgICAgICAgICBjYXRzID0gW107XG5cbiAgICAgICAgX3RoaXMuZ2V0VG91cm5hbWVudHMoc3BvcnRJZCkuZG9uZShmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmICggISBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoIFtdICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaXN0ID0gJC5tYXAoIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0udG91cm5hbWVudCAsIGZ1bmN0aW9uIChpdGVtKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBpdGVtLmNhdGVnb3J5WydAYXR0cmlidXRlcyddLmlkO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBjYXRzLmluZGV4T2YoaWQpICE9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2F0cy5wdXNoKCBpZCApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5jYXRlZ29yeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfdGhpcy5wcmVwYXJlTGlzdChsaXN0KSApO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRUb3VybmFtZW50cyAoIHNwb3J0SWQsIGNhdGVnb3J5SWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzLCBzdG9yZWRSZXNwb25zZTtcblxuICAgICAgICBpZiAoIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gIT09IHVuZGVmaW5lZCApe1xuXG4gICAgICAgICAgICBzdG9yZWRSZXNwb25zZSA9IF90aGlzLnByZXBhcmVMaXN0KF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0udG91cm5hbWVudCwgY2F0ZWdvcnlJZClcbiAgICAgICAgICAgIHN0b3JlZFJlc3BvbnNlID0gX3RoaXMuZmlsdGVyRG91YmxlcyhzdG9yZWRSZXNwb25zZSxzcG9ydElkKTtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoc3RvcmVkUmVzcG9uc2UpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3RvdXJuYW1lbnRzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogc3BvcnRJZCB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3t0b3VybmFtZW50czp7dG91cm5hbWVudDpBcnJheX19fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIC8vIEEgY29tbWVudFxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2UudG91cm5hbWVudHMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS50b3VybmFtZW50cy50b3VybmFtZW50ID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoW10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSA9IHJlc3BvbnNlLnRvdXJuYW1lbnRzO1xuXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSBfdGhpcy5wcmVwYXJlTGlzdChyZXNwb25zZS50b3VybmFtZW50cy50b3VybmFtZW50LCBjYXRlZ29yeUlkKTtcbiAgICAgICAgICAgICAgICBsaXN0ID0gX3RoaXMuZmlsdGVyRG91YmxlcyhsaXN0LCBzcG9ydElkKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFNlYXNvbnMgKCB0b3VybmFtZW50SWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3NlYXNvbnNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiB0b3VybmFtZW50SWQgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGlzdDtcblxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc2Vhc29ucyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uID09PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoICQuaXNBcnJheShyZXNwb25zZS5zZWFzb25zLnNlYXNvbikgKXtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9ICQubWFwKHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmREYXRlOiBpdGVtWydAYXR0cmlidXRlcyddLmVuZF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zdGFydF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10ueWVhcixcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsSWQ6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uZW5kX2RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLnN0YXJ0X2RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50SWQ6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLnRvdXJuYW1lbnRfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS55ZWFyLFxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0U2NoZWR1bGUgKCBzZWFzb25JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZXh0ZXJuYWxBcGlVcmwgKyBcInYxL2ZlZWQvc2NoZWR1bGVzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogc2Vhc29uSWQgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zcG9ydF9ldmVudHMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5zcG9ydF9ldmVudHMuc3BvcnRfZXZlbnQgPT09IHVuZGVmaW5lZCApIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNwb3J0X2V2ZW50cy5zcG9ydF9ldmVudC5mb3JFYWNoKCAoaXRlbSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3VuZCAgPSAoaXRlbS50b3VybmFtZW50X3JvdW5kKSA/IGl0ZW0udG91cm5hbWVudF9yb3VuZFsnQGF0dHJpYnV0ZXMnXSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyb3VuZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gKHJvdW5kLm51bWJlcikgPyBcInJvdW5kX1wiICsgcm91bmQubnVtYmVyIDogcm91bmQubmFtZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoICFsaXN0W25hbWVdICkgbGlzdFtuYW1lXSA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggIWxpc3RbbmFtZV0ubWF0Y2hlcyApIGxpc3RbbmFtZV0ubWF0Y2hlcyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAgICAgICAgICAgICBsaXN0W25hbWVdLm1hdGNoZXMuc2V0KGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWQse1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkOiBpdGVtWydAYXR0cmlidXRlcyddLnNjaGVkdWxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudFJvdW5kIDogcm91bmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wZXRpdG9ycyA6IChpdGVtLmNvbXBldGl0b3JzKSA/IGl0ZW0uY29tcGV0aXRvcnMuY29tcGV0aXRvci5tYXAoKCBjb21wZXRpdG9yKT0+eyByZXR1cm4gY29tcGV0aXRvclsnQGF0dHJpYnV0ZXMnXSAgfSkgIDogbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzZWFyY2hDb21wZXRpdGlvbihyZXF1ZXN0KSB7XG5cbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArICdhcGkvc2VhcmNoL3RvdXJuYW1lbnQnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiByZXF1ZXN0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJhZGl0aW9uYWw6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBkYXRhLmZpbHRlcihpdGVtID0+ICEhaXRlbS5zcG9ydCkuc29ydChfdGhpcy5zb3J0QnlTcG9ydCk7XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHdhdGNobGlzdCggaWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS93YXRjaGxpc3QvYWRkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtpZCA6IGlkfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXROb3RpZmljYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAke2Vudmhvc3R1cmx9YXBpL25vdGlmaWNhdGlvbnMvYCk7XG4gICAgfSxcbiAgICBtYXJrTm90aWZpY2F0aW9uQXNTZWVuKGlkKSB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KGAke2Vudmhvc3R1cmx9YXBpL25vdGlmaWNhdGlvbnMvc2VlbmAsIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgIH0pO1xuICAgIH0sXG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5qcyIsIi8qKlxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiAqL1xuXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcblxuQ29udGVudEFyZW5hLkRhdGEgPSBDb250ZW50QXJlbmEuRGF0YSB8fCB7fTtcbkNvbnRlbnRBcmVuYS5MYW5ndWFnZXMgPSBDb250ZW50QXJlbmEuTGFuZ3VhZ2VzIHx8IHt9O1xuXG5Db250ZW50QXJlbmEuRGF0YS5Ub3BTcG9ydHMgPSBbXG4gICAgeyBuYW1lIDogXCJTb2NjZXJcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoxXCJ9LFxuICAgIHsgbmFtZSA6IFwiQmFza2V0YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjJcIn0sXG4gICAgeyBuYW1lIDogXCJCYXNlYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjNcIn0sXG4gICAgeyBuYW1lIDogXCJUZW5uaXNcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDo1XCJ9LFxuICAgIHsgbmFtZSA6IFwiQ3JpY2tldFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIxXCJ9LFxuICAgIHsgbmFtZSA6IFwiRmllbGQgSG9ja2V5XCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjRcIn0sXG4gICAgeyBuYW1lIDogXCJWb2xsZXliYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjNcIn0sXG4gICAgeyBuYW1lIDogXCJUYWJsZSBUZW5uaXNcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMFwifSxcbiAgICB7IG5hbWUgOiBcIkdvbGZcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDo5XCJ9LFxuICAgIHsgbmFtZSA6IFwiQW1lcmljYW4gRm9vdGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoxNlwifSxcbiAgICB7IG5hbWUgOiBcIkhhbmRiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6NlwifVxuXTtcblxuQ29udGVudEFyZW5hLkRhdGEuRnVsbFNwb3J0cyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuQWN0aXZlU3BvcnRzID0gW107XG5Db250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMgPSBbXTtcbkNvbnRlbnRBcmVuYS5EYXRhLlRlcnJpdG9yaWVzID0gW107XG5Db250ZW50QXJlbmEuRGF0YS5SZWdpb25zID0gW107XG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzLlNob3J0ID0ge1xuICAgIFwibWRyXCI6IFwiTWFuZGFyaW5cIixcbiAgICBcImVzXCI6IFwiU3BhbmlzaFwiLFxuICAgIFwiZW5cIjogXCJFbmdsaXNoXCIsXG4gICAgXCJoaVwiOiBcIkhpbmRpXCIsXG4gICAgXCJhclwiOiBcIkFyYWJpY1wiLFxuICAgIFwicHRcIjogXCJQb3J0dWd1ZXNlXCIsXG4gICAgXCJiblwiOiBcIkJlbmdhbGlcIixcbiAgICBcInJ1XCI6IFwiUnVzc2lhblwiLFxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxuICAgIFwianZcIjogXCJKYXZhbmVzZVwiLFxuICAgIFwiZGVcIjogXCJHZXJtYW5cIixcbiAgICBcImFsbFwiIDogXCJTaG93IEFsbFwiXG59O1xuXG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzLkxvbmcgPSB7XG4gICAgXCJhYVwiOiBcIkFmYXJcIixcbiAgICBcImFmXCI6IFwiQWZyaWthYW5zXCIsXG4gICAgXCJhaW5cIjogXCJBaW51XCIsXG4gICAgXCJha3pcIjogXCJBbGFiYW1hXCIsXG4gICAgXCJzcVwiOiBcIkFsYmFuaWFuXCIsXG4gICAgXCJhbGVcIjogXCJBbGV1dFwiLFxuICAgIFwiYXJxXCI6IFwiQWxnZXJpYW4gQXJhYmljXCIsXG4gICAgXCJlbl9VU1wiOiBcIkFtZXJpY2FuIEVuZ2xpc2hcIixcbiAgICBcImFzZVwiOiBcIkFtZXJpY2FuIFNpZ24gTGFuZ3VhZ2VcIixcbiAgICBcImFtXCI6IFwiQW1oYXJpY1wiLFxuICAgIFwiZWd5XCI6IFwiQW5jaWVudCBFZ3lwdGlhblwiLFxuICAgIFwiZ3JjXCI6IFwiQW5jaWVudCBHcmVla1wiLFxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcbiAgICBcImFyY1wiOiBcIkFyYW1haWNcIixcbiAgICBcImFycFwiOiBcIkFyYXBhaG9cIixcbiAgICBcImFyd1wiOiBcIkFyYXdha1wiLFxuICAgIFwiaHlcIjogXCJBcm1lbmlhblwiLFxuICAgIFwiYXNcIjogXCJBc3NhbWVzZVwiLFxuICAgIFwiYXNhXCI6IFwiQXN1XCIsXG4gICAgXCJlbl9BVVwiOiBcIkF1c3RyYWxpYW4gRW5nbGlzaFwiLFxuICAgIFwiZGVfQVRcIjogXCJBdXN0cmlhbiBHZXJtYW5cIixcbiAgICBcImF5XCI6IFwiQXltYXJhXCIsXG4gICAgXCJhelwiOiBcIkF6ZXJiYWlqYW5pXCIsXG4gICAgXCJiYW5cIjogXCJCYWxpbmVzZVwiLFxuICAgIFwiZXVcIjogXCJCYXNxdWVcIixcbiAgICBcImJhclwiOiBcIkJhdmFyaWFuXCIsXG4gICAgXCJiZVwiOiBcIkJlbGFydXNpYW5cIixcbiAgICBcImJuXCI6IFwiQmVuZ2FsaVwiLFxuICAgIFwiYmlrXCI6IFwiQmlrb2xcIixcbiAgICBcImJpblwiOiBcIkJpbmlcIixcbiAgICBcImJzXCI6IFwiQm9zbmlhblwiLFxuICAgIFwiYnJoXCI6IFwiQnJhaHVpXCIsXG4gICAgXCJicmFcIjogXCJCcmFqXCIsXG4gICAgXCJwdF9CUlwiOiBcIkJyYXppbGlhbiBQb3J0dWd1ZXNlXCIsXG4gICAgXCJiclwiOiBcIkJyZXRvblwiLFxuICAgIFwiZW5fR0JcIjogXCJCcml0aXNoIEVuZ2xpc2hcIixcbiAgICBcImJnXCI6IFwiQnVsZ2FyaWFuXCIsXG4gICAgXCJteVwiOiBcIkJ1cm1lc2VcIixcbiAgICBcImZyY1wiOiBcIkNhanVuIEZyZW5jaFwiLFxuICAgIFwiZW5fQ0FcIjogXCJDYW5hZGlhbiBFbmdsaXNoXCIsXG4gICAgXCJmcl9DQVwiOiBcIkNhbmFkaWFuIEZyZW5jaFwiLFxuICAgIFwieXVlXCI6IFwiQ2FudG9uZXNlXCIsXG4gICAgXCJjYXJcIjogXCJDYXJpYlwiLFxuICAgIFwiY2FcIjogXCJDYXRhbGFuXCIsXG4gICAgXCJjYXlcIjogXCJDYXl1Z2FcIixcbiAgICBcImNlYlwiOiBcIkNlYnVhbm9cIixcbiAgICBcInNodVwiOiBcIkNoYWRpYW4gQXJhYmljXCIsXG4gICAgXCJjZVwiOiBcIkNoZWNoZW5cIixcbiAgICBcImNoclwiOiBcIkNoZXJva2VlXCIsXG4gICAgXCJxdWdcIjogXCJDaGltYm9yYXpvIEhpZ2hsYW5kIFF1aWNodWFcIixcbiAgICBcInpoXCI6IFwiQ2hpbmVzZVwiLFxuICAgIFwiY2huXCI6IFwiQ2hpbm9vayBKYXJnb25cIixcbiAgICBcImNocFwiOiBcIkNoaXBld3lhblwiLFxuICAgIFwiY2hvXCI6IFwiQ2hvY3Rhd1wiLFxuICAgIFwiY3VcIjogXCJDaHVyY2ggU2xhdmljXCIsXG4gICAgXCJjdlwiOiBcIkNodXZhc2hcIixcbiAgICBcIm53Y1wiOiBcIkNsYXNzaWNhbCBOZXdhcmlcIixcbiAgICBcInN5Y1wiOiBcIkNsYXNzaWNhbCBTeXJpYWNcIixcbiAgICBcInN3Y1wiOiBcIkNvbmdvIFN3YWhpbGlcIixcbiAgICBcImNvcFwiOiBcIkNvcHRpY1wiLFxuICAgIFwia3dcIjogXCJDb3JuaXNoXCIsXG4gICAgXCJjb1wiOiBcIkNvcnNpY2FuXCIsXG4gICAgXCJjclwiOiBcIkNyZWVcIixcbiAgICBcIm11c1wiOiBcIkNyZWVrXCIsXG4gICAgXCJjcmhcIjogXCJDcmltZWFuIFR1cmtpc2hcIixcbiAgICBcImhyXCI6IFwiQ3JvYXRpYW5cIixcbiAgICBcImNzXCI6IFwiQ3plY2hcIixcbiAgICBcImRha1wiOiBcIkRha290YVwiLFxuICAgIFwiZGFcIjogXCJEYW5pc2hcIixcbiAgICBcImRlbFwiOiBcIkRlbGF3YXJlXCIsXG4gICAgXCJubFwiOiBcIkR1dGNoXCIsXG4gICAgXCJmcnNcIjogXCJFYXN0ZXJuIEZyaXNpYW5cIixcbiAgICBcImFyelwiOiBcIkVneXB0aWFuIEFyYWJpY1wiLFxuICAgIFwiZW5cIjogXCJFbmdsaXNoXCIsXG4gICAgXCJlb1wiOiBcIkVzcGVyYW50b1wiLFxuICAgIFwiZXRcIjogXCJFc3RvbmlhblwiLFxuICAgIFwicHRfUFRcIjogXCJFdXJvcGVhbiBQb3J0dWd1ZXNlXCIsXG4gICAgXCJlc19FU1wiOiBcIkV1cm9wZWFuIFNwYW5pc2hcIixcbiAgICBcImVlXCI6IFwiRXdlXCIsXG4gICAgXCJmYW5cIjogXCJGYW5nXCIsXG4gICAgXCJoaWZcIjogXCJGaWppIEhpbmRpXCIsXG4gICAgXCJmalwiOiBcIkZpamlhblwiLFxuICAgIFwiZmlsXCI6IFwiRmlsaXBpbm9cIixcbiAgICBcImZpXCI6IFwiRmlubmlzaFwiLFxuICAgIFwibmxfQkVcIjogXCJGbGVtaXNoXCIsXG4gICAgXCJmb25cIjogXCJGb25cIixcbiAgICBcImZyXCI6IFwiRnJlbmNoXCIsXG4gICAgXCJnYWFcIjogXCJHYVwiLFxuICAgIFwiZ2FuXCI6IFwiR2FuIENoaW5lc2VcIixcbiAgICBcImthXCI6IFwiR2VvcmdpYW5cIixcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXG4gICAgXCJnb3RcIjogXCJHb3RoaWNcIixcbiAgICBcImdyYlwiOiBcIkdyZWJvXCIsXG4gICAgXCJlbFwiOiBcIkdyZWVrXCIsXG4gICAgXCJnblwiOiBcIkd1YXJhbmlcIixcbiAgICBcImd1XCI6IFwiR3VqYXJhdGlcIixcbiAgICBcImd1elwiOiBcIkd1c2lpXCIsXG4gICAgXCJoYWlcIjogXCJIYWlkYVwiLFxuICAgIFwiaHRcIjogXCJIYWl0aWFuXCIsXG4gICAgXCJoYWtcIjogXCJIYWtrYSBDaGluZXNlXCIsXG4gICAgXCJoYVwiOiBcIkhhdXNhXCIsXG4gICAgXCJoYXdcIjogXCJIYXdhaWlhblwiLFxuICAgIFwiaGVcIjogXCJIZWJyZXdcIixcbiAgICBcImh6XCI6IFwiSGVyZXJvXCIsXG4gICAgXCJoaVwiOiBcIkhpbmRpXCIsXG4gICAgXCJoaXRcIjogXCJIaXR0aXRlXCIsXG4gICAgXCJobW5cIjogXCJIbW9uZ1wiLFxuICAgIFwiaHVcIjogXCJIdW5nYXJpYW5cIixcbiAgICBcImlzXCI6IFwiSWNlbGFuZGljXCIsXG4gICAgXCJpb1wiOiBcIklkb1wiLFxuICAgIFwiaWdcIjogXCJJZ2JvXCIsXG4gICAgXCJpdVwiOiBcIkludWt0aXR1dFwiLFxuICAgIFwiaWtcIjogXCJJbnVwaWFxXCIsXG4gICAgXCJnYVwiOiBcIklyaXNoXCIsXG4gICAgXCJpdFwiOiBcIkl0YWxpYW5cIixcbiAgICBcImphbVwiOiBcIkphbWFpY2FuIENyZW9sZSBFbmdsaXNoXCIsXG4gICAgXCJqYVwiOiBcIkphcGFuZXNlXCIsXG4gICAgXCJqdlwiOiBcIkphdmFuZXNlXCIsXG4gICAgXCJrYWpcIjogXCJKanVcIixcbiAgICBcImR5b1wiOiBcIkpvbGEtRm9ueWlcIixcbiAgICBcInhhbFwiOiBcIkthbG15a1wiLFxuICAgIFwia2FtXCI6IFwiS2FtYmFcIixcbiAgICBcImtibFwiOiBcIkthbmVtYnVcIixcbiAgICBcImtuXCI6IFwiS2FubmFkYVwiLFxuICAgIFwia3JcIjogXCJLYW51cmlcIixcbiAgICBcImthYVwiOiBcIkthcmEtS2FscGFrXCIsXG4gICAgXCJrcmNcIjogXCJLYXJhY2hheS1CYWxrYXJcIixcbiAgICBcImtybFwiOiBcIkthcmVsaWFuXCIsXG4gICAgXCJrc1wiOiBcIkthc2htaXJpXCIsXG4gICAgXCJjc2JcIjogXCJLYXNodWJpYW5cIixcbiAgICBcImthd1wiOiBcIkthd2lcIixcbiAgICBcImtrXCI6IFwiS2F6YWtoXCIsXG4gICAgXCJrZW5cIjogXCJLZW55YW5nXCIsXG4gICAgXCJraGFcIjogXCJLaGFzaVwiLFxuICAgIFwia21cIjogXCJLaG1lclwiLFxuICAgIFwia2hvXCI6IFwiS2hvdGFuZXNlXCIsXG4gICAgXCJraHdcIjogXCJLaG93YXJcIixcbiAgICBcImtpXCI6IFwiS2lrdXl1XCIsXG4gICAgXCJrbWJcIjogXCJLaW1idW5kdVwiLFxuICAgIFwia3JqXCI6IFwiS2luYXJheS1hXCIsXG4gICAgXCJyd1wiOiBcIktpbnlhcndhbmRhXCIsXG4gICAgXCJraXVcIjogXCJLaXJtYW5qa2lcIixcbiAgICBcInRsaFwiOiBcIktsaW5nb25cIixcbiAgICBcImJrbVwiOiBcIktvbVwiLFxuICAgIFwia3ZcIjogXCJLb21pXCIsXG4gICAgXCJrb2lcIjogXCJLb21pLVBlcm15YWtcIixcbiAgICBcImtnXCI6IFwiS29uZ29cIixcbiAgICBcImtva1wiOiBcIktvbmthbmlcIixcbiAgICBcImtvXCI6IFwiS29yZWFuXCIsXG4gICAgXCJrZm9cIjogXCJLb3JvXCIsXG4gICAgXCJrb3NcIjogXCJLb3NyYWVhblwiLFxuICAgIFwiYXZrXCI6IFwiS290YXZhXCIsXG4gICAgXCJraHFcIjogXCJLb3lyYSBDaGlpbmlcIixcbiAgICBcInNlc1wiOiBcIktveXJhYm9ybyBTZW5uaVwiLFxuICAgIFwia3BlXCI6IFwiS3BlbGxlXCIsXG4gICAgXCJrcmlcIjogXCJLcmlvXCIsXG4gICAgXCJralwiOiBcIkt1YW55YW1hXCIsXG4gICAgXCJrdW1cIjogXCJLdW15a1wiLFxuICAgIFwia3VcIjogXCJLdXJkaXNoXCIsXG4gICAgXCJrcnVcIjogXCJLdXJ1a2hcIixcbiAgICBcImt1dFwiOiBcIkt1dGVuYWlcIixcbiAgICBcIm5tZ1wiOiBcIkt3YXNpb1wiLFxuICAgIFwia3lcIjogXCJLeXJneXpcIixcbiAgICBcInF1Y1wiOiBcIktcXHUwMmJjaWNoZVxcdTAyYmNcIixcbiAgICBcImxhZFwiOiBcIkxhZGlub1wiLFxuICAgIFwibGFoXCI6IFwiTGFobmRhXCIsXG4gICAgXCJsa3RcIjogXCJMYWtvdGFcIixcbiAgICBcImxhbVwiOiBcIkxhbWJhXCIsXG4gICAgXCJsYWdcIjogXCJMYW5naVwiLFxuICAgIFwibG9cIjogXCJMYW9cIixcbiAgICBcImx0Z1wiOiBcIkxhdGdhbGlhblwiLFxuICAgIFwibGFcIjogXCJMYXRpblwiLFxuICAgIFwiZXNfNDE5XCI6IFwiTGF0aW4gQW1lcmljYW4gU3BhbmlzaFwiLFxuICAgIFwibHZcIjogXCJMYXR2aWFuXCIsXG4gICAgXCJsenpcIjogXCJMYXpcIixcbiAgICBcImxlelwiOiBcIkxlemdoaWFuXCIsXG4gICAgXCJsaWpcIjogXCJMaWd1cmlhblwiLFxuICAgIFwibGlcIjogXCJMaW1idXJnaXNoXCIsXG4gICAgXCJsblwiOiBcIkxpbmdhbGFcIixcbiAgICBcImxmblwiOiBcIkxpbmd1YSBGcmFuY2EgTm92YVwiLFxuICAgIFwibHpoXCI6IFwiTGl0ZXJhcnkgQ2hpbmVzZVwiLFxuICAgIFwibHRcIjogXCJMaXRodWFuaWFuXCIsXG4gICAgXCJsaXZcIjogXCJMaXZvbmlhblwiLFxuICAgIFwiamJvXCI6IFwiTG9qYmFuXCIsXG4gICAgXCJsbW9cIjogXCJMb21iYXJkXCIsXG4gICAgXCJuZHNcIjogXCJMb3cgR2VybWFuXCIsXG4gICAgXCJzbGlcIjogXCJMb3dlciBTaWxlc2lhblwiLFxuICAgIFwiZHNiXCI6IFwiTG93ZXIgU29yYmlhblwiLFxuICAgIFwibG96XCI6IFwiTG96aVwiLFxuICAgIFwibHVcIjogXCJMdWJhLUthdGFuZ2FcIixcbiAgICBcImx1YVwiOiBcIkx1YmEtTHVsdWFcIixcbiAgICBcImx1aVwiOiBcIkx1aXNlbm9cIixcbiAgICBcInNtalwiOiBcIkx1bGUgU2FtaVwiLFxuICAgIFwibHVuXCI6IFwiTHVuZGFcIixcbiAgICBcImx1b1wiOiBcIkx1b1wiLFxuICAgIFwibGJcIjogXCJMdXhlbWJvdXJnaXNoXCIsXG4gICAgXCJsdXlcIjogXCJMdXlpYVwiLFxuICAgIFwibWRlXCI6IFwiTWFiYVwiLFxuICAgIFwibWtcIjogXCJNYWNlZG9uaWFuXCIsXG4gICAgXCJqbWNcIjogXCJNYWNoYW1lXCIsXG4gICAgXCJtYWRcIjogXCJNYWR1cmVzZVwiLFxuICAgIFwibWFmXCI6IFwiTWFmYVwiLFxuICAgIFwibWFnXCI6IFwiTWFnYWhpXCIsXG4gICAgXCJ2bWZcIjogXCJNYWluLUZyYW5jb25pYW5cIixcbiAgICBcIm1haVwiOiBcIk1haXRoaWxpXCIsXG4gICAgXCJtYWtcIjogXCJNYWthc2FyXCIsXG4gICAgXCJtZ2hcIjogXCJNYWtodXdhLU1lZXR0b1wiLFxuICAgIFwia2RlXCI6IFwiTWFrb25kZVwiLFxuICAgIFwibWdcIjogXCJNYWxhZ2FzeVwiLFxuICAgIFwibXNcIjogXCJNYWxheVwiLFxuICAgIFwibWxcIjogXCJNYWxheWFsYW1cIixcbiAgICBcIm10XCI6IFwiTWFsdGVzZVwiLFxuICAgIFwibW5jXCI6IFwiTWFuY2h1XCIsXG4gICAgXCJtZHJcIjogXCJNYW5kYXJpblwiLFxuICAgIFwibWFuXCI6IFwiTWFuZGluZ29cIixcbiAgICBcIm1uaVwiOiBcIk1hbmlwdXJpXCIsXG4gICAgXCJndlwiOiBcIk1hbnhcIixcbiAgICBcIm1pXCI6IFwiTWFvcmlcIixcbiAgICBcImFyblwiOiBcIk1hcHVjaGVcIixcbiAgICBcIm1yXCI6IFwiTWFyYXRoaVwiLFxuICAgIFwiY2htXCI6IFwiTWFyaVwiLFxuICAgIFwibWhcIjogXCJNYXJzaGFsbGVzZVwiLFxuICAgIFwibXdyXCI6IFwiTWFyd2FyaVwiLFxuICAgIFwibWFzXCI6IFwiTWFzYWlcIixcbiAgICBcIm16blwiOiBcIk1hemFuZGVyYW5pXCIsXG4gICAgXCJieXZcIjogXCJNZWR1bWJhXCIsXG4gICAgXCJtZW5cIjogXCJNZW5kZVwiLFxuICAgIFwibXd2XCI6IFwiTWVudGF3YWlcIixcbiAgICBcIm1lclwiOiBcIk1lcnVcIixcbiAgICBcIm1nb1wiOiBcIk1ldGFcXHUwMmJjXCIsXG4gICAgXCJlc19NWFwiOiBcIk1leGljYW4gU3BhbmlzaFwiLFxuICAgIFwibWljXCI6IFwiTWljbWFjXCIsXG4gICAgXCJkdW1cIjogXCJNaWRkbGUgRHV0Y2hcIixcbiAgICBcImVubVwiOiBcIk1pZGRsZSBFbmdsaXNoXCIsXG4gICAgXCJmcm1cIjogXCJNaWRkbGUgRnJlbmNoXCIsXG4gICAgXCJnbWhcIjogXCJNaWRkbGUgSGlnaCBHZXJtYW5cIixcbiAgICBcIm1nYVwiOiBcIk1pZGRsZSBJcmlzaFwiLFxuICAgIFwibmFuXCI6IFwiTWluIE5hbiBDaGluZXNlXCIsXG4gICAgXCJtaW5cIjogXCJNaW5hbmdrYWJhdVwiLFxuICAgIFwieG1mXCI6IFwiTWluZ3JlbGlhblwiLFxuICAgIFwibXdsXCI6IFwiTWlyYW5kZXNlXCIsXG4gICAgXCJsdXNcIjogXCJNaXpvXCIsXG4gICAgXCJhcl8wMDFcIjogXCJNb2Rlcm4gU3RhbmRhcmQgQXJhYmljXCIsXG4gICAgXCJtb2hcIjogXCJNb2hhd2tcIixcbiAgICBcIm1kZlwiOiBcIk1va3NoYVwiLFxuICAgIFwicm9fTURcIjogXCJNb2xkYXZpYW5cIixcbiAgICBcImxvbFwiOiBcIk1vbmdvXCIsXG4gICAgXCJtblwiOiBcIk1vbmdvbGlhblwiLFxuICAgIFwibWZlXCI6IFwiTW9yaXN5ZW5cIixcbiAgICBcImFyeVwiOiBcIk1vcm9jY2FuIEFyYWJpY1wiLFxuICAgIFwibW9zXCI6IFwiTW9zc2lcIixcbiAgICBcIm11bFwiOiBcIk11bHRpcGxlIExhbmd1YWdlc1wiLFxuICAgIFwibXVhXCI6IFwiTXVuZGFuZ1wiLFxuICAgIFwidHR0XCI6IFwiTXVzbGltIFRhdFwiLFxuICAgIFwibXllXCI6IFwiTXllbmVcIixcbiAgICBcIm5hcVwiOiBcIk5hbWFcIixcbiAgICBcIm5hXCI6IFwiTmF1cnVcIixcbiAgICBcIm52XCI6IFwiTmF2YWpvXCIsXG4gICAgXCJuZ1wiOiBcIk5kb25nYVwiLFxuICAgIFwibmFwXCI6IFwiTmVhcG9saXRhblwiLFxuICAgIFwibmVcIjogXCJOZXBhbGlcIixcbiAgICBcIm5ld1wiOiBcIk5ld2FyaVwiLFxuICAgIFwic2JhXCI6IFwiTmdhbWJheVwiLFxuICAgIFwibm5oXCI6IFwiTmdpZW1ib29uXCIsXG4gICAgXCJqZ29cIjogXCJOZ29tYmFcIixcbiAgICBcInlybFwiOiBcIk5oZWVuZ2F0dVwiLFxuICAgIFwibmlhXCI6IFwiTmlhc1wiLFxuICAgIFwibml1XCI6IFwiTml1ZWFuXCIsXG4gICAgXCJ6eHhcIjogXCJObyBsaW5ndWlzdGljIGNvbnRlbnRcIixcbiAgICBcIm5vZ1wiOiBcIk5vZ2FpXCIsXG4gICAgXCJuZFwiOiBcIk5vcnRoIE5kZWJlbGVcIixcbiAgICBcImZyclwiOiBcIk5vcnRoZXJuIEZyaXNpYW5cIixcbiAgICBcInNlXCI6IFwiTm9ydGhlcm4gU2FtaVwiLFxuICAgIFwibnNvXCI6IFwiTm9ydGhlcm4gU290aG9cIixcbiAgICBcIm5vXCI6IFwiTm9yd2VnaWFuXCIsXG4gICAgXCJuYlwiOiBcIk5vcndlZ2lhbiBCb2ttXFx1MDBlNWxcIixcbiAgICBcIm5uXCI6IFwiTm9yd2VnaWFuIE55bm9yc2tcIixcbiAgICBcIm5vdlwiOiBcIk5vdmlhbFwiLFxuICAgIFwibnVzXCI6IFwiTnVlclwiLFxuICAgIFwibnltXCI6IFwiTnlhbXdlemlcIixcbiAgICBcIm55XCI6IFwiTnlhbmphXCIsXG4gICAgXCJueW5cIjogXCJOeWFua29sZVwiLFxuICAgIFwidG9nXCI6IFwiTnlhc2EgVG9uZ2FcIixcbiAgICBcIm55b1wiOiBcIk55b3JvXCIsXG4gICAgXCJuemlcIjogXCJOemltYVwiLFxuICAgIFwibnFvXCI6IFwiTlxcdTAyYmNLb1wiLFxuICAgIFwib2NcIjogXCJPY2NpdGFuXCIsXG4gICAgXCJvalwiOiBcIk9qaWJ3YVwiLFxuICAgIFwiYW5nXCI6IFwiT2xkIEVuZ2xpc2hcIixcbiAgICBcImZyb1wiOiBcIk9sZCBGcmVuY2hcIixcbiAgICBcImdvaFwiOiBcIk9sZCBIaWdoIEdlcm1hblwiLFxuICAgIFwic2dhXCI6IFwiT2xkIElyaXNoXCIsXG4gICAgXCJub25cIjogXCJPbGQgTm9yc2VcIixcbiAgICBcInBlb1wiOiBcIk9sZCBQZXJzaWFuXCIsXG4gICAgXCJwcm9cIjogXCJPbGQgUHJvdmVuXFx1MDBlN2FsXCIsXG4gICAgXCJvclwiOiBcIk9yaXlhXCIsXG4gICAgXCJvbVwiOiBcIk9yb21vXCIsXG4gICAgXCJvc2FcIjogXCJPc2FnZVwiLFxuICAgIFwib3NcIjogXCJPc3NldGljXCIsXG4gICAgXCJvdGFcIjogXCJPdHRvbWFuIFR1cmtpc2hcIixcbiAgICBcInBhbFwiOiBcIlBhaGxhdmlcIixcbiAgICBcInBmbFwiOiBcIlBhbGF0aW5lIEdlcm1hblwiLFxuICAgIFwicGF1XCI6IFwiUGFsYXVhblwiLFxuICAgIFwicGlcIjogXCJQYWxpXCIsXG4gICAgXCJwZGNcIjogXCJQZW5uc3lsdmFuaWEgR2VybWFuXCIsXG4gICAgXCJmYVwiOiBcIlBlcnNpYW5cIixcbiAgICBcInBoblwiOiBcIlBob2VuaWNpYW5cIixcbiAgICBcInBjZFwiOiBcIlBpY2FyZFwiLFxuICAgIFwicG1zXCI6IFwiUGllZG1vbnRlc2VcIixcbiAgICBcInBkdFwiOiBcIlBsYXV0ZGlldHNjaFwiLFxuICAgIFwicG9uXCI6IFwiUG9obnBlaWFuXCIsXG4gICAgXCJwbFwiOiBcIlBvbGlzaFwiLFxuICAgIFwicG50XCI6IFwiUG9udGljXCIsXG4gICAgXCJwdFwiOiBcIlBvcnR1Z3Vlc2VcIixcbiAgICBcInByZ1wiOiBcIlBydXNzaWFuXCIsXG4gICAgXCJwYVwiOiBcIlB1bmphYmlcIixcbiAgICBcInF1XCI6IFwiUXVlY2h1YVwiLFxuICAgIFwicm9cIjogXCJSb21hbmlhblwiLFxuICAgIFwicm1cIjogXCJSb21hbnNoXCIsXG4gICAgXCJyb21cIjogXCJSb21hbnlcIixcbiAgICBcInJvb3RcIjogXCJSb290XCIsXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcbiAgICBcInJ3a1wiOiBcIlJ3YVwiLFxuICAgIFwic2FoXCI6IFwiU2FraGFcIixcbiAgICBcInNhbVwiOiBcIlNhbWFyaXRhbiBBcmFtYWljXCIsXG4gICAgXCJzbVwiOiBcIlNhbW9hblwiLFxuICAgIFwic2NvXCI6IFwiU2NvdHNcIixcbiAgICBcImdkXCI6IFwiU2NvdHRpc2ggR2FlbGljXCIsXG4gICAgXCJzbHlcIjogXCJTZWxheWFyXCIsXG4gICAgXCJzZWxcIjogXCJTZWxrdXBcIixcbiAgICBcInNlaFwiOiBcIlNlbmFcIixcbiAgICBcInNlZVwiOiBcIlNlbmVjYVwiLFxuICAgIFwic3JcIjogXCJTZXJiaWFuXCIsXG4gICAgXCJzaFwiOiBcIlNlcmJvLUNyb2F0aWFuXCIsXG4gICAgXCJzcnJcIjogXCJTZXJlclwiLFxuICAgIFwic2VpXCI6IFwiU2VyaVwiLFxuICAgIFwia3NiXCI6IFwiU2hhbWJhbGFcIixcbiAgICBcInNoblwiOiBcIlNoYW5cIixcbiAgICBcInNuXCI6IFwiU2hvbmFcIixcbiAgICBcImlpXCI6IFwiU2ljaHVhbiBZaVwiLFxuICAgIFwic2NuXCI6IFwiU2ljaWxpYW5cIixcbiAgICBcInNpZFwiOiBcIlNpZGFtb1wiLFxuICAgIFwiYmxhXCI6IFwiU2lrc2lrYVwiLFxuICAgIFwic3psXCI6IFwiU2lsZXNpYW5cIixcbiAgICBcInpoX0hhbnNcIjogXCJTaW1wbGlmaWVkIENoaW5lc2VcIixcbiAgICBcInNkXCI6IFwiU2luZGhpXCIsXG4gICAgXCJzaVwiOiBcIlNpbmhhbGFcIixcbiAgICBcInNtc1wiOiBcIlNrb2x0IFNhbWlcIixcbiAgICBcImRlblwiOiBcIlNsYXZlXCIsXG4gICAgXCJza1wiOiBcIlNsb3Zha1wiLFxuICAgIFwic2xcIjogXCJTbG92ZW5pYW5cIixcbiAgICBcInhvZ1wiOiBcIlNvZ2FcIixcbiAgICBcInNvZ1wiOiBcIlNvZ2RpZW5cIixcbiAgICBcInNvXCI6IFwiU29tYWxpXCIsXG4gICAgXCJzbmtcIjogXCJTb25pbmtlXCIsXG4gICAgXCJja2JcIjogXCJTb3JhbmkgS3VyZGlzaFwiLFxuICAgIFwiYXpiXCI6IFwiU291dGggQXplcmJhaWphbmlcIixcbiAgICBcIm5yXCI6IFwiU291dGggTmRlYmVsZVwiLFxuICAgIFwiYWx0XCI6IFwiU291dGhlcm4gQWx0YWlcIixcbiAgICBcInNtYVwiOiBcIlNvdXRoZXJuIFNhbWlcIixcbiAgICBcInN0XCI6IFwiU291dGhlcm4gU290aG9cIixcbiAgICBcImVzXCI6IFwiU3BhbmlzaFwiLFxuICAgIFwic3JuXCI6IFwiU3JhbmFuIFRvbmdvXCIsXG4gICAgXCJ6Z2hcIjogXCJTdGFuZGFyZCBNb3JvY2NhbiBUYW1hemlnaHRcIixcbiAgICBcInN1a1wiOiBcIlN1a3VtYVwiLFxuICAgIFwic3V4XCI6IFwiU3VtZXJpYW5cIixcbiAgICBcInN1XCI6IFwiU3VuZGFuZXNlXCIsXG4gICAgXCJzdXNcIjogXCJTdXN1XCIsXG4gICAgXCJzd1wiOiBcIlN3YWhpbGlcIixcbiAgICBcInNzXCI6IFwiU3dhdGlcIixcbiAgICBcInN2XCI6IFwiU3dlZGlzaFwiLFxuICAgIFwiZnJfQ0hcIjogXCJTd2lzcyBGcmVuY2hcIixcbiAgICBcImdzd1wiOiBcIlN3aXNzIEdlcm1hblwiLFxuICAgIFwiZGVfQ0hcIjogXCJTd2lzcyBIaWdoIEdlcm1hblwiLFxuICAgIFwic3lyXCI6IFwiU3lyaWFjXCIsXG4gICAgXCJzaGlcIjogXCJUYWNoZWxoaXRcIixcbiAgICBcInRsXCI6IFwiVGFnYWxvZ1wiLFxuICAgIFwidHlcIjogXCJUYWhpdGlhblwiLFxuICAgIFwiZGF2XCI6IFwiVGFpdGFcIixcbiAgICBcInRnXCI6IFwiVGFqaWtcIixcbiAgICBcInRseVwiOiBcIlRhbHlzaFwiLFxuICAgIFwidG1oXCI6IFwiVGFtYXNoZWtcIixcbiAgICBcInRhXCI6IFwiVGFtaWxcIixcbiAgICBcInRydlwiOiBcIlRhcm9rb1wiLFxuICAgIFwidHdxXCI6IFwiVGFzYXdhcVwiLFxuICAgIFwidHRcIjogXCJUYXRhclwiLFxuICAgIFwidGVcIjogXCJUZWx1Z3VcIixcbiAgICBcInRlclwiOiBcIlRlcmVub1wiLFxuICAgIFwidGVvXCI6IFwiVGVzb1wiLFxuICAgIFwidGV0XCI6IFwiVGV0dW1cIixcbiAgICBcInRoXCI6IFwiVGhhaVwiLFxuICAgIFwiYm9cIjogXCJUaWJldGFuXCIsXG4gICAgXCJ0aWdcIjogXCJUaWdyZVwiLFxuICAgIFwidGlcIjogXCJUaWdyaW55YVwiLFxuICAgIFwidGVtXCI6IFwiVGltbmVcIixcbiAgICBcInRpdlwiOiBcIlRpdlwiLFxuICAgIFwidGxpXCI6IFwiVGxpbmdpdFwiLFxuICAgIFwidHBpXCI6IFwiVG9rIFBpc2luXCIsXG4gICAgXCJ0a2xcIjogXCJUb2tlbGF1XCIsXG4gICAgXCJ0b1wiOiBcIlRvbmdhblwiLFxuICAgIFwiZml0XCI6IFwiVG9ybmVkYWxlbiBGaW5uaXNoXCIsXG4gICAgXCJ6aF9IYW50XCI6IFwiVHJhZGl0aW9uYWwgQ2hpbmVzZVwiLFxuICAgIFwidGtyXCI6IFwiVHNha2h1clwiLFxuICAgIFwidHNkXCI6IFwiVHNha29uaWFuXCIsXG4gICAgXCJ0c2lcIjogXCJUc2ltc2hpYW5cIixcbiAgICBcInRzXCI6IFwiVHNvbmdhXCIsXG4gICAgXCJ0blwiOiBcIlRzd2FuYVwiLFxuICAgIFwidGN5XCI6IFwiVHVsdVwiLFxuICAgIFwidHVtXCI6IFwiVHVtYnVrYVwiLFxuICAgIFwiYWViXCI6IFwiVHVuaXNpYW4gQXJhYmljXCIsXG4gICAgXCJ0clwiOiBcIlR1cmtpc2hcIixcbiAgICBcInRrXCI6IFwiVHVya21lblwiLFxuICAgIFwidHJ1XCI6IFwiVHVyb3lvXCIsXG4gICAgXCJ0dmxcIjogXCJUdXZhbHVcIixcbiAgICBcInR5dlwiOiBcIlR1dmluaWFuXCIsXG4gICAgXCJ0d1wiOiBcIlR3aVwiLFxuICAgIFwia2NnXCI6IFwiVHlhcFwiLFxuICAgIFwidWRtXCI6IFwiVWRtdXJ0XCIsXG4gICAgXCJ1Z2FcIjogXCJVZ2FyaXRpY1wiLFxuICAgIFwidWtcIjogXCJVa3JhaW5pYW5cIixcbiAgICBcInVtYlwiOiBcIlVtYnVuZHVcIixcbiAgICBcInVuZFwiOiBcIlVua25vd24gTGFuZ3VhZ2VcIixcbiAgICBcImhzYlwiOiBcIlVwcGVyIFNvcmJpYW5cIixcbiAgICBcInVyXCI6IFwiVXJkdVwiLFxuICAgIFwidWdcIjogXCJVeWdodXJcIixcbiAgICBcInV6XCI6IFwiVXpiZWtcIixcbiAgICBcInZhaVwiOiBcIlZhaVwiLFxuICAgIFwidmVcIjogXCJWZW5kYVwiLFxuICAgIFwidmVjXCI6IFwiVmVuZXRpYW5cIixcbiAgICBcInZlcFwiOiBcIlZlcHNcIixcbiAgICBcInZpXCI6IFwiVmlldG5hbWVzZVwiLFxuICAgIFwidm9cIjogXCJWb2xhcFxcdTAwZmNrXCIsXG4gICAgXCJ2cm9cIjogXCJWXFx1MDBmNXJvXCIsXG4gICAgXCJ2b3RcIjogXCJWb3RpY1wiLFxuICAgIFwidnVuXCI6IFwiVnVuam9cIixcbiAgICBcIndhXCI6IFwiV2FsbG9vblwiLFxuICAgIFwid2FlXCI6IFwiV2Fsc2VyXCIsXG4gICAgXCJ3YXJcIjogXCJXYXJheVwiLFxuICAgIFwid2FzXCI6IFwiV2FzaG9cIixcbiAgICBcImd1Y1wiOiBcIldheXV1XCIsXG4gICAgXCJjeVwiOiBcIldlbHNoXCIsXG4gICAgXCJ2bHNcIjogXCJXZXN0IEZsZW1pc2hcIixcbiAgICBcImZ5XCI6IFwiV2VzdGVybiBGcmlzaWFuXCIsXG4gICAgXCJtcmpcIjogXCJXZXN0ZXJuIE1hcmlcIixcbiAgICBcIndhbFwiOiBcIldvbGF5dHRhXCIsXG4gICAgXCJ3b1wiOiBcIldvbG9mXCIsXG4gICAgXCJ3dXVcIjogXCJXdSBDaGluZXNlXCIsXG4gICAgXCJ4aFwiOiBcIlhob3NhXCIsXG4gICAgXCJoc25cIjogXCJYaWFuZyBDaGluZXNlXCIsXG4gICAgXCJ5YXZcIjogXCJZYW5nYmVuXCIsXG4gICAgXCJ5YW9cIjogXCJZYW9cIixcbiAgICBcInlhcFwiOiBcIllhcGVzZVwiLFxuICAgIFwieWJiXCI6IFwiWWVtYmFcIixcbiAgICBcInlpXCI6IFwiWWlkZGlzaFwiLFxuICAgIFwieW9cIjogXCJZb3J1YmFcIixcbiAgICBcInphcFwiOiBcIlphcG90ZWNcIixcbiAgICBcImRqZVwiOiBcIlphcm1hXCIsXG4gICAgXCJ6emFcIjogXCJaYXphXCIsXG4gICAgXCJ6ZWFcIjogXCJaZWVsYW5kaWNcIixcbiAgICBcInplblwiOiBcIlplbmFnYVwiLFxuICAgIFwiemFcIjogXCJaaHVhbmdcIixcbiAgICBcImdielwiOiBcIlpvcm9hc3RyaWFuIERhcmlcIixcbiAgICBcInp1XCI6IFwiWnVsdVwiLFxuICAgIFwienVuXCI6IFwiWnVuaVwiXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmRhdGEuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vbWFpbi9zdG9yZSc7XG5cblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5Db250ZW50QXJlbmEuVXRpbHMgPSB7XG5cbiAgICBjb250ZW50UGFyc2VyRnJvbVNlcnZlcihjb250ZW50KSB7XG5cbiAgICAgICAgaWYgKCBjb250ZW50LnBhcnNlZCApIHJldHVybiBjb250ZW50O1xuXG4gICAgICAgIGxldCBzb3J0ID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIGNvbnRlbnQuZXh0cmFEYXRhKXtcbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGNvbnRlbnQuZXh0cmFEYXRhKS5mb3JFYWNoKFxuICAgICAgICAgICAgICAgIChba2V5LCB2YWx1ZV0pID0+IGNvbnRlbnRba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGVudC50b3VybmFtZW50ID0gKGNvbnRlbnQudG91cm5hbWVudCkgPyBBcnJheS5pc0FycmF5KGNvbnRlbnQudG91cm5hbWVudCk/IGNvbnRlbnQudG91cm5hbWVudCA6IFtjb250ZW50LnRvdXJuYW1lbnRdIDogW107XG4gICAgICAgIGNvbnRlbnQuc3BvcnRDYXRlZ29yeSA9IChjb250ZW50LnNwb3J0Q2F0ZWdvcnkpID8gQXJyYXkuaXNBcnJheShjb250ZW50LnNwb3J0Q2F0ZWdvcnkpPyBjb250ZW50LnNwb3J0Q2F0ZWdvcnkgOiBbY29udGVudC5zcG9ydENhdGVnb3J5XSA6IFtdO1xuXG4gICAgICAgIGlmIChjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0KXtcbiAgICAgICAgICAgIGNvbnRlbnQucmlnaHRzUGFja2FnZS5mb3JFYWNoKCAocnApID0+IHtcbiAgICAgICAgICAgICAgICBycC5zZWxlY3RlZFJpZ2h0cyA9IGNvbnRlbnQuc2VsZWN0ZWRSaWdodHNCeVN1cGVyUmlnaHRbcnAuaWRdWydpdGVtcyddO1xuICAgICAgICAgICAgICAgIHJwLmV4Y2x1c2l2ZSA9IGNvbnRlbnQuc2VsZWN0ZWRSaWdodHNCeVN1cGVyUmlnaHRbcnAuaWRdWydleGNsdXNpdmUnXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbil7XG4gICAgICAgICAgICBjb250ZW50LnNlYXNvbnMuZm9yRWFjaCggKHMsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBzLmZpeHR1cmVzID0gY29udGVudC5maXh0dXJlc0J5U2Vhc29uW2ldXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50Lmxhdyl7XG4gICAgICAgICAgICBjb250ZW50Lmxhdy5sYWJlbCA9IGNvbnRlbnQubGF3Lm5hbWU7XG4gICAgICAgICAgICBjb250ZW50Lmxhdy52YWx1ZSA9IGNvbnRlbnQubGF3Lm5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGNvbnRlbnQuY3VzdG9tQnVuZGxlcyApIHtcbiAgICAgICAgICAgIGNvbnRlbnQuY3VzdG9tQnVuZGxlcy5mb3JFYWNoKChzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzcC5zYWxlc01ldGhvZCkgc3Auc2FsZXNNZXRob2QgPSBzcC5zYWxlc01ldGhvZC5uYW1lO1xuICAgICAgICAgICAgICAgIGlmIChzcC5leGNsdWRlZENvdW50cmllcykgc3AuZXhjbHVkZWRUZXJyaXRvcmllcyA9IHNwLmV4Y2x1ZGVkQ291bnRyaWVzLm1hcCh0PT57cmV0dXJue2xhYmVsOnQubmFtZSwgdmFsdWU6dC5uYW1lLCByZWdpb25zOnQucmVnaW9ucywgdGVycml0b3J5SWQ6dC50ZXJyaXRvcnlJZH19KVxuICAgICAgICAgICAgICAgIGlmIChzcC50ZXJyaXRvcmllcykgc3AudGVycml0b3JpZXMgPSBzcC50ZXJyaXRvcmllcy5tYXAodD0+e3JldHVybntuYW1lOnQubmFtZSxsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZSwgcmVnaW9uczp0LnJlZ2lvbnMsIHRlcnJpdG9yeUlkOnQudGVycml0b3J5SWR9fSlcbiAgICAgICAgICAgICAgICBpZiAoIXNwLnRlcnJpdG9yaWVzKSBzb3J0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3AuaW5zdGFsbG1lbnRzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwLmluc3RhbGxtZW50cy5mb3JFYWNoKGk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaS5kYXRlKSBpLmRhdGUgPSBtb21lbnQoaS5kYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKXt9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggY29udGVudC5zYWxlc1BhY2thZ2VzICkge1xuICAgICAgICAgICAgY29udGVudC5zYWxlc1BhY2thZ2VzLmZvckVhY2goKHNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNwLnNhbGVzTWV0aG9kKSBzcC5zYWxlc01ldGhvZCA9IHNwLnNhbGVzTWV0aG9kLm5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKHNwLmV4Y2x1ZGVkQ291bnRyaWVzKSBzcC5leGNsdWRlZFRlcnJpdG9yaWVzID0gc3AuZXhjbHVkZWRDb3VudHJpZXMubWFwKHQ9PntyZXR1cm57bGFiZWw6dC5uYW1lLCB2YWx1ZTp0Lm5hbWUsIHJlZ2lvbnM6dC5yZWdpb25zLCB0ZXJyaXRvcnlJZDp0LnRlcnJpdG9yeUlkfX0pXG4gICAgICAgICAgICAgICAgaWYgKHNwLnRlcnJpdG9yaWVzKSBzcC50ZXJyaXRvcmllcyA9IHNwLnRlcnJpdG9yaWVzLm1hcCh0PT57cmV0dXJue2xhYmVsOnQubmFtZSwgdmFsdWU6dC5uYW1lLCByZWdpb25zOnQucmVnaW9ucywgdGVycml0b3J5SWQ6dC50ZXJyaXRvcnlJZH19KVxuICAgICAgICAgICAgICAgIGlmICghc3AudGVycml0b3JpZXMpIHNvcnQgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwLmluc3RhbGxtZW50cyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcC5pbnN0YWxsbWVudHMuZm9yRWFjaChpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkuZGF0ZSkgaS5kYXRlID0gbW9tZW50KGkuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSl7fVxuXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNvcnQpIGNvbnRlbnQuc2FsZXNQYWNrYWdlcy5zb3J0KHRoaXMuc29ydFNhbGVzUGFja2FnZXMpLnJldmVyc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50LmVuZERhdGUpIGNvbnRlbnQuZW5kRGF0ZSA9IG1vbWVudChjb250ZW50LmVuZERhdGUpO1xuICAgICAgICBpZiAoY29udGVudC5zdGFydERhdGUpIGNvbnRlbnQuc3RhcnREYXRlID0gbW9tZW50KGNvbnRlbnQuc3RhcnREYXRlKTtcbiAgICAgICAgaWYgKGNvbnRlbnQuc2lnbmF0dXJlKSBjb250ZW50LnNpZ25hdHVyZSA9IGhvc3R1cmwgKyBjb250ZW50LnNpZ25hdHVyZTtcblxuICAgICAgICBjb250ZW50LnN0ZXAgPSBOdW1iZXIoY29udGVudC5zdGVwKTtcbiAgICAgICAgY29udGVudC5jdXN0b21TZWFzb25zID0gY29udGVudC5zZWFzb25zLmZpbHRlcihzPT57XG4gICAgICAgICAgICByZXR1cm4gcy5leHRlcm5hbElkICYmIHMuZXh0ZXJuYWxJZC5zdGFydHNXaXRoKFwiY2E6XCIpXG4gICAgICAgIH0pLm1hcCgocyxpKT0+e1xuICAgICAgICAgICAgbGV0IHllYXJzO1xuICAgICAgICAgICAgaWYgKHMueWVhcil7XG4gICAgICAgICAgICAgICAgeWVhcnMgPSBzLnllYXIuc3BsaXQoXCIvXCIpO1xuICAgICAgICAgICAgICAgIHMuZnJvbSA9IHllYXJzLmxlbmd0aCA9PT0gMSA/IHllYXJzWzBdIDogMjAwMCArIE51bWJlcih5ZWFyc1swXSk7XG4gICAgICAgICAgICAgICAgcy50byA9IHllYXJzLmxlbmd0aCA9PT0gMSA/IG51bGwgOiAyMDAwICsgTnVtYmVyKHllYXJzWzFdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbil7XG4gICAgICAgICAgICAgICAgcy5maXh0dXJlcyA9IGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbltpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgY29udGVudC5zZWFzb25zID0gY29udGVudC5zZWFzb25zLm1hcChzPT57XG4gICAgICAgICAgICBpZiAoIHMuZXh0ZXJuYWxJZCAmJiBzLmV4dGVybmFsSWQuc3RhcnRzV2l0aChcImNhOlwiKSApe1xuICAgICAgICAgICAgICAgIHMuY3VzdG9tID0gdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29udGVudC5leHRyYURhdGEgJiYgY29udGVudC5leHRyYURhdGEuc2Vhc29uRHVyYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tU2Vhc29uRHVyID0gY29udGVudC5leHRyYURhdGEuc2Vhc29uRHVyYXRpb25zW3MuZXh0ZXJuYWxJZF07XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VzdG9tU2Vhc29uRHVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuY3VzdG9tU3RhcnREYXRlID0gY3VzdG9tU2Vhc29uRHVyLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgcy5jdXN0b21FbmREYXRlID0gY3VzdG9tU2Vhc29uRHVyLmVuZERhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcztcblxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdXNlciA9IHN0b3JlLmdldFN0YXRlKCkudXNlcjtcblxuICAgICAgICBpZiAoIWNvbnRlbnQuc2lnbmF0dXJlTmFtZSkgY29udGVudC5zaWduYXR1cmVOYW1lID0gdXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXIubGFzdE5hbWU7XG4gICAgICAgIGlmICghY29udGVudC5zaWduYXR1cmVQb3NpdGlvbikgY29udGVudC5zaWduYXR1cmVQb3NpdGlvbiA9IHVzZXIudGl0bGU7XG5cbiAgICAgICAgY29udGVudC5wYXJzZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0sXG5cbiAgICBmaWx0ZXJDb21wYW55SW5mbyhkYXRhKXtcblxuICAgICAgICBsZXQgY29tcGFueSA9IHt9O1xuXG4gICAgICAgIGNvbXBhbnkubGVnYWxOYW1lID0gZGF0YS5sZWdhbE5hbWU7XG4gICAgICAgIGNvbXBhbnkucmVnaXN0cmF0aW9uTnVtYmVyID0gZGF0YS5yZWdpc3RyYXRpb25OdW1iZXI7XG4gICAgICAgIGNvbXBhbnkudmF0ID0gZGF0YS52YXQ7XG4gICAgICAgIGNvbXBhbnkuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgICAgY29tcGFueS5hZGRyZXNzMiA9IGRhdGEuYWRkcmVzczI7XG4gICAgICAgIGNvbXBhbnkuY2l0eSA9IGRhdGEuY2l0eTtcbiAgICAgICAgY29tcGFueS56aXAgPSBkYXRhLnppcDtcbiAgICAgICAgY29tcGFueS5jb3VudHJ5ID0gZGF0YS5jb3VudHJ5O1xuXG4gICAgICAgIHJldHVybiBjb21wYW55O1xuICAgIH0sXG5cbiAgICBzb3J0U2FsZXNQYWNrYWdlcyAoYSwgYil7XG4gICAgICAgIGxldCBjID0gKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoYSA+IGIpID8gMSA6ICgoYiA+IGEpID8gLTEgOiAwKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYyhhLnRlcnJpdG9yaWVzLmxlbmd0aCwgYi50ZXJyaXRvcmllcy5sZW5ndGgpIHx8IGMoYi5uYW1lLCBhLm5hbWUpO1xuICAgIH0sXG5cblxuXG4gICAgaXNBUElBdmFpbGFibGUoKSB7XG4gICAgICAgIC8vIENoZWNrIGZvciB0aGUgdmFyaW91cyBGaWxlIEFQSSBzdXBwb3J0LlxuICAgICAgICBpZiAod2luZG93LkZpbGUgJiYgd2luZG93LkZpbGVSZWFkZXIgJiYgd2luZG93LkZpbGVMaXN0ICYmIHdpbmRvdy5CbG9iKSB7XG4gICAgICAgICAgICAvLyBHcmVhdCBzdWNjZXNzISBBbGwgdGhlIEZpbGUgQVBJcyBhcmUgc3VwcG9ydGVkLlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzb3VyY2U6IEZpbGUgQVBJIGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9jYW5pdXNlLmNvbS8jZmVhdD1maWxlYXBpXG4gICAgICAgICAgICAvLyBzb3VyY2U6IDxvdXRwdXQ+IGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9odG1sNWRvY3Rvci5jb20vdGhlLW91dHB1dC1lbGVtZW50L1xuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignVGhlIEhUTUw1IEFQSXMgdXNlZCBpbiB0aGlzIGZvcm0gYXJlIG9ubHkgYXZhaWxhYmxlIGluIHRoZSBmb2xsb3dpbmcgYnJvd3NlcnM6PGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyA2LjAgRmlsZSBBUEkgJiAxMy4wIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBHb29nbGUgQ2hyb21lOiAxMy4wIG9yIGxhdGVyPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyAzLjYgRmlsZSBBUEkgJiA2LjAgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIE1vemlsbGEgRmlyZWZveDogNi4wIG9yIGxhdGVyPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyAxMC4wIEZpbGUgQVBJICYgMTAuMCA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gSW50ZXJuZXQgRXhwbG9yZXI6IE5vdCBzdXBwb3J0ZWQgKHBhcnRpYWwgc3VwcG9ydCBleHBlY3RlZCBpbiAxMC4wKTxiciAvPicpO1xuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDUuMSA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gU2FmYXJpOiBOb3Qgc3VwcG9ydGVkPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyA/IEZpbGUgQVBJICYgOS4yIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBPcGVyYTogTm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhZGRPcmRpbmFsKG4pIHtcbiAgICAgICAgdmFyIHN0ciA9IG4udG9TdHJpbmcoKS5zbGljZSgtMSksXG4gICAgICAgICAgICBvcmQgPSAnJztcbiAgICAgICAgc3dpdGNoIChzdHIpIHtcbiAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICdzdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAnbmQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgb3JkID0gJ3JkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICBjYXNlICc2JzpcbiAgICAgICAgICAgIGNhc2UgJzcnOlxuICAgICAgICAgICAgY2FzZSAnOCc6XG4gICAgICAgICAgICBjYXNlICc5JzpcbiAgICAgICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICd0aCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG4gKyBvcmQ7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhcnJcbiAgICAgKiBAcGFyYW0gcHJvcFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0SW5kZXggKHZhbHVlLCBhcnIsIHByb3ApIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoYXJyW2ldW3Byb3BdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTsgLy90byBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdGhlIHZhbHVlIGRvZXNuJ3QgZXhpc3RcbiAgICB9LFxuXG4gICAgZ2V0V2Vic2l0ZVVSbChzdHIpIHtcbiAgICAgICAgaWYgKHN0ci5pbmNsdWRlcygnaHR0cDovLycpIHx8IHN0ci5pbmNsdWRlcygnaHR0cHM6Ly8nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0clxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdodHRwOi8vJytzdHJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0xpc3RpbmdQdWJsaXNoZWQoc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiAoc3RhdHVzICYmIChzdGF0dXMubmFtZSA9PT0gXCJBUFBST1ZFRFwiIHx8IHN0YXR1cy5uYW1lID09PSBcIlBFTkRJTkdcIiB8fCBzdGF0dXMubmFtZSA9PT0gXCJFRElURURcIikpO1xuICAgIH1cblxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS51dGlscy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQge2xhbmd1YWdlc30gZnJvbSBcIi4uLy4uLy4uL2RhdGEvbGFuZ3VhZ2VzXCI7XG5cbmV4cG9ydCBjb25zdCBhbGxWYWx1ZSA9IHtcbiAgICB2YWx1ZTogJ2FsbCcsXG4gICAgbGFiZWw6ICdBbGwgbG9jYWwgbGFuZ3VhZ2VzJ1xufTtcblxuY2xhc3MgTGFuZ3VhZ2VTZWxlY3RvciBleHRlbmRzICBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcblxuICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb24gPSBwcm9wcy52YWx1ZSA/IFsuLi5wcm9wcy52YWx1ZV0gOiBbXTtcbiAgICB9XG5cbiAgICBoYW5kbGVPbkNoYW5nZSA9IChzZWxlY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgaGFzQWxsID0gISFzZWxlY3Rpb24uZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gJ2FsbCcpO1xuICAgICAgICBjb25zdCBoYXNBbGxQcmV2ID0gISF0aGlzLnByZXZTZWxlY3Rpb24uZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gJ2FsbCcpO1xuICAgICAgICAvL2NvbnN0IGl0ZW1zQ2hhbmdlZCA9IHNlbGVjdGlvbi5sZW5ndGggIT09IHRoaXMucHJldlNlbGVjdGlvbi5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGhhc0FsbCkge1xuICAgICAgICAgICAgaWYgKGhhc0FsbFByZXYpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgQWxsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gc2VsZWN0aW9uLmZpbHRlcihpdGVtID0+IGl0ZW0udmFsdWUgIT09ICdhbGwnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIEFsbCBhbmQgcmVtb3ZlIG90aGVyc1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IFthbGxWYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb24gPSBzZWxlY3Rpb247XG5cbiAgICAgICAgb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHsgdmFsdWUsIG11bHRpID0gdHJ1ZSwgcGxhY2Vob2xkZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHJlYWxMYW5ndWFnZXMgPSBPYmplY3QudmFsdWVzKGxhbmd1YWdlcykubWFwKChpLCBrKT0+KHt2YWx1ZSA6IGkubmFtZSAsIGxhYmVsIDogaS5uYW1lIH0pKTtcbiAgICAgICAgY29uc3QgYWxsTGFuZ3VhZ2VzID0gWyBhbGxWYWx1ZSwgLi4ucmVhbExhbmd1YWdlcyBdO1xuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICBuYW1lPVwiZm9ybS1maWVsZC1uYW1lXCJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgbXVsdGk9e211bHRpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXthbGxMYW5ndWFnZXN9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgeyBMYW5ndWFnZVNlbGVjdG9yIH07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9MYW5ndWFnZVNlbGVjdG9yLmpzIiwiZXhwb3J0IGNvbnN0IGNvbW1vblR5cGVzPSB7XG4gICAgR0VUX0RFRkFVTFRfUklHSFRTX1BBQ0tBR0U6J0dFVF9ERUZBVUxUX1JJR0hUU19QQUNLQUdFJyxcbiAgICBTRVRfVE9UQUxfQ09VTlRSSUVTOiAnU0VUX1RPVEFMX0NPVU5UUklFUycsXG4gICAgU0VUX1RFU1RfU1RBR0VfTU9ERTogJ1NFVF9URVNUX1NUQUdFX01PREUnXG59O1xuXG5jb25zdCBjb21tb25EZWZhdWx0ID0ge1xuICAgIHRvdGFsQ291bnRyaWVzIDogMjQwLFxuICAgIHRlc3RTdGFnZU1vZGU6IGZhbHNlXG59O1xuXG5leHBvcnQgY29uc3QgY29tbW9uID0gKHN0YXRlID0gY29tbW9uRGVmYXVsdCwgYWN0aW9uKSA9PiB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgY29tbW9uVHlwZXMuR0VUX0RFRkFVTFRfUklHSFRTX1BBQ0tBR0U6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtkZWZhdWx0UmlnaHRzUGFja2FnZTogYWN0aW9uLmRlZmF1bHRSaWdodHNQYWNrYWdlfSk7XG4gICAgICAgIGNhc2UgY29tbW9uVHlwZXMuU0VUX1RPVEFMX0NPVU5UUklFUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge3RvdGFsQ291bnRyaWVzOiBhY3Rpb24udG90YWxDb3VudHJpZXN9KTtcbiAgICAgICAgY2FzZSBjb21tb25UeXBlcy5TRVRfVEVTVF9TVEFHRV9NT0RFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7dGVzdFN0YWdlTW9kZTogYWN0aW9uLnRlc3RTdGFnZU1vZGV9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vcmVkdWNlcnMvY29tbW9uLmpzIiwiZXhwb3J0IGNvbnN0IHVzZXJUeXBlcz0ge1xuICAgIExPR09VVDonTE9HT1VUJyxcbiAgICBMT0dJTjonTE9HSU4nLFxuICAgIFBST0ZJTEU6J1BST0ZJTEUnLFxuICAgIExPQURfVVNFUl9EQVRBOidMT0FEX1VTRVJfREFUQScsXG59O1xuXG5jb25zdCBkZWZhdWx0VXNlciA9IHtcbiAgICBwcm9maWxlIDogXCJTRUxMRVJcIlxuXG59O1xuXG5leHBvcnQgY29uc3QgdXNlciA9IChzdGF0ZSA9IGRlZmF1bHRVc2VyLCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSB1c2VyVHlwZXMuTE9HT1VUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkZWZhdWx0VXNlcik7XG4gICAgICAgIGNhc2UgdXNlclR5cGVzLkxPR0lOOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZW1haWw6IGFjdGlvbi5lbWFpbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgdXNlclR5cGVzLlBST0ZJTEU6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBwcm9maWxlOiBhY3Rpb24ucHJvZmlsZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgdXNlclR5cGVzLkxPQURfVVNFUl9EQVRBOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7Li4uYWN0aW9uLnVzZXJ9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vcmVkdWNlcnMvdXNlci5qcyIsImV4cG9ydCBjb25zdCB2YWxpZGF0aW9uVHlwZXMgPSB7XG4gICAgRU5BQkxFX1ZBTElEQVRJT046ICdFTkFCTEVfVkFMSURBVElPTicsXG4gICAgRElTQUJMRV9WQUxJREFUSU9OOiAnRElTQUJMRV9WQUxJREFUSU9OJ1xufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRpb24gPSAoc3RhdGUgPSBmYWxzZSwgYWN0aW9uKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG4gICAgICAgIGNhc2UgdmFsaWRhdGlvblR5cGVzLkVOQUJMRV9WQUxJREFUSU9OOlxuICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuICAgICAgICBjYXNlIHZhbGlkYXRpb25UeXBlcy5ESVNBQkxFX1ZBTElEQVRJT046XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3JlZHVjZXJzL3ZhbGlkYXRpb24uanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnXG5pbXBvcnQge2kxOG5TdGF0ZX0gZnJvbSBcInJlZHV4LWkxOG5cIjtcblxuaW1wb3J0IHtjb250ZW50fSBmcm9tIFwiLi4vc2VsbC9yZWR1Y2Vycy9jb250ZW50XCI7XG5pbXBvcnQge3NlbGVjdG9yfSBmcm9tIFwiLi4vc2VsbC9yZWR1Y2Vycy9zZWxlY3RvclwiO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gXCIuLi9idXkvcmVkdWNlcnMvZmlsdGVyXCI7XG5pbXBvcnQge21hcmtldHBsYWNlfSBmcm9tIFwiLi4vYnV5L3JlZHVjZXJzL21hcmtldHBsYWNlXCI7XG5pbXBvcnQge21hbmFnZX0gZnJvbSBcIi4uL21hbmFnZS9yZWR1Y2Vycy9tYW5hZ2VcIjtcbmltcG9ydCB7dXNlcn0gZnJvbSBcIi4vcmVkdWNlcnMvdXNlclwiO1xuaW1wb3J0IHtjb21tb259IGZyb20gXCIuL3JlZHVjZXJzL2NvbW1vblwiO1xuaW1wb3J0IHt2YWxpZGF0aW9ufSBmcm9tIFwiLi9yZWR1Y2Vycy92YWxpZGF0aW9uXCI7XG5cbmNvbnN0IHJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBjb250ZW50LFxuICAgIHNlbGVjdG9yLFxuICAgIG1hcmtldHBsYWNlLFxuICAgIGZpbHRlcixcbiAgICBtYW5hZ2UsXG4gICAgdXNlcixcbiAgICBjb21tb24sXG4gICAgdmFsaWRhdGlvbixcbiAgICBpMThuU3RhdGVcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyZWR1Y2Vycyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9zdG9yZS5qcyIsIlxuZXhwb3J0IGNvbnN0IG1hbmFnZVR5cGVzPSB7XG4gICAgVEVTVDonVEVTVCcsXG59O1xuXG5leHBvcnQgY29uc3QgbWFuYWdlID0gKHN0YXRlID0ge1xuICAgIHRlc3RJdGVtOiBcIm1hbmFnZVJlZHVjZXJcIlxuXG59LCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtYW5hZ2VUeXBlcy5URVNUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgdGVzdDogYWN0aW9uLnRleHQsXG4gICAgICAgICAgICAgICAgaWQgOiBhY3Rpb24uaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3JlZHVjZXJzL21hbmFnZS5qcyIsImltcG9ydCBtYXggZnJvbSAnbG9kYXNoL21heCc7XG5pbXBvcnQgeyBhbGxWYWx1ZSB9IGZyb20gJy4vLi4vLi4vbWFpbi9jb21wb25lbnRzL0xhbmd1YWdlU2VsZWN0b3InO1xuXG5leHBvcnQgY29uc3QgY29udGVudFR5cGU9IHtcbiAgICBDT05URU5UX0lOSVQ6J0NPTlRFTlRfSU5JVCcsXG4gICAgU1RFUF9DSEFOR0VfUkVTRVQgOiAnU1RFUF9DSEFOR0VfUkVTRVQnLFxuICAgIEdPX1RPX1NURVA6ICdHT19UT19TVEVQJyxcbiAgICBHT19UT19ORVhUX1NURVA6ICdHT19UT19ORVhUX1NURVAnLFxuICAgIEdPX1RPX1BSRVZJT1VTX1NURVA6ICdHT19UT19QUkVWSU9VU19TVEVQJyxcbiAgICBBRERfTkVXIDogJ0FERF9ORVcnLFxuICAgIFJFTU9WRV9ORVcgOiAnUkVNT1ZFX05FVycsXG4gICAgU1VQRVJfUklHSFRTX1VQREFURUQ6ICdTVVBFUl9SSUdIVFNfVVBEQVRFRCcsXG4gICAgVVBEQVRFX0NPTlRFTlRfVkFMVUUgOiAnVVBEQVRFX0NPTlRFTlRfVkFMVUUnLFxuICAgIFNFTEVDVF9UT1VSTkFNRU5UIDogJ1NFTEVDVF9UT1VSTkFNRU5UJyxcbiAgICBSRU1PVkVfRlJPTV9NVUxUSVBMRSA6ICdSRU1PVkVfRlJPTV9NVUxUSVBMRScsXG4gICAgVVBEQVRFX0ZST01fTVVMVElQTEUgOiAnVVBEQVRFX0ZST01fTVVMVElQTEUnLFxuICAgIEFQUExZX1NFTEVDVElPTiA6ICdBUFBMWV9TRUxFQ1RJT04nLFxuICAgIFVQREFURV9TQUxFU19QQUNLQUdFUyA6ICdVUERBVEVfU0FMRVNfUEFDS0FHRVMnLFxuICAgIFVQREFURV9BVFRBQ0hNRU5UUyA6ICdVUERBVEVfQVRUQUNITUVOVFMnLFxuICAgIFVQREFURV9BTk5FWCA6ICdVUERBVEVfQU5ORVgnLFxuICAgIEFERF9TQUxFU19QQUNLQUdFUyA6ICdBRERfU0FMRVNfUEFDS0FHRVMnLFxuICAgIFJFU0VUIDogJ1JFU0VUJyxcbiAgICBBTExfRVBJU09ERV9VUERBVEVfRkxBRzogJ1VQREFURV9BTExfRVBJU09ERVNfRkxBRydcbn07XG5cbmV4cG9ydCBjb25zdCBFbXB0eUxpc3RpbmcgPSB7XG4gICAgc3RlcDogMSxcbiAgICBtYXhTdGVwOiAxLFxuICAgIHJpZ2h0c1BhY2thZ2UgOiBbXSxcbiAgICB0b3VybmFtZW50IDogW10sXG4gICAgc3BvcnRDYXRlZ29yeSA6IFtdLFxuICAgIHNwb3J0cyA6IFtdLFxuICAgIHNlYXNvbnM6IFtdLFxuICAgIGN1c3RvbVNlYXNvbnMgOiBbXSxcbiAgICBzYWxlc1BhY2thZ2VzIDogW10sXG4gICAgY3VzdG9tVG91cm5hbWVudCA6IG51bGwsXG4gICAgY3VzdG9tQ2F0ZWdvcnkgOiBudWxsLFxuICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICBwcm9ncmFtRGVzY3JpcHRpb24gOiBudWxsLFxuICAgIGF0dGFjaG1lbnRzIDogW10sXG4gICAgYW5uZXggOiBbXSxcbiAgICBlbmREYXRlTGltaXQgOiAzMCxcbiAgICBjb3VudGVyIDogMCxcbiAgICBjdXJyZW5jeSA6IFwiRVVSXCIsXG4gICAgc3RhcnREYXRlTW9kZSA6IFwiTElDRU5TRVwiLFxuICAgIHN0ZXBDaGFuZ2UgOiBmYWxzZSxcbiAgICB2YXQgOiBcIm5vXCIsXG4gICAgTkFfSU5QVVQgOiA5MCxcbiAgICBITF9JTlBVVCA6IDUsXG4gICAgTElDRU5TRURfTEFOR1VBR0VTIDogW2FsbFZhbHVlXSxcbiAgICBQUk9HUkFNX0xBTkdVQUdFIDogW10sXG4gICAgUFJPR1JBTV9TVUJUSVRMRVMgOiBbXSxcbiAgICBQUk9HUkFNX1NDUklQVCA6IFtdLFxuICAgIEVESVRfUFJPR1JBTV9ERVNDUklQVElPTl9PUFRJT05BTDogdHJ1ZSxcbiAgICB3ZWJzaXRlIDogbnVsbCxcbiAgICBsYXcgOiBcIkVuZ2xpc2hcIixcbiAgICBpbWFnZSA6IG51bGwsXG4gICAgaW1hZ2VCYXNlNjQgOiBudWxsLFxuICAgIHRlbXBEYXRhOiB7fVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbnRlbnQgPSAoc3RhdGUgPSBFbXB0eUxpc3RpbmcsIGFjdGlvbikgPT4ge1xuXG4gICAgbGV0IG5ld1N0YXRlID0ge307XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuUkVTRVQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIEVtcHR5TGlzdGluZyk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQ09OVEVOVF9JTklUOlxuICAgICAgICAgICAgYWN0aW9uLmNvbnRlbnQuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uY29udGVudCwge21heFN0ZXA6IG1heChbYWN0aW9uLmNvbnRlbnQubWF4U3RlcCwgc3RhdGUubWF4U3RlcF0pfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQUxMX0VQSVNPREVfVVBEQVRFX0ZMQUc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtFRElUX1BST0dSQU1fREVTQ1JJUFRJT05fT1BUSU9OQUw6IGFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuR09fVE9fTkVYVF9TVEVQOlxuICAgICAgICAgICAgY29uc3QgbmV3U3RlcCA9IHN0YXRlLnN0ZXAgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3RlcDogbmV3U3RlcCxcbiAgICAgICAgICAgICAgICBzdGVwQ2hhbmdlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heFN0ZXA6IG1heChbbmV3U3RlcCwgc3RhdGUubWF4U3RlcF0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5HT19UT19TVEVQOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3RlcDogYWN0aW9uLnN0ZXAsXG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgbWF4U3RlcDogbWF4KFthY3Rpb24uc3RlcCwgc3RhdGUubWF4U3RlcF0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5TVEVQX0NIQU5HRV9SRVNFVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHN0ZXBDaGFuZ2UgOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuR09fVE9fUFJFVklPVVNfU1RFUDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHN0ZXA6IHN0YXRlLnN0ZXAgLTEsXG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZSA6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlJFTU9WRV9ORVc6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0uc3BsaWNlKGFjdGlvbi5pbmRleCwgMSk7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFERF9ORVc6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1bYWN0aW9uLmluZGV4XSA9IHtcbiAgICAgICAgICAgICAgICBjdXN0b20gOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLmNsZWFuICl7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmNsZWFuLmZvckVhY2goKHNlbGVjdG9yVHlwZSk9PntcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVbc2VsZWN0b3JUeXBlXSA9ICQuaXNBcnJheShzdGF0ZVtzZWxlY3RvclR5cGVdKSA/IFtdIDogbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX0NPTlRFTlRfVkFMVUU6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLmtleV0gPSBhY3Rpb24udmFsdWU7XG4gICAgICAgICAgICBuZXdTdGF0ZS5saXN0aW5nRWRpdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuU0VMRUNUX1RPVVJOQU1FTlQ6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGUudG91cm5hbWVudCA9IFthY3Rpb24udG91cm5hbWVudF07XG4gICAgICAgICAgICBuZXdTdGF0ZS5zcG9ydHMgPSAoYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnQgKSA/IFthY3Rpb24udG91cm5hbWVudC5zcG9ydF0gOiBbXTtcbiAgICAgICAgICAgIG5ld1N0YXRlLnNwb3J0Q2F0ZWdvcnkgPSBbYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnRDYXRlZ29yeV07XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFQUExZX1NFTEVDVElPTjpcblxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcblxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbXMgPSBBcnJheS5mcm9tKCBhY3Rpb24uc2VsZWN0ZWRJdGVtcy52YWx1ZXMoKSApO1xuXG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm11bHRpcGxlICl7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXVthY3Rpb24uaW5kZXhdID0gc2VsZWN0ZWRJdGVtc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24uY2xlYW4gKXtcbiAgICAgICAgICAgICAgICBhY3Rpb24uY2xlYW4uZm9yRWFjaCgoc2VsZWN0b3JUeXBlKT0+e1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZVtzZWxlY3RvclR5cGVdID0gJC5pc0FycmF5KHN0YXRlW3NlbGVjdG9yVHlwZV0pID8gW10gOiBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5SRU1PVkVfRlJPTV9NVUxUSVBMRTpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXS5zcGxpY2UoYWN0aW9uLmluZGV4LDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX0ZST01fTVVMVElQTEU6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1bYWN0aW9uLmluZGV4XVthY3Rpb24ua2V5XSA9IGFjdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlNVUEVSX1JJR0hUU19VUERBVEVEOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgcmlnaHRzUGFja2FnZSA6IEFycmF5LmZyb20oYWN0aW9uLnJpZ2h0c1BhY2thZ2UudmFsdWVzKCkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5VUERBVEVfU0FMRVNfUEFDS0FHRVM6XG5cbiAgICAgICAgICAgIGxldCBzYWxlc1BhY2thZ2VzID0gWy4uLnN0YXRlLnNhbGVzUGFja2FnZXNdO1xuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZVwiICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBzYWxlc1BhY2thZ2VzLmxlbmd0aCA+PSAxICkge1xuICAgICAgICAgICAgICAgICAgICBzYWxlc1BhY2thZ2VzLnNwbGljZShhY3Rpb24uaW5kZXgsMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlQWxsXCIgKSB7XG4gICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcyA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInNhdmVcIiApIHNhbGVzUGFja2FnZXNbYWN0aW9uLmluZGV4XSA9IGFjdGlvbi5zYWxlc1BhY2thZ2U7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMgOiBzYWxlc1BhY2thZ2VzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9BVFRBQ0hNRU5UUzpcblxuICAgICAgICAgICAgbGV0IGF0dGFjaG1lbnRzID0gWy4uLnN0YXRlLmF0dGFjaG1lbnRzXTtcblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVcIiApIHtcblxuICAgICAgICAgICAgICAgIGlmICggYXR0YWNobWVudHMubGVuZ3RoID49IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRzLnNwbGljZShhY3Rpb24uaW5kZXgsMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlQWxsXCIgKSB7XG4gICAgICAgICAgICAgICAgYXR0YWNobWVudHMgPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJzYXZlXCIgKSBhdHRhY2htZW50c1thY3Rpb24uaW5kZXhdID0gYWN0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50cyA6IGF0dGFjaG1lbnRzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9BTk5FWDpcblxuICAgICAgICAgICAgbGV0IGFubmV4ID0gWy4uLnN0YXRlLmFubmV4XTtcblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVcIiApIHtcblxuICAgICAgICAgICAgICAgIGlmICggYW5uZXgubGVuZ3RoID49IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGFubmV4LnNwbGljZShhY3Rpb24uaW5kZXgsMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlQWxsXCIgKSB7XG4gICAgICAgICAgICAgICAgYW5uZXggPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJzYXZlXCIgKSBhbm5leFthY3Rpb24uaW5kZXhdID0gYWN0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBhbm5leCA6IGFubmV4XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFERF9TQUxFU19QQUNLQUdFUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMgOiBbLi4uc3RhdGUuc2FsZXNQYWNrYWdlcywuLi5hY3Rpb24uc2FsZXNQYWNrYWdlc11cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL2NvbnRlbnQuanMiLCJleHBvcnQgY29uc3Qgc2VsZWN0b3JUeXBlPSB7XG4gICAgVEVTVDonVEVTVCcsXG4gICAgT1BFTl9TRUxFQ1RPUjogJ09QRU5fU0VMRUNUT1InLFxuICAgIENMT1NFX1NFTEVDVE9SIDogJ0NMT1NFX1NFTEVDVE9SJyxcbiAgICBBUFBMWV9TRUxFQ1RJT04gOiAnQVBQTFlfU0VMRUNUSU9OJ1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdG9yID0gKHN0YXRlID0ge1xuICAgIHR5cGU6IFwic3BvcnRcIixcbiAgICBvcGVuIDogZmFsc2UsXG4gICAgc2VsZWN0b3JJdGVtczogW10sXG4gICAgcG9wdWxhckl0ZW1zOiBbXVxuXG59LCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBzZWxlY3RvclR5cGUuVEVTVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIG9wZW46IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHNlbGVjdG9yVHlwZS5PUEVOX1NFTEVDVE9SOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBhY3Rpb24uc2VsZWN0b3JUeXBlLFxuICAgICAgICAgICAgICAgIG9wZW4gOiB0cnVlLFxuICAgICAgICAgICAgICAgIGluZGV4IDogYWN0aW9uLmluZGV4LFxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IGFjdGlvbi5zZWxlY3Rvckl0ZW1zLFxuICAgICAgICAgICAgICAgIHBvcHVsYXJJdGVtczogYWN0aW9uLnBvcHVsYXJJdGVtcyxcbiAgICAgICAgICAgICAgICBhY3RpdmVGaWx0ZXIgOiBhY3Rpb24uYWN0aXZlRmlsdGVyLFxuICAgICAgICAgICAgICAgIG11bHRpcGxlIDogYWN0aW9uLm11bHRpcGxlLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBhY3Rpb24uZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgc2hvd05ld1Nwb3J0IDogYWN0aW9uLnNob3dOZXdTcG9ydCxcbiAgICAgICAgICAgICAgICBzaG93TmV3VG91cm5hbWVudCA6IGFjdGlvbi5zaG93TmV3VG91cm5hbWVudCxcbiAgICAgICAgICAgICAgICBzaG93TmV3Q2F0ZWdvcnkgOiBhY3Rpb24uc2hvd05ld0NhdGVnb3J5LFxuICAgICAgICAgICAgICAgIHNob3dOZXdTZWFzb24gOiBhY3Rpb24uc2hvd05ld1NlYXNvbixcbiAgICAgICAgICAgICAgICBzaG93QWxsQ291bnRyaWVzOiBhY3Rpb24uc2hvd0FsbENvdW50cmllcyxcbiAgICAgICAgICAgICAgICBjbGVhbiA6IGFjdGlvbi5jbGVhbixcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zOiBhY3Rpb24uc2VsZWN0ZWRJdGVtc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLkNMT1NFX1NFTEVDVE9SOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcIlwiLFxuICAgICAgICAgICAgICAgIG9wZW4gOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBbXSxcbiAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBzZWxlY3RvclR5cGUuQVBQTFlfU0VMRUNUSU9OIDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogXCJcIixcbiAgICAgICAgICAgICAgICBvcGVuIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogW10sXG4gICAgICAgICAgICAgICAgcG9wdWxhckl0ZW1zOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL3NlbGVjdG9yLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==