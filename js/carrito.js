const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const idCompra = document.querySelector("#id-compra");


function cargarProductosCarrito() {
    if (productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="../${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id=${producto.id}><i class="bi bi-dash-square"></i></button>
                <button class="carrito-producto-agregar-uno" id=${producto.id}><i class="bi bi-file-plus"></i></button>
                <button class="carrito-producto-borrar-todo" id=${producto.id}><i class="bi bi-trash"></i></button>  
            `;
            contenedorCarritoProductos.append(div);
        });

        actualizarBotonesEliminar();
        actualizarTotal();
        actualizarBotonesAgregarUno();
        actualizarBotonesBorrarTodas();
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
} 

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro?",
        icon: "question",
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Sí`,
        cancelButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
            limpiarIDCompra();
        }
    });
}

function actualizarBotonesAgregarUno() {
    const botonesAgregarUno = document.querySelectorAll(".carrito-producto-agregar-uno");

    botonesAgregarUno.forEach(boton => {
        boton.addEventListener("click", function() {
            const idBoton = this.getAttribute("id");
            agregarUnaUnidad(idBoton);
        });
    });
}

function agregarUnaUnidad(idBoton) {
    const producto = productosEnCarrito.find(producto => producto.id === idBoton);

    if (producto) {
        producto.cantidad++;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        actualizarTotal();
    } else {
        console.error("Producto no encontrado en el carrito");
    }
}

function actualizarBotonesBorrarTodas() {
    const botonesBorrarTodas = document.querySelectorAll(".carrito-producto-borrar-todo");

    botonesBorrarTodas.forEach(boton => {
        boton.addEventListener("click", function() {
            const idBoton = this.getAttribute("id");
            eliminarTodasLasUnidades(idBoton);
        });
    });
}

function eliminarTodasLasUnidades(idBoton) {
    const producto = productosEnCarrito.find(producto => producto.id === idBoton);

    if (producto) {
        productosEnCarrito.splice(productosEnCarrito.indexOf(producto), 1);
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        actualizarTotal();
    } else {
        console.error("Producto no encontrado en el carrito");
    }
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    document.querySelector("#total").innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", () => {
    Swal.fire({
        title: "¿Quieres confirmar la compra?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: `Sí`,
        cancelButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
            contenedorCarritoComprado.classList.remove("disabled");
            mostrarResumenDeCompra(generarIDUnico(), document.querySelector("#total").innerText);
        }
    });
});

function mostrarResumenDeCompra(idUnico, total) {
    const resumenCompra = document.getElementById("resumen-compra");
    const idCompra = document.getElementById("id-compra");

    if (resumenCompra) {
        const fechaEntrega = resumenCompra.querySelector("#fecha-entrega span");
        const totalResumen = resumenCompra.querySelector("#total-resumen");

        const fechaEntregaEstimada = obtenerFechaEstimada();
        fechaEntrega.textContent = fechaEntregaEstimada;
        totalResumen.textContent = `$${total}`;
        idCompra.textContent = idUnico;
        resumenCompra.classList.remove("disabled");
    } else {
        console.error("Elemento con ID 'resumen-compra' no encontrado.");
    }
}

function generarIDUnico() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 100);
    return `${timestamp}-${randomNumber}`;
}

function obtenerFechaEstimada() {
    const fechaActual = new Date();
    const diasEstimadosEntrega = 5; 
    const fechaEstimada = new Date(fechaActual.getTime() + (diasEstimadosEntrega * 24 * 60 * 60 * 1000));
    return fechaEstimada.toLocaleDateString();
}

function limpiarIDCompra() {
    const idCompra = document.getElementById("id-compra");
    if (idCompra) {
        idCompra.textContent = "";
    }
}
