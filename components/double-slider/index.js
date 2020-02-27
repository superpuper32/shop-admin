import createElement from "../../lib/create-element.js";

export default class DoubleSlider {
  constructor(min, max, formatValue) {
    this.min = min;
    this.max = max;
    this.formatValue = formatValue;

    this.render();
  }

  render() {
    this.elem = createElement(`<div class="range-slider">
      <span data-elem="from" class="range-slider__price"></span>
      <div data-elem="inner" class="range-slider__inner">
        <span data-elem="progress" class="range-slider__progress"></span>
        <span data-elem="thumbLeft" class="range-slider__thumb-left"></span>
        <span data-elem="thumbRight" class="range-slider__thumb-right"></span>
      </div>
      <span data-elem="to" class="range-slider__price"></span>
    </div>`);
  }
}

let slider = new DoubleSlider({
  min: 0,
  max: 4000,
  formatValue: value => "$" + value
});

document.querySelector(".content__top-panel").append(slider.elem);
