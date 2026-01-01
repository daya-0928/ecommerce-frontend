const productDetail = document.getElementById("product-detail");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

let selectedSize = "M";
let quantity = 1;
let basePrice = 0;

fetch(`https://dummyjson.com/products/${productId}`)
  .then(res => res.json())
  .then(product => renderProduct(product));

function renderProduct(product) {
  basePrice = product.price;

  productDetail.innerHTML = `
    <div class="product-detail">
      <div class="product-image">
        <img src="${product.thumbnail}" alt="${product.title}">
      </div>

      <div class="product-details">
        <h2>${product.title}</h2>
        <p>${product.description}</p>

        <div class="price">₹ <span id="price">${basePrice}</span></div>

        <h4>Size</h4>
        <div class="variants">
          ${["S","M","L","XL"].map(size =>
            `<button onclick="selectSize('${size}', this)" class="${size==="M"?"active":""}">${size}</button>`
          ).join("")}
        </div>

        <div class="qty-box">
          <button onclick="changeQty(-1)">−</button>
          <span id="qty">${quantity}</span>
          <button onclick="changeQty(1)">+</button>
        </div>

        <button class="add-cart" onclick="addToCart(${product.id}, '${product.title}', '${product.thumbnail}')">
          Add to Cart
        </button>
      </div>
    </div>

    <div class="toast" id="toast">Added to cart ✔</div>
  `;
}

function selectSize(size, btn) {
  selectedSize = size;
  document.querySelectorAll(".variants button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function changeQty(val) {
  quantity += val;
  if (quantity < 1) quantity = 1;
  if (quantity > 10) quantity = 10;

  document.getElementById("qty").textContent = quantity;
  document.getElementById("price").textContent = basePrice * quantity;
}

function addToCart(id, title, img) {
  cart.push({
    id,
    title,
    img,
    size: selectedSize,
    quantity,
    price: basePrice * quantity
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast();
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 2000);
}
