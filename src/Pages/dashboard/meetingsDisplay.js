import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import useFetch from '../../Hooks/useFetch';
import { SuperContext } from './dashboardHome';
import { baseURL } from '../../url';
import { Link } from 'react-router-dom';

const MeetingDisplay = () => {
    const { superState, superDispatch } = useContext(SuperContext);
    const [redirect, setRedirect] = useState(false);
    const history = useHistory()

    const { data: meetings, loading: meetingsLoading, error: meetingsError } = useFetch({ url: `${baseURL}/meetings/` })

    useEffect(() => {
        // if (redirect) return <Redirect to="/d/#view" />
        setRedirect(false);
    }, [redirect])

    useEffect(() => {
        if (meetingsError && meetingsError.status === 404) {
            history.push("/d/new")
        }
    }, [meetingsError])

    return (
        <>
            {meetingsError && <p>{meetingsError.status}</p>}
            {meetingsLoading && <p>Loading</p>}
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
                                    <span>{meeting.meeting_name}</span>
                                    <span>{meeting.meeting_views}</span>

                                </div>
                            )
                        })}
                    </section>
                    <button className="btn btn-secondary btn-long-xl" onClick={() => {
                        history.push("/d/new")
                    }}>New Meeting</button>
                </section>
            }
        </>
    )
}

export default MeetingDisplay;