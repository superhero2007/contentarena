webpackJsonp([1],{

/***/ "./src/AppBundle/Resources/public/javascript/main/components/FileSelector.js":
/*!***********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/FileSelector.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var FileItem = function FileItem(_ref) {
    var item = _ref.item,
        onClick = _ref.onClick;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        null,
        item.name,
        " ",
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { onClick: onClick, className: "fa fa-close" })
    );
};

var FileSelector = function (_Component) {
    _inherits(FileSelector, _Component);

    function FileSelector(props) {
        _classCallCheck(this, FileSelector);

        var _this = _possibleConstructorReturn(this, (FileSelector.__proto__ || Object.getPrototypeOf(FileSelector)).call(this, props));

        _this.handleUploadFile = function (event) {
            _this.state.form.append(event.target.files[0].size, event.target.files[0]);
            _this.setState({
                form: _this.state.form
            });
            // '/files' is your node.js route that triggers our middleware
            /* axios.post('/files', data).then((response) => {
                 console.log(response); // do something with the response
             });*/
        };

        _this.getItems = function () {
            var list = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _this.state.form.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var value = _step.value;

                    list.push(value);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return list;
        };

        _this.remove = function (name) {
            _this.state.form.delete(name);
            _this.setState({ form: _this.state.form });
        };

        _this.state = {
            form: new FormData()
        };
        return _this;
    }

    _createClass(FileSelector, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "base-input" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "label",
                    null,
                    "Files"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "button",
                    { className: "standard-button", onClick: function onClick() {
                            $("#input-" + _this2.props.target).trigger("click");
                        } },
                    "Upload"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { className: "is-hidden",
                    onChange: this.handleUploadFile,
                    accept: ".png,.jpg, .pdf, .doc, .docx",
                    id: "input-" + this.props.target,
                    type: "file", name: this.props.target + "[]" }),
                this.getItems().map(function (item, i) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(FileItem, { key: i, item: item, onClick: function onClick() {
                            return _this2.remove(item.size);
                        } });
                })
            );
        }
    }]);

    return FileSelector;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (FileSelector);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/NewSeason.js":
/*!********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/NewSeason.js ***!
  \********************************************************************************/
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



var NewSeason = function (_React$Component) {
    _inherits(NewSeason, _React$Component);

    function NewSeason(props) {
        _classCallCheck(this, NewSeason);

        var _this = _possibleConstructorReturn(this, (NewSeason.__proto__ || Object.getPrototypeOf(NewSeason)).call(this, props));

        _this.getEndOptions = function () {
            var value = void 0;

            if (_this.state.startDate) {

                value = Number(_this.state.startDate) + 1;

                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "option",
                    { value: value },
                    value
                );
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "option",
                null,
                "Year"
            );
        };

        _this.setStartDate = function (e) {
            _this.setState({ startDate: e.target.value });
        };

        var startYear = 1950;
        var years = [];

        for (var i = 0; i < 81; i++) {
            years.push(startYear + i);
        }

        _this.state = {
            startDate: null,
            endDate: null,
            years: years
        };
        return _this;
    }

    _createClass(NewSeason, [{
        key: "render",
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "base-input" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        null,
                        "Season"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", {
                        className: "new-season",
                        type: "text",
                        onBlur: this.props.onBlur,
                        defaultValue: this.props.value,
                        placeholder: "Enter season name" }),
                    this.props.showClose && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { className: "standard-button", onClick: this.props.onRemove },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-close" })
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "base-input" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        null,
                        "Season year"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        { className: "season-selector-label" },
                        "From"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "select",
                        { onChange: this.setStartDate },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("option", null),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "option",
                            { disabled: true },
                            "Year"
                        ),
                        this.state.years.map(function (year, i) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "option",
                                { key: i, value: year },
                                year
                            );
                        })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "label",
                        { className: "season-selector-label" },
                        "/To"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "select",
                        { disabled: !this.state.startDate },
                        this.getEndOptions(),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "option",
                            { value: 0 },
                            "Not applicable"
                        )
                    )
                )
            );
        }
    }]);

    return NewSeason;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (NewSeason);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/SearchCompetition.js":
/*!****************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/SearchCompetition.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_table__ = __webpack_require__(/*! react-table */ "./node_modules/react-table/es/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var SearchCompetition = function (_React$Component) {
    _inherits(SearchCompetition, _React$Component);

    function SearchCompetition(props) {
        _classCallCheck(this, SearchCompetition);

        var _this2 = _possibleConstructorReturn(this, (SearchCompetition.__proto__ || Object.getPrototypeOf(SearchCompetition)).call(this, props));

        _this2.search = function () {
            var _this = _this2;

            _this2.setState({
                searching: true
            });

            ContentArena.Api.searchCompetition(_this2.state.input).done(function (results) {
                _this.setState({
                    results: results,
                    searching: false,
                    searchDone: true
                });
                _this.setState({
                    resultMessage: _this.getResultMessage(0)
                });
            });
        };

        _this2.handleInput = function (e) {

            var input = e.target.value;

            _this2.setState(function (prevState) {
                return {
                    valid: input.length > 2,
                    input: input,
                    searchDone: input.length > 0 ? prevState.searchDone : false
                };
            });
        };

        _this2.getResultMessage = function (page) {
            page++;
            var total = _this2.state.results.length;
            var pageTotal = _this2.state.pageSize * page;
            var pageQuantity = page === 1 ? 1 : _this2.state.pageSize * (page - 1) + 1;

            if (pageTotal > total) pageTotal = total;

            return pageQuantity + "-" + pageTotal + " of " + total + " results for '" + _this2.state.input + "'";
        };

        _this2.onPageChange = function (page) {
            var resultMessage = _this2.getResultMessage(page);
            _this2.setState(function () {
                return {
                    resultMessage: resultMessage
                };
            });
        };

        _this2.state = {
            pageSize: 20,
            input: "",
            valid: false,
            searching: false,
            searchDone: false,
            results: [],
            resultMessage: ""
        };
        return _this2;
    }

    _createClass(SearchCompetition, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'step-content-container' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'step-item-description' },
                    'Do you want to list competition-based content?'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "base-input" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        null,
                        'Competition'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                        onChange: this.handleInput,
                        placeholder: 'Enter competition name (e.g. Bundesliga)' }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: 'standard-button', disabled: !this.state.valid || this.state.searching, onClick: this.search },
                        'Search'
                    )
                ),
                this.state.searching && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                ),
                this.state.searchDone && this.state.results.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    this.state.resultMessage
                ),
                this.state.results.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_table__["default"], {
                        defaultPageSize: this.state.pageSize,
                        showPageSizeOptions: false,
                        onPageChange: this.onPageChange,
                        data: this.state.results,
                        select: this.props.select,
                        columns: [{
                            Header: 'Competition',
                            accessor: 'name' // String-based value accessors!
                        }, {
                            Header: 'Country/Category',
                            accessor: 'sportCategory.name'
                        }, {
                            accessor: 'sport.name', // Required because our accessor is not a string
                            Header: 'Sport'
                        }, {
                            Header: '', // Custom header components!
                            Cell: function Cell(props) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    'button',
                                    { className: "blue-button", onClick: function onClick() {
                                            _this3.props.select(props.original);
                                        } },
                                    'Select'
                                );
                            }
                        }]
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { style: { display: "inline-flex" } },
                    this.state.searchDone && this.state.results.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        null,
                        'Your search "',
                        this.state.input,
                        '" did not match any products.'
                    ),
                    !this.state.searchDone && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'step-item-description' },
                        'Do you want to list content, which is not related to a specific competition?'
                    ),
                    this.state.searchDone && this.state.results.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'step-item-description' },
                        'Can\'t find your competition in our list?'
                    ),
                    this.state.searchDone && this.state.results.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'step-item-description' },
                        'Try another search or create content manually'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "standard-button standard-button-big", onClick: this.props.close },
                        'Create content manually'
                    )
                )
            );
        }
    }]);

    return SearchCompetition;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (SearchCompetition);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/SeasonSelector.js":
/*!*************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/SeasonSelector.js ***!
  \*************************************************************************************/
/*! exports provided: NewFixture, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NewFixture */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NewSeason__ = __webpack_require__(/*! ./NewSeason */ "./src/AppBundle/Resources/public/javascript/main/components/NewSeason.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sell_components_SellFormItems__ = __webpack_require__(/*! ../../sell/components/SellFormItems */ "./src/AppBundle/Resources/public/javascript/sell/components/SellFormItems.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var NewFixture = function NewFixture(_ref) {
    var onRemove = _ref.onRemove,
        onAdd = _ref.onAdd,
        onBlur = _ref.onBlur,
        value = _ref.value,
        showAdd = _ref.showAdd;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'base-input' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            null,
            'Fixture'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            className: 'new-category',
            type: 'text',
            placeholder: 'Enter fixture',
            onBlur: onBlur,
            defaultValue: value }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { onClick: onRemove, className: 'fa fa-close' }),
        showAdd && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { onClick: onAdd, className: 'fa fa-plus' })
    );
};

var SeasonSelector = function (_React$Component) {
    _inherits(SeasonSelector, _React$Component);

    function SeasonSelector(props) {
        _classCallCheck(this, SeasonSelector);

        var _this = _possibleConstructorReturn(this, (SeasonSelector.__proto__ || Object.getPrototypeOf(SeasonSelector)).call(this, props));

        _this.toggle = function () {
            _this.setState(function (prevState) {
                return {
                    showSchedule: !prevState.showSchedule
                };
            });
        };

        _this.addFixture = function () {
            _this.setState(function (prevState) {
                return {
                    fixtures: [].concat(_toConsumableArray(prevState.fixtures), [1])
                };
            });
        };

        _this.removeFixture = function (i) {
            _this.setState(function (prevState) {
                prevState.fixtures.splice(i, 1);
                return {
                    fixtures: prevState.fixtures
                };
            });
        };

        _this.state = {
            showSchedule: false,
            fixtures: []
        };
        return _this;
    }

    _createClass(SeasonSelector, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { style: { zIndex: 1 } },
                !this.props.isCustom && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'base-input' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        null,
                        'Season'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                        type: 'text',
                        value: this.props.value || "",
                        readOnly: true,
                        disabled: this.props.loading,
                        onClick: this.props.openSelector,
                        placeholder: "Season" }),
                    this.props.showClose && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { onClick: this.props.removeSeason, className: "standard-button" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-close' })
                    )
                ),
                this.props.isCustom && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__NewSeason__["a" /* default */], { showClose: this.props.showClose,
                    onBlur: this.props.onBlur,
                    onRemove: this.props.removeSeason }),
                this.props.schedules && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "base-input", style: { zIndex: 1 } },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'label',
                        null,
                        'Event'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text', placeholder: "Select events", onClick: this.toggle })
                ),
                this.state.showSchedule && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__sell_components_SellFormItems__["d" /* Schedules */], { schedules: this.props.schedules })
                ),
                this.props.showAddNew && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: 'link-button', onClick: this.props.addSeason },
                        'Add season'
                    )
                ),
                this.props.showAddNew && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'step-item-description' },
                    'Do you wish to add fixtures individually?',
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: 'link-button', onClick: this.addFixture },
                        'Click here'
                    )
                ),
                this.state.fixtures.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    this.state.fixtures.map(function (fixture, i, list) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(NewFixture, {
                            key: i,
                            onAdd: _this2.addFixture,
                            onRemove: function onRemove() {
                                return _this2.removeFixture(i);
                            },
                            showAdd: i === list.length - 1
                        });
                    })
                )
            );
        }
    }]);

    return SeasonSelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (SeasonSelector);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main/components/Selector.js":
/*!*******************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main/components/Selector.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sell_store__ = __webpack_require__(/*! ../../sell/store */ "./src/AppBundle/Resources/public/javascript/sell/store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_modal__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_modal__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






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

__WEBPACK_IMPORTED_MODULE_3_react_modal___default.a.setAppElement('#sell-form-container');

var SelectorItem = function SelectorItem(_ref) {
    var label = _ref.label,
        selected = _ref.selected,
        onClick = _ref.onClick,
        disabled = _ref.disabled;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: "selector-item " + (selected ? "selector-item-selected " : "") + (disabled && "selector-item-disabled"), onClick: !disabled ? onClick : undefined },
        label
    );
};

var Selector = function (_React$Component) {
    _inherits(Selector, _React$Component);

    function Selector(props) {
        _classCallCheck(this, Selector);

        var _this2 = _possibleConstructorReturn(this, (Selector.__proto__ || Object.getPrototypeOf(Selector)).call(this, props));

        _this2.componentDidMount = function () {};

        _this2.openModal = function () {
            _this2.props.openSelector();
        };

        _this2.afterOpenModal = function () {};

        _this2.closeModal = function () {
            _this2.setState({ updated: false, filterUpdated: false, customCountry: false });
            _this2.props.closeSelector();
        };

        _this2.getActiveFilter = function () {
            var activeFilter = _this2.getActiveFilterName();
            return _this2.state.filter[activeFilter];
        };

        _this2.getActiveFilterName = function () {
            return _this2.props.activeFilter && !_this2.state.filterUpdated ? _this2.props.activeFilter : _this2.state.activeFilter;
        };

        _this2.shouldShowFilters = function () {
            return _this2.state.selectorItems && _this2.state.selectorItems.length > 30;
        };

        _this2.shouldShowInternationalFilter = function () {

            var show = false;

            _this2.state.selectorItems.some(function (item) {
                show = item.name.match(/international/gi) !== null;
                return show;
            });

            return show;
        };

        _this2.setActiveFilter = function (filterName) {
            _this2.setState({ activeFilter: filterName, filterUpdated: true });
        };

        _this2.applySelection = function () {

            var selectedItems = _this2.state.selectedItems,
                prevCountries = _this2.state.prevCountries;

            if (_this2.state.customCountry) {
                selectedItems.forEach(function (item) {
                    if (!prevCountries.has(item.externalId)) item.extended = true;
                });
            }

            _this2.setState({ updated: false, filterUpdated: false, customCountry: false });
            _this2.props.applySelection(_this2.props.selectorType, selectedItems, _this2.props.multiple, _this2.props.index, _this2.props.clean);
        };

        _this2.addNewSport = function (index) {
            _this2.setState({ updated: false, filterUpdated: false });
            _this2.props.addNewSport(index, _this2.props.clean);
            _this2.props.closeSelector();
        };

        _this2.addNewTournament = function (index) {
            _this2.setState({ updated: false, filterUpdated: false });
            _this2.props.addNewTournament(index, _this2.props.clean);
            _this2.props.closeSelector();
        };

        _this2.addNewSeason = function (index) {
            _this2.setState({ updated: false, filterUpdated: false });
            _this2.props.addNewSeason(index, _this2.props.clean);
            _this2.props.closeSelector();
        };

        _this2.addNewCategory = function (index) {
            _this2.setState({ updated: false, filterUpdated: false });
            _this2.props.addNewCategory(index, _this2.props.clean);
            _this2.props.closeSelector();
        };

        _this2.selectItem = function (item) {

            var _this = _this2;

            _this2.setState(function (prevState) {

                if (prevState.selectedItems.has(item.externalId)) {
                    if (_this.props.multiple) {
                        prevState.selectedItems.delete(item.externalId);
                    }
                } else {

                    if (!_this.props.multiple) {
                        prevState.selectedItems.clear();
                    }

                    prevState.selectedItems.set(item.externalId, item);
                }

                return {
                    selectedItems: prevState.selectedItems,
                    updated: true
                };
            });
        };

        _this2.isItemSelected = function (item) {
            return _this2.state.selectedItems.has(item.externalId);
        };

        _this2.isItemDisabled = function (item) {

            return _this2.state.disabled.has(item.externalId);
        };

        _this2.showAllCountries = function () {

            if (!ContentArena.Data.Countries || ContentArena.Data.Countries.length === 0) return;

            _this2.setState(function (prevState) {
                return {
                    prevCountries: new Map(prevState.selectorItems.map(function (i) {
                        return [i.externalId, i];
                    })),
                    selectorItems: ContentArena.Data.Countries,
                    customCountry: true
                };
            });
        };

        _this2.filterLetter = function (item) {
            var filter = _this2.getActiveFilter();
            return filter.values.indexOf(item.name[0].toLowerCase()) !== -1;
        };

        _this2.filterInternational = function (item) {
            return item.name.match(/international/gi) !== null;
        };

        _this2.getItems = function () {
            var filter = _this2.getActiveFilter();
            if (filter.type === "origin") return _this2.props[filter.value];

            if (filter.type === "international") return _this2.state.selectorItems.filter(_this2.filterInternational);

            if (filter.type === "firstLetter") {

                if (!_this2.shouldShowFilters()) return _this2.state.selectorItems;

                return _this2.state.selectorItems.filter(_this2.filterLetter);
            }
        };

        _this2.state = {
            updated: false,
            filterUpdated: false,
            open: props.selector,
            prevCountries: new Map(),
            customCountry: false,
            selectorItems: props.selectorItems || [],
            popularItems: props.popularItems || [],
            filter: {
                "ag": { type: "firstLetter", values: ["a", 'b', 'c', 'd', 'e', 'f', 'g'] },
                "hn": { type: "firstLetter", values: ["h", 'i', 'j', 'k', 'l', 'k', 'n'] },
                "ot": { type: "firstLetter", values: ["o", 'p', 'q', 'r', 's', 't'] },
                "uz": { type: "firstLetter", values: ["u", 'v', 'w', 'x', 'y', 'z'] },
                "popular": { type: "origin", value: "popularItems" },
                "international": { type: "international", value: "international" }
            },
            activeFilter: props.activeFilter || "ag",
            selectedItems: new Map(),
            disabled: new Map()
        };

        __WEBPACK_IMPORTED_MODULE_2__sell_store__["a" /* default */].subscribe(function (a) {});
        return _this2;
    }

    _createClass(Selector, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {

            var disabled = new Map(),
                selectedItems = new Map();

            if (nextProps.disabled) disabled = nextProps.disabled;
            if (nextProps.selectedItems) {
                nextProps.selectedItems.forEach(function (v, k) {
                    selectedItems.set(v.externalId, v);
                });
            }

            this.setState({
                disabled: disabled,
                selectedItems: selectedItems,
                selectorItems: nextProps.selectorItems
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_react_modal___default.a,
                {
                    isOpen: this.props.open,
                    onAfterOpen: this.afterOpenModal,
                    onRequestClose: this.closeModal,
                    bodyOpenClassName: "selector",
                    style: customStyles,
                    contentLabel: 'Example Modal'
                },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    this.props.popularItems && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "popular" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("popular");
                            } },
                        'Popular'
                    ),
                    this.shouldShowFilters() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "ag" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("ag");
                            } },
                        'A-G'
                    ),
                    this.shouldShowFilters() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "hn" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("hn");
                            } },
                        'H-N'
                    ),
                    this.shouldShowFilters() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "ot" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("ot");
                            } },
                        'O-T'
                    ),
                    this.shouldShowFilters() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "uz" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("uz");
                            } },
                        'U-Z'
                    ),
                    this.shouldShowInternationalFilter() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "selector-filter " + (this.getActiveFilterName() === "international" && "selector-filter-active"),
                            onClick: function onClick() {
                                _this3.setActiveFilter("international");
                            } },
                        'International'
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'selector-content' },
                    this.getItems().map(function (item, i) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SelectorItem, { key: i,
                            label: item.name,
                            onClick: function onClick() {
                                return _this.selectItem(item);
                            },
                            selected: _this.isItemSelected(item),
                            disabled: _this.isItemDisabled(item)
                        });
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "buttons" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "light-blue-button", style: { backgroundColor: customStyles.content.backgroundColor }, onClick: this.closeModal },
                        'Cancel'
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "standard-button", onClick: this.applySelection, disabled: !this.state.updated },
                        'Apply'
                    )
                ),
                this.props.showNewSport && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "extras" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: "message" },
                        'Can\'t find your sport in the list? '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "link-button", onClick: function onClick() {
                                _this3.addNewSport(_this3.props.index);
                            } },
                        'Add new Sport'
                    )
                ),
                this.props.showNewTournament && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "extras" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: "message" },
                        'Can\'t find your competition in the list? '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "link-button", onClick: function onClick() {
                                _this3.addNewTournament(_this3.props.index);
                            } },
                        'Add new Tournament'
                    )
                ),
                this.props.showNewSeason && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "extras" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: "message" },
                        'Can\'t find your season in the list? '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "link-button", onClick: function onClick() {
                                _this3.addNewSeason(_this3.props.index);
                            } },
                        'Add new Season'
                    )
                ),
                this.props.showAllCountries && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "extras" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: "message" },
                        'Can\'t find your country in the list? '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "link-button", onClick: this.showAllCountries },
                        'Show all countries'
                    )
                ),
                this.props.showNewCategory && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: "extras" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: "message" },
                        'Can\'t find your category in the list? '
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: "link-button", onClick: function onClick() {
                                _this3.addNewCategory(_this3.props.index);
                            } },
                        'Add new Category'
                    )
                )
            );
        }
    }]);

    return Selector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state.selector;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        openSelector: function openSelector() {
            return dispatch({
                type: 'OPEN_SELECTOR'
            });
        },
        closeSelector: function closeSelector() {
            return dispatch({
                type: 'CLOSE_SELECTOR'
            });
        },
        applySelection: function applySelection(selectorType, selectedItems, multiple, index, clean) {
            return dispatch({
                type: 'APPLY_SELECTION',
                selectorType: selectorType,
                selectedItems: selectedItems,
                multiple: multiple,
                index: index,
                clean: clean
            });
        },
        addNewSport: function addNewSport(index, clean) {
            return dispatch({
                type: 'ADD_NEW',
                index: index,
                selectorType: "sports",
                clean: clean
            });
        },
        addNewCategory: function addNewCategory(index, clean) {
            return dispatch({
                type: 'ADD_NEW',
                index: index,
                selectorType: "sportCategory",
                clean: clean
            });
        },
        addNewTournament: function addNewTournament(index, clean) {
            return dispatch({
                type: 'ADD_NEW',
                index: index,
                selectorType: "tournament",
                clean: clean
            });
        },
        addNewSeason: function addNewSeason(index, clean) {
            return dispatch({
                type: 'ADD_NEW',
                index: index,
                selectorType: "seasons",
                clean: clean
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Selector));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/CurrencySelector.js":
/*!***************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/CurrencySelector.js ***!
  \***************************************************************************************/
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

var CurrencyItem = function CurrencyItem(_ref) {
    var selected = _ref.selected,
        onClick = _ref.onClick,
        name = _ref.name;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "currency-item", onClick: onClick },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "currency-icon" },
            selected && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-check-circle-o" })
        ),
        name
    );
};



var CurrencySelector = function (_React$Component) {
    _inherits(CurrencySelector, _React$Component);

    function CurrencySelector(props) {
        _classCallCheck(this, CurrencySelector);

        var _this = _possibleConstructorReturn(this, (CurrencySelector.__proto__ || Object.getPrototypeOf(CurrencySelector)).call(this, props));

        _this.update = function (selected) {
            _this.setState({ selected: selected });
        };

        _this.state = {};
        return _this;
    }

    _createClass(CurrencySelector, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {}
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "base-input" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "label",
                    { style: { flex: 7 } },
                    "In which currency would you like to sell your content?"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CurrencyItem, { name: "EUR", onClick: function onClick() {
                        return _this2.props.onClick("EUR");
                    }, selected: this.props.selected === "EUR" }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CurrencyItem, { name: "USD", onClick: function onClick() {
                        return _this2.props.onClick("USD");
                    }, selected: this.props.selected === "USD" })
            );
        }
    }]);

    return CurrencySelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (CurrencySelector);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/LicenseDateSelector.js":
/*!******************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/LicenseDateSelector.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_datepicker__ = __webpack_require__(/*! react-datepicker */ "./node_modules/react-datepicker/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var LicenseDateSelector = function (_React$Component) {
    _inherits(LicenseDateSelector, _React$Component);

    function LicenseDateSelector(props) {
        _classCallCheck(this, LicenseDateSelector);

        var _this = _possibleConstructorReturn(this, (LicenseDateSelector.__proto__ || Object.getPrototypeOf(LicenseDateSelector)).call(this, props));

        _this.handleStartDate = function (date) {
            _this.setState({
                startDate: date
            });

            _this.props.onUpdate("startDate", date);
        };

        _this.handleEndDate = function (date) {
            _this.setState({
                endDate: date
            });
            _this.props.onUpdate("endDate", date);
        };

        _this.state = {};
        return _this;
    }

    _createClass(LicenseDateSelector, [{
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: "license-date-container" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'table-right' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'row' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'column right-name' },
                            'Start of license period'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'column right-package' },
                            'All'
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'row bordered-row' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: ' column right-item-content' },
                            'With contract conclusion'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'column right-item-selection' },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'div',
                                { className: 'column right-item-selection' },
                                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-check-circle-o' })
                            )
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'row bordered-row' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: ' column right-item-content' },
                            'From selected date'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'column right-item-selection' },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_datepicker__["default"], {
                                className: "date-picker",
                                selected: this.state.startDate,
                                onChange: this.handleStartDate,
                                placeholderText: "dd/mm/yyyy"
                            })
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'table-right' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'row' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'column right-name' },
                            'End of license period'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'column right-package' },
                            'All'
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'row bordered-row' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: ' column right-item-content' },
                            'Until (X) days from contract conclusion'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'column right-item-selection' },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: "number", placeholder: "Enter number" })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'row bordered-row' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: ' column right-item-content' },
                            'Until selected date'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'column right-item-selection' },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_datepicker__["default"], {
                                className: "date-picker",
                                selected: this.state.endDate,
                                onChange: this.handleEndDate,
                                placeholderText: "dd/mm/yyyy"
                            })
                        )
                    )
                )
            );
        }
    }]);

    return LicenseDateSelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (LicenseDateSelector);

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

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/ProgramName.js":
/*!**********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/ProgramName.js ***!
  \**********************************************************************************/
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



var ProgramName = function (_React$Component) {
    _inherits(ProgramName, _React$Component);

    function ProgramName(props) {
        _classCallCheck(this, ProgramName);

        var _this = _possibleConstructorReturn(this, (ProgramName.__proto__ || Object.getPrototypeOf(ProgramName)).call(this, props));

        _this.handleChange = function (event) {
            _this.setState({ name: event.target.value });
        };

        _this.state = {
            name: props.name || ''
        };
        return _this;
    }

    _createClass(ProgramName, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ name: nextProps.name });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'base-input' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'label',
                    null,
                    'Enter program name'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                    type: 'text',
                    value: this.state.name,
                    disabled: this.props.showEdit,
                    onChange: this.handleChange,
                    placeholder: 'Program name' }),
                this.props.showSave && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { className: "standard-button", onClick: function onClick() {
                            return _this2.props.onSave(_this2.props.index, _this2.state.name);
                        } },
                    'Save'
                ),
                this.props.showEdit && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { className: "standard-button", onClick: function onClick() {
                            return _this2.props.onEdit(_this2.props.index, _this2.state.name);
                        } },
                    'Edit'
                ),
                this.props.showRemove && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { className: "standard-button", onClick: function onClick() {
                            return _this2.props.onRemove(_this2.props.index);
                        } },
                    'Remove'
                ),
                this.props.showAdd && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { className: "standard-button", onClick: this.props.onAdd },
                    'Add'
                )
            );
        }
    }]);

    return ProgramName;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ProgramName);

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/Right.js":
/*!****************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/Right.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_datepicker__ = __webpack_require__(/*! react-datepicker */ "./node_modules/react-datepicker/es/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var RightItem = function RightItem(_ref) {
    var selected = _ref.selected,
        onClick = _ref.onClick;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { onClick: onClick, className: 'column right-item-selection' },
        selected && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-check-circle-o' })
    );
};

