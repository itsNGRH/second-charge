const DATA_SOURCE = "sheet"; // "local" | "sheet"

const SHEET_ID = "1V87l8_tXlmQ_z-GwtmDOVH5U_onxqXIH-c7TuxO-bL4";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

let cachedProducts = null;

/* =========================
   PUBLIC API
========================= */

export async function getAllProducts() {
  if (cachedProducts) return cachedProducts;

  try {
    const products =
      DATA_SOURCE === "sheet"
        ? await fetchFromGoogleSheet()
        : await fetchFromLocalJson();

    cachedProducts = products;
    return products;
  } catch (error) {
    console.error("Gagal memuat data produk:", error);
    return [];
  }
}

export async function getProductById(id) {
  const products = await getAllProducts();
  return products.find(p => p.id === Number(id)) || null;
}

/* =========================
   DATA SOURCES
========================= */

async function fetchFromGoogleSheet() {
  const response = await fetch(SHEET_URL);
  const text = await response.text();

  const json = parseGvizResponse(text);
  return normalizeSheetData(json);
  console.log(json.table.rows);
}

async function fetchFromLocalJson() {
  const response = await fetch("assets/data/products.json");
  return response.json();
}

/* =========================
   HELPERS
========================= */

function parseGvizResponse(text) {
  const jsonText = text
    .substring(text.indexOf("{"), text.lastIndexOf("}") + 1);

  return JSON.parse(jsonText);
}

function normalizeSheetData(data) {
  const rows = data.table.rows;

  return rows.map(row => {
    const cells = row.c;

    return {
      id: Number(cells[0]?.v),
      name: String(cells[1]?.v || "").trim(),
      brand: String(cells[2]?.v || "").trim(),
      price: Number(cells[3]?.v),
      condition: String(cells[4]?.v || "").trim(),
      image: String(cells[5]?.v || "").trim(),
      whatsapp: String(cells[6]?.v || "").trim(),
      description: String(cells[7]?.v || "").trim()
    };
  }).filter(product => product.id);
}
