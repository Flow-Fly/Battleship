export class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.health = length;
    this.power = 1;
  }
}

export class BattleShips {
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

export class Field {
  constructor() {
    this.row = 10
    this.col = 10
    this.field = new Set
    this.moveMades = new Set
    this.randomPossibleMoves = new Set
    this.hits = new Set
  }

  createField(bool) {
    //true bool is passed to create played field, false for computer.
    const playerField = []
    for(let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (bool) {
          const div = document.createElement('div')
          div.id = `x:${i}-y:${j}`
          playerField.push(div)
        }
        const cell = {x: i, y: j}
        this.field.add(cell)
      }
    }
    if (bool) return playerField
  }

  randomMoves() {
    for (let i = 1; i < 10; i += 2) {
      for (let j = 1; j < 10; j += 2) {
        this.randomPossibleMoves.add({x: i, y: j})
      }
    }
  }

  randomShot() {
    let shot = Array.from(this.randomPossibleMoves);
    const index = Math.floor(Math.random() * shot.length);
    if (!this.moveMades.has(shot[index])) {
      shot = shot[index];
      this.randomPossibleMoves.delete(shot)
      this.moveMades.add(shot)
      return shot
    }
    randomShot()
  }

  hunt() {
    
  }
}