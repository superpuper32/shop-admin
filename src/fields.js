let fields = {
    images: {
      title: "Image",
      render(src) {
        return `<img src="${src[0].url}">`;
      },
      compare: null
    },
    title: {
      title: "Name",
      render(title) {
        return title;
      },
      compare(value1, value2) {
        return value1 > value2 ? 1 :
          value1 == value2 ? 0 : -1;
      }
    },
    subcategory: {
      title: "Category",
      render(text) {
        return text;
      },
      compare(value1, value2) {
        return value1 > value2 ? 1 :
          value1 == value2 ? 0 : -1;
      }
    },
    quantity: {
      title: "Quantity",
      render(text) {
        return text;
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
      render(text) {
        return text;
      },
      compare(value1, value2) {
        return value1 - value2;
      }
    }
  };
  
export default fields;
  