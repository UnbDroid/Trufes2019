var math = require('mathjs');

class Basket{
  constructor(x, y, color){
    this._pos_x = x
    this._pos_y = y
    this._placed = false
    this._color = 'u'
  }

  set color(new_color) {
    this._color  = new_color
  }
  
  set placed(new_status) {
    this._placed = new_status
  }

  get placed() {
    return this._placed
  }

  get color() {
    return this._color
  }

  get pos_x() {
    return this._pos_x
  }

  get pos_y() {
    return this._pos_y
  }

}

class Laundry {

  constructor(x, y){
      this._pos_x = x
      this._pos_y = y
      this._color = 'u'
      this._avaiable = true
  }

  get pos_x() {
    return this._pos_x
  }

  get pos_y() {
    return this._pos_y
  }

  get color() {
    return this._color
  }

  set color(new_color) {
    this._color  = new_color
  }
  
  set avaiable(new_status){
    this._avaiable = new_status
  }
  
  get avaiable(){
    return this._avaiable
  }
  
}

class Map {

  constructor(b1_pos, b2_pos, b3_pos, b4_pos){
    this.init_laundry()
    this.init_baskets(b1_pos, b2_pos, b3_pos, b4_pos)
    this.contador_laundry = 0
    this.contador_basket = 0
  }

  init_laundry(){
    this.left_bottom_laundry = new Laundry(0, 7)
    this.left_top_laundry = new Laundry(0, 0)
    this.right_bottom_laundry = new Laundry(7, 7)
    this.right_top_laundry = new Laundry(7, 0)
  }

  init_baskets(b1_pos, b2_pos, b3_pos, b4_pos) {
    this.basket_one = new Basket(b1_pos[0], b1_pos[1])
    this.basket_two = new Basket(b2_pos[0], b2_pos[1])
    this.basket_three = new Basket(b3_pos[0], b3_pos[1])
    this.basket_four = new Basket(b4_pos[0], b4_pos[1])
  }
  
