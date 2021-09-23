import React from 'react';

const BottomBar = ({ data }) => {
    return (
        <div className="bottom-bar">
            <button className="btn btn-secondary btn-long left">Leave</button>
            {data}
        </div>
    )
}

export default BottomBar;