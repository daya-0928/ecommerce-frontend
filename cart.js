const cartItemsEl = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const cartCountEl = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});

/* RENDER CART */
function renderCart() {
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.textContent = "0";
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="cart-info">
        <h4>${item.title}</h4>
        <p>Size: ${item.size}</p>
        <p>Price: ₹ ${item.price / item.quantity}</p>

        <div class="qty-box">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <p><strong>Subtotal: ₹ ${item.price}</strong></p>

        <button class="remove-btn" onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;

    cartItemsEl.appendChild(div);
  });

  updateTotalPrice();
}

/* QUANTITY CHANGE */
function changeQty(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity < 1) {
    cart[index].quantity = 1;
  }

  const unitPrice = cart[index].price / cart[index].quantity;
  cart[index].price = unitPrice * cart[index].quantity;

  saveCart();
}

/* REMOVE ITEM */
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
}

/* SAVE + REFRESH */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

/* TOTAL PRICE */
function updateTotalPrice() {
  let total = 0;
  cart.forEach(item => total += item.price);
  totalPriceEl.textContent = total;
}

/* CART COUNT */
function updateCartCount() {
  let count = 0;
  cart.forEach(item => count += item.quantity);
  cartCountEl.textContent = count;
}
