import React from 'react';

const MeetingView = ({ meetingData }) => {

    return (
        <>
            <h1>{meetingData["meeting_name"]}</h1>
        </>
    )
}

export default MeetingView;