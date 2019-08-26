var rc = require('roboticscape');
var b = require('bonescript');
var scanf = require('scanf');
var math = require('mathjs');
let Directions = require('./Directions');
let D = new Directions();

var s0 = 'P9_39';
var s1 = 'P9_28'; //A
var s2 = 'P9_41'; //B
var s3 = 'P9_23'; //C

b.pinMode(s1, b.OUTPUT);
b.pinMode(s2, b.OUTPUT);
b.pinMode(s3, b.OUTPUT);

rc.initialize();
rc.state("RUNNING");
rc.motor("ENABLE");

let minimo_preto = 500;
let maximo_branco = 4500;

let branco = 1;
let preto = 0;

let transicao_FD = 2060;
let transicao_FE = 1620;
let transicao_TD = 1630;
let transicao_TE = 1500;
let transicao_GR = 2300;

let ldr_esquerda_frente = [], ldr_direita_frente = [], ldr_esquerda_tras = [], ldr_direita_tras = [], garra_ldr = [], ldr, ldr_matriz = [[1, 1], [1, 1]];
let conta_ldr = 0, elementos = 3, valida = 0;
let quadrado = 0;
let frente_viu_linha = 0;

class Navegar{
  
  constructor(){
  }
  
  inicio(){
    let self = this;
    setInterval(function(){
      self.navegacao(self);
    }, 5);
  }
  
  media_movel(vetor, transicao) {
    //lê 5 valores e depois calcula a média, depois substitui só 1 valor e calcula de novo
    let media = 0, variancia = 0, desvio = 0, maximo = 0, minimo = 0
    // console.log("vetor: ", vetor)
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
    // console.log("max:", maximo,"min", minimo)
    if(minimo > minimo_preto && transicao > maximo) {
      return 0 //PRETO
    }
    else if (minimo > transicao && maximo_branco > maximo) {
      return 1 //BRANCO
    }
    else {
      return 2 //ERRO
    }
  }
  
  leitura_ldr(self){
  
    while(conta_ldr<4){
      
    if(conta_ldr%4 == 0){
        b.digitalWrite(s1, 1);
        b.digitalWrite(s2, 1);
        b.digitalWrite(s3, 1);
        ldr = b.analogRead(s0);
        ldr = math.round(1000/ldr);
        ldr_direita_frente.push(ldr);
        if(ldr_direita_frente.length == elementos) {
          ldr_matriz[0][1] = self.media_movel(ldr_direita_frente, transicao_FD);
          ldr_direita_frente.shift();
          valida = 1;
        }
        else if(valida == 1) {
          ldr_matriz[0][1] = self.media_movel(ldr_direita_frente, transicao_FD);
          ldr_direita_frente.shift();
        }
        conta_ldr++;
    }else if(conta_ldr%4 == 1){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 1);
        b.digitalWrite(s3, 1);
        ldr = b.analogRead(s0);
        ldr = math.round(1000/ldr);
        ldr_direita_tras.push(ldr);
        if(ldr_direita_tras.length == elementos) {
          ldr_matriz[1][1] = self.media_movel(ldr_direita_tras, transicao_TD);
          ldr_direita_tras.shift();
          valida = 1;
        }
        else if(valida == 1) {
          ldr_matriz[1][1] = self.media_movel(ldr_direita_tras, transicao_TD);
          ldr_direita_tras.shift();
        }
        conta_ldr++;
    }else if(conta_ldr%4 == 2){
        b.digitalWrite(s1, 1);
        b.digitalWrite(s2, 0);
        b.digitalWrite(s3, 1);
        ldr = b.analogRead(s0);
        ldr = math.round(1000/ldr);
        ldr_esquerda_frente.push(ldr);
        if(ldr_esquerda_frente.length == elementos) {
          ldr_matriz[0][0] = self.media_movel(ldr_esquerda_frente, transicao_FE);
          ldr_esquerda_frente.shift();
          valida = 1;
        }
        else if(valida == 1) {
          ldr_matriz[0][0] = self.media_movel(ldr_esquerda_frente, transicao_FE);
          ldr_esquerda_frente.shift();
        }
      conta_ldr++;

    }else if(conta_ldr%4 == 3){
        b.digitalWrite(s1, 0);
        b.digitalWrite(s2, 0);
        b.digitalWrite(s3, 1);
        ldr = b.analogRead(s0);
        ldr = math.round(1000/ldr);
        ldr_esquerda_tras.push(ldr);
        if(ldr_esquerda_tras.length == elementos) {
          ldr_matriz[1][0] = self.media_movel(ldr_esquerda_tras, transicao_TE);
          ldr_esquerda_tras.shift();
          valida = 1;
        }
        else if(valida == 1) {
          ldr_matriz[1][0] = self.media_movel(ldr_esquerda_tras, transicao_TE);
          ldr_esquerda_tras.shift();
        }
        conta_ldr++;
    
    }
    }
    conta_ldr =0;
}

  navegacao(self){
   
   D.SpeedControlY(1);
   
   self.leitura_ldr(self);
   
   if(frente_viu_linha == 0 && ((ldr_matriz[0][0] == 0 || ldr_matriz[0][1] == 0) && (ldr_matriz[1][0] == 1 || ldr_matriz[1][1] == 1))){
      frente_viu_linha = 1;
      console.log("FRENTE");
      console.log("[" + ldr_matriz[0][0] + "|" + ldr_matriz[0][1] + "]");
    console.log("[" + ldr_matriz[1][0] + "|" + ldr_matriz[1][1] + "]");
   }else if(frente_viu_linha == 1){
      if((ldr_matriz[1][0] == 0 || ldr_matriz[1][1] == 0) && (ldr_matriz[0][0] == 1 || ldr_matriz[0][1] == 1)){
        frente_viu_linha = 0;
        quadrado++;
        console.log("quadrado: " + quadrado);
        console.log("[" + ldr_matriz[0][0] + "|" + ldr_matriz[0][1] + "]");
    console.log("[" + ldr_matriz[1][0] + "|" + ldr_matriz[1][1] + "]");
      }
    }
    // if(quadrado == 4){
    //   D.disableMotors();
    //   setTimeout(D.SpeedControlY(-1), 2000);
 
    // }
}
}

let N = new Navegar;
// N.navegacao();
N.inicio();

module.exports = Navegar;
