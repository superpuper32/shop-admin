let fields = {
  images: {
    title: "Image",
    render(src) {
      return `<img class="sortable-table__image" src="${src[0].url}">`;
    },
    compare: null
  },
  title: {
    title: "Name",
    render(text) {
      return text;
    },
    compare(value1, value2) {
      return value1 > value2 ? 1 :
        value1 == value2 ? 0 : -1;
    }
  },
  subcategory: {
    title: "Category",
    render(text) {
      return text.split('-').map(name => name.slice(0, 1).toUpperCase() + name.slice(1)).join(' ');
    },
    compare: null
  },
  quantity: {
    title: "Quantity",
    render(number) {
      return number;
    },
    compare(value1, value2) {
      return value1 - value2;
    }
  },
  price: {
    title: "Price",
    render(price) {
      return `&#36;${price}`;
    },
    compare(value1, value2) {
      return value1 - value2;
    }
  },
  discount: {
    title: "Sales",
    render(number) {
      return number;
    },
    compare(value1, value2) {
      return value1 - value2;
    }
  }
};

export { fields };
