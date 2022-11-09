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

let pickedSqures = []

let playerTurn = null
function markX(e) {
    // pickedSqures.push(event.target)
    if(playerTurn === true){

        if (pickedSqures.includes(e.target.id)){
            alert('that square is already chosen')
        } else{
            pickedSqures.push([e.target.id, 'X'])
            e.target.innerHTML = 'X'
            playerTurn = false
            e.target.style.backgroundColor = '#19B6FA'
            
            
        }
    } else if(playerTurn === false) {
        
        if (pickedSqures.includes(e.target.id)){
            alert('that square is already chosen')
        } else{
            pickedSqures.push([e.target.id, 'O'])
            e.target.innerHTML = 'O'
            playerTurn = true
            // console.log(e.target)
            e.target.style.backgroundColor = '#343434'
        }
    }
    
    

    checkWinner()

}


for (let i = 0; i < ticSquare.children.length; i++) {
    console.log('made it')
    for (let k = 0; k < ticSquare.children[i].children.length; k++) {
            ticSquare.children[i].children[k].addEventListener('click', markX)  
    }
}

function startTicTacToeGame () {
    playerTurn = true
    let mark = 'X'
    console.log(`${mark} starts the game`)
    pickedSqures = []

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
    alert(`${mark} starts the game`)
    
}
function checkWinner() {
    let gameBoard = ["left1","middle1","right1",
                    "left2","middle2","right2",
                    "left3","middle3","right3"]
    console.log(pickedSqures)
    for (let i = 0; i < pickedSqures.length; i++){
        console.log(pickedSqures[i])
        let index = gameBoard.indexOf(pickedSqures[i][0])
        console.log(index, pickedSqures[i][1])

        gameBoard[index] = pickedSqures[i][1]
    
    }
    console.log(gameBoard)
    if (gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2]) {
        return ( gameBoard[0] + " won the game")
    }else if (gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5]) {
        return (gameBoard[3] + "won the game")
    }else if (gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8]) {
        return (gameBoard[6] + "won the game")
    }else if (gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6]) {
        return (gameBoard[0] + "won the game")
    }else if (gameBoard[1] === gameBoard[4] && gameBoard[1] === gameBoard[7]) {
        return (gameBoard[1] + "won the game")
    }else if (gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8]) {
        return (gameBoard[2] + "won the game")
    }else if (gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8]) {
        return (gameBoard[0] + "won the game")
    }else if (gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6]) {
        return (gameBoard[2] + "won the game")
    }
    console.log('-------- next game ------')
}

startBtn.addEventListener('click', startTicTacToeGame)
