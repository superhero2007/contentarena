webpackJsonp([2],{

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__containers_MarketPlace__ = __webpack_require__(/*! ./containers/MarketPlace */ "./src/AppBundle/Resources/public/javascript/buy/containers/MarketPlace.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by JuanCruz on 4/1/2018.
 */







__webpack_require__(/*! ../../scss/marketplace.scss */ "./src/AppBundle/Resources/public/scss/marketplace.scss");

var marketplaceContainer = document.getElementById('marketplace-wrapper');

var MarketplaceElement = function (_React$Component) {
    _inherits(MarketplaceElement, _React$Component);

    function MarketplaceElement(props) {
        _classCallCheck(this, MarketplaceElement);

        var _this2 = _possibleConstructorReturn(this, (MarketplaceElement.__proto__ || Object.getPrototypeOf(MarketplaceElement)).call(this, props));

        _this2.selectListing = function (id) {
            var _this = _this2;
            _this.setState({
                id: id,
                loadingListing: true
            });

            ContentArena.ContentApi.getByCustomId(id).done(function (content) {
                _this.setState({
                    content: content,
                    loadingListing: false
                });
            });
        };

        _this2.state = {
            loadingListing: false,
            countries: [],
            territories: []
        };
        return _this2;
    }

    _createClass(MarketplaceElement, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this = this;
            if (this.state.countries.length === 0) {
                ContentArena.Api.getCountriesFull().done(function (countries) {
                    _this.setState({ countries: countries });
                });
            }
            if (this.state.territories.length === 0) {
                ContentArena.Api.getTerritories().done(function (territories) {
                    _this.setState({ territories: territories });
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"],
                { store: __WEBPACK_IMPORTED_MODULE_3__store__["a" /* default */] },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__containers_MarketPlace__["a" /* default */], {
                    id: this.state.id,
                    content: this.state.content,
                    countries: this.state.countries,
                    territories: this.state.territories,
                    loadingListing: this.state.loadingListing })
            );
        }
    }]);

    return MarketplaceElement;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var MarketplaceApp = __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(MarketplaceElement, null), marketplaceContainer);

$(function () {

    ContentArena.Test = ContentArena.Test || {};

    $(document).on("click", ".content-box", function () {
        var id = $(this).data("contentId");

        MarketplaceApp.selectListing(id);
    });

    MarketplaceApp.selectListing($(".content-box").first().data("contentId"));

    ContentArena.Test.MarketPlace = function (id) {
        MarketplaceApp.test(id);
    };

    ContentArena.Api.getSports().done(function (sports) {
        ContentArena.Data.FullSports = sports;

        var select = $("#sports-event");

        ContentArena.Data.TopSports.forEach(function (sport) {
            select.append("<option class=\"sport subfilter\" id=\"sport-" + sport.externalId + "\" name=" + sport.externalId + " value='" + sport.externalId + "' toggle>" + sport.name + "</option>");
        });
    });

    ContentArena.Api.getTerritories().done(function (territories) {
        ContentArena.Data.AllTerritories = territories;

        var select = $("#territories-rights");

        ContentArena.Data.AllTerritories.forEach(function (territory) {
            select.append("<option class=\"territory subfilter\" value='" + territory.id + "' id='territory-" + territory.id + "' toggle>" + territory.name + "</option>");
        });
    });

    ContentArena.Api.getRightsPackage().done(function (rightsPackages) {
        ContentArena.Data.AllRightsPackages = rightsPackages;

        var container = $("#rights-packages");

        ContentArena.Data.AllRightsPackages.forEach(function (rightsPackage) {
            container.append("<p><input class='right_package subfilter' type='checkbox' id='" + rightsPackage.id + "'> " + rightsPackage.name + "</p>");
        });
    });

    ContentArena.Api.getContent().done(function (contents) {
        ContentArena.Data.AllContents = contents;

        var contents = $("#content-list-container");

        contents.append(ContentArena.Data.AllContents);
    });
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/buy/components/SalesPackage.js":
/*!**********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/components/SalesPackage.js ***!
  \**********************************************************************************/
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

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(SalesPackage));

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

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__SalesPackages__["a" /* default */], {
                    countries: this.props.countries,
                    territories: this.props.territories,
                    salesPackages: this.props.content.salesPackages })
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

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null);
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

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "listing-details" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "listing-details-buttons" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { onClick: function onClick() {
                                return _this2.showTab(1);
                            } },
                        "Commercial terms"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { onClick: function onClick() {
                                return _this2.showTab(2);
                            } },
                        "Content information"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { onClick: function onClick() {
                                return _this2.showTab(3);
                            } },
                        "Term Sheet"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { onClick: function onClick() {
                                return _this2.showTab(4);
                            } },
                        "Technical details"
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "button",
                        { onClick: function onClick() {
                                return _this2.showTab(5);
                            } },
                        "Seller"
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    null,
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        null,
                        "Do you have any questions? ",
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "button",
                            null,
                            "Contact Seller"
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "span",
                        null,
                        "Instant payment"
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "listing-details-content" },
                    this.state.tab === 1 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__CommercialTerms__["a" /* default */], {
                        territories: this.props.territories,
                        content: this.props.content,
                        countries: this.props.countries }),
                    this.state.tab === 2 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ContentInformation__["a" /* default */], { content: this.props.content }),
                    this.state.tab === 3 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__TermSheet__["a" /* default */], { content: this.props.content }),
                    this.state.tab === 4 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__TechnicalDetails__["a" /* default */], { content: this.props.content }),
                    this.state.tab === 5 && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Seller__["a" /* default */], { content: this.props.content })
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

