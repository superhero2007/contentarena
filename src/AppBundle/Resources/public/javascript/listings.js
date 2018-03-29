$(document).ready(function(){

    //Get Content details
    $(document).on('click','.more-info-listings',function(e){
        e.preventDefault();
        var id = $(this).data('id');
        data = {id:id};
        ContentArena.Api.getContentData(data).done(function(response){
            $('.main-content').html(response)
        })
    });


    //Return back to active listings page
    $(document).on('click','.to-active-listings',function(){
        ContentArena.Api.getActiveListings().done(function(response){
            $('.main-content').html(response)
        })
    })

});