class Map{

  constructor(init_pos, cb_pos, ce_pos, mb_pos, me_pos){
    this.map = [[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']]

    this.set_positions(init_pos, cb_pos, ce_pos, mb_pos, me_pos)
  }

  set_positions(init_pos, cb_pos, ce_pos, mb_pos, me_pos) {

    this.map[init_pos[0]][init_pos[1]] = 'i'

    for (let posIndex in cb_pos){
      let pos = cb_pos[posIndex]
      this.map[pos[0]][pos[1]] = 'cb'
    }

    for (let posIndex in ce_pos){
      let pos = ce_pos[posIndex]
      this.map[pos[0]][pos[1]] = 'ce'
    }

    for (let posIndex in mb_pos){
      let pos = mb_pos[posIndex]
      this.map[pos[0]][pos[1]] = 'mb'
    }

    for (let posIndex in me_pos){
      let pos = me_pos[posIndex]
      this.map[pos[0]][pos[1]] = 'me'
    }
  }

  // update_pos(type, pos) {
  //   this.map[pos[0]][pos[1]] = type
  // }
}
