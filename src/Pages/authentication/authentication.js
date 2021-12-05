import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar';
import { useHistory } from 'react-router';
import API from '../../Logics/request';
import { setToken } from '../../Logics/token';
import { ModalContext } from '../../App';
import regex from '../../Logics/regex';

const Authentication = (
    {
        title = "Auth",
        description = "",
        inputs = null,
        apiEndpoint = ""
    }
) => {



    const { modalState, modalDispatch } = useContext(ModalContext);

    const [check, setCheck] = useState({});

    const history = useHistory();

    if (!inputs) {
        throw new Error("Error")
    }

    const [reqData, setReqData] = useState({});

    async function onHandleSubmit(e) {
        e.preventDefault()
        if (!regex({ checkFor: reqData["email"], check: "email" })) {
            modalDispatch({ type: "SHOW_MODAL", payload: { id: new Date().toString(), title: "Authentication Error", msg: "Email Invalid", status: "danger", pop: true } })
            return false

        }
        if ((reqData.hasOwnProperty("password") && reqData.hasOwnProperty("confirmPassword")) && (
            reqData["password"] !== reqData["confirmPassword"]
        )) {
            // do Something to abort Auth
            modalDispatch({ type: "SHOW_MODAL", payload: { id: new Date().toString(), title: "Authentication Error", msg: "Passwords Don't Match", status: "danger", pop: true } })
            return false
        }

        if (reqData.hasOwnProperty("password") && reqData["password"] === "") {
            modalDispatch({ type: "SHOW_MODAL", payload: { id: new Date().toString(), title: "Authentication Error", msg: "Passwords Cannot be Empty", status: "info", pop: true } })
            return false

        }
        API({ method: "post", endpoint: apiEndpoint, data: reqData }).then(res => {
            if (apiEndpoint === "signup") history.push("/confirmation")
            if (res.data.hasOwnProperty("access_token")) {
                setToken({ tokenData: res.data })
            }
            if (apiEndpoint === "login") history.push("/")
            // else history.push("") TODO: Enter Code
        }).catch(err => {
            // console.log(err.response.data)
            modalDispatch({ type: "SHOW_MODAL", payload: { id: new Date().toString(), title: "Authentication Error", msg: err.response.data["message"], status: "danger", pop: true } })

            return false
        })
    }

    return (
        <>

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
                            <>
                                <div key={index} className="form-group">
                                    <input id={`input-${index}`} value={localValue ? val : value} onChange={
                                        (e) => {
                                            e.preventDefault()
                                            if (localValue) {
                                                setVal(e.target.value)
                                                setReqData({ ...reqData, ...{ [data.name]: e.target.value } })
                                            }
                                            else {
                                                if (key === "Password") {
                                                    setCheck(regex({ checkFor: e.target.value, check: 'password' }))
                                                }
                                                setValue(e.target.value)
                                                setReqData({ ...reqData, ...{ [e.target.name]: e.target.value } })
                                            }
                                        }
                                    } name={data.name} type={data.hasOwnProperty("type") ? data.type : "text"} placeholder={key} className="form-control" />
                                    <label htmlFor={`input-${index}`} className="form-label">{key}</label>
                                    {inputs.hasOwnProperty("Confirm Password") && inputs.hasOwnProperty("Password") && key === "Password" && <PasswordSpecifier passwordData={check} />}
                                </div>
                            </>
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

const PasswordSpecifier = ({ passwordData = {} }) => {
    return (
        <>
            {passwordData["value"] > 0 &&
                <div className={`meter-${passwordData["type"]}`}>
                    <p style={
                        {
                            fontWeight: "bold"
                        }
                    }>{passwordData["type"]}</p>
                    <meter value={passwordData["value"]} min={0} max={100} />
                </div>
            }
        </>
    )
}

export default Authentication;