import {Ship, BattleShips, Field} from '../modules/classes.js'


const playerBoard = document.querySelector('.playerBoard')
const shipsBoard = document.querySelector('.shipsBoard')
const start = document.getElementById('start')
const shipsInventory = document.querySelector('.shipsInventory')
const randomBtn = document.getElementById('randomizer')
let dragged = null



//start.onclick = generateShips('playerArmy') 
//console.log(playerBoard)
const computerField = new Field
const playerField = new Field
const computerShips = new BattleShips
const playerShips = new BattleShips

const gameState = {
    turn: 1,
    playerHits: 0,
    computerHits: 0,
    playerMiss: 0,
    computerMiss: 0       
}





//Used to try to snap the boats on the grid
let shipBoardRect = shipsBoard.getBoundingClientRect()
shipBoardRect = {
    x: parseInt(shipBoardRect.x + 16, 10),
    y: parseInt(shipBoardRect.y + 16, 10),
    xmax: parseInt(shipBoardRect.right - 16, 10),
    ymax: parseInt(shipBoardRect.bottom - 16, 10)
}
console.log(`x: ${shipBoardRect.x} to ${shipBoardRect.xmax}
y: ${shipBoardRect.y} to: ${shipBoardRect.ymax}`)


gameSetup()
generateInventory()
dragNDrop()


randomlyPlaceShips(playerShips, playerField)
randomlyPlaceShips(computerShips, computerField)
paintShips()

start.onclick = () => {
    mainGame()
}


function mainGame() {
    const turn = gameState.turn % 2 === 0 ? 'computer' : 'player'

    if(turn === 'player') {
        playerBoard.querySelectorAll('.water').forEach(cell => {
            cell.onclick = () => {
                cell.classList.toggle('shooting')
                
            }
        }) 
    }
}


randomBtn.onclick = () => {
    playerField.createField()
    shipsBoard.querySelectorAll('.ship').forEach(ship => ship.classList.replace('ship', 'empty'))
    randomlyPlaceShips(playerShips, playerField)
    paintShips()
}

function generateShips(str) {
    str.addShip(new Ship('Carrier', 5))
    str.addShip(new Ship('Battleship', 4))
    str.addShip(new Ship('Destroyer', 3))
    str.addShip(new Ship('Submarine', 3))
    str.addShip(new Ship('PatrolBoat', 2))
}

function generateInventory() {
    
    //Create the ship board layout
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) { 
            const div = document.createElement('div')
            div.setAttribute('x', i)
            div.setAttribute('y', j)
            div.classList.add('empty')
            div.classList.add('cell')
            shipsBoard.append(div)
        }
    }
    
    //Add all the ships to the inventory
    playerShips.army.forEach((ship, index) => {
        const div = document.createElement('div');
        div.id = ship.name
        div.classList.add('invShips')
        //div.style.gridArea = `${6 - ship.length} / ${index + 1} / ${6} / ${index + 2}`
        div.style.gridRowEnd = `span ${ship.length}`
        div.style.backgroundColor = '#FFB703';
        div.setAttribute('draggable', true)
        
        shipsInventory.appendChild(div)
    })
}

function gameSetup() {
    let map = playerField.createField(true)
    map.forEach(cell => {
        playerBoard.appendChild(cell)    
});
    computerField.createField(false)
    
    generateShips(playerShips)
    generateShips(computerShips)
}

function dragNDrop() {
    document.querySelectorAll('.invShips').forEach(ship => {
        ship.ondragstart = (e) => {
            dragged = ship;
            e.dataTransfer.setData('text/plain', ship.id)
            e.currentTarget.style.backgroundColor = '#C5C3C6'
        }
    })
    
    shipsBoard.ondragover = (e) => {
        e.preventDefault()
    }
    shipsBoard.ondrop = (e) => {
        console.log(e)
        const id = e.dataTransfer.getData('text');
        const dragged = document.getElementById(id);
        e.target.appendChild(dragged)
        e.dataTransfer.clearData();
    }
}

function randomlyPlaceShips(playerArmy, playerField) {
   
    const ships = playerArmy.army
    ships.forEach(ship => {
        const direction = Math.floor(Math.random() * 2)
        let x = null
        let y = null
        let counter = 0
        if (direction === 0) {
            do {
                counter = 0
                x = Math.floor(Math.random() * (10 - ship.length))
                y = Math.floor(Math.random() * 10)
                for (let i = 0; i < ship.length; i++) {
                    if (!playerField.field[x + i][y].ship)  {
                        counter += 1
                    }
                }
            } while (counter !== ship.length)
            for (let i = 0; i < ship.length; i++) {
                playerField.field[x + i][y].ship = true
            }
        } else {
            do {
                counter = 0
                x = Math.floor(Math.random() * (10))
                y = Math.floor(Math.random() * (10 - ship.length))
                for (let i = 0; i < ship.length; i++) {
                    
                  
                    if (!playerField.field[x][y + i].ship) {
                        counter += 1
                    }
                }
            } while (counter !== ship.length)
            for (let i = 0; i < ship.length; i++) {
                playerField.field[x][y + i].ship = true
            }
        }
    })   
}

function ItsAShip(cell, playerField) {

}

function paintShips() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = playerField.field[i][j]
            if (cell.ship) {
                const paintedShip = shipsBoard.querySelector(`[x="${i}"][y="${j}"]`)
                paintedShip.classList.replace('empty', 'ship')
            }
        }
    }
}