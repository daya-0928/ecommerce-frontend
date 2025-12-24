// Get DOM elements
const productGrid = document.getElementById("product-grid");
const loadingMsg = document.getElementById("loading-msg");
const errorMsg = document.getElementById("error-msg");

// Fetch products from Fake Store API
fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then((products) => {
    loadingMsg.style.display = "none";   // hide loading
    displayProducts(products);
    addCartEvents();                     // add cart click events
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
    loadingMsg.style.display = "none";
    errorMsg.style.display = "block";  // show error
  });

// Display Products
function displayProducts(products) {
    productGrid.innerHTML = "";  // clear container

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <div class="product-info">
                <h3>${product.title}</h3>
                <p>₹ ${product.price.toFixed(2)}</p>
                <button>Add to Cart</button>
            </div>
        `;

        productGrid.appendChild(card);
    });
}
// CART SYSTEM
let cart = [];
const cartCount = document.getElementById("cart-count");

// Update cart counter display
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Attach click events to buttons
function addCartEvents() {
    const buttons = document.querySelectorAll(".product-info button");
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".product-card");
            const title = card.querySelector("h3").textContent;
            const price = card.querySelector("p").textContent;
            const img = card.querySelector("img").src;

            cart.push({ title, price, img });
            updateCartCount();

            alert(`${title} added to cart!`);
        });
    });
}
