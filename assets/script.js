// Estructura
const arrayPalavra = ["COBRA", "MOUSE", "ZUMBI", "BRASIL"];

const ajudas = ["Um Animal", "Para computador", "Apocalíptico", "Um País"];

/* let categoriaYPalavras = {
    animal: ['CACHORRO', 'HAMSTER', 'RATO', 'MORCEGO', 'COBRA'],
    computador: ['MOUSE', 'MONITOR', 'TECLADO'],
    nomesMasculino: ['CARLOS', 'RODRIGO', 'PAULO', 'PABLO', 'GABRIEL'],
    nomesFemenino: ['GABRIELA', 'CAROLINA', 'MARIA', 'BRISA'],
    pais: ['BRASIL', 'PARAGUAY', 'ARGENTINA', 'DINAMARCA', 'FINLANDIA', 'SUECIA', 'CANADA'],
    comidas: ['EMPANADA', 'COXINHA', 'FRANGO', 'CARNE', 'FEIJOADA'],
} */

// para el juego
let quantidadePalavrasJogadas = 0;
let tentativasRestantes = 5;

let posicionAtual;
let arrayPalavraAtual = [];

let quantidadeAcertada = 0;

var divsPalavraAtual = [];

let totalQueDeveAcertar;

function recarregarPalavra() {
  posicionAtual = Math.floor(Math.random() * arrayPalavra.length);

  let palavra = arrayPalavra[posicionAtual];
  totalQueDeveAcertar = palavra.length;
  quantidadeAcertada = 0;

  // String a Array:
  arrayPalavraAtual = palavra.split("");

  document.getElementById("palavra").innerHTML = "";
  document.getElementById("letrasEscolhidas").innerHTML = "";

  // Genera cantidad de cajas
  for (let i = 0; i < palavra.length; i++) {
    let divLetra = document.createElement("div");
    divLetra.className = "letra";
    document.getElementById("palavra").appendChild(divLetra);
  }

  divsPalavraAtual = document.getElementsByClassName("letra");

  tentativasRestantes = 5;
  document.getElementById("restante").innerHTML = tentativasRestantes;

  document.getElementById("ajuda").innerHTML = ajudas[posicionAtual];

  // elimina palavra já usada
  arrayPalavra.splice(posicionAtual, 1);
  ajudas.splice(posicionAtual, 1);
}

document.addEventListener("keydown", (e) => {
  let presionado = e.key;

  if (isLetter(presionado)) {
    let acerto = false;

    for (let i = 0; i < arrayPalavraAtual.length; i++) {
      if (arrayPalavraAtual[i] == presionado.toUpperCase()) {
        divsPalavraAtual[i].innerHTML = presionado.toUpperCase();
        acerto = true;
        quantidadeAcertada++;
      }
    }

    if (acerto) {
      if (totalQueDeveAcertar == quantidadeAcertada) {
        for (let i = 0; i < arrayPalavraAtual.length; i++) {
          divsPalavraAtual[i].className = "letra colorRight";
        }
      }
    } else {
      tentativasRestantes--;
      document.getElementById("restante").innerHTML = tentativasRestantes;

      document.getElementById("letrasEscolhidas").innerHTML += e.key.toLocaleUpperCase() + " - ";

      if (tentativasRestantes <= 0) {
        for (let i = 0; i < arrayPalavraAtual.length; i++) {
          divsPalavraAtual[i].className = "letra colorWrong";
        }
      }
    }

  }
});

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
