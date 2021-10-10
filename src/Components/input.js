import React, { useState } from 'react';

const Input = (props) => {

    function checkProp(checkFor) {
        return props.hasOwnProperty(checkFor);
    }

    const [value, setValue] = useState("");

    return (
        <div className="form-group">
            <input id={`input-${props.name}`} type={checkProp("type") ? props.type : "text"} name={props.name} value={props.hasOwnProperty("value") ? props.value : value} onChange={(e) => {
                e.preventDefault();
                if (checkProp("onChange")) props.onChange(e)
                setValue(e.target.value)
            }} className="form-control" />
            <label htmlFor={`input-${props.name}`} className="form-label"></label>
        </div>
    )
}

export default Input;