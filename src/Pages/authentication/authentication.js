import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { setCookie } from '../../Logics/cookies';
import API from '../../Logics/request';
import { setToken } from '../../Logics/token';

const Authentication = (
    {
        title = "Auth",
        description = "",
        inputs = null,
        apiEndpoint = ""
    }
) => {

    const history = useHistory();

    if (!inputs) {
        throw new Error("Error")
    }

    const [reqData, setReqData] = useState({});

    async function onHandleSubmit(e) {
        e.preventDefault()
        if ((reqData.hasOwnProperty("password") && reqData.hasOwnProperty("confirmPassword")) && (
            reqData["password"] !== reqData["confirmPassword"] || reqData["password"] === "" || reqData["confirmPassword"] === ""
        )) {
            // do Something to abort Auth
            return false
        }

        if (reqData.hasOwnProperty("password") && reqData["password"] === "") return false
        API({ method: "post", endpoint: apiEndpoint, data: reqData }).then(res => {
            if (apiEndpoint === "signup") history.push("/confirmation")
            if (res.data.hasOwnProperty("access_token")) {
                setToken({ tokenData: res.data })
            }
            if (apiEndpoint === "login") history.push("/")
            // else history.push("") TODO: Enter Code
        }).catch(err => {
            return false
        })



    }

    return (
        <>
            <NavBar />
            <h1 className="title">{title}</h1>
            <p className="description">{description}</p>

            <section className="inputs">
                <form action="" method="post">
                    {Object.entries(inputs).map(function Input([key, data], index) {
                        const localValue = data.hasOwnProperty("localValue");

                        // const [value, setValue] = useState("")

                        if (localValue) {
                            var [val, setVal] = data.localValue[0](data.localValue[1], data.localValue[2]);

                        }
                        var [value, setValue] = useState("");
                        useEffect(() => {
                            if (localValue) {
                                setReqData((prevState) => {
                                    return { ...prevState, ...{ [data.name]: val } }
                                })
                            } else {
                                setReqData((prevState) => {
                                    return { ...prevState, ...{ [data.name]: value } }
                                })
                            }

                        }, [val, value])
                        return (
                            <div key={index} className="form-group">
                                <input id={`input-${index}`} value={localValue ? val : value} onChange={
                                    (e) => {
                                        e.preventDefault()
                                        if (localValue) {
                                            setVal(e.target.value)
                                            setReqData({ ...reqData, ...{ [data.name]: e.target.value } })
                                        }
                                        else {
                                            setValue(e.target.value)
                                            setReqData({ ...reqData, ...{ [e.target.name]: e.target.value } })
                                        }
                                    }
                                } name={data.name} type={data.hasOwnProperty("type") ? data.type : "text"} placeholder={key} className="form-control" />
                                <label htmlFor={`input-${index}`} className="form-label">{key}</label>
                            </div>
                        )
                    })}
                    <button onClick={onHandleSubmit} className="btn btn-primary btn-long">Sign Up</button>

                    <p className="switch">{
                        apiEndpoint === "login" ?
                            <span>Not a user ? <a href="/signup">SignUp</a> </span> :
                            <span>Aready a user? <a href="/login" >Login</a></span>
                    }</p>
                </form>
            </section>
        </>
    )
}

export default Authentication;