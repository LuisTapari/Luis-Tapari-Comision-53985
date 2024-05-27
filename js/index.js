let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    });
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML ="";

    productosElegidos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div>
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}" onclick="agregarAlCarrito(${producto.id})">Agregar</button>
            <select id="cantidad-${producto.id}" name="cantidad">
                <option class="opcion" value="1">1</option>
                <option class="opcion" value="2">2</option>
                <option class="opcion" value="3">3</option>
                <option class="opcion" value="4">4</option>
                <option class="opcion" value="5">5</option>
            </select>
        </div>
    `;

    contenedorProductos.append(div);
});

actualizarBotonesAgregar();
}
cargarProductos(productos);
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);  
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            console.log(productoCategoria);
        
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
        
    })
});


function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}
let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}
let toastActive = false;

function agregarAlCarrito(e){
    if (!toastActive) { // Solo mostrar una notificación si no hay ninguna activa
        toastActive = true; // Marcar que una notificación está activa
        
        Toastify({
            text: "Producto agregado",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #F23869, #3621BF)",
                borderRadius: "2rem",
                textTransform: "uppercase",
                fontSize: ".75rem"
            },
            offset: {
                x: "1.5rem", 
                y: "1.5 rem"
            },
            onClick: function(){} // Callback after click
        }).showToast();

        // Establecer un tiempo de espera para restablecer la variable después de la duración de la notificación
        setTimeout(() => {
            toastActive = false; // Restablecer la variable después de que la notificación desaparezca
        }, 3000);
    }
    const idBoton = e.currentTarget.id;
    const contenedorProducto = e.currentTarget.closest(".producto");
    const cantidadSeleccionada = contenedorProducto.querySelector("select").value;

    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad += parseInt(cantidadSeleccionada);
    } else {
        productoAgregado.cantidad = parseInt(cantidadSeleccionada);
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
    console.log(numerito);
}
