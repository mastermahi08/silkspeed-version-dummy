/* ========================================
   SHOP PAGE - FILTER, SORT & SEARCH
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Get all products
    const productCards = document.querySelectorAll('.product-card');
    const productGrid = document.getElementById('productGrid');
    const productCount = document.getElementById('productCount');
    const noResults = document.getElementById('noResults');
    
    // Get filter controls
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    
    // Current filter state
    let currentCategory = 'all';
    let currentSearchTerm = '';
    let currentSort = 'featured';
    
    // ========== CATEGORY FILTER ==========
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update current category
            currentCategory = this.getAttribute('data-category');
            
            // Apply filters
            applyFilters();
        });
    });
    
    // ========== SEARCH FUNCTIONALITY ==========
    searchInput.addEventListener('input', function() {
        currentSearchTerm = this.value.toLowerCase();
        applyFilters();
    });
    
    // ========== SORT FUNCTIONALITY ==========
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        sortProducts();
    });
    
    // ========== APPLY FILTERS FUNCTION ==========
    function applyFilters() {
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const productName = card.getAttribute('data-name').toLowerCase();
            
            // Check category match
            const categoryMatch = currentCategory === 'all' || category === currentCategory;
            
            // Check search match
            const searchMatch = currentSearchTerm === '' || productName.includes(currentSearchTerm);
            
            // Show or hide product
            if (categoryMatch && searchMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update product count
        productCount.textContent = visibleCount;
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
            productGrid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            productGrid.style.display = 'grid';
        }
        
        // Re-apply sort after filtering
        sortProducts();
    }
    
    // ========== SORT PRODUCTS FUNCTION ==========
    function sortProducts() {
        const visibleProducts = Array.from(productCards).filter(card => 
            card.style.display !== 'none'
        );
        
        visibleProducts.sort((a, b) => {
            switch(currentSort) {
                case 'price-low':
                    return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
                
                case 'price-high':
                    return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
                
                case 'name':
                    return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
                
                case 'newest':
                    // Products with "New" badge first
                    const aIsNew = a.querySelector('.product-badge')?.textContent === 'New';
                    const bIsNew = b.querySelector('.product-badge')?.textContent === 'New';
                    return bIsNew - aIsNew;
                
                case 'featured':
                default:
                    // Products with badges first (Bestseller, New, Limited)
                    const aHasBadge = a.querySelector('.product-badge') !== null;
                    const bHasBadge = b.querySelector('.product-badge') !== null;
                    return bHasBadge - aHasBadge;
            }
        });
        
        // Re-append products in sorted order
        visibleProducts.forEach(product => {
            productGrid.appendChild(product);
        });
    }
    
    // ========== RESET FILTERS FUNCTION ==========
    window.resetFilters = function() {
        // Reset filter state
        currentCategory = 'all';
        currentSearchTerm = '';
        currentSort = 'featured';
        
        // Reset UI
        filterButtons.forEach(btn => btn.classList.remove('active'));
        filterButtons[0].classList.add('active');
        searchInput.value = '';
        sortSelect.value = 'featured';
        
        // Re-apply
        applyFilters();
    };
    
    // ========== INITIAL LOAD ==========
    applyFilters();
    
    // ========== SMOOTH SCROLL TO PRODUCTS ON FILTER ==========
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productsSection = document.querySelector('.products-section');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
});

// ========== ADD TO CART FUNCTIONALITY (Preview) ==========
// This will be fully implemented in cart.js
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-small') || e.target.closest('.btn-small')) {
        // Prevent default for now (links go to product detail)
        // Later we can add "Add to Cart" buttons with this functionality
        console.log('Product clicked - navigating to detail page');
    }
});