var Right = function (_React$Component) {
    _inherits(Right, _React$Component);

    function Right(props) {
        _classCallCheck(this, Right);

        var _this = _possibleConstructorReturn(this, (Right.__proto__ || Object.getPrototypeOf(Right)).call(this, props));

        _initialiseProps.call(_this);

        var activePackages = new Map(props.data.packages.map(function (i) {
            return [i.id, i];
        }));
        var selection = new Map(props.data.items.map(function (i) {
            return [i.id, new Map()];
        }));

        _this.state = {
            rightPackages: props.rightPackages || [],
            activePackages: activePackages,
            selection: selection,
            all: false
        };
        return _this;
    }

    _createClass(Right, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            console.log("Right - props", props);
            this.setState({
                rightPackages: props.rightPackages
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'table-right' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'row' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: 'column right-name' },
                            this.props.data.name
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: this.props.data.all_enabled ? "column right-package" : "column right-package disabled" },
                            'All'
                        ),
                        this.props.rightPackages && Array.from(this.props.rightPackages.values()).map(function (rightPackage) {
                            return _this2.showProgramColumns(rightPackage) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'div',
                                { className: _this2.packageIsActive(rightPackage.id) ? "column right-package" : "column right-package disabled" },
                                rightPackage.shortLabel
                            );
                        }),
                        this.getProgramsName().map(function (program) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'div',
                                { className: "column right-package" },
                                program
                            );
                        })
                    ),
                    this.props.data.items && this.props.data.items.map(function (rightItem, i, list) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: i < list.length - 1 ? "row bordered-row" : "row" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'div',
                                { className: ' column right-item-content' },
                                rightItem.form_content
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                'div',
                                { className: 'column right-item-selection', onClick: function onClick() {
                                        _this2.props.data.all_enabled && _this2.toggleAll(rightItem.id);
                                    } },
                                _this2.isSelected(rightItem.id, 0) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-check-circle-o' })
                            ),
                            _this2.props.rightPackages && Array.from(_this2.props.rightPackages.values()).map(function (rightPackage) {

                                if (!_this2.packageIsActive(rightPackage.id)) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'column right-item-selection' });

                                if (_this2.showProgramColumns(rightPackage) && rightItem.calendar) return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                    'div',
                                    { className: 'column right-item-selection' },
                                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_datepicker__["default"], {
                                        className: "date-picker",
                                        selected: _this2.state.selection.get(rightItem.id).get(rightPackage.id),
                                        onChange: function onChange(date) {
                                            return _this2.setDate(date, rightItem.id, rightPackage.id);
                                        },
                                        placeholderText: "dd/mm/yyyy"
                                    })
                                );

                                return _this2.showProgramColumns(rightPackage) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(RightItem, {
                                    selected: _this2.isSelected(rightItem.id, rightPackage.id),
                                    onClick: function onClick() {
                                        _this2.toggle(rightItem.id, rightPackage.id);
                                    }
                                });
                            }),
                            _this2.getProgramsName().map(function (program) {
                                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'column right-item-selection' });
                            })
                        );
                    })
                )
            );
        }
    }]);

    return Right;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.toggleAll = function (rightItem) {
        var selection = _this3.state.selection;

        if (selection.get(rightItem).has(0)) {
            selection.get(rightItem).clear();
        } else {
            _this3.state.activePackages.forEach(function (rightPackage) {
                selection.get(rightItem).set(rightPackage.id, true);
            });

            selection.get(rightItem).set(0, true);
        }

        _this3.setState({ selection: selection });
    };

    this.select = function (rightItem, rightPackage) {
        var selection = _this3.state.selection;

        if (!_this3.state.activePackages.has(rightPackage)) return false;

        if (!_this3.props.data.multiple) {

            selection.forEach(function (item, key) {
                if (key !== rightItem) item.clear();
            });
        }
        selection.get(rightItem).set(rightPackage, true);
        _this3.setState({ selection: selection });
    };

    this.unselect = function (rightItem, rightPackage) {
        var selection = _this3.state.selection;
        selection.get(rightItem).delete(rightPackage);
        selection.get(rightItem).delete(0);
        _this3.setState({ selection: selection });
    };

    this.toggle = function (rightItem, rightPackage) {
        var selection = _this3.state.selection;
        if (selection.get(rightItem).has(rightPackage)) {
            _this3.unselect(rightItem, rightPackage);
        } else {
            _this3.select(rightItem, rightPackage);
        }
    };

    this.isSelected = function (rightItem, rightPackage) {
        var selection = _this3.state.selection;
        return selection.get(rightItem).has(rightPackage);
    };

    this.getProgramsName = function () {
        return _this3.props.programs.filter(function (program) {
            return program.saved;
        }).map(function (program) {
            return program.name;
        });
    };

    this.showProgramColumns = function (rightPackage) {
        return rightPackage.shortLabel !== "PR" || rightPackage.shortLabel === "PR" && _this3.getProgramsName().length === 0;
    };

    this.packageIsActive = function (id) {
        return _this3.state.activePackages.has(id);
    };

    this.setDate = function (date, rightItem, rightPackage) {
        var selection = _this3.state.selection;

        if (!_this3.state.activePackages.has(rightPackage)) return false;

        selection.get(rightItem).set(rightPackage, date);
        _this3.setState({ selection: selection });
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Right);

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

            if (!selected) _this.setState({ showMatches: false });
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
                        this.getSelected() === 0 || this.getSelected() === this.state.schedule.length && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'span',
                            { onClick: this.toggleMatches },
                            'Select >'
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

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/SellForm.js":
/*!*******************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/SellForm.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__containers_SellButtons__ = __webpack_require__(/*! ../containers/SellButtons */ "./src/AppBundle/Resources/public/javascript/sell/containers/SellButtons.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__containers_SellFormSteps__ = __webpack_require__(/*! ../containers/SellFormSteps */ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormSteps.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_SellFormStep1__ = __webpack_require__(/*! ../containers/SellFormStep1 */ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep1.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_SellFormStep2__ = __webpack_require__(/*! ../containers/SellFormStep2 */ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep2.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__containers_SellFormStep3__ = __webpack_require__(/*! ../containers/SellFormStep3 */ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep3.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__main_components_Selector__ = __webpack_require__(/*! ../../main/components/Selector */ "./src/AppBundle/Resources/public/javascript/main/components/Selector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__store__ = __webpack_require__(/*! ../store */ "./src/AppBundle/Resources/public/javascript/sell/store.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var SellForm = function (_React$Component) {
    _inherits(SellForm, _React$Component);

    function SellForm(props) {
        _classCallCheck(this, SellForm);

        var _this2 = _possibleConstructorReturn(this, (SellForm.__proto__ || Object.getPrototypeOf(SellForm)).call(this, props));

        _this2.componentDidMount = function () {
            _this2.props.contentListingInit(_this2.state.content);
        };

        _this2.state = {
            content: JSON.parse(props.content)
        };

        __WEBPACK_IMPORTED_MODULE_8__store__["a" /* default */].subscribe(function (a) {
            //console.log(store.getState());
        });
        return _this2;
    }

    _createClass(SellForm, [{
        key: "render",
        value: function render() {
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "main-container" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__main_components_Selector__["a" /* default */], { style: { zIndex: 100 } }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__containers_SellFormSteps__["a" /* default */], null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__containers_SellFormStep1__["a" /* default */], null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__containers_SellFormStep2__["a" /* default */], { packages: this.props.packages }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__containers_SellFormStep3__["a" /* default */], { packages: this.props.packages }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__containers_SellButtons__["a" /* default */], null)
            );
        }
    }]);

    return SellForm;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return ownProps;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        contentListingInit: function contentListingInit(content) {
            return dispatch({
                type: 'CONTENT_INIT',
                content: content
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_7_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(SellForm));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/components/SellFormItems.js":
/*!************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/components/SellFormItems.js ***!
  \************************************************************************************/
/*! exports provided: Description, NewCategory, NewTournament, Schedules, SportSelector */
/*! exports used: Description, NewCategory, NewTournament, Schedules, SportSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Description; });
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

var NewCategory = function NewCategory(_ref2) {
    var onClick = _ref2.onClick,
        showClose = _ref2.showClose,
        onBlur = _ref2.onBlur,
        value = _ref2.value;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'base-input' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            null,
            'Category'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            className: 'new-category',
            type: 'text',
            placeholder: 'Enter category',
            onBlur: onBlur,
            defaultValue: value }),
        showClose && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { onClick: onClick, className: "standard-button" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-close' })
        )
    );
};

var NewTournament = function NewTournament(_ref3) {
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

var Schedules = function Schedules(_ref4) {
    var schedules = _ref4.schedules;
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

/***/ "./src/AppBundle/Resources/public/javascript/sell/containers/PackageSelector.js":
/*!**************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/containers/PackageSelector.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var SuperRight = function (_React$Component) {
    _inherits(SuperRight, _React$Component);

    function SuperRight(props) {
        _classCallCheck(this, SuperRight);

        var _this2 = _possibleConstructorReturn(this, (SuperRight.__proto__ || Object.getPrototypeOf(SuperRight)).call(this, props));

        _this2.state = {};
        return _this2;
    }

    _createClass(SuperRight, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ checked: nextProps.checked });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "select-box-item" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "select-box-checkbox" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("input", { type: "checkbox",
                        defaultChecked: this.props.checked,
                        checked: this.state.checked,
                        onChange: function onChange(e) {
                            _this3.setState({ checked: e.target.checked });
                            _this3.props.onChange(_this3.props.superRight, e.target.checked);
                        },
                        id: "super-right-" + this.props.superRight.id,
                        className: "package-selector" }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("label", { htmlFor: "super-right-" + this.props.superRight.id })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "select-box-item-label" },
                    this.props.superRight.name,
                    " (",
                    this.props.superRight.shortLabel,
                    ")"
                )
            );
        }
    }]);

    return SuperRight;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var PackageSelector = function (_React$Component2) {
    _inherits(PackageSelector, _React$Component2);

    function PackageSelector(props) {
        _classCallCheck(this, PackageSelector);

        var _this4 = _possibleConstructorReturn(this, (PackageSelector.__proto__ || Object.getPrototypeOf(PackageSelector)).call(this, props));

        _this4.updateSuperRightsList = function (superRight, status) {
            if (status && !_this4.state.rightsPackage.has(superRight.id)) _this4.state.rightsPackage.set(superRight.id, superRight);
            if (!status && _this4.state.rightsPackage.has(superRight.id)) _this4.state.rightsPackage.delete(superRight.id);
        };

        _this4.resetSuperRights = function () {

            _this4.setState({ packages: _this4.state.packages });
            _this4.props.resetSuperRigths();
            _this4.props.onConfirm(false);
        };

        _this4.confirmSuperRights = function () {
            _this4.props.superRightsUpdated(_this4.state.rightsPackage);
            _this4.props.onConfirm(true);
        };

        _this4.state = {
            packages: JSON.parse(props.packages),
            rightsPackage: new Map(props.rightsPackage.map(function (i) {
                return [i.id, i];
            }))
        };
        return _this4;
    }

    _createClass(PackageSelector, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ rightsPackage: new Map(nextProps.rightsPackage.map(function (i) {
                    return [i.id, i];
                })) });
        }
    }, {
        key: "render",
        value: function render() {
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "package-selector" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "package-selector-title" },
                    "Pick rights"
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "package-selector-container" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "package-selector-content" },
                        this.state.packages.map(function (superRight) {
                            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SuperRight, {
                                key: superRight.id,
                                superRight: superRight,
                                onChange: _this.updateSuperRightsList,
                                checked: _this.state.rightsPackage.has(superRight.id)
                            });
                        })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "package-selector-buttons" },
                        this.state.rightsPackage.size === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { onClick: this.confirmSuperRights },
                            "Confirm "
                        ),
                        this.state.rightsPackage.size > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            { onClick: this.resetSuperRights },
                            "Reset package selection"
                        )
                    )
                )
            );
        }
    }]);

    return PackageSelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state.content;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        superRightsUpdated: function superRightsUpdated(rightsPackage) {
            return dispatch({
                type: 'SUPER_RIGHTS_UPDATED',
                rightsPackage: rightsPackage
            });
        },
        resetSuperRigths: function resetSuperRigths() {
            return dispatch({
                type: 'SUPER_RIGHTS_UPDATED',
                reset: true
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(PackageSelector));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/containers/SellButtons.js":
/*!**********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/containers/SellButtons.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(/*! ../store */ "./src/AppBundle/Resources/public/javascript/sell/store.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var SellButtons = function (_React$Component) {
    _inherits(SellButtons, _React$Component);

    function SellButtons(props) {
        _classCallCheck(this, SellButtons);

        var _this2 = _possibleConstructorReturn(this, (SellButtons.__proto__ || Object.getPrototypeOf(SellButtons)).call(this, props));

        _this2.saveAsDraft = function () {
            var _this = _this2;
            _this.setState({ saving: true });
            ContentArena.ContentApi.saveContentAsDraft(__WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */].getState().content).done(function (response) {
                _this.setState({ saving: false, savingSuccess: true });
            }).fail(function () {
                _this.setState({ saving: false, savingSuccess: false });
            });
        };

        _this2.state = {
            date: new Date(),
            lastStep: props.lastStep || 5,
            saving: false,
            savingSuccess: false
        };
        return _this2;
    }

    _createClass(SellButtons, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var saveAsDraftText = this.state.saving ? "Saving.." : this.state.savingSuccess ? "Saved as Draft" : "Save as Draft";

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'buttons' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'buttons-container' },
                    this.props.sports.length > 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: 'light-blue-button', onClick: this.saveAsDraft, disabled: this.state.saving },
                        saveAsDraftText,
                        this.state.saving && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    this.props.step === this.state.lastStep && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { id: 'draft-listing', className: 'standard-button' },
                        'Submit Listing'
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'buttons-container' },
                    this.props.step !== 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        { className: 'standard-button',
                            onClick: this.props.goToPreviousStep },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-arrow-left' }),
                        ' Back'
                    ),
                    [1, 2, 3, 4, 5].map(function (v, k) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'div',
                            { className: "step " + (_this3.props.step === v ? "step-active" : ""), key: k },
                            v
                        );
                    }),
                    this.props.step !== this.state.lastStep && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'button',
                        {
                            id: 'next-step',
                            className: 'standard-button',
                            disabled: this.props.sports.length === 0,
                            onClick: function onClick() {
                                return _this3.props.goToNextStep();
                            } },
                        'Next ',
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-arrow-right' })
                    )
                )
            );
        }
    }]);

    return SellButtons;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        step: state.content.step,
        sports: state.content.sports
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        goToNextStep: function goToNextStep() {
            return dispatch({
                type: 'GO_TO_NEXT_STEP'
            });
        },

        goToPreviousStep: function goToPreviousStep() {
            return dispatch({
                type: 'GO_TO_PREVIOUS_STEP'
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(SellButtons));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep1.js":
/*!************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep1.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_components_FileSelector__ = __webpack_require__(/*! ../../main/components/FileSelector */ "./src/AppBundle/Resources/public/javascript/main/components/FileSelector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_components_SearchCompetition__ = __webpack_require__(/*! ../../main/components/SearchCompetition */ "./src/AppBundle/Resources/public/javascript/main/components/SearchCompetition.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__main_components_SeasonSelector__ = __webpack_require__(/*! ../../main/components/SeasonSelector */ "./src/AppBundle/Resources/public/javascript/main/components/SeasonSelector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_tagsinput__ = __webpack_require__(/*! react-tagsinput */ "./node_modules/react-tagsinput/react-tagsinput.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_tagsinput___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_tagsinput__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_SellFormItems__ = __webpack_require__(/*! ../components/SellFormItems */ "./src/AppBundle/Resources/public/javascript/sell/components/SellFormItems.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var SellFormStep1 = function (_React$Component) {
    _inherits(SellFormStep1, _React$Component);

    function SellFormStep1(props) {
        _classCallCheck(this, SellFormStep1);

        var _this2 = _possibleConstructorReturn(this, (SellFormStep1.__proto__ || Object.getPrototypeOf(SellFormStep1)).call(this, props));

        _this2.updateContentValue = function (event, key) {
            _this2.props.updateContentValue(key, event.target.value);
        };

        _this2.forceCustomTournament = function () {
            return _this2.hasCustomSport() || _this2.hasCustomCategory() || _this2.state.sportCategoryExtended;
        };

        _this2.forceCustomCategory = function () {
            return _this2.hasCustomSport();
        };

        _this2.forceCustomSeason = function () {
            return _this2.hasCustomSport() || _this2.hasCustomTournament();
        };

        _this2.hasCustomSport = function () {
            var hasCustomSport = false;

            _this2.props.sports.forEach(function (sport) {
                if (sport.custom) hasCustomSport = true;
            });

            return hasCustomSport && _this2.props.sports.length === 1;
        };

        _this2.hasCustomCategory = function () {
            var hasCustomCategory = false;

            _this2.state.sportCategories.forEach(function (sportCategory) {
                if (sportCategory.custom) hasCustomCategory = true;
            });

            return _this2.forceCustomCategory() || hasCustomCategory;
        };

        _this2.hasCustomTournament = function () {
            var hasCustomTournament = false;

            _this2.state.tournaments.forEach(function (tournament) {
                if (tournament.custom) hasCustomTournament = true;
            });

            return _this2.forceCustomTournament() || hasCustomTournament || _this2.state.sportCategoryExtended;
        };

        _this2.hasCustomSeason = function () {

            var hasCustomSeason = false;

            _this2.props.seasons.forEach(function (season) {
                if (season.custom) hasCustomSeason = true;
            });

            return _this2.forceCustomSeason() || hasCustomSeason;
        };

        _this2.addSeason = function () {
            _this2.setState(function (prevState) {
                return {
                    seasonSelectors: [].concat(_toConsumableArray(prevState.seasonSelectors), [1])
                };
            });
        };

        _this2.addSportSelector = function () {
            _this2.setState(function (prevState) {
                return {
                    sportSelectors: [].concat(_toConsumableArray(prevState.sportSelectors), [1])
                };
            });
        };

        _this2.removeSport = function (i) {

            if (i === 0) {
                _this2.props.removeNewSport(i);
                return;
            }

            _this2.setState(function (prevState) {
                prevState.sportSelectors.splice(i, 1);
                return {
                    sportSelectors: prevState.sportSelectors
                };
            });

            _this2.props.removeFromMultiple(i, "sports");
        };

        _this2.removeSeason = function (i) {

            if (i === 0) {
                _this2.props.removeNewSeason(i);
                return;
            }

            _this2.setState(function (prevState) {
                prevState.seasonSelectors.splice(i, 1);
                return {
                    seasonSelectors: prevState.seasonSelectors
                };
            });

            _this2.props.removeFromMultiple(i, "seasons");
        };

        _this2.toggleSearch = function () {
            _this2.setState(function (prevState) {
                return {
                    showSearch: !prevState.showSearch
                };
            });
        };

        _this2.websitesUpdated = function (website) {
            _this2.setState({ website: website });
            _this2.props.updateContentValue("website", website);
        };

        _this2.selectTournament = function (tournament) {
            _this2.toggleSearch();
            _this2.props.selectTournament(tournament);
        };

        _this2.state = {
            title: "Step 1 - Event selection",
            lastSportId: null,
            lastCategoryId: null,
            lastTournamentId: null,
            loadingCategories: false,
            loadingTournaments: false,
            loadingSeasons: false,
            loadingSchedule: false,
            seasonSelectors: [1],
            sportSelectors: [1],
            seasons: [],
            schedules: {},
            showSearch: true,
            website: [],
            tournaments: [],
            sportCategories: [],
            sportCategoryExtended: false
        };
        return _this2;
    }

    _createClass(SellFormStep1, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            ContentArena.Api.getSports().done(function (sports) {
                ContentArena.Data.FullSports = sports;
            });

            if (ContentArena.Data.Countries.length === 0) {
                ContentArena.Api.getCountries().done(function (countries) {
                    ContentArena.Data.Countries = countries;
                });
            }
        }
    }, {
        key: 'loadCategories',
        value: function loadCategories(sport) {
            var _this3 = this;

            var sportId = sport.externalId;

            if (sportId === this.state.lastSportId) return;

            this.setState({ loadingCategories: true });
            ContentArena.Api.getCategories(sportId).done(function (categories) {
                ContentArena.Data.Categories = categories;
                _this3.setState({ lastSportId: sportId, loadingCategories: false });
            });
        }
    }, {
        key: 'loadTournaments',
        value: function loadTournaments(sport, category) {
            var _this4 = this;

            var sportId = sport.externalId;
            var categoryId = category ? category.externalId : null;

            if (sportId === this.state.lastSportId && categoryId === this.state.lastCategoryId) return;

            this.setState({ loadingTournaments: true });
            ContentArena.Api.getTournaments(sportId, categoryId).done(function (tournaments) {
                ContentArena.Data.Tournaments = tournaments;
                _this4.setState({
                    lastSportId: sportId,
                    loadingTournaments: false,
                    lastCategoryId: categoryId
                });
            });
        }
    }, {
        key: 'loadSeasons',
        value: function loadSeasons(tournaments) {
            var _this5 = this;

            var tournamentId = tournaments.length > 0 ? tournaments[0].externalId : null;

            if (tournamentId === this.state.lastTournamentId) return;

            this.setState({ loadingSeasons: true });
            ContentArena.Api.getSeasons(tournamentId).done(function (seasons) {
                ContentArena.Data.Seasons = seasons;
                _this5.setState({
                    lastTournamentId: tournamentId,
                    loadingSeasons: false,
                    seasons: seasons
                });
            });
        }
    }, {
        key: 'loadSchedule',
        value: function loadSchedule(nextProps) {

            var _this = this;

            nextProps.seasons.forEach(function (season) {
                if (!_this.state.schedules[season.externalId]) {
                    _this.setState({ loadingSchedule: true });
                    ContentArena.Api.getSchedule(season.externalId).done(function (schedules) {
                        _this.setState(function (prevState) {
                            var prevSchedules = prevState.schedules;
                            prevSchedules[season.externalId] = schedules;
                            return {
                                loadingSchedule: false,
                                schedules: prevSchedules
                            };
                        });
                    });
                }
            });
        }
    }, {
        key: 'getSchedules',
        value: function getSchedules(index) {

            if (!this.props.seasons || !this.props.seasons[index]) return false;

            return this.state.schedules[this.props.seasons[index].externalId];
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {

            var tournaments = void 0,
                seasons = void 0,
                sportCategories = void 0,
                website = void 0;

            tournaments = Array.isArray(nextProps.tournament) ? nextProps.tournament : [nextProps.tournament];
            seasons = Array.isArray(nextProps.seasons) ? nextProps.seasons : [nextProps.seasons];
            sportCategories = Array.isArray(nextProps.sportCategory) ? nextProps.sportCategory : [nextProps.sportCategory];
            website = Array.isArray(nextProps.website) ? nextProps.website : nextProps.website ? [nextProps.website] : [];

            if (nextProps.sports.length === 1) {
                this.loadCategories(nextProps.sports[0]);
                this.setState(function () {
                    return {
                        showSearch: false
                    };
                });
            }

            if (nextProps.sports.length === 0) {
                this.setState(function () {
                    return {
                        seasons: [],
                        schedules: []
                    };
                });
            }

            if (nextProps.sports.length === 1 || sportCategories.length === 1) this.loadTournaments(nextProps.sports[0], sportCategories[0]);

            if (tournaments.length === 1) if (!tournaments[0].custom) this.loadSeasons(tournaments);

            this.setState({
                sportCategories: sportCategories,
                tournaments: tournaments
            });

            if (sportCategories.length === 1) {
                this.setState({ sportCategoryExtended: sportCategories[0].extended });
            }

            if (seasons.length > 0) {
                this.setState(function () {
                    return {
                        seasonSelectors: [].concat(_toConsumableArray(Array(seasons.length).keys()))
                    };
                });
                this.loadSchedule(nextProps);
            }

            if (website && website.length > 0) {
                this.setState({ website: website });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            if (this.props.step !== 1) return null;

            var inputProps = {
                sports: [{ value: "", custom: false }],
                sportCategory: { value: "", custom: false },
                tournament: { value: "", custom: false },
                seasons: [{ value: "", custom: false }]
            };

            if (this.props.sports.length > 0) {
                inputProps.sports = [];
                this.props.sports.forEach(function (sport) {
                    inputProps.sports.push({
                        value: sport.name,
                        isCustom: sport.custom
                    });
                });
            }
            if (this.props.seasons.length > 0) {
                inputProps.seasons = [];
                this.props.seasons.forEach(function (season) {
                    inputProps.seasons.push({ value: season.name, isCustom: season.custom });
                });
            }
            if (this.state.sportCategories.length > 0) {
                inputProps.sportCategory = {
                    value: this.state.sportCategories[0].name,
                    isCustom: this.state.sportCategories[0].isCustom
                };
            }
            if (this.state.tournaments.length > 0) {
                inputProps.tournament = {
                    value: this.state.tournaments[0].name,
                    isCustom: this.state.tournaments[0].isCustom
                };
            }

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'step-content' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'step-title' },
                    this.state.title
                ),
                this.state.showSearch && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__main_components_SearchCompetition__["a" /* default */], { close: this.toggleSearch, select: this.selectTournament }),
                !this.state.showSearch && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'button',
                    { className: 'light-blue-button', onClick: this.toggleSearch },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-search' }),
                    ' Show search function'
                ),
                !this.state.showSearch && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    { className: 'step-content-container' },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'step-item-description' },
                        'Please select the sport(s) and competition(s) covered by your content listing:'
                    ),
                    this.state.sportSelectors.map(function (item, i, list) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_SellFormItems__["e" /* SportSelector */], {
                            key: i,
                            remove: function remove() {
                                return _this6.removeSport(i);
                            },
                            showAddNew: list.length > 1 && list.length === i + 1,
                            showClose: i > 0,
                            isCustom: inputProps.sports[i] ? inputProps.sports[i].isCustom : false,
                            addSportSelector: _this6.addSportSelector,
                            onClick: function onClick() {
                                _this6.props.openSportSelector(i, _this6.props.sports);
                            },
                            value: inputProps.sports[i] ? inputProps.sports[i].value : "" });
                    }),
                    this.state.sportSelectors.length === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'step-item-description', style: { marginTop: "-15px" } },
                        'Your content covers multiple sports? ',
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'button',
                            { className: "link-button", onClick: this.addSportSelector },
                            'Please click here'
                        )
                    ),
                    this.state.sportSelectors.length === 1 && !this.hasCustomCategory() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'base-input' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'label',
                            null,
                            'Country/Category'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                            type: 'text',
                            value: inputProps.sportCategory.value || "",
                            readOnly: true,
                            disabled: this.props.sports.length === 0 || this.state.loadingCategories,
                            onClick: function onClick() {
                                _this6.props.openCategorySelector(_this6.state.sportCategories);
                            },
                            placeholder: "Country/Category" }),
                        this.state.loadingCategories && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    this.state.sportSelectors.length === 1 && this.hasCustomCategory() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_SellFormItems__["b" /* NewCategory */], {
                        showClose: !this.forceCustomCategory(),
                        value: this.props.customCategory,
                        onBlur: function onBlur(e) {
                            return _this6.updateContentValue(e, "customCategory");
                        },
                        onClick: this.props.removeNewCategory
                    }),
                    this.state.sportSelectors.length === 1 && !this.hasCustomTournament() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'base-input' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'label',
                            null,
                            'Competition'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'text',
                            value: inputProps.tournament.value || "",
                            readOnly: true,
                            disabled: this.props.sports.length === 0 || this.state.loadingTournaments,
                            onClick: function onClick() {
                                _this6.props.openTournamentSelector(_this6.state.tournaments);
                            },
                            placeholder: "Tournament" }),
                        this.state.loadingTournaments && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    this.state.sportSelectors.length === 1 && this.hasCustomTournament() && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_SellFormItems__["c" /* NewTournament */], { showClose: !this.forceCustomTournament(),
                        value: this.props.customTournament,
                        onBlur: function onBlur(e) {
                            return _this6.updateContentValue(e, "customTournament");
                        },
                        onClick: this.props.removeNewTournament }),
                    this.state.sportSelectors.length === 1 && (this.state.seasons.length > 0 || this.forceCustomSeason()) && this.state.seasonSelectors.length > 0 && this.state.seasonSelectors.map(function (season, i) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__main_components_SeasonSelector__["a" /* default */], {
                            key: i,
                            season: season,
                            addSeason: _this6.addSeason,
                            removeSeason: function removeSeason() {
                                return _this6.removeSeason(i);
                            },
                            value: inputProps.seasons[i] ? inputProps.seasons[i].value : "",
                            schedules: _this6.getSchedules(i),
                            loading: _this6.state.loadingSeasons,
                            showClose: i > 0 || !_this6.forceCustomSeason() && _this6.hasCustomSeason(),
                            onBlur: function onBlur(e) {
                                return _this6.updateContentValue(e, "customSeason");
                            },
                            isCustom: inputProps.seasons[i] ? inputProps.seasons[i].isCustom || _this6.forceCustomSeason() : false,
                            showAddNew: _this6.state.seasonSelectors.length === i + 1,
                            openSelector: function openSelector() {
                                return _this6.props.openSeasonSelector(i, _this6.props.seasons);
                            } });
                    }),
                    (this.state.loadingSeasons || this.state.loadingSchedule) && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        null,
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_SellFormItems__["a" /* Description */], { value: this.props.description, onBlur: function onBlur(e) {
                            return _this6.updateContentValue(e, "description");
                        } }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        'div',
                        { className: 'base-input' },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            'label',
                            null,
                            'Website'
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_tagsinput___default.a, { inputProps: { placeholder: "Website" }, value: this.state.website, onChange: this.websitesUpdated })
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__main_components_FileSelector__["a" /* default */], { target: "brochure" })
                )
            );
        }
    }]);

    return SellFormStep1;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state.content;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        openSportSelector: function openSportSelector(index, selectedItems) {
            return dispatch({
                type: 'OPEN_SELECTOR',
                selectorItems: ContentArena.Data.FullSports,
                popularItems: ContentArena.Data.TopSports,
                selectorType: "sports",
                activeFilter: "popular",
                clean: ["tournament", "seasons", "sportCategory"],
                selectedItems: selectedItems,
                showNewSport: true,
                index: index
            });
        },
        openCategorySelector: function openCategorySelector(selectedItems) {
            return dispatch({
                type: 'OPEN_SELECTOR',
                selectorItems: ContentArena.Data.Categories,
                selectorType: "sportCategory",
                activeFilter: "ag",
                showAllCountries: true,
                showNewCategory: true,
                selectedItems: selectedItems,
                index: 0,
                clean: ["tournament", "seasons"]
            });
        },
        openTournamentSelector: function openTournamentSelector(selectedItems) {
            return dispatch({
                type: 'OPEN_SELECTOR',
                selectorItems: ContentArena.Data.Tournaments,
                selectorType: "tournament",
                activeFilter: "ag",
                index: 0,
                selectedItems: selectedItems,
                showNewTournament: true,
                clean: ["seasons"]
            });
        },
        openSeasonSelector: function openSeasonSelector(index, selectedItems) {
            return dispatch({
                type: 'OPEN_SELECTOR',
                selectorItems: ContentArena.Data.Seasons,
                selectorType: "seasons",
                multiple: true,
                index: index,
                showNewSeason: true,
                clean: [],
                selectedItems: selectedItems
            });
        },
        removeFromMultiple: function removeFromMultiple(index, selectorType) {
            return dispatch({
                type: 'REMOVE_FROM_MULTIPLE',
                selectorType: selectorType,
                index: index
            });
        },
        updateContentValue: function updateContentValue(key, value) {
            return dispatch({
                type: 'UPDATE_CONTENT_VALUE',
                key: key,
                value: value
            });
        },
        removeNewSport: function removeNewSport(index) {
            return dispatch({
                type: 'REMOVE_NEW',
                index: index,
                selectorType: "sports"
            });
        },
        removeNewTournament: function removeNewTournament(index) {
            return dispatch({
                type: 'REMOVE_NEW',
                index: index,
                selectorType: "tournament"
            });
        },
        removeNewCategory: function removeNewCategory(index) {
            return dispatch({
                type: 'REMOVE_NEW',
                index: index,
                selectorType: "sportCategory"
            });
        },
        removeNewSeason: function removeNewSeason(index) {
            return dispatch({
                type: 'REMOVE_NEW',
                index: index,
                selectorType: "seasons"
            });
        },
        selectTournament: function selectTournament(tournament) {
            return dispatch({ type: 'SELECT_TOURNAMENT', tournament: tournament });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(SellFormStep1));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep2.js":
/*!************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep2.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__containers_PackageSelector__ = __webpack_require__(/*! ../containers/PackageSelector */ "./src/AppBundle/Resources/public/javascript/sell/containers/PackageSelector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Right__ = __webpack_require__(/*! ../components/Right */ "./src/AppBundle/Resources/public/javascript/sell/components/Right.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_CurrencySelector__ = __webpack_require__(/*! ../components/CurrencySelector */ "./src/AppBundle/Resources/public/javascript/sell/components/CurrencySelector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_LicenseDateSelector__ = __webpack_require__(/*! ../components/LicenseDateSelector */ "./src/AppBundle/Resources/public/javascript/sell/components/LicenseDateSelector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_ProgramName__ = __webpack_require__(/*! ../components/ProgramName */ "./src/AppBundle/Resources/public/javascript/sell/components/ProgramName.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var SellFormStep2 = function (_React$Component) {
    _inherits(SellFormStep2, _React$Component);

    function SellFormStep2(props) {
        _classCallCheck(this, SellFormStep2);

        var _this2 = _possibleConstructorReturn(this, (SellFormStep2.__proto__ || Object.getPrototypeOf(SellFormStep2)).call(this, props));

        _this2.loadRights = function (rightsPackage, group) {
            var _this = _this2;
            ContentArena.Api.getRights(rightsPackage.map(function (p) {
                return p.id;
            }), group).done(function (rights) {
                _this.setState({ rights: rights });
            });
        };

        _this2.packagesConfirmed = function (packagesConfirmed) {
            _this2.setState({ packagesConfirmed: packagesConfirmed });
        };

        _this2.selectCurrency = function (currency) {
            _this2.props.updateContentValue('currency', currency);
        };

        _this2.selectLicenseDates = function (key, value) {
            _this2.props.updateContentValue(key, value);
        };

        _this2.addProgram = function (index) {
            _this2.props.updateProgram(index, { name: name }, "add");
        };

        _this2.saveProgram = function (index, name) {
            _this2.props.updateProgram(index, { name: name, saved: true }, "save");
        };

        _this2.editProgram = function (index, name) {
            _this2.props.updateProgram(index, { name: name, saved: false }, "save");
        };

        _this2.removeProgram = function (index) {
            _this2.props.updateProgram(index, null, "remove");
        };

        var packages = JSON.parse(_this2.props.packages);

        _this2.state = {
            title: "Step 2 - Configure Rights",
            packagesConfirmed: false,
            programsEnabled: false,
            rights: [],
            rightPackages: new Map(packages.map(function (i) {
                return [i.id, i];
            }))
        };
        return _this2;
    }

    _createClass(SellFormStep2, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            console.log("Step 2 - props", nextProps);
            var programsEnabled = false;

            if (nextProps.rightsPackage.length > 0 && this.state.rights.length === 0) {
                this.loadRights(nextProps.rightsPackage, "Main Information");
            }

            nextProps.rightsPackage.forEach(function (rightPackage) {
                if (rightPackage.shortLabel === "PR") programsEnabled = true;
            });

            this.setState({
                programsEnabled: programsEnabled
            });

            if (programsEnabled && nextProps.programs.length === 0) this.props.updateProgram(0, { name: "", saved: false }, "save");
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.props.step !== 2) return null;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "step-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__containers_PackageSelector__["a" /* default */], {
                    packages: this.props.packages,
                    packagesConfirmed: this.state.packagesConfirmed,
                    onConfirm: this.packagesConfirmed }),
                this.state.packagesConfirmed && this.state.rights.length === 0 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i", { className: "fa fa-cog fa-spin" }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "step-content-container" },
                    this.state.packagesConfirmed && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_CurrencySelector__["a" /* default */], { onClick: this.selectCurrency, selected: this.props.currency }),
                    this.state.packagesConfirmed && this.state.programsEnabled && this.props.programs.map(function (v, i, l) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_ProgramName__["a" /* default */], {
                            key: i,
                            index: i,
                            name: v.name,
                            showAdd: v.saved && i === l.length - 1,
                            showEdit: v.saved,
                            showSave: !v.saved,
                            showRemove: v.saved || i > 0,
                            onAdd: _this3.addProgram,
                            onEdit: _this3.editProgram,
                            onSave: _this3.saveProgram,
                            onRemove: _this3.removeProgram });
                    }),
                    this.state.packagesConfirmed && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_LicenseDateSelector__["a" /* default */], {
                        onUpdate: this.selectLicenseDates,
                        startDate: this.props.startDate,
                        endData: this.props.endDate
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    this.state.rights.length > 0 && this.state.rights.map(function (right) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_Right__["a" /* default */], {
                            key: right.id,
                            data: right,
                            programs: _this3.props.programs,
                            rightPackages: _this3.state.rightPackages });
                    })
                )
            );
        }
    }]);

    return SellFormStep2;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state.content;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        removeNewSport: function removeNewSport(index) {
            return dispatch({
                type: 'REMOVE_NEW',
                index: index,
                selectorType: "sports"
            });
        },
        updateContentValue: function updateContentValue(key, value) {
            return dispatch({
                type: 'UPDATE_CONTENT_VALUE',
                key: key,
                value: value
            });
        },
        updateProgram: function updateProgram(index, program, name) {
            return dispatch({
                type: 'UPDATE_PROGRAMS',
                index: index,
                program: program,
                name: name
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(SellFormStep2));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep3.js":
/*!************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/containers/SellFormStep3.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__containers_PackageSelector__ = __webpack_require__(/*! ../containers/PackageSelector */ "./src/AppBundle/Resources/public/javascript/sell/containers/PackageSelector.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Right__ = __webpack_require__(/*! ../components/Right */ "./src/AppBundle/Resources/public/javascript/sell/components/Right.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var SellFormStep3 = function (_React$Component) {
    _inherits(SellFormStep3, _React$Component);

    function SellFormStep3(props) {
        _classCallCheck(this, SellFormStep3);

        var _this2 = _possibleConstructorReturn(this, (SellFormStep3.__proto__ || Object.getPrototypeOf(SellFormStep3)).call(this, props));

        _this2.loadRights = function (rightsPackage, group) {
            var _this = _this2;
            ContentArena.Api.getRights(rightsPackage.map(function (p) {
                return p.id;
            }), group).done(function (rights) {
                _this.setState({ rights: rights });
            });
        };

        var packages = JSON.parse(_this2.props.packages);

        _this2.state = {
            title: "Step 3",
            packagesConfirmed: false,
            rights: [],
            rightPackages: new Map(packages.map(function (i) {
                return [i.id, i];
            }))
        };
        return _this2;
    }

    _createClass(SellFormStep3, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.rightsPackage.length > 0 && this.state.rights.length === 0 && nextProps.step === 3) {
                this.loadRights(nextProps.rightsPackage, "Production Standards");
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.props.step !== 3) return null;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "step-content" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    this.state.rights.length > 0 && this.state.rights.map(function (right) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_Right__["a" /* default */], {
                            key: right.id,
                            data: right,
                            programs: _this3.props.programs,
                            rightPackages: _this3.state.rightPackages });
                    })
                )
            );
        }
    }]);

    return SellFormStep3;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state.content;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        removeNewSport: function removeNewSport(index) {
            return dispatch({
                type: 'REMOVE_NEW',
                index: index,
                selectorType: "sports"
            });
        }
    };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(SellFormStep3));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/containers/SellFormSteps.js":
