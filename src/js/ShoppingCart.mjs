import { getLocalStorage, qs } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice} <br> ${(((item.SuggestedRetailPrice - item.FinalPrice) / item.SuggestedRetailPrice) * 100).toFixed(0)}% Off
     <button class="remove-item" data-id="${item.Id}">X</button></p>
    </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage(this.key);
    const cartFooter = qs(".cart-footer");
    const cartTotal = qs(".cart-total");
  
    if (cartItems && cartItems.length > 0) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      qs(this.parentSelector).innerHTML = htmlItems.join("");
  
      const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
      cartFooter.classList.remove("hide");
      cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  
      // Attach event listeners for remove buttons
      const removeButtons = document.querySelectorAll(".remove-item");
      removeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
          const itemId = event.target.dataset.id; // Get the item's ID
          this.removeItem(itemId); // Call removeItem method
        });
      });
    } else {
      qs(this.parentSelector).innerHTML = "<p>Your cart is empty.</p>";
      cartFooter.classList.add("hide");
    }
  }
  

removeItem(itemId){
  //get current cart items from local storage
  let cartItems = getLocalStorage(this.key);

  //Filter out item to be removed
  cartItems = cartItems.filter(item => item.Id !== itemId);
  
  //update local storage
  localStorage.setItem(this.key, JSON.stringify(cartItems))

  //Re-render the cart
  this.renderCartContents()
}
}
