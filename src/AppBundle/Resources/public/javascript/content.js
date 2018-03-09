/**
 * Created by JuanCruz on 1/3/2018.
 */

$(document).ready(function(){

    //$($('table.territory-table tr')[20]).nextAll('tr').hide(0);

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

        var id = $(this).data('id');
        $('.continent-name').removeClass('continent-name-color');
        $(this).addClass('continent-name-color');

        $('.territory-id').val(id);
        var rowCount = $('tbody.territory-table-body tr').length;
        var continentRowCount = $('tbody.territory-table-body tr[data-id=' + id + ']').length;

        if(id == 'world'){
            if(rowCount > 20){
                $('.view-all').show();
                $('.view-all').text('View all ('+ rowCount + ')');
            }
            $('tbody.territory-table-body tr').removeClass('hide-item');
            $($('tbody.territory-table-body tr').eq(20)).nextAll('tr').addClass('hide-item');
        }else{

            if(continentRowCount > 20){
                $('.view-all').show();
                $('.view-all').text('View all ('+ continentRowCount + ')');
            }
            $('tbody.territory-table-body tr').addClass('hide-item');
            $($('tbody.territory-table-body tr[data-id=' + id + ']')).removeClass('hide-item');
            $($('tbody.territory-table-body tr[data-id=' + id + ']').eq(20)).nextAll('tr').addClass('hide-item');
        }
    })

    $(document).on('click','.view-all',function(){

        var id = $('.territory-id').val();
        if(id == 'world'){
            $('tbody.territory-table-body tr').removeClass('hide-item');
        }else{
            $('tbody.territory-table-body tr').addClass('hide-item');
            $($('tbody.territory-table-body tr[data-id=' + id + ']')).removeClass('hide-item');
        }

        $(this).hide(0);
    })


});
