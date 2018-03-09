/**
 * Created by JuanCruz on 1/3/2018.
 */

$(function () {

    $("#view-seller").on("click", function () {
        $("#seller-dialog").dialog({
            width: 800
        });
    });

    function onSelectAutocompleteTag(event, ui ){
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        if ( terms.indexOf(ui.item.label) === -1 ) terms.push( ui.item.label );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" );
        this.value = terms.join( ", " );

        $(event.target).blur();

        return false;
    }

    $('#seller-contact').on('click', function (e) {
        e.preventDefault();
        $('#seller-popup').dialog({
            draggable: false,
            autoOpen: false,
            height: 'auto',
            minWidth: 600,
            hide: {effect: "fade", duration: 500},
            show: {effect: "fade", duration: 500},
            modal: true,
            title: 'Questions?',
            resizable: false,
        })
            .dialog('open');
        return false;
    });

    $.ajax({
        url: envhosturl + "v1/feed/company",
        type: "GET",

        success: function (response) {

            var source = $.map(response, function (item) {
                return {label: item.email, value: item.id}
            });

            $("#tag-users").autocomplete({
                source: function (request, response) {
                    // delegate back to autocomplete, but extract the last term
                    response($.ui.autocomplete.filter(
                        source, extractLast(request.term)));
                },
                minLength: 0,
                select: onSelectAutocompleteTag
            }).focus(function () {
                $(this).autocomplete("search", "");
            });
        }
    });


    $(document).on('click','.continent-name',function(){
       var id = $(this).data('id');
       var csrf_token = $('#csrf_token').val();
       var custom_id = $('#custom-id').val();

       $.ajax({
           url:'/contents',
           type:'POST',
           data:{
               id: id,
               _csrf_token: csrf_token,
               custom_id: custom_id
           },
           success:function(res){
               console.log(res);
               $('.territory-table').html(res);
           }
       });
    });

    var i = 0;
    $(document).on('click','.main-check',function(){
        i++;
        if(i == 1){
            $('.subordinate-check').prop('checked',true);
        }else if(i == 2){
            $('.subordinate-check').prop('checked',false);
            i = 0;
        }
    })

    $(document).on('click','.continent-name',function(){
        $('.continent-name').removeClass('continent-name-color');
        $(this).addClass('continent-name-color');
    })
});
