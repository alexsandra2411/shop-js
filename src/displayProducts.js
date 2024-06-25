import { formatPrice, getElement } from "./utils.js";
import { addToCart } from "./cart/setupCart.js";
import fetchProducts from "./fetchProducts.js";
import { openCart } from "./cart/toggleCart.js";

const display = (products, placeHolder, filters) => {
  placeHolder.innerHTML = products
    .map((product) => {
      return `<article class="product">
        <div class="product-container">
            <img src="${product.image}" class="product-img img"/>
            <div class="product-icons">
              <a href="product.html?id=${product.id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${
                product.id
              }">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
        </div>
        <footer>
          <p class="product-name">${product.name}</p>
          <h4 class="product-price">${formatPrice(product.price)}</h4>
        </footer>
      </article>`;
    })
    .join("");
  if (filters) return;
  placeHolder.addEventListener("click", function (e) {
    const parent = e.target.parentElement;
    if (parent.classList.contains("product-cart-btn")) {
      addToCart(parent.dataset.id);
      openCart();
    }
  });
};

export default display;
