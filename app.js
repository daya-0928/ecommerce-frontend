const productGrid = document.getElementById("product-grid");
const loadingMsg = document.getElementById("loading-msg");
const errorMsg = document.getElementById("error-msg");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    loadingMsg.style.display = "none";
    displayProducts(data.products);
  })
  .catch(() => {
    loadingMsg.style.display = "none";
    errorMsg.style.display = "block";
  });

function displayProducts(products) {
  productGrid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <div class="product-info">
        <h3>${product.title}</h3>
        <p>₹ ${product.price}</p>
        <button onclick="openProduct(${product.id})">
          View Details
        </button>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}
