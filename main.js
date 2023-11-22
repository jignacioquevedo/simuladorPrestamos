
const API_KEY = "yVxfNA5S1IVqvBygONPhqw==2Y83hRB4eUQZpIAj";

document.addEventListener('DOMContentLoaded', async function() {

    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const tipoPrestamoSelect = document.getElementById('tipoPrestamo');
    const montoInput = document.getElementById('monto');
    
    const resultadoDiv = document.getElementById('resultadoDiv');
    const formContainer = document.getElementById('form-container');
    const historialContainer = document.getElementById('historial-container');
    const historial = document.getElementById('historial');

    const solicitarPrestamoBtn = document.getElementById('solicitarPrestamoBtn');
    const mostrarHistorialBtn = document.getElementById('mostrarHistorialBtn');
    const borrarHistorialBtn = document.getElementById('borrarHistorialBtn');
    const calcularBtn = document.getElementById('calcularBtn');

    let prestamos = JSON.parse(localStorage.getItem('prestamos')) || [];

    solicitarPrestamoBtn.addEventListener("click", function () {
        formContainer.style.display = "block";
        historialContainer.style.display = "none";
        resultadoDiv.innerHTML = "";
    });

    mostrarHistorialBtn.addEventListener("click", function () {
        formContainer.style.display = "none";
        historialContainer.style.display = "block";
        mostrarHistorialPrestamos();
    });
    
    borrarHistorialBtn.addEventListener("click", function () {
        localStorage.removeItem("prestamos");
        historial.innerHTML = "<p>Historial borrado.</p>";
    });

    calcularBtn.addEventListener("click", async function () {
        const nombre = nombreInput.value;
        const apellido = apellidoInput.value;
        const email = emailInput.value;
        const tipoPrestamo = tipoPrestamoSelect.value;
        const monto = parseFloat(montoInput.value);
        
        let tasaInteres = 0;
        let interestRate = 0; // Valor por defecto
        
        try {
            const response = await axios.get(`https://api.api-ninjas.com/v1/interestrate?name=american`,
            {headers: {"X-Api-Key": API_KEY,},
        });
        
        if (response.data.central_bank_rates.length > 0) {
            interestRate = response.data.central_bank_rates[0].rate_pct / 100;
        }
        
        tasaInteres = interestRate;
        
        const duracionPrestamo = parseInt(tipoPrestamoSelect.value);
        const cuotas = duracionPrestamo * 12;
        
        const cuotaMensual = calculoCuotas(monto, tasaInteres, cuotas);
        const totalDevolver = totalADevolver(monto, tasaInteres);
        
        const prestamo = {
        nombre,
        apellido,
        email,
        tipoPrestamo,
        monto,
        tasa: tasaInteres,
        cuotas,
        cuotaMensual: cuotaMensual.toFixed(2),
        totalDevolver: totalDevolver.toFixed(2),
    };
    
    prestamos.push(prestamo);
    localStorage.setItem("prestamos", JSON.stringify(prestamos));

    mostrarResultadoPrestamo(nombre, apellido, email, tipoPrestamo, monto, tasaInteres, cuotas, cuotaMensual, totalDevolver);
    mostrarHistorialPrestamos();
    
        } catch (error) {
    console.error("Error: ", error.message);
        }

    });

        function calculoInteres(montoPrestamo, tasaInteres) {
          return montoPrestamo * tasaInteres;
        }
    
        function totalADevolver(montoPrestamo, tasaInteres) {
        const interes = calculoInteres(montoPrestamo, tasaInteres);
        return montoPrestamo + interes;
        }
    
        function calculoCuotas(montoPrestamo, tasaInteres, cuotas) {
        const total = totalADevolver(montoPrestamo, tasaInteres);
        const cuotaMensual = total / cuotas;
        return cuotaMensual;
        }
    
    function mostrarResultadoPrestamo(nombre, apellido, email, tipoPrestamo, monto, tasaInteres, cuotas, cuotaMensual, totalDevolver) {
        resultadoDiv.innerHTML = `<p>Prestamo solicitado correctamente.</p>
                                    <p>Resumen:</p>
                                    <p>Tipo de Prestamo: ${tipoPrestamoSelect.value} años.</p>
                                    <p>Monto Solicitado: $${montoInput.value}</p>
                                    <p>Tasa de Interes: ${(tasaInteres * 100).toFixed(2)}%</p>
                                    <p>Cantidad de Cuotas: ${cuotas}</p>
                                    <p>Cuota Mensual: $${cuotaMensual.toFixed(2)}</p>
                                    <p>Total a Devolver: $${totalDevolver.toFixed(2)}</p>`;
    }
    
    function mostrarHistorialPrestamos() {
        historial.innerHTML = "";
        prestamos.forEach((prestamo, index) => {
        const prestamoDiv = document.createElement("div");
        prestamoDiv.innerHTML = `
                    <p>Prestamo ${index + 1}:</p>
                    <p>Nombre: ${prestamo.nombre} ${prestamo.apellido}</p>
                    <p>Email: ${prestamo.email}</p>
                    <p>Tipo de Préstamo: ${prestamo.tipoPrestamo} años.</p>
                    <p>Monto Solicitado: $${prestamo.monto}</p>
                    <p>Tasa de Interés: ${(prestamo.tasa * 100).toFixed(2)}%</p>
                    <p>Cantidad de Cuotas: ${prestamo.cuotas}</p>
                    <p>Cuota Mensual: $${prestamo.cuotaMensual}</p>
                    <p>Total a Devolver: $${prestamo.totalDevolver}</p>`;
        historial.appendChild(prestamoDiv);
        });
    }
    });
    