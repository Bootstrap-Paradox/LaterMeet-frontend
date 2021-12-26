import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import useFetch from '../../Hooks/useFetch';
import { SuperContext } from './dashboardHome';
import { baseURL } from '../../url';
import { Link } from 'react-router-dom';
import Loaders from '../../Components/loader';
import { ModalContext } from '../../App';

const MeetingDisplay = () => {
    const { superState, superDispatch } = useContext(SuperContext);
    const { modalState, modalDispatch } = useContext(ModalContext);
    const [redirect, setRedirect] = useState(false);
    const history = useHistory()

    const { data: meetings, loading: meetingsLoading, error: meetingsError } = useFetch({ url: `${baseURL}/meetings/` })

    useEffect(() => {
        // if (redirect) return <Redirect to="/d/#view" />
        setRedirect(false);
    }, [redirect])

    useEffect(() => {
        if (meetingsError) {
            history.push("/d/new")
        }
    }, [meetingsError])

    return (
        <>
            {meetingsError && <p>{meetingsError.status}</p>}
            {meetingsLoading && <Loaders />}
            {
                meetings &&
                <section className="meeting-display">
                    <div className="greetings">
                        <h1>Hello <span>{meetings["request_name"].split(" ")[0]}</span>!</h1>
                        <Link to="/d/user"><div className="profile"><img /></div></Link>

                    </div>

                    <section>
                        <span>Current Meetings</span>
                        {meetings["meetings"].map((meeting, index) => {
                            return (
                                <div key={index} onClick={() => {
                                    superDispatch({ type: "SET-MEETING", payload: { meetingData: meeting } })
                                    history.push("/d/view")

                                }} className="display-tile">
                                    <span className="display-tile-title">{meeting.meeting_name}</span>
                                    <span style={{ color: "#CECECE", fontWeight: "bold", textAlign: "end" }} >{meeting.meeting_views}</span>


                                </div>
                            )
                        })}
                    </section>
                    <button className="btn btn-secondary btn-long-xl" onClick={() => {
                        // Check for Meetings Limit

                        if (meetings["meetings"].length < 3) {
                            history.push("/d/new")
                        } else {

                            modalDispatch({ type: "SHOW_MODAL", payload: { id: new Date().toString(), title: "Meeting Limit", msg: "Meetings Limit Reached", status: "warning", pop: true } })
                        }

                    }}>New Meeting</button>
                </section>
            }
        </>
    )
}

export default MeetingDisplay;