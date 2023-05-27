const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

// começando
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = ({ target }) => {
  const item = target;
  item.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const createProductList = async () => {
  const { results } = await fetchProducts('computador');
  const section = document.querySelector('.items');
  results.forEach((element) => {
    const { id, title, thumbnail } = element;
    section.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

const insertItemCart = async () => {
  const ol = document.querySelector('.cart__items');
  const buttons = document.querySelectorAll('.item');

  buttons.forEach((element) => {
    element.addEventListener('click', async () => {
      const itemId = getSkuFromProductItem(element);
      const { id, title, price } = await fetchItem(itemId);
      console.log(id, title, price);
      ol.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));
    });
  });
};

window.onload = async () => {
  await createProductList();
  await insertItemCart();
   cartItemClickListener();
};