/*!************************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/containers/SellFormSteps.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var SellFormStep = function SellFormStep(_ref) {
    var step = _ref.step,
        active = _ref.active,
        title = _ref.title;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "step " + (active && "step-active") },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "step-label" },
            "Step ",
            step
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "step-title" },
            title
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "step-icon" })
    );
};

var SellFormSteps = function (_React$Component) {
    _inherits(SellFormSteps, _React$Component);

    function SellFormSteps(props) {
        _classCallCheck(this, SellFormSteps);

        var _this2 = _possibleConstructorReturn(this, (SellFormSteps.__proto__ || Object.getPrototypeOf(SellFormSteps)).call(this, props));

        _this2.state = {
            steps: [{ step: 1, title: "Event selection" }, { step: 2, title: "Configure rights" }, { step: 3, title: "Distribution style" }, { step: 4, title: "Price, payment and listing details" }, { step: 5, title: "Confirm" }]
        };
        return _this2;
    }

    _createClass(SellFormSteps, [{
        key: "render",
        value: function render() {
            var _this = this;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "box-header" },
                this.state.steps.map(function (step, i) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(SellFormStep, { key: i, step: step.step, title: step.title, active: _this.props.step === step.step });
                })
            );
        }
    }]);

    return SellFormSteps;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return {
        step: state.content.step
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {};
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(SellFormSteps));

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/reducers/content.js":
/*!****************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/reducers/content.js ***!
  \****************************************************************************/
/*! exports provided: contentType, content */
/*! exports used: content */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {/* unused harmony export contentType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return content; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selector__ = __webpack_require__(/*! ./selector */ "./src/AppBundle/Resources/public/javascript/sell/reducers/selector.js");
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



var contentType = {
    CONTENT_INIT: 'CONTENT_INIT',
    GO_TO_NEXT_STEP: 'GO_TO_NEXT_STEP',
    GO_TO_PREVIOUS_STEP: 'GO_TO_PREVIOUS_STEP',
    ADD_NEW: 'ADD_NEW',
    REMOVE_NEW: 'REMOVE_NEW',
    SUPER_RIGHTS_UPDATED: 'SUPER_RIGHTS_UPDATED',
    UPDATE_CONTENT_VALUE: 'UPDATE_CONTENT_VALUE',
    SELECT_TOURNAMENT: 'SELECT_TOURNAMENT',
    REMOVE_FROM_MULTIPLE: 'REMOVE_FROM_MULTIPLE',
    APPLY_SELECTION: 'APPLY_SELECTION',
    UPDATE_PROGRAMS: 'UPDATE_PROGRAMS'
};

var content = function content() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        step: 1,
        rightsPackage: [],
        tournament: [],
        sportCategory: [],
        sports: [],
        seasons: [],
        programs: []
    };
    var action = arguments[1];


    var newState = {};

    switch (action.type) {
        case contentType.CONTENT_INIT:
            return Object.assign({}, state, action.content);
        case contentType.GO_TO_NEXT_STEP:
            return Object.assign({}, state, {
                step: state.step + 1
            });
        case contentType.GO_TO_PREVIOUS_STEP:
            return Object.assign({}, state, {
                step: state.step - 1
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
        case contentType.SUPER_RIGHTS_UPDATED:

            if (action.reset) return Object.assign({}, state, { rightsPackage: [] });
            return Object.assign({}, state, {
                rightsPackage: Array.from(action.rightsPackage.values())
            });

        case contentType.UPDATE_PROGRAMS:

            var programs = [].concat(_toConsumableArray(state.programs));

            if (action.name === "remove") {

                if (programs.length > 1) {
                    programs.splice(action.index, 1);
                } else {
                    programs[0] = { name: '', saved: false };
                }
            }
            if (action.name === "add") programs = [].concat(_toConsumableArray(programs), [action.program]);
            if (action.name === "save") programs[action.index] = action.program;

            return Object.assign({}, state, {
                programs: programs
            });

        default:
            return state;
    }
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/reducers/index.js":
/*!**************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/reducers/index.js ***!
  \**************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content__ = __webpack_require__(/*! ./content */ "./src/AppBundle/Resources/public/javascript/sell/reducers/content.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selector__ = __webpack_require__(/*! ./selector */ "./src/AppBundle/Resources/public/javascript/sell/reducers/selector.js");
/**
 * React Native App
 * Made by Daniel Padilla
 */





var reducers = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  content: __WEBPACK_IMPORTED_MODULE_1__content__["a" /* content */],
  selector: __WEBPACK_IMPORTED_MODULE_2__selector__["a" /* selector */]
});

/* harmony default export */ __webpack_exports__["a"] = (reducers);

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

/***/ "./src/AppBundle/Resources/public/javascript/sell/sell.js":
/*!****************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/sell.js ***!
  \****************************************************************/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_SellForm__ = __webpack_require__(/*! ./components/SellForm */ "./src/AppBundle/Resources/public/javascript/sell/components/SellForm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(/*! ./store */ "./src/AppBundle/Resources/public/javascript/sell/store.js");
/**
 * Created by JuanCruz on 4/1/2018.
 */







var sellForm = document.getElementById('sell-form-container');

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"],
    { store: __WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */] },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_SellForm__["a" /* default */], sellForm.dataset)
), sellForm);

$(function () {

    window.ContentArena = window.ContentArena || {};
    ContentArena.Model = ContentArena.Model || {};
    ContentArena.Form = ContentArena.Form || {};
    ContentArena.Test = ContentArena.Test || {};

    $('#license-file-selector-hidden').checkFileType({
        allowedExtensions: ['pdf', 'doc', 'docx'],
        success: function success() {},
        error: function error() {
            $('<div />').html('File type not allowed. Please upload a .pdf, .doc or .docx file').dialog();
        }
    });

    $('#event-file-selector-hidden').checkFileType({
        allowedExtensions: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
        success: function success() {
            var targetId = "#" + $(this).attr("ref");
            $(targetId).val($(this).val());
        },
        error: function error() {
            var targetId = "#" + $(this).attr("ref");
            $(targetId).attr("placeholder", "Allowed: .png, .jpg, .pdf, .doc, .docx").val("");
            $(this).val("");
            $('<div />').html('File type not allowed').dialog();
        }
    });

    $(document).on('click', "#download-csv-sheet", function () {
        window.location = envhosturl + "bundles/app/data/content-details.csv";
    });

    $('.website').mask("A", {
        translation: {
            "A": { pattern: /[\w/\-.+]/, recursive: true }
        }
    });

    /**
     * Renders all the tooltips
     */
    $(document).tooltip();

    $(".has-datepicker").datepicker();

    $(".optional").hide();
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/sell.step2.js":
/*!**********************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/sell.step2.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    ContentArena.Test = ContentArena.Test || {};

    function validateSalesPackages() {

        var packages = [];

        $(".sales-package").each(function (k, packageContainer) {

            var salesPackage = new ContentArena.Model.SalesPackage();
            var id = $(packageContainer).attr("id").replace("sales-package-", "");

            salesPackage.territories = $(".territories:checked", packageContainer).attr("val");
            salesPackage.salesMethod = $(".sales-method:checked", packageContainer).attr("val");
            salesPackage.currency = $(".currency:checked", packageContainer).attr("val");
            salesPackage.id = id;
            salesPackage.name = $("#sales-package-" + id + "-name").val();
            salesPackage.fee = $(".fee:visible", packageContainer).val();
            salesPackage.territoryBids = $("#sales-package-" + id + "-territory-bids").is(":checked");
            salesPackage.territoryAsPackage = $("#sales-package-" + id + "-territories-as-package").is(":checked");

            if (salesPackage.territories === "selected") salesPackage.selectedTerritories = $("#sales-package-" + id + "-territory-selected").chosen().val();
            if (salesPackage.territories === "excluded") salesPackage.excludedTerritories = $("#sales-package-" + id + "-territory-excluded").chosen().val();

            packages.push(salesPackage);
        });

        return packages;
    }

    function validateStepTwo() {

        var hasErrors = false,
            messages = [],
            expirationDate = $("#expiration-date"),
            rights = collectSelectedRights(),
            messagesContainer = $('<div title="The form is incomplete!" />'),
            total = 0,
            selectedPackages = getFullSelectedPackages();

        $(".installment-percent").each(function () {
            total += Number($(this).val().replace("%", ""));
        });

        if (total !== 100) {
            hasErrors = true;
            messages.push($('<div class="popup-error-message" />').html('Total installments must sum 100%!'));
        } else {
            ContentArena.Content.installments = collectInstallments();
        }

        ContentArena.Content.salesPackages = validateSalesPackages();
        ContentArena.Content.salesPackages.forEach(function (salesPackage) {
            var valid = salesPackage.validate();

            if (valid.hasErrors) {
                hasErrors = true;
                messages.push($('<div class="popup-error-message" />').html(valid.description));
            }
        });
        ContentArena.Content.rights = rights;
        ContentArena.Content.packages = selectedPackages.selectedIds;

        if (expirationDate.val() === "") {
            hasErrors = true;
            messages.push($('<div class="popup-error-message" />').html('Please select an expiration date'));
        } else {
            ContentArena.Content.expiresAt = expirationDate.val();
        }

        if (hasErrors) {

            messages.forEach(function (content) {
                messagesContainer.append(content);
            });

            messagesContainer.dialog({
                minWidth: 400
            });
        }

        return !hasErrors;
    }

    function setupInstallment() {
        $(".installment-percent").off().mask('000%', { reverse: true });
    }

    function collectInstallments() {

        var installments = [];

        $(".installment").each(function (k, packageContainer) {

            var installment = {};

            installment.percent = $(".installment-percent", packageContainer).val().replace("%", "");
            installment.date = $(".installment-date", packageContainer).val();
            installment.signing_day = $(".installment-days", packageContainer).val();
            installment.granted_day = $(".granted-days").val();

            installments.push(installment);
        });

        return installments;
    }

    function submitform() {
        var url = envhosturl + 'sell/published',
            form = $('#myform');

        form.attr('action', url);

        var data = JSON.stringify(ContentArena.Content);

        $('<input type="hidden" name="json"/>').val(data).appendTo('#myform');
        window.onbeforeunload = function () {};
        form.submit();
    }

    $("#upload-agreement").on('click', function () {
        $('#license-file-selector-hidden').trigger("click");
    });

    $("#view-agreement").on('click', function () {

        validateStepTwo();
        $("#view-agreement").attr("disabled", "disabled").append('<i class="fa fa-cog fa-spin">');
        $.ajax({
            url: envhosturl + 'v1/contract/previews',
            type: 'POST',
            data: {
                json: JSON.stringify(ContentArena.Content)
            },
            success: function success(response) {
                ContentArena.Content.id = response.id;
                window.open(envhosturl + 'contract/preview?id=' + response.id, "_blank", 'height=600,width=800');
                $("#view-agreement").attr("disabled", null).find('i').remove();
            }
        });
    });

    $("#add-installment").on('click', function () {

        if ($(".installment:first input.installment-percent").val() == '100%') {
            $(".installment:first input.installment-percent").val('');
        }

        var pos = $(".installment").length + 1,
            item = $(".installment:last").clone();

        item.attr("id", "installment" + pos);
        item.find("span").html(ContentArena.Utils.addOrdinal(pos));
        item.find("input").val("");
        item.insertAfter(".installment:last");

        item.find("input.hasDatepicker").attr("id", null).removeClass("hasDatepicker").datepicker("destroy").off().datepicker();

        //setupInstallment()
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/sell/store.js":
/*!*****************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/sell/store.js ***!
  \*****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers_content__ = __webpack_require__(/*! ./reducers/content */ "./src/AppBundle/Resources/public/javascript/sell/reducers/content.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers__ = __webpack_require__(/*! ./reducers */ "./src/AppBundle/Resources/public/javascript/sell/reducers/index.js");
/**
 * Created by JuanCruz on 4/1/2018.
 */






/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_3__reducers__["a" /* default */]));

/***/ }),

/***/ 1:
/*!*************************************************************************************************************************************!*\
  !*** multi ./src/AppBundle/Resources/public/javascript/sell/sell.js ./src/AppBundle/Resources/public/javascript/sell/sell.step2.js ***!
  \*************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/sell/sell.js */"./src/AppBundle/Resources/public/javascript/sell/sell.js");
module.exports = __webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/sell/sell.step2.js */"./src/AppBundle/Resources/public/javascript/sell/sell.step2.js");


