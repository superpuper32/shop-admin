import fetchJson from "../../lib/fetch-json.js";
import "../tooltip/index.js";
import { fields } from "../table-fields/fields.js";
import createElement from "../../lib/create-element.js";

export default class SortableTable {
  constructor({ fieldsEnabled, order, url, isDynamic, emptyPlaceholder }) {
    this.fields = fields;
    this.fieldsEnabled = fieldsEnabled;

    this.order = order;

    this.isDynamic = isDynamic;

    this.url = new URL(url, location.href);

    this.emptyPlaceholder = emptyPlaceholder;

    this.data = [];

    this.render();
  }

  async render() {
    this.elem = createElement(`<div class="sortable-table">
      <div data-elem="header" class="sortable-table__header sortable-table__row">
        ${this.renderHeader()}
      </div>
      <div data-elem="body" class="sortable-table__body"></div>
      <div data-elem="loading" class="loading-line sortable-table__loading-line"></div>
      <div data-elem="emptyPlaceholder" class="sortable-table__empty-placeholder"></div>
    </div>`);

    this.elems = {};
    for (let subElem of this.elem.querySelectorAll("[data-elem]")) {
      this.elems[subElem.dataset.elem] = subElem;
    }

    this.elems.emptyPlaceholder.append(this.emptyPlaceholder);

    this.elem.addEventListener(
      "click",
      event =>
        event.target.closest(".sortable-table__header .sortable-table__cell") &&
        this.onHeaderClick(event)
    );

    this.elems.header.addEventListener(
      "pointerdown",
      event =>
        event.target.closest(".sortable-table__cell") && event.preventDefault()
    );

    if (this.isDynamic) {
      window.addEventListener("scroll", event => this.onWindowScroll(event));
    }

    this.loadRows();
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
    this.url.searchParams.set("_sort", this.order.field);
    this.url.searchParams.set(
      "_order",
      this.order.direction === 1 ? "asc" : "desc"
    );
    this.url.searchParams.set("_start", this.data.length);
    this.url.searchParams.set("_end", this.data.length + this.pageSize);

    let products = await fetchJson(this.url);

    if (products.length === 0) {
      this.isLoaded = true;
    } else {
      this.data.push(...products);
      this.renderRows(products);
    }

    this.elem.classList.remove(`sortable-table_loading`);

    if (this.isEmpty()) {
      this.elem.classList.add("sortable-table_empty");
    } else {
      this.elem.classList.remove("sortable-table_empty");
    }
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

  isEmpty() {
    return this.data.length == 0;
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

    if (this.isDynamic) {
      this.data = [];
      this.removeAllRows();
      await this.loadRows();
    } else {
      let comparator = (a, b) =>
        fields[order.field].compare(a, b) * order.direction;

      this.data.sort(comparator);

      this.removeAllRows();
      this.renderRows(this.data);
    }
  }

  removeAllRows() {
    this.elems.body.innerHTML = "";
  }

  renderRowContent(row) {
    let content = "";
    for (let name of this.fieldsEnabled) {
      let field = this.fields[name];
      content += `<div class="sortable-table__cell">${field.render(row)}</div>`;
    }
    return content;
  }

  renderRow(row) {
    return `<div class="sortable-table__row">${this.renderRowContent(
      row
    )}</div>`;
  }

  renderRows(rows) {
    let content = ``;
    for (let row of rows) {
      content += this.renderRow(row);
    }
    this.elems.body.insertAdjacentHTML("beforeEnd", content);
  }

  onWindowScroll() {
    if (this.isLoaded) return;
    if (this.elem.classList.contains("sortable-table_loading")) return;

    let coords = this.elem.getBoundingClientRect();

    if (coords.bottom < document.documentElement.clientHeight) {
      this.loadRows();
    }
  }
}
