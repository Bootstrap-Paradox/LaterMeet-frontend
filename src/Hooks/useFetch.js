import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '../Logics/cookies';


// function useMountEffect(func, deps) {
//     const firstMount = useRef(false);

//     useEffect(() => {
//         if (firstMount.current) {
//             func();
//         } else {
//             firstMount.current = true
//         }
//     }, deps)
// }


function useFetch({ url = "", authorized = false, superDispatch = null }) {
    // Fetches data from the Api 
    // Posts Data to the Api
    // const [data, setData] = useState(payload)

    const [redirect, setRedirect] = useState({
        url: "",
        redirect: false
    })


    let history = useHistory();

    // const { notify } = useContext(MessageContext);
    const [notification, setNotification] = useState({});
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);



    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);

        async function fetchOperation({ url = "" }) {

            let auth_headers = {}

            const access_token = getCookie("access_token")
            if (access_token) {
                auth_headers["authorization"] = `Bearer ${access_token}`;
            }

            const source = axios.CancelToken.source()

            axios({
                method: "get",
                url: url,
                headers: auth_headers,
                CancelToken: source.token,
            }).then(res => {
                const newData = res.data
                res.data && setData(newData)
                setLoading(false);

            }).catch(err => {
                setLoading(false)
                if (err.response) {
                    const exists = err.response.data.hasOwnProperty("notify")
                    if (exists) {
                        for (let msg of err.response.data["notify"]) {

                            setNotification({ message: msg.message, status: msg.status })
                        }
                        if (err.response.status === 401) {
                            history.push("/login");

                            return () => { source.cancel() }

                        }

                    }
                    else {
                        if (err.response.status === 401) {
                            // setNotification({ message: "Unauthorized Access", status: "danger" })

                        }
                    }
                }
                console.log(err)

                setError({ msg: err.response.data.msg, status: err.response.status })
            })
            return () => {
                source.cancel()
            }
        };
        fetchOperation({ url: url, authorized: authorized })

    }, [url]);

    // useMountEffect(() => {
    //     notify({ message: notification["message"], status: notification["status"] })
    // }, [notification])



    return { data, loading, error }
}

export default useFetch;