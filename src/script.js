import './styles.scss';
import data from "./data.js";
import { fields } from "./fields.js";

class SortableTable {
  constructor(tableRows, fields) {
    this.tableRows = tableRows;
    this.fields = fields;
    
    this.order = {
      field: 'title',
      direction: 1
    }

    this.render();
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.className = "sortable-table";
    
    let header = document.createElement("div");
    header.setAttribute('data-elem', 'header');
    header.className = "sortable-table__header sortable-table__row";
    header.insertAdjacentHTML('beforeend', this.renderHeader());
    
    this.elem.append(header);
    
    
    this.renderBody(this.tableRows);
  }

  renderHeader() {
    
    let content = ``;

    for (let name in this.fields) {
      let field = fields[name];
      let title = `<span>${field.title.slice(0,1).toUpperCase() + field.title.slice(1)}</span>`;
      
      if (this.order.field === name) {
        title += `<span class="sortable-table__arrow">
          <span class="sortable-table__arrow_${this.order.direction === 1 ? 'asc' : 'desc'}"></span>
        </span>`
      }

      content += `<div class="sortable-table__cell" data-name="${name}" ${field.compare ? 'data-sortable' : ''}>${title}</div>`
    }

  return content;  
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

  sort(fieldName) {
    if (!this.fields[fieldName].compare) return;
    
    let rowsArray = Array.from(this.tableRows);
    // console.log(this.elem);
    // console.log(rowsArray[0]);
    let compare = (a, b) => {
      return this.fields[fieldName].compare(a[fieldName], b[fieldName]);
    }
    
    rowsArray.sort(compare);
    
    // console.log(rowsArray[0]);
    // this.elem.prepend(...rowsArray);
    this.elem.lastElementChild.remove();
    this.renderBody(rowsArray);
  }
}

document.addEventListener('click', function(e) {
  let target = e.target;
  if (!target.dataset.name) return;
  // console.log(target.dataset.name);
  table.sort(target.dataset.name);
});

let table = new SortableTable(data, fields);
// table.sort("quantity");
document.body.append(table.elem);
// console.log(table.elem.lastElementChild);

