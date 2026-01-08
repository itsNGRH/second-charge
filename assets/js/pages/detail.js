import { getProductById } from "../services/productService.js";
import { formatRupiah, getQueryParam } from "../utils/formatter.js";

export async function renderProductDetail() {
  const container = document.getElementById("productDetail");
  if (!container) return;

  const productId = getQueryParam("id");

  if (!productId) {
    renderNotFound(container);
    return;
  }

  const product = await getProductById(productId);

  if (!product) {
    renderNotFound(container);
    return;
  }

  container.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="Foto ${product.name}">
    </div>

    <div class="product-info">
      <h1>${product.name}</h1>
      <p class="price">${formatRupiah(product.price)}</p>

      <p><strong>Kondisi:</strong> ${product.condition}</p>

      ${product.description ? `
        <p class="description">${product.description}</p>
      ` : ""}

      <br>
      <a 
        href="https://wa.me/${product.whatsapp}?text=Permisi%20kak%2C%20mau%20tanya%20soal%20${product.name}.%20Masih%20ada%3F"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-primary"
      >
        Chat WhatsApp
      </a>
    </div>
  `;
}

/* =========================
   HELPERS
========================= */

function renderNotFound(container) {
  container.innerHTML = `
    <div class="empty-state">
      <p>Produk yang kamu cari tidak ditemukan.</p>
      <a href="index.html" class="btn btn-secondary">Kembali ke katalog</a>
    </div>
  `;
}
