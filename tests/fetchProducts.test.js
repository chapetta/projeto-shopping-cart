require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Teste se a fetchProducts é uma funçao', () => {
    expect(typeof fetchProducts).toBe('function')
  })
  it('Teste a funçao fetchProducts com o parametro computador e veja se foi chamada', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();

  })
  it('Testa se ao chamar a funçao fetchProducts com o parametro computador, utiliza o endpoint correto', () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    fetchProducts('computador')

    expect(fetch).toBeCalledWith(url);
  })
  it('Testa se o retorno da funçao fechProducts com argumento computador tem a estrutura de dados esperada', async () => {
    const expected = await fetchProducts('computador')

    expect(expected).toEqual(computadorSearch);
  })
});
