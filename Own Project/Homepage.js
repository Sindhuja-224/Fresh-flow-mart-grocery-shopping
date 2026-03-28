document.addEventListener("DOMContentLoaded", () => {
  // Use sessionStorage so it erases on refresh
  let cart = JSON.parse(sessionStorage.getItem("flowMartCart")) || [];

  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartIcon = document.getElementById("shop_logo");

  renderCart();

  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".card, .prodcard");
      
      // Select correct heading
      const nameTag = card.querySelector("h2, h3");
      const name = nameTag.innerText.trim();
      
      // Get price and quantity
      const priceText = card.querySelector(".price").innerText.replace("₹", "");
      const price = parseInt(priceText);
      const img = card.querySelector("img").src;
      const qtyInput = card.querySelector("input");
      const qty = parseInt(qtyInput.value);

      if (isNaN(qty) || qty <= 0) {
        alert("Please enter a valid quantity");
        return;
      }

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty += qty;
      } else {
        cart.push({ name, price, qty, img });
      }

      // Visual feedback
      button.innerText = "Added ✓";
      button.disabled = true;
      setTimeout(() => {
        button.innerText = "Add To Cart";
        button.disabled = false;
      }, 800);

      qtyInput.value = "";
      saveAndRender();
    });
  });

  function saveAndRender() {
    // Saves only for this session
    sessionStorage.setItem("flowMartCart", JSON.stringify(cart));
    renderCart();
  }

  function renderCart() {
    if (!cartItems) return; 
    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;
      count += item.qty;

      // Displays name, price, specific quantity, and small image
      cartItems.innerHTML += `
        <div class="cart-row" style="display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #ddd;">
          <img src="${item.img}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;">
          <div style="flex-grow: 1;">
            <h4 style="font-size: 14px; margin: 0;">${item.name}</h4>
            <p style="font-size: 12px; margin: 0; color: #666;">₹${item.price} x ${item.qty}</p>
          </div>
        </div>
      `;
    });

    cartTotal.innerText = total;
    cartCount.innerText = count;
  }

  // Sidebar Open/Close logic
  cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    cartOverlay.style.display = "block";
  });

  cartOverlay.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartOverlay.style.display = "none";
  });
});

/* ===== SEARCH FUNCTIONALITY ===== */
  const searchBox = document.getElementById("serach_box"); // Matches your HTML ID

  if (searchBox) {
    searchBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const filter = searchBox.value.toLowerCase().trim();
        const cards = document.querySelectorAll(".card, .prodcard");
        let found = false;

        cards.forEach(card => {
          // Check h2 or h3 for the product name
          const name = card.querySelector("h2, h3").innerText.toLowerCase();
          
          if (name.includes(filter)) {
            card.style.display = "block"; // Show match
            found = true;
          } else {
            card.style.display = "none"; // Hide non-match
          }
        });

        // Optional: Alert if nothing is found
        if (!found && filter !== "") {
          alert("No products found matching: " + filter);
        }
        
        // If search is cleared, show all products
        if (filter === "") {
          cards.forEach(card => card.style.display = "block");
        }
      }
    });
  }


// Add this inside your DOMContentLoaded in Index.js
document.getElementById("buy-btn").addEventListener("click", () => {
    const cart = JSON.parse(sessionStorage.getItem("flowMartCart")) || [];
    if (cart.length > 0) {
        window.location.href = "Checkout.html";
    } else {
        alert("Add some items first!");
    }
});




