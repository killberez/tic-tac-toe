import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';

// Calculate winner func without conected DB

async function calculateWinner(cells) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a]
        }
    }
    return null
}

// Calculate winner func with conected DB(At localhost)

// async function calculateWinner(cells) {
//     const lines = await fetch('http://localhost:3000/api/motos').then(function (response) {
//         return response.json();
//     })

//     for (let i = 0; i < lines.name.length; i++) {
//         const [a, b, c] = lines.name[i]
//         if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
//             return cells[a]
//         }
//     }
//     return null
// }

export default class BoardComponent extends Component {
    @tracked board = Array(9).fill(null)
    @tracked xIsNext = true
    @tracked winner = calculateWinner(this.board)

    @action
    playerClick(index) {
        const boardCopy = [...this.board]
        if (this.winner || boardCopy[index]) return null
        boardCopy[index] = this.xIsNext ? 'X' : '0'
        this.board = boardCopy
        this.xIsNext = !this.xIsNext
        if (calculateWinner(this.board) !== null) {
            console.log(`Player ${boardCopy[index]} won!`)
        }
        getData()
    }
}


