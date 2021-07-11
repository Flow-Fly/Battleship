import {Ship, BattleShips, Field} from '../modules/classes.js'

const playerBoard = document.querySelector('.playerBoard')
const shipsBoard = document.querySelector('.shipsBoard')
const start = document.getElementById('start')
const shipsInventory = document.querySelector('.shipsInventory')

//start.onclick = generateShips('playerArmy') 
//console.log(playerBoard)
const computerField = new Field
const playerField = new Field
const computerShips = new BattleShips
const playerShips = new BattleShips

//Used to try to snap the boats on the grid
let shipBoardRect = shipsBoard.getBoundingClientRect()
shipBoardRect = {
    x: parseInt(shipBoardRect.x + 16, 10),
    y: parseInt(shipBoardRect.y + 16, 10),
    xmax: parseInt(shipBoardRect.right - 16, 10),
    ymax: parseInt(shipBoardRect.bottom - 16, 10)
}

gameSetup()
generateInventory()


function generateShips(str) {
    str.addShip(new Ship('Carrier', 5))
    str.addShip(new Ship('Battleship', 4))
    str.addShip(new Ship('Destroyer', 3))
    str.addShip(new Ship('Submarine', 3))
    str.addShip(new Ship('PatrolBoat', 2))
}

function generateInventory() {
    /* for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 5; j++) { 
            const div = document.createElement('div')
            shipsInventory.appendChild(div)
        }
    } */
    //Create the ship board layout
    /* for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) { 
            const div = document.createElement('div')
            shipsBoard.append(div)
        }
    } */
    //Add all the ships to the inventory
    playerShips.army.forEach((ship, index) => {
        const div = document.createElement('div');
        div.classList.add(ship.name)
        div.classList.add('ship')
        div.style.gridArea = `${6 - ship.length} / ${index + 1} / ${6} / ${index + 2}`
        div.style.backgroundColor = '#FFB703';
        div.setAttribute('draggable', true)
        div.ondragend = (e) => console.log(e)
        shipsInventory.appendChild(div)
    })
}

function gameSetup() {
    let map = playerField.createField(true)
    map.forEach(cell => {
        playerBoard.appendChild(cell)    
});
    
    generateShips(playerShips)
    generateShips(computerShips)
}