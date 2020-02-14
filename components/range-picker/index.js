import createElement from "../../lib/create-element.js";

export default class Rangepicker {
  constructor() {
    this.time = new Date();
    this.from = new Date();
    this.render();
  }

  render() {
    this.elem = createElement(
      `div class="rangepicker">
            <div class="rangepicker__input">
                <span>${this.from.getMonth() + 1}/${this.from.getDate() -
        14}/${this.from.getFullYear()} </span>
                - <span> ${this.time.getMonth() +
                  1}/${this.time.getDate()}/${this.time.getFullYear()}</span>
            </div>
        </div>`
    );
  }
}

let rangepicker = new Rangepicker();
document.querySelector(".content__top-panel").append(rangepicker.elem);
