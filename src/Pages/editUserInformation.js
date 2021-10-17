import React, { useEffect, useState } from 'react';
import Input from '../Components/input';
import API from '../Logics/request';
import ValueChanged from '../Logics/valueChanged';

const EditUserInformation = ({ userInformation = {}, setFetchedUserInfo = () => { }, setEditUserProfile = () => { } }) => {

    const [newInformation, setNewInformation] = useState(Object.assign({}, userInformation));

    function handleSubmit(e) {
        e.preventDefault();

        if (ValueChanged({ matchFor: newInformation, matchWith: userInformation })) {
            console.log("Value Changed")
            API({ method: "put", endpoint: "user/", data: newInformation }).then((res) => {
                if (res.status === 202) setEditUserProfile(false);
                setFetchedUserInfo(newInformation)
            }).catch((err) => {
                console.log(err)
            })

        } else setEditUserProfile(false)


    }

    const onChangeHandle = (e) => {
        if (newInformation.hasOwnProperty(e.target.name)) setNewInformation({ ...newInformation, [e.target.name]: e.target.value })
    }

    return (
        <>
            <section className="meeting-display">

                <div className="greetings">
                    <h1>Edit Profile</h1>
                    <div className="profile"><img /></div>

                </div>
                {/* <section className="inputs"> */}
                <form onSubmit={handleSubmit} action="" method="put">
                    <Input name="firstName" value={`${newInformation["firstName"]}`} placeholder="First Name" onChange={onChangeHandle} />
                    <Input name="lastName" value={`${newInformation["lastName"]}`} placeholder="Last Name" onChange={(e) => {
                        if (newInformation.hasOwnProperty(e.target.name)) newInformation[e.target.name] = e.target.value;

                    }} />

                    <Input name="email" value={newInformation["email"]} placeholder="Email" onChange={(e) => {
                        if (newInformation.hasOwnProperty(e.target.name)) newInformation[e.target.name] = e.target.value;

                    }} />
                    <button className="btn btn-primary btn-long-xl">Save Profile</button>
                </form>
                {/* </section> */}
            </section>
        </>
    )
}

export default EditUserInformation;