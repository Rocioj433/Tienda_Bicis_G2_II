class Carrito {
    //añadir el producto al carrito
    comprarProducto(e) {
        e.preventDefault();
        //cuando click en agregar carrito lo añada
        if (e.target.classList.contains('agregar-carrito')) {
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto); //lee producto pasando el parametro producto

        }
    }
    leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('.box img').src,
            titulo: producto.querySelector('.title-price h3').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        this.insertarCarrito(infoProducto);
    }
    insertarCarrito(producto) {
        const row = document.createElement('tr');//crea la tabla
        row.innerHTML = `
        <td> 
            <img src ="${producto.imagen}" width=100>
        </td>
        <td> 
         ${producto.titulo}
        </td>
        <td> 
         ${producto.precio}
        </td>
        <td> 
            <a href="#" class= "borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td> 
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto); //se manda el producto al local strorege y este lo crea
    }
    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains('borrar-producto')) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID); //invocamos para elimar el producto
        this.calcularTotal();
    }

    vaciarCarrito(e) {
        e.preventDefault();
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);

        }
        this.vaciarLocalStorage(); //invocar a vaciar el local storage
        return false;
    }

    guardarProductosLocalStorage(producto) {
        let productos;
        productos = this.obtenerProductosLocalStorege(); //invoca la funcion
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos)) //se crea eñ local storage
    }

    obtenerProductosLocalStorege() {
        let productoLS;
        if (localStorage.getItem('productos') === null) {
            productoLS = [];
        } else {
            productoLS = JSON.parse(localStorage.getItem('productos'))
        }
        return productoLS; //me devuelve producto si esta vacio o no
    }

    eliminarProductoLocalStorage(productoID) {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorege();
        productosLS.forEach(function (productoLS, index) {
            if (productoLS.id === productoID) {
                productosLS.splice(index, 1);  //elimina el producto del storage
            }
        });
        localStorage.setItem('productos', JSON.stringify(productosLS))
    }

    // para q no se borren los productos cargados, obtiene el objeto y crea la tabla
    leerLocalStorage() {
        let productoLS;
        productoLS = this.obtenerProductosLocalStorege()
        productoLS.forEach(function (producto) {
            const row = document.createElement('tr');//crea la tabla
            row.innerHTML = `
        <td> 
            <img src ="${producto.imagen}" width=100>
        </td>
        <td> 
         ${producto.titulo}
        </td>
        <td> 
         ${producto.precio}
        </td>
        <td> 
            <a href="#" class= "borrar-producto fas fa-times-circle" data-id="${producto.id}">
        </td>
        `;
            listaProductos.appendChild(row);
        })
    }
    // para el html compra
    leerLocalStorageCompra() {
        let productoLS;
        productoLS = this.obtenerProductosLocalStorege()
        productoLS.forEach(function (producto) {
            const row = document.createElement('tr');//crea la tabla
            row.innerHTML = `
        <td> 
            <img src ="${producto.imagen}" width=100>
        </td>
        <td> 
         ${producto.titulo}
        </td>
        <td> 
         ${producto.precio}
        </td>
        <td> 
         <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
        </td>
        <td> 
         ${producto.precio * producto.cantidad}
        </td>
        <td> 
            <a href="#" class= "borrar-producto fas fa-times-circle" style="font-size:40px" data-id="${producto.id}">
        </td>
        `;
            listaCompra.appendChild(row);
        })
    }

    vaciarLocalStorage() {
        localStorage.clear();
    }

    procesarPedido(e) {
        e.preventDefault();
        if (this.obtenerProductosLocalStorege().length === 0) {
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El carrito esta vacio , Agrega algun producto',
                timer: 2000,
                showConfirmButton: false
            })
        } else {
            location.href = "compra.html";
        }

    }

    calcularTotal() {
        let productoLS;
        let total = 0, subtotal = 0, igv = 0;
        productoLS = this.obtenerProductosLocalStorege();
        console.log(productoLS)
        for (let index = 0; index < productoLS.length; index++) {
            let element = Number(productoLS[index].precio * productoLS[index].cantidad);
            total = total + element;

        }
        igv = parseFloat(total * 0.21).toFixed(2);
        
        subtotal = parseFloat(total - igv).toFixed(2);
        document.getElementById('subtotal').innerHTML = "$ " + subtotal;
        document.getElementById('iva').innerHTML = "$ " + igv;
        document.getElementById('total').innerHTML = "$ " + total.toFixed(2);
    }
}