import React from 'react';
import _ from 'underscore';

const Number = (props) => {

    let addClassName = (props) => {
        if (_.contains(props.selectedNumbers, props.value) || _.contains(props.usedNumbers, props.value)) {
            return "number-selected";
        } else {
            return null;
        }
    }

    let handleOnClick = (props) => {
        if(!_.contains(props.usedNumbers, props.value)) { //dead button
            !_.contains(props.selectedNumbers, props.value) ?
                props.selectNumber(props.value) :
                props.unselectNumber(props.value);
        }
    }

    return (
        <div className={["number", addClassName(props)].join(' ')}
            onClick={() => handleOnClick(props)}>
            <span>
                {props.value}
            </span>
        </div>
    );
}

export default Number;
