  import { alertMessage, getLocalStorage,qs, setLocalStorage, renderListWithTemplate } from "./utils.mjs";
  
  // function productImageTemplate(product){  
  //   product.Images.ExtraImages.forEach(image => {
  //    `<img class="slide" src=${image.Src} alt="Image of${product.Name}">`
  //   });
  // }
  function productImageTemplate(ExtraImage){  
    return `
        <img class="slide" src=${ExtraImage.Src} alt="Image of${ExtraImage.Title}">
`
  }
  

  export default class ProductDetails {
    constructor(productId,  dataSource) {
        this.productId = productId;      
        this.product = {};               
        this.dataSource = dataSource;  
      }

      async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        this.carousel()
      }

      addProductToCart(product) {
         setLocalStorage("so-cart", product);
         alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }

    renderProductDetails() {
      // Set product title, brand, and image
      qs(".product-detail h3").innerHTML = this.product.Brand.Name;
      qs(".product-detail h2").innerHTML = this.product.NameWithoutBrand;
      renderListWithTemplate(productImageTemplate, qs(".slides"), this.product.Images.ExtraImages);
    
      const newChild = document.createElement("img");
      newChild.src = this.product.Images.PrimaryLarge;
      newChild.alt = this.product.Name;
      qs(".slides").prepend(newChild);
    
      // Set product price and other details
      qs(".product-card__price").innerHTML = "Price " + `$${this.product.FinalPrice}`;
      qs(".product__color").innerHTML = this.product.Colors[0]?.ColorName || "N/A";
      qs(".product__description").innerHTML = this.product.DescriptionHtmlSimple;
      qs(".product-detail__add button").setAttribute("data-id", this.product.Id);
    
      // Placeholder prices for Amazon and Walmart
      const amazonPrice = this.product.AmazonPrice || "N/A";
      const walmartPrice = this.product.WalmartPrice || "N/A";
      const amazonLink = this.product.AmazonLink || "#";
      const walmartLink = this.product.WalmartLink || "#";
    
      // Add a comparison section dynamically
      const priceComparisonDiv = `
        <div class="price-comparison">
          <h3>Compare Prices</h3>
          <div class="store">
            <p>Amazon Price: <strong>$${amazonPrice}</strong></p>
            <a href="${amazonLink}" target="_blank">
              <button class="buy-button">Buy on Amazon</button>
            </a>
          </div>
          <div class="store">
            <p>Walmart Price: <strong>$${walmartPrice}</strong></p>
            <a href="${walmartLink}" target="_blank">
              <button class="buy-button">Buy on Walmart</button>
            </a>
          </div>
        </div>
      `;
    
      // Append to the product details container
      qs(".product-detail").insertAdjacentHTML("beforeend", priceComparisonDiv);
    }
    
    carousel() {
      const slides = document.querySelectorAll(".slides img");
      let slideIndex = 0;
      let intervalId = null;

      initializeSlider();
     
      
      function initializeSlider() {
        if (slides.length > 0) {
          slides[slideIndex].classList.add("displaySlide");
          intervalId = setInterval(nextSlide, 3000);
        }
        
      }
      function showSlide(index) {
        if (index >= slides.length) {
          slideIndex = 0
        } else if (index < 0) {
          slideIndex = slides.length - 1;
        }

        slides.forEach(slide => {
          slide.classList.remove("displaySlide");
        });
        slides[slideIndex].classList.add("displaySlide");
      }
      // function prevSlide() {
      //   clearInterval(intervalId);
      //   slideIndex--;
      //   showSlide(slideIndex)
      // }
      function nextSlide() {
        slideIndex++;
        showSlide(slideIndex);
      }
    }

    
}
