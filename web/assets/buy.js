webpackJsonp([2],{

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

/***/ "./src/AppBundle/Resources/public/javascript/buy/actions/filterActions.js":
/*!********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/actions/filterActions.js ***!
  \********************************************************************************/
/*! exports provided: addRight, removeRight, updateCountries, updateExclusive */
/*! exports used: addRight, removeRight, updateCountries, updateExclusive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return removeRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return updateCountries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return updateExclusive; });
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

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/actions/index.js":
/*!************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/actions/index.js ***!
  \************************************************************************/
/*! exports provided: test */
/*! exports used: test */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return test; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reducers_marketplace__ = __webpack_require__(/*! ../reducers/marketplace */ "./src/AppBundle/Resources/public/javascript/buy/reducers/marketplace.js");


var nextTodoId = 0;

var test = function test(text) {
    return {
        type: __WEBPACK_IMPORTED_MODULE_0__reducers_marketplace__["b" /* marketplaceTypes */].TEST,
        id: nextTodoId++,
        text: text
    };
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/buy.js":
/*!**************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/buy.js ***!
  \**************************************************************/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store__ = __webpack_require__(/*! ./store */ "./src/AppBundle/Resources/public/javascript/buy/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_Marketplace__ = __webpack_require__(/*! ./containers/Marketplace */ "./src/AppBundle/Resources/public/javascript/buy/containers/Marketplace.js");
/**
 * Created by JuanCruz on 4/1/2018.
 */







__webpack_require__(/*! ../../scss/marketplace.scss */ "./src/AppBundle/Resources/public/scss/marketplace.scss");

var marketplaceContainer = document.getElementById('marketplace-wrapper');

var MarketplaceApp = __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"],
    { store: __WEBPACK_IMPORTED_MODULE_3__store__["a" /* default */] },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__containers_Marketplace__["a" /* default */], marketplaceContainer.dataset)
), marketplaceContainer);

$(function () {

    ContentArena.Test = ContentArena.Test || {};

    ContentArena.Test.MarketPlace = function (id) {
        MarketplaceApp.test(id);
    };

    ContentArena.Api.getSports().done(function (sports) {
        ContentArena.Data.FullSports = sports;

        var select = $("#sports-event");

        ContentArena.Data.TopSports.forEach(function (sport) {
            select.append("<div class=\"sport subfilter\" id=\"sport-" + sport.externalId + "\" name=" + sport.externalId + " value='" + sport.externalId + "' toggle>" + sport.name + "</div>");
        });
    });
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/components/EventFilter.js":
/*!*********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/components/EventFilter.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(/*! ../actions */ "./src/AppBundle/Resources/public/javascript/buy/actions/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var EventFilter = function (_React$Component) {
    _inherits(EventFilter, _React$Component);

    function EventFilter(props) {
        _classCallCheck(this, EventFilter);

        var _this = _possibleConstructorReturn(this, (EventFilter.__proto__ || Object.getPrototypeOf(EventFilter)).call(this, props));

        _this.showTab = function (tab) {
            _this.setState({ tab: tab });
        };

        _this.state = {};
        return _this;
    }

    _createClass(EventFilter, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "box" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "title" },
                    "Event"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "text", id: "inputSearch", name: "event", placeholder: "Search" }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "custom-dropdown" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { className: "uk-button uk-button-default dropdown-button", type: "button" },
                            "Sports \xA0",
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: "filter-sports-count" })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { id: "sports-event", "uk-dropdown": "mode: click" })
                    )
                )
            );
        }
    }]);

    return EventFilter;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* test */])(id));
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(EventFilter));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/components/RightsFilter.js":
/*!**********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/components/RightsFilter.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_filterActions__ = __webpack_require__(/*! ../actions/filterActions */ "./src/AppBundle/Resources/public/javascript/buy/actions/filterActions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_components_CountrySelector__ = __webpack_require__(/*! ../../main/components/CountrySelector */ "./src/AppBundle/Resources/public/javascript/main/components/CountrySelector.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var RightsFilter = function (_React$Component) {
    _inherits(RightsFilter, _React$Component);

    function RightsFilter(props) {
        _classCallCheck(this, RightsFilter);

        var _this = _possibleConstructorReturn(this, (RightsFilter.__proto__ || Object.getPrototypeOf(RightsFilter)).call(this, props));

        _this.selectTerritory = function (value) {
            _this.props.updateCountries(value);
        };

        _this.state = {};
        return _this;
    }

    _createClass(RightsFilter, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            console.log("RightsFilter", nextProps);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                rights = _props.rights,
                rightsPackage = _props.rightsPackage,
                countries = _props.countries,
                onFilter = _props.onFilter,
                exclusive = _props.exclusive;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "box" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "title" },
                    "Rights"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__main_components_CountrySelector__["a" /* default */], {
                            className: "base-input-select",
                            value: countries,
                            onChange: this.selectTerritory })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { id: "rights-packages", style: { marginTop: 20 } },
                        rightsPackage && rightsPackage.map(function (right) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "p",
                                { key: right.id },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
                                    className: "right_package subfilter",
                                    type: "checkbox",
                                    checked: rights.indexOf(right.id) !== -1,
                                    onChange: function onChange(e) {
                                        if (e.target.checked) {
                                            _this2.props.addRight(right.id);
                                        } else {
                                            _this2.props.removeRight(right.id);
                                        }
                                    },
                                    id: right.id
                                }),
                                " ",
                                right.name
                            );
                        })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("hr", null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { marginBottom: 20 } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
                            type: "checkbox",
                            checked: exclusive,
                            onChange: function onChange(e) {
                                _this2.props.updateExclusive(e.target.checked);
                            } }),
                        " Contains exclusive rights"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { className: "standard-button", onClick: function onClick() {
                                    onFilter({
                                        rights: rights,
                                        countries: countries.map(function (country) {
                                            return country.label;
                                        })
                                    });
                                } },
                            "Apply"
                        )
                    )
                )
            );
        }
    }]);

    return RightsFilter;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state.filter;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        addRight: function addRight(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions_filterActions__["a" /* addRight */])(id));
        },
        removeRight: function removeRight(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions_filterActions__["b" /* removeRight */])(id));
        },
        updateCountries: function updateCountries(countries) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions_filterActions__["c" /* updateCountries */])(countries));
        },
        updateExclusive: function updateExclusive(exclusive) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions_filterActions__["d" /* updateExclusive */])(exclusive));
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(RightsFilter));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/components/SalesPackage.js":
/*!**********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/components/SalesPackage.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(/*! ../actions */ "./src/AppBundle/Resources/public/javascript/buy/actions/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var SalesPackage = function (_React$Component) {
    _inherits(SalesPackage, _React$Component);

    function SalesPackage(props) {
        _classCallCheck(this, SalesPackage);

        var _this = _possibleConstructorReturn(this, (SalesPackage.__proto__ || Object.getPrototypeOf(SalesPackage)).call(this, props));

        _this.showTab = function (tab) {
            _this.setState({ tab: tab });
        };

        _this.state = {};
        return _this;
    }

    _createClass(SalesPackage, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "" },
                this.props.salesPackage.id
            );
        }
    }]);

    return SalesPackage;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* test */])(id));
        }
    };
};

/* unused harmony default export */ var _unused_webpack_default_export = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(SalesPackage));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/containers/CommercialTerms.js":
/*!*************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/containers/CommercialTerms.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(/*! ../actions */ "./src/AppBundle/Resources/public/javascript/buy/actions/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SalesPackages__ = __webpack_require__(/*! ./SalesPackages */ "./src/AppBundle/Resources/public/javascript/buy/containers/SalesPackages.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var CommercialTerms = function (_React$Component) {
    _inherits(CommercialTerms, _React$Component);

    function CommercialTerms(props) {
        _classCallCheck(this, CommercialTerms);

        var _this = _possibleConstructorReturn(this, (CommercialTerms.__proto__ || Object.getPrototypeOf(CommercialTerms)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(CommercialTerms, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {
            var content = this.props.content;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__SalesPackages__["a" /* default */], {
                    salesPackages: content.salesPackages })
            );
        }
    }]);

    return CommercialTerms;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* test */])(id));
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(CommercialTerms));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/containers/ContentInformation.js":
/*!****************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/containers/ContentInformation.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(/*! ../actions */ "./src/AppBundle/Resources/public/javascript/buy/actions/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sell_components_SellFormItems__ = __webpack_require__(/*! ../../sell/components/SellFormItems */ "./src/AppBundle/Resources/public/javascript/sell/components/SellFormItems.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var ContentInformation = function (_React$Component) {
    _inherits(ContentInformation, _React$Component);

    function ContentInformation(props) {
        _classCallCheck(this, ContentInformation);

        var _this = _possibleConstructorReturn(this, (ContentInformation.__proto__ || Object.getPrototypeOf(ContentInformation)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(ContentInformation, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {
            var content = this.props.content;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { style: { marginTop: 20 } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "full-item-box" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        null,
                        "EVENT DESCRIPTION"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "full-item-content" },
                        content.description
                    )
                )
            );
        }
    }]);

    return ContentInformation;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* test */])(id));
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(ContentInformation));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/containers/ListingDetails.js":
/*!************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/containers/ListingDetails.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(/*! ../actions */ "./src/AppBundle/Resources/public/javascript/buy/actions/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CommercialTerms__ = __webpack_require__(/*! ./CommercialTerms */ "./src/AppBundle/Resources/public/javascript/buy/containers/CommercialTerms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ContentInformation__ = __webpack_require__(/*! ./ContentInformation */ "./src/AppBundle/Resources/public/javascript/buy/containers/ContentInformation.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TermSheet__ = __webpack_require__(/*! ./TermSheet */ "./src/AppBundle/Resources/public/javascript/buy/containers/TermSheet.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TechnicalDetails__ = __webpack_require__(/*! ./TechnicalDetails */ "./src/AppBundle/Resources/public/javascript/buy/containers/TechnicalDetails.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Seller__ = __webpack_require__(/*! ./Seller */ "./src/AppBundle/Resources/public/javascript/buy/containers/Seller.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment_moment__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment_moment__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var ListingDetails = function (_React$Component) {
    _inherits(ListingDetails, _React$Component);

    function ListingDetails(props) {
        _classCallCheck(this, ListingDetails);

        var _this = _possibleConstructorReturn(this, (ListingDetails.__proto__ || Object.getPrototypeOf(ListingDetails)).call(this, props));

        _this.showTab = function (tab) {
            _this.setState({ tab: tab });
        };

        _this.state = {
            content: props.content || {},
            tab: 1
        };
        return _this;
    }

    _createClass(ListingDetails, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                onBack = _props.onBack,
                content = _props.content;
            var tab = this.state.tab;

            var listingImage = content.image ? assetsBaseDir + "../" + content.image : this.noImage;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "listing-details" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "listing-details-header" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { onClick: onBack, className: "light-blue-button" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-chevron-left" }),
                        " Back to results"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "name" },
                        content.name
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "publisher", style: { flex: 1 } },
                        "Juan Cruz Talco"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { className: "link-button", style: { flex: 1 } },
                        "Contact Seller"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { className: "link-button", style: { flex: 1 } },
                        "Contact Seller"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "custom-id" },
                        "#",
                        content.customId
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "listing-details-content" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "left" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "image" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: listingImage })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { flex: 1, fontWeight: 600, lineHeight: "30px" } },
                            content.sportCategory && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                content.sportCategory.name
                            ),
                            content.tournament && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                content.tournament.name
                            ),
                            content.seasons && content.seasons.length > 0 && content.seasons.map(function (season) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    null,
                                    season.name
                                );
                            })
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "date" },
                            "Published ",
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "span",
                                null,
                                __WEBPACK_IMPORTED_MODULE_8_moment_moment___default()().format('DD/MM/YYYY')
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "date" },
                            "Expires ",
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "span",
                                null,
                                __WEBPACK_IMPORTED_MODULE_8_moment_moment___default()(content.expirationDate).format('DD/MM/YYYY')
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "right" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "listing-details-buttons" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "button",
                                { className: tab === 1 ? "active" : "", onClick: function onClick() {
                                        return _this2.showTab(1);
                                    } },
                                "Commercial terms"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "button",
                                { className: tab === 2 ? "active" : "", onClick: function onClick() {
                                        return _this2.showTab(2);
                                    } },
                                "Content information"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "button",
                                { className: tab === 3 ? "active" : "", onClick: function onClick() {
                                        return _this2.showTab(3);
                                    } },
                                "Term Sheet"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "button",
                                { className: tab === 4 ? "active" : "", onClick: function onClick() {
                                        return _this2.showTab(4);
                                    } },
                                "Technical details"
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "button",
                                { className: tab === 5 ? "active" : "", onClick: function onClick() {
                                        return _this2.showTab(5);
                                    } },
                                "Seller"
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "listing-details-tab" },
                            this.state.tab === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__CommercialTerms__["a" /* default */], { content: content }),
                            this.state.tab === 2 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ContentInformation__["a" /* default */], { content: this.props.content }),
                            this.state.tab === 3 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__TermSheet__["a" /* default */], {
                                selectedRights: content.selectedRightsBySuperRight,
                                rightsPackage: content.rightsPackage }),
                            this.state.tab === 4 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__TechnicalDetails__["a" /* default */], { content: this.props.content }),
                            this.state.tab === 5 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Seller__["a" /* default */], { content: this.props.content })
                        )
                    )
                )
            );
        }
    }]);

    return ListingDetails;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* test */])(id));
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(ListingDetails));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/containers/Marketplace.js":
/*!*********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/containers/Marketplace.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(/*! ../actions */ "./src/AppBundle/Resources/public/javascript/buy/actions/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_EventFilter__ = __webpack_require__(/*! ../components/EventFilter */ "./src/AppBundle/Resources/public/javascript/buy/components/EventFilter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_RightsFilter__ = __webpack_require__(/*! ../components/RightsFilter */ "./src/AppBundle/Resources/public/javascript/buy/components/RightsFilter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__main_components_ContentListing__ = __webpack_require__(/*! ../../main/components/ContentListing */ "./src/AppBundle/Resources/public/javascript/main/components/ContentListing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ListingDetails__ = __webpack_require__(/*! ./ListingDetails */ "./src/AppBundle/Resources/public/javascript/buy/containers/ListingDetails.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var Marketplace = function (_React$Component) {
    _inherits(Marketplace, _React$Component);

    function Marketplace(props) {
        _classCallCheck(this, Marketplace);

        var _this2 = _possibleConstructorReturn(this, (Marketplace.__proto__ || Object.getPrototypeOf(Marketplace)).call(this, props));

        _this2.selectListing = function (id) {

            var _this = _this2;

            if (id === _this.state.id) {
                _this.setState({
                    showDetails: true
                });

                return;
            }

            _this.setState({
                id: id,
                loadingListingDetails: true,
                showDetails: true
            });

            ContentArena.ContentApi.getByCustomId(id).done(function (content) {
                _this.setState({
                    content: content,
                    loadingListingDetails: false
                });
            });
        };

        _this2.filter = function (filter) {

            var _this = _this2;
            _this.setState({ loadingListing: true, listings: [] });
            ContentArena.Api.getJsonContent(filter).done(function (listings) {

                listings = listings.map(function (listing) {
                    return ContentArena.Utils.contentParserFromServer(listing);
                });
                _this.setState({ listings: listings, loadingListing: false });
                console.log(listings);
            });
        };

        _this2.state = {
            rightsPackage: JSON.parse(props.rights),
            loadingListing: false,
            loadingListingDetails: false,
            showDetails: false,
            listings: [],
            countries: [],
            territories: []
        };
        return _this2;
    }

    _createClass(Marketplace, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this = this;
            _this.setState({ loadingListing: true });
            ContentArena.Api.getJsonContent().done(function (listings) {

                listings = listings.map(function (listing) {
                    return ContentArena.Utils.contentParserFromServer(listing);
                });
                _this.setState({ listings: listings, loadingListing: false });
                console.log(listings);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                listings = _state.listings,
                loadingListing = _state.loadingListing,
                loadingListingDetails = _state.loadingListingDetails,
                showDetails = _state.showDetails,
                content = _state.content;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "buy-content" },
                !showDetails && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "buy-container-left" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_EventFilter__["a" /* default */], null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_RightsFilter__["a" /* default */], {
                        onFilter: this.filter,
                        rightsPackage: this.state.rightsPackage })
                ),
                !showDetails && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "buy-container-right" },
                    listings.length > 0 && listings.map(function (listing) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__main_components_ContentListing__["a" /* default */], _extends({
                            onSelect: _this3.selectListing,
                            key: listing.customId
                        }, listing));
                    }),
                    listings.length === 0 && loadingListing && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "big-spinner" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" })
                    ),
                    listings.length === 0 && !loadingListing && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { className: "no-results" },
                        "Sorry, no results. Try changing the filter settings!"
                    )
                ),
                loadingListingDetails && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "big-spinner" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" })
                ),
                showDetails && !loadingListingDetails && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__ListingDetails__["a" /* default */], {
                    onBack: function onBack() {
                        _this3.setState({ showDetails: false });
                    },
                    content: content })
            );
        }
    }]);

    return Marketplace;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return ownProps;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* test */])(id));
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Marketplace));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/containers/SalesPackages.js":
/*!***********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/containers/SalesPackages.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(/*! ../actions */ "./src/AppBundle/Resources/public/javascript/buy/actions/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_SalesPackage__ = __webpack_require__(/*! ../components/SalesPackage */ "./src/AppBundle/Resources/public/javascript/buy/components/SalesPackage.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var SalesPackages = function (_React$Component) {
    _inherits(SalesPackages, _React$Component);

    function SalesPackages(props) {
        _classCallCheck(this, SalesPackages);

        var _this = _possibleConstructorReturn(this, (SalesPackages.__proto__ || Object.getPrototypeOf(SalesPackages)).call(this, props));

        _this.getFee = function (salesPackage) {
            var currencySymbol = salesPackage.currency.code === "EUR" ? "€" : "$";
            return salesPackage.fee + " " + currencySymbol;
        };

        _this.state = {};
        _this.bidIcon = assetsBaseDir + "app/images/auction.svg";
        return _this;
    }

    _createClass(SalesPackages, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var salesPackages = this.props.salesPackages;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "sales-packages" },
                salesPackages.map(function (salesPackage, i) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "sales-package-container", key: "sales-package-" + i },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { flex: 1, textAlign: 'center' } },
                            salesPackage.territories.length
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { flex: 8 } },
                            salesPackage.name
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { flex: 2 } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-info-circle", onClick: function onClick() {} })
                        ),
                        (salesPackage.salesMethod.name !== "BIDDING" || salesPackage.salesMethod.name === "BIDDING" && salesPackage.fee > 0) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { flex: 2, justifyContent: "flex-end", display: "flex" } },
                            _this2.getFee(salesPackage)
                        ),
                        salesPackage.salesMethod.name === "BIDDING" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { flex: 1, justifyContent: "flex-end", display: "flex" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 30 }, src: _this2.bidIcon })
                        ),
                        salesPackage.salesMethod.name === "FIXED" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { className: "standard-button" },
                            "Buy now"
                        ),
                        salesPackage.salesMethod.name === "BIDDING" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { className: "standard-button" },
                            "Place bid"
                        )
                    );
                })
            );
        }
    }]);

    return SalesPackages;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* test */])(id));
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(SalesPackages));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/containers/Seller.js":
/*!****************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/containers/Seller.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(/*! ../actions */ "./src/AppBundle/Resources/public/javascript/buy/actions/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Seller = function (_React$Component) {
    _inherits(Seller, _React$Component);

    function Seller(props) {
        _classCallCheck(this, Seller);

        var _this = _possibleConstructorReturn(this, (Seller.__proto__ || Object.getPrototypeOf(Seller)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Seller, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    this.props.content.company.displayName
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h4",
                    null,
                    "Company details"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h5",
                    null,
                    "Legal company name"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    this.props.content.company.legalName
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h5",
                    null,
                    "Website Url"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    this.props.content.company.website
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h5",
                    null,
                    "Company Registration Number"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    this.props.content.company.registrationNumber
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h5",
                    null,
                    "VAT ID number"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    this.props.content.company.vat
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h5",
                    null,
                    "Address"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    this.props.content.company.address
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h5",
                    null,
                    "Phone"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    this.props.content.company.phone
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h5",
                    null,
                    "ZIP"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    this.props.content.company.zip
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h5",
                    null,
                    "Country"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "p",
                    null,
                    this.props.content.company.country.name
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "h4",
                    null,
                    "Company information"
                )
            );
        }
    }]);

    return Seller;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* test */])(id));
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Seller));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/containers/TechnicalDetails.js":
/*!**************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/containers/TechnicalDetails.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(/*! ../actions */ "./src/AppBundle/Resources/public/javascript/buy/actions/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var TechnicalDetails = function (_React$Component) {
    _inherits(TechnicalDetails, _React$Component);

    function TechnicalDetails(props) {
        _classCallCheck(this, TechnicalDetails);

        var _this = _possibleConstructorReturn(this, (TechnicalDetails.__proto__ || Object.getPrototypeOf(TechnicalDetails)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(TechnicalDetails, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null);
        }
    }]);

    return TechnicalDetails;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* test */])(id));
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(TechnicalDetails));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/containers/TermSheet.js":
/*!*******************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/containers/TermSheet.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(/*! ../actions */ "./src/AppBundle/Resources/public/javascript/buy/actions/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sell_components_RightDefinitions__ = __webpack_require__(/*! ../../sell/components/RightDefinitions */ "./src/AppBundle/Resources/public/javascript/sell/components/RightDefinitions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sell_components_ProductionStandardsDefinitions__ = __webpack_require__(/*! ../../sell/components/ProductionStandardsDefinitions */ "./src/AppBundle/Resources/public/javascript/sell/components/ProductionStandardsDefinitions.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__sell_components_RightItemsDefinitions__ = __webpack_require__(/*! ../../sell/components/RightItemsDefinitions */ "./src/AppBundle/Resources/public/javascript/sell/components/RightItemsDefinitions.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var TermSheet = function (_React$Component) {
    _inherits(TermSheet, _React$Component);

    function TermSheet(props) {
        _classCallCheck(this, TermSheet);

        var _this = _possibleConstructorReturn(this, (TermSheet.__proto__ || Object.getPrototypeOf(TermSheet)).call(this, props));

        _this.hasTextarea = function () {};

        _this.renderList = function (definitions) {
            var _this$props = _this.props,
                selectedRights = _this$props.selectedRights,
                rightsPackage = _this$props.rightsPackage;

            return definitions.map(function (right) {

                if (right.key === 'PROGRAM') return;

                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "row" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "right-name" },
                        right.name
                    ),
                    rightsPackage.map(function (rp) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "right-definition" },
                            __WEBPACK_IMPORTED_MODULE_5__sell_components_RightItemsDefinitions__["a" /* RightItemsDefinitions */][selectedRights[rp.id].items[right.key]].label
                        );
                    })
                );
            });
        };

        _this.renderTextarea = function (definitions) {
            var _this$props2 = _this.props,
                selectedRights = _this$props2.selectedRights,
                rightsPackage = _this$props2.rightsPackage;

            return definitions.map(function (right) {
                if (right.key === 'PROGRAM' || !selectedRights[rightsPackage[0].id].items[right.key + "_TEXTAREA"]) return;
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "full-item-box" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        null,
                        right.name
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "full-item-content" },
                        selectedRights[rightsPackage[0].id].items[right.key + "_TEXTAREA"]
                    )
                );
            });
        };

        _this.renderDetails = function (definitions) {
            var _this$props3 = _this.props,
                selectedRights = _this$props3.selectedRights,
                rightsPackage = _this$props3.rightsPackage;

            return definitions.map(function (right) {
                if (right.key === 'PROGRAM' || !selectedRights[rightsPackage[0].id].items[right.key + "_DETAILS"]) return;
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "full-item-box" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        null,
                        right.name
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "full-item-content" },
                        selectedRights[rightsPackage[0].id].items[right.key + "_DETAILS"]
                    )
                );
            });
        };

        _this.state = {};
        return _this;
    }

    _createClass(TermSheet, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                selectedRights = _props.selectedRights,
                rightsPackage = _props.rightsPackage;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "term-sheet" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "term-sheet-items" },
                    this.renderList(__WEBPACK_IMPORTED_MODULE_3__sell_components_RightDefinitions__["a" /* RightDefinitions */]),
                    this.renderList(__WEBPACK_IMPORTED_MODULE_4__sell_components_ProductionStandardsDefinitions__["a" /* ProductionStandardsDefinitions */])
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { style: { marginTop: 20 } },
                    this.renderTextarea(__WEBPACK_IMPORTED_MODULE_3__sell_components_RightDefinitions__["a" /* RightDefinitions */]),
                    this.renderTextarea(__WEBPACK_IMPORTED_MODULE_4__sell_components_ProductionStandardsDefinitions__["a" /* ProductionStandardsDefinitions */]),
                    selectedRights[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"] && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "full-item-box" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "label",
                            null,
                            "Technical Fee Details"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "full-item-content" },
                            selectedRights[rightsPackage[0].id].items["TECHNICAL_FEE_DETAILS"]
                        )
                    )
                )
            );
        }
    }]);

    return TermSheet;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        onClick: function onClick(id) {
            return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions__["a" /* test */])(id));
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(TermSheet));

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
    UPDATE_EXCLUSIVE: 'UPDATE_EXCLUSIVE'
};

var filter = function filter() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        rights: [],
        countries: [],
        exclusive: false

    };
    var action = arguments[1];


    switch (action.type) {
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
        default:
            return state;
    }
};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/reducers/index.js":
/*!*************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/reducers/index.js ***!
  \*************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__marketplace__ = __webpack_require__(/*! ./marketplace */ "./src/AppBundle/Resources/public/javascript/buy/reducers/marketplace.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter__ = __webpack_require__(/*! ./filter */ "./src/AppBundle/Resources/public/javascript/buy/reducers/filter.js");





var reducers = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
    marketplace: __WEBPACK_IMPORTED_MODULE_1__marketplace__["a" /* marketplace */],
    filter: __WEBPACK_IMPORTED_MODULE_2__filter__["a" /* filter */]
});

/* harmony default export */ __webpack_exports__["a"] = (reducers);

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

/***/ "./src/AppBundle/Resources/public/javascript/buy/store.js":
/*!****************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/store.js ***!
  \****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers__ = __webpack_require__(/*! ./reducers */ "./src/AppBundle/Resources/public/javascript/buy/reducers/index.js");
/**
 * Created by JuanCruz on 4/1/2018.
 */





/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_2__reducers__["a" /* default */]));

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
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

            var currencySymbol = currency === "EUR" ? "€" : "$";
            return salesPackage.fee + " " + currencySymbol;
        };

        _this.onSelect = function () {
            var _this$props = _this.props,
                onSelect = _this$props.onSelect,
                customId = _this$props.customId;


            if (onSelect) onSelect(customId);
        };

        _this.state = {};
        _this.bidIcon = assetsBaseDir + "app/images/auction.svg";
        _this.noImage = assetsBaseDir + "app/images/no-image.png";
        return _this;
    }

    _createClass(ContentListing, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                name = _props.name,
                expirationDate = _props.expirationDate,
                rightsPackage = _props.rightsPackage,
                sportCategory = _props.sportCategory,
                tournament = _props.tournament,
                seasons = _props.seasons,
                salesPackages = _props.salesPackages,
                imageBase64 = _props.imageBase64,
                image = _props.image;


            var seasonName = seasons.map(function (season) {
                return season.name;
            }).join(", ");
            var listingImage = imageBase64 ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;

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
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "date" },
                        "Published ",
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            null,
                            __WEBPACK_IMPORTED_MODULE_1_moment_moment___default()().format('DD/MM/YYYY')
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "date" },
                        "Expires ",
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "span",
                            null,
                            __WEBPACK_IMPORTED_MODULE_1_moment_moment___default()(expirationDate).format('DD/MM/YYYY')
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "right" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "name" },
                        name
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { style: { display: "flex" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { flex: 1, fontWeight: 600, lineHeight: "30px" } },
                            sportCategory && sportCategory.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                sportCategory[0].name
                            ),
                            tournament && tournament.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                tournament[0].name
                            ),
                            seasons && seasons.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                seasonName
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { style: { flex: 2, flexDirection: "column" } },
                            rightsPackage.map(function (sr, i) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { key: i, style: { paddingBottom: 10, flexDirection: 'row', display: 'flex' } },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { style: { color: '#2DA7E6' }, className: "fa fa-check-circle-o" }),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { style: { display: 'flex', flexDirection: "column" } },
                                        sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "span",
                                            { style: { fontSize: 10 } },
                                            "EXCLUSIVE"
                                        ),
                                        sr.name
                                    )
                                );
                            })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "sales-bundles" },
                        salesPackages.slice(0, 4).map(function (salesPackage, i) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "sales-package", key: "sales-package-" + i },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: {} },
                                    salesPackage.name
                                ),
                                salesPackage.salesMethod === "BIDDING" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: { flex: 1, justifyContent: "flex-end", display: "flex" } },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 30 }, src: _this2.bidIcon })
                                ),
                                (salesPackage.salesMethod !== "BIDDING" || salesPackage.salesMethod === "BIDDING" && salesPackage.fee > 0) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { style: { margin: '0 10px', display: "flex", flex: '1 0 auto' } },
                                    _this2.getFee(salesPackage)
                                )
                            );
                        }),
                        salesPackages.length > 4 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "sales-package" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: { color: '#2DA7E6' } },
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
            var _this2$props$filter = _this2.props.filter,
                filter = _this2$props$filter === undefined ? [] : _this2$props$filter;

            var countries = Object.values(ContentArena.Data.Countries).map(function (i, k) {
                return { value: i.name, label: i.name };
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
                multi = _props$multi === undefined ? true : _props$multi;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_select__["a" /* default */], {
                className: className,
                name: 'form-field-name',
                onChange: onChange,
                value: value,
                multi: multi,
                options: this.getOptions()
            });
        }
    }]);

    return CountrySelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (CountrySelector);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/Match.js":
/*!****************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/Match.js ***!
  \****************************************************************************/
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



var Match = function (_React$Component) {
    _inherits(Match, _React$Component);

    function Match(props) {
        _classCallCheck(this, Match);

        var _this = _possibleConstructorReturn(this, (Match.__proto__ || Object.getPrototypeOf(Match)).call(this, props));

        _this.toggle = function (e) {
            _this.setState(function (prevState) {
                return {
                    selected: !prevState.selected
                };
            });

            _this.props.onUpdate(!_this.state.selected);

            e.stopPropagation();
        };

        _this.update = function (selected) {
            _this.setState({ selected: selected });
        };

        _this.state = {
            match: props.match,
            selected: props.selected || false
        };
        return _this;
    }

    _createClass(Match, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {}
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var competitorsLen = this.props.match.competitors.length;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "match ", onClick: function onClick() {
                        _this2.props.onSelect(_this2.props.match.externalId);
                    } },
                this.props.match.selected && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-circle" }),
                !this.props.match.selected && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-circle-o" }),
                this.props.match.competitors.map(function (competitor, i) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        { key: i },
                        competitor.name,
                        " ",
                        competitorsLen !== i + 1 && " vs "
                    );
                })
            );
        }
    }]);

    return Match;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (Match);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/ProductionStandardsDefinitions.js":
/*!*****************************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/ProductionStandardsDefinitions.js ***!
  \*****************************************************************************************************/
/*! exports provided: ProductionStandardsDefinitions */
/*! exports used: ProductionStandardsDefinitions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductionStandardsDefinitions; });
var ProductionStandardsDefinitions = [{
    name: "Video Standard",
    key: "VIDEO_STANDARD",
    superRights: [],
    options: ["VIDEO_STANDARD_HD", "VIDEO_STANDARD_SD", "VIDEO_STANDARD_UHD", "VIDEO_STANDARD_VR", "VIDEO_STANDARD_NOT_AVAILABLE"],
    multiple: false
}, {
    name: "Aspect ratio",
    key: "ASPECT_RATIO",
    superRights: [],
    options: ["ASPECT_RATIO_16_9", "ASPECT_RATIO_4_3", "ASPECT_RATIO_CUSTOM", "ASPECT_RATIO_NOT_AVAILABLE"],
    multiple: false
}, {
    name: "Graphics",
    key: "GRAPHICS",
    superRights: [],
    options: ["GRAPHICS_NO", "GRAPHICS_YES", "GRAPHICS_NOT_AVAILABLE"],
    multiple: false
}, {
    name: "Commentary",
    key: "COMMENTARY",
    superRights: [],
    options: ["COMMENTARY_NO", "COMMENTARY_YES", "COMMENTARY_NOT_AVAILABLE"],
    multiple: false
}, {
    name: "Camera standards",
    key: "CAMERA",
    superRights: [],
    options: ["CAMERA_MINIMUM", "CAMERA_NOT_AVAILABLE"],
    multiple: false
}, {
    name: "Technical delivery",
    key: "TECHNICAL_DELIVERY",
    superRights: [],
    options: ["TECHNICAL_DELIVERY_SATELLITE", "TECHNICAL_DELIVERY_IP", "TECHNICAL_DELIVERY_FTP", "TECHNICAL_DELIVERY_FIBER"],
    multiple: false,
    showTextArea: "FURTHER_DETAILS",
    technicalFee: "TECHNICAL_DELIVERY_SATELLITE"
}, {
    name: "Content production",
    key: "CONTENT",
    superRights: [],
    options: ["CONTENT_ALL", "CONTENT_TEXT"],
    showTextArea: "CONTENT_TEXT",
    multiple: false
}, {
    name: "Program Details",
    key: "PROGRAM",
    superRights: ['PR'],
    options: [],
    multiple: false
}];

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/RightDefinitions.js":
/*!***************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/RightDefinitions.js ***!
  \***************************************************************************************/
/*! exports provided: RightDefinitions */
/*! exports used: RightDefinitions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RightDefinitions; });
var RightDefinitions = [{
    name: "Right to sublicense",
    key: "SUBLICENSE",
    superRights: [],
    options: ["SUBLICENSE_YES", "SUBLICENSE_YES_APPROVAL", "SUBLICENSE_NO"],
    multiple: false
}, {
    name: "Cut available",
    key: "CUTS",
    superRights: ["HL", "CL", "NA"],
    options: ["CUT_AVAILABLE_YES", "CUT_AVAILABLE_NO"],
    multiple: false,
    showTextArea: "CUT_AVAILABLE_YES"
}, {
    name: "Broadcasting obligation",
    key: "BROADCASTING",
    superRights: [],
    options: ["BROADCASTING_NO", "BROADCASTING_YES"],
    showTextArea: "BROADCASTING_YES",
    multiple: false
}, {
    name: "Transmission means",
    key: "TRANSMISSION_MEANS",
    superRights: [],
    options: ["TRANSMISSION_MEANS_ALL", "TRANSMISSION_MEANS_CABLE", "TRANSMISSION_MEANS_SATELLITE", "TRANSMISSION_MEANS_DIGITAL", "TRANSMISSION_MEANS_OTT", "TRANSMISSION_MEANS_INTERNET", "TRANSMISSION_MEANS_MOBILE"],
    multiple: true
}, {
    name: "Exploitation form",
    key: "EXPLOITATION_FORM",
    superRights: [],
    options: ["EXPLOITATION_FORM_ALL", "EXPLOITATION_FORM_FREE", "EXPLOITATION_FORM_PAY", "EXPLOITATION_FORM_IN-SHIP", "EXPLOITATION_FORM_CLOSED"],
    multiple: true
}, {
    name: "Number of runs",
    key: "RUNS",
    superRights: ["CL", "NA", "PR", "DT", "HL"],
    options: ["RUNS_UNLIMITED", "RUNS_LIMITED"],
    multiple: false
}, {
    name: "Exploitation window",
    key: "EXPLOITATION_WINDOW",
    superRights: ["CL", "NA", "PR", "DT", "HL"],
    options: ["EXPLOITATION_WINDOW_UNLIMITED", "EXPLOITATION_WINDOW_LIMITED"],
    multiple: false,
    showTextArea: "EXPLOITATION_WINDOW_LIMITED"
}, {
    name: "Reserved rights",
    key: "RESERVED_RIGHTS",
    superRights: [],
    options: ["RESERVED_RIGHTS_NO", "RESERVED_RIGHTS_YES"],
    multiple: false,
    showTextArea: "RESERVED_RIGHTS_YES"

}];

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/RightItemsDefinitions.js":
/*!********************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/RightItemsDefinitions.js ***!
  \********************************************************************************************/
/*! exports provided: RightItemsDefinitions */
/*! exports used: RightItemsDefinitions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RightItemsDefinitions; });
var RightItemsDefinitions = {
    "BROADCASTING_YES": {
        "parent": "Broadcasting obligation",
        "label": "Yes"
    },
    "BROADCASTING_NO": {
        "parent": "Broadcasting obligation",
        "label": "No"
    },
    "SUBLICENSE_YES": {
        "parent": "Right to sublicense",
        "label": "Yes, free sublicensing"
    },
    "SUBLICENSE_YES_APPROVAL": {
        "parent": "Right to sublicense",
        "label": "Yes, but remains subject to seller's approval"
    },
    "SUBLICENSE_NO": {
        "parent": "Right to sublicense",
        "label": "No sublicensing"
    },
    "CUT_AVAILABLE_YES": {
        "parent": "Cut available",
        "label": "Yes"
    },
    "CUT_AVAILABLE_NO": {
        "parent": "Cut available",
        "label": "No"
    },
    "TRANSMISSION_MEANS_ALL": {
        "parent": "Transmission means",
        "label": "All"
    },
    "TRANSMISSION_MEANS_CABLE": {
        "parent": "Transmission means",
        "label": "Cable & iptv"
    },
    "TRANSMISSION_MEANS_SATELLITE": {
        "parent": "Transmission means",
        "label": "Satellite"
    },
    "TRANSMISSION_MEANS_DIGITAL": {
        "parent": "Transmission means",
        "label": "Digital terrestrial"
    },
    "TRANSMISSION_MEANS_OTT": {
        "parent": "Transmission means",
        "label": "OTT"
    },
    "TRANSMISSION_MEANS_INTERNET": {
        "parent": "Transmission means",
        "label": "Internet"
    },
    "TRANSMISSION_MEANS_MOBILE": {
        "parent": "Transmission means",
        "label": "Mobile"
    },
    "EXPLOITATION_FORM_ALL": {
        "parent": "Exploitation form",
        "label": "All"
    },
    "EXPLOITATION_FORM_FREE": {
        "parent": "Exploitation form",
        "label": "Free Only"
    },
    "EXPLOITATION_FORM_PAY": {
        "parent": "Exploitation form",
        "label": "Pay only"
    },
    "EXPLOITATION_FORM_IN-SHIP": {
        "parent": "Exploitation form",
        "label": "In-ship and in-flight"
    },
    "EXPLOITATION_FORM_CLOSED": {
        "parent": "Exploitation form",
        "label": "Closed circuit"
    },
    "RUNS_UNLIMITED": {
        "parent": "Number of runs",
        "label": "Unlimited"
    },
    "RUNS_LIMITED": {
        "parent": "Number of runs",
        "label": "Limited",
        numberField: true
    },
    "EXPLOITATION_WINDOW_UNLIMITED": {
        "parent": "Exploitation window",
        "label": "Unlimited"
    },
    "EXPLOITATION_WINDOW_LIMITED": {
        "parent": "Exploitation window",
        "label": "Limited"
    },

    "VIDEO_STANDARD_HD": {
        "parent": "Video standard",
        "label": "HD"
    },
    "VIDEO_STANDARD_SD": {
        "parent": "Video standard",
        "label": "SD"
    },
    "VIDEO_STANDARD_UHD": {
        "parent": "Video standard",
        "label": "UHD"
    },
    "VIDEO_STANDARD_VR": {
        "parent": "Video standard",
        "label": "VR"
    },
    "VIDEO_STANDARD_NOT_AVAILABLE": {
        "parent": "Video standard",
        "label": "Info not available yet"
    },
    "RESERVED_RIGHTS_NO": {
        "parent": "Reserved rights",
        "label": "No"
    },
    "RESERVED_RIGHTS_YES": {
        "parent": "Reserved rights",
        "label": "Yes"

    },
    "ASPECT_RATIO_16_9": {
        "parent": "Aspect ratio",
        "label": "16:9"
    },
    "ASPECT_RATIO_4_3": {
        "parent": "Aspect ratio",
        "label": "4:3"
    },
    "ASPECT_RATIO_CUSTOM": {
        "parent": "Aspect ratio",
        "label": "Other",
        textField: true
    },
    "ASPECT_RATIO_NOT_AVAILABLE": {
        "parent": "Aspect ratio",
        "label": "Info not available yet"
    },
    "GRAPHICS_NO": {
        "parent": "Graphics",
        "label": "No"
    },
    "GRAPHICS_YES": {
        "parent": "Graphics",
        "label": "Yes",
        language: true,
        languages: []
    },
    "GRAPHICS_NOT_AVAILABLE": {
        "parent": "Graphics",
        "label": "Info not available yet"
    },
    "COMMENTARY_NO": {
        "parent": "Commentary",
        "label": "No"
    },
    "COMMENTARY_YES": {
        "parent": "Commentary",
        "label": "Yes",
        language: true,
        languages: []
    },
    "COMMENTARY_NOT_AVAILABLE": {
        "parent": "Commentary",
        "label": "Info not available yet"
    },
    "CAMERA_MINIMUM": {
        "parent": "Camera standards",
        "label": "Minimum cameras",
        numberField: true,
        numberFieldValue: "CAMERAS"
    },
    "CAMERA_TEXT": {
        "parent": "Camera standards",
        "label": "",
        textField: true
    },
    "CAMERA_NOT_AVAILABLE": {
        "parent": "Camera standards",
        "label": "Info not available yet"
    },
    "CONTENT_ALL": {
        "parent": "Content production",
        "label": "All content produced"
    },
    "CONTENT_TEXT": {
        "parent": "Content production",
        "label": "Content partially produced"
    },

    "TECHNICAL_DELIVERY_SATELLITE": {
        "parent": "Technical delivery",
        "label": "Satellite"
    },

    "TECHNICAL_DELIVERY_IP": {
        "parent": "Technical delivery",
        "label": "IP"
    },

    "TECHNICAL_DELIVERY_FTP": {
        "parent": "Technical delivery",
        "label": "FTP-server"
    },

    "TECHNICAL_DELIVERY_FIBER": {
        "parent": "Technical delivery",
        "label": "Fiber"
    }

};

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/Round.js":
/*!****************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/Round.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Match__ = __webpack_require__(/*! ./Match */ "./src/AppBundle/Resources/public/javascript/sell/components/Match.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Round = function (_React$Component) {
    _inherits(Round, _React$Component);

    function Round(props) {
        _classCallCheck(this, Round);

        var _this = _possibleConstructorReturn(this, (Round.__proto__ || Object.getPrototypeOf(Round)).call(this, props));

        _this.toggle = function (e) {

            var selected = e.target.checked;
            _this.setState({ selected: selected });
            e.stopPropagation();

            _this.selectAll(selected);
        };

        _this.toggleMatches = function (e) {
            _this.setState(function (prevState) {
                return {
                    showMatches: !prevState.showMatches
                };
            });

            e.stopPropagation();
        };

        _this.selectAll = function (selected) {

            var matches = _this.state.matches;
            matches.forEach(function (match) {
                match.selected = selected;
            });
            _this.setState({ matches: matches });
        };

        _this.onSelect = function (id) {

            var matches = _this.state.matches;
            matches.get(id).selected = !matches.get(id).selected;
            _this.setState({ matches: matches });
        };

        _this.getSelected = function () {

            return Array.from(_this.state.matches.values()).filter(function (m) {
                return m.selected;
            }).length;
        };

        _this.state = {
            round: props.round,
            schedule: props.schedule,
            selected: false,
            showMatches: false,
            matches: new Map(props.schedule.map(function (i) {
                return [i.externalId, i];
            }))
        };

        return _this;
    }

    _createClass(Round, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            console.log(this.getSelected(), this.state.schedule.length, this.getSelected() === 0);
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: "matchday" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'select-box-checkbox' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox',
                        onChange: this.toggle,
                        id: "round-" + this.props.round }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('label', { htmlFor: "round-" + this.props.round }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { style: { width: '100%' } },
                        isNaN(this.state.round) && this.state.round,
                        !isNaN(this.state.round) && "Matchday " + this.state.round,
                        this.getSelected() === 0 && this.getSelected() !== this.state.schedule.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'span',
                            { onClick: this.toggleMatches },
                            'Select >'
                        ),
                        this.getSelected() !== 0 && this.getSelected() === this.state.schedule.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'span',
                            { onClick: this.toggleMatches },
                            'All >'
                        ),
                        this.getSelected() !== 0 && this.getSelected() !== this.state.schedule.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'span',
                            { onClick: this.toggleMatches },
                            this.getSelected(),
                            ' Selected >'
                        )
                    )
                ),
                this.state.showMatches && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "match-group" },
                    this.state.matches.size > 0 && Array.from(this.state.matches.values()).map(function (item, i) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Match__["a" /* default */], { match: item,
                            key: item.externalId,
                            onSelect: _this2.onSelect });
                    })
                )
            );
        }
    }]);

    return Round;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (Round);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/SellFormItems.js":
/*!************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/SellFormItems.js ***!
  \************************************************************************************/
/*! exports provided: Description, TitleBar, NewCategory, NewTournament, Schedules, SportSelector */
/*! exports used: Description, NewCategory, NewTournament, Schedules, SportSelector, TitleBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Description; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return TitleBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NewCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NewTournament; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Schedules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SportSelector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Round__ = __webpack_require__(/*! ../components/Round */ "./src/AppBundle/Resources/public/javascript/sell/components/Round.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Description = function Description(_ref) {
    var value = _ref.value,
        onBlur = _ref.onBlur;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'textarea-input' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            null,
            'Enter a description'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { onBlur: onBlur, defaultValue: value, placeholder: "Provide a short description of your content listing" })
    );
};

var TitleBar = function TitleBar(_ref2) {
    var title = _ref2.title,
        subtitle = _ref2.subtitle;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'title-bar' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('hr', null),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: "title" },
            title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: "subtitle" },
            subtitle
        )
    );
};

var NewCategory = function NewCategory(_ref3) {
    var onClick = _ref3.onClick,
        showClose = _ref3.showClose,
        onBlur = _ref3.onBlur,
        value = _ref3.value;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'base-input' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            null,
            'Country/Category'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            className: 'new-category',
            type: 'text',
            placeholder: 'Enter Country/Category',
            onBlur: onBlur,
            defaultValue: value }),
        showClose && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { onClick: onClick, className: "standard-button" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-close' })
        )
    );
};

var NewTournament = function NewTournament(_ref4) {
    var onClick = _ref4.onClick,
        showClose = _ref4.showClose,
        onBlur = _ref4.onBlur,
        value = _ref4.value;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'base-input' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            null,
            'Competition'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            className: 'new-category',
            type: 'text',
            onBlur: onBlur,
            defaultValue: value,
            placeholder: 'Enter competition name' }),
        showClose && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { onClick: onClick, className: "standard-button" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-close' })
        )
    );
};

var Schedules = function Schedules(_ref5) {
    var schedules = _ref5.schedules;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'schedule' },
        schedules && Object.keys(schedules).map(function (number, i) {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__components_Round__["a" /* default */], { key: i, round: number, schedule: schedules[number] });
        })
    );
};

var SportSelector = function (_React$Component) {
    _inherits(SportSelector, _React$Component);

    function SportSelector(props) {
        _classCallCheck(this, SportSelector);

        var _this = _possibleConstructorReturn(this, (SportSelector.__proto__ || Object.getPrototypeOf(SportSelector)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(SportSelector, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'base-input' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        null,
                        'Sport'
                    ),
                    !this.props.isCustom && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                        value: this.props.value,
                        readOnly: true,
                        onClick: this.props.onClick,
                        placeholder: "Sport" }),
                    this.props.isCustom && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                        className: 'new-sport',
                        type: 'text',
                        placeholder: 'Enter sport' }),
                    (this.props.isCustom || this.props.showClose) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: 'standard-button', onClick: this.props.remove },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-close' })
                    )
                ),
                this.props.showAddNew && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { style: { marginBottom: "25px" }, className: "link-button", onClick: this.props.addSportSelector },
                    'Add sport'
                )
            );
        }
    }]);

    return SportSelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/***/ }),

/***/ "./src/AppBundle/Resources/public/scss/marketplace.scss":
/*!**************************************************************!*\
  !*** ./src/AppBundle/Resources/public/scss/marketplace.scss ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1:
/*!********************************************************************!*\
  !*** multi ./src/AppBundle/Resources/public/javascript/buy/buy.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/buy/buy.js */"./src/AppBundle/Resources/public/javascript/buy/buy.js");


/***/ })

},[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtaW5wdXQtYXV0b3NpemUvbGliL0F1dG9zaXplSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvYWN0aW9ucy9maWx0ZXJBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9hY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9idXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbXBvbmVudHMvRXZlbnRGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbXBvbmVudHMvUmlnaHRzRmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb21wb25lbnRzL1NhbGVzUGFja2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29udGFpbmVycy9Db21tZXJjaWFsVGVybXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbnRhaW5lcnMvQ29udGVudEluZm9ybWF0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL0xpc3RpbmdEZXRhaWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL01hcmtldHBsYWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL1NhbGVzUGFja2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbnRhaW5lcnMvU2VsbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL1RlY2huaWNhbERldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbnRhaW5lcnMvVGVybVNoZWV0LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9yZWR1Y2Vycy9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9yZWR1Y2Vycy9tYXJrZXRwbGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0NvbnRlbnRMaXN0aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9Db3VudHJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL01hdGNoLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9Qcm9kdWN0aW9uU3RhbmRhcmRzRGVmaW5pdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL1JpZ2h0RGVmaW5pdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL1JpZ2h0SXRlbXNEZWZpbml0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbXBvbmVudHMvUm91bmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL1NlbGxGb3JtSXRlbXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL3Njc3MvbWFya2V0cGxhY2Uuc2Nzcz80N2FhIl0sIm5hbWVzIjpbImFkZFJpZ2h0IiwidHlwZSIsImZpbHRlclR5cGVzIiwiQUREX1JJR0hUIiwiaWQiLCJyZW1vdmVSaWdodCIsIlJFTU9WRV9SSUdIVCIsInVwZGF0ZUNvdW50cmllcyIsIlVQREFURV9DT1VOVFJJRVMiLCJjb3VudHJpZXMiLCJ1cGRhdGVFeGNsdXNpdmUiLCJVUERBVEVfRVhDTFVTSVZFIiwiZXhjbHVzaXZlIiwibmV4dFRvZG9JZCIsInRlc3QiLCJtYXJrZXRwbGFjZVR5cGVzIiwiVEVTVCIsInRleHQiLCJyZXF1aXJlIiwibWFya2V0cGxhY2VDb250YWluZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiTWFya2V0cGxhY2VBcHAiLCJSZWFjdERPTSIsInJlbmRlciIsImRhdGFzZXQiLCIkIiwiQ29udGVudEFyZW5hIiwiVGVzdCIsIk1hcmtldFBsYWNlIiwiQXBpIiwiZ2V0U3BvcnRzIiwiZG9uZSIsInNwb3J0cyIsIkRhdGEiLCJGdWxsU3BvcnRzIiwic2VsZWN0IiwiVG9wU3BvcnRzIiwiZm9yRWFjaCIsInNwb3J0IiwiYXBwZW5kIiwiZXh0ZXJuYWxJZCIsIm5hbWUiLCJFdmVudEZpbHRlciIsInByb3BzIiwic2hvd1RhYiIsInRhYiIsInNldFN0YXRlIiwic3RhdGUiLCJuZXh0UHJvcHMiLCJSZWFjdCIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIm9uQ2xpY2siLCJkaXNwYXRjaCIsImNvbm5lY3QiLCJSaWdodHNGaWx0ZXIiLCJzZWxlY3RUZXJyaXRvcnkiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJyaWdodHMiLCJyaWdodHNQYWNrYWdlIiwib25GaWx0ZXIiLCJtYXJnaW5Ub3AiLCJtYXAiLCJyaWdodCIsImluZGV4T2YiLCJlIiwidGFyZ2V0IiwiY2hlY2tlZCIsIm1hcmdpbkJvdHRvbSIsImNvdW50cnkiLCJsYWJlbCIsImZpbHRlciIsIlNhbGVzUGFja2FnZSIsInNhbGVzUGFja2FnZSIsIkNvbW1lcmNpYWxUZXJtcyIsImNvbnRlbnQiLCJzYWxlc1BhY2thZ2VzIiwiQ29udGVudEluZm9ybWF0aW9uIiwiZGVzY3JpcHRpb24iLCJMaXN0aW5nRGV0YWlscyIsIm9uQmFjayIsImxpc3RpbmdJbWFnZSIsImltYWdlIiwiYXNzZXRzQmFzZURpciIsIm5vSW1hZ2UiLCJmbGV4IiwiY3VzdG9tSWQiLCJmb250V2VpZ2h0IiwibGluZUhlaWdodCIsInNwb3J0Q2F0ZWdvcnkiLCJ0b3VybmFtZW50Iiwic2Vhc29ucyIsImxlbmd0aCIsInNlYXNvbiIsIk1vbWVudCIsImZvcm1hdCIsImV4cGlyYXRpb25EYXRlIiwic2VsZWN0ZWRSaWdodHNCeVN1cGVyUmlnaHQiLCJNYXJrZXRwbGFjZSIsInNlbGVjdExpc3RpbmciLCJfdGhpcyIsInNob3dEZXRhaWxzIiwibG9hZGluZ0xpc3RpbmdEZXRhaWxzIiwiQ29udGVudEFwaSIsImdldEJ5Q3VzdG9tSWQiLCJsb2FkaW5nTGlzdGluZyIsImxpc3RpbmdzIiwiZ2V0SnNvbkNvbnRlbnQiLCJVdGlscyIsImNvbnRlbnRQYXJzZXJGcm9tU2VydmVyIiwibGlzdGluZyIsIkpTT04iLCJwYXJzZSIsInRlcnJpdG9yaWVzIiwib3duUHJvcHMiLCJTYWxlc1BhY2thZ2VzIiwiZ2V0RmVlIiwiY3VycmVuY3lTeW1ib2wiLCJjdXJyZW5jeSIsImNvZGUiLCJmZWUiLCJiaWRJY29uIiwiaSIsInRleHRBbGlnbiIsInNhbGVzTWV0aG9kIiwianVzdGlmeUNvbnRlbnQiLCJkaXNwbGF5Iiwid2lkdGgiLCJTZWxsZXIiLCJjb21wYW55IiwiZGlzcGxheU5hbWUiLCJsZWdhbE5hbWUiLCJ3ZWJzaXRlIiwicmVnaXN0cmF0aW9uTnVtYmVyIiwidmF0IiwiYWRkcmVzcyIsInBob25lIiwiemlwIiwiVGVjaG5pY2FsRGV0YWlscyIsIlRlcm1TaGVldCIsImhhc1RleHRhcmVhIiwicmVuZGVyTGlzdCIsImRlZmluaXRpb25zIiwic2VsZWN0ZWRSaWdodHMiLCJrZXkiLCJycCIsIlJpZ2h0SXRlbXNEZWZpbml0aW9ucyIsIml0ZW1zIiwicmVuZGVyVGV4dGFyZWEiLCJyZW5kZXJEZXRhaWxzIiwiYWN0aW9uIiwiT2JqZWN0IiwiYXNzaWduIiwiaW5kZXgiLCJzcGxpY2UiLCJyZWR1Y2VycyIsImNvbWJpbmVSZWR1Y2VycyIsIm1hcmtldHBsYWNlIiwidGVzdEl0ZW0iLCJjcmVhdGVTdG9yZSIsIkNvbnRlbnRMaXN0aW5nIiwib25TZWxlY3QiLCJpbWFnZUJhc2U2NCIsInNlYXNvbk5hbWUiLCJqb2luIiwiZmxleERpcmVjdGlvbiIsInNyIiwicGFkZGluZ0JvdHRvbSIsImNvbG9yIiwiZm9udFNpemUiLCJzbGljZSIsIm1hcmdpbiIsIkNvdW50cnlTZWxlY3RvciIsImdldE9wdGlvbnMiLCJ2YWx1ZXMiLCJDb3VudHJpZXMiLCJrIiwiZ2V0Q291bnRyaWVzIiwib25DaGFuZ2UiLCJjbGFzc05hbWUiLCJtdWx0aSIsIk1hdGNoIiwidG9nZ2xlIiwicHJldlN0YXRlIiwic2VsZWN0ZWQiLCJvblVwZGF0ZSIsInN0b3BQcm9wYWdhdGlvbiIsInVwZGF0ZSIsIm1hdGNoIiwiY29tcGV0aXRvcnNMZW4iLCJjb21wZXRpdG9ycyIsImNvbXBldGl0b3IiLCJQcm9kdWN0aW9uU3RhbmRhcmRzRGVmaW5pdGlvbnMiLCJzdXBlclJpZ2h0cyIsIm9wdGlvbnMiLCJtdWx0aXBsZSIsInNob3dUZXh0QXJlYSIsInRlY2huaWNhbEZlZSIsIlJpZ2h0RGVmaW5pdGlvbnMiLCJudW1iZXJGaWVsZCIsInRleHRGaWVsZCIsImxhbmd1YWdlIiwibGFuZ3VhZ2VzIiwibnVtYmVyRmllbGRWYWx1ZSIsIlJvdW5kIiwic2VsZWN0QWxsIiwidG9nZ2xlTWF0Y2hlcyIsInNob3dNYXRjaGVzIiwibWF0Y2hlcyIsImdldCIsImdldFNlbGVjdGVkIiwiQXJyYXkiLCJmcm9tIiwibSIsInJvdW5kIiwic2NoZWR1bGUiLCJNYXAiLCJpc05hTiIsInNpemUiLCJpdGVtIiwiRGVzY3JpcHRpb24iLCJvbkJsdXIiLCJUaXRsZUJhciIsInRpdGxlIiwic3VidGl0bGUiLCJOZXdDYXRlZ29yeSIsInNob3dDbG9zZSIsIk5ld1RvdXJuYW1lbnQiLCJTY2hlZHVsZXMiLCJzY2hlZHVsZXMiLCJrZXlzIiwibnVtYmVyIiwiU3BvcnRTZWxlY3RvciIsImlzQ3VzdG9tIiwicmVtb3ZlIiwic2hvd0FkZE5ldyIsImFkZFNwb3J0U2VsZWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNB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Q0EsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7Ozs7QUFVQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLDBKQUEwSjtBQUMvSjtBQUNBO0FBQ0E7QUFDQSxLQUFLLG1GQUFtRjtBQUN4RjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxvQkFBb0I7QUFDL0IsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixvQkFBb0I7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDOztBQUVBO0FBQ0EsbUJBQW1CLDhDQUE4QztBQUNqRTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQixFQUFFO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNB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Q0FBeUMsMkNBQTJDOztBQUVwRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQSxNQUFNLGdDQUFnQztBQUN0QztBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLG9CQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLE1BQU0sd0VBQXdFO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7OztBQUdBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDhHQUE4Ryx5QkFBeUI7QUFDdkk7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QUFBLGtJQUNUQSxLQURTOztBQUVmLGNBQUtJLEtBQUwsR0FBYSxFQUFiO0FBRmU7QUFJbEI7O0FBTEw7QUFBQTtBQUFBLGlDQU9ZO0FBQ0osbUJBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLHNCQUFLLFdBQVUsWUFBZjtBQUNJO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBREo7QUFHUSxxQkFBQyxLQUFLSixLQUFMLENBQVdpTSxRQUFaLElBQ0EsdUVBQU8sTUFBSyxNQUFaO0FBQ08sK0JBQU8sS0FBS2pNLEtBQUwsQ0FBV2UsS0FEekI7QUFFTyxrQ0FBVSxJQUZqQjtBQUdPLGlDQUFTLEtBQUtmLEtBQUwsQ0FBV1UsT0FIM0I7QUFJTyxxQ0FBYSxPQUpwQixHQUpSO0FBWVEseUJBQUtWLEtBQUwsQ0FBV2lNLFFBQVgsSUFDQTtBQUNJLG1DQUFVLFdBRGQ7QUFFSSw4QkFBSyxNQUZUO0FBR0kscUNBQVksYUFIaEIsR0FiUjtBQW1CTSxxQkFBRSxLQUFLak0sS0FBTCxDQUFXaU0sUUFBWCxJQUF1QixLQUFLak0sS0FBTCxDQUFXMEwsU0FBcEMsS0FDRTtBQUFBO0FBQUEsMEJBQVEsV0FBVSxpQkFBbEIsRUFBb0MsU0FBUyxLQUFLMUwsS0FBTCxDQUFXa00sTUFBeEQ7QUFDSSwyRkFBRyxXQUFVLGFBQWI7QUFESjtBQXBCUixpQkFESjtBQTBCSyxxQkFBS2xNLEtBQUwsQ0FBV21NLFVBQVgsSUFDRDtBQUFBO0FBQUEsc0JBQVEsT0FBTyxFQUFDdkssY0FBYyxNQUFmLEVBQWYsRUFBdUMsV0FBVyxhQUFsRCxFQUFpRSxTQUFTLEtBQUs1QixLQUFMLENBQVdvTSxnQkFBckY7QUFBQTtBQUFBO0FBM0JKLGFBREo7QUErQkg7QUF2Q0w7O0FBQUE7QUFBQSxFQUFtQyw2Q0FBQTlMLENBQU1DLFNBQXpDLEU7Ozs7Ozs7Ozs7OztBQ3BEQSx5QyIsImZpbGUiOiJidXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9wcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBfcHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BUeXBlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgc2l6ZXJTdHlsZSA9IHtcblx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdHRvcDogMCxcblx0bGVmdDogMCxcblx0dmlzaWJpbGl0eTogJ2hpZGRlbicsXG5cdGhlaWdodDogMCxcblx0b3ZlcmZsb3c6ICdzY3JvbGwnLFxuXHR3aGl0ZVNwYWNlOiAncHJlJ1xufTtcblxudmFyIElOUFVUX1BST1BTX0JMQUNLTElTVCA9IFsnZXh0cmFXaWR0aCcsICdpbmplY3RTdHlsZXMnLCAnaW5wdXRDbGFzc05hbWUnLCAnaW5wdXRSZWYnLCAnaW5wdXRTdHlsZScsICdtaW5XaWR0aCcsICdvbkF1dG9zaXplJywgJ3BsYWNlaG9sZGVySXNNaW5XaWR0aCddO1xuXG52YXIgY2xlYW5JbnB1dFByb3BzID0gZnVuY3Rpb24gY2xlYW5JbnB1dFByb3BzKGlucHV0UHJvcHMpIHtcblx0SU5QVVRfUFJPUFNfQkxBQ0tMSVNULmZvckVhY2goZnVuY3Rpb24gKGZpZWxkKSB7XG5cdFx0cmV0dXJuIGRlbGV0ZSBpbnB1dFByb3BzW2ZpZWxkXTtcblx0fSk7XG5cdHJldHVybiBpbnB1dFByb3BzO1xufTtcblxudmFyIGNvcHlTdHlsZXMgPSBmdW5jdGlvbiBjb3B5U3R5bGVzKHN0eWxlcywgbm9kZSkge1xuXHRub2RlLnN0eWxlLmZvbnRTaXplID0gc3R5bGVzLmZvbnRTaXplO1xuXHRub2RlLnN0eWxlLmZvbnRGYW1pbHkgPSBzdHlsZXMuZm9udEZhbWlseTtcblx0bm9kZS5zdHlsZS5mb250V2VpZ2h0ID0gc3R5bGVzLmZvbnRXZWlnaHQ7XG5cdG5vZGUuc3R5bGUuZm9udFN0eWxlID0gc3R5bGVzLmZvbnRTdHlsZTtcblx0bm9kZS5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gc3R5bGVzLmxldHRlclNwYWNpbmc7XG5cdG5vZGUuc3R5bGUudGV4dFRyYW5zZm9ybSA9IHN0eWxlcy50ZXh0VHJhbnNmb3JtO1xufTtcblxudmFyIGlzSUUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubmF2aWdhdG9yID8gL01TSUUgfFRyaWRlbnRcXC98RWRnZVxcLy8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgOiBmYWxzZTtcblxudmFyIGdlbmVyYXRlSWQgPSBmdW5jdGlvbiBnZW5lcmF0ZUlkKCkge1xuXHQvLyB3ZSBvbmx5IG5lZWQgYW4gYXV0by1nZW5lcmF0ZWQgSUQgZm9yIHN0eWxlc2hlZXQgaW5qZWN0aW9uLCB3aGljaCBpcyBvbmx5XG5cdC8vIHVzZWQgZm9yIElFLiBzbyBpZiB0aGUgYnJvd3NlciBpcyBub3QgSUUsIHRoaXMgc2hvdWxkIHJldHVybiB1bmRlZmluZWQuXG5cdHJldHVybiBpc0lFID8gJ18nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDEyKSA6IHVuZGVmaW5lZDtcbn07XG5cbnZhciBBdXRvc2l6ZUlucHV0ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcblx0X2luaGVyaXRzKEF1dG9zaXplSW5wdXQsIF9Db21wb25lbnQpO1xuXG5cdGZ1bmN0aW9uIEF1dG9zaXplSW5wdXQocHJvcHMpIHtcblx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXV0b3NpemVJbnB1dCk7XG5cblx0XHR2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQXV0b3NpemVJbnB1dC5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEF1dG9zaXplSW5wdXQpKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cblx0XHRfdGhpcy5pbnB1dFJlZiA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0X3RoaXMuaW5wdXQgPSBlbDtcblx0XHRcdGlmICh0eXBlb2YgX3RoaXMucHJvcHMuaW5wdXRSZWYgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0X3RoaXMucHJvcHMuaW5wdXRSZWYoZWwpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRfdGhpcy5wbGFjZUhvbGRlclNpemVyUmVmID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRfdGhpcy5wbGFjZUhvbGRlclNpemVyID0gZWw7XG5cdFx0fTtcblxuXHRcdF90aGlzLnNpemVyUmVmID0gZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHRfdGhpcy5zaXplciA9IGVsO1xuXHRcdH07XG5cblx0XHRfdGhpcy5zdGF0ZSA9IHtcblx0XHRcdGlucHV0V2lkdGg6IHByb3BzLm1pbldpZHRoLFxuXHRcdFx0aW5wdXRJZDogcHJvcHMuaWQgfHwgZ2VuZXJhdGVJZCgpXG5cdFx0fTtcblx0XHRyZXR1cm4gX3RoaXM7XG5cdH1cblxuXHRfY3JlYXRlQ2xhc3MoQXV0b3NpemVJbnB1dCwgW3tcblx0XHRrZXk6ICdjb21wb25lbnREaWRNb3VudCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdFx0dGhpcy5tb3VudGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuY29weUlucHV0U3R5bGVzKCk7XG5cdFx0XHR0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcblx0XHRcdHZhciBpZCA9IG5leHRQcm9wcy5pZDtcblxuXHRcdFx0aWYgKGlkICE9PSB0aGlzLnByb3BzLmlkKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoeyBpbnB1dElkOiBpZCB8fCBnZW5lcmF0ZUlkKCkgfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG5cdFx0XHRpZiAocHJldlN0YXRlLmlucHV0V2lkdGggIT09IHRoaXMuc3RhdGUuaW5wdXRXaWR0aCkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHRoaXMucHJvcHMub25BdXRvc2l6ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdHRoaXMucHJvcHMub25BdXRvc2l6ZSh0aGlzLnN0YXRlLmlucHV0V2lkdGgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdFx0dGhpcy5tb3VudGVkID0gZmFsc2U7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29weUlucHV0U3R5bGVzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29weUlucHV0U3R5bGVzKCkge1xuXHRcdFx0aWYgKCF0aGlzLm1vdW50ZWQgfHwgIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBpbnB1dFN0eWxlcyA9IHRoaXMuaW5wdXQgJiYgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5pbnB1dCk7XG5cdFx0XHRpZiAoIWlucHV0U3R5bGVzKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvcHlTdHlsZXMoaW5wdXRTdHlsZXMsIHRoaXMuc2l6ZXIpO1xuXHRcdFx0aWYgKHRoaXMucGxhY2VIb2xkZXJTaXplcikge1xuXHRcdFx0XHRjb3B5U3R5bGVzKGlucHV0U3R5bGVzLCB0aGlzLnBsYWNlSG9sZGVyU2l6ZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3VwZGF0ZUlucHV0V2lkdGgnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVJbnB1dFdpZHRoKCkge1xuXHRcdFx0aWYgKCF0aGlzLm1vdW50ZWQgfHwgIXRoaXMuc2l6ZXIgfHwgdHlwZW9mIHRoaXMuc2l6ZXIuc2Nyb2xsV2lkdGggPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHZhciBuZXdJbnB1dFdpZHRoID0gdm9pZCAwO1xuXHRcdFx0aWYgKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgJiYgKCF0aGlzLnByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMudmFsdWUgJiYgdGhpcy5wcm9wcy5wbGFjZWhvbGRlcklzTWluV2lkdGgpKSB7XG5cdFx0XHRcdG5ld0lucHV0V2lkdGggPSBNYXRoLm1heCh0aGlzLnNpemVyLnNjcm9sbFdpZHRoLCB0aGlzLnBsYWNlSG9sZGVyU2l6ZXIuc2Nyb2xsV2lkdGgpICsgMjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ld0lucHV0V2lkdGggPSB0aGlzLnNpemVyLnNjcm9sbFdpZHRoICsgMjtcblx0XHRcdH1cblx0XHRcdC8vIGFkZCBleHRyYVdpZHRoIHRvIHRoZSBkZXRlY3RlZCB3aWR0aC4gZm9yIG51bWJlciB0eXBlcywgdGhpcyBkZWZhdWx0cyB0byAxNiB0byBhbGxvdyBmb3IgdGhlIHN0ZXBwZXIgVUlcblx0XHRcdHZhciBleHRyYVdpZHRoID0gdGhpcy5wcm9wcy50eXBlID09PSAnbnVtYmVyJyAmJiB0aGlzLnByb3BzLmV4dHJhV2lkdGggPT09IHVuZGVmaW5lZCA/IDE2IDogcGFyc2VJbnQodGhpcy5wcm9wcy5leHRyYVdpZHRoKSB8fCAwO1xuXHRcdFx0bmV3SW5wdXRXaWR0aCArPSBleHRyYVdpZHRoO1xuXHRcdFx0aWYgKG5ld0lucHV0V2lkdGggPCB0aGlzLnByb3BzLm1pbldpZHRoKSB7XG5cdFx0XHRcdG5ld0lucHV0V2lkdGggPSB0aGlzLnByb3BzLm1pbldpZHRoO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG5ld0lucHV0V2lkdGggIT09IHRoaXMuc3RhdGUuaW5wdXRXaWR0aCkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpbnB1dFdpZHRoOiBuZXdJbnB1dFdpZHRoXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2dldElucHV0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5pbnB1dDtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1cycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzKCkge1xuXHRcdFx0dGhpcy5pbnB1dC5mb2N1cygpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2JsdXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBibHVyKCkge1xuXHRcdFx0dGhpcy5pbnB1dC5ibHVyKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnc2VsZWN0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gc2VsZWN0KCkge1xuXHRcdFx0dGhpcy5pbnB1dC5zZWxlY3QoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXJTdHlsZXMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJTdHlsZXMoKSB7XG5cdFx0XHQvLyB0aGlzIG1ldGhvZCBpbmplY3RzIHN0eWxlcyB0byBoaWRlIElFJ3MgY2xlYXIgaW5kaWNhdG9yLCB3aGljaCBtZXNzZXNcblx0XHRcdC8vIHdpdGggaW5wdXQgc2l6ZSBkZXRlY3Rpb24uIHRoZSBzdHlsZXNoZWV0IGlzIG9ubHkgaW5qZWN0ZWQgd2hlbiB0aGVcblx0XHRcdC8vIGJyb3dzZXIgaXMgSUUsIGFuZCBjYW4gYWxzbyBiZSBkaXNhYmxlZCBieSB0aGUgYGluamVjdFN0eWxlc2AgcHJvcC5cblx0XHRcdHZhciBpbmplY3RTdHlsZXMgPSB0aGlzLnByb3BzLmluamVjdFN0eWxlcztcblxuXHRcdFx0cmV0dXJuIGlzSUUgJiYgaW5qZWN0U3R5bGVzID8gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJywgeyBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xuXHRcdFx0XHRcdF9faHRtbDogJ2lucHV0IycgKyB0aGlzLnN0YXRlLmlucHV0SWQgKyAnOjotbXMtY2xlYXIge2Rpc3BsYXk6IG5vbmU7fSdcblx0XHRcdFx0fSB9KSA6IG51bGw7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdFx0dmFyIHNpemVyVmFsdWUgPSBbdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUsIHRoaXMucHJvcHMudmFsdWUsICcnXS5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuXHRcdFx0XHRpZiAocHJldmlvdXNWYWx1ZSAhPT0gbnVsbCAmJiBwcmV2aW91c1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcHJldmlvdXNWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gY3VycmVudFZhbHVlO1xuXHRcdFx0fSk7XG5cblx0XHRcdHZhciB3cmFwcGVyU3R5bGUgPSBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcy5zdHlsZSk7XG5cdFx0XHRpZiAoIXdyYXBwZXJTdHlsZS5kaXNwbGF5KSB3cmFwcGVyU3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuXG5cdFx0XHR2YXIgaW5wdXRTdHlsZSA9IF9leHRlbmRzKHtcblx0XHRcdFx0Ym94U2l6aW5nOiAnY29udGVudC1ib3gnLFxuXHRcdFx0XHR3aWR0aDogdGhpcy5zdGF0ZS5pbnB1dFdpZHRoICsgJ3B4J1xuXHRcdFx0fSwgdGhpcy5wcm9wcy5pbnB1dFN0eWxlKTtcblxuXHRcdFx0dmFyIGlucHV0UHJvcHMgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXModGhpcy5wcm9wcywgW10pO1xuXG5cdFx0XHRjbGVhbklucHV0UHJvcHMoaW5wdXRQcm9wcyk7XG5cdFx0XHRpbnB1dFByb3BzLmNsYXNzTmFtZSA9IHRoaXMucHJvcHMuaW5wdXRDbGFzc05hbWU7XG5cdFx0XHRpbnB1dFByb3BzLmlkID0gdGhpcy5zdGF0ZS5pbnB1dElkO1xuXHRcdFx0aW5wdXRQcm9wcy5zdHlsZSA9IGlucHV0U3R5bGU7XG5cblx0XHRcdHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSwgc3R5bGU6IHdyYXBwZXJTdHlsZSB9LFxuXHRcdFx0XHR0aGlzLnJlbmRlclN0eWxlcygpLFxuXHRcdFx0XHRfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBfZXh0ZW5kcyh7fSwgaW5wdXRQcm9wcywgeyByZWY6IHRoaXMuaW5wdXRSZWYgfSkpLFxuXHRcdFx0XHRfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0XHR7IHJlZjogdGhpcy5zaXplclJlZiwgc3R5bGU6IHNpemVyU3R5bGUgfSxcblx0XHRcdFx0XHRzaXplclZhbHVlXG5cdFx0XHRcdCksXG5cdFx0XHRcdHRoaXMucHJvcHMucGxhY2Vob2xkZXIgPyBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0XHR7IHJlZjogdGhpcy5wbGFjZUhvbGRlclNpemVyUmVmLCBzdHlsZTogc2l6ZXJTdHlsZSB9LFxuXHRcdFx0XHRcdHRoaXMucHJvcHMucGxhY2Vob2xkZXJcblx0XHRcdFx0KSA6IG51bGxcblx0XHRcdCk7XG5cdFx0fVxuXHR9XSk7XG5cblx0cmV0dXJuIEF1dG9zaXplSW5wdXQ7XG59KF9yZWFjdC5Db21wb25lbnQpO1xuXG5BdXRvc2l6ZUlucHV0LnByb3BUeXBlcyA9IHtcblx0Y2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgLy8gY2xhc3NOYW1lIGZvciB0aGUgb3V0ZXIgZWxlbWVudFxuXHRkZWZhdWx0VmFsdWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYW55LCAvLyBkZWZhdWx0IGZpZWxkIHZhbHVlXG5cdGV4dHJhV2lkdGg6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFsvLyBhZGRpdGlvbmFsIHdpZHRoIGZvciBpbnB1dCBlbGVtZW50XG5cdF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLCBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZ10pLFxuXHRpZDogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIC8vIGlkIHRvIHVzZSBmb3IgdGhlIGlucHV0LCBjYW4gYmUgc2V0IGZvciBjb25zaXN0ZW50IHNuYXBzaG90c1xuXHRpbmplY3RTdHlsZXM6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCwgLy8gaW5qZWN0IHRoZSBjdXN0b20gc3R5bGVzaGVldCB0byBoaWRlIGNsZWFyIFVJLCBkZWZhdWx0cyB0byB0cnVlXG5cdGlucHV0Q2xhc3NOYW1lOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgLy8gY2xhc3NOYW1lIGZvciB0aGUgaW5wdXQgZWxlbWVudFxuXHRpbnB1dFJlZjogX3Byb3BUeXBlczIuZGVmYXVsdC5mdW5jLCAvLyByZWYgY2FsbGJhY2sgZm9yIHRoZSBpbnB1dCBlbGVtZW50XG5cdGlucHV0U3R5bGU6IF9wcm9wVHlwZXMyLmRlZmF1bHQub2JqZWN0LCAvLyBjc3Mgc3R5bGVzIGZvciB0aGUgaW5wdXQgZWxlbWVudFxuXHRtaW5XaWR0aDogX3Byb3BUeXBlczIuZGVmYXVsdC5vbmVPZlR5cGUoWy8vIG1pbmltdW0gd2lkdGggZm9yIGlucHV0IGVsZW1lbnRcblx0X3Byb3BUeXBlczIuZGVmYXVsdC5udW1iZXIsIF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nXSksXG5cdG9uQXV0b3NpemU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYywgLy8gb25BdXRvc2l6ZSBoYW5kbGVyOiBmdW5jdGlvbihuZXdXaWR0aCkge31cblx0b25DaGFuZ2U6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYywgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24oZXZlbnQpIHt9XG5cdHBsYWNlaG9sZGVyOiBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZywgLy8gcGxhY2Vob2xkZXIgdGV4dFxuXHRwbGFjZWhvbGRlcklzTWluV2lkdGg6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYm9vbCwgLy8gZG9uJ3QgY29sbGFwc2Ugc2l6ZSB0byBsZXNzIHRoYW4gdGhlIHBsYWNlaG9sZGVyXG5cdHN0eWxlOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdCwgLy8gY3NzIHN0eWxlcyBmb3IgdGhlIG91dGVyIGVsZW1lbnRcblx0dmFsdWU6IF9wcm9wVHlwZXMyLmRlZmF1bHQuYW55IC8vIGZpZWxkIHZhbHVlXG59O1xuQXV0b3NpemVJbnB1dC5kZWZhdWx0UHJvcHMgPSB7XG5cdG1pbldpZHRoOiAxLFxuXHRpbmplY3RTdHlsZXM6IHRydWVcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEF1dG9zaXplSW5wdXQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtaW5wdXQtYXV0b3NpemUvbGliL0F1dG9zaXplSW5wdXQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LWlucHV0LWF1dG9zaXplL2xpYi9BdXRvc2l6ZUlucHV0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIiwiaW1wb3J0IEF1dG9zaXplSW5wdXQgZnJvbSAncmVhY3QtaW5wdXQtYXV0b3NpemUnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcblxudmFyIGFycm93UmVuZGVyZXIgPSBmdW5jdGlvbiBhcnJvd1JlbmRlcmVyKF9yZWYpIHtcblx0dmFyIG9uTW91c2VEb3duID0gX3JlZi5vbk1vdXNlRG93bjtcblxuXHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcblx0XHRjbGFzc05hbWU6ICdTZWxlY3QtYXJyb3cnLFxuXHRcdG9uTW91c2VEb3duOiBvbk1vdXNlRG93blxuXHR9KTtcbn07XG5cbmFycm93UmVuZGVyZXIucHJvcFR5cGVzID0ge1xuXHRvbk1vdXNlRG93bjogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbnZhciBjbGVhclJlbmRlcmVyID0gZnVuY3Rpb24gY2xlYXJSZW5kZXJlcigpIHtcblx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XG5cdFx0Y2xhc3NOYW1lOiAnU2VsZWN0LWNsZWFyJyxcblx0XHRkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6ICcmdGltZXM7JyB9XG5cdH0pO1xufTtcblxudmFyIG1hcCA9IFt7ICdiYXNlJzogJ0EnLCAnbGV0dGVycyc6IC9bXFx1MDA0MVxcdTI0QjZcXHVGRjIxXFx1MDBDMFxcdTAwQzFcXHUwMEMyXFx1MUVBNlxcdTFFQTRcXHUxRUFBXFx1MUVBOFxcdTAwQzNcXHUwMTAwXFx1MDEwMlxcdTFFQjBcXHUxRUFFXFx1MUVCNFxcdTFFQjJcXHUwMjI2XFx1MDFFMFxcdTAwQzRcXHUwMURFXFx1MUVBMlxcdTAwQzVcXHUwMUZBXFx1MDFDRFxcdTAyMDBcXHUwMjAyXFx1MUVBMFxcdTFFQUNcXHUxRUI2XFx1MUUwMFxcdTAxMDRcXHUwMjNBXFx1MkM2Rl0vZyB9LCB7ICdiYXNlJzogJ0FBJywgJ2xldHRlcnMnOiAvW1xcdUE3MzJdL2cgfSwgeyAnYmFzZSc6ICdBRScsICdsZXR0ZXJzJzogL1tcXHUwMEM2XFx1MDFGQ1xcdTAxRTJdL2cgfSwgeyAnYmFzZSc6ICdBTycsICdsZXR0ZXJzJzogL1tcXHVBNzM0XS9nIH0sIHsgJ2Jhc2UnOiAnQVUnLCAnbGV0dGVycyc6IC9bXFx1QTczNl0vZyB9LCB7ICdiYXNlJzogJ0FWJywgJ2xldHRlcnMnOiAvW1xcdUE3MzhcXHVBNzNBXS9nIH0sIHsgJ2Jhc2UnOiAnQVknLCAnbGV0dGVycyc6IC9bXFx1QTczQ10vZyB9LCB7ICdiYXNlJzogJ0InLCAnbGV0dGVycyc6IC9bXFx1MDA0MlxcdTI0QjdcXHVGRjIyXFx1MUUwMlxcdTFFMDRcXHUxRTA2XFx1MDI0M1xcdTAxODJcXHUwMTgxXS9nIH0sIHsgJ2Jhc2UnOiAnQycsICdsZXR0ZXJzJzogL1tcXHUwMDQzXFx1MjRCOFxcdUZGMjNcXHUwMTA2XFx1MDEwOFxcdTAxMEFcXHUwMTBDXFx1MDBDN1xcdTFFMDhcXHUwMTg3XFx1MDIzQlxcdUE3M0VdL2cgfSwgeyAnYmFzZSc6ICdEJywgJ2xldHRlcnMnOiAvW1xcdTAwNDRcXHUyNEI5XFx1RkYyNFxcdTFFMEFcXHUwMTBFXFx1MUUwQ1xcdTFFMTBcXHUxRTEyXFx1MUUwRVxcdTAxMTBcXHUwMThCXFx1MDE4QVxcdTAxODlcXHVBNzc5XS9nIH0sIHsgJ2Jhc2UnOiAnRFonLCAnbGV0dGVycyc6IC9bXFx1MDFGMVxcdTAxQzRdL2cgfSwgeyAnYmFzZSc6ICdEeicsICdsZXR0ZXJzJzogL1tcXHUwMUYyXFx1MDFDNV0vZyB9LCB7ICdiYXNlJzogJ0UnLCAnbGV0dGVycyc6IC9bXFx1MDA0NVxcdTI0QkFcXHVGRjI1XFx1MDBDOFxcdTAwQzlcXHUwMENBXFx1MUVDMFxcdTFFQkVcXHUxRUM0XFx1MUVDMlxcdTFFQkNcXHUwMTEyXFx1MUUxNFxcdTFFMTZcXHUwMTE0XFx1MDExNlxcdTAwQ0JcXHUxRUJBXFx1MDExQVxcdTAyMDRcXHUwMjA2XFx1MUVCOFxcdTFFQzZcXHUwMjI4XFx1MUUxQ1xcdTAxMThcXHUxRTE4XFx1MUUxQVxcdTAxOTBcXHUwMThFXS9nIH0sIHsgJ2Jhc2UnOiAnRicsICdsZXR0ZXJzJzogL1tcXHUwMDQ2XFx1MjRCQlxcdUZGMjZcXHUxRTFFXFx1MDE5MVxcdUE3N0JdL2cgfSwgeyAnYmFzZSc6ICdHJywgJ2xldHRlcnMnOiAvW1xcdTAwNDdcXHUyNEJDXFx1RkYyN1xcdTAxRjRcXHUwMTFDXFx1MUUyMFxcdTAxMUVcXHUwMTIwXFx1MDFFNlxcdTAxMjJcXHUwMUU0XFx1MDE5M1xcdUE3QTBcXHVBNzdEXFx1QTc3RV0vZyB9LCB7ICdiYXNlJzogJ0gnLCAnbGV0dGVycyc6IC9bXFx1MDA0OFxcdTI0QkRcXHVGRjI4XFx1MDEyNFxcdTFFMjJcXHUxRTI2XFx1MDIxRVxcdTFFMjRcXHUxRTI4XFx1MUUyQVxcdTAxMjZcXHUyQzY3XFx1MkM3NVxcdUE3OERdL2cgfSwgeyAnYmFzZSc6ICdJJywgJ2xldHRlcnMnOiAvW1xcdTAwNDlcXHUyNEJFXFx1RkYyOVxcdTAwQ0NcXHUwMENEXFx1MDBDRVxcdTAxMjhcXHUwMTJBXFx1MDEyQ1xcdTAxMzBcXHUwMENGXFx1MUUyRVxcdTFFQzhcXHUwMUNGXFx1MDIwOFxcdTAyMEFcXHUxRUNBXFx1MDEyRVxcdTFFMkNcXHUwMTk3XS9nIH0sIHsgJ2Jhc2UnOiAnSicsICdsZXR0ZXJzJzogL1tcXHUwMDRBXFx1MjRCRlxcdUZGMkFcXHUwMTM0XFx1MDI0OF0vZyB9LCB7ICdiYXNlJzogJ0snLCAnbGV0dGVycyc6IC9bXFx1MDA0QlxcdTI0QzBcXHVGRjJCXFx1MUUzMFxcdTAxRThcXHUxRTMyXFx1MDEzNlxcdTFFMzRcXHUwMTk4XFx1MkM2OVxcdUE3NDBcXHVBNzQyXFx1QTc0NFxcdUE3QTJdL2cgfSwgeyAnYmFzZSc6ICdMJywgJ2xldHRlcnMnOiAvW1xcdTAwNENcXHUyNEMxXFx1RkYyQ1xcdTAxM0ZcXHUwMTM5XFx1MDEzRFxcdTFFMzZcXHUxRTM4XFx1MDEzQlxcdTFFM0NcXHUxRTNBXFx1MDE0MVxcdTAyM0RcXHUyQzYyXFx1MkM2MFxcdUE3NDhcXHVBNzQ2XFx1QTc4MF0vZyB9LCB7ICdiYXNlJzogJ0xKJywgJ2xldHRlcnMnOiAvW1xcdTAxQzddL2cgfSwgeyAnYmFzZSc6ICdMaicsICdsZXR0ZXJzJzogL1tcXHUwMUM4XS9nIH0sIHsgJ2Jhc2UnOiAnTScsICdsZXR0ZXJzJzogL1tcXHUwMDREXFx1MjRDMlxcdUZGMkRcXHUxRTNFXFx1MUU0MFxcdTFFNDJcXHUyQzZFXFx1MDE5Q10vZyB9LCB7ICdiYXNlJzogJ04nLCAnbGV0dGVycyc6IC9bXFx1MDA0RVxcdTI0QzNcXHVGRjJFXFx1MDFGOFxcdTAxNDNcXHUwMEQxXFx1MUU0NFxcdTAxNDdcXHUxRTQ2XFx1MDE0NVxcdTFFNEFcXHUxRTQ4XFx1MDIyMFxcdTAxOURcXHVBNzkwXFx1QTdBNF0vZyB9LCB7ICdiYXNlJzogJ05KJywgJ2xldHRlcnMnOiAvW1xcdTAxQ0FdL2cgfSwgeyAnYmFzZSc6ICdOaicsICdsZXR0ZXJzJzogL1tcXHUwMUNCXS9nIH0sIHsgJ2Jhc2UnOiAnTycsICdsZXR0ZXJzJzogL1tcXHUwMDRGXFx1MjRDNFxcdUZGMkZcXHUwMEQyXFx1MDBEM1xcdTAwRDRcXHUxRUQyXFx1MUVEMFxcdTFFRDZcXHUxRUQ0XFx1MDBENVxcdTFFNENcXHUwMjJDXFx1MUU0RVxcdTAxNENcXHUxRTUwXFx1MUU1MlxcdTAxNEVcXHUwMjJFXFx1MDIzMFxcdTAwRDZcXHUwMjJBXFx1MUVDRVxcdTAxNTBcXHUwMUQxXFx1MDIwQ1xcdTAyMEVcXHUwMUEwXFx1MUVEQ1xcdTFFREFcXHUxRUUwXFx1MUVERVxcdTFFRTJcXHUxRUNDXFx1MUVEOFxcdTAxRUFcXHUwMUVDXFx1MDBEOFxcdTAxRkVcXHUwMTg2XFx1MDE5RlxcdUE3NEFcXHVBNzRDXS9nIH0sIHsgJ2Jhc2UnOiAnT0knLCAnbGV0dGVycyc6IC9bXFx1MDFBMl0vZyB9LCB7ICdiYXNlJzogJ09PJywgJ2xldHRlcnMnOiAvW1xcdUE3NEVdL2cgfSwgeyAnYmFzZSc6ICdPVScsICdsZXR0ZXJzJzogL1tcXHUwMjIyXS9nIH0sIHsgJ2Jhc2UnOiAnUCcsICdsZXR0ZXJzJzogL1tcXHUwMDUwXFx1MjRDNVxcdUZGMzBcXHUxRTU0XFx1MUU1NlxcdTAxQTRcXHUyQzYzXFx1QTc1MFxcdUE3NTJcXHVBNzU0XS9nIH0sIHsgJ2Jhc2UnOiAnUScsICdsZXR0ZXJzJzogL1tcXHUwMDUxXFx1MjRDNlxcdUZGMzFcXHVBNzU2XFx1QTc1OFxcdTAyNEFdL2cgfSwgeyAnYmFzZSc6ICdSJywgJ2xldHRlcnMnOiAvW1xcdTAwNTJcXHUyNEM3XFx1RkYzMlxcdTAxNTRcXHUxRTU4XFx1MDE1OFxcdTAyMTBcXHUwMjEyXFx1MUU1QVxcdTFFNUNcXHUwMTU2XFx1MUU1RVxcdTAyNENcXHUyQzY0XFx1QTc1QVxcdUE3QTZcXHVBNzgyXS9nIH0sIHsgJ2Jhc2UnOiAnUycsICdsZXR0ZXJzJzogL1tcXHUwMDUzXFx1MjRDOFxcdUZGMzNcXHUxRTlFXFx1MDE1QVxcdTFFNjRcXHUwMTVDXFx1MUU2MFxcdTAxNjBcXHUxRTY2XFx1MUU2MlxcdTFFNjhcXHUwMjE4XFx1MDE1RVxcdTJDN0VcXHVBN0E4XFx1QTc4NF0vZyB9LCB7ICdiYXNlJzogJ1QnLCAnbGV0dGVycyc6IC9bXFx1MDA1NFxcdTI0QzlcXHVGRjM0XFx1MUU2QVxcdTAxNjRcXHUxRTZDXFx1MDIxQVxcdTAxNjJcXHUxRTcwXFx1MUU2RVxcdTAxNjZcXHUwMUFDXFx1MDFBRVxcdTAyM0VcXHVBNzg2XS9nIH0sIHsgJ2Jhc2UnOiAnVFonLCAnbGV0dGVycyc6IC9bXFx1QTcyOF0vZyB9LCB7ICdiYXNlJzogJ1UnLCAnbGV0dGVycyc6IC9bXFx1MDA1NVxcdTI0Q0FcXHVGRjM1XFx1MDBEOVxcdTAwREFcXHUwMERCXFx1MDE2OFxcdTFFNzhcXHUwMTZBXFx1MUU3QVxcdTAxNkNcXHUwMERDXFx1MDFEQlxcdTAxRDdcXHUwMUQ1XFx1MDFEOVxcdTFFRTZcXHUwMTZFXFx1MDE3MFxcdTAxRDNcXHUwMjE0XFx1MDIxNlxcdTAxQUZcXHUxRUVBXFx1MUVFOFxcdTFFRUVcXHUxRUVDXFx1MUVGMFxcdTFFRTRcXHUxRTcyXFx1MDE3MlxcdTFFNzZcXHUxRTc0XFx1MDI0NF0vZyB9LCB7ICdiYXNlJzogJ1YnLCAnbGV0dGVycyc6IC9bXFx1MDA1NlxcdTI0Q0JcXHVGRjM2XFx1MUU3Q1xcdTFFN0VcXHUwMUIyXFx1QTc1RVxcdTAyNDVdL2cgfSwgeyAnYmFzZSc6ICdWWScsICdsZXR0ZXJzJzogL1tcXHVBNzYwXS9nIH0sIHsgJ2Jhc2UnOiAnVycsICdsZXR0ZXJzJzogL1tcXHUwMDU3XFx1MjRDQ1xcdUZGMzdcXHUxRTgwXFx1MUU4MlxcdTAxNzRcXHUxRTg2XFx1MUU4NFxcdTFFODhcXHUyQzcyXS9nIH0sIHsgJ2Jhc2UnOiAnWCcsICdsZXR0ZXJzJzogL1tcXHUwMDU4XFx1MjRDRFxcdUZGMzhcXHUxRThBXFx1MUU4Q10vZyB9LCB7ICdiYXNlJzogJ1knLCAnbGV0dGVycyc6IC9bXFx1MDA1OVxcdTI0Q0VcXHVGRjM5XFx1MUVGMlxcdTAwRERcXHUwMTc2XFx1MUVGOFxcdTAyMzJcXHUxRThFXFx1MDE3OFxcdTFFRjZcXHUxRUY0XFx1MDFCM1xcdTAyNEVcXHUxRUZFXS9nIH0sIHsgJ2Jhc2UnOiAnWicsICdsZXR0ZXJzJzogL1tcXHUwMDVBXFx1MjRDRlxcdUZGM0FcXHUwMTc5XFx1MUU5MFxcdTAxN0JcXHUwMTdEXFx1MUU5MlxcdTFFOTRcXHUwMUI1XFx1MDIyNFxcdTJDN0ZcXHUyQzZCXFx1QTc2Ml0vZyB9LCB7ICdiYXNlJzogJ2EnLCAnbGV0dGVycyc6IC9bXFx1MDA2MVxcdTI0RDBcXHVGRjQxXFx1MUU5QVxcdTAwRTBcXHUwMEUxXFx1MDBFMlxcdTFFQTdcXHUxRUE1XFx1MUVBQlxcdTFFQTlcXHUwMEUzXFx1MDEwMVxcdTAxMDNcXHUxRUIxXFx1MUVBRlxcdTFFQjVcXHUxRUIzXFx1MDIyN1xcdTAxRTFcXHUwMEU0XFx1MDFERlxcdTFFQTNcXHUwMEU1XFx1MDFGQlxcdTAxQ0VcXHUwMjAxXFx1MDIwM1xcdTFFQTFcXHUxRUFEXFx1MUVCN1xcdTFFMDFcXHUwMTA1XFx1MkM2NVxcdTAyNTBdL2cgfSwgeyAnYmFzZSc6ICdhYScsICdsZXR0ZXJzJzogL1tcXHVBNzMzXS9nIH0sIHsgJ2Jhc2UnOiAnYWUnLCAnbGV0dGVycyc6IC9bXFx1MDBFNlxcdTAxRkRcXHUwMUUzXS9nIH0sIHsgJ2Jhc2UnOiAnYW8nLCAnbGV0dGVycyc6IC9bXFx1QTczNV0vZyB9LCB7ICdiYXNlJzogJ2F1JywgJ2xldHRlcnMnOiAvW1xcdUE3MzddL2cgfSwgeyAnYmFzZSc6ICdhdicsICdsZXR0ZXJzJzogL1tcXHVBNzM5XFx1QTczQl0vZyB9LCB7ICdiYXNlJzogJ2F5JywgJ2xldHRlcnMnOiAvW1xcdUE3M0RdL2cgfSwgeyAnYmFzZSc6ICdiJywgJ2xldHRlcnMnOiAvW1xcdTAwNjJcXHUyNEQxXFx1RkY0MlxcdTFFMDNcXHUxRTA1XFx1MUUwN1xcdTAxODBcXHUwMTgzXFx1MDI1M10vZyB9LCB7ICdiYXNlJzogJ2MnLCAnbGV0dGVycyc6IC9bXFx1MDA2M1xcdTI0RDJcXHVGRjQzXFx1MDEwN1xcdTAxMDlcXHUwMTBCXFx1MDEwRFxcdTAwRTdcXHUxRTA5XFx1MDE4OFxcdTAyM0NcXHVBNzNGXFx1MjE4NF0vZyB9LCB7ICdiYXNlJzogJ2QnLCAnbGV0dGVycyc6IC9bXFx1MDA2NFxcdTI0RDNcXHVGRjQ0XFx1MUUwQlxcdTAxMEZcXHUxRTBEXFx1MUUxMVxcdTFFMTNcXHUxRTBGXFx1MDExMVxcdTAxOENcXHUwMjU2XFx1MDI1N1xcdUE3N0FdL2cgfSwgeyAnYmFzZSc6ICdkeicsICdsZXR0ZXJzJzogL1tcXHUwMUYzXFx1MDFDNl0vZyB9LCB7ICdiYXNlJzogJ2UnLCAnbGV0dGVycyc6IC9bXFx1MDA2NVxcdTI0RDRcXHVGRjQ1XFx1MDBFOFxcdTAwRTlcXHUwMEVBXFx1MUVDMVxcdTFFQkZcXHUxRUM1XFx1MUVDM1xcdTFFQkRcXHUwMTEzXFx1MUUxNVxcdTFFMTdcXHUwMTE1XFx1MDExN1xcdTAwRUJcXHUxRUJCXFx1MDExQlxcdTAyMDVcXHUwMjA3XFx1MUVCOVxcdTFFQzdcXHUwMjI5XFx1MUUxRFxcdTAxMTlcXHUxRTE5XFx1MUUxQlxcdTAyNDdcXHUwMjVCXFx1MDFERF0vZyB9LCB7ICdiYXNlJzogJ2YnLCAnbGV0dGVycyc6IC9bXFx1MDA2NlxcdTI0RDVcXHVGRjQ2XFx1MUUxRlxcdTAxOTJcXHVBNzdDXS9nIH0sIHsgJ2Jhc2UnOiAnZycsICdsZXR0ZXJzJzogL1tcXHUwMDY3XFx1MjRENlxcdUZGNDdcXHUwMUY1XFx1MDExRFxcdTFFMjFcXHUwMTFGXFx1MDEyMVxcdTAxRTdcXHUwMTIzXFx1MDFFNVxcdTAyNjBcXHVBN0ExXFx1MUQ3OVxcdUE3N0ZdL2cgfSwgeyAnYmFzZSc6ICdoJywgJ2xldHRlcnMnOiAvW1xcdTAwNjhcXHUyNEQ3XFx1RkY0OFxcdTAxMjVcXHUxRTIzXFx1MUUyN1xcdTAyMUZcXHUxRTI1XFx1MUUyOVxcdTFFMkJcXHUxRTk2XFx1MDEyN1xcdTJDNjhcXHUyQzc2XFx1MDI2NV0vZyB9LCB7ICdiYXNlJzogJ2h2JywgJ2xldHRlcnMnOiAvW1xcdTAxOTVdL2cgfSwgeyAnYmFzZSc6ICdpJywgJ2xldHRlcnMnOiAvW1xcdTAwNjlcXHUyNEQ4XFx1RkY0OVxcdTAwRUNcXHUwMEVEXFx1MDBFRVxcdTAxMjlcXHUwMTJCXFx1MDEyRFxcdTAwRUZcXHUxRTJGXFx1MUVDOVxcdTAxRDBcXHUwMjA5XFx1MDIwQlxcdTFFQ0JcXHUwMTJGXFx1MUUyRFxcdTAyNjhcXHUwMTMxXS9nIH0sIHsgJ2Jhc2UnOiAnaicsICdsZXR0ZXJzJzogL1tcXHUwMDZBXFx1MjREOVxcdUZGNEFcXHUwMTM1XFx1MDFGMFxcdTAyNDldL2cgfSwgeyAnYmFzZSc6ICdrJywgJ2xldHRlcnMnOiAvW1xcdTAwNkJcXHUyNERBXFx1RkY0QlxcdTFFMzFcXHUwMUU5XFx1MUUzM1xcdTAxMzdcXHUxRTM1XFx1MDE5OVxcdTJDNkFcXHVBNzQxXFx1QTc0M1xcdUE3NDVcXHVBN0EzXS9nIH0sIHsgJ2Jhc2UnOiAnbCcsICdsZXR0ZXJzJzogL1tcXHUwMDZDXFx1MjREQlxcdUZGNENcXHUwMTQwXFx1MDEzQVxcdTAxM0VcXHUxRTM3XFx1MUUzOVxcdTAxM0NcXHUxRTNEXFx1MUUzQlxcdTAxN0ZcXHUwMTQyXFx1MDE5QVxcdTAyNkJcXHUyQzYxXFx1QTc0OVxcdUE3ODFcXHVBNzQ3XS9nIH0sIHsgJ2Jhc2UnOiAnbGonLCAnbGV0dGVycyc6IC9bXFx1MDFDOV0vZyB9LCB7ICdiYXNlJzogJ20nLCAnbGV0dGVycyc6IC9bXFx1MDA2RFxcdTI0RENcXHVGRjREXFx1MUUzRlxcdTFFNDFcXHUxRTQzXFx1MDI3MVxcdTAyNkZdL2cgfSwgeyAnYmFzZSc6ICduJywgJ2xldHRlcnMnOiAvW1xcdTAwNkVcXHUyNEREXFx1RkY0RVxcdTAxRjlcXHUwMTQ0XFx1MDBGMVxcdTFFNDVcXHUwMTQ4XFx1MUU0N1xcdTAxNDZcXHUxRTRCXFx1MUU0OVxcdTAxOUVcXHUwMjcyXFx1MDE0OVxcdUE3OTFcXHVBN0E1XS9nIH0sIHsgJ2Jhc2UnOiAnbmonLCAnbGV0dGVycyc6IC9bXFx1MDFDQ10vZyB9LCB7ICdiYXNlJzogJ28nLCAnbGV0dGVycyc6IC9bXFx1MDA2RlxcdTI0REVcXHVGRjRGXFx1MDBGMlxcdTAwRjNcXHUwMEY0XFx1MUVEM1xcdTFFRDFcXHUxRUQ3XFx1MUVENVxcdTAwRjVcXHUxRTREXFx1MDIyRFxcdTFFNEZcXHUwMTREXFx1MUU1MVxcdTFFNTNcXHUwMTRGXFx1MDIyRlxcdTAyMzFcXHUwMEY2XFx1MDIyQlxcdTFFQ0ZcXHUwMTUxXFx1MDFEMlxcdTAyMERcXHUwMjBGXFx1MDFBMVxcdTFFRERcXHUxRURCXFx1MUVFMVxcdTFFREZcXHUxRUUzXFx1MUVDRFxcdTFFRDlcXHUwMUVCXFx1MDFFRFxcdTAwRjhcXHUwMUZGXFx1MDI1NFxcdUE3NEJcXHVBNzREXFx1MDI3NV0vZyB9LCB7ICdiYXNlJzogJ29pJywgJ2xldHRlcnMnOiAvW1xcdTAxQTNdL2cgfSwgeyAnYmFzZSc6ICdvdScsICdsZXR0ZXJzJzogL1tcXHUwMjIzXS9nIH0sIHsgJ2Jhc2UnOiAnb28nLCAnbGV0dGVycyc6IC9bXFx1QTc0Rl0vZyB9LCB7ICdiYXNlJzogJ3AnLCAnbGV0dGVycyc6IC9bXFx1MDA3MFxcdTI0REZcXHVGRjUwXFx1MUU1NVxcdTFFNTdcXHUwMUE1XFx1MUQ3RFxcdUE3NTFcXHVBNzUzXFx1QTc1NV0vZyB9LCB7ICdiYXNlJzogJ3EnLCAnbGV0dGVycyc6IC9bXFx1MDA3MVxcdTI0RTBcXHVGRjUxXFx1MDI0QlxcdUE3NTdcXHVBNzU5XS9nIH0sIHsgJ2Jhc2UnOiAncicsICdsZXR0ZXJzJzogL1tcXHUwMDcyXFx1MjRFMVxcdUZGNTJcXHUwMTU1XFx1MUU1OVxcdTAxNTlcXHUwMjExXFx1MDIxM1xcdTFFNUJcXHUxRTVEXFx1MDE1N1xcdTFFNUZcXHUwMjREXFx1MDI3RFxcdUE3NUJcXHVBN0E3XFx1QTc4M10vZyB9LCB7ICdiYXNlJzogJ3MnLCAnbGV0dGVycyc6IC9bXFx1MDA3M1xcdTI0RTJcXHVGRjUzXFx1MDBERlxcdTAxNUJcXHUxRTY1XFx1MDE1RFxcdTFFNjFcXHUwMTYxXFx1MUU2N1xcdTFFNjNcXHUxRTY5XFx1MDIxOVxcdTAxNUZcXHUwMjNGXFx1QTdBOVxcdUE3ODVcXHUxRTlCXS9nIH0sIHsgJ2Jhc2UnOiAndCcsICdsZXR0ZXJzJzogL1tcXHUwMDc0XFx1MjRFM1xcdUZGNTRcXHUxRTZCXFx1MUU5N1xcdTAxNjVcXHUxRTZEXFx1MDIxQlxcdTAxNjNcXHUxRTcxXFx1MUU2RlxcdTAxNjdcXHUwMUFEXFx1MDI4OFxcdTJDNjZcXHVBNzg3XS9nIH0sIHsgJ2Jhc2UnOiAndHonLCAnbGV0dGVycyc6IC9bXFx1QTcyOV0vZyB9LCB7ICdiYXNlJzogJ3UnLCAnbGV0dGVycyc6IC9bXFx1MDA3NVxcdTI0RTRcXHVGRjU1XFx1MDBGOVxcdTAwRkFcXHUwMEZCXFx1MDE2OVxcdTFFNzlcXHUwMTZCXFx1MUU3QlxcdTAxNkRcXHUwMEZDXFx1MDFEQ1xcdTAxRDhcXHUwMUQ2XFx1MDFEQVxcdTFFRTdcXHUwMTZGXFx1MDE3MVxcdTAxRDRcXHUwMjE1XFx1MDIxN1xcdTAxQjBcXHUxRUVCXFx1MUVFOVxcdTFFRUZcXHUxRUVEXFx1MUVGMVxcdTFFRTVcXHUxRTczXFx1MDE3M1xcdTFFNzdcXHUxRTc1XFx1MDI4OV0vZyB9LCB7ICdiYXNlJzogJ3YnLCAnbGV0dGVycyc6IC9bXFx1MDA3NlxcdTI0RTVcXHVGRjU2XFx1MUU3RFxcdTFFN0ZcXHUwMjhCXFx1QTc1RlxcdTAyOENdL2cgfSwgeyAnYmFzZSc6ICd2eScsICdsZXR0ZXJzJzogL1tcXHVBNzYxXS9nIH0sIHsgJ2Jhc2UnOiAndycsICdsZXR0ZXJzJzogL1tcXHUwMDc3XFx1MjRFNlxcdUZGNTdcXHUxRTgxXFx1MUU4M1xcdTAxNzVcXHUxRTg3XFx1MUU4NVxcdTFFOThcXHUxRTg5XFx1MkM3M10vZyB9LCB7ICdiYXNlJzogJ3gnLCAnbGV0dGVycyc6IC9bXFx1MDA3OFxcdTI0RTdcXHVGRjU4XFx1MUU4QlxcdTFFOERdL2cgfSwgeyAnYmFzZSc6ICd5JywgJ2xldHRlcnMnOiAvW1xcdTAwNzlcXHUyNEU4XFx1RkY1OVxcdTFFRjNcXHUwMEZEXFx1MDE3N1xcdTFFRjlcXHUwMjMzXFx1MUU4RlxcdTAwRkZcXHUxRUY3XFx1MUU5OVxcdTFFRjVcXHUwMUI0XFx1MDI0RlxcdTFFRkZdL2cgfSwgeyAnYmFzZSc6ICd6JywgJ2xldHRlcnMnOiAvW1xcdTAwN0FcXHUyNEU5XFx1RkY1QVxcdTAxN0FcXHUxRTkxXFx1MDE3Q1xcdTAxN0VcXHUxRTkzXFx1MUU5NVxcdTAxQjZcXHUwMjI1XFx1MDI0MFxcdTJDNkNcXHVBNzYzXS9nIH1dO1xuXG52YXIgc3RyaXBEaWFjcml0aWNzID0gZnVuY3Rpb24gc3RyaXBEaWFjcml0aWNzKHN0cikge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IG1hcC5sZW5ndGg7IGkrKykge1xuXHRcdHN0ciA9IHN0ci5yZXBsYWNlKG1hcFtpXS5sZXR0ZXJzLCBtYXBbaV0uYmFzZSk7XG5cdH1cblx0cmV0dXJuIHN0cjtcbn07XG5cbnZhciB0cmltID0gZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59O1xuXG52YXIgaXNWYWxpZCA9IGZ1bmN0aW9uIGlzVmFsaWQodmFsdWUpIHtcblx0cmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09ICcnO1xufTtcblxudmFyIGZpbHRlck9wdGlvbnMgPSBmdW5jdGlvbiBmaWx0ZXJPcHRpb25zKG9wdGlvbnMsIGZpbHRlclZhbHVlLCBleGNsdWRlT3B0aW9ucywgcHJvcHMpIHtcblx0aWYgKHByb3BzLmlnbm9yZUFjY2VudHMpIHtcblx0XHRmaWx0ZXJWYWx1ZSA9IHN0cmlwRGlhY3JpdGljcyhmaWx0ZXJWYWx1ZSk7XG5cdH1cblxuXHRpZiAocHJvcHMuaWdub3JlQ2FzZSkge1xuXHRcdGZpbHRlclZhbHVlID0gZmlsdGVyVmFsdWUudG9Mb3dlckNhc2UoKTtcblx0fVxuXG5cdGlmIChwcm9wcy50cmltRmlsdGVyKSB7XG5cdFx0ZmlsdGVyVmFsdWUgPSB0cmltKGZpbHRlclZhbHVlKTtcblx0fVxuXG5cdGlmIChleGNsdWRlT3B0aW9ucykgZXhjbHVkZU9wdGlvbnMgPSBleGNsdWRlT3B0aW9ucy5tYXAoZnVuY3Rpb24gKGkpIHtcblx0XHRyZXR1cm4gaVtwcm9wcy52YWx1ZUtleV07XG5cdH0pO1xuXG5cdHJldHVybiBvcHRpb25zLmZpbHRlcihmdW5jdGlvbiAob3B0aW9uKSB7XG5cdFx0aWYgKGV4Y2x1ZGVPcHRpb25zICYmIGV4Y2x1ZGVPcHRpb25zLmluZGV4T2Yob3B0aW9uW3Byb3BzLnZhbHVlS2V5XSkgPiAtMSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmIChwcm9wcy5maWx0ZXJPcHRpb24pIHJldHVybiBwcm9wcy5maWx0ZXJPcHRpb24uY2FsbCh1bmRlZmluZWQsIG9wdGlvbiwgZmlsdGVyVmFsdWUpO1xuXHRcdGlmICghZmlsdGVyVmFsdWUpIHJldHVybiB0cnVlO1xuXG5cdFx0dmFyIHZhbHVlID0gb3B0aW9uW3Byb3BzLnZhbHVlS2V5XTtcblx0XHR2YXIgbGFiZWwgPSBvcHRpb25bcHJvcHMubGFiZWxLZXldO1xuXHRcdHZhciBoYXNWYWx1ZSA9IGlzVmFsaWQodmFsdWUpO1xuXHRcdHZhciBoYXNMYWJlbCA9IGlzVmFsaWQobGFiZWwpO1xuXG5cdFx0aWYgKCFoYXNWYWx1ZSAmJiAhaGFzTGFiZWwpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR2YXIgdmFsdWVUZXN0ID0gaGFzVmFsdWUgPyBTdHJpbmcodmFsdWUpIDogbnVsbDtcblx0XHR2YXIgbGFiZWxUZXN0ID0gaGFzTGFiZWwgPyBTdHJpbmcobGFiZWwpIDogbnVsbDtcblxuXHRcdGlmIChwcm9wcy5pZ25vcmVBY2NlbnRzKSB7XG5cdFx0XHRpZiAodmFsdWVUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJykgdmFsdWVUZXN0ID0gc3RyaXBEaWFjcml0aWNzKHZhbHVlVGVzdCk7XG5cdFx0XHRpZiAobGFiZWxUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJykgbGFiZWxUZXN0ID0gc3RyaXBEaWFjcml0aWNzKGxhYmVsVGVzdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHByb3BzLmlnbm9yZUNhc2UpIHtcblx0XHRcdGlmICh2YWx1ZVRlc3QgJiYgcHJvcHMubWF0Y2hQcm9wICE9PSAnbGFiZWwnKSB2YWx1ZVRlc3QgPSB2YWx1ZVRlc3QudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmIChsYWJlbFRlc3QgJiYgcHJvcHMubWF0Y2hQcm9wICE9PSAndmFsdWUnKSBsYWJlbFRlc3QgPSBsYWJlbFRlc3QudG9Mb3dlckNhc2UoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJvcHMubWF0Y2hQb3MgPT09ICdzdGFydCcgPyB2YWx1ZVRlc3QgJiYgcHJvcHMubWF0Y2hQcm9wICE9PSAnbGFiZWwnICYmIHZhbHVlVGVzdC5zdWJzdHIoMCwgZmlsdGVyVmFsdWUubGVuZ3RoKSA9PT0gZmlsdGVyVmFsdWUgfHwgbGFiZWxUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJyAmJiBsYWJlbFRlc3Quc3Vic3RyKDAsIGZpbHRlclZhbHVlLmxlbmd0aCkgPT09IGZpbHRlclZhbHVlIDogdmFsdWVUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJyAmJiB2YWx1ZVRlc3QuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgPj0gMCB8fCBsYWJlbFRlc3QgJiYgcHJvcHMubWF0Y2hQcm9wICE9PSAndmFsdWUnICYmIGxhYmVsVGVzdC5pbmRleE9mKGZpbHRlclZhbHVlKSA+PSAwO1xuXHR9KTtcbn07XG5cbnZhciBtZW51UmVuZGVyZXIgPSBmdW5jdGlvbiBtZW51UmVuZGVyZXIoX3JlZikge1xuXHR2YXIgZm9jdXNlZE9wdGlvbiA9IF9yZWYuZm9jdXNlZE9wdGlvbixcblx0ICAgIGZvY3VzT3B0aW9uID0gX3JlZi5mb2N1c09wdGlvbixcblx0ICAgIGlucHV0VmFsdWUgPSBfcmVmLmlucHV0VmFsdWUsXG5cdCAgICBpbnN0YW5jZVByZWZpeCA9IF9yZWYuaW5zdGFuY2VQcmVmaXgsXG5cdCAgICBvbkZvY3VzID0gX3JlZi5vbkZvY3VzLFxuXHQgICAgb25PcHRpb25SZWYgPSBfcmVmLm9uT3B0aW9uUmVmLFxuXHQgICAgb25TZWxlY3QgPSBfcmVmLm9uU2VsZWN0LFxuXHQgICAgb3B0aW9uQ2xhc3NOYW1lID0gX3JlZi5vcHRpb25DbGFzc05hbWUsXG5cdCAgICBvcHRpb25Db21wb25lbnQgPSBfcmVmLm9wdGlvbkNvbXBvbmVudCxcblx0ICAgIG9wdGlvblJlbmRlcmVyID0gX3JlZi5vcHRpb25SZW5kZXJlcixcblx0ICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG5cdCAgICByZW1vdmVWYWx1ZSA9IF9yZWYucmVtb3ZlVmFsdWUsXG5cdCAgICBzZWxlY3RWYWx1ZSA9IF9yZWYuc2VsZWN0VmFsdWUsXG5cdCAgICB2YWx1ZUFycmF5ID0gX3JlZi52YWx1ZUFycmF5LFxuXHQgICAgdmFsdWVLZXkgPSBfcmVmLnZhbHVlS2V5O1xuXG5cdHZhciBPcHRpb24gPSBvcHRpb25Db21wb25lbnQ7XG5cblx0cmV0dXJuIG9wdGlvbnMubWFwKGZ1bmN0aW9uIChvcHRpb24sIGkpIHtcblx0XHR2YXIgaXNTZWxlY3RlZCA9IHZhbHVlQXJyYXkgJiYgdmFsdWVBcnJheS5zb21lKGZ1bmN0aW9uICh4KSB7XG5cdFx0XHRyZXR1cm4geFt2YWx1ZUtleV0gPT09IG9wdGlvblt2YWx1ZUtleV07XG5cdFx0fSk7XG5cdFx0dmFyIGlzRm9jdXNlZCA9IG9wdGlvbiA9PT0gZm9jdXNlZE9wdGlvbjtcblx0XHR2YXIgb3B0aW9uQ2xhc3MgPSBjbGFzc05hbWVzKG9wdGlvbkNsYXNzTmFtZSwge1xuXHRcdFx0J1NlbGVjdC1vcHRpb24nOiB0cnVlLFxuXHRcdFx0J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCxcblx0XHRcdCdpcy1mb2N1c2VkJzogaXNGb2N1c2VkLFxuXHRcdFx0J2lzLWRpc2FibGVkJzogb3B0aW9uLmRpc2FibGVkXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdE9wdGlvbixcblx0XHRcdHtcblx0XHRcdFx0Y2xhc3NOYW1lOiBvcHRpb25DbGFzcyxcblx0XHRcdFx0Zm9jdXNPcHRpb246IGZvY3VzT3B0aW9uLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiBpbnB1dFZhbHVlLFxuXHRcdFx0XHRpbnN0YW5jZVByZWZpeDogaW5zdGFuY2VQcmVmaXgsXG5cdFx0XHRcdGlzRGlzYWJsZWQ6IG9wdGlvbi5kaXNhYmxlZCxcblx0XHRcdFx0aXNGb2N1c2VkOiBpc0ZvY3VzZWQsXG5cdFx0XHRcdGlzU2VsZWN0ZWQ6IGlzU2VsZWN0ZWQsXG5cdFx0XHRcdGtleTogJ29wdGlvbi0nICsgaSArICctJyArIG9wdGlvblt2YWx1ZUtleV0sXG5cdFx0XHRcdG9uRm9jdXM6IG9uRm9jdXMsXG5cdFx0XHRcdG9uU2VsZWN0OiBvblNlbGVjdCxcblx0XHRcdFx0b3B0aW9uOiBvcHRpb24sXG5cdFx0XHRcdG9wdGlvbkluZGV4OiBpLFxuXHRcdFx0XHRyZWY6IGZ1bmN0aW9uIHJlZihfcmVmMikge1xuXHRcdFx0XHRcdG9uT3B0aW9uUmVmKF9yZWYyLCBpc0ZvY3VzZWQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRyZW1vdmVWYWx1ZTogcmVtb3ZlVmFsdWUsXG5cdFx0XHRcdHNlbGVjdFZhbHVlOiBzZWxlY3RWYWx1ZVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvblJlbmRlcmVyKG9wdGlvbiwgaSwgaW5wdXRWYWx1ZSlcblx0XHQpO1xuXHR9KTtcbn07XG5cbm1lbnVSZW5kZXJlci5wcm9wVHlwZXMgPSB7XG5cdGZvY3VzT3B0aW9uOiBQcm9wVHlwZXMuZnVuYyxcblx0Zm9jdXNlZE9wdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcblx0aW5wdXRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcblx0aW5zdGFuY2VQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG5cdG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuXHRvbk9wdGlvblJlZjogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcblx0b3B0aW9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRvcHRpb25Db21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxuXHRvcHRpb25SZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcblx0cmVtb3ZlVmFsdWU6IFByb3BUeXBlcy5mdW5jLFxuXHRzZWxlY3RWYWx1ZTogUHJvcFR5cGVzLmZ1bmMsXG5cdHZhbHVlQXJyYXk6IFByb3BUeXBlcy5hcnJheSxcblx0dmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmdcbn07XG5cbnZhciBibG9ja0V2ZW50ID0gKGZ1bmN0aW9uIChldmVudCkge1xuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0aWYgKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnQScgfHwgISgnaHJlZicgaW4gZXZlbnQudGFyZ2V0KSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoZXZlbnQudGFyZ2V0LnRhcmdldCkge1xuXHRcdHdpbmRvdy5vcGVuKGV2ZW50LnRhcmdldC5ocmVmLCBldmVudC50YXJnZXQudGFyZ2V0KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGV2ZW50LnRhcmdldC5ocmVmO1xuXHR9XG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmo7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cblxuXG5cblxudmFyIGFzeW5jR2VuZXJhdG9yID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBd2FpdFZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gQXN5bmNHZW5lcmF0b3IoZ2VuKSB7XG4gICAgdmFyIGZyb250LCBiYWNrO1xuXG4gICAgZnVuY3Rpb24gc2VuZChrZXksIGFyZykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgYXJnOiBhcmcsXG4gICAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgICAgICByZWplY3Q6IHJlamVjdCxcbiAgICAgICAgICBuZXh0OiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGJhY2spIHtcbiAgICAgICAgICBiYWNrID0gYmFjay5uZXh0ID0gcmVxdWVzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcm9udCA9IGJhY2sgPSByZXF1ZXN0O1xuICAgICAgICAgIHJlc3VtZShrZXksIGFyZyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc3VtZShrZXksIGFyZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGdlbltrZXldKGFyZyk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBd2FpdFZhbHVlKSB7XG4gICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlLnZhbHVlKS50aGVuKGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHJlc3VtZShcIm5leHRcIiwgYXJnKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICByZXN1bWUoXCJ0aHJvd1wiLCBhcmcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldHRsZShyZXN1bHQuZG9uZSA/IFwicmV0dXJuXCIgOiBcIm5vcm1hbFwiLCByZXN1bHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2V0dGxlKFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR0bGUodHlwZSwgdmFsdWUpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwicmV0dXJuXCI6XG4gICAgICAgICAgZnJvbnQucmVzb2x2ZSh7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBkb25lOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInRocm93XCI6XG4gICAgICAgICAgZnJvbnQucmVqZWN0KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGZyb250LnJlc29sdmUoe1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZG9uZTogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZnJvbnQgPSBmcm9udC5uZXh0O1xuXG4gICAgICBpZiAoZnJvbnQpIHtcbiAgICAgICAgcmVzdW1lKGZyb250LmtleSwgZnJvbnQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhY2sgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2ludm9rZSA9IHNlbmQ7XG5cbiAgICBpZiAodHlwZW9mIGdlbi5yZXR1cm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5yZXR1cm4gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuYXN5bmNJdGVyYXRvcikge1xuICAgIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICB9XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcIm5leHRcIiwgYXJnKTtcbiAgfTtcblxuICBBc3luY0dlbmVyYXRvci5wcm90b3R5cGUudGhyb3cgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcInRocm93XCIsIGFyZyk7XG4gIH07XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKFwicmV0dXJuXCIsIGFyZyk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICB3cmFwOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXN5bmNHZW5lcmF0b3IoZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgYXdhaXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBBd2FpdFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuXG5cblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG5cblxuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxudmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuXG5cblxuXG5cblxuXG5cbnZhciBvYmplY3RXaXRob3V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTtcbiAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4gPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbnZhciBPcHRpb24gPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuXHRpbmhlcml0cyhPcHRpb24sIF9SZWFjdCRDb21wb25lbnQpO1xuXG5cdGZ1bmN0aW9uIE9wdGlvbihwcm9wcykge1xuXHRcdGNsYXNzQ2FsbENoZWNrKHRoaXMsIE9wdGlvbik7XG5cblx0XHR2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChPcHRpb24uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihPcHRpb24pKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cblx0XHRfdGhpcy5oYW5kbGVNb3VzZURvd24gPSBfdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZChfdGhpcyk7XG5cdFx0X3RoaXMuaGFuZGxlTW91c2VFbnRlciA9IF90aGlzLmhhbmRsZU1vdXNlRW50ZXIuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMuaGFuZGxlTW91c2VNb3ZlID0gX3RoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLmhhbmRsZVRvdWNoU3RhcnQgPSBfdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLmhhbmRsZVRvdWNoRW5kID0gX3RoaXMuaGFuZGxlVG91Y2hFbmQuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMuaGFuZGxlVG91Y2hNb3ZlID0gX3RoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLm9uRm9jdXMgPSBfdGhpcy5vbkZvY3VzLmJpbmQoX3RoaXMpO1xuXHRcdHJldHVybiBfdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNsYXNzKE9wdGlvbiwgW3tcblx0XHRrZXk6ICdoYW5kbGVNb3VzZURvd24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNb3VzZUVudGVyJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VFbnRlcihldmVudCkge1xuXHRcdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNb3VzZU1vdmUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmUoZXZlbnQpIHtcblx0XHRcdHRoaXMub25Gb2N1cyhldmVudCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlVG91Y2hFbmQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaEVuZChldmVudCkge1xuXHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuXHRcdFx0aWYgKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuXHRcdFx0dGhpcy5oYW5kbGVNb3VzZURvd24oZXZlbnQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZVRvdWNoTW92ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoTW92ZSgpIHtcblx0XHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXG5cdFx0XHR0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaFN0YXJ0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydCgpIHtcblx0XHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBub3QgYmVpbmcgZHJhZ2dlZFxuXHRcdFx0dGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ29uRm9jdXMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBvbkZvY3VzKGV2ZW50KSB7XG5cdFx0XHRpZiAoIXRoaXMucHJvcHMuaXNGb2N1c2VkKSB7XG5cdFx0XHRcdHRoaXMucHJvcHMub25Gb2N1cyh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuXHRcdFx0ICAgIG9wdGlvbiA9IF9wcm9wcy5vcHRpb24sXG5cdFx0XHQgICAgaW5zdGFuY2VQcmVmaXggPSBfcHJvcHMuaW5zdGFuY2VQcmVmaXgsXG5cdFx0XHQgICAgb3B0aW9uSW5kZXggPSBfcHJvcHMub3B0aW9uSW5kZXg7XG5cblx0XHRcdHZhciBjbGFzc05hbWUgPSBjbGFzc05hbWVzKHRoaXMucHJvcHMuY2xhc3NOYW1lLCBvcHRpb24uY2xhc3NOYW1lKTtcblxuXHRcdFx0cmV0dXJuIG9wdGlvbi5kaXNhYmxlZCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHR7IGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuXHRcdFx0XHRcdG9uTW91c2VEb3duOiBibG9ja0V2ZW50LFxuXHRcdFx0XHRcdG9uQ2xpY2s6IGJsb2NrRXZlbnQgfSxcblx0XHRcdFx0dGhpcy5wcm9wcy5jaGlsZHJlblxuXHRcdFx0KSA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHR7IGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuXHRcdFx0XHRcdHN0eWxlOiBvcHRpb24uc3R5bGUsXG5cdFx0XHRcdFx0cm9sZTogJ29wdGlvbicsXG5cdFx0XHRcdFx0J2FyaWEtbGFiZWwnOiBvcHRpb24ubGFiZWwsXG5cdFx0XHRcdFx0b25Nb3VzZURvd246IHRoaXMuaGFuZGxlTW91c2VEb3duLFxuXHRcdFx0XHRcdG9uTW91c2VFbnRlcjogdGhpcy5oYW5kbGVNb3VzZUVudGVyLFxuXHRcdFx0XHRcdG9uTW91c2VNb3ZlOiB0aGlzLmhhbmRsZU1vdXNlTW92ZSxcblx0XHRcdFx0XHRvblRvdWNoU3RhcnQ6IHRoaXMuaGFuZGxlVG91Y2hTdGFydCxcblx0XHRcdFx0XHRvblRvdWNoTW92ZTogdGhpcy5oYW5kbGVUb3VjaE1vdmUsXG5cdFx0XHRcdFx0b25Ub3VjaEVuZDogdGhpcy5oYW5kbGVUb3VjaEVuZCxcblx0XHRcdFx0XHRpZDogaW5zdGFuY2VQcmVmaXggKyAnLW9wdGlvbi0nICsgb3B0aW9uSW5kZXgsXG5cdFx0XHRcdFx0dGl0bGU6IG9wdGlvbi50aXRsZSB9LFxuXHRcdFx0XHR0aGlzLnByb3BzLmNoaWxkcmVuXG5cdFx0XHQpO1xuXHRcdH1cblx0fV0pO1xuXHRyZXR1cm4gT3B0aW9uO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5PcHRpb24ucHJvcFR5cGVzID0ge1xuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG5cdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZywgLy8gY2xhc3NOYW1lIChiYXNlZCBvbiBtb3VzZSBwb3NpdGlvbilcblx0aW5zdGFuY2VQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCwgLy8gdW5pcXVlIHByZWZpeCBmb3IgdGhlIGlkcyAodXNlZCBmb3IgYXJpYSlcblx0aXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsIC8vIHRoZSBvcHRpb24gaXMgZGlzYWJsZWRcblx0aXNGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCwgLy8gdGhlIG9wdGlvbiBpcyBmb2N1c2VkXG5cdGlzU2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLCAvLyB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkXG5cdG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLCAvLyBtZXRob2QgdG8gaGFuZGxlIG1vdXNlRW50ZXIgb24gb3B0aW9uIGVsZW1lbnRcblx0b25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLCAvLyBtZXRob2QgdG8gaGFuZGxlIGNsaWNrIG9uIG9wdGlvbiBlbGVtZW50XG5cdG9uVW5mb2N1czogUHJvcFR5cGVzLmZ1bmMsIC8vIG1ldGhvZCB0byBoYW5kbGUgbW91c2VMZWF2ZSBvbiBvcHRpb24gZWxlbWVudFxuXHRvcHRpb246IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgLy8gb2JqZWN0IHRoYXQgaXMgYmFzZSBmb3IgdGhhdCBvcHRpb25cblx0b3B0aW9uSW5kZXg6IFByb3BUeXBlcy5udW1iZXIgLy8gaW5kZXggb2YgdGhlIG9wdGlvbiwgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRzIGZvciBhcmlhXG59O1xuXG52YXIgVmFsdWUgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuXHRpbmhlcml0cyhWYWx1ZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cblx0ZnVuY3Rpb24gVmFsdWUocHJvcHMpIHtcblx0XHRjbGFzc0NhbGxDaGVjayh0aGlzLCBWYWx1ZSk7XG5cblx0XHR2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChWYWx1ZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFZhbHVlKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG5cdFx0X3RoaXMuaGFuZGxlTW91c2VEb3duID0gX3RoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLm9uUmVtb3ZlID0gX3RoaXMub25SZW1vdmUuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMuaGFuZGxlVG91Y2hFbmRSZW1vdmUgPSBfdGhpcy5oYW5kbGVUb3VjaEVuZFJlbW92ZS5iaW5kKF90aGlzKTtcblx0XHRfdGhpcy5oYW5kbGVUb3VjaE1vdmUgPSBfdGhpcy5oYW5kbGVUb3VjaE1vdmUuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMuaGFuZGxlVG91Y2hTdGFydCA9IF90aGlzLmhhbmRsZVRvdWNoU3RhcnQuYmluZChfdGhpcyk7XG5cdFx0cmV0dXJuIF90aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ2xhc3MoVmFsdWUsIFt7XG5cdFx0a2V5OiAnaGFuZGxlTW91c2VEb3duJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duKGV2ZW50KSB7XG5cdFx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHRoaXMucHJvcHMub25DbGljayh0aGlzLnByb3BzLnZhbHVlLCBldmVudCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLnZhbHVlLmhyZWYpIHtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnb25SZW1vdmUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBvblJlbW92ZShldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0dGhpcy5wcm9wcy5vblJlbW92ZSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaEVuZFJlbW92ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kUmVtb3ZlKGV2ZW50KSB7XG5cdFx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXG5cdFx0XHRpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG5cdFx0XHQvLyBGaXJlIHRoZSBtb3VzZSBldmVudHNcblx0XHRcdHRoaXMub25SZW1vdmUoZXZlbnQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZVRvdWNoTW92ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoTW92ZSgpIHtcblx0XHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXG5cdFx0XHR0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaFN0YXJ0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydCgpIHtcblx0XHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBub3QgYmVpbmcgZHJhZ2dlZFxuXHRcdFx0dGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlclJlbW92ZUljb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJSZW1vdmVJY29uKCkge1xuXHRcdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgIXRoaXMucHJvcHMub25SZW1vdmUpIHJldHVybjtcblx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnc3BhbicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiAnU2VsZWN0LXZhbHVlLWljb24nLFxuXHRcdFx0XHRcdCdhcmlhLWhpZGRlbic6ICd0cnVlJyxcblx0XHRcdFx0XHRvbk1vdXNlRG93bjogdGhpcy5vblJlbW92ZSxcblx0XHRcdFx0XHRvblRvdWNoRW5kOiB0aGlzLmhhbmRsZVRvdWNoRW5kUmVtb3ZlLFxuXHRcdFx0XHRcdG9uVG91Y2hTdGFydDogdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LFxuXHRcdFx0XHRcdG9uVG91Y2hNb3ZlOiB0aGlzLmhhbmRsZVRvdWNoTW92ZSB9LFxuXHRcdFx0XHQnXFx4RDcnXG5cdFx0XHQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlckxhYmVsJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyTGFiZWwoKSB7XG5cdFx0XHR2YXIgY2xhc3NOYW1lID0gJ1NlbGVjdC12YWx1ZS1sYWJlbCc7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrIHx8IHRoaXMucHJvcHMudmFsdWUuaHJlZiA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdhJyxcblx0XHRcdFx0eyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgaHJlZjogdGhpcy5wcm9wcy52YWx1ZS5ocmVmLCB0YXJnZXQ6IHRoaXMucHJvcHMudmFsdWUudGFyZ2V0LCBvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVNb3VzZURvd24sIG9uVG91Y2hFbmQ6IHRoaXMuaGFuZGxlTW91c2VEb3duIH0sXG5cdFx0XHRcdHRoaXMucHJvcHMuY2hpbGRyZW5cblx0XHRcdCkgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnc3BhbicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIHJvbGU6ICdvcHRpb24nLCAnYXJpYS1zZWxlY3RlZCc6ICd0cnVlJywgaWQ6IHRoaXMucHJvcHMuaWQgfSxcblx0XHRcdFx0dGhpcy5wcm9wcy5jaGlsZHJlblxuXHRcdFx0KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiBjbGFzc05hbWVzKCdTZWxlY3QtdmFsdWUnLCB0aGlzLnByb3BzLnZhbHVlLmNsYXNzTmFtZSksXG5cdFx0XHRcdFx0c3R5bGU6IHRoaXMucHJvcHMudmFsdWUuc3R5bGUsXG5cdFx0XHRcdFx0dGl0bGU6IHRoaXMucHJvcHMudmFsdWUudGl0bGVcblx0XHRcdFx0fSxcblx0XHRcdFx0dGhpcy5yZW5kZXJSZW1vdmVJY29uKCksXG5cdFx0XHRcdHRoaXMucmVuZGVyTGFiZWwoKVxuXHRcdFx0KTtcblx0XHR9XG5cdH1dKTtcblx0cmV0dXJuIFZhbHVlO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5WYWx1ZS5wcm9wVHlwZXMgPSB7XG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLCAvLyBkaXNhYmxlZCBwcm9wIHBhc3NlZCB0byBSZWFjdFNlbGVjdFxuXHRpZDogUHJvcFR5cGVzLnN0cmluZywgLy8gVW5pcXVlIGlkIGZvciB0aGUgdmFsdWUgLSB1c2VkIGZvciBhcmlhXG5cdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLCAvLyBtZXRob2QgdG8gaGFuZGxlIGNsaWNrIG9uIHZhbHVlIGxhYmVsXG5cdG9uUmVtb3ZlOiBQcm9wVHlwZXMuZnVuYywgLy8gbWV0aG9kIHRvIGhhbmRsZSByZW1vdmFsIG9mIHRoZSB2YWx1ZVxuXHR2YWx1ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkIC8vIHRoZSBvcHRpb24gb2JqZWN0IGZvciB0aGlzIHZhbHVlXG59O1xuXG4vKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE4IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL3JlYWN0LXNlbGVjdFxuKi9cbnZhciBzdHJpbmdpZnlWYWx1ZSA9IGZ1bmN0aW9uIHN0cmluZ2lmeVZhbHVlKHZhbHVlKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiB2YWx1ZSAhPT0gbnVsbCAmJiBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgfHwgJyc7XG59O1xuXG52YXIgc3RyaW5nT3JOb2RlID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKTtcbnZhciBzdHJpbmdPck51bWJlciA9IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKTtcblxudmFyIGluc3RhbmNlSWQgPSAxO1xuXG52YXIgc2hvdWxkU2hvd1ZhbHVlID0gZnVuY3Rpb24gc2hvdWxkU2hvd1ZhbHVlKHN0YXRlLCBwcm9wcykge1xuXHR2YXIgaW5wdXRWYWx1ZSA9IHN0YXRlLmlucHV0VmFsdWUsXG5cdCAgICBpc1BzZXVkb0ZvY3VzZWQgPSBzdGF0ZS5pc1BzZXVkb0ZvY3VzZWQsXG5cdCAgICBpc0ZvY3VzZWQgPSBzdGF0ZS5pc0ZvY3VzZWQ7XG5cdHZhciBvblNlbGVjdFJlc2V0c0lucHV0ID0gcHJvcHMub25TZWxlY3RSZXNldHNJbnB1dDtcblxuXG5cdGlmICghaW5wdXRWYWx1ZSkgcmV0dXJuIHRydWU7XG5cblx0aWYgKCFvblNlbGVjdFJlc2V0c0lucHV0KSB7XG5cdFx0cmV0dXJuICEoIWlzRm9jdXNlZCAmJiBpc1BzZXVkb0ZvY3VzZWQgfHwgaXNGb2N1c2VkICYmICFpc1BzZXVkb0ZvY3VzZWQpO1xuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufTtcblxudmFyIHNob3VsZFNob3dQbGFjZWhvbGRlciA9IGZ1bmN0aW9uIHNob3VsZFNob3dQbGFjZWhvbGRlcihzdGF0ZSwgcHJvcHMsIGlzT3Blbikge1xuXHR2YXIgaW5wdXRWYWx1ZSA9IHN0YXRlLmlucHV0VmFsdWUsXG5cdCAgICBpc1BzZXVkb0ZvY3VzZWQgPSBzdGF0ZS5pc1BzZXVkb0ZvY3VzZWQsXG5cdCAgICBpc0ZvY3VzZWQgPSBzdGF0ZS5pc0ZvY3VzZWQ7XG5cdHZhciBvblNlbGVjdFJlc2V0c0lucHV0ID0gcHJvcHMub25TZWxlY3RSZXNldHNJbnB1dDtcblxuXG5cdHJldHVybiAhaW5wdXRWYWx1ZSB8fCAhb25TZWxlY3RSZXNldHNJbnB1dCAmJiAhaXNPcGVuICYmICFpc1BzZXVkb0ZvY3VzZWQgJiYgIWlzRm9jdXNlZDtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgYSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBvcHRpb25zIGFuZCB2YWx1ZUtleVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEFycmF5fSB2YWx1ZVx0LSB0aGUgc2VsZWN0ZWQgdmFsdWUocylcbiAqIEBwYXJhbSB7T2JqZWN0fVx0XHQgcHJvcHNcdC0gdGhlIFNlbGVjdCBjb21wb25lbnQncyBwcm9wcyAob3IgbmV4dFByb3BzKVxuICovXG52YXIgZXhwYW5kVmFsdWUgPSBmdW5jdGlvbiBleHBhbmRWYWx1ZSh2YWx1ZSwgcHJvcHMpIHtcblx0dmFyIHZhbHVlVHlwZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpO1xuXHRpZiAodmFsdWVUeXBlICE9PSAnc3RyaW5nJyAmJiB2YWx1ZVR5cGUgIT09ICdudW1iZXInICYmIHZhbHVlVHlwZSAhPT0gJ2Jvb2xlYW4nKSByZXR1cm4gdmFsdWU7XG5cdHZhciBvcHRpb25zID0gcHJvcHMub3B0aW9ucyxcblx0ICAgIHZhbHVlS2V5ID0gcHJvcHMudmFsdWVLZXk7XG5cblx0aWYgKCFvcHRpb25zKSByZXR1cm47XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdGlmIChTdHJpbmcob3B0aW9uc1tpXVt2YWx1ZUtleV0pID09PSBTdHJpbmcodmFsdWUpKSByZXR1cm4gb3B0aW9uc1tpXTtcblx0fVxufTtcblxudmFyIGhhbmRsZVJlcXVpcmVkID0gZnVuY3Rpb24gaGFuZGxlUmVxdWlyZWQodmFsdWUsIG11bHRpKSB7XG5cdGlmICghdmFsdWUpIHJldHVybiB0cnVlO1xuXHRyZXR1cm4gbXVsdGkgPyB2YWx1ZS5sZW5ndGggPT09IDAgOiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAwO1xufTtcblxudmFyIFNlbGVjdCQxID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcblx0aW5oZXJpdHMoU2VsZWN0LCBfUmVhY3QkQ29tcG9uZW50KTtcblxuXHRmdW5jdGlvbiBTZWxlY3QocHJvcHMpIHtcblx0XHRjbGFzc0NhbGxDaGVjayh0aGlzLCBTZWxlY3QpO1xuXG5cdFx0dmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoU2VsZWN0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2VsZWN0KSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG5cdFx0WydjbGVhclZhbHVlJywgJ2ZvY3VzT3B0aW9uJywgJ2dldE9wdGlvbkxhYmVsJywgJ2hhbmRsZUlucHV0Qmx1cicsICdoYW5kbGVJbnB1dENoYW5nZScsICdoYW5kbGVJbnB1dEZvY3VzJywgJ2hhbmRsZUlucHV0VmFsdWVDaGFuZ2UnLCAnaGFuZGxlS2V5RG93bicsICdoYW5kbGVNZW51U2Nyb2xsJywgJ2hhbmRsZU1vdXNlRG93bicsICdoYW5kbGVNb3VzZURvd25PbkFycm93JywgJ2hhbmRsZU1vdXNlRG93bk9uTWVudScsICdoYW5kbGVUb3VjaEVuZCcsICdoYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUnLCAnaGFuZGxlVG91Y2hNb3ZlJywgJ2hhbmRsZVRvdWNoT3V0c2lkZScsICdoYW5kbGVUb3VjaFN0YXJ0JywgJ2hhbmRsZVZhbHVlQ2xpY2snLCAnb25PcHRpb25SZWYnLCAncmVtb3ZlVmFsdWUnLCAnc2VsZWN0VmFsdWUnXS5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuXHRcdFx0cmV0dXJuIF90aGlzW2ZuXSA9IF90aGlzW2ZuXS5iaW5kKF90aGlzKTtcblx0XHR9KTtcblxuXHRcdF90aGlzLnN0YXRlID0ge1xuXHRcdFx0aW5wdXRWYWx1ZTogJycsXG5cdFx0XHRpc0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRyZXF1aXJlZDogZmFsc2Vcblx0XHR9O1xuXHRcdHJldHVybiBfdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNsYXNzKFNlbGVjdCwgW3tcblx0XHRrZXk6ICdjb21wb25lbnRXaWxsTW91bnQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cdFx0XHR0aGlzLl9pbnN0YW5jZVByZWZpeCA9ICdyZWFjdC1zZWxlY3QtJyArICh0aGlzLnByb3BzLmluc3RhbmNlSWQgfHwgKytpbnN0YW5jZUlkKSArICctJztcblx0XHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5yZXF1aXJlZCkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRyZXF1aXJlZDogaGFuZGxlUmVxdWlyZWQodmFsdWVBcnJheVswXSwgdGhpcy5wcm9wcy5tdWx0aSlcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRcdGlmICh0eXBlb2YgdGhpcy5wcm9wcy5hdXRvZm9jdXMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ1dhcm5pbmc6IFRoZSBhdXRvZm9jdXMgcHJvcCBoYXMgY2hhbmdlZCB0byBhdXRvRm9jdXMsIHN1cHBvcnQgd2lsbCBiZSByZW1vdmVkIGFmdGVyIHJlYWN0LXNlbGVjdEAxLjAnKTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLmF1dG9Gb2N1cyB8fCB0aGlzLnByb3BzLmF1dG9mb2N1cykge1xuXHRcdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG5cdFx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheShuZXh0UHJvcHMudmFsdWUsIG5leHRQcm9wcyk7XG5cblx0XHRcdGlmIChuZXh0UHJvcHMucmVxdWlyZWQpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0cmVxdWlyZWQ6IGhhbmRsZVJlcXVpcmVkKHZhbHVlQXJyYXlbMF0sIG5leHRQcm9wcy5tdWx0aSlcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMucmVxdWlyZWQpIHtcblx0XHRcdFx0Ly8gVXNlZCB0byBiZSByZXF1aXJlZCBidXQgaXQncyBub3QgYW55IG1vcmVcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHJlcXVpcmVkOiBmYWxzZSB9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAmJiB0aGlzLnByb3BzLnZhbHVlICE9PSBuZXh0UHJvcHMudmFsdWUgJiYgbmV4dFByb3BzLm9uU2VsZWN0UmVzZXRzSW5wdXQpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZSgnJykgfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG5cdFx0XHQvLyBmb2N1cyB0byB0aGUgc2VsZWN0ZWQgb3B0aW9uXG5cdFx0XHRpZiAodGhpcy5tZW51ICYmIHRoaXMuZm9jdXNlZCAmJiB0aGlzLnN0YXRlLmlzT3BlbiAmJiAhdGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uKSB7XG5cdFx0XHRcdHZhciBmb2N1c2VkT3B0aW9uTm9kZSA9IGZpbmRET01Ob2RlKHRoaXMuZm9jdXNlZCk7XG5cdFx0XHRcdHZhciBtZW51Tm9kZSA9IGZpbmRET01Ob2RlKHRoaXMubWVudSk7XG5cblx0XHRcdFx0dmFyIHNjcm9sbFRvcCA9IG1lbnVOb2RlLnNjcm9sbFRvcDtcblx0XHRcdFx0dmFyIHNjcm9sbEJvdHRvbSA9IHNjcm9sbFRvcCArIG1lbnVOb2RlLm9mZnNldEhlaWdodDtcblx0XHRcdFx0dmFyIG9wdGlvblRvcCA9IGZvY3VzZWRPcHRpb25Ob2RlLm9mZnNldFRvcDtcblx0XHRcdFx0dmFyIG9wdGlvbkJvdHRvbSA9IG9wdGlvblRvcCArIGZvY3VzZWRPcHRpb25Ob2RlLm9mZnNldEhlaWdodDtcblxuXHRcdFx0XHRpZiAoc2Nyb2xsVG9wID4gb3B0aW9uVG9wIHx8IHNjcm9sbEJvdHRvbSA8IG9wdGlvbkJvdHRvbSkge1xuXHRcdFx0XHRcdG1lbnVOb2RlLnNjcm9sbFRvcCA9IGZvY3VzZWRPcHRpb25Ob2RlLm9mZnNldFRvcDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFdlIHN0aWxsIHNldCBoYXNTY3JvbGxlZFRvT3B0aW9uIHRvIHRydWUgZXZlbiBpZiB3ZSBkaWRuJ3Rcblx0XHRcdFx0Ly8gYWN0dWFsbHkgbmVlZCB0byBzY3JvbGwsIGFzIHdlJ3ZlIHN0aWxsIGNvbmZpcm1lZCB0aGF0IHRoZVxuXHRcdFx0XHQvLyBvcHRpb24gaXMgaW4gdmlldy5cblx0XHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdHRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbiA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgJiYgdGhpcy5mb2N1c2VkICYmIHRoaXMubWVudSkge1xuXHRcdFx0XHR0aGlzLl9zY3JvbGxUb0ZvY3VzZWRPcHRpb25PblVwZGF0ZSA9IGZhbHNlO1xuXHRcdFx0XHR2YXIgZm9jdXNlZERPTSA9IGZpbmRET01Ob2RlKHRoaXMuZm9jdXNlZCk7XG5cdFx0XHRcdHZhciBtZW51RE9NID0gZmluZERPTU5vZGUodGhpcy5tZW51KTtcblx0XHRcdFx0dmFyIGZvY3VzZWRSZWN0ID0gZm9jdXNlZERPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0dmFyIG1lbnVSZWN0ID0gbWVudURPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0aWYgKGZvY3VzZWRSZWN0LmJvdHRvbSA+IG1lbnVSZWN0LmJvdHRvbSkge1xuXHRcdFx0XHRcdG1lbnVET00uc2Nyb2xsVG9wID0gZm9jdXNlZERPTS5vZmZzZXRUb3AgKyBmb2N1c2VkRE9NLmNsaWVudEhlaWdodCAtIG1lbnVET00ub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHR9IGVsc2UgaWYgKGZvY3VzZWRSZWN0LnRvcCA8IG1lbnVSZWN0LnRvcCkge1xuXHRcdFx0XHRcdG1lbnVET00uc2Nyb2xsVG9wID0gZm9jdXNlZERPTS5vZmZzZXRUb3A7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLnNjcm9sbE1lbnVJbnRvVmlldyAmJiB0aGlzLm1lbnVDb250YWluZXIpIHtcblx0XHRcdFx0dmFyIG1lbnVDb250YWluZXJSZWN0ID0gdGhpcy5tZW51Q29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRpZiAod2luZG93LmlubmVySGVpZ2h0IDwgbWVudUNvbnRhaW5lclJlY3QuYm90dG9tICsgdGhpcy5wcm9wcy5tZW51QnVmZmVyKSB7XG5cdFx0XHRcdFx0d2luZG93LnNjcm9sbEJ5KDAsIG1lbnVDb250YWluZXJSZWN0LmJvdHRvbSArIHRoaXMucHJvcHMubWVudUJ1ZmZlciAtIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChwcmV2UHJvcHMuZGlzYWJsZWQgIT09IHRoaXMucHJvcHMuZGlzYWJsZWQpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGlzRm9jdXNlZDogZmFsc2UgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcblx0XHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0XHRcdH1cblx0XHRcdGlmIChwcmV2U3RhdGUuaXNPcGVuICE9PSB0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0XHR0aGlzLnRvZ2dsZVRvdWNoT3V0c2lkZUV2ZW50KHRoaXMuc3RhdGUuaXNPcGVuKTtcblx0XHRcdFx0dmFyIGhhbmRsZXIgPSB0aGlzLnN0YXRlLmlzT3BlbiA/IHRoaXMucHJvcHMub25PcGVuIDogdGhpcy5wcm9wcy5vbkNsb3NlO1xuXHRcdFx0XHRoYW5kbGVyICYmIGhhbmRsZXIoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdFx0dGhpcy50b2dnbGVUb3VjaE91dHNpZGVFdmVudChmYWxzZSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAndG9nZ2xlVG91Y2hPdXRzaWRlRXZlbnQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiB0b2dnbGVUb3VjaE91dHNpZGVFdmVudChlbmFibGVkKSB7XG5cdFx0XHRpZiAoZW5hYmxlZCkge1xuXHRcdFx0XHRpZiAoIWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuYXR0YWNoRXZlbnQpIHtcblx0XHRcdFx0XHRkb2N1bWVudC5hdHRhY2hFdmVudCgnb250b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICghZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciAmJiBkb2N1bWVudC5kZXRhY2hFdmVudCkge1xuXHRcdFx0XHRcdGRvY3VtZW50LmRldGFjaEV2ZW50KCdvbnRvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZVRvdWNoT3V0c2lkZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoT3V0c2lkZShldmVudCkge1xuXHRcdFx0Ly8gaGFuZGxlIHRvdWNoIG91dHNpZGUgb24gaW9zIHRvIGRpc21pc3MgbWVudVxuXHRcdFx0aWYgKHRoaXMud3JhcHBlciAmJiAhdGhpcy53cmFwcGVyLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcblx0XHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1cycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzKCkge1xuXHRcdFx0aWYgKCF0aGlzLmlucHV0KSByZXR1cm47XG5cdFx0XHR0aGlzLmlucHV0LmZvY3VzKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnYmx1cklucHV0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gYmx1cklucHV0KCkge1xuXHRcdFx0aWYgKCF0aGlzLmlucHV0KSByZXR1cm47XG5cdFx0XHR0aGlzLmlucHV0LmJsdXIoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaE1vdmUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaE1vdmUoKSB7XG5cdFx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZFxuXHRcdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlVG91Y2hTdGFydCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoU3RhcnQoKSB7XG5cdFx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcblx0XHRcdHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaEVuZCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kKGV2ZW50KSB7XG5cdFx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXG5cdFx0XHRpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG5cdFx0XHQvLyBGaXJlIHRoZSBtb3VzZSBldmVudHNcblx0XHRcdHRoaXMuaGFuZGxlTW91c2VEb3duKGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUoZXZlbnQpIHtcblx0XHRcdC8vIENoZWNrIGlmIHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWQsIEluIHRoaXMgY2FzZVxuXHRcdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRcdGlmICh0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHRcdC8vIENsZWFyIHRoZSB2YWx1ZVxuXHRcdFx0dGhpcy5jbGVhclZhbHVlKGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNb3VzZURvd24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZXZlbnQpIHtcblx0XHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcblx0XHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxuXHRcdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG5cdFx0XHRcdGlmICghdGhpcy5zdGF0ZS5pc0ZvY3VzZWQpIHtcblx0XHRcdFx0XHR0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IHRoaXMucHJvcHMub3Blbk9uQ2xpY2s7XG5cdFx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0aXNPcGVuOiB0cnVlLFxuXHRcdFx0XHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBwcmV2ZW50IGRlZmF1bHQgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdC8vIGZvciB0aGUgbm9uLXNlYXJjaGFibGUgc2VsZWN0LCB0b2dnbGUgdGhlIG1lbnVcblx0XHRcdGlmICghdGhpcy5wcm9wcy5zZWFyY2hhYmxlKSB7XG5cdFx0XHRcdC8vIFRoaXMgY29kZSBtZWFucyB0aGF0IGlmIGEgc2VsZWN0IGlzIHNlYXJjaGFibGUsIG9uQ2xpY2sgdGhlIG9wdGlvbnMgbWVudSB3aWxsIG5vdCBhcHBlYXIsIG9ubHkgb24gc3Vic2VxdWVudCBjbGljayB3aWxsIGl0IG9wZW4uXG5cdFx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzT3BlbjogIXRoaXMuc3RhdGUuaXNPcGVuXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5pc0ZvY3VzZWQpIHtcblx0XHRcdFx0Ly8gT24gaU9TLCB3ZSBjYW4gZ2V0IGludG8gYSBzdGF0ZSB3aGVyZSB3ZSB0aGluayB0aGUgaW5wdXQgaXMgZm9jdXNlZCBidXQgaXQgaXNuJ3QgcmVhbGx5LFxuXHRcdFx0XHQvLyBzaW5jZSBpT1MgaWdub3JlcyBwcm9ncmFtbWF0aWMgY2FsbHMgdG8gaW5wdXQuZm9jdXMoKSB0aGF0IHdlcmVuJ3QgdHJpZ2dlcmVkIGJ5IGEgY2xpY2sgZXZlbnQuXG5cdFx0XHRcdC8vIENhbGwgZm9jdXMoKSBhZ2FpbiBoZXJlIHRvIGJlIHNhZmUuXG5cdFx0XHRcdHRoaXMuZm9jdXMoKTtcblxuXHRcdFx0XHR2YXIgaW5wdXQgPSB0aGlzLmlucHV0O1xuXHRcdFx0XHR2YXIgdG9PcGVuID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAodHlwZW9mIGlucHV0LmdldElucHV0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0Ly8gR2V0IHRoZSBhY3R1YWwgRE9NIGlucHV0IGlmIHRoZSByZWYgaXMgYW4gPEF1dG9zaXplSW5wdXQgLz4gY29tcG9uZW50XG5cdFx0XHRcdFx0aW5wdXQgPSBpbnB1dC5nZXRJbnB1dCgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gY2xlYXJzIHRoZSB2YWx1ZSBzbyB0aGF0IHRoZSBjdXJzb3Igd2lsbCBiZSBhdCB0aGUgZW5kIG9mIGlucHV0IHdoZW4gdGhlIGNvbXBvbmVudCByZS1yZW5kZXJzXG5cdFx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2ZvY3VzQWZ0ZXJDbGVhcikge1xuXHRcdFx0XHRcdHRvT3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdHRoaXMuX2ZvY3VzQWZ0ZXJDbGVhciA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gaWYgdGhlIGlucHV0IGlzIGZvY3VzZWQsIGVuc3VyZSB0aGUgbWVudSBpcyBvcGVuXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzT3BlbjogdG9PcGVuLFxuXHRcdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRcdFx0Zm9jdXNlZE9wdGlvbjogbnVsbFxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIG90aGVyd2lzZSwgZm9jdXMgdGhlIGlucHV0IGFuZCBvcGVuIHRoZSBtZW51XG5cdFx0XHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gdGhpcy5wcm9wcy5vcGVuT25DbGljaztcblx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHsgZm9jdXNlZE9wdGlvbjogbnVsbCB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNb3VzZURvd25PbkFycm93Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duT25BcnJvdyhldmVudCkge1xuXHRcdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdFx0Ly8gYnV0dG9uLCBvciBpZiB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLCBpZ25vcmUgaXQuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCBldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdFx0Ly8gcHJldmVudCBkZWZhdWx0IGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQvLyBjbG9zZSB0aGUgbWVudVxuXHRcdFx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSWYgdGhlIG1lbnUgaXNuJ3Qgb3BlbiwgbGV0IHRoZSBldmVudCBidWJibGUgdG8gdGhlIG1haW4gaGFuZGxlTW91c2VEb3duXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzT3BlbjogdHJ1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNb3VzZURvd25Pbk1lbnUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd25Pbk1lbnUoZXZlbnQpIHtcblx0XHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcblx0XHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxuXHRcdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IHRydWU7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY2xvc2VNZW51Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY2xvc2VNZW51KCkge1xuXHRcdFx0aWYgKHRoaXMucHJvcHMub25DbG9zZVJlc2V0c0lucHV0KSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlucHV0VmFsdWU6IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZSgnJyksXG5cdFx0XHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmICF0aGlzLnByb3BzLm11bHRpXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmICF0aGlzLnByb3BzLm11bHRpXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlSW5wdXRGb2N1cycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUlucHV0Rm9jdXMoZXZlbnQpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSByZXR1cm47XG5cblx0XHRcdHZhciB0b09wZW4gPSB0aGlzLnN0YXRlLmlzT3BlbiB8fCB0aGlzLl9vcGVuQWZ0ZXJGb2N1cyB8fCB0aGlzLnByb3BzLm9wZW5PbkZvY3VzO1xuXHRcdFx0dG9PcGVuID0gdGhpcy5fZm9jdXNBZnRlckNsZWFyID8gZmFsc2UgOiB0b09wZW47IC8vaWYgZm9jdXMgaGFwcGVucyBhZnRlciBjbGVhciB2YWx1ZXMsIGRvbid0IG9wZW4gZHJvcGRvd24geWV0LlxuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5vbkZvY3VzKSB7XG5cdFx0XHRcdHRoaXMucHJvcHMub25Gb2N1cyhldmVudCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc0ZvY3VzZWQ6IHRydWUsXG5cdFx0XHRcdGlzT3BlbjogISF0b09wZW5cblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLl9mb2N1c0FmdGVyQ2xlYXIgPSBmYWxzZTtcblx0XHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gZmFsc2U7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlSW5wdXRCbHVyJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlSW5wdXRCbHVyKGV2ZW50KSB7XG5cdFx0XHQvLyBUaGUgY2hlY2sgZm9yIG1lbnUuY29udGFpbnMoYWN0aXZlRWxlbWVudCkgaXMgbmVjZXNzYXJ5IHRvIHByZXZlbnQgSUUxMSdzIHNjcm9sbGJhciBmcm9tIGNsb3NpbmcgdGhlIG1lbnUgaW4gY2VydGFpbiBjb250ZXh0cy5cblx0XHRcdGlmICh0aGlzLm1lbnUgJiYgKHRoaXMubWVudSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCB0aGlzLm1lbnUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpKSB7XG5cdFx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcblx0XHRcdFx0dGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuXHRcdFx0fVxuXHRcdFx0dmFyIG9uQmx1cnJlZFN0YXRlID0ge1xuXHRcdFx0XHRpc0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlXG5cdFx0XHR9O1xuXHRcdFx0aWYgKHRoaXMucHJvcHMub25CbHVyUmVzZXRzSW5wdXQpIHtcblx0XHRcdFx0b25CbHVycmVkU3RhdGUuaW5wdXRWYWx1ZSA9IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZSgnJyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldFN0YXRlKG9uQmx1cnJlZFN0YXRlKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVJbnB1dENoYW5nZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUlucHV0Q2hhbmdlKGV2ZW50KSB7XG5cdFx0XHR2YXIgbmV3SW5wdXRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblxuXHRcdFx0aWYgKHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAhPT0gZXZlbnQudGFyZ2V0LnZhbHVlKSB7XG5cdFx0XHRcdG5ld0lucHV0VmFsdWUgPSB0aGlzLmhhbmRsZUlucHV0VmFsdWVDaGFuZ2UobmV3SW5wdXRWYWx1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpbnB1dFZhbHVlOiBuZXdJbnB1dFZhbHVlLFxuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3NldElucHV0VmFsdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBzZXRJbnB1dFZhbHVlKG5ld1ZhbHVlKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKSB7XG5cdFx0XHRcdHZhciBuZXh0U3RhdGUgPSB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UobmV3VmFsdWUpO1xuXHRcdFx0XHRpZiAobmV4dFN0YXRlICE9IG51bGwgJiYgKHR5cGVvZiBuZXh0U3RhdGUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG5leHRTdGF0ZSkpICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdG5ld1ZhbHVlID0gJycgKyBuZXh0U3RhdGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpbnB1dFZhbHVlOiBuZXdWYWx1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUlucHV0VmFsdWVDaGFuZ2UobmV3VmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UpIHtcblx0XHRcdFx0dmFyIG5leHRTdGF0ZSA9IHRoaXMucHJvcHMub25JbnB1dENoYW5nZShuZXdWYWx1ZSk7XG5cdFx0XHRcdC8vIE5vdGU6ICE9IHVzZWQgZGVsaWJlcmF0ZWx5IGhlcmUgdG8gY2F0Y2ggdW5kZWZpbmVkIGFuZCBudWxsXG5cdFx0XHRcdGlmIChuZXh0U3RhdGUgIT0gbnVsbCAmJiAodHlwZW9mIG5leHRTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobmV4dFN0YXRlKSkgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0bmV3VmFsdWUgPSAnJyArIG5leHRTdGF0ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ld1ZhbHVlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZUtleURvd24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkgcmV0dXJuO1xuXG5cdFx0XHRpZiAodHlwZW9mIHRoaXMucHJvcHMub25JbnB1dEtleURvd24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0dGhpcy5wcm9wcy5vbklucHV0S2V5RG93bihldmVudCk7XG5cdFx0XHRcdGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0XHRjYXNlIDg6XG5cdFx0XHRcdFx0Ly8gYmFja3NwYWNlXG5cdFx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiYgdGhpcy5wcm9wcy5iYWNrc3BhY2VSZW1vdmVzKSB7XG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0dGhpcy5wb3BWYWx1ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA5OlxuXHRcdFx0XHRcdC8vIHRhYlxuXHRcdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSB8fCAhdGhpcy5zdGF0ZS5pc09wZW4gfHwgIXRoaXMucHJvcHMudGFiU2VsZWN0c1ZhbHVlKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAxMzpcblx0XHRcdFx0XHQvLyBlbnRlclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5mb2N1c05leHRPcHRpb24oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMjc6XG5cdFx0XHRcdFx0Ly8gZXNjYXBlXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdFx0XHRcdHRoaXMuY2xvc2VNZW51KCk7XG5cdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMuY2xlYXJhYmxlICYmIHRoaXMucHJvcHMuZXNjYXBlQ2xlYXJzVmFsdWUpIHtcblx0XHRcdFx0XHRcdHRoaXMuY2xlYXJWYWx1ZShldmVudCk7XG5cdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMzI6XG5cdFx0XHRcdFx0Ly8gc3BhY2Vcblx0XHRcdFx0XHRpZiAodGhpcy5wcm9wcy5zZWFyY2hhYmxlKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZvY3VzTmV4dE9wdGlvbigpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0Rm9jdXNlZE9wdGlvbigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDM4OlxuXHRcdFx0XHRcdC8vIHVwXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLmZvY3VzUHJldmlvdXNPcHRpb24oKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHQvLyBkb3duXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLmZvY3VzTmV4dE9wdGlvbigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDMzOlxuXHRcdFx0XHRcdC8vIHBhZ2UgdXBcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMuZm9jdXNQYWdlVXBPcHRpb24oKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzNDpcblx0XHRcdFx0XHQvLyBwYWdlIGRvd25cblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMuZm9jdXNQYWdlRG93bk9wdGlvbigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDM1OlxuXHRcdFx0XHRcdC8vIGVuZCBrZXlcblx0XHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMuZm9jdXNFbmRPcHRpb24oKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzNjpcblx0XHRcdFx0XHQvLyBob21lIGtleVxuXHRcdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5mb2N1c1N0YXJ0T3B0aW9uKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgNDY6XG5cdFx0XHRcdFx0Ly8gZGVsZXRlXG5cdFx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiYgdGhpcy5wcm9wcy5kZWxldGVSZW1vdmVzKSB7XG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0dGhpcy5wb3BWYWx1ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVWYWx1ZUNsaWNrJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVmFsdWVDbGljayhvcHRpb24sIGV2ZW50KSB7XG5cdFx0XHRpZiAoIXRoaXMucHJvcHMub25WYWx1ZUNsaWNrKSByZXR1cm47XG5cdFx0XHR0aGlzLnByb3BzLm9uVmFsdWVDbGljayhvcHRpb24sIGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNZW51U2Nyb2xsJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTWVudVNjcm9sbChldmVudCkge1xuXHRcdFx0aWYgKCF0aGlzLnByb3BzLm9uTWVudVNjcm9sbFRvQm90dG9tKSByZXR1cm47XG5cdFx0XHR2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG5cdFx0XHRpZiAodGFyZ2V0LnNjcm9sbEhlaWdodCA+IHRhcmdldC5vZmZzZXRIZWlnaHQgJiYgdGFyZ2V0LnNjcm9sbEhlaWdodCAtIHRhcmdldC5vZmZzZXRIZWlnaHQgLSB0YXJnZXQuc2Nyb2xsVG9wIDw9IDApIHtcblx0XHRcdFx0dGhpcy5wcm9wcy5vbk1lbnVTY3JvbGxUb0JvdHRvbSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2dldE9wdGlvbkxhYmVsJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0T3B0aW9uTGFiZWwob3ApIHtcblx0XHRcdHJldHVybiBvcFt0aGlzLnByb3BzLmxhYmVsS2V5XTtcblx0XHR9XG5cblx0XHQvKipcbiAgICogVHVybnMgYSB2YWx1ZSBpbnRvIGFuIGFycmF5IGZyb20gdGhlIGdpdmVuIG9wdGlvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEFycmF5fSB2YWx1ZVx0XHQtIHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IGlucHV0XG4gICAqIEBwYXJhbSB7T2JqZWN0fVx0XHRuZXh0UHJvcHNcdC0gb3B0aW9uYWxseSBzcGVjaWZ5IHRoZSBuZXh0UHJvcHMgc28gdGhlIHJldHVybmVkIGFycmF5IHVzZXMgdGhlIGxhdGVzdCBjb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm5zXHR7QXJyYXl9XHR0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCByZXByZXNlbnRlZCBpbiBhbiBhcnJheVxuICAgKi9cblxuXHR9LCB7XG5cdFx0a2V5OiAnZ2V0VmFsdWVBcnJheScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFZhbHVlQXJyYXkodmFsdWUpIHtcblx0XHRcdHZhciBuZXh0UHJvcHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcblxuXHRcdFx0LyoqIHN1cHBvcnQgb3B0aW9uYWxseSBwYXNzaW5nIGluIHRoZSBgbmV4dFByb3BzYCBzbyBgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc2AgdXBkYXRlcyB3aWxsIGZ1bmN0aW9uIGFzIGV4cGVjdGVkICovXG5cdFx0XHR2YXIgcHJvcHMgPSAodHlwZW9mIG5leHRQcm9wcyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobmV4dFByb3BzKSkgPT09ICdvYmplY3QnID8gbmV4dFByb3BzIDogdGhpcy5wcm9wcztcblx0XHRcdGlmIChwcm9wcy5tdWx0aSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUuc3BsaXQocHJvcHMuZGVsaW1pdGVyKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBbXTtcblx0XHRcdFx0XHR2YWx1ZSA9IFt2YWx1ZV07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZhbHVlLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0XHRyZXR1cm4gZXhwYW5kVmFsdWUodmFsdWUsIHByb3BzKTtcblx0XHRcdFx0fSkuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGV4cGFuZGVkVmFsdWUgPSBleHBhbmRWYWx1ZSh2YWx1ZSwgcHJvcHMpO1xuXHRcdFx0cmV0dXJuIGV4cGFuZGVkVmFsdWUgPyBbZXhwYW5kZWRWYWx1ZV0gOiBbXTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdzZXRWYWx1ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0aWYgKHRoaXMucHJvcHMuYXV0b0JsdXIpIHtcblx0XHRcdFx0dGhpcy5ibHVySW5wdXQoKTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLnJlcXVpcmVkKSB7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IGhhbmRsZVJlcXVpcmVkKHZhbHVlLCB0aGlzLnByb3BzLm11bHRpKTtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHJlcXVpcmVkOiByZXF1aXJlZCB9KTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLnNpbXBsZVZhbHVlICYmIHZhbHVlKSB7XG5cdFx0XHRcdHZhbHVlID0gdGhpcy5wcm9wcy5tdWx0aSA/IHZhbHVlLm1hcChmdW5jdGlvbiAoaSkge1xuXHRcdFx0XHRcdHJldHVybiBpW190aGlzMi5wcm9wcy52YWx1ZUtleV07XG5cdFx0XHRcdH0pLmpvaW4odGhpcy5wcm9wcy5kZWxpbWl0ZXIpIDogdmFsdWVbdGhpcy5wcm9wcy52YWx1ZUtleV07XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuXHRcdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdzZWxlY3RWYWx1ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHNlbGVjdFZhbHVlKHZhbHVlKSB7XG5cdFx0XHR2YXIgX3RoaXMzID0gdGhpcztcblxuXHRcdFx0Ly8gTk9URTogd2UgYWN0dWFsbHkgYWRkL3NldCB0aGUgdmFsdWUgaW4gYSBjYWxsYmFjayB0byBtYWtlIHN1cmUgdGhlXG5cdFx0XHQvLyBpbnB1dCB2YWx1ZSBpcyBlbXB0eSB0byBhdm9pZCBzdHlsaW5nIGlzc3VlcyBpbiBDaHJvbWVcblx0XHRcdGlmICh0aGlzLnByb3BzLmNsb3NlT25TZWxlY3QpIHtcblx0XHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdXBkYXRlZFZhbHVlID0gdGhpcy5wcm9wcy5vblNlbGVjdFJlc2V0c0lucHV0ID8gJycgOiB0aGlzLnN0YXRlLmlucHV0VmFsdWU7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRmb2N1c2VkSW5kZXg6IG51bGwsXG5cdFx0XHRcdFx0aW5wdXRWYWx1ZTogdGhpcy5oYW5kbGVJbnB1dFZhbHVlQ2hhbmdlKHVwZGF0ZWRWYWx1ZSksXG5cdFx0XHRcdFx0aXNPcGVuOiAhdGhpcy5wcm9wcy5jbG9zZU9uU2VsZWN0XG5cdFx0XHRcdH0sIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgdmFsdWVBcnJheSA9IF90aGlzMy5nZXRWYWx1ZUFycmF5KF90aGlzMy5wcm9wcy52YWx1ZSk7XG5cdFx0XHRcdFx0aWYgKHZhbHVlQXJyYXkuc29tZShmdW5jdGlvbiAoaSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGlbX3RoaXMzLnByb3BzLnZhbHVlS2V5XSA9PT0gdmFsdWVbX3RoaXMzLnByb3BzLnZhbHVlS2V5XTtcblx0XHRcdFx0XHR9KSkge1xuXHRcdFx0XHRcdFx0X3RoaXMzLnJlbW92ZVZhbHVlKHZhbHVlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0X3RoaXMzLmFkZFZhbHVlKHZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0aW5wdXRWYWx1ZTogdGhpcy5oYW5kbGVJbnB1dFZhbHVlQ2hhbmdlKHVwZGF0ZWRWYWx1ZSksXG5cdFx0XHRcdFx0aXNPcGVuOiAhdGhpcy5wcm9wcy5jbG9zZU9uU2VsZWN0LFxuXHRcdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogdGhpcy5zdGF0ZS5pc0ZvY3VzZWRcblx0XHRcdFx0fSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdF90aGlzMy5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2FkZFZhbHVlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gYWRkVmFsdWUodmFsdWUpIHtcblx0XHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdFx0dmFyIHZpc2libGVPcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0cmV0dXJuICF2YWwuZGlzYWJsZWQ7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBsYXN0VmFsdWVJbmRleCA9IHZpc2libGVPcHRpb25zLmluZGV4T2YodmFsdWUpO1xuXHRcdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZUFycmF5LmNvbmNhdCh2YWx1ZSkpO1xuXHRcdFx0aWYgKHZpc2libGVPcHRpb25zLmxlbmd0aCAtIDEgPT09IGxhc3RWYWx1ZUluZGV4KSB7XG5cdFx0XHRcdC8vIHRoZSBsYXN0IG9wdGlvbiB3YXMgc2VsZWN0ZWQ7IGZvY3VzIHRoZSBzZWNvbmQtbGFzdCBvbmVcblx0XHRcdFx0dGhpcy5mb2N1c09wdGlvbih2aXNpYmxlT3B0aW9uc1tsYXN0VmFsdWVJbmRleCAtIDFdKTtcblx0XHRcdH0gZWxzZSBpZiAodmlzaWJsZU9wdGlvbnMubGVuZ3RoID4gbGFzdFZhbHVlSW5kZXgpIHtcblx0XHRcdFx0Ly8gZm9jdXMgdGhlIG9wdGlvbiBiZWxvdyB0aGUgc2VsZWN0ZWQgb25lXG5cdFx0XHRcdHRoaXMuZm9jdXNPcHRpb24odmlzaWJsZU9wdGlvbnNbbGFzdFZhbHVlSW5kZXggKyAxXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncG9wVmFsdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBwb3BWYWx1ZSgpIHtcblx0XHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdFx0aWYgKCF2YWx1ZUFycmF5Lmxlbmd0aCkgcmV0dXJuO1xuXHRcdFx0aWYgKHZhbHVlQXJyYXlbdmFsdWVBcnJheS5sZW5ndGggLSAxXS5jbGVhcmFibGVWYWx1ZSA9PT0gZmFsc2UpIHJldHVybjtcblx0XHRcdHRoaXMuc2V0VmFsdWUodGhpcy5wcm9wcy5tdWx0aSA/IHZhbHVlQXJyYXkuc2xpY2UoMCwgdmFsdWVBcnJheS5sZW5ndGggLSAxKSA6IG51bGwpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbW92ZVZhbHVlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlVmFsdWUodmFsdWUpIHtcblx0XHRcdHZhciBfdGhpczQgPSB0aGlzO1xuXG5cdFx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHRcdHRoaXMuc2V0VmFsdWUodmFsdWVBcnJheS5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0cmV0dXJuIGlbX3RoaXM0LnByb3BzLnZhbHVlS2V5XSAhPT0gdmFsdWVbX3RoaXM0LnByb3BzLnZhbHVlS2V5XTtcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjbGVhclZhbHVlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY2xlYXJWYWx1ZShldmVudCkge1xuXHRcdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdFx0Ly8gYnV0dG9uLCBpZ25vcmUgaXQuXG5cdFx0XHRpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dGhpcy5zZXRWYWx1ZSh0aGlzLmdldFJlc2V0VmFsdWUoKSk7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aW5wdXRWYWx1ZTogdGhpcy5oYW5kbGVJbnB1dFZhbHVlQ2hhbmdlKCcnKSxcblx0XHRcdFx0aXNPcGVuOiBmYWxzZVxuXHRcdFx0fSwgdGhpcy5mb2N1cyk7XG5cblx0XHRcdHRoaXMuX2ZvY3VzQWZ0ZXJDbGVhciA9IHRydWU7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZ2V0UmVzZXRWYWx1ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFJlc2V0VmFsdWUoKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5yZXNldFZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMucHJvcHMucmVzZXRWYWx1ZTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1c09wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzT3B0aW9uKG9wdGlvbikge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb246IG9wdGlvblxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXNOZXh0T3B0aW9uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXNOZXh0T3B0aW9uKCkge1xuXHRcdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCduZXh0Jyk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXNQcmV2aW91c09wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzUHJldmlvdXNPcHRpb24oKSB7XG5cdFx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3ByZXZpb3VzJyk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXNQYWdlVXBPcHRpb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmb2N1c1BhZ2VVcE9wdGlvbigpIHtcblx0XHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbigncGFnZV91cCcpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2ZvY3VzUGFnZURvd25PcHRpb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmb2N1c1BhZ2VEb3duT3B0aW9uKCkge1xuXHRcdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwYWdlX2Rvd24nKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1c1N0YXJ0T3B0aW9uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXNTdGFydE9wdGlvbigpIHtcblx0XHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignc3RhcnQnKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1c0VuZE9wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzRW5kT3B0aW9uKCkge1xuXHRcdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdlbmQnKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1c0FkamFjZW50T3B0aW9uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXNBZGphY2VudE9wdGlvbihkaXIpIHtcblx0XHRcdHZhciBvcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnMubWFwKGZ1bmN0aW9uIChvcHRpb24sIGluZGV4KSB7XG5cdFx0XHRcdHJldHVybiB7IG9wdGlvbjogb3B0aW9uLCBpbmRleDogaW5kZXggfTtcblx0XHRcdH0pLmZpbHRlcihmdW5jdGlvbiAob3B0aW9uKSB7XG5cdFx0XHRcdHJldHVybiAhb3B0aW9uLm9wdGlvbi5kaXNhYmxlZDtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgPSB0cnVlO1xuXHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0XHR2YXIgbmV3U3RhdGUgPSB7XG5cdFx0XHRcdFx0Zm9jdXNlZE9wdGlvbjogdGhpcy5fZm9jdXNlZE9wdGlvbiB8fCAob3B0aW9ucy5sZW5ndGggPyBvcHRpb25zW2RpciA9PT0gJ25leHQnID8gMCA6IG9wdGlvbnMubGVuZ3RoIC0gMV0ub3B0aW9uIDogbnVsbCksXG5cdFx0XHRcdFx0aXNPcGVuOiB0cnVlXG5cdFx0XHRcdH07XG5cdFx0XHRcdGlmICh0aGlzLnByb3BzLm9uU2VsZWN0UmVzZXRzSW5wdXQpIHtcblx0XHRcdFx0XHRuZXdTdGF0ZS5pbnB1dFZhbHVlID0gJyc7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICghb3B0aW9ucy5sZW5ndGgpIHJldHVybjtcblx0XHRcdHZhciBmb2N1c2VkSW5kZXggPSAtMTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAodGhpcy5fZm9jdXNlZE9wdGlvbiA9PT0gb3B0aW9uc1tpXS5vcHRpb24pIHtcblx0XHRcdFx0XHRmb2N1c2VkSW5kZXggPSBpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoZGlyID09PSAnbmV4dCcgJiYgZm9jdXNlZEluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSAoZm9jdXNlZEluZGV4ICsgMSkgJSBvcHRpb25zLmxlbmd0aDtcblx0XHRcdH0gZWxzZSBpZiAoZGlyID09PSAncHJldmlvdXMnKSB7XG5cdFx0XHRcdGlmIChmb2N1c2VkSW5kZXggPiAwKSB7XG5cdFx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gZm9jdXNlZEluZGV4IC0gMTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmb2N1c2VkSW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoZGlyID09PSAnc3RhcnQnKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IDA7XG5cdFx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ2VuZCcpIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXHRcdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwYWdlX3VwJykge1xuXHRcdFx0XHR2YXIgcG90ZW50aWFsSW5kZXggPSBmb2N1c2VkSW5kZXggLSB0aGlzLnByb3BzLnBhZ2VTaXplO1xuXHRcdFx0XHRpZiAocG90ZW50aWFsSW5kZXggPCAwKSB7XG5cdFx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gMDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmb2N1c2VkSW5kZXggPSBwb3RlbnRpYWxJbmRleDtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwYWdlX2Rvd24nKSB7XG5cdFx0XHRcdHZhciBfcG90ZW50aWFsSW5kZXggPSBmb2N1c2VkSW5kZXggKyB0aGlzLnByb3BzLnBhZ2VTaXplO1xuXHRcdFx0XHRpZiAoX3BvdGVudGlhbEluZGV4ID4gb3B0aW9ucy5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGZvY3VzZWRJbmRleCA9IF9wb3RlbnRpYWxJbmRleDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4OiBvcHRpb25zW2ZvY3VzZWRJbmRleF0uaW5kZXgsXG5cdFx0XHRcdGZvY3VzZWRPcHRpb246IG9wdGlvbnNbZm9jdXNlZEluZGV4XS5vcHRpb25cblx0XHRcdH0pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2dldEZvY3VzZWRPcHRpb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRGb2N1c2VkT3B0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2ZvY3VzZWRPcHRpb247XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnc2VsZWN0Rm9jdXNlZE9wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHNlbGVjdEZvY3VzZWRPcHRpb24oKSB7XG5cdFx0XHRpZiAodGhpcy5fZm9jdXNlZE9wdGlvbikge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3RWYWx1ZSh0aGlzLl9mb2N1c2VkT3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXJMb2FkaW5nJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyTG9hZGluZygpIHtcblx0XHRcdGlmICghdGhpcy5wcm9wcy5pc0xvYWRpbmcpIHJldHVybjtcblx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnc3BhbicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiAnU2VsZWN0LWxvYWRpbmctem9uZScsICdhcmlhLWhpZGRlbic6ICd0cnVlJyB9LFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBjbGFzc05hbWU6ICdTZWxlY3QtbG9hZGluZycgfSlcblx0XHRcdCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyVmFsdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJWYWx1ZSh2YWx1ZUFycmF5LCBpc09wZW4pIHtcblx0XHRcdHZhciBfdGhpczUgPSB0aGlzO1xuXG5cdFx0XHR2YXIgcmVuZGVyTGFiZWwgPSB0aGlzLnByb3BzLnZhbHVlUmVuZGVyZXIgfHwgdGhpcy5nZXRPcHRpb25MYWJlbDtcblx0XHRcdHZhciBWYWx1ZUNvbXBvbmVudCA9IHRoaXMucHJvcHMudmFsdWVDb21wb25lbnQ7XG5cdFx0XHRpZiAoIXZhbHVlQXJyYXkubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBzaG93UGxhY2Vob2xkZXIgPSBzaG91bGRTaG93UGxhY2Vob2xkZXIodGhpcy5zdGF0ZSwgdGhpcy5wcm9wcywgaXNPcGVuKTtcblx0XHRcdFx0cmV0dXJuIHNob3dQbGFjZWhvbGRlciA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdFx0eyBjbGFzc05hbWU6ICdTZWxlY3QtcGxhY2Vob2xkZXInIH0sXG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5wbGFjZWhvbGRlclxuXHRcdFx0XHQpIDogbnVsbDtcblx0XHRcdH1cblx0XHRcdHZhciBvbkNsaWNrID0gdGhpcy5wcm9wcy5vblZhbHVlQ2xpY2sgPyB0aGlzLmhhbmRsZVZhbHVlQ2xpY2sgOiBudWxsO1xuXHRcdFx0aWYgKHRoaXMucHJvcHMubXVsdGkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlQXJyYXkubWFwKGZ1bmN0aW9uICh2YWx1ZSwgaSkge1xuXHRcdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdFx0VmFsdWVDb21wb25lbnQsXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGRpc2FibGVkOiBfdGhpczUucHJvcHMuZGlzYWJsZWQgfHwgdmFsdWUuY2xlYXJhYmxlVmFsdWUgPT09IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRpZDogX3RoaXM1Ll9pbnN0YW5jZVByZWZpeCArICctdmFsdWUtJyArIGksXG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlUHJlZml4OiBfdGhpczUuX2luc3RhbmNlUHJlZml4LFxuXHRcdFx0XHRcdFx0XHRrZXk6ICd2YWx1ZS0nICsgaSArICctJyArIHZhbHVlW190aGlzNS5wcm9wcy52YWx1ZUtleV0sXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s6IG9uQ2xpY2ssXG5cdFx0XHRcdFx0XHRcdG9uUmVtb3ZlOiBfdGhpczUucmVtb3ZlVmFsdWUsXG5cdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyOiBfdGhpczUucHJvcHMucGxhY2Vob2xkZXIsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHJlbmRlckxhYmVsKHZhbHVlLCBpKSxcblx0XHRcdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0XHRcdCdzcGFuJyxcblx0XHRcdFx0XHRcdFx0eyBjbGFzc05hbWU6ICdTZWxlY3QtYXJpYS1vbmx5JyB9LFxuXHRcdFx0XHRcdFx0XHQnXFx4QTAnXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKHNob3VsZFNob3dWYWx1ZSh0aGlzLnN0YXRlLCB0aGlzLnByb3BzKSkge1xuXHRcdFx0XHRpZiAoaXNPcGVuKSBvbkNsaWNrID0gbnVsbDtcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0VmFsdWVDb21wb25lbnQsXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG5cdFx0XHRcdFx0XHRpZDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlLWl0ZW0nLFxuXHRcdFx0XHRcdFx0aW5zdGFuY2VQcmVmaXg6IHRoaXMuX2luc3RhbmNlUHJlZml4LFxuXHRcdFx0XHRcdFx0b25DbGljazogb25DbGljayxcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRcdFx0dmFsdWU6IHZhbHVlQXJyYXlbMF1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHJlbmRlckxhYmVsKHZhbHVlQXJyYXlbMF0pXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVySW5wdXQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJJbnB1dCh2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uSW5kZXgpIHtcblx0XHRcdHZhciBfY2xhc3NOYW1lcyxcblx0XHRcdCAgICBfdGhpczYgPSB0aGlzO1xuXG5cdFx0XHR2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygnU2VsZWN0LWlucHV0JywgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSk7XG5cdFx0XHR2YXIgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW47XG5cblx0XHRcdHZhciBhcmlhT3ducyA9IGNsYXNzTmFtZXMoKF9jbGFzc05hbWVzID0ge30sIGRlZmluZVByb3BlcnR5KF9jbGFzc05hbWVzLCB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCcsIGlzT3BlbiksIGRlZmluZVByb3BlcnR5KF9jbGFzc05hbWVzLCB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctYmFja3NwYWNlLXJlbW92ZS1tZXNzYWdlJywgdGhpcy5wcm9wcy5tdWx0aSAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiB0aGlzLnN0YXRlLmlzRm9jdXNlZCAmJiAhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlKSwgX2NsYXNzTmFtZXMpKTtcblxuXHRcdFx0dmFyIHZhbHVlID0gdGhpcy5zdGF0ZS5pbnB1dFZhbHVlO1xuXHRcdFx0aWYgKHZhbHVlICYmICF0aGlzLnByb3BzLm9uU2VsZWN0UmVzZXRzSW5wdXQgJiYgIXRoaXMuc3RhdGUuaXNGb2N1c2VkKSB7XG5cdFx0XHRcdC8vIGl0IGhpZGVzIGlucHV0IHZhbHVlIHdoZW4gaXQgaXMgbm90IGZvY3VzZWQgYW5kIHdhcyBub3QgcmVzZXQgb24gc2VsZWN0XG5cdFx0XHRcdHZhbHVlID0gJyc7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpbnB1dFByb3BzID0gX2V4dGVuZHMoe30sIHRoaXMucHJvcHMuaW5wdXRQcm9wcywge1xuXHRcdFx0XHQnYXJpYS1hY3RpdmVkZXNjZW5kYW50JzogaXNPcGVuID8gdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLW9wdGlvbi0nICsgZm9jdXNlZE9wdGlvbkluZGV4IDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJyxcblx0XHRcdFx0J2FyaWEtZGVzY3JpYmVkYnknOiB0aGlzLnByb3BzWydhcmlhLWRlc2NyaWJlZGJ5J10sXG5cdFx0XHRcdCdhcmlhLWV4cGFuZGVkJzogJycgKyBpc09wZW4sXG5cdFx0XHRcdCdhcmlhLWhhc3BvcHVwJzogJycgKyBpc09wZW4sXG5cdFx0XHRcdCdhcmlhLWxhYmVsJzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbCddLFxuXHRcdFx0XHQnYXJpYS1sYWJlbGxlZGJ5JzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbGxlZGJ5J10sXG5cdFx0XHRcdCdhcmlhLW93bnMnOiBhcmlhT3ducyxcblx0XHRcdFx0Y2xhc3NOYW1lOiBjbGFzc05hbWUsXG5cdFx0XHRcdG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dEJsdXIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLFxuXHRcdFx0XHRvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG5cdFx0XHRcdHJlZjogZnVuY3Rpb24gcmVmKF9yZWYpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXM2LmlucHV0ID0gX3JlZjtcblx0XHRcdFx0fSxcblx0XHRcdFx0cm9sZTogJ2NvbWJvYm94Jyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRoaXMuc3RhdGUucmVxdWlyZWQsXG5cdFx0XHRcdHRhYkluZGV4OiB0aGlzLnByb3BzLnRhYkluZGV4LFxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnByb3BzLmlucHV0UmVuZGVyZXIoaW5wdXRQcm9wcyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8ICF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcblx0XHRcdFx0dmFyIGRpdlByb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXModGhpcy5wcm9wcy5pbnB1dFByb3BzLCBbXSk7XG5cblxuXHRcdFx0XHR2YXIgX2FyaWFPd25zID0gY2xhc3NOYW1lcyhkZWZpbmVQcm9wZXJ0eSh7fSwgdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWxpc3QnLCBpc09wZW4pKTtcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIF9leHRlbmRzKHt9LCBkaXZQcm9wcywge1xuXHRcdFx0XHRcdCdhcmlhLWV4cGFuZGVkJzogaXNPcGVuLFxuXHRcdFx0XHRcdCdhcmlhLW93bnMnOiBfYXJpYU93bnMsXG5cdFx0XHRcdFx0J2FyaWEtYWN0aXZlZGVzY2VuZGFudCc6IGlzT3BlbiA/IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIGZvY3VzZWRPcHRpb25JbmRleCA6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZScsXG5cdFx0XHRcdFx0J2FyaWEtZGlzYWJsZWQnOiAnJyArIHRoaXMucHJvcHMuZGlzYWJsZWQsXG5cdFx0XHRcdFx0J2FyaWEtbGFiZWwnOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10sXG5cdFx0XHRcdFx0J2FyaWEtbGFiZWxsZWRieSc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWxsZWRieSddLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuXHRcdFx0XHRcdG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dEJsdXIsXG5cdFx0XHRcdFx0b25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLFxuXHRcdFx0XHRcdHJlZjogZnVuY3Rpb24gcmVmKF9yZWYyKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM2LmlucHV0ID0gX3JlZjI7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyb2xlOiAnY29tYm9ib3gnLFxuXHRcdFx0XHRcdHN0eWxlOiB7IGJvcmRlcjogMCwgd2lkdGg6IDEsIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snIH0sXG5cdFx0XHRcdFx0dGFiSW5kZXg6IHRoaXMucHJvcHMudGFiSW5kZXggfHwgMFxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnByb3BzLmF1dG9zaXplKSB7XG5cdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEF1dG9zaXplSW5wdXQsIF9leHRlbmRzKHsgaWQ6IHRoaXMucHJvcHMuaWQgfSwgaW5wdXRQcm9wcywgeyBtaW5XaWR0aDogJzUnIH0pKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0eyBjbGFzc05hbWU6IGNsYXNzTmFtZSwga2V5OiAnaW5wdXQtd3JhcCcsIHN0eWxlOiB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snIH0gfSxcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBfZXh0ZW5kcyh7IGlkOiB0aGlzLnByb3BzLmlkIH0sIGlucHV0UHJvcHMpKVxuXHRcdFx0KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXJDbGVhcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlckNsZWFyKCkge1xuXHRcdFx0dmFyIHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0XHRpZiAoIXRoaXMucHJvcHMuY2xlYXJhYmxlIHx8ICF2YWx1ZUFycmF5Lmxlbmd0aCB8fCB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRoaXMucHJvcHMuaXNMb2FkaW5nKSByZXR1cm47XG5cdFx0XHR2YXIgYXJpYUxhYmVsID0gdGhpcy5wcm9wcy5tdWx0aSA/IHRoaXMucHJvcHMuY2xlYXJBbGxUZXh0IDogdGhpcy5wcm9wcy5jbGVhclZhbHVlVGV4dDtcblx0XHRcdHZhciBjbGVhciA9IHRoaXMucHJvcHMuY2xlYXJSZW5kZXJlcigpO1xuXG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J3NwYW4nLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0J2FyaWEtbGFiZWwnOiBhcmlhTGFiZWwsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnU2VsZWN0LWNsZWFyLXpvbmUnLFxuXHRcdFx0XHRcdG9uTW91c2VEb3duOiB0aGlzLmNsZWFyVmFsdWUsXG5cdFx0XHRcdFx0b25Ub3VjaEVuZDogdGhpcy5oYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUsXG5cdFx0XHRcdFx0b25Ub3VjaE1vdmU6IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLFxuXHRcdFx0XHRcdG9uVG91Y2hTdGFydDogdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LFxuXHRcdFx0XHRcdHRpdGxlOiBhcmlhTGFiZWxcblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xlYXJcblx0XHRcdCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyQXJyb3cnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJBcnJvdygpIHtcblx0XHRcdGlmICghdGhpcy5wcm9wcy5hcnJvd1JlbmRlcmVyKSByZXR1cm47XG5cblx0XHRcdHZhciBvbk1vdXNlRG93biA9IHRoaXMuaGFuZGxlTW91c2VEb3duT25BcnJvdztcblx0XHRcdHZhciBpc09wZW4gPSB0aGlzLnN0YXRlLmlzT3Blbjtcblx0XHRcdHZhciBhcnJvdyA9IHRoaXMucHJvcHMuYXJyb3dSZW5kZXJlcih7IG9uTW91c2VEb3duOiBvbk1vdXNlRG93biwgaXNPcGVuOiBpc09wZW4gfSk7XG5cblx0XHRcdGlmICghYXJyb3cpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnc3BhbicsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdTZWxlY3QtYXJyb3ctem9uZScsXG5cdFx0XHRcdFx0b25Nb3VzZURvd246IG9uTW91c2VEb3duXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFycm93XG5cdFx0XHQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2ZpbHRlck9wdGlvbnMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmaWx0ZXJPcHRpb25zJCQxKGV4Y2x1ZGVPcHRpb25zKSB7XG5cdFx0XHR2YXIgZmlsdGVyVmFsdWUgPSB0aGlzLnN0YXRlLmlucHV0VmFsdWU7XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucyB8fCBbXTtcblx0XHRcdGlmICh0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMpIHtcblx0XHRcdFx0Ly8gTWFpbnRhaW4gYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCBib29sZWFuIGF0dHJpYnV0ZVxuXHRcdFx0XHR2YXIgZmlsdGVyT3B0aW9ucyQkMSA9IHR5cGVvZiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMgPT09ICdmdW5jdGlvbicgPyB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMgOiBmaWx0ZXJPcHRpb25zO1xuXG5cdFx0XHRcdHJldHVybiBmaWx0ZXJPcHRpb25zJCQxKG9wdGlvbnMsIGZpbHRlclZhbHVlLCBleGNsdWRlT3B0aW9ucywge1xuXHRcdFx0XHRcdGZpbHRlck9wdGlvbjogdGhpcy5wcm9wcy5maWx0ZXJPcHRpb24sXG5cdFx0XHRcdFx0aWdub3JlQWNjZW50czogdGhpcy5wcm9wcy5pZ25vcmVBY2NlbnRzLFxuXHRcdFx0XHRcdGlnbm9yZUNhc2U6IHRoaXMucHJvcHMuaWdub3JlQ2FzZSxcblx0XHRcdFx0XHRsYWJlbEtleTogdGhpcy5wcm9wcy5sYWJlbEtleSxcblx0XHRcdFx0XHRtYXRjaFBvczogdGhpcy5wcm9wcy5tYXRjaFBvcyxcblx0XHRcdFx0XHRtYXRjaFByb3A6IHRoaXMucHJvcHMubWF0Y2hQcm9wLFxuXHRcdFx0XHRcdHRyaW1GaWx0ZXI6IHRoaXMucHJvcHMudHJpbUZpbHRlcixcblx0XHRcdFx0XHR2YWx1ZUtleTogdGhpcy5wcm9wcy52YWx1ZUtleVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ29uT3B0aW9uUmVmJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gb25PcHRpb25SZWYocmVmLCBpc0ZvY3VzZWQpIHtcblx0XHRcdGlmIChpc0ZvY3VzZWQpIHtcblx0XHRcdFx0dGhpcy5mb2N1c2VkID0gcmVmO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlck1lbnUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJNZW51KG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIHtcblx0XHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnByb3BzLm1lbnVSZW5kZXJlcih7XG5cdFx0XHRcdFx0Zm9jdXNlZE9wdGlvbjogZm9jdXNlZE9wdGlvbixcblx0XHRcdFx0XHRmb2N1c09wdGlvbjogdGhpcy5mb2N1c09wdGlvbixcblx0XHRcdFx0XHRpbnB1dFZhbHVlOiB0aGlzLnN0YXRlLmlucHV0VmFsdWUsXG5cdFx0XHRcdFx0aW5zdGFuY2VQcmVmaXg6IHRoaXMuX2luc3RhbmNlUHJlZml4LFxuXHRcdFx0XHRcdGxhYmVsS2V5OiB0aGlzLnByb3BzLmxhYmVsS2V5LFxuXHRcdFx0XHRcdG9uRm9jdXM6IHRoaXMuZm9jdXNPcHRpb24sXG5cdFx0XHRcdFx0b25PcHRpb25SZWY6IHRoaXMub25PcHRpb25SZWYsXG5cdFx0XHRcdFx0b25TZWxlY3Q6IHRoaXMuc2VsZWN0VmFsdWUsXG5cdFx0XHRcdFx0b3B0aW9uQ2xhc3NOYW1lOiB0aGlzLnByb3BzLm9wdGlvbkNsYXNzTmFtZSxcblx0XHRcdFx0XHRvcHRpb25Db21wb25lbnQ6IHRoaXMucHJvcHMub3B0aW9uQ29tcG9uZW50LFxuXHRcdFx0XHRcdG9wdGlvblJlbmRlcmVyOiB0aGlzLnByb3BzLm9wdGlvblJlbmRlcmVyIHx8IHRoaXMuZ2V0T3B0aW9uTGFiZWwsXG5cdFx0XHRcdFx0b3B0aW9uczogb3B0aW9ucyxcblx0XHRcdFx0XHRyZW1vdmVWYWx1ZTogdGhpcy5yZW1vdmVWYWx1ZSxcblx0XHRcdFx0XHRzZWxlY3RWYWx1ZTogdGhpcy5zZWxlY3RWYWx1ZSxcblx0XHRcdFx0XHR2YWx1ZUFycmF5OiB2YWx1ZUFycmF5LFxuXHRcdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnByb3BzLnZhbHVlS2V5XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLm5vUmVzdWx0c1RleHQpIHtcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdFx0eyBjbGFzc05hbWU6ICdTZWxlY3Qtbm9yZXN1bHRzJyB9LFxuXHRcdFx0XHRcdHRoaXMucHJvcHMubm9SZXN1bHRzVGV4dFxuXHRcdFx0XHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVySGlkZGVuRmllbGQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJIaWRkZW5GaWVsZCh2YWx1ZUFycmF5KSB7XG5cdFx0XHR2YXIgX3RoaXM3ID0gdGhpcztcblxuXHRcdFx0aWYgKCF0aGlzLnByb3BzLm5hbWUpIHJldHVybjtcblx0XHRcdGlmICh0aGlzLnByb3BzLmpvaW5WYWx1ZXMpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gdmFsdWVBcnJheS5tYXAoZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0XHRyZXR1cm4gc3RyaW5naWZ5VmFsdWUoaVtfdGhpczcucHJvcHMudmFsdWVLZXldKTtcblx0XHRcdFx0fSkuam9pbih0aGlzLnByb3BzLmRlbGltaXRlcik7XG5cdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIHtcblx0XHRcdFx0XHRkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcblx0XHRcdFx0XHRuYW1lOiB0aGlzLnByb3BzLm5hbWUsXG5cdFx0XHRcdFx0cmVmOiBmdW5jdGlvbiByZWYoX3JlZjMpIHtcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczcudmFsdWUgPSBfcmVmMztcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHR5cGU6ICdoaWRkZW4nLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWx1ZUFycmF5Lm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xuXHRcdFx0XHRcdGRpc2FibGVkOiBfdGhpczcucHJvcHMuZGlzYWJsZWQsXG5cdFx0XHRcdFx0a2V5OiAnaGlkZGVuLicgKyBpbmRleCxcblx0XHRcdFx0XHRuYW1lOiBfdGhpczcucHJvcHMubmFtZSxcblx0XHRcdFx0XHRyZWY6ICd2YWx1ZScgKyBpbmRleCxcblx0XHRcdFx0XHR0eXBlOiAnaGlkZGVuJyxcblx0XHRcdFx0XHR2YWx1ZTogc3RyaW5naWZ5VmFsdWUoaXRlbVtfdGhpczcucHJvcHMudmFsdWVLZXldKVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2dldEZvY3VzYWJsZU9wdGlvbkluZGV4Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0Rm9jdXNhYmxlT3B0aW9uSW5kZXgoc2VsZWN0ZWRPcHRpb24pIHtcblx0XHRcdHZhciBvcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnM7XG5cdFx0XHRpZiAoIW9wdGlvbnMubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuXHRcdFx0dmFyIHZhbHVlS2V5ID0gdGhpcy5wcm9wcy52YWx1ZUtleTtcblx0XHRcdHZhciBmb2N1c2VkT3B0aW9uID0gdGhpcy5zdGF0ZS5mb2N1c2VkT3B0aW9uIHx8IHNlbGVjdGVkT3B0aW9uO1xuXHRcdFx0aWYgKGZvY3VzZWRPcHRpb24gJiYgIWZvY3VzZWRPcHRpb24uZGlzYWJsZWQpIHtcblx0XHRcdFx0dmFyIGZvY3VzZWRPcHRpb25JbmRleCA9IC0xO1xuXHRcdFx0XHRvcHRpb25zLnNvbWUoZnVuY3Rpb24gKG9wdGlvbiwgaW5kZXgpIHtcblx0XHRcdFx0XHR2YXIgaXNPcHRpb25FcXVhbCA9IG9wdGlvblt2YWx1ZUtleV0gPT09IGZvY3VzZWRPcHRpb25bdmFsdWVLZXldO1xuXHRcdFx0XHRcdGlmIChpc09wdGlvbkVxdWFsKSB7XG5cdFx0XHRcdFx0XHRmb2N1c2VkT3B0aW9uSW5kZXggPSBpbmRleDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGlzT3B0aW9uRXF1YWw7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAoZm9jdXNlZE9wdGlvbkluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHJldHVybiBmb2N1c2VkT3B0aW9uSW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmICghb3B0aW9uc1tpXS5kaXNhYmxlZCkgcmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXJPdXRlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlck91dGVyKG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIHtcblx0XHRcdHZhciBfdGhpczggPSB0aGlzO1xuXG5cdFx0XHR2YXIgbWVudSA9IHRoaXMucmVuZGVyTWVudShvcHRpb25zLCB2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uKTtcblx0XHRcdGlmICghbWVudSkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHR7IHJlZjogZnVuY3Rpb24gcmVmKF9yZWY1KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM4Lm1lbnVDb250YWluZXIgPSBfcmVmNTtcblx0XHRcdFx0XHR9LCBjbGFzc05hbWU6ICdTZWxlY3QtbWVudS1vdXRlcicsIHN0eWxlOiB0aGlzLnByb3BzLm1lbnVDb250YWluZXJTdHlsZSB9LFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ1NlbGVjdC1tZW51Jyxcblx0XHRcdFx0XHRcdGlkOiB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCcsXG5cdFx0XHRcdFx0XHRvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVNb3VzZURvd25Pbk1lbnUsXG5cdFx0XHRcdFx0XHRvblNjcm9sbDogdGhpcy5oYW5kbGVNZW51U2Nyb2xsLFxuXHRcdFx0XHRcdFx0cmVmOiBmdW5jdGlvbiByZWYoX3JlZjQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzOC5tZW51ID0gX3JlZjQ7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0cm9sZTogJ2xpc3Rib3gnLFxuXHRcdFx0XHRcdFx0c3R5bGU6IHRoaXMucHJvcHMubWVudVN0eWxlLFxuXHRcdFx0XHRcdFx0dGFiSW5kZXg6IC0xXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRtZW51XG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdFx0dmFyIF90aGlzOSA9IHRoaXM7XG5cblx0XHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdFx0dmFyIG9wdGlvbnMgPSB0aGlzLl92aXNpYmxlT3B0aW9ucyA9IHRoaXMuZmlsdGVyT3B0aW9ucyh0aGlzLnByb3BzLm11bHRpICYmIHRoaXMucHJvcHMucmVtb3ZlU2VsZWN0ZWQgPyB2YWx1ZUFycmF5IDogbnVsbCk7XG5cdFx0XHR2YXIgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW47XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSAmJiAhb3B0aW9ucy5sZW5ndGggJiYgdmFsdWVBcnJheS5sZW5ndGggJiYgIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSkgaXNPcGVuID0gZmFsc2U7XG5cdFx0XHR2YXIgZm9jdXNlZE9wdGlvbkluZGV4ID0gdGhpcy5nZXRGb2N1c2FibGVPcHRpb25JbmRleCh2YWx1ZUFycmF5WzBdKTtcblxuXHRcdFx0dmFyIGZvY3VzZWRPcHRpb24gPSBudWxsO1xuXHRcdFx0aWYgKGZvY3VzZWRPcHRpb25JbmRleCAhPT0gbnVsbCkge1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uID0gdGhpcy5fZm9jdXNlZE9wdGlvbiA9IG9wdGlvbnNbZm9jdXNlZE9wdGlvbkluZGV4XTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb24gPSB0aGlzLl9mb2N1c2VkT3B0aW9uID0gbnVsbDtcblx0XHRcdH1cblx0XHRcdHZhciBjbGFzc05hbWUgPSBjbGFzc05hbWVzKCdTZWxlY3QnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuXHRcdFx0XHQnaGFzLXZhbHVlJzogdmFsdWVBcnJheS5sZW5ndGgsXG5cdFx0XHRcdCdpcy1jbGVhcmFibGUnOiB0aGlzLnByb3BzLmNsZWFyYWJsZSxcblx0XHRcdFx0J2lzLWRpc2FibGVkJzogdGhpcy5wcm9wcy5kaXNhYmxlZCxcblx0XHRcdFx0J2lzLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmlzRm9jdXNlZCxcblx0XHRcdFx0J2lzLWxvYWRpbmcnOiB0aGlzLnByb3BzLmlzTG9hZGluZyxcblx0XHRcdFx0J2lzLW9wZW4nOiBpc09wZW4sXG5cdFx0XHRcdCdpcy1wc2V1ZG8tZm9jdXNlZCc6IHRoaXMuc3RhdGUuaXNQc2V1ZG9Gb2N1c2VkLFxuXHRcdFx0XHQnaXMtc2VhcmNoYWJsZSc6IHRoaXMucHJvcHMuc2VhcmNoYWJsZSxcblx0XHRcdFx0J1NlbGVjdC0tbXVsdGknOiB0aGlzLnByb3BzLm11bHRpLFxuXHRcdFx0XHQnU2VsZWN0LS1ydGwnOiB0aGlzLnByb3BzLnJ0bCxcblx0XHRcdFx0J1NlbGVjdC0tc2luZ2xlJzogIXRoaXMucHJvcHMubXVsdGlcblx0XHRcdH0pO1xuXG5cdFx0XHR2YXIgcmVtb3ZlTWVzc2FnZSA9IG51bGw7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiB2YWx1ZUFycmF5Lmxlbmd0aCAmJiAhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmIHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmIHRoaXMucHJvcHMuYmFja3NwYWNlUmVtb3Zlcykge1xuXHRcdFx0XHRyZW1vdmVNZXNzYWdlID0gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHQnc3BhbicsXG5cdFx0XHRcdFx0eyBpZDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWJhY2tzcGFjZS1yZW1vdmUtbWVzc2FnZScsIGNsYXNzTmFtZTogJ1NlbGVjdC1hcmlhLW9ubHknLCAnYXJpYS1saXZlJzogJ2Fzc2VydGl2ZScgfSxcblx0XHRcdFx0XHR0aGlzLnByb3BzLmJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZS5yZXBsYWNlKCd7bGFiZWx9JywgdmFsdWVBcnJheVt2YWx1ZUFycmF5Lmxlbmd0aCAtIDFdW3RoaXMucHJvcHMubGFiZWxLZXldKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdHsgcmVmOiBmdW5jdGlvbiByZWYoX3JlZjcpIHtcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczkud3JhcHBlciA9IF9yZWY3O1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBjbGFzc05hbWUsXG5cdFx0XHRcdFx0c3R5bGU6IHRoaXMucHJvcHMud3JhcHBlclN0eWxlIH0sXG5cdFx0XHRcdHRoaXMucmVuZGVySGlkZGVuRmllbGQodmFsdWVBcnJheSksXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdFx0eyByZWY6IGZ1bmN0aW9uIHJlZihfcmVmNikge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM5LmNvbnRyb2wgPSBfcmVmNjtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdTZWxlY3QtY29udHJvbCcsXG5cdFx0XHRcdFx0XHRvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bixcblx0XHRcdFx0XHRcdG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZU1vdXNlRG93bixcblx0XHRcdFx0XHRcdG9uVG91Y2hFbmQ6IHRoaXMuaGFuZGxlVG91Y2hFbmQsXG5cdFx0XHRcdFx0XHRvblRvdWNoTW92ZTogdGhpcy5oYW5kbGVUb3VjaE1vdmUsXG5cdFx0XHRcdFx0XHRvblRvdWNoU3RhcnQ6IHRoaXMuaGFuZGxlVG91Y2hTdGFydCxcblx0XHRcdFx0XHRcdHN0eWxlOiB0aGlzLnByb3BzLnN0eWxlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdFx0J3NwYW4nLFxuXHRcdFx0XHRcdFx0eyBjbGFzc05hbWU6ICdTZWxlY3QtbXVsdGktdmFsdWUtd3JhcHBlcicsIGlkOiB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctdmFsdWUnIH0sXG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlclZhbHVlKHZhbHVlQXJyYXksIGlzT3BlbiksXG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlcklucHV0KHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb25JbmRleClcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdHJlbW92ZU1lc3NhZ2UsXG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJMb2FkaW5nKCksXG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJDbGVhcigpLFxuXHRcdFx0XHRcdHRoaXMucmVuZGVyQXJyb3coKVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRpc09wZW4gPyB0aGlzLnJlbmRlck91dGVyKG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIDogbnVsbFxuXHRcdFx0KTtcblx0XHR9XG5cdH1dKTtcblx0cmV0dXJuIFNlbGVjdDtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuU2VsZWN0JDEucHJvcFR5cGVzID0ge1xuXHQnYXJpYS1kZXNjcmliZWRieSc6IFByb3BUeXBlcy5zdHJpbmcsIC8vIGh0bWwgaWQocykgb2YgZWxlbWVudChzKSB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIGRlc2NyaWJlIHRoaXMgaW5wdXQgKGZvciBhc3Npc3RpdmUgdGVjaClcblx0J2FyaWEtbGFiZWwnOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBhcmlhIGxhYmVsIChmb3IgYXNzaXN0aXZlIHRlY2gpXG5cdCdhcmlhLWxhYmVsbGVkYnknOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBodG1sIGlkIG9mIGFuIGVsZW1lbnQgdGhhdCBzaG91bGQgYmUgdXNlZCBhcyB0aGUgbGFiZWwgKGZvciBhc3Npc3RpdmUgdGVjaClcblx0YXJyb3dSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsIC8vIGNyZWF0ZSB0aGUgZHJvcC1kb3duIGNhcmV0IGVsZW1lbnRcblx0YXV0b0JsdXI6IFByb3BUeXBlcy5ib29sLCAvLyBhdXRvbWF0aWNhbGx5IGJsdXIgdGhlIGNvbXBvbmVudCB3aGVuIGFuIG9wdGlvbiBpcyBzZWxlY3RlZFxuXHRhdXRvRm9jdXM6IFByb3BUeXBlcy5ib29sLCAvLyBhdXRvZm9jdXMgdGhlIGNvbXBvbmVudCBvbiBtb3VudFxuXHRhdXRvZm9jdXM6IFByb3BUeXBlcy5ib29sLCAvLyBkZXByZWNhdGVkOyB1c2UgYXV0b0ZvY3VzIGluc3RlYWRcblx0YXV0b3NpemU6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIGVuYWJsZSBhdXRvc2l6aW5nIG9yIG5vdFxuXHRiYWNrc3BhY2VSZW1vdmVzOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciBiYWNrc3BhY2UgcmVtb3ZlcyBhbiBpdGVtIGlmIHRoZXJlIGlzIG5vIHRleHQgaW5wdXRcblx0YmFja3NwYWNlVG9SZW1vdmVNZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBtZXNzYWdlIHRvIHVzZSBmb3Igc2NyZWVucmVhZGVycyB0byBwcmVzcyBiYWNrc3BhY2UgdG8gcmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gLSB7bGFiZWx9IGlzIHJlcGxhY2VkIHdpdGggdGhlIGl0ZW0gbGFiZWxcblx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBjbGFzc05hbWUgZm9yIHRoZSBvdXRlciBlbGVtZW50XG5cdGNsZWFyQWxsVGV4dDogc3RyaW5nT3JOb2RlLCAvLyB0aXRsZSBmb3IgdGhlIFwiY2xlYXJcIiBjb250cm9sIHdoZW4gbXVsdGk6IHRydWVcblx0Y2xlYXJSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsIC8vIGNyZWF0ZSBjbGVhcmFibGUgeCBlbGVtZW50XG5cdGNsZWFyVmFsdWVUZXh0OiBzdHJpbmdPck5vZGUsIC8vIHRpdGxlIGZvciB0aGUgXCJjbGVhclwiIGNvbnRyb2xcblx0Y2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCwgLy8gc2hvdWxkIGl0IGJlIHBvc3NpYmxlIHRvIHJlc2V0IHZhbHVlXG5cdGNsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIGNsb3NlIHRoZSBtZW51IHdoZW4gYSB2YWx1ZSBpcyBzZWxlY3RlZFxuXHRkZWxldGVSZW1vdmVzOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciBkZWxldGUgcmVtb3ZlcyBhbiBpdGVtIGlmIHRoZXJlIGlzIG5vIHRleHQgaW5wdXRcblx0ZGVsaW1pdGVyOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBkZWxpbWl0ZXIgdG8gdXNlIHRvIGpvaW4gbXVsdGlwbGUgdmFsdWVzIGZvciB0aGUgaGlkZGVuIGZpZWxkIHZhbHVlXG5cdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciB0aGUgU2VsZWN0IGlzIGRpc2FibGVkIG9yIG5vdFxuXHRlc2NhcGVDbGVhcnNWYWx1ZTogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgZXNjYXBlIGNsZWFycyB0aGUgdmFsdWUgd2hlbiB0aGUgbWVudSBpcyBjbG9zZWRcblx0ZmlsdGVyT3B0aW9uOiBQcm9wVHlwZXMuZnVuYywgLy8gbWV0aG9kIHRvIGZpbHRlciBhIHNpbmdsZSBvcHRpb24gKG9wdGlvbiwgZmlsdGVyU3RyaW5nKVxuXHRmaWx0ZXJPcHRpb25zOiBQcm9wVHlwZXMuYW55LCAvLyBib29sZWFuIHRvIGVuYWJsZSBkZWZhdWx0IGZpbHRlcmluZyBvciBmdW5jdGlvbiB0byBmaWx0ZXIgdGhlIG9wdGlvbnMgYXJyYXkgKFtvcHRpb25zXSwgZmlsdGVyU3RyaW5nLCBbdmFsdWVzXSlcblx0aWQ6IFByb3BUeXBlcy5zdHJpbmcsIC8vIGh0bWwgaWQgdG8gc2V0IG9uIHRoZSBpbnB1dCBlbGVtZW50IGZvciBhY2Nlc3NpYmlsaXR5IG9yIHRlc3RzXG5cdGlnbm9yZUFjY2VudHM6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIHN0cmlwIGRpYWNyaXRpY3Mgd2hlbiBmaWx0ZXJpbmdcblx0aWdub3JlQ2FzZTogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgdG8gcGVyZm9ybSBjYXNlLWluc2Vuc2l0aXZlIGZpbHRlcmluZ1xuXHRpbnB1dFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LCAvLyBjdXN0b20gYXR0cmlidXRlcyBmb3IgdGhlIElucHV0XG5cdGlucHV0UmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAvLyByZXR1cm5zIGEgY3VzdG9tIGlucHV0IGNvbXBvbmVudFxuXHRpbnN0YW5jZUlkOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBzZXQgdGhlIGNvbXBvbmVudHMgaW5zdGFuY2VJZFxuXHRpc0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRoZSBTZWxlY3QgaXMgbG9hZGluZyBleHRlcm5hbGx5IG9yIG5vdCAoc3VjaCBhcyBvcHRpb25zIGJlaW5nIGxvYWRlZClcblx0am9pblZhbHVlczogUHJvcFR5cGVzLmJvb2wsIC8vIGpvaW5zIG11bHRpcGxlIHZhbHVlcyBpbnRvIGEgc2luZ2xlIGZvcm0gZmllbGQgd2l0aCB0aGUgZGVsaW1pdGVyIChsZWdhY3kgbW9kZSlcblx0bGFiZWxLZXk6IFByb3BUeXBlcy5zdHJpbmcsIC8vIHBhdGggb2YgdGhlIGxhYmVsIHZhbHVlIGluIG9wdGlvbiBvYmplY3RzXG5cdG1hdGNoUG9zOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyAoYW55fHN0YXJ0KSBtYXRjaCB0aGUgc3RhcnQgb3IgZW50aXJlIHN0cmluZyB3aGVuIGZpbHRlcmluZ1xuXHRtYXRjaFByb3A6IFByb3BUeXBlcy5zdHJpbmcsIC8vIChhbnl8bGFiZWx8dmFsdWUpIHdoaWNoIG9wdGlvbiBwcm9wZXJ0eSB0byBmaWx0ZXIgb25cblx0bWVudUJ1ZmZlcjogUHJvcFR5cGVzLm51bWJlciwgLy8gb3B0aW9uYWwgYnVmZmVyIChpbiBweCkgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCBhbmQgdGhlIGJvdHRvbSBvZiB0aGUgbWVudVxuXHRtZW51Q29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsIC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBtZW51IGNvbnRhaW5lclxuXHRtZW51UmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAvLyByZW5kZXJzIGEgY3VzdG9tIG1lbnUgd2l0aCBvcHRpb25zXG5cdG1lbnVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCwgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIG1lbnVcblx0bXVsdGk6IFByb3BUeXBlcy5ib29sLCAvLyBtdWx0aS12YWx1ZSBpbnB1dFxuXHRuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBnZW5lcmF0ZXMgYSBoaWRkZW4gPGlucHV0IC8+IHRhZyB3aXRoIHRoaXMgZmllbGQgbmFtZSBmb3IgaHRtbCBmb3Jtc1xuXHRub1Jlc3VsdHNUZXh0OiBzdHJpbmdPck5vZGUsIC8vIHBsYWNlaG9sZGVyIGRpc3BsYXllZCB3aGVuIHRoZXJlIGFyZSBubyBtYXRjaGluZyBzZWFyY2ggcmVzdWx0c1xuXHRvbkJsdXI6IFByb3BUeXBlcy5mdW5jLCAvLyBvbkJsdXIgaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxuXHRvbkJsdXJSZXNldHNJbnB1dDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgaW5wdXQgaXMgY2xlYXJlZCBvbiBibHVyXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYywgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7fVxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYywgLy8gZmlyZXMgd2hlbiB0aGUgbWVudSBpcyBjbG9zZWRcblx0b25DbG9zZVJlc2V0c0lucHV0OiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciBpbnB1dCBpcyBjbGVhcmVkIHdoZW4gbWVudSBpcyBjbG9zZWQgdGhyb3VnaCB0aGUgYXJyb3dcblx0b25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsIC8vIG9uRm9jdXMgaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxuXHRvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYywgLy8gb25JbnB1dENoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAoaW5wdXRWYWx1ZSkge31cblx0b25JbnB1dEtleURvd246IFByb3BUeXBlcy5mdW5jLCAvLyBpbnB1dCBrZXlEb3duIGhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge31cblx0b25NZW51U2Nyb2xsVG9Cb3R0b206IFByb3BUeXBlcy5mdW5jLCAvLyBmaXJlcyB3aGVuIHRoZSBtZW51IGlzIHNjcm9sbGVkIHRvIHRoZSBib3R0b207IGNhbiBiZSB1c2VkIHRvIHBhZ2luYXRlIG9wdGlvbnNcblx0b25PcGVuOiBQcm9wVHlwZXMuZnVuYywgLy8gZmlyZXMgd2hlbiB0aGUgbWVudSBpcyBvcGVuZWRcblx0b25TZWxlY3RSZXNldHNJbnB1dDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgaW5wdXQgaXMgY2xlYXJlZCBvbiBzZWxlY3QgKHdvcmtzIG9ubHkgZm9yIG11bHRpc2VsZWN0KVxuXHRvblZhbHVlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLCAvLyBvbkNsaWNrIGhhbmRsZXIgZm9yIHZhbHVlIGxhYmVsczogZnVuY3Rpb24gKHZhbHVlLCBldmVudCkge31cblx0b3Blbk9uQ2xpY2s6IFByb3BUeXBlcy5ib29sLCAvLyBib29sZWFuIHRvIGNvbnRyb2wgb3BlbmluZyB0aGUgbWVudSB3aGVuIHRoZSBjb250cm9sIGlzIGNsaWNrZWRcblx0b3Blbk9uRm9jdXM6IFByb3BUeXBlcy5ib29sLCAvLyBhbHdheXMgb3BlbiBvcHRpb25zIG1lbnUgb24gZm9jdXNcblx0b3B0aW9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBhZGRpdGlvbmFsIGNsYXNzKGVzKSB0byBhcHBseSB0byB0aGUgPE9wdGlvbiAvPiBlbGVtZW50c1xuXHRvcHRpb25Db21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLCAvLyBvcHRpb24gY29tcG9uZW50IHRvIHJlbmRlciBpbiBkcm9wZG93blxuXHRvcHRpb25SZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsIC8vIG9wdGlvblJlbmRlcmVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxuXHRvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXksIC8vIGFycmF5IG9mIG9wdGlvbnNcblx0cGFnZVNpemU6IFByb3BUeXBlcy5udW1iZXIsIC8vIG51bWJlciBvZiBlbnRyaWVzIHRvIHBhZ2Ugd2hlbiB1c2luZyBwYWdlIHVwL2Rvd24ga2V5c1xuXHRwbGFjZWhvbGRlcjogc3RyaW5nT3JOb2RlLCAvLyBmaWVsZCBwbGFjZWhvbGRlciwgZGlzcGxheWVkIHdoZW4gdGhlcmUncyBubyB2YWx1ZVxuXHRyZW1vdmVTZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgdGhlIHNlbGVjdGVkIG9wdGlvbiBpcyByZW1vdmVkIGZyb20gdGhlIGRyb3Bkb3duIG9uIG11bHRpIHNlbGVjdHNcblx0cmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLCAvLyBhcHBsaWVzIEhUTUw1IHJlcXVpcmVkIGF0dHJpYnV0ZSB3aGVuIG5lZWRlZFxuXHRyZXNldFZhbHVlOiBQcm9wVHlwZXMuYW55LCAvLyB2YWx1ZSB0byB1c2Ugd2hlbiB5b3UgY2xlYXIgdGhlIGNvbnRyb2xcblx0cnRsOiBQcm9wVHlwZXMuYm9vbCwgLy8gc2V0IHRvIHRydWUgaW4gb3JkZXIgdG8gdXNlIHJlYWN0LXNlbGVjdCBpbiByaWdodC10by1sZWZ0IGRpcmVjdGlvblxuXHRzY3JvbGxNZW51SW50b1ZpZXc6IFByb3BUeXBlcy5ib29sLCAvLyBib29sZWFuIHRvIGVuYWJsZSB0aGUgdmlld3BvcnQgdG8gc2hpZnQgc28gdGhhdCB0aGUgZnVsbCBtZW51IGZ1bGx5IHZpc2libGUgd2hlbiBlbmdhZ2VkXG5cdHNlYXJjaGFibGU6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIGVuYWJsZSBzZWFyY2hpbmcgZmVhdHVyZSBvciBub3Rcblx0c2ltcGxlVmFsdWU6IFByb3BUeXBlcy5ib29sLCAvLyBwYXNzIHRoZSB2YWx1ZSB0byBvbkNoYW5nZSBhcyBhIHNpbXBsZSB2YWx1ZSAobGVnYWN5IHByZSAxLjAgbW9kZSksIGRlZmF1bHRzIHRvIGZhbHNlXG5cdHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LCAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgY29udHJvbFxuXHR0YWJJbmRleDogc3RyaW5nT3JOdW1iZXIsIC8vIG9wdGlvbmFsIHRhYiBpbmRleCBvZiB0aGUgY29udHJvbFxuXHR0YWJTZWxlY3RzVmFsdWU6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIHRyZWF0IHRhYmJpbmcgb3V0IHdoaWxlIGZvY3VzZWQgdG8gYmUgdmFsdWUgc2VsZWN0aW9uXG5cdHRyaW1GaWx0ZXI6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIHRyaW0gd2hpdGVzcGFjZSBhcm91bmQgZmlsdGVyIHZhbHVlXG5cdHZhbHVlOiBQcm9wVHlwZXMuYW55LCAvLyBpbml0aWFsIGZpZWxkIHZhbHVlXG5cdHZhbHVlQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYywgLy8gdmFsdWUgY29tcG9uZW50IHRvIHJlbmRlclxuXHR2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZywgLy8gcGF0aCBvZiB0aGUgbGFiZWwgdmFsdWUgaW4gb3B0aW9uIG9iamVjdHNcblx0dmFsdWVSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsIC8vIHZhbHVlUmVuZGVyZXI6IGZ1bmN0aW9uIChvcHRpb24pIHt9XG5cdHdyYXBwZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdCAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgY29tcG9uZW50IHdyYXBwZXJcbn07XG5cblNlbGVjdCQxLmRlZmF1bHRQcm9wcyA9IHtcblx0YXJyb3dSZW5kZXJlcjogYXJyb3dSZW5kZXJlcixcblx0YXV0b3NpemU6IHRydWUsXG5cdGJhY2tzcGFjZVJlbW92ZXM6IHRydWUsXG5cdGJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZTogJ1ByZXNzIGJhY2tzcGFjZSB0byByZW1vdmUge2xhYmVsfScsXG5cdGNsZWFyYWJsZTogdHJ1ZSxcblx0Y2xlYXJBbGxUZXh0OiAnQ2xlYXIgYWxsJyxcblx0Y2xlYXJSZW5kZXJlcjogY2xlYXJSZW5kZXJlcixcblx0Y2xlYXJWYWx1ZVRleHQ6ICdDbGVhciB2YWx1ZScsXG5cdGNsb3NlT25TZWxlY3Q6IHRydWUsXG5cdGRlbGV0ZVJlbW92ZXM6IHRydWUsXG5cdGRlbGltaXRlcjogJywnLFxuXHRkaXNhYmxlZDogZmFsc2UsXG5cdGVzY2FwZUNsZWFyc1ZhbHVlOiB0cnVlLFxuXHRmaWx0ZXJPcHRpb25zOiBmaWx0ZXJPcHRpb25zLFxuXHRpZ25vcmVBY2NlbnRzOiB0cnVlLFxuXHRpZ25vcmVDYXNlOiB0cnVlLFxuXHRpbnB1dFByb3BzOiB7fSxcblx0aXNMb2FkaW5nOiBmYWxzZSxcblx0am9pblZhbHVlczogZmFsc2UsXG5cdGxhYmVsS2V5OiAnbGFiZWwnLFxuXHRtYXRjaFBvczogJ2FueScsXG5cdG1hdGNoUHJvcDogJ2FueScsXG5cdG1lbnVCdWZmZXI6IDAsXG5cdG1lbnVSZW5kZXJlcjogbWVudVJlbmRlcmVyLFxuXHRtdWx0aTogZmFsc2UsXG5cdG5vUmVzdWx0c1RleHQ6ICdObyByZXN1bHRzIGZvdW5kJyxcblx0b25CbHVyUmVzZXRzSW5wdXQ6IHRydWUsXG5cdG9uQ2xvc2VSZXNldHNJbnB1dDogdHJ1ZSxcblx0b25TZWxlY3RSZXNldHNJbnB1dDogdHJ1ZSxcblx0b3Blbk9uQ2xpY2s6IHRydWUsXG5cdG9wdGlvbkNvbXBvbmVudDogT3B0aW9uLFxuXHRwYWdlU2l6ZTogNSxcblx0cGxhY2Vob2xkZXI6ICdTZWxlY3QuLi4nLFxuXHRyZW1vdmVTZWxlY3RlZDogdHJ1ZSxcblx0cmVxdWlyZWQ6IGZhbHNlLFxuXHRydGw6IGZhbHNlLFxuXHRzY3JvbGxNZW51SW50b1ZpZXc6IHRydWUsXG5cdHNlYXJjaGFibGU6IHRydWUsXG5cdHNpbXBsZVZhbHVlOiBmYWxzZSxcblx0dGFiU2VsZWN0c1ZhbHVlOiB0cnVlLFxuXHR0cmltRmlsdGVyOiB0cnVlLFxuXHR2YWx1ZUNvbXBvbmVudDogVmFsdWUsXG5cdHZhbHVlS2V5OiAndmFsdWUnXG59O1xuXG52YXIgcHJvcFR5cGVzID0ge1xuXHRhdXRvbG9hZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCwgLy8gYXV0b21hdGljYWxseSBjYWxsIHRoZSBgbG9hZE9wdGlvbnNgIHByb3Agb24tbW91bnQ7IGRlZmF1bHRzIHRvIHRydWVcblx0Y2FjaGU6IFByb3BUeXBlcy5hbnksIC8vIG9iamVjdCB0byB1c2UgdG8gY2FjaGUgcmVzdWx0czsgc2V0IHRvIG51bGwvZmFsc2UgdG8gZGlzYWJsZSBjYWNoaW5nXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLCAvLyBDaGlsZCBmdW5jdGlvbiByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIGlubmVyIFNlbGVjdCBjb21wb25lbnQ7IChwcm9wczogT2JqZWN0KTogUHJvcFR5cGVzLmVsZW1lbnRcblx0aWdub3JlQWNjZW50czogUHJvcFR5cGVzLmJvb2wsIC8vIHN0cmlwIGRpYWNyaXRpY3Mgd2hlbiBmaWx0ZXJpbmc7IGRlZmF1bHRzIHRvIHRydWVcblx0aWdub3JlQ2FzZTogUHJvcFR5cGVzLmJvb2wsIC8vIHBlcmZvcm0gY2FzZS1pbnNlbnNpdGl2ZSBmaWx0ZXJpbmc7IGRlZmF1bHRzIHRvIHRydWVcblx0bG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsIC8vIGNhbGxiYWNrIHRvIGxvYWQgb3B0aW9ucyBhc3luY2hyb25vdXNseTsgKGlucHV0VmFsdWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogP1Byb21pc2Vcblx0bG9hZGluZ1BsYWNlaG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFsvLyByZXBsYWNlcyB0aGUgcGxhY2Vob2xkZXIgd2hpbGUgb3B0aW9ucyBhcmUgbG9hZGluZ1xuXHRQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuXHRtdWx0aTogUHJvcFR5cGVzLmJvb2wsIC8vIG11bHRpLXZhbHVlIGlucHV0XG5cdG5vUmVzdWx0c1RleHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoWy8vIGZpZWxkIG5vUmVzdWx0c1RleHQsIGRpc3BsYXllZCB3aGVuIG5vIG9wdGlvbnMgY29tZSBiYWNrIGZyb20gdGhlIHNlcnZlclxuXHRQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsIC8vIG9uQ2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge31cblx0b25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsIC8vIG9wdGlvbmFsIGZvciBrZWVwaW5nIHRyYWNrIG9mIHdoYXQgaXMgYmVpbmcgdHlwZWRcblx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsIC8vIGFycmF5IG9mIG9wdGlvbnNcblx0cGxhY2Vob2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoWy8vIGZpZWxkIHBsYWNlaG9sZGVyLCBkaXNwbGF5ZWQgd2hlbiB0aGVyZSdzIG5vIHZhbHVlIChzaGFyZWQgd2l0aCBTZWxlY3QpXG5cdFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG5cdHNlYXJjaFByb21wdFRleHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoWy8vIGxhYmVsIHRvIHByb21wdCBmb3Igc2VhcmNoIGlucHV0XG5cdFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG5cdHZhbHVlOiBQcm9wVHlwZXMuYW55IC8vIGluaXRpYWwgZmllbGQgdmFsdWVcbn07XG5cbnZhciBkZWZhdWx0Q2FjaGUgPSB7fTtcblxudmFyIGRlZmF1bHRDaGlsZHJlbiA9IGZ1bmN0aW9uIGRlZmF1bHRDaGlsZHJlbihwcm9wcykge1xuXHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QkMSwgcHJvcHMpO1xufTtcblxudmFyIGRlZmF1bHRQcm9wcyA9IHtcblx0YXV0b2xvYWQ6IHRydWUsXG5cdGNhY2hlOiBkZWZhdWx0Q2FjaGUsXG5cdGNoaWxkcmVuOiBkZWZhdWx0Q2hpbGRyZW4sXG5cdGlnbm9yZUFjY2VudHM6IHRydWUsXG5cdGlnbm9yZUNhc2U6IHRydWUsXG5cdGxvYWRpbmdQbGFjZWhvbGRlcjogJ0xvYWRpbmcuLi4nLFxuXHRvcHRpb25zOiBbXSxcblx0c2VhcmNoUHJvbXB0VGV4dDogJ1R5cGUgdG8gc2VhcmNoJ1xufTtcblxudmFyIEFzeW5jID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcblx0aW5oZXJpdHMoQXN5bmMsIF9Db21wb25lbnQpO1xuXG5cdGZ1bmN0aW9uIEFzeW5jKHByb3BzLCBjb250ZXh0KSB7XG5cdFx0Y2xhc3NDYWxsQ2hlY2sodGhpcywgQXN5bmMpO1xuXG5cdFx0dmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQXN5bmMuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihBc3luYykpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuXHRcdF90aGlzLl9jYWNoZSA9IHByb3BzLmNhY2hlID09PSBkZWZhdWx0Q2FjaGUgPyB7fSA6IHByb3BzLmNhY2hlO1xuXG5cdFx0X3RoaXMuc3RhdGUgPSB7XG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRvcHRpb25zOiBwcm9wcy5vcHRpb25zXG5cdFx0fTtcblxuXHRcdF90aGlzLm9uSW5wdXRDaGFuZ2UgPSBfdGhpcy5vbklucHV0Q2hhbmdlLmJpbmQoX3RoaXMpO1xuXHRcdHJldHVybiBfdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNsYXNzKEFzeW5jLCBbe1xuXHRcdGtleTogJ2NvbXBvbmVudERpZE1vdW50Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0XHR2YXIgYXV0b2xvYWQgPSB0aGlzLnByb3BzLmF1dG9sb2FkO1xuXG5cblx0XHRcdGlmIChhdXRvbG9hZCkge1xuXHRcdFx0XHR0aGlzLmxvYWRPcHRpb25zKCcnKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcblx0XHRcdGlmIChuZXh0UHJvcHMub3B0aW9ucyAhPT0gdGhpcy5wcm9wcy5vcHRpb25zKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdG9wdGlvbnM6IG5leHRQcm9wcy5vcHRpb25zXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0XHR0aGlzLl9jYWxsYmFjayA9IG51bGw7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnbG9hZE9wdGlvbnMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBsb2FkT3B0aW9ucyhpbnB1dFZhbHVlKSB7XG5cdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0dmFyIGxvYWRPcHRpb25zID0gdGhpcy5wcm9wcy5sb2FkT3B0aW9ucztcblxuXHRcdFx0dmFyIGNhY2hlID0gdGhpcy5fY2FjaGU7XG5cblx0XHRcdGlmIChjYWNoZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIGlucHV0VmFsdWUpKSB7XG5cdFx0XHRcdHRoaXMuX2NhbGxiYWNrID0gbnVsbDtcblxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHRcdG9wdGlvbnM6IGNhY2hlW2lucHV0VmFsdWVdXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gY2FsbGJhY2soZXJyb3IsIGRhdGEpIHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSBkYXRhICYmIGRhdGEub3B0aW9ucyB8fCBbXTtcblxuXHRcdFx0XHRpZiAoY2FjaGUpIHtcblx0XHRcdFx0XHRjYWNoZVtpbnB1dFZhbHVlXSA9IG9wdGlvbnM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY2FsbGJhY2sgPT09IF90aGlzMi5fY2FsbGJhY2spIHtcblx0XHRcdFx0XHRfdGhpczIuX2NhbGxiYWNrID0gbnVsbDtcblxuXHRcdFx0XHRcdF90aGlzMi5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHRcdFx0b3B0aW9uczogb3B0aW9uc1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBJZ25vcmUgYWxsIGJ1dCB0aGUgbW9zdCByZWNlbnQgcmVxdWVzdFxuXHRcdFx0dGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdFx0dmFyIHByb21pc2UgPSBsb2FkT3B0aW9ucyhpbnB1dFZhbHVlLCBjYWxsYmFjayk7XG5cdFx0XHRpZiAocHJvbWlzZSkge1xuXHRcdFx0XHRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobnVsbCwgZGF0YSk7XG5cdFx0XHRcdH0sIGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fY2FsbGJhY2sgJiYgIXRoaXMuc3RhdGUuaXNMb2FkaW5nKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzTG9hZGluZzogdHJ1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdvbklucHV0Q2hhbmdlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gb25JbnB1dENoYW5nZShpbnB1dFZhbHVlKSB7XG5cdFx0XHR2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcblx0XHRcdCAgICBpZ25vcmVBY2NlbnRzID0gX3Byb3BzLmlnbm9yZUFjY2VudHMsXG5cdFx0XHQgICAgaWdub3JlQ2FzZSA9IF9wcm9wcy5pZ25vcmVDYXNlLFxuXHRcdFx0ICAgIG9uSW5wdXRDaGFuZ2UgPSBfcHJvcHMub25JbnB1dENoYW5nZTtcblxuXHRcdFx0dmFyIG5ld0lucHV0VmFsdWUgPSBpbnB1dFZhbHVlO1xuXG5cdFx0XHRpZiAob25JbnB1dENoYW5nZSkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSBvbklucHV0Q2hhbmdlKG5ld0lucHV0VmFsdWUpO1xuXHRcdFx0XHQvLyBOb3RlOiAhPSB1c2VkIGRlbGliZXJhdGVseSBoZXJlIHRvIGNhdGNoIHVuZGVmaW5lZCBhbmQgbnVsbFxuXHRcdFx0XHRpZiAodmFsdWUgIT0gbnVsbCAmJiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdG5ld0lucHV0VmFsdWUgPSAnJyArIHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0cmFuc2Zvcm1lZElucHV0VmFsdWUgPSBuZXdJbnB1dFZhbHVlO1xuXG5cdFx0XHRpZiAoaWdub3JlQWNjZW50cykge1xuXHRcdFx0XHR0cmFuc2Zvcm1lZElucHV0VmFsdWUgPSBzdHJpcERpYWNyaXRpY3ModHJhbnNmb3JtZWRJbnB1dFZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlnbm9yZUNhc2UpIHtcblx0XHRcdFx0dHJhbnNmb3JtZWRJbnB1dFZhbHVlID0gdHJhbnNmb3JtZWRJbnB1dFZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBuZXdJbnB1dFZhbHVlIH0pO1xuXHRcdFx0dGhpcy5sb2FkT3B0aW9ucyh0cmFuc2Zvcm1lZElucHV0VmFsdWUpO1xuXG5cdFx0XHQvLyBSZXR1cm4gbmV3IGlucHV0IHZhbHVlLCBidXQgd2l0aG91dCBhcHBseWluZyB0b0xvd2VyQ2FzZSgpIHRvIGF2b2lkIG1vZGlmeWluZyB0aGUgdXNlcidzIHZpZXcgY2FzZSBvZiB0aGUgaW5wdXQgd2hpbGUgdHlwaW5nLlxuXHRcdFx0cmV0dXJuIG5ld0lucHV0VmFsdWU7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnbm9SZXN1bHRzVGV4dCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG5vUmVzdWx0c1RleHQoKSB7XG5cdFx0XHR2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHMsXG5cdFx0XHQgICAgbG9hZGluZ1BsYWNlaG9sZGVyID0gX3Byb3BzMi5sb2FkaW5nUGxhY2Vob2xkZXIsXG5cdFx0XHQgICAgbm9SZXN1bHRzVGV4dCA9IF9wcm9wczIubm9SZXN1bHRzVGV4dCxcblx0XHRcdCAgICBzZWFyY2hQcm9tcHRUZXh0ID0gX3Byb3BzMi5zZWFyY2hQcm9tcHRUZXh0O1xuXHRcdFx0dmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGUsXG5cdFx0XHQgICAgaW5wdXRWYWx1ZSA9IF9zdGF0ZS5pbnB1dFZhbHVlLFxuXHRcdFx0ICAgIGlzTG9hZGluZyA9IF9zdGF0ZS5pc0xvYWRpbmc7XG5cblxuXHRcdFx0aWYgKGlzTG9hZGluZykge1xuXHRcdFx0XHRyZXR1cm4gbG9hZGluZ1BsYWNlaG9sZGVyO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGlucHV0VmFsdWUgJiYgbm9SZXN1bHRzVGV4dCkge1xuXHRcdFx0XHRyZXR1cm4gbm9SZXN1bHRzVGV4dDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWFyY2hQcm9tcHRUZXh0O1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2ZvY3VzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXMoKSB7XG5cdFx0XHR0aGlzLnNlbGVjdC5mb2N1cygpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHZhciBfdGhpczMgPSB0aGlzO1xuXG5cdFx0XHR2YXIgX3Byb3BzMyA9IHRoaXMucHJvcHMsXG5cdFx0XHQgICAgY2hpbGRyZW4gPSBfcHJvcHMzLmNoaWxkcmVuLFxuXHRcdFx0ICAgIGxvYWRpbmdQbGFjZWhvbGRlciA9IF9wcm9wczMubG9hZGluZ1BsYWNlaG9sZGVyLFxuXHRcdFx0ICAgIHBsYWNlaG9sZGVyID0gX3Byb3BzMy5wbGFjZWhvbGRlcjtcblx0XHRcdHZhciBfc3RhdGUyID0gdGhpcy5zdGF0ZSxcblx0XHRcdCAgICBpc0xvYWRpbmcgPSBfc3RhdGUyLmlzTG9hZGluZyxcblx0XHRcdCAgICBvcHRpb25zID0gX3N0YXRlMi5vcHRpb25zO1xuXG5cblx0XHRcdHZhciBwcm9wcyA9IHtcblx0XHRcdFx0bm9SZXN1bHRzVGV4dDogdGhpcy5ub1Jlc3VsdHNUZXh0KCksXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBpc0xvYWRpbmcgPyBsb2FkaW5nUGxhY2Vob2xkZXIgOiBwbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogaXNMb2FkaW5nICYmIGxvYWRpbmdQbGFjZWhvbGRlciA/IFtdIDogb3B0aW9ucyxcblx0XHRcdFx0cmVmOiBmdW5jdGlvbiByZWYoX3JlZikge1xuXHRcdFx0XHRcdHJldHVybiBfdGhpczMuc2VsZWN0ID0gX3JlZjtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0cmV0dXJuIGNoaWxkcmVuKF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCBwcm9wcywge1xuXHRcdFx0XHRpc0xvYWRpbmc6IGlzTG9hZGluZyxcblx0XHRcdFx0b25JbnB1dENoYW5nZTogdGhpcy5vbklucHV0Q2hhbmdlXG5cdFx0XHR9KSk7XG5cdFx0fVxuXHR9XSk7XG5cdHJldHVybiBBc3luYztcbn0oQ29tcG9uZW50KTtcblxuQXN5bmMucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuQXN5bmMuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG52YXIgQ3JlYXRhYmxlU2VsZWN0ID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcblx0aW5oZXJpdHMoQ3JlYXRhYmxlU2VsZWN0LCBfUmVhY3QkQ29tcG9uZW50KTtcblxuXHRmdW5jdGlvbiBDcmVhdGFibGVTZWxlY3QocHJvcHMsIGNvbnRleHQpIHtcblx0XHRjbGFzc0NhbGxDaGVjayh0aGlzLCBDcmVhdGFibGVTZWxlY3QpO1xuXG5cdFx0dmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ3JlYXRhYmxlU2VsZWN0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ3JlYXRhYmxlU2VsZWN0KSkuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG5cdFx0X3RoaXMuZmlsdGVyT3B0aW9ucyA9IF90aGlzLmZpbHRlck9wdGlvbnMuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMubWVudVJlbmRlcmVyID0gX3RoaXMubWVudVJlbmRlcmVyLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLm9uSW5wdXRLZXlEb3duID0gX3RoaXMub25JbnB1dEtleURvd24uYmluZChfdGhpcyk7XG5cdFx0X3RoaXMub25JbnB1dENoYW5nZSA9IF90aGlzLm9uSW5wdXRDaGFuZ2UuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMub25PcHRpb25TZWxlY3QgPSBfdGhpcy5vbk9wdGlvblNlbGVjdC5iaW5kKF90aGlzKTtcblx0XHRyZXR1cm4gX3RoaXM7XG5cdH1cblxuXHRjcmVhdGVDbGFzcyhDcmVhdGFibGVTZWxlY3QsIFt7XG5cdFx0a2V5OiAnY3JlYXRlTmV3T3B0aW9uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY3JlYXRlTmV3T3B0aW9uKCkge1xuXHRcdFx0dmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG5cdFx0XHQgICAgaXNWYWxpZE5ld09wdGlvbiA9IF9wcm9wcy5pc1ZhbGlkTmV3T3B0aW9uLFxuXHRcdFx0ICAgIG5ld09wdGlvbkNyZWF0b3IgPSBfcHJvcHMubmV3T3B0aW9uQ3JlYXRvcixcblx0XHRcdCAgICBvbk5ld09wdGlvbkNsaWNrID0gX3Byb3BzLm9uTmV3T3B0aW9uQ2xpY2ssXG5cdFx0XHQgICAgX3Byb3BzJG9wdGlvbnMgPSBfcHJvcHMub3B0aW9ucyxcblx0XHRcdCAgICBvcHRpb25zID0gX3Byb3BzJG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/IFtdIDogX3Byb3BzJG9wdGlvbnM7XG5cblxuXHRcdFx0aWYgKGlzVmFsaWROZXdPcHRpb24oeyBsYWJlbDogdGhpcy5pbnB1dFZhbHVlIH0pKSB7XG5cdFx0XHRcdHZhciBvcHRpb24gPSBuZXdPcHRpb25DcmVhdG9yKHsgbGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSwgbGFiZWxLZXk6IHRoaXMubGFiZWxLZXksIHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5IH0pO1xuXHRcdFx0XHR2YXIgX2lzT3B0aW9uVW5pcXVlID0gdGhpcy5pc09wdGlvblVuaXF1ZSh7IG9wdGlvbjogb3B0aW9uLCBvcHRpb25zOiBvcHRpb25zIH0pO1xuXG5cdFx0XHRcdC8vIERvbid0IGFkZCB0aGUgc2FtZSBvcHRpb24gdHdpY2UuXG5cdFx0XHRcdGlmIChfaXNPcHRpb25VbmlxdWUpIHtcblx0XHRcdFx0XHRpZiAob25OZXdPcHRpb25DbGljaykge1xuXHRcdFx0XHRcdFx0b25OZXdPcHRpb25DbGljayhvcHRpb24pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRvcHRpb25zLnVuc2hpZnQob3B0aW9uKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5zZWxlY3Quc2VsZWN0VmFsdWUob3B0aW9uKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmaWx0ZXJPcHRpb25zJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZmlsdGVyT3B0aW9ucyQkMSgpIHtcblx0XHRcdHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcyxcblx0XHRcdCAgICBmaWx0ZXJPcHRpb25zJCQxID0gX3Byb3BzMi5maWx0ZXJPcHRpb25zLFxuXHRcdFx0ICAgIGlzVmFsaWROZXdPcHRpb24gPSBfcHJvcHMyLmlzVmFsaWROZXdPcHRpb24sXG5cdFx0XHQgICAgcHJvbXB0VGV4dENyZWF0b3IgPSBfcHJvcHMyLnByb21wdFRleHRDcmVhdG9yO1xuXG5cdFx0XHQvLyBUUklDS1kgQ2hlY2sgY3VycmVudGx5IHNlbGVjdGVkIG9wdGlvbnMgYXMgd2VsbC5cblx0XHRcdC8vIERvbid0IGRpc3BsYXkgYSBjcmVhdGUtcHJvbXB0IGZvciBhIHZhbHVlIHRoYXQncyBzZWxlY3RlZC5cblx0XHRcdC8vIFRoaXMgY292ZXJzIGFzeW5jIGVkZ2UtY2FzZXMgd2hlcmUgYSBuZXdseS1jcmVhdGVkIE9wdGlvbiBpc24ndCB5ZXQgaW4gdGhlIGFzeW5jLWxvYWRlZCBhcnJheS5cblxuXHRcdFx0dmFyIGV4Y2x1ZGVPcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGggPD0gMiA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1syXSkgfHwgW107XG5cblx0XHRcdHZhciBmaWx0ZXJlZE9wdGlvbnMgPSBmaWx0ZXJPcHRpb25zJCQxLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSB8fCBbXTtcblxuXHRcdFx0aWYgKGlzVmFsaWROZXdPcHRpb24oeyBsYWJlbDogdGhpcy5pbnB1dFZhbHVlIH0pKSB7XG5cdFx0XHRcdHZhciBfbmV3T3B0aW9uQ3JlYXRvciA9IHRoaXMucHJvcHMubmV3T3B0aW9uQ3JlYXRvcjtcblxuXG5cdFx0XHRcdHZhciBvcHRpb24gPSBfbmV3T3B0aW9uQ3JlYXRvcih7XG5cdFx0XHRcdFx0bGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSxcblx0XHRcdFx0XHRsYWJlbEtleTogdGhpcy5sYWJlbEtleSxcblx0XHRcdFx0XHR2YWx1ZUtleTogdGhpcy52YWx1ZUtleVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBUUklDS1kgQ29tcGFyZSB0byBhbGwgb3B0aW9ucyAobm90IGp1c3QgZmlsdGVyZWQgb3B0aW9ucykgaW4gY2FzZSBvcHRpb24gaGFzIGFscmVhZHkgYmVlbiBzZWxlY3RlZCkuXG5cdFx0XHRcdC8vIEZvciBtdWx0aS1zZWxlY3RzLCB0aGlzIHdvdWxkIHJlbW92ZSBpdCBmcm9tIHRoZSBmaWx0ZXJlZCBsaXN0LlxuXHRcdFx0XHR2YXIgX2lzT3B0aW9uVW5pcXVlMiA9IHRoaXMuaXNPcHRpb25VbmlxdWUoe1xuXHRcdFx0XHRcdG9wdGlvbjogb3B0aW9uLFxuXHRcdFx0XHRcdG9wdGlvbnM6IGV4Y2x1ZGVPcHRpb25zLmNvbmNhdChmaWx0ZXJlZE9wdGlvbnMpXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmIChfaXNPcHRpb25VbmlxdWUyKSB7XG5cdFx0XHRcdFx0dmFyIHByb21wdCA9IHByb21wdFRleHRDcmVhdG9yKHRoaXMuaW5wdXRWYWx1ZSk7XG5cblx0XHRcdFx0XHR0aGlzLl9jcmVhdGVQbGFjZWhvbGRlck9wdGlvbiA9IF9uZXdPcHRpb25DcmVhdG9yKHtcblx0XHRcdFx0XHRcdGxhYmVsOiBwcm9tcHQsXG5cdFx0XHRcdFx0XHRsYWJlbEtleTogdGhpcy5sYWJlbEtleSxcblx0XHRcdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRmaWx0ZXJlZE9wdGlvbnMudW5zaGlmdCh0aGlzLl9jcmVhdGVQbGFjZWhvbGRlck9wdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZpbHRlcmVkT3B0aW9ucztcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdpc09wdGlvblVuaXF1ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGlzT3B0aW9uVW5pcXVlKF9yZWYpIHtcblx0XHRcdHZhciBvcHRpb24gPSBfcmVmLm9wdGlvbixcblx0XHRcdCAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuXHRcdFx0dmFyIGlzT3B0aW9uVW5pcXVlID0gdGhpcy5wcm9wcy5pc09wdGlvblVuaXF1ZTtcblxuXG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB0aGlzLnByb3BzLm9wdGlvbnM7XG5cblx0XHRcdHJldHVybiBpc09wdGlvblVuaXF1ZSh7XG5cdFx0XHRcdGxhYmVsS2V5OiB0aGlzLmxhYmVsS2V5LFxuXHRcdFx0XHRvcHRpb246IG9wdGlvbixcblx0XHRcdFx0b3B0aW9uczogb3B0aW9ucyxcblx0XHRcdFx0dmFsdWVLZXk6IHRoaXMudmFsdWVLZXlcblx0XHRcdH0pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ21lbnVSZW5kZXJlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG1lbnVSZW5kZXJlciQkMShwYXJhbXMpIHtcblx0XHRcdHZhciBtZW51UmVuZGVyZXIkJDEgPSB0aGlzLnByb3BzLm1lbnVSZW5kZXJlcjtcblxuXG5cdFx0XHRyZXR1cm4gbWVudVJlbmRlcmVyJCQxKF9leHRlbmRzKHt9LCBwYXJhbXMsIHtcblx0XHRcdFx0b25TZWxlY3Q6IHRoaXMub25PcHRpb25TZWxlY3QsXG5cdFx0XHRcdHNlbGVjdFZhbHVlOiB0aGlzLm9uT3B0aW9uU2VsZWN0XG5cdFx0XHR9KSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnb25JbnB1dENoYW5nZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG9uSW5wdXRDaGFuZ2UoaW5wdXQpIHtcblx0XHRcdHZhciBvbklucHV0Q2hhbmdlID0gdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlO1xuXG5cdFx0XHQvLyBUaGlzIHZhbHVlIG1heSBiZSBuZWVkZWQgaW4gYmV0d2VlbiBTZWxlY3QgbW91bnRzICh3aGVuIHRoaXMuc2VsZWN0IGlzIG51bGwpXG5cblx0XHRcdHRoaXMuaW5wdXRWYWx1ZSA9IGlucHV0O1xuXG5cdFx0XHRpZiAob25JbnB1dENoYW5nZSkge1xuXHRcdFx0XHR0aGlzLmlucHV0VmFsdWUgPSBvbklucHV0Q2hhbmdlKGlucHV0KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXMuaW5wdXRWYWx1ZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdvbklucHV0S2V5RG93bicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG9uSW5wdXRLZXlEb3duKGV2ZW50KSB7XG5cdFx0XHR2YXIgX3Byb3BzMyA9IHRoaXMucHJvcHMsXG5cdFx0XHQgICAgc2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uID0gX3Byb3BzMy5zaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb24sXG5cdFx0XHQgICAgb25JbnB1dEtleURvd24gPSBfcHJvcHMzLm9uSW5wdXRLZXlEb3duO1xuXG5cdFx0XHR2YXIgZm9jdXNlZE9wdGlvbiA9IHRoaXMuc2VsZWN0LmdldEZvY3VzZWRPcHRpb24oKTtcblxuXHRcdFx0aWYgKGZvY3VzZWRPcHRpb24gJiYgZm9jdXNlZE9wdGlvbiA9PT0gdGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24gJiYgc2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uKHsga2V5Q29kZTogZXZlbnQua2V5Q29kZSB9KSkge1xuXHRcdFx0XHR0aGlzLmNyZWF0ZU5ld09wdGlvbigpO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgZGVjb3JhdGVkIFNlbGVjdCBmcm9tIGRvaW5nIGFueXRoaW5nIGFkZGl0aW9uYWwgd2l0aCB0aGlzIGtleURvd24gZXZlbnRcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0gZWxzZSBpZiAob25JbnB1dEtleURvd24pIHtcblx0XHRcdFx0b25JbnB1dEtleURvd24oZXZlbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ29uT3B0aW9uU2VsZWN0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gb25PcHRpb25TZWxlY3Qob3B0aW9uKSB7XG5cdFx0XHRpZiAob3B0aW9uID09PSB0aGlzLl9jcmVhdGVQbGFjZWhvbGRlck9wdGlvbikge1xuXHRcdFx0XHR0aGlzLmNyZWF0ZU5ld09wdGlvbigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZWxlY3Quc2VsZWN0VmFsdWUob3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1cycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzKCkge1xuXHRcdFx0dGhpcy5zZWxlY3QuZm9jdXMoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0dmFyIF9wcm9wczQgPSB0aGlzLnByb3BzLFxuXHRcdFx0ICAgIHJlZlByb3AgPSBfcHJvcHM0LnJlZixcblx0XHRcdCAgICByZXN0UHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHM0LCBbJ3JlZiddKTtcblx0XHRcdHZhciBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW47XG5cblx0XHRcdC8vIFdlIGNhbid0IHVzZSBkZXN0cnVjdHVyaW5nIGRlZmF1bHQgdmFsdWVzIHRvIHNldCB0aGUgY2hpbGRyZW4sXG5cdFx0XHQvLyBiZWNhdXNlIGl0IHdvbid0IGFwcGx5IHdvcmsgaWYgYGNoaWxkcmVuYCBpcyBudWxsLiBBIGZhbHN5IGNoZWNrIGlzXG5cdFx0XHQvLyBtb3JlIHJlbGlhYmxlIGluIHJlYWwgd29ybGQgdXNlLWNhc2VzLlxuXG5cdFx0XHRpZiAoIWNoaWxkcmVuKSB7XG5cdFx0XHRcdGNoaWxkcmVuID0gZGVmYXVsdENoaWxkcmVuJDI7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwcm9wcyA9IF9leHRlbmRzKHt9LCByZXN0UHJvcHMsIHtcblx0XHRcdFx0YWxsb3dDcmVhdGU6IHRydWUsXG5cdFx0XHRcdGZpbHRlck9wdGlvbnM6IHRoaXMuZmlsdGVyT3B0aW9ucyxcblx0XHRcdFx0bWVudVJlbmRlcmVyOiB0aGlzLm1lbnVSZW5kZXJlcixcblx0XHRcdFx0b25JbnB1dENoYW5nZTogdGhpcy5vbklucHV0Q2hhbmdlLFxuXHRcdFx0XHRvbklucHV0S2V5RG93bjogdGhpcy5vbklucHV0S2V5RG93bixcblx0XHRcdFx0cmVmOiBmdW5jdGlvbiByZWYoX3JlZjIpIHtcblx0XHRcdFx0XHRfdGhpczIuc2VsZWN0ID0gX3JlZjI7XG5cblx0XHRcdFx0XHQvLyBUaGVzZSB2YWx1ZXMgbWF5IGJlIG5lZWRlZCBpbiBiZXR3ZWVuIFNlbGVjdCBtb3VudHMgKHdoZW4gdGhpcy5zZWxlY3QgaXMgbnVsbClcblx0XHRcdFx0XHRpZiAoX3JlZjIpIHtcblx0XHRcdFx0XHRcdF90aGlzMi5sYWJlbEtleSA9IF9yZWYyLnByb3BzLmxhYmVsS2V5O1xuXHRcdFx0XHRcdFx0X3RoaXMyLnZhbHVlS2V5ID0gX3JlZjIucHJvcHMudmFsdWVLZXk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChyZWZQcm9wKSB7XG5cdFx0XHRcdFx0XHRyZWZQcm9wKF9yZWYyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gY2hpbGRyZW4ocHJvcHMpO1xuXHRcdH1cblx0fV0pO1xuXHRyZXR1cm4gQ3JlYXRhYmxlU2VsZWN0O1xufShSZWFjdC5Db21wb25lbnQpO1xuXG52YXIgZGVmYXVsdENoaWxkcmVuJDIgPSBmdW5jdGlvbiBkZWZhdWx0Q2hpbGRyZW4ocHJvcHMpIHtcblx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0JDEsIHByb3BzKTtcbn07XG5cbnZhciBpc09wdGlvblVuaXF1ZSA9IGZ1bmN0aW9uIGlzT3B0aW9uVW5pcXVlKF9yZWYzKSB7XG5cdHZhciBvcHRpb24gPSBfcmVmMy5vcHRpb24sXG5cdCAgICBvcHRpb25zID0gX3JlZjMub3B0aW9ucyxcblx0ICAgIGxhYmVsS2V5ID0gX3JlZjMubGFiZWxLZXksXG5cdCAgICB2YWx1ZUtleSA9IF9yZWYzLnZhbHVlS2V5O1xuXG5cdGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5sZW5ndGgpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBvcHRpb25zLmZpbHRlcihmdW5jdGlvbiAoZXhpc3RpbmdPcHRpb24pIHtcblx0XHRyZXR1cm4gZXhpc3RpbmdPcHRpb25bbGFiZWxLZXldID09PSBvcHRpb25bbGFiZWxLZXldIHx8IGV4aXN0aW5nT3B0aW9uW3ZhbHVlS2V5XSA9PT0gb3B0aW9uW3ZhbHVlS2V5XTtcblx0fSkubGVuZ3RoID09PSAwO1xufTtcblxudmFyIGlzVmFsaWROZXdPcHRpb24gPSBmdW5jdGlvbiBpc1ZhbGlkTmV3T3B0aW9uKF9yZWY0KSB7XG5cdHZhciBsYWJlbCA9IF9yZWY0LmxhYmVsO1xuXHRyZXR1cm4gISFsYWJlbDtcbn07XG5cbnZhciBuZXdPcHRpb25DcmVhdG9yID0gZnVuY3Rpb24gbmV3T3B0aW9uQ3JlYXRvcihfcmVmNSkge1xuXHR2YXIgbGFiZWwgPSBfcmVmNS5sYWJlbCxcblx0ICAgIGxhYmVsS2V5ID0gX3JlZjUubGFiZWxLZXksXG5cdCAgICB2YWx1ZUtleSA9IF9yZWY1LnZhbHVlS2V5O1xuXG5cdHZhciBvcHRpb24gPSB7fTtcblx0b3B0aW9uW3ZhbHVlS2V5XSA9IGxhYmVsO1xuXHRvcHRpb25bbGFiZWxLZXldID0gbGFiZWw7XG5cdG9wdGlvbi5jbGFzc05hbWUgPSAnU2VsZWN0LWNyZWF0ZS1vcHRpb24tcGxhY2Vob2xkZXInO1xuXG5cdHJldHVybiBvcHRpb247XG59O1xuXG52YXIgcHJvbXB0VGV4dENyZWF0b3IgPSBmdW5jdGlvbiBwcm9tcHRUZXh0Q3JlYXRvcihsYWJlbCkge1xuXHRyZXR1cm4gJ0NyZWF0ZSBvcHRpb24gXCInICsgbGFiZWwgKyAnXCInO1xufTtcblxudmFyIHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbiA9IGZ1bmN0aW9uIHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbihfcmVmNikge1xuXHR2YXIga2V5Q29kZSA9IF9yZWY2LmtleUNvZGU7XG5cblx0c3dpdGNoIChrZXlDb2RlKSB7XG5cdFx0Y2FzZSA5OiAvLyBUQUJcblx0XHRjYXNlIDEzOiAvLyBFTlRFUlxuXHRcdGNhc2UgMTg4OlxuXHRcdFx0Ly8gQ09NTUFcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG5cbi8vIERlZmF1bHQgcHJvcCBtZXRob2RzXG5DcmVhdGFibGVTZWxlY3QuaXNPcHRpb25VbmlxdWUgPSBpc09wdGlvblVuaXF1ZTtcbkNyZWF0YWJsZVNlbGVjdC5pc1ZhbGlkTmV3T3B0aW9uID0gaXNWYWxpZE5ld09wdGlvbjtcbkNyZWF0YWJsZVNlbGVjdC5uZXdPcHRpb25DcmVhdG9yID0gbmV3T3B0aW9uQ3JlYXRvcjtcbkNyZWF0YWJsZVNlbGVjdC5wcm9tcHRUZXh0Q3JlYXRvciA9IHByb21wdFRleHRDcmVhdG9yO1xuQ3JlYXRhYmxlU2VsZWN0LnNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbiA9IHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbjtcblxuQ3JlYXRhYmxlU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcblx0ZmlsdGVyT3B0aW9uczogZmlsdGVyT3B0aW9ucyxcblx0aXNPcHRpb25VbmlxdWU6IGlzT3B0aW9uVW5pcXVlLFxuXHRpc1ZhbGlkTmV3T3B0aW9uOiBpc1ZhbGlkTmV3T3B0aW9uLFxuXHRtZW51UmVuZGVyZXI6IG1lbnVSZW5kZXJlcixcblx0bmV3T3B0aW9uQ3JlYXRvcjogbmV3T3B0aW9uQ3JlYXRvcixcblx0cHJvbXB0VGV4dENyZWF0b3I6IHByb21wdFRleHRDcmVhdG9yLFxuXHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb246IHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvblxufTtcblxuQ3JlYXRhYmxlU2VsZWN0LnByb3BUeXBlcyA9IHtcblx0Ly8gQ2hpbGQgZnVuY3Rpb24gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoZSBpbm5lciBTZWxlY3QgY29tcG9uZW50XG5cdC8vIFRoaXMgY29tcG9uZW50IGNhbiBiZSB1c2VkIHRvIGNvbXBvc2UgSE9DcyAoZWcgQ3JlYXRhYmxlIGFuZCBBc3luYylcblx0Ly8gKHByb3BzOiBPYmplY3QpOiBQcm9wVHlwZXMuZWxlbWVudFxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLmZ1bmMsXG5cblx0Ly8gU2VlIFNlbGVjdC5wcm9wVHlwZXMuZmlsdGVyT3B0aW9uc1xuXHRmaWx0ZXJPcHRpb25zOiBQcm9wVHlwZXMuYW55LFxuXG5cdC8vIFNlYXJjaGVzIGZvciBhbnkgbWF0Y2hpbmcgb3B0aW9uIHdpdGhpbiB0aGUgc2V0IG9mIG9wdGlvbnMuXG5cdC8vIFRoaXMgZnVuY3Rpb24gcHJldmVudHMgZHVwbGljYXRlIG9wdGlvbnMgZnJvbSBiZWluZyBjcmVhdGVkLlxuXHQvLyAoeyBvcHRpb246IE9iamVjdCwgb3B0aW9uczogQXJyYXksIGxhYmVsS2V5OiBzdHJpbmcsIHZhbHVlS2V5OiBzdHJpbmcgfSk6IGJvb2xlYW5cblx0aXNPcHRpb25VbmlxdWU6IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIERldGVybWluZXMgaWYgdGhlIGN1cnJlbnQgaW5wdXQgdGV4dCByZXByZXNlbnRzIGEgdmFsaWQgb3B0aW9uLlxuXHQvLyAoeyBsYWJlbDogc3RyaW5nIH0pOiBib29sZWFuXG5cdGlzVmFsaWROZXdPcHRpb246IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIFNlZSBTZWxlY3QucHJvcFR5cGVzLm1lbnVSZW5kZXJlclxuXHRtZW51UmVuZGVyZXI6IFByb3BUeXBlcy5hbnksXG5cblx0Ly8gRmFjdG9yeSB0byBjcmVhdGUgbmV3IG9wdGlvbi5cblx0Ly8gKHsgbGFiZWw6IHN0cmluZywgbGFiZWxLZXk6IHN0cmluZywgdmFsdWVLZXk6IHN0cmluZyB9KTogT2JqZWN0XG5cdG5ld09wdGlvbkNyZWF0b3I6IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIGlucHV0IGNoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAoaW5wdXRWYWx1ZSkge31cblx0b25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG5cblx0Ly8gaW5wdXQga2V5RG93biBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdG9uSW5wdXRLZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcblxuXHQvLyBuZXcgb3B0aW9uIGNsaWNrIGhhbmRsZXI6IGZ1bmN0aW9uIChvcHRpb24pIHt9XG5cdG9uTmV3T3B0aW9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIFNlZSBTZWxlY3QucHJvcFR5cGVzLm9wdGlvbnNcblx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5LFxuXG5cdC8vIENyZWF0ZXMgcHJvbXB0L3BsYWNlaG9sZGVyIG9wdGlvbiB0ZXh0LlxuXHQvLyAoZmlsdGVyVGV4dDogc3RyaW5nKTogc3RyaW5nXG5cdHByb21wdFRleHRDcmVhdG9yOiBQcm9wVHlwZXMuZnVuYyxcblxuXHRyZWY6IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIERlY2lkZXMgaWYgYSBrZXlEb3duIGV2ZW50IChlZyBpdHMgYGtleUNvZGVgKSBzaG91bGQgcmVzdWx0IGluIHRoZSBjcmVhdGlvbiBvZiBhIG5ldyBvcHRpb24uXG5cdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbjogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbnZhciBBc3luY0NyZWF0YWJsZVNlbGVjdCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG5cdGluaGVyaXRzKEFzeW5jQ3JlYXRhYmxlU2VsZWN0LCBfUmVhY3QkQ29tcG9uZW50KTtcblxuXHRmdW5jdGlvbiBBc3luY0NyZWF0YWJsZVNlbGVjdCgpIHtcblx0XHRjbGFzc0NhbGxDaGVjayh0aGlzLCBBc3luY0NyZWF0YWJsZVNlbGVjdCk7XG5cdFx0cmV0dXJuIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEFzeW5jQ3JlYXRhYmxlU2VsZWN0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXN5bmNDcmVhdGFibGVTZWxlY3QpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcblx0fVxuXG5cdGNyZWF0ZUNsYXNzKEFzeW5jQ3JlYXRhYmxlU2VsZWN0LCBbe1xuXHRcdGtleTogJ2ZvY3VzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXMoKSB7XG5cdFx0XHR0aGlzLnNlbGVjdC5mb2N1cygpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHZhciBfdGhpczIgPSB0aGlzO1xuXG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0QXN5bmMsXG5cdFx0XHRcdHRoaXMucHJvcHMsXG5cdFx0XHRcdGZ1bmN0aW9uIChfcmVmKSB7XG5cdFx0XHRcdFx0dmFyIHJlZiA9IF9yZWYucmVmLFxuXHRcdFx0XHRcdCAgICBhc3luY1Byb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWydyZWYnXSk7XG5cblx0XHRcdFx0XHR2YXIgYXN5bmNSZWYgPSByZWY7XG5cdFx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0XHRDcmVhdGFibGVTZWxlY3QsXG5cdFx0XHRcdFx0XHRhc3luY1Byb3BzLFxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24gKF9yZWYyKSB7XG5cdFx0XHRcdFx0XHRcdHZhciByZWYgPSBfcmVmMi5yZWYsXG5cdFx0XHRcdFx0XHRcdCAgICBjcmVhdGFibGVQcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYyLCBbJ3JlZiddKTtcblxuXHRcdFx0XHRcdFx0XHR2YXIgY3JlYXRhYmxlUmVmID0gcmVmO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMyLnByb3BzLmNoaWxkcmVuKF9leHRlbmRzKHt9LCBjcmVhdGFibGVQcm9wcywge1xuXHRcdFx0XHRcdFx0XHRcdHJlZjogZnVuY3Rpb24gcmVmKHNlbGVjdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRhYmxlUmVmKHNlbGVjdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRhc3luY1JlZihzZWxlY3QpO1xuXHRcdFx0XHRcdFx0XHRcdFx0X3RoaXMyLnNlbGVjdCA9IHNlbGVjdDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0fV0pO1xuXHRyZXR1cm4gQXN5bmNDcmVhdGFibGVTZWxlY3Q7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbnZhciBkZWZhdWx0Q2hpbGRyZW4kMSA9IGZ1bmN0aW9uIGRlZmF1bHRDaGlsZHJlbihwcm9wcykge1xuXHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QkMSwgcHJvcHMpO1xufTtcblxuQXN5bmNDcmVhdGFibGVTZWxlY3QucHJvcFR5cGVzID0ge1xuXHRjaGlsZHJlbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCAvLyBDaGlsZCBmdW5jdGlvbiByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIGlubmVyIFNlbGVjdCBjb21wb25lbnQ7IChwcm9wczogT2JqZWN0KTogUHJvcFR5cGVzLmVsZW1lbnRcbn07XG5cbkFzeW5jQ3JlYXRhYmxlU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcblx0Y2hpbGRyZW46IGRlZmF1bHRDaGlsZHJlbiQxXG59O1xuXG5TZWxlY3QkMS5Bc3luYyA9IEFzeW5jO1xuU2VsZWN0JDEuQXN5bmNDcmVhdGFibGUgPSBBc3luY0NyZWF0YWJsZVNlbGVjdDtcblNlbGVjdCQxLkNyZWF0YWJsZSA9IENyZWF0YWJsZVNlbGVjdDtcblNlbGVjdCQxLlZhbHVlID0gVmFsdWU7XG5TZWxlY3QkMS5PcHRpb24gPSBPcHRpb247XG5cbmV4cG9ydCB7IEFzeW5jLCBBc3luY0NyZWF0YWJsZVNlbGVjdCBhcyBBc3luY0NyZWF0YWJsZSwgQ3JlYXRhYmxlU2VsZWN0IGFzIENyZWF0YWJsZSwgVmFsdWUsIE9wdGlvbiwgbWVudVJlbmRlcmVyIGFzIGRlZmF1bHRNZW51UmVuZGVyZXIsIGFycm93UmVuZGVyZXIgYXMgZGVmYXVsdEFycm93UmVuZGVyZXIsIGNsZWFyUmVuZGVyZXIgYXMgZGVmYXVsdENsZWFyUmVuZGVyZXIsIGZpbHRlck9wdGlvbnMgYXMgZGVmYXVsdEZpbHRlck9wdGlvbnMgfTtcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdCQxO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3Qtc2VsZWN0L2Rpc3QvcmVhY3Qtc2VsZWN0LmVzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1zZWxlY3QvZGlzdC9yZWFjdC1zZWxlY3QuZXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIiLCJpbXBvcnQgeyBmaWx0ZXJUeXBlcyB9IGZyb20gJy4uL3JlZHVjZXJzL2ZpbHRlcic7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkUmlnaHQgPSBpZCA9PiAoe1xyXG4gICAgdHlwZTogZmlsdGVyVHlwZXMuQUREX1JJR0hULFxyXG4gICAgaWQsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbW92ZVJpZ2h0ID0gaWQgPT4gKHtcclxuICAgIHR5cGU6IGZpbHRlclR5cGVzLlJFTU9WRV9SSUdIVCxcclxuICAgIGlkLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVDb3VudHJpZXMgPSBjb3VudHJpZXMgPT4gKHtcclxuICAgIHR5cGU6IGZpbHRlclR5cGVzLlVQREFURV9DT1VOVFJJRVMsXHJcbiAgICBjb3VudHJpZXMsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4Y2x1c2l2ZSA9IGV4Y2x1c2l2ZSA9PiAoe1xyXG4gICAgdHlwZTogZmlsdGVyVHlwZXMuVVBEQVRFX0VYQ0xVU0lWRSxcclxuICAgIGV4Y2x1c2l2ZSxcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2FjdGlvbnMvZmlsdGVyQWN0aW9ucy5qcyIsImltcG9ydCB7IG1hcmtldHBsYWNlVHlwZXMgfSBmcm9tICcuLi9yZWR1Y2Vycy9tYXJrZXRwbGFjZSc7XHJcblxyXG5sZXQgbmV4dFRvZG9JZCA9IDA7XHJcblxyXG5leHBvcnQgY29uc3QgdGVzdCA9IHRleHQgPT4gKHtcclxuICAgIHR5cGU6IG1hcmtldHBsYWNlVHlwZXMuVEVTVCxcclxuICAgIGlkOiBuZXh0VG9kb0lkKyssXHJcbiAgICB0ZXh0XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9hY3Rpb25zL2luZGV4LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCBNYXJrZXRwbGFjZSBmcm9tICcuL2NvbnRhaW5lcnMvTWFya2V0cGxhY2UnO1xyXG5cclxucmVxdWlyZSgnLi4vLi4vc2Nzcy9tYXJrZXRwbGFjZS5zY3NzJyk7XHJcblxyXG5jb25zdCBtYXJrZXRwbGFjZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXJrZXRwbGFjZS13cmFwcGVyJyk7XHJcblxyXG5sZXQgTWFya2V0cGxhY2VBcHAgPSBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgICAgICA8TWFya2V0cGxhY2Ugey4uLm1hcmtldHBsYWNlQ29udGFpbmVyLmRhdGFzZXQgfS8+XHJcbiAgICA8L1Byb3ZpZGVyPixcclxuICAgIG1hcmtldHBsYWNlQ29udGFpbmVyXHJcbik7XHJcblxyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgQ29udGVudEFyZW5hLlRlc3QgPSBDb250ZW50QXJlbmEuVGVzdCB8fCB7fTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuVGVzdC5NYXJrZXRQbGFjZSA9IGZ1bmN0aW9uKGlkKXtcclxuICAgICAgICBNYXJrZXRwbGFjZUFwcC50ZXN0KGlkKVxyXG4gICAgfTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuQXBpLmdldFNwb3J0cygpLmRvbmUoKHNwb3J0cykgPT4ge1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBzcG9ydHM7XHJcblxyXG4gICAgICAgIHZhciBzZWxlY3QgPSAkKFwiI3Nwb3J0cy1ldmVudFwiKTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzLmZvckVhY2goZnVuY3Rpb24gKHNwb3J0KSB7XHJcbiAgICAgICAgICAgIHNlbGVjdC5hcHBlbmQoXCI8ZGl2IGNsYXNzPVxcXCJzcG9ydCBzdWJmaWx0ZXJcXFwiIGlkPVxcXCJzcG9ydC1cIitzcG9ydC5leHRlcm5hbElkK1wiXFxcIiBuYW1lPVwiK3Nwb3J0LmV4dGVybmFsSWQrXCIgdmFsdWU9J1wiK3Nwb3J0LmV4dGVybmFsSWQrXCInIHRvZ2dsZT5cIitzcG9ydC5uYW1lK1wiPC9kaXY+XCIpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9idXkuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xyXG5cclxuY2xhc3MgRXZlbnRGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VGFiID0gKHRhYikgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3RhYn0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+RXZlbnQ8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiaW5wdXRTZWFyY2hcIiBuYW1lPVwiZXZlbnRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN1c3RvbS1kcm9wZG93blwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInVrLWJ1dHRvbiB1ay1idXR0b24tZGVmYXVsdCBkcm9wZG93bi1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+U3BvcnRzICZuYnNwOzxzcGFuIGNsYXNzTmFtZT1cImZpbHRlci1zcG9ydHMtY291bnRcIj48L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzcG9ydHMtZXZlbnRcIiB1ay1kcm9wZG93bj1cIm1vZGU6IGNsaWNrXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlXHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9uQ2xpY2s6IGlkID0+IGRpc3BhdGNoKHRlc3QoaWQpKVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShFdmVudEZpbHRlcilcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29tcG9uZW50cy9FdmVudEZpbHRlci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHsgYWRkUmlnaHQscmVtb3ZlUmlnaHQsdXBkYXRlQ291bnRyaWVzLHVwZGF0ZUV4Y2x1c2l2ZSB9IGZyb20gXCIuLi9hY3Rpb25zL2ZpbHRlckFjdGlvbnNcIjtcclxuaW1wb3J0IENvdW50cnlTZWxlY3RvciBmcm9tIFwiLi4vLi4vbWFpbi9jb21wb25lbnRzL0NvdW50cnlTZWxlY3RvclwiO1xyXG5cclxuY2xhc3MgUmlnaHRzRmlsdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJpZ2h0c0ZpbHRlclwiLCBuZXh0UHJvcHMpXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0VGVycml0b3J5ID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy51cGRhdGVDb3VudHJpZXModmFsdWUpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtyaWdodHMscmlnaHRzUGFja2FnZSxjb3VudHJpZXMsIG9uRmlsdGVyLCBleGNsdXNpdmV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJveFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlJpZ2h0czwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPENvdW50cnlTZWxlY3RvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcImJhc2UtaW5wdXQtc2VsZWN0XCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y291bnRyaWVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuc2VsZWN0VGVycml0b3J5fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyaWdodHMtcGFja2FnZXNcIiBzdHlsZT17e21hcmdpblRvcDogMjB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRzUGFja2FnZSAmJiByaWdodHNQYWNrYWdlLm1hcChyaWdodCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxwIGtleT17cmlnaHQuaWR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0ncmlnaHRfcGFja2FnZSBzdWJmaWx0ZXInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSdjaGVja2JveCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3JpZ2h0cy5pbmRleE9mKHJpZ2h0LmlkKSAhPT0gLTF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGUudGFyZ2V0LmNoZWNrZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkUmlnaHQocmlnaHQuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yZW1vdmVSaWdodChyaWdodC5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtyaWdodC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz4ge3JpZ2h0Lm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aHIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7bWFyZ2luQm90dG9tOiAyMH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtleGNsdXNpdmV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUV4Y2x1c2l2ZShlLnRhcmdldC5jaGVja2VkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gLz4gQ29udGFpbnMgZXhjbHVzaXZlIHJpZ2h0c1xyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RhbmRhcmQtYnV0dG9uXCIgb25DbGljaz17KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRmlsdGVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodHM6IHJpZ2h0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudHJpZXM6IGNvdW50cmllcy5tYXAoY291bnRyeSA9PiBjb3VudHJ5LmxhYmVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0+QXBwbHk8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlLmZpbHRlclxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBhZGRSaWdodDogaWQgPT4gZGlzcGF0Y2goYWRkUmlnaHQoaWQpKSxcclxuICAgICAgICByZW1vdmVSaWdodDogaWQgPT4gZGlzcGF0Y2gocmVtb3ZlUmlnaHQoaWQpKSxcclxuICAgICAgICB1cGRhdGVDb3VudHJpZXM6IGNvdW50cmllcyA9PiBkaXNwYXRjaCh1cGRhdGVDb3VudHJpZXMoY291bnRyaWVzKSksXHJcbiAgICAgICAgdXBkYXRlRXhjbHVzaXZlOiBleGNsdXNpdmUgPT4gZGlzcGF0Y2godXBkYXRlRXhjbHVzaXZlKGV4Y2x1c2l2ZSkpXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoUmlnaHRzRmlsdGVyKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb21wb25lbnRzL1JpZ2h0c0ZpbHRlci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHsgdGVzdCB9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcblxyXG5jbGFzcyBTYWxlc1BhY2thZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VGFiID0gKHRhYikgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3RhYn0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zYWxlc1BhY2thZ2UuaWR9XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGVcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25DbGljazogaWQgPT4gZGlzcGF0Y2godGVzdChpZCkpXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNhbGVzUGFja2FnZSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29tcG9uZW50cy9TYWxlc1BhY2thZ2UuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xyXG5pbXBvcnQgU2FsZXNQYWNrYWdlcyBmcm9tIFwiLi9TYWxlc1BhY2thZ2VzXCI7XHJcblxyXG5jbGFzcyBDb21tZXJjaWFsVGVybXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtjb250ZW50fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxTYWxlc1BhY2thZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcz17Y29udGVudC5zYWxlc1BhY2thZ2VzfS8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcclxuICAgIHJldHVybiBzdGF0ZVxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvbkNsaWNrOiBpZCA9PiBkaXNwYXRjaCh0ZXN0KGlkKSlcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoQ29tbWVyY2lhbFRlcm1zKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL0NvbW1lcmNpYWxUZXJtcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHsgdGVzdCB9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcbmltcG9ydCB7XHJcbiAgICBEZXNjcmlwdGlvbixcclxufSBmcm9tIFwiLi4vLi4vc2VsbC9jb21wb25lbnRzL1NlbGxGb3JtSXRlbXNcIjtcclxuXHJcbmNsYXNzIENvbnRlbnRJbmZvcm1hdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHt9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHt9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtjb250ZW50fT0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7bWFyZ2luVG9wOiAyMH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmdWxsLWl0ZW0tYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkVWRU5UIERFU0NSSVBUSU9OPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bGwtaXRlbS1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb250ZW50LmRlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGVcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25DbGljazogaWQgPT4gZGlzcGF0Y2godGVzdChpZCkpXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKENvbnRlbnRJbmZvcm1hdGlvbilcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29udGFpbmVycy9Db250ZW50SW5mb3JtYXRpb24uanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xyXG5pbXBvcnQgQ29tbWVyY2lhbFRlcm1zIGZyb20gXCIuL0NvbW1lcmNpYWxUZXJtc1wiO1xyXG5pbXBvcnQgQ29udGVudEluZm9ybWF0aW9uIGZyb20gXCIuL0NvbnRlbnRJbmZvcm1hdGlvblwiO1xyXG5pbXBvcnQgVGVybVNoZWV0IGZyb20gXCIuL1Rlcm1TaGVldFwiO1xyXG5pbXBvcnQgVGVjaG5pY2FsRGV0YWlscyBmcm9tIFwiLi9UZWNobmljYWxEZXRhaWxzXCI7XHJcbmltcG9ydCBTZWxsZXIgZnJvbSBcIi4vU2VsbGVyXCI7XHJcbmltcG9ydCBNb21lbnQgZnJvbSBcIm1vbWVudC9tb21lbnRcIjtcclxuXHJcbmNsYXNzIExpc3RpbmdEZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBjb250ZW50IDogcHJvcHMuY29udGVudCB8fCB7fSxcclxuICAgICAgICAgICAgdGFiIDogMVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1RhYiA9ICh0YWIpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt0YWJ9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBjb25zdCB7b25CYWNrLCBjb250ZW50fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3RhYn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGxldCBsaXN0aW5nSW1hZ2UgPSAoY29udGVudC5pbWFnZSkgPyBhc3NldHNCYXNlRGlyICsgXCIuLi9cIiArIGNvbnRlbnQuaW1hZ2UgOiB0aGlzLm5vSW1hZ2U7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy1kZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3RpbmctZGV0YWlscy1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e29uQmFja30gY2xhc3NOYW1lPVwibGlnaHQtYmx1ZS1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1sZWZ0XCIvPiBCYWNrIHRvIHJlc3VsdHNcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hbWVcIj57Y29udGVudC5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHVibGlzaGVyXCIgc3R5bGU9e3tmbGV4OjF9fT57XCJKdWFuIENydXogVGFsY29cIn08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImxpbmstYnV0dG9uXCIgc3R5bGU9e3tmbGV4OjF9fT5Db250YWN0IFNlbGxlcjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwibGluay1idXR0b25cIiBzdHlsZT17e2ZsZXg6MX19PkNvbnRhY3QgU2VsbGVyPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdXN0b20taWRcIj4je2NvbnRlbnQuY3VzdG9tSWR9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3RpbmctZGV0YWlscy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibGVmdFwifSAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpbWFnZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtsaXN0aW5nSW1hZ2V9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZmxleDogMSwgZm9udFdlaWdodDogNjAwLCBsaW5lSGVpZ2h0OiBcIjMwcHhcIn19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnQuc3BvcnRDYXRlZ29yeSAmJiA8ZGl2Pntjb250ZW50LnNwb3J0Q2F0ZWdvcnkubmFtZX08L2Rpdj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29udGVudC50b3VybmFtZW50ICYmIDxkaXY+e2NvbnRlbnQudG91cm5hbWVudC5uYW1lfTwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnNlYXNvbnMgJiYgY29udGVudC5zZWFzb25zLmxlbmd0aCA+IDAgJiYgY29udGVudC5zZWFzb25zLm1hcChzZWFzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdj57c2Vhc29uLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJkYXRlXCJ9PlB1Ymxpc2hlZCA8c3Bhbj57TW9tZW50KCkuZm9ybWF0KCdERC9NTS9ZWVlZJyl9PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJkYXRlXCJ9PkV4cGlyZXMgPHNwYW4+e01vbWVudChjb250ZW50LmV4cGlyYXRpb25EYXRlKS5mb3JtYXQoJ0REL01NL1lZWVknKX08L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wicmlnaHRcIn0gPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJsaXN0aW5nLWRldGFpbHMtYnV0dG9uc1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsodGFiID09PTEpP1wiYWN0aXZlXCI6IFwiXCJ9IG9uQ2xpY2s9eygpPT50aGlzLnNob3dUYWIoMSl9PkNvbW1lcmNpYWwgdGVybXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsodGFiID09PTIpP1wiYWN0aXZlXCI6IFwiXCJ9IG9uQ2xpY2s9eygpPT50aGlzLnNob3dUYWIoMil9PkNvbnRlbnQgaW5mb3JtYXRpb248L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsodGFiID09PTMpP1wiYWN0aXZlXCI6IFwiXCJ9IG9uQ2xpY2s9eygpPT50aGlzLnNob3dUYWIoMyl9PlRlcm0gU2hlZXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXsodGFiID09PTQpP1wiYWN0aXZlXCI6IFwiXCJ9IG9uQ2xpY2s9eygpPT50aGlzLnNob3dUYWIoNCl9PlRlY2huaWNhbCBkZXRhaWxzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17KHRhYiA9PT01KT9cImFjdGl2ZVwiOiBcIlwifSBvbkNsaWNrPXsoKT0+dGhpcy5zaG93VGFiKDUpfT5TZWxsZXI8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImxpc3RpbmctZGV0YWlscy10YWJcIn0+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRhYiA9PT0gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1lcmNpYWxUZXJtcyBjb250ZW50PXtjb250ZW50fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudGFiID09PSAyICYmIDxDb250ZW50SW5mb3JtYXRpb24gY29udGVudD17dGhpcy5wcm9wcy5jb250ZW50fS8+IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50YWIgPT09IDMgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGVybVNoZWV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUmlnaHRzPXtjb250ZW50LnNlbGVjdGVkUmlnaHRzQnlTdXBlclJpZ2h0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlPXtjb250ZW50LnJpZ2h0c1BhY2thZ2V9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50YWIgPT09IDQgJiYgPFRlY2huaWNhbERldGFpbHMgY29udGVudD17dGhpcy5wcm9wcy5jb250ZW50fS8+IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS50YWIgPT09IDUgJiYgPFNlbGxlciBjb250ZW50PXt0aGlzLnByb3BzLmNvbnRlbnR9Lz4gfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGVcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25DbGljazogaWQgPT4gZGlzcGF0Y2godGVzdChpZCkpXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKExpc3RpbmdEZXRhaWxzKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL0xpc3RpbmdEZXRhaWxzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgeyB0ZXN0IH0gZnJvbSBcIi4uL2FjdGlvbnNcIjtcclxuaW1wb3J0IEV2ZW50RmlsdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvRXZlbnRGaWx0ZXInO1xyXG5pbXBvcnQgUmlnaHRzRmlsdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvUmlnaHRzRmlsdGVyJztcclxuaW1wb3J0IENvbnRlbnRMaXN0aW5nIGZyb20gJy4uLy4uL21haW4vY29tcG9uZW50cy9Db250ZW50TGlzdGluZyc7XHJcbmltcG9ydCBMaXN0aW5nRGV0YWlscyBmcm9tICcuL0xpc3RpbmdEZXRhaWxzJztcclxuXHJcbmNsYXNzIE1hcmtldHBsYWNlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2UgOiBKU09OLnBhcnNlKHByb3BzLnJpZ2h0cyksXHJcbiAgICAgICAgICAgIGxvYWRpbmdMaXN0aW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9hZGluZ0xpc3RpbmdEZXRhaWxzIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dEZXRhaWxzIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGxpc3RpbmdzIDogW10sXHJcbiAgICAgICAgICAgIGNvdW50cmllcyA6IFtdLFxyXG4gICAgICAgICAgICB0ZXJyaXRvcmllczogW11cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLnNldFN0YXRlKHtsb2FkaW5nTGlzdGluZyA6IHRydWV9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldEpzb25Db250ZW50KCkuZG9uZSgobGlzdGluZ3MpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxpc3RpbmdzID0gbGlzdGluZ3MubWFwKCBsaXN0aW5nID0+IENvbnRlbnRBcmVuYS5VdGlscy5jb250ZW50UGFyc2VyRnJvbVNlcnZlcihsaXN0aW5nKSApO1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7bGlzdGluZ3M6IGxpc3RpbmdzLCBsb2FkaW5nTGlzdGluZyA6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpc3RpbmdzKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdExpc3RpbmcgPSAoaWQpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKCBpZCA9PT0gX3RoaXMuc3RhdGUuaWQgKXtcclxuICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgc2hvd0RldGFpbHMgOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3RoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpZCA6IGlkLFxyXG4gICAgICAgICAgICBsb2FkaW5nTGlzdGluZ0RldGFpbHMgOiB0cnVlLFxyXG4gICAgICAgICAgICBzaG93RGV0YWlscyA6IHRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0QnlDdXN0b21JZChpZCkuZG9uZSgoY29udGVudCkgPT4ge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50IDogY29udGVudCxcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdMaXN0aW5nRGV0YWlscyA6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZpbHRlciA9IChmaWx0ZXIpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7bG9hZGluZ0xpc3RpbmcgOiB0cnVlLCBsaXN0aW5nczogW119KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldEpzb25Db250ZW50KGZpbHRlcikuZG9uZSgobGlzdGluZ3MpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxpc3RpbmdzID0gbGlzdGluZ3MubWFwKCBsaXN0aW5nID0+IENvbnRlbnRBcmVuYS5VdGlscy5jb250ZW50UGFyc2VyRnJvbVNlcnZlcihsaXN0aW5nKSApO1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7bGlzdGluZ3M6IGxpc3RpbmdzLCBsb2FkaW5nTGlzdGluZyA6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpc3RpbmdzKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIgKCkge1xyXG4gICAgICAgIGNvbnN0IHtsaXN0aW5ncywgbG9hZGluZ0xpc3RpbmcsIGxvYWRpbmdMaXN0aW5nRGV0YWlscywgc2hvd0RldGFpbHMsIGNvbnRlbnR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1eS1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICB7IXNob3dEZXRhaWxzICYmIDxkaXYgY2xhc3NOYW1lPVwiYnV5LWNvbnRhaW5lci1sZWZ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPEV2ZW50RmlsdGVyLz5cclxuICAgICAgICAgICAgICAgICAgICA8UmlnaHRzRmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRmlsdGVyPXt0aGlzLmZpbHRlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRzUGFja2FnZT17dGhpcy5zdGF0ZS5yaWdodHNQYWNrYWdlfS8+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIHshc2hvd0RldGFpbHMgJiYgPGRpdiBjbGFzc05hbWU9XCJidXktY29udGFpbmVyLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0aW5ncy5sZW5ndGggPiAwICYmIGxpc3RpbmdzLm1hcCgobGlzdGluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxDb250ZW50TGlzdGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLnNlbGVjdExpc3Rpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtsaXN0aW5nLmN1c3RvbUlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5saXN0aW5nfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0aW5ncy5sZW5ndGggPT09IDAgJiYgbG9hZGluZ0xpc3RpbmcgJiYgPGRpdiBjbGFzc05hbWU9e1wiYmlnLXNwaW5uZXJcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RpbmdzLmxlbmd0aCA9PT0gMCAmJiAhbG9hZGluZ0xpc3RpbmcgJiYgPHNwYW4gY2xhc3NOYW1lPXtcIm5vLXJlc3VsdHNcIn0+U29ycnksIG5vIHJlc3VsdHMuIFRyeSBjaGFuZ2luZyB0aGUgZmlsdGVyIHNldHRpbmdzITwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdMaXN0aW5nRGV0YWlscyAmJiA8ZGl2IGNsYXNzTmFtZT17XCJiaWctc3Bpbm5lclwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3dEZXRhaWxzICYmICFsb2FkaW5nTGlzdGluZ0RldGFpbHMgJiYgPExpc3RpbmdEZXRhaWxzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmFjaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd0RldGFpbHM6IGZhbHNlfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD17Y29udGVudH0vPlxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCBzdGF0ZSwgb3duUHJvcHMpID0+IHtcclxuICAgIHJldHVybiBvd25Qcm9wcztcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25DbGljazogaWQgPT4gZGlzcGF0Y2godGVzdChpZCkpXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKE1hcmtldHBsYWNlKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL01hcmtldHBsYWNlLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgeyB0ZXN0IH0gZnJvbSBcIi4uL2FjdGlvbnNcIjtcclxuaW1wb3J0IFNhbGVzUGFja2FnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9TYWxlc1BhY2thZ2VcIlxyXG5cclxuY2xhc3MgU2FsZXNQYWNrYWdlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYmlkSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYXVjdGlvbi5zdmdcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGZWUgPSAoc2FsZXNQYWNrYWdlKSA9PiB7XHJcbiAgICAgICAgbGV0IGN1cnJlbmN5U3ltYm9sID0gKHNhbGVzUGFja2FnZS5jdXJyZW5jeS5jb2RlID09PSBcIkVVUlwiID8gXCLigqxcIiA6IFwiJFwiKTtcclxuICAgICAgICByZXR1cm4gc2FsZXNQYWNrYWdlLmZlZSArIFwiIFwiICsgY3VycmVuY3lTeW1ib2wgO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3NhbGVzUGFja2FnZXN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNhbGVzLXBhY2thZ2VzXCI+XHJcbiAgICAgICAgICAgICAgICB7IHNhbGVzUGFja2FnZXMubWFwKCAoc2FsZXNQYWNrYWdlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2FsZXMtcGFja2FnZS1jb250YWluZXJcIiBrZXk9e1wic2FsZXMtcGFja2FnZS1cIisgaX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tmbGV4IDogMSwgdGV4dEFsaWduOiAnY2VudGVyJ319PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NhbGVzUGFja2FnZS50ZXJyaXRvcmllcy5sZW5ndGh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZmxleCA6IDh9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzYWxlc1BhY2thZ2UubmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZmxleCA6IDJ9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWluZm8tY2lyY2xlXCIgb25DbGljaz17KCkgPT4geyAgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoIHNhbGVzUGFja2FnZS5zYWxlc01ldGhvZC5uYW1lICE9PSBcIkJJRERJTkdcIiB8fCAgKCBzYWxlc1BhY2thZ2Uuc2FsZXNNZXRob2QubmFtZSA9PT0gXCJCSURESU5HXCIgJiYgc2FsZXNQYWNrYWdlLmZlZSA+IDAgKSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJjxkaXYgc3R5bGU9e3tmbGV4IDogMiwganVzdGlmeUNvbnRlbnQ6IFwiZmxleC1lbmRcIiwgZGlzcGxheTogXCJmbGV4XCJ9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRGZWUoc2FsZXNQYWNrYWdlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c2FsZXNQYWNrYWdlLnNhbGVzTWV0aG9kLm5hbWUgPT09IFwiQklERElOR1wiICYmPGRpdiBzdHlsZT17e2ZsZXggOiAxLCBqdXN0aWZ5Q29udGVudDogXCJmbGV4LWVuZFwiLCBkaXNwbGF5OiBcImZsZXhcIn19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17e3dpZHRoOiAzMH19IHNyYz17dGhpcy5iaWRJY29ufS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc2FsZXNQYWNrYWdlLnNhbGVzTWV0aG9kLm5hbWUgPT09IFwiRklYRURcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdGFuZGFyZC1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdXkgbm93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzYWxlc1BhY2thZ2Uuc2FsZXNNZXRob2QubmFtZSA9PT0gXCJCSURESU5HXCIgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RhbmRhcmQtYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGxhY2UgYmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGVcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25DbGljazogaWQgPT4gZGlzcGF0Y2godGVzdChpZCkpXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNhbGVzUGFja2FnZXMpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbnRhaW5lcnMvU2FsZXNQYWNrYWdlcy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHsgdGVzdCB9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcblxyXG5jbGFzcyBTZWxsZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jb250ZW50LmNvbXBhbnkuZGlzcGxheU5hbWV9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxoND5Db21wYW55IGRldGFpbHM8L2g0PlxyXG5cclxuICAgICAgICAgICAgICAgIDxoNT5MZWdhbCBjb21wYW55IG5hbWU8L2g1PlxyXG4gICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMuY29udGVudC5jb21wYW55LmxlZ2FsTmFtZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgPGg1PldlYnNpdGUgVXJsPC9oNT5cclxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNvbnRlbnQuY29tcGFueS53ZWJzaXRlfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICA8aDU+Q29tcGFueSBSZWdpc3RyYXRpb24gTnVtYmVyPC9oNT5cclxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNvbnRlbnQuY29tcGFueS5yZWdpc3RyYXRpb25OdW1iZXJ9PC9wPlxyXG5cclxuICAgICAgICAgICAgICAgIDxoNT5WQVQgSUQgbnVtYmVyPC9oNT5cclxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNvbnRlbnQuY29tcGFueS52YXR9PC9wPlxyXG5cclxuICAgICAgICAgICAgICAgIDxoNT5BZGRyZXNzPC9oNT5cclxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNvbnRlbnQuY29tcGFueS5hZGRyZXNzfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICA8aDU+UGhvbmU8L2g1PlxyXG4gICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMuY29udGVudC5jb21wYW55LnBob25lfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICA8aDU+WklQPC9oNT5cclxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNvbnRlbnQuY29tcGFueS56aXB9PC9wPlxyXG5cclxuICAgICAgICAgICAgICAgIDxoNT5Db3VudHJ5PC9oNT5cclxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNvbnRlbnQuY29tcGFueS5jb3VudHJ5Lm5hbWV9PC9wPlxyXG5cclxuICAgICAgICAgICAgICAgIDxoND5Db21wYW55IGluZm9ybWF0aW9uPC9oND5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcclxuICAgIHJldHVybiBzdGF0ZVxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvbkNsaWNrOiBpZCA9PiBkaXNwYXRjaCh0ZXN0KGlkKSlcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoU2VsbGVyKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL1NlbGxlci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHsgdGVzdCB9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcblxyXG5jbGFzcyBUZWNobmljYWxEZXRhaWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlXHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9uQ2xpY2s6IGlkID0+IGRpc3BhdGNoKHRlc3QoaWQpKVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShUZWNobmljYWxEZXRhaWxzKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL1RlY2huaWNhbERldGFpbHMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xyXG5pbXBvcnQge1JpZ2h0RGVmaW5pdGlvbnN9IGZyb20gXCIuLi8uLi9zZWxsL2NvbXBvbmVudHMvUmlnaHREZWZpbml0aW9uc1wiO1xyXG5pbXBvcnQge1Byb2R1Y3Rpb25TdGFuZGFyZHNEZWZpbml0aW9uc30gZnJvbSBcIi4uLy4uL3NlbGwvY29tcG9uZW50cy9Qcm9kdWN0aW9uU3RhbmRhcmRzRGVmaW5pdGlvbnNcIjtcclxuaW1wb3J0IHtSaWdodEl0ZW1zRGVmaW5pdGlvbnN9IGZyb20gXCIuLi8uLi9zZWxsL2NvbXBvbmVudHMvUmlnaHRJdGVtc0RlZmluaXRpb25zXCI7XHJcblxyXG5jbGFzcyBUZXJtU2hlZXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIH1cclxuXHJcbiAgICBoYXNUZXh0YXJlYSA9ICgpID0+IHtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlckxpc3QgPSAoZGVmaW5pdGlvbnMpID0+IHtcclxuICAgICAgICBjb25zdCB7c2VsZWN0ZWRSaWdodHMsIHJpZ2h0c1BhY2thZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gZGVmaW5pdGlvbnMubWFwKCAocmlnaHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChyaWdodC5rZXkgPT09ICdQUk9HUkFNJykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJpZ2h0LW5hbWVcIj57cmlnaHQubmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlLm1hcCgocnApPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2ICBjbGFzc05hbWU9XCJyaWdodC1kZWZpbml0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmlnaHRJdGVtc0RlZmluaXRpb25zW3NlbGVjdGVkUmlnaHRzW3JwLmlkXS5pdGVtc1tyaWdodC5rZXldXS5sYWJlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXJUZXh0YXJlYSA9IChkZWZpbml0aW9ucykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtzZWxlY3RlZFJpZ2h0cywgcmlnaHRzUGFja2FnZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiBkZWZpbml0aW9ucy5tYXAoIChyaWdodCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmlnaHQua2V5ID09PSAnUFJPR1JBTScgfHwgIXNlbGVjdGVkUmlnaHRzW3JpZ2h0c1BhY2thZ2VbMF0uaWRdLml0ZW1zW3JpZ2h0LmtleStcIl9URVhUQVJFQVwiXSkgcmV0dXJuO1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmdWxsLWl0ZW0tYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWw+e3JpZ2h0Lm5hbWV9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxkaXYgIGNsYXNzTmFtZT1cImZ1bGwtaXRlbS1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFJpZ2h0c1tyaWdodHNQYWNrYWdlWzBdLmlkXS5pdGVtc1tyaWdodC5rZXkrXCJfVEVYVEFSRUFcIl1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyRGV0YWlscz0gKGRlZmluaXRpb25zKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3NlbGVjdGVkUmlnaHRzLCByaWdodHNQYWNrYWdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb25zLm1hcCggKHJpZ2h0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyaWdodC5rZXkgPT09ICdQUk9HUkFNJyB8fCAhc2VsZWN0ZWRSaWdodHNbcmlnaHRzUGFja2FnZVswXS5pZF0uaXRlbXNbcmlnaHQua2V5K1wiX0RFVEFJTFNcIl0pIHJldHVybjtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZnVsbC1pdGVtLWJveFwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsPntyaWdodC5uYW1lfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICBjbGFzc05hbWU9XCJmdWxsLWl0ZW0tY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRSaWdodHNbcmlnaHRzUGFja2FnZVswXS5pZF0uaXRlbXNbcmlnaHQua2V5K1wiX0RFVEFJTFNcIl1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtzZWxlY3RlZFJpZ2h0cywgcmlnaHRzUGFja2FnZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVybS1zaGVldFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXJtLXNoZWV0LWl0ZW1zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlckxpc3QoUmlnaHREZWZpbml0aW9ucykgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJMaXN0KFByb2R1Y3Rpb25TdGFuZGFyZHNEZWZpbml0aW9ucykgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e21hcmdpblRvcDogMjB9fT5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyVGV4dGFyZWEoUmlnaHREZWZpbml0aW9ucykgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUZXh0YXJlYShQcm9kdWN0aW9uU3RhbmRhcmRzRGVmaW5pdGlvbnMpIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFJpZ2h0c1tyaWdodHNQYWNrYWdlWzBdLmlkXS5pdGVtc1tcIlRFQ0hOSUNBTF9GRUVfREVUQUlMU1wiXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZ1bGwtaXRlbS1ib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5UZWNobmljYWwgRmVlIERldGFpbHM8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAgY2xhc3NOYW1lPVwiZnVsbC1pdGVtLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkUmlnaHRzW3JpZ2h0c1BhY2thZ2VbMF0uaWRdLml0ZW1zW1wiVEVDSE5JQ0FMX0ZFRV9ERVRBSUxTXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGVcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25DbGljazogaWQgPT4gZGlzcGF0Y2godGVzdChpZCkpXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFRlcm1TaGVldClcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29udGFpbmVycy9UZXJtU2hlZXQuanMiLCJcclxuZXhwb3J0IGNvbnN0IGZpbHRlclR5cGVzPSB7XHJcbiAgICBBRERfUklHSFQ6J0FERF9SSUdIVCcsXHJcbiAgICBSRU1PVkVfUklHSFQgOiAnUkVNT1ZFX1JJR0hUJyxcclxuICAgIFVQREFURV9DT1VOVFJJRVMgOiAnVVBEQVRFX0NPVU5UUklFUycsXHJcbiAgICBVUERBVEVfRVhDTFVTSVZFIDogJ1VQREFURV9FWENMVVNJVkUnXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmlsdGVyID0gKHN0YXRlID0ge1xyXG4gICAgcmlnaHRzOiBbXSxcclxuICAgIGNvdW50cmllczogW10sXHJcbiAgICBleGNsdXNpdmUgOiBmYWxzZVxyXG5cclxufSwgYWN0aW9uKSA9PiB7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuQUREX1JJR0hUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0czogWy4uLnN0YXRlLnJpZ2h0cywgYWN0aW9uLmlkXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlJFTU9WRV9SSUdIVDpcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHN0YXRlLnJpZ2h0cy5pbmRleE9mKGFjdGlvbi5pZCk7XHJcbiAgICAgICAgICAgIHN0YXRlLnJpZ2h0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0czogWy4uLnN0YXRlLnJpZ2h0c11cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfQ09VTlRSSUVTOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGNvdW50cmllczogYWN0aW9uLmNvdW50cmllc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9FWENMVVNJVkU6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgZXhjbHVzaXZlOiBhY3Rpb24uZXhjbHVzaXZlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvZmlsdGVyLmpzIiwiXHJcbmltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tICdyZWR1eCdcclxuaW1wb3J0IHttYXJrZXRwbGFjZX0gZnJvbSBcIi4vbWFya2V0cGxhY2VcIjtcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gXCIuL2ZpbHRlclwiO1xyXG5cclxuY29uc3QgcmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoe1xyXG4gICAgbWFya2V0cGxhY2UsXHJcbiAgICBmaWx0ZXJcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZWR1Y2Vyc1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvaW5kZXguanMiLCJcclxuZXhwb3J0IGNvbnN0IG1hcmtldHBsYWNlVHlwZXM9IHtcclxuICAgIFRFU1Q6J1RFU1QnLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG1hcmtldHBsYWNlID0gKHN0YXRlID0ge1xyXG4gICAgdGVzdEl0ZW06IFwibWFya2V0cGxhY2VSZWR1Y2VyXCJcclxuXHJcbn0sIGFjdGlvbikgPT4ge1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIG1hcmtldHBsYWNlVHlwZXMuVEVTVDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICB0ZXN0OiBhY3Rpb24udGV4dCxcclxuICAgICAgICAgICAgICAgIGlkIDogYWN0aW9uLmlkXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2UuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHJlZHVjZXJzIGZyb20gXCIuL3JlZHVjZXJzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyZWR1Y2Vycyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3N0b3JlLmpzIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IE1vbWVudCBmcm9tIFwibW9tZW50L21vbWVudFwiO1xyXG5cclxuY2xhc3MgQ29udGVudExpc3RpbmcgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge307XHJcbiAgICAgICAgdGhpcy5iaWRJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9hdWN0aW9uLnN2Z1wiO1xyXG4gICAgICAgIHRoaXMubm9JbWFnZSA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvbm8taW1hZ2UucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmVlID0gKHNhbGVzUGFja2FnZSkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCB7Y3VycmVuY3l9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBsZXQgY3VycmVuY3lTeW1ib2wgPSAoY3VycmVuY3kgPT09IFwiRVVSXCIgPyBcIuKCrFwiIDogXCIkXCIpO1xyXG4gICAgICAgIHJldHVybiBzYWxlc1BhY2thZ2UuZmVlICsgXCIgXCIgKyBjdXJyZW5jeVN5bWJvbCA7XHJcbiAgICB9O1xyXG5cclxuICAgIG9uU2VsZWN0ID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB7b25TZWxlY3QsIGN1c3RvbUlkfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICBpZiAoIG9uU2VsZWN0ICkgb25TZWxlY3QoY3VzdG9tSWQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBleHBpcmF0aW9uRGF0ZSxcclxuICAgICAgICAgICAgcmlnaHRzUGFja2FnZSxcclxuICAgICAgICAgICAgc3BvcnRDYXRlZ29yeSxcclxuICAgICAgICAgICAgdG91cm5hbWVudCxcclxuICAgICAgICAgICAgc2Vhc29ucyxcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlcyxcclxuICAgICAgICAgICAgaW1hZ2VCYXNlNjQsXHJcbiAgICAgICAgICAgIGltYWdlXHJcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIGxldCBzZWFzb25OYW1lID0gIHNlYXNvbnMubWFwKHNlYXNvbiA9PiAoc2Vhc29uLm5hbWUpKS5qb2luKFwiLCBcIik7XHJcbiAgICAgICAgbGV0IGxpc3RpbmdJbWFnZSA9IChpbWFnZUJhc2U2NCkgPyBpbWFnZUJhc2U2NCA6IGltYWdlID8gYXNzZXRzQmFzZURpciArIFwiLi4vXCIgKyBpbWFnZSA6IHRoaXMubm9JbWFnZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0aW5nLWxpc3Qtdmlld1wiIG9uQ2xpY2s9e3RoaXMub25TZWxlY3R9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibGVmdFwifSAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImltYWdlXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17bGlzdGluZ0ltYWdlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiZGF0ZVwifT5QdWJsaXNoZWQgPHNwYW4+e01vbWVudCgpLmZvcm1hdCgnREQvTU0vWVlZWScpfTwvc3Bhbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJkYXRlXCJ9PkV4cGlyZXMgPHNwYW4+e01vbWVudChleHBpcmF0aW9uRGF0ZSkuZm9ybWF0KCdERC9NTS9ZWVlZJyl9PC9zcGFuPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJyaWdodFwifSA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibmFtZVwifT57bmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTogXCJmbGV4XCJ9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2ZsZXg6IDEsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogXCIzMHB4XCJ9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzcG9ydENhdGVnb3J5ICYmIHNwb3J0Q2F0ZWdvcnkubGVuZ3RoID4gMCAmJiA8ZGl2PntzcG9ydENhdGVnb3J5WzBdLm5hbWV9PC9kaXY+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RvdXJuYW1lbnQgJiYgdG91cm5hbWVudC5sZW5ndGggPiAwICYmIDxkaXY+e3RvdXJuYW1lbnRbMF0ubmFtZX08L2Rpdj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vhc29ucyAmJiBzZWFzb25zLmxlbmd0aCA+IDAgJiYgPGRpdj57c2Vhc29uTmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tmbGV4OiAyLCBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2UubWFwKCggc3IsaSApPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGtleT17aX0gIHN0eWxlPXt7cGFkZGluZ0JvdHRvbTogMTAsIGZsZXhEaXJlY3Rpb246ICdyb3cnLCBkaXNwbGF5OiAnZmxleCd9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIHN0eWxlPXt7Y29sb3I6ICcjMkRBN0U2J319IGNsYXNzTmFtZT1cImZhIGZhLWNoZWNrLWNpcmNsZS1vXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NyLmV4Y2x1c2l2ZSAmJiA8c3BhbiBzdHlsZT17e2ZvbnRTaXplOiAxMH19PkVYQ0xVU0lWRTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NyLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wic2FsZXMtYnVuZGxlc1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcy5zbGljZSgwLCA0KS5tYXAoICggc2FsZXNQYWNrYWdlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICA8ZGl2IGNsYXNzTmFtZT1cInNhbGVzLXBhY2thZ2VcIiBrZXk9e1wic2FsZXMtcGFja2FnZS1cIisgaX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzYWxlc1BhY2thZ2UubmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzYWxlc1BhY2thZ2Uuc2FsZXNNZXRob2QgPT09IFwiQklERElOR1wiICYmPGRpdiBzdHlsZT17e2ZsZXggOiAxLCBqdXN0aWZ5Q29udGVudDogXCJmbGV4LWVuZFwiLCBkaXNwbGF5OiBcImZsZXhcIn19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17e3dpZHRoOiAzMH19IHNyYz17dGhpcy5iaWRJY29ufS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICggc2FsZXNQYWNrYWdlLnNhbGVzTWV0aG9kICE9PSBcIkJJRERJTkdcIiB8fCAgKCBzYWxlc1BhY2thZ2Uuc2FsZXNNZXRob2QgPT09IFwiQklERElOR1wiICYmIHNhbGVzUGFja2FnZS5mZWUgPiAwICkgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiY8ZGl2IHN0eWxlPXt7bWFyZ2luOiAnMCAxMHB4JywgZGlzcGxheTogXCJmbGV4XCIsIGZsZXg6ICcxIDAgYXV0byd9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRGZWUoc2FsZXNQYWNrYWdlKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXMubGVuZ3RoID4gNCAmJiA8ZGl2IGNsYXNzTmFtZT1cInNhbGVzLXBhY2thZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7Y29sb3I6ICcjMkRBN0U2J319PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsge3NhbGVzUGFja2FnZXMubGVuZ3RoIC0gNH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRlbnRMaXN0aW5nO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvQ29udGVudExpc3RpbmcuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XHJcblxyXG5jbGFzcyBDb3VudHJ5U2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGNvdW50cmllcyA6IFtdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoIENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgQ29udGVudEFyZW5hLkFwaS5nZXRDb3VudHJpZXMoKS5kb25lKCAoY291bnRyaWVzICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzID0gY291bnRyaWVzO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe2NvdW50cmllc30pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7Y291bnRyaWVzOiBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXN9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0T3B0aW9ucyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7ZmlsdGVyID0gW119ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBsZXQgY291bnRyaWVzID0gT2JqZWN0LnZhbHVlcyhDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMpLm1hcCgoaSxrKT0+KHt2YWx1ZSA6IGkubmFtZSAsIGxhYmVsIDogaS5uYW1lIH0pKTtcclxuICAgICAgICBjb3VudHJpZXMgPSBjb3VudHJpZXMuZmlsdGVyKGNvdW50cnkgPT4gZmlsdGVyLmluZGV4T2YoY291bnRyeS52YWx1ZSkgPT09IC0xKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvdW50cmllcztcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBvbkNoYW5nZSwgY2xhc3NOYW1lLCBtdWx0aSA9IHRydWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8U2VsZWN0XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZSB9XHJcbiAgICAgICAgICAgICAgICBuYW1lPVwiZm9ybS1maWVsZC1uYW1lXCJcclxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cclxuICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgICAgICAgIG11bHRpPXttdWx0aX1cclxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMuZ2V0T3B0aW9ucygpfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ291bnRyeVNlbGVjdG9yO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9Db3VudHJ5U2VsZWN0b3IuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgTWF0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbWF0Y2ggOiBwcm9wcy5tYXRjaCxcclxuICAgICAgICAgICAgc2VsZWN0ZWQgOiBwcm9wcy5zZWxlY3RlZCB8fCBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSA9IChlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiAoe1xyXG4gICAgICAgICAgICBzZWxlY3RlZDogIXByZXZTdGF0ZS5zZWxlY3RlZFxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblVwZGF0ZSghdGhpcy5zdGF0ZS5zZWxlY3RlZCk7XHJcblxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGUgPSAoc2VsZWN0ZWQpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogc2VsZWN0ZWR9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3QgY29tcGV0aXRvcnNMZW4gPSB0aGlzLnByb3BzLm1hdGNoLmNvbXBldGl0b3JzLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJtYXRjaCBcIiB9IG9uQ2xpY2s9eygpID0+IHsgdGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLm1hdGNoLmV4dGVybmFsSWQpIH0gfT5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLm1hdGNoLnNlbGVjdGVkICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNpcmNsZVwiLz59XHJcbiAgICAgICAgICAgICAgICB7IXRoaXMucHJvcHMubWF0Y2guc2VsZWN0ZWQgJiYgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2lyY2xlLW9cIi8+fVxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMubWF0Y2guY29tcGV0aXRvcnMubWFwKCggY29tcGV0aXRvciwgaSk9PntcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtpfT57Y29tcGV0aXRvci5uYW1lfSB7KGNvbXBldGl0b3JzTGVuICE9PSBpICsgMSkgJiYgXCIgdnMgXCIgfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXRjaDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbXBvbmVudHMvTWF0Y2guanMiLCJleHBvcnQgY29uc3QgUHJvZHVjdGlvblN0YW5kYXJkc0RlZmluaXRpb25zID0gW1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiVmlkZW8gU3RhbmRhcmRcIixcclxuICAgICAgICBrZXk6IFwiVklERU9fU1RBTkRBUkRcIixcclxuICAgICAgICBzdXBlclJpZ2h0czogW10sXHJcbiAgICAgICAgb3B0aW9ucyA6IFtcclxuICAgICAgICAgICAgXCJWSURFT19TVEFOREFSRF9IRFwiLFxyXG4gICAgICAgICAgICBcIlZJREVPX1NUQU5EQVJEX1NEXCIsXHJcbiAgICAgICAgICAgIFwiVklERU9fU1RBTkRBUkRfVUhEXCIsXHJcbiAgICAgICAgICAgIFwiVklERU9fU1RBTkRBUkRfVlJcIixcclxuICAgICAgICAgICAgXCJWSURFT19TVEFOREFSRF9OT1RfQVZBSUxBQkxFXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIG11bHRpcGxlIDogZmFsc2VcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJBc3BlY3QgcmF0aW9cIixcclxuICAgICAgICBrZXk6IFwiQVNQRUNUX1JBVElPXCIsXHJcbiAgICAgICAgc3VwZXJSaWdodHM6IFtdLFxyXG4gICAgICAgIG9wdGlvbnMgOiBbXHJcbiAgICAgICAgICAgIFwiQVNQRUNUX1JBVElPXzE2XzlcIixcclxuICAgICAgICAgICAgXCJBU1BFQ1RfUkFUSU9fNF8zXCIsXHJcbiAgICAgICAgICAgIFwiQVNQRUNUX1JBVElPX0NVU1RPTVwiLFxyXG4gICAgICAgICAgICBcIkFTUEVDVF9SQVRJT19OT1RfQVZBSUxBQkxFXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIG11bHRpcGxlIDogZmFsc2VcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJHcmFwaGljc1wiLFxyXG4gICAgICAgIGtleTogXCJHUkFQSElDU1wiLFxyXG4gICAgICAgIHN1cGVyUmlnaHRzOiBbXSxcclxuICAgICAgICBvcHRpb25zIDogW1xyXG4gICAgICAgICAgICBcIkdSQVBISUNTX05PXCIsXHJcbiAgICAgICAgICAgIFwiR1JBUEhJQ1NfWUVTXCIsXHJcbiAgICAgICAgICAgIFwiR1JBUEhJQ1NfTk9UX0FWQUlMQUJMRVwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBtdWx0aXBsZSA6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiQ29tbWVudGFyeVwiLFxyXG4gICAgICAgIGtleTogXCJDT01NRU5UQVJZXCIsXHJcbiAgICAgICAgc3VwZXJSaWdodHM6IFtdLFxyXG4gICAgICAgIG9wdGlvbnMgOiBbXHJcbiAgICAgICAgICAgIFwiQ09NTUVOVEFSWV9OT1wiLFxyXG4gICAgICAgICAgICBcIkNPTU1FTlRBUllfWUVTXCIsXHJcbiAgICAgICAgICAgIFwiQ09NTUVOVEFSWV9OT1RfQVZBSUxBQkxFXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIG11bHRpcGxlIDogZmFsc2VcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJDYW1lcmEgc3RhbmRhcmRzXCIsXHJcbiAgICAgICAga2V5OiBcIkNBTUVSQVwiLFxyXG4gICAgICAgIHN1cGVyUmlnaHRzOiBbXSxcclxuICAgICAgICBvcHRpb25zIDogW1xyXG4gICAgICAgICAgICBcIkNBTUVSQV9NSU5JTVVNXCIsXHJcbiAgICAgICAgICAgIFwiQ0FNRVJBX05PVF9BVkFJTEFCTEVcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbXVsdGlwbGUgOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcIlRlY2huaWNhbCBkZWxpdmVyeVwiLFxyXG4gICAgICAgIGtleTogXCJURUNITklDQUxfREVMSVZFUllcIixcclxuICAgICAgICBzdXBlclJpZ2h0czogW10sXHJcbiAgICAgICAgb3B0aW9ucyA6IFtcclxuICAgICAgICAgICAgXCJURUNITklDQUxfREVMSVZFUllfU0FURUxMSVRFXCIsXHJcbiAgICAgICAgICAgIFwiVEVDSE5JQ0FMX0RFTElWRVJZX0lQXCIsXHJcbiAgICAgICAgICAgIFwiVEVDSE5JQ0FMX0RFTElWRVJZX0ZUUFwiLFxyXG4gICAgICAgICAgICBcIlRFQ0hOSUNBTF9ERUxJVkVSWV9GSUJFUlwiLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbXVsdGlwbGUgOiBmYWxzZSxcclxuICAgICAgICBzaG93VGV4dEFyZWE6XCJGVVJUSEVSX0RFVEFJTFNcIixcclxuICAgICAgICB0ZWNobmljYWxGZWUgOiBcIlRFQ0hOSUNBTF9ERUxJVkVSWV9TQVRFTExJVEVcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lOiBcIkNvbnRlbnQgcHJvZHVjdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJDT05URU5UXCIsXHJcbiAgICAgICAgc3VwZXJSaWdodHM6IFtdLFxyXG4gICAgICAgIG9wdGlvbnMgOiBbXHJcbiAgICAgICAgICAgIFwiQ09OVEVOVF9BTExcIixcclxuICAgICAgICAgICAgXCJDT05URU5UX1RFWFRcIixcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNob3dUZXh0QXJlYTpcIkNPTlRFTlRfVEVYVFwiLFxyXG4gICAgICAgIG11bHRpcGxlIDogZmFsc2VcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJQcm9ncmFtIERldGFpbHNcIixcclxuICAgICAgICBrZXk6IFwiUFJPR1JBTVwiLFxyXG4gICAgICAgIHN1cGVyUmlnaHRzOiBbJ1BSJ10sXHJcbiAgICAgICAgb3B0aW9ucyA6IFtcclxuICAgICAgICBdLFxyXG4gICAgICAgIG11bHRpcGxlIDogZmFsc2VcclxuICAgIH1cclxuXTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbXBvbmVudHMvUHJvZHVjdGlvblN0YW5kYXJkc0RlZmluaXRpb25zLmpzIiwiZXhwb3J0IGNvbnN0IFJpZ2h0RGVmaW5pdGlvbnMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogXCJSaWdodCB0byBzdWJsaWNlbnNlXCIsXHJcbiAgICAgICAga2V5OiBcIlNVQkxJQ0VOU0VcIixcclxuICAgICAgICBzdXBlclJpZ2h0czogW10sXHJcbiAgICAgICAgb3B0aW9ucyA6IFtcclxuICAgICAgICAgICAgXCJTVUJMSUNFTlNFX1lFU1wiLFxyXG4gICAgICAgICAgICBcIlNVQkxJQ0VOU0VfWUVTX0FQUFJPVkFMXCIsXHJcbiAgICAgICAgICAgIFwiU1VCTElDRU5TRV9OT1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBtdWx0aXBsZSA6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWUgOiBcIkN1dCBhdmFpbGFibGVcIixcclxuICAgICAgICBrZXk6IFwiQ1VUU1wiLFxyXG4gICAgICAgIHN1cGVyUmlnaHRzOiBbXCJITFwiLFwiQ0xcIixcIk5BXCJdLFxyXG4gICAgICAgIG9wdGlvbnMgOiBbXHJcbiAgICAgICAgICAgIFwiQ1VUX0FWQUlMQUJMRV9ZRVNcIixcclxuICAgICAgICAgICAgXCJDVVRfQVZBSUxBQkxFX05PXCIsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBtdWx0aXBsZSA6IGZhbHNlLFxyXG4gICAgICAgIHNob3dUZXh0QXJlYSA6IFwiQ1VUX0FWQUlMQUJMRV9ZRVNcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBuYW1lIDogXCJCcm9hZGNhc3Rpbmcgb2JsaWdhdGlvblwiLFxyXG4gICAgICAgIGtleTogXCJCUk9BRENBU1RJTkdcIixcclxuICAgICAgICBzdXBlclJpZ2h0czogW10sXHJcbiAgICAgICAgb3B0aW9ucyA6IFtcclxuICAgICAgICAgICAgXCJCUk9BRENBU1RJTkdfTk9cIixcclxuICAgICAgICAgICAgXCJCUk9BRENBU1RJTkdfWUVTXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIHNob3dUZXh0QXJlYTpcIkJST0FEQ0FTVElOR19ZRVNcIixcclxuICAgICAgICBtdWx0aXBsZSA6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWUgOiBcIlRyYW5zbWlzc2lvbiBtZWFuc1wiLFxyXG4gICAgICAgIGtleTogXCJUUkFOU01JU1NJT05fTUVBTlNcIixcclxuICAgICAgICBzdXBlclJpZ2h0czogW10sXHJcbiAgICAgICAgb3B0aW9ucyA6IFtcclxuICAgICAgICAgICAgXCJUUkFOU01JU1NJT05fTUVBTlNfQUxMXCIsXHJcbiAgICAgICAgICAgIFwiVFJBTlNNSVNTSU9OX01FQU5TX0NBQkxFXCIsXHJcbiAgICAgICAgICAgIFwiVFJBTlNNSVNTSU9OX01FQU5TX1NBVEVMTElURVwiLFxyXG4gICAgICAgICAgICBcIlRSQU5TTUlTU0lPTl9NRUFOU19ESUdJVEFMXCIsXHJcbiAgICAgICAgICAgIFwiVFJBTlNNSVNTSU9OX01FQU5TX09UVFwiLFxyXG4gICAgICAgICAgICBcIlRSQU5TTUlTU0lPTl9NRUFOU19JTlRFUk5FVFwiLFxyXG4gICAgICAgICAgICBcIlRSQU5TTUlTU0lPTl9NRUFOU19NT0JJTEVcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbXVsdGlwbGUgOiB0cnVlXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IFwiRXhwbG9pdGF0aW9uIGZvcm1cIixcclxuICAgICAgICBrZXkgOiBcIkVYUExPSVRBVElPTl9GT1JNXCIsXHJcbiAgICAgICAgc3VwZXJSaWdodHMgOiBbXSxcclxuICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgIFwiRVhQTE9JVEFUSU9OX0ZPUk1fQUxMXCIsXHJcbiAgICAgICAgICAgIFwiRVhQTE9JVEFUSU9OX0ZPUk1fRlJFRVwiLFxyXG4gICAgICAgICAgICBcIkVYUExPSVRBVElPTl9GT1JNX1BBWVwiLFxyXG4gICAgICAgICAgICBcIkVYUExPSVRBVElPTl9GT1JNX0lOLVNISVBcIixcclxuICAgICAgICAgICAgXCJFWFBMT0lUQVRJT05fRk9STV9DTE9TRURcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbXVsdGlwbGU6IHRydWVcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZSA6IFwiTnVtYmVyIG9mIHJ1bnNcIixcclxuICAgICAgICBrZXk6IFwiUlVOU1wiLFxyXG4gICAgICAgIHN1cGVyUmlnaHRzOiBbXCJDTFwiLFwiTkFcIixcIlBSXCIsIFwiRFRcIiwgXCJITFwiXSxcclxuICAgICAgICBvcHRpb25zIDogW1xyXG4gICAgICAgICAgICBcIlJVTlNfVU5MSU1JVEVEXCIsXHJcbiAgICAgICAgICAgIFwiUlVOU19MSU1JVEVEXCIsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBtdWx0aXBsZSA6IGZhbHNlXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWUgOiBcIkV4cGxvaXRhdGlvbiB3aW5kb3dcIixcclxuICAgICAgICBrZXk6IFwiRVhQTE9JVEFUSU9OX1dJTkRPV1wiLFxyXG4gICAgICAgIHN1cGVyUmlnaHRzOiBbXCJDTFwiLFwiTkFcIixcIlBSXCIsIFwiRFRcIiwgXCJITFwiXSxcclxuICAgICAgICBvcHRpb25zIDogW1xyXG4gICAgICAgICAgICBcIkVYUExPSVRBVElPTl9XSU5ET1dfVU5MSU1JVEVEXCIsXHJcbiAgICAgICAgICAgIFwiRVhQTE9JVEFUSU9OX1dJTkRPV19MSU1JVEVEXCIsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBtdWx0aXBsZSA6IGZhbHNlLFxyXG4gICAgICAgIHNob3dUZXh0QXJlYTpcIkVYUExPSVRBVElPTl9XSU5ET1dfTElNSVRFRFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIG5hbWUgOiBcIlJlc2VydmVkIHJpZ2h0c1wiLFxyXG4gICAgICAgIGtleTogXCJSRVNFUlZFRF9SSUdIVFNcIixcclxuICAgICAgICBzdXBlclJpZ2h0czogW10sXHJcbiAgICAgICAgb3B0aW9ucyA6IFtcclxuICAgICAgICAgICAgXCJSRVNFUlZFRF9SSUdIVFNfTk9cIixcclxuICAgICAgICAgICAgXCJSRVNFUlZFRF9SSUdIVFNfWUVTXCIsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBtdWx0aXBsZSA6IGZhbHNlLFxyXG4gICAgICAgIHNob3dUZXh0QXJlYTpcIlJFU0VSVkVEX1JJR0hUU19ZRVNcIlxyXG5cclxuICAgIH0sXHJcbl07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL1JpZ2h0RGVmaW5pdGlvbnMuanMiLCJleHBvcnQgY29uc3QgUmlnaHRJdGVtc0RlZmluaXRpb25zID0ge1xyXG4gICAgXCJCUk9BRENBU1RJTkdfWUVTXCIgOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiQnJvYWRjYXN0aW5nIG9ibGlnYXRpb25cIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIlllc1wiXHJcbiAgICB9LFxyXG4gICAgXCJCUk9BRENBU1RJTkdfTk9cIiA6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJCcm9hZGNhc3Rpbmcgb2JsaWdhdGlvblwiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiTm9cIlxyXG4gICAgfSxcclxuICAgIFwiU1VCTElDRU5TRV9ZRVNcIiA6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJSaWdodCB0byBzdWJsaWNlbnNlXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJZZXMsIGZyZWUgc3VibGljZW5zaW5nXCJcclxuICAgIH0sXHJcbiAgICBcIlNVQkxJQ0VOU0VfWUVTX0FQUFJPVkFMXCIgOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiUmlnaHQgdG8gc3VibGljZW5zZVwiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiWWVzLCBidXQgcmVtYWlucyBzdWJqZWN0IHRvIHNlbGxlcidzIGFwcHJvdmFsXCJcclxuICAgIH0sXHJcbiAgICBcIlNVQkxJQ0VOU0VfTk9cIiA6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJSaWdodCB0byBzdWJsaWNlbnNlXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJObyBzdWJsaWNlbnNpbmdcIlxyXG4gICAgfSxcclxuICAgIFwiQ1VUX0FWQUlMQUJMRV9ZRVNcIiA6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJDdXQgYXZhaWxhYmxlXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJZZXNcIlxyXG4gICAgfSxcclxuICAgIFwiQ1VUX0FWQUlMQUJMRV9OT1wiIDoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkN1dCBhdmFpbGFibGVcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIk5vXCJcclxuICAgIH0sXHJcbiAgICBcIlRSQU5TTUlTU0lPTl9NRUFOU19BTExcIiA6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJUcmFuc21pc3Npb24gbWVhbnNcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIkFsbFwiXHJcbiAgICB9LFxyXG4gICAgXCJUUkFOU01JU1NJT05fTUVBTlNfQ0FCTEVcIiA6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJUcmFuc21pc3Npb24gbWVhbnNcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIkNhYmxlICYgaXB0dlwiXHJcbiAgICB9LFxyXG4gICAgXCJUUkFOU01JU1NJT05fTUVBTlNfU0FURUxMSVRFXCIgOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiVHJhbnNtaXNzaW9uIG1lYW5zXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJTYXRlbGxpdGVcIlxyXG4gICAgfSxcclxuICAgIFwiVFJBTlNNSVNTSU9OX01FQU5TX0RJR0lUQUxcIiA6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJUcmFuc21pc3Npb24gbWVhbnNcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIkRpZ2l0YWwgdGVycmVzdHJpYWxcIlxyXG4gICAgfSxcclxuICAgIFwiVFJBTlNNSVNTSU9OX01FQU5TX09UVFwiIDoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIlRyYW5zbWlzc2lvbiBtZWFuc1wiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiT1RUXCJcclxuICAgIH0sXHJcbiAgICBcIlRSQU5TTUlTU0lPTl9NRUFOU19JTlRFUk5FVFwiIDoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIlRyYW5zbWlzc2lvbiBtZWFuc1wiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiSW50ZXJuZXRcIlxyXG4gICAgfSxcclxuICAgIFwiVFJBTlNNSVNTSU9OX01FQU5TX01PQklMRVwiIDoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIlRyYW5zbWlzc2lvbiBtZWFuc1wiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiTW9iaWxlXCJcclxuICAgIH0sXHJcbiAgICBcIkVYUExPSVRBVElPTl9GT1JNX0FMTFwiIDoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkV4cGxvaXRhdGlvbiBmb3JtXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJBbGxcIlxyXG4gICAgfSxcclxuICAgIFwiRVhQTE9JVEFUSU9OX0ZPUk1fRlJFRVwiIDoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkV4cGxvaXRhdGlvbiBmb3JtXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJGcmVlIE9ubHlcIlxyXG4gICAgfSxcclxuICAgIFwiRVhQTE9JVEFUSU9OX0ZPUk1fUEFZXCIgOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiRXhwbG9pdGF0aW9uIGZvcm1cIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIlBheSBvbmx5XCJcclxuICAgIH0sXHJcbiAgICBcIkVYUExPSVRBVElPTl9GT1JNX0lOLVNISVBcIiA6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJFeHBsb2l0YXRpb24gZm9ybVwiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiSW4tc2hpcCBhbmQgaW4tZmxpZ2h0XCJcclxuICAgIH0sXHJcbiAgICBcIkVYUExPSVRBVElPTl9GT1JNX0NMT1NFRFwiIDoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkV4cGxvaXRhdGlvbiBmb3JtXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJDbG9zZWQgY2lyY3VpdFwiXHJcbiAgICB9LFxyXG4gICAgXCJSVU5TX1VOTElNSVRFRFwiIDoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIk51bWJlciBvZiBydW5zXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJVbmxpbWl0ZWRcIlxyXG4gICAgfSxcclxuICAgIFwiUlVOU19MSU1JVEVEXCIgOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiTnVtYmVyIG9mIHJ1bnNcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIkxpbWl0ZWRcIixcclxuICAgICAgICBudW1iZXJGaWVsZCA6IHRydWVcclxuICAgIH0sXHJcbiAgICBcIkVYUExPSVRBVElPTl9XSU5ET1dfVU5MSU1JVEVEXCIgOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiRXhwbG9pdGF0aW9uIHdpbmRvd1wiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiVW5saW1pdGVkXCJcclxuICAgIH0sXHJcbiAgICBcIkVYUExPSVRBVElPTl9XSU5ET1dfTElNSVRFRFwiIDoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkV4cGxvaXRhdGlvbiB3aW5kb3dcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIkxpbWl0ZWRcIlxyXG4gICAgfSxcclxuXHJcbiAgICBcIlZJREVPX1NUQU5EQVJEX0hEXCI6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJWaWRlbyBzdGFuZGFyZFwiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiSERcIlxyXG4gICAgfSxcclxuICAgIFwiVklERU9fU1RBTkRBUkRfU0RcIjoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIlZpZGVvIHN0YW5kYXJkXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJTRFwiXHJcbiAgICB9LFxyXG4gICAgXCJWSURFT19TVEFOREFSRF9VSERcIjoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIlZpZGVvIHN0YW5kYXJkXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJVSERcIlxyXG4gICAgfSxcclxuICAgIFwiVklERU9fU1RBTkRBUkRfVlJcIjoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIlZpZGVvIHN0YW5kYXJkXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJWUlwiXHJcbiAgICB9LFxyXG4gICAgXCJWSURFT19TVEFOREFSRF9OT1RfQVZBSUxBQkxFXCIgOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiVmlkZW8gc3RhbmRhcmRcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIkluZm8gbm90IGF2YWlsYWJsZSB5ZXRcIlxyXG4gICAgfSxcclxuICAgIFwiUkVTRVJWRURfUklHSFRTX05PXCI6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJSZXNlcnZlZCByaWdodHNcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIk5vXCJcclxuICAgIH0sXHJcbiAgICBcIlJFU0VSVkVEX1JJR0hUU19ZRVNcIjoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIlJlc2VydmVkIHJpZ2h0c1wiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiWWVzXCIsXHJcblxyXG4gICAgfSxcclxuICAgIFwiQVNQRUNUX1JBVElPXzE2XzlcIjoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkFzcGVjdCByYXRpb1wiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiMTY6OVwiLFxyXG4gICAgfSxcclxuICAgIFwiQVNQRUNUX1JBVElPXzRfM1wiOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiQXNwZWN0IHJhdGlvXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCI0OjNcIixcclxuICAgIH0sXHJcbiAgICBcIkFTUEVDVF9SQVRJT19DVVNUT01cIjoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkFzcGVjdCByYXRpb1wiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiT3RoZXJcIixcclxuICAgICAgICB0ZXh0RmllbGQgOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgXCJBU1BFQ1RfUkFUSU9fTk9UX0FWQUlMQUJMRVwiIDoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkFzcGVjdCByYXRpb1wiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiSW5mbyBub3QgYXZhaWxhYmxlIHlldFwiXHJcbiAgICB9LFxyXG4gICAgXCJHUkFQSElDU19OT1wiOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiR3JhcGhpY3NcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIk5vXCJcclxuICAgIH0sXHJcbiAgICBcIkdSQVBISUNTX1lFU1wiOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiR3JhcGhpY3NcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIlllc1wiLFxyXG4gICAgICAgIGxhbmd1YWdlIDogdHJ1ZSxcclxuICAgICAgICBsYW5ndWFnZXM6IFtdXHJcbiAgICB9LFxyXG4gICAgXCJHUkFQSElDU19OT1RfQVZBSUxBQkxFXCIgOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiR3JhcGhpY3NcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIkluZm8gbm90IGF2YWlsYWJsZSB5ZXRcIlxyXG4gICAgfSxcclxuICAgIFwiQ09NTUVOVEFSWV9OT1wiOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiQ29tbWVudGFyeVwiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiTm9cIlxyXG4gICAgfSxcclxuICAgIFwiQ09NTUVOVEFSWV9ZRVNcIjoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkNvbW1lbnRhcnlcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIlllc1wiLFxyXG4gICAgICAgIGxhbmd1YWdlIDogdHJ1ZSxcclxuICAgICAgICBsYW5ndWFnZXM6IFtdXHJcbiAgICB9LFxyXG4gICAgXCJDT01NRU5UQVJZX05PVF9BVkFJTEFCTEVcIjoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkNvbW1lbnRhcnlcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIkluZm8gbm90IGF2YWlsYWJsZSB5ZXRcIlxyXG4gICAgfSxcclxuICAgIFwiQ0FNRVJBX01JTklNVU1cIjoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkNhbWVyYSBzdGFuZGFyZHNcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIk1pbmltdW0gY2FtZXJhc1wiLFxyXG4gICAgICAgIG51bWJlckZpZWxkIDogdHJ1ZSxcclxuICAgICAgICBudW1iZXJGaWVsZFZhbHVlIDogXCJDQU1FUkFTXCJcclxuICAgIH0sXHJcbiAgICBcIkNBTUVSQV9URVhUXCI6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJDYW1lcmEgc3RhbmRhcmRzXCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJcIixcclxuICAgICAgICB0ZXh0RmllbGQgOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgXCJDQU1FUkFfTk9UX0FWQUlMQUJMRVwiIDoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkNhbWVyYSBzdGFuZGFyZHNcIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIkluZm8gbm90IGF2YWlsYWJsZSB5ZXRcIlxyXG4gICAgfSxcclxuICAgIFwiQ09OVEVOVF9BTExcIjoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIkNvbnRlbnQgcHJvZHVjdGlvblwiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiQWxsIGNvbnRlbnQgcHJvZHVjZWRcIlxyXG4gICAgfSxcclxuICAgIFwiQ09OVEVOVF9URVhUXCI6IHtcclxuICAgICAgICBcInBhcmVudFwiIDogXCJDb250ZW50IHByb2R1Y3Rpb25cIixcclxuICAgICAgICBcImxhYmVsXCIgOiBcIkNvbnRlbnQgcGFydGlhbGx5IHByb2R1Y2VkXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIFwiVEVDSE5JQ0FMX0RFTElWRVJZX1NBVEVMTElURVwiOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiVGVjaG5pY2FsIGRlbGl2ZXJ5XCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJTYXRlbGxpdGVcIlxyXG4gICAgfSxcclxuXHJcbiAgICBcIlRFQ0hOSUNBTF9ERUxJVkVSWV9JUFwiOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiVGVjaG5pY2FsIGRlbGl2ZXJ5XCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJJUFwiXHJcbiAgICB9LFxyXG5cclxuICAgIFwiVEVDSE5JQ0FMX0RFTElWRVJZX0ZUUFwiOiB7XHJcbiAgICAgICAgXCJwYXJlbnRcIiA6IFwiVGVjaG5pY2FsIGRlbGl2ZXJ5XCIsXHJcbiAgICAgICAgXCJsYWJlbFwiIDogXCJGVFAtc2VydmVyXCJcclxuICAgIH0sXHJcblxyXG4gICAgXCJURUNITklDQUxfREVMSVZFUllfRklCRVJcIjoge1xyXG4gICAgICAgIFwicGFyZW50XCIgOiBcIlRlY2huaWNhbCBkZWxpdmVyeVwiLFxyXG4gICAgICAgIFwibGFiZWxcIiA6IFwiRmliZXJcIlxyXG4gICAgfSxcclxuXHJcblxyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9SaWdodEl0ZW1zRGVmaW5pdGlvbnMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTWF0Y2ggZnJvbSAnLi9NYXRjaCc7XHJcblxyXG5jbGFzcyBSb3VuZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcm91bmQgOiBwcm9wcy5yb3VuZCxcclxuICAgICAgICAgICAgc2NoZWR1bGUgOiBwcm9wcy5zY2hlZHVsZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd01hdGNoZXMgOiBmYWxzZSxcclxuICAgICAgICAgICAgbWF0Y2hlcyA6IG5ldyBNYXAocHJvcHMuc2NoZWR1bGUubWFwKChpKSA9PiBbaS5leHRlcm5hbElkLCBpXSkpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlID0gKGUpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gZS50YXJnZXQuY2hlY2tlZDtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZH0pO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0QWxsKHNlbGVjdGVkKTtcclxuICAgIH07XHJcblxyXG4gICAgdG9nZ2xlTWF0Y2hlcyA9IChlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiAoe1xyXG4gICAgICAgICAgICBzaG93TWF0Y2hlczogIXByZXZTdGF0ZS5zaG93TWF0Y2hlc1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZWN0QWxsID0gKHNlbGVjdGVkKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBtYXRjaGVzID0gdGhpcy5zdGF0ZS5tYXRjaGVzO1xyXG4gICAgICAgIG1hdGNoZXMuZm9yRWFjaChtYXRjaCA9PiB7IG1hdGNoLnNlbGVjdGVkID0gc2VsZWN0ZWQgfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWF0Y2hlc30pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgb25TZWxlY3QgPSAoaWQpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLm1hdGNoZXM7XHJcbiAgICAgICAgbWF0Y2hlcy5nZXQoaWQpLnNlbGVjdGVkID0gIW1hdGNoZXMuZ2V0KGlkKS5zZWxlY3RlZDtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHttYXRjaGVzfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldFNlbGVjdGVkID0gKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSggdGhpcy5zdGF0ZS5tYXRjaGVzLnZhbHVlcygpICkuZmlsdGVyKG0gPT4obS5zZWxlY3RlZCkpLmxlbmd0aFxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmdldFNlbGVjdGVkKCksICB0aGlzLnN0YXRlLnNjaGVkdWxlLmxlbmd0aCwgKHRoaXMuZ2V0U2VsZWN0ZWQoKSA9PT0gMCkpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm1hdGNoZGF5XCJ9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3QtYm94LWNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLnRvZ2dsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e1wicm91bmQtXCIgKyB0aGlzLnByb3BzLnJvdW5kfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e1wicm91bmQtXCIgKyB0aGlzLnByb3BzLnJvdW5kfS8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzEwMCUnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc05hTih0aGlzLnN0YXRlLnJvdW5kKSAmJiB0aGlzLnN0YXRlLnJvdW5kfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IWlzTmFOKHRoaXMuc3RhdGUucm91bmQpICYmIFwiTWF0Y2hkYXkgXCIgKyB0aGlzLnN0YXRlLnJvdW5kfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyh0aGlzLmdldFNlbGVjdGVkKCkgPT09IDApICAmJiAodGhpcy5nZXRTZWxlY3RlZCgpIT09IHRoaXMuc3RhdGUuc2NoZWR1bGUubGVuZ3RoKSAmJiA8c3BhbiBvbkNsaWNrPXt0aGlzLnRvZ2dsZU1hdGNoZXN9PlNlbGVjdCA+PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyh0aGlzLmdldFNlbGVjdGVkKCkgIT09IDApICAmJiAodGhpcy5nZXRTZWxlY3RlZCgpPT09IHRoaXMuc3RhdGUuc2NoZWR1bGUubGVuZ3RoKSAmJiA8c3BhbiBvbkNsaWNrPXt0aGlzLnRvZ2dsZU1hdGNoZXN9PkFsbCA+PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyh0aGlzLmdldFNlbGVjdGVkKCkgIT09IDApICYmICggdGhpcy5nZXRTZWxlY3RlZCgpICE9PSB0aGlzLnN0YXRlLnNjaGVkdWxlLmxlbmd0aCkgJiYgPHNwYW4gb25DbGljaz17dGhpcy50b2dnbGVNYXRjaGVzfT57dGhpcy5nZXRTZWxlY3RlZCgpfSBTZWxlY3RlZCA+PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2hvd01hdGNoZXMgJiYgPGRpdiBjbGFzc05hbWU9e1wibWF0Y2gtZ3JvdXBcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubWF0Y2hlcy5zaXplID4gMCAmJiBBcnJheS5mcm9tICggdGhpcy5zdGF0ZS5tYXRjaGVzLnZhbHVlcygpKS5tYXAoKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxNYXRjaCBtYXRjaD17aXRlbX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uZXh0ZXJuYWxJZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdH0vPlxyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJvdW5kO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbXBvbmVudHMvUm91bmQuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUm91bmQgZnJvbSAnLi4vY29tcG9uZW50cy9Sb3VuZCc7XHJcblxyXG5leHBvcnQgY29uc3QgRGVzY3JpcHRpb24gPSAoe3ZhbHVlLCBvbkJsdXJ9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHRhcmVhLWlucHV0XCI+XHJcbiAgICAgICAgPGxhYmVsPkVudGVyIGEgZGVzY3JpcHRpb248L2xhYmVsPlxyXG4gICAgICAgIDx0ZXh0YXJlYSBvbkJsdXI9e29uQmx1cn0gZGVmYXVsdFZhbHVlPXt2YWx1ZX0gcGxhY2Vob2xkZXI9e1wiUHJvdmlkZSBhIHNob3J0IGRlc2NyaXB0aW9uIG9mIHlvdXIgY29udGVudCBsaXN0aW5nXCJ9Lz5cclxuICAgIDwvZGl2PlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRpdGxlQmFyID0gKHt0aXRsZSwgc3VidGl0bGV9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlLWJhclwiPlxyXG4gICAgICAgIDxoci8+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widGl0bGVcIn0+e3RpdGxlfTwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInN1YnRpdGxlXCJ9PntzdWJ0aXRsZX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4pO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5ld0NhdGVnb3J5ID0gKHtvbkNsaWNrLCBzaG93Q2xvc2UsIG9uQmx1ciwgdmFsdWV9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJhc2UtaW5wdXRcIj5cclxuICAgICAgICA8bGFiZWw+Q291bnRyeS9DYXRlZ29yeTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5ldy1jYXRlZ29yeVwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBDb3VudHJ5L0NhdGVnb3J5XCJcclxuICAgICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dmFsdWV9Lz5cclxuICAgICAgICB7IHNob3dDbG9zZSAmJiA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2t9IGNsYXNzTmFtZT17XCJzdGFuZGFyZC1idXR0b25cIn0+PGkgY2xhc3NOYW1lPVwiZmEgZmEtY2xvc2VcIi8+PC9idXR0b24+fVxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgTmV3VG91cm5hbWVudCA9ICh7b25DbGljaywgc2hvd0Nsb3NlLCBvbkJsdXIsIHZhbHVlfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiYXNlLWlucHV0XCI+XHJcbiAgICAgICAgPGxhYmVsPkNvbXBldGl0aW9uPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibmV3LWNhdGVnb3J5XCJcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBjb21wZXRpdGlvbiBuYW1lXCIvPlxyXG4gICAgICAgIHsgc2hvd0Nsb3NlICYmIDxidXR0b24gb25DbGljaz17b25DbGlja30gY2xhc3NOYW1lPXtcInN0YW5kYXJkLWJ1dHRvblwifT48aSBjbGFzc05hbWU9XCJmYSBmYS1jbG9zZVwiLz48L2J1dHRvbj59XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBTY2hlZHVsZXMgPSAoe3NjaGVkdWxlc30pID0+IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2NoZWR1bGVcIj5cclxuICAgICAgICB7IHNjaGVkdWxlcyAmJiBPYmplY3Qua2V5cyhzY2hlZHVsZXMpLm1hcCgoIG51bWJlciwgaSApID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIDxSb3VuZCBrZXk9e2l9IHJvdW5kPXtudW1iZXJ9IHNjaGVkdWxlPXtzY2hlZHVsZXNbbnVtYmVyXX0gLz5cclxuICAgICAgICB9KSB9XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTcG9ydFNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYXNlLWlucHV0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNwb3J0PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICF0aGlzLnByb3BzLmlzQ3VzdG9tICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1wiU3BvcnRcIn0gIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaXNDdXN0b20gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuZXctc3BvcnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBzcG9ydFwiLz5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsgKCB0aGlzLnByb3BzLmlzQ3VzdG9tIHx8IHRoaXMucHJvcHMuc2hvd0Nsb3NlICkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdGFuZGFyZC1idXR0b25cIiBvbkNsaWNrPXt0aGlzLnByb3BzLnJlbW92ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jbG9zZVwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zaG93QWRkTmV3ICYmXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7bWFyZ2luQm90dG9tOiBcIjI1cHhcIn19IGNsYXNzTmFtZT17XCJsaW5rLWJ1dHRvblwifSBvbkNsaWNrPXt0aGlzLnByb3BzLmFkZFNwb3J0U2VsZWN0b3J9PkFkZCBzcG9ydDwvYnV0dG9uPiB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9TZWxsRm9ybUl0ZW1zLmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9zY3NzL21hcmtldHBsYWNlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL3Njc3MvbWFya2V0cGxhY2Uuc2Nzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwic291cmNlUm9vdCI6IiJ9