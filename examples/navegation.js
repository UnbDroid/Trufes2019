var rc = require('roboticscape');
var b = require('bonescript');
var scanf = require('scanf');
var math = require('mathjs');

var s0 = 'P9_39'
var s1 = 'P9_28' //A
var s2 = 'P9_41' //B
var s3 = 'P9_23' //C

b.pinMode(s1, b.OUTPUT);
b.pinMode(s2, b.OUTPUT);
b.pinMode(s3, b.OUTPUT);

var minimo_preto = 800
var maximo_preto = 1900
var minimo_branco = 1900
var maximo_branco = 4000

var minimo_preto_FD = 500
var maximo_preto_FD = 3300
var minimo_branco_FD = 3300
var maximo_branco_FD = 4000

var minimo_preto_FE = 500
var maximo_preto_FE = 2000
var minimo_branco_FE = 2000
var maximo_branco_FE = 4000

var minimo_preto_TD =500
var maximo_preto_TD = 2650
var minimo_branco_TD = 2650
var maximo_branco_TD = 4000

var minimo_preto_TE = 500
var maximo_preto_TE = 2300
var minimo_branco_TE = 2300
var maximo_branco_TE = 4000

var minimo_preto_GR = 500
var maximo_preto_GR = 2300
var minimo_branco_GR = 2300
var maximo_branco_GR = 4000

class Filtro {
  
  media_movel_FD(vetor) {
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
    if(minimo > minimo_preto_FD && maximo_preto_FD > maximo) {
      return 0 //PRETO
    }
    else if (minimo > minimo_branco_FD && maximo_branco_FD > maximo) {
      return 1 //BRANCO
    }
    else {
      return 2 //ERRO
    }
  }
  media_movel_FE(vetor) {
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
    if(minimo > minimo_preto_FE && maximo_preto_FE > maximo) {
      return 0 //PRETO
    }
    else if (minimo > minimo_branco_FE && maximo_branco_FE > maximo) {
      return 1 //BRANCO
    }
    else {
      return 2 //ERRO
    }
  }
  media_movel_TD(vetor) {
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
    if(minimo > minimo_preto_TD && maximo_preto_TD > maximo) {
      return 0 //PRETO
    }
    else if (minimo > minimo_branco_TD && maximo_branco_TD > maximo) {
      return 1 //BRANCO
    }
    else {
      console.log(minimo)
      return 2 //ERRO
    }
  }
  media_movel_TE(vetor) {
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
    if(minimo > minimo_preto_TE && maximo_preto_TE > maximo) {
      return 0 //PRETO
    }
    else if (minimo > minimo_branco_TE && maximo_branco_TE > maximo) {
      return 1 //BRANCO
    }
    else {
      return 2 //ERRO
    }
  }
  media_movel_GR(vetor) {
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
    if(minimo > minimo_preto_GR && maximo_preto_GR > maximo) {
      return 0 //PRETO
    }
    else if (minimo > minimo_branco_GR && maximo_branco_GR > maximo) {
      return 1 //BRANCO
    }
    else {
      return 2 //ERRO
    }
  }
  
}

let ldr_esquerda_frente = [], ldr_direita_frente = [], ldr_esquerda_tras = [], ldr_direita_tras = [], garra_ldr = [], ldr, ldr_matriz = [[2, 2], [2, 2]];
let j = 0, resultado, bloco, nave, garra, elementos = 5, valida = 0;

