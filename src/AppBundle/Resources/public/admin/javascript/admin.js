$(document).ready(function () {
    $(".action-share").on("click", function(e) {

        e.preventDefault();
        copyToClipboard($( this ).attr("href") );
        $( this ).find("i").show().fadeOut( "slow", function() {
            // Animation complete.
        });
    });
});


const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};