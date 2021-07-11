import { Field, BattleShips, Ship } from "./classes"

const playerBoard = document.getElementById('containerPlayerBoard')
const mainBoard = document.getElementById('containerMainBoard')
const start = document.getElementById('start')
const shipsInventory = document.getElementById('shipsInventory')

start.onclick = generateShips('playerArmy') 








function generateShips(str) {
    str = new BattleShips 
    str.addShip(new Ship('Carrier', 5))
    str.addShip(new Ship('Battleship', 4))
    str.addShip(new Ship('Destroyer', 3))
    str.addShip(new Ship('Submarine', 3))
    str.addShip(new Ship('Patrol Boat', 2))
    generateInventory()
}

function generateInventory() {
    
}