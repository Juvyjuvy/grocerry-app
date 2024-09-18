// Get modal and form elements
var modal = document.getElementById("addItemModal");
var addListBtn = document.querySelector(".add-list-btn");
var closeModal = document.querySelector(".close-btn");

// Open modal when Add List button is clicked
addListBtn.onclick = function() {
    modal.style.display = "flex";
}

// Close modal when the close button is clicked
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Close modal if the user clicks outside the modal content
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Populate category options
function populateCategories() {
    const categorySelect = document.getElementById("category");
    const categories = ["Fruits", "Vegetables", "Dairy", "Meat", "Bakery", "Others"]; // Example categories

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.toLowerCase(); // Store the category in lowercase
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Call populateCategories function
populateCategories();

// Handle form submission and save the data to localStorage
document.getElementById("addItemForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form values
    var productName = document.getElementById("productName").value;
    var brand = document.getElementById("brand").value;
    var price = document.getElementById("price").value;
    var weightVolume = document.getElementById("weightVolume").value;
    var quantity = document.getElementById("quantity").value;
    var store = document.getElementById("store").value;
    var category = document.getElementById("category").value.toLowerCase(); // Ensure category is in lowercase
    var productImageFile = document.getElementById("productImage").files[0];

    // Convert image file to Base64 string
    if (productImageFile) {
        var reader = new FileReader();
        reader.onloadend = function() {
            var base64Image = reader.result; // This is the Base64 string

            // Create an item object
            var groceryItem = {
                productName: productName,
                brand: brand,
                price: price,
                weightVolume: weightVolume,
                quantity: quantity,
                store: store,
                category: category, // Stored in lowercase
                productImage: base64Image // Store the Base64-encoded image
            };

            // Retrieve existing items from localStorage
            var groceryItems = JSON.parse(localStorage.getItem("groceryItems")) || [];

            // Add new item to the list
            groceryItems.push(groceryItem);

            // Save the updated list to localStorage
            localStorage.setItem("groceryItems", JSON.stringify(groceryItems));

            // Show a success message
            alert("Item added to the list!");

            // Close the modal
            modal.style.display = "none";
        };

        reader.readAsDataURL(productImageFile); // Convert the image to Base64
    } else {
        // If no image is uploaded, proceed without the image
        var groceryItem = {
            productName: productName,
            brand: brand,
            price: price,
            weightVolume: weightVolume,
            quantity: quantity,
            store: store,
            category: category, // Stored in lowercase
            productImage: '' // No image
        };

        var groceryItems = JSON.parse(localStorage.getItem("groceryItems")) || [];
        groceryItems.push(groceryItem);
        localStorage.setItem("groceryItems", JSON.stringify(groceryItems));

        alert("Item added to the list!");
        modal.style.display = "none";
    }
}

// Function to resize image (optional, if needed)
function resizeImage(file, maxSize, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Resize image
            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width *= maxSize / height;
                    height = maxSize;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Convert resized image to Base64
            const dataUrl = canvas.toDataURL('image/jpeg');
            callback(dataUrl);
        };
    };
    reader.readAsDataURL(file);
}
