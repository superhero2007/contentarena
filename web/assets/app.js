webpackJsonp([4],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzPzA3ZTkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXRhZ3NpbnB1dC9yZWFjdC10YWdzaW5wdXQuY3NzPzY3NmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi5qcyJdLCJuYW1lcyI6WyIkIiwiYWZ0ZXIiLCJhcHBlbmQiLCJ0b2dnbGUiLCJhZGRGaWVsZFRleHQiLCJpZCIsInRleHQiLCJjaGVja1ZhbHVlcyIsImZpcnN0IiwidmFsIiwic2Vjb25kIiwibGVuZ3RoIiwiZGlnaXQiLCJ0ZXN0IiwidXBwZXIiLCJzcGVjaWFsIiwibWF0Y2giLCJrZXl1cCIsImUiLCJyZXN1bHQiLCJ0b2dnbGVDbGFzcyIsIm5vdCIsInN1Ym1pdCIsImRvY3VtZW50Iiwib24iLCJ1cmwiLCJhdHRyIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibWFzayIsInRyYW5zbGF0aW9uIiwicGF0dGVybiIsInJlY3Vyc2l2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUM7Ozs7Ozs7Ozs7O0FDQUEseUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7Ozs7QUFJQTtDQUM2Qzs7QUFFN0NBLEVBQUUsWUFBVzs7QUFHVEEsTUFBRSwwQkFBRixFQUE4QkMsS0FBOUIsR0FBc0NDLE1BQXRDLENBQTZDLHNDQUE3QztBQUNBRixNQUFFLHNCQUFGLEVBQTBCRyxNQUExQixDQUFrQyxLQUFsQztBQUNBQyxpQkFBYSxRQUFiLEVBQXVCLDRCQUF2QjtBQUNBQSxpQkFBYSxPQUFiLEVBQXNCLHlCQUF0QjtBQUNBQSxpQkFBYSxRQUFiLEVBQXVCLFlBQXZCO0FBQ0FBLGlCQUFhLFNBQWIsRUFBd0IsdUJBQXhCO0FBQ0FBLGlCQUFhLE9BQWIsRUFBc0IsZ0JBQXRCOztBQUVBLGFBQVNBLFlBQVQsQ0FB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RUFBWixDQUFlLE9BQWYsRUFBd0IsY0FBeEIsRUFBd0MsWUFBWTtBQUNoRCxZQUFJQyxNQUFNekIsRUFBRSxJQUFGLEVBQVEwQixJQUFSLENBQWEsTUFBYixDQUFWO0FBQ0FDLGVBQU9DLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCSixHQUF2QjtBQUNILEtBSEQ7O0FBS0F6QixNQUFFLFVBQUYsRUFBYzhCLElBQWQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDcEJDLHFCQUFhO0FBQ1QsaUJBQUssRUFBRUMsU0FBUyxXQUFYLEVBQXdCQyxXQUFXLElBQW5DO0FBREk7QUFETyxLQUF4QjtBQU1ILENBbkZELEUiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlYWN0LXRhZ3NpbnB1dC9yZWFjdC10YWdzaW5wdXQuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC10YWdzaW5wdXQvcmVhY3QtdGFnc2lucHV0LmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG5pbXBvcnQgJ3JlYWN0LXRhYmxlL3JlYWN0LXRhYmxlLmNzcyc7XHJcbmltcG9ydCAncmVhY3QtdGFnc2lucHV0L3JlYWN0LXRhZ3NpbnB1dC5jc3MnIC8vIElmIHVzaW5nIFdlYlBhY2sgYW5kIHN0eWxlLWxvYWRlci5cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1cIikuYWZ0ZXIoKS5hcHBlbmQoXCI8ZGl2IGlkPSd2YWxpZGF0aW9uLW1lc3NhZ2VzJz48L2Rpdj5cIik7XHJcbiAgICAkKFwiI3ZhbGlkYXRpb24tbWVzc2FnZXNcIikudG9nZ2xlKCBmYWxzZSApO1xyXG4gICAgYWRkRmllbGRUZXh0KFwibGVuZ3RoXCIsIFwiQXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmdcIik7XHJcbiAgICBhZGRGaWVsZFRleHQoXCJ1cHBlclwiLCBcIk9uZSB1cHBlcmNhc2UgY2hhcmFjdGVyXCIpO1xyXG4gICAgYWRkRmllbGRUZXh0KFwibnVtYmVyXCIsIFwiT25lIG51bWJlclwiKTtcclxuICAgIGFkZEZpZWxkVGV4dChcInNwZWNpYWxcIiwgXCJPbmUgc3BlY2lhbCBjaGFyYWN0ZXJcIik7XHJcbiAgICBhZGRGaWVsZFRleHQoXCJtYXRjaFwiLCBcIlBhc3N3b3JkIG1hdGNoXCIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEZpZWxkVGV4dChpZCx0ZXh0KXtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWVzc2FnZXNcIikuYXBwZW5kKFwiPGRpdiBjbGFzcz0ncGFzc3dvcmQtZmllbGQnIGlkPSd2YWxpZGF0aW9uLVwiK2lkK1wiJz48aSBjbGFzcz0nZmEgZmEtdGltZXMtY2lyY2xlJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjxpIGNsYXNzPSdmYSBmYS1jaGVjay1jaXJjbGUnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+IFwiICsgdGV4dCArIFwiPC9kaXY+XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrVmFsdWVzKCl7XHJcbiAgICAgICAgdmFyIGZpcnN0ID0gICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9maXJzdFwiKS52YWwoKSxcclxuICAgICAgICAgICAgc2Vjb25kID0gICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9zZWNvbmRcIikudmFsKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA6ICggZmlyc3QubGVuZ3RoID49IDggKSxcclxuICAgICAgICAgICAgZGlnaXQgOiAvXFxkLy50ZXN0KGZpcnN0KSxcclxuICAgICAgICAgICAgdXBwZXIgOiAvW0EtWl0vLnRlc3QoZmlyc3QpLFxyXG4gICAgICAgICAgICBzcGVjaWFsIDogL1shQCMkJV4mKigpXytcXC09XFxbXFxde307JzpcIlxcXFx8LC48PlxcLz9dLy50ZXN0KGZpcnN0KSxcclxuICAgICAgICAgICAgbWF0Y2ggOiAoZmlyc3QgPT0gc2Vjb25kIClcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2Zvc191c2VyX3Jlc2V0dGluZ19mb3JtX3BsYWluUGFzc3dvcmRfZmlyc3RcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBjaGVja1ZhbHVlcygpO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWVzc2FnZXNcIikudG9nZ2xlKCB0cnVlICk7XHJcblxyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1sZW5ndGhcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLHJlc3VsdC5sZW5ndGgpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1sZW5ndGggLmZhLWNoZWNrLWNpcmNsZVwiKS50b2dnbGUoIHJlc3VsdC5sZW5ndGggKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbGVuZ3RoIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0Lmxlbmd0aCApO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbnVtYmVyXCIpLnRvZ2dsZUNsYXNzKFwidmFsaWQtZmllbGRcIiwgcmVzdWx0LmRpZ2l0KTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbnVtYmVyIC5mYS1jaGVjay1jaXJjbGVcIikudG9nZ2xlKCByZXN1bHQuZGlnaXQgKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbnVtYmVyIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0LmRpZ2l0ICk7XHJcblxyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi11cHBlclwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC51cHBlcik7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXVwcGVyIC5mYS1jaGVjay1jaXJjbGVcIikudG9nZ2xlKCByZXN1bHQudXBwZXIgKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tdXBwZXIgLmZhLXRpbWVzLWNpcmNsZVwiKS50b2dnbGUoICFyZXN1bHQudXBwZXIgKTtcclxuXHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXNwZWNpYWxcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLCByZXN1bHQuc3BlY2lhbCk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXNwZWNpYWwgLmZhLWNoZWNrLWNpcmNsZVwiKS50b2dnbGUoIHJlc3VsdC5zcGVjaWFsICk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXNwZWNpYWwgLmZhLXRpbWVzLWNpcmNsZVwiKS50b2dnbGUoICFyZXN1bHQuc3BlY2lhbCApO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWF0Y2hcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLCByZXN1bHQubWF0Y2gpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaCAuZmEtY2hlY2stY2lyY2xlXCIpLnRvZ2dsZSggcmVzdWx0Lm1hdGNoICk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW1hdGNoIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0Lm1hdGNoICk7XHJcblxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9zZWNvbmRcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBjaGVja1ZhbHVlcygpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaFwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC5tYXRjaCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcImZvcm1cIikubm90KFwiI215Zm9ybVwiKS5zdWJtaXQoZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBjaGVja1ZhbHVlcygpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQudXBwZXIgJiYgcmVzdWx0Lm1hdGNoICYmIHJlc3VsdC5zcGVjaWFsICYmIHJlc3VsdC5kaWdpdCAmJiByZXN1bHQubGVuZ3RoO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIubGluay1hY3Rpb25cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB1cmwgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLndlYnNpdGUnKS5tYXNrKFwiQVwiLCB7XHJcbiAgICAgICAgdHJhbnNsYXRpb246IHtcclxuICAgICAgICAgICAgXCJBXCI6IHsgcGF0dGVybjogL1tcXHcvXFwtLitdLywgcmVjdXJzaXZlOiB0cnVlIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=