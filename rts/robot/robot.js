'use strict';
var Filters = require('./filters')

class Robot{

 constructor(id){
    this.id = id ;
    this.filter = new Filters()
    this.map = new Map([0 ,3],
                      [[4, 5],[3, 2]],
                      [[3, 7],[7, 1]],
                      [[0, 0],[0, 7]],
                      [[7, 0],[7, 7]])
 }

 print(){
    console.log('Name is: '+ this.id);
 }

 calculate_distances() {
   
 }
}

var a1 = new Robot("Woody");
console.log(a1.id)
console.log(a1.filter.moving_avg('a'))
