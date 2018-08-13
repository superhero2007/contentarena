webpackJsonp([3],{

/***/ "./node_modules/react-input-autosize/lib/AutosizeInput.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-input-autosize/lib/AutosizeInput.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizerStyle = {
	position: 'absolute',
	top: 0,
	left: 0,
	visibility: 'hidden',
	height: 0,
	overflow: 'scroll',
	whiteSpace: 'pre'
};

var INPUT_PROPS_BLACKLIST = ['extraWidth', 'injectStyles', 'inputClassName', 'inputRef', 'inputStyle', 'minWidth', 'onAutosize', 'placeholderIsMinWidth'];

var cleanInputProps = function cleanInputProps(inputProps) {
	INPUT_PROPS_BLACKLIST.forEach(function (field) {
		return delete inputProps[field];
	});
	return inputProps;
};

var copyStyles = function copyStyles(styles, node) {
	node.style.fontSize = styles.fontSize;
	node.style.fontFamily = styles.fontFamily;
	node.style.fontWeight = styles.fontWeight;
	node.style.fontStyle = styles.fontStyle;
	node.style.letterSpacing = styles.letterSpacing;
	node.style.textTransform = styles.textTransform;
};

var isIE = typeof window !== 'undefined' && window.navigator ? /MSIE |Trident\/|Edge\//.test(window.navigator.userAgent) : false;

var generateId = function generateId() {
	// we only need an auto-generated ID for stylesheet injection, which is only
	// used for IE. so if the browser is not IE, this should return undefined.
	return isIE ? '_' + Math.random().toString(36).substr(2, 12) : undefined;
};

var AutosizeInput = function (_Component) {
	_inherits(AutosizeInput, _Component);

	function AutosizeInput(props) {
		_classCallCheck(this, AutosizeInput);

		var _this = _possibleConstructorReturn(this, (AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call(this, props));

		_this.inputRef = function (el) {
			_this.input = el;
			if (typeof _this.props.inputRef === 'function') {
				_this.props.inputRef(el);
			}
		};

		_this.placeHolderSizerRef = function (el) {
			_this.placeHolderSizer = el;
		};

		_this.sizerRef = function (el) {
			_this.sizer = el;
		};

		_this.state = {
			inputWidth: props.minWidth,
			inputId: props.id || generateId()
		};
		return _this;
	}

	_createClass(AutosizeInput, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.mounted = true;
			this.copyInputStyles();
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var id = nextProps.id;

			if (id !== this.props.id) {
				this.setState({ inputId: id || generateId() });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			if (prevState.inputWidth !== this.state.inputWidth) {
				if (typeof this.props.onAutosize === 'function') {
					this.props.onAutosize(this.state.inputWidth);
				}
			}
			this.updateInputWidth();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
		}
	}, {
		key: 'copyInputStyles',
		value: function copyInputStyles() {
			if (!this.mounted || !window.getComputedStyle) {
				return;
			}
			var inputStyles = this.input && window.getComputedStyle(this.input);
			if (!inputStyles) {
				return;
			}
			copyStyles(inputStyles, this.sizer);
			if (this.placeHolderSizer) {
				copyStyles(inputStyles, this.placeHolderSizer);
			}
		}
	}, {
		key: 'updateInputWidth',
		value: function updateInputWidth() {
			if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = void 0;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.sizer.scrollWidth, this.placeHolderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.sizer.scrollWidth + 2;
			}
			// add extraWidth to the detected width. for number types, this defaults to 16 to allow for the stepper UI
			var extraWidth = this.props.type === 'number' && this.props.extraWidth === undefined ? 16 : parseInt(this.props.extraWidth) || 0;
			newInputWidth += extraWidth;
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		}
	}, {
		key: 'getInput',
		value: function getInput() {
			return this.input;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.input.focus();
		}
	}, {
		key: 'blur',
		value: function blur() {
			this.input.blur();
		}
	}, {
		key: 'select',
		value: function select() {
			this.input.select();
		}
	}, {
		key: 'renderStyles',
		value: function renderStyles() {
			// this method injects styles to hide IE's clear indicator, which messes
			// with input size detection. the stylesheet is only injected when the
			// browser is IE, and can also be disabled by the `injectStyles` prop.
			var injectStyles = this.props.injectStyles;

			return isIE && injectStyles ? _react2.default.createElement('style', { dangerouslySetInnerHTML: {
					__html: 'input#' + this.state.inputId + '::-ms-clear {display: none;}'
				} }) : null;
		}
	}, {
		key: 'render',
		value: function render() {
			var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
				if (previousValue !== null && previousValue !== undefined) {
					return previousValue;
				}
				return currentValue;
			});

			var wrapperStyle = _extends({}, this.props.style);
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';

			var inputStyle = _extends({
				boxSizing: 'content-box',
				width: this.state.inputWidth + 'px'
			}, this.props.inputStyle);

			var inputProps = _objectWithoutProperties(this.props, []);

			cleanInputProps(inputProps);
			inputProps.className = this.props.inputClassName;
			inputProps.id = this.state.inputId;
			inputProps.style = inputStyle;

			return _react2.default.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				this.renderStyles(),
				_react2.default.createElement('input', _extends({}, inputProps, { ref: this.inputRef })),
				_react2.default.createElement(
					'div',
					{ ref: this.sizerRef, style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? _react2.default.createElement(
					'div',
					{ ref: this.placeHolderSizerRef, style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	}]);

	return AutosizeInput;
}(_react.Component);

AutosizeInput.propTypes = {
	className: _propTypes2.default.string, // className for the outer element
	defaultValue: _propTypes2.default.any, // default field value
	extraWidth: _propTypes2.default.oneOfType([// additional width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	id: _propTypes2.default.string, // id to use for the input, can be set for consistent snapshots
	injectStyles: _propTypes2.default.bool, // inject the custom stylesheet to hide clear UI, defaults to true
	inputClassName: _propTypes2.default.string, // className for the input element
	inputRef: _propTypes2.default.func, // ref callback for the input element
	inputStyle: _propTypes2.default.object, // css styles for the input element
	minWidth: _propTypes2.default.oneOfType([// minimum width for input element
	_propTypes2.default.number, _propTypes2.default.string]),
	onAutosize: _propTypes2.default.func, // onAutosize handler: function(newWidth) {}
	onChange: _propTypes2.default.func, // onChange handler: function(event) {}
	placeholder: _propTypes2.default.string, // placeholder text
	placeholderIsMinWidth: _propTypes2.default.bool, // don't collapse size to less than the placeholder
	style: _propTypes2.default.object, // css styles for the outer element
	value: _propTypes2.default.any // field value
};
AutosizeInput.defaultProps = {
	minWidth: 1,
	injectStyles: true
};

exports.default = AutosizeInput;

/***/ }),

/***/ "./node_modules/react-select/dist/react-select.es.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-select/dist/react-select.es.js ***!
  \***********************************************************/
/*! exports provided: Async, AsyncCreatable, Creatable, Value, Option, defaultMenuRenderer, defaultArrowRenderer, defaultClearRenderer, defaultFilterOptions, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Async */
/* unused harmony export AsyncCreatable */
/* unused harmony export Creatable */
/* unused harmony export Value */
/* unused harmony export Option */
/* unused harmony export defaultMenuRenderer */
/* unused harmony export defaultArrowRenderer */
/* unused harmony export defaultClearRenderer */
/* unused harmony export defaultFilterOptions */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_input_autosize__ = __webpack_require__(/*! react-input-autosize */ "./node_modules/react-input-autosize/lib/AutosizeInput.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_input_autosize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_input_autosize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_dom__);






var arrowRenderer = function arrowRenderer(_ref) {
	var onMouseDown = _ref.onMouseDown;

	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span', {
		className: 'Select-arrow',
		onMouseDown: onMouseDown
	});
};

arrowRenderer.propTypes = {
	onMouseDown: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func
};

var clearRenderer = function clearRenderer() {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span', {
		className: 'Select-clear',
		dangerouslySetInnerHTML: { __html: '&times;' }
	});
};

var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];

var stripDiacritics = function stripDiacritics(str) {
	for (var i = 0; i < map.length; i++) {
		str = str.replace(map[i].letters, map[i].base);
	}
	return str;
};

var trim = function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
};

var isValid = function isValid(value) {
	return typeof value !== 'undefined' && value !== null && value !== '';
};

var filterOptions = function filterOptions(options, filterValue, excludeOptions, props) {
	if (props.ignoreAccents) {
		filterValue = stripDiacritics(filterValue);
	}

	if (props.ignoreCase) {
		filterValue = filterValue.toLowerCase();
	}

	if (props.trimFilter) {
		filterValue = trim(filterValue);
	}

	if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
		return i[props.valueKey];
	});

	return options.filter(function (option) {
		if (excludeOptions && excludeOptions.indexOf(option[props.valueKey]) > -1) return false;
		if (props.filterOption) return props.filterOption.call(undefined, option, filterValue);
		if (!filterValue) return true;

		var value = option[props.valueKey];
		var label = option[props.labelKey];
		var hasValue = isValid(value);
		var hasLabel = isValid(label);

		if (!hasValue && !hasLabel) {
			return false;
		}

		var valueTest = hasValue ? String(value) : null;
		var labelTest = hasLabel ? String(label) : null;

		if (props.ignoreAccents) {
			if (valueTest && props.matchProp !== 'label') valueTest = stripDiacritics(valueTest);
			if (labelTest && props.matchProp !== 'value') labelTest = stripDiacritics(labelTest);
		}

		if (props.ignoreCase) {
			if (valueTest && props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
			if (labelTest && props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
		}

		return props.matchPos === 'start' ? valueTest && props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || labelTest && props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : valueTest && props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || labelTest && props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
	});
};

var menuRenderer = function menuRenderer(_ref) {
	var focusedOption = _ref.focusedOption,
	    focusOption = _ref.focusOption,
	    inputValue = _ref.inputValue,
	    instancePrefix = _ref.instancePrefix,
	    onFocus = _ref.onFocus,
	    onOptionRef = _ref.onOptionRef,
	    onSelect = _ref.onSelect,
	    optionClassName = _ref.optionClassName,
	    optionComponent = _ref.optionComponent,
	    optionRenderer = _ref.optionRenderer,
	    options = _ref.options,
	    removeValue = _ref.removeValue,
	    selectValue = _ref.selectValue,
	    valueArray = _ref.valueArray,
	    valueKey = _ref.valueKey;

	var Option = optionComponent;

	return options.map(function (option, i) {
		var isSelected = valueArray && valueArray.some(function (x) {
			return x[valueKey] === option[valueKey];
		});
		var isFocused = option === focusedOption;
		var optionClass = __WEBPACK_IMPORTED_MODULE_1_classnames___default()(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled
		});

		return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
			Option,
			{
				className: optionClass,
				focusOption: focusOption,
				inputValue: inputValue,
				instancePrefix: instancePrefix,
				isDisabled: option.disabled,
				isFocused: isFocused,
				isSelected: isSelected,
				key: 'option-' + i + '-' + option[valueKey],
				onFocus: onFocus,
				onSelect: onSelect,
				option: option,
				optionIndex: i,
				ref: function ref(_ref2) {
					onOptionRef(_ref2, isFocused);
				},
				removeValue: removeValue,
				selectValue: selectValue
			},
			optionRenderer(option, i, inputValue)
		);
	});
};

menuRenderer.propTypes = {
	focusOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	focusedOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object,
	inputValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
	instancePrefix: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
	onFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	onOptionRef: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	onSelect: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	optionClassName: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string,
	optionComponent: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	optionRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array,
	removeValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	selectValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
	valueArray: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array,
	valueKey: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string
};

var blockEvent = (function (event) {
	event.preventDefault();
	event.stopPropagation();
	if (event.target.tagName !== 'A' || !('href' in event.target)) {
		return;
	}
	if (event.target.target) {
		window.open(event.target.href, event.target.target);
	} else {
		window.location.href = event.target.href;
	}
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Option = function (_React$Component) {
	inherits(Option, _React$Component);

	function Option(props) {
		classCallCheck(this, Option);

		var _this = possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.handleMouseEnter = _this.handleMouseEnter.bind(_this);
		_this.handleMouseMove = _this.handleMouseMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		_this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.onFocus = _this.onFocus.bind(_this);
		return _this;
	}

	createClass(Option, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		}
	}, {
		key: 'handleMouseEnter',
		value: function handleMouseEnter(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleMouseMove',
		value: function handleMouseMove(event) {
			this.onFocus(event);
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'onFocus',
		value: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    option = _props.option,
			    instancePrefix = _props.instancePrefix,
			    optionIndex = _props.optionIndex;

			var className = __WEBPACK_IMPORTED_MODULE_1_classnames___default()(this.props.className, option.className);

			return option.disabled ? __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: className,
					onMouseDown: blockEvent,
					onClick: blockEvent },
				this.props.children
			) : __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: className,
					style: option.style,
					role: 'option',
					'aria-label': option.label,
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	}]);
	return Option;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

Option.propTypes = {
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node,
	className: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // className (based on mouse position)
	instancePrefix: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string.isRequired, // unique prefix for the ids (used for aria)
	isDisabled: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // the option is disabled
	isFocused: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // the option is focused
	isSelected: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // the option is selected
	onFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle mouseEnter on option element
	onSelect: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle click on option element
	onUnfocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle mouseLeave on option element
	option: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired, // object that is base for that option
	optionIndex: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number // index of the option, used to generate unique ids for aria
};

var Value = function (_React$Component) {
	inherits(Value, _React$Component);

	function Value(props) {
		classCallCheck(this, Value);

		var _this = possibleConstructorReturn(this, (Value.__proto__ || Object.getPrototypeOf(Value)).call(this, props));

		_this.handleMouseDown = _this.handleMouseDown.bind(_this);
		_this.onRemove = _this.onRemove.bind(_this);
		_this.handleTouchEndRemove = _this.handleTouchEndRemove.bind(_this);
		_this.handleTouchMove = _this.handleTouchMove.bind(_this);
		_this.handleTouchStart = _this.handleTouchStart.bind(_this);
		return _this;
	}

	createClass(Value, [{
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			if (event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			if (this.props.onClick) {
				event.stopPropagation();
				this.props.onClick(this.props.value, event);
				return;
			}
			if (this.props.value.href) {
				event.stopPropagation();
			}
		}
	}, {
		key: 'onRemove',
		value: function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRemove(this.props.value);
		}
	}, {
		key: 'handleTouchEndRemove',
		value: function handleTouchEndRemove(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.onRemove(event);
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'renderRemoveIcon',
		value: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{ className: 'Select-value-icon',
					'aria-hidden': 'true',
					onMouseDown: this.onRemove,
					onTouchEnd: this.handleTouchEndRemove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove },
				'\xD7'
			);
		}
	}, {
		key: 'renderLabel',
		value: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'a',
				{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.props.children
			) : __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
				this.props.children
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: __WEBPACK_IMPORTED_MODULE_1_classnames___default()('Select-value', this.props.value.className),
					style: this.props.value.style,
					title: this.props.value.title
				},
				this.renderRemoveIcon(),
				this.renderLabel()
			);
		}
	}]);
	return Value;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

Value.propTypes = {
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node,
	disabled: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // disabled prop passed to ReactSelect
	id: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // Unique id for the value - used for aria
	onClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle click on value label
	onRemove: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to handle removal of the value
	value: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object.isRequired // the option object for this value
};

/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/react-select
*/
var stringifyValue = function stringifyValue(value) {
	return typeof value === 'string' ? value : value !== null && JSON.stringify(value) || '';
};

var stringOrNode = __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]);
var stringOrNumber = __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number]);

var instanceId = 1;

var shouldShowValue = function shouldShowValue(state, props) {
	var inputValue = state.inputValue,
	    isPseudoFocused = state.isPseudoFocused,
	    isFocused = state.isFocused;
	var onSelectResetsInput = props.onSelectResetsInput;


	if (!inputValue) return true;

	if (!onSelectResetsInput) {
		return !(!isFocused && isPseudoFocused || isFocused && !isPseudoFocused);
	}

	return false;
};

var shouldShowPlaceholder = function shouldShowPlaceholder(state, props, isOpen) {
	var inputValue = state.inputValue,
	    isPseudoFocused = state.isPseudoFocused,
	    isFocused = state.isFocused;
	var onSelectResetsInput = props.onSelectResetsInput;


	return !inputValue || !onSelectResetsInput && !isOpen && !isPseudoFocused && !isFocused;
};

/**
 * Retrieve a value from the given options and valueKey
 * @param {String|Number|Array} value	- the selected value(s)
 * @param {Object}		 props	- the Select component's props (or nextProps)
 */
var expandValue = function expandValue(value, props) {
	var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	if (valueType !== 'string' && valueType !== 'number' && valueType !== 'boolean') return value;
	var options = props.options,
	    valueKey = props.valueKey;

	if (!options) return;
	for (var i = 0; i < options.length; i++) {
		if (String(options[i][valueKey]) === String(value)) return options[i];
	}
};

var handleRequired = function handleRequired(value, multi) {
	if (!value) return true;
	return multi ? value.length === 0 : Object.keys(value).length === 0;
};

var Select$1 = function (_React$Component) {
	inherits(Select, _React$Component);

	function Select(props) {
		classCallCheck(this, Select);

		var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

		['clearValue', 'focusOption', 'getOptionLabel', 'handleInputBlur', 'handleInputChange', 'handleInputFocus', 'handleInputValueChange', 'handleKeyDown', 'handleMenuScroll', 'handleMouseDown', 'handleMouseDownOnArrow', 'handleMouseDownOnMenu', 'handleTouchEnd', 'handleTouchEndClearValue', 'handleTouchMove', 'handleTouchOutside', 'handleTouchStart', 'handleValueClick', 'onOptionRef', 'removeValue', 'selectValue'].forEach(function (fn) {
			return _this[fn] = _this[fn].bind(_this);
		});

		_this.state = {
			inputValue: '',
			isFocused: false,
			isOpen: false,
			isPseudoFocused: false,
			required: false
		};
		return _this;
	}

	createClass(Select, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this._instancePrefix = 'react-select-' + (this.props.instanceId || ++instanceId) + '-';
			var valueArray = this.getValueArray(this.props.value);

			if (this.props.required) {
				this.setState({
					required: handleRequired(valueArray[0], this.props.multi)
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (typeof this.props.autofocus !== 'undefined' && typeof console !== 'undefined') {
				console.warn('Warning: The autofocus prop has changed to autoFocus, support will be removed after react-select@1.0');
			}
			if (this.props.autoFocus || this.props.autofocus) {
				this.focus();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var valueArray = this.getValueArray(nextProps.value, nextProps);

			if (nextProps.required) {
				this.setState({
					required: handleRequired(valueArray[0], nextProps.multi)
				});
			} else if (this.props.required) {
				// Used to be required but it's not any more
				this.setState({ required: false });
			}

			if (this.state.inputValue && this.props.value !== nextProps.value && nextProps.onSelectResetsInput) {
				this.setState({ inputValue: this.handleInputValueChange('') });
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.menu && this.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.focused);
				var menuNode = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.menu);

				var scrollTop = menuNode.scrollTop;
				var scrollBottom = scrollTop + menuNode.offsetHeight;
				var optionTop = focusedOptionNode.offsetTop;
				var optionBottom = optionTop + focusedOptionNode.offsetHeight;

				if (scrollTop > optionTop || scrollBottom < optionBottom) {
					menuNode.scrollTop = focusedOptionNode.offsetTop;
				}

				// We still set hasScrolledToOption to true even if we didn't
				// actually need to scroll, as we've still confirmed that the
				// option is in view.
				this.hasScrolledToOption = true;
			} else if (!this.state.isOpen) {
				this.hasScrolledToOption = false;
			}

			if (this._scrollToFocusedOptionOnUpdate && this.focused && this.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.focused);
				var menuDOM = Object(__WEBPACK_IMPORTED_MODULE_4_react_dom__["findDOMNode"])(this.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				} else if (focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop;
				}
			}
			if (this.props.scrollMenuIntoView && this.menuContainer) {
				var menuContainerRect = this.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
			if (prevState.isOpen !== this.state.isOpen) {
				this.toggleTouchOutsideEvent(this.state.isOpen);
				var handler = this.state.isOpen ? this.props.onOpen : this.props.onClose;
				handler && handler();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.toggleTouchOutsideEvent(false);
		}
	}, {
		key: 'toggleTouchOutsideEvent',
		value: function toggleTouchOutsideEvent(enabled) {
			if (enabled) {
				if (!document.addEventListener && document.attachEvent) {
					document.attachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.addEventListener('touchstart', this.handleTouchOutside);
				}
			} else {
				if (!document.removeEventListener && document.detachEvent) {
					document.detachEvent('ontouchstart', this.handleTouchOutside);
				} else {
					document.removeEventListener('touchstart', this.handleTouchOutside);
				}
			}
		}
	}, {
		key: 'handleTouchOutside',
		value: function handleTouchOutside(event) {
			// handle touch outside on ios to dismiss menu
			if (this.wrapper && !this.wrapper.contains(event.target)) {
				this.closeMenu();
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			if (!this.input) return;
			this.input.focus();
		}
	}, {
		key: 'blurInput',
		value: function blurInput() {
			if (!this.input) return;
			this.input.blur();
		}
	}, {
		key: 'handleTouchMove',
		value: function handleTouchMove() {
			// Set a flag that the view is being dragged
			this.dragging = true;
		}
	}, {
		key: 'handleTouchStart',
		value: function handleTouchStart() {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		}
	}, {
		key: 'handleTouchEnd',
		value: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Fire the mouse events
			this.handleMouseDown(event);
		}
	}, {
		key: 'handleTouchEndClearValue',
		value: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;

			// Clear the value
			this.clearValue(event);
		}
	}, {
		key: 'handleMouseDown',
		value: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (event.target.tagName === 'INPUT') {
				if (!this.state.isFocused) {
					this._openAfterFocus = this.props.openOnClick;
					this.focus();
				} else if (!this.state.isOpen) {
					this.setState({
						isOpen: true,
						isPseudoFocused: false
					});
				}

				return;
			}

			// prevent default event handlers
			event.preventDefault();

			// for the non-searchable select, toggle the menu
			if (!this.props.searchable) {
				// This code means that if a select is searchable, onClick the options menu will not appear, only on subsequent click will it open.
				this.focus();
				return this.setState({
					isOpen: !this.state.isOpen
				});
			}

			if (this.state.isFocused) {
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();

				var input = this.input;
				var toOpen = true;

				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <AutosizeInput /> component
					input = input.getInput();
				}

				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';

				if (this._focusAfterClear) {
					toOpen = false;
					this._focusAfterClear = false;
				}

				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: toOpen,
					isPseudoFocused: false,
					focusedOption: null
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = this.props.openOnClick;
				this.focus();
				this.setState({ focusedOption: null });
			}
		}
	}, {
		key: 'handleMouseDownOnArrow',
		value: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			if (this.state.isOpen) {
				// prevent default event handlers
				event.stopPropagation();
				event.preventDefault();
				// close the menu
				this.closeMenu();
			} else {
				// If the menu isn't open, let the event bubble to the main handleMouseDown
				this.setState({
					isOpen: true
				});
			}
		}
	}, {
		key: 'handleMouseDownOnMenu',
		value: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			event.stopPropagation();
			event.preventDefault();

			this._openAfterFocus = true;
			this.focus();
		}
	}, {
		key: 'closeMenu',
		value: function closeMenu() {
			if (this.props.onCloseResetsInput) {
				this.setState({
					inputValue: this.handleInputValueChange(''),
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi
				});
			} else {
				this.setState({
					isOpen: false,
					isPseudoFocused: this.state.isFocused && !this.props.multi
				});
			}
			this.hasScrolledToOption = false;
		}
	}, {
		key: 'handleInputFocus',
		value: function handleInputFocus(event) {
			if (this.props.disabled) return;

			var toOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
			toOpen = this._focusAfterClear ? false : toOpen; //if focus happens after clear values, don't open dropdown yet.

			if (this.props.onFocus) {
				this.props.onFocus(event);
			}

			this.setState({
				isFocused: true,
				isOpen: !!toOpen
			});

			this._focusAfterClear = false;
			this._openAfterFocus = false;
		}
	}, {
		key: 'handleInputBlur',
		value: function handleInputBlur(event) {
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			if (this.menu && (this.menu === document.activeElement || this.menu.contains(document.activeElement))) {
				this.focus();
				return;
			}

			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};
			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = this.handleInputValueChange('');
			}
			this.setState(onBlurredState);
		}
	}, {
		key: 'handleInputChange',
		value: function handleInputChange(event) {
			var newInputValue = event.target.value;

			if (this.state.inputValue !== event.target.value) {
				newInputValue = this.handleInputValueChange(newInputValue);
			}

			this.setState({
				inputValue: newInputValue,
				isOpen: true,
				isPseudoFocused: false
			});
		}
	}, {
		key: 'setInputValue',
		value: function setInputValue(newValue) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(newValue);
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newValue = '' + nextState;
				}
			}
			this.setState({
				inputValue: newValue
			});
		}
	}, {
		key: 'handleInputValueChange',
		value: function handleInputValueChange(newValue) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(newValue);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null && (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== 'object') {
					newValue = '' + nextState;
				}
			}
			return newValue;
		}
	}, {
		key: 'handleKeyDown',
		value: function handleKeyDown(event) {
			if (this.props.disabled) return;

			if (typeof this.props.onInputKeyDown === 'function') {
				this.props.onInputKeyDown(event);
				if (event.defaultPrevented) {
					return;
				}
			}

			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					break;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						break;
					}
					event.preventDefault();
					this.selectFocusedOption();
					break;
				case 13:
					// enter
					event.preventDefault();
					event.stopPropagation();
					if (this.state.isOpen) {
						this.selectFocusedOption();
					} else {
						this.focusNextOption();
					}
					break;
				case 27:
					// escape
					event.preventDefault();
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
					}
					break;
				case 32:
					// space
					if (this.props.searchable) {
						break;
					}
					event.preventDefault();
					if (!this.state.isOpen) {
						this.focusNextOption();
						break;
					}
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 38:
					// up
					event.preventDefault();
					this.focusPreviousOption();
					break;
				case 40:
					// down
					event.preventDefault();
					this.focusNextOption();
					break;
				case 33:
					// page up
					event.preventDefault();
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					event.preventDefault();
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					if (event.shiftKey) {
						break;
					}
					event.preventDefault();
					this.focusEndOption();
					break;
				case 36:
					// home key
					if (event.shiftKey) {
						break;
					}
					event.preventDefault();
					this.focusStartOption();
					break;
				case 46:
					// delete
					if (!this.state.inputValue && this.props.deleteRemoves) {
						event.preventDefault();
						this.popValue();
					}
					break;
			}
		}
	}, {
		key: 'handleValueClick',
		value: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		}
	}, {
		key: 'handleMenuScroll',
		value: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;

			if (target.scrollHeight > target.offsetHeight && target.scrollHeight - target.offsetHeight - target.scrollTop <= 0) {
				this.props.onMenuScrollToBottom();
			}
		}
	}, {
		key: 'getOptionLabel',
		value: function getOptionLabel(op) {
			return op[this.props.labelKey];
		}

		/**
   * Turns a value into an array from the given options
   * @param {String|Number|Array} value		- the value of the select input
   * @param {Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
   * @returns	{Array}	the value of the select represented in an array
   */

	}, {
		key: 'getValueArray',
		value: function getValueArray(value) {
			var nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = (typeof nextProps === 'undefined' ? 'undefined' : _typeof(nextProps)) === 'object' ? nextProps : this.props;
			if (props.multi) {
				if (typeof value === 'string') {
					value = value.split(props.delimiter);
				}
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(function (value) {
					return expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = expandValue(value, props);
			return expandedValue ? [expandedValue] : [];
		}
	}, {
		key: 'setValue',
		value: function setValue(value) {
			var _this2 = this;

			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (this.props.required) {
				var required = handleRequired(value, this.props.multi);
				this.setState({ required: required });
			}
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(function (i) {
					return i[_this2.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];
			}
			if (this.props.onChange) {
				this.props.onChange(value);
			}
		}
	}, {
		key: 'selectValue',
		value: function selectValue(value) {
			var _this3 = this;

			// NOTE: we actually add/set the value in a callback to make sure the
			// input value is empty to avoid styling issues in Chrome
			if (this.props.closeOnSelect) {
				this.hasScrolledToOption = false;
			}
			var updatedValue = this.props.onSelectResetsInput ? '' : this.state.inputValue;
			if (this.props.multi) {
				this.setState({
					focusedIndex: null,
					inputValue: this.handleInputValueChange(updatedValue),
					isOpen: !this.props.closeOnSelect
				}, function () {
					var valueArray = _this3.getValueArray(_this3.props.value);
					if (valueArray.some(function (i) {
						return i[_this3.props.valueKey] === value[_this3.props.valueKey];
					})) {
						_this3.removeValue(value);
					} else {
						_this3.addValue(value);
					}
				});
			} else {
				this.setState({
					inputValue: this.handleInputValueChange(updatedValue),
					isOpen: !this.props.closeOnSelect,
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this3.setValue(value);
				});
			}
		}
	}, {
		key: 'addValue',
		value: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			var visibleOptions = this._visibleOptions.filter(function (val) {
				return !val.disabled;
			});
			var lastValueIndex = visibleOptions.indexOf(value);
			this.setValue(valueArray.concat(value));
			if (visibleOptions.length - 1 === lastValueIndex) {
				// the last option was selected; focus the second-last one
				this.focusOption(visibleOptions[lastValueIndex - 1]);
			} else if (visibleOptions.length > lastValueIndex) {
				// focus the option below the selected one
				this.focusOption(visibleOptions[lastValueIndex + 1]);
			}
		}
	}, {
		key: 'popValue',
		value: function popValue() {
			var valueArray = this.getValueArray(this.props.value);
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null);
		}
	}, {
		key: 'removeValue',
		value: function removeValue(value) {
			var _this4 = this;

			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.filter(function (i) {
				return i[_this4.props.valueKey] !== value[_this4.props.valueKey];
			}));
			this.focus();
		}
	}, {
		key: 'clearValue',
		value: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}

			event.preventDefault();

			this.setValue(this.getResetValue());
			this.setState({
				inputValue: this.handleInputValueChange(''),
				isOpen: false
			}, this.focus);

			this._focusAfterClear = true;
		}
	}, {
		key: 'getResetValue',
		value: function getResetValue() {
			if (this.props.resetValue !== undefined) {
				return this.props.resetValue;
			} else if (this.props.multi) {
				return [];
			} else {
				return null;
			}
		}
	}, {
		key: 'focusOption',
		value: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		}
	}, {
		key: 'focusNextOption',
		value: function focusNextOption() {
			this.focusAdjacentOption('next');
		}
	}, {
		key: 'focusPreviousOption',
		value: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		}
	}, {
		key: 'focusPageUpOption',
		value: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		}
	}, {
		key: 'focusPageDownOption',
		value: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		}
	}, {
		key: 'focusStartOption',
		value: function focusStartOption() {
			this.focusAdjacentOption('start');
		}
	}, {
		key: 'focusEndOption',
		value: function focusEndOption() {
			this.focusAdjacentOption('end');
		}
	}, {
		key: 'focusAdjacentOption',
		value: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				var newState = {
					focusedOption: this._focusedOption || (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null),
					isOpen: true
				};
				if (this.props.onSelectResetsInput) {
					newState.inputValue = '';
				}
				this.setState(newState);
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i].option) {
					focusedIndex = i;
					break;
				}
			}
			if (dir === 'next' && focusedIndex !== -1) {
				focusedIndex = (focusedIndex + 1) % options.length;
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedIndex = focusedIndex - 1;
				} else {
					focusedIndex = options.length - 1;
				}
			} else if (dir === 'start') {
				focusedIndex = 0;
			} else if (dir === 'end') {
				focusedIndex = options.length - 1;
			} else if (dir === 'page_up') {
				var potentialIndex = focusedIndex - this.props.pageSize;
				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var _potentialIndex = focusedIndex + this.props.pageSize;
				if (_potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = _potentialIndex;
				}
			}

			if (focusedIndex === -1) {
				focusedIndex = 0;
			}

			this.setState({
				focusedIndex: options[focusedIndex].index,
				focusedOption: options[focusedIndex].option
			});
		}
	}, {
		key: 'getFocusedOption',
		value: function getFocusedOption() {
			return this._focusedOption;
		}
	}, {
		key: 'selectFocusedOption',
		value: function selectFocusedOption() {
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			}
		}
	}, {
		key: 'renderLoading',
		value: function renderLoading() {
			if (!this.props.isLoading) return;
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('span', { className: 'Select-loading' })
			);
		}
	}, {
		key: 'renderValue',
		value: function renderValue(valueArray, isOpen) {
			var _this5 = this;

			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				var showPlaceholder = shouldShowPlaceholder(this.state, this.props, isOpen);
				return showPlaceholder ? __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{ className: 'Select-placeholder' },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				return valueArray.map(function (value, i) {
					return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
						ValueComponent,
						{
							disabled: _this5.props.disabled || value.clearableValue === false,
							id: _this5._instancePrefix + '-value-' + i,
							instancePrefix: _this5._instancePrefix,
							key: 'value-' + i + '-' + value[_this5.props.valueKey],
							onClick: onClick,
							onRemove: _this5.removeValue,
							placeholder: _this5.props.placeholder,
							value: value
						},
						renderLabel(value, i),
						__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
							'span',
							{ className: 'Select-aria-only' },
							'\xA0'
						)
					);
				});
			} else if (shouldShowValue(this.state, this.props)) {
				if (isOpen) onClick = null;
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					ValueComponent,
					{
						disabled: this.props.disabled,
						id: this._instancePrefix + '-value-item',
						instancePrefix: this._instancePrefix,
						onClick: onClick,
						placeholder: this.props.placeholder,
						value: valueArray[0]
					},
					renderLabel(valueArray[0])
				);
			}
		}
	}, {
		key: 'renderInput',
		value: function renderInput(valueArray, focusedOptionIndex) {
			var _classNames,
			    _this6 = this;

			var className = __WEBPACK_IMPORTED_MODULE_1_classnames___default()('Select-input', this.props.inputProps.className);
			var isOpen = this.state.isOpen;

			var ariaOwns = __WEBPACK_IMPORTED_MODULE_1_classnames___default()((_classNames = {}, defineProperty(_classNames, this._instancePrefix + '-list', isOpen), defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));

			var value = this.state.inputValue;
			if (value && !this.props.onSelectResetsInput && !this.state.isFocused) {
				// it hides input value when it is not focused and was not reset on select
				value = '';
			}

			var inputProps = _extends({}, this.props.inputProps, {
				'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
				'aria-describedby': this.props['aria-describedby'],
				'aria-expanded': '' + isOpen,
				'aria-haspopup': '' + isOpen,
				'aria-label': this.props['aria-label'],
				'aria-labelledby': this.props['aria-labelledby'],
				'aria-owns': ariaOwns,
				className: className,
				onBlur: this.handleInputBlur,
				onChange: this.handleInputChange,
				onFocus: this.handleInputFocus,
				ref: function ref(_ref) {
					return _this6.input = _ref;
				},
				role: 'combobox',
				required: this.state.required,
				tabIndex: this.props.tabIndex,
				value: value
			});

			if (this.props.inputRenderer) {
				return this.props.inputRenderer(inputProps);
			}

			if (this.props.disabled || !this.props.searchable) {
				var divProps = objectWithoutProperties(this.props.inputProps, []);


				var _ariaOwns = __WEBPACK_IMPORTED_MODULE_1_classnames___default()(defineProperty({}, this._instancePrefix + '-list', isOpen));
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('div', _extends({}, divProps, {
					'aria-expanded': isOpen,
					'aria-owns': _ariaOwns,
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					'aria-disabled': '' + this.props.disabled,
					'aria-label': this.props['aria-label'],
					'aria-labelledby': this.props['aria-labelledby'],
					className: className,
					onBlur: this.handleInputBlur,
					onFocus: this.handleInputFocus,
					ref: function ref(_ref2) {
						return _this6.input = _ref2;
					},
					role: 'combobox',
					style: { border: 0, width: 1, display: 'inline-block' },
					tabIndex: this.props.tabIndex || 0
				}));
			}

			if (this.props.autosize) {
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0_react_input_autosize___default.a, _extends({ id: this.props.id }, inputProps, { minWidth: '5' }));
			}
			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ className: className, key: 'input-wrap', style: { display: 'inline-block' } },
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('input', _extends({ id: this.props.id }, inputProps))
			);
		}
	}, {
		key: 'renderClear',
		value: function renderClear() {
			var valueArray = this.getValueArray(this.props.value);
			if (!this.props.clearable || !valueArray.length || this.props.disabled || this.props.isLoading) return;
			var ariaLabel = this.props.multi ? this.props.clearAllText : this.props.clearValueText;
			var clear = this.props.clearRenderer();

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{
					'aria-label': ariaLabel,
					className: 'Select-clear-zone',
					onMouseDown: this.clearValue,
					onTouchEnd: this.handleTouchEndClearValue,
					onTouchMove: this.handleTouchMove,
					onTouchStart: this.handleTouchStart,
					title: ariaLabel
				},
				clear
			);
		}
	}, {
		key: 'renderArrow',
		value: function renderArrow() {
			if (!this.props.arrowRenderer) return;

			var onMouseDown = this.handleMouseDownOnArrow;
			var isOpen = this.state.isOpen;
			var arrow = this.props.arrowRenderer({ onMouseDown: onMouseDown, isOpen: isOpen });

			if (!arrow) {
				return null;
			}

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'span',
				{
					className: 'Select-arrow-zone',
					onMouseDown: onMouseDown
				},
				arrow
			);
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions$$1(excludeOptions) {
			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (this.props.filterOptions) {
				// Maintain backwards compatibility with boolean attribute
				var filterOptions$$1 = typeof this.props.filterOptions === 'function' ? this.props.filterOptions : filterOptions;

				return filterOptions$$1(options, filterValue, excludeOptions, {
					filterOption: this.props.filterOption,
					ignoreAccents: this.props.ignoreAccents,
					ignoreCase: this.props.ignoreCase,
					labelKey: this.props.labelKey,
					matchPos: this.props.matchPos,
					matchProp: this.props.matchProp,
					trimFilter: this.props.trimFilter,
					valueKey: this.props.valueKey
				});
			} else {
				return options;
			}
		}
	}, {
		key: 'onOptionRef',
		value: function onOptionRef(ref, isFocused) {
			if (isFocused) {
				this.focused = ref;
			}
		}
	}, {
		key: 'renderMenu',
		value: function renderMenu(options, valueArray, focusedOption) {
			if (options && options.length) {
				return this.props.menuRenderer({
					focusedOption: focusedOption,
					focusOption: this.focusOption,
					inputValue: this.state.inputValue,
					instancePrefix: this._instancePrefix,
					labelKey: this.props.labelKey,
					onFocus: this.focusOption,
					onOptionRef: this.onOptionRef,
					onSelect: this.selectValue,
					optionClassName: this.props.optionClassName,
					optionComponent: this.props.optionComponent,
					optionRenderer: this.props.optionRenderer || this.getOptionLabel,
					options: options,
					removeValue: this.removeValue,
					selectValue: this.selectValue,
					valueArray: valueArray,
					valueKey: this.props.valueKey
				});
			} else if (this.props.noResultsText) {
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{ className: 'Select-noresults' },
					this.props.noResultsText
				);
			} else {
				return null;
			}
		}
	}, {
		key: 'renderHiddenField',
		value: function renderHiddenField(valueArray) {
			var _this7 = this;

			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this7.props.valueKey]);
				}).join(this.props.delimiter);
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('input', {
					disabled: this.props.disabled,
					name: this.props.name,
					ref: function ref(_ref3) {
						return _this7.value = _ref3;
					},
					type: 'hidden',
					value: value
				});
			}
			return valueArray.map(function (item, index) {
				return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement('input', {
					disabled: _this7.props.disabled,
					key: 'hidden.' + index,
					name: _this7.props.name,
					ref: 'value' + index,
					type: 'hidden',
					value: stringifyValue(item[_this7.props.valueKey])
				});
			});
		}
	}, {
		key: 'getFocusableOptionIndex',
		value: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return null;

			var valueKey = this.props.valueKey;
			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = -1;
				options.some(function (option, index) {
					var isOptionEqual = option[valueKey] === focusedOption[valueKey];
					if (isOptionEqual) {
						focusedOptionIndex = index;
					}
					return isOptionEqual;
				});
				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}
			}

			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return i;
			}
			return null;
		}
	}, {
		key: 'renderOuter',
		value: function renderOuter(options, valueArray, focusedOption) {
			var _this8 = this;

			var menu = this.renderMenu(options, valueArray, focusedOption);
			if (!menu) {
				return null;
			}

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ ref: function ref(_ref5) {
						return _this8.menuContainer = _ref5;
					}, className: 'Select-menu-outer', style: this.props.menuContainerStyle },
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{
						className: 'Select-menu',
						id: this._instancePrefix + '-list',
						onMouseDown: this.handleMouseDownOnMenu,
						onScroll: this.handleMenuScroll,
						ref: function ref(_ref4) {
							return _this8.menu = _ref4;
						},
						role: 'listbox',
						style: this.props.menuStyle,
						tabIndex: -1
					},
					menu
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this9 = this;

			var valueArray = this.getValueArray(this.props.value);
			var options = this._visibleOptions = this.filterOptions(this.props.multi && this.props.removeSelected ? valueArray : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

			var focusedOption = null;
			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = options[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = __WEBPACK_IMPORTED_MODULE_1_classnames___default()('Select', this.props.className, {
				'has-value': valueArray.length,
				'is-clearable': this.props.clearable,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'Select--multi': this.props.multi,
				'Select--rtl': this.props.rtl,
				'Select--single': !this.props.multi
			});

			var removeMessage = null;
			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'span',
					{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
					this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
				);
			}

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				'div',
				{ ref: function ref(_ref7) {
						return _this9.wrapper = _ref7;
					},
					className: className,
					style: this.props.wrapperStyle },
				this.renderHiddenField(valueArray),
				__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
					'div',
					{ ref: function ref(_ref6) {
							return _this9.control = _ref6;
						},
						className: 'Select-control',
						onKeyDown: this.handleKeyDown,
						onMouseDown: this.handleMouseDown,
						onTouchEnd: this.handleTouchEnd,
						onTouchMove: this.handleTouchMove,
						onTouchStart: this.handleTouchStart,
						style: this.props.style
					},
					__WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
						'span',
						{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
						this.renderValue(valueArray, isOpen),
						this.renderInput(valueArray, focusedOptionIndex)
					),
					removeMessage,
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? this.renderOuter(options, valueArray, focusedOption) : null
			);
		}
	}]);
	return Select;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

Select$1.propTypes = {
	'aria-describedby': __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // html id(s) of element(s) that should be used to describe this input (for assistive tech)
	'aria-label': __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // aria label (for assistive tech)
	'aria-labelledby': __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // html id of an element that should be used as the label (for assistive tech)
	arrowRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // create the drop-down caret element
	autoBlur: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // automatically blur the component when an option is selected
	autoFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // autofocus the component on mount
	autofocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // deprecated; use autoFocus instead
	autosize: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to enable autosizing or not
	backspaceRemoves: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether backspace removes an item if there is no text input
	backspaceToRemoveMessage: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // message to use for screenreaders to press backspace to remove the current item - {label} is replaced with the item label
	className: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // className for the outer element
	clearAllText: stringOrNode, // title for the "clear" control when multi: true
	clearRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // create clearable x element
	clearValueText: stringOrNode, // title for the "clear" control
	clearable: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // should it be possible to reset value
	closeOnSelect: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to close the menu when a value is selected
	deleteRemoves: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether delete removes an item if there is no text input
	delimiter: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // delimiter to use to join multiple values for the hidden field value
	disabled: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether the Select is disabled or not
	escapeClearsValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether escape clears the value when the menu is closed
	filterOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // method to filter a single option (option, filterString)
	filterOptions: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
	id: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // html id to set on the input element for accessibility or tests
	ignoreAccents: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to strip diacritics when filtering
	ignoreCase: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to perform case-insensitive filtering
	inputProps: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // custom attributes for the Input
	inputRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // returns a custom input component
	instanceId: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // set the components instanceId
	isLoading: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether the Select is loading externally or not (such as options being loaded)
	joinValues: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
	labelKey: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // path of the label value in option objects
	matchPos: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // (any|start) match the start or entire string when filtering
	matchProp: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // (any|label|value) which option property to filter on
	menuBuffer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
	menuContainerStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // optional style to apply to the menu container
	menuRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // renders a custom menu with options
	menuStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // optional style to apply to the menu
	multi: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // multi-value input
	name: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // generates a hidden <input /> tag with this field name for html forms
	noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
	onBlur: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onBlur handler: function (event) {}
	onBlurResetsInput: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether input is cleared on blur
	onChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onChange handler: function (newValue) {}
	onClose: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // fires when the menu is closed
	onCloseResetsInput: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether input is cleared when menu is closed through the arrow
	onFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onFocus handler: function (event) {}
	onInputChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onInputChange handler: function (inputValue) {}
	onInputKeyDown: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // input keyDown handler: function (event) {}
	onMenuScrollToBottom: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
	onOpen: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // fires when the menu is opened
	onSelectResetsInput: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether input is cleared on select (works only for multiselect)
	onValueClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onClick handler for value labels: function (value, event) {}
	openOnClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // boolean to control opening the menu when the control is clicked
	openOnFocus: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // always open options menu on focus
	optionClassName: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // additional class(es) to apply to the <Option /> elements
	optionComponent: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // option component to render in dropdown
	optionRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // optionRenderer: function (option) {}
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array, // array of options
	pageSize: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.number, // number of entries to page when using page up/down keys
	placeholder: stringOrNode, // field placeholder, displayed when there's no value
	removeSelected: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether the selected option is removed from the dropdown on multi selects
	required: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // applies HTML5 required attribute when needed
	resetValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // value to use when you clear the control
	rtl: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // set to true in order to use react-select in right-to-left direction
	scrollMenuIntoView: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
	searchable: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to enable searching feature or not
	simpleValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
	style: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object, // optional style to apply to the control
	tabIndex: stringOrNumber, // optional tab index of the control
	tabSelectsValue: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to treat tabbing out while focused to be value selection
	trimFilter: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // whether to trim whitespace around filter value
	value: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // initial field value
	valueComponent: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // value component to render
	valueKey: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, // path of the label value in option objects
	valueRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // valueRenderer: function (option) {}
	wrapperStyle: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.object // optional style to apply to the component wrapper
};

Select$1.defaultProps = {
	arrowRenderer: arrowRenderer,
	autosize: true,
	backspaceRemoves: true,
	backspaceToRemoveMessage: 'Press backspace to remove {label}',
	clearable: true,
	clearAllText: 'Clear all',
	clearRenderer: clearRenderer,
	clearValueText: 'Clear value',
	closeOnSelect: true,
	deleteRemoves: true,
	delimiter: ',',
	disabled: false,
	escapeClearsValue: true,
	filterOptions: filterOptions,
	ignoreAccents: true,
	ignoreCase: true,
	inputProps: {},
	isLoading: false,
	joinValues: false,
	labelKey: 'label',
	matchPos: 'any',
	matchProp: 'any',
	menuBuffer: 0,
	menuRenderer: menuRenderer,
	multi: false,
	noResultsText: 'No results found',
	onBlurResetsInput: true,
	onCloseResetsInput: true,
	onSelectResetsInput: true,
	openOnClick: true,
	optionComponent: Option,
	pageSize: 5,
	placeholder: 'Select...',
	removeSelected: true,
	required: false,
	rtl: false,
	scrollMenuIntoView: true,
	searchable: true,
	simpleValue: false,
	tabSelectsValue: true,
	trimFilter: true,
	valueComponent: Value,
	valueKey: 'value'
};

var propTypes = {
	autoload: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool.isRequired, // automatically call the `loadOptions` prop on-mount; defaults to true
	cache: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any, // object to use to cache results; set to null/false to disable caching
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired, // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
	ignoreAccents: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // strip diacritics when filtering; defaults to true
	ignoreCase: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // perform case-insensitive filtering; defaults to true
	loadOptions: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired, // callback to load options asynchronously; (inputValue: string, callback: Function): ?Promise
	loadingPlaceholder: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// replaces the placeholder while options are loading
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	multi: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.bool, // multi-value input
	noResultsText: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// field noResultsText, displayed when no options come back from the server
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	onChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // onChange handler: function (newValue) {}
	onInputChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func, // optional for keeping track of what is being typed
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array.isRequired, // array of options
	placeholder: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// field placeholder, displayed when there's no value (shared with Select)
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	searchPromptText: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.oneOfType([// label to prompt for search input
	__WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.string, __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.node]),
	value: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any // initial field value
};

var defaultCache = {};

var defaultChildren = function defaultChildren(props) {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Select$1, props);
};

var defaultProps = {
	autoload: true,
	cache: defaultCache,
	children: defaultChildren,
	ignoreAccents: true,
	ignoreCase: true,
	loadingPlaceholder: 'Loading...',
	options: [],
	searchPromptText: 'Type to search'
};

var Async = function (_Component) {
	inherits(Async, _Component);

	function Async(props, context) {
		classCallCheck(this, Async);

		var _this = possibleConstructorReturn(this, (Async.__proto__ || Object.getPrototypeOf(Async)).call(this, props, context));

		_this._cache = props.cache === defaultCache ? {} : props.cache;

		_this.state = {
			inputValue: '',
			isLoading: false,
			options: props.options
		};

		_this.onInputChange = _this.onInputChange.bind(_this);
		return _this;
	}

	createClass(Async, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var autoload = this.props.autoload;


			if (autoload) {
				this.loadOptions('');
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (nextProps.options !== this.props.options) {
				this.setState({
					options: nextProps.options
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._callback = null;
		}
	}, {
		key: 'loadOptions',
		value: function loadOptions(inputValue) {
			var _this2 = this;

			var loadOptions = this.props.loadOptions;

			var cache = this._cache;

			if (cache && Object.prototype.hasOwnProperty.call(cache, inputValue)) {
				this._callback = null;

				this.setState({
					isLoading: false,
					options: cache[inputValue]
				});

				return;
			}

			var callback = function callback(error, data) {
				var options = data && data.options || [];

				if (cache) {
					cache[inputValue] = options;
				}

				if (callback === _this2._callback) {
					_this2._callback = null;

					_this2.setState({
						isLoading: false,
						options: options
					});
				}
			};

			// Ignore all but the most recent request
			this._callback = callback;

			var promise = loadOptions(inputValue, callback);
			if (promise) {
				promise.then(function (data) {
					return callback(null, data);
				}, function (error) {
					return callback(error);
				});
			}

			if (this._callback && !this.state.isLoading) {
				this.setState({
					isLoading: true
				});
			}
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(inputValue) {
			var _props = this.props,
			    ignoreAccents = _props.ignoreAccents,
			    ignoreCase = _props.ignoreCase,
			    onInputChange = _props.onInputChange;

			var newInputValue = inputValue;

			if (onInputChange) {
				var value = onInputChange(newInputValue);
				// Note: != used deliberately here to catch undefined and null
				if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
					newInputValue = '' + value;
				}
			}

			var transformedInputValue = newInputValue;

			if (ignoreAccents) {
				transformedInputValue = stripDiacritics(transformedInputValue);
			}

			if (ignoreCase) {
				transformedInputValue = transformedInputValue.toLowerCase();
			}

			this.setState({ inputValue: newInputValue });
			this.loadOptions(transformedInputValue);

			// Return new input value, but without applying toLowerCase() to avoid modifying the user's view case of the input while typing.
			return newInputValue;
		}
	}, {
		key: 'noResultsText',
		value: function noResultsText() {
			var _props2 = this.props,
			    loadingPlaceholder = _props2.loadingPlaceholder,
			    noResultsText = _props2.noResultsText,
			    searchPromptText = _props2.searchPromptText;
			var _state = this.state,
			    inputValue = _state.inputValue,
			    isLoading = _state.isLoading;


			if (isLoading) {
				return loadingPlaceholder;
			}
			if (inputValue && noResultsText) {
				return noResultsText;
			}
			return searchPromptText;
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props3 = this.props,
			    children = _props3.children,
			    loadingPlaceholder = _props3.loadingPlaceholder,
			    placeholder = _props3.placeholder;
			var _state2 = this.state,
			    isLoading = _state2.isLoading,
			    options = _state2.options;


			var props = {
				noResultsText: this.noResultsText(),
				placeholder: isLoading ? loadingPlaceholder : placeholder,
				options: isLoading && loadingPlaceholder ? [] : options,
				ref: function ref(_ref) {
					return _this3.select = _ref;
				}
			};

			return children(_extends({}, this.props, props, {
				isLoading: isLoading,
				onInputChange: this.onInputChange
			}));
		}
	}]);
	return Async;
}(__WEBPACK_IMPORTED_MODULE_3_react__["Component"]);

Async.propTypes = propTypes;
Async.defaultProps = defaultProps;

var CreatableSelect = function (_React$Component) {
	inherits(CreatableSelect, _React$Component);

	function CreatableSelect(props, context) {
		classCallCheck(this, CreatableSelect);

		var _this = possibleConstructorReturn(this, (CreatableSelect.__proto__ || Object.getPrototypeOf(CreatableSelect)).call(this, props, context));

		_this.filterOptions = _this.filterOptions.bind(_this);
		_this.menuRenderer = _this.menuRenderer.bind(_this);
		_this.onInputKeyDown = _this.onInputKeyDown.bind(_this);
		_this.onInputChange = _this.onInputChange.bind(_this);
		_this.onOptionSelect = _this.onOptionSelect.bind(_this);
		return _this;
	}

	createClass(CreatableSelect, [{
		key: 'createNewOption',
		value: function createNewOption() {
			var _props = this.props,
			    isValidNewOption = _props.isValidNewOption,
			    newOptionCreator = _props.newOptionCreator,
			    onNewOptionClick = _props.onNewOptionClick,
			    _props$options = _props.options,
			    options = _props$options === undefined ? [] : _props$options;


			if (isValidNewOption({ label: this.inputValue })) {
				var option = newOptionCreator({ label: this.inputValue, labelKey: this.labelKey, valueKey: this.valueKey });
				var _isOptionUnique = this.isOptionUnique({ option: option, options: options });

				// Don't add the same option twice.
				if (_isOptionUnique) {
					if (onNewOptionClick) {
						onNewOptionClick(option);
					} else {
						options.unshift(option);

						this.select.selectValue(option);
					}
				}
			}
		}
	}, {
		key: 'filterOptions',
		value: function filterOptions$$1() {
			var _props2 = this.props,
			    filterOptions$$1 = _props2.filterOptions,
			    isValidNewOption = _props2.isValidNewOption,
			    promptTextCreator = _props2.promptTextCreator;

			// TRICKY Check currently selected options as well.
			// Don't display a create-prompt for a value that's selected.
			// This covers async edge-cases where a newly-created Option isn't yet in the async-loaded array.

			var excludeOptions = (arguments.length <= 2 ? undefined : arguments[2]) || [];

			var filteredOptions = filterOptions$$1.apply(undefined, arguments) || [];

			if (isValidNewOption({ label: this.inputValue })) {
				var _newOptionCreator = this.props.newOptionCreator;


				var option = _newOptionCreator({
					label: this.inputValue,
					labelKey: this.labelKey,
					valueKey: this.valueKey
				});

				// TRICKY Compare to all options (not just filtered options) in case option has already been selected).
				// For multi-selects, this would remove it from the filtered list.
				var _isOptionUnique2 = this.isOptionUnique({
					option: option,
					options: excludeOptions.concat(filteredOptions)
				});

				if (_isOptionUnique2) {
					var prompt = promptTextCreator(this.inputValue);

					this._createPlaceholderOption = _newOptionCreator({
						label: prompt,
						labelKey: this.labelKey,
						valueKey: this.valueKey
					});

					filteredOptions.unshift(this._createPlaceholderOption);
				}
			}

			return filteredOptions;
		}
	}, {
		key: 'isOptionUnique',
		value: function isOptionUnique(_ref) {
			var option = _ref.option,
			    options = _ref.options;
			var isOptionUnique = this.props.isOptionUnique;


			options = options || this.props.options;

			return isOptionUnique({
				labelKey: this.labelKey,
				option: option,
				options: options,
				valueKey: this.valueKey
			});
		}
	}, {
		key: 'menuRenderer',
		value: function menuRenderer$$1(params) {
			var menuRenderer$$1 = this.props.menuRenderer;


			return menuRenderer$$1(_extends({}, params, {
				onSelect: this.onOptionSelect,
				selectValue: this.onOptionSelect
			}));
		}
	}, {
		key: 'onInputChange',
		value: function onInputChange(input) {
			var onInputChange = this.props.onInputChange;

			// This value may be needed in between Select mounts (when this.select is null)

			this.inputValue = input;

			if (onInputChange) {
				this.inputValue = onInputChange(input);
			}

			return this.inputValue;
		}
	}, {
		key: 'onInputKeyDown',
		value: function onInputKeyDown(event) {
			var _props3 = this.props,
			    shouldKeyDownEventCreateNewOption = _props3.shouldKeyDownEventCreateNewOption,
			    onInputKeyDown = _props3.onInputKeyDown;

			var focusedOption = this.select.getFocusedOption();

			if (focusedOption && focusedOption === this._createPlaceholderOption && shouldKeyDownEventCreateNewOption({ keyCode: event.keyCode })) {
				this.createNewOption();

				// Prevent decorated Select from doing anything additional with this keyDown event
				event.preventDefault();
			} else if (onInputKeyDown) {
				onInputKeyDown(event);
			}
		}
	}, {
		key: 'onOptionSelect',
		value: function onOptionSelect(option) {
			if (option === this._createPlaceholderOption) {
				this.createNewOption();
			} else {
				this.select.selectValue(option);
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props4 = this.props,
			    refProp = _props4.ref,
			    restProps = objectWithoutProperties(_props4, ['ref']);
			var children = this.props.children;

			// We can't use destructuring default values to set the children,
			// because it won't apply work if `children` is null. A falsy check is
			// more reliable in real world use-cases.

			if (!children) {
				children = defaultChildren$2;
			}

			var props = _extends({}, restProps, {
				allowCreate: true,
				filterOptions: this.filterOptions,
				menuRenderer: this.menuRenderer,
				onInputChange: this.onInputChange,
				onInputKeyDown: this.onInputKeyDown,
				ref: function ref(_ref2) {
					_this2.select = _ref2;

					// These values may be needed in between Select mounts (when this.select is null)
					if (_ref2) {
						_this2.labelKey = _ref2.props.labelKey;
						_this2.valueKey = _ref2.props.valueKey;
					}
					if (refProp) {
						refProp(_ref2);
					}
				}
			});

			return children(props);
		}
	}]);
	return CreatableSelect;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

var defaultChildren$2 = function defaultChildren(props) {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Select$1, props);
};

var isOptionUnique = function isOptionUnique(_ref3) {
	var option = _ref3.option,
	    options = _ref3.options,
	    labelKey = _ref3.labelKey,
	    valueKey = _ref3.valueKey;

	if (!options || !options.length) {
		return true;
	}

	return options.filter(function (existingOption) {
		return existingOption[labelKey] === option[labelKey] || existingOption[valueKey] === option[valueKey];
	}).length === 0;
};

var isValidNewOption = function isValidNewOption(_ref4) {
	var label = _ref4.label;
	return !!label;
};

var newOptionCreator = function newOptionCreator(_ref5) {
	var label = _ref5.label,
	    labelKey = _ref5.labelKey,
	    valueKey = _ref5.valueKey;

	var option = {};
	option[valueKey] = label;
	option[labelKey] = label;
	option.className = 'Select-create-option-placeholder';

	return option;
};

var promptTextCreator = function promptTextCreator(label) {
	return 'Create option "' + label + '"';
};

var shouldKeyDownEventCreateNewOption = function shouldKeyDownEventCreateNewOption(_ref6) {
	var keyCode = _ref6.keyCode;

	switch (keyCode) {
		case 9: // TAB
		case 13: // ENTER
		case 188:
			// COMMA
			return true;
		default:
			return false;
	}
};

// Default prop methods
CreatableSelect.isOptionUnique = isOptionUnique;
CreatableSelect.isValidNewOption = isValidNewOption;
CreatableSelect.newOptionCreator = newOptionCreator;
CreatableSelect.promptTextCreator = promptTextCreator;
CreatableSelect.shouldKeyDownEventCreateNewOption = shouldKeyDownEventCreateNewOption;

CreatableSelect.defaultProps = {
	filterOptions: filterOptions,
	isOptionUnique: isOptionUnique,
	isValidNewOption: isValidNewOption,
	menuRenderer: menuRenderer,
	newOptionCreator: newOptionCreator,
	promptTextCreator: promptTextCreator,
	shouldKeyDownEventCreateNewOption: shouldKeyDownEventCreateNewOption
};

CreatableSelect.propTypes = {
	// Child function responsible for creating the inner Select component
	// This component can be used to compose HOCs (eg Creatable and Async)
	// (props: Object): PropTypes.element
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// See Select.propTypes.filterOptions
	filterOptions: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,

	// Searches for any matching option within the set of options.
	// This function prevents duplicate options from being created.
	// ({ option: Object, options: Array, labelKey: string, valueKey: string }): boolean
	isOptionUnique: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// Determines if the current input text represents a valid option.
	// ({ label: string }): boolean
	isValidNewOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// See Select.propTypes.menuRenderer
	menuRenderer: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.any,

	// Factory to create new option.
	// ({ label: string, labelKey: string, valueKey: string }): Object
	newOptionCreator: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// input change handler: function (inputValue) {}
	onInputChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// input keyDown handler: function (event) {}
	onInputKeyDown: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// new option click handler: function (option) {}
	onNewOptionClick: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// See Select.propTypes.options
	options: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.array,

	// Creates prompt/placeholder option text.
	// (filterText: string): string
	promptTextCreator: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	ref: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,

	// Decides if a keyDown event (eg its `keyCode`) should result in the creation of a new option.
	shouldKeyDownEventCreateNewOption: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func
};

var AsyncCreatableSelect = function (_React$Component) {
	inherits(AsyncCreatableSelect, _React$Component);

	function AsyncCreatableSelect() {
		classCallCheck(this, AsyncCreatableSelect);
		return possibleConstructorReturn(this, (AsyncCreatableSelect.__proto__ || Object.getPrototypeOf(AsyncCreatableSelect)).apply(this, arguments));
	}

	createClass(AsyncCreatableSelect, [{
		key: 'focus',
		value: function focus() {
			this.select.focus();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
				Async,
				this.props,
				function (_ref) {
					var ref = _ref.ref,
					    asyncProps = objectWithoutProperties(_ref, ['ref']);

					var asyncRef = ref;
					return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(
						CreatableSelect,
						asyncProps,
						function (_ref2) {
							var ref = _ref2.ref,
							    creatableProps = objectWithoutProperties(_ref2, ['ref']);

							var creatableRef = ref;
							return _this2.props.children(_extends({}, creatableProps, {
								ref: function ref(select) {
									creatableRef(select);
									asyncRef(select);
									_this2.select = select;
								}
							}));
						}
					);
				}
			);
		}
	}]);
	return AsyncCreatableSelect;
}(__WEBPACK_IMPORTED_MODULE_3_react___default.a.Component);

var defaultChildren$1 = function defaultChildren(props) {
	return __WEBPACK_IMPORTED_MODULE_3_react___default.a.createElement(Select$1, props);
};

AsyncCreatableSelect.propTypes = {
	children: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func.isRequired // Child function responsible for creating the inner Select component; (props: Object): PropTypes.element
};

AsyncCreatableSelect.defaultProps = {
	children: defaultChildren$1
};

Select$1.Async = Async;
Select$1.AsyncCreatable = AsyncCreatableSelect;
Select$1.Creatable = CreatableSelect;
Select$1.Value = Value;
Select$1.Option = Option;


/* harmony default export */ __webpack_exports__["a"] = (Select$1);


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

/***/ "./src/AppBundle/Resources/public/javascript/buy/actions/filterActions.js":
/*!********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/actions/filterActions.js ***!
  \********************************************************************************/
/*! exports provided: addRight, removeRight, updateCountries, updateExclusive, updateSport, updateEvent, clearFilter, clearUpdateFilter */
/*! exports used: addRight, clearFilter, clearUpdateFilter, removeRight, updateCountries, updateEvent, updateExclusive, updateSport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return updateCountries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return updateExclusive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return updateSport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return updateEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return clearFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return clearUpdateFilter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reducers_filter__ = __webpack_require__(/*! ../reducers/filter */ "./src/AppBundle/Resources/public/javascript/buy/reducers/filter.js");


var addRight = function addRight(id) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__reducers_filter__["b" /* filterTypes */].ADD_RIGHT,
        id: id
    };
};

var removeRight = function removeRight(id) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__reducers_filter__["b" /* filterTypes */].REMOVE_RIGHT,
        id: id
    };
};

var updateCountries = function updateCountries(countries) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__reducers_filter__["b" /* filterTypes */].UPDATE_COUNTRIES,
        countries: countries
    };
};

var updateExclusive = function updateExclusive(exclusive) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__reducers_filter__["b" /* filterTypes */].UPDATE_EXCLUSIVE,
        exclusive: exclusive
    };
};

var updateSport = function updateSport(sport) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__reducers_filter__["b" /* filterTypes */].UPDATE_SPORT,
        sport: sport
    };
};

var updateEvent = function updateEvent(event) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__reducers_filter__["b" /* filterTypes */].UPDATE_EVENT,
        event: event
    };
};

var clearFilter = function clearFilter() {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__reducers_filter__["b" /* filterTypes */].CLEAR
    };
};

var clearUpdateFilter = function clearUpdateFilter() {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__reducers_filter__["b" /* filterTypes */].CLEAR_UPDATE
    };
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/components/ContentListingEventDetails.js":
/*!************************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/components/ContentListingEventDetails.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_select__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_filterActions__ = __webpack_require__(/*! ../actions/filterActions */ "./src/AppBundle/Resources/public/javascript/buy/actions/filterActions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_actions_utils__ = __webpack_require__(/*! ../../main/actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var ContentListingEventDetails = function (_React$Component) {
    _inherits(ContentListingEventDetails, _React$Component);

    function ContentListingEventDetails(props) {
        _classCallCheck(this, ContentListingEventDetails);

        var _this = _possibleConstructorReturn(this, (ContentListingEventDetails.__proto__ || Object.getPrototypeOf(ContentListingEventDetails)).call(this, props));

        _this.getFixtures = function () {
            var seasons = _this.props.seasons;


            var fixtures = [];

            seasons.forEach(function (s) {
                if (s.fixtures) fixtures = [].concat(_toConsumableArray(fixtures), _toConsumableArray(s.fixtures));
            });

            return fixtures;
        };

        _this.getSchedules = function () {
            var _this$props = _this.props,
                seasons = _this$props.seasons,
                schedulesBySeason = _this$props.schedulesBySeason;

            var schedules = {
                rounds: [],
                matches: []
            };
            seasons.forEach(function (s) {
                if (s.schedules) Object.entries(s.schedules).forEach(function (sh) {
                    if (sh[1].selected && schedules.rounds.indexOf(sh[0]) === -1) {
                        schedules.rounds.push(sh[0]);
                        sh[1].matches.forEach(function (m) {
                            if (m.selected) schedules.matches.push(m);
                        });
                    }
                });
            });

            if (schedulesBySeason) {
                schedulesBySeason.forEach(function (s) {
                    if (s && Object.entries(s)) Object.entries(s).forEach(function (sh) {
                        if (schedules.rounds.indexOf(sh[0]) === -1) {
                            schedules.rounds.push(sh[0]);
                            sh[1].matches.forEach(function (m) {
                                if (m.selected) schedules.matches.push(m);
                            });
                        }
                    });
                });
            }

            return schedules;
        };

        _this.showProgramInfo = function () {
            var _this$props2 = _this.props,
                rightsPackage = _this$props2.rightsPackage,
                PROGRAM_NAME = _this$props2.PROGRAM_NAME;

            var show = false;

            if (rightsPackage.length > 1) return show;
            show = Object(__WEBPACK_IMPORTED_MODULE_4__main_actions_utils__["a" /* editedProgramSelected */])(rightsPackage);
            return show && PROGRAM_NAME;
        };

        _this.state = {};
        return _this;
    }

    _createClass(ContentListingEventDetails, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                sports = _props.sports,
                sportCategory = _props.sportCategory,
                customTournament = _props.customTournament,
                customCategory = _props.customCategory,
                customId = _props.customId,
                tournament = _props.tournament,
                seasons = _props.seasons,
                showCustomId = _props.showCustomId,
                PROGRAM_YEAR = _props.PROGRAM_YEAR,
                PROGRAM_EPISODES = _props.PROGRAM_EPISODES,
                isFragment = _props.isFragment;


            var schedules = this.getSchedules();
            var rounds = schedules.rounds;
            var matches = schedules.matches;
            var seasonTitle = seasons.length > 1 ? "Seasons: " : "Season: ";
            var seasonName = seasonTitle + seasons.map(function (season) {
                return season.year;
            }).join(", ");
            var roundsTitle = rounds.length > 1 ? "Rounds: " : "Round: ";
            var roundsName = roundsTitle + rounds.join(", ");
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'listing-attributes col' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item event' },
                    sports && sports.length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        sports[0].name
                    ),
                    sports && sports.length > 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        'Multiple Sports'
                    ),
                    sportCategory && sportCategory.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        sportCategory[0].name
                    ),
                    customCategory && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        customCategory
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item event' },
                    tournament && tournament.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        tournament[0].name
                    ),
                    customTournament && !customId && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        customTournament
                    ),
                    tournament && tournament.length === 0 && !customTournament && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        'General content'
                    ),
                    seasons && seasons.length > 0 && seasonName,
                    this.showProgramInfo() && PROGRAM_YEAR && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        PROGRAM_YEAR
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item event' },
                    rounds.length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        roundsName
                    ),
                    rounds.length > 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        'Multiple rounds'
                    ),
                    matches.length === 1 && matches[0].competitors.map(function (competitor, i, list) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'span',
                            { key: i },
                            competitor.name,
                            ' ',
                            list.length !== i + 1 && " vs "
                        );
                    }),
                    this.getFixtures().length > 1 && this.getFixtures().length + ' fixtures',
                    this.getFixtures().length === 1 && this.getFixtures()[0].name,
                    this.showProgramInfo() && PROGRAM_EPISODES && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'span',
                        null,
                        PROGRAM_EPISODES
                    )
                )
            );
        }
    }]);

    return ContentListingEventDetails;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ContentListingEventDetails);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/components/ContentListingRightsPackage.js":
/*!*************************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/components/ContentListingRightsPackage.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_components_Icons__ = __webpack_require__(/*! ../../main/components/Icons */ "./src/AppBundle/Resources/public/javascript/main/components/Icons.js");



var ContentListingRightsPackage = function ContentListingRightsPackage(_ref) {
    var rightsPackage = _ref.rightsPackage,
        programName = _ref.programName;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "listing-rights col" },
        rightsPackage.map(function (sr, i) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { key: i, className: "listing-item" },
                !sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 23, height: 22, margin: '0 5px' }, src: __WEBPACK_IMPORTED_MODULE_1__main_components_Icons__["d" /* blueCheckIcon */] }),
                sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 23, height: 22, margin: '0 5px' }, src: __WEBPACK_IMPORTED_MODULE_1__main_components_Icons__["r" /* yellowCheckIcon */] }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { style: { display: 'flex', flexDirection: "row" } },
                    sr.shortLabel !== "PR" && sr.name,
                    sr.shortLabel === "PR" && programName && "Program: " + programName,
                    sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { style: { fontWeight: 600, marginLeft: 3 } },
                        " EX"
                    )
                )
            );
        })
    );
};

/* harmony default export */ __webpack_exports__["a"] = (ContentListingRightsPackage);

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
    UPDATE_SPORT: 'UPDATE_SPORT',
    UPDATE_EVENT: 'UPDATE_EVENT',
    CLEAR: 'CLEAR',
    CLEAR_UPDATE: 'CLEAR_UPDATE'
};

var defaultFilter = {
    rights: [],
    countries: [],
    exclusive: false,
    sport: {
        value: null,
        label: "All sports"
    },
    event: "",
    forceUpdate: true

};

var filter = function filter() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultFilter;
    var action = arguments[1];


    switch (action.type) {
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
                countries: action.countries
            });
        case filterTypes.UPDATE_EXCLUSIVE:
            return Object.assign({}, state, {
                exclusive: action.exclusive
            });
        case filterTypes.UPDATE_SPORT:
            return Object.assign({}, state, {
                sport: action.sport
            });
        case filterTypes.UPDATE_EVENT:
            return Object.assign({}, state, {
                event: action.event
            });
        default:
            return state;
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js":
/*!*************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/actions/utils.js ***!
  \*************************************************************************/
/*! exports provided: getCurrencySymbol, goTo, historyGoTo, goToListing, viewLicense, viewLicenseBid, viewLicenseBundle, viewLicenseCustom, goToMarketplace, goToClosedDeals, getFee, getFullName, limitText, editedProgramSelected, parseSeasons */
/*! exports used: editedProgramSelected, getCurrencySymbol, getFee, getFullName, goTo, goToClosedDeals, goToListing, goToMarketplace, historyGoTo, limitText, parseSeasons, viewLicense, viewLicenseBid, viewLicenseBundle, viewLicenseCustom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCurrencySymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return goTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return historyGoTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return goToListing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return viewLicense; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return viewLicenseBid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return viewLicenseBundle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return viewLicenseCustom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return goToMarketplace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return goToClosedDeals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getFee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getFullName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return limitText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return editedProgramSelected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return parseSeasons; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getCurrencySymbol = function getCurrencySymbol(code) {
    return code === "EUR" ? "€" : "$";
};

var goTo = function goTo(route, openNew) {

    if (openNew) {
        window.open(envhosturl + route, "_blank");
    } else {
        window.location.href = envhosturl + route;
    }
};

var historyGoTo = function historyGoTo(route) {
    window.history.pushState(null, null, envhosturl + route);
};

var goToListing = function goToListing(id, openNew) {
    goTo("listing/" + id, openNew);
};

var viewLicense = function viewLicense(id) {
    goTo("license/preview/" + id);
};

var viewLicenseBid = function viewLicenseBid(id) {
    goTo("license/bid/" + id);
};

var viewLicenseBundle = function viewLicenseBundle(id, listingId) {
    goTo("license/bundle/" + id + "/" + listingId);
};

var viewLicenseCustom = function viewLicenseCustom(listingId, bundleId, bid) {

    var serialize = function serialize(obj, prefix) {
        var str = [],
            p;
        for (p in obj) {
            if (obj.hasOwnProperty(p)) {
                var k = prefix ? prefix + "[" + p + "]" : p,
                    v = obj[p];
                str.push(v !== null && (typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    };

    //let queryString = Object.keys(bundle).map(key => key + '=' + bundle[key]).join('&');
    goTo("license/custom/" + listingId + "/" + bundleId + "?" + serialize({ bid: bid }));
};

var goToMarketplace = function goToMarketplace() {
    goTo("marketplace");
};

var goToClosedDeals = function goToClosedDeals() {
    goTo("closeddeals");
};

var getFee = function getFee(salesPackage) {
    var feeNumber = parseFloat(salesPackage.fee);
    return feeNumber.toLocaleString() + " " + getCurrencySymbol(salesPackage.currency.code);
};

var getFullName = function getFullName(user) {
    return user.firstName + " " + user.lastName;
};

var limitText = function limitText(txt) {
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;

    return txt.length > limit ? txt.substring(0, limit) + "..." : txt;
};

var editedProgramSelected = function editedProgramSelected(rights) {
    return rights.filter(function (r) {
        return r.shortLabel === 'PR';
    }).length === 1;
};

var parseSeasons = function parseSeasons(content) {
    if (content.seasons === undefined) return content;
    content.seasons.forEach(function (season) {
        season.selectedSchedules = {};

        if (season.schedules === undefined) return;

        Object.entries(season.schedules).filter(function (round) {
            if (!round || round.length <= 1) return false;
            return round[1].selected;
        }).map(function (round) {
            if (!season.selectedSchedules[round[0]]) season.selectedSchedules[round[0]] = { matches: [] };
            if (round[1].selected) {
                Array.from(round[1].matches.values()).filter(function (match) {
                    return match.selected;
                }).forEach(function (match) {
                    season.selectedSchedules[round[0]].matches.push(match);
                });
            }
        });
    });

    return content;
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/CommercialSalesBundle.js":
/*!********************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/CommercialSalesBundle.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_moment__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_table__ = __webpack_require__(/*! react-table */ "./node_modules/react-table/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_modal__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_components_DigitalSignature__ = __webpack_require__(/*! ../../main/components/DigitalSignature */ "./src/AppBundle/Resources/public/javascript/main/components/DigitalSignature.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_utils__ = __webpack_require__(/*! ../actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Icons__ = __webpack_require__(/*! ./Icons */ "./src/AppBundle/Resources/public/javascript/main/components/Icons.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__styles_custom__ = __webpack_require__(/*! ../styles/custom */ "./src/AppBundle/Resources/public/javascript/main/styles/custom.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__main_components_SendMessage__ = __webpack_require__(/*! ../../main/components/SendMessage */ "./src/AppBundle/Resources/public/javascript/main/components/SendMessage.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var CommercialSalesBundle = function (_React$Component) {
    _inherits(CommercialSalesBundle, _React$Component);

    function CommercialSalesBundle(props) {
        _classCallCheck(this, CommercialSalesBundle);

        var _this2 = _possibleConstructorReturn(this, (CommercialSalesBundle.__proto__ || Object.getPrototypeOf(CommercialSalesBundle)).call(this, props));

        _this2.acceptBid = function () {
            var signature = _this2.state.signature;
            var contentId = _this2.props.contentId;

            var selectedBid = _this2.state.selectedBid;
            selectedBid.content = contentId;
            _this2.setState({ saving: true });
            ContentArena.ContentApi.acceptBid(selectedBid, signature).done(function (response) {
                _this2.setState({ approveModalIsOpen: false, saving: false });
                _this2.props.onUpdate();
            });
        };

        _this2.removeBid = function () {
            var selectedBid = _this2.state.selectedBid;
            _this2.setState({ saving: true });
            ContentArena.ContentApi.removeBid(selectedBid).done(function (response) {
                //this.setState({removeModalIsOpen : false, saving : false})
                _this2.props.onUpdate();
            });
        };

        _this2.rejectBid = function () {
            var selectedBid = _this2.state.selectedBid;
            selectedBid.message = _this2.state.message;
            _this2.setState({ saving: true });
            ContentArena.ContentApi.rejectBid(selectedBid).always(function (response) {
                _this2.setState({ rejectModalIsOpen: false, saving: false });
                _this2.props.onUpdate();
            });
        };

        _this2.closeRemoveModal = function () {
            _this2.setState({ removeModalIsOpen: false });
        };

        _this2.closeApproveModal = function () {
            _this2.setState({ approveModalIsOpen: false });
        };

        _this2.closeRejectModal = function () {
            _this2.setState({ rejectModalIsOpen: false });
        };

        _this2.renderApproveModal = function () {
            var salesBundle = _this2.props.salesBundle;
            var _this2$state = _this2.state,
                signature = _this2$state.signature,
                saving = _this2$state.saving;


            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_modal___default.a,
                {
                    isOpen: _this2.state.approveModalIsOpen,
                    onRequestClose: _this2.closeApproveModal,
                    bodyOpenClassName: "generic-modal",
                    style: __WEBPACK_IMPORTED_MODULE_7__styles_custom__["a" /* GenericModalStyle */]
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "generic-modal-container" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "title" },
                        "Are you sure you want to accept this bid?"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "container" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__main_components_DigitalSignature__["a" /* default */], { signature: signature, onReady: function onReady(signature) {
                                _this2.setState({ signature: signature });
                            } })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "buttons" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { onClick: _this2.closeApproveModal },
                            "Cancel"
                        ),
                        !saving && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { className: "confirm", disabled: !signature, onClick: _this2.acceptBid },
                            "Accept Bid"
                        ),
                        saving && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-spin fa-cog" })
                    )
                )
            );
        };

        _this2.renderRejectModal = function () {
            var salesBundle = _this2.props.salesBundle;
            var _this2$state2 = _this2.state,
                saving = _this2$state2.saving,
                message = _this2$state2.message;


            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_modal___default.a,
                {
                    isOpen: _this2.state.rejectModalIsOpen,
                    onRequestClose: _this2.closeRejectModal,
                    bodyOpenClassName: "generic-modal",
                    style: __WEBPACK_IMPORTED_MODULE_7__styles_custom__["a" /* GenericModalStyle */]
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "generic-modal-container" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "title" },
                        "Are you sure you want to decline this bid?"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "container" },
                        "Enter Message (optional)",
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("textarea", { onChange: function onChange(e) {
                                _this2.setState({ message: e.target.value });
                            }, value: message })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "buttons" },
                        !saving && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { className: "confirm", onClick: _this2.rejectBid },
                            "Confirm"
                        ),
                        saving && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-spin fa-cog" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { onClick: _this2.closeRejectModal },
                            "Cancel"
                        )
                    )
                )
            );
        };

        _this2.renderRemoveModal = function () {
            var saving = _this2.state.saving;


            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_modal___default.a,
                {
                    isOpen: _this2.state.removeModalIsOpen,
                    onRequestClose: _this2.closeRemoveModal,
                    bodyOpenClassName: "generic-modal",
                    style: __WEBPACK_IMPORTED_MODULE_7__styles_custom__["a" /* GenericModalStyle */]
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "generic-modal-container" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "title" },
                        "Are you sure you want to remove this bid?"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "container" }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "buttons" },
                        !saving && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { onClick: _this2.removeBid, className: "confirm" },
                            "Confirm"
                        ),
                        saving && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-spin fa-cog" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { onClick: _this2.closeRemoveModal },
                            "Cancel"
                        )
                    )
                )
            );
        };

        _this2.state = {
            approveModalIsOpen: false,
            rejectModalIsOpen: false,
            removeModalIsOpen: false,
            showBids: props.bidsOpen

        };
        return _this2;
    }

    _createClass(CommercialSalesBundle, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps() {
            this.setState({ removeModalIsOpen: false, saving: false });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                salesBundle = _props.salesBundle,
                company = _props.company,
                onDelete = _props.onDelete,
                contentId = _props.contentId;
            var showBids = this.state.showBids;


            var closedDeals = salesBundle.bids.filter(function (b) {
                return b.status.name === "APPROVED";
            });
            var totalFee = closedDeals.length > 0 ? closedDeals.map(function (b) {
                return Number(b.totalFee);
            }).reduce(function (t, n) {
                return t + n;
            }) : null;
            var _this = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "commercial-sales-bundles" },
                this.renderApproveModal(),
                this.renderRejectModal(),
                this.renderRemoveModal(),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "commercial-sales-bundles-container" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "sales-bundle-item" },
                        salesBundle.bundleMethod === "SELL_AS_BUNDLE" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 26, height: 23 }, src: __WEBPACK_IMPORTED_MODULE_6__Icons__["m" /* fixedIcon */] }),
                        salesBundle.name
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "sales-bundle-item" },
                        salesBundle.fee > 0 && Object(__WEBPACK_IMPORTED_MODULE_5__actions_utils__["c" /* getFee */])(salesBundle),
                        salesBundle.salesMethod === "BIDDING" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 23, height: 23 }, src: __WEBPACK_IMPORTED_MODULE_6__Icons__["c" /* bidIcon */] })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "sales-bundle-item-right", style: { marginLeft: 'auto' } },
                        closedDeals.length,
                        " closed Deals"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "sales-bundle-item-right" },
                        salesBundle.bids.filter(function (b) {
                            return b.status.name === "PENDING";
                        }).length,
                        " open bids"
                    ),
                    totalFee && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "sales-bundle-item-right" },
                        totalFee,
                        " ",
                        Object(__WEBPACK_IMPORTED_MODULE_5__actions_utils__["b" /* getCurrencySymbol */])(salesBundle.currency.code)
                    ),
                    salesBundle.bids.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "sales-bundle-show-bids",
                            onClick: function onClick() {
                                _this3.setState({ showBids: !showBids });
                            } },
                        !showBids && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__Icons__["b" /* addIcon */] }),
                        showBids && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__Icons__["g" /* cancelIcon */] })
                    )
                ),
                showBids && salesBundle.bids.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    salesBundle.bids.map(function (b) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__main_components_SendMessage__["a" /* default */], { role: 'SELLER',
                            ref: "messagePopup" + b.id,
                            listingId: contentId, recipient: b.buyerUser.company });
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_table__["default"], {
                        className: "ca-table",
                        defaultPageSize: 30,
                        showPageSizeOptions: false,
                        showPagination: false,
                        onPageChange: this.onPageChange,
                        minRows: 0,
                        resizable: false,
                        data: salesBundle.bids,
                        select: this.props.select,
                        columns: [{
                            accessor: function accessor(d) {
                                return d.buyerUser.company.legalName;
                            },
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    props.value
                                );
                            },
                            Header: 'Buyer',
                            headerClassName: 'table-header-big',
                            className: 'table-header-big',
                            id: "company"
                        }, {
                            Header: 'Fee',
                            headerClassName: 'table-header',
                            className: 'table-header',
                            id: "price",
                            accessor: function accessor(d) {
                                return { fee: d.totalFee, currency: salesBundle.currency.code };
                            },
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "blue" },
                                    props.value.fee + " " + Object(__WEBPACK_IMPORTED_MODULE_5__actions_utils__["b" /* getCurrencySymbol */])(props.value.currency)
                                );
                            }
                        }, {
                            Header: 'User',
                            headerClassName: 'table-header-big',
                            className: 'table-header-big',
                            accessor: 'buyerUser',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    props.value.firstName + " " + props.value.lastName
                                );
                            }

                        }, {
                            Header: 'Action',
                            headerClassName: 'table-header',
                            className: 'table-header',
                            accessor: 'status.name',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    props.value === "APPROVED" && "Closed Deal",
                                    props.value === "PENDING" && "Bid Placed",
                                    props.value === "REJECTED" && "Bid Declined"
                                );
                            }

                        }, {
                            Header: 'Action date',
                            headerClassName: 'table-header',
                            className: 'table-header',
                            accessor: 'createdAt',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_1_moment_moment___default()(props.value).format('DD/MM/YYYY')
                                );
                            }

                        }, {
                            headerClassName: 'table-header',
                            className: 'table-header',
                            Header: '',
                            id: "actions",
                            accessor: function accessor(b) {
                                return { status: b.status.name, bid: b };
                            },
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "" },
                                    props.value.status === "REJECTED" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { margin: '0 10px', cursor: 'pointer' }, onClick: function onClick() {
                                            //this.setState({removeModalIsOpen:true, selectedBid : props.value.bid});
                                            _this3.setState({ showRemoveConfirm: true });
                                        }, src: __WEBPACK_IMPORTED_MODULE_6__Icons__["f" /* bucketIcon */] }),
                                    props.value.status === "PENDING" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { margin: '0 10px', cursor: 'pointer' }, onClick: function onClick() {
                                            _this3.setState({ approveModalIsOpen: true, selectedBid: props.value.bid });
                                        }, src: __WEBPACK_IMPORTED_MODULE_6__Icons__["d" /* blueCheckIcon */] }),
                                    props.value.status === "PENDING" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { margin: '0 10px', cursor: 'pointer' }, onClick: function onClick() {
                                            _this3.setState({ rejectModalIsOpen: true, selectedBid: props.value.bid });
                                        }, src: __WEBPACK_IMPORTED_MODULE_6__Icons__["g" /* cancelIcon */] }),
                                    props.value.status === "APPROVED" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { margin: '0 10px', cursor: 'pointer' }, onClick: function onClick() {
                                            Object(__WEBPACK_IMPORTED_MODULE_5__actions_utils__["m" /* viewLicenseBid */])(props.value.bid.customId);
                                        }, src: __WEBPACK_IMPORTED_MODULE_6__Icons__["i" /* docIcon */] }),
                                    props.value.status === "APPROVED" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { margin: '0 10px', cursor: 'pointer' }, onClick: function onClick() {
                                            _this.refs["messagePopup" + props.value.bid.id].open();
                                        }, src: __WEBPACK_IMPORTED_MODULE_6__Icons__["e" /* blueEnvelopeIcon */] }),
                                    _this3.state.showRemoveConfirm && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "confirmation-tooltip" },
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "div",
                                            { className: "confirmation-text", style: { whiteSpace: 'normal' } },
                                            "Are you sure you want to remove this bid?"
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "button",
                                            { className: "button button-confirm", onClick: function onClick(e) {
                                                    _this3.setState({ showRemoveConfirm: false });
                                                    onDelete(props.value.bid.id);
                                                    e.stopPropagation();
                                                } },
                                            "Remove"
                                        ),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "button",
                                            { className: "button", onClick: function onClick(e) {
                                                    _this3.setState({ showRemoveConfirm: false });
                                                    e.stopPropagation();
                                                } },
                                            "Cancel"
                                        )
                                    )
                                );
                            }
                        }]
                    })
                )
            );
        }
    }]);

    return CommercialSalesBundle;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (CommercialSalesBundle);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/ContentListing.js":
/*!*************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/ContentListing.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_moment__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buy_components_ContentListingEventDetails__ = __webpack_require__(/*! ../../buy/components/ContentListingEventDetails */ "./src/AppBundle/Resources/public/javascript/buy/components/ContentListingEventDetails.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buy_components_ContentListingRightsPackage__ = __webpack_require__(/*! ../../buy/components/ContentListingRightsPackage */ "./src/AppBundle/Resources/public/javascript/buy/components/ContentListingRightsPackage.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var ContentListing = function (_React$Component) {
    _inherits(ContentListing, _React$Component);

    function ContentListing(props) {
        _classCallCheck(this, ContentListing);

        var _this = _possibleConstructorReturn(this, (ContentListing.__proto__ || Object.getPrototypeOf(ContentListing)).call(this, props));

        _this.getFee = function (salesPackage) {
            var currency = _this.props.currency;

            var currencyCode = currency || salesPackage.currency.code;
            var currencySymbol = currencyCode === "EUR" ? "€" : "$";
            return salesPackage.fee + " " + currencySymbol;
        };

        _this.onSelect = function () {
            var _this$props = _this.props,
                onSelect = _this$props.onSelect,
                customId = _this$props.customId;


            if (onSelect) onSelect(customId);
        };

        _this.confirmRemoveFromWatchlist = function (e) {
            _this.setState({ confirmWatchlistRemove: true });
            e.stopPropagation();
        };

        _this.cancelRemoveFromWatchlist = function (e) {
            _this.setState({ confirmWatchlistRemove: false });
            e.stopPropagation();
        };

        _this.removeFromWatchlist = function (e) {
            var _this$props2 = _this.props,
                customId = _this$props2.customId,
                onWatchlistRemove = _this$props2.onWatchlistRemove;

            ContentArena.Api.watchlist(customId);

            if (onWatchlistRemove) onWatchlistRemove(customId);
            e.stopPropagation();
        };

        _this.sortSalesPackages = function (a, b) {
            if (b.territoriesMethod === "WORLDWIDE") return -1;
            return _this.compareProperty(a.territories.length, b.territories.length) || _this.compareProperty(b.name, a.name);
        };

        _this.sortAfterFilter = function (a, b) {

            if (b.territoriesMethod === "WORLDWIDE") {
                return _this.compareProperty(b.territories.length, a.territories.length) || _this.compareProperty(a.name, b.name);
            }

            return _this.compareProperty(a.territories.length, b.territories.length) || _this.compareProperty(a.name, b.name);
        };

        _this.sortByFilter = function (salesPackages) {
            var filter = _this.props.filter;


            var temp = [];
            var territories = filter.countries.map(function (c) {
                return c.value;
            });

            salesPackages.forEach(function (e, i, l) {

                var t = e.territories.map(function (t) {
                    return t.value;
                });
                var et = e.territoriesMethod === "WORLDWIDE_EXCLUDING" ? e.excludedTerritories.map(function (t) {
                    return t.value;
                }) : [];
                var all = [].concat(_toConsumableArray(t), _toConsumableArray(et));
                var include = false;

                territories.forEach(function (t) {
                    if (all.indexOf(t) !== -1) include = true;
                });

                if (e.bundleMethod === "SELL_AS_BUNDLE" && e.territoriesMethod === "WORLDWIDE") {
                    include = true;
                }

                if (include) {
                    temp.push(e);
                }
            });

            return [].concat(temp);
        };

        _this.compareProperty = function (a, b) {
            return a > b ? 1 : b > a ? -1 : 0;
        };

        _this.state = {
            buyingMode: false
        };
        _this.noImage = assetsBaseDir + "app/images/no-image.png";
        _this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        _this.fixedIcon = assetsBaseDir + "app/images/bid.png";
        _this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        _this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";
        _this.bucketicon = assetsBaseDir + "app/images/bucket.png";
        return _this;
    }

    _createClass(ContentListing, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                name = _props.name,
                expiresAt = _props.expiresAt,
                PROGRAM_NAME = _props.PROGRAM_NAME,
                onSelectName = _props.onSelectName,
                imageBase64 = _props.imageBase64,
                image = _props.image,
                filter = _props.filter,
                sortSalesPackages = _props.sortSalesPackages,
                watchlistRemove = _props.watchlistRemove;
            var rightsPackage = this.props.rightsPackage;

            rightsPackage = rightsPackage.slice(-6);

            var confirmWatchlistRemove = this.state.confirmWatchlistRemove;


            var salesPackages = this.props.salesPackages;
            var listingImage = imageBase64 ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;

            if (filter && filter.countries.length > 0 && sortSalesPackages) {
                salesPackages = this.sortByFilter(salesPackages);
                salesPackages.sort(this.sortAfterFilter);
            } else {
                salesPackages.sort(this.sortSalesPackages).reverse();
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "listing-list-view", onClick: this.onSelect },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "left" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "image" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: listingImage })
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "right" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "name", onClick: function onClick() {
                                if (onSelectName) onSelectName();
                            } },
                        name
                    ),
                    watchlistRemove && !confirmWatchlistRemove && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: {
                            cursor: 'pointer',
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            margin: '0 5px'

                        }, src: this.bucketicon, onClick: this.confirmRemoveFromWatchlist }),
                    confirmWatchlistRemove && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: {
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                margin: '0 5px',
                                border: '1px solid lightgrey',
                                padding: 5,
                                fontSize: 13
                            } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            null,
                            "Remove from Watchlist?"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            { onClick: this.removeFromWatchlist, style: {
                                    cursor: 'pointer',
                                    margin: '0 15px',
                                    color: 'red'
                                } },
                            "Yes"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            { onClick: this.cancelRemoveFromWatchlist, style: {
                                    cursor: 'pointer',
                                    color: 'green'
                                } },
                            "Cancel"
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "listing-wrapper" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__buy_components_ContentListingEventDetails__["a" /* default */], _extends({}, this.props, { isFragment: true })),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__buy_components_ContentListingRightsPackage__["a" /* default */], { rightsPackage: rightsPackage, programName: PROGRAM_NAME })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "sales-bundles" },
                        salesPackages.slice(0, 4).map(function (salesPackage, i) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "sales-package", key: "sales-package-" + i },
                                salesPackage.bundleMethod === "SELL_AS_BUNDLE" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: { margin: '0 10px 0 5px' } },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 26, height: 23 }, src: _this2.fixedIcon })
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: { cursor: 'default' } },
                                    salesPackage.name
                                ),
                                (salesPackage.salesMethod !== "BIDDING" || salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: { margin: '0 10px', display: "flex", flex: '1 0 auto' } },
                                    _this2.getFee(salesPackage)
                                ),
                                salesPackage.salesMethod === "BIDDING" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: { margin: '0 10px 0 5px' } },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 23, height: 23 }, src: _this2.bidIcon })
                                )
                            );
                        }),
                        salesPackages.length > 4 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "sales-package" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: { color: '#2DA7E6', padding: '0 15px 0 0px' } },
                                "+ ",
                                salesPackages.length - 4
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ContentListing;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ContentListing);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/ContentListingCommercialActivity.js":
/*!*******************************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/ContentListingCommercialActivity.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_moment__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buy_components_ContentListingEventDetails__ = __webpack_require__(/*! ../../buy/components/ContentListingEventDetails */ "./src/AppBundle/Resources/public/javascript/buy/components/ContentListingEventDetails.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buy_components_ContentListingRightsPackage__ = __webpack_require__(/*! ../../buy/components/ContentListingRightsPackage */ "./src/AppBundle/Resources/public/javascript/buy/components/ContentListingRightsPackage.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_components_CommercialSalesBundle__ = __webpack_require__(/*! ../../main/components/CommercialSalesBundle */ "./src/AppBundle/Resources/public/javascript/main/components/CommercialSalesBundle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ContentListing__ = __webpack_require__(/*! ./ContentListing */ "./src/AppBundle/Resources/public/javascript/main/components/ContentListing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_utils__ = __webpack_require__(/*! ../actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Icons__ = __webpack_require__(/*! ./Icons */ "./src/AppBundle/Resources/public/javascript/main/components/Icons.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var ContentListingCommercialActivity = function (_ContentListing) {
    _inherits(ContentListingCommercialActivity, _ContentListing);

    function ContentListingCommercialActivity(props) {
        _classCallCheck(this, ContentListingCommercialActivity);

        var _this = _possibleConstructorReturn(this, (ContentListingCommercialActivity.__proto__ || Object.getPrototypeOf(ContentListingCommercialActivity)).call(this, props));

        _this.sortSalesPackages = function (a, b) {

            var aOpen = a.bids.filter(function (bid) {
                return bid.status.name === "PENDING";
            }).length > 0;
            var bOpen = b.bids.filter(function (bid) {
                return bid.status.name === "PENDING";
            }).length > 0;
            var aClosed = a.bids.filter(function (bid) {
                return bid.status.name === "APPROVED";
            }).length > 0;
            var bClosed = b.bids.filter(function (bid) {
                return bid.status.name === "APPROVED";
            }).length > 0;
            var aWorldwide = a.territoriesMethod === "WORLDWIDE";
            var bWorldwide = b.territoriesMethod === "WORLDWIDE";

            var open = !aOpen && bOpen ? 1 : !bOpen && aOpen ? -1 : 0;
            var closed = !aClosed && bClosed ? 1 : !bClosed && aClosed ? -1 : 0;
            var worldwide = !aWorldwide && bWorldwide ? 1 : !bWorldwide && aWorldwide ? -1 : 0;

            return open || closed || worldwide || _this.compareProperty(b.territories.length, a.territories.length) || _this.compareProperty(b.name, a.name);
        };

        _this.compareProperty = function (a, b) {
            return a > b ? 1 : b > a ? -1 : 0;
        };

        _this.state = {
            showSalesPackage: props.bundlesOpen
        };
        _this.noImage = assetsBaseDir + "app/images/no-image.png";
        _this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        _this.fixedIcon = assetsBaseDir + "app/images/bid.png";
        _this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        _this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";
        _this.bucketicon = assetsBaseDir + "app/images/bucket.png";
        _this.exclamationIcon = assetsBaseDir + "app/images/Exclamation.png";
        _this.envelopeIcon = assetsBaseDir + "app/images/envelope_2.png";
        return _this;
    }

    _createClass(ContentListingCommercialActivity, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                name = _props.name,
                onDelete = _props.onDelete,
                onUpdate = _props.onUpdate,
                hideWithoutBids = _props.hideWithoutBids,
                filterByOpenBids = _props.filterByOpenBids,
                filterByClosedDeals = _props.filterByClosedDeals,
                bidsOpen = _props.bidsOpen,
                rightsPackage = _props.rightsPackage,
                imageBase64 = _props.imageBase64,
                image = _props.image,
                company = _props.company,
                id = _props.id,
                PROGRAM_NAME = _props.PROGRAM_NAME;
            var showSalesPackage = this.state.showSalesPackage;


            var salesPackages = this.props.salesPackages;
            salesPackages.sort(this.sortSalesPackages);

            var listingImage = imageBase64 ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;
            var bids = salesPackages.reduce(function (t, sp) {
                return t.concat(sp.bids);
            }, []);
            var closedDeals = bids.filter(function (b) {
                return b.status.name === "APPROVED";
            });
            var openBids = bids.filter(function (b) {
                return b.status.name === "PENDING";
            });
            var total = closedDeals.length > 0 ? closedDeals.map(function (b) {
                return Number(b.totalFee);
            }).reduce(function (t, n) {
                return t + n;
            }) : 0;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { style: { display: 'flex', flexDirection: 'column', marginBottom: 20 } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "listing-list-view", style: { padding: 0, marginBottom: 0 } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "left", style: { padding: 25 } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "image" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: listingImage })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "right", style: { padding: '25px 0' } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "name", onClick: this.onSelect },
                            name
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "listing-wrapper" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__buy_components_ContentListingEventDetails__["a" /* default */], this.props),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__buy_components_ContentListingRightsPackage__["a" /* default */], { rightsPackage: rightsPackage })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "bid-listing-details" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                closedDeals.length,
                                " closed Deals"
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                openBids.length,
                                " open bids"
                            )
                        ),
                        bids.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item", style: { fontWeight: 600 } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                "Total: " + total.toLocaleString("en", { maximumFractionDigits: 2 }) + " ",
                                Object(__WEBPACK_IMPORTED_MODULE_6__actions_utils__["b" /* getCurrencySymbol */])(salesPackages[0].currency.code)
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "show-bundle", onClick: function onClick() {
                                    _this2.setState({ showSalesPackage: !showSalesPackage });
                                } },
                            !showSalesPackage && "Show sales bundle",
                            showSalesPackage && "Hide sales bundle",
                            !showSalesPackage && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_7__Icons__["b" /* addIcon */] }),
                            showSalesPackage && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_7__Icons__["g" /* cancelIcon */] })
                        )
                    )
                ),
                showSalesPackage && salesPackages.map(function (sb, i) {

                    var closed = sb.bids.filter(function (b) {
                        return b.status.name === "APPROVED";
                    });
                    var open = sb.bids.filter(function (b) {
                        return b.status.name === "PENDING";
                    });

                    if (hideWithoutBids && sb.bids.length === 0) return;
                    if (filterByOpenBids && open.length === 0) return;
                    if (filterByClosedDeals && closed.length === 0) return;

                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__main_components_CommercialSalesBundle__["a" /* default */], {
                        onUpdate: onUpdate,
                        onDelete: onDelete,
                        salesBundle: sb,
                        bidsOpen: bidsOpen,
                        company: company,
                        contentId: id,
                        key: i });
                })
            );
        }
    }]);

    return ContentListingCommercialActivity;
}(__WEBPACK_IMPORTED_MODULE_5__ContentListing__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (ContentListingCommercialActivity);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/ContentListingPendingBid.js":
/*!***********************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/ContentListingPendingBid.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_moment__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buy_components_ContentListingEventDetails__ = __webpack_require__(/*! ../../buy/components/ContentListingEventDetails */ "./src/AppBundle/Resources/public/javascript/buy/components/ContentListingEventDetails.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__buy_components_ContentListingRightsPackage__ = __webpack_require__(/*! ../../buy/components/ContentListingRightsPackage */ "./src/AppBundle/Resources/public/javascript/buy/components/ContentListingRightsPackage.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ContentListing__ = __webpack_require__(/*! ./ContentListing */ "./src/AppBundle/Resources/public/javascript/main/components/ContentListing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_components_SendMessage__ = __webpack_require__(/*! ../../main/components/SendMessage */ "./src/AppBundle/Resources/public/javascript/main/components/SendMessage.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_utils__ = __webpack_require__(/*! ../actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Icons__ = __webpack_require__(/*! ./Icons */ "./src/AppBundle/Resources/public/javascript/main/components/Icons.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var ContentListingPendingBid = function (_ContentListing) {
    _inherits(ContentListingPendingBid, _ContentListing);

    function ContentListingPendingBid(props) {
        _classCallCheck(this, ContentListingPendingBid);

        var _this = _possibleConstructorReturn(this, (ContentListingPendingBid.__proto__ || Object.getPrototypeOf(ContentListingPendingBid)).call(this, props));

        _this.state = {};
        _this.noImage = assetsBaseDir + "app/images/no-image.png";
        _this.bidIcon = assetsBaseDir + "app/images/hammer.png";
        _this.fixedIcon = assetsBaseDir + "app/images/bid.png";
        _this.blueCheck = assetsBaseDir + "app/images/blue_check.png";
        _this.yellowCheck = assetsBaseDir + "app/images/yellow_chech.png";
        _this.exclamationIcon = assetsBaseDir + "app/images/Exclamation.png";
        _this.envelopeIcon = assetsBaseDir + "app/images/envelope_2.png";
        return _this;
    }

    _createClass(ContentListingPendingBid, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                name = _props.name,
                expiresAt = _props.expiresAt,
                onDelete = _props.onDelete,
                rightsPackage = _props.rightsPackage,
                onSelectName = _props.onSelectName,
                imageBase64 = _props.imageBase64,
                image = _props.image,
                id = _props.id,
                company = _props.company,
                customId = _props.customId,
                bid = _props.bid,
                PROGRAM_NAME = _props.PROGRAM_NAME;
            var _state = this.state,
                showMessage = _state.showMessage,
                showEdited = _state.showEdited;


            var listingImage = imageBase64 ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "listing-list-view", style: { padding: 0 } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__main_components_SendMessage__["a" /* default */], { ref: "messagePopup" + id,
                    listingId: id,
                    recipient: company }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "left", style: { padding: 25 } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "image" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: listingImage })
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "right", style: { padding: '25px 0' } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "name", onClick: this.onSelect },
                        name
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { display: 'flex', alignItems: 'center' } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            "Expiry: ",
                            __WEBPACK_IMPORTED_MODULE_1_moment_moment___default()(expiresAt).format('DD/MM/YYYY')
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "custom-id" },
                            "#",
                            customId
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "company", onClick: function onClick(e) {
                                _this2.refs["messagePopup" + id].open();
                                e.stopPropagation();
                            } },
                        company.legalName,
                        " ",
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { marginLeft: 5 }, src: this.envelopeIcon })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { display: 'flex' } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "listing-wrapper", style: { flex: '1 0 0', overflow: 'auto' } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__buy_components_ContentListingEventDetails__["a" /* default */], this.props),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__buy_components_ContentListingRightsPackage__["a" /* default */], { rightsPackage: rightsPackage })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: {
                                    flex: '240px 0 0',
                                    backgroundColor: '#FAFBFC',
                                    borderLeft: '1px solid #E6E6E6',
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    paddingRop: 15,
                                    justifyContent: 'space-evenly',
                                    padding: '20px 0',
                                    position: 'relative'
                                } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: {
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '100%'
                                    } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_1_moment_moment___default()(bid.createdAt).format('DD/MM/YYYY')
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: {
                                        backgroundColor: '#fff',
                                        border: '1px solid lightgrey',
                                        padding: 10,
                                        margin: '0 20px'
                                    } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    bid.salesPackage.name
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: {
                                        fontSize: 24,
                                        fontWeight: 600,
                                        marginBottom: 10
                                    } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    bid.amount,
                                    " ",
                                    Object(__WEBPACK_IMPORTED_MODULE_6__actions_utils__["b" /* getCurrencySymbol */])(bid.salesPackage.currency.code)
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: {
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        position: 'relative'
                                    } },
                                bid.status.name === "EDITED" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_7__Icons__["n" /* infoIcon */],
                                    style: {
                                        marginRight: 5,
                                        cursor: 'pointer'
                                    },
                                    onMouseOver: function onMouseOver() {
                                        _this2.setState({ showEdited: true });
                                    },
                                    onMouseLeave: function onMouseLeave() {
                                        _this2.setState({ showEdited: false });
                                    } }),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "a",
                                    { className: "standard-button", style: {
                                            height: 36,
                                            fontSize: 16,
                                            marginBottom: 10
                                        }, href: envhosturl + "listing/" + customId + "/buy/" + bid.salesPackage.id },
                                    "Increase bid"
                                ),
                                bid.message && bid.message !== "" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_7__Icons__["e" /* blueEnvelopeIcon */],
                                    style: {
                                        marginLeft: 5,
                                        cursor: 'pointer'
                                    },
                                    onMouseOver: function onMouseOver() {
                                        _this2.setState({ showMessage: true });
                                    },
                                    onMouseLeave: function onMouseLeave() {
                                        _this2.setState({ showMessage: false });
                                    } }),
                                showMessage && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "status-tooltip" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "option" },
                                        bid.message
                                    )
                                ),
                                showEdited && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "status-tooltip" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { className: "option" },
                                        "Listing edited after last bid. Please review term sheet."
                                    )
                                )
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: {
                                        fontSize: 12,
                                        fontWeight: 600
                                    } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "span",
                                        { style: { fontWeight: 400, fontStyle: 'italic' } },
                                        "Placed by:"
                                    ),
                                    " " + bid.buyerUser.firstName + " " + bid.buyerUser.lastName
                                )
                            ),
                            bid.status.name === "REJECTED" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: {
                                        position: 'absolute',
                                        cursor: 'pointer',
                                        top: 20,
                                        right: 20
                                    }, onClick: function onClick(e) {
                                        _this2.setState({ showRemoveConfirm: true });
                                        e.stopPropagation();
                                    } },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_7__Icons__["f" /* bucketIcon */] })
                            ),
                            this.state.showRemoveConfirm && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "confirmation-tooltip" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "confirmation-text" },
                                    "Are you sure you want to remove this bid?"
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "button",
                                    { className: "button button-confirm", onClick: function onClick(e) {
                                            _this2.setState({ showRemoveConfirm: false });
                                            onDelete(bid.id);
                                            e.stopPropagation();
                                        } },
                                    "Remove"
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "button",
                                    { className: "button", onClick: function onClick(e) {
                                            _this2.setState({ showRemoveConfirm: false });
                                            e.stopPropagation();
                                        } },
                                    "Cancel"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ContentListingPendingBid;
}(__WEBPACK_IMPORTED_MODULE_4__ContentListing__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (ContentListingPendingBid);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/CountrySelector.js":
/*!**************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/CountrySelector.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_select__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var CountrySelector = function (_React$Component) {
    _inherits(CountrySelector, _React$Component);

    function CountrySelector(props) {
        _classCallCheck(this, CountrySelector);

        var _this2 = _possibleConstructorReturn(this, (CountrySelector.__proto__ || Object.getPrototypeOf(CountrySelector)).call(this, props));

        _this2.getOptions = function () {
            var _this2$props = _this2.props,
                _this2$props$filter = _this2$props.filter,
                filter = _this2$props$filter === undefined ? [] : _this2$props$filter,
                available = _this2$props.available;


            var countries = Object.values(ContentArena.Data.Countries).map(function (i, k) {
                return { value: i.name, label: i.name };
            });

            if (available && available.length > 0) countries = available.map(function (i, k) {
                return { value: i, label: i };
            });

            countries = countries.filter(function (country) {
                return filter.indexOf(country.value) === -1;
            });

            return countries;
        };

        _this2.state = {
            countries: []
        };
        return _this2;
    }

    _createClass(CountrySelector, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;
            if (ContentArena.Data.Countries.length === 0) {
                ContentArena.Api.getCountries().done(function (countries) {
                    ContentArena.Data.Countries = countries;
                    _this.setState({ countries: countries });
                });
            } else {
                _this.setState({ countries: ContentArena.Data.Countries });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                value = _props.value,
                onChange = _props.onChange,
                className = _props.className,
                _props$multi = _props.multi,
                multi = _props$multi === undefined ? true : _props$multi,
                _props$disabled = _props.disabled,
                disabled = _props$disabled === undefined ? false : _props$disabled;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_select__["a" /* default */], {
                className: className,
                name: 'form-field-name',
                onChange: onChange,
                disabled: disabled,
                value: value.length > 200 ? [] : value,
                multi: multi,
                options: this.getOptions()
            });
        }
    }]);

    return CountrySelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (CountrySelector);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/DigitalSignature.js":
/*!***************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/DigitalSignature.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_signature_pad__ = __webpack_require__(/*! react-signature-pad */ "./node_modules/react-signature-pad/lib/app.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_signature_pad___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_signature_pad__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var DigitalSignature = function (_React$Component) {
    _inherits(DigitalSignature, _React$Component);

    function DigitalSignature(props) {
        _classCallCheck(this, DigitalSignature);

        var _this = _possibleConstructorReturn(this, (DigitalSignature.__proto__ || Object.getPrototypeOf(DigitalSignature)).call(this, props));

        _this.clear = function () {
            _this.refs.signature.clear();
        };

        _this.done = function () {
            var blank = _this.state.blank;
            var onReady = _this.props.onReady;
            var signature = _this.refs.signature;


            var data = signature.toDataURL();

            if (data === blank) return;

            _this.setState({ ready: true });
            if (onReady) onReady(data);
        };

        _this.edit = function () {
            var onReady = _this.props.onReady;

            _this.setState({ ready: false });
            if (onReady) onReady(null);
        };

        _this.state = {
            ready: false
        };
        return _this;
    }

    _createClass(DigitalSignature, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ blank: this.refs.signature.toDataURL() });
        }
    }, {
        key: 'render',
        value: function render() {
            var signature = this.props.signature;
            var ready = this.state.ready;


            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'digital-signature' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "digital-signature-placeholder" },
                    'Digital Signature'
                ),
                signature && ready && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { style: { width: 800, height: 300, margin: '0 auto' }, src: signature }),
                !ready && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_signature_pad___default.a, { ref: 'signature' }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "buttons" },
                    !ready && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: this.clear, className: 'standard-button-small transparent' },
                        'Clear'
                    ),
                    !ready && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: this.done, className: 'standard-button-small' },
                        'Done'
                    ),
                    ready && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: this.edit, className: 'standard-button-big' },
                        'New Signature'
                    )
                )
            );
        }
    }]);

    return DigitalSignature;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (DigitalSignature);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/HeaderBar.js":
/*!********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/HeaderBar.js ***!
  \********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HistoryButton__ = __webpack_require__(/*! ./HistoryButton */ "./src/AppBundle/Resources/public/javascript/main/components/HistoryButton.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_utils__ = __webpack_require__(/*! ../actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var HeaderBarTab = function HeaderBarTab(_ref) {
    var tabName = _ref.tabName,
        activeTab = _ref.activeTab,
        children = _ref.children,
        route = _ref.route;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: tabName === activeTab ? "tab active-tab" : "tab",
            onClick: function onClick() {
                if (route) {
                    Object(__WEBPACK_IMPORTED_MODULE_2__actions_utils__["e" /* goTo */])(route);
                };
            } },
        children
    );
};

var HeaderBar = function (_React$Component) {
    _inherits(HeaderBar, _React$Component);

    function HeaderBar(props) {
        _classCallCheck(this, HeaderBar);

        var _this = _possibleConstructorReturn(this, (HeaderBar.__proto__ || Object.getPrototypeOf(HeaderBar)).call(this, props));

        _this.getLogoUrl = function (tab) {
            var logoUrl = '';
            if (tab === 'MANAGE_LISTINGS') {
                logoUrl = 'managelistings';
            }
            if (tab === 'MARKETPLACE') {
                logoUrl = 'marketplace';
            }
            return logoUrl;
        };

        _this.state = {};
        return _this;
    }

    _createClass(HeaderBar, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                tab = _props.tab,
                profile = _props.profile;

            var logoUrl = this.getLogoUrl(tab);

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'manager-header' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'logo', onClick: function onClick() {
                            return Object(__WEBPACK_IMPORTED_MODULE_2__actions_utils__["e" /* goTo */])(logoUrl);
                        } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: assetsBaseDir + "app/images/logo.png", alt: '' })
                ),
                profile === "BUYER" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    HeaderBarTab,
                    {
                        tabName: "MARKETPLACE",
                        route: "marketplace",
                        activeTab: tab },
                    'Marketplace'
                ),
                profile === "BUYER" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    HeaderBarTab,
                    {
                        tabName: "WATCHLIST",
                        route: "watchlist",
                        activeTab: tab },
                    'Watchlist'
                ),
                profile === "BUYER" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    HeaderBarTab,
                    {
                        tabName: "BIDS",
                        route: "bids/activebids",
                        activeTab: tab },
                    'Bids'
                ),
                profile === "BUYER" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    HeaderBarTab,
                    {
                        tabName: "CLOSED_DEALS",
                        route: "closeddeals",
                        activeTab: tab },
                    'Closed deals'
                ),
                profile === "SELLER" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    HeaderBarTab,
                    {
                        tabName: "MANAGE_LISTINGS",
                        route: "managelistings",
                        activeTab: tab },
                    'Manage listings'
                ),
                profile === "SELLER" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    HeaderBarTab,
                    {
                        tabName: "COMMERCIAL_ACTIVITY",
                        route: "commercialactivity",
                        activeTab: tab },
                    'Commercial activity'
                ),
                profile === "SELLER" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    HeaderBarTab,
                    {
                        tabName: "NEW_LISTING",
                        route: "managelistings/new",
                        activeTab: tab },
                    'Create Listing'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'spacer' }),
                profile === "BUYER" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_1__HistoryButton__["a" /* default */],
                    {
                        className: 'tab',
                        onClick: function onClick() {
                            Object(__WEBPACK_IMPORTED_MODULE_2__actions_utils__["e" /* goTo */])("managelistings");
                        },
                        path: 'managelistings' },
                    'Enter selling mode'
                ),
                profile === "SELLER" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_1__HistoryButton__["a" /* default */],
                    { className: 'tab', onClick: function onClick() {
                            Object(__WEBPACK_IMPORTED_MODULE_2__actions_utils__["e" /* goTo */])("marketplace");
                        }, path: 'marketplace' },
                    'Enter buying mode'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_1__HistoryButton__["a" /* default */],
                    { className: 'tab', onClick: function onClick() {
                            Object(__WEBPACK_IMPORTED_MODULE_2__actions_utils__["e" /* goTo */])("messages?profile=" + profile);
                        }, path: 'messages' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-envelope' }),
                    ' Messages'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'settings' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-2x fa-gear' }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'popup' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'wrap' },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                __WEBPACK_IMPORTED_MODULE_1__HistoryButton__["a" /* default */],
                                { className: 'tab', onClick: function onClick() {
                                        Object(__WEBPACK_IMPORTED_MODULE_2__actions_utils__["e" /* goTo */])("settings?profile=" + profile);
                                    }, path: 'settings' },
                                'Settings'
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'a',
                                { href: '/logout', className: 'tab' },
                                'Logout'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return HeaderBar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (HeaderBar);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/HistoryButton.js":
/*!************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/HistoryButton.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var HistoryButton = function (_React$Component) {
    _inherits(HistoryButton, _React$Component);

    function HistoryButton(props) {
        _classCallCheck(this, HistoryButton);

        var _this = _possibleConstructorReturn(this, (HistoryButton.__proto__ || Object.getPrototypeOf(HistoryButton)).call(this, props));

        _this.handleClick = function () {
            var _this$props = _this.props,
                onClick = _this$props.onClick,
                path = _this$props.path;


            window.history.pushState("test", "Title", envhosturl + path);
            onClick();
        };

        _this.onBackButtonEvent = function (e) {
            e.preventDefault();
        };

        _this.componentDidMount = function () {
            window.onpopstate = _this.onBackButtonEvent;
        };

        _this.state = {};
        return _this;
    }

    _createClass(HistoryButton, [{
        key: "render",
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "button",
                _extends({}, this.props, { onClick: this.handleClick }),
                this.props.children
            );
        }
    }]);

    return HistoryButton;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (HistoryButton);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/Icons.js":
/*!****************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/Icons.js ***!
  \****************************************************************************/
/*! exports provided: cancelIcon, bucketIcon, addIcon, exclamationRoundIcon, clockRoundIcon, playIcon, blueCheckIcon, yellowCheckIcon, bidIcon, fixedIcon, docIcon, pdfIcon, editIcon, blueEnvelopeIcon, infoIcon, soldIcon, expiredIcon, Spinner */
/*! exports used: Spinner, addIcon, bidIcon, blueCheckIcon, blueEnvelopeIcon, bucketIcon, cancelIcon, clockRoundIcon, docIcon, editIcon, exclamationRoundIcon, expiredIcon, fixedIcon, infoIcon, pdfIcon, playIcon, soldIcon, yellowCheckIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return cancelIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return bucketIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return exclamationRoundIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return clockRoundIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return playIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return blueCheckIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return yellowCheckIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return bidIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return fixedIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return docIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return pdfIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return editIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return blueEnvelopeIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return infoIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return soldIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return expiredIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Spinner; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var cancelIcon = assetsBaseDir + "app/images/cancel.png";
var bucketIcon = assetsBaseDir + "app/images/bucket.png";
var addIcon = assetsBaseDir + "app/images/add.png";
var exclamationRoundIcon = assetsBaseDir + "app/images/exclamation_round.png";
var clockRoundIcon = assetsBaseDir + "app/images/clock.png";
var playIcon = assetsBaseDir + "app/images/play.png";
var blueCheckIcon = assetsBaseDir + "app/images/blue_check.png";
var yellowCheckIcon = assetsBaseDir + "app/images/yellow_chech.png";
var bidIcon = assetsBaseDir + "app/images/hammer.png";
var fixedIcon = assetsBaseDir + "app/images/bid.png";
var docIcon = assetsBaseDir + "app/images/doc.png";
var pdfIcon = assetsBaseDir + "app/images/pdf.png";
var editIcon = assetsBaseDir + "app/images/edit.png";
var blueEnvelopeIcon = assetsBaseDir + "app/images/envelope_2.png";
var infoIcon = assetsBaseDir + "app/images/info_blue.png";
var soldIcon = assetsBaseDir + "app/images/sold.png";
var expiredIcon = assetsBaseDir + "app/images/expired.png";

var Spinner = function Spinner(_ref) {
    var test = _ref.test;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" })
    );
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/SendMessage.js":
/*!**********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/SendMessage.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_modal__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_custom__ = __webpack_require__(/*! ../styles/custom */ "./src/AppBundle/Resources/public/javascript/main/styles/custom.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sell_actions_validationActions__ = __webpack_require__(/*! ../../sell/actions/validationActions */ "./src/AppBundle/Resources/public/javascript/sell/actions/validationActions.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var SendMessage = function (_React$Component) {
    _inherits(SendMessage, _React$Component);

    function SendMessage(props) {
        _classCallCheck(this, SendMessage);

        var _this = _possibleConstructorReturn(this, (SendMessage.__proto__ || Object.getPrototypeOf(SendMessage)).call(this, props));

        _this.open = function () {
            _this.setState({ isOpen: true });
        };

        _this.close = function () {
            _this.setState({ isOpen: false, showSuccess: false });
        };

        _this.send = function () {
            var _this$props = _this.props,
                listingId = _this$props.listingId,
                recipient = _this$props.recipient,
                role = _this$props.role;


            var message = {
                content: _this.state.message,
                listing: listingId,
                recipient: recipient.id,
                role: role || "BUYER"
            };

            _this.setState({ saving: true });

            ContentArena.ContentApi.sendMessage(message).done(function (r) {
                _this.setState({ saving: false, showSuccess: true, message: null });
            });
        };

        _this.state = {
            isOpen: props.isOpen
        };
        return _this;
    }

    _createClass(SendMessage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var recipient = this.props.recipient;
            var _state = this.state,
                showSuccess = _state.showSuccess,
                saving = _state.saving,
                message = _state.message;


            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_1_react_modal___default.a,
                {
                    isOpen: this.state.isOpen,
                    onRequestClose: this.close,
                    bodyOpenClassName: "generic-modal",
                    style: __WEBPACK_IMPORTED_MODULE_2__styles_custom__["a" /* GenericModalStyle */]
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "generic-modal-container" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'title' },
                        'Contact ',
                        recipient.legalName
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'container' },
                        !saving && !showSuccess && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { onChange: function onChange(e) {
                                _this2.setState({ message: e.target.value });
                            }, value: message }),
                        saving && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                        ),
                        showSuccess && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            null,
                            'Message sent!'
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: "buttons" },
                        !saving && !showSuccess && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'button',
                            { className: "confirm", disabled: !message, onClick: this.send },
                            'Send'
                        ),
                        !showSuccess && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'button',
                            { onClick: this.close },
                            'Cancel'
                        ),
                        showSuccess && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'button',
                            { className: "confirm", onClick: this.close },
                            'Close'
                        )
                    )
                )
            );
        }
    }]);

    return SendMessage;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (SendMessage);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/styles/custom.js":
/*!*************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/styles/custom.js ***!
  \*************************************************************************/
/*! exports provided: customStyles, SelectorModalStyle, GenericModalStyle */
/*! exports used: GenericModalStyle, SelectorModalStyle, customStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return customStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SelectorModalStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenericModalStyle; });
var customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#F4F6F9',
        border: 'none',
        borderRadius: 0,
        borderBottom: '4px solid #2AAAEC'
    },
    overlay: {
        zIndex: 100
    }
};

var SelectorModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#F4F6F9',
        border: 'none',
        borderRadius: 0,
        borderBottom: '4px solid #2AAAEC',
        padding: "20px"
    },
    overlay: {
        zIndex: 100
    }
};

var GenericModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFFFFF',
        border: 'none',
        borderRadius: 0,
        padding: "20px"
    },
    overlay: {
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/components/BoardListing.js":
/*!*************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/components/BoardListing.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_moment__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buy_components_ContentListingEventDetails__ = __webpack_require__(/*! ../../buy/components/ContentListingEventDetails */ "./src/AppBundle/Resources/public/javascript/buy/components/ContentListingEventDetails.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_actions_utils__ = __webpack_require__(/*! ../../main/actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_components_Icons__ = __webpack_require__(/*! ../../main/components/Icons */ "./src/AppBundle/Resources/public/javascript/main/components/Icons.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sell_components_SuperRightDefinitions__ = __webpack_require__(/*! ../../sell/components/SuperRightDefinitions */ "./src/AppBundle/Resources/public/javascript/sell/components/SuperRightDefinitions.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var BoardListing = function (_React$Component) {
    _inherits(BoardListing, _React$Component);

    function BoardListing(props) {
        _classCallCheck(this, BoardListing);

        var _this = _possibleConstructorReturn(this, (BoardListing.__proto__ || Object.getPrototypeOf(BoardListing)).call(this, props));

        _this.onSelect = function () {
            var _this$props = _this.props,
                onSelect = _this$props.onSelect,
                customId = _this$props.customId;


            if (onSelect) onSelect(customId);
        };

        _this.toggleOptions = function (e) {
            _this.setState({ showOptions: !_this.state.showOptions });
            e.stopPropagation();
        };

        _this.edit = function () {
            var customId = _this.props.customId;

            Object(__WEBPACK_IMPORTED_MODULE_3__main_actions_utils__["e" /* goTo */])("managelistings/edit/" + customId);
        };

        _this.submit = function () {
            var customId = _this.props.customId;

            Object(__WEBPACK_IMPORTED_MODULE_3__main_actions_utils__["e" /* goTo */])("managelistings/edit/" + customId + "/5");
        };

        _this.view = function () {
            var customId = _this.props.customId;

            Object(__WEBPACK_IMPORTED_MODULE_3__main_actions_utils__["e" /* goTo */])("listing/" + customId, true);
        };

        _this.hideOptions = function (e) {
            var defaultAction = _this.props.defaultAction;
            var showOptions = _this.state.showOptions;

            _this.setState({ showOptions: false });
            if (defaultAction && !showOptions) {
                if (defaultAction === "EDIT") {
                    _this.edit();
                }

                if (defaultAction === "VIEW") {
                    _this.view();
                }

                if (defaultAction === "SUBMIT") {
                    _this.submit();
                }
            }

            e.stopPropagation();
        };

        _this.state = {
            showOptions: false,
            showRemoveConfirm: false,
            showDeactivateConfirm: false
        };
        _this.clockIcon = assetsBaseDir + "app/images/clock.png";
        _this.exclamationIcon = assetsBaseDir + "app/images/exclamation_round.png";
        _this.playIcon = assetsBaseDir + "app/images/play.png";
        _this.bucketIcon = assetsBaseDir + "app/images/bucket_blue.png";
        _this.editIcon = assetsBaseDir + "app/images/edit.png";
        _this.duplicateIcon = assetsBaseDir + "app/images/duplicate.png";
        _this.viewIcon = assetsBaseDir + "app/images/search.png";
        _this.submitIcon = assetsBaseDir + "app/images/submit.png";
        _this.dotsIcon = assetsBaseDir + "app/images/dots.png";
        _this.deactivateIcon = assetsBaseDir + "app/images/close_red.png";
        return _this;
    }

    _createClass(BoardListing, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                PROGRAM_NAME = _props.PROGRAM_NAME,
                name = _props.name,
                customId = _props.customId,
                expiresAt = _props.expiresAt,
                salesPackages = _props.salesPackages,
                rightsPackage = _props.rightsPackage,
                tournament = _props.tournament,
                seasons = _props.seasons,
                className = _props.className,
                showEdit = _props.showEdit,
                showRemove = _props.showRemove,
                showSubmit = _props.showSubmit,
                showDuplicate = _props.showDuplicate,
                showDeactivate = _props.showDeactivate,
                showView = _props.showView,
                onRemove = _props.onRemove,
                onDuplicate = _props.onDuplicate,
                onDeactivate = _props.onDeactivate,
                lastAction = _props.lastAction,
                lastActionDate = _props.lastActionDate,
                lastActionUser = _props.lastActionUser,
                owner = _props.owner,
                status = _props.status,
                onSubmit = _props.onSubmit,
                style = _props.style;
            var _state = this.state,
                showOptions = _state.showOptions,
                showRemoveConfirm = _state.showRemoveConfirm,
                showDeactivateConfirm = _state.showDeactivateConfirm,
                showStatusInfo = _state.showStatusInfo;


            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: className, style: style, onClick: this.hideOptions },
                showOptions && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "options-tooltip" },
                    showSubmit && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "option", onClick: this.submit },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: this.submitIcon }),
                        " Submit"
                    ),
                    showEdit && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "option", onClick: this.edit },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: this.editIcon }),
                        " Edit"
                    ),
                    showDuplicate && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "option", onClick: function onClick() {
                                _this2.setState({ showOptions: false });
                                onDuplicate(customId);
                            } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: this.duplicateIcon }),
                        " Duplicate"
                    ),
                    showView && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "option", onClick: this.view },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: this.viewIcon }),
                        " View"
                    ),
                    showRemove && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "option", onClick: function onClick() {
                                _this2.setState({ showRemoveConfirm: true });
                            } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: this.bucketIcon }),
                        " Remove"
                    ),
                    showDeactivate && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "option", onClick: function onClick() {
                                _this2.setState({ showDeactivateConfirm: true });
                            } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: this.deactivateIcon, style: { width: 16 } }),
                        " Deactivate"
                    ),
                    lastAction && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "last-action" },
                        "Last action: ",
                        lastAction.description,
                        " ",
                        lastActionUser && "by " + lastActionUser.firstName + " " + lastActionUser.lastName,
                        " ",
                        lastActionDate && "on " + __WEBPACK_IMPORTED_MODULE_1_moment_moment___default()(lastActionDate).format('HH:mm DD/MM/YYYY')
                    ),
                    owner && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "last-action" },
                        "Listing Owner: ",
                        owner.firstName + " " + owner.lastName
                    )
                ),
                showDeactivateConfirm && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "confirmation-tooltip" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "confirmation-text" },
                        "Are you sure you want to deactivate the listing?"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { className: "button button-confirm", onClick: function onClick(e) {
                                _this2.setState({ showDeactivateConfirm: false });
                                onDeactivate();
                                e.stopPropagation();
                            } },
                        "Deactivate"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { className: "button", onClick: function onClick(e) {
                                _this2.setState({ showDeactivateConfirm: false });
                                e.stopPropagation();
                            } },
                        "Cancel"
                    )
                ),
                showRemoveConfirm && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "confirmation-tooltip" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "confirmation-text" },
                        "Are you sure you want to remove the listing?"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { className: "button button-confirm", onClick: function onClick(e) {
                                _this2.setState({ showRemoveConfirm: false });
                                onRemove();
                                e.stopPropagation();
                            } },
                        "Remove"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { className: "button", onClick: function onClick(e) {
                                _this2.setState({ showRemoveConfirm: false });
                                e.stopPropagation();
                            } },
                        "Cancel"
                    )
                ),
                showStatusInfo && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "status-tooltip" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "option" },
                        status.name === 'PENDING' && "Listing under review. Not visible in the marketplace yet.",
                        status.name === 'INACTIVE' && "Listing is deactivated.",
                        status.name === 'REJECTED' && "Listing rejected. Please edit or contact support.",
                        status.name === 'EXPIRED' && "This listing has expired.",
                        status.name === 'SOLD_OUT' && "All sales bundle of this listing were sold."
                    )
                ),
                status.name !== 'DRAFT' && status.name !== 'APPROVED' && status.name !== 'EDITED' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    {
                        className: "status-icon",
                        onMouseOver: function onMouseOver() {
                            _this2.setState({ showStatusInfo: true });
                        },
                        onMouseLeave: function onMouseLeave() {
                            _this2.setState({ showStatusInfo: false });
                        } },
                    status.name === 'PENDING' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_4__main_components_Icons__["h" /* clockRoundIcon */] }),
                    status.name === 'INACTIVE' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_4__main_components_Icons__["p" /* playIcon */] }),
                    status.name === 'REJECTED' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_4__main_components_Icons__["k" /* exclamationRoundIcon */] }),
                    status.name === 'EXPIRED' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_4__main_components_Icons__["l" /* expiredIcon */] }),
                    status.name === 'SOLD_OUT' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_4__main_components_Icons__["q" /* soldIcon */] })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "menu-icon", onClick: this.toggleOptions },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: this.dotsIcon })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "name" },
                    name
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "tournament" },
                    tournament && tournament.length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "item" },
                        tournament[0].name
                    ),
                    tournament && tournament.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "item" },
                        "General content"
                    ),
                    seasons && seasons.length > 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "item" },
                        "Season: Multiple seasons"
                    ),
                    seasons && seasons.length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "item" },
                        "Season: ",
                        seasons[0].year
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "rights" },
                    rightsPackage && rightsPackage.map(function (rp, i, l) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            { key: "rp-" + i },
                            !rp.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_4__main_components_Icons__["d" /* blueCheckIcon */] }),
                            rp.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_4__main_components_Icons__["r" /* yellowCheckIcon */] }),
                            __WEBPACK_IMPORTED_MODULE_5__sell_components_SuperRightDefinitions__["a" /* SuperRightBoardLabels */][rp.shortLabel],
                            rp.shortLabel === "PR" && PROGRAM_NAME && "Program: " + PROGRAM_NAME
                        );
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "expiry" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        salesPackages.length,
                        " sales bundle",
                        salesPackages.length > 1 && "s"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        "Expiry: ",
                        expiresAt ? __WEBPACK_IMPORTED_MODULE_1_moment_moment___default()(expiresAt).format('DD/MM/YYYY') : 'Not set'
                    )
                )
            );
        }
    }]);

    return BoardListing;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (BoardListing);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/containers/ClosedDeals.js":
/*!************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/containers/ClosedDeals.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_table__ = __webpack_require__(/*! react-table */ "./node_modules/react-table/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_components_ContentListing__ = __webpack_require__(/*! ../../main/components/ContentListing */ "./src/AppBundle/Resources/public/javascript/main/components/ContentListing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_components_SendMessage__ = __webpack_require__(/*! ../../main/components/SendMessage */ "./src/AppBundle/Resources/public/javascript/main/components/SendMessage.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_actions_utils__ = __webpack_require__(/*! ../../main/actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment_moment__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_tooltip__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_tooltip__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var rightImageStyle = {
    width: 17,
    height: 17
};

var ClosedDeals = function (_React$Component) {
    _inherits(ClosedDeals, _React$Component);

    function ClosedDeals(props) {
        _classCallCheck(this, ClosedDeals);

        var _this2 = _possibleConstructorReturn(this, (ClosedDeals.__proto__ || Object.getPrototypeOf(ClosedDeals)).call(this, props));

        _this2.selectListing = function (id) {
            Object(__WEBPACK_IMPORTED_MODULE_5__main_actions_utils__["e" /* goTo */])("listing/" + id);
        };

        _this2.state = {
            loading: false,
            bids: []
        };
        _this2.cancelIcon = assetsBaseDir + "app/images/cancel.png";
        _this2.checkIcon = assetsBaseDir + "app/images/blue_check.png";
        _this2.docIcon = assetsBaseDir + "app/images/doc.png";
        _this2.blueEnvelopeIcon = assetsBaseDir + "app/images/envelope_2.png";
        return _this2;
    }

    _createClass(ClosedDeals, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this = this;
            this.setState({ loading: true });
            ContentArena.ContentApi.getClosedDeals().done(function (bids) {
                _this.setState({ bids: bids, loading: false });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                loading = _state.loading,
                bids = _state.bids;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { style: {
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
                    } },
                bids.length > 0 && bids.map(function (b, i) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__main_components_SendMessage__["a" /* default */], { key: i,
                        ref: "messagePopup" + b.id,
                        listingId: b.content.id,
                        recipient: b.content.company });
                }),
                bids.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_table__["default"], {
                        className: "ca-table",
                        defaultPageSize: 30,
                        showPageSizeOptions: false,
                        showPagination: false,
                        onPageChange: this.onPageChange,
                        minRows: 0,
                        resizable: false,
                        data: bids,
                        select: this.props.select,
                        columns: [{
                            Header: 'Deal ID',
                            headerClassName: 'table-header',
                            className: 'table-header table-header-left',
                            accessor: 'customId',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    "#" + props.value
                                );
                            }
                        }, {
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    null,
                                    "Listing name ",
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-sort" })
                                );
                            },
                            headerClassName: 'table-header-big',
                            className: 'table-header-big sorting',
                            id: 'name',
                            accessor: function accessor(d) {
                                return {
                                    name: d.content.name,
                                    customId: d.content.customId
                                };
                            },
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "a",
                                        { href: "listing/" + props.value.customId },
                                        Object(__WEBPACK_IMPORTED_MODULE_5__main_actions_utils__["j" /* limitText */])(props.value.name)
                                    )
                                );
                            }
                        }, {
                            accessor: 'content.company.legalName', // Required because our accessor is not a string
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    null,
                                    "Seller ",
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-sort" })
                                );
                            },
                            headerClassName: 'table-header-big',
                            className: 'table-header-big'
                        }, {
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    { "data-tip": "Live transmission" },
                                    "LT"
                                );
                            },
                            accessor: 'content.rightsPackage',
                            headerClassName: 'table-header-small',
                            className: 'table-header-small',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    {
                                        className: "blue" },
                                    props.value.map(function (r) {
                                        return r.shortLabel;
                                    }).indexOf("LT") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.checkIcon })
                                );
                            }
                        }, {
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    { "data-tip": "Live betting" },
                                    "LB"
                                );
                            },
                            accessor: 'content.rightsPackage',
                            headerClassName: 'table-header-small',
                            className: 'table-header-small',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    {
                                        className: "blue" },
                                    props.value.map(function (r) {
                                        return r.shortLabel;
                                    }).indexOf("HL") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.checkIcon })
                                );
                            }
                        }, {
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    { "data-tip": "Delayed transmission" },
                                    "DT"
                                );
                            },
                            accessor: 'content.rightsPackage',
                            headerClassName: 'table-header-small',
                            className: 'table-header-small',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    {
                                        className: "blue" },
                                    props.value.map(function (r) {
                                        return r.shortLabel;
                                    }).indexOf("DT") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.checkIcon })
                                );
                            }
                        }, {
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    { "data-tip": "Highlights" },
                                    "HL"
                                );
                            },
                            accessor: 'content.rightsPackage',
                            headerClassName: 'table-header-small',
                            className: 'table-header-small',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    {
                                        className: "blue" },
                                    props.value.map(function (r) {
                                        return r.shortLabel;
                                    }).indexOf("HL") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.checkIcon })
                                );
                            }
                        }, {
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    { "data-tip": "News access" },
                                    "NA"
                                );
                            },
                            accessor: 'content.rightsPackage',
                            headerClassName: 'table-header-small',
                            className: 'table-header-small',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    {
                                        className: "blue" },
                                    props.value.map(function (r) {
                                        return r.shortLabel;
                                    }).indexOf("NA") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.checkIcon })
                                );
                            }
                        }, {
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    { "data-tip": "Program" },
                                    "PR"
                                );
                            },
                            accessor: 'content.rightsPackage',
                            headerClassName: 'table-header-small',
                            className: 'table-header-small',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    {
                                        className: "blue" },
                                    props.value.map(function (r) {
                                        return r.shortLabel;
                                    }).indexOf("PR") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.checkIcon })
                                );
                            }
                        }, {
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    null,
                                    "Territories ",
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-sort" })
                                );
                            },
                            headerClassName: 'table-header',
                            className: 'table-header',
                            id: "territories",
                            accessor: function accessor(d) {
                                return {
                                    size: d.salesPackage.territories.length,
                                    territories: d.salesPackage.territories,
                                    excludedCountries: d.salesPackage.excludedCountries,
                                    worldwide: d.salesPackage.territoriesMethod === "WORLDWIDE" && d.salesPackage.bundleMethod === "SELL_AS_BUNDLE",
                                    excluding: d.salesPackage.territoriesMethod === "WORLDWIDE_EXCLUDING" && d.salesPackage.bundleMethod === "SELL_AS_BUNDLE" && d.salesPackage.excludedCountries.length === 1
                                };
                            },
                            Cell: function Cell(props) {
                                var _props$value = props.value,
                                    size = _props$value.size,
                                    territories = _props$value.territories,
                                    worldwide = _props$value.worldwide,
                                    excluding = _props$value.excluding,
                                    excludedCountries = _props$value.excludedCountries;


                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "blue" },
                                    !worldwide && !excluding && size > 1 && size + " territories",
                                    !worldwide && !excluding && size === 1 && territories[0].name,
                                    excluding && "Worldwide excluding " + excludedCountries[0].name,
                                    worldwide && "Worldwide"
                                );
                            }
                        }, {
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    null,
                                    "Price ",
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-sort" })
                                );
                            },
                            headerClassName: 'table-header',
                            className: 'table-header',
                            id: "price",
                            accessor: function accessor(d) {
                                return { fee: d.totalFee, currency: d.salesPackage.currency.code };
                            },
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "blue" },
                                    props.value.fee + " " + Object(__WEBPACK_IMPORTED_MODULE_5__main_actions_utils__["b" /* getCurrencySymbol */])(props.value.currency)
                                );
                            }
                        }, {
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    null,
                                    "Date of sale ",
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-sort" })
                                );
                            },
                            headerClassName: 'table-header',
                            className: 'table-header',
                            accessor: 'createdAt',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    __WEBPACK_IMPORTED_MODULE_6_moment_moment___default()(props.value).format('DD/MM/YYYY')
                                );
                            }

                        }, {
                            Header: function Header() {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "span",
                                    null,
                                    "Buyer name ",
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-sort" })
                                );
                            },
                            headerClassName: 'table-header-big',
                            className: 'table-header-big',
                            accessor: 'buyerUser',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    props.value.firstName + " " + props.value.lastName
                                );
                            }

                        }, {
                            headerClassName: 'table-header',
                            className: 'table-header',
                            Header: 'Actions', // Custom header components!
                            id: 'header',
                            accessor: function accessor(d) {
                                return {
                                    id: d.id,
                                    customId: d.customId
                                };
                            },
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { margin: '0 10px', cursor: 'pointer' }, onClick: function onClick() {
                                            Object(__WEBPACK_IMPORTED_MODULE_5__main_actions_utils__["m" /* viewLicenseBid */])(props.value.customId);
                                        }, src: _this3.docIcon }),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { margin: '0 10px', cursor: 'pointer' }, onClick: function onClick() {
                                            _this3.refs["messagePopup" + props.value.id].open();
                                        }, src: _this3.blueEnvelopeIcon })
                                );
                            }
                        }]
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_react_tooltip___default.a, { place: "top", type: "dark", effect: "solid" })
                ),
                bids.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "manager-content-message" },
                    loading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "big-spinner" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" })
                    ),
                    !loading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "big-spinner", style: {
                                fontSize: 30
                            } },
                        "You don't have closed deal yet"
                    )
                )
            );
        }
    }]);

    return ClosedDeals;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(ClosedDeals));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/containers/CommercialActivity.js":
/*!*******************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/containers/CommercialActivity.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_select__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.es.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_components_ContentListingCommercialActivity__ = __webpack_require__(/*! ../../main/components/ContentListingCommercialActivity */ "./src/AppBundle/Resources/public/javascript/main/components/ContentListingCommercialActivity.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_actions_utils__ = __webpack_require__(/*! ../../main/actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_languages__ = __webpack_require__(/*! ../../../data/languages */ "./src/AppBundle/Resources/public/data/languages.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var CommercialActivity = function (_React$Component) {
    _inherits(CommercialActivity, _React$Component);

    function CommercialActivity(props) {
        _classCallCheck(this, CommercialActivity);

        var _this2 = _possibleConstructorReturn(this, (CommercialActivity.__proto__ || Object.getPrototypeOf(CommercialActivity)).call(this, props));

        _this2.deleteBid = function (id) {
            ContentArena.ContentApi.removeBid({ id: id }).done(function (r) {
                _this2.update();
            });
        };

        _this2.update = function () {
            var _this = _this2;
            _this2.setState({ loading: true });

            ContentArena.ContentApi.getAllDeals().done(function (listings) {
                listings.forEach(function (l) {
                    return ContentArena.Utils.contentParserFromServer(l);
                });
                _this.setState({ listings: listings, loading: false });
            });
        };

        _this2.filterByListing = function (selected) {
            _this2.setState({
                selectedListings: selected ? [selected.value] : [],
                bidsOpen: true
            });
        };

        _this2.filtered = function () {
            var _this2$state = _this2.state,
                filter = _this2$state.filter,
                selectedListings = _this2$state.selectedListings;


            var listings = _this2.state.listings || [];

            if (selectedListings.length > 0) {
                listings = _this2.state.listings.filter(function (b) {
                    return selectedListings.indexOf(b.id) !== -1;
                });
            }

            switch (filter) {
                case "CLOSED":
                    return listings.filter(function (b) {
                        return b.salesPackages.filter(function (sp) {
                            return sp.bids.filter(function (b) {
                                return b.status.name === "APPROVED";
                            }).length > 0;
                        }).length > 0;
                    });
                case "OPEN":
                    return listings.filter(function (b) {
                        return b.salesPackages.filter(function (sp) {
                            return sp.bids.filter(function (b) {
                                return b.status.name === "PENDING";
                            }).length > 0;
                        }).length > 0;
                    });
                default:
                    return listings;

            }
        };

        _this2.remove = function (customId) {
            _this2.setState({
                listings: _this2.state.listings.filter(function (l) {
                    return l.customId !== customId;
                })
            });
        };

        _this2.state = {
            loading: false,
            listings: [],
            selectedListings: [],
            filter: 'ALL',
            bundlesOpen: false,
            bidsOpen: false

        };
        _this2.bulletIcon = assetsBaseDir + "app/images/bullet.png";
        _this2.activeBulletIcon = assetsBaseDir + "app/images/active_bullet.png";
        return _this2;
    }

    _createClass(CommercialActivity, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.update();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                loading = _state.loading,
                filter = _state.filter,
                selectedListings = _state.selectedListings;

            var listings = this.filtered();
            var allListings = this.state.listings;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { style: { height: '100%' } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "manager-filter-container" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: "listing-filter" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_select__["a" /* default */], {
                            name: 'form-field-name',
                            placeholder: 'All listings',
                            onChange: this.filterByListing,
                            multi: false,
                            value: selectedListings[0],
                            options: allListings.map(function (b) {
                                return { value: b.id, label: b.name };
                            })
                        })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: "status-filter" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: "status-filter-item",
                                onClick: function onClick() {
                                    _this3.setState({ filter: "ALL" });
                                } },
                            filter === "ALL" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: this.activeBulletIcon }),
                            filter !== "ALL" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: this.bulletIcon }),
                            'All bundles'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: "status-filter-item",
                                onClick: function onClick() {
                                    _this3.setState({ filter: 'ACTIVITY' });
                                } },
                            filter === "ACTIVITY" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: this.activeBulletIcon }),
                            filter !== "ACTIVITY" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: this.bulletIcon }),
                            'With activity'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: "status-filter-item",
                                onClick: function onClick() {
                                    _this3.setState({ filter: "OPEN" });
                                } },
                            filter === "OPEN" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: this.activeBulletIcon }),
                            filter !== "OPEN" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: this.bulletIcon }),
                            'Open Bids'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: "status-filter-item",
                                onClick: function onClick() {
                                    _this3.setState({ filter: 'CLOSED' });
                                } },
                            filter === "CLOSED" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: this.activeBulletIcon }),
                            filter !== "CLOSED" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: this.bulletIcon }),
                            'Closed deals'
                        )
                    )
                ),
                listings.length > 0 && listings.map(function (listing, i, list) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__main_components_ContentListingCommercialActivity__["a" /* default */], _extends({
                        onUpdate: _this3.update,
                        onDelete: _this3.deleteBid,
                        bidsOpen: list.length === 1 || _this3.state.filter !== "ALL",
                        bundlesOpen: list.length === 1 || _this3.state.filter !== "ALL",
                        hideWithoutBids: _this3.state.filter === "ACTIVITY",
                        filterByOpenBids: _this3.state.filter === "OPEN",
                        filterByClosedDeals: _this3.state.filter === "CLOSED",
                        onSelect: function onSelect(id) {
                            return Object(__WEBPACK_IMPORTED_MODULE_4__main_actions_utils__["g" /* goToListing */])(id, true);
                        },
                        key: i + "-" + listing.customId
                    }, listing));
                }),
                listings.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'manager-content-message' },
                    loading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'big-spinner' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    !loading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'big-spinner', style: {
                                fontSize: 30
                            } },
                        'You have no offers yet'
                    )
                )
            );
        }
    }]);

    return CommercialActivity;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(CommercialActivity));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/containers/ManageListings.js":
/*!***************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/containers/ManageListings.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_actions_utils__ = __webpack_require__(/*! ../../main/actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_BoardListing__ = __webpack_require__(/*! ../components/BoardListing */ "./src/AppBundle/Resources/public/javascript/manage/components/BoardListing.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var ManageListings = function (_React$Component) {
    _inherits(ManageListings, _React$Component);

    function ManageListings(props) {
        _classCallCheck(this, ManageListings);

        var _this2 = _possibleConstructorReturn(this, (ManageListings.__proto__ || Object.getPrototypeOf(ManageListings)).call(this, props));

        _this2.selectListing = function (id) {
            Object(__WEBPACK_IMPORTED_MODULE_2__main_actions_utils__["e" /* goTo */])("listing/" + id);
        };

        _this2.duplicate = function (customId) {
            var draft = _this2.state.draft;
            _this2.setState({ loadingDraft: true });
            ContentArena.ContentApi.duplicateListing(customId).done(function (response) {
                if (response.success) {
                    draft.unshift(response.listing);
                    _this2.setState({ draft: draft, loadingDraft: false });
                }
            });
        };

        _this2.deactivate = function (customId) {
            var inactive = _this2.state.inactive;
            _this2.setState({ loadingInactive: true });
            ContentArena.ContentApi.deactivateListing(customId).done(function (response) {
                if (response.success) {
                    //inactive.unshift(ContentArena.Utils.contentParserFromServer(response.listing));
                    inactive.unshift(response.listing);
                    _this2.setState({ inactive: inactive, loadingInactive: false });
                }
            });
        };

        _this2.state = {
            loading: false,
            loadingDraft: false,
            loadingInactive: false,
            loadingActive: false,
            loadingExpired: false,
            draft: [],
            active: [],
            inactive: [],
            expired: []
        };
        return _this2;
    }

    _createClass(ManageListings, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this = this;
            this.setState({
                loadingDraft: true,
                loadingInactive: true,
                loadingActive: true,
                loadingExpired: true
            });

            ContentArena.ContentApi.getDraftListings().done(function (listings) {
                listings = listings.map(function (listing) {
                    return ContentArena.Utils.contentParserFromServer(listing);
                });
                _this.setState({ draft: listings, loadingDraft: false });
            });

            ContentArena.ContentApi.getInactiveListings().done(function (listings) {
                listings = listings.map(function (listing) {
                    return ContentArena.Utils.contentParserFromServer(listing);
                });
                _this.setState({ inactive: listings, loadingInactive: false });
            });

            ContentArena.ContentApi.getActiveListings().done(function (listings) {
                listings = listings.map(function (listing) {
                    return ContentArena.Utils.contentParserFromServer(listing);
                });
                _this.setState({ active: listings, loadingActive: false });
            });

            ContentArena.ContentApi.getExpiredListings().done(function (listings) {
                listings = listings.map(function (listing) {
                    return ContentArena.Utils.contentParserFromServer(listing);
                });
                _this.setState({ expired: listings, loadingExpired: false });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                loadingDraft = _state.loadingDraft,
                loadingActive = _state.loadingActive,
                loadingExpired = _state.loadingExpired,
                loadingInactive = _state.loadingInactive,
                draft = _state.draft,
                active = _state.active,
                inactive = _state.inactive,
                expired = _state.expired;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { style: {
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
                    } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { style: {
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '0 0 5px',
                            color: '#4F4F4F',
                            fontSize: 16,
                            fontWeight: 600,
                            alignItems: 'center',
                            marginTop: '-15px'

                        } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { margin: '0 20px', flex: 1, display: 'flex', alignItems: 'center' } },
                        "Draft (",
                        draft.length,
                        ")"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { margin: '0 20px', flex: 1 } },
                        "Inactive listings (",
                        inactive.length,
                        ")"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { margin: '0 20px', flex: 1 } },
                        "Active listings (",
                        active.length,
                        ")"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { margin: '0 20px', flex: 1 } },
                        "Expired & sold listings (",
                        expired.length,
                        ")"
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "board" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "column" },
                        loadingDraft && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "medium-spinner" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" })
                        ),
                        draft.length > 0 && draft.map(function (listing, i, list) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_BoardListing__["a" /* default */], _extends({
                                key: "draft-" + i,
                                className: "listing",
                                style: {
                                    zIndex: list.length - i
                                },
                                defaultAction: "EDIT",
                                showEdit: true,
                                showRemove: true,
                                showDuplicate: true,
                                showView: false,
                                onRemove: function onRemove() {
                                    list.splice(i, 1);
                                    _this3.setState({ draft: list });
                                    ContentArena.ContentApi.removeListing(listing.customId);
                                },
                                onDuplicate: _this3.duplicate
                            }, listing));
                        })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "column" },
                        loadingInactive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "medium-spinner" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" })
                        ),
                        inactive.length > 0 && inactive.map(function (listing, i, list) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_BoardListing__["a" /* default */], _extends({
                                key: "inactive-" + i,
                                className: "listing",
                                style: {
                                    zIndex: list.length - i
                                },
                                defaultAction: "SUBMIT",
                                showEdit: true,
                                showRemove: true,
                                showDuplicate: true,
                                showSubmit: true,
                                showView: true,
                                onRemove: function onRemove() {
                                    list.splice(i, 1);
                                    _this3.setState({ inactive: list });
                                    ContentArena.ContentApi.removeListing(listing.customId);
                                },
                                onDuplicate: _this3.duplicate
                            }, listing));
                        })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "column" },
                        active.length === 0 && loadingActive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "medium-spinner" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" })
                        ),
                        active.length > 0 && active.map(function (listing, i, list) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_BoardListing__["a" /* default */], _extends({
                                key: "active-" + i,
                                className: "listing",
                                style: {
                                    zIndex: list.length - i
                                },
                                showEdit: listing.editable,
                                showRemove: listing.editable,
                                showDeactivate: listing.editable,
                                showDuplicate: true,
                                showView: true,
                                defaultAction: "VIEW",
                                onDeactivate: function onDeactivate() {
                                    list.splice(i, 1);
                                    _this3.setState({ active: list });
                                    _this3.deactivate(listing.customId);
                                },
                                onRemove: function onRemove() {
                                    list.splice(i, 1);
                                    _this3.setState({ active: list });
                                    ContentArena.ContentApi.removeListing(listing.customId);
                                },
                                onDuplicate: _this3.duplicate
                            }, listing));
                        })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "column" },
                        expired.length === 0 && loadingExpired && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "medium-spinner" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" })
                        ),
                        expired.length > 0 && expired.map(function (listing, i, list) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_BoardListing__["a" /* default */], _extends({
                                key: "expired-" + i,
                                className: "listing",
                                style: {
                                    zIndex: list.length - i
                                },
                                showRemove: listing.editable,
                                showDuplicate: true,
                                showView: true,
                                onRemove: function onRemove() {
                                    list.splice(i, 1);
                                    _this3.setState({ expired: list });
                                    ContentArena.ContentApi.removeListing(listing.customId);
                                },
                                onDuplicate: _this3.duplicate
                            }, listing));
                        })
                    )
                )
            );
        }
    }]);

    return ManageListings;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(ManageListings));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/containers/Manager.js":
/*!********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/containers/Manager.js ***!
  \********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_components_HeaderBar__ = __webpack_require__(/*! ../../main/components/HeaderBar */ "./src/AppBundle/Resources/public/javascript/main/components/HeaderBar.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Watchlist__ = __webpack_require__(/*! ./Watchlist */ "./src/AppBundle/Resources/public/javascript/manage/containers/Watchlist.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ClosedDeals__ = __webpack_require__(/*! ./ClosedDeals */ "./src/AppBundle/Resources/public/javascript/manage/containers/ClosedDeals.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PendingDeals__ = __webpack_require__(/*! ./PendingDeals */ "./src/AppBundle/Resources/public/javascript/manage/containers/PendingDeals.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ManageListings__ = __webpack_require__(/*! ./ManageListings */ "./src/AppBundle/Resources/public/javascript/manage/containers/ManageListings.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__CommercialActivity__ = __webpack_require__(/*! ./CommercialActivity */ "./src/AppBundle/Resources/public/javascript/manage/containers/CommercialActivity.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Messages__ = __webpack_require__(/*! ./Messages */ "./src/AppBundle/Resources/public/javascript/manage/containers/Messages.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Settings__ = __webpack_require__(/*! ./Settings */ "./src/AppBundle/Resources/public/javascript/manage/containers/Settings.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var Manager = function (_React$Component) {
    _inherits(Manager, _React$Component);

    function Manager(props) {
        _classCallCheck(this, Manager);

        var _this = _possibleConstructorReturn(this, (Manager.__proto__ || Object.getPrototypeOf(Manager)).call(this, props));

        _this.state = {
            profile: props.profile,
            tab: props.tab,
            user: props.user,
            mode: props.mode
        };
        return _this;
    }

    _createClass(Manager, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                profile = _state.profile,
                tab = _state.tab,
                user = _state.user,
                mode = _state.mode;
            var company = this.props.company;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: "manager-container" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__main_components_HeaderBar__["a" /* default */], { tab: tab, profile: profile }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'manager-content' },
                    tab === 'WATCHLIST' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Watchlist__["a" /* default */], { company: company }),
                    tab === 'CLOSED_DEALS' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ClosedDeals__["a" /* default */], null),
                    tab === 'BIDS' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__PendingDeals__["a" /* default */], { mode: mode }),
                    tab === 'MANAGE_LISTINGS' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__ManageListings__["a" /* default */], null),
                    tab === 'COMMERCIAL_ACTIVITY' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__CommercialActivity__["a" /* default */], null),
                    tab === 'MESSAGES' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Messages__["a" /* default */], { user: user }),
                    tab === 'SETTINGS' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__Settings__["a" /* default */], null)
                )
            );
        }
    }]);

    return Manager;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Manager));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/containers/Messages.js":
/*!*********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/containers/Messages.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_actions_utils__ = __webpack_require__(/*! ../../main/actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_BoardListing__ = __webpack_require__(/*! ../components/BoardListing */ "./src/AppBundle/Resources/public/javascript/manage/components/BoardListing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment_moment__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment_moment__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Messages = function (_React$Component) {
    _inherits(Messages, _React$Component);

    function Messages(props) {
        _classCallCheck(this, Messages);

        var _this = _possibleConstructorReturn(this, (Messages.__proto__ || Object.getPrototypeOf(Messages)).call(this, props));

        _this.selectThread = function (thread) {
            _this.setState({
                selectedThread: thread
            });

            _this.updateMessages(thread);
        };

        _this.updateMessages = function (thread) {
            var selectedThread = thread || _this.state.selectedThread;

            if (!selectedThread) return;

            _this.setState({
                loadingMessages: true,
                messages: []
            });

            ContentArena.ContentApi.getThread(selectedThread.customId).done(function (r) {
                _this.setState({
                    loadingMessages: false,
                    messages: r
                });
            });
        };

        _this.send = function () {
            var _this$state = _this.state,
                selectedThread = _this$state.selectedThread,
                inputMessage = _this$state.inputMessage,
                messages = _this$state.messages;


            var message = {
                content: inputMessage,
                thread: selectedThread.id,
                listing: selectedThread.listing.id
            };

            _this.setState({ inputMessage: "", saving: true });

            ContentArena.ContentApi.sendMessage(message).done(function (r) {
                _this.setState({ saving: false, showSuccess: true, messages: [].concat(_toConsumableArray(messages), [r]) });
            });
        };

        _this.state = {
            threads: [],
            loadingThreads: false,
            loadingMessages: false,
            selectedThread: null,
            inputMessage: null,
            messages: []
        };
        return _this;
    }

    _createClass(Messages, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.setState({
                loadingThreads: true
            });
            ContentArena.ContentApi.getThreads().done(function (r) {

                r.sort(function (a, b) {
                    var aDate = __WEBPACK_IMPORTED_MODULE_4_moment_moment___default()(a.lastMessageDate);
                    var bDate = __WEBPACK_IMPORTED_MODULE_4_moment_moment___default()(b.lastMessageDate);
                    return aDate > bDate ? 1 : bDate > a.bDate ? -1 : 0;
                }).reverse();

                _this2.setState({
                    threads: r,
                    selectedThread: _this2.state.selectedThread ? _this2.state.selectedThread : r.length > 0 ? r[0] : null,
                    loadingThreads: false
                });
                _this2.updateMessages();
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                loadingThreads = _state.loadingThreads,
                loadingMessages = _state.loadingMessages,
                selectedThread = _state.selectedThread,
                threads = _state.threads,
                inputMessage = _state.inputMessage,
                messages = _state.messages,
                saving = _state.saving;
            var user = this.props.user;


            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "messages-container" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "threads" },
                    loadingThreads && threads.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" }),
                    !loadingThreads && threads.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        "No threads yet"
                    ),
                    !loadingThreads && threads.map(function (t, i) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: selectedThread.id === t.id ? "thread thread-selected" : "thread",
                                key: "thread-" + i,
                                onClick: function onClick() {
                                    _this3.selectThread(t);
                                } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "date" },
                                t.lastMessageDate && __WEBPACK_IMPORTED_MODULE_4_moment_moment___default()(t.lastMessageDate).format('YYYY/MM/DD')
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "listing-name" },
                                t.listing.name
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "company" },
                                t.oppositeParty.legalName
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "user" },
                                Object(__WEBPACK_IMPORTED_MODULE_2__main_actions_utils__["d" /* getFullName */])(t.lastMessageUser)
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "last-message" },
                                t.lastMessageContent && Object(__WEBPACK_IMPORTED_MODULE_2__main_actions_utils__["j" /* limitText */])(t.lastMessageContent)
                            )
                        );
                    })
                ),
                selectedThread && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "thread-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "thread-title" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "listing-name", onClick: function onClick() {
                                    Object(__WEBPACK_IMPORTED_MODULE_2__main_actions_utils__["g" /* goToListing */])(selectedThread.listing.customId, true);
                                } },
                            selectedThread.listing.name
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "company-name" },
                            selectedThread.oppositeParty.legalName
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "messages" },
                        loadingMessages && messages.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" })
                        ),
                        !loadingMessages && messages.map(function (m, i) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: user === m.sender.email ? "message own-message" : "message" },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "message-sender" },
                                    Object(__WEBPACK_IMPORTED_MODULE_2__main_actions_utils__["d" /* getFullName */])(m.sender)
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "message-content" },
                                    m.content
                                ),
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "message-date" },
                                    __WEBPACK_IMPORTED_MODULE_4_moment_moment___default()(m.createdAt).format('YYYY/MM/DD HH:mm')
                                )
                            );
                        })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "message-input" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "message-input-title" },
                            "Write a message"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("textarea", {
                            value: inputMessage,
                            onChange: function onChange(e) {
                                _this3.setState({ inputMessage: e.target.value });
                            },
                            className: "message-content",
                            placeholder: "write a message" }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { className: "standard-button",
                                onClick: this.send,
                                disabled: !inputMessage || inputMessage === "" || saving },
                            !saving && "Send",
                            saving && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" })
                        )
                    )
                ),
                !selectedThread && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    "No thread selected"
                )
            );
        }
    }]);

    return Messages;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Messages));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/containers/PendingDeals.js":
/*!*************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/containers/PendingDeals.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_components_ContentListingPendingBid__ = __webpack_require__(/*! ../../main/components/ContentListingPendingBid */ "./src/AppBundle/Resources/public/javascript/main/components/ContentListingPendingBid.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_actions_utils__ = __webpack_require__(/*! ../../main/actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var PendingDeals = function (_React$Component) {
    _inherits(PendingDeals, _React$Component);

    function PendingDeals(props) {
        _classCallCheck(this, PendingDeals);

        var _this2 = _possibleConstructorReturn(this, (PendingDeals.__proto__ || Object.getPrototypeOf(PendingDeals)).call(this, props));

        _this2.selectListing = function (id) {
            Object(__WEBPACK_IMPORTED_MODULE_3__main_actions_utils__["e" /* goTo */])("listing/" + id, true);
        };

        _this2.update = function () {
            var _this = _this2;
            _this2.setState({ loading: true, loadingDeclined: true });
            ContentArena.ContentApi.getPendingDeals().done(function (bids) {
                _this.setState({ bids: bids, loading: false });
            });

            ContentArena.ContentApi.getRejectedDeals().done(function (declinedBids) {
                _this.setState({ declinedBids: declinedBids, loadingDeclined: false });
            });
        };

        _this2.deleteBid = function (id) {
            ContentArena.ContentApi.removeBid({ id: id }).done(function (r) {
                _this2.update();
            });
        };

        _this2.remove = function (customId) {
            _this2.setState({
                bids: _this2.state.bids.filter(function (l) {
                    return l.customId !== customId;
                })
            });
        };

        _this2.state = {
            loading: false,
            loadingDeclined: false,
            bids: [],
            declinedBids: [],
            active: props.mode === "ACTIVE"

        };
        _this2.bulletIcon = assetsBaseDir + "app/images/bullet.png";
        _this2.activeBulletIcon = assetsBaseDir + "app/images/active_bullet.png";
        return _this2;
    }

    _createClass(PendingDeals, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.update();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                loading = _state.loading,
                bids = _state.bids,
                active = _state.active,
                declinedBids = _state.declinedBids,
                loadingDeclined = _state.loadingDeclined;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { style: {
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
                    } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { style: {
                            display: 'flex',
                            padding: '0 0 20px',
                            color: '#4F4F4F',
                            fontSize: 18,
                            fontWeight: 600
                        } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { style: { margin: '0 20px' } },
                        'Bids'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { style: { margin: '0 20px', cursor: 'pointer' },
                            onClick: function onClick() {
                                Object(__WEBPACK_IMPORTED_MODULE_3__main_actions_utils__["e" /* goTo */])("bids/activebids");
                            } },
                        active && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { style: { margin: '0px 10px 3px' }, src: this.activeBulletIcon }),
                        !active && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { style: { margin: '0px 10px 3px' }, src: this.bulletIcon }),
                        'Active'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { style: { margin: '0 20px', cursor: 'pointer' },
                            onClick: function onClick() {
                                Object(__WEBPACK_IMPORTED_MODULE_3__main_actions_utils__["e" /* goTo */])("bids/declinedbids");
                            } },
                        !active && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { style: { margin: '0px 10px 3px' }, src: this.activeBulletIcon }),
                        active && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { style: { margin: '0px 10px 3px' }, src: this.bulletIcon }),
                        'Declined'
                    )
                ),
                active && bids.length > 0 && bids.map(function (bid, i) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__main_components_ContentListingPendingBid__["a" /* default */], _extends({
                        onSelect: _this3.selectListing,
                        onDelete: _this3.deleteBid,
                        key: i + "-" + bid.content.customId,
                        bid: bid
                    }, bid.content));
                }),
                !active && declinedBids.length > 0 && declinedBids.map(function (bid, i) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__main_components_ContentListingPendingBid__["a" /* default */], _extends({
                        onSelect: _this3.selectListing,
                        onDelete: _this3.deleteBid,
                        key: i + "-" + bid.content.customId,
                        bid: bid
                    }, bid.content));
                }),
                active && bids.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'manager-content-message' },
                    loading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'big-spinner' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    !loading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'big-spinner', style: {
                                fontSize: 30
                            } },
                        'You haven\'t made any bids yet!'
                    )
                ),
                !active && declinedBids.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'manager-content-message' },
                    loadingDeclined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'big-spinner' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    !loadingDeclined && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'big-spinner', style: {
                                fontSize: 30
                            } },
                        'You haven\'t any declined bids yet!'
                    )
                )
            );
        }
    }]);

    return PendingDeals;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(PendingDeals));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/containers/Settings.js":
/*!*********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/containers/Settings.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_table__ = __webpack_require__(/*! react-table */ "./node_modules/react-table/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_actions_utils__ = __webpack_require__(/*! ../../main/actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_components_CountrySelector__ = __webpack_require__(/*! ../../main/components/CountrySelector */ "./src/AppBundle/Resources/public/javascript/main/components/CountrySelector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment_moment__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__ = __webpack_require__(/*! ../../main/components/Icons */ "./src/AppBundle/Resources/public/javascript/main/components/Icons.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var Settings = function (_React$Component) {
    _inherits(Settings, _React$Component);

    function Settings(props) {
        _classCallCheck(this, Settings);

        var _this = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this, props));

        _this.updateCompany = function () {
            _this.setState({ updatingCompany: true, editCompanyInfo: false });
            ContentArena.ContentApi.updateCompany(_this.state.user.company).done(function () {
                _this.setState({ updatingCompany: false });
            });
        };

        _this.updateUser = function () {
            _this.setState({ updatingUser: true, editPersonalInfo: false });
            ContentArena.ContentApi.updateUser(_this.state.user).done(function () {
                _this.setState({ updatingUser: false });
            });
        };

        _this.updatePassword = function () {
            _this.setState({ updatingPassword: true });
            ContentArena.ContentApi.updatePassword({
                id: _this.state.user.id,
                password: _this.state.password
            }).done(function () {
                _this.setState({
                    updatingPassword: false,
                    password: null,
                    passwordCheck: null,
                    passwordUpdated: true
                });
            });
        };

        _this.validate = function (pass) {
            return {
                length: pass.length >= 8,
                digit: /\d/.test(pass),
                upper: /[A-Z]/.test(pass),
                special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)
            };
        };

        _this.invalidPassword = function () {
            var _this$state = _this.state,
                oldPassword = _this$state.oldPassword,
                password = _this$state.password,
                passwordCheck = _this$state.passwordCheck;


            if (!oldPassword || !password || !passwordCheck) return true;

            var valid = _this.validate(password);

            return password !== passwordCheck || !valid.length || !valid.digit || !valid.upper || !valid.special;
        };

        _this.state = {
            loading: false,
            updatingCompany: false,
            updatingUser: false,
            updatingPassword: false,
            loadingCompanyUsers: false,
            editPersonalInfo: false,
            editCompanyInfo: false,
            companyUsers: [],
            user: {}
        };
        return _this;
    }

    _createClass(Settings, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.setState({ loading: true, loadingCompanyUsers: true });

            ContentArena.ContentApi.getUserInfo().done(function (user) {
                _this2.setState({ loading: false, user: user });
            });

            ContentArena.ContentApi.getCompanyUsers().done(function (companyUsers) {
                _this2.setState({ loadingCompanyUsers: false, companyUsers: companyUsers });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                loading = _state.loading,
                editPersonalInfo = _state.editPersonalInfo,
                editCompanyInfo = _state.editCompanyInfo,
                loadingCompanyUsers = _state.loadingCompanyUsers,
                companyUsers = _state.companyUsers,
                updatingCompany = _state.updatingCompany,
                updatingUser = _state.updatingUser,
                updatingPassword = _state.updatingPassword,
                password = _state.password,
                passwordCheck = _state.passwordCheck,
                passwordUpdated = _state.passwordUpdated;

            var user = this.state.user;

            var country = user && user.company && user.company.country ? { label: user.company.country.name, value: user.company.country.name } : null;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "settings-container" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "title" },
                    "Company information ",
                    !editCompanyInfo && !updatingCompany && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "edit-button", onClick: function onClick(e) {
                                _this3.setState({ editCompanyInfo: true });
                            } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["j" /* editIcon */] }),
                        " Edit"
                    ),
                    editCompanyInfo && !updatingCompany && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "edit-button", onClick: this.updateCompany },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["j" /* editIcon */] }),
                        " Save"
                    ),
                    updatingCompany && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["a" /* Spinner */], null)
                ),
                user.company && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "setting" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "row" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "Legal Company Name"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { value: user.company.legalName, disabled: !editCompanyInfo, onChange: function onChange(e) {
                                    user.company.legalName = e.target.value;
                                    _this3.setState({ user: user });
                                } })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "Company Registration Number"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { value: user.company.registrationNumber, disabled: !editCompanyInfo, onChange: function onChange(e) {
                                    user.company.registrationNumber = e.target.value;
                                    _this3.setState({ user: user });
                                } })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "VAT ID number"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { value: user.company.vat, disabled: !editCompanyInfo, onChange: function onChange(e) {
                                    user.company.vat = e.target.value;
                                    _this3.setState({ user: user });
                                } })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "row" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "Address"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { value: user.company.address, disabled: !editCompanyInfo, onChange: function onChange(e) {
                                    user.company.address = e.target.value;
                                    _this3.setState({ user: user });
                                } })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "City"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { value: user.company.city, disabled: !editCompanyInfo, onChange: function onChange(e) {
                                    user.company.city = e.target.value;
                                    _this3.setState({ user: user });
                                } })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "ZIP code"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { value: user.company.zip, disabled: !editCompanyInfo, onChange: function onChange(e) {
                                    user.company.zip = e.target.value;
                                    _this3.setState({ user: user });
                                } })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "Country"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__main_components_CountrySelector__["a" /* default */], { multi: false, value: country, disabled: !editCompanyInfo, onChange: function onChange(e) {
                                    user.company.country.name = e.value;
                                    _this3.setState({ user: user });
                                } })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            "Company description"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("textarea", { value: user.company.description, disabled: !editCompanyInfo, onChange: function onChange(e) {
                                user.company.description = e.target.value;
                                _this3.setState({ user: user });
                            } })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { margin: '20px 0' } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            "Active Users"
                        ),
                        loadingCompanyUsers && companyUsers.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["a" /* Spinner */], null),
                        !loadingCompanyUsers && companyUsers.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_table__["default"], {
                                className: "closed-deals-table",
                                defaultPageSize: 30,
                                showPageSizeOptions: false,
                                showPagination: false,
                                minRows: 0,
                                resizable: false,
                                data: companyUsers,
                                columns: [{
                                    Header: 'Familiy Name',
                                    headerClassName: 'table-header',
                                    className: 'table-header',
                                    accessor: 'lastName'
                                }, {
                                    accessor: 'firstName', // Required because our accessor is not a string
                                    Header: 'First Name',
                                    headerClassName: 'table-header',
                                    className: 'table-header'
                                }, {
                                    Header: 'Email',
                                    accessor: 'email',
                                    headerClassName: 'table-header',
                                    className: 'table-header'
                                }, {
                                    Header: 'Phone Number',
                                    accessor: 'phone',
                                    headerClassName: 'table-header',
                                    className: 'table-header'
                                }, {
                                    Header: 'Company Position',
                                    accessor: 'title',
                                    headerClassName: 'table-header',
                                    className: 'table-header'
                                }]
                            })
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "title" },
                    "Personal information ",
                    !editPersonalInfo && !updatingUser && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "edit-button", onClick: function onClick(e) {
                                _this3.setState({ editPersonalInfo: true });
                            } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["j" /* editIcon */] }),
                        " Edit"
                    ),
                    editPersonalInfo && !updatingUser && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "edit-button", onClick: this.updateUser },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["j" /* editIcon */] }),
                        " Save"
                    ),
                    updatingUser && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["a" /* Spinner */], null)
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "setting" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "row" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "First Name"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { value: user.firstName, disabled: !editPersonalInfo, onChange: function onChange(e) {
                                    user.firstName = e.target.value;
                                    _this3.setState({ user: user });
                                } })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "Last Name"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { value: user.lastName, disabled: !editPersonalInfo, onChange: function onChange(e) {
                                    user.lastName = e.target.value;
                                    _this3.setState({ user: user });
                                } })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "Title"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { value: user.title, disabled: !editPersonalInfo, onChange: function onChange(e) {
                                    user.title = e.target.value;
                                    _this3.setState({ user: user });
                                } })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "row" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "Email address"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { value: user.email, disabled: !editPersonalInfo, onChange: function onChange(e) {
                                    user.email = e.target.value;
                                    _this3.setState({ user: user });
                                } })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "label",
                                null,
                                "Phone number"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { value: user.phone, disabled: !editPersonalInfo, onChange: function onChange(e) {
                                    user.phone = e.target.value;
                                    _this3.setState({ user: user });
                                } })
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "title" },
                    "Change Password"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "subtitle" },
                    "Choose a unique password to protect your account"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "setting", style: { display: 'flex' } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "password" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            "Type your current password"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "password", onChange: function onChange(e) {
                                _this3.setState({
                                    oldPassword: e.target.value
                                });
                            } }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            "Type your new password"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "password", onChange: function onChange(e) {
                                _this3.setState({
                                    password: e.target.value
                                });
                            } }),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            "Retype your new password"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "password", onChange: function onChange(e) {
                                _this3.setState({
                                    passwordCheck: e.target.value
                                });
                            } }),
                        !updatingPassword && !passwordUpdated && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { onClick: this.updatePassword,
                                disabled: this.invalidPassword(),
                                className: "standard-button" },
                            "Save password"
                        ),
                        updatingPassword && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["a" /* Spinner */], null),
                        passwordUpdated && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            "Password updated successfully"
                        )
                    ),
                    password && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "password-validation" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            this.validate(password).length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["d" /* blueCheckIcon */] }),
                            !this.validate(password).length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["g" /* cancelIcon */] }),
                            "At least 8 characters long"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            this.validate(password).upper && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["d" /* blueCheckIcon */] }),
                            !this.validate(password).upper && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["g" /* cancelIcon */] }),
                            "One uppercase character"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            this.validate(password).digit && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["d" /* blueCheckIcon */] }),
                            !this.validate(password).digit && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["g" /* cancelIcon */] }),
                            "One number"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            this.validate(password).special && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["d" /* blueCheckIcon */] }),
                            !this.validate(password).special && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["g" /* cancelIcon */] }),
                            "One special character"
                        ),
                        passwordCheck && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
                            passwordCheck === password && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["d" /* blueCheckIcon */] }),
                            passwordCheck !== password && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__main_components_Icons__["g" /* cancelIcon */] }),
                            "Passwords don't match"
                        )
                    )
                )
            );
        }
    }]);

    return Settings;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Settings));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/containers/Watchlist.js":
/*!**********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/containers/Watchlist.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_components_ContentListing__ = __webpack_require__(/*! ../../main/components/ContentListing */ "./src/AppBundle/Resources/public/javascript/main/components/ContentListing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_actions_utils__ = __webpack_require__(/*! ../../main/actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var Watchlist = function (_React$Component) {
    _inherits(Watchlist, _React$Component);

    function Watchlist(props) {
        _classCallCheck(this, Watchlist);

        var _this2 = _possibleConstructorReturn(this, (Watchlist.__proto__ || Object.getPrototypeOf(Watchlist)).call(this, props));

        _this2.selectListing = function (id) {
            Object(__WEBPACK_IMPORTED_MODULE_3__main_actions_utils__["e" /* goTo */])("listing/" + id);
        };

        _this2.remove = function (customId) {
            _this2.setState({
                listings: _this2.state.listings.filter(function (l) {
                    return l.customId !== customId;
                })
            });
        };

        _this2.state = {
            loading: false,
            listings: []
        };
        return _this2;
    }

    _createClass(Watchlist, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;
            this.setState({ loading: true });
            ContentArena.ContentApi.getWatchlistListings().done(function (listings) {

                listings = listings.map(function (listing) {
                    return ContentArena.Utils.contentParserFromServer(listing);
                });
                _this.setState({ listings: listings, loading: false });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                loading = _state.loading,
                listings = _state.listings;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { style: {
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
                    } },
                listings.length > 0 && listings.map(function (listing) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__main_components_ContentListing__["a" /* default */], _extends({
                        onSelect: _this3.selectListing,
                        key: listing.customId
                    }, listing, {
                        watchlistRemove: true,
                        onWatchlistRemove: _this3.remove
                    }));
                }),
                listings.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'manager-content-message' },
                    loading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'big-spinner' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    !loading && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'big-spinner', style: {
                                fontSize: 30
                            } },
                        'Your watchlist is empty!'
                    )
                )
            );
        }
    }]);

    return Watchlist;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Watchlist));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/manage.js":
/*!********************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/manage.js ***!
  \********************************************************************/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(/*! ./store */ "./src/AppBundle/Resources/public/javascript/manage/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_Manager__ = __webpack_require__(/*! ./containers/Manager */ "./src/AppBundle/Resources/public/javascript/manage/containers/Manager.js");
/**
 * Created by JuanCruz on 4/1/2018.
 */







var manageContainer = document.getElementById('manage-wrapper');

var ManageApp = __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"],
    { store: __WEBPACK_IMPORTED_MODULE_3__store__["a" /* default */] },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__containers_Manager__["a" /* default */], manageContainer.dataset)
), manageContainer);

$(function () {

    ContentArena.Test = ContentArena.Test || {};
    ContentArena.Test.Manage = function (id) {
        ManageApp.test(id);
    };
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/manage/reducers/index.js":
/*!****************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/reducers/index.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__manage__ = __webpack_require__(/*! ./manage */ "./src/AppBundle/Resources/public/javascript/manage/reducers/manage.js");




var reducers = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
    manage: __WEBPACK_IMPORTED_MODULE_1__manage__["a" /* manage */]
});

/* harmony default export */ __webpack_exports__["a"] = (reducers);

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

/***/ "./src/AppBundle/Resources/public/javascript/manage/store.js":
/*!*******************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/manage/store.js ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers__ = __webpack_require__(/*! ./reducers */ "./src/AppBundle/Resources/public/javascript/manage/reducers/index.js");
/**
 * Created by JuanCruz on 4/1/2018.
 */





/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_2__reducers__["a" /* default */]));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/actions/validationActions.js":
/*!*************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/actions/validationActions.js ***!
  \*************************************************************************************/
/*! exports provided: companyIsValid */
/*! exports used: companyIsValid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return companyIsValid; });
var companyIsValid = function companyIsValid(company) {
    return company.legalName !== undefined && company.legalName !== "" && company.vat !== undefined && company.vat !== "" && company.zip !== undefined && company.zip !== "" && company.address !== undefined && company.address !== "" && company.city !== undefined && company.city !== "" && company.country !== undefined;
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/SuperRightDefinitions.js":
/*!********************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/SuperRightDefinitions.js ***!
  \********************************************************************************************/
/*! exports provided: SuperRightDefinitions, SuperRightProductionDetailsLabels, SuperRightBoardLabels */
/*! exports used: SuperRightBoardLabels, SuperRightDefinitions, SuperRightProductionDetailsLabels */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SuperRightDefinitions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SuperRightProductionDetailsLabels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuperRightBoardLabels; });
var SuperRightDefinitions = {
    "LT": ["means the right to a real-time (subject to latency) Transmission of a Live Feed of the Event other than in Betting Shops and on Betting Platforms."],
    "DT": ["means the right to a full-length delayed Transmission of a Live Feed of the Event commencing not before end of the Event or the Time Embargo defined."],
    "LB": ["means the right to real-time (subject to latency) Transmission of a Live Feed of the Event in Betting Shops and on Betting Platforms;"],
    "NA": ["means the right to a Transmission of Footage of the Event not exceeding", {
        key: "NA_INPUT"
    }, "seconds in news programs not before the end of the relevant Event or the Time Embargo defined"],
    "HL": ["means the right to a Transmission of Highlight footage of the Event not exceeding", {
        key: "HL_INPUT"
    }, "minutes not before the end of the relevant Event or the Time Embargo defined"],
    "PR": ["means the right to a Transmission of the specific Programs provided by Licensor to Licensee."]
};

var SuperRightProductionDetailsLabels = {
    "LT": "Live Transmission",
    "DT": "Delayed & Archive Footage",
    "LB": "Live Betting Transmission",
    "HL": "Highlights & Clips",
    "NA": "News Footage",
    "PR": "Edited Program"
};

var SuperRightBoardLabels = {
    "LT": "Live",
    "DT": "Delayed&Archive",
    "LB": "Betting",
    "HL": "Highlights&Clips",
    "NA": "News",
    "PR": "Program"
};

/***/ }),

/***/ 1:
/*!**************************************************************************!*\
  !*** multi ./src/AppBundle/Resources/public/javascript/manage/manage.js ***!
  \**************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/manage/manage.js */"./src/AppBundle/Resources/public/javascript/manage/manage.js");


/***/ })

},[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtaW5wdXQtYXV0b3NpemUvbGliL0F1dG9zaXplSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvZGF0YS9sYW5ndWFnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2FjdGlvbnMvZmlsdGVyQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29tcG9uZW50cy9Db250ZW50TGlzdGluZ0V2ZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29tcG9uZW50cy9Db250ZW50TGlzdGluZ1JpZ2h0c1BhY2thZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2FjdGlvbnMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0NvbW1lcmNpYWxTYWxlc0J1bmRsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvQ29udGVudExpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0NvbnRlbnRMaXN0aW5nQ29tbWVyY2lhbEFjdGl2aXR5LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9Db250ZW50TGlzdGluZ1BlbmRpbmdCaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0NvdW50cnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvRGlnaXRhbFNpZ25hdHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvSGVhZGVyQmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9IaXN0b3J5QnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9JY29ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvU2VuZE1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9zdHlsZXMvY3VzdG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9jb21wb25lbnRzL0JvYXJkTGlzdGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29udGFpbmVycy9DbG9zZWREZWFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29udGFpbmVycy9Db21tZXJjaWFsQWN0aXZpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvTWFuYWdlTGlzdGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29udGFpbmVycy9NZXNzYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29udGFpbmVycy9QZW5kaW5nRGVhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvU2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvV2F0Y2hsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9tYW5hZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3JlZHVjZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9yZWR1Y2Vycy9tYW5hZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvYWN0aW9ucy92YWxpZGF0aW9uQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbXBvbmVudHMvU3VwZXJSaWdodERlZmluaXRpb25zLmpzIl0sIm5hbWVzIjpbImxhbmd1YWdlcyIsImFkZFJpZ2h0IiwidHlwZSIsImZpbHRlclR5cGVzIiwiQUREX1JJR0hUIiwiaWQiLCJyZW1vdmVSaWdodCIsIlJFTU9WRV9SSUdIVCIsInVwZGF0ZUNvdW50cmllcyIsIlVQREFURV9DT1VOVFJJRVMiLCJjb3VudHJpZXMiLCJ1cGRhdGVFeGNsdXNpdmUiLCJVUERBVEVfRVhDTFVTSVZFIiwiZXhjbHVzaXZlIiwidXBkYXRlU3BvcnQiLCJVUERBVEVfU1BPUlQiLCJzcG9ydCIsInVwZGF0ZUV2ZW50IiwiVVBEQVRFX0VWRU5UIiwiZXZlbnQiLCJjbGVhckZpbHRlciIsIkNMRUFSIiwiY2xlYXJVcGRhdGVGaWx0ZXIiLCJDTEVBUl9VUERBVEUiLCJDb250ZW50TGlzdGluZ0V2ZW50RGV0YWlscyIsInByb3BzIiwiZ2V0Rml4dHVyZXMiLCJzZWFzb25zIiwiZml4dHVyZXMiLCJmb3JFYWNoIiwicyIsImdldFNjaGVkdWxlcyIsInNjaGVkdWxlc0J5U2Vhc29uIiwic2NoZWR1bGVzIiwicm91bmRzIiwibWF0Y2hlcyIsIk9iamVjdCIsImVudHJpZXMiLCJzaCIsInNlbGVjdGVkIiwiaW5kZXhPZiIsInB1c2giLCJtIiwic2hvd1Byb2dyYW1JbmZvIiwicmlnaHRzUGFja2FnZSIsIlBST0dSQU1fTkFNRSIsInNob3ciLCJsZW5ndGgiLCJlZGl0ZWRQcm9ncmFtU2VsZWN0ZWQiLCJzdGF0ZSIsInNwb3J0cyIsInNwb3J0Q2F0ZWdvcnkiLCJjdXN0b21Ub3VybmFtZW50IiwiY3VzdG9tQ2F0ZWdvcnkiLCJjdXN0b21JZCIsInRvdXJuYW1lbnQiLCJzaG93Q3VzdG9tSWQiLCJQUk9HUkFNX1lFQVIiLCJQUk9HUkFNX0VQSVNPREVTIiwiaXNGcmFnbWVudCIsInNlYXNvblRpdGxlIiwic2Vhc29uTmFtZSIsIm1hcCIsInNlYXNvbiIsInllYXIiLCJqb2luIiwicm91bmRzVGl0bGUiLCJyb3VuZHNOYW1lIiwibmFtZSIsImNvbXBldGl0b3JzIiwiY29tcGV0aXRvciIsImkiLCJsaXN0IiwiUmVhY3QiLCJDb21wb25lbnQiLCJDb250ZW50TGlzdGluZ1JpZ2h0c1BhY2thZ2UiLCJwcm9ncmFtTmFtZSIsInNyIiwid2lkdGgiLCJoZWlnaHQiLCJtYXJnaW4iLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsInNob3J0TGFiZWwiLCJmb250V2VpZ2h0IiwibWFyZ2luTGVmdCIsImRlZmF1bHRGaWx0ZXIiLCJyaWdodHMiLCJ2YWx1ZSIsImxhYmVsIiwiZm9yY2VVcGRhdGUiLCJmaWx0ZXIiLCJhY3Rpb24iLCJhc3NpZ24iLCJpbmRleCIsInNwbGljZSIsImdldEN1cnJlbmN5U3ltYm9sIiwiY29kZSIsImdvVG8iLCJyb3V0ZSIsIm9wZW5OZXciLCJ3aW5kb3ciLCJvcGVuIiwiZW52aG9zdHVybCIsImxvY2F0aW9uIiwiaHJlZiIsImhpc3RvcnlHb1RvIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImdvVG9MaXN0aW5nIiwidmlld0xpY2Vuc2UiLCJ2aWV3TGljZW5zZUJpZCIsInZpZXdMaWNlbnNlQnVuZGxlIiwibGlzdGluZ0lkIiwidmlld0xpY2Vuc2VDdXN0b20iLCJidW5kbGVJZCIsImJpZCIsInNlcmlhbGl6ZSIsIm9iaiIsInByZWZpeCIsInN0ciIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsImsiLCJ2IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZ29Ub01hcmtldHBsYWNlIiwiZ29Ub0Nsb3NlZERlYWxzIiwiZ2V0RmVlIiwic2FsZXNQYWNrYWdlIiwiZmVlTnVtYmVyIiwicGFyc2VGbG9hdCIsImZlZSIsInRvTG9jYWxlU3RyaW5nIiwiY3VycmVuY3kiLCJnZXRGdWxsTmFtZSIsInVzZXIiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImxpbWl0VGV4dCIsInR4dCIsImxpbWl0Iiwic3Vic3RyaW5nIiwiciIsInBhcnNlU2Vhc29ucyIsImNvbnRlbnQiLCJ1bmRlZmluZWQiLCJzZWxlY3RlZFNjaGVkdWxlcyIsInJvdW5kIiwiQXJyYXkiLCJmcm9tIiwidmFsdWVzIiwibWF0Y2giLCJDb21tZXJjaWFsU2FsZXNCdW5kbGUiLCJhY2NlcHRCaWQiLCJzaWduYXR1cmUiLCJjb250ZW50SWQiLCJzZWxlY3RlZEJpZCIsInNldFN0YXRlIiwic2F2aW5nIiwiQ29udGVudEFyZW5hIiwiQ29udGVudEFwaSIsImRvbmUiLCJhcHByb3ZlTW9kYWxJc09wZW4iLCJvblVwZGF0ZSIsInJlbW92ZUJpZCIsInJlamVjdEJpZCIsIm1lc3NhZ2UiLCJhbHdheXMiLCJyZWplY3RNb2RhbElzT3BlbiIsImNsb3NlUmVtb3ZlTW9kYWwiLCJyZW1vdmVNb2RhbElzT3BlbiIsImNsb3NlQXBwcm92ZU1vZGFsIiwiY2xvc2VSZWplY3RNb2RhbCIsInJlbmRlckFwcHJvdmVNb2RhbCIsInNhbGVzQnVuZGxlIiwiR2VuZXJpY01vZGFsU3R5bGUiLCJyZW5kZXJSZWplY3RNb2RhbCIsImUiLCJ0YXJnZXQiLCJyZW5kZXJSZW1vdmVNb2RhbCIsInNob3dCaWRzIiwiYmlkc09wZW4iLCJjb21wYW55Iiwib25EZWxldGUiLCJjbG9zZWREZWFscyIsImJpZHMiLCJiIiwic3RhdHVzIiwidG90YWxGZWUiLCJOdW1iZXIiLCJyZWR1Y2UiLCJ0IiwibiIsIl90aGlzIiwiYnVuZGxlTWV0aG9kIiwic2FsZXNNZXRob2QiLCJidXllclVzZXIiLCJvblBhZ2VDaGFuZ2UiLCJzZWxlY3QiLCJhY2Nlc3NvciIsImQiLCJsZWdhbE5hbWUiLCJDZWxsIiwiSGVhZGVyIiwiaGVhZGVyQ2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwiTW9tZW50IiwiZm9ybWF0IiwiY3Vyc29yIiwic2hvd1JlbW92ZUNvbmZpcm0iLCJyZWZzIiwid2hpdGVTcGFjZSIsInN0b3BQcm9wYWdhdGlvbiIsIkNvbnRlbnRMaXN0aW5nIiwiY3VycmVuY3lDb2RlIiwiY3VycmVuY3lTeW1ib2wiLCJvblNlbGVjdCIsImNvbmZpcm1SZW1vdmVGcm9tV2F0Y2hsaXN0IiwiY29uZmlybVdhdGNobGlzdFJlbW92ZSIsImNhbmNlbFJlbW92ZUZyb21XYXRjaGxpc3QiLCJyZW1vdmVGcm9tV2F0Y2hsaXN0Iiwib25XYXRjaGxpc3RSZW1vdmUiLCJBcGkiLCJ3YXRjaGxpc3QiLCJzb3J0U2FsZXNQYWNrYWdlcyIsImEiLCJ0ZXJyaXRvcmllc01ldGhvZCIsImNvbXBhcmVQcm9wZXJ0eSIsInRlcnJpdG9yaWVzIiwic29ydEFmdGVyRmlsdGVyIiwic29ydEJ5RmlsdGVyIiwic2FsZXNQYWNrYWdlcyIsInRlbXAiLCJjIiwibCIsImV0IiwiZXhjbHVkZWRUZXJyaXRvcmllcyIsImFsbCIsImluY2x1ZGUiLCJidXlpbmdNb2RlIiwibm9JbWFnZSIsImFzc2V0c0Jhc2VEaXIiLCJiaWRJY29uIiwiZml4ZWRJY29uIiwiYmx1ZUNoZWNrIiwieWVsbG93Q2hlY2siLCJidWNrZXRpY29uIiwiZXhwaXJlc0F0Iiwib25TZWxlY3ROYW1lIiwiaW1hZ2VCYXNlNjQiLCJpbWFnZSIsIndhdGNobGlzdFJlbW92ZSIsInNsaWNlIiwibGlzdGluZ0ltYWdlIiwic29ydCIsInJldmVyc2UiLCJwb3NpdGlvbiIsInJpZ2h0IiwidG9wIiwiYm9yZGVyIiwicGFkZGluZyIsImZvbnRTaXplIiwiY29sb3IiLCJmbGV4IiwiQ29udGVudExpc3RpbmdDb21tZXJjaWFsQWN0aXZpdHkiLCJhT3BlbiIsImJPcGVuIiwiYUNsb3NlZCIsImJDbG9zZWQiLCJhV29ybGR3aWRlIiwiYldvcmxkd2lkZSIsImNsb3NlZCIsIndvcmxkd2lkZSIsInNob3dTYWxlc1BhY2thZ2UiLCJidW5kbGVzT3BlbiIsImV4Y2xhbWF0aW9uSWNvbiIsImVudmVsb3BlSWNvbiIsImhpZGVXaXRob3V0QmlkcyIsImZpbHRlckJ5T3BlbkJpZHMiLCJmaWx0ZXJCeUNsb3NlZERlYWxzIiwic3AiLCJjb25jYXQiLCJvcGVuQmlkcyIsInRvdGFsIiwibWFyZ2luQm90dG9tIiwibWF4aW11bUZyYWN0aW9uRGlnaXRzIiwic2IiLCJDb250ZW50TGlzdGluZ1BlbmRpbmdCaWQiLCJzaG93TWVzc2FnZSIsInNob3dFZGl0ZWQiLCJhbGlnbkl0ZW1zIiwib3ZlcmZsb3ciLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJMZWZ0IiwicGFkZGluZ1JvcCIsImp1c3RpZnlDb250ZW50IiwiY3JlYXRlZEF0IiwiYW1vdW50IiwibWFyZ2luUmlnaHQiLCJmb250U3R5bGUiLCJDb3VudHJ5U2VsZWN0b3IiLCJnZXRPcHRpb25zIiwiYXZhaWxhYmxlIiwiRGF0YSIsIkNvdW50cmllcyIsImNvdW50cnkiLCJuZXh0UHJvcHMiLCJnZXRDb3VudHJpZXMiLCJvbkNoYW5nZSIsIm11bHRpIiwiZGlzYWJsZWQiLCJEaWdpdGFsU2lnbmF0dXJlIiwiY2xlYXIiLCJibGFuayIsIm9uUmVhZHkiLCJkYXRhIiwidG9EYXRhVVJMIiwicmVhZHkiLCJlZGl0IiwiSGVhZGVyQmFyVGFiIiwidGFiTmFtZSIsImFjdGl2ZVRhYiIsImNoaWxkcmVuIiwiSGVhZGVyQmFyIiwiZ2V0TG9nb1VybCIsInRhYiIsImxvZ29VcmwiLCJwcm9maWxlIiwiSGlzdG9yeUJ1dHRvbiIsImhhbmRsZUNsaWNrIiwib25DbGljayIsInBhdGgiLCJvbkJhY2tCdXR0b25FdmVudCIsInByZXZlbnREZWZhdWx0IiwiY29tcG9uZW50RGlkTW91bnQiLCJvbnBvcHN0YXRlIiwiY2FuY2VsSWNvbiIsImJ1Y2tldEljb24iLCJhZGRJY29uIiwiZXhjbGFtYXRpb25Sb3VuZEljb24iLCJjbG9ja1JvdW5kSWNvbiIsInBsYXlJY29uIiwiYmx1ZUNoZWNrSWNvbiIsInllbGxvd0NoZWNrSWNvbiIsImRvY0ljb24iLCJwZGZJY29uIiwiZWRpdEljb24iLCJibHVlRW52ZWxvcGVJY29uIiwiaW5mb0ljb24iLCJzb2xkSWNvbiIsImV4cGlyZWRJY29uIiwiU3Bpbm5lciIsInRlc3QiLCJTZW5kTWVzc2FnZSIsImlzT3BlbiIsImNsb3NlIiwic2hvd1N1Y2Nlc3MiLCJzZW5kIiwicmVjaXBpZW50Iiwicm9sZSIsImxpc3RpbmciLCJzZW5kTWVzc2FnZSIsImN1c3RvbVN0eWxlcyIsImxlZnQiLCJib3R0b20iLCJ0cmFuc2Zvcm0iLCJib3JkZXJSYWRpdXMiLCJib3JkZXJCb3R0b20iLCJvdmVybGF5IiwiekluZGV4IiwiU2VsZWN0b3JNb2RhbFN0eWxlIiwiQm9hcmRMaXN0aW5nIiwidG9nZ2xlT3B0aW9ucyIsInNob3dPcHRpb25zIiwic3VibWl0IiwidmlldyIsImhpZGVPcHRpb25zIiwiZGVmYXVsdEFjdGlvbiIsInNob3dEZWFjdGl2YXRlQ29uZmlybSIsImNsb2NrSWNvbiIsImR1cGxpY2F0ZUljb24iLCJ2aWV3SWNvbiIsInN1Ym1pdEljb24iLCJkb3RzSWNvbiIsImRlYWN0aXZhdGVJY29uIiwic2hvd0VkaXQiLCJzaG93UmVtb3ZlIiwic2hvd1N1Ym1pdCIsInNob3dEdXBsaWNhdGUiLCJzaG93RGVhY3RpdmF0ZSIsInNob3dWaWV3Iiwib25SZW1vdmUiLCJvbkR1cGxpY2F0ZSIsIm9uRGVhY3RpdmF0ZSIsImxhc3RBY3Rpb24iLCJsYXN0QWN0aW9uRGF0ZSIsImxhc3RBY3Rpb25Vc2VyIiwib3duZXIiLCJvblN1Ym1pdCIsInN0eWxlIiwic2hvd1N0YXR1c0luZm8iLCJkZXNjcmlwdGlvbiIsInJwIiwiU3VwZXJSaWdodEJvYXJkTGFiZWxzIiwicmlnaHRJbWFnZVN0eWxlIiwiQ2xvc2VkRGVhbHMiLCJzZWxlY3RMaXN0aW5nIiwibG9hZGluZyIsImNoZWNrSWNvbiIsImdldENsb3NlZERlYWxzIiwic2l6ZSIsImV4Y2x1ZGVkQ291bnRyaWVzIiwiZXhjbHVkaW5nIiwibWFwU3RhdGVUb1Byb3BzIiwib3duUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJjb25uZWN0IiwiQ29tbWVyY2lhbEFjdGl2aXR5IiwiZGVsZXRlQmlkIiwidXBkYXRlIiwiZ2V0QWxsRGVhbHMiLCJsaXN0aW5ncyIsIlV0aWxzIiwiY29udGVudFBhcnNlckZyb21TZXJ2ZXIiLCJmaWx0ZXJCeUxpc3RpbmciLCJzZWxlY3RlZExpc3RpbmdzIiwiZmlsdGVyZWQiLCJyZW1vdmUiLCJidWxsZXRJY29uIiwiYWN0aXZlQnVsbGV0SWNvbiIsImFsbExpc3RpbmdzIiwiTWFuYWdlTGlzdGluZ3MiLCJkdXBsaWNhdGUiLCJkcmFmdCIsImxvYWRpbmdEcmFmdCIsImR1cGxpY2F0ZUxpc3RpbmciLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJ1bnNoaWZ0IiwiZGVhY3RpdmF0ZSIsImluYWN0aXZlIiwibG9hZGluZ0luYWN0aXZlIiwiZGVhY3RpdmF0ZUxpc3RpbmciLCJsb2FkaW5nQWN0aXZlIiwibG9hZGluZ0V4cGlyZWQiLCJhY3RpdmUiLCJleHBpcmVkIiwiZ2V0RHJhZnRMaXN0aW5ncyIsImdldEluYWN0aXZlTGlzdGluZ3MiLCJnZXRBY3RpdmVMaXN0aW5ncyIsImdldEV4cGlyZWRMaXN0aW5ncyIsIm1hcmdpblRvcCIsInJlbW92ZUxpc3RpbmciLCJlZGl0YWJsZSIsIk1hbmFnZXIiLCJtb2RlIiwiTWVzc2FnZXMiLCJzZWxlY3RUaHJlYWQiLCJ0aHJlYWQiLCJzZWxlY3RlZFRocmVhZCIsInVwZGF0ZU1lc3NhZ2VzIiwibG9hZGluZ01lc3NhZ2VzIiwibWVzc2FnZXMiLCJnZXRUaHJlYWQiLCJpbnB1dE1lc3NhZ2UiLCJ0aHJlYWRzIiwibG9hZGluZ1RocmVhZHMiLCJnZXRUaHJlYWRzIiwiYURhdGUiLCJsYXN0TWVzc2FnZURhdGUiLCJiRGF0ZSIsIm9wcG9zaXRlUGFydHkiLCJsYXN0TWVzc2FnZVVzZXIiLCJsYXN0TWVzc2FnZUNvbnRlbnQiLCJzZW5kZXIiLCJlbWFpbCIsIlBlbmRpbmdEZWFscyIsImxvYWRpbmdEZWNsaW5lZCIsImdldFBlbmRpbmdEZWFscyIsImdldFJlamVjdGVkRGVhbHMiLCJkZWNsaW5lZEJpZHMiLCJTZXR0aW5ncyIsInVwZGF0ZUNvbXBhbnkiLCJ1cGRhdGluZ0NvbXBhbnkiLCJlZGl0Q29tcGFueUluZm8iLCJ1cGRhdGVVc2VyIiwidXBkYXRpbmdVc2VyIiwiZWRpdFBlcnNvbmFsSW5mbyIsInVwZGF0ZVBhc3N3b3JkIiwidXBkYXRpbmdQYXNzd29yZCIsInBhc3N3b3JkIiwicGFzc3dvcmRDaGVjayIsInBhc3N3b3JkVXBkYXRlZCIsInZhbGlkYXRlIiwicGFzcyIsImRpZ2l0IiwidXBwZXIiLCJzcGVjaWFsIiwiaW52YWxpZFBhc3N3b3JkIiwib2xkUGFzc3dvcmQiLCJ2YWxpZCIsImxvYWRpbmdDb21wYW55VXNlcnMiLCJjb21wYW55VXNlcnMiLCJnZXRVc2VySW5mbyIsImdldENvbXBhbnlVc2VycyIsInJlZ2lzdHJhdGlvbk51bWJlciIsInZhdCIsImFkZHJlc3MiLCJjaXR5IiwiemlwIiwidGl0bGUiLCJwaG9uZSIsIldhdGNobGlzdCIsImdldFdhdGNobGlzdExpc3RpbmdzIiwibWFuYWdlQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIk1hbmFnZUFwcCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZGF0YXNldCIsIiQiLCJUZXN0IiwiTWFuYWdlIiwicmVkdWNlcnMiLCJjb21iaW5lUmVkdWNlcnMiLCJtYW5hZ2UiLCJtYW5hZ2VUeXBlcyIsIlRFU1QiLCJ0ZXN0SXRlbSIsInRleHQiLCJjcmVhdGVTdG9yZSIsImNvbXBhbnlJc1ZhbGlkIiwiU3VwZXJSaWdodERlZmluaXRpb25zIiwia2V5IiwiU3VwZXJSaWdodFByb2R1Y3Rpb25EZXRhaWxzTGFiZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQSxDQUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7O0FBTUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7O0FBTUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7O0FBVUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLG9CQUFvQjtBQUNqQyxhQUFhLE9BQU87QUFDcEIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG9CQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSywwREFBMEQ7QUFDL0QseUVBQWlDLDhCQUE4QjtBQUMvRDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOzs7QUFHQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw4R0FBOEcseUJBQXlCO0FBQ3ZJOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLHFFQUFxRTtBQUMzRTs7QUFFQTtBQUNBLE1BQU0sZ0JBQWdCO0FBQ3RCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLG9EQUFvRDtBQUMxRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvSkFBMkc7QUFDM0c7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVE7QUFDUjs7Ozs7Ozs7Ozs7Ozs7O0FDdG1GTyxJQUFNQSxZQUFZO0FBQ3JCLFVBQUs7QUFDRCxnQkFBTyxRQUROO0FBRUQsc0JBQWE7QUFGWixLQURnQjtBQUtyQixVQUFLO0FBQ0QsZ0JBQU8sTUFETjtBQUVELHNCQUFhO0FBRlosS0FMZ0I7QUFTckIsVUFBSztBQUNELGdCQUFPLFdBRE47QUFFRCxzQkFBYTtBQUZaLEtBVGdCO0FBYXJCLFVBQUs7QUFDRCxnQkFBTyxNQUROO0FBRUQsc0JBQWE7QUFGWixLQWJnQjtBQWlCckIsVUFBSztBQUNELGdCQUFPLFVBRE47QUFFRCxzQkFBYTtBQUZaLEtBakJnQjtBQXFCckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxzQkFBYTtBQUZaLEtBckJnQjtBQXlCckIsVUFBSztBQUNELGdCQUFPLFFBRE47QUFFRCxzQkFBYTtBQUZaLEtBekJnQjtBQTZCckIsVUFBSztBQUNELGdCQUFPLFdBRE47QUFFRCxzQkFBYTtBQUZaLEtBN0JnQjtBQWlDckIsVUFBSztBQUNELGdCQUFPLFVBRE47QUFFRCxzQkFBYTtBQUZaLEtBakNnQjtBQXFDckIsVUFBSztBQUNELGdCQUFPLFVBRE47QUFFRCxzQkFBYTtBQUZaLEtBckNnQjtBQXlDckIsVUFBSztBQUNELGdCQUFPLFFBRE47QUFFRCxzQkFBYTtBQUZaLEtBekNnQjtBQTZDckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxzQkFBYTtBQUZaLEtBN0NnQjtBQWlEckIsVUFBSztBQUNELGdCQUFPLFFBRE47QUFFRCxzQkFBYTtBQUZaLEtBakRnQjtBQXFEckIsVUFBSztBQUNELGdCQUFPLGFBRE47QUFFRCxzQkFBYTtBQUZaLEtBckRnQjtBQXlEckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxzQkFBYTtBQUZaLEtBekRnQjtBQTZEckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxzQkFBYTtBQUZaLEtBN0RnQjtBQWlFckIsVUFBSztBQUNELGdCQUFPLFFBRE47QUFFRCxzQkFBYTtBQUZaLEtBakVnQjtBQXFFckIsVUFBSztBQUNELGdCQUFPLFlBRE47QUFFRCxzQkFBYTtBQUZaLEtBckVnQjtBQXlFckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxzQkFBYTtBQUZaLEtBekVnQjtBQTZFckIsVUFBSztBQUNELGdCQUFPLFFBRE47QUFFRCxzQkFBYTtBQUZaLEtBN0VnQjtBQWlGckIsVUFBSztBQUNELGdCQUFPLFNBRE47QUFFRCxz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c0M7QUFJN0MsVUFBTyxvQkFKc0M7QUFLN0MsVUFBTyxjQUxzQztBQU03QyxVQUFPO0FBTnNDLENBQTFDOztBQVNBLElBQU1wSSx3QkFBd0I7QUFDakMsVUFBTyxNQUQwQjtBQUVqQyxVQUFPLGlCQUYwQjtBQUdqQyxVQUFPLFNBSDBCO0FBSWpDLFVBQU8sa0JBSjBCO0FBS2pDLFVBQU8sTUFMMEI7QUFNakMsVUFBTztBQU4wQixDQUE5QixDIiwiZmlsZSI6Im1hbmFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBzaXplclN0eWxlID0ge1xuXHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0dG9wOiAwLFxuXHRsZWZ0OiAwLFxuXHR2aXNpYmlsaXR5OiAnaGlkZGVuJyxcblx0aGVpZ2h0OiAwLFxuXHRvdmVyZmxvdzogJ3Njcm9sbCcsXG5cdHdoaXRlU3BhY2U6ICdwcmUnXG59O1xuXG52YXIgSU5QVVRfUFJPUFNfQkxBQ0tMSVNUID0gWydleHRyYVdpZHRoJywgJ2luamVjdFN0eWxlcycsICdpbnB1dENsYXNzTmFtZScsICdpbnB1dFJlZicsICdpbnB1dFN0eWxlJywgJ21pbldpZHRoJywgJ29uQXV0b3NpemUnLCAncGxhY2Vob2xkZXJJc01pbldpZHRoJ107XG5cbnZhciBjbGVhbklucHV0UHJvcHMgPSBmdW5jdGlvbiBjbGVhbklucHV0UHJvcHMoaW5wdXRQcm9wcykge1xuXHRJTlBVVF9QUk9QU19CTEFDS0xJU1QuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcblx0XHRyZXR1cm4gZGVsZXRlIGlucHV0UHJvcHNbZmllbGRdO1xuXHR9KTtcblx0cmV0dXJuIGlucHV0UHJvcHM7XG59O1xuXG52YXIgY29weVN0eWxlcyA9IGZ1bmN0aW9uIGNvcHlTdHlsZXMoc3R5bGVzLCBub2RlKSB7XG5cdG5vZGUuc3R5bGUuZm9udFNpemUgPSBzdHlsZXMuZm9udFNpemU7XG5cdG5vZGUuc3R5bGUuZm9udEZhbWlseSA9IHN0eWxlcy5mb250RmFtaWx5O1xuXHRub2RlLnN0eWxlLmZvbnRXZWlnaHQgPSBzdHlsZXMuZm9udFdlaWdodDtcblx0bm9kZS5zdHlsZS5mb250U3R5bGUgPSBzdHlsZXMuZm9udFN0eWxlO1xuXHRub2RlLnN0eWxlLmxldHRlclNwYWNpbmcgPSBzdHlsZXMubGV0dGVyU3BhY2luZztcblx0bm9kZS5zdHlsZS50ZXh0VHJhbnNmb3JtID0gc3R5bGVzLnRleHRUcmFuc2Zvcm07XG59O1xuXG52YXIgaXNJRSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5uYXZpZ2F0b3IgPyAvTVNJRSB8VHJpZGVudFxcL3xFZGdlXFwvLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSA6IGZhbHNlO1xuXG52YXIgZ2VuZXJhdGVJZCA9IGZ1bmN0aW9uIGdlbmVyYXRlSWQoKSB7XG5cdC8vIHdlIG9ubHkgbmVlZCBhbiBhdXRvLWdlbmVyYXRlZCBJRCBmb3Igc3R5bGVzaGVldCBpbmplY3Rpb24sIHdoaWNoIGlzIG9ubHlcblx0Ly8gdXNlZCBmb3IgSUUuIHNvIGlmIHRoZSBicm93c2VyIGlzIG5vdCBJRSwgdGhpcyBzaG91bGQgcmV0dXJuIHVuZGVmaW5lZC5cblx0cmV0dXJuIGlzSUUgPyAnXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTIpIDogdW5kZWZpbmVkO1xufTtcblxudmFyIEF1dG9zaXplSW5wdXQgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuXHRfaW5oZXJpdHMoQXV0b3NpemVJbnB1dCwgX0NvbXBvbmVudCk7XG5cblx0ZnVuY3Rpb24gQXV0b3NpemVJbnB1dChwcm9wcykge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBdXRvc2l6ZUlucHV0KTtcblxuXHRcdHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChBdXRvc2l6ZUlucHV0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXV0b3NpemVJbnB1dCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuXHRcdF90aGlzLmlucHV0UmVmID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRfdGhpcy5pbnB1dCA9IGVsO1xuXHRcdFx0aWYgKHR5cGVvZiBfdGhpcy5wcm9wcy5pbnB1dFJlZiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRfdGhpcy5wcm9wcy5pbnB1dFJlZihlbCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdF90aGlzLnBsYWNlSG9sZGVyU2l6ZXJSZWYgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdF90aGlzLnBsYWNlSG9sZGVyU2l6ZXIgPSBlbDtcblx0XHR9O1xuXG5cdFx0X3RoaXMuc2l6ZXJSZWYgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdF90aGlzLnNpemVyID0gZWw7XG5cdFx0fTtcblxuXHRcdF90aGlzLnN0YXRlID0ge1xuXHRcdFx0aW5wdXRXaWR0aDogcHJvcHMubWluV2lkdGgsXG5cdFx0XHRpbnB1dElkOiBwcm9wcy5pZCB8fCBnZW5lcmF0ZUlkKClcblx0XHR9O1xuXHRcdHJldHVybiBfdGhpcztcblx0fVxuXG5cdF9jcmVhdGVDbGFzcyhBdXRvc2l6ZUlucHV0LCBbe1xuXHRcdGtleTogJ2NvbXBvbmVudERpZE1vdW50Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0XHR0aGlzLm1vdW50ZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5jb3B5SW5wdXRTdHlsZXMoKTtcblx0XHRcdHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuXHRcdFx0dmFyIGlkID0gbmV4dFByb3BzLmlkO1xuXG5cdFx0XHRpZiAoaWQgIT09IHRoaXMucHJvcHMuaWQpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGlucHV0SWQ6IGlkIHx8IGdlbmVyYXRlSWQoKSB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb21wb25lbnREaWRVcGRhdGUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcblx0XHRcdGlmIChwcmV2U3RhdGUuaW5wdXRXaWR0aCAhPT0gdGhpcy5zdGF0ZS5pbnB1dFdpZHRoKSB7XG5cdFx0XHRcdGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkF1dG9zaXplID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5vbkF1dG9zaXplKHRoaXMuc3RhdGUuaW5wdXRXaWR0aCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0XHR0aGlzLm1vdW50ZWQgPSBmYWxzZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb3B5SW5wdXRTdHlsZXMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb3B5SW5wdXRTdHlsZXMoKSB7XG5cdFx0XHRpZiAoIXRoaXMubW91bnRlZCB8fCAhd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGlucHV0U3R5bGVzID0gdGhpcy5pbnB1dCAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmlucHV0KTtcblx0XHRcdGlmICghaW5wdXRTdHlsZXMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29weVN0eWxlcyhpbnB1dFN0eWxlcywgdGhpcy5zaXplcik7XG5cdFx0XHRpZiAodGhpcy5wbGFjZUhvbGRlclNpemVyKSB7XG5cdFx0XHRcdGNvcHlTdHlsZXMoaW5wdXRTdHlsZXMsIHRoaXMucGxhY2VIb2xkZXJTaXplcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAndXBkYXRlSW5wdXRXaWR0aCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZUlucHV0V2lkdGgoKSB7XG5cdFx0XHRpZiAoIXRoaXMubW91bnRlZCB8fCAhdGhpcy5zaXplciB8fCB0eXBlb2YgdGhpcy5zaXplci5zY3JvbGxXaWR0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dmFyIG5ld0lucHV0V2lkdGggPSB2b2lkIDA7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5wbGFjZWhvbGRlciAmJiAoIXRoaXMucHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy52YWx1ZSAmJiB0aGlzLnByb3BzLnBsYWNlaG9sZGVySXNNaW5XaWR0aCkpIHtcblx0XHRcdFx0bmV3SW5wdXRXaWR0aCA9IE1hdGgubWF4KHRoaXMuc2l6ZXIuc2Nyb2xsV2lkdGgsIHRoaXMucGxhY2VIb2xkZXJTaXplci5zY3JvbGxXaWR0aCkgKyAyO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3SW5wdXRXaWR0aCA9IHRoaXMuc2l6ZXIuc2Nyb2xsV2lkdGggKyAyO1xuXHRcdFx0fVxuXHRcdFx0Ly8gYWRkIGV4dHJhV2lkdGggdG8gdGhlIGRldGVjdGVkIHdpZHRoLiBmb3IgbnVtYmVyIHR5cGVzLCB0aGlzIGRlZmF1bHRzIHRvIDE2IHRvIGFsbG93IGZvciB0aGUgc3RlcHBlciBVSVxuXHRcdFx0dmFyIGV4dHJhV2lkdGggPSB0aGlzLnByb3BzLnR5cGUgPT09ICdudW1iZXInICYmIHRoaXMucHJvcHMuZXh0cmFXaWR0aCA9PT0gdW5kZWZpbmVkID8gMTYgOiBwYXJzZUludCh0aGlzLnByb3BzLmV4dHJhV2lkdGgpIHx8IDA7XG5cdFx0XHRuZXdJbnB1dFdpZHRoICs9IGV4dHJhV2lkdGg7XG5cdFx0XHRpZiAobmV3SW5wdXRXaWR0aCA8IHRoaXMucHJvcHMubWluV2lkdGgpIHtcblx0XHRcdFx0bmV3SW5wdXRXaWR0aCA9IHRoaXMucHJvcHMubWluV2lkdGg7XG5cdFx0XHR9XG5cdFx0XHRpZiAobmV3SW5wdXRXaWR0aCAhPT0gdGhpcy5zdGF0ZS5pbnB1dFdpZHRoKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlucHV0V2lkdGg6IG5ld0lucHV0V2lkdGhcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZ2V0SW5wdXQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRJbnB1dCgpIHtcblx0XHRcdHJldHVybiB0aGlzLmlucHV0O1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2ZvY3VzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXMoKSB7XG5cdFx0XHR0aGlzLmlucHV0LmZvY3VzKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnYmx1cicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGJsdXIoKSB7XG5cdFx0XHR0aGlzLmlucHV0LmJsdXIoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdzZWxlY3QnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBzZWxlY3QoKSB7XG5cdFx0XHR0aGlzLmlucHV0LnNlbGVjdCgpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlclN0eWxlcycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlclN0eWxlcygpIHtcblx0XHRcdC8vIHRoaXMgbWV0aG9kIGluamVjdHMgc3R5bGVzIHRvIGhpZGUgSUUncyBjbGVhciBpbmRpY2F0b3IsIHdoaWNoIG1lc3Nlc1xuXHRcdFx0Ly8gd2l0aCBpbnB1dCBzaXplIGRldGVjdGlvbi4gdGhlIHN0eWxlc2hlZXQgaXMgb25seSBpbmplY3RlZCB3aGVuIHRoZVxuXHRcdFx0Ly8gYnJvd3NlciBpcyBJRSwgYW5kIGNhbiBhbHNvIGJlIGRpc2FibGVkIGJ5IHRoZSBgaW5qZWN0U3R5bGVzYCBwcm9wLlxuXHRcdFx0dmFyIGluamVjdFN0eWxlcyA9IHRoaXMucHJvcHMuaW5qZWN0U3R5bGVzO1xuXG5cdFx0XHRyZXR1cm4gaXNJRSAmJiBpbmplY3RTdHlsZXMgPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnc3R5bGUnLCB7IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7XG5cdFx0XHRcdFx0X19odG1sOiAnaW5wdXQjJyArIHRoaXMuc3RhdGUuaW5wdXRJZCArICc6Oi1tcy1jbGVhciB7ZGlzcGxheTogbm9uZTt9J1xuXHRcdFx0XHR9IH0pIDogbnVsbDtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR2YXIgc2l6ZXJWYWx1ZSA9IFt0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSwgdGhpcy5wcm9wcy52YWx1ZSwgJyddLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG5cdFx0XHRcdGlmIChwcmV2aW91c1ZhbHVlICE9PSBudWxsICYmIHByZXZpb3VzVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHJldHVybiBwcmV2aW91c1ZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBjdXJyZW50VmFsdWU7XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIHdyYXBwZXJTdHlsZSA9IF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLnN0eWxlKTtcblx0XHRcdGlmICghd3JhcHBlclN0eWxlLmRpc3BsYXkpIHdyYXBwZXJTdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cblx0XHRcdHZhciBpbnB1dFN0eWxlID0gX2V4dGVuZHMoe1xuXHRcdFx0XHRib3hTaXppbmc6ICdjb250ZW50LWJveCcsXG5cdFx0XHRcdHdpZHRoOiB0aGlzLnN0YXRlLmlucHV0V2lkdGggKyAncHgnXG5cdFx0XHR9LCB0aGlzLnByb3BzLmlucHV0U3R5bGUpO1xuXG5cdFx0XHR2YXIgaW5wdXRQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyh0aGlzLnByb3BzLCBbXSk7XG5cblx0XHRcdGNsZWFuSW5wdXRQcm9wcyhpbnB1dFByb3BzKTtcblx0XHRcdGlucHV0UHJvcHMuY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5pbnB1dENsYXNzTmFtZTtcblx0XHRcdGlucHV0UHJvcHMuaWQgPSB0aGlzLnN0YXRlLmlucHV0SWQ7XG5cdFx0XHRpbnB1dFByb3BzLnN0eWxlID0gaW5wdXRTdHlsZTtcblxuXHRcdFx0cmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0eyBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLCBzdHlsZTogd3JhcHBlclN0eWxlIH0sXG5cdFx0XHRcdHRoaXMucmVuZGVyU3R5bGVzKCksXG5cdFx0XHRcdF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIF9leHRlbmRzKHt9LCBpbnB1dFByb3BzLCB7IHJlZjogdGhpcy5pbnB1dFJlZiB9KSksXG5cdFx0XHRcdF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdHsgcmVmOiB0aGlzLnNpemVyUmVmLCBzdHlsZTogc2l6ZXJTdHlsZSB9LFxuXHRcdFx0XHRcdHNpemVyVmFsdWVcblx0XHRcdFx0KSxcblx0XHRcdFx0dGhpcy5wcm9wcy5wbGFjZWhvbGRlciA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdHsgcmVmOiB0aGlzLnBsYWNlSG9sZGVyU2l6ZXJSZWYsIHN0eWxlOiBzaXplclN0eWxlIH0sXG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5wbGFjZWhvbGRlclxuXHRcdFx0XHQpIDogbnVsbFxuXHRcdFx0KTtcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gQXV0b3NpemVJbnB1dDtcbn0oX3JlYWN0LkNvbXBvbmVudCk7XG5cbkF1dG9zaXplSW5wdXQucHJvcFR5cGVzID0ge1xuXHRjbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCAvLyBjbGFzc05hbWUgZm9yIHRoZSBvdXRlciBlbGVtZW50XG5cdGRlZmF1bHRWYWx1ZTogX3Byb3BUeXBlczIuZGVmYXVsdC5hbnksIC8vIGRlZmF1bHQgZmllbGQgdmFsdWVcblx0ZXh0cmFXaWR0aDogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoWy8vIGFkZGl0aW9uYWwgd2lkdGggZm9yIGlucHV0IGVsZW1lbnRcblx0X3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXIsIF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nXSksXG5cdGlkOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgLy8gaWQgdG8gdXNlIGZvciB0aGUgaW5wdXQsIGNhbiBiZSBzZXQgZm9yIGNvbnNpc3RlbnQgc25hcHNob3RzXG5cdGluamVjdFN0eWxlczogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLCAvLyBpbmplY3QgdGhlIGN1c3RvbSBzdHlsZXNoZWV0IHRvIGhpZGUgY2xlYXIgVUksIGRlZmF1bHRzIHRvIHRydWVcblx0aW5wdXRDbGFzc05hbWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCAvLyBjbGFzc05hbWUgZm9yIHRoZSBpbnB1dCBlbGVtZW50XG5cdGlucHV0UmVmOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsIC8vIHJlZiBjYWxsYmFjayBmb3IgdGhlIGlucHV0IGVsZW1lbnRcblx0aW5wdXRTdHlsZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3QsIC8vIGNzcyBzdHlsZXMgZm9yIHRoZSBpbnB1dCBlbGVtZW50XG5cdG1pbldpZHRoOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbLy8gbWluaW11bSB3aWR0aCBmb3IgaW5wdXQgZWxlbWVudFxuXHRfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlciwgX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmddKSxcblx0b25BdXRvc2l6ZTogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLCAvLyBvbkF1dG9zaXplIGhhbmRsZXI6IGZ1bmN0aW9uKG5ld1dpZHRoKSB7fVxuXHRvbkNoYW5nZTogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLCAvLyBvbkNoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbihldmVudCkge31cblx0cGxhY2Vob2xkZXI6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCAvLyBwbGFjZWhvbGRlciB0ZXh0XG5cdHBsYWNlaG9sZGVySXNNaW5XaWR0aDogX3Byb3BUeXBlczIuZGVmYXVsdC5ib29sLCAvLyBkb24ndCBjb2xsYXBzZSBzaXplIHRvIGxlc3MgdGhhbiB0aGUgcGxhY2Vob2xkZXJcblx0c3R5bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LCAvLyBjc3Mgc3R5bGVzIGZvciB0aGUgb3V0ZXIgZWxlbWVudFxuXHR2YWx1ZTogX3Byb3BUeXBlczIuZGVmYXVsdC5hbnkgLy8gZmllbGQgdmFsdWVcbn07XG5BdXRvc2l6ZUlucHV0LmRlZmF1bHRQcm9wcyA9IHtcblx0bWluV2lkdGg6IDEsXG5cdGluamVjdFN0eWxlczogdHJ1ZVxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQXV0b3NpemVJbnB1dDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1pbnB1dC1hdXRvc2l6ZS9saWIvQXV0b3NpemVJbnB1dC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtaW5wdXQtYXV0b3NpemUvbGliL0F1dG9zaXplSW5wdXQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsImltcG9ydCBBdXRvc2l6ZUlucHV0IGZyb20gJ3JlYWN0LWlucHV0LWF1dG9zaXplJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbnZhciBhcnJvd1JlbmRlcmVyID0gZnVuY3Rpb24gYXJyb3dSZW5kZXJlcihfcmVmKSB7XG5cdHZhciBvbk1vdXNlRG93biA9IF9yZWYub25Nb3VzZURvd247XG5cblx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XG5cdFx0Y2xhc3NOYW1lOiAnU2VsZWN0LWFycm93Jyxcblx0XHRvbk1vdXNlRG93bjogb25Nb3VzZURvd25cblx0fSk7XG59O1xuXG5hcnJvd1JlbmRlcmVyLnByb3BUeXBlcyA9IHtcblx0b25Nb3VzZURvd246IFByb3BUeXBlcy5mdW5jXG59O1xuXG52YXIgY2xlYXJSZW5kZXJlciA9IGZ1bmN0aW9uIGNsZWFyUmVuZGVyZXIoKSB7XG5cdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywge1xuXHRcdGNsYXNzTmFtZTogJ1NlbGVjdC1jbGVhcicsXG5cdFx0ZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHsgX19odG1sOiAnJnRpbWVzOycgfVxuXHR9KTtcbn07XG5cbnZhciBtYXAgPSBbeyAnYmFzZSc6ICdBJywgJ2xldHRlcnMnOiAvW1xcdTAwNDFcXHUyNEI2XFx1RkYyMVxcdTAwQzBcXHUwMEMxXFx1MDBDMlxcdTFFQTZcXHUxRUE0XFx1MUVBQVxcdTFFQThcXHUwMEMzXFx1MDEwMFxcdTAxMDJcXHUxRUIwXFx1MUVBRVxcdTFFQjRcXHUxRUIyXFx1MDIyNlxcdTAxRTBcXHUwMEM0XFx1MDFERVxcdTFFQTJcXHUwMEM1XFx1MDFGQVxcdTAxQ0RcXHUwMjAwXFx1MDIwMlxcdTFFQTBcXHUxRUFDXFx1MUVCNlxcdTFFMDBcXHUwMTA0XFx1MDIzQVxcdTJDNkZdL2cgfSwgeyAnYmFzZSc6ICdBQScsICdsZXR0ZXJzJzogL1tcXHVBNzMyXS9nIH0sIHsgJ2Jhc2UnOiAnQUUnLCAnbGV0dGVycyc6IC9bXFx1MDBDNlxcdTAxRkNcXHUwMUUyXS9nIH0sIHsgJ2Jhc2UnOiAnQU8nLCAnbGV0dGVycyc6IC9bXFx1QTczNF0vZyB9LCB7ICdiYXNlJzogJ0FVJywgJ2xldHRlcnMnOiAvW1xcdUE3MzZdL2cgfSwgeyAnYmFzZSc6ICdBVicsICdsZXR0ZXJzJzogL1tcXHVBNzM4XFx1QTczQV0vZyB9LCB7ICdiYXNlJzogJ0FZJywgJ2xldHRlcnMnOiAvW1xcdUE3M0NdL2cgfSwgeyAnYmFzZSc6ICdCJywgJ2xldHRlcnMnOiAvW1xcdTAwNDJcXHUyNEI3XFx1RkYyMlxcdTFFMDJcXHUxRTA0XFx1MUUwNlxcdTAyNDNcXHUwMTgyXFx1MDE4MV0vZyB9LCB7ICdiYXNlJzogJ0MnLCAnbGV0dGVycyc6IC9bXFx1MDA0M1xcdTI0QjhcXHVGRjIzXFx1MDEwNlxcdTAxMDhcXHUwMTBBXFx1MDEwQ1xcdTAwQzdcXHUxRTA4XFx1MDE4N1xcdTAyM0JcXHVBNzNFXS9nIH0sIHsgJ2Jhc2UnOiAnRCcsICdsZXR0ZXJzJzogL1tcXHUwMDQ0XFx1MjRCOVxcdUZGMjRcXHUxRTBBXFx1MDEwRVxcdTFFMENcXHUxRTEwXFx1MUUxMlxcdTFFMEVcXHUwMTEwXFx1MDE4QlxcdTAxOEFcXHUwMTg5XFx1QTc3OV0vZyB9LCB7ICdiYXNlJzogJ0RaJywgJ2xldHRlcnMnOiAvW1xcdTAxRjFcXHUwMUM0XS9nIH0sIHsgJ2Jhc2UnOiAnRHonLCAnbGV0dGVycyc6IC9bXFx1MDFGMlxcdTAxQzVdL2cgfSwgeyAnYmFzZSc6ICdFJywgJ2xldHRlcnMnOiAvW1xcdTAwNDVcXHUyNEJBXFx1RkYyNVxcdTAwQzhcXHUwMEM5XFx1MDBDQVxcdTFFQzBcXHUxRUJFXFx1MUVDNFxcdTFFQzJcXHUxRUJDXFx1MDExMlxcdTFFMTRcXHUxRTE2XFx1MDExNFxcdTAxMTZcXHUwMENCXFx1MUVCQVxcdTAxMUFcXHUwMjA0XFx1MDIwNlxcdTFFQjhcXHUxRUM2XFx1MDIyOFxcdTFFMUNcXHUwMTE4XFx1MUUxOFxcdTFFMUFcXHUwMTkwXFx1MDE4RV0vZyB9LCB7ICdiYXNlJzogJ0YnLCAnbGV0dGVycyc6IC9bXFx1MDA0NlxcdTI0QkJcXHVGRjI2XFx1MUUxRVxcdTAxOTFcXHVBNzdCXS9nIH0sIHsgJ2Jhc2UnOiAnRycsICdsZXR0ZXJzJzogL1tcXHUwMDQ3XFx1MjRCQ1xcdUZGMjdcXHUwMUY0XFx1MDExQ1xcdTFFMjBcXHUwMTFFXFx1MDEyMFxcdTAxRTZcXHUwMTIyXFx1MDFFNFxcdTAxOTNcXHVBN0EwXFx1QTc3RFxcdUE3N0VdL2cgfSwgeyAnYmFzZSc6ICdIJywgJ2xldHRlcnMnOiAvW1xcdTAwNDhcXHUyNEJEXFx1RkYyOFxcdTAxMjRcXHUxRTIyXFx1MUUyNlxcdTAyMUVcXHUxRTI0XFx1MUUyOFxcdTFFMkFcXHUwMTI2XFx1MkM2N1xcdTJDNzVcXHVBNzhEXS9nIH0sIHsgJ2Jhc2UnOiAnSScsICdsZXR0ZXJzJzogL1tcXHUwMDQ5XFx1MjRCRVxcdUZGMjlcXHUwMENDXFx1MDBDRFxcdTAwQ0VcXHUwMTI4XFx1MDEyQVxcdTAxMkNcXHUwMTMwXFx1MDBDRlxcdTFFMkVcXHUxRUM4XFx1MDFDRlxcdTAyMDhcXHUwMjBBXFx1MUVDQVxcdTAxMkVcXHUxRTJDXFx1MDE5N10vZyB9LCB7ICdiYXNlJzogJ0onLCAnbGV0dGVycyc6IC9bXFx1MDA0QVxcdTI0QkZcXHVGRjJBXFx1MDEzNFxcdTAyNDhdL2cgfSwgeyAnYmFzZSc6ICdLJywgJ2xldHRlcnMnOiAvW1xcdTAwNEJcXHUyNEMwXFx1RkYyQlxcdTFFMzBcXHUwMUU4XFx1MUUzMlxcdTAxMzZcXHUxRTM0XFx1MDE5OFxcdTJDNjlcXHVBNzQwXFx1QTc0MlxcdUE3NDRcXHVBN0EyXS9nIH0sIHsgJ2Jhc2UnOiAnTCcsICdsZXR0ZXJzJzogL1tcXHUwMDRDXFx1MjRDMVxcdUZGMkNcXHUwMTNGXFx1MDEzOVxcdTAxM0RcXHUxRTM2XFx1MUUzOFxcdTAxM0JcXHUxRTNDXFx1MUUzQVxcdTAxNDFcXHUwMjNEXFx1MkM2MlxcdTJDNjBcXHVBNzQ4XFx1QTc0NlxcdUE3ODBdL2cgfSwgeyAnYmFzZSc6ICdMSicsICdsZXR0ZXJzJzogL1tcXHUwMUM3XS9nIH0sIHsgJ2Jhc2UnOiAnTGonLCAnbGV0dGVycyc6IC9bXFx1MDFDOF0vZyB9LCB7ICdiYXNlJzogJ00nLCAnbGV0dGVycyc6IC9bXFx1MDA0RFxcdTI0QzJcXHVGRjJEXFx1MUUzRVxcdTFFNDBcXHUxRTQyXFx1MkM2RVxcdTAxOUNdL2cgfSwgeyAnYmFzZSc6ICdOJywgJ2xldHRlcnMnOiAvW1xcdTAwNEVcXHUyNEMzXFx1RkYyRVxcdTAxRjhcXHUwMTQzXFx1MDBEMVxcdTFFNDRcXHUwMTQ3XFx1MUU0NlxcdTAxNDVcXHUxRTRBXFx1MUU0OFxcdTAyMjBcXHUwMTlEXFx1QTc5MFxcdUE3QTRdL2cgfSwgeyAnYmFzZSc6ICdOSicsICdsZXR0ZXJzJzogL1tcXHUwMUNBXS9nIH0sIHsgJ2Jhc2UnOiAnTmonLCAnbGV0dGVycyc6IC9bXFx1MDFDQl0vZyB9LCB7ICdiYXNlJzogJ08nLCAnbGV0dGVycyc6IC9bXFx1MDA0RlxcdTI0QzRcXHVGRjJGXFx1MDBEMlxcdTAwRDNcXHUwMEQ0XFx1MUVEMlxcdTFFRDBcXHUxRUQ2XFx1MUVENFxcdTAwRDVcXHUxRTRDXFx1MDIyQ1xcdTFFNEVcXHUwMTRDXFx1MUU1MFxcdTFFNTJcXHUwMTRFXFx1MDIyRVxcdTAyMzBcXHUwMEQ2XFx1MDIyQVxcdTFFQ0VcXHUwMTUwXFx1MDFEMVxcdTAyMENcXHUwMjBFXFx1MDFBMFxcdTFFRENcXHUxRURBXFx1MUVFMFxcdTFFREVcXHUxRUUyXFx1MUVDQ1xcdTFFRDhcXHUwMUVBXFx1MDFFQ1xcdTAwRDhcXHUwMUZFXFx1MDE4NlxcdTAxOUZcXHVBNzRBXFx1QTc0Q10vZyB9LCB7ICdiYXNlJzogJ09JJywgJ2xldHRlcnMnOiAvW1xcdTAxQTJdL2cgfSwgeyAnYmFzZSc6ICdPTycsICdsZXR0ZXJzJzogL1tcXHVBNzRFXS9nIH0sIHsgJ2Jhc2UnOiAnT1UnLCAnbGV0dGVycyc6IC9bXFx1MDIyMl0vZyB9LCB7ICdiYXNlJzogJ1AnLCAnbGV0dGVycyc6IC9bXFx1MDA1MFxcdTI0QzVcXHVGRjMwXFx1MUU1NFxcdTFFNTZcXHUwMUE0XFx1MkM2M1xcdUE3NTBcXHVBNzUyXFx1QTc1NF0vZyB9LCB7ICdiYXNlJzogJ1EnLCAnbGV0dGVycyc6IC9bXFx1MDA1MVxcdTI0QzZcXHVGRjMxXFx1QTc1NlxcdUE3NThcXHUwMjRBXS9nIH0sIHsgJ2Jhc2UnOiAnUicsICdsZXR0ZXJzJzogL1tcXHUwMDUyXFx1MjRDN1xcdUZGMzJcXHUwMTU0XFx1MUU1OFxcdTAxNThcXHUwMjEwXFx1MDIxMlxcdTFFNUFcXHUxRTVDXFx1MDE1NlxcdTFFNUVcXHUwMjRDXFx1MkM2NFxcdUE3NUFcXHVBN0E2XFx1QTc4Ml0vZyB9LCB7ICdiYXNlJzogJ1MnLCAnbGV0dGVycyc6IC9bXFx1MDA1M1xcdTI0QzhcXHVGRjMzXFx1MUU5RVxcdTAxNUFcXHUxRTY0XFx1MDE1Q1xcdTFFNjBcXHUwMTYwXFx1MUU2NlxcdTFFNjJcXHUxRTY4XFx1MDIxOFxcdTAxNUVcXHUyQzdFXFx1QTdBOFxcdUE3ODRdL2cgfSwgeyAnYmFzZSc6ICdUJywgJ2xldHRlcnMnOiAvW1xcdTAwNTRcXHUyNEM5XFx1RkYzNFxcdTFFNkFcXHUwMTY0XFx1MUU2Q1xcdTAyMUFcXHUwMTYyXFx1MUU3MFxcdTFFNkVcXHUwMTY2XFx1MDFBQ1xcdTAxQUVcXHUwMjNFXFx1QTc4Nl0vZyB9LCB7ICdiYXNlJzogJ1RaJywgJ2xldHRlcnMnOiAvW1xcdUE3MjhdL2cgfSwgeyAnYmFzZSc6ICdVJywgJ2xldHRlcnMnOiAvW1xcdTAwNTVcXHUyNENBXFx1RkYzNVxcdTAwRDlcXHUwMERBXFx1MDBEQlxcdTAxNjhcXHUxRTc4XFx1MDE2QVxcdTFFN0FcXHUwMTZDXFx1MDBEQ1xcdTAxREJcXHUwMUQ3XFx1MDFENVxcdTAxRDlcXHUxRUU2XFx1MDE2RVxcdTAxNzBcXHUwMUQzXFx1MDIxNFxcdTAyMTZcXHUwMUFGXFx1MUVFQVxcdTFFRThcXHUxRUVFXFx1MUVFQ1xcdTFFRjBcXHUxRUU0XFx1MUU3MlxcdTAxNzJcXHUxRTc2XFx1MUU3NFxcdTAyNDRdL2cgfSwgeyAnYmFzZSc6ICdWJywgJ2xldHRlcnMnOiAvW1xcdTAwNTZcXHUyNENCXFx1RkYzNlxcdTFFN0NcXHUxRTdFXFx1MDFCMlxcdUE3NUVcXHUwMjQ1XS9nIH0sIHsgJ2Jhc2UnOiAnVlknLCAnbGV0dGVycyc6IC9bXFx1QTc2MF0vZyB9LCB7ICdiYXNlJzogJ1cnLCAnbGV0dGVycyc6IC9bXFx1MDA1N1xcdTI0Q0NcXHVGRjM3XFx1MUU4MFxcdTFFODJcXHUwMTc0XFx1MUU4NlxcdTFFODRcXHUxRTg4XFx1MkM3Ml0vZyB9LCB7ICdiYXNlJzogJ1gnLCAnbGV0dGVycyc6IC9bXFx1MDA1OFxcdTI0Q0RcXHVGRjM4XFx1MUU4QVxcdTFFOENdL2cgfSwgeyAnYmFzZSc6ICdZJywgJ2xldHRlcnMnOiAvW1xcdTAwNTlcXHUyNENFXFx1RkYzOVxcdTFFRjJcXHUwMEREXFx1MDE3NlxcdTFFRjhcXHUwMjMyXFx1MUU4RVxcdTAxNzhcXHUxRUY2XFx1MUVGNFxcdTAxQjNcXHUwMjRFXFx1MUVGRV0vZyB9LCB7ICdiYXNlJzogJ1onLCAnbGV0dGVycyc6IC9bXFx1MDA1QVxcdTI0Q0ZcXHVGRjNBXFx1MDE3OVxcdTFFOTBcXHUwMTdCXFx1MDE3RFxcdTFFOTJcXHUxRTk0XFx1MDFCNVxcdTAyMjRcXHUyQzdGXFx1MkM2QlxcdUE3NjJdL2cgfSwgeyAnYmFzZSc6ICdhJywgJ2xldHRlcnMnOiAvW1xcdTAwNjFcXHUyNEQwXFx1RkY0MVxcdTFFOUFcXHUwMEUwXFx1MDBFMVxcdTAwRTJcXHUxRUE3XFx1MUVBNVxcdTFFQUJcXHUxRUE5XFx1MDBFM1xcdTAxMDFcXHUwMTAzXFx1MUVCMVxcdTFFQUZcXHUxRUI1XFx1MUVCM1xcdTAyMjdcXHUwMUUxXFx1MDBFNFxcdTAxREZcXHUxRUEzXFx1MDBFNVxcdTAxRkJcXHUwMUNFXFx1MDIwMVxcdTAyMDNcXHUxRUExXFx1MUVBRFxcdTFFQjdcXHUxRTAxXFx1MDEwNVxcdTJDNjVcXHUwMjUwXS9nIH0sIHsgJ2Jhc2UnOiAnYWEnLCAnbGV0dGVycyc6IC9bXFx1QTczM10vZyB9LCB7ICdiYXNlJzogJ2FlJywgJ2xldHRlcnMnOiAvW1xcdTAwRTZcXHUwMUZEXFx1MDFFM10vZyB9LCB7ICdiYXNlJzogJ2FvJywgJ2xldHRlcnMnOiAvW1xcdUE3MzVdL2cgfSwgeyAnYmFzZSc6ICdhdScsICdsZXR0ZXJzJzogL1tcXHVBNzM3XS9nIH0sIHsgJ2Jhc2UnOiAnYXYnLCAnbGV0dGVycyc6IC9bXFx1QTczOVxcdUE3M0JdL2cgfSwgeyAnYmFzZSc6ICdheScsICdsZXR0ZXJzJzogL1tcXHVBNzNEXS9nIH0sIHsgJ2Jhc2UnOiAnYicsICdsZXR0ZXJzJzogL1tcXHUwMDYyXFx1MjREMVxcdUZGNDJcXHUxRTAzXFx1MUUwNVxcdTFFMDdcXHUwMTgwXFx1MDE4M1xcdTAyNTNdL2cgfSwgeyAnYmFzZSc6ICdjJywgJ2xldHRlcnMnOiAvW1xcdTAwNjNcXHUyNEQyXFx1RkY0M1xcdTAxMDdcXHUwMTA5XFx1MDEwQlxcdTAxMERcXHUwMEU3XFx1MUUwOVxcdTAxODhcXHUwMjNDXFx1QTczRlxcdTIxODRdL2cgfSwgeyAnYmFzZSc6ICdkJywgJ2xldHRlcnMnOiAvW1xcdTAwNjRcXHUyNEQzXFx1RkY0NFxcdTFFMEJcXHUwMTBGXFx1MUUwRFxcdTFFMTFcXHUxRTEzXFx1MUUwRlxcdTAxMTFcXHUwMThDXFx1MDI1NlxcdTAyNTdcXHVBNzdBXS9nIH0sIHsgJ2Jhc2UnOiAnZHonLCAnbGV0dGVycyc6IC9bXFx1MDFGM1xcdTAxQzZdL2cgfSwgeyAnYmFzZSc6ICdlJywgJ2xldHRlcnMnOiAvW1xcdTAwNjVcXHUyNEQ0XFx1RkY0NVxcdTAwRThcXHUwMEU5XFx1MDBFQVxcdTFFQzFcXHUxRUJGXFx1MUVDNVxcdTFFQzNcXHUxRUJEXFx1MDExM1xcdTFFMTVcXHUxRTE3XFx1MDExNVxcdTAxMTdcXHUwMEVCXFx1MUVCQlxcdTAxMUJcXHUwMjA1XFx1MDIwN1xcdTFFQjlcXHUxRUM3XFx1MDIyOVxcdTFFMURcXHUwMTE5XFx1MUUxOVxcdTFFMUJcXHUwMjQ3XFx1MDI1QlxcdTAxRERdL2cgfSwgeyAnYmFzZSc6ICdmJywgJ2xldHRlcnMnOiAvW1xcdTAwNjZcXHUyNEQ1XFx1RkY0NlxcdTFFMUZcXHUwMTkyXFx1QTc3Q10vZyB9LCB7ICdiYXNlJzogJ2cnLCAnbGV0dGVycyc6IC9bXFx1MDA2N1xcdTI0RDZcXHVGRjQ3XFx1MDFGNVxcdTAxMURcXHUxRTIxXFx1MDExRlxcdTAxMjFcXHUwMUU3XFx1MDEyM1xcdTAxRTVcXHUwMjYwXFx1QTdBMVxcdTFENzlcXHVBNzdGXS9nIH0sIHsgJ2Jhc2UnOiAnaCcsICdsZXR0ZXJzJzogL1tcXHUwMDY4XFx1MjREN1xcdUZGNDhcXHUwMTI1XFx1MUUyM1xcdTFFMjdcXHUwMjFGXFx1MUUyNVxcdTFFMjlcXHUxRTJCXFx1MUU5NlxcdTAxMjdcXHUyQzY4XFx1MkM3NlxcdTAyNjVdL2cgfSwgeyAnYmFzZSc6ICdodicsICdsZXR0ZXJzJzogL1tcXHUwMTk1XS9nIH0sIHsgJ2Jhc2UnOiAnaScsICdsZXR0ZXJzJzogL1tcXHUwMDY5XFx1MjREOFxcdUZGNDlcXHUwMEVDXFx1MDBFRFxcdTAwRUVcXHUwMTI5XFx1MDEyQlxcdTAxMkRcXHUwMEVGXFx1MUUyRlxcdTFFQzlcXHUwMUQwXFx1MDIwOVxcdTAyMEJcXHUxRUNCXFx1MDEyRlxcdTFFMkRcXHUwMjY4XFx1MDEzMV0vZyB9LCB7ICdiYXNlJzogJ2onLCAnbGV0dGVycyc6IC9bXFx1MDA2QVxcdTI0RDlcXHVGRjRBXFx1MDEzNVxcdTAxRjBcXHUwMjQ5XS9nIH0sIHsgJ2Jhc2UnOiAnaycsICdsZXR0ZXJzJzogL1tcXHUwMDZCXFx1MjREQVxcdUZGNEJcXHUxRTMxXFx1MDFFOVxcdTFFMzNcXHUwMTM3XFx1MUUzNVxcdTAxOTlcXHUyQzZBXFx1QTc0MVxcdUE3NDNcXHVBNzQ1XFx1QTdBM10vZyB9LCB7ICdiYXNlJzogJ2wnLCAnbGV0dGVycyc6IC9bXFx1MDA2Q1xcdTI0REJcXHVGRjRDXFx1MDE0MFxcdTAxM0FcXHUwMTNFXFx1MUUzN1xcdTFFMzlcXHUwMTNDXFx1MUUzRFxcdTFFM0JcXHUwMTdGXFx1MDE0MlxcdTAxOUFcXHUwMjZCXFx1MkM2MVxcdUE3NDlcXHVBNzgxXFx1QTc0N10vZyB9LCB7ICdiYXNlJzogJ2xqJywgJ2xldHRlcnMnOiAvW1xcdTAxQzldL2cgfSwgeyAnYmFzZSc6ICdtJywgJ2xldHRlcnMnOiAvW1xcdTAwNkRcXHUyNERDXFx1RkY0RFxcdTFFM0ZcXHUxRTQxXFx1MUU0M1xcdTAyNzFcXHUwMjZGXS9nIH0sIHsgJ2Jhc2UnOiAnbicsICdsZXR0ZXJzJzogL1tcXHUwMDZFXFx1MjRERFxcdUZGNEVcXHUwMUY5XFx1MDE0NFxcdTAwRjFcXHUxRTQ1XFx1MDE0OFxcdTFFNDdcXHUwMTQ2XFx1MUU0QlxcdTFFNDlcXHUwMTlFXFx1MDI3MlxcdTAxNDlcXHVBNzkxXFx1QTdBNV0vZyB9LCB7ICdiYXNlJzogJ25qJywgJ2xldHRlcnMnOiAvW1xcdTAxQ0NdL2cgfSwgeyAnYmFzZSc6ICdvJywgJ2xldHRlcnMnOiAvW1xcdTAwNkZcXHUyNERFXFx1RkY0RlxcdTAwRjJcXHUwMEYzXFx1MDBGNFxcdTFFRDNcXHUxRUQxXFx1MUVEN1xcdTFFRDVcXHUwMEY1XFx1MUU0RFxcdTAyMkRcXHUxRTRGXFx1MDE0RFxcdTFFNTFcXHUxRTUzXFx1MDE0RlxcdTAyMkZcXHUwMjMxXFx1MDBGNlxcdTAyMkJcXHUxRUNGXFx1MDE1MVxcdTAxRDJcXHUwMjBEXFx1MDIwRlxcdTAxQTFcXHUxRUREXFx1MUVEQlxcdTFFRTFcXHUxRURGXFx1MUVFM1xcdTFFQ0RcXHUxRUQ5XFx1MDFFQlxcdTAxRURcXHUwMEY4XFx1MDFGRlxcdTAyNTRcXHVBNzRCXFx1QTc0RFxcdTAyNzVdL2cgfSwgeyAnYmFzZSc6ICdvaScsICdsZXR0ZXJzJzogL1tcXHUwMUEzXS9nIH0sIHsgJ2Jhc2UnOiAnb3UnLCAnbGV0dGVycyc6IC9bXFx1MDIyM10vZyB9LCB7ICdiYXNlJzogJ29vJywgJ2xldHRlcnMnOiAvW1xcdUE3NEZdL2cgfSwgeyAnYmFzZSc6ICdwJywgJ2xldHRlcnMnOiAvW1xcdTAwNzBcXHUyNERGXFx1RkY1MFxcdTFFNTVcXHUxRTU3XFx1MDFBNVxcdTFEN0RcXHVBNzUxXFx1QTc1M1xcdUE3NTVdL2cgfSwgeyAnYmFzZSc6ICdxJywgJ2xldHRlcnMnOiAvW1xcdTAwNzFcXHUyNEUwXFx1RkY1MVxcdTAyNEJcXHVBNzU3XFx1QTc1OV0vZyB9LCB7ICdiYXNlJzogJ3InLCAnbGV0dGVycyc6IC9bXFx1MDA3MlxcdTI0RTFcXHVGRjUyXFx1MDE1NVxcdTFFNTlcXHUwMTU5XFx1MDIxMVxcdTAyMTNcXHUxRTVCXFx1MUU1RFxcdTAxNTdcXHUxRTVGXFx1MDI0RFxcdTAyN0RcXHVBNzVCXFx1QTdBN1xcdUE3ODNdL2cgfSwgeyAnYmFzZSc6ICdzJywgJ2xldHRlcnMnOiAvW1xcdTAwNzNcXHUyNEUyXFx1RkY1M1xcdTAwREZcXHUwMTVCXFx1MUU2NVxcdTAxNURcXHUxRTYxXFx1MDE2MVxcdTFFNjdcXHUxRTYzXFx1MUU2OVxcdTAyMTlcXHUwMTVGXFx1MDIzRlxcdUE3QTlcXHVBNzg1XFx1MUU5Ql0vZyB9LCB7ICdiYXNlJzogJ3QnLCAnbGV0dGVycyc6IC9bXFx1MDA3NFxcdTI0RTNcXHVGRjU0XFx1MUU2QlxcdTFFOTdcXHUwMTY1XFx1MUU2RFxcdTAyMUJcXHUwMTYzXFx1MUU3MVxcdTFFNkZcXHUwMTY3XFx1MDFBRFxcdTAyODhcXHUyQzY2XFx1QTc4N10vZyB9LCB7ICdiYXNlJzogJ3R6JywgJ2xldHRlcnMnOiAvW1xcdUE3MjldL2cgfSwgeyAnYmFzZSc6ICd1JywgJ2xldHRlcnMnOiAvW1xcdTAwNzVcXHUyNEU0XFx1RkY1NVxcdTAwRjlcXHUwMEZBXFx1MDBGQlxcdTAxNjlcXHUxRTc5XFx1MDE2QlxcdTFFN0JcXHUwMTZEXFx1MDBGQ1xcdTAxRENcXHUwMUQ4XFx1MDFENlxcdTAxREFcXHUxRUU3XFx1MDE2RlxcdTAxNzFcXHUwMUQ0XFx1MDIxNVxcdTAyMTdcXHUwMUIwXFx1MUVFQlxcdTFFRTlcXHUxRUVGXFx1MUVFRFxcdTFFRjFcXHUxRUU1XFx1MUU3M1xcdTAxNzNcXHUxRTc3XFx1MUU3NVxcdTAyODldL2cgfSwgeyAnYmFzZSc6ICd2JywgJ2xldHRlcnMnOiAvW1xcdTAwNzZcXHUyNEU1XFx1RkY1NlxcdTFFN0RcXHUxRTdGXFx1MDI4QlxcdUE3NUZcXHUwMjhDXS9nIH0sIHsgJ2Jhc2UnOiAndnknLCAnbGV0dGVycyc6IC9bXFx1QTc2MV0vZyB9LCB7ICdiYXNlJzogJ3cnLCAnbGV0dGVycyc6IC9bXFx1MDA3N1xcdTI0RTZcXHVGRjU3XFx1MUU4MVxcdTFFODNcXHUwMTc1XFx1MUU4N1xcdTFFODVcXHUxRTk4XFx1MUU4OVxcdTJDNzNdL2cgfSwgeyAnYmFzZSc6ICd4JywgJ2xldHRlcnMnOiAvW1xcdTAwNzhcXHUyNEU3XFx1RkY1OFxcdTFFOEJcXHUxRThEXS9nIH0sIHsgJ2Jhc2UnOiAneScsICdsZXR0ZXJzJzogL1tcXHUwMDc5XFx1MjRFOFxcdUZGNTlcXHUxRUYzXFx1MDBGRFxcdTAxNzdcXHUxRUY5XFx1MDIzM1xcdTFFOEZcXHUwMEZGXFx1MUVGN1xcdTFFOTlcXHUxRUY1XFx1MDFCNFxcdTAyNEZcXHUxRUZGXS9nIH0sIHsgJ2Jhc2UnOiAneicsICdsZXR0ZXJzJzogL1tcXHUwMDdBXFx1MjRFOVxcdUZGNUFcXHUwMTdBXFx1MUU5MVxcdTAxN0NcXHUwMTdFXFx1MUU5M1xcdTFFOTVcXHUwMUI2XFx1MDIyNVxcdTAyNDBcXHUyQzZDXFx1QTc2M10vZyB9XTtcblxudmFyIHN0cmlwRGlhY3JpdGljcyA9IGZ1bmN0aW9uIHN0cmlwRGlhY3JpdGljcyhzdHIpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXAubGVuZ3RoOyBpKyspIHtcblx0XHRzdHIgPSBzdHIucmVwbGFjZShtYXBbaV0ubGV0dGVycywgbWFwW2ldLmJhc2UpO1xuXHR9XG5cdHJldHVybiBzdHI7XG59O1xuXG52YXIgdHJpbSA9IGZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufTtcblxudmFyIGlzVmFsaWQgPSBmdW5jdGlvbiBpc1ZhbGlkKHZhbHVlKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSAnJztcbn07XG5cbnZhciBmaWx0ZXJPcHRpb25zID0gZnVuY3Rpb24gZmlsdGVyT3B0aW9ucyhvcHRpb25zLCBmaWx0ZXJWYWx1ZSwgZXhjbHVkZU9wdGlvbnMsIHByb3BzKSB7XG5cdGlmIChwcm9wcy5pZ25vcmVBY2NlbnRzKSB7XG5cdFx0ZmlsdGVyVmFsdWUgPSBzdHJpcERpYWNyaXRpY3MoZmlsdGVyVmFsdWUpO1xuXHR9XG5cblx0aWYgKHByb3BzLmlnbm9yZUNhc2UpIHtcblx0XHRmaWx0ZXJWYWx1ZSA9IGZpbHRlclZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdH1cblxuXHRpZiAocHJvcHMudHJpbUZpbHRlcikge1xuXHRcdGZpbHRlclZhbHVlID0gdHJpbShmaWx0ZXJWYWx1ZSk7XG5cdH1cblxuXHRpZiAoZXhjbHVkZU9wdGlvbnMpIGV4Y2x1ZGVPcHRpb25zID0gZXhjbHVkZU9wdGlvbnMubWFwKGZ1bmN0aW9uIChpKSB7XG5cdFx0cmV0dXJuIGlbcHJvcHMudmFsdWVLZXldO1xuXHR9KTtcblxuXHRyZXR1cm4gb3B0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKG9wdGlvbikge1xuXHRcdGlmIChleGNsdWRlT3B0aW9ucyAmJiBleGNsdWRlT3B0aW9ucy5pbmRleE9mKG9wdGlvbltwcm9wcy52YWx1ZUtleV0pID4gLTEpIHJldHVybiBmYWxzZTtcblx0XHRpZiAocHJvcHMuZmlsdGVyT3B0aW9uKSByZXR1cm4gcHJvcHMuZmlsdGVyT3B0aW9uLmNhbGwodW5kZWZpbmVkLCBvcHRpb24sIGZpbHRlclZhbHVlKTtcblx0XHRpZiAoIWZpbHRlclZhbHVlKSByZXR1cm4gdHJ1ZTtcblxuXHRcdHZhciB2YWx1ZSA9IG9wdGlvbltwcm9wcy52YWx1ZUtleV07XG5cdFx0dmFyIGxhYmVsID0gb3B0aW9uW3Byb3BzLmxhYmVsS2V5XTtcblx0XHR2YXIgaGFzVmFsdWUgPSBpc1ZhbGlkKHZhbHVlKTtcblx0XHR2YXIgaGFzTGFiZWwgPSBpc1ZhbGlkKGxhYmVsKTtcblxuXHRcdGlmICghaGFzVmFsdWUgJiYgIWhhc0xhYmVsKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dmFyIHZhbHVlVGVzdCA9IGhhc1ZhbHVlID8gU3RyaW5nKHZhbHVlKSA6IG51bGw7XG5cdFx0dmFyIGxhYmVsVGVzdCA9IGhhc0xhYmVsID8gU3RyaW5nKGxhYmVsKSA6IG51bGw7XG5cblx0XHRpZiAocHJvcHMuaWdub3JlQWNjZW50cykge1xuXHRcdFx0aWYgKHZhbHVlVGVzdCAmJiBwcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcpIHZhbHVlVGVzdCA9IHN0cmlwRGlhY3JpdGljcyh2YWx1ZVRlc3QpO1xuXHRcdFx0aWYgKGxhYmVsVGVzdCAmJiBwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScpIGxhYmVsVGVzdCA9IHN0cmlwRGlhY3JpdGljcyhsYWJlbFRlc3QpO1xuXHRcdH1cblxuXHRcdGlmIChwcm9wcy5pZ25vcmVDYXNlKSB7XG5cdFx0XHRpZiAodmFsdWVUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJykgdmFsdWVUZXN0ID0gdmFsdWVUZXN0LnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRpZiAobGFiZWxUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJykgbGFiZWxUZXN0ID0gbGFiZWxUZXN0LnRvTG93ZXJDYXNlKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHByb3BzLm1hdGNoUG9zID09PSAnc3RhcnQnID8gdmFsdWVUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJyAmJiB2YWx1ZVRlc3Quc3Vic3RyKDAsIGZpbHRlclZhbHVlLmxlbmd0aCkgPT09IGZpbHRlclZhbHVlIHx8IGxhYmVsVGVzdCAmJiBwcm9wcy5tYXRjaFByb3AgIT09ICd2YWx1ZScgJiYgbGFiZWxUZXN0LnN1YnN0cigwLCBmaWx0ZXJWYWx1ZS5sZW5ndGgpID09PSBmaWx0ZXJWYWx1ZSA6IHZhbHVlVGVzdCAmJiBwcm9wcy5tYXRjaFByb3AgIT09ICdsYWJlbCcgJiYgdmFsdWVUZXN0LmluZGV4T2YoZmlsdGVyVmFsdWUpID49IDAgfHwgbGFiZWxUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJyAmJiBsYWJlbFRlc3QuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgPj0gMDtcblx0fSk7XG59O1xuXG52YXIgbWVudVJlbmRlcmVyID0gZnVuY3Rpb24gbWVudVJlbmRlcmVyKF9yZWYpIHtcblx0dmFyIGZvY3VzZWRPcHRpb24gPSBfcmVmLmZvY3VzZWRPcHRpb24sXG5cdCAgICBmb2N1c09wdGlvbiA9IF9yZWYuZm9jdXNPcHRpb24sXG5cdCAgICBpbnB1dFZhbHVlID0gX3JlZi5pbnB1dFZhbHVlLFxuXHQgICAgaW5zdGFuY2VQcmVmaXggPSBfcmVmLmluc3RhbmNlUHJlZml4LFxuXHQgICAgb25Gb2N1cyA9IF9yZWYub25Gb2N1cyxcblx0ICAgIG9uT3B0aW9uUmVmID0gX3JlZi5vbk9wdGlvblJlZixcblx0ICAgIG9uU2VsZWN0ID0gX3JlZi5vblNlbGVjdCxcblx0ICAgIG9wdGlvbkNsYXNzTmFtZSA9IF9yZWYub3B0aW9uQ2xhc3NOYW1lLFxuXHQgICAgb3B0aW9uQ29tcG9uZW50ID0gX3JlZi5vcHRpb25Db21wb25lbnQsXG5cdCAgICBvcHRpb25SZW5kZXJlciA9IF9yZWYub3B0aW9uUmVuZGVyZXIsXG5cdCAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zLFxuXHQgICAgcmVtb3ZlVmFsdWUgPSBfcmVmLnJlbW92ZVZhbHVlLFxuXHQgICAgc2VsZWN0VmFsdWUgPSBfcmVmLnNlbGVjdFZhbHVlLFxuXHQgICAgdmFsdWVBcnJheSA9IF9yZWYudmFsdWVBcnJheSxcblx0ICAgIHZhbHVlS2V5ID0gX3JlZi52YWx1ZUtleTtcblxuXHR2YXIgT3B0aW9uID0gb3B0aW9uQ29tcG9uZW50O1xuXG5cdHJldHVybiBvcHRpb25zLm1hcChmdW5jdGlvbiAob3B0aW9uLCBpKSB7XG5cdFx0dmFyIGlzU2VsZWN0ZWQgPSB2YWx1ZUFycmF5ICYmIHZhbHVlQXJyYXkuc29tZShmdW5jdGlvbiAoeCkge1xuXHRcdFx0cmV0dXJuIHhbdmFsdWVLZXldID09PSBvcHRpb25bdmFsdWVLZXldO1xuXHRcdH0pO1xuXHRcdHZhciBpc0ZvY3VzZWQgPSBvcHRpb24gPT09IGZvY3VzZWRPcHRpb247XG5cdFx0dmFyIG9wdGlvbkNsYXNzID0gY2xhc3NOYW1lcyhvcHRpb25DbGFzc05hbWUsIHtcblx0XHRcdCdTZWxlY3Qtb3B0aW9uJzogdHJ1ZSxcblx0XHRcdCdpcy1zZWxlY3RlZCc6IGlzU2VsZWN0ZWQsXG5cdFx0XHQnaXMtZm9jdXNlZCc6IGlzRm9jdXNlZCxcblx0XHRcdCdpcy1kaXNhYmxlZCc6IG9wdGlvbi5kaXNhYmxlZFxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRPcHRpb24sXG5cdFx0XHR7XG5cdFx0XHRcdGNsYXNzTmFtZTogb3B0aW9uQ2xhc3MsXG5cdFx0XHRcdGZvY3VzT3B0aW9uOiBmb2N1c09wdGlvbixcblx0XHRcdFx0aW5wdXRWYWx1ZTogaW5wdXRWYWx1ZSxcblx0XHRcdFx0aW5zdGFuY2VQcmVmaXg6IGluc3RhbmNlUHJlZml4LFxuXHRcdFx0XHRpc0Rpc2FibGVkOiBvcHRpb24uZGlzYWJsZWQsXG5cdFx0XHRcdGlzRm9jdXNlZDogaXNGb2N1c2VkLFxuXHRcdFx0XHRpc1NlbGVjdGVkOiBpc1NlbGVjdGVkLFxuXHRcdFx0XHRrZXk6ICdvcHRpb24tJyArIGkgKyAnLScgKyBvcHRpb25bdmFsdWVLZXldLFxuXHRcdFx0XHRvbkZvY3VzOiBvbkZvY3VzLFxuXHRcdFx0XHRvblNlbGVjdDogb25TZWxlY3QsXG5cdFx0XHRcdG9wdGlvbjogb3B0aW9uLFxuXHRcdFx0XHRvcHRpb25JbmRleDogaSxcblx0XHRcdFx0cmVmOiBmdW5jdGlvbiByZWYoX3JlZjIpIHtcblx0XHRcdFx0XHRvbk9wdGlvblJlZihfcmVmMiwgaXNGb2N1c2VkKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0cmVtb3ZlVmFsdWU6IHJlbW92ZVZhbHVlLFxuXHRcdFx0XHRzZWxlY3RWYWx1ZTogc2VsZWN0VmFsdWVcblx0XHRcdH0sXG5cdFx0XHRvcHRpb25SZW5kZXJlcihvcHRpb24sIGksIGlucHV0VmFsdWUpXG5cdFx0KTtcblx0fSk7XG59O1xuXG5tZW51UmVuZGVyZXIucHJvcFR5cGVzID0ge1xuXHRmb2N1c09wdGlvbjogUHJvcFR5cGVzLmZ1bmMsXG5cdGZvY3VzZWRPcHRpb246IFByb3BUeXBlcy5vYmplY3QsXG5cdGlucHV0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cdGluc3RhbmNlUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYyxcblx0b25PcHRpb25SZWY6IFByb3BUeXBlcy5mdW5jLFxuXHRvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG5cdG9wdGlvbkNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcblx0b3B0aW9uQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcblx0b3B0aW9uUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLFxuXHRvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXksXG5cdHJlbW92ZVZhbHVlOiBQcm9wVHlwZXMuZnVuYyxcblx0c2VsZWN0VmFsdWU6IFByb3BUeXBlcy5mdW5jLFxuXHR2YWx1ZUFycmF5OiBQcm9wVHlwZXMuYXJyYXksXG5cdHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nXG59O1xuXG52YXIgYmxvY2tFdmVudCA9IChmdW5jdGlvbiAoZXZlbnQpIHtcblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdGlmIChldmVudC50YXJnZXQudGFnTmFtZSAhPT0gJ0EnIHx8ICEoJ2hyZWYnIGluIGV2ZW50LnRhcmdldCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0aWYgKGV2ZW50LnRhcmdldC50YXJnZXQpIHtcblx0XHR3aW5kb3cub3BlbihldmVudC50YXJnZXQuaHJlZiwgZXZlbnQudGFyZ2V0LnRhcmdldCk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBldmVudC50YXJnZXQuaHJlZjtcblx0fVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG5cblxuXG5cbnZhciBhc3luY0dlbmVyYXRvciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQXdhaXRWYWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jR2VuZXJhdG9yKGdlbikge1xuICAgIHZhciBmcm9udCwgYmFjaztcblxuICAgIGZ1bmN0aW9uIHNlbmQoa2V5LCBhcmcpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIGFyZzogYXJnLFxuICAgICAgICAgIHJlc29sdmU6IHJlc29sdmUsXG4gICAgICAgICAgcmVqZWN0OiByZWplY3QsXG4gICAgICAgICAgbmV4dDogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChiYWNrKSB7XG4gICAgICAgICAgYmFjayA9IGJhY2submV4dCA9IHJlcXVlc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnJvbnQgPSBiYWNrID0gcmVxdWVzdDtcbiAgICAgICAgICByZXN1bWUoa2V5LCBhcmcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXN1bWUoa2V5LCBhcmcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBnZW5ba2V5XShhcmcpO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXdhaXRWYWx1ZSkge1xuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZS52YWx1ZSkudGhlbihmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICByZXN1bWUoXCJuZXh0XCIsIGFyZyk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGFyZykge1xuICAgICAgICAgICAgcmVzdW1lKFwidGhyb3dcIiwgYXJnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXR0bGUocmVzdWx0LmRvbmUgPyBcInJldHVyblwiIDogXCJub3JtYWxcIiwgcmVzdWx0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHNldHRsZShcInRocm93XCIsIGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0dGxlKHR5cGUsIHZhbHVlKSB7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBcInJldHVyblwiOlxuICAgICAgICAgIGZyb250LnJlc29sdmUoe1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJ0aHJvd1wiOlxuICAgICAgICAgIGZyb250LnJlamVjdCh2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBmcm9udC5yZXNvbHZlKHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGRvbmU6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGZyb250ID0gZnJvbnQubmV4dDtcblxuICAgICAgaWYgKGZyb250KSB7XG4gICAgICAgIHJlc3VtZShmcm9udC5rZXksIGZyb250LmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYWNrID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9pbnZva2UgPSBzZW5kO1xuXG4gICAgaWYgKHR5cGVvZiBnZW4ucmV0dXJuICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHRoaXMucmV0dXJuID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHtcbiAgICBBc3luY0dlbmVyYXRvci5wcm90b3R5cGVbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfVxuXG4gIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB0aGlzLl9pbnZva2UoXCJuZXh0XCIsIGFyZyk7XG4gIH07XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLnRocm93ID0gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiB0aGlzLl9pbnZva2UoXCJ0aHJvd1wiLCBhcmcpO1xuICB9O1xuXG4gIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZS5yZXR1cm4gPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcInJldHVyblwiLCBhcmcpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgd3JhcDogZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEFzeW5jR2VuZXJhdG9yKGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGF3YWl0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBuZXcgQXdhaXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cblxuXG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuXG5cblxudmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cblxuXG5cblxuXG5cblxuXG52YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7XG4gICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbnZhciBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG52YXIgT3B0aW9uID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcblx0aW5oZXJpdHMoT3B0aW9uLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuXHRmdW5jdGlvbiBPcHRpb24ocHJvcHMpIHtcblx0XHRjbGFzc0NhbGxDaGVjayh0aGlzLCBPcHRpb24pO1xuXG5cdFx0dmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoT3B0aW9uLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT3B0aW9uKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG5cdFx0X3RoaXMuaGFuZGxlTW91c2VEb3duID0gX3RoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLmhhbmRsZU1vdXNlRW50ZXIgPSBfdGhpcy5oYW5kbGVNb3VzZUVudGVyLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLmhhbmRsZU1vdXNlTW92ZSA9IF90aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKF90aGlzKTtcblx0XHRfdGhpcy5oYW5kbGVUb3VjaFN0YXJ0ID0gX3RoaXMuaGFuZGxlVG91Y2hTdGFydC5iaW5kKF90aGlzKTtcblx0XHRfdGhpcy5oYW5kbGVUb3VjaEVuZCA9IF90aGlzLmhhbmRsZVRvdWNoRW5kLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLmhhbmRsZVRvdWNoTW92ZSA9IF90aGlzLmhhbmRsZVRvdWNoTW92ZS5iaW5kKF90aGlzKTtcblx0XHRfdGhpcy5vbkZvY3VzID0gX3RoaXMub25Gb2N1cy5iaW5kKF90aGlzKTtcblx0XHRyZXR1cm4gX3RoaXM7XG5cdH1cblxuXHRjcmVhdGVDbGFzcyhPcHRpb24sIFt7XG5cdFx0a2V5OiAnaGFuZGxlTW91c2VEb3duJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR0aGlzLnByb3BzLm9uU2VsZWN0KHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlTW91c2VFbnRlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZU1vdXNlRW50ZXIoZXZlbnQpIHtcblx0XHRcdHRoaXMub25Gb2N1cyhldmVudCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlTW91c2VNb3ZlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VNb3ZlKGV2ZW50KSB7XG5cdFx0XHR0aGlzLm9uRm9jdXMoZXZlbnQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZVRvdWNoRW5kJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVG91Y2hFbmQoZXZlbnQpIHtcblx0XHRcdC8vIENoZWNrIGlmIHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWQsIEluIHRoaXMgY2FzZVxuXHRcdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRcdGlmICh0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHRcdHRoaXMuaGFuZGxlTW91c2VEb3duKGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaE1vdmUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaE1vdmUoKSB7XG5cdFx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZFxuXHRcdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlVG91Y2hTdGFydCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoU3RhcnQoKSB7XG5cdFx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcblx0XHRcdHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdvbkZvY3VzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gb25Gb2N1cyhldmVudCkge1xuXHRcdFx0aWYgKCF0aGlzLnByb3BzLmlzRm9jdXNlZCkge1xuXHRcdFx0XHR0aGlzLnByb3BzLm9uRm9jdXModGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcblx0XHRcdCAgICBvcHRpb24gPSBfcHJvcHMub3B0aW9uLFxuXHRcdFx0ICAgIGluc3RhbmNlUHJlZml4ID0gX3Byb3BzLmluc3RhbmNlUHJlZml4LFxuXHRcdFx0ICAgIG9wdGlvbkluZGV4ID0gX3Byb3BzLm9wdGlvbkluZGV4O1xuXG5cdFx0XHR2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcyh0aGlzLnByb3BzLmNsYXNzTmFtZSwgb3B0aW9uLmNsYXNzTmFtZSk7XG5cblx0XHRcdHJldHVybiBvcHRpb24uZGlzYWJsZWQgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0eyBjbGFzc05hbWU6IGNsYXNzTmFtZSxcblx0XHRcdFx0XHRvbk1vdXNlRG93bjogYmxvY2tFdmVudCxcblx0XHRcdFx0XHRvbkNsaWNrOiBibG9ja0V2ZW50IH0sXG5cdFx0XHRcdHRoaXMucHJvcHMuY2hpbGRyZW5cblx0XHRcdCkgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0eyBjbGFzc05hbWU6IGNsYXNzTmFtZSxcblx0XHRcdFx0XHRzdHlsZTogb3B0aW9uLnN0eWxlLFxuXHRcdFx0XHRcdHJvbGU6ICdvcHRpb24nLFxuXHRcdFx0XHRcdCdhcmlhLWxhYmVsJzogb3B0aW9uLmxhYmVsLFxuXHRcdFx0XHRcdG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZU1vdXNlRG93bixcblx0XHRcdFx0XHRvbk1vdXNlRW50ZXI6IHRoaXMuaGFuZGxlTW91c2VFbnRlcixcblx0XHRcdFx0XHRvbk1vdXNlTW92ZTogdGhpcy5oYW5kbGVNb3VzZU1vdmUsXG5cdFx0XHRcdFx0b25Ub3VjaFN0YXJ0OiB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsXG5cdFx0XHRcdFx0b25Ub3VjaE1vdmU6IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLFxuXHRcdFx0XHRcdG9uVG91Y2hFbmQ6IHRoaXMuaGFuZGxlVG91Y2hFbmQsXG5cdFx0XHRcdFx0aWQ6IGluc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIG9wdGlvbkluZGV4LFxuXHRcdFx0XHRcdHRpdGxlOiBvcHRpb24udGl0bGUgfSxcblx0XHRcdFx0dGhpcy5wcm9wcy5jaGlsZHJlblxuXHRcdFx0KTtcblx0XHR9XG5cdH1dKTtcblx0cmV0dXJuIE9wdGlvbjtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuT3B0aW9uLnByb3BUeXBlcyA9IHtcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuXHRjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsIC8vIGNsYXNzTmFtZSAoYmFzZWQgb24gbW91c2UgcG9zaXRpb24pXG5cdGluc3RhbmNlUHJlZml4OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsIC8vIHVuaXF1ZSBwcmVmaXggZm9yIHRoZSBpZHMgKHVzZWQgZm9yIGFyaWEpXG5cdGlzRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLCAvLyB0aGUgb3B0aW9uIGlzIGRpc2FibGVkXG5cdGlzRm9jdXNlZDogUHJvcFR5cGVzLmJvb2wsIC8vIHRoZSBvcHRpb24gaXMgZm9jdXNlZFxuXHRpc1NlbGVjdGVkOiBQcm9wVHlwZXMuYm9vbCwgLy8gdGhlIG9wdGlvbiBpcyBzZWxlY3RlZFxuXHRvbkZvY3VzOiBQcm9wVHlwZXMuZnVuYywgLy8gbWV0aG9kIHRvIGhhbmRsZSBtb3VzZUVudGVyIG9uIG9wdGlvbiBlbGVtZW50XG5cdG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYywgLy8gbWV0aG9kIHRvIGhhbmRsZSBjbGljayBvbiBvcHRpb24gZWxlbWVudFxuXHRvblVuZm9jdXM6IFByb3BUeXBlcy5mdW5jLCAvLyBtZXRob2QgdG8gaGFuZGxlIG1vdXNlTGVhdmUgb24gb3B0aW9uIGVsZW1lbnRcblx0b3B0aW9uOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsIC8vIG9iamVjdCB0aGF0IGlzIGJhc2UgZm9yIHRoYXQgb3B0aW9uXG5cdG9wdGlvbkluZGV4OiBQcm9wVHlwZXMubnVtYmVyIC8vIGluZGV4IG9mIHRoZSBvcHRpb24sIHVzZWQgdG8gZ2VuZXJhdGUgdW5pcXVlIGlkcyBmb3IgYXJpYVxufTtcblxudmFyIFZhbHVlID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcblx0aW5oZXJpdHMoVmFsdWUsIF9SZWFjdCRDb21wb25lbnQpO1xuXG5cdGZ1bmN0aW9uIFZhbHVlKHByb3BzKSB7XG5cdFx0Y2xhc3NDYWxsQ2hlY2sodGhpcywgVmFsdWUpO1xuXG5cdFx0dmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoVmFsdWUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihWYWx1ZSkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuXHRcdF90aGlzLmhhbmRsZU1vdXNlRG93biA9IF90aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKF90aGlzKTtcblx0XHRfdGhpcy5vblJlbW92ZSA9IF90aGlzLm9uUmVtb3ZlLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLmhhbmRsZVRvdWNoRW5kUmVtb3ZlID0gX3RoaXMuaGFuZGxlVG91Y2hFbmRSZW1vdmUuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMuaGFuZGxlVG91Y2hNb3ZlID0gX3RoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLmhhbmRsZVRvdWNoU3RhcnQgPSBfdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQoX3RoaXMpO1xuXHRcdHJldHVybiBfdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNsYXNzKFZhbHVlLCBbe1xuXHRcdGtleTogJ2hhbmRsZU1vdXNlRG93bicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZU1vdXNlRG93bihldmVudCkge1xuXHRcdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5vbkNsaWNrKSB7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy52YWx1ZSwgZXZlbnQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5wcm9wcy52YWx1ZS5ocmVmKSB7XG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ29uUmVtb3ZlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gb25SZW1vdmUoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlVG91Y2hFbmRSZW1vdmUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaEVuZFJlbW92ZShldmVudCkge1xuXHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuXHRcdFx0aWYgKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuXHRcdFx0Ly8gRmlyZSB0aGUgbW91c2UgZXZlbnRzXG5cdFx0XHR0aGlzLm9uUmVtb3ZlKGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaE1vdmUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaE1vdmUoKSB7XG5cdFx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZFxuXHRcdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlVG91Y2hTdGFydCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoU3RhcnQoKSB7XG5cdFx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcblx0XHRcdHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXJSZW1vdmVJY29uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyUmVtb3ZlSWNvbigpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8ICF0aGlzLnByb3BzLm9uUmVtb3ZlKSByZXR1cm47XG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J3NwYW4nLFxuXHRcdFx0XHR7IGNsYXNzTmFtZTogJ1NlbGVjdC12YWx1ZS1pY29uJyxcblx0XHRcdFx0XHQnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG5cdFx0XHRcdFx0b25Nb3VzZURvd246IHRoaXMub25SZW1vdmUsXG5cdFx0XHRcdFx0b25Ub3VjaEVuZDogdGhpcy5oYW5kbGVUb3VjaEVuZFJlbW92ZSxcblx0XHRcdFx0XHRvblRvdWNoU3RhcnQ6IHRoaXMuaGFuZGxlVG91Y2hTdGFydCxcblx0XHRcdFx0XHRvblRvdWNoTW92ZTogdGhpcy5oYW5kbGVUb3VjaE1vdmUgfSxcblx0XHRcdFx0J1xceEQ3J1xuXHRcdFx0KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXJMYWJlbCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlckxhYmVsKCkge1xuXHRcdFx0dmFyIGNsYXNzTmFtZSA9ICdTZWxlY3QtdmFsdWUtbGFiZWwnO1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMub25DbGljayB8fCB0aGlzLnByb3BzLnZhbHVlLmhyZWYgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnYScsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIGhyZWY6IHRoaXMucHJvcHMudmFsdWUuaHJlZiwgdGFyZ2V0OiB0aGlzLnByb3BzLnZhbHVlLnRhcmdldCwgb25Nb3VzZURvd246IHRoaXMuaGFuZGxlTW91c2VEb3duLCBvblRvdWNoRW5kOiB0aGlzLmhhbmRsZU1vdXNlRG93biB9LFxuXHRcdFx0XHR0aGlzLnByb3BzLmNoaWxkcmVuXG5cdFx0XHQpIDogUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J3NwYW4nLFxuXHRcdFx0XHR7IGNsYXNzTmFtZTogY2xhc3NOYW1lLCByb2xlOiAnb3B0aW9uJywgJ2FyaWEtc2VsZWN0ZWQnOiAndHJ1ZScsIGlkOiB0aGlzLnByb3BzLmlkIH0sXG5cdFx0XHRcdHRoaXMucHJvcHMuY2hpbGRyZW5cblx0XHRcdCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHR7IGNsYXNzTmFtZTogY2xhc3NOYW1lcygnU2VsZWN0LXZhbHVlJywgdGhpcy5wcm9wcy52YWx1ZS5jbGFzc05hbWUpLFxuXHRcdFx0XHRcdHN0eWxlOiB0aGlzLnByb3BzLnZhbHVlLnN0eWxlLFxuXHRcdFx0XHRcdHRpdGxlOiB0aGlzLnByb3BzLnZhbHVlLnRpdGxlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRoaXMucmVuZGVyUmVtb3ZlSWNvbigpLFxuXHRcdFx0XHR0aGlzLnJlbmRlckxhYmVsKClcblx0XHRcdCk7XG5cdFx0fVxuXHR9XSk7XG5cdHJldHVybiBWYWx1ZTtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuVmFsdWUucHJvcFR5cGVzID0ge1xuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG5cdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCwgLy8gZGlzYWJsZWQgcHJvcCBwYXNzZWQgdG8gUmVhY3RTZWxlY3Rcblx0aWQ6IFByb3BUeXBlcy5zdHJpbmcsIC8vIFVuaXF1ZSBpZCBmb3IgdGhlIHZhbHVlIC0gdXNlZCBmb3IgYXJpYVxuXHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYywgLy8gbWV0aG9kIHRvIGhhbmRsZSBjbGljayBvbiB2YWx1ZSBsYWJlbFxuXHRvblJlbW92ZTogUHJvcFR5cGVzLmZ1bmMsIC8vIG1ldGhvZCB0byBoYW5kbGUgcmVtb3ZhbCBvZiB0aGUgdmFsdWVcblx0dmFsdWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCAvLyB0aGUgb3B0aW9uIG9iamVjdCBmb3IgdGhpcyB2YWx1ZVxufTtcblxuLyohXG4gIENvcHlyaWdodCAoYykgMjAxOCBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9yZWFjdC1zZWxlY3RcbiovXG52YXIgc3RyaW5naWZ5VmFsdWUgPSBmdW5jdGlvbiBzdHJpbmdpZnlWYWx1ZSh2YWx1ZSkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlIDogdmFsdWUgIT09IG51bGwgJiYgSlNPTi5zdHJpbmdpZnkodmFsdWUpIHx8ICcnO1xufTtcblxudmFyIHN0cmluZ09yTm9kZSA9IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSk7XG52YXIgc3RyaW5nT3JOdW1iZXIgPSBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSk7XG5cbnZhciBpbnN0YW5jZUlkID0gMTtcblxudmFyIHNob3VsZFNob3dWYWx1ZSA9IGZ1bmN0aW9uIHNob3VsZFNob3dWYWx1ZShzdGF0ZSwgcHJvcHMpIHtcblx0dmFyIGlucHV0VmFsdWUgPSBzdGF0ZS5pbnB1dFZhbHVlLFxuXHQgICAgaXNQc2V1ZG9Gb2N1c2VkID0gc3RhdGUuaXNQc2V1ZG9Gb2N1c2VkLFxuXHQgICAgaXNGb2N1c2VkID0gc3RhdGUuaXNGb2N1c2VkO1xuXHR2YXIgb25TZWxlY3RSZXNldHNJbnB1dCA9IHByb3BzLm9uU2VsZWN0UmVzZXRzSW5wdXQ7XG5cblxuXHRpZiAoIWlucHV0VmFsdWUpIHJldHVybiB0cnVlO1xuXG5cdGlmICghb25TZWxlY3RSZXNldHNJbnB1dCkge1xuXHRcdHJldHVybiAhKCFpc0ZvY3VzZWQgJiYgaXNQc2V1ZG9Gb2N1c2VkIHx8IGlzRm9jdXNlZCAmJiAhaXNQc2V1ZG9Gb2N1c2VkKTtcblx0fVxuXG5cdHJldHVybiBmYWxzZTtcbn07XG5cbnZhciBzaG91bGRTaG93UGxhY2Vob2xkZXIgPSBmdW5jdGlvbiBzaG91bGRTaG93UGxhY2Vob2xkZXIoc3RhdGUsIHByb3BzLCBpc09wZW4pIHtcblx0dmFyIGlucHV0VmFsdWUgPSBzdGF0ZS5pbnB1dFZhbHVlLFxuXHQgICAgaXNQc2V1ZG9Gb2N1c2VkID0gc3RhdGUuaXNQc2V1ZG9Gb2N1c2VkLFxuXHQgICAgaXNGb2N1c2VkID0gc3RhdGUuaXNGb2N1c2VkO1xuXHR2YXIgb25TZWxlY3RSZXNldHNJbnB1dCA9IHByb3BzLm9uU2VsZWN0UmVzZXRzSW5wdXQ7XG5cblxuXHRyZXR1cm4gIWlucHV0VmFsdWUgfHwgIW9uU2VsZWN0UmVzZXRzSW5wdXQgJiYgIWlzT3BlbiAmJiAhaXNQc2V1ZG9Gb2N1c2VkICYmICFpc0ZvY3VzZWQ7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlIGEgdmFsdWUgZnJvbSB0aGUgZ2l2ZW4gb3B0aW9ucyBhbmQgdmFsdWVLZXlcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxBcnJheX0gdmFsdWVcdC0gdGhlIHNlbGVjdGVkIHZhbHVlKHMpXG4gKiBAcGFyYW0ge09iamVjdH1cdFx0IHByb3BzXHQtIHRoZSBTZWxlY3QgY29tcG9uZW50J3MgcHJvcHMgKG9yIG5leHRQcm9wcylcbiAqL1xudmFyIGV4cGFuZFZhbHVlID0gZnVuY3Rpb24gZXhwYW5kVmFsdWUodmFsdWUsIHByb3BzKSB7XG5cdHZhciB2YWx1ZVR5cGUgPSB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKTtcblx0aWYgKHZhbHVlVHlwZSAhPT0gJ3N0cmluZycgJiYgdmFsdWVUeXBlICE9PSAnbnVtYmVyJyAmJiB2YWx1ZVR5cGUgIT09ICdib29sZWFuJykgcmV0dXJuIHZhbHVlO1xuXHR2YXIgb3B0aW9ucyA9IHByb3BzLm9wdGlvbnMsXG5cdCAgICB2YWx1ZUtleSA9IHByb3BzLnZhbHVlS2V5O1xuXG5cdGlmICghb3B0aW9ucykgcmV0dXJuO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoU3RyaW5nKG9wdGlvbnNbaV1bdmFsdWVLZXldKSA9PT0gU3RyaW5nKHZhbHVlKSkgcmV0dXJuIG9wdGlvbnNbaV07XG5cdH1cbn07XG5cbnZhciBoYW5kbGVSZXF1aXJlZCA9IGZ1bmN0aW9uIGhhbmRsZVJlcXVpcmVkKHZhbHVlLCBtdWx0aSkge1xuXHRpZiAoIXZhbHVlKSByZXR1cm4gdHJ1ZTtcblx0cmV0dXJuIG11bHRpID8gdmFsdWUubGVuZ3RoID09PSAwIDogT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMDtcbn07XG5cbnZhciBTZWxlY3QkMSA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG5cdGluaGVyaXRzKFNlbGVjdCwgX1JlYWN0JENvbXBvbmVudCk7XG5cblx0ZnVuY3Rpb24gU2VsZWN0KHByb3BzKSB7XG5cdFx0Y2xhc3NDYWxsQ2hlY2sodGhpcywgU2VsZWN0KTtcblxuXHRcdHZhciBfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFNlbGVjdC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFNlbGVjdCkpLmNhbGwodGhpcywgcHJvcHMpKTtcblxuXHRcdFsnY2xlYXJWYWx1ZScsICdmb2N1c09wdGlvbicsICdnZXRPcHRpb25MYWJlbCcsICdoYW5kbGVJbnB1dEJsdXInLCAnaGFuZGxlSW5wdXRDaGFuZ2UnLCAnaGFuZGxlSW5wdXRGb2N1cycsICdoYW5kbGVJbnB1dFZhbHVlQ2hhbmdlJywgJ2hhbmRsZUtleURvd24nLCAnaGFuZGxlTWVudVNjcm9sbCcsICdoYW5kbGVNb3VzZURvd24nLCAnaGFuZGxlTW91c2VEb3duT25BcnJvdycsICdoYW5kbGVNb3VzZURvd25Pbk1lbnUnLCAnaGFuZGxlVG91Y2hFbmQnLCAnaGFuZGxlVG91Y2hFbmRDbGVhclZhbHVlJywgJ2hhbmRsZVRvdWNoTW92ZScsICdoYW5kbGVUb3VjaE91dHNpZGUnLCAnaGFuZGxlVG91Y2hTdGFydCcsICdoYW5kbGVWYWx1ZUNsaWNrJywgJ29uT3B0aW9uUmVmJywgJ3JlbW92ZVZhbHVlJywgJ3NlbGVjdFZhbHVlJ10uZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcblx0XHRcdHJldHVybiBfdGhpc1tmbl0gPSBfdGhpc1tmbl0uYmluZChfdGhpcyk7XG5cdFx0fSk7XG5cblx0XHRfdGhpcy5zdGF0ZSA9IHtcblx0XHRcdGlucHV0VmFsdWU6ICcnLFxuXHRcdFx0aXNGb2N1c2VkOiBmYWxzZSxcblx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0cmVxdWlyZWQ6IGZhbHNlXG5cdFx0fTtcblx0XHRyZXR1cm4gX3RoaXM7XG5cdH1cblxuXHRjcmVhdGVDbGFzcyhTZWxlY3QsIFt7XG5cdFx0a2V5OiAnY29tcG9uZW50V2lsbE1vdW50Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuXHRcdFx0dGhpcy5faW5zdGFuY2VQcmVmaXggPSAncmVhY3Qtc2VsZWN0LScgKyAodGhpcy5wcm9wcy5pbnN0YW5jZUlkIHx8ICsraW5zdGFuY2VJZCkgKyAnLSc7XG5cdFx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblxuXHRcdFx0aWYgKHRoaXMucHJvcHMucmVxdWlyZWQpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0cmVxdWlyZWQ6IGhhbmRsZVJlcXVpcmVkKHZhbHVlQXJyYXlbMF0sIHRoaXMucHJvcHMubXVsdGkpXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2NvbXBvbmVudERpZE1vdW50Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0XHRpZiAodHlwZW9mIHRoaXMucHJvcHMuYXV0b2ZvY3VzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0Y29uc29sZS53YXJuKCdXYXJuaW5nOiBUaGUgYXV0b2ZvY3VzIHByb3AgaGFzIGNoYW5nZWQgdG8gYXV0b0ZvY3VzLCBzdXBwb3J0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciByZWFjdC1zZWxlY3RAMS4wJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5hdXRvRm9jdXMgfHwgdGhpcy5wcm9wcy5hdXRvZm9jdXMpIHtcblx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuXHRcdFx0dmFyIHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkobmV4dFByb3BzLnZhbHVlLCBuZXh0UHJvcHMpO1xuXG5cdFx0XHRpZiAobmV4dFByb3BzLnJlcXVpcmVkKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdHJlcXVpcmVkOiBoYW5kbGVSZXF1aXJlZCh2YWx1ZUFycmF5WzBdLCBuZXh0UHJvcHMubXVsdGkpXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLnJlcXVpcmVkKSB7XG5cdFx0XHRcdC8vIFVzZWQgdG8gYmUgcmVxdWlyZWQgYnV0IGl0J3Mgbm90IGFueSBtb3JlXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyByZXF1aXJlZDogZmFsc2UgfSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiYgdGhpcy5wcm9wcy52YWx1ZSAhPT0gbmV4dFByb3BzLnZhbHVlICYmIG5leHRQcm9wcy5vblNlbGVjdFJlc2V0c0lucHV0KSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiB0aGlzLmhhbmRsZUlucHV0VmFsdWVDaGFuZ2UoJycpIH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuXHRcdFx0Ly8gZm9jdXMgdG8gdGhlIHNlbGVjdGVkIG9wdGlvblxuXHRcdFx0aWYgKHRoaXMubWVudSAmJiB0aGlzLmZvY3VzZWQgJiYgdGhpcy5zdGF0ZS5pc09wZW4gJiYgIXRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbikge1xuXHRcdFx0XHR2YXIgZm9jdXNlZE9wdGlvbk5vZGUgPSBmaW5kRE9NTm9kZSh0aGlzLmZvY3VzZWQpO1xuXHRcdFx0XHR2YXIgbWVudU5vZGUgPSBmaW5kRE9NTm9kZSh0aGlzLm1lbnUpO1xuXG5cdFx0XHRcdHZhciBzY3JvbGxUb3AgPSBtZW51Tm9kZS5zY3JvbGxUb3A7XG5cdFx0XHRcdHZhciBzY3JvbGxCb3R0b20gPSBzY3JvbGxUb3AgKyBtZW51Tm9kZS5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRcdHZhciBvcHRpb25Ub3AgPSBmb2N1c2VkT3B0aW9uTm9kZS5vZmZzZXRUb3A7XG5cdFx0XHRcdHZhciBvcHRpb25Cb3R0b20gPSBvcHRpb25Ub3AgKyBmb2N1c2VkT3B0aW9uTm9kZS5vZmZzZXRIZWlnaHQ7XG5cblx0XHRcdFx0aWYgKHNjcm9sbFRvcCA+IG9wdGlvblRvcCB8fCBzY3JvbGxCb3R0b20gPCBvcHRpb25Cb3R0b20pIHtcblx0XHRcdFx0XHRtZW51Tm9kZS5zY3JvbGxUb3AgPSBmb2N1c2VkT3B0aW9uTm9kZS5vZmZzZXRUb3A7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBXZSBzdGlsbCBzZXQgaGFzU2Nyb2xsZWRUb09wdGlvbiB0byB0cnVlIGV2ZW4gaWYgd2UgZGlkbid0XG5cdFx0XHRcdC8vIGFjdHVhbGx5IG5lZWQgdG8gc2Nyb2xsLCBhcyB3ZSd2ZSBzdGlsbCBjb25maXJtZWQgdGhhdCB0aGVcblx0XHRcdFx0Ly8gb3B0aW9uIGlzIGluIHZpZXcuXG5cdFx0XHRcdHRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbiA9IHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0XHR0aGlzLmhhc1Njcm9sbGVkVG9PcHRpb24gPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlICYmIHRoaXMuZm9jdXNlZCAmJiB0aGlzLm1lbnUpIHtcblx0XHRcdFx0dGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgPSBmYWxzZTtcblx0XHRcdFx0dmFyIGZvY3VzZWRET00gPSBmaW5kRE9NTm9kZSh0aGlzLmZvY3VzZWQpO1xuXHRcdFx0XHR2YXIgbWVudURPTSA9IGZpbmRET01Ob2RlKHRoaXMubWVudSk7XG5cdFx0XHRcdHZhciBmb2N1c2VkUmVjdCA9IGZvY3VzZWRET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdHZhciBtZW51UmVjdCA9IG1lbnVET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdGlmIChmb2N1c2VkUmVjdC5ib3R0b20gPiBtZW51UmVjdC5ib3R0b20pIHtcblx0XHRcdFx0XHRtZW51RE9NLnNjcm9sbFRvcCA9IGZvY3VzZWRET00ub2Zmc2V0VG9wICsgZm9jdXNlZERPTS5jbGllbnRIZWlnaHQgLSBtZW51RE9NLm9mZnNldEhlaWdodDtcblx0XHRcdFx0fSBlbHNlIGlmIChmb2N1c2VkUmVjdC50b3AgPCBtZW51UmVjdC50b3ApIHtcblx0XHRcdFx0XHRtZW51RE9NLnNjcm9sbFRvcCA9IGZvY3VzZWRET00ub2Zmc2V0VG9wO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5zY3JvbGxNZW51SW50b1ZpZXcgJiYgdGhpcy5tZW51Q29udGFpbmVyKSB7XG5cdFx0XHRcdHZhciBtZW51Q29udGFpbmVyUmVjdCA9IHRoaXMubWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0aWYgKHdpbmRvdy5pbm5lckhlaWdodCA8IG1lbnVDb250YWluZXJSZWN0LmJvdHRvbSArIHRoaXMucHJvcHMubWVudUJ1ZmZlcikge1xuXHRcdFx0XHRcdHdpbmRvdy5zY3JvbGxCeSgwLCBtZW51Q29udGFpbmVyUmVjdC5ib3R0b20gKyB0aGlzLnByb3BzLm1lbnVCdWZmZXIgLSB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAocHJldlByb3BzLmRpc2FibGVkICE9PSB0aGlzLnByb3BzLmRpc2FibGVkKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBpc0ZvY3VzZWQ6IGZhbHNlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG5cdFx0XHRcdHRoaXMuY2xvc2VNZW51KCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAocHJldlN0YXRlLmlzT3BlbiAhPT0gdGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdFx0dGhpcy50b2dnbGVUb3VjaE91dHNpZGVFdmVudCh0aGlzLnN0YXRlLmlzT3Blbik7XG5cdFx0XHRcdHZhciBoYW5kbGVyID0gdGhpcy5zdGF0ZS5pc09wZW4gPyB0aGlzLnByb3BzLm9uT3BlbiA6IHRoaXMucHJvcHMub25DbG9zZTtcblx0XHRcdFx0aGFuZGxlciAmJiBoYW5kbGVyKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRcdHRoaXMudG9nZ2xlVG91Y2hPdXRzaWRlRXZlbnQoZmFsc2UpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3RvZ2dsZVRvdWNoT3V0c2lkZUV2ZW50Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gdG9nZ2xlVG91Y2hPdXRzaWRlRXZlbnQoZW5hYmxlZCkge1xuXHRcdFx0aWYgKGVuYWJsZWQpIHtcblx0XHRcdFx0aWYgKCFkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyICYmIGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG5cdFx0XHRcdFx0ZG9jdW1lbnQuYXR0YWNoRXZlbnQoJ29udG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoIWRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcblx0XHRcdFx0XHRkb2N1bWVudC5kZXRhY2hFdmVudCgnb250b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaE91dHNpZGUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaE91dHNpZGUoZXZlbnQpIHtcblx0XHRcdC8vIGhhbmRsZSB0b3VjaCBvdXRzaWRlIG9uIGlvcyB0byBkaXNtaXNzIG1lbnVcblx0XHRcdGlmICh0aGlzLndyYXBwZXIgJiYgIXRoaXMud3JhcHBlci5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG5cdFx0XHRcdHRoaXMuY2xvc2VNZW51KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmb2N1cygpIHtcblx0XHRcdGlmICghdGhpcy5pbnB1dCkgcmV0dXJuO1xuXHRcdFx0dGhpcy5pbnB1dC5mb2N1cygpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2JsdXJJbnB1dCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGJsdXJJbnB1dCgpIHtcblx0XHRcdGlmICghdGhpcy5pbnB1dCkgcmV0dXJuO1xuXHRcdFx0dGhpcy5pbnB1dC5ibHVyKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlVG91Y2hNb3ZlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVG91Y2hNb3ZlKCkge1xuXHRcdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWRcblx0XHRcdHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZVRvdWNoU3RhcnQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaFN0YXJ0KCkge1xuXHRcdFx0Ly8gU2V0IGEgZmxhZyB0aGF0IHRoZSB2aWV3IGlzIG5vdCBiZWluZyBkcmFnZ2VkXG5cdFx0XHR0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlVG91Y2hFbmQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaEVuZChldmVudCkge1xuXHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuXHRcdFx0aWYgKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuXHRcdFx0Ly8gRmlyZSB0aGUgbW91c2UgZXZlbnRzXG5cdFx0XHR0aGlzLmhhbmRsZU1vdXNlRG93bihldmVudCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlVG91Y2hFbmRDbGVhclZhbHVlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVG91Y2hFbmRDbGVhclZhbHVlKGV2ZW50KSB7XG5cdFx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXG5cdFx0XHRpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG5cdFx0XHQvLyBDbGVhciB0aGUgdmFsdWVcblx0XHRcdHRoaXMuY2xlYXJWYWx1ZShldmVudCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlTW91c2VEb3duJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duKGV2ZW50KSB7XG5cdFx0XHQvLyBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSBhIG1vdXNlZG93biBhbmQgbm90IHRoZSBwcmltYXJ5XG5cdFx0XHQvLyBidXR0b24sIG9yIGlmIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQsIGlnbm9yZSBpdC5cblx0XHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8IGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuXHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUuaXNGb2N1c2VkKSB7XG5cdFx0XHRcdFx0dGhpcy5fb3BlbkFmdGVyRm9jdXMgPSB0aGlzLnByb3BzLm9wZW5PbkNsaWNrO1xuXHRcdFx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdFx0fSBlbHNlIGlmICghdGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRcdGlzT3BlbjogdHJ1ZSxcblx0XHRcdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2Vcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gcHJldmVudCBkZWZhdWx0IGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQvLyBmb3IgdGhlIG5vbi1zZWFyY2hhYmxlIHNlbGVjdCwgdG9nZ2xlIHRoZSBtZW51XG5cdFx0XHRpZiAoIXRoaXMucHJvcHMuc2VhcmNoYWJsZSkge1xuXHRcdFx0XHQvLyBUaGlzIGNvZGUgbWVhbnMgdGhhdCBpZiBhIHNlbGVjdCBpcyBzZWFyY2hhYmxlLCBvbkNsaWNrIHRoZSBvcHRpb25zIG1lbnUgd2lsbCBub3QgYXBwZWFyLCBvbmx5IG9uIHN1YnNlcXVlbnQgY2xpY2sgd2lsbCBpdCBvcGVuLlxuXHRcdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHRcdHJldHVybiB0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpc09wZW46ICF0aGlzLnN0YXRlLmlzT3BlblxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuc3RhdGUuaXNGb2N1c2VkKSB7XG5cdFx0XHRcdC8vIE9uIGlPUywgd2UgY2FuIGdldCBpbnRvIGEgc3RhdGUgd2hlcmUgd2UgdGhpbmsgdGhlIGlucHV0IGlzIGZvY3VzZWQgYnV0IGl0IGlzbid0IHJlYWxseSxcblx0XHRcdFx0Ly8gc2luY2UgaU9TIGlnbm9yZXMgcHJvZ3JhbW1hdGljIGNhbGxzIHRvIGlucHV0LmZvY3VzKCkgdGhhdCB3ZXJlbid0IHRyaWdnZXJlZCBieSBhIGNsaWNrIGV2ZW50LlxuXHRcdFx0XHQvLyBDYWxsIGZvY3VzKCkgYWdhaW4gaGVyZSB0byBiZSBzYWZlLlxuXHRcdFx0XHR0aGlzLmZvY3VzKCk7XG5cblx0XHRcdFx0dmFyIGlucHV0ID0gdGhpcy5pbnB1dDtcblx0XHRcdFx0dmFyIHRvT3BlbiA9IHRydWU7XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBpbnB1dC5nZXRJbnB1dCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdC8vIEdldCB0aGUgYWN0dWFsIERPTSBpbnB1dCBpZiB0aGUgcmVmIGlzIGFuIDxBdXRvc2l6ZUlucHV0IC8+IGNvbXBvbmVudFxuXHRcdFx0XHRcdGlucHV0ID0gaW5wdXQuZ2V0SW5wdXQoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGNsZWFycyB0aGUgdmFsdWUgc28gdGhhdCB0aGUgY3Vyc29yIHdpbGwgYmUgYXQgdGhlIGVuZCBvZiBpbnB1dCB3aGVuIHRoZSBjb21wb25lbnQgcmUtcmVuZGVyc1xuXHRcdFx0XHRpbnB1dC52YWx1ZSA9ICcnO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9mb2N1c0FmdGVyQ2xlYXIpIHtcblx0XHRcdFx0XHR0b09wZW4gPSBmYWxzZTtcblx0XHRcdFx0XHR0aGlzLl9mb2N1c0FmdGVyQ2xlYXIgPSBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGlmIHRoZSBpbnB1dCBpcyBmb2N1c2VkLCBlbnN1cmUgdGhlIG1lbnUgaXMgb3BlblxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpc09wZW46IHRvT3Blbixcblx0XHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0XHRcdGZvY3VzZWRPcHRpb246IG51bGxcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBvdGhlcndpc2UsIGZvY3VzIHRoZSBpbnB1dCBhbmQgb3BlbiB0aGUgbWVudVxuXHRcdFx0XHR0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IHRoaXMucHJvcHMub3Blbk9uQ2xpY2s7XG5cdFx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWRPcHRpb246IG51bGwgfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlTW91c2VEb3duT25BcnJvdycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZU1vdXNlRG93bk9uQXJyb3coZXZlbnQpIHtcblx0XHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcblx0XHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxuXHRcdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdC8vIHByZXZlbnQgZGVmYXVsdCBldmVudCBoYW5kbGVyc1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0Ly8gY2xvc2UgdGhlIG1lbnVcblx0XHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIElmIHRoZSBtZW51IGlzbid0IG9wZW4sIGxldCB0aGUgZXZlbnQgYnViYmxlIHRvIHRoZSBtYWluIGhhbmRsZU1vdXNlRG93blxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpc09wZW46IHRydWVcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlTW91c2VEb3duT25NZW51Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duT25NZW51KGV2ZW50KSB7XG5cdFx0XHQvLyBpZiB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSBhIG1vdXNlZG93biBhbmQgbm90IHRoZSBwcmltYXJ5XG5cdFx0XHQvLyBidXR0b24sIG9yIGlmIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQsIGlnbm9yZSBpdC5cblx0XHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8IGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dGhpcy5fb3BlbkFmdGVyRm9jdXMgPSB0cnVlO1xuXHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2Nsb3NlTWVudScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNsb3NlTWVudSgpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzLm9uQ2xvc2VSZXNldHNJbnB1dCkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpbnB1dFZhbHVlOiB0aGlzLmhhbmRsZUlucHV0VmFsdWVDaGFuZ2UoJycpLFxuXHRcdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiB0aGlzLnN0YXRlLmlzRm9jdXNlZCAmJiAhdGhpcy5wcm9wcy5tdWx0aVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0XHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiB0aGlzLnN0YXRlLmlzRm9jdXNlZCAmJiAhdGhpcy5wcm9wcy5tdWx0aVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbiA9IGZhbHNlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZUlucHV0Rm9jdXMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVJbnB1dEZvY3VzKGV2ZW50KSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkgcmV0dXJuO1xuXG5cdFx0XHR2YXIgdG9PcGVuID0gdGhpcy5zdGF0ZS5pc09wZW4gfHwgdGhpcy5fb3BlbkFmdGVyRm9jdXMgfHwgdGhpcy5wcm9wcy5vcGVuT25Gb2N1cztcblx0XHRcdHRvT3BlbiA9IHRoaXMuX2ZvY3VzQWZ0ZXJDbGVhciA/IGZhbHNlIDogdG9PcGVuOyAvL2lmIGZvY3VzIGhhcHBlbnMgYWZ0ZXIgY2xlYXIgdmFsdWVzLCBkb24ndCBvcGVuIGRyb3Bkb3duIHlldC5cblxuXHRcdFx0aWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xuXHRcdFx0XHR0aGlzLnByb3BzLm9uRm9jdXMoZXZlbnQpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aXNGb2N1c2VkOiB0cnVlLFxuXHRcdFx0XHRpc09wZW46ICEhdG9PcGVuXG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fZm9jdXNBZnRlckNsZWFyID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IGZhbHNlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZUlucHV0Qmx1cicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUlucHV0Qmx1cihldmVudCkge1xuXHRcdFx0Ly8gVGhlIGNoZWNrIGZvciBtZW51LmNvbnRhaW5zKGFjdGl2ZUVsZW1lbnQpIGlzIG5lY2Vzc2FyeSB0byBwcmV2ZW50IElFMTEncyBzY3JvbGxiYXIgZnJvbSBjbG9zaW5nIHRoZSBtZW51IGluIGNlcnRhaW4gY29udGV4dHMuXG5cdFx0XHRpZiAodGhpcy5tZW51ICYmICh0aGlzLm1lbnUgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgdGhpcy5tZW51LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSkge1xuXHRcdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMucHJvcHMub25CbHVyKSB7XG5cdFx0XHRcdHRoaXMucHJvcHMub25CbHVyKGV2ZW50KTtcblx0XHRcdH1cblx0XHRcdHZhciBvbkJsdXJyZWRTdGF0ZSA9IHtcblx0XHRcdFx0aXNGb2N1c2VkOiBmYWxzZSxcblx0XHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZVxuXHRcdFx0fTtcblx0XHRcdGlmICh0aGlzLnByb3BzLm9uQmx1clJlc2V0c0lucHV0KSB7XG5cdFx0XHRcdG9uQmx1cnJlZFN0YXRlLmlucHV0VmFsdWUgPSB0aGlzLmhhbmRsZUlucHV0VmFsdWVDaGFuZ2UoJycpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5zZXRTdGF0ZShvbkJsdXJyZWRTdGF0ZSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlSW5wdXRDaGFuZ2UnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVJbnB1dENoYW5nZShldmVudCkge1xuXHRcdFx0dmFyIG5ld0lucHV0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cblx0XHRcdGlmICh0aGlzLnN0YXRlLmlucHV0VmFsdWUgIT09IGV2ZW50LnRhcmdldC52YWx1ZSkge1xuXHRcdFx0XHRuZXdJbnB1dFZhbHVlID0gdGhpcy5oYW5kbGVJbnB1dFZhbHVlQ2hhbmdlKG5ld0lucHV0VmFsdWUpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aW5wdXRWYWx1ZTogbmV3SW5wdXRWYWx1ZSxcblx0XHRcdFx0aXNPcGVuOiB0cnVlLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdzZXRJbnB1dFZhbHVlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gc2V0SW5wdXRWYWx1ZShuZXdWYWx1ZSkge1xuXHRcdFx0aWYgKHRoaXMucHJvcHMub25JbnB1dENoYW5nZSkge1xuXHRcdFx0XHR2YXIgbmV4dFN0YXRlID0gdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKG5ld1ZhbHVlKTtcblx0XHRcdFx0aWYgKG5leHRTdGF0ZSAhPSBudWxsICYmICh0eXBlb2YgbmV4dFN0YXRlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihuZXh0U3RhdGUpKSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRuZXdWYWx1ZSA9ICcnICsgbmV4dFN0YXRlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aW5wdXRWYWx1ZTogbmV3VmFsdWVcblx0XHRcdH0pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZUlucHV0VmFsdWVDaGFuZ2UnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVJbnB1dFZhbHVlQ2hhbmdlKG5ld1ZhbHVlKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKSB7XG5cdFx0XHRcdHZhciBuZXh0U3RhdGUgPSB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UobmV3VmFsdWUpO1xuXHRcdFx0XHQvLyBOb3RlOiAhPSB1c2VkIGRlbGliZXJhdGVseSBoZXJlIHRvIGNhdGNoIHVuZGVmaW5lZCBhbmQgbnVsbFxuXHRcdFx0XHRpZiAobmV4dFN0YXRlICE9IG51bGwgJiYgKHR5cGVvZiBuZXh0U3RhdGUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG5leHRTdGF0ZSkpICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdG5ld1ZhbHVlID0gJycgKyBuZXh0U3RhdGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBuZXdWYWx1ZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVLZXlEb3duJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlS2V5RG93bihldmVudCkge1xuXHRcdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQpIHJldHVybjtcblxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uSW5wdXRLZXlEb3duID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHRoaXMucHJvcHMub25JbnB1dEtleURvd24oZXZlbnQpO1xuXHRcdFx0XHRpZiAoZXZlbnQuZGVmYXVsdFByZXZlbnRlZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblx0XHRcdFx0Y2FzZSA4OlxuXHRcdFx0XHRcdC8vIGJhY2tzcGFjZVxuXHRcdFx0XHRcdGlmICghdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmIHRoaXMucHJvcHMuYmFja3NwYWNlUmVtb3Zlcykge1xuXHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHRoaXMucG9wVmFsdWUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgOTpcblx0XHRcdFx0XHQvLyB0YWJcblx0XHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkgfHwgIXRoaXMuc3RhdGUuaXNPcGVuIHx8ICF0aGlzLnByb3BzLnRhYlNlbGVjdHNWYWx1ZSkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RGb2N1c2VkT3B0aW9uKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMTM6XG5cdFx0XHRcdFx0Ly8gZW50ZXJcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdGlmICh0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0XHRcdFx0dGhpcy5zZWxlY3RGb2N1c2VkT3B0aW9uKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuZm9jdXNOZXh0T3B0aW9uKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDI3OlxuXHRcdFx0XHRcdC8vIGVzY2FwZVxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLmNsZWFyYWJsZSAmJiB0aGlzLnByb3BzLmVzY2FwZUNsZWFyc1ZhbHVlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmNsZWFyVmFsdWUoZXZlbnQpO1xuXHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDMyOlxuXHRcdFx0XHRcdC8vIHNwYWNlXG5cdFx0XHRcdFx0aWYgKHRoaXMucHJvcHMuc2VhcmNoYWJsZSkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0XHRcdFx0dGhpcy5mb2N1c05leHRPcHRpb24oKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHQvLyB1cFxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5mb2N1c1ByZXZpb3VzT3B0aW9uKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdFx0Ly8gZG93blxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5mb2N1c05leHRPcHRpb24oKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzMzpcblx0XHRcdFx0XHQvLyBwYWdlIHVwXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLmZvY3VzUGFnZVVwT3B0aW9uKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMzQ6XG5cdFx0XHRcdFx0Ly8gcGFnZSBkb3duXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLmZvY3VzUGFnZURvd25PcHRpb24oKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzNTpcblx0XHRcdFx0XHQvLyBlbmQga2V5XG5cdFx0XHRcdFx0aWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLmZvY3VzRW5kT3B0aW9uKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMzY6XG5cdFx0XHRcdFx0Ly8gaG9tZSBrZXlcblx0XHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMuZm9jdXNTdGFydE9wdGlvbigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDQ2OlxuXHRcdFx0XHRcdC8vIGRlbGV0ZVxuXHRcdFx0XHRcdGlmICghdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmIHRoaXMucHJvcHMuZGVsZXRlUmVtb3Zlcykge1xuXHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHRoaXMucG9wVmFsdWUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlVmFsdWVDbGljaycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVZhbHVlQ2xpY2sob3B0aW9uLCBldmVudCkge1xuXHRcdFx0aWYgKCF0aGlzLnByb3BzLm9uVmFsdWVDbGljaykgcmV0dXJuO1xuXHRcdFx0dGhpcy5wcm9wcy5vblZhbHVlQ2xpY2sob3B0aW9uLCBldmVudCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlTWVudVNjcm9sbCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZU1lbnVTY3JvbGwoZXZlbnQpIHtcblx0XHRcdGlmICghdGhpcy5wcm9wcy5vbk1lbnVTY3JvbGxUb0JvdHRvbSkgcmV0dXJuO1xuXHRcdFx0dmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuXHRcdFx0aWYgKHRhcmdldC5zY3JvbGxIZWlnaHQgPiB0YXJnZXQub2Zmc2V0SGVpZ2h0ICYmIHRhcmdldC5zY3JvbGxIZWlnaHQgLSB0YXJnZXQub2Zmc2V0SGVpZ2h0IC0gdGFyZ2V0LnNjcm9sbFRvcCA8PSAwKSB7XG5cdFx0XHRcdHRoaXMucHJvcHMub25NZW51U2Nyb2xsVG9Cb3R0b20oKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdnZXRPcHRpb25MYWJlbCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldE9wdGlvbkxhYmVsKG9wKSB7XG5cdFx0XHRyZXR1cm4gb3BbdGhpcy5wcm9wcy5sYWJlbEtleV07XG5cdFx0fVxuXG5cdFx0LyoqXG4gICAqIFR1cm5zIGEgdmFsdWUgaW50byBhbiBhcnJheSBmcm9tIHRoZSBnaXZlbiBvcHRpb25zXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxBcnJheX0gdmFsdWVcdFx0LSB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCBpbnB1dFxuICAgKiBAcGFyYW0ge09iamVjdH1cdFx0bmV4dFByb3BzXHQtIG9wdGlvbmFsbHkgc3BlY2lmeSB0aGUgbmV4dFByb3BzIHNvIHRoZSByZXR1cm5lZCBhcnJheSB1c2VzIHRoZSBsYXRlc3QgY29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJuc1x0e0FycmF5fVx0dGhlIHZhbHVlIG9mIHRoZSBzZWxlY3QgcmVwcmVzZW50ZWQgaW4gYW4gYXJyYXlcbiAgICovXG5cblx0fSwge1xuXHRcdGtleTogJ2dldFZhbHVlQXJyYXknLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRWYWx1ZUFycmF5KHZhbHVlKSB7XG5cdFx0XHR2YXIgbmV4dFByb3BzID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG5cblx0XHRcdC8qKiBzdXBwb3J0IG9wdGlvbmFsbHkgcGFzc2luZyBpbiB0aGUgYG5leHRQcm9wc2Agc28gYGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNgIHVwZGF0ZXMgd2lsbCBmdW5jdGlvbiBhcyBleHBlY3RlZCAqL1xuXHRcdFx0dmFyIHByb3BzID0gKHR5cGVvZiBuZXh0UHJvcHMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG5leHRQcm9wcykpID09PSAnb2JqZWN0JyA/IG5leHRQcm9wcyA6IHRoaXMucHJvcHM7XG5cdFx0XHRpZiAocHJvcHMubXVsdGkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlLnNwbGl0KHByb3BzLmRlbGltaXRlcik7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0XHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW107XG5cdFx0XHRcdFx0dmFsdWUgPSBbdmFsdWVdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2YWx1ZS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGV4cGFuZFZhbHVlKHZhbHVlLCBwcm9wcyk7XG5cdFx0XHRcdH0pLmZpbHRlcihmdW5jdGlvbiAoaSkge1xuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHZhciBleHBhbmRlZFZhbHVlID0gZXhwYW5kVmFsdWUodmFsdWUsIHByb3BzKTtcblx0XHRcdHJldHVybiBleHBhbmRlZFZhbHVlID8gW2V4cGFuZGVkVmFsdWVdIDogW107XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnc2V0VmFsdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBzZXRWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0dmFyIF90aGlzMiA9IHRoaXM7XG5cblx0XHRcdGlmICh0aGlzLnByb3BzLmF1dG9CbHVyKSB7XG5cdFx0XHRcdHRoaXMuYmx1cklucHV0KCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5yZXF1aXJlZCkge1xuXHRcdFx0XHR2YXIgcmVxdWlyZWQgPSBoYW5kbGVSZXF1aXJlZCh2YWx1ZSwgdGhpcy5wcm9wcy5tdWx0aSk7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyByZXF1aXJlZDogcmVxdWlyZWQgfSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5zaW1wbGVWYWx1ZSAmJiB2YWx1ZSkge1xuXHRcdFx0XHR2YWx1ZSA9IHRoaXMucHJvcHMubXVsdGkgPyB2YWx1ZS5tYXAoZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0XHRyZXR1cm4gaVtfdGhpczIucHJvcHMudmFsdWVLZXldO1xuXHRcdFx0XHR9KS5qb2luKHRoaXMucHJvcHMuZGVsaW1pdGVyKSA6IHZhbHVlW3RoaXMucHJvcHMudmFsdWVLZXldO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcblx0XHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnc2VsZWN0VmFsdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0dmFyIF90aGlzMyA9IHRoaXM7XG5cblx0XHRcdC8vIE5PVEU6IHdlIGFjdHVhbGx5IGFkZC9zZXQgdGhlIHZhbHVlIGluIGEgY2FsbGJhY2sgdG8gbWFrZSBzdXJlIHRoZVxuXHRcdFx0Ly8gaW5wdXQgdmFsdWUgaXMgZW1wdHkgdG8gYXZvaWQgc3R5bGluZyBpc3N1ZXMgaW4gQ2hyb21lXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5jbG9zZU9uU2VsZWN0KSB7XG5cdFx0XHRcdHRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbiA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHVwZGF0ZWRWYWx1ZSA9IHRoaXMucHJvcHMub25TZWxlY3RSZXNldHNJbnB1dCA/ICcnIDogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlO1xuXHRcdFx0aWYgKHRoaXMucHJvcHMubXVsdGkpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0Zm9jdXNlZEluZGV4OiBudWxsLFxuXHRcdFx0XHRcdGlucHV0VmFsdWU6IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZSh1cGRhdGVkVmFsdWUpLFxuXHRcdFx0XHRcdGlzT3BlbjogIXRoaXMucHJvcHMuY2xvc2VPblNlbGVjdFxuXHRcdFx0XHR9LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIHZhbHVlQXJyYXkgPSBfdGhpczMuZ2V0VmFsdWVBcnJheShfdGhpczMucHJvcHMudmFsdWUpO1xuXHRcdFx0XHRcdGlmICh2YWx1ZUFycmF5LnNvbWUoZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBpW190aGlzMy5wcm9wcy52YWx1ZUtleV0gPT09IHZhbHVlW190aGlzMy5wcm9wcy52YWx1ZUtleV07XG5cdFx0XHRcdFx0fSkpIHtcblx0XHRcdFx0XHRcdF90aGlzMy5yZW1vdmVWYWx1ZSh2YWx1ZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF90aGlzMy5hZGRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlucHV0VmFsdWU6IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZSh1cGRhdGVkVmFsdWUpLFxuXHRcdFx0XHRcdGlzT3BlbjogIXRoaXMucHJvcHMuY2xvc2VPblNlbGVjdCxcblx0XHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkXG5cdFx0XHRcdH0sIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRfdGhpczMuc2V0VmFsdWUodmFsdWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdhZGRWYWx1ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGFkZFZhbHVlKHZhbHVlKSB7XG5cdFx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHRcdHZhciB2aXNpYmxlT3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zLmZpbHRlcihmdW5jdGlvbiAodmFsKSB7XG5cdFx0XHRcdHJldHVybiAhdmFsLmRpc2FibGVkO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgbGFzdFZhbHVlSW5kZXggPSB2aXNpYmxlT3B0aW9ucy5pbmRleE9mKHZhbHVlKTtcblx0XHRcdHRoaXMuc2V0VmFsdWUodmFsdWVBcnJheS5jb25jYXQodmFsdWUpKTtcblx0XHRcdGlmICh2aXNpYmxlT3B0aW9ucy5sZW5ndGggLSAxID09PSBsYXN0VmFsdWVJbmRleCkge1xuXHRcdFx0XHQvLyB0aGUgbGFzdCBvcHRpb24gd2FzIHNlbGVjdGVkOyBmb2N1cyB0aGUgc2Vjb25kLWxhc3Qgb25lXG5cdFx0XHRcdHRoaXMuZm9jdXNPcHRpb24odmlzaWJsZU9wdGlvbnNbbGFzdFZhbHVlSW5kZXggLSAxXSk7XG5cdFx0XHR9IGVsc2UgaWYgKHZpc2libGVPcHRpb25zLmxlbmd0aCA+IGxhc3RWYWx1ZUluZGV4KSB7XG5cdFx0XHRcdC8vIGZvY3VzIHRoZSBvcHRpb24gYmVsb3cgdGhlIHNlbGVjdGVkIG9uZVxuXHRcdFx0XHR0aGlzLmZvY3VzT3B0aW9uKHZpc2libGVPcHRpb25zW2xhc3RWYWx1ZUluZGV4ICsgMV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3BvcFZhbHVlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcG9wVmFsdWUoKSB7XG5cdFx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHRcdGlmICghdmFsdWVBcnJheS5sZW5ndGgpIHJldHVybjtcblx0XHRcdGlmICh2YWx1ZUFycmF5W3ZhbHVlQXJyYXkubGVuZ3RoIC0gMV0uY2xlYXJhYmxlVmFsdWUgPT09IGZhbHNlKSByZXR1cm47XG5cdFx0XHR0aGlzLnNldFZhbHVlKHRoaXMucHJvcHMubXVsdGkgPyB2YWx1ZUFycmF5LnNsaWNlKDAsIHZhbHVlQXJyYXkubGVuZ3RoIC0gMSkgOiBudWxsKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW1vdmVWYWx1ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVZhbHVlKHZhbHVlKSB7XG5cdFx0XHR2YXIgX3RoaXM0ID0gdGhpcztcblxuXHRcdFx0dmFyIHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0XHR0aGlzLnNldFZhbHVlKHZhbHVlQXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG5cdFx0XHRcdHJldHVybiBpW190aGlzNC5wcm9wcy52YWx1ZUtleV0gIT09IHZhbHVlW190aGlzNC5wcm9wcy52YWx1ZUtleV07XG5cdFx0XHR9KSk7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY2xlYXJWYWx1ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNsZWFyVmFsdWUoZXZlbnQpIHtcblx0XHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcblx0XHRcdC8vIGJ1dHRvbiwgaWdub3JlIGl0LlxuXHRcdFx0aWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHRoaXMuc2V0VmFsdWUodGhpcy5nZXRSZXNldFZhbHVlKCkpO1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGlucHV0VmFsdWU6IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZSgnJyksXG5cdFx0XHRcdGlzT3BlbjogZmFsc2Vcblx0XHRcdH0sIHRoaXMuZm9jdXMpO1xuXG5cdFx0XHR0aGlzLl9mb2N1c0FmdGVyQ2xlYXIgPSB0cnVlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2dldFJlc2V0VmFsdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRSZXNldFZhbHVlKCkge1xuXHRcdFx0aWYgKHRoaXMucHJvcHMucmVzZXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnByb3BzLnJlc2V0VmFsdWU7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMubXVsdGkpIHtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXNPcHRpb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmb2N1c09wdGlvbihvcHRpb24pIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uOiBvcHRpb25cblx0XHRcdH0pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2ZvY3VzTmV4dE9wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzTmV4dE9wdGlvbigpIHtcblx0XHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignbmV4dCcpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2ZvY3VzUHJldmlvdXNPcHRpb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmb2N1c1ByZXZpb3VzT3B0aW9uKCkge1xuXHRcdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwcmV2aW91cycpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2ZvY3VzUGFnZVVwT3B0aW9uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXNQYWdlVXBPcHRpb24oKSB7XG5cdFx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3BhZ2VfdXAnKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1c1BhZ2VEb3duT3B0aW9uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXNQYWdlRG93bk9wdGlvbigpIHtcblx0XHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbigncGFnZV9kb3duJyk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXNTdGFydE9wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzU3RhcnRPcHRpb24oKSB7XG5cdFx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3N0YXJ0Jyk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXNFbmRPcHRpb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmb2N1c0VuZE9wdGlvbigpIHtcblx0XHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignZW5kJyk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXNBZGphY2VudE9wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzQWRqYWNlbnRPcHRpb24oZGlyKSB7XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zLm1hcChmdW5jdGlvbiAob3B0aW9uLCBpbmRleCkge1xuXHRcdFx0XHRyZXR1cm4geyBvcHRpb246IG9wdGlvbiwgaW5kZXg6IGluZGV4IH07XG5cdFx0XHR9KS5maWx0ZXIoZnVuY3Rpb24gKG9wdGlvbikge1xuXHRcdFx0XHRyZXR1cm4gIW9wdGlvbi5vcHRpb24uZGlzYWJsZWQ7XG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuX3Njcm9sbFRvRm9jdXNlZE9wdGlvbk9uVXBkYXRlID0gdHJ1ZTtcblx0XHRcdGlmICghdGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdFx0dmFyIG5ld1N0YXRlID0ge1xuXHRcdFx0XHRcdGZvY3VzZWRPcHRpb246IHRoaXMuX2ZvY3VzZWRPcHRpb24gfHwgKG9wdGlvbnMubGVuZ3RoID8gb3B0aW9uc1tkaXIgPT09ICduZXh0JyA/IDAgOiBvcHRpb25zLmxlbmd0aCAtIDFdLm9wdGlvbiA6IG51bGwpLFxuXHRcdFx0XHRcdGlzT3BlbjogdHJ1ZVxuXHRcdFx0XHR9O1xuXHRcdFx0XHRpZiAodGhpcy5wcm9wcy5vblNlbGVjdFJlc2V0c0lucHV0KSB7XG5cdFx0XHRcdFx0bmV3U3RhdGUuaW5wdXRWYWx1ZSA9ICcnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoIW9wdGlvbnMubGVuZ3RoKSByZXR1cm47XG5cdFx0XHR2YXIgZm9jdXNlZEluZGV4ID0gLTE7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHRoaXMuX2ZvY3VzZWRPcHRpb24gPT09IG9wdGlvbnNbaV0ub3B0aW9uKSB7XG5cdFx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gaTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRpciA9PT0gJ25leHQnICYmIGZvY3VzZWRJbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gKGZvY3VzZWRJbmRleCArIDEpICUgb3B0aW9ucy5sZW5ndGg7XG5cdFx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3ByZXZpb3VzJykge1xuXHRcdFx0XHRpZiAoZm9jdXNlZEluZGV4ID4gMCkge1xuXHRcdFx0XHRcdGZvY3VzZWRJbmRleCA9IGZvY3VzZWRJbmRleCAtIDE7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ3N0YXJ0Jykge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSAwO1xuXHRcdFx0fSBlbHNlIGlmIChkaXIgPT09ICdlbmQnKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcblx0XHRcdH0gZWxzZSBpZiAoZGlyID09PSAncGFnZV91cCcpIHtcblx0XHRcdFx0dmFyIHBvdGVudGlhbEluZGV4ID0gZm9jdXNlZEluZGV4IC0gdGhpcy5wcm9wcy5wYWdlU2l6ZTtcblx0XHRcdFx0aWYgKHBvdGVudGlhbEluZGV4IDwgMCkge1xuXHRcdFx0XHRcdGZvY3VzZWRJbmRleCA9IDA7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gcG90ZW50aWFsSW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoZGlyID09PSAncGFnZV9kb3duJykge1xuXHRcdFx0XHR2YXIgX3BvdGVudGlhbEluZGV4ID0gZm9jdXNlZEluZGV4ICsgdGhpcy5wcm9wcy5wYWdlU2l6ZTtcblx0XHRcdFx0aWYgKF9wb3RlbnRpYWxJbmRleCA+IG9wdGlvbnMubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdGZvY3VzZWRJbmRleCA9IG9wdGlvbnMubGVuZ3RoIC0gMTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmb2N1c2VkSW5kZXggPSBfcG90ZW50aWFsSW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGZvY3VzZWRJbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gMDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGZvY3VzZWRJbmRleDogb3B0aW9uc1tmb2N1c2VkSW5kZXhdLmluZGV4LFxuXHRcdFx0XHRmb2N1c2VkT3B0aW9uOiBvcHRpb25zW2ZvY3VzZWRJbmRleF0ub3B0aW9uXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdnZXRGb2N1c2VkT3B0aW9uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0Rm9jdXNlZE9wdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLl9mb2N1c2VkT3B0aW9uO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3NlbGVjdEZvY3VzZWRPcHRpb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RGb2N1c2VkT3B0aW9uKCkge1xuXHRcdFx0aWYgKHRoaXMuX2ZvY3VzZWRPcHRpb24pIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuc2VsZWN0VmFsdWUodGhpcy5fZm9jdXNlZE9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyTG9hZGluZycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlckxvYWRpbmcoKSB7XG5cdFx0XHRpZiAoIXRoaXMucHJvcHMuaXNMb2FkaW5nKSByZXR1cm47XG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J3NwYW4nLFxuXHRcdFx0XHR7IGNsYXNzTmFtZTogJ1NlbGVjdC1sb2FkaW5nLXpvbmUnLCAnYXJpYS1oaWRkZW4nOiAndHJ1ZScgfSxcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHsgY2xhc3NOYW1lOiAnU2VsZWN0LWxvYWRpbmcnIH0pXG5cdFx0XHQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlclZhbHVlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyVmFsdWUodmFsdWVBcnJheSwgaXNPcGVuKSB7XG5cdFx0XHR2YXIgX3RoaXM1ID0gdGhpcztcblxuXHRcdFx0dmFyIHJlbmRlckxhYmVsID0gdGhpcy5wcm9wcy52YWx1ZVJlbmRlcmVyIHx8IHRoaXMuZ2V0T3B0aW9uTGFiZWw7XG5cdFx0XHR2YXIgVmFsdWVDb21wb25lbnQgPSB0aGlzLnByb3BzLnZhbHVlQ29tcG9uZW50O1xuXHRcdFx0aWYgKCF2YWx1ZUFycmF5Lmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgc2hvd1BsYWNlaG9sZGVyID0gc2hvdWxkU2hvd1BsYWNlaG9sZGVyKHRoaXMuc3RhdGUsIHRoaXMucHJvcHMsIGlzT3Blbik7XG5cdFx0XHRcdHJldHVybiBzaG93UGxhY2Vob2xkZXIgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdHsgY2xhc3NOYW1lOiAnU2VsZWN0LXBsYWNlaG9sZGVyJyB9LFxuXHRcdFx0XHRcdHRoaXMucHJvcHMucGxhY2Vob2xkZXJcblx0XHRcdFx0KSA6IG51bGw7XG5cdFx0XHR9XG5cdFx0XHR2YXIgb25DbGljayA9IHRoaXMucHJvcHMub25WYWx1ZUNsaWNrID8gdGhpcy5oYW5kbGVWYWx1ZUNsaWNrIDogbnVsbDtcblx0XHRcdGlmICh0aGlzLnByb3BzLm11bHRpKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZUFycmF5Lm1hcChmdW5jdGlvbiAodmFsdWUsIGkpIHtcblx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHRcdFZhbHVlQ29tcG9uZW50LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRkaXNhYmxlZDogX3RoaXM1LnByb3BzLmRpc2FibGVkIHx8IHZhbHVlLmNsZWFyYWJsZVZhbHVlID09PSBmYWxzZSxcblx0XHRcdFx0XHRcdFx0aWQ6IF90aGlzNS5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlLScgKyBpLFxuXHRcdFx0XHRcdFx0XHRpbnN0YW5jZVByZWZpeDogX3RoaXM1Ll9pbnN0YW5jZVByZWZpeCxcblx0XHRcdFx0XHRcdFx0a2V5OiAndmFsdWUtJyArIGkgKyAnLScgKyB2YWx1ZVtfdGhpczUucHJvcHMudmFsdWVLZXldLFxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrOiBvbkNsaWNrLFxuXHRcdFx0XHRcdFx0XHRvblJlbW92ZTogX3RoaXM1LnJlbW92ZVZhbHVlLFxuXHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcjogX3RoaXM1LnByb3BzLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRyZW5kZXJMYWJlbCh2YWx1ZSwgaSksXG5cdFx0XHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdFx0XHQnc3BhbicsXG5cdFx0XHRcdFx0XHRcdHsgY2xhc3NOYW1lOiAnU2VsZWN0LWFyaWEtb25seScgfSxcblx0XHRcdFx0XHRcdFx0J1xceEEwJ1xuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChzaG91bGRTaG93VmFsdWUodGhpcy5zdGF0ZSwgdGhpcy5wcm9wcykpIHtcblx0XHRcdFx0aWYgKGlzT3Blbikgb25DbGljayA9IG51bGw7XG5cdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdFZhbHVlQ29tcG9uZW50LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRpc2FibGVkOiB0aGlzLnByb3BzLmRpc2FibGVkLFxuXHRcdFx0XHRcdFx0aWQ6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZS1pdGVtJyxcblx0XHRcdFx0XHRcdGluc3RhbmNlUHJlZml4OiB0aGlzLl9pbnN0YW5jZVByZWZpeCxcblx0XHRcdFx0XHRcdG9uQ2xpY2s6IG9uQ2xpY2ssXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcjogdGhpcy5wcm9wcy5wbGFjZWhvbGRlcixcblx0XHRcdFx0XHRcdHZhbHVlOiB2YWx1ZUFycmF5WzBdXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyZW5kZXJMYWJlbCh2YWx1ZUFycmF5WzBdKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlcklucHV0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVySW5wdXQodmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbkluZGV4KSB7XG5cdFx0XHR2YXIgX2NsYXNzTmFtZXMsXG5cdFx0XHQgICAgX3RoaXM2ID0gdGhpcztcblxuXHRcdFx0dmFyIGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoJ1NlbGVjdC1pbnB1dCcsIHRoaXMucHJvcHMuaW5wdXRQcm9wcy5jbGFzc05hbWUpO1xuXHRcdFx0dmFyIGlzT3BlbiA9IHRoaXMuc3RhdGUuaXNPcGVuO1xuXG5cdFx0XHR2YXIgYXJpYU93bnMgPSBjbGFzc05hbWVzKChfY2xhc3NOYW1lcyA9IHt9LCBkZWZpbmVQcm9wZXJ0eShfY2xhc3NOYW1lcywgdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWxpc3QnLCBpc09wZW4pLCBkZWZpbmVQcm9wZXJ0eShfY2xhc3NOYW1lcywgdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWJhY2tzcGFjZS1yZW1vdmUtbWVzc2FnZScsIHRoaXMucHJvcHMubXVsdGkgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgdGhpcy5zdGF0ZS5pc0ZvY3VzZWQgJiYgIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSksIF9jbGFzc05hbWVzKSk7XG5cblx0XHRcdHZhciB2YWx1ZSA9IHRoaXMuc3RhdGUuaW5wdXRWYWx1ZTtcblx0XHRcdGlmICh2YWx1ZSAmJiAhdGhpcy5wcm9wcy5vblNlbGVjdFJlc2V0c0lucHV0ICYmICF0aGlzLnN0YXRlLmlzRm9jdXNlZCkge1xuXHRcdFx0XHQvLyBpdCBoaWRlcyBpbnB1dCB2YWx1ZSB3aGVuIGl0IGlzIG5vdCBmb2N1c2VkIGFuZCB3YXMgbm90IHJlc2V0IG9uIHNlbGVjdFxuXHRcdFx0XHR2YWx1ZSA9ICcnO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgaW5wdXRQcm9wcyA9IF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLmlucHV0UHJvcHMsIHtcblx0XHRcdFx0J2FyaWEtYWN0aXZlZGVzY2VuZGFudCc6IGlzT3BlbiA/IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIGZvY3VzZWRPcHRpb25JbmRleCA6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZScsXG5cdFx0XHRcdCdhcmlhLWRlc2NyaWJlZGJ5JzogdGhpcy5wcm9wc1snYXJpYS1kZXNjcmliZWRieSddLFxuXHRcdFx0XHQnYXJpYS1leHBhbmRlZCc6ICcnICsgaXNPcGVuLFxuXHRcdFx0XHQnYXJpYS1oYXNwb3B1cCc6ICcnICsgaXNPcGVuLFxuXHRcdFx0XHQnYXJpYS1sYWJlbCc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWwnXSxcblx0XHRcdFx0J2FyaWEtbGFiZWxsZWRieSc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWxsZWRieSddLFxuXHRcdFx0XHQnYXJpYS1vd25zJzogYXJpYU93bnMsXG5cdFx0XHRcdGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuXHRcdFx0XHRvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXRCbHVyLFxuXHRcdFx0XHRvbkNoYW5nZTogdGhpcy5oYW5kbGVJbnB1dENoYW5nZSxcblx0XHRcdFx0b25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLFxuXHRcdFx0XHRyZWY6IGZ1bmN0aW9uIHJlZihfcmVmKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF90aGlzNi5pbnB1dCA9IF9yZWY7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHJvbGU6ICdjb21ib2JveCcsXG5cdFx0XHRcdHJlcXVpcmVkOiB0aGlzLnN0YXRlLnJlcXVpcmVkLFxuXHRcdFx0XHR0YWJJbmRleDogdGhpcy5wcm9wcy50YWJJbmRleCxcblx0XHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHRoaXMucHJvcHMuaW5wdXRSZW5kZXJlcikge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKGlucHV0UHJvcHMpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCAhdGhpcy5wcm9wcy5zZWFyY2hhYmxlKSB7XG5cdFx0XHRcdHZhciBkaXZQcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHRoaXMucHJvcHMuaW5wdXRQcm9wcywgW10pO1xuXG5cblx0XHRcdFx0dmFyIF9hcmlhT3ducyA9IGNsYXNzTmFtZXMoZGVmaW5lUHJvcGVydHkoe30sIHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1saXN0JywgaXNPcGVuKSk7XG5cdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdkaXYnLCBfZXh0ZW5kcyh7fSwgZGl2UHJvcHMsIHtcblx0XHRcdFx0XHQnYXJpYS1leHBhbmRlZCc6IGlzT3Blbixcblx0XHRcdFx0XHQnYXJpYS1vd25zJzogX2FyaWFPd25zLFxuXHRcdFx0XHRcdCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnOiBpc09wZW4gPyB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctb3B0aW9uLScgKyBmb2N1c2VkT3B0aW9uSW5kZXggOiB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctdmFsdWUnLFxuXHRcdFx0XHRcdCdhcmlhLWRpc2FibGVkJzogJycgKyB0aGlzLnByb3BzLmRpc2FibGVkLFxuXHRcdFx0XHRcdCdhcmlhLWxhYmVsJzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbCddLFxuXHRcdFx0XHRcdCdhcmlhLWxhYmVsbGVkYnknOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsbGVkYnknXSxcblx0XHRcdFx0XHRjbGFzc05hbWU6IGNsYXNzTmFtZSxcblx0XHRcdFx0XHRvbkJsdXI6IHRoaXMuaGFuZGxlSW5wdXRCbHVyLFxuXHRcdFx0XHRcdG9uRm9jdXM6IHRoaXMuaGFuZGxlSW5wdXRGb2N1cyxcblx0XHRcdFx0XHRyZWY6IGZ1bmN0aW9uIHJlZihfcmVmMikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzNi5pbnB1dCA9IF9yZWYyO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cm9sZTogJ2NvbWJvYm94Jyxcblx0XHRcdFx0XHRzdHlsZTogeyBib3JkZXI6IDAsIHdpZHRoOiAxLCBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyB9LFxuXHRcdFx0XHRcdHRhYkluZGV4OiB0aGlzLnByb3BzLnRhYkluZGV4IHx8IDBcblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5hdXRvc2l6ZSkge1xuXHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChBdXRvc2l6ZUlucHV0LCBfZXh0ZW5kcyh7IGlkOiB0aGlzLnByb3BzLmlkIH0sIGlucHV0UHJvcHMsIHsgbWluV2lkdGg6ICc1JyB9KSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIGtleTogJ2lucHV0LXdyYXAnLCBzdHlsZTogeyBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyB9IH0sXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgX2V4dGVuZHMoeyBpZDogdGhpcy5wcm9wcy5pZCB9LCBpbnB1dFByb3BzKSlcblx0XHRcdCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyQ2xlYXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJDbGVhcigpIHtcblx0XHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdFx0aWYgKCF0aGlzLnByb3BzLmNsZWFyYWJsZSB8fCAhdmFsdWVBcnJheS5sZW5ndGggfHwgdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0aGlzLnByb3BzLmlzTG9hZGluZykgcmV0dXJuO1xuXHRcdFx0dmFyIGFyaWFMYWJlbCA9IHRoaXMucHJvcHMubXVsdGkgPyB0aGlzLnByb3BzLmNsZWFyQWxsVGV4dCA6IHRoaXMucHJvcHMuY2xlYXJWYWx1ZVRleHQ7XG5cdFx0XHR2YXIgY2xlYXIgPSB0aGlzLnByb3BzLmNsZWFyUmVuZGVyZXIoKTtcblxuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdzcGFuJyxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdCdhcmlhLWxhYmVsJzogYXJpYUxhYmVsLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ1NlbGVjdC1jbGVhci16b25lJyxcblx0XHRcdFx0XHRvbk1vdXNlRG93bjogdGhpcy5jbGVhclZhbHVlLFxuXHRcdFx0XHRcdG9uVG91Y2hFbmQ6IHRoaXMuaGFuZGxlVG91Y2hFbmRDbGVhclZhbHVlLFxuXHRcdFx0XHRcdG9uVG91Y2hNb3ZlOiB0aGlzLmhhbmRsZVRvdWNoTW92ZSxcblx0XHRcdFx0XHRvblRvdWNoU3RhcnQ6IHRoaXMuaGFuZGxlVG91Y2hTdGFydCxcblx0XHRcdFx0XHR0aXRsZTogYXJpYUxhYmVsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGNsZWFyXG5cdFx0XHQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlckFycm93Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyQXJyb3coKSB7XG5cdFx0XHRpZiAoIXRoaXMucHJvcHMuYXJyb3dSZW5kZXJlcikgcmV0dXJuO1xuXG5cdFx0XHR2YXIgb25Nb3VzZURvd24gPSB0aGlzLmhhbmRsZU1vdXNlRG93bk9uQXJyb3c7XG5cdFx0XHR2YXIgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW47XG5cdFx0XHR2YXIgYXJyb3cgPSB0aGlzLnByb3BzLmFycm93UmVuZGVyZXIoeyBvbk1vdXNlRG93bjogb25Nb3VzZURvd24sIGlzT3BlbjogaXNPcGVuIH0pO1xuXG5cdFx0XHRpZiAoIWFycm93KSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J3NwYW4nLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnU2VsZWN0LWFycm93LXpvbmUnLFxuXHRcdFx0XHRcdG9uTW91c2VEb3duOiBvbk1vdXNlRG93blxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcnJvd1xuXHRcdFx0KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmaWx0ZXJPcHRpb25zJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZmlsdGVyT3B0aW9ucyQkMShleGNsdWRlT3B0aW9ucykge1xuXHRcdFx0dmFyIGZpbHRlclZhbHVlID0gdGhpcy5zdGF0ZS5pbnB1dFZhbHVlO1xuXHRcdFx0dmFyIG9wdGlvbnMgPSB0aGlzLnByb3BzLm9wdGlvbnMgfHwgW107XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5maWx0ZXJPcHRpb25zKSB7XG5cdFx0XHRcdC8vIE1haW50YWluIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggYm9vbGVhbiBhdHRyaWJ1dGVcblx0XHRcdFx0dmFyIGZpbHRlck9wdGlvbnMkJDEgPSB0eXBlb2YgdGhpcy5wcm9wcy5maWx0ZXJPcHRpb25zID09PSAnZnVuY3Rpb24nID8gdGhpcy5wcm9wcy5maWx0ZXJPcHRpb25zIDogZmlsdGVyT3B0aW9ucztcblxuXHRcdFx0XHRyZXR1cm4gZmlsdGVyT3B0aW9ucyQkMShvcHRpb25zLCBmaWx0ZXJWYWx1ZSwgZXhjbHVkZU9wdGlvbnMsIHtcblx0XHRcdFx0XHRmaWx0ZXJPcHRpb246IHRoaXMucHJvcHMuZmlsdGVyT3B0aW9uLFxuXHRcdFx0XHRcdGlnbm9yZUFjY2VudHM6IHRoaXMucHJvcHMuaWdub3JlQWNjZW50cyxcblx0XHRcdFx0XHRpZ25vcmVDYXNlOiB0aGlzLnByb3BzLmlnbm9yZUNhc2UsXG5cdFx0XHRcdFx0bGFiZWxLZXk6IHRoaXMucHJvcHMubGFiZWxLZXksXG5cdFx0XHRcdFx0bWF0Y2hQb3M6IHRoaXMucHJvcHMubWF0Y2hQb3MsXG5cdFx0XHRcdFx0bWF0Y2hQcm9wOiB0aGlzLnByb3BzLm1hdGNoUHJvcCxcblx0XHRcdFx0XHR0cmltRmlsdGVyOiB0aGlzLnByb3BzLnRyaW1GaWx0ZXIsXG5cdFx0XHRcdFx0dmFsdWVLZXk6IHRoaXMucHJvcHMudmFsdWVLZXlcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdvbk9wdGlvblJlZicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG9uT3B0aW9uUmVmKHJlZiwgaXNGb2N1c2VkKSB7XG5cdFx0XHRpZiAoaXNGb2N1c2VkKSB7XG5cdFx0XHRcdHRoaXMuZm9jdXNlZCA9IHJlZjtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXJNZW51Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyTWVudShvcHRpb25zLCB2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uKSB7XG5cdFx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5tZW51UmVuZGVyZXIoe1xuXHRcdFx0XHRcdGZvY3VzZWRPcHRpb246IGZvY3VzZWRPcHRpb24sXG5cdFx0XHRcdFx0Zm9jdXNPcHRpb246IHRoaXMuZm9jdXNPcHRpb24sXG5cdFx0XHRcdFx0aW5wdXRWYWx1ZTogdGhpcy5zdGF0ZS5pbnB1dFZhbHVlLFxuXHRcdFx0XHRcdGluc3RhbmNlUHJlZml4OiB0aGlzLl9pbnN0YW5jZVByZWZpeCxcblx0XHRcdFx0XHRsYWJlbEtleTogdGhpcy5wcm9wcy5sYWJlbEtleSxcblx0XHRcdFx0XHRvbkZvY3VzOiB0aGlzLmZvY3VzT3B0aW9uLFxuXHRcdFx0XHRcdG9uT3B0aW9uUmVmOiB0aGlzLm9uT3B0aW9uUmVmLFxuXHRcdFx0XHRcdG9uU2VsZWN0OiB0aGlzLnNlbGVjdFZhbHVlLFxuXHRcdFx0XHRcdG9wdGlvbkNsYXNzTmFtZTogdGhpcy5wcm9wcy5vcHRpb25DbGFzc05hbWUsXG5cdFx0XHRcdFx0b3B0aW9uQ29tcG9uZW50OiB0aGlzLnByb3BzLm9wdGlvbkNvbXBvbmVudCxcblx0XHRcdFx0XHRvcHRpb25SZW5kZXJlcjogdGhpcy5wcm9wcy5vcHRpb25SZW5kZXJlciB8fCB0aGlzLmdldE9wdGlvbkxhYmVsLFxuXHRcdFx0XHRcdG9wdGlvbnM6IG9wdGlvbnMsXG5cdFx0XHRcdFx0cmVtb3ZlVmFsdWU6IHRoaXMucmVtb3ZlVmFsdWUsXG5cdFx0XHRcdFx0c2VsZWN0VmFsdWU6IHRoaXMuc2VsZWN0VmFsdWUsXG5cdFx0XHRcdFx0dmFsdWVBcnJheTogdmFsdWVBcnJheSxcblx0XHRcdFx0XHR2YWx1ZUtleTogdGhpcy5wcm9wcy52YWx1ZUtleVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5ub1Jlc3VsdHNUZXh0KSB7XG5cdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdHsgY2xhc3NOYW1lOiAnU2VsZWN0LW5vcmVzdWx0cycgfSxcblx0XHRcdFx0XHR0aGlzLnByb3BzLm5vUmVzdWx0c1RleHRcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlckhpZGRlbkZpZWxkJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVySGlkZGVuRmllbGQodmFsdWVBcnJheSkge1xuXHRcdFx0dmFyIF90aGlzNyA9IHRoaXM7XG5cblx0XHRcdGlmICghdGhpcy5wcm9wcy5uYW1lKSByZXR1cm47XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5qb2luVmFsdWVzKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSA9IHZhbHVlQXJyYXkubWFwKGZ1bmN0aW9uIChpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0cmluZ2lmeVZhbHVlKGlbX3RoaXM3LnByb3BzLnZhbHVlS2V5XSk7XG5cdFx0XHRcdH0pLmpvaW4odGhpcy5wcm9wcy5kZWxpbWl0ZXIpO1xuXHRcdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XG5cdFx0XHRcdFx0ZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG5cdFx0XHRcdFx0bmFtZTogdGhpcy5wcm9wcy5uYW1lLFxuXHRcdFx0XHRcdHJlZjogZnVuY3Rpb24gcmVmKF9yZWYzKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM3LnZhbHVlID0gX3JlZjM7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0eXBlOiAnaGlkZGVuJyxcblx0XHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWVBcnJheS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG5cdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIHtcblx0XHRcdFx0XHRkaXNhYmxlZDogX3RoaXM3LnByb3BzLmRpc2FibGVkLFxuXHRcdFx0XHRcdGtleTogJ2hpZGRlbi4nICsgaW5kZXgsXG5cdFx0XHRcdFx0bmFtZTogX3RoaXM3LnByb3BzLm5hbWUsXG5cdFx0XHRcdFx0cmVmOiAndmFsdWUnICsgaW5kZXgsXG5cdFx0XHRcdFx0dHlwZTogJ2hpZGRlbicsXG5cdFx0XHRcdFx0dmFsdWU6IHN0cmluZ2lmeVZhbHVlKGl0ZW1bX3RoaXM3LnByb3BzLnZhbHVlS2V5XSlcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdnZXRGb2N1c2FibGVPcHRpb25JbmRleCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldEZvY3VzYWJsZU9wdGlvbkluZGV4KHNlbGVjdGVkT3B0aW9uKSB7XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHRoaXMuX3Zpc2libGVPcHRpb25zO1xuXHRcdFx0aWYgKCFvcHRpb25zLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cblx0XHRcdHZhciB2YWx1ZUtleSA9IHRoaXMucHJvcHMudmFsdWVLZXk7XG5cdFx0XHR2YXIgZm9jdXNlZE9wdGlvbiA9IHRoaXMuc3RhdGUuZm9jdXNlZE9wdGlvbiB8fCBzZWxlY3RlZE9wdGlvbjtcblx0XHRcdGlmIChmb2N1c2VkT3B0aW9uICYmICFmb2N1c2VkT3B0aW9uLmRpc2FibGVkKSB7XG5cdFx0XHRcdHZhciBmb2N1c2VkT3B0aW9uSW5kZXggPSAtMTtcblx0XHRcdFx0b3B0aW9ucy5zb21lKGZ1bmN0aW9uIChvcHRpb24sIGluZGV4KSB7XG5cdFx0XHRcdFx0dmFyIGlzT3B0aW9uRXF1YWwgPSBvcHRpb25bdmFsdWVLZXldID09PSBmb2N1c2VkT3B0aW9uW3ZhbHVlS2V5XTtcblx0XHRcdFx0XHRpZiAoaXNPcHRpb25FcXVhbCkge1xuXHRcdFx0XHRcdFx0Zm9jdXNlZE9wdGlvbkluZGV4ID0gaW5kZXg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBpc09wdGlvbkVxdWFsO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKGZvY3VzZWRPcHRpb25JbmRleCAhPT0gLTEpIHtcblx0XHRcdFx0XHRyZXR1cm4gZm9jdXNlZE9wdGlvbkluZGV4O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAoIW9wdGlvbnNbaV0uZGlzYWJsZWQpIHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyT3V0ZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJPdXRlcihvcHRpb25zLCB2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uKSB7XG5cdFx0XHR2YXIgX3RoaXM4ID0gdGhpcztcblxuXHRcdFx0dmFyIG1lbnUgPSB0aGlzLnJlbmRlck1lbnUob3B0aW9ucywgdmFsdWVBcnJheSwgZm9jdXNlZE9wdGlvbik7XG5cdFx0XHRpZiAoIW1lbnUpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0eyByZWY6IGZ1bmN0aW9uIHJlZihfcmVmNSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzOC5tZW51Q29udGFpbmVyID0gX3JlZjU7XG5cdFx0XHRcdFx0fSwgY2xhc3NOYW1lOiAnU2VsZWN0LW1lbnUtb3V0ZXInLCBzdHlsZTogdGhpcy5wcm9wcy5tZW51Q29udGFpbmVyU3R5bGUgfSxcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdTZWxlY3QtbWVudScsXG5cdFx0XHRcdFx0XHRpZDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWxpc3QnLFxuXHRcdFx0XHRcdFx0b25Nb3VzZURvd246IHRoaXMuaGFuZGxlTW91c2VEb3duT25NZW51LFxuXHRcdFx0XHRcdFx0b25TY3JvbGw6IHRoaXMuaGFuZGxlTWVudVNjcm9sbCxcblx0XHRcdFx0XHRcdHJlZjogZnVuY3Rpb24gcmVmKF9yZWY0KSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczgubWVudSA9IF9yZWY0O1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHJvbGU6ICdsaXN0Ym94Jyxcblx0XHRcdFx0XHRcdHN0eWxlOiB0aGlzLnByb3BzLm1lbnVTdHlsZSxcblx0XHRcdFx0XHRcdHRhYkluZGV4OiAtMVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bWVudVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHZhciBfdGhpczkgPSB0aGlzO1xuXG5cdFx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHRcdHZhciBvcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnMgPSB0aGlzLmZpbHRlck9wdGlvbnModGhpcy5wcm9wcy5tdWx0aSAmJiB0aGlzLnByb3BzLnJlbW92ZVNlbGVjdGVkID8gdmFsdWVBcnJheSA6IG51bGwpO1xuXHRcdFx0dmFyIGlzT3BlbiA9IHRoaXMuc3RhdGUuaXNPcGVuO1xuXHRcdFx0aWYgKHRoaXMucHJvcHMubXVsdGkgJiYgIW9wdGlvbnMubGVuZ3RoICYmIHZhbHVlQXJyYXkubGVuZ3RoICYmICF0aGlzLnN0YXRlLmlucHV0VmFsdWUpIGlzT3BlbiA9IGZhbHNlO1xuXHRcdFx0dmFyIGZvY3VzZWRPcHRpb25JbmRleCA9IHRoaXMuZ2V0Rm9jdXNhYmxlT3B0aW9uSW5kZXgodmFsdWVBcnJheVswXSk7XG5cblx0XHRcdHZhciBmb2N1c2VkT3B0aW9uID0gbnVsbDtcblx0XHRcdGlmIChmb2N1c2VkT3B0aW9uSW5kZXggIT09IG51bGwpIHtcblx0XHRcdFx0Zm9jdXNlZE9wdGlvbiA9IHRoaXMuX2ZvY3VzZWRPcHRpb24gPSBvcHRpb25zW2ZvY3VzZWRPcHRpb25JbmRleF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uID0gdGhpcy5fZm9jdXNlZE9wdGlvbiA9IG51bGw7XG5cdFx0XHR9XG5cdFx0XHR2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygnU2VsZWN0JywgdGhpcy5wcm9wcy5jbGFzc05hbWUsIHtcblx0XHRcdFx0J2hhcy12YWx1ZSc6IHZhbHVlQXJyYXkubGVuZ3RoLFxuXHRcdFx0XHQnaXMtY2xlYXJhYmxlJzogdGhpcy5wcm9wcy5jbGVhcmFibGUsXG5cdFx0XHRcdCdpcy1kaXNhYmxlZCc6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG5cdFx0XHRcdCdpcy1mb2N1c2VkJzogdGhpcy5zdGF0ZS5pc0ZvY3VzZWQsXG5cdFx0XHRcdCdpcy1sb2FkaW5nJzogdGhpcy5wcm9wcy5pc0xvYWRpbmcsXG5cdFx0XHRcdCdpcy1vcGVuJzogaXNPcGVuLFxuXHRcdFx0XHQnaXMtcHNldWRvLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmlzUHNldWRvRm9jdXNlZCxcblx0XHRcdFx0J2lzLXNlYXJjaGFibGUnOiB0aGlzLnByb3BzLnNlYXJjaGFibGUsXG5cdFx0XHRcdCdTZWxlY3QtLW11bHRpJzogdGhpcy5wcm9wcy5tdWx0aSxcblx0XHRcdFx0J1NlbGVjdC0tcnRsJzogdGhpcy5wcm9wcy5ydGwsXG5cdFx0XHRcdCdTZWxlY3QtLXNpbmdsZSc6ICF0aGlzLnByb3BzLm11bHRpXG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIHJlbW92ZU1lc3NhZ2UgPSBudWxsO1xuXHRcdFx0aWYgKHRoaXMucHJvcHMubXVsdGkgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgdmFsdWVBcnJheS5sZW5ndGggJiYgIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAmJiB0aGlzLnN0YXRlLmlzRm9jdXNlZCAmJiB0aGlzLnByb3BzLmJhY2tzcGFjZVJlbW92ZXMpIHtcblx0XHRcdFx0cmVtb3ZlTWVzc2FnZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0J3NwYW4nLFxuXHRcdFx0XHRcdHsgaWQ6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1iYWNrc3BhY2UtcmVtb3ZlLW1lc3NhZ2UnLCBjbGFzc05hbWU6ICdTZWxlY3QtYXJpYS1vbmx5JywgJ2FyaWEtbGl2ZSc6ICdhc3NlcnRpdmUnIH0sXG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5iYWNrc3BhY2VUb1JlbW92ZU1lc3NhZ2UucmVwbGFjZSgne2xhYmVsfScsIHZhbHVlQXJyYXlbdmFsdWVBcnJheS5sZW5ndGggLSAxXVt0aGlzLnByb3BzLmxhYmVsS2V5XSlcblx0XHRcdFx0KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHR7IHJlZjogZnVuY3Rpb24gcmVmKF9yZWY3KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM5LndyYXBwZXIgPSBfcmVmNztcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuXHRcdFx0XHRcdHN0eWxlOiB0aGlzLnByb3BzLndyYXBwZXJTdHlsZSB9LFxuXHRcdFx0XHR0aGlzLnJlbmRlckhpZGRlbkZpZWxkKHZhbHVlQXJyYXkpLFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdHsgcmVmOiBmdW5jdGlvbiByZWYoX3JlZjYpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzOS5jb250cm9sID0gX3JlZjY7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiAnU2VsZWN0LWNvbnRyb2wnLFxuXHRcdFx0XHRcdFx0b25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sXG5cdFx0XHRcdFx0XHRvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVNb3VzZURvd24sXG5cdFx0XHRcdFx0XHRvblRvdWNoRW5kOiB0aGlzLmhhbmRsZVRvdWNoRW5kLFxuXHRcdFx0XHRcdFx0b25Ub3VjaE1vdmU6IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLFxuXHRcdFx0XHRcdFx0b25Ub3VjaFN0YXJ0OiB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsXG5cdFx0XHRcdFx0XHRzdHlsZTogdGhpcy5wcm9wcy5zdHlsZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHRcdCdzcGFuJyxcblx0XHRcdFx0XHRcdHsgY2xhc3NOYW1lOiAnU2VsZWN0LW11bHRpLXZhbHVlLXdyYXBwZXInLCBpZDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJyB9LFxuXHRcdFx0XHRcdFx0dGhpcy5yZW5kZXJWYWx1ZSh2YWx1ZUFycmF5LCBpc09wZW4pLFxuXHRcdFx0XHRcdFx0dGhpcy5yZW5kZXJJbnB1dCh2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uSW5kZXgpXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRyZW1vdmVNZXNzYWdlLFxuXHRcdFx0XHRcdHRoaXMucmVuZGVyTG9hZGluZygpLFxuXHRcdFx0XHRcdHRoaXMucmVuZGVyQ2xlYXIoKSxcblx0XHRcdFx0XHR0aGlzLnJlbmRlckFycm93KClcblx0XHRcdFx0KSxcblx0XHRcdFx0aXNPcGVuID8gdGhpcy5yZW5kZXJPdXRlcihvcHRpb25zLCB2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uKSA6IG51bGxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XSk7XG5cdHJldHVybiBTZWxlY3Q7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cblNlbGVjdCQxLnByb3BUeXBlcyA9IHtcblx0J2FyaWEtZGVzY3JpYmVkYnknOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBodG1sIGlkKHMpIG9mIGVsZW1lbnQocykgdGhhdCBzaG91bGQgYmUgdXNlZCB0byBkZXNjcmliZSB0aGlzIGlucHV0IChmb3IgYXNzaXN0aXZlIHRlY2gpXG5cdCdhcmlhLWxhYmVsJzogUHJvcFR5cGVzLnN0cmluZywgLy8gYXJpYSBsYWJlbCAoZm9yIGFzc2lzdGl2ZSB0ZWNoKVxuXHQnYXJpYS1sYWJlbGxlZGJ5JzogUHJvcFR5cGVzLnN0cmluZywgLy8gaHRtbCBpZCBvZiBhbiBlbGVtZW50IHRoYXQgc2hvdWxkIGJlIHVzZWQgYXMgdGhlIGxhYmVsIChmb3IgYXNzaXN0aXZlIHRlY2gpXG5cdGFycm93UmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAvLyBjcmVhdGUgdGhlIGRyb3AtZG93biBjYXJldCBlbGVtZW50XG5cdGF1dG9CbHVyOiBQcm9wVHlwZXMuYm9vbCwgLy8gYXV0b21hdGljYWxseSBibHVyIHRoZSBjb21wb25lbnQgd2hlbiBhbiBvcHRpb24gaXMgc2VsZWN0ZWRcblx0YXV0b0ZvY3VzOiBQcm9wVHlwZXMuYm9vbCwgLy8gYXV0b2ZvY3VzIHRoZSBjb21wb25lbnQgb24gbW91bnRcblx0YXV0b2ZvY3VzOiBQcm9wVHlwZXMuYm9vbCwgLy8gZGVwcmVjYXRlZDsgdXNlIGF1dG9Gb2N1cyBpbnN0ZWFkXG5cdGF1dG9zaXplOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciB0byBlbmFibGUgYXV0b3NpemluZyBvciBub3Rcblx0YmFja3NwYWNlUmVtb3ZlczogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgYmFja3NwYWNlIHJlbW92ZXMgYW4gaXRlbSBpZiB0aGVyZSBpcyBubyB0ZXh0IGlucHV0XG5cdGJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZywgLy8gbWVzc2FnZSB0byB1c2UgZm9yIHNjcmVlbnJlYWRlcnMgdG8gcHJlc3MgYmFja3NwYWNlIHRvIHJlbW92ZSB0aGUgY3VycmVudCBpdGVtIC0ge2xhYmVsfSBpcyByZXBsYWNlZCB3aXRoIHRoZSBpdGVtIGxhYmVsXG5cdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZywgLy8gY2xhc3NOYW1lIGZvciB0aGUgb3V0ZXIgZWxlbWVudFxuXHRjbGVhckFsbFRleHQ6IHN0cmluZ09yTm9kZSwgLy8gdGl0bGUgZm9yIHRoZSBcImNsZWFyXCIgY29udHJvbCB3aGVuIG11bHRpOiB0cnVlXG5cdGNsZWFyUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAvLyBjcmVhdGUgY2xlYXJhYmxlIHggZWxlbWVudFxuXHRjbGVhclZhbHVlVGV4dDogc3RyaW5nT3JOb2RlLCAvLyB0aXRsZSBmb3IgdGhlIFwiY2xlYXJcIiBjb250cm9sXG5cdGNsZWFyYWJsZTogUHJvcFR5cGVzLmJvb2wsIC8vIHNob3VsZCBpdCBiZSBwb3NzaWJsZSB0byByZXNldCB2YWx1ZVxuXHRjbG9zZU9uU2VsZWN0OiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciB0byBjbG9zZSB0aGUgbWVudSB3aGVuIGEgdmFsdWUgaXMgc2VsZWN0ZWRcblx0ZGVsZXRlUmVtb3ZlczogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgZGVsZXRlIHJlbW92ZXMgYW4gaXRlbSBpZiB0aGVyZSBpcyBubyB0ZXh0IGlucHV0XG5cdGRlbGltaXRlcjogUHJvcFR5cGVzLnN0cmluZywgLy8gZGVsaW1pdGVyIHRvIHVzZSB0byBqb2luIG11bHRpcGxlIHZhbHVlcyBmb3IgdGhlIGhpZGRlbiBmaWVsZCB2YWx1ZVxuXHRkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgdGhlIFNlbGVjdCBpcyBkaXNhYmxlZCBvciBub3Rcblx0ZXNjYXBlQ2xlYXJzVmFsdWU6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIGVzY2FwZSBjbGVhcnMgdGhlIHZhbHVlIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkXG5cdGZpbHRlck9wdGlvbjogUHJvcFR5cGVzLmZ1bmMsIC8vIG1ldGhvZCB0byBmaWx0ZXIgYSBzaW5nbGUgb3B0aW9uIChvcHRpb24sIGZpbHRlclN0cmluZylcblx0ZmlsdGVyT3B0aW9uczogUHJvcFR5cGVzLmFueSwgLy8gYm9vbGVhbiB0byBlbmFibGUgZGVmYXVsdCBmaWx0ZXJpbmcgb3IgZnVuY3Rpb24gdG8gZmlsdGVyIHRoZSBvcHRpb25zIGFycmF5IChbb3B0aW9uc10sIGZpbHRlclN0cmluZywgW3ZhbHVlc10pXG5cdGlkOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBodG1sIGlkIHRvIHNldCBvbiB0aGUgaW5wdXQgZWxlbWVudCBmb3IgYWNjZXNzaWJpbGl0eSBvciB0ZXN0c1xuXHRpZ25vcmVBY2NlbnRzOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciB0byBzdHJpcCBkaWFjcml0aWNzIHdoZW4gZmlsdGVyaW5nXG5cdGlnbm9yZUNhc2U6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIHBlcmZvcm0gY2FzZS1pbnNlbnNpdGl2ZSBmaWx0ZXJpbmdcblx0aW5wdXRQcm9wczogUHJvcFR5cGVzLm9iamVjdCwgLy8gY3VzdG9tIGF0dHJpYnV0ZXMgZm9yIHRoZSBJbnB1dFxuXHRpbnB1dFJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYywgLy8gcmV0dXJucyBhIGN1c3RvbSBpbnB1dCBjb21wb25lbnRcblx0aW5zdGFuY2VJZDogUHJvcFR5cGVzLnN0cmluZywgLy8gc2V0IHRoZSBjb21wb25lbnRzIGluc3RhbmNlSWRcblx0aXNMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciB0aGUgU2VsZWN0IGlzIGxvYWRpbmcgZXh0ZXJuYWxseSBvciBub3QgKHN1Y2ggYXMgb3B0aW9ucyBiZWluZyBsb2FkZWQpXG5cdGpvaW5WYWx1ZXM6IFByb3BUeXBlcy5ib29sLCAvLyBqb2lucyBtdWx0aXBsZSB2YWx1ZXMgaW50byBhIHNpbmdsZSBmb3JtIGZpZWxkIHdpdGggdGhlIGRlbGltaXRlciAobGVnYWN5IG1vZGUpXG5cdGxhYmVsS2V5OiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBwYXRoIG9mIHRoZSBsYWJlbCB2YWx1ZSBpbiBvcHRpb24gb2JqZWN0c1xuXHRtYXRjaFBvczogUHJvcFR5cGVzLnN0cmluZywgLy8gKGFueXxzdGFydCkgbWF0Y2ggdGhlIHN0YXJ0IG9yIGVudGlyZSBzdHJpbmcgd2hlbiBmaWx0ZXJpbmdcblx0bWF0Y2hQcm9wOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyAoYW55fGxhYmVsfHZhbHVlKSB3aGljaCBvcHRpb24gcHJvcGVydHkgdG8gZmlsdGVyIG9uXG5cdG1lbnVCdWZmZXI6IFByb3BUeXBlcy5udW1iZXIsIC8vIG9wdGlvbmFsIGJ1ZmZlciAoaW4gcHgpIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnQgYW5kIHRoZSBib3R0b20gb2YgdGhlIG1lbnVcblx0bWVudUNvbnRhaW5lclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LCAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgbWVudSBjb250YWluZXJcblx0bWVudVJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYywgLy8gcmVuZGVycyBhIGN1c3RvbSBtZW51IHdpdGggb3B0aW9uc1xuXHRtZW51U3R5bGU6IFByb3BUeXBlcy5vYmplY3QsIC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBtZW51XG5cdG11bHRpOiBQcm9wVHlwZXMuYm9vbCwgLy8gbXVsdGktdmFsdWUgaW5wdXRcblx0bmFtZTogUHJvcFR5cGVzLnN0cmluZywgLy8gZ2VuZXJhdGVzIGEgaGlkZGVuIDxpbnB1dCAvPiB0YWcgd2l0aCB0aGlzIGZpZWxkIG5hbWUgZm9yIGh0bWwgZm9ybXNcblx0bm9SZXN1bHRzVGV4dDogc3RyaW5nT3JOb2RlLCAvLyBwbGFjZWhvbGRlciBkaXNwbGF5ZWQgd2hlbiB0aGVyZSBhcmUgbm8gbWF0Y2hpbmcgc2VhcmNoIHJlc3VsdHNcblx0b25CbHVyOiBQcm9wVHlwZXMuZnVuYywgLy8gb25CbHVyIGhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge31cblx0b25CbHVyUmVzZXRzSW5wdXQ6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIGlucHV0IGlzIGNsZWFyZWQgb24gYmx1clxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsIC8vIG9uQ2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge31cblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsIC8vIGZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkXG5cdG9uQ2xvc2VSZXNldHNJbnB1dDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgaW5wdXQgaXMgY2xlYXJlZCB3aGVuIG1lbnUgaXMgY2xvc2VkIHRocm91Z2ggdGhlIGFycm93XG5cdG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLCAvLyBvbkZvY3VzIGhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge31cblx0b25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsIC8vIG9uSW5wdXRDaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKGlucHV0VmFsdWUpIHt9XG5cdG9uSW5wdXRLZXlEb3duOiBQcm9wVHlwZXMuZnVuYywgLy8gaW5wdXQga2V5RG93biBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdG9uTWVudVNjcm9sbFRvQm90dG9tOiBQcm9wVHlwZXMuZnVuYywgLy8gZmlyZXMgd2hlbiB0aGUgbWVudSBpcyBzY3JvbGxlZCB0byB0aGUgYm90dG9tOyBjYW4gYmUgdXNlZCB0byBwYWdpbmF0ZSBvcHRpb25zXG5cdG9uT3BlbjogUHJvcFR5cGVzLmZ1bmMsIC8vIGZpcmVzIHdoZW4gdGhlIG1lbnUgaXMgb3BlbmVkXG5cdG9uU2VsZWN0UmVzZXRzSW5wdXQ6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIGlucHV0IGlzIGNsZWFyZWQgb24gc2VsZWN0ICh3b3JrcyBvbmx5IGZvciBtdWx0aXNlbGVjdClcblx0b25WYWx1ZUNsaWNrOiBQcm9wVHlwZXMuZnVuYywgLy8gb25DbGljayBoYW5kbGVyIGZvciB2YWx1ZSBsYWJlbHM6IGZ1bmN0aW9uICh2YWx1ZSwgZXZlbnQpIHt9XG5cdG9wZW5PbkNsaWNrOiBQcm9wVHlwZXMuYm9vbCwgLy8gYm9vbGVhbiB0byBjb250cm9sIG9wZW5pbmcgdGhlIG1lbnUgd2hlbiB0aGUgY29udHJvbCBpcyBjbGlja2VkXG5cdG9wZW5PbkZvY3VzOiBQcm9wVHlwZXMuYm9vbCwgLy8gYWx3YXlzIG9wZW4gb3B0aW9ucyBtZW51IG9uIGZvY3VzXG5cdG9wdGlvbkNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZywgLy8gYWRkaXRpb25hbCBjbGFzcyhlcykgdG8gYXBwbHkgdG8gdGhlIDxPcHRpb24gLz4gZWxlbWVudHNcblx0b3B0aW9uQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYywgLy8gb3B0aW9uIGNvbXBvbmVudCB0byByZW5kZXIgaW4gZHJvcGRvd25cblx0b3B0aW9uUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAvLyBvcHRpb25SZW5kZXJlcjogZnVuY3Rpb24gKG9wdGlvbikge31cblx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5LCAvLyBhcnJheSBvZiBvcHRpb25zXG5cdHBhZ2VTaXplOiBQcm9wVHlwZXMubnVtYmVyLCAvLyBudW1iZXIgb2YgZW50cmllcyB0byBwYWdlIHdoZW4gdXNpbmcgcGFnZSB1cC9kb3duIGtleXNcblx0cGxhY2Vob2xkZXI6IHN0cmluZ09yTm9kZSwgLy8gZmllbGQgcGxhY2Vob2xkZXIsIGRpc3BsYXllZCB3aGVuIHRoZXJlJ3Mgbm8gdmFsdWVcblx0cmVtb3ZlU2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRoZSBzZWxlY3RlZCBvcHRpb24gaXMgcmVtb3ZlZCBmcm9tIHRoZSBkcm9wZG93biBvbiBtdWx0aSBzZWxlY3RzXG5cdHJlcXVpcmVkOiBQcm9wVHlwZXMuYm9vbCwgLy8gYXBwbGllcyBIVE1MNSByZXF1aXJlZCBhdHRyaWJ1dGUgd2hlbiBuZWVkZWRcblx0cmVzZXRWYWx1ZTogUHJvcFR5cGVzLmFueSwgLy8gdmFsdWUgdG8gdXNlIHdoZW4geW91IGNsZWFyIHRoZSBjb250cm9sXG5cdHJ0bDogUHJvcFR5cGVzLmJvb2wsIC8vIHNldCB0byB0cnVlIGluIG9yZGVyIHRvIHVzZSByZWFjdC1zZWxlY3QgaW4gcmlnaHQtdG8tbGVmdCBkaXJlY3Rpb25cblx0c2Nyb2xsTWVudUludG9WaWV3OiBQcm9wVHlwZXMuYm9vbCwgLy8gYm9vbGVhbiB0byBlbmFibGUgdGhlIHZpZXdwb3J0IHRvIHNoaWZ0IHNvIHRoYXQgdGhlIGZ1bGwgbWVudSBmdWxseSB2aXNpYmxlIHdoZW4gZW5nYWdlZFxuXHRzZWFyY2hhYmxlOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciB0byBlbmFibGUgc2VhcmNoaW5nIGZlYXR1cmUgb3Igbm90XG5cdHNpbXBsZVZhbHVlOiBQcm9wVHlwZXMuYm9vbCwgLy8gcGFzcyB0aGUgdmFsdWUgdG8gb25DaGFuZ2UgYXMgYSBzaW1wbGUgdmFsdWUgKGxlZ2FjeSBwcmUgMS4wIG1vZGUpLCBkZWZhdWx0cyB0byBmYWxzZVxuXHRzdHlsZTogUHJvcFR5cGVzLm9iamVjdCwgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIGNvbnRyb2xcblx0dGFiSW5kZXg6IHN0cmluZ09yTnVtYmVyLCAvLyBvcHRpb25hbCB0YWIgaW5kZXggb2YgdGhlIGNvbnRyb2xcblx0dGFiU2VsZWN0c1ZhbHVlOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciB0byB0cmVhdCB0YWJiaW5nIG91dCB3aGlsZSBmb2N1c2VkIHRvIGJlIHZhbHVlIHNlbGVjdGlvblxuXHR0cmltRmlsdGVyOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciB0byB0cmltIHdoaXRlc3BhY2UgYXJvdW5kIGZpbHRlciB2YWx1ZVxuXHR2YWx1ZTogUHJvcFR5cGVzLmFueSwgLy8gaW5pdGlhbCBmaWVsZCB2YWx1ZVxuXHR2YWx1ZUNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsIC8vIHZhbHVlIGNvbXBvbmVudCB0byByZW5kZXJcblx0dmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsIC8vIHBhdGggb2YgdGhlIGxhYmVsIHZhbHVlIGluIG9wdGlvbiBvYmplY3RzXG5cdHZhbHVlUmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAvLyB2YWx1ZVJlbmRlcmVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxuXHR3cmFwcGVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3QgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIGNvbXBvbmVudCB3cmFwcGVyXG59O1xuXG5TZWxlY3QkMS5kZWZhdWx0UHJvcHMgPSB7XG5cdGFycm93UmVuZGVyZXI6IGFycm93UmVuZGVyZXIsXG5cdGF1dG9zaXplOiB0cnVlLFxuXHRiYWNrc3BhY2VSZW1vdmVzOiB0cnVlLFxuXHRiYWNrc3BhY2VUb1JlbW92ZU1lc3NhZ2U6ICdQcmVzcyBiYWNrc3BhY2UgdG8gcmVtb3ZlIHtsYWJlbH0nLFxuXHRjbGVhcmFibGU6IHRydWUsXG5cdGNsZWFyQWxsVGV4dDogJ0NsZWFyIGFsbCcsXG5cdGNsZWFyUmVuZGVyZXI6IGNsZWFyUmVuZGVyZXIsXG5cdGNsZWFyVmFsdWVUZXh0OiAnQ2xlYXIgdmFsdWUnLFxuXHRjbG9zZU9uU2VsZWN0OiB0cnVlLFxuXHRkZWxldGVSZW1vdmVzOiB0cnVlLFxuXHRkZWxpbWl0ZXI6ICcsJyxcblx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRlc2NhcGVDbGVhcnNWYWx1ZTogdHJ1ZSxcblx0ZmlsdGVyT3B0aW9uczogZmlsdGVyT3B0aW9ucyxcblx0aWdub3JlQWNjZW50czogdHJ1ZSxcblx0aWdub3JlQ2FzZTogdHJ1ZSxcblx0aW5wdXRQcm9wczoge30sXG5cdGlzTG9hZGluZzogZmFsc2UsXG5cdGpvaW5WYWx1ZXM6IGZhbHNlLFxuXHRsYWJlbEtleTogJ2xhYmVsJyxcblx0bWF0Y2hQb3M6ICdhbnknLFxuXHRtYXRjaFByb3A6ICdhbnknLFxuXHRtZW51QnVmZmVyOiAwLFxuXHRtZW51UmVuZGVyZXI6IG1lbnVSZW5kZXJlcixcblx0bXVsdGk6IGZhbHNlLFxuXHRub1Jlc3VsdHNUZXh0OiAnTm8gcmVzdWx0cyBmb3VuZCcsXG5cdG9uQmx1clJlc2V0c0lucHV0OiB0cnVlLFxuXHRvbkNsb3NlUmVzZXRzSW5wdXQ6IHRydWUsXG5cdG9uU2VsZWN0UmVzZXRzSW5wdXQ6IHRydWUsXG5cdG9wZW5PbkNsaWNrOiB0cnVlLFxuXHRvcHRpb25Db21wb25lbnQ6IE9wdGlvbixcblx0cGFnZVNpemU6IDUsXG5cdHBsYWNlaG9sZGVyOiAnU2VsZWN0Li4uJyxcblx0cmVtb3ZlU2VsZWN0ZWQ6IHRydWUsXG5cdHJlcXVpcmVkOiBmYWxzZSxcblx0cnRsOiBmYWxzZSxcblx0c2Nyb2xsTWVudUludG9WaWV3OiB0cnVlLFxuXHRzZWFyY2hhYmxlOiB0cnVlLFxuXHRzaW1wbGVWYWx1ZTogZmFsc2UsXG5cdHRhYlNlbGVjdHNWYWx1ZTogdHJ1ZSxcblx0dHJpbUZpbHRlcjogdHJ1ZSxcblx0dmFsdWVDb21wb25lbnQ6IFZhbHVlLFxuXHR2YWx1ZUtleTogJ3ZhbHVlJ1xufTtcblxudmFyIHByb3BUeXBlcyA9IHtcblx0YXV0b2xvYWQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsIC8vIGF1dG9tYXRpY2FsbHkgY2FsbCB0aGUgYGxvYWRPcHRpb25zYCBwcm9wIG9uLW1vdW50OyBkZWZhdWx0cyB0byB0cnVlXG5cdGNhY2hlOiBQcm9wVHlwZXMuYW55LCAvLyBvYmplY3QgdG8gdXNlIHRvIGNhY2hlIHJlc3VsdHM7IHNldCB0byBudWxsL2ZhbHNlIHRvIGRpc2FibGUgY2FjaGluZ1xuXHRjaGlsZHJlbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCwgLy8gQ2hpbGQgZnVuY3Rpb24gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoZSBpbm5lciBTZWxlY3QgY29tcG9uZW50OyAocHJvcHM6IE9iamVjdCk6IFByb3BUeXBlcy5lbGVtZW50XG5cdGlnbm9yZUFjY2VudHM6IFByb3BUeXBlcy5ib29sLCAvLyBzdHJpcCBkaWFjcml0aWNzIHdoZW4gZmlsdGVyaW5nOyBkZWZhdWx0cyB0byB0cnVlXG5cdGlnbm9yZUNhc2U6IFByb3BUeXBlcy5ib29sLCAvLyBwZXJmb3JtIGNhc2UtaW5zZW5zaXRpdmUgZmlsdGVyaW5nOyBkZWZhdWx0cyB0byB0cnVlXG5cdGxvYWRPcHRpb25zOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLCAvLyBjYWxsYmFjayB0byBsb2FkIG9wdGlvbnMgYXN5bmNocm9ub3VzbHk7IChpbnB1dFZhbHVlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6ID9Qcm9taXNlXG5cdGxvYWRpbmdQbGFjZWhvbGRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbLy8gcmVwbGFjZXMgdGhlIHBsYWNlaG9sZGVyIHdoaWxlIG9wdGlvbnMgYXJlIGxvYWRpbmdcblx0UHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKSxcblx0bXVsdGk6IFByb3BUeXBlcy5ib29sLCAvLyBtdWx0aS12YWx1ZSBpbnB1dFxuXHRub1Jlc3VsdHNUZXh0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFsvLyBmaWVsZCBub1Jlc3VsdHNUZXh0LCBkaXNwbGF5ZWQgd2hlbiBubyBvcHRpb25zIGNvbWUgYmFjayBmcm9tIHRoZSBzZXJ2ZXJcblx0UHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKSxcblx0b25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLCAvLyBvbkNoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAobmV3VmFsdWUpIHt9XG5cdG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLCAvLyBvcHRpb25hbCBmb3Iga2VlcGluZyB0cmFjayBvZiB3aGF0IGlzIGJlaW5nIHR5cGVkXG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLCAvLyBhcnJheSBvZiBvcHRpb25zXG5cdHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFsvLyBmaWVsZCBwbGFjZWhvbGRlciwgZGlzcGxheWVkIHdoZW4gdGhlcmUncyBubyB2YWx1ZSAoc2hhcmVkIHdpdGggU2VsZWN0KVxuXHRQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuXHRzZWFyY2hQcm9tcHRUZXh0OiBQcm9wVHlwZXMub25lT2ZUeXBlKFsvLyBsYWJlbCB0byBwcm9tcHQgZm9yIHNlYXJjaCBpbnB1dFxuXHRQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuXHR2YWx1ZTogUHJvcFR5cGVzLmFueSAvLyBpbml0aWFsIGZpZWxkIHZhbHVlXG59O1xuXG52YXIgZGVmYXVsdENhY2hlID0ge307XG5cbnZhciBkZWZhdWx0Q2hpbGRyZW4gPSBmdW5jdGlvbiBkZWZhdWx0Q2hpbGRyZW4ocHJvcHMpIHtcblx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0JDEsIHByb3BzKTtcbn07XG5cbnZhciBkZWZhdWx0UHJvcHMgPSB7XG5cdGF1dG9sb2FkOiB0cnVlLFxuXHRjYWNoZTogZGVmYXVsdENhY2hlLFxuXHRjaGlsZHJlbjogZGVmYXVsdENoaWxkcmVuLFxuXHRpZ25vcmVBY2NlbnRzOiB0cnVlLFxuXHRpZ25vcmVDYXNlOiB0cnVlLFxuXHRsb2FkaW5nUGxhY2Vob2xkZXI6ICdMb2FkaW5nLi4uJyxcblx0b3B0aW9uczogW10sXG5cdHNlYXJjaFByb21wdFRleHQ6ICdUeXBlIHRvIHNlYXJjaCdcbn07XG5cbnZhciBBc3luYyA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG5cdGluaGVyaXRzKEFzeW5jLCBfQ29tcG9uZW50KTtcblxuXHRmdW5jdGlvbiBBc3luYyhwcm9wcywgY29udGV4dCkge1xuXHRcdGNsYXNzQ2FsbENoZWNrKHRoaXMsIEFzeW5jKTtcblxuXHRcdHZhciBfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEFzeW5jLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXN5bmMpKS5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cblx0XHRfdGhpcy5fY2FjaGUgPSBwcm9wcy5jYWNoZSA9PT0gZGVmYXVsdENhY2hlID8ge30gOiBwcm9wcy5jYWNoZTtcblxuXHRcdF90aGlzLnN0YXRlID0ge1xuXHRcdFx0aW5wdXRWYWx1ZTogJycsXG5cdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0b3B0aW9uczogcHJvcHMub3B0aW9uc1xuXHRcdH07XG5cblx0XHRfdGhpcy5vbklucHV0Q2hhbmdlID0gX3RoaXMub25JbnB1dENoYW5nZS5iaW5kKF90aGlzKTtcblx0XHRyZXR1cm4gX3RoaXM7XG5cdH1cblxuXHRjcmVhdGVDbGFzcyhBc3luYywgW3tcblx0XHRrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdFx0dmFyIGF1dG9sb2FkID0gdGhpcy5wcm9wcy5hdXRvbG9hZDtcblxuXG5cdFx0XHRpZiAoYXV0b2xvYWQpIHtcblx0XHRcdFx0dGhpcy5sb2FkT3B0aW9ucygnJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG5cdFx0XHRpZiAobmV4dFByb3BzLm9wdGlvbnMgIT09IHRoaXMucHJvcHMub3B0aW9ucykge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRvcHRpb25zOiBuZXh0UHJvcHMub3B0aW9uc1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdFx0dGhpcy5fY2FsbGJhY2sgPSBudWxsO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2xvYWRPcHRpb25zJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gbG9hZE9wdGlvbnMoaW5wdXRWYWx1ZSkge1xuXHRcdFx0dmFyIF90aGlzMiA9IHRoaXM7XG5cblx0XHRcdHZhciBsb2FkT3B0aW9ucyA9IHRoaXMucHJvcHMubG9hZE9wdGlvbnM7XG5cblx0XHRcdHZhciBjYWNoZSA9IHRoaXMuX2NhY2hlO1xuXG5cdFx0XHRpZiAoY2FjaGUgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNhY2hlLCBpbnB1dFZhbHVlKSkge1xuXHRcdFx0XHR0aGlzLl9jYWxsYmFjayA9IG51bGw7XG5cblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0aXNMb2FkaW5nOiBmYWxzZSxcblx0XHRcdFx0XHRvcHRpb25zOiBjYWNoZVtpbnB1dFZhbHVlXVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIGNhbGxiYWNrKGVycm9yLCBkYXRhKSB7XG5cdFx0XHRcdHZhciBvcHRpb25zID0gZGF0YSAmJiBkYXRhLm9wdGlvbnMgfHwgW107XG5cblx0XHRcdFx0aWYgKGNhY2hlKSB7XG5cdFx0XHRcdFx0Y2FjaGVbaW5wdXRWYWx1ZV0gPSBvcHRpb25zO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGNhbGxiYWNrID09PSBfdGhpczIuX2NhbGxiYWNrKSB7XG5cdFx0XHRcdFx0X3RoaXMyLl9jYWxsYmFjayA9IG51bGw7XG5cblx0XHRcdFx0XHRfdGhpczIuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0aXNMb2FkaW5nOiBmYWxzZSxcblx0XHRcdFx0XHRcdG9wdGlvbnM6IG9wdGlvbnNcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gSWdub3JlIGFsbCBidXQgdGhlIG1vc3QgcmVjZW50IHJlcXVlc3Rcblx0XHRcdHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cblx0XHRcdHZhciBwcm9taXNlID0gbG9hZE9wdGlvbnMoaW5wdXRWYWx1ZSwgY2FsbGJhY2spO1xuXHRcdFx0aWYgKHByb21pc2UpIHtcblx0XHRcdFx0cHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuXHRcdFx0XHR9LCBmdW5jdGlvbiAoZXJyb3IpIHtcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX2NhbGxiYWNrICYmICF0aGlzLnN0YXRlLmlzTG9hZGluZykge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpc0xvYWRpbmc6IHRydWVcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnb25JbnB1dENoYW5nZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG9uSW5wdXRDaGFuZ2UoaW5wdXRWYWx1ZSkge1xuXHRcdFx0dmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG5cdFx0XHQgICAgaWdub3JlQWNjZW50cyA9IF9wcm9wcy5pZ25vcmVBY2NlbnRzLFxuXHRcdFx0ICAgIGlnbm9yZUNhc2UgPSBfcHJvcHMuaWdub3JlQ2FzZSxcblx0XHRcdCAgICBvbklucHV0Q2hhbmdlID0gX3Byb3BzLm9uSW5wdXRDaGFuZ2U7XG5cblx0XHRcdHZhciBuZXdJbnB1dFZhbHVlID0gaW5wdXRWYWx1ZTtcblxuXHRcdFx0aWYgKG9uSW5wdXRDaGFuZ2UpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gb25JbnB1dENoYW5nZShuZXdJbnB1dFZhbHVlKTtcblx0XHRcdFx0Ly8gTm90ZTogIT0gdXNlZCBkZWxpYmVyYXRlbHkgaGVyZSB0byBjYXRjaCB1bmRlZmluZWQgYW5kIG51bGxcblx0XHRcdFx0aWYgKHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRuZXdJbnB1dFZhbHVlID0gJycgKyB2YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgdHJhbnNmb3JtZWRJbnB1dFZhbHVlID0gbmV3SW5wdXRWYWx1ZTtcblxuXHRcdFx0aWYgKGlnbm9yZUFjY2VudHMpIHtcblx0XHRcdFx0dHJhbnNmb3JtZWRJbnB1dFZhbHVlID0gc3RyaXBEaWFjcml0aWNzKHRyYW5zZm9ybWVkSW5wdXRWYWx1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpZ25vcmVDYXNlKSB7XG5cdFx0XHRcdHRyYW5zZm9ybWVkSW5wdXRWYWx1ZSA9IHRyYW5zZm9ybWVkSW5wdXRWYWx1ZS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldFN0YXRlKHsgaW5wdXRWYWx1ZTogbmV3SW5wdXRWYWx1ZSB9KTtcblx0XHRcdHRoaXMubG9hZE9wdGlvbnModHJhbnNmb3JtZWRJbnB1dFZhbHVlKTtcblxuXHRcdFx0Ly8gUmV0dXJuIG5ldyBpbnB1dCB2YWx1ZSwgYnV0IHdpdGhvdXQgYXBwbHlpbmcgdG9Mb3dlckNhc2UoKSB0byBhdm9pZCBtb2RpZnlpbmcgdGhlIHVzZXIncyB2aWV3IGNhc2Ugb2YgdGhlIGlucHV0IHdoaWxlIHR5cGluZy5cblx0XHRcdHJldHVybiBuZXdJbnB1dFZhbHVlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ25vUmVzdWx0c1RleHQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBub1Jlc3VsdHNUZXh0KCkge1xuXHRcdFx0dmFyIF9wcm9wczIgPSB0aGlzLnByb3BzLFxuXHRcdFx0ICAgIGxvYWRpbmdQbGFjZWhvbGRlciA9IF9wcm9wczIubG9hZGluZ1BsYWNlaG9sZGVyLFxuXHRcdFx0ICAgIG5vUmVzdWx0c1RleHQgPSBfcHJvcHMyLm5vUmVzdWx0c1RleHQsXG5cdFx0XHQgICAgc2VhcmNoUHJvbXB0VGV4dCA9IF9wcm9wczIuc2VhcmNoUHJvbXB0VGV4dDtcblx0XHRcdHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlLFxuXHRcdFx0ICAgIGlucHV0VmFsdWUgPSBfc3RhdGUuaW5wdXRWYWx1ZSxcblx0XHRcdCAgICBpc0xvYWRpbmcgPSBfc3RhdGUuaXNMb2FkaW5nO1xuXG5cblx0XHRcdGlmIChpc0xvYWRpbmcpIHtcblx0XHRcdFx0cmV0dXJuIGxvYWRpbmdQbGFjZWhvbGRlcjtcblx0XHRcdH1cblx0XHRcdGlmIChpbnB1dFZhbHVlICYmIG5vUmVzdWx0c1RleHQpIHtcblx0XHRcdFx0cmV0dXJuIG5vUmVzdWx0c1RleHQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc2VhcmNoUHJvbXB0VGV4dDtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1cycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzKCkge1xuXHRcdFx0dGhpcy5zZWxlY3QuZm9jdXMoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR2YXIgX3RoaXMzID0gdGhpcztcblxuXHRcdFx0dmFyIF9wcm9wczMgPSB0aGlzLnByb3BzLFxuXHRcdFx0ICAgIGNoaWxkcmVuID0gX3Byb3BzMy5jaGlsZHJlbixcblx0XHRcdCAgICBsb2FkaW5nUGxhY2Vob2xkZXIgPSBfcHJvcHMzLmxvYWRpbmdQbGFjZWhvbGRlcixcblx0XHRcdCAgICBwbGFjZWhvbGRlciA9IF9wcm9wczMucGxhY2Vob2xkZXI7XG5cdFx0XHR2YXIgX3N0YXRlMiA9IHRoaXMuc3RhdGUsXG5cdFx0XHQgICAgaXNMb2FkaW5nID0gX3N0YXRlMi5pc0xvYWRpbmcsXG5cdFx0XHQgICAgb3B0aW9ucyA9IF9zdGF0ZTIub3B0aW9ucztcblxuXG5cdFx0XHR2YXIgcHJvcHMgPSB7XG5cdFx0XHRcdG5vUmVzdWx0c1RleHQ6IHRoaXMubm9SZXN1bHRzVGV4dCgpLFxuXHRcdFx0XHRwbGFjZWhvbGRlcjogaXNMb2FkaW5nID8gbG9hZGluZ1BsYWNlaG9sZGVyIDogcGxhY2Vob2xkZXIsXG5cdFx0XHRcdG9wdGlvbnM6IGlzTG9hZGluZyAmJiBsb2FkaW5nUGxhY2Vob2xkZXIgPyBbXSA6IG9wdGlvbnMsXG5cdFx0XHRcdHJlZjogZnVuY3Rpb24gcmVmKF9yZWYpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMzLnNlbGVjdCA9IF9yZWY7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHJldHVybiBjaGlsZHJlbihfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywgcHJvcHMsIHtcblx0XHRcdFx0aXNMb2FkaW5nOiBpc0xvYWRpbmcsXG5cdFx0XHRcdG9uSW5wdXRDaGFuZ2U6IHRoaXMub25JbnB1dENoYW5nZVxuXHRcdFx0fSkpO1xuXHRcdH1cblx0fV0pO1xuXHRyZXR1cm4gQXN5bmM7XG59KENvbXBvbmVudCk7XG5cbkFzeW5jLnByb3BUeXBlcyA9IHByb3BUeXBlcztcbkFzeW5jLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcblxudmFyIENyZWF0YWJsZVNlbGVjdCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG5cdGluaGVyaXRzKENyZWF0YWJsZVNlbGVjdCwgX1JlYWN0JENvbXBvbmVudCk7XG5cblx0ZnVuY3Rpb24gQ3JlYXRhYmxlU2VsZWN0KHByb3BzLCBjb250ZXh0KSB7XG5cdFx0Y2xhc3NDYWxsQ2hlY2sodGhpcywgQ3JlYXRhYmxlU2VsZWN0KTtcblxuXHRcdHZhciBfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKENyZWF0YWJsZVNlbGVjdC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKENyZWF0YWJsZVNlbGVjdCkpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuXHRcdF90aGlzLmZpbHRlck9wdGlvbnMgPSBfdGhpcy5maWx0ZXJPcHRpb25zLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLm1lbnVSZW5kZXJlciA9IF90aGlzLm1lbnVSZW5kZXJlci5iaW5kKF90aGlzKTtcblx0XHRfdGhpcy5vbklucHV0S2V5RG93biA9IF90aGlzLm9uSW5wdXRLZXlEb3duLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLm9uSW5wdXRDaGFuZ2UgPSBfdGhpcy5vbklucHV0Q2hhbmdlLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLm9uT3B0aW9uU2VsZWN0ID0gX3RoaXMub25PcHRpb25TZWxlY3QuYmluZChfdGhpcyk7XG5cdFx0cmV0dXJuIF90aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ2xhc3MoQ3JlYXRhYmxlU2VsZWN0LCBbe1xuXHRcdGtleTogJ2NyZWF0ZU5ld09wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZU5ld09wdGlvbigpIHtcblx0XHRcdHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuXHRcdFx0ICAgIGlzVmFsaWROZXdPcHRpb24gPSBfcHJvcHMuaXNWYWxpZE5ld09wdGlvbixcblx0XHRcdCAgICBuZXdPcHRpb25DcmVhdG9yID0gX3Byb3BzLm5ld09wdGlvbkNyZWF0b3IsXG5cdFx0XHQgICAgb25OZXdPcHRpb25DbGljayA9IF9wcm9wcy5vbk5ld09wdGlvbkNsaWNrLFxuXHRcdFx0ICAgIF9wcm9wcyRvcHRpb25zID0gX3Byb3BzLm9wdGlvbnMsXG5cdFx0XHQgICAgb3B0aW9ucyA9IF9wcm9wcyRvcHRpb25zID09PSB1bmRlZmluZWQgPyBbXSA6IF9wcm9wcyRvcHRpb25zO1xuXG5cblx0XHRcdGlmIChpc1ZhbGlkTmV3T3B0aW9uKHsgbGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSB9KSkge1xuXHRcdFx0XHR2YXIgb3B0aW9uID0gbmV3T3B0aW9uQ3JlYXRvcih7IGxhYmVsOiB0aGlzLmlucHV0VmFsdWUsIGxhYmVsS2V5OiB0aGlzLmxhYmVsS2V5LCB2YWx1ZUtleTogdGhpcy52YWx1ZUtleSB9KTtcblx0XHRcdFx0dmFyIF9pc09wdGlvblVuaXF1ZSA9IHRoaXMuaXNPcHRpb25VbmlxdWUoeyBvcHRpb246IG9wdGlvbiwgb3B0aW9uczogb3B0aW9ucyB9KTtcblxuXHRcdFx0XHQvLyBEb24ndCBhZGQgdGhlIHNhbWUgb3B0aW9uIHR3aWNlLlxuXHRcdFx0XHRpZiAoX2lzT3B0aW9uVW5pcXVlKSB7XG5cdFx0XHRcdFx0aWYgKG9uTmV3T3B0aW9uQ2xpY2spIHtcblx0XHRcdFx0XHRcdG9uTmV3T3B0aW9uQ2xpY2sob3B0aW9uKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0b3B0aW9ucy51bnNoaWZ0KG9wdGlvbik7XG5cblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0LnNlbGVjdFZhbHVlKG9wdGlvbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZmlsdGVyT3B0aW9ucycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZpbHRlck9wdGlvbnMkJDEoKSB7XG5cdFx0XHR2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHMsXG5cdFx0XHQgICAgZmlsdGVyT3B0aW9ucyQkMSA9IF9wcm9wczIuZmlsdGVyT3B0aW9ucyxcblx0XHRcdCAgICBpc1ZhbGlkTmV3T3B0aW9uID0gX3Byb3BzMi5pc1ZhbGlkTmV3T3B0aW9uLFxuXHRcdFx0ICAgIHByb21wdFRleHRDcmVhdG9yID0gX3Byb3BzMi5wcm9tcHRUZXh0Q3JlYXRvcjtcblxuXHRcdFx0Ly8gVFJJQ0tZIENoZWNrIGN1cnJlbnRseSBzZWxlY3RlZCBvcHRpb25zIGFzIHdlbGwuXG5cdFx0XHQvLyBEb24ndCBkaXNwbGF5IGEgY3JlYXRlLXByb21wdCBmb3IgYSB2YWx1ZSB0aGF0J3Mgc2VsZWN0ZWQuXG5cdFx0XHQvLyBUaGlzIGNvdmVycyBhc3luYyBlZGdlLWNhc2VzIHdoZXJlIGEgbmV3bHktY3JlYXRlZCBPcHRpb24gaXNuJ3QgeWV0IGluIHRoZSBhc3luYy1sb2FkZWQgYXJyYXkuXG5cblx0XHRcdHZhciBleGNsdWRlT3B0aW9ucyA9IChhcmd1bWVudHMubGVuZ3RoIDw9IDIgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMl0pIHx8IFtdO1xuXG5cdFx0XHR2YXIgZmlsdGVyZWRPcHRpb25zID0gZmlsdGVyT3B0aW9ucyQkMS5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykgfHwgW107XG5cblx0XHRcdGlmIChpc1ZhbGlkTmV3T3B0aW9uKHsgbGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSB9KSkge1xuXHRcdFx0XHR2YXIgX25ld09wdGlvbkNyZWF0b3IgPSB0aGlzLnByb3BzLm5ld09wdGlvbkNyZWF0b3I7XG5cblxuXHRcdFx0XHR2YXIgb3B0aW9uID0gX25ld09wdGlvbkNyZWF0b3Ioe1xuXHRcdFx0XHRcdGxhYmVsOiB0aGlzLmlucHV0VmFsdWUsXG5cdFx0XHRcdFx0bGFiZWxLZXk6IHRoaXMubGFiZWxLZXksXG5cdFx0XHRcdFx0dmFsdWVLZXk6IHRoaXMudmFsdWVLZXlcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gVFJJQ0tZIENvbXBhcmUgdG8gYWxsIG9wdGlvbnMgKG5vdCBqdXN0IGZpbHRlcmVkIG9wdGlvbnMpIGluIGNhc2Ugb3B0aW9uIGhhcyBhbHJlYWR5IGJlZW4gc2VsZWN0ZWQpLlxuXHRcdFx0XHQvLyBGb3IgbXVsdGktc2VsZWN0cywgdGhpcyB3b3VsZCByZW1vdmUgaXQgZnJvbSB0aGUgZmlsdGVyZWQgbGlzdC5cblx0XHRcdFx0dmFyIF9pc09wdGlvblVuaXF1ZTIgPSB0aGlzLmlzT3B0aW9uVW5pcXVlKHtcblx0XHRcdFx0XHRvcHRpb246IG9wdGlvbixcblx0XHRcdFx0XHRvcHRpb25zOiBleGNsdWRlT3B0aW9ucy5jb25jYXQoZmlsdGVyZWRPcHRpb25zKVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoX2lzT3B0aW9uVW5pcXVlMikge1xuXHRcdFx0XHRcdHZhciBwcm9tcHQgPSBwcm9tcHRUZXh0Q3JlYXRvcih0aGlzLmlucHV0VmFsdWUpO1xuXG5cdFx0XHRcdFx0dGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24gPSBfbmV3T3B0aW9uQ3JlYXRvcih7XG5cdFx0XHRcdFx0XHRsYWJlbDogcHJvbXB0LFxuXHRcdFx0XHRcdFx0bGFiZWxLZXk6IHRoaXMubGFiZWxLZXksXG5cdFx0XHRcdFx0XHR2YWx1ZUtleTogdGhpcy52YWx1ZUtleVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0ZmlsdGVyZWRPcHRpb25zLnVuc2hpZnQodGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmaWx0ZXJlZE9wdGlvbnM7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaXNPcHRpb25VbmlxdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBpc09wdGlvblVuaXF1ZShfcmVmKSB7XG5cdFx0XHR2YXIgb3B0aW9uID0gX3JlZi5vcHRpb24sXG5cdFx0XHQgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucztcblx0XHRcdHZhciBpc09wdGlvblVuaXF1ZSA9IHRoaXMucHJvcHMuaXNPcHRpb25VbmlxdWU7XG5cblxuXHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwgdGhpcy5wcm9wcy5vcHRpb25zO1xuXG5cdFx0XHRyZXR1cm4gaXNPcHRpb25VbmlxdWUoe1xuXHRcdFx0XHRsYWJlbEtleTogdGhpcy5sYWJlbEtleSxcblx0XHRcdFx0b3B0aW9uOiBvcHRpb24sXG5cdFx0XHRcdG9wdGlvbnM6IG9wdGlvbnMsXG5cdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdtZW51UmVuZGVyZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBtZW51UmVuZGVyZXIkJDEocGFyYW1zKSB7XG5cdFx0XHR2YXIgbWVudVJlbmRlcmVyJCQxID0gdGhpcy5wcm9wcy5tZW51UmVuZGVyZXI7XG5cblxuXHRcdFx0cmV0dXJuIG1lbnVSZW5kZXJlciQkMShfZXh0ZW5kcyh7fSwgcGFyYW1zLCB7XG5cdFx0XHRcdG9uU2VsZWN0OiB0aGlzLm9uT3B0aW9uU2VsZWN0LFxuXHRcdFx0XHRzZWxlY3RWYWx1ZTogdGhpcy5vbk9wdGlvblNlbGVjdFxuXHRcdFx0fSkpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ29uSW5wdXRDaGFuZ2UnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBvbklucHV0Q2hhbmdlKGlucHV0KSB7XG5cdFx0XHR2YXIgb25JbnB1dENoYW5nZSA9IHRoaXMucHJvcHMub25JbnB1dENoYW5nZTtcblxuXHRcdFx0Ly8gVGhpcyB2YWx1ZSBtYXkgYmUgbmVlZGVkIGluIGJldHdlZW4gU2VsZWN0IG1vdW50cyAod2hlbiB0aGlzLnNlbGVjdCBpcyBudWxsKVxuXG5cdFx0XHR0aGlzLmlucHV0VmFsdWUgPSBpbnB1dDtcblxuXHRcdFx0aWYgKG9uSW5wdXRDaGFuZ2UpIHtcblx0XHRcdFx0dGhpcy5pbnB1dFZhbHVlID0gb25JbnB1dENoYW5nZShpbnB1dCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzLmlucHV0VmFsdWU7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnb25JbnB1dEtleURvd24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBvbklucHV0S2V5RG93bihldmVudCkge1xuXHRcdFx0dmFyIF9wcm9wczMgPSB0aGlzLnByb3BzLFxuXHRcdFx0ICAgIHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbiA9IF9wcm9wczMuc2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uLFxuXHRcdFx0ICAgIG9uSW5wdXRLZXlEb3duID0gX3Byb3BzMy5vbklucHV0S2V5RG93bjtcblxuXHRcdFx0dmFyIGZvY3VzZWRPcHRpb24gPSB0aGlzLnNlbGVjdC5nZXRGb2N1c2VkT3B0aW9uKCk7XG5cblx0XHRcdGlmIChmb2N1c2VkT3B0aW9uICYmIGZvY3VzZWRPcHRpb24gPT09IHRoaXMuX2NyZWF0ZVBsYWNlaG9sZGVyT3B0aW9uICYmIHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbih7IGtleUNvZGU6IGV2ZW50LmtleUNvZGUgfSkpIHtcblx0XHRcdFx0dGhpcy5jcmVhdGVOZXdPcHRpb24oKTtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IGRlY29yYXRlZCBTZWxlY3QgZnJvbSBkb2luZyBhbnl0aGluZyBhZGRpdGlvbmFsIHdpdGggdGhpcyBrZXlEb3duIGV2ZW50XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9IGVsc2UgaWYgKG9uSW5wdXRLZXlEb3duKSB7XG5cdFx0XHRcdG9uSW5wdXRLZXlEb3duKGV2ZW50KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdvbk9wdGlvblNlbGVjdCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG9uT3B0aW9uU2VsZWN0KG9wdGlvbikge1xuXHRcdFx0aWYgKG9wdGlvbiA9PT0gdGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24pIHtcblx0XHRcdFx0dGhpcy5jcmVhdGVOZXdPcHRpb24oKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2VsZWN0LnNlbGVjdFZhbHVlKG9wdGlvbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmb2N1cygpIHtcblx0XHRcdHRoaXMuc2VsZWN0LmZvY3VzKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdFx0dmFyIF90aGlzMiA9IHRoaXM7XG5cblx0XHRcdHZhciBfcHJvcHM0ID0gdGhpcy5wcm9wcyxcblx0XHRcdCAgICByZWZQcm9wID0gX3Byb3BzNC5yZWYsXG5cdFx0XHQgICAgcmVzdFByb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3Byb3BzNCwgWydyZWYnXSk7XG5cdFx0XHR2YXIgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuO1xuXG5cdFx0XHQvLyBXZSBjYW4ndCB1c2UgZGVzdHJ1Y3R1cmluZyBkZWZhdWx0IHZhbHVlcyB0byBzZXQgdGhlIGNoaWxkcmVuLFxuXHRcdFx0Ly8gYmVjYXVzZSBpdCB3b24ndCBhcHBseSB3b3JrIGlmIGBjaGlsZHJlbmAgaXMgbnVsbC4gQSBmYWxzeSBjaGVjayBpc1xuXHRcdFx0Ly8gbW9yZSByZWxpYWJsZSBpbiByZWFsIHdvcmxkIHVzZS1jYXNlcy5cblxuXHRcdFx0aWYgKCFjaGlsZHJlbikge1xuXHRcdFx0XHRjaGlsZHJlbiA9IGRlZmF1bHRDaGlsZHJlbiQyO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcHJvcHMgPSBfZXh0ZW5kcyh7fSwgcmVzdFByb3BzLCB7XG5cdFx0XHRcdGFsbG93Q3JlYXRlOiB0cnVlLFxuXHRcdFx0XHRmaWx0ZXJPcHRpb25zOiB0aGlzLmZpbHRlck9wdGlvbnMsXG5cdFx0XHRcdG1lbnVSZW5kZXJlcjogdGhpcy5tZW51UmVuZGVyZXIsXG5cdFx0XHRcdG9uSW5wdXRDaGFuZ2U6IHRoaXMub25JbnB1dENoYW5nZSxcblx0XHRcdFx0b25JbnB1dEtleURvd246IHRoaXMub25JbnB1dEtleURvd24sXG5cdFx0XHRcdHJlZjogZnVuY3Rpb24gcmVmKF9yZWYyKSB7XG5cdFx0XHRcdFx0X3RoaXMyLnNlbGVjdCA9IF9yZWYyO1xuXG5cdFx0XHRcdFx0Ly8gVGhlc2UgdmFsdWVzIG1heSBiZSBuZWVkZWQgaW4gYmV0d2VlbiBTZWxlY3QgbW91bnRzICh3aGVuIHRoaXMuc2VsZWN0IGlzIG51bGwpXG5cdFx0XHRcdFx0aWYgKF9yZWYyKSB7XG5cdFx0XHRcdFx0XHRfdGhpczIubGFiZWxLZXkgPSBfcmVmMi5wcm9wcy5sYWJlbEtleTtcblx0XHRcdFx0XHRcdF90aGlzMi52YWx1ZUtleSA9IF9yZWYyLnByb3BzLnZhbHVlS2V5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocmVmUHJvcCkge1xuXHRcdFx0XHRcdFx0cmVmUHJvcChfcmVmMik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGNoaWxkcmVuKHByb3BzKTtcblx0XHR9XG5cdH1dKTtcblx0cmV0dXJuIENyZWF0YWJsZVNlbGVjdDtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxudmFyIGRlZmF1bHRDaGlsZHJlbiQyID0gZnVuY3Rpb24gZGVmYXVsdENoaWxkcmVuKHByb3BzKSB7XG5cdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdCQxLCBwcm9wcyk7XG59O1xuXG52YXIgaXNPcHRpb25VbmlxdWUgPSBmdW5jdGlvbiBpc09wdGlvblVuaXF1ZShfcmVmMykge1xuXHR2YXIgb3B0aW9uID0gX3JlZjMub3B0aW9uLFxuXHQgICAgb3B0aW9ucyA9IF9yZWYzLm9wdGlvbnMsXG5cdCAgICBsYWJlbEtleSA9IF9yZWYzLmxhYmVsS2V5LFxuXHQgICAgdmFsdWVLZXkgPSBfcmVmMy52YWx1ZUtleTtcblxuXHRpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMubGVuZ3RoKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRyZXR1cm4gb3B0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGV4aXN0aW5nT3B0aW9uKSB7XG5cdFx0cmV0dXJuIGV4aXN0aW5nT3B0aW9uW2xhYmVsS2V5XSA9PT0gb3B0aW9uW2xhYmVsS2V5XSB8fCBleGlzdGluZ09wdGlvblt2YWx1ZUtleV0gPT09IG9wdGlvblt2YWx1ZUtleV07XG5cdH0pLmxlbmd0aCA9PT0gMDtcbn07XG5cbnZhciBpc1ZhbGlkTmV3T3B0aW9uID0gZnVuY3Rpb24gaXNWYWxpZE5ld09wdGlvbihfcmVmNCkge1xuXHR2YXIgbGFiZWwgPSBfcmVmNC5sYWJlbDtcblx0cmV0dXJuICEhbGFiZWw7XG59O1xuXG52YXIgbmV3T3B0aW9uQ3JlYXRvciA9IGZ1bmN0aW9uIG5ld09wdGlvbkNyZWF0b3IoX3JlZjUpIHtcblx0dmFyIGxhYmVsID0gX3JlZjUubGFiZWwsXG5cdCAgICBsYWJlbEtleSA9IF9yZWY1LmxhYmVsS2V5LFxuXHQgICAgdmFsdWVLZXkgPSBfcmVmNS52YWx1ZUtleTtcblxuXHR2YXIgb3B0aW9uID0ge307XG5cdG9wdGlvblt2YWx1ZUtleV0gPSBsYWJlbDtcblx0b3B0aW9uW2xhYmVsS2V5XSA9IGxhYmVsO1xuXHRvcHRpb24uY2xhc3NOYW1lID0gJ1NlbGVjdC1jcmVhdGUtb3B0aW9uLXBsYWNlaG9sZGVyJztcblxuXHRyZXR1cm4gb3B0aW9uO1xufTtcblxudmFyIHByb21wdFRleHRDcmVhdG9yID0gZnVuY3Rpb24gcHJvbXB0VGV4dENyZWF0b3IobGFiZWwpIHtcblx0cmV0dXJuICdDcmVhdGUgb3B0aW9uIFwiJyArIGxhYmVsICsgJ1wiJztcbn07XG5cbnZhciBzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb24gPSBmdW5jdGlvbiBzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb24oX3JlZjYpIHtcblx0dmFyIGtleUNvZGUgPSBfcmVmNi5rZXlDb2RlO1xuXG5cdHN3aXRjaCAoa2V5Q29kZSkge1xuXHRcdGNhc2UgOTogLy8gVEFCXG5cdFx0Y2FzZSAxMzogLy8gRU5URVJcblx0XHRjYXNlIDE4ODpcblx0XHRcdC8vIENPTU1BXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xuXG4vLyBEZWZhdWx0IHByb3AgbWV0aG9kc1xuQ3JlYXRhYmxlU2VsZWN0LmlzT3B0aW9uVW5pcXVlID0gaXNPcHRpb25VbmlxdWU7XG5DcmVhdGFibGVTZWxlY3QuaXNWYWxpZE5ld09wdGlvbiA9IGlzVmFsaWROZXdPcHRpb247XG5DcmVhdGFibGVTZWxlY3QubmV3T3B0aW9uQ3JlYXRvciA9IG5ld09wdGlvbkNyZWF0b3I7XG5DcmVhdGFibGVTZWxlY3QucHJvbXB0VGV4dENyZWF0b3IgPSBwcm9tcHRUZXh0Q3JlYXRvcjtcbkNyZWF0YWJsZVNlbGVjdC5zaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb24gPSBzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb247XG5cbkNyZWF0YWJsZVNlbGVjdC5kZWZhdWx0UHJvcHMgPSB7XG5cdGZpbHRlck9wdGlvbnM6IGZpbHRlck9wdGlvbnMsXG5cdGlzT3B0aW9uVW5pcXVlOiBpc09wdGlvblVuaXF1ZSxcblx0aXNWYWxpZE5ld09wdGlvbjogaXNWYWxpZE5ld09wdGlvbixcblx0bWVudVJlbmRlcmVyOiBtZW51UmVuZGVyZXIsXG5cdG5ld09wdGlvbkNyZWF0b3I6IG5ld09wdGlvbkNyZWF0b3IsXG5cdHByb21wdFRleHRDcmVhdG9yOiBwcm9tcHRUZXh0Q3JlYXRvcixcblx0c2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uOiBzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb25cbn07XG5cbkNyZWF0YWJsZVNlbGVjdC5wcm9wVHlwZXMgPSB7XG5cdC8vIENoaWxkIGZ1bmN0aW9uIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGUgaW5uZXIgU2VsZWN0IGNvbXBvbmVudFxuXHQvLyBUaGlzIGNvbXBvbmVudCBjYW4gYmUgdXNlZCB0byBjb21wb3NlIEhPQ3MgKGVnIENyZWF0YWJsZSBhbmQgQXN5bmMpXG5cdC8vIChwcm9wczogT2JqZWN0KTogUHJvcFR5cGVzLmVsZW1lbnRcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIFNlZSBTZWxlY3QucHJvcFR5cGVzLmZpbHRlck9wdGlvbnNcblx0ZmlsdGVyT3B0aW9uczogUHJvcFR5cGVzLmFueSxcblxuXHQvLyBTZWFyY2hlcyBmb3IgYW55IG1hdGNoaW5nIG9wdGlvbiB3aXRoaW4gdGhlIHNldCBvZiBvcHRpb25zLlxuXHQvLyBUaGlzIGZ1bmN0aW9uIHByZXZlbnRzIGR1cGxpY2F0ZSBvcHRpb25zIGZyb20gYmVpbmcgY3JlYXRlZC5cblx0Ly8gKHsgb3B0aW9uOiBPYmplY3QsIG9wdGlvbnM6IEFycmF5LCBsYWJlbEtleTogc3RyaW5nLCB2YWx1ZUtleTogc3RyaW5nIH0pOiBib29sZWFuXG5cdGlzT3B0aW9uVW5pcXVlOiBQcm9wVHlwZXMuZnVuYyxcblxuXHQvLyBEZXRlcm1pbmVzIGlmIHRoZSBjdXJyZW50IGlucHV0IHRleHQgcmVwcmVzZW50cyBhIHZhbGlkIG9wdGlvbi5cblx0Ly8gKHsgbGFiZWw6IHN0cmluZyB9KTogYm9vbGVhblxuXHRpc1ZhbGlkTmV3T3B0aW9uOiBQcm9wVHlwZXMuZnVuYyxcblxuXHQvLyBTZWUgU2VsZWN0LnByb3BUeXBlcy5tZW51UmVuZGVyZXJcblx0bWVudVJlbmRlcmVyOiBQcm9wVHlwZXMuYW55LFxuXG5cdC8vIEZhY3RvcnkgdG8gY3JlYXRlIG5ldyBvcHRpb24uXG5cdC8vICh7IGxhYmVsOiBzdHJpbmcsIGxhYmVsS2V5OiBzdHJpbmcsIHZhbHVlS2V5OiBzdHJpbmcgfSk6IE9iamVjdFxuXHRuZXdPcHRpb25DcmVhdG9yOiBQcm9wVHlwZXMuZnVuYyxcblxuXHQvLyBpbnB1dCBjaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKGlucHV0VmFsdWUpIHt9XG5cdG9uSW5wdXRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIGlucHV0IGtleURvd24gaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxuXHRvbklucHV0S2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG5cblx0Ly8gbmV3IG9wdGlvbiBjbGljayBoYW5kbGVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxuXHRvbk5ld09wdGlvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcblxuXHQvLyBTZWUgU2VsZWN0LnByb3BUeXBlcy5vcHRpb25zXG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcblxuXHQvLyBDcmVhdGVzIHByb21wdC9wbGFjZWhvbGRlciBvcHRpb24gdGV4dC5cblx0Ly8gKGZpbHRlclRleHQ6IHN0cmluZyk6IHN0cmluZ1xuXHRwcm9tcHRUZXh0Q3JlYXRvcjogUHJvcFR5cGVzLmZ1bmMsXG5cblx0cmVmOiBQcm9wVHlwZXMuZnVuYyxcblxuXHQvLyBEZWNpZGVzIGlmIGEga2V5RG93biBldmVudCAoZWcgaXRzIGBrZXlDb2RlYCkgc2hvdWxkIHJlc3VsdCBpbiB0aGUgY3JlYXRpb24gb2YgYSBuZXcgb3B0aW9uLlxuXHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb246IFByb3BUeXBlcy5mdW5jXG59O1xuXG52YXIgQXN5bmNDcmVhdGFibGVTZWxlY3QgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuXHRpbmhlcml0cyhBc3luY0NyZWF0YWJsZVNlbGVjdCwgX1JlYWN0JENvbXBvbmVudCk7XG5cblx0ZnVuY3Rpb24gQXN5bmNDcmVhdGFibGVTZWxlY3QoKSB7XG5cdFx0Y2xhc3NDYWxsQ2hlY2sodGhpcywgQXN5bmNDcmVhdGFibGVTZWxlY3QpO1xuXHRcdHJldHVybiBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChBc3luY0NyZWF0YWJsZVNlbGVjdC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEFzeW5jQ3JlYXRhYmxlU2VsZWN0KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG5cdH1cblxuXHRjcmVhdGVDbGFzcyhBc3luY0NyZWF0YWJsZVNlbGVjdCwgW3tcblx0XHRrZXk6ICdmb2N1cycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzKCkge1xuXHRcdFx0dGhpcy5zZWxlY3QuZm9jdXMoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdEFzeW5jLFxuXHRcdFx0XHR0aGlzLnByb3BzLFxuXHRcdFx0XHRmdW5jdGlvbiAoX3JlZikge1xuXHRcdFx0XHRcdHZhciByZWYgPSBfcmVmLnJlZixcblx0XHRcdFx0XHQgICAgYXN5bmNQcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsncmVmJ10pO1xuXG5cdFx0XHRcdFx0dmFyIGFzeW5jUmVmID0gcmVmO1xuXHRcdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdFx0Q3JlYXRhYmxlU2VsZWN0LFxuXHRcdFx0XHRcdFx0YXN5bmNQcm9wcyxcblx0XHRcdFx0XHRcdGZ1bmN0aW9uIChfcmVmMikge1xuXHRcdFx0XHRcdFx0XHR2YXIgcmVmID0gX3JlZjIucmVmLFxuXHRcdFx0XHRcdFx0XHQgICAgY3JlYXRhYmxlUHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmMiwgWydyZWYnXSk7XG5cblx0XHRcdFx0XHRcdFx0dmFyIGNyZWF0YWJsZVJlZiA9IHJlZjtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMi5wcm9wcy5jaGlsZHJlbihfZXh0ZW5kcyh7fSwgY3JlYXRhYmxlUHJvcHMsIHtcblx0XHRcdFx0XHRcdFx0XHRyZWY6IGZ1bmN0aW9uIHJlZihzZWxlY3QpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNyZWF0YWJsZVJlZihzZWxlY3QpO1xuXHRcdFx0XHRcdFx0XHRcdFx0YXN5bmNSZWYoc2VsZWN0KTtcblx0XHRcdFx0XHRcdFx0XHRcdF90aGlzMi5zZWxlY3QgPSBzZWxlY3Q7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0KTtcblx0XHR9XG5cdH1dKTtcblx0cmV0dXJuIEFzeW5jQ3JlYXRhYmxlU2VsZWN0O1xufShSZWFjdC5Db21wb25lbnQpO1xuXG52YXIgZGVmYXVsdENoaWxkcmVuJDEgPSBmdW5jdGlvbiBkZWZhdWx0Q2hpbGRyZW4ocHJvcHMpIHtcblx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0JDEsIHByb3BzKTtcbn07XG5cbkFzeW5jQ3JlYXRhYmxlU2VsZWN0LnByb3BUeXBlcyA9IHtcblx0Y2hpbGRyZW46IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQgLy8gQ2hpbGQgZnVuY3Rpb24gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoZSBpbm5lciBTZWxlY3QgY29tcG9uZW50OyAocHJvcHM6IE9iamVjdCk6IFByb3BUeXBlcy5lbGVtZW50XG59O1xuXG5Bc3luY0NyZWF0YWJsZVNlbGVjdC5kZWZhdWx0UHJvcHMgPSB7XG5cdGNoaWxkcmVuOiBkZWZhdWx0Q2hpbGRyZW4kMVxufTtcblxuU2VsZWN0JDEuQXN5bmMgPSBBc3luYztcblNlbGVjdCQxLkFzeW5jQ3JlYXRhYmxlID0gQXN5bmNDcmVhdGFibGVTZWxlY3Q7XG5TZWxlY3QkMS5DcmVhdGFibGUgPSBDcmVhdGFibGVTZWxlY3Q7XG5TZWxlY3QkMS5WYWx1ZSA9IFZhbHVlO1xuU2VsZWN0JDEuT3B0aW9uID0gT3B0aW9uO1xuXG5leHBvcnQgeyBBc3luYywgQXN5bmNDcmVhdGFibGVTZWxlY3QgYXMgQXN5bmNDcmVhdGFibGUsIENyZWF0YWJsZVNlbGVjdCBhcyBDcmVhdGFibGUsIFZhbHVlLCBPcHRpb24sIG1lbnVSZW5kZXJlciBhcyBkZWZhdWx0TWVudVJlbmRlcmVyLCBhcnJvd1JlbmRlcmVyIGFzIGRlZmF1bHRBcnJvd1JlbmRlcmVyLCBjbGVhclJlbmRlcmVyIGFzIGRlZmF1bHRDbGVhclJlbmRlcmVyLCBmaWx0ZXJPcHRpb25zIGFzIGRlZmF1bHRGaWx0ZXJPcHRpb25zIH07XG5leHBvcnQgZGVmYXVsdCBTZWxlY3QkMTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5lcy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3Qtc2VsZWN0L2Rpc3QvcmVhY3Qtc2VsZWN0LmVzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJleHBvcnQgY29uc3QgbGFuZ3VhZ2VzID0ge1xuICAgIFwiYWJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQWJraGF6XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LDSp9GB0YPQsFwiXG4gICAgfSxcbiAgICBcImFhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFmYXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBZmFyYWZcIlxuICAgIH0sXG4gICAgXCJhZlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBZnJpa2FhbnNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBZnJpa2FhbnNcIlxuICAgIH0sXG4gICAgXCJha1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBa2FuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWthblwiXG4gICAgfSxcbiAgICBcInNxXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkFsYmFuaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2hxaXBcIlxuICAgIH0sXG4gICAgXCJhbVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBbWhhcmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Yqg4Yib4Yit4YqbXCJcbiAgICB9LFxuICAgIFwiYXJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXJhYmljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi2KfZhNi52LHYqNmK2KlcIlxuICAgIH0sXG4gICAgXCJhblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBcmFnb25lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBcmFnb27DqXNcIlxuICAgIH0sXG4gICAgXCJoeVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBcm1lbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItWA1aHVtdWl1oDVpdW2XCJcbiAgICB9LFxuICAgIFwiYXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQXNzYW1lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpoXgprjgpq7gp4Dgpq/gprzgpr5cIlxuICAgIH0sXG4gICAgXCJhdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBdmFyaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsNCy0LDRgCDQvNCw0YbTgCwg0LzQsNCz04DQsNGA0YPQuyDQvNCw0YbTgFwiXG4gICAgfSxcbiAgICBcImFlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkF2ZXN0YW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJhdmVzdGFcIlxuICAgIH0sXG4gICAgXCJheVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBeW1hcmFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJheW1hciBhcnVcIlxuICAgIH0sXG4gICAgXCJhelwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJBemVyYmFpamFuaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImF6yZlyYmF5Y2FuIGRpbGlcIlxuICAgIH0sXG4gICAgXCJibVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCYW1iYXJhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYmFtYW5hbmthblwiXG4gICAgfSxcbiAgICBcImJhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJhc2hraXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsdCw0YjSodC+0YDRgiDRgtC10LvQtVwiXG4gICAgfSxcbiAgICBcImV1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkJhc3F1ZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImV1c2thcmEsIGV1c2tlcmFcIlxuICAgIH0sXG4gICAgXCJiZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCZWxhcnVzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0JHQtdC70LDRgNGD0YHQutCw0Y9cIlxuICAgIH0sXG4gICAgXCJiblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCZW5nYWxpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Kas4Ka+4KaC4Kay4Ka+XCJcbiAgICB9LFxuICAgIFwiYmhcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmloYXJpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KSt4KWL4KSc4KSq4KWB4KSw4KWAXCJcbiAgICB9LFxuICAgIFwiYmlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQmlzbGFtYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkJpc2xhbWFcIlxuICAgIH0sXG4gICAgXCJic1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCb3NuaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYm9zYW5za2kgamV6aWtcIlxuICAgIH0sXG4gICAgXCJiclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCcmV0b25cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJicmV6aG9uZWdcIlxuICAgIH0sXG4gICAgXCJiZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCdWxnYXJpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsdGK0LvQs9Cw0YDRgdC60Lgg0LXQt9C40LpcIlxuICAgIH0sXG4gICAgXCJteVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJCdXJtZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4YCX4YCZ4YCs4YCF4YCsXCJcbiAgICB9LFxuICAgIFwiY2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ2F0YWxhbjsgVmFsZW5jaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQ2F0YWzDoFwiXG4gICAgfSxcbiAgICBcImNoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNoYW1vcnJvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQ2hhbW9ydVwiXG4gICAgfSxcbiAgICBcImNlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNoZWNoZW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQvdC+0YXRh9C40LnQvSDQvNC+0YLRglwiXG4gICAgfSxcbiAgICBcIm55XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNoaWNoZXdhOyBDaGV3YTsgTnlhbmphXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiY2hpQ2hlxbVhLCBjaGlueWFuamFcIlxuICAgIH0sXG4gICAgXCJ6aFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaGluZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi5Lit5paHIChaaMWNbmd3w6luKSwg5rGJ6K+tLCDmvKLoqp5cIlxuICAgIH0sXG4gICAgXCJjdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDaHV2YXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0YfTkdCy0LDRiCDRh9OX0LvRhdC4XCJcbiAgICB9LFxuICAgIFwia3dcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ29ybmlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktlcm5ld2VrXCJcbiAgICB9LFxuICAgIFwiY29cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ29yc2ljYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJjb3JzdSwgbGluZ3VhIGNvcnNhXCJcbiAgICB9LFxuICAgIFwiY3JcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiQ3JlZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGTgOGQpuGQg+GUreGQjeGQj+GQo1wiXG4gICAgfSxcbiAgICBcImhyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkNyb2F0aWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiaHJ2YXRza2lcIlxuICAgIH0sXG4gICAgXCJjc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJDemVjaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIsSNZXNreSwgxI1lxaF0aW5hXCJcbiAgICB9LFxuICAgIFwiZGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRGFuaXNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZGFuc2tcIlxuICAgIH0sXG4gICAgXCJkdlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJEaXZlaGk7IERoaXZlaGk7IE1hbGRpdmlhbjtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLei96o3ojerN6A3qhcIlxuICAgIH0sXG4gICAgXCJubFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJEdXRjaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5lZGVybGFuZHMsIFZsYWFtc1wiXG4gICAgfSxcbiAgICBcImVuXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkVuZ2xpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFbmdsaXNoXCJcbiAgICB9LFxuICAgIFwiZW9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRXNwZXJhbnRvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRXNwZXJhbnRvXCJcbiAgICB9LFxuICAgIFwiZXRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRXN0b25pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJlZXN0aSwgZWVzdGkga2VlbFwiXG4gICAgfSxcbiAgICBcImVlXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkV3ZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkXKi2VnYmVcIlxuICAgIH0sXG4gICAgXCJmb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJGYXJvZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZsO4cm95c2t0XCJcbiAgICB9LFxuICAgIFwiZmpcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRmlqaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwidm9zYSBWYWthdml0aVwiXG4gICAgfSxcbiAgICBcImZpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZpbm5pc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzdW9taSwgc3VvbWVuIGtpZWxpXCJcbiAgICB9LFxuICAgIFwiZnJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiRnJlbmNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZnJhbsOnYWlzLCBsYW5ndWUgZnJhbsOnYWlzZVwiXG4gICAgfSxcbiAgICBcImZmXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkZ1bGE7IEZ1bGFoOyBQdWxhYXI7IFB1bGFyXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRnVsZnVsZGUsIFB1bGFhciwgUHVsYXJcIlxuICAgIH0sXG4gICAgXCJnbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHYWxpY2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkdhbGVnb1wiXG4gICAgfSxcbiAgICBcImthXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkdlb3JnaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4YOl4YOQ4YOg4YOX4YOj4YOa4YOYXCJcbiAgICB9LFxuICAgIFwiZGVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR2VybWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRGV1dHNjaFwiXG4gICAgfSxcbiAgICBcImVsXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkdyZWVrLCBNb2Rlcm5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLOlc67zrvOt869zrnOus6sXCJcbiAgICB9LFxuICAgIFwiZ25cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiR3VhcmFuw61cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBdmHDsWXhur1cIlxuICAgIH0sXG4gICAgXCJndVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJHdWphcmF0aVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCql+CrgeCqnOCqsOCqvuCqpOCrgFwiXG4gICAgfSxcbiAgICBcImh0XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhhaXRpYW47IEhhaXRpYW4gQ3Jlb2xlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS3JlecOybCBheWlzeWVuXCJcbiAgICB9LFxuICAgIFwiaGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGF1c2FcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJIYXVzYSwg2YfZjtmI2Y/Ys9mOXCJcbiAgICB9LFxuICAgIFwiaGVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGVicmV3IChtb2Rlcm4pXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi16LXkdeo15nXqlwiXG4gICAgfSxcbiAgICBcImh6XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkhlcmVyb1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk90amloZXJlcm9cIlxuICAgIH0sXG4gICAgXCJoaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJIaW5kaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkueCkv+CkqOCljeCkpuClgCwg4KS54KS/4KSC4KSm4KWAXCJcbiAgICB9LFxuICAgIFwiaG9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSGlyaSBNb3R1XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSGlyaSBNb3R1XCJcbiAgICB9LFxuICAgIFwiaHVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSHVuZ2FyaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTWFneWFyXCJcbiAgICB9LFxuICAgIFwiaWFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW50ZXJsaW5ndWFcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJJbnRlcmxpbmd1YVwiXG4gICAgfSxcbiAgICBcImlkXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkluZG9uZXNpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJCYWhhc2EgSW5kb25lc2lhXCJcbiAgICB9LFxuICAgIFwiaWVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiSW50ZXJsaW5ndWVcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJPcmlnaW5hbGx5IGNhbGxlZCBPY2NpZGVudGFsOyB0aGVuIEludGVybGluZ3VlIGFmdGVyIFdXSUlcIlxuICAgIH0sXG4gICAgXCJnYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJcmlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkdhZWlsZ2VcIlxuICAgIH0sXG4gICAgXCJpZ1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJZ2JvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXPhu6Vz4bulIElnYm9cIlxuICAgIH0sXG4gICAgXCJpa1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbnVwaWFxXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiScOxdXBpYXEsIEnDsXVwaWF0dW5cIlxuICAgIH0sXG4gICAgXCJpb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJZG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJJZG9cIlxuICAgIH0sXG4gICAgXCJpc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJY2VsYW5kaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLDjXNsZW5za2FcIlxuICAgIH0sXG4gICAgXCJpdFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJdGFsaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSXRhbGlhbm9cIlxuICAgIH0sXG4gICAgXCJpdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJJbnVrdGl0dXRcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhkIPhk4ThkoPhkY7hkZDhkaZcIlxuICAgIH0sXG4gICAgXCJqYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJKYXBhbmVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuaXpeacrOiqniAo44Gr44G744KT44GU77yP44Gr44Gj44G944KT44GUKVwiXG4gICAgfSxcbiAgICBcImp2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkphdmFuZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYmFzYSBKYXdhXCJcbiAgICB9LFxuICAgIFwia2xcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2FsYWFsbGlzdXQsIEdyZWVubGFuZGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwia2FsYWFsbGlzdXQsIGthbGFhbGxpdCBvcWFhc2lpXCJcbiAgICB9LFxuICAgIFwia25cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2FubmFkYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCyleCyqOCzjeCyqOCyoVwiXG4gICAgfSxcbiAgICBcImtyXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthbnVyaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkthbnVyaVwiXG4gICAgfSxcbiAgICBcImtzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkthc2htaXJpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KSV4KS24KWN4KSu4KWA4KSw4KWALCDZg9i02YXZitix2YrigI5cIlxuICAgIH0sXG4gICAgXCJra1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLYXpha2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLSmtCw0LfQsNKbINGC0ZbQu9GWXCJcbiAgICB9LFxuICAgIFwia21cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2htZXJcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhnpfhnrbhnp/hnrbhnoHhn5Lhnpjhn4LhnppcIlxuICAgIH0sXG4gICAgXCJraVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJLaWt1eXUsIEdpa3V5dVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkfEqWvFqXnFqVwiXG4gICAgfSxcbiAgICBcInJ3XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktpbnlhcndhbmRhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSWtpbnlhcndhbmRhXCJcbiAgICB9LFxuICAgIFwia3lcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2lyZ2hpeiwgS3lyZ3l6XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LrRi9GA0LPRi9C3INGC0LjQu9C4XCJcbiAgICB9LFxuICAgIFwia3ZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS29taVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC60L7QvNC4INC60YvQslwiXG4gICAgfSxcbiAgICBcImtnXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktvbmdvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2lLb25nb1wiXG4gICAgfSxcbiAgICBcImtvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIktvcmVhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIu2VnOq1reyWtCAo6Z+T5ZyL6KqeKSwg7KGw7ISg66eQICjmnJ3prq7oqp4pXCJcbiAgICB9LFxuICAgIFwia3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS3VyZGlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkt1cmTDriwg2YPZiNix2K/bjOKAjlwiXG4gICAgfSxcbiAgICBcImtqXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkt3YW55YW1hLCBLdWFueWFtYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkt1YW55YW1hXCJcbiAgICB9LFxuICAgIFwibGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGF0aW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJsYXRpbmUsIGxpbmd1YSBsYXRpbmFcIlxuICAgIH0sXG4gICAgXCJsYlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMdXhlbWJvdXJnaXNoLCBMZXR6ZWJ1cmdlc2NoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTMOrdHplYnVlcmdlc2NoXCJcbiAgICB9LFxuICAgIFwibGdcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTHVnYW5kYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkx1Z2FuZGFcIlxuICAgIH0sXG4gICAgXCJsaVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJMaW1idXJnaXNoLCBMaW1idXJnYW4sIExpbWJ1cmdlclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkxpbWJ1cmdzXCJcbiAgICB9LFxuICAgIFwibG5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGluZ2FsYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkxpbmfDoWxhXCJcbiAgICB9LFxuICAgIFwibG9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGFvXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Lqe4Lqy4Lqq4Lqy4Lql4Lqy4LqnXCJcbiAgICB9LFxuICAgIFwibHRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTGl0aHVhbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImxpZXR1dmnFsyBrYWxiYVwiXG4gICAgfSxcbiAgICBcImx1XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkx1YmEtS2F0YW5nYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlwiXG4gICAgfSxcbiAgICBcImx2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIkxhdHZpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJsYXR2aWXFoXUgdmFsb2RhXCJcbiAgICB9LFxuICAgIFwiZ3ZcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFueFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkdhZWxnLCBHYWlsY2tcIlxuICAgIH0sXG4gICAgXCJta1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNYWNlZG9uaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LzQsNC60LXQtNC+0L3RgdC60Lgg0ZjQsNC30LjQulwiXG4gICAgfSxcbiAgICBcIm1nXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hbGFnYXN5XCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTWFsYWdhc3kgZml0ZW55XCJcbiAgICB9LFxuICAgIFwibXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFsYXlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJiYWhhc2EgTWVsYXl1LCDYqNmH2KfYsyDZhdmE2KfZitmI4oCOXCJcbiAgICB9LFxuICAgIFwibWxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFsYXlhbGFtXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LSu4LSy4LSv4LS+4LSz4LSCXCJcbiAgICB9LFxuICAgIFwibXRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTWFsdGVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hbHRpXCJcbiAgICB9LFxuICAgIFwibWlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTcSBb3JpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwidGUgcmVvIE3EgW9yaVwiXG4gICAgfSxcbiAgICBcIm1yXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hcmF0aGkgKE1hcsSB4bmtaMSrKVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkruCksOCkvuCkoOClgFwiXG4gICAgfSxcbiAgICBcIm1oXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk1hcnNoYWxsZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2FqaW4gTcynYWplxLxcIlxuICAgIH0sXG4gICAgXCJtblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJNb25nb2xpYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQvNC+0L3Qs9C+0LtcIlxuICAgIH0sXG4gICAgXCJuYVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOYXVydVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkVrYWthaXLFqSBOYW9lcm9cIlxuICAgIH0sXG4gICAgXCJudlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOYXZham8sIE5hdmFob1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkRpbsOpIGJpemFhZCwgRGluw6lryrxlaMeww61cIlxuICAgIH0sXG4gICAgXCJuYlwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW4gQm9rbcOlbFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrIGJva23DpWxcIlxuICAgIH0sXG4gICAgXCJuZFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J0aCBOZGViZWxlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiaXNpTmRlYmVsZVwiXG4gICAgfSxcbiAgICBcIm5lXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5lcGFsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkqOClh+CkquCkvuCksuClgFwiXG4gICAgfSxcbiAgICBcIm5nXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5kb25nYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk93YW1ib1wiXG4gICAgfSxcbiAgICBcIm5uXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcndlZ2lhbiBOeW5vcnNrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTm9yc2sgbnlub3Jza1wiXG4gICAgfSxcbiAgICBcIm5vXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk5vcndlZ2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrXCJcbiAgICB9LFxuICAgIFwiaWlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTnVvc3VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLqhojqjKDqkr8gTnVvc3VoeG9wXCJcbiAgICB9LFxuICAgIFwibnJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU291dGggTmRlYmVsZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImlzaU5kZWJlbGVcIlxuICAgIH0sXG4gICAgXCJvY1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPY2NpdGFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT2NjaXRhblwiXG4gICAgfSxcbiAgICBcIm9qXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9qaWJ3ZSwgT2ppYndhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4ZCK4ZOC4ZSR4ZOI4ZCv4ZKn4ZCO4ZOQXCJcbiAgICB9LFxuICAgIFwiY3VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT2xkIENodXJjaCBTbGF2b25pYywgQ2h1cmNoIFNsYXZpYywgQ2h1cmNoIFNsYXZvbmljLCBPbGQgQnVsZ2FyaWFuLCBPbGQgU2xhdm9uaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRqdC30YvQutGKINGB0LvQvtCy0aPQvdGM0YHQutGKXCJcbiAgICB9LFxuICAgIFwib21cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiT3JvbW9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBZmFhbiBPcm9tb29cIlxuICAgIH0sXG4gICAgXCJvclwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJPcml5YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCsk+CsoeCsvOCsv+CshlwiXG4gICAgfSxcbiAgICBcIm9zXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIk9zc2V0aWFuLCBPc3NldGljXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LjRgNC+0L0gw6bQstC30LDQs1wiXG4gICAgfSxcbiAgICBcInBhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlBhbmphYmksIFB1bmphYmlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgqKrgqbDgqJzgqL7gqKzgqYAsINm+2YbYrNin2KjbjOKAjlwiXG4gICAgfSxcbiAgICBcInBpXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlDEgWxpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KSq4KS+4KS04KS/XCJcbiAgICB9LFxuICAgIFwiZmFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUGVyc2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItmB2KfYsdiz24xcIlxuICAgIH0sXG4gICAgXCJwbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQb2xpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJwb2xza2lcIlxuICAgIH0sXG4gICAgXCJwc1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJQYXNodG8sIFB1c2h0b1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItm+2prYqtmIXCJcbiAgICB9LFxuICAgIFwicHRcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUG9ydHVndWVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlBvcnR1Z3XDqnNcIlxuICAgIH0sXG4gICAgXCJxdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJRdWVjaHVhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiUnVuYSBTaW1pLCBLaWNod2FcIlxuICAgIH0sXG4gICAgXCJybVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJSb21hbnNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwicnVtYW50c2NoIGdyaXNjaHVuXCJcbiAgICB9LFxuICAgIFwicm5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiS2lydW5kaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImtpUnVuZGlcIlxuICAgIH0sXG4gICAgXCJyb1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJSb21hbmlhbiwgTW9sZGF2aWFuLCBNb2xkb3ZhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInJvbcOibsSDXCJcbiAgICB9LFxuICAgIFwicnVcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiUnVzc2lhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGA0YPRgdGB0LrQuNC5INGP0LfRi9C6XCJcbiAgICB9LFxuICAgIFwic2FcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2Fuc2tyaXQgKFNh4bmBc2vhuZt0YSlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLjgpILgpLjgpY3gpJXgpYPgpKTgpK7gpY1cIlxuICAgIH0sXG4gICAgXCJzY1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTYXJkaW5pYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzYXJkdVwiXG4gICAgfSxcbiAgICBcInNkXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNpbmRoaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkuOCkv+CkqOCljeCkp+ClgCwg2LPZhtqM2YrYjCDYs9mG2K/avtuM4oCOXCJcbiAgICB9LFxuICAgIFwic2VcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiTm9ydGhlcm4gU2FtaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkRhdnZpc8OhbWVnaWVsbGFcIlxuICAgIH0sXG4gICAgXCJzbVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTYW1vYW5cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJnYWdhbmEgZmFhIFNhbW9hXCJcbiAgICB9LFxuICAgIFwic2dcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2FuZ29cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJ5w6JuZ8OiIHTDriBzw6RuZ8O2XCJcbiAgICB9LFxuICAgIFwic3JcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2VyYmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGB0YDQv9GB0LrQuCDRmNC10LfQuNC6XCJcbiAgICB9LFxuICAgIFwiZ2RcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2NvdHRpc2ggR2FlbGljOyBHYWVsaWNcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHw6BpZGhsaWdcIlxuICAgIH0sXG4gICAgXCJzblwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTaG9uYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImNoaVNob25hXCJcbiAgICB9LFxuICAgIFwic2lcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2luaGFsYSwgU2luaGFsZXNlXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4LeD4LeS4LaC4LeE4La9XCJcbiAgICB9LFxuICAgIFwic2tcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU2xvdmFrXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic2xvdmVuxI1pbmFcIlxuICAgIH0sXG4gICAgXCJzbFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTbG92ZW5lXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic2xvdmVuxaHEjWluYVwiXG4gICAgfSxcbiAgICBcInNvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlNvbWFsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNvb21hYWxpZ2EsIGFmIFNvb21hYWxpXCJcbiAgICB9LFxuICAgIFwic3RcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU291dGhlcm4gU290aG9cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTZXNvdGhvXCJcbiAgICB9LFxuICAgIFwiZXNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3BhbmlzaDsgQ2FzdGlsaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiZXNwYcOxb2wsIGNhc3RlbGxhbm9cIlxuICAgIH0sXG4gICAgXCJzdVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJTdW5kYW5lc2VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJCYXNhIFN1bmRhXCJcbiAgICB9LFxuICAgIFwic3dcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiU3dhaGlsaVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktpc3dhaGlsaVwiXG4gICAgfSxcbiAgICBcInNzXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlN3YXRpXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2lTd2F0aVwiXG4gICAgfSxcbiAgICBcInN2XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlN3ZWRpc2hcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzdmVuc2thXCJcbiAgICB9LFxuICAgIFwidGFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFtaWxcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgrqTgrq7grr/grrTgr41cIlxuICAgIH0sXG4gICAgXCJ0ZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUZWx1Z3VcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgsKTgsYbgsLLgsYHgsJfgsYFcIlxuICAgIH0sXG4gICAgXCJ0Z1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUYWppa1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGC0L7St9C40LrToywgdG/En2lrxKssINiq2KfYrNuM2qnbjOKAjlwiXG4gICAgfSxcbiAgICBcInRoXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRoYWlcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLguYTguJfguKJcIlxuICAgIH0sXG4gICAgXCJ0aVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUaWdyaW55YVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGJteGMjeGIreGKm1wiXG4gICAgfSxcbiAgICBcImJvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlRpYmV0YW4gU3RhbmRhcmQsIFRpYmV0YW4sIENlbnRyYWxcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgvZbgvbzgvZHgvIvgvaHgvbLgvYJcIlxuICAgIH0sXG4gICAgXCJ0a1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUdXJrbWVuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVMO8cmttZW4sINCi0q/RgNC60LzQtdC9XCJcbiAgICB9LFxuICAgIFwidGxcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVGFnYWxvZ1wiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIldpa2FuZyBUYWdhbG9nLCDhnI/hnJLhnIPhnIXhnJQg4ZyG4ZyE4ZyO4ZyT4ZyE4ZyUXCJcbiAgICB9LFxuICAgIFwidG5cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHN3YW5hXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2V0c3dhbmFcIlxuICAgIH0sXG4gICAgXCJ0b1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUb25nYSAoVG9uZ2EgSXNsYW5kcylcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJmYWthIFRvbmdhXCJcbiAgICB9LFxuICAgIFwidHJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHVya2lzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlTDvHJrw6dlXCJcbiAgICB9LFxuICAgIFwidHNcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVHNvbmdhXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiWGl0c29uZ2FcIlxuICAgIH0sXG4gICAgXCJ0dFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUYXRhclwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGC0LDRgtCw0YDRh9CwLCB0YXRhcsOnYSwg2KrYp9iq2KfYsdqG2KfigI5cIlxuICAgIH0sXG4gICAgXCJ0d1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUd2lcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUd2lcIlxuICAgIH0sXG4gICAgXCJ0eVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJUYWhpdGlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlJlbyBUYWhpdGlcIlxuICAgIH0sXG4gICAgXCJ1Z1wiOntcbiAgICAgICAgXCJuYW1lXCI6XCJVaWdodXIsIFV5Z2h1clwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlV5xqN1cnHJmSwg2Kbbh9mK2Lrbh9ix2obbleKAjlwiXG4gICAgfSxcbiAgICBcInVrXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIlVrcmFpbmlhblwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGD0LrRgNCw0ZfQvdGB0YzQutCwXCJcbiAgICB9LFxuICAgIFwidXJcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVXJkdVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItin2LHYr9mIXCJcbiAgICB9LFxuICAgIFwidXpcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVXpiZWtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJ6YmVrLCDQjtC30LHQtdC6LCDYo9uH2LLYqNuQ2YPigI5cIlxuICAgIH0sXG4gICAgXCJ2ZVwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJWZW5kYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlRzaGl2ZW7huJNhXCJcbiAgICB9LFxuICAgIFwidmlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVmlldG5hbWVzZVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlRp4bq/bmcgVmnhu4d0XCJcbiAgICB9LFxuICAgIFwidm9cIjp7XG4gICAgICAgIFwibmFtZVwiOlwiVm9sYXDDvGtcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJWb2xhcMO8a1wiXG4gICAgfSxcbiAgICBcIndhXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldhbGxvb25cIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJXYWxvblwiXG4gICAgfSxcbiAgICBcImN5XCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldlbHNoXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQ3ltcmFlZ1wiXG4gICAgfSxcbiAgICBcIndvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIldvbG9mXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiV29sbG9mXCJcbiAgICB9LFxuICAgIFwiZnlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiV2VzdGVybiBGcmlzaWFuXCIsXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRnJ5c2tcIlxuICAgIH0sXG4gICAgXCJ4aFwiOntcbiAgICAgICAgXCJuYW1lXCI6XCJYaG9zYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImlzaVhob3NhXCJcbiAgICB9LFxuICAgIFwieWlcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiWWlkZGlzaFwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIteZ15nWtNeT15nXqVwiXG4gICAgfSxcbiAgICBcInlvXCI6e1xuICAgICAgICBcIm5hbWVcIjpcIllvcnViYVwiLFxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIllvcsO5YsOhXCJcbiAgICB9LFxuICAgIFwiemFcIjp7XG4gICAgICAgIFwibmFtZVwiOlwiWmh1YW5nLCBDaHVhbmdcIixcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTYcmvIGN1ZcWLxoUsIFNhdyBjdWVuZ2hcIlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvZGF0YS9sYW5ndWFnZXMuanMiLCJpbXBvcnQgeyBmaWx0ZXJUeXBlcyB9IGZyb20gJy4uL3JlZHVjZXJzL2ZpbHRlcic7XG5cbmV4cG9ydCBjb25zdCBhZGRSaWdodCA9IGlkID0+ICh7XG4gICAgdHlwZTogZmlsdGVyVHlwZXMuQUREX1JJR0hULFxuICAgIGlkLFxufSk7XG5cbmV4cG9ydCBjb25zdCByZW1vdmVSaWdodCA9IGlkID0+ICh7XG4gICAgdHlwZTogZmlsdGVyVHlwZXMuUkVNT1ZFX1JJR0hULFxuICAgIGlkLFxufSk7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVDb3VudHJpZXMgPSBjb3VudHJpZXMgPT4gKHtcbiAgICB0eXBlOiBmaWx0ZXJUeXBlcy5VUERBVEVfQ09VTlRSSUVTLFxuICAgIGNvdW50cmllcyxcbn0pO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRXhjbHVzaXZlID0gZXhjbHVzaXZlID0+ICh7XG4gICAgdHlwZTogZmlsdGVyVHlwZXMuVVBEQVRFX0VYQ0xVU0lWRSxcbiAgICBleGNsdXNpdmUsXG59KTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVNwb3J0ID0gc3BvcnQgPT4gKHtcbiAgICB0eXBlOiBmaWx0ZXJUeXBlcy5VUERBVEVfU1BPUlQsXG4gICAgc3BvcnRcbn0pO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlRXZlbnQgPSBldmVudCA9PiAoe1xuICAgIHR5cGU6IGZpbHRlclR5cGVzLlVQREFURV9FVkVOVCxcbiAgICBldmVudFxufSk7XG5cbmV4cG9ydCBjb25zdCBjbGVhckZpbHRlciA9ICgpID0+ICh7XG4gICAgdHlwZTogZmlsdGVyVHlwZXMuQ0xFQVJcbn0pO1xuXG5leHBvcnQgY29uc3QgY2xlYXJVcGRhdGVGaWx0ZXIgPSAoKSA9PiAoe1xuICAgIHR5cGU6IGZpbHRlclR5cGVzLkNMRUFSX1VQREFURVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2FjdGlvbnMvZmlsdGVyQWN0aW9ucy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQge3VwZGF0ZUV2ZW50LCB1cGRhdGVTcG9ydH0gZnJvbSBcIi4uL2FjdGlvbnMvZmlsdGVyQWN0aW9uc1wiO1xuaW1wb3J0IHtlZGl0ZWRQcm9ncmFtU2VsZWN0ZWR9IGZyb20gXCIuLi8uLi9tYWluL2FjdGlvbnMvdXRpbHNcIjtcblxuY2xhc3MgQ29udGVudExpc3RpbmdFdmVudERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldEZpeHR1cmVzID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7c2Vhc29uc30gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIGxldCBmaXh0dXJlcyA9IFtdO1xuXG4gICAgICAgIHNlYXNvbnMuZm9yRWFjaCggcyA9PiB7XG4gICAgICAgICAgICBpZiAoIHMuZml4dHVyZXMgKSBmaXh0dXJlcyA9IFsuLi5maXh0dXJlcywgLi4ucy5maXh0dXJlc11cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZpeHR1cmVzO1xuXG4gICAgfTtcblxuICAgIGdldFNjaGVkdWxlcyA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCB7IHNlYXNvbnMgLCBzY2hlZHVsZXNCeVNlYXNvbn0gPSB0aGlzLnByb3BzO1xuICAgICAgICBsZXQgc2NoZWR1bGVzID0ge1xuICAgICAgICAgICAgcm91bmRzIDogW10sXG4gICAgICAgICAgICBtYXRjaGVzIDogW11cbiAgICAgICAgfTtcbiAgICAgICAgc2Vhc29ucy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgICAgaWYgKHMuc2NoZWR1bGVzKSBPYmplY3QuZW50cmllcyhzLnNjaGVkdWxlcykuZm9yRWFjaCgoc2gpID0+e1xuICAgICAgICAgICAgICAgIGlmIChzaFsxXS5zZWxlY3RlZCAmJiBzY2hlZHVsZXMucm91bmRzLmluZGV4T2Yoc2hbMF0pID09PSAtMSl7XG4gICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlcy5yb3VuZHMucHVzaChzaFswXSk7XG4gICAgICAgICAgICAgICAgICAgIHNoWzFdLm1hdGNoZXMuZm9yRWFjaChtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG0uc2VsZWN0ZWQpIHNjaGVkdWxlcy5tYXRjaGVzLnB1c2gobSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCBzY2hlZHVsZXNCeVNlYXNvbiApe1xuICAgICAgICAgICAgc2NoZWR1bGVzQnlTZWFzb24uZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocyAmJiBPYmplY3QuZW50cmllcyhzKSkgT2JqZWN0LmVudHJpZXMocykuZm9yRWFjaCgoc2gpID0+e1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZWR1bGVzLnJvdW5kcy5pbmRleE9mKHNoWzBdKSA9PT0gLTEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVzLnJvdW5kcy5wdXNoKHNoWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoWzFdLm1hdGNoZXMuZm9yRWFjaChtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtLnNlbGVjdGVkKSBzY2hlZHVsZXMubWF0Y2hlcy5wdXNoKG0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2NoZWR1bGVzXG4gICAgfTtcblxuICAgIHNob3dQcm9ncmFtSW5mbyA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCB7cmlnaHRzUGFja2FnZSwgUFJPR1JBTV9OQU1FfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGxldCBzaG93ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHJpZ2h0c1BhY2thZ2UubGVuZ3RoID4gMSkgcmV0dXJuIHNob3c7XG4gICAgICAgIHNob3cgPSBlZGl0ZWRQcm9ncmFtU2VsZWN0ZWQocmlnaHRzUGFja2FnZSk7XG4gICAgICAgIHJldHVybiBzaG93ICYmIFBST0dSQU1fTkFNRTtcblxuICAgIH07XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHNwb3J0cyxcbiAgICAgICAgICAgIHNwb3J0Q2F0ZWdvcnksXG4gICAgICAgICAgICBjdXN0b21Ub3VybmFtZW50LFxuICAgICAgICAgICAgY3VzdG9tQ2F0ZWdvcnksXG4gICAgICAgICAgICBjdXN0b21JZCxcbiAgICAgICAgICAgIHRvdXJuYW1lbnQsXG4gICAgICAgICAgICBzZWFzb25zLFxuICAgICAgICAgICAgc2hvd0N1c3RvbUlkLFxuICAgICAgICAgICAgUFJPR1JBTV9ZRUFSLFxuICAgICAgICAgICAgUFJPR1JBTV9FUElTT0RFUyxcbiAgICAgICAgICAgIGlzRnJhZ21lbnRcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgbGV0IHNjaGVkdWxlcyA9IHRoaXMuZ2V0U2NoZWR1bGVzKCk7XG4gICAgICAgIGxldCByb3VuZHMgPSBzY2hlZHVsZXMucm91bmRzO1xuICAgICAgICBsZXQgbWF0Y2hlcyA9IHNjaGVkdWxlcy5tYXRjaGVzO1xuICAgICAgICBsZXQgc2Vhc29uVGl0bGUgPSAoIHNlYXNvbnMubGVuZ3RoID4gMSApID8gXCJTZWFzb25zOiBcIiA6IFwiU2Vhc29uOiBcIjtcbiAgICAgICAgbGV0IHNlYXNvbk5hbWUgPSAgc2Vhc29uVGl0bGUgKyBzZWFzb25zLm1hcChzZWFzb24gPT4gKHNlYXNvbi55ZWFyKSkuam9pbihcIiwgXCIpO1xuICAgICAgICBsZXQgcm91bmRzVGl0bGUgPSAoIHJvdW5kcy5sZW5ndGggPiAxICkgPyBcIlJvdW5kczogXCIgOiBcIlJvdW5kOiBcIjtcbiAgICAgICAgbGV0IHJvdW5kc05hbWUgPSAgcm91bmRzVGl0bGUgKyByb3VuZHMuam9pbihcIiwgXCIpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0aW5nLWF0dHJpYnV0ZXMgY29sXCI+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3RpbmctaXRlbSBldmVudFwiPlxuICAgICAgICAgICAgICAgICAgICB7LypTcG9ydCBuYW1lKi99XG4gICAgICAgICAgICAgICAgICAgIHtzcG9ydHMgJiYgc3BvcnRzLmxlbmd0aCA9PT0gMSAmJiA8c3Bhbj57c3BvcnRzWzBdLm5hbWV9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAge3Nwb3J0cyAmJiBzcG9ydHMubGVuZ3RoID4gMSAmJiA8c3Bhbj5NdWx0aXBsZSBTcG9ydHM8L3NwYW4+fVxuXG4gICAgICAgICAgICAgICAgICAgIHsvKlNwb3J0IGNhdGVnb3J5Ki99XG4gICAgICAgICAgICAgICAgICAgIHtzcG9ydENhdGVnb3J5ICYmIHNwb3J0Q2F0ZWdvcnkubGVuZ3RoID4gMCAmJiA8c3Bhbj57c3BvcnRDYXRlZ29yeVswXS5uYW1lfTwvc3Bhbj4gfVxuICAgICAgICAgICAgICAgICAgICB7Y3VzdG9tQ2F0ZWdvcnkgJiYgPHNwYW4+e2N1c3RvbUNhdGVnb3J5fTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3RpbmctaXRlbSBldmVudFwiPlxuICAgICAgICAgICAgICAgICAgICB7LypUb3VybmFtZW50IG5hbWUqL31cbiAgICAgICAgICAgICAgICAgICAge3RvdXJuYW1lbnQgJiYgdG91cm5hbWVudC5sZW5ndGggPiAwICYmIDxzcGFuPnt0b3VybmFtZW50WzBdLm5hbWV9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICAgICAge2N1c3RvbVRvdXJuYW1lbnQgJiYgIWN1c3RvbUlkICYmIDxzcGFuPntjdXN0b21Ub3VybmFtZW50fTwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgIHt0b3VybmFtZW50ICYmIHRvdXJuYW1lbnQubGVuZ3RoID09PSAwICYmICFjdXN0b21Ub3VybmFtZW50ICYmIDxzcGFuPkdlbmVyYWwgY29udGVudDwvc3Bhbj59XG5cbiAgICAgICAgICAgICAgICAgICAgey8qU2Vhc29uIG5hbWUqL31cbiAgICAgICAgICAgICAgICAgICAge3NlYXNvbnMgJiYgc2Vhc29ucy5sZW5ndGggPiAwICYmIHNlYXNvbk5hbWV9XG5cbiAgICAgICAgICAgICAgICAgICAgey8qUmVsZWFzZSovfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zaG93UHJvZ3JhbUluZm8oKSAmJiBQUk9HUkFNX1lFQVIgJiYgPHNwYW4+e1BST0dSQU1fWUVBUn08L3NwYW4+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0aW5nLWl0ZW0gZXZlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgey8qUm91bmQgbmFtZSovfVxuICAgICAgICAgICAgICAgICAgICB7cm91bmRzLmxlbmd0aCA9PT0gMSAmJiA8c3Bhbj57cm91bmRzTmFtZX08L3NwYW4+fVxuICAgICAgICAgICAgICAgICAgICB7cm91bmRzLmxlbmd0aCA+IDEgJiYgPHNwYW4+TXVsdGlwbGUgcm91bmRzPC9zcGFuPn1cblxuICAgICAgICAgICAgICAgICAgICB7LypNYXRjaGVzKi99XG4gICAgICAgICAgICAgICAgICAgIHttYXRjaGVzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzWzBdLmNvbXBldGl0b3JzLm1hcCgoIGNvbXBldGl0b3IsIGksIGxpc3QpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtpfT57Y29tcGV0aXRvci5uYW1lfSB7KGxpc3QubGVuZ3RoICE9PSBpICsgMSkgJiYgXCIgdnMgXCIgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgfSl9XG5cbiAgICAgICAgICAgICAgICAgICAgey8qU3VtbWFyaXplcyB0d28gdHlwZXM6IHJvdW5kcyBhbmQgbWF0Y2hlcyovfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRGaXh0dXJlcygpLmxlbmd0aCA+IDEgJiYgdGhpcy5nZXRGaXh0dXJlcygpLmxlbmd0aCArJyBmaXh0dXJlcyd9XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldEZpeHR1cmVzKCkubGVuZ3RoID09PSAxICYmIHRoaXMuZ2V0Rml4dHVyZXMoKVswXS5uYW1lfVxuXG4gICAgICAgICAgICAgICAgICAgIHsvKkVwaXNvZGVzKi99XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnNob3dQcm9ncmFtSW5mbygpICYmIFBST0dSQU1fRVBJU09ERVMgJiYgPHNwYW4+e1BST0dSQU1fRVBJU09ERVN9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IENvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbXBvbmVudHMvQ29udGVudExpc3RpbmdFdmVudERldGFpbHMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtibHVlQ2hlY2tJY29uLCB5ZWxsb3dDaGVja0ljb259IGZyb20gXCIuLi8uLi9tYWluL2NvbXBvbmVudHMvSWNvbnNcIjtcblxuY29uc3QgQ29udGVudExpc3RpbmdSaWdodHNQYWNrYWdlID0gKHtyaWdodHNQYWNrYWdlLCBwcm9ncmFtTmFtZX0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3RpbmctcmlnaHRzIGNvbFwiPlxuICAgICAgICAgICAge3JpZ2h0c1BhY2thZ2UubWFwKChzciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJsaXN0aW5nLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHshc3IuZXhjbHVzaXZlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHN0eWxlPXt7d2lkdGg6IDIzLCBoZWlnaHQ6IDIyLCBtYXJnaW46ICcwIDVweCd9fSBzcmM9e2JsdWVDaGVja0ljb259Lz59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzci5leGNsdXNpdmUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3t3aWR0aDogMjMsIGhlaWdodDogMjIsIG1hcmdpbjogJzAgNXB4J319IHNyYz17eWVsbG93Q2hlY2tJY29ufS8+fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiBcInJvd1wifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NyLnNob3J0TGFiZWwgIT09IFwiUFJcIiAmJiBzci5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzci5zaG9ydExhYmVsID09PSBcIlBSXCIgJiYgcHJvZ3JhbU5hbWUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlByb2dyYW06IFwiICsgcHJvZ3JhbU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NyLmV4Y2x1c2l2ZSAmJiA8c3BhbiBzdHlsZT17e2ZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luTGVmdDogM319PiBFWDwvc3Bhbj59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250ZW50TGlzdGluZ1JpZ2h0c1BhY2thZ2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29tcG9uZW50cy9Db250ZW50TGlzdGluZ1JpZ2h0c1BhY2thZ2UuanMiLCJcbmV4cG9ydCBjb25zdCBmaWx0ZXJUeXBlcz0ge1xuICAgIEFERF9SSUdIVDonQUREX1JJR0hUJyxcbiAgICBSRU1PVkVfUklHSFQgOiAnUkVNT1ZFX1JJR0hUJyxcbiAgICBVUERBVEVfQ09VTlRSSUVTIDogJ1VQREFURV9DT1VOVFJJRVMnLFxuICAgIFVQREFURV9FWENMVVNJVkUgOiAnVVBEQVRFX0VYQ0xVU0lWRScsXG4gICAgVVBEQVRFX1NQT1JUIDogJ1VQREFURV9TUE9SVCcsXG4gICAgVVBEQVRFX0VWRU5UIDogJ1VQREFURV9FVkVOVCcsXG4gICAgQ0xFQVIgOiAnQ0xFQVInLFxuICAgIENMRUFSX1VQREFURSA6ICdDTEVBUl9VUERBVEUnLFxufTtcblxuY29uc3QgZGVmYXVsdEZpbHRlciA9IHtcbiAgICByaWdodHM6IFtdLFxuICAgIGNvdW50cmllczogW10sXG4gICAgZXhjbHVzaXZlIDogZmFsc2UsXG4gICAgc3BvcnQ6IHtcbiAgICAgICAgdmFsdWUgOiBudWxsLFxuICAgICAgICBsYWJlbCA6IFwiQWxsIHNwb3J0c1wiXG4gICAgfSxcbiAgICBldmVudCA6IFwiXCIsXG4gICAgZm9yY2VVcGRhdGUgOiB0cnVlXG5cbn07XG5cbmV4cG9ydCBjb25zdCBmaWx0ZXIgPSAoc3RhdGUgPSBkZWZhdWx0RmlsdGVyLCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5DTEVBUjpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGVmYXVsdEZpbHRlcik7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuQ0xFQVJfVVBEQVRFOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZm9yY2VVcGRhdGU6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5BRERfUklHSFQ6XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcbiAgICAgICAgICAgICAgICByaWdodHM6IFsuLi5zdGF0ZS5yaWdodHMsIGFjdGlvbi5pZF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlJFTU9WRV9SSUdIVDpcblxuICAgICAgICAgICAgbGV0IGluZGV4ID0gc3RhdGUucmlnaHRzLmluZGV4T2YoYWN0aW9uLmlkKTtcbiAgICAgICAgICAgIHN0YXRlLnJpZ2h0cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgcmlnaHRzOiBbLi4uc3RhdGUucmlnaHRzXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0NPVU5UUklFUzpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGNvdW50cmllczogYWN0aW9uLmNvdW50cmllc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0VYQ0xVU0lWRTpcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgICAgIGV4Y2x1c2l2ZTogYWN0aW9uLmV4Y2x1c2l2ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX1NQT1JUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgc3BvcnQ6IGFjdGlvbi5zcG9ydFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX0VWRU5UOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IGFjdGlvbi5ldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvZmlsdGVyLmpzIiwiZXhwb3J0IGNvbnN0IGdldEN1cnJlbmN5U3ltYm9sID0gY29kZSA9PiB7XG4gICAgcmV0dXJuIChjb2RlID09PSBcIkVVUlwiKSA/IFwi4oKsXCIgOiBcIiRcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBnb1RvID0gKHJvdXRlLCBvcGVuTmV3KSA9PiB7XG5cbiAgICBpZiAob3Blbk5ldykge1xuICAgICAgICB3aW5kb3cub3BlbihlbnZob3N0dXJsICsgcm91dGUsIFwiX2JsYW5rXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZW52aG9zdHVybCArIHJvdXRlXG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGhpc3RvcnlHb1RvID0gKHJvdXRlKSA9PiB7XG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIGVudmhvc3R1cmwrcm91dGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdvVG9MaXN0aW5nID0gKGlkLCBvcGVuTmV3KSA9PiB7XG4gICAgZ29UbyhcImxpc3RpbmcvXCIrIGlkLCBvcGVuTmV3KVxufTtcblxuZXhwb3J0IGNvbnN0IHZpZXdMaWNlbnNlID0gaWQgPT4ge1xuICAgIGdvVG8oXCJsaWNlbnNlL3ByZXZpZXcvXCIrIGlkKVxufTtcblxuZXhwb3J0IGNvbnN0IHZpZXdMaWNlbnNlQmlkID0gaWQgPT4ge1xuICAgIGdvVG8oXCJsaWNlbnNlL2JpZC9cIisgaWQpXG59O1xuXG5leHBvcnQgY29uc3Qgdmlld0xpY2Vuc2VCdW5kbGUgPSAoaWQsIGxpc3RpbmdJZCkgPT4ge1xuICAgIGdvVG8oXCJsaWNlbnNlL2J1bmRsZS9cIisgaWQgKyBcIi9cIiArIGxpc3RpbmdJZClcbn07XG5cbmV4cG9ydCBjb25zdCB2aWV3TGljZW5zZUN1c3RvbSA9IChsaXN0aW5nSWQsIGJ1bmRsZUlkLCBiaWQpID0+IHtcblxuICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uKG9iaiwgcHJlZml4KSB7XG4gICAgICAgIHZhciBzdHIgPSBbXSxcbiAgICAgICAgICAgIHA7XG4gICAgICAgIGZvciAocCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgayA9IHByZWZpeCA/IHByZWZpeCArIFwiW1wiICsgcCArIFwiXVwiIDogcCxcbiAgICAgICAgICAgICAgICAgICAgdiA9IG9ialtwXTtcbiAgICAgICAgICAgICAgICBzdHIucHVzaCgodiAhPT0gbnVsbCAmJiB0eXBlb2YgdiA9PT0gXCJvYmplY3RcIikgP1xuICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemUodiwgaykgOlxuICAgICAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoaykgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTtcbiAgICB9O1xuXG4gICAgLy9sZXQgcXVlcnlTdHJpbmcgPSBPYmplY3Qua2V5cyhidW5kbGUpLm1hcChrZXkgPT4ga2V5ICsgJz0nICsgYnVuZGxlW2tleV0pLmpvaW4oJyYnKTtcbiAgICBnb1RvKFwibGljZW5zZS9jdXN0b20vXCIgKyBsaXN0aW5nSWQgKyBcIi9cIiArIGJ1bmRsZUlkICsgXCI/XCIgKyBzZXJpYWxpemUoe2JpZDogYmlkfSkgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnb1RvTWFya2V0cGxhY2UgPSAoKSA9PiB7XG4gICAgZ29UbyhcIm1hcmtldHBsYWNlXCIpXG59O1xuXG5leHBvcnQgY29uc3QgZ29Ub0Nsb3NlZERlYWxzID0gKCkgPT4ge1xuICAgIGdvVG8oXCJjbG9zZWRkZWFsc1wiKVxufTtcblxuZXhwb3J0IGNvbnN0IGdldEZlZSA9IChzYWxlc1BhY2thZ2UpID0+IHtcbiAgICBjb25zdCBmZWVOdW1iZXIgPSBwYXJzZUZsb2F0KHNhbGVzUGFja2FnZS5mZWUpO1xuICAgIHJldHVybiBmZWVOdW1iZXIudG9Mb2NhbGVTdHJpbmcoKSArXCIgXCIgKyBnZXRDdXJyZW5jeVN5bWJvbChzYWxlc1BhY2thZ2UuY3VycmVuY3kuY29kZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RnVsbE5hbWUgPSAodXNlcikgPT4ge1xuICAgIHJldHVybiB1c2VyLmZpcnN0TmFtZSArIFwiIFwiICsgdXNlci5sYXN0TmFtZTtcbn07XG5cbmV4cG9ydCBjb25zdCBsaW1pdFRleHQgPSAodHh0LCBsaW1pdCA9IDI1KSA9PiB7XG4gICAgcmV0dXJuICh0eHQubGVuZ3RoID4gbGltaXQpID8gdHh0LnN1YnN0cmluZygwLGxpbWl0KSArIFwiLi4uXCIgOiB0eHRcbn07XG5cbmV4cG9ydCBjb25zdCBlZGl0ZWRQcm9ncmFtU2VsZWN0ZWQgPSAocmlnaHRzKSA9PiB7XG4gICAgcmV0dXJuIHJpZ2h0cy5maWx0ZXIocj0+ci5zaG9ydExhYmVsID09PSAnUFInKS5sZW5ndGggPT09IDFcbn07XG5cbmV4cG9ydCBjb25zdCBwYXJzZVNlYXNvbnMgPSAoY29udGVudCkgPT4ge1xuICAgIGlmIChjb250ZW50LnNlYXNvbnMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGNvbnRlbnQ7XG4gICAgY29udGVudC5zZWFzb25zLmZvckVhY2goKHNlYXNvbik9PntcbiAgICAgICAgc2Vhc29uLnNlbGVjdGVkU2NoZWR1bGVzID0ge307XG5cbiAgICAgICAgaWYgKHNlYXNvbi5zY2hlZHVsZXMgPT09IHVuZGVmaW5lZCApIHJldHVybjtcblxuICAgICAgICBPYmplY3QuZW50cmllcyggc2Vhc29uLnNjaGVkdWxlcykuZmlsdGVyKChyb3VuZCkgPT57XG4gICAgICAgICAgICBpZiAoICFyb3VuZCB8fCByb3VuZC5sZW5ndGggPD0gMSApIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiByb3VuZFsxXS5zZWxlY3RlZFxuICAgICAgICB9KS5tYXAoKHJvdW5kKT0+e1xuICAgICAgICAgICAgaWYgKCFzZWFzb24uc2VsZWN0ZWRTY2hlZHVsZXNbcm91bmRbMF1dKSBzZWFzb24uc2VsZWN0ZWRTY2hlZHVsZXNbcm91bmRbMF1dID0ge21hdGNoZXM6W119O1xuICAgICAgICAgICAgaWYocm91bmRbMV0uc2VsZWN0ZWQpe1xuICAgICAgICAgICAgICAgIEFycmF5LmZyb20ocm91bmRbMV0ubWF0Y2hlcy52YWx1ZXMoKSkuZmlsdGVyKG1hdGNoID0+IG1hdGNoLnNlbGVjdGVkKS5mb3JFYWNoKChtYXRjaCk9PntcbiAgICAgICAgICAgICAgICAgICAgc2Vhc29uLnNlbGVjdGVkU2NoZWR1bGVzW3JvdW5kWzBdXS5tYXRjaGVzLnB1c2gobWF0Y2gpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIHJldHVybiBjb250ZW50O1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2FjdGlvbnMvdXRpbHMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE1vbWVudCBmcm9tIFwibW9tZW50L21vbWVudFwiO1xuaW1wb3J0IFJlYWN0VGFibGUgZnJvbSBcInJlYWN0LXRhYmxlXCI7XG5pbXBvcnQgTW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xuXG5pbXBvcnQgRGlnaXRhbFNpZ25hdHVyZSBmcm9tIFwiLi4vLi4vbWFpbi9jb21wb25lbnRzL0RpZ2l0YWxTaWduYXR1cmVcIjtcbmltcG9ydCB7Z2V0Q3VycmVuY3lTeW1ib2wsIGdldEZlZSwgbGltaXRUZXh0LCB2aWV3TGljZW5zZUJpZH0gZnJvbSBcIi4uL2FjdGlvbnMvdXRpbHNcIjtcbmltcG9ydCB7YWRkSWNvbiwgYmlkSWNvbiwgYmx1ZUNoZWNrSWNvbiwgYmx1ZUVudmVsb3BlSWNvbiwgYnVja2V0SWNvbiwgY2FuY2VsSWNvbiwgZG9jSWNvbiwgZml4ZWRJY29ufSBmcm9tIFwiLi9JY29uc1wiO1xuaW1wb3J0IHtjdXN0b21TdHlsZXMsIEdlbmVyaWNNb2RhbFN0eWxlfSBmcm9tIFwiLi4vc3R5bGVzL2N1c3RvbVwiO1xuaW1wb3J0IFNlbmRNZXNzYWdlIGZyb20gXCIuLi8uLi9tYWluL2NvbXBvbmVudHMvU2VuZE1lc3NhZ2VcIjtcblxuY2xhc3MgQ29tbWVyY2lhbFNhbGVzQnVuZGxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBhcHByb3ZlTW9kYWxJc09wZW4gOiBmYWxzZSxcbiAgICAgICAgICAgIHJlamVjdE1vZGFsSXNPcGVuIDogZmFsc2UsXG4gICAgICAgICAgICByZW1vdmVNb2RhbElzT3BlbiA6IGZhbHNlLFxuICAgICAgICAgICAgc2hvd0JpZHMgOiBwcm9wcy5iaWRzT3BlblxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzICgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZW1vdmVNb2RhbElzT3BlbiA6IGZhbHNlLCBzYXZpbmcgOiBmYWxzZX0pO1xuICAgIH1cblxuICAgIGFjY2VwdEJpZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qge3NpZ25hdHVyZX0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7Y29udGVudElkfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGxldCBzZWxlY3RlZEJpZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRCaWQ7XG4gICAgICAgIHNlbGVjdGVkQmlkLmNvbnRlbnQgPSBjb250ZW50SWQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NhdmluZyA6IHRydWV9KTtcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuYWNjZXB0QmlkKHNlbGVjdGVkQmlkLCBzaWduYXR1cmUpLmRvbmUocmVzcG9uc2U9PntcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FwcHJvdmVNb2RhbElzT3BlbiA6IGZhbHNlLCBzYXZpbmcgOiBmYWxzZX0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblVwZGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICByZW1vdmVCaWQgPSAoKSA9PiB7XG4gICAgICAgIGxldCBzZWxlY3RlZEJpZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRCaWQ7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NhdmluZyA6IHRydWV9KTtcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkucmVtb3ZlQmlkKHNlbGVjdGVkQmlkKS5kb25lKHJlc3BvbnNlPT57XG4gICAgICAgICAgICAvL3RoaXMuc2V0U3RhdGUoe3JlbW92ZU1vZGFsSXNPcGVuIDogZmFsc2UsIHNhdmluZyA6IGZhbHNlfSlcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25VcGRhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgcmVqZWN0QmlkID0gKCkgPT4ge1xuICAgICAgICBsZXQgc2VsZWN0ZWRCaWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkQmlkO1xuICAgICAgICBzZWxlY3RlZEJpZC5tZXNzYWdlID0gdGhpcy5zdGF0ZS5tZXNzYWdlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzYXZpbmcgOiB0cnVlfSk7XG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnJlamVjdEJpZChzZWxlY3RlZEJpZCkuYWx3YXlzKHJlc3BvbnNlPT57XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWplY3RNb2RhbElzT3BlbiA6IGZhbHNlLCBzYXZpbmcgOiBmYWxzZX0pO1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblVwZGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBjbG9zZVJlbW92ZU1vZGFsID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZW1vdmVNb2RhbElzT3BlbiA6IGZhbHNlfSlcbiAgICB9O1xuXG4gICAgY2xvc2VBcHByb3ZlTW9kYWwgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FwcHJvdmVNb2RhbElzT3BlbiA6IGZhbHNlfSlcbiAgICB9O1xuXG4gICAgY2xvc2VSZWplY3RNb2RhbCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVqZWN0TW9kYWxJc09wZW4gOiBmYWxzZX0pXG4gICAgfTtcblxuICAgIHJlbmRlckFwcHJvdmVNb2RhbCA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCB7c2FsZXNCdW5kbGV9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3Qge3NpZ25hdHVyZSwgc2F2aW5nfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIDxNb2RhbFxuICAgICAgICAgICAgaXNPcGVuPXt0aGlzLnN0YXRlLmFwcHJvdmVNb2RhbElzT3Blbn1cbiAgICAgICAgICAgIG9uUmVxdWVzdENsb3NlPXt0aGlzLmNsb3NlQXBwcm92ZU1vZGFsfVxuICAgICAgICAgICAgYm9keU9wZW5DbGFzc05hbWU9e1wiZ2VuZXJpYy1tb2RhbFwifVxuICAgICAgICAgICAgc3R5bGU9e0dlbmVyaWNNb2RhbFN0eWxlfVxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJnZW5lcmljLW1vZGFsLWNvbnRhaW5lclwifT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBhY2NlcHQgdGhpcyBiaWQ/XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8RGlnaXRhbFNpZ25hdHVyZSBzaWduYXR1cmU9e3NpZ25hdHVyZX0gb25SZWFkeT17c2lnbmF0dXJlID0+IHsgdGhpcy5zZXRTdGF0ZSh7c2lnbmF0dXJlfSkgfX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImJ1dHRvbnNcIn0+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5jbG9zZUFwcHJvdmVNb2RhbH0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIHshc2F2aW5nICYmIDxidXR0b24gY2xhc3NOYW1lPXtcImNvbmZpcm1cIn0gZGlzYWJsZWQ9eyFzaWduYXR1cmV9IG9uQ2xpY2s9e3RoaXMuYWNjZXB0QmlkfT5BY2NlcHQgQmlkPC9idXR0b24+fVxuICAgICAgICAgICAgICAgICAgICB7c2F2aW5nICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLXNwaW4gZmEtY29nXCIvPn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01vZGFsPlxuICAgIH07XG5cbiAgICByZW5kZXJSZWplY3RNb2RhbCA9ICgpID0+IHtcblxuICAgICAgICBjb25zdCB7c2FsZXNCdW5kbGV9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3Qge3NhdmluZywgbWVzc2FnZX0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIHJldHVybiA8TW9kYWxcbiAgICAgICAgICAgIGlzT3Blbj17dGhpcy5zdGF0ZS5yZWplY3RNb2RhbElzT3Blbn1cbiAgICAgICAgICAgIG9uUmVxdWVzdENsb3NlPXt0aGlzLmNsb3NlUmVqZWN0TW9kYWx9XG4gICAgICAgICAgICBib2R5T3BlbkNsYXNzTmFtZT17XCJnZW5lcmljLW1vZGFsXCJ9XG4gICAgICAgICAgICBzdHlsZT17R2VuZXJpY01vZGFsU3R5bGV9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImdlbmVyaWMtbW9kYWwtY29udGFpbmVyXCJ9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlY2xpbmUgdGhpcyBiaWQ/XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICBFbnRlciBNZXNzYWdlIChvcHRpb25hbClcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIG9uQ2hhbmdlPXsoZSk9Pnt0aGlzLnNldFN0YXRlKHttZXNzYWdlOiBlLnRhcmdldC52YWx1ZX0pfX0gdmFsdWU9e21lc3NhZ2V9PlxuICAgICAgICAgICAgICAgICAgICA8L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiYnV0dG9uc1wifT5cblxuICAgICAgICAgICAgICAgICAgICB7IXNhdmluZyAmJiA8YnV0dG9uIGNsYXNzTmFtZT17XCJjb25maXJtXCJ9IG9uQ2xpY2s9e3RoaXMucmVqZWN0QmlkfT5Db25maXJtPC9idXR0b24+fVxuICAgICAgICAgICAgICAgICAgICB7c2F2aW5nICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLXNwaW4gZmEtY29nXCIvPn1cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNsb3NlUmVqZWN0TW9kYWx9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvTW9kYWw+XG4gICAgfTtcblxuICAgIHJlbmRlclJlbW92ZU1vZGFsID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHtzYXZpbmd9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gPE1vZGFsXG4gICAgICAgICAgICBpc09wZW49e3RoaXMuc3RhdGUucmVtb3ZlTW9kYWxJc09wZW59XG4gICAgICAgICAgICBvblJlcXVlc3RDbG9zZT17dGhpcy5jbG9zZVJlbW92ZU1vZGFsfVxuICAgICAgICAgICAgYm9keU9wZW5DbGFzc05hbWU9e1wiZ2VuZXJpYy1tb2RhbFwifVxuICAgICAgICAgICAgc3R5bGU9e0dlbmVyaWNNb2RhbFN0eWxlfVxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJnZW5lcmljLW1vZGFsLWNvbnRhaW5lclwifT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZW1vdmUgdGhpcyBiaWQ/XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiYnV0dG9uc1wifT5cblxuICAgICAgICAgICAgICAgICAgICB7IXNhdmluZyAmJiA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVtb3ZlQmlkfSBjbGFzc05hbWU9e1wiY29uZmlybVwifT5Db25maXJtPC9idXR0b24+fVxuICAgICAgICAgICAgICAgICAgICB7c2F2aW5nICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLXNwaW4gZmEtY29nXCIvPn1cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNsb3NlUmVtb3ZlTW9kYWx9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvTW9kYWw+XG4gICAgfTtcblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7IHNhbGVzQnVuZGxlLCBjb21wYW55LCBvbkRlbGV0ZSwgY29udGVudElkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IHNob3dCaWRzIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGxldCBjbG9zZWREZWFscyA9IHNhbGVzQnVuZGxlLmJpZHMuZmlsdGVyKGI9PmIuc3RhdHVzLm5hbWUgPT09IFwiQVBQUk9WRURcIik7XG4gICAgICAgIGxldCB0b3RhbEZlZSA9IChjbG9zZWREZWFscy5sZW5ndGggPiAwKSA/IGNsb3NlZERlYWxzLm1hcChiPT5OdW1iZXIoYi50b3RhbEZlZSkpLnJlZHVjZSgodCxuKT0+dCtuKSA6IG51bGw7XG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVyY2lhbC1zYWxlcy1idW5kbGVzXCI+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQXBwcm92ZU1vZGFsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUmVqZWN0TW9kYWwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJSZW1vdmVNb2RhbCgpfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVyY2lhbC1zYWxlcy1idW5kbGVzLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNhbGVzLWJ1bmRsZS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2FsZXNCdW5kbGUuYnVuZGxlTWV0aG9kID09PSBcIlNFTExfQVNfQlVORExFXCIgJiY8aW1nIHN0eWxlPXt7d2lkdGg6IDI2LCBoZWlnaHQ6IDIzfX0gc3JjPXtmaXhlZEljb259Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2FsZXNCdW5kbGUubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzYWxlcy1idW5kbGUtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3NhbGVzQnVuZGxlLmZlZSA+IDAgJiYgZ2V0RmVlKHNhbGVzQnVuZGxlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYWxlc0J1bmRsZS5zYWxlc01ldGhvZCA9PT0gXCJCSURESU5HXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmPGltZyBzdHlsZT17e3dpZHRoOiAyMywgaGVpZ2h0OiAyM319IHNyYz17YmlkSWNvbn0vPn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzYWxlcy1idW5kbGUtaXRlbS1yaWdodFwiIHN0eWxlPXt7bWFyZ2luTGVmdDogJ2F1dG8nfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2xvc2VkRGVhbHMubGVuZ3RofSBjbG9zZWQgRGVhbHNcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzYWxlcy1idW5kbGUtaXRlbS1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3NhbGVzQnVuZGxlLmJpZHMuZmlsdGVyKGI9PmIuc3RhdHVzLm5hbWUgPT09IFwiUEVORElOR1wiKS5sZW5ndGh9IG9wZW4gYmlkc1xuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7dG90YWxGZWUgJiYgPGRpdiBjbGFzc05hbWU9XCJzYWxlcy1idW5kbGUtaXRlbS1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RvdGFsRmVlfSB7Z2V0Q3VycmVuY3lTeW1ib2woc2FsZXNCdW5kbGUuY3VycmVuY3kuY29kZSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cblxuICAgICAgICAgICAgICAgICAgICB7c2FsZXNCdW5kbGUuYmlkcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2FsZXMtYnVuZGxlLXNob3ctYmlkc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+e3RoaXMuc2V0U3RhdGUoe3Nob3dCaWRzOiAhc2hvd0JpZHN9KX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyFzaG93QmlkcyAmJiA8aW1nIHNyYz17YWRkSWNvbn0vPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93QmlkcyAmJiA8aW1nIHNyYz17Y2FuY2VsSWNvbn0vPn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtzaG93QmlkcyAmJiBzYWxlc0J1bmRsZS5iaWRzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c2FsZXNCdW5kbGUuYmlkcy5tYXAoKGIpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFNlbmRNZXNzYWdlIHJvbGU9eydTRUxMRVInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9e1wibWVzc2FnZVBvcHVwXCIgKyBiLmlkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGluZ0lkPXtjb250ZW50SWR9IHJlY2lwaWVudD17Yi5idXllclVzZXIuY29tcGFueX0vPlxuICAgICAgICAgICAgICAgICAgICB9KX1cblxuICAgICAgICAgICAgICAgICAgICA8UmVhY3RUYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcImNhLXRhYmxlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UGFnZVNpemU9ezMwfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1BhZ2VTaXplT3B0aW9ucz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93UGFnaW5hdGlvbj17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2U9e3RoaXMub25QYWdlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWluUm93cz17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtzYWxlc0J1bmRsZS5iaWRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0PXt0aGlzLnByb3BzLnNlbGVjdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM9e1t7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6IGQgPT4ge3JldHVybiBkLmJ1eWVyVXNlci5jb21wYW55LmxlZ2FsTmFtZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdCdXllcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1iaWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItYmlnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA6IFwiY29tcGFueVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ0ZlZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwicHJpY2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogZCA9PiB7cmV0dXJuIHtmZWU6IGQudG90YWxGZWUsIGN1cnJlbmN5OiBzYWxlc0J1bmRsZS5jdXJyZW5jeS5jb2RlfX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdiBjbGFzc05hbWU9e1wiYmx1ZVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLmZlZSArIFwiIFwiICsgZ2V0Q3VycmVuY3lTeW1ib2wocHJvcHMudmFsdWUuY3VycmVuY3kpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ1VzZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItYmlnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyLWJpZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICdidXllclVzZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS5maXJzdE5hbWUgKyBcIiBcIiArIHByb3BzLnZhbHVlLmxhc3ROYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdBY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiAnc3RhdHVzLm5hbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZSA9PT0gXCJBUFBST1ZFRFwiICYmIFwiQ2xvc2VkIERlYWxcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlID09PSBcIlBFTkRJTkdcIiAmJiBcIkJpZCBQbGFjZWRcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlID09PSBcIlJFSkVDVEVEXCIgJiYgXCJCaWQgRGVjbGluZWRcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAnQWN0aW9uIGRhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiAnY3JlYXRlZEF0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZWxsOiBwcm9wcyA9PiA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7TW9tZW50KHByb3BzLnZhbHVlKS5mb3JtYXQoJ0REL01NL1lZWVknKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgOiBcImFjdGlvbnNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogYiA9PiB7cmV0dXJuIHtzdGF0dXM6IGIuc3RhdHVzLm5hbWUsIGJpZDogYn19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXYgY2xhc3NOYW1lPXtcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLnN0YXR1cyA9PT0gXCJSRUpFQ1RFRFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiA8aW1nIHN0eWxlPXt7bWFyZ2luOicwIDEwcHgnLCBjdXJzb3I6ICdwb2ludGVyJ319IG9uQ2xpY2s9eygpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2V0U3RhdGUoe3JlbW92ZU1vZGFsSXNPcGVuOnRydWUsIHNlbGVjdGVkQmlkIDogcHJvcHMudmFsdWUuYmlkfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93UmVtb3ZlQ29uZmlybTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBzcmM9e2J1Y2tldEljb259Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS5zdGF0dXMgPT09IFwiUEVORElOR1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiA8aW1nIHN0eWxlPXt7bWFyZ2luOicwIDEwcHgnLCBjdXJzb3I6ICdwb2ludGVyJ319IG9uQ2xpY2s9eygpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YXBwcm92ZU1vZGFsSXNPcGVuOnRydWUsIHNlbGVjdGVkQmlkIDogcHJvcHMudmFsdWUuYmlkfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IHNyYz17Ymx1ZUNoZWNrSWNvbn0vPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLnN0YXR1cyA9PT0gXCJQRU5ESU5HXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIDxpbWcgc3R5bGU9e3ttYXJnaW46JzAgMTBweCcsIGN1cnNvcjogJ3BvaW50ZXInfX0gb25DbGljaz17KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3JlamVjdE1vZGFsSXNPcGVuOnRydWUsIHNlbGVjdGVkQmlkIDogcHJvcHMudmFsdWUuYmlkfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IHNyYz17Y2FuY2VsSWNvbn0vPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLnN0YXR1cyA9PT0gXCJBUFBST1ZFRFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiA8aW1nIHN0eWxlPXt7bWFyZ2luOicwIDEwcHgnLCBjdXJzb3I6ICdwb2ludGVyJ319IG9uQ2xpY2s9eygpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld0xpY2Vuc2VCaWQocHJvcHMudmFsdWUuYmlkLmN1c3RvbUlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBzcmM9e2RvY0ljb259Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS5zdGF0dXMgPT09IFwiQVBQUk9WRURcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgPGltZyBzdHlsZT17e21hcmdpbjonMCAxMHB4JywgY3Vyc29yOiAncG9pbnRlcid9fSBvbkNsaWNrPXsoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVmc1tcIm1lc3NhZ2VQb3B1cFwiICsgcHJvcHMudmFsdWUuYmlkLmlkXS5vcGVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IHNyYz17Ymx1ZUVudmVsb3BlSWNvbn0vPn1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKkNPTkZJUk0gUkVNT1ZFKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNob3dSZW1vdmVDb25maXJtICYmIDxkaXYgY2xhc3NOYW1lPVwiY29uZmlybWF0aW9uLXRvb2x0aXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbmZpcm1hdGlvbi10ZXh0XCJ9IHN0eWxlPXt7IHdoaXRlU3BhY2U6ICdub3JtYWwnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlbW92ZSB0aGlzIGJpZD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wiYnV0dG9uIGJ1dHRvbi1jb25maXJtXCJ9IG9uQ2xpY2s9eyhlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dSZW1vdmVDb25maXJtOiBmYWxzZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlKHByb3BzLnZhbHVlLmJpZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlbW92ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidXR0b25cIn0gb25DbGljaz17KGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1JlbW92ZUNvbmZpcm06IGZhbHNlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21tZXJjaWFsU2FsZXNCdW5kbGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0NvbW1lcmNpYWxTYWxlc0J1bmRsZS5qcyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTW9tZW50IGZyb20gXCJtb21lbnQvbW9tZW50XCI7XG5pbXBvcnQgQ29udGVudExpc3RpbmdFdmVudERldGFpbHMgZnJvbSBcIi4uLy4uL2J1eS9jb21wb25lbnRzL0NvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzXCI7XG5pbXBvcnQgQ29udGVudExpc3RpbmdSaWdodHNQYWNrYWdlIGZyb20gXCIuLi8uLi9idXkvY29tcG9uZW50cy9Db250ZW50TGlzdGluZ1JpZ2h0c1BhY2thZ2VcIjtcblxuY2xhc3MgQ29udGVudExpc3RpbmcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGJ1eWluZ01vZGUgOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5vSW1hZ2UgPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL25vLWltYWdlLnBuZ1wiO1xuICAgICAgICB0aGlzLmJpZEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2hhbW1lci5wbmdcIjtcbiAgICAgICAgdGhpcy5maXhlZEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2JpZC5wbmdcIjtcbiAgICAgICAgdGhpcy5ibHVlQ2hlY2sgPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2JsdWVfY2hlY2sucG5nXCI7XG4gICAgICAgIHRoaXMueWVsbG93Q2hlY2sgPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL3llbGxvd19jaGVjaC5wbmdcIjtcbiAgICAgICAgdGhpcy5idWNrZXRpY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9idWNrZXQucG5nXCI7XG4gICAgfVxuXG4gICAgZ2V0RmVlID0gKHNhbGVzUGFja2FnZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHtjdXJyZW5jeX0gPSB0aGlzLnByb3BzO1xuICAgICAgICBsZXQgY3VycmVuY3lDb2RlID0gY3VycmVuY3kgfHwgc2FsZXNQYWNrYWdlLmN1cnJlbmN5LmNvZGU7XG4gICAgICAgIGxldCBjdXJyZW5jeVN5bWJvbCA9IChjdXJyZW5jeUNvZGUgPT09IFwiRVVSXCIgPyBcIuKCrFwiIDogXCIkXCIpO1xuICAgICAgICByZXR1cm4gc2FsZXNQYWNrYWdlLmZlZSArIFwiIFwiICsgY3VycmVuY3lTeW1ib2wgO1xuICAgIH07XG5cbiAgICBvblNlbGVjdCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtvblNlbGVjdCwgY3VzdG9tSWR9ID0gdGhpcy5wcm9wcztcblxuICAgICAgaWYgKCBvblNlbGVjdCApIG9uU2VsZWN0KGN1c3RvbUlkKTtcblxuICAgIH07XG5cbiAgICBjb25maXJtUmVtb3ZlRnJvbVdhdGNobGlzdCA9IChlKSA9PntcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29uZmlybVdhdGNobGlzdFJlbW92ZSA6IHRydWV9KTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuXG4gICAgY2FuY2VsUmVtb3ZlRnJvbVdhdGNobGlzdCA9IChlKSA9PntcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29uZmlybVdhdGNobGlzdFJlbW92ZSA6IGZhbHNlfSk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfTtcblxuICAgIHJlbW92ZUZyb21XYXRjaGxpc3QgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCB7Y3VzdG9tSWQsIG9uV2F0Y2hsaXN0UmVtb3ZlfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIENvbnRlbnRBcmVuYS5BcGkud2F0Y2hsaXN0KGN1c3RvbUlkKTtcblxuICAgICAgICBpZiAoIG9uV2F0Y2hsaXN0UmVtb3ZlICkgb25XYXRjaGxpc3RSZW1vdmUoY3VzdG9tSWQpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG5cbiAgICBzb3J0U2FsZXNQYWNrYWdlcyA9IChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChiLnRlcnJpdG9yaWVzTWV0aG9kID09PVwiV09STERXSURFXCIpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZVByb3BlcnR5KGEudGVycml0b3JpZXMubGVuZ3RoLCBiLnRlcnJpdG9yaWVzLmxlbmd0aClcbiAgICAgICAgICAgIHx8IHRoaXMuY29tcGFyZVByb3BlcnR5KGIubmFtZSwgYS5uYW1lKTtcbiAgICB9O1xuXG4gICAgc29ydEFmdGVyRmlsdGVyID0gKGEsIGIpID0+IHtcblxuICAgICAgICBpZiAoYi50ZXJyaXRvcmllc01ldGhvZCA9PT1cIldPUkxEV0lERVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlUHJvcGVydHkoYi50ZXJyaXRvcmllcy5sZW5ndGgsIGEudGVycml0b3JpZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHx8IHRoaXMuY29tcGFyZVByb3BlcnR5KGEubmFtZSwgYi5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVQcm9wZXJ0eShhLnRlcnJpdG9yaWVzLmxlbmd0aCwgYi50ZXJyaXRvcmllcy5sZW5ndGgpXG4gICAgICAgICAgICB8fCB0aGlzLmNvbXBhcmVQcm9wZXJ0eShhLm5hbWUsIGIubmFtZSk7XG59O1xuXG4gICAgc29ydEJ5RmlsdGVyID0gKHNhbGVzUGFja2FnZXMpID0+IHtcblxuICAgICAgICBjb25zdCB7IGZpbHRlciB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBsZXQgdGVtcCA9IFtdIDtcbiAgICAgICAgbGV0IHRlcnJpdG9yaWVzID0gZmlsdGVyLmNvdW50cmllcy5tYXAoYyA9PiBjLnZhbHVlKTtcblxuICAgICAgICBzYWxlc1BhY2thZ2VzLmZvckVhY2goKGUsaSxsKT0+e1xuXG4gICAgICAgICAgICBsZXQgdCA9IGUudGVycml0b3JpZXMubWFwKHQ9PnQudmFsdWUpO1xuICAgICAgICAgICAgbGV0IGV0ID0gKGUudGVycml0b3JpZXNNZXRob2QgPT09IFwiV09STERXSURFX0VYQ0xVRElOR1wiKSA/IGUuZXhjbHVkZWRUZXJyaXRvcmllcy5tYXAodD0+dC52YWx1ZSkgOiBbXTtcbiAgICAgICAgICAgIGxldCBhbGwgPSBbLi4udCwuLi5ldF07XG4gICAgICAgICAgICBsZXQgaW5jbHVkZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0ZXJyaXRvcmllcy5mb3JFYWNoKHQgPT57XG4gICAgICAgICAgICAgICAgaWYgKCBhbGwuaW5kZXhPZih0KSAhPT0gLTEgKSBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIGUuYnVuZGxlTWV0aG9kID09PSBcIlNFTExfQVNfQlVORExFXCIgJiYgZS50ZXJyaXRvcmllc01ldGhvZCA9PT0gXCJXT1JMRFdJREVcIikge1xuICAgICAgICAgICAgICAgIGluY2x1ZGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGluY2x1ZGUpIHtcbiAgICAgICAgICAgICAgICB0ZW1wLnB1c2goZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBbLi4udGVtcF07XG4gICAgfTtcblxuICAgIGNvbXBhcmVQcm9wZXJ0eSA9IChhLCBiKSA9PiAge1xuICAgICAgICByZXR1cm4gKGEgPiBiKSA/IDEgOiAoKGIgPiBhKSA/IC0xIDogMClcbiAgICB9O1xuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBleHBpcmVzQXQsXG4gICAgICAgICAgICBQUk9HUkFNX05BTUUsXG4gICAgICAgICAgICBvblNlbGVjdE5hbWUsXG4gICAgICAgICAgICBpbWFnZUJhc2U2NCxcbiAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgc29ydFNhbGVzUGFja2FnZXMsXG4gICAgICAgICAgICB3YXRjaGxpc3RSZW1vdmVcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgbGV0IHtyaWdodHNQYWNrYWdlfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJpZ2h0c1BhY2thZ2UgPSByaWdodHNQYWNrYWdlLnNsaWNlKC02KTtcblxuICAgICAgICBjb25zdCB7Y29uZmlybVdhdGNobGlzdFJlbW92ZX0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGxldCBzYWxlc1BhY2thZ2VzID0gdGhpcy5wcm9wcy5zYWxlc1BhY2thZ2VzO1xuICAgICAgICBsZXQgbGlzdGluZ0ltYWdlID0gKGltYWdlQmFzZTY0KSA/IGltYWdlQmFzZTY0IDogaW1hZ2UgPyBhc3NldHNCYXNlRGlyICsgXCIuLi9cIiArIGltYWdlIDogdGhpcy5ub0ltYWdlO1xuXG4gICAgICAgIGlmICggZmlsdGVyICYmIGZpbHRlci5jb3VudHJpZXMubGVuZ3RoID4gMCAmJiBzb3J0U2FsZXNQYWNrYWdlcykge1xuICAgICAgICAgICAgc2FsZXNQYWNrYWdlcyA9IHRoaXMuc29ydEJ5RmlsdGVyKHNhbGVzUGFja2FnZXMpO1xuICAgICAgICAgICAgc2FsZXNQYWNrYWdlcy5zb3J0KHRoaXMuc29ydEFmdGVyRmlsdGVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZXMuc29ydCh0aGlzLnNvcnRTYWxlc1BhY2thZ2VzKS5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy1saXN0LXZpZXdcIiBvbkNsaWNrPXt0aGlzLm9uU2VsZWN0fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJsZWZ0XCJ9ICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImltYWdlXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2xpc3RpbmdJbWFnZX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJyaWdodFwifSA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm5hbWVcIn0gb25DbGljaz17KCkgPT4geyBpZiAob25TZWxlY3ROYW1lKSBvblNlbGVjdE5hbWUoKSB9fT57bmFtZX08L2Rpdj5cblxuXG4gICAgICAgICAgICAgICAgICAgIHt3YXRjaGxpc3RSZW1vdmUgJiYgIWNvbmZpcm1XYXRjaGxpc3RSZW1vdmUgJiZcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yIDogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46ICcwIDVweCdcblxuICAgICAgICAgICAgICAgICAgICB9fSBzcmM9e3RoaXMuYnVja2V0aWNvbn0gb25DbGljaz17dGhpcy5jb25maXJtUmVtb3ZlRnJvbVdhdGNobGlzdH0vPn1cblxuICAgICAgICAgICAgICAgICAgICB7Y29uZmlybVdhdGNobGlzdFJlbW92ZSAmJlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wIDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogJzAgNXB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlciA6ICcxcHggc29saWQgbGlnaHRncmV5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmcgOiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDEzXG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UmVtb3ZlIGZyb20gV2F0Y2hsaXN0Pzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e3RoaXMucmVtb3ZlRnJvbVdhdGNobGlzdH0gc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IgOiAncG9pbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAnMCAxNXB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA6ICdyZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17dGhpcy5jYW5jZWxSZW1vdmVGcm9tV2F0Y2hsaXN0fSBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvciA6ICdwb2ludGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvciA6ICdncmVlbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3Rpbmctd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzIHsuLi50aGlzLnByb3BzfSBpc0ZyYWdtZW50PXt0cnVlfS8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb250ZW50TGlzdGluZ1JpZ2h0c1BhY2thZ2UgcmlnaHRzUGFja2FnZT17cmlnaHRzUGFja2FnZX0gcHJvZ3JhbU5hbWU9e1BST0dSQU1fTkFNRX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJzYWxlcy1idW5kbGVzXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMuc2xpY2UoMCwgNCkubWFwKCAoIHNhbGVzUGFja2FnZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIDxkaXYgY2xhc3NOYW1lPVwic2FsZXMtcGFja2FnZVwiIGtleT17XCJzYWxlcy1wYWNrYWdlLVwiKyBpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzYWxlc1BhY2thZ2UuYnVuZGxlTWV0aG9kID09PSBcIlNFTExfQVNfQlVORExFXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmPGRpdiBzdHlsZT17eyBtYXJnaW46ICcwIDEwcHggMCA1cHgnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17e3dpZHRoOiAyNiwgaGVpZ2h0OiAyM319IHNyYz17dGhpcy5maXhlZEljb259Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2N1cnNvcjogJ2RlZmF1bHQnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NhbGVzUGFja2FnZS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCBzYWxlc1BhY2thZ2Uuc2FsZXNNZXRob2QgIT09IFwiQklERElOR1wiIHx8ICAoIHNhbGVzUGFja2FnZS5zYWxlc01ldGhvZCA9PT0gXCJCSURESU5HXCIgJiYgc2FsZXNQYWNrYWdlLmZlZSA+IDAgKSApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiY8ZGl2IHN0eWxlPXt7bWFyZ2luOiAnMCAxMHB4JywgZGlzcGxheTogXCJmbGV4XCIsIGZsZXg6ICcxIDAgYXV0byd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuZ2V0RmVlKHNhbGVzUGFja2FnZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzYWxlc1BhY2thZ2Uuc2FsZXNNZXRob2QgPT09IFwiQklERElOR1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJjxkaXYgc3R5bGU9e3sgbWFyZ2luOiAnMCAxMHB4IDAgNXB4J319PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3t3aWR0aDogMjMsIGhlaWdodDogMjN9fSBzcmM9e3RoaXMuYmlkSWNvbn0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuXG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMubGVuZ3RoID4gNCAmJiA8ZGl2IGNsYXNzTmFtZT1cInNhbGVzLXBhY2thZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2NvbG9yOiAnIzJEQTdFNicsIHBhZGRpbmc6ICcwIDE1cHggMCAwcHgnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsge3NhbGVzUGFja2FnZXMubGVuZ3RoIC0gNH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGVudExpc3Rpbmc7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9Db250ZW50TGlzdGluZy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTW9tZW50IGZyb20gXCJtb21lbnQvbW9tZW50XCI7XG5pbXBvcnQgQ29udGVudExpc3RpbmdFdmVudERldGFpbHMgZnJvbSBcIi4uLy4uL2J1eS9jb21wb25lbnRzL0NvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzXCI7XG5pbXBvcnQgQ29udGVudExpc3RpbmdSaWdodHNQYWNrYWdlIGZyb20gXCIuLi8uLi9idXkvY29tcG9uZW50cy9Db250ZW50TGlzdGluZ1JpZ2h0c1BhY2thZ2VcIjtcbmltcG9ydCBDb21tZXJjaWFsU2FsZXNCdW5kbGUgZnJvbSBcIi4uLy4uL21haW4vY29tcG9uZW50cy9Db21tZXJjaWFsU2FsZXNCdW5kbGVcIjtcbmltcG9ydCBDb250ZW50TGlzdGluZyBmcm9tIFwiLi9Db250ZW50TGlzdGluZ1wiO1xuaW1wb3J0IHtnZXRDdXJyZW5jeVN5bWJvbH0gZnJvbSBcIi4uL2FjdGlvbnMvdXRpbHNcIjtcbmltcG9ydCB7YWRkSWNvbiwgY2FuY2VsSWNvbn0gZnJvbSBcIi4vSWNvbnNcIjtcblxuY2xhc3MgQ29udGVudExpc3RpbmdDb21tZXJjaWFsQWN0aXZpdHkgZXh0ZW5kcyBDb250ZW50TGlzdGluZyB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHNob3dTYWxlc1BhY2thZ2UgOiBwcm9wcy5idW5kbGVzT3BlblxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5vSW1hZ2UgPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL25vLWltYWdlLnBuZ1wiO1xuICAgICAgICB0aGlzLmJpZEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2hhbW1lci5wbmdcIjtcbiAgICAgICAgdGhpcy5maXhlZEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2JpZC5wbmdcIjtcbiAgICAgICAgdGhpcy5ibHVlQ2hlY2sgPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2JsdWVfY2hlY2sucG5nXCI7XG4gICAgICAgIHRoaXMueWVsbG93Q2hlY2sgPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL3llbGxvd19jaGVjaC5wbmdcIjtcbiAgICAgICAgdGhpcy5idWNrZXRpY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9idWNrZXQucG5nXCI7XG4gICAgICAgIHRoaXMuZXhjbGFtYXRpb25JY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9FeGNsYW1hdGlvbi5wbmdcIjtcbiAgICAgICAgdGhpcy5lbnZlbG9wZUljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2VudmVsb3BlXzIucG5nXCI7XG4gICAgfVxuXG4gICAgc29ydFNhbGVzUGFja2FnZXMgPSAoYSwgYikgPT4ge1xuXG4gICAgICAgIGxldCBhT3BlbiA9IGEuYmlkcy5maWx0ZXIoYmlkPT5iaWQuc3RhdHVzLm5hbWU9PT0gXCJQRU5ESU5HXCIpLmxlbmd0aCA+IDA7XG4gICAgICAgIGxldCBiT3BlbiA9IGIuYmlkcy5maWx0ZXIoYmlkPT5iaWQuc3RhdHVzLm5hbWU9PT0gXCJQRU5ESU5HXCIpLmxlbmd0aCA+IDA7XG4gICAgICAgIGxldCBhQ2xvc2VkID0gYS5iaWRzLmZpbHRlcihiaWQ9PmJpZC5zdGF0dXMubmFtZT09PSBcIkFQUFJPVkVEXCIpLmxlbmd0aCA+IDA7XG4gICAgICAgIGxldCBiQ2xvc2VkID0gYi5iaWRzLmZpbHRlcihiaWQ9PmJpZC5zdGF0dXMubmFtZT09PSBcIkFQUFJPVkVEXCIpLmxlbmd0aCA+IDA7XG4gICAgICAgIGxldCBhV29ybGR3aWRlID0gYS50ZXJyaXRvcmllc01ldGhvZCA9PT1cIldPUkxEV0lERVwiO1xuICAgICAgICBsZXQgYldvcmxkd2lkZSA9IGIudGVycml0b3JpZXNNZXRob2QgPT09XCJXT1JMRFdJREVcIjtcblxuICAgICAgICBsZXQgb3BlbiA9ICggIWFPcGVuICYmIGJPcGVuICkgPyAxIDogKCghYk9wZW4gJiYgYU9wZW4pID8gLTEgOiAwKTtcbiAgICAgICAgbGV0IGNsb3NlZCA9ICggIWFDbG9zZWQgJiYgYkNsb3NlZCApID8gMSA6ICgoIWJDbG9zZWQgJiYgYUNsb3NlZCkgPyAtMSA6IDApO1xuICAgICAgICBsZXQgd29ybGR3aWRlID0gKCAhYVdvcmxkd2lkZSAmJiBiV29ybGR3aWRlICkgPyAxIDogKCghYldvcmxkd2lkZSAmJiBhV29ybGR3aWRlKSA/IC0xIDogMCk7XG5cbiAgICAgICAgcmV0dXJuIG9wZW4gfHwgY2xvc2VkIHx8IHdvcmxkd2lkZSB8fHRoaXMuY29tcGFyZVByb3BlcnR5KGIudGVycml0b3JpZXMubGVuZ3RoLCBhLnRlcnJpdG9yaWVzLmxlbmd0aClcbiAgICAgICAgICAgIHx8IHRoaXMuY29tcGFyZVByb3BlcnR5KGIubmFtZSwgYS5uYW1lKTtcbiAgICB9O1xuXG4gICAgY29tcGFyZVByb3BlcnR5ID0gKGEsIGIpID0+ICB7XG4gICAgICAgIHJldHVybiAoYSA+IGIpID8gMSA6ICgoYiA+IGEpID8gLTEgOiAwKVxuICAgIH07XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIG9uRGVsZXRlLFxuICAgICAgICAgICAgb25VcGRhdGUsXG4gICAgICAgICAgICBoaWRlV2l0aG91dEJpZHMsXG4gICAgICAgICAgICBmaWx0ZXJCeU9wZW5CaWRzLFxuICAgICAgICAgICAgZmlsdGVyQnlDbG9zZWREZWFscyxcbiAgICAgICAgICAgIGJpZHNPcGVuLFxuICAgICAgICAgICAgcmlnaHRzUGFja2FnZSxcbiAgICAgICAgICAgIGltYWdlQmFzZTY0LFxuICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICBjb21wYW55LFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBQUk9HUkFNX05BTUVcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgY29uc3Qge3Nob3dTYWxlc1BhY2thZ2V9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBsZXQgc2FsZXNQYWNrYWdlcyA9IHRoaXMucHJvcHMuc2FsZXNQYWNrYWdlcztcbiAgICAgICAgc2FsZXNQYWNrYWdlcy5zb3J0KHRoaXMuc29ydFNhbGVzUGFja2FnZXMpO1xuXG4gICAgICAgIGxldCBsaXN0aW5nSW1hZ2UgPSAoaW1hZ2VCYXNlNjQpID8gaW1hZ2VCYXNlNjQgOiBpbWFnZSA/IGFzc2V0c0Jhc2VEaXIgKyBcIi4uL1wiICsgaW1hZ2UgOiB0aGlzLm5vSW1hZ2U7XG4gICAgICAgIGxldCBiaWRzID0gc2FsZXNQYWNrYWdlcy5yZWR1Y2UoKHQsIHNwKT0+dC5jb25jYXQoc3AuYmlkcyksW10pO1xuICAgICAgICBsZXQgY2xvc2VkRGVhbHMgPSBiaWRzLmZpbHRlcihiPT5iLnN0YXR1cy5uYW1lID09PSBcIkFQUFJPVkVEXCIpO1xuICAgICAgICBsZXQgb3BlbkJpZHMgPSBiaWRzLmZpbHRlcihiPT5iLnN0YXR1cy5uYW1lID09PSBcIlBFTkRJTkdcIik7XG4gICAgICAgIGxldCB0b3RhbCA9IChjbG9zZWREZWFscy5sZW5ndGggPiAwICkgPyBjbG9zZWREZWFscy5tYXAoYj0+TnVtYmVyKGIudG90YWxGZWUpKS5yZWR1Y2UoKHQsbik9PnQrbikgOiAwO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXkgOiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBtYXJnaW5Cb3R0b206IDIwfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0aW5nLWxpc3Qtdmlld1wiIHN0eWxlPXt7cGFkZGluZzogMCwgbWFyZ2luQm90dG9tOiAwIH19PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJsZWZ0XCJ9IHN0eWxlPXt7cGFkZGluZzogMjV9fSA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpbWFnZVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17bGlzdGluZ0ltYWdlfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInJpZ2h0XCJ9ICBzdHlsZT17e3BhZGRpbmc6JzI1cHggMCd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm5hbWVcIn0gb25DbGljaz17dGhpcy5vblNlbGVjdH0+e25hbWV9PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy13cmFwcGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzIHsuLi50aGlzLnByb3BzfSAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRlbnRMaXN0aW5nUmlnaHRzUGFja2FnZSByaWdodHNQYWNrYWdlPXtyaWdodHNQYWNrYWdlfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHsvKkJJRCBERVRBSUxTKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgIGNsYXNzTmFtZT17XCJiaWQtbGlzdGluZy1kZXRhaWxzXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PntjbG9zZWREZWFscy5sZW5ndGh9IGNsb3NlZCBEZWFsczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e29wZW5CaWRzLmxlbmd0aH0gb3BlbiBiaWRzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtiaWRzLmxlbmd0aCA+IDAgJiYgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifSBzdHlsZT17e2ZvbnRXZWlnaHQ6NjAwfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1wiVG90YWw6IFwiICsgdG90YWwudG9Mb2NhbGVTdHJpbmcoXCJlblwiLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMiB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiIFwifVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRDdXJyZW5jeVN5bWJvbChzYWxlc1BhY2thZ2VzWzBdLmN1cnJlbmN5LmNvZGUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNob3ctYnVuZGxlXCIgb25DbGljaz17KCk9Pnt0aGlzLnNldFN0YXRlKHtzaG93U2FsZXNQYWNrYWdlOiAhc2hvd1NhbGVzUGFja2FnZX0pfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyFzaG93U2FsZXNQYWNrYWdlICYmIFwiU2hvdyBzYWxlcyBidW5kbGVcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd1NhbGVzUGFja2FnZSAmJiBcIkhpZGUgc2FsZXMgYnVuZGxlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyFzaG93U2FsZXNQYWNrYWdlICYmIDxpbWcgc3JjPXthZGRJY29ufS8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93U2FsZXNQYWNrYWdlICYmIDxpbWcgc3JjPXtjYW5jZWxJY29ufS8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtzaG93U2FsZXNQYWNrYWdlICYmIHNhbGVzUGFja2FnZXMubWFwKChzYiwgaSApPT57XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsb3NlZD0gc2IuYmlkcy5maWx0ZXIoYj0+Yi5zdGF0dXMubmFtZSA9PT0gXCJBUFBST1ZFRFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wZW4gPSBzYi5iaWRzLmZpbHRlcihiPT5iLnN0YXR1cy5uYW1lID09PSBcIlBFTkRJTkdcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGhpZGVXaXRob3V0QmlkcyAmJiBzYi5iaWRzLmxlbmd0aCA9PT0gMCApIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlckJ5T3BlbkJpZHMgJiYgb3Blbi5sZW5ndGggPT09IDAgKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJCeUNsb3NlZERlYWxzICYmIGNsb3NlZC5sZW5ndGggPT09IDAgKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxDb21tZXJjaWFsU2FsZXNCdW5kbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlPXtvblVwZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXtvbkRlbGV0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzQnVuZGxlPXtzYn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJpZHNPcGVuPXtiaWRzT3Blbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhbnk9e2NvbXBhbnl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50SWQ9e2lkfVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfS8+XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGVudExpc3RpbmdDb21tZXJjaWFsQWN0aXZpdHk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvQ29udGVudExpc3RpbmdDb21tZXJjaWFsQWN0aXZpdHkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE1vbWVudCBmcm9tIFwibW9tZW50L21vbWVudFwiO1xuaW1wb3J0IENvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzIGZyb20gXCIuLi8uLi9idXkvY29tcG9uZW50cy9Db250ZW50TGlzdGluZ0V2ZW50RGV0YWlsc1wiO1xuaW1wb3J0IENvbnRlbnRMaXN0aW5nUmlnaHRzUGFja2FnZSBmcm9tIFwiLi4vLi4vYnV5L2NvbXBvbmVudHMvQ29udGVudExpc3RpbmdSaWdodHNQYWNrYWdlXCI7XG5pbXBvcnQgQ29udGVudExpc3RpbmcgZnJvbSBcIi4vQ29udGVudExpc3RpbmdcIjtcbmltcG9ydCBTZW5kTWVzc2FnZSBmcm9tIFwiLi4vLi4vbWFpbi9jb21wb25lbnRzL1NlbmRNZXNzYWdlXCI7XG5pbXBvcnQge2dldEN1cnJlbmN5U3ltYm9sfSBmcm9tIFwiLi4vYWN0aW9ucy91dGlsc1wiO1xuaW1wb3J0IHtibHVlRW52ZWxvcGVJY29uLCBidWNrZXRJY29uLCBpbmZvSWNvbn0gZnJvbSBcIi4vSWNvbnNcIjtcblxuY2xhc3MgQ29udGVudExpc3RpbmdQZW5kaW5nQmlkIGV4dGVuZHMgQ29udGVudExpc3Rpbmcge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubm9JbWFnZSA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvbm8taW1hZ2UucG5nXCI7XG4gICAgICAgIHRoaXMuYmlkSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvaGFtbWVyLnBuZ1wiO1xuICAgICAgICB0aGlzLmZpeGVkSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYmlkLnBuZ1wiO1xuICAgICAgICB0aGlzLmJsdWVDaGVjayA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYmx1ZV9jaGVjay5wbmdcIjtcbiAgICAgICAgdGhpcy55ZWxsb3dDaGVjayA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMveWVsbG93X2NoZWNoLnBuZ1wiO1xuICAgICAgICB0aGlzLmV4Y2xhbWF0aW9uSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvRXhjbGFtYXRpb24ucG5nXCI7XG4gICAgICAgIHRoaXMuZW52ZWxvcGVJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9lbnZlbG9wZV8yLnBuZ1wiO1xuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgZXhwaXJlc0F0LFxuICAgICAgICAgICAgb25EZWxldGUsXG4gICAgICAgICAgICByaWdodHNQYWNrYWdlLFxuICAgICAgICAgICAgb25TZWxlY3ROYW1lLFxuICAgICAgICAgICAgaW1hZ2VCYXNlNjQsXG4gICAgICAgICAgICBpbWFnZSxcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgY29tcGFueSxcbiAgICAgICAgICAgIGN1c3RvbUlkLFxuICAgICAgICAgICAgYmlkLFxuICAgICAgICAgICAgUFJPR1JBTV9OQU1FXG4gICAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIGNvbnN0IHtzaG93TWVzc2FnZSwgc2hvd0VkaXRlZH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGxldCBsaXN0aW5nSW1hZ2UgPSAoaW1hZ2VCYXNlNjQpID8gaW1hZ2VCYXNlNjQgOiBpbWFnZSA/IGFzc2V0c0Jhc2VEaXIgKyBcIi4uL1wiICsgaW1hZ2UgOiB0aGlzLm5vSW1hZ2U7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy1saXN0LXZpZXdcIiBzdHlsZT17e3BhZGRpbmc6IDB9fT5cbiAgICAgICAgICAgICAgICA8U2VuZE1lc3NhZ2UgcmVmPXtcIm1lc3NhZ2VQb3B1cFwiICsgaWQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0aW5nSWQ9e2lkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNpcGllbnQ9e2NvbXBhbnl9Lz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJsZWZ0XCJ9IHN0eWxlPXt7cGFkZGluZzogMjV9fSA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImltYWdlXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2xpc3RpbmdJbWFnZX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJyaWdodFwifSAgc3R5bGU9e3twYWRkaW5nOicyNXB4IDAnfX0+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qTkFNRSovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJuYW1lXCJ9IG9uQ2xpY2s9e3RoaXMub25TZWxlY3R9PlxuICAgICAgICAgICAgICAgICAgICAgICAge25hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOidjZW50ZXInfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PkV4cGlyeToge01vbWVudChleHBpcmVzQXQpLmZvcm1hdCgnREQvTU0vWVlZWScpfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdXN0b20taWRcIj4je2N1c3RvbUlkfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LypDT01QQU5ZKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbXBhbnlcIn0gb25DbGljaz17KGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnNbXCJtZXNzYWdlUG9wdXBcIiArIGlkXS5vcGVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb21wYW55LmxlZ2FsTmFtZX0gPGltZyBzdHlsZT17e21hcmdpbkxlZnQ6IDV9fSBzcmM9e3RoaXMuZW52ZWxvcGVJY29ufS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OiAnZmxleCd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy13cmFwcGVyXCIgc3R5bGU9e3tmbGV4OicxIDAgMCcsb3ZlcmZsb3c6ICdhdXRvJ319PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzIHsuLi50aGlzLnByb3BzfSAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRlbnRMaXN0aW5nUmlnaHRzUGFja2FnZSByaWdodHNQYWNrYWdlPXtyaWdodHNQYWNrYWdlfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKkJJRCBPUFRJT05TKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogJzI0MHB4IDAgMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI0ZBRkJGQycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyTGVmdDogJzFweCBzb2xpZCAjRTZFNkU2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1JvcDogMTUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1ldmVubHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcyMHB4IDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogJ3JlbGF0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OidmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1ldmVubHknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e01vbWVudChiaWQuY3JlYXRlZEF0KS5mb3JtYXQoJ0REL01NL1lZWVknKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgbGlnaHRncmV5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogJzAgMjBweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57YmlkLnNhbGVzUGFja2FnZS5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMjQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAxMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PntiaWQuYW1vdW50fSB7Z2V0Q3VycmVuY3lTeW1ib2woYmlkLnNhbGVzUGFja2FnZS5jdXJyZW5jeS5jb2RlKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YmlkLnN0YXR1cy5uYW1lID09PSBcIkVESVRFRFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIDxpbWcgc3JjPXtpbmZvSWNvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VPdmVyPXsoKSA9PiB7dGhpcy5zZXRTdGF0ZSh7c2hvd0VkaXRlZCA6IHRydWV9KX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiB7dGhpcy5zZXRTdGF0ZSh7c2hvd0VkaXRlZCA6IGZhbHNlfSl9fSAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwic3RhbmRhcmQtYnV0dG9uXCIgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMzYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IDEwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IGhyZWY9e2Vudmhvc3R1cmwrIFwibGlzdGluZy9cIiArY3VzdG9tSWQrXCIvYnV5L1wiICsgYmlkLnNhbGVzUGFja2FnZS5pZH0+SW5jcmVhc2UgYmlkPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YmlkLm1lc3NhZ2UgJiYgYmlkLm1lc3NhZ2UgIT09IFwiXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgPGltZyBzcmM9e2JsdWVFbnZlbG9wZUljb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogNSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VPdmVyPXsoKSA9PiB7dGhpcy5zZXRTdGF0ZSh7c2hvd01lc3NhZ2UgOiB0cnVlfSl9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4ge3RoaXMuc2V0U3RhdGUoe3Nob3dNZXNzYWdlIDogZmFsc2V9KX19Lz59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qTUVTU0FHRSovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd01lc3NhZ2UgJiYgPGRpdiBjbGFzc05hbWU9XCJzdGF0dXMtdG9vbHRpcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wib3B0aW9uXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtiaWQubWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qRURJVEVEIFRPT0xUSVAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Nob3dFZGl0ZWQgJiYgPGRpdiBjbGFzc05hbWU9XCJzdGF0dXMtdG9vbHRpcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wib3B0aW9uXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExpc3RpbmcgZWRpdGVkIGFmdGVyIGxhc3QgYmlkLiBQbGVhc2UgcmV2aWV3IHRlcm0gc2hlZXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7Zm9udFdlaWdodDogNDAwLGZvbnRTdHlsZTogJ2l0YWxpYyd9fT5QbGFjZWQgYnk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1wiIFwiICtiaWQuYnV5ZXJVc2VyLmZpcnN0TmFtZSArIFwiIFwiICsgYmlkLmJ1eWVyVXNlci5sYXN0TmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YmlkLnN0YXR1cy5uYW1lID09PSBcIlJFSkVDVEVEXCIgJiYgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yIDogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgOiAyMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IG9uQ2xpY2s9eyhlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93UmVtb3ZlQ29uZmlybTogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YnVja2V0SWNvbn0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKkNPTkZJUk0gUkVNT1ZFKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2hvd1JlbW92ZUNvbmZpcm0gJiYgPGRpdiBjbGFzc05hbWU9XCJjb25maXJtYXRpb24tdG9vbHRpcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjb25maXJtYXRpb24tdGV4dFwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZW1vdmUgdGhpcyBiaWQ/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidXR0b24gYnV0dG9uLWNvbmZpcm1cIn0gb25DbGljaz17KGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93UmVtb3ZlQ29uZmlybTogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlKGJpZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlbW92ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wiYnV0dG9uXCJ9IG9uQ2xpY2s9eyhlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1JlbW92ZUNvbmZpcm06IGZhbHNlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250ZW50TGlzdGluZ1BlbmRpbmdCaWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvQ29udGVudExpc3RpbmdQZW5kaW5nQmlkLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuY2xhc3MgQ291bnRyeVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGNvdW50cmllcyA6IFtdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldENvdW50cmllcygpLmRvbmUoIChjb3VudHJpZXMgKSA9PiB7XG4gICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gY291bnRyaWVzO1xuICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtjb3VudHJpZXN9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe2NvdW50cmllczogQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRPcHRpb25zID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7ZmlsdGVyID0gW10sIGF2YWlsYWJsZX0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIGxldCBjb3VudHJpZXMgPSBPYmplY3QudmFsdWVzKENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcykubWFwKChpLGspPT4oe3ZhbHVlIDogaS5uYW1lICwgbGFiZWwgOiBpLm5hbWUgfSkpO1xuXG4gICAgICAgIGlmIChhdmFpbGFibGUgJiYgYXZhaWxhYmxlLmxlbmd0aCA+IDAgKSBjb3VudHJpZXMgPSBhdmFpbGFibGUubWFwKChpLGspPT4oe3ZhbHVlIDogaSAsIGxhYmVsIDogaSB9KSk7XG5cbiAgICAgICAgY291bnRyaWVzID0gY291bnRyaWVzLmZpbHRlcihjb3VudHJ5ID0+IGZpbHRlci5pbmRleE9mKGNvdW50cnkudmFsdWUpID09PSAtMSk7XG5cbiAgICAgICAgcmV0dXJuIGNvdW50cmllcztcbiAgICB9O1xuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHt2YWx1ZSwgb25DaGFuZ2UsIGNsYXNzTmFtZSwgbXVsdGkgPSB0cnVlLCBkaXNhYmxlZCA9IGZhbHNlfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWUgfVxuICAgICAgICAgICAgICAgIG5hbWU9XCJmb3JtLWZpZWxkLW5hbWVcIlxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlLmxlbmd0aCA+IDIwMCA/IFtdIDogdmFsdWV9XG4gICAgICAgICAgICAgICAgbXVsdGk9e211bHRpfVxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuZ2V0T3B0aW9ucygpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ291bnRyeVNlbGVjdG9yO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9Db3VudHJ5U2VsZWN0b3IuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNpZ25hdHVyZVBhZCBmcm9tICdyZWFjdC1zaWduYXR1cmUtcGFkJztcblxuY2xhc3MgRGlnaXRhbFNpZ25hdHVyZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcmVhZHkgOiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtibGFuazp0aGlzLnJlZnMuc2lnbmF0dXJlLnRvRGF0YVVSTCgpfSk7XG4gICAgfVxuXG4gICAgY2xlYXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcy5zaWduYXR1cmUuY2xlYXIoKTtcbiAgICB9O1xuXG4gICAgZG9uZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBibGFuayB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3QgeyBvblJlYWR5IH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IHNpZ25hdHVyZSB9ID0gdGhpcy5yZWZzO1xuXG4gICAgICAgIGxldCBkYXRhID0gc2lnbmF0dXJlLnRvRGF0YVVSTCgpO1xuXG4gICAgICAgIGlmICggZGF0YSA9PT0gYmxhbmsgKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZHk6dHJ1ZX0pO1xuICAgICAgICBpZiAob25SZWFkeSkgb25SZWFkeShkYXRhKTtcbiAgICB9O1xuXG4gICAgZWRpdCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBvblJlYWR5IH0gPSB0aGlzLnByb3BzO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkeTpmYWxzZX0pO1xuICAgICAgICBpZiAob25SZWFkeSkgb25SZWFkeShudWxsKTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHsgc2lnbmF0dXJlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IHJlYWR5IH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpZ2l0YWwtc2lnbmF0dXJlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiZGlnaXRhbC1zaWduYXR1cmUtcGxhY2Vob2xkZXJcIn0+XG4gICAgICAgICAgICAgICAgICAgIERpZ2l0YWwgU2lnbmF0dXJlXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3NpZ25hdHVyZSAmJiByZWFkeSAmJlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHN0eWxlPXt7d2lkdGg6IDgwMCwgaGVpZ2h0OiAzMDAsIG1hcmdpbjogJzAgYXV0byd9fSBzcmM9e3NpZ25hdHVyZX0gLz5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB7IXJlYWR5ICYmIDxTaWduYXR1cmVQYWQgcmVmPVwic2lnbmF0dXJlXCIgLz59XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJidXR0b25zXCJ9PlxuICAgICAgICAgICAgICAgICAgICB7IXJlYWR5ICYmIDxidXR0b24gb25DbGljaz17dGhpcy5jbGVhcn0gY2xhc3NOYW1lPVwic3RhbmRhcmQtYnV0dG9uLXNtYWxsIHRyYW5zcGFyZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBDbGVhclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgIHshcmVhZHkgJiYgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmRvbmV9IGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvbi1zbWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgRG9uZVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgIHtyZWFkeSAmJiA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuZWRpdH0gY2xhc3NOYW1lPVwic3RhbmRhcmQtYnV0dG9uLWJpZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgTmV3IFNpZ25hdHVyZVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGlnaXRhbFNpZ25hdHVyZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvRGlnaXRhbFNpZ25hdHVyZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGlzdG9yeUJ1dHRvbiBmcm9tICcuL0hpc3RvcnlCdXR0b24nXG5pbXBvcnQge2dvVG99IGZyb20gXCIuLi9hY3Rpb25zL3V0aWxzXCI7XG5cbmNvbnN0IEhlYWRlckJhclRhYiA9ICh7dGFiTmFtZSwgYWN0aXZlVGFiLCBjaGlsZHJlbiwgcm91dGV9KSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eyh0YWJOYW1lID09PSBhY3RpdmVUYWIpID8gXCJ0YWIgYWN0aXZlLXRhYlwiIDogXCJ0YWJcIn1cbiAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PntcbiAgICAgICAgICAgICAgICAgICAgIGlmICggcm91dGUgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgZ29Ubyhyb3V0ZSk7XG4gICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgKVxufTtcblxuY2xhc3MgSGVhZGVyQmFyIGV4dGVuZHMgIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7dGFiLCBwcm9maWxlfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGxvZ29VcmwgPSB0aGlzLmdldExvZ29VcmwodGFiKTtcblxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hbmFnZXItaGVhZGVyXCI+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvZ29cIiBvbkNsaWNrPXsoKT0+Z29Ubyhsb2dvVXJsKX0+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXthc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2xvZ28ucG5nXCJ9IGFsdD1cIlwiLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsgcHJvZmlsZSA9PT0gXCJCVVlFUlwiICYmIDxIZWFkZXJCYXJUYWJcbiAgICAgICAgICAgICAgICAgICAgdGFiTmFtZT17XCJNQVJLRVRQTEFDRVwifVxuICAgICAgICAgICAgICAgICAgICByb3V0ZT17XCJtYXJrZXRwbGFjZVwifVxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWI9e3RhYn0gPlxuICAgICAgICAgICAgICAgICAgICBNYXJrZXRwbGFjZVxuICAgICAgICAgICAgICAgIDwvSGVhZGVyQmFyVGFiPiB9XG5cbiAgICAgICAgICAgICAgICB7IHByb2ZpbGUgPT09IFwiQlVZRVJcIiAmJiA8SGVhZGVyQmFyVGFiXG4gICAgICAgICAgICAgICAgICAgIHRhYk5hbWU9e1wiV0FUQ0hMSVNUXCJ9XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlPXtcIndhdGNobGlzdFwifVxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWI9e3RhYn0gPlxuICAgICAgICAgICAgICAgICAgICBXYXRjaGxpc3RcbiAgICAgICAgICAgICAgICA8L0hlYWRlckJhclRhYj4gfVxuXG4gICAgICAgICAgICAgICAgeyBwcm9maWxlID09PSBcIkJVWUVSXCIgJiYgPEhlYWRlckJhclRhYlxuICAgICAgICAgICAgICAgICAgICB0YWJOYW1lPXtcIkJJRFNcIn1cbiAgICAgICAgICAgICAgICAgICAgcm91dGU9e1wiYmlkcy9hY3RpdmViaWRzXCJ9XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYj17dGFifSA+XG4gICAgICAgICAgICAgICAgICAgIEJpZHNcbiAgICAgICAgICAgICAgICA8L0hlYWRlckJhclRhYj4gfVxuXG4gICAgICAgICAgICAgICAgeyBwcm9maWxlID09PSBcIkJVWUVSXCIgJiYgPEhlYWRlckJhclRhYlxuICAgICAgICAgICAgICAgICAgICB0YWJOYW1lPXtcIkNMT1NFRF9ERUFMU1wifVxuICAgICAgICAgICAgICAgICAgICByb3V0ZT17XCJjbG9zZWRkZWFsc1wifVxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWI9e3RhYn0gPlxuICAgICAgICAgICAgICAgICAgICBDbG9zZWQgZGVhbHNcbiAgICAgICAgICAgICAgICA8L0hlYWRlckJhclRhYj4gfVxuXG4gICAgICAgICAgICAgICAgeyBwcm9maWxlID09PSBcIlNFTExFUlwiICYmIDxIZWFkZXJCYXJUYWJcbiAgICAgICAgICAgICAgICAgICAgdGFiTmFtZT17XCJNQU5BR0VfTElTVElOR1NcIn1cbiAgICAgICAgICAgICAgICAgICAgcm91dGU9e1wibWFuYWdlbGlzdGluZ3NcIn1cbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiPXt0YWJ9ID5cbiAgICAgICAgICAgICAgICAgICAgTWFuYWdlIGxpc3RpbmdzXG4gICAgICAgICAgICAgICAgPC9IZWFkZXJCYXJUYWI+IH1cblxuICAgICAgICAgICAgICAgIHsgcHJvZmlsZSA9PT0gXCJTRUxMRVJcIiAmJiA8SGVhZGVyQmFyVGFiXG4gICAgICAgICAgICAgICAgICAgIHRhYk5hbWU9e1wiQ09NTUVSQ0lBTF9BQ1RJVklUWVwifVxuICAgICAgICAgICAgICAgICAgICByb3V0ZT17XCJjb21tZXJjaWFsYWN0aXZpdHlcIn1cbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiPXt0YWJ9ID5cbiAgICAgICAgICAgICAgICAgICAgQ29tbWVyY2lhbCBhY3Rpdml0eVxuICAgICAgICAgICAgICAgIDwvSGVhZGVyQmFyVGFiPiB9XG5cbiAgICAgICAgICAgICAgICB7IHByb2ZpbGUgPT09IFwiU0VMTEVSXCIgJiYgPEhlYWRlckJhclRhYlxuICAgICAgICAgICAgICAgICAgICB0YWJOYW1lPXtcIk5FV19MSVNUSU5HXCJ9XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlPXtcIm1hbmFnZWxpc3RpbmdzL25ld1wifVxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWI9e3RhYn0gPlxuICAgICAgICAgICAgICAgICAgICBDcmVhdGUgTGlzdGluZ1xuICAgICAgICAgICAgICAgIDwvSGVhZGVyQmFyVGFiPiB9XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiIC8+XG5cbiAgICAgICAgICAgICAgICB7IHByb2ZpbGUgPT09IFwiQlVZRVJcIiAmJlxuICAgICAgICAgICAgICAgIDxIaXN0b3J5QnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRhYlwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57Z29UbyhcIm1hbmFnZWxpc3RpbmdzXCIpfX1cbiAgICAgICAgICAgICAgICAgICAgcGF0aD1cIm1hbmFnZWxpc3RpbmdzXCI+XG4gICAgICAgICAgICAgICAgICAgIEVudGVyIHNlbGxpbmcgbW9kZVxuICAgICAgICAgICAgICAgIDwvSGlzdG9yeUJ1dHRvbj4gfVxuXG4gICAgICAgICAgICAgICAgeyBwcm9maWxlID09PSBcIlNFTExFUlwiICYmXG4gICAgICAgICAgICAgICAgPEhpc3RvcnlCdXR0b24gY2xhc3NOYW1lPVwidGFiXCIgb25DbGljaz17KCk9Pntnb1RvKFwibWFya2V0cGxhY2VcIil9fSBwYXRoPVwibWFya2V0cGxhY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgRW50ZXIgYnV5aW5nIG1vZGVcbiAgICAgICAgICAgICAgICA8L0hpc3RvcnlCdXR0b24+IH1cblxuICAgICAgICAgICAgICAgIDxIaXN0b3J5QnV0dG9uIGNsYXNzTmFtZT1cInRhYlwiIG9uQ2xpY2s9eygpPT57IGdvVG8oXCJtZXNzYWdlcz9wcm9maWxlPVwiICsgcHJvZmlsZSl9fSBwYXRoPVwibWVzc2FnZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtZW52ZWxvcGVcIiAvPiBNZXNzYWdlc1xuICAgICAgICAgICAgICAgIDwvSGlzdG9yeUJ1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2V0dGluZ3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtMnggZmEtZ2VhclwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3B1cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhpc3RvcnlCdXR0b24gY2xhc3NOYW1lPVwidGFiXCIgb25DbGljaz17KCk9Pntnb1RvKFwic2V0dGluZ3M/cHJvZmlsZT1cIiArIHByb2ZpbGUpfX0gcGF0aD1cInNldHRpbmdzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNldHRpbmdzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9IaXN0b3J5QnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvbG9nb3V0XCIgY2xhc3NOYW1lPVwidGFiXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ291dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgZ2V0TG9nb1VybCA9ICh0YWIpID0+IHtcbiAgICAgICAgbGV0IGxvZ29VcmwgPSAnJztcbiAgICAgICAgaWYgKHRhYiA9PT0gJ01BTkFHRV9MSVNUSU5HUycpIHtcbiAgICAgICAgICAgIGxvZ29VcmwgPSAnbWFuYWdlbGlzdGluZ3MnXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhYiA9PT0gJ01BUktFVFBMQUNFJykge1xuICAgICAgICAgICAgbG9nb1VybCA9ICdtYXJrZXRwbGFjZSdcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9nb1VybDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlckJhcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0hlYWRlckJhci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmNsYXNzIEhpc3RvcnlCdXR0b24gZXh0ZW5kcyAgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgb25DbGljaywgcGF0aH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShcInRlc3RcIiwgXCJUaXRsZVwiLCBlbnZob3N0dXJsICsgcGF0aCk7XG4gICAgICAgIG9uQ2xpY2soKTtcblxuICAgIH07XG5cbiAgICBvbkJhY2tCdXR0b25FdmVudCA9IChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gdGhpcy5vbkJhY2tCdXR0b25FdmVudDtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxidXR0b24gey4uLnRoaXMucHJvcHN9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlCdXR0b247XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9IaXN0b3J5QnV0dG9uLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IGNhbmNlbEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2NhbmNlbC5wbmdcIjtcbmV4cG9ydCBjb25zdCBidWNrZXRJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9idWNrZXQucG5nXCI7XG5leHBvcnQgY29uc3QgYWRkSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYWRkLnBuZ1wiO1xuZXhwb3J0IGNvbnN0IGV4Y2xhbWF0aW9uUm91bmRJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9leGNsYW1hdGlvbl9yb3VuZC5wbmdcIjtcbmV4cG9ydCBjb25zdCBjbG9ja1JvdW5kSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvY2xvY2sucG5nXCI7XG5leHBvcnQgY29uc3QgcGxheUljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL3BsYXkucG5nXCI7XG5leHBvcnQgY29uc3QgYmx1ZUNoZWNrSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYmx1ZV9jaGVjay5wbmdcIjtcbmV4cG9ydCBjb25zdCB5ZWxsb3dDaGVja0ljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL3llbGxvd19jaGVjaC5wbmdcIjtcbmV4cG9ydCBjb25zdCBiaWRJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9oYW1tZXIucG5nXCI7XG5leHBvcnQgY29uc3QgZml4ZWRJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9iaWQucG5nXCI7XG5leHBvcnQgY29uc3QgZG9jSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvZG9jLnBuZ1wiO1xuZXhwb3J0IGNvbnN0IHBkZkljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL3BkZi5wbmdcIjtcbmV4cG9ydCBjb25zdCBlZGl0SWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvZWRpdC5wbmdcIjtcbmV4cG9ydCBjb25zdCBibHVlRW52ZWxvcGVJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9lbnZlbG9wZV8yLnBuZ1wiO1xuZXhwb3J0IGNvbnN0IGluZm9JY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9pbmZvX2JsdWUucG5nXCI7XG5leHBvcnQgY29uc3Qgc29sZEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL3NvbGQucG5nXCI7XG5leHBvcnQgY29uc3QgZXhwaXJlZEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2V4cGlyZWQucG5nXCI7XG5cbmV4cG9ydCBjb25zdCBTcGlubmVyID0gKHt0ZXN0fSkgPT4gKFxuICAgIDxkaXY+PGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIi8+PC9kaXY+XG4pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9JY29ucy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xuaW1wb3J0IHtjdXN0b21TdHlsZXMsIEdlbmVyaWNNb2RhbFN0eWxlfSBmcm9tIFwiLi4vc3R5bGVzL2N1c3RvbVwiO1xuaW1wb3J0IHtjb21wYW55SXNWYWxpZH0gZnJvbSBcIi4uLy4uL3NlbGwvYWN0aW9ucy92YWxpZGF0aW9uQWN0aW9uc1wiO1xuXG5jbGFzcyBTZW5kTWVzc2FnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaXNPcGVuIDogcHJvcHMuaXNPcGVuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgfVxuXG4gICAgb3BlbiA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNPcGVuIDogdHJ1ZX0pO1xuICAgIH07XG5cbiAgICBjbG9zZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNPcGVuIDogZmFsc2UsIHNob3dTdWNjZXNzIDogZmFsc2V9KTtcbiAgICB9O1xuXG4gICAgc2VuZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBsaXN0aW5nSWQsIHJlY2lwaWVudCwgcm9sZSB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBsZXQgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIGNvbnRlbnQgOiB0aGlzLnN0YXRlLm1lc3NhZ2UsXG4gICAgICAgICAgICBsaXN0aW5nIDogbGlzdGluZ0lkLFxuICAgICAgICAgICAgcmVjaXBpZW50IDogcmVjaXBpZW50LmlkLFxuICAgICAgICAgICAgcm9sZSA6IHJvbGUgfHwgXCJCVVlFUlwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2F2aW5nIDogdHJ1ZX0pO1xuXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnNlbmRNZXNzYWdlKG1lc3NhZ2UpLmRvbmUocj0+e1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2F2aW5nIDogZmFsc2UsIHNob3dTdWNjZXNzIDogdHJ1ZSwgbWVzc2FnZSA6IG51bGx9KVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3QgeyByZWNpcGllbnQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHsgc2hvd1N1Y2Nlc3MsIHNhdmluZywgbWVzc2FnZSB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1vZGFsXG4gICAgICAgICAgICAgICAgaXNPcGVuPXt0aGlzLnN0YXRlLmlzT3Blbn1cbiAgICAgICAgICAgICAgICBvblJlcXVlc3RDbG9zZT17dGhpcy5jbG9zZX1cbiAgICAgICAgICAgICAgICBib2R5T3BlbkNsYXNzTmFtZT17XCJnZW5lcmljLW1vZGFsXCJ9XG4gICAgICAgICAgICAgICAgc3R5bGU9e0dlbmVyaWNNb2RhbFN0eWxlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImdlbmVyaWMtbW9kYWwtY29udGFpbmVyXCJ9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBDb250YWN0IHtyZWNpcGllbnQubGVnYWxOYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyFzYXZpbmcgJiYgIXNob3dTdWNjZXNzICYmXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgb25DaGFuZ2U9eyhlKT0+e3RoaXMuc2V0U3RhdGUoe21lc3NhZ2U6IGUudGFyZ2V0LnZhbHVlfSl9fSB2YWx1ZT17bWVzc2FnZX0vPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYXZpbmcgJiYgPGRpdj48aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiIC8+PC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICAgICAge3Nob3dTdWNjZXNzICYmIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWVzc2FnZSBzZW50IVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJidXR0b25zXCJ9PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7IXNhdmluZyAmJiAhc2hvd1N1Y2Nlc3MgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImNvbmZpcm1cIn0gZGlzYWJsZWQ9eyFtZXNzYWdlfSBvbkNsaWNrPXt0aGlzLnNlbmR9PlNlbmQ8L2J1dHRvbj59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHshc2hvd1N1Y2Nlc3MgJiYgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNsb3NlfT5DYW5jZWw8L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2hvd1N1Y2Nlc3MgJiYgPGJ1dHRvbiAgY2xhc3NOYW1lPXtcImNvbmZpcm1cIn0gb25DbGljaz17dGhpcy5jbG9zZX0+Q2xvc2U8L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9Nb2RhbD5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VuZE1lc3NhZ2U7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL1NlbmRNZXNzYWdlLmpzIiwiZXhwb3J0IGNvbnN0IGN1c3RvbVN0eWxlcyA9IHtcbiAgICBjb250ZW50IDoge1xuICAgICAgICB0b3AgICAgICAgICAgICAgICAgICAgOiAnNTAlJyxcbiAgICAgICAgbGVmdCAgICAgICAgICAgICAgICAgIDogJzUwJScsXG4gICAgICAgIHJpZ2h0ICAgICAgICAgICAgICAgICA6ICdhdXRvJyxcbiAgICAgICAgYm90dG9tICAgICAgICAgICAgICAgIDogJ2F1dG8nLFxuICAgICAgICBtYXJnaW5SaWdodCAgICAgICAgICAgOiAnLTUwJScsXG4gICAgICAgIHRyYW5zZm9ybSAgICAgICAgICAgICA6ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgICAgICAgOiAnI0Y0RjZGOScsXG4gICAgICAgIGJvcmRlciAgICAgICAgICAgICAgICA6ICdub25lJyxcbiAgICAgICAgYm9yZGVyUmFkaXVzICAgICAgICAgIDogMCxcbiAgICAgICAgYm9yZGVyQm90dG9tICAgICAgICAgIDogJzRweCBzb2xpZCAjMkFBQUVDJyxcbiAgICB9LFxuICAgIG92ZXJsYXkgOiB7XG4gICAgICAgIHpJbmRleCAgICAgICAgICAgICAgICA6IDEwMFxuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBTZWxlY3Rvck1vZGFsU3R5bGUgPSB7XG4gICAgY29udGVudCA6IHtcbiAgICAgICAgdG9wICAgICAgICAgICAgICAgICAgIDogJzUwJScsXG4gICAgICAgIGxlZnQgICAgICAgICAgICAgICAgICA6ICc1MCUnLFxuICAgICAgICByaWdodCAgICAgICAgICAgICAgICAgOiAnYXV0bycsXG4gICAgICAgIGJvdHRvbSAgICAgICAgICAgICAgICA6ICdhdXRvJyxcbiAgICAgICAgbWFyZ2luUmlnaHQgICAgICAgICAgIDogJy01MCUnLFxuICAgICAgICB0cmFuc2Zvcm0gICAgICAgICAgICAgOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yICAgICAgIDogJyNGNEY2RjknLFxuICAgICAgICBib3JkZXIgICAgICAgICAgICAgICAgOiAnbm9uZScsXG4gICAgICAgIGJvcmRlclJhZGl1cyAgICAgICAgICA6IDAsXG4gICAgICAgIGJvcmRlckJvdHRvbSAgICAgICAgICA6ICc0cHggc29saWQgIzJBQUFFQycsXG4gICAgICAgIHBhZGRpbmcgICAgICAgICAgICAgICA6IFwiMjBweFwiXG4gICAgfSxcbiAgICBvdmVybGF5IDoge1xuICAgICAgICB6SW5kZXggICAgICAgICAgICAgICAgOiAxMDBcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgR2VuZXJpY01vZGFsU3R5bGUgPSB7XG4gICAgY29udGVudCA6IHtcbiAgICAgICAgdG9wICAgICAgICAgICAgICAgICAgIDogJzUwJScsXG4gICAgICAgIGxlZnQgICAgICAgICAgICAgICAgICA6ICc1MCUnLFxuICAgICAgICByaWdodCAgICAgICAgICAgICAgICAgOiAnYXV0bycsXG4gICAgICAgIGJvdHRvbSAgICAgICAgICAgICAgICA6ICdhdXRvJyxcbiAgICAgICAgbWFyZ2luUmlnaHQgICAgICAgICAgIDogJy01MCUnLFxuICAgICAgICB0cmFuc2Zvcm0gICAgICAgICAgICAgOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yICAgICAgIDogJyNGRkZGRkYnLFxuICAgICAgICBib3JkZXIgICAgICAgICAgICAgICAgOiAnbm9uZScsXG4gICAgICAgIGJvcmRlclJhZGl1cyAgICAgICAgICA6IDAsXG4gICAgICAgIHBhZGRpbmcgICAgICAgICAgICAgICA6IFwiMjBweFwiXG4gICAgfSxcbiAgICBvdmVybGF5IDoge1xuICAgICAgICB6SW5kZXggICAgICAgICAgICAgICAgOiAxMDAsXG4gICAgICAgIGJhY2tncm91bmRDb2xvciAgICAgICA6ICdyZ2JhKDAsIDAsIDAsIDAuNiknXG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3N0eWxlcy9jdXN0b20uanMiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IE1vbWVudCBmcm9tIFwibW9tZW50L21vbWVudFwiO1xuaW1wb3J0IENvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzIGZyb20gXCIuLi8uLi9idXkvY29tcG9uZW50cy9Db250ZW50TGlzdGluZ0V2ZW50RGV0YWlsc1wiO1xuaW1wb3J0IHtnb1RvLCBsaW1pdFRleHR9IGZyb20gXCIuLi8uLi9tYWluL2FjdGlvbnMvdXRpbHNcIjtcbmltcG9ydCB7XG4gICAgYmx1ZUNoZWNrSWNvbiwgY2xvY2tSb3VuZEljb24sIGV4Y2xhbWF0aW9uUm91bmRJY29uLCBleHBpcmVkSWNvbiwgcGxheUljb24sIHNvbGRJY29uLFxuICAgIHllbGxvd0NoZWNrSWNvblxufSBmcm9tIFwiLi4vLi4vbWFpbi9jb21wb25lbnRzL0ljb25zXCI7XG5pbXBvcnQge1N1cGVyUmlnaHRCb2FyZExhYmVsc30gZnJvbSBcIi4uLy4uL3NlbGwvY29tcG9uZW50cy9TdXBlclJpZ2h0RGVmaW5pdGlvbnNcIjtcblxuY2xhc3MgQm9hcmRMaXN0aW5nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBzaG93T3B0aW9uczogZmFsc2UsXG4gICAgICAgICAgICBzaG93UmVtb3ZlQ29uZmlybSA6IGZhbHNlLFxuICAgICAgICAgICAgc2hvd0RlYWN0aXZhdGVDb25maXJtIDogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jbG9ja0ljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2Nsb2NrLnBuZ1wiO1xuICAgICAgICB0aGlzLmV4Y2xhbWF0aW9uSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvZXhjbGFtYXRpb25fcm91bmQucG5nXCI7XG4gICAgICAgIHRoaXMucGxheUljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL3BsYXkucG5nXCI7XG4gICAgICAgIHRoaXMuYnVja2V0SWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYnVja2V0X2JsdWUucG5nXCI7XG4gICAgICAgIHRoaXMuZWRpdEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2VkaXQucG5nXCI7XG4gICAgICAgIHRoaXMuZHVwbGljYXRlSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvZHVwbGljYXRlLnBuZ1wiO1xuICAgICAgICB0aGlzLnZpZXdJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9zZWFyY2gucG5nXCI7XG4gICAgICAgIHRoaXMuc3VibWl0SWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvc3VibWl0LnBuZ1wiO1xuICAgICAgICB0aGlzLmRvdHNJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9kb3RzLnBuZ1wiO1xuICAgICAgICB0aGlzLmRlYWN0aXZhdGVJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9jbG9zZV9yZWQucG5nXCI7XG4gICAgfVxuXG4gICAgb25TZWxlY3QgPSAoKSA9PiB7XG4gICAgICBjb25zdCB7b25TZWxlY3QsIGN1c3RvbUlkfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGlmICggb25TZWxlY3QgKSBvblNlbGVjdChjdXN0b21JZCk7XG5cbiAgICB9O1xuXG4gICAgdG9nZ2xlT3B0aW9ucyA9IChlKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dPcHRpb25zOiAhdGhpcy5zdGF0ZS5zaG93T3B0aW9uc30pO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG5cbiAgICBlZGl0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IGN1c3RvbUlkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBnb1RvKFwibWFuYWdlbGlzdGluZ3MvZWRpdC9cIiArIGN1c3RvbUlkKVxuICAgIH07XG5cbiAgICBzdWJtaXQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY3VzdG9tSWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGdvVG8oXCJtYW5hZ2VsaXN0aW5ncy9lZGl0L1wiICsgY3VzdG9tSWQgKyBcIi81XCIpXG4gICAgfTtcblxuICAgIHZpZXcgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY3VzdG9tSWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGdvVG8oXCJsaXN0aW5nL1wiICsgY3VzdG9tSWQsIHRydWUpO1xuICAgIH07XG5cbiAgICBoaWRlT3B0aW9ucyA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHtkZWZhdWx0QWN0aW9ufSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHtzaG93T3B0aW9uc30gPSB0aGlzLnN0YXRlO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93T3B0aW9uczogZmFsc2V9KTtcbiAgICAgICAgaWYgKCBkZWZhdWx0QWN0aW9uICYmICFzaG93T3B0aW9ucyApe1xuICAgICAgICAgICAgaWYgKCBkZWZhdWx0QWN0aW9uID09PSBcIkVESVRcIil7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0KClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBkZWZhdWx0QWN0aW9uID09PSBcIlZJRVdcIil7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3KClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBkZWZhdWx0QWN0aW9uID09PSBcIlNVQk1JVFwiKXtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgUFJPR1JBTV9OQU1FLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGN1c3RvbUlkLFxuICAgICAgICAgICAgZXhwaXJlc0F0LFxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlcyxcbiAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2UsXG4gICAgICAgICAgICB0b3VybmFtZW50LFxuICAgICAgICAgICAgc2Vhc29ucyxcbiAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgIHNob3dFZGl0LFxuICAgICAgICAgICAgc2hvd1JlbW92ZSxcbiAgICAgICAgICAgIHNob3dTdWJtaXQsXG4gICAgICAgICAgICBzaG93RHVwbGljYXRlLFxuICAgICAgICAgICAgc2hvd0RlYWN0aXZhdGUsXG4gICAgICAgICAgICBzaG93VmlldyxcbiAgICAgICAgICAgIG9uUmVtb3ZlLFxuICAgICAgICAgICAgb25EdXBsaWNhdGUsXG4gICAgICAgICAgICBvbkRlYWN0aXZhdGUsXG4gICAgICAgICAgICBsYXN0QWN0aW9uLFxuICAgICAgICAgICAgbGFzdEFjdGlvbkRhdGUsXG4gICAgICAgICAgICBsYXN0QWN0aW9uVXNlcixcbiAgICAgICAgICAgIG93bmVyLFxuICAgICAgICAgICAgc3RhdHVzLFxuICAgICAgICAgICAgb25TdWJtaXQsXG4gICAgICAgICAgICBzdHlsZVxuICAgICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBjb25zdCB7c2hvd09wdGlvbnMsIHNob3dSZW1vdmVDb25maXJtLCBzaG93RGVhY3RpdmF0ZUNvbmZpcm0sIHNob3dTdGF0dXNJbmZvfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHN0eWxlPXtzdHlsZX0gb25DbGljaz17dGhpcy5oaWRlT3B0aW9uc30+XG4gICAgICAgICAgICAgICAge3Nob3dPcHRpb25zICYmIDxkaXYgY2xhc3NOYW1lPVwib3B0aW9ucy10b29sdGlwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtzaG93U3VibWl0ICYmIDxkaXYgY2xhc3NOYW1lPXtcIm9wdGlvblwifSBvbkNsaWNrPXt0aGlzLnN1Ym1pdH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17dGhpcy5zdWJtaXRJY29ufSAvPiBTdWJtaXRcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICB7c2hvd0VkaXQgJiYgPGRpdiBjbGFzc05hbWU9e1wib3B0aW9uXCJ9IG9uQ2xpY2s9e3RoaXMuZWRpdH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17dGhpcy5lZGl0SWNvbn0gLz4gRWRpdFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIHtzaG93RHVwbGljYXRlICYmIDxkaXYgY2xhc3NOYW1lPXtcIm9wdGlvblwifSBvbkNsaWNrPXsoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd09wdGlvbnM6IGZhbHNlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkR1cGxpY2F0ZShjdXN0b21JZCk7XG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3RoaXMuZHVwbGljYXRlSWNvbn0gLz4gRHVwbGljYXRlXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAge3Nob3dWaWV3ICYmIDxkaXYgY2xhc3NOYW1lPXtcIm9wdGlvblwifSBvbkNsaWNrPXt0aGlzLnZpZXd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3RoaXMudmlld0ljb259IC8+IFZpZXdcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICB7c2hvd1JlbW92ZSAmJiA8ZGl2IGNsYXNzTmFtZT17XCJvcHRpb25cIn0gb25DbGljaz17KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dSZW1vdmVDb25maXJtOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3RoaXMuYnVja2V0SWNvbn0gLz4gUmVtb3ZlXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAge3Nob3dEZWFjdGl2YXRlICYmIDxkaXYgY2xhc3NOYW1lPXtcIm9wdGlvblwifSBvbkNsaWNrPXsoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd0RlYWN0aXZhdGVDb25maXJtOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3RoaXMuZGVhY3RpdmF0ZUljb259IHN0eWxlPXt7d2lkdGg6IDE2fX0gLz4gRGVhY3RpdmF0ZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG5cbiAgICAgICAgICAgICAgICAgICAge2xhc3RBY3Rpb24gJiYgPGRpdiBjbGFzc05hbWU9XCJsYXN0LWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgTGFzdCBhY3Rpb246IHtsYXN0QWN0aW9uLmRlc2NyaXB0aW9ufSB7bGFzdEFjdGlvblVzZXIgJiYgXCJieSBcIiArIGxhc3RBY3Rpb25Vc2VyLmZpcnN0TmFtZSArIFwiIFwiICsgbGFzdEFjdGlvblVzZXIubGFzdE5hbWUgfSB7bGFzdEFjdGlvbkRhdGUgJiYgXCJvbiBcIiArIE1vbWVudChsYXN0QWN0aW9uRGF0ZSkuZm9ybWF0KCdISDptbSBERC9NTS9ZWVlZJyl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cblxuICAgICAgICAgICAgICAgICAgICB7b3duZXIgJiYgPGRpdiBjbGFzc05hbWU9XCJsYXN0LWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgTGlzdGluZyBPd25lcjoge293bmVyLmZpcnN0TmFtZSArIFwiIFwiICsgb3duZXIubGFzdE5hbWUgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgPC9kaXY+fVxuXG4gICAgICAgICAgICAgICAgey8qQ09ORklSTSBERUFDVElWQVRFKi99XG4gICAgICAgICAgICAgICAge3Nob3dEZWFjdGl2YXRlQ29uZmlybSAmJiA8ZGl2IGNsYXNzTmFtZT1cImNvbmZpcm1hdGlvbi10b29sdGlwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbmZpcm1hdGlvbi10ZXh0XCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlYWN0aXZhdGUgdGhlIGxpc3Rpbmc/XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidXR0b24gYnV0dG9uLWNvbmZpcm1cIn0gb25DbGljaz17KGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93RGVhY3RpdmF0ZUNvbmZpcm06IGZhbHNlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgRGVhY3RpdmF0ZVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wiYnV0dG9uXCJ9IG9uQ2xpY2s9eyhlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd0RlYWN0aXZhdGVDb25maXJtOiBmYWxzZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+fVxuXG5cbiAgICAgICAgICAgICAgICB7LypDT05GSVJNIFJFTU9WRSovfVxuICAgICAgICAgICAgICAgIHtzaG93UmVtb3ZlQ29uZmlybSAmJiA8ZGl2IGNsYXNzTmFtZT1cImNvbmZpcm1hdGlvbi10b29sdGlwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbmZpcm1hdGlvbi10ZXh0XCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlbW92ZSB0aGUgbGlzdGluZz9cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImJ1dHRvbiBidXR0b24tY29uZmlybVwifSBvbkNsaWNrPXsoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dSZW1vdmVDb25maXJtOiBmYWxzZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgUmVtb3ZlXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidXR0b25cIn0gb25DbGljaz17KGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93UmVtb3ZlQ29uZmlybTogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cblxuICAgICAgICAgICAgICAgIHsvKlNUQVRVUyBJTkZPKi99XG4gICAgICAgICAgICAgICAge3Nob3dTdGF0dXNJbmZvICYmIDxkaXYgY2xhc3NOYW1lPVwic3RhdHVzLXRvb2x0aXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wib3B0aW9uXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3N0YXR1cy5uYW1lID09PSAnUEVORElORycgJiYgXCJMaXN0aW5nIHVuZGVyIHJldmlldy4gTm90IHZpc2libGUgaW4gdGhlIG1hcmtldHBsYWNlIHlldC5cIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzdGF0dXMubmFtZSA9PT0gJ0lOQUNUSVZFJyAmJiBcIkxpc3RpbmcgaXMgZGVhY3RpdmF0ZWQuXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICB7c3RhdHVzLm5hbWUgPT09ICdSRUpFQ1RFRCcgJiYgXCJMaXN0aW5nIHJlamVjdGVkLiBQbGVhc2UgZWRpdCBvciBjb250YWN0IHN1cHBvcnQuXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICB7c3RhdHVzLm5hbWUgPT09ICdFWFBJUkVEJyAmJiBcIlRoaXMgbGlzdGluZyBoYXMgZXhwaXJlZC5cIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzdGF0dXMubmFtZSA9PT0gJ1NPTERfT1VUJyAmJiBcIkFsbCBzYWxlcyBidW5kbGUgb2YgdGhpcyBsaXN0aW5nIHdlcmUgc29sZC5cIn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+fVxuXG4gICAgICAgICAgICAgICAgeyAoc3RhdHVzLm5hbWUgIT09ICdEUkFGVCcgJiYgc3RhdHVzLm5hbWUgIT09ICdBUFBST1ZFRCcgJiYgc3RhdHVzLm5hbWUgIT09ICdFRElURUQnICkgJiZcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJzdGF0dXMtaWNvblwifVxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3Zlcj17KCkgPT4ge3RoaXMuc2V0U3RhdGUoe3Nob3dTdGF0dXNJbmZvIDogdHJ1ZX0pfX1cbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiB7dGhpcy5zZXRTdGF0ZSh7c2hvd1N0YXR1c0luZm8gOiBmYWxzZX0pfX0+XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMubmFtZSA9PT0gJ1BFTkRJTkcnICYmIDxpbWcgc3JjPXtjbG9ja1JvdW5kSWNvbn0gLz59XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMubmFtZSA9PT0gJ0lOQUNUSVZFJyAmJjxpbWcgc3JjPXtwbGF5SWNvbn0gLz59XG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMubmFtZSA9PT0gJ1JFSkVDVEVEJyAmJiA8aW1nIHNyYz17ZXhjbGFtYXRpb25Sb3VuZEljb259IC8+fVxuICAgICAgICAgICAgICAgICAgICB7c3RhdHVzLm5hbWUgPT09ICdFWFBJUkVEJyAmJiA8aW1nIHNyYz17ZXhwaXJlZEljb259IC8+fVxuICAgICAgICAgICAgICAgICAgICB7c3RhdHVzLm5hbWUgPT09ICdTT0xEX09VVCcgJiYgPGltZyBzcmM9e3NvbGRJY29ufSAvPn1cbiAgICAgICAgICAgICAgICA8L2Rpdj59XG5cbiAgICAgICAgICAgICAgICA8ZGl2ICBjbGFzc05hbWU9XCJtZW51LWljb25cIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZU9wdGlvbnN9PlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17dGhpcy5kb3RzSWNvbn0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJuYW1lXCJ9PlxuICAgICAgICAgICAgICAgICAgICB7IG5hbWUgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRvdXJuYW1lbnRcIn0+XG4gICAgICAgICAgICAgICAgICAgIHt0b3VybmFtZW50ICYmIHRvdXJuYW1lbnQubGVuZ3RoID09PSAxICYmIDxkaXYgY2xhc3NOYW1lPVwiaXRlbVwiPnt0b3VybmFtZW50WzBdLm5hbWV9PC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICB7dG91cm5hbWVudCAmJiB0b3VybmFtZW50Lmxlbmd0aCA9PT0gMCAmJiA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1cIj5HZW5lcmFsIGNvbnRlbnQ8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIHtzZWFzb25zICYmIHNlYXNvbnMubGVuZ3RoID4gMSAmJiA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1cIj5TZWFzb246IE11bHRpcGxlIHNlYXNvbnM8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIHtzZWFzb25zICYmIHNlYXNvbnMubGVuZ3RoID09PSAxICYmIDxkaXYgY2xhc3NOYW1lPVwiaXRlbVwiPlNlYXNvbjoge3NlYXNvbnNbMF0ueWVhcn08L2Rpdj59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wicmlnaHRzXCJ9PlxuICAgICAgICAgICAgICAgICAgICB7cmlnaHRzUGFja2FnZSAmJiByaWdodHNQYWNrYWdlLm1hcCgocnAsaSxsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtcInJwLVwiK2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshcnAuZXhjbHVzaXZlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2JsdWVDaGVja0ljb259Lz59XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cnAuZXhjbHVzaXZlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3llbGxvd0NoZWNrSWNvbn0vPn1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtTdXBlclJpZ2h0Qm9hcmRMYWJlbHNbcnAuc2hvcnRMYWJlbF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBycC5zaG9ydExhYmVsID09PSBcIlBSXCIgJiYgUFJPR1JBTV9OQU1FICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQcm9ncmFtOiBcIiArIFBST0dSQU1fTkFNRVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJleHBpcnlcIn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+eyBzYWxlc1BhY2thZ2VzLmxlbmd0aCB9IHNhbGVzIGJ1bmRsZXsgc2FsZXNQYWNrYWdlcy5sZW5ndGggPiAxICYmIFwic1wifTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PkV4cGlyeToge2V4cGlyZXNBdCA/IE1vbWVudChleHBpcmVzQXQpLmZvcm1hdCgnREQvTU0vWVlZWScpIDogJ05vdCBzZXQnfTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQm9hcmRMaXN0aW5nO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbXBvbmVudHMvQm9hcmRMaXN0aW5nLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcbmltcG9ydCBSZWFjdFRhYmxlIGZyb20gXCJyZWFjdC10YWJsZVwiO1xuaW1wb3J0IENvbnRlbnRMaXN0aW5nIGZyb20gJy4uLy4uL21haW4vY29tcG9uZW50cy9Db250ZW50TGlzdGluZyc7XG5pbXBvcnQgU2VuZE1lc3NhZ2UgZnJvbSBcIi4uLy4uL21haW4vY29tcG9uZW50cy9TZW5kTWVzc2FnZVwiO1xuaW1wb3J0IHtnZXRDdXJyZW5jeVN5bWJvbCwgZ29UbywgbGltaXRUZXh0LCB2aWV3TGljZW5zZUJpZH0gZnJvbSBcIi4uLy4uL21haW4vYWN0aW9ucy91dGlsc1wiO1xuaW1wb3J0IE1vbWVudCBmcm9tIFwibW9tZW50L21vbWVudFwiO1xuaW1wb3J0IFJlYWN0VG9vbHRpcCBmcm9tICdyZWFjdC10b29sdGlwJztcblxuY29uc3QgcmlnaHRJbWFnZVN0eWxlID0ge1xuICAgIHdpZHRoOiAxNyxcbiAgICBoZWlnaHQ6IDE3XG59O1xuXG5jbGFzcyBDbG9zZWREZWFscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbG9hZGluZyA6IGZhbHNlLFxuICAgICAgICAgICAgYmlkcyA6IFtdLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNhbmNlbEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2NhbmNlbC5wbmdcIjtcbiAgICAgICAgdGhpcy5jaGVja0ljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2JsdWVfY2hlY2sucG5nXCI7XG4gICAgICAgIHRoaXMuZG9jSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvZG9jLnBuZ1wiO1xuICAgICAgICB0aGlzLmJsdWVFbnZlbG9wZUljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2VudmVsb3BlXzIucG5nXCI7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOnRydWV9KTtcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0Q2xvc2VkRGVhbHMoKS5kb25lKChiaWRzKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7YmlkczogYmlkcywgbG9hZGluZyA6IGZhbHNlfSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc2VsZWN0TGlzdGluZyA9IChpZCkgPT4ge1xuICAgICAgICBnb1RvKFwibGlzdGluZy9cIiArIGlkKTtcbiAgICB9O1xuXG4gICAgcmVuZGVyICgpIHtcbiAgICAgICAgY29uc3QgeyBsb2FkaW5nLCBiaWRzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICBmbGV4OiAxXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJpZHMubGVuZ3RoID4gMCAmJiBiaWRzLm1hcCgoYixpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFNlbmRNZXNzYWdlIGtleT17aX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtcIm1lc3NhZ2VQb3B1cFwiICsgYi5pZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RpbmdJZD17Yi5jb250ZW50LmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNpcGllbnQ9e2IuY29udGVudC5jb21wYW55fS8+XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJpZHMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJlYWN0VGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiY2EtdGFibGVcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UGFnZVNpemU9ezMwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQYWdlU2l6ZU9wdGlvbnM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQYWdpbmF0aW9uPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2U9e3RoaXMub25QYWdlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pblJvd3M9ezB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXphYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhPXtiaWRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdD17dGhpcy5wcm9wcy5zZWxlY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucz17W3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAnRGVhbCBJRCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyIHRhYmxlLWhlYWRlci1sZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICdjdXN0b21JZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XCIjXCIrcHJvcHMudmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMaXN0aW5nIG5hbWUgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc29ydFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItYmlnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1iaWcgc29ydGluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiBkID0+IHtyZXR1cm57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lIDogZC5jb250ZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGQuY29udGVudC5jdXN0b21JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtcImxpc3RpbmcvXCIgKyBwcm9wcy52YWx1ZS5jdXN0b21JZH0+e2xpbWl0VGV4dChwcm9wcy52YWx1ZS5uYW1lKX08L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICdjb250ZW50LmNvbXBhbnkubGVnYWxOYW1lJywgLy8gUmVxdWlyZWQgYmVjYXVzZSBvdXIgYWNjZXNzb3IgaXMgbm90IGEgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2VsbGVyIDxpIGNsYXNzTmFtZT1cImZhIGZhLXNvcnRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbGFzc05hbWUgOiAndGFibGUtaGVhZGVyLWJpZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItYmlnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS10aXA9XCJMaXZlIHRyYW5zbWlzc2lvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExUXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiAnY29udGVudC5yaWdodHNQYWNrYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItc21hbGwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZWxsOiBwcm9wcyA9PiA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYmx1ZVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS5tYXAocj0+ci5zaG9ydExhYmVsKS5pbmRleE9mKFwiTFRcIikgIT09IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHN0eWxlPXtyaWdodEltYWdlU3R5bGV9IHNyYz17dGhpcy5jaGVja0ljb259Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtdGlwPVwiTGl2ZSBiZXR0aW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTEJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICdjb250ZW50LnJpZ2h0c1BhY2thZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbGFzc05hbWUgOiAndGFibGUtaGVhZGVyLXNtYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJibHVlXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLm1hcChyPT5yLnNob3J0TGFiZWwpLmluZGV4T2YoXCJITFwiKSAhPT0gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3JpZ2h0SW1hZ2VTdHlsZX0gc3JjPXt0aGlzLmNoZWNrSWNvbn0vPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS10aXA9XCJEZWxheWVkIHRyYW5zbWlzc2lvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERUXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiAnY29udGVudC5yaWdodHNQYWNrYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItc21hbGwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZWxsOiBwcm9wcyA9PiA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYmx1ZVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS5tYXAocj0+ci5zaG9ydExhYmVsKS5pbmRleE9mKFwiRFRcIikgIT09IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHN0eWxlPXtyaWdodEltYWdlU3R5bGV9IHNyYz17dGhpcy5jaGVja0ljb259Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtdGlwPVwiSGlnaGxpZ2h0c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhMXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiAnY29udGVudC5yaWdodHNQYWNrYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItc21hbGwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZWxsOiBwcm9wcyA9PiA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYmx1ZVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS5tYXAocj0+ci5zaG9ydExhYmVsKS5pbmRleE9mKFwiSExcIikgIT09IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHN0eWxlPXtyaWdodEltYWdlU3R5bGV9IHNyYz17dGhpcy5jaGVja0ljb259Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtdGlwPVwiTmV3cyBhY2Nlc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOQVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2NvbnRlbnQucmlnaHRzUGFja2FnZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItc21hbGwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyLXNtYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcImJsdWVcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMudmFsdWUubWFwKHI9PnIuc2hvcnRMYWJlbCkuaW5kZXhPZihcIk5BXCIpICE9PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17cmlnaHRJbWFnZVN0eWxlfSBzcmM9e3RoaXMuY2hlY2tJY29ufS8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLXRpcD1cIlByb2dyYW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQUlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2NvbnRlbnQucmlnaHRzUGFja2FnZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItc21hbGwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyLXNtYWxsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcImJsdWVcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMudmFsdWUubWFwKHI9PnIuc2hvcnRMYWJlbCkuaW5kZXhPZihcIlBSXCIpICE9PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17cmlnaHRJbWFnZVN0eWxlfSBzcmM9e3RoaXMuY2hlY2tJY29ufS8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogKCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGVycml0b3JpZXMgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc29ydFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGVycml0b3JpZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6IGQgPT4ge3JldHVybntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgOiBkLnNhbGVzUGFja2FnZS50ZXJyaXRvcmllcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXJyaXRvcmllcyA6IGQuc2FsZXNQYWNrYWdlLnRlcnJpdG9yaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhjbHVkZWRDb3VudHJpZXMgOiBkLnNhbGVzUGFja2FnZS5leGNsdWRlZENvdW50cmllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmxkd2lkZSA6IGQuc2FsZXNQYWNrYWdlLnRlcnJpdG9yaWVzTWV0aG9kID09PSBcIldPUkxEV0lERVwiICYmIGQuc2FsZXNQYWNrYWdlLmJ1bmRsZU1ldGhvZCA9PT0gXCJTRUxMX0FTX0JVTkRMRVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhjbHVkaW5nIDogZC5zYWxlc1BhY2thZ2UudGVycml0b3JpZXNNZXRob2QgPT09IFwiV09STERXSURFX0VYQ0xVRElOR1wiICYmIGQuc2FsZXNQYWNrYWdlLmJ1bmRsZU1ldGhvZCA9PT0gXCJTRUxMX0FTX0JVTkRMRVwiICYmIGQuc2FsZXNQYWNrYWdlLmV4Y2x1ZGVkQ291bnRyaWVzLmxlbmd0aCA9PT0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBzaXplLCB0ZXJyaXRvcmllcywgd29ybGR3aWRlLCBleGNsdWRpbmcsIGV4Y2x1ZGVkQ291bnRyaWVzfSA9IHByb3BzLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wiYmx1ZVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshd29ybGR3aWRlICYmICFleGNsdWRpbmcgJiYgc2l6ZSA+IDEgJiYgc2l6ZSArIFwiIHRlcnJpdG9yaWVzXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyF3b3JsZHdpZGUgJiYgIWV4Y2x1ZGluZyAmJiBzaXplID09PSAxICYmIHRlcnJpdG9yaWVzWzBdLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZXhjbHVkaW5nICYmIFwiV29ybGR3aWRlIGV4Y2x1ZGluZyBcIiArIGV4Y2x1ZGVkQ291bnRyaWVzWzBdLm5hbWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3dvcmxkd2lkZSAmJiBcIldvcmxkd2lkZVwiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmljZSA8aSBjbGFzc05hbWU9XCJmYSBmYS1zb3J0XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwcmljZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogZCA9PiB7cmV0dXJuIHtmZWU6IGQudG90YWxGZWUsIGN1cnJlbmN5OiBkLnNhbGVzUGFja2FnZS5jdXJyZW5jeS5jb2RlfX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXYgY2xhc3NOYW1lPXtcImJsdWVcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMudmFsdWUuZmVlICsgXCIgXCIgKyBnZXRDdXJyZW5jeVN5bWJvbChwcm9wcy52YWx1ZS5jdXJyZW5jeSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAoKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRlIG9mIHNhbGUgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc29ydFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICdjcmVhdGVkQXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZWxsOiBwcm9wcyA9PiA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge01vbWVudChwcm9wcy52YWx1ZSkuZm9ybWF0KCdERC9NTS9ZWVlZJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ1eWVyIG5hbWUgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc29ydFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItYmlnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1iaWcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2J1eWVyVXNlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMudmFsdWUuZmlyc3ROYW1lICsgXCIgXCIgKyBwcm9wcy52YWx1ZS5sYXN0TmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdBY3Rpb25zJywgLy8gQ3VzdG9tIGhlYWRlciBjb21wb25lbnRzIVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogJ2hlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiBkID0+IHtyZXR1cm57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA6IGQuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGQuY3VzdG9tSWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXYgY2xhc3NOYW1lPXtcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3ttYXJnaW46JzAgMTBweCcsIGN1cnNvcjogJ3BvaW50ZXInfX0gb25DbGljaz17KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3TGljZW5zZUJpZChwcm9wcy52YWx1ZS5jdXN0b21JZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IHNyYz17dGhpcy5kb2NJY29ufS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHN0eWxlPXt7bWFyZ2luOicwIDEwcHgnLCBjdXJzb3I6ICdwb2ludGVyJ319IG9uQ2xpY2s9eygpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzW1wibWVzc2FnZVBvcHVwXCIrcHJvcHMudmFsdWUuaWRdLm9wZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IHNyYz17dGhpcy5ibHVlRW52ZWxvcGVJY29ufS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJlYWN0VG9vbHRpcCBwbGFjZT1cInRvcFwiIHR5cGU9XCJkYXJrXCIgZWZmZWN0PVwic29saWRcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYmlkcy5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYW5hZ2VyLWNvbnRlbnQtbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmcgJiYgPGRpdiBjbGFzc05hbWU9XCJiaWctc3Bpbm5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFsb2FkaW5nICYmIDxkaXYgY2xhc3NOYW1lPVwiYmlnLXNwaW5uZXJcIiBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMzBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IGRvbid0IGhhdmUgY2xvc2VkIGRlYWwgeWV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICggc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICAgIHJldHVybiB7XG4gICAgfVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcbikoQ2xvc2VkRGVhbHMpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvQ2xvc2VkRGVhbHMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5pbXBvcnQgQ29udGVudExpc3RpbmdDb21tZXJjaWFsQWN0aXZpdHkgZnJvbSAnLi4vLi4vbWFpbi9jb21wb25lbnRzL0NvbnRlbnRMaXN0aW5nQ29tbWVyY2lhbEFjdGl2aXR5JztcblxuaW1wb3J0IHtnb1RvTGlzdGluZ30gZnJvbSBcIi4uLy4uL21haW4vYWN0aW9ucy91dGlsc1wiO1xuaW1wb3J0IHtsYW5ndWFnZXN9IGZyb20gXCIuLi8uLi8uLi9kYXRhL2xhbmd1YWdlc1wiO1xuXG5jbGFzcyBDb21tZXJjaWFsQWN0aXZpdHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGxvYWRpbmcgOiBmYWxzZSxcbiAgICAgICAgICAgIGxpc3RpbmdzIDogW10sXG4gICAgICAgICAgICBzZWxlY3RlZExpc3RpbmdzOiBbXSxcbiAgICAgICAgICAgIGZpbHRlcjogJ0FMTCcsXG4gICAgICAgICAgICBidW5kbGVzT3BlbjogZmFsc2UsXG4gICAgICAgICAgICBiaWRzT3BlbiA6IGZhbHNlXG5cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5idWxsZXRJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9idWxsZXQucG5nXCI7XG4gICAgICAgIHRoaXMuYWN0aXZlQnVsbGV0SWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYWN0aXZlX2J1bGxldC5wbmdcIjtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgZGVsZXRlQmlkID0gKGlkKSA9PiB7XG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnJlbW92ZUJpZCh7aWQ6aWR9KS5kb25lKChyKT0+e1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHVwZGF0ZSA9ICgpPT4ge1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOnRydWV9KTtcblxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5nZXRBbGxEZWFscygpLmRvbmUoKGxpc3RpbmdzKSA9PiB7XG4gICAgICAgICAgICBsaXN0aW5ncy5mb3JFYWNoKGw9PkNvbnRlbnRBcmVuYS5VdGlscy5jb250ZW50UGFyc2VyRnJvbVNlcnZlcihsKSk7XG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7bGlzdGluZ3M6IGxpc3RpbmdzLCBsb2FkaW5nIDogZmFsc2V9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZpbHRlckJ5TGlzdGluZyA9IChzZWxlY3RlZCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkTGlzdGluZ3MgOiAoc2VsZWN0ZWQpID8gW3NlbGVjdGVkLnZhbHVlXSA6IFtdLFxuICAgICAgICAgICAgYmlkc09wZW4gOiB0cnVlXG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIGZpbHRlcmVkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IGZpbHRlciAsIHNlbGVjdGVkTGlzdGluZ3N9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBsZXQgbGlzdGluZ3MgPSB0aGlzLnN0YXRlLmxpc3RpbmdzIHx8IFtdO1xuXG4gICAgICAgIGlmICggc2VsZWN0ZWRMaXN0aW5ncy5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICBsaXN0aW5ncyA9IHRoaXMuc3RhdGUubGlzdGluZ3MuZmlsdGVyKGIgPT4gc2VsZWN0ZWRMaXN0aW5ncy5pbmRleE9mKGIuaWQpICE9PSAtMSk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGZpbHRlcikge1xuICAgICAgICAgICAgY2FzZSBcIkNMT1NFRFwiIDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGluZ3MuZmlsdGVyKGIgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYi5zYWxlc1BhY2thZ2VzLmZpbHRlcigoc3ApPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3AuYmlkcy5maWx0ZXIoYj0+Yi5zdGF0dXMubmFtZSA9PT0gXCJBUFBST1ZFRFwiKS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2FzZSBcIk9QRU5cIiA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RpbmdzLmZpbHRlcihiID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGIuc2FsZXNQYWNrYWdlcy5maWx0ZXIoKHNwKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNwLmJpZHMuZmlsdGVyKGI9PmIuc3RhdHVzLm5hbWUgPT09IFwiUEVORElOR1wiKS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgIH0pLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlZmF1bHQgOlxuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0aW5ncztcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgcmVtb3ZlID0gKCBjdXN0b21JZCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxpc3RpbmdzIDogdGhpcy5zdGF0ZS5saXN0aW5ncy5maWx0ZXIobCA9PiBsLmN1c3RvbUlkICE9PSBjdXN0b21JZClcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIGNvbnN0IHsgbG9hZGluZywgZmlsdGVyLCBzZWxlY3RlZExpc3RpbmdzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBsZXQgbGlzdGluZ3MgPSB0aGlzLmZpbHRlcmVkKCk7XG4gICAgICAgIGNvbnN0IGFsbExpc3RpbmdzID0gdGhpcy5zdGF0ZS5saXN0aW5ncztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQgOiAnMTAwJSd9fT5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm1hbmFnZXItZmlsdGVyLWNvbnRhaW5lclwifT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibGlzdGluZy1maWx0ZXJcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImZvcm0tZmllbGQtbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBbGwgbGlzdGluZ3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmZpbHRlckJ5TGlzdGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkTGlzdGluZ3NbMF19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17YWxsTGlzdGluZ3MubWFwKChiKT0+KHt2YWx1ZSA6IGIuaWQgLCBsYWJlbCA6IGIubmFtZSB9KSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJzdGF0dXMtZmlsdGVyXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wic3RhdHVzLWZpbHRlci1pdGVtXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57dGhpcy5zZXRTdGF0ZSh7ZmlsdGVyOiBcIkFMTFwifSl9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyPT09XCJBTExcIiAmJiA8aW1nIHNyYz17dGhpcy5hY3RpdmVCdWxsZXRJY29ufSAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyIT09XCJBTExcIiAmJiA8aW1nIHNyYz17dGhpcy5idWxsZXRJY29ufSAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBbGwgYnVuZGxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJzdGF0dXMtZmlsdGVyLWl0ZW1cIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9Pnt0aGlzLnNldFN0YXRlKHtmaWx0ZXI6ICdBQ1RJVklUWSd9KX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXI9PT1cIkFDVElWSVRZXCIgJiYgPGltZyBzcmM9e3RoaXMuYWN0aXZlQnVsbGV0SWNvbn0gLz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2ZpbHRlciE9PVwiQUNUSVZJVFlcIiAmJiA8aW1nIHNyYz17dGhpcy5idWxsZXRJY29ufSAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBXaXRoIGFjdGl2aXR5XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInN0YXR1cy1maWx0ZXItaXRlbVwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+e3RoaXMuc2V0U3RhdGUoe2ZpbHRlcjogXCJPUEVOXCJ9KX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXI9PT1cIk9QRU5cIiAmJiA8aW1nIHNyYz17dGhpcy5hY3RpdmVCdWxsZXRJY29ufSAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyIT09XCJPUEVOXCIgJiYgPGltZyBzcmM9e3RoaXMuYnVsbGV0SWNvbn0gLz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3BlbiBCaWRzXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInN0YXR1cy1maWx0ZXItaXRlbVwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+e3RoaXMuc2V0U3RhdGUoe2ZpbHRlcjogJ0NMT1NFRCd9KX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXI9PT1cIkNMT1NFRFwiICYmIDxpbWcgc3JjPXt0aGlzLmFjdGl2ZUJ1bGxldEljb259IC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXIhPT1cIkNMT1NFRFwiICYmIDxpbWcgc3JjPXt0aGlzLmJ1bGxldEljb259IC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENsb3NlZCBkZWFsc1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsaXN0aW5ncy5sZW5ndGggPiAwICYmIGxpc3RpbmdzLm1hcCgobGlzdGluZywgaSwgbGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxDb250ZW50TGlzdGluZ0NvbW1lcmNpYWxBY3Rpdml0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlPXt0aGlzLnVwZGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRlbGV0ZT17dGhpcy5kZWxldGVCaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmlkc09wZW49e2xpc3QubGVuZ3RoID09PSAxIHx8IHRoaXMuc3RhdGUuZmlsdGVyICE9PSBcIkFMTFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1bmRsZXNPcGVuPXtsaXN0Lmxlbmd0aCA9PT0gMSB8fCB0aGlzLnN0YXRlLmZpbHRlciAhPT0gXCJBTExcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlV2l0aG91dEJpZHM9e3RoaXMuc3RhdGUuZmlsdGVyID09PSBcIkFDVElWSVRZXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyQnlPcGVuQmlkcz17dGhpcy5zdGF0ZS5maWx0ZXIgPT09IFwiT1BFTlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlckJ5Q2xvc2VkRGVhbHM9e3RoaXMuc3RhdGUuZmlsdGVyID09PSBcIkNMT1NFRFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtpZCA9PiBnb1RvTGlzdGluZyhpZCwgdHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpICsgXCItXCIgKyBsaXN0aW5nLmN1c3RvbUlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5saXN0aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RpbmdzLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hbmFnZXItY29udGVudC1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZyAmJiA8ZGl2IGNsYXNzTmFtZT1cImJpZy1zcGlubmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWxvYWRpbmcgJiYgPGRpdiBjbGFzc05hbWU9XCJiaWctc3Bpbm5lclwiIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAzMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3UgaGF2ZSBubyBvZmZlcnMgeWV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoIHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgICByZXR1cm4ge1xuICAgIH1cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXG4pKENvbW1lcmNpYWxBY3Rpdml0eSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29udGFpbmVycy9Db21tZXJjaWFsQWN0aXZpdHkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IHtnb1RvfSBmcm9tIFwiLi4vLi4vbWFpbi9hY3Rpb25zL3V0aWxzXCI7XG5pbXBvcnQgQm9hcmRMaXN0aW5nIGZyb20gJy4uL2NvbXBvbmVudHMvQm9hcmRMaXN0aW5nJztcblxuY2xhc3MgTWFuYWdlTGlzdGluZ3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGxvYWRpbmcgOiBmYWxzZSxcbiAgICAgICAgICAgIGxvYWRpbmdEcmFmdDpmYWxzZSxcbiAgICAgICAgICAgIGxvYWRpbmdJbmFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICBsb2FkaW5nQWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIGxvYWRpbmdFeHBpcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGRyYWZ0IDogW10sXG4gICAgICAgICAgICBhY3RpdmUgOiBbXSxcbiAgICAgICAgICAgIGluYWN0aXZlIDogW10sXG4gICAgICAgICAgICBleHBpcmVkIDogW10sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxvYWRpbmdEcmFmdDp0cnVlLFxuICAgICAgICAgICAgbG9hZGluZ0luYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgbG9hZGluZ0FjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIGxvYWRpbmdFeHBpcmVkOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLmdldERyYWZ0TGlzdGluZ3MoKS5kb25lKChsaXN0aW5ncykgPT4ge1xuICAgICAgICAgICAgbGlzdGluZ3MgPSBsaXN0aW5ncy5tYXAoIGxpc3RpbmcgPT4gQ29udGVudEFyZW5hLlV0aWxzLmNvbnRlbnRQYXJzZXJGcm9tU2VydmVyKGxpc3RpbmcpICk7XG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7ZHJhZnQ6IGxpc3RpbmdzLCBsb2FkaW5nRHJhZnQgOiBmYWxzZX0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5nZXRJbmFjdGl2ZUxpc3RpbmdzKCkuZG9uZSgobGlzdGluZ3MpID0+IHtcbiAgICAgICAgICAgIGxpc3RpbmdzID0gbGlzdGluZ3MubWFwKCBsaXN0aW5nID0+IENvbnRlbnRBcmVuYS5VdGlscy5jb250ZW50UGFyc2VyRnJvbVNlcnZlcihsaXN0aW5nKSApO1xuICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe2luYWN0aXZlOiBsaXN0aW5ncywgbG9hZGluZ0luYWN0aXZlIDogZmFsc2V9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0QWN0aXZlTGlzdGluZ3MoKS5kb25lKChsaXN0aW5ncykgPT4ge1xuICAgICAgICAgICAgbGlzdGluZ3MgPSBsaXN0aW5ncy5tYXAoIGxpc3RpbmcgPT4gQ29udGVudEFyZW5hLlV0aWxzLmNvbnRlbnRQYXJzZXJGcm9tU2VydmVyKGxpc3RpbmcpICk7XG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiBsaXN0aW5ncywgbG9hZGluZ0FjdGl2ZSA6IGZhbHNlfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLmdldEV4cGlyZWRMaXN0aW5ncygpLmRvbmUoKGxpc3RpbmdzKSA9PiB7XG4gICAgICAgICAgICBsaXN0aW5ncyA9IGxpc3RpbmdzLm1hcCggbGlzdGluZyA9PiBDb250ZW50QXJlbmEuVXRpbHMuY29udGVudFBhcnNlckZyb21TZXJ2ZXIobGlzdGluZykgKTtcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtleHBpcmVkOiBsaXN0aW5ncywgbG9hZGluZ0V4cGlyZWQgOiBmYWxzZX0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RMaXN0aW5nID0gKGlkKSA9PiB7XG4gICAgICAgIGdvVG8oXCJsaXN0aW5nL1wiICsgaWQpO1xuICAgIH07XG5cbiAgICBkdXBsaWNhdGUgPSAoY3VzdG9tSWQpID0+IHtcbiAgICAgICAgbGV0IGRyYWZ0ID0gdGhpcy5zdGF0ZS5kcmFmdDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9hZGluZ0RyYWZ0IDogdHJ1ZX0pO1xuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5kdXBsaWNhdGVMaXN0aW5nKGN1c3RvbUlkKS5kb25lKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyApIHtcbiAgICAgICAgICAgICAgICBkcmFmdC51bnNoaWZ0KHJlc3BvbnNlLmxpc3RpbmcpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2RyYWZ0IDogZHJhZnQsIGxvYWRpbmdEcmFmdCA6IGZhbHNlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBkZWFjdGl2YXRlID0gKGN1c3RvbUlkKSA9PiB7XG4gICAgICAgIGxldCBpbmFjdGl2ZSA9IHRoaXMuc3RhdGUuaW5hY3RpdmU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvYWRpbmdJbmFjdGl2ZSA6IHRydWV9KTtcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZGVhY3RpdmF0ZUxpc3RpbmcoY3VzdG9tSWQpLmRvbmUocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zdWNjZXNzICkge1xuICAgICAgICAgICAgICAgIC8vaW5hY3RpdmUudW5zaGlmdChDb250ZW50QXJlbmEuVXRpbHMuY29udGVudFBhcnNlckZyb21TZXJ2ZXIocmVzcG9uc2UubGlzdGluZykpO1xuICAgICAgICAgICAgICAgIGluYWN0aXZlLnVuc2hpZnQocmVzcG9uc2UubGlzdGluZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5hY3RpdmUgOiBpbmFjdGl2ZSwgbG9hZGluZ0luYWN0aXZlIDogZmFsc2V9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGxvYWRpbmdEcmFmdCxcbiAgICAgICAgICAgIGxvYWRpbmdBY3RpdmUsXG4gICAgICAgICAgICBsb2FkaW5nRXhwaXJlZCxcbiAgICAgICAgICAgIGxvYWRpbmdJbmFjdGl2ZSxcbiAgICAgICAgICAgIGRyYWZ0LCBhY3RpdmUsIGluYWN0aXZlLCBleHBpcmVkIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICBmbGV4OiAxXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcwIDAgNXB4JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNEY0RjRGJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDE2LFxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3AgOiAnLTE1cHgnXG5cbiAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e21hcmdpbjonMCAyMHB4JyAsIGZsZXg6IDEsZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJ319PlxuICAgICAgICAgICAgICAgICAgICAgICAgRHJhZnQgKHtkcmFmdC5sZW5ndGh9KVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e21hcmdpbjonMCAyMHB4JywgZmxleDogMX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgSW5hY3RpdmUgbGlzdGluZ3MgKHtpbmFjdGl2ZS5sZW5ndGh9KVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e21hcmdpbjonMCAyMHB4JywgZmxleDogMX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgQWN0aXZlIGxpc3RpbmdzICh7YWN0aXZlLmxlbmd0aH0pXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7bWFyZ2luOicwIDIwcHgnLCBmbGV4OiAxfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBFeHBpcmVkICYgc29sZCBsaXN0aW5ncyAoe2V4cGlyZWQubGVuZ3RofSlcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJib2FyZFwifT5cbiAgICAgICAgICAgICAgICAgICAgey8qRFJBRlQqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiY29sdW1uXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2xvYWRpbmdEcmFmdCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpdW0tc3Bpbm5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYWZ0Lmxlbmd0aCA+IDAgJiYgZHJhZnQubWFwKChsaXN0aW5nLCBpLCBsaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8Qm9hcmRMaXN0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e1wiZHJhZnQtXCIgKyBpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGlzdGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleCA6IGxpc3QubGVuZ3RoIC0gaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb249e1wiRURJVFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0VkaXQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93UmVtb3ZlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0R1cGxpY2F0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dWaWV3PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXsoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZnQ6IGxpc3R9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5yZW1vdmVMaXN0aW5nKGxpc3RpbmcuY3VzdG9tSWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EdXBsaWNhdGU9e3RoaXMuZHVwbGljYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmxpc3Rpbmd9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgey8qSU5BQ1RJVkUqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiY29sdW1uXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2xvYWRpbmdJbmFjdGl2ZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpdW0tc3Bpbm5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluYWN0aXZlLmxlbmd0aCA+IDAgJiYgaW5hY3RpdmUubWFwKChsaXN0aW5nLCBpLCBsaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8Qm9hcmRMaXN0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e1wiaW5hY3RpdmUtXCIgKyBpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGlzdGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleCA6IGxpc3QubGVuZ3RoIC0gaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb249e1wiU1VCTUlUXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93RWRpdD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dSZW1vdmU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93RHVwbGljYXRlPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1N1Ym1pdD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dWaWV3PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmU9eygpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbmFjdGl2ZTogbGlzdH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnJlbW92ZUxpc3RpbmcobGlzdGluZy5jdXN0b21JZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkR1cGxpY2F0ZT17dGhpcy5kdXBsaWNhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ubGlzdGluZ30vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7LypBQ1RJVkUqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiY29sdW1uXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZS5sZW5ndGggPT09IDAgJiYgbG9hZGluZ0FjdGl2ZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpdW0tc3Bpbm5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZS5sZW5ndGggPiAwICYmIGFjdGl2ZS5tYXAoKGxpc3RpbmcsIGksIGxpc3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxCb2FyZExpc3RpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17XCJhY3RpdmUtXCIgKyBpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibGlzdGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleCA6IGxpc3QubGVuZ3RoIC0gaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dFZGl0PXtsaXN0aW5nLmVkaXRhYmxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1JlbW92ZT17bGlzdGluZy5lZGl0YWJsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dEZWFjdGl2YXRlPXtsaXN0aW5nLmVkaXRhYmxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0R1cGxpY2F0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dWaWV3PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbj17XCJWSUVXXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRlYWN0aXZhdGU9eygpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmU6IGxpc3R9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlYWN0aXZhdGUobGlzdGluZy5jdXN0b21JZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmU9eygpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmU6IGxpc3R9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5yZW1vdmVMaXN0aW5nKGxpc3RpbmcuY3VzdG9tSWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EdXBsaWNhdGU9e3RoaXMuZHVwbGljYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmxpc3Rpbmd9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgey8qRVhQSVJFRCovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjb2x1bW5cIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZXhwaXJlZC5sZW5ndGggPT09IDAgJiYgbG9hZGluZ0V4cGlyZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVkaXVtLXNwaW5uZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBpcmVkLmxlbmd0aCA+IDAgJiYgZXhwaXJlZC5tYXAoKGxpc3RpbmcsIGksIGxpc3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxCb2FyZExpc3RpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17XCJleHBpcmVkLVwiICsgaX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpc3RpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXggOiBsaXN0Lmxlbmd0aCAtIGlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93UmVtb3ZlPXtsaXN0aW5nLmVkaXRhYmxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0R1cGxpY2F0ZT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dWaWV3PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmU9eygpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBpcmVkOiBsaXN0fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkucmVtb3ZlTGlzdGluZyhsaXN0aW5nLmN1c3RvbUlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHVwbGljYXRlPXt0aGlzLmR1cGxpY2F0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5saXN0aW5nfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoIHN0YXRlLCBvd25Qcm9wcykgPT4ge1xuICAgIHJldHVybiBzdGF0ZTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgICByZXR1cm4ge1xuICAgIH1cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXG4pKE1hbmFnZUxpc3RpbmdzKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9jb250YWluZXJzL01hbmFnZUxpc3RpbmdzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcbmltcG9ydCBIZWFkZXJCYXIgZnJvbSAnLi4vLi4vbWFpbi9jb21wb25lbnRzL0hlYWRlckJhcic7XG5pbXBvcnQgV2F0Y2hsaXN0IGZyb20gJy4vV2F0Y2hsaXN0JztcbmltcG9ydCBDbG9zZWREZWFscyBmcm9tICcuL0Nsb3NlZERlYWxzJztcbmltcG9ydCBQZW5kaW5nRGVhbHMgZnJvbSAnLi9QZW5kaW5nRGVhbHMnO1xuaW1wb3J0IE1hbmFnZUxpc3RpbmdzIGZyb20gJy4vTWFuYWdlTGlzdGluZ3MnO1xuaW1wb3J0IENvbW1lcmNpYWxBY3Rpdml0eSBmcm9tICcuL0NvbW1lcmNpYWxBY3Rpdml0eSc7XG5pbXBvcnQgTWVzc2FnZXMgZnJvbSAnLi9NZXNzYWdlcyc7XG5pbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9TZXR0aW5ncyc7XG5cbmNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHByb2ZpbGUgOiBwcm9wcy5wcm9maWxlLFxuICAgICAgICAgICAgdGFiIDogcHJvcHMudGFiLFxuICAgICAgICAgICAgdXNlciA6IHByb3BzLnVzZXIsXG4gICAgICAgICAgICBtb2RlIDogcHJvcHMubW9kZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIGNvbnN0IHsgcHJvZmlsZSwgdGFiLCB1c2VyLCBtb2RlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7IGNvbXBhbnkgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJtYW5hZ2VyLWNvbnRhaW5lclwifT5cbiAgICAgICAgICAgICAgICA8SGVhZGVyQmFyIHRhYj17dGFifSBwcm9maWxlPXtwcm9maWxlfS8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYW5hZ2VyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAge3RhYiA9PT0gJ1dBVENITElTVCcgJiYgPFdhdGNobGlzdCBjb21wYW55PXtjb21wYW55fSAvPn1cbiAgICAgICAgICAgICAgICAgICAge3RhYiA9PT0gJ0NMT1NFRF9ERUFMUycgJiYgPENsb3NlZERlYWxzIC8+fVxuICAgICAgICAgICAgICAgICAgICB7dGFiID09PSAnQklEUycgJiYgPFBlbmRpbmdEZWFscyBtb2RlPXttb2RlfSAvPn1cbiAgICAgICAgICAgICAgICAgICAge3RhYiA9PT0gJ01BTkFHRV9MSVNUSU5HUycgJiYgPE1hbmFnZUxpc3RpbmdzIC8+fVxuICAgICAgICAgICAgICAgICAgICB7dGFiID09PSAnQ09NTUVSQ0lBTF9BQ1RJVklUWScgJiYgPENvbW1lcmNpYWxBY3Rpdml0eS8+fVxuICAgICAgICAgICAgICAgICAgICB7dGFiID09PSAnTUVTU0FHRVMnICYmIDxNZXNzYWdlcyB1c2VyPXt1c2VyfS8+fVxuICAgICAgICAgICAgICAgICAgICB7dGFiID09PSAnU0VUVElOR1MnICYmIDxTZXR0aW5ncy8+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICggc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICAgIHJldHVybiB7XG4gICAgfVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcbikoTWFuYWdlcilcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9jb250YWluZXJzL01hbmFnZXIuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IHtnZXRGdWxsTmFtZSwgZ29UbywgZ29Ub0xpc3RpbmcsIGxpbWl0VGV4dH0gZnJvbSBcIi4uLy4uL21haW4vYWN0aW9ucy91dGlsc1wiO1xuaW1wb3J0IEJvYXJkTGlzdGluZyBmcm9tICcuLi9jb21wb25lbnRzL0JvYXJkTGlzdGluZyc7XG5pbXBvcnQgTW9tZW50IGZyb20gXCJtb21lbnQvbW9tZW50XCI7XG5cbmNsYXNzIE1lc3NhZ2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0aHJlYWRzIDogW10sXG4gICAgICAgICAgICBsb2FkaW5nVGhyZWFkcyA6IGZhbHNlLFxuICAgICAgICAgICAgbG9hZGluZ01lc3NhZ2VzIDogZmFsc2UsXG4gICAgICAgICAgICBzZWxlY3RlZFRocmVhZCA6IG51bGwsXG4gICAgICAgICAgICBpbnB1dE1lc3NhZ2UgOiBudWxsLFxuICAgICAgICAgICAgbWVzc2FnZXMgOiBbXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBsb2FkaW5nVGhyZWFkcyA6dHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0VGhyZWFkcygpLmRvbmUocj0+e1xuXG4gICAgICAgICAgICByLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYURhdGUgPSBNb21lbnQoYS5sYXN0TWVzc2FnZURhdGUpO1xuICAgICAgICAgICAgICAgIGxldCBiRGF0ZSA9IE1vbWVudChiLmxhc3RNZXNzYWdlRGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChhRGF0ZSA+IGJEYXRlKSA/IDEgOiAoKGJEYXRlID4gYS5iRGF0ZSkgPyAtMSA6IDApXG4gICAgICAgICAgICB9KS5yZXZlcnNlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHRocmVhZHMgOiByLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVGhyZWFkIDogKHRoaXMuc3RhdGUuc2VsZWN0ZWRUaHJlYWQpID8gdGhpcy5zdGF0ZS5zZWxlY3RlZFRocmVhZCA6IChyLmxlbmd0aCA+IDApID8gclswXSA6IG51bGwsXG4gICAgICAgICAgICAgICAgbG9hZGluZ1RocmVhZHMgOmZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0VGhyZWFkID0gKHRocmVhZCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHNlbGVjdGVkVGhyZWFkIDp0aHJlYWRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlcyh0aHJlYWQpO1xuICAgIH07XG5cbiAgICB1cGRhdGVNZXNzYWdlcyA9ICh0aHJlYWQpID0+IHtcbiAgICAgICAgbGV0IHNlbGVjdGVkVGhyZWFkID0gdGhyZWFkIHx8IHRoaXMuc3RhdGUuc2VsZWN0ZWRUaHJlYWQ7XG5cbiAgICAgICAgaWYgKCFzZWxlY3RlZFRocmVhZCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbG9hZGluZ01lc3NhZ2VzIDp0cnVlLFxuICAgICAgICAgICAgbWVzc2FnZXM6IFtdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLmdldFRocmVhZChzZWxlY3RlZFRocmVhZC5jdXN0b21JZCkuZG9uZShyPT57XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBsb2FkaW5nTWVzc2FnZXMgOmZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzIDogclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZW5kID0gKCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHNlbGVjdGVkVGhyZWFkLFxuICAgICAgICAgICAgaW5wdXRNZXNzYWdlLFxuICAgICAgICAgICAgbWVzc2FnZXNcbiAgICAgICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBjb250ZW50IDogaW5wdXRNZXNzYWdlLFxuICAgICAgICAgICAgdGhyZWFkIDogc2VsZWN0ZWRUaHJlYWQuaWQsXG4gICAgICAgICAgICBsaXN0aW5nIDogc2VsZWN0ZWRUaHJlYWQubGlzdGluZy5pZFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0TWVzc2FnZSA6IFwiXCIsIHNhdmluZyA6IHRydWV9KTtcblxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5zZW5kTWVzc2FnZShtZXNzYWdlKS5kb25lKHI9PntcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NhdmluZyA6IGZhbHNlLCBzaG93U3VjY2VzcyA6IHRydWUsICBtZXNzYWdlczogWy4uLm1lc3NhZ2VzLCByXX0pXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBsb2FkaW5nVGhyZWFkcyxcbiAgICAgICAgICAgIGxvYWRpbmdNZXNzYWdlcyxcbiAgICAgICAgICAgIHNlbGVjdGVkVGhyZWFkLFxuICAgICAgICAgICAgdGhyZWFkcyxcbiAgICAgICAgICAgIGlucHV0TWVzc2FnZSxcbiAgICAgICAgICAgIG1lc3NhZ2VzLFxuICAgICAgICAgICAgc2F2aW5nXG4gICAgICAgIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IHsgdXNlciB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibWVzc2FnZXMtY29udGFpbmVyXCJ9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRocmVhZHNcIn0+XG4gICAgICAgICAgICAgICAgICAgIHtsb2FkaW5nVGhyZWFkcyAmJiB0aHJlYWRzLmxlbmd0aCA9PT0wICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIgLz4gfVxuICAgICAgICAgICAgICAgICAgICB7IWxvYWRpbmdUaHJlYWRzICYmIHRocmVhZHMubGVuZ3RoID09PTAgJiYgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5vIHRocmVhZHMgeWV0XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiB9XG4gICAgICAgICAgICAgICAgICAgIHshbG9hZGluZ1RocmVhZHMgJiYgdGhyZWFkcy5tYXAoKHQsaSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17KHNlbGVjdGVkVGhyZWFkLmlkID09PSB0LmlkKSA/IFwidGhyZWFkIHRocmVhZC1zZWxlY3RlZFwiIDogXCJ0aHJlYWRcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17XCJ0aHJlYWQtXCIgKyBpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9Pnt0aGlzLnNlbGVjdFRocmVhZCh0KX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImRhdGVcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0Lmxhc3RNZXNzYWdlRGF0ZSAmJiBNb21lbnQodC5sYXN0TWVzc2FnZURhdGUpLmZvcm1hdCgnWVlZWS9NTS9ERCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImxpc3RpbmctbmFtZVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3QubGlzdGluZy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbXBhbnlcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0Lm9wcG9zaXRlUGFydHkubGVnYWxOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInVzZXJcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRGdWxsTmFtZSh0Lmxhc3RNZXNzYWdlVXNlcikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImxhc3QtbWVzc2FnZVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3QubGFzdE1lc3NhZ2VDb250ZW50ICYmIGxpbWl0VGV4dCh0Lmxhc3RNZXNzYWdlQ29udGVudCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7c2VsZWN0ZWRUaHJlYWQgJiYgPGRpdiBjbGFzc05hbWU9XCJ0aHJlYWQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0aHJlYWQtdGl0bGVcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJsaXN0aW5nLW5hbWVcIn0gb25DbGljaz17KCk9Pntnb1RvTGlzdGluZyhzZWxlY3RlZFRocmVhZC5saXN0aW5nLmN1c3RvbUlkLCB0cnVlKX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZFRocmVhZC5saXN0aW5nLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tcGFueS1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkVGhyZWFkLm9wcG9zaXRlUGFydHkubGVnYWxOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJtZXNzYWdlc1wifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsb2FkaW5nTWVzc2FnZXMgJiYgbWVzc2FnZXMubGVuZ3RoID09PTAgJiYgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyFsb2FkaW5nTWVzc2FnZXMgJiYgbWVzc2FnZXMubWFwKChtLGkpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXsodXNlcj09PW0uc2VuZGVyLmVtYWlsKSA/IFwibWVzc2FnZSBvd24tbWVzc2FnZVwiIDogXCJtZXNzYWdlXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJtZXNzYWdlLXNlbmRlclwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRGdWxsTmFtZShtLnNlbmRlcil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJtZXNzYWdlLWNvbnRlbnRcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bS5jb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibWVzc2FnZS1kYXRlXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge01vbWVudChtLmNyZWF0ZWRBdCkuZm9ybWF0KCdZWVlZL01NL0REIEhIOm1tJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm1lc3NhZ2UtaW5wdXRcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJtZXNzYWdlLWlucHV0LXRpdGxlXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdyaXRlIGEgbWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRNZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9Pnt0aGlzLnNldFN0YXRlKHtpbnB1dE1lc3NhZ2UgOiBlLnRhcmdldC52YWx1ZX0pfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wibWVzc2FnZS1jb250ZW50XCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1wid3JpdGUgYSBtZXNzYWdlXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcInN0YW5kYXJkLWJ1dHRvblwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNlbmR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshaW5wdXRNZXNzYWdlfHwgaW5wdXRNZXNzYWdlID09PSBcIlwiIHx8IHNhdmluZ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyFzYXZpbmcgJiYgXCJTZW5kXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NhdmluZyAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz59XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+fVxuXG4gICAgICAgICAgICAgICAgeyFzZWxlY3RlZFRocmVhZCAmJiA8ZGl2Pk5vIHRocmVhZCBzZWxlY3RlZDwvZGl2PiB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCBzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICB9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xuKShNZXNzYWdlcylcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29udGFpbmVycy9NZXNzYWdlcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XG5pbXBvcnQgQ29udGVudExpc3RpbmdQZW5kaW5nQmlkIGZyb20gJy4uLy4uL21haW4vY29tcG9uZW50cy9Db250ZW50TGlzdGluZ1BlbmRpbmdCaWQnO1xuaW1wb3J0IHtnb1RvfSBmcm9tIFwiLi4vLi4vbWFpbi9hY3Rpb25zL3V0aWxzXCI7XG5cbmNsYXNzIFBlbmRpbmdEZWFscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbG9hZGluZyA6IGZhbHNlLFxuICAgICAgICAgICAgbG9hZGluZ0RlY2xpbmVkIDogZmFsc2UsXG4gICAgICAgICAgICBiaWRzIDogW10sXG4gICAgICAgICAgICBkZWNsaW5lZEJpZHM6IFtdLFxuICAgICAgICAgICAgYWN0aXZlIDogcHJvcHMubW9kZSA9PT0gXCJBQ1RJVkVcIlxuXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYnVsbGV0SWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYnVsbGV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmFjdGl2ZUJ1bGxldEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2FjdGl2ZV9idWxsZXQucG5nXCI7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHNlbGVjdExpc3RpbmcgPSAoaWQpID0+IHtcbiAgICAgICAgZ29UbyhcImxpc3RpbmcvXCIgKyBpZCwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIHVwZGF0ZSA9ICgpID0+IHtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9hZGluZzp0cnVlLCBsb2FkaW5nRGVjbGluZWQgOiB0cnVlfSk7XG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLmdldFBlbmRpbmdEZWFscygpLmRvbmUoKGJpZHMpID0+IHtcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtiaWRzOiBiaWRzLCBsb2FkaW5nIDogZmFsc2V9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0UmVqZWN0ZWREZWFscygpLmRvbmUoKGRlY2xpbmVkQmlkcykgPT4ge1xuICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe2RlY2xpbmVkQmlkczogZGVjbGluZWRCaWRzLCBsb2FkaW5nRGVjbGluZWQgOiBmYWxzZX0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZGVsZXRlQmlkID0gKGlkKSA9PiB7XG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnJlbW92ZUJpZCh7aWQ6aWR9KS5kb25lKChyKT0+e1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJlbW92ZSA9ICggY3VzdG9tSWQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBiaWRzIDogdGhpcy5zdGF0ZS5iaWRzLmZpbHRlcihsID0+IGwuY3VzdG9tSWQgIT09IGN1c3RvbUlkKVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmVuZGVyICgpIHtcbiAgICAgICAgY29uc3QgeyBsb2FkaW5nLCBiaWRzLCBhY3RpdmUsIGRlY2xpbmVkQmlkcywgbG9hZGluZ0RlY2xpbmVkIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICBmbGV4OiAxXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzAgMCAyMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNEY0RjRGJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDBcbiAgICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e21hcmdpbjonMCAyMHB4J319PkJpZHM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e21hcmdpbjonMCAyMHB4JyAsIGN1cnNvcjogJ3BvaW50ZXInfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+e2dvVG8oXCJiaWRzL2FjdGl2ZWJpZHNcIil9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmUgJiYgPGltZyAgc3R5bGU9e3ttYXJnaW46JzBweCAxMHB4IDNweCd9fSBzcmM9e3RoaXMuYWN0aXZlQnVsbGV0SWNvbn0gLz59XG4gICAgICAgICAgICAgICAgICAgICAgICB7IWFjdGl2ZSAmJiA8aW1nICBzdHlsZT17e21hcmdpbjonMHB4IDEwcHggM3B4J319IHNyYz17dGhpcy5idWxsZXRJY29ufSAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIEFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e21hcmdpbjonMCAyMHB4JywgY3Vyc29yOiAncG9pbnRlcid9fVxuICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57Z29UbyhcImJpZHMvZGVjbGluZWRiaWRzXCIpfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IWFjdGl2ZSAmJiA8aW1nICBzdHlsZT17e21hcmdpbjonMHB4IDEwcHggM3B4J319IHNyYz17dGhpcy5hY3RpdmVCdWxsZXRJY29ufSAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmUgJiYgPGltZyAgc3R5bGU9e3ttYXJnaW46JzBweCAxMHB4IDNweCd9fSBzcmM9e3RoaXMuYnVsbGV0SWNvbn0gLz59XG4gICAgICAgICAgICAgICAgICAgICAgICBEZWNsaW5lZFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlICYmIGJpZHMubGVuZ3RoID4gMCAmJiBiaWRzLm1hcCgoYmlkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPENvbnRlbnRMaXN0aW5nUGVuZGluZ0JpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLnNlbGVjdExpc3Rpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9e3RoaXMuZGVsZXRlQmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aSArIFwiLVwiICsgYmlkLmNvbnRlbnQuY3VzdG9tSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmlkPXtiaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmJpZC5jb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICFhY3RpdmUgJiYgZGVjbGluZWRCaWRzLmxlbmd0aCA+IDAgJiYgZGVjbGluZWRCaWRzLm1hcCgoYmlkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPENvbnRlbnRMaXN0aW5nUGVuZGluZ0JpZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLnNlbGVjdExpc3Rpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9e3RoaXMuZGVsZXRlQmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aSArIFwiLVwiICsgYmlkLmNvbnRlbnQuY3VzdG9tSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmlkPXtiaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmJpZC5jb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSAmJiBiaWRzLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hbmFnZXItY29udGVudC1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZyAmJiA8ZGl2IGNsYXNzTmFtZT1cImJpZy1zcGlubmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWxvYWRpbmcgJiYgPGRpdiBjbGFzc05hbWU9XCJiaWctc3Bpbm5lclwiIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAzMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3UgaGF2ZW4ndCBtYWRlIGFueSBiaWRzIHlldCFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAhYWN0aXZlICYmIGRlY2xpbmVkQmlkcy5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYW5hZ2VyLWNvbnRlbnQtbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdEZWNsaW5lZCAmJiA8ZGl2IGNsYXNzTmFtZT1cImJpZy1zcGlubmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWxvYWRpbmdEZWNsaW5lZCAmJiA8ZGl2IGNsYXNzTmFtZT1cImJpZy1zcGlubmVyXCIgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDMwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBoYXZlbid0IGFueSBkZWNsaW5lZCBiaWRzIHlldCFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCBzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICB9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xuKShQZW5kaW5nRGVhbHMpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvUGVuZGluZ0RlYWxzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcbmltcG9ydCBSZWFjdFRhYmxlIGZyb20gXCJyZWFjdC10YWJsZVwiO1xuaW1wb3J0IHtnZXRDdXJyZW5jeVN5bWJvbCwgZ2V0RnVsbE5hbWUsIGdvVG8sIGxpbWl0VGV4dH0gZnJvbSBcIi4uLy4uL21haW4vYWN0aW9ucy91dGlsc1wiO1xuaW1wb3J0IENvdW50cnlTZWxlY3RvciBmcm9tICcuLi8uLi9tYWluL2NvbXBvbmVudHMvQ291bnRyeVNlbGVjdG9yJ1xuaW1wb3J0IE1vbWVudCBmcm9tIFwibW9tZW50L21vbWVudFwiO1xuaW1wb3J0IHtibHVlQ2hlY2tJY29uLCBjYW5jZWxJY29uLCBlZGl0SWNvbiwgU3Bpbm5lcn0gZnJvbSBcIi4uLy4uL21haW4vY29tcG9uZW50cy9JY29uc1wiO1xuXG5jbGFzcyBTZXR0aW5ncyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbG9hZGluZyA6IGZhbHNlLFxuICAgICAgICAgICAgdXBkYXRpbmdDb21wYW55IDogZmFsc2UsXG4gICAgICAgICAgICB1cGRhdGluZ1VzZXIgOiBmYWxzZSxcbiAgICAgICAgICAgIHVwZGF0aW5nUGFzc3dvcmQgOiBmYWxzZSxcbiAgICAgICAgICAgIGxvYWRpbmdDb21wYW55VXNlcnMgOiBmYWxzZSxcbiAgICAgICAgICAgIGVkaXRQZXJzb25hbEluZm86IGZhbHNlLFxuICAgICAgICAgICAgZWRpdENvbXBhbnlJbmZvIDogZmFsc2UsXG4gICAgICAgICAgICBjb21wYW55VXNlcnMgOiBbXSxcbiAgICAgICAgICAgIHVzZXIgOiB7fVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9hZGluZzp0cnVlLCBsb2FkaW5nQ29tcGFueVVzZXJzOiB0cnVlfSk7XG5cbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0VXNlckluZm8oKS5kb25lKHVzZXI9PntcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvYWRpbmc6ZmFsc2UsIHVzZXIgOiB1c2VyfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLmdldENvbXBhbnlVc2VycygpLmRvbmUoY29tcGFueVVzZXJzPT57XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nQ29tcGFueVVzZXJzOmZhbHNlLCBjb21wYW55VXNlcnMgOiBjb21wYW55VXNlcnN9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29tcGFueSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXBkYXRpbmdDb21wYW55OnRydWUsIGVkaXRDb21wYW55SW5mbzogZmFsc2V9KTtcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkudXBkYXRlQ29tcGFueSh0aGlzLnN0YXRlLnVzZXIuY29tcGFueSkuZG9uZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXBkYXRpbmdDb21wYW55OmZhbHNlfSk7XG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIHVwZGF0ZVVzZXIgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3VwZGF0aW5nVXNlcjp0cnVlLCBlZGl0UGVyc29uYWxJbmZvOiBmYWxzZX0pO1xuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS51cGRhdGVVc2VyKHRoaXMuc3RhdGUudXNlcikuZG9uZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXBkYXRpbmdVc2VyOmZhbHNlfSk7XG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIHVwZGF0ZVBhc3N3b3JkID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt1cGRhdGluZ1Bhc3N3b3JkOnRydWV9KTtcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkudXBkYXRlUGFzc3dvcmQoe1xuICAgICAgICAgICAgaWQgOiB0aGlzLnN0YXRlLnVzZXIuaWQsXG4gICAgICAgICAgICBwYXNzd29yZCA6IHRoaXMuc3RhdGUucGFzc3dvcmRcbiAgICAgICAgfSkuZG9uZSgoKT0+e1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdXBkYXRpbmdQYXNzd29yZDpmYWxzZSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZCA6bnVsbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZENoZWNrIDogbnVsbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZFVwZGF0ZWQgOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgdmFsaWRhdGUgPSAocGFzcykgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVuZ3RoIDogKCBwYXNzLmxlbmd0aCA+PSA4ICksXG4gICAgICAgICAgICBkaWdpdCA6IC9cXGQvLnRlc3QocGFzcyksXG4gICAgICAgICAgICB1cHBlciA6IC9bQS1aXS8udGVzdChwYXNzKSxcbiAgICAgICAgICAgIHNwZWNpYWwgOiAvWyFAIyQlXiYqKClfK1xcLT1cXFtcXF17fTsnOlwiXFxcXHwsLjw+XFwvP10vLnRlc3QocGFzcyksXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGludmFsaWRQYXNzd29yZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBvbGRQYXNzd29yZCwgcGFzc3dvcmQsIHBhc3N3b3JkQ2hlY2sgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgaWYgKCFvbGRQYXNzd29yZCB8fCAhcGFzc3dvcmQgfHwgICFwYXNzd29yZENoZWNrICkgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgbGV0IHZhbGlkID0gdGhpcy52YWxpZGF0ZShwYXNzd29yZCk7XG5cbiAgICAgICAgcmV0dXJuICBwYXNzd29yZCAhPT0gcGFzc3dvcmRDaGVjayB8fFxuICAgICAgICAgICAgICAgICF2YWxpZC5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICAhdmFsaWQuZGlnaXQgfHxcbiAgICAgICAgICAgICAgICAhdmFsaWQudXBwZXIgfHxcbiAgICAgICAgICAgICAgICAhdmFsaWQuc3BlY2lhbDtcblxuXG4gICAgfTtcblxuICAgIHJlbmRlciAoKSB7XG5cbiAgICAgICAgY29uc3QgeyBsb2FkaW5nLCBlZGl0UGVyc29uYWxJbmZvLCBlZGl0Q29tcGFueUluZm8sIGxvYWRpbmdDb21wYW55VXNlcnMsIGNvbXBhbnlVc2VycyxcbiAgICAgICAgICAgIHVwZGF0aW5nQ29tcGFueSwgdXBkYXRpbmdVc2VyLCB1cGRhdGluZ1Bhc3N3b3JkLCBwYXNzd29yZCwgcGFzc3dvcmRDaGVjaywgcGFzc3dvcmRVcGRhdGVkIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBsZXQgdXNlciA9IHRoaXMuc3RhdGUudXNlcjtcblxuICAgICAgICBsZXQgY291bnRyeSA9ICh1c2VyICYmIHVzZXIuY29tcGFueSAmJiB1c2VyLmNvbXBhbnkuY291bnRyeSkgPyB7bGFiZWw6IHVzZXIuY29tcGFueS5jb3VudHJ5Lm5hbWUsIHZhbHVlOiB1c2VyLmNvbXBhbnkuY291bnRyeS5uYW1lfSA6IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInNldHRpbmdzLWNvbnRhaW5lclwifT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0aXRsZVwifT5cbiAgICAgICAgICAgICAgICAgICAgQ29tcGFueSBpbmZvcm1hdGlvbiB7IWVkaXRDb21wYW55SW5mbyAmJiAhdXBkYXRpbmdDb21wYW55ICYmXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImVkaXQtYnV0dG9uXCJ9IG9uQ2xpY2s9e2U9Pnt0aGlzLnNldFN0YXRlKHtlZGl0Q29tcGFueUluZm8gOiB0cnVlfSl9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtlZGl0SWNvbn0vPiBFZGl0XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAge2VkaXRDb21wYW55SW5mbyAmJiAhdXBkYXRpbmdDb21wYW55ICYmIDxkaXYgY2xhc3NOYW1lPXtcImVkaXQtYnV0dG9uXCJ9IG9uQ2xpY2s9e3RoaXMudXBkYXRlQ29tcGFueX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17ZWRpdEljb259Lz4gU2F2ZVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIHt1cGRhdGluZ0NvbXBhbnkgJiYgPFNwaW5uZXIvPn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHt1c2VyLmNvbXBhbnkgJiYgPGRpdiBjbGFzc05hbWU9e1wic2V0dGluZ1wifT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wicm93XCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExlZ2FsIENvbXBhbnkgTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt1c2VyLmNvbXBhbnkubGVnYWxOYW1lfSBkaXNhYmxlZD17IWVkaXRDb21wYW55SW5mb30gb25DaGFuZ2U9eyhlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmNvbXBhbnkubGVnYWxOYW1lID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJ9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIml0ZW1cIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21wYW55IFJlZ2lzdHJhdGlvbiBOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dXNlci5jb21wYW55LnJlZ2lzdHJhdGlvbk51bWJlcn0gZGlzYWJsZWQ9eyFlZGl0Q29tcGFueUluZm99IG9uQ2hhbmdlPXsoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5jb21wYW55LnJlZ2lzdHJhdGlvbk51bWJlciA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVkFUIElEIG51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt1c2VyLmNvbXBhbnkudmF0fSBkaXNhYmxlZD17IWVkaXRDb21wYW55SW5mb30gb25DaGFuZ2U9eyhlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmNvbXBhbnkudmF0ID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJ9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInJvd1wifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIml0ZW1cIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3VzZXIuY29tcGFueS5hZGRyZXNzfSBkaXNhYmxlZD17IWVkaXRDb21wYW55SW5mb30gb25DaGFuZ2U9eyhlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmNvbXBhbnkuYWRkcmVzcyA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2l0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt1c2VyLmNvbXBhbnkuY2l0eX0gZGlzYWJsZWQ9eyFlZGl0Q29tcGFueUluZm99IG9uQ2hhbmdlPXsoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5jb21wYW55LmNpdHkgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFpJUCBjb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3VzZXIuY29tcGFueS56aXB9IGRpc2FibGVkPXshZWRpdENvbXBhbnlJbmZvfSBvbkNoYW5nZT17KGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuY29tcGFueS56aXAgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvdW50cnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb3VudHJ5U2VsZWN0b3IgbXVsdGk9e2ZhbHNlfSB2YWx1ZT17Y291bnRyeX0gZGlzYWJsZWQ9eyFlZGl0Q29tcGFueUluZm99IG9uQ2hhbmdlPXsoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5jb21wYW55LmNvdW50cnkubmFtZSA9IGUudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJ9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+Q29tcGFueSBkZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgdmFsdWU9e3VzZXIuY29tcGFueS5kZXNjcmlwdGlvbn0gZGlzYWJsZWQ9eyFlZGl0Q29tcGFueUluZm99IG9uQ2hhbmdlPXsoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmNvbXBhbnkuZGVzY3JpcHRpb24gPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKkFDVElWRSBVU0VSUyovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7bWFyZ2luOiAnMjBweCAwJ319PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFjdGl2ZSBVc2VyczwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bG9hZGluZ0NvbXBhbnlVc2VycyAmJiBjb21wYW55VXNlcnMubGVuZ3RoID09PSAwICYmIDxTcGlubmVyLz59XG4gICAgICAgICAgICAgICAgICAgICAgICB7IWxvYWRpbmdDb21wYW55VXNlcnMgJiYgY29tcGFueVVzZXJzLmxlbmd0aCA+IDAgJiYgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmVhY3RUYWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiY2xvc2VkLWRlYWxzLXRhYmxlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQYWdlU2l6ZT17MzB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQYWdlU2l6ZU9wdGlvbnM9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93UGFnaW5hdGlvbj17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pblJvd3M9ezB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2NvbXBhbnlVc2Vyc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucz17W3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ0ZhbWlsaXkgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICdsYXN0TmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiAnZmlyc3ROYW1lJywgLy8gUmVxdWlyZWQgYmVjYXVzZSBvdXIgYWNjZXNzb3IgaXMgbm90IGEgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdGaXJzdCBOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ0VtYWlsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiAnZW1haWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdQaG9uZSBOdW1iZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICdwaG9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ0NvbXBhbnkgUG9zaXRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICd0aXRsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGl0bGVcIn0+XG4gICAgICAgICAgICAgICAgICAgIFBlcnNvbmFsIGluZm9ybWF0aW9uIHshZWRpdFBlcnNvbmFsSW5mbyAmJiAhdXBkYXRpbmdVc2VyICYmXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImVkaXQtYnV0dG9uXCJ9IG9uQ2xpY2s9e2U9Pnt0aGlzLnNldFN0YXRlKHtlZGl0UGVyc29uYWxJbmZvIDogdHJ1ZX0pfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17ZWRpdEljb259Lz4gRWRpdFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIHtlZGl0UGVyc29uYWxJbmZvICYmICF1cGRhdGluZ1VzZXIgJiYgPGRpdiBjbGFzc05hbWU9e1wiZWRpdC1idXR0b25cIn0gb25DbGljaz17dGhpcy51cGRhdGVVc2VyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtlZGl0SWNvbn0vPiBTYXZlXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cbiAgICAgICAgICAgICAgICAgICAge3VwZGF0aW5nVXNlciAmJiA8U3Bpbm5lci8+fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInNldHRpbmdcIn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInJvd1wifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIml0ZW1cIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaXJzdCBOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3VzZXIuZmlyc3ROYW1lfSBkaXNhYmxlZD17IWVkaXRQZXJzb25hbEluZm99IG9uQ2hhbmdlPXsoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5maXJzdE5hbWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhc3QgTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt1c2VyLmxhc3ROYW1lfSBkaXNhYmxlZD17IWVkaXRQZXJzb25hbEluZm99IG9uQ2hhbmdlPXsoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5sYXN0TmFtZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dXNlci50aXRsZX0gZGlzYWJsZWQ9eyFlZGl0UGVyc29uYWxJbmZvfSBvbkNoYW5nZT17KGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIudGl0bGUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wicm93XCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVtYWlsIGFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dXNlci5lbWFpbH0gZGlzYWJsZWQ9eyFlZGl0UGVyc29uYWxJbmZvfSBvbkNoYW5nZT17KGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuZW1haWwgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBob25lIG51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt1c2VyLnBob25lfSBkaXNhYmxlZD17IWVkaXRQZXJzb25hbEluZm99IG9uQ2hhbmdlPXsoZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5waG9uZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRpdGxlXCJ9PlxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2UgUGFzc3dvcmRcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJzdWJ0aXRsZVwifT5cbiAgICAgICAgICAgICAgICAgICAgIENob29zZSBhIHVuaXF1ZSBwYXNzd29yZCB0byBwcm90ZWN0IHlvdXIgYWNjb3VudFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInNldHRpbmdcIn0gc3R5bGU9e3tkaXNwbGF5OiAnZmxleCd9fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wicGFzc3dvcmRcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+VHlwZSB5b3VyIGN1cnJlbnQgcGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9e1wicGFzc3dvcmRcIn0gb25DaGFuZ2U9eyhlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRQYXNzd29yZCA6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlR5cGUgeW91ciBuZXcgcGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9e1wicGFzc3dvcmRcIn0gb25DaGFuZ2U9eyhlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZCA6IGUudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlJldHlwZSB5b3VyIG5ldyBwYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT17XCJwYXNzd29yZFwifSBvbkNoYW5nZT17KGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2hlY2sgOiBlLnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9fS8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHshdXBkYXRpbmdQYXNzd29yZCAmJiAhcGFzc3dvcmRVcGRhdGVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMudXBkYXRlUGFzc3dvcmR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmludmFsaWRQYXNzd29yZCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wic3RhbmRhcmQtYnV0dG9uXCJ9PlNhdmUgcGFzc3dvcmQ8L2J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICB7dXBkYXRpbmdQYXNzd29yZCAmJiA8U3Bpbm5lci8+fVxuICAgICAgICAgICAgICAgICAgICAgICAge3Bhc3N3b3JkVXBkYXRlZCAmJiA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhc3N3b3JkIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7cGFzc3dvcmQgJiYgPGRpdiBjbGFzc05hbWU9e1wicGFzc3dvcmQtdmFsaWRhdGlvblwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMudmFsaWRhdGUocGFzc3dvcmQpLmxlbmd0aCAmJiA8aW1nIHNyYz17Ymx1ZUNoZWNrSWNvbn0vPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IXRoaXMudmFsaWRhdGUocGFzc3dvcmQpLmxlbmd0aCYmIDxpbWcgc3JjPXtjYW5jZWxJY29ufS8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF0IGxlYXN0IDggY2hhcmFjdGVycyBsb25nXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMudmFsaWRhdGUocGFzc3dvcmQpLnVwcGVyICYmIDxpbWcgc3JjPXtibHVlQ2hlY2tJY29ufS8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshdGhpcy52YWxpZGF0ZShwYXNzd29yZCkudXBwZXImJiA8aW1nIHNyYz17Y2FuY2VsSWNvbn0vPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPbmUgdXBwZXJjYXNlIGNoYXJhY3RlclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnZhbGlkYXRlKHBhc3N3b3JkKS5kaWdpdCAmJiA8aW1nIHNyYz17Ymx1ZUNoZWNrSWNvbn0vPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IXRoaXMudmFsaWRhdGUocGFzc3dvcmQpLmRpZ2l0JiYgPGltZyBzcmM9e2NhbmNlbEljb259Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT25lIG51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnZhbGlkYXRlKHBhc3N3b3JkKS5zcGVjaWFsICYmIDxpbWcgc3JjPXtibHVlQ2hlY2tJY29ufS8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshdGhpcy52YWxpZGF0ZShwYXNzd29yZCkuc3BlY2lhbCYmIDxpbWcgc3JjPXtjYW5jZWxJY29ufS8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9uZSBzcGVjaWFsIGNoYXJhY3RlclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cGFzc3dvcmRDaGVjayAmJiA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwYXNzd29yZENoZWNrID09PSBwYXNzd29yZCAmJiA8aW1nIHNyYz17Ymx1ZUNoZWNrSWNvbn0vPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGFzc3dvcmRDaGVjayAhPT0gcGFzc3dvcmQgJiYgPGltZyBzcmM9e2NhbmNlbEljb259Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFzc3dvcmRzIGRvbid0IG1hdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICggc3RhdGUsIG93blByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlO1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICAgIHJldHVybiB7XG4gICAgfVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcbikoU2V0dGluZ3MpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvU2V0dGluZ3MuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IENvbnRlbnRMaXN0aW5nIGZyb20gJy4uLy4uL21haW4vY29tcG9uZW50cy9Db250ZW50TGlzdGluZyc7XG5pbXBvcnQge2dvVG99IGZyb20gXCIuLi8uLi9tYWluL2FjdGlvbnMvdXRpbHNcIjtcblxuY2xhc3MgV2F0Y2hsaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBsb2FkaW5nIDogZmFsc2UsXG4gICAgICAgICAgICBsaXN0aW5ncyA6IFtdLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9hZGluZzp0cnVlfSk7XG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLmdldFdhdGNobGlzdExpc3RpbmdzKCkuZG9uZSgobGlzdGluZ3MpID0+IHtcblxuICAgICAgICAgICAgbGlzdGluZ3MgPSBsaXN0aW5ncy5tYXAoIGxpc3RpbmcgPT4gQ29udGVudEFyZW5hLlV0aWxzLmNvbnRlbnRQYXJzZXJGcm9tU2VydmVyKGxpc3RpbmcpICk7XG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7bGlzdGluZ3M6IGxpc3RpbmdzLCBsb2FkaW5nIDogZmFsc2V9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBzZWxlY3RMaXN0aW5nID0gKGlkKSA9PiB7XG4gICAgICAgIGdvVG8oXCJsaXN0aW5nL1wiICsgaWQpO1xuXG4gICAgfTtcblxuICAgIHJlbW92ZSA9ICggY3VzdG9tSWQpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBsaXN0aW5ncyA6IHRoaXMuc3RhdGUubGlzdGluZ3MuZmlsdGVyKGwgPT4gbC5jdXN0b21JZCAhPT0gY3VzdG9tSWQpXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZW5kZXIgKCkge1xuICAgICAgICBjb25zdCB7IGxvYWRpbmcsIGxpc3RpbmdzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgICAgICBmbGV4OiAxXG4gICAgICAgICAgICB9fT5cblxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGluZ3MubGVuZ3RoID4gMCAmJiBsaXN0aW5ncy5tYXAoKGxpc3RpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8Q29udGVudExpc3RpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5zZWxlY3RMaXN0aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17bGlzdGluZy5jdXN0b21JZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ubGlzdGluZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXRjaGxpc3RSZW1vdmU9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25XYXRjaGxpc3RSZW1vdmU9e3RoaXMucmVtb3ZlfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RpbmdzLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hbmFnZXItY29udGVudC1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZyAmJiA8ZGl2IGNsYXNzTmFtZT1cImJpZy1zcGlubmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWxvYWRpbmcgJiYgPGRpdiBjbGFzc05hbWU9XCJiaWctc3Bpbm5lclwiIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAzMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3VyIHdhdGNobGlzdCBpcyBlbXB0eSFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCBzdGF0ZSwgb3duUHJvcHMpID0+IHtcbiAgICByZXR1cm4gc3RhdGU7XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICB9XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xuKShXYXRjaGxpc3QpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvV2F0Y2hsaXN0LmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IE1hbmFnZXIgZnJvbSAnLi9jb250YWluZXJzL01hbmFnZXInO1xuXG5jb25zdCBtYW5hZ2VDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFuYWdlLXdyYXBwZXInKTtcblxubGV0IE1hbmFnZUFwcCA9IFJlYWN0RE9NLnJlbmRlcihcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgICAgPE1hbmFnZXIgey4uLm1hbmFnZUNvbnRhaW5lci5kYXRhc2V0IH0vPlxuICAgIDwvUHJvdmlkZXI+LFxuICAgIG1hbmFnZUNvbnRhaW5lclxuKTtcblxuXG4kKGZ1bmN0aW9uICgpIHtcblxuICAgIENvbnRlbnRBcmVuYS5UZXN0ID0gQ29udGVudEFyZW5hLlRlc3QgfHwge307XG4gICAgQ29udGVudEFyZW5hLlRlc3QuTWFuYWdlID0gZnVuY3Rpb24oaWQpe1xuICAgICAgICBNYW5hZ2VBcHAudGVzdChpZClcbiAgICB9O1xuXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvbWFuYWdlLmpzIiwiXG5pbXBvcnQge2NvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncmVkdXgnXG5pbXBvcnQge21hbmFnZX0gZnJvbSBcIi4vbWFuYWdlXCI7XG5cbmNvbnN0IHJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAgICBtYW5hZ2UsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVkdWNlcnNcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9yZWR1Y2Vycy9pbmRleC5qcyIsIlxuZXhwb3J0IGNvbnN0IG1hbmFnZVR5cGVzPSB7XG4gICAgVEVTVDonVEVTVCcsXG59O1xuXG5leHBvcnQgY29uc3QgbWFuYWdlID0gKHN0YXRlID0ge1xuICAgIHRlc3RJdGVtOiBcIm1hbmFnZVJlZHVjZXJcIlxuXG59LCBhY3Rpb24pID0+IHtcblxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgICAgY2FzZSBtYW5hZ2VUeXBlcy5URVNUOlxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgICAgICAgICAgdGVzdDogYWN0aW9uLnRleHQsXG4gICAgICAgICAgICAgICAgaWQgOiBhY3Rpb24uaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3JlZHVjZXJzL21hbmFnZS5qcyIsIi8qKlxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgcmVkdWNlcnMgZnJvbSBcIi4vcmVkdWNlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU3RvcmUocmVkdWNlcnMpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9zdG9yZS5qcyIsImV4cG9ydCBjb25zdCBjb21wYW55SXNWYWxpZCA9ICggY29tcGFueSApID0+e1xuICAgIHJldHVybiBjb21wYW55LmxlZ2FsTmFtZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICYmIGNvbXBhbnkubGVnYWxOYW1lICE9PSBcIlwiXG4gICAgICAgICYmIGNvbXBhbnkudmF0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgJiYgY29tcGFueS52YXQgIT09IFwiXCJcbiAgICAgICAgJiYgY29tcGFueS56aXAgIT09IHVuZGVmaW5lZFxuICAgICAgICAmJiBjb21wYW55LnppcCAhPT0gXCJcIlxuICAgICAgICAmJiBjb21wYW55LmFkZHJlc3MgIT09IHVuZGVmaW5lZFxuICAgICAgICAmJiBjb21wYW55LmFkZHJlc3MgIT09IFwiXCJcbiAgICAgICAgJiYgY29tcGFueS5jaXR5ICE9PSB1bmRlZmluZWRcbiAgICAgICAgJiYgY29tcGFueS5jaXR5ICE9PSBcIlwiXG4gICAgICAgICYmIGNvbXBhbnkuY291bnRyeSAhPT0gdW5kZWZpbmVkO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvYWN0aW9ucy92YWxpZGF0aW9uQWN0aW9ucy5qcyIsImV4cG9ydCBjb25zdCBTdXBlclJpZ2h0RGVmaW5pdGlvbnMgPSB7XG4gICAgXCJMVFwiIDogW1wibWVhbnMgdGhlIHJpZ2h0IHRvIGEgcmVhbC10aW1lIChzdWJqZWN0IHRvIGxhdGVuY3kpIFRyYW5zbWlzc2lvbiBvZiBhIExpdmUgRmVlZCBvZiB0aGUgRXZlbnQgb3RoZXIgdGhhbiBpbiBCZXR0aW5nIFNob3BzIGFuZCBvbiBCZXR0aW5nIFBsYXRmb3Jtcy5cIl0sXG4gICAgXCJEVFwiIDogW1wibWVhbnMgdGhlIHJpZ2h0IHRvIGEgZnVsbC1sZW5ndGggZGVsYXllZCBUcmFuc21pc3Npb24gb2YgYSBMaXZlIEZlZWQgb2YgdGhlIEV2ZW50IGNvbW1lbmNpbmcgbm90IGJlZm9yZSBlbmQgb2YgdGhlIEV2ZW50IG9yIHRoZSBUaW1lIEVtYmFyZ28gZGVmaW5lZC5cIl0sXG4gICAgXCJMQlwiIDogW1wibWVhbnMgdGhlIHJpZ2h0IHRvIHJlYWwtdGltZSAoc3ViamVjdCB0byBsYXRlbmN5KSBUcmFuc21pc3Npb24gb2YgYSBMaXZlIEZlZWQgb2YgdGhlIEV2ZW50IGluIEJldHRpbmcgU2hvcHMgYW5kIG9uIEJldHRpbmcgUGxhdGZvcm1zO1wiXSxcbiAgICBcIk5BXCIgOiBbXG4gICAgICAgIFwibWVhbnMgdGhlIHJpZ2h0IHRvIGEgVHJhbnNtaXNzaW9uIG9mIEZvb3RhZ2Ugb2YgdGhlIEV2ZW50IG5vdCBleGNlZWRpbmdcIixcbiAgICAgICAge1xuICAgICAgICAgICAga2V5OiBcIk5BX0lOUFVUXCIsXG4gICAgICAgIH0sXG4gICAgICAgIFwic2Vjb25kcyBpbiBuZXdzIHByb2dyYW1zIG5vdCBiZWZvcmUgdGhlIGVuZCBvZiB0aGUgcmVsZXZhbnQgRXZlbnQgb3IgdGhlIFRpbWUgRW1iYXJnbyBkZWZpbmVkXCJcbiAgICBdLFxuICAgIFwiSExcIiA6IFtcbiAgICAgICAgXCJtZWFucyB0aGUgcmlnaHQgdG8gYSBUcmFuc21pc3Npb24gb2YgSGlnaGxpZ2h0IGZvb3RhZ2Ugb2YgdGhlIEV2ZW50IG5vdCBleGNlZWRpbmdcIixcbiAgICAgICAge1xuICAgICAgICAgICAga2V5OiBcIkhMX0lOUFVUXCIsXG4gICAgICAgIH0sXG4gICAgICAgIFwibWludXRlcyBub3QgYmVmb3JlIHRoZSBlbmQgb2YgdGhlIHJlbGV2YW50IEV2ZW50IG9yIHRoZSBUaW1lIEVtYmFyZ28gZGVmaW5lZFwiXG5cbiAgICBdLFxuICAgIFwiUFJcIiA6IFtcIm1lYW5zIHRoZSByaWdodCB0byBhIFRyYW5zbWlzc2lvbiBvZiB0aGUgc3BlY2lmaWMgUHJvZ3JhbXMgcHJvdmlkZWQgYnkgTGljZW5zb3IgdG8gTGljZW5zZWUuXCJdLFxufTtcblxuXG5leHBvcnQgY29uc3QgU3VwZXJSaWdodFByb2R1Y3Rpb25EZXRhaWxzTGFiZWxzID0ge1xuICAgIFwiTFRcIiA6IFwiTGl2ZSBUcmFuc21pc3Npb25cIixcbiAgICBcIkRUXCIgOiBcIkRlbGF5ZWQgJiBBcmNoaXZlIEZvb3RhZ2VcIixcbiAgICBcIkxCXCIgOiBcIkxpdmUgQmV0dGluZyBUcmFuc21pc3Npb25cIixcbiAgICBcIkhMXCIgOiBcIkhpZ2hsaWdodHMgJiBDbGlwc1wiLFxuICAgIFwiTkFcIiA6IFwiTmV3cyBGb290YWdlXCIsXG4gICAgXCJQUlwiIDogXCJFZGl0ZWQgUHJvZ3JhbVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IFN1cGVyUmlnaHRCb2FyZExhYmVscyA9IHtcbiAgICBcIkxUXCIgOiBcIkxpdmVcIixcbiAgICBcIkRUXCIgOiBcIkRlbGF5ZWQmQXJjaGl2ZVwiLFxuICAgIFwiTEJcIiA6IFwiQmV0dGluZ1wiLFxuICAgIFwiSExcIiA6IFwiSGlnaGxpZ2h0cyZDbGlwc1wiLFxuICAgIFwiTkFcIiA6IFwiTmV3c1wiLFxuICAgIFwiUFJcIiA6IFwiUHJvZ3JhbVwiLFxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbXBvbmVudHMvU3VwZXJSaWdodERlZmluaXRpb25zLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==