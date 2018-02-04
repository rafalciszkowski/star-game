import React from 'react';
import Number from './Number.js';
import _ from 'underscore';

const NumberList = (props) => {

    let arrayOfNumbers = _.range(1,10);

    return (
        <div>
            {arrayOfNumbers.map((elem, i) => {
                return (
                    <Number value={elem} key={i} 
                            selectNumber={props.selectNumber} 
                            selectedNumbers={props.selectedNumbers}
                            unselectNumber={props.unselectNumber}
                            usedNumbers={props.usedNumbers} />
                )
            })
            }
        </div>
    )
}

export default NumberList;