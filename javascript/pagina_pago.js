let titular = document.getElementById('titular');
let cvv = document.getElementById('cvv');
let numTarg = document.getElementById('numTarjeta');
let caducidad = document.getElementById('caducidad');
let cantidad = document.getElementById('cantidad');
let borrado_barra = false;
window.onload = function () {
    let icon = document.getElementById('icono');
    icon.addEventListener('click', botonFlecha, false);
    let li = document.getElementsByTagName('li');
    for (j = 0; j < li.length; j++) {
        li[j].addEventListener('click', function () {
            pago(this.querySelector('i'), this.querySelector('p'));
            botonFlecha();
        }, false);
    }
    cantidad.addEventListener('input', function () {
        calcularCantidad(this);
    });
    cvv.addEventListener('input', function () {
        comprobarCVV(this);
    });
    numTarg.addEventListener('input', function () {
        comprobarNumTarg(this);
    });
    caducidad.addEventListener('input', function () {
        comprobarCaducidad(this);
    });
    document.getElementById("enviar_tarjeta").addEventListener('click', validar);
}
function validar(e) {
    document.getElementById("enviar").addEventListener('click', validar);
};


/**
 * Valida los campos
 */
function validar() {
    if (!cantidad.checkValidity()) {
        if (cantidad.value == "") {
            cantidad.setCustomValidity('Debe introducir el numero de entradas que deseas comprar');
        } else if (cantidad.validity.rangeUnderflow) {
            cantidad.setCustomValidity('Error al menos debe comprar una entrada');
        } else if (cantidad.validity.rangeOverflow) {
            cantidad.setCustomValidity('Error solo puede comprar como maximo cien entradas');
        }
        else {
            cantidad.setCustomValidity('');
        }
    } else {
        if (cantidad.value == "") {
            cantidad.setCustomValidity('Debe introducir el numero de entradas que deseas comprar');
        }
    }
    validarCampo(titular,'Debe introducir el nombre del titular de la tarjeta de credito','Error debe introducir el nombre del titular de la tarjeta de credito correctamente');
	validarCampo(numTarg,'Debe introducir el número de la tarjeta de credito','Error no cumple el formato estipulado para una tarjeta de credito');
	validarCampo(cvv,'Debe introducir el codigo de seguridad de la tarjeta de credito','Error no cumple el formato estipulado para el código de seguridad de la tarjeta de credito');
	validarCampo(caducidad,'Debe introducir la fecha de caducidad de la tarjeta de credito','Error no cumple el formato estipulado para la fecha de caducidad de la tarjeta de credito');
}

/**
 * Oculta/Muestra el botón flecha y reproduce la animación de giro Poniendo/Quitando la clase "gira"
 */
function botonFlecha() {
    let icon = document.getElementById('icono');
    let ul = document.getElementsByTagName('ul');
    ul[0].classList.toggle('oculto');
    icon.classList.toggle('gira');
}

/**
 * Administra el funcionamiento de la combobox de pago
 * @param {HTMLElement} i 
 * @param {HTMLElement} p 
 */
function pago(i, p) {
    let combo = document.getElementsByClassName('combo');
    let divAntiguo = document.getElementById('content');
    let pCopiado = p.cloneNode(true);
    let iCopiado = i.cloneNode(true);
    let div = document.createElement('div');
    div.setAttribute('id', 'content');
    div.appendChild(pCopiado);
    div.insertBefore(iCopiado, pCopiado);
    combo[0].replaceChild(div, divAntiguo);
    console.log(div.textContent);
    mostrar_formulario(div.textContent);
}

// -- FORMULARIOS --

let formulario_tarjeta = document.getElementById('formulario_tarjeta');
let formulario_bancario = document.getElementById('formulario_bancario');
let formulario_paypal = document.getElementById('formulario_paypal');
let formulario_reembolso = document.getElementById('formulario_contra_reembolso');

/**
 * Esconde los formularios
 */
function borrar_formularios() {
    formulario_tarjeta.classList.remove('oculto');
    formulario_tarjeta.classList.add('oculto');
    formulario_bancario.classList.remove('oculto');
    formulario_bancario.classList.add('oculto');
    formulario_paypal.classList.remove('oculto');
    formulario_paypal.classList.add('oculto');
    formulario_reembolso.classList.remove('oculto');
    formulario_reembolso.classList.add('oculto');
}
function mostrar_formulario(nombre_formulario) {
    if (nombre_formulario == "Visa" || nombre_formulario == "Master Card") {
        borrar_formularios();
        formulario_tarjeta.classList.remove('oculto');
    } else if (nombre_formulario == "Transferencia Bancaria") {
        borrar_formularios();
        formulario_bancario.classList.remove('oculto');
    } else if (nombre_formulario == "PayPal") {
        borrar_formularios();
        formulario_paypal.classList.remove('oculto');
    } else if(nombre_formulario == "Contra Reembolso"){
        borrar_formularios();
        formulario_reembolso.classList.remove('oculto');
    }
}

/**
 * Verifica la CVV
 * @param {HTMLElement#Input}} input 
 */
function comprobarCVV(input) {

    if (!isNaN(input.value)) {
        if (input.value.length != 3) {
            input.style.color = 'red';
        } else {
            input.style.color = 'green';
        }
    } else {
        input.style.color = 'red';
    }
}

/**
 * Verifica el numero de la tarjeta de credito
 * @param {HTMLElement#Input}} input 
 */
function comprobarNumTarg(input) {
    if (!isNaN(input.value)) {
        if (input.value.length != 16) {
            input.style.color = 'red';
        } else {
            input.style.color = 'green';
        }
    } else {
        input.style.color = 'red';
    }
}

/**
 * Verifica la caducidad
 * @param {HTMLElement#Input}} input 
 */
function comprobarCaducidad(input) {
    if (input.value.length < 2) {
        borrado_barra = false;
    } else if (input.value.length == 2 && borrado_barra == false) {
        input.value += "/";
        borrado_barra = true;
    } else if (input.value.length > 2) {
        borrado_barra = true;
    }
}

/**
 * Calcula la cantidad
 * @param {HTMLElement#Input}} input 
 */
function calcularCantidad(input) {
    let total_tarjeta = document.getElementById('total_tarjeta');
    let total_bancario = document.getElementById('total_bancario');
    let total_paypal = document.getElementById('total_paypal');
    let total_reembolso = document.getElementById('total_reembolso');
    let resultado = input.value * 8.9;
    total_tarjeta.innerHTML = resultado.toFixed(2) + '€';
    total_bancario.innerHTML = resultado.toFixed(2) + '€';
    total_paypal.innerHTML = resultado.toFixed(2) + '€';
    total_reembolso.innerHTML = resultado.toFixed(2) + '€';
    total.innerHTML = resultado.toFixed(2) + '€';
}

function validarCampo(dom,emptyMSG = "El campo no puede estar vacío",regexMSG = "El contenido no cumple con la validación asociada al campo"){
	if (!dom.checkValidity()) {
        if (dom.validity.valueMissing) {
            dom.setCustomValidity(emptyMSG);
        } else if (dom.validity.patternMismatch) {
            dom.setCustomValidity(regexMSG);
        } else {
            dom.setCustomValidity('');
        }
    }
}