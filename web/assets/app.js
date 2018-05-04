webpackJsonp([4],{

/***/ "./node_modules/react-datepicker/dist/react-datepicker.css":
/*!*****************************************************************!*\
  !*** ./node_modules/react-datepicker/dist/react-datepicker.css ***!
  \*****************************************************************/
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

    $('.website').mask("A", {
        translation: {
            "A": { pattern: /[\w/\-.+]/, recursive: true }
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZXBpY2tlci9kaXN0L3JlYWN0LWRhdGVwaWNrZXIuY3NzPzY0NWMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcz8wN2U5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC10YWdzaW5wdXQvcmVhY3QtdGFnc2lucHV0LmNzcz82NzZhIiwid2VicGFjazovLy8uL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4uanMiXSwibmFtZXMiOlsiJCIsImFmdGVyIiwiYXBwZW5kIiwidG9nZ2xlIiwiYWRkRmllbGRUZXh0IiwiaWQiLCJ0ZXh0IiwiY2hlY2tWYWx1ZXMiLCJmaXJzdCIsInZhbCIsInNlY29uZCIsImxlbmd0aCIsImRpZ2l0IiwidGVzdCIsInVwcGVyIiwic3BlY2lhbCIsIm1hdGNoIiwia2V5dXAiLCJlIiwicmVzdWx0IiwidG9nZ2xlQ2xhc3MiLCJub3QiLCJzdWJtaXQiLCJkb2N1bWVudCIsIm9uIiwidXJsIiwiYXR0ciIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIm1hc2siLCJ0cmFuc2xhdGlvbiIsInBhdHRlcm4iLCJyZWN1cnNpdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7OztBQ0FBLHlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7Ozs7QUFJQTtDQUM2QztBQUM3Qzs7QUFFQUEsRUFBRSxZQUFXOztBQUdUQSxNQUFFLDBCQUFGLEVBQThCQyxLQUE5QixHQUFzQ0MsTUFBdEMsQ0FBNkMsc0NBQTdDO0FBQ0FGLE1BQUUsc0JBQUYsRUFBMEJHLE1BQTFCLENBQWtDLEtBQWxDO0FBQ0FDLGlCQUFhLFFBQWIsRUFBdUIsNEJBQXZCO0FBQ0FBLGlCQUFhLE9BQWIsRUFBc0IseUJBQXRCO0FBQ0FBLGlC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T0gsS0FBdkIsSUFBZ0NHLE9BQU9KLE9BQXZDLElBQWtESSxPQUFPUCxLQUF6RCxJQUFrRU8sT0FBT1IsTUFBaEY7QUFFSCxLQUxEOztBQU9BWCxNQUFFdUIsUUFBRixFQUFZQyxFQUFaLENBQWUsT0FBZixFQUF3QixjQUF4QixFQUF3QyxZQUFZO0FBQ2hELFlBQUlDLE1BQU16QixFQUFFLElBQUYsRUFBUTBCLElBQVIsQ0FBYSxNQUFiLENBQVY7QUFDQUMsZUFBT0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUJKLEdBQXZCO0FBQ0gsS0FIRDs7QUFLQXpCLE1BQUUsVUFBRixFQUFjOEIsSUFBZCxDQUFtQixHQUFuQixFQUF3QjtBQUNwQkMscUJBQWE7QUFDVCxpQkFBSyxFQUFFQyxTQUFTLFdBQVgsRUFBd0JDLFdBQVcsSUFBbkM7QUFESTtBQURPLEtBQXhCO0FBTUgsQ0FuRkQsRSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LWRhdGVwaWNrZXIvZGlzdC9yZWFjdC1kYXRlcGlja2VyLmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtZGF0ZXBpY2tlci9kaXN0L3JlYWN0LWRhdGVwaWNrZXIuY3NzXG4vLyBtb2R1bGUgY2h1bmtzID0gNCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC10YWdzaW5wdXQvcmVhY3QtdGFnc2lucHV0LmNzc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcmVhY3QtdGFnc2lucHV0L3JlYWN0LXRhZ3NpbnB1dC5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuaW1wb3J0ICdyZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3MnO1xyXG5pbXBvcnQgJ3JlYWN0LXRhZ3NpbnB1dC9yZWFjdC10YWdzaW5wdXQuY3NzJyAvLyBJZiB1c2luZyBXZWJQYWNrIGFuZCBzdHlsZS1sb2FkZXIuXHJcbmltcG9ydCAncmVhY3QtZGF0ZXBpY2tlci9kaXN0L3JlYWN0LWRhdGVwaWNrZXIuY3NzJztcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1cIikuYWZ0ZXIoKS5hcHBlbmQoXCI8ZGl2IGlkPSd2YWxpZGF0aW9uLW1lc3NhZ2VzJz48L2Rpdj5cIik7XHJcbiAgICAkKFwiI3ZhbGlkYXRpb24tbWVzc2FnZXNcIikudG9nZ2xlKCBmYWxzZSApO1xyXG4gICAgYWRkRmllbGRUZXh0KFwibGVuZ3RoXCIsIFwiQXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmdcIik7XHJcbiAgICBhZGRGaWVsZFRleHQoXCJ1cHBlclwiLCBcIk9uZSB1cHBlcmNhc2UgY2hhcmFjdGVyXCIpO1xyXG4gICAgYWRkRmllbGRUZXh0KFwibnVtYmVyXCIsIFwiT25lIG51bWJlclwiKTtcclxuICAgIGFkZEZpZWxkVGV4dChcInNwZWNpYWxcIiwgXCJPbmUgc3BlY2lhbCBjaGFyYWN0ZXJcIik7XHJcbiAgICBhZGRGaWVsZFRleHQoXCJtYXRjaFwiLCBcIlBhc3N3b3JkIG1hdGNoXCIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEZpZWxkVGV4dChpZCx0ZXh0KXtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWVzc2FnZXNcIikuYXBwZW5kKFwiPGRpdiBjbGFzcz0ncGFzc3dvcmQtZmllbGQnIGlkPSd2YWxpZGF0aW9uLVwiK2lkK1wiJz48aSBjbGFzcz0nZmEgZmEtdGltZXMtY2lyY2xlJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjxpIGNsYXNzPSdmYSBmYS1jaGVjay1jaXJjbGUnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+IFwiICsgdGV4dCArIFwiPC9kaXY+XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrVmFsdWVzKCl7XHJcbiAgICAgICAgdmFyIGZpcnN0ID0gICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9maXJzdFwiKS52YWwoKSxcclxuICAgICAgICAgICAgc2Vjb25kID0gICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9zZWNvbmRcIikudmFsKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA6ICggZmlyc3QubGVuZ3RoID49IDggKSxcclxuICAgICAgICAgICAgZGlnaXQgOiAvXFxkLy50ZXN0KGZpcnN0KSxcclxuICAgICAgICAgICAgdXBwZXIgOiAvW0EtWl0vLnRlc3QoZmlyc3QpLFxyXG4gICAgICAgICAgICBzcGVjaWFsIDogL1shQCMkJV4mKigpXytcXC09XFxbXFxde307JzpcIlxcXFx8LC48PlxcLz9dLy50ZXN0KGZpcnN0KSxcclxuICAgICAgICAgICAgbWF0Y2ggOiAoZmlyc3QgPT0gc2Vjb25kIClcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2Zvc191c2VyX3Jlc2V0dGluZ19mb3JtX3BsYWluUGFzc3dvcmRfZmlyc3RcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBjaGVja1ZhbHVlcygpO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWVzc2FnZXNcIikudG9nZ2xlKCB0cnVlICk7XHJcblxyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1sZW5ndGhcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLHJlc3VsdC5sZW5ndGgpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1sZW5ndGggLmZhLWNoZWNrLWNpcmNsZVwiKS50b2dnbGUoIHJlc3VsdC5sZW5ndGggKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbGVuZ3RoIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0Lmxlbmd0aCApO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbnVtYmVyXCIpLnRvZ2dsZUNsYXNzKFwidmFsaWQtZmllbGRcIiwgcmVzdWx0LmRpZ2l0KTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbnVtYmVyIC5mYS1jaGVjay1jaXJjbGVcIikudG9nZ2xlKCByZXN1bHQuZGlnaXQgKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbnVtYmVyIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0LmRpZ2l0ICk7XHJcblxyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi11cHBlclwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC51cHBlcik7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXVwcGVyIC5mYS1jaGVjay1jaXJjbGVcIikudG9nZ2xlKCByZXN1bHQudXBwZXIgKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tdXBwZXIgLmZhLXRpbWVzLWNpcmNsZVwiKS50b2dnbGUoICFyZXN1bHQudXBwZXIgKTtcclxuXHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXNwZWNpYWxcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLCByZXN1bHQuc3BlY2lhbCk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXNwZWNpYWwgLmZhLWNoZWNrLWNpcmNsZVwiKS50b2dnbGUoIHJlc3VsdC5zcGVjaWFsICk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXNwZWNpYWwgLmZhLXRpbWVzLWNpcmNsZVwiKS50b2dnbGUoICFyZXN1bHQuc3BlY2lhbCApO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWF0Y2hcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLCByZXN1bHQubWF0Y2gpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaCAuZmEtY2hlY2stY2lyY2xlXCIpLnRvZ2dsZSggcmVzdWx0Lm1hdGNoICk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW1hdGNoIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0Lm1hdGNoICk7XHJcblxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9zZWNvbmRcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBjaGVja1ZhbHVlcygpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaFwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC5tYXRjaCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcImZvcm1cIikubm90KFwiI215Zm9ybVwiKS5zdWJtaXQoZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBjaGVja1ZhbHVlcygpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQudXBwZXIgJiYgcmVzdWx0Lm1hdGNoICYmIHJlc3VsdC5zcGVjaWFsICYmIHJlc3VsdC5kaWdpdCAmJiByZXN1bHQubGVuZ3RoO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIubGluay1hY3Rpb25cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB1cmwgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLndlYnNpdGUnKS5tYXNrKFwiQVwiLCB7XHJcbiAgICAgICAgdHJhbnNsYXRpb246IHtcclxuICAgICAgICAgICAgXCJBXCI6IHsgcGF0dGVybjogL1tcXHcvXFwtLitdLywgcmVjdXJzaXZlOiB0cnVlIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=