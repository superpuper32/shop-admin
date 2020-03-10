import escapeHtml from "../../lib/escape-html.js";
import formatMoney from "../../lib/format-money.js";

let fields = {
  images: {
    title: "Image",
    render(row) {
      return row.images.length
        ? `<img class="sortable-table__image" alt="Image" src="${row.images[0].url}">`
        : "";
    },
    compare: null
  },
  title: {
    title: "Name",
    render(row) {
      return escapeHtml(String(row.title));
    },
    compare(a, b) {
      return a.title.localeCompare(b.title);
    }
  },
  subcategory: {
    title: "Category",
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
    title: "Quantity",
    render(row) {
      return escapeHtml(String(row.quantity));
    },
    compare(a, b) {
      return a.quantity - b.quantity;
    }
  },
  price: {
    title: "Price",
    render(row) {
      return `$${formatMoney(+row.price)}`;
    },
    compare(a, b) {
      return a.price - b.price;
    }
  },
  sales: {
    title: "Sales",
    render(row) {
      return escapeHtml(String(row.sales));
    },
    compare(a, b) {
      return a.sales - b.sales;
    }
  }
};

export { fields };
