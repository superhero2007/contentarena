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
    sport: [{
        value: null,
        label: "All sports"
    }],
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
throw new Error("Cannot find module \"redux-thunk\"");
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

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_redux__["createStore"])(reducers, Object(__WEBPACK_IMPORTED_MODULE_1_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_3_redux_thunk___default.a)));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbG9kYXNoL21heC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9kYXRhL2xhbmd1YWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9yZWR1Y2Vycy9tYXJrZXRwbGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuY29udGVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EuZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS51dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9sYW5kaW5nL3JlZHVjZXJzL2xhbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0xhbmd1YWdlU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy91c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vcmVkdWNlcnMvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9yZWR1Y2Vycy9tYW5hZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvc2VsZWN0b3IuanMiXSwibmFtZXMiOlsibGFuZ3VhZ2VzIiwiZmlsdGVyVHlwZXMiLCJBRERfUklHSFQiLCJSRU1PVkVfUklHSFQiLCJVUERBVEVfQ09VTlRSSUVTIiwiVVBEQVRFX0VYQ0xVU0lWRSIsIlVQREFURV9JTkNMVURFRF9DT1VOVFJJRVMiLCJVUERBVEVfU1BPUlQiLCJVUERBVEVfRVZFTlQiLCJDTEVBUiIsIkNMRUFSX1VQREFURSIsIlVQREFURV9NQU5ZIiwiVVBEQVRFX0ZJTFRFUlNfQ09ORklHIiwiVVBEQVRFX0VWRU5UX0RBVEVfRlJPTV9UTyIsImRlZmF1bHRGaWx0ZXIiLCJyaWdodHMiLCJjb3VudHJpZXMiLCJleGNsdXNpdmUiLCJpbmNsdWRlQWxsQ291bnRyaWVzIiwic3BvcnQiLCJ2YWx1ZSIsImxhYmVsIiwiZXZlbnQiLCJmb3JjZVVwZGF0ZSIsImV2ZW50RGF0ZUZyb20iLCJldmVudERhdGVUbyIsImZpbHRlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsIk9iamVjdCIsImFzc2lnbiIsImlkIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwibWFwIiwiYyIsImZyb20iLCJ0byIsImZpbHRlcnMiLCJOdW1iZXIiLCJyIiwibWFya2V0cGxhY2VUeXBlcyIsIkZFVENIX0xJU1RJTkdfUkVRVUVTVCIsIkZFVENIX0xJU1RJTkdfRVJST1IiLCJGRVRDSF9MSVNUSU5HX1NVQ0NFU1MiLCJpbml0aWFsU3RhdGUiLCJsaXN0aW5nc0RhdGEiLCJzdWNjZXNzIiwibG9hZGluZyIsImVycm9yIiwibGlzdGluZ3MiLCJ0b3RhbEl0ZW1zIiwibWFya2V0cGxhY2UiLCJ1cGRhdGVMaXN0aW5ncyIsIl9fYXBpU3RvcmUiLCJ0b3VybmFtZW50cyIsIndpbmRvdyIsIkNvbnRlbnRBcmVuYSIsIkNvbnRlbnRBcGkiLCJzYXZlQ29udGVudEFzRHJhZnQiLCJjb250ZW50IiwiZGVmZXJyZWQiLCJqUXVlcnkiLCJEZWZlcnJlZCIsIl90aGlzIiwiJCIsImFqYXgiLCJ1cmwiLCJlbnZob3N0dXJsIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInJlc3BvbnNlIiwicmVzb2x2ZSIsInN0YXR1cyIsInJlamVjdCIsInByb21pc2UiLCJzYXZlQ29udGVudEFzSW5hY3RpdmUiLCJzYXZlQ29udGVudEFzQWN0aXZlIiwicmVwdWJsaXNoTGlzdGluZyIsImN1c3RvbUlkIiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwiZ2V0VXNlckluZm8iLCJnZXRVc2VySW5mb0J5QWN0aXZhdGlvbkNvZGUiLCJhY3RpdmF0aW9uQ29kZSIsImdldENvbXBhbnlVc2VycyIsInVwZGF0ZUNvbXBhbnkiLCJjb21wYW55IiwidXBkYXRlUGFzc3dvcmQiLCJ1cGRhdGVVc2VyIiwidXNlciIsImFjdGl2YXRlVXNlciIsInBhc3N3b3JkIiwidXBkYXRlVXNlclByb2ZpbGUiLCJwcm9maWxlIiwiZ2V0VGhyZWFkIiwiZ2V0VGhyZWFkcyIsInBsYWNlQmlkIiwiYmlkIiwicGxhY2VCaWRzIiwiYWNjZXB0QmlkIiwic2lnbmF0dXJlIiwic2lnbmF0dXJlTmFtZSIsInNpZ25hdHVyZVBvc2l0aW9uIiwicmVqZWN0QmlkIiwicmVtb3ZlQmlkIiwic2F2ZVRtcEZpbGUiLCJmaWxlcyIsIkZvcm1EYXRhIiwiYXBwZW5kIiwicHJvY2Vzc0RhdGEiLCJzYXZlQXR0YWNobWVudEZpbGUiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlQXR0YWNobWVudEZpbGUiLCJmaWxlIiwiZ2V0QnlDdXN0b21JZCIsImdldERyYWZ0TGlzdGluZ3MiLCJnZXRJbmFjdGl2ZUxpc3RpbmdzIiwiZ2V0QWN0aXZlTGlzdGluZ3MiLCJnZXRFeHBpcmVkTGlzdGluZ3MiLCJyZW1vdmVMaXN0aW5nIiwiZHVwbGljYXRlTGlzdGluZyIsImRlYWN0aXZhdGVMaXN0aW5nIiwiYXJjaGl2ZUxpc3RpbmciLCJnZXRDbG9zZWREZWFscyIsImdldEFsbERlYWxzIiwiZ2V0UGVuZGluZ0RlYWxzIiwiZ2V0UmVqZWN0ZWREZWFscyIsImdldFdhdGNobGlzdExpc3RpbmdzIiwiQXBpIiwic29ydEJ5TGFiZWwiLCJhIiwiYiIsIm5hbWUiLCJzb3J0QnlTcG9ydCIsInNwb3J0Q2F0ZWdvcnkiLCJwcmVwYXJlTGlzdCIsImxpc3QiLCJjYXRlZ29yeUlkIiwiaXRlbSIsImNhdGVnb3J5IiwiZXh0ZXJuYWxJZCIsInNvcnQiLCJmaWx0ZXJEb3VibGVzIiwic3BvcnRJZCIsIm5hbWVzIiwicmVwbGFjZSIsInB1c2giLCJnZXRDb21wYW55VGVybXMiLCJnZXRDb21wYW55RGVmaW5pdGlvbnMiLCJyZXN0b3JlQ29tcGFueVRlcm1zIiwicmVzdG9yZURlZmluaXRpb25zIiwidXBkYXRlVGVybXMiLCJ0ZXJtcyIsImRlZmluaXRpb25zIiwiZ2V0Q29udGVudCIsImdldEpzb25Db250ZW50Iiwic2F2ZUZpbHRlciIsImdldENvdW50cmllcyIsIkRhdGEiLCJDb3VudHJpZXMiLCJsZW5ndGgiLCJyZWdpb25zIiwiZ2V0QWN0aXZlU3BvcnRzIiwiZ2V0QWxsU3BvcnRzIiwiZmxhZ3MiLCJnZXRTcG9ydHNHcm91cHMiLCJnZXRDb3VudHJpZXNGdWxsIiwiZ2V0VGVycml0b3JpZXMiLCJnZXRSZWdpb25zIiwiZ2V0UmlnaHRzIiwicmlnaHRzUGFja2FnZSIsImdyb3VwIiwiZ2V0UmlnaHRzUGFja2FnZSIsImdldFNwb3J0cyIsImV4dGVybmFsQXBpVXJsIiwic3BvcnRzIiwiZ2V0Q29udGVudERldGFpbHMiLCJnZXRQZW5kaW5nTGlzdGluZ3MiLCJnZXRDYXRlZ29yaWVzIiwiY2F0cyIsImdldFRvdXJuYW1lbnRzIiwiZG9uZSIsInRvdXJuYW1lbnQiLCJzdG9yZWRSZXNwb25zZSIsInVuZGVmaW5lZCIsImdldFNlYXNvbnMiLCJ0b3VybmFtZW50SWQiLCJzZWFzb25zIiwic2Vhc29uIiwiaXNBcnJheSIsImVuZERhdGUiLCJlbmRfZGF0ZSIsInN0YXJ0RGF0ZSIsInN0YXJ0X2RhdGUiLCJ0b3VybmFtZW50X2lkIiwieWVhciIsInJldmVyc2UiLCJnZXRTY2hlZHVsZSIsInNlYXNvbklkIiwic3BvcnRfZXZlbnRzIiwic3BvcnRfZXZlbnQiLCJmb3JFYWNoIiwicm91bmQiLCJ0b3VybmFtZW50X3JvdW5kIiwibnVtYmVyIiwibWF0Y2hlcyIsIk1hcCIsInNldCIsInNjaGVkdWxlZCIsInRvdXJuYW1lbnRSb3VuZCIsImNvbXBldGl0b3JzIiwiY29tcGV0aXRvciIsInNlYXJjaENvbXBldGl0aW9uIiwicmVxdWVzdCIsInRyYWRpdGlvbmFsIiwiZGF0YVR5cGUiLCJ3YXRjaGxpc3QiLCJnZXROb3RpZmljYXRpb25zIiwiYXhpb3MiLCJnZXQiLCJtYXJrTm90aWZpY2F0aW9uQXNWaXNpdGVkIiwicG9zdCIsIm1hcmtOb3RpZmljYXRpb25Bc1NlZW4iLCJzaWduSW5Vc2VyIiwidXNlcm5hbWUiLCJyZWNvdmVyUGFzc3dvcmQiLCJlbWFpbCIsInJlc2V0UGFzc3dvcmQiLCJjb25maXJtYXRpb25Ub2tlbiIsInNpZ25VcFVzZXIiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImNvbXBhbnlMZWdhbE5hbWUiLCJMYW5ndWFnZXMiLCJUb3BTcG9ydHMiLCJGdWxsU3BvcnRzIiwiQWN0aXZlU3BvcnRzIiwiVGVycml0b3JpZXMiLCJSZWdpb25zIiwiU2hvcnQiLCJMb25nIiwiVXRpbHMiLCJjb250ZW50UGFyc2VyRnJvbVNlcnZlciIsInBhcnNlZCIsImV4dHJhRGF0YSIsImVudHJpZXMiLCJrZXkiLCJBcnJheSIsInNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0IiwicnAiLCJzZWxlY3RlZFJpZ2h0cyIsImZpeHR1cmVzQnlTZWFzb24iLCJzIiwiaSIsImZpeHR1cmVzIiwibGF3IiwiY3VzdG9tQnVuZGxlcyIsInNwIiwic2FsZXNNZXRob2QiLCJleGNsdWRlZENvdW50cmllcyIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJ0IiwidGVycml0b3J5SWQiLCJ0ZXJyaXRvcmllcyIsImluc3RhbGxtZW50cyIsImRhdGUiLCJtb21lbnQiLCJlIiwic2FsZXNQYWNrYWdlcyIsInNvcnRTYWxlc1BhY2thZ2VzIiwiaG9zdHVybCIsInN0ZXAiLCJjdXN0b21TZWFzb25zIiwic3RhcnRzV2l0aCIsInllYXJzIiwic3BsaXQiLCJjdXN0b20iLCJzZWFzb25EdXJhdGlvbnMiLCJjdXN0b21TZWFzb25EdXIiLCJjdXN0b21TdGFydERhdGUiLCJjdXN0b21FbmREYXRlIiwic3RvcmUiLCJnZXRTdGF0ZSIsInRpdGxlIiwiZmlsdGVyQ29tcGFueUluZm8iLCJsZWdhbE5hbWUiLCJyZWdpc3RyYXRpb25OdW1iZXIiLCJ2YXQiLCJhZGRyZXNzIiwiYWRkcmVzczIiLCJjaXR5IiwiemlwIiwiY291bnRyeSIsImlzQVBJQXZhaWxhYmxlIiwiRmlsZSIsIkZpbGVSZWFkZXIiLCJGaWxlTGlzdCIsIkJsb2IiLCJkb2N1bWVudCIsIndyaXRlbG4iLCJhZGRPcmRpbmFsIiwibiIsInN0ciIsInRvU3RyaW5nIiwic2xpY2UiLCJvcmQiLCJnZXRJbmRleCIsImFyciIsInByb3AiLCJnZXRXZWJzaXRlVVJsIiwiaW5jbHVkZXMiLCJpc0xpc3RpbmdQdWJsaXNoZWQiLCJsYW5kaW5nVHlwZXMiLCJSRVNFVF9QQVNTV09SRF9TVUNDRVNTIiwiQ0xFQVJfUkVTRVRfUEFTU1dPUkQiLCJTRVRfUkVGRVJFUl9EQVRBIiwiREVGQVVMVF9TVEFURSIsInJlc2V0UGFzc3dvcmRTdWNjZXNzIiwibGFuZGluZyIsInJlZmVyZXJFbWFpbCIsInJlZmVyZXJMaXN0aW5nSWQiLCJhbGxWYWx1ZSIsIkxhbmd1YWdlU2VsZWN0b3IiLCJwcm9wcyIsImhhbmRsZU9uQ2hhbmdlIiwic2VsZWN0aW9uIiwib25DaGFuZ2UiLCJoYXNBbGwiLCJmaW5kIiwiaGFzQWxsUHJldiIsInByZXZTZWxlY3Rpb24iLCJtdWx0aSIsInBsYWNlaG9sZGVyIiwicmVhbExhbmd1YWdlcyIsInZhbHVlcyIsImsiLCJhbGxMYW5ndWFnZXMiLCJSZWFjdCIsIkNvbXBvbmVudCIsImNvbW1vblR5cGVzIiwiR0VUX0RFRkFVTFRfUklHSFRTX1BBQ0tBR0UiLCJTRVRfVE9UQUxfQ09VTlRSSUVTIiwiU0VUX1RFU1RfU1RBR0VfTU9ERSIsIlNFVF9FTlZfSE9TVF9VUkwiLCJjb21tb25EZWZhdWx0IiwidG90YWxDb3VudHJpZXMiLCJ0ZXN0U3RhZ2VNb2RlIiwiY29tbW9uIiwiZGVmYXVsdFJpZ2h0c1BhY2thZ2UiLCJlbnZIb3N0VXJsIiwidXNlclR5cGVzIiwiTE9HT1VUIiwiTE9HSU4iLCJQUk9GSUxFIiwiTE9BRF9VU0VSX0RBVEEiLCJkZWZhdWx0VXNlciIsInZhbGlkYXRpb25UeXBlcyIsIkVOQUJMRV9WQUxJREFUSU9OIiwiRElTQUJMRV9WQUxJREFUSU9OIiwidmFsaWRhdGlvbiIsInJlZHVjZXJzIiwiY29tYmluZVJlZHVjZXJzIiwic2VsZWN0b3IiLCJtYW5hZ2UiLCJpMThuU3RhdGUiLCJjcmVhdGVTdG9yZSIsImFwcGx5TWlkZGxld2FyZSIsIm1hbmFnZVR5cGVzIiwiVEVTVCIsInRlc3RJdGVtIiwidGVzdCIsInRleHQiLCJDT05URU5UX0lOSVQiLCJTVEVQX0NIQU5HRV9SRVNFVCIsIkdPX1RPX1NURVAiLCJHT19UT19ORVhUX1NURVAiLCJHT19UT19QUkVWSU9VU19TVEVQIiwiQUREX05FVyIsIlJFTU9WRV9ORVciLCJTVVBFUl9SSUdIVFNfVVBEQVRFRCIsIlVQREFURV9DT05URU5UX1ZBTFVFIiwiU0VMRUNUX1RPVVJOQU1FTlQiLCJSRU1PVkVfRlJPTV9NVUxUSVBMRSIsIlVQREFURV9GUk9NX01VTFRJUExFIiwiQVBQTFlfU0VMRUNUSU9OIiwiVVBEQVRFX1NBTEVTX1BBQ0tBR0VTIiwiVVBEQVRFX0FUVEFDSE1FTlRTIiwiVVBEQVRFX0FOTkVYIiwiQUREX1NBTEVTX1BBQ0tBR0VTIiwiUkVTRVQiLCJBTExfRVBJU09ERV9VUERBVEVfRkxBRyIsIkVtcHR5TGlzdGluZyIsIm1heFN0ZXAiLCJjdXN0b21Ub3VybmFtZW50IiwiY3VzdG9tQ2F0ZWdvcnkiLCJkZXNjcmlwdGlvbiIsInByb2dyYW1EZXNjcmlwdGlvbiIsImF0dGFjaG1lbnRzIiwiYW5uZXgiLCJlbmREYXRlTGltaXQiLCJjb3VudGVyIiwiY3VycmVuY3kiLCJzdGFydERhdGVNb2RlIiwic3RlcENoYW5nZSIsIk5BX0lOUFVUIiwiSExfSU5QVVQiLCJMSUNFTlNFRF9MQU5HVUFHRVMiLCJQUk9HUkFNX0xBTkdVQUdFIiwiUFJPR1JBTV9TVUJUSVRMRVMiLCJQUk9HUkFNX1NDUklQVCIsIkVESVRfUFJPR1JBTV9ERVNDUklQVElPTl9PUFRJT05BTCIsIndlYnNpdGUiLCJpbWFnZSIsImltYWdlQmFzZTY0IiwidGVtcERhdGEiLCJuZXdTdGF0ZSIsImluaXRpYWxpemVkIiwibWF4IiwicGF5bG9hZCIsIm5ld1N0ZXAiLCJzZWxlY3RvclR5cGUiLCJjbGVhbiIsImxpc3RpbmdFZGl0ZWQiLCJzZWxlY3RlZEl0ZW1zIiwibXVsdGlwbGUiLCJzYWxlc1BhY2thZ2UiLCJPUEVOX1NFTEVDVE9SIiwiQ0xPU0VfU0VMRUNUT1IiLCJvcGVuIiwic2VsZWN0b3JJdGVtcyIsInBvcHVsYXJJdGVtcyIsImFjdGl2ZUZpbHRlciIsImRpc2FibGVkIiwic2hvd05ld1Nwb3J0Iiwic2hvd05ld1RvdXJuYW1lbnQiLCJzaG93TmV3Q2F0ZWdvcnkiLCJzaG93TmV3U2Vhc29uIiwic2hvd0FsbENvdW50cmllcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDZGOzs7Ozs7Ozs7Ozs7O0FDQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEM7QUFDNUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7QUNuTEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ25EQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDbEJBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxH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RUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFB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Ozs7Ozs7Ozs7Ozs7QUM1QkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7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QVAsQ0FBYyxFQUFkLEVBQWtCSixLQUFsQixFQUF5QjtBQUM1QitZLDhCQUFjOVksT0FBTzhZLFlBRE87QUFFNUJRLHNCQUFPLElBRnFCO0FBRzVCalosdUJBQVFMLE9BQU9LLEtBSGE7QUFJNUJrWiwrQkFBZXZaLE9BQU91WixhQUpNO0FBSzVCQyw4QkFBY3haLE9BQU93WixZQUxPO0FBTTVCQyw4QkFBZXpaLE9BQU95WixZQU5NO0FBTzVCUCwwQkFBV2xaLE9BQU9rWixRQVBVO0FBUTVCUSwwQkFBVTFaLE9BQU8wWixRQVJXO0FBUzVCQyw4QkFBZTNaLE9BQU8yWixZQVRNO0FBVTVCQyxtQ0FBb0I1WixPQUFPNFosaUJBVkM7QUFXNUJDLGlDQUFrQjdaLE9BQU82WixlQVhHO0FBWTVCQywrQkFBZ0I5WixPQUFPOFosYUFaSztBQWE1QkMsa0NBQWtCL1osT0FBTytaLGdCQWJHO0FBYzVCaEIsdUJBQVEvWSxPQUFPK1ksS0FkYTtBQWU1QkUsK0JBQWVqWixPQUFPaVo7QUFmTSxhQUF6QixDQUFQO0FBaUJKLGFBQUtILGFBQWFPLGNBQWxCO0FBQ0ksbUJBQU9uWixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosS0FBbEIsRUFBeUI7QUFDNUIrWSw4QkFBYyxFQURjO0FBRTVCUSxzQkFBTyxLQUZxQjtBQUc1QkMsK0JBQWUsRUFIYTtBQUk1QkMsOEJBQWM7QUFKYyxhQUF6QixDQUFQO0FBTUosYUFBS1YsYUFBYXBDLGVBQWxCO0FBQ0ksbUJBQU94VyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQkosS0FBbEIsRUFBeUI7QUFDNUIrWSw4QkFBYyxFQURjO0FBRTVCUSxzQkFBTyxLQUZxQjtBQUc1QkMsK0JBQWUsRUFIYTtBQUk1QkMsOEJBQWM7QUFKYyxhQUF6QixDQUFQO0FBTUo7QUFDSSxtQkFBT3paLEtBQVA7QUF0Q1I7QUF3Q0gsQ0FoRE0sQyIsImZpbGUiOiJjYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xudmFyIGJ0b2EgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmJ0b2EgJiYgd2luZG93LmJ0b2EuYmluZCh3aW5kb3cpKSB8fCByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnRvYScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkRXZlbnQgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbiAgICB2YXIgeERvbWFpbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIElFIDgvOSBDT1JTIHN1cHBvcnRcbiAgICAvLyBPbmx5IHN1cHBvcnRzIFBPU1QgYW5kIEdFVCBjYWxscyBhbmQgZG9lc24ndCByZXR1cm5zIHRoZSByZXNwb25zZSBoZWFkZXJzLlxuICAgIC8vIERPTidUIGRvIHRoaXMgZm9yIHRlc3RpbmcgYi9jIFhNTEh0dHBSZXF1ZXN0IGlzIG1vY2tlZCwgbm90IFhEb21haW5SZXF1ZXN0LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCAmJiAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAgICFpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gICAgICBsb2FkRXZlbnQgPSAnb25sb2FkJztcbiAgICAgIHhEb21haW4gPSB0cnVlO1xuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gaGFuZGxlUHJvZ3Jlc3MoKSB7fTtcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHt9O1xuICAgIH1cblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3RbbG9hZEV2ZW50XSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCAmJiAheERvbWFpbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgLy8gSUUgc2VuZHMgMTIyMyBpbnN0ZWFkIG9mIDIwNCAoaHR0cHM6Ly9naXRodWIuY29tL2F4aW9zL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgbWV0aG9kcyBsaWtlIGBfLm1heGAgYW5kIGBfLm1pbmAgd2hpY2ggYWNjZXB0cyBhXG4gKiBgY29tcGFyYXRvcmAgdG8gZGV0ZXJtaW5lIHRoZSBleHRyZW11bSB2YWx1ZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBpdGVyYXRlZSBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIHVzZWQgdG8gY29tcGFyZSB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZXh0cmVtdW0gdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VFeHRyZW11bShhcnJheSwgaXRlcmF0ZWUsIGNvbXBhcmF0b3IpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgIGN1cnJlbnQgPSBpdGVyYXRlZSh2YWx1ZSk7XG5cbiAgICBpZiAoY3VycmVudCAhPSBudWxsICYmIChjb21wdXRlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAoY3VycmVudCA9PT0gY3VycmVudCAmJiAhaXNTeW1ib2woY3VycmVudCkpXG4gICAgICAgICAgOiBjb21wYXJhdG9yKGN1cnJlbnQsIGNvbXB1dGVkKVxuICAgICAgICApKSB7XG4gICAgICB2YXIgY29tcHV0ZWQgPSBjdXJyZW50LFxuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VFeHRyZW11bTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUV4dHJlbXVtLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VFeHRyZW11bS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VHZXRUYWcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZ3RgIHdoaWNoIGRvZXNuJ3QgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBncmVhdGVyIHRoYW4gYG90aGVyYCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHdCh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID4gb3RoZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUd0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUd0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9fcm9vdC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaWRlbnRpdHkuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pZGVudGl0eS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTeW1ib2w7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsInZhciBiYXNlRXh0cmVtdW0gPSByZXF1aXJlKCcuL19iYXNlRXh0cmVtdW0nKSxcbiAgICBiYXNlR3QgPSByZXF1aXJlKCcuL19iYXNlR3QnKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWF4aW11bSB2YWx1ZSBvZiBgYXJyYXlgLiBJZiBgYXJyYXlgIGlzIGVtcHR5IG9yIGZhbHNleSxcbiAqIGB1bmRlZmluZWRgIGlzIHJldHVybmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1heGltdW0gdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ubWF4KFs0LCAyLCA4LCA2XSk7XG4gKiAvLyA9PiA4XG4gKlxuICogXy5tYXgoW10pO1xuICogLy8gPT4gdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIG1heChhcnJheSkge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aClcbiAgICA/IGJhc2VFeHRyZW11bShhcnJheSwgaWRlbnRpdHksIGJhc2VHdClcbiAgICA6IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvbWF4LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9sb2Rhc2gvbWF4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiZXhwb3J0IGNvbnN0IGxhbmd1YWdlcyA9IHtcbiAgICBcImFiXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFia2hhelwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCw0qfRgdGD0LBcIlxuICAgIH0sXG4gICAgXCJhYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBZmFyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZhcmFmXCJcbiAgICB9LFxuICAgIFwiYWZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWZyaWthYW5zXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZyaWthYW5zXCJcbiAgICB9LFxuICAgIFwiYWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWthblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFrYW5cIlxuICAgIH0sXG4gICAgXCJzcVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBbGJhbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNocWlwXCJcbiAgICB9LFxuICAgIFwiYW1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQW1oYXJpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGKoOGIm+GIreGKm1wiXG4gICAgfSxcbiAgICBcImFyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFyYWJpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItin2YTYudix2KjZitipXCJcbiAgICB9LFxuICAgIFwiYW5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXJhZ29uZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXJhZ29uw6lzXCJcbiAgICB9LFxuICAgIFwiaHlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXJtZW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLVgNWh1bXVpdaA1aXVtlwiXG4gICAgfSxcbiAgICBcImFzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFzc2FtZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KaF4Ka44Kau4KeA4Kav4Ka84Ka+XCJcbiAgICB9LFxuICAgIFwiYXZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXZhcmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LDQstCw0YAg0LzQsNGG04AsINC80LDQs9OA0LDRgNGD0Lsg0LzQsNGG04BcIlxuICAgIH0sXG4gICAgXCJhZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBdmVzdGFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYXZlc3RhXCJcbiAgICB9LFxuICAgIFwiYXlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXltYXJhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYXltYXIgYXJ1XCJcbiAgICB9LFxuICAgIFwiYXpcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXplcmJhaWphbmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJhesmZcmJheWNhbiBkaWxpXCJcbiAgICB9LFxuICAgIFwiYm1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmFtYmFyYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJhbWFuYW5rYW5cIlxuICAgIH0sXG4gICAgXCJiYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCYXNoa2lyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LHQsNGI0qHQvtGA0YIg0YLQtdC70LVcIlxuICAgIH0sXG4gICAgXCJldVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCYXNxdWVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJldXNrYXJhLCBldXNrZXJhXCJcbiAgICB9LFxuICAgIFwiYmVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmVsYXJ1c2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCR0LXQu9Cw0YDRg9GB0LrQsNGPXCJcbiAgICB9LFxuICAgIFwiYm5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmVuZ2FsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCmrOCmvuCmguCmsuCmvlwiXG4gICAgfSxcbiAgICBcImJoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJpaGFyaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkreCli+CknOCkquClgeCksOClgFwiXG4gICAgfSxcbiAgICBcImJpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJpc2xhbWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJCaXNsYW1hXCJcbiAgICB9LFxuICAgIFwiYnNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQm9zbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJvc2Fuc2tpIGplemlrXCJcbiAgICB9LFxuICAgIFwiYnJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnJldG9uXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYnJlemhvbmVnXCJcbiAgICB9LFxuICAgIFwiYmdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnVsZ2FyaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LHRitC70LPQsNGA0YHQutC4INC10LfQuNC6XCJcbiAgICB9LFxuICAgIFwibXlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQnVybWVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGAl+GAmeGArOGAheGArFwiXG4gICAgfSxcbiAgICBcImNhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNhdGFsYW47IFZhbGVuY2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkNhdGFsw6BcIlxuICAgIH0sXG4gICAgXCJjaFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGFtb3Jyb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkNoYW1vcnVcIlxuICAgIH0sXG4gICAgXCJjZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGVjaGVuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0L3QvtGF0YfQuNC50L0g0LzQvtGC0YJcIlxuICAgIH0sXG4gICAgXCJueVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGljaGV3YTsgQ2hld2E7IE55YW5qYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImNoaUNoZcW1YSwgY2hpbnlhbmphXCJcbiAgICB9LFxuICAgIFwiemhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2hpbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuS4reaWhyAoWmjFjW5nd8OpbiksIOaxieivrSwg5ryi6KqeXCJcbiAgICB9LFxuICAgIFwiY3ZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2h1dmFzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGH05HQstCw0Ygg0YfTl9C70YXQuFwiXG4gICAgfSxcbiAgICBcImt3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNvcm5pc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLZXJuZXdla1wiXG4gICAgfSxcbiAgICBcImNvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNvcnNpY2FuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiY29yc3UsIGxpbmd1YSBjb3JzYVwiXG4gICAgfSxcbiAgICBcImNyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNyZWVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhk4DhkKbhkIPhlK3hkI3hkI/hkKNcIlxuICAgIH0sXG4gICAgXCJoclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDcm9hdGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImhydmF0c2tpXCJcbiAgICB9LFxuICAgIFwiY3NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ3plY2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLEjWVza3ksIMSNZcWhdGluYVwiXG4gICAgfSxcbiAgICBcImRhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkRhbmlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImRhbnNrXCJcbiAgICB9LFxuICAgIFwiZHZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRGl2ZWhpOyBEaGl2ZWhpOyBNYWxkaXZpYW47XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi3oveqN6I3qzegN6oXCJcbiAgICB9LFxuICAgIFwibmxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRHV0Y2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOZWRlcmxhbmRzLCBWbGFhbXNcIlxuICAgIH0sXG4gICAgXCJlblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJFbmdsaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRW5nbGlzaFwiXG4gICAgfSxcbiAgICBcImVvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkVzcGVyYW50b1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkVzcGVyYW50b1wiXG4gICAgfSxcbiAgICBcImV0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkVzdG9uaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZWVzdGksIGVlc3RpIGtlZWxcIlxuICAgIH0sXG4gICAgXCJlZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJFd2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFyotlZ2JlXCJcbiAgICB9LFxuICAgIFwiZm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRmFyb2VzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImbDuHJveXNrdFwiXG4gICAgfSxcbiAgICBcImZqXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZpamlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInZvc2EgVmFrYXZpdGlcIlxuICAgIH0sXG4gICAgXCJmaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGaW5uaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic3VvbWksIHN1b21lbiBraWVsaVwiXG4gICAgfSxcbiAgICBcImZyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZyZW5jaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImZyYW7Dp2FpcywgbGFuZ3VlIGZyYW7Dp2Fpc2VcIlxuICAgIH0sXG4gICAgXCJmZlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGdWxhOyBGdWxhaDsgUHVsYWFyOyBQdWxhclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkZ1bGZ1bGRlLCBQdWxhYXIsIFB1bGFyXCJcbiAgICB9LFxuICAgIFwiZ2xcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR2FsaWNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWxlZ29cIlxuICAgIH0sXG4gICAgXCJrYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHZW9yZ2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGDpeGDkOGDoOGDl+GDo+GDmuGDmFwiXG4gICAgfSxcbiAgICBcImRlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkdlcm1hblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkRldXRzY2hcIlxuICAgIH0sXG4gICAgXCJlbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHcmVlaywgTW9kZXJuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwizpXOu867zrfOvc65zrrOrFwiXG4gICAgfSxcbiAgICBcImduXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkd1YXJhbsOtXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXZhw7Fl4bq9XCJcbiAgICB9LFxuICAgIFwiZ3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR3VqYXJhdGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgqpfgq4HgqpzgqrDgqr7gqqTgq4BcIlxuICAgIH0sXG4gICAgXCJodFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIYWl0aWFuOyBIYWl0aWFuIENyZW9sZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktyZXnDsmwgYXlpc3llblwiXG4gICAgfSxcbiAgICBcImhhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhhdXNhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSGF1c2EsINmH2Y7ZiNmP2LPZjlwiXG4gICAgfSxcbiAgICBcImhlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhlYnJldyAobW9kZXJuKVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItei15HXqNeZ16pcIlxuICAgIH0sXG4gICAgXCJoelwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIZXJlcm9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPdGppaGVyZXJvXCJcbiAgICB9LFxuICAgIFwiaGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGluZGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLngpL/gpKjgpY3gpKbgpYAsIOCkueCkv+CkguCkpuClgFwiXG4gICAgfSxcbiAgICBcImhvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhpcmkgTW90dVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkhpcmkgTW90dVwiXG4gICAgfSxcbiAgICBcImh1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkh1bmdhcmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hZ3lhclwiXG4gICAgfSxcbiAgICBcImlhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkludGVybGluZ3VhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSW50ZXJsaW5ndWFcIlxuICAgIH0sXG4gICAgXCJpZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbmRvbmVzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQmFoYXNhIEluZG9uZXNpYVwiXG4gICAgfSxcbiAgICBcImllXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkludGVybGluZ3VlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT3JpZ2luYWxseSBjYWxsZWQgT2NjaWRlbnRhbDsgdGhlbiBJbnRlcmxpbmd1ZSBhZnRlciBXV0lJXCJcbiAgICB9LFxuICAgIFwiZ2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSXJpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWVpbGdlXCJcbiAgICB9LFxuICAgIFwiaWdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWdib1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkFz4bulc+G7pSBJZ2JvXCJcbiAgICB9LFxuICAgIFwiaWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW51cGlhcVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIknDsXVwaWFxLCBJw7F1cGlhdHVuXCJcbiAgICB9LFxuICAgIFwiaW9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWRvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSWRvXCJcbiAgICB9LFxuICAgIFwiaXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSWNlbGFuZGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiw41zbGVuc2thXCJcbiAgICB9LFxuICAgIFwiaXRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSXRhbGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkl0YWxpYW5vXCJcbiAgICB9LFxuICAgIFwiaXVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW51a3RpdHV0XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4ZCD4ZOE4ZKD4ZGO4ZGQ4ZGmXCJcbiAgICB9LFxuICAgIFwiamFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSmFwYW5lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLml6XmnKzoqp4gKOOBq+OBu+OCk+OBlO+8j+OBq+OBo+OBveOCk+OBlClcIlxuICAgIH0sXG4gICAgXCJqdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJKYXZhbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJhc2EgSmF3YVwiXG4gICAgfSxcbiAgICBcImtsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthbGFhbGxpc3V0LCBHcmVlbmxhbmRpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImthbGFhbGxpc3V0LCBrYWxhYWxsaXQgb3FhYXNpaVwiXG4gICAgfSxcbiAgICBcImtuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthbm5hZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgspXgsqjgs43gsqjgsqFcIlxuICAgIH0sXG4gICAgXCJrclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYW51cmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLYW51cmlcIlxuICAgIH0sXG4gICAgXCJrc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYXNobWlyaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkleCktuCljeCkruClgOCksOClgCwg2YPYtNmF2YrYsdmK4oCOXCJcbiAgICB9LFxuICAgIFwia2tcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2F6YWtoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0prQsNC30LDSmyDRgtGW0LvRllwiXG4gICAgfSxcbiAgICBcImttXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktobWVyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Z6X4Z624Z6f4Z624Z6B4Z+S4Z6Y4Z+C4Z6aXCJcbiAgICB9LFxuICAgIFwia2lcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2lrdXl1LCBHaWt1eXVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHxKlrxal5xalcIlxuICAgIH0sXG4gICAgXCJyd1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLaW55YXJ3YW5kYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIklraW55YXJ3YW5kYVwiXG4gICAgfSxcbiAgICBcImt5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpcmdoaXosIEt5cmd5elwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC60YvRgNCz0YvQtyDRgtC40LvQuFwiXG4gICAgfSxcbiAgICBcImt2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktvbWlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQutC+0LzQuCDQutGL0LJcIlxuICAgIH0sXG4gICAgXCJrZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLb25nb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktpS29uZ29cIlxuICAgIH0sXG4gICAgXCJrb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLb3JlYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLtlZzqta3slrQgKOmfk+Wci+iqniksIOyhsOyEoOunkCAo5pyd6a6u6KqeKVwiXG4gICAgfSxcbiAgICBcImt1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkt1cmRpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLdXJkw64sINmD2YjYsdiv24zigI5cIlxuICAgIH0sXG4gICAgXCJralwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLd2FueWFtYSwgS3VhbnlhbWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLdWFueWFtYVwiXG4gICAgfSxcbiAgICBcImxhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxhdGluXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwibGF0aW5lLCBsaW5ndWEgbGF0aW5hXCJcbiAgICB9LFxuICAgIFwibGJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTHV4ZW1ib3VyZ2lzaCwgTGV0emVidXJnZXNjaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkzDq3R6ZWJ1ZXJnZXNjaFwiXG4gICAgfSxcbiAgICBcImxnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkx1Z2FuZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMdWdhbmRhXCJcbiAgICB9LFxuICAgIFwibGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGltYnVyZ2lzaCwgTGltYnVyZ2FuLCBMaW1idXJnZXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMaW1idXJnc1wiXG4gICAgfSxcbiAgICBcImxuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxpbmdhbGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMaW5nw6FsYVwiXG4gICAgfSxcbiAgICBcImxvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxhb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC6nuC6suC6quC6suC6peC6suC6p1wiXG4gICAgfSxcbiAgICBcImx0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxpdGh1YW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJsaWV0dXZpxbMga2FsYmFcIlxuICAgIH0sXG4gICAgXCJsdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMdWJhLUthdGFuZ2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJcIlxuICAgIH0sXG4gICAgXCJsdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMYXR2aWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwibGF0dmllxaF1IHZhbG9kYVwiXG4gICAgfSxcbiAgICBcImd2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbnhcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWVsZywgR2FpbGNrXCJcbiAgICB9LFxuICAgIFwibWtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFjZWRvbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC80LDQutC10LTQvtC90YHQutC4INGY0LDQt9C40LpcIlxuICAgIH0sXG4gICAgXCJtZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYWxhZ2FzeVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hbGFnYXN5IGZpdGVueVwiXG4gICAgfSxcbiAgICBcIm1zXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbGF5XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYmFoYXNhIE1lbGF5dSwg2KjZh9in2LMg2YXZhNin2YrZiOKAjlwiXG4gICAgfSxcbiAgICBcIm1sXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbGF5YWxhbVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC0ruC0suC0r+C0vuC0s+C0glwiXG4gICAgfSxcbiAgICBcIm10XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbHRlc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJNYWx0aVwiXG4gICAgfSxcbiAgICBcIm1pXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk3EgW9yaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInRlIHJlbyBNxIFvcmlcIlxuICAgIH0sXG4gICAgXCJtclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYXJhdGhpIChNYXLEgeG5rWjEqylcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpK7gpLDgpL7gpKDgpYBcIlxuICAgIH0sXG4gICAgXCJtaFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYXJzaGFsbGVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkthamluIE3Mp2FqZcS8XCJcbiAgICB9LFxuICAgIFwibW5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTW9uZ29saWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LzQvtC90LPQvtC7XCJcbiAgICB9LFxuICAgIFwibmFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTmF1cnVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFa2FrYWlyxakgTmFvZXJvXCJcbiAgICB9LFxuICAgIFwibnZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTmF2YWpvLCBOYXZhaG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJEaW7DqSBiaXphYWQsIERpbsOpa8q8ZWjHsMOtXCJcbiAgICB9LFxuICAgIFwibmJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9yd2VnaWFuIEJva23DpWxcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOb3JzayBib2ttw6VsXCJcbiAgICB9LFxuICAgIFwibmRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9ydGggTmRlYmVsZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImlzaU5kZWJlbGVcIlxuICAgIH0sXG4gICAgXCJuZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOZXBhbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpKjgpYfgpKrgpL7gpLLgpYBcIlxuICAgIH0sXG4gICAgXCJuZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOZG9uZ2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPd2FtYm9cIlxuICAgIH0sXG4gICAgXCJublwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW4gTnlub3Jza1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrIG55bm9yc2tcIlxuICAgIH0sXG4gICAgXCJub1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJOb3Jza1wiXG4gICAgfSxcbiAgICBcImlpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk51b3N1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi6oaI6oyg6pK/IE51b3N1aHhvcFwiXG4gICAgfSxcbiAgICBcIm5yXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNvdXRoIE5kZWJlbGVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJpc2lOZGViZWxlXCJcbiAgICB9LFxuICAgIFwib2NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT2NjaXRhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk9jY2l0YW5cIlxuICAgIH0sXG4gICAgXCJvalwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPamlid2UsIE9qaWJ3YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGQiuGTguGUkeGTiOGQr+GSp+GQjuGTkFwiXG4gICAgfSxcbiAgICBcImN1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9sZCBDaHVyY2ggU2xhdm9uaWMsIENodXJjaCBTbGF2aWMsIENodXJjaCBTbGF2b25pYywgT2xkIEJ1bGdhcmlhbiwgT2xkIFNsYXZvbmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0anQt9GL0LrRiiDRgdC70L7QstGj0L3RjNGB0LrRilwiXG4gICAgfSxcbiAgICBcIm9tXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9yb21vXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZhYW4gT3JvbW9vXCJcbiAgICB9LFxuICAgIFwib3JcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT3JpeWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgrJPgrKHgrLzgrL/grIZcIlxuICAgIH0sXG4gICAgXCJvc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPc3NldGlhbiwgT3NzZXRpY1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC40YDQvtC9IMOm0LLQt9Cw0LNcIlxuICAgIH0sXG4gICAgXCJwYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQYW5qYWJpLCBQdW5qYWJpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Kiq4Kmw4Kic4Ki+4Kis4KmALCDZvtmG2KzYp9io24zigI5cIlxuICAgIH0sXG4gICAgXCJwaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQxIFsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkquCkvuCktOCkv1wiXG4gICAgfSxcbiAgICBcImZhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBlcnNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLZgdin2LHYs9uMXCJcbiAgICB9LFxuICAgIFwicGxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUG9saXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwicG9sc2tpXCJcbiAgICB9LFxuICAgIFwicHNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUGFzaHRvLCBQdXNodG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLZvtqa2KrZiFwiXG4gICAgfSxcbiAgICBcInB0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBvcnR1Z3Vlc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJQb3J0dWd1w6pzXCJcbiAgICB9LFxuICAgIFwicXVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUXVlY2h1YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlJ1bmEgU2ltaSwgS2ljaHdhXCJcbiAgICB9LFxuICAgIFwicm1cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUm9tYW5zaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInJ1bWFudHNjaCBncmlzY2h1blwiXG4gICAgfSxcbiAgICBcInJuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpcnVuZGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJraVJ1bmRpXCJcbiAgICB9LFxuICAgIFwicm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUm9tYW5pYW4sIE1vbGRhdmlhbiwgTW9sZG92YW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJyb23Dom7Eg1wiXG4gICAgfSxcbiAgICBcInJ1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlJ1c3NpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgNGD0YHRgdC60LjQuSDRj9C30YvQulwiXG4gICAgfSxcbiAgICBcInNhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNhbnNrcml0IChTYeG5gXNr4bmbdGEpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KS44KSC4KS44KWN4KSV4KWD4KSk4KSu4KWNXCJcbiAgICB9LFxuICAgIFwic2NcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2FyZGluaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic2FyZHVcIlxuICAgIH0sXG4gICAgXCJzZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTaW5kaGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLjgpL/gpKjgpY3gpKfgpYAsINiz2YbajNmK2Iwg2LPZhtiv2r7bjOKAjlwiXG4gICAgfSxcbiAgICBcInNlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcnRoZXJuIFNhbWlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJEYXZ2aXPDoW1lZ2llbGxhXCJcbiAgICB9LFxuICAgIFwic21cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2Ftb2FuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZ2FnYW5hIGZhYSBTYW1vYVwiXG4gICAgfSxcbiAgICBcInNnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNhbmdvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiecOibmfDoiB0w64gc8OkbmfDtlwiXG4gICAgfSxcbiAgICBcInNyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNlcmJpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgdGA0L/RgdC60Lgg0ZjQtdC30LjQulwiXG4gICAgfSxcbiAgICBcImdkXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNjb3R0aXNoIEdhZWxpYzsgR2FlbGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiR8OgaWRobGlnXCJcbiAgICB9LFxuICAgIFwic25cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2hvbmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJjaGlTaG9uYVwiXG4gICAgfSxcbiAgICBcInNpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNpbmhhbGEsIFNpbmhhbGVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC3g+C3kuC2guC3hOC2vVwiXG4gICAgfSxcbiAgICBcInNrXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNsb3Zha1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInNsb3ZlbsSNaW5hXCJcbiAgICB9LFxuICAgIFwic2xcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2xvdmVuZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInNsb3ZlbsWhxI1pbmFcIlxuICAgIH0sXG4gICAgXCJzb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTb21hbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTb29tYWFsaWdhLCBhZiBTb29tYWFsaVwiXG4gICAgfSxcbiAgICBcInN0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNvdXRoZXJuIFNvdGhvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2Vzb3Rob1wiXG4gICAgfSxcbiAgICBcImVzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNwYW5pc2g7IENhc3RpbGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImVzcGHDsW9sLCBjYXN0ZWxsYW5vXCJcbiAgICB9LFxuICAgIFwic3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3VuZGFuZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQmFzYSBTdW5kYVwiXG4gICAgfSxcbiAgICBcInN3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlN3YWhpbGlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLaXN3YWhpbGlcIlxuICAgIH0sXG4gICAgXCJzc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTd2F0aVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNpU3dhdGlcIlxuICAgIH0sXG4gICAgXCJzdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTd2VkaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic3ZlbnNrYVwiXG4gICAgfSxcbiAgICBcInRhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRhbWlsXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4K6k4K6u4K6/4K604K+NXCJcbiAgICB9LFxuICAgIFwidGVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGVsdWd1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LCk4LGG4LCy4LGB4LCX4LGBXCJcbiAgICB9LFxuICAgIFwidGdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFqaWtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgtC+0rfQuNC606MsIHRvxJ9pa8SrLCDYqtin2KzbjNqp24zigI5cIlxuICAgIH0sXG4gICAgXCJ0aFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUaGFpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LmE4LiX4LiiXCJcbiAgICB9LFxuICAgIFwidGlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGlncmlueWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhibXhjI3hiK3hiptcIlxuICAgIH0sXG4gICAgXCJib1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUaWJldGFuIFN0YW5kYXJkLCBUaWJldGFuLCBDZW50cmFsXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4L2W4L284L2R4LyL4L2h4L2y4L2CXCJcbiAgICB9LFxuICAgIFwidGtcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHVya21lblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlTDvHJrbWVuLCDQotKv0YDQutC80LXQvVwiXG4gICAgfSxcbiAgICBcInRsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRhZ2Fsb2dcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJXaWthbmcgVGFnYWxvZywg4ZyP4ZyS4ZyD4ZyF4ZyUIOGchuGchOGcjuGck+GchOGclFwiXG4gICAgfSxcbiAgICBcInRuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRzd2FuYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNldHN3YW5hXCJcbiAgICB9LFxuICAgIFwidG9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVG9uZ2EgKFRvbmdhIElzbGFuZHMpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZmFrYSBUb25nYVwiXG4gICAgfSxcbiAgICBcInRyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlR1cmtpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUw7xya8OnZVwiXG4gICAgfSxcbiAgICBcInRzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRzb25nYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlhpdHNvbmdhXCJcbiAgICB9LFxuICAgIFwidHRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGF0YXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgtCw0YLQsNGA0YfQsCwgdGF0YXLDp2EsINiq2KfYqtin2LHahtin4oCOXCJcbiAgICB9LFxuICAgIFwidHdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHdpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVHdpXCJcbiAgICB9LFxuICAgIFwidHlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFoaXRpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJSZW8gVGFoaXRpXCJcbiAgICB9LFxuICAgIFwidWdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVWlnaHVyLCBVeWdodXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJVecajdXJxyZksINim24fZiti624fYsdqG25XigI5cIlxuICAgIH0sXG4gICAgXCJ1a1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJVa3JhaW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRg9C60YDQsNGX0L3RgdGM0LrQsFwiXG4gICAgfSxcbiAgICBcInVyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlVyZHVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLYp9ix2K/ZiFwiXG4gICAgfSxcbiAgICBcInV6XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlV6YmVrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiemJlaywg0I7Qt9Cx0LXQuiwg2KPbh9iy2KjbkNmD4oCOXCJcbiAgICB9LFxuICAgIFwidmVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVmVuZGFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUc2hpdmVu4biTYVwiXG4gICAgfSxcbiAgICBcInZpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlZpZXRuYW1lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUaeG6v25nIFZp4buHdFwiXG4gICAgfSxcbiAgICBcInZvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlZvbGFww7xrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVm9sYXDDvGtcIlxuICAgIH0sXG4gICAgXCJ3YVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXYWxsb29uXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiV2Fsb25cIlxuICAgIH0sXG4gICAgXCJjeVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXZWxzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkN5bXJhZWdcIlxuICAgIH0sXG4gICAgXCJ3b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJXb2xvZlwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIldvbGxvZlwiXG4gICAgfSxcbiAgICBcImZ5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldlc3Rlcm4gRnJpc2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkZyeXNrXCJcbiAgICB9LFxuICAgIFwieGhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiWGhvc2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJpc2lYaG9zYVwiXG4gICAgfSxcbiAgICBcInlpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIllpZGRpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLXmdeZ1rTXk9eZ16lcIlxuICAgIH0sXG4gICAgXCJ5b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJZb3J1YmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJZb3LDuWLDoVwiXG4gICAgfSxcbiAgICBcInphXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlpodWFuZywgQ2h1YW5nXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2HJryBjdWXFi8aFLCBTYXcgY3VlbmdoXCJcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2RhdGEvbGFuZ3VhZ2VzLmpzIiwiZXhwb3J0IGNvbnN0IGZpbHRlclR5cGVzPSB7XG4gICAgQUREX1JJR0hUOidBRERfUklHSFQnLFxuICAgIFJFTU9WRV9SSUdIVCA6ICdSRU1PVkVfUklHSFQnLFxuICAgIFVQREFURV9DT1VOVFJJRVMgOiAnVVBEQVRFX0NPVU5UUklFUycsXG4gICAgVVBEQVRFX0VYQ0xVU0lWRSA6ICdVUERBVEVfRVhDTFVTSVZFJyxcbiAgICBVUERBVEVfSU5DTFVERURfQ09VTlRSSUVTIDogJ1VQREFURV9JTkNMVURFRF9DT1VOVFJJRVMnLFxuICAgIFVQREFURV9TUE9SVCA6ICdVUERBVEVfU1BPUlQnLFxuICAgIFVQREFURV9FVkVOVCA6ICdVUERBVEVfRVZFTlQnLFxuICAgIENMRUFSIDogJ0NMRUFSJyxcbiAgICBDTEVBUl9VUERBVEUgOiAnQ0xFQVJfVVBEQVRFJyxcbiAgICBVUERBVEVfTUFOWSA6ICdVUERBVEVfTUFOWScsXG4gICAgVVBEQVRFX0ZJTFRFUlNfQ09ORklHOiBcIlVQREFURV9BTExcIixcbiAgICBVUERBVEVfRVZFTlRfREFURV9GUk9NX1RPOiBcIlVQREFURV9GUk9NX1RPXCIsXG59O1xuXG5jb25zdCBkZWZhdWx0RmlsdGVyID0ge1xuICAgIHJpZ2h0czogW10sXG4gICAgY291bnRyaWVzOiBbXSxcbiAgICBleGNsdXNpdmUgOiBmYWxzZSxcbiAgICBpbmNsdWRlQWxsQ291bnRyaWVzIDogZmFsc2UsXG4gICAgc3BvcnQ6IFt7XG4gICAgICAgIHZhbHVlIDogbnVsbCxcbiAgICAgICAgbGFiZWwgOiBcIkFsbCBzcG9ydHNcIlxuICAgIH1dLFxuICAgIGV2ZW50IDogXCJcIixcbiAgICBmb3JjZVVwZGF0ZSA6IHRydWUsXG4gICAgZXZlbnREYXRlRnJvbTogXCJcIixcbiAgICBldmVudERhdGVUbzogXCJcIlxufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlciA9IChzdGF0ZSA9IGRlZmF1bHRGaWx0ZXIsIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfSU5DTFVERURfQ09VTlRSSUVTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUFsbENvdW50cmllczogYWN0aW9uLmluY2x1ZGVBbGxDb3VudHJpZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLkNMRUFSOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRGaWx0ZXIpO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLkNMRUFSX1VQREFURTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGZvcmNlVXBkYXRlOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuQUREX1JJR0hUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgcmlnaHRzOiBbLi4uc3RhdGUucmlnaHRzLCBhY3Rpb24uaWRdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5SRU1PVkVfUklHSFQ6XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBzdGF0ZS5yaWdodHMuaW5kZXhPZihhY3Rpb24uaWQpO1xuICAgICAgICAgICAgc3RhdGUucmlnaHRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICByaWdodHM6IFsuLi5zdGF0ZS5yaWdodHNdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfQ09VTlRSSUVTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgY291bnRyaWVzOiBhY3Rpb24uY291bnRyaWVzLm1hcChjPT5jLnZhbHVlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0VWRU5UX0RBVEVfRlJPTV9UTzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2V2ZW50RGF0ZUZyb206IGFjdGlvbi5mcm9tLCBldmVudERhdGVUbzogYWN0aW9uLnRvfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0VYQ0xVU0lWRTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGV4Y2x1c2l2ZTogYWN0aW9uLmV4Y2x1c2l2ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX1NQT1JUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3BvcnQ6IFsuLi5zdGF0ZS5zcG9ydCwgLi4uYWN0aW9uLnNwb3J0XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0ZJTFRFUlNfQ09ORklHOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uZmlsdGVycyk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0VWRU5UOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IGFjdGlvbi5ldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX01BTlk6XG4gICAgICAgICAgICBhY3Rpb24uZmlsdGVycy5mb3JjZVVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoYWN0aW9uLmZpbHRlcnMucmlnaHRzKSBhY3Rpb24uZmlsdGVycy5yaWdodHMgPSBhY3Rpb24uZmlsdGVycy5yaWdodHMubWFwKHI9Pk51bWJlcihyKSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5maWx0ZXJzKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9yZWR1Y2Vycy9maWx0ZXIuanMiLCJleHBvcnQgY29uc3QgbWFya2V0cGxhY2VUeXBlcyA9IHtcbiAgICBGRVRDSF9MSVNUSU5HX1JFUVVFU1Q6IFwiRkVUQ0hfTElTVElOR19SRVFVRVNUXCIsXG4gICAgRkVUQ0hfTElTVElOR19FUlJPUjogXCJGRVRDSF9MSVNUSU5HX0VSUk9SXCIsXG4gICAgRkVUQ0hfTElTVElOR19TVUNDRVNTOiBcIkZFVENIX0xJU1RJTkdfU1VDQ0VTU1wiXG59O1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAgIGxpc3RpbmdzRGF0YToge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICBsaXN0aW5nczogW10sXG4gICAgICAgIHRvdGFsSXRlbXM6IG51bGxcbiAgICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbWFya2V0cGxhY2Uoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtYXJrZXRwbGFjZVR5cGVzLkZFVENIX0xJU1RJTkdfUkVRVUVTVDpcbiAgICAgICAgY2FzZSBtYXJrZXRwbGFjZVR5cGVzLkZFVENIX0xJU1RJTkdfRVJST1I6XG4gICAgICAgIGNhc2UgbWFya2V0cGxhY2VUeXBlcy5GRVRDSF9MSVNUSU5HX1NVQ0NFU1M6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICAgIGxpc3RpbmdzRGF0YTogdXBkYXRlTGlzdGluZ3Moc3RhdGUubGlzdGluZ3NEYXRhLCBhY3Rpb24pXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufVxuXG5jb25zdCB1cGRhdGVMaXN0aW5ncyA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZS5saXN0aW5nc0RhdGEsIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtYXJrZXRwbGFjZVR5cGVzLkZFVENIX0xJU1RJTkdfUkVRVUVTVDpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBsaXN0aW5nczogW10sXG4gICAgICAgICAgICAgICAgdG90YWxJdGVtczogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBtYXJrZXRwbGFjZVR5cGVzLkZFVENIX0xJU1RJTkdfU1VDQ0VTUzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsaXN0aW5nczogYWN0aW9uLmxpc3RpbmdzLFxuICAgICAgICAgICAgICAgIHRvdGFsSXRlbXM6IGFjdGlvbi50b3RhbEl0ZW1zXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIG1hcmtldHBsYWNlVHlwZXMuRkVUQ0hfTElTVElOR19FUlJPUjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGFjdGlvbi5lcnJvcixcbiAgICAgICAgICAgICAgICBsaXN0aW5nczogW10sXG4gICAgICAgICAgICAgICAgdG90YWxJdGVtczogbnVsbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL21hcmtldHBsYWNlLmpzIiwiLyoqXG4qIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4qL1xuXG5sZXQgX19hcGlTdG9yZSA9IHtcbiAgICB0b3VybmFtZW50cyA6IHt9XG59O1xuXG53aW5kb3cuQ29udGVudEFyZW5hID0gd2luZG93LkNvbnRlbnRBcmVuYSB8fCB7fTtcbkNvbnRlbnRBcmVuYS5Db250ZW50QXBpID0gQ29udGVudEFyZW5hLkNvbnRlbnRBcGl8fCB7fTtcblxuQ29udGVudEFyZW5hLkNvbnRlbnRBcGk9IHtcbiAgICBzYXZlQ29udGVudEFzRHJhZnQgKCBjb250ZW50ICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L2RyYWZ0L3NhdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoY29udGVudCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2F2ZUNvbnRlbnRBc0luYWN0aXZlICggY29udGVudCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3Rpbmcvc2F2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBzYXZlQ29udGVudEFzQWN0aXZlICggY29udGVudCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmcvcHVibGlzaFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShjb250ZW50KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZXB1Ymxpc2hMaXN0aW5nICggY3VzdG9tSWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5nL3JlcHVibGlzaFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y3VzdG9tSWQ6IGN1c3RvbUlkfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2VuZE1lc3NhZ2UgKCBtZXNzYWdlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvbWVzc2FnZXMvc2VuZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRVc2VySW5mbyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9pbmZvXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRVc2VySW5mb0J5QWN0aXZhdGlvbkNvZGUgKCBhY3RpdmF0aW9uQ29kZSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvY29kZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBkYXRhIDogSlNPTi5zdHJpbmdpZnkoe2FjdGl2YXRpb25Db2RlOiBhY3RpdmF0aW9uQ29kZX0pLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvbXBhbnlVc2VycyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvY29tcGFueS91c2Vyc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgdXBkYXRlQ29tcGFueSAoIGNvbXBhbnkgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9jb21wYW55L3VwZGF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y29tcGFueTpjb21wYW55fSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgdXBkYXRlUGFzc3dvcmQgKCBkYXRhICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9wYXNzd29yZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB1cGRhdGVVc2VyICggdXNlciApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvdXBkYXRlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHt1c2VyOnVzZXJ9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBhY3RpdmF0ZVVzZXIgKCB1c2VyLCBwYXNzd29yZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3VzZXIvYWN0aXZhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VzZXI6dXNlcixpZDogdXNlci5pZCwgcGFzc3dvcmQgOiBwYXNzd29yZH0pLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlVXNlclByb2ZpbGUgKCBwcm9maWxlICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvdXNlci9wcm9maWxlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtwcm9maWxlOnByb2ZpbGV9KSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRUaHJlYWQgKCBjdXN0b21JZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3RocmVhZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7Y3VzdG9tSWQ6IGN1c3RvbUlkfSksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VGhyZWFkcyAoICApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL21lc3NhZ2VzL3RocmVhZHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHBsYWNlQmlkICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3BsYWNlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgcGxhY2VCaWRzICggYmlkICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkcy9wbGFjZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGFjY2VwdEJpZCAoIGJpZCwgc2lnbmF0dXJlLCBzaWduYXR1cmVOYW1lLCBzaWduYXR1cmVQb3NpdGlvbiApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgYmlkLnNpZ25hdHVyZSA9IHNpZ25hdHVyZTtcbiAgICAgICAgYmlkLnNpZ25hdHVyZU5hbWUgPSBzaWduYXR1cmVOYW1lO1xuICAgICAgICBiaWQuc2lnbmF0dXJlUG9zaXRpb24gPSBzaWduYXR1cmVQb3NpdGlvbjtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL2FjY2VwdFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShiaWQpLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlamVjdEJpZCAoIGJpZCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2JpZC9yZWplY3RcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYmlkKSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZW1vdmVCaWQgKCBiaWQgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvcmVtb3ZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGJpZCksXG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICBzYXZlVG1wRmlsZSAoIGZpbGVzICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGRhdGEuYXBwZW5kKCdmaWxlJywgZmlsZXNbMF0pO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImNvbnRlbnQvc2F2ZS9maWxlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2F2ZUF0dGFjaG1lbnRGaWxlICggZmlsZXMgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgZGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlc1swXSk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9zYXZlL2F0dGFjaG1lbnRcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRkFJTEVEXCIpXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHJlbW92ZUF0dGFjaG1lbnRGaWxlICggZmlsZSApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJjb250ZW50L3JlbW92ZS9hdHRhY2htZW50XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBmaWxlIDogZmlsZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRkFJTEVEXCIpXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEJ5Q3VzdG9tSWQgKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwibGlzdGluZy9kZXRhaWxzXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGN1c3RvbUlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIGdldERyYWZ0TGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2RyYWZ0XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRJbmFjdGl2ZUxpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9pbmFjdGl2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0QWN0aXZlTGlzdGluZ3MgKCApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2FjdGl2ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0RXhwaXJlZExpc3RpbmdzICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9leHBpcmVkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICByZW1vdmVMaXN0aW5nKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL3JlbW92ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY3VzdG9tSWQgOiBjdXN0b21JZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZHVwbGljYXRlTGlzdGluZyggY3VzdG9tSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy9kdXBsaWNhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGRlYWN0aXZhdGVMaXN0aW5nKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2RlYWN0aXZhdGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGFyY2hpdmVMaXN0aW5nKCBjdXN0b21JZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL2xpc3RpbmdzL2FyY2hpdmVcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIGN1c3RvbUlkIDogY3VzdG9tSWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG4gICAgZ2V0Q2xvc2VkRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvY2xvc2VkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0QWxsRGVhbHMgKCAgKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9iaWQvYWxsXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UGVuZGluZ0RlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3BlbmRpbmdcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRSZWplY3RlZERlYWxzICggICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvYmlkL3JlamVjdGVkXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0V2F0Y2hsaXN0TGlzdGluZ3MgKCl7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9saXN0aW5ncy93YXRjaGxpc3RcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuXG59O1xuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2NhL2NhLmFwaS5jb250ZW50LmpzIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuLyoqXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuICovXG5cbmxldCBfX2FwaVN0b3JlID0ge1xuICAgIHRvdXJuYW1lbnRzIDoge31cbn07XG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuXG5Db250ZW50QXJlbmEuQXBpPSB7XG4gICAgc29ydEJ5TGFiZWwgKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhLm5hbWUgPiBiLm5hbWUpID8gMSA6ICgoYi5uYW1lID4gYS5uYW1lKSA/IC0xIDogMClcbiAgICB9LFxuICAgIHNvcnRCeVNwb3J0IChhLCBiKSB7XG5cbiAgICAgICAgaWYgKGEuc3BvcnQubmFtZSA+IGIuc3BvcnQubmFtZSkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhLnNwb3J0Lm5hbWUgPCBiLnNwb3J0Lm5hbWUpIHJldHVybiAtMTtcbiAgICAgICAgaWYgKGEuc3BvcnRDYXRlZ29yeS5uYW1lID4gYi5zcG9ydENhdGVnb3J5Lm5hbWUpIHJldHVybiAxO1xuICAgICAgICBpZiAoYS5zcG9ydENhdGVnb3J5Lm5hbWUgPCBiLnNwb3J0Q2F0ZWdvcnkubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICBpZiAoYS5uYW1lID4gYi5uYW1lKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gMDtcblxuICAgIH0sXG4gICAgcHJlcGFyZUxpc3QgKCBsaXN0LCBjYXRlZ29yeUlkICkge1xuXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgbGlzdCA9ICQubWFwKGxpc3QsIGZ1bmN0aW9uIChpdGVtKSB7XG5cbiAgICAgICAgICAgIC8vIEZpbHRlciBieSBjYXRlZ29yeVxuICAgICAgICAgICAgaWYgKCBjYXRlZ29yeUlkICYmIGl0ZW0uY2F0ZWdvcnlbJ0BhdHRyaWJ1dGVzJ10uaWQgIT0gY2F0ZWdvcnlJZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiB7bmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLCBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkfVxuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0LnNvcnQoX3RoaXMuc29ydEJ5TGFiZWwpO1xuXG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH0sXG4gICAgZmlsdGVyRG91YmxlcyAoIGxpc3QsIHNwb3J0SWQgKXtcbiAgICAgICAgbGV0IG5hbWVzID0gW107XG5cbiAgICAgICAgaWYgKCBzcG9ydElkID09PSBcInNyOnNwb3J0OjVcIiApe1xuICAgICAgICAgICAgbGlzdCA9IGxpc3QubWFwKGl0ZW09PntcbiAgICAgICAgICAgICAgICBpdGVtLm5hbWUgPSBpdGVtLm5hbWUucmVwbGFjZSgvIHNpbmdsZXMvZ2ksJycpLnJlcGxhY2UoLyBkb3VibGUvZ2ksJycpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfSkuZmlsdGVyKGl0ZW09PntcbiAgICAgICAgICAgICAgICBpZiAobmFtZXMuaW5kZXhPZihpdGVtLm5hbWUpID09PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgIG5hbWVzLnB1c2goaXRlbS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH0sXG4gICAgZ2V0Q29tcGFueVRlcm1zICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS90ZXJtcy9jb21wYW55XCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIGdldENvbXBhbnlEZWZpbml0aW9ucyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvZGVmaW5pdGlvbnMvY29tcGFueVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICByZXN0b3JlQ29tcGFueVRlcm1zICggKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS90ZXJtcy9yZXN0b3JlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcblxuICAgIHJlc3RvcmVEZWZpbml0aW9ucyAoICkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvZGVmaW5pdGlvbnMvcmVzdG9yZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVUZXJtcyAoIHRlcm1zLCBkZWZpbml0aW9ucyApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3Rlcm1zL3VwZGF0ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDoge1xuICAgICAgICAgICAgICAgIHRlcm1zIDogdGVybXMsXG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbnMgOiBkZWZpbml0aW9uc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRDb250ZW50ICggZmlsdGVyKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImJ1eS9zZWFyY2hcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IGZpbHRlcixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRKc29uQ29udGVudCAoIGZpbHRlcikge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJsaXN0aW5ncy9tYXJrZXRwbGFjZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogZmlsdGVyLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIHNhdmVGaWx0ZXIgKCBmaWx0ZXIpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYnV5L2ZpbHRlci9zYXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiBmaWx0ZXIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q291bnRyaWVzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMgJiYgQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzLmxlbmd0aCA+IDAgKXtcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL2NvdW50cmllcy9hbGxcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSByZXNwb25zZS5tYXAoYz0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5yZWdpb25zID0gYy5yZWdpb25zLm1hcChyPT5yLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMuZXh0ZXJuYWxJZCA9IGMuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY1xuXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMgPSByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRBY3RpdmVTcG9ydHMgKCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9zcG9ydHMvYWN0aXZlXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldEFsbFNwb3J0cyAoZmxhZ3MpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvc3BvcnRzL2FsbFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZmxhZ3M6IGZsYWdzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFNwb3J0c0dyb3VwcyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3Nwb3J0cy9ncm91cHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q291bnRyaWVzRnVsbCAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL2NvdW50cmllcy9mdWxsXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHthcnJheX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2Uuc29ydChfdGhpcy5zb3J0QnlMYWJlbCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFRlcnJpdG9yaWVzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvdGVycml0b3JpZXNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmVnaW9ucyAoKSB7XG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvc2VhcmNoL3JlZ2lvbnNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZS5zb3J0KF90aGlzLnNvcnRCeUxhYmVsKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmlnaHRzIChyaWdodHNQYWNrYWdlLCBncm91cCkge1xuICAgICAgICBsZXQgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKTtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiYXBpL3NlYXJjaC9yaWdodHNcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UmlnaHRzUGFja2FnZSAocmlnaHRzUGFja2FnZSwgZ3JvdXApIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyBcImFwaS9zZWFyY2gvcmlnaHRzLXBhY2thZ2VcIixcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cFxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge2FycmF5fSByZXNwb25zZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0U3BvcnRzICgpIHtcbiAgICAgICAgbGV0IGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCk7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3Nwb3J0c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7c3BvcnQ6b2JqZWN0fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3BvcnRzID0gX3RoaXMucHJlcGFyZUxpc3QoIHJlc3BvbnNlLnNwb3J0KTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHNwb3J0cyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldENvbnRlbnREZXRhaWxzKCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9kZXRhaWxzL1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0UGVuZGluZ0xpc3RpbmdzKCBpZCApIHtcbiAgICAgICAgdmFyIGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCksXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogZW52aG9zdHVybCArIFwiY29udGVudC9wZW5kaW5nLWxpc3RpbmdzL1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Q2F0ZWdvcmllcyAoIHNwb3J0SWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzLFxuICAgICAgICAgICAgbGlzdCA9IFtdLFxuICAgICAgICAgICAgY2F0cyA9IFtdO1xuXG4gICAgICAgIF90aGlzLmdldFRvdXJuYW1lbnRzKHNwb3J0SWQpLmRvbmUoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoICEgX19hcGlTdG9yZS50b3VybmFtZW50c1tzcG9ydElkXSApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCBbXSApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdCA9ICQubWFwKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQgLCBmdW5jdGlvbiAoaXRlbSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gaXRlbS5jYXRlZ29yeVsnQGF0dHJpYnV0ZXMnXS5pZDtcblxuICAgICAgICAgICAgICAgIGlmICggY2F0cy5pbmRleE9mKGlkKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNhdHMucHVzaCggaWQgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2F0ZWdvcnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoX3RoaXMucHJlcGFyZUxpc3QobGlzdCkgKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0VG91cm5hbWVudHMgKCBzcG9ydElkLCBjYXRlZ29yeUlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcywgc3RvcmVkUmVzcG9uc2U7XG5cbiAgICAgICAgaWYgKCBfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdICE9PSB1bmRlZmluZWQgKXtcblxuICAgICAgICAgICAgc3RvcmVkUmVzcG9uc2UgPSBfdGhpcy5wcmVwYXJlTGlzdChfX2FwaVN0b3JlLnRvdXJuYW1lbnRzW3Nwb3J0SWRdLnRvdXJuYW1lbnQsIGNhdGVnb3J5SWQpXG4gICAgICAgICAgICBzdG9yZWRSZXNwb25zZSA9IF90aGlzLmZpbHRlckRvdWJsZXMoc3RvcmVkUmVzcG9uc2Usc3BvcnRJZCk7XG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHN0b3JlZFJlc3BvbnNlKTtcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC90b3VybmFtZW50c1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNwb3J0SWQgfSxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHt7dG91cm5hbWVudHM6e3RvdXJuYW1lbnQ6QXJyYXl9fX0gcmVzcG9uc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBBIGNvbW1lbnRcbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnRvdXJuYW1lbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF9fYXBpU3RvcmUudG91cm5hbWVudHNbc3BvcnRJZF0gPSByZXNwb25zZS50b3VybmFtZW50cztcblxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gX3RoaXMucHJlcGFyZUxpc3QocmVzcG9uc2UudG91cm5hbWVudHMudG91cm5hbWVudCwgY2F0ZWdvcnlJZCk7XG4gICAgICAgICAgICAgICAgbGlzdCA9IF90aGlzLmZpbHRlckRvdWJsZXMobGlzdCwgc3BvcnRJZCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShsaXN0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICBnZXRTZWFzb25zICggdG91cm5hbWVudElkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBleHRlcm5hbEFwaVVybCArIFwidjEvZmVlZC9zZWFzb25zXCIsXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgOiB7IGlkIDogdG91cm5hbWVudElkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGxpc3Q7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnNlYXNvbnMgPT09IHVuZGVmaW5lZCB8fCByZXNwb25zZS5zZWFzb25zLnNlYXNvbiA9PT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoW10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCAkLmlzQXJyYXkocmVzcG9uc2Uuc2Vhc29ucy5zZWFzb24pICl7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSAkLm1hcChyZXNwb25zZS5zZWFzb25zLnNlYXNvbiwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVybmFsSWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0ZTogaXRlbVsnQGF0dHJpYnV0ZXMnXS5lbmRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydERhdGU6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10uc3RhcnRfZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3VybmFtZW50SWQ6IGl0ZW1bJ0BhdHRyaWJ1dGVzJ10udG91cm5hbWVudF9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyOiBpdGVtWydAYXR0cmlidXRlcyddLnllYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLnJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZERhdGU6IHJlc3BvbnNlLnNlYXNvbnMuc2Vhc29uWydAYXR0cmlidXRlcyddLmVuZF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS5zdGFydF9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91cm5hbWVudElkOiByZXNwb25zZS5zZWFzb25zLnNlYXNvblsnQGF0dHJpYnV0ZXMnXS50b3VybmFtZW50X2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcjogcmVzcG9uc2Uuc2Vhc29ucy5zZWFzb25bJ0BhdHRyaWJ1dGVzJ10ueWVhcixcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGxpc3QpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKGRhdGEsIHN0YXR1cyApIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2UoKTtcbiAgICB9LFxuICAgIGdldFNjaGVkdWxlICggc2Vhc29uSWQgKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuICAgICAgICAgICAgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGV4dGVybmFsQXBpVXJsICsgXCJ2MS9mZWVkL3NjaGVkdWxlc1wiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhIDogeyBpZCA6IHNlYXNvbklkIH0sXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBwYXJhbSB7e3RvdXJuYW1lbnRzOnt0b3VybmFtZW50OkFycmF5fX19IHJlc3BvbnNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3BvcnRfZXZlbnRzID09PSB1bmRlZmluZWQgfHwgcmVzcG9uc2Uuc3BvcnRfZXZlbnRzLnNwb3J0X2V2ZW50ID09PSB1bmRlZmluZWQgKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICByZXNwb25zZS5zcG9ydF9ldmVudHMuc3BvcnRfZXZlbnQuZm9yRWFjaCggKGl0ZW0pID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcm91bmQgID0gKGl0ZW0udG91cm5hbWVudF9yb3VuZCkgPyBpdGVtLnRvdXJuYW1lbnRfcm91bmRbJ0BhdHRyaWJ1dGVzJ10gOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcm91bmQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IChyb3VuZC5udW1iZXIpID8gXCJyb3VuZF9cIiArIHJvdW5kLm51bWJlciA6IHJvdW5kLm5hbWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhbGlzdFtuYW1lXSApIGxpc3RbbmFtZV0gPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoICFsaXN0W25hbWVdLm1hdGNoZXMgKSBsaXN0W25hbWVdLm1hdGNoZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGlzdFtuYW1lXS5tYXRjaGVzLnNldChpdGVtWydAYXR0cmlidXRlcyddLmlkLHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZDogaXRlbVsnQGF0dHJpYnV0ZXMnXS5zY2hlZHVsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlcm5hbElkOiBpdGVtWydAYXR0cmlidXRlcyddLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBpdGVtWydAYXR0cmlidXRlcyddLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdXJuYW1lbnRSb3VuZCA6IHJvdW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGV0aXRvcnMgOiAoaXRlbS5jb21wZXRpdG9ycykgPyBpdGVtLmNvbXBldGl0b3JzLmNvbXBldGl0b3IubWFwKCggY29tcGV0aXRvcik9PnsgcmV0dXJuIGNvbXBldGl0b3JbJ0BhdHRyaWJ1dGVzJ10gIH0pICA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUobGlzdCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiAoZGF0YSwgc3RhdHVzICkge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogc3RhdHVzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgc2VhcmNoQ29tcGV0aXRpb24ocmVxdWVzdCkge1xuXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpO1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IGVudmhvc3R1cmwgKyAnYXBpL3NlYXJjaC90b3VybmFtZW50JyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogcmVxdWVzdFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYWRpdGlvbmFsOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgZGF0YS5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0uc3BvcnQpLnNvcnQoX3RoaXMuc29ydEJ5U3BvcnQpO1xuXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMgKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBzdGF0dXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG4gICAgfSxcbiAgICB3YXRjaGxpc3QoIGlkICkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSBqUXVlcnkuRGVmZXJyZWQoKSxcbiAgICAgICAgICAgIF90aGlzID0gdGhpcztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBlbnZob3N0dXJsICsgXCJhcGkvd2F0Y2hsaXN0L2FkZFwiLFxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiB7aWQgOiBpZH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHN0YXR1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZSgpO1xuICAgIH0sXG4gICAgZ2V0Tm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGF4aW9zLmdldChgJHtlbnZob3N0dXJsfWFwaS9ub3RpZmljYXRpb25zL2ApO1xuICAgIH0sXG4gICAgbWFya05vdGlmaWNhdGlvbkFzVmlzaXRlZChpZCkge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgJHtlbnZob3N0dXJsfWFwaS9ub3RpZmljYXRpb25zL3Zpc2l0ZWRgLCB7XG4gICAgICAgICAgICBpZFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIG1hcmtOb3RpZmljYXRpb25Bc1NlZW4oKSB7XG4gICAgICAgIHJldHVybiBheGlvcy5nZXQoYCR7ZW52aG9zdHVybH1hcGkvbm90aWZpY2F0aW9ucy9zZWVuYCk7XG4gICAgfSxcbiAgICBzaWduSW5Vc2VyKHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgJHtlbnZob3N0dXJsfWFwaS91c2Vycy9sb2dpbmAsIHtcbiAgICAgICAgICAgIHVzZXJuYW1lLCBwYXNzd29yZFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlY292ZXJQYXNzd29yZChlbWFpbCkge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgJHtlbnZob3N0dXJsfWFwaS91c2Vycy9wYXNzd29yZC9yZWNvdmVyYCwge1xuICAgICAgICAgICAgZW1haWxcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZXNldFBhc3N3b3JkKHBhc3N3b3JkLCBjb25maXJtYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gYXhpb3MucG9zdChgJHtlbnZob3N0dXJsfWFwaS91c2Vycy9wYXNzd29yZC91cGRhdGVgLCB7XG4gICAgICAgICAgICBwYXNzd29yZCwgY29uZmlybWF0aW9uVG9rZW5cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzaWduVXBVc2VyKGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsLCBjb21wYW55TGVnYWxOYW1lKSB7XG4gICAgICAgIHJldHVybiBheGlvcy5wb3N0KGAke2Vudmhvc3R1cmx9YXBpL3VzZXJzL3JlZ2lzdGVyYCwge1xuICAgICAgICAgICAgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIGNvbXBhbnlMZWdhbE5hbWVcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5hcGkuanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxud2luZG93LkNvbnRlbnRBcmVuYSA9IHdpbmRvdy5Db250ZW50QXJlbmEgfHwge307XG5cbkNvbnRlbnRBcmVuYS5EYXRhID0gQ29udGVudEFyZW5hLkRhdGEgfHwge307XG5Db250ZW50QXJlbmEuTGFuZ3VhZ2VzID0gQ29udGVudEFyZW5hLkxhbmd1YWdlcyB8fCB7fTtcblxuQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzID0gW1xuICAgIHsgbmFtZSA6IFwiU29jY2VyXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MVwifSxcbiAgICB7IG5hbWUgOiBcIkJhc2tldGJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyXCJ9LFxuICAgIHsgbmFtZSA6IFwiQmFzZWJhbGxcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDozXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6NVwifSxcbiAgICB7IG5hbWUgOiBcIkNyaWNrZXRcIiwgZXh0ZXJuYWxJZDogXCJzcjpzcG9ydDoyMVwifSxcbiAgICB7IG5hbWUgOiBcIkZpZWxkIEhvY2tleVwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjI0XCJ9LFxuICAgIHsgbmFtZSA6IFwiVm9sbGV5YmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjIzXCJ9LFxuICAgIHsgbmFtZSA6IFwiVGFibGUgVGVubmlzXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MjBcIn0sXG4gICAgeyBuYW1lIDogXCJHb2xmXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6OVwifSxcbiAgICB7IG5hbWUgOiBcIkFtZXJpY2FuIEZvb3RiYWxsXCIsIGV4dGVybmFsSWQ6IFwic3I6c3BvcnQ6MTZcIn0sXG4gICAgeyBuYW1lIDogXCJIYW5kYmFsbFwiLCBleHRlcm5hbElkOiBcInNyOnNwb3J0OjZcIn1cbl07XG5cbkNvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBbXTtcbkNvbnRlbnRBcmVuYS5EYXRhLkFjdGl2ZVNwb3J0cyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gW107XG5Db250ZW50QXJlbmEuRGF0YS5UZXJyaXRvcmllcyA9IFtdO1xuQ29udGVudEFyZW5hLkRhdGEuUmVnaW9ucyA9IFtdO1xuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5TaG9ydCA9IHtcbiAgICBcIm1kclwiOiBcIk1hbmRhcmluXCIsXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxuICAgIFwiYXJcIjogXCJBcmFiaWNcIixcbiAgICBcInB0XCI6IFwiUG9ydHVndWVzZVwiLFxuICAgIFwiYm5cIjogXCJCZW5nYWxpXCIsXG4gICAgXCJydVwiOiBcIlJ1c3NpYW5cIixcbiAgICBcImphXCI6IFwiSmFwYW5lc2VcIixcbiAgICBcImp2XCI6IFwiSmF2YW5lc2VcIixcbiAgICBcImRlXCI6IFwiR2VybWFuXCIsXG4gICAgXCJhbGxcIiA6IFwiU2hvdyBBbGxcIlxufTtcblxuQ29udGVudEFyZW5hLkxhbmd1YWdlcy5Mb25nID0ge1xuICAgIFwiYWFcIjogXCJBZmFyXCIsXG4gICAgXCJhZlwiOiBcIkFmcmlrYWFuc1wiLFxuICAgIFwiYWluXCI6IFwiQWludVwiLFxuICAgIFwiYWt6XCI6IFwiQWxhYmFtYVwiLFxuICAgIFwic3FcIjogXCJBbGJhbmlhblwiLFxuICAgIFwiYWxlXCI6IFwiQWxldXRcIixcbiAgICBcImFycVwiOiBcIkFsZ2VyaWFuIEFyYWJpY1wiLFxuICAgIFwiZW5fVVNcIjogXCJBbWVyaWNhbiBFbmdsaXNoXCIsXG4gICAgXCJhc2VcIjogXCJBbWVyaWNhbiBTaWduIExhbmd1YWdlXCIsXG4gICAgXCJhbVwiOiBcIkFtaGFyaWNcIixcbiAgICBcImVneVwiOiBcIkFuY2llbnQgRWd5cHRpYW5cIixcbiAgICBcImdyY1wiOiBcIkFuY2llbnQgR3JlZWtcIixcbiAgICBcImFyXCI6IFwiQXJhYmljXCIsXG4gICAgXCJhcmNcIjogXCJBcmFtYWljXCIsXG4gICAgXCJhcnBcIjogXCJBcmFwYWhvXCIsXG4gICAgXCJhcndcIjogXCJBcmF3YWtcIixcbiAgICBcImh5XCI6IFwiQXJtZW5pYW5cIixcbiAgICBcImFzXCI6IFwiQXNzYW1lc2VcIixcbiAgICBcImFzYVwiOiBcIkFzdVwiLFxuICAgIFwiZW5fQVVcIjogXCJBdXN0cmFsaWFuIEVuZ2xpc2hcIixcbiAgICBcImRlX0FUXCI6IFwiQXVzdHJpYW4gR2VybWFuXCIsXG4gICAgXCJheVwiOiBcIkF5bWFyYVwiLFxuICAgIFwiYXpcIjogXCJBemVyYmFpamFuaVwiLFxuICAgIFwiYmFuXCI6IFwiQmFsaW5lc2VcIixcbiAgICBcImV1XCI6IFwiQmFzcXVlXCIsXG4gICAgXCJiYXJcIjogXCJCYXZhcmlhblwiLFxuICAgIFwiYmVcIjogXCJCZWxhcnVzaWFuXCIsXG4gICAgXCJiblwiOiBcIkJlbmdhbGlcIixcbiAgICBcImJpa1wiOiBcIkJpa29sXCIsXG4gICAgXCJiaW5cIjogXCJCaW5pXCIsXG4gICAgXCJic1wiOiBcIkJvc25pYW5cIixcbiAgICBcImJyaFwiOiBcIkJyYWh1aVwiLFxuICAgIFwiYnJhXCI6IFwiQnJhalwiLFxuICAgIFwicHRfQlJcIjogXCJCcmF6aWxpYW4gUG9ydHVndWVzZVwiLFxuICAgIFwiYnJcIjogXCJCcmV0b25cIixcbiAgICBcImVuX0dCXCI6IFwiQnJpdGlzaCBFbmdsaXNoXCIsXG4gICAgXCJiZ1wiOiBcIkJ1bGdhcmlhblwiLFxuICAgIFwibXlcIjogXCJCdXJtZXNlXCIsXG4gICAgXCJmcmNcIjogXCJDYWp1biBGcmVuY2hcIixcbiAgICBcImVuX0NBXCI6IFwiQ2FuYWRpYW4gRW5nbGlzaFwiLFxuICAgIFwiZnJfQ0FcIjogXCJDYW5hZGlhbiBGcmVuY2hcIixcbiAgICBcInl1ZVwiOiBcIkNhbnRvbmVzZVwiLFxuICAgIFwiY2FyXCI6IFwiQ2FyaWJcIixcbiAgICBcImNhXCI6IFwiQ2F0YWxhblwiLFxuICAgIFwiY2F5XCI6IFwiQ2F5dWdhXCIsXG4gICAgXCJjZWJcIjogXCJDZWJ1YW5vXCIsXG4gICAgXCJzaHVcIjogXCJDaGFkaWFuIEFyYWJpY1wiLFxuICAgIFwiY2VcIjogXCJDaGVjaGVuXCIsXG4gICAgXCJjaHJcIjogXCJDaGVyb2tlZVwiLFxuICAgIFwicXVnXCI6IFwiQ2hpbWJvcmF6byBIaWdobGFuZCBRdWljaHVhXCIsXG4gICAgXCJ6aFwiOiBcIkNoaW5lc2VcIixcbiAgICBcImNoblwiOiBcIkNoaW5vb2sgSmFyZ29uXCIsXG4gICAgXCJjaHBcIjogXCJDaGlwZXd5YW5cIixcbiAgICBcImNob1wiOiBcIkNob2N0YXdcIixcbiAgICBcImN1XCI6IFwiQ2h1cmNoIFNsYXZpY1wiLFxuICAgIFwiY3ZcIjogXCJDaHV2YXNoXCIsXG4gICAgXCJud2NcIjogXCJDbGFzc2ljYWwgTmV3YXJpXCIsXG4gICAgXCJzeWNcIjogXCJDbGFzc2ljYWwgU3lyaWFjXCIsXG4gICAgXCJzd2NcIjogXCJDb25nbyBTd2FoaWxpXCIsXG4gICAgXCJjb3BcIjogXCJDb3B0aWNcIixcbiAgICBcImt3XCI6IFwiQ29ybmlzaFwiLFxuICAgIFwiY29cIjogXCJDb3JzaWNhblwiLFxuICAgIFwiY3JcIjogXCJDcmVlXCIsXG4gICAgXCJtdXNcIjogXCJDcmVla1wiLFxuICAgIFwiY3JoXCI6IFwiQ3JpbWVhbiBUdXJraXNoXCIsXG4gICAgXCJoclwiOiBcIkNyb2F0aWFuXCIsXG4gICAgXCJjc1wiOiBcIkN6ZWNoXCIsXG4gICAgXCJkYWtcIjogXCJEYWtvdGFcIixcbiAgICBcImRhXCI6IFwiRGFuaXNoXCIsXG4gICAgXCJkZWxcIjogXCJEZWxhd2FyZVwiLFxuICAgIFwibmxcIjogXCJEdXRjaFwiLFxuICAgIFwiZnJzXCI6IFwiRWFzdGVybiBGcmlzaWFuXCIsXG4gICAgXCJhcnpcIjogXCJFZ3lwdGlhbiBBcmFiaWNcIixcbiAgICBcImVuXCI6IFwiRW5nbGlzaFwiLFxuICAgIFwiZW9cIjogXCJFc3BlcmFudG9cIixcbiAgICBcImV0XCI6IFwiRXN0b25pYW5cIixcbiAgICBcInB0X1BUXCI6IFwiRXVyb3BlYW4gUG9ydHVndWVzZVwiLFxuICAgIFwiZXNfRVNcIjogXCJFdXJvcGVhbiBTcGFuaXNoXCIsXG4gICAgXCJlZVwiOiBcIkV3ZVwiLFxuICAgIFwiZmFuXCI6IFwiRmFuZ1wiLFxuICAgIFwiaGlmXCI6IFwiRmlqaSBIaW5kaVwiLFxuICAgIFwiZmpcIjogXCJGaWppYW5cIixcbiAgICBcImZpbFwiOiBcIkZpbGlwaW5vXCIsXG4gICAgXCJmaVwiOiBcIkZpbm5pc2hcIixcbiAgICBcIm5sX0JFXCI6IFwiRmxlbWlzaFwiLFxuICAgIFwiZm9uXCI6IFwiRm9uXCIsXG4gICAgXCJmclwiOiBcIkZyZW5jaFwiLFxuICAgIFwiZ2FhXCI6IFwiR2FcIixcbiAgICBcImdhblwiOiBcIkdhbiBDaGluZXNlXCIsXG4gICAgXCJrYVwiOiBcIkdlb3JnaWFuXCIsXG4gICAgXCJkZVwiOiBcIkdlcm1hblwiLFxuICAgIFwiZ290XCI6IFwiR290aGljXCIsXG4gICAgXCJncmJcIjogXCJHcmVib1wiLFxuICAgIFwiZWxcIjogXCJHcmVla1wiLFxuICAgIFwiZ25cIjogXCJHdWFyYW5pXCIsXG4gICAgXCJndVwiOiBcIkd1amFyYXRpXCIsXG4gICAgXCJndXpcIjogXCJHdXNpaVwiLFxuICAgIFwiaGFpXCI6IFwiSGFpZGFcIixcbiAgICBcImh0XCI6IFwiSGFpdGlhblwiLFxuICAgIFwiaGFrXCI6IFwiSGFra2EgQ2hpbmVzZVwiLFxuICAgIFwiaGFcIjogXCJIYXVzYVwiLFxuICAgIFwiaGF3XCI6IFwiSGF3YWlpYW5cIixcbiAgICBcImhlXCI6IFwiSGVicmV3XCIsXG4gICAgXCJoelwiOiBcIkhlcmVyb1wiLFxuICAgIFwiaGlcIjogXCJIaW5kaVwiLFxuICAgIFwiaGl0XCI6IFwiSGl0dGl0ZVwiLFxuICAgIFwiaG1uXCI6IFwiSG1vbmdcIixcbiAgICBcImh1XCI6IFwiSHVuZ2FyaWFuXCIsXG4gICAgXCJpc1wiOiBcIkljZWxhbmRpY1wiLFxuICAgIFwiaW9cIjogXCJJZG9cIixcbiAgICBcImlnXCI6IFwiSWdib1wiLFxuICAgIFwiaXVcIjogXCJJbnVrdGl0dXRcIixcbiAgICBcImlrXCI6IFwiSW51cGlhcVwiLFxuICAgIFwiZ2FcIjogXCJJcmlzaFwiLFxuICAgIFwiaXRcIjogXCJJdGFsaWFuXCIsXG4gICAgXCJqYW1cIjogXCJKYW1haWNhbiBDcmVvbGUgRW5nbGlzaFwiLFxuICAgIFwiamFcIjogXCJKYXBhbmVzZVwiLFxuICAgIFwianZcIjogXCJKYXZhbmVzZVwiLFxuICAgIFwia2FqXCI6IFwiSmp1XCIsXG4gICAgXCJkeW9cIjogXCJKb2xhLUZvbnlpXCIsXG4gICAgXCJ4YWxcIjogXCJLYWxteWtcIixcbiAgICBcImthbVwiOiBcIkthbWJhXCIsXG4gICAgXCJrYmxcIjogXCJLYW5lbWJ1XCIsXG4gICAgXCJrblwiOiBcIkthbm5hZGFcIixcbiAgICBcImtyXCI6IFwiS2FudXJpXCIsXG4gICAgXCJrYWFcIjogXCJLYXJhLUthbHBha1wiLFxuICAgIFwia3JjXCI6IFwiS2FyYWNoYXktQmFsa2FyXCIsXG4gICAgXCJrcmxcIjogXCJLYXJlbGlhblwiLFxuICAgIFwia3NcIjogXCJLYXNobWlyaVwiLFxuICAgIFwiY3NiXCI6IFwiS2FzaHViaWFuXCIsXG4gICAgXCJrYXdcIjogXCJLYXdpXCIsXG4gICAgXCJra1wiOiBcIkthemFraFwiLFxuICAgIFwia2VuXCI6IFwiS2VueWFuZ1wiLFxuICAgIFwia2hhXCI6IFwiS2hhc2lcIixcbiAgICBcImttXCI6IFwiS2htZXJcIixcbiAgICBcImtob1wiOiBcIktob3RhbmVzZVwiLFxuICAgIFwia2h3XCI6IFwiS2hvd2FyXCIsXG4gICAgXCJraVwiOiBcIktpa3V5dVwiLFxuICAgIFwia21iXCI6IFwiS2ltYnVuZHVcIixcbiAgICBcImtyalwiOiBcIktpbmFyYXktYVwiLFxuICAgIFwicndcIjogXCJLaW55YXJ3YW5kYVwiLFxuICAgIFwia2l1XCI6IFwiS2lybWFuamtpXCIsXG4gICAgXCJ0bGhcIjogXCJLbGluZ29uXCIsXG4gICAgXCJia21cIjogXCJLb21cIixcbiAgICBcImt2XCI6IFwiS29taVwiLFxuICAgIFwia29pXCI6IFwiS29taS1QZXJteWFrXCIsXG4gICAgXCJrZ1wiOiBcIktvbmdvXCIsXG4gICAgXCJrb2tcIjogXCJLb25rYW5pXCIsXG4gICAgXCJrb1wiOiBcIktvcmVhblwiLFxuICAgIFwia2ZvXCI6IFwiS29yb1wiLFxuICAgIFwia29zXCI6IFwiS29zcmFlYW5cIixcbiAgICBcImF2a1wiOiBcIktvdGF2YVwiLFxuICAgIFwia2hxXCI6IFwiS295cmEgQ2hpaW5pXCIsXG4gICAgXCJzZXNcIjogXCJLb3lyYWJvcm8gU2VubmlcIixcbiAgICBcImtwZVwiOiBcIktwZWxsZVwiLFxuICAgIFwia3JpXCI6IFwiS3Jpb1wiLFxuICAgIFwia2pcIjogXCJLdWFueWFtYVwiLFxuICAgIFwia3VtXCI6IFwiS3VteWtcIixcbiAgICBcImt1XCI6IFwiS3VyZGlzaFwiLFxuICAgIFwia3J1XCI6IFwiS3VydWtoXCIsXG4gICAgXCJrdXRcIjogXCJLdXRlbmFpXCIsXG4gICAgXCJubWdcIjogXCJLd2FzaW9cIixcbiAgICBcImt5XCI6IFwiS3lyZ3l6XCIsXG4gICAgXCJxdWNcIjogXCJLXFx1MDJiY2ljaGVcXHUwMmJjXCIsXG4gICAgXCJsYWRcIjogXCJMYWRpbm9cIixcbiAgICBcImxhaFwiOiBcIkxhaG5kYVwiLFxuICAgIFwibGt0XCI6IFwiTGFrb3RhXCIsXG4gICAgXCJsYW1cIjogXCJMYW1iYVwiLFxuICAgIFwibGFnXCI6IFwiTGFuZ2lcIixcbiAgICBcImxvXCI6IFwiTGFvXCIsXG4gICAgXCJsdGdcIjogXCJMYXRnYWxpYW5cIixcbiAgICBcImxhXCI6IFwiTGF0aW5cIixcbiAgICBcImVzXzQxOVwiOiBcIkxhdGluIEFtZXJpY2FuIFNwYW5pc2hcIixcbiAgICBcImx2XCI6IFwiTGF0dmlhblwiLFxuICAgIFwibHp6XCI6IFwiTGF6XCIsXG4gICAgXCJsZXpcIjogXCJMZXpnaGlhblwiLFxuICAgIFwibGlqXCI6IFwiTGlndXJpYW5cIixcbiAgICBcImxpXCI6IFwiTGltYnVyZ2lzaFwiLFxuICAgIFwibG5cIjogXCJMaW5nYWxhXCIsXG4gICAgXCJsZm5cIjogXCJMaW5ndWEgRnJhbmNhIE5vdmFcIixcbiAgICBcImx6aFwiOiBcIkxpdGVyYXJ5IENoaW5lc2VcIixcbiAgICBcImx0XCI6IFwiTGl0aHVhbmlhblwiLFxuICAgIFwibGl2XCI6IFwiTGl2b25pYW5cIixcbiAgICBcImpib1wiOiBcIkxvamJhblwiLFxuICAgIFwibG1vXCI6IFwiTG9tYmFyZFwiLFxuICAgIFwibmRzXCI6IFwiTG93IEdlcm1hblwiLFxuICAgIFwic2xpXCI6IFwiTG93ZXIgU2lsZXNpYW5cIixcbiAgICBcImRzYlwiOiBcIkxvd2VyIFNvcmJpYW5cIixcbiAgICBcImxvelwiOiBcIkxvemlcIixcbiAgICBcImx1XCI6IFwiTHViYS1LYXRhbmdhXCIsXG4gICAgXCJsdWFcIjogXCJMdWJhLUx1bHVhXCIsXG4gICAgXCJsdWlcIjogXCJMdWlzZW5vXCIsXG4gICAgXCJzbWpcIjogXCJMdWxlIFNhbWlcIixcbiAgICBcImx1blwiOiBcIkx1bmRhXCIsXG4gICAgXCJsdW9cIjogXCJMdW9cIixcbiAgICBcImxiXCI6IFwiTHV4ZW1ib3VyZ2lzaFwiLFxuICAgIFwibHV5XCI6IFwiTHV5aWFcIixcbiAgICBcIm1kZVwiOiBcIk1hYmFcIixcbiAgICBcIm1rXCI6IFwiTWFjZWRvbmlhblwiLFxuICAgIFwiam1jXCI6IFwiTWFjaGFtZVwiLFxuICAgIFwibWFkXCI6IFwiTWFkdXJlc2VcIixcbiAgICBcIm1hZlwiOiBcIk1hZmFcIixcbiAgICBcIm1hZ1wiOiBcIk1hZ2FoaVwiLFxuICAgIFwidm1mXCI6IFwiTWFpbi1GcmFuY29uaWFuXCIsXG4gICAgXCJtYWlcIjogXCJNYWl0aGlsaVwiLFxuICAgIFwibWFrXCI6IFwiTWFrYXNhclwiLFxuICAgIFwibWdoXCI6IFwiTWFraHV3YS1NZWV0dG9cIixcbiAgICBcImtkZVwiOiBcIk1ha29uZGVcIixcbiAgICBcIm1nXCI6IFwiTWFsYWdhc3lcIixcbiAgICBcIm1zXCI6IFwiTWFsYXlcIixcbiAgICBcIm1sXCI6IFwiTWFsYXlhbGFtXCIsXG4gICAgXCJtdFwiOiBcIk1hbHRlc2VcIixcbiAgICBcIm1uY1wiOiBcIk1hbmNodVwiLFxuICAgIFwibWRyXCI6IFwiTWFuZGFyaW5cIixcbiAgICBcIm1hblwiOiBcIk1hbmRpbmdvXCIsXG4gICAgXCJtbmlcIjogXCJNYW5pcHVyaVwiLFxuICAgIFwiZ3ZcIjogXCJNYW54XCIsXG4gICAgXCJtaVwiOiBcIk1hb3JpXCIsXG4gICAgXCJhcm5cIjogXCJNYXB1Y2hlXCIsXG4gICAgXCJtclwiOiBcIk1hcmF0aGlcIixcbiAgICBcImNobVwiOiBcIk1hcmlcIixcbiAgICBcIm1oXCI6IFwiTWFyc2hhbGxlc2VcIixcbiAgICBcIm13clwiOiBcIk1hcndhcmlcIixcbiAgICBcIm1hc1wiOiBcIk1hc2FpXCIsXG4gICAgXCJtem5cIjogXCJNYXphbmRlcmFuaVwiLFxuICAgIFwiYnl2XCI6IFwiTWVkdW1iYVwiLFxuICAgIFwibWVuXCI6IFwiTWVuZGVcIixcbiAgICBcIm13dlwiOiBcIk1lbnRhd2FpXCIsXG4gICAgXCJtZXJcIjogXCJNZXJ1XCIsXG4gICAgXCJtZ29cIjogXCJNZXRhXFx1MDJiY1wiLFxuICAgIFwiZXNfTVhcIjogXCJNZXhpY2FuIFNwYW5pc2hcIixcbiAgICBcIm1pY1wiOiBcIk1pY21hY1wiLFxuICAgIFwiZHVtXCI6IFwiTWlkZGxlIER1dGNoXCIsXG4gICAgXCJlbm1cIjogXCJNaWRkbGUgRW5nbGlzaFwiLFxuICAgIFwiZnJtXCI6IFwiTWlkZGxlIEZyZW5jaFwiLFxuICAgIFwiZ21oXCI6IFwiTWlkZGxlIEhpZ2ggR2VybWFuXCIsXG4gICAgXCJtZ2FcIjogXCJNaWRkbGUgSXJpc2hcIixcbiAgICBcIm5hblwiOiBcIk1pbiBOYW4gQ2hpbmVzZVwiLFxuICAgIFwibWluXCI6IFwiTWluYW5na2FiYXVcIixcbiAgICBcInhtZlwiOiBcIk1pbmdyZWxpYW5cIixcbiAgICBcIm13bFwiOiBcIk1pcmFuZGVzZVwiLFxuICAgIFwibHVzXCI6IFwiTWl6b1wiLFxuICAgIFwiYXJfMDAxXCI6IFwiTW9kZXJuIFN0YW5kYXJkIEFyYWJpY1wiLFxuICAgIFwibW9oXCI6IFwiTW9oYXdrXCIsXG4gICAgXCJtZGZcIjogXCJNb2tzaGFcIixcbiAgICBcInJvX01EXCI6IFwiTW9sZGF2aWFuXCIsXG4gICAgXCJsb2xcIjogXCJNb25nb1wiLFxuICAgIFwibW5cIjogXCJNb25nb2xpYW5cIixcbiAgICBcIm1mZVwiOiBcIk1vcmlzeWVuXCIsXG4gICAgXCJhcnlcIjogXCJNb3JvY2NhbiBBcmFiaWNcIixcbiAgICBcIm1vc1wiOiBcIk1vc3NpXCIsXG4gICAgXCJtdWxcIjogXCJNdWx0aXBsZSBMYW5ndWFnZXNcIixcbiAgICBcIm11YVwiOiBcIk11bmRhbmdcIixcbiAgICBcInR0dFwiOiBcIk11c2xpbSBUYXRcIixcbiAgICBcIm15ZVwiOiBcIk15ZW5lXCIsXG4gICAgXCJuYXFcIjogXCJOYW1hXCIsXG4gICAgXCJuYVwiOiBcIk5hdXJ1XCIsXG4gICAgXCJudlwiOiBcIk5hdmFqb1wiLFxuICAgIFwibmdcIjogXCJOZG9uZ2FcIixcbiAgICBcIm5hcFwiOiBcIk5lYXBvbGl0YW5cIixcbiAgICBcIm5lXCI6IFwiTmVwYWxpXCIsXG4gICAgXCJuZXdcIjogXCJOZXdhcmlcIixcbiAgICBcInNiYVwiOiBcIk5nYW1iYXlcIixcbiAgICBcIm5uaFwiOiBcIk5naWVtYm9vblwiLFxuICAgIFwiamdvXCI6IFwiTmdvbWJhXCIsXG4gICAgXCJ5cmxcIjogXCJOaGVlbmdhdHVcIixcbiAgICBcIm5pYVwiOiBcIk5pYXNcIixcbiAgICBcIm5pdVwiOiBcIk5pdWVhblwiLFxuICAgIFwienh4XCI6IFwiTm8gbGluZ3Vpc3RpYyBjb250ZW50XCIsXG4gICAgXCJub2dcIjogXCJOb2dhaVwiLFxuICAgIFwibmRcIjogXCJOb3J0aCBOZGViZWxlXCIsXG4gICAgXCJmcnJcIjogXCJOb3J0aGVybiBGcmlzaWFuXCIsXG4gICAgXCJzZVwiOiBcIk5vcnRoZXJuIFNhbWlcIixcbiAgICBcIm5zb1wiOiBcIk5vcnRoZXJuIFNvdGhvXCIsXG4gICAgXCJub1wiOiBcIk5vcndlZ2lhblwiLFxuICAgIFwibmJcIjogXCJOb3J3ZWdpYW4gQm9rbVxcdTAwZTVsXCIsXG4gICAgXCJublwiOiBcIk5vcndlZ2lhbiBOeW5vcnNrXCIsXG4gICAgXCJub3ZcIjogXCJOb3ZpYWxcIixcbiAgICBcIm51c1wiOiBcIk51ZXJcIixcbiAgICBcIm55bVwiOiBcIk55YW13ZXppXCIsXG4gICAgXCJueVwiOiBcIk55YW5qYVwiLFxuICAgIFwibnluXCI6IFwiTnlhbmtvbGVcIixcbiAgICBcInRvZ1wiOiBcIk55YXNhIFRvbmdhXCIsXG4gICAgXCJueW9cIjogXCJOeW9yb1wiLFxuICAgIFwibnppXCI6IFwiTnppbWFcIixcbiAgICBcIm5xb1wiOiBcIk5cXHUwMmJjS29cIixcbiAgICBcIm9jXCI6IFwiT2NjaXRhblwiLFxuICAgIFwib2pcIjogXCJPamlid2FcIixcbiAgICBcImFuZ1wiOiBcIk9sZCBFbmdsaXNoXCIsXG4gICAgXCJmcm9cIjogXCJPbGQgRnJlbmNoXCIsXG4gICAgXCJnb2hcIjogXCJPbGQgSGlnaCBHZXJtYW5cIixcbiAgICBcInNnYVwiOiBcIk9sZCBJcmlzaFwiLFxuICAgIFwibm9uXCI6IFwiT2xkIE5vcnNlXCIsXG4gICAgXCJwZW9cIjogXCJPbGQgUGVyc2lhblwiLFxuICAgIFwicHJvXCI6IFwiT2xkIFByb3ZlblxcdTAwZTdhbFwiLFxuICAgIFwib3JcIjogXCJPcml5YVwiLFxuICAgIFwib21cIjogXCJPcm9tb1wiLFxuICAgIFwib3NhXCI6IFwiT3NhZ2VcIixcbiAgICBcIm9zXCI6IFwiT3NzZXRpY1wiLFxuICAgIFwib3RhXCI6IFwiT3R0b21hbiBUdXJraXNoXCIsXG4gICAgXCJwYWxcIjogXCJQYWhsYXZpXCIsXG4gICAgXCJwZmxcIjogXCJQYWxhdGluZSBHZXJtYW5cIixcbiAgICBcInBhdVwiOiBcIlBhbGF1YW5cIixcbiAgICBcInBpXCI6IFwiUGFsaVwiLFxuICAgIFwicGRjXCI6IFwiUGVubnN5bHZhbmlhIEdlcm1hblwiLFxuICAgIFwiZmFcIjogXCJQZXJzaWFuXCIsXG4gICAgXCJwaG5cIjogXCJQaG9lbmljaWFuXCIsXG4gICAgXCJwY2RcIjogXCJQaWNhcmRcIixcbiAgICBcInBtc1wiOiBcIlBpZWRtb250ZXNlXCIsXG4gICAgXCJwZHRcIjogXCJQbGF1dGRpZXRzY2hcIixcbiAgICBcInBvblwiOiBcIlBvaG5wZWlhblwiLFxuICAgIFwicGxcIjogXCJQb2xpc2hcIixcbiAgICBcInBudFwiOiBcIlBvbnRpY1wiLFxuICAgIFwicHRcIjogXCJQb3J0dWd1ZXNlXCIsXG4gICAgXCJwcmdcIjogXCJQcnVzc2lhblwiLFxuICAgIFwicGFcIjogXCJQdW5qYWJpXCIsXG4gICAgXCJxdVwiOiBcIlF1ZWNodWFcIixcbiAgICBcInJvXCI6IFwiUm9tYW5pYW5cIixcbiAgICBcInJtXCI6IFwiUm9tYW5zaFwiLFxuICAgIFwicm9tXCI6IFwiUm9tYW55XCIsXG4gICAgXCJyb290XCI6IFwiUm9vdFwiLFxuICAgIFwicnVcIjogXCJSdXNzaWFuXCIsXG4gICAgXCJyd2tcIjogXCJSd2FcIixcbiAgICBcInNhaFwiOiBcIlNha2hhXCIsXG4gICAgXCJzYW1cIjogXCJTYW1hcml0YW4gQXJhbWFpY1wiLFxuICAgIFwic21cIjogXCJTYW1vYW5cIixcbiAgICBcInNjb1wiOiBcIlNjb3RzXCIsXG4gICAgXCJnZFwiOiBcIlNjb3R0aXNoIEdhZWxpY1wiLFxuICAgIFwic2x5XCI6IFwiU2VsYXlhclwiLFxuICAgIFwic2VsXCI6IFwiU2Vsa3VwXCIsXG4gICAgXCJzZWhcIjogXCJTZW5hXCIsXG4gICAgXCJzZWVcIjogXCJTZW5lY2FcIixcbiAgICBcInNyXCI6IFwiU2VyYmlhblwiLFxuICAgIFwic2hcIjogXCJTZXJiby1Dcm9hdGlhblwiLFxuICAgIFwic3JyXCI6IFwiU2VyZXJcIixcbiAgICBcInNlaVwiOiBcIlNlcmlcIixcbiAgICBcImtzYlwiOiBcIlNoYW1iYWxhXCIsXG4gICAgXCJzaG5cIjogXCJTaGFuXCIsXG4gICAgXCJzblwiOiBcIlNob25hXCIsXG4gICAgXCJpaVwiOiBcIlNpY2h1YW4gWWlcIixcbiAgICBcInNjblwiOiBcIlNpY2lsaWFuXCIsXG4gICAgXCJzaWRcIjogXCJTaWRhbW9cIixcbiAgICBcImJsYVwiOiBcIlNpa3Npa2FcIixcbiAgICBcInN6bFwiOiBcIlNpbGVzaWFuXCIsXG4gICAgXCJ6aF9IYW5zXCI6IFwiU2ltcGxpZmllZCBDaGluZXNlXCIsXG4gICAgXCJzZFwiOiBcIlNpbmRoaVwiLFxuICAgIFwic2lcIjogXCJTaW5oYWxhXCIsXG4gICAgXCJzbXNcIjogXCJTa29sdCBTYW1pXCIsXG4gICAgXCJkZW5cIjogXCJTbGF2ZVwiLFxuICAgIFwic2tcIjogXCJTbG92YWtcIixcbiAgICBcInNsXCI6IFwiU2xvdmVuaWFuXCIsXG4gICAgXCJ4b2dcIjogXCJTb2dhXCIsXG4gICAgXCJzb2dcIjogXCJTb2dkaWVuXCIsXG4gICAgXCJzb1wiOiBcIlNvbWFsaVwiLFxuICAgIFwic25rXCI6IFwiU29uaW5rZVwiLFxuICAgIFwiY2tiXCI6IFwiU29yYW5pIEt1cmRpc2hcIixcbiAgICBcImF6YlwiOiBcIlNvdXRoIEF6ZXJiYWlqYW5pXCIsXG4gICAgXCJuclwiOiBcIlNvdXRoIE5kZWJlbGVcIixcbiAgICBcImFsdFwiOiBcIlNvdXRoZXJuIEFsdGFpXCIsXG4gICAgXCJzbWFcIjogXCJTb3V0aGVybiBTYW1pXCIsXG4gICAgXCJzdFwiOiBcIlNvdXRoZXJuIFNvdGhvXCIsXG4gICAgXCJlc1wiOiBcIlNwYW5pc2hcIixcbiAgICBcInNyblwiOiBcIlNyYW5hbiBUb25nb1wiLFxuICAgIFwiemdoXCI6IFwiU3RhbmRhcmQgTW9yb2NjYW4gVGFtYXppZ2h0XCIsXG4gICAgXCJzdWtcIjogXCJTdWt1bWFcIixcbiAgICBcInN1eFwiOiBcIlN1bWVyaWFuXCIsXG4gICAgXCJzdVwiOiBcIlN1bmRhbmVzZVwiLFxuICAgIFwic3VzXCI6IFwiU3VzdVwiLFxuICAgIFwic3dcIjogXCJTd2FoaWxpXCIsXG4gICAgXCJzc1wiOiBcIlN3YXRpXCIsXG4gICAgXCJzdlwiOiBcIlN3ZWRpc2hcIixcbiAgICBcImZyX0NIXCI6IFwiU3dpc3MgRnJlbmNoXCIsXG4gICAgXCJnc3dcIjogXCJTd2lzcyBHZXJtYW5cIixcbiAgICBcImRlX0NIXCI6IFwiU3dpc3MgSGlnaCBHZXJtYW5cIixcbiAgICBcInN5clwiOiBcIlN5cmlhY1wiLFxuICAgIFwic2hpXCI6IFwiVGFjaGVsaGl0XCIsXG4gICAgXCJ0bFwiOiBcIlRhZ2Fsb2dcIixcbiAgICBcInR5XCI6IFwiVGFoaXRpYW5cIixcbiAgICBcImRhdlwiOiBcIlRhaXRhXCIsXG4gICAgXCJ0Z1wiOiBcIlRhamlrXCIsXG4gICAgXCJ0bHlcIjogXCJUYWx5c2hcIixcbiAgICBcInRtaFwiOiBcIlRhbWFzaGVrXCIsXG4gICAgXCJ0YVwiOiBcIlRhbWlsXCIsXG4gICAgXCJ0cnZcIjogXCJUYXJva29cIixcbiAgICBcInR3cVwiOiBcIlRhc2F3YXFcIixcbiAgICBcInR0XCI6IFwiVGF0YXJcIixcbiAgICBcInRlXCI6IFwiVGVsdWd1XCIsXG4gICAgXCJ0ZXJcIjogXCJUZXJlbm9cIixcbiAgICBcInRlb1wiOiBcIlRlc29cIixcbiAgICBcInRldFwiOiBcIlRldHVtXCIsXG4gICAgXCJ0aFwiOiBcIlRoYWlcIixcbiAgICBcImJvXCI6IFwiVGliZXRhblwiLFxuICAgIFwidGlnXCI6IFwiVGlncmVcIixcbiAgICBcInRpXCI6IFwiVGlncmlueWFcIixcbiAgICBcInRlbVwiOiBcIlRpbW5lXCIsXG4gICAgXCJ0aXZcIjogXCJUaXZcIixcbiAgICBcInRsaVwiOiBcIlRsaW5naXRcIixcbiAgICBcInRwaVwiOiBcIlRvayBQaXNpblwiLFxuICAgIFwidGtsXCI6IFwiVG9rZWxhdVwiLFxuICAgIFwidG9cIjogXCJUb25nYW5cIixcbiAgICBcImZpdFwiOiBcIlRvcm5lZGFsZW4gRmlubmlzaFwiLFxuICAgIFwiemhfSGFudFwiOiBcIlRyYWRpdGlvbmFsIENoaW5lc2VcIixcbiAgICBcInRrclwiOiBcIlRzYWtodXJcIixcbiAgICBcInRzZFwiOiBcIlRzYWtvbmlhblwiLFxuICAgIFwidHNpXCI6IFwiVHNpbXNoaWFuXCIsXG4gICAgXCJ0c1wiOiBcIlRzb25nYVwiLFxuICAgIFwidG5cIjogXCJUc3dhbmFcIixcbiAgICBcInRjeVwiOiBcIlR1bHVcIixcbiAgICBcInR1bVwiOiBcIlR1bWJ1a2FcIixcbiAgICBcImFlYlwiOiBcIlR1bmlzaWFuIEFyYWJpY1wiLFxuICAgIFwidHJcIjogXCJUdXJraXNoXCIsXG4gICAgXCJ0a1wiOiBcIlR1cmttZW5cIixcbiAgICBcInRydVwiOiBcIlR1cm95b1wiLFxuICAgIFwidHZsXCI6IFwiVHV2YWx1XCIsXG4gICAgXCJ0eXZcIjogXCJUdXZpbmlhblwiLFxuICAgIFwidHdcIjogXCJUd2lcIixcbiAgICBcImtjZ1wiOiBcIlR5YXBcIixcbiAgICBcInVkbVwiOiBcIlVkbXVydFwiLFxuICAgIFwidWdhXCI6IFwiVWdhcml0aWNcIixcbiAgICBcInVrXCI6IFwiVWtyYWluaWFuXCIsXG4gICAgXCJ1bWJcIjogXCJVbWJ1bmR1XCIsXG4gICAgXCJ1bmRcIjogXCJVbmtub3duIExhbmd1YWdlXCIsXG4gICAgXCJoc2JcIjogXCJVcHBlciBTb3JiaWFuXCIsXG4gICAgXCJ1clwiOiBcIlVyZHVcIixcbiAgICBcInVnXCI6IFwiVXlnaHVyXCIsXG4gICAgXCJ1elwiOiBcIlV6YmVrXCIsXG4gICAgXCJ2YWlcIjogXCJWYWlcIixcbiAgICBcInZlXCI6IFwiVmVuZGFcIixcbiAgICBcInZlY1wiOiBcIlZlbmV0aWFuXCIsXG4gICAgXCJ2ZXBcIjogXCJWZXBzXCIsXG4gICAgXCJ2aVwiOiBcIlZpZXRuYW1lc2VcIixcbiAgICBcInZvXCI6IFwiVm9sYXBcXHUwMGZja1wiLFxuICAgIFwidnJvXCI6IFwiVlxcdTAwZjVyb1wiLFxuICAgIFwidm90XCI6IFwiVm90aWNcIixcbiAgICBcInZ1blwiOiBcIlZ1bmpvXCIsXG4gICAgXCJ3YVwiOiBcIldhbGxvb25cIixcbiAgICBcIndhZVwiOiBcIldhbHNlclwiLFxuICAgIFwid2FyXCI6IFwiV2FyYXlcIixcbiAgICBcIndhc1wiOiBcIldhc2hvXCIsXG4gICAgXCJndWNcIjogXCJXYXl1dVwiLFxuICAgIFwiY3lcIjogXCJXZWxzaFwiLFxuICAgIFwidmxzXCI6IFwiV2VzdCBGbGVtaXNoXCIsXG4gICAgXCJmeVwiOiBcIldlc3Rlcm4gRnJpc2lhblwiLFxuICAgIFwibXJqXCI6IFwiV2VzdGVybiBNYXJpXCIsXG4gICAgXCJ3YWxcIjogXCJXb2xheXR0YVwiLFxuICAgIFwid29cIjogXCJXb2xvZlwiLFxuICAgIFwid3V1XCI6IFwiV3UgQ2hpbmVzZVwiLFxuICAgIFwieGhcIjogXCJYaG9zYVwiLFxuICAgIFwiaHNuXCI6IFwiWGlhbmcgQ2hpbmVzZVwiLFxuICAgIFwieWF2XCI6IFwiWWFuZ2JlblwiLFxuICAgIFwieWFvXCI6IFwiWWFvXCIsXG4gICAgXCJ5YXBcIjogXCJZYXBlc2VcIixcbiAgICBcInliYlwiOiBcIlllbWJhXCIsXG4gICAgXCJ5aVwiOiBcIllpZGRpc2hcIixcbiAgICBcInlvXCI6IFwiWW9ydWJhXCIsXG4gICAgXCJ6YXBcIjogXCJaYXBvdGVjXCIsXG4gICAgXCJkamVcIjogXCJaYXJtYVwiLFxuICAgIFwienphXCI6IFwiWmF6YVwiLFxuICAgIFwiemVhXCI6IFwiWmVlbGFuZGljXCIsXG4gICAgXCJ6ZW5cIjogXCJaZW5hZ2FcIixcbiAgICBcInphXCI6IFwiWmh1YW5nXCIsXG4gICAgXCJnYnpcIjogXCJab3JvYXN0cmlhbiBEYXJpXCIsXG4gICAgXCJ6dVwiOiBcIlp1bHVcIixcbiAgICBcInp1blwiOiBcIlp1bmlcIlxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9jYS9jYS5kYXRhLmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuICovXG5cbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4uL21haW4vc3RvcmUnO1xuXG5cbndpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xuQ29udGVudEFyZW5hLlV0aWxzID0ge1xuXG4gICAgY29udGVudFBhcnNlckZyb21TZXJ2ZXIoY29udGVudCkge1xuXG4gICAgICAgIGlmICggY29udGVudC5wYXJzZWQgKSByZXR1cm4gY29udGVudDtcblxuICAgICAgICBsZXQgc29ydCA9IHRydWU7XG5cbiAgICAgICAgaWYgKCBjb250ZW50LmV4dHJhRGF0YSl7XG4gICAgICAgICAgICBPYmplY3QuZW50cmllcyhjb250ZW50LmV4dHJhRGF0YSkuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAoW2tleSwgdmFsdWVdKSA9PiBjb250ZW50W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRlbnQudG91cm5hbWVudCA9IChjb250ZW50LnRvdXJuYW1lbnQpID8gQXJyYXkuaXNBcnJheShjb250ZW50LnRvdXJuYW1lbnQpPyBjb250ZW50LnRvdXJuYW1lbnQgOiBbY29udGVudC50b3VybmFtZW50XSA6IFtdO1xuICAgICAgICBjb250ZW50LnNwb3J0Q2F0ZWdvcnkgPSAoY29udGVudC5zcG9ydENhdGVnb3J5KSA/IEFycmF5LmlzQXJyYXkoY29udGVudC5zcG9ydENhdGVnb3J5KT8gY29udGVudC5zcG9ydENhdGVnb3J5IDogW2NvbnRlbnQuc3BvcnRDYXRlZ29yeV0gOiBbXTtcblxuICAgICAgICBpZiAoY29udGVudC5zZWxlY3RlZFJpZ2h0c0J5U3VwZXJSaWdodCl7XG4gICAgICAgICAgICBjb250ZW50LnJpZ2h0c1BhY2thZ2UuZm9yRWFjaCggKHJwKSA9PiB7XG4gICAgICAgICAgICAgICAgcnAuc2VsZWN0ZWRSaWdodHMgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnaXRlbXMnXTtcbiAgICAgICAgICAgICAgICBycC5leGNsdXNpdmUgPSBjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0W3JwLmlkXVsnZXhjbHVzaXZlJ107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZW50LmZpeHR1cmVzQnlTZWFzb24pe1xuICAgICAgICAgICAgY29udGVudC5zZWFzb25zLmZvckVhY2goIChzLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcy5maXh0dXJlcyA9IGNvbnRlbnQuZml4dHVyZXNCeVNlYXNvbltpXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudC5sYXcpe1xuICAgICAgICAgICAgY29udGVudC5sYXcubGFiZWwgPSBjb250ZW50Lmxhdy5uYW1lO1xuICAgICAgICAgICAgY29udGVudC5sYXcudmFsdWUgPSBjb250ZW50Lmxhdy5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBjb250ZW50LmN1c3RvbUJ1bmRsZXMgKSB7XG4gICAgICAgICAgICBjb250ZW50LmN1c3RvbUJ1bmRsZXMuZm9yRWFjaCgoc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3Auc2FsZXNNZXRob2QpIHNwLnNhbGVzTWV0aG9kID0gc3Auc2FsZXNNZXRob2QubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoc3AuZXhjbHVkZWRDb3VudHJpZXMpIHNwLmV4Y2x1ZGVkVGVycml0b3JpZXMgPSBzcC5leGNsdWRlZENvdW50cmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZSwgcmVnaW9uczp0LnJlZ2lvbnMsIHRlcnJpdG9yeUlkOnQudGVycml0b3J5SWR9fSlcbiAgICAgICAgICAgICAgICBpZiAoc3AudGVycml0b3JpZXMpIHNwLnRlcnJpdG9yaWVzID0gc3AudGVycml0b3JpZXMubWFwKHQ9PntyZXR1cm57bmFtZTp0Lm5hbWUsbGFiZWw6dC5uYW1lLCB2YWx1ZTp0Lm5hbWUsIHJlZ2lvbnM6dC5yZWdpb25zLCB0ZXJyaXRvcnlJZDp0LnRlcnJpdG9yeUlkfX0pXG4gICAgICAgICAgICAgICAgaWYgKCFzcC50ZXJyaXRvcmllcykgc29ydCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwLmluc3RhbGxtZW50cyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcC5pbnN0YWxsbWVudHMuZm9yRWFjaChpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkuZGF0ZSkgaS5kYXRlID0gbW9tZW50KGkuZGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSl7fVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGNvbnRlbnQuc2FsZXNQYWNrYWdlcyApIHtcbiAgICAgICAgICAgIGNvbnRlbnQuc2FsZXNQYWNrYWdlcy5mb3JFYWNoKChzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzcC5zYWxlc01ldGhvZCkgc3Auc2FsZXNNZXRob2QgPSBzcC5zYWxlc01ldGhvZC5uYW1lO1xuICAgICAgICAgICAgICAgIGlmIChzcC5leGNsdWRlZENvdW50cmllcykgc3AuZXhjbHVkZWRUZXJyaXRvcmllcyA9IHNwLmV4Y2x1ZGVkQ291bnRyaWVzLm1hcCh0PT57cmV0dXJue2xhYmVsOnQubmFtZSwgdmFsdWU6dC5uYW1lLCByZWdpb25zOnQucmVnaW9ucywgdGVycml0b3J5SWQ6dC50ZXJyaXRvcnlJZH19KVxuICAgICAgICAgICAgICAgIGlmIChzcC50ZXJyaXRvcmllcykgc3AudGVycml0b3JpZXMgPSBzcC50ZXJyaXRvcmllcy5tYXAodD0+e3JldHVybntsYWJlbDp0Lm5hbWUsIHZhbHVlOnQubmFtZSwgcmVnaW9uczp0LnJlZ2lvbnMsIHRlcnJpdG9yeUlkOnQudGVycml0b3J5SWR9fSlcbiAgICAgICAgICAgICAgICBpZiAoIXNwLnRlcnJpdG9yaWVzKSBzb3J0ID0gZmFsc2VcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcC5pbnN0YWxsbWVudHMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3AuaW5zdGFsbG1lbnRzLmZvckVhY2goaT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpLmRhdGUpIGkuZGF0ZSA9IG1vbWVudChpLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpe31cblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzb3J0KSBjb250ZW50LnNhbGVzUGFja2FnZXMuc29ydCh0aGlzLnNvcnRTYWxlc1BhY2thZ2VzKS5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudC5lbmREYXRlKSBjb250ZW50LmVuZERhdGUgPSBtb21lbnQoY29udGVudC5lbmREYXRlKTtcbiAgICAgICAgaWYgKGNvbnRlbnQuc3RhcnREYXRlKSBjb250ZW50LnN0YXJ0RGF0ZSA9IG1vbWVudChjb250ZW50LnN0YXJ0RGF0ZSk7XG4gICAgICAgIGlmIChjb250ZW50LnNpZ25hdHVyZSkgY29udGVudC5zaWduYXR1cmUgPSBob3N0dXJsICsgY29udGVudC5zaWduYXR1cmU7XG5cbiAgICAgICAgY29udGVudC5zdGVwID0gTnVtYmVyKGNvbnRlbnQuc3RlcCk7XG4gICAgICAgIGNvbnRlbnQuY3VzdG9tU2Vhc29ucyA9IGNvbnRlbnQuc2Vhc29ucy5maWx0ZXIocz0+e1xuICAgICAgICAgICAgcmV0dXJuIHMuZXh0ZXJuYWxJZCAmJiBzLmV4dGVybmFsSWQuc3RhcnRzV2l0aChcImNhOlwiKVxuICAgICAgICB9KS5tYXAoKHMsaSk9PntcbiAgICAgICAgICAgIGxldCB5ZWFycztcbiAgICAgICAgICAgIGlmIChzLnllYXIpe1xuICAgICAgICAgICAgICAgIHllYXJzID0gcy55ZWFyLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgICAgICAgICBzLmZyb20gPSB5ZWFycy5sZW5ndGggPT09IDEgPyB5ZWFyc1swXSA6IDIwMDAgKyBOdW1iZXIoeWVhcnNbMF0pO1xuICAgICAgICAgICAgICAgIHMudG8gPSB5ZWFycy5sZW5ndGggPT09IDEgPyBudWxsIDogMjAwMCArIE51bWJlcih5ZWFyc1sxXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb250ZW50LmZpeHR1cmVzQnlTZWFzb24pe1xuICAgICAgICAgICAgICAgIHMuZml4dHVyZXMgPSBjb250ZW50LmZpeHR1cmVzQnlTZWFzb25baV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIGNvbnRlbnQuc2Vhc29ucyA9IGNvbnRlbnQuc2Vhc29ucy5tYXAocz0+e1xuICAgICAgICAgICAgaWYgKCBzLmV4dGVybmFsSWQgJiYgcy5leHRlcm5hbElkLnN0YXJ0c1dpdGgoXCJjYTpcIikgKXtcbiAgICAgICAgICAgICAgICBzLmN1c3RvbSA9IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbnRlbnQuZXh0cmFEYXRhICYmIGNvbnRlbnQuZXh0cmFEYXRhLnNlYXNvbkR1cmF0aW9ucykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1c3RvbVNlYXNvbkR1ciA9IGNvbnRlbnQuZXh0cmFEYXRhLnNlYXNvbkR1cmF0aW9uc1tzLmV4dGVybmFsSWRdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1c3RvbVNlYXNvbkR1cikge1xuICAgICAgICAgICAgICAgICAgICBzLmN1c3RvbVN0YXJ0RGF0ZSA9IGN1c3RvbVNlYXNvbkR1ci5zdGFydERhdGU7XG4gICAgICAgICAgICAgICAgICAgIHMuY3VzdG9tRW5kRGF0ZSA9IGN1c3RvbVNlYXNvbkR1ci5lbmREYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHM7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHVzZXIgPSBzdG9yZS5nZXRTdGF0ZSgpLnVzZXI7XG5cbiAgICAgICAgaWYgKCFjb250ZW50LnNpZ25hdHVyZU5hbWUpIGNvbnRlbnQuc2lnbmF0dXJlTmFtZSA9IHVzZXIuZmlyc3ROYW1lICsgXCIgXCIgKyB1c2VyLmxhc3ROYW1lO1xuICAgICAgICBpZiAoIWNvbnRlbnQuc2lnbmF0dXJlUG9zaXRpb24pIGNvbnRlbnQuc2lnbmF0dXJlUG9zaXRpb24gPSB1c2VyLnRpdGxlO1xuXG4gICAgICAgIGNvbnRlbnQucGFyc2VkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9LFxuXG4gICAgZmlsdGVyQ29tcGFueUluZm8oZGF0YSl7XG5cbiAgICAgICAgbGV0IGNvbXBhbnkgPSB7fTtcblxuICAgICAgICBjb21wYW55LmxlZ2FsTmFtZSA9IGRhdGEubGVnYWxOYW1lO1xuICAgICAgICBjb21wYW55LnJlZ2lzdHJhdGlvbk51bWJlciA9IGRhdGEucmVnaXN0cmF0aW9uTnVtYmVyO1xuICAgICAgICBjb21wYW55LnZhdCA9IGRhdGEudmF0O1xuICAgICAgICBjb21wYW55LmFkZHJlc3MgPSBkYXRhLmFkZHJlc3M7XG4gICAgICAgIGNvbXBhbnkuYWRkcmVzczIgPSBkYXRhLmFkZHJlc3MyO1xuICAgICAgICBjb21wYW55LmNpdHkgPSBkYXRhLmNpdHk7XG4gICAgICAgIGNvbXBhbnkuemlwID0gZGF0YS56aXA7XG4gICAgICAgIGNvbXBhbnkuY291bnRyeSA9IGRhdGEuY291bnRyeTtcblxuICAgICAgICByZXR1cm4gY29tcGFueTtcbiAgICB9LFxuXG4gICAgc29ydFNhbGVzUGFja2FnZXMgKGEsIGIpe1xuICAgICAgICBsZXQgYyA9IChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGEgPiBiKSA/IDEgOiAoKGIgPiBhKSA/IC0xIDogMClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGMoYS50ZXJyaXRvcmllcy5sZW5ndGgsIGIudGVycml0b3JpZXMubGVuZ3RoKSB8fCBjKGIubmFtZSwgYS5uYW1lKTtcbiAgICB9LFxuXG5cblxuICAgIGlzQVBJQXZhaWxhYmxlKCkge1xuICAgICAgICAvLyBDaGVjayBmb3IgdGhlIHZhcmlvdXMgRmlsZSBBUEkgc3VwcG9ydC5cbiAgICAgICAgaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xuICAgICAgICAgICAgLy8gR3JlYXQgc3VjY2VzcyEgQWxsIHRoZSBGaWxlIEFQSXMgYXJlIHN1cHBvcnRlZC5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc291cmNlOiBGaWxlIEFQSSBhdmFpbGFiaWxpdHkgLSBodHRwOi8vY2FuaXVzZS5jb20vI2ZlYXQ9ZmlsZWFwaVxuICAgICAgICAgICAgLy8gc291cmNlOiA8b3V0cHV0PiBhdmFpbGFiaWxpdHkgLSBodHRwOi8vaHRtbDVkb2N0b3IuY29tL3RoZS1vdXRwdXQtZWxlbWVudC9cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJ1RoZSBIVE1MNSBBUElzIHVzZWQgaW4gdGhpcyBmb3JtIGFyZSBvbmx5IGF2YWlsYWJsZSBpbiB0aGUgZm9sbG93aW5nIGJyb3dzZXJzOjxiciAvPicpO1xuICAgICAgICAgICAgLy8gNi4wIEZpbGUgQVBJICYgMTMuMCA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gR29vZ2xlIENocm9tZTogMTMuMCBvciBsYXRlcjxiciAvPicpO1xuICAgICAgICAgICAgLy8gMy42IEZpbGUgQVBJICYgNi4wIDxvdXRwdXQ+XG4gICAgICAgICAgICBkb2N1bWVudC53cml0ZWxuKCcgLSBNb3ppbGxhIEZpcmVmb3g6IDYuMCBvciBsYXRlcjxiciAvPicpO1xuICAgICAgICAgICAgLy8gMTAuMCBGaWxlIEFQSSAmIDEwLjAgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIEludGVybmV0IEV4cGxvcmVyOiBOb3Qgc3VwcG9ydGVkIChwYXJ0aWFsIHN1cHBvcnQgZXhwZWN0ZWQgaW4gMTAuMCk8YnIgLz4nKTtcbiAgICAgICAgICAgIC8vID8gRmlsZSBBUEkgJiA1LjEgPG91dHB1dD5cbiAgICAgICAgICAgIGRvY3VtZW50LndyaXRlbG4oJyAtIFNhZmFyaTogTm90IHN1cHBvcnRlZDxiciAvPicpO1xuICAgICAgICAgICAgLy8gPyBGaWxlIEFQSSAmIDkuMiA8b3V0cHV0PlxuICAgICAgICAgICAgZG9jdW1lbnQud3JpdGVsbignIC0gT3BlcmE6IE5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYWRkT3JkaW5hbChuKSB7XG4gICAgICAgIHZhciBzdHIgPSBuLnRvU3RyaW5nKCkuc2xpY2UoLTEpLFxuICAgICAgICAgICAgb3JkID0gJyc7XG4gICAgICAgIHN3aXRjaCAoc3RyKSB7XG4gICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAnc3QnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgICAgb3JkID0gJ25kJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICAgIG9yZCA9ICdyZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgICAgY2FzZSAnNic6XG4gICAgICAgICAgICBjYXNlICc3JzpcbiAgICAgICAgICAgIGNhc2UgJzgnOlxuICAgICAgICAgICAgY2FzZSAnOSc6XG4gICAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgICAgICBvcmQgPSAndGgnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuICsgb3JkO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0gYXJyXG4gICAgICogQHBhcmFtIHByb3BcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldEluZGV4ICh2YWx1ZSwgYXJyLCBwcm9wKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGFycltpXVtwcm9wXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7IC8vdG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIHRoZSB2YWx1ZSBkb2Vzbid0IGV4aXN0XG4gICAgfSxcblxuICAgIGdldFdlYnNpdGVVUmwoc3RyKSB7XG4gICAgICAgIGlmIChzdHIuaW5jbHVkZXMoJ2h0dHA6Ly8nKSB8fCBzdHIuaW5jbHVkZXMoJ2h0dHBzOi8vJykpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnaHR0cDovLycrc3RyXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNMaXN0aW5nUHVibGlzaGVkKHN0YXR1cykge1xuICAgICAgICByZXR1cm4gKHN0YXR1cyAmJiAoc3RhdHVzLm5hbWUgPT09IFwiQVBQUk9WRURcIiB8fCBzdGF0dXMubmFtZSA9PT0gXCJQRU5ESU5HXCIgfHwgc3RhdHVzLm5hbWUgPT09IFwiRURJVEVEXCIpKTtcbiAgICB9XG5cbn07XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvY2EvY2EudXRpbHMuanMiLCJleHBvcnQgY29uc3QgbGFuZGluZ1R5cGVzID0ge1xuICAgIFJFU0VUX1BBU1NXT1JEX1NVQ0NFU1M6ICdSRVNFVF9QQVNTV09SRF9TVUNDRVNTJyxcbiAgICBDTEVBUl9SRVNFVF9QQVNTV09SRDogJ0NMRUFSX1JFU0VUX1BBU1NXT1JEJyxcbiAgICBTRVRfUkVGRVJFUl9EQVRBIDogJ1NFVF9SRUZFUkVSX0RBVEEnLFxufTtcblxuY29uc3QgREVGQVVMVF9TVEFURSA9IHtcbiAgICByZXNldFBhc3N3b3JkU3VjY2VzczogZmFsc2Vcbn07XG5cbmV4cG9ydCBjb25zdCBsYW5kaW5nID0gKHN0YXRlID0gREVGQVVMVF9TVEFURSwgYWN0aW9uKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGxhbmRpbmdUeXBlcy5SRVNFVF9QQVNTV09SRF9TVUNDRVNTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7cmVzZXRQYXNzd29yZFN1Y2Nlc3M6IHRydWV9KTtcblxuICAgICAgICBjYXNlIGxhbmRpbmdUeXBlcy5DTEVBUl9SRVNFVF9QQVNTV09SRDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge3Jlc2V0UGFzc3dvcmRTdWNjZXNzOiBmYWxzZX0pO1xuXG4gICAgICAgIGNhc2UgbGFuZGluZ1R5cGVzLlNFVF9SRUZFUkVSX0RBVEE6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtyZWZlcmVyRW1haWw6IGFjdGlvbi5yZWZlcmVyRW1haWwsIHJlZmVyZXJMaXN0aW5nSWQgOiBhY3Rpb24ucmVmZXJlckxpc3RpbmdJZH0pO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gREVGQVVMVF9TVEFURTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2xhbmRpbmcvcmVkdWNlcnMvbGFuZGluZy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQge2xhbmd1YWdlc30gZnJvbSBcIi4uLy4uLy4uL2RhdGEvbGFuZ3VhZ2VzXCI7XG5cbmV4cG9ydCBjb25zdCBhbGxWYWx1ZSA9IHtcbiAgICB2YWx1ZTogJ2FsbCcsXG4gICAgbGFiZWw6ICdBbGwgbG9jYWwgbGFuZ3VhZ2VzJ1xufTtcblxuY2xhc3MgTGFuZ3VhZ2VTZWxlY3RvciBleHRlbmRzICBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcblxuICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb24gPSBwcm9wcy52YWx1ZSA/IFsuLi5wcm9wcy52YWx1ZV0gOiBbXTtcbiAgICB9XG5cbiAgICBoYW5kbGVPbkNoYW5nZSA9IChzZWxlY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgaGFzQWxsID0gISFzZWxlY3Rpb24uZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gJ2FsbCcpO1xuICAgICAgICBjb25zdCBoYXNBbGxQcmV2ID0gISF0aGlzLnByZXZTZWxlY3Rpb24uZmluZCgoaXRlbSkgPT4gaXRlbS52YWx1ZSA9PT0gJ2FsbCcpO1xuICAgICAgICAvL2NvbnN0IGl0ZW1zQ2hhbmdlZCA9IHNlbGVjdGlvbi5sZW5ndGggIT09IHRoaXMucHJldlNlbGVjdGlvbi5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGhhc0FsbCkge1xuICAgICAgICAgICAgaWYgKGhhc0FsbFByZXYpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgQWxsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uID0gc2VsZWN0aW9uLmZpbHRlcihpdGVtID0+IGl0ZW0udmFsdWUgIT09ICdhbGwnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQWRkIEFsbCBhbmQgcmVtb3ZlIG90aGVyc1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IFthbGxWYWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZTZWxlY3Rpb24gPSBzZWxlY3Rpb247XG5cbiAgICAgICAgb25DaGFuZ2Uoc2VsZWN0aW9uKTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHsgdmFsdWUsIG11bHRpID0gdHJ1ZSwgcGxhY2Vob2xkZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHJlYWxMYW5ndWFnZXMgPSBPYmplY3QudmFsdWVzKGxhbmd1YWdlcykubWFwKChpLCBrKT0+KHt2YWx1ZSA6IGkubmFtZSAsIGxhYmVsIDogaS5uYW1lIH0pKTtcbiAgICAgICAgY29uc3QgYWxsTGFuZ3VhZ2VzID0gWyBhbGxWYWx1ZSwgLi4ucmVhbExhbmd1YWdlcyBdO1xuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICBuYW1lPVwiZm9ybS1maWVsZC1uYW1lXCJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgbXVsdGk9e211bHRpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgICBvcHRpb25zPXthbGxMYW5ndWFnZXN9XG4gICAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgeyBMYW5ndWFnZVNlbGVjdG9yIH07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9MYW5ndWFnZVNlbGVjdG9yLmpzIiwiZXhwb3J0IGNvbnN0IGNvbW1vblR5cGVzPSB7XG4gICAgR0VUX0RFRkFVTFRfUklHSFRTX1BBQ0tBR0U6J0dFVF9ERUZBVUxUX1JJR0hUU19QQUNLQUdFJyxcbiAgICBTRVRfVE9UQUxfQ09VTlRSSUVTOiAnU0VUX1RPVEFMX0NPVU5UUklFUycsXG4gICAgU0VUX1RFU1RfU1RBR0VfTU9ERTogJ1NFVF9URVNUX1NUQUdFX01PREUnLFxuICAgIFNFVF9FTlZfSE9TVF9VUkw6ICdTRVRfRU5WX0hPU1RfVVJMJ1xufTtcblxuY29uc3QgY29tbW9uRGVmYXVsdCA9IHtcbiAgICB0b3RhbENvdW50cmllcyA6IDI0MCxcbiAgICB0ZXN0U3RhZ2VNb2RlOiBmYWxzZVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbW1vbiA9IChzdGF0ZSA9IGNvbW1vbkRlZmF1bHQsIGFjdGlvbikgPT4ge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIGNvbW1vblR5cGVzLkdFVF9ERUZBVUxUX1JJR0hUU19QQUNLQUdFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7ZGVmYXVsdFJpZ2h0c1BhY2thZ2U6IGFjdGlvbi5kZWZhdWx0UmlnaHRzUGFja2FnZX0pO1xuICAgICAgICBjYXNlIGNvbW1vblR5cGVzLlNFVF9UT1RBTF9DT1VOVFJJRVM6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHt0b3RhbENvdW50cmllczogYWN0aW9uLnRvdGFsQ291bnRyaWVzfSk7XG4gICAgICAgIGNhc2UgY29tbW9uVHlwZXMuU0VUX1RFU1RfU1RBR0VfTU9ERTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge3Rlc3RTdGFnZU1vZGU6IGFjdGlvbi50ZXN0U3RhZ2VNb2RlfSk7XG4gICAgICAgIGNhc2UgY29tbW9uVHlwZXMuU0VUX0VOVl9IT1NUX1VSTDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge2Vudkhvc3RVcmw6IGFjdGlvbi5lbnZIb3N0VXJsfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3JlZHVjZXJzL2NvbW1vbi5qcyIsImV4cG9ydCBjb25zdCB1c2VyVHlwZXM9IHtcbiAgICBMT0dPVVQ6J0xPR09VVCcsXG4gICAgTE9HSU46J0xPR0lOJyxcbiAgICBQUk9GSUxFOidQUk9GSUxFJyxcbiAgICBMT0FEX1VTRVJfREFUQTonTE9BRF9VU0VSX0RBVEEnLFxufTtcblxuY29uc3QgZGVmYXVsdFVzZXIgPSB7XG4gICAgcHJvZmlsZSA6IFwiU0VMTEVSXCJcblxufTtcblxuZXhwb3J0IGNvbnN0IHVzZXIgPSAoc3RhdGUgPSBkZWZhdWx0VXNlciwgYWN0aW9uKSA9PiB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgIGNhc2UgdXNlclR5cGVzLkxPR09VVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGVmYXVsdFVzZXIpO1xuICAgICAgICBjYXNlIHVzZXJUeXBlcy5MT0dJTjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGVtYWlsOiBhY3Rpb24uZW1haWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHVzZXJUeXBlcy5QUk9GSUxFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgcHJvZmlsZTogYWN0aW9uLnByb2ZpbGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHVzZXJUeXBlcy5MT0FEX1VTRVJfREFUQTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgey4uLmFjdGlvbi51c2VyfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3JlZHVjZXJzL3VzZXIuanMiLCJleHBvcnQgY29uc3QgdmFsaWRhdGlvblR5cGVzID0ge1xuICAgIEVOQUJMRV9WQUxJREFUSU9OOiAnRU5BQkxFX1ZBTElEQVRJT04nLFxuICAgIERJU0FCTEVfVkFMSURBVElPTjogJ0RJU0FCTEVfVkFMSURBVElPTidcbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0aW9uID0gKHN0YXRlID0gZmFsc2UsIGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblxuICAgICAgICBjYXNlIHZhbGlkYXRpb25UeXBlcy5FTkFCTEVfVkFMSURBVElPTjpcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG5cbiAgICAgICAgY2FzZSB2YWxpZGF0aW9uVHlwZXMuRElTQUJMRV9WQUxJREFUSU9OOlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9yZWR1Y2Vycy92YWxpZGF0aW9uLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnXG5pbXBvcnQge2kxOG5TdGF0ZX0gZnJvbSBcInJlZHV4LWkxOG5cIjtcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuayc7XG5pbXBvcnQge2NvbnRlbnR9IGZyb20gXCIuLi9zZWxsL3JlZHVjZXJzL2NvbnRlbnRcIjtcbmltcG9ydCB7c2VsZWN0b3J9IGZyb20gXCIuLi9zZWxsL3JlZHVjZXJzL3NlbGVjdG9yXCI7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSBcIi4uL2J1eS9yZWR1Y2Vycy9maWx0ZXJcIjtcbmltcG9ydCB7bWFya2V0cGxhY2V9IGZyb20gXCIuLi9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2VcIjtcbmltcG9ydCB7bWFuYWdlfSBmcm9tIFwiLi4vbWFuYWdlL3JlZHVjZXJzL21hbmFnZVwiO1xuaW1wb3J0IHt1c2VyfSBmcm9tIFwiLi9yZWR1Y2Vycy91c2VyXCI7XG5pbXBvcnQge2NvbW1vbn0gZnJvbSBcIi4vcmVkdWNlcnMvY29tbW9uXCI7XG5pbXBvcnQge3ZhbGlkYXRpb259IGZyb20gXCIuL3JlZHVjZXJzL3ZhbGlkYXRpb25cIjtcbmltcG9ydCB7bGFuZGluZ30gZnJvbSBcIi4vLi4vbGFuZGluZy9yZWR1Y2Vycy9sYW5kaW5nXCI7XG5cbmNvbnN0IHJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBjb250ZW50LFxuICAgIHNlbGVjdG9yLFxuICAgIG1hcmtldHBsYWNlLFxuICAgIGZpbHRlcixcbiAgICBtYW5hZ2UsXG4gICAgdXNlcixcbiAgICBjb21tb24sXG4gICAgdmFsaWRhdGlvbixcbiAgICBsYW5kaW5nLFxuICAgIGkxOG5TdGF0ZVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN0b3JlKHJlZHVjZXJzLCBhcHBseU1pZGRsZXdhcmUodGh1bmspKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3N0b3JlLmpzIiwiXG5leHBvcnQgY29uc3QgbWFuYWdlVHlwZXM9IHtcbiAgICBURVNUOidURVNUJyxcbn07XG5cbmV4cG9ydCBjb25zdCBtYW5hZ2UgPSAoc3RhdGUgPSB7XG4gICAgdGVzdEl0ZW06IFwibWFuYWdlUmVkdWNlclwiXG5cbn0sIGFjdGlvbikgPT4ge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIG1hbmFnZVR5cGVzLlRFU1Q6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICB0ZXN0OiBhY3Rpb24udGV4dCxcbiAgICAgICAgICAgICAgICBpZCA6IGFjdGlvbi5pZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvcmVkdWNlcnMvbWFuYWdlLmpzIiwiaW1wb3J0IG1heCBmcm9tICdsb2Rhc2gvbWF4JztcbmltcG9ydCB7IGFsbFZhbHVlIH0gZnJvbSAnLi8uLi8uLi9tYWluL2NvbXBvbmVudHMvTGFuZ3VhZ2VTZWxlY3Rvcic7XG5cbmV4cG9ydCBjb25zdCBjb250ZW50VHlwZT0ge1xuICAgIENPTlRFTlRfSU5JVDonQ09OVEVOVF9JTklUJyxcbiAgICBTVEVQX0NIQU5HRV9SRVNFVCA6ICdTVEVQX0NIQU5HRV9SRVNFVCcsXG4gICAgR09fVE9fU1RFUDogJ0dPX1RPX1NURVAnLFxuICAgIEdPX1RPX05FWFRfU1RFUDogJ0dPX1RPX05FWFRfU1RFUCcsXG4gICAgR09fVE9fUFJFVklPVVNfU1RFUDogJ0dPX1RPX1BSRVZJT1VTX1NURVAnLFxuICAgIEFERF9ORVcgOiAnQUREX05FVycsXG4gICAgUkVNT1ZFX05FVyA6ICdSRU1PVkVfTkVXJyxcbiAgICBTVVBFUl9SSUdIVFNfVVBEQVRFRDogJ1NVUEVSX1JJR0hUU19VUERBVEVEJyxcbiAgICBVUERBVEVfQ09OVEVOVF9WQUxVRSA6ICdVUERBVEVfQ09OVEVOVF9WQUxVRScsXG4gICAgU0VMRUNUX1RPVVJOQU1FTlQgOiAnU0VMRUNUX1RPVVJOQU1FTlQnLFxuICAgIFJFTU9WRV9GUk9NX01VTFRJUExFIDogJ1JFTU9WRV9GUk9NX01VTFRJUExFJyxcbiAgICBVUERBVEVfRlJPTV9NVUxUSVBMRSA6ICdVUERBVEVfRlJPTV9NVUxUSVBMRScsXG4gICAgQVBQTFlfU0VMRUNUSU9OIDogJ0FQUExZX1NFTEVDVElPTicsXG4gICAgVVBEQVRFX1NBTEVTX1BBQ0tBR0VTIDogJ1VQREFURV9TQUxFU19QQUNLQUdFUycsXG4gICAgVVBEQVRFX0FUVEFDSE1FTlRTIDogJ1VQREFURV9BVFRBQ0hNRU5UUycsXG4gICAgVVBEQVRFX0FOTkVYIDogJ1VQREFURV9BTk5FWCcsXG4gICAgQUREX1NBTEVTX1BBQ0tBR0VTIDogJ0FERF9TQUxFU19QQUNLQUdFUycsXG4gICAgUkVTRVQgOiAnUkVTRVQnLFxuICAgIEFMTF9FUElTT0RFX1VQREFURV9GTEFHOiAnVVBEQVRFX0FMTF9FUElTT0RFU19GTEFHJ1xufTtcblxuZXhwb3J0IGNvbnN0IEVtcHR5TGlzdGluZyA9IHtcbiAgICBzdGVwOiAxLFxuICAgIG1heFN0ZXA6IDEsXG4gICAgcmlnaHRzUGFja2FnZSA6IFtdLFxuICAgIHRvdXJuYW1lbnQgOiBbXSxcbiAgICBzcG9ydENhdGVnb3J5IDogW10sXG4gICAgc3BvcnRzIDogW10sXG4gICAgc2Vhc29uczogW10sXG4gICAgY3VzdG9tU2Vhc29ucyA6IFtdLFxuICAgIHNhbGVzUGFja2FnZXMgOiBbXSxcbiAgICBjdXN0b21Ub3VybmFtZW50IDogbnVsbCxcbiAgICBjdXN0b21DYXRlZ29yeSA6IG51bGwsXG4gICAgZGVzY3JpcHRpb246ICcnLFxuICAgIHByb2dyYW1EZXNjcmlwdGlvbiA6IG51bGwsXG4gICAgYXR0YWNobWVudHMgOiBbXSxcbiAgICBhbm5leCA6IFtdLFxuICAgIGVuZERhdGVMaW1pdCA6IDMwLFxuICAgIGNvdW50ZXIgOiAwLFxuICAgIGN1cnJlbmN5IDogXCJFVVJcIixcbiAgICBzdGFydERhdGVNb2RlIDogXCJMSUNFTlNFXCIsXG4gICAgc3RlcENoYW5nZSA6IGZhbHNlLFxuICAgIHZhdCA6IFwibm9cIixcbiAgICBOQV9JTlBVVCA6IDkwLFxuICAgIEhMX0lOUFVUIDogNSxcbiAgICBMSUNFTlNFRF9MQU5HVUFHRVMgOiBbYWxsVmFsdWVdLFxuICAgIFBST0dSQU1fTEFOR1VBR0UgOiBbXSxcbiAgICBQUk9HUkFNX1NVQlRJVExFUyA6IFtdLFxuICAgIFBST0dSQU1fU0NSSVBUIDogW10sXG4gICAgRURJVF9QUk9HUkFNX0RFU0NSSVBUSU9OX09QVElPTkFMOiB0cnVlLFxuICAgIHdlYnNpdGUgOiBudWxsLFxuICAgIGxhdyA6IFwiRW5nbGlzaFwiLFxuICAgIGltYWdlIDogbnVsbCxcbiAgICBpbWFnZUJhc2U2NCA6IG51bGwsXG4gICAgdGVtcERhdGE6IHt9XG59O1xuXG5leHBvcnQgY29uc3QgY29udGVudCA9IChzdGF0ZSA9IEVtcHR5TGlzdGluZywgYWN0aW9uKSA9PiB7XG5cbiAgICBsZXQgbmV3U3RhdGUgPSB7fTtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5SRVNFVDpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgRW1wdHlMaXN0aW5nKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5DT05URU5UX0lOSVQ6XG4gICAgICAgICAgICBhY3Rpb24uY29udGVudC5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5jb250ZW50LCB7bWF4U3RlcDogbWF4KFthY3Rpb24uY29udGVudC5tYXhTdGVwLCBzdGF0ZS5tYXhTdGVwXSl9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5BTExfRVBJU09ERV9VUERBVEVfRkxBRzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge0VESVRfUFJPR1JBTV9ERVNDUklQVElPTl9PUFRJT05BTDogYWN0aW9uLnBheWxvYWR9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5HT19UT19ORVhUX1NURVA6XG4gICAgICAgICAgICBjb25zdCBuZXdTdGVwID0gc3RhdGUuc3RlcCArIDE7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzdGVwOiBuZXdTdGVwLFxuICAgICAgICAgICAgICAgIHN0ZXBDaGFuZ2U6IHRydWUsXG4gICAgICAgICAgICAgICAgbWF4U3RlcDogbWF4KFtuZXdTdGVwLCBzdGF0ZS5tYXhTdGVwXSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkdPX1RPX1NURVA6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzdGVwOiBhY3Rpb24uc3RlcCxcbiAgICAgICAgICAgICAgICBzdGVwQ2hhbmdlIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXhTdGVwOiBtYXgoW2FjdGlvbi5zdGVwLCBzdGF0ZS5tYXhTdGVwXSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlNURVBfQ0hBTkdFX1JFU0VUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3RlcENoYW5nZSA6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5HT19UT19QUkVWSU9VU19TVEVQOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3RlcDogc3RhdGUuc3RlcCAtMSxcbiAgICAgICAgICAgICAgICBzdGVwQ2hhbmdlIDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuUkVNT1ZFX05FVzpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXS5zcGxpY2UoYWN0aW9uLmluZGV4LCAxKTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQUREX05FVzpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXVthY3Rpb24uaW5kZXhdID0ge1xuICAgICAgICAgICAgICAgIGN1c3RvbSA6IHRydWUsXG4gICAgICAgICAgICAgICAgbmFtZTogXCJcIlxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24uY2xlYW4gKXtcbiAgICAgICAgICAgICAgICBhY3Rpb24uY2xlYW4uZm9yRWFjaCgoc2VsZWN0b3JUeXBlKT0+e1xuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZVtzZWxlY3RvclR5cGVdID0gJC5pc0FycmF5KHN0YXRlW3NlbGVjdG9yVHlwZV0pID8gW10gOiBudWxsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5VUERBVEVfQ09OVEVOVF9WQUxVRTpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24ua2V5XSA9IGFjdGlvbi52YWx1ZTtcbiAgICAgICAgICAgIG5ld1N0YXRlLmxpc3RpbmdFZGl0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5TRUxFQ1RfVE9VUk5BTUVOVDpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZS50b3VybmFtZW50ID0gW2FjdGlvbi50b3VybmFtZW50XTtcbiAgICAgICAgICAgIG5ld1N0YXRlLnNwb3J0cyA9IChhY3Rpb24udG91cm5hbWVudC5zcG9ydCApID8gW2FjdGlvbi50b3VybmFtZW50LnNwb3J0XSA6IFtdO1xuICAgICAgICAgICAgbmV3U3RhdGUuc3BvcnRDYXRlZ29yeSA9IFthY3Rpb24udG91cm5hbWVudC5zcG9ydENhdGVnb3J5XTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQVBQTFlfU0VMRUNUSU9OOlxuXG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xuXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtcyA9IEFycmF5LmZyb20oIGFjdGlvbi5zZWxlY3RlZEl0ZW1zLnZhbHVlcygpICk7XG5cbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gWy4uLnN0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdXTtcblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubXVsdGlwbGUgKXtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IHNlbGVjdGVkSXRlbXM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdW2FjdGlvbi5pbmRleF0gPSBzZWxlY3RlZEl0ZW1zWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5jbGVhbiApe1xuICAgICAgICAgICAgICAgIGFjdGlvbi5jbGVhbi5mb3JFYWNoKChzZWxlY3RvclR5cGUpPT57XG4gICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlW3NlbGVjdG9yVHlwZV0gPSAkLmlzQXJyYXkoc3RhdGVbc2VsZWN0b3JUeXBlXSkgPyBbXSA6IG51bGw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlJFTU9WRV9GUk9NX01VTFRJUExFOlxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gWy4uLnN0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdXTtcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdLnNwbGljZShhY3Rpb24uaW5kZXgsMSk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5VUERBVEVfRlJPTV9NVUxUSVBMRTpcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXVthY3Rpb24uaW5kZXhdW2FjdGlvbi5rZXldID0gYWN0aW9uLnZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuU1VQRVJfUklHSFRTX1VQREFURUQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlIDogQXJyYXkuZnJvbShhY3Rpb24ucmlnaHRzUGFja2FnZS52YWx1ZXMoKSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9TQUxFU19QQUNLQUdFUzpcblxuICAgICAgICAgICAgbGV0IHNhbGVzUGFja2FnZXMgPSBbLi4uc3RhdGUuc2FsZXNQYWNrYWdlc107XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlXCIgKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHNhbGVzUGFja2FnZXMubGVuZ3RoID49IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMuc3BsaWNlKGFjdGlvbi5pbmRleCwxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVBbGxcIiApIHtcbiAgICAgICAgICAgICAgICBzYWxlc1BhY2thZ2VzID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwic2F2ZVwiICkgc2FsZXNQYWNrYWdlc1thY3Rpb24uaW5kZXhdID0gYWN0aW9uLnNhbGVzUGFja2FnZTtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcyA6IHNhbGVzUGFja2FnZXNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX0FUVEFDSE1FTlRTOlxuXG4gICAgICAgICAgICBsZXQgYXR0YWNobWVudHMgPSBbLi4uc3RhdGUuYXR0YWNobWVudHNdO1xuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZVwiICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBhdHRhY2htZW50cy5sZW5ndGggPj0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNobWVudHMuc3BsaWNlKGFjdGlvbi5pbmRleCwxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVBbGxcIiApIHtcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50cyA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInNhdmVcIiApIGF0dGFjaG1lbnRzW2FjdGlvbi5pbmRleF0gPSBhY3Rpb24udmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRzIDogYXR0YWNobWVudHNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX0FOTkVYOlxuXG4gICAgICAgICAgICBsZXQgYW5uZXggPSBbLi4uc3RhdGUuYW5uZXhdO1xuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInJlbW92ZVwiICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBhbm5leC5sZW5ndGggPj0gMSApIHtcbiAgICAgICAgICAgICAgICAgICAgYW5uZXguc3BsaWNlKGFjdGlvbi5pbmRleCwxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBhY3Rpb24ubmFtZSA9PT0gXCJyZW1vdmVBbGxcIiApIHtcbiAgICAgICAgICAgICAgICBhbm5leCA9IFtdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInNhdmVcIiApIGFubmV4W2FjdGlvbi5pbmRleF0gPSBhY3Rpb24udmFsdWU7XG5cbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGFubmV4IDogYW5uZXhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQUREX1NBTEVTX1BBQ0tBR0VTOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcyA6IFsuLi5zdGF0ZS5zYWxlc1BhY2thZ2VzLC4uLmFjdGlvbi5zYWxlc1BhY2thZ2VzXVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvY29udGVudC5qcyIsImV4cG9ydCBjb25zdCBzZWxlY3RvclR5cGU9IHtcbiAgICBURVNUOidURVNUJyxcbiAgICBPUEVOX1NFTEVDVE9SOiAnT1BFTl9TRUxFQ1RPUicsXG4gICAgQ0xPU0VfU0VMRUNUT1IgOiAnQ0xPU0VfU0VMRUNUT1InLFxuICAgIEFQUExZX1NFTEVDVElPTiA6ICdBUFBMWV9TRUxFQ1RJT04nXG59O1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0b3IgPSAoc3RhdGUgPSB7XG4gICAgdHlwZTogXCJzcG9ydFwiLFxuICAgIG9wZW4gOiBmYWxzZSxcbiAgICBzZWxlY3Rvckl0ZW1zOiBbXSxcbiAgICBwb3B1bGFySXRlbXM6IFtdXG5cbn0sIGFjdGlvbikgPT4ge1xuXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgICBjYXNlIHNlbGVjdG9yVHlwZS5URVNUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgb3BlbjogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLk9QRU5fU0VMRUNUT1I6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvclR5cGU6IGFjdGlvbi5zZWxlY3RvclR5cGUsXG4gICAgICAgICAgICAgICAgb3BlbiA6IHRydWUsXG4gICAgICAgICAgICAgICAgaW5kZXggOiBhY3Rpb24uaW5kZXgsXG4gICAgICAgICAgICAgICAgc2VsZWN0b3JJdGVtczogYWN0aW9uLnNlbGVjdG9ySXRlbXMsXG4gICAgICAgICAgICAgICAgcG9wdWxhckl0ZW1zOiBhY3Rpb24ucG9wdWxhckl0ZW1zLFxuICAgICAgICAgICAgICAgIGFjdGl2ZUZpbHRlciA6IGFjdGlvbi5hY3RpdmVGaWx0ZXIsXG4gICAgICAgICAgICAgICAgbXVsdGlwbGUgOiBhY3Rpb24ubXVsdGlwbGUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGFjdGlvbi5kaXNhYmxlZCxcbiAgICAgICAgICAgICAgICBzaG93TmV3U3BvcnQgOiBhY3Rpb24uc2hvd05ld1Nwb3J0LFxuICAgICAgICAgICAgICAgIHNob3dOZXdUb3VybmFtZW50IDogYWN0aW9uLnNob3dOZXdUb3VybmFtZW50LFxuICAgICAgICAgICAgICAgIHNob3dOZXdDYXRlZ29yeSA6IGFjdGlvbi5zaG93TmV3Q2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgc2hvd05ld1NlYXNvbiA6IGFjdGlvbi5zaG93TmV3U2Vhc29uLFxuICAgICAgICAgICAgICAgIHNob3dBbGxDb3VudHJpZXM6IGFjdGlvbi5zaG93QWxsQ291bnRyaWVzLFxuICAgICAgICAgICAgICAgIGNsZWFuIDogYWN0aW9uLmNsZWFuLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM6IGFjdGlvbi5zZWxlY3RlZEl0ZW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBzZWxlY3RvclR5cGUuQ0xPU0VfU0VMRUNUT1I6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvclR5cGU6IFwiXCIsXG4gICAgICAgICAgICAgICAgb3BlbiA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxuICAgICAgICAgICAgICAgIHBvcHVsYXJJdGVtczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIHNlbGVjdG9yVHlwZS5BUFBMWV9TRUxFQ1RJT04gOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcIlwiLFxuICAgICAgICAgICAgICAgIG9wZW4gOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBbXSxcbiAgICAgICAgICAgICAgICBwb3B1bGFySXRlbXM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvcmVkdWNlcnMvc2VsZWN0b3IuanMiXSwic291cmNlUm9vdCI6IiJ9