import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupSearch = (store) => {
  const searchInput = getElement(".search-input");
  const inputForm = getElement(".input-form");
  inputForm.addEventListener("keyup", () => {
    const value = searchInput.value;
    const container = getElement(".products-container");
    if (value) {
      let products = store.filter((item) => {
        return item.name.toLowerCase().startsWith(value.toLowerCase());
      });

      display(products, container, true);
      console.log(products.length);
      if (products.length < 1) {
        container.innerHTML = "nothing is found";
      }
    } else {
      display(store, container, true);
    }
  });
};

export default setupSearch;
