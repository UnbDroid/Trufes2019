class Basket{
  constructor(x, y, color){
    this._pos_x = x
    this._pos_y = y
    this.placed = false
    this._color = 'u'
  }

  set color(new_color) {
    this._color  = new_color
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
      this.color = 'u'
      this.avaiable = true
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
}

class Map {

  constructor(){
    this.init_laundry()
    this.init_baskets()
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
}

let m = new Map()
