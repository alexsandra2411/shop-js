// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";
// specific
import { addToCart } from "../cart/setupCart.js";
import { singleProductUrl, getElement, formatPrice } from "../utils.js";
import { openCart } from "../cart/toggleCart.js";

// selections
const loading = getElement(".page-loading");
const centerDOM = getElement(".single-product-center");
const pageTitleDOM = getElement(".page-hero-title");
const imgDOM = getElement(".single-product-img");
const titleDOM = getElement(".single-product-title");
const companyDOM = getElement(".single-product-company");
const priceDOM = getElement(".single-product-price");
const colorsDOM = getElement(".single-product-colors");
const descDOM = getElement(".single-product-desc");
const cartBtn = getElement(".addToCartBtn");

// cart product
let productID;

// show product when page loads
function initValues(product) {
  document.title = `${product.name.toUpperCase()} | Comfy`;
  pageTitleDOM.textContent = product.name;
  imgDOM.src = product.image;
  titleDOM.textContent = product.name;
  companyDOM.textContent = `by ${product.company}`;
  priceDOM.textContent = formatPrice(product.price);

  product.colors.forEach((color) => {
    const span = document.createElement("span");
    span.classList.add("product-color");
    span.style.backgroundColor = `${color}`;
    colorsDOM.appendChild(span);
  });
  descDOM.textContent = product.description;

  cartBtn.addEventListener("click", () => {
    addToCart(productID);
    openCart();
  });
}
window.addEventListener("DOMContentLoaded", async function () {
  const urlID = window.location.search;
  try {
    const response = await fetch(`${singleProductUrl}${urlID}`);
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      const {
        id,
        fields: { name, price, company, colors, image: img, description },
      } = product;
      productID = product.id;
      const image = img[0].thumbnails.large.url;

      const productItem = {
        id,
        name,
        price,
        company,
        colors,
        image,
        description,
      };

      initValues(productItem);
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `<div>
      <h3 class="error">Something went wrong</h3>
      <a href="index.html" class="btn">Go back </a></div>`;
    }
  } catch (error) {
    centerDOM.innerHTML = `<h3>Something went wrong</h3>`;
  }
  loading.style.display = "none";
});
