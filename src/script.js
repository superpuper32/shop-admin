import "../styles/styles.scss";
import "babel-polyfill";
import "../components/range-picker/index.js";
import ProductsTable from "../components/products-table/index.js";

let bestsellersTable = new ProductsTable({
  url: `https://course-js.javascript.ru/api/dashboard/bestsellers`,
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

document.body.append(bestsellersTable.elem);
