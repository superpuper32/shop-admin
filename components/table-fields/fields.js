import escapeHtml from "../../lib/escape-html.js";
import formatMoney from "../../lib/format-money.js";

let fields = {
  images: {
    title: "image",
    render(src) {
      return `<img class="sortable-table__image" src="${src.images[0].url}">`;
    },
    compare: null
  },
  title: {
    title: "name",
    render(row) {
      return escapeHtml(String(row.title));
    },
    compare(a, b) {
      return a.title.localeCompare(b.title);
    }
  },
  subcategory: {
    title: "category",
    render(row) {
      let tooltip = `<div class="sortable-table-toltip"><span class="sortable-table-tooltip__category">
          ${escapeHtml(row.subcategory.category.title)}
      </span><span class="sortable-table-tooltip__subcategory">
          / ${escapeHtml(row.subcategory.title)}
        </span></div>`;
      return `<span data-tooltip="${escapeHtml(tooltip)}">${escapeHtml(
        row.subcategory.title
      )}</span>`;
    },
    compare: null
  },
  quantity: {
    title: "quantity",
    render(row) {
      return escapeHtml(String(row.quantity));
    },
    compare(a, b) {
      return a.quantity - b.quantity;
    }
  },
  price: {
    title: "price",
    render(row) {
      return `$${formatMoney(+row.price)}`;
    },
    compare(a, b) {
      return a.price - b.price;
    }
  },
  sales: {
    title: "sales",
    render(row) {
      return escapeHtml(String(row.sales));
    },
    compare(a, b) {
      return a.sales - b.sales;
    }
  }
};

export { fields };
