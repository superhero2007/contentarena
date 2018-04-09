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

    $("#search-sport").autocomplete({
        source: ContentArena.Api.getSearchResultInNewListing
    });
    /*  .data('ui-autocomplete')._renderItem = function(ul,item){
        var name = item.name + " - " + item.type;
      var appending = "<div class='search-result-category'>"+name+"</div>"
        return $("<li class = 'custom-autocomplete-item'>").append(appending).appendTo(ul);
    };*/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluLmpzIl0sIm5hbWVzIjpbIiQiLCJhZnRlciIsImFwcGVuZCIsInRvZ2dsZSIsImFkZEZpZWxkVGV4dCIsImlkIiwidGV4dCIsImNoZWNrVmFsdWVzIiwiZmlyc3QiLCJ2YWwiLCJzZWNvbmQiLCJsZW5ndGgiLCJkaWdpdCIsInRlc3QiLCJ1cHBlciIsInNwZWNpYWwiLCJtYXRjaCIsImtleXVwIiwiZSIsInJlc3VsdCIsInRvZ2dsZUNsYXNzIiwibm90Iiwic3VibWl0IiwiZG9jdW1lbnQiLCJvbiIsInVybCIsImF0dHIiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJhdXRvY29tcGxldGUiLCJzb3VyY2UiLCJDb250ZW50QXJlbmEiLCJBcGkiLCJnZXRTZWFyY2hSZXN1bHRJbk5ld0xpc3RpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBQSxFQUFFLFlBQVc7O0FBR1RBLE1BQUUsMEJBQUYsRUFBOEJDLEtBQTlCLEdBQXNDQyxNQUF0QyxDQUE2QyxzQ0FBN0M7QUFDQUYsTUFBRSxzQkFBRixFQUEwQkcsTUFBMUIsQ0FBa0MsS0FBbEM7QUFDQUMsaUJBQWEsUUFBYixFQUF1Qiw0QkFBdkI7QUFDQUEsaUJBQWEsT0FBYixFQUFzQix5QkFBdEI7QUFDQUEsaUJBQWEsUUFBYixFQUF1QixZQUF2QjtBQUNBQSxpQkFBYSxTQUFiLEVBQXdCLHVCQUF4QjtBQUNBQSxpQkFBYSxPQUFiLEVBQXNCLGdCQUF0Qjs7QUFFQSxhQUFTQSxZQUFULENBQXNCQyxFQUF0QixFQUF5QkMsSUFBekIsRUFBOEI7QUFDMUJOLFVBQUUsc0JBQUYsRUFBMEJFLE1BQTFCLENBQWlDLGdEQUE4Q0csRUFBOUMsR0FBaUQsK0dBQWpELEdBQW1LQyxJQUFuSyxHQUEwSyxRQUEzTTtBQUNIOztBQUVELGFBQVNDLFdBQVQsR0FBc0I7QUFDbEIsWUFBSUMsUUFB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LGVBQUYsRUFBbUI4QixZQUFuQixDQUFnQztBQUM1QkMsZ0JBQVFDLGFBQWFDLEdBQWIsQ0FBaUJDO0FBREcsS0FBaEM7QUFHRTs7Ozs7QUFRTCxDQTFGRCxFIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1cIikuYWZ0ZXIoKS5hcHBlbmQoXCI8ZGl2IGlkPSd2YWxpZGF0aW9uLW1lc3NhZ2VzJz48L2Rpdj5cIik7XHJcbiAgICAkKFwiI3ZhbGlkYXRpb24tbWVzc2FnZXNcIikudG9nZ2xlKCBmYWxzZSApO1xyXG4gICAgYWRkRmllbGRUZXh0KFwibGVuZ3RoXCIsIFwiQXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmdcIik7XHJcbiAgICBhZGRGaWVsZFRleHQoXCJ1cHBlclwiLCBcIk9uZSB1cHBlcmNhc2UgY2hhcmFjdGVyXCIpO1xyXG4gICAgYWRkRmllbGRUZXh0KFwibnVtYmVyXCIsIFwiT25lIG51bWJlclwiKTtcclxuICAgIGFkZEZpZWxkVGV4dChcInNwZWNpYWxcIiwgXCJPbmUgc3BlY2lhbCBjaGFyYWN0ZXJcIik7XHJcbiAgICBhZGRGaWVsZFRleHQoXCJtYXRjaFwiLCBcIlBhc3N3b3JkIG1hdGNoXCIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEZpZWxkVGV4dChpZCx0ZXh0KXtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWVzc2FnZXNcIikuYXBwZW5kKFwiPGRpdiBjbGFzcz0ncGFzc3dvcmQtZmllbGQnIGlkPSd2YWxpZGF0aW9uLVwiK2lkK1wiJz48aSBjbGFzcz0nZmEgZmEtdGltZXMtY2lyY2xlJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjxpIGNsYXNzPSdmYSBmYS1jaGVjay1jaXJjbGUnIGFyaWEtaGlkZGVuPSd0cnVlJz48L2k+IFwiICsgdGV4dCArIFwiPC9kaXY+XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrVmFsdWVzKCl7XHJcbiAgICAgICAgdmFyIGZpcnN0ID0gICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9maXJzdFwiKS52YWwoKSxcclxuICAgICAgICAgICAgc2Vjb25kID0gICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9zZWNvbmRcIikudmFsKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxlbmd0aCA6ICggZmlyc3QubGVuZ3RoID49IDggKSxcclxuICAgICAgICAgICAgZGlnaXQgOiAvXFxkLy50ZXN0KGZpcnN0KSxcclxuICAgICAgICAgICAgdXBwZXIgOiAvW0EtWl0vLnRlc3QoZmlyc3QpLFxyXG4gICAgICAgICAgICBzcGVjaWFsIDogL1shQCMkJV4mKigpXytcXC09XFxbXFxde307JzpcIlxcXFx8LC48PlxcLz9dLy50ZXN0KGZpcnN0KSxcclxuICAgICAgICAgICAgbWF0Y2ggOiAoZmlyc3QgPT0gc2Vjb25kIClcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2Zvc191c2VyX3Jlc2V0dGluZ19mb3JtX3BsYWluUGFzc3dvcmRfZmlyc3RcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBjaGVja1ZhbHVlcygpO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWVzc2FnZXNcIikudG9nZ2xlKCB0cnVlICk7XHJcblxyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1sZW5ndGhcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLHJlc3VsdC5sZW5ndGgpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1sZW5ndGggLmZhLWNoZWNrLWNpcmNsZVwiKS50b2dnbGUoIHJlc3VsdC5sZW5ndGggKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbGVuZ3RoIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0Lmxlbmd0aCApO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbnVtYmVyXCIpLnRvZ2dsZUNsYXNzKFwidmFsaWQtZmllbGRcIiwgcmVzdWx0LmRpZ2l0KTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbnVtYmVyIC5mYS1jaGVjay1jaXJjbGVcIikudG9nZ2xlKCByZXN1bHQuZGlnaXQgKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbnVtYmVyIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0LmRpZ2l0ICk7XHJcblxyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi11cHBlclwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC51cHBlcik7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXVwcGVyIC5mYS1jaGVjay1jaXJjbGVcIikudG9nZ2xlKCByZXN1bHQudXBwZXIgKTtcclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tdXBwZXIgLmZhLXRpbWVzLWNpcmNsZVwiKS50b2dnbGUoICFyZXN1bHQudXBwZXIgKTtcclxuXHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXNwZWNpYWxcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLCByZXN1bHQuc3BlY2lhbCk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXNwZWNpYWwgLmZhLWNoZWNrLWNpcmNsZVwiKS50b2dnbGUoIHJlc3VsdC5zcGVjaWFsICk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLXNwZWNpYWwgLmZhLXRpbWVzLWNpcmNsZVwiKS50b2dnbGUoICFyZXN1bHQuc3BlY2lhbCApO1xyXG5cclxuICAgICAgICAkKFwiI3ZhbGlkYXRpb24tbWF0Y2hcIikudG9nZ2xlQ2xhc3MoXCJ2YWxpZC1maWVsZFwiLCByZXN1bHQubWF0Y2gpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaCAuZmEtY2hlY2stY2lyY2xlXCIpLnRvZ2dsZSggcmVzdWx0Lm1hdGNoICk7XHJcbiAgICAgICAgJChcIiN2YWxpZGF0aW9uLW1hdGNoIC5mYS10aW1lcy1jaXJjbGVcIikudG9nZ2xlKCAhcmVzdWx0Lm1hdGNoICk7XHJcblxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjZm9zX3VzZXJfcmVzZXR0aW5nX2Zvcm1fcGxhaW5QYXNzd29yZF9zZWNvbmRcIikua2V5dXAoZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBjaGVja1ZhbHVlcygpO1xyXG4gICAgICAgICQoXCIjdmFsaWRhdGlvbi1tYXRjaFwiKS50b2dnbGVDbGFzcyhcInZhbGlkLWZpZWxkXCIsIHJlc3VsdC5tYXRjaCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcImZvcm1cIikubm90KFwiI215Zm9ybVwiKS5zdWJtaXQoZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgICAgIHZhciByZXN1bHQgPSBjaGVja1ZhbHVlcygpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0LnVwcGVyICYmIHJlc3VsdC5tYXRjaCAmJiByZXN1bHQuc3BlY2lhbCAmJiByZXN1bHQuZGlnaXQgJiYgcmVzdWx0Lmxlbmd0aDtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmxpbmstYWN0aW9uXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdXJsID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuXHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI3NlYXJjaC1zcG9ydFwiKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgIHNvdXJjZTogQ29udGVudEFyZW5hLkFwaS5nZXRTZWFyY2hSZXN1bHRJbk5ld0xpc3RpbmcsXHJcbiAgICB9KVxyXG4gICAgICAvKiAgLmRhdGEoJ3VpLWF1dG9jb21wbGV0ZScpLl9yZW5kZXJJdGVtID0gZnVuY3Rpb24odWwsaXRlbSl7XHJcblxyXG4gICAgICAgIHZhciBuYW1lID0gaXRlbS5uYW1lICsgXCIgLSBcIiArIGl0ZW0udHlwZTtcclxuICAgICAgICB2YXIgYXBwZW5kaW5nID0gXCI8ZGl2IGNsYXNzPSdzZWFyY2gtcmVzdWx0LWNhdGVnb3J5Jz5cIituYW1lK1wiPC9kaXY+XCJcclxuXHJcbiAgICAgICAgcmV0dXJuICQoXCI8bGkgY2xhc3MgPSAnY3VzdG9tLWF1dG9jb21wbGV0ZS1pdGVtJz5cIikuYXBwZW5kKGFwcGVuZGluZykuYXBwZW5kVG8odWwpO1xyXG4gICAgfTsqL1xyXG5cclxufSk7XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9tYWluLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==