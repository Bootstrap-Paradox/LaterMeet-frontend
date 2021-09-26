import React, { useContext, useEffect, useState } from 'react';
import useLocalStorage from '../../Hooks/useLocalStorage';
import { SuperContext } from './dashboardHome';

const MeetingView = () => {

    const { superState, superDispatch } = useContext(SuperContext)

    let meetingData = superState.meetingData;




    return (
        <>
            <h1>{meetingData["meeting_name"]}</h1>
        </>
    )
}

export default MeetingView;