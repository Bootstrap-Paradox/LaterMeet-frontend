import React from 'react';


const InlineBlock = (props) => {
    return (
        <div className="box block">
            <h4 className="faded">{props.placeholder}</h4>
            <h4>{props.value}</h4>
        </div>
    )
}

export { InlineBlock };