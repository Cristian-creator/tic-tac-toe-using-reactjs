import React from 'react'

export default function Square({ value, clickHandler, index }) {
    return (
        <div className="square" onClick={() =>  clickHandler(index)} >
            { value }
        </div>
    )
}
