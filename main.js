import axios from 'axios';

document.addEventListener('DOMContentLoaded', async function() {
    
    const API_KEY = 'QsV6hwL1ei13ndxw3QgkIY6m6g6BWUmf';

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

    solicitarPrestamoBtn.addEventListener('click', function() {
        formContainer.style.display = 'block';
        historialContainer.style.display = 'none';
        resultadoDiv.innerHTML = '';
    });

    mostrarHistorialBtn.addEventListener('click', function() {
        formContainer.style.display = 'none';
        historialContainer.style.display = 'block';
        mostrarHistorialPrestamos();
    });

    borrarHistorialBtn.addEventListener('click', function() {
        localStorage.removeItem('prestamos');
        historial.innerHTML = '<p>Historial borrado.</p>';
    });

    calcularBtn.addEventListener('click', async function() {
        
        const nombre = nombreInput.value;
        const apellido = apellidoInput.value;
        const email = emailInput.value;
        const tipoPrestamo = tipoPrestamoSelect.value;
        const monto = parseFloat(montoInput.value);

        let tasaInteres = 0;
        let cuotas = 0;

            try{
                const response = await axios.get(`https://financialmodelingprep.com/api/v3/market/interest-rate?apikey=${API_KEY}`);
                const data = response.data;

                resultadoDiv.innerHTML = `<p>Tasas de Interes:</p>
                                        <p>Tasa a 30 años: ${data.thirtyYear}</p>
                                        <p>Tasa a 15 años: ${data.fifteenYear}</p>
                                        <p>Tasa a 5 años: ${data.fiveYear}</p>`;
            } catch(error){
                console.error('Error: ', error.message);
            }
        

        function calculoInteres(montoPrestamo, tasaInteres){
            return montoPrestamo * tasaInteres;
        }

        function totalADevolver(montoPrestamo, tasaInteres){
            const interes = calculoInteres(montoPrestamo, tasaInteres);
            return montoPrestamo + interes;
        }

        function calculoCuotas(montoPrestamo, tasaInteres, cuotas){
            const total = totalADevolver(montoPrestamo, tasaInteres);
            const cuotaMensual = total / cuotas;
            return cuotaMensual;
        }

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
            totalDevolver: totalDevolver.toFixed(2)
        };
        
        prestamos.push(prestamo);
        localStorage.setItem('prestamos', JSON.stringify(prestamos));
        
        mostrarResultadoPrestamo(nombre, apellido, email, tipoPrestamo, monto, tasaInteres, cuotas, cuotaMensual, totalDevolver);
        mostrarHistorialPrestamos();
    });
    
    function mostrarResultadoPrestamo(nombre, apellido, email, tipoPrestamo, monto, tasaInteres, cuotas, cuotaMensual, totalDevolver){
        resultadoDiv.innerHTML = `<p>Prestamo solicitado correctamente.</p>
                                <p>Resumen:</p>
                                <p>Tipo de Préstamo: ${tipoPrestamoSelect.value} meses</p>
                                <p>Monto Solicitado: $${montoInput.value}</p>
                                <p>Tasa de Interés: ${(tasaInteres * 100).toFixed(2)}%</p>
                                <p>Cantidad de Cuotas: ${cuotas}</p>
                                <p>Cuota Mensual: $${cuotaMensual.toFixed(2)}</p>
                                <p>Total a Devolver: $${totalDevolver.toFixed(2)}</p>`;
                            }

    function mostrarHistorialPrestamos() {
        historial.innerHTML = '';
            prestamos.forEach((prestamo, index) => {
                const prestamoDiv = document.createElement('div');
                prestamoDiv.innerHTML = `
                <p>Prestamo ${index + 1}:</p>
                <p>Nombre: ${prestamo.nombre} ${prestamo.apellido}</p>
                <p>Email: ${prestamo.email}</p>
                <p>Tipo de Préstamo: ${prestamo.tipoPrestamo} meses</p>
                <p>Monto Solicitado: $${prestamo.monto}</p>
                <p>Tasa de Interés: ${(prestamo.tasa * 100).toFixed(2)}%</p>
                <p>Cantidad de Cuotas: ${prestamo.cuotas}</p>
                <p>Cuota Mensual: $${prestamo.cuotaMensual}</p>
                <p>Total a Devolver: $${prestamo.totalDevolver}</p>`;
                        historial.appendChild(prestamoDiv);
            });
    }
});
