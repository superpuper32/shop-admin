import createElement from "../../lib/create-element.js";

export default class Rangepicker {
  constructor({ from, to }) {
    this.showDateFrom = new Date(from);
    this.showDateTo = new Date(to);
    this.selected = { from, to };
    this.render();
  }

  getDay(date) {
    let day = date.getDay();
    return day === 0 ? 6 : day - 1;
  }

  render() {
    let elem = (this.elem = createElement(
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
    ));

    elem.onmousedown = () => false;

    this.elems = {};
    for (let subElem of elem.querySelectorAll("[data-elem]")) {
      this.elems[subElem.dataset.elem] = subElem;
    }

    this.elems.input.onclick = () => this.toggle();
  }

  toggle() {
    this.elem.classList.toggle("rangepicker_open");
    this.renderSelector();
  }

  renderSelector() {
    let showDate1 = new Date(this.showDateFrom);
    let showDate2 = new Date(this.showDateFrom);
    showDate2.setMonth(showDate2.getMonth() + 1);

    this.elems.selector.innerHTML = `<div class="rangepicker__selector_arrow"></div>
      <div class="rangepicker__selector-control rangepicker__selector-control_left"></div>
      <div class="rangepicker__selector-control rangepicker__selector-control_right"></div>
      ${this.renderCalendar(showDate1)}
      ${this.renderCalendar(showDate2)}
    `;

    this.elems.selector.querySelector(
      ".rangepicker__selector-control_left"
    ).onclick = () => this.prev();

    this.elems.selector.querySelector(
      ".rangepicker__selector-control_right"
    ).onclick = () => this.next();

    this.renderHiglight();
  }

  prev() {
    this.showDateFrom.setMonth(this.showDateFrom.getMonth() - 1);
    this.renderSelector();
  }

  next() {
    this.showDateFrom.setMonth(this.showDateFrom.getMonth() + 1);
    this.renderSelector();
  }

  renderHiglight() {
    for (let cell of this.elem.querySelectorAll(".rangepicker__cell")) {
      cell.classList.remove("rangepicker__selected_from");
      cell.classList.remove("rangepicker__selected_between");
      cell.classList.remove("rangepicker__selected_to");
      if (
        this.selected.from &&
        cell.dataset.value === this.selected.from.toISOString()
      ) {
        cell.classList.add("rangepicker__selected_from");
      } else if (
        this.selected.to &&
        cell.dataset.value === this.selected.to.toISOString()
      ) {
        cell.classList.add("rangepicker__selected_to");
      } else if (
        this.selected.from &&
        this.selected.to &&
        new Date(cell.dataset.value) >= this.selected.from &&
        new Date(cell.dataset.value) <= this.selected.to
      ) {
        cell.classList.add("rangepicker__selected_between");
      }
    }

    if (this.selected.from) {
      let selectedFromElem = this.elem.querySelector(
        `[data-value="${this.selected.from.toISOString()}"]`
      );
      if (selectedFromElem) {
        selectedFromElem
          .closest(".rangepicker__cell")
          .classList.add("rangepicker__selected_from");
      }
    }

    if (this.selected.to) {
      let selectedToElem = this.elem.querySelector(
        `[data-value="${this.selected.to.toISOString()}"]`
      );
      if (selectedToElem) {
        selectedToElem
          .closest(".rangepicker__cell")
          .classList.add("rangepicker__selected_to");
      }
    }
  }

  renderCalendar(showDate) {
    let date = new Date(showDate);
    date.setDate(1);

    let monthStr = date.toLocaleString("default", {
      month: "long"
    });

    let calendar = `<div class="rangepicker__calendar">
      <div class="rangepicker__month">
        <time datetime="${monthStr}">${monthStr}</time>
      </div>
      <div class="rangepicker__day">
        <div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div>
      </div>
      <div class="rangepicker__date-grid">
    `;

    calendar += `<button type="button" class="rangepicker__cell" data-value="${date.toISOString()}" style="--start-from: ${this.getDay(
      date
    ) + 1}">${date.getDate()}</button>`;
    date.setDate(2);

    while (date.getMonth() === showDate.getMonth()) {
      calendar += `<button type="button" class="rangepicker__cell" data-value="${date.toISOString()}">${date.getDate()}</button>`;
      date.setDate(date.getDate() + 1);
    }

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
