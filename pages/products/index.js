import ProductsTable from "../../components/products-table/index.js";
import createElement from "../../lib/create-element.js";

export default class ProductsPage {
  constructor() {
    this.render();
  }
  async render() {
    this.elem = document.createElement("div");
    this.elem.className = "products-list";

    this.elem = createElement(`<div class="products-list">  
      <div class="content__top-panel">
        <h1 class="page-title">Products</h1>
      </div>
      <div data-elem="productsContainer" class="products-list__container"></div>
    </div>`);

    this.elems = {};
    for (let subElem of this.elem.querySelectorAll("[data-elem]")) {
      this.elems[subElem.dataset.elem] = subElem;
    }

    let emptyPlaceholder = createElement(`<div>
      <p>No products satisfies your filter criteria</p>
      <button type="button" class="button-primary-outline">Reset all filters</button>
    </div>`);

    this.productsTable = new ProductsTable({
      url:
        "https://course-js.javascript.ru/api/rest/products?_embed=subcategory.category",
      isDynamic: true,
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
      },
      emptyPlaceholder
    });

    this.elems.productsContainer.append(this.productsTable.elem);

    return this.elem;
  }
}
