$(document).foundation({
    reveal: {
        close_on_background_click: true,
        close_on_esc: true
    } 
});

$(document).on('open.fndtn.reveal', '[data-reveal]', function () {
    $('body').addClass('modal-open');
});

$(document).on('close.fndtn.reveal', '[data-reveal]', function () {
    $('body').removeClass('modal-open');
});  

 
