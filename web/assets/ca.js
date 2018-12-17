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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL21heC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvZGF0YS9sYW5ndWFnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmNvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0xhbmd1YWdlU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy91c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3JlZHVjZXJzL21hbmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL2NvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJsYW5ndWFnZXMiLCJmaWx0ZXJUeXBlcyIsIkFERF9SSUdIVCIsIlJFTU9WRV9SSUdIVCIsIlVQREFURV9DT1VOVFJJRVMiLCJVUERBVEVfRVhDTFVTSVZFIiwiVVBEQVRFX0lOQ0xVREVEX0NPVU5UUklFUyIsIlVQREFURV9TUE9SVCIsIlVQREFURV9FVkVOVCIsIkNMRUFSIiwiQ0xFQVJfVVBEQVRFIiwiVVBEQVRFX01BTlkiLCJVUERBVEVfRklMVEVSU19DT05GSUciLCJkZWZhdWx0RmlsdGVyIiwicmlnaHRzIiwiY291bnRyaWVzIiwiZXhjbHVzaXZlIiwiaW5jbHVkZUFsbENvdW50cmllcyIsInNwb3J0IiwidmFsdWUiLCJsYWJlbCIsImV2ZW50IiwiZm9yY2VVcGRhdGUiLCJzeW5jV2l0aExvY2FsU3RvcmFnZSIsImZpbHRlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsIk9iamVjdCIsImFzc2lnbiIsImlkIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwibWFwIiwiYyIsImZpbHRlcnMiLCJOdW1iZXIiLCJyIiwibWFya2V0cGxhY2VUeXBlcyIsIlRFU1QiLCJtYXJrZXRwbGFjZSIsInRlc3RJdGVtIiwidGVzdCIsInRleHQiLCJfX2FwaVN0b3JlIiwidG91cm5hbWVudHMiLCJ3aW5kb3ciLCJDb250ZW50QXJlbmEiLCJDb250ZW50QXBpIiwic2F2ZUNvbnRlbnRBc0RyYWZ0IiwiY29udGVudCIsImRlZmVycmVkIiwialF1ZXJ5IiwiRGVmZXJyZWQiLCJfdGhpcyIsIiQiLCJhamF4IiwidXJsIiwiZW52aG9zdHVybCIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiY29udGVudFR5cGUiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJyZXNvbHZlIiwiZXJyb3IiLCJzdGF0dXMiLCJyZWplY3QiLCJwcm9taXNlIiwic2F2ZUNvbnRlbnRBc0luYWN0aXZlIiwic2F2ZUNvbnRlbnRBc0FjdGl2ZSIsInJlcHVibGlzaExpc3RpbmciLCJjdXN0b21JZCIsInNlbmRNZXNzYWdlIiwibWVzc2FnZSIsImdldFVzZXJJbmZvIiwiZ2V0VXNlckluZm9CeUFjdGl2YXRpb25Db2RlIiwiYWN0aXZhdGlvbkNvZGUiLCJnZXRDb21wYW55VXNlcnMiLCJ1cGRhdGVDb21wYW55IiwiY29tcGFueSIsInVwZGF0ZVBhc3N3b3JkIiwidXBkYXRlVXNlciIsInVzZXIiLCJhY3RpdmF0ZVVzZXIiLCJwYXNzd29yZCIsInVwZGF0ZVVzZXJQcm9maWxlIiwicHJvZmlsZSIsImdldFRocmVhZCIsImdldFRocmVhZHMiLCJwbGFjZUJpZCIsImJpZCIsImFjY2VwdEJpZCIsInNpZ25hdHVyZSIsInNpZ25hdHVyZU5hbWUiLCJzaWduYXR1cmVQb3NpdGlvbiIsInJlamVjdEJpZCIsInJlbW92ZUJpZCIsInNhdmVUbXBGaWxlIiwiZmlsZXMiLCJGb3JtRGF0YSIsImFwcGVuZCIsInByb2Nlc3NEYXRhIiwic2F2ZUF0dGFjaG1lbnRGaWxlIiwiY29uc29sZSIsImxvZyIsInJlbW92ZUF0dGFjaG1lbnRGaWxlIiwiZmlsZSIsImdldEJ5Q3VzdG9tSWQiLCJnZXREcmFmdExpc3RpbmdzIiwiZ2V0SW5hY3RpdmVMaXN0aW5ncyIsImdldEFjdGl2ZUxpc3RpbmdzIiwiZ2V0RXhwaXJlZExpc3RpbmdzIiwicmVtb3ZlTGlzdGluZyIsImR1cGxpY2F0ZUxpc3RpbmciLCJkZWFjdGl2YXRlTGlzdGluZyIsImFyY2hpdmVMaXN0aW5nIiwiZ2V0Q2xvc2VkRGVhbHMiLCJnZXRBbGxEZWFscyIsImdldFBlbmRpbmdEZWFscyIsImdldFJlamVjdGVkRGVhbHMiLCJnZXRXYXRjaGxpc3RMaXN0aW5ncyIsIkFwaSIsInNvcnRCeUxhYmVsIiwiYSIsImIiLCJuYW1lIiwic29ydEJ5U3BvcnQiLCJzcG9ydENhdGVnb3J5IiwicHJlcGFyZUxpc3QiLCJsaXN0IiwiY2F0ZWdvcnlJZCIsIml0ZW0iLCJjYXRlZ29yeSIsImV4dGVybmFsSWQiLCJzb3J0IiwiZmlsdGVyRG91YmxlcyIsInNwb3J0SWQiLCJuYW1lcyIsInJlcGxhY2UiLCJwdXNoIiwiZ2V0Q29udGVudCIsImdldEpzb25Db250ZW50Iiwic2F2ZUZpbHRlciIsImdldENvdW50cmllcyIsIkRhdGEiLCJDb3VudHJpZXMiLCJsZW5ndGgiLCJyZWdpb25zIiwiZ2V0QWN0aXZlU3BvcnRzIiwiZ2V0Q291bnRyaWVzRnVsbCIsImdldFRlcnJpdG9yaWVzIiwiZ2V0UmVnaW9ucyIsImdldFJpZ2h0cyIsInJpZ2h0c1BhY2thZ2UiLCJncm91cCIsImdldFJpZ2h0c1BhY2thZ2UiLCJnZXRTcG9ydHMiLCJleHRlcm5hbEFwaVVybCIsInNwb3J0cyIsImdldENvbnRlbnREZXRhaWxzIiwiZ2V0UGVuZGluZ0xpc3RpbmdzIiwiZ2V0Q2F0ZWdvcmllcyIsImNhdHMiLCJnZXRUb3VybmFtZW50cyIsImRvbmUiLCJ0b3VybmFtZW50Iiwic3RvcmVkUmVzcG9uc2UiLCJ1bmRlZmluZWQiLCJnZXRTZWFzb25zIiwidG91cm5hbWVudElkIiwic2Vhc29ucyIsInNlYXNvbiIsImlzQXJyYXkiLCJlbmREYXRlIiwiZW5kX2RhdGUiLCJzdGFydERhdGUiLCJzdGFydF9kYXRlIiwidG91cm5hbWVudF9pZCIsInllYXIiLCJyZXZlcnNlIiwiZ2V0U2NoZWR1bGUiLCJzZWFzb25JZCIsInNwb3J0X2V2ZW50cyIsInNwb3J0X2V2ZW50IiwiZm9yRWFjaCIsInJvdW5kIiwidG91cm5hbWVudF9yb3VuZCIsIm51bWJlciIsIm1hdGNoZXMiLCJNYXAiLCJzZXQiLCJzY2hlZHVsZWQiLCJ0b3VybmFtZW50Um91bmQiLCJjb21wZXRpdG9ycyIsImNvbXBldGl0b3IiLCJzZWFyY2hDb21wZXRpdGlvbiIsInJlcXVlc3QiLCJ0cmFkaXRpb25hbCIsImRhdGFUeXBlIiwid2F0Y2hsaXN0IiwiZ2V0Tm90aWZpY2F0aW9ucyIsImF4aW9zIiwiZ2V0IiwibWFya05vdGlmaWNhdGlvbkFzU2VlbiIsInBvc3QiLCJMYW5ndWFnZXMiLCJUb3BTcG9ydHMiLCJGdWxsU3BvcnRzIiwiQWN0aXZlU3BvcnRzIiwiVGVycml0b3JpZXMiLCJSZWdpb25zIiwiU2hvcnQiLCJMb25nIiwiVXRpbHMiLCJjb250ZW50UGFyc2VyRnJvbVNlcnZlciIsInBhcnNlZCIsImV4dHJhRGF0YSIsImVudHJpZXMiLCJrZXkiLCJBcnJheSIsInNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0IiwicnAiLCJzZWxlY3RlZFJpZ2h0cyIsImZpeHR1cmVzQnlTZWFzb24iLCJzIiwiaSIsImZpeHR1cmVzIiwibGF3Iiwic2FsZXNQYWNrYWdlcyIsInNwIiwic2FsZXNNZXRob2QiLCJleGNsdWRlZENvdW50cmllcyIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJ0IiwidGVycml0b3JpZXMiLCJpbnN0YWxsbWVudHMiLCJkYXRlIiwibW9tZW50IiwiZSIsInNvcnRTYWxlc1BhY2thZ2VzIiwiaG9zdHVybCIsInN0ZXAiLCJjdXN0b21TZWFzb25zIiwic3RhcnRzV2l0aCIsInllYXJzIiwic3BsaXQiLCJmcm9tIiwidG8iLCJjdXN0b20iLCJzZWFzb25EdXJhdGlvbnMiLCJjdXN0b21TZWFzb25EdXIiLCJjdXN0b21TdGFydERhdGUiLCJjdXN0b21FbmREYXRlIiwic3RvcmUiLCJnZXRTdGF0ZSIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwidGl0bGUiLCJmaWx0ZXJDb21wYW55SW5mbyIsImxlZ2FsTmFtZSIsInJlZ2lzdHJhdGlvbk51bWJlciIsInZhdCIsImFkZHJlc3MiLCJhZGRyZXNzMiIsImNpdHkiLCJ6aXAiLCJjb3VudHJ5IiwiaXNBUElBdmFpbGFibGUiLCJGaWxlIiwiRmlsZVJlYWRlciIsIkZpbGVMaXN0IiwiQmxvYiIsImRvY3VtZW50Iiwid3JpdGVsbiIsImFkZE9yZGluYWwiLCJuIiwic3RyIiwidG9TdHJpbmciLCJzbGljZSIsIm9yZCIsImdldEluZGV4IiwiYXJyIiwicHJvcCIsImdldFdlYnNpdGVVUmwiLCJpbmNsdWRlcyIsImlzTGlzdGluZ1B1Ymxpc2hlZCIsImFsbFZhbHVlIiwiTGFuZ3VhZ2VTZWxlY3RvciIsInByb3BzIiwiaGFuZGxlT25DaGFuZ2UiLCJzZWxlY3Rpb24iLCJvbkNoYW5nZSIsImhhc0FsbCIsImZpbmQiLCJoYXNBbGxQcmV2IiwicHJldlNlbGVjdGlvbiIsIm11bHRpIiwicGxhY2Vob2xkZXIiLCJyZWFsTGFuZ3VhZ2VzIiwidmFsdWVzIiwiayIsImFsbExhbmd1YWdlcyIsIlJlYWN0IiwiQ29tcG9uZW50IiwiY29tbW9uVHlwZXMiLCJHRVRfREVGQVVMVF9SSUdIVFNfUEFDS0FHRSIsIlNFVF9UT1RBTF9DT1VOVFJJRVMiLCJTRVRfVEVTVF9TVEFHRV9NT0RFIiwiY29tbW9uRGVmYXVsdCIsInRvdGFsQ291bnRyaWVzIiwidGVzdFN0YWdlTW9kZSIsImNvbW1vbiIsImRlZmF1bHRSaWdodHNQYWNrYWdlIiwidXNlclR5cGVzIiwiTE9HT1VUIiwiTE9HSU4iLCJQUk9GSUxFIiwiTE9BRF9VU0VSX0RBVEEiLCJkZWZhdWx0VXNlciIsImVtYWlsIiwicmVkdWNlcnMiLCJjb21iaW5lUmVkdWNlcnMiLCJzZWxlY3RvciIsIm1hbmFnZSIsImkxOG5TdGF0ZSIsImNyZWF0ZVN0b3JlIiwibWFuYWdlVHlwZXMiLCJDT05URU5UX0lOSVQiLCJTVEVQX0NIQU5HRV9SRVNFVCIsIkdPX1RPX1NURVAiLCJHT19UT19ORVhUX1NURVAiLCJHT19UT19QUkVWSU9VU19TVEVQIiwiQUREX05FVyIsIlJFTU9WRV9ORVciLCJTVVBFUl9SSUdIVFNfVVBEQVRFRCIsIlVQREFURV9DT05URU5UX1ZBTFVFIiwiU0VMRUNUX1RPVVJOQU1FTlQiLCJSRU1PVkVfRlJPTV9NVUxUSVBMRSIsIlVQREFURV9GUk9NX01VTFRJUExFIiwiQVBQTFlfU0VMRUNUSU9OIiwiVVBEQVRFX1NBTEVTX1BBQ0tBR0VTIiwiVVBEQVRFX0FUVEFDSE1FTlRTIiwiVVBEQVRFX0FOTkVYIiwiQUREX1NBTEVTX1BBQ0tBR0VTIiwiUkVTRVQiLCJBTExfRVBJU09ERV9VUERBVEVfRkxBRyIsIkVtcHR5TGlzdGluZyIsIm1heFN0ZXAiLCJjdXN0b21Ub3VybmFtZW50IiwiY3VzdG9tQ2F0ZWdvcnkiLCJkZXNjcmlwdGlvbiIsInByb2dyYW1EZXNjcmlwdGlvbiIsImF0dGFjaG1lbnRzIiwiYW5uZXgiLCJlbmREYXRlTGltaXQiLCJjb3VudGVyIiwiY3VycmVuY3kiLCJzdGFydERhdGVNb2RlIiwic3RlcENoYW5nZSIsIk5BX0lOUFVUIiwiSExfSU5QVVQiLCJMSUNFTlNFRF9MQU5HVUFHRVMiLCJQUk9HUkFNX0xBTkdVQUdFIiwiUFJPR1JBTV9TVUJUSVRMRVMiLCJQUk9HUkFNX1NDUklQVCIsIkVESVRfUFJPR1JBTV9ERVNDUklQVElPTl9PUFRJT05BTCIsIndlYnNpdGUiLCJpbWFnZSIsImltYWdlQmFzZTY0IiwidGVtcERhdGEiLCJuZXdTdGF0ZSIsImluaXRpYWxpemVkIiwibWF4IiwicGF5bG9hZCIsIm5ld1N0ZXAiLCJzZWxlY3RvclR5cGUiLCJjbGVhbiIsImxpc3RpbmdFZGl0ZWQiLCJzZWxlY3RlZEl0ZW1zIiwibXVsdGlwbGUiLCJyZXNldCIsInNhbGVzUGFja2FnZSIsIk9QRU5fU0VMRUNUT1IiLCJDTE9TRV9TRUxFQ1RPUiIsIm9wZW4iLCJzZWxlY3Rvckl0ZW1zIiwicG9wdWxhckl0ZW1zIiwiYWN0aXZlRmlsdGVyIiwiZGlzYWJsZWQiLCJzaG93TmV3U3BvcnQiLCJzaG93TmV3VG91cm5hbWVudCIsInNob3dOZXdDYXRlZ29yeSIsInNob3dOZXdTZWFzb24iLCJzaG93QWxsQ291bnRyaWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkY7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QztBQUM1Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7Ozs7OztBQ25MQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbkRBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQ3hEQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixFQUF5QjtBQUM1QmlXLDhCQUFjaFcsT0FBT2dXLFlBRE87QUFFNUJTLHNCQUFPLElBRnFCO0FBRzVCcFcsdUJBQVFMLE9BQU9LLEtBSGE7QUFJNUJxVywrQkFBZTFXLE9BQU8wVyxhQUpNO0FBSzVCQyw4QkFBYzNXLE9BQU8yVyxZQUxPO0FBTTVCQyw4QkFBZTVXLE9BQU80VyxZQU5NO0FBTzVCUiwwQkFBV3BXLE9BQU9vVyxRQVBVO0FBUTVCUywwQkFBVTdXLE9BQU82VyxRQVJXO0FBUzVCQyw4QkFBZTlXLE9BQU84VyxZQVRNO0FBVTVCQyxtQ0FBb0IvVyxPQUFPK1csaUJBVkM7QUFXNUJDLGlDQUFrQmhYLE9BQU9nWCxlQVhHO0FBWTVCQywrQkFBZ0JqWCxPQUFPaVgsYUFaSztBQWE1QkMsa0NBQWtCbFgsT0FBT2tYLGdCQWJHO0FBYzVCakIsdUJBQVFqVyxPQUFPaVcsS0FkYTtBQWU1QkUsK0JBQWVuVyxPQUFPbVc7QUFmTSxhQUF6QixDQUFQO0FBaUJKLGFBQUtILGFBQWFRLGNBQWxCO0FBQ0ksbUJBQU90VyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosS0FBbEIsRUFBeUI7QUFDNUJpVyw4QkFBYyxFQURjO0FBRTVCUyxzQkFBTyxLQUZxQjtBQUc1QkMsK0JBQWUsRUFIYTtBQUk1QkMsOEJBQWM7QUFKYyxhQUF6QixDQUFQO0FBTUosYUFBS1gsYUFBYXBDLGVBQWxCO0FBQ0ksbUJBQU8xVCxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosS0FBbEIsRUFBeUI7QUFDNUJpVyw4QkFBYyxFQURjO0FBRTVCUyxzQkFBTyxLQUZxQjtBQUc1QkMsK0JBQWUsRUFIYTtBQUk1QkMsOEJBQWM7QUFKYyxhQUF6QixDQUFQO0FBTUo7QUFDSSxtQkFBTzVXLEtBQVA7QUF0Q1I7QUF3Q0gsQ0FoRE0sQyIsImZpbGUiOiJjYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xudmFyIGJ0b2EgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmJ0b2EgJiYgd2luZG93LmJ0b2EuYmluZCh3aW5kb3cpKSB8fCByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnRvYScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkRXZlbnQgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbiAgICB2YXIgeERvbWFpbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIElFIDgvOSBDT1JTIHN1cHBvcnRcbiAgICAvLyBPbmx5IHN1cHBvcnRzIFBPU1QgYW5kIEdFVCBjYWxscyBhbmQgZG9lc24ndCByZXR1cm5zIHRoZSByZXNwb25zZSBoZWFkZXJzLlxuICAgIC8vIERPTidUIGRvIHRoaXMgZm9yIHRlc3RpbmcgYi9jIFhNTEh0dHBSZXF1ZXN0IGlzIG1vY2tlZCwgbm90IFhEb21haW5SZXF1ZXN0LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCAmJiAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAgICFpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gICAgICBsb2FkRXZlbnQgPSAnb25sb2FkJztcbiAgICAgIHhEb21haW4gPSB0cnVlO1xuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gaGFuZGxlUHJvZ3Jlc3MoKSB7fTtcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHt9O1xuICAgIH1cblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3RbbG9hZEV2ZW50XSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCAmJiAheERvbWFpbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgLy8gSUUgc2VuZHMgMTIyMyBpbnN0ZWFkIG9mIDIwNCAoaHR0cHM6Ly9naXRodWIuY29tL2F4aW9zL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgbWV0aG9kcyBsaWtlIGBfLm1heGAgYW5kIGBfLm1pbmAgd2hpY2ggYWNjZXB0cyBhXG4gKiBgY29tcGFyYXRvcmAgdG8gZGV0ZXJtaW5lIHRoZSBleHRyZW11bSB2YWx1ZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIHVzZWQgdG8gY29tcGFyZSB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZXh0cmVtdW0gdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VFeHRyZW11bShhcnJheSwgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGN1cnJlbnQgPSBpdGVyYXRlZSh2YWx1ZSk7XG5cbiAgICBpZiAoY3VycmVudCAhPSBudWxsICYmIChjb21wdXRlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAoY3VycmVudCA9PT0gY3VycmVudCAmJiAhaXNTeW1ib2woY3VycmVudCkpXG4gICAgICAgICAgOiBjb21wYXJhdG9yKGN1cnJlbnQsIGNvbXB1dGVkKVxuICAgICAgICApKSB7XG4gICAgICB2YXIgY29tcHV0ZWQgPSBjdXJyZW50LFxuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VFeHRyZW11bTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUV4dHJlbXVtLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXRUYWcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ3RgIHdoaWNoIGRvZXNuJ3QgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBncmVhdGVyIHRoYW4gYG90aGVyYCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHdCh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID4gb3RoZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUd0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUd0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pZGVudGl0eS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBiYXNlRXh0cmVtdW0gPSByZXF1aXJlKCcuL19iYXNlRXh0cmVtdW0nKSxcbiAgICBiYXNlR3QgPSByZXF1aXJlKCcuL19iYXNlR3QnKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWF4aW11bSB2YWx1ZSBvZiBgYXJyYXlgLiBJZiBgYXJyYXlgIGlzIGVtcHR5IG9yIGZhbHNleSxcbiAqIGB1bmRlZmluZWRgIGlzIHJldHVybmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1heGltdW0gdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ubWF4KFs0LCAyLCA4LCA2XSk7XG4gKiAvLyA9PiA4XG4gKlxuICogXy5tYXgoW10pO1xuICogLy8gPT4gdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIG1heChhcnJheSkge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aClcbiAgICA/IGJhc2VFeHRyZW11bShhcnJheSwgaWRlbnRpdHksIGJhc2VHdClcbiAgICA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvbWF4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvbWF4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiZXhwb3J0IGNvbnN0IGxhbmd1YWdlcyA9IHtcbiAgICBcImFiXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFia2hhelwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCw0qfRgdGD0LBcIlxuICAgIH0sXG4gICAgXCJhYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBZmFyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZhcmFmXCJcbiAgICB9LFxuICAgIFwiYWZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWZyaWthYW5zXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZyaWthYW5zXCJcbiAgICB9LFxuICAgIFwiYWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWthblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFrYW5cIlxuICAgIH0sXG4gICAgXCJzcVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBbGJhbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNocWlwXCJcbiAgICB9LFxuICAgIFwiYW1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQW1oYXJpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGKoOGIm+GIreGKm1wiXG4gICAgfSxcbiAgICBcImFyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFyYWJpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItin2YTYudix2KjZitipXCJcbiAgICB9LFxuICAgIFwiYW5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXJhZ29uZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXJhZ29uw6lzXCJcbiAgICB9LFxuICAgIFwiaHlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXJtZW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLVgNWh1bXVpdaA1aXVtlwiXG4gICAgfSxcbiAgICBcImFzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFzc2FtZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KaF4Ka44Kau4KeA4Kav4Ka84Ka+XCJcbiAgICB9LFxuICAgIFwiYXZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXZhcmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LDQstCw0YAg0LzQsNGG04AsINC80LDQs9OA0LDRgNGD0Lsg0LzQsNGG04BcIlxuICAgIH0sXG4gICAgXCJhZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBdmVzdGFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYXZlc3RhXCJcbiAgICB9LFxuICAgIFwiYXlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXltYXJhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYXltYXIgYXJ1XCJcbiAgICB9LFxuICAgIFwiYXpcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXplcmJhaWphbmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJhesmZcmJheWNhbiBkaWxpXCJcbiAgICB9LFxuICAgIFwiYm1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmFtYmFyYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJhbWFuYW5rYW5cIlxuICAgIH0sXG4gICAgXCJiYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCYXNoa2lyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LHQsNGI0qHQvtGA0YIg0YLQtdC70LVcIlxuICAgIH0sXG4gICAgXCJldVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCYXNxdWVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJldXNrYXJhLCBldXNrZXJhXCJcbiAgICB9LFxuICAgIFwiYmVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmVsYXJ1c2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCR0LXQu9Cw0YDRg9GB0LrQsNGPXCJcbiAgICB9LFxuICAgIFwiYm5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmVuZ2FsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCmrOCmvuCmguCmsuCmvlwiXG4gICAgfSxcbiAgICBcImJoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJpaGFyaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkreCli+CknOCkquClgeCksOClgFwiXG4gICAgfSxcbiAgICBcImJpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJpc2xhbWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJCaXNsYW1hXCJcbiAgICB9LFxuICAgIFwiYnNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQm9zbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJvc2Fuc2tpIGplemlrXCJcbiAgICB9LFxuICAgIFwiYnJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnJldG9uXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYnJlemhvbmVnXCJcbiAgICB9LFxuICAgIFwiYmdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnVsZ2FyaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LHRitC70LPQsNGA0YHQutC4INC10LfQuNC6XCJcbiAgICB9LFxuICAgIFwibXlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnVybWVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGAl+GAmeGArOGAheGArFwiXG4gICAgfSxcbiAgICBcImNhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNhdGFsYW47IFZhbGVuY2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkNhdGFsw6BcIlxuICAgIH0sXG4gICAgXCJjaFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGFtb3Jyb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkNoYW1vcnVcIlxuICAgIH0sXG4gICAgXCJjZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGVjaGVuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0L3QvtGF0YfQuNC50L0g0LzQvtGC0YJcIlxuICAgIH0sXG4gICAgXCJueVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGljaGV3YTsgQ2hld2E7IE55YW5qYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImNoaUNoZcW1YSwgY2hpbnlhbmphXCJcbiAgICB9LFxuICAgIFwiemhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2hpbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuS4reaWhyAoWmjFjW5nd8OpbiksIOaxieivrSwg5ryi6KqeXCJcbiAgICB9LFxuICAgIFwiY3ZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2h1dmFzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGH05HQstCw0Ygg0YfTl9C70YXQuFwiXG4gICAgfSxcbiAgICBcImt3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNvcm5pc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLZXJuZXdla1wiXG4gICAgfSxcbiAgICBcImNvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNvcnNpY2FuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiY29yc3UsIGxpbmd1YSBjb3JzYVwiXG4gICAgfSxcbiAgICBcImNyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNyZWVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhk4DhkKbhkIPhlK3hkI3hkI/hkKNcIlxuICAgIH0sXG4gICAgXCJoclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDcm9hdGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImhydmF0c2tpXCJcbiAgICB9LFxuICAgIFwiY3NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ3plY2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLEjWVza3ksIMSNZcWhdGluYVwiXG4gICAgfSxcbiAgICBcImRhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkRhbmlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImRhbnNrXCJcbiAgICB9LFxuICAgIFwiZHZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRGl2ZWhpOyBEaGl2ZWhpOyBNYWxkaXZpYW47XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi3oveqN6I3qzegN6oXCJcbiAgICB9LFxuICAgIFwibmxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRHV0Y2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOZWRlcmxhbmRzLCBWbGFhbXNcIlxuICAgIH0sXG4gICAgXCJlblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJFbmdsaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRW5nbGlzaFwiXG4gICAgfSxcbiAgICBcImVvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkVzcGVyYW50b1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkVzcGVyYW50b1wiXG4gICAgfSxcbiAgICBcImV0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkVzdG9uaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZWVzdGksIGVlc3RpIGtlZWxcIlxuICAgIH0sXG4gICAgXCJlZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJFd2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFyotlZ2JlXCJcbiAgICB9LFxuICAgIFwiZm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRmFyb2VzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImbDuHJveXNrdFwiXG4gICAgfSxcbiAgICBcImZqXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZpamlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInZvc2EgVmFrYXZpdGlcIlxuICAgIH0sXG4gICAgXCJmaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGaW5uaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic3VvbWksIHN1b21lbiBraWVsaVwiXG4gICAgfSxcbiAgICBcImZyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZyZW5jaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImZyYW7Dp2FpcywgbGFuZ3VlIGZyYW7Dp2Fpc2VcIlxuICAgIH0sXG4gICAgXCJmZlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGdWxhOyBGdWxhaDsgUHVsYWFyOyBQdWxhclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkZ1bGZ1bGRlLCBQdWxhYXIsIFB1bGFyXCJcbiAgICB9LFxuICAgIFwiZ2xcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR2FsaWNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWxlZ29cIlxuICAgIH0sXG4gICAgXCJrYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHZW9yZ2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGDpeGDkOGDoOGDl+GDo+GDmuGDmFwiXG4gICAgfSxcbiAgICBcImRlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkdlcm1hblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkRldXRzY2hcIlxuICAgIH0sXG4gICAgXCJlbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHcmVlaywgTW9kZXJuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwizpXOu867zrfOvc65zrrOrFwiXG4gICAgfSxcbiAgICBcImduXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkd1YXJhbsOtXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXZhw7Fl4bq9XCJcbiAgICB9LFxuICAgIFwiZ3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR3VqYXJhdGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgqpfgq4HgqpzgqrDgqr7gqqTgq4BcIlxuICAgIH0sXG4gICAgXCJodFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIYWl0aWFuOyBIYWl0aWFuIENyZW9sZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktyZXnDsmwgYXlpc3llblwiXG4gICAgfSxcbiAgICBcImhhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhhdXNhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSGF1c2EsINmH2Y7ZiNmP2LPZjlwiXG4gICAgfSxcbiAgICBcImhlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhlYnJldyAobW9kZXJuKVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItei15HXqNeZ16pcIlxuICAgIH0sXG4gICAgXCJoelwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIZXJlcm9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPdGppaGVyZXJvXCJcbiAgICB9LFxuICAgIFwiaGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGluZGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLngpL/gpKjgpY3gpKbgpYAsIOCkueCkv+CkguCkpuClgFwiXG4gICAgfSxcbiAgICBcImhvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhpcmkgTW90dVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkhpcmkgTW90dVwiXG4gICAgfSxcbiAgICBcImh1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkh1bmdhcmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hZ3lhclwiXG4gICAgfSxcbiAgICBcImlhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkludGVybGluZ3VhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSW50ZXJsaW5ndWFcIlxuICAgIH0sXG4gICAgXCJpZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbmRvbmVzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQmFoYXNhIEluZG9uZXNpYVwiXG4gICAgfSxcbiAgICBcImllXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkludGVybGluZ3VlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT3JpZ2luYWxseSBjYWxsZWQgT2NjaWRlbnRhbDsgdGhlbiBJbnRlcmxpbmd1ZSBhZnRlciBXV0lJXCJcbiAgICB9LFxuICAgIFwiZ2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSXJpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWVpbGdlXCJcbiAgICB9LFxuICAgIFwiaWdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWdib1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFz4bulc+G7pSBJZ2JvXCJcbiAgICB9LFxuICAgIFwiaWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW51cGlhcVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIknDsXVwaWFxLCBJw7F1cGlhdHVuXCJcbiAgICB9LFxuICAgIFwiaW9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWRvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSWRvXCJcbiAgICB9LFxuICAgIFwiaXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWNlbGFuZGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiw41zbGVuc2thXCJcbiAgICB9LFxuICAgIFwiaXRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSXRhbGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkl0YWxpYW5vXCJcbiAgICB9LFxuICAgIFwiaXVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW51a3RpdHV0XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4ZCD4ZOE4ZKD4ZGO4ZGQ4ZGmXCJcbiAgICB9LFxuICAgIFwiamFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSmFwYW5lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLml6XmnKzoqp4gKOOBq+OBu+OCk+OBlO+8j+OBq+OBo+OBveOCk+OBlClcIlxuICAgIH0sXG4gICAgXCJqdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJKYXZhbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJhc2EgSmF3YVwiXG4gICAgfSxcbiAgICBcImtsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthbGFhbGxpc3V0LCBHcmVlbmxhbmRpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImthbGFhbGxpc3V0LCBrYWxhYWxsaXQgb3FhYXNpaVwiXG4gICAgfSxcbiAgICBcImtuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthbm5hZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgspXgsqjgs43gsqjgsqFcIlxuICAgIH0sXG4gICAgXCJrclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYW51cmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLYW51cmlcIlxuICAgIH0sXG4gICAgXCJrc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYXNobWlyaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkleCktuCljeCkruClgOCksOClgCwg2YPYtNmF2YrYsdmK4oCOXCJcbiAgICB9LFxuICAgIFwia2tcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2F6YWtoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0prQsNC30LDSmyDRgtGW0LvRllwiXG4gICAgfSxcbiAgICBcImttXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktobWVyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Z6X4Z624Z6f4Z624Z6B4Z+S4Z6Y4Z+C4Z6aXCJcbiAgICB9LFxuICAgIFwia2lcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2lrdXl1LCBHaWt1eXVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHxKlrxal5xalcIlxuICAgIH0sXG4gICAgXCJyd1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLaW55YXJ3YW5kYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIklraW55YXJ3YW5kYVwiXG4gICAgfSxcbiAgICBcImt5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpcmdoaXosIEt5cmd5elwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC60YvRgNCz0YvQtyDRgtC40LvQuFwiXG4gICAgfSxcbiAgICBcImt2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktvbWlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQutC+0LzQuCDQutGL0LJcIlxuICAgIH0sXG4gICAgXCJrZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLb25nb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktpS29uZ29cIlxuICAgIH0sXG4gICAgXCJrb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLb3JlYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLtlZzqta3slrQgKOmfk+Wci+iqniksIOyhsOyEoOunkCAo5pyd6a6u6KqeKVwiXG4gICAgfSxcbiAgICBcImt1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkt1cmRpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLdXJkw64sINmD2YjYsdiv24zigI5cIlxuICAgIH0sXG4gICAgXCJralwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLd2FueWFtYSwgS3VhbnlhbWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLdWFueWFtYVwiXG4gICAgfSxcbiAgICBcImxhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxhdGluXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwibGF0aW5lLCBsaW5ndWEgbGF0aW5hXCJcbiAgICB9LFxuICAgIFwibGJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTHV4ZW1ib3VyZ2lzaCwgTGV0emVidXJnZXNjaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkzDq3R6ZWJ1ZXJnZXNjaFwiXG4gICAgfSxcbiAgICBcImxnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkx1Z2FuZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMdWdhbmRhXCJcbiAgICB9LFxuICAgIFwibGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGltYnVyZ2lzaCwgTGltYnVyZ2FuLCBMaW1idXJnZXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMaW1idXJnc1wiXG4gICAgfSxcbiAgICBcImxuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxpbmdhbGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMaW5nw6FsYVwiXG4gICAgfSxcbiAgICBcImxvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxhb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC6nuC6suC6quC6suC6peC6suC6p1wiXG4gICAgfSxcbiAgICBcImx0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxpdGh1YW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJsaWV0dXZpxbMga2FsYmFcIlxuICAgIH0sXG4gICAgXCJsdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMdWJhLUthdGFuZ2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJcIlxuICAgIH0sXG4gICAgXCJsdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMYXR2aWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwibGF0dmllxaF1IHZhbG9kYVwiXG4gICAgfSxcbiAgICBcImd2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbnhcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWVsZywgR2FpbGNrXCJcbiAgICB9LFxuICAgIFwibWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFjZWRvbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC80LDQutC10LTQvtC90YHQutC4INGY0LDQt9C40LpcIlxuICAgIH0sXG4gICAgXCJtZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYWxhZ2FzeVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hbGFnYXN5IGZpdGVueVwiXG4gICAgfSxcbiAgICBcIm1zXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbGF5XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYmFoYXNhIE1lbGF5dSwg2KjZh9in2LMg2YXZhNin2YrZiOKAjlwiXG4gICAgfSxcbiAgICBcIm1sXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbGF5YWxhbVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC0ruC0suC0r+C0vuC0s+C0glwiXG4gICAgfSxcbiAgICBcIm10XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbHRlc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJNYWx0aVwiXG4gICAgfSxcbiAgICBcIm1pXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk3EgW9yaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInRlIHJlbyBNxIFvcmlcIlxuICAgIH0sXG4gICAgXCJtclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYXJhdGhpIChNYXLEgeG5rWjEqylcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpK7gpLDgpL7gpKDgpYBcIlxuICAgIH0sXG4gICAgXCJtaFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYXJzaGFsbGVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkthamluIE3Mp2FqZcS8XCJcbiAgICB9LFxuICAgIFwibW5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTW9uZ29saWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LzQvtC90LPQvtC7XCJcbiAgICB9LFxuICAgIFwibmFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTmF1cnVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFa2FrYWlyxakgTmFvZXJvXCJcbiAgICB9LFxuICAgIFwibnZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTmF2YWpvLCBOYXZhaG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJEaW7DqSBiaXphYWQsIERpbsOpa8q8ZWjHsMOtXCJcbiAgICB9LFxuICAgIFwibmJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9yd2VnaWFuIEJva23DpWxcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOb3JzayBib2ttw6VsXCJcbiAgICB9LFxuICAgIFwibmRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9ydGggTmRlYmVsZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImlzaU5kZWJlbGVcIlxuICAgIH0sXG4gICAgXCJuZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOZXBhbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpKjgpYfgpKrgpL7gpLLgpYBcIlxuICAgIH0sXG4gICAgXCJuZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOZG9uZ2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPd2FtYm9cIlxuICAgIH0sXG4gICAgXCJublwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW4gTnlub3Jza1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrIG55bm9yc2tcIlxuICAgIH0sXG4gICAgXCJub1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOb3Jza1wiXG4gICAgfSxcbiAgICBcImlpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk51b3N1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi6oaI6oyg6pK/IE51b3N1aHhvcFwiXG4gICAgfSxcbiAgICBcIm5yXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNvdXRoIE5kZWJlbGVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJpc2lOZGViZWxlXCJcbiAgICB9LFxuICAgIFwib2NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT2NjaXRhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk9jY2l0YW5cIlxuICAgIH0sXG4gICAgXCJvalwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPamlid2UsIE9qaWJ3YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGQiuGTguGUkeGTiOGQr+GSp+GQjuGTkFwiXG4gICAgfSxcbiAgICBcImN1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9sZCBDaHVyY2ggU2xhdm9uaWMsIENodXJjaCBTbGF2aWMsIENodXJjaCBTbGF2b25pYywgT2xkIEJ1bGdhcmlhbiwgT2xkIFNsYXZvbmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0anQt9GL0LrRiiDRgdC70L7QstGj0L3RjNGB0LrRilwiXG4gICAgfSxcbiAgICBcIm9tXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9yb21vXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZhYW4gT3JvbW9vXCJcbiAgICB9LFxuICAgIFwib3JcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT3JpeWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgrJPgrKHgrLzgrL/grIZcIlxuICAgIH0sXG4gICAgXCJvc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPc3NldGlhbiwgT3NzZXRpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC40YDQvtC9IMOm0LLQt9Cw0LNcIlxuICAgIH0sXG4gICAgXCJwYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQYW5qYWJpLCBQdW5qYWJpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Kiq4Kmw4Kic4Ki+4Kis4KmALCDZvtmG2KzYp9io24zigI5cIlxuICAgIH0sXG4gICAgXCJwaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQxIFsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkquCkvuCktOCkv1wiXG4gICAgfSxcbiAgICBcImZhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBlcnNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLZgdin2LHYs9uMXCJcbiAgICB9LFxuICAgIFwicGxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUG9saXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwicG9sc2tpXCJcbiAgICB9LFxuICAgIFwicHNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUGFzaHRvLCBQdXNodG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLZvtqa2KrZiFwiXG4gICAgfSxcbiAgICBcInB0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBvcnR1Z3Vlc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJQb3J0dWd1w6pzXCJcbiAgICB9LFxuICAgIFwicXVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUXVlY2h1YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlJ1bmEgU2ltaSwgS2ljaHdhXCJcbiAgICB9LFxuICAgIFwicm1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUm9tYW5zaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInJ1bWFudHNjaCBncmlzY2h1blwiXG4gICAgfSxcbiAgICBcInJuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpcnVuZGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJraVJ1bmRpXCJcbiAgICB9LFxuICAgIFwicm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUm9tYW5pYW4sIE1vbGRhdmlhbiwgTW9sZG92YW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJyb23Dom7Eg1wiXG4gICAgfSxcbiAgICBcInJ1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlJ1c3NpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgNGD0YHRgdC60LjQuSDRj9C30YvQulwiXG4gICAgfSxcbiAgICBcInNhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNhbnNrcml0IChTYeG5gXNr4bmbdGEpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KS44KSC4KS44KWN4KSV4KWD4KSk4KSu4KWNXCJcbiAgICB9LFxuICAgIFwic2NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2FyZGluaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic2FyZHVcIlxuICAgIH0sXG4gICAgXCJzZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTaW5kaGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLjgpL/gpKjgpY3gpKfgpYAsINiz2YbajNmK2Iwg2LPZhtiv2r7bjOKAjlwiXG4gICAgfSxcbiAgICBcInNlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcnRoZXJuIFNhbWlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJEYXZ2aXPDoW1lZ2llbGxhXCJcbiAgICB9LFxuICAgIFwic21cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2Ftb2FuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZ2FnYW5hIGZhYSBTYW1vYVwiXG4gICAgfSxcbiAgICBcInNnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNhbmdvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiecOibmfDoiB0w64gc8OkbmfDtlwiXG4gICAgfSxcbiAgICBcInNyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNlcmJpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgdGA0L/RgdC60Lgg0ZjQtdC30LjQulwiXG4gICAgfSxcbiAgICBcImdkXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNjb3R0aXNoIEdhZWxpYzsgR2FlbGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiR8OgaWRobGlnXCJcbiAgICB9LFxuICAgIFwic25cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2hvbmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJjaGlTaG9uYVwiXG4gICAgfSxcbiAgICBcInNpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNpbmhhbGEsIFNpbmhhbGVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC3g+C3kuC2guC3hOC2vVwiXG4gICAgfSxcbiAgICBcInNrXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNsb3Zha1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInNsb3ZlbsSNaW5hXCJcbiAgICB9LFxuICAgIFwic2xcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2xvdmVuZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInNsb3ZlbsWhxI1pbmFcIlxuICAgIH0sXG4gICAgXCJzb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTb21hbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTb29tYWFsaWdhLCBhZiBTb29tYWFsaVwiXG4gICAgfSxcbiAgICBcInN0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNvdXRoZXJuIFNvdGhvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2Vzb3Rob1wiXG4gICAgfSxcbiAgICBcImVzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNwYW5pc2g7IENhc3RpbGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImVzcGHDsW9sLCBjYXN0ZWxsYW5vXCJcbiAgICB9LFxuICAgIFwic3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3VuZGFuZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQmFzYSBTdW5kYVwiXG4gICAgfSxcbiAgICBcInN3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlN3YWhpbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLaXN3YWhpbGlcIlxuICAgIH0sXG4gICAgXCJzc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTd2F0aVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNpU3dhdGlcIlxuICAgIH0sXG4gICAgXCJzdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTd2VkaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic3ZlbnNrYVwiXG4gICAgfSxcbiAgICBcInRhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRhbWlsXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4K6k4K6u4K6/4K604K+NXCJcbiAgICB9LFxuICAgIFwidGVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGVsdWd1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LCk4LGG4LCy4LGB4LCX4LGBXCJcbiAgICB9LFxuICAgIFwidGdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFqaWtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgtC+0rfQuNC606MsIHRvxJ9pa8SrLCDYqtin2KzbjNqp24zigI5cIlxuICAgIH0sXG4gICAgXCJ0aFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUaGFpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LmE4LiX4LiiXCJcbiAgICB9LFxuICAgIFwidGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGlncmlueWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhibXhjI3hiK3hiptcIlxuICAgIH0sXG4gICAgXCJib1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUaWJldGFuIFN0YW5kYXJkLCBUaWJldGFuLCBDZW50cmFsXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4L2W4L284L2R4LyL4L2h4L2y4L2CXCJcbiAgICB9LFxuICAgIFwidGtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHVya21lblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlTDvHJrbWVuLCDQotKv0YDQutC80LXQvVwiXG4gICAgfSxcbiAgICBcInRsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRhZ2Fsb2dcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJXaWthbmcgVGFnYWxvZywg4ZyP4ZyS4ZyD4ZyF4ZyUIOGchuGchOGcjuGck+GchOGclFwiXG4gICAgfSxcbiAgICBcInRuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRzd2FuYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNldHN3YW5hXCJcbiAgICB9LFxuICAgIFwidG9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVG9uZ2EgKFRvbmdhIElzbGFuZHMpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZmFrYSBUb25nYVwiXG4gICAgfSxcbiAgICBcInRyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlR1cmtpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUw7xya8OnZVwiXG4gICAgfSxcbiAgICBcInRzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRzb25nYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlhpdHNvbmdhXCJcbiAgICB9LFxuICAgIFwidHRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGF0YXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgtCw0YLQsNGA0YfQsCwgdGF0YXLDp2EsINiq2KfYqtin2LHahtin4oCOXCJcbiAgICB9LFxuICAgIFwidHdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHdpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVHdpXCJcbiAgICB9LFxuICAgIFwidHlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFoaXRpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJSZW8gVGFoaXRpXCJcbiAgICB9LFxuICAgIFwidWdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVWlnaHVyLCBVeWdodXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJVecajdXJxyZksINim24fZiti624fYsdqG25XigI5cIlxuICAgIH0sXG4gICAgXCJ1a1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJVa3JhaW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRg9C60YDQsNGX0L3RgdGM0LrQsFwiXG4gICAgfSxcbiAgICBcInVyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlVyZHVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLYp9ix2K/ZiFwiXG4gICAgfSxcbiAgICBcInV6XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlV6YmVrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiemJlaywg0I7Qt9Cx0LXQuiwg2KPbh9iy2KjbkNmD4oCOXCJcbiAgICB9LFxuICAgIFwidmVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVmVuZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUc2hpdmVu4biTYVwiXG4gICAgfSxcbiAgICBcInZpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlZpZXRuYW1lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUaeG6v25nIFZp4buHdFwiXG4gICAgfSxcbiAgICBcInZvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlZvbGFww7xrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVm9sYXDDvGtcIlxuICAgIH0sXG4gICAgXCJ3YVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXYWxsb29uXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiV2Fsb25cIlxuICAgIH0sXG4gICAgXCJjeVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXZWxzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkN5bXJhZWdcIlxuICAgIH0sXG4gICAgXCJ3b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXb2xvZlwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIldvbGxvZlwiXG4gICAgfSxcbiAgICBcImZ5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldlc3Rlcm4gRnJpc2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkZyeXNrXCJcbiAgICB9LFxuICAgIFwieGhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiWGhvc2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJpc2lYaG9zYVwiXG4gICAgfSxcbiAgICBcInlpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIllpZGRpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLXmdeZ1rTXk9eZ16lcIlxuICAgIH0sXG4gICAgXCJ5b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJZb3J1YmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJZb3LDuWLDoVwiXG4gICAgfSxcbiAgICBcInphXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlpodWFuZywgQ2h1YW5nXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2HJryBjdWXFi8aFLCBTYXcgY3VlbmdoXCJcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2RhdGEvbGFuZ3VhZ2VzLmpzIiwiXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXJUeXBlcz0ge1xyXG4gICAgQUREX1JJR0hUOidBRERfUklHSFQnLFxyXG4gICAgUkVNT1ZFX1JJR0hUIDogJ1JFTU9WRV9SSUdIVCcsXHJcbiAgICBVUERBVEVfQ09VTlRSSUVTIDogJ1VQREFURV9DT1VOVFJJRVMnLFxyXG4gICAgVVBEQVRFX0VYQ0xVU0lWRSA6ICdVUERBVEVfRVhDTFVTSVZFJyxcclxuICAgIFVQREFURV9JTkNMVURFRF9DT1VOVFJJRVMgOiAnVVBEQVRFX0lOQ0xVREVEX0NPVU5UUklFUycsXHJcbiAgICBVUERBVEVfU1BPUlQgOiAnVVBEQVRFX1NQT1JUJyxcclxuICAgIFVQREFURV9FVkVOVCA6ICdVUERBVEVfRVZFTlQnLFxyXG4gICAgQ0xFQVIgOiAnQ0xFQVInLFxyXG4gICAgQ0xFQVJfVVBEQVRFIDogJ0NMRUFSX1VQREFURScsXHJcbiAgICBVUERBVEVfTUFOWSA6ICdVUERBVEVfTUFOWScsXHJcbiAgICBVUERBVEVfRklMVEVSU19DT05GSUc6IFwiVVBEQVRFX0FMTFwiXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0RmlsdGVyID0ge1xyXG4gICAgcmlnaHRzOiBbXSxcclxuICAgIGNvdW50cmllczogW10sXHJcbiAgICBleGNsdXNpdmUgOiBmYWxzZSxcclxuICAgIGluY2x1ZGVBbGxDb3VudHJpZXMgOiBmYWxzZSxcclxuICAgIHNwb3J0OiB7XHJcbiAgICAgICAgdmFsdWUgOiBudWxsLFxyXG4gICAgICAgIGxhYmVsIDogXCJBbGwgc3BvcnRzXCJcclxuICAgIH0sXHJcbiAgICBldmVudCA6IFwiXCIsXHJcbiAgICBmb3JjZVVwZGF0ZSA6IHRydWUsXHJcbiAgICBzeW5jV2l0aExvY2FsU3RvcmFnZTogZmFsc2VcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSAoc3RhdGUgPSBkZWZhdWx0RmlsdGVyLCBhY3Rpb24pID0+IHtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfSU5DTFVERURfQ09VTlRSSUVTOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGluY2x1ZGVBbGxDb3VudHJpZXM6IGFjdGlvbi5pbmNsdWRlQWxsQ291bnRyaWVzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuQ0xFQVI6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGVmYXVsdEZpbHRlcik7XHJcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5DTEVBUl9VUERBVEU6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgZm9yY2VVcGRhdGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuQUREX1JJR0hUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0czogWy4uLnN0YXRlLnJpZ2h0cywgYWN0aW9uLmlkXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlJFTU9WRV9SSUdIVDpcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHN0YXRlLnJpZ2h0cy5pbmRleE9mKGFjdGlvbi5pZCk7XHJcbiAgICAgICAgICAgIHN0YXRlLnJpZ2h0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0czogWy4uLnN0YXRlLnJpZ2h0c11cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfQ09VTlRSSUVTOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGNvdW50cmllczogYWN0aW9uLmNvdW50cmllcy5tYXAoYz0+Yy52YWx1ZSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfRVhDTFVTSVZFOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGV4Y2x1c2l2ZTogYWN0aW9uLmV4Y2x1c2l2ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9TUE9SVDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzcG9ydDogYWN0aW9uLnNwb3J0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0ZJTFRFUlNfQ09ORklHOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5maWx0ZXJzKTtcclxuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9FVkVOVDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBldmVudDogYWN0aW9uLmV2ZW50XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX01BTlk6XHJcbiAgICAgICAgICAgIGFjdGlvbi5maWx0ZXJzLmZvcmNlVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGFjdGlvbi5maWx0ZXJzLnJpZ2h0cykgYWN0aW9uLmZpbHRlcnMucmlnaHRzID0gYWN0aW9uLmZpbHRlcnMucmlnaHRzLm1hcChyPT5OdW1iZXIocikpO1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdEZpbHRlciwgYWN0aW9uLmZpbHRlcnMpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvZmlsdGVyLmpzIiwiXG5leHBvcnQgY29uc3QgbWFya2V0cGxhY2VUeXBlcz0ge1xuICAgIFRFU1Q6J1RFU1QnLFxufTtcblxuZXhwb3J0IGNvbnN0IG1hcmtldHBsYWNlID0gKHN0YXRlID0ge1xuICAgIHRlc3RJdGVtOiBcIm1hcmtldHBsYWNlUmVkdWNlclwiXG5cbn0sIGFjdGlvbikgPT4ge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIG1hcmtldHBsYWNlVHlwZXMuVEVTVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIHRlc3Q6IGFjdGlvbi50ZXh0LFxuICAgICAgICAgICAgICAgIGlkIDogYWN0aW9uLmlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9yZWR1Y2Vycy9tYXJrZXRwbGFjZS5qcyIsIi8qKlxyXG4qIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiovXHJcblxyXG5sZXQgX19hcGlTdG9yZSA9IHtcclxuICAgIHRvdXJuYW1lbnRzIDoge31cclxufTtcclxuXHJcbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG5Db250ZW50QXJlbmEuQ29udGVudEFwaSA9IENvbnRlbnRBcmVuYS5Db250ZW50QXBpfHwge307XHJcblxyXG5Db250ZW50QXJlbmEuQ29udGVudEFwaT0ge1xyXG4gICAgc2F2ZUNvbnRlbnRBc0RyYWZ0ICggY29udGVudCApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvZHJhZnQvc2F2ZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgc2F2ZUNvbnRlbnRBc0luYWN0aXZlICggY29udGVudCApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5nL3NhdmVcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIHNhdmVDb250ZW50QXNBY3RpdmUgKCBjb250ZW50ICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmcvcHVibGlzaFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgcmVwdWJsaXNoTGlzdGluZyAoIGN1c3RvbUlkICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmcvcmVwdWJsaXNoXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y3VzdG9tSWQ6IGN1c3RvbUlkfSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgc2VuZE1lc3NhZ2UgKCBtZXNzYWdlICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3NlbmRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFVzZXJJbmZvICggKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9pbmZvXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFVzZXJJbmZvQnlBY3RpdmF0aW9uQ29kZSAoIGFjdGl2YXRpb25Db2RlICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvY29kZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBkYXRhIDogSlNPTi5zdHJpbmdpZnkoe2FjdGl2YXRpb25Db2RlOiBhY3RpdmF0aW9uQ29kZX0pLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRDb21wYW55VXNlcnMgKCApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9jb21wYW55L3VzZXJzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZUNvbXBhbnkgKCBjb21wYW55ICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2NvbXBhbnkvdXBkYXRlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y29tcGFueTpjb21wYW55fSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlUGFzc3dvcmQgKCBkYXRhICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvcGFzc3dvcmRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZVVzZXIgKCB1c2VyICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvdXBkYXRlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXNlcjp1c2VyfSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgYWN0aXZhdGVVc2VyICggdXNlciwgcGFzc3dvcmQgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9hY3RpdmF0ZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXI6dXNlcixpZDogdXNlci5pZCwgcGFzc3dvcmQgOiBwYXNzd29yZH0pLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVVc2VyUHJvZmlsZSAoIHByb2ZpbGUgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9wcm9maWxlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7cHJvZmlsZTpwcm9maWxlfSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0VGhyZWFkICggY3VzdG9tSWQgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvdGhyZWFkXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y3VzdG9tSWQ6IGN1c3RvbUlkfSksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0VGhyZWFkcyAoICApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9tZXNzYWdlcy90aHJlYWRzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIHBsYWNlQmlkICggYmlkICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9wbGFjZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcclxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBhY2NlcHRCaWQgKCBiaWQsIHNpZ25hdHVyZSwgc2lnbmF0dXJlTmFtZSwgc2lnbmF0dXJlUG9zaXRpb24gKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgYmlkLnNpZ25hdHVyZSA9IHNpZ25hdHVyZTtcclxuICAgICAgICBiaWQuc2lnbmF0dXJlTmFtZSA9IHNpZ25hdHVyZU5hbWU7XHJcbiAgICAgICAgYmlkLnNpZ25hdHVyZVBvc2l0aW9uID0gc2lnbmF0dXJlUG9zaXRpb247XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9hY2NlcHRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgcmVqZWN0QmlkICggYmlkICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZWplY3RcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlQmlkICggYmlkICkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZW1vdmVcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNhdmVUbXBGaWxlICggZmlsZXMgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlJywgZmlsZXNbMF0pO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvc2F2ZS9maWxlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgc2F2ZUF0dGFjaG1lbnRGaWxlICggZmlsZXMgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlJywgZmlsZXNbMF0pO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvc2F2ZS9hdHRhY2htZW50XCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZBSUxFRFwiKVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZUF0dGFjaG1lbnRGaWxlICggZmlsZSApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9yZW1vdmUvYXR0YWNobWVudFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgZmlsZSA6IGZpbGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZBSUxFRFwiKVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldEJ5Q3VzdG9tSWQgKCBjdXN0b21JZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImxpc3RpbmcvZGV0YWlsc1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldERyYWZ0TGlzdGluZ3MgKCApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZHJhZnRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldEluYWN0aXZlTGlzdGluZ3MgKCApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvaW5hY3RpdmVcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldEFjdGl2ZUxpc3RpbmdzICggKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2FjdGl2ZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0RXhwaXJlZExpc3RpbmdzICggKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2V4cGlyZWRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL3JlbW92ZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZHVwbGljYXRlTGlzdGluZyggY3VzdG9tSWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZHVwbGljYXRlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBkZWFjdGl2YXRlTGlzdGluZyggY3VzdG9tSWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbGlzdGluZ3MvZGVhY3RpdmF0ZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgYXJjaGl2ZUxpc3RpbmcoIGN1c3RvbUlkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2FyY2hpdmVcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRDbG9zZWREZWFscyAoICApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL2Nsb3NlZFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRBbGxEZWFscyAoICApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL2FsbFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRQZW5kaW5nRGVhbHMgKCAgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9wZW5kaW5nXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFJlamVjdGVkRGVhbHMgKCAgKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZWplY3RlZFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRXYXRjaGxpc3RMaXN0aW5ncyAoKXtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy93YXRjaGxpc3RcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuXHJcbn07XHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmNvbnRlbnQuanMiLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxubGV0IF9fYXBpU3RvcmUgPSB7XHJcbiAgICB0b3VybmFtZW50cyA6IHt9XHJcbn07XHJcblxyXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5BcGk9IHtcclxuICAgIHNvcnRCeUxhYmVsIChhLCBiKSB7XHJcbiAgICAgICAgcmV0dXJuIChhLm5hbWUgPiBiLm5hbWUpID8gMSA6ICgoYi5uYW1lID4gYS5uYW1lKSA/IC0xIDogMClcclxuICAgIH0sXHJcbiAgICBzb3J0QnlTcG9ydCAoYSwgYikge1xyXG5cclxuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lID4gYi5zcG9ydC5uYW1lKSByZXR1cm4gMTtcclxuICAgICAgICBpZiAoYS5zcG9ydC5uYW1lIDwgYi5zcG9ydC5uYW1lKSByZXR1cm4gLTE7XHJcbiAgICAgICAgaWYgKGEuc3BvcnRDYXRlZ29yeS5uYW1lID4gYi5zcG9ydENhdGVnb3J5Lm5hbWUpIHJldHVybiAxO1xyXG4gICAgICAgIGlmIChhLnNwb3J0Q2F0ZWdvcnkubmFtZSA8IGIuc3BvcnRDYXRlZ29yeS5uYW1lKSByZXR1cm4gLTE7XHJcbiAgICAgICAgaWYgKGEubmFtZSA+IGIubmFtZSkgcmV0dXJuIDE7XHJcbiAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkgcmV0dXJuIC0xO1xyXG4gICAgICAgIHJldHVybiAwO1xyXG5cclxuICAgIH0sXHJcbiAgICBwcmVwYXJlTGlzdCAoIGxpc3QsIGNhdGVnb3J5SWQgKSB7XHJcblxyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGxpc3QgPSAkLm1hcChsaXN0LCBmdW5jdGlvbiAoaXRlbSkge1xyXG5cclxuICAgICAgICAgICAgLy8gRmlsdGVyIGJ5IGNhdGVnb3J5XHJcbiAgICAgICAgICAgIGlmICggY2F0ZWdvcnlJZCAmJiBpdGVtLmNhdGVnb3J5WydAYXR0cmlidXRlcyddLmlkICE9IGNhdGVnb3J5SWQpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBpdGVtWydAYXR0cmlidXRlcyddLm5hbWUsIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWR9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxpc3Quc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfSxcclxuICAgIGZpbHRlckRvdWJsZXMgKCBsaXN0LCBzcG9ydElkICl7XHJcbiAgICAgICAgbGV0IG5hbWVzID0gW107XHJcblxyXG4gICAgICAgIGlmICggc3BvcnRJZCA9PT0gXCJzcjpzcG9ydDo1XCIgKXtcclxuICAgICAgICAgICAgbGlzdCA9IGxpc3QubWFwKGl0ZW09PntcclxuICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGl0ZW0ubmFtZS5yZXBsYWNlKC8gc2luZ2xlcy9naSwnJykucmVwbGFjZSgvIGRvdWJsZS9naSwnJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfSkuZmlsdGVyKGl0ZW09PntcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lcy5pbmRleE9mKGl0ZW0ubmFtZSkgPT09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKGl0ZW0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfSxcclxuICAgIGdldENvbnRlbnQgKCBmaWx0ZXIpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJidXkvc2VhcmNoXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRKc29uQ29udGVudCAoIGZpbHRlcikge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImxpc3RpbmdzL21hcmtldHBsYWNlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBzYXZlRmlsdGVyICggZmlsdGVyKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L2ZpbHRlci9zYXZlXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRDb3VudHJpZXMgKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICggQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzICYmIENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcy5sZW5ndGggPiAwICl7XHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL2NvdW50cmllcy9hbGxcIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHJlc3BvbnNlLm1hcChjPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGMucmVnaW9ucyA9IGMucmVnaW9ucy5tYXAocj0+ci5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuZXh0ZXJuYWxJZCA9IGMuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcyA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRBY3RpdmVTcG9ydHMgKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3Nwb3J0cy9hY3RpdmVcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0Q291bnRyaWVzRnVsbCAoKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvY291bnRyaWVzL2Z1bGxcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRUZXJyaXRvcmllcyAoKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvdGVycml0b3JpZXNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRSZWdpb25zICgpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9yZWdpb25zXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0UmlnaHRzIChyaWdodHNQYWNrYWdlLCBncm91cCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3JpZ2h0c1wiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2U6IHJpZ2h0c1BhY2thZ2UsXHJcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0UmlnaHRzUGFja2FnZSAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9yaWdodHMtcGFja2FnZVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2U6IHJpZ2h0c1BhY2thZ2UsXHJcbiAgICAgICAgICAgICAgICBncm91cDogZ3JvdXBcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0U3BvcnRzICgpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZXh0ZXJuYWxBcGlVcmwgKyBcInYxL2ZlZWQvc3BvcnRzXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcGFyYW0ge3tzcG9ydDpvYmplY3R9fSByZXNwb25zZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHNwb3J0cyA9IF90aGlzLnByZXBhcmVMaXN0KCByZXNwb25zZS5zcG9ydCk7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNwb3J0cyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldENvbnRlbnREZXRhaWxzKCBpZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvZGV0YWlscy9cIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtpZCA6IGlkfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0UGVuZGluZ0xpc3RpbmdzKCBpZCApIHtcclxuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcclxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvcGVuZGluZy1saXN0aW5ncy9cIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtpZCA6IGlkfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0Q2F0ZWdvcmllcyAoIHNwb3J0SWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcyxcclxuICAgICAgICAgICAgbGlzdCA9IFtdLFxyXG4gICAgICAgICAgICBjYXRzID0gW107XHJcblxyXG4gICAgICAgIF90aGlzLmdldFRvdXJuYW1lbnRzKHNwb3J0SWQpLmRvbmUoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCBbXSApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsaXN0ID0gJC5tYXAoIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0udG91cm5hbWVudCAsIGZ1bmN0aW9uIChpdGVtKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaXRlbS5jYXRlZ29yeVsnQGF0dHJpYnV0ZXMnXS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGNhdHMuaW5kZXhPZihpZCkgIT09IC0xICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXRzLnB1c2goIGlkICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2F0ZWdvcnk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShfdGhpcy5wcmVwYXJlTGlzdChsaXN0KSApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICBnZXRUb3VybmFtZW50cyAoIHNwb3J0SWQsIGNhdGVnb3J5SWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcywgc3RvcmVkUmVzcG9uc2U7XHJcblxyXG4gICAgICAgIGlmICggX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSAhPT0gdW5kZWZpbmVkICl7XHJcblxyXG4gICAgICAgICAgICBzdG9yZWRSZXNwb25zZSA9IF90aGlzLnByZXBhcmVMaXN0KF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0udG91cm5hbWVudCwgY2F0ZWdvcnlJZClcclxuICAgICAgICAgICAgc3RvcmVkUmVzcG9uc2UgPSBfdGhpcy5maWx0ZXJEb3VibGVzKHN0b3JlZFJlc3BvbnNlLHNwb3J0SWQpO1xyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHN0b3JlZFJlc3BvbnNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZXh0ZXJuYWxBcGlVcmwgKyBcInYxL2ZlZWQvdG91cm5hbWVudHNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogc3BvcnRJZCB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEEgY29tbWVudFxyXG4gICAgICAgICAgICAgICAgaWYgKCByZXNwb25zZS50b3VybmFtZW50cyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnRvdXJuYW1lbnRzLnRvdXJuYW1lbnQgPT09IHVuZGVmaW5lZCApIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSA9IHJlc3BvbnNlLnRvdXJuYW1lbnRzO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gX3RoaXMucHJlcGFyZUxpc3QocmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCwgY2F0ZWdvcnlJZCk7XHJcbiAgICAgICAgICAgICAgICBsaXN0ID0gX3RoaXMuZmlsdGVyRG91YmxlcyhsaXN0LCBzcG9ydElkKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFNlYXNvbnMgKCB0b3VybmFtZW50SWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC9zZWFzb25zXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHRvdXJuYW1lbnRJZCB9LFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBsaXN0O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc2Vhc29ucyA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uID09PSB1bmRlZmluZWQgKXtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCAkLmlzQXJyYXkocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24pICl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9ICQubWFwKHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uZW5kX2RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogaXRlbVsnQGF0dHJpYnV0ZXMnXS55ZWFyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZXJuYWxJZDogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLmVuZF9kYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLnN0YXJ0X2RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRJZDogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10udG91cm5hbWVudF9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10ueWVhcixcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIGdldFNjaGVkdWxlICggc2Vhc29uSWQgKSB7XHJcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXHJcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC9zY2hlZHVsZXNcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogc2Vhc29uSWQgfSxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3BvcnRfZXZlbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50ID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50LmZvckVhY2goIChpdGVtKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3VuZCAgPSAoaXRlbS50b3VybmFtZW50X3JvdW5kKSA/IGl0ZW0udG91cm5hbWVudF9yb3VuZFsnQGF0dHJpYnV0ZXMnXSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcm91bmQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSAocm91bmQubnVtYmVyKSA/IFwicm91bmRfXCIgKyByb3VuZC5udW1iZXIgOiByb3VuZC5uYW1lO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoICFsaXN0W25hbWVdICkgbGlzdFtuYW1lXSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoICFsaXN0W25hbWVdLm1hdGNoZXMgKSBsaXN0W25hbWVdLm1hdGNoZXMgPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RbbmFtZV0ubWF0Y2hlcy5zZXQoaXRlbVsnQGF0dHJpYnV0ZXMnXS5pZCx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zY2hlZHVsZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRSb3VuZCA6IHJvdW5kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wZXRpdG9ycyA6IChpdGVtLmNvbXBldGl0b3JzKSA/IGl0ZW0uY29tcGV0aXRvcnMuY29tcGV0aXRvci5tYXAoKCBjb21wZXRpdG9yKT0+eyByZXR1cm4gY29tcGV0aXRvclsnQGF0dHJpYnV0ZXMnXSAgfSkgIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xyXG4gICAgfSxcclxuICAgIHNlYXJjaENvbXBldGl0aW9uKHJlcXVlc3QpIHtcclxuXHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgJ2FwaS9zZWFyY2gvdG91cm5hbWVudCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiByZXF1ZXN0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRyYWRpdGlvbmFsOiB0cnVlLFxyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEuZmlsdGVyKGl0ZW0gPT4gISFpdGVtLnNwb3J0KS5zb3J0KF90aGlzLnNvcnRCeVNwb3J0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcclxuICAgIH0sXHJcbiAgICB3YXRjaGxpc3QoIGlkICkge1xyXG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxyXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3dhdGNobGlzdC9hZGRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtpZCA6IGlkfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0Tm90aWZpY2F0aW9ucygpIHtcclxuICAgICAgICByZXR1cm4gYXhpb3MuZ2V0KGAke2Vudmhvc3R1cmx9YXBpL25vdGlmaWNhdGlvbnMvYCk7XHJcbiAgICB9LFxyXG4gICAgbWFya05vdGlmaWNhdGlvbkFzU2VlbihpZCkge1xyXG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KGAke2Vudmhvc3R1cmx9YXBpL25vdGlmaWNhdGlvbnMvc2VlbmAsIHtcclxuICAgICAgICAgICAgaWRcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuYXBpLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XHJcblxyXG5Db250ZW50QXJlbmEuRGF0YSA9IENvbnRlbnRBcmVuYS5EYXRhIHx8IHt9O1xyXG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzID0gQ29udGVudEFyZW5hLkxhbmd1YWdlcyB8fCB7fTtcclxuXHJcbkNvbnRlbnRBcmVuYS5EYXRhLlRvcFNwb3J0cyA9IFtcclxuICAgIHsgbmFtZSA6IFwiU29jY2VyXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MVwifSxcclxuICAgIHsgbmFtZSA6IFwiQmFza2V0YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjJcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkJhc2ViYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6M1wifSxcclxuICAgIHsgbmFtZSA6IFwiVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6NVwifSxcclxuICAgIHsgbmFtZSA6IFwiQ3JpY2tldFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIxXCJ9LFxyXG4gICAgeyBuYW1lIDogXCJGaWVsZCBIb2NrZXlcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyNFwifSxcclxuICAgIHsgbmFtZSA6IFwiVm9sbGV5YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIzXCJ9LFxyXG4gICAgeyBuYW1lIDogXCJUYWJsZSBUZW5uaXNcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMFwifSxcclxuICAgIHsgbmFtZSA6IFwiR29sZlwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjlcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkFtZXJpY2FuIEZvb3RiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MTZcIn0sXHJcbiAgICB7IG5hbWUgOiBcIkhhbmRiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6NlwifVxyXG5dO1xyXG5cclxuQ29udGVudEFyZW5hLkRhdGEuRnVsbFNwb3J0cyA9IFtdO1xyXG5Db250ZW50QXJlbmEuRGF0YS5BY3RpdmVTcG9ydHMgPSBbXTtcclxuQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gW107XHJcbkNvbnRlbnRBcmVuYS5EYXRhLlRlcnJpdG9yaWVzID0gW107XHJcbkNvbnRlbnRBcmVuYS5EYXRhLlJlZ2lvbnMgPSBbXTtcclxuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5TaG9ydCA9IHtcclxuICAgIFwibWRyXCI6IFwiTWFuZGFyaW5cIixcclxuICAgIFwiZXNcIjogXCJTcGFuaXNoXCIsXHJcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxyXG4gICAgXCJoaVwiOiBcIkhpbmRpXCIsXHJcbiAgICBcImFyXCI6IFwiQXJhYmljXCIsXHJcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxyXG4gICAgXCJiblwiOiBcIkJlbmdhbGlcIixcclxuICAgIFwicnVcIjogXCJSdXNzaWFuXCIsXHJcbiAgICBcImphXCI6IFwiSmFwYW5lc2VcIixcclxuICAgIFwianZcIjogXCJKYXZhbmVzZVwiLFxyXG4gICAgXCJkZVwiOiBcIkdlcm1hblwiLFxyXG4gICAgXCJhbGxcIiA6IFwiU2hvdyBBbGxcIlxyXG59O1xyXG5cclxuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5Mb25nID0ge1xyXG4gICAgXCJhYVwiOiBcIkFmYXJcIixcclxuICAgIFwiYWZcIjogXCJBZnJpa2FhbnNcIixcclxuICAgIFwiYWluXCI6IFwiQWludVwiLFxyXG4gICAgXCJha3pcIjogXCJBbGFiYW1hXCIsXHJcbiAgICBcInNxXCI6IFwiQWxiYW5pYW5cIixcclxuICAgIFwiYWxlXCI6IFwiQWxldXRcIixcclxuICAgIFwiYXJxXCI6IFwiQWxnZXJpYW4gQXJhYmljXCIsXHJcbiAgICBcImVuX1VTXCI6IFwiQW1lcmljYW4gRW5nbGlzaFwiLFxyXG4gICAgXCJhc2VcIjogXCJBbWVyaWNhbiBTaWduIExhbmd1YWdlXCIsXHJcbiAgICBcImFtXCI6IFwiQW1oYXJpY1wiLFxyXG4gICAgXCJlZ3lcIjogXCJBbmNpZW50IEVneXB0aWFuXCIsXHJcbiAgICBcImdyY1wiOiBcIkFuY2llbnQgR3JlZWtcIixcclxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcclxuICAgIFwiYXJjXCI6IFwiQXJhbWFpY1wiLFxyXG4gICAgXCJhcnBcIjogXCJBcmFwYWhvXCIsXHJcbiAgICBcImFyd1wiOiBcIkFyYXdha1wiLFxyXG4gICAgXCJoeVwiOiBcIkFybWVuaWFuXCIsXHJcbiAgICBcImFzXCI6IFwiQXNzYW1lc2VcIixcclxuICAgIFwiYXNhXCI6IFwiQXN1XCIsXHJcbiAgICBcImVuX0FVXCI6IFwiQXVzdHJhbGlhbiBFbmdsaXNoXCIsXHJcbiAgICBcImRlX0FUXCI6IFwiQXVzdHJpYW4gR2VybWFuXCIsXHJcbiAgICBcImF5XCI6IFwiQXltYXJhXCIsXHJcbiAgICBcImF6XCI6IFwiQXplcmJhaWphbmlcIixcclxuICAgIFwiYmFuXCI6IFwiQmFsaW5lc2VcIixcclxuICAgIFwiZXVcIjogXCJCYXNxdWVcIixcclxuICAgIFwiYmFyXCI6IFwiQmF2YXJpYW5cIixcclxuICAgIFwiYmVcIjogXCJCZWxhcnVzaWFuXCIsXHJcbiAgICBcImJuXCI6IFwiQmVuZ2FsaVwiLFxyXG4gICAgXCJiaWtcIjogXCJCaWtvbFwiLFxyXG4gICAgXCJiaW5cIjogXCJCaW5pXCIsXHJcbiAgICBcImJzXCI6IFwiQm9zbmlhblwiLFxyXG4gICAgXCJicmhcIjogXCJCcmFodWlcIixcclxuICAgIFwiYnJhXCI6IFwiQnJhalwiLFxyXG4gICAgXCJwdF9CUlwiOiBcIkJyYXppbGlhbiBQb3J0dWd1ZXNlXCIsXHJcbiAgICBcImJyXCI6IFwiQnJldG9uXCIsXHJcbiAgICBcImVuX0dCXCI6IFwiQnJpdGlzaCBFbmdsaXNoXCIsXHJcbiAgICBcImJnXCI6IFwiQnVsZ2FyaWFuXCIsXHJcbiAgICBcIm15XCI6IFwiQnVybWVzZVwiLFxyXG4gICAgXCJmcmNcIjogXCJDYWp1biBGcmVuY2hcIixcclxuICAgIFwiZW5fQ0FcIjogXCJDYW5hZGlhbiBFbmdsaXNoXCIsXHJcbiAgICBcImZyX0NBXCI6IFwiQ2FuYWRpYW4gRnJlbmNoXCIsXHJcbiAgICBcInl1ZVwiOiBcIkNhbnRvbmVzZVwiLFxyXG4gICAgXCJjYXJcIjogXCJDYXJpYlwiLFxyXG4gICAgXCJjYVwiOiBcIkNhdGFsYW5cIixcclxuICAgIFwiY2F5XCI6IFwiQ2F5dWdhXCIsXHJcbiAgICBcImNlYlwiOiBcIkNlYnVhbm9cIixcclxuICAgIFwic2h1XCI6IFwiQ2hhZGlhbiBBcmFiaWNcIixcclxuICAgIFwiY2VcIjogXCJDaGVjaGVuXCIsXHJcbiAgICBcImNoclwiOiBcIkNoZXJva2VlXCIsXHJcbiAgICBcInF1Z1wiOiBcIkNoaW1ib3Jhem8gSGlnaGxhbmQgUXVpY2h1YVwiLFxyXG4gICAgXCJ6aFwiOiBcIkNoaW5lc2VcIixcclxuICAgIFwiY2huXCI6IFwiQ2hpbm9vayBKYXJnb25cIixcclxuICAgIFwiY2hwXCI6IFwiQ2hpcGV3eWFuXCIsXHJcbiAgICBcImNob1wiOiBcIkNob2N0YXdcIixcclxuICAgIFwiY3VcIjogXCJDaHVyY2ggU2xhdmljXCIsXHJcbiAgICBcImN2XCI6IFwiQ2h1dmFzaFwiLFxyXG4gICAgXCJud2NcIjogXCJDbGFzc2ljYWwgTmV3YXJpXCIsXHJcbiAgICBcInN5Y1wiOiBcIkNsYXNzaWNhbCBTeXJpYWNcIixcclxuICAgIFwic3djXCI6IFwiQ29uZ28gU3dhaGlsaVwiLFxyXG4gICAgXCJjb3BcIjogXCJDb3B0aWNcIixcclxuICAgIFwia3dcIjogXCJDb3JuaXNoXCIsXHJcbiAgICBcImNvXCI6IFwiQ29yc2ljYW5cIixcclxuICAgIFwiY3JcIjogXCJDcmVlXCIsXHJcbiAgICBcIm11c1wiOiBcIkNyZWVrXCIsXHJcbiAgICBcImNyaFwiOiBcIkNyaW1lYW4gVHVya2lzaFwiLFxyXG4gICAgXCJoclwiOiBcIkNyb2F0aWFuXCIsXHJcbiAgICBcImNzXCI6IFwiQ3plY2hcIixcclxuICAgIFwiZGFrXCI6IFwiRGFrb3RhXCIsXHJcbiAgICBcImRhXCI6IFwiRGFuaXNoXCIsXHJcbiAgICBcImRlbFwiOiBcIkRlbGF3YXJlXCIsXHJcbiAgICBcIm5sXCI6IFwiRHV0Y2hcIixcclxuICAgIFwiZnJzXCI6IFwiRWFzdGVybiBGcmlzaWFuXCIsXHJcbiAgICBcImFyelwiOiBcIkVneXB0aWFuIEFyYWJpY1wiLFxyXG4gICAgXCJlblwiOiBcIkVuZ2xpc2hcIixcclxuICAgIFwiZW9cIjogXCJFc3BlcmFudG9cIixcclxuICAgIFwiZXRcIjogXCJFc3RvbmlhblwiLFxyXG4gICAgXCJwdF9QVFwiOiBcIkV1cm9wZWFuIFBvcnR1Z3Vlc2VcIixcclxuICAgIFwiZXNfRVNcIjogXCJFdXJvcGVhbiBTcGFuaXNoXCIsXHJcbiAgICBcImVlXCI6IFwiRXdlXCIsXHJcbiAgICBcImZhblwiOiBcIkZhbmdcIixcclxuICAgIFwiaGlmXCI6IFwiRmlqaSBIaW5kaVwiLFxyXG4gICAgXCJmalwiOiBcIkZpamlhblwiLFxyXG4gICAgXCJmaWxcIjogXCJGaWxpcGlub1wiLFxyXG4gICAgXCJmaVwiOiBcIkZpbm5pc2hcIixcclxuICAgIFwibmxfQkVcIjogXCJGbGVtaXNoXCIsXHJcbiAgICBcImZvblwiOiBcIkZvblwiLFxyXG4gICAgXCJmclwiOiBcIkZyZW5jaFwiLFxyXG4gICAgXCJnYWFcIjogXCJHYVwiLFxyXG4gICAgXCJnYW5cIjogXCJHYW4gQ2hpbmVzZVwiLFxyXG4gICAgXCJrYVwiOiBcIkdlb3JnaWFuXCIsXHJcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXHJcbiAgICBcImdvdFwiOiBcIkdvdGhpY1wiLFxyXG4gICAgXCJncmJcIjogXCJHcmVib1wiLFxyXG4gICAgXCJlbFwiOiBcIkdyZWVrXCIsXHJcbiAgICBcImduXCI6IFwiR3VhcmFuaVwiLFxyXG4gICAgXCJndVwiOiBcIkd1amFyYXRpXCIsXHJcbiAgICBcImd1elwiOiBcIkd1c2lpXCIsXHJcbiAgICBcImhhaVwiOiBcIkhhaWRhXCIsXHJcbiAgICBcImh0XCI6IFwiSGFpdGlhblwiLFxyXG4gICAgXCJoYWtcIjogXCJIYWtrYSBDaGluZXNlXCIsXHJcbiAgICBcImhhXCI6IFwiSGF1c2FcIixcclxuICAgIFwiaGF3XCI6IFwiSGF3YWlpYW5cIixcclxuICAgIFwiaGVcIjogXCJIZWJyZXdcIixcclxuICAgIFwiaHpcIjogXCJIZXJlcm9cIixcclxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxyXG4gICAgXCJoaXRcIjogXCJIaXR0aXRlXCIsXHJcbiAgICBcImhtblwiOiBcIkhtb25nXCIsXHJcbiAgICBcImh1XCI6IFwiSHVuZ2FyaWFuXCIsXHJcbiAgICBcImlzXCI6IFwiSWNlbGFuZGljXCIsXHJcbiAgICBcImlvXCI6IFwiSWRvXCIsXHJcbiAgICBcImlnXCI6IFwiSWdib1wiLFxyXG4gICAgXCJpdVwiOiBcIkludWt0aXR1dFwiLFxyXG4gICAgXCJpa1wiOiBcIkludXBpYXFcIixcclxuICAgIFwiZ2FcIjogXCJJcmlzaFwiLFxyXG4gICAgXCJpdFwiOiBcIkl0YWxpYW5cIixcclxuICAgIFwiamFtXCI6IFwiSmFtYWljYW4gQ3Jlb2xlIEVuZ2xpc2hcIixcclxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxyXG4gICAgXCJqdlwiOiBcIkphdmFuZXNlXCIsXHJcbiAgICBcImthalwiOiBcIkpqdVwiLFxyXG4gICAgXCJkeW9cIjogXCJKb2xhLUZvbnlpXCIsXHJcbiAgICBcInhhbFwiOiBcIkthbG15a1wiLFxyXG4gICAgXCJrYW1cIjogXCJLYW1iYVwiLFxyXG4gICAgXCJrYmxcIjogXCJLYW5lbWJ1XCIsXHJcbiAgICBcImtuXCI6IFwiS2FubmFkYVwiLFxyXG4gICAgXCJrclwiOiBcIkthbnVyaVwiLFxyXG4gICAgXCJrYWFcIjogXCJLYXJhLUthbHBha1wiLFxyXG4gICAgXCJrcmNcIjogXCJLYXJhY2hheS1CYWxrYXJcIixcclxuICAgIFwia3JsXCI6IFwiS2FyZWxpYW5cIixcclxuICAgIFwia3NcIjogXCJLYXNobWlyaVwiLFxyXG4gICAgXCJjc2JcIjogXCJLYXNodWJpYW5cIixcclxuICAgIFwia2F3XCI6IFwiS2F3aVwiLFxyXG4gICAgXCJra1wiOiBcIkthemFraFwiLFxyXG4gICAgXCJrZW5cIjogXCJLZW55YW5nXCIsXHJcbiAgICBcImtoYVwiOiBcIktoYXNpXCIsXHJcbiAgICBcImttXCI6IFwiS2htZXJcIixcclxuICAgIFwia2hvXCI6IFwiS2hvdGFuZXNlXCIsXHJcbiAgICBcImtod1wiOiBcIktob3dhclwiLFxyXG4gICAgXCJraVwiOiBcIktpa3V5dVwiLFxyXG4gICAgXCJrbWJcIjogXCJLaW1idW5kdVwiLFxyXG4gICAgXCJrcmpcIjogXCJLaW5hcmF5LWFcIixcclxuICAgIFwicndcIjogXCJLaW55YXJ3YW5kYVwiLFxyXG4gICAgXCJraXVcIjogXCJLaXJtYW5qa2lcIixcclxuICAgIFwidGxoXCI6IFwiS2xpbmdvblwiLFxyXG4gICAgXCJia21cIjogXCJLb21cIixcclxuICAgIFwia3ZcIjogXCJLb21pXCIsXHJcbiAgICBcImtvaVwiOiBcIktvbWktUGVybXlha1wiLFxyXG4gICAgXCJrZ1wiOiBcIktvbmdvXCIsXHJcbiAgICBcImtva1wiOiBcIktvbmthbmlcIixcclxuICAgIFwia29cIjogXCJLb3JlYW5cIixcclxuICAgIFwia2ZvXCI6IFwiS29yb1wiLFxyXG4gICAgXCJrb3NcIjogXCJLb3NyYWVhblwiLFxyXG4gICAgXCJhdmtcIjogXCJLb3RhdmFcIixcclxuICAgIFwia2hxXCI6IFwiS295cmEgQ2hpaW5pXCIsXHJcbiAgICBcInNlc1wiOiBcIktveXJhYm9ybyBTZW5uaVwiLFxyXG4gICAgXCJrcGVcIjogXCJLcGVsbGVcIixcclxuICAgIFwia3JpXCI6IFwiS3Jpb1wiLFxyXG4gICAgXCJralwiOiBcIkt1YW55YW1hXCIsXHJcbiAgICBcImt1bVwiOiBcIkt1bXlrXCIsXHJcbiAgICBcImt1XCI6IFwiS3VyZGlzaFwiLFxyXG4gICAgXCJrcnVcIjogXCJLdXJ1a2hcIixcclxuICAgIFwia3V0XCI6IFwiS3V0ZW5haVwiLFxyXG4gICAgXCJubWdcIjogXCJLd2FzaW9cIixcclxuICAgIFwia3lcIjogXCJLeXJneXpcIixcclxuICAgIFwicXVjXCI6IFwiS1xcdTAyYmNpY2hlXFx1MDJiY1wiLFxyXG4gICAgXCJsYWRcIjogXCJMYWRpbm9cIixcclxuICAgIFwibGFoXCI6IFwiTGFobmRhXCIsXHJcbiAgICBcImxrdFwiOiBcIkxha290YVwiLFxyXG4gICAgXCJsYW1cIjogXCJMYW1iYVwiLFxyXG4gICAgXCJsYWdcIjogXCJMYW5naVwiLFxyXG4gICAgXCJsb1wiOiBcIkxhb1wiLFxyXG4gICAgXCJsdGdcIjogXCJMYXRnYWxpYW5cIixcclxuICAgIFwibGFcIjogXCJMYXRpblwiLFxyXG4gICAgXCJlc180MTlcIjogXCJMYXRpbiBBbWVyaWNhbiBTcGFuaXNoXCIsXHJcbiAgICBcImx2XCI6IFwiTGF0dmlhblwiLFxyXG4gICAgXCJsenpcIjogXCJMYXpcIixcclxuICAgIFwibGV6XCI6IFwiTGV6Z2hpYW5cIixcclxuICAgIFwibGlqXCI6IFwiTGlndXJpYW5cIixcclxuICAgIFwibGlcIjogXCJMaW1idXJnaXNoXCIsXHJcbiAgICBcImxuXCI6IFwiTGluZ2FsYVwiLFxyXG4gICAgXCJsZm5cIjogXCJMaW5ndWEgRnJhbmNhIE5vdmFcIixcclxuICAgIFwibHpoXCI6IFwiTGl0ZXJhcnkgQ2hpbmVzZVwiLFxyXG4gICAgXCJsdFwiOiBcIkxpdGh1YW5pYW5cIixcclxuICAgIFwibGl2XCI6IFwiTGl2b25pYW5cIixcclxuICAgIFwiamJvXCI6IFwiTG9qYmFuXCIsXHJcbiAgICBcImxtb1wiOiBcIkxvbWJhcmRcIixcclxuICAgIFwibmRzXCI6IFwiTG93IEdlcm1hblwiLFxyXG4gICAgXCJzbGlcIjogXCJMb3dlciBTaWxlc2lhblwiLFxyXG4gICAgXCJkc2JcIjogXCJMb3dlciBTb3JiaWFuXCIsXHJcbiAgICBcImxvelwiOiBcIkxvemlcIixcclxuICAgIFwibHVcIjogXCJMdWJhLUthdGFuZ2FcIixcclxuICAgIFwibHVhXCI6IFwiTHViYS1MdWx1YVwiLFxyXG4gICAgXCJsdWlcIjogXCJMdWlzZW5vXCIsXHJcbiAgICBcInNtalwiOiBcIkx1bGUgU2FtaVwiLFxyXG4gICAgXCJsdW5cIjogXCJMdW5kYVwiLFxyXG4gICAgXCJsdW9cIjogXCJMdW9cIixcclxuICAgIFwibGJcIjogXCJMdXhlbWJvdXJnaXNoXCIsXHJcbiAgICBcImx1eVwiOiBcIkx1eWlhXCIsXHJcbiAgICBcIm1kZVwiOiBcIk1hYmFcIixcclxuICAgIFwibWtcIjogXCJNYWNlZG9uaWFuXCIsXHJcbiAgICBcImptY1wiOiBcIk1hY2hhbWVcIixcclxuICAgIFwibWFkXCI6IFwiTWFkdXJlc2VcIixcclxuICAgIFwibWFmXCI6IFwiTWFmYVwiLFxyXG4gICAgXCJtYWdcIjogXCJNYWdhaGlcIixcclxuICAgIFwidm1mXCI6IFwiTWFpbi1GcmFuY29uaWFuXCIsXHJcbiAgICBcIm1haVwiOiBcIk1haXRoaWxpXCIsXHJcbiAgICBcIm1ha1wiOiBcIk1ha2FzYXJcIixcclxuICAgIFwibWdoXCI6IFwiTWFraHV3YS1NZWV0dG9cIixcclxuICAgIFwia2RlXCI6IFwiTWFrb25kZVwiLFxyXG4gICAgXCJtZ1wiOiBcIk1hbGFnYXN5XCIsXHJcbiAgICBcIm1zXCI6IFwiTWFsYXlcIixcclxuICAgIFwibWxcIjogXCJNYWxheWFsYW1cIixcclxuICAgIFwibXRcIjogXCJNYWx0ZXNlXCIsXHJcbiAgICBcIm1uY1wiOiBcIk1hbmNodVwiLFxyXG4gICAgXCJtZHJcIjogXCJNYW5kYXJpblwiLFxyXG4gICAgXCJtYW5cIjogXCJNYW5kaW5nb1wiLFxyXG4gICAgXCJtbmlcIjogXCJNYW5pcHVyaVwiLFxyXG4gICAgXCJndlwiOiBcIk1hbnhcIixcclxuICAgIFwibWlcIjogXCJNYW9yaVwiLFxyXG4gICAgXCJhcm5cIjogXCJNYXB1Y2hlXCIsXHJcbiAgICBcIm1yXCI6IFwiTWFyYXRoaVwiLFxyXG4gICAgXCJjaG1cIjogXCJNYXJpXCIsXHJcbiAgICBcIm1oXCI6IFwiTWFyc2hhbGxlc2VcIixcclxuICAgIFwibXdyXCI6IFwiTWFyd2FyaVwiLFxyXG4gICAgXCJtYXNcIjogXCJNYXNhaVwiLFxyXG4gICAgXCJtem5cIjogXCJNYXphbmRlcmFuaVwiLFxyXG4gICAgXCJieXZcIjogXCJNZWR1bWJhXCIsXHJcbiAgICBcIm1lblwiOiBcIk1lbmRlXCIsXHJcbiAgICBcIm13dlwiOiBcIk1lbnRhd2FpXCIsXHJcbiAgICBcIm1lclwiOiBcIk1lcnVcIixcclxuICAgIFwibWdvXCI6IFwiTWV0YVxcdTAyYmNcIixcclxuICAgIFwiZXNfTVhcIjogXCJNZXhpY2FuIFNwYW5pc2hcIixcclxuICAgIFwibWljXCI6IFwiTWljbWFjXCIsXHJcbiAgICBcImR1bVwiOiBcIk1pZGRsZSBEdXRjaFwiLFxyXG4gICAgXCJlbm1cIjogXCJNaWRkbGUgRW5nbGlzaFwiLFxyXG4gICAgXCJmcm1cIjogXCJNaWRkbGUgRnJlbmNoXCIsXHJcbiAgICBcImdtaFwiOiBcIk1pZGRsZSBIaWdoIEdlcm1hblwiLFxyXG4gICAgXCJtZ2FcIjogXCJNaWRkbGUgSXJpc2hcIixcclxuICAgIFwibmFuXCI6IFwiTWluIE5hbiBDaGluZXNlXCIsXHJcbiAgICBcIm1pblwiOiBcIk1pbmFuZ2thYmF1XCIsXHJcbiAgICBcInhtZlwiOiBcIk1pbmdyZWxpYW5cIixcclxuICAgIFwibXdsXCI6IFwiTWlyYW5kZXNlXCIsXHJcbiAgICBcImx1c1wiOiBcIk1pem9cIixcclxuICAgIFwiYXJfMDAxXCI6IFwiTW9kZXJuIFN0YW5kYXJkIEFyYWJpY1wiLFxyXG4gICAgXCJtb2hcIjogXCJNb2hhd2tcIixcclxuICAgIFwibWRmXCI6IFwiTW9rc2hhXCIsXHJcbiAgICBcInJvX01EXCI6IFwiTW9sZGF2aWFuXCIsXHJcbiAgICBcImxvbFwiOiBcIk1vbmdvXCIsXHJcbiAgICBcIm1uXCI6IFwiTW9uZ29saWFuXCIsXHJcbiAgICBcIm1mZVwiOiBcIk1vcmlzeWVuXCIsXHJcbiAgICBcImFyeVwiOiBcIk1vcm9jY2FuIEFyYWJpY1wiLFxyXG4gICAgXCJtb3NcIjogXCJNb3NzaVwiLFxyXG4gICAgXCJtdWxcIjogXCJNdWx0aXBsZSBMYW5ndWFnZXNcIixcclxuICAgIFwibXVhXCI6IFwiTXVuZGFuZ1wiLFxyXG4gICAgXCJ0dHRcIjogXCJNdXNsaW0gVGF0XCIsXHJcbiAgICBcIm15ZVwiOiBcIk15ZW5lXCIsXHJcbiAgICBcIm5hcVwiOiBcIk5hbWFcIixcclxuICAgIFwibmFcIjogXCJOYXVydVwiLFxyXG4gICAgXCJudlwiOiBcIk5hdmFqb1wiLFxyXG4gICAgXCJuZ1wiOiBcIk5kb25nYVwiLFxyXG4gICAgXCJuYXBcIjogXCJOZWFwb2xpdGFuXCIsXHJcbiAgICBcIm5lXCI6IFwiTmVwYWxpXCIsXHJcbiAgICBcIm5ld1wiOiBcIk5ld2FyaVwiLFxyXG4gICAgXCJzYmFcIjogXCJOZ2FtYmF5XCIsXHJcbiAgICBcIm5uaFwiOiBcIk5naWVtYm9vblwiLFxyXG4gICAgXCJqZ29cIjogXCJOZ29tYmFcIixcclxuICAgIFwieXJsXCI6IFwiTmhlZW5nYXR1XCIsXHJcbiAgICBcIm5pYVwiOiBcIk5pYXNcIixcclxuICAgIFwibml1XCI6IFwiTml1ZWFuXCIsXHJcbiAgICBcInp4eFwiOiBcIk5vIGxpbmd1aXN0aWMgY29udGVudFwiLFxyXG4gICAgXCJub2dcIjogXCJOb2dhaVwiLFxyXG4gICAgXCJuZFwiOiBcIk5vcnRoIE5kZWJlbGVcIixcclxuICAgIFwiZnJyXCI6IFwiTm9ydGhlcm4gRnJpc2lhblwiLFxyXG4gICAgXCJzZVwiOiBcIk5vcnRoZXJuIFNhbWlcIixcclxuICAgIFwibnNvXCI6IFwiTm9ydGhlcm4gU290aG9cIixcclxuICAgIFwibm9cIjogXCJOb3J3ZWdpYW5cIixcclxuICAgIFwibmJcIjogXCJOb3J3ZWdpYW4gQm9rbVxcdTAwZTVsXCIsXHJcbiAgICBcIm5uXCI6IFwiTm9yd2VnaWFuIE55bm9yc2tcIixcclxuICAgIFwibm92XCI6IFwiTm92aWFsXCIsXHJcbiAgICBcIm51c1wiOiBcIk51ZXJcIixcclxuICAgIFwibnltXCI6IFwiTnlhbXdlemlcIixcclxuICAgIFwibnlcIjogXCJOeWFuamFcIixcclxuICAgIFwibnluXCI6IFwiTnlhbmtvbGVcIixcclxuICAgIFwidG9nXCI6IFwiTnlhc2EgVG9uZ2FcIixcclxuICAgIFwibnlvXCI6IFwiTnlvcm9cIixcclxuICAgIFwibnppXCI6IFwiTnppbWFcIixcclxuICAgIFwibnFvXCI6IFwiTlxcdTAyYmNLb1wiLFxyXG4gICAgXCJvY1wiOiBcIk9jY2l0YW5cIixcclxuICAgIFwib2pcIjogXCJPamlid2FcIixcclxuICAgIFwiYW5nXCI6IFwiT2xkIEVuZ2xpc2hcIixcclxuICAgIFwiZnJvXCI6IFwiT2xkIEZyZW5jaFwiLFxyXG4gICAgXCJnb2hcIjogXCJPbGQgSGlnaCBHZXJtYW5cIixcclxuICAgIFwic2dhXCI6IFwiT2xkIElyaXNoXCIsXHJcbiAgICBcIm5vblwiOiBcIk9sZCBOb3JzZVwiLFxyXG4gICAgXCJwZW9cIjogXCJPbGQgUGVyc2lhblwiLFxyXG4gICAgXCJwcm9cIjogXCJPbGQgUHJvdmVuXFx1MDBlN2FsXCIsXHJcbiAgICBcIm9yXCI6IFwiT3JpeWFcIixcclxuICAgIFwib21cIjogXCJPcm9tb1wiLFxyXG4gICAgXCJvc2FcIjogXCJPc2FnZVwiLFxyXG4gICAgXCJvc1wiOiBcIk9zc2V0aWNcIixcclxuICAgIFwib3RhXCI6IFwiT3R0b21hbiBUdXJraXNoXCIsXHJcbiAgICBcInBhbFwiOiBcIlBhaGxhdmlcIixcclxuICAgIFwicGZsXCI6IFwiUGFsYXRpbmUgR2VybWFuXCIsXHJcbiAgICBcInBhdVwiOiBcIlBhbGF1YW5cIixcclxuICAgIFwicGlcIjogXCJQYWxpXCIsXHJcbiAgICBcInBkY1wiOiBcIlBlbm5zeWx2YW5pYSBHZXJtYW5cIixcclxuICAgIFwiZmFcIjogXCJQZXJzaWFuXCIsXHJcbiAgICBcInBoblwiOiBcIlBob2VuaWNpYW5cIixcclxuICAgIFwicGNkXCI6IFwiUGljYXJkXCIsXHJcbiAgICBcInBtc1wiOiBcIlBpZWRtb250ZXNlXCIsXHJcbiAgICBcInBkdFwiOiBcIlBsYXV0ZGlldHNjaFwiLFxyXG4gICAgXCJwb25cIjogXCJQb2hucGVpYW5cIixcclxuICAgIFwicGxcIjogXCJQb2xpc2hcIixcclxuICAgIFwicG50XCI6IFwiUG9udGljXCIsXHJcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxyXG4gICAgXCJwcmdcIjogXCJQcnVzc2lhblwiLFxyXG4gICAgXCJwYVwiOiBcIlB1bmphYmlcIixcclxuICAgIFwicXVcIjogXCJRdWVjaHVhXCIsXHJcbiAgICBcInJvXCI6IFwiUm9tYW5pYW5cIixcclxuICAgIFwicm1cIjogXCJSb21hbnNoXCIsXHJcbiAgICBcInJvbVwiOiBcIlJvbWFueVwiLFxyXG4gICAgXCJyb290XCI6IFwiUm9vdFwiLFxyXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcclxuICAgIFwicndrXCI6IFwiUndhXCIsXHJcbiAgICBcInNhaFwiOiBcIlNha2hhXCIsXHJcbiAgICBcInNhbVwiOiBcIlNhbWFyaXRhbiBBcmFtYWljXCIsXHJcbiAgICBcInNtXCI6IFwiU2Ftb2FuXCIsXHJcbiAgICBcInNjb1wiOiBcIlNjb3RzXCIsXHJcbiAgICBcImdkXCI6IFwiU2NvdHRpc2ggR2FlbGljXCIsXHJcbiAgICBcInNseVwiOiBcIlNlbGF5YXJcIixcclxuICAgIFwic2VsXCI6IFwiU2Vsa3VwXCIsXHJcbiAgICBcInNlaFwiOiBcIlNlbmFcIixcclxuICAgIFwic2VlXCI6IFwiU2VuZWNhXCIsXHJcbiAgICBcInNyXCI6IFwiU2VyYmlhblwiLFxyXG4gICAgXCJzaFwiOiBcIlNlcmJvLUNyb2F0aWFuXCIsXHJcbiAgICBcInNyclwiOiBcIlNlcmVyXCIsXHJcbiAgICBcInNlaVwiOiBcIlNlcmlcIixcclxuICAgIFwia3NiXCI6IFwiU2hhbWJhbGFcIixcclxuICAgIFwic2huXCI6IFwiU2hhblwiLFxyXG4gICAgXCJzblwiOiBcIlNob25hXCIsXHJcbiAgICBcImlpXCI6IFwiU2ljaHVhbiBZaVwiLFxyXG4gICAgXCJzY25cIjogXCJTaWNpbGlhblwiLFxyXG4gICAgXCJzaWRcIjogXCJTaWRhbW9cIixcclxuICAgIFwiYmxhXCI6IFwiU2lrc2lrYVwiLFxyXG4gICAgXCJzemxcIjogXCJTaWxlc2lhblwiLFxyXG4gICAgXCJ6aF9IYW5zXCI6IFwiU2ltcGxpZmllZCBDaGluZXNlXCIsXHJcbiAgICBcInNkXCI6IFwiU2luZGhpXCIsXHJcbiAgICBcInNpXCI6IFwiU2luaGFsYVwiLFxyXG4gICAgXCJzbXNcIjogXCJTa29sdCBTYW1pXCIsXHJcbiAgICBcImRlblwiOiBcIlNsYXZlXCIsXHJcbiAgICBcInNrXCI6IFwiU2xvdmFrXCIsXHJcbiAgICBcInNsXCI6IFwiU2xvdmVuaWFuXCIsXHJcbiAgICBcInhvZ1wiOiBcIlNvZ2FcIixcclxuICAgIFwic29nXCI6IFwiU29nZGllblwiLFxyXG4gICAgXCJzb1wiOiBcIlNvbWFsaVwiLFxyXG4gICAgXCJzbmtcIjogXCJTb25pbmtlXCIsXHJcbiAgICBcImNrYlwiOiBcIlNvcmFuaSBLdXJkaXNoXCIsXHJcbiAgICBcImF6YlwiOiBcIlNvdXRoIEF6ZXJiYWlqYW5pXCIsXHJcbiAgICBcIm5yXCI6IFwiU291dGggTmRlYmVsZVwiLFxyXG4gICAgXCJhbHRcIjogXCJTb3V0aGVybiBBbHRhaVwiLFxyXG4gICAgXCJzbWFcIjogXCJTb3V0aGVybiBTYW1pXCIsXHJcbiAgICBcInN0XCI6IFwiU291dGhlcm4gU290aG9cIixcclxuICAgIFwiZXNcIjogXCJTcGFuaXNoXCIsXHJcbiAgICBcInNyblwiOiBcIlNyYW5hbiBUb25nb1wiLFxyXG4gICAgXCJ6Z2hcIjogXCJTdGFuZGFyZCBNb3JvY2NhbiBUYW1hemlnaHRcIixcclxuICAgIFwic3VrXCI6IFwiU3VrdW1hXCIsXHJcbiAgICBcInN1eFwiOiBcIlN1bWVyaWFuXCIsXHJcbiAgICBcInN1XCI6IFwiU3VuZGFuZXNlXCIsXHJcbiAgICBcInN1c1wiOiBcIlN1c3VcIixcclxuICAgIFwic3dcIjogXCJTd2FoaWxpXCIsXHJcbiAgICBcInNzXCI6IFwiU3dhdGlcIixcclxuICAgIFwic3ZcIjogXCJTd2VkaXNoXCIsXHJcbiAgICBcImZyX0NIXCI6IFwiU3dpc3MgRnJlbmNoXCIsXHJcbiAgICBcImdzd1wiOiBcIlN3aXNzIEdlcm1hblwiLFxyXG4gICAgXCJkZV9DSFwiOiBcIlN3aXNzIEhpZ2ggR2VybWFuXCIsXHJcbiAgICBcInN5clwiOiBcIlN5cmlhY1wiLFxyXG4gICAgXCJzaGlcIjogXCJUYWNoZWxoaXRcIixcclxuICAgIFwidGxcIjogXCJUYWdhbG9nXCIsXHJcbiAgICBcInR5XCI6IFwiVGFoaXRpYW5cIixcclxuICAgIFwiZGF2XCI6IFwiVGFpdGFcIixcclxuICAgIFwidGdcIjogXCJUYWppa1wiLFxyXG4gICAgXCJ0bHlcIjogXCJUYWx5c2hcIixcclxuICAgIFwidG1oXCI6IFwiVGFtYXNoZWtcIixcclxuICAgIFwidGFcIjogXCJUYW1pbFwiLFxyXG4gICAgXCJ0cnZcIjogXCJUYXJva29cIixcclxuICAgIFwidHdxXCI6IFwiVGFzYXdhcVwiLFxyXG4gICAgXCJ0dFwiOiBcIlRhdGFyXCIsXHJcbiAgICBcInRlXCI6IFwiVGVsdWd1XCIsXHJcbiAgICBcInRlclwiOiBcIlRlcmVub1wiLFxyXG4gICAgXCJ0ZW9cIjogXCJUZXNvXCIsXHJcbiAgICBcInRldFwiOiBcIlRldHVtXCIsXHJcbiAgICBcInRoXCI6IFwiVGhhaVwiLFxyXG4gICAgXCJib1wiOiBcIlRpYmV0YW5cIixcclxuICAgIFwidGlnXCI6IFwiVGlncmVcIixcclxuICAgIFwidGlcIjogXCJUaWdyaW55YVwiLFxyXG4gICAgXCJ0ZW1cIjogXCJUaW1uZVwiLFxyXG4gICAgXCJ0aXZcIjogXCJUaXZcIixcclxuICAgIFwidGxpXCI6IFwiVGxpbmdpdFwiLFxyXG4gICAgXCJ0cGlcIjogXCJUb2sgUGlzaW5cIixcclxuICAgIFwidGtsXCI6IFwiVG9rZWxhdVwiLFxyXG4gICAgXCJ0b1wiOiBcIlRvbmdhblwiLFxyXG4gICAgXCJmaXRcIjogXCJUb3JuZWRhbGVuIEZpbm5pc2hcIixcclxuICAgIFwiemhfSGFudFwiOiBcIlRyYWRpdGlvbmFsIENoaW5lc2VcIixcclxuICAgIFwidGtyXCI6IFwiVHNha2h1clwiLFxyXG4gICAgXCJ0c2RcIjogXCJUc2Frb25pYW5cIixcclxuICAgIFwidHNpXCI6IFwiVHNpbXNoaWFuXCIsXHJcbiAgICBcInRzXCI6IFwiVHNvbmdhXCIsXHJcbiAgICBcInRuXCI6IFwiVHN3YW5hXCIsXHJcbiAgICBcInRjeVwiOiBcIlR1bHVcIixcclxuICAgIFwidHVtXCI6IFwiVHVtYnVrYVwiLFxyXG4gICAgXCJhZWJcIjogXCJUdW5pc2lhbiBBcmFiaWNcIixcclxuICAgIFwidHJcIjogXCJUdXJraXNoXCIsXHJcbiAgICBcInRrXCI6IFwiVHVya21lblwiLFxyXG4gICAgXCJ0cnVcIjogXCJUdXJveW9cIixcclxuICAgIFwidHZsXCI6IFwiVHV2YWx1XCIsXHJcbiAgICBcInR5dlwiOiBcIlR1dmluaWFuXCIsXHJcbiAgICBcInR3XCI6IFwiVHdpXCIsXHJcbiAgICBcImtjZ1wiOiBcIlR5YXBcIixcclxuICAgIFwidWRtXCI6IFwiVWRtdXJ0XCIsXHJcbiAgICBcInVnYVwiOiBcIlVnYXJpdGljXCIsXHJcbiAgICBcInVrXCI6IFwiVWtyYWluaWFuXCIsXHJcbiAgICBcInVtYlwiOiBcIlVtYnVuZHVcIixcclxuICAgIFwidW5kXCI6IFwiVW5rbm93biBMYW5ndWFnZVwiLFxyXG4gICAgXCJoc2JcIjogXCJVcHBlciBTb3JiaWFuXCIsXHJcbiAgICBcInVyXCI6IFwiVXJkdVwiLFxyXG4gICAgXCJ1Z1wiOiBcIlV5Z2h1clwiLFxyXG4gICAgXCJ1elwiOiBcIlV6YmVrXCIsXHJcbiAgICBcInZhaVwiOiBcIlZhaVwiLFxyXG4gICAgXCJ2ZVwiOiBcIlZlbmRhXCIsXHJcbiAgICBcInZlY1wiOiBcIlZlbmV0aWFuXCIsXHJcbiAgICBcInZlcFwiOiBcIlZlcHNcIixcclxuICAgIFwidmlcIjogXCJWaWV0bmFtZXNlXCIsXHJcbiAgICBcInZvXCI6IFwiVm9sYXBcXHUwMGZja1wiLFxyXG4gICAgXCJ2cm9cIjogXCJWXFx1MDBmNXJvXCIsXHJcbiAgICBcInZvdFwiOiBcIlZvdGljXCIsXHJcbiAgICBcInZ1blwiOiBcIlZ1bmpvXCIsXHJcbiAgICBcIndhXCI6IFwiV2FsbG9vblwiLFxyXG4gICAgXCJ3YWVcIjogXCJXYWxzZXJcIixcclxuICAgIFwid2FyXCI6IFwiV2FyYXlcIixcclxuICAgIFwid2FzXCI6IFwiV2FzaG9cIixcclxuICAgIFwiZ3VjXCI6IFwiV2F5dXVcIixcclxuICAgIFwiY3lcIjogXCJXZWxzaFwiLFxyXG4gICAgXCJ2bHNcIjogXCJXZXN0IEZsZW1pc2hcIixcclxuICAgIFwiZnlcIjogXCJXZXN0ZXJuIEZyaXNpYW5cIixcclxuICAgIFwibXJqXCI6IFwiV2VzdGVybiBNYXJpXCIsXHJcbiAgICBcIndhbFwiOiBcIldvbGF5dHRhXCIsXHJcbiAgICBcIndvXCI6IFwiV29sb2ZcIixcclxuICAgIFwid3V1XCI6IFwiV3UgQ2hpbmVzZVwiLFxyXG4gICAgXCJ4aFwiOiBcIlhob3NhXCIsXHJcbiAgICBcImhzblwiOiBcIlhpYW5nIENoaW5lc2VcIixcclxuICAgIFwieWF2XCI6IFwiWWFuZ2JlblwiLFxyXG4gICAgXCJ5YW9cIjogXCJZYW9cIixcclxuICAgIFwieWFwXCI6IFwiWWFwZXNlXCIsXHJcbiAgICBcInliYlwiOiBcIlllbWJhXCIsXHJcbiAgICBcInlpXCI6IFwiWWlkZGlzaFwiLFxyXG4gICAgXCJ5b1wiOiBcIllvcnViYVwiLFxyXG4gICAgXCJ6YXBcIjogXCJaYXBvdGVjXCIsXHJcbiAgICBcImRqZVwiOiBcIlphcm1hXCIsXHJcbiAgICBcInp6YVwiOiBcIlphemFcIixcclxuICAgIFwiemVhXCI6IFwiWmVlbGFuZGljXCIsXHJcbiAgICBcInplblwiOiBcIlplbmFnYVwiLFxyXG4gICAgXCJ6YVwiOiBcIlpodWFuZ1wiLFxyXG4gICAgXCJnYnpcIjogXCJab3JvYXN0cmlhbiBEYXJpXCIsXHJcbiAgICBcInp1XCI6IFwiWnVsdVwiLFxyXG4gICAgXCJ6dW5cIjogXCJadW5pXCJcclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vbWFpbi9zdG9yZSc7XHJcblxyXG5cclxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XHJcbkNvbnRlbnRBcmVuYS5VdGlscyA9IHtcclxuXHJcbiAgICBjb250ZW50UGFyc2VyRnJvbVNlcnZlcihjb250ZW50KSB7XHJcblxyXG4gICAgICAgIGlmICggY29udGVudC5wYXJzZWQgKSByZXR1cm4gY29udGVudDtcclxuXHJcbiAgICAgICAgbGV0IHNvcnQgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIGNvbnRlbnQuZXh0cmFEYXRhKXtcclxuICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoY29udGVudC5leHRyYURhdGEpLmZvckVhY2goXHJcbiAgICAgICAgICAgICAgICAoW2tleSwgdmFsdWVdKSA9PiBjb250ZW50W2tleV0gPSB2YWx1ZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udGVudC50b3VybmFtZW50ID0gKGNvbnRlbnQudG91cm5hbWVudCkgPyBBcnJheS5pc0FycmF5KGNvbnRlbnQudG91cm5hbWVudCk/IGNvbnRlbnQudG91cm5hbWVudCA6IFtjb250ZW50LnRvdXJuYW1lbnRdIDogW107XHJcbiAgICAgICAgY29udGVudC5zcG9ydENhdGVnb3J5ID0gKGNvbnRlbnQuc3BvcnRDYXRlZ29yeSkgPyBBcnJheS5pc0FycmF5KGNvbnRlbnQuc3BvcnRDYXRlZ29yeSk/IGNvbnRlbnQuc3BvcnRDYXRlZ29yeSA6IFtjb250ZW50LnNwb3J0Q2F0ZWdvcnldIDogW107XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0KXtcclxuICAgICAgICAgICAgY29udGVudC5yaWdodHNQYWNrYWdlLmZvckVhY2goIChycCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcnAuc2VsZWN0ZWRSaWdodHMgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnaXRlbXMnXTtcclxuICAgICAgICAgICAgICAgIHJwLmV4Y2x1c2l2ZSA9IGNvbnRlbnQuc2VsZWN0ZWRSaWdodHNCeVN1cGVyUmlnaHRbcnAuaWRdWydleGNsdXNpdmUnXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29udGVudC5maXh0dXJlc0J5U2Vhc29uKXtcclxuICAgICAgICAgICAgY29udGVudC5zZWFzb25zLmZvckVhY2goIChzLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzLmZpeHR1cmVzID0gY29udGVudC5maXh0dXJlc0J5U2Vhc29uW2ldXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbnRlbnQubGF3KXtcclxuICAgICAgICAgICAgY29udGVudC5sYXcubGFiZWwgPSBjb250ZW50Lmxhdy5uYW1lO1xyXG4gICAgICAgICAgICBjb250ZW50Lmxhdy52YWx1ZSA9IGNvbnRlbnQubGF3Lm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIGNvbnRlbnQuc2FsZXNQYWNrYWdlcyApIHtcclxuICAgICAgICAgICAgY29udGVudC5zYWxlc1BhY2thZ2VzLmZvckVhY2goKHNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3Auc2FsZXNNZXRob2QpIHNwLnNhbGVzTWV0aG9kID0gc3Auc2FsZXNNZXRob2QubmFtZTtcclxuICAgICAgICAgICAgICAgIGlmIChzcC5leGNsdWRlZENvdW50cmllcykgc3AuZXhjbHVkZWRUZXJyaXRvcmllcyA9IHNwLmV4Y2x1ZGVkQ291bnRyaWVzLm1hcCh0PT57cmV0dXJue2xhYmVsOnQubmFtZSwgdmFsdWU6dC5uYW1lfX0pXHJcbiAgICAgICAgICAgICAgICBpZiAoc3AudGVycml0b3JpZXMpIHNwLnRlcnJpdG9yaWVzID0gc3AudGVycml0b3JpZXMubWFwKHQ9PntyZXR1cm57bGFiZWw6dC5uYW1lLCB2YWx1ZTp0Lm5hbWV9fSlcclxuICAgICAgICAgICAgICAgIGlmICghc3AudGVycml0b3JpZXMpIHNvcnQgPSBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwLmluc3RhbGxtZW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwLmluc3RhbGxtZW50cy5mb3JFYWNoKGk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLmRhdGUpIGkuZGF0ZSA9IG1vbWVudChpLmRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpe31cclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHNvcnQpIGNvbnRlbnQuc2FsZXNQYWNrYWdlcy5zb3J0KHRoaXMuc29ydFNhbGVzUGFja2FnZXMpLnJldmVyc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb250ZW50LmVuZERhdGUpIGNvbnRlbnQuZW5kRGF0ZSA9IG1vbWVudChjb250ZW50LmVuZERhdGUpO1xyXG4gICAgICAgIGlmIChjb250ZW50LnN0YXJ0RGF0ZSkgY29udGVudC5zdGFydERhdGUgPSBtb21lbnQoY29udGVudC5zdGFydERhdGUpO1xyXG4gICAgICAgIGlmIChjb250ZW50LnNpZ25hdHVyZSkgY29udGVudC5zaWduYXR1cmUgPSBob3N0dXJsICsgY29udGVudC5zaWduYXR1cmU7XHJcblxyXG4gICAgICAgIGNvbnRlbnQuc3RlcCA9IE51bWJlcihjb250ZW50LnN0ZXApO1xyXG4gICAgICAgIGNvbnRlbnQuY3VzdG9tU2Vhc29ucyA9IGNvbnRlbnQuc2Vhc29ucy5maWx0ZXIocz0+e1xyXG4gICAgICAgICAgICByZXR1cm4gcy5leHRlcm5hbElkICYmIHMuZXh0ZXJuYWxJZC5zdGFydHNXaXRoKFwiY2E6XCIpXHJcbiAgICAgICAgfSkubWFwKChzLGkpPT57XHJcbiAgICAgICAgICAgIGxldCB5ZWFycztcclxuICAgICAgICAgICAgaWYgKHMueWVhcil7XHJcbiAgICAgICAgICAgICAgICB5ZWFycyA9IHMueWVhci5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgICAgICAgICBzLmZyb20gPSB5ZWFycy5sZW5ndGggPT09IDEgPyB5ZWFyc1swXSA6IDIwMDAgKyBOdW1iZXIoeWVhcnNbMF0pO1xyXG4gICAgICAgICAgICAgICAgcy50byA9IHllYXJzLmxlbmd0aCA9PT0gMSA/IG51bGwgOiAyMDAwICsgTnVtYmVyKHllYXJzWzFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbil7XHJcbiAgICAgICAgICAgICAgICBzLmZpeHR1cmVzID0gY29udGVudC5maXh0dXJlc0J5U2Vhc29uW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBjb250ZW50LnNlYXNvbnMgPSBjb250ZW50LnNlYXNvbnMubWFwKHM9PntcclxuICAgICAgICAgICAgaWYgKCBzLmV4dGVybmFsSWQgJiYgcy5leHRlcm5hbElkLnN0YXJ0c1dpdGgoXCJjYTpcIikgKXtcclxuICAgICAgICAgICAgICAgIHMuY3VzdG9tID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY29udGVudC5leHRyYURhdGEgJiYgY29udGVudC5leHRyYURhdGEuc2Vhc29uRHVyYXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXN0b21TZWFzb25EdXIgPSBjb250ZW50LmV4dHJhRGF0YS5zZWFzb25EdXJhdGlvbnNbcy5leHRlcm5hbElkXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3VzdG9tU2Vhc29uRHVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcy5jdXN0b21TdGFydERhdGUgPSBjdXN0b21TZWFzb25EdXIuc3RhcnREYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIHMuY3VzdG9tRW5kRGF0ZSA9IGN1c3RvbVNlYXNvbkR1ci5lbmREYXRlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB1c2VyID0gc3RvcmUuZ2V0U3RhdGUoKS51c2VyO1xyXG5cclxuICAgICAgICBpZiAoIWNvbnRlbnQuc2lnbmF0dXJlTmFtZSkgY29udGVudC5zaWduYXR1cmVOYW1lID0gdXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXIubGFzdE5hbWU7XHJcbiAgICAgICAgaWYgKCFjb250ZW50LnNpZ25hdHVyZVBvc2l0aW9uKSBjb250ZW50LnNpZ25hdHVyZVBvc2l0aW9uID0gdXNlci50aXRsZTtcclxuXHJcbiAgICAgICAgY29udGVudC5wYXJzZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH0sXHJcblxyXG4gICAgZmlsdGVyQ29tcGFueUluZm8oZGF0YSl7XHJcblxyXG4gICAgICAgIGxldCBjb21wYW55ID0ge307XHJcblxyXG4gICAgICAgIGNvbXBhbnkubGVnYWxOYW1lID0gZGF0YS5sZWdhbE5hbWU7XHJcbiAgICAgICAgY29tcGFueS5yZWdpc3RyYXRpb25OdW1iZXIgPSBkYXRhLnJlZ2lzdHJhdGlvbk51bWJlcjtcclxuICAgICAgICBjb21wYW55LnZhdCA9IGRhdGEudmF0O1xyXG4gICAgICAgIGNvbXBhbnkuYWRkcmVzcyA9IGRhdGEuYWRkcmVzcztcclxuICAgICAgICBjb21wYW55LmFkZHJlc3MyID0gZGF0YS5hZGRyZXNzMjtcclxuICAgICAgICBjb21wYW55LmNpdHkgPSBkYXRhLmNpdHk7XHJcbiAgICAgICAgY29tcGFueS56aXAgPSBkYXRhLnppcDtcclxuICAgICAgICBjb21wYW55LmNvdW50cnkgPSBkYXRhLmNvdW50cnk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb21wYW55O1xyXG4gICAgfSxcclxuXHJcbiAgICBzb3J0U2FsZXNQYWNrYWdlcyAoYSwgYil7XHJcbiAgICAgICAgbGV0IGMgPSAoYSwgYikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKGEgPiBiKSA/IDEgOiAoKGIgPiBhKSA/IC0xIDogMClcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBjKGEudGVycml0b3JpZXMubGVuZ3RoLCBiLnRlcnJpdG9yaWVzLmxlbmd0aCkgfHwgYyhiLm5hbWUsIGEubmFtZSk7XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG4gICAgaXNBUElBdmFpbGFibGUoKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHRoZSB2YXJpb3VzIEZpbGUgQVBJIHN1cHBvcnQuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xyXG4gICAgICAgICAgICAvLyBHcmVhdCBzdWNjZXNzISBBbGwgdGhlIEZpbGUgQVBJcyBhcmUgc3VwcG9ydGVkLlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBzb3VyY2U6IEZpbGUgQVBJIGF2YWlsYWJpbGl0eSAtIGh0dHA6Ly9jYW5pdXNlLmNvbS8jZmVhdD1maWxlYXBpXHJcbiAgICAgICAgICAgIC8vIHNvdXJjZTogPG91dHB1dD4gYXZhaWxhYmlsaXR5IC0gaHR0cDovL2h0bWw1ZG9jdG9yLmNvbS90aGUtb3V0cHV0LWVsZW1lbnQvXHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJ1RoZSBIVE1MNSBBUElzIHVzZWQgaW4gdGhpcyBmb3JtIGFyZSBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgZm9sbG93aW5nIGJyb3dzZXJzOjxiciAvPicpO1xyXG4gICAgICAgICAgICAvLyA2LjAgRmlsZSBBUEkgJiAxMy4wIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIEdvb2dsZSBDaHJvbWU6IDEzLjAgb3IgbGF0ZXI8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gMy42IEZpbGUgQVBJICYgNi4wIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIE1vemlsbGEgRmlyZWZveDogNi4wIG9yIGxhdGVyPGJyIC8+Jyk7XHJcbiAgICAgICAgICAgIC8vIDEwLjAgRmlsZSBBUEkgJiAxMC4wIDxvdXRwdXQ+XHJcbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIEludGVybmV0IEV4cGxvcmVyOiBOb3Qgc3VwcG9ydGVkIChwYXJ0aWFsIHN1cHBvcnQgZXhwZWN0ZWQgaW4gMTAuMCk8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDUuMSA8b3V0cHV0PlxyXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBTYWZhcmk6IE5vdCBzdXBwb3J0ZWQ8YnIgLz4nKTtcclxuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDkuMiA8b3V0cHV0PlxyXG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBPcGVyYTogTm90IHN1cHBvcnRlZCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFkZE9yZGluYWwobikge1xyXG4gICAgICAgIHZhciBzdHIgPSBuLnRvU3RyaW5nKCkuc2xpY2UoLTEpLFxyXG4gICAgICAgICAgICBvcmQgPSAnJztcclxuICAgICAgICBzd2l0Y2ggKHN0cikge1xyXG4gICAgICAgICAgICBjYXNlICcxJzpcclxuICAgICAgICAgICAgICAgIG9yZCA9ICdzdCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMic6XHJcbiAgICAgICAgICAgICAgICBvcmQgPSAnbmQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzMnOlxyXG4gICAgICAgICAgICAgICAgb3JkID0gJ3JkJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICc0JzpcclxuICAgICAgICAgICAgY2FzZSAnNSc6XHJcbiAgICAgICAgICAgIGNhc2UgJzYnOlxyXG4gICAgICAgICAgICBjYXNlICc3JzpcclxuICAgICAgICAgICAgY2FzZSAnOCc6XHJcbiAgICAgICAgICAgIGNhc2UgJzknOlxyXG4gICAgICAgICAgICBjYXNlICcwJzpcclxuICAgICAgICAgICAgICAgIG9yZCA9ICd0aCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG4gKyBvcmQ7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHZhbHVlXHJcbiAgICAgKiBAcGFyYW0gYXJyXHJcbiAgICAgKiBAcGFyYW0gcHJvcFxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgZ2V0SW5kZXggKHZhbHVlLCBhcnIsIHByb3ApIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKGFycltpXVtwcm9wXSA9PT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTsgLy90byBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdGhlIHZhbHVlIGRvZXNuJ3QgZXhpc3RcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0V2Vic2l0ZVVSbChzdHIpIHtcclxuICAgICAgICBpZiAoc3RyLmluY2x1ZGVzKCdodHRwOi8vJykgfHwgc3RyLmluY2x1ZGVzKCdodHRwczovLycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2h0dHA6Ly8nK3N0clxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaXNMaXN0aW5nUHVibGlzaGVkKHN0YXR1cykge1xyXG4gICAgICAgIHJldHVybiAoc3RhdHVzICYmIChzdGF0dXMubmFtZSA9PT0gXCJBUFBST1ZFRFwiIHx8IHN0YXR1cy5uYW1lID09PSBcIlBFTkRJTkdcIiB8fCBzdGF0dXMubmFtZSA9PT0gXCJFRElURURcIikpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS51dGlscy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcclxuaW1wb3J0IHtsYW5ndWFnZXN9IGZyb20gXCIuLi8uLi8uLi9kYXRhL2xhbmd1YWdlc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFsbFZhbHVlID0ge1xyXG4gICAgdmFsdWU6ICdhbGwnLFxyXG4gICAgbGFiZWw6ICdBbGwgbG9jYWwgbGFuZ3VhZ2VzJ1xyXG59O1xyXG5cclxuY2xhc3MgTGFuZ3VhZ2VTZWxlY3RvciBleHRlbmRzICBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb24gPSBwcm9wcy52YWx1ZSA/IFsuLi5wcm9wcy52YWx1ZV0gOiBbXTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVPbkNoYW5nZSA9IChzZWxlY3Rpb24pID0+IHtcclxuICAgICAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGhhc0FsbCA9ICEhc2VsZWN0aW9uLmZpbmQoKGl0ZW0pID0+IGl0ZW0udmFsdWUgPT09ICdhbGwnKTtcclxuICAgICAgICBjb25zdCBoYXNBbGxQcmV2ID0gISF0aGlzLnByZXZTZWxlY3Rpb24uZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gJ2FsbCcpO1xyXG4gICAgICAgIC8vY29uc3QgaXRlbXNDaGFuZ2VkID0gc2VsZWN0aW9uLmxlbmd0aCAhPT0gdGhpcy5wcmV2U2VsZWN0aW9uLmxlbmd0aDtcclxuXHJcbiAgICAgICAgaWYgKGhhc0FsbCkge1xyXG4gICAgICAgICAgICBpZiAoaGFzQWxsUHJldikge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIEFsbFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gc2VsZWN0aW9uLmZpbHRlcihpdGVtID0+IGl0ZW0udmFsdWUgIT09ICdhbGwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBBbGwgYW5kIHJlbW92ZSBvdGhlcnNcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IFthbGxWYWx1ZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJldlNlbGVjdGlvbiA9IHNlbGVjdGlvbjtcclxuXHJcbiAgICAgICAgb25DaGFuZ2Uoc2VsZWN0aW9uKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3QgeyB2YWx1ZSwgbXVsdGkgPSB0cnVlLCBwbGFjZWhvbGRlciB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCByZWFsTGFuZ3VhZ2VzID0gT2JqZWN0LnZhbHVlcyhsYW5ndWFnZXMpLm1hcCgoaSwgayk9Pih7dmFsdWUgOiBpLm5hbWUgLCBsYWJlbCA6IGkubmFtZSB9KSk7XHJcbiAgICAgICAgY29uc3QgYWxsTGFuZ3VhZ2VzID0gWyBhbGxWYWx1ZSwgLi4ucmVhbExhbmd1YWdlcyBdO1xyXG5cclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgIG5hbWU9XCJmb3JtLWZpZWxkLW5hbWVcIlxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlT25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XHJcbiAgICAgICAgICAgICAgICBtdWx0aT17bXVsdGl9XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zPXthbGxMYW5ndWFnZXN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBMYW5ndWFnZVNlbGVjdG9yIH07XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvTGFuZ3VhZ2VTZWxlY3Rvci5qcyIsImV4cG9ydCBjb25zdCBjb21tb25UeXBlcz0ge1xyXG4gICAgR0VUX0RFRkFVTFRfUklHSFRTX1BBQ0tBR0U6J0dFVF9ERUZBVUxUX1JJR0hUU19QQUNLQUdFJyxcclxuICAgIFNFVF9UT1RBTF9DT1VOVFJJRVM6ICdTRVRfVE9UQUxfQ09VTlRSSUVTJyxcclxuICAgIFNFVF9URVNUX1NUQUdFX01PREU6ICdTRVRfVEVTVF9TVEFHRV9NT0RFJ1xyXG59O1xyXG5cclxuY29uc3QgY29tbW9uRGVmYXVsdCA9IHtcclxuICAgIHRvdGFsQ291bnRyaWVzIDogMjQwLFxyXG4gICAgdGVzdFN0YWdlTW9kZTogZmFsc2VcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb21tb24gPSAoc3RhdGUgPSBjb21tb25EZWZhdWx0LCBhY3Rpb24pID0+IHtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBjb21tb25UeXBlcy5HRVRfREVGQVVMVF9SSUdIVFNfUEFDS0FHRTpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7ZGVmYXVsdFJpZ2h0c1BhY2thZ2U6IGFjdGlvbi5kZWZhdWx0UmlnaHRzUGFja2FnZX0pO1xyXG4gICAgICAgIGNhc2UgY29tbW9uVHlwZXMuU0VUX1RPVEFMX0NPVU5UUklFUzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7dG90YWxDb3VudHJpZXM6IGFjdGlvbi50b3RhbENvdW50cmllc30pO1xyXG4gICAgICAgIGNhc2UgY29tbW9uVHlwZXMuU0VUX1RFU1RfU1RBR0VfTU9ERTpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7dGVzdFN0YWdlTW9kZTogYWN0aW9uLnRlc3RTdGFnZU1vZGV9KTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy9jb21tb24uanMiLCJleHBvcnQgY29uc3QgdXNlclR5cGVzPSB7XHJcbiAgICBMT0dPVVQ6J0xPR09VVCcsXHJcbiAgICBMT0dJTjonTE9HSU4nLFxyXG4gICAgUFJPRklMRTonUFJPRklMRScsXHJcbiAgICBMT0FEX1VTRVJfREFUQTonTE9BRF9VU0VSX0RBVEEnLFxyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFVzZXIgPSB7XHJcbiAgICBwcm9maWxlIDogXCJTRUxMRVJcIlxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VyID0gKHN0YXRlID0gZGVmYXVsdFVzZXIsIGFjdGlvbikgPT4ge1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIHVzZXJUeXBlcy5MT0dPVVQ6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGVmYXVsdFVzZXIpO1xyXG4gICAgICAgIGNhc2UgdXNlclR5cGVzLkxPR0lOOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBhY3Rpb24uZW1haWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSB1c2VyVHlwZXMuUFJPRklMRTpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlOiBhY3Rpb24ucHJvZmlsZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIHVzZXJUeXBlcy5MT0FEX1VTRVJfREFUQTpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7Li4uYWN0aW9uLnVzZXJ9KTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy91c2VyLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tICdyZWR1eCdcclxuaW1wb3J0IHtpMThuU3RhdGV9IGZyb20gXCJyZWR1eC1pMThuXCI7XHJcblxyXG5pbXBvcnQge2NvbnRlbnR9IGZyb20gXCIuLi9zZWxsL3JlZHVjZXJzL2NvbnRlbnRcIjtcclxuaW1wb3J0IHtzZWxlY3Rvcn0gZnJvbSBcIi4uL3NlbGwvcmVkdWNlcnMvc2VsZWN0b3JcIjtcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gXCIuLi9idXkvcmVkdWNlcnMvZmlsdGVyXCI7XHJcbmltcG9ydCB7bWFya2V0cGxhY2V9IGZyb20gXCIuLi9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2VcIjtcclxuaW1wb3J0IHttYW5hZ2V9IGZyb20gXCIuLi9tYW5hZ2UvcmVkdWNlcnMvbWFuYWdlXCI7XHJcbmltcG9ydCB7dXNlcn0gZnJvbSBcIi4vcmVkdWNlcnMvdXNlclwiO1xyXG5pbXBvcnQge2NvbW1vbn0gZnJvbSBcIi4vcmVkdWNlcnMvY29tbW9uXCI7XHJcblxyXG5jb25zdCByZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICBjb250ZW50LFxyXG4gICAgc2VsZWN0b3IsXHJcbiAgICBtYXJrZXRwbGFjZSxcclxuICAgIGZpbHRlcixcclxuICAgIG1hbmFnZSxcclxuICAgIHVzZXIsXHJcbiAgICBjb21tb24sXHJcbiAgICBpMThuU3RhdGVcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyZWR1Y2Vycyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9zdG9yZS5qcyIsIlxuZXhwb3J0IGNvbnN0IG1hbmFnZVR5cGVzPSB7XG4gICAgVEVTVDonVEVTVCcsXG59O1xuXG5leHBvcnQgY29uc3QgbWFuYWdlID0gKHN0YXRlID0ge1xuICAgIHRlc3RJdGVtOiBcIm1hbmFnZVJlZHVjZXJcIlxuXG59LCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtYW5hZ2VUeXBlcy5URVNUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgdGVzdDogYWN0aW9uLnRleHQsXG4gICAgICAgICAgICAgICAgaWQgOiBhY3Rpb24uaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3JlZHVjZXJzL21hbmFnZS5qcyIsImltcG9ydCBtYXggZnJvbSAnbG9kYXNoL21heCc7XHJcbmltcG9ydCB7IGFsbFZhbHVlIH0gZnJvbSAnLi8uLi8uLi9tYWluL2NvbXBvbmVudHMvTGFuZ3VhZ2VTZWxlY3Rvcic7XHJcblxyXG5leHBvcnQgY29uc3QgY29udGVudFR5cGU9IHtcclxuICAgIENPTlRFTlRfSU5JVDonQ09OVEVOVF9JTklUJyxcclxuICAgIFNURVBfQ0hBTkdFX1JFU0VUIDogJ1NURVBfQ0hBTkdFX1JFU0VUJyxcclxuICAgIEdPX1RPX1NURVA6ICdHT19UT19TVEVQJyxcclxuICAgIEdPX1RPX05FWFRfU1RFUDogJ0dPX1RPX05FWFRfU1RFUCcsXHJcbiAgICBHT19UT19QUkVWSU9VU19TVEVQOiAnR09fVE9fUFJFVklPVVNfU1RFUCcsXHJcbiAgICBBRERfTkVXIDogJ0FERF9ORVcnLFxyXG4gICAgUkVNT1ZFX05FVyA6ICdSRU1PVkVfTkVXJyxcclxuICAgIFNVUEVSX1JJR0hUU19VUERBVEVEOiAnU1VQRVJfUklHSFRTX1VQREFURUQnLFxyXG4gICAgVVBEQVRFX0NPTlRFTlRfVkFMVUUgOiAnVVBEQVRFX0NPTlRFTlRfVkFMVUUnLFxyXG4gICAgU0VMRUNUX1RPVVJOQU1FTlQgOiAnU0VMRUNUX1RPVVJOQU1FTlQnLFxyXG4gICAgUkVNT1ZFX0ZST01fTVVMVElQTEUgOiAnUkVNT1ZFX0ZST01fTVVMVElQTEUnLFxyXG4gICAgVVBEQVRFX0ZST01fTVVMVElQTEUgOiAnVVBEQVRFX0ZST01fTVVMVElQTEUnLFxyXG4gICAgQVBQTFlfU0VMRUNUSU9OIDogJ0FQUExZX1NFTEVDVElPTicsXHJcbiAgICBVUERBVEVfU0FMRVNfUEFDS0FHRVMgOiAnVVBEQVRFX1NBTEVTX1BBQ0tBR0VTJyxcclxuICAgIFVQREFURV9BVFRBQ0hNRU5UUyA6ICdVUERBVEVfQVRUQUNITUVOVFMnLFxyXG4gICAgVVBEQVRFX0FOTkVYIDogJ1VQREFURV9BTk5FWCcsXHJcbiAgICBBRERfU0FMRVNfUEFDS0FHRVMgOiAnQUREX1NBTEVTX1BBQ0tBR0VTJyxcclxuICAgIFJFU0VUIDogJ1JFU0VUJyxcclxuICAgIEFMTF9FUElTT0RFX1VQREFURV9GTEFHOiAnVVBEQVRFX0FMTF9FUElTT0RFU19GTEFHJ1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IEVtcHR5TGlzdGluZyA9IHtcclxuICAgIHN0ZXA6IDEsXHJcbiAgICBtYXhTdGVwOiAxLFxyXG4gICAgcmlnaHRzUGFja2FnZSA6IFtdLFxyXG4gICAgdG91cm5hbWVudCA6IFtdLFxyXG4gICAgc3BvcnRDYXRlZ29yeSA6IFtdLFxyXG4gICAgc3BvcnRzIDogW10sXHJcbiAgICBzZWFzb25zOiBbXSxcclxuICAgIGN1c3RvbVNlYXNvbnMgOiBbXSxcclxuICAgIHNhbGVzUGFja2FnZXMgOiBbXSxcclxuICAgIGN1c3RvbVRvdXJuYW1lbnQgOiBudWxsLFxyXG4gICAgY3VzdG9tQ2F0ZWdvcnkgOiBudWxsLFxyXG4gICAgZGVzY3JpcHRpb246ICcnLFxyXG4gICAgcHJvZ3JhbURlc2NyaXB0aW9uIDogbnVsbCxcclxuICAgIGF0dGFjaG1lbnRzIDogW10sXHJcbiAgICBhbm5leCA6IFtdLFxyXG4gICAgZW5kRGF0ZUxpbWl0IDogMzAsXHJcbiAgICBjb3VudGVyIDogMCxcclxuICAgIGN1cnJlbmN5IDogXCJFVVJcIixcclxuICAgIHN0YXJ0RGF0ZU1vZGUgOiBcIkxJQ0VOU0VcIixcclxuICAgIHN0ZXBDaGFuZ2UgOiBmYWxzZSxcclxuICAgIHZhdCA6IFwibm9cIixcclxuICAgIE5BX0lOUFVUIDogOTAsXHJcbiAgICBITF9JTlBVVCA6IDUsXHJcbiAgICBMSUNFTlNFRF9MQU5HVUFHRVMgOiBbYWxsVmFsdWVdLFxyXG4gICAgUFJPR1JBTV9MQU5HVUFHRSA6IFtdLFxyXG4gICAgUFJPR1JBTV9TVUJUSVRMRVMgOiBbXSxcclxuICAgIFBST0dSQU1fU0NSSVBUIDogW10sXHJcbiAgICBFRElUX1BST0dSQU1fREVTQ1JJUFRJT05fT1BUSU9OQUw6IHRydWUsXHJcbiAgICB3ZWJzaXRlIDogbnVsbCxcclxuICAgIGxhdyA6IFwiRW5nbGlzaFwiLFxyXG4gICAgaW1hZ2UgOiBudWxsLFxyXG4gICAgaW1hZ2VCYXNlNjQgOiBudWxsLFxyXG4gICAgdGVtcERhdGE6IHt9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY29udGVudCA9IChzdGF0ZSA9IEVtcHR5TGlzdGluZywgYWN0aW9uKSA9PiB7XHJcblxyXG4gICAgbGV0IG5ld1N0YXRlID0ge307XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuUkVTRVQ6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgRW1wdHlMaXN0aW5nKTtcclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkNPTlRFTlRfSU5JVDpcclxuICAgICAgICAgICAgYWN0aW9uLmNvbnRlbnQuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5jb250ZW50LCB7bWF4U3RlcDogbWF4KFthY3Rpb24uY29udGVudC5tYXhTdGVwLCBzdGF0ZS5tYXhTdGVwXSl9KTtcclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFMTF9FUElTT0RFX1VQREFURV9GTEFHOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtFRElUX1BST0dSQU1fREVTQ1JJUFRJT05fT1BUSU9OQUw6IGFjdGlvbi5wYXlsb2FkfSk7XHJcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5HT19UT19ORVhUX1NURVA6XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1N0ZXAgPSBzdGF0ZS5zdGVwICsgMTtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzdGVwOiBuZXdTdGVwLFxyXG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1heFN0ZXA6IG1heChbbmV3U3RlcCwgc3RhdGUubWF4U3RlcF0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuR09fVE9fU1RFUDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzdGVwOiBhY3Rpb24uc3RlcCxcclxuICAgICAgICAgICAgICAgIHN0ZXBDaGFuZ2UgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbWF4U3RlcDogbWF4KFthY3Rpb24uc3RlcCwgc3RhdGUubWF4U3RlcF0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuU1RFUF9DSEFOR0VfUkVTRVQ6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZSA6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuR09fVE9fUFJFVklPVVNfU1RFUDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzdGVwOiBzdGF0ZS5zdGVwIC0xLFxyXG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZSA6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5SRU1PVkVfTkVXOlxyXG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xyXG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XHJcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdLnNwbGljZShhY3Rpb24uaW5kZXgsIDEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XHJcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5BRERfTkVXOlxyXG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xyXG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XHJcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdW2FjdGlvbi5pbmRleF0gPSB7XHJcbiAgICAgICAgICAgICAgICBjdXN0b20gOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJcIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKCBhY3Rpb24uY2xlYW4gKXtcclxuICAgICAgICAgICAgICAgIGFjdGlvbi5jbGVhbi5mb3JFYWNoKChzZWxlY3RvclR5cGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVbc2VsZWN0b3JUeXBlXSA9ICQuaXNBcnJheShzdGF0ZVtzZWxlY3RvclR5cGVdKSA/IFtdIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9DT05URU5UX1ZBTFVFOlxyXG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xyXG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24ua2V5XSA9IGFjdGlvbi52YWx1ZTtcclxuICAgICAgICAgICAgbmV3U3RhdGUubGlzdGluZ0VkaXRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlNFTEVDVF9UT1VSTkFNRU5UOlxyXG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xyXG4gICAgICAgICAgICBuZXdTdGF0ZS50b3VybmFtZW50ID0gW2FjdGlvbi50b3VybmFtZW50XTtcclxuICAgICAgICAgICAgbmV3U3RhdGUuc3BvcnRzID0gKGFjdGlvbi50b3VybmFtZW50LnNwb3J0ICkgPyBbYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnRdIDogW107XHJcbiAgICAgICAgICAgIG5ld1N0YXRlLnNwb3J0Q2F0ZWdvcnkgPSBbYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnRDYXRlZ29yeV07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFQUExZX1NFTEVDVElPTjpcclxuXHJcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtcyA9IEFycmF5LmZyb20oIGFjdGlvbi5zZWxlY3RlZEl0ZW1zLnZhbHVlcygpICk7XHJcblxyXG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XHJcblxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5tdWx0aXBsZSApe1xyXG4gICAgICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBzZWxlY3RlZEl0ZW1zO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1bYWN0aW9uLmluZGV4XSA9IHNlbGVjdGVkSXRlbXNbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggYWN0aW9uLmNsZWFuICl7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb24uY2xlYW4uZm9yRWFjaCgoc2VsZWN0b3JUeXBlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlW3NlbGVjdG9yVHlwZV0gPSAkLmlzQXJyYXkoc3RhdGVbc2VsZWN0b3JUeXBlXSkgPyBbXSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XHJcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5SRU1PVkVfRlJPTV9NVUxUSVBMRTpcclxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcclxuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0gPSBbLi4uc3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1dO1xyXG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXS5zcGxpY2UoYWN0aW9uLmluZGV4LDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9GUk9NX01VTFRJUExFOlxyXG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xyXG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XHJcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdW2FjdGlvbi5pbmRleF1bYWN0aW9uLmtleV0gPSBhY3Rpb24udmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xyXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuU1VQRVJfUklHSFRTX1VQREFURUQ6XHJcblxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5yZXNldCApIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge3JpZ2h0c1BhY2thZ2UgOiBbXSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlIDogQXJyYXkuZnJvbShhY3Rpb24ucmlnaHRzUGFja2FnZS52YWx1ZXMoKSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5VUERBVEVfU0FMRVNfUEFDS0FHRVM6XHJcblxyXG4gICAgICAgICAgICBsZXQgc2FsZXNQYWNrYWdlcyA9IFsuLi5zdGF0ZS5zYWxlc1BhY2thZ2VzXTtcclxuXHJcbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlXCIgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBzYWxlc1BhY2thZ2VzLmxlbmd0aCA+PSAxICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMuc3BsaWNlKGFjdGlvbi5pbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZUFsbFwiICkge1xyXG4gICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInNhdmVcIiApIHNhbGVzUGFja2FnZXNbYWN0aW9uLmluZGV4XSA9IGFjdGlvbi5zYWxlc1BhY2thZ2U7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMgOiBzYWxlc1BhY2thZ2VzXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9BVFRBQ0hNRU5UUzpcclxuXHJcbiAgICAgICAgICAgIGxldCBhdHRhY2htZW50cyA9IFsuLi5zdGF0ZS5hdHRhY2htZW50c107XHJcblxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZVwiICkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggYXR0YWNobWVudHMubGVuZ3RoID49IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudHMuc3BsaWNlKGFjdGlvbi5pbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZUFsbFwiICkge1xyXG4gICAgICAgICAgICAgICAgYXR0YWNobWVudHMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJzYXZlXCIgKSBhdHRhY2htZW50c1thY3Rpb24uaW5kZXhdID0gYWN0aW9uLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50cyA6IGF0dGFjaG1lbnRzXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9BTk5FWDpcclxuXHJcbiAgICAgICAgICAgIGxldCBhbm5leCA9IFsuLi5zdGF0ZS5hbm5leF07XHJcblxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZVwiICkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICggYW5uZXgubGVuZ3RoID49IDEgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5uZXguc3BsaWNlKGFjdGlvbi5pbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZUFsbFwiICkge1xyXG4gICAgICAgICAgICAgICAgYW5uZXggPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJzYXZlXCIgKSBhbm5leFthY3Rpb24uaW5kZXhdID0gYWN0aW9uLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBhbm5leCA6IGFubmV4XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFERF9TQUxFU19QQUNLQUdFUzpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBzYWxlc1BhY2thZ2VzIDogWy4uLnN0YXRlLnNhbGVzUGFja2FnZXMsLi4uYWN0aW9uLnNhbGVzUGFja2FnZXNdXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9jb250ZW50LmpzIiwiZXhwb3J0IGNvbnN0IHNlbGVjdG9yVHlwZT0ge1xyXG4gICAgVEVTVDonVEVTVCcsXHJcbiAgICBPUEVOX1NFTEVDVE9SOiAnT1BFTl9TRUxFQ1RPUicsXHJcbiAgICBDTE9TRV9TRUxFQ1RPUiA6ICdDTE9TRV9TRUxFQ1RPUicsXHJcbiAgICBBUFBMWV9TRUxFQ1RJT04gOiAnQVBQTFlfU0VMRUNUSU9OJ1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlbGVjdG9yID0gKHN0YXRlID0ge1xyXG4gICAgdHlwZTogXCJzcG9ydFwiLFxyXG4gICAgb3BlbiA6IGZhbHNlLFxyXG4gICAgc2VsZWN0b3JJdGVtczogW10sXHJcbiAgICBwb3B1bGFySXRlbXM6IFtdXHJcblxyXG59LCBhY3Rpb24pID0+IHtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBzZWxlY3RvclR5cGUuVEVTVDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICBvcGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLk9QRU5fU0VMRUNUT1I6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBhY3Rpb24uc2VsZWN0b3JUeXBlLFxyXG4gICAgICAgICAgICAgICAgb3BlbiA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpbmRleCA6IGFjdGlvbi5pbmRleCxcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IGFjdGlvbi5zZWxlY3Rvckl0ZW1zLFxyXG4gICAgICAgICAgICAgICAgcG9wdWxhckl0ZW1zOiBhY3Rpb24ucG9wdWxhckl0ZW1zLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogYWN0aW9uLmFjdGl2ZUZpbHRlcixcclxuICAgICAgICAgICAgICAgIG11bHRpcGxlIDogYWN0aW9uLm11bHRpcGxlLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGFjdGlvbi5kaXNhYmxlZCxcclxuICAgICAgICAgICAgICAgIHNob3dOZXdTcG9ydCA6IGFjdGlvbi5zaG93TmV3U3BvcnQsXHJcbiAgICAgICAgICAgICAgICBzaG93TmV3VG91cm5hbWVudCA6IGFjdGlvbi5zaG93TmV3VG91cm5hbWVudCxcclxuICAgICAgICAgICAgICAgIHNob3dOZXdDYXRlZ29yeSA6IGFjdGlvbi5zaG93TmV3Q2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICBzaG93TmV3U2Vhc29uIDogYWN0aW9uLnNob3dOZXdTZWFzb24sXHJcbiAgICAgICAgICAgICAgICBzaG93QWxsQ291bnRyaWVzOiBhY3Rpb24uc2hvd0FsbENvdW50cmllcyxcclxuICAgICAgICAgICAgICAgIGNsZWFuIDogYWN0aW9uLmNsZWFuLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJdGVtczogYWN0aW9uLnNlbGVjdGVkSXRlbXNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSBzZWxlY3RvclR5cGUuQ0xPU0VfU0VMRUNUT1I6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgb3BlbiA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogW10sXHJcbiAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IFtdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLkFQUExZX1NFTEVDVElPTiA6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgb3BlbiA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogW10sXHJcbiAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IFtdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL3NlbGVjdG9yLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==