const Board = (() =>  {
    const board = [null, null, null, null, null, null, null, null, null,];
    const gameState = () => board;
    const update = (selection, position) => {
        if (board[position] != null) {
            alert('invalid move');
        }
        board[position] = selection;
    };
    const checkWin = () => {
        // what is winning condition?
    };

    return { gameState, update, };
})();

const Display = (() =>  {
    
    
    const render = (board) => {
        for(let i=0; i<board.gameState().length; i++) {
            document.getElementById(i).textContent = (board.gameState()[i] == null) ? '' : board.gameState()[i];
        }
    };
    return { render, };
})();

const Player = (name, side) => {
    const getName = () => name;
    const getSide = () => side;
    const makeMove = () => {

    };
    return { getName, getSide, makeMove, };

};

const squares = document.getElementById('grid').children;
for(let i=0; i<squares.length; i++) {
    squares[i].addEventListener('click', function(e) {
        // check grid if null? only then update?
        Board.update('X', e.target.id);
        Display.render(Board);
    });        
}