import {Ship, BattleShips, Field} from '../modules/classes.js'

const playerBoard = document.querySelector('.playerBoard')
const shipsBoard = document.querySelector('.shipsBoard')
const start = document.getElementById('start')
const recap = document.querySelector('.recap')
const randomBtn = document.getElementById('randomizer')
const fireBtn = document.getElementById('fire')
const infos = document.getElementById('computerInfos')
const compHits = document.getElementById('compHits')
const compMiss = document.getElementById('compMiss')
const compShips = document.getElementById('compShips')
const playHits = document.getElementById('playHits')
const playMiss = document.getElementById('playMiss')
const playShips = document.getElementById('playShips')

fireBtn.disabled = true

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
initialisation()




function initialisation() {
    gameSetup()
    generateInventory()
    randomlyPlaceShips(playerShips, playerField)
    paintShips()
    start.onclick = () => {
        randomBtn.onclick = () => {}
        mainGame()
    }
}

function mainGame() {
    const turn = gameState.turn % 2 === 0 ? 'computer' : 'player'
    console.log(turn)
    infos.innerHTML += `<br><p>Turn ${gameState.turn}:</p><h3>It's ${turn}'s turn!</h3><br>`
    if(turn === 'player') {
        pickShots()
        waitForX(playerShips.army.length, turn, computerField.field)
        
    } else {
        console.log(computerField.hits.size)
        if (computerField.hits.size === 0) {
            const shots = computerField.randomShot(computerShips.army.length)
            fire(turn, playerField.field, shots)
        } else {
            if (computerField.hits.size === 1) {
                search() 
            }
        
        }
    }
}

function search() {
    const hit = [...computerField.hits]
    console.log(hit)
}

function pickShots() {
    infos.innerHTML += `<p>Set up to ${playerShips.army.length} shots!</p>`
    playerBoard.querySelectorAll('.water').forEach(cell => {
        cell.onclick = () => {
            if (!cell.classList.contains('locked')) {
                if (!cell.classList.contains('shooting')) {
                    cell.classList.remove('water')
                    cell.classList.add('shooting')
                }
            }
            else if (cell.classList.contains('shooting')) {
                cell.classList.remove('shooting')
                cell.classList.add('water')
            }
        }
    })
}

function waitForX(remainingShips, turn, field) {
    let intervalId = setInterval(() => {
        const cells = playerBoard.querySelectorAll('.shooting')
        console.log(`remaining ships: ${remainingShips}, shots: ${cells.length}`)
        if (cells.length >= remainingShips) {
            playerBoard.querySelectorAll('.water').forEach(cell => {
                cell.classList.add('locked')
            })
            fireBtn.disabled = false
            fireBtn.onclick = () => {
                clearInterval(intervalId)
                fire(turn, field)
            }
        }
    },50)
}

function fire(turn, field, shots) {
    if (turn === 'player') {
        fireBtn.disabled = true
        playerBoard.querySelectorAll('.shooting').forEach(cell => {
            cell.classList.remove('shooting')
            cell.classList.add('shot', 'locked')
        })
        playerBoard.querySelectorAll('.water.locked').forEach(cell => {
            cell.classList.remove('locked')
        })
        playerBoard.querySelectorAll('.shot').forEach(cell => {
            if (itsAShip(turn, cell, field)) {
                cell.classList.add('hit')
            } else {
                cell.classList.add('miss')
            }
        })
        
    } else {
        shots.forEach(shot => {
            const x = shot.x
            const y = shot.y
            const cell = shipsBoard.querySelector(`[x="${x}"][y="${y}"]`)
            if (itsAShip(turn, shot, field)) {
                cell.classList.add('hit')
            } else {
                cell.classList.add('miss')
            }
        })
    }
    endTurn(turn)
}

function endTurn(turn) {
    gameState.playerHits = playerBoard.querySelectorAll('.hit').length
    gameState.computerHits = playerField.totalHits
    gameState.playerMiss = playerBoard.querySelectorAll('.miss').length
    gameState.computerMiss = playerField.totalMiss
    turn === 'player' ? sinkShip(turn, computerShips) : sinkShip(turn, playerShips)
    compHits.textContent = gameState.computerHits
    compMiss.textContent = gameState.computerMiss
    compShips.textContent = computerShips.army.length
    playHits.textContent = gameState.playerHits
    playMiss.textContent = gameState.playerMiss
    playShips.textContent = playerShips.army.length
    

    gameState.turn += 1
    mainGame()
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
}

