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
}
