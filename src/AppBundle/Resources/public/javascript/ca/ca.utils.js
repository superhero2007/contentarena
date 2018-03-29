/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function () {

    window.ContentArena = window.ContentArena || {};

    ContentArena.Utils = {
        addRegionBehaviour(selector) {

            $.ajax({
                url: hosturl + "v1/feed/test",
                type: "GET",
                success: function (response) {

                    response.sort(function (a, b) {
                        return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
                    });

                    $(selector).html("");

                    /**
                     * @param {{ country_code: string }} v
                     */
                    $.each(response, function (k, v) {

                        var option = '<option value=' + v.country_code + '>' + v.name + '</option>';

                        $(selector).each(function (key, select) {
                            $(select).append(option);
                        });

                    });

                    $(selector).chosen({width: "50%"});

                }
            });
        },
        isAPIAvailable() {
            // Check for the various File API support.
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                // Great success! All the File APIs are supported.
                return true;
            } else {
                // source: File API availability - http://caniuse.com/#feat=fileapi
                // source: <output> availability - http://html5doctor.com/the-output-element/
                document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
                // 6.0 File API & 13.0 <output>
                document.writeln(' - Google Chrome: 13.0 or later<br />');
                // 3.6 File API & 6.0 <output>
                document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
                // 10.0 File API & 10.0 <output>
                document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
                // ? File API & 5.1 <output>
                document.writeln(' - Safari: Not supported<br />');
                // ? File API & 9.2 <output>
                document.writeln(' - Opera: Not supported');
                return false;
            }
        },
        addOrdinal(n) {
            var str = n.toString().slice(-1),
                ord = '';
            switch (str) {
                case '1':
                    ord = 'st';
                    break;
                case '2':
                    ord = 'nd';
                    break;
                case '3':
                    ord = 'rd';
                    break;
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '0':
                    ord = 'th';
                    break;
            }
            return n + ord;
        }
    };


});


