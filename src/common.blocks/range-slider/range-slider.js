import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

const initRange = (id, start, step, min, max) => {
  const rangeSlider = document.getElementById(id);
  const input1 = document.getElementById(`${id}_input-1`);
  const input2 = document.getElementById(`${id}_input-2`);
  const inputs = [input1, input2];

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
    console.log(values);
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
  // Значит так. Айдишники делаем по подобию. Шаг влево, шаг врпаво - растрел
  // start - грубо говоря начальные значения в input'ах
  // step - каждый шаг сколько прибавляет
  // min - мин значение
  // max - макс значение
  initRange('range-cost', [500, 50000], 500, [0], [50000]);
  initRange('range-height', [0, 100], 1, [0], [100]);
  initRange('range-length', [0, 100], 1, [0], [100]);
});
