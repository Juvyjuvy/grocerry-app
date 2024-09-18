document.addEventListener('DOMContentLoaded', function () {
  const cartItemsList = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const backButton = document.getElementById('back-button'); // Make sure to correctly select the back button
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let totalPrice = 0;

  function displayCartItems() {
    cartItemsList.innerHTML = '';
    totalPrice = 0; // Reset total price for each display
    if (cartItems.length > 0) {
      cartItems.forEach((item, index) => {
        const itemPrice = parseFloat(item.price);

        // Create a list item for each product
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="item-name ${item.scratch ? 'scratched' : ''}">${item.productName} (${item.weightVolume})</span> 
          - ₱${itemPrice.toFixed(2)} 
          (Quantity: <span class="item-quantity">${item.quantity}</span>)
          <button class="increase-btn" data-index="${index}">+</button>
          <button class="decrease-btn" data-index="${index}">-</button>
          <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        cartItemsList.appendChild(li);

        totalPrice += itemPrice * item.quantity;

        // Scratch item functionality
        li.querySelector('.item-name').addEventListener('click', function () {
          item.scratch = !item.scratch;
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          displayCartItems();
        });

        // Remove item functionality
        li.querySelector('.remove-btn').addEventListener('click', function () {
          cartItems.splice(index, 1);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          displayCartItems();
        });

        // Increase quantity
        li.querySelector('.increase-btn').addEventListener('click', function () {
          cartItems[index].quantity += 1;
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          displayCartItems();
        });

        // Decrease quantity
        li.querySelector('.decrease-btn').addEventListener('click', function () {
          if (cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
          } else {
            cartItems.splice(index, 1); // Remove if quantity is 0
          }
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          displayCartItems();
        });
      });
    } else {
      cartItemsList.innerHTML = '<li>No items in the cart.</li>';
    }

    // Update the total price with the peso sign
    totalPriceElement.textContent = '₱' + totalPrice.toFixed(2);
  }

  displayCartItems();

  // Back to Grocery List functionality
  backButton.addEventListener('click', function () {
    window.location.href = 'groccery.html';
  });
});
