// import { loadHeaderFooter, changeFormAction, qs } from "./utils.mjs";
// import CheckoutProcess from "./CheckoutProcess.mjs";

// loadHeaderFooter("../index.html", "../cart/index.html");
// changeFormAction();

// const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
// myCheckout.init();

// qs("#zip").addEventListener(
//   "blur",
//   myCheckout.calculateOrdertotal.bind(myCheckout),
// );
// // listening for click on the button
// qs("#checkoutSubmit").addEventListener("click", (e) => {
//   e.preventDefault();
//   const checkoutForm = document.forms.checkout;
//   const checkStatus = checkoutForm.checkValidity();
//   checkoutForm.reportValidity();
//   if (checkStatus) myCheckout.checkout();
// });
