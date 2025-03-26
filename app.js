// Sample items
const shopItems = [
    { id: 1, name: "90s T-Shirt", price: 20 },
    { id: 2, name: "Retro Hat", price: 15 }
];

const ticketOptions = [
    { id: 1, name: "General Admission", price: 25 },
    { id: 2, name: "VIP Ticket", price: 50 }
];

let cart = [];

function displayShop() {
    const shopDiv = document.getElementById("shop-items");
    shopDiv.innerHTML = "";
    shopItems.forEach(item => {
        let itemHTML = `<p>${item.name} - $${item.price} <button onclick="addToCart(${item.id}, 'merch')">Add to Cart</button></p>`;
        shopDiv.innerHTML += itemHTML;
    });
}

function displayTickets() {
    const ticketDiv = document.getElementById("ticket-list");
    ticketDiv.innerHTML = "";
    ticketOptions.forEach(ticket => {
        let ticketHTML = `<p>${ticket.name} - $${ticket.price} <button onclick="addToCart(${ticket.id}, 'ticket')">Add to Cart</button></p>`;
        ticketDiv.innerHTML += ticketHTML;
    });
}

function addToCart(id, type) {
    const item = type === "merch" ? shopItems.find(i => i.id === id) : ticketOptions.find(i => i.id === id);
    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = cart.map(item => `<p>${item.name} - $${item.price}</p>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("shop-items")) displayShop();
    if (document.getElementById("ticket-list")) displayTickets();
});
