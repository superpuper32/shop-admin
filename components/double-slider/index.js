import createElement from "../../lib/create-element.js";

export default class DoubleSlider {
  contructor() {
    this.render();
  }

  render() {
    this.elem = createElement(`<div class="range-slider">
      <span data-elem="from"></span>
      <div data-elem="inner" class="range-slider__inner">
        <span data-elem="progress" class="range-slider__progress"></span>
        <span data-elem="thumbLeft" class="range-slider__thumb-left"></span>
        <span data-elem="thumbRight" class="range-slider__thumb-right"></span>
      </div>
      <span data-elem="to"></span>
    </div>`);
  }
}
