import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import useFetch from '../../Hooks/useFetch';
import { SuperContext } from './dashboardHome';

const MeetingDisplay = () => {
    const { superState, superDispatch } = useContext(SuperContext);
    const [redirect, setRedirect] = useState(false);
    const history = useHistory()

    const { data: meetings, loading: meetingsLoading, error: meetingsError } = useFetch({ url: "http://0.0.0.0:8001/meetings/" })

    useEffect(() => {
        // if (redirect) return <Redirect to="/d/#view" />
        setRedirect(false);
    }, [redirect])

    return (
        <>
            {meetingsError && <p>{meetingsError}</p>}
            {meetingsLoading && <p>Loading</p>}
            {
                meetings &&
                <section className="meeting-display">
                    <div className="greetings">
                        <h1>Hello <span>{meetings["request_name"].split(" ")[0]}</span>!</h1>
                        <div className="profile"><img /></div>

                    </div>

                    <section>
                        <span>Current Meetings</span>
                        {meetings["meetings"].map((meeting, index) => {
                            return (
                                <div key={index} onClick={() => {
                                    superDispatch({ type: "SET-MEETING", payload: { meetingData: meeting } })
                                    history.push("/d/view")

                                }} className="display-tile">
                                    <span>{meeting.meeting_name}</span>
                                    <span>12</span>

                                </div>
                            )
                        })}
                    </section>
                    <button className="btn btn-secondary btn-long-xl">New Meeting</button>
                </section>
            }
        </>
    )
}

export default MeetingDisplay;