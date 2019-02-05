var Calculadora = {
    acumRpta: 0,
    spanDisplay: null,
    ultimaOperacion: null,
    ultimoNum: null,
    init: function () {

        // Asignación de evento a todos los botones de números
        this.asignarEventosBtns();

        // Se añade la regla para el efecto de los botones al presionarlos
        this.crearEfectoBtns();

        // Se establece el objeto de display para su manejo
        this.spanDisplay = document.getElementById("display");
    },
    asignarEventosBtns: function () {
        var btns = document.getElementsByTagName("img");

        // Asignación de evento a todos los botones de números
        for (var index = 0; index < btns.length; index++) {

            var num = Number(btns[index].id);

            // Si el id es un número
            if (!isNaN(num)) {
                btns[index].onclick = this.mostrarNumero;
            } else {
                switch (btns[index].id) {
                    case "on":
                        btns[index].onclick = this.limpiarPantalla;
                        break;
                    case "sign":
                        btns[index].onclick = this.cambiarSigno;
                        break;
                    case "raiz":
                        btns[index].onclick = function () {

                            // Se procesa la operación
                            Calculadora.procesarCalculos();

                            // Se obtiene la raiz cuadrada
                            Calculadora.acumRpta = Calculadora.obtenerRaiz(Calculadora.acumRpta);

                            // Se guarda el último número para continuar con la operación
                            if (Calculadora.ultimoNum == null)
                                Calculadora.ultimoNum = Number(Calculadora.spanDisplay.innerText);

                            // Se muestra los 8 primeros digitos de la respuesta
                            Calculadora.spanDisplay.innerText = ("" + Calculadora.acumRpta).substr(0, 8);
                        }
                        break;
                    case "dividido":
                        btns[index].onclick = function () {

                            // Se procesa la operación
                            Calculadora.procesarCalculos();

                            // Se limpia la pantalla para indicar que se esta haciendo una operación
                            Calculadora.spanDisplay.innerText = "";
                            // Se ajusta la operación que se realizará luego
                            Calculadora.ultimaOperacion = "/";
                        }
                        break;
                    case "por":
                        btns[index].onclick = function () {

                            // Se procesa la operación
                            Calculadora.procesarCalculos();

                            // Se limpia la pantalla para indicar que se esta haciendo una operación
                            Calculadora.spanDisplay.innerText = "";
                            // Se ajusta la operación que se realizará luego
                            Calculadora.ultimaOperacion = "*";
                        }
                        break;
                    case "menos":
                        btns[index].onclick = function () {

                            // Se procesa la operación
                            Calculadora.procesarCalculos();

                            // Se limpia la pantalla para indicar que se esta haciendo una operación
                            Calculadora.spanDisplay.innerText = "";
                            // Se ajusta la operación que se realizará luego
                            Calculadora.ultimaOperacion = "-";
                        }
                        break;
                    case "mas":
                        btns[index].onclick = function () {

                            // Se procesa la operación
                            Calculadora.procesarCalculos();

                            // Se limpia la pantalla para indicar que se esta haciendo una operación
                            Calculadora.spanDisplay.innerText = "";
                            // Se ajusta la operación que se realizará luego
                            Calculadora.ultimaOperacion = "+";
                        }
                        break;
                    case "punto":
                        btns[index].onclick = this.agregarPunto;
                        break;
                    case "igual":
                        btns[index].onclick = this.calcularTotal;
                        break;
                }
            }
        }
    },
    crearEfectoBtns: function () {
        var body = document.getElementsByTagName('body')[0];

        // Se añade un objeto Style para agregar la regla de los botones
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode('.tecla:active { padding: 1px; }'));

        body.appendChild(style);
    },
    mostrarNumero: function (sender) {

        var num = Number(sender.currentTarget.id);

        // Si hay un número
        if (!isNaN(num)) {

            // Si el número en pantalla es 0 o si el acumulador esta en 0 limpia la pantalla
            if (Calculadora.spanDisplay.innerText == "0" || Calculadora.ultimoNum != null) {

                // Si habia un útimo número se quita y se reinicia el acumulador
                if (Calculadora.ultimoNum != null) {
                    Calculadora.ultimoNum = null;
                    Calculadora.ultimaOperacion = null;
                    Calculadora.acumRpta = 0;
                }

                Calculadora.spanDisplay.innerText = "";
            }

            // Añade el nuevo número a la pantalla mientras el valor del texto en pantala sea menor a 8
            if (Calculadora.spanDisplay.innerText.length < 8)
                Calculadora.spanDisplay.innerText += num;
        }
    },
    limpiarPantalla: function () {
        Calculadora.spanDisplay.innerText = "0";
        Calculadora.acumRpta = 0;
        Calculadora.ultimaOperacion = null;
        Calculadora.ultimoNum = null;
    },
    cambiarSigno: function () {
        // Cambia el signo mientras en la pantalla halla algo diferente a 0
        if (Calculadora.spanDisplay.innerText != "0") {
            // Si tiene el signo '-' lo quita
            Calculadora.spanDisplay.innerText = (Calculadora.spanDisplay.innerText.charAt(0) == '-') ? Calculadora.spanDisplay.innerText.substring(1) : "-" + Calculadora.spanDisplay.innerText;

            // Si habia un útimo número se quita y se reinicia el acumulador
            if (Calculadora.ultimoNum != null) {
                Calculadora.acumRpta = Number(Calculadora.spanDisplay.innerText);
            }
        }
    },
    obtenerRaiz: function (num1) {
        return Math.sqrt(num1);
    },
    dividir: function (num1, num2) {
        return num1 / num2;
    },
    multiplicar: function (num1, num2) {
        return num1 * num2;
    },
    restar: function (num1, num2) {
        return num1 - num2;
    },
    sumar: function (num1, num2) {
        return num1 + num2;
    },
    calcularTotal: function () {

        // Se guarda el último número para continuar con la operación
        if (Calculadora.ultimoNum == null)
            Calculadora.ultimoNum = Number(Calculadora.spanDisplay.innerText);

        // Si hay alguna operación por hacer la realiza
        Calculadora.realizarOpeFaltante();

        // Se muestra los 8 primeros digitos de la respuesta
        Calculadora.spanDisplay.innerText = ("" + Calculadora.acumRpta).substr(0, 8);
    },
    agregarPunto: function () {

        // Si el punto no esta en pantalla        
        if (!Calculadora.spanDisplay.innerText.includes(".")) {

            Calculadora.spanDisplay.innerText += ".";

            // Si habia un útimo número se quita y se reinicia el acumulador
            if (Calculadora.ultimoNum != null) {
                Calculadora.ultimoNum = null;
                Calculadora.acumRpta = 0;
                Calculadora.ultimaOperacion = null;
            }
        }
    },
    realizarOpeFaltante: function () {

        var num2 = Calculadora.ultimoNum || Number(Calculadora.spanDisplay.innerText);

        // Si hay alguna operación por hacer la realiza
        switch (Calculadora.ultimaOperacion) {
            case "+":
                Calculadora.acumRpta = Calculadora.sumar(Calculadora.acumRpta, num2);
                break;
            case "-":
                Calculadora.acumRpta = Calculadora.restar(Calculadora.acumRpta, num2);
                break;
            case "*":
                Calculadora.acumRpta = Calculadora.multiplicar(Calculadora.acumRpta, num2);
                break;
            case "/":
                Calculadora.acumRpta = Calculadora.dividir(Calculadora.acumRpta, num2);
                break;
                break;
        }
    },
    procesarCalculos: function () {

        // Si habia un útimo número se quita y se reinicia el acumulador
        if (Calculadora.ultimoNum != null) {
            Calculadora.ultimoNum = null;
            Calculadora.ultimaOperacion = null;
        }

        // Realiza la operación que falte
        if (Calculadora.ultimaOperacion != "" && Calculadora.ultimaOperacion != null) {
            this.realizarOpeFaltante();
        }

        // Si el acumulador esta en 0 se establece el número que esta en pantalla
        if (Calculadora.acumRpta == 0)
            Calculadora.acumRpta = Number(Calculadora.spanDisplay.innerText);
    }
}

// Inicia la configuración de los botones
Calculadora.init();