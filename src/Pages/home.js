import React from "react";
import { useHistory } from "react-router";

const HomePage = () => {
    const history = useHistory();
    return (
        <>
            <div className="" style={{ textAlign: "center" }}>
                <div className="boundary" style={{ textAlign: 'center' }}><h1>Coming Soon</h1></div>
                <button onClick={() => { history.push("/d/h") }} className="btn btn-primary btn-long-xl" style={{ marginTop: "2rem" }}>Dashboard</button>

            </div>
        </>
    )

}

export default HomePage;