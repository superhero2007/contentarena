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




    /*** FORM SEARCH ***/
    /*** TAKE THE SEARCH INPUT OBJ AND RESULT BOX DIV ***/
    $searchInput = $('#search-sport');
   var availableTags = [];

    /*** MAIN FUNCTIONS ***/
    var sent = false;
    $searchInput.keyup(function () {
        var searchInputVal = $(this).val(); //take the input value
        availableTags = []
        if(searchInputVal.length > 2 && sent == false) {
            $.ajax({
                url: '/sell-new-listing-search',
                data: {
                    "content": searchInputVal
                },
                traditional: true,
                type: "POST",
                dataType: "json",
                success: function (res) {
                    sent = true;
                    var len = res['seasons'].length;
                    for (i = 0 ; i < len ; i++){
                        availableTags.push(res['seasons'][i]['name']);
                    }
                    len = res['sports'].length;
                    for (i = 0 ; i < len ; i++){
                        availableTags.push(res['sports'][i]['name']);
                    }
                    len = res['sportCategories'].length;
                    for (i = 0 ; i < len ; i++){
                        availableTags.push(res['sportCategories'][i]['name']);
                    }
                    len = res['tournaments'].length;
                    for (i = 0 ; i < len ; i++){
                        availableTags.push(res['tournaments'][i]['name']);
                    }
                    $( "#search-sport" ).autocomplete({
                        source: availableTags,
                    }).bind('keyup', function(){
                        if(sent == true) {
                                $(this).autocomplete("search");
                                availableTags = []
                            }
                        }
                    );
                }
            });
        }else{
            sent = false;
            availableTags = []
        }
    })
    /*** FORM SEARCH END***/


});
