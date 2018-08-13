webpackJsonp([5],{

/***/ "./node_modules/react-datepicker/dist/react-datepicker.css":
/*!*****************************************************************!*\
  !*** ./node_modules/react-datepicker/dist/react-datepicker.css ***!
  \*****************************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/react-select/dist/react-select.css":
/*!*********************************************************!*\
  !*** ./node_modules/react-select/dist/react-select.css ***!
  \*********************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/react-table/react-table.css":
/*!**************************************************!*\
  !*** ./node_modules/react-table/react-table.css ***!
  \**************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/react-tagsinput/react-tagsinput.css":
/*!**********************************************************!*\
  !*** ./node_modules/react-tagsinput/react-tagsinput.css ***!
  \**********************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/react-toggle/style.css":
/*!*********************************************!*\
  !*** ./node_modules/react-toggle/style.css ***!
  \*********************************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/AppBundle/Resources/public/javascript/main.js":
/*!***********************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main.js ***!
  \***********************************************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_table_react_table_css__ = __webpack_require__(/*! react-table/react-table.css */ "./node_modules/react-table/react-table.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_table_react_table_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_table_react_table_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tagsinput_react_tagsinput_css__ = __webpack_require__(/*! react-tagsinput/react-tagsinput.css */ "./node_modules/react-tagsinput/react-tagsinput.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_tagsinput_react_tagsinput_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_tagsinput_react_tagsinput_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_datepicker_dist_react_datepicker_css__ = __webpack_require__(/*! react-datepicker/dist/react-datepicker.css */ "./node_modules/react-datepicker/dist/react-datepicker.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_datepicker_dist_react_datepicker_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_datepicker_dist_react_datepicker_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_toggle_style_css__ = __webpack_require__(/*! react-toggle/style.css */ "./node_modules/react-toggle/style.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_toggle_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_toggle_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_select_dist_react_select_css__ = __webpack_require__(/*! react-select/dist/react-select.css */ "./node_modules/react-select/dist/react-select.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_select_dist_react_select_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_select_dist_react_select_css__);
/**
 * Created by JuanCruz on 4/1/2018.
 */


 // If using WebPack and style-loader.




$(function () {

    $("#fos_user_resetting_form").after().append("<div id='validation-messages'></div>");
    $("#validation-messages").toggle(false);
    addFieldText("length", "At least 8 characters long");
    addFieldText("upper", "One uppercase character");
    addFieldText("number", "One number");
    addFieldText("special", "One special character");
    addFieldText("match", "Password match");

    function addFieldText(id, text) {
        $("#validation-messages").append("<div class='password-field' id='validation-" + id + "'><i class='fa fa-times-circle' aria-hidden='true'></i><i class='fa fa-check-circle' aria-hidden='true'></i> " + text + "</div>");
    }

    function checkValues() {
        var first = $("#fos_user_resetting_form_plainPassword_first").val(),
            second = $("#fos_user_resetting_form_plainPassword_second").val();

        return {
            length: first.length >= 8,
            digit: /\d/.test(first),
            upper: /[A-Z]/.test(first),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(first),
            match: first == second
        };
    }

    $("#fos_user_resetting_form_plainPassword_first").keyup(function (e) {

        var result = checkValues();

        $("#validation-messages").toggle(true);

        $("#validation-length").toggleClass("valid-field", result.length);
        $("#validation-length .fa-check-circle").toggle(result.length);
        $("#validation-length .fa-times-circle").toggle(!result.length);

        $("#validation-number").toggleClass("valid-field", result.digit);
        $("#validation-number .fa-check-circle").toggle(result.digit);
        $("#validation-number .fa-times-circle").toggle(!result.digit);

        $("#validation-upper").toggleClass("valid-field", result.upper);
        $("#validation-upper .fa-check-circle").toggle(result.upper);
        $("#validation-upper .fa-times-circle").toggle(!result.upper);

        $("#validation-special").toggleClass("valid-field", result.special);
        $("#validation-special .fa-check-circle").toggle(result.special);
        $("#validation-special .fa-times-circle").toggle(!result.special);

        $("#validation-match").toggleClass("valid-field", result.match);
        $("#validation-match .fa-check-circle").toggle(result.match);
        $("#validation-match .fa-times-circle").toggle(!result.match);
    });

    $("#fos_user_resetting_form_plainPassword_second").keyup(function (e) {

        var result = checkValues();
        $("#validation-match").toggleClass("valid-field", result.match);
    });

    $("form").not("#myform").submit(function (e) {

        var result = checkValues();
        return result.upper && result.match && result.special && result.digit && result.length;
    });

    $(document).on("click", ".link-action", function () {
        var url = $(this).attr("href");
        window.location.href = url;
    });
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ 0:
/*!*****************************************************************!*\
  !*** multi ./src/AppBundle/Resources/public/javascript/main.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/AppBundle/Resources/public/javascript/main.js */"./src/AppBundle/Resources/public/javascript/main.js");


/***/ })

},[0]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZXBpY2tlci9kaXN0L3JlYWN0LWRhdGVwaWNrZXIuY3NzPzY0NWMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5jc3M/ODM0OSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzPzA3ZTkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXRhZ3NpbnB1dC9yZWFjdC10YWdzaW5wdXQuY3NzPzY3NmEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXRvZ2dsZS9zdHlsZS5jc3M/NDM2MCIsIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJhZnRlciIsImFwcGVuZCIsInRvZ2dsZSIsImFkZEZpZWxkVGV4dCIsImlkIiwidGV4dCIsImNoZWNrVmFsdWVzIiwiZmlyc3QiLCJ2YWwiLCJzZWNvbmQiLCJsZW5ndGgiLCJkaWdpdCIsInRlc3QiLCJ1cHBlciIsInNwZWNpYWwiLCJtYXRjaCIsImtleXVwIiwiZSIsInJlc3VsdCIsInRvZ2dsZUNsYXNzIiwibm90Iiwic3VibWl0IiwiZG9jdW1lbnQiLCJvbiIsInVybCIsImF0dHIiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBOzs7O0FBSUE7Q0FDNkM7QUFDN0M7QUFDQTtBQUNBOztBQUVBQSxFQUFFLFlBQVc7O0FBR1RBLE1BQUUsMEJBQUYsRUFBOEJDLEtBQTlCLEdBQXND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O0FBT0FoQixNQUFFLE1BQUYsRUFBVXFCLEdBQVYsQ0FBYyxTQUFkLEVBQXlCQyxNQUF6QixDQUFnQyxVQUFTSixDQUFULEVBQVc7O0FBRXZDLFlBQUlDLFNBQVNaLGFBQWI7QUFDQSxlQUFPWSxPQUFPTCxLQUFQLElBQWdCSyxPQUFPSCxLQUF2QixJQUFnQ0csT0FBT0osT0FBdkMsSUFBa0RJLE9BQU9QLEtBQXpELElBQWtFTyxPQUFPUixNQUFoRjtBQUVILEtBTEQ7O0FBT0FYLE1BQUV1QixRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGNBQXhCLEVBQXdDLFlBQVk7QUFDaEQsWUFBSUMsTUFBTXpCLEVBQUUsSUFBRixFQUFRMEIsSUFBUixDQUFhLE1BQWIsQ0FBVjtBQUNBQyxlQUFPQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QkosR0FBdkI7QUFDSCxLQUhEO0FBTUgsQ0E5RUQsRSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGVwaWNrZXIvZGlzdC9yZWFjdC1kYXRlcGlja2VyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZXBpY2tlci9kaXN0L3JlYWN0LWRhdGVwaWNrZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3Qtc2VsZWN0L2Rpc3QvcmVhY3Qtc2VsZWN0LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3Qtc2VsZWN0L2Rpc3QvcmVhY3Qtc2VsZWN0LmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDUiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtdGFnc2lucHV0L3JlYWN0LXRhZ3NpbnB1dC5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXRhZ3NpbnB1dC9yZWFjdC10YWdzaW5wdXQuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtdG9nZ2xlL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtdG9nZ2xlL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDUiLCIvKipcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXG4gKi9cblxuaW1wb3J0ICdyZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3MnO1xuaW1wb3J0ICdyZWFjdC10YWdzaW5wdXQvcmVhY3QtdGFnc2lucHV0LmNzcycgLy8gSWYgdXNpbmcgV2ViUGFjayBhbmQgc3R5bGUtbG9hZGVyLlxuaW1wb3J0ICdyZWFjdC1kYXRlcGlja2VyL2Rpc3QvcmVhY3QtZGF0ZXBpY2tlci5jc3MnO1xuaW1wb3J0IFwicmVhY3QtdG9nZ2xlL3N0eWxlLmNzc1wiO1xuaW1wb3J0ICdyZWFjdC1zZWxlY3QvZGlzdC9yZWFjdC1zZWxlY3QuY3NzJztcblxuJChmdW5jdGlvbigpIHtcblxuXG4gICAgJChcIiNmb3NfdXNlcl9yZXNldHRpbmdfZm9ybVwiKS5hZnRlcigpLmFwcGVuZChcIjxkaXYgaWQ9J3ZhbGlkYXRpb24tbWVzc2FnZXMnPjwvZGl2PlwiKTtcbiAgICAkKFwiI3ZhbGlkYXRpb24tbWVzc2FnZXNcIikudG9nZ2xlKCBmYWxzZSApO1xuICAgIGFkZEZpZWxkVGV4dChcImxlbmd0aFwiLCBcIkF0IGxlYXN0IDggY2hhcmFjdGVycyBsb25nXCIpO1xuICAgIGFkZEZpZWxkVGV4dChcInVwcGVyXCIsIFwiT25lIHVwcGVyY2FzZSBjaGFyYWN0ZXJcIik7XG4gICAgYWRkRmllbGRUZXh0KFwibnVtYmVyXCIsIFwiT25lIG51bWJlclwiKTtcbiAgICBhZGRGaWVsZFRleHQoXCJzcGVjaWFsXCIsIFwiT25lIHNwZWNpYWwgY2hhcmFjdGVyXCIpO1xuICAgIGFkZEZpZWxkVGV4dChcIm1hdGNoXCIsIFwiUGFzc3dvcmQgbWF0Y2hcIik7XG5cbiAgICBmdW5jdGlvbiBhZGRGaWVsZFRleHQoaWQsdGV4dCl7XG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tZXNzYWdlc1wiKS5hcHBlbmQoXCI8ZGl2IGNsYXNzPSdwYXNzd29yZC1maWVsZCcgaWQ9J3ZhbGlkYXRpb24tXCIraWQrXCInPjxpIGNsYXNzPSdmYSBmYS10aW1lcy1jaXJjbGUnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PGkgY2xhc3M9J2ZhIGZhLWNoZWNrLWNpcmNsZScgYXJpYS1oaWRkZW49J3RydWUnPjwvaT4gXCIgKyB0ZXh0ICsgXCI8L2Rpdj5cIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tWYWx1ZXMoKXtcbiAgICAgICAgdmFyIGZpcnN0ID0gICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9maXJzdFwiKS52YWwoKSxcbiAgICAgICAgICAgIHNlY29uZCA9ICAkKFwiI2Zvc191c2VyX3Jlc2V0dGluZ19mb3JtX3BsYWluUGFzc3dvcmRfc2Vjb25kXCIpLnZhbCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZW5ndGggOiAoIGZpcnN0Lmxlbmd0aCA+PSA4ICksXG4gICAgICAgICAgICBkaWdpdCA6IC9cXGQvLnRlc3QoZmlyc3QpLFxuICAgICAgICAgICAgdXBwZXIgOiAvW0EtWl0vLnRlc3QoZmlyc3QpLFxuICAgICAgICAgICAgc3BlY2lhbCA6IC9bIUAjJCVeJiooKV8rXFwtPVxcW1xcXXt9Oyc6XCJcXFxcfCwuPD5cXC8/XS8udGVzdChmaXJzdCksXG4gICAgICAgICAgICBtYXRjaCA6IChmaXJzdCA9PSBzZWNvbmQgKVxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgJChcIiNmb3NfdXNlcl9yZXNldHRpbmdfZm9ybV9wbGFpblBhc3N3b3JkX2ZpcnN0XCIpLmtleXVwKGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBjaGVja1ZhbHVlcygpO1xuXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tZXNzYWdlc1wiKS50b2dnbGUoIHRydWUgKTtcblxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbGVuZ3RoXCIpLnRvZ2dsZUNsYXNzKFwidmFsaWQtZmllbGRcIixyZXN1bHQubGVuZ3RoKTtcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLWxlbmd0aCAuZmEtY2hlY2stY2lyY2xlXCIpLnRvZ2dsZSggcmVzdWx0Lmxlbmd0aCApO1xuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbGVuZ3RoIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0Lmxlbmd0aCApO1xuXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1udW1iZXJcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLCByZXN1bHQuZGlnaXQpO1xuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbnVtYmVyIC5mYS1jaGVjay1jaXJjbGVcIikudG9nZ2xlKCByZXN1bHQuZGlnaXQgKTtcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW51bWJlciAuZmEtdGltZXMtY2lyY2xlXCIpLnRvZ2dsZSggIXJlc3VsdC5kaWdpdCApO1xuXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi11cHBlclwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC51cHBlcik7XG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi11cHBlciAuZmEtY2hlY2stY2lyY2xlXCIpLnRvZ2dsZSggcmVzdWx0LnVwcGVyICk7XG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi11cHBlciAuZmEtdGltZXMtY2lyY2xlXCIpLnRvZ2dsZSggIXJlc3VsdC51cHBlciApO1xuXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1zcGVjaWFsXCIpLnRvZ2dsZUNsYXNzKFwidmFsaWQtZmllbGRcIiwgcmVzdWx0LnNwZWNpYWwpO1xuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tc3BlY2lhbCAuZmEtY2hlY2stY2lyY2xlXCIpLnRvZ2dsZSggcmVzdWx0LnNwZWNpYWwgKTtcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXNwZWNpYWwgLmZhLXRpbWVzLWNpcmNsZVwiKS50b2dnbGUoICFyZXN1bHQuc3BlY2lhbCApO1xuXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaFwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC5tYXRjaCk7XG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaCAuZmEtY2hlY2stY2lyY2xlXCIpLnRvZ2dsZSggcmVzdWx0Lm1hdGNoICk7XG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaCAuZmEtdGltZXMtY2lyY2xlXCIpLnRvZ2dsZSggIXJlc3VsdC5tYXRjaCApO1xuXG5cbiAgICB9KTtcblxuICAgICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9zZWNvbmRcIikua2V5dXAoZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IGNoZWNrVmFsdWVzKCk7XG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaFwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC5tYXRjaCk7XG5cbiAgICB9KTtcblxuICAgICQoXCJmb3JtXCIpLm5vdChcIiNteWZvcm1cIikuc3VibWl0KGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgIHZhciByZXN1bHQgPSBjaGVja1ZhbHVlcygpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LnVwcGVyICYmIHJlc3VsdC5tYXRjaCAmJiByZXN1bHQuc3BlY2lhbCAmJiByZXN1bHQuZGlnaXQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5saW5rLWFjdGlvblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB1cmwgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICB9KTtcblxuXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=