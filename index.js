const precios = {
    instrumental: 50,
    soundKit: 30,
    produccion: 100,
    promocion: 75,
};

const productos = [
    { id: 1, nombre: 'Instrumental', precio: precios.instrumental },
    { id: 2, nombre: 'SoundKit', precio: precios.soundKit },
    { id: 3, nombre: 'Producción', precio: precios.produccion },
    { id: 4, nombre: 'Promoción', precio: precios.promocion },
];

function obtenerNombreUsuario() {
    let nombreUsuario;
    while (true) {
        nombreUsuario = prompt("Bienvenido! Por favor, ingrese su nombre de usuario");
        if (nombreUsuario) {
            break;
        } else {
            alert("Por favor, ingresa tu nombre para continuar.");
        }
    }
    return nombreUsuario;
}

function deseaComprar(nombreUsuario) {
    return confirm(`Hola ${nombreUsuario}, ¿deseas comprar algún producto o servicio?`);
}

function obtenerCantidadProductos() {
    let cantidadProductos;
    while (true) {
        cantidadProductos = parseInt(prompt("¿Cuántos productos o servicios deseas comprar?"), 10);
        if (!isNaN(cantidadProductos) && cantidadProductos > 0) {
            break;
        } else {
            alert("Cantidad no válida. Por favor, ingresa un número positivo.");
        }
    }
    return cantidadProductos;
}

function seleccionarProducto() {
    let seleccion;
    while (true) {
        seleccion = parseInt(prompt("Selecciona el producto (1: Instrumental, 2: SoundKit, 3: Producción, 4: Promoción):"), 10);
        const productoSeleccionado = productos.find(producto => producto.id === seleccion);
        if (productoSeleccionado) {
            return productoSeleccionado;
        } else {
            alert("Selección no válida. Por favor, elige un número del 1 al 4.");
        }
    }
}

function obtenerFechaVenta() {
    const fecha = new Date();
    return fecha.toLocaleDateString();
}

function mostrarMensajeFinal(nombreUsuario, costoTotal) {
    const fechaVenta = obtenerFechaVenta();
    alert(`¡Gracias ${nombreUsuario}! El costo total de tus productos y/o servicios seleccionados es: $${costoTotal}. Fecha de la venta: ${fechaVenta}. ¡Esperamos que disfrutes tu compra!`);
}

const nombreUsuario = obtenerNombreUsuario();

if (deseaComprar(nombreUsuario)) {
    const cantidadProductos = obtenerCantidadProductos();

    const productosSeleccionados = [];
    for (let i = 0; i < cantidadProductos; i++) {
        productosSeleccionados.push(seleccionarProducto());
    }

    const costoTotal = productosSeleccionados.reduce((total, producto) => total + producto.precio, 0);

    mostrarMensajeFinal(nombreUsuario, costoTotal);
} else {
    alert("¡Gracias por visitarnos! ¡Esperamos verte de nuevo pronto!");
}
