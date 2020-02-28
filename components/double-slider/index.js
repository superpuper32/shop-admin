import createElement from "../../lib/create-element.js";

export default class DoubleSlider {
  constructor({ min, max, formatValue, selected }) {
    this.min = min;
    this.max = max;
    this.formatValue = formatValue;
    this.selected = selected || { from: min, to: max };

    this.render();
  }

  render() {
    this.elem = createElement(`<div class="range-slider">
      <span data-elem="from" class="range-slider__price range-slider__price_from"></span>
      <div data-elem="inner" class="range-slider__inner">
        <span data-elem="progress" class="range-slider__progress"></span>
        <span data-elem="thumbLeft" class="range-slider__thumb range-slider__thumb_left"></span>
        <span data-elem="thumbRight" class="range-slider__thumb range-slider__thumb_right"></span>
      </div>
      <span data-elem="to" class="range-slider__price range-slider__price_to"></span>
    </div>`);

    this.update();
  }

  update() {
    let rangeTotal = this.max - this.min;

    this.elem.querySelector(".range-slider__progress").style.left =
      Math.floor(((this.selected.from - this.min) / rangeTotal) * 100) + "%";

    this.elem.querySelector(".range-slider__progress").style.right =
      Math.floor(((this.max - this.selected.to) / rangeTotal) * 100) + "%";

    this.elem.querySelector(
      ".range-slider__price_from"
    ).innerHTML = this.formatValue(this.selected.from);

    this.elem.querySelector(
      ".range-slider__price_to"
    ).innerHTML = this.formatValue(this.selected.to);
  }
}

let slider = new DoubleSlider({
  min: 0,
  max: 4000,
  formatValue: value => {
    return "$" + value;
  }
});

document.querySelector(".content__top-panel").append(slider.elem);
