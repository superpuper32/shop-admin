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
    render(text) {
      return text;
    },
    compare(value1, value2) {
      return value1 > value2 ? 1 :
        value1 == value2 ? 0 : -1;
    }
  },
  subcategory: {
    title: "category",
    render(subcategory) {
      return subcategory.category.title;
    },
    compare: null
  },
  quantity: {
    title: "quantity",
    render(number) {
      return number;
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
  discount: {
    title: "sales",
    render(number) {
      return number;
    },
    compare(value1, value2) {
      return value1 - value2;
    }
  }
};

export { fields };
