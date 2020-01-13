import data from './data.js';
import fields from './fields.js'

class SortableTable {
  constructor(tableRows, fields) {
    this.tableRows = tableRows;
    this.fields = fields;

    this.render()
  }

  render() {
    this.elem = document.createElement('table');
    
    // tablehead
    let tHead = document.createElement('thead');
    let tHeadRow = document.createElement('tr');
    
    for (let field in this.fields) {
      let th = document.createElement('th');
      th.innerHTML = this.fields[field].title;
      tHeadRow.append(th);
    }
    tHead.append(tHeadRow);
    this.elem.append(tHead);

    // fill the table with this.tableRows
    // tablebody
    let tBody = document.createElement('tbody');
    
    for (let row of this.tableRows) {
      let tr = document.createElement('tr');

        for (let field in this.fields) {
          let td = document.createElement('td');
          td.innerHTML = this.fields[field].render(row[field]);
          tr.append(td);
        }

      tBody.append(tr);
    }

    this.elem.append(tBody);
  }

  sort(fieldName) {
    // reorder this.tableRows
    // re-fill the table
    if (!this.fields[fieldName].compare) return;

    this.tableRows.sort((a, b) => {
      return this.fields[fieldName].compare(a[fieldName], b[fieldName]);
    });

    this.render()
  }
}

let table = new SortableTable(data, fields);
table.sort('price');
document.body.append(table.elem);
