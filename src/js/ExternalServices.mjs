import aws4 from "aws4";
const baseURL = import.meta.env.VITE_SERVER_URL;
console.log(baseURL)
function convertToJson(res) {
  const jsonRes = res.json();
  if (res.ok) {
    console.log(res)
    return jsonRes
  } else {
    throw { name: "servicesError", message: jsonRes};;
  }
}

export default class ExternalServices {
  constructor() {}
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    // console.log(data.Result);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout`, options).then(convertToJson);
  }
  // Fetch product details from Amazon
  async fetchAmazonProduct(name) {
    const host = "webservices.amazon.com";
    const path = "/onca/xml";
    const query = {
      Service: "AWSECommerceService",
      Operation: "ItemSearch",
      SearchIndex: "All",
      Keywords: name,
      AWSAccessKeyId: "YOUR_AWS_ACCESS_KEY",
      AssociateTag: "YOUR_ASSOCIATE_TAG",
    };
    const signedRequest = aws4.sign({
      host,
      path,
      method: "GET",
      query,
    });

    const response = await fetch(`https://${host}${path}?${new URLSearchParams(query)}`, signedRequest);
    return await response.json();
  }

  // Fetch product details from Walmart
  async fetchWalmartProduct(name) {
    const response = await fetch(
      `https://api.walmartlabs.com/v1/search?query=${name}&apiKey=YOUR_API_KEY`
    );
    const data = await response.json();
    return data.items?.[0]; // Return the first matching product
  }
}
