import React from 'react';
import useFetch from '../../Hooks/useFetch';

const MeetingDisplay = () => {

    const { data: meetings, loading: meetingsLoading, error: meetingsError } = useFetch({ url: "http://0.0.0.0:8001/meetings/" })

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
                                <div key={index} className="display-tile">
                                    <span>{meeting.meeting_name}</span>
                                    <span>12</span>

                                </div>
                            )
                        })}
                    </section>
                </section>
            }
        </>
    )
}

export default MeetingDisplay;