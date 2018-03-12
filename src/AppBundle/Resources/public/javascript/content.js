/**
 * Created by JuanCruz on 1/3/2018.
 */

$(document).ready(function(){


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


    $(document).on('click','.main-check',function(){
        var id = $(this).data('iteration');
        if($(this).attr('data-checked') === 'false'){
            $('.subordinate-check[data-iteration = '+ id +']').prop('checked',true);
            $(this).attr('data-checked', 'true');
        }else {
            $('.subordinate-check[data-iteration = '+ id +']').prop('checked',false);
            $(this).attr('data-checked', 'false');
        }
    })

    $(document).on('click','.continent-name',function(){

        var iter  = $(this).data('iteration');
        var id = $(this).data('id');
        $('.continent-name[data-iteration='+ iter +']').removeClass('continent-name-color');
        $(this).addClass('continent-name-color');

        $('.territory-id[data-iteration='+ iter +']').val(id);
        var rowCount = $('tbody.territory-table-body tr[data-iteration='+ iter +']').length;
        var continentRowCount = $('tbody.territory-table-body tr[data-id=' + id + '][data-iteration='+iter+']').length;

        if(id == 'world'){
            if(rowCount > 20){
                $('.view-all[data-iteration='+ iter +']').show();
                $('.view-all[data-iteration='+ iter +']').text('View all ('+ rowCount + ')');
            }
            $('tbody.territory-table-body tr[data-iteration='+ iter +']').removeClass('hide-item');
            $($('tbody.territory-table-body tr[data-iteration='+ iter +']').eq(20)).nextAll('tr').addClass('hide-item');
        }else{

            if(continentRowCount > 20){
                $('.view-all[data-iteration='+ iter +']').show();
                $('.view-all[data-iteration='+ iter +']').text('View all ('+ continentRowCount + ')');
            }
            $('tbody.territory-table-body tr[data-iteration='+ iter +']').addClass('hide-item');
            $($('tbody.territory-table-body tr[data-id=' + id + '][data-iteration='+ iter +']')).removeClass('hide-item');
            $($('tbody.territory-table-body tr[data-id=' + id + '][data-iteration='+ iter +']').eq(20)).nextAll('tr').addClass('hide-item');
        }
    })

    $(document).on('click','.view-all',function(){
        var iter  = $(this).data('iteration');
        var id = $('.territory-id[data-iteration='+ iter +']').val();
        if(id == 'world'){
            $('tbody.territory-table-body tr[data-iteration='+ iter +']').removeClass('hide-item');
        }else{
            $('tbody.territory-table-body tr[data-iteration='+ iter +']').addClass('hide-item');
            $($('tbody.territory-table-body tr[data-id=' + id + '][data-iteration='+ iter +']')).removeClass('hide-item');
        }

        $(this).hide(0);
    })


});
