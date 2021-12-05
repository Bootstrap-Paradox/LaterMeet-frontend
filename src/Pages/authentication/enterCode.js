import React, { useState } from 'react';
import { useHistory } from 'react-router';
import NavBar from '../../Components/NavBar';
import API from '../../Logics/request';
import { setToken } from '../../Logics/token';

const EnterCode = () => {
    const history = useHistory();
    const [code, setCode] = useState('');
    return (
        <>
            <section >
                <h1 className="title">Confirm</h1>
                <p className="description">One Last Step</p>
                <form className="inputs" method="put" action="">
                    <div className="form-group">
                        <input id="code" onChange={(e) => { setCode(e.target.value) }} name="code" value={code} inputMode="numeric" type="text" placeholder="Code" className="form-control" />
                        <label htmlFor="code" className="form-label">Code</label>
                    </div>
                    <button className="btn btn-secondary btn-long" onClick={
                        (e) => {
                            e.preventDefault()
                            API({
                                method: "put", endpoint: "/signup", data: {
                                    code: code
                                }
                            }).then((res) => {
                                if (setToken({ tokenData: res.data })) {
                                    history.push("/d/h")
                                }
                                else {
                                    history.push("/login");
                                }

                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                    } disabled={code.length >= 6 ? false : true}>Confirm</button>

                    <p className="switch">Already a user?<a href="/login">Login</a></p>
                </form>


            </section>
        </>
    )

}

export default EnterCode;