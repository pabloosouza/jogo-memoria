const cartas = document.querySelectorAll('.carta');
let virouCarta = false;
let primeiraCarta, segundaCarta;
let travarCartas = false;
let cartasRestantes = cartas.length;

function virarCarta(){
    if(travarCartas) return;

    if(this === primeiraCarta) return;

    this.classList.add('virar');
    if (!virouCarta){
        virouCarta = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    virouCarta = false;
    verificarAcerto();

    if (cartasRestantes === 0) {
        setTimeout(() => {
            alert("Parabéns, você ganhou!")
        }, 1500);
    }
}

function verificarAcerto() {
    if(primeiraCarta.dataset.carta === segundaCarta.dataset.carta) {
        cartasRestantes -= 2;
        desativarCartas();
        return;
    }

    desvirarCartas();
}

function desativarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    resetarJogo();
}

function desvirarCartas() {
    travarCartas = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('virar');
        segundaCarta.classList.remove('virar');

        resetarJogo();
    }, 1500)
}

function resetarJogo() {
    [virouCarta, travarCartas] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}



(function embaralharCartas() {
    cartas.forEach((carta) => {
        let posicao = Math.floor(Math.random() * 12);
        carta.style.order = posicao;
    });
})();

cartas.forEach((card) => {
    card.addEventListener('click', virarCarta);
});

