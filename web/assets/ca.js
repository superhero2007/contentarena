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
    signUpUser: function signUpUser(firstName, lastName, email, companyLegalName, phone) {
        return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(envhosturl + 'api/users/register', {
            firstName: firstName, lastName: lastName, email: email, companyLegalName: companyLegalName, phone: phone
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL21heC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvZGF0YS9sYW5ndWFnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmNvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0xhbmd1YWdlU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy91c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vcmVkdWNlcnMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9yZWR1Y2Vycy9tYW5hZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvc2VsZWN0b3IuanMiXSwibmFtZXMiOlsibGFuZ3VhZ2VzIiwiZmlsdGVyVHlwZXMiLCJBRERfUklHSFQiLCJSRU1PVkVfUklHSFQiLCJVUERBVEVfQ09VTlRSSUVTIiwiVVBEQVRFX0VYQ0xVU0lWRSIsIlVQREFURV9JTkNMVURFRF9DT1VOVFJJRVMiLCJVUERBVEVfU1BPUlQiLCJVUERBVEVfRVZFTlQiLCJDTEVBUiIsIkNMRUFSX1VQREFURSIsIlVQREFURV9NQU5ZIiwiVVBEQVRFX0ZJTFRFUlNfQ09ORklHIiwiVVBEQVRFX0VWRU5UX0RBVEVfRlJPTV9UTyIsImRlZmF1bHRGaWx0ZXIiLCJyaWdodHMiLCJjb3VudHJpZXMiLCJleGNsdXNpdmUiLCJpbmNsdWRlQWxsQ291bnRyaWVzIiwic3BvcnQiLCJ2YWx1ZSIsImxhYmVsIiwiZXZlbnQiLCJmb3JjZVVwZGF0ZSIsImV2ZW50RGF0ZUZyb20iLCJldmVudERhdGVUbyIsImZpbHRlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsIk9iamVjdCIsImFzc2lnbiIsImlkIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwibWFwIiwiYyIsImZyb20iLCJ0byIsImZpbHRlcnMiLCJOdW1iZXIiLCJyIiwibWFya2V0cGxhY2VUeXBlcyIsIlRFU1QiLCJtYXJrZXRwbGFjZSIsInRlc3RJdGVtIiwidGVzdCIsInRleHQiLCJfX2FwaVN0b3JlIiwidG91cm5hbWVudHMiLCJ3aW5kb3ciLCJDb250ZW50QXJlbmEiLCJDb250ZW50QXBpIiwic2F2ZUNvbnRlbnRBc0RyYWZ0IiwiY29udGVudCIsImRlZmVycmVkIiwialF1ZXJ5IiwiRGVmZXJyZWQiLCJfdGhpcyIsIiQiLCJhamF4IiwidXJsIiwiZW52aG9zdHVybCIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiY29udGVudFR5cGUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJyZXNvbHZlIiwiZXJyb3IiLCJzdGF0dXMiLCJyZWplY3QiLCJwcm9taXNlIiwic2F2ZUNvbnRlbnRBc0luYWN0aXZlIiwic2F2ZUNvbnRlbnRBc0FjdGl2ZSIsInJlcHVibGlzaExpc3RpbmciLCJjdXN0b21JZCIsInNlbmRNZXNzYWdlIiwibWVzc2FnZSIsImdldFVzZXJJbmZvIiwiZ2V0VXNlckluZm9CeUFjdGl2YXRpb25Db2RlIiwiYWN0aXZhdGlvbkNvZGUiLCJnZXRDb21wYW55VXNlcnMiLCJ1cGRhdGVDb21wYW55IiwiY29tcGFueSIsInVwZGF0ZVBhc3N3b3JkIiwidXBkYXRlVXNlciIsInVzZXIiLCJhY3RpdmF0ZVVzZXIiLCJwYXNzd29yZCIsInVwZGF0ZVVzZXJQcm9maWxlIiwicHJvZmlsZSIsImdldFRocmVhZCIsImdldFRocmVhZHMiLCJwbGFjZUJpZCIsImJpZCIsInBsYWNlQmlkcyIsImFjY2VwdEJpZCIsInNpZ25hdHVyZSIsInNpZ25hdHVyZU5hbWUiLCJzaWduYXR1cmVQb3NpdGlvbiIsInJlamVjdEJpZCIsInJlbW92ZUJpZCIsInNhdmVUbXBGaWxlIiwiZmlsZXMiLCJGb3JtRGF0YSIsImFwcGVuZCIsInByb2Nlc3NEYXRhIiwic2F2ZUF0dGFjaG1lbnRGaWxlIiwiY29uc29sZSIsImxvZyIsInJlbW92ZUF0dGFjaG1lbnRGaWxlIiwiZmlsZSIsImdldEJ5Q3VzdG9tSWQiLCJnZXREcmFmdExpc3RpbmdzIiwiZ2V0SW5hY3RpdmVMaXN0aW5ncyIsImdldEFjdGl2ZUxpc3RpbmdzIiwiZ2V0RXhwaXJlZExpc3RpbmdzIiwicmVtb3ZlTGlzdGluZyIsImR1cGxpY2F0ZUxpc3RpbmciLCJkZWFjdGl2YXRlTGlzdGluZyIsImFyY2hpdmVMaXN0aW5nIiwiZ2V0Q2xvc2VkRGVhbHMiLCJnZXRBbGxEZWFscyIsImdldFBlbmRpbmdEZWFscyIsImdldFJlamVjdGVkRGVhbHMiLCJnZXRXYXRjaGxpc3RMaXN0aW5ncyIsIkFwaSIsInNvcnRCeUxhYmVsIiwiYSIsImIiLCJuYW1lIiwic29ydEJ5U3BvcnQiLCJzcG9ydENhdGVnb3J5IiwicHJlcGFyZUxpc3QiLCJsaXN0IiwiY2F0ZWdvcnlJZCIsIml0ZW0iLCJjYXRlZ29yeSIsImV4dGVybmFsSWQiLCJzb3J0IiwiZmlsdGVyRG91YmxlcyIsInNwb3J0SWQiLCJuYW1lcyIsInJlcGxhY2UiLCJwdXNoIiwiZ2V0Q29tcGFueVRlcm1zIiwiZ2V0Q29tcGFueURlZmluaXRpb25zIiwicmVzdG9yZUNvbXBhbnlUZXJtcyIsInJlc3RvcmVEZWZpbml0aW9ucyIsInVwZGF0ZVRlcm1zIiwidGVybXMiLCJkZWZpbml0aW9ucyIsImdldENvbnRlbnQiLCJnZXRKc29uQ29udGVudCIsInNhdmVGaWx0ZXIiLCJnZXRDb3VudHJpZXMiLCJEYXRhIiwiQ291bnRyaWVzIiwibGVuZ3RoIiwicmVnaW9ucyIsImdldEFjdGl2ZVNwb3J0cyIsImdldEFsbFNwb3J0cyIsImZsYWdzIiwiZ2V0U3BvcnRzR3JvdXBzIiwiZ2V0Q291bnRyaWVzRnVsbCIsImdldFRlcnJpdG9yaWVzIiwiZ2V0UmVnaW9ucyIsImdldFJpZ2h0cyIsInJpZ2h0c1BhY2thZ2UiLCJncm91cCIsImdldFJpZ2h0c1BhY2thZ2UiLCJnZXRTcG9ydHMiLCJleHRlcm5hbEFwaVVybCIsInNwb3J0cyIsImdldENvbnRlbnREZXRhaWxzIiwiZ2V0UGVuZGluZ0xpc3RpbmdzIiwiZ2V0Q2F0ZWdvcmllcyIsImNhdHMiLCJnZXRUb3VybmFtZW50cyIsImRvbmUiLCJ0b3VybmFtZW50Iiwic3RvcmVkUmVzcG9uc2UiLCJ1bmRlZmluZWQiLCJnZXRTZWFzb25zIiwidG91cm5hbWVudElkIiwic2Vhc29ucyIsInNlYXNvbiIsImlzQXJyYXkiLCJlbmREYXRlIiwiZW5kX2RhdGUiLCJzdGFydERhdGUiLCJzdGFydF9kYXRlIiwidG91cm5hbWVudF9pZCIsInllYXIiLCJyZXZlcnNlIiwiZ2V0U2NoZWR1bGUiLCJzZWFzb25JZCIsInNwb3J0X2V2ZW50cyIsInNwb3J0X2V2ZW50IiwiZm9yRWFjaCIsInJvdW5kIiwidG91cm5hbWVudF9yb3VuZCIsIm51bWJlciIsIm1hdGNoZXMiLCJNYXAiLCJzZXQiLCJzY2hlZHVsZWQiLCJ0b3VybmFtZW50Um91bmQiLCJjb21wZXRpdG9ycyIsImNvbXBldGl0b3IiLCJzZWFyY2hDb21wZXRpdGlvbiIsInJlcXVlc3QiLCJ0cmFkaXRpb25hbCIsImRhdGFUeXBlIiwid2F0Y2hsaXN0IiwiZ2V0Tm90aWZpY2F0aW9ucyIsImF4aW9zIiwiZ2V0IiwibWFya05vdGlmaWNhdGlvbkFzVmlzaXRlZCIsInBvc3QiLCJtYXJrTm90aWZpY2F0aW9uQXNTZWVuIiwic2lnbkluVXNlciIsInVzZXJuYW1lIiwicmVjb3ZlclBhc3N3b3JkIiwiZW1haWwiLCJzaWduVXBVc2VyIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJjb21wYW55TGVnYWxOYW1lIiwicGhvbmUiLCJMYW5ndWFnZXMiLCJUb3BTcG9ydHMiLCJGdWxsU3BvcnRzIiwiQWN0aXZlU3BvcnRzIiwiVGVycml0b3JpZXMiLCJSZWdpb25zIiwiU2hvcnQiLCJMb25nIiwiVXRpbHMiLCJjb250ZW50UGFyc2VyRnJvbVNlcnZlciIsInBhcnNlZCIsImV4dHJhRGF0YSIsImVudHJpZXMiLCJrZXkiLCJBcnJheSIsInNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0IiwicnAiLCJzZWxlY3RlZFJpZ2h0cyIsImZpeHR1cmVzQnlTZWFzb24iLCJzIiwiaSIsImZpeHR1cmVzIiwibGF3IiwiY3VzdG9tQnVuZGxlcyIsInNwIiwic2FsZXNNZXRob2QiLCJleGNsdWRlZENvdW50cmllcyIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJ0IiwidGVycml0b3J5SWQiLCJ0ZXJyaXRvcmllcyIsImluc3RhbGxtZW50cyIsImRhdGUiLCJtb21lbnQiLCJlIiwic2FsZXNQYWNrYWdlcyIsInNvcnRTYWxlc1BhY2thZ2VzIiwiaG9zdHVybCIsInN0ZXAiLCJjdXN0b21TZWFzb25zIiwic3RhcnRzV2l0aCIsInllYXJzIiwic3BsaXQiLCJjdXN0b20iLCJzZWFzb25EdXJhdGlvbnMiLCJjdXN0b21TZWFzb25EdXIiLCJjdXN0b21TdGFydERhdGUiLCJjdXN0b21FbmREYXRlIiwic3RvcmUiLCJnZXRTdGF0ZSIsInRpdGxlIiwiZmlsdGVyQ29tcGFueUluZm8iLCJsZWdhbE5hbWUiLCJyZWdpc3RyYXRpb25OdW1iZXIiLCJ2YXQiLCJhZGRyZXNzIiwiYWRkcmVzczIiLCJjaXR5IiwiemlwIiwiY291bnRyeSIsImlzQVBJQXZhaWxhYmxlIiwiRmlsZSIsIkZpbGVSZWFkZXIiLCJGaWxlTGlzdCIsIkJsb2IiLCJkb2N1bWVudCIsIndyaXRlbG4iLCJhZGRPcmRpbmFsIiwibiIsInN0ciIsInRvU3RyaW5nIiwic2xpY2UiLCJvcmQiLCJnZXRJbmRleCIsImFyciIsInByb3AiLCJnZXRXZWJzaXRlVVJsIiwiaW5jbHVkZXMiLCJpc0xpc3RpbmdQdWJsaXNoZWQiLCJhbGxWYWx1ZSIsIkxhbmd1YWdlU2VsZWN0b3IiLCJwcm9wcyIsImhhbmRsZU9uQ2hhbmdlIiwic2VsZWN0aW9uIiwib25DaGFuZ2UiLCJoYXNBbGwiLCJmaW5kIiwiaGFzQWxsUHJldiIsInByZXZTZWxlY3Rpb24iLCJtdWx0aSIsInBsYWNlaG9sZGVyIiwicmVhbExhbmd1YWdlcyIsInZhbHVlcyIsImsiLCJhbGxMYW5ndWFnZXMiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbW1vblR5cGVzIiwiR0VUX0RFRkFVTFRfUklHSFRTX1BBQ0tBR0UiLCJTRVRfVE9UQUxfQ09VTlRSSUVTIiwiU0VUX1RFU1RfU1RBR0VfTU9ERSIsImNvbW1vbkRlZmF1bHQiLCJ0b3RhbENvdW50cmllcyIsInRlc3RTdGFnZU1vZGUiLCJjb21tb24iLCJkZWZhdWx0UmlnaHRzUGFja2FnZSIsInVzZXJUeXBlcyIsIkxPR09VVCIsIkxPR0lOIiwiUFJPRklMRSIsIkxPQURfVVNFUl9EQVRBIiwiZGVmYXVsdFVzZXIiLCJ2YWxpZGF0aW9uVHlwZXMiLCJFTkFCTEVfVkFMSURBVElPTiIsIkRJU0FCTEVfVkFMSURBVElPTiIsInZhbGlkYXRpb24iLCJyZWR1Y2VycyIsImNvbWJpbmVSZWR1Y2VycyIsInNlbGVjdG9yIiwibWFuYWdlIiwiaTE4blN0YXRlIiwiY3JlYXRlU3RvcmUiLCJtYW5hZ2VUeXBlcyIsIkNPTlRFTlRfSU5JVCIsIlNURVBfQ0hBTkdFX1JFU0VUIiwiR09fVE9fU1RFUCIsIkdPX1RPX05FWFRfU1RFUCIsIkdPX1RPX1BSRVZJT1VTX1NURVAiLCJBRERfTkVXIiwiUkVNT1ZFX05FVyIsIlNVUEVSX1JJR0hUU19VUERBVEVEIiwiVVBEQVRFX0NPTlRFTlRfVkFMVUUiLCJTRUxFQ1RfVE9VUk5BTUVOVCIsIlJFTU9WRV9GUk9NX01VTFRJUExFIiwiVVBEQVRFX0ZST01fTVVMVElQTEUiLCJBUFBMWV9TRUxFQ1RJT04iLCJVUERBVEVfU0FMRVNfUEFDS0FHRVMiLCJVUERBVEVfQVRUQUNITUVOVFMiLCJVUERBVEVfQU5ORVgiLCJBRERfU0FMRVNfUEFDS0FHRVMiLCJSRVNFVCIsIkFMTF9FUElTT0RFX1VQREFURV9GTEFHIiwiRW1wdHlMaXN0aW5nIiwibWF4U3RlcCIsImN1c3RvbVRvdXJuYW1lbnQiLCJjdXN0b21DYXRlZ29yeSIsImRlc2NyaXB0aW9uIiwicHJvZ3JhbURlc2NyaXB0aW9uIiwiYXR0YWNobWVudHMiLCJhbm5leCIsImVuZERhdGVMaW1pdCIsImNvdW50ZXIiLCJjdXJyZW5jeSIsInN0YXJ0RGF0ZU1vZGUiLCJzdGVwQ2hhbmdlIiwiTkFfSU5QVVQiLCJITF9JTlBVVCIsIkxJQ0VOU0VEX0xBTkdVQUdFUyIsIlBST0dSQU1fTEFOR1VBR0UiLCJQUk9HUkFNX1NVQlRJVExFUyIsIlBST0dSQU1fU0NSSVBUIiwiRURJVF9QUk9HUkFNX0RFU0NSSVBUSU9OX09QVElPTkFMIiwid2Vic2l0ZSIsImltYWdlIiwiaW1hZ2VCYXNlNjQiLCJ0ZW1wRGF0YSIsIm5ld1N0YXRlIiwiaW5pdGlhbGl6ZWQiLCJtYXgiLCJwYXlsb2FkIiwibmV3U3RlcCIsInNlbGVjdG9yVHlwZSIsImNsZWFuIiwibGlzdGluZ0VkaXRlZCIsInNlbGVjdGVkSXRlbXMiLCJtdWx0aXBsZSIsInNhbGVzUGFja2FnZSIsIk9QRU5fU0VMRUNUT1IiLCJDTE9TRV9TRUxFQ1RPUiIsIm9wZW4iLCJzZWxlY3Rvckl0ZW1zIiwicG9wdWxhckl0ZW1zIiwiYWN0aXZlRmlsdGVyIiwiZGlzYWJsZWQiLCJzaG93TmV3U3BvcnQiLCJzaG93TmV3VG91cm5hbWVudCIsInNob3dOZXdDYXRlZ29yeSIsInNob3dOZXdTZWFzb24iLCJzaG93QWxsQ291bnRyaWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkY7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QztBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7OztBQ25MQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QUFjLEVBRGM7QUFFNUJRLHNCQUFPLEtBRnFCO0FBRzVCQywrQkFBZSxFQUhhO0FBSTVCQyw4QkFBYztBQUpjLGFBQXpCLENBQVA7QUFNSixhQUFLVixhQUFhcEMsZUFBbEI7QUFDSSxtQkFBT2xWLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixFQUF5QjtBQUM1QnlYLDhCQUFjLEVBRGM7QUFFNUJRLHNCQUFPLEtBRnFCO0FBRzVCQywrQkFBZSxFQUhhO0FBSTVCQyw4QkFBYztBQUpjLGFBQXpCLENBQVA7QUFNSjtBQUNJLG1CQUFPblksS0FBUDtBQXRDUjtBQXdDSCxDQWhETSxDIiwiZmlsZSI6ImNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzIwMSlcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKHV0aWxzLm1lcmdlKGRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSB1dGlscy5tZXJnZSh7XG4gICAgICB1cmw6IGFyZ3VtZW50c1swXVxuICAgIH0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cblxuICBjb25maWcgPSB1dGlscy5tZXJnZShkZWZhdWx0cywge21ldGhvZDogJ2dldCd9LCB0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIC8vIE5vdGU6IHN0YXR1cyBpcyBub3QgZXhwb3NlZCBieSBYRG9tYWluUmVxdWVzdFxuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9KSgpXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBtZXRob2RzIGxpa2UgYF8ubWF4YCBhbmQgYF8ubWluYCB3aGljaCBhY2NlcHRzIGFcbiAqIGBjb21wYXJhdG9yYCB0byBkZXRlcm1pbmUgdGhlIGV4dHJlbXVtIHZhbHVlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgdXNlZCB0byBjb21wYXJlIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBleHRyZW11bSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUV4dHJlbXVtKGFycmF5LCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY3VycmVudCA9IGl0ZXJhdGVlKHZhbHVlKTtcblxuICAgIGlmIChjdXJyZW50ICE9IG51bGwgJiYgKGNvbXB1dGVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IChjdXJyZW50ID09PSBjdXJyZW50ICYmICFpc1N5bWJvbChjdXJyZW50KSlcbiAgICAgICAgICA6IGNvbXBhcmF0b3IoY3VycmVudCwgY29tcHV0ZWQpXG4gICAgICAgICkpIHtcbiAgICAgIHZhciBjb21wdXRlZCA9IGN1cnJlbnQsXG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUV4dHJlbXVtO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRXh0cmVtdW0uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUV4dHJlbXVtLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGdldFJhd1RhZyA9IHJlcXVpcmUoJy4vX2dldFJhd1RhZycpLFxuICAgIG9iamVjdFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fb2JqZWN0VG9TdHJpbmcnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldFRhZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5ndGAgd2hpY2ggZG9lc24ndCBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGdyZWF0ZXIgdGhhbiBgb3RoZXJgLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUd0KHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPiBvdGhlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhd1RhZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRvU3RyaW5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pZGVudGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzU3ltYm9sLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIGJhc2VFeHRyZW11bSA9IHJlcXVpcmUoJy4vX2Jhc2VFeHRyZW11bScpLFxuICAgIGJhc2VHdCA9IHJlcXVpcmUoJy4vX2Jhc2VHdCcpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtYXhpbXVtIHZhbHVlIG9mIGBhcnJheWAuIElmIGBhcnJheWAgaXMgZW1wdHkgb3IgZmFsc2V5LFxuICogYHVuZGVmaW5lZGAgaXMgcmV0dXJuZWQuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWF4aW11bSB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5tYXgoWzQsIDIsIDgsIDZdKTtcbiAqIC8vID0+IDhcbiAqXG4gKiBfLm1heChbXSk7XG4gKiAvLyA9PiB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gbWF4KGFycmF5KSB7XG4gIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKVxuICAgID8gYmFzZUV4dHJlbXVtKGFycmF5LCBpZGVudGl0eSwgYmFzZUd0KVxuICAgIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1heDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9tYXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9tYXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJleHBvcnQgY29uc3QgbGFuZ3VhZ2VzID0ge1xuICAgIFwiYWJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWJraGF6XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LDSp9GB0YPQsFwiXG4gICAgfSxcbiAgICBcImFhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFmYXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBZmFyYWZcIlxuICAgIH0sXG4gICAgXCJhZlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBZnJpa2FhbnNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBZnJpa2FhbnNcIlxuICAgIH0sXG4gICAgXCJha1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBa2FuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWthblwiXG4gICAgfSxcbiAgICBcInNxXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFsYmFuaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2hxaXBcIlxuICAgIH0sXG4gICAgXCJhbVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBbWhhcmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Yqg4Yib4Yit4YqbXCJcbiAgICB9LFxuICAgIFwiYXJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXJhYmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi2KfZhNi52LHYqNmK2KlcIlxuICAgIH0sXG4gICAgXCJhblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBcmFnb25lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBcmFnb27DqXNcIlxuICAgIH0sXG4gICAgXCJoeVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBcm1lbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItWA1aHVtdWl1oDVpdW2XCJcbiAgICB9LFxuICAgIFwiYXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXNzYW1lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpoXgprjgpq7gp4Dgpq/gprzgpr5cIlxuICAgIH0sXG4gICAgXCJhdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBdmFyaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsNCy0LDRgCDQvNCw0YbTgCwg0LzQsNCz04DQsNGA0YPQuyDQvNCw0YbTgFwiXG4gICAgfSxcbiAgICBcImFlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkF2ZXN0YW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJhdmVzdGFcIlxuICAgIH0sXG4gICAgXCJheVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBeW1hcmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJheW1hciBhcnVcIlxuICAgIH0sXG4gICAgXCJhelwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBemVyYmFpamFuaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImF6yZlyYmF5Y2FuIGRpbGlcIlxuICAgIH0sXG4gICAgXCJibVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCYW1iYXJhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYmFtYW5hbmthblwiXG4gICAgfSxcbiAgICBcImJhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJhc2hraXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsdCw0YjSodC+0YDRgiDRgtC10LvQtVwiXG4gICAgfSxcbiAgICBcImV1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJhc3F1ZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImV1c2thcmEsIGV1c2tlcmFcIlxuICAgIH0sXG4gICAgXCJiZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCZWxhcnVzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0JHQtdC70LDRgNGD0YHQutCw0Y9cIlxuICAgIH0sXG4gICAgXCJiblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCZW5nYWxpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Kas4Ka+4KaC4Kay4Ka+XCJcbiAgICB9LFxuICAgIFwiYmhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmloYXJpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KSt4KWL4KSc4KSq4KWB4KSw4KWAXCJcbiAgICB9LFxuICAgIFwiYmlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmlzbGFtYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkJpc2xhbWFcIlxuICAgIH0sXG4gICAgXCJic1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCb3NuaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYm9zYW5za2kgamV6aWtcIlxuICAgIH0sXG4gICAgXCJiclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCcmV0b25cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJicmV6aG9uZWdcIlxuICAgIH0sXG4gICAgXCJiZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCdWxnYXJpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsdGK0LvQs9Cw0YDRgdC60Lgg0LXQt9C40LpcIlxuICAgIH0sXG4gICAgXCJteVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCdXJtZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4YCX4YCZ4YCs4YCF4YCsXCJcbiAgICB9LFxuICAgIFwiY2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2F0YWxhbjsgVmFsZW5jaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQ2F0YWzDoFwiXG4gICAgfSxcbiAgICBcImNoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNoYW1vcnJvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQ2hhbW9ydVwiXG4gICAgfSxcbiAgICBcImNlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNoZWNoZW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQvdC+0YXRh9C40LnQvSDQvNC+0YLRglwiXG4gICAgfSxcbiAgICBcIm55XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNoaWNoZXdhOyBDaGV3YTsgTnlhbmphXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiY2hpQ2hlxbVhLCBjaGlueWFuamFcIlxuICAgIH0sXG4gICAgXCJ6aFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGluZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi5Lit5paHIChaaMWNbmd3w6luKSwg5rGJ6K+tLCDmvKLoqp5cIlxuICAgIH0sXG4gICAgXCJjdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaHV2YXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0YfTkdCy0LDRiCDRh9OX0LvRhdC4XCJcbiAgICB9LFxuICAgIFwia3dcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ29ybmlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktlcm5ld2VrXCJcbiAgICB9LFxuICAgIFwiY29cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ29yc2ljYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJjb3JzdSwgbGluZ3VhIGNvcnNhXCJcbiAgICB9LFxuICAgIFwiY3JcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ3JlZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGTgOGQpuGQg+GUreGQjeGQj+GQo1wiXG4gICAgfSxcbiAgICBcImhyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNyb2F0aWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiaHJ2YXRza2lcIlxuICAgIH0sXG4gICAgXCJjc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDemVjaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIsSNZXNreSwgxI1lxaF0aW5hXCJcbiAgICB9LFxuICAgIFwiZGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRGFuaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZGFuc2tcIlxuICAgIH0sXG4gICAgXCJkdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJEaXZlaGk7IERoaXZlaGk7IE1hbGRpdmlhbjtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLei96o3ojerN6A3qhcIlxuICAgIH0sXG4gICAgXCJubFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJEdXRjaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5lZGVybGFuZHMsIFZsYWFtc1wiXG4gICAgfSxcbiAgICBcImVuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkVuZ2xpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFbmdsaXNoXCJcbiAgICB9LFxuICAgIFwiZW9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRXNwZXJhbnRvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRXNwZXJhbnRvXCJcbiAgICB9LFxuICAgIFwiZXRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRXN0b25pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJlZXN0aSwgZWVzdGkga2VlbFwiXG4gICAgfSxcbiAgICBcImVlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkV3ZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkXKi2VnYmVcIlxuICAgIH0sXG4gICAgXCJmb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGYXJvZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZsO4cm95c2t0XCJcbiAgICB9LFxuICAgIFwiZmpcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRmlqaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwidm9zYSBWYWthdml0aVwiXG4gICAgfSxcbiAgICBcImZpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZpbm5pc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzdW9taSwgc3VvbWVuIGtpZWxpXCJcbiAgICB9LFxuICAgIFwiZnJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRnJlbmNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZnJhbsOnYWlzLCBsYW5ndWUgZnJhbsOnYWlzZVwiXG4gICAgfSxcbiAgICBcImZmXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZ1bGE7IEZ1bGFoOyBQdWxhYXI7IFB1bGFyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRnVsZnVsZGUsIFB1bGFhciwgUHVsYXJcIlxuICAgIH0sXG4gICAgXCJnbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHYWxpY2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkdhbGVnb1wiXG4gICAgfSxcbiAgICBcImthXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkdlb3JnaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4YOl4YOQ4YOg4YOX4YOj4YOa4YOYXCJcbiAgICB9LFxuICAgIFwiZGVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR2VybWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRGV1dHNjaFwiXG4gICAgfSxcbiAgICBcImVsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkdyZWVrLCBNb2Rlcm5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLOlc67zrvOt869zrnOus6sXCJcbiAgICB9LFxuICAgIFwiZ25cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR3VhcmFuw61cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBdmHDsWXhur1cIlxuICAgIH0sXG4gICAgXCJndVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHdWphcmF0aVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCql+CrgeCqnOCqsOCqvuCqpOCrgFwiXG4gICAgfSxcbiAgICBcImh0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhhaXRpYW47IEhhaXRpYW4gQ3Jlb2xlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS3JlecOybCBheWlzeWVuXCJcbiAgICB9LFxuICAgIFwiaGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGF1c2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJIYXVzYSwg2YfZjtmI2Y/Ys9mOXCJcbiAgICB9LFxuICAgIFwiaGVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGVicmV3IChtb2Rlcm4pXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi16LXkdeo15nXqlwiXG4gICAgfSxcbiAgICBcImh6XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhlcmVyb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk90amloZXJlcm9cIlxuICAgIH0sXG4gICAgXCJoaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIaW5kaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkueCkv+CkqOCljeCkpuClgCwg4KS54KS/4KSC4KSm4KWAXCJcbiAgICB9LFxuICAgIFwiaG9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGlyaSBNb3R1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSGlyaSBNb3R1XCJcbiAgICB9LFxuICAgIFwiaHVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSHVuZ2FyaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTWFneWFyXCJcbiAgICB9LFxuICAgIFwiaWFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW50ZXJsaW5ndWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJJbnRlcmxpbmd1YVwiXG4gICAgfSxcbiAgICBcImlkXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkluZG9uZXNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJCYWhhc2EgSW5kb25lc2lhXCJcbiAgICB9LFxuICAgIFwiaWVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW50ZXJsaW5ndWVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPcmlnaW5hbGx5IGNhbGxlZCBPY2NpZGVudGFsOyB0aGVuIEludGVybGluZ3VlIGFmdGVyIFdXSUlcIlxuICAgIH0sXG4gICAgXCJnYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJcmlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkdhZWlsZ2VcIlxuICAgIH0sXG4gICAgXCJpZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJZ2JvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXPhu6Vz4bulIElnYm9cIlxuICAgIH0sXG4gICAgXCJpa1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbnVwaWFxXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiScOxdXBpYXEsIEnDsXVwaWF0dW5cIlxuICAgIH0sXG4gICAgXCJpb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJZG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJJZG9cIlxuICAgIH0sXG4gICAgXCJpc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJY2VsYW5kaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLDjXNsZW5za2FcIlxuICAgIH0sXG4gICAgXCJpdFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJdGFsaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSXRhbGlhbm9cIlxuICAgIH0sXG4gICAgXCJpdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbnVrdGl0dXRcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhkIPhk4ThkoPhkY7hkZDhkaZcIlxuICAgIH0sXG4gICAgXCJqYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJKYXBhbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuaXpeacrOiqniAo44Gr44G744KT44GU77yP44Gr44Gj44G944KT44GUKVwiXG4gICAgfSxcbiAgICBcImp2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkphdmFuZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYmFzYSBKYXdhXCJcbiAgICB9LFxuICAgIFwia2xcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2FsYWFsbGlzdXQsIEdyZWVubGFuZGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwia2FsYWFsbGlzdXQsIGthbGFhbGxpdCBvcWFhc2lpXCJcbiAgICB9LFxuICAgIFwia25cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2FubmFkYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCyleCyqOCzjeCyqOCyoVwiXG4gICAgfSxcbiAgICBcImtyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthbnVyaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkthbnVyaVwiXG4gICAgfSxcbiAgICBcImtzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthc2htaXJpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KSV4KS24KWN4KSu4KWA4KSw4KWALCDZg9i02YXZitix2YrigI5cIlxuICAgIH0sXG4gICAgXCJra1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYXpha2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLSmtCw0LfQsNKbINGC0ZbQu9GWXCJcbiAgICB9LFxuICAgIFwia21cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2htZXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhnpfhnrbhnp/hnrbhnoHhn5Lhnpjhn4LhnppcIlxuICAgIH0sXG4gICAgXCJraVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLaWt1eXUsIEdpa3V5dVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkfEqWvFqXnFqVwiXG4gICAgfSxcbiAgICBcInJ3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpbnlhcndhbmRhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSWtpbnlhcndhbmRhXCJcbiAgICB9LFxuICAgIFwia3lcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2lyZ2hpeiwgS3lyZ3l6XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LrRi9GA0LPRi9C3INGC0LjQu9C4XCJcbiAgICB9LFxuICAgIFwia3ZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS29taVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC60L7QvNC4INC60YvQslwiXG4gICAgfSxcbiAgICBcImtnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktvbmdvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2lLb25nb1wiXG4gICAgfSxcbiAgICBcImtvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktvcmVhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIu2VnOq1reyWtCAo6Z+T5ZyL6KqeKSwg7KGw7ISg66eQICjmnJ3prq7oqp4pXCJcbiAgICB9LFxuICAgIFwia3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS3VyZGlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkt1cmTDriwg2YPZiNix2K/bjOKAjlwiXG4gICAgfSxcbiAgICBcImtqXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkt3YW55YW1hLCBLdWFueWFtYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkt1YW55YW1hXCJcbiAgICB9LFxuICAgIFwibGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGF0aW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJsYXRpbmUsIGxpbmd1YSBsYXRpbmFcIlxuICAgIH0sXG4gICAgXCJsYlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMdXhlbWJvdXJnaXNoLCBMZXR6ZWJ1cmdlc2NoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTMOrdHplYnVlcmdlc2NoXCJcbiAgICB9LFxuICAgIFwibGdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTHVnYW5kYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkx1Z2FuZGFcIlxuICAgIH0sXG4gICAgXCJsaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMaW1idXJnaXNoLCBMaW1idXJnYW4sIExpbWJ1cmdlclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkxpbWJ1cmdzXCJcbiAgICB9LFxuICAgIFwibG5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGluZ2FsYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkxpbmfDoWxhXCJcbiAgICB9LFxuICAgIFwibG9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGFvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Lqe4Lqy4Lqq4Lqy4Lql4Lqy4LqnXCJcbiAgICB9LFxuICAgIFwibHRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGl0aHVhbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImxpZXR1dmnFsyBrYWxiYVwiXG4gICAgfSxcbiAgICBcImx1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkx1YmEtS2F0YW5nYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlwiXG4gICAgfSxcbiAgICBcImx2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxhdHZpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJsYXR2aWXFoXUgdmFsb2RhXCJcbiAgICB9LFxuICAgIFwiZ3ZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFueFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkdhZWxnLCBHYWlsY2tcIlxuICAgIH0sXG4gICAgXCJta1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYWNlZG9uaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LzQsNC60LXQtNC+0L3RgdC60Lgg0ZjQsNC30LjQulwiXG4gICAgfSxcbiAgICBcIm1nXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbGFnYXN5XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTWFsYWdhc3kgZml0ZW55XCJcbiAgICB9LFxuICAgIFwibXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFsYXlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJiYWhhc2EgTWVsYXl1LCDYqNmH2KfYsyDZhdmE2KfZitmI4oCOXCJcbiAgICB9LFxuICAgIFwibWxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFsYXlhbGFtXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LSu4LSy4LSv4LS+4LSz4LSCXCJcbiAgICB9LFxuICAgIFwibXRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFsdGVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hbHRpXCJcbiAgICB9LFxuICAgIFwibWlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTcSBb3JpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwidGUgcmVvIE3EgW9yaVwiXG4gICAgfSxcbiAgICBcIm1yXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hcmF0aGkgKE1hcsSB4bmtaMSrKVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkruCksOCkvuCkoOClgFwiXG4gICAgfSxcbiAgICBcIm1oXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hcnNoYWxsZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2FqaW4gTcynYWplxLxcIlxuICAgIH0sXG4gICAgXCJtblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNb25nb2xpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQvNC+0L3Qs9C+0LtcIlxuICAgIH0sXG4gICAgXCJuYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOYXVydVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkVrYWthaXLFqSBOYW9lcm9cIlxuICAgIH0sXG4gICAgXCJudlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOYXZham8sIE5hdmFob1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkRpbsOpIGJpemFhZCwgRGluw6lryrxlaMeww61cIlxuICAgIH0sXG4gICAgXCJuYlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW4gQm9rbcOlbFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrIGJva23DpWxcIlxuICAgIH0sXG4gICAgXCJuZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J0aCBOZGViZWxlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiaXNpTmRlYmVsZVwiXG4gICAgfSxcbiAgICBcIm5lXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5lcGFsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkqOClh+CkquCkvuCksuClgFwiXG4gICAgfSxcbiAgICBcIm5nXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5kb25nYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk93YW1ib1wiXG4gICAgfSxcbiAgICBcIm5uXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcndlZ2lhbiBOeW5vcnNrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTm9yc2sgbnlub3Jza1wiXG4gICAgfSxcbiAgICBcIm5vXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcndlZ2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrXCJcbiAgICB9LFxuICAgIFwiaWlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTnVvc3VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLqhojqjKDqkr8gTnVvc3VoeG9wXCJcbiAgICB9LFxuICAgIFwibnJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU291dGggTmRlYmVsZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImlzaU5kZWJlbGVcIlxuICAgIH0sXG4gICAgXCJvY1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPY2NpdGFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT2NjaXRhblwiXG4gICAgfSxcbiAgICBcIm9qXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9qaWJ3ZSwgT2ppYndhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4ZCK4ZOC4ZSR4ZOI4ZCv4ZKn4ZCO4ZOQXCJcbiAgICB9LFxuICAgIFwiY3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT2xkIENodXJjaCBTbGF2b25pYywgQ2h1cmNoIFNsYXZpYywgQ2h1cmNoIFNsYXZvbmljLCBPbGQgQnVsZ2FyaWFuLCBPbGQgU2xhdm9uaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRqdC30YvQutGKINGB0LvQvtCy0aPQvdGM0YHQutGKXCJcbiAgICB9LFxuICAgIFwib21cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT3JvbW9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBZmFhbiBPcm9tb29cIlxuICAgIH0sXG4gICAgXCJvclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPcml5YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCsk+CsoeCsvOCsv+CshlwiXG4gICAgfSxcbiAgICBcIm9zXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9zc2V0aWFuLCBPc3NldGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LjRgNC+0L0gw6bQstC30LDQs1wiXG4gICAgfSxcbiAgICBcInBhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBhbmphYmksIFB1bmphYmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgqKrgqbDgqJzgqL7gqKzgqYAsINm+2YbYrNin2KjbjOKAjlwiXG4gICAgfSxcbiAgICBcInBpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlDEgWxpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KSq4KS+4KS04KS/XCJcbiAgICB9LFxuICAgIFwiZmFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUGVyc2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItmB2KfYsdiz24xcIlxuICAgIH0sXG4gICAgXCJwbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQb2xpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJwb2xza2lcIlxuICAgIH0sXG4gICAgXCJwc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQYXNodG8sIFB1c2h0b1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItm+2prYqtmIXCJcbiAgICB9LFxuICAgIFwicHRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUG9ydHVndWVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlBvcnR1Z3XDqnNcIlxuICAgIH0sXG4gICAgXCJxdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJRdWVjaHVhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiUnVuYSBTaW1pLCBLaWNod2FcIlxuICAgIH0sXG4gICAgXCJybVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJSb21hbnNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwicnVtYW50c2NoIGdyaXNjaHVuXCJcbiAgICB9LFxuICAgIFwicm5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2lydW5kaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImtpUnVuZGlcIlxuICAgIH0sXG4gICAgXCJyb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJSb21hbmlhbiwgTW9sZGF2aWFuLCBNb2xkb3ZhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInJvbcOibsSDXCJcbiAgICB9LFxuICAgIFwicnVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUnVzc2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGA0YPRgdGB0LrQuNC5INGP0LfRi9C6XCJcbiAgICB9LFxuICAgIFwic2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2Fuc2tyaXQgKFNh4bmBc2vhuZt0YSlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLjgpILgpLjgpY3gpJXgpYPgpKTgpK7gpY1cIlxuICAgIH0sXG4gICAgXCJzY1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTYXJkaW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzYXJkdVwiXG4gICAgfSxcbiAgICBcInNkXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNpbmRoaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkuOCkv+CkqOCljeCkp+ClgCwg2LPZhtqM2YrYjCDYs9mG2K/avtuM4oCOXCJcbiAgICB9LFxuICAgIFwic2VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9ydGhlcm4gU2FtaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkRhdnZpc8OhbWVnaWVsbGFcIlxuICAgIH0sXG4gICAgXCJzbVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTYW1vYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJnYWdhbmEgZmFhIFNhbW9hXCJcbiAgICB9LFxuICAgIFwic2dcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2FuZ29cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJ5w6JuZ8OiIHTDriBzw6RuZ8O2XCJcbiAgICB9LFxuICAgIFwic3JcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2VyYmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGB0YDQv9GB0LrQuCDRmNC10LfQuNC6XCJcbiAgICB9LFxuICAgIFwiZ2RcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2NvdHRpc2ggR2FlbGljOyBHYWVsaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHw6BpZGhsaWdcIlxuICAgIH0sXG4gICAgXCJzblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTaG9uYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImNoaVNob25hXCJcbiAgICB9LFxuICAgIFwic2lcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2luaGFsYSwgU2luaGFsZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LeD4LeS4LaC4LeE4La9XCJcbiAgICB9LFxuICAgIFwic2tcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2xvdmFrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic2xvdmVuxI1pbmFcIlxuICAgIH0sXG4gICAgXCJzbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTbG92ZW5lXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic2xvdmVuxaHEjWluYVwiXG4gICAgfSxcbiAgICBcInNvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNvbWFsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNvb21hYWxpZ2EsIGFmIFNvb21hYWxpXCJcbiAgICB9LFxuICAgIFwic3RcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU291dGhlcm4gU290aG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTZXNvdGhvXCJcbiAgICB9LFxuICAgIFwiZXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3BhbmlzaDsgQ2FzdGlsaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZXNwYcOxb2wsIGNhc3RlbGxhbm9cIlxuICAgIH0sXG4gICAgXCJzdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTdW5kYW5lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJCYXNhIFN1bmRhXCJcbiAgICB9LFxuICAgIFwic3dcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3dhaGlsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktpc3dhaGlsaVwiXG4gICAgfSxcbiAgICBcInNzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlN3YXRpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2lTd2F0aVwiXG4gICAgfSxcbiAgICBcInN2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlN3ZWRpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzdmVuc2thXCJcbiAgICB9LFxuICAgIFwidGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFtaWxcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgrqTgrq7grr/grrTgr41cIlxuICAgIH0sXG4gICAgXCJ0ZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUZWx1Z3VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgsKTgsYbgsLLgsYHgsJfgsYFcIlxuICAgIH0sXG4gICAgXCJ0Z1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUYWppa1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGC0L7St9C40LrToywgdG/En2lrxKssINiq2KfYrNuM2qnbjOKAjlwiXG4gICAgfSxcbiAgICBcInRoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRoYWlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLguYTguJfguKJcIlxuICAgIH0sXG4gICAgXCJ0aVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUaWdyaW55YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGJteGMjeGIreGKm1wiXG4gICAgfSxcbiAgICBcImJvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRpYmV0YW4gU3RhbmRhcmQsIFRpYmV0YW4sIENlbnRyYWxcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgvZbgvbzgvZHgvIvgvaHgvbLgvYJcIlxuICAgIH0sXG4gICAgXCJ0a1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUdXJrbWVuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVMO8cmttZW4sINCi0q/RgNC60LzQtdC9XCJcbiAgICB9LFxuICAgIFwidGxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFnYWxvZ1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIldpa2FuZyBUYWdhbG9nLCDhnI/hnJLhnIPhnIXhnJQg4ZyG4ZyE4ZyO4ZyT4ZyE4ZyUXCJcbiAgICB9LFxuICAgIFwidG5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHN3YW5hXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2V0c3dhbmFcIlxuICAgIH0sXG4gICAgXCJ0b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUb25nYSAoVG9uZ2EgSXNsYW5kcylcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJmYWthIFRvbmdhXCJcbiAgICB9LFxuICAgIFwidHJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHVya2lzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlTDvHJrw6dlXCJcbiAgICB9LFxuICAgIFwidHNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHNvbmdhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiWGl0c29uZ2FcIlxuICAgIH0sXG4gICAgXCJ0dFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUYXRhclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGC0LDRgtCw0YDRh9CwLCB0YXRhcsOnYSwg2KrYp9iq2KfYsdqG2KfigI5cIlxuICAgIH0sXG4gICAgXCJ0d1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUd2lcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUd2lcIlxuICAgIH0sXG4gICAgXCJ0eVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUYWhpdGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlJlbyBUYWhpdGlcIlxuICAgIH0sXG4gICAgXCJ1Z1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJVaWdodXIsIFV5Z2h1clwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlV5xqN1cnHJmSwg2Kbbh9mK2Lrbh9ix2obbleKAjlwiXG4gICAgfSxcbiAgICBcInVrXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlVrcmFpbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGD0LrRgNCw0ZfQvdGB0YzQutCwXCJcbiAgICB9LFxuICAgIFwidXJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVXJkdVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItin2LHYr9mIXCJcbiAgICB9LFxuICAgIFwidXpcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVXpiZWtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJ6YmVrLCDQjtC30LHQtdC6LCDYo9uH2LLYqNuQ2YPigI5cIlxuICAgIH0sXG4gICAgXCJ2ZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJWZW5kYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlRzaGl2ZW7huJNhXCJcbiAgICB9LFxuICAgIFwidmlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVmlldG5hbWVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlRp4bq/bmcgVmnhu4d0XCJcbiAgICB9LFxuICAgIFwidm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVm9sYXDDvGtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJWb2xhcMO8a1wiXG4gICAgfSxcbiAgICBcIndhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldhbGxvb25cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJXYWxvblwiXG4gICAgfSxcbiAgICBcImN5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldlbHNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQ3ltcmFlZ1wiXG4gICAgfSxcbiAgICBcIndvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldvbG9mXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiV29sbG9mXCJcbiAgICB9LFxuICAgIFwiZnlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiV2VzdGVybiBGcmlzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRnJ5c2tcIlxuICAgIH0sXG4gICAgXCJ4aFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJYaG9zYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImlzaVhob3NhXCJcbiAgICB9LFxuICAgIFwieWlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiWWlkZGlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIteZ15nWtNeT15nXqVwiXG4gICAgfSxcbiAgICBcInlvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIllvcnViYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIllvcsO5YsOhXCJcbiAgICB9LFxuICAgIFwiemFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiWmh1YW5nLCBDaHVhbmdcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTYcmvIGN1ZcWLxoUsIFNhdyBjdWVuZ2hcIlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvZGF0YS9sYW5ndWFnZXMuanMiLCJleHBvcnQgY29uc3QgZmlsdGVyVHlwZXM9IHtcbiAgICBBRERfUklHSFQ6J0FERF9SSUdIVCcsXG4gICAgUkVNT1ZFX1JJR0hUIDogJ1JFTU9WRV9SSUdIVCcsXG4gICAgVVBEQVRFX0NPVU5UUklFUyA6ICdVUERBVEVfQ09VTlRSSUVTJyxcbiAgICBVUERBVEVfRVhDTFVTSVZFIDogJ1VQREFURV9FWENMVVNJVkUnLFxuICAgIFVQREFURV9JTkNMVURFRF9DT1VOVFJJRVMgOiAnVVBEQVRFX0lOQ0xVREVEX0NPVU5UUklFUycsXG4gICAgVVBEQVRFX1NQT1JUIDogJ1VQREFURV9TUE9SVCcsXG4gICAgVVBEQVRFX0VWRU5UIDogJ1VQREFURV9FVkVOVCcsXG4gICAgQ0xFQVIgOiAnQ0xFQVInLFxuICAgIENMRUFSX1VQREFURSA6ICdDTEVBUl9VUERBVEUnLFxuICAgIFVQREFURV9NQU5ZIDogJ1VQREFURV9NQU5ZJyxcbiAgICBVUERBVEVfRklMVEVSU19DT05GSUc6IFwiVVBEQVRFX0FMTFwiLFxuICAgIFVQREFURV9FVkVOVF9EQVRFX0ZST01fVE86IFwiVVBEQVRFX0ZST01fVE9cIixcbn07XG5cbmNvbnN0IGRlZmF1bHRGaWx0ZXIgPSB7XG4gICAgcmlnaHRzOiBbXSxcbiAgICBjb3VudHJpZXM6IFtdLFxuICAgIGV4Y2x1c2l2ZSA6IGZhbHNlLFxuICAgIGluY2x1ZGVBbGxDb3VudHJpZXMgOiBmYWxzZSxcbiAgICBzcG9ydDoge1xuICAgICAgICB2YWx1ZSA6IG51bGwsXG4gICAgICAgIGxhYmVsIDogXCJBbGwgc3BvcnRzXCJcbiAgICB9LFxuICAgIGV2ZW50IDogXCJcIixcbiAgICBmb3JjZVVwZGF0ZSA6IHRydWUsXG4gICAgZXZlbnREYXRlRnJvbTogXCJcIixcbiAgICBldmVudERhdGVUbzogXCJcIlxufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IChzdGF0ZSA9IGRlZmF1bHRGaWx0ZXIsIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfSU5DTFVERURfQ09VTlRSSUVTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUFsbENvdW50cmllczogYWN0aW9uLmluY2x1ZGVBbGxDb3VudHJpZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLkNMRUFSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkZWZhdWx0RmlsdGVyKTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5DTEVBUl9VUERBVEU6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBmb3JjZVVwZGF0ZTogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLkFERF9SSUdIVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHJpZ2h0czogWy4uLnN0YXRlLnJpZ2h0cywgYWN0aW9uLmlkXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuUkVNT1ZFX1JJR0hUOlxuICAgICAgICAgICAgbGV0IGluZGV4ID0gc3RhdGUucmlnaHRzLmluZGV4T2YoYWN0aW9uLmlkKTtcbiAgICAgICAgICAgIHN0YXRlLnJpZ2h0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgcmlnaHRzOiBbLi4uc3RhdGUucmlnaHRzXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0NPVU5UUklFUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGNvdW50cmllczogYWN0aW9uLmNvdW50cmllcy5tYXAoYz0+Yy52YWx1ZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9FVkVOVF9EQVRFX0ZST01fVE86XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtldmVudERhdGVGcm9tOiBhY3Rpb24uZnJvbSwgZXZlbnREYXRlVG86IGFjdGlvbi50b30pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9FWENMVVNJVkU6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBleGNsdXNpdmU6IGFjdGlvbi5leGNsdXNpdmVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9TUE9SVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNwb3J0OiBhY3Rpb24uc3BvcnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9GSUxURVJTX0NPTkZJRzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uLmZpbHRlcnMpO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9FVkVOVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGV2ZW50OiBhY3Rpb24uZXZlbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9NQU5ZOlxuICAgICAgICAgICAgYWN0aW9uLmZpbHRlcnMuZm9yY2VVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGFjdGlvbi5maWx0ZXJzLnJpZ2h0cykgYWN0aW9uLmZpbHRlcnMucmlnaHRzID0gYWN0aW9uLmZpbHRlcnMucmlnaHRzLm1hcChyPT5OdW1iZXIocikpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uZmlsdGVycyk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvZmlsdGVyLmpzIiwiXG5leHBvcnQgY29uc3QgbWFya2V0cGxhY2VUeXBlcz0ge1xuICAgIFRFU1Q6J1RFU1QnLFxufTtcblxuZXhwb3J0IGNvbnN0IG1hcmtldHBsYWNlID0gKHN0YXRlID0ge1xuICAgIHRlc3RJdGVtOiBcIm1hcmtldHBsYWNlUmVkdWNlclwiXG5cbn0sIGFjdGlvbikgPT4ge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIG1hcmtldHBsYWNlVHlwZXMuVEVTVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHRlc3Q6IGFjdGlvbi50ZXh0LFxuICAgICAgICAgICAgICAgIGlkIDogYWN0aW9uLmlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9yZWR1Y2Vycy9tYXJrZXRwbGFjZS5qcyIsIi8qKlxuKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuKi9cblxubGV0IF9fYXBpU3RvcmUgPSB7XG4gICAgdG91cm5hbWVudHMgOiB7fVxufTtcblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5Db250ZW50QXJlbmEuQ29udGVudEFwaSA9IENvbnRlbnRBcmVuYS5Db250ZW50QXBpfHwge307XG5cbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpPSB7XG4gICAgc2F2ZUNvbnRlbnRBc0RyYWZ0ICggY29udGVudCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9kcmFmdC9zYXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNhdmVDb250ZW50QXNJbmFjdGl2ZSAoIGNvbnRlbnQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5nL3NhdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2F2ZUNvbnRlbnRBc0FjdGl2ZSAoIGNvbnRlbnQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5nL3B1Ymxpc2hcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVwdWJsaXNoTGlzdGluZyAoIGN1c3RvbUlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZy9yZXB1Ymxpc2hcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe2N1c3RvbUlkOiBjdXN0b21JZH0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNlbmRNZXNzYWdlICggbWVzc2FnZSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3NlbmRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VXNlckluZm8gKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvaW5mb1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VXNlckluZm9CeUFjdGl2YXRpb25Db2RlICggYWN0aXZhdGlvbkNvZGUgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL2NvZGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgZGF0YSA6IEpTT04uc3RyaW5naWZ5KHthY3RpdmF0aW9uQ29kZTogYWN0aXZhdGlvbkNvZGV9KSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDb21wYW55VXNlcnMgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2NvbXBhbnkvdXNlcnNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHVwZGF0ZUNvbXBhbnkgKCBjb21wYW55ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvY29tcGFueS91cGRhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe2NvbXBhbnk6Y29tcGFueX0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHVwZGF0ZVBhc3N3b3JkICggZGF0YSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvcGFzc3dvcmRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgdXBkYXRlVXNlciAoIHVzZXIgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL3VwZGF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcjp1c2VyfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgYWN0aXZhdGVVc2VyICggdXNlciwgcGFzc3dvcmQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS91c2VyL2FjdGl2YXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHt1c2VyOnVzZXIsaWQ6IHVzZXIuaWQsIHBhc3N3b3JkIDogcGFzc3dvcmR9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZVVzZXJQcm9maWxlICggcHJvZmlsZSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvcHJvZmlsZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7cHJvZmlsZTpwcm9maWxlfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VGhyZWFkICggY3VzdG9tSWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9tZXNzYWdlcy90aHJlYWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe2N1c3RvbUlkOiBjdXN0b21JZH0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRocmVhZHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9tZXNzYWdlcy90aHJlYWRzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBwbGFjZUJpZCAoIGJpZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9wbGFjZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHBsYWNlQmlkcyAoIGJpZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZHMvcGxhY2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBhY2NlcHRCaWQgKCBiaWQsIHNpZ25hdHVyZSwgc2lnbmF0dXJlTmFtZSwgc2lnbmF0dXJlUG9zaXRpb24gKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGJpZC5zaWduYXR1cmUgPSBzaWduYXR1cmU7XG4gICAgICAgIGJpZC5zaWduYXR1cmVOYW1lID0gc2lnbmF0dXJlTmFtZTtcbiAgICAgICAgYmlkLnNpZ25hdHVyZVBvc2l0aW9uID0gc2lnbmF0dXJlUG9zaXRpb247XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9hY2NlcHRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZWplY3RCaWQgKCBiaWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcmVqZWN0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVtb3ZlQmlkICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3JlbW92ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgc2F2ZVRtcEZpbGUgKCBmaWxlcyApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBkYXRhLmFwcGVuZCgnZmlsZScsIGZpbGVzWzBdKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L3NhdmUvZmlsZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNhdmVBdHRhY2htZW50RmlsZSAoIGZpbGVzICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlJywgZmlsZXNbMF0pO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvc2F2ZS9hdHRhY2htZW50XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZBSUxFRFwiKVxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZW1vdmVBdHRhY2htZW50RmlsZSAoIGZpbGUgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9yZW1vdmUvYXR0YWNobWVudFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZmlsZSA6IGZpbGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZBSUxFRFwiKVxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRCeUN1c3RvbUlkICggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImxpc3RpbmcvZGV0YWlsc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBnZXREcmFmdExpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kcmFmdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0SW5hY3RpdmVMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvaW5hY3RpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFjdGl2ZUxpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9hY3RpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEV4cGlyZWRMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZXhwaXJlZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVtb3ZlTGlzdGluZyggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9yZW1vdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGR1cGxpY2F0ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZHVwbGljYXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBkZWFjdGl2YXRlTGlzdGluZyggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kZWFjdGl2YXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBhcmNoaXZlTGlzdGluZyggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9hcmNoaXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIGdldENsb3NlZERlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL2Nsb3NlZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFsbERlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL2FsbFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFBlbmRpbmdEZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9wZW5kaW5nXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmVqZWN0ZWREZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZWplY3RlZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFdhdGNobGlzdExpc3RpbmdzICgpe1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3Mvd2F0Y2hsaXN0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbi8qKlxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiAqL1xuXG5sZXQgX19hcGlTdG9yZSA9IHtcbiAgICB0b3VybmFtZW50cyA6IHt9XG59O1xuXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcblxuQ29udGVudEFyZW5hLkFwaT0ge1xuICAgIHNvcnRCeUxhYmVsIChhLCBiKSB7XG4gICAgICAgIHJldHVybiAoYS5uYW1lID4gYi5uYW1lKSA/IDEgOiAoKGIubmFtZSA+IGEubmFtZSkgPyAtMSA6IDApXG4gICAgfSxcbiAgICBzb3J0QnlTcG9ydCAoYSwgYikge1xuXG4gICAgICAgIGlmIChhLnNwb3J0Lm5hbWUgPiBiLnNwb3J0Lm5hbWUpIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lIDwgYi5zcG9ydC5uYW1lKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLnNwb3J0Q2F0ZWdvcnkubmFtZSA+IGIuc3BvcnRDYXRlZ29yeS5uYW1lKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEuc3BvcnRDYXRlZ29yeS5uYW1lIDwgYi5zcG9ydENhdGVnb3J5Lm5hbWUpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEubmFtZSA+IGIubmFtZSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLm5hbWUgPCBiLm5hbWUpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIDA7XG5cbiAgICB9LFxuICAgIHByZXBhcmVMaXN0ICggbGlzdCwgY2F0ZWdvcnlJZCApIHtcblxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGxpc3QgPSAkLm1hcChsaXN0LCBmdW5jdGlvbiAoaXRlbSkge1xuXG4gICAgICAgICAgICAvLyBGaWx0ZXIgYnkgY2F0ZWdvcnlcbiAgICAgICAgICAgIGlmICggY2F0ZWdvcnlJZCAmJiBpdGVtLmNhdGVnb3J5WydAYXR0cmlidXRlcyddLmlkICE9IGNhdGVnb3J5SWQpIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4ge25hbWU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10ubmFtZSwgZXh0ZXJuYWxJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGlzdC5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcblxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9LFxuICAgIGZpbHRlckRvdWJsZXMgKCBsaXN0LCBzcG9ydElkICl7XG4gICAgICAgIGxldCBuYW1lcyA9IFtdO1xuXG4gICAgICAgIGlmICggc3BvcnRJZCA9PT0gXCJzcjpzcG9ydDo1XCIgKXtcbiAgICAgICAgICAgIGxpc3QgPSBsaXN0Lm1hcChpdGVtPT57XG4gICAgICAgICAgICAgICAgaXRlbS5uYW1lID0gaXRlbS5uYW1lLnJlcGxhY2UoLyBzaW5nbGVzL2dpLCcnKS5yZXBsYWNlKC8gZG91YmxlL2dpLCcnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH0pLmZpbHRlcihpdGVtPT57XG4gICAgICAgICAgICAgICAgaWYgKG5hbWVzLmluZGV4T2YoaXRlbS5uYW1lKSA9PT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKGl0ZW0ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9LFxuICAgIGdldENvbXBhbnlUZXJtcyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdGVybXMvY29tcGFueVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBnZXRDb21wYW55RGVmaW5pdGlvbnMgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2RlZmluaXRpb25zL2NvbXBhbnlcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgcmVzdG9yZUNvbXBhbnlUZXJtcyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdGVybXMvcmVzdG9yZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICByZXN0b3JlRGVmaW5pdGlvbnMgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2RlZmluaXRpb25zL3Jlc3RvcmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlVGVybXMgKCB0ZXJtcywgZGVmaW5pdGlvbnMgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS90ZXJtcy91cGRhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICB0ZXJtcyA6IHRlcm1zLFxuICAgICAgICAgICAgICAgIGRlZmluaXRpb25zIDogZGVmaW5pdGlvbnNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q29udGVudCAoIGZpbHRlcikge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJidXkvc2VhcmNoXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiBmaWx0ZXIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0SnNvbkNvbnRlbnQgKCBmaWx0ZXIpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwibGlzdGluZ3MvbWFya2V0cGxhY2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IGZpbHRlcixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzYXZlRmlsdGVyICggZmlsdGVyKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImJ1eS9maWx0ZXIvc2F2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvdW50cmllcyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGlmICggQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzICYmIENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcy5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9jb3VudHJpZXMvYWxsXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gcmVzcG9uc2UubWFwKGM9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGMucmVnaW9ucyA9IGMucmVnaW9ucy5tYXAocj0+ci5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLmV4dGVybmFsSWQgPSBjLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNcblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0QWN0aXZlU3BvcnRzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvc3BvcnRzL2FjdGl2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBbGxTcG9ydHMgKGZsYWdzKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3Nwb3J0cy9hbGxcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGZsYWdzOiBmbGFncyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRTcG9ydHNHcm91cHMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9zcG9ydHMvZ3JvdXBzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvdW50cmllc0Z1bGwgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9jb3VudHJpZXMvZnVsbFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7YXJyYXl9IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRUZXJyaXRvcmllcyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3RlcnJpdG9yaWVzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFJlZ2lvbnMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9yZWdpb25zXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFJpZ2h0cyAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvcmlnaHRzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7XG4gICAgICAgICAgICAgICAgcmlnaHRzUGFja2FnZTogcmlnaHRzUGFja2FnZSxcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXBcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFJpZ2h0c1BhY2thZ2UgKHJpZ2h0c1BhY2thZ2UsIGdyb3VwKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3JpZ2h0cy1wYWNrYWdlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7XG4gICAgICAgICAgICAgICAgcmlnaHRzUGFja2FnZTogcmlnaHRzUGFja2FnZSxcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXBcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFNwb3J0cyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC9zcG9ydHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3Nwb3J0Om9iamVjdH19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNwb3J0cyA9IF90aGlzLnByZXBhcmVMaXN0KCByZXNwb25zZS5zcG9ydCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzcG9ydHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDb250ZW50RGV0YWlscyggaWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvZGV0YWlscy9cIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFBlbmRpbmdMaXN0aW5ncyggaWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvcGVuZGluZy1saXN0aW5ncy9cIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENhdGVnb3JpZXMgKCBzcG9ydElkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcyxcbiAgICAgICAgICAgIGxpc3QgPSBbXSxcbiAgICAgICAgICAgIGNhdHMgPSBbXTtcblxuICAgICAgICBfdGhpcy5nZXRUb3VybmFtZW50cyhzcG9ydElkKS5kb25lKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKCAhIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSggW10gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxpc3QgPSAkLm1hcCggX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXS50b3VybmFtZW50ICwgZnVuY3Rpb24gKGl0ZW0pIHtcblxuICAgICAgICAgICAgICAgIGxldCBpZCA9IGl0ZW0uY2F0ZWdvcnlbJ0BhdHRyaWJ1dGVzJ10uaWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGNhdHMuaW5kZXhPZihpZCkgIT09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYXRzLnB1c2goIGlkICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmNhdGVnb3J5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKF90aGlzLnByZXBhcmVMaXN0KGxpc3QpICk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRvdXJuYW1lbnRzICggc3BvcnRJZCwgY2F0ZWdvcnlJZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXMsIHN0b3JlZFJlc3BvbnNlO1xuXG4gICAgICAgIGlmICggX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSAhPT0gdW5kZWZpbmVkICl7XG5cbiAgICAgICAgICAgIHN0b3JlZFJlc3BvbnNlID0gX3RoaXMucHJlcGFyZUxpc3QoX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXS50b3VybmFtZW50LCBjYXRlZ29yeUlkKVxuICAgICAgICAgICAgc3RvcmVkUmVzcG9uc2UgPSBfdGhpcy5maWx0ZXJEb3VibGVzKHN0b3JlZFJlc3BvbnNlLHNwb3J0SWQpO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShzdG9yZWRSZXNwb25zZSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZXh0ZXJuYWxBcGlVcmwgKyBcInYxL2ZlZWQvdG91cm5hbWVudHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiBzcG9ydElkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgLy8gQSBjb21tZW50XG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS50b3VybmFtZW50cyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnRvdXJuYW1lbnRzLnRvdXJuYW1lbnQgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdID0gcmVzcG9uc2UudG91cm5hbWVudHM7XG5cbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IF90aGlzLnByZXBhcmVMaXN0KHJlc3BvbnNlLnRvdXJuYW1lbnRzLnRvdXJuYW1lbnQsIGNhdGVnb3J5SWQpO1xuICAgICAgICAgICAgICAgIGxpc3QgPSBfdGhpcy5maWx0ZXJEb3VibGVzKGxpc3QsIHNwb3J0SWQpO1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0U2Vhc29ucyAoIHRvdXJuYW1lbnRJZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZXh0ZXJuYWxBcGlVcmwgKyBcInYxL2ZlZWQvc2Vhc29uc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHRvdXJuYW1lbnRJZCB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3t0b3VybmFtZW50czp7dG91cm5hbWVudDpBcnJheX19fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIHZhciBsaXN0O1xuXG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zZWFzb25zID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24gPT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICggJC5pc0FycmF5KHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uKSApe1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gJC5tYXAocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24sIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uZW5kX2RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiBpdGVtWydAYXR0cmlidXRlcyddLnN0YXJ0X2RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudElkOiBpdGVtWydAYXR0cmlidXRlcyddLnRvdXJuYW1lbnRfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogaXRlbVsnQGF0dHJpYnV0ZXMnXS55ZWFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KS5yZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmREYXRlOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5lbmRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10udG91cm5hbWVudF9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXI6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLnllYXIsXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRTY2hlZHVsZSAoIHNlYXNvbklkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC9zY2hlZHVsZXNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHsgaWQgOiBzZWFzb25JZCB9LFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3t0b3VybmFtZW50czp7dG91cm5hbWVudDpBcnJheX19fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcblxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnNwb3J0X2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnNwb3J0X2V2ZW50cy5zcG9ydF9ldmVudCA9PT0gdW5kZWZpbmVkICkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50LmZvckVhY2goIChpdGVtKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdW5kICA9IChpdGVtLnRvdXJuYW1lbnRfcm91bmQpID8gaXRlbS50b3VybmFtZW50X3JvdW5kWydAYXR0cmlidXRlcyddIDogbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJvdW5kKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSAocm91bmQubnVtYmVyKSA/IFwicm91bmRfXCIgKyByb3VuZC5udW1iZXIgOiByb3VuZC5uYW1lO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggIWxpc3RbbmFtZV0gKSBsaXN0W25hbWVdID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXS5tYXRjaGVzICkgbGlzdFtuYW1lXS5tYXRjaGVzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpc3RbbmFtZV0ubWF0Y2hlcy5zZXQoaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCx7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc2NoZWR1bGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50Um91bmQgOiByb3VuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBldGl0b3JzIDogKGl0ZW0uY29tcGV0aXRvcnMpID8gaXRlbS5jb21wZXRpdG9ycy5jb21wZXRpdG9yLm1hcCgoIGNvbXBldGl0b3IpPT57IHJldHVybiBjb21wZXRpdG9yWydAYXR0cmlidXRlcyddICB9KSAgOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNlYXJjaENvbXBldGl0aW9uKHJlcXVlc3QpIHtcblxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgJ2FwaS9zZWFyY2gvdG91cm5hbWVudCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IHJlcXVlc3RcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmFkaXRpb25hbDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGRhdGEuZmlsdGVyKGl0ZW0gPT4gISFpdGVtLnNwb3J0KS5zb3J0KF90aGlzLnNvcnRCeVNwb3J0KTtcblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgd2F0Y2hsaXN0KCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3dhdGNobGlzdC9hZGRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge2lkIDogaWR9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldE5vdGlmaWNhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7ZW52aG9zdHVybH1hcGkvbm90aWZpY2F0aW9ucy9gKTtcbiAgICB9LFxuICAgIG1hcmtOb3RpZmljYXRpb25Bc1Zpc2l0ZWQoaWQpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoYCR7ZW52aG9zdHVybH1hcGkvbm90aWZpY2F0aW9ucy92aXNpdGVkYCwge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBtYXJrTm90aWZpY2F0aW9uQXNTZWVuKCkge1xuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAke2Vudmhvc3R1cmx9YXBpL25vdGlmaWNhdGlvbnMvc2VlbmApO1xuICAgIH0sXG4gICAgc2lnbkluVXNlcih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoYCR7ZW52aG9zdHVybH1hcGkvdXNlcnMvbG9naW5gLCB7XG4gICAgICAgICAgICB1c2VybmFtZSwgcGFzc3dvcmRcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZWNvdmVyUGFzc3dvcmQoZW1haWwpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoYCR7ZW52aG9zdHVybH1hcGkvdXNlcnMvcGFzc3dvcmQvcmVjb3ZlcmAsIHtcbiAgICAgICAgICAgIGVtYWlsXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc2lnblVwVXNlcihmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgY29tcGFueUxlZ2FsTmFtZSwgcGhvbmUpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLnBvc3QoYCR7ZW52aG9zdHVybH1hcGkvdXNlcnMvcmVnaXN0ZXJgLCB7XG4gICAgICAgICAgICBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbCwgY29tcGFueUxlZ2FsTmFtZSwgcGhvbmVcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5cbkNvbnRlbnRBcmVuYS5EYXRhID0gQ29udGVudEFyZW5hLkRhdGEgfHwge307XG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzID0gQ29udGVudEFyZW5hLkxhbmd1YWdlcyB8fCB7fTtcblxuQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzID0gW1xuICAgIHsgbmFtZSA6IFwiU29jY2VyXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MVwifSxcbiAgICB7IG5hbWUgOiBcIkJhc2tldGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyXCJ9LFxuICAgIHsgbmFtZSA6IFwiQmFzZWJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDozXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6NVwifSxcbiAgICB7IG5hbWUgOiBcIkNyaWNrZXRcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMVwifSxcbiAgICB7IG5hbWUgOiBcIkZpZWxkIEhvY2tleVwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjI0XCJ9LFxuICAgIHsgbmFtZSA6IFwiVm9sbGV5YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIzXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGFibGUgVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjBcIn0sXG4gICAgeyBuYW1lIDogXCJHb2xmXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6OVwifSxcbiAgICB7IG5hbWUgOiBcIkFtZXJpY2FuIEZvb3RiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MTZcIn0sXG4gICAgeyBuYW1lIDogXCJIYW5kYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjZcIn1cbl07XG5cbkNvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBbXTtcbkNvbnRlbnRBcmVuYS5EYXRhLkFjdGl2ZVNwb3J0cyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gW107XG5Db250ZW50QXJlbmEuRGF0YS5UZXJyaXRvcmllcyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuUmVnaW9ucyA9IFtdO1xuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5TaG9ydCA9IHtcbiAgICBcIm1kclwiOiBcIk1hbmRhcmluXCIsXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxuICAgIFwiYm5cIjogXCJCZW5nYWxpXCIsXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcbiAgICBcImphXCI6IFwiSmFwYW5lc2VcIixcbiAgICBcImp2XCI6IFwiSmF2YW5lc2VcIixcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXG4gICAgXCJhbGxcIiA6IFwiU2hvdyBBbGxcIlxufTtcblxuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5Mb25nID0ge1xuICAgIFwiYWFcIjogXCJBZmFyXCIsXG4gICAgXCJhZlwiOiBcIkFmcmlrYWFuc1wiLFxuICAgIFwiYWluXCI6IFwiQWludVwiLFxuICAgIFwiYWt6XCI6IFwiQWxhYmFtYVwiLFxuICAgIFwic3FcIjogXCJBbGJhbmlhblwiLFxuICAgIFwiYWxlXCI6IFwiQWxldXRcIixcbiAgICBcImFycVwiOiBcIkFsZ2VyaWFuIEFyYWJpY1wiLFxuICAgIFwiZW5fVVNcIjogXCJBbWVyaWNhbiBFbmdsaXNoXCIsXG4gICAgXCJhc2VcIjogXCJBbWVyaWNhbiBTaWduIExhbmd1YWdlXCIsXG4gICAgXCJhbVwiOiBcIkFtaGFyaWNcIixcbiAgICBcImVneVwiOiBcIkFuY2llbnQgRWd5cHRpYW5cIixcbiAgICBcImdyY1wiOiBcIkFuY2llbnQgR3JlZWtcIixcbiAgICBcImFyXCI6IFwiQXJhYmljXCIsXG4gICAgXCJhcmNcIjogXCJBcmFtYWljXCIsXG4gICAgXCJhcnBcIjogXCJBcmFwYWhvXCIsXG4gICAgXCJhcndcIjogXCJBcmF3YWtcIixcbiAgICBcImh5XCI6IFwiQXJtZW5pYW5cIixcbiAgICBcImFzXCI6IFwiQXNzYW1lc2VcIixcbiAgICBcImFzYVwiOiBcIkFzdVwiLFxuICAgIFwiZW5fQVVcIjogXCJBdXN0cmFsaWFuIEVuZ2xpc2hcIixcbiAgICBcImRlX0FUXCI6IFwiQXVzdHJpYW4gR2VybWFuXCIsXG4gICAgXCJheVwiOiBcIkF5bWFyYVwiLFxuICAgIFwiYXpcIjogXCJBemVyYmFpamFuaVwiLFxuICAgIFwiYmFuXCI6IFwiQmFsaW5lc2VcIixcbiAgICBcImV1XCI6IFwiQmFzcXVlXCIsXG4gICAgXCJiYXJcIjogXCJCYXZhcmlhblwiLFxuICAgIFwiYmVcIjogXCJCZWxhcnVzaWFuXCIsXG4gICAgXCJiblwiOiBcIkJlbmdhbGlcIixcbiAgICBcImJpa1wiOiBcIkJpa29sXCIsXG4gICAgXCJiaW5cIjogXCJCaW5pXCIsXG4gICAgXCJic1wiOiBcIkJvc25pYW5cIixcbiAgICBcImJyaFwiOiBcIkJyYWh1aVwiLFxuICAgIFwiYnJhXCI6IFwiQnJhalwiLFxuICAgIFwicHRfQlJcIjogXCJCcmF6aWxpYW4gUG9ydHVndWVzZVwiLFxuICAgIFwiYnJcIjogXCJCcmV0b25cIixcbiAgICBcImVuX0dCXCI6IFwiQnJpdGlzaCBFbmdsaXNoXCIsXG4gICAgXCJiZ1wiOiBcIkJ1bGdhcmlhblwiLFxuICAgIFwibXlcIjogXCJCdXJtZXNlXCIsXG4gICAgXCJmcmNcIjogXCJDYWp1biBGcmVuY2hcIixcbiAgICBcImVuX0NBXCI6IFwiQ2FuYWRpYW4gRW5nbGlzaFwiLFxuICAgIFwiZnJfQ0FcIjogXCJDYW5hZGlhbiBGcmVuY2hcIixcbiAgICBcInl1ZVwiOiBcIkNhbnRvbmVzZVwiLFxuICAgIFwiY2FyXCI6IFwiQ2FyaWJcIixcbiAgICBcImNhXCI6IFwiQ2F0YWxhblwiLFxuICAgIFwiY2F5XCI6IFwiQ2F5dWdhXCIsXG4gICAgXCJjZWJcIjogXCJDZWJ1YW5vXCIsXG4gICAgXCJzaHVcIjogXCJDaGFkaWFuIEFyYWJpY1wiLFxuICAgIFwiY2VcIjogXCJDaGVjaGVuXCIsXG4gICAgXCJjaHJcIjogXCJDaGVyb2tlZVwiLFxuICAgIFwicXVnXCI6IFwiQ2hpbWJvcmF6byBIaWdobGFuZCBRdWljaHVhXCIsXG4gICAgXCJ6aFwiOiBcIkNoaW5lc2VcIixcbiAgICBcImNoblwiOiBcIkNoaW5vb2sgSmFyZ29uXCIsXG4gICAgXCJjaHBcIjogXCJDaGlwZXd5YW5cIixcbiAgICBcImNob1wiOiBcIkNob2N0YXdcIixcbiAgICBcImN1XCI6IFwiQ2h1cmNoIFNsYXZpY1wiLFxuICAgIFwiY3ZcIjogXCJDaHV2YXNoXCIsXG4gICAgXCJud2NcIjogXCJDbGFzc2ljYWwgTmV3YXJpXCIsXG4gICAgXCJzeWNcIjogXCJDbGFzc2ljYWwgU3lyaWFjXCIsXG4gICAgXCJzd2NcIjogXCJDb25nbyBTd2FoaWxpXCIsXG4gICAgXCJjb3BcIjogXCJDb3B0aWNcIixcbiAgICBcImt3XCI6IFwiQ29ybmlzaFwiLFxuICAgIFwiY29cIjogXCJDb3JzaWNhblwiLFxuICAgIFwiY3JcIjogXCJDcmVlXCIsXG4gICAgXCJtdXNcIjogXCJDcmVla1wiLFxuICAgIFwiY3JoXCI6IFwiQ3JpbWVhbiBUdXJraXNoXCIsXG4gICAgXCJoclwiOiBcIkNyb2F0aWFuXCIsXG4gICAgXCJjc1wiOiBcIkN6ZWNoXCIsXG4gICAgXCJkYWtcIjogXCJEYWtvdGFcIixcbiAgICBcImRhXCI6IFwiRGFuaXNoXCIsXG4gICAgXCJkZWxcIjogXCJEZWxhd2FyZVwiLFxuICAgIFwibmxcIjogXCJEdXRjaFwiLFxuICAgIFwiZnJzXCI6IFwiRWFzdGVybiBGcmlzaWFuXCIsXG4gICAgXCJhcnpcIjogXCJFZ3lwdGlhbiBBcmFiaWNcIixcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxuICAgIFwiZW9cIjogXCJFc3BlcmFudG9cIixcbiAgICBcImV0XCI6IFwiRXN0b25pYW5cIixcbiAgICBcInB0X1BUXCI6IFwiRXVyb3BlYW4gUG9ydHVndWVzZVwiLFxuICAgIFwiZXNfRVNcIjogXCJFdXJvcGVhbiBTcGFuaXNoXCIsXG4gICAgXCJlZVwiOiBcIkV3ZVwiLFxuICAgIFwiZmFuXCI6IFwiRmFuZ1wiLFxuICAgIFwiaGlmXCI6IFwiRmlqaSBIaW5kaVwiLFxuICAgIFwiZmpcIjogXCJGaWppYW5cIixcbiAgICBcImZpbFwiOiBcIkZpbGlwaW5vXCIsXG4gICAgXCJmaVwiOiBcIkZpbm5pc2hcIixcbiAgICBcIm5sX0JFXCI6IFwiRmxlbWlzaFwiLFxuICAgIFwiZm9uXCI6IFwiRm9uXCIsXG4gICAgXCJmclwiOiBcIkZyZW5jaFwiLFxuICAgIFwiZ2FhXCI6IFwiR2FcIixcbiAgICBcImdhblwiOiBcIkdhbiBDaGluZXNlXCIsXG4gICAgXCJrYVwiOiBcIkdlb3JnaWFuXCIsXG4gICAgXCJkZVwiOiBcIkdlcm1hblwiLFxuICAgIFwiZ290XCI6IFwiR290aGljXCIsXG4gICAgXCJncmJcIjogXCJHcmVib1wiLFxuICAgIFwiZWxcIjogXCJHcmVla1wiLFxuICAgIFwiZ25cIjogXCJHdWFyYW5pXCIsXG4gICAgXCJndVwiOiBcIkd1amFyYXRpXCIsXG4gICAgXCJndXpcIjogXCJHdXNpaVwiLFxuICAgIFwiaGFpXCI6IFwiSGFpZGFcIixcbiAgICBcImh0XCI6IFwiSGFpdGlhblwiLFxuICAgIFwiaGFrXCI6IFwiSGFra2EgQ2hpbmVzZVwiLFxuICAgIFwiaGFcIjogXCJIYXVzYVwiLFxuICAgIFwiaGF3XCI6IFwiSGF3YWlpYW5cIixcbiAgICBcImhlXCI6IFwiSGVicmV3XCIsXG4gICAgXCJoelwiOiBcIkhlcmVyb1wiLFxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxuICAgIFwiaGl0XCI6IFwiSGl0dGl0ZVwiLFxuICAgIFwiaG1uXCI6IFwiSG1vbmdcIixcbiAgICBcImh1XCI6IFwiSHVuZ2FyaWFuXCIsXG4gICAgXCJpc1wiOiBcIkljZWxhbmRpY1wiLFxuICAgIFwiaW9cIjogXCJJZG9cIixcbiAgICBcImlnXCI6IFwiSWdib1wiLFxuICAgIFwiaXVcIjogXCJJbnVrdGl0dXRcIixcbiAgICBcImlrXCI6IFwiSW51cGlhcVwiLFxuICAgIFwiZ2FcIjogXCJJcmlzaFwiLFxuICAgIFwiaXRcIjogXCJJdGFsaWFuXCIsXG4gICAgXCJqYW1cIjogXCJKYW1haWNhbiBDcmVvbGUgRW5nbGlzaFwiLFxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxuICAgIFwianZcIjogXCJKYXZhbmVzZVwiLFxuICAgIFwia2FqXCI6IFwiSmp1XCIsXG4gICAgXCJkeW9cIjogXCJKb2xhLUZvbnlpXCIsXG4gICAgXCJ4YWxcIjogXCJLYWxteWtcIixcbiAgICBcImthbVwiOiBcIkthbWJhXCIsXG4gICAgXCJrYmxcIjogXCJLYW5lbWJ1XCIsXG4gICAgXCJrblwiOiBcIkthbm5hZGFcIixcbiAgICBcImtyXCI6IFwiS2FudXJpXCIsXG4gICAgXCJrYWFcIjogXCJLYXJhLUthbHBha1wiLFxuICAgIFwia3JjXCI6IFwiS2FyYWNoYXktQmFsa2FyXCIsXG4gICAgXCJrcmxcIjogXCJLYXJlbGlhblwiLFxuICAgIFwia3NcIjogXCJLYXNobWlyaVwiLFxuICAgIFwiY3NiXCI6IFwiS2FzaHViaWFuXCIsXG4gICAgXCJrYXdcIjogXCJLYXdpXCIsXG4gICAgXCJra1wiOiBcIkthemFraFwiLFxuICAgIFwia2VuXCI6IFwiS2VueWFuZ1wiLFxuICAgIFwia2hhXCI6IFwiS2hhc2lcIixcbiAgICBcImttXCI6IFwiS2htZXJcIixcbiAgICBcImtob1wiOiBcIktob3RhbmVzZVwiLFxuICAgIFwia2h3XCI6IFwiS2hvd2FyXCIsXG4gICAgXCJraVwiOiBcIktpa3V5dVwiLFxuICAgIFwia21iXCI6IFwiS2ltYnVuZHVcIixcbiAgICBcImtyalwiOiBcIktpbmFyYXktYVwiLFxuICAgIFwicndcIjogXCJLaW55YXJ3YW5kYVwiLFxuICAgIFwia2l1XCI6IFwiS2lybWFuamtpXCIsXG4gICAgXCJ0bGhcIjogXCJLbGluZ29uXCIsXG4gICAgXCJia21cIjogXCJLb21cIixcbiAgICBcImt2XCI6IFwiS29taVwiLFxuICAgIFwia29pXCI6IFwiS29taS1QZXJteWFrXCIsXG4gICAgXCJrZ1wiOiBcIktvbmdvXCIsXG4gICAgXCJrb2tcIjogXCJLb25rYW5pXCIsXG4gICAgXCJrb1wiOiBcIktvcmVhblwiLFxuICAgIFwia2ZvXCI6IFwiS29yb1wiLFxuICAgIFwia29zXCI6IFwiS29zcmFlYW5cIixcbiAgICBcImF2a1wiOiBcIktvdGF2YVwiLFxuICAgIFwia2hxXCI6IFwiS295cmEgQ2hpaW5pXCIsXG4gICAgXCJzZXNcIjogXCJLb3lyYWJvcm8gU2VubmlcIixcbiAgICBcImtwZVwiOiBcIktwZWxsZVwiLFxuICAgIFwia3JpXCI6IFwiS3Jpb1wiLFxuICAgIFwia2pcIjogXCJLdWFueWFtYVwiLFxuICAgIFwia3VtXCI6IFwiS3VteWtcIixcbiAgICBcImt1XCI6IFwiS3VyZGlzaFwiLFxuICAgIFwia3J1XCI6IFwiS3VydWtoXCIsXG4gICAgXCJrdXRcIjogXCJLdXRlbmFpXCIsXG4gICAgXCJubWdcIjogXCJLd2FzaW9cIixcbiAgICBcImt5XCI6IFwiS3lyZ3l6XCIsXG4gICAgXCJxdWNcIjogXCJLXFx1MDJiY2ljaGVcXHUwMmJjXCIsXG4gICAgXCJsYWRcIjogXCJMYWRpbm9cIixcbiAgICBcImxhaFwiOiBcIkxhaG5kYVwiLFxuICAgIFwibGt0XCI6IFwiTGFrb3RhXCIsXG4gICAgXCJsYW1cIjogXCJMYW1iYVwiLFxuICAgIFwibGFnXCI6IFwiTGFuZ2lcIixcbiAgICBcImxvXCI6IFwiTGFvXCIsXG4gICAgXCJsdGdcIjogXCJMYXRnYWxpYW5cIixcbiAgICBcImxhXCI6IFwiTGF0aW5cIixcbiAgICBcImVzXzQxOVwiOiBcIkxhdGluIEFtZXJpY2FuIFNwYW5pc2hcIixcbiAgICBcImx2XCI6IFwiTGF0dmlhblwiLFxuICAgIFwibHp6XCI6IFwiTGF6XCIsXG4gICAgXCJsZXpcIjogXCJMZXpnaGlhblwiLFxuICAgIFwibGlqXCI6IFwiTGlndXJpYW5cIixcbiAgICBcImxpXCI6IFwiTGltYnVyZ2lzaFwiLFxuICAgIFwibG5cIjogXCJMaW5nYWxhXCIsXG4gICAgXCJsZm5cIjogXCJMaW5ndWEgRnJhbmNhIE5vdmFcIixcbiAgICBcImx6aFwiOiBcIkxpdGVyYXJ5IENoaW5lc2VcIixcbiAgICBcImx0XCI6IFwiTGl0aHVhbmlhblwiLFxuICAgIFwibGl2XCI6IFwiTGl2b25pYW5cIixcbiAgICBcImpib1wiOiBcIkxvamJhblwiLFxuICAgIFwibG1vXCI6IFwiTG9tYmFyZFwiLFxuICAgIFwibmRzXCI6IFwiTG93IEdlcm1hblwiLFxuICAgIFwic2xpXCI6IFwiTG93ZXIgU2lsZXNpYW5cIixcbiAgICBcImRzYlwiOiBcIkxvd2VyIFNvcmJpYW5cIixcbiAgICBcImxvelwiOiBcIkxvemlcIixcbiAgICBcImx1XCI6IFwiTHViYS1LYXRhbmdhXCIsXG4gICAgXCJsdWFcIjogXCJMdWJhLUx1bHVhXCIsXG4gICAgXCJsdWlcIjogXCJMdWlzZW5vXCIsXG4gICAgXCJzbWpcIjogXCJMdWxlIFNhbWlcIixcbiAgICBcImx1blwiOiBcIkx1bmRhXCIsXG4gICAgXCJsdW9cIjogXCJMdW9cIixcbiAgICBcImxiXCI6IFwiTHV4ZW1ib3VyZ2lzaFwiLFxuICAgIFwibHV5XCI6IFwiTHV5aWFcIixcbiAgICBcIm1kZVwiOiBcIk1hYmFcIixcbiAgICBcIm1rXCI6IFwiTWFjZWRvbmlhblwiLFxuICAgIFwiam1jXCI6IFwiTWFjaGFtZVwiLFxuICAgIFwibWFkXCI6IFwiTWFkdXJlc2VcIixcbiAgICBcIm1hZlwiOiBcIk1hZmFcIixcbiAgICBcIm1hZ1wiOiBcIk1hZ2FoaVwiLFxuICAgIFwidm1mXCI6IFwiTWFpbi1GcmFuY29uaWFuXCIsXG4gICAgXCJtYWlcIjogXCJNYWl0aGlsaVwiLFxuICAgIFwibWFrXCI6IFwiTWFrYXNhclwiLFxuICAgIFwibWdoXCI6IFwiTWFraHV3YS1NZWV0dG9cIixcbiAgICBcImtkZVwiOiBcIk1ha29uZGVcIixcbiAgICBcIm1nXCI6IFwiTWFsYWdhc3lcIixcbiAgICBcIm1zXCI6IFwiTWFsYXlcIixcbiAgICBcIm1sXCI6IFwiTWFsYXlhbGFtXCIsXG4gICAgXCJtdFwiOiBcIk1hbHRlc2VcIixcbiAgICBcIm1uY1wiOiBcIk1hbmNodVwiLFxuICAgIFwibWRyXCI6IFwiTWFuZGFyaW5cIixcbiAgICBcIm1hblwiOiBcIk1hbmRpbmdvXCIsXG4gICAgXCJtbmlcIjogXCJNYW5pcHVyaVwiLFxuICAgIFwiZ3ZcIjogXCJNYW54XCIsXG4gICAgXCJtaVwiOiBcIk1hb3JpXCIsXG4gICAgXCJhcm5cIjogXCJNYXB1Y2hlXCIsXG4gICAgXCJtclwiOiBcIk1hcmF0aGlcIixcbiAgICBcImNobVwiOiBcIk1hcmlcIixcbiAgICBcIm1oXCI6IFwiTWFyc2hhbGxlc2VcIixcbiAgICBcIm13clwiOiBcIk1hcndhcmlcIixcbiAgICBcIm1hc1wiOiBcIk1hc2FpXCIsXG4gICAgXCJtem5cIjogXCJNYXphbmRlcmFuaVwiLFxuICAgIFwiYnl2XCI6IFwiTWVkdW1iYVwiLFxuICAgIFwibWVuXCI6IFwiTWVuZGVcIixcbiAgICBcIm13dlwiOiBcIk1lbnRhd2FpXCIsXG4gICAgXCJtZXJcIjogXCJNZXJ1XCIsXG4gICAgXCJtZ29cIjogXCJNZXRhXFx1MDJiY1wiLFxuICAgIFwiZXNfTVhcIjogXCJNZXhpY2FuIFNwYW5pc2hcIixcbiAgICBcIm1pY1wiOiBcIk1pY21hY1wiLFxuICAgIFwiZHVtXCI6IFwiTWlkZGxlIER1dGNoXCIsXG4gICAgXCJlbm1cIjogXCJNaWRkbGUgRW5nbGlzaFwiLFxuICAgIFwiZnJtXCI6IFwiTWlkZGxlIEZyZW5jaFwiLFxuICAgIFwiZ21oXCI6IFwiTWlkZGxlIEhpZ2ggR2VybWFuXCIsXG4gICAgXCJtZ2FcIjogXCJNaWRkbGUgSXJpc2hcIixcbiAgICBcIm5hblwiOiBcIk1pbiBOYW4gQ2hpbmVzZVwiLFxuICAgIFwibWluXCI6IFwiTWluYW5na2FiYXVcIixcbiAgICBcInhtZlwiOiBcIk1pbmdyZWxpYW5cIixcbiAgICBcIm13bFwiOiBcIk1pcmFuZGVzZVwiLFxuICAgIFwibHVzXCI6IFwiTWl6b1wiLFxuICAgIFwiYXJfMDAxXCI6IFwiTW9kZXJuIFN0YW5kYXJkIEFyYWJpY1wiLFxuICAgIFwibW9oXCI6IFwiTW9oYXdrXCIsXG4gICAgXCJtZGZcIjogXCJNb2tzaGFcIixcbiAgICBcInJvX01EXCI6IFwiTW9sZGF2aWFuXCIsXG4gICAgXCJsb2xcIjogXCJNb25nb1wiLFxuICAgIFwibW5cIjogXCJNb25nb2xpYW5cIixcbiAgICBcIm1mZVwiOiBcIk1vcmlzeWVuXCIsXG4gICAgXCJhcnlcIjogXCJNb3JvY2NhbiBBcmFiaWNcIixcbiAgICBcIm1vc1wiOiBcIk1vc3NpXCIsXG4gICAgXCJtdWxcIjogXCJNdWx0aXBsZSBMYW5ndWFnZXNcIixcbiAgICBcIm11YVwiOiBcIk11bmRhbmdcIixcbiAgICBcInR0dFwiOiBcIk11c2xpbSBUYXRcIixcbiAgICBcIm15ZVwiOiBcIk15ZW5lXCIsXG4gICAgXCJuYXFcIjogXCJOYW1hXCIsXG4gICAgXCJuYVwiOiBcIk5hdXJ1XCIsXG4gICAgXCJudlwiOiBcIk5hdmFqb1wiLFxuICAgIFwibmdcIjogXCJOZG9uZ2FcIixcbiAgICBcIm5hcFwiOiBcIk5lYXBvbGl0YW5cIixcbiAgICBcIm5lXCI6IFwiTmVwYWxpXCIsXG4gICAgXCJuZXdcIjogXCJOZXdhcmlcIixcbiAgICBcInNiYVwiOiBcIk5nYW1iYXlcIixcbiAgICBcIm5uaFwiOiBcIk5naWVtYm9vblwiLFxuICAgIFwiamdvXCI6IFwiTmdvbWJhXCIsXG4gICAgXCJ5cmxcIjogXCJOaGVlbmdhdHVcIixcbiAgICBcIm5pYVwiOiBcIk5pYXNcIixcbiAgICBcIm5pdVwiOiBcIk5pdWVhblwiLFxuICAgIFwienh4XCI6IFwiTm8gbGluZ3Vpc3RpYyBjb250ZW50XCIsXG4gICAgXCJub2dcIjogXCJOb2dhaVwiLFxuICAgIFwibmRcIjogXCJOb3J0aCBOZGViZWxlXCIsXG4gICAgXCJmcnJcIjogXCJOb3J0aGVybiBGcmlzaWFuXCIsXG4gICAgXCJzZVwiOiBcIk5vcnRoZXJuIFNhbWlcIixcbiAgICBcIm5zb1wiOiBcIk5vcnRoZXJuIFNvdGhvXCIsXG4gICAgXCJub1wiOiBcIk5vcndlZ2lhblwiLFxuICAgIFwibmJcIjogXCJOb3J3ZWdpYW4gQm9rbVxcdTAwZTVsXCIsXG4gICAgXCJublwiOiBcIk5vcndlZ2lhbiBOeW5vcnNrXCIsXG4gICAgXCJub3ZcIjogXCJOb3ZpYWxcIixcbiAgICBcIm51c1wiOiBcIk51ZXJcIixcbiAgICBcIm55bVwiOiBcIk55YW13ZXppXCIsXG4gICAgXCJueVwiOiBcIk55YW5qYVwiLFxuICAgIFwibnluXCI6IFwiTnlhbmtvbGVcIixcbiAgICBcInRvZ1wiOiBcIk55YXNhIFRvbmdhXCIsXG4gICAgXCJueW9cIjogXCJOeW9yb1wiLFxuICAgIFwibnppXCI6IFwiTnppbWFcIixcbiAgICBcIm5xb1wiOiBcIk5cXHUwMmJjS29cIixcbiAgICBcIm9jXCI6IFwiT2NjaXRhblwiLFxuICAgIFwib2pcIjogXCJPamlid2FcIixcbiAgICBcImFuZ1wiOiBcIk9sZCBFbmdsaXNoXCIsXG4gICAgXCJmcm9cIjogXCJPbGQgRnJlbmNoXCIsXG4gICAgXCJnb2hcIjogXCJPbGQgSGlnaCBHZXJtYW5cIixcbiAgICBcInNnYVwiOiBcIk9sZCBJcmlzaFwiLFxuICAgIFwibm9uXCI6IFwiT2xkIE5vcnNlXCIsXG4gICAgXCJwZW9cIjogXCJPbGQgUGVyc2lhblwiLFxuICAgIFwicHJvXCI6IFwiT2xkIFByb3ZlblxcdTAwZTdhbFwiLFxuICAgIFwib3JcIjogXCJPcml5YVwiLFxuICAgIFwib21cIjogXCJPcm9tb1wiLFxuICAgIFwib3NhXCI6IFwiT3NhZ2VcIixcbiAgICBcIm9zXCI6IFwiT3NzZXRpY1wiLFxuICAgIFwib3RhXCI6IFwiT3R0b21hbiBUdXJraXNoXCIsXG4gICAgXCJwYWxcIjogXCJQYWhsYXZpXCIsXG4gICAgXCJwZmxcIjogXCJQYWxhdGluZSBHZXJtYW5cIixcbiAgICBcInBhdVwiOiBcIlBhbGF1YW5cIixcbiAgICBcInBpXCI6IFwiUGFsaVwiLFxuICAgIFwicGRjXCI6IFwiUGVubnN5bHZhbmlhIEdlcm1hblwiLFxuICAgIFwiZmFcIjogXCJQZXJzaWFuXCIsXG4gICAgXCJwaG5cIjogXCJQaG9lbmljaWFuXCIsXG4gICAgXCJwY2RcIjogXCJQaWNhcmRcIixcbiAgICBcInBtc1wiOiBcIlBpZWRtb250ZXNlXCIsXG4gICAgXCJwZHRcIjogXCJQbGF1dGRpZXRzY2hcIixcbiAgICBcInBvblwiOiBcIlBvaG5wZWlhblwiLFxuICAgIFwicGxcIjogXCJQb2xpc2hcIixcbiAgICBcInBudFwiOiBcIlBvbnRpY1wiLFxuICAgIFwicHRcIjogXCJQb3J0dWd1ZXNlXCIsXG4gICAgXCJwcmdcIjogXCJQcnVzc2lhblwiLFxuICAgIFwicGFcIjogXCJQdW5qYWJpXCIsXG4gICAgXCJxdVwiOiBcIlF1ZWNodWFcIixcbiAgICBcInJvXCI6IFwiUm9tYW5pYW5cIixcbiAgICBcInJtXCI6IFwiUm9tYW5zaFwiLFxuICAgIFwicm9tXCI6IFwiUm9tYW55XCIsXG4gICAgXCJyb290XCI6IFwiUm9vdFwiLFxuICAgIFwicnVcIjogXCJSdXNzaWFuXCIsXG4gICAgXCJyd2tcIjogXCJSd2FcIixcbiAgICBcInNhaFwiOiBcIlNha2hhXCIsXG4gICAgXCJzYW1cIjogXCJTYW1hcml0YW4gQXJhbWFpY1wiLFxuICAgIFwic21cIjogXCJTYW1vYW5cIixcbiAgICBcInNjb1wiOiBcIlNjb3RzXCIsXG4gICAgXCJnZFwiOiBcIlNjb3R0aXNoIEdhZWxpY1wiLFxuICAgIFwic2x5XCI6IFwiU2VsYXlhclwiLFxuICAgIFwic2VsXCI6IFwiU2Vsa3VwXCIsXG4gICAgXCJzZWhcIjogXCJTZW5hXCIsXG4gICAgXCJzZWVcIjogXCJTZW5lY2FcIixcbiAgICBcInNyXCI6IFwiU2VyYmlhblwiLFxuICAgIFwic2hcIjogXCJTZXJiby1Dcm9hdGlhblwiLFxuICAgIFwic3JyXCI6IFwiU2VyZXJcIixcbiAgICBcInNlaVwiOiBcIlNlcmlcIixcbiAgICBcImtzYlwiOiBcIlNoYW1iYWxhXCIsXG4gICAgXCJzaG5cIjogXCJTaGFuXCIsXG4gICAgXCJzblwiOiBcIlNob25hXCIsXG4gICAgXCJpaVwiOiBcIlNpY2h1YW4gWWlcIixcbiAgICBcInNjblwiOiBcIlNpY2lsaWFuXCIsXG4gICAgXCJzaWRcIjogXCJTaWRhbW9cIixcbiAgICBcImJsYVwiOiBcIlNpa3Npa2FcIixcbiAgICBcInN6bFwiOiBcIlNpbGVzaWFuXCIsXG4gICAgXCJ6aF9IYW5zXCI6IFwiU2ltcGxpZmllZCBDaGluZXNlXCIsXG4gICAgXCJzZFwiOiBcIlNpbmRoaVwiLFxuICAgIFwic2lcIjogXCJTaW5oYWxhXCIsXG4gICAgXCJzbXNcIjogXCJTa29sdCBTYW1pXCIsXG4gICAgXCJkZW5cIjogXCJTbGF2ZVwiLFxuICAgIFwic2tcIjogXCJTbG92YWtcIixcbiAgICBcInNsXCI6IFwiU2xvdmVuaWFuXCIsXG4gICAgXCJ4b2dcIjogXCJTb2dhXCIsXG4gICAgXCJzb2dcIjogXCJTb2dkaWVuXCIsXG4gICAgXCJzb1wiOiBcIlNvbWFsaVwiLFxuICAgIFwic25rXCI6IFwiU29uaW5rZVwiLFxuICAgIFwiY2tiXCI6IFwiU29yYW5pIEt1cmRpc2hcIixcbiAgICBcImF6YlwiOiBcIlNvdXRoIEF6ZXJiYWlqYW5pXCIsXG4gICAgXCJuclwiOiBcIlNvdXRoIE5kZWJlbGVcIixcbiAgICBcImFsdFwiOiBcIlNvdXRoZXJuIEFsdGFpXCIsXG4gICAgXCJzbWFcIjogXCJTb3V0aGVybiBTYW1pXCIsXG4gICAgXCJzdFwiOiBcIlNvdXRoZXJuIFNvdGhvXCIsXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcbiAgICBcInNyblwiOiBcIlNyYW5hbiBUb25nb1wiLFxuICAgIFwiemdoXCI6IFwiU3RhbmRhcmQgTW9yb2NjYW4gVGFtYXppZ2h0XCIsXG4gICAgXCJzdWtcIjogXCJTdWt1bWFcIixcbiAgICBcInN1eFwiOiBcIlN1bWVyaWFuXCIsXG4gICAgXCJzdVwiOiBcIlN1bmRhbmVzZVwiLFxuICAgIFwic3VzXCI6IFwiU3VzdVwiLFxuICAgIFwic3dcIjogXCJTd2FoaWxpXCIsXG4gICAgXCJzc1wiOiBcIlN3YXRpXCIsXG4gICAgXCJzdlwiOiBcIlN3ZWRpc2hcIixcbiAgICBcImZyX0NIXCI6IFwiU3dpc3MgRnJlbmNoXCIsXG4gICAgXCJnc3dcIjogXCJTd2lzcyBHZXJtYW5cIixcbiAgICBcImRlX0NIXCI6IFwiU3dpc3MgSGlnaCBHZXJtYW5cIixcbiAgICBcInN5clwiOiBcIlN5cmlhY1wiLFxuICAgIFwic2hpXCI6IFwiVGFjaGVsaGl0XCIsXG4gICAgXCJ0bFwiOiBcIlRhZ2Fsb2dcIixcbiAgICBcInR5XCI6IFwiVGFoaXRpYW5cIixcbiAgICBcImRhdlwiOiBcIlRhaXRhXCIsXG4gICAgXCJ0Z1wiOiBcIlRhamlrXCIsXG4gICAgXCJ0bHlcIjogXCJUYWx5c2hcIixcbiAgICBcInRtaFwiOiBcIlRhbWFzaGVrXCIsXG4gICAgXCJ0YVwiOiBcIlRhbWlsXCIsXG4gICAgXCJ0cnZcIjogXCJUYXJva29cIixcbiAgICBcInR3cVwiOiBcIlRhc2F3YXFcIixcbiAgICBcInR0XCI6IFwiVGF0YXJcIixcbiAgICBcInRlXCI6IFwiVGVsdWd1XCIsXG4gICAgXCJ0ZXJcIjogXCJUZXJlbm9cIixcbiAgICBcInRlb1wiOiBcIlRlc29cIixcbiAgICBcInRldFwiOiBcIlRldHVtXCIsXG4gICAgXCJ0aFwiOiBcIlRoYWlcIixcbiAgICBcImJvXCI6IFwiVGliZXRhblwiLFxuICAgIFwidGlnXCI6IFwiVGlncmVcIixcbiAgICBcInRpXCI6IFwiVGlncmlueWFcIixcbiAgICBcInRlbVwiOiBcIlRpbW5lXCIsXG4gICAgXCJ0aXZcIjogXCJUaXZcIixcbiAgICBcInRsaVwiOiBcIlRsaW5naXRcIixcbiAgICBcInRwaVwiOiBcIlRvayBQaXNpblwiLFxuICAgIFwidGtsXCI6IFwiVG9rZWxhdVwiLFxuICAgIFwidG9cIjogXCJUb25nYW5cIixcbiAgICBcImZpdFwiOiBcIlRvcm5lZGFsZW4gRmlubmlzaFwiLFxuICAgIFwiemhfSGFudFwiOiBcIlRyYWRpdGlvbmFsIENoaW5lc2VcIixcbiAgICBcInRrclwiOiBcIlRzYWtodXJcIixcbiAgICBcInRzZFwiOiBcIlRzYWtvbmlhblwiLFxuICAgIFwidHNpXCI6IFwiVHNpbXNoaWFuXCIsXG4gICAgXCJ0c1wiOiBcIlRzb25nYVwiLFxuICAgIFwidG5cIjogXCJUc3dhbmFcIixcbiAgICBcInRjeVwiOiBcIlR1bHVcIixcbiAgICBcInR1bVwiOiBcIlR1bWJ1a2FcIixcbiAgICBcImFlYlwiOiBcIlR1bmlzaWFuIEFyYWJpY1wiLFxuICAgIFwidHJcIjogXCJUdXJraXNoXCIsXG4gICAgXCJ0a1wiOiBcIlR1cmttZW5cIixcbiAgICBcInRydVwiOiBcIlR1cm95b1wiLFxuICAgIFwidHZsXCI6IFwiVHV2YWx1XCIsXG4gICAgXCJ0eXZcIjogXCJUdXZpbmlhblwiLFxuICAgIFwidHdcIjogXCJUd2lcIixcbiAgICBcImtjZ1wiOiBcIlR5YXBcIixcbiAgICBcInVkbVwiOiBcIlVkbXVydFwiLFxuICAgIFwidWdhXCI6IFwiVWdhcml0aWNcIixcbiAgICBcInVrXCI6IFwiVWtyYWluaWFuXCIsXG4gICAgXCJ1bWJcIjogXCJVbWJ1bmR1XCIsXG4gICAgXCJ1bmRcIjogXCJVbmtub3duIExhbmd1YWdlXCIsXG4gICAgXCJoc2JcIjogXCJVcHBlciBTb3JiaWFuXCIsXG4gICAgXCJ1clwiOiBcIlVyZHVcIixcbiAgICBcInVnXCI6IFwiVXlnaHVyXCIsXG4gICAgXCJ1elwiOiBcIlV6YmVrXCIsXG4gICAgXCJ2YWlcIjogXCJWYWlcIixcbiAgICBcInZlXCI6IFwiVmVuZGFcIixcbiAgICBcInZlY1wiOiBcIlZlbmV0aWFuXCIsXG4gICAgXCJ2ZXBcIjogXCJWZXBzXCIsXG4gICAgXCJ2aVwiOiBcIlZpZXRuYW1lc2VcIixcbiAgICBcInZvXCI6IFwiVm9sYXBcXHUwMGZja1wiLFxuICAgIFwidnJvXCI6IFwiVlxcdTAwZjVyb1wiLFxuICAgIFwidm90XCI6IFwiVm90aWNcIixcbiAgICBcInZ1blwiOiBcIlZ1bmpvXCIsXG4gICAgXCJ3YVwiOiBcIldhbGxvb25cIixcbiAgICBcIndhZVwiOiBcIldhbHNlclwiLFxuICAgIFwid2FyXCI6IFwiV2FyYXlcIixcbiAgICBcIndhc1wiOiBcIldhc2hvXCIsXG4gICAgXCJndWNcIjogXCJXYXl1dVwiLFxuICAgIFwiY3lcIjogXCJXZWxzaFwiLFxuICAgIFwidmxzXCI6IFwiV2VzdCBGbGVtaXNoXCIsXG4gICAgXCJmeVwiOiBcIldlc3Rlcm4gRnJpc2lhblwiLFxuICAgIFwibXJqXCI6IFwiV2VzdGVybiBNYXJpXCIsXG4gICAgXCJ3YWxcIjogXCJXb2xheXR0YVwiLFxuICAgIFwid29cIjogXCJXb2xvZlwiLFxuICAgIFwid3V1XCI6IFwiV3UgQ2hpbmVzZVwiLFxuICAgIFwieGhcIjogXCJYaG9zYVwiLFxuICAgIFwiaHNuXCI6IFwiWGlhbmcgQ2hpbmVzZVwiLFxuICAgIFwieWF2XCI6IFwiWWFuZ2JlblwiLFxuICAgIFwieWFvXCI6IFwiWWFvXCIsXG4gICAgXCJ5YXBcIjogXCJZYXBlc2VcIixcbiAgICBcInliYlwiOiBcIlllbWJhXCIsXG4gICAgXCJ5aVwiOiBcIllpZGRpc2hcIixcbiAgICBcInlvXCI6IFwiWW9ydWJhXCIsXG4gICAgXCJ6YXBcIjogXCJaYXBvdGVjXCIsXG4gICAgXCJkamVcIjogXCJaYXJtYVwiLFxuICAgIFwienphXCI6IFwiWmF6YVwiLFxuICAgIFwiemVhXCI6IFwiWmVlbGFuZGljXCIsXG4gICAgXCJ6ZW5cIjogXCJaZW5hZ2FcIixcbiAgICBcInphXCI6IFwiWmh1YW5nXCIsXG4gICAgXCJnYnpcIjogXCJab3JvYXN0cmlhbiBEYXJpXCIsXG4gICAgXCJ6dVwiOiBcIlp1bHVcIixcbiAgICBcInp1blwiOiBcIlp1bmlcIlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5kYXRhLmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuICovXG5cbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4uL21haW4vc3RvcmUnO1xuXG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuQ29udGVudEFyZW5hLlV0aWxzID0ge1xuXG4gICAgY29udGVudFBhcnNlckZyb21TZXJ2ZXIoY29udGVudCkge1xuXG4gICAgICAgIGlmICggY29udGVudC5wYXJzZWQgKSByZXR1cm4gY29udGVudDtcblxuICAgICAgICBsZXQgc29ydCA9IHRydWU7XG5cbiAgICAgICAgaWYgKCBjb250ZW50LmV4dHJhRGF0YSl7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhjb250ZW50LmV4dHJhRGF0YSkuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAoW2tleSwgdmFsdWVdKSA9PiBjb250ZW50W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRlbnQudG91cm5hbWVudCA9IChjb250ZW50LnRvdXJuYW1lbnQpID8gQXJyYXkuaXNBcnJheShjb250ZW50LnRvdXJuYW1lbnQpPyBjb250ZW50LnRvdXJuYW1lbnQgOiBbY29udGVudC50b3VybmFtZW50XSA6IFtdO1xuICAgICAgICBjb250ZW50LnNwb3J0Q2F0ZWdvcnkgPSAoY29udGVudC5zcG9ydENhdGVnb3J5KSA/IEFycmF5LmlzQXJyYXkoY29udGVudC5zcG9ydENhdGVnb3J5KT8gY29udGVudC5zcG9ydENhdGVnb3J5IDogW2NvbnRlbnQuc3BvcnRDYXRlZ29yeV0gOiBbXTtcblxuICAgICAgICBpZiAoY29udGVudC5zZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodCl7XG4gICAgICAgICAgICBjb250ZW50LnJpZ2h0c1BhY2thZ2UuZm9yRWFjaCggKHJwKSA9PiB7XG4gICAgICAgICAgICAgICAgcnAuc2VsZWN0ZWRSaWdodHMgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnaXRlbXMnXTtcbiAgICAgICAgICAgICAgICBycC5leGNsdXNpdmUgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnZXhjbHVzaXZlJ107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50LmZpeHR1cmVzQnlTZWFzb24pe1xuICAgICAgICAgICAgY29udGVudC5zZWFzb25zLmZvckVhY2goIChzLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcy5maXh0dXJlcyA9IGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbltpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudC5sYXcpe1xuICAgICAgICAgICAgY29udGVudC5sYXcubGFiZWwgPSBjb250ZW50Lmxhdy5uYW1lO1xuICAgICAgICAgICAgY29udGVudC5sYXcudmFsdWUgPSBjb250ZW50Lmxhdy5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBjb250ZW50LmN1c3RvbUJ1bmRsZXMgKSB7XG4gICAgICAgICAgICBjb250ZW50LmN1c3RvbUJ1bmRsZXMuZm9yRWFjaCgoc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3Auc2FsZXNNZXRob2QpIHNwLnNhbGVzTWV0aG9kID0gc3Auc2FsZXNNZXRob2QubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoc3AuZXhjbHVkZWRDb3VudHJpZXMpIHNwLmV4Y2x1ZGVkVGVycml0b3JpZXMgPSBzcC5leGNsdWRlZENvdW50cmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZSwgcmVnaW9uczp0LnJlZ2lvbnMsIHRlcnJpdG9yeUlkOnQudGVycml0b3J5SWR9fSlcbiAgICAgICAgICAgICAgICBpZiAoc3AudGVycml0b3JpZXMpIHNwLnRlcnJpdG9yaWVzID0gc3AudGVycml0b3JpZXMubWFwKHQ9PntyZXR1cm57bmFtZTp0Lm5hbWUsbGFiZWw6dC5uYW1lLCB2YWx1ZTp0Lm5hbWUsIHJlZ2lvbnM6dC5yZWdpb25zLCB0ZXJyaXRvcnlJZDp0LnRlcnJpdG9yeUlkfX0pXG4gICAgICAgICAgICAgICAgaWYgKCFzcC50ZXJyaXRvcmllcykgc29ydCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwLmluc3RhbGxtZW50cyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcC5pbnN0YWxsbWVudHMuZm9yRWFjaChpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkuZGF0ZSkgaS5kYXRlID0gbW9tZW50KGkuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSl7fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGNvbnRlbnQuc2FsZXNQYWNrYWdlcyApIHtcbiAgICAgICAgICAgIGNvbnRlbnQuc2FsZXNQYWNrYWdlcy5mb3JFYWNoKChzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzcC5zYWxlc01ldGhvZCkgc3Auc2FsZXNNZXRob2QgPSBzcC5zYWxlc01ldGhvZC5uYW1lO1xuICAgICAgICAgICAgICAgIGlmIChzcC5leGNsdWRlZENvdW50cmllcykgc3AuZXhjbHVkZWRUZXJyaXRvcmllcyA9IHNwLmV4Y2x1ZGVkQ291bnRyaWVzLm1hcCh0PT57cmV0dXJue2xhYmVsOnQubmFtZSwgdmFsdWU6dC5uYW1lLCByZWdpb25zOnQucmVnaW9ucywgdGVycml0b3J5SWQ6dC50ZXJyaXRvcnlJZH19KVxuICAgICAgICAgICAgICAgIGlmIChzcC50ZXJyaXRvcmllcykgc3AudGVycml0b3JpZXMgPSBzcC50ZXJyaXRvcmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZSwgcmVnaW9uczp0LnJlZ2lvbnMsIHRlcnJpdG9yeUlkOnQudGVycml0b3J5SWR9fSlcbiAgICAgICAgICAgICAgICBpZiAoIXNwLnRlcnJpdG9yaWVzKSBzb3J0ID0gZmFsc2VcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcC5pbnN0YWxsbWVudHMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3AuaW5zdGFsbG1lbnRzLmZvckVhY2goaT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLmRhdGUpIGkuZGF0ZSA9IG1vbWVudChpLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpe31cblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzb3J0KSBjb250ZW50LnNhbGVzUGFja2FnZXMuc29ydCh0aGlzLnNvcnRTYWxlc1BhY2thZ2VzKS5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudC5lbmREYXRlKSBjb250ZW50LmVuZERhdGUgPSBtb21lbnQoY29udGVudC5lbmREYXRlKTtcbiAgICAgICAgaWYgKGNvbnRlbnQuc3RhcnREYXRlKSBjb250ZW50LnN0YXJ0RGF0ZSA9IG1vbWVudChjb250ZW50LnN0YXJ0RGF0ZSk7XG4gICAgICAgIGlmIChjb250ZW50LnNpZ25hdHVyZSkgY29udGVudC5zaWduYXR1cmUgPSBob3N0dXJsICsgY29udGVudC5zaWduYXR1cmU7XG5cbiAgICAgICAgY29udGVudC5zdGVwID0gTnVtYmVyKGNvbnRlbnQuc3RlcCk7XG4gICAgICAgIGNvbnRlbnQuY3VzdG9tU2Vhc29ucyA9IGNvbnRlbnQuc2Vhc29ucy5maWx0ZXIocz0+e1xuICAgICAgICAgICAgcmV0dXJuIHMuZXh0ZXJuYWxJZCAmJiBzLmV4dGVybmFsSWQuc3RhcnRzV2l0aChcImNhOlwiKVxuICAgICAgICB9KS5tYXAoKHMsaSk9PntcbiAgICAgICAgICAgIGxldCB5ZWFycztcbiAgICAgICAgICAgIGlmIChzLnllYXIpe1xuICAgICAgICAgICAgICAgIHllYXJzID0gcy55ZWFyLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgICAgICAgICBzLmZyb20gPSB5ZWFycy5sZW5ndGggPT09IDEgPyB5ZWFyc1swXSA6IDIwMDAgKyBOdW1iZXIoeWVhcnNbMF0pO1xuICAgICAgICAgICAgICAgIHMudG8gPSB5ZWFycy5sZW5ndGggPT09IDEgPyBudWxsIDogMjAwMCArIE51bWJlcih5ZWFyc1sxXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb250ZW50LmZpeHR1cmVzQnlTZWFzb24pe1xuICAgICAgICAgICAgICAgIHMuZml4dHVyZXMgPSBjb250ZW50LmZpeHR1cmVzQnlTZWFzb25baV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGNvbnRlbnQuc2Vhc29ucyA9IGNvbnRlbnQuc2Vhc29ucy5tYXAocz0+e1xuICAgICAgICAgICAgaWYgKCBzLmV4dGVybmFsSWQgJiYgcy5leHRlcm5hbElkLnN0YXJ0c1dpdGgoXCJjYTpcIikgKXtcbiAgICAgICAgICAgICAgICBzLmN1c3RvbSA9IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuZXh0cmFEYXRhICYmIGNvbnRlbnQuZXh0cmFEYXRhLnNlYXNvbkR1cmF0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1c3RvbVNlYXNvbkR1ciA9IGNvbnRlbnQuZXh0cmFEYXRhLnNlYXNvbkR1cmF0aW9uc1tzLmV4dGVybmFsSWRdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1c3RvbVNlYXNvbkR1cikge1xuICAgICAgICAgICAgICAgICAgICBzLmN1c3RvbVN0YXJ0RGF0ZSA9IGN1c3RvbVNlYXNvbkR1ci5zdGFydERhdGU7XG4gICAgICAgICAgICAgICAgICAgIHMuY3VzdG9tRW5kRGF0ZSA9IGN1c3RvbVNlYXNvbkR1ci5lbmREYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHM7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHVzZXIgPSBzdG9yZS5nZXRTdGF0ZSgpLnVzZXI7XG5cbiAgICAgICAgaWYgKCFjb250ZW50LnNpZ25hdHVyZU5hbWUpIGNvbnRlbnQuc2lnbmF0dXJlTmFtZSA9IHVzZXIuZmlyc3ROYW1lICsgXCIgXCIgKyB1c2VyLmxhc3ROYW1lO1xuICAgICAgICBpZiAoIWNvbnRlbnQuc2lnbmF0dXJlUG9zaXRpb24pIGNvbnRlbnQuc2lnbmF0dXJlUG9zaXRpb24gPSB1c2VyLnRpdGxlO1xuXG4gICAgICAgIGNvbnRlbnQucGFyc2VkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9LFxuXG4gICAgZmlsdGVyQ29tcGFueUluZm8oZGF0YSl7XG5cbiAgICAgICAgbGV0IGNvbXBhbnkgPSB7fTtcblxuICAgICAgICBjb21wYW55LmxlZ2FsTmFtZSA9IGRhdGEubGVnYWxOYW1lO1xuICAgICAgICBjb21wYW55LnJlZ2lzdHJhdGlvbk51bWJlciA9IGRhdGEucmVnaXN0cmF0aW9uTnVtYmVyO1xuICAgICAgICBjb21wYW55LnZhdCA9IGRhdGEudmF0O1xuICAgICAgICBjb21wYW55LmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICAgIGNvbXBhbnkuYWRkcmVzczIgPSBkYXRhLmFkZHJlc3MyO1xuICAgICAgICBjb21wYW55LmNpdHkgPSBkYXRhLmNpdHk7XG4gICAgICAgIGNvbXBhbnkuemlwID0gZGF0YS56aXA7XG4gICAgICAgIGNvbXBhbnkuY291bnRyeSA9IGRhdGEuY291bnRyeTtcblxuICAgICAgICByZXR1cm4gY29tcGFueTtcbiAgICB9LFxuXG4gICAgc29ydFNhbGVzUGFja2FnZXMgKGEsIGIpe1xuICAgICAgICBsZXQgYyA9IChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGEgPiBiKSA/IDEgOiAoKGIgPiBhKSA/IC0xIDogMClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGMoYS50ZXJyaXRvcmllcy5sZW5ndGgsIGIudGVycml0b3JpZXMubGVuZ3RoKSB8fCBjKGIubmFtZSwgYS5uYW1lKTtcbiAgICB9LFxuXG5cblxuICAgIGlzQVBJQXZhaWxhYmxlKCkge1xuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIHZhcmlvdXMgRmlsZSBBUEkgc3VwcG9ydC5cbiAgICAgICAgaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xuICAgICAgICAgICAgLy8gR3JlYXQgc3VjY2VzcyEgQWxsIHRoZSBGaWxlIEFQSXMgYXJlIHN1cHBvcnRlZC5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc291cmNlOiBGaWxlIEFQSSBhdmFpbGFiaWxpdHkgLSBodHRwOi8vY2FuaXVzZS5jb20vI2ZlYXQ9ZmlsZWFwaVxuICAgICAgICAgICAgLy8gc291cmNlOiA8b3V0cHV0PiBhdmFpbGFiaWxpdHkgLSBodHRwOi8vaHRtbDVkb2N0b3IuY29tL3RoZS1vdXRwdXQtZWxlbWVudC9cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJ1RoZSBIVE1MNSBBUElzIHVzZWQgaW4gdGhpcyBmb3JtIGFyZSBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgZm9sbG93aW5nIGJyb3dzZXJzOjxiciAvPicpO1xuICAgICAgICAgICAgLy8gNi4wIEZpbGUgQVBJICYgMTMuMCA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gR29vZ2xlIENocm9tZTogMTMuMCBvciBsYXRlcjxiciAvPicpO1xuICAgICAgICAgICAgLy8gMy42IEZpbGUgQVBJICYgNi4wIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBNb3ppbGxhIEZpcmVmb3g6IDYuMCBvciBsYXRlcjxiciAvPicpO1xuICAgICAgICAgICAgLy8gMTAuMCBGaWxlIEFQSSAmIDEwLjAgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIEludGVybmV0IEV4cGxvcmVyOiBOb3Qgc3VwcG9ydGVkIChwYXJ0aWFsIHN1cHBvcnQgZXhwZWN0ZWQgaW4gMTAuMCk8YnIgLz4nKTtcbiAgICAgICAgICAgIC8vID8gRmlsZSBBUEkgJiA1LjEgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIFNhZmFyaTogTm90IHN1cHBvcnRlZDxiciAvPicpO1xuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDkuMiA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gT3BlcmE6IE5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYWRkT3JkaW5hbChuKSB7XG4gICAgICAgIHZhciBzdHIgPSBuLnRvU3RyaW5nKCkuc2xpY2UoLTEpLFxuICAgICAgICAgICAgb3JkID0gJyc7XG4gICAgICAgIHN3aXRjaCAoc3RyKSB7XG4gICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAnc3QnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgICAgb3JkID0gJ25kJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICdyZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgY2FzZSAnNic6XG4gICAgICAgICAgICBjYXNlICc3JzpcbiAgICAgICAgICAgIGNhc2UgJzgnOlxuICAgICAgICAgICAgY2FzZSAnOSc6XG4gICAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAndGgnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuICsgb3JkO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gYXJyXG4gICAgICogQHBhcmFtIHByb3BcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldEluZGV4ICh2YWx1ZSwgYXJyLCBwcm9wKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGFycltpXVtwcm9wXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7IC8vdG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSB2YWx1ZSBkb2Vzbid0IGV4aXN0XG4gICAgfSxcblxuICAgIGdldFdlYnNpdGVVUmwoc3RyKSB7XG4gICAgICAgIGlmIChzdHIuaW5jbHVkZXMoJ2h0dHA6Ly8nKSB8fCBzdHIuaW5jbHVkZXMoJ2h0dHBzOi8vJykpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnaHR0cDovLycrc3RyXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNMaXN0aW5nUHVibGlzaGVkKHN0YXR1cykge1xuICAgICAgICByZXR1cm4gKHN0YXR1cyAmJiAoc3RhdHVzLm5hbWUgPT09IFwiQVBQUk9WRURcIiB8fCBzdGF0dXMubmFtZSA9PT0gXCJQRU5ESU5HXCIgfHwgc3RhdHVzLm5hbWUgPT09IFwiRURJVEVEXCIpKTtcbiAgICB9XG5cbn07XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHtsYW5ndWFnZXN9IGZyb20gXCIuLi8uLi8uLi9kYXRhL2xhbmd1YWdlc1wiO1xuXG5leHBvcnQgY29uc3QgYWxsVmFsdWUgPSB7XG4gICAgdmFsdWU6ICdhbGwnLFxuICAgIGxhYmVsOiAnQWxsIGxvY2FsIGxhbmd1YWdlcydcbn07XG5cbmNsYXNzIExhbmd1YWdlU2VsZWN0b3IgZXh0ZW5kcyAgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge307XG5cbiAgICAgICAgdGhpcy5wcmV2U2VsZWN0aW9uID0gcHJvcHMudmFsdWUgPyBbLi4ucHJvcHMudmFsdWVdIDogW107XG4gICAgfVxuXG4gICAgaGFuZGxlT25DaGFuZ2UgPSAoc2VsZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGhhc0FsbCA9ICEhc2VsZWN0aW9uLmZpbmQoKGl0ZW0pID0+IGl0ZW0udmFsdWUgPT09ICdhbGwnKTtcbiAgICAgICAgY29uc3QgaGFzQWxsUHJldiA9ICEhdGhpcy5wcmV2U2VsZWN0aW9uLmZpbmQoKGl0ZW0pID0+IGl0ZW0udmFsdWUgPT09ICdhbGwnKTtcbiAgICAgICAgLy9jb25zdCBpdGVtc0NoYW5nZWQgPSBzZWxlY3Rpb24ubGVuZ3RoICE9PSB0aGlzLnByZXZTZWxlY3Rpb24ubGVuZ3RoO1xuXG4gICAgICAgIGlmIChoYXNBbGwpIHtcbiAgICAgICAgICAgIGlmIChoYXNBbGxQcmV2KSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIEFsbFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IHNlbGVjdGlvbi5maWx0ZXIoaXRlbSA9PiBpdGVtLnZhbHVlICE9PSAnYWxsJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEFkZCBBbGwgYW5kIHJlbW92ZSBvdGhlcnNcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24gPSBbYWxsVmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2U2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuXG4gICAgICAgIG9uQ2hhbmdlKHNlbGVjdGlvbik7XG4gICAgfTtcblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7IHZhbHVlLCBtdWx0aSA9IHRydWUsIHBsYWNlaG9sZGVyIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCByZWFsTGFuZ3VhZ2VzID0gT2JqZWN0LnZhbHVlcyhsYW5ndWFnZXMpLm1hcCgoaSwgayk9Pih7dmFsdWUgOiBpLm5hbWUgLCBsYWJlbCA6IGkubmFtZSB9KSk7XG4gICAgICAgIGNvbnN0IGFsbExhbmd1YWdlcyA9IFsgYWxsVmFsdWUsIC4uLnJlYWxMYW5ndWFnZXMgXTtcblxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgbmFtZT1cImZvcm0tZmllbGQtbmFtZVwiXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlT25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICAgICAgICAgIG11bHRpPXttdWx0aX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgICAgb3B0aW9ucz17YWxsTGFuZ3VhZ2VzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgTGFuZ3VhZ2VTZWxlY3RvciB9O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvTGFuZ3VhZ2VTZWxlY3Rvci5qcyIsImV4cG9ydCBjb25zdCBjb21tb25UeXBlcz0ge1xuICAgIEdFVF9ERUZBVUxUX1JJR0hUU19QQUNLQUdFOidHRVRfREVGQVVMVF9SSUdIVFNfUEFDS0FHRScsXG4gICAgU0VUX1RPVEFMX0NPVU5UUklFUzogJ1NFVF9UT1RBTF9DT1VOVFJJRVMnLFxuICAgIFNFVF9URVNUX1NUQUdFX01PREU6ICdTRVRfVEVTVF9TVEFHRV9NT0RFJ1xufTtcblxuY29uc3QgY29tbW9uRGVmYXVsdCA9IHtcbiAgICB0b3RhbENvdW50cmllcyA6IDI0MCxcbiAgICB0ZXN0U3RhZ2VNb2RlOiBmYWxzZVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbW1vbiA9IChzdGF0ZSA9IGNvbW1vbkRlZmF1bHQsIGFjdGlvbikgPT4ge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGNvbW1vblR5cGVzLkdFVF9ERUZBVUxUX1JJR0hUU19QQUNLQUdFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7ZGVmYXVsdFJpZ2h0c1BhY2thZ2U6IGFjdGlvbi5kZWZhdWx0UmlnaHRzUGFja2FnZX0pO1xuICAgICAgICBjYXNlIGNvbW1vblR5cGVzLlNFVF9UT1RBTF9DT1VOVFJJRVM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHt0b3RhbENvdW50cmllczogYWN0aW9uLnRvdGFsQ291bnRyaWVzfSk7XG4gICAgICAgIGNhc2UgY29tbW9uVHlwZXMuU0VUX1RFU1RfU1RBR0VfTU9ERTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge3Rlc3RTdGFnZU1vZGU6IGFjdGlvbi50ZXN0U3RhZ2VNb2RlfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3JlZHVjZXJzL2NvbW1vbi5qcyIsImV4cG9ydCBjb25zdCB1c2VyVHlwZXM9IHtcbiAgICBMT0dPVVQ6J0xPR09VVCcsXG4gICAgTE9HSU46J0xPR0lOJyxcbiAgICBQUk9GSUxFOidQUk9GSUxFJyxcbiAgICBMT0FEX1VTRVJfREFUQTonTE9BRF9VU0VSX0RBVEEnLFxufTtcblxuY29uc3QgZGVmYXVsdFVzZXIgPSB7XG4gICAgcHJvZmlsZSA6IFwiU0VMTEVSXCJcblxufTtcblxuZXhwb3J0IGNvbnN0IHVzZXIgPSAoc3RhdGUgPSBkZWZhdWx0VXNlciwgYWN0aW9uKSA9PiB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgdXNlclR5cGVzLkxPR09VVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGVmYXVsdFVzZXIpO1xuICAgICAgICBjYXNlIHVzZXJUeXBlcy5MT0dJTjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGVtYWlsOiBhY3Rpb24uZW1haWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHVzZXJUeXBlcy5QUk9GSUxFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgcHJvZmlsZTogYWN0aW9uLnByb2ZpbGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHVzZXJUeXBlcy5MT0FEX1VTRVJfREFUQTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgey4uLmFjdGlvbi51c2VyfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3JlZHVjZXJzL3VzZXIuanMiLCJleHBvcnQgY29uc3QgdmFsaWRhdGlvblR5cGVzID0ge1xuICAgIEVOQUJMRV9WQUxJREFUSU9OOiAnRU5BQkxFX1ZBTElEQVRJT04nLFxuICAgIERJU0FCTEVfVkFMSURBVElPTjogJ0RJU0FCTEVfVkFMSURBVElPTidcbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0aW9uID0gKHN0YXRlID0gZmFsc2UsIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgICAgICBjYXNlIHZhbGlkYXRpb25UeXBlcy5FTkFCTEVfVkFMSURBVElPTjpcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG5cbiAgICAgICAgY2FzZSB2YWxpZGF0aW9uVHlwZXMuRElTQUJMRV9WQUxJREFUSU9OOlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy92YWxpZGF0aW9uLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHtpMThuU3RhdGV9IGZyb20gXCJyZWR1eC1pMThuXCI7XG5cbmltcG9ydCB7Y29udGVudH0gZnJvbSBcIi4uL3NlbGwvcmVkdWNlcnMvY29udGVudFwiO1xuaW1wb3J0IHtzZWxlY3Rvcn0gZnJvbSBcIi4uL3NlbGwvcmVkdWNlcnMvc2VsZWN0b3JcIjtcbmltcG9ydCB7ZmlsdGVyfSBmcm9tIFwiLi4vYnV5L3JlZHVjZXJzL2ZpbHRlclwiO1xuaW1wb3J0IHttYXJrZXRwbGFjZX0gZnJvbSBcIi4uL2J1eS9yZWR1Y2Vycy9tYXJrZXRwbGFjZVwiO1xuaW1wb3J0IHttYW5hZ2V9IGZyb20gXCIuLi9tYW5hZ2UvcmVkdWNlcnMvbWFuYWdlXCI7XG5pbXBvcnQge3VzZXJ9IGZyb20gXCIuL3JlZHVjZXJzL3VzZXJcIjtcbmltcG9ydCB7Y29tbW9ufSBmcm9tIFwiLi9yZWR1Y2Vycy9jb21tb25cIjtcbmltcG9ydCB7dmFsaWRhdGlvbn0gZnJvbSBcIi4vcmVkdWNlcnMvdmFsaWRhdGlvblwiO1xuXG5jb25zdCByZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gICAgY29udGVudCxcbiAgICBzZWxlY3RvcixcbiAgICBtYXJrZXRwbGFjZSxcbiAgICBmaWx0ZXIsXG4gICAgbWFuYWdlLFxuICAgIHVzZXIsXG4gICAgY29tbW9uLFxuICAgIHZhbGlkYXRpb24sXG4gICAgaTE4blN0YXRlXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU3RvcmUocmVkdWNlcnMpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vc3RvcmUuanMiLCJcbmV4cG9ydCBjb25zdCBtYW5hZ2VUeXBlcz0ge1xuICAgIFRFU1Q6J1RFU1QnLFxufTtcblxuZXhwb3J0IGNvbnN0IG1hbmFnZSA9IChzdGF0ZSA9IHtcbiAgICB0ZXN0SXRlbTogXCJtYW5hZ2VSZWR1Y2VyXCJcblxufSwgYWN0aW9uKSA9PiB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgbWFuYWdlVHlwZXMuVEVTVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHRlc3Q6IGFjdGlvbi50ZXh0LFxuICAgICAgICAgICAgICAgIGlkIDogYWN0aW9uLmlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9yZWR1Y2Vycy9tYW5hZ2UuanMiLCJpbXBvcnQgbWF4IGZyb20gJ2xvZGFzaC9tYXgnO1xuaW1wb3J0IHsgYWxsVmFsdWUgfSBmcm9tICcuLy4uLy4uL21haW4vY29tcG9uZW50cy9MYW5ndWFnZVNlbGVjdG9yJztcblxuZXhwb3J0IGNvbnN0IGNvbnRlbnRUeXBlPSB7XG4gICAgQ09OVEVOVF9JTklUOidDT05URU5UX0lOSVQnLFxuICAgIFNURVBfQ0hBTkdFX1JFU0VUIDogJ1NURVBfQ0hBTkdFX1JFU0VUJyxcbiAgICBHT19UT19TVEVQOiAnR09fVE9fU1RFUCcsXG4gICAgR09fVE9fTkVYVF9TVEVQOiAnR09fVE9fTkVYVF9TVEVQJyxcbiAgICBHT19UT19QUkVWSU9VU19TVEVQOiAnR09fVE9fUFJFVklPVVNfU1RFUCcsXG4gICAgQUREX05FVyA6ICdBRERfTkVXJyxcbiAgICBSRU1PVkVfTkVXIDogJ1JFTU9WRV9ORVcnLFxuICAgIFNVUEVSX1JJR0hUU19VUERBVEVEOiAnU1VQRVJfUklHSFRTX1VQREFURUQnLFxuICAgIFVQREFURV9DT05URU5UX1ZBTFVFIDogJ1VQREFURV9DT05URU5UX1ZBTFVFJyxcbiAgICBTRUxFQ1RfVE9VUk5BTUVOVCA6ICdTRUxFQ1RfVE9VUk5BTUVOVCcsXG4gICAgUkVNT1ZFX0ZST01fTVVMVElQTEUgOiAnUkVNT1ZFX0ZST01fTVVMVElQTEUnLFxuICAgIFVQREFURV9GUk9NX01VTFRJUExFIDogJ1VQREFURV9GUk9NX01VTFRJUExFJyxcbiAgICBBUFBMWV9TRUxFQ1RJT04gOiAnQVBQTFlfU0VMRUNUSU9OJyxcbiAgICBVUERBVEVfU0FMRVNfUEFDS0FHRVMgOiAnVVBEQVRFX1NBTEVTX1BBQ0tBR0VTJyxcbiAgICBVUERBVEVfQVRUQUNITUVOVFMgOiAnVVBEQVRFX0FUVEFDSE1FTlRTJyxcbiAgICBVUERBVEVfQU5ORVggOiAnVVBEQVRFX0FOTkVYJyxcbiAgICBBRERfU0FMRVNfUEFDS0FHRVMgOiAnQUREX1NBTEVTX1BBQ0tBR0VTJyxcbiAgICBSRVNFVCA6ICdSRVNFVCcsXG4gICAgQUxMX0VQSVNPREVfVVBEQVRFX0ZMQUc6ICdVUERBVEVfQUxMX0VQSVNPREVTX0ZMQUcnXG59O1xuXG5leHBvcnQgY29uc3QgRW1wdHlMaXN0aW5nID0ge1xuICAgIHN0ZXA6IDEsXG4gICAgbWF4U3RlcDogMSxcbiAgICByaWdodHNQYWNrYWdlIDogW10sXG4gICAgdG91cm5hbWVudCA6IFtdLFxuICAgIHNwb3J0Q2F0ZWdvcnkgOiBbXSxcbiAgICBzcG9ydHMgOiBbXSxcbiAgICBzZWFzb25zOiBbXSxcbiAgICBjdXN0b21TZWFzb25zIDogW10sXG4gICAgc2FsZXNQYWNrYWdlcyA6IFtdLFxuICAgIGN1c3RvbVRvdXJuYW1lbnQgOiBudWxsLFxuICAgIGN1c3RvbUNhdGVnb3J5IDogbnVsbCxcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgcHJvZ3JhbURlc2NyaXB0aW9uIDogbnVsbCxcbiAgICBhdHRhY2htZW50cyA6IFtdLFxuICAgIGFubmV4IDogW10sXG4gICAgZW5kRGF0ZUxpbWl0IDogMzAsXG4gICAgY291bnRlciA6IDAsXG4gICAgY3VycmVuY3kgOiBcIkVVUlwiLFxuICAgIHN0YXJ0RGF0ZU1vZGUgOiBcIkxJQ0VOU0VcIixcbiAgICBzdGVwQ2hhbmdlIDogZmFsc2UsXG4gICAgdmF0IDogXCJub1wiLFxuICAgIE5BX0lOUFVUIDogOTAsXG4gICAgSExfSU5QVVQgOiA1LFxuICAgIExJQ0VOU0VEX0xBTkdVQUdFUyA6IFthbGxWYWx1ZV0sXG4gICAgUFJPR1JBTV9MQU5HVUFHRSA6IFtdLFxuICAgIFBST0dSQU1fU1VCVElUTEVTIDogW10sXG4gICAgUFJPR1JBTV9TQ1JJUFQgOiBbXSxcbiAgICBFRElUX1BST0dSQU1fREVTQ1JJUFRJT05fT1BUSU9OQUw6IHRydWUsXG4gICAgd2Vic2l0ZSA6IG51bGwsXG4gICAgbGF3IDogXCJFbmdsaXNoXCIsXG4gICAgaW1hZ2UgOiBudWxsLFxuICAgIGltYWdlQmFzZTY0IDogbnVsbCxcbiAgICB0ZW1wRGF0YToge31cbn07XG5cbmV4cG9ydCBjb25zdCBjb250ZW50ID0gKHN0YXRlID0gRW1wdHlMaXN0aW5nLCBhY3Rpb24pID0+IHtcblxuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlJFU0VUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBFbXB0eUxpc3RpbmcpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkNPTlRFTlRfSU5JVDpcbiAgICAgICAgICAgIGFjdGlvbi5jb250ZW50LmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uLmNvbnRlbnQsIHttYXhTdGVwOiBtYXgoW2FjdGlvbi5jb250ZW50Lm1heFN0ZXAsIHN0YXRlLm1heFN0ZXBdKX0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFMTF9FUElTT0RFX1VQREFURV9GTEFHOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7RURJVF9QUk9HUkFNX0RFU0NSSVBUSU9OX09QVElPTkFMOiBhY3Rpb24ucGF5bG9hZH0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkdPX1RPX05FWFRfU1RFUDpcbiAgICAgICAgICAgIGNvbnN0IG5ld1N0ZXAgPSBzdGF0ZS5zdGVwICsgMTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHN0ZXA6IG5ld1N0ZXAsXG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXhTdGVwOiBtYXgoW25ld1N0ZXAsIHN0YXRlLm1heFN0ZXBdKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuR09fVE9fU1RFUDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHN0ZXA6IGFjdGlvbi5zdGVwLFxuICAgICAgICAgICAgICAgIHN0ZXBDaGFuZ2UgOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heFN0ZXA6IG1heChbYWN0aW9uLnN0ZXAsIHN0YXRlLm1heFN0ZXBdKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuU1RFUF9DSEFOR0VfUkVTRVQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzdGVwQ2hhbmdlIDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkdPX1RPX1BSRVZJT1VTX1NURVA6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzdGVwOiBzdGF0ZS5zdGVwIC0xLFxuICAgICAgICAgICAgICAgIHN0ZXBDaGFuZ2UgOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5SRU1PVkVfTkVXOlxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gWy4uLnN0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdXTtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdLnNwbGljZShhY3Rpb24uaW5kZXgsIDEpO1xuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5BRERfTkVXOlxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gWy4uLnN0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdXTtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdW2FjdGlvbi5pbmRleF0gPSB7XG4gICAgICAgICAgICAgICAgY3VzdG9tIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlwiXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5jbGVhbiApe1xuICAgICAgICAgICAgICAgIGFjdGlvbi5jbGVhbi5mb3JFYWNoKChzZWxlY3RvclR5cGUpPT57XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlW3NlbGVjdG9yVHlwZV0gPSAkLmlzQXJyYXkoc3RhdGVbc2VsZWN0b3JUeXBlXSkgPyBbXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9DT05URU5UX1ZBTFVFOlxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5rZXldID0gYWN0aW9uLnZhbHVlO1xuICAgICAgICAgICAgbmV3U3RhdGUubGlzdGluZ0VkaXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlNFTEVDVF9UT1VSTkFNRU5UOlxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcbiAgICAgICAgICAgIG5ld1N0YXRlLnRvdXJuYW1lbnQgPSBbYWN0aW9uLnRvdXJuYW1lbnRdO1xuICAgICAgICAgICAgbmV3U3RhdGUuc3BvcnRzID0gKGFjdGlvbi50b3VybmFtZW50LnNwb3J0ICkgPyBbYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnRdIDogW107XG4gICAgICAgICAgICBuZXdTdGF0ZS5zcG9ydENhdGVnb3J5ID0gW2FjdGlvbi50b3VybmFtZW50LnNwb3J0Q2F0ZWdvcnldO1xuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5BUFBMWV9TRUxFQ1RJT046XG5cbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG5cbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1zID0gQXJyYXkuZnJvbSggYWN0aW9uLnNlbGVjdGVkSXRlbXMudmFsdWVzKCkgKTtcblxuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5tdWx0aXBsZSApe1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1bYWN0aW9uLmluZGV4XSA9IHNlbGVjdGVkSXRlbXNbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLmNsZWFuICl7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmNsZWFuLmZvckVhY2goKHNlbGVjdG9yVHlwZSk9PntcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVbc2VsZWN0b3JUeXBlXSA9ICQuaXNBcnJheShzdGF0ZVtzZWxlY3RvclR5cGVdKSA/IFtdIDogbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuUkVNT1ZFX0ZST01fTVVMVElQTEU6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0uc3BsaWNlKGFjdGlvbi5pbmRleCwxKTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9GUk9NX01VTFRJUExFOlxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gWy4uLnN0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdXTtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdW2FjdGlvbi5pbmRleF1bYWN0aW9uLmtleV0gPSBhY3Rpb24udmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5TVVBFUl9SSUdIVFNfVVBEQVRFRDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2UgOiBBcnJheS5mcm9tKGFjdGlvbi5yaWdodHNQYWNrYWdlLnZhbHVlcygpKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX1NBTEVTX1BBQ0tBR0VTOlxuXG4gICAgICAgICAgICBsZXQgc2FsZXNQYWNrYWdlcyA9IFsuLi5zdGF0ZS5zYWxlc1BhY2thZ2VzXTtcblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVcIiApIHtcblxuICAgICAgICAgICAgICAgIGlmICggc2FsZXNQYWNrYWdlcy5sZW5ndGggPj0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcy5zcGxpY2UoYWN0aW9uLmluZGV4LDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZUFsbFwiICkge1xuICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMgPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJzYXZlXCIgKSBzYWxlc1BhY2thZ2VzW2FjdGlvbi5pbmRleF0gPSBhY3Rpb24uc2FsZXNQYWNrYWdlO1xuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzYWxlc1BhY2thZ2VzIDogc2FsZXNQYWNrYWdlc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5VUERBVEVfQVRUQUNITUVOVFM6XG5cbiAgICAgICAgICAgIGxldCBhdHRhY2htZW50cyA9IFsuLi5zdGF0ZS5hdHRhY2htZW50c107XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlXCIgKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGF0dGFjaG1lbnRzLmxlbmd0aCA+PSAxICkge1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2htZW50cy5zcGxpY2UoYWN0aW9uLmluZGV4LDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZUFsbFwiICkge1xuICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRzID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwic2F2ZVwiICkgYXR0YWNobWVudHNbYWN0aW9uLmluZGV4XSA9IGFjdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgYXR0YWNobWVudHMgOiBhdHRhY2htZW50c1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5VUERBVEVfQU5ORVg6XG5cbiAgICAgICAgICAgIGxldCBhbm5leCA9IFsuLi5zdGF0ZS5hbm5leF07XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlXCIgKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGFubmV4Lmxlbmd0aCA+PSAxICkge1xuICAgICAgICAgICAgICAgICAgICBhbm5leC5zcGxpY2UoYWN0aW9uLmluZGV4LDEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZUFsbFwiICkge1xuICAgICAgICAgICAgICAgIGFubmV4ID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwic2F2ZVwiICkgYW5uZXhbYWN0aW9uLmluZGV4XSA9IGFjdGlvbi52YWx1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgYW5uZXggOiBhbm5leFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5BRERfU0FMRVNfUEFDS0FHRVM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzYWxlc1BhY2thZ2VzIDogWy4uLnN0YXRlLnNhbGVzUGFja2FnZXMsLi4uYWN0aW9uLnNhbGVzUGFja2FnZXNdXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9jb250ZW50LmpzIiwiZXhwb3J0IGNvbnN0IHNlbGVjdG9yVHlwZT0ge1xuICAgIFRFU1Q6J1RFU1QnLFxuICAgIE9QRU5fU0VMRUNUT1I6ICdPUEVOX1NFTEVDVE9SJyxcbiAgICBDTE9TRV9TRUxFQ1RPUiA6ICdDTE9TRV9TRUxFQ1RPUicsXG4gICAgQVBQTFlfU0VMRUNUSU9OIDogJ0FQUExZX1NFTEVDVElPTidcbn07XG5cbmV4cG9ydCBjb25zdCBzZWxlY3RvciA9IChzdGF0ZSA9IHtcbiAgICB0eXBlOiBcInNwb3J0XCIsXG4gICAgb3BlbiA6IGZhbHNlLFxuICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxuICAgIHBvcHVsYXJJdGVtczogW11cblxufSwgYWN0aW9uKSA9PiB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLlRFU1Q6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBvcGVuOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBzZWxlY3RvclR5cGUuT1BFTl9TRUxFQ1RPUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogYWN0aW9uLnNlbGVjdG9yVHlwZSxcbiAgICAgICAgICAgICAgICBvcGVuIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbmRleCA6IGFjdGlvbi5pbmRleCxcbiAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBhY3Rpb24uc2VsZWN0b3JJdGVtcyxcbiAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IGFjdGlvbi5wb3B1bGFySXRlbXMsXG4gICAgICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogYWN0aW9uLmFjdGl2ZUZpbHRlcixcbiAgICAgICAgICAgICAgICBtdWx0aXBsZSA6IGFjdGlvbi5tdWx0aXBsZSxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZDogYWN0aW9uLmRpc2FibGVkLFxuICAgICAgICAgICAgICAgIHNob3dOZXdTcG9ydCA6IGFjdGlvbi5zaG93TmV3U3BvcnQsXG4gICAgICAgICAgICAgICAgc2hvd05ld1RvdXJuYW1lbnQgOiBhY3Rpb24uc2hvd05ld1RvdXJuYW1lbnQsXG4gICAgICAgICAgICAgICAgc2hvd05ld0NhdGVnb3J5IDogYWN0aW9uLnNob3dOZXdDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICBzaG93TmV3U2Vhc29uIDogYWN0aW9uLnNob3dOZXdTZWFzb24sXG4gICAgICAgICAgICAgICAgc2hvd0FsbENvdW50cmllczogYWN0aW9uLnNob3dBbGxDb3VudHJpZXMsXG4gICAgICAgICAgICAgICAgY2xlYW4gOiBhY3Rpb24uY2xlYW4sXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtczogYWN0aW9uLnNlbGVjdGVkSXRlbXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHNlbGVjdG9yVHlwZS5DTE9TRV9TRUxFQ1RPUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogXCJcIixcbiAgICAgICAgICAgICAgICBvcGVuIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogW10sXG4gICAgICAgICAgICAgICAgcG9wdWxhckl0ZW1zOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLkFQUExZX1NFTEVDVElPTiA6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvclR5cGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgb3BlbiA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxuICAgICAgICAgICAgICAgIHBvcHVsYXJJdGVtczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9zZWxlY3Rvci5qcyJdLCJzb3VyY2VSb290IjoiIn0=