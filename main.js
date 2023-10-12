function Persona(nombre, apellido, email) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.prestamos = [];
}

function simuladorPrestamo(usuario) {
    let solicitarPrestamo = true;
    let cuotaMensual;
    let totalDevolver;
    
    do{
        const tipoPrestamo = prompt("Seleccione el tipo de préstamo:\n1. 12 meses\n2. 18 meses\n3. 36 meses").toLowerCase();
        let tasaInteres = 0;
        let cuotas = 0;

        switch (tipoPrestamo) {
            case "1":
            case "12 meses":
                tasaInteres = 1.29;
                cuotas = 12;
                break;
            case "2":
            case "18 meses":
                tasaInteres = 1.76; 
                cuotas = 18;
                break;
            case "3":
            case "36 meses":
                tasaInteres = 2.17; 
                cuotas = 36;
                break;
            default:
                alert("Opción no válida. Seleccione nuevamente una opción.");
                continue; 
        }

        const montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));

        if (isNaN(montoPrestamo) || montoPrestamo <= 0) {
            alert("El monto del préstamo debe ser un número positivo.");
            continue; 
        }
    
        function calculoInteres(montoPrestamo, tasaInteres){
            let interesTotal = montoPrestamo * tasaInteres;
            return interesTotal;
        }

        function totalADevolver(montoPrestamo, tasaInteres){
            let interes = calculoInteres(montoPrestamo, tasaInteres);
            let montoTotal = montoPrestamo + interes;
            return montoTotal;
        }

        function calculoCuotas(montoPrestamo,tasaInteres,cuotas){
            let total = totalADevolver(montoPrestamo,tasaInteres);
            let cuotaMensual = total / cuotas;
            return cuotaMensual;
        }      
        
        function resumenPrestamo(usuario, tipoPrestamo, montoPrestamo, tasaInteres,cuotas){
            let cuotaCalculada = calculoCuotas(montoPrestamo, tasaInteres, cuotas);
            let totalDevolver = totalADevolver(montoPrestamo, tasaInteres);           

            let resumen= "Resumen del prestamo \n"+
            `Nombre: ${usuario.nombre}\n` +
            `Apellido: ${usuario.apellido}\n` +
            `Correo: ${usuario.email}\n` +
            `Tipo de prestamo: ${tipoPrestamo}\n`+
            `Monto solicitado: $${montoPrestamo}\n`+
            `Tasa de interes: ${(tasaInteres * 100).toFixed(2)}%\n`+
            `Cantidad de cuotas: ${cuotas}\n`+
            `Monto cuota mensual: $${cuotaCalculada.toFixed(2)}\n`+
            `Total a devolver: $${totalDevolver.toFixed(2)}`;

            alert(resumen);
        }


        resumenPrestamo(usuario,tipoPrestamo,montoPrestamo,tasaInteres,cuotas);

        if (usuario.prestamos.length >= 5) {
            alert("Ha llegado al límite de préstamos solicitados. No puede solicitar más por el momento.");
            solicitarPrestamo = false;
        } else {
        const cuotaMensual = calculoCuotas(montoPrestamo, tasaInteres, cuotas);
        const totalDevolver = totalADevolver(montoPrestamo, tasaInteres);

        //Agregamos el prestamo pedido al array
        usuario.prestamos.push({
            tipo: tipoPrestamo,
            monto: montoPrestamo,
            tasa: tasaInteres,
            cuotas: cuotas,
            cuotaMensual: cuotaMensual,
            totalDevolver: totalDevolver
        });

        function mostrarHistorialPrestamos(usuario) {
            console.log(`Historial de prestamos para ${usuario.nombre} ${usuario.apellido} (${usuario.email}):`);
            
            usuario.prestamos.forEach((prestamo, index) => {
                console.log(`\nPrestamo ${index + 1}:`);
                console.log(`Tipo de prestamo: ${prestamo.tipo}`);
                console.log(`Monto solicitado: $${prestamo.monto}`);
                console.log(`Tasa de interes: ${(prestamo.tasa * 100).toFixed(2)}%`);
                console.log(`Cantidad de cuotas: ${prestamo.cuotas}`);
                console.log(`Monto de la cuota mensual: $${prestamo.cuotaMensual.toFixed(2)}`);
                console.log(`Total a devolver: $${prestamo.totalDevolver.toFixed(2)}`);
            });
        }
        
        let opcionValida = false;
            while (!opcionValida) {
                const otraSolicitud = prompt("¿Desea solicitar otro prestamo? (Si/No)").toLowerCase();
                if (otraSolicitud === "si") {
                    opcionValida = true;
                    solicitarPrestamo = true;
                } else if (otraSolicitud === "no") {
                    opcionValida = true;
                    solicitarPrestamo = false;
                } else {
                    alert("Opción no valida. Por favor, seleccione 'Si' o 'No'.");
                }
            }
        }
    }while(solicitarPrestamo);

    alert("Gracias por usar nuestro servicio. ¡Hasta pronto!");

    mostrarHistorialPrestamos(usuario);
}

//Solicitamos el nombre de la persona que va a solicitar el prestamo
const nombre = prompt("Ingrese su nombre:");
const apellido = prompt("Ingrese su apellido:");
const email = prompt("Ingrese su correo electrónico:");
const usuario = new Persona(nombre, apellido, email);

simuladorPrestamo(usuario);
