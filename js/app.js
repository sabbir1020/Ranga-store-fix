const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then(response => response.json())
    .then(data => showProducts(data));
    // console.log(data)
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  // console.log(products);
  const allProducts = products.map((pd) => pd);
  // console.log(allProducts)
  for (const product of allProducts) {
    // console.log(product);
    const image = product.images;
    // console.log(image)
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = 
     ` <div class="single-product">
          <div>
            <img class="product-image"  src=${product.image}></img>
          </div>
          <h3>${product.title}</h3>
          <p>Category: ${product.category}</p>
          <h4> count:${product.rating.count}</h4>
          <p> Rateing:${product.rating.rate}<p>
          <h2>Price: $ ${product.price}</h2>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
          <button id="details-btn" class="btn btn-danger">Details</button>
       </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  // console.log(converted);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  // consol.log(convertPrice)
  const total = convertedOldPrice + convertPrice;
  // console.log(total) elta product er price
  document.getElementById(id).innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal()
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  // console.log(grandTotal)
  document.getElementById("total").innerText = grandTotal;
};
