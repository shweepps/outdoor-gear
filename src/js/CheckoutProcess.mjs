// import { getLocalStorage, setLocalStorage, qs, alertMessage, removeAllAlerts } from "./utils.mjs";
// import ExternalServices from "./ExternalServices.mjs";

// const services = new ExternalServices();

// function formDataToJSON(formElement) {
//   const formData = new FormData(formElement),
//     convertedJSON = {};

//   formData.forEach(function (value, key) {
//     convertedJSON[key] = value;
//   });

//   return convertedJSON;
// };

// function packageItems(items) {
//   const simplifiedItems = items.map((item) => ({
//       id: item.Id,
//       price: item.FinalPrice,
//       name: item.Name,
//       quantity: 1,
//     }));
//   return simplifiedItems;
// };

// export default class CheckoutProcess {
//   constructor(key, outputSelector) {
//     this.key = key;
//     this.outputSelector = outputSelector;
//     this.list = [];
//     this.itemTotal = 0;
//     this.shipping = 0;
//     this.tax = 0;
//     this.orderTotal = 0;
//   }

//   init() {
//     this.list = getLocalStorage(this.key);
//     this.calculateItemSummary();
//   }

//   calculateItemSummary() {
//     const summaryElement = qs(
//       `${this.outputSelector} #cartTotal`
//     );
//     const itemNumElement = qs(
//       `${this.outputSelector} #num-items`
//     );
//     itemNumElement.innerText = this.list.length;
//     const amounts = this.list.map((item) => item.FinalPrice);
//     this.itemTotal = amounts.reduce((sum, item) => sum + item).toFixed(2);
//     summaryElement.innerText = `$${this.itemTotal}`;
//   }

//   calculateOrdertotal() {
//     this.shipping = 10 + (this.list.length - 1) * 2;
//     this.tax = (this.itemTotal * 0.06).toFixed(2);
//     this.orderTotal = (
//       parseFloat(this.itemTotal) +
//       parseFloat(this.shipping) +
//       parseFloat(this.tax)
//     ).toFixed(2);
//     this.displayOrderTotals();
//   }
//   displayOrderTotals() {
//     const shipping = qs(`${this.outputSelector} #shipping`);
//     const tax = qs(`${this.outputSelector} #tax`);
//     const orderTotal = qs(
//       `${this.outputSelector} #orderTotal`
//     );
//     shipping.innerText = `$${this.shipping}`;
//     tax.innerText = `$${this.tax}`;
//     orderTotal.innerText = `$${this.orderTotal}`;
//   }
//   async checkout() {
//     const formElement = document.forms["checkout"];

//     const json = formDataToJSON(formElement);
//     json.orderDate = new Date();
//     json.orderTotal = this.orderTotal;
//     json.tax = this.tax;
//     json.shipping = this.shipping;
//     json.items = packageItems(this.list);
//     try {
//       const res = await services.checkout(json);
//       console.log({res});
//       setLocalStorage("so-cart", []);
//       location.assign("/checkout/success.html");
//     } catch (err) {
//       removeAllAlerts();
//       for(let value of Object.values(await err.message)){
//         alertMessage(value);
//       }
//     }
//   }
// }
