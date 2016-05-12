$(document).ready(function() {
  $('#pushmenu-toggle').click(function() {
    $(this).children('.hamburger').toggleClass('is-active');
    $('.pushmenu-body').toggleClass('pushmenu-open');
    $('.pushmenu').toggleClass('pushmenu-open');
  });
});

