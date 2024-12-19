  import { alertMessage, getLocalStorage,qs, setLocalStorage, renderListWithTemplate } from "./utils.mjs";
  
  
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
      
        // Fetch prices from Amazon and Walmart
        const amazonData = await this.dataSource.fetchAmazonProduct(this.product.NameWithoutBrand);
        const walmartData = await this.dataSource.fetchWalmartProduct(this.product.NameWithoutBrand);
      
        this.product.AmazonPrice = amazonData?.price || "N/A";
        this.product.AmazonLink = amazonData?.link || "#";
        this.product.WalmartPrice = walmartData?.salePrice || "N/A";
        this.product.WalmartLink = walmartData?.productUrl || "#";
      
        this.renderProductDetails();
        this.carousel();
      }
      

      addProductToCart(product) {
         setLocalStorage("so-cart", product);
         alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }

    async renderProductDetails() {
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
    
      // Fetch comparison prices
      let amazonData = {};
      let walmartData = {};
      try {
        amazonData = await this.dataSource.fetchAmazonProduct(this.product.NameWithoutBrand);
        walmartData = await this.dataSource.fetchWalmartProduct(this.product.NameWithoutBrand);
      } catch (error) {
        console.error("Error fetching comparison prices:", error);
      }
    
      // Placeholder prices for Amazon and Walmart
      const amazonPrice = amazonData.price || "N/A";
      const walmartPrice = walmartData.price || "N/A";
      const amazonLink = amazonData.link || "#";
      const walmartLink = walmartData.link || "#";
    
      // Add a comparison section dynamically
      const priceComparisonDiv = `
        <div class="price-comparison">
          <h3>Compare Prices</h3>
          <div class="store">
            <p>Amazon Price: <strong>$${amazonPrice}</strong></p>
            <a href="${amazonLink}" target="_blank">
              <button class="buy-button">Buy on  
                <img id="amazon" src="https://www.blog.thebrandshopbw.com/wp-content/uploads/2022/01/Amazon-Logo-1.jpg" alt=""/>
              </button>
            </a>
          </div>
          <div class="store">
            <p>Walmart Price: <strong>$${walmartPrice}</strong></p>
            <a href="${walmartLink}" target="_blank">
              <button class="buy-button">Buy on 
                <img id="walmart" src="https://media.designrush.com/inspiration_images/345908/conversions/walmart_1-preview.jpg" alt=""/>
              </button>
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
    
      function nextSlide() {
        slideIndex++;
        showSlide(slideIndex);
      }
    }
    
    
}
