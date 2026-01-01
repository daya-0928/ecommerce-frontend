const productDetail = document.getElementById("product-detail");

/* 🔥 UPDATE COUNT ON PAGE LOAD */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let selectedSize = "M";
let quantity = 1;
let basePrice = 0;
let currentProduct = null;

/* FETCH PRODUCT */
fetch(`https://dummyjson.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {
    currentProduct = product;
    basePrice = Number(product.price);
    renderProduct(product);
  });

function renderProduct(product) {
  productDetail.innerHTML = `
    <div class="product-detail">
      <div class="product-image">
        <img src="${product.thumbnail}" alt="${product.title}">
      </div>

      <div class="product-details">
        <h2>${product.title}</h2>
        <p>${product.description}</p>

        <div class="price">
          ₹ <span id="price">${basePrice}</span>
        </div>

        <h4>Size</h4>
        <div class="variants">
          ${["S","M","L","XL"].map(size =>
            `<button class="${size==="M"?"active":""}"
              onclick="selectSize('${size}', this)">
              ${size}
            </button>`
          ).join("")}
        </div>

        <div class="qty-box">
          <button onclick="changeQty(-1)">−</button>
          <span id="qty">${quantity}</span>
          <button onclick="changeQty(1)">+</button>
        </div>

        <button class="add-cart" onclick="addToCart()">
          Add to Cart
        </button>
      </div>
    </div>

    <div class="toast" id="toast">Item added to cart ✔</div>
  `;
}

/* SIZE SELECT */
function selectSize(size, btn) {
  selectedSize = size;
  document.querySelectorAll(".variants button")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

/* QUANTITY CONTROL */
function changeQty(val) {
  quantity += val;
  if (quantity < 1) quantity = 1;
  if (quantity > 10) quantity = 10;

  document.getElementById("qty").textContent = quantity;
  document.getElementById("price").textContent = basePrice * quantity;
}

/* 🔥 ADD TO CART – DUPLICATE MERGE + SAFE NUMBERS */
function addToCart() {
  if (!currentProduct || quantity <= 0) return;

  const qty = Number(quantity);

  const existingItem = cart.find(item =>
    item.id === currentProduct.id && item.size === selectedSize
  );

  if (existingItem) {
    existingItem.quantity += qty;
    existingItem.price = existingItem.quantity * basePrice;
  } else {
    cart.push({
      id: currentProduct.id,
      title: currentProduct.title,
      img: currentProduct.thumbnail,
      size: selectedSize,
      quantity: qty,                 // 🔥 NUMBER ONLY
      price: basePrice * qty
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast();
}

/* 🔥 FINAL SAFE CART COUNT */
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let totalQty = 0;
  cart.forEach(item => {
    const qty = Number(item.quantity);
    if (!isNaN(qty)) {
      totalQty += qty;
    }
  });

  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = totalQty;
  }
}

/* TOAST MESSAGE */
function showToast() {
  const toast = document.getElementById("toast");
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 2000);
}
