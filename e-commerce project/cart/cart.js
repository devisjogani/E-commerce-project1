

// const products = [
//     { id: 1, title: "Product 1", price: 29.99, image: "product1.jpg" },
//     { id: 2, title: "Product 2", price: 49.99, image: "product2.jpg" },
//     { id: 4, title: "Product 4", price: 49.99, image: "product2.jpg" },
//     { id: 5, title: "Product 5", price: 49.99, image: "product2.jpg" },
//     { id: 6, title: "Product 6", price: 49.99, image: "product2.jpg" },
//     { id: 7, title: "Product 7", price: 49.99, image: "product2.jpg" },
//     { id: 3, title: "Product 3", price: 19.99, image: "product3.jpg" }
// ];

// const productList = document.getElementById("productList");
// const cartItemsElement = document.getElementById("cartItems");
// const cartTotalElement = document.getElementById("cartTotal");
// const checkoutBtn = document.getElementById("checkoutBtn");

// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// function renderProducts() {
//     productList.innerHTML = products
//         .map(product => `
//             <div class="product">
//                 <img src="${product.image}" alt="${product.title}" class="product-img"/>
//                 <div class="product-info">
//                     <h2 class="product-title">${product.title}</h2>
//                     <p class="product-price">$${product.price.toFixed(2)}</p>
//                     <a href="#" class="add-to-cart" data-id="${product.id}">Buy Now</a>
//                 </div>
//             </div>
//         `)
//         .join("");

//     const addToCartButtons = document.getElementsByClassName('add-to-cart');
//     for (let i = 0; i < addToCartButtons.length; i++) {
//         addToCartButtons[i].addEventListener("click", addToCart);
//     }
// }

// function addToCart(event) {
//     event.preventDefault();
//     const productID = parseInt(event.target.dataset.id);
//     const product = products.find(p => p.id === productID);

//     if (product) {
//         const existingItem = cart.find(item => item.id === productID);
//         if (existingItem) {
//             existingItem.quantity++;
//         } else {
//             cart.push({ ...product, quantity: 1 });
//         }

//         saveToLocalStorage();
//         renderCartItems();
//         calculateCartTotal();
//     }
// }

// function removeFromCart(event) {
//     const productID = parseInt(event.target.dataset.id);
//     cart = cart.filter(item => item.id !== productID);
//     saveToLocalStorage();
//     renderCartItems();
//     calculateCartTotal();
// }

// function changeQuantity(event) {
//     const productID = parseInt(event.target.dataset.id);
//     const quantity = parseInt(event.target.value);

//     if (quantity > 0) {
//         const cartItem = cart.find(item => item.id === productID);
//         if (cartItem) {
//             cartItem.quantity = quantity;
//             saveToLocalStorage();
//             calculateCartTotal();
//         }
//     }
// }

// function saveToLocalStorage() {
//     localStorage.setItem("cart", JSON.stringify(cart));
// }

// function renderCartItems() {
//     cartItemsElement.innerHTML = cart
//         .map(item => `
//             <div class="cart-item">
//                 <img src="${item.image}" alt="${item.title}">
//                 <div class="cart-item-info">
//                     <h2 class="cart-item-title">${item.title}</h2>
//                     <input class="cart-item-quantity" 
//                            type="number" 
//                            min="1" 
//                            value="${item.quantity}" 
//                            data-id="${item.id}"/>
//                 </div>
//                 <h2 class="cart-item-price">$${item.price.toFixed(2)}</h2>
//                 <button class="remove-from-cart" data-id="${item.id}">Remove</button>
//             </div>
//         `)
//         .join("");

//     const removeButtons = document.getElementsByClassName('remove-from-cart');
//     for (let i = 0; i < removeButtons.length; i++) {
//         removeButtons[i].addEventListener("click", removeFromCart);
//     }

//     const quantityInputs = document.querySelectorAll(".cart-item-quantity");
//     quantityInputs.forEach(input => {
//         input.addEventListener("change", changeQuantity);
//     });
// }

// function calculateCartTotal() {
//     const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
// }

// function checkout() {
//     alert("Checkout process is not implemented.");
// }

// checkoutBtn.addEventListener("click", checkout);

// renderProducts();
// renderCartItems();
// calculateCartTotal();




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

