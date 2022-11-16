
const ticSquare = document.querySelector(".game-board")
const startBtn = document.querySelector(".start")
const tic1 = document.getElementById('left1')
const tic2 = document.getElementById('left2')
const tic3 = document.getElementById('left3')
const tic4 = document.getElementById('middle1')
const tic5 = document.getElementById('middle2')
const tic6 = document.getElementById('middle3')
const tic7 = document.getElementById('right1')
const tic8 = document.getElementById('right2')
const tic9 = document.getElementById('right3')
const scoresList = document.querySelector('.scores-list')
const usernameForm = document.querySelector('.username')
const initialsForm = document.getElementById('initials')

let scoresArr = []
let pickedSqures = []
let chosen = []
let playerTurn = null
let XwinCount = 0
let OwinCount = 0
let username = ''
let winnerStreak = 0 // this is to determine if a streak has ended
let possibleMoves = ["left1","middle1","right1",
"left2","middle2","right2",
"left3","middle3","right3"]

// Add functionality to each square
for (let i = 0; i < ticSquare.children.length; i++) {
    for (let k = 0; k < ticSquare.children[i].children.length; k++) {
        ticSquare.children[i].children[k].addEventListener('click', markX)  
    }
}
function startTicTacToeGame () {

    playerTurn = true
    let mark = 'X'
    // console.log(`${mark} starts the game`)
    pickedSqures = []
    chosen = []
    possibleMoves = ["left1","middle1","right1",
"left2","middle2","right2",
"left3","middle3","right3"]

    tic1.style.backgroundColor = 'grey'
    tic2.style.backgroundColor = 'grey'
    tic3.style.backgroundColor = 'grey'
    tic4.style.backgroundColor = 'grey'
    tic5.style.backgroundColor = 'grey'
    tic6.style.backgroundColor = 'grey'
    tic7.style.backgroundColor = 'grey'
    tic8.style.backgroundColor = 'grey'
    tic9.style.backgroundColor = 'grey'
    tic1.innerHTML = ''
    tic2.innerHTML = ''
    tic3.innerHTML = ''
    tic4.innerHTML = ''
    tic5.innerHTML = ''
    tic6.innerHTML = ''
    tic7.innerHTML = ''
    tic8.innerHTML = ''
    tic9.innerHTML = ''
    // alert(`${username} starts the game`)
    Swal.fire(
        'New Game',
        'Try and get a new high score!'
    )

    
}
    // Functionality of the squares, essentially marking your space.
function markX(e) {

    if(playerTurn === true){
        console.log('available squares:')
        console.log(possibleMoves)

        if (chosen.includes(e.target.id)){
            Swal.fire('that square is already chosen')
        } else{
            chosen.push(e.target.id)

            pickedSqures.push([e.target.id, 'X'])

            possibleMoves.splice(possibleMoves.indexOf(e.target.id), 1)
            
            e.target.style.backgroundColor = '#19B6FA'
            
            winner = checkWinner()
            if (winner === "X") {
                XwinCount++
                OwinCount = 0
                console.log(`win count is: ${XwinCount}`)
                document.getElementById('current').innerHTML = `<h2>${username} ... ${XwinCount} </h2>`
                // setTimeout(function() { alert(`${winner} won this round`); }, 300); 
                Swal.fire(`you have won ${XwinCount} in a row`)

                setTimeout(function() {startTicTacToeGame()}, 2500)
            } else if (winner === 'draw') {
                winnerStreak = XwinCount
                winnerStreakEnd()
            XwinCount = 0
            OwinCount = 0
        
            setTimeout(function() { Swal.fire(`it was a draw, reset the scores`); }, 300);
            setTimeout(function() {startTicTacToeGame()}, 2000)
            } else{

                //after you choose, the computer will choose a square
                setTimeout(function() {Ochoose()}, 500)
            }
            
        }

        function Ochoose() {
            // console.log('available squares:')
            // console.log(possibleMoves)
            let choice = Math.floor(Math.random() * possibleMoves.length) 

            chosen.push(possibleMoves[choice])
            //console.log(`'O' chooses index ${choice} of possibleMoves, which is ${possibleMoves[choice]}`)
            //console.log(`chosen moves: ${chosen}`)

            pickedSqures.push([possibleMoves[choice], 'O'])
            //console.log(pickedSqures)
            // console.log(` picked squares so far: ${pickedSqures}   `)

            oChosenSquare = document.getElementById(possibleMoves[choice])
            //console.log(oChosenSquare)

            possibleMoves.splice(choice, 1)
            //console.log(`remaining possible moves: ${possibleMoves}`)

            oChosenSquare.style.backgroundColor = '#343434'

            winner = checkWinner()
            if(winner === "O"){
                OwinCount++
                winnerStreak = XwinCount
                winnerStreakEnd()
                XwinCount = 0
                setTimeout(function() { Swal.fire(`${winner} won this round`); }, 300);
                setTimeout(function() {startTicTacToeGame()}, 2000)
            } else if (winner === 'draw') {
                    winnerStreak = XwinCount
                    winnerStreakEnd()
                XwinCount = 0
                OwinCount = 0
            
                setTimeout(function() { Swal.fire(`it was a draw, reset the scores`); }, 300);
                setTimeout(function() {startTicTacToeGame()}, 2000)
            }
        }
    } 
}

