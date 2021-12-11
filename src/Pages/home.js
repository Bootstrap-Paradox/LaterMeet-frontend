import React from "react";
import { useHistory } from "react-router";
import ExpandMore from "../Components/UI/expandMore";
import FakeVideoElement from "../Components/UI/fakeVideoElement";
import HowItWorksBlock from "../Components/UI/howItWorksBlock";
import { EarlyStart } from "../Components/videoElemenet";

const HomePage = () => {
    const history = useHistory();
    return (
        <>
            <section className="section-1">
                <div className="" style={{ textAlign: "center" }}>
                    <FakeVideoElement />
                    <button onClick={() => { history.push("/d/h") }} className="btn btn-primary btn-button" style={{ marginTop: "2rem" }}>Schedule Meet</button>
                    <ExpandMore />
                </div>
            </section>
            <section className="section-2">
                <h1 className="section-heading">Educate While we 🧑‍💻 for you</h1>
                <h1 className="divide">⚙️</h1>
            </section>
            <section className="section-3">

                <h1 className="section-heading">
                    How it Works?
                </h1>
                <HowItWorksBlock title="Create" description="Let people know what are they Signing Up For" logo="✍🏻" />
                <HowItWorksBlock title="Schedule" description="Feel it Live Without Actually being Live" logo="🕗" />
                <HowItWorksBlock title="Upload" description="Let's See What you have In Hold for Us" logo="⬆️" />

            </section>

            <EarlyStart />
        </>
    )

}

export default HomePage;