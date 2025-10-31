

function addToCart(itemId, itemName, itemPrice, itemImage) {
    var cartItem = {
        name: itemName,
        price: itemPrice,
        quantity: 1, 
        image: itemImage
    };

    var existingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    existingCart.push(cartItem);

    localStorage.setItem('shoppingCart', JSON.stringify(existingCart));

    enableCheckoutButton();
}

function removeFromCart(index) {
    var existingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    existingCart.splice(index, 1);

    localStorage.setItem('shoppingCart', JSON.stringify(existingCart));

    initializeCart();

    enableCheckoutButton();
}

function updateTotal(itemIndex, quantityInput) {
    const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    cartItems[itemIndex].quantity = parseInt(quantityInput.value);

    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));

    initializeCart();

    enableCheckoutButton();
}

function enableCheckoutButton() {
    var checkoutButton = document.getElementById('checkoutButton');
    var cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    checkoutButton.disabled = cartItems.length === 0;
}

function initializeCart() {
    var cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    var cartList = document.querySelector('.cart-items');

    cartList.innerHTML = '';

    cartItems.forEach(function (item, index) {
        var cartItemElement = document.createElement('li');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" class="shop-image img-fluid" alt="${item.name}">
                <p class="item-info">
                    <span class="item-name">${item.name}</span>
                </p>
            </div>
            <div class="item-price">₱${item.price.toFixed(2)}</div>
            <div class="item-actions">
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="updateTotal(${index}, this)">
                <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartList.appendChild(cartItemElement);
    });

    var total = cartItems.reduce(function (acc, item) {
        return acc + item.price * item.quantity;
    }, 0);
    var totalElement = document.querySelector('.total p');
    totalElement.textContent = `Total: ₱${total.toFixed(2)}`;

    enableCheckoutButton();
}

document.addEventListener('DOMContentLoaded', initializeCart);
