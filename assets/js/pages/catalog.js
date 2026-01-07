import { getAllProducts } from "../services/productService.js";
import {
  formatRupiah,
  updateQueryParams,
  getAllQueryParams,
  clearAllQueryParams
} from "../utils/formatter.js";

/* =========================================================
   VIEW STATE
   ========================================================= */

let allProducts = [];
let viewProducts = [];
let isLoading = true;

const ITEMS_PER_PAGE = 12;
let currentPage = 1;

/* =========================================================
   DOM BUILDERS
   ========================================================= */

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2 class="product-name">${product.name}</h2>
    <p class="product-condition">Kondisi: ${product.condition}</p>
    <p class="product-price">${formatRupiah(product.price)}</p>
    <a href="product.html?id=${product.id}" class="btn">Lihat</a>
  `;

  return card;
}

function renderEmptyState(container, message) {
  container.innerHTML = `
    <div class="empty-state">
      <p>${message}</p>
    </div>
  `;
}

/* =========================================================
   RENDER
   ========================================================= */

function renderView() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (isLoading) {
    grid.innerHTML = `
      <div class="loading-state">
        <p>Memuat produk...</p>
      </div>
    `;
    return;
  }

  if (viewProducts.length === 0) {
    renderEmptyState(grid, "Tidak ada produk sesuai pencarian atau filter.");
    return;
  }

  viewProducts.forEach(product => {
    grid.appendChild(createProductCard(product));
  });
}

/* =========================================================
   FILTER LOGIC (SINGLE SOURCE OF TRUTH)
   ========================================================= */

function applyFiltersFromState() {
  const { q, condition, sort, page } = getAllQueryParams();
  currentPage = page;

  let result = [...allProducts];

  // Search
  if (q) {
    result = result.filter(product =>
      product.name.toLowerCase().includes(q.toLowerCase()) ||
      product.brand.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Filter kondisi
  if (condition) {
    result = result.filter(product =>
      parseInt(product.condition) >= parseInt(condition)
    );
  }

  // Sort harga
  if (sort === "asc") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sort === "desc") {
    result.sort((a, b) => b.price - a.price);
  }

  const totalItems = result.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  viewProducts = result.slice(startIndex, endIndex);

  renderPagination(totalPages);
  renderView();
}

/* =========================================================
   SYNC UI FROM URL
   ========================================================= */

function syncUIWithURL() {
  const { q, condition, sort } = getAllQueryParams();

  const searchInput = document.getElementById("searchInput");
  const conditionFilter = document.getElementById("conditionFilter");
  const priceSort = document.getElementById("priceSort");

  if (searchInput) searchInput.value = q;
  if (conditionFilter) conditionFilter.value = condition;
  if (priceSort) priceSort.value = sort;
}

/* =========================================================
   EVENT BINDINGS
   ========================================================= */

export function initCatalogControls() {
  const searchInput = document.getElementById("searchInput");
  const conditionFilter = document.getElementById("conditionFilter");
  const priceSort = document.getElementById("priceSort");
  const clearBtn = document.getElementById("clearFilterBtn");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      updateQueryParams({ q: searchInput.value, page: 1 });
      syncUIWithURL();
      applyFiltersFromState();
    });
  }

  if (conditionFilter) {
    conditionFilter.addEventListener("change", () => {
      updateQueryParams({ condition: conditionFilter.value, page: 1 });
      syncUIWithURL();
      applyFiltersFromState();
    });
  }

  if (priceSort) {
    priceSort.addEventListener("change", () => {
      updateQueryParams({ sort: priceSort.value, page: 1 });
      syncUIWithURL();
      applyFiltersFromState();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
    clearAllQueryParams();
    syncUIWithURL();
    applyFiltersFromState();
    });
  }
}

/* =========================================================
   INIT
   ========================================================= */

export async function renderCatalog() {
  isLoading = true;
  renderView();

  allProducts = await getAllProducts();

  isLoading = false;
  syncUIWithURL();
  applyFiltersFromState();
}

function renderPagination(totalPages) {
  const container = document.getElementById("pagination");
  if (!container) return;

  container.innerHTML = "";

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) {
      btn.classList.add("active");
      btn.disabled = true;
    }

    btn.addEventListener("click", () => {
      updateQueryParams({ page: i });
      syncUIWithURL();
      applyFiltersFromState();
    });

    container.appendChild(btn);
  }
}
