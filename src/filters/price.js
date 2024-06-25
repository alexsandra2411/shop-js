import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupPrice = (store) => {
  const priceValue = getElement(".price-value");
  const priceForm = getElement(".price-form");
  const priceFilter = getElement(".price-filter");

  //setup filter
  let maxPrice = store.map((item) => item.price);
  maxPrice = Math.max(...maxPrice);
  maxPrice = Math.ceil(maxPrice / 100);
  priceFilter.max = maxPrice;
  priceFilter.value = maxPrice;
  priceFilter.min = 0;
  priceValue.textContent = `Value : $${maxPrice}`;
  priceForm.addEventListener("input", (e) => {
    priceValue.textContent = `Value : $${priceFilter.value}`;
    let newStore = store.filter(
      (item) => item.price / 100 <= parseInt(priceFilter.value)
    );
    if (newStore.length < 1) {
      getElement(".products-container").innerHTML = "nothing found";
    } else {
      display(newStore, getElement(".products-container"), true);
    }
  });
};

export default setupPrice;
