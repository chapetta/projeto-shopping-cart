const fetchProducts = async (query) => {
  const URL_API = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
