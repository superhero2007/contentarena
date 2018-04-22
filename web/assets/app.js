webpackJsonp([3],{

/***/ "./node_modules/react-table/react-table.css":
/*!**************************************************!*\
  !*** ./node_modules/react-table/react-table.css ***!
  \**************************************************/
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
/**
 * Created by JuanCruz on 4/1/2018.
 */



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzPzA3ZTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvbWFpbi5qcyJdLCJuYW1lcyI6WyIkIiwiYWZ0ZXIiLCJhcHBlbmQiLCJ0b2dnbGUiLCJhZGRGaWVsZFRleHQiLCJpZCIsInRleHQiLCJjaGVja1ZhbHVlcyIsImZpcnN0IiwidmFsIiwic2Vjb25kIiwibGVuZ3RoIiwiZGlnaXQiLCJ0ZXN0IiwidXBwZXIiLCJzcGVjaWFsIiwibWF0Y2giLCJrZXl1cCIsImUiLCJyZXN1bHQiLCJ0b2dnbGVDbGFzcyIsIm5vdCIsInN1Ym1pdCIsImRvY3VtZW50Iiwib24iLCJ1cmwiLCJhdHRyIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibWFzayIsInRyYW5zbGF0aW9uIiwicGF0dGVybiIsInJlY3Vyc2l2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUM7Ozs7Ozs7Ozs7Ozs7O3lDQ0FBO0FBQUE7QUFBQTs7OztBQUlBOztBQUVBQSxFQUFFLFlBQVc7O0FBR1RBLE1BQUUsMEJBQUYsRUFBOEJDLEtBQTlCLEdBQXNDQyxNQUF0QyxDQUE2QyxzQ0FBN0M7QUFDQUYsTUFBRSxzQkFBRixFQUEwQkcsTUFBMUIsQ0FBa0MsS0FBbEM7QUFDQUMsaUJBQWEsUUFBYixFQUF1Qiw0QkFBdkI7QUFDQUEsaUJBQWEsT0FBYixFQUFzQix5QkFBdEI7QUFDQUEsaUJBQWEsUUFBYixFQUF1QixZQUF2QjtBQUNBQSxpQkFBYSxTQUFiLEVBQXdCLHVCQUF4QjtBQUNBQSxpQkFBYSxPQUFiLEVBQXNCLGdCQUF0Qjs7QUFFQSxhQUFTQSxZQUFULENBQXNCQyxFQUF0QixFQUF5QkMsSUFBekIsRUFBOEI7QUFDMUJOLFVBQUUsc0JBQUYsRUFBMEJFLE1BQTFCLENBQWlDLGdEQUE4Q0csRUFBOUMsR0FBaUQsK0dBQWpELEdBQW1LQyxJQUFuSyxHQUEwSyxRQUEzTTtBQUNIOztBQUVELGFBQVNDLFdBQVQsR0FBc0I7QUFDbEIsWUFBSUMsUUFBU1IsRUFBRSw4Q0FBRixFQUFrRFMsR0FBbEQsRUFBYjtBQUFBLFlBQ0lDLFNBQVVWLEVBQUUsK0NBQUYsRUFBbURTLEdBQW5ELEVBRGQ7O0FBR0EsZUFBTztBQUNIRSxvQkFBV0gsTUFBTUcsTUFBTixJQUFnQixDQUR4QjtBQUVIQyxtQkFBUSxLQUFLQyxJQUFMLENBQVVMLEtBQVYsQ0FGTDtBQUdITSxtQkFBUSxRQUFRRCxJQUFSLENBQWFMLEtBQWIsQ0FITDtBQUlITyxxQkFBVSx3Q0FBd0NGLElBQXhDLENBQTZDTCxLQUE3QyxDQUpQO0FBS0hRLG1CQUFTUixTQUFTRTtBQUxmLFNBQVA7QUFRSDs7QUFFRFYsTUFBRSw4Q0FBRixFQUFrRGlCLEtBQWxELENBQXdELFVBQVNDLENBQVQsRUFBVzs7QUFFL0QsWUFBSUMsU0FBU1osYUFBYjs7QUFFQVAsVUFBRSxzQkFBRixFQUEwQkcsTUFBMUIsQ0FBa0MsSUFBbEM7O0FBRUFILFVBQUUsb0JBQUYsRUFBd0JvQixXQUF4QixDQUFvQyxhQUFwQyxFQUFrREQsT0FBT1IsTUFBekQ7QUFDQVgsVUFBRSxxQ0FBRixFQUF5Q0csTUFBekMsQ0FBaURnQixPQUFPUixNQUF4RDtBQUNBWCxVQUFFLHFDQUFGLEVBQXlDRyxNQUF6QyxDQUFpRCxDQUFDZ0IsT0FBT1IsTUFBekQ7O0FBRUFYLFVBQUUsb0JBQUYsRUFBd0JvQixXQUF4QixDQUFvQyxhQUFwQyxFQUFtREQsT0FBT1AsS0FBMUQ7QUFDQVosVUFBRSxxQ0FBRixFQUF5Q0csTUFBekMsQ0FBaURnQixPQUFPUCxLQUF4RDtBQUNBWixVQUFFLHFDQUFGLEVBQXlDRyxNQUF6QyxDQUFpRCxDQUFDZ0IsT0FBT1AsS0FBekQ7O0FBRUFaLFVBQUUsbUJBQUYsRUFBdUJvQixXQUF2QixDQUFtQyxhQUFuQyxFQUFrREQsT0FBT0wsS0FBekQ7QUFDQWQsVUFBRSxvQ0FBRixFQUF3Q0csTUFBeEMsQ0FBZ0RnQixPQUFPTCxLQUF2RDtBQUNBZCxVQUFFLG9DQUFGLEVBQXdDRyxNQUF4QyxDQUFnRCxDQUFDZ0IsT0FBT0wsS0FBeEQ7O0FBRUFkLFVBQUUscUJBQUYsRUFBeUJvQixXQUF6QixDQUFxQyxhQUFyQyxFQUFvREQsT0FBT0osT0FBM0Q7QUFDQWYsVUFBRSxzQ0FBRixFQUEwQ0csTUFBMUMsQ0FBa0RnQixPQUFPSixPQUF6RDtBQUNBZixVQUFFLHNDQUFGLEVBQTBDRyxNQUExQyxDQUFrRCxDQUFDZ0IsT0FBT0osT0FBMUQ7O0FBRUFmLFVBQUUsbUJBQUYsRUFBdUJvQixXQUF2QixDQUFtQyxhQUFuQyxFQUFrREQsT0FBT0gsS0FBekQ7QUFDQWhCLFVBQUUsb0NBQUYsRUFBd0NHLE1BQXhDLENBQWdEZ0IsT0FBT0gsS0FBdkQ7QUFDQWhCLFVBQUUsb0NBQUYsRUFBd0NHLE1BQXhDLENBQWdELENBQUNnQixPQUFPSCxLQUF4RDtBQUdILEtBM0JEOztBQTZCQWhCLE1BQUUsK0NBQUYsRUFBbURpQixLQUFuRCxDQUF5RCxVQUFTQyxDQUFULEVBQVc7O0FBRWhFLFlBQUlDLFNBQVNaLGFBQWI7QUFDQVAsVUFBRSxtQkFBRixFQUF1Qm9CLFdBQXZCLENBQW1DLGFBQW5DLEVBQWtERCxPQUFPSCxLQUF6RDtBQUVILEtBTEQ7O0FBT0FoQixNQUFFLE1BQUYsRUFBVXFCLEdBQVYsQ0FBYyxTQUFkLEVBQXlCQyxNQUF6QixDQUFnQyxVQUFTSixDQUFULEVBQVc7O0FBRXZDLFlBQUlDLFNBQVNaLGFBQWI7QUFDQSxlQUFPWSxPQUFPTCxLQUFQLElBQWdCSyxPQUFPSCxLQUF2QixJQUFnQ0csT0FBT0osT0FBdkMsSUFBa0RJLE9BQU9QLEtBQXpELElBQWtFTyxPQUFPUixNQUFoRjtBQUVILEtBTEQ7O0FBT0FYLE1BQUV1QixRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGNBQXhCLEVBQXdDLFlBQVk7QUFDaEQsWUFBSUMsTUFBTXpCLEVBQUUsSUFBRixFQUFRMEIsSUFBUixDQUFhLE1BQWIsQ0FBVjtBQUNBQyxlQUFPQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QkosR0FBdkI7QUFDSCxLQUhEOztBQUtBekIsTUFBRSxVQUFGLEVBQWM4QixJQUFkLENBQW1CLEdBQW5CLEVBQXdCO0FBQ3BCQyxxQkFBYTtBQUNULGlCQUFLLEVBQUVDLFNBQVMsV0FBWCxFQUF3QkMsV0FBVyxJQUFuQztBQURJO0FBRE8sS0FBeEI7QUFNSCxDQW5GRCxFIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QtdGFibGUvcmVhY3QtdGFibGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3Ncbi8vIG1vZHVsZSBjaHVua3MgPSAzIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgSnVhbkNydXogb24gNC8xLzIwMTguXHJcbiAqL1xyXG5cclxuaW1wb3J0ICdyZWFjdC10YWJsZS9yZWFjdC10YWJsZS5jc3MnO1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuXHJcblxyXG4gICAgJChcIiNmb3NfdXNlcl9yZXNldHRpbmdfZm9ybVwiKS5hZnRlcigpLmFwcGVuZChcIjxkaXYgaWQ9J3ZhbGlkYXRpb24tbWVzc2FnZXMnPjwvZGl2PlwiKTtcclxuICAgICQoXCIjdmFsaWRhdGlvbi1tZXNzYWdlc1wiKS50b2dnbGUoIGZhbHNlICk7XHJcbiAgICBhZGRGaWVsZFRleHQoXCJsZW5ndGhcIiwgXCJBdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZ1wiKTtcclxuICAgIGFkZEZpZWxkVGV4dChcInVwcGVyXCIsIFwiT25lIHVwcGVyY2FzZSBjaGFyYWN0ZXJcIik7XHJcbiAgICBhZGRGaWVsZFRleHQoXCJudW1iZXJcIiwgXCJPbmUgbnVtYmVyXCIpO1xyXG4gICAgYWRkRmllbGRUZXh0KFwic3BlY2lhbFwiLCBcIk9uZSBzcGVjaWFsIGNoYXJhY3RlclwiKTtcclxuICAgIGFkZEZpZWxkVGV4dChcIm1hdGNoXCIsIFwiUGFzc3dvcmQgbWF0Y2hcIik7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkRmllbGRUZXh0KGlkLHRleHQpe1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tZXNzYWdlc1wiKS5hcHBlbmQoXCI8ZGl2IGNsYXNzPSdwYXNzd29yZC1maWVsZCcgaWQ9J3ZhbGlkYXRpb24tXCIraWQrXCInPjxpIGNsYXNzPSdmYSBmYS10aW1lcy1jaXJjbGUnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+PGkgY2xhc3M9J2ZhIGZhLWNoZWNrLWNpcmNsZScgYXJpYS1oaWRkZW49J3RydWUnPjwvaT4gXCIgKyB0ZXh0ICsgXCI8L2Rpdj5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tWYWx1ZXMoKXtcclxuICAgICAgICB2YXIgZmlyc3QgPSAgJChcIiNmb3NfdXNlcl9yZXNldHRpbmdfZm9ybV9wbGFpblBhc3N3b3JkX2ZpcnN0XCIpLnZhbCgpLFxyXG4gICAgICAgICAgICBzZWNvbmQgPSAgJChcIiNmb3NfdXNlcl9yZXNldHRpbmdfZm9ybV9wbGFpblBhc3N3b3JkX3NlY29uZFwiKS52YWwoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVuZ3RoIDogKCBmaXJzdC5sZW5ndGggPj0gOCApLFxyXG4gICAgICAgICAgICBkaWdpdCA6IC9cXGQvLnRlc3QoZmlyc3QpLFxyXG4gICAgICAgICAgICB1cHBlciA6IC9bQS1aXS8udGVzdChmaXJzdCksXHJcbiAgICAgICAgICAgIHNwZWNpYWwgOiAvWyFAIyQlXiYqKClfK1xcLT1cXFtcXF17fTsnOlwiXFxcXHwsLjw+XFwvP10vLnRlc3QoZmlyc3QpLFxyXG4gICAgICAgICAgICBtYXRjaCA6IChmaXJzdCA9PSBzZWNvbmQgKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9maXJzdFwiKS5rZXl1cChmdW5jdGlvbihlKXtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGNoZWNrVmFsdWVzKCk7XHJcblxyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tZXNzYWdlc1wiKS50b2dnbGUoIHRydWUgKTtcclxuXHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLWxlbmd0aFwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIscmVzdWx0Lmxlbmd0aCk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLWxlbmd0aCAuZmEtY2hlY2stY2lyY2xlXCIpLnRvZ2dsZSggcmVzdWx0Lmxlbmd0aCApO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1sZW5ndGggLmZhLXRpbWVzLWNpcmNsZVwiKS50b2dnbGUoICFyZXN1bHQubGVuZ3RoICk7XHJcblxyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1udW1iZXJcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLCByZXN1bHQuZGlnaXQpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1udW1iZXIgLmZhLWNoZWNrLWNpcmNsZVwiKS50b2dnbGUoIHJlc3VsdC5kaWdpdCApO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1udW1iZXIgLmZhLXRpbWVzLWNpcmNsZVwiKS50b2dnbGUoICFyZXN1bHQuZGlnaXQgKTtcclxuXHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXVwcGVyXCIpLnRvZ2dsZUNsYXNzKFwidmFsaWQtZmllbGRcIiwgcmVzdWx0LnVwcGVyKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tdXBwZXIgLmZhLWNoZWNrLWNpcmNsZVwiKS50b2dnbGUoIHJlc3VsdC51cHBlciApO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi11cHBlciAuZmEtdGltZXMtY2lyY2xlXCIpLnRvZ2dsZSggIXJlc3VsdC51cHBlciApO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tc3BlY2lhbFwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC5zcGVjaWFsKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tc3BlY2lhbCAuZmEtY2hlY2stY2lyY2xlXCIpLnRvZ2dsZSggcmVzdWx0LnNwZWNpYWwgKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tc3BlY2lhbCAuZmEtdGltZXMtY2lyY2xlXCIpLnRvZ2dsZSggIXJlc3VsdC5zcGVjaWFsICk7XHJcblxyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaFwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC5tYXRjaCk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW1hdGNoIC5mYS1jaGVjay1jaXJjbGVcIikudG9nZ2xlKCByZXN1bHQubWF0Y2ggKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWF0Y2ggLmZhLXRpbWVzLWNpcmNsZVwiKS50b2dnbGUoICFyZXN1bHQubWF0Y2ggKTtcclxuXHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNmb3NfdXNlcl9yZXNldHRpbmdfZm9ybV9wbGFpblBhc3N3b3JkX3NlY29uZFwiKS5rZXl1cChmdW5jdGlvbihlKXtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGNoZWNrVmFsdWVzKCk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW1hdGNoXCIpLnRvZ2dsZUNsYXNzKFwidmFsaWQtZmllbGRcIiwgcmVzdWx0Lm1hdGNoKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiZm9ybVwiKS5ub3QoXCIjbXlmb3JtXCIpLnN1Ym1pdChmdW5jdGlvbihlKXtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGNoZWNrVmFsdWVzKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC51cHBlciAmJiByZXN1bHQubWF0Y2ggJiYgcmVzdWx0LnNwZWNpYWwgJiYgcmVzdWx0LmRpZ2l0ICYmIHJlc3VsdC5sZW5ndGg7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5saW5rLWFjdGlvblwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHVybCA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcud2Vic2l0ZScpLm1hc2soXCJBXCIsIHtcclxuICAgICAgICB0cmFuc2xhdGlvbjoge1xyXG4gICAgICAgICAgICBcIkFcIjogeyBwYXR0ZXJuOiAvW1xcdy9cXC0uK10vLCByZWN1cnNpdmU6IHRydWUgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==