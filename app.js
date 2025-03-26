// Sample store items
const shopItems = [
    { id: 1, name: "90s T-Shirt", price: 20 },
    { id: 2, name: "Retro Hat", price: 15 }
];

const ticketOptions = [
    { id: 3, name: "General Admission", price: 25 },
    { id: 4, name: "VIP Ticket", price: 50 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display merchandise in shop
function displayShop() {
    const shopDiv = document.getElementById("shop-items");
    if (!shopDiv) return;
    shopDiv.innerHTML = "";
    shopItems.forEach(item => {
        shopDiv.innerHTML += `<p>${item.name} - €${item.price} 
        <button onclick="addToCart(${item.id}, 'merch')">Add to Cart</button></p>`;
    });
}

// Display tickets in ticket page
function displayTickets() {
    const ticketDiv = document.getElementById("ticket-options");
    if (!ticketDiv) return;
    ticketDiv.innerHTML = "";
    ticketOptions.forEach(ticket => {
        ticketDiv.innerHTML += `<p>${ticket.name} - €${ticket.price} 
        <button onclick="addToCart(${ticket.id}, 'ticket')">Add to Cart</button></p>`;
    });
}

// Add items to the cart
function addToCart(id, type) {
    const item = type === "merch" ? shopItems.find(i => i.id === id) : ticketOptions.find(i => i.id === id);
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = cart.length > 0 ? "" : "<p>Your cart is empty.</p>";

    cart.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${item.name} - €${item.price} 
        <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsContainer.appendChild(listItem);
    });

    // Update the total price
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    document.getElementById("total").textContent = `Total: €${totalPrice}`;
}

// Remove items from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Placeholder checkout function
function checkout() {
    if (cart.length > 0) {
        alert("Proceeding to checkout with PayPal.");
        // Add logic for payment processing or redirect to payment page
    } else {
        alert("Your cart is empty!");
    }
}

// Load cart & theme on page load
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("shop-items")) displayShop();
    if (document.getElementById("ticket-options")) displayTickets();
    if (document.getElementById("cart-items")) updateCart();

    const savedTheme = localStorage.getItem("theme") || "dark";
    switchTheme(savedTheme);
});
