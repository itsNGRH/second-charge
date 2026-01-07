export function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

export function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

export function updateQueryParams(params) {
  const url = new URL(window.location);
  Object.keys(params).forEach(key => {
    if (params[key]) {
      url.searchParams.set(key, params[key]);
    } else {
      url.searchParams.delete(key);
    }
  });

  window.history.replaceState({}, "", url);
}

export function getAllQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get("q") || "",
    sort: params.get("sort") || "",
    page: parseInt(params.get("page")) || 1
  };
}

export function clearAllQueryParams() {
  const url = new URL(window.location);
  url.search = "";
  window.history.replaceState({}, "", url);
}
