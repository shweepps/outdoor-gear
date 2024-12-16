import {
  getLocalStorage,
  getParams,
  loadHeaderFooter,
  changeFormAction,
  qs,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter("../index.html", "../cart/");
changeFormAction();

const dataSource = new ExternalServices();
const parameter = getParams("product");

const productDetails = new ProductDetails(parameter, dataSource);
productDetails.init();

async function addToCartHandler(e) {
  const productss = getLocalStorage("so-cart")
    ? getLocalStorage("so-cart")
    : [];
  const product = await dataSource.findProductById(e.target.dataset.id);
  productss.push(product);
  productDetails.addProductToCart(productss);
  qs(".cart a svg").classList.add("animateCartIcon");
}

document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
