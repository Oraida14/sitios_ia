document.addEventListener("DOMContentLoaded", function () {
    function fetchRealData() {
        // Obtener el parámetro de la URL (ej. ?sitio=p116 o ?sitio=p142)
        const urlParams = new URLSearchParams(window.location.search);
        const sitio = urlParams.get('sitio'); // Obtener el valor del parámetro "sitio"

        // Definir las filas donde están los datos para cada pozo
        const filas = {
            "p116": 2,   // Fila 2 para el pozo p116
            "p142": 3,   // Fila 3 para el pozo p142
            "p165": 4,   // Fila 4 para el pozo p165
            "p168": 5,   // Fila 5 para el pozo p168
            "p179": 6,   // Fila 6 para el pozo p179
            "p180": 7,   // Fila 7 para el pozo p180
            "p181": 8,   // Fila 8 para el pozo p181
            "p221": 10,   // Fila 9 para el pozo p221
            "p234": 11,  // Fila 10 para el pozo p234
            "p237": 12,  // Fila 11 para el pozo p237
            "p242": 13,  // Fila 12 para el pozo p242
            "p247": 14,  // Fila 13 para el pozo p247
            "p250": 15,  // Fila 14 para el pozo p250
            "p251": 16,  // Fila 15 para el pozo p251
            "p252": 17,  // Fila 16 para el pozo p252
            "p253": 18,  // Fila 17 para el pozo p253
            "p254": 19,  // Fila 18 para el pozo p254
            "p255": 20,  // Fila 19 para el pozo p255
            "p42": 21,   // Fila 20 para el pozo p42
            "p52": 22,   // Fila 21 para el pozo p52
            "p90": 23,   // Fila 22 para el pozo p90
            "p25": 24,   // Fila 23 para el pozo p25
            "p263": 25,  // Fila 24 para el pozo p263
            "p258": 26,  // Fila 25 para el pozo p258
            "p85": 27,   // Fila 26 para el pozo p85
            "p6": 28,    // Fila 27 para el pozo p6
            "p173": 29,  // Fila 28 para el pozo p173
            "tanque_campos": 30,    // Fila 29 para tanque_campos
            "tanque_plutarco": 31, // Fila 30 para tanque_plutarco
            "tanque_chihuahua": 32,// Fila 31 para tanque_chihuahua
            "tanquelajas": 33,     // Fila 32 para tanquelajas
            "tanque3cantos": 34,   // Fila 33 para tanque3cantos
            "tanque_renovacion": 35// Fila 34 para tanque_renovacion
        };

        // Usar la URL base para todos los pozos
        const sheetUrl = `http://localhost:8080/https://docs.google.com/spreadsheets/d/16Yi-UgDOvxPCTUiE7odp7P0TSNHSk3ff_kb90GEDAQI/export?format=csv&gid=0`;

        
        // Si el sitio seleccionado no está en la lista, usa el pozo 116 por defecto
        const fila = filas[sitio] || filas["p116"];  // Obtener la fila correspondiente al pozo

        const significado = {
            "0": "Pozo en prueba",
            "1": "Pozo apagado",
            "2": "Falla de Comunicación",
            "3": "Alarma",
            "4": "Comunicación en local",
            "5": "Señal en remoto"
        };

        fetch(sheetUrl)
            .then(response => response.text())
            .then(csvText => {
                const rows = csvText.trim().split('\n').map(r => r.split(','));
                
                // Usar la fila que corresponde al sitio
                const row = rows[fila - 1];  // Ajustamos la fila porque el array comienza desde 0

                const estadoCodigo = row[0];
                const gasto = parseFloat(row[1]);
                const presion = parseFloat(row[2]);
                const fecha = row[5];

                const estadoTexto = significado[estadoCodigo] || "Estado desconocido";

                // Actualiza el DOM con los datos
                document.getElementById('label1').innerText = `Q = ${gasto}`;
                document.getElementById('label2').innerText = `Presión: ${presion}`;
                document.getElementById('label3').innerText = `Actualización: ${fecha}`;
                document.getElementById('label4').innerText = `${estadoTexto}`;

                const img4 = document.getElementById('img4');  // Imagen de presión
                const img5 = document.getElementById('img5');
                const img6 = document.getElementById('img6');
                const img7 = document.getElementById('img7');
                const motorImage = document.getElementById('motorImage');
                const orbital = document.getElementById('orbital');

                // ---- CONTROL DE PRESIÓN (img4) ----
                if (presion === 0) {
                    img4.src = 'img/cerrado.gif';
                    img4.style.display = 'inline-block';
                    img4.style.width = '30px';
                    img4.style.height = '30px';
                } else {
                    img4.src = 'img/luz.gif';
                    img4.style.display = 'inline-block';
                    img4.style.width = '20px';
                    img4.style.height = '20px';
                }

                // ---- CONTROL DE GASTO ----
                if (gasto === 0) {
                    img5.src = 'img/cerrado.gif';
                    img6.src = 'img/cerrado.gif';
                    img7.src = 'img/cerrado.gif';

                    orbital.style.display = 'none';

                    motorImage.src = 'img/cerrado.gif';
                    motorImage.style.display = 'inline-block';
                    motorImage.style.width = '100px';
                    motorImage.style.height = '100px';
                    motorImage.style.position = 'absolute';
                    motorImage.style.top = '28%';
                    motorImage.style.left = '72%';
                    motorImage.style.transform = 'translate(-50%, -50%)';
                    motorImage.style.zIndex = '1000';
                } else {
                    img5.src = 'img/reload.gif';
                    img6.src = 'img/flujo_izq.gif';
                    img7.src = 'img/flujo_izq.gif';

                    orbital.style.display = 'block';
                    motorImage.style.display = 'none';
                }

            })
            .catch(err => {
                console.error("Error al cargar datos de Sheets:", err);
            });
    }

    fetchRealData();
    setInterval(fetchRealData, 30000); // Actualización cada 30 segundos
});
