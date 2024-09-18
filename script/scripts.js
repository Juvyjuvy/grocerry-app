document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productGrid = document.getElementById('product-grid');
    const editItemForm = document.getElementById('editItemForm');
    let items = JSON.parse(localStorage.getItem('groceryItems')) || [];
    let currentEditingItemIndex = null;
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Updated key to "cartItems"
  
    // Function to update the cart badge
    function updateCartBadge() {
      const cartBadge = document.querySelector('.cart-badge');
      const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      cartBadge.textContent = totalItems;
    }
  
    // Function to create product elements
    function createProductElement(item) {
        const productDiv = document.createElement('div');
        productDiv.className = `grid-product ${item.category}`;
        productDiv.setAttribute('data-name', item.productName);
        productDiv.setAttribute('data-price', item.price);
        productDiv.setAttribute('data-weight', item.weightVolume);
        productDiv.setAttribute('data-brand', item.brand);
        productDiv.setAttribute('data-category', item.category);
  
        productDiv.innerHTML = `
            <img src="${item.productImage || 'images/default.png'}" alt="${item.productName}">
            <h4>${item.productName}</h4>
            <p class="weight-volume">Weight: ${item.weightVolume}</p>
            <p class="price">₱${item.price}</p>
            <p class="quantity">Quantity: ${item.quantity}</p>
            <p class="store">Store: ${item.store}</p>
            <button class="edit-item">Edit</button>
            <button class="add-to-cart">Add to Cart</button>
            <button class="delete-item">Delete</button>
        `;
  
        return productDiv;
    }
  
    // Function to display products by category
    function displayItems(category = 'all') {
        productGrid.innerHTML = '';
  
        items.forEach((item, index) => {
            if (category === 'all' || item.category === category) {
                const productElement = createProductElement(item);
                productElement.dataset.index = index;
                productGrid.appendChild(productElement);
            }
        });
    }
  
    // Event listener for category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            displayItems(category);
        });
    });
  
    // Open modal to edit item
    productGrid.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-item')) {
            const productElement = event.target.closest('.grid-product');
            currentEditingItemIndex = productElement.dataset.index;
            const item = items[currentEditingItemIndex];
  
            document.getElementById('productName').value = item.productName;
            document.getElementById('brand').value = item.brand;
            document.getElementById('price').value = item.price;
            document.getElementById('weightVolume').value = item.weightVolume;
            document.getElementById('category').value = item.category;
            document.getElementById('quantity').value = item.quantity;
            document.getElementById('store').value = item.store;
            
            document.getElementById('productImage').value = '';
  
            document.getElementById('editItemModal').style.display = 'flex';
        }
    });
  
    // Close modal when clicking the close button
    document.querySelector('.close-btn').onclick = function () {
        document.getElementById('editItemModal').style.display = 'none';
    };
  
    // Save changes on form submission
    editItemForm.addEventListener('submit', function (event) {
        event.preventDefault();
  
        const productImageInput = document.getElementById('productImage');
        let newImage = items[currentEditingItemIndex].productImage;
  
        if (productImageInput.files && productImageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                newImage = e.target.result;
                saveItem();
            };
            reader.readAsDataURL(productImageInput.files[0]);
        } else {
            saveItem();
        }
  
        function saveItem() {
            if (currentEditingItemIndex !== null) {
                items[currentEditingItemIndex] = {
                    productName: document.getElementById('productName').value,
                    brand: document.getElementById('brand').value,
                    price: document.getElementById('price').value,
                    weightVolume: document.getElementById('weightVolume').value,
                    category: document.getElementById('category').value,
                    quantity: document.getElementById('quantity').value,
                    store: document.getElementById('store').value,
                    productImage: newImage
                };
  
                localStorage.setItem('groceryItems', JSON.stringify(items));
                displayItems('all');
                document.getElementById('editItemModal').style.display = 'none';
            }
        }
    });
  
    // Delete item functionality
    productGrid.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-item')) {
            const productElement = event.target.closest('.grid-product');
            const index = productElement.dataset.index;
  
            items.splice(index, 1);
            localStorage.setItem('groceryItems', JSON.stringify(items));
            displayItems('all');
        }
    });
  
  
   // Add to Cart functionality
  function addToCart(item) {
      const existingItem = cartItems.find(cartItem => cartItem.productName === item.productName);
  
      if (existingItem) {
          // Ensure the quantity is treated as a number to avoid string concatenation
          existingItem.quantity += parseInt(item.quantity, 10);
      } else {
          // Ensure quantity is stored as a number when adding a new item
          item.quantity = parseInt(item.quantity, 10);
          cartItems.push(item);
      }
  
      localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Updated key to "cartItems"
      updateCartBadge();
  }
  
    // Add to Cart button listener
    productGrid.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productElement = event.target.closest('.grid-product');
            const index = productElement.dataset.index;
            const item = items[index];
  
            addToCart({
                productName: item.productName,
                price: item.price,
                quantity: item.quantity,
                productImage: item.productImage,
                category: item.category
            });
            
            alert(`${item.productName} has been added to the cart!`);
        }
    });
  
    // Search functionality
    document.getElementById('search-input').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const products = document.querySelectorAll('.grid-product');
  
        products.forEach(product => {
            const productName = product.getAttribute('data-name').toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
  
    // Display all items initially
    displayItems('all');
    updateCartBadge();
  });
  