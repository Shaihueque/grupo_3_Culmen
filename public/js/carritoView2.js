document.addEventListener("DOMContentLoaded", () => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
  
      const productosCarrito = document.getElementById("productos-carrito");
      const subtotalElement = document.querySelector(".subtotal-price p:last-child");
      const totalElement = document.querySelector(".total-price p:last-child");
      
      
  
      fetchProducts(cart).then((products) => {
        const html = generateHTML(products);
        productosCarrito.innerHTML = html;
        const subtotal = calculateSubtotal(products);
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${subtotal.toFixed(2)}`;
  
        // Agregar evento de escucha a los botones de eliminar
        const eliminarBotones = document.querySelectorAll(".eliminar-producto");
        eliminarBotones.forEach((button) => {
          button.addEventListener("click", () => {
            const productId = button.dataset.productId;
            eliminarProducto(productId);
            eliminarProductoUI(productId);
          });
        });
  
        // Agregar eventos de escucha para los botones de sumar y restar cantidad
        const decreaseButtons = document.querySelectorAll(".decrease-quantity");
        const increaseButtons = document.querySelectorAll(".increase-quantity");
  
       /*  decreaseButtons.forEach((button) => {
          button.addEventListener("click", () => {
      const totalElement = document.querySelector(".total-price p:last-child");
            const productId = button.dataset.productId;
            const quantityElement = document.querySelector(`#quantity-${productId}`);
            const newQuantity = parseInt(quantityElement.textContent) - 1;
            updateQuantityInUI(productId, newQuantity, subtotalElement, products);
            updateTotal(totalElement, products);
          });
        }); */
        decreaseButtons.forEach((button) => {
            button.addEventListener("click", () => {
              const productId = button.dataset.productId;
              const quantityElement = document.querySelector(`#quantity-${productId}`);
              const currentQuantity = parseInt(quantityElement.textContent);
              if (currentQuantity > 1) {
                const newQuantity = currentQuantity - 1;
                updateQuantityInUI(productId, newQuantity, subtotalElement, products);
                updateTotal(totalElement, products);
              }
            });
          });
          
  
        increaseButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const productId = button.dataset.productId;
            const quantityElement = document.querySelector(`#quantity-${productId}`);
            const newQuantity = parseInt(quantityElement.textContent) + 1;
            updateQuantityInUI(productId, newQuantity, subtotalElement, products);
            updateTotal(totalElement, products);
          });
        });
  
      });
    }
  });
  

  const totalElement = document.querySelector(".total-price p:last-child");

  function fetchProducts(cart) {
    const promises = cart.map((item) => {
      return fetch(`/api/products/${item.id}`)
        .then((response) => response.json())
        .then(({ product }) => {
          product.cartItemId = item.id; // Agregar una propiedad para identificar el elemento del carrito
          return product;
        });
    });
    return Promise.all(promises);
  }
  
  function generateHTML(products) {
    return products
      .map(
        (product) => `
       
      <div class="product-details">
          <img src="${product.image}" alt="" width="75">
          <i class="fas fa-circle"></i>
          <p class="product-title">${product.name}</p>
          <p class="product-price">$${product.price}</p>
          
          <div class="quantity-container">
              <button class="decrease-quantity" data-product-id="${
                product.id
              }">-</button>
              <span id="quantity-${product.id}" class="quantity">${
          product.quantity ?? 1
        }</span>
  
              <button class="increase-quantity" data-product-id="${
                product.id
              }">+</button>
          </div>
  
          <button class="eliminar-producto" data-product-id="${
            product.id
          }">Eliminar</button>
      </div>
      `
      )
      .join("");
  }
  

  function calculateSubtotal(products) {
    return products.reduce((subtotal, product) => {
      const productPrice = parseFloat(product.price);
      const quantityElement = document.querySelector(`#quantity-${product.id}`);
      const quantity = parseInt(quantityElement.textContent);
      return subtotal + productPrice * quantity;
    }, 0);
  }
  
  
  function eliminarProducto(productId) {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      const updatedCart = cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      location.reload(); // Recargar la página para actualizar el carrito
    }
  }
  
 
   function updateQuantityInUI(productId, newQuantity, subtotalElement, products) {
    const quantityElement = document.querySelector(`#quantity-${productId}`);
    if (quantityElement) {
      quantityElement.textContent = newQuantity;
  
      const priceElement = quantityElement.parentNode.previousElementSibling; // Elemento que contiene el precio
      const product = products.find((product) => product.id == productId);
      const newProductTotal = product.price * newQuantity;
      priceElement.textContent = `$${newProductTotal.toFixed(2)}`;
  
      product.quantity = newQuantity; // Actualizar la cantidad en el objeto del producto
  
      //updateTotal(subtotalElement, products);
      updateTotal(totalElement, products);
    }
  }  
  
  
 /*  function updateTotal(totalElement, products) {
    const total = products.reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0);
    totalElement.textContent = `$${total.toFixed(2)}`;
  } */

/*   function updateTotal(totalElement, products) {
    let total = 0;
    products.forEach((product) => {
      const productPrice = parseFloat(product.price);
      const quantity = product.quantity;
      console.log(productPrice)
      console.log(quantity)
      total += productPrice * quantity;
      console.log(total)
      console.log('------------------------------')
    });
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
 */
  function updateTotal(totalElement, products) {
    let total = 0;
    products.forEach((product) => {
      const productPrice = parseFloat(product.price);
      const quantity = product.quantity;
      if (quantity) {
        total += productPrice * quantity;
      }
    });
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
  
  
  