// import "babel-polyfill";
import "../styles/styles.sass";
import Main from "../components/main/index.js";
import Router from "../lib/router.js";

let main = new Main();
document.body.append(main.elem);

let router = Router.instance();

router
  .addRoute(/^$/, "dashboard")
  .addRoute(/^products$/, "products")
  .listen();
