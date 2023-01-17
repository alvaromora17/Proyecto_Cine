window.addEventListener("load", inicio);
function inicio() {
    let imagen = document.getElementById("imagen");
    let estrellas = document.querySelectorAll(".estrellas > .fa-star");
    let cara = document.querySelector(".emoji >.far");
    ranking_estrellas(estrellas, cara);
    let estrellas2 = document.querySelectorAll(".estrellas2 > .fa-star");
    let cara2 = document.querySelector(".emoji2 >.far");
    ranking_estrellas(estrellas2, cara2);
    let estrellas3 = document.querySelectorAll(".estrellas3 > .fa-star");
    let cara3 = document.querySelector(".emoji3 >.far");
    ranking_estrellas(estrellas3, cara3);
    let estrellas4 = document.querySelectorAll(".estrellas4 > .fa-star");
    let cara4 = document.querySelector(".emoji4 >.far");
    ranking_estrellas(estrellas4, cara4);
    let cartas = document.querySelectorAll(".imagen_portada");
    // Al seleccionar una de las portadas de las peliculas nos redireccionara a la pagina de pantalla de carga
    cartas.forEach((carta, index) => {
        carta.addEventListener("click", (evento) => {
            location.href = "pantalla_carga.html";
        }, true);
    });
};

// Este escuchador del evento sera el encargado de llamar a una funcion anonima una vez se haya producido un desplazamiento en la pagina
window.addEventListener('scroll',
    /* Esta funcion anonima sera la encargada de redimensionar el tamaño de la imagen y la opacidad de la misma
       en funcion al scroll hecho en la pagina. */
    () => {
        let desplazamiento = document.documentElement.scrollTop;
        imagen.style.backgroundSize = 100 - desplazamiento / 8 + '%';
        imagen.style.opacity = 1 - desplazamiento / 700;
    });

// Esta funcion es la encargada de gestionar la encuesta de satisfacción representada con estrellas
function ranking_estrellas(estrellas, cara) {
    estrellas.forEach((estrella, index) => {
        estrella.addEventListener("click", () => {
            let nivel_estrellas = index + 1;
            estrellas.forEach((estrella, index2) => {
                if (nivel_estrellas >= index2 + 1) {
                    estrella.classList.add("active");
                } else {
                    estrella.classList.remove("active");
                }
            });
            // Este switch determina el emoticono de satisfaccion en funcion al numero de estrellas dado
            switch (nivel_estrellas) {
                case 1:
                    cara.removeAttribute("class");
                    cara.setAttribute("class", "far fa-face-angry fa-2x");
                    cara.style.color = "red";
                    break;
                case 2:
                    cara.removeAttribute("class");
                    cara.setAttribute("class", "far fa-face-frown fa-2x");
                    cara.style.color = "rgb(161, 161, 5)";
                    break;
                case 3:
                    cara.removeAttribute("class");
                    cara.setAttribute("class", "far fa-face-meh fa-2x");
                    cara.style.color = "grey";
                    break;
                case 4:
                    cara.removeAttribute("class");
                    cara.setAttribute("class", "far fa-face-smile fa-2x");
                    cara.style.color = "rgb(41, 196, 114)";
                    break;
                case 5:
                    cara.removeAttribute("class");
                    cara.setAttribute("class", "far fa-face-laugh fa-2x");
                    cara.style.color = "green";
                    break;
            }
        });
    });
}