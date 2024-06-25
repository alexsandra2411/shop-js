// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
import display from "../displayProducts.js";
// set items

const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");
let cart = getStorageItem("cart");

export const addToCart = (id) => {
  const store = getStorageItem("store");

  let item = cart.find((cartItem) => {
    return cartItem.id === id;
  });
  if (!item) {
    let product = findProduct(id);
    //add item to the card
    product = { ...product, amount: 1 };

    cart = [...cart, product];

    //add item to the dom
    addToCartDOM(product);
    setStorageItem("cart", cart);
  } else {
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
  }

  //add one to the item count
  displayCartItemCount();
  displayCartTotal();
  //calc the total
  openCart();
};

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      newAmount = item.amount + 1;
      item = { ...item, amount: newAmount };
    }
    return item;
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      newAmount = item.amount - 1;
      item = { ...item, amount: newAmount };
    }
    return item;
  });
  return newAmount;
}

function displayCartItemCount() {
  const amount = cart.reduce((total, item) => {
    total += item.amount;
    return total;
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  let total = cart.reduce((total, item) => {
    return (total += item.amount * item.price);
  }, 0);
  cartTotalDOM.textContent = `Totl : ${formatPrice(total)}`;
}

function displayCartItemsDOM() {
  cart.forEach((item) => {
    addToCartDOM(item);
  });
}
const init = () => {
  displayCartItemCount();
  displayCartTotal();
  displayCartItemsDOM();
  setupCartFunctionality();
};

function setupCartFunctionality() {
  cartItemsDOM.addEventListener("click", function (e) {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;

    if (element.classList.contains("cart-item-remove-btn")) {
      removeItem(id);
      parent.parentElement.remove();
      element.parentElement.parentElement.remove();
    }

    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }

    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount == 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayCartItemCount();
    displayCartTotal();
    setStorageItem("cart", cart);
  });

  function removeItem(id) {
    cart = cart.filter((cartItem) => cartItem.id != id);
  }
}
init();
