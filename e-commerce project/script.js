let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
    updateIndicators();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function goToSlide(index) {
    showSlide(index);
}

// Automatic slide change every 5 seconds
setInterval(nextSlide, 5000);



// let cart = [];
// const cartItemsElement = document.getElementById('cart-items');
// const cartTotalElement = document.getElementById('cart-total');
// const cartToggle = document.getElementById('cart-toggle');
// const cartSidebar = document.getElementById('cart');
// const cartCloseButton = document.getElementById('cart-close');

// function addToCart(productName, productPrice) {
//     cart.push({ name: productName, price: productPrice });
//     updateCart();
// }

// function updateCart() {
//     cartItemsElement.innerHTML = '';
//     let total = 0;
//     cart.forEach(item => {
//         total += item.price;
//         cartItemsElement.innerHTML += `
//             <li>${item.name} - $${item.price.toFixed(2)}</li>
//         `;
//     });
//     cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
//     cartToggle.textContent = `Cart (${cart.length})`;
// }

// cartToggle.addEventListener('click', () => {
//     cartSidebar.style.left = '0';
// });

// cartCloseButton.addEventListener('click', () => {
//     cartSidebar.style.left = '-300px';
// });



let cart = [];

function addToCart(name, price, image) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    cartItemsDiv.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <div class="item-quantity">
                    <button onclick="updateQuantity('${item.name}', -1)">-</button>
                    <input type="text" value="${item.quantity}" readonly>
                    <button onclick="updateQuantity('${item.name}', 1)">+</button>
                </div>
                <div class="item-total">$${itemTotal.toFixed(2)}</div>
            </div>
            <button onclick="removeFromCart('${item.name}')">Delete</button>
        `;
        
        cartItemsDiv.appendChild(cartItemDiv);
    });
    
    cartTotalSpan.textContent = total.toFixed(2);
}

function updateQuantity(name, change) {
    const product = cart.find(item => item.name === name);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeFromCart(name);
        } else {
            renderCart();
        }
    }
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const isVisible = cartSidebar.style.right === '0px';
    cartSidebar.style.right = isVisible ? '-300px' : '0px';
}