function ldr_navegacao(){

   var novo = new Filtro()

    if(j%4 == 0){
        b.digitalWrite(s1, 1);
        b.digitalWrite(s2, 1);
        b.digitalWrite(s3, 1);
        ldr = b.analogRead(s0);
        ldr = 1/ldr;
        ldr *= 1000;
        ldr = math.round(ldr);
        ldr_direita_frente.push(ldr);
        if(ldr_direita_frente.length == elementos) {
          resultado = novo.media_movel_FD(ldr_direita_frente);
          console.log("ldr direita frente = " + resultado);
          ldr_matriz[0][1] = resultado;
          ldr_direita_frente.shift();
          valida = 1;
        }
        else if(valida == 1) {
          resultado = novo.media_movel_FD(ldr_direita_frente);
          console.log("ldr direita frente = " + resultado);
          ldr_matriz[0][1] = resultado;
          ldr_direita_frente.shift();
        }
        j++;
    }else if(j%4 == 1){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 1);
        b.digitalWrite(s3, 1);
        ldr = b.analogRead(s0);
        ldr = 1/ldr;
        ldr *= 1000;
        ldr = math.round(ldr);
        ldr_direita_tras.push(ldr);
        if(ldr_direita_tras.length == elementos) {
          resultado = novo.media_movel_TD(ldr_direita_tras);
          console.log("ldr direita tras = " + resultado);
          ldr_matriz[1][1] = resultado
          ldr_direita_tras.shift();
          valida = 1;
        }
        else if(valida == 1) {
          resultado = novo.media_movel_TD(ldr_direita_tras);
          console.log("ldr direita tras = " + resultado);
          ldr_matriz[1][1] = resultado
          ldr_direita_tras.shift();
        }
        j++;
    }else if(j%4 == 2){
        b.digitalWrite(s1, 1);
        b.digitalWrite(s2, 0);
        b.digitalWrite(s3, 1);
        ldr = b.analogRead(s0);
        ldr = 1/ldr;
        ldr *= 1000;
        ldr = math.round(ldr);
        ldr_esquerda_frente.push(ldr);
        if(ldr_esquerda_frente.length == elementos) {
          resultado = novo.media_movel_FE(ldr_esquerda_frente);
          console.log("ldr esquerda frente = " + resultado);
          ldr_matriz[0][0] = resultado;
          ldr_esquerda_frente.shift();
          valida = 1;
        }
        else if(valida == 1) {
          resultado = novo.media_movel_FE(ldr_esquerda_frente);
          console.log("ldr esquerda frente = " + resultado);
          ldr_matriz[0][0] = resultado;
          ldr_esquerda_frente.shift();
        }
        j++;

    }else if(j%4 == 3){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 0);
        b.digitalWrite(s3, 1);
        ldr = b.analogRead(s0);
        ldr = 1/ldr;
        ldr *= 1000;
        ldr = math.round(ldr);
        ldr_esquerda_tras.push(ldr);
        if(ldr_esquerda_tras.length == elementos) {
          resultado = novo.media_movel_TE(ldr_esquerda_tras);
          console.log("ldr esquerda tras = " + resultado);
          ldr_matriz[1][0] = resultado;
          ldr_esquerda_tras.shift();
          valida = 1;
        }
        else if(valida == 1) {
          resultado = novo.media_movel_TE(ldr_esquerda_tras);
          console.log("ldr esquerda tras = " + resultado);
          ldr_matriz[1][0] = resultado;
          ldr_esquerda_tras.shift();
        }
        j=0;
    }
    console.log("[" + ldr_matriz[0][0] + "|" + ldr_matriz[0][1] + "]");
    console.log("[" + ldr_matriz[1][0] + "|" + ldr_matriz[1][1] + "]");

    //Alinhamento com a linha preta
