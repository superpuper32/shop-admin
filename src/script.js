import './styles.scss';
import { fields } from "./fields.js";
import "babel-polyfill";

class SortableTable {
  constructor(fields) {
    this.fields = fields;

    this.order = {
      field: "title",
      direction: 1
    };

    this.render();
  }

  async render() {
    this.elem = document.createElement("div");
    this.elem.className = "sortable-table";

    let header = document.createElement("div");
    header.setAttribute("data-elem", "header");
    header.className = "sortable-table__header sortable-table__row";
    header.insertAdjacentHTML("beforeend", this.renderHeader());

    this.elem.append(header);

    let rows = await this.loadRows();

    this.renderBody(rows);
    this.elem.addEventListener(
      "click",
      event =>
        event.target.closest(".sortable-table__header .sortable-table__cell") &&
        this.onHeaderClick(event)
    );
  }

  renderHeader() {
    let content = ``;

    for (let name in this.fields) {
      let field = fields[name];
      let title = `<span>${field.title.slice(0, 1).toUpperCase() +
        field.title.slice(1)}</span>`;

      if (this.order.field === name) {
        title += `<span class="sortable-table__arrow">
          <span class="sortable-table__arrow_${
            this.order.direction === 1 ? "asc" : "desc"
          }"></span>
        </span>`;
      }

      content += `<div class="sortable-table__cell" data-name="${name}" ${
        field.compare ? "data-sortable" : ""
      }>${title}</div>`;
    }

    return content;
  }

  async loadRows() {
    
    let response = await fetch('https://course-js.javascript.ru/api/dashboard/bestsellers');
    
    let products = await response.json();
    
    return products;
  }

  renderBody(rows) {
    let body = document.createElement("div");
    body.className = "sortable-table__body";

    for (let tableRow of rows) {
      let row = document.createElement("a");
      row.className = "sortable-table__row";

      for (let field in this.fields) {
        let cell = document.createElement("div");
        cell.classList.add("sortable-table__cell");
        cell.innerHTML = `${this.fields[field].render(tableRow[field])}`;

        row.append(cell);
      }

      body.append(row);
    }

    this.elem.append(body);
  }

  onHeaderClick(event) {
    let sortHeader = event.target.closest(".sortable-table__cell");
    if (!("sortable" in sortHeader.dataset)) return;

    let field = sortHeader.dataset.name;

    let direction;
    if (field === this.order.field) {
      direction = -this.order.direction;
    } else {
      direction = 1;
    }

    this.sort({
      field,
      direction
    });
  }

  async sort(order = this.order) {
    let sortArrowElem = this.elem.querySelector(".sortable-table__arrow");
    let headerElem = this.elem.querySelector(`[data-name="${order.field}"]`);
    headerElem.append(sortArrowElem);
    sortArrowElem.firstElementChild.className = `sortable-table__arrow_${
      order.direction === 1 ? "asc" : "desc"
    }`;

    this.order = order;

    let rows = await this.loadRows();

    let rowsArray = Array.from(rows);

    let compare = (a, b) =>
      this.fields[order.field].compare(a[order.field], b[order.field]) *
      order.direction;

    rowsArray.sort(compare);

    this.elem.lastElementChild.remove();
    this.renderBody(rowsArray);
  }
}

let table = new SortableTable(fields);
document.body.append(table.elem);
