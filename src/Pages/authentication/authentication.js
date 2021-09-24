import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/NavBar';
import axios from 'axios';
import { useHistory } from 'react-router';

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
    console.log(reqData)

    async function onHandleSubmit(e) {
        if ((reqData.hasOwnProperty("password") && reqData.hasOwnProperty("confirmPassword")) && (
            reqData["password"] !== reqData["confirmPassword"] || reqData["password"] === "" || reqData["confirmPassword"] === ""
        )) {
            // do Something to abort Auth
            return false
        }

        await axios.post(
            `http://0.0.0.0:8001/${apiEndpoint}`,
            reqData,
            { validateStatus: false },
        ).then((res) => {
            history.push("/")
            return res.data
        }).catch((err) => {
            return err.response.status
        })



    }

    return (
        <>
            <NavBar />
            <h1 className="title">{title}</h1>
            <p className="description">{description}</p>

            <section className="inputs">
                <form action="#" method="post">
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
                    <button onClick={(e) => {
                        e.preventDefault()
                        const output = onHandleSubmit()
                        console.log(output)
                    }} className="btn btn-primary btn-long">Sign Up</button>
                </form>
            </section>
        </>
    )
}

export default Authentication;