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
                tournament = _props.tournament,
                seasons = _props.seasons,
                showCustomId = _props.showCustomId,
                PROGRAM_YEAR = _props.PROGRAM_YEAR,
                PROGRAM_EPISODES = _props.PROGRAM_EPISODES;


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
                { className: 'listing-event-details listing-col' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item' },
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
                        ' ',
                        sportCategory[0].name
                    )
                ),
                tournament && tournament.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item' },
                    tournament[0].name
                ),
                tournament && tournament.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item' },
                    'General content'
                ),
                seasons && seasons.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item' },
                    seasonName
                ),
                this.showProgramInfo() && PROGRAM_YEAR && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item' },
                    'Release year: ',
                    PROGRAM_YEAR
                ),
                this.showProgramInfo() && PROGRAM_EPISODES && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item' },
                    'Episodes: ',
                    PROGRAM_EPISODES
                ),
                this.getFixtures().length > 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item' },
                    this.getFixtures().length,
                    ' fixtures'
                ),
                this.getFixtures().length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item' },
                    this.getFixtures()[0].name
                ),
                rounds.length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item' },
                    roundsName
                ),
                rounds.length > 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item' },
                    'Multiple rounds'
                ),
                matches.length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'listing-item' },
                    matches[0].competitors.map(function (competitor, i, list) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'span',
                            { key: i },
                            competitor.name,
                            ' ',
                            list.length !== i + 1 && " vs "
                        );
                    })
                )
            );
        }
    }]);

    return ContentListingEventDetails;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ContentListingEventDetails);

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
/*! exports provided: getCurrencySymbol, goTo, goToListing, goToMarketplace, goToClosedDeals, getFee, getFullName, limitText, editedProgramSelected, parseSeasons */
/*! exports used: editedProgramSelected, getCurrencySymbol, getFee, getFullName, goTo, goToClosedDeals, goToListing, goToMarketplace, limitText, parseSeasons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getCurrencySymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return goTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return goToListing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return goToMarketplace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return goToClosedDeals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getFee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getFullName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return limitText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return editedProgramSelected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return parseSeasons; });
var getCurrencySymbol = function getCurrencySymbol(code) {
    return code === "EUR" ? "€" : "$";
};

var goTo = function goTo(route) {
    window.location.href = envhosturl + route;
};

var goToListing = function goToListing(id) {
    goTo("listing/" + id);
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
    content.seasons.forEach(function (season) {
        season.selectedSchedules = {};
        Object.entries(season.schedules).filter(function (round) {
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
            });
        };

        _this2.removeBid = function () {
            var selectedBid = _this2.state.selectedBid;
            _this2.setState({ saving: true });
            ContentArena.ContentApi.removeBid(selectedBid).done(function (response) {
                _this2.setState({ removeModalIsOpen: false, saving: false });
            });
        };

        _this2.rejectBid = function () {
            var selectedBid = _this2.state.selectedBid;
            selectedBid.message = _this2.state.message;
            _this2.setState({ saving: true });
            ContentArena.ContentApi.rejectBid(selectedBid).always(function (response) {
                _this2.setState({ rejectModalIsOpen: false, saving: false });
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
            showBids: props.bidsOpen || false

        };
        return _this2;
    }

    _createClass(CommercialSalesBundle, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                salesBundle = _props.salesBundle,
                company = _props.company,
                onDelete = _props.onDelete,
                contentId = _props.contentId;
            var showBids = this.state.showBids;


            var totalFee = salesBundle.bids.length > 0 ? salesBundle.bids.map(function (b) {
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
                        salesBundle.bundleMethod === "SELL_AS_BUNDLE" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 26, height: 23 }, src: __WEBPACK_IMPORTED_MODULE_6__Icons__["l" /* fixedIcon */] }),
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
                        salesBundle.bids.filter(function (b) {
                            return b.status.name === "APPROVED";
                        }).length,
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
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__main_components_SendMessage__["a" /* default */], { ref: "messagePopup" + b.id, listingId: contentId, recipient: b.buyerUser.company });
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_table__["default"], {
                        className: "closed-deals-table",
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
                                return company.legalName;
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
                                    props.value.status === "APPROVED" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { margin: '0 10px', cursor: 'pointer' }, onClick: function onClick() {}, src: __WEBPACK_IMPORTED_MODULE_6__Icons__["i" /* docIcon */] }),
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
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "info" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__buy_components_ContentListingEventDetails__["a" /* default */], this.props),
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
                            { className: "listing-event-packages listing-col" },
                            rightsPackage.map(function (sr, i) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "listing-item", key: i },
                                    !sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 23, height: 22, margin: '0 5px' }, src: _this2.blueCheck }),
                                    sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 23, height: 22, margin: '0 5px' }, src: _this2.yellowCheck }),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { style: { display: 'flex', flexDirection: "row" } },
                                        sr.shortLabel !== "PR" && sr.name,
                                        sr.shortLabel === "PR" && PROGRAM_NAME && "Program: " + PROGRAM_NAME,
                                        sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "span",
                                            { style: { fontWeight: 600, marginLeft: 3 } },
                                            " EX"
                                        )
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_components_CommercialSalesBundle__ = __webpack_require__(/*! ../../main/components/CommercialSalesBundle */ "./src/AppBundle/Resources/public/javascript/main/components/CommercialSalesBundle.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ContentListing__ = __webpack_require__(/*! ./ContentListing */ "./src/AppBundle/Resources/public/javascript/main/components/ContentListing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_utils__ = __webpack_require__(/*! ../actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Icons__ = __webpack_require__(/*! ./Icons */ "./src/AppBundle/Resources/public/javascript/main/components/Icons.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var ContentListingCommercialActivity = function (_ContentListing) {
    _inherits(ContentListingCommercialActivity, _ContentListing);

    function ContentListingCommercialActivity(props) {
        _classCallCheck(this, ContentListingCommercialActivity);

        var _this = _possibleConstructorReturn(this, (ContentListingCommercialActivity.__proto__ || Object.getPrototypeOf(ContentListingCommercialActivity)).call(this, props));

        _this.state = {
            showSalesPackage: props.bundlesOpen || false
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
                expiresAt = _props.expiresAt,
                onDelete = _props.onDelete,
                hideWithoutBids = _props.hideWithoutBids,
                bidsOpen = _props.bidsOpen,
                rightsPackage = _props.rightsPackage,
                salesPackages = _props.salesPackages,
                imageBase64 = _props.imageBase64,
                image = _props.image,
                company = _props.company,
                id = _props.id,
                PROGRAM_NAME = _props.PROGRAM_NAME;
            var showSalesPackage = this.state.showSalesPackage;


            var listingImage = imageBase64 ? imageBase64 : image ? assetsBaseDir + "../" + image : this.noImage;
            var bids = salesPackages.reduce(function (t, sp) {
                return t.concat(sp.bids);
            }, []);
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
                            { style: { display: "flex" } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__buy_components_ContentListingEventDetails__["a" /* default */], this.props),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { style: {
                                        flex: 2,
                                        flexDirection: "column",
                                        flexWrap: 'wrap',
                                        maxHeight: 200,
                                        display: 'flex'
                                    } },
                                rightsPackage.map(function (sr, i) {
                                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { key: i, style: {
                                                minHeight: 46,
                                                flexDirection: 'row',
                                                display: 'flex',
                                                alignItems: 'center',
                                                flex: '1 1 40px'
                                            } },
                                        !sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 23, height: 22, margin: '0 5px' }, src: _this2.blueCheck }),
                                        sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 23, height: 22, margin: '0 5px' }, src: _this2.yellowCheck }),
                                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "div",
                                            { style: { display: 'flex', flexDirection: "row" } },
                                            sr.shortLabel !== "PR" && sr.name,
                                            sr.shortLabel === "PR" && PROGRAM_NAME && "Program: " + PROGRAM_NAME,
                                            sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                                "span",
                                                { style: { fontWeight: 600, marginLeft: 3 } },
                                                " EX"
                                            )
                                        )
                                    );
                                })
                            )
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
                                bids.filter(function (b) {
                                    return b.status.name === "APPROVED";
                                }).length,
                                " closed Deals"
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                bids.filter(function (b) {
                                    return b.status.name === "PENDING";
                                }).length,
                                " open bids"
                            )
                        ),
                        bids.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "item", style: { fontWeight: 600 } },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                null,
                                "Total: " + bids.map(function (b) {
                                    return Number(b.totalFee);
                                }).reduce(function (t, n) {
                                    return t + n;
                                }).toLocaleString("en", { maximumFractionDigits: 2 }) + " ",
                                Object(__WEBPACK_IMPORTED_MODULE_5__actions_utils__["b" /* getCurrencySymbol */])(salesPackages[0].currency.code)
                            )
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "show-bundle", onClick: function onClick() {
                                    _this2.setState({ showSalesPackage: !showSalesPackage });
                                } },
                            !showSalesPackage && "Show sales bundle",
                            showSalesPackage && "Hide sales bundle",
                            !showSalesPackage && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__Icons__["b" /* addIcon */] }),
                            showSalesPackage && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__Icons__["g" /* cancelIcon */] })
                        )
                    )
                ),
                showSalesPackage && salesPackages.map(function (sb, i) {

                    if (hideWithoutBids && sb.bids.length === 0) return;

                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__main_components_CommercialSalesBundle__["a" /* default */], {
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
}(__WEBPACK_IMPORTED_MODULE_4__ContentListing__["a" /* default */]);

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ContentListing__ = __webpack_require__(/*! ./ContentListing */ "./src/AppBundle/Resources/public/javascript/main/components/ContentListing.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_components_SendMessage__ = __webpack_require__(/*! ../../main/components/SendMessage */ "./src/AppBundle/Resources/public/javascript/main/components/SendMessage.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_utils__ = __webpack_require__(/*! ../actions/utils */ "./src/AppBundle/Resources/public/javascript/main/actions/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Icons__ = __webpack_require__(/*! ./Icons */ "./src/AppBundle/Resources/public/javascript/main/components/Icons.js");
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
        _this.bucketicon = assetsBaseDir + "app/images/bucket.png";
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
                programs = _props.programs,
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
                { className: "listing-list-view", onClick: this.onSelect, style: { padding: 0 } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__main_components_SendMessage__["a" /* default */], { ref: "messagePopup" + id,
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
                        { className: "name", onClick: function onClick() {
                                if (onSelectName) onSelectName();
                            } },
                        name
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
                        { style: { display: "flex" } },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__buy_components_ContentListingEventDetails__["a" /* default */], this.props),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            null,
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
                            { style: {
                                    flex: 2,
                                    flexDirection: "column",
                                    flexWrap: 'wrap',
                                    maxHeight: 200,
                                    display: 'flex'
                                } },
                            rightsPackage.map(function (sr, i) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { key: i, style: {
                                            minHeight: 46,
                                            flexDirection: 'row',
                                            display: 'flex',
                                            alignItems: 'center',
                                            flex: '1 1 40px'
                                        } },
                                    !sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 23, height: 22, margin: '0 5px' }, src: _this2.blueCheck }),
                                    sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { width: 23, height: 22, margin: '0 5px' }, src: _this2.yellowCheck }),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                        "div",
                                        { style: { display: 'flex', flexDirection: "row" } },
                                        sr.shortLabel !== "PR" && sr.name,
                                        sr.shortLabel === "PR" && PROGRAM_NAME && "Program: " + PROGRAM_NAME,
                                        sr.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                            "span",
                                            { style: { fontWeight: 600, marginLeft: 3 } },
                                            " EX"
                                        )
                                    )
                                );
                            })
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { style: {
                            flex: '1.5 1 0%',
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
                            Object(__WEBPACK_IMPORTED_MODULE_5__actions_utils__["b" /* getCurrencySymbol */])(bid.salesPackage.currency.code)
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
                        bid.status.name === "EDITED" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__Icons__["m" /* infoIcon */],
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
                                    width: 150
                                }, href: envhosturl + "listing/" + customId + "/buy/" + bid.salesPackage.id },
                            "Increase bid"
                        ),
                        bid.message && bid.message !== "" && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__Icons__["e" /* blueEnvelopeIcon */],
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
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_6__Icons__["f" /* bucketIcon */] })
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
            );
        }
    }]);

    return ContentListingPendingBid;
}(__WEBPACK_IMPORTED_MODULE_3__ContentListing__["a" /* default */]);

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
                        { onClick: this.edit, className: 'standard-button-small' },
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
                        route: "activebids",
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
/*! exports provided: cancelIcon, bucketIcon, addIcon, exclamationRoundIcon, clockRoundIcon, playIcon, blueCheckIcon, yellowCheckIcon, bidIcon, fixedIcon, docIcon, editIcon, blueEnvelopeIcon, infoIcon, Spinner */
/*! exports used: Spinner, addIcon, bidIcon, blueCheckIcon, blueEnvelopeIcon, bucketIcon, cancelIcon, clockRoundIcon, docIcon, editIcon, exclamationRoundIcon, fixedIcon, infoIcon, playIcon, yellowCheckIcon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return cancelIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return bucketIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return exclamationRoundIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return clockRoundIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return playIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return blueCheckIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return yellowCheckIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return bidIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return fixedIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return docIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return editIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return blueEnvelopeIcon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return infoIcon; });
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
var editIcon = assetsBaseDir + "app/images/edit.png";
var blueEnvelopeIcon = assetsBaseDir + "app/images/envelope_2.png";
var infoIcon = assetsBaseDir + "app/images/info_blue.png";

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
                recipient = _this$props.recipient;


            var message = {
                content: _this.state.message,
                listing: listingId,
                recipient: recipient.id
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

            Object(__WEBPACK_IMPORTED_MODULE_3__main_actions_utils__["e" /* goTo */])("listing/" + customId);
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
                        status.name === 'REJECTED' && "Listing rejected. Please edit or contact support."
                    )
                ),
                (status.name === 'REJECTED' || status.name === 'INACTIVE' || status.name === 'PENDING') && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
                    status.name === 'INACTIVE' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_4__main_components_Icons__["n" /* playIcon */] }),
                    status.name === 'REJECTED' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_4__main_components_Icons__["k" /* exclamationRoundIcon */] })
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
                    tournament && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        tournament.name
                    ),
                    tournament && tournament.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        "General content"
                    ),
                    seasons && seasons.length > 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        "Multiple seasons"
                    ),
                    seasons && seasons.length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
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
                            rp.exclusive && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { src: __WEBPACK_IMPORTED_MODULE_4__main_components_Icons__["o" /* yellowCheckIcon */] }),
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
                        __WEBPACK_IMPORTED_MODULE_1_moment_moment___default()(expiresAt).format('DD/MM/YYYY')
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
                        className: "closed-deals-table",
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
                            Header: 'Listing name',
                            headerClassName: 'table-header-big',
                            className: 'table-header-big',
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
                                        Object(__WEBPACK_IMPORTED_MODULE_5__main_actions_utils__["i" /* limitText */])(props.value.name)
                                    )
                                );
                            }
                        }, {
                            accessor: 'content.company.legalName', // Required because our accessor is not a string
                            Header: 'Seller',
                            headerClassName: 'table-header-big',
                            className: 'table-header-big'
                        }, {
                            Header: 'LT',
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
                                    }).indexOf("LT") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.cancelIcon })
                                );
                            }
                        }, {
                            Header: 'LB',
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
                                    }).indexOf("HL") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.cancelIcon })
                                );
                            }
                        }, {
                            Header: 'DT',
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
                                    }).indexOf("DT") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.cancelIcon })
                                );
                            }
                        }, {
                            Header: 'HL',
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
                                    }).indexOf("HL") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.cancelIcon })
                                );
                            }
                        }, {
                            Header: 'CL',
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
                                    }).indexOf("CL") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.cancelIcon })
                                );
                            }
                        }, {
                            Header: 'NA',
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
                                    }).indexOf("NA") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.cancelIcon })
                                );
                            }
                        }, {
                            Header: 'AR',
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
                                    }).indexOf("AR") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.cancelIcon })
                                );
                            }
                        }, {
                            Header: 'PR',
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
                                    }).indexOf("PR") !== -1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: rightImageStyle, src: _this3.cancelIcon })
                                );
                            }
                        }, {
                            Header: 'Territories',
                            headerClassName: 'table-header',
                            className: 'table-header',
                            id: "territories",
                            accessor: function accessor(d) {
                                return {
                                    size: d.salesPackage.territories.length,
                                    worldwide: d.salesPackage.territoriesMethod === "WORLDWIDE",
                                    asBundle: d.salesPackage.bundleMethod === "SELL_AS_BUNDLE"
                                };
                            },
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "blue" },
                                    (!props.value.worldwide || !props.value.asBundle) && props.value.size + " ",
                                    (!props.value.worldwide || !props.value.asBundle) && props.value.size > 1 && "territories",
                                    (!props.value.worldwide || !props.value.asBundle) && props.value.size === 1 && "territory",
                                    props.value.worldwide && props.value.asBundle && "Worldwide"
                                );
                            }
                        }, {
                            Header: 'Price',
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
                            Header: 'Date of sale',
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
                            Header: 'Name',
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
                            accessor: 'id',
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    "div",
                                    { className: "" },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { margin: '0 10px', cursor: 'pointer' }, onClick: function onClick() {}, src: _this3.docIcon }),
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img", { style: { margin: '0 10px', cursor: 'pointer' }, onClick: function onClick() {
                                            _this3.refs["messagePopup" + props.value].open();
                                        }, src: _this3.blueEnvelopeIcon })
                                );
                            }
                        }]
                    })
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


            var listings = _this2.state.listings;

            if (selectedListings.length > 0) {
                listings = listings.filter(function (b) {
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
                        onDelete: _this3.deleteBid,
                        bidsOpen: list.length === 1,
                        bundlesOpen: list.length === 1 || _this3.state.filter !== "ALL",
                        hideWithoutBids: _this3.state.filter === "ACTIVITY",
                        onSelect: function onSelect(id) {
                            return Object(__WEBPACK_IMPORTED_MODULE_4__main_actions_utils__["g" /* goToListing */])(id);
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
            user: props.user
        };
        return _this;
    }

    _createClass(Manager, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                profile = _state.profile,
                tab = _state.tab,
                user = _state.user;
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
                    tab === 'BIDS' && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__PendingDeals__["a" /* default */], null),
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
                                t.listing.company.legalName
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "user" },
                                Object(__WEBPACK_IMPORTED_MODULE_2__main_actions_utils__["d" /* getFullName */])(t.user)
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "last-message" },
                                t.lastMessageContent && Object(__WEBPACK_IMPORTED_MODULE_2__main_actions_utils__["i" /* limitText */])(t.lastMessageContent)
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
                            { className: "listing-name" },
                            selectedThread.listing.name
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "company-name" },
                            selectedThread.listing.company.legalName
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
            Object(__WEBPACK_IMPORTED_MODULE_3__main_actions_utils__["e" /* goTo */])("listing/" + id);
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
            active: true

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
                                _this3.setState({ active: true });
                            } },
                        active && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { style: { margin: '0px 10px 3px' }, src: this.activeBulletIcon }),
                        !active && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { style: { margin: '0px 10px 3px' }, src: this.bulletIcon }),
                        'Active'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { style: { margin: '0 20px', cursor: 'pointer' },
                            onClick: function onClick() {
                                _this3.setState({ active: false });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtaW5wdXQtYXV0b3NpemUvbGliL0F1dG9zaXplSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5lcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvZGF0YS9sYW5ndWFnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2FjdGlvbnMvZmlsdGVyQWN0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29tcG9uZW50cy9Db250ZW50TGlzdGluZ0V2ZW50RGV0YWlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vYWN0aW9ucy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvQ29tbWVyY2lhbFNhbGVzQnVuZGxlLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9Db250ZW50TGlzdGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvQ29udGVudExpc3RpbmdDb21tZXJjaWFsQWN0aXZpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0NvbnRlbnRMaXN0aW5nUGVuZGluZ0JpZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvQ291bnRyeVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9EaWdpdGFsU2lnbmF0dXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9IZWFkZXJCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0hpc3RvcnlCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0ljb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9TZW5kTWVzc2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3N0eWxlcy9jdXN0b20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbXBvbmVudHMvQm9hcmRMaXN0aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9jb250YWluZXJzL0Nsb3NlZERlYWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9jb250YWluZXJzL0NvbW1lcmNpYWxBY3Rpdml0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29udGFpbmVycy9NYW5hZ2VMaXN0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29udGFpbmVycy9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9jb250YWluZXJzL01lc3NhZ2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9jb250YWluZXJzL1BlbmRpbmdEZWFscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29udGFpbmVycy9TZXR0aW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29udGFpbmVycy9XYXRjaGxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL21hbmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvcmVkdWNlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3JlZHVjZXJzL21hbmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2Uvc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9hY3Rpb25zL3ZhbGlkYXRpb25BY3Rpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9TdXBlclJpZ2h0RGVmaW5pdGlvbnMuanMiXSwibmFtZXMiOlsibGFuZ3VhZ2VzIiwiYWRkUmlnaHQiLCJ0eXBlIiwiZmlsdGVyVHlwZXMiLCJBRERfUklHSFQiLCJpZCIsInJlbW92ZVJpZ2h0IiwiUkVNT1ZFX1JJR0hUIiwidXBkYXRlQ291bnRyaWVzIiwiVVBEQVRFX0NPVU5UUklFUyIsImNvdW50cmllcyIsInVwZGF0ZUV4Y2x1c2l2ZSIsIlVQREFURV9FWENMVVNJVkUiLCJleGNsdXNpdmUiLCJ1cGRhdGVTcG9ydCIsIlVQREFURV9TUE9SVCIsInNwb3J0IiwidXBkYXRlRXZlbnQiLCJVUERBVEVfRVZFTlQiLCJldmVudCIsImNsZWFyRmlsdGVyIiwiQ0xFQVIiLCJjbGVhclVwZGF0ZUZpbHRlciIsIkNMRUFSX1VQREFURSIsIkNvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzIiwicHJvcHMiLCJnZXRGaXh0dXJlcyIsInNlYXNvbnMiLCJmaXh0dXJlcyIsImZvckVhY2giLCJzIiwiZ2V0U2NoZWR1bGVzIiwic2NoZWR1bGVzQnlTZWFzb24iLCJzY2hlZHVsZXMiLCJyb3VuZHMiLCJtYXRjaGVzIiwiT2JqZWN0IiwiZW50cmllcyIsInNoIiwic2VsZWN0ZWQiLCJpbmRleE9mIiwicHVzaCIsIm0iLCJzaG93UHJvZ3JhbUluZm8iLCJyaWdodHNQYWNrYWdlIiwiUFJPR1JBTV9OQU1FIiwic2hvdyIsImxlbmd0aCIsImVkaXRlZFByb2dyYW1TZWxlY3RlZCIsInN0YXRlIiwic3BvcnRzIiwic3BvcnRDYXRlZ29yeSIsInRvdXJuYW1lbnQiLCJzaG93Q3VzdG9tSWQiLCJQUk9HUkFNX1lFQVIiLCJQUk9HUkFNX0VQSVNPREVTIiwic2Vhc29uVGl0bGUiLCJzZWFzb25OYW1lIiwibWFwIiwic2Vhc29uIiwieWVhciIsImpvaW4iLCJyb3VuZHNUaXRsZSIsInJvdW5kc05hbWUiLCJuYW1lIiwiY29tcGV0aXRvcnMiLCJjb21wZXRpdG9yIiwiaSIsImxpc3QiLCJSZWFjdCIsIkNvbXBvbmVudCIsImRlZmF1bHRGaWx0ZXIiLCJyaWdodHMiLCJ2YWx1ZSIsImxhYmVsIiwiZm9yY2VVcGRhdGUiLCJmaWx0ZXIiLCJhY3Rpb24iLCJhc3NpZ24iLCJpbmRleCIsInNwbGljZSIsImdldEN1cnJlbmN5U3ltYm9sIiwiY29kZSIsImdvVG8iLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJlbnZob3N0dXJsIiwicm91dGUiLCJnb1RvTGlzdGluZyIsImdvVG9NYXJrZXRwbGFjZSIsImdvVG9DbG9zZWREZWFscyIsImdldEZlZSIsInNhbGVzUGFja2FnZSIsImZlZU51bWJlciIsInBhcnNlRmxvYXQiLCJmZWUiLCJ0b0xvY2FsZVN0cmluZyIsImN1cnJlbmN5IiwiZ2V0RnVsbE5hbWUiLCJ1c2VyIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJsaW1pdFRleHQiLCJ0eHQiLCJsaW1pdCIsInN1YnN0cmluZyIsInIiLCJzaG9ydExhYmVsIiwicGFyc2VTZWFzb25zIiwiY29udGVudCIsInNlbGVjdGVkU2NoZWR1bGVzIiwicm91bmQiLCJBcnJheSIsImZyb20iLCJ2YWx1ZXMiLCJtYXRjaCIsIkNvbW1lcmNpYWxTYWxlc0J1bmRsZSIsImFjY2VwdEJpZCIsInNpZ25hdHVyZSIsImNvbnRlbnRJZCIsInNlbGVjdGVkQmlkIiwic2V0U3RhdGUiLCJzYXZpbmciLCJDb250ZW50QXJlbmEiLCJDb250ZW50QXBpIiwiZG9uZSIsImFwcHJvdmVNb2RhbElzT3BlbiIsInJlbW92ZUJpZCIsInJlbW92ZU1vZGFsSXNPcGVuIiwicmVqZWN0QmlkIiwibWVzc2FnZSIsImFsd2F5cyIsInJlamVjdE1vZGFsSXNPcGVuIiwiY2xvc2VSZW1vdmVNb2RhbCIsImNsb3NlQXBwcm92ZU1vZGFsIiwiY2xvc2VSZWplY3RNb2RhbCIsInJlbmRlckFwcHJvdmVNb2RhbCIsInNhbGVzQnVuZGxlIiwiR2VuZXJpY01vZGFsU3R5bGUiLCJyZW5kZXJSZWplY3RNb2RhbCIsImUiLCJ0YXJnZXQiLCJyZW5kZXJSZW1vdmVNb2RhbCIsInNob3dCaWRzIiwiYmlkc09wZW4iLCJjb21wYW55Iiwib25EZWxldGUiLCJ0b3RhbEZlZSIsImJpZHMiLCJOdW1iZXIiLCJiIiwicmVkdWNlIiwidCIsIm4iLCJfdGhpcyIsImJ1bmRsZU1ldGhvZCIsIndpZHRoIiwiaGVpZ2h0Iiwic2FsZXNNZXRob2QiLCJtYXJnaW5MZWZ0Iiwic3RhdHVzIiwiYnV5ZXJVc2VyIiwib25QYWdlQ2hhbmdlIiwic2VsZWN0IiwiYWNjZXNzb3IiLCJsZWdhbE5hbWUiLCJDZWxsIiwiSGVhZGVyIiwiaGVhZGVyQ2xhc3NOYW1lIiwiY2xhc3NOYW1lIiwiZCIsIk1vbWVudCIsImZvcm1hdCIsImJpZCIsIm1hcmdpbiIsImN1cnNvciIsInNob3dSZW1vdmVDb25maXJtIiwicmVmcyIsIm9wZW4iLCJ3aGl0ZVNwYWNlIiwic3RvcFByb3BhZ2F0aW9uIiwiQ29udGVudExpc3RpbmciLCJjdXJyZW5jeUNvZGUiLCJjdXJyZW5jeVN5bWJvbCIsIm9uU2VsZWN0IiwiY3VzdG9tSWQiLCJjb25maXJtUmVtb3ZlRnJvbVdhdGNobGlzdCIsImNvbmZpcm1XYXRjaGxpc3RSZW1vdmUiLCJjYW5jZWxSZW1vdmVGcm9tV2F0Y2hsaXN0IiwicmVtb3ZlRnJvbVdhdGNobGlzdCIsIm9uV2F0Y2hsaXN0UmVtb3ZlIiwiQXBpIiwid2F0Y2hsaXN0Iiwic29ydFNhbGVzUGFja2FnZXMiLCJhIiwidGVycml0b3JpZXNNZXRob2QiLCJjb21wYXJlUHJvcGVydHkiLCJ0ZXJyaXRvcmllcyIsInNvcnRBZnRlckZpbHRlciIsInNvcnRCeUZpbHRlciIsInNhbGVzUGFja2FnZXMiLCJ0ZW1wIiwiYyIsImwiLCJldCIsImV4Y2x1ZGVkVGVycml0b3JpZXMiLCJhbGwiLCJpbmNsdWRlIiwiYnV5aW5nTW9kZSIsIm5vSW1hZ2UiLCJhc3NldHNCYXNlRGlyIiwiYmlkSWNvbiIsImZpeGVkSWNvbiIsImJsdWVDaGVjayIsInllbGxvd0NoZWNrIiwiYnVja2V0aWNvbiIsImV4cGlyZXNBdCIsIm9uU2VsZWN0TmFtZSIsImltYWdlQmFzZTY0IiwiaW1hZ2UiLCJ3YXRjaGxpc3RSZW1vdmUiLCJzbGljZSIsImxpc3RpbmdJbWFnZSIsInNvcnQiLCJyZXZlcnNlIiwicG9zaXRpb24iLCJyaWdodCIsInRvcCIsImJvcmRlciIsInBhZGRpbmciLCJmb250U2l6ZSIsImNvbG9yIiwic3IiLCJkaXNwbGF5IiwiZmxleERpcmVjdGlvbiIsImZvbnRXZWlnaHQiLCJmbGV4IiwiQ29udGVudExpc3RpbmdDb21tZXJjaWFsQWN0aXZpdHkiLCJzaG93U2FsZXNQYWNrYWdlIiwiYnVuZGxlc09wZW4iLCJleGNsYW1hdGlvbkljb24iLCJlbnZlbG9wZUljb24iLCJoaWRlV2l0aG91dEJpZHMiLCJzcCIsImNvbmNhdCIsIm1hcmdpbkJvdHRvbSIsImZsZXhXcmFwIiwibWF4SGVpZ2h0IiwibWluSGVpZ2h0IiwiYWxpZ25JdGVtcyIsIm1heGltdW1GcmFjdGlvbkRpZ2l0cyIsInNiIiwiQ29udGVudExpc3RpbmdQZW5kaW5nQmlkIiwicHJvZ3JhbXMiLCJzaG93TWVzc2FnZSIsInNob3dFZGl0ZWQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXJMZWZ0IiwicGFkZGluZ1JvcCIsImp1c3RpZnlDb250ZW50IiwiY3JlYXRlZEF0IiwiYW1vdW50IiwibWFyZ2luUmlnaHQiLCJmb250U3R5bGUiLCJDb3VudHJ5U2VsZWN0b3IiLCJnZXRPcHRpb25zIiwiYXZhaWxhYmxlIiwiRGF0YSIsIkNvdW50cmllcyIsImsiLCJjb3VudHJ5IiwibmV4dFByb3BzIiwiZ2V0Q291bnRyaWVzIiwib25DaGFuZ2UiLCJtdWx0aSIsImRpc2FibGVkIiwiRGlnaXRhbFNpZ25hdHVyZSIsImNsZWFyIiwiYmxhbmsiLCJvblJlYWR5IiwiZGF0YSIsInRvRGF0YVVSTCIsInJlYWR5IiwiZWRpdCIsIkhlYWRlckJhclRhYiIsInRhYk5hbWUiLCJhY3RpdmVUYWIiLCJjaGlsZHJlbiIsIkhlYWRlckJhciIsImdldExvZ29VcmwiLCJ0YWIiLCJsb2dvVXJsIiwicHJvZmlsZSIsIkhpc3RvcnlCdXR0b24iLCJoYW5kbGVDbGljayIsIm9uQ2xpY2siLCJwYXRoIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsIm9uQmFja0J1dHRvbkV2ZW50IiwicHJldmVudERlZmF1bHQiLCJjb21wb25lbnREaWRNb3VudCIsIm9ucG9wc3RhdGUiLCJjYW5jZWxJY29uIiwiYnVja2V0SWNvbiIsImFkZEljb24iLCJleGNsYW1hdGlvblJvdW5kSWNvbiIsImNsb2NrUm91bmRJY29uIiwicGxheUljb24iLCJibHVlQ2hlY2tJY29uIiwieWVsbG93Q2hlY2tJY29uIiwiZG9jSWNvbiIsImVkaXRJY29uIiwiYmx1ZUVudmVsb3BlSWNvbiIsImluZm9JY29uIiwiU3Bpbm5lciIsInRlc3QiLCJTZW5kTWVzc2FnZSIsImlzT3BlbiIsImNsb3NlIiwic2hvd1N1Y2Nlc3MiLCJzZW5kIiwibGlzdGluZ0lkIiwicmVjaXBpZW50IiwibGlzdGluZyIsInNlbmRNZXNzYWdlIiwiY3VzdG9tU3R5bGVzIiwibGVmdCIsImJvdHRvbSIsInRyYW5zZm9ybSIsImJvcmRlclJhZGl1cyIsImJvcmRlckJvdHRvbSIsIm92ZXJsYXkiLCJ6SW5kZXgiLCJTZWxlY3Rvck1vZGFsU3R5bGUiLCJCb2FyZExpc3RpbmciLCJ0b2dnbGVPcHRpb25zIiwic2hvd09wdGlvbnMiLCJzdWJtaXQiLCJ2aWV3IiwiaGlkZU9wdGlvbnMiLCJkZWZhdWx0QWN0aW9uIiwic2hvd0RlYWN0aXZhdGVDb25maXJtIiwiY2xvY2tJY29uIiwiZHVwbGljYXRlSWNvbiIsInZpZXdJY29uIiwic3VibWl0SWNvbiIsImRvdHNJY29uIiwiZGVhY3RpdmF0ZUljb24iLCJzaG93RWRpdCIsInNob3dSZW1vdmUiLCJzaG93U3VibWl0Iiwic2hvd0R1cGxpY2F0ZSIsInNob3dEZWFjdGl2YXRlIiwic2hvd1ZpZXciLCJvblJlbW92ZSIsIm9uRHVwbGljYXRlIiwib25EZWFjdGl2YXRlIiwibGFzdEFjdGlvbiIsImxhc3RBY3Rpb25EYXRlIiwibGFzdEFjdGlvblVzZXIiLCJvd25lciIsIm9uU3VibWl0Iiwic3R5bGUiLCJzaG93U3RhdHVzSW5mbyIsImRlc2NyaXB0aW9uIiwicnAiLCJTdXBlclJpZ2h0Qm9hcmRMYWJlbHMiLCJyaWdodEltYWdlU3R5bGUiLCJDbG9zZWREZWFscyIsInNlbGVjdExpc3RpbmciLCJsb2FkaW5nIiwiZ2V0Q2xvc2VkRGVhbHMiLCJzaXplIiwid29ybGR3aWRlIiwiYXNCdW5kbGUiLCJtYXBTdGF0ZVRvUHJvcHMiLCJvd25Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImNvbm5lY3QiLCJDb21tZXJjaWFsQWN0aXZpdHkiLCJkZWxldGVCaWQiLCJ1cGRhdGUiLCJnZXRBbGxEZWFscyIsImxpc3RpbmdzIiwiVXRpbHMiLCJjb250ZW50UGFyc2VyRnJvbVNlcnZlciIsImZpbHRlckJ5TGlzdGluZyIsInNlbGVjdGVkTGlzdGluZ3MiLCJmaWx0ZXJlZCIsInJlbW92ZSIsImJ1bGxldEljb24iLCJhY3RpdmVCdWxsZXRJY29uIiwiYWxsTGlzdGluZ3MiLCJNYW5hZ2VMaXN0aW5ncyIsImR1cGxpY2F0ZSIsImRyYWZ0IiwibG9hZGluZ0RyYWZ0IiwiZHVwbGljYXRlTGlzdGluZyIsInJlc3BvbnNlIiwic3VjY2VzcyIsInVuc2hpZnQiLCJkZWFjdGl2YXRlIiwiaW5hY3RpdmUiLCJsb2FkaW5nSW5hY3RpdmUiLCJkZWFjdGl2YXRlTGlzdGluZyIsImxvYWRpbmdBY3RpdmUiLCJsb2FkaW5nRXhwaXJlZCIsImFjdGl2ZSIsImV4cGlyZWQiLCJnZXREcmFmdExpc3RpbmdzIiwiZ2V0SW5hY3RpdmVMaXN0aW5ncyIsImdldEFjdGl2ZUxpc3RpbmdzIiwiZ2V0RXhwaXJlZExpc3RpbmdzIiwibWFyZ2luVG9wIiwicmVtb3ZlTGlzdGluZyIsImVkaXRhYmxlIiwiTWFuYWdlciIsIk1lc3NhZ2VzIiwic2VsZWN0VGhyZWFkIiwidGhyZWFkIiwic2VsZWN0ZWRUaHJlYWQiLCJ1cGRhdGVNZXNzYWdlcyIsImxvYWRpbmdNZXNzYWdlcyIsIm1lc3NhZ2VzIiwiZ2V0VGhyZWFkIiwiaW5wdXRNZXNzYWdlIiwidGhyZWFkcyIsImxvYWRpbmdUaHJlYWRzIiwiZ2V0VGhyZWFkcyIsImFEYXRlIiwibGFzdE1lc3NhZ2VEYXRlIiwiYkRhdGUiLCJsYXN0TWVzc2FnZUNvbnRlbnQiLCJzZW5kZXIiLCJlbWFpbCIsIlBlbmRpbmdEZWFscyIsImxvYWRpbmdEZWNsaW5lZCIsImdldFBlbmRpbmdEZWFscyIsImdldFJlamVjdGVkRGVhbHMiLCJkZWNsaW5lZEJpZHMiLCJTZXR0aW5ncyIsInVwZGF0ZUNvbXBhbnkiLCJ1cGRhdGluZ0NvbXBhbnkiLCJlZGl0Q29tcGFueUluZm8iLCJ1cGRhdGVVc2VyIiwidXBkYXRpbmdVc2VyIiwiZWRpdFBlcnNvbmFsSW5mbyIsInVwZGF0ZVBhc3N3b3JkIiwidXBkYXRpbmdQYXNzd29yZCIsInBhc3N3b3JkIiwicGFzc3dvcmRDaGVjayIsInBhc3N3b3JkVXBkYXRlZCIsInZhbGlkYXRlIiwicGFzcyIsImRpZ2l0IiwidXBwZXIiLCJzcGVjaWFsIiwiaW52YWxpZFBhc3N3b3JkIiwib2xkUGFzc3dvcmQiLCJ2YWxpZCIsImxvYWRpbmdDb21wYW55VXNlcnMiLCJjb21wYW55VXNlcnMiLCJnZXRVc2VySW5mbyIsImdldENvbXBhbnlVc2VycyIsInJlZ2lzdHJhdGlvbk51bWJlciIsInZhdCIsImFkZHJlc3MiLCJjaXR5IiwiemlwIiwidGl0bGUiLCJwaG9uZSIsIldhdGNobGlzdCIsImdldFdhdGNobGlzdExpc3RpbmdzIiwibWFuYWdlQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIk1hbmFnZUFwcCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZGF0YXNldCIsIiQiLCJUZXN0IiwiTWFuYWdlIiwicmVkdWNlcnMiLCJjb21iaW5lUmVkdWNlcnMiLCJtYW5hZ2UiLCJtYW5hZ2VUeXBlcyIsIlRFU1QiLCJ0ZXN0SXRlbSIsInRleHQiLCJjcmVhdGVTdG9yZSIsImNvbXBhbnlJc1ZhbGlkIiwidW5kZWZpbmVkIiwiU3VwZXJSaWdodERlZmluaXRpb25zIiwia2V5IiwiU3VwZXJSaWdodFByb2R1Y3Rpb25EZXRhaWxzTGFiZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVELG1EQUFtRCxnQkFBZ0Isc0JBQXNCLE9BQU8sMkJBQTJCLDBCQUEwQix5REFBeUQsMkJBQTJCLEVBQUUsRUFBRSxFQUFFLGVBQWU7O0FBRTlQLGdDQUFnQywyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRSxFQUFFLHlEQUF5RCxxRUFBcUUsNkRBQTZELG9CQUFvQixHQUFHLEVBQUU7O0FBRWpqQjs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0YsOENBQThDLGlCQUFpQixxQkFBcUIsb0NBQW9DLDZEQUE2RCxvQkFBb0IsRUFBRSxlQUFlOztBQUUxTixpREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SixpREFBaUQsYUFBYSx1RkFBdUYsRUFBRSx1RkFBdUY7O0FBRTlPLDBDQUEwQywrREFBK0QscUdBQXFHLEVBQUUseUVBQXlFLGVBQWUseUVBQXlFLEVBQUUsRUFBRSx1SEFBdUg7O0FBRTVlO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7O0FBTUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7O0FBTUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7O0FBVUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSywwSkFBMEo7QUFDL0o7QUFDQTtBQUNBO0FBQ0EsS0FBSyxtRkFBbUY7QUFDeEY7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsb0JBQW9CO0FBQy9CLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0Isb0JBQW9CO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0EsbUJBQW1CLGtCQUFrQjtBQUNyQzs7QUFFQTtBQUNBLG1CQUFtQiw4Q0FBOEM7QUFDakU7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUIsRUFBRTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLG9CQUFvQjtBQUNqQyxhQUFhLE9BQU87QUFDcEIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG9CQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNB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QTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsNEJBQTRCO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLHlCQUF5Qix5QkFBeUI7QUFDbEQsbUNBQW1DLDJFQUEyRTtBQUM5RywrQ0FBK0MsbUNBQW1DOztBQUVsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEseUJBQXlCLHlCQUF5QjtBQUNsRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOzs7QUFHQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSw4R0FBOEcseUJBQXlCO0FBQ3ZJOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNLHFFQUFxRTtBQUMzRTs7QUFFQTtBQUNBLE1BQU0sZ0JBQWdCO0FBQ3RCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNLG9EQUFvRDtBQUMxRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNG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QUs7QUFEVCxLQUZHLEVBS0gsOEVBTEcsQ0FYMEI7QUFtQmpDLFVBQU8sQ0FBQyw4RkFBRDtBQW5CMEIsQ0FBOUI7O0FBdUJBLElBQU1DLG9DQUFvQztBQUM3QyxVQUFPLG1CQURzQztBQUU3QyxVQUFPLDJCQUZzQztBQUc3QyxVQUFPLDJCQUhzQztBQUk3QyxVQUFPLG9CQUpzQztBQUs3QyxVQUFPLGNBTHNDO0FBTTdDLFVBQU87QUFOc0MsQ0FBMUM7O0FBU0EsSUFBTWpJLHdCQUF3QjtBQUNqQyxVQUFPLE1BRDBCO0FBRWpDLFVBQU8saUJBRjBCO0FBR2pDLFVBQU8sU0FIMEI7QUFJakMsVUFBTyxrQkFKMEI7QUFLakMsVUFBTyxNQUwwQjtBQU1qQyxVQUFPO0FBTjBCLENBQTlCLEMiLCJmaWxlIjoibWFuYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcycpO1xuXG52YXIgX3Byb3BUeXBlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcm9wVHlwZXMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIHNpemVyU3R5bGUgPSB7XG5cdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHR0b3A6IDAsXG5cdGxlZnQ6IDAsXG5cdHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuXHRoZWlnaHQ6IDAsXG5cdG92ZXJmbG93OiAnc2Nyb2xsJyxcblx0d2hpdGVTcGFjZTogJ3ByZSdcbn07XG5cbnZhciBJTlBVVF9QUk9QU19CTEFDS0xJU1QgPSBbJ2V4dHJhV2lkdGgnLCAnaW5qZWN0U3R5bGVzJywgJ2lucHV0Q2xhc3NOYW1lJywgJ2lucHV0UmVmJywgJ2lucHV0U3R5bGUnLCAnbWluV2lkdGgnLCAnb25BdXRvc2l6ZScsICdwbGFjZWhvbGRlcklzTWluV2lkdGgnXTtcblxudmFyIGNsZWFuSW5wdXRQcm9wcyA9IGZ1bmN0aW9uIGNsZWFuSW5wdXRQcm9wcyhpbnB1dFByb3BzKSB7XG5cdElOUFVUX1BST1BTX0JMQUNLTElTVC5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuXHRcdHJldHVybiBkZWxldGUgaW5wdXRQcm9wc1tmaWVsZF07XG5cdH0pO1xuXHRyZXR1cm4gaW5wdXRQcm9wcztcbn07XG5cbnZhciBjb3B5U3R5bGVzID0gZnVuY3Rpb24gY29weVN0eWxlcyhzdHlsZXMsIG5vZGUpIHtcblx0bm9kZS5zdHlsZS5mb250U2l6ZSA9IHN0eWxlcy5mb250U2l6ZTtcblx0bm9kZS5zdHlsZS5mb250RmFtaWx5ID0gc3R5bGVzLmZvbnRGYW1pbHk7XG5cdG5vZGUuc3R5bGUuZm9udFdlaWdodCA9IHN0eWxlcy5mb250V2VpZ2h0O1xuXHRub2RlLnN0eWxlLmZvbnRTdHlsZSA9IHN0eWxlcy5mb250U3R5bGU7XG5cdG5vZGUuc3R5bGUubGV0dGVyU3BhY2luZyA9IHN0eWxlcy5sZXR0ZXJTcGFjaW5nO1xuXHRub2RlLnN0eWxlLnRleHRUcmFuc2Zvcm0gPSBzdHlsZXMudGV4dFRyYW5zZm9ybTtcbn07XG5cbnZhciBpc0lFID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lm5hdmlnYXRvciA/IC9NU0lFIHxUcmlkZW50XFwvfEVkZ2VcXC8vLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpIDogZmFsc2U7XG5cbnZhciBnZW5lcmF0ZUlkID0gZnVuY3Rpb24gZ2VuZXJhdGVJZCgpIHtcblx0Ly8gd2Ugb25seSBuZWVkIGFuIGF1dG8tZ2VuZXJhdGVkIElEIGZvciBzdHlsZXNoZWV0IGluamVjdGlvbiwgd2hpY2ggaXMgb25seVxuXHQvLyB1c2VkIGZvciBJRS4gc28gaWYgdGhlIGJyb3dzZXIgaXMgbm90IElFLCB0aGlzIHNob3VsZCByZXR1cm4gdW5kZWZpbmVkLlxuXHRyZXR1cm4gaXNJRSA/ICdfJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCAxMikgOiB1bmRlZmluZWQ7XG59O1xuXG52YXIgQXV0b3NpemVJbnB1dCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG5cdF9pbmhlcml0cyhBdXRvc2l6ZUlucHV0LCBfQ29tcG9uZW50KTtcblxuXHRmdW5jdGlvbiBBdXRvc2l6ZUlucHV0KHByb3BzKSB7XG5cdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEF1dG9zaXplSW5wdXQpO1xuXG5cdFx0dmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEF1dG9zaXplSW5wdXQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihBdXRvc2l6ZUlucHV0KSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG5cdFx0X3RoaXMuaW5wdXRSZWYgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdF90aGlzLmlucHV0ID0gZWw7XG5cdFx0XHRpZiAodHlwZW9mIF90aGlzLnByb3BzLmlucHV0UmVmID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdF90aGlzLnByb3BzLmlucHV0UmVmKGVsKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0X3RoaXMucGxhY2VIb2xkZXJTaXplclJlZiA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0X3RoaXMucGxhY2VIb2xkZXJTaXplciA9IGVsO1xuXHRcdH07XG5cblx0XHRfdGhpcy5zaXplclJlZiA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0X3RoaXMuc2l6ZXIgPSBlbDtcblx0XHR9O1xuXG5cdFx0X3RoaXMuc3RhdGUgPSB7XG5cdFx0XHRpbnB1dFdpZHRoOiBwcm9wcy5taW5XaWR0aCxcblx0XHRcdGlucHV0SWQ6IHByb3BzLmlkIHx8IGdlbmVyYXRlSWQoKVxuXHRcdH07XG5cdFx0cmV0dXJuIF90aGlzO1xuXHR9XG5cblx0X2NyZWF0ZUNsYXNzKEF1dG9zaXplSW5wdXQsIFt7XG5cdFx0a2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRcdHRoaXMubW91bnRlZCA9IHRydWU7XG5cdFx0XHR0aGlzLmNvcHlJbnB1dFN0eWxlcygpO1xuXHRcdFx0dGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG5cdFx0XHR2YXIgaWQgPSBuZXh0UHJvcHMuaWQ7XG5cblx0XHRcdGlmIChpZCAhPT0gdGhpcy5wcm9wcy5pZCkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHsgaW5wdXRJZDogaWQgfHwgZ2VuZXJhdGVJZCgpIH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuXHRcdFx0aWYgKHByZXZTdGF0ZS5pbnB1dFdpZHRoICE9PSB0aGlzLnN0YXRlLmlucHV0V2lkdGgpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uQXV0b3NpemUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHR0aGlzLnByb3BzLm9uQXV0b3NpemUodGhpcy5zdGF0ZS5pbnB1dFdpZHRoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRcdHRoaXMubW91bnRlZCA9IGZhbHNlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2NvcHlJbnB1dFN0eWxlcycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvcHlJbnB1dFN0eWxlcygpIHtcblx0XHRcdGlmICghdGhpcy5tb3VudGVkIHx8ICF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgaW5wdXRTdHlsZXMgPSB0aGlzLmlucHV0ICYmIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuaW5wdXQpO1xuXHRcdFx0aWYgKCFpbnB1dFN0eWxlcykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb3B5U3R5bGVzKGlucHV0U3R5bGVzLCB0aGlzLnNpemVyKTtcblx0XHRcdGlmICh0aGlzLnBsYWNlSG9sZGVyU2l6ZXIpIHtcblx0XHRcdFx0Y29weVN0eWxlcyhpbnB1dFN0eWxlcywgdGhpcy5wbGFjZUhvbGRlclNpemVyKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICd1cGRhdGVJbnB1dFdpZHRoJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gdXBkYXRlSW5wdXRXaWR0aCgpIHtcblx0XHRcdGlmICghdGhpcy5tb3VudGVkIHx8ICF0aGlzLnNpemVyIHx8IHR5cGVvZiB0aGlzLnNpemVyLnNjcm9sbFdpZHRoID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgbmV3SW5wdXRXaWR0aCA9IHZvaWQgMDtcblx0XHRcdGlmICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyICYmICghdGhpcy5wcm9wcy52YWx1ZSB8fCB0aGlzLnByb3BzLnZhbHVlICYmIHRoaXMucHJvcHMucGxhY2Vob2xkZXJJc01pbldpZHRoKSkge1xuXHRcdFx0XHRuZXdJbnB1dFdpZHRoID0gTWF0aC5tYXgodGhpcy5zaXplci5zY3JvbGxXaWR0aCwgdGhpcy5wbGFjZUhvbGRlclNpemVyLnNjcm9sbFdpZHRoKSArIDI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRuZXdJbnB1dFdpZHRoID0gdGhpcy5zaXplci5zY3JvbGxXaWR0aCArIDI7XG5cdFx0XHR9XG5cdFx0XHQvLyBhZGQgZXh0cmFXaWR0aCB0byB0aGUgZGV0ZWN0ZWQgd2lkdGguIGZvciBudW1iZXIgdHlwZXMsIHRoaXMgZGVmYXVsdHMgdG8gMTYgdG8gYWxsb3cgZm9yIHRoZSBzdGVwcGVyIFVJXG5cdFx0XHR2YXIgZXh0cmFXaWR0aCA9IHRoaXMucHJvcHMudHlwZSA9PT0gJ251bWJlcicgJiYgdGhpcy5wcm9wcy5leHRyYVdpZHRoID09PSB1bmRlZmluZWQgPyAxNiA6IHBhcnNlSW50KHRoaXMucHJvcHMuZXh0cmFXaWR0aCkgfHwgMDtcblx0XHRcdG5ld0lucHV0V2lkdGggKz0gZXh0cmFXaWR0aDtcblx0XHRcdGlmIChuZXdJbnB1dFdpZHRoIDwgdGhpcy5wcm9wcy5taW5XaWR0aCkge1xuXHRcdFx0XHRuZXdJbnB1dFdpZHRoID0gdGhpcy5wcm9wcy5taW5XaWR0aDtcblx0XHRcdH1cblx0XHRcdGlmIChuZXdJbnB1dFdpZHRoICE9PSB0aGlzLnN0YXRlLmlucHV0V2lkdGgpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0aW5wdXRXaWR0aDogbmV3SW5wdXRXaWR0aFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdnZXRJbnB1dCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuaW5wdXQ7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmb2N1cygpIHtcblx0XHRcdHRoaXMuaW5wdXQuZm9jdXMoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdibHVyJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gYmx1cigpIHtcblx0XHRcdHRoaXMuaW5wdXQuYmx1cigpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3NlbGVjdCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHNlbGVjdCgpIHtcblx0XHRcdHRoaXMuaW5wdXQuc2VsZWN0KCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyU3R5bGVzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyU3R5bGVzKCkge1xuXHRcdFx0Ly8gdGhpcyBtZXRob2QgaW5qZWN0cyBzdHlsZXMgdG8gaGlkZSBJRSdzIGNsZWFyIGluZGljYXRvciwgd2hpY2ggbWVzc2VzXG5cdFx0XHQvLyB3aXRoIGlucHV0IHNpemUgZGV0ZWN0aW9uLiB0aGUgc3R5bGVzaGVldCBpcyBvbmx5IGluamVjdGVkIHdoZW4gdGhlXG5cdFx0XHQvLyBicm93c2VyIGlzIElFLCBhbmQgY2FuIGFsc28gYmUgZGlzYWJsZWQgYnkgdGhlIGBpbmplY3RTdHlsZXNgIHByb3AuXG5cdFx0XHR2YXIgaW5qZWN0U3R5bGVzID0gdGhpcy5wcm9wcy5pbmplY3RTdHlsZXM7XG5cblx0XHRcdHJldHVybiBpc0lFICYmIGluamVjdFN0eWxlcyA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdzdHlsZScsIHsgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw6IHtcblx0XHRcdFx0XHRfX2h0bWw6ICdpbnB1dCMnICsgdGhpcy5zdGF0ZS5pbnB1dElkICsgJzo6LW1zLWNsZWFyIHtkaXNwbGF5OiBub25lO30nXG5cdFx0XHRcdH0gfSkgOiBudWxsO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHZhciBzaXplclZhbHVlID0gW3RoaXMucHJvcHMuZGVmYXVsdFZhbHVlLCB0aGlzLnByb3BzLnZhbHVlLCAnJ10ucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpIHtcblx0XHRcdFx0aWYgKHByZXZpb3VzVmFsdWUgIT09IG51bGwgJiYgcHJldmlvdXNWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHByZXZpb3VzVmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGN1cnJlbnRWYWx1ZTtcblx0XHRcdH0pO1xuXG5cdFx0XHR2YXIgd3JhcHBlclN0eWxlID0gX2V4dGVuZHMoe30sIHRoaXMucHJvcHMuc3R5bGUpO1xuXHRcdFx0aWYgKCF3cmFwcGVyU3R5bGUuZGlzcGxheSkgd3JhcHBlclN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcblxuXHRcdFx0dmFyIGlucHV0U3R5bGUgPSBfZXh0ZW5kcyh7XG5cdFx0XHRcdGJveFNpemluZzogJ2NvbnRlbnQtYm94Jyxcblx0XHRcdFx0d2lkdGg6IHRoaXMuc3RhdGUuaW5wdXRXaWR0aCArICdweCdcblx0XHRcdH0sIHRoaXMucHJvcHMuaW5wdXRTdHlsZSk7XG5cblx0XHRcdHZhciBpbnB1dFByb3BzID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHRoaXMucHJvcHMsIFtdKTtcblxuXHRcdFx0Y2xlYW5JbnB1dFByb3BzKGlucHV0UHJvcHMpO1xuXHRcdFx0aW5wdXRQcm9wcy5jbGFzc05hbWUgPSB0aGlzLnByb3BzLmlucHV0Q2xhc3NOYW1lO1xuXHRcdFx0aW5wdXRQcm9wcy5pZCA9IHRoaXMuc3RhdGUuaW5wdXRJZDtcblx0XHRcdGlucHV0UHJvcHMuc3R5bGUgPSBpbnB1dFN0eWxlO1xuXG5cdFx0XHRyZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHR7IGNsYXNzTmFtZTogdGhpcy5wcm9wcy5jbGFzc05hbWUsIHN0eWxlOiB3cmFwcGVyU3R5bGUgfSxcblx0XHRcdFx0dGhpcy5yZW5kZXJTdHlsZXMoKSxcblx0XHRcdFx0X3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgX2V4dGVuZHMoe30sIGlucHV0UHJvcHMsIHsgcmVmOiB0aGlzLmlucHV0UmVmIH0pKSxcblx0XHRcdFx0X3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdFx0eyByZWY6IHRoaXMuc2l6ZXJSZWYsIHN0eWxlOiBzaXplclN0eWxlIH0sXG5cdFx0XHRcdFx0c2l6ZXJWYWx1ZVxuXHRcdFx0XHQpLFxuXHRcdFx0XHR0aGlzLnByb3BzLnBsYWNlaG9sZGVyID8gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdFx0eyByZWY6IHRoaXMucGxhY2VIb2xkZXJTaXplclJlZiwgc3R5bGU6IHNpemVyU3R5bGUgfSxcblx0XHRcdFx0XHR0aGlzLnByb3BzLnBsYWNlaG9sZGVyXG5cdFx0XHRcdCkgOiBudWxsXG5cdFx0XHQpO1xuXHRcdH1cblx0fV0pO1xuXG5cdHJldHVybiBBdXRvc2l6ZUlucHV0O1xufShfcmVhY3QuQ29tcG9uZW50KTtcblxuQXV0b3NpemVJbnB1dC5wcm9wVHlwZXMgPSB7XG5cdGNsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIC8vIGNsYXNzTmFtZSBmb3IgdGhlIG91dGVyIGVsZW1lbnRcblx0ZGVmYXVsdFZhbHVlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmFueSwgLy8gZGVmYXVsdCBmaWVsZCB2YWx1ZVxuXHRleHRyYVdpZHRoOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9uZU9mVHlwZShbLy8gYWRkaXRpb25hbCB3aWR0aCBmb3IgaW5wdXQgZWxlbWVudFxuXHRfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlciwgX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmddKSxcblx0aWQ6IF9wcm9wVHlwZXMyLmRlZmF1bHQuc3RyaW5nLCAvLyBpZCB0byB1c2UgZm9yIHRoZSBpbnB1dCwgY2FuIGJlIHNldCBmb3IgY29uc2lzdGVudCBzbmFwc2hvdHNcblx0aW5qZWN0U3R5bGVzOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsIC8vIGluamVjdCB0aGUgY3VzdG9tIHN0eWxlc2hlZXQgdG8gaGlkZSBjbGVhciBVSSwgZGVmYXVsdHMgdG8gdHJ1ZVxuXHRpbnB1dENsYXNzTmFtZTogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIC8vIGNsYXNzTmFtZSBmb3IgdGhlIGlucHV0IGVsZW1lbnRcblx0aW5wdXRSZWY6IF9wcm9wVHlwZXMyLmRlZmF1bHQuZnVuYywgLy8gcmVmIGNhbGxiYWNrIGZvciB0aGUgaW5wdXQgZWxlbWVudFxuXHRpbnB1dFN0eWxlOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdCwgLy8gY3NzIHN0eWxlcyBmb3IgdGhlIGlucHV0IGVsZW1lbnRcblx0bWluV2lkdGg6IF9wcm9wVHlwZXMyLmRlZmF1bHQub25lT2ZUeXBlKFsvLyBtaW5pbXVtIHdpZHRoIGZvciBpbnB1dCBlbGVtZW50XG5cdF9wcm9wVHlwZXMyLmRlZmF1bHQubnVtYmVyLCBfcHJvcFR5cGVzMi5kZWZhdWx0LnN0cmluZ10pLFxuXHRvbkF1dG9zaXplOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsIC8vIG9uQXV0b3NpemUgaGFuZGxlcjogZnVuY3Rpb24obmV3V2lkdGgpIHt9XG5cdG9uQ2hhbmdlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsIC8vIG9uQ2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uKGV2ZW50KSB7fVxuXHRwbGFjZWhvbGRlcjogX3Byb3BUeXBlczIuZGVmYXVsdC5zdHJpbmcsIC8vIHBsYWNlaG9sZGVyIHRleHRcblx0cGxhY2Vob2xkZXJJc01pbldpZHRoOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmJvb2wsIC8vIGRvbid0IGNvbGxhcHNlIHNpemUgdG8gbGVzcyB0aGFuIHRoZSBwbGFjZWhvbGRlclxuXHRzdHlsZTogX3Byb3BUeXBlczIuZGVmYXVsdC5vYmplY3QsIC8vIGNzcyBzdHlsZXMgZm9yIHRoZSBvdXRlciBlbGVtZW50XG5cdHZhbHVlOiBfcHJvcFR5cGVzMi5kZWZhdWx0LmFueSAvLyBmaWVsZCB2YWx1ZVxufTtcbkF1dG9zaXplSW5wdXQuZGVmYXVsdFByb3BzID0ge1xuXHRtaW5XaWR0aDogMSxcblx0aW5qZWN0U3R5bGVzOiB0cnVlXG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBdXRvc2l6ZUlucHV0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWlucHV0LWF1dG9zaXplL2xpYi9BdXRvc2l6ZUlucHV0LmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1pbnB1dC1hdXRvc2l6ZS9saWIvQXV0b3NpemVJbnB1dC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiaW1wb3J0IEF1dG9zaXplSW5wdXQgZnJvbSAncmVhY3QtaW5wdXQtYXV0b3NpemUnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZpbmRET01Ob2RlIH0gZnJvbSAncmVhY3QtZG9tJztcblxudmFyIGFycm93UmVuZGVyZXIgPSBmdW5jdGlvbiBhcnJvd1JlbmRlcmVyKF9yZWYpIHtcblx0dmFyIG9uTW91c2VEb3duID0gX3JlZi5vbk1vdXNlRG93bjtcblxuXHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcblx0XHRjbGFzc05hbWU6ICdTZWxlY3QtYXJyb3cnLFxuXHRcdG9uTW91c2VEb3duOiBvbk1vdXNlRG93blxuXHR9KTtcbn07XG5cbmFycm93UmVuZGVyZXIucHJvcFR5cGVzID0ge1xuXHRvbk1vdXNlRG93bjogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbnZhciBjbGVhclJlbmRlcmVyID0gZnVuY3Rpb24gY2xlYXJSZW5kZXJlcigpIHtcblx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XG5cdFx0Y2xhc3NOYW1lOiAnU2VsZWN0LWNsZWFyJyxcblx0XHRkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6ICcmdGltZXM7JyB9XG5cdH0pO1xufTtcblxudmFyIG1hcCA9IFt7ICdiYXNlJzogJ0EnLCAnbGV0dGVycyc6IC9bXFx1MDA0MVxcdTI0QjZcXHVGRjIxXFx1MDBDMFxcdTAwQzFcXHUwMEMyXFx1MUVBNlxcdTFFQTRcXHUxRUFBXFx1MUVBOFxcdTAwQzNcXHUwMTAwXFx1MDEwMlxcdTFFQjBcXHUxRUFFXFx1MUVCNFxcdTFFQjJcXHUwMjI2XFx1MDFFMFxcdTAwQzRcXHUwMURFXFx1MUVBMlxcdTAwQzVcXHUwMUZBXFx1MDFDRFxcdTAyMDBcXHUwMjAyXFx1MUVBMFxcdTFFQUNcXHUxRUI2XFx1MUUwMFxcdTAxMDRcXHUwMjNBXFx1MkM2Rl0vZyB9LCB7ICdiYXNlJzogJ0FBJywgJ2xldHRlcnMnOiAvW1xcdUE3MzJdL2cgfSwgeyAnYmFzZSc6ICdBRScsICdsZXR0ZXJzJzogL1tcXHUwMEM2XFx1MDFGQ1xcdTAxRTJdL2cgfSwgeyAnYmFzZSc6ICdBTycsICdsZXR0ZXJzJzogL1tcXHVBNzM0XS9nIH0sIHsgJ2Jhc2UnOiAnQVUnLCAnbGV0dGVycyc6IC9bXFx1QTczNl0vZyB9LCB7ICdiYXNlJzogJ0FWJywgJ2xldHRlcnMnOiAvW1xcdUE3MzhcXHVBNzNBXS9nIH0sIHsgJ2Jhc2UnOiAnQVknLCAnbGV0dGVycyc6IC9bXFx1QTczQ10vZyB9LCB7ICdiYXNlJzogJ0InLCAnbGV0dGVycyc6IC9bXFx1MDA0MlxcdTI0QjdcXHVGRjIyXFx1MUUwMlxcdTFFMDRcXHUxRTA2XFx1MDI0M1xcdTAxODJcXHUwMTgxXS9nIH0sIHsgJ2Jhc2UnOiAnQycsICdsZXR0ZXJzJzogL1tcXHUwMDQzXFx1MjRCOFxcdUZGMjNcXHUwMTA2XFx1MDEwOFxcdTAxMEFcXHUwMTBDXFx1MDBDN1xcdTFFMDhcXHUwMTg3XFx1MDIzQlxcdUE3M0VdL2cgfSwgeyAnYmFzZSc6ICdEJywgJ2xldHRlcnMnOiAvW1xcdTAwNDRcXHUyNEI5XFx1RkYyNFxcdTFFMEFcXHUwMTBFXFx1MUUwQ1xcdTFFMTBcXHUxRTEyXFx1MUUwRVxcdTAxMTBcXHUwMThCXFx1MDE4QVxcdTAxODlcXHVBNzc5XS9nIH0sIHsgJ2Jhc2UnOiAnRFonLCAnbGV0dGVycyc6IC9bXFx1MDFGMVxcdTAxQzRdL2cgfSwgeyAnYmFzZSc6ICdEeicsICdsZXR0ZXJzJzogL1tcXHUwMUYyXFx1MDFDNV0vZyB9LCB7ICdiYXNlJzogJ0UnLCAnbGV0dGVycyc6IC9bXFx1MDA0NVxcdTI0QkFcXHVGRjI1XFx1MDBDOFxcdTAwQzlcXHUwMENBXFx1MUVDMFxcdTFFQkVcXHUxRUM0XFx1MUVDMlxcdTFFQkNcXHUwMTEyXFx1MUUxNFxcdTFFMTZcXHUwMTE0XFx1MDExNlxcdTAwQ0JcXHUxRUJBXFx1MDExQVxcdTAyMDRcXHUwMjA2XFx1MUVCOFxcdTFFQzZcXHUwMjI4XFx1MUUxQ1xcdTAxMThcXHUxRTE4XFx1MUUxQVxcdTAxOTBcXHUwMThFXS9nIH0sIHsgJ2Jhc2UnOiAnRicsICdsZXR0ZXJzJzogL1tcXHUwMDQ2XFx1MjRCQlxcdUZGMjZcXHUxRTFFXFx1MDE5MVxcdUE3N0JdL2cgfSwgeyAnYmFzZSc6ICdHJywgJ2xldHRlcnMnOiAvW1xcdTAwNDdcXHUyNEJDXFx1RkYyN1xcdTAxRjRcXHUwMTFDXFx1MUUyMFxcdTAxMUVcXHUwMTIwXFx1MDFFNlxcdTAxMjJcXHUwMUU0XFx1MDE5M1xcdUE3QTBcXHVBNzdEXFx1QTc3RV0vZyB9LCB7ICdiYXNlJzogJ0gnLCAnbGV0dGVycyc6IC9bXFx1MDA0OFxcdTI0QkRcXHVGRjI4XFx1MDEyNFxcdTFFMjJcXHUxRTI2XFx1MDIxRVxcdTFFMjRcXHUxRTI4XFx1MUUyQVxcdTAxMjZcXHUyQzY3XFx1MkM3NVxcdUE3OERdL2cgfSwgeyAnYmFzZSc6ICdJJywgJ2xldHRlcnMnOiAvW1xcdTAwNDlcXHUyNEJFXFx1RkYyOVxcdTAwQ0NcXHUwMENEXFx1MDBDRVxcdTAxMjhcXHUwMTJBXFx1MDEyQ1xcdTAxMzBcXHUwMENGXFx1MUUyRVxcdTFFQzhcXHUwMUNGXFx1MDIwOFxcdTAyMEFcXHUxRUNBXFx1MDEyRVxcdTFFMkNcXHUwMTk3XS9nIH0sIHsgJ2Jhc2UnOiAnSicsICdsZXR0ZXJzJzogL1tcXHUwMDRBXFx1MjRCRlxcdUZGMkFcXHUwMTM0XFx1MDI0OF0vZyB9LCB7ICdiYXNlJzogJ0snLCAnbGV0dGVycyc6IC9bXFx1MDA0QlxcdTI0QzBcXHVGRjJCXFx1MUUzMFxcdTAxRThcXHUxRTMyXFx1MDEzNlxcdTFFMzRcXHUwMTk4XFx1MkM2OVxcdUE3NDBcXHVBNzQyXFx1QTc0NFxcdUE3QTJdL2cgfSwgeyAnYmFzZSc6ICdMJywgJ2xldHRlcnMnOiAvW1xcdTAwNENcXHUyNEMxXFx1RkYyQ1xcdTAxM0ZcXHUwMTM5XFx1MDEzRFxcdTFFMzZcXHUxRTM4XFx1MDEzQlxcdTFFM0NcXHUxRTNBXFx1MDE0MVxcdTAyM0RcXHUyQzYyXFx1MkM2MFxcdUE3NDhcXHVBNzQ2XFx1QTc4MF0vZyB9LCB7ICdiYXNlJzogJ0xKJywgJ2xldHRlcnMnOiAvW1xcdTAxQzddL2cgfSwgeyAnYmFzZSc6ICdMaicsICdsZXR0ZXJzJzogL1tcXHUwMUM4XS9nIH0sIHsgJ2Jhc2UnOiAnTScsICdsZXR0ZXJzJzogL1tcXHUwMDREXFx1MjRDMlxcdUZGMkRcXHUxRTNFXFx1MUU0MFxcdTFFNDJcXHUyQzZFXFx1MDE5Q10vZyB9LCB7ICdiYXNlJzogJ04nLCAnbGV0dGVycyc6IC9bXFx1MDA0RVxcdTI0QzNcXHVGRjJFXFx1MDFGOFxcdTAxNDNcXHUwMEQxXFx1MUU0NFxcdTAxNDdcXHUxRTQ2XFx1MDE0NVxcdTFFNEFcXHUxRTQ4XFx1MDIyMFxcdTAxOURcXHVBNzkwXFx1QTdBNF0vZyB9LCB7ICdiYXNlJzogJ05KJywgJ2xldHRlcnMnOiAvW1xcdTAxQ0FdL2cgfSwgeyAnYmFzZSc6ICdOaicsICdsZXR0ZXJzJzogL1tcXHUwMUNCXS9nIH0sIHsgJ2Jhc2UnOiAnTycsICdsZXR0ZXJzJzogL1tcXHUwMDRGXFx1MjRDNFxcdUZGMkZcXHUwMEQyXFx1MDBEM1xcdTAwRDRcXHUxRUQyXFx1MUVEMFxcdTFFRDZcXHUxRUQ0XFx1MDBENVxcdTFFNENcXHUwMjJDXFx1MUU0RVxcdTAxNENcXHUxRTUwXFx1MUU1MlxcdTAxNEVcXHUwMjJFXFx1MDIzMFxcdTAwRDZcXHUwMjJBXFx1MUVDRVxcdTAxNTBcXHUwMUQxXFx1MDIwQ1xcdTAyMEVcXHUwMUEwXFx1MUVEQ1xcdTFFREFcXHUxRUUwXFx1MUVERVxcdTFFRTJcXHUxRUNDXFx1MUVEOFxcdTAxRUFcXHUwMUVDXFx1MDBEOFxcdTAxRkVcXHUwMTg2XFx1MDE5RlxcdUE3NEFcXHVBNzRDXS9nIH0sIHsgJ2Jhc2UnOiAnT0knLCAnbGV0dGVycyc6IC9bXFx1MDFBMl0vZyB9LCB7ICdiYXNlJzogJ09PJywgJ2xldHRlcnMnOiAvW1xcdUE3NEVdL2cgfSwgeyAnYmFzZSc6ICdPVScsICdsZXR0ZXJzJzogL1tcXHUwMjIyXS9nIH0sIHsgJ2Jhc2UnOiAnUCcsICdsZXR0ZXJzJzogL1tcXHUwMDUwXFx1MjRDNVxcdUZGMzBcXHUxRTU0XFx1MUU1NlxcdTAxQTRcXHUyQzYzXFx1QTc1MFxcdUE3NTJcXHVBNzU0XS9nIH0sIHsgJ2Jhc2UnOiAnUScsICdsZXR0ZXJzJzogL1tcXHUwMDUxXFx1MjRDNlxcdUZGMzFcXHVBNzU2XFx1QTc1OFxcdTAyNEFdL2cgfSwgeyAnYmFzZSc6ICdSJywgJ2xldHRlcnMnOiAvW1xcdTAwNTJcXHUyNEM3XFx1RkYzMlxcdTAxNTRcXHUxRTU4XFx1MDE1OFxcdTAyMTBcXHUwMjEyXFx1MUU1QVxcdTFFNUNcXHUwMTU2XFx1MUU1RVxcdTAyNENcXHUyQzY0XFx1QTc1QVxcdUE3QTZcXHVBNzgyXS9nIH0sIHsgJ2Jhc2UnOiAnUycsICdsZXR0ZXJzJzogL1tcXHUwMDUzXFx1MjRDOFxcdUZGMzNcXHUxRTlFXFx1MDE1QVxcdTFFNjRcXHUwMTVDXFx1MUU2MFxcdTAxNjBcXHUxRTY2XFx1MUU2MlxcdTFFNjhcXHUwMjE4XFx1MDE1RVxcdTJDN0VcXHVBN0E4XFx1QTc4NF0vZyB9LCB7ICdiYXNlJzogJ1QnLCAnbGV0dGVycyc6IC9bXFx1MDA1NFxcdTI0QzlcXHVGRjM0XFx1MUU2QVxcdTAxNjRcXHUxRTZDXFx1MDIxQVxcdTAxNjJcXHUxRTcwXFx1MUU2RVxcdTAxNjZcXHUwMUFDXFx1MDFBRVxcdTAyM0VcXHVBNzg2XS9nIH0sIHsgJ2Jhc2UnOiAnVFonLCAnbGV0dGVycyc6IC9bXFx1QTcyOF0vZyB9LCB7ICdiYXNlJzogJ1UnLCAnbGV0dGVycyc6IC9bXFx1MDA1NVxcdTI0Q0FcXHVGRjM1XFx1MDBEOVxcdTAwREFcXHUwMERCXFx1MDE2OFxcdTFFNzhcXHUwMTZBXFx1MUU3QVxcdTAxNkNcXHUwMERDXFx1MDFEQlxcdTAxRDdcXHUwMUQ1XFx1MDFEOVxcdTFFRTZcXHUwMTZFXFx1MDE3MFxcdTAxRDNcXHUwMjE0XFx1MDIxNlxcdTAxQUZcXHUxRUVBXFx1MUVFOFxcdTFFRUVcXHUxRUVDXFx1MUVGMFxcdTFFRTRcXHUxRTcyXFx1MDE3MlxcdTFFNzZcXHUxRTc0XFx1MDI0NF0vZyB9LCB7ICdiYXNlJzogJ1YnLCAnbGV0dGVycyc6IC9bXFx1MDA1NlxcdTI0Q0JcXHVGRjM2XFx1MUU3Q1xcdTFFN0VcXHUwMUIyXFx1QTc1RVxcdTAyNDVdL2cgfSwgeyAnYmFzZSc6ICdWWScsICdsZXR0ZXJzJzogL1tcXHVBNzYwXS9nIH0sIHsgJ2Jhc2UnOiAnVycsICdsZXR0ZXJzJzogL1tcXHUwMDU3XFx1MjRDQ1xcdUZGMzdcXHUxRTgwXFx1MUU4MlxcdTAxNzRcXHUxRTg2XFx1MUU4NFxcdTFFODhcXHUyQzcyXS9nIH0sIHsgJ2Jhc2UnOiAnWCcsICdsZXR0ZXJzJzogL1tcXHUwMDU4XFx1MjRDRFxcdUZGMzhcXHUxRThBXFx1MUU4Q10vZyB9LCB7ICdiYXNlJzogJ1knLCAnbGV0dGVycyc6IC9bXFx1MDA1OVxcdTI0Q0VcXHVGRjM5XFx1MUVGMlxcdTAwRERcXHUwMTc2XFx1MUVGOFxcdTAyMzJcXHUxRThFXFx1MDE3OFxcdTFFRjZcXHUxRUY0XFx1MDFCM1xcdTAyNEVcXHUxRUZFXS9nIH0sIHsgJ2Jhc2UnOiAnWicsICdsZXR0ZXJzJzogL1tcXHUwMDVBXFx1MjRDRlxcdUZGM0FcXHUwMTc5XFx1MUU5MFxcdTAxN0JcXHUwMTdEXFx1MUU5MlxcdTFFOTRcXHUwMUI1XFx1MDIyNFxcdTJDN0ZcXHUyQzZCXFx1QTc2Ml0vZyB9LCB7ICdiYXNlJzogJ2EnLCAnbGV0dGVycyc6IC9bXFx1MDA2MVxcdTI0RDBcXHVGRjQxXFx1MUU5QVxcdTAwRTBcXHUwMEUxXFx1MDBFMlxcdTFFQTdcXHUxRUE1XFx1MUVBQlxcdTFFQTlcXHUwMEUzXFx1MDEwMVxcdTAxMDNcXHUxRUIxXFx1MUVBRlxcdTFFQjVcXHUxRUIzXFx1MDIyN1xcdTAxRTFcXHUwMEU0XFx1MDFERlxcdTFFQTNcXHUwMEU1XFx1MDFGQlxcdTAxQ0VcXHUwMjAxXFx1MDIwM1xcdTFFQTFcXHUxRUFEXFx1MUVCN1xcdTFFMDFcXHUwMTA1XFx1MkM2NVxcdTAyNTBdL2cgfSwgeyAnYmFzZSc6ICdhYScsICdsZXR0ZXJzJzogL1tcXHVBNzMzXS9nIH0sIHsgJ2Jhc2UnOiAnYWUnLCAnbGV0dGVycyc6IC9bXFx1MDBFNlxcdTAxRkRcXHUwMUUzXS9nIH0sIHsgJ2Jhc2UnOiAnYW8nLCAnbGV0dGVycyc6IC9bXFx1QTczNV0vZyB9LCB7ICdiYXNlJzogJ2F1JywgJ2xldHRlcnMnOiAvW1xcdUE3MzddL2cgfSwgeyAnYmFzZSc6ICdhdicsICdsZXR0ZXJzJzogL1tcXHVBNzM5XFx1QTczQl0vZyB9LCB7ICdiYXNlJzogJ2F5JywgJ2xldHRlcnMnOiAvW1xcdUE3M0RdL2cgfSwgeyAnYmFzZSc6ICdiJywgJ2xldHRlcnMnOiAvW1xcdTAwNjJcXHUyNEQxXFx1RkY0MlxcdTFFMDNcXHUxRTA1XFx1MUUwN1xcdTAxODBcXHUwMTgzXFx1MDI1M10vZyB9LCB7ICdiYXNlJzogJ2MnLCAnbGV0dGVycyc6IC9bXFx1MDA2M1xcdTI0RDJcXHVGRjQzXFx1MDEwN1xcdTAxMDlcXHUwMTBCXFx1MDEwRFxcdTAwRTdcXHUxRTA5XFx1MDE4OFxcdTAyM0NcXHVBNzNGXFx1MjE4NF0vZyB9LCB7ICdiYXNlJzogJ2QnLCAnbGV0dGVycyc6IC9bXFx1MDA2NFxcdTI0RDNcXHVGRjQ0XFx1MUUwQlxcdTAxMEZcXHUxRTBEXFx1MUUxMVxcdTFFMTNcXHUxRTBGXFx1MDExMVxcdTAxOENcXHUwMjU2XFx1MDI1N1xcdUE3N0FdL2cgfSwgeyAnYmFzZSc6ICdkeicsICdsZXR0ZXJzJzogL1tcXHUwMUYzXFx1MDFDNl0vZyB9LCB7ICdiYXNlJzogJ2UnLCAnbGV0dGVycyc6IC9bXFx1MDA2NVxcdTI0RDRcXHVGRjQ1XFx1MDBFOFxcdTAwRTlcXHUwMEVBXFx1MUVDMVxcdTFFQkZcXHUxRUM1XFx1MUVDM1xcdTFFQkRcXHUwMTEzXFx1MUUxNVxcdTFFMTdcXHUwMTE1XFx1MDExN1xcdTAwRUJcXHUxRUJCXFx1MDExQlxcdTAyMDVcXHUwMjA3XFx1MUVCOVxcdTFFQzdcXHUwMjI5XFx1MUUxRFxcdTAxMTlcXHUxRTE5XFx1MUUxQlxcdTAyNDdcXHUwMjVCXFx1MDFERF0vZyB9LCB7ICdiYXNlJzogJ2YnLCAnbGV0dGVycyc6IC9bXFx1MDA2NlxcdTI0RDVcXHVGRjQ2XFx1MUUxRlxcdTAxOTJcXHVBNzdDXS9nIH0sIHsgJ2Jhc2UnOiAnZycsICdsZXR0ZXJzJzogL1tcXHUwMDY3XFx1MjRENlxcdUZGNDdcXHUwMUY1XFx1MDExRFxcdTFFMjFcXHUwMTFGXFx1MDEyMVxcdTAxRTdcXHUwMTIzXFx1MDFFNVxcdTAyNjBcXHVBN0ExXFx1MUQ3OVxcdUE3N0ZdL2cgfSwgeyAnYmFzZSc6ICdoJywgJ2xldHRlcnMnOiAvW1xcdTAwNjhcXHUyNEQ3XFx1RkY0OFxcdTAxMjVcXHUxRTIzXFx1MUUyN1xcdTAyMUZcXHUxRTI1XFx1MUUyOVxcdTFFMkJcXHUxRTk2XFx1MDEyN1xcdTJDNjhcXHUyQzc2XFx1MDI2NV0vZyB9LCB7ICdiYXNlJzogJ2h2JywgJ2xldHRlcnMnOiAvW1xcdTAxOTVdL2cgfSwgeyAnYmFzZSc6ICdpJywgJ2xldHRlcnMnOiAvW1xcdTAwNjlcXHUyNEQ4XFx1RkY0OVxcdTAwRUNcXHUwMEVEXFx1MDBFRVxcdTAxMjlcXHUwMTJCXFx1MDEyRFxcdTAwRUZcXHUxRTJGXFx1MUVDOVxcdTAxRDBcXHUwMjA5XFx1MDIwQlxcdTFFQ0JcXHUwMTJGXFx1MUUyRFxcdTAyNjhcXHUwMTMxXS9nIH0sIHsgJ2Jhc2UnOiAnaicsICdsZXR0ZXJzJzogL1tcXHUwMDZBXFx1MjREOVxcdUZGNEFcXHUwMTM1XFx1MDFGMFxcdTAyNDldL2cgfSwgeyAnYmFzZSc6ICdrJywgJ2xldHRlcnMnOiAvW1xcdTAwNkJcXHUyNERBXFx1RkY0QlxcdTFFMzFcXHUwMUU5XFx1MUUzM1xcdTAxMzdcXHUxRTM1XFx1MDE5OVxcdTJDNkFcXHVBNzQxXFx1QTc0M1xcdUE3NDVcXHVBN0EzXS9nIH0sIHsgJ2Jhc2UnOiAnbCcsICdsZXR0ZXJzJzogL1tcXHUwMDZDXFx1MjREQlxcdUZGNENcXHUwMTQwXFx1MDEzQVxcdTAxM0VcXHUxRTM3XFx1MUUzOVxcdTAxM0NcXHUxRTNEXFx1MUUzQlxcdTAxN0ZcXHUwMTQyXFx1MDE5QVxcdTAyNkJcXHUyQzYxXFx1QTc0OVxcdUE3ODFcXHVBNzQ3XS9nIH0sIHsgJ2Jhc2UnOiAnbGonLCAnbGV0dGVycyc6IC9bXFx1MDFDOV0vZyB9LCB7ICdiYXNlJzogJ20nLCAnbGV0dGVycyc6IC9bXFx1MDA2RFxcdTI0RENcXHVGRjREXFx1MUUzRlxcdTFFNDFcXHUxRTQzXFx1MDI3MVxcdTAyNkZdL2cgfSwgeyAnYmFzZSc6ICduJywgJ2xldHRlcnMnOiAvW1xcdTAwNkVcXHUyNEREXFx1RkY0RVxcdTAxRjlcXHUwMTQ0XFx1MDBGMVxcdTFFNDVcXHUwMTQ4XFx1MUU0N1xcdTAxNDZcXHUxRTRCXFx1MUU0OVxcdTAxOUVcXHUwMjcyXFx1MDE0OVxcdUE3OTFcXHVBN0E1XS9nIH0sIHsgJ2Jhc2UnOiAnbmonLCAnbGV0dGVycyc6IC9bXFx1MDFDQ10vZyB9LCB7ICdiYXNlJzogJ28nLCAnbGV0dGVycyc6IC9bXFx1MDA2RlxcdTI0REVcXHVGRjRGXFx1MDBGMlxcdTAwRjNcXHUwMEY0XFx1MUVEM1xcdTFFRDFcXHUxRUQ3XFx1MUVENVxcdTAwRjVcXHUxRTREXFx1MDIyRFxcdTFFNEZcXHUwMTREXFx1MUU1MVxcdTFFNTNcXHUwMTRGXFx1MDIyRlxcdTAyMzFcXHUwMEY2XFx1MDIyQlxcdTFFQ0ZcXHUwMTUxXFx1MDFEMlxcdTAyMERcXHUwMjBGXFx1MDFBMVxcdTFFRERcXHUxRURCXFx1MUVFMVxcdTFFREZcXHUxRUUzXFx1MUVDRFxcdTFFRDlcXHUwMUVCXFx1MDFFRFxcdTAwRjhcXHUwMUZGXFx1MDI1NFxcdUE3NEJcXHVBNzREXFx1MDI3NV0vZyB9LCB7ICdiYXNlJzogJ29pJywgJ2xldHRlcnMnOiAvW1xcdTAxQTNdL2cgfSwgeyAnYmFzZSc6ICdvdScsICdsZXR0ZXJzJzogL1tcXHUwMjIzXS9nIH0sIHsgJ2Jhc2UnOiAnb28nLCAnbGV0dGVycyc6IC9bXFx1QTc0Rl0vZyB9LCB7ICdiYXNlJzogJ3AnLCAnbGV0dGVycyc6IC9bXFx1MDA3MFxcdTI0REZcXHVGRjUwXFx1MUU1NVxcdTFFNTdcXHUwMUE1XFx1MUQ3RFxcdUE3NTFcXHVBNzUzXFx1QTc1NV0vZyB9LCB7ICdiYXNlJzogJ3EnLCAnbGV0dGVycyc6IC9bXFx1MDA3MVxcdTI0RTBcXHVGRjUxXFx1MDI0QlxcdUE3NTdcXHVBNzU5XS9nIH0sIHsgJ2Jhc2UnOiAncicsICdsZXR0ZXJzJzogL1tcXHUwMDcyXFx1MjRFMVxcdUZGNTJcXHUwMTU1XFx1MUU1OVxcdTAxNTlcXHUwMjExXFx1MDIxM1xcdTFFNUJcXHUxRTVEXFx1MDE1N1xcdTFFNUZcXHUwMjREXFx1MDI3RFxcdUE3NUJcXHVBN0E3XFx1QTc4M10vZyB9LCB7ICdiYXNlJzogJ3MnLCAnbGV0dGVycyc6IC9bXFx1MDA3M1xcdTI0RTJcXHVGRjUzXFx1MDBERlxcdTAxNUJcXHUxRTY1XFx1MDE1RFxcdTFFNjFcXHUwMTYxXFx1MUU2N1xcdTFFNjNcXHUxRTY5XFx1MDIxOVxcdTAxNUZcXHUwMjNGXFx1QTdBOVxcdUE3ODVcXHUxRTlCXS9nIH0sIHsgJ2Jhc2UnOiAndCcsICdsZXR0ZXJzJzogL1tcXHUwMDc0XFx1MjRFM1xcdUZGNTRcXHUxRTZCXFx1MUU5N1xcdTAxNjVcXHUxRTZEXFx1MDIxQlxcdTAxNjNcXHUxRTcxXFx1MUU2RlxcdTAxNjdcXHUwMUFEXFx1MDI4OFxcdTJDNjZcXHVBNzg3XS9nIH0sIHsgJ2Jhc2UnOiAndHonLCAnbGV0dGVycyc6IC9bXFx1QTcyOV0vZyB9LCB7ICdiYXNlJzogJ3UnLCAnbGV0dGVycyc6IC9bXFx1MDA3NVxcdTI0RTRcXHVGRjU1XFx1MDBGOVxcdTAwRkFcXHUwMEZCXFx1MDE2OVxcdTFFNzlcXHUwMTZCXFx1MUU3QlxcdTAxNkRcXHUwMEZDXFx1MDFEQ1xcdTAxRDhcXHUwMUQ2XFx1MDFEQVxcdTFFRTdcXHUwMTZGXFx1MDE3MVxcdTAxRDRcXHUwMjE1XFx1MDIxN1xcdTAxQjBcXHUxRUVCXFx1MUVFOVxcdTFFRUZcXHUxRUVEXFx1MUVGMVxcdTFFRTVcXHUxRTczXFx1MDE3M1xcdTFFNzdcXHUxRTc1XFx1MDI4OV0vZyB9LCB7ICdiYXNlJzogJ3YnLCAnbGV0dGVycyc6IC9bXFx1MDA3NlxcdTI0RTVcXHVGRjU2XFx1MUU3RFxcdTFFN0ZcXHUwMjhCXFx1QTc1RlxcdTAyOENdL2cgfSwgeyAnYmFzZSc6ICd2eScsICdsZXR0ZXJzJzogL1tcXHVBNzYxXS9nIH0sIHsgJ2Jhc2UnOiAndycsICdsZXR0ZXJzJzogL1tcXHUwMDc3XFx1MjRFNlxcdUZGNTdcXHUxRTgxXFx1MUU4M1xcdTAxNzVcXHUxRTg3XFx1MUU4NVxcdTFFOThcXHUxRTg5XFx1MkM3M10vZyB9LCB7ICdiYXNlJzogJ3gnLCAnbGV0dGVycyc6IC9bXFx1MDA3OFxcdTI0RTdcXHVGRjU4XFx1MUU4QlxcdTFFOERdL2cgfSwgeyAnYmFzZSc6ICd5JywgJ2xldHRlcnMnOiAvW1xcdTAwNzlcXHUyNEU4XFx1RkY1OVxcdTFFRjNcXHUwMEZEXFx1MDE3N1xcdTFFRjlcXHUwMjMzXFx1MUU4RlxcdTAwRkZcXHUxRUY3XFx1MUU5OVxcdTFFRjVcXHUwMUI0XFx1MDI0RlxcdTFFRkZdL2cgfSwgeyAnYmFzZSc6ICd6JywgJ2xldHRlcnMnOiAvW1xcdTAwN0FcXHUyNEU5XFx1RkY1QVxcdTAxN0FcXHUxRTkxXFx1MDE3Q1xcdTAxN0VcXHUxRTkzXFx1MUU5NVxcdTAxQjZcXHUwMjI1XFx1MDI0MFxcdTJDNkNcXHVBNzYzXS9nIH1dO1xuXG52YXIgc3RyaXBEaWFjcml0aWNzID0gZnVuY3Rpb24gc3RyaXBEaWFjcml0aWNzKHN0cikge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IG1hcC5sZW5ndGg7IGkrKykge1xuXHRcdHN0ciA9IHN0ci5yZXBsYWNlKG1hcFtpXS5sZXR0ZXJzLCBtYXBbaV0uYmFzZSk7XG5cdH1cblx0cmV0dXJuIHN0cjtcbn07XG5cbnZhciB0cmltID0gZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59O1xuXG52YXIgaXNWYWxpZCA9IGZ1bmN0aW9uIGlzVmFsaWQodmFsdWUpIHtcblx0cmV0dXJuIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09ICcnO1xufTtcblxudmFyIGZpbHRlck9wdGlvbnMgPSBmdW5jdGlvbiBmaWx0ZXJPcHRpb25zKG9wdGlvbnMsIGZpbHRlclZhbHVlLCBleGNsdWRlT3B0aW9ucywgcHJvcHMpIHtcblx0aWYgKHByb3BzLmlnbm9yZUFjY2VudHMpIHtcblx0XHRmaWx0ZXJWYWx1ZSA9IHN0cmlwRGlhY3JpdGljcyhmaWx0ZXJWYWx1ZSk7XG5cdH1cblxuXHRpZiAocHJvcHMuaWdub3JlQ2FzZSkge1xuXHRcdGZpbHRlclZhbHVlID0gZmlsdGVyVmFsdWUudG9Mb3dlckNhc2UoKTtcblx0fVxuXG5cdGlmIChwcm9wcy50cmltRmlsdGVyKSB7XG5cdFx0ZmlsdGVyVmFsdWUgPSB0cmltKGZpbHRlclZhbHVlKTtcblx0fVxuXG5cdGlmIChleGNsdWRlT3B0aW9ucykgZXhjbHVkZU9wdGlvbnMgPSBleGNsdWRlT3B0aW9ucy5tYXAoZnVuY3Rpb24gKGkpIHtcblx0XHRyZXR1cm4gaVtwcm9wcy52YWx1ZUtleV07XG5cdH0pO1xuXG5cdHJldHVybiBvcHRpb25zLmZpbHRlcihmdW5jdGlvbiAob3B0aW9uKSB7XG5cdFx0aWYgKGV4Y2x1ZGVPcHRpb25zICYmIGV4Y2x1ZGVPcHRpb25zLmluZGV4T2Yob3B0aW9uW3Byb3BzLnZhbHVlS2V5XSkgPiAtMSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmIChwcm9wcy5maWx0ZXJPcHRpb24pIHJldHVybiBwcm9wcy5maWx0ZXJPcHRpb24uY2FsbCh1bmRlZmluZWQsIG9wdGlvbiwgZmlsdGVyVmFsdWUpO1xuXHRcdGlmICghZmlsdGVyVmFsdWUpIHJldHVybiB0cnVlO1xuXG5cdFx0dmFyIHZhbHVlID0gb3B0aW9uW3Byb3BzLnZhbHVlS2V5XTtcblx0XHR2YXIgbGFiZWwgPSBvcHRpb25bcHJvcHMubGFiZWxLZXldO1xuXHRcdHZhciBoYXNWYWx1ZSA9IGlzVmFsaWQodmFsdWUpO1xuXHRcdHZhciBoYXNMYWJlbCA9IGlzVmFsaWQobGFiZWwpO1xuXG5cdFx0aWYgKCFoYXNWYWx1ZSAmJiAhaGFzTGFiZWwpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR2YXIgdmFsdWVUZXN0ID0gaGFzVmFsdWUgPyBTdHJpbmcodmFsdWUpIDogbnVsbDtcblx0XHR2YXIgbGFiZWxUZXN0ID0gaGFzTGFiZWwgPyBTdHJpbmcobGFiZWwpIDogbnVsbDtcblxuXHRcdGlmIChwcm9wcy5pZ25vcmVBY2NlbnRzKSB7XG5cdFx0XHRpZiAodmFsdWVUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJykgdmFsdWVUZXN0ID0gc3RyaXBEaWFjcml0aWNzKHZhbHVlVGVzdCk7XG5cdFx0XHRpZiAobGFiZWxUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJykgbGFiZWxUZXN0ID0gc3RyaXBEaWFjcml0aWNzKGxhYmVsVGVzdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHByb3BzLmlnbm9yZUNhc2UpIHtcblx0XHRcdGlmICh2YWx1ZVRlc3QgJiYgcHJvcHMubWF0Y2hQcm9wICE9PSAnbGFiZWwnKSB2YWx1ZVRlc3QgPSB2YWx1ZVRlc3QudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmIChsYWJlbFRlc3QgJiYgcHJvcHMubWF0Y2hQcm9wICE9PSAndmFsdWUnKSBsYWJlbFRlc3QgPSBsYWJlbFRlc3QudG9Mb3dlckNhc2UoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcHJvcHMubWF0Y2hQb3MgPT09ICdzdGFydCcgPyB2YWx1ZVRlc3QgJiYgcHJvcHMubWF0Y2hQcm9wICE9PSAnbGFiZWwnICYmIHZhbHVlVGVzdC5zdWJzdHIoMCwgZmlsdGVyVmFsdWUubGVuZ3RoKSA9PT0gZmlsdGVyVmFsdWUgfHwgbGFiZWxUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ3ZhbHVlJyAmJiBsYWJlbFRlc3Quc3Vic3RyKDAsIGZpbHRlclZhbHVlLmxlbmd0aCkgPT09IGZpbHRlclZhbHVlIDogdmFsdWVUZXN0ICYmIHByb3BzLm1hdGNoUHJvcCAhPT0gJ2xhYmVsJyAmJiB2YWx1ZVRlc3QuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgPj0gMCB8fCBsYWJlbFRlc3QgJiYgcHJvcHMubWF0Y2hQcm9wICE9PSAndmFsdWUnICYmIGxhYmVsVGVzdC5pbmRleE9mKGZpbHRlclZhbHVlKSA+PSAwO1xuXHR9KTtcbn07XG5cbnZhciBtZW51UmVuZGVyZXIgPSBmdW5jdGlvbiBtZW51UmVuZGVyZXIoX3JlZikge1xuXHR2YXIgZm9jdXNlZE9wdGlvbiA9IF9yZWYuZm9jdXNlZE9wdGlvbixcblx0ICAgIGZvY3VzT3B0aW9uID0gX3JlZi5mb2N1c09wdGlvbixcblx0ICAgIGlucHV0VmFsdWUgPSBfcmVmLmlucHV0VmFsdWUsXG5cdCAgICBpbnN0YW5jZVByZWZpeCA9IF9yZWYuaW5zdGFuY2VQcmVmaXgsXG5cdCAgICBvbkZvY3VzID0gX3JlZi5vbkZvY3VzLFxuXHQgICAgb25PcHRpb25SZWYgPSBfcmVmLm9uT3B0aW9uUmVmLFxuXHQgICAgb25TZWxlY3QgPSBfcmVmLm9uU2VsZWN0LFxuXHQgICAgb3B0aW9uQ2xhc3NOYW1lID0gX3JlZi5vcHRpb25DbGFzc05hbWUsXG5cdCAgICBvcHRpb25Db21wb25lbnQgPSBfcmVmLm9wdGlvbkNvbXBvbmVudCxcblx0ICAgIG9wdGlvblJlbmRlcmVyID0gX3JlZi5vcHRpb25SZW5kZXJlcixcblx0ICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG5cdCAgICByZW1vdmVWYWx1ZSA9IF9yZWYucmVtb3ZlVmFsdWUsXG5cdCAgICBzZWxlY3RWYWx1ZSA9IF9yZWYuc2VsZWN0VmFsdWUsXG5cdCAgICB2YWx1ZUFycmF5ID0gX3JlZi52YWx1ZUFycmF5LFxuXHQgICAgdmFsdWVLZXkgPSBfcmVmLnZhbHVlS2V5O1xuXG5cdHZhciBPcHRpb24gPSBvcHRpb25Db21wb25lbnQ7XG5cblx0cmV0dXJuIG9wdGlvbnMubWFwKGZ1bmN0aW9uIChvcHRpb24sIGkpIHtcblx0XHR2YXIgaXNTZWxlY3RlZCA9IHZhbHVlQXJyYXkgJiYgdmFsdWVBcnJheS5zb21lKGZ1bmN0aW9uICh4KSB7XG5cdFx0XHRyZXR1cm4geFt2YWx1ZUtleV0gPT09IG9wdGlvblt2YWx1ZUtleV07XG5cdFx0fSk7XG5cdFx0dmFyIGlzRm9jdXNlZCA9IG9wdGlvbiA9PT0gZm9jdXNlZE9wdGlvbjtcblx0XHR2YXIgb3B0aW9uQ2xhc3MgPSBjbGFzc05hbWVzKG9wdGlvbkNsYXNzTmFtZSwge1xuXHRcdFx0J1NlbGVjdC1vcHRpb24nOiB0cnVlLFxuXHRcdFx0J2lzLXNlbGVjdGVkJzogaXNTZWxlY3RlZCxcblx0XHRcdCdpcy1mb2N1c2VkJzogaXNGb2N1c2VkLFxuXHRcdFx0J2lzLWRpc2FibGVkJzogb3B0aW9uLmRpc2FibGVkXG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdE9wdGlvbixcblx0XHRcdHtcblx0XHRcdFx0Y2xhc3NOYW1lOiBvcHRpb25DbGFzcyxcblx0XHRcdFx0Zm9jdXNPcHRpb246IGZvY3VzT3B0aW9uLFxuXHRcdFx0XHRpbnB1dFZhbHVlOiBpbnB1dFZhbHVlLFxuXHRcdFx0XHRpbnN0YW5jZVByZWZpeDogaW5zdGFuY2VQcmVmaXgsXG5cdFx0XHRcdGlzRGlzYWJsZWQ6IG9wdGlvbi5kaXNhYmxlZCxcblx0XHRcdFx0aXNGb2N1c2VkOiBpc0ZvY3VzZWQsXG5cdFx0XHRcdGlzU2VsZWN0ZWQ6IGlzU2VsZWN0ZWQsXG5cdFx0XHRcdGtleTogJ29wdGlvbi0nICsgaSArICctJyArIG9wdGlvblt2YWx1ZUtleV0sXG5cdFx0XHRcdG9uRm9jdXM6IG9uRm9jdXMsXG5cdFx0XHRcdG9uU2VsZWN0OiBvblNlbGVjdCxcblx0XHRcdFx0b3B0aW9uOiBvcHRpb24sXG5cdFx0XHRcdG9wdGlvbkluZGV4OiBpLFxuXHRcdFx0XHRyZWY6IGZ1bmN0aW9uIHJlZihfcmVmMikge1xuXHRcdFx0XHRcdG9uT3B0aW9uUmVmKF9yZWYyLCBpc0ZvY3VzZWQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRyZW1vdmVWYWx1ZTogcmVtb3ZlVmFsdWUsXG5cdFx0XHRcdHNlbGVjdFZhbHVlOiBzZWxlY3RWYWx1ZVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvblJlbmRlcmVyKG9wdGlvbiwgaSwgaW5wdXRWYWx1ZSlcblx0XHQpO1xuXHR9KTtcbn07XG5cbm1lbnVSZW5kZXJlci5wcm9wVHlwZXMgPSB7XG5cdGZvY3VzT3B0aW9uOiBQcm9wVHlwZXMuZnVuYyxcblx0Zm9jdXNlZE9wdGlvbjogUHJvcFR5cGVzLm9iamVjdCxcblx0aW5wdXRWYWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcblx0aW5zdGFuY2VQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcsXG5cdG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLFxuXHRvbk9wdGlvblJlZjogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcblx0b3B0aW9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRvcHRpb25Db21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxuXHRvcHRpb25SZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG5cdG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheSxcblx0cmVtb3ZlVmFsdWU6IFByb3BUeXBlcy5mdW5jLFxuXHRzZWxlY3RWYWx1ZTogUHJvcFR5cGVzLmZ1bmMsXG5cdHZhbHVlQXJyYXk6IFByb3BUeXBlcy5hcnJheSxcblx0dmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmdcbn07XG5cbnZhciBibG9ja0V2ZW50ID0gKGZ1bmN0aW9uIChldmVudCkge1xuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0aWYgKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnQScgfHwgISgnaHJlZicgaW4gZXZlbnQudGFyZ2V0KSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoZXZlbnQudGFyZ2V0LnRhcmdldCkge1xuXHRcdHdpbmRvdy5vcGVuKGV2ZW50LnRhcmdldC5ocmVmLCBldmVudC50YXJnZXQudGFyZ2V0KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IGV2ZW50LnRhcmdldC5ocmVmO1xuXHR9XG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmo7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cblxuXG5cblxudmFyIGFzeW5jR2VuZXJhdG9yID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBd2FpdFZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gQXN5bmNHZW5lcmF0b3IoZ2VuKSB7XG4gICAgdmFyIGZyb250LCBiYWNrO1xuXG4gICAgZnVuY3Rpb24gc2VuZChrZXksIGFyZykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgYXJnOiBhcmcsXG4gICAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgICAgICByZWplY3Q6IHJlamVjdCxcbiAgICAgICAgICBuZXh0OiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGJhY2spIHtcbiAgICAgICAgICBiYWNrID0gYmFjay5uZXh0ID0gcmVxdWVzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmcm9udCA9IGJhY2sgPSByZXF1ZXN0O1xuICAgICAgICAgIHJlc3VtZShrZXksIGFyZyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc3VtZShrZXksIGFyZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGdlbltrZXldKGFyZyk7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBd2FpdFZhbHVlKSB7XG4gICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlLnZhbHVlKS50aGVuKGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIHJlc3VtZShcIm5leHRcIiwgYXJnKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgICAgICByZXN1bWUoXCJ0aHJvd1wiLCBhcmcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldHRsZShyZXN1bHQuZG9uZSA/IFwicmV0dXJuXCIgOiBcIm5vcm1hbFwiLCByZXN1bHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgc2V0dGxlKFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXR0bGUodHlwZSwgdmFsdWUpIHtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwicmV0dXJuXCI6XG4gICAgICAgICAgZnJvbnQucmVzb2x2ZSh7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBkb25lOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInRocm93XCI6XG4gICAgICAgICAgZnJvbnQucmVqZWN0KHZhbHVlKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGZyb250LnJlc29sdmUoe1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZG9uZTogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgZnJvbnQgPSBmcm9udC5uZXh0O1xuXG4gICAgICBpZiAoZnJvbnQpIHtcbiAgICAgICAgcmVzdW1lKGZyb250LmtleSwgZnJvbnQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJhY2sgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2ludm9rZSA9IHNlbmQ7XG5cbiAgICBpZiAodHlwZW9mIGdlbi5yZXR1cm4gIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdGhpcy5yZXR1cm4gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuYXN5bmNJdGVyYXRvcikge1xuICAgIEFzeW5jR2VuZXJhdG9yLnByb3RvdHlwZVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICB9XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcIm5leHRcIiwgYXJnKTtcbiAgfTtcblxuICBBc3luY0dlbmVyYXRvci5wcm90b3R5cGUudGhyb3cgPSBmdW5jdGlvbiAoYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcInRocm93XCIsIGFyZyk7XG4gIH07XG5cbiAgQXN5bmNHZW5lcmF0b3IucHJvdG90eXBlLnJldHVybiA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKFwicmV0dXJuXCIsIGFyZyk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICB3cmFwOiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXN5bmNHZW5lcmF0b3IoZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgYXdhaXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBBd2FpdFZhbHVlKHZhbHVlKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuXG5cblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG5cblxuXG52YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxudmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuXG5cblxuXG5cblxuXG5cbnZhciBvYmplY3RXaXRob3V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTtcbiAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4gPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbnZhciBPcHRpb24gPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuXHRpbmhlcml0cyhPcHRpb24sIF9SZWFjdCRDb21wb25lbnQpO1xuXG5cdGZ1bmN0aW9uIE9wdGlvbihwcm9wcykge1xuXHRcdGNsYXNzQ2FsbENoZWNrKHRoaXMsIE9wdGlvbik7XG5cblx0XHR2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChPcHRpb24uX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihPcHRpb24pKS5jYWxsKHRoaXMsIHByb3BzKSk7XG5cblx0XHRfdGhpcy5oYW5kbGVNb3VzZURvd24gPSBfdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZChfdGhpcyk7XG5cdFx0X3RoaXMuaGFuZGxlTW91c2VFbnRlciA9IF90aGlzLmhhbmRsZU1vdXNlRW50ZXIuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMuaGFuZGxlTW91c2VNb3ZlID0gX3RoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLmhhbmRsZVRvdWNoU3RhcnQgPSBfdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLmhhbmRsZVRvdWNoRW5kID0gX3RoaXMuaGFuZGxlVG91Y2hFbmQuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMuaGFuZGxlVG91Y2hNb3ZlID0gX3RoaXMuaGFuZGxlVG91Y2hNb3ZlLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLm9uRm9jdXMgPSBfdGhpcy5vbkZvY3VzLmJpbmQoX3RoaXMpO1xuXHRcdHJldHVybiBfdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNsYXNzKE9wdGlvbiwgW3tcblx0XHRrZXk6ICdoYW5kbGVNb3VzZURvd24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdHRoaXMucHJvcHMub25TZWxlY3QodGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNb3VzZUVudGVyJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VFbnRlcihldmVudCkge1xuXHRcdFx0dGhpcy5vbkZvY3VzKGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNb3VzZU1vdmUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZU1vdmUoZXZlbnQpIHtcblx0XHRcdHRoaXMub25Gb2N1cyhldmVudCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlVG91Y2hFbmQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaEVuZChldmVudCkge1xuXHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZCwgSW4gdGhpcyBjYXNlXG5cdFx0XHQvLyB3ZSBkb24ndCB3YW50IHRvIGZpcmUgdGhlIGNsaWNrIGV2ZW50IChiZWNhdXNlIHRoZSB1c2VyIG9ubHkgd2FudHMgdG8gc2Nyb2xsKVxuXHRcdFx0aWYgKHRoaXMuZHJhZ2dpbmcpIHJldHVybjtcblxuXHRcdFx0dGhpcy5oYW5kbGVNb3VzZURvd24oZXZlbnQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZVRvdWNoTW92ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoTW92ZSgpIHtcblx0XHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXG5cdFx0XHR0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaFN0YXJ0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydCgpIHtcblx0XHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBub3QgYmVpbmcgZHJhZ2dlZFxuXHRcdFx0dGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ29uRm9jdXMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBvbkZvY3VzKGV2ZW50KSB7XG5cdFx0XHRpZiAoIXRoaXMucHJvcHMuaXNGb2N1c2VkKSB7XG5cdFx0XHRcdHRoaXMucHJvcHMub25Gb2N1cyh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuXHRcdFx0ICAgIG9wdGlvbiA9IF9wcm9wcy5vcHRpb24sXG5cdFx0XHQgICAgaW5zdGFuY2VQcmVmaXggPSBfcHJvcHMuaW5zdGFuY2VQcmVmaXgsXG5cdFx0XHQgICAgb3B0aW9uSW5kZXggPSBfcHJvcHMub3B0aW9uSW5kZXg7XG5cblx0XHRcdHZhciBjbGFzc05hbWUgPSBjbGFzc05hbWVzKHRoaXMucHJvcHMuY2xhc3NOYW1lLCBvcHRpb24uY2xhc3NOYW1lKTtcblxuXHRcdFx0cmV0dXJuIG9wdGlvbi5kaXNhYmxlZCA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHR7IGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuXHRcdFx0XHRcdG9uTW91c2VEb3duOiBibG9ja0V2ZW50LFxuXHRcdFx0XHRcdG9uQ2xpY2s6IGJsb2NrRXZlbnQgfSxcblx0XHRcdFx0dGhpcy5wcm9wcy5jaGlsZHJlblxuXHRcdFx0KSA6IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHR7IGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuXHRcdFx0XHRcdHN0eWxlOiBvcHRpb24uc3R5bGUsXG5cdFx0XHRcdFx0cm9sZTogJ29wdGlvbicsXG5cdFx0XHRcdFx0J2FyaWEtbGFiZWwnOiBvcHRpb24ubGFiZWwsXG5cdFx0XHRcdFx0b25Nb3VzZURvd246IHRoaXMuaGFuZGxlTW91c2VEb3duLFxuXHRcdFx0XHRcdG9uTW91c2VFbnRlcjogdGhpcy5oYW5kbGVNb3VzZUVudGVyLFxuXHRcdFx0XHRcdG9uTW91c2VNb3ZlOiB0aGlzLmhhbmRsZU1vdXNlTW92ZSxcblx0XHRcdFx0XHRvblRvdWNoU3RhcnQ6IHRoaXMuaGFuZGxlVG91Y2hTdGFydCxcblx0XHRcdFx0XHRvblRvdWNoTW92ZTogdGhpcy5oYW5kbGVUb3VjaE1vdmUsXG5cdFx0XHRcdFx0b25Ub3VjaEVuZDogdGhpcy5oYW5kbGVUb3VjaEVuZCxcblx0XHRcdFx0XHRpZDogaW5zdGFuY2VQcmVmaXggKyAnLW9wdGlvbi0nICsgb3B0aW9uSW5kZXgsXG5cdFx0XHRcdFx0dGl0bGU6IG9wdGlvbi50aXRsZSB9LFxuXHRcdFx0XHR0aGlzLnByb3BzLmNoaWxkcmVuXG5cdFx0XHQpO1xuXHRcdH1cblx0fV0pO1xuXHRyZXR1cm4gT3B0aW9uO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5PcHRpb24ucHJvcFR5cGVzID0ge1xuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG5cdGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZywgLy8gY2xhc3NOYW1lIChiYXNlZCBvbiBtb3VzZSBwb3NpdGlvbilcblx0aW5zdGFuY2VQcmVmaXg6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCwgLy8gdW5pcXVlIHByZWZpeCBmb3IgdGhlIGlkcyAodXNlZCBmb3IgYXJpYSlcblx0aXNEaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsIC8vIHRoZSBvcHRpb24gaXMgZGlzYWJsZWRcblx0aXNGb2N1c2VkOiBQcm9wVHlwZXMuYm9vbCwgLy8gdGhlIG9wdGlvbiBpcyBmb2N1c2VkXG5cdGlzU2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLCAvLyB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkXG5cdG9uRm9jdXM6IFByb3BUeXBlcy5mdW5jLCAvLyBtZXRob2QgdG8gaGFuZGxlIG1vdXNlRW50ZXIgb24gb3B0aW9uIGVsZW1lbnRcblx0b25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLCAvLyBtZXRob2QgdG8gaGFuZGxlIGNsaWNrIG9uIG9wdGlvbiBlbGVtZW50XG5cdG9uVW5mb2N1czogUHJvcFR5cGVzLmZ1bmMsIC8vIG1ldGhvZCB0byBoYW5kbGUgbW91c2VMZWF2ZSBvbiBvcHRpb24gZWxlbWVudFxuXHRvcHRpb246IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCwgLy8gb2JqZWN0IHRoYXQgaXMgYmFzZSBmb3IgdGhhdCBvcHRpb25cblx0b3B0aW9uSW5kZXg6IFByb3BUeXBlcy5udW1iZXIgLy8gaW5kZXggb2YgdGhlIG9wdGlvbiwgdXNlZCB0byBnZW5lcmF0ZSB1bmlxdWUgaWRzIGZvciBhcmlhXG59O1xuXG52YXIgVmFsdWUgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuXHRpbmhlcml0cyhWYWx1ZSwgX1JlYWN0JENvbXBvbmVudCk7XG5cblx0ZnVuY3Rpb24gVmFsdWUocHJvcHMpIHtcblx0XHRjbGFzc0NhbGxDaGVjayh0aGlzLCBWYWx1ZSk7XG5cblx0XHR2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChWYWx1ZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFZhbHVlKSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG5cdFx0X3RoaXMuaGFuZGxlTW91c2VEb3duID0gX3RoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLm9uUmVtb3ZlID0gX3RoaXMub25SZW1vdmUuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMuaGFuZGxlVG91Y2hFbmRSZW1vdmUgPSBfdGhpcy5oYW5kbGVUb3VjaEVuZFJlbW92ZS5iaW5kKF90aGlzKTtcblx0XHRfdGhpcy5oYW5kbGVUb3VjaE1vdmUgPSBfdGhpcy5oYW5kbGVUb3VjaE1vdmUuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMuaGFuZGxlVG91Y2hTdGFydCA9IF90aGlzLmhhbmRsZVRvdWNoU3RhcnQuYmluZChfdGhpcyk7XG5cdFx0cmV0dXJuIF90aGlzO1xuXHR9XG5cblx0Y3JlYXRlQ2xhc3MoVmFsdWUsIFt7XG5cdFx0a2V5OiAnaGFuZGxlTW91c2VEb3duJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duKGV2ZW50KSB7XG5cdFx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdHRoaXMucHJvcHMub25DbGljayh0aGlzLnByb3BzLnZhbHVlLCBldmVudCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLnZhbHVlLmhyZWYpIHtcblx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnb25SZW1vdmUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBvblJlbW92ZShldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0dGhpcy5wcm9wcy5vblJlbW92ZSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaEVuZFJlbW92ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kUmVtb3ZlKGV2ZW50KSB7XG5cdFx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXG5cdFx0XHRpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG5cdFx0XHQvLyBGaXJlIHRoZSBtb3VzZSBldmVudHNcblx0XHRcdHRoaXMub25SZW1vdmUoZXZlbnQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZVRvdWNoTW92ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoTW92ZSgpIHtcblx0XHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkXG5cdFx0XHR0aGlzLmRyYWdnaW5nID0gdHJ1ZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaFN0YXJ0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVG91Y2hTdGFydCgpIHtcblx0XHRcdC8vIFNldCBhIGZsYWcgdGhhdCB0aGUgdmlldyBpcyBub3QgYmVpbmcgZHJhZ2dlZFxuXHRcdFx0dGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlclJlbW92ZUljb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJSZW1vdmVJY29uKCkge1xuXHRcdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgIXRoaXMucHJvcHMub25SZW1vdmUpIHJldHVybjtcblx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnc3BhbicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiAnU2VsZWN0LXZhbHVlLWljb24nLFxuXHRcdFx0XHRcdCdhcmlhLWhpZGRlbic6ICd0cnVlJyxcblx0XHRcdFx0XHRvbk1vdXNlRG93bjogdGhpcy5vblJlbW92ZSxcblx0XHRcdFx0XHRvblRvdWNoRW5kOiB0aGlzLmhhbmRsZVRvdWNoRW5kUmVtb3ZlLFxuXHRcdFx0XHRcdG9uVG91Y2hTdGFydDogdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LFxuXHRcdFx0XHRcdG9uVG91Y2hNb3ZlOiB0aGlzLmhhbmRsZVRvdWNoTW92ZSB9LFxuXHRcdFx0XHQnXFx4RDcnXG5cdFx0XHQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlckxhYmVsJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyTGFiZWwoKSB7XG5cdFx0XHR2YXIgY2xhc3NOYW1lID0gJ1NlbGVjdC12YWx1ZS1sYWJlbCc7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5vbkNsaWNrIHx8IHRoaXMucHJvcHMudmFsdWUuaHJlZiA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdhJyxcblx0XHRcdFx0eyBjbGFzc05hbWU6IGNsYXNzTmFtZSwgaHJlZjogdGhpcy5wcm9wcy52YWx1ZS5ocmVmLCB0YXJnZXQ6IHRoaXMucHJvcHMudmFsdWUudGFyZ2V0LCBvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVNb3VzZURvd24sIG9uVG91Y2hFbmQ6IHRoaXMuaGFuZGxlTW91c2VEb3duIH0sXG5cdFx0XHRcdHRoaXMucHJvcHMuY2hpbGRyZW5cblx0XHRcdCkgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnc3BhbicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiBjbGFzc05hbWUsIHJvbGU6ICdvcHRpb24nLCAnYXJpYS1zZWxlY3RlZCc6ICd0cnVlJywgaWQ6IHRoaXMucHJvcHMuaWQgfSxcblx0XHRcdFx0dGhpcy5wcm9wcy5jaGlsZHJlblxuXHRcdFx0KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiBjbGFzc05hbWVzKCdTZWxlY3QtdmFsdWUnLCB0aGlzLnByb3BzLnZhbHVlLmNsYXNzTmFtZSksXG5cdFx0XHRcdFx0c3R5bGU6IHRoaXMucHJvcHMudmFsdWUuc3R5bGUsXG5cdFx0XHRcdFx0dGl0bGU6IHRoaXMucHJvcHMudmFsdWUudGl0bGVcblx0XHRcdFx0fSxcblx0XHRcdFx0dGhpcy5yZW5kZXJSZW1vdmVJY29uKCksXG5cdFx0XHRcdHRoaXMucmVuZGVyTGFiZWwoKVxuXHRcdFx0KTtcblx0XHR9XG5cdH1dKTtcblx0cmV0dXJuIFZhbHVlO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5WYWx1ZS5wcm9wVHlwZXMgPSB7XG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcblx0ZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLCAvLyBkaXNhYmxlZCBwcm9wIHBhc3NlZCB0byBSZWFjdFNlbGVjdFxuXHRpZDogUHJvcFR5cGVzLnN0cmluZywgLy8gVW5pcXVlIGlkIGZvciB0aGUgdmFsdWUgLSB1c2VkIGZvciBhcmlhXG5cdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLCAvLyBtZXRob2QgdG8gaGFuZGxlIGNsaWNrIG9uIHZhbHVlIGxhYmVsXG5cdG9uUmVtb3ZlOiBQcm9wVHlwZXMuZnVuYywgLy8gbWV0aG9kIHRvIGhhbmRsZSByZW1vdmFsIG9mIHRoZSB2YWx1ZVxuXHR2YWx1ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkIC8vIHRoZSBvcHRpb24gb2JqZWN0IGZvciB0aGlzIHZhbHVlXG59O1xuXG4vKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE4IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL3JlYWN0LXNlbGVjdFxuKi9cbnZhciBzdHJpbmdpZnlWYWx1ZSA9IGZ1bmN0aW9uIHN0cmluZ2lmeVZhbHVlKHZhbHVlKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiB2YWx1ZSAhPT0gbnVsbCAmJiBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgfHwgJyc7XG59O1xuXG52YXIgc3RyaW5nT3JOb2RlID0gUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKTtcbnZhciBzdHJpbmdPck51bWJlciA9IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKTtcblxudmFyIGluc3RhbmNlSWQgPSAxO1xuXG52YXIgc2hvdWxkU2hvd1ZhbHVlID0gZnVuY3Rpb24gc2hvdWxkU2hvd1ZhbHVlKHN0YXRlLCBwcm9wcykge1xuXHR2YXIgaW5wdXRWYWx1ZSA9IHN0YXRlLmlucHV0VmFsdWUsXG5cdCAgICBpc1BzZXVkb0ZvY3VzZWQgPSBzdGF0ZS5pc1BzZXVkb0ZvY3VzZWQsXG5cdCAgICBpc0ZvY3VzZWQgPSBzdGF0ZS5pc0ZvY3VzZWQ7XG5cdHZhciBvblNlbGVjdFJlc2V0c0lucHV0ID0gcHJvcHMub25TZWxlY3RSZXNldHNJbnB1dDtcblxuXG5cdGlmICghaW5wdXRWYWx1ZSkgcmV0dXJuIHRydWU7XG5cblx0aWYgKCFvblNlbGVjdFJlc2V0c0lucHV0KSB7XG5cdFx0cmV0dXJuICEoIWlzRm9jdXNlZCAmJiBpc1BzZXVkb0ZvY3VzZWQgfHwgaXNGb2N1c2VkICYmICFpc1BzZXVkb0ZvY3VzZWQpO1xuXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufTtcblxudmFyIHNob3VsZFNob3dQbGFjZWhvbGRlciA9IGZ1bmN0aW9uIHNob3VsZFNob3dQbGFjZWhvbGRlcihzdGF0ZSwgcHJvcHMsIGlzT3Blbikge1xuXHR2YXIgaW5wdXRWYWx1ZSA9IHN0YXRlLmlucHV0VmFsdWUsXG5cdCAgICBpc1BzZXVkb0ZvY3VzZWQgPSBzdGF0ZS5pc1BzZXVkb0ZvY3VzZWQsXG5cdCAgICBpc0ZvY3VzZWQgPSBzdGF0ZS5pc0ZvY3VzZWQ7XG5cdHZhciBvblNlbGVjdFJlc2V0c0lucHV0ID0gcHJvcHMub25TZWxlY3RSZXNldHNJbnB1dDtcblxuXG5cdHJldHVybiAhaW5wdXRWYWx1ZSB8fCAhb25TZWxlY3RSZXNldHNJbnB1dCAmJiAhaXNPcGVuICYmICFpc1BzZXVkb0ZvY3VzZWQgJiYgIWlzRm9jdXNlZDtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgYSB2YWx1ZSBmcm9tIHRoZSBnaXZlbiBvcHRpb25zIGFuZCB2YWx1ZUtleVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEFycmF5fSB2YWx1ZVx0LSB0aGUgc2VsZWN0ZWQgdmFsdWUocylcbiAqIEBwYXJhbSB7T2JqZWN0fVx0XHQgcHJvcHNcdC0gdGhlIFNlbGVjdCBjb21wb25lbnQncyBwcm9wcyAob3IgbmV4dFByb3BzKVxuICovXG52YXIgZXhwYW5kVmFsdWUgPSBmdW5jdGlvbiBleHBhbmRWYWx1ZSh2YWx1ZSwgcHJvcHMpIHtcblx0dmFyIHZhbHVlVHlwZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpO1xuXHRpZiAodmFsdWVUeXBlICE9PSAnc3RyaW5nJyAmJiB2YWx1ZVR5cGUgIT09ICdudW1iZXInICYmIHZhbHVlVHlwZSAhPT0gJ2Jvb2xlYW4nKSByZXR1cm4gdmFsdWU7XG5cdHZhciBvcHRpb25zID0gcHJvcHMub3B0aW9ucyxcblx0ICAgIHZhbHVlS2V5ID0gcHJvcHMudmFsdWVLZXk7XG5cblx0aWYgKCFvcHRpb25zKSByZXR1cm47XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdGlmIChTdHJpbmcob3B0aW9uc1tpXVt2YWx1ZUtleV0pID09PSBTdHJpbmcodmFsdWUpKSByZXR1cm4gb3B0aW9uc1tpXTtcblx0fVxufTtcblxudmFyIGhhbmRsZVJlcXVpcmVkID0gZnVuY3Rpb24gaGFuZGxlUmVxdWlyZWQodmFsdWUsIG11bHRpKSB7XG5cdGlmICghdmFsdWUpIHJldHVybiB0cnVlO1xuXHRyZXR1cm4gbXVsdGkgPyB2YWx1ZS5sZW5ndGggPT09IDAgOiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID09PSAwO1xufTtcblxudmFyIFNlbGVjdCQxID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcblx0aW5oZXJpdHMoU2VsZWN0LCBfUmVhY3QkQ29tcG9uZW50KTtcblxuXHRmdW5jdGlvbiBTZWxlY3QocHJvcHMpIHtcblx0XHRjbGFzc0NhbGxDaGVjayh0aGlzLCBTZWxlY3QpO1xuXG5cdFx0dmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoU2VsZWN0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU2VsZWN0KSkuY2FsbCh0aGlzLCBwcm9wcykpO1xuXG5cdFx0WydjbGVhclZhbHVlJywgJ2ZvY3VzT3B0aW9uJywgJ2dldE9wdGlvbkxhYmVsJywgJ2hhbmRsZUlucHV0Qmx1cicsICdoYW5kbGVJbnB1dENoYW5nZScsICdoYW5kbGVJbnB1dEZvY3VzJywgJ2hhbmRsZUlucHV0VmFsdWVDaGFuZ2UnLCAnaGFuZGxlS2V5RG93bicsICdoYW5kbGVNZW51U2Nyb2xsJywgJ2hhbmRsZU1vdXNlRG93bicsICdoYW5kbGVNb3VzZURvd25PbkFycm93JywgJ2hhbmRsZU1vdXNlRG93bk9uTWVudScsICdoYW5kbGVUb3VjaEVuZCcsICdoYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUnLCAnaGFuZGxlVG91Y2hNb3ZlJywgJ2hhbmRsZVRvdWNoT3V0c2lkZScsICdoYW5kbGVUb3VjaFN0YXJ0JywgJ2hhbmRsZVZhbHVlQ2xpY2snLCAnb25PcHRpb25SZWYnLCAncmVtb3ZlVmFsdWUnLCAnc2VsZWN0VmFsdWUnXS5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuXHRcdFx0cmV0dXJuIF90aGlzW2ZuXSA9IF90aGlzW2ZuXS5iaW5kKF90aGlzKTtcblx0XHR9KTtcblxuXHRcdF90aGlzLnN0YXRlID0ge1xuXHRcdFx0aW5wdXRWYWx1ZTogJycsXG5cdFx0XHRpc0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRyZXF1aXJlZDogZmFsc2Vcblx0XHR9O1xuXHRcdHJldHVybiBfdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNsYXNzKFNlbGVjdCwgW3tcblx0XHRrZXk6ICdjb21wb25lbnRXaWxsTW91bnQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cdFx0XHR0aGlzLl9pbnN0YW5jZVByZWZpeCA9ICdyZWFjdC1zZWxlY3QtJyArICh0aGlzLnByb3BzLmluc3RhbmNlSWQgfHwgKytpbnN0YW5jZUlkKSArICctJztcblx0XHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5yZXF1aXJlZCkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRyZXF1aXJlZDogaGFuZGxlUmVxdWlyZWQodmFsdWVBcnJheVswXSwgdGhpcy5wcm9wcy5tdWx0aSlcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRcdGlmICh0eXBlb2YgdGhpcy5wcm9wcy5hdXRvZm9jdXMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oJ1dhcm5pbmc6IFRoZSBhdXRvZm9jdXMgcHJvcCBoYXMgY2hhbmdlZCB0byBhdXRvRm9jdXMsIHN1cHBvcnQgd2lsbCBiZSByZW1vdmVkIGFmdGVyIHJlYWN0LXNlbGVjdEAxLjAnKTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLmF1dG9Gb2N1cyB8fCB0aGlzLnByb3BzLmF1dG9mb2N1cykge1xuXHRcdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG5cdFx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheShuZXh0UHJvcHMudmFsdWUsIG5leHRQcm9wcyk7XG5cblx0XHRcdGlmIChuZXh0UHJvcHMucmVxdWlyZWQpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0cmVxdWlyZWQ6IGhhbmRsZVJlcXVpcmVkKHZhbHVlQXJyYXlbMF0sIG5leHRQcm9wcy5tdWx0aSlcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMucmVxdWlyZWQpIHtcblx0XHRcdFx0Ly8gVXNlZCB0byBiZSByZXF1aXJlZCBidXQgaXQncyBub3QgYW55IG1vcmVcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHJlcXVpcmVkOiBmYWxzZSB9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAmJiB0aGlzLnByb3BzLnZhbHVlICE9PSBuZXh0UHJvcHMudmFsdWUgJiYgbmV4dFByb3BzLm9uU2VsZWN0UmVzZXRzSW5wdXQpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGlucHV0VmFsdWU6IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZSgnJykgfSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY29tcG9uZW50RGlkVXBkYXRlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG5cdFx0XHQvLyBmb2N1cyB0byB0aGUgc2VsZWN0ZWQgb3B0aW9uXG5cdFx0XHRpZiAodGhpcy5tZW51ICYmIHRoaXMuZm9jdXNlZCAmJiB0aGlzLnN0YXRlLmlzT3BlbiAmJiAhdGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uKSB7XG5cdFx0XHRcdHZhciBmb2N1c2VkT3B0aW9uTm9kZSA9IGZpbmRET01Ob2RlKHRoaXMuZm9jdXNlZCk7XG5cdFx0XHRcdHZhciBtZW51Tm9kZSA9IGZpbmRET01Ob2RlKHRoaXMubWVudSk7XG5cblx0XHRcdFx0dmFyIHNjcm9sbFRvcCA9IG1lbnVOb2RlLnNjcm9sbFRvcDtcblx0XHRcdFx0dmFyIHNjcm9sbEJvdHRvbSA9IHNjcm9sbFRvcCArIG1lbnVOb2RlLm9mZnNldEhlaWdodDtcblx0XHRcdFx0dmFyIG9wdGlvblRvcCA9IGZvY3VzZWRPcHRpb25Ob2RlLm9mZnNldFRvcDtcblx0XHRcdFx0dmFyIG9wdGlvbkJvdHRvbSA9IG9wdGlvblRvcCArIGZvY3VzZWRPcHRpb25Ob2RlLm9mZnNldEhlaWdodDtcblxuXHRcdFx0XHRpZiAoc2Nyb2xsVG9wID4gb3B0aW9uVG9wIHx8IHNjcm9sbEJvdHRvbSA8IG9wdGlvbkJvdHRvbSkge1xuXHRcdFx0XHRcdG1lbnVOb2RlLnNjcm9sbFRvcCA9IGZvY3VzZWRPcHRpb25Ob2RlLm9mZnNldFRvcDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFdlIHN0aWxsIHNldCBoYXNTY3JvbGxlZFRvT3B0aW9uIHRvIHRydWUgZXZlbiBpZiB3ZSBkaWRuJ3Rcblx0XHRcdFx0Ly8gYWN0dWFsbHkgbmVlZCB0byBzY3JvbGwsIGFzIHdlJ3ZlIHN0aWxsIGNvbmZpcm1lZCB0aGF0IHRoZVxuXHRcdFx0XHQvLyBvcHRpb24gaXMgaW4gdmlldy5cblx0XHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdHRoaXMuaGFzU2Nyb2xsZWRUb09wdGlvbiA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgJiYgdGhpcy5mb2N1c2VkICYmIHRoaXMubWVudSkge1xuXHRcdFx0XHR0aGlzLl9zY3JvbGxUb0ZvY3VzZWRPcHRpb25PblVwZGF0ZSA9IGZhbHNlO1xuXHRcdFx0XHR2YXIgZm9jdXNlZERPTSA9IGZpbmRET01Ob2RlKHRoaXMuZm9jdXNlZCk7XG5cdFx0XHRcdHZhciBtZW51RE9NID0gZmluZERPTU5vZGUodGhpcy5tZW51KTtcblx0XHRcdFx0dmFyIGZvY3VzZWRSZWN0ID0gZm9jdXNlZERPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0dmFyIG1lbnVSZWN0ID0gbWVudURPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0aWYgKGZvY3VzZWRSZWN0LmJvdHRvbSA+IG1lbnVSZWN0LmJvdHRvbSkge1xuXHRcdFx0XHRcdG1lbnVET00uc2Nyb2xsVG9wID0gZm9jdXNlZERPTS5vZmZzZXRUb3AgKyBmb2N1c2VkRE9NLmNsaWVudEhlaWdodCAtIG1lbnVET00ub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHR9IGVsc2UgaWYgKGZvY3VzZWRSZWN0LnRvcCA8IG1lbnVSZWN0LnRvcCkge1xuXHRcdFx0XHRcdG1lbnVET00uc2Nyb2xsVG9wID0gZm9jdXNlZERPTS5vZmZzZXRUb3A7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLnNjcm9sbE1lbnVJbnRvVmlldyAmJiB0aGlzLm1lbnVDb250YWluZXIpIHtcblx0XHRcdFx0dmFyIG1lbnVDb250YWluZXJSZWN0ID0gdGhpcy5tZW51Q29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRpZiAod2luZG93LmlubmVySGVpZ2h0IDwgbWVudUNvbnRhaW5lclJlY3QuYm90dG9tICsgdGhpcy5wcm9wcy5tZW51QnVmZmVyKSB7XG5cdFx0XHRcdFx0d2luZG93LnNjcm9sbEJ5KDAsIG1lbnVDb250YWluZXJSZWN0LmJvdHRvbSArIHRoaXMucHJvcHMubWVudUJ1ZmZlciAtIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChwcmV2UHJvcHMuZGlzYWJsZWQgIT09IHRoaXMucHJvcHMuZGlzYWJsZWQpIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IGlzRm9jdXNlZDogZmFsc2UgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcblx0XHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0XHRcdH1cblx0XHRcdGlmIChwcmV2U3RhdGUuaXNPcGVuICE9PSB0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0XHR0aGlzLnRvZ2dsZVRvdWNoT3V0c2lkZUV2ZW50KHRoaXMuc3RhdGUuaXNPcGVuKTtcblx0XHRcdFx0dmFyIGhhbmRsZXIgPSB0aGlzLnN0YXRlLmlzT3BlbiA/IHRoaXMucHJvcHMub25PcGVuIDogdGhpcy5wcm9wcy5vbkNsb3NlO1xuXHRcdFx0XHRoYW5kbGVyICYmIGhhbmRsZXIoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdFx0dGhpcy50b2dnbGVUb3VjaE91dHNpZGVFdmVudChmYWxzZSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAndG9nZ2xlVG91Y2hPdXRzaWRlRXZlbnQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiB0b2dnbGVUb3VjaE91dHNpZGVFdmVudChlbmFibGVkKSB7XG5cdFx0XHRpZiAoZW5hYmxlZCkge1xuXHRcdFx0XHRpZiAoIWRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgJiYgZG9jdW1lbnQuYXR0YWNoRXZlbnQpIHtcblx0XHRcdFx0XHRkb2N1bWVudC5hdHRhY2hFdmVudCgnb250b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVUb3VjaE91dHNpZGUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICghZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciAmJiBkb2N1bWVudC5kZXRhY2hFdmVudCkge1xuXHRcdFx0XHRcdGRvY3VtZW50LmRldGFjaEV2ZW50KCdvbnRvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZVRvdWNoT3V0c2lkZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hPdXRzaWRlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZVRvdWNoT3V0c2lkZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoT3V0c2lkZShldmVudCkge1xuXHRcdFx0Ly8gaGFuZGxlIHRvdWNoIG91dHNpZGUgb24gaW9zIHRvIGRpc21pc3MgbWVudVxuXHRcdFx0aWYgKHRoaXMud3JhcHBlciAmJiAhdGhpcy53cmFwcGVyLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcblx0XHRcdFx0dGhpcy5jbG9zZU1lbnUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1cycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzKCkge1xuXHRcdFx0aWYgKCF0aGlzLmlucHV0KSByZXR1cm47XG5cdFx0XHR0aGlzLmlucHV0LmZvY3VzKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnYmx1cklucHV0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gYmx1cklucHV0KCkge1xuXHRcdFx0aWYgKCF0aGlzLmlucHV0KSByZXR1cm47XG5cdFx0XHR0aGlzLmlucHV0LmJsdXIoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaE1vdmUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaE1vdmUoKSB7XG5cdFx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgYmVpbmcgZHJhZ2dlZFxuXHRcdFx0dGhpcy5kcmFnZ2luZyA9IHRydWU7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlVG91Y2hTdGFydCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoU3RhcnQoKSB7XG5cdFx0XHQvLyBTZXQgYSBmbGFnIHRoYXQgdGhlIHZpZXcgaXMgbm90IGJlaW5nIGRyYWdnZWRcblx0XHRcdHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaEVuZCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVRvdWNoRW5kKGV2ZW50KSB7XG5cdFx0XHQvLyBDaGVjayBpZiB0aGUgdmlldyBpcyBiZWluZyBkcmFnZ2VkLCBJbiB0aGlzIGNhc2Vcblx0XHRcdC8vIHdlIGRvbid0IHdhbnQgdG8gZmlyZSB0aGUgY2xpY2sgZXZlbnQgKGJlY2F1c2UgdGhlIHVzZXIgb25seSB3YW50cyB0byBzY3JvbGwpXG5cdFx0XHRpZiAodGhpcy5kcmFnZ2luZykgcmV0dXJuO1xuXG5cdFx0XHQvLyBGaXJlIHRoZSBtb3VzZSBldmVudHNcblx0XHRcdHRoaXMuaGFuZGxlTW91c2VEb3duKGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUoZXZlbnQpIHtcblx0XHRcdC8vIENoZWNrIGlmIHRoZSB2aWV3IGlzIGJlaW5nIGRyYWdnZWQsIEluIHRoaXMgY2FzZVxuXHRcdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byBmaXJlIHRoZSBjbGljayBldmVudCAoYmVjYXVzZSB0aGUgdXNlciBvbmx5IHdhbnRzIHRvIHNjcm9sbClcblx0XHRcdGlmICh0aGlzLmRyYWdnaW5nKSByZXR1cm47XG5cblx0XHRcdC8vIENsZWFyIHRoZSB2YWx1ZVxuXHRcdFx0dGhpcy5jbGVhclZhbHVlKGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNb3VzZURvd24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZXZlbnQpIHtcblx0XHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcblx0XHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxuXHRcdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGV2ZW50LnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKSB7XG5cdFx0XHRcdGlmICghdGhpcy5zdGF0ZS5pc0ZvY3VzZWQpIHtcblx0XHRcdFx0XHR0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IHRoaXMucHJvcHMub3Blbk9uQ2xpY2s7XG5cdFx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdFx0aXNPcGVuOiB0cnVlLFxuXHRcdFx0XHRcdFx0aXNQc2V1ZG9Gb2N1c2VkOiBmYWxzZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBwcmV2ZW50IGRlZmF1bHQgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdC8vIGZvciB0aGUgbm9uLXNlYXJjaGFibGUgc2VsZWN0LCB0b2dnbGUgdGhlIG1lbnVcblx0XHRcdGlmICghdGhpcy5wcm9wcy5zZWFyY2hhYmxlKSB7XG5cdFx0XHRcdC8vIFRoaXMgY29kZSBtZWFucyB0aGF0IGlmIGEgc2VsZWN0IGlzIHNlYXJjaGFibGUsIG9uQ2xpY2sgdGhlIG9wdGlvbnMgbWVudSB3aWxsIG5vdCBhcHBlYXIsIG9ubHkgb24gc3Vic2VxdWVudCBjbGljayB3aWxsIGl0IG9wZW4uXG5cdFx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzT3BlbjogIXRoaXMuc3RhdGUuaXNPcGVuXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5pc0ZvY3VzZWQpIHtcblx0XHRcdFx0Ly8gT24gaU9TLCB3ZSBjYW4gZ2V0IGludG8gYSBzdGF0ZSB3aGVyZSB3ZSB0aGluayB0aGUgaW5wdXQgaXMgZm9jdXNlZCBidXQgaXQgaXNuJ3QgcmVhbGx5LFxuXHRcdFx0XHQvLyBzaW5jZSBpT1MgaWdub3JlcyBwcm9ncmFtbWF0aWMgY2FsbHMgdG8gaW5wdXQuZm9jdXMoKSB0aGF0IHdlcmVuJ3QgdHJpZ2dlcmVkIGJ5IGEgY2xpY2sgZXZlbnQuXG5cdFx0XHRcdC8vIENhbGwgZm9jdXMoKSBhZ2FpbiBoZXJlIHRvIGJlIHNhZmUuXG5cdFx0XHRcdHRoaXMuZm9jdXMoKTtcblxuXHRcdFx0XHR2YXIgaW5wdXQgPSB0aGlzLmlucHV0O1xuXHRcdFx0XHR2YXIgdG9PcGVuID0gdHJ1ZTtcblxuXHRcdFx0XHRpZiAodHlwZW9mIGlucHV0LmdldElucHV0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0Ly8gR2V0IHRoZSBhY3R1YWwgRE9NIGlucHV0IGlmIHRoZSByZWYgaXMgYW4gPEF1dG9zaXplSW5wdXQgLz4gY29tcG9uZW50XG5cdFx0XHRcdFx0aW5wdXQgPSBpbnB1dC5nZXRJbnB1dCgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gY2xlYXJzIHRoZSB2YWx1ZSBzbyB0aGF0IHRoZSBjdXJzb3Igd2lsbCBiZSBhdCB0aGUgZW5kIG9mIGlucHV0IHdoZW4gdGhlIGNvbXBvbmVudCByZS1yZW5kZXJzXG5cdFx0XHRcdGlucHV0LnZhbHVlID0gJyc7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2ZvY3VzQWZ0ZXJDbGVhcikge1xuXHRcdFx0XHRcdHRvT3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdHRoaXMuX2ZvY3VzQWZ0ZXJDbGVhciA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gaWYgdGhlIGlucHV0IGlzIGZvY3VzZWQsIGVuc3VyZSB0aGUgbWVudSBpcyBvcGVuXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzT3BlbjogdG9PcGVuLFxuXHRcdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2UsXG5cdFx0XHRcdFx0Zm9jdXNlZE9wdGlvbjogbnVsbFxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIG90aGVyd2lzZSwgZm9jdXMgdGhlIGlucHV0IGFuZCBvcGVuIHRoZSBtZW51XG5cdFx0XHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gdGhpcy5wcm9wcy5vcGVuT25DbGljaztcblx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHsgZm9jdXNlZE9wdGlvbjogbnVsbCB9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNb3VzZURvd25PbkFycm93Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duT25BcnJvdyhldmVudCkge1xuXHRcdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdFx0Ly8gYnV0dG9uLCBvciBpZiB0aGUgY29tcG9uZW50IGlzIGRpc2FibGVkLCBpZ25vcmUgaXQuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fCBldmVudC50eXBlID09PSAnbW91c2Vkb3duJyAmJiBldmVudC5idXR0b24gIT09IDApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdFx0Ly8gcHJldmVudCBkZWZhdWx0IGV2ZW50IGhhbmRsZXJzXG5cdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQvLyBjbG9zZSB0aGUgbWVudVxuXHRcdFx0XHR0aGlzLmNsb3NlTWVudSgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSWYgdGhlIG1lbnUgaXNuJ3Qgb3BlbiwgbGV0IHRoZSBldmVudCBidWJibGUgdG8gdGhlIG1haW4gaGFuZGxlTW91c2VEb3duXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzT3BlbjogdHJ1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNb3VzZURvd25Pbk1lbnUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd25Pbk1lbnUoZXZlbnQpIHtcblx0XHRcdC8vIGlmIHRoZSBldmVudCB3YXMgdHJpZ2dlcmVkIGJ5IGEgbW91c2Vkb3duIGFuZCBub3QgdGhlIHByaW1hcnlcblx0XHRcdC8vIGJ1dHRvbiwgb3IgaWYgdGhlIGNvbXBvbmVudCBpcyBkaXNhYmxlZCwgaWdub3JlIGl0LlxuXHRcdFx0aWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHR0aGlzLl9vcGVuQWZ0ZXJGb2N1cyA9IHRydWU7XG5cdFx0XHR0aGlzLmZvY3VzKCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnY2xvc2VNZW51Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY2xvc2VNZW51KCkge1xuXHRcdFx0aWYgKHRoaXMucHJvcHMub25DbG9zZVJlc2V0c0lucHV0KSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlucHV0VmFsdWU6IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZSgnJyksXG5cdFx0XHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmICF0aGlzLnByb3BzLm11bHRpXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmICF0aGlzLnByb3BzLm11bHRpXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlSW5wdXRGb2N1cycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUlucHV0Rm9jdXMoZXZlbnQpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkKSByZXR1cm47XG5cblx0XHRcdHZhciB0b09wZW4gPSB0aGlzLnN0YXRlLmlzT3BlbiB8fCB0aGlzLl9vcGVuQWZ0ZXJGb2N1cyB8fCB0aGlzLnByb3BzLm9wZW5PbkZvY3VzO1xuXHRcdFx0dG9PcGVuID0gdGhpcy5fZm9jdXNBZnRlckNsZWFyID8gZmFsc2UgOiB0b09wZW47IC8vaWYgZm9jdXMgaGFwcGVucyBhZnRlciBjbGVhciB2YWx1ZXMsIGRvbid0IG9wZW4gZHJvcGRvd24geWV0LlxuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5vbkZvY3VzKSB7XG5cdFx0XHRcdHRoaXMucHJvcHMub25Gb2N1cyhldmVudCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpc0ZvY3VzZWQ6IHRydWUsXG5cdFx0XHRcdGlzT3BlbjogISF0b09wZW5cblx0XHRcdH0pO1xuXG5cdFx0XHR0aGlzLl9mb2N1c0FmdGVyQ2xlYXIgPSBmYWxzZTtcblx0XHRcdHRoaXMuX29wZW5BZnRlckZvY3VzID0gZmFsc2U7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlSW5wdXRCbHVyJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlSW5wdXRCbHVyKGV2ZW50KSB7XG5cdFx0XHQvLyBUaGUgY2hlY2sgZm9yIG1lbnUuY29udGFpbnMoYWN0aXZlRWxlbWVudCkgaXMgbmVjZXNzYXJ5IHRvIHByZXZlbnQgSUUxMSdzIHNjcm9sbGJhciBmcm9tIGNsb3NpbmcgdGhlIG1lbnUgaW4gY2VydGFpbiBjb250ZXh0cy5cblx0XHRcdGlmICh0aGlzLm1lbnUgJiYgKHRoaXMubWVudSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCB8fCB0aGlzLm1lbnUuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpKSB7XG5cdFx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcblx0XHRcdFx0dGhpcy5wcm9wcy5vbkJsdXIoZXZlbnQpO1xuXHRcdFx0fVxuXHRcdFx0dmFyIG9uQmx1cnJlZFN0YXRlID0ge1xuXHRcdFx0XHRpc0ZvY3VzZWQ6IGZhbHNlLFxuXHRcdFx0XHRpc09wZW46IGZhbHNlLFxuXHRcdFx0XHRpc1BzZXVkb0ZvY3VzZWQ6IGZhbHNlXG5cdFx0XHR9O1xuXHRcdFx0aWYgKHRoaXMucHJvcHMub25CbHVyUmVzZXRzSW5wdXQpIHtcblx0XHRcdFx0b25CbHVycmVkU3RhdGUuaW5wdXRWYWx1ZSA9IHRoaXMuaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZSgnJyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldFN0YXRlKG9uQmx1cnJlZFN0YXRlKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVJbnB1dENoYW5nZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUlucHV0Q2hhbmdlKGV2ZW50KSB7XG5cdFx0XHR2YXIgbmV3SW5wdXRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblxuXHRcdFx0aWYgKHRoaXMuc3RhdGUuaW5wdXRWYWx1ZSAhPT0gZXZlbnQudGFyZ2V0LnZhbHVlKSB7XG5cdFx0XHRcdG5ld0lucHV0VmFsdWUgPSB0aGlzLmhhbmRsZUlucHV0VmFsdWVDaGFuZ2UobmV3SW5wdXRWYWx1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpbnB1dFZhbHVlOiBuZXdJbnB1dFZhbHVlLFxuXHRcdFx0XHRpc09wZW46IHRydWUsXG5cdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3NldElucHV0VmFsdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBzZXRJbnB1dFZhbHVlKG5ld1ZhbHVlKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlKSB7XG5cdFx0XHRcdHZhciBuZXh0U3RhdGUgPSB0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UobmV3VmFsdWUpO1xuXHRcdFx0XHRpZiAobmV4dFN0YXRlICE9IG51bGwgJiYgKHR5cGVvZiBuZXh0U3RhdGUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG5leHRTdGF0ZSkpICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdG5ld1ZhbHVlID0gJycgKyBuZXh0U3RhdGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRpbnB1dFZhbHVlOiBuZXdWYWx1ZVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnaGFuZGxlSW5wdXRWYWx1ZUNoYW5nZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUlucHV0VmFsdWVDaGFuZ2UobmV3VmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzLm9uSW5wdXRDaGFuZ2UpIHtcblx0XHRcdFx0dmFyIG5leHRTdGF0ZSA9IHRoaXMucHJvcHMub25JbnB1dENoYW5nZShuZXdWYWx1ZSk7XG5cdFx0XHRcdC8vIE5vdGU6ICE9IHVzZWQgZGVsaWJlcmF0ZWx5IGhlcmUgdG8gY2F0Y2ggdW5kZWZpbmVkIGFuZCBudWxsXG5cdFx0XHRcdGlmIChuZXh0U3RhdGUgIT0gbnVsbCAmJiAodHlwZW9mIG5leHRTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobmV4dFN0YXRlKSkgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0bmV3VmFsdWUgPSAnJyArIG5leHRTdGF0ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5ld1ZhbHVlO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2hhbmRsZUtleURvd24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50KSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkgcmV0dXJuO1xuXG5cdFx0XHRpZiAodHlwZW9mIHRoaXMucHJvcHMub25JbnB1dEtleURvd24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0dGhpcy5wcm9wcy5vbklucHV0S2V5RG93bihldmVudCk7XG5cdFx0XHRcdGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuXHRcdFx0XHRjYXNlIDg6XG5cdFx0XHRcdFx0Ly8gYmFja3NwYWNlXG5cdFx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiYgdGhpcy5wcm9wcy5iYWNrc3BhY2VSZW1vdmVzKSB7XG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0dGhpcy5wb3BWYWx1ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA5OlxuXHRcdFx0XHRcdC8vIHRhYlxuXHRcdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSB8fCAhdGhpcy5zdGF0ZS5pc09wZW4gfHwgIXRoaXMucHJvcHMudGFiU2VsZWN0c1ZhbHVlKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAxMzpcblx0XHRcdFx0XHQvLyBlbnRlclxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNlbGVjdEZvY3VzZWRPcHRpb24oKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5mb2N1c05leHRPcHRpb24oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMjc6XG5cdFx0XHRcdFx0Ly8gZXNjYXBlXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAodGhpcy5zdGF0ZS5pc09wZW4pIHtcblx0XHRcdFx0XHRcdHRoaXMuY2xvc2VNZW51KCk7XG5cdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMucHJvcHMuY2xlYXJhYmxlICYmIHRoaXMucHJvcHMuZXNjYXBlQ2xlYXJzVmFsdWUpIHtcblx0XHRcdFx0XHRcdHRoaXMuY2xlYXJWYWx1ZShldmVudCk7XG5cdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMzI6XG5cdFx0XHRcdFx0Ly8gc3BhY2Vcblx0XHRcdFx0XHRpZiAodGhpcy5wcm9wcy5zZWFyY2hhYmxlKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRpZiAoIXRoaXMuc3RhdGUuaXNPcGVuKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmZvY3VzTmV4dE9wdGlvbigpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0Rm9jdXNlZE9wdGlvbigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDM4OlxuXHRcdFx0XHRcdC8vIHVwXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLmZvY3VzUHJldmlvdXNPcHRpb24oKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHQvLyBkb3duXG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR0aGlzLmZvY3VzTmV4dE9wdGlvbigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDMzOlxuXHRcdFx0XHRcdC8vIHBhZ2UgdXBcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMuZm9jdXNQYWdlVXBPcHRpb24oKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzNDpcblx0XHRcdFx0XHQvLyBwYWdlIGRvd25cblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMuZm9jdXNQYWdlRG93bk9wdGlvbigpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIDM1OlxuXHRcdFx0XHRcdC8vIGVuZCBrZXlcblx0XHRcdFx0XHRpZiAoZXZlbnQuc2hpZnRLZXkpIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMuZm9jdXNFbmRPcHRpb24oKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzNjpcblx0XHRcdFx0XHQvLyBob21lIGtleVxuXHRcdFx0XHRcdGlmIChldmVudC5zaGlmdEtleSkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5mb2N1c1N0YXJ0T3B0aW9uKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgNDY6XG5cdFx0XHRcdFx0Ly8gZGVsZXRlXG5cdFx0XHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlucHV0VmFsdWUgJiYgdGhpcy5wcm9wcy5kZWxldGVSZW1vdmVzKSB7XG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0dGhpcy5wb3BWYWx1ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVWYWx1ZUNsaWNrJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVmFsdWVDbGljayhvcHRpb24sIGV2ZW50KSB7XG5cdFx0XHRpZiAoIXRoaXMucHJvcHMub25WYWx1ZUNsaWNrKSByZXR1cm47XG5cdFx0XHR0aGlzLnByb3BzLm9uVmFsdWVDbGljayhvcHRpb24sIGV2ZW50KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdoYW5kbGVNZW51U2Nyb2xsJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTWVudVNjcm9sbChldmVudCkge1xuXHRcdFx0aWYgKCF0aGlzLnByb3BzLm9uTWVudVNjcm9sbFRvQm90dG9tKSByZXR1cm47XG5cdFx0XHR2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG5cdFx0XHRpZiAodGFyZ2V0LnNjcm9sbEhlaWdodCA+IHRhcmdldC5vZmZzZXRIZWlnaHQgJiYgdGFyZ2V0LnNjcm9sbEhlaWdodCAtIHRhcmdldC5vZmZzZXRIZWlnaHQgLSB0YXJnZXQuc2Nyb2xsVG9wIDw9IDApIHtcblx0XHRcdFx0dGhpcy5wcm9wcy5vbk1lbnVTY3JvbGxUb0JvdHRvbSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2dldE9wdGlvbkxhYmVsJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0T3B0aW9uTGFiZWwob3ApIHtcblx0XHRcdHJldHVybiBvcFt0aGlzLnByb3BzLmxhYmVsS2V5XTtcblx0XHR9XG5cblx0XHQvKipcbiAgICogVHVybnMgYSB2YWx1ZSBpbnRvIGFuIGFycmF5IGZyb20gdGhlIGdpdmVuIG9wdGlvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEFycmF5fSB2YWx1ZVx0XHQtIHRoZSB2YWx1ZSBvZiB0aGUgc2VsZWN0IGlucHV0XG4gICAqIEBwYXJhbSB7T2JqZWN0fVx0XHRuZXh0UHJvcHNcdC0gb3B0aW9uYWxseSBzcGVjaWZ5IHRoZSBuZXh0UHJvcHMgc28gdGhlIHJldHVybmVkIGFycmF5IHVzZXMgdGhlIGxhdGVzdCBjb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm5zXHR7QXJyYXl9XHR0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdCByZXByZXNlbnRlZCBpbiBhbiBhcnJheVxuICAgKi9cblxuXHR9LCB7XG5cdFx0a2V5OiAnZ2V0VmFsdWVBcnJheScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFZhbHVlQXJyYXkodmFsdWUpIHtcblx0XHRcdHZhciBuZXh0UHJvcHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcblxuXHRcdFx0LyoqIHN1cHBvcnQgb3B0aW9uYWxseSBwYXNzaW5nIGluIHRoZSBgbmV4dFByb3BzYCBzbyBgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wc2AgdXBkYXRlcyB3aWxsIGZ1bmN0aW9uIGFzIGV4cGVjdGVkICovXG5cdFx0XHR2YXIgcHJvcHMgPSAodHlwZW9mIG5leHRQcm9wcyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobmV4dFByb3BzKSkgPT09ICdvYmplY3QnID8gbmV4dFByb3BzIDogdGhpcy5wcm9wcztcblx0XHRcdGlmIChwcm9wcy5tdWx0aSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUuc3BsaXQocHJvcHMuZGVsaW1pdGVyKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRcdFx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBbXTtcblx0XHRcdFx0XHR2YWx1ZSA9IFt2YWx1ZV07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHZhbHVlLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcblx0XHRcdFx0XHRyZXR1cm4gZXhwYW5kVmFsdWUodmFsdWUsIHByb3BzKTtcblx0XHRcdFx0fSkuZmlsdGVyKGZ1bmN0aW9uIChpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGV4cGFuZGVkVmFsdWUgPSBleHBhbmRWYWx1ZSh2YWx1ZSwgcHJvcHMpO1xuXHRcdFx0cmV0dXJuIGV4cGFuZGVkVmFsdWUgPyBbZXhwYW5kZWRWYWx1ZV0gOiBbXTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdzZXRWYWx1ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0aWYgKHRoaXMucHJvcHMuYXV0b0JsdXIpIHtcblx0XHRcdFx0dGhpcy5ibHVySW5wdXQoKTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLnJlcXVpcmVkKSB7XG5cdFx0XHRcdHZhciByZXF1aXJlZCA9IGhhbmRsZVJlcXVpcmVkKHZhbHVlLCB0aGlzLnByb3BzLm11bHRpKTtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7IHJlcXVpcmVkOiByZXF1aXJlZCB9KTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLnByb3BzLnNpbXBsZVZhbHVlICYmIHZhbHVlKSB7XG5cdFx0XHRcdHZhbHVlID0gdGhpcy5wcm9wcy5tdWx0aSA/IHZhbHVlLm1hcChmdW5jdGlvbiAoaSkge1xuXHRcdFx0XHRcdHJldHVybiBpW190aGlzMi5wcm9wcy52YWx1ZUtleV07XG5cdFx0XHRcdH0pLmpvaW4odGhpcy5wcm9wcy5kZWxpbWl0ZXIpIDogdmFsdWVbdGhpcy5wcm9wcy52YWx1ZUtleV07XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuXHRcdFx0XHR0aGlzLnByb3BzLm9uQ2hhbmdlKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdzZWxlY3RWYWx1ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHNlbGVjdFZhbHVlKHZhbHVlKSB7XG5cdFx0XHR2YXIgX3RoaXMzID0gdGhpcztcblxuXHRcdFx0Ly8gTk9URTogd2UgYWN0dWFsbHkgYWRkL3NldCB0aGUgdmFsdWUgaW4gYSBjYWxsYmFjayB0byBtYWtlIHN1cmUgdGhlXG5cdFx0XHQvLyBpbnB1dCB2YWx1ZSBpcyBlbXB0eSB0byBhdm9pZCBzdHlsaW5nIGlzc3VlcyBpbiBDaHJvbWVcblx0XHRcdGlmICh0aGlzLnByb3BzLmNsb3NlT25TZWxlY3QpIHtcblx0XHRcdFx0dGhpcy5oYXNTY3JvbGxlZFRvT3B0aW9uID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdXBkYXRlZFZhbHVlID0gdGhpcy5wcm9wcy5vblNlbGVjdFJlc2V0c0lucHV0ID8gJycgOiB0aGlzLnN0YXRlLmlucHV0VmFsdWU7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRmb2N1c2VkSW5kZXg6IG51bGwsXG5cdFx0XHRcdFx0aW5wdXRWYWx1ZTogdGhpcy5oYW5kbGVJbnB1dFZhbHVlQ2hhbmdlKHVwZGF0ZWRWYWx1ZSksXG5cdFx0XHRcdFx0aXNPcGVuOiAhdGhpcy5wcm9wcy5jbG9zZU9uU2VsZWN0XG5cdFx0XHRcdH0sIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgdmFsdWVBcnJheSA9IF90aGlzMy5nZXRWYWx1ZUFycmF5KF90aGlzMy5wcm9wcy52YWx1ZSk7XG5cdFx0XHRcdFx0aWYgKHZhbHVlQXJyYXkuc29tZShmdW5jdGlvbiAoaSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGlbX3RoaXMzLnByb3BzLnZhbHVlS2V5XSA9PT0gdmFsdWVbX3RoaXMzLnByb3BzLnZhbHVlS2V5XTtcblx0XHRcdFx0XHR9KSkge1xuXHRcdFx0XHRcdFx0X3RoaXMzLnJlbW92ZVZhbHVlKHZhbHVlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0X3RoaXMzLmFkZFZhbHVlKHZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0aW5wdXRWYWx1ZTogdGhpcy5oYW5kbGVJbnB1dFZhbHVlQ2hhbmdlKHVwZGF0ZWRWYWx1ZSksXG5cdFx0XHRcdFx0aXNPcGVuOiAhdGhpcy5wcm9wcy5jbG9zZU9uU2VsZWN0LFxuXHRcdFx0XHRcdGlzUHNldWRvRm9jdXNlZDogdGhpcy5zdGF0ZS5pc0ZvY3VzZWRcblx0XHRcdFx0fSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdF90aGlzMy5zZXRWYWx1ZSh2YWx1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2FkZFZhbHVlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gYWRkVmFsdWUodmFsdWUpIHtcblx0XHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdFx0dmFyIHZpc2libGVPcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnMuZmlsdGVyKGZ1bmN0aW9uICh2YWwpIHtcblx0XHRcdFx0cmV0dXJuICF2YWwuZGlzYWJsZWQ7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBsYXN0VmFsdWVJbmRleCA9IHZpc2libGVPcHRpb25zLmluZGV4T2YodmFsdWUpO1xuXHRcdFx0dGhpcy5zZXRWYWx1ZSh2YWx1ZUFycmF5LmNvbmNhdCh2YWx1ZSkpO1xuXHRcdFx0aWYgKHZpc2libGVPcHRpb25zLmxlbmd0aCAtIDEgPT09IGxhc3RWYWx1ZUluZGV4KSB7XG5cdFx0XHRcdC8vIHRoZSBsYXN0IG9wdGlvbiB3YXMgc2VsZWN0ZWQ7IGZvY3VzIHRoZSBzZWNvbmQtbGFzdCBvbmVcblx0XHRcdFx0dGhpcy5mb2N1c09wdGlvbih2aXNpYmxlT3B0aW9uc1tsYXN0VmFsdWVJbmRleCAtIDFdKTtcblx0XHRcdH0gZWxzZSBpZiAodmlzaWJsZU9wdGlvbnMubGVuZ3RoID4gbGFzdFZhbHVlSW5kZXgpIHtcblx0XHRcdFx0Ly8gZm9jdXMgdGhlIG9wdGlvbiBiZWxvdyB0aGUgc2VsZWN0ZWQgb25lXG5cdFx0XHRcdHRoaXMuZm9jdXNPcHRpb24odmlzaWJsZU9wdGlvbnNbbGFzdFZhbHVlSW5kZXggKyAxXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncG9wVmFsdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBwb3BWYWx1ZSgpIHtcblx0XHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdFx0aWYgKCF2YWx1ZUFycmF5Lmxlbmd0aCkgcmV0dXJuO1xuXHRcdFx0aWYgKHZhbHVlQXJyYXlbdmFsdWVBcnJheS5sZW5ndGggLSAxXS5jbGVhcmFibGVWYWx1ZSA9PT0gZmFsc2UpIHJldHVybjtcblx0XHRcdHRoaXMuc2V0VmFsdWUodGhpcy5wcm9wcy5tdWx0aSA/IHZhbHVlQXJyYXkuc2xpY2UoMCwgdmFsdWVBcnJheS5sZW5ndGggLSAxKSA6IG51bGwpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbW92ZVZhbHVlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlVmFsdWUodmFsdWUpIHtcblx0XHRcdHZhciBfdGhpczQgPSB0aGlzO1xuXG5cdFx0XHR2YXIgdmFsdWVBcnJheSA9IHRoaXMuZ2V0VmFsdWVBcnJheSh0aGlzLnByb3BzLnZhbHVlKTtcblx0XHRcdHRoaXMuc2V0VmFsdWUodmFsdWVBcnJheS5maWx0ZXIoZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0cmV0dXJuIGlbX3RoaXM0LnByb3BzLnZhbHVlS2V5XSAhPT0gdmFsdWVbX3RoaXM0LnByb3BzLnZhbHVlS2V5XTtcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMuZm9jdXMoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjbGVhclZhbHVlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY2xlYXJWYWx1ZShldmVudCkge1xuXHRcdFx0Ly8gaWYgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgYnkgYSBtb3VzZWRvd24gYW5kIG5vdCB0aGUgcHJpbWFyeVxuXHRcdFx0Ly8gYnV0dG9uLCBpZ25vcmUgaXQuXG5cdFx0XHRpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gJ21vdXNlZG93bicgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0dGhpcy5zZXRWYWx1ZSh0aGlzLmdldFJlc2V0VmFsdWUoKSk7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aW5wdXRWYWx1ZTogdGhpcy5oYW5kbGVJbnB1dFZhbHVlQ2hhbmdlKCcnKSxcblx0XHRcdFx0aXNPcGVuOiBmYWxzZVxuXHRcdFx0fSwgdGhpcy5mb2N1cyk7XG5cblx0XHRcdHRoaXMuX2ZvY3VzQWZ0ZXJDbGVhciA9IHRydWU7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZ2V0UmVzZXRWYWx1ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGdldFJlc2V0VmFsdWUoKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5yZXNldFZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMucHJvcHMucmVzZXRWYWx1ZTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5wcm9wcy5tdWx0aSkge1xuXHRcdFx0XHRyZXR1cm4gW107XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1c09wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzT3B0aW9uKG9wdGlvbikge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb246IG9wdGlvblxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXNOZXh0T3B0aW9uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXNOZXh0T3B0aW9uKCkge1xuXHRcdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCduZXh0Jyk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXNQcmV2aW91c09wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzUHJldmlvdXNPcHRpb24oKSB7XG5cdFx0XHR0aGlzLmZvY3VzQWRqYWNlbnRPcHRpb24oJ3ByZXZpb3VzJyk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnZm9jdXNQYWdlVXBPcHRpb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmb2N1c1BhZ2VVcE9wdGlvbigpIHtcblx0XHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbigncGFnZV91cCcpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2ZvY3VzUGFnZURvd25PcHRpb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmb2N1c1BhZ2VEb3duT3B0aW9uKCkge1xuXHRcdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdwYWdlX2Rvd24nKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1c1N0YXJ0T3B0aW9uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXNTdGFydE9wdGlvbigpIHtcblx0XHRcdHRoaXMuZm9jdXNBZGphY2VudE9wdGlvbignc3RhcnQnKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1c0VuZE9wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzRW5kT3B0aW9uKCkge1xuXHRcdFx0dGhpcy5mb2N1c0FkamFjZW50T3B0aW9uKCdlbmQnKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1c0FkamFjZW50T3B0aW9uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXNBZGphY2VudE9wdGlvbihkaXIpIHtcblx0XHRcdHZhciBvcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnMubWFwKGZ1bmN0aW9uIChvcHRpb24sIGluZGV4KSB7XG5cdFx0XHRcdHJldHVybiB7IG9wdGlvbjogb3B0aW9uLCBpbmRleDogaW5kZXggfTtcblx0XHRcdH0pLmZpbHRlcihmdW5jdGlvbiAob3B0aW9uKSB7XG5cdFx0XHRcdHJldHVybiAhb3B0aW9uLm9wdGlvbi5kaXNhYmxlZDtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5fc2Nyb2xsVG9Gb2N1c2VkT3B0aW9uT25VcGRhdGUgPSB0cnVlO1xuXHRcdFx0aWYgKCF0aGlzLnN0YXRlLmlzT3Blbikge1xuXHRcdFx0XHR2YXIgbmV3U3RhdGUgPSB7XG5cdFx0XHRcdFx0Zm9jdXNlZE9wdGlvbjogdGhpcy5fZm9jdXNlZE9wdGlvbiB8fCAob3B0aW9ucy5sZW5ndGggPyBvcHRpb25zW2RpciA9PT0gJ25leHQnID8gMCA6IG9wdGlvbnMubGVuZ3RoIC0gMV0ub3B0aW9uIDogbnVsbCksXG5cdFx0XHRcdFx0aXNPcGVuOiB0cnVlXG5cdFx0XHRcdH07XG5cdFx0XHRcdGlmICh0aGlzLnByb3BzLm9uU2VsZWN0UmVzZXRzSW5wdXQpIHtcblx0XHRcdFx0XHRuZXdTdGF0ZS5pbnB1dFZhbHVlID0gJyc7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICghb3B0aW9ucy5sZW5ndGgpIHJldHVybjtcblx0XHRcdHZhciBmb2N1c2VkSW5kZXggPSAtMTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAodGhpcy5fZm9jdXNlZE9wdGlvbiA9PT0gb3B0aW9uc1tpXS5vcHRpb24pIHtcblx0XHRcdFx0XHRmb2N1c2VkSW5kZXggPSBpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoZGlyID09PSAnbmV4dCcgJiYgZm9jdXNlZEluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSAoZm9jdXNlZEluZGV4ICsgMSkgJSBvcHRpb25zLmxlbmd0aDtcblx0XHRcdH0gZWxzZSBpZiAoZGlyID09PSAncHJldmlvdXMnKSB7XG5cdFx0XHRcdGlmIChmb2N1c2VkSW5kZXggPiAwKSB7XG5cdFx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gZm9jdXNlZEluZGV4IC0gMTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmb2N1c2VkSW5kZXggPSBvcHRpb25zLmxlbmd0aCAtIDE7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoZGlyID09PSAnc3RhcnQnKSB7XG5cdFx0XHRcdGZvY3VzZWRJbmRleCA9IDA7XG5cdFx0XHR9IGVsc2UgaWYgKGRpciA9PT0gJ2VuZCcpIHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXHRcdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwYWdlX3VwJykge1xuXHRcdFx0XHR2YXIgcG90ZW50aWFsSW5kZXggPSBmb2N1c2VkSW5kZXggLSB0aGlzLnByb3BzLnBhZ2VTaXplO1xuXHRcdFx0XHRpZiAocG90ZW50aWFsSW5kZXggPCAwKSB7XG5cdFx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gMDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmb2N1c2VkSW5kZXggPSBwb3RlbnRpYWxJbmRleDtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChkaXIgPT09ICdwYWdlX2Rvd24nKSB7XG5cdFx0XHRcdHZhciBfcG90ZW50aWFsSW5kZXggPSBmb2N1c2VkSW5kZXggKyB0aGlzLnByb3BzLnBhZ2VTaXplO1xuXHRcdFx0XHRpZiAoX3BvdGVudGlhbEluZGV4ID4gb3B0aW9ucy5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdFx0Zm9jdXNlZEluZGV4ID0gb3B0aW9ucy5sZW5ndGggLSAxO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGZvY3VzZWRJbmRleCA9IF9wb3RlbnRpYWxJbmRleDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZm9jdXNlZEluZGV4ID09PSAtMSkge1xuXHRcdFx0XHRmb2N1c2VkSW5kZXggPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Zm9jdXNlZEluZGV4OiBvcHRpb25zW2ZvY3VzZWRJbmRleF0uaW5kZXgsXG5cdFx0XHRcdGZvY3VzZWRPcHRpb246IG9wdGlvbnNbZm9jdXNlZEluZGV4XS5vcHRpb25cblx0XHRcdH0pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2dldEZvY3VzZWRPcHRpb24nLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRGb2N1c2VkT3B0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2ZvY3VzZWRPcHRpb247XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnc2VsZWN0Rm9jdXNlZE9wdGlvbicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHNlbGVjdEZvY3VzZWRPcHRpb24oKSB7XG5cdFx0XHRpZiAodGhpcy5fZm9jdXNlZE9wdGlvbikge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5zZWxlY3RWYWx1ZSh0aGlzLl9mb2N1c2VkT3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXJMb2FkaW5nJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyTG9hZGluZygpIHtcblx0XHRcdGlmICghdGhpcy5wcm9wcy5pc0xvYWRpbmcpIHJldHVybjtcblx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnc3BhbicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiAnU2VsZWN0LWxvYWRpbmctem9uZScsICdhcmlhLWhpZGRlbic6ICd0cnVlJyB9LFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KCdzcGFuJywgeyBjbGFzc05hbWU6ICdTZWxlY3QtbG9hZGluZycgfSlcblx0XHRcdCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyVmFsdWUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJWYWx1ZSh2YWx1ZUFycmF5LCBpc09wZW4pIHtcblx0XHRcdHZhciBfdGhpczUgPSB0aGlzO1xuXG5cdFx0XHR2YXIgcmVuZGVyTGFiZWwgPSB0aGlzLnByb3BzLnZhbHVlUmVuZGVyZXIgfHwgdGhpcy5nZXRPcHRpb25MYWJlbDtcblx0XHRcdHZhciBWYWx1ZUNvbXBvbmVudCA9IHRoaXMucHJvcHMudmFsdWVDb21wb25lbnQ7XG5cdFx0XHRpZiAoIXZhbHVlQXJyYXkubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBzaG93UGxhY2Vob2xkZXIgPSBzaG91bGRTaG93UGxhY2Vob2xkZXIodGhpcy5zdGF0ZSwgdGhpcy5wcm9wcywgaXNPcGVuKTtcblx0XHRcdFx0cmV0dXJuIHNob3dQbGFjZWhvbGRlciA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdFx0eyBjbGFzc05hbWU6ICdTZWxlY3QtcGxhY2Vob2xkZXInIH0sXG5cdFx0XHRcdFx0dGhpcy5wcm9wcy5wbGFjZWhvbGRlclxuXHRcdFx0XHQpIDogbnVsbDtcblx0XHRcdH1cblx0XHRcdHZhciBvbkNsaWNrID0gdGhpcy5wcm9wcy5vblZhbHVlQ2xpY2sgPyB0aGlzLmhhbmRsZVZhbHVlQ2xpY2sgOiBudWxsO1xuXHRcdFx0aWYgKHRoaXMucHJvcHMubXVsdGkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlQXJyYXkubWFwKGZ1bmN0aW9uICh2YWx1ZSwgaSkge1xuXHRcdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdFx0VmFsdWVDb21wb25lbnQsXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGRpc2FibGVkOiBfdGhpczUucHJvcHMuZGlzYWJsZWQgfHwgdmFsdWUuY2xlYXJhYmxlVmFsdWUgPT09IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRpZDogX3RoaXM1Ll9pbnN0YW5jZVByZWZpeCArICctdmFsdWUtJyArIGksXG5cdFx0XHRcdFx0XHRcdGluc3RhbmNlUHJlZml4OiBfdGhpczUuX2luc3RhbmNlUHJlZml4LFxuXHRcdFx0XHRcdFx0XHRrZXk6ICd2YWx1ZS0nICsgaSArICctJyArIHZhbHVlW190aGlzNS5wcm9wcy52YWx1ZUtleV0sXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s6IG9uQ2xpY2ssXG5cdFx0XHRcdFx0XHRcdG9uUmVtb3ZlOiBfdGhpczUucmVtb3ZlVmFsdWUsXG5cdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyOiBfdGhpczUucHJvcHMucGxhY2Vob2xkZXIsXG5cdFx0XHRcdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHJlbmRlckxhYmVsKHZhbHVlLCBpKSxcblx0XHRcdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0XHRcdCdzcGFuJyxcblx0XHRcdFx0XHRcdFx0eyBjbGFzc05hbWU6ICdTZWxlY3QtYXJpYS1vbmx5JyB9LFxuXHRcdFx0XHRcdFx0XHQnXFx4QTAnXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKHNob3VsZFNob3dWYWx1ZSh0aGlzLnN0YXRlLCB0aGlzLnByb3BzKSkge1xuXHRcdFx0XHRpZiAoaXNPcGVuKSBvbkNsaWNrID0gbnVsbDtcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0VmFsdWVDb21wb25lbnQsXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGlzYWJsZWQ6IHRoaXMucHJvcHMuZGlzYWJsZWQsXG5cdFx0XHRcdFx0XHRpZDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlLWl0ZW0nLFxuXHRcdFx0XHRcdFx0aW5zdGFuY2VQcmVmaXg6IHRoaXMuX2luc3RhbmNlUHJlZml4LFxuXHRcdFx0XHRcdFx0b25DbGljazogb25DbGljayxcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyOiB0aGlzLnByb3BzLnBsYWNlaG9sZGVyLFxuXHRcdFx0XHRcdFx0dmFsdWU6IHZhbHVlQXJyYXlbMF1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHJlbmRlckxhYmVsKHZhbHVlQXJyYXlbMF0pXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVySW5wdXQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJJbnB1dCh2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uSW5kZXgpIHtcblx0XHRcdHZhciBfY2xhc3NOYW1lcyxcblx0XHRcdCAgICBfdGhpczYgPSB0aGlzO1xuXG5cdFx0XHR2YXIgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygnU2VsZWN0LWlucHV0JywgdGhpcy5wcm9wcy5pbnB1dFByb3BzLmNsYXNzTmFtZSk7XG5cdFx0XHR2YXIgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW47XG5cblx0XHRcdHZhciBhcmlhT3ducyA9IGNsYXNzTmFtZXMoKF9jbGFzc05hbWVzID0ge30sIGRlZmluZVByb3BlcnR5KF9jbGFzc05hbWVzLCB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCcsIGlzT3BlbiksIGRlZmluZVByb3BlcnR5KF9jbGFzc05hbWVzLCB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctYmFja3NwYWNlLXJlbW92ZS1tZXNzYWdlJywgdGhpcy5wcm9wcy5tdWx0aSAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiB0aGlzLnN0YXRlLmlzRm9jdXNlZCAmJiAhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlKSwgX2NsYXNzTmFtZXMpKTtcblxuXHRcdFx0dmFyIHZhbHVlID0gdGhpcy5zdGF0ZS5pbnB1dFZhbHVlO1xuXHRcdFx0aWYgKHZhbHVlICYmICF0aGlzLnByb3BzLm9uU2VsZWN0UmVzZXRzSW5wdXQgJiYgIXRoaXMuc3RhdGUuaXNGb2N1c2VkKSB7XG5cdFx0XHRcdC8vIGl0IGhpZGVzIGlucHV0IHZhbHVlIHdoZW4gaXQgaXMgbm90IGZvY3VzZWQgYW5kIHdhcyBub3QgcmVzZXQgb24gc2VsZWN0XG5cdFx0XHRcdHZhbHVlID0gJyc7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpbnB1dFByb3BzID0gX2V4dGVuZHMoe30sIHRoaXMucHJvcHMuaW5wdXRQcm9wcywge1xuXHRcdFx0XHQnYXJpYS1hY3RpdmVkZXNjZW5kYW50JzogaXNPcGVuID8gdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLW9wdGlvbi0nICsgZm9jdXNlZE9wdGlvbkluZGV4IDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLXZhbHVlJyxcblx0XHRcdFx0J2FyaWEtZGVzY3JpYmVkYnknOiB0aGlzLnByb3BzWydhcmlhLWRlc2NyaWJlZGJ5J10sXG5cdFx0XHRcdCdhcmlhLWV4cGFuZGVkJzogJycgKyBpc09wZW4sXG5cdFx0XHRcdCdhcmlhLWhhc3BvcHVwJzogJycgKyBpc09wZW4sXG5cdFx0XHRcdCdhcmlhLWxhYmVsJzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbCddLFxuXHRcdFx0XHQnYXJpYS1sYWJlbGxlZGJ5JzogdGhpcy5wcm9wc1snYXJpYS1sYWJlbGxlZGJ5J10sXG5cdFx0XHRcdCdhcmlhLW93bnMnOiBhcmlhT3ducyxcblx0XHRcdFx0Y2xhc3NOYW1lOiBjbGFzc05hbWUsXG5cdFx0XHRcdG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dEJsdXIsXG5cdFx0XHRcdG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlLFxuXHRcdFx0XHRvbkZvY3VzOiB0aGlzLmhhbmRsZUlucHV0Rm9jdXMsXG5cdFx0XHRcdHJlZjogZnVuY3Rpb24gcmVmKF9yZWYpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXM2LmlucHV0ID0gX3JlZjtcblx0XHRcdFx0fSxcblx0XHRcdFx0cm9sZTogJ2NvbWJvYm94Jyxcblx0XHRcdFx0cmVxdWlyZWQ6IHRoaXMuc3RhdGUucmVxdWlyZWQsXG5cdFx0XHRcdHRhYkluZGV4OiB0aGlzLnByb3BzLnRhYkluZGV4LFxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAodGhpcy5wcm9wcy5pbnB1dFJlbmRlcmVyKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnByb3BzLmlucHV0UmVuZGVyZXIoaW5wdXRQcm9wcyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8ICF0aGlzLnByb3BzLnNlYXJjaGFibGUpIHtcblx0XHRcdFx0dmFyIGRpdlByb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXModGhpcy5wcm9wcy5pbnB1dFByb3BzLCBbXSk7XG5cblxuXHRcdFx0XHR2YXIgX2FyaWFPd25zID0gY2xhc3NOYW1lcyhkZWZpbmVQcm9wZXJ0eSh7fSwgdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWxpc3QnLCBpc09wZW4pKTtcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2RpdicsIF9leHRlbmRzKHt9LCBkaXZQcm9wcywge1xuXHRcdFx0XHRcdCdhcmlhLWV4cGFuZGVkJzogaXNPcGVuLFxuXHRcdFx0XHRcdCdhcmlhLW93bnMnOiBfYXJpYU93bnMsXG5cdFx0XHRcdFx0J2FyaWEtYWN0aXZlZGVzY2VuZGFudCc6IGlzT3BlbiA/IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy1vcHRpb24tJyArIGZvY3VzZWRPcHRpb25JbmRleCA6IHRoaXMuX2luc3RhbmNlUHJlZml4ICsgJy12YWx1ZScsXG5cdFx0XHRcdFx0J2FyaWEtZGlzYWJsZWQnOiAnJyArIHRoaXMucHJvcHMuZGlzYWJsZWQsXG5cdFx0XHRcdFx0J2FyaWEtbGFiZWwnOiB0aGlzLnByb3BzWydhcmlhLWxhYmVsJ10sXG5cdFx0XHRcdFx0J2FyaWEtbGFiZWxsZWRieSc6IHRoaXMucHJvcHNbJ2FyaWEtbGFiZWxsZWRieSddLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuXHRcdFx0XHRcdG9uQmx1cjogdGhpcy5oYW5kbGVJbnB1dEJsdXIsXG5cdFx0XHRcdFx0b25Gb2N1czogdGhpcy5oYW5kbGVJbnB1dEZvY3VzLFxuXHRcdFx0XHRcdHJlZjogZnVuY3Rpb24gcmVmKF9yZWYyKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM2LmlucHV0ID0gX3JlZjI7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyb2xlOiAnY29tYm9ib3gnLFxuXHRcdFx0XHRcdHN0eWxlOiB7IGJvcmRlcjogMCwgd2lkdGg6IDEsIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snIH0sXG5cdFx0XHRcdFx0dGFiSW5kZXg6IHRoaXMucHJvcHMudGFiSW5kZXggfHwgMFxuXHRcdFx0XHR9KSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLnByb3BzLmF1dG9zaXplKSB7XG5cdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEF1dG9zaXplSW5wdXQsIF9leHRlbmRzKHsgaWQ6IHRoaXMucHJvcHMuaWQgfSwgaW5wdXRQcm9wcywgeyBtaW5XaWR0aDogJzUnIH0pKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0eyBjbGFzc05hbWU6IGNsYXNzTmFtZSwga2V5OiAnaW5wdXQtd3JhcCcsIHN0eWxlOiB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snIH0gfSxcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCBfZXh0ZW5kcyh7IGlkOiB0aGlzLnByb3BzLmlkIH0sIGlucHV0UHJvcHMpKVxuXHRcdFx0KTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXJDbGVhcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlckNsZWFyKCkge1xuXHRcdFx0dmFyIHZhbHVlQXJyYXkgPSB0aGlzLmdldFZhbHVlQXJyYXkodGhpcy5wcm9wcy52YWx1ZSk7XG5cdFx0XHRpZiAoIXRoaXMucHJvcHMuY2xlYXJhYmxlIHx8ICF2YWx1ZUFycmF5Lmxlbmd0aCB8fCB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRoaXMucHJvcHMuaXNMb2FkaW5nKSByZXR1cm47XG5cdFx0XHR2YXIgYXJpYUxhYmVsID0gdGhpcy5wcm9wcy5tdWx0aSA/IHRoaXMucHJvcHMuY2xlYXJBbGxUZXh0IDogdGhpcy5wcm9wcy5jbGVhclZhbHVlVGV4dDtcblx0XHRcdHZhciBjbGVhciA9IHRoaXMucHJvcHMuY2xlYXJSZW5kZXJlcigpO1xuXG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J3NwYW4nLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0J2FyaWEtbGFiZWwnOiBhcmlhTGFiZWwsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAnU2VsZWN0LWNsZWFyLXpvbmUnLFxuXHRcdFx0XHRcdG9uTW91c2VEb3duOiB0aGlzLmNsZWFyVmFsdWUsXG5cdFx0XHRcdFx0b25Ub3VjaEVuZDogdGhpcy5oYW5kbGVUb3VjaEVuZENsZWFyVmFsdWUsXG5cdFx0XHRcdFx0b25Ub3VjaE1vdmU6IHRoaXMuaGFuZGxlVG91Y2hNb3ZlLFxuXHRcdFx0XHRcdG9uVG91Y2hTdGFydDogdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LFxuXHRcdFx0XHRcdHRpdGxlOiBhcmlhTGFiZWxcblx0XHRcdFx0fSxcblx0XHRcdFx0Y2xlYXJcblx0XHRcdCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyQXJyb3cnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJBcnJvdygpIHtcblx0XHRcdGlmICghdGhpcy5wcm9wcy5hcnJvd1JlbmRlcmVyKSByZXR1cm47XG5cblx0XHRcdHZhciBvbk1vdXNlRG93biA9IHRoaXMuaGFuZGxlTW91c2VEb3duT25BcnJvdztcblx0XHRcdHZhciBpc09wZW4gPSB0aGlzLnN0YXRlLmlzT3Blbjtcblx0XHRcdHZhciBhcnJvdyA9IHRoaXMucHJvcHMuYXJyb3dSZW5kZXJlcih7IG9uTW91c2VEb3duOiBvbk1vdXNlRG93biwgaXNPcGVuOiBpc09wZW4gfSk7XG5cblx0XHRcdGlmICghYXJyb3cpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnc3BhbicsXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRjbGFzc05hbWU6ICdTZWxlY3QtYXJyb3ctem9uZScsXG5cdFx0XHRcdFx0b25Nb3VzZURvd246IG9uTW91c2VEb3duXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFycm93XG5cdFx0XHQpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2ZpbHRlck9wdGlvbnMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBmaWx0ZXJPcHRpb25zJCQxKGV4Y2x1ZGVPcHRpb25zKSB7XG5cdFx0XHR2YXIgZmlsdGVyVmFsdWUgPSB0aGlzLnN0YXRlLmlucHV0VmFsdWU7XG5cdFx0XHR2YXIgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucyB8fCBbXTtcblx0XHRcdGlmICh0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMpIHtcblx0XHRcdFx0Ly8gTWFpbnRhaW4gYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCBib29sZWFuIGF0dHJpYnV0ZVxuXHRcdFx0XHR2YXIgZmlsdGVyT3B0aW9ucyQkMSA9IHR5cGVvZiB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMgPT09ICdmdW5jdGlvbicgPyB0aGlzLnByb3BzLmZpbHRlck9wdGlvbnMgOiBmaWx0ZXJPcHRpb25zO1xuXG5cdFx0XHRcdHJldHVybiBmaWx0ZXJPcHRpb25zJCQxKG9wdGlvbnMsIGZpbHRlclZhbHVlLCBleGNsdWRlT3B0aW9ucywge1xuXHRcdFx0XHRcdGZpbHRlck9wdGlvbjogdGhpcy5wcm9wcy5maWx0ZXJPcHRpb24sXG5cdFx0XHRcdFx0aWdub3JlQWNjZW50czogdGhpcy5wcm9wcy5pZ25vcmVBY2NlbnRzLFxuXHRcdFx0XHRcdGlnbm9yZUNhc2U6IHRoaXMucHJvcHMuaWdub3JlQ2FzZSxcblx0XHRcdFx0XHRsYWJlbEtleTogdGhpcy5wcm9wcy5sYWJlbEtleSxcblx0XHRcdFx0XHRtYXRjaFBvczogdGhpcy5wcm9wcy5tYXRjaFBvcyxcblx0XHRcdFx0XHRtYXRjaFByb3A6IHRoaXMucHJvcHMubWF0Y2hQcm9wLFxuXHRcdFx0XHRcdHRyaW1GaWx0ZXI6IHRoaXMucHJvcHMudHJpbUZpbHRlcixcblx0XHRcdFx0XHR2YWx1ZUtleTogdGhpcy5wcm9wcy52YWx1ZUtleVxuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBvcHRpb25zO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ29uT3B0aW9uUmVmJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gb25PcHRpb25SZWYocmVmLCBpc0ZvY3VzZWQpIHtcblx0XHRcdGlmIChpc0ZvY3VzZWQpIHtcblx0XHRcdFx0dGhpcy5mb2N1c2VkID0gcmVmO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlck1lbnUnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJNZW51KG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIHtcblx0XHRcdGlmIChvcHRpb25zICYmIG9wdGlvbnMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnByb3BzLm1lbnVSZW5kZXJlcih7XG5cdFx0XHRcdFx0Zm9jdXNlZE9wdGlvbjogZm9jdXNlZE9wdGlvbixcblx0XHRcdFx0XHRmb2N1c09wdGlvbjogdGhpcy5mb2N1c09wdGlvbixcblx0XHRcdFx0XHRpbnB1dFZhbHVlOiB0aGlzLnN0YXRlLmlucHV0VmFsdWUsXG5cdFx0XHRcdFx0aW5zdGFuY2VQcmVmaXg6IHRoaXMuX2luc3RhbmNlUHJlZml4LFxuXHRcdFx0XHRcdGxhYmVsS2V5OiB0aGlzLnByb3BzLmxhYmVsS2V5LFxuXHRcdFx0XHRcdG9uRm9jdXM6IHRoaXMuZm9jdXNPcHRpb24sXG5cdFx0XHRcdFx0b25PcHRpb25SZWY6IHRoaXMub25PcHRpb25SZWYsXG5cdFx0XHRcdFx0b25TZWxlY3Q6IHRoaXMuc2VsZWN0VmFsdWUsXG5cdFx0XHRcdFx0b3B0aW9uQ2xhc3NOYW1lOiB0aGlzLnByb3BzLm9wdGlvbkNsYXNzTmFtZSxcblx0XHRcdFx0XHRvcHRpb25Db21wb25lbnQ6IHRoaXMucHJvcHMub3B0aW9uQ29tcG9uZW50LFxuXHRcdFx0XHRcdG9wdGlvblJlbmRlcmVyOiB0aGlzLnByb3BzLm9wdGlvblJlbmRlcmVyIHx8IHRoaXMuZ2V0T3B0aW9uTGFiZWwsXG5cdFx0XHRcdFx0b3B0aW9uczogb3B0aW9ucyxcblx0XHRcdFx0XHRyZW1vdmVWYWx1ZTogdGhpcy5yZW1vdmVWYWx1ZSxcblx0XHRcdFx0XHRzZWxlY3RWYWx1ZTogdGhpcy5zZWxlY3RWYWx1ZSxcblx0XHRcdFx0XHR2YWx1ZUFycmF5OiB2YWx1ZUFycmF5LFxuXHRcdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnByb3BzLnZhbHVlS2V5XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLnByb3BzLm5vUmVzdWx0c1RleHQpIHtcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdFx0eyBjbGFzc05hbWU6ICdTZWxlY3Qtbm9yZXN1bHRzJyB9LFxuXHRcdFx0XHRcdHRoaXMucHJvcHMubm9SZXN1bHRzVGV4dFxuXHRcdFx0XHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVySGlkZGVuRmllbGQnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXJIaWRkZW5GaWVsZCh2YWx1ZUFycmF5KSB7XG5cdFx0XHR2YXIgX3RoaXM3ID0gdGhpcztcblxuXHRcdFx0aWYgKCF0aGlzLnByb3BzLm5hbWUpIHJldHVybjtcblx0XHRcdGlmICh0aGlzLnByb3BzLmpvaW5WYWx1ZXMpIHtcblx0XHRcdFx0dmFyIHZhbHVlID0gdmFsdWVBcnJheS5tYXAoZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0XHRyZXR1cm4gc3RyaW5naWZ5VmFsdWUoaVtfdGhpczcucHJvcHMudmFsdWVLZXldKTtcblx0XHRcdFx0fSkuam9pbih0aGlzLnByb3BzLmRlbGltaXRlcik7XG5cdFx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbnB1dCcsIHtcblx0XHRcdFx0XHRkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcblx0XHRcdFx0XHRuYW1lOiB0aGlzLnByb3BzLm5hbWUsXG5cdFx0XHRcdFx0cmVmOiBmdW5jdGlvbiByZWYoX3JlZjMpIHtcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczcudmFsdWUgPSBfcmVmMztcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHR5cGU6ICdoaWRkZW4nLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWx1ZUFycmF5Lm1hcChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xuXHRcdFx0XHRcdGRpc2FibGVkOiBfdGhpczcucHJvcHMuZGlzYWJsZWQsXG5cdFx0XHRcdFx0a2V5OiAnaGlkZGVuLicgKyBpbmRleCxcblx0XHRcdFx0XHRuYW1lOiBfdGhpczcucHJvcHMubmFtZSxcblx0XHRcdFx0XHRyZWY6ICd2YWx1ZScgKyBpbmRleCxcblx0XHRcdFx0XHR0eXBlOiAnaGlkZGVuJyxcblx0XHRcdFx0XHR2YWx1ZTogc3RyaW5naWZ5VmFsdWUoaXRlbVtfdGhpczcucHJvcHMudmFsdWVLZXldKVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2dldEZvY3VzYWJsZU9wdGlvbkluZGV4Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZ2V0Rm9jdXNhYmxlT3B0aW9uSW5kZXgoc2VsZWN0ZWRPcHRpb24pIHtcblx0XHRcdHZhciBvcHRpb25zID0gdGhpcy5fdmlzaWJsZU9wdGlvbnM7XG5cdFx0XHRpZiAoIW9wdGlvbnMubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuXHRcdFx0dmFyIHZhbHVlS2V5ID0gdGhpcy5wcm9wcy52YWx1ZUtleTtcblx0XHRcdHZhciBmb2N1c2VkT3B0aW9uID0gdGhpcy5zdGF0ZS5mb2N1c2VkT3B0aW9uIHx8IHNlbGVjdGVkT3B0aW9uO1xuXHRcdFx0aWYgKGZvY3VzZWRPcHRpb24gJiYgIWZvY3VzZWRPcHRpb24uZGlzYWJsZWQpIHtcblx0XHRcdFx0dmFyIGZvY3VzZWRPcHRpb25JbmRleCA9IC0xO1xuXHRcdFx0XHRvcHRpb25zLnNvbWUoZnVuY3Rpb24gKG9wdGlvbiwgaW5kZXgpIHtcblx0XHRcdFx0XHR2YXIgaXNPcHRpb25FcXVhbCA9IG9wdGlvblt2YWx1ZUtleV0gPT09IGZvY3VzZWRPcHRpb25bdmFsdWVLZXldO1xuXHRcdFx0XHRcdGlmIChpc09wdGlvbkVxdWFsKSB7XG5cdFx0XHRcdFx0XHRmb2N1c2VkT3B0aW9uSW5kZXggPSBpbmRleDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGlzT3B0aW9uRXF1YWw7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRpZiAoZm9jdXNlZE9wdGlvbkluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdHJldHVybiBmb2N1c2VkT3B0aW9uSW5kZXg7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmICghb3B0aW9uc1tpXS5kaXNhYmxlZCkgcmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXJPdXRlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlck91dGVyKG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIHtcblx0XHRcdHZhciBfdGhpczggPSB0aGlzO1xuXG5cdFx0XHR2YXIgbWVudSA9IHRoaXMucmVuZGVyTWVudShvcHRpb25zLCB2YWx1ZUFycmF5LCBmb2N1c2VkT3B0aW9uKTtcblx0XHRcdGlmICghbWVudSkge1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHR7IHJlZjogZnVuY3Rpb24gcmVmKF9yZWY1KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM4Lm1lbnVDb250YWluZXIgPSBfcmVmNTtcblx0XHRcdFx0XHR9LCBjbGFzc05hbWU6ICdTZWxlY3QtbWVudS1vdXRlcicsIHN0eWxlOiB0aGlzLnByb3BzLm1lbnVDb250YWluZXJTdHlsZSB9LFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNsYXNzTmFtZTogJ1NlbGVjdC1tZW51Jyxcblx0XHRcdFx0XHRcdGlkOiB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctbGlzdCcsXG5cdFx0XHRcdFx0XHRvbk1vdXNlRG93bjogdGhpcy5oYW5kbGVNb3VzZURvd25Pbk1lbnUsXG5cdFx0XHRcdFx0XHRvblNjcm9sbDogdGhpcy5oYW5kbGVNZW51U2Nyb2xsLFxuXHRcdFx0XHRcdFx0cmVmOiBmdW5jdGlvbiByZWYoX3JlZjQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzOC5tZW51ID0gX3JlZjQ7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0cm9sZTogJ2xpc3Rib3gnLFxuXHRcdFx0XHRcdFx0c3R5bGU6IHRoaXMucHJvcHMubWVudVN0eWxlLFxuXHRcdFx0XHRcdFx0dGFiSW5kZXg6IC0xXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRtZW51XG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAncmVuZGVyJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdFx0dmFyIF90aGlzOSA9IHRoaXM7XG5cblx0XHRcdHZhciB2YWx1ZUFycmF5ID0gdGhpcy5nZXRWYWx1ZUFycmF5KHRoaXMucHJvcHMudmFsdWUpO1xuXHRcdFx0dmFyIG9wdGlvbnMgPSB0aGlzLl92aXNpYmxlT3B0aW9ucyA9IHRoaXMuZmlsdGVyT3B0aW9ucyh0aGlzLnByb3BzLm11bHRpICYmIHRoaXMucHJvcHMucmVtb3ZlU2VsZWN0ZWQgPyB2YWx1ZUFycmF5IDogbnVsbCk7XG5cdFx0XHR2YXIgaXNPcGVuID0gdGhpcy5zdGF0ZS5pc09wZW47XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSAmJiAhb3B0aW9ucy5sZW5ndGggJiYgdmFsdWVBcnJheS5sZW5ndGggJiYgIXRoaXMuc3RhdGUuaW5wdXRWYWx1ZSkgaXNPcGVuID0gZmFsc2U7XG5cdFx0XHR2YXIgZm9jdXNlZE9wdGlvbkluZGV4ID0gdGhpcy5nZXRGb2N1c2FibGVPcHRpb25JbmRleCh2YWx1ZUFycmF5WzBdKTtcblxuXHRcdFx0dmFyIGZvY3VzZWRPcHRpb24gPSBudWxsO1xuXHRcdFx0aWYgKGZvY3VzZWRPcHRpb25JbmRleCAhPT0gbnVsbCkge1xuXHRcdFx0XHRmb2N1c2VkT3B0aW9uID0gdGhpcy5fZm9jdXNlZE9wdGlvbiA9IG9wdGlvbnNbZm9jdXNlZE9wdGlvbkluZGV4XTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvY3VzZWRPcHRpb24gPSB0aGlzLl9mb2N1c2VkT3B0aW9uID0gbnVsbDtcblx0XHRcdH1cblx0XHRcdHZhciBjbGFzc05hbWUgPSBjbGFzc05hbWVzKCdTZWxlY3QnLCB0aGlzLnByb3BzLmNsYXNzTmFtZSwge1xuXHRcdFx0XHQnaGFzLXZhbHVlJzogdmFsdWVBcnJheS5sZW5ndGgsXG5cdFx0XHRcdCdpcy1jbGVhcmFibGUnOiB0aGlzLnByb3BzLmNsZWFyYWJsZSxcblx0XHRcdFx0J2lzLWRpc2FibGVkJzogdGhpcy5wcm9wcy5kaXNhYmxlZCxcblx0XHRcdFx0J2lzLWZvY3VzZWQnOiB0aGlzLnN0YXRlLmlzRm9jdXNlZCxcblx0XHRcdFx0J2lzLWxvYWRpbmcnOiB0aGlzLnByb3BzLmlzTG9hZGluZyxcblx0XHRcdFx0J2lzLW9wZW4nOiBpc09wZW4sXG5cdFx0XHRcdCdpcy1wc2V1ZG8tZm9jdXNlZCc6IHRoaXMuc3RhdGUuaXNQc2V1ZG9Gb2N1c2VkLFxuXHRcdFx0XHQnaXMtc2VhcmNoYWJsZSc6IHRoaXMucHJvcHMuc2VhcmNoYWJsZSxcblx0XHRcdFx0J1NlbGVjdC0tbXVsdGknOiB0aGlzLnByb3BzLm11bHRpLFxuXHRcdFx0XHQnU2VsZWN0LS1ydGwnOiB0aGlzLnByb3BzLnJ0bCxcblx0XHRcdFx0J1NlbGVjdC0tc2luZ2xlJzogIXRoaXMucHJvcHMubXVsdGlcblx0XHRcdH0pO1xuXG5cdFx0XHR2YXIgcmVtb3ZlTWVzc2FnZSA9IG51bGw7XG5cdFx0XHRpZiAodGhpcy5wcm9wcy5tdWx0aSAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCAmJiB2YWx1ZUFycmF5Lmxlbmd0aCAmJiAhdGhpcy5zdGF0ZS5pbnB1dFZhbHVlICYmIHRoaXMuc3RhdGUuaXNGb2N1c2VkICYmIHRoaXMucHJvcHMuYmFja3NwYWNlUmVtb3Zlcykge1xuXHRcdFx0XHRyZW1vdmVNZXNzYWdlID0gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHQnc3BhbicsXG5cdFx0XHRcdFx0eyBpZDogdGhpcy5faW5zdGFuY2VQcmVmaXggKyAnLWJhY2tzcGFjZS1yZW1vdmUtbWVzc2FnZScsIGNsYXNzTmFtZTogJ1NlbGVjdC1hcmlhLW9ubHknLCAnYXJpYS1saXZlJzogJ2Fzc2VydGl2ZScgfSxcblx0XHRcdFx0XHR0aGlzLnByb3BzLmJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZS5yZXBsYWNlKCd7bGFiZWx9JywgdmFsdWVBcnJheVt2YWx1ZUFycmF5Lmxlbmd0aCAtIDFdW3RoaXMucHJvcHMubGFiZWxLZXldKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdHsgcmVmOiBmdW5jdGlvbiByZWYoX3JlZjcpIHtcblx0XHRcdFx0XHRcdHJldHVybiBfdGhpczkud3JhcHBlciA9IF9yZWY3O1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiBjbGFzc05hbWUsXG5cdFx0XHRcdFx0c3R5bGU6IHRoaXMucHJvcHMud3JhcHBlclN0eWxlIH0sXG5cdFx0XHRcdHRoaXMucmVuZGVySGlkZGVuRmllbGQodmFsdWVBcnJheSksXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdFx0eyByZWY6IGZ1bmN0aW9uIHJlZihfcmVmNikge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXM5LmNvbnRyb2wgPSBfcmVmNjtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdTZWxlY3QtY29udHJvbCcsXG5cdFx0XHRcdFx0XHRvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bixcblx0XHRcdFx0XHRcdG9uTW91c2VEb3duOiB0aGlzLmhhbmRsZU1vdXNlRG93bixcblx0XHRcdFx0XHRcdG9uVG91Y2hFbmQ6IHRoaXMuaGFuZGxlVG91Y2hFbmQsXG5cdFx0XHRcdFx0XHRvblRvdWNoTW92ZTogdGhpcy5oYW5kbGVUb3VjaE1vdmUsXG5cdFx0XHRcdFx0XHRvblRvdWNoU3RhcnQ6IHRoaXMuaGFuZGxlVG91Y2hTdGFydCxcblx0XHRcdFx0XHRcdHN0eWxlOiB0aGlzLnByb3BzLnN0eWxlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdFx0J3NwYW4nLFxuXHRcdFx0XHRcdFx0eyBjbGFzc05hbWU6ICdTZWxlY3QtbXVsdGktdmFsdWUtd3JhcHBlcicsIGlkOiB0aGlzLl9pbnN0YW5jZVByZWZpeCArICctdmFsdWUnIH0sXG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlclZhbHVlKHZhbHVlQXJyYXksIGlzT3BlbiksXG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlcklucHV0KHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb25JbmRleClcblx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdHJlbW92ZU1lc3NhZ2UsXG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJMb2FkaW5nKCksXG5cdFx0XHRcdFx0dGhpcy5yZW5kZXJDbGVhcigpLFxuXHRcdFx0XHRcdHRoaXMucmVuZGVyQXJyb3coKVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRpc09wZW4gPyB0aGlzLnJlbmRlck91dGVyKG9wdGlvbnMsIHZhbHVlQXJyYXksIGZvY3VzZWRPcHRpb24pIDogbnVsbFxuXHRcdFx0KTtcblx0XHR9XG5cdH1dKTtcblx0cmV0dXJuIFNlbGVjdDtcbn0oUmVhY3QuQ29tcG9uZW50KTtcblxuU2VsZWN0JDEucHJvcFR5cGVzID0ge1xuXHQnYXJpYS1kZXNjcmliZWRieSc6IFByb3BUeXBlcy5zdHJpbmcsIC8vIGh0bWwgaWQocykgb2YgZWxlbWVudChzKSB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIGRlc2NyaWJlIHRoaXMgaW5wdXQgKGZvciBhc3Npc3RpdmUgdGVjaClcblx0J2FyaWEtbGFiZWwnOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBhcmlhIGxhYmVsIChmb3IgYXNzaXN0aXZlIHRlY2gpXG5cdCdhcmlhLWxhYmVsbGVkYnknOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBodG1sIGlkIG9mIGFuIGVsZW1lbnQgdGhhdCBzaG91bGQgYmUgdXNlZCBhcyB0aGUgbGFiZWwgKGZvciBhc3Npc3RpdmUgdGVjaClcblx0YXJyb3dSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsIC8vIGNyZWF0ZSB0aGUgZHJvcC1kb3duIGNhcmV0IGVsZW1lbnRcblx0YXV0b0JsdXI6IFByb3BUeXBlcy5ib29sLCAvLyBhdXRvbWF0aWNhbGx5IGJsdXIgdGhlIGNvbXBvbmVudCB3aGVuIGFuIG9wdGlvbiBpcyBzZWxlY3RlZFxuXHRhdXRvRm9jdXM6IFByb3BUeXBlcy5ib29sLCAvLyBhdXRvZm9jdXMgdGhlIGNvbXBvbmVudCBvbiBtb3VudFxuXHRhdXRvZm9jdXM6IFByb3BUeXBlcy5ib29sLCAvLyBkZXByZWNhdGVkOyB1c2UgYXV0b0ZvY3VzIGluc3RlYWRcblx0YXV0b3NpemU6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIGVuYWJsZSBhdXRvc2l6aW5nIG9yIG5vdFxuXHRiYWNrc3BhY2VSZW1vdmVzOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciBiYWNrc3BhY2UgcmVtb3ZlcyBhbiBpdGVtIGlmIHRoZXJlIGlzIG5vIHRleHQgaW5wdXRcblx0YmFja3NwYWNlVG9SZW1vdmVNZXNzYWdlOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBtZXNzYWdlIHRvIHVzZSBmb3Igc2NyZWVucmVhZGVycyB0byBwcmVzcyBiYWNrc3BhY2UgdG8gcmVtb3ZlIHRoZSBjdXJyZW50IGl0ZW0gLSB7bGFiZWx9IGlzIHJlcGxhY2VkIHdpdGggdGhlIGl0ZW0gbGFiZWxcblx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBjbGFzc05hbWUgZm9yIHRoZSBvdXRlciBlbGVtZW50XG5cdGNsZWFyQWxsVGV4dDogc3RyaW5nT3JOb2RlLCAvLyB0aXRsZSBmb3IgdGhlIFwiY2xlYXJcIiBjb250cm9sIHdoZW4gbXVsdGk6IHRydWVcblx0Y2xlYXJSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsIC8vIGNyZWF0ZSBjbGVhcmFibGUgeCBlbGVtZW50XG5cdGNsZWFyVmFsdWVUZXh0OiBzdHJpbmdPck5vZGUsIC8vIHRpdGxlIGZvciB0aGUgXCJjbGVhclwiIGNvbnRyb2xcblx0Y2xlYXJhYmxlOiBQcm9wVHlwZXMuYm9vbCwgLy8gc2hvdWxkIGl0IGJlIHBvc3NpYmxlIHRvIHJlc2V0IHZhbHVlXG5cdGNsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIGNsb3NlIHRoZSBtZW51IHdoZW4gYSB2YWx1ZSBpcyBzZWxlY3RlZFxuXHRkZWxldGVSZW1vdmVzOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciBkZWxldGUgcmVtb3ZlcyBhbiBpdGVtIGlmIHRoZXJlIGlzIG5vIHRleHQgaW5wdXRcblx0ZGVsaW1pdGVyOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBkZWxpbWl0ZXIgdG8gdXNlIHRvIGpvaW4gbXVsdGlwbGUgdmFsdWVzIGZvciB0aGUgaGlkZGVuIGZpZWxkIHZhbHVlXG5cdGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciB0aGUgU2VsZWN0IGlzIGRpc2FibGVkIG9yIG5vdFxuXHRlc2NhcGVDbGVhcnNWYWx1ZTogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgZXNjYXBlIGNsZWFycyB0aGUgdmFsdWUgd2hlbiB0aGUgbWVudSBpcyBjbG9zZWRcblx0ZmlsdGVyT3B0aW9uOiBQcm9wVHlwZXMuZnVuYywgLy8gbWV0aG9kIHRvIGZpbHRlciBhIHNpbmdsZSBvcHRpb24gKG9wdGlvbiwgZmlsdGVyU3RyaW5nKVxuXHRmaWx0ZXJPcHRpb25zOiBQcm9wVHlwZXMuYW55LCAvLyBib29sZWFuIHRvIGVuYWJsZSBkZWZhdWx0IGZpbHRlcmluZyBvciBmdW5jdGlvbiB0byBmaWx0ZXIgdGhlIG9wdGlvbnMgYXJyYXkgKFtvcHRpb25zXSwgZmlsdGVyU3RyaW5nLCBbdmFsdWVzXSlcblx0aWQ6IFByb3BUeXBlcy5zdHJpbmcsIC8vIGh0bWwgaWQgdG8gc2V0IG9uIHRoZSBpbnB1dCBlbGVtZW50IGZvciBhY2Nlc3NpYmlsaXR5IG9yIHRlc3RzXG5cdGlnbm9yZUFjY2VudHM6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIHN0cmlwIGRpYWNyaXRpY3Mgd2hlbiBmaWx0ZXJpbmdcblx0aWdub3JlQ2FzZTogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgdG8gcGVyZm9ybSBjYXNlLWluc2Vuc2l0aXZlIGZpbHRlcmluZ1xuXHRpbnB1dFByb3BzOiBQcm9wVHlwZXMub2JqZWN0LCAvLyBjdXN0b20gYXR0cmlidXRlcyBmb3IgdGhlIElucHV0XG5cdGlucHV0UmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAvLyByZXR1cm5zIGEgY3VzdG9tIGlucHV0IGNvbXBvbmVudFxuXHRpbnN0YW5jZUlkOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBzZXQgdGhlIGNvbXBvbmVudHMgaW5zdGFuY2VJZFxuXHRpc0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRoZSBTZWxlY3QgaXMgbG9hZGluZyBleHRlcm5hbGx5IG9yIG5vdCAoc3VjaCBhcyBvcHRpb25zIGJlaW5nIGxvYWRlZClcblx0am9pblZhbHVlczogUHJvcFR5cGVzLmJvb2wsIC8vIGpvaW5zIG11bHRpcGxlIHZhbHVlcyBpbnRvIGEgc2luZ2xlIGZvcm0gZmllbGQgd2l0aCB0aGUgZGVsaW1pdGVyIChsZWdhY3kgbW9kZSlcblx0bGFiZWxLZXk6IFByb3BUeXBlcy5zdHJpbmcsIC8vIHBhdGggb2YgdGhlIGxhYmVsIHZhbHVlIGluIG9wdGlvbiBvYmplY3RzXG5cdG1hdGNoUG9zOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyAoYW55fHN0YXJ0KSBtYXRjaCB0aGUgc3RhcnQgb3IgZW50aXJlIHN0cmluZyB3aGVuIGZpbHRlcmluZ1xuXHRtYXRjaFByb3A6IFByb3BUeXBlcy5zdHJpbmcsIC8vIChhbnl8bGFiZWx8dmFsdWUpIHdoaWNoIG9wdGlvbiBwcm9wZXJ0eSB0byBmaWx0ZXIgb25cblx0bWVudUJ1ZmZlcjogUHJvcFR5cGVzLm51bWJlciwgLy8gb3B0aW9uYWwgYnVmZmVyIChpbiBweCkgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCBhbmQgdGhlIGJvdHRvbSBvZiB0aGUgbWVudVxuXHRtZW51Q29udGFpbmVyU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsIC8vIG9wdGlvbmFsIHN0eWxlIHRvIGFwcGx5IHRvIHRoZSBtZW51IGNvbnRhaW5lclxuXHRtZW51UmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLCAvLyByZW5kZXJzIGEgY3VzdG9tIG1lbnUgd2l0aCBvcHRpb25zXG5cdG1lbnVTdHlsZTogUHJvcFR5cGVzLm9iamVjdCwgLy8gb3B0aW9uYWwgc3R5bGUgdG8gYXBwbHkgdG8gdGhlIG1lbnVcblx0bXVsdGk6IFByb3BUeXBlcy5ib29sLCAvLyBtdWx0aS12YWx1ZSBpbnB1dFxuXHRuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBnZW5lcmF0ZXMgYSBoaWRkZW4gPGlucHV0IC8+IHRhZyB3aXRoIHRoaXMgZmllbGQgbmFtZSBmb3IgaHRtbCBmb3Jtc1xuXHRub1Jlc3VsdHNUZXh0OiBzdHJpbmdPck5vZGUsIC8vIHBsYWNlaG9sZGVyIGRpc3BsYXllZCB3aGVuIHRoZXJlIGFyZSBubyBtYXRjaGluZyBzZWFyY2ggcmVzdWx0c1xuXHRvbkJsdXI6IFByb3BUeXBlcy5mdW5jLCAvLyBvbkJsdXIgaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxuXHRvbkJsdXJSZXNldHNJbnB1dDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgaW5wdXQgaXMgY2xlYXJlZCBvbiBibHVyXG5cdG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYywgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24gKG5ld1ZhbHVlKSB7fVxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYywgLy8gZmlyZXMgd2hlbiB0aGUgbWVudSBpcyBjbG9zZWRcblx0b25DbG9zZVJlc2V0c0lucHV0OiBQcm9wVHlwZXMuYm9vbCwgLy8gd2hldGhlciBpbnB1dCBpcyBjbGVhcmVkIHdoZW4gbWVudSBpcyBjbG9zZWQgdGhyb3VnaCB0aGUgYXJyb3dcblx0b25Gb2N1czogUHJvcFR5cGVzLmZ1bmMsIC8vIG9uRm9jdXMgaGFuZGxlcjogZnVuY3Rpb24gKGV2ZW50KSB7fVxuXHRvbklucHV0Q2hhbmdlOiBQcm9wVHlwZXMuZnVuYywgLy8gb25JbnB1dENoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAoaW5wdXRWYWx1ZSkge31cblx0b25JbnB1dEtleURvd246IFByb3BUeXBlcy5mdW5jLCAvLyBpbnB1dCBrZXlEb3duIGhhbmRsZXI6IGZ1bmN0aW9uIChldmVudCkge31cblx0b25NZW51U2Nyb2xsVG9Cb3R0b206IFByb3BUeXBlcy5mdW5jLCAvLyBmaXJlcyB3aGVuIHRoZSBtZW51IGlzIHNjcm9sbGVkIHRvIHRoZSBib3R0b207IGNhbiBiZSB1c2VkIHRvIHBhZ2luYXRlIG9wdGlvbnNcblx0b25PcGVuOiBQcm9wVHlwZXMuZnVuYywgLy8gZmlyZXMgd2hlbiB0aGUgbWVudSBpcyBvcGVuZWRcblx0b25TZWxlY3RSZXNldHNJbnB1dDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgaW5wdXQgaXMgY2xlYXJlZCBvbiBzZWxlY3QgKHdvcmtzIG9ubHkgZm9yIG11bHRpc2VsZWN0KVxuXHRvblZhbHVlQ2xpY2s6IFByb3BUeXBlcy5mdW5jLCAvLyBvbkNsaWNrIGhhbmRsZXIgZm9yIHZhbHVlIGxhYmVsczogZnVuY3Rpb24gKHZhbHVlLCBldmVudCkge31cblx0b3Blbk9uQ2xpY2s6IFByb3BUeXBlcy5ib29sLCAvLyBib29sZWFuIHRvIGNvbnRyb2wgb3BlbmluZyB0aGUgbWVudSB3aGVuIHRoZSBjb250cm9sIGlzIGNsaWNrZWRcblx0b3Blbk9uRm9jdXM6IFByb3BUeXBlcy5ib29sLCAvLyBhbHdheXMgb3BlbiBvcHRpb25zIG1lbnUgb24gZm9jdXNcblx0b3B0aW9uQ2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLCAvLyBhZGRpdGlvbmFsIGNsYXNzKGVzKSB0byBhcHBseSB0byB0aGUgPE9wdGlvbiAvPiBlbGVtZW50c1xuXHRvcHRpb25Db21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLCAvLyBvcHRpb24gY29tcG9uZW50IHRvIHJlbmRlciBpbiBkcm9wZG93blxuXHRvcHRpb25SZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsIC8vIG9wdGlvblJlbmRlcmVyOiBmdW5jdGlvbiAob3B0aW9uKSB7fVxuXHRvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXksIC8vIGFycmF5IG9mIG9wdGlvbnNcblx0cGFnZVNpemU6IFByb3BUeXBlcy5udW1iZXIsIC8vIG51bWJlciBvZiBlbnRyaWVzIHRvIHBhZ2Ugd2hlbiB1c2luZyBwYWdlIHVwL2Rvd24ga2V5c1xuXHRwbGFjZWhvbGRlcjogc3RyaW5nT3JOb2RlLCAvLyBmaWVsZCBwbGFjZWhvbGRlciwgZGlzcGxheWVkIHdoZW4gdGhlcmUncyBubyB2YWx1ZVxuXHRyZW1vdmVTZWxlY3RlZDogUHJvcFR5cGVzLmJvb2wsIC8vIHdoZXRoZXIgdGhlIHNlbGVjdGVkIG9wdGlvbiBpcyByZW1vdmVkIGZyb20gdGhlIGRyb3Bkb3duIG9uIG11bHRpIHNlbGVjdHNcblx0cmVxdWlyZWQ6IFByb3BUeXBlcy5ib29sLCAvLyBhcHBsaWVzIEhUTUw1IHJlcXVpcmVkIGF0dHJpYnV0ZSB3aGVuIG5lZWRlZFxuXHRyZXNldFZhbHVlOiBQcm9wVHlwZXMuYW55LCAvLyB2YWx1ZSB0byB1c2Ugd2hlbiB5b3UgY2xlYXIgdGhlIGNvbnRyb2xcblx0cnRsOiBQcm9wVHlwZXMuYm9vbCwgLy8gc2V0IHRvIHRydWUgaW4gb3JkZXIgdG8gdXNlIHJlYWN0LXNlbGVjdCBpbiByaWdodC10by1sZWZ0IGRpcmVjdGlvblxuXHRzY3JvbGxNZW51SW50b1ZpZXc6IFByb3BUeXBlcy5ib29sLCAvLyBib29sZWFuIHRvIGVuYWJsZSB0aGUgdmlld3BvcnQgdG8gc2hpZnQgc28gdGhhdCB0aGUgZnVsbCBtZW51IGZ1bGx5IHZpc2libGUgd2hlbiBlbmdhZ2VkXG5cdHNlYXJjaGFibGU6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIGVuYWJsZSBzZWFyY2hpbmcgZmVhdHVyZSBvciBub3Rcblx0c2ltcGxlVmFsdWU6IFByb3BUeXBlcy5ib29sLCAvLyBwYXNzIHRoZSB2YWx1ZSB0byBvbkNoYW5nZSBhcyBhIHNpbXBsZSB2YWx1ZSAobGVnYWN5IHByZSAxLjAgbW9kZSksIGRlZmF1bHRzIHRvIGZhbHNlXG5cdHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LCAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgY29udHJvbFxuXHR0YWJJbmRleDogc3RyaW5nT3JOdW1iZXIsIC8vIG9wdGlvbmFsIHRhYiBpbmRleCBvZiB0aGUgY29udHJvbFxuXHR0YWJTZWxlY3RzVmFsdWU6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIHRyZWF0IHRhYmJpbmcgb3V0IHdoaWxlIGZvY3VzZWQgdG8gYmUgdmFsdWUgc2VsZWN0aW9uXG5cdHRyaW1GaWx0ZXI6IFByb3BUeXBlcy5ib29sLCAvLyB3aGV0aGVyIHRvIHRyaW0gd2hpdGVzcGFjZSBhcm91bmQgZmlsdGVyIHZhbHVlXG5cdHZhbHVlOiBQcm9wVHlwZXMuYW55LCAvLyBpbml0aWFsIGZpZWxkIHZhbHVlXG5cdHZhbHVlQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYywgLy8gdmFsdWUgY29tcG9uZW50IHRvIHJlbmRlclxuXHR2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZywgLy8gcGF0aCBvZiB0aGUgbGFiZWwgdmFsdWUgaW4gb3B0aW9uIG9iamVjdHNcblx0dmFsdWVSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsIC8vIHZhbHVlUmVuZGVyZXI6IGZ1bmN0aW9uIChvcHRpb24pIHt9XG5cdHdyYXBwZXJTdHlsZTogUHJvcFR5cGVzLm9iamVjdCAvLyBvcHRpb25hbCBzdHlsZSB0byBhcHBseSB0byB0aGUgY29tcG9uZW50IHdyYXBwZXJcbn07XG5cblNlbGVjdCQxLmRlZmF1bHRQcm9wcyA9IHtcblx0YXJyb3dSZW5kZXJlcjogYXJyb3dSZW5kZXJlcixcblx0YXV0b3NpemU6IHRydWUsXG5cdGJhY2tzcGFjZVJlbW92ZXM6IHRydWUsXG5cdGJhY2tzcGFjZVRvUmVtb3ZlTWVzc2FnZTogJ1ByZXNzIGJhY2tzcGFjZSB0byByZW1vdmUge2xhYmVsfScsXG5cdGNsZWFyYWJsZTogdHJ1ZSxcblx0Y2xlYXJBbGxUZXh0OiAnQ2xlYXIgYWxsJyxcblx0Y2xlYXJSZW5kZXJlcjogY2xlYXJSZW5kZXJlcixcblx0Y2xlYXJWYWx1ZVRleHQ6ICdDbGVhciB2YWx1ZScsXG5cdGNsb3NlT25TZWxlY3Q6IHRydWUsXG5cdGRlbGV0ZVJlbW92ZXM6IHRydWUsXG5cdGRlbGltaXRlcjogJywnLFxuXHRkaXNhYmxlZDogZmFsc2UsXG5cdGVzY2FwZUNsZWFyc1ZhbHVlOiB0cnVlLFxuXHRmaWx0ZXJPcHRpb25zOiBmaWx0ZXJPcHRpb25zLFxuXHRpZ25vcmVBY2NlbnRzOiB0cnVlLFxuXHRpZ25vcmVDYXNlOiB0cnVlLFxuXHRpbnB1dFByb3BzOiB7fSxcblx0aXNMb2FkaW5nOiBmYWxzZSxcblx0am9pblZhbHVlczogZmFsc2UsXG5cdGxhYmVsS2V5OiAnbGFiZWwnLFxuXHRtYXRjaFBvczogJ2FueScsXG5cdG1hdGNoUHJvcDogJ2FueScsXG5cdG1lbnVCdWZmZXI6IDAsXG5cdG1lbnVSZW5kZXJlcjogbWVudVJlbmRlcmVyLFxuXHRtdWx0aTogZmFsc2UsXG5cdG5vUmVzdWx0c1RleHQ6ICdObyByZXN1bHRzIGZvdW5kJyxcblx0b25CbHVyUmVzZXRzSW5wdXQ6IHRydWUsXG5cdG9uQ2xvc2VSZXNldHNJbnB1dDogdHJ1ZSxcblx0b25TZWxlY3RSZXNldHNJbnB1dDogdHJ1ZSxcblx0b3Blbk9uQ2xpY2s6IHRydWUsXG5cdG9wdGlvbkNvbXBvbmVudDogT3B0aW9uLFxuXHRwYWdlU2l6ZTogNSxcblx0cGxhY2Vob2xkZXI6ICdTZWxlY3QuLi4nLFxuXHRyZW1vdmVTZWxlY3RlZDogdHJ1ZSxcblx0cmVxdWlyZWQ6IGZhbHNlLFxuXHRydGw6IGZhbHNlLFxuXHRzY3JvbGxNZW51SW50b1ZpZXc6IHRydWUsXG5cdHNlYXJjaGFibGU6IHRydWUsXG5cdHNpbXBsZVZhbHVlOiBmYWxzZSxcblx0dGFiU2VsZWN0c1ZhbHVlOiB0cnVlLFxuXHR0cmltRmlsdGVyOiB0cnVlLFxuXHR2YWx1ZUNvbXBvbmVudDogVmFsdWUsXG5cdHZhbHVlS2V5OiAndmFsdWUnXG59O1xuXG52YXIgcHJvcFR5cGVzID0ge1xuXHRhdXRvbG9hZDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCwgLy8gYXV0b21hdGljYWxseSBjYWxsIHRoZSBgbG9hZE9wdGlvbnNgIHByb3Agb24tbW91bnQ7IGRlZmF1bHRzIHRvIHRydWVcblx0Y2FjaGU6IFByb3BUeXBlcy5hbnksIC8vIG9iamVjdCB0byB1c2UgdG8gY2FjaGUgcmVzdWx0czsgc2V0IHRvIG51bGwvZmFsc2UgdG8gZGlzYWJsZSBjYWNoaW5nXG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLCAvLyBDaGlsZCBmdW5jdGlvbiByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIGlubmVyIFNlbGVjdCBjb21wb25lbnQ7IChwcm9wczogT2JqZWN0KTogUHJvcFR5cGVzLmVsZW1lbnRcblx0aWdub3JlQWNjZW50czogUHJvcFR5cGVzLmJvb2wsIC8vIHN0cmlwIGRpYWNyaXRpY3Mgd2hlbiBmaWx0ZXJpbmc7IGRlZmF1bHRzIHRvIHRydWVcblx0aWdub3JlQ2FzZTogUHJvcFR5cGVzLmJvb2wsIC8vIHBlcmZvcm0gY2FzZS1pbnNlbnNpdGl2ZSBmaWx0ZXJpbmc7IGRlZmF1bHRzIHRvIHRydWVcblx0bG9hZE9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsIC8vIGNhbGxiYWNrIHRvIGxvYWQgb3B0aW9ucyBhc3luY2hyb25vdXNseTsgKGlucHV0VmFsdWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogP1Byb21pc2Vcblx0bG9hZGluZ1BsYWNlaG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFsvLyByZXBsYWNlcyB0aGUgcGxhY2Vob2xkZXIgd2hpbGUgb3B0aW9ucyBhcmUgbG9hZGluZ1xuXHRQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuXHRtdWx0aTogUHJvcFR5cGVzLmJvb2wsIC8vIG11bHRpLXZhbHVlIGlucHV0XG5cdG5vUmVzdWx0c1RleHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoWy8vIGZpZWxkIG5vUmVzdWx0c1RleHQsIGRpc3BsYXllZCB3aGVuIG5vIG9wdGlvbnMgY29tZSBiYWNrIGZyb20gdGhlIHNlcnZlclxuXHRQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLFxuXHRvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsIC8vIG9uQ2hhbmdlIGhhbmRsZXI6IGZ1bmN0aW9uIChuZXdWYWx1ZSkge31cblx0b25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsIC8vIG9wdGlvbmFsIGZvciBrZWVwaW5nIHRyYWNrIG9mIHdoYXQgaXMgYmVpbmcgdHlwZWRcblx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsIC8vIGFycmF5IG9mIG9wdGlvbnNcblx0cGxhY2Vob2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoWy8vIGZpZWxkIHBsYWNlaG9sZGVyLCBkaXNwbGF5ZWQgd2hlbiB0aGVyZSdzIG5vIHZhbHVlIChzaGFyZWQgd2l0aCBTZWxlY3QpXG5cdFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG5cdHNlYXJjaFByb21wdFRleHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoWy8vIGxhYmVsIHRvIHByb21wdCBmb3Igc2VhcmNoIGlucHV0XG5cdFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSksXG5cdHZhbHVlOiBQcm9wVHlwZXMuYW55IC8vIGluaXRpYWwgZmllbGQgdmFsdWVcbn07XG5cbnZhciBkZWZhdWx0Q2FjaGUgPSB7fTtcblxudmFyIGRlZmF1bHRDaGlsZHJlbiA9IGZ1bmN0aW9uIGRlZmF1bHRDaGlsZHJlbihwcm9wcykge1xuXHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QkMSwgcHJvcHMpO1xufTtcblxudmFyIGRlZmF1bHRQcm9wcyA9IHtcblx0YXV0b2xvYWQ6IHRydWUsXG5cdGNhY2hlOiBkZWZhdWx0Q2FjaGUsXG5cdGNoaWxkcmVuOiBkZWZhdWx0Q2hpbGRyZW4sXG5cdGlnbm9yZUFjY2VudHM6IHRydWUsXG5cdGlnbm9yZUNhc2U6IHRydWUsXG5cdGxvYWRpbmdQbGFjZWhvbGRlcjogJ0xvYWRpbmcuLi4nLFxuXHRvcHRpb25zOiBbXSxcblx0c2VhcmNoUHJvbXB0VGV4dDogJ1R5cGUgdG8gc2VhcmNoJ1xufTtcblxudmFyIEFzeW5jID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcblx0aW5oZXJpdHMoQXN5bmMsIF9Db21wb25lbnQpO1xuXG5cdGZ1bmN0aW9uIEFzeW5jKHByb3BzLCBjb250ZXh0KSB7XG5cdFx0Y2xhc3NDYWxsQ2hlY2sodGhpcywgQXN5bmMpO1xuXG5cdFx0dmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQXN5bmMuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihBc3luYykpLmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuXHRcdF90aGlzLl9jYWNoZSA9IHByb3BzLmNhY2hlID09PSBkZWZhdWx0Q2FjaGUgPyB7fSA6IHByb3BzLmNhY2hlO1xuXG5cdFx0X3RoaXMuc3RhdGUgPSB7XG5cdFx0XHRpbnB1dFZhbHVlOiAnJyxcblx0XHRcdGlzTG9hZGluZzogZmFsc2UsXG5cdFx0XHRvcHRpb25zOiBwcm9wcy5vcHRpb25zXG5cdFx0fTtcblxuXHRcdF90aGlzLm9uSW5wdXRDaGFuZ2UgPSBfdGhpcy5vbklucHV0Q2hhbmdlLmJpbmQoX3RoaXMpO1xuXHRcdHJldHVybiBfdGhpcztcblx0fVxuXG5cdGNyZWF0ZUNsYXNzKEFzeW5jLCBbe1xuXHRcdGtleTogJ2NvbXBvbmVudERpZE1vdW50Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0XHR2YXIgYXV0b2xvYWQgPSB0aGlzLnByb3BzLmF1dG9sb2FkO1xuXG5cblx0XHRcdGlmIChhdXRvbG9hZCkge1xuXHRcdFx0XHR0aGlzLmxvYWRPcHRpb25zKCcnKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcblx0XHRcdGlmIChuZXh0UHJvcHMub3B0aW9ucyAhPT0gdGhpcy5wcm9wcy5vcHRpb25zKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdG9wdGlvbnM6IG5leHRQcm9wcy5vcHRpb25zXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2NvbXBvbmVudFdpbGxVbm1vdW50Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0XHR0aGlzLl9jYWxsYmFjayA9IG51bGw7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnbG9hZE9wdGlvbnMnLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiBsb2FkT3B0aW9ucyhpbnB1dFZhbHVlKSB7XG5cdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0dmFyIGxvYWRPcHRpb25zID0gdGhpcy5wcm9wcy5sb2FkT3B0aW9ucztcblxuXHRcdFx0dmFyIGNhY2hlID0gdGhpcy5fY2FjaGU7XG5cblx0XHRcdGlmIChjYWNoZSAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIGlucHV0VmFsdWUpKSB7XG5cdFx0XHRcdHRoaXMuX2NhbGxiYWNrID0gbnVsbDtcblxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHRcdG9wdGlvbnM6IGNhY2hlW2lucHV0VmFsdWVdXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gY2FsbGJhY2soZXJyb3IsIGRhdGEpIHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSBkYXRhICYmIGRhdGEub3B0aW9ucyB8fCBbXTtcblxuXHRcdFx0XHRpZiAoY2FjaGUpIHtcblx0XHRcdFx0XHRjYWNoZVtpbnB1dFZhbHVlXSA9IG9wdGlvbnM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY2FsbGJhY2sgPT09IF90aGlzMi5fY2FsbGJhY2spIHtcblx0XHRcdFx0XHRfdGhpczIuX2NhbGxiYWNrID0gbnVsbDtcblxuXHRcdFx0XHRcdF90aGlzMi5zZXRTdGF0ZSh7XG5cdFx0XHRcdFx0XHRpc0xvYWRpbmc6IGZhbHNlLFxuXHRcdFx0XHRcdFx0b3B0aW9uczogb3B0aW9uc1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBJZ25vcmUgYWxsIGJ1dCB0aGUgbW9zdCByZWNlbnQgcmVxdWVzdFxuXHRcdFx0dGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdFx0dmFyIHByb21pc2UgPSBsb2FkT3B0aW9ucyhpbnB1dFZhbHVlLCBjYWxsYmFjayk7XG5cdFx0XHRpZiAocHJvbWlzZSkge1xuXHRcdFx0XHRwcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2sobnVsbCwgZGF0YSk7XG5cdFx0XHRcdH0sIGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjayhlcnJvcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fY2FsbGJhY2sgJiYgIXRoaXMuc3RhdGUuaXNMb2FkaW5nKSB7XG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRcdGlzTG9hZGluZzogdHJ1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdvbklucHV0Q2hhbmdlJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gb25JbnB1dENoYW5nZShpbnB1dFZhbHVlKSB7XG5cdFx0XHR2YXIgX3Byb3BzID0gdGhpcy5wcm9wcyxcblx0XHRcdCAgICBpZ25vcmVBY2NlbnRzID0gX3Byb3BzLmlnbm9yZUFjY2VudHMsXG5cdFx0XHQgICAgaWdub3JlQ2FzZSA9IF9wcm9wcy5pZ25vcmVDYXNlLFxuXHRcdFx0ICAgIG9uSW5wdXRDaGFuZ2UgPSBfcHJvcHMub25JbnB1dENoYW5nZTtcblxuXHRcdFx0dmFyIG5ld0lucHV0VmFsdWUgPSBpbnB1dFZhbHVlO1xuXG5cdFx0XHRpZiAob25JbnB1dENoYW5nZSkge1xuXHRcdFx0XHR2YXIgdmFsdWUgPSBvbklucHV0Q2hhbmdlKG5ld0lucHV0VmFsdWUpO1xuXHRcdFx0XHQvLyBOb3RlOiAhPSB1c2VkIGRlbGliZXJhdGVseSBoZXJlIHRvIGNhdGNoIHVuZGVmaW5lZCBhbmQgbnVsbFxuXHRcdFx0XHRpZiAodmFsdWUgIT0gbnVsbCAmJiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdG5ld0lucHV0VmFsdWUgPSAnJyArIHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHZhciB0cmFuc2Zvcm1lZElucHV0VmFsdWUgPSBuZXdJbnB1dFZhbHVlO1xuXG5cdFx0XHRpZiAoaWdub3JlQWNjZW50cykge1xuXHRcdFx0XHR0cmFuc2Zvcm1lZElucHV0VmFsdWUgPSBzdHJpcERpYWNyaXRpY3ModHJhbnNmb3JtZWRJbnB1dFZhbHVlKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlnbm9yZUNhc2UpIHtcblx0XHRcdFx0dHJhbnNmb3JtZWRJbnB1dFZhbHVlID0gdHJhbnNmb3JtZWRJbnB1dFZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2V0U3RhdGUoeyBpbnB1dFZhbHVlOiBuZXdJbnB1dFZhbHVlIH0pO1xuXHRcdFx0dGhpcy5sb2FkT3B0aW9ucyh0cmFuc2Zvcm1lZElucHV0VmFsdWUpO1xuXG5cdFx0XHQvLyBSZXR1cm4gbmV3IGlucHV0IHZhbHVlLCBidXQgd2l0aG91dCBhcHBseWluZyB0b0xvd2VyQ2FzZSgpIHRvIGF2b2lkIG1vZGlmeWluZyB0aGUgdXNlcidzIHZpZXcgY2FzZSBvZiB0aGUgaW5wdXQgd2hpbGUgdHlwaW5nLlxuXHRcdFx0cmV0dXJuIG5ld0lucHV0VmFsdWU7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnbm9SZXN1bHRzVGV4dCcsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG5vUmVzdWx0c1RleHQoKSB7XG5cdFx0XHR2YXIgX3Byb3BzMiA9IHRoaXMucHJvcHMsXG5cdFx0XHQgICAgbG9hZGluZ1BsYWNlaG9sZGVyID0gX3Byb3BzMi5sb2FkaW5nUGxhY2Vob2xkZXIsXG5cdFx0XHQgICAgbm9SZXN1bHRzVGV4dCA9IF9wcm9wczIubm9SZXN1bHRzVGV4dCxcblx0XHRcdCAgICBzZWFyY2hQcm9tcHRUZXh0ID0gX3Byb3BzMi5zZWFyY2hQcm9tcHRUZXh0O1xuXHRcdFx0dmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGUsXG5cdFx0XHQgICAgaW5wdXRWYWx1ZSA9IF9zdGF0ZS5pbnB1dFZhbHVlLFxuXHRcdFx0ICAgIGlzTG9hZGluZyA9IF9zdGF0ZS5pc0xvYWRpbmc7XG5cblxuXHRcdFx0aWYgKGlzTG9hZGluZykge1xuXHRcdFx0XHRyZXR1cm4gbG9hZGluZ1BsYWNlaG9sZGVyO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGlucHV0VmFsdWUgJiYgbm9SZXN1bHRzVGV4dCkge1xuXHRcdFx0XHRyZXR1cm4gbm9SZXN1bHRzVGV4dDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzZWFyY2hQcm9tcHRUZXh0O1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ2ZvY3VzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXMoKSB7XG5cdFx0XHR0aGlzLnNlbGVjdC5mb2N1cygpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHZhciBfdGhpczMgPSB0aGlzO1xuXG5cdFx0XHR2YXIgX3Byb3BzMyA9IHRoaXMucHJvcHMsXG5cdFx0XHQgICAgY2hpbGRyZW4gPSBfcHJvcHMzLmNoaWxkcmVuLFxuXHRcdFx0ICAgIGxvYWRpbmdQbGFjZWhvbGRlciA9IF9wcm9wczMubG9hZGluZ1BsYWNlaG9sZGVyLFxuXHRcdFx0ICAgIHBsYWNlaG9sZGVyID0gX3Byb3BzMy5wbGFjZWhvbGRlcjtcblx0XHRcdHZhciBfc3RhdGUyID0gdGhpcy5zdGF0ZSxcblx0XHRcdCAgICBpc0xvYWRpbmcgPSBfc3RhdGUyLmlzTG9hZGluZyxcblx0XHRcdCAgICBvcHRpb25zID0gX3N0YXRlMi5vcHRpb25zO1xuXG5cblx0XHRcdHZhciBwcm9wcyA9IHtcblx0XHRcdFx0bm9SZXN1bHRzVGV4dDogdGhpcy5ub1Jlc3VsdHNUZXh0KCksXG5cdFx0XHRcdHBsYWNlaG9sZGVyOiBpc0xvYWRpbmcgPyBsb2FkaW5nUGxhY2Vob2xkZXIgOiBwbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogaXNMb2FkaW5nICYmIGxvYWRpbmdQbGFjZWhvbGRlciA/IFtdIDogb3B0aW9ucyxcblx0XHRcdFx0cmVmOiBmdW5jdGlvbiByZWYoX3JlZikge1xuXHRcdFx0XHRcdHJldHVybiBfdGhpczMuc2VsZWN0ID0gX3JlZjtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0cmV0dXJuIGNoaWxkcmVuKF9leHRlbmRzKHt9LCB0aGlzLnByb3BzLCBwcm9wcywge1xuXHRcdFx0XHRpc0xvYWRpbmc6IGlzTG9hZGluZyxcblx0XHRcdFx0b25JbnB1dENoYW5nZTogdGhpcy5vbklucHV0Q2hhbmdlXG5cdFx0XHR9KSk7XG5cdFx0fVxuXHR9XSk7XG5cdHJldHVybiBBc3luYztcbn0oQ29tcG9uZW50KTtcblxuQXN5bmMucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuQXN5bmMuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuXG52YXIgQ3JlYXRhYmxlU2VsZWN0ID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcblx0aW5oZXJpdHMoQ3JlYXRhYmxlU2VsZWN0LCBfUmVhY3QkQ29tcG9uZW50KTtcblxuXHRmdW5jdGlvbiBDcmVhdGFibGVTZWxlY3QocHJvcHMsIGNvbnRleHQpIHtcblx0XHRjbGFzc0NhbGxDaGVjayh0aGlzLCBDcmVhdGFibGVTZWxlY3QpO1xuXG5cdFx0dmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ3JlYXRhYmxlU2VsZWN0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ3JlYXRhYmxlU2VsZWN0KSkuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG5cdFx0X3RoaXMuZmlsdGVyT3B0aW9ucyA9IF90aGlzLmZpbHRlck9wdGlvbnMuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMubWVudVJlbmRlcmVyID0gX3RoaXMubWVudVJlbmRlcmVyLmJpbmQoX3RoaXMpO1xuXHRcdF90aGlzLm9uSW5wdXRLZXlEb3duID0gX3RoaXMub25JbnB1dEtleURvd24uYmluZChfdGhpcyk7XG5cdFx0X3RoaXMub25JbnB1dENoYW5nZSA9IF90aGlzLm9uSW5wdXRDaGFuZ2UuYmluZChfdGhpcyk7XG5cdFx0X3RoaXMub25PcHRpb25TZWxlY3QgPSBfdGhpcy5vbk9wdGlvblNlbGVjdC5iaW5kKF90aGlzKTtcblx0XHRyZXR1cm4gX3RoaXM7XG5cdH1cblxuXHRjcmVhdGVDbGFzcyhDcmVhdGFibGVTZWxlY3QsIFt7XG5cdFx0a2V5OiAnY3JlYXRlTmV3T3B0aW9uJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gY3JlYXRlTmV3T3B0aW9uKCkge1xuXHRcdFx0dmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG5cdFx0XHQgICAgaXNWYWxpZE5ld09wdGlvbiA9IF9wcm9wcy5pc1ZhbGlkTmV3T3B0aW9uLFxuXHRcdFx0ICAgIG5ld09wdGlvbkNyZWF0b3IgPSBfcHJvcHMubmV3T3B0aW9uQ3JlYXRvcixcblx0XHRcdCAgICBvbk5ld09wdGlvbkNsaWNrID0gX3Byb3BzLm9uTmV3T3B0aW9uQ2xpY2ssXG5cdFx0XHQgICAgX3Byb3BzJG9wdGlvbnMgPSBfcHJvcHMub3B0aW9ucyxcblx0XHRcdCAgICBvcHRpb25zID0gX3Byb3BzJG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/IFtdIDogX3Byb3BzJG9wdGlvbnM7XG5cblxuXHRcdFx0aWYgKGlzVmFsaWROZXdPcHRpb24oeyBsYWJlbDogdGhpcy5pbnB1dFZhbHVlIH0pKSB7XG5cdFx0XHRcdHZhciBvcHRpb24gPSBuZXdPcHRpb25DcmVhdG9yKHsgbGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSwgbGFiZWxLZXk6IHRoaXMubGFiZWxLZXksIHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5IH0pO1xuXHRcdFx0XHR2YXIgX2lzT3B0aW9uVW5pcXVlID0gdGhpcy5pc09wdGlvblVuaXF1ZSh7IG9wdGlvbjogb3B0aW9uLCBvcHRpb25zOiBvcHRpb25zIH0pO1xuXG5cdFx0XHRcdC8vIERvbid0IGFkZCB0aGUgc2FtZSBvcHRpb24gdHdpY2UuXG5cdFx0XHRcdGlmIChfaXNPcHRpb25VbmlxdWUpIHtcblx0XHRcdFx0XHRpZiAob25OZXdPcHRpb25DbGljaykge1xuXHRcdFx0XHRcdFx0b25OZXdPcHRpb25DbGljayhvcHRpb24pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRvcHRpb25zLnVuc2hpZnQob3B0aW9uKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5zZWxlY3Quc2VsZWN0VmFsdWUob3B0aW9uKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmaWx0ZXJPcHRpb25zJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZmlsdGVyT3B0aW9ucyQkMSgpIHtcblx0XHRcdHZhciBfcHJvcHMyID0gdGhpcy5wcm9wcyxcblx0XHRcdCAgICBmaWx0ZXJPcHRpb25zJCQxID0gX3Byb3BzMi5maWx0ZXJPcHRpb25zLFxuXHRcdFx0ICAgIGlzVmFsaWROZXdPcHRpb24gPSBfcHJvcHMyLmlzVmFsaWROZXdPcHRpb24sXG5cdFx0XHQgICAgcHJvbXB0VGV4dENyZWF0b3IgPSBfcHJvcHMyLnByb21wdFRleHRDcmVhdG9yO1xuXG5cdFx0XHQvLyBUUklDS1kgQ2hlY2sgY3VycmVudGx5IHNlbGVjdGVkIG9wdGlvbnMgYXMgd2VsbC5cblx0XHRcdC8vIERvbid0IGRpc3BsYXkgYSBjcmVhdGUtcHJvbXB0IGZvciBhIHZhbHVlIHRoYXQncyBzZWxlY3RlZC5cblx0XHRcdC8vIFRoaXMgY292ZXJzIGFzeW5jIGVkZ2UtY2FzZXMgd2hlcmUgYSBuZXdseS1jcmVhdGVkIE9wdGlvbiBpc24ndCB5ZXQgaW4gdGhlIGFzeW5jLWxvYWRlZCBhcnJheS5cblxuXHRcdFx0dmFyIGV4Y2x1ZGVPcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGggPD0gMiA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1syXSkgfHwgW107XG5cblx0XHRcdHZhciBmaWx0ZXJlZE9wdGlvbnMgPSBmaWx0ZXJPcHRpb25zJCQxLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKSB8fCBbXTtcblxuXHRcdFx0aWYgKGlzVmFsaWROZXdPcHRpb24oeyBsYWJlbDogdGhpcy5pbnB1dFZhbHVlIH0pKSB7XG5cdFx0XHRcdHZhciBfbmV3T3B0aW9uQ3JlYXRvciA9IHRoaXMucHJvcHMubmV3T3B0aW9uQ3JlYXRvcjtcblxuXG5cdFx0XHRcdHZhciBvcHRpb24gPSBfbmV3T3B0aW9uQ3JlYXRvcih7XG5cdFx0XHRcdFx0bGFiZWw6IHRoaXMuaW5wdXRWYWx1ZSxcblx0XHRcdFx0XHRsYWJlbEtleTogdGhpcy5sYWJlbEtleSxcblx0XHRcdFx0XHR2YWx1ZUtleTogdGhpcy52YWx1ZUtleVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBUUklDS1kgQ29tcGFyZSB0byBhbGwgb3B0aW9ucyAobm90IGp1c3QgZmlsdGVyZWQgb3B0aW9ucykgaW4gY2FzZSBvcHRpb24gaGFzIGFscmVhZHkgYmVlbiBzZWxlY3RlZCkuXG5cdFx0XHRcdC8vIEZvciBtdWx0aS1zZWxlY3RzLCB0aGlzIHdvdWxkIHJlbW92ZSBpdCBmcm9tIHRoZSBmaWx0ZXJlZCBsaXN0LlxuXHRcdFx0XHR2YXIgX2lzT3B0aW9uVW5pcXVlMiA9IHRoaXMuaXNPcHRpb25VbmlxdWUoe1xuXHRcdFx0XHRcdG9wdGlvbjogb3B0aW9uLFxuXHRcdFx0XHRcdG9wdGlvbnM6IGV4Y2x1ZGVPcHRpb25zLmNvbmNhdChmaWx0ZXJlZE9wdGlvbnMpXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmIChfaXNPcHRpb25VbmlxdWUyKSB7XG5cdFx0XHRcdFx0dmFyIHByb21wdCA9IHByb21wdFRleHRDcmVhdG9yKHRoaXMuaW5wdXRWYWx1ZSk7XG5cblx0XHRcdFx0XHR0aGlzLl9jcmVhdGVQbGFjZWhvbGRlck9wdGlvbiA9IF9uZXdPcHRpb25DcmVhdG9yKHtcblx0XHRcdFx0XHRcdGxhYmVsOiBwcm9tcHQsXG5cdFx0XHRcdFx0XHRsYWJlbEtleTogdGhpcy5sYWJlbEtleSxcblx0XHRcdFx0XHRcdHZhbHVlS2V5OiB0aGlzLnZhbHVlS2V5XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRmaWx0ZXJlZE9wdGlvbnMudW5zaGlmdCh0aGlzLl9jcmVhdGVQbGFjZWhvbGRlck9wdGlvbik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZpbHRlcmVkT3B0aW9ucztcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdpc09wdGlvblVuaXF1ZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGlzT3B0aW9uVW5pcXVlKF9yZWYpIHtcblx0XHRcdHZhciBvcHRpb24gPSBfcmVmLm9wdGlvbixcblx0XHRcdCAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuXHRcdFx0dmFyIGlzT3B0aW9uVW5pcXVlID0gdGhpcy5wcm9wcy5pc09wdGlvblVuaXF1ZTtcblxuXG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB0aGlzLnByb3BzLm9wdGlvbnM7XG5cblx0XHRcdHJldHVybiBpc09wdGlvblVuaXF1ZSh7XG5cdFx0XHRcdGxhYmVsS2V5OiB0aGlzLmxhYmVsS2V5LFxuXHRcdFx0XHRvcHRpb246IG9wdGlvbixcblx0XHRcdFx0b3B0aW9uczogb3B0aW9ucyxcblx0XHRcdFx0dmFsdWVLZXk6IHRoaXMudmFsdWVLZXlcblx0XHRcdH0pO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ21lbnVSZW5kZXJlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG1lbnVSZW5kZXJlciQkMShwYXJhbXMpIHtcblx0XHRcdHZhciBtZW51UmVuZGVyZXIkJDEgPSB0aGlzLnByb3BzLm1lbnVSZW5kZXJlcjtcblxuXG5cdFx0XHRyZXR1cm4gbWVudVJlbmRlcmVyJCQxKF9leHRlbmRzKHt9LCBwYXJhbXMsIHtcblx0XHRcdFx0b25TZWxlY3Q6IHRoaXMub25PcHRpb25TZWxlY3QsXG5cdFx0XHRcdHNlbGVjdFZhbHVlOiB0aGlzLm9uT3B0aW9uU2VsZWN0XG5cdFx0XHR9KSk7XG5cdFx0fVxuXHR9LCB7XG5cdFx0a2V5OiAnb25JbnB1dENoYW5nZScsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG9uSW5wdXRDaGFuZ2UoaW5wdXQpIHtcblx0XHRcdHZhciBvbklucHV0Q2hhbmdlID0gdGhpcy5wcm9wcy5vbklucHV0Q2hhbmdlO1xuXG5cdFx0XHQvLyBUaGlzIHZhbHVlIG1heSBiZSBuZWVkZWQgaW4gYmV0d2VlbiBTZWxlY3QgbW91bnRzICh3aGVuIHRoaXMuc2VsZWN0IGlzIG51bGwpXG5cblx0XHRcdHRoaXMuaW5wdXRWYWx1ZSA9IGlucHV0O1xuXG5cdFx0XHRpZiAob25JbnB1dENoYW5nZSkge1xuXHRcdFx0XHR0aGlzLmlucHV0VmFsdWUgPSBvbklucHV0Q2hhbmdlKGlucHV0KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXMuaW5wdXRWYWx1ZTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdvbklucHV0S2V5RG93bicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIG9uSW5wdXRLZXlEb3duKGV2ZW50KSB7XG5cdFx0XHR2YXIgX3Byb3BzMyA9IHRoaXMucHJvcHMsXG5cdFx0XHQgICAgc2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uID0gX3Byb3BzMy5zaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb24sXG5cdFx0XHQgICAgb25JbnB1dEtleURvd24gPSBfcHJvcHMzLm9uSW5wdXRLZXlEb3duO1xuXG5cdFx0XHR2YXIgZm9jdXNlZE9wdGlvbiA9IHRoaXMuc2VsZWN0LmdldEZvY3VzZWRPcHRpb24oKTtcblxuXHRcdFx0aWYgKGZvY3VzZWRPcHRpb24gJiYgZm9jdXNlZE9wdGlvbiA9PT0gdGhpcy5fY3JlYXRlUGxhY2Vob2xkZXJPcHRpb24gJiYgc2hvdWxkS2V5RG93bkV2ZW50Q3JlYXRlTmV3T3B0aW9uKHsga2V5Q29kZTogZXZlbnQua2V5Q29kZSB9KSkge1xuXHRcdFx0XHR0aGlzLmNyZWF0ZU5ld09wdGlvbigpO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgZGVjb3JhdGVkIFNlbGVjdCBmcm9tIGRvaW5nIGFueXRoaW5nIGFkZGl0aW9uYWwgd2l0aCB0aGlzIGtleURvd24gZXZlbnRcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH0gZWxzZSBpZiAob25JbnB1dEtleURvd24pIHtcblx0XHRcdFx0b25JbnB1dEtleURvd24oZXZlbnQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ29uT3B0aW9uU2VsZWN0Jyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gb25PcHRpb25TZWxlY3Qob3B0aW9uKSB7XG5cdFx0XHRpZiAob3B0aW9uID09PSB0aGlzLl9jcmVhdGVQbGFjZWhvbGRlck9wdGlvbikge1xuXHRcdFx0XHR0aGlzLmNyZWF0ZU5ld09wdGlvbigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZWxlY3Quc2VsZWN0VmFsdWUob3B0aW9uKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdmb2N1cycsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIGZvY3VzKCkge1xuXHRcdFx0dGhpcy5zZWxlY3QuZm9jdXMoKTtcblx0XHR9XG5cdH0sIHtcblx0XHRrZXk6ICdyZW5kZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0dmFyIF9wcm9wczQgPSB0aGlzLnByb3BzLFxuXHRcdFx0ICAgIHJlZlByb3AgPSBfcHJvcHM0LnJlZixcblx0XHRcdCAgICByZXN0UHJvcHMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcHJvcHM0LCBbJ3JlZiddKTtcblx0XHRcdHZhciBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW47XG5cblx0XHRcdC8vIFdlIGNhbid0IHVzZSBkZXN0cnVjdHVyaW5nIGRlZmF1bHQgdmFsdWVzIHRvIHNldCB0aGUgY2hpbGRyZW4sXG5cdFx0XHQvLyBiZWNhdXNlIGl0IHdvbid0IGFwcGx5IHdvcmsgaWYgYGNoaWxkcmVuYCBpcyBudWxsLiBBIGZhbHN5IGNoZWNrIGlzXG5cdFx0XHQvLyBtb3JlIHJlbGlhYmxlIGluIHJlYWwgd29ybGQgdXNlLWNhc2VzLlxuXG5cdFx0XHRpZiAoIWNoaWxkcmVuKSB7XG5cdFx0XHRcdGNoaWxkcmVuID0gZGVmYXVsdENoaWxkcmVuJDI7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBwcm9wcyA9IF9leHRlbmRzKHt9LCByZXN0UHJvcHMsIHtcblx0XHRcdFx0YWxsb3dDcmVhdGU6IHRydWUsXG5cdFx0XHRcdGZpbHRlck9wdGlvbnM6IHRoaXMuZmlsdGVyT3B0aW9ucyxcblx0XHRcdFx0bWVudVJlbmRlcmVyOiB0aGlzLm1lbnVSZW5kZXJlcixcblx0XHRcdFx0b25JbnB1dENoYW5nZTogdGhpcy5vbklucHV0Q2hhbmdlLFxuXHRcdFx0XHRvbklucHV0S2V5RG93bjogdGhpcy5vbklucHV0S2V5RG93bixcblx0XHRcdFx0cmVmOiBmdW5jdGlvbiByZWYoX3JlZjIpIHtcblx0XHRcdFx0XHRfdGhpczIuc2VsZWN0ID0gX3JlZjI7XG5cblx0XHRcdFx0XHQvLyBUaGVzZSB2YWx1ZXMgbWF5IGJlIG5lZWRlZCBpbiBiZXR3ZWVuIFNlbGVjdCBtb3VudHMgKHdoZW4gdGhpcy5zZWxlY3QgaXMgbnVsbClcblx0XHRcdFx0XHRpZiAoX3JlZjIpIHtcblx0XHRcdFx0XHRcdF90aGlzMi5sYWJlbEtleSA9IF9yZWYyLnByb3BzLmxhYmVsS2V5O1xuXHRcdFx0XHRcdFx0X3RoaXMyLnZhbHVlS2V5ID0gX3JlZjIucHJvcHMudmFsdWVLZXk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChyZWZQcm9wKSB7XG5cdFx0XHRcdFx0XHRyZWZQcm9wKF9yZWYyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gY2hpbGRyZW4ocHJvcHMpO1xuXHRcdH1cblx0fV0pO1xuXHRyZXR1cm4gQ3JlYXRhYmxlU2VsZWN0O1xufShSZWFjdC5Db21wb25lbnQpO1xuXG52YXIgZGVmYXVsdENoaWxkcmVuJDIgPSBmdW5jdGlvbiBkZWZhdWx0Q2hpbGRyZW4ocHJvcHMpIHtcblx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0JDEsIHByb3BzKTtcbn07XG5cbnZhciBpc09wdGlvblVuaXF1ZSA9IGZ1bmN0aW9uIGlzT3B0aW9uVW5pcXVlKF9yZWYzKSB7XG5cdHZhciBvcHRpb24gPSBfcmVmMy5vcHRpb24sXG5cdCAgICBvcHRpb25zID0gX3JlZjMub3B0aW9ucyxcblx0ICAgIGxhYmVsS2V5ID0gX3JlZjMubGFiZWxLZXksXG5cdCAgICB2YWx1ZUtleSA9IF9yZWYzLnZhbHVlS2V5O1xuXG5cdGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5sZW5ndGgpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdHJldHVybiBvcHRpb25zLmZpbHRlcihmdW5jdGlvbiAoZXhpc3RpbmdPcHRpb24pIHtcblx0XHRyZXR1cm4gZXhpc3RpbmdPcHRpb25bbGFiZWxLZXldID09PSBvcHRpb25bbGFiZWxLZXldIHx8IGV4aXN0aW5nT3B0aW9uW3ZhbHVlS2V5XSA9PT0gb3B0aW9uW3ZhbHVlS2V5XTtcblx0fSkubGVuZ3RoID09PSAwO1xufTtcblxudmFyIGlzVmFsaWROZXdPcHRpb24gPSBmdW5jdGlvbiBpc1ZhbGlkTmV3T3B0aW9uKF9yZWY0KSB7XG5cdHZhciBsYWJlbCA9IF9yZWY0LmxhYmVsO1xuXHRyZXR1cm4gISFsYWJlbDtcbn07XG5cbnZhciBuZXdPcHRpb25DcmVhdG9yID0gZnVuY3Rpb24gbmV3T3B0aW9uQ3JlYXRvcihfcmVmNSkge1xuXHR2YXIgbGFiZWwgPSBfcmVmNS5sYWJlbCxcblx0ICAgIGxhYmVsS2V5ID0gX3JlZjUubGFiZWxLZXksXG5cdCAgICB2YWx1ZUtleSA9IF9yZWY1LnZhbHVlS2V5O1xuXG5cdHZhciBvcHRpb24gPSB7fTtcblx0b3B0aW9uW3ZhbHVlS2V5XSA9IGxhYmVsO1xuXHRvcHRpb25bbGFiZWxLZXldID0gbGFiZWw7XG5cdG9wdGlvbi5jbGFzc05hbWUgPSAnU2VsZWN0LWNyZWF0ZS1vcHRpb24tcGxhY2Vob2xkZXInO1xuXG5cdHJldHVybiBvcHRpb247XG59O1xuXG52YXIgcHJvbXB0VGV4dENyZWF0b3IgPSBmdW5jdGlvbiBwcm9tcHRUZXh0Q3JlYXRvcihsYWJlbCkge1xuXHRyZXR1cm4gJ0NyZWF0ZSBvcHRpb24gXCInICsgbGFiZWwgKyAnXCInO1xufTtcblxudmFyIHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbiA9IGZ1bmN0aW9uIHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbihfcmVmNikge1xuXHR2YXIga2V5Q29kZSA9IF9yZWY2LmtleUNvZGU7XG5cblx0c3dpdGNoIChrZXlDb2RlKSB7XG5cdFx0Y2FzZSA5OiAvLyBUQUJcblx0XHRjYXNlIDEzOiAvLyBFTlRFUlxuXHRcdGNhc2UgMTg4OlxuXHRcdFx0Ly8gQ09NTUFcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG5cbi8vIERlZmF1bHQgcHJvcCBtZXRob2RzXG5DcmVhdGFibGVTZWxlY3QuaXNPcHRpb25VbmlxdWUgPSBpc09wdGlvblVuaXF1ZTtcbkNyZWF0YWJsZVNlbGVjdC5pc1ZhbGlkTmV3T3B0aW9uID0gaXNWYWxpZE5ld09wdGlvbjtcbkNyZWF0YWJsZVNlbGVjdC5uZXdPcHRpb25DcmVhdG9yID0gbmV3T3B0aW9uQ3JlYXRvcjtcbkNyZWF0YWJsZVNlbGVjdC5wcm9tcHRUZXh0Q3JlYXRvciA9IHByb21wdFRleHRDcmVhdG9yO1xuQ3JlYXRhYmxlU2VsZWN0LnNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbiA9IHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbjtcblxuQ3JlYXRhYmxlU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcblx0ZmlsdGVyT3B0aW9uczogZmlsdGVyT3B0aW9ucyxcblx0aXNPcHRpb25VbmlxdWU6IGlzT3B0aW9uVW5pcXVlLFxuXHRpc1ZhbGlkTmV3T3B0aW9uOiBpc1ZhbGlkTmV3T3B0aW9uLFxuXHRtZW51UmVuZGVyZXI6IG1lbnVSZW5kZXJlcixcblx0bmV3T3B0aW9uQ3JlYXRvcjogbmV3T3B0aW9uQ3JlYXRvcixcblx0cHJvbXB0VGV4dENyZWF0b3I6IHByb21wdFRleHRDcmVhdG9yLFxuXHRzaG91bGRLZXlEb3duRXZlbnRDcmVhdGVOZXdPcHRpb246IHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvblxufTtcblxuQ3JlYXRhYmxlU2VsZWN0LnByb3BUeXBlcyA9IHtcblx0Ly8gQ2hpbGQgZnVuY3Rpb24gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoZSBpbm5lciBTZWxlY3QgY29tcG9uZW50XG5cdC8vIFRoaXMgY29tcG9uZW50IGNhbiBiZSB1c2VkIHRvIGNvbXBvc2UgSE9DcyAoZWcgQ3JlYXRhYmxlIGFuZCBBc3luYylcblx0Ly8gKHByb3BzOiBPYmplY3QpOiBQcm9wVHlwZXMuZWxlbWVudFxuXHRjaGlsZHJlbjogUHJvcFR5cGVzLmZ1bmMsXG5cblx0Ly8gU2VlIFNlbGVjdC5wcm9wVHlwZXMuZmlsdGVyT3B0aW9uc1xuXHRmaWx0ZXJPcHRpb25zOiBQcm9wVHlwZXMuYW55LFxuXG5cdC8vIFNlYXJjaGVzIGZvciBhbnkgbWF0Y2hpbmcgb3B0aW9uIHdpdGhpbiB0aGUgc2V0IG9mIG9wdGlvbnMuXG5cdC8vIFRoaXMgZnVuY3Rpb24gcHJldmVudHMgZHVwbGljYXRlIG9wdGlvbnMgZnJvbSBiZWluZyBjcmVhdGVkLlxuXHQvLyAoeyBvcHRpb246IE9iamVjdCwgb3B0aW9uczogQXJyYXksIGxhYmVsS2V5OiBzdHJpbmcsIHZhbHVlS2V5OiBzdHJpbmcgfSk6IGJvb2xlYW5cblx0aXNPcHRpb25VbmlxdWU6IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIERldGVybWluZXMgaWYgdGhlIGN1cnJlbnQgaW5wdXQgdGV4dCByZXByZXNlbnRzIGEgdmFsaWQgb3B0aW9uLlxuXHQvLyAoeyBsYWJlbDogc3RyaW5nIH0pOiBib29sZWFuXG5cdGlzVmFsaWROZXdPcHRpb246IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIFNlZSBTZWxlY3QucHJvcFR5cGVzLm1lbnVSZW5kZXJlclxuXHRtZW51UmVuZGVyZXI6IFByb3BUeXBlcy5hbnksXG5cblx0Ly8gRmFjdG9yeSB0byBjcmVhdGUgbmV3IG9wdGlvbi5cblx0Ly8gKHsgbGFiZWw6IHN0cmluZywgbGFiZWxLZXk6IHN0cmluZywgdmFsdWVLZXk6IHN0cmluZyB9KTogT2JqZWN0XG5cdG5ld09wdGlvbkNyZWF0b3I6IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIGlucHV0IGNoYW5nZSBoYW5kbGVyOiBmdW5jdGlvbiAoaW5wdXRWYWx1ZSkge31cblx0b25JbnB1dENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG5cblx0Ly8gaW5wdXQga2V5RG93biBoYW5kbGVyOiBmdW5jdGlvbiAoZXZlbnQpIHt9XG5cdG9uSW5wdXRLZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcblxuXHQvLyBuZXcgb3B0aW9uIGNsaWNrIGhhbmRsZXI6IGZ1bmN0aW9uIChvcHRpb24pIHt9XG5cdG9uTmV3T3B0aW9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIFNlZSBTZWxlY3QucHJvcFR5cGVzLm9wdGlvbnNcblx0b3B0aW9uczogUHJvcFR5cGVzLmFycmF5LFxuXG5cdC8vIENyZWF0ZXMgcHJvbXB0L3BsYWNlaG9sZGVyIG9wdGlvbiB0ZXh0LlxuXHQvLyAoZmlsdGVyVGV4dDogc3RyaW5nKTogc3RyaW5nXG5cdHByb21wdFRleHRDcmVhdG9yOiBQcm9wVHlwZXMuZnVuYyxcblxuXHRyZWY6IFByb3BUeXBlcy5mdW5jLFxuXG5cdC8vIERlY2lkZXMgaWYgYSBrZXlEb3duIGV2ZW50IChlZyBpdHMgYGtleUNvZGVgKSBzaG91bGQgcmVzdWx0IGluIHRoZSBjcmVhdGlvbiBvZiBhIG5ldyBvcHRpb24uXG5cdHNob3VsZEtleURvd25FdmVudENyZWF0ZU5ld09wdGlvbjogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbnZhciBBc3luY0NyZWF0YWJsZVNlbGVjdCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG5cdGluaGVyaXRzKEFzeW5jQ3JlYXRhYmxlU2VsZWN0LCBfUmVhY3QkQ29tcG9uZW50KTtcblxuXHRmdW5jdGlvbiBBc3luY0NyZWF0YWJsZVNlbGVjdCgpIHtcblx0XHRjbGFzc0NhbGxDaGVjayh0aGlzLCBBc3luY0NyZWF0YWJsZVNlbGVjdCk7XG5cdFx0cmV0dXJuIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEFzeW5jQ3JlYXRhYmxlU2VsZWN0Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXN5bmNDcmVhdGFibGVTZWxlY3QpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcblx0fVxuXG5cdGNyZWF0ZUNsYXNzKEFzeW5jQ3JlYXRhYmxlU2VsZWN0LCBbe1xuXHRcdGtleTogJ2ZvY3VzJyxcblx0XHR2YWx1ZTogZnVuY3Rpb24gZm9jdXMoKSB7XG5cdFx0XHR0aGlzLnNlbGVjdC5mb2N1cygpO1xuXHRcdH1cblx0fSwge1xuXHRcdGtleTogJ3JlbmRlcicsXG5cdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRcdHZhciBfdGhpczIgPSB0aGlzO1xuXG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0QXN5bmMsXG5cdFx0XHRcdHRoaXMucHJvcHMsXG5cdFx0XHRcdGZ1bmN0aW9uIChfcmVmKSB7XG5cdFx0XHRcdFx0dmFyIHJlZiA9IF9yZWYucmVmLFxuXHRcdFx0XHRcdCAgICBhc3luY1Byb3BzID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWydyZWYnXSk7XG5cblx0XHRcdFx0XHR2YXIgYXN5bmNSZWYgPSByZWY7XG5cdFx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0XHRDcmVhdGFibGVTZWxlY3QsXG5cdFx0XHRcdFx0XHRhc3luY1Byb3BzLFxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24gKF9yZWYyKSB7XG5cdFx0XHRcdFx0XHRcdHZhciByZWYgPSBfcmVmMi5yZWYsXG5cdFx0XHRcdFx0XHRcdCAgICBjcmVhdGFibGVQcm9wcyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYyLCBbJ3JlZiddKTtcblxuXHRcdFx0XHRcdFx0XHR2YXIgY3JlYXRhYmxlUmVmID0gcmVmO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMyLnByb3BzLmNoaWxkcmVuKF9leHRlbmRzKHt9LCBjcmVhdGFibGVQcm9wcywge1xuXHRcdFx0XHRcdFx0XHRcdHJlZjogZnVuY3Rpb24gcmVmKHNlbGVjdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y3JlYXRhYmxlUmVmKHNlbGVjdCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRhc3luY1JlZihzZWxlY3QpO1xuXHRcdFx0XHRcdFx0XHRcdFx0X3RoaXMyLnNlbGVjdCA9IHNlbGVjdDtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHQpO1xuXHRcdH1cblx0fV0pO1xuXHRyZXR1cm4gQXN5bmNDcmVhdGFibGVTZWxlY3Q7XG59KFJlYWN0LkNvbXBvbmVudCk7XG5cbnZhciBkZWZhdWx0Q2hpbGRyZW4kMSA9IGZ1bmN0aW9uIGRlZmF1bHRDaGlsZHJlbihwcm9wcykge1xuXHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTZWxlY3QkMSwgcHJvcHMpO1xufTtcblxuQXN5bmNDcmVhdGFibGVTZWxlY3QucHJvcFR5cGVzID0ge1xuXHRjaGlsZHJlbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCAvLyBDaGlsZCBmdW5jdGlvbiByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhlIGlubmVyIFNlbGVjdCBjb21wb25lbnQ7IChwcm9wczogT2JqZWN0KTogUHJvcFR5cGVzLmVsZW1lbnRcbn07XG5cbkFzeW5jQ3JlYXRhYmxlU2VsZWN0LmRlZmF1bHRQcm9wcyA9IHtcblx0Y2hpbGRyZW46IGRlZmF1bHRDaGlsZHJlbiQxXG59O1xuXG5TZWxlY3QkMS5Bc3luYyA9IEFzeW5jO1xuU2VsZWN0JDEuQXN5bmNDcmVhdGFibGUgPSBBc3luY0NyZWF0YWJsZVNlbGVjdDtcblNlbGVjdCQxLkNyZWF0YWJsZSA9IENyZWF0YWJsZVNlbGVjdDtcblNlbGVjdCQxLlZhbHVlID0gVmFsdWU7XG5TZWxlY3QkMS5PcHRpb24gPSBPcHRpb247XG5cbmV4cG9ydCB7IEFzeW5jLCBBc3luY0NyZWF0YWJsZVNlbGVjdCBhcyBBc3luY0NyZWF0YWJsZSwgQ3JlYXRhYmxlU2VsZWN0IGFzIENyZWF0YWJsZSwgVmFsdWUsIE9wdGlvbiwgbWVudVJlbmRlcmVyIGFzIGRlZmF1bHRNZW51UmVuZGVyZXIsIGFycm93UmVuZGVyZXIgYXMgZGVmYXVsdEFycm93UmVuZGVyZXIsIGNsZWFyUmVuZGVyZXIgYXMgZGVmYXVsdENsZWFyUmVuZGVyZXIsIGZpbHRlck9wdGlvbnMgYXMgZGVmYXVsdEZpbHRlck9wdGlvbnMgfTtcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdCQxO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3Qtc2VsZWN0L2Rpc3QvcmVhY3Qtc2VsZWN0LmVzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC1zZWxlY3QvZGlzdC9yZWFjdC1zZWxlY3QuZXMuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsImV4cG9ydCBjb25zdCBsYW5ndWFnZXMgPSB7XHJcbiAgICBcImFiXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQWJraGF6XCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsNKn0YHRg9CwXCJcclxuICAgIH0sXHJcbiAgICBcImFhXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQWZhclwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQWZhcmFmXCJcclxuICAgIH0sXHJcbiAgICBcImFmXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQWZyaWthYW5zXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBZnJpa2FhbnNcIlxyXG4gICAgfSxcclxuICAgIFwiYWtcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJBa2FuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBa2FuXCJcclxuICAgIH0sXHJcbiAgICBcInNxXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQWxiYW5pYW5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNocWlwXCJcclxuICAgIH0sXHJcbiAgICBcImFtXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQW1oYXJpY1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Yqg4Yib4Yit4YqbXCJcclxuICAgIH0sXHJcbiAgICBcImFyXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQXJhYmljXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLYp9mE2LnYsdio2YrYqVwiXHJcbiAgICB9LFxyXG4gICAgXCJhblwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkFyYWdvbmVzZVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXJhZ29uw6lzXCJcclxuICAgIH0sXHJcbiAgICBcImh5XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQXJtZW5pYW5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItWA1aHVtdWl1oDVpdW2XCJcclxuICAgIH0sXHJcbiAgICBcImFzXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQXNzYW1lc2VcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCmheCmuOCmruCngOCmr+CmvOCmvlwiXHJcbiAgICB9LFxyXG4gICAgXCJhdlwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkF2YXJpY1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0LDQstCw0YAg0LzQsNGG04AsINC80LDQs9OA0LDRgNGD0Lsg0LzQsNGG04BcIlxyXG4gICAgfSxcclxuICAgIFwiYWVcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJBdmVzdGFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJhdmVzdGFcIlxyXG4gICAgfSxcclxuICAgIFwiYXlcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJBeW1hcmFcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImF5bWFyIGFydVwiXHJcbiAgICB9LFxyXG4gICAgXCJhelwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkF6ZXJiYWlqYW5pXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJhesmZcmJheWNhbiBkaWxpXCJcclxuICAgIH0sXHJcbiAgICBcImJtXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQmFtYmFyYVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYmFtYW5hbmthblwiXHJcbiAgICB9LFxyXG4gICAgXCJiYVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkJhc2hraXJcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItCx0LDRiNKh0L7RgNGCINGC0LXQu9C1XCJcclxuICAgIH0sXHJcbiAgICBcImV1XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQmFzcXVlXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJldXNrYXJhLCBldXNrZXJhXCJcclxuICAgIH0sXHJcbiAgICBcImJlXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQmVsYXJ1c2lhblwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0JHQtdC70LDRgNGD0YHQutCw0Y9cIlxyXG4gICAgfSxcclxuICAgIFwiYm5cIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJCZW5nYWxpXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpqzgpr7gpoLgprLgpr5cIlxyXG4gICAgfSxcclxuICAgIFwiYmhcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJCaWhhcmlcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkreCli+CknOCkquClgeCksOClgFwiXHJcbiAgICB9LFxyXG4gICAgXCJiaVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkJpc2xhbWFcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkJpc2xhbWFcIlxyXG4gICAgfSxcclxuICAgIFwiYnNcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJCb3NuaWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJib3NhbnNraSBqZXppa1wiXHJcbiAgICB9LFxyXG4gICAgXCJiclwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkJyZXRvblwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiYnJlemhvbmVnXCJcclxuICAgIH0sXHJcbiAgICBcImJnXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQnVsZ2FyaWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQsdGK0LvQs9Cw0YDRgdC60Lgg0LXQt9C40LpcIlxyXG4gICAgfSxcclxuICAgIFwibXlcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJCdXJtZXNlXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhgJfhgJnhgKzhgIXhgKxcIlxyXG4gICAgfSxcclxuICAgIFwiY2FcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJDYXRhbGFuOyBWYWxlbmNpYW5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkNhdGFsw6BcIlxyXG4gICAgfSxcclxuICAgIFwiY2hcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJDaGFtb3Jyb1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQ2hhbW9ydVwiXHJcbiAgICB9LFxyXG4gICAgXCJjZVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkNoZWNoZW5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC90L7RhdGH0LjQudC9INC80L7RgtGCXCJcclxuICAgIH0sXHJcbiAgICBcIm55XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQ2hpY2hld2E7IENoZXdhOyBOeWFuamFcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImNoaUNoZcW1YSwgY2hpbnlhbmphXCJcclxuICAgIH0sXHJcbiAgICBcInpoXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQ2hpbmVzZVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi5Lit5paHIChaaMWNbmd3w6luKSwg5rGJ6K+tLCDmvKLoqp5cIlxyXG4gICAgfSxcclxuICAgIFwiY3ZcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJDaHV2YXNoXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRh9OR0LLQsNGIINGH05fQu9GF0LhcIlxyXG4gICAgfSxcclxuICAgIFwia3dcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJDb3JuaXNoXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLZXJuZXdla1wiXHJcbiAgICB9LFxyXG4gICAgXCJjb1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkNvcnNpY2FuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJjb3JzdSwgbGluZ3VhIGNvcnNhXCJcclxuICAgIH0sXHJcbiAgICBcImNyXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQ3JlZVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4ZOA4ZCm4ZCD4ZSt4ZCN4ZCP4ZCjXCJcclxuICAgIH0sXHJcbiAgICBcImhyXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQ3JvYXRpYW5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImhydmF0c2tpXCJcclxuICAgIH0sXHJcbiAgICBcImNzXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiQ3plY2hcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIsSNZXNreSwgxI1lxaF0aW5hXCJcclxuICAgIH0sXHJcbiAgICBcImRhXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiRGFuaXNoXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJkYW5za1wiXHJcbiAgICB9LFxyXG4gICAgXCJkdlwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkRpdmVoaTsgRGhpdmVoaTsgTWFsZGl2aWFuO1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi3oveqN6I3qzegN6oXCJcclxuICAgIH0sXHJcbiAgICBcIm5sXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiRHV0Y2hcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5lZGVybGFuZHMsIFZsYWFtc1wiXHJcbiAgICB9LFxyXG4gICAgXCJlblwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkVuZ2xpc2hcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkVuZ2xpc2hcIlxyXG4gICAgfSxcclxuICAgIFwiZW9cIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJFc3BlcmFudG9cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkVzcGVyYW50b1wiXHJcbiAgICB9LFxyXG4gICAgXCJldFwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkVzdG9uaWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJlZXN0aSwgZWVzdGkga2VlbFwiXHJcbiAgICB9LFxyXG4gICAgXCJlZVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkV3ZVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRcqLZWdiZVwiXHJcbiAgICB9LFxyXG4gICAgXCJmb1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkZhcm9lc2VcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImbDuHJveXNrdFwiXHJcbiAgICB9LFxyXG4gICAgXCJmalwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkZpamlhblwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwidm9zYSBWYWthdml0aVwiXHJcbiAgICB9LFxyXG4gICAgXCJmaVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkZpbm5pc2hcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInN1b21pLCBzdW9tZW4ga2llbGlcIlxyXG4gICAgfSxcclxuICAgIFwiZnJcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJGcmVuY2hcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImZyYW7Dp2FpcywgbGFuZ3VlIGZyYW7Dp2Fpc2VcIlxyXG4gICAgfSxcclxuICAgIFwiZmZcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJGdWxhOyBGdWxhaDsgUHVsYWFyOyBQdWxhclwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRnVsZnVsZGUsIFB1bGFhciwgUHVsYXJcIlxyXG4gICAgfSxcclxuICAgIFwiZ2xcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJHYWxpY2lhblwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiR2FsZWdvXCJcclxuICAgIH0sXHJcbiAgICBcImthXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiR2VvcmdpYW5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGDpeGDkOGDoOGDl+GDo+GDmuGDmFwiXHJcbiAgICB9LFxyXG4gICAgXCJkZVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkdlcm1hblwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiRGV1dHNjaFwiXHJcbiAgICB9LFxyXG4gICAgXCJlbFwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkdyZWVrLCBNb2Rlcm5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIs6VzrvOu863zr3Ouc66zqxcIlxyXG4gICAgfSxcclxuICAgIFwiZ25cIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJHdWFyYW7DrVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXZhw7Fl4bq9XCJcclxuICAgIH0sXHJcbiAgICBcImd1XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiR3VqYXJhdGlcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCql+CrgeCqnOCqsOCqvuCqpOCrgFwiXHJcbiAgICB9LFxyXG4gICAgXCJodFwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkhhaXRpYW47IEhhaXRpYW4gQ3Jlb2xlXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLcmV5w7JsIGF5aXN5ZW5cIlxyXG4gICAgfSxcclxuICAgIFwiaGFcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJIYXVzYVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSGF1c2EsINmH2Y7ZiNmP2LPZjlwiXHJcbiAgICB9LFxyXG4gICAgXCJoZVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkhlYnJldyAobW9kZXJuKVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi16LXkdeo15nXqlwiXHJcbiAgICB9LFxyXG4gICAgXCJoelwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkhlcmVyb1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT3RqaWhlcmVyb1wiXHJcbiAgICB9LFxyXG4gICAgXCJoaVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkhpbmRpXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpLngpL/gpKjgpY3gpKbgpYAsIOCkueCkv+CkguCkpuClgFwiXHJcbiAgICB9LFxyXG4gICAgXCJob1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkhpcmkgTW90dVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSGlyaSBNb3R1XCJcclxuICAgIH0sXHJcbiAgICBcImh1XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiSHVuZ2FyaWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJNYWd5YXJcIlxyXG4gICAgfSxcclxuICAgIFwiaWFcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJJbnRlcmxpbmd1YVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSW50ZXJsaW5ndWFcIlxyXG4gICAgfSxcclxuICAgIFwiaWRcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJJbmRvbmVzaWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJCYWhhc2EgSW5kb25lc2lhXCJcclxuICAgIH0sXHJcbiAgICBcImllXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiSW50ZXJsaW5ndWVcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk9yaWdpbmFsbHkgY2FsbGVkIE9jY2lkZW50YWw7IHRoZW4gSW50ZXJsaW5ndWUgYWZ0ZXIgV1dJSVwiXHJcbiAgICB9LFxyXG4gICAgXCJnYVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIklyaXNoXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHYWVpbGdlXCJcclxuICAgIH0sXHJcbiAgICBcImlnXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiSWdib1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQXPhu6Vz4bulIElnYm9cIlxyXG4gICAgfSxcclxuICAgIFwiaWtcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJJbnVwaWFxXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJJw7F1cGlhcSwgScOxdXBpYXR1blwiXHJcbiAgICB9LFxyXG4gICAgXCJpb1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIklkb1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSWRvXCJcclxuICAgIH0sXHJcbiAgICBcImlzXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiSWNlbGFuZGljXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLDjXNsZW5za2FcIlxyXG4gICAgfSxcclxuICAgIFwiaXRcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJJdGFsaWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJJdGFsaWFub1wiXHJcbiAgICB9LFxyXG4gICAgXCJpdVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkludWt0aXR1dFwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4ZCD4ZOE4ZKD4ZGO4ZGQ4ZGmXCJcclxuICAgIH0sXHJcbiAgICBcImphXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiSmFwYW5lc2VcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuaXpeacrOiqniAo44Gr44G744KT44GU77yP44Gr44Gj44G944KT44GUKVwiXHJcbiAgICB9LFxyXG4gICAgXCJqdlwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkphdmFuZXNlXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJiYXNhIEphd2FcIlxyXG4gICAgfSxcclxuICAgIFwia2xcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJLYWxhYWxsaXN1dCwgR3JlZW5sYW5kaWNcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImthbGFhbGxpc3V0LCBrYWxhYWxsaXQgb3FhYXNpaVwiXHJcbiAgICB9LFxyXG4gICAgXCJrblwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkthbm5hZGFcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCyleCyqOCzjeCyqOCyoVwiXHJcbiAgICB9LFxyXG4gICAgXCJrclwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkthbnVyaVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2FudXJpXCJcclxuICAgIH0sXHJcbiAgICBcImtzXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiS2FzaG1pcmlcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkleCktuCljeCkruClgOCksOClgCwg2YPYtNmF2YrYsdmK4oCOXCJcclxuICAgIH0sXHJcbiAgICBcImtrXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiS2F6YWtoXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLSmtCw0LfQsNKbINGC0ZbQu9GWXCJcclxuICAgIH0sXHJcbiAgICBcImttXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiS2htZXJcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuGel+GetuGen+GetuGegeGfkuGemOGfguGemlwiXHJcbiAgICB9LFxyXG4gICAgXCJraVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIktpa3V5dSwgR2lrdXl1XCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHxKlrxal5xalcIlxyXG4gICAgfSxcclxuICAgIFwicndcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJLaW55YXJ3YW5kYVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiSWtpbnlhcndhbmRhXCJcclxuICAgIH0sXHJcbiAgICBcImt5XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiS2lyZ2hpeiwgS3lyZ3l6XCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQutGL0YDQs9GL0Lcg0YLQuNC70LhcIlxyXG4gICAgfSxcclxuICAgIFwia3ZcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJLb21pXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLQutC+0LzQuCDQutGL0LJcIlxyXG4gICAgfSxcclxuICAgIFwia2dcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJLb25nb1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2lLb25nb1wiXHJcbiAgICB9LFxyXG4gICAgXCJrb1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIktvcmVhblwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi7ZWc6rWt7Ja0ICjpn5PlnIvoqp4pLCDsobDshKDrp5AgKOacnemuruiqnilcIlxyXG4gICAgfSxcclxuICAgIFwia3VcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJLdXJkaXNoXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJLdXJkw64sINmD2YjYsdiv24zigI5cIlxyXG4gICAgfSxcclxuICAgIFwia2pcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJLd2FueWFtYSwgS3VhbnlhbWFcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkt1YW55YW1hXCJcclxuICAgIH0sXHJcbiAgICBcImxhXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiTGF0aW5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImxhdGluZSwgbGluZ3VhIGxhdGluYVwiXHJcbiAgICB9LFxyXG4gICAgXCJsYlwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkx1eGVtYm91cmdpc2gsIExldHplYnVyZ2VzY2hcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkzDq3R6ZWJ1ZXJnZXNjaFwiXHJcbiAgICB9LFxyXG4gICAgXCJsZ1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkx1Z2FuZGFcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkx1Z2FuZGFcIlxyXG4gICAgfSxcclxuICAgIFwibGlcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJMaW1idXJnaXNoLCBMaW1idXJnYW4sIExpbWJ1cmdlclwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTGltYnVyZ3NcIlxyXG4gICAgfSxcclxuICAgIFwibG5cIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJMaW5nYWxhXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJMaW5nw6FsYVwiXHJcbiAgICB9LFxyXG4gICAgXCJsb1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIkxhb1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Lqe4Lqy4Lqq4Lqy4Lql4Lqy4LqnXCJcclxuICAgIH0sXHJcbiAgICBcImx0XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiTGl0aHVhbmlhblwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwibGlldHV2acWzIGthbGJhXCJcclxuICAgIH0sXHJcbiAgICBcImx1XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiTHViYS1LYXRhbmdhXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJcIlxyXG4gICAgfSxcclxuICAgIFwibHZcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJMYXR2aWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJsYXR2aWXFoXUgdmFsb2RhXCJcclxuICAgIH0sXHJcbiAgICBcImd2XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiTWFueFwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiR2FlbGcsIEdhaWxja1wiXHJcbiAgICB9LFxyXG4gICAgXCJta1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIk1hY2Vkb25pYW5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC80LDQutC10LTQvtC90YHQutC4INGY0LDQt9C40LpcIlxyXG4gICAgfSxcclxuICAgIFwibWdcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJNYWxhZ2FzeVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTWFsYWdhc3kgZml0ZW55XCJcclxuICAgIH0sXHJcbiAgICBcIm1zXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiTWFsYXlcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImJhaGFzYSBNZWxheXUsINio2YfYp9izINmF2YTYp9mK2YjigI5cIlxyXG4gICAgfSxcclxuICAgIFwibWxcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJNYWxheWFsYW1cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC0ruC0suC0r+C0vuC0s+C0glwiXHJcbiAgICB9LFxyXG4gICAgXCJtdFwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIk1hbHRlc2VcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk1hbHRpXCJcclxuICAgIH0sXHJcbiAgICBcIm1pXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiTcSBb3JpXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJ0ZSByZW8gTcSBb3JpXCJcclxuICAgIH0sXHJcbiAgICBcIm1yXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiTWFyYXRoaSAoTWFyxIHhua1oxKspXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpK7gpLDgpL7gpKDgpYBcIlxyXG4gICAgfSxcclxuICAgIFwibWhcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJNYXJzaGFsbGVzZVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiS2FqaW4gTcynYWplxLxcIlxyXG4gICAgfSxcclxuICAgIFwibW5cIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJNb25nb2xpYW5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC80L7QvdCz0L7Qu1wiXHJcbiAgICB9LFxyXG4gICAgXCJuYVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIk5hdXJ1XCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJFa2FrYWlyxakgTmFvZXJvXCJcclxuICAgIH0sXHJcbiAgICBcIm52XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiTmF2YWpvLCBOYXZhaG9cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkRpbsOpIGJpemFhZCwgRGluw6lryrxlaMeww61cIlxyXG4gICAgfSxcclxuICAgIFwibmJcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW4gQm9rbcOlbFwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiTm9yc2sgYm9rbcOlbFwiXHJcbiAgICB9LFxyXG4gICAgXCJuZFwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIk5vcnRoIE5kZWJlbGVcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcImlzaU5kZWJlbGVcIlxyXG4gICAgfSxcclxuICAgIFwibmVcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJOZXBhbGlcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCkqOClh+CkquCkvuCksuClgFwiXHJcbiAgICB9LFxyXG4gICAgXCJuZ1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIk5kb25nYVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT3dhbWJvXCJcclxuICAgIH0sXHJcbiAgICBcIm5uXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiTm9yd2VnaWFuIE55bm9yc2tcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrIG55bm9yc2tcIlxyXG4gICAgfSxcclxuICAgIFwibm9cIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J3ZWdpYW5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIk5vcnNrXCJcclxuICAgIH0sXHJcbiAgICBcImlpXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiTnVvc3VcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuqGiOqMoOqSvyBOdW9zdWh4b3BcIlxyXG4gICAgfSxcclxuICAgIFwibnJcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJTb3V0aCBOZGViZWxlXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJpc2lOZGViZWxlXCJcclxuICAgIH0sXHJcbiAgICBcIm9jXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiT2NjaXRhblwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiT2NjaXRhblwiXHJcbiAgICB9LFxyXG4gICAgXCJvalwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIk9qaWJ3ZSwgT2ppYndhXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLhkIrhk4LhlJHhk4jhkK/hkqfhkI7hk5BcIlxyXG4gICAgfSxcclxuICAgIFwiY3VcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJPbGQgQ2h1cmNoIFNsYXZvbmljLCBDaHVyY2ggU2xhdmljLCBDaHVyY2ggU2xhdm9uaWMsIE9sZCBCdWxnYXJpYW4sIE9sZCBTbGF2b25pY1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0anQt9GL0LrRiiDRgdC70L7QstGj0L3RjNGB0LrRilwiXHJcbiAgICB9LFxyXG4gICAgXCJvbVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIk9yb21vXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJBZmFhbiBPcm9tb29cIlxyXG4gICAgfSxcclxuICAgIFwib3JcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJPcml5YVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KyT4Kyh4Ky84Ky/4KyGXCJcclxuICAgIH0sXHJcbiAgICBcIm9zXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiT3NzZXRpYW4sIE9zc2V0aWNcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItC40YDQvtC9IMOm0LLQt9Cw0LNcIlxyXG4gICAgfSxcclxuICAgIFwicGFcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJQYW5qYWJpLCBQdW5qYWJpXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgqKrgqbDgqJzgqL7gqKzgqYAsINm+2YbYrNin2KjbjOKAjlwiXHJcbiAgICB9LFxyXG4gICAgXCJwaVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlDEgWxpXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgpKrgpL7gpLTgpL9cIlxyXG4gICAgfSxcclxuICAgIFwiZmFcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJQZXJzaWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLZgdin2LHYs9uMXCJcclxuICAgIH0sXHJcbiAgICBcInBsXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiUG9saXNoXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJwb2xza2lcIlxyXG4gICAgfSxcclxuICAgIFwicHNcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJQYXNodG8sIFB1c2h0b1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi2b7amtiq2YhcIlxyXG4gICAgfSxcclxuICAgIFwicHRcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJQb3J0dWd1ZXNlXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJQb3J0dWd1w6pzXCJcclxuICAgIH0sXHJcbiAgICBcInF1XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiUXVlY2h1YVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiUnVuYSBTaW1pLCBLaWNod2FcIlxyXG4gICAgfSxcclxuICAgIFwicm1cIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJSb21hbnNoXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJydW1hbnRzY2ggZ3Jpc2NodW5cIlxyXG4gICAgfSxcclxuICAgIFwicm5cIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJLaXJ1bmRpXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJraVJ1bmRpXCJcclxuICAgIH0sXHJcbiAgICBcInJvXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiUm9tYW5pYW4sIE1vbGRhdmlhbiwgTW9sZG92YW5cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInJvbcOibsSDXCJcclxuICAgIH0sXHJcbiAgICBcInJ1XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiUnVzc2lhblwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0YDRg9GB0YHQutC40Lkg0Y/Qt9GL0LpcIlxyXG4gICAgfSxcclxuICAgIFwic2FcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJTYW5za3JpdCAoU2HhuYFza+G5m3RhKVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KS44KSC4KS44KWN4KSV4KWD4KSk4KSu4KWNXCJcclxuICAgIH0sXHJcbiAgICBcInNjXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiU2FyZGluaWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzYXJkdVwiXHJcbiAgICB9LFxyXG4gICAgXCJzZFwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlNpbmRoaVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4KS44KS/4KSo4KWN4KSn4KWALCDYs9mG2ozZitiMINiz2YbYr9q+24zigI5cIlxyXG4gICAgfSxcclxuICAgIFwic2VcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJOb3J0aGVybiBTYW1pXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJEYXZ2aXPDoW1lZ2llbGxhXCJcclxuICAgIH0sXHJcbiAgICBcInNtXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiU2Ftb2FuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJnYWdhbmEgZmFhIFNhbW9hXCJcclxuICAgIH0sXHJcbiAgICBcInNnXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiU2FuZ29cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcInnDom5nw6IgdMOuIHPDpG5nw7ZcIlxyXG4gICAgfSxcclxuICAgIFwic3JcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJTZXJiaWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgdGA0L/RgdC60Lgg0ZjQtdC30LjQulwiXHJcbiAgICB9LFxyXG4gICAgXCJnZFwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlNjb3R0aXNoIEdhZWxpYzsgR2FlbGljXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJHw6BpZGhsaWdcIlxyXG4gICAgfSxcclxuICAgIFwic25cIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJTaG9uYVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiY2hpU2hvbmFcIlxyXG4gICAgfSxcclxuICAgIFwic2lcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJTaW5oYWxhLCBTaW5oYWxlc2VcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuC3g+C3kuC2guC3hOC2vVwiXHJcbiAgICB9LFxyXG4gICAgXCJza1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlNsb3Zha1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic2xvdmVuxI1pbmFcIlxyXG4gICAgfSxcclxuICAgIFwic2xcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJTbG92ZW5lXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJzbG92ZW7FocSNaW5hXCJcclxuICAgIH0sXHJcbiAgICBcInNvXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiU29tYWxpXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTb29tYWFsaWdhLCBhZiBTb29tYWFsaVwiXHJcbiAgICB9LFxyXG4gICAgXCJzdFwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlNvdXRoZXJuIFNvdGhvXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTZXNvdGhvXCJcclxuICAgIH0sXHJcbiAgICBcImVzXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiU3BhbmlzaDsgQ2FzdGlsaWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJlc3Bhw7FvbCwgY2FzdGVsbGFub1wiXHJcbiAgICB9LFxyXG4gICAgXCJzdVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlN1bmRhbmVzZVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiQmFzYSBTdW5kYVwiXHJcbiAgICB9LFxyXG4gICAgXCJzd1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlN3YWhpbGlcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIktpc3dhaGlsaVwiXHJcbiAgICB9LFxyXG4gICAgXCJzc1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlN3YXRpXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJTaVN3YXRpXCJcclxuICAgIH0sXHJcbiAgICBcInN2XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiU3dlZGlzaFwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwic3ZlbnNrYVwiXHJcbiAgICB9LFxyXG4gICAgXCJ0YVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlRhbWlsXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLgrqTgrq7grr/grrTgr41cIlxyXG4gICAgfSxcclxuICAgIFwidGVcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJUZWx1Z3VcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIuCwpOCxhuCwsuCxgeCwl+CxgVwiXHJcbiAgICB9LFxyXG4gICAgXCJ0Z1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlRhamlrXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLRgtC+0rfQuNC606MsIHRvxJ9pa8SrLCDYqtin2KzbjNqp24zigI5cIlxyXG4gICAgfSxcclxuICAgIFwidGhcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJUaGFpXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLguYTguJfguKJcIlxyXG4gICAgfSxcclxuICAgIFwidGlcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJUaWdyaW55YVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4Ym14YyN4Yit4YqbXCJcclxuICAgIH0sXHJcbiAgICBcImJvXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiVGliZXRhbiBTdGFuZGFyZCwgVGliZXRhbiwgQ2VudHJhbFwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi4L2W4L284L2R4LyL4L2h4L2y4L2CXCJcclxuICAgIH0sXHJcbiAgICBcInRrXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiVHVya21lblwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVMO8cmttZW4sINCi0q/RgNC60LzQtdC9XCJcclxuICAgIH0sXHJcbiAgICBcInRsXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiVGFnYWxvZ1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiV2lrYW5nIFRhZ2Fsb2csIOGcj+GckuGcg+GcheGclCDhnIbhnIThnI7hnJPhnIThnJRcIlxyXG4gICAgfSxcclxuICAgIFwidG5cIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJUc3dhbmFcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlNldHN3YW5hXCJcclxuICAgIH0sXHJcbiAgICBcInRvXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiVG9uZ2EgKFRvbmdhIElzbGFuZHMpXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJmYWthIFRvbmdhXCJcclxuICAgIH0sXHJcbiAgICBcInRyXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiVHVya2lzaFwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVMO8cmvDp2VcIlxyXG4gICAgfSxcclxuICAgIFwidHNcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJUc29uZ2FcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlhpdHNvbmdhXCJcclxuICAgIH0sXHJcbiAgICBcInR0XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiVGF0YXJcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcItGC0LDRgtCw0YDRh9CwLCB0YXRhcsOnYSwg2KrYp9iq2KfYsdqG2KfigI5cIlxyXG4gICAgfSxcclxuICAgIFwidHdcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJUd2lcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlR3aVwiXHJcbiAgICB9LFxyXG4gICAgXCJ0eVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlRhaGl0aWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJSZW8gVGFoaXRpXCJcclxuICAgIH0sXHJcbiAgICBcInVnXCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiVWlnaHVyLCBVeWdodXJcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIlV5xqN1cnHJmSwg2Kbbh9mK2Lrbh9ix2obbleKAjlwiXHJcbiAgICB9LFxyXG4gICAgXCJ1a1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlVrcmFpbmlhblwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwi0YPQutGA0LDRl9C90YHRjNC60LBcIlxyXG4gICAgfSxcclxuICAgIFwidXJcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJVcmR1XCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCLYp9ix2K/ZiFwiXHJcbiAgICB9LFxyXG4gICAgXCJ1elwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlV6YmVrXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJ6YmVrLCDQjtC30LHQtdC6LCDYo9uH2LLYqNuQ2YPigI5cIlxyXG4gICAgfSxcclxuICAgIFwidmVcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJWZW5kYVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiVHNoaXZlbuG4k2FcIlxyXG4gICAgfSxcclxuICAgIFwidmlcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJWaWV0bmFtZXNlXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJUaeG6v25nIFZp4buHdFwiXHJcbiAgICB9LFxyXG4gICAgXCJ2b1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlZvbGFww7xrXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJWb2xhcMO8a1wiXHJcbiAgICB9LFxyXG4gICAgXCJ3YVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIldhbGxvb25cIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIldhbG9uXCJcclxuICAgIH0sXHJcbiAgICBcImN5XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiV2Vsc2hcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIkN5bXJhZWdcIlxyXG4gICAgfSxcclxuICAgIFwid29cIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJXb2xvZlwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiV29sbG9mXCJcclxuICAgIH0sXHJcbiAgICBcImZ5XCI6e1xyXG4gICAgICAgIFwibmFtZVwiOlwiV2VzdGVybiBGcmlzaWFuXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJGcnlza1wiXHJcbiAgICB9LFxyXG4gICAgXCJ4aFwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIlhob3NhXCIsXHJcbiAgICAgICAgXCJuYXRpdmVOYW1lXCI6XCJpc2lYaG9zYVwiXHJcbiAgICB9LFxyXG4gICAgXCJ5aVwiOntcclxuICAgICAgICBcIm5hbWVcIjpcIllpZGRpc2hcIixcclxuICAgICAgICBcIm5hdGl2ZU5hbWVcIjpcIteZ15nWtNeT15nXqVwiXHJcbiAgICB9LFxyXG4gICAgXCJ5b1wiOntcclxuICAgICAgICBcIm5hbWVcIjpcIllvcnViYVwiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiWW9yw7liw6FcIlxyXG4gICAgfSxcclxuICAgIFwiemFcIjp7XHJcbiAgICAgICAgXCJuYW1lXCI6XCJaaHVhbmcsIENodWFuZ1wiLFxyXG4gICAgICAgIFwibmF0aXZlTmFtZVwiOlwiU2HJryBjdWXFi8aFLCBTYXcgY3VlbmdoXCJcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9kYXRhL2xhbmd1YWdlcy5qcyIsImltcG9ydCB7IGZpbHRlclR5cGVzIH0gZnJvbSAnLi4vcmVkdWNlcnMvZmlsdGVyJztcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRSaWdodCA9IGlkID0+ICh7XHJcbiAgICB0eXBlOiBmaWx0ZXJUeXBlcy5BRERfUklHSFQsXHJcbiAgICBpZCxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgcmVtb3ZlUmlnaHQgPSBpZCA9PiAoe1xyXG4gICAgdHlwZTogZmlsdGVyVHlwZXMuUkVNT1ZFX1JJR0hULFxyXG4gICAgaWQsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUNvdW50cmllcyA9IGNvdW50cmllcyA9PiAoe1xyXG4gICAgdHlwZTogZmlsdGVyVHlwZXMuVVBEQVRFX0NPVU5UUklFUyxcclxuICAgIGNvdW50cmllcyxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgdXBkYXRlRXhjbHVzaXZlID0gZXhjbHVzaXZlID0+ICh7XHJcbiAgICB0eXBlOiBmaWx0ZXJUeXBlcy5VUERBVEVfRVhDTFVTSVZFLFxyXG4gICAgZXhjbHVzaXZlLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVTcG9ydCA9IHNwb3J0ID0+ICh7XHJcbiAgICB0eXBlOiBmaWx0ZXJUeXBlcy5VUERBVEVfU1BPUlQsXHJcbiAgICBzcG9ydFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFdmVudCA9IGV2ZW50ID0+ICh7XHJcbiAgICB0eXBlOiBmaWx0ZXJUeXBlcy5VUERBVEVfRVZFTlQsXHJcbiAgICBldmVudFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBjbGVhckZpbHRlciA9ICgpID0+ICh7XHJcbiAgICB0eXBlOiBmaWx0ZXJUeXBlcy5DTEVBUlxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBjbGVhclVwZGF0ZUZpbHRlciA9ICgpID0+ICh7XHJcbiAgICB0eXBlOiBmaWx0ZXJUeXBlcy5DTEVBUl9VUERBVEVcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2FjdGlvbnMvZmlsdGVyQWN0aW9ucy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xyXG5pbXBvcnQge3VwZGF0ZUV2ZW50LCB1cGRhdGVTcG9ydH0gZnJvbSBcIi4uL2FjdGlvbnMvZmlsdGVyQWN0aW9uc1wiO1xyXG5pbXBvcnQge2VkaXRlZFByb2dyYW1TZWxlY3RlZH0gZnJvbSBcIi4uLy4uL21haW4vYWN0aW9ucy91dGlsc1wiO1xyXG5cclxuY2xhc3MgQ29udGVudExpc3RpbmdFdmVudERldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGaXh0dXJlcyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7c2Vhc29uc30gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBsZXQgZml4dHVyZXMgPSBbXTtcclxuXHJcbiAgICAgICAgc2Vhc29ucy5mb3JFYWNoKCBzID0+IHtcclxuICAgICAgICAgICAgaWYgKCBzLmZpeHR1cmVzICkgZml4dHVyZXMgPSBbLi4uZml4dHVyZXMsIC4uLnMuZml4dHVyZXNdXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmaXh0dXJlcztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGdldFNjaGVkdWxlcyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgeyBzZWFzb25zICwgc2NoZWR1bGVzQnlTZWFzb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBsZXQgc2NoZWR1bGVzID0ge1xyXG4gICAgICAgICAgICByb3VuZHMgOiBbXSxcclxuICAgICAgICAgICAgbWF0Y2hlcyA6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWFzb25zLmZvckVhY2gocyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzLnNjaGVkdWxlcykgT2JqZWN0LmVudHJpZXMocy5zY2hlZHVsZXMpLmZvckVhY2goKHNoKSA9PntcclxuICAgICAgICAgICAgICAgIGlmIChzaFsxXS5zZWxlY3RlZCAmJiBzY2hlZHVsZXMucm91bmRzLmluZGV4T2Yoc2hbMF0pID09PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVzLnJvdW5kcy5wdXNoKHNoWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBzaFsxXS5tYXRjaGVzLmZvckVhY2gobSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG0uc2VsZWN0ZWQpIHNjaGVkdWxlcy5tYXRjaGVzLnB1c2gobSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCBzY2hlZHVsZXNCeVNlYXNvbiApe1xyXG4gICAgICAgICAgICBzY2hlZHVsZXNCeVNlYXNvbi5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHMgJiYgT2JqZWN0LmVudHJpZXMocykpIE9iamVjdC5lbnRyaWVzKHMpLmZvckVhY2goKHNoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZWR1bGVzLnJvdW5kcy5pbmRleE9mKHNoWzBdKSA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZXMucm91bmRzLnB1c2goc2hbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaFsxXS5tYXRjaGVzLmZvckVhY2gobSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtLnNlbGVjdGVkKSBzY2hlZHVsZXMubWF0Y2hlcy5wdXNoKG0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2NoZWR1bGVzXHJcbiAgICB9O1xyXG5cclxuICAgIHNob3dQcm9ncmFtSW5mbyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3Qge3JpZ2h0c1BhY2thZ2UsIFBST0dSQU1fTkFNRX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGxldCBzaG93ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChyaWdodHNQYWNrYWdlLmxlbmd0aCA+IDEpIHJldHVybiBzaG93O1xyXG4gICAgICAgIHNob3cgPSBlZGl0ZWRQcm9ncmFtU2VsZWN0ZWQocmlnaHRzUGFja2FnZSk7XHJcbiAgICAgICAgcmV0dXJuIHNob3cgJiYgUFJPR1JBTV9OQU1FO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgc3BvcnRzLFxyXG4gICAgICAgICAgICBzcG9ydENhdGVnb3J5LFxyXG4gICAgICAgICAgICB0b3VybmFtZW50LFxyXG4gICAgICAgICAgICBzZWFzb25zLFxyXG4gICAgICAgICAgICBzaG93Q3VzdG9tSWQsXHJcbiAgICAgICAgICAgIFBST0dSQU1fWUVBUixcclxuICAgICAgICAgICAgUFJPR1JBTV9FUElTT0RFU1xyXG4gICAgICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBsZXQgc2NoZWR1bGVzID0gdGhpcy5nZXRTY2hlZHVsZXMoKTtcclxuICAgICAgICBsZXQgcm91bmRzID0gc2NoZWR1bGVzLnJvdW5kcztcclxuICAgICAgICBsZXQgbWF0Y2hlcyA9IHNjaGVkdWxlcy5tYXRjaGVzO1xyXG4gICAgICAgIGxldCBzZWFzb25UaXRsZSA9ICggc2Vhc29ucy5sZW5ndGggPiAxICkgPyBcIlNlYXNvbnM6IFwiIDogXCJTZWFzb246IFwiO1xyXG4gICAgICAgIGxldCBzZWFzb25OYW1lID0gIHNlYXNvblRpdGxlICsgc2Vhc29ucy5tYXAoc2Vhc29uID0+IChzZWFzb24ueWVhcikpLmpvaW4oXCIsIFwiKTtcclxuICAgICAgICBsZXQgcm91bmRzVGl0bGUgPSAoIHJvdW5kcy5sZW5ndGggPiAxICkgPyBcIlJvdW5kczogXCIgOiBcIlJvdW5kOiBcIjtcclxuICAgICAgICBsZXQgcm91bmRzTmFtZSA9ICByb3VuZHNUaXRsZSArIHJvdW5kcy5qb2luKFwiLCBcIik7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0aW5nLWV2ZW50LWRldGFpbHMgbGlzdGluZy1jb2xcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3RpbmctaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHtzcG9ydHMgJiYgc3BvcnRzLmxlbmd0aCA9PT0gMSAmJiA8c3Bhbj57c3BvcnRzWzBdLm5hbWV9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICB7c3BvcnRzICYmIHNwb3J0cy5sZW5ndGggPiAxICYmIDxzcGFuPk11bHRpcGxlIFNwb3J0czwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAge3Nwb3J0Q2F0ZWdvcnkgJiYgc3BvcnRDYXRlZ29yeS5sZW5ndGggPiAwICYmIDxzcGFuPiB7c3BvcnRDYXRlZ29yeVswXS5uYW1lfTwvc3Bhbj4gfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAge3RvdXJuYW1lbnQgJiYgdG91cm5hbWVudC5sZW5ndGggPiAwICYmXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3RpbmctaXRlbVwiPnt0b3VybmFtZW50WzBdLm5hbWV9PC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIHt0b3VybmFtZW50ICYmIHRvdXJuYW1lbnQubGVuZ3RoID09PSAwICYmXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3RpbmctaXRlbVwiPkdlbmVyYWwgY29udGVudDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICB7c2Vhc29ucyAmJiBzZWFzb25zLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy1pdGVtXCI+e3NlYXNvbk5hbWV9PC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnNob3dQcm9ncmFtSW5mbygpICYmIFBST0dSQU1fWUVBUiAmJlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0aW5nLWl0ZW1cIj5SZWxlYXNlIHllYXI6IHtQUk9HUkFNX1lFQVJ9PC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnNob3dQcm9ncmFtSW5mbygpICYmIFBST0dSQU1fRVBJU09ERVMgJiZcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy1pdGVtXCI+RXBpc29kZXM6IHtQUk9HUkFNX0VQSVNPREVTfTwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRGaXh0dXJlcygpLmxlbmd0aCA+IDEgJiZcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy1pdGVtXCI+e3RoaXMuZ2V0Rml4dHVyZXMoKS5sZW5ndGh9IGZpeHR1cmVzPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIHt0aGlzLmdldEZpeHR1cmVzKCkubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3RpbmctaXRlbVwiPnt0aGlzLmdldEZpeHR1cmVzKClbMF0ubmFtZX08L2Rpdj59XHJcblxyXG4gICAgICAgICAgICAgICAge3JvdW5kcy5sZW5ndGggPT09IDEgJiZcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy1pdGVtXCI+e3JvdW5kc05hbWV9PC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIHtyb3VuZHMubGVuZ3RoID4gMSAmJlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0aW5nLWl0ZW1cIj5NdWx0aXBsZSByb3VuZHM8L2Rpdj59XHJcblxyXG4gICAgICAgICAgICAgICAge21hdGNoZXMubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3RpbmctaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHttYXRjaGVzWzBdLmNvbXBldGl0b3JzLm1hcCgoIGNvbXBldGl0b3IsIGksIGxpc3QpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGtleT17aX0+e2NvbXBldGl0b3IubmFtZX0geyhsaXN0Lmxlbmd0aCAhPT0gaSArIDEpICYmIFwiIHZzIFwiIH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGVudExpc3RpbmdFdmVudERldGFpbHNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29tcG9uZW50cy9Db250ZW50TGlzdGluZ0V2ZW50RGV0YWlscy5qcyIsIlxyXG5leHBvcnQgY29uc3QgZmlsdGVyVHlwZXM9IHtcclxuICAgIEFERF9SSUdIVDonQUREX1JJR0hUJyxcclxuICAgIFJFTU9WRV9SSUdIVCA6ICdSRU1PVkVfUklHSFQnLFxyXG4gICAgVVBEQVRFX0NPVU5UUklFUyA6ICdVUERBVEVfQ09VTlRSSUVTJyxcclxuICAgIFVQREFURV9FWENMVVNJVkUgOiAnVVBEQVRFX0VYQ0xVU0lWRScsXHJcbiAgICBVUERBVEVfU1BPUlQgOiAnVVBEQVRFX1NQT1JUJyxcclxuICAgIFVQREFURV9FVkVOVCA6ICdVUERBVEVfRVZFTlQnLFxyXG4gICAgQ0xFQVIgOiAnQ0xFQVInLFxyXG4gICAgQ0xFQVJfVVBEQVRFIDogJ0NMRUFSX1VQREFURScsXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0RmlsdGVyID0ge1xyXG4gICAgcmlnaHRzOiBbXSxcclxuICAgIGNvdW50cmllczogW10sXHJcbiAgICBleGNsdXNpdmUgOiBmYWxzZSxcclxuICAgIHNwb3J0OiB7XHJcbiAgICAgICAgdmFsdWUgOiBudWxsLFxyXG4gICAgICAgIGxhYmVsIDogXCJBbGwgc3BvcnRzXCJcclxuICAgIH0sXHJcbiAgICBldmVudCA6IFwiXCIsXHJcbiAgICBmb3JjZVVwZGF0ZSA6IHRydWVcclxuXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZmlsdGVyID0gKHN0YXRlID0gZGVmYXVsdEZpbHRlciwgYWN0aW9uKSA9PiB7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuQ0xFQVI6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgZGVmYXVsdEZpbHRlcik7XHJcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5DTEVBUl9VUERBVEU6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgZm9yY2VVcGRhdGU6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuQUREX1JJR0hUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0czogWy4uLnN0YXRlLnJpZ2h0cywgYWN0aW9uLmlkXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlJFTU9WRV9SSUdIVDpcclxuXHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHN0YXRlLnJpZ2h0cy5pbmRleE9mKGFjdGlvbi5pZCk7XHJcbiAgICAgICAgICAgIHN0YXRlLnJpZ2h0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHJpZ2h0czogWy4uLnN0YXRlLnJpZ2h0c11cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfQ09VTlRSSUVTOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIGNvdW50cmllczogYWN0aW9uLmNvdW50cmllc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIGZpbHRlclR5cGVzLlVQREFURV9FWENMVVNJVkU6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgZXhjbHVzaXZlOiBhY3Rpb24uZXhjbHVzaXZlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2UgZmlsdGVyVHlwZXMuVVBEQVRFX1NQT1JUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHNwb3J0OiBhY3Rpb24uc3BvcnRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgY2FzZSBmaWx0ZXJUeXBlcy5VUERBVEVfRVZFTlQ6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQ6IGFjdGlvbi5ldmVudFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2ZpbHRlci5qcyIsImV4cG9ydCBjb25zdCBnZXRDdXJyZW5jeVN5bWJvbCA9IGNvZGUgPT4ge1xyXG4gICAgcmV0dXJuIChjb2RlID09PSBcIkVVUlwiKSA/IFwi4oKsXCIgOiBcIiRcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnb1RvID0gcm91dGUgPT4ge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbnZob3N0dXJsICsgcm91dGVcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnb1RvTGlzdGluZyA9IGlkID0+IHtcclxuICAgIGdvVG8oXCJsaXN0aW5nL1wiKyBpZClcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnb1RvTWFya2V0cGxhY2UgPSAoKSA9PiB7XHJcbiAgICBnb1RvKFwibWFya2V0cGxhY2VcIilcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnb1RvQ2xvc2VkRGVhbHMgPSAoKSA9PiB7XHJcbiAgICBnb1RvKFwiY2xvc2VkZGVhbHNcIilcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRGZWUgPSAoc2FsZXNQYWNrYWdlKSA9PiB7XHJcbiAgICBjb25zdCBmZWVOdW1iZXIgPSBwYXJzZUZsb2F0KHNhbGVzUGFja2FnZS5mZWUpO1xyXG4gICAgcmV0dXJuIGZlZU51bWJlci50b0xvY2FsZVN0cmluZygpICtcIiBcIiArIGdldEN1cnJlbmN5U3ltYm9sKHNhbGVzUGFja2FnZS5jdXJyZW5jeS5jb2RlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRGdWxsTmFtZSA9ICh1c2VyKSA9PiB7XHJcbiAgICByZXR1cm4gdXNlci5maXJzdE5hbWUgKyBcIiBcIiArIHVzZXIubGFzdE5hbWU7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbGltaXRUZXh0ID0gKHR4dCwgbGltaXQgPSAyNSkgPT4ge1xyXG4gICAgcmV0dXJuICh0eHQubGVuZ3RoID4gbGltaXQpID8gdHh0LnN1YnN0cmluZygwLGxpbWl0KSArIFwiLi4uXCIgOiB0eHRcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlZGl0ZWRQcm9ncmFtU2VsZWN0ZWQgPSAocmlnaHRzKSA9PiB7XHJcbiAgICByZXR1cm4gcmlnaHRzLmZpbHRlcihyPT5yLnNob3J0TGFiZWwgPT09ICdQUicpLmxlbmd0aCA9PT0gMVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHBhcnNlU2Vhc29ucyA9IChjb250ZW50KSA9PiB7XHJcbiAgICBjb250ZW50LnNlYXNvbnMuZm9yRWFjaCgoc2Vhc29uKT0+e1xyXG4gICAgICAgIHNlYXNvbi5zZWxlY3RlZFNjaGVkdWxlcyA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5lbnRyaWVzKCBzZWFzb24uc2NoZWR1bGVzKS5maWx0ZXIoKHJvdW5kKSA9PnsgIHJldHVybiByb3VuZFsxXS5zZWxlY3RlZH0gKS5tYXAoKHJvdW5kKT0+e1xyXG4gICAgICAgICAgICBpZiAoIXNlYXNvbi5zZWxlY3RlZFNjaGVkdWxlc1tyb3VuZFswXV0pIHNlYXNvbi5zZWxlY3RlZFNjaGVkdWxlc1tyb3VuZFswXV0gPSB7bWF0Y2hlczpbXX07XHJcbiAgICAgICAgICAgIGlmKHJvdW5kWzFdLnNlbGVjdGVkKXtcclxuICAgICAgICAgICAgICAgIEFycmF5LmZyb20ocm91bmRbMV0ubWF0Y2hlcy52YWx1ZXMoKSkuZmlsdGVyKG1hdGNoID0+IG1hdGNoLnNlbGVjdGVkKS5mb3JFYWNoKChtYXRjaCk9PntcclxuICAgICAgICAgICAgICAgICAgICBzZWFzb24uc2VsZWN0ZWRTY2hlZHVsZXNbcm91bmRbMF1dLm1hdGNoZXMucHVzaChtYXRjaClcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBjb250ZW50O1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vYWN0aW9ucy91dGlscy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBNb21lbnQgZnJvbSBcIm1vbWVudC9tb21lbnRcIjtcclxuaW1wb3J0IFJlYWN0VGFibGUgZnJvbSBcInJlYWN0LXRhYmxlXCI7XHJcbmltcG9ydCBNb2RhbCBmcm9tICdyZWFjdC1tb2RhbCc7XHJcblxyXG5pbXBvcnQgRGlnaXRhbFNpZ25hdHVyZSBmcm9tIFwiLi4vLi4vbWFpbi9jb21wb25lbnRzL0RpZ2l0YWxTaWduYXR1cmVcIjtcclxuaW1wb3J0IHtnZXRDdXJyZW5jeVN5bWJvbCwgZ2V0RmVlLCBsaW1pdFRleHR9IGZyb20gXCIuLi9hY3Rpb25zL3V0aWxzXCI7XHJcbmltcG9ydCB7YWRkSWNvbiwgYmlkSWNvbiwgYmx1ZUNoZWNrSWNvbiwgYmx1ZUVudmVsb3BlSWNvbiwgYnVja2V0SWNvbiwgY2FuY2VsSWNvbiwgZG9jSWNvbiwgZml4ZWRJY29ufSBmcm9tIFwiLi9JY29uc1wiO1xyXG5pbXBvcnQge2N1c3RvbVN0eWxlcywgR2VuZXJpY01vZGFsU3R5bGV9IGZyb20gXCIuLi9zdHlsZXMvY3VzdG9tXCI7XHJcbmltcG9ydCBTZW5kTWVzc2FnZSBmcm9tIFwiLi4vLi4vbWFpbi9jb21wb25lbnRzL1NlbmRNZXNzYWdlXCI7XHJcblxyXG5jbGFzcyBDb21tZXJjaWFsU2FsZXNCdW5kbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBhcHByb3ZlTW9kYWxJc09wZW4gOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVqZWN0TW9kYWxJc09wZW4gOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVtb3ZlTW9kYWxJc09wZW4gOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0JpZHMgOiBwcm9wcy5iaWRzT3BlbiB8fCBmYWxzZVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWNjZXB0QmlkID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtzaWduYXR1cmV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7Y29udGVudElkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQmlkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEJpZDtcclxuICAgICAgICBzZWxlY3RlZEJpZC5jb250ZW50ID0gY29udGVudElkO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NhdmluZyA6IHRydWV9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5hY2NlcHRCaWQoc2VsZWN0ZWRCaWQsIHNpZ25hdHVyZSkuZG9uZShyZXNwb25zZT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthcHByb3ZlTW9kYWxJc09wZW4gOiBmYWxzZSwgc2F2aW5nIDogZmFsc2V9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgcmVtb3ZlQmlkID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBzZWxlY3RlZEJpZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRCaWQ7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2F2aW5nIDogdHJ1ZX0pO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnJlbW92ZUJpZChzZWxlY3RlZEJpZCkuZG9uZShyZXNwb25zZT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZW1vdmVNb2RhbElzT3BlbiA6IGZhbHNlLCBzYXZpbmcgOiBmYWxzZX0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZWplY3RCaWQgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQmlkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEJpZDtcclxuICAgICAgICBzZWxlY3RlZEJpZC5tZXNzYWdlID0gdGhpcy5zdGF0ZS5tZXNzYWdlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NhdmluZyA6IHRydWV9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5yZWplY3RCaWQoc2VsZWN0ZWRCaWQpLmFsd2F5cyhyZXNwb25zZT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWplY3RNb2RhbElzT3BlbiA6IGZhbHNlLCBzYXZpbmcgOiBmYWxzZX0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBjbG9zZVJlbW92ZU1vZGFsID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3JlbW92ZU1vZGFsSXNPcGVuIDogZmFsc2V9KVxyXG4gICAgfTtcclxuXHJcbiAgICBjbG9zZUFwcHJvdmVNb2RhbCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHthcHByb3ZlTW9kYWxJc09wZW4gOiBmYWxzZX0pXHJcbiAgICB9O1xyXG5cclxuICAgIGNsb3NlUmVqZWN0TW9kYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVqZWN0TW9kYWxJc09wZW4gOiBmYWxzZX0pXHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlckFwcHJvdmVNb2RhbCA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3Qge3NhbGVzQnVuZGxlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge3NpZ25hdHVyZSwgc2F2aW5nfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIHJldHVybiA8TW9kYWxcclxuICAgICAgICAgICAgaXNPcGVuPXt0aGlzLnN0YXRlLmFwcHJvdmVNb2RhbElzT3Blbn1cclxuICAgICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e3RoaXMuY2xvc2VBcHByb3ZlTW9kYWx9XHJcbiAgICAgICAgICAgIGJvZHlPcGVuQ2xhc3NOYW1lPXtcImdlbmVyaWMtbW9kYWxcIn1cclxuICAgICAgICAgICAgc3R5bGU9e0dlbmVyaWNNb2RhbFN0eWxlfVxyXG4gICAgICAgID5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiZ2VuZXJpYy1tb2RhbC1jb250YWluZXJcIn0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGFjY2VwdCB0aGlzIGJpZD9cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPERpZ2l0YWxTaWduYXR1cmUgc2lnbmF0dXJlPXtzaWduYXR1cmV9IG9uUmVhZHk9e3NpZ25hdHVyZSA9PiB7IHRoaXMuc2V0U3RhdGUoe3NpZ25hdHVyZX0pIH19IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJidXR0b25zXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5jbG9zZUFwcHJvdmVNb2RhbH0+Q2FuY2VsPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgeyFzYXZpbmcgJiYgPGJ1dHRvbiBjbGFzc05hbWU9e1wiY29uZmlybVwifSBkaXNhYmxlZD17IXNpZ25hdHVyZX0gb25DbGljaz17dGhpcy5hY2NlcHRCaWR9PkFjY2VwdCBCaWQ8L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAge3NhdmluZyAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1zcGluIGZhLWNvZ1wiLz59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9Nb2RhbD5cclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyUmVqZWN0TW9kYWwgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHtzYWxlc0J1bmRsZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtzYXZpbmcsIG1lc3NhZ2V9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIDxNb2RhbFxyXG4gICAgICAgICAgICBpc09wZW49e3RoaXMuc3RhdGUucmVqZWN0TW9kYWxJc09wZW59XHJcbiAgICAgICAgICAgIG9uUmVxdWVzdENsb3NlPXt0aGlzLmNsb3NlUmVqZWN0TW9kYWx9XHJcbiAgICAgICAgICAgIGJvZHlPcGVuQ2xhc3NOYW1lPXtcImdlbmVyaWMtbW9kYWxcIn1cclxuICAgICAgICAgICAgc3R5bGU9e0dlbmVyaWNNb2RhbFN0eWxlfVxyXG4gICAgICAgID5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiZ2VuZXJpYy1tb2RhbC1jb250YWluZXJcIn0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlY2xpbmUgdGhpcyBiaWQ/XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIEVudGVyIE1lc3NhZ2UgKG9wdGlvbmFsKVxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBvbkNoYW5nZT17KGUpPT57dGhpcy5zZXRTdGF0ZSh7bWVzc2FnZTogZS50YXJnZXQudmFsdWV9KX19IHZhbHVlPXttZXNzYWdlfT5cclxuICAgICAgICAgICAgICAgICAgICA8L3RleHRhcmVhPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiYnV0dG9uc1wifT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgeyFzYXZpbmcgJiYgPGJ1dHRvbiBjbGFzc05hbWU9e1wiY29uZmlybVwifSBvbkNsaWNrPXt0aGlzLnJlamVjdEJpZH0+Q29uZmlybTwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICB7c2F2aW5nICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLXNwaW4gZmEtY29nXCIvPn1cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuY2xvc2VSZWplY3RNb2RhbH0+Q2FuY2VsPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9Nb2RhbD5cclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyUmVtb3ZlTW9kYWwgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHtzYXZpbmd9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIDxNb2RhbFxyXG4gICAgICAgICAgICBpc09wZW49e3RoaXMuc3RhdGUucmVtb3ZlTW9kYWxJc09wZW59XHJcbiAgICAgICAgICAgIG9uUmVxdWVzdENsb3NlPXt0aGlzLmNsb3NlUmVtb3ZlTW9kYWx9XHJcbiAgICAgICAgICAgIGJvZHlPcGVuQ2xhc3NOYW1lPXtcImdlbmVyaWMtbW9kYWxcIn1cclxuICAgICAgICAgICAgc3R5bGU9e0dlbmVyaWNNb2RhbFN0eWxlfVxyXG4gICAgICAgID5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiZ2VuZXJpYy1tb2RhbC1jb250YWluZXJcIn0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlbW92ZSB0aGlzIGJpZD9cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJidXR0b25zXCJ9PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7IXNhdmluZyAmJiA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVtb3ZlQmlkfSBjbGFzc05hbWU9e1wiY29uZmlybVwifT5Db25maXJtPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgICAgIHtzYXZpbmcgJiYgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc3BpbiBmYS1jb2dcIi8+fVxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5jbG9zZVJlbW92ZU1vZGFsfT5DYW5jZWw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L01vZGFsPlxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7IHNhbGVzQnVuZGxlLCBjb21wYW55LCBvbkRlbGV0ZSwgY29udGVudElkIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHsgc2hvd0JpZHMgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIGxldCB0b3RhbEZlZSA9IChzYWxlc0J1bmRsZS5iaWRzLmxlbmd0aCA+IDApID8gc2FsZXNCdW5kbGUuYmlkcy5tYXAoYj0+TnVtYmVyKGIudG90YWxGZWUpKS5yZWR1Y2UoKHQsbik9PnQrbikgOiBudWxsO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVyY2lhbC1zYWxlcy1idW5kbGVzXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBcHByb3ZlTW9kYWwoKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclJlamVjdE1vZGFsKCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJSZW1vdmVNb2RhbCgpfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tZXJjaWFsLXNhbGVzLWJ1bmRsZXMtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzYWxlcy1idW5kbGUtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c2FsZXNCdW5kbGUuYnVuZGxlTWV0aG9kID09PSBcIlNFTExfQVNfQlVORExFXCIgJiY8aW1nIHN0eWxlPXt7d2lkdGg6IDI2LCBoZWlnaHQ6IDIzfX0gc3JjPXtmaXhlZEljb259Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYWxlc0J1bmRsZS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNhbGVzLWJ1bmRsZS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYWxlc0J1bmRsZS5mZWUgPiAwICYmIGdldEZlZShzYWxlc0J1bmRsZSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzYWxlc0J1bmRsZS5zYWxlc01ldGhvZCA9PT0gXCJCSURESU5HXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiY8aW1nIHN0eWxlPXt7d2lkdGg6IDIzLCBoZWlnaHQ6IDIzfX0gc3JjPXtiaWRJY29ufS8+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNhbGVzLWJ1bmRsZS1pdGVtLXJpZ2h0XCIgc3R5bGU9e3ttYXJnaW5MZWZ0OiAnYXV0byd9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3NhbGVzQnVuZGxlLmJpZHMuZmlsdGVyKGI9PmIuc3RhdHVzLm5hbWUgPT09IFwiQVBQUk9WRURcIikubGVuZ3RofSBjbG9zZWQgRGVhbHNcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzYWxlcy1idW5kbGUtaXRlbS1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c2FsZXNCdW5kbGUuYmlkcy5maWx0ZXIoYj0+Yi5zdGF0dXMubmFtZSA9PT0gXCJQRU5ESU5HXCIpLmxlbmd0aH0gb3BlbiBiaWRzXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHt0b3RhbEZlZSAmJiA8ZGl2IGNsYXNzTmFtZT1cInNhbGVzLWJ1bmRsZS1pdGVtLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b3RhbEZlZX0ge2dldEN1cnJlbmN5U3ltYm9sKHNhbGVzQnVuZGxlLmN1cnJlbmN5LmNvZGUpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAge3NhbGVzQnVuZGxlLmJpZHMubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2FsZXMtYnVuZGxlLXNob3ctYmlkc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57dGhpcy5zZXRTdGF0ZSh7c2hvd0JpZHM6ICFzaG93Qmlkc30pfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshc2hvd0JpZHMgJiYgPGltZyBzcmM9e2FkZEljb259Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93QmlkcyAmJiA8aW1nIHNyYz17Y2FuY2VsSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtzaG93QmlkcyAmJiBzYWxlc0J1bmRsZS5iaWRzLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge3NhbGVzQnVuZGxlLmJpZHMubWFwKChiKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFNlbmRNZXNzYWdlIHJlZj17XCJtZXNzYWdlUG9wdXBcIiArIGIuaWQgfSBsaXN0aW5nSWQ9e2NvbnRlbnRJZH0gcmVjaXBpZW50PXtiLmJ1eWVyVXNlci5jb21wYW55fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxSZWFjdFRhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJjbG9zZWQtZGVhbHMtdGFibGVcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFBhZ2VTaXplPXszMH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1BhZ2VTaXplT3B0aW9ucz17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQYWdpbmF0aW9uPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLm9uUGFnZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluUm93cz17MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXphYmxlPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17c2FsZXNCdW5kbGUuYmlkc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0PXt0aGlzLnByb3BzLnNlbGVjdH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucz17W3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiBkID0+IHtyZXR1cm4gY29tcGFueS5sZWdhbE5hbWV9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdCdXllcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbGFzc05hbWUgOiAndGFibGUtaGVhZGVyLWJpZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyLWJpZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA6IFwiY29tcGFueVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdGZWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInByaWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogZCA9PiB7cmV0dXJuIHtmZWU6IGQudG90YWxGZWUsIGN1cnJlbmN5OiBzYWxlc0J1bmRsZS5jdXJyZW5jeS5jb2RlfX0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZWxsOiBwcm9wcyA9PiA8ZGl2IGNsYXNzTmFtZT17XCJibHVlXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS5mZWUgKyBcIiBcIiArIGdldEN1cnJlbmN5U3ltYm9sKHByb3BzLnZhbHVlLmN1cnJlbmN5KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdVc2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItYmlnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItYmlnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiAnYnV5ZXJVc2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLmZpcnN0TmFtZSArIFwiIFwiICsgcHJvcHMudmFsdWUubGFzdE5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAnQWN0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ3N0YXR1cy5uYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlID09PSBcIkFQUFJPVkVEXCIgJiYgXCJDbG9zZWQgRGVhbFwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZSA9PT0gXCJQRU5ESU5HXCIgJiYgXCJCaWQgUGxhY2VkXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlID09PSBcIlJFSkVDVEVEXCIgJiYgXCJCaWQgRGVjbGluZWRcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdBY3Rpb24gZGF0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICdjcmVhdGVkQXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7TW9tZW50KHByb3BzLnZhbHVlKS5mb3JtYXQoJ0REL01NL1lZWVknKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA6IFwiYWN0aW9uc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6IGIgPT4ge3JldHVybiB7c3RhdHVzOiBiLnN0YXR1cy5uYW1lLCBiaWQ6IGJ9fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXYgY2xhc3NOYW1lPXtcIlwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMudmFsdWUuc3RhdHVzID09PSBcIlJFSkVDVEVEXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgPGltZyBzdHlsZT17e21hcmdpbjonMCAxMHB4JywgY3Vyc29yOiAncG9pbnRlcid9fSBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2V0U3RhdGUoe3JlbW92ZU1vZGFsSXNPcGVuOnRydWUsIHNlbGVjdGVkQmlkIDogcHJvcHMudmFsdWUuYmlkfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dSZW1vdmVDb25maXJtOiB0cnVlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gc3JjPXtidWNrZXRJY29ufS8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS5zdGF0dXMgPT09IFwiUEVORElOR1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIDxpbWcgc3R5bGU9e3ttYXJnaW46JzAgMTBweCcsIGN1cnNvcjogJ3BvaW50ZXInfX0gb25DbGljaz17KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FwcHJvdmVNb2RhbElzT3Blbjp0cnVlLCBzZWxlY3RlZEJpZCA6IHByb3BzLnZhbHVlLmJpZH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IHNyYz17Ymx1ZUNoZWNrSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMudmFsdWUuc3RhdHVzID09PSBcIlBFTkRJTkdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiA8aW1nIHN0eWxlPXt7bWFyZ2luOicwIDEwcHgnLCBjdXJzb3I6ICdwb2ludGVyJ319IG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3JlamVjdE1vZGFsSXNPcGVuOnRydWUsIHNlbGVjdGVkQmlkIDogcHJvcHMudmFsdWUuYmlkfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0gc3JjPXtjYW5jZWxJY29ufS8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS5zdGF0dXMgPT09IFwiQVBQUk9WRURcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiA8aW1nIHN0eWxlPXt7bWFyZ2luOicwIDEwcHgnLCBjdXJzb3I6ICdwb2ludGVyJ319IG9uQ2xpY2s9eygpPT57fX0gc3JjPXtkb2NJY29ufS8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS5zdGF0dXMgPT09IFwiQVBQUk9WRURcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiA8aW1nIHN0eWxlPXt7bWFyZ2luOicwIDEwcHgnLCBjdXJzb3I6ICdwb2ludGVyJ319IG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlZnNbXCJtZXNzYWdlUG9wdXBcIiArIHByb3BzLnZhbHVlLmJpZC5pZF0ub3BlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19IHNyYz17Ymx1ZUVudmVsb3BlSWNvbn0vPn1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKkNPTkZJUk0gUkVNT1ZFKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2hvd1JlbW92ZUNvbmZpcm0gJiYgPGRpdiBjbGFzc05hbWU9XCJjb25maXJtYXRpb24tdG9vbHRpcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjb25maXJtYXRpb24tdGV4dFwifSBzdHlsZT17eyB3aGl0ZVNwYWNlOiAnbm9ybWFsJ319PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlbW92ZSB0aGlzIGJpZD9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImJ1dHRvbiBidXR0b24tY29uZmlybVwifSBvbkNsaWNrPXsoZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dSZW1vdmVDb25maXJtOiBmYWxzZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EZWxldGUocHJvcHMudmFsdWUuYmlkLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVtb3ZlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidXR0b25cIn0gb25DbGljaz17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93UmVtb3ZlQ29uZmlybTogZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbW1lcmNpYWxTYWxlc0J1bmRsZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvQ29tbWVyY2lhbFNhbGVzQnVuZGxlLmpzIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IE1vbWVudCBmcm9tIFwibW9tZW50L21vbWVudFwiO1xyXG5pbXBvcnQgQ29udGVudExpc3RpbmdFdmVudERldGFpbHMgZnJvbSBcIi4uLy4uL2J1eS9jb21wb25lbnRzL0NvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzXCI7XHJcblxyXG5jbGFzcyBDb250ZW50TGlzdGluZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGJ1eWluZ01vZGUgOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ub0ltYWdlID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9uby1pbWFnZS5wbmdcIjtcclxuICAgICAgICB0aGlzLmJpZEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2hhbW1lci5wbmdcIjtcclxuICAgICAgICB0aGlzLmZpeGVkSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYmlkLnBuZ1wiO1xyXG4gICAgICAgIHRoaXMuYmx1ZUNoZWNrID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9ibHVlX2NoZWNrLnBuZ1wiO1xyXG4gICAgICAgIHRoaXMueWVsbG93Q2hlY2sgPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL3llbGxvd19jaGVjaC5wbmdcIjtcclxuICAgICAgICB0aGlzLmJ1Y2tldGljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2J1Y2tldC5wbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGZWUgPSAoc2FsZXNQYWNrYWdlKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHtjdXJyZW5jeX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGxldCBjdXJyZW5jeUNvZGUgPSBjdXJyZW5jeSB8fCBzYWxlc1BhY2thZ2UuY3VycmVuY3kuY29kZTtcclxuICAgICAgICBsZXQgY3VycmVuY3lTeW1ib2wgPSAoY3VycmVuY3lDb2RlID09PSBcIkVVUlwiID8gXCLigqxcIiA6IFwiJFwiKTtcclxuICAgICAgICByZXR1cm4gc2FsZXNQYWNrYWdlLmZlZSArIFwiIFwiICsgY3VycmVuY3lTeW1ib2wgO1xyXG4gICAgfTtcclxuXHJcbiAgICBvblNlbGVjdCA9ICgpID0+IHtcclxuICAgICAgY29uc3Qge29uU2VsZWN0LCBjdXN0b21JZH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgaWYgKCBvblNlbGVjdCApIG9uU2VsZWN0KGN1c3RvbUlkKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbmZpcm1SZW1vdmVGcm9tV2F0Y2hsaXN0ID0gKGUpID0+e1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbmZpcm1XYXRjaGxpc3RSZW1vdmUgOiB0cnVlfSk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgY2FuY2VsUmVtb3ZlRnJvbVdhdGNobGlzdCA9IChlKSA9PntcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb25maXJtV2F0Y2hsaXN0UmVtb3ZlIDogZmFsc2V9KTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW1vdmVGcm9tV2F0Y2hsaXN0ID0gKGUpID0+IHtcclxuICAgICAgICBjb25zdCB7Y3VzdG9tSWQsIG9uV2F0Y2hsaXN0UmVtb3ZlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkFwaS53YXRjaGxpc3QoY3VzdG9tSWQpO1xyXG5cclxuICAgICAgICBpZiAoIG9uV2F0Y2hsaXN0UmVtb3ZlICkgb25XYXRjaGxpc3RSZW1vdmUoY3VzdG9tSWQpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNvcnRTYWxlc1BhY2thZ2VzID0gKGEsIGIpID0+IHtcclxuICAgICAgICBpZiAoYi50ZXJyaXRvcmllc01ldGhvZCA9PT1cIldPUkxEV0lERVwiKSByZXR1cm4gLTE7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZVByb3BlcnR5KGEudGVycml0b3JpZXMubGVuZ3RoLCBiLnRlcnJpdG9yaWVzLmxlbmd0aClcclxuICAgICAgICAgICAgfHwgdGhpcy5jb21wYXJlUHJvcGVydHkoYi5uYW1lLCBhLm5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzb3J0QWZ0ZXJGaWx0ZXIgPSAoYSwgYikgPT4ge1xyXG5cclxuICAgICAgICBpZiAoYi50ZXJyaXRvcmllc01ldGhvZCA9PT1cIldPUkxEV0lERVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVQcm9wZXJ0eShiLnRlcnJpdG9yaWVzLmxlbmd0aCwgYS50ZXJyaXRvcmllcy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB8fCB0aGlzLmNvbXBhcmVQcm9wZXJ0eShhLm5hbWUsIGIubmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlUHJvcGVydHkoYS50ZXJyaXRvcmllcy5sZW5ndGgsIGIudGVycml0b3JpZXMubGVuZ3RoKVxyXG4gICAgICAgICAgICB8fCB0aGlzLmNvbXBhcmVQcm9wZXJ0eShhLm5hbWUsIGIubmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNvcnRCeUZpbHRlciA9IChzYWxlc1BhY2thZ2VzKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgZmlsdGVyIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBsZXQgdGVtcCA9IFtdIDtcclxuICAgICAgICBsZXQgdGVycml0b3JpZXMgPSBmaWx0ZXIuY291bnRyaWVzLm1hcChjID0+IGMudmFsdWUpO1xyXG5cclxuICAgICAgICBzYWxlc1BhY2thZ2VzLmZvckVhY2goKGUsaSxsKT0+e1xyXG5cclxuICAgICAgICAgICAgbGV0IHQgPSBlLnRlcnJpdG9yaWVzLm1hcCh0PT50LnZhbHVlKTtcclxuICAgICAgICAgICAgbGV0IGV0ID0gKGUudGVycml0b3JpZXNNZXRob2QgPT09IFwiV09STERXSURFX0VYQ0xVRElOR1wiKSA/IGUuZXhjbHVkZWRUZXJyaXRvcmllcy5tYXAodD0+dC52YWx1ZSkgOiBbXTtcclxuICAgICAgICAgICAgbGV0IGFsbCA9IFsuLi50LC4uLmV0XTtcclxuICAgICAgICAgICAgbGV0IGluY2x1ZGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRlcnJpdG9yaWVzLmZvckVhY2godCA9PntcclxuICAgICAgICAgICAgICAgIGlmICggYWxsLmluZGV4T2YodCkgIT09IC0xICkgaW5jbHVkZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBlLmJ1bmRsZU1ldGhvZCA9PT0gXCJTRUxMX0FTX0JVTkRMRVwiICYmIGUudGVycml0b3JpZXNNZXRob2QgPT09IFwiV09STERXSURFXCIpIHtcclxuICAgICAgICAgICAgICAgIGluY2x1ZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIGluY2x1ZGUpIHtcclxuICAgICAgICAgICAgICAgIHRlbXAucHVzaChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gWy4uLnRlbXBdO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb21wYXJlUHJvcGVydHkgPSAoYSwgYikgPT4gIHtcclxuICAgICAgICByZXR1cm4gKGEgPiBiKSA/IDEgOiAoKGIgPiBhKSA/IC0xIDogMClcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBleHBpcmVzQXQsXHJcbiAgICAgICAgICAgIFBST0dSQU1fTkFNRSxcclxuICAgICAgICAgICAgb25TZWxlY3ROYW1lLFxyXG4gICAgICAgICAgICBpbWFnZUJhc2U2NCxcclxuICAgICAgICAgICAgaW1hZ2UsXHJcbiAgICAgICAgICAgIGZpbHRlcixcclxuICAgICAgICAgICAgc29ydFNhbGVzUGFja2FnZXMsXHJcbiAgICAgICAgICAgIHdhdGNobGlzdFJlbW92ZVxyXG4gICAgICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBsZXQge3JpZ2h0c1BhY2thZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByaWdodHNQYWNrYWdlID0gcmlnaHRzUGFja2FnZS5zbGljZSgtNik7XHJcblxyXG4gICAgICAgIGNvbnN0IHtjb25maXJtV2F0Y2hsaXN0UmVtb3ZlfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIGxldCBzYWxlc1BhY2thZ2VzID0gdGhpcy5wcm9wcy5zYWxlc1BhY2thZ2VzO1xyXG4gICAgICAgIGxldCBsaXN0aW5nSW1hZ2UgPSAoaW1hZ2VCYXNlNjQpID8gaW1hZ2VCYXNlNjQgOiBpbWFnZSA/IGFzc2V0c0Jhc2VEaXIgKyBcIi4uL1wiICsgaW1hZ2UgOiB0aGlzLm5vSW1hZ2U7XHJcblxyXG4gICAgICAgIGlmICggZmlsdGVyICYmIGZpbHRlci5jb3VudHJpZXMubGVuZ3RoID4gMCAmJiBzb3J0U2FsZXNQYWNrYWdlcykge1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2VzID0gdGhpcy5zb3J0QnlGaWx0ZXIoc2FsZXNQYWNrYWdlcyk7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZXMuc29ydCh0aGlzLnNvcnRBZnRlckZpbHRlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlcy5zb3J0KHRoaXMuc29ydFNhbGVzUGFja2FnZXMpLnJldmVyc2UoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0aW5nLWxpc3Qtdmlld1wiIG9uQ2xpY2s9e3RoaXMub25TZWxlY3R9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibGVmdFwifSAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImltYWdlXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17bGlzdGluZ0ltYWdlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInJpZ2h0XCJ9ID5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJuYW1lXCJ9IG9uQ2xpY2s9eygpID0+IHsgaWYgKG9uU2VsZWN0TmFtZSkgb25TZWxlY3ROYW1lKCkgfX0+e25hbWV9PC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29udGVudExpc3RpbmdFdmVudERldGFpbHMgey4uLnRoaXMucHJvcHN9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt3YXRjaGxpc3RSZW1vdmUgJiYgIWNvbmZpcm1XYXRjaGxpc3RSZW1vdmUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yIDogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46ICcwIDVweCdcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19IHNyYz17dGhpcy5idWNrZXRpY29ufSBvbkNsaWNrPXt0aGlzLmNvbmZpcm1SZW1vdmVGcm9tV2F0Y2hsaXN0fS8+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbmZpcm1XYXRjaGxpc3RSZW1vdmUgJiYgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46ICcwIDVweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXIgOiAnMXB4IHNvbGlkIGxpZ2h0Z3JleScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nIDogNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlJlbW92ZSBmcm9tIFdhdGNobGlzdD88L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLnJlbW92ZUZyb21XYXRjaGxpc3R9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yIDogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogJzAgMTVweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgOiAncmVkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWWVzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXt0aGlzLmNhbmNlbFJlbW92ZUZyb21XYXRjaGxpc3R9IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yIDogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yIDogJ2dyZWVuJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy1ldmVudC1wYWNrYWdlcyBsaXN0aW5nLWNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0c1BhY2thZ2UubWFwKCggc3IsaSApPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImxpc3RpbmctaXRlbVwiIGtleT17aX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IXNyLmV4Y2x1c2l2ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17e3dpZHRoOiAyMywgaGVpZ2h0OiAyMiwgbWFyZ2luOiAnMCA1cHgnfX0gc3JjPXt0aGlzLmJsdWVDaGVja30vPn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3IuZXhjbHVzaXZlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHN0eWxlPXt7d2lkdGg6IDIzLCBoZWlnaHQ6IDIyLCBtYXJnaW46ICcwIDVweCd9fSBzcmM9e3RoaXMueWVsbG93Q2hlY2t9Lz59XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogXCJyb3dcIiAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzci5zaG9ydExhYmVsICE9PSBcIlBSXCIgJiYgc3IubmFtZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzci5zaG9ydExhYmVsID09PSBcIlBSXCIgJiYgUFJPR1JBTV9OQU1FICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJQcm9ncmFtOiBcIiArIFBST0dSQU1fTkFNRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3IuZXhjbHVzaXZlICYmIDxzcGFuIHN0eWxlPXt7Zm9udFdlaWdodDogNjAwLCBtYXJnaW5MZWZ0OiAzfX0+IEVYPC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wic2FsZXMtYnVuZGxlc1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FsZXNQYWNrYWdlcy5zbGljZSgwLCA0KS5tYXAoICggc2FsZXNQYWNrYWdlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICA8ZGl2IGNsYXNzTmFtZT1cInNhbGVzLXBhY2thZ2VcIiBrZXk9e1wic2FsZXMtcGFja2FnZS1cIisgaX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzYWxlc1BhY2thZ2UuYnVuZGxlTWV0aG9kID09PSBcIlNFTExfQVNfQlVORExFXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiY8ZGl2IHN0eWxlPXt7IG1hcmdpbjogJzAgMTBweCAwIDVweCd9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3t3aWR0aDogMjYsIGhlaWdodDogMjN9fSBzcmM9e3RoaXMuZml4ZWRJY29ufS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tjdXJzb3I6ICdkZWZhdWx0J319PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NhbGVzUGFja2FnZS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCBzYWxlc1BhY2thZ2Uuc2FsZXNNZXRob2QgIT09IFwiQklERElOR1wiIHx8ICAoIHNhbGVzUGFja2FnZS5zYWxlc01ldGhvZCA9PT0gXCJCSURESU5HXCIgJiYgc2FsZXNQYWNrYWdlLmZlZSA+IDAgKSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJjxkaXYgc3R5bGU9e3ttYXJnaW46ICcwIDEwcHgnLCBkaXNwbGF5OiBcImZsZXhcIiwgZmxleDogJzEgMCBhdXRvJ319PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldEZlZShzYWxlc1BhY2thZ2UpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzYWxlc1BhY2thZ2Uuc2FsZXNNZXRob2QgPT09IFwiQklERElOR1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmPGRpdiBzdHlsZT17eyBtYXJnaW46ICcwIDEwcHggMCA1cHgnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHN0eWxlPXt7d2lkdGg6IDIzLCBoZWlnaHQ6IDIzfX0gc3JjPXt0aGlzLmJpZEljb259Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYWxlc1BhY2thZ2VzLmxlbmd0aCA+IDQgJiYgPGRpdiBjbGFzc05hbWU9XCJzYWxlcy1wYWNrYWdlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2NvbG9yOiAnIzJEQTdFNicsIHBhZGRpbmc6ICcwIDE1cHggMCAwcHgnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyB7c2FsZXNQYWNrYWdlcy5sZW5ndGggLSA0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250ZW50TGlzdGluZztcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9Db250ZW50TGlzdGluZy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBNb21lbnQgZnJvbSBcIm1vbWVudC9tb21lbnRcIjtcclxuaW1wb3J0IENvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzIGZyb20gXCIuLi8uLi9idXkvY29tcG9uZW50cy9Db250ZW50TGlzdGluZ0V2ZW50RGV0YWlsc1wiO1xyXG5pbXBvcnQgQ29tbWVyY2lhbFNhbGVzQnVuZGxlIGZyb20gXCIuLi8uLi9tYWluL2NvbXBvbmVudHMvQ29tbWVyY2lhbFNhbGVzQnVuZGxlXCI7XHJcbmltcG9ydCBDb250ZW50TGlzdGluZyBmcm9tIFwiLi9Db250ZW50TGlzdGluZ1wiO1xyXG5pbXBvcnQge2dldEN1cnJlbmN5U3ltYm9sfSBmcm9tIFwiLi4vYWN0aW9ucy91dGlsc1wiO1xyXG5pbXBvcnQge2FkZEljb24sIGNhbmNlbEljb259IGZyb20gXCIuL0ljb25zXCI7XHJcblxyXG5jbGFzcyBDb250ZW50TGlzdGluZ0NvbW1lcmNpYWxBY3Rpdml0eSBleHRlbmRzIENvbnRlbnRMaXN0aW5nIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHNob3dTYWxlc1BhY2thZ2UgOiBwcm9wcy5idW5kbGVzT3BlbiB8fCBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ub0ltYWdlID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9uby1pbWFnZS5wbmdcIjtcclxuICAgICAgICB0aGlzLmJpZEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2hhbW1lci5wbmdcIjtcclxuICAgICAgICB0aGlzLmZpeGVkSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYmlkLnBuZ1wiO1xyXG4gICAgICAgIHRoaXMuYmx1ZUNoZWNrID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9ibHVlX2NoZWNrLnBuZ1wiO1xyXG4gICAgICAgIHRoaXMueWVsbG93Q2hlY2sgPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL3llbGxvd19jaGVjaC5wbmdcIjtcclxuICAgICAgICB0aGlzLmJ1Y2tldGljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2J1Y2tldC5wbmdcIjtcclxuICAgICAgICB0aGlzLmV4Y2xhbWF0aW9uSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvRXhjbGFtYXRpb24ucG5nXCI7XHJcbiAgICAgICAgdGhpcy5lbnZlbG9wZUljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2VudmVsb3BlXzIucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBleHBpcmVzQXQsXHJcbiAgICAgICAgICAgIG9uRGVsZXRlLFxyXG4gICAgICAgICAgICBoaWRlV2l0aG91dEJpZHMsXHJcbiAgICAgICAgICAgIGJpZHNPcGVuLFxyXG4gICAgICAgICAgICByaWdodHNQYWNrYWdlLFxyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2VzLFxyXG4gICAgICAgICAgICBpbWFnZUJhc2U2NCxcclxuICAgICAgICAgICAgaW1hZ2UsXHJcbiAgICAgICAgICAgIGNvbXBhbnksXHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICBQUk9HUkFNX05BTUVcclxuICAgICAgICB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgY29uc3Qge3Nob3dTYWxlc1BhY2thZ2V9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgbGV0IGxpc3RpbmdJbWFnZSA9IChpbWFnZUJhc2U2NCkgPyBpbWFnZUJhc2U2NCA6IGltYWdlID8gYXNzZXRzQmFzZURpciArIFwiLi4vXCIgKyBpbWFnZSA6IHRoaXMubm9JbWFnZTtcclxuICAgICAgICBsZXQgYmlkcyA9IHNhbGVzUGFja2FnZXMucmVkdWNlKCh0LCBzcCk9PnQuY29uY2F0KHNwLmJpZHMpLFtdKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheSA6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIG1hcmdpbkJvdHRvbTogMjB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy1saXN0LXZpZXdcIiBzdHlsZT17e3BhZGRpbmc6IDAsIG1hcmdpbkJvdHRvbTogMCB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJsZWZ0XCJ9IHN0eWxlPXt7cGFkZGluZzogMjV9fSA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImltYWdlXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2xpc3RpbmdJbWFnZX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJyaWdodFwifSAgc3R5bGU9e3twYWRkaW5nOicyNXB4IDAnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm5hbWVcIn0gb25DbGljaz17dGhpcy5vblNlbGVjdH0+e25hbWV9PC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTogXCJmbGV4XCJ9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250ZW50TGlzdGluZ0V2ZW50RGV0YWlscyB7Li4udGhpcy5wcm9wc30vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4V3JhcDogJ3dyYXAnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlLm1hcCgoIHNyLGkgKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYga2V5PXtpfSAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IDQ2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAnMSAxIDQwcHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IXNyLmV4Y2x1c2l2ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3t3aWR0aDogMjMsIGhlaWdodDogMjIsIG1hcmdpbjogJzAgNXB4J319IHNyYz17dGhpcy5ibHVlQ2hlY2t9Lz59XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzci5leGNsdXNpdmUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHN0eWxlPXt7d2lkdGg6IDIzLCBoZWlnaHQ6IDIyLCBtYXJnaW46ICcwIDVweCd9fSBzcmM9e3RoaXMueWVsbG93Q2hlY2t9Lz59XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246IFwicm93XCIgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHNyLnNob3J0TGFiZWwgIT09IFwiUFJcIiAmJiBzci5uYW1lIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBzci5zaG9ydExhYmVsID09PSBcIlBSXCIgJiYgUFJPR1JBTV9OQU1FICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHJvZ3JhbTogXCIgKyBQUk9HUkFNX05BTUVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3IuZXhjbHVzaXZlICYmIDxzcGFuIHN0eWxlPXt7Zm9udFdlaWdodDogNjAwLCBtYXJnaW5MZWZ0OiAzfX0+IEVYPC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7LypCSUQgREVUQUlMUyovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgIGNsYXNzTmFtZT17XCJiaWQtbGlzdGluZy1kZXRhaWxzXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57Ymlkcy5maWx0ZXIoYj0+Yi5zdGF0dXMubmFtZSA9PT0gXCJBUFBST1ZFRFwiKS5sZW5ndGh9IGNsb3NlZCBEZWFsczwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e2JpZHMuZmlsdGVyKGI9PmIuc3RhdHVzLm5hbWUgPT09IFwiUEVORElOR1wiKS5sZW5ndGh9IG9wZW4gYmlkczwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2JpZHMubGVuZ3RoID4gMCAmJiA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtXCJ9IHN0eWxlPXt7Zm9udFdlaWdodDo2MDB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1wiVG90YWw6IFwiICsgYmlkcy5tYXAoYj0+TnVtYmVyKGIudG90YWxGZWUpKS5yZWR1Y2UoKHQsbik9PnQrbikudG9Mb2NhbGVTdHJpbmcoXCJlblwiLCB7IG1heGltdW1GcmFjdGlvbkRpZ2l0czogMiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCIgXCJ9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRDdXJyZW5jeVN5bWJvbChzYWxlc1BhY2thZ2VzWzBdLmN1cnJlbmN5LmNvZGUpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hvdy1idW5kbGVcIiBvbkNsaWNrPXsoKT0+e3RoaXMuc2V0U3RhdGUoe3Nob3dTYWxlc1BhY2thZ2U6ICFzaG93U2FsZXNQYWNrYWdlfSl9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshc2hvd1NhbGVzUGFja2FnZSAmJiBcIlNob3cgc2FsZXMgYnVuZGxlXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd1NhbGVzUGFja2FnZSAmJiBcIkhpZGUgc2FsZXMgYnVuZGxlXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IXNob3dTYWxlc1BhY2thZ2UgJiYgPGltZyBzcmM9e2FkZEljb259Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd1NhbGVzUGFja2FnZSAmJiA8aW1nIHNyYz17Y2FuY2VsSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtzaG93U2FsZXNQYWNrYWdlICYmIHNhbGVzUGFja2FnZXMubWFwKChzYiwgaSApPT57XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoaWRlV2l0aG91dEJpZHMgJiYgc2IuYmlkcy5sZW5ndGggPT09IDAgKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8Q29tbWVyY2lhbFNhbGVzQnVuZGxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXtvbkRlbGV0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2FsZXNCdW5kbGU9e3NifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiaWRzT3Blbj17Ymlkc09wZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhbnk9e2NvbXBhbnl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRJZD17aWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX0vPlxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGVudExpc3RpbmdDb21tZXJjaWFsQWN0aXZpdHk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9Db250ZW50TGlzdGluZ0NvbW1lcmNpYWxBY3Rpdml0eS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBNb21lbnQgZnJvbSBcIm1vbWVudC9tb21lbnRcIjtcclxuaW1wb3J0IENvbnRlbnRMaXN0aW5nRXZlbnREZXRhaWxzIGZyb20gXCIuLi8uLi9idXkvY29tcG9uZW50cy9Db250ZW50TGlzdGluZ0V2ZW50RGV0YWlsc1wiO1xyXG5pbXBvcnQgQ29udGVudExpc3RpbmcgZnJvbSBcIi4vQ29udGVudExpc3RpbmdcIjtcclxuaW1wb3J0IFNlbmRNZXNzYWdlIGZyb20gXCIuLi8uLi9tYWluL2NvbXBvbmVudHMvU2VuZE1lc3NhZ2VcIjtcclxuaW1wb3J0IHtnZXRDdXJyZW5jeVN5bWJvbH0gZnJvbSBcIi4uL2FjdGlvbnMvdXRpbHNcIjtcclxuaW1wb3J0IHtibHVlRW52ZWxvcGVJY29uLCBidWNrZXRJY29uLCBpbmZvSWNvbn0gZnJvbSBcIi4vSWNvbnNcIjtcclxuXHJcbmNsYXNzIENvbnRlbnRMaXN0aW5nUGVuZGluZ0JpZCBleHRlbmRzIENvbnRlbnRMaXN0aW5nIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm5vSW1hZ2UgPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL25vLWltYWdlLnBuZ1wiO1xyXG4gICAgICAgIHRoaXMuYmlkSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvaGFtbWVyLnBuZ1wiO1xyXG4gICAgICAgIHRoaXMuZml4ZWRJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9iaWQucG5nXCI7XHJcbiAgICAgICAgdGhpcy5ibHVlQ2hlY2sgPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2JsdWVfY2hlY2sucG5nXCI7XHJcbiAgICAgICAgdGhpcy55ZWxsb3dDaGVjayA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMveWVsbG93X2NoZWNoLnBuZ1wiO1xyXG4gICAgICAgIHRoaXMuYnVja2V0aWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYnVja2V0LnBuZ1wiO1xyXG4gICAgICAgIHRoaXMuZXhjbGFtYXRpb25JY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9FeGNsYW1hdGlvbi5wbmdcIjtcclxuICAgICAgICB0aGlzLmVudmVsb3BlSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvZW52ZWxvcGVfMi5wbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgIGV4cGlyZXNBdCxcclxuICAgICAgICAgICAgcHJvZ3JhbXMsXHJcbiAgICAgICAgICAgIG9uRGVsZXRlLFxyXG4gICAgICAgICAgICByaWdodHNQYWNrYWdlLFxyXG4gICAgICAgICAgICBvblNlbGVjdE5hbWUsXHJcbiAgICAgICAgICAgIGltYWdlQmFzZTY0LFxyXG4gICAgICAgICAgICBpbWFnZSxcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIGNvbXBhbnksXHJcbiAgICAgICAgICAgIGN1c3RvbUlkLFxyXG4gICAgICAgICAgICBiaWQsXHJcbiAgICAgICAgICAgIFBST0dSQU1fTkFNRVxyXG4gICAgICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBjb25zdCB7c2hvd01lc3NhZ2UsIHNob3dFZGl0ZWR9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICAgICAgbGV0IGxpc3RpbmdJbWFnZSA9IChpbWFnZUJhc2U2NCkgPyBpbWFnZUJhc2U2NCA6IGltYWdlID8gYXNzZXRzQmFzZURpciArIFwiLi4vXCIgKyBpbWFnZSA6IHRoaXMubm9JbWFnZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaXN0aW5nLWxpc3Qtdmlld1wiIG9uQ2xpY2s9e3RoaXMub25TZWxlY3R9IHN0eWxlPXt7cGFkZGluZzogMH19PlxyXG4gICAgICAgICAgICAgICAgPFNlbmRNZXNzYWdlIHJlZj17XCJtZXNzYWdlUG9wdXBcIiArIGlkIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0aW5nSWQ9e2lkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudD17Y29tcGFueX0vPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibGVmdFwifSBzdHlsZT17e3BhZGRpbmc6IDI1fX0gPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImltYWdlXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17bGlzdGluZ0ltYWdlfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInJpZ2h0XCJ9ICBzdHlsZT17e3BhZGRpbmc6JzI1cHggMCd9fT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qTkFNRSovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm5hbWVcIn0gb25DbGljaz17KCkgPT4geyBpZiAob25TZWxlY3ROYW1lKSBvblNlbGVjdE5hbWUoKSB9fT57bmFtZX08L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qQ09NUEFOWSovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbXBhbnlcIn0gb25DbGljaz17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmc1tcIm1lc3NhZ2VQb3B1cFwiICsgaWRdLm9wZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbXBhbnkubGVnYWxOYW1lfSA8aW1nIHN0eWxlPXt7bWFyZ2luTGVmdDogNX19IHNyYz17dGhpcy5lbnZlbG9wZUljb259Lz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2Rpc3BsYXk6IFwiZmxleFwifX0+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7LypERVRBSUxTKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb250ZW50TGlzdGluZ0V2ZW50RGV0YWlscyB7Li4udGhpcy5wcm9wc30vPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qREVUQUlMUyAyKi99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PkV4cGlyeToge01vbWVudChleHBpcmVzQXQpLmZvcm1hdCgnREQvTU0vWVlZWScpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdXN0b20taWRcIj4je2N1c3RvbUlkfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKlJJR0hUUyovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhXcmFwOiAnd3JhcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlLm1hcCgoIHNyLGkgKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2l9ICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluSGVpZ2h0OiA0NixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiAnMSAxIDQwcHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyFzci5leGNsdXNpdmUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3t3aWR0aDogMjMsIGhlaWdodDogMjIsIG1hcmdpbjogJzAgNXB4J319IHNyYz17dGhpcy5ibHVlQ2hlY2t9Lz59XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NyLmV4Y2x1c2l2ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17e3dpZHRoOiAyMywgaGVpZ2h0OiAyMiwgbWFyZ2luOiAnMCA1cHgnfX0gc3JjPXt0aGlzLnllbGxvd0NoZWNrfS8+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246IFwicm93XCIgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3Iuc2hvcnRMYWJlbCAhPT0gXCJQUlwiICYmIHNyLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgc3Iuc2hvcnRMYWJlbCA9PT0gXCJQUlwiICYmIFBST0dSQU1fTkFNRSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHJvZ3JhbTogXCIgKyBQUk9HUkFNX05BTUVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NyLmV4Y2x1c2l2ZSAmJiA8c3BhbiBzdHlsZT17e2ZvbnRXZWlnaHQ6IDYwMCwgbWFyZ2luTGVmdDogM319PiBFWDwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHsvKkJJRCBPUFRJT05TKi99XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxleDogJzEuNSAxIDAlJyxcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRkFGQkZDJyxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJMZWZ0OiAnMXB4IHNvbGlkICNFNkU2RTYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nUm9wOiAxNSxcclxuICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWV2ZW5seScsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzIwcHggMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gOiAncmVsYXRpdmUnXHJcbiAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6J2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWV2ZW5seScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57TW9tZW50KGJpZC5jcmVhdGVkQXQpLmZvcm1hdCgnREQvTU0vWVlZWScpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBsaWdodGdyZXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAnMCAyMHB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PntiaWQuc2FsZXNQYWNrYWdlLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogMTBcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57YmlkLmFtb3VudH0ge2dldEN1cnJlbmN5U3ltYm9sKGJpZC5zYWxlc1BhY2thZ2UuY3VycmVuY3kuY29kZSl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2JpZC5zdGF0dXMubmFtZSA9PT0gXCJFRElURURcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiA8aW1nIHNyYz17aW5mb0ljb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3Zlcj17KCkgPT4ge3RoaXMuc2V0U3RhdGUoe3Nob3dFZGl0ZWQgOiB0cnVlfSl9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4ge3RoaXMuc2V0U3RhdGUoe3Nob3dFZGl0ZWQgOiBmYWxzZX0pfX0gLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvblwiIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDM2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fSBocmVmPXtlbnZob3N0dXJsKyBcImxpc3RpbmcvXCIgK2N1c3RvbUlkK1wiL2J1eS9cIiArIGJpZC5zYWxlc1BhY2thZ2UuaWR9PkluY3JlYXNlIGJpZDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2JpZC5tZXNzYWdlICYmIGJpZC5tZXNzYWdlICE9PSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIDxpbWcgc3JjPXtibHVlRW52ZWxvcGVJY29ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IDUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3Zlcj17KCkgPT4ge3RoaXMuc2V0U3RhdGUoe3Nob3dNZXNzYWdlIDogdHJ1ZX0pfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHt0aGlzLnNldFN0YXRlKHtzaG93TWVzc2FnZSA6IGZhbHNlfSl9fS8+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgey8qTUVTU0FHRSovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c2hvd01lc3NhZ2UgJiYgPGRpdiBjbGFzc05hbWU9XCJzdGF0dXMtdG9vbHRpcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wib3B0aW9uXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtiaWQubWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7LypFRElURUQgVE9PTFRJUCovfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0VkaXRlZCAmJiA8ZGl2IGNsYXNzTmFtZT1cInN0YXR1cy10b29sdGlwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJvcHRpb25cIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGlzdGluZyBlZGl0ZWQgYWZ0ZXIgbGFzdCBiaWQuIFBsZWFzZSByZXZpZXcgdGVybSBzaGVldC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7Zm9udFdlaWdodDogNDAwLGZvbnRTdHlsZTogJ2l0YWxpYyd9fT5QbGFjZWQgYnk6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1wiIFwiICtiaWQuYnV5ZXJVc2VyLmZpcnN0TmFtZSArIFwiIFwiICsgYmlkLmJ1eWVyVXNlci5sYXN0TmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3IgOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA6IDIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodCA6IDIwXHJcbiAgICAgICAgICAgICAgICAgICAgfX0gb25DbGljaz17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dSZW1vdmVDb25maXJtOiB0cnVlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtidWNrZXRJY29ufS8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsvKkNPTkZJUk0gUkVNT1ZFKi99XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2hvd1JlbW92ZUNvbmZpcm0gJiYgPGRpdiBjbGFzc05hbWU9XCJjb25maXJtYXRpb24tdG9vbHRpcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjb25maXJtYXRpb24tdGV4dFwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZW1vdmUgdGhpcyBiaWQ/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidXR0b24gYnV0dG9uLWNvbmZpcm1cIn0gb25DbGljaz17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93UmVtb3ZlQ29uZmlybTogZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlKGJpZC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wiYnV0dG9uXCJ9IG9uQ2xpY2s9eyhlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1JlbW92ZUNvbmZpcm06IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbmNlbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGVudExpc3RpbmdQZW5kaW5nQmlkO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvQ29udGVudExpc3RpbmdQZW5kaW5nQmlkLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xyXG5cclxuY2xhc3MgQ291bnRyeVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBjb3VudHJpZXMgOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5BcGkuZ2V0Q291bnRyaWVzKCkuZG9uZSggKGNvdW50cmllcyApID0+IHtcclxuICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcyA9IGNvdW50cmllcztcclxuICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtjb3VudHJpZXN9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe2NvdW50cmllczogQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldE9wdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge2ZpbHRlciA9IFtdLCBhdmFpbGFibGV9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgbGV0IGNvdW50cmllcyA9IE9iamVjdC52YWx1ZXMoQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzKS5tYXAoKGksayk9Pih7dmFsdWUgOiBpLm5hbWUgLCBsYWJlbCA6IGkubmFtZSB9KSk7XHJcblxyXG4gICAgICAgIGlmIChhdmFpbGFibGUgJiYgYXZhaWxhYmxlLmxlbmd0aCA+IDAgKSBjb3VudHJpZXMgPSBhdmFpbGFibGUubWFwKChpLGspPT4oe3ZhbHVlIDogaSAsIGxhYmVsIDogaSB9KSk7XHJcblxyXG4gICAgICAgIGNvdW50cmllcyA9IGNvdW50cmllcy5maWx0ZXIoY291bnRyeSA9PiBmaWx0ZXIuaW5kZXhPZihjb3VudHJ5LnZhbHVlKSA9PT0gLTEpO1xyXG5cclxuICAgICAgICByZXR1cm4gY291bnRyaWVzO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7dmFsdWUsIG9uQ2hhbmdlLCBjbGFzc05hbWUsIG11bHRpID0gdHJ1ZSwgZGlzYWJsZWQgPSBmYWxzZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lIH1cclxuICAgICAgICAgICAgICAgIG5hbWU9XCJmb3JtLWZpZWxkLW5hbWVcIlxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICAgICAgICAgICAgbXVsdGk9e211bHRpfVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucz17dGhpcy5nZXRPcHRpb25zKCl9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb3VudHJ5U2VsZWN0b3I7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0NvdW50cnlTZWxlY3Rvci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBTaWduYXR1cmVQYWQgZnJvbSAncmVhY3Qtc2lnbmF0dXJlLXBhZCc7XHJcblxyXG5jbGFzcyBEaWdpdGFsU2lnbmF0dXJlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcmVhZHkgOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Ymxhbms6dGhpcy5yZWZzLnNpZ25hdHVyZS50b0RhdGFVUkwoKX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcy5zaWduYXR1cmUuY2xlYXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgZG9uZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGJsYW5rIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHsgb25SZWFkeSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IHNpZ25hdHVyZSB9ID0gdGhpcy5yZWZzO1xyXG5cclxuICAgICAgICBsZXQgZGF0YSA9IHNpZ25hdHVyZS50b0RhdGFVUkwoKTtcclxuXHJcbiAgICAgICAgaWYgKCBkYXRhID09PSBibGFuayApIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cmVhZHk6dHJ1ZX0pO1xyXG4gICAgICAgIGlmIChvblJlYWR5KSBvblJlYWR5KGRhdGEpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlZGl0ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgb25SZWFkeSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZWFkeTpmYWxzZX0pO1xyXG4gICAgICAgIGlmIChvblJlYWR5KSBvblJlYWR5KG51bGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7IHNpZ25hdHVyZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IHJlYWR5IH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpZ2l0YWwtc2lnbmF0dXJlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJkaWdpdGFsLXNpZ25hdHVyZS1wbGFjZWhvbGRlclwifT5cclxuICAgICAgICAgICAgICAgICAgICBEaWdpdGFsIFNpZ25hdHVyZVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7c2lnbmF0dXJlICYmIHJlYWR5ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17e3dpZHRoOiA4MDAsIGhlaWdodDogMzAwLCBtYXJnaW46ICcwIGF1dG8nfX0gc3JjPXtzaWduYXR1cmV9IC8+XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgeyFyZWFkeSAmJiA8U2lnbmF0dXJlUGFkIHJlZj1cInNpZ25hdHVyZVwiIC8+fVxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImJ1dHRvbnNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgeyFyZWFkeSAmJiA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuY2xlYXJ9IGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvbi1zbWFsbCB0cmFuc3BhcmVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDbGVhclxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICB7IXJlYWR5ICYmIDxidXR0b24gb25DbGljaz17dGhpcy5kb25lfSBjbGFzc05hbWU9XCJzdGFuZGFyZC1idXR0b24tc21hbGxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgRG9uZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICB7cmVhZHkgJiYgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmVkaXR9IGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvbi1zbWFsbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOZXcgU2lnbmF0dXJlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRGlnaXRhbFNpZ25hdHVyZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvRGlnaXRhbFNpZ25hdHVyZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBIaXN0b3J5QnV0dG9uIGZyb20gJy4vSGlzdG9yeUJ1dHRvbidcclxuaW1wb3J0IHtnb1RvfSBmcm9tIFwiLi4vYWN0aW9ucy91dGlsc1wiO1xyXG5cclxuY29uc3QgSGVhZGVyQmFyVGFiID0gKHt0YWJOYW1lLCBhY3RpdmVUYWIsIGNoaWxkcmVuLCByb3V0ZX0pID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9eyh0YWJOYW1lID09PSBhY3RpdmVUYWIpID8gXCJ0YWIgYWN0aXZlLXRhYlwiIDogXCJ0YWJcIn1cclxuICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICBpZiAoIHJvdXRlICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgZ29Ubyhyb3V0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufTtcclxuXHJcbmNsYXNzIEhlYWRlckJhciBleHRlbmRzICBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge3RhYiwgcHJvZmlsZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGxvZ29VcmwgPSB0aGlzLmdldExvZ29VcmwodGFiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hbmFnZXItaGVhZGVyXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvXCIgb25DbGljaz17KCk9PmdvVG8obG9nb1VybCl9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXthc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2xvZ28ucG5nXCJ9IGFsdD1cIlwiLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIHsgcHJvZmlsZSA9PT0gXCJCVVlFUlwiICYmIDxIZWFkZXJCYXJUYWJcclxuICAgICAgICAgICAgICAgICAgICB0YWJOYW1lPXtcIk1BUktFVFBMQUNFXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGU9e1wibWFya2V0cGxhY2VcIn1cclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWI9e3RhYn0gPlxyXG4gICAgICAgICAgICAgICAgICAgIE1hcmtldHBsYWNlXHJcbiAgICAgICAgICAgICAgICA8L0hlYWRlckJhclRhYj4gfVxyXG5cclxuICAgICAgICAgICAgICAgIHsgcHJvZmlsZSA9PT0gXCJCVVlFUlwiICYmIDxIZWFkZXJCYXJUYWJcclxuICAgICAgICAgICAgICAgICAgICB0YWJOYW1lPXtcIldBVENITElTVFwifVxyXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlPXtcIndhdGNobGlzdFwifVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYj17dGFifSA+XHJcbiAgICAgICAgICAgICAgICAgICAgV2F0Y2hsaXN0XHJcbiAgICAgICAgICAgICAgICA8L0hlYWRlckJhclRhYj4gfVxyXG5cclxuICAgICAgICAgICAgICAgIHsgcHJvZmlsZSA9PT0gXCJCVVlFUlwiICYmIDxIZWFkZXJCYXJUYWJcclxuICAgICAgICAgICAgICAgICAgICB0YWJOYW1lPXtcIkJJRFNcIn1cclxuICAgICAgICAgICAgICAgICAgICByb3V0ZT17XCJhY3RpdmViaWRzXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiPXt0YWJ9ID5cclxuICAgICAgICAgICAgICAgICAgICBCaWRzXHJcbiAgICAgICAgICAgICAgICA8L0hlYWRlckJhclRhYj4gfVxyXG5cclxuICAgICAgICAgICAgICAgIHsgcHJvZmlsZSA9PT0gXCJCVVlFUlwiICYmIDxIZWFkZXJCYXJUYWJcclxuICAgICAgICAgICAgICAgICAgICB0YWJOYW1lPXtcIkNMT1NFRF9ERUFMU1wifVxyXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlPXtcImNsb3NlZGRlYWxzXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiPXt0YWJ9ID5cclxuICAgICAgICAgICAgICAgICAgICBDbG9zZWQgZGVhbHNcclxuICAgICAgICAgICAgICAgIDwvSGVhZGVyQmFyVGFiPiB9XHJcblxyXG4gICAgICAgICAgICAgICAgeyBwcm9maWxlID09PSBcIlNFTExFUlwiICYmIDxIZWFkZXJCYXJUYWJcclxuICAgICAgICAgICAgICAgICAgICB0YWJOYW1lPXtcIk1BTkFHRV9MSVNUSU5HU1wifVxyXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlPXtcIm1hbmFnZWxpc3RpbmdzXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiPXt0YWJ9ID5cclxuICAgICAgICAgICAgICAgICAgICBNYW5hZ2UgbGlzdGluZ3NcclxuICAgICAgICAgICAgICAgIDwvSGVhZGVyQmFyVGFiPiB9XHJcblxyXG4gICAgICAgICAgICAgICAgeyBwcm9maWxlID09PSBcIlNFTExFUlwiICYmIDxIZWFkZXJCYXJUYWJcclxuICAgICAgICAgICAgICAgICAgICB0YWJOYW1lPXtcIkNPTU1FUkNJQUxfQUNUSVZJVFlcIn1cclxuICAgICAgICAgICAgICAgICAgICByb3V0ZT17XCJjb21tZXJjaWFsYWN0aXZpdHlcIn1cclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWI9e3RhYn0gPlxyXG4gICAgICAgICAgICAgICAgICAgIENvbW1lcmNpYWwgYWN0aXZpdHlcclxuICAgICAgICAgICAgICAgIDwvSGVhZGVyQmFyVGFiPiB9XHJcblxyXG4gICAgICAgICAgICAgICAgeyBwcm9maWxlID09PSBcIlNFTExFUlwiICYmIDxIZWFkZXJCYXJUYWJcclxuICAgICAgICAgICAgICAgICAgICB0YWJOYW1lPXtcIk5FV19MSVNUSU5HXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgcm91dGU9e1wibWFuYWdlbGlzdGluZ3MvbmV3XCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiPXt0YWJ9ID5cclxuICAgICAgICAgICAgICAgICAgICBDcmVhdGUgTGlzdGluZ1xyXG4gICAgICAgICAgICAgICAgPC9IZWFkZXJCYXJUYWI+IH1cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgeyBwcm9maWxlID09PSBcIkJVWUVSXCIgJiZcclxuICAgICAgICAgICAgICAgIDxIaXN0b3J5QnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGFiXCJcclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+e2dvVG8oXCJtYW5hZ2VsaXN0aW5nc1wiKX19XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aD1cIm1hbmFnZWxpc3RpbmdzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXIgc2VsbGluZyBtb2RlXHJcbiAgICAgICAgICAgICAgICA8L0hpc3RvcnlCdXR0b24+IH1cclxuXHJcbiAgICAgICAgICAgICAgICB7IHByb2ZpbGUgPT09IFwiU0VMTEVSXCIgJiZcclxuICAgICAgICAgICAgICAgIDxIaXN0b3J5QnV0dG9uIGNsYXNzTmFtZT1cInRhYlwiIG9uQ2xpY2s9eygpPT57Z29UbyhcIm1hcmtldHBsYWNlXCIpfX0gcGF0aD1cIm1hcmtldHBsYWNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgRW50ZXIgYnV5aW5nIG1vZGVcclxuICAgICAgICAgICAgICAgIDwvSGlzdG9yeUJ1dHRvbj4gfVxyXG5cclxuICAgICAgICAgICAgICAgIDxIaXN0b3J5QnV0dG9uIGNsYXNzTmFtZT1cInRhYlwiIG9uQ2xpY2s9eygpPT57IGdvVG8oXCJtZXNzYWdlcz9wcm9maWxlPVwiICsgcHJvZmlsZSl9fSBwYXRoPVwibWVzc2FnZXNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1lbnZlbG9wZVwiIC8+IE1lc3NhZ2VzXHJcbiAgICAgICAgICAgICAgICA8L0hpc3RvcnlCdXR0b24+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXR0aW5nc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLTJ4IGZhLWdlYXJcIiAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvcHVwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid3JhcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhpc3RvcnlCdXR0b24gY2xhc3NOYW1lPVwidGFiXCIgb25DbGljaz17KCk9Pntnb1RvKFwic2V0dGluZ3M/cHJvZmlsZT1cIiArIHByb2ZpbGUpfX0gcGF0aD1cInNldHRpbmdzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2V0dGluZ3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvSGlzdG9yeUJ1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvbG9nb3V0XCIgY2xhc3NOYW1lPVwidGFiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBnZXRMb2dvVXJsID0gKHRhYikgPT4ge1xyXG4gICAgICAgIGxldCBsb2dvVXJsID0gJyc7XHJcbiAgICAgICAgaWYgKHRhYiA9PT0gJ01BTkFHRV9MSVNUSU5HUycpIHtcclxuICAgICAgICAgICAgbG9nb1VybCA9ICdtYW5hZ2VsaXN0aW5ncydcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRhYiA9PT0gJ01BUktFVFBMQUNFJykge1xyXG4gICAgICAgICAgICBsb2dvVXJsID0gJ21hcmtldHBsYWNlJ1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG9nb1VybDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyQmFyO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0hlYWRlckJhci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5jbGFzcyBIaXN0b3J5QnV0dG9uIGV4dGVuZHMgIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDbGljayA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7IG9uQ2xpY2ssIHBhdGh9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKFwidGVzdFwiLCBcIlRpdGxlXCIsIGVudmhvc3R1cmwgKyBwYXRoKTtcclxuICAgICAgICBvbkNsaWNrKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBvbkJhY2tCdXR0b25FdmVudCA9IChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+IHtcclxuICAgICAgICB3aW5kb3cub25wb3BzdGF0ZSA9IHRoaXMub25CYWNrQnV0dG9uRXZlbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgPGJ1dHRvbiB7Li4udGhpcy5wcm9wc30gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5QnV0dG9uO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL0hpc3RvcnlCdXR0b24uanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNhbmNlbEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2NhbmNlbC5wbmdcIjtcclxuZXhwb3J0IGNvbnN0IGJ1Y2tldEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2J1Y2tldC5wbmdcIjtcclxuZXhwb3J0IGNvbnN0IGFkZEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2FkZC5wbmdcIjtcclxuZXhwb3J0IGNvbnN0IGV4Y2xhbWF0aW9uUm91bmRJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9leGNsYW1hdGlvbl9yb3VuZC5wbmdcIjtcclxuZXhwb3J0IGNvbnN0IGNsb2NrUm91bmRJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9jbG9jay5wbmdcIjtcclxuZXhwb3J0IGNvbnN0IHBsYXlJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9wbGF5LnBuZ1wiO1xyXG5leHBvcnQgY29uc3QgYmx1ZUNoZWNrSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYmx1ZV9jaGVjay5wbmdcIjtcclxuZXhwb3J0IGNvbnN0IHllbGxvd0NoZWNrSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMveWVsbG93X2NoZWNoLnBuZ1wiO1xyXG5leHBvcnQgY29uc3QgYmlkSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvaGFtbWVyLnBuZ1wiO1xyXG5leHBvcnQgY29uc3QgZml4ZWRJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9iaWQucG5nXCI7XHJcbmV4cG9ydCBjb25zdCBkb2NJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9kb2MucG5nXCI7XHJcbmV4cG9ydCBjb25zdCBlZGl0SWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvZWRpdC5wbmdcIjtcclxuZXhwb3J0IGNvbnN0IGJsdWVFbnZlbG9wZUljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2VudmVsb3BlXzIucG5nXCI7XHJcbmV4cG9ydCBjb25zdCBpbmZvSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvaW5mb19ibHVlLnBuZ1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNwaW5uZXIgPSAoe3Rlc3R9KSA9PiAoXHJcbiAgICA8ZGl2PjxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPjwvZGl2PlxyXG4pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9JY29ucy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBNb2RhbCBmcm9tICdyZWFjdC1tb2RhbCc7XHJcbmltcG9ydCB7Y3VzdG9tU3R5bGVzLCBHZW5lcmljTW9kYWxTdHlsZX0gZnJvbSBcIi4uL3N0eWxlcy9jdXN0b21cIjtcclxuaW1wb3J0IHtjb21wYW55SXNWYWxpZH0gZnJvbSBcIi4uLy4uL3NlbGwvYWN0aW9ucy92YWxpZGF0aW9uQWN0aW9uc1wiO1xyXG5cclxuY2xhc3MgU2VuZE1lc3NhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBpc09wZW4gOiBwcm9wcy5pc09wZW5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNPcGVuIDogdHJ1ZX0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjbG9zZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc09wZW4gOiBmYWxzZSwgc2hvd1N1Y2Nlc3MgOiBmYWxzZX0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZW5kID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgbGlzdGluZ0lkLCByZWNpcGllbnQgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xyXG4gICAgICAgICAgICBjb250ZW50IDogdGhpcy5zdGF0ZS5tZXNzYWdlLFxyXG4gICAgICAgICAgICBsaXN0aW5nIDogbGlzdGluZ0lkLFxyXG4gICAgICAgICAgICByZWNpcGllbnQgOiByZWNpcGllbnQuaWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzYXZpbmcgOiB0cnVlfSk7XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnNlbmRNZXNzYWdlKG1lc3NhZ2UpLmRvbmUocj0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzYXZpbmcgOiBmYWxzZSwgc2hvd1N1Y2Nlc3MgOiB0cnVlLCBtZXNzYWdlIDogbnVsbH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7IHJlY2lwaWVudCB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7IHNob3dTdWNjZXNzLCBzYXZpbmcsIG1lc3NhZ2UgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxNb2RhbFxyXG4gICAgICAgICAgICAgICAgaXNPcGVuPXt0aGlzLnN0YXRlLmlzT3Blbn1cclxuICAgICAgICAgICAgICAgIG9uUmVxdWVzdENsb3NlPXt0aGlzLmNsb3NlfVxyXG4gICAgICAgICAgICAgICAgYm9keU9wZW5DbGFzc05hbWU9e1wiZ2VuZXJpYy1tb2RhbFwifVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e0dlbmVyaWNNb2RhbFN0eWxlfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJnZW5lcmljLW1vZGFsLWNvbnRhaW5lclwifT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbnRhY3Qge3JlY2lwaWVudC5sZWdhbE5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshc2F2aW5nICYmICFzaG93U3VjY2VzcyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgb25DaGFuZ2U9eyhlKT0+e3RoaXMuc2V0U3RhdGUoe21lc3NhZ2U6IGUudGFyZ2V0LnZhbHVlfSl9fSB2YWx1ZT17bWVzc2FnZX0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAge3NhdmluZyAmJiA8ZGl2PjxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIgLz48L2Rpdj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93U3VjY2VzcyAmJiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWVzc2FnZSBzZW50IVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImJ1dHRvbnNcIn0+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IXNhdmluZyAmJiAhc2hvd1N1Y2Nlc3MgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wiY29uZmlybVwifSBkaXNhYmxlZD17IW1lc3NhZ2V9IG9uQ2xpY2s9e3RoaXMuc2VuZH0+U2VuZDwvYnV0dG9uPn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshc2hvd1N1Y2Nlc3MgJiYgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNsb3NlfT5DYW5jZWw8L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93U3VjY2VzcyAmJiA8YnV0dG9uICBjbGFzc05hbWU9e1wiY29uZmlybVwifSBvbkNsaWNrPXt0aGlzLmNsb3NlfT5DbG9zZTwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L01vZGFsPlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VuZE1lc3NhZ2U7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL1NlbmRNZXNzYWdlLmpzIiwiZXhwb3J0IGNvbnN0IGN1c3RvbVN0eWxlcyA9IHtcclxuICAgIGNvbnRlbnQgOiB7XHJcbiAgICAgICAgdG9wICAgICAgICAgICAgICAgICAgIDogJzUwJScsXHJcbiAgICAgICAgbGVmdCAgICAgICAgICAgICAgICAgIDogJzUwJScsXHJcbiAgICAgICAgcmlnaHQgICAgICAgICAgICAgICAgIDogJ2F1dG8nLFxyXG4gICAgICAgIGJvdHRvbSAgICAgICAgICAgICAgICA6ICdhdXRvJyxcclxuICAgICAgICBtYXJnaW5SaWdodCAgICAgICAgICAgOiAnLTUwJScsXHJcbiAgICAgICAgdHJhbnNmb3JtICAgICAgICAgICAgIDogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yICAgICAgIDogJyNGNEY2RjknLFxyXG4gICAgICAgIGJvcmRlciAgICAgICAgICAgICAgICA6ICdub25lJyxcclxuICAgICAgICBib3JkZXJSYWRpdXMgICAgICAgICAgOiAwLFxyXG4gICAgICAgIGJvcmRlckJvdHRvbSAgICAgICAgICA6ICc0cHggc29saWQgIzJBQUFFQycsXHJcbiAgICB9LFxyXG4gICAgb3ZlcmxheSA6IHtcclxuICAgICAgICB6SW5kZXggICAgICAgICAgICAgICAgOiAxMDBcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBTZWxlY3Rvck1vZGFsU3R5bGUgPSB7XHJcbiAgICBjb250ZW50IDoge1xyXG4gICAgICAgIHRvcCAgICAgICAgICAgICAgICAgICA6ICc1MCUnLFxyXG4gICAgICAgIGxlZnQgICAgICAgICAgICAgICAgICA6ICc1MCUnLFxyXG4gICAgICAgIHJpZ2h0ICAgICAgICAgICAgICAgICA6ICdhdXRvJyxcclxuICAgICAgICBib3R0b20gICAgICAgICAgICAgICAgOiAnYXV0bycsXHJcbiAgICAgICAgbWFyZ2luUmlnaHQgICAgICAgICAgIDogJy01MCUnLFxyXG4gICAgICAgIHRyYW5zZm9ybSAgICAgICAgICAgICA6ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvciAgICAgICA6ICcjRjRGNkY5JyxcclxuICAgICAgICBib3JkZXIgICAgICAgICAgICAgICAgOiAnbm9uZScsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzICAgICAgICAgIDogMCxcclxuICAgICAgICBib3JkZXJCb3R0b20gICAgICAgICAgOiAnNHB4IHNvbGlkICMyQUFBRUMnLFxyXG4gICAgICAgIHBhZGRpbmcgICAgICAgICAgICAgICA6IFwiMjBweFwiXHJcbiAgICB9LFxyXG4gICAgb3ZlcmxheSA6IHtcclxuICAgICAgICB6SW5kZXggICAgICAgICAgICAgICAgOiAxMDBcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBHZW5lcmljTW9kYWxTdHlsZSA9IHtcclxuICAgIGNvbnRlbnQgOiB7XHJcbiAgICAgICAgdG9wICAgICAgICAgICAgICAgICAgIDogJzUwJScsXHJcbiAgICAgICAgbGVmdCAgICAgICAgICAgICAgICAgIDogJzUwJScsXHJcbiAgICAgICAgcmlnaHQgICAgICAgICAgICAgICAgIDogJ2F1dG8nLFxyXG4gICAgICAgIGJvdHRvbSAgICAgICAgICAgICAgICA6ICdhdXRvJyxcclxuICAgICAgICBtYXJnaW5SaWdodCAgICAgICAgICAgOiAnLTUwJScsXHJcbiAgICAgICAgdHJhbnNmb3JtICAgICAgICAgICAgIDogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yICAgICAgIDogJyNGRkZGRkYnLFxyXG4gICAgICAgIGJvcmRlciAgICAgICAgICAgICAgICA6ICdub25lJyxcclxuICAgICAgICBib3JkZXJSYWRpdXMgICAgICAgICAgOiAwLFxyXG4gICAgICAgIHBhZGRpbmcgICAgICAgICAgICAgICA6IFwiMjBweFwiXHJcbiAgICB9LFxyXG4gICAgb3ZlcmxheSA6IHtcclxuICAgICAgICB6SW5kZXggICAgICAgICAgICAgICAgOiAxMDAsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yICAgICAgIDogJ3JnYmEoMCwgMCwgMCwgMC42KSdcclxuICAgIH1cclxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL3N0eWxlcy9jdXN0b20uanMiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTW9tZW50IGZyb20gXCJtb21lbnQvbW9tZW50XCI7XHJcbmltcG9ydCBDb250ZW50TGlzdGluZ0V2ZW50RGV0YWlscyBmcm9tIFwiLi4vLi4vYnV5L2NvbXBvbmVudHMvQ29udGVudExpc3RpbmdFdmVudERldGFpbHNcIjtcclxuaW1wb3J0IHtnb1RvLCBsaW1pdFRleHR9IGZyb20gXCIuLi8uLi9tYWluL2FjdGlvbnMvdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuICAgIGJsdWVDaGVja0ljb24sIGNsb2NrUm91bmRJY29uLCBleGNsYW1hdGlvblJvdW5kSWNvbiwgcGxheUljb24sXHJcbiAgICB5ZWxsb3dDaGVja0ljb25cclxufSBmcm9tIFwiLi4vLi4vbWFpbi9jb21wb25lbnRzL0ljb25zXCI7XHJcbmltcG9ydCB7U3VwZXJSaWdodEJvYXJkTGFiZWxzfSBmcm9tIFwiLi4vLi4vc2VsbC9jb21wb25lbnRzL1N1cGVyUmlnaHREZWZpbml0aW9uc1wiO1xyXG5cclxuY2xhc3MgQm9hcmRMaXN0aW5nIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgc2hvd09wdGlvbnM6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93UmVtb3ZlQ29uZmlybSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93RGVhY3RpdmF0ZUNvbmZpcm0gOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jbG9ja0ljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2Nsb2NrLnBuZ1wiO1xyXG4gICAgICAgIHRoaXMuZXhjbGFtYXRpb25JY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9leGNsYW1hdGlvbl9yb3VuZC5wbmdcIjtcclxuICAgICAgICB0aGlzLnBsYXlJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9wbGF5LnBuZ1wiO1xyXG4gICAgICAgIHRoaXMuYnVja2V0SWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYnVja2V0X2JsdWUucG5nXCI7XHJcbiAgICAgICAgdGhpcy5lZGl0SWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvZWRpdC5wbmdcIjtcclxuICAgICAgICB0aGlzLmR1cGxpY2F0ZUljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2R1cGxpY2F0ZS5wbmdcIjtcclxuICAgICAgICB0aGlzLnZpZXdJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9zZWFyY2gucG5nXCI7XHJcbiAgICAgICAgdGhpcy5zdWJtaXRJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9zdWJtaXQucG5nXCI7XHJcbiAgICAgICAgdGhpcy5kb3RzSWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvZG90cy5wbmdcIjtcclxuICAgICAgICB0aGlzLmRlYWN0aXZhdGVJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9jbG9zZV9yZWQucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3QgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHtvblNlbGVjdCwgY3VzdG9tSWR9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgIGlmICggb25TZWxlY3QgKSBvblNlbGVjdChjdXN0b21JZCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0b2dnbGVPcHRpb25zID0gKGUpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzaG93T3B0aW9uczogIXRoaXMuc3RhdGUuc2hvd09wdGlvbnN9KTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlZGl0ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgY3VzdG9tSWQgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgZ29UbyhcIm1hbmFnZWxpc3RpbmdzL2VkaXQvXCIgKyBjdXN0b21JZClcclxuICAgIH07XHJcblxyXG4gICAgc3VibWl0ID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgY3VzdG9tSWQgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgZ29UbyhcIm1hbmFnZWxpc3RpbmdzL2VkaXQvXCIgKyBjdXN0b21JZCArIFwiLzVcIilcclxuICAgIH07XHJcblxyXG4gICAgdmlldyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGN1c3RvbUlkIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGdvVG8oXCJsaXN0aW5nL1wiICsgY3VzdG9tSWQpXHJcbiAgICB9O1xyXG5cclxuICAgIGhpZGVPcHRpb25zID0gKGUpID0+IHtcclxuICAgICAgICBjb25zdCB7ZGVmYXVsdEFjdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtzaG93T3B0aW9uc30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dPcHRpb25zOiBmYWxzZX0pO1xyXG4gICAgICAgIGlmICggZGVmYXVsdEFjdGlvbiAmJiAhc2hvd09wdGlvbnMgKXtcclxuICAgICAgICAgICAgaWYgKCBkZWZhdWx0QWN0aW9uID09PSBcIkVESVRcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXQoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIGRlZmF1bHRBY3Rpb24gPT09IFwiVklFV1wiKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlldygpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggZGVmYXVsdEFjdGlvbiA9PT0gXCJTVUJNSVRcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgUFJPR1JBTV9OQU1FLFxyXG4gICAgICAgICAgICBuYW1lLFxyXG4gICAgICAgICAgICBjdXN0b21JZCxcclxuICAgICAgICAgICAgZXhwaXJlc0F0LFxyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2VzLFxyXG4gICAgICAgICAgICByaWdodHNQYWNrYWdlLFxyXG4gICAgICAgICAgICB0b3VybmFtZW50LFxyXG4gICAgICAgICAgICBzZWFzb25zLFxyXG4gICAgICAgICAgICBjbGFzc05hbWUsXHJcbiAgICAgICAgICAgIHNob3dFZGl0LFxyXG4gICAgICAgICAgICBzaG93UmVtb3ZlLFxyXG4gICAgICAgICAgICBzaG93U3VibWl0LFxyXG4gICAgICAgICAgICBzaG93RHVwbGljYXRlLFxyXG4gICAgICAgICAgICBzaG93RGVhY3RpdmF0ZSxcclxuICAgICAgICAgICAgc2hvd1ZpZXcsXHJcbiAgICAgICAgICAgIG9uUmVtb3ZlLFxyXG4gICAgICAgICAgICBvbkR1cGxpY2F0ZSxcclxuICAgICAgICAgICAgb25EZWFjdGl2YXRlLFxyXG4gICAgICAgICAgICBsYXN0QWN0aW9uLFxyXG4gICAgICAgICAgICBsYXN0QWN0aW9uRGF0ZSxcclxuICAgICAgICAgICAgbGFzdEFjdGlvblVzZXIsXHJcbiAgICAgICAgICAgIG93bmVyLFxyXG4gICAgICAgICAgICBzdGF0dXMsXHJcbiAgICAgICAgICAgIG9uU3VibWl0LFxyXG4gICAgICAgICAgICBzdHlsZVxyXG4gICAgICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBjb25zdCB7c2hvd09wdGlvbnMsIHNob3dSZW1vdmVDb25maXJtLCBzaG93RGVhY3RpdmF0ZUNvbmZpcm0sIHNob3dTdGF0dXNJbmZvfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHN0eWxlPXtzdHlsZX0gb25DbGljaz17dGhpcy5oaWRlT3B0aW9uc30+XHJcbiAgICAgICAgICAgICAgICB7c2hvd09wdGlvbnMgJiYgPGRpdiBjbGFzc05hbWU9XCJvcHRpb25zLXRvb2x0aXBcIj5cclxuICAgICAgICAgICAgICAgICAgICB7c2hvd1N1Ym1pdCAmJiA8ZGl2IGNsYXNzTmFtZT17XCJvcHRpb25cIn0gb25DbGljaz17dGhpcy5zdWJtaXR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17dGhpcy5zdWJtaXRJY29ufSAvPiBTdWJtaXRcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3dFZGl0ICYmIDxkaXYgY2xhc3NOYW1lPXtcIm9wdGlvblwifSBvbkNsaWNrPXt0aGlzLmVkaXR9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17dGhpcy5lZGl0SWNvbn0gLz4gRWRpdFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICB7c2hvd0R1cGxpY2F0ZSAmJiA8ZGl2IGNsYXNzTmFtZT17XCJvcHRpb25cIn0gb25DbGljaz17KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd09wdGlvbnM6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRHVwbGljYXRlKGN1c3RvbUlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3RoaXMuZHVwbGljYXRlSWNvbn0gLz4gRHVwbGljYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICAgICAgICAgIHtzaG93VmlldyAmJiA8ZGl2IGNsYXNzTmFtZT17XCJvcHRpb25cIn0gb25DbGljaz17dGhpcy52aWV3fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3RoaXMudmlld0ljb259IC8+IFZpZXdcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICAgICAge3Nob3dSZW1vdmUgJiYgPGRpdiBjbGFzc05hbWU9e1wib3B0aW9uXCJ9IG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dSZW1vdmVDb25maXJtOiB0cnVlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXt0aGlzLmJ1Y2tldEljb259IC8+IFJlbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICB7c2hvd0RlYWN0aXZhdGUgJiYgPGRpdiBjbGFzc05hbWU9e1wib3B0aW9uXCJ9IG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dEZWFjdGl2YXRlQ29uZmlybTogdHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17dGhpcy5kZWFjdGl2YXRlSWNvbn0gc3R5bGU9e3t3aWR0aDogMTZ9fSAvPiBEZWFjdGl2YXRlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7bGFzdEFjdGlvbiAmJiA8ZGl2IGNsYXNzTmFtZT1cImxhc3QtYWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExhc3QgYWN0aW9uOiB7bGFzdEFjdGlvbi5kZXNjcmlwdGlvbn0ge2xhc3RBY3Rpb25Vc2VyICYmIFwiYnkgXCIgKyBsYXN0QWN0aW9uVXNlci5maXJzdE5hbWUgKyBcIiBcIiArIGxhc3RBY3Rpb25Vc2VyLmxhc3ROYW1lIH0ge2xhc3RBY3Rpb25EYXRlICYmIFwib24gXCIgKyBNb21lbnQobGFzdEFjdGlvbkRhdGUpLmZvcm1hdCgnSEg6bW0gREQvTU0vWVlZWScpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAge293bmVyICYmIDxkaXYgY2xhc3NOYW1lPVwibGFzdC1hY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgTGlzdGluZyBPd25lcjoge293bmVyLmZpcnN0TmFtZSArIFwiIFwiICsgb3duZXIubGFzdE5hbWUgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICB7LypDT05GSVJNIERFQUNUSVZBVEUqL31cclxuICAgICAgICAgICAgICAgIHtzaG93RGVhY3RpdmF0ZUNvbmZpcm0gJiYgPGRpdiBjbGFzc05hbWU9XCJjb25maXJtYXRpb24tdG9vbHRpcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbmZpcm1hdGlvbi10ZXh0XCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVhY3RpdmF0ZSB0aGUgbGlzdGluZz9cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidXR0b24gYnV0dG9uLWNvbmZpcm1cIn0gb25DbGljaz17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dEZWFjdGl2YXRlQ29uZmlybTogZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25EZWFjdGl2YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYWN0aXZhdGVcclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJidXR0b25cIn0gb25DbGljaz17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dEZWFjdGl2YXRlQ29uZmlybTogZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2FuY2VsXHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHsvKkNPTkZJUk0gUkVNT1ZFKi99XHJcbiAgICAgICAgICAgICAgICB7c2hvd1JlbW92ZUNvbmZpcm0gJiYgPGRpdiBjbGFzc05hbWU9XCJjb25maXJtYXRpb24tdG9vbHRpcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbmZpcm1hdGlvbi10ZXh0XCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVtb3ZlIHRoZSBsaXN0aW5nP1xyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImJ1dHRvbiBidXR0b24tY29uZmlybVwifSBvbkNsaWNrPXsoZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1JlbW92ZUNvbmZpcm06IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlbW92ZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImJ1dHRvblwifSBvbkNsaWNrPXsoZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2hvd1JlbW92ZUNvbmZpcm06IGZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENhbmNlbFxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIHsvKlNUQVRVUyBJTkZPKi99XHJcbiAgICAgICAgICAgICAgICB7c2hvd1N0YXR1c0luZm8gJiYgPGRpdiBjbGFzc05hbWU9XCJzdGF0dXMtdG9vbHRpcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm9wdGlvblwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3N0YXR1cy5uYW1lID09PSAnUEVORElORycgJiYgXCJMaXN0aW5nIHVuZGVyIHJldmlldy4gTm90IHZpc2libGUgaW4gdGhlIG1hcmtldHBsYWNlIHlldC5cIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAge3N0YXR1cy5uYW1lID09PSAnSU5BQ1RJVkUnICYmIFwiTGlzdGluZyBpcyBkZWFjdGl2YXRlZC5cIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAge3N0YXR1cy5uYW1lID09PSAnUkVKRUNURUQnICYmIFwiTGlzdGluZyByZWplY3RlZC4gUGxlYXNlIGVkaXQgb3IgY29udGFjdCBzdXBwb3J0LlwifVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIHsgKHN0YXR1cy5uYW1lID09PSAnUkVKRUNURUQnIHx8IHN0YXR1cy5uYW1lID09PSAnSU5BQ1RJVkUnIHx8IHN0YXR1cy5uYW1lID09PSAnUEVORElORycgKSAmJlxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJzdGF0dXMtaWNvblwifVxyXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VPdmVyPXsoKSA9PiB7dGhpcy5zZXRTdGF0ZSh7c2hvd1N0YXR1c0luZm8gOiB0cnVlfSl9fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4ge3RoaXMuc2V0U3RhdGUoe3Nob3dTdGF0dXNJbmZvIDogZmFsc2V9KX19PlxyXG4gICAgICAgICAgICAgICAgICAgIHtzdGF0dXMubmFtZSA9PT0gJ1BFTkRJTkcnICYmIDxpbWcgc3JjPXtjbG9ja1JvdW5kSWNvbn0gLz59XHJcbiAgICAgICAgICAgICAgICAgICAge3N0YXR1cy5uYW1lID09PSAnSU5BQ1RJVkUnICYmPGltZyBzcmM9e3BsYXlJY29ufSAvPn1cclxuICAgICAgICAgICAgICAgICAgICB7c3RhdHVzLm5hbWUgPT09ICdSRUpFQ1RFRCcgJiYgPGltZyBzcmM9e2V4Y2xhbWF0aW9uUm91bmRJY29ufSAvPn1cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2ICBjbGFzc05hbWU9XCJtZW51LWljb25cIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZU9wdGlvbnN9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXt0aGlzLmRvdHNJY29ufSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJuYW1lXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgbmFtZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRvdXJuYW1lbnRcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAge3RvdXJuYW1lbnQgJiYgPGRpdj57dG91cm5hbWVudC5uYW1lfTwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICB7dG91cm5hbWVudCAmJiB0b3VybmFtZW50Lmxlbmd0aCA9PT0gMCAmJiA8ZGl2PkdlbmVyYWwgY29udGVudDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICB7c2Vhc29ucyAmJiBzZWFzb25zLmxlbmd0aCA+IDEgJiYgPGRpdj5NdWx0aXBsZSBzZWFzb25zPC9kaXY+fVxyXG4gICAgICAgICAgICAgICAgICAgIHtzZWFzb25zICYmIHNlYXNvbnMubGVuZ3RoID09PSAxICYmIDxkaXY+U2Vhc29uOiB7c2Vhc29uc1swXS55ZWFyfTwvZGl2Pn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wicmlnaHRzXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIHtyaWdodHNQYWNrYWdlICYmIHJpZ2h0c1BhY2thZ2UubWFwKChycCxpLGwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGtleT17XCJycC1cIitpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshcnAuZXhjbHVzaXZlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17Ymx1ZUNoZWNrSWNvbn0vPn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cnAuZXhjbHVzaXZlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17eWVsbG93Q2hlY2tJY29ufS8+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtTdXBlclJpZ2h0Qm9hcmRMYWJlbHNbcnAuc2hvcnRMYWJlbF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHJwLnNob3J0TGFiZWwgPT09IFwiUFJcIiAmJiBQUk9HUkFNX05BTUUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiUHJvZ3JhbTogXCIgKyBQUk9HUkFNX05BTUVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiZXhwaXJ5XCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+eyBzYWxlc1BhY2thZ2VzLmxlbmd0aCB9IHNhbGVzIGJ1bmRsZXsgc2FsZXNQYWNrYWdlcy5sZW5ndGggPiAxICYmIFwic1wifTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+RXhwaXJ5OiB7TW9tZW50KGV4cGlyZXNBdCkuZm9ybWF0KCdERC9NTS9ZWVlZJyl9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQm9hcmRMaXN0aW5nO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29tcG9uZW50cy9Cb2FyZExpc3RpbmcuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCBSZWFjdFRhYmxlIGZyb20gXCJyZWFjdC10YWJsZVwiO1xyXG5pbXBvcnQgQ29udGVudExpc3RpbmcgZnJvbSAnLi4vLi4vbWFpbi9jb21wb25lbnRzL0NvbnRlbnRMaXN0aW5nJztcclxuaW1wb3J0IFNlbmRNZXNzYWdlIGZyb20gXCIuLi8uLi9tYWluL2NvbXBvbmVudHMvU2VuZE1lc3NhZ2VcIjtcclxuaW1wb3J0IHtnZXRDdXJyZW5jeVN5bWJvbCwgZ29UbywgbGltaXRUZXh0fSBmcm9tIFwiLi4vLi4vbWFpbi9hY3Rpb25zL3V0aWxzXCI7XHJcbmltcG9ydCBNb21lbnQgZnJvbSBcIm1vbWVudC9tb21lbnRcIjtcclxuXHJcbmNvbnN0IHJpZ2h0SW1hZ2VTdHlsZSA9IHtcclxuICAgIHdpZHRoOiAxNyxcclxuICAgIGhlaWdodDogMTdcclxufTtcclxuXHJcbmNsYXNzIENsb3NlZERlYWxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGxvYWRpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgYmlkcyA6IFtdLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jYW5jZWxJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9jYW5jZWwucG5nXCI7XHJcbiAgICAgICAgdGhpcy5kb2NJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9kb2MucG5nXCI7XHJcbiAgICAgICAgdGhpcy5ibHVlRW52ZWxvcGVJY29uID0gYXNzZXRzQmFzZURpciArIFwiYXBwL2ltYWdlcy9lbnZlbG9wZV8yLnBuZ1wiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvYWRpbmc6dHJ1ZX0pO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLmdldENsb3NlZERlYWxzKCkuZG9uZSgoYmlkcykgPT4ge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7YmlkczogYmlkcywgbG9hZGluZyA6IGZhbHNlfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdExpc3RpbmcgPSAoaWQpID0+IHtcclxuICAgICAgICBnb1RvKFwibGlzdGluZy9cIiArIGlkKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyICgpIHtcclxuICAgICAgICBjb25zdCB7IGxvYWRpbmcsIGJpZHMgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcbiAgICAgICAgICAgICAgICBmbGV4OiAxXHJcbiAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpZHMubGVuZ3RoID4gMCAmJiBiaWRzLm1hcCgoYixpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8U2VuZE1lc3NhZ2Uga2V5PXtpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17XCJtZXNzYWdlUG9wdXBcIiArIGIuaWQgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RpbmdJZD17Yi5jb250ZW50LmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2lwaWVudD17Yi5jb250ZW50LmNvbXBhbnl9Lz5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBiaWRzLmxlbmd0aCA+IDAgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFJlYWN0VGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJjbG9zZWQtZGVhbHMtdGFibGVcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQYWdlU2l6ZT17MzB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93UGFnZVNpemVPcHRpb25zPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQYWdpbmF0aW9uPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGFnZUNoYW5nZT17dGhpcy5vblBhZ2VDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5Sb3dzPXswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXphYmxlPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE9e2JpZHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q9e3RoaXMucHJvcHMuc2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucz17W3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdEZWFsIElEJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyIHRhYmxlLWhlYWRlci1sZWZ0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2N1c3RvbUlkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZWxsOiBwcm9wcyA9PiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XCIjXCIrcHJvcHMudmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAnTGlzdGluZyBuYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbGFzc05hbWUgOiAndGFibGUtaGVhZGVyLWJpZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1iaWcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAnbmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6IGQgPT4ge3JldHVybntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA6IGQuY29udGVudC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21JZCA6IGQuY29udGVudC5jdXN0b21JZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZWxsOiBwcm9wcyA9PiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtcImxpc3RpbmcvXCIgKyBwcm9wcy52YWx1ZS5jdXN0b21JZH0+e2xpbWl0VGV4dChwcm9wcy52YWx1ZS5uYW1lKX08L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICdjb250ZW50LmNvbXBhbnkubGVnYWxOYW1lJywgLy8gUmVxdWlyZWQgYmVjYXVzZSBvdXIgYWNjZXNzb3IgaXMgbm90IGEgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAnU2VsbGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJDbGFzc05hbWUgOiAndGFibGUtaGVhZGVyLWJpZycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1iaWcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ0xUJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2NvbnRlbnQucmlnaHRzUGFja2FnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYmx1ZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLm1hcChyPT5yLnNob3J0TGFiZWwpLmluZGV4T2YoXCJMVFwiKSAhPT0gLTEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17cmlnaHRJbWFnZVN0eWxlfSBzcmM9e3RoaXMuY2FuY2VsSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ0xCJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2NvbnRlbnQucmlnaHRzUGFja2FnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYmx1ZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLm1hcChyPT5yLnNob3J0TGFiZWwpLmluZGV4T2YoXCJITFwiKSAhPT0gLTEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17cmlnaHRJbWFnZVN0eWxlfSBzcmM9e3RoaXMuY2FuY2VsSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ0RUJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2NvbnRlbnQucmlnaHRzUGFja2FnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYmx1ZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLm1hcChyPT5yLnNob3J0TGFiZWwpLmluZGV4T2YoXCJEVFwiKSAhPT0gLTEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17cmlnaHRJbWFnZVN0eWxlfSBzcmM9e3RoaXMuY2FuY2VsSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ0hMJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2NvbnRlbnQucmlnaHRzUGFja2FnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYmx1ZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLm1hcChyPT5yLnNob3J0TGFiZWwpLmluZGV4T2YoXCJITFwiKSAhPT0gLTEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17cmlnaHRJbWFnZVN0eWxlfSBzcmM9e3RoaXMuY2FuY2VsSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ0NMJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2NvbnRlbnQucmlnaHRzUGFja2FnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYmx1ZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLm1hcChyPT5yLnNob3J0TGFiZWwpLmluZGV4T2YoXCJDTFwiKSAhPT0gLTEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17cmlnaHRJbWFnZVN0eWxlfSBzcmM9e3RoaXMuY2FuY2VsSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ05BJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2NvbnRlbnQucmlnaHRzUGFja2FnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYmx1ZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLm1hcChyPT5yLnNob3J0TGFiZWwpLmluZGV4T2YoXCJOQVwiKSAhPT0gLTEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17cmlnaHRJbWFnZVN0eWxlfSBzcmM9e3RoaXMuY2FuY2VsSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ0FSJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2NvbnRlbnQucmlnaHRzUGFja2FnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYmx1ZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLm1hcChyPT5yLnNob3J0TGFiZWwpLmluZGV4T2YoXCJBUlwiKSAhPT0gLTEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17cmlnaHRJbWFnZVN0eWxlfSBzcmM9e3RoaXMuY2FuY2VsSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ1BSJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2NvbnRlbnQucmlnaHRzUGFja2FnZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1zbWFsbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYmx1ZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLm1hcChyPT5yLnNob3J0TGFiZWwpLmluZGV4T2YoXCJQUlwiKSAhPT0gLTEgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzdHlsZT17cmlnaHRJbWFnZVN0eWxlfSBzcmM9e3RoaXMuY2FuY2VsSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdUZXJyaXRvcmllcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGVycml0b3JpZXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogZCA9PiB7cmV0dXJue1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplIDogZC5zYWxlc1BhY2thZ2UudGVycml0b3JpZXMubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3JsZHdpZGUgOiBkLnNhbGVzUGFja2FnZS50ZXJyaXRvcmllc01ldGhvZCA9PT0gXCJXT1JMRFdJREVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNCdW5kbGUgOiBkLnNhbGVzUGFja2FnZS5idW5kbGVNZXRob2QgPT09IFwiU0VMTF9BU19CVU5ETEVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXYgY2xhc3NOYW1lPXtcImJsdWVcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgKCFwcm9wcy52YWx1ZS53b3JsZHdpZGUgfHwgIXByb3BzLnZhbHVlLmFzQnVuZGxlKSAmJiBwcm9wcy52YWx1ZS5zaXplICsgXCIgXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoIXByb3BzLnZhbHVlLndvcmxkd2lkZSB8fCAhcHJvcHMudmFsdWUuYXNCdW5kbGUpICYmIHByb3BzLnZhbHVlLnNpemUgPiAxICYmIFwidGVycml0b3JpZXNcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsoIXByb3BzLnZhbHVlLndvcmxkd2lkZSB8fCAhcHJvcHMudmFsdWUuYXNCdW5kbGUpICYmIHByb3BzLnZhbHVlLnNpemUgPT09IDEgJiYgXCJ0ZXJyaXRvcnlcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS53b3JsZHdpZGUgJiYgcHJvcHMudmFsdWUuYXNCdW5kbGUgJiYgXCJXb3JsZHdpZGVcIiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAnUHJpY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInByaWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6IGQgPT4ge3JldHVybiB7ZmVlOiBkLnRvdGFsRmVlLCBjdXJyZW5jeTogZC5zYWxlc1BhY2thZ2UuY3VycmVuY3kuY29kZX19LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxkaXYgY2xhc3NOYW1lPXtcImJsdWVcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9wcy52YWx1ZS5mZWUgKyBcIiBcIiArIGdldEN1cnJlbmN5U3ltYm9sKHByb3BzLnZhbHVlLmN1cnJlbmN5KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdEYXRlIG9mIHNhbGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiAnY3JlYXRlZEF0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZWxsOiBwcm9wcyA9PiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7TW9tZW50KHByb3BzLnZhbHVlKS5mb3JtYXQoJ0REL01NL1lZWVknKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAnTmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlci1iaWcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXItYmlnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2J1eWVyVXNlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2VsbDogcHJvcHMgPT4gPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLnZhbHVlLmZpcnN0TmFtZSArIFwiIFwiICsgcHJvcHMudmFsdWUubGFzdE5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAnQWN0aW9ucycsIC8vIEN1c3RvbSBoZWFkZXIgY29tcG9uZW50cyFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2lkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDZWxsOiBwcm9wcyA9PiA8ZGl2IGNsYXNzTmFtZT17XCJcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3ttYXJnaW46JzAgMTBweCcsIGN1cnNvcjogJ3BvaW50ZXInfX0gb25DbGljaz17KCk9Pnt9fSBzcmM9e3RoaXMuZG9jSWNvbn0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHN0eWxlPXt7bWFyZ2luOicwIDEwcHgnLCBjdXJzb3I6ICdwb2ludGVyJ319IG9uQ2xpY2s9eygpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnNbXCJtZXNzYWdlUG9wdXBcIitwcm9wcy52YWx1ZV0ub3BlbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fSBzcmM9e3RoaXMuYmx1ZUVudmVsb3BlSWNvbn0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJpZHMubGVuZ3RoID09PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYW5hZ2VyLWNvbnRlbnQtbWVzc2FnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nICYmIDxkaXYgY2xhc3NOYW1lPVwiYmlnLXNwaW5uZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbG9hZGluZyAmJiA8ZGl2IGNsYXNzTmFtZT1cImJpZy1zcGlubmVyXCIgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBkb24ndCBoYXZlIGNsb3NlZCBkZWFsIHlldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCBzdGF0ZSwgb3duUHJvcHMpID0+IHtcclxuICAgIHJldHVybiBzdGF0ZTtcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKENsb3NlZERlYWxzKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9jb250YWluZXJzL0Nsb3NlZERlYWxzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XHJcblxyXG5pbXBvcnQgQ29udGVudExpc3RpbmdDb21tZXJjaWFsQWN0aXZpdHkgZnJvbSAnLi4vLi4vbWFpbi9jb21wb25lbnRzL0NvbnRlbnRMaXN0aW5nQ29tbWVyY2lhbEFjdGl2aXR5JztcclxuXHJcbmltcG9ydCB7Z29Ub0xpc3Rpbmd9IGZyb20gXCIuLi8uLi9tYWluL2FjdGlvbnMvdXRpbHNcIjtcclxuaW1wb3J0IHtsYW5ndWFnZXN9IGZyb20gXCIuLi8uLi8uLi9kYXRhL2xhbmd1YWdlc1wiO1xyXG5cclxuY2xhc3MgQ29tbWVyY2lhbEFjdGl2aXR5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGxvYWRpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgbGlzdGluZ3MgOiBbXSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRMaXN0aW5nczogW10sXHJcbiAgICAgICAgICAgIGZpbHRlcjogJ0FMTCcsXHJcbiAgICAgICAgICAgIGJ1bmRsZXNPcGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgYmlkc09wZW4gOiBmYWxzZVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYnVsbGV0SWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYnVsbGV0LnBuZ1wiO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQnVsbGV0SWNvbiA9IGFzc2V0c0Jhc2VEaXIgKyBcImFwcC9pbWFnZXMvYWN0aXZlX2J1bGxldC5wbmdcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVCaWQgPSAoaWQpID0+IHtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5yZW1vdmVCaWQoe2lkOmlkfSkuZG9uZSgocik9PntcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlID0gKCk9PiB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOnRydWV9KTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0QWxsRGVhbHMoKS5kb25lKChsaXN0aW5ncykgPT4ge1xyXG4gICAgICAgICAgICBsaXN0aW5ncy5mb3JFYWNoKGw9PkNvbnRlbnRBcmVuYS5VdGlscy5jb250ZW50UGFyc2VyRnJvbVNlcnZlcihsKSk7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtsaXN0aW5nczogbGlzdGluZ3MsIGxvYWRpbmcgOiBmYWxzZX0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBmaWx0ZXJCeUxpc3RpbmcgPSAoc2VsZWN0ZWQpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRMaXN0aW5ncyA6IChzZWxlY3RlZCkgPyBbc2VsZWN0ZWQudmFsdWVdIDogW10sXHJcbiAgICAgICAgICAgIGJpZHNPcGVuIDogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIGZpbHRlcmVkID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgZmlsdGVyICwgc2VsZWN0ZWRMaXN0aW5nc30gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgICAgICBsZXQgbGlzdGluZ3MgPSB0aGlzLnN0YXRlLmxpc3RpbmdzO1xyXG5cclxuICAgICAgICBpZiAoIHNlbGVjdGVkTGlzdGluZ3MubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICAgICBsaXN0aW5ncyA9IGxpc3RpbmdzLmZpbHRlcihiID0+IHNlbGVjdGVkTGlzdGluZ3MuaW5kZXhPZihiLmlkKSAhPT0gLTEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3dpdGNoIChmaWx0ZXIpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkNMT1NFRFwiIDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0aW5ncy5maWx0ZXIoYiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGIuc2FsZXNQYWNrYWdlcy5maWx0ZXIoKHNwKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3AuYmlkcy5maWx0ZXIoYj0+Yi5zdGF0dXMubmFtZSA9PT0gXCJBUFBST1ZFRFwiKS5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2FzZSBcIk9QRU5cIiA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGluZ3MuZmlsdGVyKGIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiLnNhbGVzUGFja2FnZXMuZmlsdGVyKChzcCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNwLmJpZHMuZmlsdGVyKGI9PmIuc3RhdHVzLm5hbWUgPT09IFwiUEVORElOR1wiKS5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSkubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RpbmdzO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICByZW1vdmUgPSAoIGN1c3RvbUlkKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGxpc3RpbmdzIDogdGhpcy5zdGF0ZS5saXN0aW5ncy5maWx0ZXIobCA9PiBsLmN1c3RvbUlkICE9PSBjdXN0b21JZClcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyICgpIHtcclxuICAgICAgICBjb25zdCB7IGxvYWRpbmcsIGZpbHRlciwgc2VsZWN0ZWRMaXN0aW5ncyB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBsaXN0aW5ncyA9IHRoaXMuZmlsdGVyZWQoKTtcclxuICAgICAgICBjb25zdCBhbGxMaXN0aW5ncyA9IHRoaXMuc3RhdGUubGlzdGluZ3M7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e2hlaWdodCA6ICcxMDAlJ319PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm1hbmFnZXItZmlsdGVyLWNvbnRhaW5lclwifT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJsaXN0aW5nLWZpbHRlclwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT1cImZvcm0tZmllbGQtbmFtZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFsbCBsaXN0aW5nc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5maWx0ZXJCeUxpc3Rpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdWx0aT17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRMaXN0aW5nc1swXX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e2FsbExpc3RpbmdzLm1hcCgoYik9Pih7dmFsdWUgOiBiLmlkICwgbGFiZWwgOiBiLm5hbWUgfSkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJzdGF0dXMtZmlsdGVyXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJzdGF0dXMtZmlsdGVyLWl0ZW1cIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+e3RoaXMuc2V0U3RhdGUoe2ZpbHRlcjogXCJBTExcIn0pfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyPT09XCJBTExcIiAmJiA8aW1nIHNyYz17dGhpcy5hY3RpdmVCdWxsZXRJY29ufSAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXIhPT1cIkFMTFwiICYmIDxpbWcgc3JjPXt0aGlzLmJ1bGxldEljb259IC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWxsIGJ1bmRsZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInN0YXR1cy1maWx0ZXItaXRlbVwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57dGhpcy5zZXRTdGF0ZSh7ZmlsdGVyOiAnQUNUSVZJVFknfSl9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXI9PT1cIkFDVElWSVRZXCIgJiYgPGltZyBzcmM9e3RoaXMuYWN0aXZlQnVsbGV0SWNvbn0gLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZmlsdGVyIT09XCJBQ1RJVklUWVwiICYmIDxpbWcgc3JjPXt0aGlzLmJ1bGxldEljb259IC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgV2l0aCBhY3Rpdml0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wic3RhdHVzLWZpbHRlci1pdGVtXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9Pnt0aGlzLnNldFN0YXRlKHtmaWx0ZXI6IFwiT1BFTlwifSl9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXI9PT1cIk9QRU5cIiAmJiA8aW1nIHNyYz17dGhpcy5hY3RpdmVCdWxsZXRJY29ufSAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXIhPT1cIk9QRU5cIiAmJiA8aW1nIHNyYz17dGhpcy5idWxsZXRJY29ufSAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wZW4gQmlkc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wic3RhdHVzLWZpbHRlci1pdGVtXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9Pnt0aGlzLnNldFN0YXRlKHtmaWx0ZXI6ICdDTE9TRUQnfSl9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmaWx0ZXI9PT1cIkNMT1NFRFwiICYmIDxpbWcgc3JjPXt0aGlzLmFjdGl2ZUJ1bGxldEljb259IC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2ZpbHRlciE9PVwiQ0xPU0VEXCIgJiYgPGltZyBzcmM9e3RoaXMuYnVsbGV0SWNvbn0gLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDbG9zZWQgZGVhbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGluZ3MubGVuZ3RoID4gMCAmJiBsaXN0aW5ncy5tYXAoKGxpc3RpbmcsIGksIGxpc3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxDb250ZW50TGlzdGluZ0NvbW1lcmNpYWxBY3Rpdml0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EZWxldGU9e3RoaXMuZGVsZXRlQmlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmlkc09wZW49e2xpc3QubGVuZ3RoID09PSAxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVuZGxlc09wZW49e2xpc3QubGVuZ3RoID09PSAxIHx8IHRoaXMuc3RhdGUuZmlsdGVyICE9PSBcIkFMTFwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZVdpdGhvdXRCaWRzPXt0aGlzLnN0YXRlLmZpbHRlciA9PT0gXCJBQ1RJVklUWVwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2lkID0+IGdvVG9MaXN0aW5nKGlkKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aSArIFwiLVwiICsgbGlzdGluZy5jdXN0b21JZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5saXN0aW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RpbmdzLmxlbmd0aCA9PT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFuYWdlci1jb250ZW50LW1lc3NhZ2VcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZyAmJiA8ZGl2IGNsYXNzTmFtZT1cImJpZy1zcGlubmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWxvYWRpbmcgJiYgPGRpdiBjbGFzc05hbWU9XCJiaWctc3Bpbm5lclwiIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3UgaGF2ZSBubyBvZmZlcnMgeWV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICggc3RhdGUsIG93blByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShDb21tZXJjaWFsQWN0aXZpdHkpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvQ29tbWVyY2lhbEFjdGl2aXR5LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQge2dvVG99IGZyb20gXCIuLi8uLi9tYWluL2FjdGlvbnMvdXRpbHNcIjtcclxuaW1wb3J0IEJvYXJkTGlzdGluZyBmcm9tICcuLi9jb21wb25lbnRzL0JvYXJkTGlzdGluZyc7XHJcblxyXG5jbGFzcyBNYW5hZ2VMaXN0aW5ncyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBsb2FkaW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGxvYWRpbmdEcmFmdDpmYWxzZSxcclxuICAgICAgICAgICAgbG9hZGluZ0luYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9hZGluZ0FjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGxvYWRpbmdFeHBpcmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgZHJhZnQgOiBbXSxcclxuICAgICAgICAgICAgYWN0aXZlIDogW10sXHJcbiAgICAgICAgICAgIGluYWN0aXZlIDogW10sXHJcbiAgICAgICAgICAgIGV4cGlyZWQgOiBbXSxcclxuXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgbG9hZGluZ0RyYWZ0OnRydWUsXHJcbiAgICAgICAgICAgIGxvYWRpbmdJbmFjdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgbG9hZGluZ0FjdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgbG9hZGluZ0V4cGlyZWQ6IHRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0RHJhZnRMaXN0aW5ncygpLmRvbmUoKGxpc3RpbmdzKSA9PiB7XHJcbiAgICAgICAgICAgIGxpc3RpbmdzID0gbGlzdGluZ3MubWFwKCBsaXN0aW5nID0+IENvbnRlbnRBcmVuYS5VdGlscy5jb250ZW50UGFyc2VyRnJvbVNlcnZlcihsaXN0aW5nKSApO1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7ZHJhZnQ6IGxpc3RpbmdzLCBsb2FkaW5nRHJhZnQgOiBmYWxzZX0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5nZXRJbmFjdGl2ZUxpc3RpbmdzKCkuZG9uZSgobGlzdGluZ3MpID0+IHtcclxuICAgICAgICAgICAgbGlzdGluZ3MgPSBsaXN0aW5ncy5tYXAoIGxpc3RpbmcgPT4gQ29udGVudEFyZW5hLlV0aWxzLmNvbnRlbnRQYXJzZXJGcm9tU2VydmVyKGxpc3RpbmcpICk7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtpbmFjdGl2ZTogbGlzdGluZ3MsIGxvYWRpbmdJbmFjdGl2ZSA6IGZhbHNlfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLmdldEFjdGl2ZUxpc3RpbmdzKCkuZG9uZSgobGlzdGluZ3MpID0+IHtcclxuICAgICAgICAgICAgbGlzdGluZ3MgPSBsaXN0aW5ncy5tYXAoIGxpc3RpbmcgPT4gQ29udGVudEFyZW5hLlV0aWxzLmNvbnRlbnRQYXJzZXJGcm9tU2VydmVyKGxpc3RpbmcpICk7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHthY3RpdmU6IGxpc3RpbmdzLCBsb2FkaW5nQWN0aXZlIDogZmFsc2V9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0RXhwaXJlZExpc3RpbmdzKCkuZG9uZSgobGlzdGluZ3MpID0+IHtcclxuICAgICAgICAgICAgbGlzdGluZ3MgPSBsaXN0aW5ncy5tYXAoIGxpc3RpbmcgPT4gQ29udGVudEFyZW5hLlV0aWxzLmNvbnRlbnRQYXJzZXJGcm9tU2VydmVyKGxpc3RpbmcpICk7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtleHBpcmVkOiBsaXN0aW5ncywgbG9hZGluZ0V4cGlyZWQgOiBmYWxzZX0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdExpc3RpbmcgPSAoaWQpID0+IHtcclxuICAgICAgICBnb1RvKFwibGlzdGluZy9cIiArIGlkKTtcclxuICAgIH07XHJcblxyXG4gICAgZHVwbGljYXRlID0gKGN1c3RvbUlkKSA9PiB7XHJcbiAgICAgICAgbGV0IGRyYWZ0ID0gdGhpcy5zdGF0ZS5kcmFmdDtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nRHJhZnQgOiB0cnVlfSk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZHVwbGljYXRlTGlzdGluZyhjdXN0b21JZCkuZG9uZShyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyApIHtcclxuICAgICAgICAgICAgICAgIGRyYWZ0LnVuc2hpZnQocmVzcG9uc2UubGlzdGluZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkcmFmdCA6IGRyYWZ0LCBsb2FkaW5nRHJhZnQgOiBmYWxzZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRlYWN0aXZhdGUgPSAoY3VzdG9tSWQpID0+IHtcclxuICAgICAgICBsZXQgaW5hY3RpdmUgPSB0aGlzLnN0YXRlLmluYWN0aXZlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvYWRpbmdJbmFjdGl2ZSA6IHRydWV9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5kZWFjdGl2YXRlTGlzdGluZyhjdXN0b21JZCkuZG9uZShyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyApIHtcclxuICAgICAgICAgICAgICAgIC8vaW5hY3RpdmUudW5zaGlmdChDb250ZW50QXJlbmEuVXRpbHMuY29udGVudFBhcnNlckZyb21TZXJ2ZXIocmVzcG9uc2UubGlzdGluZykpO1xyXG4gICAgICAgICAgICAgICAgaW5hY3RpdmUudW5zaGlmdChyZXNwb25zZS5saXN0aW5nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luYWN0aXZlIDogaW5hY3RpdmUsIGxvYWRpbmdJbmFjdGl2ZSA6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyICgpIHtcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGxvYWRpbmdEcmFmdCxcclxuICAgICAgICAgICAgbG9hZGluZ0FjdGl2ZSxcclxuICAgICAgICAgICAgbG9hZGluZ0V4cGlyZWQsXHJcbiAgICAgICAgICAgIGxvYWRpbmdJbmFjdGl2ZSxcclxuICAgICAgICAgICAgZHJhZnQsIGFjdGl2ZSwgaW5hY3RpdmUsIGV4cGlyZWQgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcbiAgICAgICAgICAgICAgICBmbGV4OiAxXHJcbiAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnMCAwIDVweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNEY0RjRGJyxcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMTYsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcCA6ICctMTVweCdcclxuXHJcbiAgICAgICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7bWFyZ2luOicwIDIwcHgnICwgZmxleDogMSxkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERyYWZ0ICh7ZHJhZnQubGVuZ3RofSlcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7bWFyZ2luOicwIDIwcHgnLCBmbGV4OiAxfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEluYWN0aXZlIGxpc3RpbmdzICh7aW5hY3RpdmUubGVuZ3RofSlcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7bWFyZ2luOicwIDIwcHgnLCBmbGV4OiAxfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFjdGl2ZSBsaXN0aW5ncyAoe2FjdGl2ZS5sZW5ndGh9KVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3ttYXJnaW46JzAgMjBweCcsIGZsZXg6IDF9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgRXhwaXJlZCAmIHNvbGQgbGlzdGluZ3MgKHtleHBpcmVkLmxlbmd0aH0pXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJib2FyZFwifT5cclxuICAgICAgICAgICAgICAgICAgICB7LypEUkFGVCovfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbHVtblwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2xvYWRpbmdEcmFmdCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGl1bS1zcGlubmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmFmdC5sZW5ndGggPiAwICYmIGRyYWZ0Lm1hcCgobGlzdGluZywgaSwgbGlzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8Qm9hcmRMaXN0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17XCJkcmFmdC1cIiArIGl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpc3RpbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4IDogbGlzdC5sZW5ndGggLSBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb249e1wiRURJVFwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93RWRpdD17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1JlbW92ZT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0R1cGxpY2F0ZT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1ZpZXc9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZT17KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkcmFmdDogbGlzdH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkucmVtb3ZlTGlzdGluZyhsaXN0aW5nLmN1c3RvbUlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkR1cGxpY2F0ZT17dGhpcy5kdXBsaWNhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5saXN0aW5nfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgey8qSU5BQ1RJVkUqL31cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjb2x1bW5cIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsb2FkaW5nSW5hY3RpdmUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpdW0tc3Bpbm5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5hY3RpdmUubGVuZ3RoID4gMCAmJiBpbmFjdGl2ZS5tYXAoKGxpc3RpbmcsIGksIGxpc3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEJvYXJkTGlzdGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e1wiaW5hY3RpdmUtXCIgKyBpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsaXN0aW5nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleCA6IGxpc3QubGVuZ3RoIC0gaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uPXtcIlNVQk1JVFwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93RWRpdD17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1JlbW92ZT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0R1cGxpY2F0ZT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1N1Ym1pdD17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1ZpZXc9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVtb3ZlPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2luYWN0aXZlOiBsaXN0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5yZW1vdmVMaXN0aW5nKGxpc3RpbmcuY3VzdG9tSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHVwbGljYXRlPXt0aGlzLmR1cGxpY2F0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmxpc3Rpbmd9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7LypBQ1RJVkUqL31cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjb2x1bW5cIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmUubGVuZ3RoID09PSAwICYmIGxvYWRpbmdBY3RpdmUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpdW0tc3Bpbm5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlLmxlbmd0aCA+IDAgJiYgYWN0aXZlLm1hcCgobGlzdGluZywgaSwgbGlzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8Qm9hcmRMaXN0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17XCJhY3RpdmUtXCIgKyBpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsaXN0aW5nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleCA6IGxpc3QubGVuZ3RoIC0gaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93RWRpdD17bGlzdGluZy5lZGl0YWJsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1JlbW92ZT17bGlzdGluZy5lZGl0YWJsZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0RlYWN0aXZhdGU9e2xpc3RpbmcuZWRpdGFibGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dEdXBsaWNhdGU9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dWaWV3PXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uPXtcIlZJRVdcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EZWFjdGl2YXRlPXsoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZTogbGlzdH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWFjdGl2YXRlKGxpc3RpbmcuY3VzdG9tSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZT17KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmU6IGxpc3R9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnJlbW92ZUxpc3RpbmcobGlzdGluZy5jdXN0b21JZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25EdXBsaWNhdGU9e3RoaXMuZHVwbGljYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ubGlzdGluZ30vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKkVYUElSRUQqL31cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjb2x1bW5cIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtleHBpcmVkLmxlbmd0aCA9PT0gMCAmJiBsb2FkaW5nRXhwaXJlZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lZGl1bS1zcGlubmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBpcmVkLmxlbmd0aCA+IDAgJiYgZXhwaXJlZC5tYXAoKGxpc3RpbmcsIGksIGxpc3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEJvYXJkTGlzdGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e1wiZXhwaXJlZC1cIiArIGl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxpc3RpbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4IDogbGlzdC5sZW5ndGggLSBpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dSZW1vdmU9e2xpc3RpbmcuZWRpdGFibGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dEdXBsaWNhdGU9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dWaWV3PXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZT17KCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBpcmVkOiBsaXN0fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5yZW1vdmVMaXN0aW5nKGxpc3RpbmcuY3VzdG9tSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHVwbGljYXRlPXt0aGlzLmR1cGxpY2F0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmxpc3Rpbmd9Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoIHN0YXRlLCBvd25Qcm9wcykgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoTWFuYWdlTGlzdGluZ3MpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvTWFuYWdlTGlzdGluZ3MuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCBIZWFkZXJCYXIgZnJvbSAnLi4vLi4vbWFpbi9jb21wb25lbnRzL0hlYWRlckJhcic7XHJcbmltcG9ydCBXYXRjaGxpc3QgZnJvbSAnLi9XYXRjaGxpc3QnO1xyXG5pbXBvcnQgQ2xvc2VkRGVhbHMgZnJvbSAnLi9DbG9zZWREZWFscyc7XHJcbmltcG9ydCBQZW5kaW5nRGVhbHMgZnJvbSAnLi9QZW5kaW5nRGVhbHMnO1xyXG5pbXBvcnQgTWFuYWdlTGlzdGluZ3MgZnJvbSAnLi9NYW5hZ2VMaXN0aW5ncyc7XHJcbmltcG9ydCBDb21tZXJjaWFsQWN0aXZpdHkgZnJvbSAnLi9Db21tZXJjaWFsQWN0aXZpdHknO1xyXG5pbXBvcnQgTWVzc2FnZXMgZnJvbSAnLi9NZXNzYWdlcyc7XHJcbmltcG9ydCBTZXR0aW5ncyBmcm9tICcuL1NldHRpbmdzJztcclxuXHJcbmNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcHJvZmlsZSA6IHByb3BzLnByb2ZpbGUsXHJcbiAgICAgICAgICAgIHRhYiA6IHByb3BzLnRhYixcclxuICAgICAgICAgICAgdXNlciA6IHByb3BzLnVzZXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlciAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBwcm9maWxlLCB0YWIsIHVzZXIgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgeyBjb21wYW55IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm1hbmFnZXItY29udGFpbmVyXCJ9PlxyXG4gICAgICAgICAgICAgICAgPEhlYWRlckJhciB0YWI9e3RhYn0gcHJvZmlsZT17cHJvZmlsZX0vPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYW5hZ2VyLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICB7dGFiID09PSAnV0FUQ0hMSVNUJyAmJiA8V2F0Y2hsaXN0IGNvbXBhbnk9e2NvbXBhbnl9IC8+fVxyXG4gICAgICAgICAgICAgICAgICAgIHt0YWIgPT09ICdDTE9TRURfREVBTFMnICYmIDxDbG9zZWREZWFscyAvPn1cclxuICAgICAgICAgICAgICAgICAgICB7dGFiID09PSAnQklEUycgJiYgPFBlbmRpbmdEZWFscyAvPn1cclxuICAgICAgICAgICAgICAgICAgICB7dGFiID09PSAnTUFOQUdFX0xJU1RJTkdTJyAmJiA8TWFuYWdlTGlzdGluZ3MgLz59XHJcbiAgICAgICAgICAgICAgICAgICAge3RhYiA9PT0gJ0NPTU1FUkNJQUxfQUNUSVZJVFknICYmIDxDb21tZXJjaWFsQWN0aXZpdHkvPn1cclxuICAgICAgICAgICAgICAgICAgICB7dGFiID09PSAnTUVTU0FHRVMnICYmIDxNZXNzYWdlcyB1c2VyPXt1c2VyfS8+fVxyXG4gICAgICAgICAgICAgICAgICAgIHt0YWIgPT09ICdTRVRUSU5HUycgJiYgPFNldHRpbmdzLz59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoIHN0YXRlLCBvd25Qcm9wcykgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoTWFuYWdlcilcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvTWFuYWdlci5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHtnZXRGdWxsTmFtZSwgZ29UbywgbGltaXRUZXh0fSBmcm9tIFwiLi4vLi4vbWFpbi9hY3Rpb25zL3V0aWxzXCI7XHJcbmltcG9ydCBCb2FyZExpc3RpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9Cb2FyZExpc3RpbmcnO1xyXG5pbXBvcnQgTW9tZW50IGZyb20gXCJtb21lbnQvbW9tZW50XCI7XHJcblxyXG5jbGFzcyBNZXNzYWdlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB0aHJlYWRzIDogW10sXHJcbiAgICAgICAgICAgIGxvYWRpbmdUaHJlYWRzIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGxvYWRpbmdNZXNzYWdlcyA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZFRocmVhZCA6IG51bGwsXHJcbiAgICAgICAgICAgIGlucHV0TWVzc2FnZSA6IG51bGwsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzIDogW11cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgbG9hZGluZ1RocmVhZHMgOnRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5nZXRUaHJlYWRzKCkuZG9uZShyPT57XHJcblxyXG4gICAgICAgICAgICByLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBhRGF0ZSA9IE1vbWVudChhLmxhc3RNZXNzYWdlRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYkRhdGUgPSBNb21lbnQoYi5sYXN0TWVzc2FnZURhdGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChhRGF0ZSA+IGJEYXRlKSA/IDEgOiAoKGJEYXRlID4gYS5iRGF0ZSkgPyAtMSA6IDApXHJcbiAgICAgICAgICAgIH0pLnJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdGhyZWFkcyA6IHIsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRocmVhZCA6ICh0aGlzLnN0YXRlLnNlbGVjdGVkVGhyZWFkKSA/IHRoaXMuc3RhdGUuc2VsZWN0ZWRUaHJlYWQgOiAoci5sZW5ndGggPiAwKSA/IHJbMF0gOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbG9hZGluZ1RocmVhZHMgOmZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0VGhyZWFkID0gKHRocmVhZCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBzZWxlY3RlZFRocmVhZCA6dGhyZWFkXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTWVzc2FnZXModGhyZWFkKTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlTWVzc2FnZXMgPSAodGhyZWFkKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkVGhyZWFkID0gdGhyZWFkIHx8IHRoaXMuc3RhdGUuc2VsZWN0ZWRUaHJlYWQ7XHJcblxyXG4gICAgICAgIGlmICghc2VsZWN0ZWRUaHJlYWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGxvYWRpbmdNZXNzYWdlcyA6dHJ1ZSxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IFtdXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLmdldFRocmVhZChzZWxlY3RlZFRocmVhZC5jdXN0b21JZCkuZG9uZShyPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgbG9hZGluZ01lc3NhZ2VzIDpmYWxzZSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzIDogclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBzZW5kID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkVGhyZWFkLFxyXG4gICAgICAgICAgICBpbnB1dE1lc3NhZ2UsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzXHJcbiAgICAgICAgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xyXG4gICAgICAgICAgICBjb250ZW50IDogaW5wdXRNZXNzYWdlLFxyXG4gICAgICAgICAgICB0aHJlYWQgOiBzZWxlY3RlZFRocmVhZC5pZCxcclxuICAgICAgICAgICAgbGlzdGluZyA6IHNlbGVjdGVkVGhyZWFkLmxpc3RpbmcuaWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dE1lc3NhZ2UgOiBcIlwiLCBzYXZpbmcgOiB0cnVlfSk7XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnNlbmRNZXNzYWdlKG1lc3NhZ2UpLmRvbmUocj0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzYXZpbmcgOiBmYWxzZSwgc2hvd1N1Y2Nlc3MgOiB0cnVlLCAgbWVzc2FnZXM6IFsuLi5tZXNzYWdlcywgcl19KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIgKCkge1xyXG4gICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgbG9hZGluZ1RocmVhZHMsXHJcbiAgICAgICAgICAgIGxvYWRpbmdNZXNzYWdlcyxcclxuICAgICAgICAgICAgc2VsZWN0ZWRUaHJlYWQsXHJcbiAgICAgICAgICAgIHRocmVhZHMsXHJcbiAgICAgICAgICAgIGlucHV0TWVzc2FnZSxcclxuICAgICAgICAgICAgbWVzc2FnZXMsXHJcbiAgICAgICAgICAgIHNhdmluZ1xyXG4gICAgICAgIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgICAgICBjb25zdCB7IHVzZXIgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm1lc3NhZ2VzLWNvbnRhaW5lclwifT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRocmVhZHNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAge2xvYWRpbmdUaHJlYWRzICYmIHRocmVhZHMubGVuZ3RoID09PTAgJiYgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIiAvPiB9XHJcbiAgICAgICAgICAgICAgICAgICAgeyFsb2FkaW5nVGhyZWFkcyAmJiB0aHJlYWRzLmxlbmd0aCA9PT0wICYmIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5vIHRocmVhZHMgeWV0XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+IH1cclxuICAgICAgICAgICAgICAgICAgICB7IWxvYWRpbmdUaHJlYWRzICYmIHRocmVhZHMubWFwKCh0LGkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17KHNlbGVjdGVkVGhyZWFkLmlkID09PSB0LmlkKSA/IFwidGhyZWFkIHRocmVhZC1zZWxlY3RlZFwiIDogXCJ0aHJlYWRcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtcInRocmVhZC1cIiArIGl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57dGhpcy5zZWxlY3RUaHJlYWQodCl9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImRhdGVcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3QubGFzdE1lc3NhZ2VEYXRlICYmIE1vbWVudCh0Lmxhc3RNZXNzYWdlRGF0ZSkuZm9ybWF0KCdZWVlZL01NL0REJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImxpc3RpbmctbmFtZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dC5saXN0aW5nLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImNvbXBhbnlcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3QubGlzdGluZy5jb21wYW55LmxlZ2FsTmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1widXNlclwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Z2V0RnVsbE5hbWUodC51c2VyKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImxhc3QtbWVzc2FnZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dC5sYXN0TWVzc2FnZUNvbnRlbnQgJiYgbGltaXRUZXh0KHQubGFzdE1lc3NhZ2VDb250ZW50KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIHtzZWxlY3RlZFRocmVhZCAmJiA8ZGl2IGNsYXNzTmFtZT17XCJ0aHJlYWQtY29udGVudFwifT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0aHJlYWQtdGl0bGVcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImxpc3RpbmctbmFtZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZFRocmVhZC5saXN0aW5nLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjb21wYW55LW5hbWVcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRUaHJlYWQubGlzdGluZy5jb21wYW55LmxlZ2FsTmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibWVzc2FnZXNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsb2FkaW5nTWVzc2FnZXMgJiYgbWVzc2FnZXMubGVuZ3RoID09PTAgJiYgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyFsb2FkaW5nTWVzc2FnZXMgJiYgbWVzc2FnZXMubWFwKChtLGkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9eyh1c2VyPT09bS5zZW5kZXIuZW1haWwpID8gXCJtZXNzYWdlIG93bi1tZXNzYWdlXCIgOiBcIm1lc3NhZ2VcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibWVzc2FnZS1zZW5kZXJcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtnZXRGdWxsTmFtZShtLnNlbmRlcil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibWVzc2FnZS1jb250ZW50XCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bS5jb250ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm1lc3NhZ2UtZGF0ZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge01vbWVudChtLmNyZWF0ZWRBdCkuZm9ybWF0KCdZWVlZL01NL0REIEhIOm1tJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm1lc3NhZ2UtaW5wdXRcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm1lc3NhZ2UtaW5wdXQtdGl0bGVcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBXcml0ZSBhIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2lucHV0TWVzc2FnZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9Pnt0aGlzLnNldFN0YXRlKHtpbnB1dE1lc3NhZ2UgOiBlLnRhcmdldC52YWx1ZX0pfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJtZXNzYWdlLWNvbnRlbnRcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtcIndyaXRlIGEgbWVzc2FnZVwifS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcInN0YW5kYXJkLWJ1dHRvblwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2VuZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlucHV0TWVzc2FnZXx8IGlucHV0TWVzc2FnZSA9PT0gXCJcIiB8fCBzYXZpbmd9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyFzYXZpbmcgJiYgXCJTZW5kXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2F2aW5nICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcblxyXG4gICAgICAgICAgICAgICAgeyFzZWxlY3RlZFRocmVhZCAmJiA8ZGl2Pk5vIHRocmVhZCBzZWxlY3RlZDwvZGl2PiB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCBzdGF0ZSwgb3duUHJvcHMpID0+IHtcclxuICAgIHJldHVybiBzdGF0ZTtcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKE1lc3NhZ2VzKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9jb250YWluZXJzL01lc3NhZ2VzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgQ29udGVudExpc3RpbmdQZW5kaW5nQmlkIGZyb20gJy4uLy4uL21haW4vY29tcG9uZW50cy9Db250ZW50TGlzdGluZ1BlbmRpbmdCaWQnO1xyXG5pbXBvcnQge2dvVG99IGZyb20gXCIuLi8uLi9tYWluL2FjdGlvbnMvdXRpbHNcIjtcclxuXHJcbmNsYXNzIFBlbmRpbmdEZWFscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBsb2FkaW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGxvYWRpbmdEZWNsaW5lZCA6IGZhbHNlLFxyXG4gICAgICAgICAgICBiaWRzIDogW10sXHJcbiAgICAgICAgICAgIGRlY2xpbmVkQmlkczogW10sXHJcbiAgICAgICAgICAgIGFjdGl2ZSA6IHRydWVcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJ1bGxldEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2J1bGxldC5wbmdcIjtcclxuICAgICAgICB0aGlzLmFjdGl2ZUJ1bGxldEljb24gPSBhc3NldHNCYXNlRGlyICsgXCJhcHAvaW1hZ2VzL2FjdGl2ZV9idWxsZXQucG5nXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0TGlzdGluZyA9IChpZCkgPT4ge1xyXG4gICAgICAgIGdvVG8oXCJsaXN0aW5nL1wiICsgaWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOnRydWUsIGxvYWRpbmdEZWNsaW5lZCA6IHRydWV9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5nZXRQZW5kaW5nRGVhbHMoKS5kb25lKChiaWRzKSA9PiB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtiaWRzOiBiaWRzLCBsb2FkaW5nIDogZmFsc2V9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0UmVqZWN0ZWREZWFscygpLmRvbmUoKGRlY2xpbmVkQmlkcykgPT4ge1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7ZGVjbGluZWRCaWRzOiBkZWNsaW5lZEJpZHMsIGxvYWRpbmdEZWNsaW5lZCA6IGZhbHNlfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRlbGV0ZUJpZCA9IChpZCkgPT4ge1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnJlbW92ZUJpZCh7aWQ6aWR9KS5kb25lKChyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW1vdmUgPSAoIGN1c3RvbUlkKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGJpZHMgOiB0aGlzLnN0YXRlLmJpZHMuZmlsdGVyKGwgPT4gbC5jdXN0b21JZCAhPT0gY3VzdG9tSWQpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlciAoKSB7XHJcbiAgICAgICAgY29uc3QgeyBsb2FkaW5nLCBiaWRzLCBhY3RpdmUsIGRlY2xpbmVkQmlkcywgbG9hZGluZ0RlY2xpbmVkIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxyXG4gICAgICAgICAgICAgICAgZmxleDogMVxyXG4gICAgICAgICAgICB9fT5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzAgMCAyMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyM0RjRGNEYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxOCxcclxuICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDBcclxuICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3ttYXJnaW46JzAgMjBweCd9fT5CaWRzPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e21hcmdpbjonMCAyMHB4JyAsIGN1cnNvcjogJ3BvaW50ZXInfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57dGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiB0cnVlfSl9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZSAmJiA8aW1nICBzdHlsZT17e21hcmdpbjonMHB4IDEwcHggM3B4J319IHNyYz17dGhpcy5hY3RpdmVCdWxsZXRJY29ufSAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyFhY3RpdmUgJiYgPGltZyAgc3R5bGU9e3ttYXJnaW46JzBweCAxMHB4IDNweCd9fSBzcmM9e3RoaXMuYnVsbGV0SWNvbn0gLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFjdGl2ZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3ttYXJnaW46JzAgMjBweCcsIGN1cnNvcjogJ3BvaW50ZXInfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57dGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiBmYWxzZX0pfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHshYWN0aXZlICYmIDxpbWcgIHN0eWxlPXt7bWFyZ2luOicwcHggMTBweCAzcHgnfX0gc3JjPXt0aGlzLmFjdGl2ZUJ1bGxldEljb259IC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aXZlICYmIDxpbWcgIHN0eWxlPXt7bWFyZ2luOicwcHggMTBweCAzcHgnfX0gc3JjPXt0aGlzLmJ1bGxldEljb259IC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZWNsaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSAmJiBiaWRzLmxlbmd0aCA+IDAgJiYgYmlkcy5tYXAoKGJpZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPENvbnRlbnRMaXN0aW5nUGVuZGluZ0JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMuc2VsZWN0TGlzdGluZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXt0aGlzLmRlbGV0ZUJpZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aSArIFwiLVwiICsgYmlkLmNvbnRlbnQuY3VzdG9tSWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaWQ9e2JpZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5iaWQuY29udGVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAhYWN0aXZlICYmIGRlY2xpbmVkQmlkcy5sZW5ndGggPiAwICYmIGRlY2xpbmVkQmlkcy5tYXAoKGJpZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPENvbnRlbnRMaXN0aW5nUGVuZGluZ0JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMuc2VsZWN0TGlzdGluZ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uRGVsZXRlPXt0aGlzLmRlbGV0ZUJpZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aSArIFwiLVwiICsgYmlkLmNvbnRlbnQuY3VzdG9tSWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaWQ9e2JpZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5iaWQuY29udGVudH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmUgJiYgYmlkcy5sZW5ndGggPT09IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hbmFnZXItY29udGVudC1tZXNzYWdlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmcgJiYgPGRpdiBjbGFzc05hbWU9XCJiaWctc3Bpbm5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFsb2FkaW5nICYmIDxkaXYgY2xhc3NOYW1lPVwiYmlnLXNwaW5uZXJcIiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IGhhdmVuJ3QgbWFkZSBhbnkgYmlkcyB5ZXQhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAhYWN0aXZlICYmIGRlY2xpbmVkQmlkcy5sZW5ndGggPT09IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hbmFnZXItY29udGVudC1tZXNzYWdlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmdEZWNsaW5lZCAmJiA8ZGl2IGNsYXNzTmFtZT1cImJpZy1zcGlubmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWxvYWRpbmdEZWNsaW5lZCAmJiA8ZGl2IGNsYXNzTmFtZT1cImJpZy1zcGlubmVyXCIgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBoYXZlbid0IGFueSBkZWNsaW5lZCBiaWRzIHlldCFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICggc3RhdGUsIG93blByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShQZW5kaW5nRGVhbHMpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvUGVuZGluZ0RlYWxzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgUmVhY3RUYWJsZSBmcm9tIFwicmVhY3QtdGFibGVcIjtcclxuaW1wb3J0IHtnZXRDdXJyZW5jeVN5bWJvbCwgZ2V0RnVsbE5hbWUsIGdvVG8sIGxpbWl0VGV4dH0gZnJvbSBcIi4uLy4uL21haW4vYWN0aW9ucy91dGlsc1wiO1xyXG5pbXBvcnQgQ291bnRyeVNlbGVjdG9yIGZyb20gJy4uLy4uL21haW4vY29tcG9uZW50cy9Db3VudHJ5U2VsZWN0b3InXHJcbmltcG9ydCBNb21lbnQgZnJvbSBcIm1vbWVudC9tb21lbnRcIjtcclxuaW1wb3J0IHtibHVlQ2hlY2tJY29uLCBjYW5jZWxJY29uLCBlZGl0SWNvbiwgU3Bpbm5lcn0gZnJvbSBcIi4uLy4uL21haW4vY29tcG9uZW50cy9JY29uc1wiO1xyXG5cclxuY2xhc3MgU2V0dGluZ3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbG9hZGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICB1cGRhdGluZ0NvbXBhbnkgOiBmYWxzZSxcclxuICAgICAgICAgICAgdXBkYXRpbmdVc2VyIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHVwZGF0aW5nUGFzc3dvcmQgOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9hZGluZ0NvbXBhbnlVc2VycyA6IGZhbHNlLFxyXG4gICAgICAgICAgICBlZGl0UGVyc29uYWxJbmZvOiBmYWxzZSxcclxuICAgICAgICAgICAgZWRpdENvbXBhbnlJbmZvIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbXBhbnlVc2VycyA6IFtdLFxyXG4gICAgICAgICAgICB1c2VyIDoge31cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOnRydWUsIGxvYWRpbmdDb21wYW55VXNlcnM6IHRydWV9KTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0VXNlckluZm8oKS5kb25lKHVzZXI9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9hZGluZzpmYWxzZSwgdXNlciA6IHVzZXJ9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnRBcGkuZ2V0Q29tcGFueVVzZXJzKCkuZG9uZShjb21wYW55VXNlcnM9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9hZGluZ0NvbXBhbnlVc2VyczpmYWxzZSwgY29tcGFueVVzZXJzIDogY29tcGFueVVzZXJzfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ29tcGFueSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt1cGRhdGluZ0NvbXBhbnk6dHJ1ZSwgZWRpdENvbXBhbnlJbmZvOiBmYWxzZX0pO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50QXBpLnVwZGF0ZUNvbXBhbnkodGhpcy5zdGF0ZS51c2VyLmNvbXBhbnkpLmRvbmUoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXBkYXRpbmdDb21wYW55OmZhbHNlfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlVXNlciA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt1cGRhdGluZ1VzZXI6dHJ1ZSwgZWRpdFBlcnNvbmFsSW5mbzogZmFsc2V9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS51cGRhdGVVc2VyKHRoaXMuc3RhdGUudXNlcikuZG9uZSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1cGRhdGluZ1VzZXI6ZmFsc2V9KTtcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGVQYXNzd29yZCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt1cGRhdGluZ1Bhc3N3b3JkOnRydWV9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS51cGRhdGVQYXNzd29yZCh7XHJcbiAgICAgICAgICAgIGlkIDogdGhpcy5zdGF0ZS51c2VyLmlkLFxyXG4gICAgICAgICAgICBwYXNzd29yZCA6IHRoaXMuc3RhdGUucGFzc3dvcmRcclxuICAgICAgICB9KS5kb25lKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgdXBkYXRpbmdQYXNzd29yZDpmYWxzZSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkIDpudWxsLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRDaGVjayA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZFVwZGF0ZWQgOiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIHZhbGlkYXRlID0gKHBhc3MpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZW5ndGggOiAoIHBhc3MubGVuZ3RoID49IDggKSxcclxuICAgICAgICAgICAgZGlnaXQgOiAvXFxkLy50ZXN0KHBhc3MpLFxyXG4gICAgICAgICAgICB1cHBlciA6IC9bQS1aXS8udGVzdChwYXNzKSxcclxuICAgICAgICAgICAgc3BlY2lhbCA6IC9bIUAjJCVeJiooKV8rXFwtPVxcW1xcXXt9Oyc6XCJcXFxcfCwuPD5cXC8/XS8udGVzdChwYXNzKSxcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBpbnZhbGlkUGFzc3dvcmQgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyBvbGRQYXNzd29yZCwgcGFzc3dvcmQsIHBhc3N3b3JkQ2hlY2sgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIGlmICghb2xkUGFzc3dvcmQgfHwgIXBhc3N3b3JkIHx8ICAhcGFzc3dvcmRDaGVjayApIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICBsZXQgdmFsaWQgPSB0aGlzLnZhbGlkYXRlKHBhc3N3b3JkKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICBwYXNzd29yZCAhPT0gcGFzc3dvcmRDaGVjayB8fFxyXG4gICAgICAgICAgICAgICAgIXZhbGlkLmxlbmd0aCB8fFxyXG4gICAgICAgICAgICAgICAgIXZhbGlkLmRpZ2l0IHx8XHJcbiAgICAgICAgICAgICAgICAhdmFsaWQudXBwZXIgfHxcclxuICAgICAgICAgICAgICAgICF2YWxpZC5zcGVjaWFsO1xyXG5cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlciAoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgbG9hZGluZywgZWRpdFBlcnNvbmFsSW5mbywgZWRpdENvbXBhbnlJbmZvLCBsb2FkaW5nQ29tcGFueVVzZXJzLCBjb21wYW55VXNlcnMsXHJcbiAgICAgICAgICAgIHVwZGF0aW5nQ29tcGFueSwgdXBkYXRpbmdVc2VyLCB1cGRhdGluZ1Bhc3N3b3JkLCBwYXNzd29yZCwgcGFzc3dvcmRDaGVjaywgcGFzc3dvcmRVcGRhdGVkIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGxldCB1c2VyID0gdGhpcy5zdGF0ZS51c2VyO1xyXG5cclxuICAgICAgICBsZXQgY291bnRyeSA9ICh1c2VyICYmIHVzZXIuY29tcGFueSAmJiB1c2VyLmNvbXBhbnkuY291bnRyeSkgPyB7bGFiZWw6IHVzZXIuY29tcGFueS5jb3VudHJ5Lm5hbWUsIHZhbHVlOiB1c2VyLmNvbXBhbnkuY291bnRyeS5uYW1lfSA6IG51bGw7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInNldHRpbmdzLWNvbnRhaW5lclwifT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInRpdGxlXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIENvbXBhbnkgaW5mb3JtYXRpb24geyFlZGl0Q29tcGFueUluZm8gJiYgIXVwZGF0aW5nQ29tcGFueSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImVkaXQtYnV0dG9uXCJ9IG9uQ2xpY2s9e2U9Pnt0aGlzLnNldFN0YXRlKHtlZGl0Q29tcGFueUluZm8gOiB0cnVlfSl9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2VkaXRJY29ufS8+IEVkaXRcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICAgICAge2VkaXRDb21wYW55SW5mbyAmJiAhdXBkYXRpbmdDb21wYW55ICYmIDxkaXYgY2xhc3NOYW1lPXtcImVkaXQtYnV0dG9uXCJ9IG9uQ2xpY2s9e3RoaXMudXBkYXRlQ29tcGFueX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtlZGl0SWNvbn0vPiBTYXZlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICAgICAgICAgIHt1cGRhdGluZ0NvbXBhbnkgJiYgPFNwaW5uZXIvPn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIHt1c2VyLmNvbXBhbnkgJiYgPGRpdiBjbGFzc05hbWU9e1wic2V0dGluZ1wifT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJyb3dcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIml0ZW1cIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTGVnYWwgQ29tcGFueSBOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt1c2VyLmNvbXBhbnkubGVnYWxOYW1lfSBkaXNhYmxlZD17IWVkaXRDb21wYW55SW5mb30gb25DaGFuZ2U9eyhlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuY29tcGFueS5sZWdhbE5hbWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBhbnkgUmVnaXN0cmF0aW9uIE51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dXNlci5jb21wYW55LnJlZ2lzdHJhdGlvbk51bWJlcn0gZGlzYWJsZWQ9eyFlZGl0Q29tcGFueUluZm99IG9uQ2hhbmdlPXsoZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmNvbXBhbnkucmVnaXN0cmF0aW9uTnVtYmVyID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWQVQgSUQgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt1c2VyLmNvbXBhbnkudmF0fSBkaXNhYmxlZD17IWVkaXRDb21wYW55SW5mb30gb25DaGFuZ2U9eyhlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuY29tcGFueS52YXQgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInJvd1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt1c2VyLmNvbXBhbnkuYWRkcmVzc30gZGlzYWJsZWQ9eyFlZGl0Q29tcGFueUluZm99IG9uQ2hhbmdlPXsoZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmNvbXBhbnkuYWRkcmVzcyA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIml0ZW1cIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2l0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dXNlci5jb21wYW55LmNpdHl9IGRpc2FibGVkPXshZWRpdENvbXBhbnlJbmZvfSBvbkNoYW5nZT17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5jb21wYW55LmNpdHkgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFpJUCBjb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt1c2VyLmNvbXBhbnkuemlwfSBkaXNhYmxlZD17IWVkaXRDb21wYW55SW5mb30gb25DaGFuZ2U9eyhlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIuY29tcGFueS56aXAgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvdW50cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q291bnRyeVNlbGVjdG9yIG11bHRpPXtmYWxzZX0gdmFsdWU9e2NvdW50cnl9IGRpc2FibGVkPXshZWRpdENvbXBhbnlJbmZvfSBvbkNoYW5nZT17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5jb21wYW55LmNvdW50cnkubmFtZSA9IGUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+Q29tcGFueSBkZXNjcmlwdGlvbjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSB2YWx1ZT17dXNlci5jb21wYW55LmRlc2NyaXB0aW9ufSBkaXNhYmxlZD17IWVkaXRDb21wYW55SW5mb30gb25DaGFuZ2U9eyhlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5jb21wYW55LmRlc2NyaXB0aW9uID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgey8qQUNUSVZFIFVTRVJTKi99XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e21hcmdpbjogJzIwcHggMCd9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFjdGl2ZSBVc2VyczwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsb2FkaW5nQ29tcGFueVVzZXJzICYmIGNvbXBhbnlVc2Vycy5sZW5ndGggPT09IDAgJiYgPFNwaW5uZXIvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyFsb2FkaW5nQ29tcGFueVVzZXJzICYmIGNvbXBhbnlVc2Vycy5sZW5ndGggPiAwICYmIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmVhY3RUYWJsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJjbG9zZWQtZGVhbHMtdGFibGVcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UGFnZVNpemU9ezMwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQYWdlU2l6ZU9wdGlvbnM9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dQYWdpbmF0aW9uPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5Sb3dzPXswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6YWJsZT17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17Y29tcGFueVVzZXJzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM9e1t7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJ0ZhbWlsaXkgTmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICdsYXN0TmFtZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2ZpcnN0TmFtZScsIC8vIFJlcXVpcmVkIGJlY2F1c2Ugb3VyIGFjY2Vzc29yIGlzIG5vdCBhIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdGaXJzdCBOYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAnRW1haWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ2VtYWlsJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdQaG9uZSBOdW1iZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NvcjogJ3Bob25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3NOYW1lIDogJ3RhYmxlLWhlYWRlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdDb21wYW55IFBvc2l0aW9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICd0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlckNsYXNzTmFtZSA6ICd0YWJsZS1oZWFkZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgOiAndGFibGUtaGVhZGVyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0aXRsZVwifT5cclxuICAgICAgICAgICAgICAgICAgICBQZXJzb25hbCBpbmZvcm1hdGlvbiB7IWVkaXRQZXJzb25hbEluZm8gJiYgIXVwZGF0aW5nVXNlciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImVkaXQtYnV0dG9uXCJ9IG9uQ2xpY2s9e2U9Pnt0aGlzLnNldFN0YXRlKHtlZGl0UGVyc29uYWxJbmZvIDogdHJ1ZX0pfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtlZGl0SWNvbn0vPiBFZGl0XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICAgICAgICAgIHtlZGl0UGVyc29uYWxJbmZvICYmICF1cGRhdGluZ1VzZXIgJiYgPGRpdiBjbGFzc05hbWU9e1wiZWRpdC1idXR0b25cIn0gb25DbGljaz17dGhpcy51cGRhdGVVc2VyfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e2VkaXRJY29ufS8+IFNhdmVcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICAgICAge3VwZGF0aW5nVXNlciAmJiA8U3Bpbm5lci8+fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJzZXR0aW5nXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInJvd1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBGaXJzdCBOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt1c2VyLmZpcnN0TmFtZX0gZGlzYWJsZWQ9eyFlZGl0UGVyc29uYWxJbmZvfSBvbkNoYW5nZT17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5maXJzdE5hbWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpdGVtXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExhc3QgTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dXNlci5sYXN0TmFtZX0gZGlzYWJsZWQ9eyFlZGl0UGVyc29uYWxJbmZvfSBvbkNoYW5nZT17KGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlci5sYXN0TmFtZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJ9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIml0ZW1cIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGl0bGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3VzZXIudGl0bGV9IGRpc2FibGVkPXshZWRpdFBlcnNvbmFsSW5mb30gb25DaGFuZ2U9eyhlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIudGl0bGUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInJvd1wifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbWFpbCBhZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt1c2VyLmVtYWlsfSBkaXNhYmxlZD17IWVkaXRQZXJzb25hbEluZm99IG9uQ2hhbmdlPXsoZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyLmVtYWlsID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiaXRlbVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQaG9uZSBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3VzZXIucGhvbmV9IGRpc2FibGVkPXshZWRpdFBlcnNvbmFsSW5mb30gb25DaGFuZ2U9eyhlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXIucGhvbmUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VyfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ0aXRsZVwifT5cclxuICAgICAgICAgICAgICAgICAgICBDaGFuZ2UgUGFzc3dvcmRcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wic3VidGl0bGVcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgIENob29zZSBhIHVuaXF1ZSBwYXNzd29yZCB0byBwcm90ZWN0IHlvdXIgYWNjb3VudFxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJzZXR0aW5nXCJ9IHN0eWxlPXt7ZGlzcGxheTogJ2ZsZXgnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wicGFzc3dvcmRcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5UeXBlIHlvdXIgY3VycmVudCBwYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPXtcInBhc3N3b3JkXCJ9IG9uQ2hhbmdlPXsoZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFBhc3N3b3JkIDogZS50YXJnZXQudmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5UeXBlIHlvdXIgbmV3IHBhc3N3b3JkPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9e1wicGFzc3dvcmRcIn0gb25DaGFuZ2U9eyhlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQgOiBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0vPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlJldHlwZSB5b3VyIG5ldyBwYXNzd29yZDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPXtcInBhc3N3b3JkXCJ9IG9uQ2hhbmdlPXsoZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkQ2hlY2sgOiBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfX0vPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyF1cGRhdGluZ1Bhc3N3b3JkICYmICFwYXNzd29yZFVwZGF0ZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnVwZGF0ZVBhc3N3b3JkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLmludmFsaWRQYXNzd29yZCgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJzdGFuZGFyZC1idXR0b25cIn0+U2F2ZSBwYXNzd29yZDwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAge3VwZGF0aW5nUGFzc3dvcmQgJiYgPFNwaW5uZXIvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Bhc3N3b3JkVXBkYXRlZCAmJiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFzc3dvcmQgdXBkYXRlZCBzdWNjZXNzZnVsbHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtwYXNzd29yZCAmJiA8ZGl2IGNsYXNzTmFtZT17XCJwYXNzd29yZC12YWxpZGF0aW9uXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMudmFsaWRhdGUocGFzc3dvcmQpLmxlbmd0aCAmJiA8aW1nIHNyYz17Ymx1ZUNoZWNrSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshdGhpcy52YWxpZGF0ZShwYXNzd29yZCkubGVuZ3RoJiYgPGltZyBzcmM9e2NhbmNlbEljb259Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnZhbGlkYXRlKHBhc3N3b3JkKS51cHBlciAmJiA8aW1nIHNyYz17Ymx1ZUNoZWNrSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshdGhpcy52YWxpZGF0ZShwYXNzd29yZCkudXBwZXImJiA8aW1nIHNyYz17Y2FuY2VsSWNvbn0vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9uZSB1cHBlcmNhc2UgY2hhcmFjdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMudmFsaWRhdGUocGFzc3dvcmQpLmRpZ2l0ICYmIDxpbWcgc3JjPXtibHVlQ2hlY2tJY29ufS8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyF0aGlzLnZhbGlkYXRlKHBhc3N3b3JkKS5kaWdpdCYmIDxpbWcgc3JjPXtjYW5jZWxJY29ufS8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT25lIG51bWJlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnZhbGlkYXRlKHBhc3N3b3JkKS5zcGVjaWFsICYmIDxpbWcgc3JjPXtibHVlQ2hlY2tJY29ufS8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyF0aGlzLnZhbGlkYXRlKHBhc3N3b3JkKS5zcGVjaWFsJiYgPGltZyBzcmM9e2NhbmNlbEljb259Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPbmUgc3BlY2lhbCBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtwYXNzd29yZENoZWNrICYmIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGFzc3dvcmRDaGVjayA9PT0gcGFzc3dvcmQgJiYgPGltZyBzcmM9e2JsdWVDaGVja0ljb259Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGFzc3dvcmRDaGVjayAhPT0gcGFzc3dvcmQgJiYgPGltZyBzcmM9e2NhbmNlbEljb259Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXNzd29yZHMgZG9uJ3QgbWF0Y2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoIHN0YXRlLCBvd25Qcm9wcykgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoU2V0dGluZ3MpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL2NvbnRhaW5lcnMvU2V0dGluZ3MuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCBDb250ZW50TGlzdGluZyBmcm9tICcuLi8uLi9tYWluL2NvbXBvbmVudHMvQ29udGVudExpc3RpbmcnO1xyXG5pbXBvcnQge2dvVG99IGZyb20gXCIuLi8uLi9tYWluL2FjdGlvbnMvdXRpbHNcIjtcclxuXHJcbmNsYXNzIFdhdGNobGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBsb2FkaW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGxpc3RpbmdzIDogW10sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOnRydWV9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5nZXRXYXRjaGxpc3RMaXN0aW5ncygpLmRvbmUoKGxpc3RpbmdzKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBsaXN0aW5ncyA9IGxpc3RpbmdzLm1hcCggbGlzdGluZyA9PiBDb250ZW50QXJlbmEuVXRpbHMuY29udGVudFBhcnNlckZyb21TZXJ2ZXIobGlzdGluZykgKTtcclxuICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe2xpc3RpbmdzOiBsaXN0aW5ncywgbG9hZGluZyA6IGZhbHNlfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdExpc3RpbmcgPSAoaWQpID0+IHtcclxuICAgICAgICBnb1RvKFwibGlzdGluZy9cIiArIGlkKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHJlbW92ZSA9ICggY3VzdG9tSWQpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgbGlzdGluZ3MgOiB0aGlzLnN0YXRlLmxpc3RpbmdzLmZpbHRlcihsID0+IGwuY3VzdG9tSWQgIT09IGN1c3RvbUlkKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgbG9hZGluZywgbGlzdGluZ3MgfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXHJcbiAgICAgICAgICAgICAgICBmbGV4OiAxXHJcbiAgICAgICAgICAgIH19PlxyXG5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0aW5ncy5sZW5ndGggPiAwICYmIGxpc3RpbmdzLm1hcCgobGlzdGluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPENvbnRlbnRMaXN0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5zZWxlY3RMaXN0aW5nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtsaXN0aW5nLmN1c3RvbUlkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLmxpc3Rpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXRjaGxpc3RSZW1vdmU9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbldhdGNobGlzdFJlbW92ZT17dGhpcy5yZW1vdmV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdGluZ3MubGVuZ3RoID09PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYW5hZ2VyLWNvbnRlbnQtbWVzc2FnZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nICYmIDxkaXYgY2xhc3NOYW1lPVwiYmlnLXNwaW5uZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbG9hZGluZyAmJiA8ZGl2IGNsYXNzTmFtZT1cImJpZy1zcGlubmVyXCIgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogMzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdXIgd2F0Y2hsaXN0IGlzIGVtcHR5IVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCBzdGF0ZSwgb3duUHJvcHMpID0+IHtcclxuICAgIHJldHVybiBzdGF0ZTtcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFdhdGNobGlzdClcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYW5hZ2UvY29udGFpbmVycy9XYXRjaGxpc3QuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnLi9jb250YWluZXJzL01hbmFnZXInO1xyXG5cclxuY29uc3QgbWFuYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hbmFnZS13cmFwcGVyJyk7XHJcblxyXG5sZXQgTWFuYWdlQXBwID0gUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XHJcbiAgICAgICAgPE1hbmFnZXIgey4uLm1hbmFnZUNvbnRhaW5lci5kYXRhc2V0IH0vPlxyXG4gICAgPC9Qcm92aWRlcj4sXHJcbiAgICBtYW5hZ2VDb250YWluZXJcclxuKTtcclxuXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuVGVzdCA9IENvbnRlbnRBcmVuYS5UZXN0IHx8IHt9O1xyXG4gICAgQ29udGVudEFyZW5hLlRlc3QuTWFuYWdlID0gZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIE1hbmFnZUFwcC50ZXN0KGlkKVxyXG4gICAgfTtcclxuXHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9tYW5hZ2UuanMiLCJcclxuaW1wb3J0IHtjb21iaW5lUmVkdWNlcnN9IGZyb20gJ3JlZHV4J1xyXG5pbXBvcnQge21hbmFnZX0gZnJvbSBcIi4vbWFuYWdlXCI7XHJcblxyXG5jb25zdCByZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICBtYW5hZ2UsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVkdWNlcnNcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3JlZHVjZXJzL2luZGV4LmpzIiwiXHJcbmV4cG9ydCBjb25zdCBtYW5hZ2VUeXBlcz0ge1xyXG4gICAgVEVTVDonVEVTVCcsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbWFuYWdlID0gKHN0YXRlID0ge1xyXG4gICAgdGVzdEl0ZW06IFwibWFuYWdlUmVkdWNlclwiXHJcblxyXG59LCBhY3Rpb24pID0+IHtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBtYW5hZ2VUeXBlcy5URVNUOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHRlc3Q6IGFjdGlvbi50ZXh0LFxyXG4gICAgICAgICAgICAgICAgaWQgOiBhY3Rpb24uaWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21hbmFnZS9yZWR1Y2Vycy9tYW5hZ2UuanMiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHJlZHVjZXJzIGZyb20gXCIuL3JlZHVjZXJzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyZWR1Y2Vycyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFuYWdlL3N0b3JlLmpzIiwiZXhwb3J0IGNvbnN0IGNvbXBhbnlJc1ZhbGlkID0gKCBjb21wYW55ICkgPT57XHJcbiAgICByZXR1cm4gY29tcGFueS5sZWdhbE5hbWUgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICYmIGNvbXBhbnkubGVnYWxOYW1lICE9PSBcIlwiXHJcbiAgICAgICAgJiYgY29tcGFueS52YXQgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICYmIGNvbXBhbnkudmF0ICE9PSBcIlwiXHJcbiAgICAgICAgJiYgY29tcGFueS56aXAgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICYmIGNvbXBhbnkuemlwICE9PSBcIlwiXHJcbiAgICAgICAgJiYgY29tcGFueS5hZGRyZXNzICE9PSB1bmRlZmluZWRcclxuICAgICAgICAmJiBjb21wYW55LmFkZHJlc3MgIT09IFwiXCJcclxuICAgICAgICAmJiBjb21wYW55LmNpdHkgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICYmIGNvbXBhbnkuY2l0eSAhPT0gXCJcIlxyXG4gICAgICAgICYmIGNvbXBhbnkuY291bnRyeSAhPT0gdW5kZWZpbmVkO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2FjdGlvbnMvdmFsaWRhdGlvbkFjdGlvbnMuanMiLCJleHBvcnQgY29uc3QgU3VwZXJSaWdodERlZmluaXRpb25zID0ge1xyXG4gICAgXCJMVFwiIDogW1wibWVhbnMgdGhlIHJpZ2h0IHRvIGEgcmVhbC10aW1lIChzdWJqZWN0IHRvIGxhdGVuY3kpIFRyYW5zbWlzc2lvbiBvZiBhIExpdmUgRmVlZCBvZiB0aGUgRXZlbnQgb3RoZXIgdGhhbiBpbiBCZXR0aW5nIFNob3BzIGFuZCBvbiBCZXR0aW5nIFBsYXRmb3Jtcy5cIl0sXHJcbiAgICBcIkRUXCIgOiBbXCJtZWFucyB0aGUgcmlnaHQgdG8gYSBmdWxsLWxlbmd0aCBkZWxheWVkIFRyYW5zbWlzc2lvbiBvZiBhIExpdmUgRmVlZCBvZiB0aGUgRXZlbnQgY29tbWVuY2luZyBub3QgYmVmb3JlIGVuZCBvZiB0aGUgRXZlbnQgb3IgdGhlIFRpbWUgRW1iYXJnbyBkZWZpbmVkLlwiXSxcclxuICAgIFwiTEJcIiA6IFtcIm1lYW5zIHRoZSByaWdodCB0byByZWFsLXRpbWUgKHN1YmplY3QgdG8gbGF0ZW5jeSkgVHJhbnNtaXNzaW9uIG9mIGEgTGl2ZSBGZWVkIG9mIHRoZSBFdmVudCBpbiBCZXR0aW5nIFNob3BzIGFuZCBvbiBCZXR0aW5nIFBsYXRmb3JtcztcIl0sXHJcbiAgICBcIk5BXCIgOiBbXHJcbiAgICAgICAgXCJtZWFucyB0aGUgcmlnaHQgdG8gYSBUcmFuc21pc3Npb24gb2YgRm9vdGFnZSBvZiB0aGUgRXZlbnQgbm90IGV4Y2VlZGluZ1wiLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga2V5OiBcIk5BX0lOUFVUXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInNlY29uZHMgaW4gbmV3cyBwcm9ncmFtcyBub3QgYmVmb3JlIHRoZSBlbmQgb2YgdGhlIHJlbGV2YW50IEV2ZW50IG9yIHRoZSBUaW1lIEVtYmFyZ28gZGVmaW5lZFwiXHJcbiAgICBdLFxyXG4gICAgXCJITFwiIDogW1xyXG4gICAgICAgIFwibWVhbnMgdGhlIHJpZ2h0IHRvIGEgVHJhbnNtaXNzaW9uIG9mIEhpZ2hsaWdodCBmb290YWdlIG9mIHRoZSBFdmVudCBub3QgZXhjZWVkaW5nXCIsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrZXk6IFwiSExfSU5QVVRcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibWludXRlcyBub3QgYmVmb3JlIHRoZSBlbmQgb2YgdGhlIHJlbGV2YW50IEV2ZW50IG9yIHRoZSBUaW1lIEVtYmFyZ28gZGVmaW5lZFwiXHJcblxyXG4gICAgXSxcclxuICAgIFwiUFJcIiA6IFtcIm1lYW5zIHRoZSByaWdodCB0byBhIFRyYW5zbWlzc2lvbiBvZiB0aGUgc3BlY2lmaWMgUHJvZ3JhbXMgcHJvdmlkZWQgYnkgTGljZW5zb3IgdG8gTGljZW5zZWUuXCJdLFxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBTdXBlclJpZ2h0UHJvZHVjdGlvbkRldGFpbHNMYWJlbHMgPSB7XHJcbiAgICBcIkxUXCIgOiBcIkxpdmUgVHJhbnNtaXNzaW9uXCIsXHJcbiAgICBcIkRUXCIgOiBcIkRlbGF5ZWQgJiBBcmNoaXZlIEZvb3RhZ2VcIixcclxuICAgIFwiTEJcIiA6IFwiTGl2ZSBCZXR0aW5nIFRyYW5zbWlzc2lvblwiLFxyXG4gICAgXCJITFwiIDogXCJIaWdobGlnaHRzICYgQ2xpcHNcIixcclxuICAgIFwiTkFcIiA6IFwiTmV3cyBGb290YWdlXCIsXHJcbiAgICBcIlBSXCIgOiBcIkVkaXRlZCBQcm9ncmFtXCIsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgU3VwZXJSaWdodEJvYXJkTGFiZWxzID0ge1xyXG4gICAgXCJMVFwiIDogXCJMaXZlXCIsXHJcbiAgICBcIkRUXCIgOiBcIkRlbGF5ZWQmQXJjaGl2ZVwiLFxyXG4gICAgXCJMQlwiIDogXCJCZXR0aW5nXCIsXHJcbiAgICBcIkhMXCIgOiBcIkhpZ2hsaWdodHMmQ2xpcHNcIixcclxuICAgIFwiTkFcIiA6IFwiTmV3c1wiLFxyXG4gICAgXCJQUlwiIDogXCJQcm9ncmFtXCIsXHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL1N1cGVyUmlnaHREZWZpbml0aW9ucy5qcyJdLCJzb3VyY2VSb290IjoiIn0=