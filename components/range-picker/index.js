import createElement from "../../lib/create-element.js";

export default class Rangepicker {
  constructor({ from, to }) {
    this.showDateFrom = new Date(from);
    this.selected = { from, to };
    this.render();
  }

  getDay(date) {
    let day = date.getDay();
    return day === 0 ? 6 : day - 1;
  }

  render() {
    this.elem = createElement(
      `<div class="rangepicker">
      <div class="rangepicker__input" data-elem="input">
      <span data-elem="from">${this.selected.from.toLocaleString("default", {
        dateStyle: "short"
      })}</span> - 
      <span data-elem="to">${this.selected.to.toLocaleString("default", {
        dateStyle: "short"
      })}</span>
      </div>
      <div class="rangepicker__selector" data-elem="selector"></div>
      </div>`
    );

    this.elem.onclick = () => this.toggle();
  }

  toggle() {
    this.elem.classList.toggle("rangepicker_open");
    this.renderSelector();
  }

  renderSelector() {
    let showDate1 = new Date(this.showDateFrom);
    this.elem.querySelector(
      ".rangepicker__selector"
    ).innerHTML = `<div class="rangepicker__selector_arrow"></div>
      <div class="rangepicker__selector-control rangepicker__selector-control_left"></div>
      <div class="rangepicker__selector-control rangepicker__selector-control_right"></div>
      ${this.renderCalendar(showDate1)}
    `;
  }

  renderCalendar(showDate) {
    let date = new Date(showDate);
    date.setDate(1);

    let monthStr = date.toLocaleString("default", { month: "long" });

    let calendar = `<div class="rangepicker__calendar">
      <div class="rangepicker__month">
        <time datetime="Февраль">${monthStr}</time>
      </div>
      <div class="rangepicker__day">
        <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
      </div>
      <div class="rangepicker__date-grid">
    `;

    calendar += `<button type="button" class="rangepicker__cell" data-value="${date.toISOString()}" style="--start-from: ${this.getDay(
      date
    ) + 1}">${date.getDate()}</button>`;

    calendar += `</div></div>`;

    return calendar;
  }
}

let range = {
  from: new Date(Date.now() - 30 * 86400e3),
  to: new Date()
};

let rangepicker = new Rangepicker(range);
document.querySelector(".content__top-panel").append(rangepicker.elem);
