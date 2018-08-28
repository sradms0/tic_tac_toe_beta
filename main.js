#!/usr/bin/env node

const prompt = require('readline-sync');
const process = require('process')
const ai = require('./ai');
const Board = require('./Board');
const Player = require('./Player');

let p2;
if (process.argv.length > 2) {
    const arg = process.argv[2];
    if (arg === 'ai') p2 = process.argv[2];
}

const board = new Board([new Player(1, 'X'), new Player(2, 'O', p2)]);
board.initiate();

let answer;
while (!board.isTerminal) {
    console.clear();
    board.display();
    if (board.currentPlayer.type === 'human') {
        answer = prompt.question(`Player ${board.currentPlayer.symbol} > `);

        //validate user input
        if (answer.length !== 2 && isNaN(parseInt(answer))) continue;
        const cellIdx = board.grid.reduce((acc, curr) => {
            if (curr.x === parseInt(answer[0]) && curr.y === parseInt(answer[1])) {
                acc = curr.loc;
            }
            return acc;
        }, -1);

        if (cellIdx > -1) board.setCell(cellIdx);
        else continue;
    } else board.setCell(ai(board));
}
console.clear();
board.display();
console.log(board.outcome);