/***/ "./src/AppBundle/Resources/public/javascript/buy/containers/MarketPlace.js":
/*!*********************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/containers/MarketPlace.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ListingDetails__ = __webpack_require__(/*! ./ListingDetails */ "./src/AppBundle/Resources/public/javascript/buy/containers/ListingDetails.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var MarketPlace = function (_React$Component) {
    _inherits(MarketPlace, _React$Component);

    function MarketPlace(props) {
        _classCallCheck(this, MarketPlace);

        var _this = _possibleConstructorReturn(this, (MarketPlace.__proto__ || Object.getPrototypeOf(MarketPlace)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(MarketPlace, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            console.log("MarketPlace - Props", nextProps);
        }
    }, {
        key: 'render',
        value: function render() {
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                { className: 'marketplace' },
                this.props.loadingListing && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-cog fa-spin' }),
                this.props.content && !this.props.loadingListing && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ListingDetails__["a" /* default */], {
                    id: this.props.id,
                    countries: this.props.countries,
                    territories: this.props.territories,
                    content: this.props.content })
            );
        }
    }]);

    return MarketPlace;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
    return state;
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

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(MarketPlace));

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var SalesPackages = function (_React$Component) {
    _inherits(SalesPackages, _React$Component);

    function SalesPackages(props) {
        _classCallCheck(this, SalesPackages);

        var _this = _possibleConstructorReturn(this, (SalesPackages.__proto__ || Object.getPrototypeOf(SalesPackages)).call(this, props));

        _this.showAll = function () {
            _this.setState({ limit: _this.state.availableCountries.size, showAll: false });
        };

        _this.getFilteredCountries = function () {
            var territory = _this.state.selectedTerritory;
            return [].concat(_toConsumableArray(_this.state.availableCountries)).filter(function (country) {
                return territory === 0 || territory === country.territoryId;
            });
        };

        var availableTerritories = new Set(),
            availableCountries = new Set();

        props.salesPackages.forEach(function (salesPackage) {
            if (!salesPackage.sellAsPackage) {

                availableCountries = salesPackage.worldwide ? new Set(props.countries) : new Set(salesPackage.selectedCountries);
                availableCountries.forEach(function (c) {
                    c.currency = salesPackage.currency.code;
                    c.fee = salesPackage.amount;
                    c.salesMethod = salesPackage.salesMethod.name;
                });
            }
        });

        availableCountries.forEach(function (c) {
            availableTerritories.add(c.territoryId);
        });

        _this.state = {
            availableTerritories: availableTerritories,
            availableCountries: availableCountries,
            selectedTerritory: 0,
            limit: 10,
            showAll: true
        };
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

            var filteredCountries = this.getFilteredCountries().slice(0, this.state.limit);
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                "div",
                { className: "sales-packages" },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "territories" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: this.state.selectedTerritory === 0 ? "territory selected" : "territory",
                            onClick: function onClick() {
                                _this2.setState({ selectedTerritory: 0 });
                            } },
                        "All"
                    ),
                    this.props.territories && this.props.territories.map(function (territory) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            {
                                className: "territory " + (_this2.state.selectedTerritory === territory.id ? "selected " : "") + (!_this2.state.availableTerritories.has(territory.id) ? "disabled" : ""),
                                onClick: function onClick() {
                                    _this2.setState({ selectedTerritory: territory.id });
                                } },
                            territory.name
                        );
                    })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { className: "countries" },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                        "div",
                        { className: "country-tr" },
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "country-th" },
                            "Territory"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "country-th" },
                            "Sales method"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "country-th" },
                            "Fee"
                        ),
                        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "country-th" },
                            "Currency"
                        )
                    ),
                    this.props.countries && filteredCountries.map(function (country) {
                        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                            "div",
                            { className: "country-tr" },
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "country-td" },
                                country.name
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "country-td" },
                                country.salesMethod
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "country-td" },
                                country.fee
                            ),
                            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                                "div",
                                { className: "country-td" },
                                country.currency
                            )
                        );
                    })
                ),
                this.state.showAll && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    "div",
                    { onClick: this.showAll },
                    "Show all"
                ),
                this.props.salesPackages && this.props.salesPackages.map(function (salesPackage) {
                    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_SalesPackage__["a" /* default */], { key: salesPackage.id, salesPackage: salesPackage });
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
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var TermSheet = function (_React$Component) {
    _inherits(TermSheet, _React$Component);

    function TermSheet(props) {
        _classCallCheck(this, TermSheet);

        var _this = _possibleConstructorReturn(this, (TermSheet.__proto__ || Object.getPrototypeOf(TermSheet)).call(this, props));

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

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null);
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

/***/ "./src/AppBundle/Resources/public/javascript/buy/contentFilterNew.js":
/*!***************************************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy/contentFilterNew.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    var Filter = function Filter() {
        var _this = this;
        this.territories = [];
        this.countries = [];
        this.sports = [];
        this.rights = [];
        this.orderBy = "createdAt";
        this.sortOrder = "DESC";
        this.fromDate = null;
        this.toDate = null;

        watch(this, function () {
            // console.log("Updating", arguments);

            if (_this.countries.length > 0) {
                $(".filter-territories-count").html("(" + _this.countries.length + ")");
                $(".select-territories").toggleClass("selected", true);
            } else if (_this.territories.length > 0) {
                $(".filter-territories-count").html("(" + _this.territories.length + ")");
                $(".select-territories").toggleClass("selected", true);
            } else {
                $(".filter-territories-count").html("");
                $(".select-territories").toggleClass("selected", false);
            }

            if (_this.sports.length > 0) {
                $(".filter-sports-count").html("(" + _this.sports.length + ")");
                $(".select-sports").toggleClass("selected", true);
            } else {
                $(".filter-sports-count").html("");
                $(".select-sports").toggleClass("selected", false);
            }
        });
    };

    window.ContentArena = window.ContentArena || {};
    window.ContentArena.Filter = new Filter();

    function updateFilter() {

        var territories = [],
            countries = [],
            rights = [],
            sports = [];

        $(".sport.selected").each(function () {
            sports.push({
                externalId: $(this).attr('id').replace("sport-", ""),
                value: $(this).attr('name')
            });
            $(this).trigger('');
        });

        $(".territory.selected").each(function () {
            territories.push($(this).attr('id').replace("territory-", ""));
        });

        $(".country.selected").each(function () {
            countries.push($(this).attr('id').replace("country-", ""));
        });

        $(".right_package:checked").each(function () {
            rights.push($(this).attr('id').replace("right-", ""));
        });

        ContentArena.Filter.countries = countries;
        ContentArena.Filter.territories = territories;
        ContentArena.Filter.rights = rights;
        ContentArena.Filter.sports = sports;
    }

    function applyFilter() {
        $("#content-list-container").html("<i class=\"fa fa-cog fa-spin\"></i>");
        ContentArena.Api.getContent(ContentArena.Filter).done(function (response) {
            $("#content-list-container").html(response);
        });
    }

    $(".filter").on('click', function () {
        $($(this).attr('ref')).dialog({
            modal: true,
            minWidth: 800,
            minHeight: 400
        });
    });

    $(document).on('click', '.subfilter', function () {
        var _this = $(this),
            toggle = _this.attr('toggle');

        _this.toggleClass('selected');

        if ((typeof toggle === "undefined" ? "undefined" : _typeof(toggle)) !== ( true ? "undefined" : _typeof(undefined)) && toggle !== false) {
            $("." + _this.attr('id')).toggle();
        }

        updateFilter();
    });

    $('.close').on('click', function () {
        var _this = $(this);
        if (_this.attr('clear')) {
            var clearSelectors = _this.attr('clear').split(", ");

            $.each(clearSelectors, function (k, v) {
                $(v).removeClass('selected');
                $(v + ".is-hidden").hide();
            });
        }

        $(_this.attr('ref')).dialog('close');

        updateFilter();
    });

    $(document).on('click', '.apply', function () {
        var _this = $(this);

        $(_this.attr('ref')).dialog('close');

        ContentArena.Filter.fromDate = $("#startDate").val();
        ContentArena.Filter.toDate = $("#endDate").val();

        ContentArena.Filter.event = $("#inputSearch").val();

        applyFilter();
    });

    $("#startDate").datepicker();

    $("#endDate").datepicker();

    $('#startDate').on('change', function () {
        var date = $(this).datepicker('getDate');
        date.setDate(date.getDate() + 1);
        $('#endDate').datepicker('option', 'minDate', date);
    });

    $("#clear-filter").on("click", function () {
        $(".selected", ".subfilter-container").removeClass("selected");
        updateFilter();
        applyFilter();
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

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




var reducers = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
    marketplace: __WEBPACK_IMPORTED_MODULE_1__marketplace__["a" /* marketplace */]
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
/*!****************************************************************************************************************************************!*\
  !*** multi ./src/AppBundle/Resources/public/javascript/buy/buy.js ./src/AppBundle/Resources/public/javascript/buy/contentFilterNew.js ***!
  \****************************************************************************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/buy/buy.js */"./src/AppBundle/Resources/public/javascript/buy/buy.js");
