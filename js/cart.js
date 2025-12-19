/* ========================================
   SHOPPING CART FUNCTIONALITY
   ======================================== */

// ========== CART STORAGE FUNCTIONS ==========

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('silkspeed_cart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('silkspeed_cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in header
function updateCartCount() {
    const cart = getCart();
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// ========== ADD TO CART FUNCTION ==========
function addToCart(product) {
    const cart = getCart();
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.color === product.color
    );
    
    if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += product.quantity;
    } else {
        // Add new item
        cart.push(product);
    }
    
    saveCart(cart);
    
    return true;
}

// ========== REMOVE FROM CART ==========
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

// ========== UPDATE CART ITEM QUANTITY ==========
function updateCartQuantity(index, quantity) {
    const cart = getCart();
    if (quantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = quantity;
        saveCart(cart);
    }
}

// ========== CLEAR CART ==========
function clearCart() {
    localStorage.removeItem('silkspeed_cart');
    updateCartCount();
}

// ========== GET CART TOTAL ==========
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        const price = parseFloat(item.price);
        return total + (price * item.quantity);
    }, 0);
}

// ========== INITIALIZE CART COUNT ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});