import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { SuperContext } from './dashboardHome';

const MeetingView = () => {

    const { superState, superDispatch } = useContext(SuperContext)
    const history = useHistory()

    let meetingData = superState.meetingData;

    if (Object.keys(superState.meetingData).length === 0) history.push("/d/h")


    return (
        <>
            {Object.keys(meetingData).length > 0 &&
                <section className="meeting-view">

                    <h1 className="title">{meetingData["meeting_name"]}</h1>
                    <div style={{ height: "208px" }} className="box view-box">
                        <h5><span>Description</span></h5>
                        <p className='data'>{meetingData["meeting_description"]}</p>
                    </div>
                    <div style={{ height: "208px" }} className="box view-box">
                        <h5><span>Timings</span></h5>
                        {meetingData["meeting_timings"].length > 0 ? meetingData["meeting_timings"].map(
                            (timing, index) => {
                                return (
                                    <div key={index} className="box-tile">{timing}</div>
                                )

                            }
                        ) :
                            <h3 className="light-tip">On Join Load</h3>
                        }
                    </div>
                    <button className="btn btn-secondary btn-long-xl" onClick={() => { history.push("/d/edit") }}>Edit Meeting</button>
                </section>
            }
        </>
    )
}

export default MeetingView;