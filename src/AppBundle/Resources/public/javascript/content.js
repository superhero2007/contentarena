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
        var id = $('.territory-id').val();
       if(id === 'world'){
           if($(this).attr('data-checked') === 'false'){
               $('.subordinate-check').prop('checked',true);
               $('.territory-table-body tr:not(".hide-item")').attr('data-checked','true');
               $(this).attr('data-checked', 'true');
           }else {
               $('.subordinate-check').prop('checked',false);
               $('.territory-table-body tr:not(".hide-item")').attr('data-checked','false');
               $(this).attr('data-checked', 'false');
           }
       }else{
           if($(this).attr('data-checked') === 'false'){
               $('.subordinate-check[data-id="'+ id +'"]').prop('checked',true);
               $('.territory-table-body tr:not(".hide-item")').attr('data-checked','true');
               $(this).attr('data-checked', 'true');
           }else {
               $('.subordinate-check[data-id="'+ id +'"]').prop('checked',false);
               $('.territory-table-body tr:not(".hide-item")').attr('data-checked','false');
               $(this).attr('data-checked', 'false');
           }
       }

    });


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
    });

    $(document).on('click','.view-all',function(){

        var id = $('.territory-id').val();
        if(id == 'world'){
            $('tbody.territory-table-body tr').removeClass('hide-item');
        }else{
            $('tbody.territory-table-body tr').addClass('hide-item');
            $($('tbody.territory-table-body tr[data-id=' + id + ']')).removeClass('hide-item');
        }

        $(this).hide(0);
    });

    $(document).on('change','.price-input, .buy-package-input',function(){
        $(this).parents('.country-row').find('.add-to-cart').attr('data-amount',$(this).val())
    });

    $('#content-data').val(JSON.stringify([]));

    $(document).on('click','.add-to-cart',function(){
        $('.license-btn').css({'display':'block'});
        var countId = $(this).data('country');
        if(!Array.isArray(countId)){
            countId = [countId];
        }
        var currencyId = $(this).data('currency');
        var pricingId = $(this).data('pricing-type');
        var amount = $(this).data('amount');
        var rand = $(this).data('rand');
        var temp = {
            id:rand,
            country: countId,
            currency: currencyId,
            pricingMethod:pricingId,
            amount:amount,
        };

        var object = JSON.parse($('#content-data').val());
        object.push(temp);

        $('#content-data').val(JSON.stringify(object));
        if($(this).data('type') === 'find-territories'){
            var countryId = $(this).data('country');
            var countryName = $(this).parent().siblings('.country-name').text().trim();
            var pricingMethod = $(this).parent().siblings('.pricing-method').text().trim();
            var currency = $(this).parent().siblings('.sales-currency').text().trim();
            var price = '';
            var type = 'find-territories';

            if($(this).parent().siblings('.sales-price').find('input').length > 0){
                var input = $(this).parent().siblings('.sales-price').find('input:first-child');
                input.val().length > 0 ? price = input.val() : price = input.data('price');

            }else{
                price = $(this).parent().siblings('.sales-price').text().trim();
            }
            $(this).prop('disabled',true);
            $(this).parents('tr').attr('data-disabled','true');
            $(this).parents('tr').attr('data-checked','false');
            $(this).parents('tr').find('.subordinate-check').prop('disabled',true);
            $(this).parents('tr').find('.subordinate-check').prop('checked',false);


        }else{
            var parent =$(this).parents('.box-content');
            var name = parent.find('.buy-package-name').text().trim();
            var countryName = name +'(' + parent.find('.buy-availibility').text().trim()+')';
            var pricingMethod = parent.find('.buy-package-method').text().trim();

            if(parent.find('.buy-package-input').length > 0 && parent.find('.buy-package-input').val().length > 0){
                price = parent.find('.buy-package-input').val();
            }else{
                price = parent.find('.buy-package-input').data('price');
            }

            var currency = parent.find('.buy-package-currency').text().trim();
            var countryId = $(this).data('id');
            var type = 'buy-package'
            parent.hide(0);
        }


        var row = "<tr><td>"+ countryName +"</td><td class='pricing-method'>"+ pricingMethod +"" +
            "</td><td class='sales-price'>"+ price +"</td><td class='sales-currency'>"+ currency +"</td>" +
            "<td><i class='fa fa-times delete-item' data-id='"+countryId+"' data-rand='"+rand+"' data-type='"+ type +"'></i></td></tr>"

        if(pricingMethod == 'Fixed price'){
            $('.fixed-fee-box').css({'display':'block'});
            $('.fixed-fee-body').prepend(row);

            currency == 'USD' ? $('.sub-total-usd-fixed').text((+ $('.sub-total-usd-fixed').text()) + (+ price)) : $('.sub-total-eur-fixed').text((+ $('.sub-total-eur-fixed').text()) + (+ price))
        }else{
            $('.bid-box').css({'display':'block'});
            $('.bid-body').prepend(row)
            currency == 'USD' ? $('.sub-total-usd-bid').text((+ $('.sub-total-usd-bid').text()) + (+ price )) : $('.sub-total-eur-bid').text((+ $('.sub-total-eur-bid').text()) + (+ price))

        }

    });


    $(document).on('click','.delete-item',function(){
        var currency = $(this).parents('tr').find('.sales-currency').text().trim();
        var price = $(this).parents('tr').find('.sales-price').text().trim();
        var id = $(this).data('rand');
        var temp = JSON.parse($('#content-data').val());
       $.each(temp,function (i,v) {
            if(v && v.id == id){
               // temp.splice(i,1);
                delete temp[i]
            }
       });


       temp = JSON.stringify(temp);
        $('#content-data').val(temp);


        if($(this).data('type') ==='find-territories'){
            var id = $(this).data('id');

            $('.territory-table-body').find('.add-to-cart[data-country="'+ id +'"]').prop('disabled',false);
            $('.territory-table-body').find('.add-to-cart[data-country="'+ id +'"]').parents('tr').attr('data-disabled','false');
            $('.territory-table-body').find('.add-to-cart[data-country="'+ id +'"]').parents('tr').find('.subordinate-check').prop('disabled',false);
        }else{

            var id = $(this).data('id');
            $('.box-content[data-type="'+id+'"]').css({'display':'block'});
        }

        $(this).parents('tr').remove();

        if($(this).parent().siblings('.pricing-method').text().trim() == 'Fixed price'){
            if($(".fixed-fee-body").find('tr').length < 2){
                $('.fixed-fee-box').hide(0);
            }

            currency == 'USD' ? $('.sub-total-usd-fixed').text( $('.sub-total-usd-fixed').text() - price) : $('.sub-total-eur-fixed').text( $('.sub-total-eur-fixed').text() - price);
        }else{
            if($(".bid-body").find('tr').length < 2){
                $('.bid-box').hide(0);
            }
            currency == 'USD' ? $('.sub-total-usd-bid').text( $('.sub-total-usd-bid').text() - price) : $('.sub-total-eur-bid').text($('.sub-total-eur-bid').text() - price);

        }

    });

    $(document).on('click','.add-all-selections',function(){
        $('.license-btn').css({'display':'block'});
        var rows = $('.territory-table-body').find('tr[data-disabled="false"][data-checked="true"]');
        rows.find('.add-to-cart').prop('disabled',true);
        rows.attr('data-disabled','true');
        rows.attr('data-checked','false');
        rows.find('.subordinate-check').prop('checked',false);
        rows.find('.subordinate-check').prop('disabled',true);


        var object = JSON.parse($('#content-data').val());


        $.each(rows, function (index, item) {
             var countryName = $(item).find('.country-name').text().trim();
             var countryId = $(item).find('.add-to-cart').data('country');
             if(!Array.isArray(countryId)){
                countryId = [countryId];
             }
             var pricingMethod = $(item).find('.pricing-method').text().trim();
             var currency = $(item).find('.sales-currency').text().trim();
            var btn = $(item).find('.add-to-cart');

            var currencyId = $(btn).data('currency');
            var pricingId = $(btn).data('pricing-type');
            var amount = $(btn).data('amount');
            var rand = $(btn).data('rand');
            var temp = {
                id:rand,
                country: countryId,
                currency: currencyId,
                pricingMethod:pricingId,
                amount:amount,
            };

            object.push(temp);

            var price = '';

             if(pricingMethod == 'Fixed price'){
                 price =  $(item).find('.sales-price').text().trim();
             }else{
                 $(item).find('.price-input').val().length > 0 ? price = $(item).find('.price-input').val() : price = $(item).find('.price-input').data('price');
             }
            var row = "<tr><td>"+ countryName +"</td><td class='pricing-method'>"+ pricingMethod +"" +
                "</td><td class='sales-price'>"+ price +"</td><td class='sales-currency'>"+ currency +"</td>" +
                "<td><i class='fa fa-times delete-item' data-rand='"+rand+"' data-id='"+countryId+"'></i></td></tr>"


            if(pricingMethod == 'Fixed price'){
                $('.fixed-fee-box').css({'display':'block'});
                $('.fixed-fee-body').prepend(row);
            }else{
                $('.bid-box').css({'display':'block'});
                $('.bid-body').prepend(row)
            }

            $(item).find('.add-to-cart').prop('disabled',true);
        });

        $('#content-data').val(JSON.stringify(object));

    });

    if($(".fixed-fee-body").find('tr').length < 2){
        $('.fixed-fee-box').hide(0);
    }

    if($(".bid-body").find('tr').length < 2){
        $('.bid-box').hide(0);
    }


    $(document).on('change','.subordinate-check',function(){
        if($(this).prop('checked')){
            $(this).parents('tr').attr('data-checked','true');
        }else{
            $(this).parents('tr').attr('data-checked','false');
        }
    });
    
    $('.add_to_watchlist, .remove_watchlist').click(function (e) {
        e.preventDefault();
        _this = $(this);
        _this.addClass('disabled').attr('disabled', true).html("<i class=\"fa fa-cog fa-spin\">");
        var content = $(this).data('id');
        ContentArena.Api.watchlist(content).done(function (data) {
            if(data.success && data.state === 1){
                $('.add_to_watchlist').text('Saved to watchlist');
            }else{
                if(_this.hasClass('remove_watchlist')){
                    _this.parents('.content-box').remove();
                }else{
                    $('.add_to_watchlist').text('Add to watchlist');
                }
            }
            _this.removeClass('disabled').attr('disabled', false);
        });
    });


});
