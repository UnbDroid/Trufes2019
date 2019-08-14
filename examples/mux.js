var rc = require('roboticscape');
var b = require('bonescript');
var scanf = require('scanf');
var math = require('mathjs');

var s0 = 'P9_39'
var s1 = 'P9_28'
var s2 = 'P9_41'
var s3 = 'P9_23'

var minimo_preto = 800
var maximo_preto = 1400
var minimo_branco = 1900
var maximo_branco = 3000

let modo = 0, numeros = [], elementos = 5, valida = 0, ldrs = [[]];

b.pinMode(s1, b.OUTPUT);
b.pinMode(s2, b.OUTPUT);
b.pinMode(s3, b.OUTPUT);
b.digitalWrite(s1, 1);
b.digitalWrite(s2, 0);
b.digitalWrite(s3, 0);

// setInterval(seletor, 3000);
//setInterval(saida, 100);


setInterval(leitura_garra, 10);

class Filtro {

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
    maximo = math.round(maximo)
    minimo = math.round(minimo)
    console.log("max:", maximo,"min", minimo)
    if(minimo > minimo_preto && maximo_preto > maximo) {
      return 0 //PRETO
    }
    else if (minimo > minimo_branco && maximo_branco > maximo) {
      return 1 //BRANCO
    }
    else {
      return 2 //ERRO
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
    maximo = math.round(maximo)
    minimo = math.round(minimo)
    console.log("max:", maximo,"min", minimo)
    if(minimo > minimo_preto && maximo_preto > maximo) {
      return 0 //PRETO
    }
    else if (minimo > minimo_branco && maximo_branco > maximo) {
      return 1 //BRANCO
    }
    else {
      return 2 //ERRO
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
    maximo = math.round(maximo)
    minimo = math.round(minimo)
    console.log("max:", maximo,"min", minimo)
    if(minimo > minimo_preto && maximo_preto > maximo) {
      return 0 //PRETO
    }
    else if (minimo > minimo_branco && maximo_branco > maximo) {
      return 1 //BRANCO
    }
    else {
      return 2 //ERRO
    }
  }

  media_ponderada(valor) {
    let alfa = 0.8, media = 0;
    if(media == 0) {
      media = valor
    }
    else {
      media = alfa * media + (1-alfa) * valor
    }
    console.log("media: ", media)
    if(media > minimo_preto && maximo_preto > media) {
      return 0 //PRETO
    }
    else if (media > minimo_branco && maximo_branco > media) {
      return 1 //BRANCO
    }
    else {
      return 2 //ERRO
    }
  }

}

function entrada() {

  console.log("Digite 1 para media simples\nDigite 2 para media movel\nDigite 3 para media ordenada\nDigite 4 para media ponderada\n >> ")
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

function seletor(){
    let i=0;
    if(i%8 == 0){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 0);
        b.digitalWrite(s3, 0);
        ldrs[i] = b.analogRead(s0); 
        i++;
    }else if(i%8 == 1){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 0);
        b.digitalWrite(s3, 1);
        ldrs[i] = b.analogRead(s0); 
        i++;
    }else if(i%8 == 2){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 1);
        b.digitalWrite(s3, 0);
        ldrs[i] = b.analogRead(s0);
        i++;
    }else if(i%8 == 3){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 1);
        b.digitalWrite(s3, 1);
        ldrs[i] = b.analogRead(s0);
        i++;
    }else if(i%8 == 4){
        b.digitalWrite(s1, 1);
        b.digitalWrite(s2, 0);
        b.digitalWrite(s3, 0);
        ldrs[i] = b.analogRead(s0); 
        i++;
    }else if(i%8 == 5){
        b.digitalWrite(s1, 1);
        b.digitalWrite(s2, 0);
        b.digitalWrite(s3, 1);
        ldrs[i] = b.analogRead(s0);        
        i++;
    }else if(i%8 == 6){
        b.digitalWrite(s1, 1);
        b.digitalWrite(s2, 1);
        b.digitalWrite(s3, 0);
        ldrs[i] = b.analogRead(s0);
        i++;
    }else if(i%8 == 7){
        b.digitalWrite(s1, 1);
        b.digitalWrite(s2, 1);
        b.digitalWrite(s3, 1);
        ldrs[i] = b.analogRead(s0);
        i=0;
    }
}

entrada()

// function saida(){
    
//     var novo = new Filtro()
    
//     let ldr1 = b.analogRead(s0);
//     ldr1 = 1/ldr1;
//     ldr1 *= 1000;
//     ldr1 = math.round(ldr1);
    
