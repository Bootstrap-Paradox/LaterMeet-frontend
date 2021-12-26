import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { SuperContext } from './dashboardHome';
import share from '../../Static/Images/share.svg';
import Share from '../../Logics/share';
import { Timing } from '../../Components/components';
import { ModalContext } from '../../App';

const MeetingView = () => {

    const { superState, superDispatch } = useContext(SuperContext)
    const { modalState, modalDispatch, confirmModalState, confirmModalDispatch } = useContext(ModalContext)
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
                        {console.log(meetingData["meeting_timings"])}
                        {meetingData["meeting_timings"]["schedule"] ?
                            <MeetingTiming meetingData={meetingData["meeting_timings"]} />
                            :
                            <h3 className="light-tip">On Join Load</h3>
                        }
                    </div>
                    <button className="btn btn-secondary btn-long-xl" onClick={() => { history.push("/d/edit") }}>Edit Meeting</button>
                    <button className="btn btn-secondary btn-long-xl" style={{
                        backgroundColor: "#F01D1D",
                        marginTop: "1rem",
                        marginBottom: "1rem"
                    }} onClick={() => {
                        confirmModalDispatch({
                            type: "CONFIRM",
                            payload: {
                                title: "Discard",
                                description: "The Meeting will be Permanently Deleted and Cannot be Accessed",
                                confirm: () => {
                                    console.log("hello There")
                                    confirmModalDispatch({ type: "EXIT" })
                                },
                                type: "danger",
                            }
                        })
                    }}>Delete Meeting</button>
                    <div className="floating-icon" onClick={async () => {
                        // navigator.clipboard.writeText(`https://latermeet.com/jn/${meetingData["_id"]}`)
                        const shareData = {
                            title: "LaterMeet",
                            text: "You are Invited 🎉!\n\nClick on the Link below to Join",
                            url: `https://latermeet.com/jn/${meetingData["_id"]}`
                        }
                        Share({ shareData: shareData });


                    }}>
                        <img src={share} alt="Share Icon" />
                    </div>
                </section>
            }
        </>
    )
}

function MeetingTiming({ meetingData }) {
    const timing = new Timing({ meta_data: meetingData }).toHumanString()
    return (
        <>
            <div className="box-tile-block">

                <h4 className='placeholder'>Start Date</h4>
                <h4>{timing["start_date"]}</h4>
            </div>
            <div className="box-tile-block">

                <h4 className='placeholder'>End Date</h4>
                <h4>{timing["end_date"]}</h4>
            </div>
        </>
    )
}

export default MeetingView;