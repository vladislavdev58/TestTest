// МАССИВ АЙДИШНИКОВ!!!
// Передаем только главный id (IDNAME), остальное само сотворится
// В верстке указываем id: "IDNAME_tag-0" для первого значения
// И "IDNAME_tag-1" для второго
// Вертска должна быть сразу, блоки не генерируются, а только подставляются значения!!!
const arrIdRange = ['range-cost', 'range-length', 'range-height'];

// Функция привязки
const rangeToTag = () => {
  // Получаем массив классов и перебираем
  arrIdRange.forEach((id) => {
    // Провореяем есть такое или нет
    if ($(`#${id}`).length === 0 || $(`#${id}_tag`).length === 0) {
      throw new Error('Элемент не найден, либо не правильно заданы классы');
    }
    // Берем тот ползунок
    const rangeSlider = document.getElementById(id);
    // Достаем начальные значения
    const { min, max } = document.getElementById(id).noUiSlider.options.range;
    // Событие на изменение
    rangeSlider.noUiSlider.on('update', (values) => {
      // Проверяем на исходных позиция или нет
      if (Math.round(values[0]) !== min || Math.round(values[1]) !== max) {
        $(`#${id}_tag`).css('display', 'flex');
        $(`#${id}_tag-0`).text(Math.round(values[0]));
        $(`#${id}_tag-1`).text(Math.round(values[1]));
        $('.tag_remove__all-js').css('display', 'flex');
      } else {
        $(`#${id}_tag`).css('display', 'none');
      }
    });
  });
};
const resetAllRange = () => {
  arrIdRange.forEach((id) => {
    document.getElementById(id).noUiSlider.reset();
  });
};
// Проверяем кнопку "скрыть" убирать или нет
const checkAllClear = () => {
  let isHide = true;
  $('.tags__item').each((index, element) => {
    if ($(element).is(':visible')) {
      isHide = false;
    }
  });
  if (isHide) {
    $('.tag_remove__all-js').css('display', 'none');
  }
};
const checkMaterial = () => {
  const arName = [];
  $('.material_checkbox-js:checked').each((index, element) => {
    arName.push($(element).val());
  });
  if (arName.length === 0) {
    $('#tags_material').css('display', 'none');
  } else {
    $('#tags_material').css('display', 'flex');
    $('#tags_material_list').text(arName.join(', '));
    $('.tag_remove__all-js').css('display', 'flex');
  }
  checkAllClear();
};
const clearMaterial = () => {
  $('.material_checkbox-js').prop('checked', false);
  checkMaterial();
};
const checkSale = () => {
  if ($('.sale_checkbox-js').prop('checked')) {
    $('#tags_sale').css('display', 'flex');
  } else {
    $('#tags_sale').css('display', 'none');
  }
  checkAllClear();
};
const clearSale = () => {
  $('.sale_checkbox-js').prop('checked', false);
  $('#tags_sale').css('display', 'none');
  checkAllClear();
};
$(document).ready(() => {
  // Повесил чере "on", чтобы когда кнопка вернулась, все работало
  // Удаление одного тега
  $(document).on('click', '.tag_remove-js', (event) => {
    const section = $(event.currentTarget).data('section');
    if (section === 'range') {
      $(event.currentTarget).parent().css('display', 'flex');
      const id = $(event.currentTarget).data('range');
      const rangeSlider = document.getElementById(id);
      if (rangeSlider) {
        rangeSlider.noUiSlider.reset();
      }
    }
    if (section === 'material') {
      clearMaterial();
    }
    if (section === sale) {
      clearSale();
    }
    checkAllClear();
  });
  // Удаление ввсех тегов
  $(document).on('click', '.tag_remove__all-js', (event) => {
    $(event.currentTarget).css('display', 'none');
    clearMaterial();
    clearSale();
    resetAllRange();
  });
  // Для отображения выбранных материалов
  $('.material_checkbox-js').change(() => {
    checkMaterial();
  });
  // Отображения тега скидок
  $('.sale_checkbox-js').change(() => {
    checkSale();
  });
  // Проверочка при загрузке отмеченых
  checkMaterial();
  checkSale();
  // Проверяем скрывать сразу кнопчку очистить все или нет
  checkAllClear();
  // С помощью этой функции мы привязываемся к слайдерам
  rangeToTag();
});