//     if(modo == 1) {
//       numeros.push(ldr1)
//       if(numeros.length == elementos) {
//         console.log(novo.media_simples(numeros))
//         numeros = []
//       }
//     }
//     else if(modo == 2) {
//       numeros.push(ldr1)
//       if(numeros.length == elementos) {
//         console.log(novo.media_movel(numeros))
//         numeros.shift()
//         valida = 1
//       }
//       else if(valida == 1) {
//         console.log(novo.media_movel(numeros))
//         numeros.shift()
//       }
//     }
//     else if(modo == 3) {
//       numeros.push(ldr1)
//       if(numeros.length == elementos) {
//         console.log(novo.media_ordenada(numeros))
//         numeros = []
//       }
//     }
//     else if(modo == 4) {
//       console.log(novo.media_ponderada(ldr1))
//     }
    
    
    
    

// }

function navegacao(){
   let i=0, ldr_esquerda_frente = [], ldr_direita_frente = [], ldr_esquerda_tras = [], ldr_direita_tras = [], ldr_garra = [], ldr, ldr_matriz = [[2, 2], [2, 2]], resultado;
   var novo = new Filtro()
   
    if(i%4 == 0){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 0);
        b.digitalWrite(s3, 0);
        ldr = b.analogRead(s0); 
        ldr_direita_frente.push(ldr);
        resultado = novo.media_movel(ldr_direita_frente);
        if(ldr_direita_frente.length == elementos) {
          console.log("ldr direita frente = " + resultado);
          ldr_direita_frente.shift();
          // Se for preto, ldr[0][1] = preto;
          valida = 1;
        }
        else if(valida == 1) {
          console.log("ldr direita frente = " + resultado);
          ldr_direita_frente.shift();
        }
        ldr_matriz[0][1] = resultado;
        i++;
    }else if(i%4 == 1){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 0);
        b.digitalWrite(s3, 1);
        ldr = b.analogRead(s0); 
        ldr_direita_tras.push(ldr);
        resultado = novo.media_movel(ldr_direita_tras);
        if(ldr_direita_tras.length == elementos) {
          console.log("ldr direita tras = " + resultado);
          ldr_direita_tras.shift();
          // Se for preto, ldr[1][1] = preto;
          valida = 1;
        }
        else if(valida == 1) {
          console.log("ldr direita tras = " + resultado);
          ldr_direita_tras.shift();
        }
        ldr_matriz[1][1] = resultado
        i++;
    }else if(i%4 == 2){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 1);
        b.digitalWrite(s3, 0);
        ldr = b.analogRead(s0); 
        ldr_esquerda_frente.push(ldr);
        resultado = novo.media_movel(ldr_esquerda_frente);
        if(ldr_esquerda_frente.length == elementos) {
          console.log("ldr esquerda frente = " + resultado);
          ldr_esquerda_frente.shift();
          // Se for preto, ldr[0][0] = preto;
          valida = 1;
        }
        else if(valida == 1) {
          console.log("ldr esquerda frente = " + resultado);
          ldr_esquerda_frente.shift();
        }
        ldr_matriz[0][0] = resultado; 
        i++;
        
    }else if(i%4 == 3){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 1);
        b.digitalWrite(s3, 1);
        ldr = b.analogRead(s0); 
        ldr_esquerda_tras.push(ldr);
        resultado = novo.media_movel(ldr_esquerda_tras;
        if(ldr_esquerda_tras.length == elementos) {
          console.log("ldr esquerda tras = " + resultado);
          ldr_esquerda_tras.shift();
          // Se for preto, ldr[1][0] = preto;
          valida = 1;
        }
        else if(valida == 1) {
          console.log("ldr esquerda tras = " + resultado);
          ldr_esquerda_tras.shift();
        }
        ldr_matriz[1][0] = resultado;
        i++;
    }
    console.log(ldr_matriz[0][0]);
    console.log(ldr_matriz[0][1]);
    console.log(ldr_matriz[1][0]);
    console.log(ldr_matriz[1][1]);
}

function leitura_garra(){
  let ldr, ldr_garra = [], itens = 10;
  let filtro = new Filtro();
  // pausa setinterval navegação
  b.digitalWrite(s1, 1);
  b.digitalWrite(s2, 1);
  b.digitalWrite(s3, 1);
  ldr = b.analogRead(s0);
  ldr_garra.push(ldr);
  b.digitalWrite(s1, 1);
  b.digitalWrite(s2, 0);
  b.digitalWrite(s3, 1);
  ldr = b.analogRead(s0);
  ldr_garra.push(ldr);
  if(ldr_garra.length == itens){
    console.log(filtro.media_movel());
    ldr_garra.shift();
    ldr_garra.shift();
  }
  //Volta interval navegação
}





