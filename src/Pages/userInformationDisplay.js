import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import useFetch from '../Hooks/useFetch';
import { url } from '../url';
import EditUserInformation from './editUserInformation';


const UserInformationDisplay = () => {

    const history = useHistory()

    const [editUserProfile, setEditUserProfile] = useState(false);

    const { data: userInformation, loading: userInformationLoading, error: userInformtionError } = useFetch({ url: `http://${url}:8001/user/` })

    if (editUserProfile) {
        return (<EditUserInformation userInformation={userInformation} setEditUserProfile={setEditUserProfile} />)
    }

    return (
        <>
            <section className="meeting-display">
                <div className="greetings">
                    <h1>User Profile</h1>
                    <div className="profile"><img /></div>

                </div>
                {userInformation &&
                    <section>
                        <InlineBlock placeholder="First Name" value={`${userInformation["firstName"]} ${userInformation["lastName"]}`} />
                        <InlineBlock placeholder="Email" value={userInformation["email"]} />

                    </section>

                }
                <button className="btn btn-primary btn-long-xl" onClick={(e) => {
                    e.preventDefault();
                    setEditUserProfile(true);


                }}>Edit Profile</button>

            </section>
        </>
    )
}

const InlineBlock = (props) => {
    return (
        <div className="box block">
            <h4 className="faded">{props.placeholder}</h4>
            <h4>{props.value}</h4>
        </div>
    )
}

export default UserInformationDisplay;