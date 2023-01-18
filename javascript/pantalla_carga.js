window.onload = function() {
    let front = document.getElementsByClassName('barraFront');
    let contador = document.getElementsByClassName('contador');
    let cont = 0;
    let intervalo = setInterval(()=>{
        contador[0].innerHTML = `${cont++}%`;
        front[0].style.width = contador[0].innerHTML;
        if(cont > 100){
            clearInterval(intervalo);
            intervalo = "";
            //window.location.replace('pagina_pago.html');
        }
    },25);
}