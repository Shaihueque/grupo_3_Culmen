
window.onload = ()=>{

    // Obtener el botón "Agregar al carrito"
    const addToCartButton = document.querySelector('.agregar-carrito');

  // Manejar el evento de envío del formulario
  addToCartButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        const productId = addToCartButton.dataset.productId;
        const product = {
            id: productId,
            quantity: 1,
            size: 'XS' // Aquí puedes obtener el valor del tamaño seleccionado por el usuario
        };

        // Obtener el carrito de compras actual del LocalStorage (si existe)
        let cart = localStorage.getItem('cart');
        if (cart) {
        cart = JSON.parse(cart);
        } else {
        cart = [];
        }

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            existingProduct.quantity += 1;
        } else {
            // Si el producto no está en el carrito, agregarlo
            cart.push(product);
        }

        // Guardar el carrito actualizado en el LocalStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Mostrar una notificación o mensaje de éxito
        alert('Producto agregado al carrito');
  });

}

  