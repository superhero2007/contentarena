webpackJsonp([5],{

/***/ "./src/AppBundle/Resources/public/javascript/buy.js":
/*!**********************************************************!*\
  !*** ./src/AppBundle/Resources/public/javascript/buy.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    ContentArena.Api.getSports().done(function (sports) {
        ContentArena.Data.FullSports = sports;

        var container = $("#filter-sports").find(".subfilter-container").first();

        ContentArena.Data.TopSports.forEach(function (sport) {
            container.append("<div class=\"sport subfilter\" name=\"" + sport.label + "\" id=\"sport-" + sport.value + "\" toggle>" + sport.label + "</div>");
        });
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

},["./src/AppBundle/Resources/public/javascript/buy.js"]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwQnVuZGxlL1Jlc291cmNlcy9wdWJsaWMvamF2YXNjcmlwdC9idXkuanMiXSwibmFtZXMiOlsiJCIsIkNvbnRlbnRBcmVuYSIsIkFwaSIsImdldFNwb3J0cyIsImRvbmUiLCJzcG9ydHMiLCJEYXRhIiwiRnVsbFNwb3J0cyIsImNvbnRhaW5lciIsImZpbmQiLCJmaXJzdCIsIlRvcFNwb3J0cyIsImZvckVhY2giLCJzcG9ydCIsImFwcGVuZCIsImxhYmVsIiwidmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUtBQSxFQUFFLFlBQVk7O0FBRVZDLGlCQUFhQyxHQUFiLENBQWlCQyxTQUFqQixHQUE2QkMsSUFBN0IsQ0FBa0MsVUFBQ0MsTUFBRCxFQUFZO0FBQzFDSixxQkFBYUssSUFBYixDQUFrQkMsVUFBbEIsR0FBK0JGLE1BQS9COztBQUVBLFlBQUlHLFlBQVlSLEVBQUUsZ0JBQUYsRUFDWFMsSUFEVyxDQUNOLHNCQURNLEVBRVhDLEtBRlcsRUFBaEI7O0FBSUFULHFCQUFhSyxJQUFiLENBQWtCSyxTQUFsQixDQUE0QkMsT0FBNUIsQ0FBb0MsVUFBVUMsS0FBVixFQUFpQjtBQUNqREwsc0JBQVVNLE1BQVYsQ0FBaUIsMkNBQXlDRCxNQUFNRSxLQUEvQyxHQUFxRCxnQkFBckQsR0FBc0VGLE1BQU1HLEtBQTVFLEdBQWtGLFlBQWxGLEdBQStGSCxNQUFNRSxLQUFyRyxHQUEyRyxRQUE1SDtBQUNILFNBRkQ7QUFJSCxLQVhEO0FBYUgsQ0FmRCxFIiwiZmlsZSI6ImJ1eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEp1YW5DcnV6IG9uIDQvMS8yMDE4LlxyXG4gKi9cclxuXHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBDb250ZW50QXJlbmEuQXBpLmdldFNwb3J0cygpLmRvbmUoKHNwb3J0cykgPT4ge1xyXG4gICAgICAgIENvbnRlbnRBcmVuYS5EYXRhLkZ1bGxTcG9ydHMgPSBzcG9ydHM7XHJcblxyXG4gICAgICAgIHZhciBjb250YWluZXIgPSAkKFwiI2ZpbHRlci1zcG9ydHNcIilcclxuICAgICAgICAgICAgLmZpbmQoXCIuc3ViZmlsdGVyLWNvbnRhaW5lclwiKVxyXG4gICAgICAgICAgICAuZmlyc3QoKTtcclxuXHJcbiAgICAgICAgQ29udGVudEFyZW5hLkRhdGEuVG9wU3BvcnRzLmZvckVhY2goZnVuY3Rpb24gKHNwb3J0KSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoXCI8ZGl2IGNsYXNzPVxcXCJzcG9ydCBzdWJmaWx0ZXJcXFwiIG5hbWU9XFxcIlwiK3Nwb3J0LmxhYmVsK1wiXFxcIiBpZD1cXFwic3BvcnQtXCIrc3BvcnQudmFsdWUrXCJcXFwiIHRvZ2dsZT5cIitzcG9ydC5sYWJlbCtcIjwvZGl2PlwiKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0FwcEJ1bmRsZS9SZXNvdXJjZXMvcHVibGljL2phdmFzY3JpcHQvYnV5LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==