
function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterBegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  position = "afterBegin",
  data,
  callback
) {
  parentElement.insertAdjacentHTML(position, template);
  if(callback) callback(data);
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter(logoHref = "index.html", cartHref = "cart/index.html"){
  const headerTemp = await loadTemplate("../partials/header.html");
  const header = qs("#header");
  const footerTemp = await loadTemplate("../partials/footer.html");
  const footer = qs("#footer");
 
  renderWithTemplate(headerTemp.innerHTML, header);
  renderWithTemplate(footerTemp.innerHTML, footer);

  const logoLink = qs(".logo a");
  const cartLink = qs(".cart a");

  if (logoLink) logoLink.href = logoHref;
  if (cartLink) cartLink.href = cartHref;
}

export function changeFormAction(path = "../product-listing/index.html") {
  const observer = new MutationObserver(() => {
    const searchForm = document.forms.searchForm;
    if (searchForm) { 
      searchForm.setAttribute("action", path);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  const main = qs("main");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0);
}