function generateShips(str) {
    str.addShip(new Ship('Carrier', 5))
    str.addShip(new Ship('Battleship', 4))
    str.addShip(new Ship('Destroyer', 3))
    str.addShip(new Ship('Submarine', 3))
    str.addShip(new Ship('PatrolBoat', 2))
}


function gameSetup() {
    let map = playerField.createField(true)
    map.forEach(cell => {
        playerBoard.appendChild(cell)    
});
    computerField.createField(false)
    computerField.randomMoves()
    
    generateShips(playerShips)
    generateShips(computerShips)


    randomlyPlaceShips(computerShips, computerField)
    randomBtn.onclick = () => {
        playerField.createField()
        shipsBoard.querySelectorAll('.ship').forEach(ship => ship.classList.replace('ship', 'empty'))
        randomlyPlaceShips(playerShips, playerField)
        paintShips()
    }
}



function randomlyPlaceShips(army, field) {
   
    army['army'].forEach(ship => {
        //Get a random direction: horizontal (0) vertical (1)
        const direction = Math.floor(Math.random() * 2)
        let x = null
        let y = null
        let counter = 0
        //horizontal
        if (direction === 0) {
            do {
                //reset counter to 0
                counter = 0
                //Get a x position that will make the boat fit
                x = Math.floor(Math.random() * (10 - ship.length))
                y = Math.floor(Math.random() * 10)
                for (let i = 0; i < ship.length; i++) {
                    //field[][].ship is set to false as there is no ship.
                    //If all cells are false (free), end the while loop.
                    //Performance is quite bad as it's a while loop with random assignements.
                    //Could end up in an infinite loop with a lot of bad luck.
                    //To improve if time.
                    if (!field.field[x + i][y].ship)  {
                        counter += 1
                    }
                }
            } while (counter !== ship.length)
            //Now that we know all the cells are free, assign them to true and get the name
            for (let i = 0; i < ship.length; i++) {
                field.field[x + i][y].ship = true
                field.field[x + i][y].name = ship.name
            }
        } else {
            //same logic on y axis.
            do {
                counter = 0
                x = Math.floor(Math.random() * (10))
                y = Math.floor(Math.random() * (10 - ship.length))
                for (let i = 0; i < ship.length; i++) {

                    if (!field.field[x][y + i].ship) {
                        counter += 1
                    }
                }
            } while (counter !== ship.length)
            for (let i = 0; i < ship.length; i++) {
                field.field[x][y + i].ship = true
                field.field[x][y + i].name = ship.name
            }
        }
    })   
}

function itsAShip(turn, cell, field) {
    let x = null
    let y = null
    //Assign x,y depending of who is playing.
    if (turn === 'player') {
        x = cell.getAttribute("x")
        y = cell.getAttribute("y")
    } else {
        x = cell.x
        y = cell.y
    }
    //result to true if there is a ship (set in randomlyPlaceShips())
    if (field[x][y].ship) {
        const name = field[x][y].name
        computerShips.army.forEach(ship => {
            if (ship['name'] === name) {
                //decrement health of hitted ship
                ship.health -= 1
                infos.innerHTML += `<p>${turn} hit ${ship.name} on cell ${x} - ${y}<p/>`
                //Incrementing counters depending of who played
                if(turn === 'player') {
                    gameState.playerHits += 1
                } else {
                    gameState.computerHits += 1
                    computerField.hits.add({'x': x, 'y': y})
                } 
            }
        })
        return true
    } else {
        turn === 'player' ? gameState.playerMiss += 1 : gameState.computerMiss += 1
        return false
    }
}

function sinkShip(turn, army) {
    const toSink = []
    if (turn === 'player') {  
        for (let i = army.army.length - 1; i >= 0; i--) {
            /* console.log(computerShips.army)
            console.log(computerShips.army[i]) */
            if (army.army[i]['health'] === 0) {
                infos.innerHTML += `<p>${turn} sank ${army.army[i].name}</p>`
                toSink.push(army.army.splice(i,1))
            }
        }
    }
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

/* function dragNDrop() {
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
 */
    //Add all the ships to the inventory
    /* playerShips.army.forEach((ship, index) => {
        const div = document.createElement('div');
        div.id = ship.name
        div.classList.add('invShips')
        //div.style.gridArea = `${6 - ship.length} / ${index + 1} / ${6} / ${index + 2}`
        div.style.gridRowEnd = `span ${ship.length}`
        div.style.backgroundColor = '#FFB703';
        div.setAttribute('draggable', true)
        
        shipsInventory.appendChild(div)
    }) */