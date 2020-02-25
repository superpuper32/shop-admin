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
                <span data-elem="from">${this.from.getMonth() +
                  1}/${this.from.getDate() -
        14}/${this.from.getFullYear()} </span>
                - <span data-elem="to"> ${this.time.getMonth() +
                  1}/${this.time.getDate()}/${this.time.getFullYear()}</span>
                  <div class="rangepicker__selector" data-elem="selector"></div>
            </div>
        </div>`
    );

    this.elem.onclick = () => this.toggle();
  }

  toggle() {
    this.elem.classList.toggle("rangepicker_open");
    this.renderSelector();
  }

  renderSelector() {
    this.elem.querySelector(
      ".rangepicker__selector"
    ).innerHTML = `<div class="rangepicker__selector_arrow"></div>
      <div class="rangepicker__selector-control rangepicker__selector-control_left"></div>
      <div class="rangepicker__selector-control rangepicker__selector-control_right"></div>
      ${this.renderCalendar()}
      ${this.renderCalendar()}
    `;
  }

  renderCalendar() {
    let calendar = `<div class="rangepicker__calendar">
      <div class="rangepicker__month">
        <time datetime="Февраль">Февраль</time>
      </div>
      <div class="rangepicker__day">
        <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
      </div>
      <div class="rangepicker__date-grid">
    `;

    calendar += `</div></div>`;

    return calendar;
  }
}

let rangepicker = new Rangepicker();
document.querySelector(".content__top-panel").append(rangepicker.elem);
