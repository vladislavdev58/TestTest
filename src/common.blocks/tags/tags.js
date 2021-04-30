$(document).ready(() => {
  // Повесил чере "on", чтобы когда кнопка вернулась, все работало
  $(document).on('click', '.tag_remove-js', (event) => {
    $(event.currentTarget).parent().remove();
    if ($('.tag_remove-js').length === 0) {
      console.log('!!!');
      $('.tag_remove__all-js').remove();
    }
  });
  $(document).on('click', '.tag_remove__all-js', (event) => {
    $('.tags__item').remove();
    $(event.currentTarget).remove();
  });
});
