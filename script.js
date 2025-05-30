// Common functionality across pages
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count in navbar
    updateCartCount();
    
    // Quantity selector in product detail page
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');
    const quantityInput = document.getElementById('quantity');
    
    if (incrementBtn && decrementBtn && quantityInput) {
        incrementBtn.addEventListener('click', function() {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
        
        decrementBtn.addEventListener('click', function() {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });
    }
    
    // Add to cart button in product detail page
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const product = {
                id: 1,
                name: document.getElementById('product-name').textContent,
                price: parseInt(document.getElementById('product-price').textContent.replace('₹', '')),
                quantity: parseInt(document.getElementById('quantity').value),
                image: document.getElementById('product-image').src
            };
            addToCart(product);
            updateCartCount();
            alert('Product added to cart!');
        });
    }
    
    // Add to cart buttons in products grid
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            const product = {
                id: this.dataset.id,
                name: card.querySelector('.card-title').textContent,
                price: parseInt(card.querySelector('.card-text').textContent.replace('₹', '')),
                quantity: 1,
                image: card.querySelector('img').src
            };
            addToCart(product);
            updateCartCount();
            alert('Product added to cart!');
        });
    });
});

function updateCartCount() {
    const cart = getCart();
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}