//if(anda_de_frente || anda_de_re){
    // if(ldr_matriz[0][0] == 0 && ldr_matriz[0][1] == 1 && ldr_matriz[1][0] == 1 && ldr_matriz[1][1] == 1) {
    //   while(ldr_matriz[0][1] == 1) {
    //     //gira sentido anti horario
    //   }
    // }
    // else if(ldr_matriz[0][0] == 1 && ldr_matriz[0][1] == 1 && ldr_matriz[1][0] == 0 && ldr_matriz[1][1] == 1 ){
    //   while(ldr_matriz[1][1] == 1) {
    //     //gira sentido horário
    //   }
    // }
    // else if(ldr_matriz[0][0] == 1 && ldr_matriz[0][1] == 0 && ldr_matriz[1][0] == 1 && ldr_matriz[1][1] == 1){
    //   while(ldr_matriz[0][0] == 1) {
    //     //gira sentido horario
    //   }
    // }
    // else if(ldr_matriz[0][0] == 1 && ldr_matriz[0][1] == 1 && ldr_matriz[1][0] == 1 && ldr_matriz[1][1] == 0){
    //   while(ldr_matriz[1][0] == 1) {
    //     //girar sentido anti horario
    //   }
    // }
    // else if(ldr_matriz[0][0] == 1 && ldr_matriz[0][1] == 0 && ldr_matriz[1][0] == 0 && ldr_matriz[1][1] == 0){
    //   while(ldr_matriz[0][1] == 0) {
    //     //girar anti-horario
    //   }
    // }
    // else if(ldr_matriz[0][0] == 0 && ldr_matriz[0][1] == 0 && ldr_matriz[1][0] == 1 && ldr_matriz[1][1] == 0){
    //   while (ldr_matriz[1][1] == 0) {
    //     //girar horario
    //   }
    // }
    // else if(ldr_matriz[0][0] == 0 && ldr_matriz[0][1] == 1 && ldr_matriz[1][0] == 0 && ldr_matriz[1][1] == 0){
    //   while(ldr_matriz[0][0] == 0) {
    //     //girar horario
    //   }
    // }
    // else if (ldr_matriz[0][0] == 0 && ldr_matriz[0][1] == 0 && ldr_matriz[1][0] == 0 && ldr_matriz[1][1] == 1) {
    //   while (ldr_matriz[1][0] == 0) {
    //     //girar anti-horario
    //   }
    // }
  //}
  // else if(anda_de_lado) {
  //   if (ldr_matriz[0][0] == 1 && ldr_matriz[0][1] == 0 && ldr_matriz[1][0] == 1 && ldr_matriz[1][1] == 1) {
  //     while(ldr_matriz[1][1] == 1){
  //       //gira anti horario
  //     }
  //   }
  //   else if(ldr_matriz[0][0] == 1 && ldr_matriz[0][1] == 1 && ldr_matriz[1][0] == 0 && ldr_matriz[1][1] == 1) {
  //     while(ldr_matriz[0][0] == 1) {
  //       //gira anti horario
  //     }
  //   }
  //   else if(ldr_matriz[0][0] == 1 && ldr_matriz[0][1] == 1 && ldr_matriz[1][0] == 1 && ldr_matriz[1][1] == 0){
  //     while(ldr_matriz[0][1] == 1) {
  //       //gira horario
  //     }
  //   }
  //   else if(ldr_matriz[0][0] == 1 && ldr_matriz[0][1] == 0 && ldr_matriz[1][0] == 0 && ldr_matriz[1][1] == 0){
  //     while(ldr_matriz[1][0] == 0) {
  //       //gira horario
  //     }
  //   }
  //   else if(ldr_matriz[0][0] == 0 && ldr_matriz[0][1] == 0 && ldr_matriz[1][0] == 1 && ldr_matriz[1][1] == 0){
  //     while(ldr_matriz[0][0] == 0) {
  //       //gira anti horario
  //     }
  //   }
  //   else if(ldr_matriz[0][0] == 0 && ldr_matriz[0][1] == 1 && ldr_matriz[1][0] == 0 && ldr_matriz[1][1] == 0){
  //     while(ldr_matriz[1][1] == 0) {
  //       //gira anti horario
  //     }
  //   }
  //   else if(ldr_matriz[0][0] == 0 && ldr_matriz[0][1] == 0 && ldr_matriz[1][0] == 0 && ldr_matriz[1][1] == 1){
  //     while(ldr_matriz[0][1] == 0) {
  //       //gira horario/
  //     }
  //   }
    
  // }

}

function ldr_garra(){
  let ldr, garra_ldr = [], itens = 10, resultado_garra;
  let filtro = new Filtro();

  b.digitalWrite(s1, 1);
  b.digitalWrite(s2, 1);
  b.digitalWrite(s3, 1);
  ldr = b.analogRead(s0);
  garra_ldr.push(ldr);
  b.digitalWrite(s1, 1);
  b.digitalWrite(s2, 0);
  b.digitalWrite(s3, 1);
  ldr = b.analogRead(s0);
  garra_ldr.push(ldr);
  resultado_garra = filtro.media_movel_GR();
  if(garra_ldr.length == itens){
    console.log(resultado_garra);
    garra_ldr.shift();
    garra_ldr.shift();
  }
  return resultado_garra
}

function roda_ldr_nave() {
  nave = setInterval(ldr_navegacao, 100);
}

function para_ldr_nave(){
  clearTimeout(nave);
}

function roda_ldr_garra() {
  garra = setInterval(garra, 100);
}

function para_ldr_garra(){
  clearTimeout(garra);
}

roda_ldr_nave();