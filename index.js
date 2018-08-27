function createDiscInModel(currentPlayer, columnElement) {
    const columnIndex = Number(columnElement.dataset.column);
    const rowIndex = columnElement.childElementCount
    gameBoard[columnIndex][rowIndex] = currentPlayer;
}

let game_active = false
let active_player = "red"
let gameBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
]
const columnlength = gameBoard.length
const rowlength = gameBoard[0].length
let player_color = []
player_color[1] = "Red"
player_color[2] = "black"

for (let row = 0; row <= 5; row++) {
document.writeln("<ln>")
    for (let column = 0; column <= 6; column++) {
        document.writeln("<td id = 'square_" + row + "_" + column + "' class='board_square'></td>")
    }
    document.writeln("</tr>")
}

function beginGame() {
    if (game_active == true) return false;

    game_active = true

    for (let row = 0; row <= 5; row++) {
        gameBoard[row] = [];
        for (let column = 0; column <= 6; column++) {
            gameBoard[row][column] = 0;
        }
    }
    drawBoard();
    active_player = 1;
    setUpTurn()
}

drawBoard();
function drawBoard() {
    const gameTable = document.getElementById("test")
    for (let  i= 0; i <= columnlength; i++) {
        const columnHolder = document.createElement("div")
        columnHolder.className = "column"
        columnHolder.id = "column" + i 
        gameTable.appendChild(columnHolder)
    }
}
function updateGameboard(columnIndex, rowIndex){
    gameBoard[rowIndex][columnIndex] = active_player
}

function drop(columnIndex) {
    const columnDestination = document.getElementById("column" + columnIndex)
    console.log(columnDestination.childElementCount)
    const rowIndex = columnDestination.childElementCount
    if(rowIndex > 5) return
    updateGameboard(columnIndex, rowIndex)
    console.log(gameBoard)

    
    
    if(active_player== "red"){
        const redDisc =  document.createElement("div")
   redDisc.className = "redDisc"
   columnDestination.appendChild(redDisc)
   active_player = "black"
   return
    }
     if(active_player== "black"){
        const blackDisc =  document.createElement("div")
   blackDisc.className = "blackDisc"
   const columnDestination = document.getElementById("column" + columnIndex)
   columnDestination.appendChild(blackDisc)
   active_player = "red"
   return
    }
}

    function checkWin() {
        if (
            FourConsecutiveDiscsHorizontally(horizontally) 
            || FourConsecutiveDiscsVertically(vertically) 
            || ConsecutiveDiscsDiagonallyUpRight(diagonallyUpRight)
            ||FourDiagonallyLeft(diagonallyUpLeft)
        ) {
            addWinMessage();
            winCondition = true;
        }
    }

    function FourConsecutiveDiscsHorizontally(searchFunction) {
        console.log(gameBoard)
        const columnEdge = gameBoard.length - 3;
        for (let columnIndex = 0; columnIndex < columnEdge; columnIndex++) {
            const column = boardModel[columnIndex];
            const rowEdge = column.length;
            for (let rowIndex = 0; rowIndex < rowEdge; rowIndex++) {
                let cell = gameBoard[columnIndex][rowIndex];
                if (cell !== 0) {
                    const matchFound = searchFunction(cell, columnIndex, rowIndex);
                    if (matchFound) return true;
                }
            }
        }
        return false;
    }
    function searchForFourConsecutiveDiscsVertically(searchFunction) {
        console.log(boardModel)
        const columnEdge = boardModel.length;
        for (let columnIndex = 0; columnIndex < columnEdge; columnIndex++) {
            const column = boardModel[columnIndex];
            const rowEdge = column.length - 3;
            for (let rowIndex = 0; rowIndex < rowEdge; rowIndex++) {
                let cell = boardModel[columnIndex][rowIndex];
                if (cell !== 0) {
                    const matchFound = searchFunction(cell, columnIndex, rowIndex);
                    if (matchFound) return true;
                }
            }
        }
        return false;
    }
    function searchForFourConsecutiveDiscsDiagonallyUpRight(searchFunction) {
        console.log(boardModel)
        const columnEdge = boardModel.length - 3;
        for (let columnIndex = 0; columnIndex < columnEdge; columnIndex++) {
            const column = boardModel[columnIndex];
            const rowEdge = column.length - 3;
            for (let rowIndex = 0; rowIndex < rowEdge; rowIndex++) {
                let cell = boardModel[columnIndex][rowIndex];
                if (cell !== 0) {
                    const matchFound = searchFunction(cell, columnIndex, rowIndex);
                    if (matchFound) return true;
                }
            }
        }
        return false;
    }
    
    function searchForFourDiagonallyLeft (searchFunction) {
        console.log(boardModel)
        const columnEdge = boardModel.length;
        for (let columnIndex = 3; columnIndex < columnEdge; columnIndex++) {
            const column = boardModel[columnIndex];
            const rowEdge = column.length -3;
            for (let rowIndex = 0; rowIndex < rowEdge; rowIndex++) {
                let cell = boardModel[columnIndex][rowIndex];
                if (cell !== 0) {
                    const matchFound = searchFunction(cell, columnIndex, rowIndex);
                    if (matchFound) return true;
                }
            }
        }
    
        return false;
    }
    function horizontally(cell, columnIndex, rowIndex) {
        if (cell === gameBoard[columnIndex + 1][rowIndex] && cell === gameBoard[columnIndex + 2][rowIndex] && cell === gameBoard[columnIndex + 3][rowIndex]) {
            console.log("4 in a row at " + columnIndex + ":" + rowIndex)
            return true;
        }
    
        return false;
    }
    function vertically(cell, columnIndex, rowIndex) {
        if (cell === gameBoard[columnIndex][rowIndex + 1] && cell === gameBoard[columnIndex][rowIndex + 2] && cell === gameBoard[columnIndex][rowIndex + 3]) {
            console.log("4 in a row vertically found at " + rowIndex + ":" + columnIndex)
            return true;
        }
    
        return false;
    }
    function diagonallyUpRight(cell, columnIndex, rowIndex) {
        if (cell === gameBoard[columnIndex + 1][rowIndex + 1] && cell === gameBoard[columnIndex + 2][rowIndex + 2] && cell === gameBoard[columnIndex + 3][rowIndex + 3]) {
            console.log("4 in a row " + (columnIndex + 1) + ":" + (rowIndex + 1))
            return true;
        }
        return false;
    }
    function diagonallyUpLeft(cell, columnIndex, rowIndex ) {
        if (cell === gameBoard[columnIndex - 1][rowIndex + 1] && cell === gameBoard[columnIndex - 2][rowIndex + 2] && cell === gameBoard[columnIndex - 3][rowIndex + 3]) {
            console.log("4 in a row up-left found at " + (columnIndex + 1) + ":" + (rowIndex + 1))
            return true;
            }
        return false;
        }
    
    