import React from 'react'
import Square from '../Square/Square'

export default function Board({ squares, clickHandler }) {
    return (
        <div className="board-container">
            {
                squares && squares.map((square, index) => 
                    <Square
                    key={index} 
                    value={square} 
                    index={index} 
                    clickHandler={(index) => clickHandler(index)} 
                    />)
            }
        </div>
    )
}
