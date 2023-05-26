require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('teste se a funçao fetchItem é uma funçao', () => {
    expect(typeof fetchItem).toBe('function')
  });
  it('Teste se a funçao fetchItem com o argumento "MLB1615760527" é chamada', () => {
    fetchItem('MLB1615760527')

    expect(fetch).toBeCalled();
  });
  it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint https://api.mercadolibre.com/items/MLB1615760527', () => {
    const url =  'https://api.mercadolibre.com/items/MLB1615760527'
    fetchItem('MLB1615760527')

    expect(fetch).toBeCalledWith(url)
  });
  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    
    const expected = await fetchItem('MLB1615760527')
    expect(expected).toEqual(item)
  })
});
