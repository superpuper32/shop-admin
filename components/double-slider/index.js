import createElement from "../../lib/create-element.js";

export default class DoubleSlider {
  constructor({ min, max, formatValue, selected }) {
    this.min = min;
    this.max = max;
    this.formatValue = formatValue;
    this.selected = selected || { from: min, to: max };

    this.onThumbPointerMove = this.onThumbPointerMove.bind(this);
    this.onThumbPointerUp = this.onThumbPointerUp.bind(this);

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

    this.elem.ondragstart = () => false;

    this.elems = {};
    for (let subElem of this.elem.querySelectorAll("[data-elem]")) {
      this.elems[subElem.dataset.elem] = subElem;
    }

    this.elems.thumbLeft.addEventListener("pointerdown", e =>
      this.onThumbPointerDown(e)
    );

    this.update();
  }

  update() {
    let rangeTotal = this.max - this.min;

    this.elems.progress.style.left =
      Math.floor(((this.selected.from - this.min) / rangeTotal) * 100) + "%";
    this.elems.progress.style.right =
      Math.floor(((this.max - this.selected.to) / rangeTotal) * 100) + "%";

    this.elems.from.innerHTML = this.formatValue(this.selected.from);
    this.elems.to.innerHTML = this.formatValue(this.selected.to);
  }

  onThumbPointerDown(e) {
    let thumbElem = e.target;
    e.preventDefault();

    let thumbCoords = thumbElem.getBoundingClientRect();

    if (thumbElem === this.elems.thumbLeft) {
      this.shiftX = thumbCoords.right - event.clientX;
    } else {
      this.shiftX = thumbCoords.left - event.clientX;
    }

    this.dragging = thumbElem;

    this.elem.classList.add("range-slider_dragging");

    document.addEventListener("pointermove", this.onThumbPointerMove);
    document.addEventListener("pointerup", this.onThumbPointerUp);
  }

  onThumbPointerMove(e) {
    e.preventDefault();

    if (this.dragging === this.elems.thumbLeft) {
      let newLeft =
        (event.clientX -
          this.elems.inner.getBoundingClientRect().left +
          this.shiftX) /
        this.elems.inner.offsetWidth;
      if (newLeft < 0) newLeft = 0;
      newLeft *= 100;
      let right = parseFloat(this.elems.thumbRight.style.right);
      if (newLeft + right > 100) newLeft = 100 - right;
      this.dragging.style.left = this.elems.progress.style.left = newLeft + "%";
    }
  }

  onThumbPointerUp() {
    this.elem.classList.remove("range-slider_dragging");

    document.removeEventListener("pointermove", this.onThumbPointerMove);
    document.removeEventListener("pointerup", this.onThumbPointerUp);
  }
}

// Dashboard page

let slider = new DoubleSlider({
  min: 0,
  max: 4000,
  formatValue: value => "$" + value
});

document.querySelector(".content__top-panel").append(slider.elem);
