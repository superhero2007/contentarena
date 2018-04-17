webpackJsonp([4],{

/***/ "./src/AppBundle/Resources/public/javascript/main.js":
/*!***********************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/main.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJhZnRlciIsImFwcGVuZCIsInRvZ2dsZSIsImFkZEZpZWxkVGV4dCIsImlkIiwidGV4dCIsImNoZWNrVmFsdWVzIiwiZmlyc3QiLCJ2YWwiLCJzZWNvbmQiLCJsZW5ndGgiLCJkaWdpdCIsInRlc3QiLCJ1cHBlciIsInNwZWNpYWwiLCJtYXRjaCIsImtleXVwIiwiZSIsInJlc3VsdCIsInRvZ2dsZUNsYXNzIiwibm90Iiwic3VibWl0IiwiZG9jdW1lbnQiLCJvbiIsInVybCIsImF0dHIiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJtYXNrIiwidHJhbnNsYXRpb24iLCJwYXR0ZXJuIiwicmVjdXJzaXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFJQUEsRUFBRSxZQUFXOztBQUdUQSxNQUFFLDBCQUFGLEVBQThCQyxLQUE5QixHQUFzQ0MsTUFBdEMsQ0FBNkMsc0NBQTdDO0FBQ0FGLE1BQUUsc0JBQUYsRUFBMEJHLE1BQTFCLENBQWtDLEtBQWxDO0FBQ0FDLGlCQUFhLFFBQWIsRUFBdUIsNEJBQXZCO0FBQ0FBLGlCQUFhLE9BQWIsRUFBc0IseUJBQXRCO0FBQ0FBLGlCQUFhLFFBQWIsRUFBdUIsWUFBdkI7QUFDQUEsaUJBQWEsU0FBYixFQUF3Qix1QkFBeEI7QUFDQUEsaUJBQWEsT0FBYixFQUFzQixnQkFBdEI7O0FBRUEsYUFBU0EsWUFBVCxDQUFzQkMsRUFBdEIsRUFBeUJDLElBQXpCLEVBQThCO0FBQzFCTixVQUFFLHNCQUFGLEVBQTBCRSxNQUExQixDQUFpQyxnREFBOENHLEVBQTlDLEdBQWlELCtHQUFqRCxHQUFtS0MsSUFBbkssR0FBMEssUUFBM007QUFDSDs7QUFFRCxhQUFTQyxXQUFULEdBQXNCO0FBQ2xCLFlBQUlDLFFBQVNSLEVBQUUsOENBQUYsRUFBa0RTLEdBQWxELEVBQWI7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QjtBQUNwQkMscUJBQWE7QUFDVCxpQkFBSyxFQUFFQyxTQUFTLFdBQVgsRUFBd0JDLFdBQVcsSUFBbkM7QUFESTtBQURPLEtBQXhCO0FBTUgsQ0FuRkQsRSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBKdWFuQ3J1eiBvbiA0LzEvMjAxOC5cclxuICovXHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG5cclxuXHJcbiAgICAkKFwiI2Zvc191c2VyX3Jlc2V0dGluZ19mb3JtXCIpLmFmdGVyKCkuYXBwZW5kKFwiPGRpdiBpZD0ndmFsaWRhdGlvbi1tZXNzYWdlcyc+PC9kaXY+XCIpO1xyXG4gICAgJChcIiN2YWxpZGF0aW9uLW1lc3NhZ2VzXCIpLnRvZ2dsZSggZmFsc2UgKTtcclxuICAgIGFkZEZpZWxkVGV4dChcImxlbmd0aFwiLCBcIkF0IGxlYXN0IDggY2hhcmFjdGVycyBsb25nXCIpO1xyXG4gICAgYWRkRmllbGRUZXh0KFwidXBwZXJcIiwgXCJPbmUgdXBwZXJjYXNlIGNoYXJhY3RlclwiKTtcclxuICAgIGFkZEZpZWxkVGV4dChcIm51bWJlclwiLCBcIk9uZSBudW1iZXJcIik7XHJcbiAgICBhZGRGaWVsZFRleHQoXCJzcGVjaWFsXCIsIFwiT25lIHNwZWNpYWwgY2hhcmFjdGVyXCIpO1xyXG4gICAgYWRkRmllbGRUZXh0KFwibWF0Y2hcIiwgXCJQYXNzd29yZCBtYXRjaFwiKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRGaWVsZFRleHQoaWQsdGV4dCl7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW1lc3NhZ2VzXCIpLmFwcGVuZChcIjxkaXYgY2xhc3M9J3Bhc3N3b3JkLWZpZWxkJyBpZD0ndmFsaWRhdGlvbi1cIitpZCtcIic+PGkgY2xhc3M9J2ZhIGZhLXRpbWVzLWNpcmNsZScgYXJpYS1oaWRkZW49J3RydWUnPjwvaT48aSBjbGFzcz0nZmEgZmEtY2hlY2stY2lyY2xlJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPiBcIiArIHRleHQgKyBcIjwvZGl2PlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja1ZhbHVlcygpe1xyXG4gICAgICAgIHZhciBmaXJzdCA9ICAkKFwiI2Zvc191c2VyX3Jlc2V0dGluZ19mb3JtX3BsYWluUGFzc3dvcmRfZmlyc3RcIikudmFsKCksXHJcbiAgICAgICAgICAgIHNlY29uZCA9ICAkKFwiI2Zvc191c2VyX3Jlc2V0dGluZ19mb3JtX3BsYWluUGFzc3dvcmRfc2Vjb25kXCIpLnZhbCgpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsZW5ndGggOiAoIGZpcnN0Lmxlbmd0aCA+PSA4ICksXHJcbiAgICAgICAgICAgIGRpZ2l0IDogL1xcZC8udGVzdChmaXJzdCksXHJcbiAgICAgICAgICAgIHVwcGVyIDogL1tBLVpdLy50ZXN0KGZpcnN0KSxcclxuICAgICAgICAgICAgc3BlY2lhbCA6IC9bIUAjJCVeJiooKV8rXFwtPVxcW1xcXXt9Oyc6XCJcXFxcfCwuPD5cXC8/XS8udGVzdChmaXJzdCksXHJcbiAgICAgICAgICAgIG1hdGNoIDogKGZpcnN0ID09IHNlY29uZCApXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNmb3NfdXNlcl9yZXNldHRpbmdfZm9ybV9wbGFpblBhc3N3b3JkX2ZpcnN0XCIpLmtleXVwKGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gY2hlY2tWYWx1ZXMoKTtcclxuXHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW1lc3NhZ2VzXCIpLnRvZ2dsZSggdHJ1ZSApO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbGVuZ3RoXCIpLnRvZ2dsZUNsYXNzKFwidmFsaWQtZmllbGRcIixyZXN1bHQubGVuZ3RoKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbGVuZ3RoIC5mYS1jaGVjay1jaXJjbGVcIikudG9nZ2xlKCByZXN1bHQubGVuZ3RoICk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLWxlbmd0aCAuZmEtdGltZXMtY2lyY2xlXCIpLnRvZ2dsZSggIXJlc3VsdC5sZW5ndGggKTtcclxuXHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW51bWJlclwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC5kaWdpdCk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW51bWJlciAuZmEtY2hlY2stY2lyY2xlXCIpLnRvZ2dsZSggcmVzdWx0LmRpZ2l0ICk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW51bWJlciAuZmEtdGltZXMtY2lyY2xlXCIpLnRvZ2dsZSggIXJlc3VsdC5kaWdpdCApO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tdXBwZXJcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLCByZXN1bHQudXBwZXIpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi11cHBlciAuZmEtY2hlY2stY2lyY2xlXCIpLnRvZ2dsZSggcmVzdWx0LnVwcGVyICk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXVwcGVyIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0LnVwcGVyICk7XHJcblxyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1zcGVjaWFsXCIpLnRvZ2dsZUNsYXNzKFwidmFsaWQtZmllbGRcIiwgcmVzdWx0LnNwZWNpYWwpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1zcGVjaWFsIC5mYS1jaGVjay1jaXJjbGVcIikudG9nZ2xlKCByZXN1bHQuc3BlY2lhbCApO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1zcGVjaWFsIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0LnNwZWNpYWwgKTtcclxuXHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW1hdGNoXCIpLnRvZ2dsZUNsYXNzKFwidmFsaWQtZmllbGRcIiwgcmVzdWx0Lm1hdGNoKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWF0Y2ggLmZhLWNoZWNrLWNpcmNsZVwiKS50b2dnbGUoIHJlc3VsdC5tYXRjaCApO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaCAuZmEtdGltZXMtY2lyY2xlXCIpLnRvZ2dsZSggIXJlc3VsdC5tYXRjaCApO1xyXG5cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2Zvc191c2VyX3Jlc2V0dGluZ19mb3JtX3BsYWluUGFzc3dvcmRfc2Vjb25kXCIpLmtleXVwKGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gY2hlY2tWYWx1ZXMoKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWF0Y2hcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLCByZXN1bHQubWF0Y2gpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCJmb3JtXCIpLm5vdChcIiNteWZvcm1cIikuc3VibWl0KGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgICAgICB2YXIgcmVzdWx0ID0gY2hlY2tWYWx1ZXMoKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0LnVwcGVyICYmIHJlc3VsdC5tYXRjaCAmJiByZXN1bHQuc3BlY2lhbCAmJiByZXN1bHQuZGlnaXQgJiYgcmVzdWx0Lmxlbmd0aDtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmxpbmstYWN0aW9uXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdXJsID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy53ZWJzaXRlJykubWFzayhcIkFcIiwge1xyXG4gICAgICAgIHRyYW5zbGF0aW9uOiB7XHJcbiAgICAgICAgICAgIFwiQVwiOiB7IHBhdHRlcm46IC9bXFx3L1xcLS4rXS8sIHJlY3Vyc2l2ZTogdHJ1ZSB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHBCdW5kbGUvUmVzb3VyY2VzL3B1YmxpYy9qYXZhc2NyaXB0L21haW4uanMiXSwic291cmNlUm9vdCI6IiJ9