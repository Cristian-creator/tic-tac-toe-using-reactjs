import React, { Component } from 'react'
import Board from './components/Board/Board'
import GameInfo from './components/GameInfo/GameInfo'

import './Game.css';

export default class Game extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            currentMove: 0,
            xIsNext: true,
            history: [
                {  squares: new Array(9).fill(null) }
            ]
        }
    }

    checkWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for(let i = 0;i < lines.length;i++) {
            const [a, b, c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) return true;
        }
    }

    // function also used for handling clicks after returning to a certain move 
    clickHandler(index) {
        let { history, currentMove, xIsNext } = this.state;
        // slicing history according to currentMove for cases when user decides to return to a certain move
        history = history.slice(0, currentMove + 1);               // add 1 because, initially, history has 1 element
        const newSquares = [...history[currentMove].squares];  // get current squares
        
        // check if square is already marked or game is finished
        if(newSquares[index] || this.checkWinner(newSquares)) return;
        
        newSquares[index] = xIsNext ? 'X' : 'O';                   // update

        this.setState({
            currentMove: currentMove + 1,
            xIsNext: !xIsNext,
            history: [...history, { squares: newSquares }]
        });
        
    }

    returnToMove(index) {
        const history = this.state.history.slice(0, index + 1); // add 1 because, initially, history has 1 element
        
        this.setState({
            history,
            currentMove: index,
            xIsNext: index % 2 ? false : true
        })
    }

    render() {
        const { history, currentMove, xIsNext } = this.state;
        const status = this.checkWinner([...history[currentMove].squares]) ? `Winner is ${xIsNext ? 'O' : 'X'}` : `Next player: ${xIsNext ? 'X' : 'O'} `;
        return (
            <div className="game">
                <header>
                    Tic - Tac -Toe
                </header>
                <div className="game-container">
                    <Board squares={history[currentMove].squares} clickHandler={(index) => this.clickHandler(index)} />
                    <GameInfo status={status} history={history} returnToMove={(index) => this.returnToMove(index)} />
                </div>
            </div>
        )
    }
}