/***/ })

},[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvRmlsZVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9OZXdTZWFzb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL1NlYXJjaENvbXBldGl0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4vY29tcG9uZW50cy9TZWFzb25TZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL0N1cnJlbmN5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL0xpY2Vuc2VEYXRlU2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL01hdGNoLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9Qcm9ncmFtTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbXBvbmVudHMvUmlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL1JvdW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9TZWxsRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbXBvbmVudHMvU2VsbEZvcm1JdGVtcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvUGFja2FnZVNlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9TZWxsQnV0dG9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwMS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwMi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwMy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL2NvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL3NlbGVjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvc2VsbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3NlbGwuc3RlcDIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zdG9yZS5qcyJdLCJuYW1lcyI6WyJGaWxlSXRlbSIsIml0ZW0iLCJvbkNsaWNrIiwibmFtZSIsIkZpbGVTZWxlY3RvciIsInByb3BzIiwiaGFuZGxlVXBsb2FkRmlsZSIsImV2ZW50Iiwic3RhdGUiLCJmb3JtIiwiYXBwZW5kIiwidGFyZ2V0IiwiZmlsZXMiLCJzaXplIiwic2V0U3RhdGUiLCJnZXRJdGVtcyIsImxpc3QiLCJ2YWx1ZXMiLCJ2YWx1ZSIsInB1c2giLCJyZW1vdmUiLCJkZWxldGUiLCJGb3JtRGF0YSIsIiQiLCJ0cmlnZ2VyIiwibWFwIiwiaSIsIk5ld1NlYXNvbiIsImdldEVuZE9wdGlvbnMiLCJzdGFydERhdGUiLCJOdW1iZXIiLCJzZXRTdGFydERhdGUiLCJlIiwic3RhcnRZZWFyIiwieWVhcnMiLCJlbmREYXRlIiwib25CbHVyIiwic2hvd0Nsb3NlIiwib25SZW1vdmUiLCJ5ZWFyIiwiUmVhY3QiLCJDb21wb25lbnQiLCJTZWFyY2hDb21wZXRpdGlvbiIsInNlYXJjaCIsIl90aGlzIiwic2VhcmNoaW5nIiwiQ29udGVudEFyZW5hIiwiQXBpIiwic2VhcmNoQ29tcGV0aXRpb24iLCJpbnB1dCIsImRvbmUiLCJyZXN1bHRzIiwic2VhcmNoRG9uZSIsInJlc3VsdE1lc3NhZ2UiLCJnZXRSZXN1bHRNZXNzYWdlIiwiaGFuZGxlSW5wdXQiLCJwcmV2U3RhdGUiLCJ2YWxpZCIsImxlbmd0aCIsInBhZ2UiLCJ0b3RhbCIsInBhZ2VUb3RhbCIsInBhZ2VTaXplIiwicGFnZVF1YW50aXR5Iiwib25QYWdlQ2hhbmdlIiwic2VsZWN0IiwiSGVhZGVyIiwiYWNjZXNzb3IiLCJDZWxsIiwib3JpZ2luYWwiLCJkaXNwbGF5IiwiY2xvc2UiLCJOZXdGaXh0dXJlIiwib25BZGQiLCJzaG93QWRkIiwiU2Vhc29uU2VsZWN0b3IiLCJ0b2dnbGUiLCJzaG93U2NoZWR1bGUiLCJhZGRGaXh0dXJlIiwiZml4dHVyZXMiLCJyZW1vdmVGaXh0dXJlIiwic3BsaWNlIiwiekluZGV4IiwiaXNDdXN0b20iLCJsb2FkaW5nIiwib3BlblNlbGVjdG9yIiwicmVtb3ZlU2Vhc29uIiwic2NoZWR1bGVzIiwic2hvd0FkZE5ldyIsImFkZFNlYXNvbiIsImZpeHR1cmUiLCJjdXN0b21TdHlsZXMiLCJjb250ZW50IiwidG9wIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwibWFyZ2luUmlnaHQiLCJ0cmFuc2Zvcm0iLCJiYWNrZ3JvdW5kQ29sb3IiLCJib3JkZXIiLCJib3JkZXJSYWRpdXMiLCJib3JkZXJCb3R0b20iLCJvdmVybGF5IiwiTW9kYWwiLCJzZXRBcHBFbGVtZW50IiwiU2VsZWN0b3JJdGVtIiwibGFiZWwiLCJzZWxlY3RlZCIsImRpc2FibGVkIiwidW5kZWZpbmVkIiwiU2VsZWN0b3IiLCJjb21wb25lbnREaWRNb3VudCIsIm9wZW5Nb2RhbCIsImFmdGVyT3Blbk1vZGFsIiwiY2xvc2VNb2RhbCIsInVwZGF0ZWQiLCJmaWx0ZXJVcGRhdGVkIiwiY3VzdG9tQ291bnRyeSIsImNsb3NlU2VsZWN0b3IiLCJnZXRBY3RpdmVGaWx0ZXIiLCJhY3RpdmVGaWx0ZXIiLCJnZXRBY3RpdmVGaWx0ZXJOYW1lIiwiZmlsdGVyIiwic2hvdWxkU2hvd0ZpbHRlcnMiLCJzZWxlY3Rvckl0ZW1zIiwic2hvdWxkU2hvd0ludGVybmF0aW9uYWxGaWx0ZXIiLCJzaG93Iiwic29tZSIsIm1hdGNoIiwic2V0QWN0aXZlRmlsdGVyIiwiZmlsdGVyTmFtZSIsImFwcGx5U2VsZWN0aW9uIiwic2VsZWN0ZWRJdGVtcyIsInByZXZDb3VudHJpZXMiLCJmb3JFYWNoIiwiaGFzIiwiZXh0ZXJuYWxJZCIsImV4dGVuZGVkIiwic2VsZWN0b3JUeXBlIiwibXVsdGlwbGUiLCJpbmRleCIsImNsZWFuIiwiYWRkTmV3U3BvcnQiLCJhZGROZXdUb3VybmFtZW50IiwiYWRkTmV3U2Vhc29uIiwiYWRkTmV3Q2F0ZWdvcnkiLCJzZWxlY3RJdGVtIiwiY2xlYXIiLCJzZXQiLCJpc0l0ZW1TZWxlY3RlZCIsImlzSXRlbURpc2FibGVkIiwic2hvd0FsbENvdW50cmllcyIsIkRhdGEiLCJDb3VudHJpZXMiLCJNYXAiLCJmaWx0ZXJMZXR0ZXIiLCJpbmRleE9mIiwidG9Mb3dlckNhc2UiLCJmaWx0ZXJJbnRlcm5hdGlvbmFsIiwidHlwZSIsIm9wZW4iLCJzZWxlY3RvciIsInBvcHVsYXJJdGVtcyIsInN0b3JlIiwic3Vic2NyaWJlIiwiYSIsIm5leHRQcm9wcyIsInYiLCJrIiwic2hvd05ld1Nwb3J0Iiwic2hvd05ld1RvdXJuYW1lbnQiLCJzaG93TmV3U2Vhc29uIiwic2hvd05ld0NhdGVnb3J5IiwibWFwU3RhdGVUb1Byb3BzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwiZGlzcGF0Y2giLCJjb25uZWN0IiwiQ3VycmVuY3lJdGVtIiwiQ3VycmVuY3lTZWxlY3RvciIsInVwZGF0ZSIsImZsZXgiLCJMaWNlbnNlRGF0ZVNlbGVjdG9yIiwiaGFuZGxlU3RhcnREYXRlIiwiZGF0ZSIsIm9uVXBkYXRlIiwiaGFuZGxlRW5kRGF0ZSIsIk1hdGNoIiwic3RvcFByb3BhZ2F0aW9uIiwiY29tcGV0aXRvcnNMZW4iLCJjb21wZXRpdG9ycyIsIm9uU2VsZWN0IiwiY29tcGV0aXRvciIsIlByb2dyYW1OYW1lIiwiaGFuZGxlQ2hhbmdlIiwic2hvd0VkaXQiLCJzaG93U2F2ZSIsIm9uU2F2ZSIsIm9uRWRpdCIsInNob3dSZW1vdmUiLCJSaWdodEl0ZW0iLCJSaWdodCIsImFjdGl2ZVBhY2thZ2VzIiwiZGF0YSIsInBhY2thZ2VzIiwiaWQiLCJzZWxlY3Rpb24iLCJpdGVtcyIsInJpZ2h0UGFja2FnZXMiLCJhbGwiLCJjb25zb2xlIiwibG9nIiwiYWxsX2VuYWJsZWQiLCJBcnJheSIsImZyb20iLCJyaWdodFBhY2thZ2UiLCJzaG93UHJvZ3JhbUNvbHVtbnMiLCJwYWNrYWdlSXNBY3RpdmUiLCJzaG9ydExhYmVsIiwiZ2V0UHJvZ3JhbXNOYW1lIiwicHJvZ3JhbSIsInJpZ2h0SXRlbSIsImZvcm1fY29udGVudCIsInRvZ2dsZUFsbCIsImlzU2VsZWN0ZWQiLCJjYWxlbmRhciIsImdldCIsInNldERhdGUiLCJrZXkiLCJ1bnNlbGVjdCIsInByb2dyYW1zIiwic2F2ZWQiLCJSb3VuZCIsImNoZWNrZWQiLCJzZWxlY3RBbGwiLCJ0b2dnbGVNYXRjaGVzIiwic2hvd01hdGNoZXMiLCJtYXRjaGVzIiwiZ2V0U2VsZWN0ZWQiLCJtIiwicm91bmQiLCJzY2hlZHVsZSIsIndpZHRoIiwiaXNOYU4iLCJTZWxsRm9ybSIsImNvbnRlbnRMaXN0aW5nSW5pdCIsIkpTT04iLCJwYXJzZSIsIm93blByb3BzIiwiRGVzY3JpcHRpb24iLCJOZXdDYXRlZ29yeSIsIk5ld1RvdXJuYW1lbnQiLCJTY2hlZHVsZXMiLCJPYmplY3QiLCJrZXlzIiwibnVtYmVyIiwiU3BvcnRTZWxlY3RvciIsIm1hcmdpbkJvdHRvbSIsImFkZFNwb3J0U2VsZWN0b3IiLCJTdXBlclJpZ2h0Iiwib25DaGFuZ2UiLCJzdXBlclJpZ2h0IiwiUGFja2FnZVNlbGVjdG9yIiwidXBkYXRlU3VwZXJSaWdodHNMaXN0Iiwic3RhdHVzIiwicmlnaHRzUGFja2FnZSIsInJlc2V0U3VwZXJSaWdodHMiLCJyZXNldFN1cGVyUmlndGhzIiwib25Db25maXJtIiwiY29uZmlybVN1cGVyUmlnaHRzIiwic3VwZXJSaWdodHNVcGRhdGVkIiwicmVzZXQiLCJTZWxsQnV0dG9ucyIsInNhdmVBc0RyYWZ0Iiwic2F2aW5nIiwiQ29udGVudEFwaSIsInNhdmVDb250ZW50QXNEcmFmdCIsImdldFN0YXRlIiwicmVzcG9uc2UiLCJzYXZpbmdTdWNjZXNzIiwiZmFpbCIsIkRhdGUiLCJsYXN0U3RlcCIsInNhdmVBc0RyYWZ0VGV4dCIsInNwb3J0cyIsInN0ZXAiLCJnb1RvUHJldmlvdXNTdGVwIiwiZ29Ub05leHRTdGVwIiwiU2VsbEZvcm1TdGVwMSIsInVwZGF0ZUNvbnRlbnRWYWx1ZSIsImZvcmNlQ3VzdG9tVG91cm5hbWVudCIsImhhc0N1c3RvbVNwb3J0IiwiaGFzQ3VzdG9tQ2F0ZWdvcnkiLCJzcG9ydENhdGVnb3J5RXh0ZW5kZWQiLCJmb3JjZUN1c3RvbUNhdGVnb3J5IiwiZm9yY2VDdXN0b21TZWFzb24iLCJoYXNDdXN0b21Ub3VybmFtZW50Iiwic3BvcnQiLCJjdXN0b20iLCJzcG9ydENhdGVnb3JpZXMiLCJzcG9ydENhdGVnb3J5IiwidG91cm5hbWVudHMiLCJ0b3VybmFtZW50IiwiaGFzQ3VzdG9tU2Vhc29uIiwic2Vhc29ucyIsInNlYXNvbiIsInNlYXNvblNlbGVjdG9ycyIsInNwb3J0U2VsZWN0b3JzIiwicmVtb3ZlU3BvcnQiLCJyZW1vdmVOZXdTcG9ydCIsInJlbW92ZUZyb21NdWx0aXBsZSIsInJlbW92ZU5ld1NlYXNvbiIsInRvZ2dsZVNlYXJjaCIsInNob3dTZWFyY2giLCJ3ZWJzaXRlc1VwZGF0ZWQiLCJ3ZWJzaXRlIiwic2VsZWN0VG91cm5hbWVudCIsInRpdGxlIiwibGFzdFNwb3J0SWQiLCJsYXN0Q2F0ZWdvcnlJZCIsImxhc3RUb3VybmFtZW50SWQiLCJsb2FkaW5nQ2F0ZWdvcmllcyIsImxvYWRpbmdUb3VybmFtZW50cyIsImxvYWRpbmdTZWFzb25zIiwibG9hZGluZ1NjaGVkdWxlIiwiZ2V0U3BvcnRzIiwiRnVsbFNwb3J0cyIsImdldENvdW50cmllcyIsImNvdW50cmllcyIsInNwb3J0SWQiLCJnZXRDYXRlZ29yaWVzIiwiY2F0ZWdvcmllcyIsIkNhdGVnb3JpZXMiLCJjYXRlZ29yeSIsImNhdGVnb3J5SWQiLCJnZXRUb3VybmFtZW50cyIsIlRvdXJuYW1lbnRzIiwidG91cm5hbWVudElkIiwiZ2V0U2Vhc29ucyIsIlNlYXNvbnMiLCJnZXRTY2hlZHVsZSIsInByZXZTY2hlZHVsZXMiLCJpc0FycmF5IiwibG9hZENhdGVnb3JpZXMiLCJsb2FkVG91cm5hbWVudHMiLCJsb2FkU2Vhc29ucyIsImxvYWRTY2hlZHVsZSIsImlucHV0UHJvcHMiLCJvcGVuU3BvcnRTZWxlY3RvciIsIm1hcmdpblRvcCIsIm9wZW5DYXRlZ29yeVNlbGVjdG9yIiwiY3VzdG9tQ2F0ZWdvcnkiLCJyZW1vdmVOZXdDYXRlZ29yeSIsIm9wZW5Ub3VybmFtZW50U2VsZWN0b3IiLCJjdXN0b21Ub3VybmFtZW50IiwicmVtb3ZlTmV3VG91cm5hbWVudCIsImdldFNjaGVkdWxlcyIsIm9wZW5TZWFzb25TZWxlY3RvciIsImRlc2NyaXB0aW9uIiwicGxhY2Vob2xkZXIiLCJUb3BTcG9ydHMiLCJTZWxsRm9ybVN0ZXAyIiwibG9hZFJpZ2h0cyIsImdyb3VwIiwiZ2V0UmlnaHRzIiwicCIsInJpZ2h0cyIsInBhY2thZ2VzQ29uZmlybWVkIiwic2VsZWN0Q3VycmVuY3kiLCJjdXJyZW5jeSIsInNlbGVjdExpY2Vuc2VEYXRlcyIsImFkZFByb2dyYW0iLCJ1cGRhdGVQcm9ncmFtIiwic2F2ZVByb2dyYW0iLCJlZGl0UHJvZ3JhbSIsInJlbW92ZVByb2dyYW0iLCJwcm9ncmFtc0VuYWJsZWQiLCJsIiwiU2VsbEZvcm1TdGVwMyIsIlNlbGxGb3JtU3RlcCIsImFjdGl2ZSIsIlNlbGxGb3JtU3RlcHMiLCJzdGVwcyIsImNvbnRlbnRUeXBlIiwiQ09OVEVOVF9JTklUIiwiR09fVE9fTkVYVF9TVEVQIiwiR09fVE9fUFJFVklPVVNfU1RFUCIsIkFERF9ORVciLCJSRU1PVkVfTkVXIiwiU1VQRVJfUklHSFRTX1VQREFURUQiLCJVUERBVEVfQ09OVEVOVF9WQUxVRSIsIlNFTEVDVF9UT1VSTkFNRU5UIiwiUkVNT1ZFX0ZST01fTVVMVElQTEUiLCJBUFBMWV9TRUxFQ1RJT04iLCJVUERBVEVfUFJPR1JBTVMiLCJhY3Rpb24iLCJuZXdTdGF0ZSIsImFzc2lnbiIsInJlZHVjZXJzIiwiY29tYmluZVJlZHVjZXJzIiwiVEVTVCIsIk9QRU5fU0VMRUNUT1IiLCJDTE9TRV9TRUxFQ1RPUiIsInNlbGxGb3JtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZGF0YXNldCIsIndpbmRvdyIsIk1vZGVsIiwiRm9ybSIsIlRlc3QiLCJjaGVja0ZpbGVUeXBlIiwiYWxsb3dlZEV4dGVuc2lvbnMiLCJzdWNjZXNzIiwiZXJyb3IiLCJodG1sIiwiZGlhbG9nIiwidGFyZ2V0SWQiLCJhdHRyIiwidmFsIiwib24iLCJsb2NhdGlvbiIsImVudmhvc3R1cmwiLCJtYXNrIiwidHJhbnNsYXRpb24iLCJwYXR0ZXJuIiwicmVjdXJzaXZlIiwidG9vbHRpcCIsImRhdGVwaWNrZXIiLCJoaWRlIiwidmFsaWRhdGVTYWxlc1BhY2thZ2VzIiwiZWFjaCIsInBhY2thZ2VDb250YWluZXIiLCJzYWxlc1BhY2thZ2UiLCJTYWxlc1BhY2thZ2UiLCJyZXBsYWNlIiwidGVycml0b3JpZXMiLCJzYWxlc01ldGhvZCIsImZlZSIsInRlcnJpdG9yeUJpZHMiLCJpcyIsInRlcnJpdG9yeUFzUGFja2FnZSIsInNlbGVjdGVkVGVycml0b3JpZXMiLCJjaG9zZW4iLCJleGNsdWRlZFRlcnJpdG9yaWVzIiwidmFsaWRhdGVTdGVwVHdvIiwiaGFzRXJyb3JzIiwibWVzc2FnZXMiLCJleHBpcmF0aW9uRGF0ZSIsImNvbGxlY3RTZWxlY3RlZFJpZ2h0cyIsIm1lc3NhZ2VzQ29udGFpbmVyIiwic2VsZWN0ZWRQYWNrYWdlcyIsImdldEZ1bGxTZWxlY3RlZFBhY2thZ2VzIiwiQ29udGVudCIsImluc3RhbGxtZW50cyIsImNvbGxlY3RJbnN0YWxsbWVudHMiLCJzYWxlc1BhY2thZ2VzIiwidmFsaWRhdGUiLCJzZWxlY3RlZElkcyIsImV4cGlyZXNBdCIsIm1pbldpZHRoIiwic2V0dXBJbnN0YWxsbWVudCIsIm9mZiIsInJldmVyc2UiLCJpbnN0YWxsbWVudCIsInBlcmNlbnQiLCJzaWduaW5nX2RheSIsImdyYW50ZWRfZGF5Iiwic3VibWl0Zm9ybSIsInVybCIsInN0cmluZ2lmeSIsImFwcGVuZFRvIiwib25iZWZvcmV1bmxvYWQiLCJzdWJtaXQiLCJhamF4IiwianNvbiIsImZpbmQiLCJwb3MiLCJjbG9uZSIsIlV0aWxzIiwiYWRkT3JkaW5hbCIsImluc2VydEFmdGVyIiwicmVtb3ZlQ2xhc3MiLCJjcmVhdGVTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsSUFBTUEsV0FBVyxTQUFYQSxRQUFXO0FBQUEsUUFBRUMsSUFBRixRQUFFQSxJQUFGO0FBQUEsUUFBUUMsT0FBUixRQUFRQSxPQUFSO0FBQUEsV0FDYjtBQUFBO0FBQUE7QUFDS0QsYUFBS0UsSUFEVjtBQUFBO0FBQ2dCLDJFQUFHLFNBQVNELE9BQVosRUFBcUIsV0FBVSxhQUEvQjtBQURoQixLQURhO0FBQUEsQ0FBakI7O0lBTU1FLFk7OztBQUVGLDBCQUFhQyxLQUFiLEVBQW9CO0FBQUE7O0FBQUEsZ0lBQ1ZBLEtBRFU7O0FBQUEsY0FPcEJDLGdCQVBvQixHQU9ELFVBQUNDLEtBQUQsRUFBVztBQUMxQixrQkFBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCQyxNQUFoQixDQUF1QkgsTUFBTUksTUFBTixDQUFhQyxLQUFiLENBQW1CLENBQW5CLEVBQXNCQyxJQUE3QyxFQUFtRE4sTUFBTUksTUFBTixDQUFhQyxLQUFiLENBQW1CLENBQW5CLENBQW5EO0FBQ0Esa0JBQUtFLFFBQUwsQ0FBYztBQUNWTCxzQkFBTyxNQUFLRCxLQUFMLENBQVdDO0FBRFIsYUFBZDtBQUdBO0FBQ0E7OztBQUdILFNBaEJtQjs7QUFBQSxjQWtCcEJNLFFBbEJvQixHQWtCVCxZQUFN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QUFFQWxlLGFBQUs2ZCxJQUFMLENBQVUscUJBQVYsRUFDSzFELElBREwsQ0FDVSxJQURWLEVBQ2dCLElBRGhCLEVBRUtnRSxXQUZMLENBRWlCLGVBRmpCLEVBR0t0RCxVQUhMLENBR2dCLFNBSGhCLEVBRzJCa0MsR0FIM0IsR0FHaUNsQyxVQUhqQzs7QUFLQTtBQUVILEtBckJEO0FBdUJILENBM0tELEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5REFBZSwwREFBQXVELENBQVksMERBQVosQ0FBZixFIiwiZmlsZSI6InNlbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgRmlsZUl0ZW0gPSAoe2l0ZW0sIG9uQ2xpY2t9KSA9PiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIHtpdGVtLm5hbWV9IDxpIG9uQ2xpY2s9e29uQ2xpY2t9IGNsYXNzTmFtZT1cImZhIGZhLWNsb3NlXCI+PC9pPlxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5jbGFzcyBGaWxlU2VsZWN0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yIChwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBmb3JtIDogbmV3IEZvcm1EYXRhKClcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGhhbmRsZVVwbG9hZEZpbGUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICB0aGlzLnN0YXRlLmZvcm0uYXBwZW5kKGV2ZW50LnRhcmdldC5maWxlc1swXS5zaXplLCBldmVudC50YXJnZXQuZmlsZXNbMF0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBmb3JtIDogdGhpcy5zdGF0ZS5mb3JtXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyAnL2ZpbGVzJyBpcyB5b3VyIG5vZGUuanMgcm91dGUgdGhhdCB0cmlnZ2VycyBvdXIgbWlkZGxld2FyZVxyXG4gICAgICAgIC8qIGF4aW9zLnBvc3QoJy9maWxlcycsIGRhdGEpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7IC8vIGRvIHNvbWV0aGluZyB3aXRoIHRoZSByZXNwb25zZVxyXG4gICAgICAgICB9KTsqL1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRJdGVtcyA9ICgpID0+IHtcclxuICAgICAgICBsZXQgbGlzdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMuc3RhdGUuZm9ybS52YWx1ZXMoKSkge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goIHZhbHVlICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICByZW1vdmUgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc3RhdGUuZm9ybS5kZWxldGUobmFtZSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Zm9ybTp0aGlzLnN0YXRlLmZvcm19KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFzZS1pbnB1dFwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsPkZpbGVzPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RhbmRhcmQtYnV0dG9uXCIgb25DbGljaz17KCk9PnsgJChcIiNpbnB1dC1cIiArIHRoaXMucHJvcHMudGFyZ2V0KS50cmlnZ2VyKFwiY2xpY2tcIikgIH19PlVwbG9hZDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImlzLWhpZGRlblwiXHJcbiAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVVcGxvYWRGaWxlfVxyXG4gICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiLnBuZywuanBnLCAucGRmLCAuZG9jLCAuZG9jeFwiXHJcbiAgICAgICAgICAgICAgICAgICBpZD17XCJpbnB1dC1cIiArIHRoaXMucHJvcHMudGFyZ2V0fVxyXG4gICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIiAgbmFtZT17dGhpcy5wcm9wcy50YXJnZXQgKyBcIltdXCJ9IC8+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0SXRlbXMoKS5tYXAoKGl0ZW0sIGkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxGaWxlSXRlbSBrZXk9e2l9IGl0ZW09e2l0ZW19IG9uQ2xpY2s9eyAoKSA9PiB0aGlzLnJlbW92ZShpdGVtLnNpemUpfSAvPlxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmlsZVNlbGVjdG9yO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvRmlsZVNlbGVjdG9yLmpzIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmNsYXNzIE5ld1NlYXNvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcblxyXG4gICAgICAgIGxldCBzdGFydFllYXIgPSAxOTUwO1xyXG4gICAgICAgIGxldCB5ZWFycyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0wOyBpIDwgODE7aSsrICl7IHllYXJzLnB1c2goc3RhcnRZZWFyK2kpfVxyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzdGFydERhdGUgOiBudWxsLFxyXG4gICAgICAgICAgICBlbmREYXRlIDogbnVsbCxcclxuICAgICAgICAgICAgeWVhcnMgOiB5ZWFyc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRFbmRPcHRpb25zID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlLnN0YXJ0RGF0ZSApe1xyXG5cclxuICAgICAgICAgICAgdmFsdWUgPSBOdW1iZXIodGhpcy5zdGF0ZS5zdGFydERhdGUpKzE7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17dmFsdWV9Pnt2YWx1ZX08L29wdGlvbj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICg8b3B0aW9uPlllYXI8L29wdGlvbj4pXHJcbiAgICB9O1xyXG5cclxuICAgIHNldFN0YXJ0RGF0ZSA9IChlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHN0YXJ0RGF0ZSA6IGUudGFyZ2V0LnZhbHVlfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhc2UtaW5wdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U2Vhc29uPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibmV3LXNlYXNvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLnByb3BzLm9uQmx1cn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHNlYXNvbiBuYW1lXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zaG93Q2xvc2UgJiZcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJzdGFuZGFyZC1idXR0b25cIn0gb25DbGljaz17dGhpcy5wcm9wcy5vblJlbW92ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNsb3NlXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYXNlLWlucHV0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlYXNvbiB5ZWFyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXtcInNlYXNvbi1zZWxlY3Rvci1sYWJlbFwifT5Gcm9tPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IG9uQ2hhbmdlPXt0aGlzLnNldFN0YXJ0RGF0ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGRpc2FibGVkPlllYXI8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUueWVhcnMubWFwKCh5ZWFyLGkpPT4oPG9wdGlvbiBrZXk9e2l9IHZhbHVlPXt5ZWFyfT57eWVhcn08L29wdGlvbj4pKX1cclxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXtcInNlYXNvbi1zZWxlY3Rvci1sYWJlbFwifT4vVG88L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgZGlzYWJsZWQ9eyF0aGlzLnN0YXRlLnN0YXJ0RGF0ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmdldEVuZE9wdGlvbnMoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MH0+Tm90IGFwcGxpY2FibGU8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5ld1NlYXNvbjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL05ld1NlYXNvbi5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdFRhYmxlIGZyb20gJ3JlYWN0LXRhYmxlJztcclxuXHJcbmNsYXNzIFNlYXJjaENvbXBldGl0aW9uIGV4dGVuZHMgIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBwYWdlU2l6ZSA6MjAsXHJcbiAgICAgICAgICAgIGlucHV0OiBcIlwiLFxyXG4gICAgICAgICAgICB2YWxpZCA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWFyY2hpbmcgOiBmYWxzZSxcclxuICAgICAgICAgICAgc2VhcmNoRG9uZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICByZXN1bHRzOiBbXSxcclxuICAgICAgICAgICAgcmVzdWx0TWVzc2FnZSA6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoID0gKCkgPT57XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHNlYXJjaGluZyA6IHRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkFwaS5zZWFyY2hDb21wZXRpdGlvbih0aGlzLnN0YXRlLmlucHV0KS5kb25lKChyZXN1bHRzKT0+e1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzIDogcmVzdWx0cyxcclxuICAgICAgICAgICAgICAgIHNlYXJjaGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2VhcmNoRG9uZSA6IHRydWUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRNZXNzYWdlIDogX3RoaXMuZ2V0UmVzdWx0TWVzc2FnZSgwKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGhhbmRsZUlucHV0ID0gKGUpID0+e1xyXG5cclxuICAgICAgICBsZXQgaW5wdXQgPSBlLnRhcmdldC52YWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9Pih7XHJcbiAgICAgICAgICAgIHZhbGlkIDogaW5wdXQubGVuZ3RoID4gMixcclxuICAgICAgICAgICAgaW5wdXQgOiBpbnB1dCxcclxuICAgICAgICAgICAgc2VhcmNoRG9uZSA6ICggaW5wdXQubGVuZ3RoID4gMCApID8gcHJldlN0YXRlLnNlYXJjaERvbmUgOiBmYWxzZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0UmVzdWx0TWVzc2FnZSA9IChwYWdlKSA9PiB7XHJcbiAgICAgICAgcGFnZSsrO1xyXG4gICAgICAgIGxldCB0b3RhbCA9IHRoaXMuc3RhdGUucmVzdWx0cy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IHBhZ2VUb3RhbCA9IHRoaXMuc3RhdGUucGFnZVNpemUgKiBwYWdlO1xyXG4gICAgICAgIGxldCBwYWdlUXVhbnRpdHkgPSAocGFnZSA9PT0gMSkgPyAxIDogKHRoaXMuc3RhdGUucGFnZVNpemUgKiAocGFnZSAgLSAxKSkgKyAxO1xyXG5cclxuICAgICAgICBpZiAoIHBhZ2VUb3RhbCA+IHRvdGFsICkgcGFnZVRvdGFsID0gdG90YWw7XHJcblxyXG4gICAgICAgIHJldHVybiBwYWdlUXVhbnRpdHkgKyBcIi1cIitwYWdlVG90YWwrXCIgb2YgXCIrIHRvdGFsICtcIiByZXN1bHRzIGZvciAnXCIrdGhpcy5zdGF0ZS5pbnB1dCtcIidcIjtcclxuICAgIH07XHJcblxyXG4gICAgb25QYWdlQ2hhbmdlID0gKHBhZ2UpID0+IHtcclxuICAgICAgICBsZXQgcmVzdWx0TWVzc2FnZSA9IHRoaXMuZ2V0UmVzdWx0TWVzc2FnZShwYWdlKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+KHtcclxuICAgICAgICAgICAgcmVzdWx0TWVzc2FnZSA6IHJlc3VsdE1lc3NhZ2VcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRlbnQtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtaXRlbS1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIERvIHlvdSB3YW50IHRvIGxpc3QgY29tcGV0aXRpb24tYmFzZWQgY29udGVudD9cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiYmFzZS1pbnB1dFwifT5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+Q29tcGV0aXRpb248L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUlucHV0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGNvbXBldGl0aW9uIG5hbWUgKGUuZy4gQnVuZGVzbGlnYSlcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RhbmRhcmQtYnV0dG9uXCIgZGlzYWJsZWQ9eyF0aGlzLnN0YXRlLnZhbGlkIHx8IHRoaXMuc3RhdGUuc2VhcmNoaW5nfSBvbkNsaWNrPXt0aGlzLnNlYXJjaH0+U2VhcmNoPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zZWFyY2hpbmcgJiYgPGRpdj48aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz48L2Rpdj59XHJcblxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2VhcmNoRG9uZSAmJiB0aGlzLnN0YXRlLnJlc3VsdHMubGVuZ3RoID4gMCAmJiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnJlc3VsdE1lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcblxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUucmVzdWx0cy5sZW5ndGggPiAwICYmIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJlYWN0VGFibGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFBhZ2VTaXplPXt0aGlzLnN0YXRlLnBhZ2VTaXplfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93UGFnZVNpemVPcHRpb25zPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLm9uUGFnZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17dGhpcy5zdGF0ZS5yZXN1bHRzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q9e3RoaXMucHJvcHMuc2VsZWN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zPXtbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGVyOiAnQ29tcGV0aXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICduYW1lJyAvLyBTdHJpbmctYmFzZWQgdmFsdWUgYWNjZXNzb3JzIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdDb3VudHJ5L0NhdGVnb3J5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc29yOiAnc3BvcnRDYXRlZ29yeS5uYW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzb3I6ICdzcG9ydC5uYW1lJywgLy8gUmVxdWlyZWQgYmVjYXVzZSBvdXIgYWNjZXNzb3IgaXMgbm90IGEgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBIZWFkZXI6ICdTcG9ydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhlYWRlcjogJycsIC8vIEN1c3RvbSBoZWFkZXIgY29tcG9uZW50cyFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENlbGw6IHByb3BzID0+IDxidXR0b24gY2xhc3NOYW1lPXtcImJsdWUtYnV0dG9uXCJ9IG9uQ2xpY2s9eygpID0+eyB0aGlzLnByb3BzLnNlbGVjdChwcm9wcy5vcmlnaW5hbCkgfX0+U2VsZWN0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImlubGluZS1mbGV4XCIgfX0gPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNlYXJjaERvbmUgJiYgdGhpcy5zdGF0ZS5yZXN1bHRzLmxlbmd0aCA9PT0gMCAmJiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VyIHNlYXJjaCBcInt0aGlzLnN0YXRlLmlucHV0fVwiIGRpZCBub3QgbWF0Y2ggYW55IHByb2R1Y3RzLlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgeyF0aGlzLnN0YXRlLnNlYXJjaERvbmUgJiY8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtaXRlbS1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgRG8geW91IHdhbnQgdG8gbGlzdCBjb250ZW50LCB3aGljaCBpcyBub3QgcmVsYXRlZCB0byBhIHNwZWNpZmljIGNvbXBldGl0aW9uP1xyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2VhcmNoRG9uZSAmJiB0aGlzLnN0YXRlLnJlc3VsdHMubGVuZ3RoID4gMCAmJiA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtaXRlbS1kZXNjcmlwdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDYW4ndCBmaW5kIHlvdXIgY29tcGV0aXRpb24gaW4gb3VyIGxpc3Q/XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zZWFyY2hEb25lICYmIHRoaXMuc3RhdGUucmVzdWx0cy5sZW5ndGggPT09IDAgJiYgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWl0ZW0tZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgVHJ5IGFub3RoZXIgc2VhcmNoIG9yIGNyZWF0ZSBjb250ZW50IG1hbnVhbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJzdGFuZGFyZC1idXR0b24gc3RhbmRhcmQtYnV0dG9uLWJpZ1wifSBvbkNsaWNrPXt0aGlzLnByb3BzLmNsb3NlfT5DcmVhdGUgY29udGVudCBtYW51YWxseTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQ29tcGV0aXRpb247XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvU2VhcmNoQ29tcGV0aXRpb24uanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTmV3U2Vhc29uIGZyb20gJy4vTmV3U2Vhc29uJ1xyXG5pbXBvcnQgeyBTY2hlZHVsZXMgfSBmcm9tIFwiLi4vLi4vc2VsbC9jb21wb25lbnRzL1NlbGxGb3JtSXRlbXNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBOZXdGaXh0dXJlID0gKHtvblJlbW92ZSwgb25BZGQsIG9uQmx1ciwgdmFsdWUsIHNob3dBZGR9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJhc2UtaW5wdXRcIj5cclxuICAgICAgICA8bGFiZWw+Rml4dHVyZTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm5ldy1jYXRlZ29yeVwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBmaXh0dXJlXCJcclxuICAgICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dmFsdWV9Lz5cclxuICAgICAgICA8aSBvbkNsaWNrPXtvblJlbW92ZX0gY2xhc3NOYW1lPVwiZmEgZmEtY2xvc2VcIi8+XHJcbiAgICAgICAge3Nob3dBZGQgJiYgPGkgb25DbGljaz17b25BZGR9IGNsYXNzTmFtZT1cImZhIGZhLXBsdXNcIi8+fVxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5jbGFzcyBTZWFzb25TZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzaG93U2NoZWR1bGUgOiBmYWxzZSxcclxuICAgICAgICAgICAgZml4dHVyZXMgOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4gKHtcclxuICAgICAgICAgICAgc2hvd1NjaGVkdWxlOiAhcHJldlN0YXRlLnNob3dTY2hlZHVsZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgYWRkRml4dHVyZSA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpPT4oe1xyXG4gICAgICAgICAgICBmaXh0dXJlcyA6IFsuLi5wcmV2U3RhdGUuZml4dHVyZXMsMV1cclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbW92ZUZpeHR1cmUgPSAoaSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSk9PntcclxuICAgICAgICAgICAgcHJldlN0YXRlLmZpeHR1cmVzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZml4dHVyZXM6IHByZXZTdGF0ZS5maXh0dXJlc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t6SW5kZXg6IDF9fT5cclxuICAgICAgICAgICAgICAgIHshdGhpcy5wcm9wcy5pc0N1c3RvbSAmJlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYXNlLWlucHV0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNlYXNvbjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMudmFsdWUgfHwgXCJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmxvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub3BlblNlbGVjdG9yfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17XCJTZWFzb25cIn0vPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2hvd0Nsb3NlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLnJlbW92ZVNlYXNvbn0gY2xhc3NOYW1lPXtcInN0YW5kYXJkLWJ1dHRvblwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2xvc2VcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+IH1cclxuXHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuaXNDdXN0b21cclxuICAgICAgICAgICAgICAgICYmIDxOZXdTZWFzb24gc2hvd0Nsb3NlPXt0aGlzLnByb3BzLnNob3dDbG9zZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLnByb3BzLm9uQmx1cn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZW1vdmU9e3RoaXMucHJvcHMucmVtb3ZlU2Vhc29uIH0gLz59XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNjaGVkdWxlcyAmJiA8ZGl2IGNsYXNzTmFtZT17XCJiYXNlLWlucHV0XCJ9ICBzdHlsZT17e3pJbmRleDogMX19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5FdmVudDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9e1wiU2VsZWN0IGV2ZW50c1wifSBvbkNsaWNrPXt0aGlzLnRvZ2dsZX0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc2hvd1NjaGVkdWxlICYmIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPFNjaGVkdWxlcyBzY2hlZHVsZXM9e3RoaXMucHJvcHMuc2NoZWR1bGVzfS8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zaG93QWRkTmV3ICYmIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJsaW5rLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMuYWRkU2Vhc29ufT5BZGQgc2Vhc29uPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zaG93QWRkTmV3ICYmIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1pdGVtLWRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgRG8geW91IHdpc2ggdG8gYWRkIGZpeHR1cmVzIGluZGl2aWR1YWxseT9cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImxpbmstYnV0dG9uXCIgb25DbGljaz17dGhpcy5hZGRGaXh0dXJlfT5DbGljayBoZXJlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcblxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZml4dHVyZXMubGVuZ3RoID4gMCAmJiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5maXh0dXJlcy5tYXAoIChmaXh0dXJlLCBpLCBsaXN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE5ld0ZpeHR1cmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25BZGQ9e3RoaXMuYWRkRml4dHVyZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZT17KCkgPT4gdGhpcy5yZW1vdmVGaXh0dXJlKGkpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dBZGQ9e2kgPT09IGxpc3QubGVuZ3RoIC0gMX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWFzb25TZWxlY3RvcjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi9jb21wb25lbnRzL1NlYXNvblNlbGVjdG9yLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vLi4vc2VsbC9zdG9yZSc7XHJcbmltcG9ydCBNb2RhbCBmcm9tICdyZWFjdC1tb2RhbCc7XHJcblxyXG5jb25zdCBjdXN0b21TdHlsZXMgPSB7XHJcbiAgICBjb250ZW50IDoge1xyXG4gICAgICAgIHRvcCAgICAgICAgICAgICAgICAgICA6ICc1MCUnLFxyXG4gICAgICAgIGxlZnQgICAgICAgICAgICAgICAgICA6ICc1MCUnLFxyXG4gICAgICAgIHJpZ2h0ICAgICAgICAgICAgICAgICA6ICdhdXRvJyxcclxuICAgICAgICBib3R0b20gICAgICAgICAgICAgICAgOiAnYXV0bycsXHJcbiAgICAgICAgbWFyZ2luUmlnaHQgICAgICAgICAgIDogJy01MCUnLFxyXG4gICAgICAgIHRyYW5zZm9ybSAgICAgICAgICAgICA6ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvciAgICAgICA6ICcjRjRGNkY5JyxcclxuICAgICAgICBib3JkZXIgICAgICAgICAgICAgICAgOiAnbm9uZScsXHJcbiAgICAgICAgYm9yZGVyUmFkaXVzICAgICAgICAgIDogMCxcclxuICAgICAgICBib3JkZXJCb3R0b20gICAgICAgICAgOiAnNHB4IHNvbGlkICMyQUFBRUMnLFxyXG4gICAgfSxcclxuICAgIG92ZXJsYXkgOiB7XHJcbiAgICAgICAgekluZGV4ICAgICAgICAgICAgICAgIDogMTAwXHJcbiAgICB9XHJcbn07XHJcblxyXG5Nb2RhbC5zZXRBcHBFbGVtZW50KCcjc2VsbC1mb3JtLWNvbnRhaW5lcicpO1xyXG5cclxuY29uc3QgU2VsZWN0b3JJdGVtID0gKHtsYWJlbCwgc2VsZWN0ZWQsIG9uQ2xpY2ssIGRpc2FibGVkfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e1wic2VsZWN0b3ItaXRlbSBcIiArICgoc2VsZWN0ZWQpID9cInNlbGVjdG9yLWl0ZW0tc2VsZWN0ZWQgXCI6IFwiXCIpICsgKGRpc2FibGVkICYmIFwic2VsZWN0b3ItaXRlbS1kaXNhYmxlZFwiKSB9IG9uQ2xpY2s9eyghZGlzYWJsZWQpID8gb25DbGljayA6IHVuZGVmaW5lZH0+XHJcbiAgICAgICAge2xhYmVsfVxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5cclxuY2xhc3MgU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB1cGRhdGVkIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGZpbHRlclVwZGF0ZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgb3BlbiA6IHByb3BzLnNlbGVjdG9yLFxyXG4gICAgICAgICAgICBwcmV2Q291bnRyaWVzIDogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBjdXN0b21Db3VudHJ5IDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlbGVjdG9ySXRlbXMgOiBwcm9wcy5zZWxlY3Rvckl0ZW1zIHx8IFtdLFxyXG4gICAgICAgICAgICBwb3B1bGFySXRlbXMgOiBwcm9wcy5wb3B1bGFySXRlbXMgfHwgW10sXHJcbiAgICAgICAgICAgIGZpbHRlciA6IHtcclxuICAgICAgICAgICAgICAgIFwiYWdcIiA6IHsgdHlwZTogXCJmaXJzdExldHRlclwiLCB2YWx1ZXM6IFtcImFcIiwnYicsJ2MnLCdkJywnZScsJ2YnLCdnJ10gfSxcclxuICAgICAgICAgICAgICAgIFwiaG5cIiA6IHsgdHlwZTogXCJmaXJzdExldHRlclwiLCB2YWx1ZXM6IFtcImhcIiwnaScsJ2onLCdrJywnbCcsJ2snLCduJ10gfSxcclxuICAgICAgICAgICAgICAgIFwib3RcIiA6IHsgdHlwZTogXCJmaXJzdExldHRlclwiLCB2YWx1ZXM6IFtcIm9cIiwncCcsJ3EnLCdyJywncycsJ3QnXSB9LFxyXG4gICAgICAgICAgICAgICAgXCJ1elwiIDogeyB0eXBlOiBcImZpcnN0TGV0dGVyXCIsIHZhbHVlczogW1widVwiLCd2JywndycsJ3gnLCd5JywneiddIH0sXHJcbiAgICAgICAgICAgICAgICBcInBvcHVsYXJcIiA6IHsgdHlwZTogXCJvcmlnaW5cIiwgdmFsdWU6IFwicG9wdWxhckl0ZW1zXCJ9LFxyXG4gICAgICAgICAgICAgICAgXCJpbnRlcm5hdGlvbmFsXCIgOiB7IHR5cGU6IFwiaW50ZXJuYXRpb25hbFwiLCB2YWx1ZTogXCJpbnRlcm5hdGlvbmFsXCJ9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhY3RpdmVGaWx0ZXIgOiBwcm9wcy5hY3RpdmVGaWx0ZXIgfHwgXCJhZ1wiLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zIDogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBkaXNhYmxlZCA6IG5ldyBNYXAoKSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKGEpID0+IHtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+e1xyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XHJcblxyXG4gICAgICAgIGxldCBkaXNhYmxlZCA9IG5ldyBNYXAoKSwgc2VsZWN0ZWRJdGVtcyA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICAgICAgaWYgKCBuZXh0UHJvcHMuZGlzYWJsZWQgKSBkaXNhYmxlZCA9IG5leHRQcm9wcy5kaXNhYmxlZDtcclxuICAgICAgICBpZiAoIG5leHRQcm9wcy5zZWxlY3RlZEl0ZW1zICkge1xyXG4gICAgICAgICAgICBuZXh0UHJvcHMuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKHYsIGspIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMuc2V0KHYuZXh0ZXJuYWxJZCwgdik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGRpc2FibGVkIDogZGlzYWJsZWQsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgOiBzZWxlY3RlZEl0ZW1zLFxyXG4gICAgICAgICAgICBzZWxlY3Rvckl0ZW1zIDogbmV4dFByb3BzLnNlbGVjdG9ySXRlbXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuTW9kYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vcGVuU2VsZWN0b3IoKTtcclxuICAgIH07XHJcblxyXG4gICAgYWZ0ZXJPcGVuTW9kYWwgPSAoKSA9PiB7XHJcbiAgICB9O1xyXG5cclxuICAgIGNsb3NlTW9kYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVwZGF0ZWQ6IGZhbHNlLCBmaWx0ZXJVcGRhdGVkIDogZmFsc2UsIGN1c3RvbUNvdW50cnkgOmZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMucHJvcHMuY2xvc2VTZWxlY3RvcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRBY3RpdmVGaWx0ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGFjdGl2ZUZpbHRlciA9IHRoaXMuZ2V0QWN0aXZlRmlsdGVyTmFtZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmZpbHRlclthY3RpdmVGaWx0ZXJdO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRBY3RpdmVGaWx0ZXJOYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoIHRoaXMucHJvcHMuYWN0aXZlRmlsdGVyICYmICF0aGlzLnN0YXRlLmZpbHRlclVwZGF0ZWQgKSA/IHRoaXMucHJvcHMuYWN0aXZlRmlsdGVyIDogdGhpcy5zdGF0ZS5hY3RpdmVGaWx0ZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIHNob3VsZFNob3dGaWx0ZXJzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuc2VsZWN0b3JJdGVtcyAmJiB0aGlzLnN0YXRlLnNlbGVjdG9ySXRlbXMubGVuZ3RoID4gMzBcclxuICAgIH07XHJcblxyXG4gICAgc2hvdWxkU2hvd0ludGVybmF0aW9uYWxGaWx0ZXIgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBzaG93ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0b3JJdGVtcy5zb21lKCAoIGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgc2hvdyA9IGl0ZW0ubmFtZS5tYXRjaCgvaW50ZXJuYXRpb25hbC9naSkgIT09IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBzaG93O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc2hvdztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHNldEFjdGl2ZUZpbHRlciA9ICggZmlsdGVyTmFtZSApID0+e1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgYWN0aXZlRmlsdGVyOiBmaWx0ZXJOYW1lLGZpbHRlclVwZGF0ZWQgOiB0cnVlfSlcclxuICAgIH07XHJcblxyXG4gICAgYXBwbHlTZWxlY3Rpb24gPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBzZWxlY3RlZEl0ZW1zID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEl0ZW1zLFxyXG4gICAgICAgICAgICBwcmV2Q291bnRyaWVzID0gdGhpcy5zdGF0ZS5wcmV2Q291bnRyaWVzO1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMuc3RhdGUuY3VzdG9tQ291bnRyeSApe1xyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zLmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgICAgICBpZiAoIXByZXZDb3VudHJpZXMuaGFzKGl0ZW0uZXh0ZXJuYWxJZCkpIGl0ZW0uZXh0ZW5kZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1cGRhdGVkOiBmYWxzZSwgZmlsdGVyVXBkYXRlZCA6IGZhbHNlLCBjdXN0b21Db3VudHJ5IDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5hcHBseVNlbGVjdGlvbihcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RvclR5cGUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMubXVsdGlwbGUsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5kZXgsXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2xlYW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGROZXdTcG9ydCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1cGRhdGVkOiBmYWxzZSwgZmlsdGVyVXBkYXRlZCA6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMucHJvcHMuYWRkTmV3U3BvcnQoaW5kZXgsdGhpcy5wcm9wcy5jbGVhbik7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZVNlbGVjdG9yKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZE5ld1RvdXJuYW1lbnQgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXBkYXRlZDogZmFsc2UsIGZpbHRlclVwZGF0ZWQgOiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLmFkZE5ld1RvdXJuYW1lbnQoaW5kZXgsdGhpcy5wcm9wcy5jbGVhbik7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZVNlbGVjdG9yKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZE5ld1NlYXNvbiA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1cGRhdGVkOiBmYWxzZSwgZmlsdGVyVXBkYXRlZCA6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMucHJvcHMuYWRkTmV3U2Vhc29uKGluZGV4LHRoaXMucHJvcHMuY2xlYW4pO1xyXG4gICAgICAgIHRoaXMucHJvcHMuY2xvc2VTZWxlY3RvcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGROZXdDYXRlZ29yeSA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1cGRhdGVkOiBmYWxzZSwgZmlsdGVyVXBkYXRlZCA6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMucHJvcHMuYWRkTmV3Q2F0ZWdvcnkoaW5kZXgsdGhpcy5wcm9wcy5jbGVhbik7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5jbG9zZVNlbGVjdG9yKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGVjdEl0ZW0gPSAoIGl0ZW0gKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKCBwcmV2U3RhdGUuc2VsZWN0ZWRJdGVtcy5oYXMoaXRlbS5leHRlcm5hbElkKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIF90aGlzLnByb3BzLm11bHRpcGxlICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZTdGF0ZS5zZWxlY3RlZEl0ZW1zLmRlbGV0ZShpdGVtLmV4dGVybmFsSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoICAhX3RoaXMucHJvcHMubXVsdGlwbGUgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlN0YXRlLnNlbGVjdGVkSXRlbXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcmV2U3RhdGUuc2VsZWN0ZWRJdGVtcy5zZXQoaXRlbS5leHRlcm5hbElkLCBpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zIDogcHJldlN0YXRlLnNlbGVjdGVkSXRlbXMsXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgaXNJdGVtU2VsZWN0ZWQgPSAoIGl0ZW0gKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuc2VsZWN0ZWRJdGVtcy5oYXMoaXRlbS5leHRlcm5hbElkKTtcclxuICAgIH07XHJcblxyXG4gICAgaXNJdGVtRGlzYWJsZWQgPSAoIGl0ZW0gKSA9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmRpc2FibGVkLmhhcyhpdGVtLmV4dGVybmFsSWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzaG93QWxsQ291bnRyaWVzID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoICFDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMgfHwgQ29udGVudEFyZW5hLkRhdGEuQ291bnRyaWVzLmxlbmd0aCA9PT0wICkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+ICh7XHJcbiAgICAgICAgICAgIHByZXZDb3VudHJpZXMgOiBuZXcgTWFwKHByZXZTdGF0ZS5zZWxlY3Rvckl0ZW1zLm1hcChpPT5baS5leHRlcm5hbElkLCBpXSkpICxcclxuICAgICAgICAgICAgc2VsZWN0b3JJdGVtcyA6IENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcyxcclxuICAgICAgICAgICAgY3VzdG9tQ291bnRyeSA6IHRydWVcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmaWx0ZXJMZXR0ZXIgPSAoaXRlbSkgPT57XHJcbiAgICAgICAgbGV0IGZpbHRlciA9IHRoaXMuZ2V0QWN0aXZlRmlsdGVyKCk7XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlci52YWx1ZXMuaW5kZXhPZihpdGVtLm5hbWVbMF0udG9Mb3dlckNhc2UoKSkgIT09IC0xXHJcbiAgICB9O1xyXG5cclxuICAgIGZpbHRlckludGVybmF0aW9uYWwgPSAoaXRlbSkgPT57XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZS5tYXRjaCgvaW50ZXJuYXRpb25hbC9naSkgIT09IG51bGxcclxuICAgIH07XHJcblxyXG4gICAgZ2V0SXRlbXMgPSAoKSA9PntcclxuICAgICAgICBsZXQgZmlsdGVyID0gdGhpcy5nZXRBY3RpdmVGaWx0ZXIoKTtcclxuICAgICAgICBpZiAoIGZpbHRlci50eXBlID09PSBcIm9yaWdpblwiICkgcmV0dXJuIHRoaXMucHJvcHNbZmlsdGVyLnZhbHVlXTtcclxuXHJcbiAgICAgICAgaWYgKCBmaWx0ZXIudHlwZSA9PT0gXCJpbnRlcm5hdGlvbmFsXCIgKSByZXR1cm4gdGhpcy5zdGF0ZS5zZWxlY3Rvckl0ZW1zLmZpbHRlcih0aGlzLmZpbHRlckludGVybmF0aW9uYWwpO1xyXG5cclxuICAgICAgICBpZiAoIGZpbHRlci50eXBlID09PSBcImZpcnN0TGV0dGVyXCIpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICggIXRoaXMuc2hvdWxkU2hvd0ZpbHRlcnMoKSApIHJldHVybiB0aGlzLnN0YXRlLnNlbGVjdG9ySXRlbXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5zZWxlY3Rvckl0ZW1zLmZpbHRlcih0aGlzLmZpbHRlckxldHRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8TW9kYWxcclxuICAgICAgICAgICAgICAgIGlzT3Blbj17dGhpcy5wcm9wcy5vcGVufVxyXG4gICAgICAgICAgICAgICAgb25BZnRlck9wZW49e3RoaXMuYWZ0ZXJPcGVuTW9kYWx9XHJcbiAgICAgICAgICAgICAgICBvblJlcXVlc3RDbG9zZT17dGhpcy5jbG9zZU1vZGFsfVxyXG4gICAgICAgICAgICAgICAgYm9keU9wZW5DbGFzc05hbWU9e1wic2VsZWN0b3JcIn1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXtjdXN0b21TdHlsZXN9XHJcbiAgICAgICAgICAgICAgICBjb250ZW50TGFiZWw9XCJFeGFtcGxlIE1vZGFsXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgey8qPGgyIHJlZj17c3VidGl0bGUgPT4gdGhpcy5zdWJ0aXRsZSA9IHN1YnRpdGxlfT5IZWxsbzwvaDI+Ki99XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5wb3B1bGFySXRlbXMgJiZcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJzZWxlY3Rvci1maWx0ZXIgXCIgKyAodGhpcy5nZXRBY3RpdmVGaWx0ZXJOYW1lKCkgPT09IFwicG9wdWxhclwiICYmIFwic2VsZWN0b3ItZmlsdGVyLWFjdGl2ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwicG9wdWxhclwiKX19PlBvcHVsYXI8L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnNob3VsZFNob3dGaWx0ZXJzKCkgJiYgPGJ1dHRvbiBjbGFzc05hbWU9e1wic2VsZWN0b3ItZmlsdGVyIFwiICsgKHRoaXMuZ2V0QWN0aXZlRmlsdGVyTmFtZSgpID09PSBcImFnXCIgJiYgXCJzZWxlY3Rvci1maWx0ZXItYWN0aXZlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnsgdGhpcy5zZXRBY3RpdmVGaWx0ZXIoXCJhZ1wiKX19PkEtRzwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc2hvdWxkU2hvd0ZpbHRlcnMoKSAmJiA8YnV0dG9uIGNsYXNzTmFtZT17XCJzZWxlY3Rvci1maWx0ZXIgXCIgKyAodGhpcy5nZXRBY3RpdmVGaWx0ZXJOYW1lKCkgPT09IFwiaG5cIiAmJiBcInNlbGVjdG9yLWZpbHRlci1hY3RpdmVcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+eyB0aGlzLnNldEFjdGl2ZUZpbHRlcihcImhuXCIpfX0+SC1OPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zaG91bGRTaG93RmlsdGVycygpICYmIDxidXR0b24gY2xhc3NOYW1lPXtcInNlbGVjdG9yLWZpbHRlciBcIiArICh0aGlzLmdldEFjdGl2ZUZpbHRlck5hbWUoKSA9PT0gXCJvdFwiICYmIFwic2VsZWN0b3ItZmlsdGVyLWFjdGl2ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwib3RcIil9fT5PLVQ8L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnNob3VsZFNob3dGaWx0ZXJzKCkgJiYgPGJ1dHRvbiBjbGFzc05hbWU9e1wic2VsZWN0b3ItZmlsdGVyIFwiICsgKHRoaXMuZ2V0QWN0aXZlRmlsdGVyTmFtZSgpID09PSBcInV6XCIgJiYgXCJzZWxlY3Rvci1maWx0ZXItYWN0aXZlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnsgdGhpcy5zZXRBY3RpdmVGaWx0ZXIoXCJ1elwiKX19PlUtWjwvYnV0dG9uPn1cclxuICAgICAgICAgICAgICAgICAgICB7ICB0aGlzLnNob3VsZFNob3dJbnRlcm5hdGlvbmFsRmlsdGVyKCkgJiZcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17XCJzZWxlY3Rvci1maWx0ZXIgXCIgKyAodGhpcy5nZXRBY3RpdmVGaWx0ZXJOYW1lKCkgPT09IFwiaW50ZXJuYXRpb25hbFwiICYmIFwic2VsZWN0b3ItZmlsdGVyLWFjdGl2ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT57IHRoaXMuc2V0QWN0aXZlRmlsdGVyKFwiaW50ZXJuYXRpb25hbFwiKX19PkludGVybmF0aW9uYWw8L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0b3ItY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5nZXRJdGVtcygpLm1hcChmdW5jdGlvbihpdGVtLCBpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxTZWxlY3Rvckl0ZW0ga2V5PXtpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17aXRlbS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsgKCkgPT4gX3RoaXMuc2VsZWN0SXRlbShpdGVtKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9eyBfdGhpcy5pc0l0ZW1TZWxlY3RlZChpdGVtKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXsgX3RoaXMuaXNJdGVtRGlzYWJsZWQoaXRlbSkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPjtcclxuICAgICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImJ1dHRvbnNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wibGlnaHQtYmx1ZS1idXR0b25cIn0gc3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6IGN1c3RvbVN0eWxlcy5jb250ZW50LmJhY2tncm91bmRDb2xvcn19IG9uQ2xpY2s9e3RoaXMuY2xvc2VNb2RhbH0+Q2FuY2VsPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wic3RhbmRhcmQtYnV0dG9uXCJ9IG9uQ2xpY2s9e3RoaXMuYXBwbHlTZWxlY3Rpb259IGRpc2FibGVkPXshdGhpcy5zdGF0ZS51cGRhdGVkfT5BcHBseTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNob3dOZXdTcG9ydCAmJiA8ZGl2IGNsYXNzTmFtZT17XCJleHRyYXNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibWVzc2FnZVwifT5DYW4ndCBmaW5kIHlvdXIgc3BvcnQgaW4gdGhlIGxpc3Q/IDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImxpbmstYnV0dG9uXCJ9IG9uQ2xpY2s9eygpID0+IHsgdGhpcy5hZGROZXdTcG9ydCh0aGlzLnByb3BzLmluZGV4KSB9IH0gPkFkZCBuZXcgU3BvcnQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zaG93TmV3VG91cm5hbWVudCAmJiA8ZGl2IGNsYXNzTmFtZT17XCJleHRyYXNcIn0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wibWVzc2FnZVwifT5DYW4ndCBmaW5kIHlvdXIgY29tcGV0aXRpb24gaW4gdGhlIGxpc3Q/IDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImxpbmstYnV0dG9uXCJ9IG9uQ2xpY2s9eyAoKSA9PiB7IHRoaXMuYWRkTmV3VG91cm5hbWVudCh0aGlzLnByb3BzLmluZGV4ICkgfSB9ID5BZGQgbmV3IFRvdXJuYW1lbnQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zaG93TmV3U2Vhc29uICYmIDxkaXYgY2xhc3NOYW1lPXtcImV4dHJhc1wifT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJtZXNzYWdlXCJ9PkNhbid0IGZpbmQgeW91ciBzZWFzb24gaW4gdGhlIGxpc3Q/IDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImxpbmstYnV0dG9uXCJ9IG9uQ2xpY2s9eygpID0+IHsgdGhpcy5hZGROZXdTZWFzb24odGhpcy5wcm9wcy5pbmRleCkgfSB9ID5BZGQgbmV3IFNlYXNvbjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zaG93QWxsQ291bnRyaWVzJiYgPGRpdiBjbGFzc05hbWU9e1wiZXh0cmFzXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcIm1lc3NhZ2VcIn0+Q2FuJ3QgZmluZCB5b3VyIGNvdW50cnkgaW4gdGhlIGxpc3Q/IDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtcImxpbmstYnV0dG9uXCJ9IG9uQ2xpY2s9e3RoaXMuc2hvd0FsbENvdW50cmllcyB9ID5TaG93IGFsbCBjb3VudHJpZXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuXHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2hvd05ld0NhdGVnb3J5ICYmIDxkaXYgY2xhc3NOYW1lPXtcImV4dHJhc1wifT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJtZXNzYWdlXCJ9PkNhbid0IGZpbmQgeW91ciBjYXRlZ29yeSBpbiB0aGUgbGlzdD8gPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e1wibGluay1idXR0b25cIn0gb25DbGljaz17KCkgPT4geyB0aGlzLmFkZE5ld0NhdGVnb3J5KHRoaXMucHJvcHMuaW5kZXgpIH0gfSA+QWRkIG5ldyBDYXRlZ29yeTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgPC9Nb2RhbD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoIHN0YXRlICkgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlLnNlbGVjdG9yXHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9wZW5TZWxlY3RvciA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdPUEVOX1NFTEVDVE9SJ1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGNsb3NlU2VsZWN0b3IgOiAoKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnQ0xPU0VfU0VMRUNUT1InXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYXBwbHlTZWxlY3Rpb24gOiAoc2VsZWN0b3JUeXBlLCBzZWxlY3RlZEl0ZW1zLCBtdWx0aXBsZSwgaW5kZXgsIGNsZWFuKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnQVBQTFlfU0VMRUNUSU9OJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlIDogc2VsZWN0b3JUeXBlLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zIDogc2VsZWN0ZWRJdGVtcyxcclxuICAgICAgICAgICAgbXVsdGlwbGUgOiBtdWx0aXBsZSxcclxuICAgICAgICAgICAgaW5kZXggOiBpbmRleCxcclxuICAgICAgICAgICAgY2xlYW4gOiBjbGVhblxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFkZE5ld1Nwb3J0IDogKGluZGV4LGNsZWFuKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnQUREX05FVycsXHJcbiAgICAgICAgICAgIGluZGV4IDogaW5kZXgsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogXCJzcG9ydHNcIixcclxuICAgICAgICAgICAgY2xlYW4gOiBjbGVhblxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFkZE5ld0NhdGVnb3J5IDogKGluZGV4LCBjbGVhbikgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlIDogJ0FERF9ORVcnLFxyXG4gICAgICAgICAgICBpbmRleCA6IGluZGV4LFxyXG4gICAgICAgICAgICBzZWxlY3RvclR5cGU6IFwic3BvcnRDYXRlZ29yeVwiLFxyXG4gICAgICAgICAgICBjbGVhbiA6IGNsZWFuXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgYWRkTmV3VG91cm5hbWVudCA6IChpbmRleCwgY2xlYW4pID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdBRERfTkVXJyxcclxuICAgICAgICAgICAgaW5kZXggOiBpbmRleCxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcInRvdXJuYW1lbnRcIixcclxuICAgICAgICAgICAgY2xlYW4gOiBjbGVhblxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIGFkZE5ld1NlYXNvbiA6IChpbmRleCwgY2xlYW4pID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZTogJ0FERF9ORVcnLFxyXG4gICAgICAgICAgICBpbmRleCA6IGluZGV4LFxyXG4gICAgICAgICAgICBzZWxlY3RvclR5cGU6IFwic2Vhc29uc1wiLFxyXG4gICAgICAgICAgICBjbGVhbiA6IGNsZWFuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShTZWxlY3RvcilcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluL2NvbXBvbmVudHMvU2VsZWN0b3IuanMiLCJjb25zdCBDdXJyZW5jeUl0ZW0gPSAoe3NlbGVjdGVkLCBvbkNsaWNrLCBuYW1lfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e1wiY3VycmVuY3ktaXRlbVwifSBvbkNsaWNrPXtvbkNsaWNrfT5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJjdXJyZW5jeS1pY29uXCJ9PlxyXG4gICAgICAgICAgICB7c2VsZWN0ZWQgJiYgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hlY2stY2lyY2xlLW9cIi8+fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtuYW1lfVxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgQ3VycmVuY3lTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB1cGRhdGUgPSAoc2VsZWN0ZWQpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogc2VsZWN0ZWR9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wiYmFzZS1pbnB1dFwifT5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17e2ZsZXg6IDcgfX0+SW4gd2hpY2ggY3VycmVuY3kgd291bGQgeW91IGxpa2UgdG8gc2VsbCB5b3VyIGNvbnRlbnQ/PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxDdXJyZW5jeUl0ZW0gbmFtZT17XCJFVVJcIn0gb25DbGljaz17KCk9PnRoaXMucHJvcHMub25DbGljayhcIkVVUlwiKSB9IHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkID09PSBcIkVVUlwifS8+XHJcbiAgICAgICAgICAgICAgICA8Q3VycmVuY3lJdGVtIG5hbWU9e1wiVVNEXCJ9IG9uQ2xpY2s9eygpPT50aGlzLnByb3BzLm9uQ2xpY2soXCJVU0RcIikgfSBzZWxlY3RlZD17dGhpcy5wcm9wcy5zZWxlY3RlZCA9PT0gXCJVU0RcIn0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEN1cnJlbmN5U2VsZWN0b3I7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL0N1cnJlbmN5U2VsZWN0b3IuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tICdyZWFjdC1kYXRlcGlja2VyJztcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5cclxuY2xhc3MgTGljZW5zZURhdGVTZWxlY3RvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU3RhcnREYXRlID0gKGRhdGUpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc3RhcnREYXRlOiBkYXRlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMub25VcGRhdGUoXCJzdGFydERhdGVcIiwgZGF0ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGhhbmRsZUVuZERhdGUgPSAoZGF0ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBlbmREYXRlOiBkYXRlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblVwZGF0ZShcImVuZERhdGVcIiwgZGF0ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImxpY2Vuc2UtZGF0ZS1jb250YWluZXJcIn0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlLXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2x1bW4gcmlnaHQtbmFtZVwiPlN0YXJ0IG9mIGxpY2Vuc2UgcGVyaW9kPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sdW1uIHJpZ2h0LXBhY2thZ2VcIj5BbGw8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBib3JkZXJlZC1yb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCIgY29sdW1uIHJpZ2h0LWl0ZW0tY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgV2l0aCBjb250cmFjdCBjb25jbHVzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbiByaWdodC1pdGVtLXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2x1bW4gcmlnaHQtaXRlbS1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7PGkgY2xhc3NOYW1lPVwiZmEgZmEtY2hlY2stY2lyY2xlLW9cIiAvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBib3JkZXJlZC1yb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCIgY29sdW1uIHJpZ2h0LWl0ZW0tY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRnJvbSBzZWxlY3RlZCBkYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbiByaWdodC1pdGVtLXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERhdGVQaWNrZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiZGF0ZS1waWNrZXJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zdGFydERhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU3RhcnREYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyVGV4dD17XCJkZC9tbS95eXl5XCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGUtcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbiByaWdodC1uYW1lXCI+RW5kIG9mIGxpY2Vuc2UgcGVyaW9kPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sdW1uIHJpZ2h0LXBhY2thZ2VcIj5BbGw8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBib3JkZXJlZC1yb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCIgY29sdW1uIHJpZ2h0LWl0ZW0tY29udGVudFwiPlVudGlsIChYKSBkYXlzIGZyb20gY29udHJhY3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmNsdXNpb248L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2x1bW4gcmlnaHQtaXRlbS1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPXtcIm51bWJlclwifSBwbGFjZWhvbGRlcj17XCJFbnRlciBudW1iZXJcIn0vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBib3JkZXJlZC1yb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCIgY29sdW1uIHJpZ2h0LWl0ZW0tY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVW50aWwgc2VsZWN0ZWQgZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2x1bW4gcmlnaHQtaXRlbS1zZWxlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEYXRlUGlja2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcImRhdGUtcGlja2VyXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMuc3RhdGUuZW5kRGF0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVFbmREYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyVGV4dD17XCJkZC9tbS95eXl5XCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExpY2Vuc2VEYXRlU2VsZWN0b3I7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL0xpY2Vuc2VEYXRlU2VsZWN0b3IuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgTWF0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbWF0Y2ggOiBwcm9wcy5tYXRjaCxcclxuICAgICAgICAgICAgc2VsZWN0ZWQgOiBwcm9wcy5zZWxlY3RlZCB8fCBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZSA9IChlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiAoe1xyXG4gICAgICAgICAgICBzZWxlY3RlZDogIXByZXZTdGF0ZS5zZWxlY3RlZFxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblVwZGF0ZSghdGhpcy5zdGF0ZS5zZWxlY3RlZCk7XHJcblxyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGUgPSAoc2VsZWN0ZWQpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZDogc2VsZWN0ZWR9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3QgY29tcGV0aXRvcnNMZW4gPSB0aGlzLnByb3BzLm1hdGNoLmNvbXBldGl0b3JzLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJtYXRjaCBcIiB9IG9uQ2xpY2s9eygpID0+IHsgdGhpcy5wcm9wcy5vblNlbGVjdCh0aGlzLnByb3BzLm1hdGNoLmV4dGVybmFsSWQpIH0gfT5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLm1hdGNoLnNlbGVjdGVkICYmIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNpcmNsZVwiLz59XHJcbiAgICAgICAgICAgICAgICB7IXRoaXMucHJvcHMubWF0Y2guc2VsZWN0ZWQgJiYgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2lyY2xlLW9cIi8+fVxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMubWF0Y2guY29tcGV0aXRvcnMubWFwKCggY29tcGV0aXRvciwgaSk9PntcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtpfT57Y29tcGV0aXRvci5uYW1lfSB7KGNvbXBldGl0b3JzTGVuICE9PSBpICsgMSkgJiYgXCIgdnMgXCIgfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYXRjaDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbXBvbmVudHMvTWF0Y2guanMiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgUHJvZ3JhbU5hbWUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLm5hbWUgfHwgJydcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bmFtZTogZXZlbnQudGFyZ2V0LnZhbHVlfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bmFtZTogbmV4dFByb3BzLm5hbWV9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhc2UtaW5wdXRcIj5cclxuICAgICAgICAgICAgICAgIDxsYWJlbD5FbnRlciBwcm9ncmFtIG5hbWU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMuc2hvd0VkaXR9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUHJvZ3JhbSBuYW1lXCIvPlxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuc2hvd1NhdmUmJjxidXR0b24gY2xhc3NOYW1lPXtcInN0YW5kYXJkLWJ1dHRvblwifSBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLm9uU2F2ZSh0aGlzLnByb3BzLmluZGV4LCB0aGlzLnN0YXRlLm5hbWUpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgU2F2ZVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuc2hvd0VkaXQmJjxidXR0b24gY2xhc3NOYW1lPXtcInN0YW5kYXJkLWJ1dHRvblwifSBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLm9uRWRpdCh0aGlzLnByb3BzLmluZGV4LCB0aGlzLnN0YXRlLm5hbWUpIH0+XHJcbiAgICAgICAgICAgICAgICAgICAgRWRpdFxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuc2hvd1JlbW92ZSYmPGJ1dHRvbiBjbGFzc05hbWU9e1wic3RhbmRhcmQtYnV0dG9uXCJ9IG9uQ2xpY2s9eygpID0+IHRoaXMucHJvcHMub25SZW1vdmUodGhpcy5wcm9wcy5pbmRleCl9PlxyXG4gICAgICAgICAgICAgICAgICAgIFJlbW92ZVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuc2hvd0FkZCYmPGJ1dHRvbiBjbGFzc05hbWU9e1wic3RhbmRhcmQtYnV0dG9uXCJ9IG9uQ2xpY2s9e3RoaXMucHJvcHMub25BZGR9PlxyXG4gICAgICAgICAgICAgICAgICAgIEFkZFxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2dyYW1OYW1lO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbXBvbmVudHMvUHJvZ3JhbU5hbWUuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tICdyZWFjdC1kYXRlcGlja2VyJztcclxuXHJcbmNvbnN0IFJpZ2h0SXRlbSA9ICh7c2VsZWN0ZWQsIG9uQ2xpY2t9KSA9PiAoXHJcbiAgICA8ZGl2IG9uQ2xpY2s9e29uQ2xpY2t9IGNsYXNzTmFtZT1cImNvbHVtbiByaWdodC1pdGVtLXNlbGVjdGlvblwiPlxyXG4gICAgICAgIHtzZWxlY3RlZCAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGVjay1jaXJjbGUtb1wiIC8+fVxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5jbGFzcyBSaWdodCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgbGV0IGFjdGl2ZVBhY2thZ2VzID0gbmV3IE1hcChwcm9wcy5kYXRhLnBhY2thZ2VzLm1hcCgoaSkgPT4gW2kuaWQsIGldKSk7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IG5ldyBNYXAocHJvcHMuZGF0YS5pdGVtcy5tYXAoaSA9PiBbaS5pZCwgbmV3IE1hcCgpXSkpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICByaWdodFBhY2thZ2VzOiBwcm9wcy5yaWdodFBhY2thZ2VzIHx8IFtdLFxyXG4gICAgICAgICAgICBhY3RpdmVQYWNrYWdlcyA6IGFjdGl2ZVBhY2thZ2VzLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb24gOiBzZWxlY3Rpb24sXHJcbiAgICAgICAgICAgIGFsbCA6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJpZ2h0IC0gcHJvcHNcIixwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHJpZ2h0UGFja2FnZXM6IHByb3BzLnJpZ2h0UGFja2FnZXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVBbGwgPSAocmlnaHRJdGVtKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0aW9uLmdldChyaWdodEl0ZW0pLmhhcygwKSl7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbi5nZXQocmlnaHRJdGVtKS5jbGVhcigpO1xyXG4gICAgICAgIH0gIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZVBhY2thZ2VzLmZvckVhY2goKHJpZ2h0UGFja2FnZSk9PntcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5nZXQocmlnaHRJdGVtKS5zZXQocmlnaHRQYWNrYWdlLmlkLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBzZWxlY3Rpb24uZ2V0KHJpZ2h0SXRlbSkuc2V0KDAsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0aW9uOiBzZWxlY3Rpb259KTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZWN0ID0gKHJpZ2h0SXRlbSwgcmlnaHRQYWNrYWdlKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoICF0aGlzLnN0YXRlLmFjdGl2ZVBhY2thZ2VzLmhhcyhyaWdodFBhY2thZ2UpKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICggIXRoaXMucHJvcHMuZGF0YS5tdWx0aXBsZSApIHtcclxuXHJcbiAgICAgICAgICAgIHNlbGVjdGlvbi5mb3JFYWNoKChpdGVtLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgga2V5ICE9PSByaWdodEl0ZW0gKSBpdGVtLmNsZWFyKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZWN0aW9uLmdldChyaWdodEl0ZW0pLnNldChyaWdodFBhY2thZ2UsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGlvbn0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB1bnNlbGVjdCA9IChyaWdodEl0ZW0sIHJpZ2h0UGFja2FnZSkgPT57XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uO1xyXG4gICAgICAgIHNlbGVjdGlvbi5nZXQocmlnaHRJdGVtKS5kZWxldGUocmlnaHRQYWNrYWdlKTtcclxuICAgICAgICBzZWxlY3Rpb24uZ2V0KHJpZ2h0SXRlbSkuZGVsZXRlKDApO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGlvbjpzZWxlY3Rpb259KTtcclxuICAgIH07XHJcblxyXG4gICAgdG9nZ2xlID0gKHJpZ2h0SXRlbSwgcmlnaHRQYWNrYWdlKSA9PntcclxuICAgICAgICBsZXQgc2VsZWN0aW9uID0gdGhpcy5zdGF0ZS5zZWxlY3Rpb247XHJcbiAgICAgICAgaWYgKCBzZWxlY3Rpb24uZ2V0KHJpZ2h0SXRlbSkuaGFzKHJpZ2h0UGFja2FnZSkgKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5zZWxlY3QocmlnaHRJdGVtLHJpZ2h0UGFja2FnZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3QocmlnaHRJdGVtLHJpZ2h0UGFja2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpc1NlbGVjdGVkID0gKHJpZ2h0SXRlbSwgcmlnaHRQYWNrYWdlKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uO1xyXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb24uZ2V0KHJpZ2h0SXRlbSkuaGFzKHJpZ2h0UGFja2FnZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldFByb2dyYW1zTmFtZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5wcm9ncmFtcy5maWx0ZXIocHJvZ3JhbSA9Pihwcm9ncmFtLnNhdmVkKSkubWFwKHByb2dyYW0gPT4gKHByb2dyYW0ubmFtZSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzaG93UHJvZ3JhbUNvbHVtbnMgPSAocmlnaHRQYWNrYWdlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChyaWdodFBhY2thZ2Uuc2hvcnRMYWJlbCE9PVwiUFJcInx8ICggcmlnaHRQYWNrYWdlLnNob3J0TGFiZWw9PT1cIlBSXCIgJiYgdGhpcy5nZXRQcm9ncmFtc05hbWUoKS5sZW5ndGggPT09IDAgKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHBhY2thZ2VJc0FjdGl2ZSA9ICggaWQgKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYWN0aXZlUGFja2FnZXMuaGFzKCBpZCApO1xyXG4gICAgfTtcclxuXHJcbiAgICBzZXREYXRlID0gKGRhdGUsIHJpZ2h0SXRlbSwgcmlnaHRQYWNrYWdlKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGlvbiA9IHRoaXMuc3RhdGUuc2VsZWN0aW9uO1xyXG5cclxuICAgICAgICBpZiAoICF0aGlzLnN0YXRlLmFjdGl2ZVBhY2thZ2VzLmhhcyhyaWdodFBhY2thZ2UpKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHNlbGVjdGlvbi5nZXQocmlnaHRJdGVtKS5zZXQocmlnaHRQYWNrYWdlLCBkYXRlKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3Rpb259KTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGUtcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbiByaWdodC1uYW1lXCI+e3RoaXMucHJvcHMuZGF0YS5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7PGRpdiBjbGFzc05hbWU9eyggdGhpcy5wcm9wcy5kYXRhLmFsbF9lbmFibGVkKSA/IFwiY29sdW1uIHJpZ2h0LXBhY2thZ2VcIiA6IFwiY29sdW1uIHJpZ2h0LXBhY2thZ2UgZGlzYWJsZWRcIiB9PkFsbDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yaWdodFBhY2thZ2VzICYmIEFycmF5LmZyb20oIHRoaXMucHJvcHMucmlnaHRQYWNrYWdlcy52YWx1ZXMoKSApLm1hcCgocmlnaHRQYWNrYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd1Byb2dyYW1Db2x1bW5zKHJpZ2h0UGFja2FnZSkgJiYgPGRpdiBjbGFzc05hbWU9eyAodGhpcy5wYWNrYWdlSXNBY3RpdmUocmlnaHRQYWNrYWdlLmlkKSkgPyBcImNvbHVtbiByaWdodC1wYWNrYWdlXCIgOiBcImNvbHVtbiByaWdodC1wYWNrYWdlIGRpc2FibGVkXCJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmlnaHRQYWNrYWdlLnNob3J0TGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFByb2dyYW1zTmFtZSgpLm1hcCgocHJvZ3JhbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJjb2x1bW4gcmlnaHQtcGFja2FnZVwifT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb2dyYW19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kYXRhLml0ZW1zICYmIHRoaXMucHJvcHMuZGF0YS5pdGVtcy5tYXAoKHJpZ2h0SXRlbSwgaSAsIGxpc3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17ICggaSA8IGxpc3QubGVuZ3RoLTEgKSA/IFwicm93IGJvcmRlcmVkLXJvd1wiIDogXCJyb3dcIiB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiIGNvbHVtbiByaWdodC1pdGVtLWNvbnRlbnRcIj57cmlnaHRJdGVtLmZvcm1fY29udGVudH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbiByaWdodC1pdGVtLXNlbGVjdGlvblwiIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5wcm9wcy5kYXRhLmFsbF9lbmFibGVkICYmIHRoaXMudG9nZ2xlQWxsKHJpZ2h0SXRlbS5pZCkgfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLmlzU2VsZWN0ZWQocmlnaHRJdGVtLmlkLCAwKSAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jaGVjay1jaXJjbGUtb1wiIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yaWdodFBhY2thZ2VzICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20oIHRoaXMucHJvcHMucmlnaHRQYWNrYWdlcy52YWx1ZXMoKSApLm1hcCgocmlnaHRQYWNrYWdlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhdGhpcy5wYWNrYWdlSXNBY3RpdmUocmlnaHRQYWNrYWdlLmlkKSApIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbiByaWdodC1pdGVtLXNlbGVjdGlvblwiLz47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLnNob3dQcm9ncmFtQ29sdW1ucyhyaWdodFBhY2thZ2UpICYmIHJpZ2h0SXRlbS5jYWxlbmRhciApIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbiByaWdodC1pdGVtLXNlbGVjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEYXRlUGlja2VyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJkYXRlLXBpY2tlclwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zZWxlY3Rpb24uZ2V0KHJpZ2h0SXRlbS5pZCkuZ2V0KHJpZ2h0UGFja2FnZS5pZCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZGF0ZSkgPT4gdGhpcy5zZXREYXRlKGRhdGUsIHJpZ2h0SXRlbS5pZCwgcmlnaHRQYWNrYWdlLmlkKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJUZXh0PXtcImRkL21tL3l5eXlcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93UHJvZ3JhbUNvbHVtbnMocmlnaHRQYWNrYWdlKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSaWdodEl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3RoaXMuaXNTZWxlY3RlZChyaWdodEl0ZW0uaWQsIHJpZ2h0UGFja2FnZS5pZCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHt0aGlzLnRvZ2dsZShyaWdodEl0ZW0uaWQsIHJpZ2h0UGFja2FnZS5pZCkgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFByb2dyYW1zTmFtZSgpLm1hcCgocHJvZ3JhbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29sdW1uIHJpZ2h0LWl0ZW0tc2VsZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSaWdodDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbXBvbmVudHMvUmlnaHQuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTWF0Y2ggZnJvbSAnLi9NYXRjaCc7XHJcblxyXG5jbGFzcyBSb3VuZCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcm91bmQgOiBwcm9wcy5yb3VuZCxcclxuICAgICAgICAgICAgc2NoZWR1bGUgOiBwcm9wcy5zY2hlZHVsZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd01hdGNoZXMgOiBmYWxzZSxcclxuICAgICAgICAgICAgbWF0Y2hlcyA6IG5ldyBNYXAocHJvcHMuc2NoZWR1bGUubWFwKChpKSA9PiBbaS5leHRlcm5hbElkLCBpXSkpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlID0gKGUpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gZS50YXJnZXQuY2hlY2tlZDtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZH0pO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0QWxsKHNlbGVjdGVkKTtcclxuICAgIH07XHJcblxyXG4gICAgdG9nZ2xlTWF0Y2hlcyA9IChlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiAoe1xyXG4gICAgICAgICAgICBzaG93TWF0Y2hlczogIXByZXZTdGF0ZS5zaG93TWF0Y2hlc1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZWN0QWxsID0gKHNlbGVjdGVkKSA9PiB7XHJcblxyXG4gICAgICAgIGxldCBtYXRjaGVzID0gdGhpcy5zdGF0ZS5tYXRjaGVzO1xyXG4gICAgICAgIG1hdGNoZXMuZm9yRWFjaChtYXRjaCA9PiB7IG1hdGNoLnNlbGVjdGVkID0gc2VsZWN0ZWQgfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWF0Y2hlc30pO1xyXG5cclxuICAgICAgICBpZiAoIXNlbGVjdGVkKSB0aGlzLnNldFN0YXRlKHtzaG93TWF0Y2hlczogZmFsc2V9KTtcclxuICAgIH07XHJcblxyXG4gICAgb25TZWxlY3QgPSAoaWQpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IG1hdGNoZXMgPSB0aGlzLnN0YXRlLm1hdGNoZXM7XHJcbiAgICAgICAgbWF0Y2hlcy5nZXQoaWQpLnNlbGVjdGVkID0gIW1hdGNoZXMuZ2V0KGlkKS5zZWxlY3RlZDtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHttYXRjaGVzfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldFNlbGVjdGVkID0gKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSggdGhpcy5zdGF0ZS5tYXRjaGVzLnZhbHVlcygpICkuZmlsdGVyKG0gPT4obS5zZWxlY3RlZCkpLmxlbmd0aFxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJtYXRjaGRheVwifT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWJveC1jaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy50b2dnbGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtcInJvdW5kLVwiICsgdGhpcy5wcm9wcy5yb3VuZH0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtcInJvdW5kLVwiICsgdGhpcy5wcm9wcy5yb3VuZH0vPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcxMDAlJ319PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNOYU4odGhpcy5zdGF0ZS5yb3VuZCkgJiYgdGhpcy5zdGF0ZS5yb3VuZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyFpc05hTih0aGlzLnN0YXRlLnJvdW5kKSAmJiBcIk1hdGNoZGF5IFwiICsgdGhpcy5zdGF0ZS5yb3VuZH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgKHRoaXMuZ2V0U2VsZWN0ZWQoKSA9PT0gMCkgIHx8ICh0aGlzLmdldFNlbGVjdGVkKCk9PT0gdGhpcy5zdGF0ZS5zY2hlZHVsZS5sZW5ndGgpICYmIDxzcGFuIG9uQ2xpY2s9e3RoaXMudG9nZ2xlTWF0Y2hlc30+U2VsZWN0ID48L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7KHRoaXMuZ2V0U2VsZWN0ZWQoKSAhPT0gMCkgJiYgKCB0aGlzLmdldFNlbGVjdGVkKCkgIT09IHRoaXMuc3RhdGUuc2NoZWR1bGUubGVuZ3RoKSAmJiA8c3BhbiBvbkNsaWNrPXt0aGlzLnRvZ2dsZU1hdGNoZXN9Pnt0aGlzLmdldFNlbGVjdGVkKCl9IFNlbGVjdGVkID48L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zaG93TWF0Y2hlcyAmJiA8ZGl2IGNsYXNzTmFtZT17XCJtYXRjaC1ncm91cFwifT5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5tYXRjaGVzLnNpemUgPiAwICYmIEFycmF5LmZyb20gKCB0aGlzLnN0YXRlLm1hdGNoZXMudmFsdWVzKCkpLm1hcCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE1hdGNoIG1hdGNoPXtpdGVtfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5leHRlcm5hbElkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm91bmQ7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9Sb3VuZC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG5pbXBvcnQgU2VsbEJ1dHRvbnMgZnJvbSBcIi4uL2NvbnRhaW5lcnMvU2VsbEJ1dHRvbnNcIjtcclxuaW1wb3J0IFNlbGxGb3JtU3RlcHMgZnJvbSBcIi4uL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwc1wiO1xyXG5pbXBvcnQgU2VsbEZvcm1TdGVwMSBmcm9tIFwiLi4vY29udGFpbmVycy9TZWxsRm9ybVN0ZXAxXCI7XHJcbmltcG9ydCBTZWxsRm9ybVN0ZXAyIGZyb20gXCIuLi9jb250YWluZXJzL1NlbGxGb3JtU3RlcDJcIjtcclxuaW1wb3J0IFNlbGxGb3JtU3RlcDMgZnJvbSBcIi4uL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwM1wiO1xyXG5pbXBvcnQgU2VsZWN0b3IgZnJvbSBcIi4uLy4uL21haW4vY29tcG9uZW50cy9TZWxlY3RvclwiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCBzdG9yZSBmcm9tICcuLi9zdG9yZSc7XHJcblxyXG5cclxuY2xhc3MgU2VsbEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgY29udGVudCA6IEpTT04ucGFyc2UocHJvcHMuY29udGVudClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBzdG9yZS5zdWJzY3JpYmUoKGEpID0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzdG9yZS5nZXRTdGF0ZSgpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+e1xyXG4gICAgICAgIHRoaXMucHJvcHMuY29udGVudExpc3RpbmdJbml0KCB0aGlzLnN0YXRlLmNvbnRlbnQgKTtcclxuICAgIH0gO1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxTZWxlY3RvciBzdHlsZT17e3pJbmRleDogMTAwfX0vPlxyXG4gICAgICAgICAgICAgICAgPFNlbGxGb3JtU3RlcHMgLz5cclxuICAgICAgICAgICAgICAgIDxTZWxsRm9ybVN0ZXAxLz5cclxuICAgICAgICAgICAgICAgIDxTZWxsRm9ybVN0ZXAyIHBhY2thZ2VzPXt0aGlzLnByb3BzLnBhY2thZ2VzfSAvPlxyXG4gICAgICAgICAgICAgICAgPFNlbGxGb3JtU3RlcDMgcGFja2FnZXM9e3RoaXMucHJvcHMucGFja2FnZXN9IC8+XHJcbiAgICAgICAgICAgICAgICA8U2VsbEJ1dHRvbnMgLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCBzdGF0ZSwgb3duUHJvcHMpID0+IHtcclxuICAgIHJldHVybiBvd25Qcm9wcztcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29udGVudExpc3RpbmdJbml0IDogKGNvbnRlbnQpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdDT05URU5UX0lOSVQnLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50XHJcbiAgICAgICAgfSksXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoU2VsbEZvcm0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb21wb25lbnRzL1NlbGxGb3JtLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJvdW5kIGZyb20gJy4uL2NvbXBvbmVudHMvUm91bmQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IERlc2NyaXB0aW9uID0gKHt2YWx1ZSwgb25CbHVyfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0YXJlYS1pbnB1dFwiPlxyXG4gICAgICAgIDxsYWJlbD5FbnRlciBhIGRlc2NyaXB0aW9uPC9sYWJlbD5cclxuICAgICAgICA8dGV4dGFyZWEgb25CbHVyPXtvbkJsdXJ9IGRlZmF1bHRWYWx1ZT17dmFsdWV9IHBsYWNlaG9sZGVyPXtcIlByb3ZpZGUgYSBzaG9ydCBkZXNjcmlwdGlvbiBvZiB5b3VyIGNvbnRlbnQgbGlzdGluZ1wifS8+XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBOZXdDYXRlZ29yeSA9ICh7b25DbGljaywgc2hvd0Nsb3NlLCBvbkJsdXIsIHZhbHVlfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiYXNlLWlucHV0XCI+XHJcbiAgICAgICAgPGxhYmVsPkNhdGVnb3J5PC9sYWJlbD5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibmV3LWNhdGVnb3J5XCJcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIGNhdGVnb3J5XCJcclxuICAgICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XHJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17dmFsdWV9Lz5cclxuICAgICAgICB7IHNob3dDbG9zZSAmJiA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2t9IGNsYXNzTmFtZT17XCJzdGFuZGFyZC1idXR0b25cIn0+PGkgY2xhc3NOYW1lPVwiZmEgZmEtY2xvc2VcIi8+PC9idXR0b24+fVxyXG4gICAgPC9kaXY+XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgTmV3VG91cm5hbWVudCA9ICh7b25DbGljaywgc2hvd0Nsb3NlLCBvbkJsdXIsIHZhbHVlfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiYXNlLWlucHV0XCI+XHJcbiAgICAgICAgPGxhYmVsPkNvbXBldGl0aW9uPC9sYWJlbD5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibmV3LWNhdGVnb3J5XCJcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBvbkJsdXI9e29uQmx1cn1cclxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBjb21wZXRpdGlvbiBuYW1lXCIvPlxyXG4gICAgICAgIHsgc2hvd0Nsb3NlICYmIDxidXR0b24gb25DbGljaz17b25DbGlja30gY2xhc3NOYW1lPXtcInN0YW5kYXJkLWJ1dHRvblwifT48aSBjbGFzc05hbWU9XCJmYSBmYS1jbG9zZVwiLz48L2J1dHRvbj59XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBTY2hlZHVsZXMgPSAoe3NjaGVkdWxlc30pID0+IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2NoZWR1bGVcIj5cclxuICAgICAgICB7IHNjaGVkdWxlcyAmJiBPYmplY3Qua2V5cyhzY2hlZHVsZXMpLm1hcCgoIG51bWJlciwgaSApID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIDxSb3VuZCBrZXk9e2l9IHJvdW5kPXtudW1iZXJ9IHNjaGVkdWxlPXtzY2hlZHVsZXNbbnVtYmVyXX0gLz5cclxuICAgICAgICB9KSB9XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTcG9ydFNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiYXNlLWlucHV0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNwb3J0PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICF0aGlzLnByb3BzLmlzQ3VzdG9tICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy52YWx1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5vbkNsaWNrfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1wiU3BvcnRcIn0gIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaXNDdXN0b20gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuZXctc3BvcnRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBzcG9ydFwiLz5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHsgKCB0aGlzLnByb3BzLmlzQ3VzdG9tIHx8IHRoaXMucHJvcHMuc2hvd0Nsb3NlICkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJzdGFuZGFyZC1idXR0b25cIiBvbkNsaWNrPXt0aGlzLnByb3BzLnJlbW92ZX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jbG9zZVwiLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zaG93QWRkTmV3ICYmXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7bWFyZ2luQm90dG9tOiBcIjI1cHhcIn19IGNsYXNzTmFtZT17XCJsaW5rLWJ1dHRvblwifSBvbkNsaWNrPXt0aGlzLnByb3BzLmFkZFNwb3J0U2VsZWN0b3J9PkFkZCBzcG9ydDwvYnV0dG9uPiB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29tcG9uZW50cy9TZWxsRm9ybUl0ZW1zLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5cclxuXHJcbmNsYXNzIFN1cGVyUmlnaHQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NoZWNrZWQ6bmV4dFByb3BzLmNoZWNrZWR9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdC1ib3gtaXRlbVwiID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0LWJveC1jaGVja2JveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q2hlY2tlZD17dGhpcy5wcm9wcy5jaGVja2VkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLmNoZWNrZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsgKGUpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hlY2tlZDogZS50YXJnZXQuY2hlY2tlZH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLnByb3BzLnN1cGVyUmlnaHQsIGUudGFyZ2V0LmNoZWNrZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17XCJzdXBlci1yaWdodC1cIiArIHRoaXMucHJvcHMuc3VwZXJSaWdodC5pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicGFja2FnZS1zZWxlY3RvclwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e1wic3VwZXItcmlnaHQtXCIgKyB0aGlzLnByb3BzLnN1cGVyUmlnaHQuaWR9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3QtYm94LWl0ZW0tbGFiZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3VwZXJSaWdodC5uYW1lIH0gKHsgdGhpcy5wcm9wcy5zdXBlclJpZ2h0LnNob3J0TGFiZWwgfSlcclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBQYWNrYWdlU2VsZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcGFja2FnZXMgOiBKU09OLnBhcnNlKHByb3BzLnBhY2thZ2VzKSxcclxuICAgICAgICAgICAgcmlnaHRzUGFja2FnZSA6IG5ldyBNYXAocHJvcHMucmlnaHRzUGFja2FnZS5tYXAoKGkpID0+IFtpLmlkLCBpXSkpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtyaWdodHNQYWNrYWdlIDogbmV3IE1hcChuZXh0UHJvcHMucmlnaHRzUGFja2FnZS5tYXAoKGkpID0+IFtpLmlkLCBpXSkpfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU3VwZXJSaWdodHNMaXN0ID0gKHN1cGVyUmlnaHQsIHN0YXR1cykgPT4ge1xyXG4gICAgICAgIGlmIChzdGF0dXMgJiYgIXRoaXMuc3RhdGUucmlnaHRzUGFja2FnZS5oYXMoc3VwZXJSaWdodC5pZCkpIHRoaXMuc3RhdGUucmlnaHRzUGFja2FnZS5zZXQoc3VwZXJSaWdodC5pZCwgc3VwZXJSaWdodCk7XHJcbiAgICAgICAgaWYgKCFzdGF0dXMgJiYgdGhpcy5zdGF0ZS5yaWdodHNQYWNrYWdlLmhhcyhzdXBlclJpZ2h0LmlkKSkgdGhpcy5zdGF0ZS5yaWdodHNQYWNrYWdlLmRlbGV0ZShzdXBlclJpZ2h0LmlkKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVzZXRTdXBlclJpZ2h0cyA9ICgpID0+e1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtwYWNrYWdlczogdGhpcy5zdGF0ZS5wYWNrYWdlc30pO1xyXG4gICAgICAgIHRoaXMucHJvcHMucmVzZXRTdXBlclJpZ3RocygpO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25Db25maXJtKGZhbHNlKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uZmlybVN1cGVyUmlnaHRzID0gKCkgPT57XHJcbiAgICAgICAgdGhpcy5wcm9wcy5zdXBlclJpZ2h0c1VwZGF0ZWQodGhpcy5zdGF0ZS5yaWdodHNQYWNrYWdlKTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ29uZmlybSh0cnVlKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWNrYWdlLXNlbGVjdG9yXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhY2thZ2Utc2VsZWN0b3ItdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICBQaWNrIHJpZ2h0c1xyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhY2thZ2Utc2VsZWN0b3ItY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWNrYWdlLXNlbGVjdG9yLWNvbnRlbnRcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5wYWNrYWdlcy5tYXAoZnVuY3Rpb24oc3VwZXJSaWdodCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFN1cGVyUmlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3N1cGVyUmlnaHQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwZXJSaWdodD17c3VwZXJSaWdodH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17X3RoaXMudXBkYXRlU3VwZXJSaWdodHNMaXN0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9eyBfdGhpcy5zdGF0ZS5yaWdodHNQYWNrYWdlLmhhcyhzdXBlclJpZ2h0LmlkKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWNrYWdlLXNlbGVjdG9yLWJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUucmlnaHRzUGFja2FnZS5zaXplID09PSAwICYmPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNvbmZpcm1TdXBlclJpZ2h0c30+Q29uZmlybSA8L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnJpZ2h0c1BhY2thZ2Uuc2l6ZSA+IDAgJiY8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucmVzZXRTdXBlclJpZ2h0c30+UmVzZXQgcGFja2FnZSBzZWxlY3Rpb248L2J1dHRvbj59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlLmNvbnRlbnQ7XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1cGVyUmlnaHRzVXBkYXRlZCA6IChyaWdodHNQYWNrYWdlKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnU1VQRVJfUklHSFRTX1VQREFURUQnLFxyXG4gICAgICAgICAgICByaWdodHNQYWNrYWdlOiByaWdodHNQYWNrYWdlXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgcmVzZXRTdXBlclJpZ3RocyA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdTVVBFUl9SSUdIVFNfVVBEQVRFRCcsXHJcbiAgICAgICAgICAgIHJlc2V0OiB0cnVlXHJcbiAgICAgICAgfSksXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoUGFja2FnZVNlbGVjdG9yKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9QYWNrYWdlU2VsZWN0b3IuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4uL3N0b3JlJztcclxuXHJcbmNsYXNzIFNlbGxCdXR0b25zIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICAgIGxhc3RTdGVwIDogcHJvcHMubGFzdFN0ZXAgfHwgNSxcclxuICAgICAgICAgICAgc2F2aW5nIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNhdmluZ1N1Y2Nlc3M6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQXNEcmFmdCA9ICgpID0+IHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLnNldFN0YXRlKHsgc2F2aW5nIDogdHJ1ZSB9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5zYXZlQ29udGVudEFzRHJhZnQoc3RvcmUuZ2V0U3RhdGUoKS5jb250ZW50KS5kb25lKGZ1bmN0aW9uICggcmVzcG9uc2UgKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgc2F2aW5nIDogZmFsc2UsIHNhdmluZ1N1Y2Nlc3M6IHRydWUgfSk7XHJcbiAgICAgICAgfSkuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgc2F2aW5nIDogZmFsc2UsIHNhdmluZ1N1Y2Nlc3M6IGZhbHNlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIGxldCBzYXZlQXNEcmFmdFRleHQgPSAodGhpcy5zdGF0ZS5zYXZpbmcpID8gXCJTYXZpbmcuLlwiIDogKHRoaXMuc3RhdGUuc2F2aW5nU3VjY2VzcykgPyBcIlNhdmVkIGFzIERyYWZ0XCIgOiBcIlNhdmUgYXMgRHJhZnRcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1dHRvbnMtY29udGFpbmVyXCIgPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3BvcnRzLmxlbmd0aCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImxpZ2h0LWJsdWUtYnV0dG9uXCIgb25DbGljaz17IHRoaXMuc2F2ZUFzRHJhZnQgfSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5zYXZpbmd9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHNhdmVBc0RyYWZ0VGV4dCB9eyB0aGlzLnN0YXRlLnNhdmluZyAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+IH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnN0ZXAgPT09IHRoaXMuc3RhdGUubGFzdFN0ZXAgJiZcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiZHJhZnQtbGlzdGluZ1wiIGNsYXNzTmFtZT1cInN0YW5kYXJkLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTdWJtaXQgTGlzdGluZ1xyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPiB9XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7PGRpdiBjbGFzc05hbWU9XCJidXR0b25zLWNvbnRhaW5lclwiID5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc3RlcCAhPT0gMSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic3RhbmRhcmQtYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLnByb3BzLmdvVG9QcmV2aW91c1N0ZXAgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYXJyb3ctbGVmdFwiLz4gQmFja1xyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPiB9XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBbMSwyLDMsNCw1XS5tYXAoKHYsayk9PihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInN0ZXAgXCIgKyAoKHRoaXMucHJvcHMuc3RlcCA9PT0gdikgPyBcInN0ZXAtYWN0aXZlXCIgOiBcIlwiKX0ga2V5PXtrfT57dn08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnN0ZXAgIT09IHRoaXMuc3RhdGUubGFzdFN0ZXAgJiZcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwibmV4dC1zdGVwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3RhbmRhcmQtYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMuc3BvcnRzLmxlbmd0aCA9PT0gMH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ICgpID0+IHRoaXMucHJvcHMuZ29Ub05leHRTdGVwKCkgfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5leHQgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYXJyb3ctcmlnaHRcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+IH1cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdGVwIDogc3RhdGUuY29udGVudC5zdGVwLFxyXG4gICAgICAgIHNwb3J0cyA6IHN0YXRlLmNvbnRlbnQuc3BvcnRzXHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdvVG9OZXh0U3RlcCA6ICgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdHT19UT19ORVhUX1NURVAnXHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAgIGdvVG9QcmV2aW91c1N0ZXAgOiAoKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGUgOiAnR09fVE9fUFJFVklPVVNfU1RFUCdcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxCdXR0b25zKVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvU2VsbEJ1dHRvbnMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCBGaWxlU2VsZWN0b3IgZnJvbSAnLi4vLi4vbWFpbi9jb21wb25lbnRzL0ZpbGVTZWxlY3RvcidcclxuaW1wb3J0IFNlYXJjaENvbXBldGl0aW9uIGZyb20gJy4uLy4uL21haW4vY29tcG9uZW50cy9TZWFyY2hDb21wZXRpdGlvbidcclxuaW1wb3J0IFNlYXNvblNlbGVjdG9yIGZyb20gJy4uLy4uL21haW4vY29tcG9uZW50cy9TZWFzb25TZWxlY3RvcidcclxuaW1wb3J0IFRhZ3NJbnB1dCBmcm9tICdyZWFjdC10YWdzaW5wdXQnXHJcblxyXG5pbXBvcnQge1xyXG4gICAgRGVzY3JpcHRpb24sXHJcbiAgICBOZXdUb3VybmFtZW50LFxyXG4gICAgTmV3Q2F0ZWdvcnksXHJcbiAgICBTcG9ydFNlbGVjdG9yLFxyXG59IGZyb20gXCIuLi9jb21wb25lbnRzL1NlbGxGb3JtSXRlbXNcIjtcclxuXHJcblxyXG5jbGFzcyBTZWxsRm9ybVN0ZXAxIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICB0aXRsZSA6IFwiU3RlcCAxIC0gRXZlbnQgc2VsZWN0aW9uXCIsXHJcbiAgICAgICAgICAgIGxhc3RTcG9ydElkIDogbnVsbCxcclxuICAgICAgICAgICAgbGFzdENhdGVnb3J5SWQgOiBudWxsLFxyXG4gICAgICAgICAgICBsYXN0VG91cm5hbWVudElkIDogbnVsbCxcclxuICAgICAgICAgICAgbG9hZGluZ0NhdGVnb3JpZXMgOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9hZGluZ1RvdXJuYW1lbnRzIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGxvYWRpbmdTZWFzb25zOiBmYWxzZSxcclxuICAgICAgICAgICAgbG9hZGluZ1NjaGVkdWxlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2Vhc29uU2VsZWN0b3JzIDogWzFdLFxyXG4gICAgICAgICAgICBzcG9ydFNlbGVjdG9ycyA6IFsxXSxcclxuICAgICAgICAgICAgc2Vhc29uczogW10sXHJcbiAgICAgICAgICAgIHNjaGVkdWxlczoge30sXHJcbiAgICAgICAgICAgIHNob3dTZWFyY2ggOiB0cnVlLFxyXG4gICAgICAgICAgICB3ZWJzaXRlOiBbXSxcclxuICAgICAgICAgICAgdG91cm5hbWVudHM6IFtdLFxyXG4gICAgICAgICAgICBzcG9ydENhdGVnb3JpZXM6IFtdLFxyXG4gICAgICAgICAgICBzcG9ydENhdGVnb3J5RXh0ZW5kZWQgOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5BcGkuZ2V0U3BvcnRzKCkuZG9uZSggKHNwb3J0cyApID0+IHtcclxuICAgICAgICAgICAgQ29udGVudEFyZW5hLkRhdGEuRnVsbFNwb3J0cyA9IHNwb3J0cztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCBDb250ZW50QXJlbmEuRGF0YS5Db3VudHJpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5BcGkuZ2V0Q291bnRyaWVzKCkuZG9uZSggKGNvdW50cmllcyApID0+IHtcclxuICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkNvdW50cmllcyA9IGNvdW50cmllcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRDYXRlZ29yaWVzIChzcG9ydCkge1xyXG5cclxuICAgICAgICBsZXQgc3BvcnRJZCA9IHNwb3J0LmV4dGVybmFsSWQ7XHJcblxyXG4gICAgICAgIGlmICggc3BvcnRJZCA9PT0gdGhpcy5zdGF0ZS5sYXN0U3BvcnRJZCApIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmdDYXRlZ29yaWVzIDogdHJ1ZSB9KTtcclxuICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldENhdGVnb3JpZXMoc3BvcnRJZCkuZG9uZSggKGNhdGVnb3JpZXMgKSA9PiB7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbGFzdFNwb3J0SWQgOiBzcG9ydElkLCBsb2FkaW5nQ2F0ZWdvcmllcyA6IGZhbHNlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRUb3VybmFtZW50cyAoc3BvcnQsIGNhdGVnb3J5KSB7XHJcblxyXG4gICAgICAgIGxldCBzcG9ydElkID0gc3BvcnQuZXh0ZXJuYWxJZDtcclxuICAgICAgICBsZXQgY2F0ZWdvcnlJZCA9ICggY2F0ZWdvcnkgKSA/IGNhdGVnb3J5LmV4dGVybmFsSWQgOiBudWxsO1xyXG5cclxuICAgICAgICBpZiAoIHNwb3J0SWQgPT09IHRoaXMuc3RhdGUubGFzdFNwb3J0SWQgJiYgY2F0ZWdvcnlJZCA9PT0gdGhpcy5zdGF0ZS5sYXN0Q2F0ZWdvcnlJZCApIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmdUb3VybmFtZW50cyA6IHRydWUgfSk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkFwaS5nZXRUb3VybmFtZW50cyhzcG9ydElkLGNhdGVnb3J5SWQpLmRvbmUoICh0b3VybmFtZW50cyApID0+IHtcclxuICAgICAgICAgICAgQ29udGVudEFyZW5hLkRhdGEuVG91cm5hbWVudHMgPSB0b3VybmFtZW50cztcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBsYXN0U3BvcnRJZCA6IHNwb3J0SWQsXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nVG91cm5hbWVudHMgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGxhc3RDYXRlZ29yeUlkIDogY2F0ZWdvcnlJZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkU2Vhc29ucyAodG91cm5hbWVudHMpIHtcclxuXHJcbiAgICAgICAgbGV0IHRvdXJuYW1lbnRJZCA9ICggdG91cm5hbWVudHMubGVuZ3RoID4gMCApID8gdG91cm5hbWVudHNbMF0uZXh0ZXJuYWxJZCA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmICggdG91cm5hbWVudElkID09PSB0aGlzLnN0YXRlLmxhc3RUb3VybmFtZW50SWQgKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsb2FkaW5nU2Vhc29ucyA6IHRydWUgfSk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkFwaS5nZXRTZWFzb25zKHRvdXJuYW1lbnRJZCkuZG9uZSggKHNlYXNvbnMgKSA9PiB7XHJcbiAgICAgICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLlNlYXNvbnMgPSBzZWFzb25zO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGxhc3RUb3VybmFtZW50SWQgOiB0b3VybmFtZW50SWQsXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nU2Vhc29ucyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2Vhc29ucyA6IHNlYXNvbnNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFNjaGVkdWxlIChuZXh0UHJvcHMpIHtcclxuXHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgbmV4dFByb3BzLnNlYXNvbnMuZm9yRWFjaCgoIHNlYXNvbiApID0+e1xyXG4gICAgICAgICAgICBpZiAoICFfdGhpcy5zdGF0ZS5zY2hlZHVsZXNbc2Vhc29uLmV4dGVybmFsSWRdICl7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmdTY2hlZHVsZSA6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldFNjaGVkdWxlKHNlYXNvbi5leHRlcm5hbElkKS5kb25lKCAoc2NoZWR1bGVzICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKGZ1bmN0aW9uKHByZXZTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJldlNjaGVkdWxlcyA9IHByZXZTdGF0ZS5zY2hlZHVsZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZTY2hlZHVsZXNbc2Vhc29uLmV4dGVybmFsSWRdID0gc2NoZWR1bGVzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZ1NjaGVkdWxlIDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZXM6IHByZXZTY2hlZHVsZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2NoZWR1bGVzKGluZGV4KXtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnNlYXNvbnMgfHwgIXRoaXMucHJvcHMuc2Vhc29uc1tpbmRleF0gKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnNjaGVkdWxlc1t0aGlzLnByb3BzLnNlYXNvbnNbaW5kZXhdLmV4dGVybmFsSWRdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcblxyXG4gICAgICAgIGxldCB0b3VybmFtZW50cywgc2Vhc29ucywgc3BvcnRDYXRlZ29yaWVzLCB3ZWJzaXRlO1xyXG5cclxuICAgICAgICB0b3VybmFtZW50cyA9ICggQXJyYXkuaXNBcnJheShuZXh0UHJvcHMudG91cm5hbWVudCkgKSA/IG5leHRQcm9wcy50b3VybmFtZW50IDogW25leHRQcm9wcy50b3VybmFtZW50XTtcclxuICAgICAgICBzZWFzb25zID0gKCBBcnJheS5pc0FycmF5KG5leHRQcm9wcy5zZWFzb25zKSApID8gbmV4dFByb3BzLnNlYXNvbnMgOiBbbmV4dFByb3BzLnNlYXNvbnNdO1xyXG4gICAgICAgIHNwb3J0Q2F0ZWdvcmllcyA9KCBBcnJheS5pc0FycmF5KG5leHRQcm9wcy5zcG9ydENhdGVnb3J5KSApID8gbmV4dFByb3BzLnNwb3J0Q2F0ZWdvcnkgOiBbbmV4dFByb3BzLnNwb3J0Q2F0ZWdvcnldO1xyXG4gICAgICAgIHdlYnNpdGUgPSggQXJyYXkuaXNBcnJheShuZXh0UHJvcHMud2Vic2l0ZSkgKSA/IG5leHRQcm9wcy53ZWJzaXRlIDogKG5leHRQcm9wcy53ZWJzaXRlKSA/IFtuZXh0UHJvcHMud2Vic2l0ZV06IFtdO1xyXG5cclxuICAgICAgICBpZiAobmV4dFByb3BzLnNwb3J0cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ2F0ZWdvcmllcyhuZXh0UHJvcHMuc3BvcnRzWzBdKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgoKSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgc2hvd1NlYXJjaDogZmFsc2VcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5leHRQcm9wcy5zcG9ydHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKCkgPT4gKHtcclxuICAgICAgICAgICAgICAgIHNlYXNvbnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgc2NoZWR1bGVzOiBbXVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobmV4dFByb3BzLnNwb3J0cy5sZW5ndGggPT09IDEgfHwgc3BvcnRDYXRlZ29yaWVzLmxlbmd0aCA9PT0gMSkgdGhpcy5sb2FkVG91cm5hbWVudHMobmV4dFByb3BzLnNwb3J0c1swXSwgc3BvcnRDYXRlZ29yaWVzWzBdKTtcclxuXHJcbiAgICAgICAgaWYgKHRvdXJuYW1lbnRzLmxlbmd0aCA9PT0gMSkgaWYgKCF0b3VybmFtZW50c1swXS5jdXN0b20pIHRoaXMubG9hZFNlYXNvbnModG91cm5hbWVudHMpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgc3BvcnRDYXRlZ29yaWVzOiBzcG9ydENhdGVnb3JpZXMsXHJcbiAgICAgICAgICAgIHRvdXJuYW1lbnRzIDogdG91cm5hbWVudHNcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNwb3J0Q2F0ZWdvcmllcy5sZW5ndGggPT09IDEgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Nwb3J0Q2F0ZWdvcnlFeHRlbmRlZCA6IHNwb3J0Q2F0ZWdvcmllc1swXS5leHRlbmRlZH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlYXNvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKCgpID0+ICh7XHJcbiAgICAgICAgICAgICAgICBzZWFzb25TZWxlY3RvcnM6IFsuLi5BcnJheShzZWFzb25zLmxlbmd0aCkua2V5cygpXVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjaGVkdWxlKG5leHRQcm9wcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAod2Vic2l0ZSAmJiB3ZWJzaXRlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdlYnNpdGU6IHdlYnNpdGV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNvbnRlbnRWYWx1ZSA9ICggZXZlbnQsIGtleSApID0+e1xyXG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlQ29udGVudFZhbHVlKGtleSxldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmb3JjZUN1c3RvbVRvdXJuYW1lbnQgPSAoKSA9PiB7IHJldHVybiB0aGlzLmhhc0N1c3RvbVNwb3J0KCkgfHwgdGhpcy5oYXNDdXN0b21DYXRlZ29yeSgpIHx8IHRoaXMuc3RhdGUuc3BvcnRDYXRlZ29yeUV4dGVuZGVkICB9O1xyXG5cclxuICAgIGZvcmNlQ3VzdG9tQ2F0ZWdvcnkgPSAoKSA9PiB7IHJldHVybiB0aGlzLmhhc0N1c3RvbVNwb3J0KCkgIH07XHJcblxyXG4gICAgZm9yY2VDdXN0b21TZWFzb24gPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQ3VzdG9tU3BvcnQoKVxyXG4gICAgICAgICAgICB8fCB0aGlzLmhhc0N1c3RvbVRvdXJuYW1lbnQoKVxyXG4gICAgfTtcclxuXHJcbiAgICBoYXNDdXN0b21TcG9ydCA9ICgpID0+IHtcclxuICAgICAgICBsZXQgaGFzQ3VzdG9tU3BvcnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5zcG9ydHMuZm9yRWFjaCggKCBzcG9ydCApID0+IHtcclxuICAgICAgICAgICAgaWYgKCBzcG9ydC5jdXN0b20gKSBoYXNDdXN0b21TcG9ydCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNDdXN0b21TcG9ydCAmJiB0aGlzLnByb3BzLnNwb3J0cy5sZW5ndGggPT09IDE7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBoYXNDdXN0b21DYXRlZ29yeSA9ICgpID0+IHtcclxuICAgICAgICBsZXQgaGFzQ3VzdG9tQ2F0ZWdvcnkgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zcG9ydENhdGVnb3JpZXMuZm9yRWFjaCggKCBzcG9ydENhdGVnb3J5ICkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIHNwb3J0Q2F0ZWdvcnkuY3VzdG9tICkgaGFzQ3VzdG9tQ2F0ZWdvcnkgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JjZUN1c3RvbUNhdGVnb3J5KCkgfHwgaGFzQ3VzdG9tQ2F0ZWdvcnkgO1xyXG4gICAgfTtcclxuXHJcbiAgICBoYXNDdXN0b21Ub3VybmFtZW50ID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBoYXNDdXN0b21Ub3VybmFtZW50ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUudG91cm5hbWVudHMuZm9yRWFjaCggKCB0b3VybmFtZW50ICkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIHRvdXJuYW1lbnQuY3VzdG9tICkgaGFzQ3VzdG9tVG91cm5hbWVudCA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcmNlQ3VzdG9tVG91cm5hbWVudCgpIHx8IGhhc0N1c3RvbVRvdXJuYW1lbnQgfHwgdGhpcy5zdGF0ZS5zcG9ydENhdGVnb3J5RXh0ZW5kZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGhhc0N1c3RvbVNlYXNvbiA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IGhhc0N1c3RvbVNlYXNvbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnByb3BzLnNlYXNvbnMuZm9yRWFjaCggKCBzZWFzb24gKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICggc2Vhc29uLmN1c3RvbSApIGhhc0N1c3RvbVNlYXNvbiA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcmNlQ3VzdG9tU2Vhc29uKCkgfHwgaGFzQ3VzdG9tU2Vhc29uO1xyXG4gICAgfTtcclxuXHJcbiAgICBhZGRTZWFzb24gPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKT0+ICh7XHJcbiAgICAgICAgICAgIHNlYXNvblNlbGVjdG9ycyA6IFsuLi5wcmV2U3RhdGUuc2Vhc29uU2VsZWN0b3JzLCAxXVxyXG4gICAgICAgIH0pKVxyXG4gICAgfTtcclxuXHJcbiAgICBhZGRTcG9ydFNlbGVjdG9yID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSk9PiAoe1xyXG4gICAgICAgICAgICBzcG9ydFNlbGVjdG9ycyA6IFsuLi5wcmV2U3RhdGUuc3BvcnRTZWxlY3RvcnMsIDFdXHJcbiAgICAgICAgfSkpXHJcbiAgICB9O1xyXG5cclxuICAgIHJlbW92ZVNwb3J0ID0gKGkpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKCBpID09PSAwICkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJlbW92ZU5ld1Nwb3J0KGkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpPT4ge1xyXG4gICAgICAgICAgICBwcmV2U3RhdGUuc3BvcnRTZWxlY3RvcnMuc3BsaWNlKGksMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzcG9ydFNlbGVjdG9ycyA6IHByZXZTdGF0ZS5zcG9ydFNlbGVjdG9yc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMucmVtb3ZlRnJvbU11bHRpcGxlKGksIFwic3BvcnRzXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW1vdmVTZWFzb24gPSAoaSkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoIGkgPT09IDAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMucmVtb3ZlTmV3U2Vhc29uKGkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpPT4ge1xyXG4gICAgICAgICAgICBwcmV2U3RhdGUuc2Vhc29uU2VsZWN0b3JzLnNwbGljZShpLDEpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc2Vhc29uU2VsZWN0b3JzIDogcHJldlN0YXRlLnNlYXNvblNlbGVjdG9yc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMucmVtb3ZlRnJvbU11bHRpcGxlKGksIFwic2Vhc29uc1wiKTtcclxuICAgIH07XHJcblxyXG4gICAgdG9nZ2xlU2VhcmNoID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4gKHtcclxuICAgICAgICAgICAgc2hvd1NlYXJjaDogIXByZXZTdGF0ZS5zaG93U2VhcmNoXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3ZWJzaXRlc1VwZGF0ZWQgPSAod2Vic2l0ZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3dlYnNpdGV9KTtcclxuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUNvbnRlbnRWYWx1ZShcIndlYnNpdGVcIix3ZWJzaXRlKTtcclxuICAgIH07XHJcblxyXG4gICAgc2VsZWN0VG91cm5hbWVudCA9ICggdG91cm5hbWVudCApID0+e1xyXG4gICAgICAgIHRoaXMudG9nZ2xlU2VhcmNoKCk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5zZWxlY3RUb3VybmFtZW50KHRvdXJuYW1lbnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCB0aGlzLnByb3BzLnN0ZXAgIT09IDEpIHJldHVybiAobnVsbCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSB7XHJcbiAgICAgICAgICAgIHNwb3J0czogW3sgdmFsdWUgOiBcIlwiLCBjdXN0b20gOiBmYWxzZSB9XSxcclxuICAgICAgICAgICAgc3BvcnRDYXRlZ29yeSA6IHsgdmFsdWUgOiBcIlwiLCBjdXN0b20gOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICB0b3VybmFtZW50IDogeyB2YWx1ZSA6IFwiXCIsIGN1c3RvbSA6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgIHNlYXNvbnMgOiBbeyB2YWx1ZSA6IFwiXCIsIGN1c3RvbSA6IGZhbHNlIH1dXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLnByb3BzLnNwb3J0cy5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICBpbnB1dFByb3BzLnNwb3J0cyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNwb3J0cy5mb3JFYWNoKCggc3BvcnQgKT0+e1xyXG4gICAgICAgICAgICAgICAgaW5wdXRQcm9wcy5zcG9ydHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNwb3J0Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDdXN0b20gOiBzcG9ydC5jdXN0b21cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIHRoaXMucHJvcHMuc2Vhc29ucy5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICBpbnB1dFByb3BzLnNlYXNvbnMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWFzb25zLmZvckVhY2goKCBzZWFzb24gKT0+e1xyXG4gICAgICAgICAgICAgICAgaW5wdXRQcm9wcy5zZWFzb25zLnB1c2goe3ZhbHVlOiBzZWFzb24ubmFtZSxpc0N1c3RvbSA6IHNlYXNvbi5jdXN0b219KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlLnNwb3J0Q2F0ZWdvcmllcy5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICBpbnB1dFByb3BzLnNwb3J0Q2F0ZWdvcnkgPSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS5zcG9ydENhdGVnb3JpZXNbMF0ubmFtZSxcclxuICAgICAgICAgICAgICAgIGlzQ3VzdG9tOiB0aGlzLnN0YXRlLnNwb3J0Q2F0ZWdvcmllc1swXS5pc0N1c3RvbVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZS50b3VybmFtZW50cy5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICBpbnB1dFByb3BzLnRvdXJuYW1lbnQgPSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zdGF0ZS50b3VybmFtZW50c1swXS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgaXNDdXN0b206IHRoaXMuc3RhdGUudG91cm5hbWVudHNbMF0uaXNDdXN0b21cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC10aXRsZVwiPnt0aGlzLnN0YXRlLnRpdGxlfTwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNob3dTZWFyY2ggJiYgPFNlYXJjaENvbXBldGl0aW9uIGNsb3NlPXt0aGlzLnRvZ2dsZVNlYXJjaH0gc2VsZWN0PXt0aGlzLnNlbGVjdFRvdXJuYW1lbnR9IC8+fVxyXG4gICAgICAgICAgICAgICAgeyF0aGlzLnN0YXRlLnNob3dTZWFyY2ggJiYgPGJ1dHRvbiBjbGFzc05hbWU9XCJsaWdodC1ibHVlLWJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlU2VhcmNofT48aSBjbGFzc05hbWU9XCJmYSBmYS1zZWFyY2hcIi8+IFNob3cgc2VhcmNoIGZ1bmN0aW9uPC9idXR0b24+fVxyXG4gICAgICAgICAgICAgICAgeyF0aGlzLnN0YXRlLnNob3dTZWFyY2ggJiYgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRlbnQtY29udGFpbmVyXCI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1pdGVtLWRlc2NyaXB0aW9uXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBQbGVhc2Ugc2VsZWN0IHRoZSBzcG9ydChzKSBhbmQgY29tcGV0aXRpb24ocykgY292ZXJlZCBieSB5b3VyIGNvbnRlbnQgbGlzdGluZzpcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNwb3J0U2VsZWN0b3JzLm1hcCgoaXRlbSwgaSwgbGlzdCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8U3BvcnRTZWxlY3RvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmU9eygpID0+IHRoaXMucmVtb3ZlU3BvcnQoaSkgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dBZGROZXc9e2xpc3QubGVuZ3RoID4gMSAmJiBsaXN0Lmxlbmd0aCA9PT0gaSArIDF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Nsb3NlPXsgaSA+IDAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ3VzdG9tPXsoaW5wdXRQcm9wcy5zcG9ydHNbaV0pID8gaW5wdXRQcm9wcy5zcG9ydHNbaV0uaXNDdXN0b20gOiBmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRTcG9ydFNlbGVjdG9yPXt0aGlzLmFkZFNwb3J0U2VsZWN0b3J9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4geyB0aGlzLnByb3BzLm9wZW5TcG9ydFNlbGVjdG9yKGksIHRoaXMucHJvcHMuc3BvcnRzKSB9IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17KCBpbnB1dFByb3BzLnNwb3J0c1tpXSkgP2lucHV0UHJvcHMuc3BvcnRzW2ldLnZhbHVlIDogXCJcIn0gIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zcG9ydFNlbGVjdG9ycy5sZW5ndGggPT09IDEgJiYgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWl0ZW0tZGVzY3JpcHRpb25cIiBzdHlsZT17e21hcmdpblRvcDogXCItMTVweFwifX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFlvdXIgY29udGVudCBjb3ZlcnMgbXVsdGlwbGUgc3BvcnRzPyA8YnV0dG9uIGNsYXNzTmFtZT17XCJsaW5rLWJ1dHRvblwifSBvbkNsaWNrPXt0aGlzLmFkZFNwb3J0U2VsZWN0b3J9PlBsZWFzZSBjbGljayBoZXJlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zcG9ydFNlbGVjdG9ycy5sZW5ndGggPT09IDEgJiYgIXRoaXMuaGFzQ3VzdG9tQ2F0ZWdvcnkoKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmFzZS1pbnB1dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+Q291bnRyeS9DYXRlZ29yeTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2lucHV0UHJvcHMuc3BvcnRDYXRlZ29yeS52YWx1ZSB8fCBcIlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5zcG9ydHMubGVuZ3RoID09PSAwIHx8IHRoaXMuc3RhdGUubG9hZGluZ0NhdGVnb3JpZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vcGVuQ2F0ZWdvcnlTZWxlY3Rvcih0aGlzLnN0YXRlLnNwb3J0Q2F0ZWdvcmllcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17XCJDb3VudHJ5L0NhdGVnb3J5XCJ9ICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUubG9hZGluZ0NhdGVnb3JpZXMgJiYgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIi8+fVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5zcG9ydFNlbGVjdG9ycy5sZW5ndGggPT09IDEgJiYgdGhpcy5oYXNDdXN0b21DYXRlZ29yeSgpICYmIDxOZXdDYXRlZ29yeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2xvc2U9eyF0aGlzLmZvcmNlQ3VzdG9tQ2F0ZWdvcnkoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuY3VzdG9tQ2F0ZWdvcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17IChlKSA9PiB0aGlzLnVwZGF0ZUNvbnRlbnRWYWx1ZShlLCBcImN1c3RvbUNhdGVnb3J5XCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLnJlbW92ZU5ld0NhdGVnb3J5fVxyXG4gICAgICAgICAgICAgICAgICAgIC8+fVxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNwb3J0U2VsZWN0b3JzLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5oYXNDdXN0b21Ub3VybmFtZW50KCkgJiZcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhc2UtaW5wdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkNvbXBldGl0aW9uPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID17aW5wdXRQcm9wcy50b3VybmFtZW50LnZhbHVlIHx8IFwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLnNwb3J0cy5sZW5ndGggPT09IDAgfHwgdGhpcy5zdGF0ZS5sb2FkaW5nVG91cm5hbWVudHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vcGVuVG91cm5hbWVudFNlbGVjdG9yKCB0aGlzLnN0YXRlLnRvdXJuYW1lbnRzICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1wiVG91cm5hbWVudFwifSAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmxvYWRpbmdUb3VybmFtZW50cyAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUuc3BvcnRTZWxlY3RvcnMubGVuZ3RoID09PSAxICYmIHRoaXMuaGFzQ3VzdG9tVG91cm5hbWVudCgpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPE5ld1RvdXJuYW1lbnQgc2hvd0Nsb3NlPXshdGhpcy5mb3JjZUN1c3RvbVRvdXJuYW1lbnQoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5wcm9wcy5jdXN0b21Ub3VybmFtZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17IChlKSA9PiB0aGlzLnVwZGF0ZUNvbnRlbnRWYWx1ZShlLCBcImN1c3RvbVRvdXJuYW1lbnRcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5yZW1vdmVOZXdUb3VybmFtZW50fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuc3BvcnRTZWxlY3RvcnMubGVuZ3RoID09PSAxICYmICggdGhpcy5zdGF0ZS5zZWFzb25zLmxlbmd0aCA+IDAgfHwgdGhpcy5mb3JjZUN1c3RvbVNlYXNvbigpIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5zdGF0ZS5zZWFzb25TZWxlY3RvcnMubGVuZ3RoID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2Vhc29uU2VsZWN0b3JzLm1hcCggKHNlYXNvbiwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFNlYXNvblNlbGVjdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFzb249e3NlYXNvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZFNlYXNvbj17dGhpcy5hZGRTZWFzb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVTZWFzb249eygpPT50aGlzLnJlbW92ZVNlYXNvbihpKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgKGlucHV0UHJvcHMuc2Vhc29uc1tpXSApID8gaW5wdXRQcm9wcy5zZWFzb25zW2ldLnZhbHVlIDogXCJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlcz17dGhpcy5nZXRTY2hlZHVsZXMoaSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXt0aGlzLnN0YXRlLmxvYWRpbmdTZWFzb25zfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Nsb3NlPXsgaSA+IDAgfHwgKCAhdGhpcy5mb3JjZUN1c3RvbVNlYXNvbigpICYmIHRoaXMuaGFzQ3VzdG9tU2Vhc29uKCkgKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9eyAoZSkgPT4gdGhpcy51cGRhdGVDb250ZW50VmFsdWUoZSwgXCJjdXN0b21TZWFzb25cIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0N1c3RvbT17KGlucHV0UHJvcHMuc2Vhc29uc1tpXSkgPyBpbnB1dFByb3BzLnNlYXNvbnNbaV0uaXNDdXN0b20gfHwgdGhpcy5mb3JjZUN1c3RvbVNlYXNvbigpIDogZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93QWRkTmV3PXt0aGlzLnN0YXRlLnNlYXNvblNlbGVjdG9ycy5sZW5ndGggPT09IGkgKyAxfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlblNlbGVjdG9yPXsoKT0+dGhpcy5wcm9wcy5vcGVuU2Vhc29uU2VsZWN0b3IoaSwgdGhpcy5wcm9wcy5zZWFzb25zKX0vPlxyXG4gICAgICAgICAgICAgICAgICAgIH0pfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7ICggdGhpcy5zdGF0ZS5sb2FkaW5nU2Vhc29ucyB8fCB0aGlzLnN0YXRlLmxvYWRpbmdTY2hlZHVsZSApICYmIDxkaXY+PGkgY2xhc3NOYW1lPVwiZmEgZmEtY29nIGZhLXNwaW5cIi8+PC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8RGVzY3JpcHRpb24gdmFsdWU9e3RoaXMucHJvcHMuZGVzY3JpcHRpb259IG9uQmx1cj17IChlKSA9PiB0aGlzLnVwZGF0ZUNvbnRlbnRWYWx1ZShlLCBcImRlc2NyaXB0aW9uXCIpfSAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJhc2UtaW5wdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPldlYnNpdGU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8VGFnc0lucHV0IGlucHV0UHJvcHM9e3twbGFjZWhvbGRlcjogXCJXZWJzaXRlXCJ9fSB2YWx1ZT17dGhpcy5zdGF0ZS53ZWJzaXRlfSBvbkNoYW5nZT17dGhpcy53ZWJzaXRlc1VwZGF0ZWR9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxGaWxlU2VsZWN0b3IgdGFyZ2V0PXtcImJyb2NodXJlXCJ9Lz5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlLmNvbnRlbnRcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb3BlblNwb3J0U2VsZWN0b3IgOiAoaW5kZXgsIHNlbGVjdGVkSXRlbXMpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZSA6ICdPUEVOX1NFTEVDVE9SJyxcclxuICAgICAgICAgICAgc2VsZWN0b3JJdGVtcyA6IENvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMsXHJcbiAgICAgICAgICAgIHBvcHVsYXJJdGVtcyA6IENvbnRlbnRBcmVuYS5EYXRhLlRvcFNwb3J0cyxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlIDogXCJzcG9ydHNcIixcclxuICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogXCJwb3B1bGFyXCIsXHJcbiAgICAgICAgICAgIGNsZWFuOiBbXCJ0b3VybmFtZW50XCIsIFwic2Vhc29uc1wiLCBcInNwb3J0Q2F0ZWdvcnlcIl0sXHJcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgOiBzZWxlY3RlZEl0ZW1zLFxyXG4gICAgICAgICAgICBzaG93TmV3U3BvcnQgOiB0cnVlLFxyXG4gICAgICAgICAgICBpbmRleCA6IGluZGV4XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgb3BlbkNhdGVnb3J5U2VsZWN0b3IgOiAoc2VsZWN0ZWRJdGVtcykgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlOiAnT1BFTl9TRUxFQ1RPUicsXHJcbiAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IENvbnRlbnRBcmVuYS5EYXRhLkNhdGVnb3JpZXMsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogXCJzcG9ydENhdGVnb3J5XCIsXHJcbiAgICAgICAgICAgIGFjdGl2ZUZpbHRlciA6IFwiYWdcIixcclxuICAgICAgICAgICAgc2hvd0FsbENvdW50cmllcyA6IHRydWUsXHJcbiAgICAgICAgICAgIHNob3dOZXdDYXRlZ29yeSA6IHRydWUsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM6IHNlbGVjdGVkSXRlbXMsXHJcbiAgICAgICAgICAgIGluZGV4OiAwLFxyXG4gICAgICAgICAgICBjbGVhbjogW1widG91cm5hbWVudFwiLCBcInNlYXNvbnNcIl1cclxuICAgICAgICB9KSxcclxuICAgICAgICBvcGVuVG91cm5hbWVudFNlbGVjdG9yIDogKHNlbGVjdGVkSXRlbXMpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZTogJ09QRU5fU0VMRUNUT1InLFxyXG4gICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBDb250ZW50QXJlbmEuRGF0YS5Ub3VybmFtZW50cyxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlOiBcInRvdXJuYW1lbnRcIixcclxuICAgICAgICAgICAgYWN0aXZlRmlsdGVyIDogXCJhZ1wiLFxyXG4gICAgICAgICAgICBpbmRleDogMCxcclxuICAgICAgICAgICAgc2VsZWN0ZWRJdGVtczogc2VsZWN0ZWRJdGVtcyxcclxuICAgICAgICAgICAgc2hvd05ld1RvdXJuYW1lbnQgOiB0cnVlLFxyXG4gICAgICAgICAgICBjbGVhbjogW1wic2Vhc29uc1wiXVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIG9wZW5TZWFzb25TZWxlY3RvciA6IChpbmRleCwgc2VsZWN0ZWRJdGVtcykgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlOiAnT1BFTl9TRUxFQ1RPUicsXHJcbiAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IENvbnRlbnRBcmVuYS5EYXRhLlNlYXNvbnMsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogXCJzZWFzb25zXCIsXHJcbiAgICAgICAgICAgIG11bHRpcGxlOiB0cnVlLFxyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIHNob3dOZXdTZWFzb24gOiB0cnVlLFxyXG4gICAgICAgICAgICBjbGVhbiA6IFtdLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEl0ZW1zIDogc2VsZWN0ZWRJdGVtc1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHJlbW92ZUZyb21NdWx0aXBsZSA6IChpbmRleCwgc2VsZWN0b3JUeXBlKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdSRU1PVkVfRlJPTV9NVUxUSVBMRScsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogc2VsZWN0b3JUeXBlLFxyXG4gICAgICAgICAgICBpbmRleDogaW5kZXhcclxuICAgICAgICB9KSxcclxuICAgICAgICB1cGRhdGVDb250ZW50VmFsdWUgOiAoa2V5LCB2YWx1ZSkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlOiAnVVBEQVRFX0NPTlRFTlRfVkFMVUUnLFxyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgdmFsdWUgOiB2YWx1ZVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHJlbW92ZU5ld1Nwb3J0IDogKGluZGV4KSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdSRU1PVkVfTkVXJyxcclxuICAgICAgICAgICAgaW5kZXggOiBpbmRleCxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlIDogXCJzcG9ydHNcIixcclxuICAgICAgICB9KSxcclxuICAgICAgICByZW1vdmVOZXdUb3VybmFtZW50IDogKGluZGV4KSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdSRU1PVkVfTkVXJyxcclxuICAgICAgICAgICAgaW5kZXggOiBpbmRleCxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlIDogXCJ0b3VybmFtZW50XCIsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgcmVtb3ZlTmV3Q2F0ZWdvcnkgOiAoaW5kZXgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZTogJ1JFTU9WRV9ORVcnLFxyXG4gICAgICAgICAgICBpbmRleCA6IGluZGV4LFxyXG4gICAgICAgICAgICBzZWxlY3RvclR5cGUgOiBcInNwb3J0Q2F0ZWdvcnlcIixcclxuICAgICAgICB9KSxcclxuICAgICAgICByZW1vdmVOZXdTZWFzb24gOiAoaW5kZXgpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZTogJ1JFTU9WRV9ORVcnLFxyXG4gICAgICAgICAgICBpbmRleCA6IGluZGV4LFxyXG4gICAgICAgICAgICBzZWxlY3RvclR5cGUgOiBcInNlYXNvbnNcIixcclxuICAgICAgICB9KSxcclxuICAgICAgICBzZWxlY3RUb3VybmFtZW50IDogKHRvdXJuYW1lbnQpID0+IGRpc3BhdGNoKHsgdHlwZTogJ1NFTEVDVF9UT1VSTkFNRU5UJywgdG91cm5hbWVudDogdG91cm5hbWVudCB9KVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxGb3JtU3RlcDEpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9jb250YWluZXJzL1NlbGxGb3JtU3RlcDEuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCBQYWNrYWdlU2VsZWN0b3IgZnJvbSBcIi4uL2NvbnRhaW5lcnMvUGFja2FnZVNlbGVjdG9yXCI7XHJcbmltcG9ydCBSaWdodCBmcm9tIFwiLi4vY29tcG9uZW50cy9SaWdodFwiO1xyXG5pbXBvcnQgQ3VycmVuY3lTZWxlY3RvciBmcm9tIFwiLi4vY29tcG9uZW50cy9DdXJyZW5jeVNlbGVjdG9yXCI7XHJcbmltcG9ydCBMaWNlbnNlRGF0ZVNlbGVjdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0xpY2Vuc2VEYXRlU2VsZWN0b3JcIjtcclxuaW1wb3J0IFByb2dyYW1OYW1lIGZyb20gXCIuLi9jb21wb25lbnRzL1Byb2dyYW1OYW1lXCI7XHJcblxyXG5jbGFzcyBTZWxsRm9ybVN0ZXAyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgbGV0IHBhY2thZ2VzID0gSlNPTi5wYXJzZSh0aGlzLnByb3BzLnBhY2thZ2VzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdGl0bGUgOiBcIlN0ZXAgMiAtIENvbmZpZ3VyZSBSaWdodHNcIixcclxuICAgICAgICAgICAgcGFja2FnZXNDb25maXJtZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgcHJvZ3JhbXNFbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgcmlnaHRzIDogW10sXHJcbiAgICAgICAgICAgIHJpZ2h0UGFja2FnZXMgOiBuZXcgTWFwKHBhY2thZ2VzLm1hcCgoaSkgPT4gW2kuaWQsIGldKSlcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHt9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN0ZXAgMiAtIHByb3BzXCIsIG5leHRQcm9wcyk7XHJcbiAgICAgICAgbGV0IHByb2dyYW1zRW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoIG5leHRQcm9wcy5yaWdodHNQYWNrYWdlLmxlbmd0aCA+IDAgJiYgdGhpcy5zdGF0ZS5yaWdodHMubGVuZ3RoID09PSAwICkge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRSaWdodHMobmV4dFByb3BzLnJpZ2h0c1BhY2thZ2UsIFwiTWFpbiBJbmZvcm1hdGlvblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5leHRQcm9wcy5yaWdodHNQYWNrYWdlLmZvckVhY2goKCByaWdodFBhY2thZ2UgKT0+e1xyXG4gICAgICAgICAgICBpZiAoIHJpZ2h0UGFja2FnZS5zaG9ydExhYmVsID09PSBcIlBSXCIgKSBwcm9ncmFtc0VuYWJsZWQgPSB0cnVlIDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHByb2dyYW1zRW5hYmxlZCA6IHByb2dyYW1zRW5hYmxlZFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIHByb2dyYW1zRW5hYmxlZCAmJiBuZXh0UHJvcHMucHJvZ3JhbXMubGVuZ3RoID09PSAwKSB0aGlzLnByb3BzLnVwZGF0ZVByb2dyYW0oMCwge25hbWU6IFwiXCIsIHNhdmVkIDogZmFsc2V9LCBcInNhdmVcIik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxvYWRSaWdodHMgPSAocmlnaHRzUGFja2FnZSwgZ3JvdXApID0+IHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5BcGkuZ2V0UmlnaHRzKHJpZ2h0c1BhY2thZ2UubWFwKChwKT0+IChwLmlkKSksIGdyb3VwKS5kb25lKChyaWdodHMpPT57XHJcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtyaWdodHN9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcGFja2FnZXNDb25maXJtZWQgPSAocGFja2FnZXNDb25maXJtZWQpID0+e1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3BhY2thZ2VzQ29uZmlybWVkfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGVjdEN1cnJlbmN5ID0gKCBjdXJyZW5jeSApID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZUNvbnRlbnRWYWx1ZSgnY3VycmVuY3knLCBjdXJyZW5jeSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNlbGVjdExpY2Vuc2VEYXRlcyA9IChrZXksIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy51cGRhdGVDb250ZW50VmFsdWUoa2V5LCB2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZFByb2dyYW0gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZVByb2dyYW0oaW5kZXgsIHtuYW1lOiBuYW1lfSwgXCJhZGRcIilcclxuICAgIH07XHJcblxyXG4gICAgc2F2ZVByb2dyYW0gPSAoaW5kZXgsbmFtZSkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlUHJvZ3JhbShpbmRleCwge25hbWU6IG5hbWUsIHNhdmVkOiB0cnVlfSwgXCJzYXZlXCIpXHJcbiAgICB9O1xyXG5cclxuICAgIGVkaXRQcm9ncmFtID0gKGluZGV4LG5hbWUpID0+IHtcclxuICAgICAgICB0aGlzLnByb3BzLnVwZGF0ZVByb2dyYW0oaW5kZXgsIHtuYW1lOiBuYW1lLCBzYXZlZDogZmFsc2V9LCBcInNhdmVcIilcclxuICAgIH07XHJcblxyXG4gICAgcmVtb3ZlUHJvZ3JhbSA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIHRoaXMucHJvcHMudXBkYXRlUHJvZ3JhbShpbmRleCwgbnVsbCwgXCJyZW1vdmVcIilcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICggdGhpcy5wcm9wcy5zdGVwICE9PSAyKSByZXR1cm4gKG51bGwpO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgPFBhY2thZ2VTZWxlY3RvclxyXG4gICAgICAgICAgICAgICAgICAgIHBhY2thZ2VzPXt0aGlzLnByb3BzLnBhY2thZ2VzfVxyXG4gICAgICAgICAgICAgICAgICAgIHBhY2thZ2VzQ29uZmlybWVkPXt0aGlzLnN0YXRlLnBhY2thZ2VzQ29uZmlybWVkfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29uZmlybT17dGhpcy5wYWNrYWdlc0NvbmZpcm1lZH0gLz5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnBhY2thZ2VzQ29uZmlybWVkICYmIHRoaXMuc3RhdGUucmlnaHRzLmxlbmd0aCA9PT0gMCAmJiA8aSBjbGFzc05hbWU9XCJmYSBmYS1jb2cgZmEtc3BpblwiLz5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtY29udGVudC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5wYWNrYWdlc0NvbmZpcm1lZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q3VycmVuY3lTZWxlY3RvciBvbkNsaWNrPXt0aGlzLnNlbGVjdEN1cnJlbmN5fSBzZWxlY3RlZD17dGhpcy5wcm9wcy5jdXJyZW5jeX0gLz59XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnBhY2thZ2VzQ29uZmlybWVkICYmIHRoaXMuc3RhdGUucHJvZ3JhbXNFbmFibGVkICYmIHRoaXMucHJvcHMucHJvZ3JhbXMubWFwKCh2LGksIGwpPT4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9ncmFtTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2l9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lPXt2Lm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93QWRkPXt2LnNhdmVkICYmIGkgPT09IGwubGVuZ3RoIC0gMX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dFZGl0PXt2LnNhdmVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1NhdmU9eyF2LnNhdmVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1JlbW92ZT17di5zYXZlZCB8fCBpID4gMH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQWRkPXt0aGlzLmFkZFByb2dyYW19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkVkaXQ9e3RoaXMuZWRpdFByb2dyYW19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNhdmU9e3RoaXMuc2F2ZVByb2dyYW19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblJlbW92ZT17dGhpcy5yZW1vdmVQcm9ncmFtfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICkpfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5wYWNrYWdlc0NvbmZpcm1lZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaWNlbnNlRGF0ZVNlbGVjdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlPXt0aGlzLnNlbGVjdExpY2Vuc2VEYXRlc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlPXt0aGlzLnByb3BzLnN0YXJ0RGF0ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kRGF0YT17dGhpcy5wcm9wcy5lbmREYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+fVxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJpZ2h0cy5sZW5ndGggPiAwICYmIHRoaXMuc3RhdGUucmlnaHRzLm1hcCgocmlnaHQpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxSaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cmlnaHQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17cmlnaHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbXM9e3RoaXMucHJvcHMucHJvZ3JhbXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRQYWNrYWdlcz17dGhpcy5zdGF0ZS5yaWdodFBhY2thZ2VzfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGUuY29udGVudFxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW1vdmVOZXdTcG9ydCA6IChpbmRleCkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlOiAnUkVNT1ZFX05FVycsXHJcbiAgICAgICAgICAgIGluZGV4IDogaW5kZXgsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yVHlwZSA6IFwic3BvcnRzXCIsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdXBkYXRlQ29udGVudFZhbHVlIDogKGtleSwgdmFsdWUpID0+IGRpc3BhdGNoKHtcclxuICAgICAgICAgICAgdHlwZTogJ1VQREFURV9DT05URU5UX1ZBTFVFJyxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIHZhbHVlIDogdmFsdWVcclxuICAgICAgICB9KSxcclxuICAgICAgICB1cGRhdGVQcm9ncmFtIDogKGluZGV4LCBwcm9ncmFtLCBuYW1lKSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdVUERBVEVfUFJPR1JBTVMnLFxyXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXHJcbiAgICAgICAgICAgIHByb2dyYW0gOiBwcm9ncmFtLFxyXG4gICAgICAgICAgICBuYW1lOiBuYW1lXHJcbiAgICAgICAgfSksXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoU2VsbEZvcm1TdGVwMilcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwMi5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IFBhY2thZ2VTZWxlY3RvciBmcm9tIFwiLi4vY29udGFpbmVycy9QYWNrYWdlU2VsZWN0b3JcIjtcclxuaW1wb3J0IFJpZ2h0IGZyb20gXCIuLi9jb21wb25lbnRzL1JpZ2h0XCI7XHJcblxyXG5jbGFzcyBTZWxsRm9ybVN0ZXAzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgbGV0IHBhY2thZ2VzID0gSlNPTi5wYXJzZSh0aGlzLnByb3BzLnBhY2thZ2VzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdGl0bGUgOiBcIlN0ZXAgM1wiLFxyXG4gICAgICAgICAgICBwYWNrYWdlc0NvbmZpcm1lZCA6IGZhbHNlLFxyXG4gICAgICAgICAgICByaWdodHMgOiBbXSxcclxuICAgICAgICAgICAgcmlnaHRQYWNrYWdlcyA6IG5ldyBNYXAocGFja2FnZXMubWFwKChpKSA9PiBbaS5pZCwgaV0pKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICAgICAgaWYgKCBuZXh0UHJvcHMucmlnaHRzUGFja2FnZS5sZW5ndGggPiAwICYmIHRoaXMuc3RhdGUucmlnaHRzLmxlbmd0aCA9PT0gMCAmJiBuZXh0UHJvcHMuc3RlcCA9PT0gMyApIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkUmlnaHRzKG5leHRQcm9wcy5yaWdodHNQYWNrYWdlLCBcIlByb2R1Y3Rpb24gU3RhbmRhcmRzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2FkUmlnaHRzID0gKHJpZ2h0c1BhY2thZ2UsIGdyb3VwKSA9PiB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldFJpZ2h0cyhyaWdodHNQYWNrYWdlLm1hcCgocCk9PiAocC5pZCkpLCBncm91cCkuZG9uZSgocmlnaHRzKT0+e1xyXG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7cmlnaHRzfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIHRoaXMucHJvcHMuc3RlcCAhPT0gMykgcmV0dXJuIChudWxsKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnJpZ2h0cy5sZW5ndGggPiAwICYmIHRoaXMuc3RhdGUucmlnaHRzLm1hcCgocmlnaHQpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxSaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cmlnaHQuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YT17cmlnaHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3JhbXM9e3RoaXMucHJvcHMucHJvZ3JhbXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRQYWNrYWdlcz17dGhpcy5zdGF0ZS5yaWdodFBhY2thZ2VzfS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGUuY29udGVudFxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZW1vdmVOZXdTcG9ydCA6IChpbmRleCkgPT4gZGlzcGF0Y2goe1xyXG4gICAgICAgICAgICB0eXBlOiAnUkVNT1ZFX05FVycsXHJcbiAgICAgICAgICAgIGluZGV4IDogaW5kZXgsXHJcbiAgICAgICAgICAgIHNlbGVjdG9yVHlwZSA6IFwic3BvcnRzXCIsXHJcbiAgICAgICAgfSksXHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoU2VsbEZvcm1TdGVwMylcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL2NvbnRhaW5lcnMvU2VsbEZvcm1TdGVwMy5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuXHJcbmNvbnN0IFNlbGxGb3JtU3RlcCA9ICh7c3RlcCwgYWN0aXZlLCB0aXRsZX0pID0+IChcclxuICAgIDxkaXYgIGNsYXNzTmFtZT17XCJzdGVwIFwiICsgKGFjdGl2ZSAmJiBcInN0ZXAtYWN0aXZlXCIpIH0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdGVwLWxhYmVsXCI+XHJcbiAgICAgICAgICAgIFN0ZXAgeyBzdGVwIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0ZXAtdGl0bGVcIj5cclxuICAgICAgICAgICAge3RpdGxlfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RlcC1pY29uXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuKTtcclxuXHJcbmNsYXNzIFNlbGxGb3JtU3RlcHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgc3RlcHM6IFtcclxuICAgICAgICAgICAgICAgIHtzdGVwOiAxLCB0aXRsZTogXCJFdmVudCBzZWxlY3Rpb25cIn0sXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogMiwgdGl0bGU6IFwiQ29uZmlndXJlIHJpZ2h0c1wifSxcclxuICAgICAgICAgICAgICAgIHtzdGVwOiAzLCB0aXRsZTogXCJEaXN0cmlidXRpb24gc3R5bGVcIn0sXHJcbiAgICAgICAgICAgICAgICB7c3RlcDogNCwgdGl0bGU6IFwiUHJpY2UsIHBheW1lbnQgYW5kIGxpc3RpbmcgZGV0YWlsc1wifSxcclxuICAgICAgICAgICAgICAgIHtzdGVwOiA1LCB0aXRsZTogXCJDb25maXJtXCJ9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm94LWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnN0ZXBzLm1hcCgoc3RlcCwgaSk9PntcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFNlbGxGb3JtU3RlcCBrZXk9e2l9IHN0ZXA9e3N0ZXAuc3RlcH0gdGl0bGU9e3N0ZXAudGl0bGV9IGFjdGl2ZT17X3RoaXMucHJvcHMuc3RlcCA9PT0gc3RlcC5zdGVwfS8+XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzdGVwIDogc3RhdGUuY29udGVudC5zdGVwLFxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShTZWxsRm9ybVN0ZXBzKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L3NlbGwvY29udGFpbmVycy9TZWxsRm9ybVN0ZXBzLmpzIiwiaW1wb3J0IHtzZWxlY3RvclR5cGV9IGZyb20gXCIuL3NlbGVjdG9yXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY29udGVudFR5cGU9IHtcclxuICAgIENPTlRFTlRfSU5JVDonQ09OVEVOVF9JTklUJyxcclxuICAgIEdPX1RPX05FWFRfU1RFUDogJ0dPX1RPX05FWFRfU1RFUCcsXHJcbiAgICBHT19UT19QUkVWSU9VU19TVEVQOiAnR09fVE9fUFJFVklPVVNfU1RFUCcsXHJcbiAgICBBRERfTkVXIDogJ0FERF9ORVcnLFxyXG4gICAgUkVNT1ZFX05FVyA6ICdSRU1PVkVfTkVXJyxcclxuICAgIFNVUEVSX1JJR0hUU19VUERBVEVEOiAnU1VQRVJfUklHSFRTX1VQREFURUQnLFxyXG4gICAgVVBEQVRFX0NPTlRFTlRfVkFMVUUgOiAnVVBEQVRFX0NPTlRFTlRfVkFMVUUnLFxyXG4gICAgU0VMRUNUX1RPVVJOQU1FTlQgOiAnU0VMRUNUX1RPVVJOQU1FTlQnLFxyXG4gICAgUkVNT1ZFX0ZST01fTVVMVElQTEUgOiAnUkVNT1ZFX0ZST01fTVVMVElQTEUnLFxyXG4gICAgQVBQTFlfU0VMRUNUSU9OIDogJ0FQUExZX1NFTEVDVElPTicsXHJcbiAgICBVUERBVEVfUFJPR1JBTVMgOiAnVVBEQVRFX1BST0dSQU1TJyxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb250ZW50ID0gKHN0YXRlID0ge1xyXG4gICAgc3RlcDogMSxcclxuICAgIHJpZ2h0c1BhY2thZ2UgOiBbXSxcclxuICAgIHRvdXJuYW1lbnQgOiBbXSxcclxuICAgIHNwb3J0Q2F0ZWdvcnkgOiBbXSxcclxuICAgIHNwb3J0cyA6IFtdLFxyXG4gICAgc2Vhc29uczogW10sXHJcbiAgICBwcm9ncmFtcyA6IFtdXHJcbn0sIGFjdGlvbikgPT4ge1xyXG5cclxuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xyXG5cclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkNPTlRFTlRfSU5JVDpcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBhY3Rpb24uY29udGVudCk7XHJcbiAgICAgICAgY2FzZSBjb250ZW50VHlwZS5HT19UT19ORVhUX1NURVA6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgc3RlcDpzdGF0ZS5zdGVwICsgMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkdPX1RPX1BSRVZJT1VTX1NURVA6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgc3RlcDogc3RhdGUuc3RlcCAtMVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlJFTU9WRV9ORVc6XHJcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XHJcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gWy4uLnN0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdXTtcclxuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV0uc3BsaWNlKGFjdGlvbi5pbmRleCwgMSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLkFERF9ORVc6XHJcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XHJcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gWy4uLnN0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdXTtcclxuICAgICAgICAgICAgbmV3U3RhdGVbYWN0aW9uLnNlbGVjdG9yVHlwZV1bYWN0aW9uLmluZGV4XSA9IHtcclxuICAgICAgICAgICAgICAgIGN1c3RvbSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5jbGVhbiApe1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uLmNsZWFuLmZvckVhY2goKHNlbGVjdG9yVHlwZSk9PntcclxuICAgICAgICAgICAgICAgICAgICBuZXdTdGF0ZVtzZWxlY3RvclR5cGVdID0gJC5pc0FycmF5KHN0YXRlW3NlbGVjdG9yVHlwZV0pID8gW10gOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xyXG5cclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlVQREFURV9DT05URU5UX1ZBTFVFOlxyXG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xyXG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24ua2V5XSA9IGFjdGlvbi52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xyXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuU0VMRUNUX1RPVVJOQU1FTlQ6XHJcbiAgICAgICAgICAgIG5ld1N0YXRlID0ge307XHJcbiAgICAgICAgICAgIG5ld1N0YXRlLnRvdXJuYW1lbnQgPSBbYWN0aW9uLnRvdXJuYW1lbnRdO1xyXG4gICAgICAgICAgICBuZXdTdGF0ZS5zcG9ydHMgPSAoYWN0aW9uLnRvdXJuYW1lbnQuc3BvcnQgKSA/IFthY3Rpb24udG91cm5hbWVudC5zcG9ydF0gOiBbXTtcclxuICAgICAgICAgICAgbmV3U3RhdGUuc3BvcnRDYXRlZ29yeSA9IFthY3Rpb24udG91cm5hbWVudC5zcG9ydENhdGVnb3J5XTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xyXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuQVBQTFlfU0VMRUNUSU9OOlxyXG5cclxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1zID0gQXJyYXkuZnJvbSggYWN0aW9uLnNlbGVjdGVkSXRlbXMudmFsdWVzKCkgKTtcclxuXHJcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdID0gWy4uLnN0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdXTtcclxuXHJcbiAgICAgICAgICAgIGlmICggYWN0aW9uLm11bHRpcGxlICl7XHJcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IHNlbGVjdGVkSXRlbXM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXVthY3Rpb24uaW5kZXhdID0gc2VsZWN0ZWRJdGVtc1swXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCBhY3Rpb24uY2xlYW4gKXtcclxuICAgICAgICAgICAgICAgIGFjdGlvbi5jbGVhbi5mb3JFYWNoKChzZWxlY3RvclR5cGUpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U3RhdGVbc2VsZWN0b3JUeXBlXSA9ICQuaXNBcnJheShzdGF0ZVtzZWxlY3RvclR5cGVdKSA/IFtdIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcclxuICAgICAgICBjYXNlIGNvbnRlbnRUeXBlLlJFTU9WRV9GUk9NX01VTFRJUExFOlxyXG4gICAgICAgICAgICBuZXdTdGF0ZSA9IHt9O1xyXG4gICAgICAgICAgICBuZXdTdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXSA9IFsuLi5zdGF0ZVthY3Rpb24uc2VsZWN0b3JUeXBlXV07XHJcbiAgICAgICAgICAgIG5ld1N0YXRlW2FjdGlvbi5zZWxlY3RvclR5cGVdLnNwbGljZShhY3Rpb24uaW5kZXgsMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xyXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuU1VQRVJfUklHSFRTX1VQREFURUQ6XHJcblxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5yZXNldCApIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge3JpZ2h0c1BhY2thZ2UgOiBbXSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XHJcbiAgICAgICAgICAgICAgICByaWdodHNQYWNrYWdlIDogQXJyYXkuZnJvbShhY3Rpb24ucmlnaHRzUGFja2FnZS52YWx1ZXMoKSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhc2UgY29udGVudFR5cGUuVVBEQVRFX1BST0dSQU1TOlxyXG5cclxuICAgICAgICAgICAgbGV0IHByb2dyYW1zID0gWy4uLnN0YXRlLnByb2dyYW1zXTtcclxuXHJcbiAgICAgICAgICAgIGlmICggYWN0aW9uLm5hbWUgPT09IFwicmVtb3ZlXCIgKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCBwcm9ncmFtcy5sZW5ndGggPiAxICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyYW1zLnNwbGljZShhY3Rpb24uaW5kZXgsMSlcclxuICAgICAgICAgICAgICAgIH0gIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyYW1zWzBdPSB7bmFtZTogJycsIHNhdmVkOiBmYWxzZX1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcImFkZFwiICkgcHJvZ3JhbXMgPSBbLi4ucHJvZ3JhbXMsYWN0aW9uLnByb2dyYW1dO1xyXG4gICAgICAgICAgICBpZiAoIGFjdGlvbi5uYW1lID09PSBcInNhdmVcIiApIHByb2dyYW1zW2FjdGlvbi5pbmRleF0gPSBhY3Rpb24ucHJvZ3JhbTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHByb2dyYW1zIDogcHJvZ3JhbXNcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9jb250ZW50LmpzIiwiLyoqXHJcbiAqIFJlYWN0IE5hdGl2ZSBBcHBcclxuICogTWFkZSBieSBEYW5pZWwgUGFkaWxsYVxyXG4gKi9cclxuXHJcbmltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tICdyZWR1eCdcclxuaW1wb3J0IHtjb250ZW50fSBmcm9tIFwiLi9jb250ZW50XCI7XHJcbmltcG9ydCB7c2VsZWN0b3J9IGZyb20gXCIuL3NlbGVjdG9yXCI7XHJcblxyXG5jb25zdCByZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICBjb250ZW50LFxyXG4gICAgc2VsZWN0b3JcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZWR1Y2Vyc1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9zZWxsL3JlZHVjZXJzL2luZGV4LmpzIiwiXHJcbmV4cG9ydCBjb25zdCBzZWxlY3RvclR5cGU9IHtcclxuICAgIFRFU1Q6J1RFU1QnLFxyXG4gICAgT1BFTl9TRUxFQ1RPUjogJ09QRU5fU0VMRUNUT1InLFxyXG4gICAgQ0xPU0VfU0VMRUNUT1IgOiAnQ0xPU0VfU0VMRUNUT1InLFxyXG4gICAgQVBQTFlfU0VMRUNUSU9OIDogJ0FQUExZX1NFTEVDVElPTidcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZWxlY3RvciA9IChzdGF0ZSA9IHtcclxuICAgIHR5cGU6IFwic3BvcnRcIixcclxuICAgIG9wZW4gOiBmYWxzZSxcclxuICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxyXG4gICAgcG9wdWxhckl0ZW1zOiBbXVxyXG5cclxufSwgYWN0aW9uKSA9PiB7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLlRFU1Q6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgb3BlbjogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIHNlbGVjdG9yVHlwZS5PUEVOX1NFTEVDVE9SOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogYWN0aW9uLnNlbGVjdG9yVHlwZSxcclxuICAgICAgICAgICAgICAgIG9wZW4gOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaW5kZXggOiBhY3Rpb24uaW5kZXgsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rvckl0ZW1zOiBhY3Rpb24uc2VsZWN0b3JJdGVtcyxcclxuICAgICAgICAgICAgICAgIHBvcHVsYXJJdGVtczogYWN0aW9uLnBvcHVsYXJJdGVtcyxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUZpbHRlciA6IGFjdGlvbi5hY3RpdmVGaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICBtdWx0aXBsZSA6IGFjdGlvbi5tdWx0aXBsZSxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBhY3Rpb24uZGlzYWJsZWQsXHJcbiAgICAgICAgICAgICAgICBzaG93TmV3U3BvcnQgOiBhY3Rpb24uc2hvd05ld1Nwb3J0LFxyXG4gICAgICAgICAgICAgICAgc2hvd05ld1RvdXJuYW1lbnQgOiBhY3Rpb24uc2hvd05ld1RvdXJuYW1lbnQsXHJcbiAgICAgICAgICAgICAgICBzaG93TmV3Q2F0ZWdvcnkgOiBhY3Rpb24uc2hvd05ld0NhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgc2hvd05ld1NlYXNvbiA6IGFjdGlvbi5zaG93TmV3U2Vhc29uLFxyXG4gICAgICAgICAgICAgICAgc2hvd0FsbENvdW50cmllczogYWN0aW9uLnNob3dBbGxDb3VudHJpZXMsXHJcbiAgICAgICAgICAgICAgICBjbGVhbiA6IGFjdGlvbi5jbGVhbixcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSXRlbXM6IGFjdGlvbi5zZWxlY3RlZEl0ZW1zXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNhc2Ugc2VsZWN0b3JUeXBlLkNMT1NFX1NFTEVDVE9SOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogXCJcIixcclxuICAgICAgICAgICAgICAgIG9wZW4gOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgcG9wdWxhckl0ZW1zOiBbXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBjYXNlIHNlbGVjdG9yVHlwZS5BUFBMWV9TRUxFQ1RJT04gOlxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yVHlwZTogXCJcIixcclxuICAgICAgICAgICAgICAgIG9wZW4gOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9ySXRlbXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgcG9wdWxhckl0ZW1zOiBbXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9yZWR1Y2Vycy9zZWxlY3Rvci5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IFNlbGxGb3JtIGZyb20gXCIuL2NvbXBvbmVudHMvU2VsbEZvcm1cIjtcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnO1xyXG5cclxuY29uc3Qgc2VsbEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsbC1mb3JtLWNvbnRhaW5lcicpO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XHJcbiAgICAgICAgPFNlbGxGb3JtIHsuLi5zZWxsRm9ybS5kYXRhc2V0IH0gLz5cclxuICAgIDwvUHJvdmlkZXI+LFxyXG4gICAgc2VsbEZvcm1cclxuKTtcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHdpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG4gICAgQ29udGVudEFyZW5hLk1vZGVsID0gQ29udGVudEFyZW5hLk1vZGVsIHx8IHt9O1xyXG4gICAgQ29udGVudEFyZW5hLkZvcm0gPSBDb250ZW50QXJlbmEuRm9ybSB8fCB7fTtcclxuICAgIENvbnRlbnRBcmVuYS5UZXN0ID0gQ29udGVudEFyZW5hLlRlc3QgfHwge307XHJcblxyXG4gICAgJCgnI2xpY2Vuc2UtZmlsZS1zZWxlY3Rvci1oaWRkZW4nKS5jaGVja0ZpbGVUeXBlKHtcclxuICAgICAgICBhbGxvd2VkRXh0ZW5zaW9uczogWyAncGRmJywgJ2RvYycsICdkb2N4J10sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICQoJzxkaXYgLz4nKS5odG1sKCdGaWxlIHR5cGUgbm90IGFsbG93ZWQuIFBsZWFzZSB1cGxvYWQgYSAucGRmLCAuZG9jIG9yIC5kb2N4IGZpbGUnKS5kaWFsb2coKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcjZXZlbnQtZmlsZS1zZWxlY3Rvci1oaWRkZW4nKS5jaGVja0ZpbGVUeXBlKHtcclxuICAgICAgICBhbGxvd2VkRXh0ZW5zaW9uczogWydqcGcnLCAnanBlZycsJ3BuZycsICdwZGYnLCAnZG9jJywgJ2RvY3gnXSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldElkID0gXCIjXCIgKyAkKHRoaXMpLmF0dHIoXCJyZWZcIik7XHJcbiAgICAgICAgICAgICQoIHRhcmdldElkICkudmFsKCQodGhpcykudmFsKCkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0SWQgPSBcIiNcIiArICQodGhpcykuYXR0cihcInJlZlwiKTtcclxuICAgICAgICAgICAgJCggdGFyZ2V0SWQgKS5hdHRyKFwicGxhY2Vob2xkZXJcIiwgXCJBbGxvd2VkOiAucG5nLCAuanBnLCAucGRmLCAuZG9jLCAuZG9jeFwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgICAgICQodGhpcykudmFsKFwiXCIpO1xyXG4gICAgICAgICAgICAkKCc8ZGl2IC8+JykuaHRtbCgnRmlsZSB0eXBlIG5vdCBhbGxvd2VkJykuZGlhbG9nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgXCIjZG93bmxvYWQtY3N2LXNoZWV0XCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IGVudmhvc3R1cmwgKyBcImJ1bmRsZXMvYXBwL2RhdGEvY29udGVudC1kZXRhaWxzLmNzdlwiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLndlYnNpdGUnKS5tYXNrKFwiQVwiLCB7XHJcbiAgICAgICAgdHJhbnNsYXRpb246IHtcclxuICAgICAgICAgICAgXCJBXCI6IHsgcGF0dGVybjogL1tcXHcvXFwtLitdLywgcmVjdXJzaXZlOiB0cnVlIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlcnMgYWxsIHRoZSB0b29sdGlwc1xyXG4gICAgICovXHJcbiAgICAkKCBkb2N1bWVudCApLnRvb2x0aXAoKTtcclxuXHJcbiAgICAkKFwiLmhhcy1kYXRlcGlja2VyXCIpLmRhdGVwaWNrZXIoKTtcclxuXHJcbiAgICAkKFwiLm9wdGlvbmFsXCIpLmhpZGUoKTtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zZWxsLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgQ29udGVudEFyZW5hLlRlc3QgPSBDb250ZW50QXJlbmEuVGVzdCB8fCB7fTtcclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZVNhbGVzUGFja2FnZXMoKXtcclxuXHJcbiAgICAgICAgdmFyIHBhY2thZ2VzID0gW107XHJcblxyXG4gICAgICAgICQoXCIuc2FsZXMtcGFja2FnZVwiKS5lYWNoKGZ1bmN0aW9uKGssIHBhY2thZ2VDb250YWluZXIpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHNhbGVzUGFja2FnZSA9IG5ldyBDb250ZW50QXJlbmEuTW9kZWwuU2FsZXNQYWNrYWdlKCk7XHJcbiAgICAgICAgICAgIHZhciBpZCA9ICQocGFja2FnZUNvbnRhaW5lcikuYXR0cihcImlkXCIpLnJlcGxhY2UoXCJzYWxlcy1wYWNrYWdlLVwiLFwiXCIpO1xyXG5cclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLnRlcnJpdG9yaWVzID0gJChcIi50ZXJyaXRvcmllczpjaGVja2VkXCIsIHBhY2thZ2VDb250YWluZXIpLmF0dHIoXCJ2YWxcIik7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS5zYWxlc01ldGhvZCA9ICQoXCIuc2FsZXMtbWV0aG9kOmNoZWNrZWRcIiwgcGFja2FnZUNvbnRhaW5lcikuYXR0cihcInZhbFwiKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLmN1cnJlbmN5ID0gJChcIi5jdXJyZW5jeTpjaGVja2VkXCIsIHBhY2thZ2VDb250YWluZXIpLmF0dHIoXCJ2YWxcIik7XHJcbiAgICAgICAgICAgIHNhbGVzUGFja2FnZS5pZCA9IGlkO1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2UubmFtZSA9ICQoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICtcIi1uYW1lXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICBzYWxlc1BhY2thZ2UuZmVlID0gJChcIi5mZWU6dmlzaWJsZVwiLCBwYWNrYWdlQ29udGFpbmVyKS52YWwoKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLnRlcnJpdG9yeUJpZHMgPSAkKFwiI3NhbGVzLXBhY2thZ2UtXCIgKyBpZCArXCItdGVycml0b3J5LWJpZHNcIikuaXMoXCI6Y2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgc2FsZXNQYWNrYWdlLnRlcnJpdG9yeUFzUGFja2FnZSA9ICQoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICtcIi10ZXJyaXRvcmllcy1hcy1wYWNrYWdlXCIpLmlzKFwiOmNoZWNrZWRcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHNhbGVzUGFja2FnZS50ZXJyaXRvcmllcyA9PT0gXCJzZWxlY3RlZFwiKSBzYWxlc1BhY2thZ2Uuc2VsZWN0ZWRUZXJyaXRvcmllcyA9ICQoXCIjc2FsZXMtcGFja2FnZS1cIiArIGlkICtcIi10ZXJyaXRvcnktc2VsZWN0ZWRcIikuY2hvc2VuKCkudmFsKCk7XHJcbiAgICAgICAgICAgIGlmICggc2FsZXNQYWNrYWdlLnRlcnJpdG9yaWVzID09PSBcImV4Y2x1ZGVkXCIpIHNhbGVzUGFja2FnZS5leGNsdWRlZFRlcnJpdG9yaWVzID0gJChcIiNzYWxlcy1wYWNrYWdlLVwiICsgaWQgK1wiLXRlcnJpdG9yeS1leGNsdWRlZFwiKS5jaG9zZW4oKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHBhY2thZ2VzLnB1c2goc2FsZXNQYWNrYWdlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhY2thZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlU3RlcFR3bygpe1xyXG5cclxuICAgICAgICB2YXIgaGFzRXJyb3JzID0gZmFsc2UsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzID0gW10sXHJcbiAgICAgICAgICAgIGV4cGlyYXRpb25EYXRlID0gJChcIiNleHBpcmF0aW9uLWRhdGVcIiksXHJcbiAgICAgICAgICAgIHJpZ2h0cyA9IGNvbGxlY3RTZWxlY3RlZFJpZ2h0cygpLFxyXG4gICAgICAgICAgICBtZXNzYWdlc0NvbnRhaW5lciA9ICQoJzxkaXYgdGl0bGU9XCJUaGUgZm9ybSBpcyBpbmNvbXBsZXRlIVwiIC8+JyksXHJcbiAgICAgICAgICAgIHRvdGFsID0gMCxcclxuICAgICAgICAgICAgc2VsZWN0ZWRQYWNrYWdlcyA9IGdldEZ1bGxTZWxlY3RlZFBhY2thZ2VzKCk7XHJcblxyXG4gICAgICAgICQoXCIuaW5zdGFsbG1lbnQtcGVyY2VudFwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRvdGFsICs9IE51bWJlciAoICQodGhpcykudmFsKCkucmVwbGFjZShcIiVcIiwgXCJcIikgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIHRvdGFsICE9PSAxMDAgKSB7XHJcbiAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goICQoJzxkaXYgY2xhc3M9XCJwb3B1cC1lcnJvci1tZXNzYWdlXCIgLz4nKS5odG1sKCdUb3RhbCBpbnN0YWxsbWVudHMgbXVzdCBzdW0gMTAwJSEnKSApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5pbnN0YWxsbWVudHMgPSBjb2xsZWN0SW5zdGFsbG1lbnRzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5zYWxlc1BhY2thZ2VzID0gdmFsaWRhdGVTYWxlc1BhY2thZ2VzKCk7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkNvbnRlbnQuc2FsZXNQYWNrYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKHNhbGVzUGFja2FnZSl7XHJcbiAgICAgICAgICAgIHZhciB2YWxpZCA9IHNhbGVzUGFja2FnZS52YWxpZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCB2YWxpZC5oYXNFcnJvcnMgKXtcclxuICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKCAkKCc8ZGl2IGNsYXNzPVwicG9wdXAtZXJyb3ItbWVzc2FnZVwiIC8+JykuaHRtbCh2YWxpZC5kZXNjcmlwdGlvbikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LnJpZ2h0cyA9IHJpZ2h0cztcclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5wYWNrYWdlcyA9IHNlbGVjdGVkUGFja2FnZXMuc2VsZWN0ZWRJZHM7XHJcblxyXG4gICAgICAgIGlmICggZXhwaXJhdGlvbkRhdGUudmFsKCkgPT09IFwiXCIgKXtcclxuICAgICAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWVzc2FnZXMucHVzaCggJCgnPGRpdiBjbGFzcz1cInBvcHVwLWVycm9yLW1lc3NhZ2VcIiAvPicpLmh0bWwoJ1BsZWFzZSBzZWxlY3QgYW4gZXhwaXJhdGlvbiBkYXRlJykgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudC5leHBpcmVzQXQgPSAgZXhwaXJhdGlvbkRhdGUudmFsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIGhhc0Vycm9ycyApe1xyXG5cclxuICAgICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaCgoY29udGVudCk9PntcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzQ29udGFpbmVyLmFwcGVuZChjb250ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtZXNzYWdlc0NvbnRhaW5lci5kaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgbWluV2lkdGg6IDQwMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAhaGFzRXJyb3JzO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXBJbnN0YWxsbWVudCgpe1xyXG4gICAgICAgICQoXCIuaW5zdGFsbG1lbnQtcGVyY2VudFwiKS5vZmYoKS5tYXNrKCcwMDAlJywge3JldmVyc2U6IHRydWV9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb2xsZWN0SW5zdGFsbG1lbnRzKCl7XHJcblxyXG4gICAgICAgIHZhciBpbnN0YWxsbWVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgJChcIi5pbnN0YWxsbWVudFwiKS5lYWNoKGZ1bmN0aW9uKGssIHBhY2thZ2VDb250YWluZXIpe1xyXG5cclxuICAgICAgICAgICAgdmFyIGluc3RhbGxtZW50ID0ge307XHJcblxyXG4gICAgICAgICAgICBpbnN0YWxsbWVudC5wZXJjZW50ID0gJChcIi5pbnN0YWxsbWVudC1wZXJjZW50XCIsIHBhY2thZ2VDb250YWluZXIpLnZhbCgpLnJlcGxhY2UoXCIlXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBpbnN0YWxsbWVudC5kYXRlID0gJChcIi5pbnN0YWxsbWVudC1kYXRlXCIsIHBhY2thZ2VDb250YWluZXIpLnZhbCgpO1xyXG4gICAgICAgICAgICBpbnN0YWxsbWVudC5zaWduaW5nX2RheSA9ICQoXCIuaW5zdGFsbG1lbnQtZGF5c1wiLCBwYWNrYWdlQ29udGFpbmVyKS52YWwoKTtcclxuICAgICAgICAgICAgaW5zdGFsbG1lbnQuZ3JhbnRlZF9kYXkgPSAkKFwiLmdyYW50ZWQtZGF5c1wiKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGluc3RhbGxtZW50cy5wdXNoKGluc3RhbGxtZW50KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluc3RhbGxtZW50cztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdWJtaXRmb3JtKCkge1xyXG4gICAgICAgIHZhciB1cmwgPSBlbnZob3N0dXJsICsgJ3NlbGwvcHVibGlzaGVkJyxcclxuICAgICAgICAgICAgZm9ybSA9ICQoJyNteWZvcm0nKTtcclxuXHJcbiAgICAgICAgZm9ybS5hdHRyKCdhY3Rpb24nLCB1cmwpO1xyXG5cclxuICAgICAgICB2YXIgZGF0YSA9IEpTT04uc3RyaW5naWZ5KENvbnRlbnRBcmVuYS5Db250ZW50KTtcclxuXHJcbiAgICAgICAgJCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwianNvblwiLz4nKS52YWwoZGF0YSkuYXBwZW5kVG8oJyNteWZvcm0nKTtcclxuICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoKSB7fTtcclxuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIjdXBsb2FkLWFncmVlbWVudFwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKXtcclxuICAgICAgICAkKCcjbGljZW5zZS1maWxlLXNlbGVjdG9yLWhpZGRlbicpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKFwiI3ZpZXctYWdyZWVtZW50XCIpLm9uKCdjbGljaycsZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YWxpZGF0ZVN0ZXBUd28oKTtcclxuICAgICAgICAkKFwiI3ZpZXctYWdyZWVtZW50XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpLmFwcGVuZCgnPGkgY2xhc3M9XCJmYSBmYS1jb2cgZmEtc3BpblwiPicpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybCA6IGVudmhvc3R1cmwgKyAndjEvY29udHJhY3QvcHJldmlld3MnLFxyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGRhdGEgOiB7XHJcbiAgICAgICAgICAgICAgICBqc29uIDogSlNPTi5zdHJpbmdpZnkoQ29udGVudEFyZW5hLkNvbnRlbnQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbiggcmVzcG9uc2UgKXtcclxuICAgICAgICAgICAgICAgIENvbnRlbnRBcmVuYS5Db250ZW50LmlkID0gcmVzcG9uc2UuaWQ7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihlbnZob3N0dXJsICsgJ2NvbnRyYWN0L3ByZXZpZXc/aWQ9JysgcmVzcG9uc2UuaWQsIFwiX2JsYW5rXCIsJ2hlaWdodD02MDAsd2lkdGg9ODAwJyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI3ZpZXctYWdyZWVtZW50XCIpLmF0dHIoXCJkaXNhYmxlZFwiLCBudWxsKS5maW5kKCdpJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjYWRkLWluc3RhbGxtZW50XCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgaWYoJChcIi5pbnN0YWxsbWVudDpmaXJzdCBpbnB1dC5pbnN0YWxsbWVudC1wZXJjZW50XCIpLnZhbCgpPT0nMTAwJScpe1xyXG4gICAgICAgICAgICAkKFwiLmluc3RhbGxtZW50OmZpcnN0IGlucHV0Lmluc3RhbGxtZW50LXBlcmNlbnRcIikudmFsKCcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBwb3MgPSAkKFwiLmluc3RhbGxtZW50XCIpLmxlbmd0aCArIDEsXHJcbiAgICAgICAgICAgIGl0ZW0gPSAkKFwiLmluc3RhbGxtZW50Omxhc3RcIikuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgaXRlbS5hdHRyKFwiaWRcIiwgXCJpbnN0YWxsbWVudFwiICsgcG9zKTtcclxuICAgICAgICBpdGVtLmZpbmQoXCJzcGFuXCIpLmh0bWwoIENvbnRlbnRBcmVuYS5VdGlscy5hZGRPcmRpbmFsKHBvcykpO1xyXG4gICAgICAgIGl0ZW0uZmluZChcImlucHV0XCIpLnZhbChcIlwiKTtcclxuICAgICAgICBpdGVtLmluc2VydEFmdGVyKFwiLmluc3RhbGxtZW50Omxhc3RcIik7XHJcblxyXG4gICAgICAgIGl0ZW0uZmluZChcImlucHV0Lmhhc0RhdGVwaWNrZXJcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJpZFwiLCBudWxsKVxyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJoYXNEYXRlcGlja2VyXCIpXHJcbiAgICAgICAgICAgIC5kYXRlcGlja2VyKFwiZGVzdHJveVwiKS5vZmYoKS5kYXRlcGlja2VyKCk7XHJcblxyXG4gICAgICAgIC8vc2V0dXBJbnN0YWxsbWVudCgpXHJcblxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zZWxsLnN0ZXAyLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCBjb250ZW50IGZyb20gXCIuL3JlZHVjZXJzL2NvbnRlbnRcIjtcclxuaW1wb3J0IHJlZHVjZXJzIGZyb20gXCIuL3JlZHVjZXJzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyZWR1Y2Vycyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvc2VsbC9zdG9yZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=