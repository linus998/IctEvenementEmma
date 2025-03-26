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
        shopDiv.innerHTML += `<p>${item.name} - $${item.price} 
        <button onclick="addToCart(${item.id}, 'merch')">Add to Cart</button></p>`;
    });
}

// Display tickets in ticket page
function displayTickets() {
    const ticketDiv = document.getElementById("ticket-list");
    if (!ticketDiv) return;
    ticketDiv.innerHTML = "";
    ticketOptions.forEach(ticket => {
        ticketDiv.innerHTML += `<p>${ticket.name} - $${ticket.price} 
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
    const cartDiv = document.getElementById("cart");
    if (!cartDiv) return;
    cartDiv.innerHTML = cart.length > 0 ? "" : "<p>Your cart is empty.</p>";

    cart.forEach((item, index) => {
        cartDiv.innerHTML += `<p>${item.name} - $${item.price} 
        <button onclick="removeFromCart(${index})">Remove</button></p>`;
    });
}

// Remove items from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Handle theme switching
function switchTheme(theme) {
    document.getElementById("theme-stylesheet").href = `styles-${theme}.css`;
    localStorage.setItem("theme", theme);
}

// Load cart & theme on page load
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("shop-items")) displayShop();
    if (document.getElementById("ticket-list")) displayTickets();
    if (document.getElementById("cart")) updateCart();

    const savedTheme = localStorage.getItem("theme") || "dark";
    switchTheme(savedTheme);
});
