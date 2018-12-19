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
    getAllSports: function getAllSports() {
        var deferred = jQuery.Deferred();
        var _this = this;
        $.ajax({
            url: envhosturl + "api/search/sports/all",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL21heC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvZGF0YS9sYW5ndWFnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmNvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0xhbmd1YWdlU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy91c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vcmVkdWNlcnMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9yZWR1Y2Vycy9tYW5hZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvc2VsZWN0b3IuanMiXSwibmFtZXMiOlsibGFuZ3VhZ2VzIiwiZmlsdGVyVHlwZXMiLCJBRERfUklHSFQiLCJSRU1PVkVfUklHSFQiLCJVUERBVEVfQ09VTlRSSUVTIiwiVVBEQVRFX0VYQ0xVU0lWRSIsIlVQREFURV9JTkNMVURFRF9DT1VOVFJJRVMiLCJVUERBVEVfU1BPUlQiLCJVUERBVEVfRVZFTlQiLCJDTEVBUiIsIkNMRUFSX1VQREFURSIsIlVQREFURV9NQU5ZIiwiVVBEQVRFX0ZJTFRFUlNfQ09ORklHIiwiZGVmYXVsdEZpbHRlciIsInJpZ2h0cyIsImNvdW50cmllcyIsImV4Y2x1c2l2ZSIsImluY2x1ZGVBbGxDb3VudHJpZXMiLCJzcG9ydCIsInZhbHVlIiwibGFiZWwiLCJldmVudCIsImZvcmNlVXBkYXRlIiwic3luY1dpdGhMb2NhbFN0b3JhZ2UiLCJmaWx0ZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJPYmplY3QiLCJhc3NpZ24iLCJpZCIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsIm1hcCIsImMiLCJmaWx0ZXJzIiwiTnVtYmVyIiwiciIsIm1hcmtldHBsYWNlVHlwZXMiLCJURVNUIiwibWFya2V0cGxhY2UiLCJ0ZXN0SXRlbSIsInRlc3QiLCJ0ZXh0IiwiX19hcGlTdG9yZSIsInRvdXJuYW1lbnRzIiwid2luZG93IiwiQ29udGVudEFyZW5hIiwiQ29udGVudEFwaSIsInNhdmVDb250ZW50QXNEcmFmdCIsImNvbnRlbnQiLCJkZWZlcnJlZCIsImpRdWVyeSIsIkRlZmVycmVkIiwiX3RoaXMiLCIkIiwiYWpheCIsInVybCIsImVudmhvc3R1cmwiLCJkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnRlbnRUeXBlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwicmVzb2x2ZSIsImVycm9yIiwic3RhdHVzIiwicmVqZWN0IiwicHJvbWlzZSIsInNhdmVDb250ZW50QXNJbmFjdGl2ZSIsInNhdmVDb250ZW50QXNBY3RpdmUiLCJyZXB1Ymxpc2hMaXN0aW5nIiwiY3VzdG9tSWQiLCJzZW5kTWVzc2FnZSIsIm1lc3NhZ2UiLCJnZXRVc2VySW5mbyIsImdldFVzZXJJbmZvQnlBY3RpdmF0aW9uQ29kZSIsImFjdGl2YXRpb25Db2RlIiwiZ2V0Q29tcGFueVVzZXJzIiwidXBkYXRlQ29tcGFueSIsImNvbXBhbnkiLCJ1cGRhdGVQYXNzd29yZCIsInVwZGF0ZVVzZXIiLCJ1c2VyIiwiYWN0aXZhdGVVc2VyIiwicGFzc3dvcmQiLCJ1cGRhdGVVc2VyUHJvZmlsZSIsInByb2ZpbGUiLCJnZXRUaHJlYWQiLCJnZXRUaHJlYWRzIiwicGxhY2VCaWQiLCJiaWQiLCJhY2NlcHRCaWQiLCJzaWduYXR1cmUiLCJzaWduYXR1cmVOYW1lIiwic2lnbmF0dXJlUG9zaXRpb24iLCJyZWplY3RCaWQiLCJyZW1vdmVCaWQiLCJzYXZlVG1wRmlsZSIsImZpbGVzIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJwcm9jZXNzRGF0YSIsInNhdmVBdHRhY2htZW50RmlsZSIsImNvbnNvbGUiLCJsb2ciLCJyZW1vdmVBdHRhY2htZW50RmlsZSIsImZpbGUiLCJnZXRCeUN1c3RvbUlkIiwiZ2V0RHJhZnRMaXN0aW5ncyIsImdldEluYWN0aXZlTGlzdGluZ3MiLCJnZXRBY3RpdmVMaXN0aW5ncyIsImdldEV4cGlyZWRMaXN0aW5ncyIsInJlbW92ZUxpc3RpbmciLCJkdXBsaWNhdGVMaXN0aW5nIiwiZGVhY3RpdmF0ZUxpc3RpbmciLCJhcmNoaXZlTGlzdGluZyIsImdldENsb3NlZERlYWxzIiwiZ2V0QWxsRGVhbHMiLCJnZXRQZW5kaW5nRGVhbHMiLCJnZXRSZWplY3RlZERlYWxzIiwiZ2V0V2F0Y2hsaXN0TGlzdGluZ3MiLCJBcGkiLCJzb3J0QnlMYWJlbCIsImEiLCJiIiwibmFtZSIsInNvcnRCeVNwb3J0Iiwic3BvcnRDYXRlZ29yeSIsInByZXBhcmVMaXN0IiwibGlzdCIsImNhdGVnb3J5SWQiLCJpdGVtIiwiY2F0ZWdvcnkiLCJleHRlcm5hbElkIiwic29ydCIsImZpbHRlckRvdWJsZXMiLCJzcG9ydElkIiwibmFtZXMiLCJyZXBsYWNlIiwicHVzaCIsImdldENvbnRlbnQiLCJnZXRKc29uQ29udGVudCIsInNhdmVGaWx0ZXIiLCJnZXRDb3VudHJpZXMiLCJEYXRhIiwiQ291bnRyaWVzIiwibGVuZ3RoIiwicmVnaW9ucyIsImdldEFjdGl2ZVNwb3J0cyIsImdldEFsbFNwb3J0cyIsImdldENvdW50cmllc0Z1bGwiLCJnZXRUZXJyaXRvcmllcyIsImdldFJlZ2lvbnMiLCJnZXRSaWdodHMiLCJyaWdodHNQYWNrYWdlIiwiZ3JvdXAiLCJnZXRSaWdodHNQYWNrYWdlIiwiZ2V0U3BvcnRzIiwiZXh0ZXJuYWxBcGlVcmwiLCJzcG9ydHMiLCJnZXRDb250ZW50RGV0YWlscyIsImdldFBlbmRpbmdMaXN0aW5ncyIsImdldENhdGVnb3JpZXMiLCJjYXRzIiwiZ2V0VG91cm5hbWVudHMiLCJkb25lIiwidG91cm5hbWVudCIsInN0b3JlZFJlc3BvbnNlIiwidW5kZWZpbmVkIiwiZ2V0U2Vhc29ucyIsInRvdXJuYW1lbnRJZCIsInNlYXNvbnMiLCJzZWFzb24iLCJpc0FycmF5IiwiZW5kRGF0ZSIsImVuZF9kYXRlIiwic3RhcnREYXRlIiwic3RhcnRfZGF0ZSIsInRvdXJuYW1lbnRfaWQiLCJ5ZWFyIiwicmV2ZXJzZSIsImdldFNjaGVkdWxlIiwic2Vhc29uSWQiLCJzcG9ydF9ldmVudHMiLCJzcG9ydF9ldmVudCIsImZvckVhY2giLCJyb3VuZCIsInRvdXJuYW1lbnRfcm91bmQiLCJudW1iZXIiLCJtYXRjaGVzIiwiTWFwIiwic2V0Iiwic2NoZWR1bGVkIiwidG91cm5hbWVudFJvdW5kIiwiY29tcGV0aXRvcnMiLCJjb21wZXRpdG9yIiwic2VhcmNoQ29tcGV0aXRpb24iLCJyZXF1ZXN0IiwidHJhZGl0aW9uYWwiLCJkYXRhVHlwZSIsIndhdGNobGlzdCIsImdldE5vdGlmaWNhdGlvbnMiLCJheGlvcyIsImdldCIsIm1hcmtOb3RpZmljYXRpb25Bc1NlZW4iLCJwb3N0IiwiTGFuZ3VhZ2VzIiwiVG9wU3BvcnRzIiwiRnVsbFNwb3J0cyIsIkFjdGl2ZVNwb3J0cyIsIlRlcnJpdG9yaWVzIiwiUmVnaW9ucyIsIlNob3J0IiwiTG9uZyIsIlV0aWxzIiwiY29udGVudFBhcnNlckZyb21TZXJ2ZXIiLCJwYXJzZWQiLCJleHRyYURhdGEiLCJlbnRyaWVzIiwia2V5IiwiQXJyYXkiLCJzZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodCIsInJwIiwic2VsZWN0ZWRSaWdodHMiLCJmaXh0dXJlc0J5U2Vhc29uIiwicyIsImkiLCJmaXh0dXJlcyIsImxhdyIsInNhbGVzUGFja2FnZXMiLCJzcCIsInNhbGVzTWV0aG9kIiwiZXhjbHVkZWRDb3VudHJpZXMiLCJleGNsdWRlZFRlcnJpdG9yaWVzIiwidCIsInRlcnJpdG9yaWVzIiwiaW5zdGFsbG1lbnRzIiwiZGF0ZSIsIm1vbWVudCIsImUiLCJzb3J0U2FsZXNQYWNrYWdlcyIsImhvc3R1cmwiLCJzdGVwIiwiY3VzdG9tU2Vhc29ucyIsInN0YXJ0c1dpdGgiLCJ5ZWFycyIsInNwbGl0IiwiZnJvbSIsInRvIiwiY3VzdG9tIiwic2Vhc29uRHVyYXRpb25zIiwiY3VzdG9tU2Vhc29uRHVyIiwiY3VzdG9tU3RhcnREYXRlIiwiY3VzdG9tRW5kRGF0ZSIsInN0b3JlIiwiZ2V0U3RhdGUiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInRpdGxlIiwiZmlsdGVyQ29tcGFueUluZm8iLCJsZWdhbE5hbWUiLCJyZWdpc3RyYXRpb25OdW1iZXIiLCJ2YXQiLCJhZGRyZXNzIiwiYWRkcmVzczIiLCJjaXR5IiwiemlwIiwiY291bnRyeSIsImlzQVBJQXZhaWxhYmxlIiwiRmlsZSIsIkZpbGVSZWFkZXIiLCJGaWxlTGlzdCIsIkJsb2IiLCJkb2N1bWVudCIsIndyaXRlbG4iLCJhZGRPcmRpbmFsIiwibiIsInN0ciIsInRvU3RyaW5nIiwic2xpY2UiLCJvcmQiLCJnZXRJbmRleCIsImFyciIsInByb3AiLCJnZXRXZWJzaXRlVVJsIiwiaW5jbHVkZXMiLCJpc0xpc3RpbmdQdWJsaXNoZWQiLCJhbGxWYWx1ZSIsIkxhbmd1YWdlU2VsZWN0b3IiLCJwcm9wcyIsImhhbmRsZU9uQ2hhbmdlIiwic2VsZWN0aW9uIiwib25DaGFuZ2UiLCJoYXNBbGwiLCJmaW5kIiwiaGFzQWxsUHJldiIsInByZXZTZWxlY3Rpb24iLCJtdWx0aSIsInBsYWNlaG9sZGVyIiwicmVhbExhbmd1YWdlcyIsInZhbHVlcyIsImsiLCJhbGxMYW5ndWFnZXMiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbW1vblR5cGVzIiwiR0VUX0RFRkFVTFRfUklHSFRTX1BBQ0tBR0UiLCJTRVRfVE9UQUxfQ09VTlRSSUVTIiwiU0VUX1RFU1RfU1RBR0VfTU9ERSIsImNvbW1vbkRlZmF1bHQiLCJ0b3RhbENvdW50cmllcyIsInRlc3RTdGFnZU1vZGUiLCJjb21tb24iLCJkZWZhdWx0UmlnaHRzUGFja2FnZSIsInVzZXJUeXBlcyIsIkxPR09VVCIsIkxPR0lOIiwiUFJPRklMRSIsIkxPQURfVVNFUl9EQVRBIiwiZGVmYXVsdFVzZXIiLCJlbWFpbCIsInZhbGlkYXRpb25UeXBlcyIsIkVOQUJMRV9WQUxJREFUSU9OIiwiRElTQUJMRV9WQUxJREFUSU9OIiwidmFsaWRhdGlvbiIsInJlZHVjZXJzIiwiY29tYmluZVJlZHVjZXJzIiwic2VsZWN0b3IiLCJtYW5hZ2UiLCJpMThuU3RhdGUiLCJjcmVhdGVTdG9yZSIsIm1hbmFnZVR5cGVzIiwiQ09OVEVOVF9JTklUIiwiU1RFUF9DSEFOR0VfUkVTRVQiLCJHT19UT19TVEVQIiwiR09fVE9fTkVYVF9TVEVQIiwiR09fVE9fUFJFVklPVVNfU1RFUCIsIkFERF9ORVciLCJSRU1PVkVfTkVXIiwiU1VQRVJfUklHSFRTX1VQREFURUQiLCJVUERBVEVfQ09OVEVOVF9WQUxVRSIsIlNFTEVDVF9UT1VSTkFNRU5UIiwiUkVNT1ZFX0ZST01fTVVMVElQTEUiLCJVUERBVEVfRlJPTV9NVUxUSVBMRSIsIkFQUExZX1NFTEVDVElPTiIsIlVQREFURV9TQUxFU19QQUNLQUdFUyIsIlVQREFURV9BVFRBQ0hNRU5UUyIsIlVQREFURV9BTk5FWCIsIkFERF9TQUxFU19QQUNLQUdFUyIsIlJFU0VUIiwiQUxMX0VQSVNPREVfVVBEQVRFX0ZMQUciLCJFbXB0eUxpc3RpbmciLCJtYXhTdGVwIiwiY3VzdG9tVG91cm5hbWVudCIsImN1c3RvbUNhdGVnb3J5IiwiZGVzY3JpcHRpb24iLCJwcm9ncmFtRGVzY3JpcHRpb24iLCJhdHRhY2htZW50cyIsImFubmV4IiwiZW5kRGF0ZUxpbWl0IiwiY291bnRlciIsImN1cnJlbmN5Iiwic3RhcnREYXRlTW9kZSIsInN0ZXBDaGFuZ2UiLCJOQV9JTlBVVCIsIkhMX0lOUFVUIiwiTElDRU5TRURfTEFOR1VBR0VTIiwiUFJPR1JBTV9MQU5HVUFHRSIsIlBST0dSQU1fU1VCVElUTEVTIiwiUFJPR1JBTV9TQ1JJUFQiLCJFRElUX1BST0dSQU1fREVTQ1JJUFRJT05fT1BUSU9OQUwiLCJ3ZWJzaXRlIiwiaW1hZ2UiLCJpbWFnZUJhc2U2NCIsInRlbXBEYXRhIiwibmV3U3RhdGUiLCJpbml0aWFsaXplZCIsIm1heCIsInBheWxvYWQiLCJuZXdTdGVwIiwic2VsZWN0b3JUeXBlIiwiY2xlYW4iLCJsaXN0aW5nRWRpdGVkIiwic2VsZWN0ZWRJdGVtcyIsIm11bHRpcGxlIiwic2FsZXNQYWNrYWdlIiwiT1BFTl9TRUxFQ1RPUiIsIkNMT1NFX1NFTEVDVE9SIiwib3BlbiIsInNlbGVjdG9ySXRlbXMiLCJwb3B1bGFySXRlbXMiLCJhY3RpdmVGaWx0ZXIiLCJkaXNhYmxlZCIsInNob3dOZXdTcG9ydCIsInNob3dOZXdUb3VybmFtZW50Iiwic2hvd05ld0NhdGVnb3J5Iiwic2hvd05ld1NlYXNvbiIsInNob3dBbGxDb3VudHJpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2Rjs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7O0FDbkxBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQ2xCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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Ozs7Ozs7Ozs7Ozs7OztBQzFCQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7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LCtCQUFlOVcsT0FBTzhXLGFBSk07QUFLNUJDLDhCQUFjL1csT0FBTytXLFlBTE87QUFNNUJDLDhCQUFlaFgsT0FBT2dYLFlBTk07QUFPNUJQLDBCQUFXelcsT0FBT3lXLFFBUFU7QUFRNUJRLDBCQUFValgsT0FBT2lYLFFBUlc7QUFTNUJDLDhCQUFlbFgsT0FBT2tYLFlBVE07QUFVNUJDLG1DQUFvQm5YLE9BQU9tWCxpQkFWQztBQVc1QkMsaUNBQWtCcFgsT0FBT29YLGVBWEc7QUFZNUJDLCtCQUFnQnJYLE9BQU9xWCxhQVpLO0FBYTVCQyxrQ0FBa0J0WCxPQUFPc1gsZ0JBYkc7QUFjNUJoQix1QkFBUXRXLE9BQU9zVyxLQWRhO0FBZTVCRSwrQkFBZXhXLE9BQU93VztBQWZNLGFBQXpCLENBQVA7QUFpQkosYUFBS0gsYUFBYU8sY0FBbEI7QUFDSSxtQkFBTzFXLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixFQUF5QjtBQUM1QnNXLDhCQUFjLEVBRGM7QUFFNUJRLHNCQUFPLEtBRnFCO0FBRzVCQywrQkFBZSxFQUhhO0FBSTVCQyw4QkFBYztBQUpjLGFBQXpCLENBQVA7QUFNSixhQUFLVixhQUFhcEMsZUFBbEI7QUFDSSxtQkFBTy9ULE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixFQUF5QjtBQUM1QnNXLDhCQUFjLEVBRGM7QUFFNUJRLHNCQUFPLEtBRnFCO0FBRzVCQywrQkFBZSxFQUhhO0FBSTVCQyw4QkFBYztBQUpjLGFBQXpCLENBQVA7QUFNSjtBQUNJLG1CQUFPaFgsS0FBUDtBQXRDUjtBQXdDSCxDQWhETSxDIiwiZmlsZSI6ImNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzIwMSlcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKHV0aWxzLm1lcmdlKGRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSB1dGlscy5tZXJnZSh7XG4gICAgICB1cmw6IGFyZ3VtZW50c1swXVxuICAgIH0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cblxuICBjb25maWcgPSB1dGlscy5tZXJnZShkZWZhdWx0cywge21ldGhvZDogJ2dldCd9LCB0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIC8vIE5vdGU6IHN0YXR1cyBpcyBub3QgZXhwb3NlZCBieSBYRG9tYWluUmVxdWVzdFxuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9KSgpXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBtZXRob2RzIGxpa2UgYF8ubWF4YCBhbmQgYF8ubWluYCB3aGljaCBhY2NlcHRzIGFcbiAqIGBjb21wYXJhdG9yYCB0byBkZXRlcm1pbmUgdGhlIGV4dHJlbXVtIHZhbHVlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgVGhlIGNvbXBhcmF0b3IgdXNlZCB0byBjb21wYXJlIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBleHRyZW11bSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUV4dHJlbXVtKGFycmF5LCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY3VycmVudCA9IGl0ZXJhdGVlKHZhbHVlKTtcblxuICAgIGlmIChjdXJyZW50ICE9IG51bGwgJiYgKGNvbXB1dGVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IChjdXJyZW50ID09PSBjdXJyZW50ICYmICFpc1N5bWJvbChjdXJyZW50KSlcbiAgICAgICAgICA6IGNvbXBhcmF0b3IoY3VycmVudCwgY29tcHV0ZWQpXG4gICAgICAgICkpIHtcbiAgICAgIHZhciBjb21wdXRlZCA9IGN1cnJlbnQsXG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUV4dHJlbXVtO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlRXh0cmVtdW0uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUV4dHJlbXVtLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGdldFJhd1RhZyA9IHJlcXVpcmUoJy4vX2dldFJhd1RhZycpLFxuICAgIG9iamVjdFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fb2JqZWN0VG9TdHJpbmcnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldFRhZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5ndGAgd2hpY2ggZG9lc24ndCBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGdyZWF0ZXIgdGhhbiBgb3RoZXJgLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUd0KHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPiBvdGhlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR3QuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhd1RhZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UmF3VGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRvU3RyaW5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pZGVudGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL2lzU3ltYm9sLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwidmFyIGJhc2VFeHRyZW11bSA9IHJlcXVpcmUoJy4vX2Jhc2VFeHRyZW11bScpLFxuICAgIGJhc2VHdCA9IHJlcXVpcmUoJy4vX2Jhc2VHdCcpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtYXhpbXVtIHZhbHVlIG9mIGBhcnJheWAuIElmIGBhcnJheWAgaXMgZW1wdHkgb3IgZmFsc2V5LFxuICogYHVuZGVmaW5lZGAgaXMgcmV0dXJuZWQuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWF4aW11bSB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5tYXgoWzQsIDIsIDgsIDZdKTtcbiAqIC8vID0+IDhcbiAqXG4gKiBfLm1heChbXSk7XG4gKiAvLyA9PiB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gbWF4KGFycmF5KSB7XG4gIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKVxuICAgID8gYmFzZUV4dHJlbXVtKGFycmF5LCBpZGVudGl0eSwgYmFzZUd0KVxuICAgIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1heDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9tYXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9tYXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJleHBvcnQgY29uc3QgbGFuZ3VhZ2VzID0ge1xuICAgIFwiYWJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWJraGF6XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LDSp9GB0YPQsFwiXG4gICAgfSxcbiAgICBcImFhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFmYXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBZmFyYWZcIlxuICAgIH0sXG4gICAgXCJhZlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBZnJpa2FhbnNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBZnJpa2FhbnNcIlxuICAgIH0sXG4gICAgXCJha1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBa2FuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWthblwiXG4gICAgfSxcbiAgICBcInNxXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFsYmFuaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2hxaXBcIlxuICAgIH0sXG4gICAgXCJhbVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBbWhhcmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Yqg4Yib4Yit4YqbXCJcbiAgICB9LFxuICAgIFwiYXJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXJhYmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi2KfZhNi52LHYqNmK2KlcIlxuICAgIH0sXG4gICAgXCJhblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBcmFnb25lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBcmFnb27DqXNcIlxuICAgIH0sXG4gICAgXCJoeVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBcm1lbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItWA1aHVtdWl1oDVpdW2XCJcbiAgICB9LFxuICAgIFwiYXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXNzYW1lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpoXgprjgpq7gp4Dgpq/gprzgpr5cIlxuICAgIH0sXG4gICAgXCJhdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBdmFyaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsNCy0LDRgCDQvNCw0YbTgCwg0LzQsNCz04DQsNGA0YPQuyDQvNCw0YbTgFwiXG4gICAgfSxcbiAgICBcImFlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkF2ZXN0YW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJhdmVzdGFcIlxuICAgIH0sXG4gICAgXCJheVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBeW1hcmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJheW1hciBhcnVcIlxuICAgIH0sXG4gICAgXCJhelwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBemVyYmFpamFuaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImF6yZlyYmF5Y2FuIGRpbGlcIlxuICAgIH0sXG4gICAgXCJibVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCYW1iYXJhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYmFtYW5hbmthblwiXG4gICAgfSxcbiAgICBcImJhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJhc2hraXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsdCw0YjSodC+0YDRgiDRgtC10LvQtVwiXG4gICAgfSxcbiAgICBcImV1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJhc3F1ZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImV1c2thcmEsIGV1c2tlcmFcIlxuICAgIH0sXG4gICAgXCJiZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCZWxhcnVzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0JHQtdC70LDRgNGD0YHQutCw0Y9cIlxuICAgIH0sXG4gICAgXCJiblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCZW5nYWxpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Kas4Ka+4KaC4Kay4Ka+XCJcbiAgICB9LFxuICAgIFwiYmhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmloYXJpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KSt4KWL4KSc4KSq4KWB4KSw4KWAXCJcbiAgICB9LFxuICAgIFwiYmlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmlzbGFtYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkJpc2xhbWFcIlxuICAgIH0sXG4gICAgXCJic1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCb3NuaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYm9zYW5za2kgamV6aWtcIlxuICAgIH0sXG4gICAgXCJiclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCcmV0b25cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJicmV6aG9uZWdcIlxuICAgIH0sXG4gICAgXCJiZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCdWxnYXJpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsdGK0LvQs9Cw0YDRgdC60Lgg0LXQt9C40LpcIlxuICAgIH0sXG4gICAgXCJteVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCdXJtZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4YCX4YCZ4YCs4YCF4YCsXCJcbiAgICB9LFxuICAgIFwiY2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2F0YWxhbjsgVmFsZW5jaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQ2F0YWzDoFwiXG4gICAgfSxcbiAgICBcImNoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNoYW1vcnJvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQ2hhbW9ydVwiXG4gICAgfSxcbiAgICBcImNlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNoZWNoZW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQvdC+0YXRh9C40LnQvSDQvNC+0YLRglwiXG4gICAgfSxcbiAgICBcIm55XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNoaWNoZXdhOyBDaGV3YTsgTnlhbmphXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiY2hpQ2hlxbVhLCBjaGlueWFuamFcIlxuICAgIH0sXG4gICAgXCJ6aFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGluZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi5Lit5paHIChaaMWNbmd3w6luKSwg5rGJ6K+tLCDmvKLoqp5cIlxuICAgIH0sXG4gICAgXCJjdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaHV2YXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0YfTkdCy0LDRiCDRh9OX0LvRhdC4XCJcbiAgICB9LFxuICAgIFwia3dcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ29ybmlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktlcm5ld2VrXCJcbiAgICB9LFxuICAgIFwiY29cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ29yc2ljYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJjb3JzdSwgbGluZ3VhIGNvcnNhXCJcbiAgICB9LFxuICAgIFwiY3JcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ3JlZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGTgOGQpuGQg+GUreGQjeGQj+GQo1wiXG4gICAgfSxcbiAgICBcImhyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNyb2F0aWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiaHJ2YXRza2lcIlxuICAgIH0sXG4gICAgXCJjc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDemVjaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIsSNZXNreSwgxI1lxaF0aW5hXCJcbiAgICB9LFxuICAgIFwiZGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRGFuaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZGFuc2tcIlxuICAgIH0sXG4gICAgXCJkdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJEaXZlaGk7IERoaXZlaGk7IE1hbGRpdmlhbjtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLei96o3ojerN6A3qhcIlxuICAgIH0sXG4gICAgXCJubFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJEdXRjaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5lZGVybGFuZHMsIFZsYWFtc1wiXG4gICAgfSxcbiAgICBcImVuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkVuZ2xpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFbmdsaXNoXCJcbiAgICB9LFxuICAgIFwiZW9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRXNwZXJhbnRvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRXNwZXJhbnRvXCJcbiAgICB9LFxuICAgIFwiZXRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRXN0b25pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJlZXN0aSwgZWVzdGkga2VlbFwiXG4gICAgfSxcbiAgICBcImVlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkV3ZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkXKi2VnYmVcIlxuICAgIH0sXG4gICAgXCJmb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGYXJvZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZsO4cm95c2t0XCJcbiAgICB9LFxuICAgIFwiZmpcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRmlqaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwidm9zYSBWYWthdml0aVwiXG4gICAgfSxcbiAgICBcImZpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZpbm5pc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzdW9taSwgc3VvbWVuIGtpZWxpXCJcbiAgICB9LFxuICAgIFwiZnJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRnJlbmNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZnJhbsOnYWlzLCBsYW5ndWUgZnJhbsOnYWlzZVwiXG4gICAgfSxcbiAgICBcImZmXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZ1bGE7IEZ1bGFoOyBQdWxhYXI7IFB1bGFyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRnVsZnVsZGUsIFB1bGFhciwgUHVsYXJcIlxuICAgIH0sXG4gICAgXCJnbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHYWxpY2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkdhbGVnb1wiXG4gICAgfSxcbiAgICBcImthXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkdlb3JnaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4YOl4YOQ4YOg4YOX4YOj4YOa4YOYXCJcbiAgICB9LFxuICAgIFwiZGVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR2VybWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRGV1dHNjaFwiXG4gICAgfSxcbiAgICBcImVsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkdyZWVrLCBNb2Rlcm5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLOlc67zrvOt869zrnOus6sXCJcbiAgICB9LFxuICAgIFwiZ25cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR3VhcmFuw61cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBdmHDsWXhur1cIlxuICAgIH0sXG4gICAgXCJndVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHdWphcmF0aVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCql+CrgeCqnOCqsOCqvuCqpOCrgFwiXG4gICAgfSxcbiAgICBcImh0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhhaXRpYW47IEhhaXRpYW4gQ3Jlb2xlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS3JlecOybCBheWlzeWVuXCJcbiAgICB9LFxuICAgIFwiaGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGF1c2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJIYXVzYSwg2YfZjtmI2Y/Ys9mOXCJcbiAgICB9LFxuICAgIFwiaGVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGVicmV3IChtb2Rlcm4pXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi16LXkdeo15nXqlwiXG4gICAgfSxcbiAgICBcImh6XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhlcmVyb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk90amloZXJlcm9cIlxuICAgIH0sXG4gICAgXCJoaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIaW5kaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkueCkv+CkqOCljeCkpuClgCwg4KS54KS/4KSC4KSm4KWAXCJcbiAgICB9LFxuICAgIFwiaG9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGlyaSBNb3R1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSGlyaSBNb3R1XCJcbiAgICB9LFxuICAgIFwiaHVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSHVuZ2FyaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTWFneWFyXCJcbiAgICB9LFxuICAgIFwiaWFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW50ZXJsaW5ndWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJJbnRlcmxpbmd1YVwiXG4gICAgfSxcbiAgICBcImlkXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkluZG9uZXNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJCYWhhc2EgSW5kb25lc2lhXCJcbiAgICB9LFxuICAgIFwiaWVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW50ZXJsaW5ndWVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPcmlnaW5hbGx5IGNhbGxlZCBPY2NpZGVudGFsOyB0aGVuIEludGVybGluZ3VlIGFmdGVyIFdXSUlcIlxuICAgIH0sXG4gICAgXCJnYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJcmlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkdhZWlsZ2VcIlxuICAgIH0sXG4gICAgXCJpZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJZ2JvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXPhu6Vz4bulIElnYm9cIlxuICAgIH0sXG4gICAgXCJpa1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbnVwaWFxXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiScOxdXBpYXEsIEnDsXVwaWF0dW5cIlxuICAgIH0sXG4gICAgXCJpb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJZG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJJZG9cIlxuICAgIH0sXG4gICAgXCJpc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJY2VsYW5kaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLDjXNsZW5za2FcIlxuICAgIH0sXG4gICAgXCJpdFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJdGFsaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSXRhbGlhbm9cIlxuICAgIH0sXG4gICAgXCJpdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbnVrdGl0dXRcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhkIPhk4ThkoPhkY7hkZDhkaZcIlxuICAgIH0sXG4gICAgXCJqYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJKYXBhbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuaXpeacrOiqniAo44Gr44G744KT44GU77yP44Gr44Gj44G944KT44GUKVwiXG4gICAgfSxcbiAgICBcImp2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkphdmFuZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYmFzYSBKYXdhXCJcbiAgICB9LFxuICAgIFwia2xcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2FsYWFsbGlzdXQsIEdyZWVubGFuZGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwia2FsYWFsbGlzdXQsIGthbGFhbGxpdCBvcWFhc2lpXCJcbiAgICB9LFxuICAgIFwia25cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2FubmFkYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCyleCyqOCzjeCyqOCyoVwiXG4gICAgfSxcbiAgICBcImtyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthbnVyaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkthbnVyaVwiXG4gICAgfSxcbiAgICBcImtzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthc2htaXJpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KSV4KS24KWN4KSu4KWA4KSw4KWALCDZg9i02YXZitix2YrigI5cIlxuICAgIH0sXG4gICAgXCJra1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYXpha2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLSmtCw0LfQsNKbINGC0ZbQu9GWXCJcbiAgICB9LFxuICAgIFwia21cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2htZXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhnpfhnrbhnp/hnrbhnoHhn5Lhnpjhn4LhnppcIlxuICAgIH0sXG4gICAgXCJraVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLaWt1eXUsIEdpa3V5dVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkfEqWvFqXnFqVwiXG4gICAgfSxcbiAgICBcInJ3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpbnlhcndhbmRhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSWtpbnlhcndhbmRhXCJcbiAgICB9LFxuICAgIFwia3lcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2lyZ2hpeiwgS3lyZ3l6XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LrRi9GA0LPRi9C3INGC0LjQu9C4XCJcbiAgICB9LFxuICAgIFwia3ZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS29taVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC60L7QvNC4INC60YvQslwiXG4gICAgfSxcbiAgICBcImtnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktvbmdvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2lLb25nb1wiXG4gICAgfSxcbiAgICBcImtvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktvcmVhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIu2VnOq1reyWtCAo6Z+T5ZyL6KqeKSwg7KGw7ISg66eQICjmnJ3prq7oqp4pXCJcbiAgICB9LFxuICAgIFwia3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS3VyZGlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkt1cmTDriwg2YPZiNix2K/bjOKAjlwiXG4gICAgfSxcbiAgICBcImtqXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkt3YW55YW1hLCBLdWFueWFtYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkt1YW55YW1hXCJcbiAgICB9LFxuICAgIFwibGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGF0aW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJsYXRpbmUsIGxpbmd1YSBsYXRpbmFcIlxuICAgIH0sXG4gICAgXCJsYlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMdXhlbWJvdXJnaXNoLCBMZXR6ZWJ1cmdlc2NoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTMOrdHplYnVlcmdlc2NoXCJcbiAgICB9LFxuICAgIFwibGdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTHVnYW5kYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkx1Z2FuZGFcIlxuICAgIH0sXG4gICAgXCJsaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMaW1idXJnaXNoLCBMaW1idXJnYW4sIExpbWJ1cmdlclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkxpbWJ1cmdzXCJcbiAgICB9LFxuICAgIFwibG5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGluZ2FsYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkxpbmfDoWxhXCJcbiAgICB9LFxuICAgIFwibG9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGFvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Lqe4Lqy4Lqq4Lqy4Lql4Lqy4LqnXCJcbiAgICB9LFxuICAgIFwibHRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGl0aHVhbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImxpZXR1dmnFsyBrYWxiYVwiXG4gICAgfSxcbiAgICBcImx1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkx1YmEtS2F0YW5nYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlwiXG4gICAgfSxcbiAgICBcImx2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxhdHZpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJsYXR2aWXFoXUgdmFsb2RhXCJcbiAgICB9LFxuICAgIFwiZ3ZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFueFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkdhZWxnLCBHYWlsY2tcIlxuICAgIH0sXG4gICAgXCJta1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYWNlZG9uaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LzQsNC60LXQtNC+0L3RgdC60Lgg0ZjQsNC30LjQulwiXG4gICAgfSxcbiAgICBcIm1nXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbGFnYXN5XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTWFsYWdhc3kgZml0ZW55XCJcbiAgICB9LFxuICAgIFwibXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFsYXlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJiYWhhc2EgTWVsYXl1LCDYqNmH2KfYsyDZhdmE2KfZitmI4oCOXCJcbiAgICB9LFxuICAgIFwibWxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFsYXlhbGFtXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LSu4LSy4LSv4LS+4LSz4LSCXCJcbiAgICB9LFxuICAgIFwibXRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFsdGVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hbHRpXCJcbiAgICB9LFxuICAgIFwibWlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTcSBb3JpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwidGUgcmVvIE3EgW9yaVwiXG4gICAgfSxcbiAgICBcIm1yXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hcmF0aGkgKE1hcsSB4bmtaMSrKVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkruCksOCkvuCkoOClgFwiXG4gICAgfSxcbiAgICBcIm1oXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hcnNoYWxsZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2FqaW4gTcynYWplxLxcIlxuICAgIH0sXG4gICAgXCJtblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNb25nb2xpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQvNC+0L3Qs9C+0LtcIlxuICAgIH0sXG4gICAgXCJuYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOYXVydVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkVrYWthaXLFqSBOYW9lcm9cIlxuICAgIH0sXG4gICAgXCJudlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOYXZham8sIE5hdmFob1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkRpbsOpIGJpemFhZCwgRGluw6lryrxlaMeww61cIlxuICAgIH0sXG4gICAgXCJuYlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW4gQm9rbcOlbFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrIGJva23DpWxcIlxuICAgIH0sXG4gICAgXCJuZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J0aCBOZGViZWxlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiaXNpTmRlYmVsZVwiXG4gICAgfSxcbiAgICBcIm5lXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5lcGFsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkqOClh+CkquCkvuCksuClgFwiXG4gICAgfSxcbiAgICBcIm5nXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5kb25nYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk93YW1ib1wiXG4gICAgfSxcbiAgICBcIm5uXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcndlZ2lhbiBOeW5vcnNrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTm9yc2sgbnlub3Jza1wiXG4gICAgfSxcbiAgICBcIm5vXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcndlZ2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrXCJcbiAgICB9LFxuICAgIFwiaWlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTnVvc3VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLqhojqjKDqkr8gTnVvc3VoeG9wXCJcbiAgICB9LFxuICAgIFwibnJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU291dGggTmRlYmVsZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImlzaU5kZWJlbGVcIlxuICAgIH0sXG4gICAgXCJvY1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPY2NpdGFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT2NjaXRhblwiXG4gICAgfSxcbiAgICBcIm9qXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9qaWJ3ZSwgT2ppYndhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4ZCK4ZOC4ZSR4ZOI4ZCv4ZKn4ZCO4ZOQXCJcbiAgICB9LFxuICAgIFwiY3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT2xkIENodXJjaCBTbGF2b25pYywgQ2h1cmNoIFNsYXZpYywgQ2h1cmNoIFNsYXZvbmljLCBPbGQgQnVsZ2FyaWFuLCBPbGQgU2xhdm9uaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRqdC30YvQutGKINGB0LvQvtCy0aPQvdGM0YHQutGKXCJcbiAgICB9LFxuICAgIFwib21cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT3JvbW9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBZmFhbiBPcm9tb29cIlxuICAgIH0sXG4gICAgXCJvclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPcml5YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCsk+CsoeCsvOCsv+CshlwiXG4gICAgfSxcbiAgICBcIm9zXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9zc2V0aWFuLCBPc3NldGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LjRgNC+0L0gw6bQstC30LDQs1wiXG4gICAgfSxcbiAgICBcInBhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBhbmphYmksIFB1bmphYmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgqKrgqbDgqJzgqL7gqKzgqYAsINm+2YbYrNin2KjbjOKAjlwiXG4gICAgfSxcbiAgICBcInBpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlDEgWxpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KSq4KS+4KS04KS/XCJcbiAgICB9LFxuICAgIFwiZmFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUGVyc2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItmB2KfYsdiz24xcIlxuICAgIH0sXG4gICAgXCJwbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQb2xpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJwb2xza2lcIlxuICAgIH0sXG4gICAgXCJwc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQYXNodG8sIFB1c2h0b1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItm+2prYqtmIXCJcbiAgICB9LFxuICAgIFwicHRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUG9ydHVndWVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlBvcnR1Z3XDqnNcIlxuICAgIH0sXG4gICAgXCJxdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJRdWVjaHVhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiUnVuYSBTaW1pLCBLaWNod2FcIlxuICAgIH0sXG4gICAgXCJybVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJSb21hbnNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwicnVtYW50c2NoIGdyaXNjaHVuXCJcbiAgICB9LFxuICAgIFwicm5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2lydW5kaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImtpUnVuZGlcIlxuICAgIH0sXG4gICAgXCJyb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJSb21hbmlhbiwgTW9sZGF2aWFuLCBNb2xkb3ZhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInJvbcOibsSDXCJcbiAgICB9LFxuICAgIFwicnVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUnVzc2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGA0YPRgdGB0LrQuNC5INGP0LfRi9C6XCJcbiAgICB9LFxuICAgIFwic2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2Fuc2tyaXQgKFNh4bmBc2vhuZt0YSlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLjgpILgpLjgpY3gpJXgpYPgpKTgpK7gpY1cIlxuICAgIH0sXG4gICAgXCJzY1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTYXJkaW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzYXJkdVwiXG4gICAgfSxcbiAgICBcInNkXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNpbmRoaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkuOCkv+CkqOCljeCkp+ClgCwg2LPZhtqM2YrYjCDYs9mG2K/avtuM4oCOXCJcbiAgICB9LFxuICAgIFwic2VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9ydGhlcm4gU2FtaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkRhdnZpc8OhbWVnaWVsbGFcIlxuICAgIH0sXG4gICAgXCJzbVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTYW1vYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJnYWdhbmEgZmFhIFNhbW9hXCJcbiAgICB9LFxuICAgIFwic2dcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2FuZ29cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJ5w6JuZ8OiIHTDriBzw6RuZ8O2XCJcbiAgICB9LFxuICAgIFwic3JcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2VyYmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGB0YDQv9GB0LrQuCDRmNC10LfQuNC6XCJcbiAgICB9LFxuICAgIFwiZ2RcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2NvdHRpc2ggR2FlbGljOyBHYWVsaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHw6BpZGhsaWdcIlxuICAgIH0sXG4gICAgXCJzblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTaG9uYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImNoaVNob25hXCJcbiAgICB9LFxuICAgIFwic2lcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2luaGFsYSwgU2luaGFsZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LeD4LeS4LaC4LeE4La9XCJcbiAgICB9LFxuICAgIFwic2tcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2xvdmFrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic2xvdmVuxI1pbmFcIlxuICAgIH0sXG4gICAgXCJzbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTbG92ZW5lXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic2xvdmVuxaHEjWluYVwiXG4gICAgfSxcbiAgICBcInNvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNvbWFsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNvb21hYWxpZ2EsIGFmIFNvb21hYWxpXCJcbiAgICB9LFxuICAgIFwic3RcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU291dGhlcm4gU290aG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTZXNvdGhvXCJcbiAgICB9LFxuICAgIFwiZXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3BhbmlzaDsgQ2FzdGlsaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZXNwYcOxb2wsIGNhc3RlbGxhbm9cIlxuICAgIH0sXG4gICAgXCJzdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTdW5kYW5lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJCYXNhIFN1bmRhXCJcbiAgICB9LFxuICAgIFwic3dcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3dhaGlsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktpc3dhaGlsaVwiXG4gICAgfSxcbiAgICBcInNzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlN3YXRpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2lTd2F0aVwiXG4gICAgfSxcbiAgICBcInN2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlN3ZWRpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzdmVuc2thXCJcbiAgICB9LFxuICAgIFwidGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFtaWxcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgrqTgrq7grr/grrTgr41cIlxuICAgIH0sXG4gICAgXCJ0ZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUZWx1Z3VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgsKTgsYbgsLLgsYHgsJfgsYFcIlxuICAgIH0sXG4gICAgXCJ0Z1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUYWppa1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGC0L7St9C40LrToywgdG/En2lrxKssINiq2KfYrNuM2qnbjOKAjlwiXG4gICAgfSxcbiAgICBcInRoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRoYWlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLguYTguJfguKJcIlxuICAgIH0sXG4gICAgXCJ0aVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUaWdyaW55YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGJteGMjeGIreGKm1wiXG4gICAgfSxcbiAgICBcImJvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRpYmV0YW4gU3RhbmRhcmQsIFRpYmV0YW4sIENlbnRyYWxcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgvZbgvbzgvZHgvIvgvaHgvbLgvYJcIlxuICAgIH0sXG4gICAgXCJ0a1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUdXJrbWVuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVMO8cmttZW4sINCi0q/RgNC60LzQtdC9XCJcbiAgICB9LFxuICAgIFwidGxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFnYWxvZ1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIldpa2FuZyBUYWdhbG9nLCDhnI/hnJLhnIPhnIXhnJQg4ZyG4ZyE4ZyO4ZyT4ZyE4ZyUXCJcbiAgICB9LFxuICAgIFwidG5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHN3YW5hXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2V0c3dhbmFcIlxuICAgIH0sXG4gICAgXCJ0b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUb25nYSAoVG9uZ2EgSXNsYW5kcylcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJmYWthIFRvbmdhXCJcbiAgICB9LFxuICAgIFwidHJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHVya2lzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlTDvHJrw6dlXCJcbiAgICB9LFxuICAgIFwidHNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHNvbmdhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiWGl0c29uZ2FcIlxuICAgIH0sXG4gICAgXCJ0dFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUYXRhclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGC0LDRgtCw0YDRh9CwLCB0YXRhcsOnYSwg2KrYp9iq2KfYsdqG2KfigI5cIlxuICAgIH0sXG4gICAgXCJ0d1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUd2lcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUd2lcIlxuICAgIH0sXG4gICAgXCJ0eVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUYWhpdGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlJlbyBUYWhpdGlcIlxuICAgIH0sXG4gICAgXCJ1Z1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJVaWdodXIsIFV5Z2h1clwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlV5xqN1cnHJmSwg2Kbbh9mK2Lrbh9ix2obbleKAjlwiXG4gICAgfSxcbiAgICBcInVrXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlVrcmFpbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGD0LrRgNCw0ZfQvdGB0YzQutCwXCJcbiAgICB9LFxuICAgIFwidXJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVXJkdVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItin2LHYr9mIXCJcbiAgICB9LFxuICAgIFwidXpcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVXpiZWtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJ6YmVrLCDQjtC30LHQtdC6LCDYo9uH2LLYqNuQ2YPigI5cIlxuICAgIH0sXG4gICAgXCJ2ZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJWZW5kYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlRzaGl2ZW7huJNhXCJcbiAgICB9LFxuICAgIFwidmlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVmlldG5hbWVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlRp4bq/bmcgVmnhu4d0XCJcbiAgICB9LFxuICAgIFwidm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVm9sYXDDvGtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJWb2xhcMO8a1wiXG4gICAgfSxcbiAgICBcIndhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldhbGxvb25cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJXYWxvblwiXG4gICAgfSxcbiAgICBcImN5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldlbHNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQ3ltcmFlZ1wiXG4gICAgfSxcbiAgICBcIndvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldvbG9mXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiV29sbG9mXCJcbiAgICB9LFxuICAgIFwiZnlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiV2VzdGVybiBGcmlzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRnJ5c2tcIlxuICAgIH0sXG4gICAgXCJ4aFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJYaG9zYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImlzaVhob3NhXCJcbiAgICB9LFxuICAgIFwieWlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiWWlkZGlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIteZ15nWtNeT15nXqVwiXG4gICAgfSxcbiAgICBcInlvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIllvcnViYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIllvcsO5YsOhXCJcbiAgICB9LFxuICAgIFwiemFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiWmh1YW5nLCBDaHVhbmdcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTYcmvIGN1ZcWLxoUsIFNhdyBjdWVuZ2hcIlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvZGF0YS9sYW5ndWFnZXMuanMiLCJcbmV4cG9ydCBjb25zdCBmaWx0ZXJUeXBlcz0ge1xuICAgIEFERF9SSUdIVDonQUREX1JJR0hUJyxcbiAgICBSRU1PVkVfUklHSFQgOiAnUkVNT1ZFX1JJR0hUJyxcbiAgICBVUERBVEVfQ09VTlRSSUVTIDogJ1VQREFURV9DT1VOVFJJRVMnLFxuICAgIFVQREFURV9FWENMVVNJVkUgOiAnVVBEQVRFX0VYQ0xVU0lWRScsXG4gICAgVVBEQVRFX0lOQ0xVREVEX0NPVU5UUklFUyA6ICdVUERBVEVfSU5DTFVERURfQ09VTlRSSUVTJyxcbiAgICBVUERBVEVfU1BPUlQgOiAnVVBEQVRFX1NQT1JUJyxcbiAgICBVUERBVEVfRVZFTlQgOiAnVVBEQVRFX0VWRU5UJyxcbiAgICBDTEVBUiA6ICdDTEVBUicsXG4gICAgQ0xFQVJfVVBEQVRFIDogJ0NMRUFSX1VQREFURScsXG4gICAgVVBEQVRFX01BTlkgOiAnVVBEQVRFX01BTlknLFxuICAgIFVQREFURV9GSUxURVJTX0NPTkZJRzogXCJVUERBVEVfQUxMXCJcbn07XG5cbmNvbnN0IGRlZmF1bHRGaWx0ZXIgPSB7XG4gICAgcmlnaHRzOiBbXSxcbiAgICBjb3VudHJpZXM6IFtdLFxuICAgIGV4Y2x1c2l2ZSA6IGZhbHNlLFxuICAgIGluY2x1ZGVBbGxDb3VudHJpZXMgOiBmYWxzZSxcbiAgICBzcG9ydDoge1xuICAgICAgICB2YWx1ZSA6IG51bGwsXG4gICAgICAgIGxhYmVsIDogXCJBbGwgc3BvcnRzXCJcbiAgICB9LFxuICAgIGV2ZW50IDogXCJcIixcbiAgICBmb3JjZVVwZGF0ZSA6IHRydWUsXG4gICAgc3luY1dpdGhMb2NhbFN0b3JhZ2U6IGZhbHNlXG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyID0gKHN0YXRlID0gZGVmYXVsdEZpbHRlciwgYWN0aW9uKSA9PiB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0lOQ0xVREVEX0NPVU5UUklFUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGVBbGxDb3VudHJpZXM6IGFjdGlvbi5pbmNsdWRlQWxsQ291bnRyaWVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5DTEVBUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGVmYXVsdEZpbHRlcik7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuQ0xFQVJfVVBEQVRFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZm9yY2VVcGRhdGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5BRERfUklHSFQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICByaWdodHM6IFsuLi5zdGF0ZS5yaWdodHMsIGFjdGlvbi5pZF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlJFTU9WRV9SSUdIVDpcblxuICAgICAgICAgICAgbGV0IGluZGV4ID0gc3RhdGUucmlnaHRzLmluZGV4T2YoYWN0aW9uLmlkKTtcbiAgICAgICAgICAgIHN0YXRlLnJpZ2h0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgcmlnaHRzOiBbLi4uc3RhdGUucmlnaHRzXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0NPVU5UUklFUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGNvdW50cmllczogYWN0aW9uLmNvdW50cmllcy5tYXAoYz0+Yy52YWx1ZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9FWENMVVNJVkU6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBleGNsdXNpdmU6IGFjdGlvbi5leGNsdXNpdmVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9TUE9SVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNwb3J0OiBhY3Rpb24uc3BvcnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9GSUxURVJTX0NPTkZJRzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgYWN0aW9uLmZpbHRlcnMpO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9FVkVOVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGV2ZW50OiBhY3Rpb24uZXZlbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9NQU5ZOlxuICAgICAgICAgICAgYWN0aW9uLmZpbHRlcnMuZm9yY2VVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGFjdGlvbi5maWx0ZXJzLnJpZ2h0cykgYWN0aW9uLmZpbHRlcnMucmlnaHRzID0gYWN0aW9uLmZpbHRlcnMucmlnaHRzLm1hcChyPT5OdW1iZXIocikpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRGaWx0ZXIsIGFjdGlvbi5maWx0ZXJzKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9yZWR1Y2Vycy9maWx0ZXIuanMiLCJcbmV4cG9ydCBjb25zdCBtYXJrZXRwbGFjZVR5cGVzPSB7XG4gICAgVEVTVDonVEVTVCcsXG59O1xuXG5leHBvcnQgY29uc3QgbWFya2V0cGxhY2UgPSAoc3RhdGUgPSB7XG4gICAgdGVzdEl0ZW06IFwibWFya2V0cGxhY2VSZWR1Y2VyXCJcblxufSwgYWN0aW9uKSA9PiB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgbWFya2V0cGxhY2VUeXBlcy5URVNUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgdGVzdDogYWN0aW9uLnRleHQsXG4gICAgICAgICAgICAgICAgaWQgOiBhY3Rpb24uaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL21hcmtldHBsYWNlLmpzIiwiLyoqXG4qIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4qL1xuXG5sZXQgX19hcGlTdG9yZSA9IHtcbiAgICB0b3VybmFtZW50cyA6IHt9XG59O1xuXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpID0gQ29udGVudEFyZW5hLkNvbnRlbnRBcGl8fCB7fTtcblxuQ29udGVudEFyZW5hLkNvbnRlbnRBcGk9IHtcbiAgICBzYXZlQ29udGVudEFzRHJhZnQgKCBjb250ZW50ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L2RyYWZ0L3NhdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2F2ZUNvbnRlbnRBc0luYWN0aXZlICggY29udGVudCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3Rpbmcvc2F2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzYXZlQ29udGVudEFzQWN0aXZlICggY29udGVudCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmcvcHVibGlzaFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZXB1Ymxpc2hMaXN0aW5nICggY3VzdG9tSWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5nL3JlcHVibGlzaFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y3VzdG9tSWQ6IGN1c3RvbUlkfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2VuZE1lc3NhZ2UgKCBtZXNzYWdlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvc2VuZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRVc2VySW5mbyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9pbmZvXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRVc2VySW5mb0J5QWN0aXZhdGlvbkNvZGUgKCBhY3RpdmF0aW9uQ29kZSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvY29kZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBkYXRhIDogSlNPTi5zdHJpbmdpZnkoe2FjdGl2YXRpb25Db2RlOiBhY3RpdmF0aW9uQ29kZX0pLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvbXBhbnlVc2VycyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvY29tcGFueS91c2Vyc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgdXBkYXRlQ29tcGFueSAoIGNvbXBhbnkgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9jb21wYW55L3VwZGF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y29tcGFueTpjb21wYW55fSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgdXBkYXRlUGFzc3dvcmQgKCBkYXRhICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9wYXNzd29yZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB1cGRhdGVVc2VyICggdXNlciApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvdXBkYXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHt1c2VyOnVzZXJ9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBhY3RpdmF0ZVVzZXIgKCB1c2VyLCBwYXNzd29yZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvYWN0aXZhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXI6dXNlcixpZDogdXNlci5pZCwgcGFzc3dvcmQgOiBwYXNzd29yZH0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlVXNlclByb2ZpbGUgKCBwcm9maWxlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9wcm9maWxlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtwcm9maWxlOnByb2ZpbGV9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRUaHJlYWQgKCBjdXN0b21JZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3RocmVhZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y3VzdG9tSWQ6IGN1c3RvbUlkfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VGhyZWFkcyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3RocmVhZHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHBsYWNlQmlkICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3BsYWNlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgYWNjZXB0QmlkICggYmlkLCBzaWduYXR1cmUsIHNpZ25hdHVyZU5hbWUsIHNpZ25hdHVyZVBvc2l0aW9uICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICBiaWQuc2lnbmF0dXJlID0gc2lnbmF0dXJlO1xuICAgICAgICBiaWQuc2lnbmF0dXJlTmFtZSA9IHNpZ25hdHVyZU5hbWU7XG4gICAgICAgIGJpZC5zaWduYXR1cmVQb3NpdGlvbiA9IHNpZ25hdHVyZVBvc2l0aW9uO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvYWNjZXB0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVqZWN0QmlkICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3JlamVjdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlbW92ZUJpZCAoIGJpZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZW1vdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIHNhdmVUbXBGaWxlICggZmlsZXMgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlc1swXSk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9zYXZlL2ZpbGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzYXZlQXR0YWNobWVudEZpbGUgKCBmaWxlcyApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBkYXRhLmFwcGVuZCgnZmlsZScsIGZpbGVzWzBdKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L3NhdmUvYXR0YWNobWVudFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGQUlMRURcIilcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcmVtb3ZlQXR0YWNobWVudEZpbGUgKCBmaWxlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvcmVtb3ZlL2F0dGFjaG1lbnRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGZpbGUgOiBmaWxlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGQUlMRURcIilcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0QnlDdXN0b21JZCAoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJsaXN0aW5nL2RldGFpbHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgZ2V0RHJhZnRMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZHJhZnRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEluYWN0aXZlTGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2luYWN0aXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBY3RpdmVMaXN0aW5ncyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvYWN0aXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRFeHBpcmVkTGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2V4cGlyZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlbW92ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvcmVtb3ZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBkdXBsaWNhdGVMaXN0aW5nKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2R1cGxpY2F0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZGVhY3RpdmF0ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZGVhY3RpdmF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgYXJjaGl2ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvYXJjaGl2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBnZXRDbG9zZWREZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9jbG9zZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBbGxEZWFscyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9hbGxcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRQZW5kaW5nRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcGVuZGluZ1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFJlamVjdGVkRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcmVqZWN0ZWRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRXYXRjaGxpc3RMaXN0aW5ncyAoKXtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL3dhdGNobGlzdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbn07XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmNvbnRlbnQuanMiLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG4vKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxubGV0IF9fYXBpU3RvcmUgPSB7XG4gICAgdG91cm5hbWVudHMgOiB7fVxufTtcblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5cbkNvbnRlbnRBcmVuYS5BcGk9IHtcbiAgICBzb3J0QnlMYWJlbCAoYSwgYikge1xuICAgICAgICByZXR1cm4gKGEubmFtZSA+IGIubmFtZSkgPyAxIDogKChiLm5hbWUgPiBhLm5hbWUpID8gLTEgOiAwKVxuICAgIH0sXG4gICAgc29ydEJ5U3BvcnQgKGEsIGIpIHtcblxuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lID4gYi5zcG9ydC5uYW1lKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEuc3BvcnQubmFtZSA8IGIuc3BvcnQubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5zcG9ydENhdGVnb3J5Lm5hbWUgPiBiLnNwb3J0Q2F0ZWdvcnkubmFtZSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLnNwb3J0Q2F0ZWdvcnkubmFtZSA8IGIuc3BvcnRDYXRlZ29yeS5uYW1lKSByZXR1cm4gLTE7XG4gICAgICAgIGlmIChhLm5hbWUgPiBiLm5hbWUpIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5uYW1lIDwgYi5uYW1lKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiAwO1xuXG4gICAgfSxcbiAgICBwcmVwYXJlTGlzdCAoIGxpc3QsIGNhdGVnb3J5SWQgKSB7XG5cbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICBsaXN0ID0gJC5tYXAobGlzdCwgZnVuY3Rpb24gKGl0ZW0pIHtcblxuICAgICAgICAgICAgLy8gRmlsdGVyIGJ5IGNhdGVnb3J5XG4gICAgICAgICAgICBpZiAoIGNhdGVnb3J5SWQgJiYgaXRlbS5jYXRlZ29yeVsnQGF0dHJpYnV0ZXMnXS5pZCAhPSBjYXRlZ29yeUlkKSByZXR1cm4gbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWR9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3Quc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG5cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfSxcbiAgICBmaWx0ZXJEb3VibGVzICggbGlzdCwgc3BvcnRJZCApe1xuICAgICAgICBsZXQgbmFtZXMgPSBbXTtcblxuICAgICAgICBpZiAoIHNwb3J0SWQgPT09IFwic3I6c3BvcnQ6NVwiICl7XG4gICAgICAgICAgICBsaXN0ID0gbGlzdC5tYXAoaXRlbT0+e1xuICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGl0ZW0ubmFtZS5yZXBsYWNlKC8gc2luZ2xlcy9naSwnJykucmVwbGFjZSgvIGRvdWJsZS9naSwnJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9KS5maWx0ZXIoaXRlbT0+e1xuICAgICAgICAgICAgICAgIGlmIChuYW1lcy5pbmRleE9mKGl0ZW0ubmFtZSkgPT09IC0xKXtcbiAgICAgICAgICAgICAgICAgICAgbmFtZXMucHVzaChpdGVtLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfSxcbiAgICBnZXRDb250ZW50ICggZmlsdGVyKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImJ1eS9zZWFyY2hcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IGZpbHRlcixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRKc29uQ29udGVudCAoIGZpbHRlcikge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJsaXN0aW5ncy9tYXJrZXRwbGFjZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNhdmVGaWx0ZXIgKCBmaWx0ZXIpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L2ZpbHRlci9zYXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiBmaWx0ZXIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q291bnRyaWVzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMgJiYgQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzLmxlbmd0aCA+IDAgKXtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL2NvdW50cmllcy9hbGxcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZS5tYXAoYz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5yZWdpb25zID0gYy5yZWdpb25zLm1hcChyPT5yLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuZXh0ZXJuYWxJZCA9IGMuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMgPSByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBY3RpdmVTcG9ydHMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9zcG9ydHMvYWN0aXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFsbFNwb3J0cyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3Nwb3J0cy9hbGxcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q291bnRyaWVzRnVsbCAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL2NvdW50cmllcy9mdWxsXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRlcnJpdG9yaWVzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvdGVycml0b3JpZXNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmVnaW9ucyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3JlZ2lvbnNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmlnaHRzIChyaWdodHNQYWNrYWdlLCBncm91cCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9yaWdodHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmlnaHRzUGFja2FnZSAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvcmlnaHRzLXBhY2thZ2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0U3BvcnRzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3Nwb3J0c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7c3BvcnQ6b2JqZWN0fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3BvcnRzID0gX3RoaXMucHJlcGFyZUxpc3QoIHJlc3BvbnNlLnNwb3J0KTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNwb3J0cyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvbnRlbnREZXRhaWxzKCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9kZXRhaWxzL1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UGVuZGluZ0xpc3RpbmdzKCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9wZW5kaW5nLWxpc3RpbmdzL1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q2F0ZWdvcmllcyAoIHNwb3J0SWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgbGlzdCA9IFtdLFxuICAgICAgICAgICAgY2F0cyA9IFtdO1xuXG4gICAgICAgIF90aGlzLmdldFRvdXJuYW1lbnRzKHNwb3J0SWQpLmRvbmUoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoICEgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCBbXSApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdCA9ICQubWFwKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQgLCBmdW5jdGlvbiAoaXRlbSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaXRlbS5jYXRlZ29yeVsnQGF0dHJpYnV0ZXMnXS5pZDtcblxuICAgICAgICAgICAgICAgIGlmICggY2F0cy5pbmRleE9mKGlkKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhdHMucHVzaCggaWQgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QobGlzdCkgKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VG91cm5hbWVudHMgKCBzcG9ydElkLCBjYXRlZ29yeUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcywgc3RvcmVkUmVzcG9uc2U7XG5cbiAgICAgICAgaWYgKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdICE9PSB1bmRlZmluZWQgKXtcblxuICAgICAgICAgICAgc3RvcmVkUmVzcG9uc2UgPSBfdGhpcy5wcmVwYXJlTGlzdChfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQsIGNhdGVnb3J5SWQpXG4gICAgICAgICAgICBzdG9yZWRSZXNwb25zZSA9IF90aGlzLmZpbHRlckRvdWJsZXMoc3RvcmVkUmVzcG9uc2Usc3BvcnRJZCk7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHN0b3JlZFJlc3BvbnNlKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC90b3VybmFtZW50c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNwb3J0SWQgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBBIGNvbW1lbnRcbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnRvdXJuYW1lbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gPSByZXNwb25zZS50b3VybmFtZW50cztcblxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gX3RoaXMucHJlcGFyZUxpc3QocmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCwgY2F0ZWdvcnlJZCk7XG4gICAgICAgICAgICAgICAgbGlzdCA9IF90aGlzLmZpbHRlckRvdWJsZXMobGlzdCwgc3BvcnRJZCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRTZWFzb25zICggdG91cm5hbWVudElkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC9zZWFzb25zXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogdG91cm5hbWVudElkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpc3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnNlYXNvbnMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5zZWFzb25zLnNlYXNvbiA9PT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoW10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCAkLmlzQXJyYXkocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24pICl7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSAkLm1hcChyZXNwb25zZS5zZWFzb25zLnNlYXNvbiwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5lbmRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50SWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10udG91cm5hbWVudF9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiBpdGVtWydAYXR0cmlidXRlcyddLnllYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLmVuZF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5zdGFydF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10ueWVhcixcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFNjaGVkdWxlICggc2Vhc29uSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3NjaGVkdWxlc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNlYXNvbklkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3BvcnRfZXZlbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50ID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICByZXNwb25zZS5zcG9ydF9ldmVudHMuc3BvcnRfZXZlbnQuZm9yRWFjaCggKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcm91bmQgID0gKGl0ZW0udG91cm5hbWVudF9yb3VuZCkgPyBpdGVtLnRvdXJuYW1lbnRfcm91bmRbJ0BhdHRyaWJ1dGVzJ10gOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcm91bmQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IChyb3VuZC5udW1iZXIpID8gXCJyb3VuZF9cIiArIHJvdW5kLm51bWJlciA6IHJvdW5kLm5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXSApIGxpc3RbbmFtZV0gPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoICFsaXN0W25hbWVdLm1hdGNoZXMgKSBsaXN0W25hbWVdLm1hdGNoZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlzdFtuYW1lXS5tYXRjaGVzLnNldChpdGVtWydAYXR0cmlidXRlcyddLmlkLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zY2hlZHVsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBpdGVtWydAYXR0cmlidXRlcyddLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRSb3VuZCA6IHJvdW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGV0aXRvcnMgOiAoaXRlbS5jb21wZXRpdG9ycykgPyBpdGVtLmNvbXBldGl0b3JzLmNvbXBldGl0b3IubWFwKCggY29tcGV0aXRvcik9PnsgcmV0dXJuIGNvbXBldGl0b3JbJ0BhdHRyaWJ1dGVzJ10gIH0pICA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2VhcmNoQ29tcGV0aXRpb24ocmVxdWVzdCkge1xuXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyAnYXBpL3NlYXJjaC90b3VybmFtZW50JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogcmVxdWVzdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYWRpdGlvbmFsOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZGF0YS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0uc3BvcnQpLnNvcnQoX3RoaXMuc29ydEJ5U3BvcnQpO1xuXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB3YXRjaGxpc3QoIGlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvd2F0Y2hsaXN0L2FkZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Tm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtlbnZob3N0dXJsfWFwaS9ub3RpZmljYXRpb25zL2ApO1xuICAgIH0sXG4gICAgbWFya05vdGlmaWNhdGlvbkFzU2VlbihpZCkge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgJHtlbnZob3N0dXJsfWFwaS9ub3RpZmljYXRpb25zL3NlZW5gLCB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9KTtcbiAgICB9LFxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5cbkNvbnRlbnRBcmVuYS5EYXRhID0gQ29udGVudEFyZW5hLkRhdGEgfHwge307XG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzID0gQ29udGVudEFyZW5hLkxhbmd1YWdlcyB8fCB7fTtcblxuQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzID0gW1xuICAgIHsgbmFtZSA6IFwiU29jY2VyXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MVwifSxcbiAgICB7IG5hbWUgOiBcIkJhc2tldGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyXCJ9LFxuICAgIHsgbmFtZSA6IFwiQmFzZWJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDozXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6NVwifSxcbiAgICB7IG5hbWUgOiBcIkNyaWNrZXRcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMVwifSxcbiAgICB7IG5hbWUgOiBcIkZpZWxkIEhvY2tleVwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjI0XCJ9LFxuICAgIHsgbmFtZSA6IFwiVm9sbGV5YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIzXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGFibGUgVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjBcIn0sXG4gICAgeyBuYW1lIDogXCJHb2xmXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6OVwifSxcbiAgICB7IG5hbWUgOiBcIkFtZXJpY2FuIEZvb3RiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MTZcIn0sXG4gICAgeyBuYW1lIDogXCJIYW5kYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjZcIn1cbl07XG5cbkNvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBbXTtcbkNvbnRlbnRBcmVuYS5EYXRhLkFjdGl2ZVNwb3J0cyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gW107XG5Db250ZW50QXJlbmEuRGF0YS5UZXJyaXRvcmllcyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuUmVnaW9ucyA9IFtdO1xuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5TaG9ydCA9IHtcbiAgICBcIm1kclwiOiBcIk1hbmRhcmluXCIsXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxuICAgIFwiYm5cIjogXCJCZW5nYWxpXCIsXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcbiAgICBcImphXCI6IFwiSmFwYW5lc2VcIixcbiAgICBcImp2XCI6IFwiSmF2YW5lc2VcIixcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXG4gICAgXCJhbGxcIiA6IFwiU2hvdyBBbGxcIlxufTtcblxuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5Mb25nID0ge1xuICAgIFwiYWFcIjogXCJBZmFyXCIsXG4gICAgXCJhZlwiOiBcIkFmcmlrYWFuc1wiLFxuICAgIFwiYWluXCI6IFwiQWludVwiLFxuICAgIFwiYWt6XCI6IFwiQWxhYmFtYVwiLFxuICAgIFwic3FcIjogXCJBbGJhbmlhblwiLFxuICAgIFwiYWxlXCI6IFwiQWxldXRcIixcbiAgICBcImFycVwiOiBcIkFsZ2VyaWFuIEFyYWJpY1wiLFxuICAgIFwiZW5fVVNcIjogXCJBbWVyaWNhbiBFbmdsaXNoXCIsXG4gICAgXCJhc2VcIjogXCJBbWVyaWNhbiBTaWduIExhbmd1YWdlXCIsXG4gICAgXCJhbVwiOiBcIkFtaGFyaWNcIixcbiAgICBcImVneVwiOiBcIkFuY2llbnQgRWd5cHRpYW5cIixcbiAgICBcImdyY1wiOiBcIkFuY2llbnQgR3JlZWtcIixcbiAgICBcImFyXCI6IFwiQXJhYmljXCIsXG4gICAgXCJhcmNcIjogXCJBcmFtYWljXCIsXG4gICAgXCJhcnBcIjogXCJBcmFwYWhvXCIsXG4gICAgXCJhcndcIjogXCJBcmF3YWtcIixcbiAgICBcImh5XCI6IFwiQXJtZW5pYW5cIixcbiAgICBcImFzXCI6IFwiQXNzYW1lc2VcIixcbiAgICBcImFzYVwiOiBcIkFzdVwiLFxuICAgIFwiZW5fQVVcIjogXCJBdXN0cmFsaWFuIEVuZ2xpc2hcIixcbiAgICBcImRlX0FUXCI6IFwiQXVzdHJpYW4gR2VybWFuXCIsXG4gICAgXCJheVwiOiBcIkF5bWFyYVwiLFxuICAgIFwiYXpcIjogXCJBemVyYmFpamFuaVwiLFxuICAgIFwiYmFuXCI6IFwiQmFsaW5lc2VcIixcbiAgICBcImV1XCI6IFwiQmFzcXVlXCIsXG4gICAgXCJiYXJcIjogXCJCYXZhcmlhblwiLFxuICAgIFwiYmVcIjogXCJCZWxhcnVzaWFuXCIsXG4gICAgXCJiblwiOiBcIkJlbmdhbGlcIixcbiAgICBcImJpa1wiOiBcIkJpa29sXCIsXG4gICAgXCJiaW5cIjogXCJCaW5pXCIsXG4gICAgXCJic1wiOiBcIkJvc25pYW5cIixcbiAgICBcImJyaFwiOiBcIkJyYWh1aVwiLFxuICAgIFwiYnJhXCI6IFwiQnJhalwiLFxuICAgIFwicHRfQlJcIjogXCJCcmF6aWxpYW4gUG9ydHVndWVzZVwiLFxuICAgIFwiYnJcIjogXCJCcmV0b25cIixcbiAgICBcImVuX0dCXCI6IFwiQnJpdGlzaCBFbmdsaXNoXCIsXG4gICAgXCJiZ1wiOiBcIkJ1bGdhcmlhblwiLFxuICAgIFwibXlcIjogXCJCdXJtZXNlXCIsXG4gICAgXCJmcmNcIjogXCJDYWp1biBGcmVuY2hcIixcbiAgICBcImVuX0NBXCI6IFwiQ2FuYWRpYW4gRW5nbGlzaFwiLFxuICAgIFwiZnJfQ0FcIjogXCJDYW5hZGlhbiBGcmVuY2hcIixcbiAgICBcInl1ZVwiOiBcIkNhbnRvbmVzZVwiLFxuICAgIFwiY2FyXCI6IFwiQ2FyaWJcIixcbiAgICBcImNhXCI6IFwiQ2F0YWxhblwiLFxuICAgIFwiY2F5XCI6IFwiQ2F5dWdhXCIsXG4gICAgXCJjZWJcIjogXCJDZWJ1YW5vXCIsXG4gICAgXCJzaHVcIjogXCJDaGFkaWFuIEFyYWJpY1wiLFxuICAgIFwiY2VcIjogXCJDaGVjaGVuXCIsXG4gICAgXCJjaHJcIjogXCJDaGVyb2tlZVwiLFxuICAgIFwicXVnXCI6IFwiQ2hpbWJvcmF6byBIaWdobGFuZCBRdWljaHVhXCIsXG4gICAgXCJ6aFwiOiBcIkNoaW5lc2VcIixcbiAgICBcImNoblwiOiBcIkNoaW5vb2sgSmFyZ29uXCIsXG4gICAgXCJjaHBcIjogXCJDaGlwZXd5YW5cIixcbiAgICBcImNob1wiOiBcIkNob2N0YXdcIixcbiAgICBcImN1XCI6IFwiQ2h1cmNoIFNsYXZpY1wiLFxuICAgIFwiY3ZcIjogXCJDaHV2YXNoXCIsXG4gICAgXCJud2NcIjogXCJDbGFzc2ljYWwgTmV3YXJpXCIsXG4gICAgXCJzeWNcIjogXCJDbGFzc2ljYWwgU3lyaWFjXCIsXG4gICAgXCJzd2NcIjogXCJDb25nbyBTd2FoaWxpXCIsXG4gICAgXCJjb3BcIjogXCJDb3B0aWNcIixcbiAgICBcImt3XCI6IFwiQ29ybmlzaFwiLFxuICAgIFwiY29cIjogXCJDb3JzaWNhblwiLFxuICAgIFwiY3JcIjogXCJDcmVlXCIsXG4gICAgXCJtdXNcIjogXCJDcmVla1wiLFxuICAgIFwiY3JoXCI6IFwiQ3JpbWVhbiBUdXJraXNoXCIsXG4gICAgXCJoclwiOiBcIkNyb2F0aWFuXCIsXG4gICAgXCJjc1wiOiBcIkN6ZWNoXCIsXG4gICAgXCJkYWtcIjogXCJEYWtvdGFcIixcbiAgICBcImRhXCI6IFwiRGFuaXNoXCIsXG4gICAgXCJkZWxcIjogXCJEZWxhd2FyZVwiLFxuICAgIFwibmxcIjogXCJEdXRjaFwiLFxuICAgIFwiZnJzXCI6IFwiRWFzdGVybiBGcmlzaWFuXCIsXG4gICAgXCJhcnpcIjogXCJFZ3lwdGlhbiBBcmFiaWNcIixcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxuICAgIFwiZW9cIjogXCJFc3BlcmFudG9cIixcbiAgICBcImV0XCI6IFwiRXN0b25pYW5cIixcbiAgICBcInB0X1BUXCI6IFwiRXVyb3BlYW4gUG9ydHVndWVzZVwiLFxuICAgIFwiZXNfRVNcIjogXCJFdXJvcGVhbiBTcGFuaXNoXCIsXG4gICAgXCJlZVwiOiBcIkV3ZVwiLFxuICAgIFwiZmFuXCI6IFwiRmFuZ1wiLFxuICAgIFwiaGlmXCI6IFwiRmlqaSBIaW5kaVwiLFxuICAgIFwiZmpcIjogXCJGaWppYW5cIixcbiAgICBcImZpbFwiOiBcIkZpbGlwaW5vXCIsXG4gICAgXCJmaVwiOiBcIkZpbm5pc2hcIixcbiAgICBcIm5sX0JFXCI6IFwiRmxlbWlzaFwiLFxuICAgIFwiZm9uXCI6IFwiRm9uXCIsXG4gICAgXCJmclwiOiBcIkZyZW5jaFwiLFxuICAgIFwiZ2FhXCI6IFwiR2FcIixcbiAgICBcImdhblwiOiBcIkdhbiBDaGluZXNlXCIsXG4gICAgXCJrYVwiOiBcIkdlb3JnaWFuXCIsXG4gICAgXCJkZVwiOiBcIkdlcm1hblwiLFxuICAgIFwiZ290XCI6IFwiR290aGljXCIsXG4gICAgXCJncmJcIjogXCJHcmVib1wiLFxuICAgIFwiZWxcIjogXCJHcmVla1wiLFxuICAgIFwiZ25cIjogXCJHdWFyYW5pXCIsXG4gICAgXCJndVwiOiBcIkd1amFyYXRpXCIsXG4gICAgXCJndXpcIjogXCJHdXNpaVwiLFxuICAgIFwiaGFpXCI6IFwiSGFpZGFcIixcbiAgICBcImh0XCI6IFwiSGFpdGlhblwiLFxuICAgIFwiaGFrXCI6IFwiSGFra2EgQ2hpbmVzZVwiLFxuICAgIFwiaGFcIjogXCJIYXVzYVwiLFxuICAgIFwiaGF3XCI6IFwiSGF3YWlpYW5cIixcbiAgICBcImhlXCI6IFwiSGVicmV3XCIsXG4gICAgXCJoelwiOiBcIkhlcmVyb1wiLFxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxuICAgIFwiaGl0XCI6IFwiSGl0dGl0ZVwiLFxuICAgIFwiaG1uXCI6IFwiSG1vbmdcIixcbiAgICBcImh1XCI6IFwiSHVuZ2FyaWFuXCIsXG4gICAgXCJpc1wiOiBcIkljZWxhbmRpY1wiLFxuICAgIFwiaW9cIjogXCJJZG9cIixcbiAgICBcImlnXCI6IFwiSWdib1wiLFxuICAgIFwiaXVcIjogXCJJbnVrdGl0dXRcIixcbiAgICBcImlrXCI6IFwiSW51cGlhcVwiLFxuICAgIFwiZ2FcIjogXCJJcmlzaFwiLFxuICAgIFwiaXRcIjogXCJJdGFsaWFuXCIsXG4gICAgXCJqYW1cIjogXCJKYW1haWNhbiBDcmVvbGUgRW5nbGlzaFwiLFxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxuICAgIFwianZcIjogXCJKYXZhbmVzZVwiLFxuICAgIFwia2FqXCI6IFwiSmp1XCIsXG4gICAgXCJkeW9cIjogXCJKb2xhLUZvbnlpXCIsXG4gICAgXCJ4YWxcIjogXCJLYWxteWtcIixcbiAgICBcImthbVwiOiBcIkthbWJhXCIsXG4gICAgXCJrYmxcIjogXCJLYW5lbWJ1XCIsXG4gICAgXCJrblwiOiBcIkthbm5hZGFcIixcbiAgICBcImtyXCI6IFwiS2FudXJpXCIsXG4gICAgXCJrYWFcIjogXCJLYXJhLUthbHBha1wiLFxuICAgIFwia3JjXCI6IFwiS2FyYWNoYXktQmFsa2FyXCIsXG4gICAgXCJrcmxcIjogXCJLYXJlbGlhblwiLFxuICAgIFwia3NcIjogXCJLYXNobWlyaVwiLFxuICAgIFwiY3NiXCI6IFwiS2FzaHViaWFuXCIsXG4gICAgXCJrYXdcIjogXCJLYXdpXCIsXG4gICAgXCJra1wiOiBcIkthemFraFwiLFxuICAgIFwia2VuXCI6IFwiS2VueWFuZ1wiLFxuICAgIFwia2hhXCI6IFwiS2hhc2lcIixcbiAgICBcImttXCI6IFwiS2htZXJcIixcbiAgICBcImtob1wiOiBcIktob3RhbmVzZVwiLFxuICAgIFwia2h3XCI6IFwiS2hvd2FyXCIsXG4gICAgXCJraVwiOiBcIktpa3V5dVwiLFxuICAgIFwia21iXCI6IFwiS2ltYnVuZHVcIixcbiAgICBcImtyalwiOiBcIktpbmFyYXktYVwiLFxuICAgIFwicndcIjogXCJLaW55YXJ3YW5kYVwiLFxuICAgIFwia2l1XCI6IFwiS2lybWFuamtpXCIsXG4gICAgXCJ0bGhcIjogXCJLbGluZ29uXCIsXG4gICAgXCJia21cIjogXCJLb21cIixcbiAgICBcImt2XCI6IFwiS29taVwiLFxuICAgIFwia29pXCI6IFwiS29taS1QZXJteWFrXCIsXG4gICAgXCJrZ1wiOiBcIktvbmdvXCIsXG4gICAgXCJrb2tcIjogXCJLb25rYW5pXCIsXG4gICAgXCJrb1wiOiBcIktvcmVhblwiLFxuICAgIFwia2ZvXCI6IFwiS29yb1wiLFxuICAgIFwia29zXCI6IFwiS29zcmFlYW5cIixcbiAgICBcImF2a1wiOiBcIktvdGF2YVwiLFxuICAgIFwia2hxXCI6IFwiS295cmEgQ2hpaW5pXCIsXG4gICAgXCJzZXNcIjogXCJLb3lyYWJvcm8gU2VubmlcIixcbiAgICBcImtwZVwiOiBcIktwZWxsZVwiLFxuICAgIFwia3JpXCI6IFwiS3Jpb1wiLFxuICAgIFwia2pcIjogXCJLdWFueWFtYVwiLFxuICAgIFwia3VtXCI6IFwiS3VteWtcIixcbiAgICBcImt1XCI6IFwiS3VyZGlzaFwiLFxuICAgIFwia3J1XCI6IFwiS3VydWtoXCIsXG4gICAgXCJrdXRcIjogXCJLdXRlbmFpXCIsXG4gICAgXCJubWdcIjogXCJLd2FzaW9cIixcbiAgICBcImt5XCI6IFwiS3lyZ3l6XCIsXG4gICAgXCJxdWNcIjogXCJLXFx1MDJiY2ljaGVcXHUwMmJjXCIsXG4gICAgXCJsYWRcIjogXCJMYWRpbm9cIixcbiAgICBcImxhaFwiOiBcIkxhaG5kYVwiLFxuICAgIFwibGt0XCI6IFwiTGFrb3RhXCIsXG4gICAgXCJsYW1cIjogXCJMYW1iYVwiLFxuICAgIFwibGFnXCI6IFwiTGFuZ2lcIixcbiAgICBcImxvXCI6IFwiTGFvXCIsXG4gICAgXCJsdGdcIjogXCJMYXRnYWxpYW5cIixcbiAgICBcImxhXCI6IFwiTGF0aW5cIixcbiAgICBcImVzXzQxOVwiOiBcIkxhdGluIEFtZXJpY2FuIFNwYW5pc2hcIixcbiAgICBcImx2XCI6IFwiTGF0dmlhblwiLFxuICAgIFwibHp6XCI6IFwiTGF6XCIsXG4gICAgXCJsZXpcIjogXCJMZXpnaGlhblwiLFxuICAgIFwibGlqXCI6IFwiTGlndXJpYW5cIixcbiAgICBcImxpXCI6IFwiTGltYnVyZ2lzaFwiLFxuICAgIFwibG5cIjogXCJMaW5nYWxhXCIsXG4gICAgXCJsZm5cIjogXCJMaW5ndWEgRnJhbmNhIE5vdmFcIixcbiAgICBcImx6aFwiOiBcIkxpdGVyYXJ5IENoaW5lc2VcIixcbiAgICBcImx0XCI6IFwiTGl0aHVhbmlhblwiLFxuICAgIFwibGl2XCI6IFwiTGl2b25pYW5cIixcbiAgICBcImpib1wiOiBcIkxvamJhblwiLFxuICAgIFwibG1vXCI6IFwiTG9tYmFyZFwiLFxuICAgIFwibmRzXCI6IFwiTG93IEdlcm1hblwiLFxuICAgIFwic2xpXCI6IFwiTG93ZXIgU2lsZXNpYW5cIixcbiAgICBcImRzYlwiOiBcIkxvd2VyIFNvcmJpYW5cIixcbiAgICBcImxvelwiOiBcIkxvemlcIixcbiAgICBcImx1XCI6IFwiTHViYS1LYXRhbmdhXCIsXG4gICAgXCJsdWFcIjogXCJMdWJhLUx1bHVhXCIsXG4gICAgXCJsdWlcIjogXCJMdWlzZW5vXCIsXG4gICAgXCJzbWpcIjogXCJMdWxlIFNhbWlcIixcbiAgICBcImx1blwiOiBcIkx1bmRhXCIsXG4gICAgXCJsdW9cIjogXCJMdW9cIixcbiAgICBcImxiXCI6IFwiTHV4ZW1ib3VyZ2lzaFwiLFxuICAgIFwibHV5XCI6IFwiTHV5aWFcIixcbiAgICBcIm1kZVwiOiBcIk1hYmFcIixcbiAgICBcIm1rXCI6IFwiTWFjZWRvbmlhblwiLFxuICAgIFwiam1jXCI6IFwiTWFjaGFtZVwiLFxuICAgIFwibWFkXCI6IFwiTWFkdXJlc2VcIixcbiAgICBcIm1hZlwiOiBcIk1hZmFcIixcbiAgICBcIm1hZ1wiOiBcIk1hZ2FoaVwiLFxuICAgIFwidm1mXCI6IFwiTWFpbi1GcmFuY29uaWFuXCIsXG4gICAgXCJtYWlcIjogXCJNYWl0aGlsaVwiLFxuICAgIFwibWFrXCI6IFwiTWFrYXNhclwiLFxuICAgIFwibWdoXCI6IFwiTWFraHV3YS1NZWV0dG9cIixcbiAgICBcImtkZVwiOiBcIk1ha29uZGVcIixcbiAgICBcIm1nXCI6IFwiTWFsYWdhc3lcIixcbiAgICBcIm1zXCI6IFwiTWFsYXlcIixcbiAgICBcIm1sXCI6IFwiTWFsYXlhbGFtXCIsXG4gICAgXCJtdFwiOiBcIk1hbHRlc2VcIixcbiAgICBcIm1uY1wiOiBcIk1hbmNodVwiLFxuICAgIFwibWRyXCI6IFwiTWFuZGFyaW5cIixcbiAgICBcIm1hblwiOiBcIk1hbmRpbmdvXCIsXG4gICAgXCJtbmlcIjogXCJNYW5pcHVyaVwiLFxuICAgIFwiZ3ZcIjogXCJNYW54XCIsXG4gICAgXCJtaVwiOiBcIk1hb3JpXCIsXG4gICAgXCJhcm5cIjogXCJNYXB1Y2hlXCIsXG4gICAgXCJtclwiOiBcIk1hcmF0aGlcIixcbiAgICBcImNobVwiOiBcIk1hcmlcIixcbiAgICBcIm1oXCI6IFwiTWFyc2hhbGxlc2VcIixcbiAgICBcIm13clwiOiBcIk1hcndhcmlcIixcbiAgICBcIm1hc1wiOiBcIk1hc2FpXCIsXG4gICAgXCJtem5cIjogXCJNYXphbmRlcmFuaVwiLFxuICAgIFwiYnl2XCI6IFwiTWVkdW1iYVwiLFxuICAgIFwibWVuXCI6IFwiTWVuZGVcIixcbiAgICBcIm13dlwiOiBcIk1lbnRhd2FpXCIsXG4gICAgXCJtZXJcIjogXCJNZXJ1XCIsXG4gICAgXCJtZ29cIjogXCJNZXRhXFx1MDJiY1wiLFxuICAgIFwiZXNfTVhcIjogXCJNZXhpY2FuIFNwYW5pc2hcIixcbiAgICBcIm1pY1wiOiBcIk1pY21hY1wiLFxuICAgIFwiZHVtXCI6IFwiTWlkZGxlIER1dGNoXCIsXG4gICAgXCJlbm1cIjogXCJNaWRkbGUgRW5nbGlzaFwiLFxuICAgIFwiZnJtXCI6IFwiTWlkZGxlIEZyZW5jaFwiLFxuICAgIFwiZ21oXCI6IFwiTWlkZGxlIEhpZ2ggR2VybWFuXCIsXG4gICAgXCJtZ2FcIjogXCJNaWRkbGUgSXJpc2hcIixcbiAgICBcIm5hblwiOiBcIk1pbiBOYW4gQ2hpbmVzZVwiLFxuICAgIFwibWluXCI6IFwiTWluYW5na2FiYXVcIixcbiAgICBcInhtZlwiOiBcIk1pbmdyZWxpYW5cIixcbiAgICBcIm13bFwiOiBcIk1pcmFuZGVzZVwiLFxuICAgIFwibHVzXCI6IFwiTWl6b1wiLFxuICAgIFwiYXJfMDAxXCI6IFwiTW9kZXJuIFN0YW5kYXJkIEFyYWJpY1wiLFxuICAgIFwibW9oXCI6IFwiTW9oYXdrXCIsXG4gICAgXCJtZGZcIjogXCJNb2tzaGFcIixcbiAgICBcInJvX01EXCI6IFwiTW9sZGF2aWFuXCIsXG4gICAgXCJsb2xcIjogXCJNb25nb1wiLFxuICAgIFwibW5cIjogXCJNb25nb2xpYW5cIixcbiAgICBcIm1mZVwiOiBcIk1vcmlzeWVuXCIsXG4gICAgXCJhcnlcIjogXCJNb3JvY2NhbiBBcmFiaWNcIixcbiAgICBcIm1vc1wiOiBcIk1vc3NpXCIsXG4gICAgXCJtdWxcIjogXCJNdWx0aXBsZSBMYW5ndWFnZXNcIixcbiAgICBcIm11YVwiOiBcIk11bmRhbmdcIixcbiAgICBcInR0dFwiOiBcIk11c2xpbSBUYXRcIixcbiAgICBcIm15ZVwiOiBcIk15ZW5lXCIsXG4gICAgXCJuYXFcIjogXCJOYW1hXCIsXG4gICAgXCJuYVwiOiBcIk5hdXJ1XCIsXG4gICAgXCJudlwiOiBcIk5hdmFqb1wiLFxuICAgIFwibmdcIjogXCJOZG9uZ2FcIixcbiAgICBcIm5hcFwiOiBcIk5lYXBvbGl0YW5cIixcbiAgICBcIm5lXCI6IFwiTmVwYWxpXCIsXG4gICAgXCJuZXdcIjogXCJOZXdhcmlcIixcbiAgICBcInNiYVwiOiBcIk5nYW1iYXlcIixcbiAgICBcIm5uaFwiOiBcIk5naWVtYm9vblwiLFxuICAgIFwiamdvXCI6IFwiTmdvbWJhXCIsXG4gICAgXCJ5cmxcIjogXCJOaGVlbmdhdHVcIixcbiAgICBcIm5pYVwiOiBcIk5pYXNcIixcbiAgICBcIm5pdVwiOiBcIk5pdWVhblwiLFxuICAgIFwienh4XCI6IFwiTm8gbGluZ3Vpc3RpYyBjb250ZW50XCIsXG4gICAgXCJub2dcIjogXCJOb2dhaVwiLFxuICAgIFwibmRcIjogXCJOb3J0aCBOZGViZWxlXCIsXG4gICAgXCJmcnJcIjogXCJOb3J0aGVybiBGcmlzaWFuXCIsXG4gICAgXCJzZVwiOiBcIk5vcnRoZXJuIFNhbWlcIixcbiAgICBcIm5zb1wiOiBcIk5vcnRoZXJuIFNvdGhvXCIsXG4gICAgXCJub1wiOiBcIk5vcndlZ2lhblwiLFxuICAgIFwibmJcIjogXCJOb3J3ZWdpYW4gQm9rbVxcdTAwZTVsXCIsXG4gICAgXCJublwiOiBcIk5vcndlZ2lhbiBOeW5vcnNrXCIsXG4gICAgXCJub3ZcIjogXCJOb3ZpYWxcIixcbiAgICBcIm51c1wiOiBcIk51ZXJcIixcbiAgICBcIm55bVwiOiBcIk55YW13ZXppXCIsXG4gICAgXCJueVwiOiBcIk55YW5qYVwiLFxuICAgIFwibnluXCI6IFwiTnlhbmtvbGVcIixcbiAgICBcInRvZ1wiOiBcIk55YXNhIFRvbmdhXCIsXG4gICAgXCJueW9cIjogXCJOeW9yb1wiLFxuICAgIFwibnppXCI6IFwiTnppbWFcIixcbiAgICBcIm5xb1wiOiBcIk5cXHUwMmJjS29cIixcbiAgICBcIm9jXCI6IFwiT2NjaXRhblwiLFxuICAgIFwib2pcIjogXCJPamlid2FcIixcbiAgICBcImFuZ1wiOiBcIk9sZCBFbmdsaXNoXCIsXG4gICAgXCJmcm9cIjogXCJPbGQgRnJlbmNoXCIsXG4gICAgXCJnb2hcIjogXCJPbGQgSGlnaCBHZXJtYW5cIixcbiAgICBcInNnYVwiOiBcIk9sZCBJcmlzaFwiLFxuICAgIFwibm9uXCI6IFwiT2xkIE5vcnNlXCIsXG4gICAgXCJwZW9cIjogXCJPbGQgUGVyc2lhblwiLFxuICAgIFwicHJvXCI6IFwiT2xkIFByb3ZlblxcdTAwZTdhbFwiLFxuICAgIFwib3JcIjogXCJPcml5YVwiLFxuICAgIFwib21cIjogXCJPcm9tb1wiLFxuICAgIFwib3NhXCI6IFwiT3NhZ2VcIixcbiAgICBcIm9zXCI6IFwiT3NzZXRpY1wiLFxuICAgIFwib3RhXCI6IFwiT3R0b21hbiBUdXJraXNoXCIsXG4gICAgXCJwYWxcIjogXCJQYWhsYXZpXCIsXG4gICAgXCJwZmxcIjogXCJQYWxhdGluZSBHZXJtYW5cIixcbiAgICBcInBhdVwiOiBcIlBhbGF1YW5cIixcbiAgICBcInBpXCI6IFwiUGFsaVwiLFxuICAgIFwicGRjXCI6IFwiUGVubnN5bHZhbmlhIEdlcm1hblwiLFxuICAgIFwiZmFcIjogXCJQZXJzaWFuXCIsXG4gICAgXCJwaG5cIjogXCJQaG9lbmljaWFuXCIsXG4gICAgXCJwY2RcIjogXCJQaWNhcmRcIixcbiAgICBcInBtc1wiOiBcIlBpZWRtb250ZXNlXCIsXG4gICAgXCJwZHRcIjogXCJQbGF1dGRpZXRzY2hcIixcbiAgICBcInBvblwiOiBcIlBvaG5wZWlhblwiLFxuICAgIFwicGxcIjogXCJQb2xpc2hcIixcbiAgICBcInBudFwiOiBcIlBvbnRpY1wiLFxuICAgIFwicHRcIjogXCJQb3J0dWd1ZXNlXCIsXG4gICAgXCJwcmdcIjogXCJQcnVzc2lhblwiLFxuICAgIFwicGFcIjogXCJQdW5qYWJpXCIsXG4gICAgXCJxdVwiOiBcIlF1ZWNodWFcIixcbiAgICBcInJvXCI6IFwiUm9tYW5pYW5cIixcbiAgICBcInJtXCI6IFwiUm9tYW5zaFwiLFxuICAgIFwicm9tXCI6IFwiUm9tYW55XCIsXG4gICAgXCJyb290XCI6IFwiUm9vdFwiLFxuICAgIFwicnVcIjogXCJSdXNzaWFuXCIsXG4gICAgXCJyd2tcIjogXCJSd2FcIixcbiAgICBcInNhaFwiOiBcIlNha2hhXCIsXG4gICAgXCJzYW1cIjogXCJTYW1hcml0YW4gQXJhbWFpY1wiLFxuICAgIFwic21cIjogXCJTYW1vYW5cIixcbiAgICBcInNjb1wiOiBcIlNjb3RzXCIsXG4gICAgXCJnZFwiOiBcIlNjb3R0aXNoIEdhZWxpY1wiLFxuICAgIFwic2x5XCI6IFwiU2VsYXlhclwiLFxuICAgIFwic2VsXCI6IFwiU2Vsa3VwXCIsXG4gICAgXCJzZWhcIjogXCJTZW5hXCIsXG4gICAgXCJzZWVcIjogXCJTZW5lY2FcIixcbiAgICBcInNyXCI6IFwiU2VyYmlhblwiLFxuICAgIFwic2hcIjogXCJTZXJiby1Dcm9hdGlhblwiLFxuICAgIFwic3JyXCI6IFwiU2VyZXJcIixcbiAgICBcInNlaVwiOiBcIlNlcmlcIixcbiAgICBcImtzYlwiOiBcIlNoYW1iYWxhXCIsXG4gICAgXCJzaG5cIjogXCJTaGFuXCIsXG4gICAgXCJzblwiOiBcIlNob25hXCIsXG4gICAgXCJpaVwiOiBcIlNpY2h1YW4gWWlcIixcbiAgICBcInNjblwiOiBcIlNpY2lsaWFuXCIsXG4gICAgXCJzaWRcIjogXCJTaWRhbW9cIixcbiAgICBcImJsYVwiOiBcIlNpa3Npa2FcIixcbiAgICBcInN6bFwiOiBcIlNpbGVzaWFuXCIsXG4gICAgXCJ6aF9IYW5zXCI6IFwiU2ltcGxpZmllZCBDaGluZXNlXCIsXG4gICAgXCJzZFwiOiBcIlNpbmRoaVwiLFxuICAgIFwic2lcIjogXCJTaW5oYWxhXCIsXG4gICAgXCJzbXNcIjogXCJTa29sdCBTYW1pXCIsXG4gICAgXCJkZW5cIjogXCJTbGF2ZVwiLFxuICAgIFwic2tcIjogXCJTbG92YWtcIixcbiAgICBcInNsXCI6IFwiU2xvdmVuaWFuXCIsXG4gICAgXCJ4b2dcIjogXCJTb2dhXCIsXG4gICAgXCJzb2dcIjogXCJTb2dkaWVuXCIsXG4gICAgXCJzb1wiOiBcIlNvbWFsaVwiLFxuICAgIFwic25rXCI6IFwiU29uaW5rZVwiLFxuICAgIFwiY2tiXCI6IFwiU29yYW5pIEt1cmRpc2hcIixcbiAgICBcImF6YlwiOiBcIlNvdXRoIEF6ZXJiYWlqYW5pXCIsXG4gICAgXCJuclwiOiBcIlNvdXRoIE5kZWJlbGVcIixcbiAgICBcImFsdFwiOiBcIlNvdXRoZXJuIEFsdGFpXCIsXG4gICAgXCJzbWFcIjogXCJTb3V0aGVybiBTYW1pXCIsXG4gICAgXCJzdFwiOiBcIlNvdXRoZXJuIFNvdGhvXCIsXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcbiAgICBcInNyblwiOiBcIlNyYW5hbiBUb25nb1wiLFxuICAgIFwiemdoXCI6IFwiU3RhbmRhcmQgTW9yb2NjYW4gVGFtYXppZ2h0XCIsXG4gICAgXCJzdWtcIjogXCJTdWt1bWFcIixcbiAgICBcInN1eFwiOiBcIlN1bWVyaWFuXCIsXG4gICAgXCJzdVwiOiBcIlN1bmRhbmVzZVwiLFxuICAgIFwic3VzXCI6IFwiU3VzdVwiLFxuICAgIFwic3dcIjogXCJTd2FoaWxpXCIsXG4gICAgXCJzc1wiOiBcIlN3YXRpXCIsXG4gICAgXCJzdlwiOiBcIlN3ZWRpc2hcIixcbiAgICBcImZyX0NIXCI6IFwiU3dpc3MgRnJlbmNoXCIsXG4gICAgXCJnc3dcIjogXCJTd2lzcyBHZXJtYW5cIixcbiAgICBcImRlX0NIXCI6IFwiU3dpc3MgSGlnaCBHZXJtYW5cIixcbiAgICBcInN5clwiOiBcIlN5cmlhY1wiLFxuICAgIFwic2hpXCI6IFwiVGFjaGVsaGl0XCIsXG4gICAgXCJ0bFwiOiBcIlRhZ2Fsb2dcIixcbiAgICBcInR5XCI6IFwiVGFoaXRpYW5cIixcbiAgICBcImRhdlwiOiBcIlRhaXRhXCIsXG4gICAgXCJ0Z1wiOiBcIlRhamlrXCIsXG4gICAgXCJ0bHlcIjogXCJUYWx5c2hcIixcbiAgICBcInRtaFwiOiBcIlRhbWFzaGVrXCIsXG4gICAgXCJ0YVwiOiBcIlRhbWlsXCIsXG4gICAgXCJ0cnZcIjogXCJUYXJva29cIixcbiAgICBcInR3cVwiOiBcIlRhc2F3YXFcIixcbiAgICBcInR0XCI6IFwiVGF0YXJcIixcbiAgICBcInRlXCI6IFwiVGVsdWd1XCIsXG4gICAgXCJ0ZXJcIjogXCJUZXJlbm9cIixcbiAgICBcInRlb1wiOiBcIlRlc29cIixcbiAgICBcInRldFwiOiBcIlRldHVtXCIsXG4gICAgXCJ0aFwiOiBcIlRoYWlcIixcbiAgICBcImJvXCI6IFwiVGliZXRhblwiLFxuICAgIFwidGlnXCI6IFwiVGlncmVcIixcbiAgICBcInRpXCI6IFwiVGlncmlueWFcIixcbiAgICBcInRlbVwiOiBcIlRpbW5lXCIsXG4gICAgXCJ0aXZcIjogXCJUaXZcIixcbiAgICBcInRsaVwiOiBcIlRsaW5naXRcIixcbiAgICBcInRwaVwiOiBcIlRvayBQaXNpblwiLFxuICAgIFwidGtsXCI6IFwiVG9rZWxhdVwiLFxuICAgIFwidG9cIjogXCJUb25nYW5cIixcbiAgICBcImZpdFwiOiBcIlRvcm5lZGFsZW4gRmlubmlzaFwiLFxuICAgIFwiemhfSGFudFwiOiBcIlRyYWRpdGlvbmFsIENoaW5lc2VcIixcbiAgICBcInRrclwiOiBcIlRzYWtodXJcIixcbiAgICBcInRzZFwiOiBcIlRzYWtvbmlhblwiLFxuICAgIFwidHNpXCI6IFwiVHNpbXNoaWFuXCIsXG4gICAgXCJ0c1wiOiBcIlRzb25nYVwiLFxuICAgIFwidG5cIjogXCJUc3dhbmFcIixcbiAgICBcInRjeVwiOiBcIlR1bHVcIixcbiAgICBcInR1bVwiOiBcIlR1bWJ1a2FcIixcbiAgICBcImFlYlwiOiBcIlR1bmlzaWFuIEFyYWJpY1wiLFxuICAgIFwidHJcIjogXCJUdXJraXNoXCIsXG4gICAgXCJ0a1wiOiBcIlR1cmttZW5cIixcbiAgICBcInRydVwiOiBcIlR1cm95b1wiLFxuICAgIFwidHZsXCI6IFwiVHV2YWx1XCIsXG4gICAgXCJ0eXZcIjogXCJUdXZpbmlhblwiLFxuICAgIFwidHdcIjogXCJUd2lcIixcbiAgICBcImtjZ1wiOiBcIlR5YXBcIixcbiAgICBcInVkbVwiOiBcIlVkbXVydFwiLFxuICAgIFwidWdhXCI6IFwiVWdhcml0aWNcIixcbiAgICBcInVrXCI6IFwiVWtyYWluaWFuXCIsXG4gICAgXCJ1bWJcIjogXCJVbWJ1bmR1XCIsXG4gICAgXCJ1bmRcIjogXCJVbmtub3duIExhbmd1YWdlXCIsXG4gICAgXCJoc2JcIjogXCJVcHBlciBTb3JiaWFuXCIsXG4gICAgXCJ1clwiOiBcIlVyZHVcIixcbiAgICBcInVnXCI6IFwiVXlnaHVyXCIsXG4gICAgXCJ1elwiOiBcIlV6YmVrXCIsXG4gICAgXCJ2YWlcIjogXCJWYWlcIixcbiAgICBcInZlXCI6IFwiVmVuZGFcIixcbiAgICBcInZlY1wiOiBcIlZlbmV0aWFuXCIsXG4gICAgXCJ2ZXBcIjogXCJWZXBzXCIsXG4gICAgXCJ2aVwiOiBcIlZpZXRuYW1lc2VcIixcbiAgICBcInZvXCI6IFwiVm9sYXBcXHUwMGZja1wiLFxuICAgIFwidnJvXCI6IFwiVlxcdTAwZjVyb1wiLFxuICAgIFwidm90XCI6IFwiVm90aWNcIixcbiAgICBcInZ1blwiOiBcIlZ1bmpvXCIsXG4gICAgXCJ3YVwiOiBcIldhbGxvb25cIixcbiAgICBcIndhZVwiOiBcIldhbHNlclwiLFxuICAgIFwid2FyXCI6IFwiV2FyYXlcIixcbiAgICBcIndhc1wiOiBcIldhc2hvXCIsXG4gICAgXCJndWNcIjogXCJXYXl1dVwiLFxuICAgIFwiY3lcIjogXCJXZWxzaFwiLFxuICAgIFwidmxzXCI6IFwiV2VzdCBGbGVtaXNoXCIsXG4gICAgXCJmeVwiOiBcIldlc3Rlcm4gRnJpc2lhblwiLFxuICAgIFwibXJqXCI6IFwiV2VzdGVybiBNYXJpXCIsXG4gICAgXCJ3YWxcIjogXCJXb2xheXR0YVwiLFxuICAgIFwid29cIjogXCJXb2xvZlwiLFxuICAgIFwid3V1XCI6IFwiV3UgQ2hpbmVzZVwiLFxuICAgIFwieGhcIjogXCJYaG9zYVwiLFxuICAgIFwiaHNuXCI6IFwiWGlhbmcgQ2hpbmVzZVwiLFxuICAgIFwieWF2XCI6IFwiWWFuZ2JlblwiLFxuICAgIFwieWFvXCI6IFwiWWFvXCIsXG4gICAgXCJ5YXBcIjogXCJZYXBlc2VcIixcbiAgICBcInliYlwiOiBcIlllbWJhXCIsXG4gICAgXCJ5aVwiOiBcIllpZGRpc2hcIixcbiAgICBcInlvXCI6IFwiWW9ydWJhXCIsXG4gICAgXCJ6YXBcIjogXCJaYXBvdGVjXCIsXG4gICAgXCJkamVcIjogXCJaYXJtYVwiLFxuICAgIFwienphXCI6IFwiWmF6YVwiLFxuICAgIFwiemVhXCI6IFwiWmVlbGFuZGljXCIsXG4gICAgXCJ6ZW5cIjogXCJaZW5hZ2FcIixcbiAgICBcInphXCI6IFwiWmh1YW5nXCIsXG4gICAgXCJnYnpcIjogXCJab3JvYXN0cmlhbiBEYXJpXCIsXG4gICAgXCJ6dVwiOiBcIlp1bHVcIixcbiAgICBcInp1blwiOiBcIlp1bmlcIlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5kYXRhLmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuICovXG5cbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4uL21haW4vc3RvcmUnO1xuXG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuQ29udGVudEFyZW5hLlV0aWxzID0ge1xuXG4gICAgY29udGVudFBhcnNlckZyb21TZXJ2ZXIoY29udGVudCkge1xuXG4gICAgICAgIGlmICggY29udGVudC5wYXJzZWQgKSByZXR1cm4gY29udGVudDtcblxuICAgICAgICBsZXQgc29ydCA9IHRydWU7XG5cbiAgICAgICAgaWYgKCBjb250ZW50LmV4dHJhRGF0YSl7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhjb250ZW50LmV4dHJhRGF0YSkuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAoW2tleSwgdmFsdWVdKSA9PiBjb250ZW50W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRlbnQudG91cm5hbWVudCA9IChjb250ZW50LnRvdXJuYW1lbnQpID8gQXJyYXkuaXNBcnJheShjb250ZW50LnRvdXJuYW1lbnQpPyBjb250ZW50LnRvdXJuYW1lbnQgOiBbY29udGVudC50b3VybmFtZW50XSA6IFtdO1xuICAgICAgICBjb250ZW50LnNwb3J0Q2F0ZWdvcnkgPSAoY29udGVudC5zcG9ydENhdGVnb3J5KSA/IEFycmF5LmlzQXJyYXkoY29udGVudC5zcG9ydENhdGVnb3J5KT8gY29udGVudC5zcG9ydENhdGVnb3J5IDogW2NvbnRlbnQuc3BvcnRDYXRlZ29yeV0gOiBbXTtcblxuICAgICAgICBpZiAoY29udGVudC5zZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodCl7XG4gICAgICAgICAgICBjb250ZW50LnJpZ2h0c1BhY2thZ2UuZm9yRWFjaCggKHJwKSA9PiB7XG4gICAgICAgICAgICAgICAgcnAuc2VsZWN0ZWRSaWdodHMgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnaXRlbXMnXTtcbiAgICAgICAgICAgICAgICBycC5leGNsdXNpdmUgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnZXhjbHVzaXZlJ107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50LmZpeHR1cmVzQnlTZWFzb24pe1xuICAgICAgICAgICAgY29udGVudC5zZWFzb25zLmZvckVhY2goIChzLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcy5maXh0dXJlcyA9IGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbltpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudC5sYXcpe1xuICAgICAgICAgICAgY29udGVudC5sYXcubGFiZWwgPSBjb250ZW50Lmxhdy5uYW1lO1xuICAgICAgICAgICAgY29udGVudC5sYXcudmFsdWUgPSBjb250ZW50Lmxhdy5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBjb250ZW50LnNhbGVzUGFja2FnZXMgKSB7XG4gICAgICAgICAgICBjb250ZW50LnNhbGVzUGFja2FnZXMuZm9yRWFjaCgoc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3Auc2FsZXNNZXRob2QpIHNwLnNhbGVzTWV0aG9kID0gc3Auc2FsZXNNZXRob2QubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoc3AuZXhjbHVkZWRDb3VudHJpZXMpIHNwLmV4Y2x1ZGVkVGVycml0b3JpZXMgPSBzcC5leGNsdWRlZENvdW50cmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZX19KVxuICAgICAgICAgICAgICAgIGlmIChzcC50ZXJyaXRvcmllcykgc3AudGVycml0b3JpZXMgPSBzcC50ZXJyaXRvcmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZX19KVxuICAgICAgICAgICAgICAgIGlmICghc3AudGVycml0b3JpZXMpIHNvcnQgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwLmluc3RhbGxtZW50cyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcC5pbnN0YWxsbWVudHMuZm9yRWFjaChpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkuZGF0ZSkgaS5kYXRlID0gbW9tZW50KGkuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSl7fVxuXG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHNvcnQpIGNvbnRlbnQuc2FsZXNQYWNrYWdlcy5zb3J0KHRoaXMuc29ydFNhbGVzUGFja2FnZXMpLnJldmVyc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50LmVuZERhdGUpIGNvbnRlbnQuZW5kRGF0ZSA9IG1vbWVudChjb250ZW50LmVuZERhdGUpO1xuICAgICAgICBpZiAoY29udGVudC5zdGFydERhdGUpIGNvbnRlbnQuc3RhcnREYXRlID0gbW9tZW50KGNvbnRlbnQuc3RhcnREYXRlKTtcbiAgICAgICAgaWYgKGNvbnRlbnQuc2lnbmF0dXJlKSBjb250ZW50LnNpZ25hdHVyZSA9IGhvc3R1cmwgKyBjb250ZW50LnNpZ25hdHVyZTtcblxuICAgICAgICBjb250ZW50LnN0ZXAgPSBOdW1iZXIoY29udGVudC5zdGVwKTtcbiAgICAgICAgY29udGVudC5jdXN0b21TZWFzb25zID0gY29udGVudC5zZWFzb25zLmZpbHRlcihzPT57XG4gICAgICAgICAgICByZXR1cm4gcy5leHRlcm5hbElkICYmIHMuZXh0ZXJuYWxJZC5zdGFydHNXaXRoKFwiY2E6XCIpXG4gICAgICAgIH0pLm1hcCgocyxpKT0+e1xuICAgICAgICAgICAgbGV0IHllYXJzO1xuICAgICAgICAgICAgaWYgKHMueWVhcil7XG4gICAgICAgICAgICAgICAgeWVhcnMgPSBzLnllYXIuc3BsaXQoXCIvXCIpO1xuICAgICAgICAgICAgICAgIHMuZnJvbSA9IHllYXJzLmxlbmd0aCA9PT0gMSA/IHllYXJzWzBdIDogMjAwMCArIE51bWJlcih5ZWFyc1swXSk7XG4gICAgICAgICAgICAgICAgcy50byA9IHllYXJzLmxlbmd0aCA9PT0gMSA/IG51bGwgOiAyMDAwICsgTnVtYmVyKHllYXJzWzFdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbil7XG4gICAgICAgICAgICAgICAgcy5maXh0dXJlcyA9IGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbltpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgY29udGVudC5zZWFzb25zID0gY29udGVudC5zZWFzb25zLm1hcChzPT57XG4gICAgICAgICAgICBpZiAoIHMuZXh0ZXJuYWxJZCAmJiBzLmV4dGVybmFsSWQuc3RhcnRzV2l0aChcImNhOlwiKSApe1xuICAgICAgICAgICAgICAgIHMuY3VzdG9tID0gdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29udGVudC5leHRyYURhdGEgJiYgY29udGVudC5leHRyYURhdGEuc2Vhc29uRHVyYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tU2Vhc29uRHVyID0gY29udGVudC5leHRyYURhdGEuc2Vhc29uRHVyYXRpb25zW3MuZXh0ZXJuYWxJZF07XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VzdG9tU2Vhc29uRHVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuY3VzdG9tU3RhcnREYXRlID0gY3VzdG9tU2Vhc29uRHVyLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgcy5jdXN0b21FbmREYXRlID0gY3VzdG9tU2Vhc29uRHVyLmVuZERhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcztcblxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdXNlciA9IHN0b3JlLmdldFN0YXRlKCkudXNlcjtcblxuICAgICAgICBpZiAoIWNvbnRlbnQuc2lnbmF0dXJlTmFtZSkgY29udGVudC5zaWduYXR1cmVOYW1lID0gdXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXIubGFzdE5hbWU7XG4gICAgICAgIGlmICghY29udGVudC5zaWduYXR1cmVQb3NpdGlvbikgY29udGVudC5zaWduYXR1cmVQb3NpdGlvbiA9IHVzZXIudGl0bGU7XG5cbiAgICAgICAgY29udGVudC5wYXJzZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0sXG5cbiAgICBmaWx0ZXJDb21wYW55SW5mbyhkYXRhKXtcblxuICAgICAgICBsZXQgY29tcGFueSA9IHt9O1xuXG4gICAgICAgIGNvbXBhbnkubGVnYWxOYW1lID0gZGF0YS5sZWdhbE5hbWU7XG4gICAgICAgIGNvbXBhbnkucmVnaXN0cmF0aW9uTnVtYmVyID0gZGF0YS5yZWdpc3RyYXRpb25OdW1iZXI7XG4gICAgICAgIGNvbXBhbnkudmF0ID0gZGF0YS52YXQ7XG4gICAgICAgIGNvbXBhbnkuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcbiAgICAgICAgY29tcGFueS5hZGRyZXNzMiA9IGRhdGEuYWRkcmVzczI7XG4gICAgICAgIGNvbXBhbnkuY2l0eSA9IGRhdGEuY2l0eTtcbiAgICAgICAgY29tcGFueS56aXAgPSBkYXRhLnppcDtcbiAgICAgICAgY29tcGFueS5jb3VudHJ5ID0gZGF0YS5jb3VudHJ5O1xuXG4gICAgICAgIHJldHVybiBjb21wYW55O1xuICAgIH0sXG5cbiAgICBzb3J0U2FsZXNQYWNrYWdlcyAoYSwgYil7XG4gICAgICAgIGxldCBjID0gKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoYSA+IGIpID8gMSA6ICgoYiA+IGEpID8gLTEgOiAwKVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYyhhLnRlcnJpdG9yaWVzLmxlbmd0aCwgYi50ZXJyaXRvcmllcy5sZW5ndGgpIHx8IGMoYi5uYW1lLCBhLm5hbWUpO1xuICAgIH0sXG5cblxuXG4gICAgaXNBUElBdmFpbGFibGUoKSB7XG4gICAgICAgIC8vIENoZWNrIGZvciB0aGUgdmFyaW91cyBGaWxlIEFQSSBzdXBwb3J0LlxuICAgICAgICBpZiAod2luZG93LkZpbGUgJiYgd2luZG93LkZpbGVSZWFkZXIgJiYgd2luZG93LkZpbGVMaXN0ICYmIHdpbmRvdy5CbG9iKSB7XG4gICAgICAgICAgICAvLyBHcmVhdCBzdWNjZXNzISBBbGwgdGhlIEZpbGUgQVBJcyBhcmUgc3VwcG9ydGVkLlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzb3VyY2U6IEZpbGUgQVBJIGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9jYW5pdXNlLmNvbS8jZmVhdD1maWxlYXBpXG4gICAgICAgICAgICAvLyBzb3VyY2U6IDxvdXRwdXQ+IGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9odG1sNWRvY3Rvci5jb20vdGhlLW91dHB1dC1lbGVtZW50L1xuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignVGhlIEhUTUw1IEFQSXMgdXNlZCBpbiB0aGlzIGZvcm0gYXJlIG9ubHkgYXZhaWxhYmxlIGluIHRoZSBmb2xsb3dpbmcgYnJvd3NlcnM6PGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyA2LjAgRmlsZSBBUEkgJiAxMy4wIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBHb29nbGUgQ2hyb21lOiAxMy4wIG9yIGxhdGVyPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyAzLjYgRmlsZSBBUEkgJiA2LjAgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIE1vemlsbGEgRmlyZWZveDogNi4wIG9yIGxhdGVyPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyAxMC4wIEZpbGUgQVBJICYgMTAuMCA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gSW50ZXJuZXQgRXhwbG9yZXI6IE5vdCBzdXBwb3J0ZWQgKHBhcnRpYWwgc3VwcG9ydCBleHBlY3RlZCBpbiAxMC4wKTxiciAvPicpO1xuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDUuMSA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gU2FmYXJpOiBOb3Qgc3VwcG9ydGVkPGJyIC8+Jyk7XG4gICAgICAgICAgICAvLyA/IEZpbGUgQVBJICYgOS4yIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBPcGVyYTogTm90IHN1cHBvcnRlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhZGRPcmRpbmFsKG4pIHtcbiAgICAgICAgdmFyIHN0ciA9IG4udG9TdHJpbmcoKS5zbGljZSgtMSksXG4gICAgICAgICAgICBvcmQgPSAnJztcbiAgICAgICAgc3dpdGNoIChzdHIpIHtcbiAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICdzdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAnbmQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgb3JkID0gJ3JkJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzQnOlxuICAgICAgICAgICAgY2FzZSAnNSc6XG4gICAgICAgICAgICBjYXNlICc2JzpcbiAgICAgICAgICAgIGNhc2UgJzcnOlxuICAgICAgICAgICAgY2FzZSAnOCc6XG4gICAgICAgICAgICBjYXNlICc5JzpcbiAgICAgICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICd0aCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG4gKyBvcmQ7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSBhcnJcbiAgICAgKiBAcGFyYW0gcHJvcFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0SW5kZXggKHZhbHVlLCBhcnIsIHByb3ApIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoYXJyW2ldW3Byb3BdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTsgLy90byBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdGhlIHZhbHVlIGRvZXNuJ3QgZXhpc3RcbiAgICB9LFxuXG4gICAgZ2V0V2Vic2l0ZVVSbChzdHIpIHtcbiAgICAgICAgaWYgKHN0ci5pbmNsdWRlcygnaHR0cDovLycpIHx8IHN0ci5pbmNsdWRlcygnaHR0cHM6Ly8nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0clxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdodHRwOi8vJytzdHJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0xpc3RpbmdQdWJsaXNoZWQoc3RhdHVzKSB7XG4gICAgICAgIHJldHVybiAoc3RhdHVzICYmIChzdGF0dXMubmFtZSA9PT0gXCJBUFBST1ZFRFwiIHx8IHN0YXR1cy5uYW1lID09PSBcIlBFTkRJTkdcIiB8fCBzdGF0dXMubmFtZSA9PT0gXCJFRElURURcIikpO1xuICAgIH1cblxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS51dGlscy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQge2xhbmd1YWdlc30gZnJvbSBcIi4uLy4uLy4uL2RhdGEvbGFuZ3VhZ2VzXCI7XG5cbmV4cG9ydCBjb25zdCBhbGxWYWx1ZSA9IHtcbiAgICB2YWx1ZTogJ2FsbCcsXG4gICAgbGFiZWw6ICdBbGwgbG9jYWwgbGFuZ3VhZ2VzJ1xufTtcblxuY2xhc3MgTGFuZ3VhZ2VTZWxlY3RvciBleHRlbmRzICBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcblxuICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb24gPSBwcm9wcy52YWx1ZSA/IFsuLi5wcm9wcy52YWx1ZV0gOiBbXTtcbiAgICB9XG5cbiAgICBoYW5kbGVPbkNoYW5nZSA9IChzZWxlY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgaGFzQWxsID0gISFzZWxlY3Rpb24uZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gJ2FsbCcpO1xuICAgICAgICBjb25zdCBoYXNBbGxQcmV2ID0gISF0aGlzLnByZXZTZWxlY3Rpb24uZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gJ2FsbCcpO1xuICAgICAgICAvL2NvbnN0IGl0ZW1zQ2hhbmdlZCA9IHNlbGVjdGlvbi5sZW5ndGggIT09IHRoaXMucHJldlNlbGVjdGlvbi5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGhhc0FsbCkge1xuICAgICAgICAgICAgaWYgKGhhc0FsbFByZXYpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgQWxsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gc2VsZWN0aW9uLmZpbHRlcihpdGVtID0+IGl0ZW0udmFsdWUgIT09ICdhbGwnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIEFsbCBhbmQgcmVtb3ZlIG90aGVyc1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IFthbGxWYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb24gPSBzZWxlY3Rpb247XG5cbiAgICAgICAgb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHsgdmFsdWUsIG11bHRpID0gdHJ1ZSwgcGxhY2Vob2xkZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHJlYWxMYW5ndWFnZXMgPSBPYmplY3QudmFsdWVzKGxhbmd1YWdlcykubWFwKChpLCBrKT0+KHt2YWx1ZSA6IGkubmFtZSAsIGxhYmVsIDogaS5uYW1lIH0pKTtcbiAgICAgICAgY29uc3QgYWxsTGFuZ3VhZ2VzID0gWyBhbGxWYWx1ZSwgLi4ucmVhbExhbmd1YWdlcyBdO1xuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICBuYW1lPVwiZm9ybS1maWVsZC1uYW1lXCJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgbXVsdGk9e211bHRpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXthbGxMYW5ndWFnZXN9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgeyBMYW5ndWFnZVNlbGVjdG9yIH07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9MYW5ndWFnZVNlbGVjdG9yLmpzIiwiZXhwb3J0IGNvbnN0IGNvbW1vblR5cGVzPSB7XG4gICAgR0VUX0RFRkFVTFRfUklHSFRTX1BBQ0tBR0U6J0dFVF9ERUZBVUxUX1JJR0hUU19QQUNLQUdFJyxcbiAgICBTRVRfVE9UQUxfQ09VTlRSSUVTOiAnU0VUX1RPVEFMX0NPVU5UUklFUycsXG4gICAgU0VUX1RFU1RfU1RBR0VfTU9ERTogJ1NFVF9URVNUX1NUQUdFX01PREUnXG59O1xuXG5jb25zdCBjb21tb25EZWZhdWx0ID0ge1xuICAgIHRvdGFsQ291bnRyaWVzIDogMjQwLFxuICAgIHRlc3RTdGFnZU1vZGU6IGZhbHNlXG59O1xuXG5leHBvcnQgY29uc3QgY29tbW9uID0gKHN0YXRlID0gY29tbW9uRGVmYXVsdCwgYWN0aW9uKSA9PiB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgY29tbW9uVHlwZXMuR0VUX0RFRkFVTFRfUklHSFRTX1BBQ0tBR0U6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtkZWZhdWx0UmlnaHRzUGFja2FnZTogYWN0aW9uLmRlZmF1bHRSaWdodHNQYWNrYWdlfSk7XG4gICAgICAgIGNhc2UgY29tbW9uVHlwZXMuU0VUX1RPVEFMX0NPVU5UUklFUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge3RvdGFsQ291bnRyaWVzOiBhY3Rpb24udG90YWxDb3VudHJpZXN9KTtcbiAgICAgICAgY2FzZSBjb21tb25UeXBlcy5TRVRfVEVTVF9TVEFHRV9NT0RFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7dGVzdFN0YWdlTW9kZTogYWN0aW9uLnRlc3RTdGFnZU1vZGV9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vcmVkdWNlcnMvY29tbW9uLmpzIiwiZXhwb3J0IGNvbnN0IHVzZXJUeXBlcz0ge1xuICAgIExPR09VVDonTE9HT1VUJyxcbiAgICBMT0dJTjonTE9HSU4nLFxuICAgIFBST0ZJTEU6J1BST0ZJTEUnLFxuICAgIExPQURfVVNFUl9EQVRBOidMT0FEX1VTRVJfREFUQScsXG59O1xuXG5jb25zdCBkZWZhdWx0VXNlciA9IHtcbiAgICBwcm9maWxlIDogXCJTRUxMRVJcIlxuXG59O1xuXG5leHBvcnQgY29uc3QgdXNlciA9IChzdGF0ZSA9IGRlZmF1bHRVc2VyLCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSB1c2VyVHlwZXMuTE9HT1VUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBkZWZhdWx0VXNlcik7XG4gICAgICAgIGNhc2UgdXNlclR5cGVzLkxPR0lOOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZW1haWw6IGFjdGlvbi5lbWFpbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgdXNlclR5cGVzLlBST0ZJTEU6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBwcm9maWxlOiBhY3Rpb24ucHJvZmlsZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgdXNlclR5cGVzLkxPQURfVVNFUl9EQVRBOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7Li4uYWN0aW9uLnVzZXJ9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vcmVkdWNlcnMvdXNlci5qcyIsImV4cG9ydCBjb25zdCB2YWxpZGF0aW9uVHlwZXMgPSB7XG4gICAgRU5BQkxFX1ZBTElEQVRJT046ICdFTkFCTEVfVkFMSURBVElPTicsXG4gICAgRElTQUJMRV9WQUxJREFUSU9OOiAnRElTQUJMRV9WQUxJREFUSU9OJ1xufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRpb24gPSAoc3RhdGUgPSBmYWxzZSwgYWN0aW9uKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG4gICAgICAgIGNhc2UgdmFsaWRhdGlvblR5cGVzLkVOQUJMRV9WQUxJREFUSU9OOlxuICAgICAgICAgICAgcmV0dXJuIHRydWVcblxuICAgICAgICBjYXNlIHZhbGlkYXRpb25UeXBlcy5ESVNBQkxFX1ZBTElEQVRJT046XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3JlZHVjZXJzL3ZhbGlkYXRpb24uanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnXG5pbXBvcnQge2kxOG5TdGF0ZX0gZnJvbSBcInJlZHV4LWkxOG5cIjtcblxuaW1wb3J0IHtjb250ZW50fSBmcm9tIFwiLi4vc2VsbC9yZWR1Y2Vycy9jb250ZW50XCI7XG5pbXBvcnQge3NlbGVjdG9yfSBmcm9tIFwiLi4vc2VsbC9yZWR1Y2Vycy9zZWxlY3RvclwiO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gXCIuLi9idXkvcmVkdWNlcnMvZmlsdGVyXCI7XG5pbXBvcnQge21hcmtldHBsYWNlfSBmcm9tIFwiLi4vYnV5L3JlZHVjZXJzL21hcmtldHBsYWNlXCI7XG5pbXBvcnQge21hbmFnZX0gZnJvbSBcIi4uL21hbmFnZS9yZWR1Y2Vycy9tYW5hZ2VcIjtcbmltcG9ydCB7dXNlcn0gZnJvbSBcIi4vcmVkdWNlcnMvdXNlclwiO1xuaW1wb3J0IHtjb21tb259IGZyb20gXCIuL3JlZHVjZXJzL2NvbW1vblwiO1xuaW1wb3J0IHt2YWxpZGF0aW9ufSBmcm9tIFwiLi9yZWR1Y2Vycy92YWxpZGF0aW9uXCI7XG5cbmNvbnN0IHJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBjb250ZW50LFxuICAgIHNlbGVjdG9yLFxuICAgIG1hcmtldHBsYWNlLFxuICAgIGZpbHRlcixcbiAgICBtYW5hZ2UsXG4gICAgdXNlcixcbiAgICBjb21tb24sXG4gICAgdmFsaWRhdGlvbixcbiAgICBpMThuU3RhdGVcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyZWR1Y2Vycyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9zdG9yZS5qcyIsIlxuZXhwb3J0IGNvbnN0IG1hbmFnZVR5cGVzPSB7XG4gICAgVEVTVDonVEVTVCcsXG59O1xuXG5leHBvcnQgY29uc3QgbWFuYWdlID0gKHN0YXRlID0ge1xuICAgIHRlc3RJdGVtOiBcIm1hbmFnZVJlZHVjZXJcIlxuXG59LCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtYW5hZ2VUeXBlcy5URVNUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgdGVzdDogYWN0aW9uLnRleHQsXG4gICAgICAgICAgICAgICAgaWQgOiBhY3Rpb24uaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3JlZHVjZXJzL21hbmFnZS5qcyIsImltcG9ydCBtYXggZnJvbSAnbG9kYXNoL21heCc7XG5pbXBvcnQgeyBhbGxWYWx1ZSB9IGZyb20gJy4vLi4vLi4vbWFpbi9jb21wb25lbnRzL0xhbmd1YWdlU2VsZWN0b3InO1xuXG5leHBvcnQgY29uc3QgY29udGVudFR5cGU9IHtcbiAgICBDT05URU5UX0lOSVQ6J0NPTlRFTlRfSU5JVCcsXG4gICAgU1RFUF9DSEFOR0VfUkVTRVQgOiAnU1RFUF9DSEFOR0VfUkVTRVQnLFxuICAgIEdPX1RPX1NURVA6ICdHT19UT19TVEVQJyxcbiAgICBHT19UT19ORVhUX1NURVA6ICdHT19UT19ORVhUX1NURVAnLFxuICAgIEdPX1RPX1BSRVZJT1VTX1NURVA6ICdHT19UT19QUkVWSU9VU19TVEVQJyxcbiAgICBBRERfTkVXIDogJ0FERF9ORVcnLFxuICAgIFJFTU9WRV9ORVcgOiAnUkVNT1ZFX05FVycsXG4gICAgU1VQRVJfUklHSFRTX1VQREFURUQ6ICdTVVBFUl9SSUdIVFNfVVBEQVRFRCcsXG4gICAgVVBEQVRFX0NPTlRFTlRfVkFMVUUgOiAnVVBEQVRFX0NPTlRFTlRfVkFMVUUnLFxuICAgIFNFTEVDVF9UT1VSTkFNRU5UIDogJ1NFTEVDVF9UT1VSTkFNRU5UJyxcbiAgICBSRU1PVkVfRlJPTV9NVUxUSVBMRSA6ICdSRU1PVkVfRlJPTV9NVUxUSVBMRScsXG4gICAgVVBEQVRFX0ZST01fTVVMVElQTEUgOiAnVVBEQVRFX0ZST01fTVVMVElQTEUnLFxuICAgIEFQUExZX1NFTEVDVElPTiA6ICdBUFBMWV9TRUxFQ1RJT04nLFxuICAgIFVQREFURV9TQUxFU19QQUNLQUdFUyA6ICdVUERBVEVfU0FMRVNfUEFDS0FHRVMnLFxuICAgIFVQREFURV9BVFRBQ0hNRU5UUyA6ICdVUERBVEVfQVRUQUNITUVOVFMnLFxuICAgIFVQREFURV9BTk5FWCA6ICdVUERBVEVfQU5ORVgnLFxuICAgIEFERF9TQUxFU19QQUNLQUdFUyA6ICdBRERfU0FMRVNfUEFDS0FHRVMnLFxuICAgIFJFU0VUIDogJ1JFU0VUJyxcbiAgICBBTExfRVBJU09ERV9VUERBVEVfRkxBRzogJ1VQREFURV9BTExfRVBJU09ERVNfRkxBRydcbn07XG5cbmV4cG9ydCBjb25zdCBFbXB0eUxpc3RpbmcgPSB7XG4gICAgc3RlcDogMSxcbiAgICBtYXhTdGVwOiAxLFxuICAgIHJpZ2h0c1BhY2thZ2UgOiBbXSxcbiAgICB0b3VybmFtZW50IDogW10sXG4gICAgc3BvcnRDYXRlZ29yeSA6IFtdLFxuICAgIHNwb3J0cyA6IFtdLFxuICAgIHNlYXNvbnM6IFtdLFxuICAgIGN1c3RvbVNlYXNvbnMgOiBbXSxcbiAgICBzYWxlc1BhY2thZ2VzIDogW10sXG4gICAgY3VzdG9tVG91cm5hbWVudCA6IG51bGwsXG4gICAgY3VzdG9tQ2F0ZWdvcnkgOiBudWxsLFxuICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICBwcm9ncmFtRGVzY3JpcHRpb24gOiBudWxsLFxuICAgIGF0dGFjaG1lbnRzIDogW10sXG4gICAgYW5uZXggOiBbXSxcbiAgICBlbmREYXRlTGltaXQgOiAzMCxcbiAgICBjb3VudGVyIDogMCxcbiAgICBjdXJyZW5jeSA6IFwiRVVSXCIsXG4gICAgc3RhcnREYXRlTW9kZSA6IFwiTElDRU5TRVwiLFxuICAgIHN0ZXBDaGFuZ2UgOiBmYWxzZSxcbiAgICB2YXQgOiBcIm5vXCIsXG4gICAgTkFfSU5QVVQgOiA5MCxcbiAgICBITF9JTlBVVCA6IDUsXG4gICAgTElDRU5TRURfTEFOR1VBR0VTIDogW2FsbFZhbHVlXSxcbiAgICBQUk9HUkFNX0xBTkdVQUdFIDogW10sXG4gICAgUFJPR1JBTV9TVUJUSVRMRVMgOiBbXSxcbiAgICBQUk9HUkFNX1NDUklQVCA6IFtdLFxuICAgIEVESVRfUFJPR1JBTV9ERVNDUklQVElPTl9PUFRJT05BTDogdHJ1ZSxcbiAgICB3ZWJzaXRlIDogbnVsbCxcbiAgICBsYXcgOiBcIkVuZ2xpc2hcIixcbiAgICBpbWFnZSA6IG51bGwsXG4gICAgaW1hZ2VCYXNlNjQgOiBudWxsLFxuICAgIHRlbXBEYXRhOiB7fVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbnRlbnQgPSAoc3RhdGUgPSBFbXB0eUxpc3RpbmcsIGFjdGlvbikgPT4ge1xuXG4gICAgbGV0IG5ld1N0YXRlID0ge307XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuUkVTRVQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIEVtcHR5TGlzdGluZyk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQ09OVEVOVF9JTklUOlxuICAgICAgICAgICAgYWN0aW9uLmNvbnRlbnQuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uY29udGVudCwge21heFN0ZXA6IG1heChbYWN0aW9uLmNvbnRlbnQubWF4U3RlcCwgc3RhdGUubWF4U3RlcF0pfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQUxMX0VQSVNPREVfVVBEQVRFX0ZMQUc6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtFRElUX1BST0dSQU1fREVTQ1JJUFRJT05fT1BUSU9OQUw6IGFjdGlvbi5wYXlsb2FkfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuR09fVE9fTkVYVF9TVEVQOlxuICAgICAgICAgICAgY29uc3QgbmV3U3RlcCA9IHN0YXRlLnN0ZXAgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3RlcDogbmV3U3RlcCxcbiAgICAgICAgICAgICAgICBzdGVwQ2hhbmdlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heFN0ZXA6IG1heChbbmV3U3RlcCwgc3RhdGUubWF4U3RlcF0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5HT19UT19TVEVQOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3RlcDogYWN0aW9uLnN0ZXAsXG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgbWF4U3RlcDogbWF4KFthY3Rpb24uc3RlcCwgc3RhdGUubWF4U3RlcF0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5TVEVQX0NIQU5HRV9SRVNFVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHN0ZXBDaGFuZ2UgOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuR09fVE9fUFJFVklPVVNfU1RFUDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHN0ZXA6IHN0YXRlLnN0ZXAgLTEsXG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZSA6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlJFTU9WRV9ORVc6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0uc3BsaWNlKGFjdGlvbi5pbmRleCwgMSk7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFERF9ORVc6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1bYWN0aW9uLmluZGV4XSA9IHtcbiAgICAgICAgICAgICAgICBjdXN0b20gOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwiXCJcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLmNsZWFuICl7XG4gICAgICAgICAgICAgICAgYWN0aW9uLmNsZWFuLmZvckVhY2goKHNlbGVjdG9yVHlwZSk9PntcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVbc2VsZWN0b3JUeXBlXSA9ICQuaXNBcnJheShzdGF0ZVtzZWxlY3RvclR5cGVdKSA/IFtdIDogbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX0NPTlRFTlRfVkFMVUU6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLmtleV0gPSBhY3Rpb24udmFsdWU7XG4gICAgICAgICAgICBuZXdTdGF0ZS5saXN0aW5nRWRpdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuU0VMRUNUX1RPVVJOQU1FTlQ6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGUudG91cm5hbWVudCA9IFthY3Rpb24udG91cm5hbWVudF07XG4gICAgICAgICAgICBuZXdTdGF0ZS5zcG9ydHMgPSAoYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnQgKSA/IFthY3Rpb24udG91cm5hbWVudC5zcG9ydF0gOiBbXTtcbiAgICAgICAgICAgIG5ld1N0YXRlLnNwb3J0Q2F0ZWdvcnkgPSBbYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnRDYXRlZ29yeV07XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFQUExZX1NFTEVDVElPTjpcblxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcblxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbXMgPSBBcnJheS5mcm9tKCBhY3Rpb24uc2VsZWN0ZWRJdGVtcy52YWx1ZXMoKSApO1xuXG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm11bHRpcGxlICl7XG4gICAgICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBzZWxlY3RlZEl0ZW1zO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXVthY3Rpb24uaW5kZXhdID0gc2VsZWN0ZWRJdGVtc1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24uY2xlYW4gKXtcbiAgICAgICAgICAgICAgICBhY3Rpb24uY2xlYW4uZm9yRWFjaCgoc2VsZWN0b3JUeXBlKT0+e1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZVtzZWxlY3RvclR5cGVdID0gJC5pc0FycmF5KHN0YXRlW3NlbGVjdG9yVHlwZV0pID8gW10gOiBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5SRU1PVkVfRlJPTV9NVUxUSVBMRTpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXS5zcGxpY2UoYWN0aW9uLmluZGV4LDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX0ZST01fTVVMVElQTEU6XG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1bYWN0aW9uLmluZGV4XVthY3Rpb24ua2V5XSA9IGFjdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlNVUEVSX1JJR0hUU19VUERBVEVEOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgcmlnaHRzUGFja2FnZSA6IEFycmF5LmZyb20oYWN0aW9uLnJpZ2h0c1BhY2thZ2UudmFsdWVzKCkpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5VUERBVEVfU0FMRVNfUEFDS0FHRVM6XG5cbiAgICAgICAgICAgIGxldCBzYWxlc1BhY2thZ2VzID0gWy4uLnN0YXRlLnNhbGVzUGFja2FnZXNdO1xuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZVwiICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBzYWxlc1BhY2thZ2VzLmxlbmd0aCA+PSAxICkge1xuICAgICAgICAgICAgICAgICAgICBzYWxlc1BhY2thZ2VzLnNwbGljZShhY3Rpb24uaW5kZXgsMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlQWxsXCIgKSB7XG4gICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcyA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInNhdmVcIiApIHNhbGVzUGFja2FnZXNbYWN0aW9uLmluZGV4XSA9IGFjdGlvbi5zYWxlc1BhY2thZ2U7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMgOiBzYWxlc1BhY2thZ2VzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9BVFRBQ0hNRU5UUzpcblxuICAgICAgICAgICAgbGV0IGF0dGFjaG1lbnRzID0gWy4uLnN0YXRlLmF0dGFjaG1lbnRzXTtcblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVcIiApIHtcblxuICAgICAgICAgICAgICAgIGlmICggYXR0YWNobWVudHMubGVuZ3RoID49IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRzLnNwbGljZShhY3Rpb24uaW5kZXgsMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlQWxsXCIgKSB7XG4gICAgICAgICAgICAgICAgYXR0YWNobWVudHMgPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJzYXZlXCIgKSBhdHRhY2htZW50c1thY3Rpb24uaW5kZXhdID0gYWN0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50cyA6IGF0dGFjaG1lbnRzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9BTk5FWDpcblxuICAgICAgICAgICAgbGV0IGFubmV4ID0gWy4uLnN0YXRlLmFubmV4XTtcblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVcIiApIHtcblxuICAgICAgICAgICAgICAgIGlmICggYW5uZXgubGVuZ3RoID49IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGFubmV4LnNwbGljZShhY3Rpb24uaW5kZXgsMSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlQWxsXCIgKSB7XG4gICAgICAgICAgICAgICAgYW5uZXggPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJzYXZlXCIgKSBhbm5leFthY3Rpb24uaW5kZXhdID0gYWN0aW9uLnZhbHVlO1xuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBhbm5leCA6IGFubmV4XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFERF9TQUxFU19QQUNLQUdFUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMgOiBbLi4uc3RhdGUuc2FsZXNQYWNrYWdlcywuLi5hY3Rpb24uc2FsZXNQYWNrYWdlc11cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL2NvbnRlbnQuanMiLCJleHBvcnQgY29uc3Qgc2VsZWN0b3JUeXBlPSB7XG4gICAgVEVTVDonVEVTVCcsXG4gICAgT1BFTl9TRUxFQ1RPUjogJ09QRU5fU0VMRUNUT1InLFxuICAgIENMT1NFX1NFTEVDVE9SIDogJ0NMT1NFX1NFTEVDVE9SJyxcbiAgICBBUFBMWV9TRUxFQ1RJT04gOiAnQVBQTFlfU0VMRUNUSU9OJ1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdG9yID0gKHN0YXRlID0ge1xuICAgIHR5cGU6IFwic3BvcnRcIixcbiAgICBvcGVuIDogZmFsc2UsXG4gICAgc2VsZWN0b3JJdGVtczogW10sXG4gICAgcG9wdWxhckl0ZW1zOiBbXVxuXG59LCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBzZWxlY3RvclR5cGUuVEVTVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIG9wZW46IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHNlbGVjdG9yVHlwZS5PUEVOX1NFTEVDVE9SOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBhY3Rpb24uc2VsZWN0b3JUeXBlLFxuICAgICAgICAgICAgICAgIG9wZW4gOiB0cnVlLFxuICAgICAgICAgICAgICAgIGluZGV4IDogYWN0aW9uLmluZGV4LFxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IGFjdGlvbi5zZWxlY3Rvckl0ZW1zLFxuICAgICAgICAgICAgICAgIHBvcHVsYXJJdGVtczogYWN0aW9uLnBvcHVsYXJJdGVtcyxcbiAgICAgICAgICAgICAgICBhY3RpdmVGaWx0ZXIgOiBhY3Rpb24uYWN0aXZlRmlsdGVyLFxuICAgICAgICAgICAgICAgIG11bHRpcGxlIDogYWN0aW9uLm11bHRpcGxlLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBhY3Rpb24uZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgc2hvd05ld1Nwb3J0IDogYWN0aW9uLnNob3dOZXdTcG9ydCxcbiAgICAgICAgICAgICAgICBzaG93TmV3VG91cm5hbWVudCA6IGFjdGlvbi5zaG93TmV3VG91cm5hbWVudCxcbiAgICAgICAgICAgICAgICBzaG93TmV3Q2F0ZWdvcnkgOiBhY3Rpb24uc2hvd05ld0NhdGVnb3J5LFxuICAgICAgICAgICAgICAgIHNob3dOZXdTZWFzb24gOiBhY3Rpb24uc2hvd05ld1NlYXNvbixcbiAgICAgICAgICAgICAgICBzaG93QWxsQ291bnRyaWVzOiBhY3Rpb24uc2hvd0FsbENvdW50cmllcyxcbiAgICAgICAgICAgICAgICBjbGVhbiA6IGFjdGlvbi5jbGVhbixcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zOiBhY3Rpb24uc2VsZWN0ZWRJdGVtc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLkNMT1NFX1NFTEVDVE9SOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcIlwiLFxuICAgICAgICAgICAgICAgIG9wZW4gOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBbXSxcbiAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBzZWxlY3RvclR5cGUuQVBQTFlfU0VMRUNUSU9OIDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogXCJcIixcbiAgICAgICAgICAgICAgICBvcGVuIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogW10sXG4gICAgICAgICAgICAgICAgcG9wdWxhckl0ZW1zOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL3NlbGVjdG9yLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==