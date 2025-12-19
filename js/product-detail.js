/* ========================================
   PRODUCT DETAIL PAGE FUNCTIONALITY
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== PRODUCT DATA ==========
    // In a real application, this would come from a database
    const productData = {
        'summer-black': {
            id: 'summer-black',
            name: 'Summer Performance Pants — Black',
            subtitle: 'Lightweight, breathable riding pants designed for flexibility, cooling comfort, and all-day performance.',
            price: 119,
            category: 'Riding Pants',
            shortDesc: 'Engineered with 4-way stretch, quick-dry technology, and precision tailoring — built for riders who demand comfort, control, and confidence during warm-weather rides.',
            images: [
                'images/products/summer-black-pants.jpg',
                'images/products/summer-black-pants-side.jpg',
                'images/products/summer-black-pants-back.jpg',
                'images/products/summer-black-pants-detail.jpg'
            ]
        },
        'winter-thermal': {
            id: 'winter-thermal',
            name: 'Winter Thermal Riding Pants',
            subtitle: 'Insulated riding pants with thermal lining for cold-weather performance.',
            price: 139,
            category: 'Riding Pants',
            shortDesc: 'Thermal performance for winter riding with 4-way stretch and moisture-wicking technology.',
            images: [
                'images/products/winter-pants.jpg',
                'images/products/winter-pants-side.jpg'
            ]
        },
        'skivvy-long-white': {
            id: 'skivvy-long-white',
            name: 'Long Sleeve Performance Skivvy — White',
            subtitle: 'Breathable base layer for year-round riding comfort.',
            price: 69,
            category: 'Skivvies',
            shortDesc: 'Premium moisture-wicking fabric keeps you comfortable during intense training sessions.',
            images: [
                'images/products/skivvy-long-white.jpg',
                'images/products/skivvy-long-white-detail.jpg'
            ]
        }
        // Add more products as needed
    };
    
    // ========== GET PRODUCT ID FROM URL ==========
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'summer-black';
    
    // Get product data
    const product = productData[productId] || productData['summer-black'];
    
    // ========== UPDATE PAGE CONTENT ==========
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productSubtitle').textContent = product.subtitle;
    document.getElementById('productPrice').textContent = `$${product.price} USD`;
    document.getElementById('productShortDesc').textContent = product.shortDesc;
    document.getElementById('breadcrumbCategory').textContent = product.category;
    document.getElementById('breadcrumbProduct').textContent = product.name;
    
    // ========== IMAGE GALLERY FUNCTIONALITY ==========
    const mainImage = document.getElementById('mainProductImage');
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    let currentImageIndex = 0;
    
    // Generate thumbnails
    product.images.forEach((image, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail-item' + (index === 0 ? ' active' : '');
        thumb.innerHTML = `<img src="${image}" alt="Product view ${index + 1}">`;
        thumb.addEventListener('click', () => changeImage(index));
        thumbnailContainer.appendChild(thumb);
    });
    
    // Change image function
    function changeImage(index) {
        currentImageIndex = index;
        mainImage.src = product.images[index];
        
        // Update thumbnail active state
        document.querySelectorAll('.thumbnail-item').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
    
    // Previous/Next image buttons
    document.getElementById('prevImageBtn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
        changeImage(currentImageIndex);
    });
    
    document.getElementById('nextImageBtn').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % product.images.length;
        changeImage(currentImageIndex);
    });
    
    // ========== SIZE SELECTOR ==========
    let selectedSize = 'M';
    
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.getAttribute('data-size');
        });
    });
    
    // ========== QUANTITY SELECTOR ==========
    const quantityInput = document.getElementById('quantityInput');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    
    decreaseBtn.addEventListener('click', () => {
        let qty = parseInt(quantityInput.value);
        if (qty > 1) {
            quantityInput.value = qty - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        let qty = parseInt(quantityInput.value);
        if (qty < 10) {
            quantityInput.value = qty + 1;
        }
    });
    
    // ========== ADD TO CART FUNCTIONALITY ==========
    document.getElementById('addToCartBtn').addEventListener('click', function() {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            size: selectedSize,
            color: 'Black', // Can be dynamic if color selector is used
            quantity: parseInt(quantityInput.value),
            image: product.images[0]
        };
        
        // Add to cart (from cart.js)
        addToCart(cartItem);
        
        // Show success modal
        showCartModal(cartItem);
    });
    
    // ========== BUY NOW FUNCTIONALITY ==========
    document.getElementById('buyNowBtn').addEventListener('click', function() {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            size: selectedSize,
            color: 'Black',
            quantity: parseInt(quantityInput.value),
            image: product.images[0]
        };
        
        // Clear cart and add only this item
        clearCart();
        addToCart(cartItem);
        
        // Redirect to checkout
        window.location.href = 'checkout.html';
    });
    
    // ========== CART MODAL FUNCTIONS ==========
    function showCartModal(item) {
        const modal = document.getElementById('cartModal');
        const message = document.getElementById('cartModalMessage');
        
        message.textContent = `${item.quantity}x ${item.name} (Size: ${item.size}) added to your cart!`;
        modal.classList.add('active');
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            closeCartModal();
        }, 3000);
    }
    
    window.closeCartModal = function() {
        document.getElementById('cartModal').classList.remove('active');
    };
    
    // Close modal on outside click
    document.getElementById('cartModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCartModal();
        }
    });
    
});