  rota_basket() {

    let robot_pos = [7, 7, 'u', 'u']
    let distance_one = math.abs(this.basket_one.pos_x - robot_pos[0]) + math.abs(this.basket_one.pos_y - robot_pos[1])
    let distance_two = math.abs(this.basket_two.pos_x - robot_pos[0]) + math.abs(this.basket_two.pos_y - robot_pos[1])
    let distance_three = math.abs(this.basket_three.pos_x - robot_pos[0]) + math.abs(this.basket_three.pos_y - robot_pos[1])
    let distance_four = math.abs(this.basket_four.pos_x - robot_pos[0]) + math.abs(this.basket_four.pos_y - robot_pos[1])
    
    let distances = [distance_one, distance_two, distance_three, distance_four]
    
    for(let i=0;i<distances.length-1;i++){
      for(let j=0;j<distances.length-1;j++){
        if(distances[j]>distances[j+1]){
          let aux=distances[j]
          distances[j]=distances[j+1]
          distances[j+1]=aux
        }
      }
    }
    
    for(let k = 0; k<4; k++) {
    
      let closer = distances[this.contador_basket]
      if((closer == distance_one) && this.basket_one.placed == false) {
        
        let distance_xy_one = math.abs(this.basket_one.pos_x - robot_pos[0]) + math.abs((this.basket_one.pos_y + 1) - robot_pos[1])
        let distance_xy_two = math.abs(this.basket_one.pos_x - robot_pos[0]) + math.abs((this.basket_one.pos_y - 1) - robot_pos[1])
        let distance_xy_three = math.abs((this.basket_one.pos_x + 1) - robot_pos[0]) + math.abs(this.basket_one.pos_y - robot_pos[1])
        let distance_xy_four = math.abs((this.basket_one.pos_x - 1) - robot_pos[0]) + math.abs(this.basket_one.pos_y - robot_pos[1])
        
        let vetor_one = [this.basket_one.pos_x, (this.basket_one.pos_y + 1), distance_xy_one]
        let vetor_two = [this.basket_one.pos_x, (this.basket_one.pos_y - 1), distance_xy_two]
        let vetor_three = [(this.basket_one.pos_x + 1), this.basket_one.pos_y, distance_xy_three]
        let vetor_four = [(this.basket_one.pos_x - 1), this.basket_one.pos_y, distance_xy_four]
        
        let vetor_closer = vetor_one
        
        if(vetor_two[2] < vetor_one[2]){vetor_closer = vetor_two}
        if(vetor_three[2] < vetor_closer[2]) {vetor_closer = vetor_three}
        if(vetor_four[2] < vetor_closer[2]) {vetor_closer = vetor_four}
        
        robot_pos[0] = vetor_closer[0]
        robot_pos[1] = vetor_closer[1]
        robot_pos[2] = 'one'
        this.basket_one.color = 'white' 
        robot_pos[3] = this.basket_one.color
        this.basket_one.placed = true
      
        this.contador_basket = 0
      
        return robot_pos
      }
      else if((closer == distance_two) && this.basket_two.placed == false) {
        
        let distance_xy_one = math.abs(this.basket_two.pos_x - robot_pos[0]) + math.abs((this.basket_two.pos_y + 1) - robot_pos[1])
        let distance_xy_two = math.abs(this.basket_two.pos_x - robot_pos[0]) + math.abs((this.basket_two.pos_y - 1) - robot_pos[1])
        let distance_xy_three = math.abs((this.basket_two.pos_x + 1) - robot_pos[0]) + math.abs(this.basket_two.pos_y - robot_pos[1])
        let distance_xy_four = math.abs((this.basket_two.pos_x - 1) - robot_pos[0]) + math.abs(this.basket_two.pos_y - robot_pos[1])
        
        let vetor_one = [this.basket_two.pos_x, (this.basket_two.pos_y + 1), distance_xy_one]
        let vetor_two = [this.basket_two.pos_x, (this.basket_two.pos_y - 1), distance_xy_two]
        let vetor_three = [(this.basket_two.pos_x + 1), this.basket_two.pos_y, distance_xy_three]
        let vetor_four = [(this.basket_two.pos_x - 1), this.basket_two.pos_y, distance_xy_four]
        
        let vetor_closer = vetor_one
        
        if(vetor_two[2] < vetor_one[2]){vetor_closer = vetor_two}
        if(vetor_three[2] < vetor_closer[2]) {vetor_closer = vetor_three}
        if(vetor_four[2] < vetor_closer[2]) {vetor_closer = vetor_four}
        
        robot_pos[0] = vetor_closer[0]
        robot_pos[1] = vetor_closer[1]
        robot_pos[2] = 'two'
        this.basket_two.color = 'white'
        robot_pos[3] = this.basket_two.color
        this.basket_two.placed = 'true'
      
        this.contador_basket = 0
      
        return robot_pos
      }
      else if((closer == distance_three) && this.basket_three.placed == false) {
        
        let distance_xy_one = math.abs(this.basket_three.pos_x - robot_pos[0]) + math.abs((this.basket_three.pos_y + 1) - robot_pos[1])
        let distance_xy_two = math.abs(this.basket_three.pos_x - robot_pos[0]) + math.abs((this.basket_three.pos_y - 1) - robot_pos[1])
        let distance_xy_three = math.abs((this.basket_three.pos_x + 1) - robot_pos[0]) + math.abs(this.basket_three.pos_y - robot_pos[1])
        let distance_xy_four = math.abs((this.basket_three.pos_x - 1) - robot_pos[0]) + math.abs(this.basket_three.pos_y - robot_pos[1])
        
        let vetor_one = [this.basket_three.pos_x, (this.basket_three.pos_y + 1), distance_xy_one]
        let vetor_two = [this.basket_three.pos_x, (this.basket_three.pos_y - 1), distance_xy_two]
        let vetor_three = [(this.basket_three.pos_x + 1), this.basket_three.pos_y, distance_xy_three]
        let vetor_four = [(this.basket_three.pos_x - 1), this.basket_three.pos_y, distance_xy_four]
        
        let vetor_closer = vetor_one
        
        if(vetor_two[2] < vetor_one[2]){vetor_closer = vetor_two}
        if(vetor_three[2] < vetor_closer[2]) {vetor_closer = vetor_three}
        if(vetor_four[2] < vetor_closer[2]) {vetor_closer = vetor_four}
        
        robot_pos[0] = this.basket_three.pos_x
        robot_pos[1] = this.basket_three.pos_y + 1
        robot_pos[2] = 'three'
        this.basket_three.color = 'black'
        robot_pos[3] = this.basket_three.color
        this.basket_three.placed = 'true'
      
        this.contador_basket = 0
      
        return robot_pos
      }
      else if((closer == distance_four) && this.basket_four.placed == false) {
        
        let distance_xy_one = math.abs(this.basket_four.pos_x - robot_pos[0]) + math.abs((this.basket_four.pos_y + 1) - robot_pos[1])
        let distance_xy_two = math.abs(this.basket_four.pos_x - robot_pos[0]) + math.abs((this.basket_four.pos_y - 1) - robot_pos[1])
        let distance_xy_three = math.abs((this.basket_four.pos_x + 1) - robot_pos[0]) + math.abs(this.basket_four.pos_y - robot_pos[1])
        let distance_xy_four = math.abs((this.basket_four.pos_x - 1) - robot_pos[0]) + math.abs(this.basket_four.pos_y - robot_pos[1])
        
        let vetor_one = [this.basket_four.pos_x, (this.basket_four.pos_y + 1), distance_xy_one]
        let vetor_two = [this.basket_four.pos_x, (this.basket_four.pos_y - 1), distance_xy_two]
        let vetor_three = [(this.basket_four.pos_x + 1), this.basket_four.pos_y, distance_xy_three]
        let vetor_four = [(this.basket_four.pos_x - 1), this.basket_four.pos_y, distance_xy_four]
        
        let vetor_closer = vetor_one
        
        if(vetor_two[2] < vetor_one[2]){vetor_closer = vetor_two}
        if(vetor_three[2] < vetor_closer[2]) {vetor_closer = vetor_three}
        if(vetor_four[2] < vetor_closer[2]) {vetor_closer = vetor_four}
        
        robot_pos[0] = this.basket_four.pos_x
        robot_pos[1] = this.basket_four.pos_y + 1
        robot_pos[2] = 'four'
        this.basket_four.color = 'black'
        robot_pos[3] = this.basket_four.color
        this.basket_four.placed = 'true'
      
        this.contador_basket = 0
      
        return robot_pos
      }
      else {
        this.contador_basket++
      }
    }
    return 'acabaram os cubos!!!'
    
  }
  
