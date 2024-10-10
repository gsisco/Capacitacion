document.addEventListener("DOMContentLoaded", function() {
    let ageGroups = [];

    // Al hacer clic en "Aceptar"
    document.getElementById('accept').addEventListener('click', function() {
        console.log("Consentimiento aceptado.");
        document.getElementById('consent').style.display = 'none';
        document.getElementById('questions').style.display = 'block';
        startDataCollection(); // Empieza la recopilación de datos
    });

    // Al hacer clic en "Rechazar"
    document.getElementById('decline').addEventListener('click', function() {
        alert('Has rechazado el consentimiento. No se recopilará información.');
    });

    // Manejo del formulario
    document.getElementById('questions-form').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Formulario enviado.");

        const age = parseInt(document.getElementById('age').value);
        const attack = document.getElementById('attack').value;
        groupByAge(age); // Agrupar por edad

        // Mostrar los resultados
        document.getElementById('questions').style.display = 'none';
        document.getElementById('result-title').style.display = 'block';
        document.getElementById('data-collection').style.display = 'block';

        // Mostrar grupos de edad
        document.getElementById('ageGroups').innerText = JSON.stringify(ageGroups);
    });

    function groupByAge(age) {
        if (age < 18) {
            ageGroups.push('Menores de 18');
        } else if (age >= 18 && age <= 35) {
            ageGroups.push('18 a 35 años');
        } else if (age >= 36 && age <= 50) {
            ageGroups.push('36 a 50 años');
        } else {
            ageGroups.push('Mayores de 50 años');
        }
    }

    // Recopilación de datos
    function startDataCollection() {
        console.log("Recopilando datos...");

        // Obtener IP y Proveedor de internet usando API pública (ipinfo.io)
        fetch('https://ipinfo.io/json?token=YOUR_TOKEN')
            .then(response => response.json())
            .then(data => {
                document.getElementById('ip').innerText = data.ip;
                document.getElementById('location').innerText = `${data.city}, ${data.region}, ${data.country}`;
                document.getElementById('isp').innerText = data.org;
                console.log("Datos de IP y ubicación obtenidos:", data);
            })
            .catch(err => console.log(err));

        // Detectar sistema operativo y dispositivo
        let userAgent = navigator.userAgent;
        let os = "Desconocido";
        if (userAgent.indexOf("Win") != -1) os = "Windows";
        if (userAgent.indexOf("Mac") != -1) os = "MacOS";
        if (userAgent.indexOf("X11") != -1) os = "UNIX";
        if (userAgent.indexOf("Linux") != -1) os = "Linux";
        document.getElementById('os').innerText = os;

        // Detectar si es móvil o computadora
        let device = /Mobi|Android/i.test(navigator.userAgent) ? 'Móvil' : 'Computadora';
        document.getElementById('device').innerText = device;

        // Simular vulnerabilidades y puertos abiertos
        document.getElementById('openPorts').innerText = "80, 443, 8080";
        document.getElementById('vulnerabilities').innerText = "Vulnerabilidad CVE-2021-34527 (PrintNightmare)";
    }
});
