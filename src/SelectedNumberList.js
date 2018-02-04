import React from 'react';

const SelectedNumberList = (props) => {
    return (
        <div>
            {props.selectedNumbers.map((elem, i) => {
                return (
                    <span className="number" key={i} onClick={() => props.unselectNumber(elem)}>{elem}</span>
                )
            })}
        </div>
    )
}

export default SelectedNumberList;