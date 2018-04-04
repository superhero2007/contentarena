/**
 * Created by JuanCruz on 4/1/2018.
 */

$(function() {


    $("#fos_user_resetting_form").after().append("<div id='validation-messages'></div>");
    $("#validation-messages").toggle( false );
    addFieldText("length", "At least 8 characters long");
    addFieldText("upper", "One uppercase character");
    addFieldText("number", "One number");
    addFieldText("special", "One special character");
    addFieldText("match", "Password match");

    function addFieldText(id,text){
        $("#validation-messages").append("<div class='password-field' id='validation-"+id+"'><i class='fa fa-times-circle' aria-hidden='true'></i><i class='fa fa-check-circle' aria-hidden='true'></i> " + text + "</div>");
    }

    function checkValues(){
        var first =  $("#fos_user_resetting_form_plainPassword_first").val(),
            second =  $("#fos_user_resetting_form_plainPassword_second").val();

        return {
            length : ( first.length >= 8 ),
            digit : /\d/.test(first),
            upper : /[A-Z]/.test(first),
            special : /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(first),
            match : (first == second )
        };

    }

    $("#fos_user_resetting_form_plainPassword_first").keyup(function(e){

        var result = checkValues();

        $("#validation-messages").toggle( true );

        $("#validation-length").toggleClass("valid-field",result.length);
        $("#validation-length .fa-check-circle").toggle( result.length );
        $("#validation-length .fa-times-circle").toggle( !result.length );

        $("#validation-number").toggleClass("valid-field", result.digit);
        $("#validation-number .fa-check-circle").toggle( result.digit );
        $("#validation-number .fa-times-circle").toggle( !result.digit );

        $("#validation-upper").toggleClass("valid-field", result.upper);
        $("#validation-upper .fa-check-circle").toggle( result.upper );
        $("#validation-upper .fa-times-circle").toggle( !result.upper );

        $("#validation-special").toggleClass("valid-field", result.special);
        $("#validation-special .fa-check-circle").toggle( result.special );
        $("#validation-special .fa-times-circle").toggle( !result.special );

        $("#validation-match").toggleClass("valid-field", result.match);
        $("#validation-match .fa-check-circle").toggle( result.match );
        $("#validation-match .fa-times-circle").toggle( !result.match );


    });

    $("#fos_user_resetting_form_plainPassword_second").keyup(function(e){

        var result = checkValues();
        $("#validation-match").toggleClass("valid-field", result.match);

    });

    $("form").not("#myform").submit(function(e){

        var result = checkValues();

        return result.upper && result.match && result.special && result.digit && result.length;

    });

    $(".link-action").click(function () {
        var url = $(this).attr("href");

        window.location.href = url;
    });

    /*** TAKE THE SEARCH INPUT OBJ ***/
    $searchInput = $('#search-sport');

    /*** FORM SEARCH END***/
    $searchInput.keyup(function (e) {

        if(e.keyCode != 40 && e.keyCode != 38) {
            var first = true;
            var searchInputVal = $('#search-sport').val(); //take the input value

            var returnedArrayOfNames = ContentArena.Api.getSearchResultInNewListing(searchInputVal)

            $("#search-sport").autocomplete({
                source: returnedArrayOfNames,
            }).bind('keyup', function (e) {
                if(e.keyCode != 40 && e.keyCode != 38) {
                    $(this).autocomplete({
                        source: returnedArrayOfNames,
                    })
                }
            }).data('ui-autocomplete')._renderItem = function(ul,item){


                var name = item.value;
                var array = name.split("*");

                var appending = "<div>"+array[0]+"</div><div class='search-result-category'>"+array[1]+"</div>"

                item.value = array[0]

                if(first == true){
                    $("#search-sport").val(array[0])
                    first = false;
                }

                return $("<li class = 'custom-autocomplete-item'>").append(appending).appendTo(ul);
            };
        }
    })
});

