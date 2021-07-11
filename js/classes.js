class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.health = length;
    this.power = 1;
  }
}

class BattleShips {
  constructor() {
    this.army = [];
  }
  addShip(ship) {
    this.army.length < 5
      ? this.army.push(ship)
      : console.error(`You already have ${this.army.length} ships!`);
  }
  totalPower() {
      return this.army.reduce((acc, val) => acc + val.power ,0)
  }
}

class Field {
  constructor() {
    this.row = 10
    this.col = 10
    this.field = null
  }

  createField() {
    
  }
}

export {Field, BattleShips, Ship};
























const army = new BattleShips
const destroyer = new Ship('destroyer', 5)
const barque = new Ship('barque', 2)
console.log('destroyer: ',destroyer,'barque: ' ,barque)
army.addShip(destroyer)
army.addShip(barque)
console.log("Army: ", army.army)
console.log(army.totalPower())