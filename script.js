// don't like how Player has to get initialized first because it's being used by controller
const Player = (name, side) => {
    const getName = () => name;
    const getSide = () => side;
    const makeMove = (board) => {
        let position = board.moves()[Math.floor(Math.random()*board.moves().length)];
        board.update(side, position);
    };

    return { getName, getSide, makeMove, };
};

const Board = (() =>  {
    const board = [null, null, null, null, null, null, null, null, null,];
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    const gameState = () => board;

    const reset = () => {
        board.fill(null);
    };

    const update = (selection, position) => {
        if (board[position] != null) {
            alert('invalid move');
        }
        board[position] = selection;
    };
    const moves = () => {
        const ids = [];
        for(let i=0; i<board.length; i++) {
            if(board[i] == null) {
                ids.push(i);
            }
        }
        return ids;
    };

    const checkWin = () => {
        const X_positions = [];
        const O_positions = [];
        for(let i=0; i<board.length; i++) {
            if(board[i] === 'X') {
                X_positions.push(i);
            }
            else if(board[i] === 'O') {
                O_positions.push(i);
            }
        }
        if (X_positions.length > 2) {
            for(let j=0; j<wins.length; j++) {
                let [a, b, c] = wins[j];
                if(X_positions.includes(a) && X_positions.includes(b) && X_positions.includes(c)) {
                    return 'X';
                }
                else if(O_positions.includes(a) && O_positions.includes(b) && O_positions.includes(c)) {
                    return 'O'
                }
            }
        }
        return null;
    };

    const checkTie = () => {
        return !board.includes(null);
    }

    return { gameState, moves, update, checkWin, checkTie, reset, };
})();

const DisplayController = (() =>  {
    
    const Computer = () => Player('computer', 'O');

    const endGame = () => {
        const squares = document.getElementById('grid').children;
        for(let i=0; i<squares.length; i++) {
            squares[i].removeEventListener('click', onClick);
        }
    };

    /*
    questions:
    
    mostly done:
    how make event handler accessible for removal as well?
    center the x's and o's?
    tie game notification ... ? how display on screen?
    end game after either player selects square instead of waiting?
    
    not done:
    should display have a copy of the board ... ?
    display name of winner?
    let players choose sides?
    mini-max algorithm?
    */
    const startGame = () => {
        const squares = document.getElementById('grid').children;
        Board.reset();
        for(let i=0; i<squares.length; i++) {
            squares[i].addEventListener('click', onClick);
            squares[i].textContent = '';
        }
        document.getElementById('result').textContent = '';
    };

    const onClick = (e) => {
        if(!Board.checkWin() && !Board.checkTie()) {
            Board.update('X', e.target.id);
            render(Board);
        }
        if(!Board.checkWin() && !Board.checkTie()) {
            Computer().makeMove(Board);
            render(Board);
        }
    };

    const render = (board) => {
        for(let i=0; i<board.gameState().length; i++) {
            document.getElementById(i).textContent = 
                (board.gameState()[i] == null) ? '' : board.gameState()[i];
        }
        const winner = board.checkWin();
        if(winner != null) {
            document.getElementById('result').textContent = winner + ' wins!';
            endGame();
        }
        if(board.checkTie()) {
            document.getElementById('result').textContent = 'tie game!';
            endGame();
        }
    };

    return { startGame, };

})();

document.getElementById('restart').addEventListener('click', function(e) {
    DisplayController.startGame();
})

DisplayController.startGame();