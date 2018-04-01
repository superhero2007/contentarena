$(document).ready(function(){

    //Get Content details
    $(document).on('click','.more-info-listings',function(e){
        var id = $(this).data('id');

        e.preventDefault();

        $(".content-details").hide();

        $('#content-details-' + id ).html("<i class=\"fa fa-cog fa-spin\">").show();
        ContentArena.Api.getContentDetails(id).done(function(response){
            $('#content-details-' + id ).html(response);
        }).fail(function () {
            $('#content-details-' + id ).html("").hide();
        });
    });

    $(document).on('click','.pending-listings',function(e){
        var id = $(this).data('id');

        e.preventDefault();

        $(".content-details").hide();

        $('#content-details-' + id ).html("<i class=\"fa fa-cog fa-spin\">").show();
        ContentArena.Api.getPendingListings(id).done(function(response){

            $('#content-details-' + id ).html(response);
        })
    });

});