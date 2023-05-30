const ol = document.querySelector('.cart__items');
const totalValue = document.getElementsByClassName('total-price')[0];

const getTotalPrice = () => {
  const savedTotalPrice = localStorage.getItem('totalPrice');
  return savedTotalPrice ? parseFloat(savedTotalPrice) : 0;
};

let totalPrice = getTotalPrice();

const saveTotalPrice = (price) => {
  localStorage.setItem('totalPrice', price);
};

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
  const priceElement = item.innerText;
  const priceRegex = /PRICE: \$(\d+(\.\d{1,2})?)/;
  const matches = priceElement.match(priceRegex);
  const price = parseFloat(matches[1]);
  totalPrice -= price; // Subtract the price of the removed item
  item.remove();
  saveCartItems(ol.innerHTML);
  totalValue.innerText = `Total: $${totalPrice.toFixed(2)}`;
  saveTotalPrice(totalPrice.toFixed(2));
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
  const buttons = document.querySelectorAll('.item');

  buttons.forEach((element) => {
    element.addEventListener('click', async () => {
      const itemId = getSkuFromProductItem(element);
      const { id, title, price } = await fetchItem(itemId);
      const itemCart = createCartItemElement({ sku: id, name: title, salePrice: price });
      totalPrice += price;
      ol.appendChild(itemCart);
      saveCartItems(ol.innerHTML);

      totalValue.innerText = `Total: $${totalPrice.toFixed(2)}`;
      saveTotalPrice(totalPrice.toFixed(2));
    });
  });
};

const emptyCart = () => {
const emptyButton = document.querySelector('.empty-cart');
  emptyButton.addEventListener('click', () => {
    ol.innerHTML = '';
    totalValue.innerText = 'Total: $0.00';
    totalPrice = 0;
    saveTotalPrice('0,00');
    saveCartItems('');
  });
};

const getLocalStorage = () => {
  const reload = getSavedCartItems();
  ol.innerHTML = reload;
  ol.childNodes.forEach((child) => child.addEventListener('click', cartItemClickListener));

  totalPrice = 0; // Reset the total price

  ol.childNodes.forEach((child) => {
    const priceElement = child.innerText;
    const priceRegex = /PRICE: \$(\d+(\.\d{1,2})?)/;
    const matches = priceElement.match(priceRegex);
    const price = parseFloat(matches[1]);
    totalPrice += price;
  });
  totalValue.innerText = `Total: $${totalPrice.toFixed(2)}`;
  saveTotalPrice(totalPrice.toFixed(2));
};

const loading = () => {
  const loadingElement = document.createElement('p');
  loadingElement.innerText = 'Carregando...';
  loadingElement.className = 'loading';
  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'loading-container';
  loadingContainer.appendChild(loadingElement);
  document.body.appendChild(loadingContainer);
};

const removingLoading = () => {
  const loadingContainer = document.querySelector('.loading-container');
  if (loadingContainer) {
    loadingContainer.remove();
  }
};

window.onload = async () => {
  loading();
  await createProductList();
  await insertItemCart();
  getLocalStorage(); 
  removingLoading();
  totalPrice = getTotalPrice();
  totalValue.innerText = `Total: $${totalPrice.toFixed(2)}`;
  emptyCart();
};
