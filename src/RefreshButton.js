import React from 'react';

const RefreshButton = (props) => {

    let isDisabled = (refreshCounter) => {
        return refreshCounter === 0;
    }
    
    return (
         <button className="btn refresh-button" onClick={props.refreshStars} disabled={isDisabled(props.refreshCounter)}>
            <b><i className="fa fa-refresh" aria-hidden="true"></i>{props.refreshCounter}</b>
        </button>
    )
}

export default RefreshButton;