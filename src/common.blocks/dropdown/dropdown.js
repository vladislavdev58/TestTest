$(document).ready(() => {
  $('.dropdown-js').click((event) => {
    $(event.currentTarget).parent().toggleClass('hide');
  });
});

