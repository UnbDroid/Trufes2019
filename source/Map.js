class Map {

  // p = Posicao do robo
  // ul = UNKNOWN LAUNDRY
  // bl = BLACK LAUNDRY
  // wl = WHITE LAUNDRY
  // ub = UNKNOWN BASKET
  // wb = WHITE BASKET
  // bb = BLACK BASKET


  constructor(){
    this.map = [['ul', ' ', ' ', ' ', ' ', ' ', ' ', 'ul'],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                ['ul', ' ', ' ', ' ', ' ', ' ', ' ', 'ul']]
    this.robot_pos = [0, 0]
  }


  update_robot_pos(x, y) {
    let old_x, old_y
    [old_x, old_y] = [this.robot_pos[0], this.robot_pos[1]]
    this.map[old_x][old_y] = ' '
    this.map[x][y] = 'p'
    this.robot_pos = [x, y]
  }

  identify_laundry(b1, b2, w1, w2) {
    this.map[b1[0]][b1[1]] = 'bl'
    this.map[b2[0]][b2[1]] = 'bl'
    this.map[w1[0]][w1[1]] = 'wl'
    this.map[w2[0]][w2[1]] = 'wl'
  }

  find_baskets(bsk1, bsk2, bsk3, bsk4) {
    this.map[bsk1[0]][bsk1[1]] = 'ub'
    this.map[bsk2[0]][bsk2[1]] = 'ub'
    this.map[bsk3[0]][bsk3[1]] = 'ub'
    this.map[bsk4[0]][bsk4[1]] = 'ub'
  }

  change_basket_color(basket, color) {
    this.map[basket[0]][basket[1]] = color
  }

  find_route_basket() {

  }

  find_route_laundry() {

  }
}

let m = new Map()
m.update_robot_pos(0,0)
console.log(m.map);
m.update_robot_pos(0,1)
console.log(m.map);
m.update_robot_pos(6,6)
console.log(m.map);
m.identify_laundry([0, 0],[7, 7],[0, 7],[7, 0])
console.log(m.map);
m.find_baskets([1,2], [2,1], [3,3], [4,5])
console.log(m.map);
m.change_basket_color([1,2], 'wb')
console.log(m.map);
