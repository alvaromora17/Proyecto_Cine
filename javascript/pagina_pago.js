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
    document.getElementById("enviar").addEventListener('click', validar);
}
function validar(e) {
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
    if (!titular.checkValidity()) {
        if (titular.validity.valueMissing) {
            titular.setCustomValidity('Debe introducir el nombre del titular de la tarjeta de credito');
        } else if (titular.validity.patternMismatch) {
            titular.setCustomValidity('Error debe introducir el nombre del titular de la tarjeta de credito correctamente');
        } else {
            titular.setCustomValidity('');
        }
    }
    if (!numTarg.checkValidity()) {
        if (numTarg.validity.valueMissing) {
            numTarg.setCustomValidity('Debe introducir el número de la tarjeta de credito');
        } else if (numTarg.validity.patternMismatch) {
            numTarg.setCustomValidity('Error no cumple el formato estipulado para una tarjeta de credito');
        } else {
            numTarg.setCustomValidity('');
        }
    }
    if (!cvv.checkValidity()) {
        if (cvv.validity.valueMissing) {
            cvv.setCustomValidity('Debe introducir el codigo de seguridad de la tarjeta de credito');
        } else if (cvv.validity.patternMismatch) {
            cvv.setCustomValidity('Error no cumple el formato estipulado para el código de seguridad de la tarjeta de credito');
        } else {
            cvv.setCustomValidity('');
        }
    }
    if (!caducidad.checkValidity()) {
        if (caducidad.validity.valueMissing) {
            caducidad.setCustomValidity('Debe introducir la fecha de caducidad de la tarjeta de credito');
        } else if (caducidad.validity.patternMismatch) {
            caducidad.setCustomValidity('Error no cumple el formato estipulado para la fecha de caducidad de la tarjeta de credito');
        } else {
            caducidad.setCustomValidity('');
        }
    }
}

function botonFlecha() {
    let icon = document.getElementById('icono');
    let ul = document.getElementsByTagName('ul');
    ul[0].classList.toggle('oculto');
    icon.classList.toggle('gira');
}
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
}
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

function calcularCantidad(input) {
    let total = document.getElementById('total');
    let resultado = input.value * 8.9;
    total.innerHTML = resultado.toFixed(2) + '€';
}