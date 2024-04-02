const precioInstrumental = 50;
const precioSoundKit = 30;
const precioProduccion = 100;
const precioPromocion = 75;


function calcularCostoTotal() {
    let nombreUsuario;

    while (true) {
        nombreUsuario = prompt("Hola, ingrese su nombre de usuario");
        if (nombreUsuario) {
            break;
    }   else {
            alert("Por favor, ingresa tu nombre para continuar.");
        }
    }

    alert(`Hola ${nombreUsuario}! Bienvenido/a a la tienda de música urbana. Donde contamos con una amplia variedad de instrumentales, kits de sonido, producciones y promociones para vos! pensandolo por unidad, por favor indique en la siguiente interaccion la cantidad de cada uno que desea llevar`);


    const deseaComprar = confirm("¿Deseas comprar algún producto o servicio?");

    if (!deseaComprar) {
        alert("¡Gracias por visitarnos! ¡Esperamos verte de nuevo pronto!");
        return;
    }

    let cantidadProductos;

    while (true) {
        cantidadProductos = parseInt(prompt("¿Cuántos productos o servicios deseas comprar?"), 10);

        if (!isNaN(cantidadProductos) && cantidadProductos > 0) {
                break;
        }else {
            alert("Cantidad no válida. Por favor, ingresa un número positivo.");
        }
    }


    let costoTotal = 0;


    for (let i = 0; i < cantidadProductos; i++) {
        let seleccion;

        while (true) {

            seleccion = parseInt(prompt("Selecciona el producto o servicio (1: Instrumental ($50), 2: SoundKit ($30), 3: Producción ($100), 4: Promoción ($75)):"), 10);


            if (seleccion >= 1 && seleccion <= 4) {
                break; // Salir del bucle while si la selección es válida
            } else {
                alert("Selección no válida. Por favor, elige un número del 1 al 4.");
            }
        }

        switch (seleccion) {
        case 1:
        costoTotal += precioInstrumental;
        break;
        case 2:
        costoTotal += precioSoundKit;
        break;
        case 3:
        costoTotal += precioProduccion;
        break;
        case 4:
        costoTotal += precioPromocion;
        break;
        }
    }


    alert(`¡Gracias ${nombreUsuario}! El costo total de tus productos y/o servicios seleccionados es: $${costoTotal}. ¡Esperamos que disfrutes tu compra!`);
}


calcularCostoTotal();