module.exports = __webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/buy/contentFilterNew.js */"./src/AppBundle/Resources/public/javascript/buy/contentFilterNew.js");


/***/ })

},[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvYWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvYnV5LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb21wb25lbnRzL1NhbGVzUGFja2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29udGFpbmVycy9Db21tZXJjaWFsVGVybXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbnRhaW5lcnMvQ29udGVudEluZm9ybWF0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL0xpc3RpbmdEZXRhaWxzLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL01hcmtldFBsYWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL1NhbGVzUGFja2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbnRhaW5lcnMvU2VsbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL1RlY2huaWNhbERldGFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbnRhaW5lcnMvVGVybVNoZWV0LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250ZW50RmlsdGVyTmV3LmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvcmVkdWNlcnMvbWFya2V0cGxhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9zY3NzL21hcmtldHBsYWNlLnNjc3M/NDdhYSJdLCJuYW1lcyI6WyJuZXh0VG9kb0lkIiwidGVzdCIsInR5cGUiLCJtYXJrZXRwbGFjZVR5cGVzIiwiVEVTVCIsImlkIiwidGV4dCIsInJlcXVpcmUiLCJtYXJrZXRwbGFjZUNvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJNYXJrZXRwbGFjZUVsZW1lbnQiLCJwcm9wcyIsInNlbGVjdExpc3RpbmciLCJfdGhpcyIsInNldFN0YXRlIiwibG9hZGluZ0xpc3RpbmciLCJDb250ZW50QXJlbmEiLCJDb250ZW50QXBpIiwiZ2V0QnlDdXN0b21JZCIsImRvbmUiLCJjb250ZW50Iiwic3RhdGUiLCJjb3VudHJpZXMiLCJ0ZXJyaXRvcmllcyIsImxlbmd0aCIsIkFwaSIsImdldENvdW50cmllc0Z1bGwiLCJnZXRUZXJyaXRvcmllcyIsIlJlYWN0IiwiQ29tcG9uZW50IiwiTWFya2V0cGxhY2VBcHAiLCJSZWFjdERPTSIsInJlbmRlciIsIiQiLCJUZXN0Iiwib24iLCJkYXRhIiwiZmlyc3QiLCJNYXJrZXRQbGFjZSIsImdldFNwb3J0cyIsInNwb3J0cyIsIkRhdGEiLCJGdWxsU3BvcnRzIiwic2VsZWN0IiwiVG9wU3BvcnRzIiwiZm9yRWFjaCIsInNwb3J0IiwiYXBwZW5kIiwiZXh0ZXJuYWxJZCIsIm5hbWUiLCJBbGxUZXJyaXRvcmllcyIsInRlcnJpdG9yeSIsImdldFJpZ2h0c1BhY2thZ2UiLCJyaWdodHNQYWNrYWdlcyIsIkFsbFJpZ2h0c1BhY2thZ2VzIiwiY29udGFpbmVyIiwicmlnaHRzUGFja2FnZSIsImdldENvbnRlbnQiLCJjb250ZW50cyIsIkFsbENvbnRlbnRzIiwiU2FsZXNQYWNrYWdlIiwic2hvd1RhYiIsInRhYiIsIm5leHRQcm9wcyIsInNhbGVzUGFja2FnZSIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsIm9uQ2xpY2siLCJkaXNwYXRjaCIsImNvbm5lY3QiLCJDb21tZXJjaWFsVGVybXMiLCJzYWxlc1BhY2thZ2VzIiwiQ29udGVudEluZm9ybWF0aW9uIiwiTGlzdGluZ0RldGFpbHMiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlTmV3U3BvcnQiLCJpbmRleCIsInNlbGVjdG9yVHlwZSIsIlNhbGVzUGFja2FnZXMiLCJzaG93QWxsIiwibGltaXQiLCJhdmFpbGFibGVDb3VudHJpZXMiLCJzaXplIiwiZ2V0RmlsdGVyZWRDb3VudHJpZXMiLCJzZWxlY3RlZFRlcnJpdG9yeSIsImZpbHRlciIsImNvdW50cnkiLCJ0ZXJyaXRvcnlJZCIsImF2YWlsYWJsZVRlcnJpdG9yaWVzIiwiU2V0Iiwic2VsbEFzUGFja2FnZSIsIndvcmxkd2lkZSIsInNlbGVjdGVkQ291bnRyaWVzIiwiYyIsImN1cnJlbmN5IiwiY29kZSIsImZlZSIsImFtb3VudCIsInNhbGVzTWV0aG9kIiwiYWRkIiwiZmlsdGVyZWRDb3VudHJpZXMiLCJzbGljZSIsIm1hcCIsImhhcyIsIlNlbGxlciIsImNvbXBhbnkiLCJkaXNwbGF5TmFtZSIsImxlZ2FsTmFtZSIsIndlYnNpdGUiLCJyZWdpc3RyYXRpb25OdW1iZXIiLCJ2YXQiLCJhZGRyZXNzIiwicGhvbmUiLCJ6aXAiLCJUZWNobmljYWxEZXRhaWxzIiwiVGVybVNoZWV0IiwiRmlsdGVyIiwicmlnaHRzIiwib3JkZXJCeSIsInNvcnRPcmRlciIsImZyb21EYXRlIiwidG9EYXRlIiwid2F0Y2giLCJodG1sIiwidG9nZ2xlQ2xhc3MiLCJ3aW5kb3ciLCJ1cGRhdGVGaWx0ZXIiLCJlYWNoIiwicHVzaCIsImF0dHIiLCJyZXBsYWNlIiwidmFsdWUiLCJ0cmlnZ2VyIiwiYXBwbHlGaWx0ZXIiLCJyZXNwb25zZSIsImRpYWxvZyIsIm1vZGFsIiwibWluV2lkdGgiLCJtaW5IZWlnaHQiLCJ0b2dnbGUiLCJ1bmRlZmluZWQiLCJjbGVhclNlbGVjdG9ycyIsInNwbGl0IiwiayIsInYiLCJyZW1vdmVDbGFzcyIsImhpZGUiLCJ2YWwiLCJldmVudCIsImRhdGVwaWNrZXIiLCJkYXRlIiwic2V0RGF0ZSIsImdldERhdGUiLCJyZWR1Y2VycyIsImNvbWJpbmVSZWR1Y2VycyIsIm1hcmtldHBsYWNlIiwidGVzdEl0ZW0iLCJhY3Rpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJjcmVhdGVTdG9yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBLElBQUlBLGFBQWEsQ0FBakI7O0FBRU8sSUFBTUMsT0FBTyxTQUFQQSxJQUFPO0FBQUEsV0FBUztBQUN6QkMsY0FBTSwrRUFBQUMsQ0FBaUJDLElBREU7QUFFekJDLFlBQUlMLFlBRnFCO0FBR3pCTTtBQUh5QixLQUFUO0FBQUEsQ0FBYixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBQUMsQ0FBUSwyRkFBUjs7QUFFQSxJQUFNQyx1QkFBdUJDLFNBQVNDLGNBQVQsQ0FBd0IscUJBQXhCLENBQTdCOztJQUVNQyxrQjs7O0FBQ0YsZ0NBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw2SUFDVEEsS0FE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bUJBQU80SixPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFrQjNJLEtBQWxCLEVBQXlCO0FBQzVCckIsc0JBQU04SixPQUFPekosSUFEZTtBQUU1QkQsb0JBQUswSixPQUFPMUo7QUFGZ0IsYUFBekIsQ0FBUDtBQUlKO0FBQ0ksbUJBQU9pQixLQUFQO0FBUFI7QUFTSCxDQWRNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNMUDtBQUFBOzs7O0FBSUE7QUFDQTtBQUNBOztBQUVBLHlEQUFlLDBEQUFBNEksQ0FBWSwwREFBWixDQUFmLEU7Ozs7Ozs7Ozs7OztBQ1JBLHlDIiwiZmlsZSI6ImJ1eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1hcmtldHBsYWNlVHlwZXMgfSBmcm9tICcuLi9yZWR1Y2Vycy9tYXJrZXRwbGFjZSc7XHJcblxyXG5sZXQgbmV4dFRvZG9JZCA9IDA7XHJcblxyXG5leHBvcnQgY29uc3QgdGVzdCA9IHRleHQgPT4gKHtcclxuICAgIHR5cGU6IG1hcmtldHBsYWNlVHlwZXMuVEVTVCxcclxuICAgIGlkOiBuZXh0VG9kb0lkKyssXHJcbiAgICB0ZXh0XHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9hY3Rpb25zL2luZGV4LmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCBNYXJrZXRQbGFjZSBmcm9tICcuL2NvbnRhaW5lcnMvTWFya2V0UGxhY2UnO1xyXG5cclxucmVxdWlyZSgnLi4vLi4vc2Nzcy9tYXJrZXRwbGFjZS5zY3NzJyk7XHJcblxyXG5jb25zdCBtYXJrZXRwbGFjZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXJrZXRwbGFjZS13cmFwcGVyJyk7XHJcblxyXG5jbGFzcyBNYXJrZXRwbGFjZUVsZW1lbnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgbG9hZGluZ0xpc3Rpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb3VudHJpZXMgOiBbXSxcclxuICAgICAgICAgICAgdGVycml0b3JpZXM6IFtdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoIHRoaXMuc3RhdGUuY291bnRyaWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldENvdW50cmllc0Z1bGwoKS5kb25lKCAoY291bnRyaWVzICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe2NvdW50cmllc30pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlLnRlcnJpdG9yaWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBDb250ZW50QXJlbmEuQXBpLmdldFRlcnJpdG9yaWVzKCkuZG9uZSggKHRlcnJpdG9yaWVzICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhdGUoe3RlcnJpdG9yaWVzfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RMaXN0aW5nID0gKGlkKSA9PiB7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlkIDogaWQsXHJcbiAgICAgICAgICAgIGxvYWRpbmdMaXN0aW5nIDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuQ29udGVudEFwaS5nZXRCeUN1c3RvbUlkKGlkKS5kb25lKChjb250ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgOiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgbG9hZGluZ0xpc3RpbmcgOiBmYWxzZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIgKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxyXG4gICAgICAgICAgICAgICAgPE1hcmtldFBsYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMuc3RhdGUuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudD17dGhpcy5zdGF0ZS5jb250ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50cmllcz17dGhpcy5zdGF0ZS5jb3VudHJpZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgdGVycml0b3JpZXM9e3RoaXMuc3RhdGUudGVycml0b3JpZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0xpc3Rpbmc9e3RoaXMuc3RhdGUubG9hZGluZ0xpc3Rpbmd9IC8+XHJcbiAgICAgICAgICAgIDwvUHJvdmlkZXI+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgTWFya2V0cGxhY2VBcHAgPSBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8TWFya2V0cGxhY2VFbGVtZW50Lz4sXHJcbiAgICBtYXJrZXRwbGFjZUNvbnRhaW5lclxyXG4pO1xyXG5cclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIENvbnRlbnRBcmVuYS5UZXN0ID0gQ29udGVudEFyZW5hLlRlc3QgfHwge307XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLmNvbnRlbnQtYm94XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKFwiY29udGVudElkXCIpO1xyXG5cclxuICAgICAgICBNYXJrZXRwbGFjZUFwcC5zZWxlY3RMaXN0aW5nKGlkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIE1hcmtldHBsYWNlQXBwLnNlbGVjdExpc3RpbmcoJChcIi5jb250ZW50LWJveFwiKS5maXJzdCgpLmRhdGEoXCJjb250ZW50SWRcIikpO1xyXG5cclxuXHJcblxyXG4gICAgQ29udGVudEFyZW5hLlRlc3QuTWFya2V0UGxhY2UgPSBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgTWFya2V0cGxhY2VBcHAudGVzdChpZClcclxuICAgIH07XHJcblxyXG4gICAgQ29udGVudEFyZW5hLkFwaS5nZXRTcG9ydHMoKS5kb25lKChzcG9ydHMpID0+IHtcclxuICAgICAgICBDb250ZW50QXJlbmEuRGF0YS5GdWxsU3BvcnRzID0gc3BvcnRzO1xyXG5cclxuICAgICAgICB2YXIgc2VsZWN0ID0gJChcIiNzcG9ydHMtZXZlbnRcIik7XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLlRvcFNwb3J0cy5mb3JFYWNoKGZ1bmN0aW9uIChzcG9ydCkge1xyXG4gICAgICAgICAgICBzZWxlY3QuYXBwZW5kKFwiPG9wdGlvbiBjbGFzcz1cXFwic3BvcnQgc3ViZmlsdGVyXFxcIiBpZD1cXFwic3BvcnQtXCIrc3BvcnQuZXh0ZXJuYWxJZCtcIlxcXCIgbmFtZT1cIitzcG9ydC5leHRlcm5hbElkK1wiIHZhbHVlPSdcIitzcG9ydC5leHRlcm5hbElkK1wiJyB0b2dnbGU+XCIrc3BvcnQubmFtZStcIjwvb3B0aW9uPlwiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgQ29udGVudEFyZW5hLkFwaS5nZXRUZXJyaXRvcmllcygpLmRvbmUoKHRlcnJpdG9yaWVzKSA9PiB7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkRhdGEuQWxsVGVycml0b3JpZXMgPSB0ZXJyaXRvcmllcztcclxuXHJcbiAgICAgICAgdmFyIHNlbGVjdCA9ICQoXCIjdGVycml0b3JpZXMtcmlnaHRzXCIpO1xyXG5cclxuICAgICAgICBDb250ZW50QXJlbmEuRGF0YS5BbGxUZXJyaXRvcmllcy5mb3JFYWNoKGZ1bmN0aW9uICh0ZXJyaXRvcnkpIHtcclxuICAgICAgICAgICAgc2VsZWN0LmFwcGVuZChcIjxvcHRpb24gY2xhc3M9XFxcInRlcnJpdG9yeSBzdWJmaWx0ZXJcXFwiIHZhbHVlPSdcIit0ZXJyaXRvcnkuaWQrXCInIGlkPSd0ZXJyaXRvcnktXCIrIHRlcnJpdG9yeS5pZCtcIicgdG9nZ2xlPlwiK3RlcnJpdG9yeS5uYW1lK1wiPC9vcHRpb24+XCIpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuQXBpLmdldFJpZ2h0c1BhY2thZ2UoKS5kb25lKChyaWdodHNQYWNrYWdlcykgPT4ge1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkFsbFJpZ2h0c1BhY2thZ2VzID0gcmlnaHRzUGFja2FnZXM7XHJcblxyXG4gICAgICAgIHZhciBjb250YWluZXIgPSAkKFwiI3JpZ2h0cy1wYWNrYWdlc1wiKTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkRhdGEuQWxsUmlnaHRzUGFja2FnZXMuZm9yRWFjaChmdW5jdGlvbiAocmlnaHRzUGFja2FnZSkge1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKFwiPHA+PGlucHV0IGNsYXNzPSdyaWdodF9wYWNrYWdlIHN1YmZpbHRlcicgdHlwZT0nY2hlY2tib3gnIGlkPSdcIityaWdodHNQYWNrYWdlLmlkK1wiJz4gXCIrcmlnaHRzUGFja2FnZS5uYW1lK1wiPC9wPlwiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgQ29udGVudEFyZW5hLkFwaS5nZXRDb250ZW50KCkuZG9uZSgoY29udGVudHMpID0+IHtcclxuICAgICAgICBDb250ZW50QXJlbmEuRGF0YS5BbGxDb250ZW50cyA9IGNvbnRlbnRzO1xyXG5cclxuICAgICAgICB2YXIgY29udGVudHMgPSAkKFwiI2NvbnRlbnQtbGlzdC1jb250YWluZXJcIik7XHJcblxyXG4gICAgICAgIGNvbnRlbnRzLmFwcGVuZChDb250ZW50QXJlbmEuRGF0YS5BbGxDb250ZW50cyk7XHJcbiAgICB9KTtcclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2J1eS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHsgdGVzdCB9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcblxyXG5jbGFzcyBTYWxlc1BhY2thZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VGFiID0gKHRhYikgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3RhYn0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zYWxlc1BhY2thZ2UuaWR9XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGVcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25DbGljazogaWQgPT4gZGlzcGF0Y2godGVzdChpZCkpXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNhbGVzUGFja2FnZSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29tcG9uZW50cy9TYWxlc1BhY2thZ2UuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xyXG5pbXBvcnQgU2FsZXNQYWNrYWdlcyBmcm9tIFwiLi9TYWxlc1BhY2thZ2VzXCI7XHJcblxyXG5jbGFzcyBDb21tZXJjaWFsVGVybXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPFNhbGVzUGFja2FnZXNcclxuICAgICAgICAgICAgICAgICAgICBjb3VudHJpZXM9e3RoaXMucHJvcHMuY291bnRyaWVzfVxyXG4gICAgICAgICAgICAgICAgICAgIHRlcnJpdG9yaWVzPXt0aGlzLnByb3BzLnRlcnJpdG9yaWVzfVxyXG4gICAgICAgICAgICAgICAgICAgIHNhbGVzUGFja2FnZXM9e3RoaXMucHJvcHMuY29udGVudC5zYWxlc1BhY2thZ2VzfS8+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGVcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25DbGljazogaWQgPT4gZGlzcGF0Y2godGVzdChpZCkpXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKENvbW1lcmNpYWxUZXJtcylcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29udGFpbmVycy9Db21tZXJjaWFsVGVybXMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xyXG5cclxuY2xhc3MgQ29udGVudEluZm9ybWF0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlXHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9uQ2xpY2s6IGlkID0+IGRpc3BhdGNoKHRlc3QoaWQpKVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShDb250ZW50SW5mb3JtYXRpb24pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbnRhaW5lcnMvQ29udGVudEluZm9ybWF0aW9uLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgeyB0ZXN0IH0gZnJvbSBcIi4uL2FjdGlvbnNcIjtcclxuaW1wb3J0IENvbW1lcmNpYWxUZXJtcyBmcm9tIFwiLi9Db21tZXJjaWFsVGVybXNcIjtcclxuaW1wb3J0IENvbnRlbnRJbmZvcm1hdGlvbiBmcm9tIFwiLi9Db250ZW50SW5mb3JtYXRpb25cIjtcclxuaW1wb3J0IFRlcm1TaGVldCBmcm9tIFwiLi9UZXJtU2hlZXRcIjtcclxuaW1wb3J0IFRlY2huaWNhbERldGFpbHMgZnJvbSBcIi4vVGVjaG5pY2FsRGV0YWlsc1wiO1xyXG5pbXBvcnQgU2VsbGVyIGZyb20gXCIuL1NlbGxlclwiO1xyXG5cclxuY2xhc3MgTGlzdGluZ0RldGFpbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgOiBwcm9wcy5jb250ZW50IHx8IHt9LFxyXG4gICAgICAgICAgICB0YWIgOiAxXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCAoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIH1cclxuXHJcbiAgICBzaG93VGFiID0gKHRhYikgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3RhYn0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlzdGluZy1kZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJsaXN0aW5nLWRldGFpbHMtYnV0dG9uc1wifT5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT50aGlzLnNob3dUYWIoMSl9PkNvbW1lcmNpYWwgdGVybXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT50aGlzLnNob3dUYWIoMil9PkNvbnRlbnQgaW5mb3JtYXRpb248L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT50aGlzLnNob3dUYWIoMyl9PlRlcm0gU2hlZXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpPT50aGlzLnNob3dUYWIoNCl9PlRlY2huaWNhbCBkZXRhaWxzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKT0+dGhpcy5zaG93VGFiKDUpfT5TZWxsZXI8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PkRvIHlvdSBoYXZlIGFueSBxdWVzdGlvbnM/IDxidXR0b24+Q29udGFjdCBTZWxsZXI8L2J1dHRvbj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5JbnN0YW50IHBheW1lbnQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImxpc3RpbmctZGV0YWlscy1jb250ZW50XCJ9PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudGFiID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tZXJjaWFsVGVybXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcnJpdG9yaWVzPXt0aGlzLnByb3BzLnRlcnJpdG9yaWVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD17dGhpcy5wcm9wcy5jb250ZW50fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRyaWVzPXt0aGlzLnByb3BzLmNvdW50cmllc30vPlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudGFiID09PSAyICYmIDxDb250ZW50SW5mb3JtYXRpb24gY29udGVudD17dGhpcy5wcm9wcy5jb250ZW50fS8+IH1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudGFiID09PSAzICYmIDxUZXJtU2hlZXQgY29udGVudD17dGhpcy5wcm9wcy5jb250ZW50fS8+IH1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuc3RhdGUudGFiID09PSA0ICYmIDxUZWNobmljYWxEZXRhaWxzIGNvbnRlbnQ9e3RoaXMucHJvcHMuY29udGVudH0vPiB9XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnRhYiA9PT0gNSAmJiA8U2VsbGVyIGNvbnRlbnQ9e3RoaXMucHJvcHMuY29udGVudH0vPiB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcclxuICAgIHJldHVybiBzdGF0ZVxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvbkNsaWNrOiBpZCA9PiBkaXNwYXRjaCh0ZXN0KGlkKSlcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoTGlzdGluZ0RldGFpbHMpXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L2NvbnRhaW5lcnMvTGlzdGluZ0RldGFpbHMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCBMaXN0aW5nRGV0YWlscyBmcm9tICcuL0xpc3RpbmdEZXRhaWxzJztcclxuXHJcbmNsYXNzIE1hcmtldFBsYWNlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFya2V0UGxhY2UgLSBQcm9wc1wiLCBuZXh0UHJvcHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcmtldHBsYWNlXCI+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sb2FkaW5nTGlzdGluZyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNvZyBmYS1zcGluXCIvPlxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNvbnRlbnQgJiYgIXRoaXMucHJvcHMubG9hZGluZ0xpc3RpbmcgJiZcclxuICAgICAgICAgICAgICAgICAgICA8TGlzdGluZ0RldGFpbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuaWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50cmllcz17dGhpcy5wcm9wcy5jb3VudHJpZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlcnJpdG9yaWVzPXt0aGlzLnByb3BzLnRlcnJpdG9yaWVzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXt0aGlzLnByb3BzLmNvbnRlbnR9Lz5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlXHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlbW92ZU5ld1Nwb3J0IDogKGluZGV4KSA9PiBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdSRU1PVkVfTkVXJyxcclxuICAgICAgICAgICAgaW5kZXggOiBpbmRleCxcclxuICAgICAgICAgICAgc2VsZWN0b3JUeXBlIDogXCJzcG9ydHNcIixcclxuICAgICAgICB9KSxcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShNYXJrZXRQbGFjZSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29udGFpbmVycy9NYXJrZXRQbGFjZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuaW1wb3J0IHsgdGVzdCB9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcbmltcG9ydCBTYWxlc1BhY2thZ2UgZnJvbSBcIi4uL2NvbXBvbmVudHMvU2FsZXNQYWNrYWdlXCJcclxuXHJcbmNsYXNzIFNhbGVzUGFja2FnZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgICAgICBsZXQgYXZhaWxhYmxlVGVycml0b3JpZXMgPSBuZXcgU2V0KCksXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUNvdW50cmllcyA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICAgICAgcHJvcHMuc2FsZXNQYWNrYWdlcy5mb3JFYWNoKChzYWxlc1BhY2thZ2UpPT57XHJcbiAgICAgICAgICAgIGlmICggIXNhbGVzUGFja2FnZS5zZWxsQXNQYWNrYWdlICl7XHJcblxyXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlQ291bnRyaWVzID0gKCBzYWxlc1BhY2thZ2Uud29ybGR3aWRlICkgPyBuZXcgU2V0KHByb3BzLmNvdW50cmllcykgOiBuZXcgU2V0KHNhbGVzUGFja2FnZS5zZWxlY3RlZENvdW50cmllcyk7XHJcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVDb3VudHJpZXMuZm9yRWFjaCgoYyk9PntcclxuICAgICAgICAgICAgICAgICAgICBjLmN1cnJlbmN5ID0gc2FsZXNQYWNrYWdlLmN1cnJlbmN5LmNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgYy5mZWUgPSBzYWxlc1BhY2thZ2UuYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGMuc2FsZXNNZXRob2QgPSBzYWxlc1BhY2thZ2Uuc2FsZXNNZXRob2QubmFtZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBhdmFpbGFibGVDb3VudHJpZXMuZm9yRWFjaCgoYyk9PnsgYXZhaWxhYmxlVGVycml0b3JpZXMuYWRkKGMudGVycml0b3J5SWQpfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZVRlcnJpdG9yaWVzIDogYXZhaWxhYmxlVGVycml0b3JpZXMsXHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUNvdW50cmllcyA6IGF2YWlsYWJsZUNvdW50cmllcyxcclxuICAgICAgICAgICAgc2VsZWN0ZWRUZXJyaXRvcnkgOiAwLFxyXG4gICAgICAgICAgICBsaW1pdCA6IDEwLFxyXG4gICAgICAgICAgICBzaG93QWxsIDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0FsbCA9ICgpID0+IHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7bGltaXQ6IHRoaXMuc3RhdGUuYXZhaWxhYmxlQ291bnRyaWVzLnNpemUsIHNob3dBbGw6IGZhbHNlfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldEZpbHRlcmVkQ291bnRyaWVzID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCB0ZXJyaXRvcnkgPSB0aGlzLnN0YXRlLnNlbGVjdGVkVGVycml0b3J5O1xyXG4gICAgICAgIHJldHVybiBbLi4udGhpcy5zdGF0ZS5hdmFpbGFibGVDb3VudHJpZXNdLmZpbHRlcigoY291bnRyeSkgPT4gKCB0ZXJyaXRvcnkgPT09IDAgfHwgdGVycml0b3J5ID09PSBjb3VudHJ5LnRlcnJpdG9yeUlkICkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGZpbHRlcmVkQ291bnRyaWVzID0gdGhpcy5nZXRGaWx0ZXJlZENvdW50cmllcygpLnNsaWNlKDAsIHRoaXMuc3RhdGUubGltaXQpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2FsZXMtcGFja2FnZXNcIj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlcnJpdG9yaWVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyh0aGlzLnN0YXRlLnNlbGVjdGVkVGVycml0b3J5ID09PSAwKSA/IFwidGVycml0b3J5IHNlbGVjdGVkXCIgOiBcInRlcnJpdG9yeVwiIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+e3RoaXMuc2V0U3RhdGUoe3NlbGVjdGVkVGVycml0b3J5OiAwfSl9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgQWxsXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMudGVycml0b3JpZXMgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50ZXJyaXRvcmllcy5tYXAoKHRlcnJpdG9yeSkgPT4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcInRlcnJpdG9yeSBcIiArICh0aGlzLnN0YXRlLnNlbGVjdGVkVGVycml0b3J5ID09PSB0ZXJyaXRvcnkuaWQgPyBcInNlbGVjdGVkIFwiIDogXCJcIiApICsgKCF0aGlzLnN0YXRlLmF2YWlsYWJsZVRlcnJpdG9yaWVzLmhhcyh0ZXJyaXRvcnkuaWQpID8gXCJkaXNhYmxlZFwiIDogXCJcIiApIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9Pnt0aGlzLnNldFN0YXRlKHtzZWxlY3RlZFRlcnJpdG9yeTogdGVycml0b3J5LmlkfSl9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGVycml0b3J5Lm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb3VudHJpZXNcIj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb3VudHJ5LXRyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY291bnRyeS10aFwiPlRlcnJpdG9yeTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvdW50cnktdGhcIj5TYWxlcyBtZXRob2Q8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb3VudHJ5LXRoXCI+RmVlPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY291bnRyeS10aFwiPkN1cnJlbmN5PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNvdW50cmllcyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQ291bnRyaWVzLm1hcCgoY291bnRyeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb3VudHJ5LXRyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvdW50cnktdGRcIj57Y291bnRyeS5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb3VudHJ5LXRkXCI+e2NvdW50cnkuc2FsZXNNZXRob2R9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvdW50cnktdGRcIj57Y291bnRyeS5mZWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvdW50cnktdGRcIj57Y291bnRyeS5jdXJyZW5jeX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNob3dBbGwgJiYgPGRpdiBvbkNsaWNrPXt0aGlzLnNob3dBbGx9PlNob3cgYWxsPC9kaXY+fVxyXG5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNhbGVzUGFja2FnZXMgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnNhbGVzUGFja2FnZXMubWFwKChzYWxlc1BhY2thZ2UpPT4oPFNhbGVzUGFja2FnZSBrZXk9e3NhbGVzUGFja2FnZS5pZH0gc2FsZXNQYWNrYWdlPXtzYWxlc1BhY2thZ2V9Lz4pKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4ge1xyXG4gICAgcmV0dXJuIHN0YXRlXHJcbn07XHJcblxyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9uQ2xpY2s6IGlkID0+IGRpc3BhdGNoKHRlc3QoaWQpKVxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoXHJcbiAgICBtYXBTdGF0ZVRvUHJvcHMsXHJcbiAgICBtYXBEaXNwYXRjaFRvUHJvcHNcclxuKShTYWxlc1BhY2thZ2VzKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL1NhbGVzUGFja2FnZXMuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xyXG5cclxuY2xhc3MgU2VsbGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY29udGVudC5jb21wYW55LmRpc3BsYXlOYW1lfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aDQ+Q29tcGFueSBkZXRhaWxzPC9oND5cclxuXHJcbiAgICAgICAgICAgICAgICA8aDU+TGVnYWwgY29tcGFueSBuYW1lPC9oNT5cclxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNvbnRlbnQuY29tcGFueS5sZWdhbE5hbWV9PC9wPlxyXG5cclxuICAgICAgICAgICAgICAgIDxoNT5XZWJzaXRlIFVybDwvaDU+XHJcbiAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jb250ZW50LmNvbXBhbnkud2Vic2l0ZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgPGg1PkNvbXBhbnkgUmVnaXN0cmF0aW9uIE51bWJlcjwvaDU+XHJcbiAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jb250ZW50LmNvbXBhbnkucmVnaXN0cmF0aW9uTnVtYmVyfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICA8aDU+VkFUIElEIG51bWJlcjwvaDU+XHJcbiAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jb250ZW50LmNvbXBhbnkudmF0fTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICA8aDU+QWRkcmVzczwvaDU+XHJcbiAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jb250ZW50LmNvbXBhbnkuYWRkcmVzc308L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgPGg1PlBob25lPC9oNT5cclxuICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLmNvbnRlbnQuY29tcGFueS5waG9uZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgPGg1PlpJUDwvaDU+XHJcbiAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jb250ZW50LmNvbXBhbnkuemlwfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICA8aDU+Q291bnRyeTwvaDU+XHJcbiAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jb250ZW50LmNvbXBhbnkuY291bnRyeS5uYW1lfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICA8aDQ+Q29tcGFueSBpbmZvcm1hdGlvbjwvaDQ+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XHJcbiAgICByZXR1cm4gc3RhdGVcclxufTtcclxuXHJcbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgb25DbGljazogaWQgPT4gZGlzcGF0Y2godGVzdChpZCkpXHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAgIG1hcFN0YXRlVG9Qcm9wcyxcclxuICAgIG1hcERpc3BhdGNoVG9Qcm9wc1xyXG4pKFNlbGxlcilcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29udGFpbmVycy9TZWxsZXIuanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7IHRlc3QgfSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xyXG5cclxuY2xhc3MgVGVjaG5pY2FsRGV0YWlscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcclxuICAgIHJldHVybiBzdGF0ZVxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvbkNsaWNrOiBpZCA9PiBkaXNwYXRjaCh0ZXN0KGlkKSlcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoVGVjaG5pY2FsRGV0YWlscylcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkvY29udGFpbmVycy9UZWNobmljYWxEZXRhaWxzLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgeyB0ZXN0IH0gZnJvbSBcIi4uL2FjdGlvbnNcIjtcclxuXHJcbmNsYXNzIFRlcm1TaGVldCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcclxuICAgIHJldHVybiBzdGF0ZVxyXG59O1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvbkNsaWNrOiBpZCA9PiBkaXNwYXRjaCh0ZXN0KGlkKSlcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KFxyXG4gICAgbWFwU3RhdGVUb1Byb3BzLFxyXG4gICAgbWFwRGlzcGF0Y2hUb1Byb3BzXHJcbikoVGVybVNoZWV0KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250YWluZXJzL1Rlcm1TaGVldC5qcyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgRmlsdGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnRlcnJpdG9yaWVzID0gW107XHJcbiAgICAgICAgdGhpcy5jb3VudHJpZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnNwb3J0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMucmlnaHRzID0gW107XHJcbiAgICAgICAgdGhpcy5vcmRlckJ5ID0gXCJjcmVhdGVkQXRcIjtcclxuICAgICAgICB0aGlzLnNvcnRPcmRlciA9IFwiREVTQ1wiO1xyXG4gICAgICAgIHRoaXMuZnJvbURhdGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudG9EYXRlID0gbnVsbDtcclxuXHJcbiAgICAgICAgd2F0Y2godGhpcywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVcGRhdGluZ1wiLCBhcmd1bWVudHMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCBfdGhpcy5jb3VudHJpZXMubGVuZ3RoID4gMCApIHtcclxuICAgICAgICAgICAgICAgICQoXCIuZmlsdGVyLXRlcnJpdG9yaWVzLWNvdW50XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwoIFwiKFwiICsgX3RoaXMuY291bnRyaWVzLmxlbmd0aCArIFwiKVwiICk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdC10ZXJyaXRvcmllc1wiKS50b2dnbGVDbGFzcyhcInNlbGVjdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF90aGlzLnRlcnJpdG9yaWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICQoXCIuZmlsdGVyLXRlcnJpdG9yaWVzLWNvdW50XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwoIFwiKFwiICsgX3RoaXMudGVycml0b3JpZXMubGVuZ3RoICsgXCIpXCIgKTtcclxuICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0LXRlcnJpdG9yaWVzXCIpLnRvZ2dsZUNsYXNzKFwic2VsZWN0ZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmZpbHRlci10ZXJyaXRvcmllcy1jb3VudFwiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zZWxlY3QtdGVycml0b3JpZXNcIikudG9nZ2xlQ2xhc3MoXCJzZWxlY3RlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICggX3RoaXMuc3BvcnRzLmxlbmd0aCA+IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmZpbHRlci1zcG9ydHMtY291bnRcIilcclxuICAgICAgICAgICAgICAgICAgICAuaHRtbCggXCIoXCIgKyBfdGhpcy5zcG9ydHMubGVuZ3RoICsgXCIpXCIgKTtcclxuICAgICAgICAgICAgICAgICQoXCIuc2VsZWN0LXNwb3J0c1wiKS50b2dnbGVDbGFzcyhcInNlbGVjdGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIi5maWx0ZXItc3BvcnRzLWNvdW50XCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnNlbGVjdC1zcG9ydHNcIikudG9nZ2xlQ2xhc3MoXCJzZWxlY3RlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5Db250ZW50QXJlbmEgPSB3aW5kb3cuQ29udGVudEFyZW5hIHx8IHt9O1xyXG4gICAgd2luZG93LkNvbnRlbnRBcmVuYS5GaWx0ZXIgPSBuZXcgRmlsdGVyKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlRmlsdGVyKCkge1xyXG5cclxuICAgICAgICB2YXIgdGVycml0b3JpZXMgPSBbXSxcclxuICAgICAgICAgICAgY291bnRyaWVzID0gW10sXHJcbiAgICAgICAgICAgIHJpZ2h0cyA9IFtdLFxyXG4gICAgICAgICAgICBzcG9ydHM9IFtdO1xyXG5cclxuICAgICAgICAkKFwiLnNwb3J0LnNlbGVjdGVkXCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc3BvcnRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZXh0ZXJuYWxJZCA6ICQodGhpcykuYXR0cignaWQnKS5yZXBsYWNlKFwic3BvcnQtXCIsIFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgOiAkKHRoaXMpLmF0dHIoJ25hbWUnKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCcnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJChcIi50ZXJyaXRvcnkuc2VsZWN0ZWRcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0ZXJyaXRvcmllcy5wdXNoKCAkKHRoaXMpLmF0dHIoJ2lkJykucmVwbGFjZShcInRlcnJpdG9yeS1cIiwgXCJcIikgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKFwiLmNvdW50cnkuc2VsZWN0ZWRcIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb3VudHJpZXMucHVzaCggJCh0aGlzKS5hdHRyKCdpZCcpLnJlcGxhY2UoXCJjb3VudHJ5LVwiLCBcIlwiKSApXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoXCIucmlnaHRfcGFja2FnZTpjaGVja2VkXCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgcmlnaHRzLnB1c2goICQodGhpcykuYXR0cignaWQnKS5yZXBsYWNlKFwicmlnaHQtXCIsIFwiXCIpIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkZpbHRlci5jb3VudHJpZXMgPSBjb3VudHJpZXM7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkZpbHRlci50ZXJyaXRvcmllcyA9IHRlcnJpdG9yaWVzO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5GaWx0ZXIucmlnaHRzID0gcmlnaHRzO1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5GaWx0ZXIuc3BvcnRzID0gc3BvcnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGx5RmlsdGVyKCl7XHJcbiAgICAgICAgJChcIiNjb250ZW50LWxpc3QtY29udGFpbmVyXCIpLmh0bWwoXCI8aSBjbGFzcz1cXFwiZmEgZmEtY29nIGZhLXNwaW5cXFwiPjwvaT5cIik7XHJcbiAgICAgICAgQ29udGVudEFyZW5hLkFwaS5nZXRDb250ZW50KENvbnRlbnRBcmVuYS5GaWx0ZXIpLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICQoXCIjY29udGVudC1saXN0LWNvbnRhaW5lclwiKS5odG1sKHJlc3BvbnNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiLmZpbHRlclwiKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgkKHRoaXMpLmF0dHIoJ3JlZicpKS5kaWFsb2coe1xyXG4gICAgICAgICAgICBtb2RhbCA6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbldpZHRoIDogODAwLFxyXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IDQwMFxyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCcuc3ViZmlsdGVyJywgZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICB0b2dnbGUgPSBfdGhpcy5hdHRyKCd0b2dnbGUnKTtcclxuXHJcbiAgICAgICAgX3RoaXMudG9nZ2xlQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdG9nZ2xlICE9PSB0eXBlb2YgdW5kZWZpbmVkICYmIHRvZ2dsZSAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgJChcIi5cIitfdGhpcy5hdHRyKCdpZCcpKS50b2dnbGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZUZpbHRlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmKF90aGlzLmF0dHIoJ2NsZWFyJykpe1xyXG4gICAgICAgICAgICB2YXIgY2xlYXJTZWxlY3RvcnMgPSBfdGhpcy5hdHRyKCdjbGVhcicpLnNwbGl0KFwiLCBcIik7XHJcblxyXG4gICAgICAgICAgICAkLmVhY2goIGNsZWFyU2VsZWN0b3JzLCBmdW5jdGlvbiAoaywgdil7XHJcbiAgICAgICAgICAgICAgICAkKHYpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgJCh2K1wiLmlzLWhpZGRlblwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCggX3RoaXMuYXR0cigncmVmJykpLmRpYWxvZygnY2xvc2UnKTtcclxuXHJcbiAgICAgICAgdXBkYXRlRmlsdGVyKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywnLmFwcGx5JyxmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBfdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICQoIF90aGlzLmF0dHIoJ3JlZicpKS5kaWFsb2coJ2Nsb3NlJyk7XHJcblxyXG4gICAgICAgIENvbnRlbnRBcmVuYS5GaWx0ZXIuZnJvbURhdGUgPSAkKFwiI3N0YXJ0RGF0ZVwiKS52YWwoKTtcclxuICAgICAgICBDb250ZW50QXJlbmEuRmlsdGVyLnRvRGF0ZSA9ICQoXCIjZW5kRGF0ZVwiKS52YWwoKTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkZpbHRlci5ldmVudCA9ICQoXCIjaW5wdXRTZWFyY2hcIikudmFsKCk7XHJcblxyXG4gICAgICAgIGFwcGx5RmlsdGVyKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNzdGFydERhdGVcIikuZGF0ZXBpY2tlcigpO1xyXG5cclxuICAgICQoXCIjZW5kRGF0ZVwiKS5kYXRlcGlja2VyKCk7XHJcblxyXG4gICAgJCgnI3N0YXJ0RGF0ZScpLm9uKCdjaGFuZ2UnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGRhdGUgPSAkKHRoaXMpLmRhdGVwaWNrZXIoJ2dldERhdGUnKTtcclxuICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkrMSk7XHJcbiAgICAgICAgJCgnI2VuZERhdGUnKS5kYXRlcGlja2VyKCdvcHRpb24nLCAnbWluRGF0ZScsIGRhdGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjbGVhci1maWx0ZXJcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5zZWxlY3RlZFwiLCBcIi5zdWJmaWx0ZXItY29udGFpbmVyXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgdXBkYXRlRmlsdGVyKCk7XHJcbiAgICAgICAgYXBwbHlGaWx0ZXIoKTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9jb250ZW50RmlsdGVyTmV3LmpzIiwiXHJcbmltcG9ydCB7Y29tYmluZVJlZHVjZXJzfSBmcm9tICdyZWR1eCdcclxuaW1wb3J0IHttYXJrZXRwbGFjZX0gZnJvbSBcIi4vbWFya2V0cGxhY2VcIjtcclxuXHJcbmNvbnN0IHJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcclxuICAgIG1hcmtldHBsYWNlXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVkdWNlcnNcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL2luZGV4LmpzIiwiXHJcbmV4cG9ydCBjb25zdCBtYXJrZXRwbGFjZVR5cGVzPSB7XHJcbiAgICBURVNUOidURVNUJyxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBtYXJrZXRwbGFjZSA9IChzdGF0ZSA9IHtcclxuICAgIHRlc3RJdGVtOiBcIm1hcmtldHBsYWNlUmVkdWNlclwiXHJcblxyXG59LCBhY3Rpb24pID0+IHtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBtYXJrZXRwbGFjZVR5cGVzLlRFU1Q6XHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgdGVzdDogYWN0aW9uLnRleHQsXHJcbiAgICAgICAgICAgICAgICBpZCA6IGFjdGlvbi5pZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5L3JlZHVjZXJzL21hcmtldHBsYWNlLmpzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCByZWR1Y2VycyBmcm9tIFwiLi9yZWR1Y2Vyc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU3RvcmUocmVkdWNlcnMpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L2J1eS9zdG9yZS5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvc2Nzcy9tYXJrZXRwbGFjZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9zY3NzL21hcmtldHBsYWNlLnNjc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSAyIl0sInNvdXJjZVJvb3QiOiIifQ==