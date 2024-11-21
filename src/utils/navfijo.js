document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
}

/* BNAVEGADOR FIJO */
function navegacionFija() {
    const barra = document.querySelector('header');
    const body = document.querySelector('body')

    window.addEventListener('scroll', function() {
        console.log(barra.getBoundingClientRect());

        if (barra.getBoundingClientRect().bottom) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}



