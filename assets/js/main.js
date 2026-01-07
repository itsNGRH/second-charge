import { renderCatalog, initCatalogControls } from "./pages/catalog.js";
import { renderProductDetail } from "./pages/detail.js";

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  initCatalogControls();
  renderProductDetail();
});
