import { PAGES } from "./constant";

const render = (state) => {
  renderProducts(state);

  if (state.pages === PAGES.CART) {
    renderCart(state);
  } else {
    cartEl.innerHTML = "";
  }
};
const appEl = document.querySelector("#app");
const cartEl = document.querySelector(".cart");
const renderProducts = (state) => {
  const totalItems = Object.values(state.cart).reduce(
    (sum, qty) => sum + qty,
    0
  );
  const viewCart = totalItems > 0 ? `View Cart (${totalItems})` : `View Cart`;

  const hasViewCart = state.pages !== PAGES.CART;

  const listhtml = state.products
    .map(
      (product, index) => `
        <li>
          <span 
              class="product"
              data-index="${index}"
          >
          <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)} each</p>
          </span>
          <button
              data-index="${index}" class="add" type="button">
              Add to Cart
          </button>
      </li>
      `
    )
    .join("");
  appEl.innerHTML = `
 ${
   hasViewCart
     ? `<button type="button" class="page" data-target="cart">${viewCart}</button>`
     : ""
 }
 

  <ul class="products">
    ${listhtml}
    </ul>`;
};

// Render cart contents
function renderCart(state) {
  cartEl.innerHTML = `
    <button type="button" class="page" data-target="products">Hide Cart</button>
    <button type="button" class="checkout" >Checkout</button>
`;

  const cartEntries = Object.entries(state.cart);
  if (cartEntries.length === 0) {
    cartEl.innerHTML += "<p>Nothing in the cart</p>";
    return;
  }

  let totalPrice = 0;

  cartEntries.forEach(([productId, quantity]) => {
    const product = state.products[productId];
    const itemTotal = product.price * quantity;
    totalPrice += itemTotal;
    if (quantity) {
      const cartItemEl = document.createElement("div");
      cartItemEl.classList.add("cart-item");

      cartItemEl.innerHTML = `
            <img src="http://placehold.co/50x50?text=${product.name}" alt="${
        product.name
      }">
            <p>${product.name} - $${product.price.toFixed(
        2
      )} x ${quantity} = $${itemTotal.toFixed(2)}</p>
            <button
              data-index="${productId}" class="delete" type="button">
              -
          </button>
            <span>${quantity}</span>
            <button
              data-index="${productId}" class="add" type="button">
              +
          </button>
        `;
      cartEl.appendChild(cartItemEl);
    }
  });
  const cartTotalEl = document.createElement("p");
  cartTotalEl.classList.add("cart-total");
  cartTotalEl.textContent = `Total: $${totalPrice.toFixed(2)}`;
  cartEl.appendChild(cartTotalEl);
}

export default render;
