import React from 'react'

export default function GameInfo({ status, history, returnToMove }) {
    return (
        <div className="game-info">
            <h2> { status } </h2>
            <ol className="moves">
                {
                    history.map((item, index) => <li key={index} onClick={() => returnToMove(index)} > Go to {index > 0 ? `move #${index}` : `game start`} </li> )
                }
            </ol> 
        </div>
    )
}
