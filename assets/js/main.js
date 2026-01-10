import { renderCatalog, initCatalogControls } from "./pages/catalog.js";
import { renderProductDetail } from "./pages/detail.js";

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  initCatalogControls();
  renderProductDetail();
});

// Scroll to top button functionality
const scrollUpBtn = document.getElementById("scrollUpBtn");

if (scrollUpBtn) {
    window.addEventListener("scroll", () => {
        if (
            document.body.scrollTop > 200 ||
            document.documentElement.scrollTop > 200
        ) {
            scrollUpBtn.style.display = "block";
        } else {
            scrollUpBtn.style.display = "none";
        }
    });

    scrollUpBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const pagination = document.getElementById("pagination");

if (pagination) {
    pagination.addEventListener("click", function (event) {
        if (event.target.tagName === "A" || event.target.tagName === "BUTTON") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    });
}

// Back button functionality on product detail page
const backBtn = document.getElementById("backBtn");

if (backBtn) {
    backBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.history.back();
    });
}
