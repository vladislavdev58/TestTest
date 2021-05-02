import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const initRange = (id, start, step, min, max) => {
  if (document.getElementById(id) === null) {
    throw new Error('Не найден элемент для слайдера');
  }
  if (document.getElementById(`${id}_input-0`) === null) {
    throw new Error('Не найден элемент для первого инпута');
  }
  if (document.getElementById(`${id}_input-1`) === null) {
    throw new Error('Не найден элемент для первого второго');
  }
  const rangeSlider = document.getElementById(id);
  const input0 = document.getElementById(`${id}_input-0`);
  const input1 = document.getElementById(`${id}_input-1`);
  const inputs = [input0, input1];
  noUiSlider.create(rangeSlider, {
    start,
    connect: true,
    step,
    range: {
      min,
      max,
    },
  });

  rangeSlider.noUiSlider.on('update', (values, handle) => {
    inputs[handle].value = Math.round(values[handle]);
  });

  const setRangeSlider = (i, value) => {
    const arr = [null, null];
    arr[i] = value;

    rangeSlider.noUiSlider.set(arr);
  };

  inputs.forEach((el, index) => {
    el.addEventListener('change', (event) => {
      setRangeSlider(index, event.currentTarget.value);
    });
  });
};

$(document).ready(() => {
  // Значит так. Айдишники делаем по подобию. Шаг влево, шаг врпаво - расстрел
  // Например, "IDNAME" - это id для самого слайдера
  // "IDNAME_input-1" - это инпут первого значение
  // "IDNAME_input-1" - второго
  // Нам нужно передать только "IDNAME" - дальше все сделается само
  // start - грубо говоря начальные значения в input'ах и позоции слайдера
  // step - каждый шаг сколько прибавляет
  // min - мин значение
  // max - макс значение
  initRange('range-cost', [0, 50000], 500, 0, 50000);
  initRange('range-height', [0, 100], 1, 0, 100);
  initRange('range-length', [0, 100], 1, 0, 100);
});
