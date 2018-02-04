import React from 'react';

const CheckButton = (props) => {

    let isDisabled = (props) => {
        return props.selectedNumbers.length === 0;
    }

    let button;
    switch (props.isAnswerCorrect) {
        case true:
            button = <button className="btn check-button" style={{background: "green"}}>
                        <i className="fa fa-check fa-2x" aria-hidden="true"
                        onClick={props.playNextRound}></i></button>;
            break;
        case false:
            button = <button className="btn check-button" style={{background: "red"}}>
                        <i className="fa fa-times fa-2x" aria-hidden="true"
                        onClick={props.playNextRound}></i></button>;
            break;
        default:
            button = <button className="btn check-button"
                disabled={isDisabled(props)} onClick={props.checkAnswer}>Check</button>
    }
    return (
        <div>
            {button}
        </div>
    );
}

export default CheckButton;