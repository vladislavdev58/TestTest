$(document).ready(() => {
  $('.filter_open-js, .filter_close-js').click(() => {
    $('body').toggleClass('no-scroll');
    $('.filter').toggleClass('open');
    $('.overlay').toggleClass('show');
  });
});
