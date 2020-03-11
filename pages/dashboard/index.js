import RangePicker from "../../components/range-picker/index.js";
import createElement from "../../lib/create-element.js";
import ProductsTable from "../../components/products-table/index.js";

export default class DashboardPage {
  constructor() {
    this.section = "dashboard";
  }

  render() {
    this.elem = createElement(`<div class="dashboard">
      <div class="content__top-panel"><h2 class="page-title">Dashboard</h2></div>
    </div>`);

    let range = {
      from: new Date(Date.now() - 30 * 86400e3),
      to: new Date()
    };

    this.rangePicker = new RangePicker(range);

    this.rangePicker.elem.addEventListener("date-select", () =>
      this.onRangePickerUpdate()
    );

    this.elem.firstElementChild.append(this.rangePicker.elem);

    let chartsContainer = document.createElement("div");
    chartsContainer.className = "dashboard__charts";
    this.elem.append(chartsContainer);

    this.bestsellersTable = new ProductsTable({
      url: `https://course-js.javascript.ru/api/dashboard/bestsellers?from=${range.from.toISOString()}&to=${range.to.toISOString()}`,
      fieldsEnabled: [
        "images",
        "title",
        "subcategory",
        "quantity",
        "price",
        "sales"
      ],
      order: {
        field: "title",
        direction: 1
      }
    });

    this.elem.insertAdjacentHTML(
      "beforeEnd",
      `<h3 class="block-title">Best sellers</h3>`
    );
    this.elem.append(this.bestsellersTable.elem);

    return this.elem;
  }

  onRangePickerUpdate() {
    let range = this.rangePicker.getValue();
    this.ordersChart.setRange(range);
    this.salesChart.setRange(range);
    this.customersChart.setRange(range);
    this.bestsellersTable.setUrl(
      `https://course-js.javascript.ru/api/dashboard/bestsellers?from=${range.from.toISOString()}&to=${range.to.toISOString()}`
    );
  }
}
