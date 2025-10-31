
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

    window.location.href = 'shopping-cart.html';
}

function removeFromCart(index) {
    var existingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    existingCart.splice(index, 1);

    localStorage.setItem('shoppingCart', JSON.stringify(existingCart));

    initializeCart();
}

function updateTotal(itemIndex, quantityInput) {
    const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    cartItems[itemIndex].quantity = parseInt(quantityInput.value);

    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));

    initializeCart();
}
function validateCheckoutForm() {
    var buyerName = document.getElementById('buyerName').value.trim();
    var buyerAddress = document.getElementById('buyerAddress').value.trim();
    var paymentMode = document.getElementById('paymentMode').value.trim();
    var deliveryDate = document.getElementById('deliveryDate').value.trim();

    if (paymentMode === 'Bank Transfer') {
        var bankName = document.getElementById('bankName').value.trim();
        var accountName = document.getElementById('accountName').value.trim();
        var accountNumber = document.getElementById('accountNumber').value.trim();

        if (!bankName || !accountName || !accountNumber) {
            alert('Please fill in all bank details for Bank Transfer.');
            return false;
        }
    } else if (paymentMode === 'GCash') {

        if (!gcashAccountInfoIsFilled()) {
            alert('Please fill in GCash details for GCash payment.');
            return false;
        }
    }

    if (!buyerName || !buyerAddress || !paymentMode || !deliveryDate) {
        alert('Please fill in all required fields.');
        return false;
    }

    return true;
}

function togglePaymentInfo() {
    var paymentMode = document.getElementById('paymentMode').value;
    var bankTransferForm = document.getElementById('bankTransferForm');
    var gcashInfo = document.getElementById('gcashInfo');

    if (paymentMode === 'Bank Transfer') {
        bankTransferForm.style.display = 'block';
        gcashInfo.style.display = 'none';
    } else if (paymentMode === 'GCash') {
        bankTransferForm.style.display = 'none';
        gcashInfo.style.display = 'block';
    } else {
        bankTransferForm.style.display = 'none';
        gcashInfo.style.display = 'none';
    }
}

function gcashAccountInfoIsFilled() {
    var gcashAccountInfo = document.getElementById('gcashAccountInfo').value.trim();


    return !!gcashAccountInfo; 
}
function placeOrder() {
    if (validateCheckoutForm()) {
    var buyerName = document.getElementById('buyerName').value;
    var buyerAddress = document.getElementById('buyerAddress').value;
    var paymentMode = document.getElementById('paymentMode').value;
    var deliveryDate = document.getElementById('deliveryDate').value;

    var cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    var orderDetails = {
        buyerName: buyerName,
        buyerAddress: buyerAddress,
        paymentMode: paymentMode,
        deliveryDate: deliveryDate,
        items: cartItems
    };
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    window.location.href = 'info-confirmation.html';
}
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
            <div class="item-price-checkout">₱${item.price.toFixed(2)}</div>
            <div class="item-actions">
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" onchange="updateTotal(${index}, this)">
            </div>
        `;
        cartList.appendChild(cartItemElement);
    });

    var total = cartItems.reduce(function (acc, item) {
        return acc + item.price * item.quantity;
    }, 0);
    var totalElement = document.querySelector('.total p');
    totalElement.textContent = `Total: ₱${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', initializeCart);
