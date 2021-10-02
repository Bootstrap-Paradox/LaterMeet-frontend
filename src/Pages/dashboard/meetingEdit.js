import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { SuperContext } from './dashboardHome';
import axios from 'axios';
import { getCookie } from '../../Logics/cookies';
import { generateRef, uploadBytes } from '../../Logics/firebase';


const MeetingEdit = ({ CreateMeeting = false }) => {

    const { superState, superDispatch } = useContext(SuperContext);
    const history = useHistory();

    const [uploadVideo, setUploadVideo] = useState('');

    const [meetingInfo, setMeetingInfo] = useState(CreateMeeting ?
        {
            meeting_name: "",
            meeting_description: "",
            meeting_timings: [],
            meeting_url: "",
        }
        : superState.meetingData)

    if (Object.keys(superState.meetingData).length === 0 && !CreateMeeting) history.push("/d/h")


    function uploadData(e) {
        e.preventDefault();
        // Logic for Post and Put
        // Axios Request 
        const access_token = getCookie("access_token");
        console.log(access_token)

        const token = `BEARER ${access_token}`

        if (CreateMeeting) {
            axios.post(
                "http://0.0.0.0:8001/meetings/",
                meetingInfo,
                {
                    headers: {
                        authorization: token
                    }
                }
            ).then(res => {
                console.log("What is going on here")
                history.push("/d/h");

            }).catch(err => {
                console.log(err)
                // Display Error 
            })
        }
        else {

            var updateChanges = false;

            Object.keys(meetingInfo).map((key) => {
                if (meetingInfo[key] !== superState.meetingData[key]) updateChanges = true
            })
            if (!updateChanges) history.push("/d/h")
            else {
                const finalData = meetingInfo;
                delete finalData["meeting_hosts"]
                delete finalData["meeting_speakers"]
                axios.put(
                    `http://0.0.0.0:8001/meetings/${meetingInfo["_id"]}`,
                    meetingInfo,
                    { headers: { authorization: token } }
                ).then(res => {
                    history.push("/d/h");
                }).catch(err => {
                    // Display Error
                })

            }

        }



    }


    return (
        <>
            <section className="meeting-edit">

                <form action="" onSubmit={() => {
                }} >
                    <MeetingEditInput placeholder="Meeting Name" fieldData={["meeting_name", meetingInfo["meeting_name"]]} setMeetingInfo={setMeetingInfo} />
                    <MeetingEditInput placeholder="Meeting Url" fieldData={["meeting_url", meetingInfo["meeting_url"]]} setMeetingInfo={setMeetingInfo} />
                    <input type="file" onChange={(e) => {
                        e.preventDefault();
                        setUploadVideo(e.target.files[0]);
                    }} />
                    <button onClick={(e) => {
                        e.preventDefault();
                        uploadBytes(generateRef(uploadVideo.name), uploadVideo).then((snapShot) => {
                            uploadData(e)
                        }).catch((err) => {
                            console.log(err);
                            alert("Upload Unsuccessful");
                        })
                    }}>Upload Media</button>
                    <MeetingEditTextArea placeholder="Description" fieldData={["meeting_description", meetingInfo["meeting_description"]]} setMeetingInfo={setMeetingInfo} />
                    <button onClick={uploadData} className="btn btn-secondary btn-long-xl">{CreateMeeting ? "Create Meeting" : "Save Meeting"}</button>
                </form>

            </section>
        </>
    )
}

const MeetingEditInput = ({ placeholder = "", fieldData = [], setMeetingInfo }) => {

    const [value, setValue] = useState(fieldData[1] ? fieldData[1] : "")
    return (
        <div className="form-group">
            <input className="form-control" onChange={(e) => {
                setMeetingInfo((prevState) => {
                    return {
                        ...prevState,
                        [e.target.name]: e.target.value,
                    }
                })
                setValue(e.target.value)
            }} name={fieldData[0]} value={value} id={placeholder} type="text" placeholder={[placeholder]} />
            <label htmlFor={placeholder} className="form-label">{placeholder}</label>
        </div>
    )
}

const MeetingEditTextArea = ({ placeholder = "", fieldData = [], setMeetingInfo }) => {

    const [value, setValue] = useState(fieldData[1] ? fieldData[1] : "")
    return (
        <>

            <div className="view-box box">
                <h5><span>{placeholder}</span></h5>

                <textarea className="form-control data" onChange={(e) => {
                    setMeetingInfo((prevState) => {
                        return {
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }
                    })
                    setValue(e.target.value)
                }} name={fieldData[0]} value={value} id={placeholder} type="text" placeholder={[placeholder]} />
            </div>

        </>
    )
}

export default MeetingEdit;