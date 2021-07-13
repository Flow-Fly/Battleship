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
    this.deadShips = []
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
    this.field = Array(10).fill().map(() => Array(10).fill())
    this.moveMades = new Set
    this.randomPossibleMoves = new Set
    this.hits = new Set
  }

  createField(bool) {
    //true bool is passed to create played field, false for computer.
    const playerField = []
    for(let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field.length; j++) {
        if (bool) {
          const div = document.createElement('div')
          div.setAttribute('x', i)
          div.setAttribute('y', j)
          div.classList.add('water')
          playerField.push(div)
        }
        this.field[i][j] = {}
        this.field[i][j].x = i
        this.field[i][j].y = j
        this.field[i][j].ship = false
        this.field[i][j].name = null
      }
    }
    if (bool) return playerField
  }
 
  randomMoves() {
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        for (let j = 1; j < 10; j += 2) {
          this.randomPossibleMoves.add({x: i, y: j})
        }
      } else {
        for (let j = 0; j < 10; j += 2) {
          this.randomPossibleMoves.add({x: i, y: j})
        }
      }
      
    }
  }

  randomShot(num) {
    const shots = []
    for (let i = 0; i < num; i++) {
      let shot = Array.from(this.randomPossibleMoves);
      const index = Math.floor(Math.random() * shot.length);
      if (!this.moveMades.has(shot[index])) {
        shot = shot[index];
        this.randomPossibleMoves.delete(shot)
        this.moveMades.add(shot)
        shots.push(shot)
      } else {
        randomShot(num)
      }
    }
    return shots
  }

  hunt() {

  }

  knowledgeCheck() {
    if (this.hits.length > 1) {
      
    }
  }
}