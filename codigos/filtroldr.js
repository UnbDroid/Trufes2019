var scanf = require('scanf')
var five = require("johnny-five")
var board = new five.Board()

let numeros = [], modo = 0, elementos = 5, valida = 0, media = 0

class Filtro {
  // constructor(metodo) {
  //   this.metodo = metodo
  // }

  media_simples(vetor) {
    //lê 5 valores e depois calcula a média, lê mais 5 para depois calcular a média
    let i, media = 0, variancia = 0, desvio = 0, maximo = 0, minimo = 0
    console.log("vetor: ", vetor)
    for (i = 0; i < vetor.length; i++) {
      media += vetor[i]/vetor.length
    }
    for (i = 0; i < vetor.length; i++) {
      variancia += ((vetor[i]-media)**2)
    }
    variancia = variancia/vetor.length
    desvio = variancia**(1/2)
    maximo = media + desvio
    minimo = media - desvio
    console.log("max:", maximo,"min", minimo)
    if(minimo > 100 && 250 > maximo) {
      return 'PRETO'
    }
    else if (minimo > 550 && 800 > maximo) {
      return 'BRANCO'
    }
    else {
      return 'ERRO'
    }
  }

  media_movel(vetor) {
    //lê 5 valores e depois calcula a média, depois substitui só 1 valor e calcula de novo
    let media = 0, variancia = 0, desvio = 0, maximo = 0, minimo = 0
    console.log("vetor: ", vetor)
    for (let i = 0; i < vetor.length; i++) {
      media += vetor[i]/vetor.length
    }
    for (let i = 0; i < vetor.length; i++) {
      variancia += ((vetor[i]-media)**2)
    }
    variancia = variancia/vetor.length
    desvio = variancia**(1/2)
    maximo = media + desvio
    minimo = media - desvio
    console.log("max:", maximo,"min", minimo)
    if(minimo > 100 && 250 > maximo) {
      return 'PRETO'
    }
    else if (minimo > 550 && 800 > maximo) {
      return 'BRANCO'
    }
    else {
      return 'ERRO'
    }
  }

  media_ordenada(vetor) {
    //ordena o vetor e retira o menor valor e o menor valor, depois faz a média normalmente
    let i, j, aux, media = 0, variancia = 0, desvio = 0, maximo = 0, minimo = 0
    console.log("vetor: ", vetor)
    for(i=0;i<vetor.length-1;i++){
      for(j=0;j<vetor.length-1;j++){
        if(vetor[j]>vetor[j+1]){
          aux=vetor[j]
          vetor[j]=vetor[j+1]
          vetor[j+1]=aux
        }
      }
    }

    // console.log("antes: ", vetor)
    vetor.shift()
    vetor.pop()
    // console.log("depois: ", vetor)

    for (let i = 0; i < vetor.length; i++) {
      media += vetor[i]/vetor.length
    }
    for (let i = 0; i < vetor.length; i++) {
      variancia += ((vetor[i]-media)**2)
    }
    variancia = variancia/vetor.length
    desvio = variancia**(1/2)
    maximo = media + desvio
    minimo = media - desvio
    console.log("max:", maximo,"min", minimo)
    if(minimo > 100 && 250 > maximo) {
      return 'PRETO'
    }
    else if (minimo > 550 && 800 > maximo) {
      return 'BRANCO'
    }
    else {
      return 'ERRO'
    }
  }

  media_ponderada(valor) {
    let alfa = 0.8
    if(media == 0) {
      media = valor
    }
    else {
      media = alfa * media + (1-alfa) * valor
    }
    console.log("media: ", media)
    if(media > 100 && 250 > media) {
      return 'PRETO'
    }
    else if (media > 550 && 750 > media) {
      return 'BRANCO'
    }
    else {
      return 'ERRO'
    }
  }

}

function entrada() {
  console.log("Digite 1 para media simples\nDigite 2 para media movel\nDigite 3 para media ordenada\n Digite 4 para media ponderada\n >> ")
  modo = scanf('%d')
  console.log(modo)
  switch (modo) {
    case 1:
      break
    case 2:
      break
    case 3:
      break
    case 4:
      break
    default:
      console.log('errouuuu')
      entrada()
  }
}

entrada()

board.on("ready", function() {

  var light = new five.Light("A0")
  var novo = new Filtro()

  light.on("data", function() {

    if(modo == 1) {
      numeros.push(this.lux)
      if(numeros.length == elementos) {
        console.log(novo.media_simples(numeros))
        numeros = []
      }
    }
    else if(modo == 2) {
      numeros.push(this.lux)
      if(numeros.length == elementos) {
        console.log(novo.media_movel(numeros))
        numeros.shift()
        valida = 1
      }
      else if(valida == 1) {
        console.log(novo.media_movel(numeros))
        numeros.shift()
      }
    }
    else if(modo == 3) {
      numeros.push(this.lux)
      if(numeros.length == elementos) {
        console.log(novo.media_ordenada(numeros))
        numeros = []
      }
    }
    else if(modo == 4) {
      console.log(novo.media_ponderada(this.lux))
    }

  })

})
