const pages = {
  dashboard: import("../pages/dashboard/index.js"),
  products: import("../pages/products/index.js")
};

export default async function(path, match) {
  let loaded = false;

  setTimeout(() => {
    if (!loaded) {
      document.querySelector("main").classList.add("is-loading");
    }
  }, 100);

  const { default: Page } = await pages[path];
  const page = new Page(match);

  const renderedPage = await page.render();

  loaded = true;

  document.querySelector("main").classList.remove("is-loading");

  const contentNode = document.querySelector("#content");
  contentNode.innerHTML = "";
  contentNode.appendChild(renderedPage);

  return page;
}
