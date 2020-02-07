import escapeHtml from '../lib/escape-html.js';

let fields = {
  images: {
    title: "image",
    render(src) {
      return `<img class="sortable-table__image" src="${src[0].url}">`;
    },
    compare: null
  },
  title: {
    title: "name",
    render(title) {
      return escapeHtml(String(title))
    },
    compare(value1, value2) {
      return value1 > value2 ? 1 :
        value1 == value2 ? 0 : -1;
    }
  },
  subcategory: {
    title: "category",
    render(subcategory) {
      return `<span>${escapeHtml(subcategory.category.title)}</span>`;
    },
    compare: null
  },
  quantity: {
    title: "quantity",
    render(quantity) {
      return escapeHtml(String(quantity))
    },
    compare(value1, value2) {
      return value1 - value2;
    }
  },
  price: {
    title: "price",
    render(price) {
      return `&#36;${price}`;
    },
    compare(value1, value2) {
      return value1 - value2;
    }
  },
  sales: {
    title: "sales",
    render(sales) {
      return escapeHtml(String(sales))
    },
    compare(value1, value2) {
      return value1 - value2;
    }
  }
};

export { fields };
