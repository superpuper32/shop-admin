import createElement from "../../lib/create-element.js";

export default class Rangepicker {
  constructor() {
    this.time = new Date();
    this.render();
  }

  render() {
    this.elem = createElement(
      `div class="rangepicker">
            <div class="rangepicker__input">
                <span>1/13/20 </span>
                - <span> ${this.time.getMonth() +
                  1}/${this.time.getDate()}/${this.time.getFullYear()}</span>
            </div>
        </div>`
    );
  }
}

let rangepicker = new Rangepicker();
document.querySelector(".content__top-panel").append(rangepicker.elem);