  rota_laundry(cubo) {
    
    this.left_bottom_laundry.color = 'white'
    this.right_bottom_laundry.color = 'black'
    this.left_top_laundry.color = 'black'
    this.right_top_laundry.color = 'white'  
    
    let basket = cubo //vetor que possui as posições x e y do robô, o numero do cubo que ele possui e sua cor
    
    let distance_lb = math.abs(this.left_bottom_laundry.pos_x - basket[0]) + math.abs(this.left_bottom_laundry.pos_y - basket[1])
    let distance_lt = math.abs(this.left_top_laundry.pos_x - basket[0]) + math.abs(this.left_top_laundry.pos_y - basket[1])
    let distance_rb = math.abs(this.right_bottom_laundry.pos_x - basket[0]) + math.abs(this.right_bottom_laundry.pos_y - basket[1])
    let distance_rt = math.abs(this.right_top_laundry.pos_x - basket[0]) + math.abs(this.right_top_laundry.pos_y - basket[1])
    
    let distances = [distance_lb, distance_lt, distance_rb, distance_rt]
    
    for(let i=0;i<distances.length-1;i++){
      for(let j=0;j<distances.length-1;j++){
        if(distances[j]>distances[j+1]){
          let aux=distances[j]
          distances[j]=distances[j+1]
          distances[j+1]=aux
        }
      }
    }
    
    for(let k=0; k<5;k++){
    
      if(distances[this.contador_laundry] == distance_lb) {
        if(((this.left_bottom_laundry.color == 'white' && basket[3] == 'white') || (this.left_bottom_laundry.color == 'black' && basket[3] == 'black')) && this.left_bottom_laundry.avaiable == true){
        
        let distance_xy_one = math.abs(this.left_bottom_laundry.pos_x - basket[0]) + math.abs((this.left_bottom_laundry.pos_y - 1) - basket[1])
        let distance_xy_two = math.abs((this.left_bottom_laundry.pos_x - 1) - basket[0]) + math.abs(this.left_bottom_laundry.pos_y - basket[1])
        
        let vetor_one = [this.left_bottom_laundry.pos_x, (this.left_bottom_laundry.pos_y - 1), distance_xy_one]
        let vetor_two = [(this.left_bottom_laundry.pos_x - 1), this.left_bottom_laundry.pos_y, distance_xy_two]
        
        let vetor_closer = vetor_one
        
        if(vetor_two[2] < vetor_one[2]){vetor_closer = vetor_two}
          
          basket[0] = vetor_closer[0]
          basket[1] = vetor_closer[1]
          basket[4] = 'lb'
          basket[5] = this.left_bottom_laundry.color
          this.left_bottom_laundry.avaiable = false
          return basket
        }
        else{
          this.contador_laundry++
        }
      
      }
    
      if(distances[this.contador_laundry] == distance_lt) {
        console.log("ltcolor: " + this.left_bottom_laundry.color + "basket: " + basket[3])
        if(((this.left_top_laundry.color == 'white' && basket[3] == 'white') || (this.left_top_laundry.color == 'black' && basket[3] == 'black')) && this.left_top_laundry.avaiable == true){
        console.log(basket[3] == 'black')
          let distance_xy_one = math.abs(this.left_top_laundry.pos_x - basket[0]) + math.abs((this.left_top_laundry.pos_y - 1) - basket[1])
          let distance_xy_two = math.abs((this.left_top_laundry.pos_x - 1) - basket[0]) + math.abs(this.left_top_laundry.pos_y - basket[1])
        
          let vetor_one = [this.left_top_laundry.pos_x, (this.left_top_laundry.pos_y - 1), distance_xy_one]
          let vetor_two = [(this.left_top_laundry.pos_x - 1), this.left_top_laundry.pos_y, distance_xy_two]
        
          let vetor_closer = vetor_one
          
          if(vetor_two[2] < vetor_one[2]){vetor_closer = vetor_two}
        
          basket[0] = vetor_closer[0]
          basket[1] = vetor_closer[1]
          basket[4] = 'lt'
          basket[5] = this.left_bottom_laundry.color 
          this.left_bottom_laundry.avaiable = false
          return basket
        }
        else{
          this.contador_laundry++
        }
      }
    
      if(distances[this.contador_laundry] == distance_rb) {
        if(((this.right_bottom_laundry.color == 'white' && basket[3] == 'white') || (this.right_bottom_laundry.color == 'black' && basket[3] == 'black')) && this.right_bottom_laundry.avaiable == true){
          
          let distance_xy_one = math.abs(this.right_bottom_laundry.pos_x - basket[0]) + math.abs((this.right_bottom_laundry.pos_y - 1) - basket[1])
          let distance_xy_two = math.abs((this.right_bottom_laundry.pos_x - 1) - basket[0]) + math.abs(this.right_bottom_laundry.pos_y - basket[1])
        
          let vetor_one = [this.right_bottom_laundry.pos_x, (this.right_bottom_laundry.pos_y - 1), distance_xy_one]
          let vetor_two = [(this.right_bottom_laundry.pos_x - 1), this.right_bottom_laundry.pos_y, distance_xy_two]
        
          let vetor_closer = vetor_one
          
          if(vetor_two[2] < vetor_one[2]){vetor_closer = vetor_two}
          
          basket[0] = vetor_closer[0]
          basket[1] = vetor_closer[1]
          basket[4] = 'rb'
          basket[5] = this.right_bottom_laundry.color
          this.right_bottom_laundry.avaiable = false
          return basket
        }
        else {
          this.contador_laundry++
        }
      }
    
      if(distances[this.contador_laundry] == distance_rt) {
        if(((this.right_top_laundry.color == 'white' && basket[3] == 'white') || (this.right_top_laundry.color == 'black' && basket[3] == 'black')) && this.right_top_laundry.avaiable == true){
          
          let distance_xy_one = math.abs(this.right_top_laundry.pos_x - basket[0]) + math.abs((this.right_top_laundry.pos_y - 1) - basket[1])
          let distance_xy_two = math.abs((this.right_top_laundry.pos_x - 1) - basket[0]) + math.abs(this.right_top_laundry.pos_y - basket[1])
        
          let vetor_one = [this.right_top_laundry.pos_x, (this.right_top_laundry.pos_y - 1), distance_xy_one]
          let vetor_two = [(this.right_top_laundry.pos_x - 1), this.right_top_laundry.pos_y, distance_xy_two]
        
          let vetor_closer = vetor_one
          
          if(vetor_two[2] < vetor_one[2]){vetor_closer = vetor_two}
          
          basket[0] = vetor_closer[0]
          basket[1] = vetor_closer[1]
          basket[4] = 'rt'
          basket[5] = this.right_top_laundry.color
          this.right_top_laundry.avaiable = false
          return basket
        }
        else {
          this.contador_laundry++
        }
      }
    }
    
    return 'acabaram as lavanderias'
    
  }
 
}

let m = new Map([6,6], [1,1], [7,4], [3,2])
for(let i=0; i<4; i++) {
let cubo = m.rota_basket()
console.log("onde o robo para pro cubo: " + cubo)
let lavanderia = m.rota_laundry(cubo)
console.log("onde o robo para pra lavanderia: " + lavanderia)
}
