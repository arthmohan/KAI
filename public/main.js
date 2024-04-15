function fetchAndDisplayProducts(){

// Fetch and render product data
fetch('/data')
.then(response => response.json())
.then(data => {
  const container = document.getElementById('product-container');

  // Create product boxes
  data.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';

    const img = document.createElement('img');
    img.src = product.Image_Link;
    img.className = 'product-image';

    const name = document.createElement('p');
    name.textContent = product.product_name;
    name.className = 'product-name';

    const category = document.createElement('p');
    category.textContent = product.category;
    category.className = 'product-category';
    category.style.backgroundColor = 'black';
    category.style.borderRadius= '10px'
    category.style.color = 'white';
    category.style.padding = '10px';

    // Create elements for price and MRP
    const price = document.createElement('p');
    price.innerHTML = "<b>Price Range:</b> " + product.price_range;
    price.className = 'product-price';

    const mrp = document.createElement('p');
    mrp.innerHTML = "<b>MRP:</b> " + product.mrp;
    mrp.className = 'product-mrp';

    // Append elements to product div
    productDiv.appendChild(category);
    productDiv.appendChild(img);
    productDiv.appendChild(name);
    productDiv.appendChild(price);
    productDiv.appendChild(mrp);

    // Add event listener to show modal on product click
    productDiv.addEventListener('click', () => {
      const modal = document.getElementById('myModal');
      const span = document.getElementsByClassName('close')[0];
      const buyNowButton = document.getElementById('buy-now');
      const modalText = document.getElementById('modal-text');

      // Clear previous modal content
      modalText.innerHTML = "";

      // Display skin concerns in modal
      const boldText = document.createElement('span');
      boldText.textContent = "Skin Conditions: ";
      boldText.style.fontWeight = 'bold';
      modalText.appendChild(boldText);

      product.skin_concerns.split(', ').forEach(concern => {
        const concernSpan = document.createElement('span');
        concernSpan.textContent = concern;
        concernSpan.className = 'skin-concern';
        modalText.appendChild(concernSpan);
      });

      // Set modal buy now button action
      buyNowButton.onclick = () => window.open(product.Purchase_Link, '_blank');

      // Show modal
      modal.style.display = "block";

      // Close modal on span click
      span.onclick = () => {
        modal.style.display = "none";
      }

      // Close modal on window click
      window.onclick = event => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    });

    // Append product div to container
    container.appendChild(productDiv);
  });
});

}

window.onload = fetchAndDisplayProducts;

// Close modal on escape key press
document.addEventListener('keydown', event => {
const modal = document.getElementById('myModal');
if (event.key === 'Escape' && modal.style.display === "block") {
  modal.style.display = "none";
}
});

