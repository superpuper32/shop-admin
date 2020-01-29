import './styles.scss';
import data from './data.js';
import { fields } from "./fields.js";

class SortableTable {
  constructor(tableRows, fields) {
    this.tableRows = tableRows;
    this.fields = fields;

    this.render();
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.className = "sortable-table";

    this.renderHeader();
    this.renderBody();
  }

  renderHeader() {
    let header = document.createElement("div");
    header.classList.add("sortable-table__header", "sortable-table__row");

    for (let field in this.fields) {
      let cell = document.createElement("div");
      cell.classList.add("sortable-table__cell");
      cell.innerHTML = `<span>${this.fields[field].title}</span>`;
      header.append(cell);
    }

    this.elem.append(header);
  }

  renderBody() {
    let body = document.createElement("div");
    body.className = "sortable-table__body";
    
    for (let tableRow of this.tableRows) {
      let row = document.createElement('a');
      row.className = 'sortable-table__row';
      
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

  sort(fieldName) {
    if (!this.fields[fieldName].compare) return;
    
    this.tableRows.sort((a, b) => {
      return this.fields[fieldName].compare(a[fieldName], b[fieldName]);
    });
    
    this.render();
  }
}

let table = new SortableTable(data, fields);
table.sort('quantity');
document.body.append(table.elem);
