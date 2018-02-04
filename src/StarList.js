import React from 'react';
import Star from './Star.js';
import _ from 'underscore';

const StarList = (props) => {
    return (
        <div>
            {_.range(props.numberOfStars).map((el, i) => {
                return <Star key={i} />
            })}
        </div>
    );
}

export default StarList;