function simuladorPrestamo() {
    let solicitarPrestamo = true;

    while (solicitarPrestamo) {
        const tipoPrestamo = prompt("Seleccione el tipo de préstamo:\n1. Trimestral\n2. Semestral\n3. Anual").toLowerCase();
        let tasaInteres = 0;
        let cuotas = 0;

        switch (tipoPrestamo) {
            case "1":
            case "trimestral":
                tasaInteres = 0.45;
                cuotas = 3;
                break;
            case "2":
            case "semestral":
                tasaInteres = 0.69; 
                cuotas = 6;
                break;
            case "3":
            case "anual":
                tasaInteres = 0.94; 
                cuotas = 12;
                break;
            default:
                console.log("Opción no válida.");
                continue; 
        }

        const montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));

        if (isNaN(montoPrestamo) || montoPrestamo <= 0) {
            console.log("El monto del préstamo debe ser un número positivo.");
            continue; 
        }
        const interesTotal = montoPrestamo * tasaInteres;
        const montoTotal = montoPrestamo + interesTotal;
        const cuotaMensual = montoTotal / cuotas;

        console.log("Resumen del prestamo:");
        console.log(`Tipo de prestamo: ${tipoPrestamo}`);
        console.log(`Monto solicitado: $${montoPrestamo}`);
        console.log(`Tasa de interes: ${(tasaInteres * 100).toFixed(2)}%`);
        console.log(`Total a devolver: $${montoTotal.toFixed(2)}`);
        console.log(`Cantidad de cuotas: ${cuotas}`);
        console.log(`Monto cuota mensual: $${cuotaMensual.toFixed(2)}`);

        const otraSolicitud = prompt("¿Desea solicitar otro prestamo? (Si/No)").toLowerCase();
        if (otraSolicitud !== "si" && otraSolicitud !== "si") {
            solicitarPrestamo = false;
        }
    }
}

simuladorPrestamo();

