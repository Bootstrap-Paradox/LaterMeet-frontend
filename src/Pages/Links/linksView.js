import React from 'react';

import image from '../../Static/Images/happy_girl.jpg';

const LinkView = () => {

    return (
        <>
            <section className="link-view">
                <ProfileBox />
                <UserName />
                <LinkBox />

            </section>
        </>
    )

}


const ProfileBox = () => {
    return (
        <>
            <div className="profile-link-view">
                <img style={{
                    maxHeight: "125px",
                }} src={image} alt="" />
            </div>
        </>
    )
}

const UserName = ({ username = "" }) => {
    return (
        <>
            <h4 className="username">@sidkuchnure</h4>
        </>
    )
}

const LinkBox = () => {
    return (
        <section className="link-box">
            <LinkButton text="Free Marketing E-book" />
            <LinkButton text="Subscribe" />
        </section>
    )
}

const LinkButton = ({ text = "" }) => {
    return (
        <button className="link-btn">{text}</button>
    )
}

export default LinkView;