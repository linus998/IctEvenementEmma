// Sample store items with multiple images
const shopItems = [
    { 
        id: 1, 
        name: "90s T-Shirt", 
        price: 20, 
        images: ["https://i.ibb.co/Jw4rwwkR/tshirt-voorkant.png", "https://i.ibb.co/ZqN4K93/achterkant-tshirt.png"] // Multiple images
    },
];

// Sample ticket options with images
const ticketOptions = [
    { id: 3, name: "Standaard Ticket", price: 15, image: "https://i.ibb.co/BVn6wNMM/ticket.png" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to show "Added to Cart" message
function showAddedMessage(itemName) {
    const message = document.createElement("div");
    message.className = "added-message";
    message.innerText = `✔️ Added ${itemName} to cart`;
    
    document.body.appendChild(message);
    
    // Remove message after 2 seconds
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// Add items to cart with notification
function addToCart(id, type) {
    const item = type === "merch" ? shopItems.find(i => i.id === id) : ticketOptions.find(i => i.id === id);
    
    if (item) {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        showAddedMessage(item.name);
        updateCart();
    }
}

// Update cart display
function updateCart() {
    const cartDiv = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    if (!cartDiv || !totalElement) return;

    cartDiv.innerHTML = cart.length ? "" : "<p>Your cart is empty.</p>";

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartDiv.innerHTML += `<li>${item.name} - €${item.price} 
        <button onclick="removeFromCart(${index})">Remove</button></li>`;
    });

    totalElement.innerText = `Total: €${total}`;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Load cart & theme on page load
document.addEventListener("DOMContentLoaded", () => {
    updateCart();
});

// Display merchandise in shop
function displayShop() {
    const shopDiv = document.getElementById("shop-items");
    if (!shopDiv) return;
    shopDiv.innerHTML = "";
    shopItems.forEach(item => {
        let imagesHtml = "";
        item.images.forEach((image, index) => {
            imagesHtml += `
                <img src="${image}" alt="${item.name} ${index + 1}" class="item-image">
            `;
        });

        shopDiv.innerHTML += `
            <div class="shop-item">
                <div class="item-images">${imagesHtml}</div> <!-- Display all item images -->
                <p>${item.name} - €${item.price}</p>
                <button onclick="addToCart(${item.id}, 'merch')">Add to Cart</button>
            </div>`;
    });
}

// Display tickets in ticket page
function displayTickets() {
    const ticketDiv = document.getElementById("ticket-options");
    if (!ticketDiv) return;
    ticketDiv.innerHTML = "";
    ticketOptions.forEach(ticket => {
        ticketDiv.innerHTML += `
            <div class="ticket-option">
                <img src="${ticket.image}" alt="${ticket.name}" class="ticket-image">
                <p>${ticket.name} - €${ticket.price}</p>
                <button onclick="addToCart(${ticket.id}, 'ticket')">Add to Cart</button>
            </div>`;
    });
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

