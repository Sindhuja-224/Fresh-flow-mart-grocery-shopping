document.addEventListener("DOMContentLoaded", () => {
    // 1. Get the cart data from the session
    const cart = JSON.parse(sessionStorage.getItem("flowMartCart")) || [];
    const orderItemsContainer = document.getElementById("order-items-list");
    const totalDisplay = document.getElementById("final-total-val");
    const confirmBtn = document.getElementById("confirm-order-btn");
    const mainContent = document.getElementById("main-content");
    const thanksMsg = document.getElementById("thanks-container");

    let totalAmount = 0;

    // 2. Check if cart is empty
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = `
            <div style="text-align:center; padding: 50px; color: #888;">
                <p>Your cart is empty. Please add items to proceed.</p>
            </div>`;
        confirmBtn.disabled = true;
        confirmBtn.style.opacity = "0.5";
    } else {
        // 3. Loop through cart and display items
        cart.forEach(item => {
            const itemSubtotal = item.price * item.qty;
            totalAmount += itemSubtotal;

            orderItemsContainer.innerHTML += `
                <div class="checkout-card">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p>₹${item.price} × ${item.qty}</p>
                    </div>
                    <div class="item-price">₹${itemSubtotal}</div>
                </div>
            `;
        });
    }

    // 4. Update the total
    totalDisplay.innerText = totalAmount;

    // 5. Final Buy Action
    confirmBtn.addEventListener("click", () => {
        // Hide summary and show Thank You message
        mainContent.style.display = "none";
        thanksMsg.style.display = "flex";
        
        // Clear the session so the cart is erased after purchase
        sessionStorage.removeItem("flowMartCart");
    });
});