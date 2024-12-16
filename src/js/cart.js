import { loadHeaderFooter, changeFormAction } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter("/index.html", "../cart/index.html");
changeFormAction();
const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
