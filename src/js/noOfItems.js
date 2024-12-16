import { getLocalStorage, qs } from "./utils.mjs";

function countCartItems() {
  const itemsInCart = getLocalStorage("so-cart");
  const totalNoOfItem = itemsInCart.length;

  const numberInHtml = qs("#noOfItems");

  if (numberInHtml) {
    numberInHtml.innerHTML = totalNoOfItem;
  }
}

function waitForHeaderFooterAndCountItems() {
  const observer = new MutationObserver(() => {
    const numberInHtml = qs("#noOfItems");
    if (numberInHtml) {
      countCartItems();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

waitForHeaderFooterAndCountItems();
