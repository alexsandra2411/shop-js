import { getElement } from "../utils.js";
import display from "../displayProducts.js";
const companiesHolder = getElement(".companies");
const companyBtns = document.querySelectorAll(".company-btn");
const setupCompanies = (store) => {
  let companies = ["all", ...new Set(store.map((product) => product.company))];

  companies = companies
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join("");
  companiesHolder.innerHTML = companies;
  companiesHolder.addEventListener("click", (e) => {
    if (e.target.classList.contains("company-btn")) {
      const companyName = e.target.textContent;
      let newStore = store;
      if (companyName !== "all") {
        newStore = store.filter(
          (item) => item.company === e.target.textContent
        );
      }
      display(newStore, getElement(".products-container"), true);
    }
  });
};

export default setupCompanies;
