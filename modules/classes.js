export class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.health = length;
    this.power = 1;
    this.x = null
    this.xMax = null
    this.y = null
    this.yMax = null
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
    this.moveMades = []
    this.randomPossibleMoves = []
    this.hits = []
    this.possibleHits = []
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
          this.randomPossibleMoves.push({x: i, y: j})
        }
      } else {
        for (let j = 0; j < 10; j += 2) {
          this.randomPossibleMoves.push({x: i, y: j})
        }
      }
      
    }
  }

  randomShot(num) {
    const shots = []
    for (let i = 0; i < num; i++) {
      const index = Math.floor(Math.random() * this.randomPossibleMoves.length);
      if (!this.moveMades.includes(this.randomPossibleMoves[index])) {
        const shot = this.randomPossibleMoves[index];
        this.randomPossibleMoves.splice(index,1)
        this.moveMades.push(shot)
        shots.push(shot)
      } else {
        this.randomShot(num)
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