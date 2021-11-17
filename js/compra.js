const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');



cargarEventos();

function cargarEventos() {

    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra())

    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) })
    //reutilizamos eliminar producto

    compra.calcularTotal();

    procesarCompraBtn.addEventListener('click', procesarCompra);

}


function procesarCompra(e) {

    e.preventDefault();
    //evalua si tiene algun producto
    if (compra.obtenerProductosLocalStorege().length === 0) {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'no hay ningun producto seleccionado',
            timer: 2000,
            showConfirmButton: false
        }).then(function () {
            window.location = "bicicletas.html";
        })
        // evalua q todos los campos esten llenados 
    } else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'ingrese todos los campos requeridos',
            timer: 2000,
            showConfirmButton: false
        })
    }
    else {
        Swal.fire({
            type: 'info',
            title: 'Su compra fue realizada con exito' + '\n'
                + 'Muchas Gracias Por su Compra',
            text: 'los detalles del pago le llegaran por e-mail',
        })
        .then(function () {
            
            compra.vaciarLocalStorage();
            window.location = "bicicletas.html";
        })

    }


}
