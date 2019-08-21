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

var minimo_preto_FD = 500
var maximo_preto_FD = 1650
var minimo_branco_FD = 1650
var maximo_branco_FD = 4500

var minimo_preto_FE = 500
var maximo_preto_FE = 1350
var minimo_branco_FE = 1350
var maximo_branco_FE = 4000

var minimo_preto_TD =500
var maximo_preto_TD = 1650
var minimo_branco_TD = 1650
var maximo_branco_TD = 4000

var minimo_preto_TE = 500
var maximo_preto_TE = 1350
var minimo_branco_TE = 1350
var maximo_branco_TE = 4000

var minimo_preto_GR = 500
var maximo_preto_GR = 2300
var minimo_branco_GR = 2300
var maximo_branco_GR = 4000

let FE = 1350;
let FD = 1650;
let TD = 1450;
let TE = 1650;

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
    if(minimo >= minimo_preto_TD && maximo_preto_TD >= maximo) {
      return 0 //PRETO
    }
    else if (minimo >= minimo_branco_TD && maximo_branco_TD >= maximo) {
      return 1 //BRANCO
    }
    else {
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
   
    rc.motor(1, 0.2);
    rc.motor(2, 0.2);
    rc.motor(3, -0.2);
    rc.motor(4, -0.2);

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
    if(ldr_matriz[0][0] == 1 && ldr_matriz[0][0] == 1){
      rc.motor("DISABLE");
    }

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

    rc.initialize();
    rc.state("RUNNING");
    rc.motor("ENABLE");
    
    

        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 0);
        b.digitalWrite(s3, 1);
        

function teste(){
  let preto = 0, branco;;
  let lendo_preto = 0, lendo_branco = 0;
  if(ldr_matriz[1][2] != 0 || ldr_matriz[1][1] != 0){
  rc.motor(1, 0.8);
  rc.motor(2, 0.8);
  rc.motor(3, -0.8);
  rc.motor(4, -0.8);
  }else{
    rc.motor("DISABLE");
  }
  
  
  // if(ldr < 1650){
  //   preto++;
  //   lendo_preto = 1;
  //   lendo_branco = 0;
  //   branco = 0;
  // }else{
  //   lendo_branco = 1;
  //   branco++;
  //   if(lendo_preto == 1){
  //     if(branco >= 2){
  //       preto = 0;
  //       lendo_preto = 0;
  //       rc.motor(1, 0);
  //       rc.motor(2, 0);
  //       rc.motor(3, 0);
  //       rc.motor(4, 0);
  //       rc.motor("DISABLE");
  //     }
  //   }
  // }
}
// setInterval(teste, 4000);
roda_ldr_nave();
// teste();

let linhas_frente = 0, passou_frente = 0;
let linhas_tras = 0, passou_tras = 0;






