import React from 'react';
import leave from '../../Static/Images/LEAVE.svg';


const LeavePage = () => {

    return (
        <>
            <Block title="You Left" Image={leave} />
        </>
    )
}

const Block = ({ title = "", description = "", Image = "", buttons = [] }) => {

    return (
        <>
            <section className="block-component">
                <div className="info">
                    <h1>{title}</h1>

                </div>
                <div className="img">
                    <img src={Image} alt="Person leave through door" />
                </div>
            </section>
        </>
    )
}

export default LeavePage;