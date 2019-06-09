'use strict';

class Filters {

  constructor (){

  }

  moving_avg(values) {
    let avg = 0.0
    for (let i in values) {
      avg = avg + values[i]
    }
    try {
        avg = avg/values.length
    } catch(err){
      console.log("Error:" + err)
    }
    return avg
  }

}

module.exports = Filters;
// Filters.moving_avg([1,1,1,1,1,1])
