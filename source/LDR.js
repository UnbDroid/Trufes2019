class LDR {
    constructor(lado, pos) {
        this.lado = lado
        this.posicao = pos
        this.leituras = []
    }
    
    add_leirura(leitura) {
        this.leituras.push(leitura)
    }
}

class _ {
    
    constructor() {
        
        this.ldr_ef = new LDR('esquerda', 'frente')
        this.ldr_df = new LDR('direita', 'frente')
        this.ldr_et = new LDR('esquerda', 'traz')
        this.ldr_dt = new LDR('direita', 'traz')
        
        let conta_ldr = 0
        let ldr_esquerda_frente = []
        let ldr_direita_frente = [], ldr_esquerda_tras = [], ldr_direita_tras = [], garra_ldr = [], ldr, ldr_matriz = [[1, 1], [1, 1]];
    }
    
    read_ldr() {
        
        while(conta_ldr<4){
            if(conta_ldr%4 == 0){
                
                b.digitalWrite(s1, 1);
                b.digitalWrite(s2, 1);
                b.digitalWrite(s3, 1);
                ldr = b.analogRead(s0);
                ldr = math.round(1000/ldr);
                ldr_direita_frente.push(ldr);
                
            if(ldr_direita_frente.length == elementos) {
              ldr_matriz[0][1] = this.media_movel(ldr_direita_frente, transicao_FD);
              ldr_direita_frente.shift();
              valida = 1;
            } else if(valida == 1) {
              ldr_matriz[0][1] = this.media_movel(ldr_direita_frente, transicao_FD);
              ldr_direita_frente.shift();
            }
            conta_ldr++;
            
            } else if(conta_ldr%4 == 1){
            b.digitalWrite(s1, 0);
            b.digitalWrite(s2, 1);
            b.digitalWrite(s3, 1);
            ldr = b.analogRead(s0);
            ldr = math.round(1000/ldr);
            ldr_direita_tras.push(ldr);
            if(ldr_direita_tras.length == elementos) {
              ldr_matriz[1][1] = this.media_movel(ldr_direita_tras, transicao_TD);
              ldr_direita_tras.shift();
              valida = 1;
            }
            else if(valida == 1) {
              ldr_matriz[1][1] = this.media_movel(ldr_direita_tras, transicao_TD);
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
              ldr_matriz[0][0] = this.media_movel(ldr_esquerda_frente, transicao_FE);
              ldr_esquerda_frente.shift();
              valida = 1;
            }
            else if(valida == 1) {
              ldr_matriz[0][0] = this.media_movel(ldr_esquerda_frente, transicao_FE);
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
              ldr_matriz[1][0] = this.media_movel(ldr_esquerda_tras, transicao_TE);
              ldr_esquerda_tras.shift();
              valida = 1;
            }
            else if(valida == 1) {
              ldr_matriz[1][0] = this.media_movel(ldr_esquerda_tras, transicao_TE);
              ldr_esquerda_tras.shift();
            }
            conta_ldr++;
        
        }
        }
        conta_ldr =0;
}
    
    
}