function checkWinner() {
    let gameBoard = ["left1","middle1","right1",
                    "left2","middle2","right2",
                    "left3","middle3","right3"]

    //every time checkwinner runs, this for loop will replace the game board spots with either x or o (based on what the picked squares array has)
    // console.log(`picked squares length ${pickedSqures.length}`)
    for (let i = 0; i < pickedSqures.length; i++){
        let index = gameBoard.indexOf(pickedSqures[i][0])
        gameBoard[index] = pickedSqures[i][1]
    }
    // console.log('current game board:')
    // console.log(gameBoard)

    // check to see if anyone won
    if (gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2]) {
        return ( gameBoard[0])
    }else if (gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5]) {
        return (gameBoard[3])
    }else if (gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8]) {
        return (gameBoard[6])
    }else if (gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6]) {
        return (gameBoard[0])
    }else if (gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7]) {
        return (gameBoard[1])
    }else if (gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8]) {
        return (gameBoard[2])
    }else if (gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) {
        return (gameBoard[0])
    }else if (gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) {
        return (gameBoard[2])
    }else if (pickedSqures.length === 9){
        return ('draw')
    }

    
    console.log('-------- next move ------')
}

function winnerStreakEnd() {
    // console.log(winnerStreak)
    if (winnerStreak > Math.min(...scoresArr)){
        console.log(`${winnerStreak} is a new high score! Please enter your name`)
        // usernameForm.style.display = 'block'
        newHighScore()
    }

}
function saveUsername(event) {
    event.preventDefault()
    username = initialsForm.value.toUpperCase()

    if(username != ''){
  
    let scoreCard = document.createElement('li')
    scoreCard.innerHTML = `<h3>Current Streak</h3>`

    scoresList.appendChild(scoreCard)
    scoreCard.innerHTML = `<h2 id="current" >${username} ... ${winnerStreak} </h2>`

    scoresList.appendChild(scoreCard)
        usernameForm.style.display = 'none'
        setTimeout(function() {startTicTacToeGame()}, 500)
    } else {
        Swal.fire('Please enter a name')
    }
}
function newHighScore(){
    
        let body = {
        name: username,
        score: winnerStreak
    }

    axios.post('/scores', body)
    .then(() => {
        initialsForm.value = ''
        // winnerForm.style.display = 'none'
        getHighScores()
    })
}

function getHighScores() {
    scoresList.innerHTML = '<h4>LEADER BOARD</h4>'
    axios.get('/scores')
    .then(res => {
        // console.log(res.data)
        let scoresArr = []
        for (let i = 0; i < res.data.length; i++) {
            scoresArr.push(res.data[i])
            createScoreLine(res.data[i])
        }

    let scoreCard = document.createElement('li')
    scoreCard.innerHTML = `<h3>----------</h3>`

    scoresList.appendChild(scoreCard)
    })
}

function createScoreLine(score) {
    // console.log(score)
    // console.log(scoresArr)
    scoresArr.push(score.score)
    let scoreCard = document.createElement('li')
    scoreCard.innerHTML = `<h3>${score.name} ... ${score.score} </h3>`

    scoresList.appendChild(scoreCard)

}
usernameForm.addEventListener('submit', saveUsername)
// startBtn.addEventListener('click', startTicTacToeGame)
getHighScores()