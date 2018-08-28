const sort = type => {
    if (type === 'ascending') {
        return (a, b) => {
            if (a.minimax < b.minimax) return -1;
            else if (a.minimax > b.minimax) return 1;
            return 0;
        }
    } else {
        return (a, b) => {
            if (a.minimax > b.minimax) return -1;
            else if (a.minimax < b.minimax) return 1;
            return 0;
        }
    }
}

const score = board => {
    if (board.winner === 'human') return 10;
    else if (board.winner === 'ai') return -10;
    else return 0;
}

const minimax = board => {
    if (board.isTerminal) return score(board);
    let boardScore = 0;
    
    if (board.currentPlayer.type === 'human') boardScore = -1000;
    else boardScore = 1000;

    const availableMoves = board.availableCells();
    const availableNextBoards = availableMoves.map(move => {
        const nextBoard = board.newState();
        nextBoard.setCell(move.loc);
        return nextBoard;
    })
    availableNextBoards.forEach(nextBoard => {
        const nextScore = minimax(nextBoard);
        if(board.currentPlayer.type === 'human') {
            if (nextScore > boardScore) boardScore = nextScore;
        } else {
            if (nextScore < boardScore) boardScore = nextScore;
        }
    });
    return boardScore;
}

const optimalMove = board => {
    const availableMoves = board.availableCells()
        .map(move => {
            const nextBoard = board.newState();
            nextBoard.setCell(move.loc);

            move.minimax = minimax(nextBoard);
            return move;
        });

    if (board.currentPlayer.type === 'human') availableMoves.sort(sort('descending'));
    else availableMoves.sort(sort('ascending'));
    return availableMoves[0].loc;
}

module.exports = optimalMove;

