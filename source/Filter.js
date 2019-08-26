class Filtro {
  
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
  
   media_movel_FE(vetor) {
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
     if(minimo > minimo_preto && transicao_FE > maximo) {
       return 0 //PRETO
     }
     else if (minimo > transicao_FE && maximo_branco > maximo) {
       return 1 //BRANCO
     }
     else {
       return 2 //ERRO
     }
   }
   media_movel_TD(vetor) {
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
     if(minimo >= minimo_preto && transicao_TD >= maximo) {
       return 0 //PRETO
     }
     else if (minimo >= transicao_TD && maximo_branco >= maximo) {
       return 1 //BRANCO
     }
     else {
       return 2 //ERRO
     }
   }
   media_movel_TE(vetor) {
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
     if(minimo > minimo_preto && transicao_TE > maximo) {
       return 0 //PRETO
     }
     else if (minimo > transicao_TE && maximo_branco > maximo) {
       return 1 //BRANCO
     }
     else {
       return 2 //ERRO
     }
   }
   media_movel_GR(vetor) {
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
     if(minimo > minimo_preto && transicao_GR > maximo) {
       return 0 //PRETO
     }
     else if (minimo > transicao_GR && maximo_branco > maximo) {
       return 1 //BRANCO
     }
     else {
       return 2 //ERRO
     }
   }
  
}