import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { SuperContext } from './dashboardHome';
import { uploadFirebase } from '../../Logics/firebase';
import API from '../../Logics/request';
import { TimingComponent } from '../../Components/components';





const MeetingEdit = ({ CreateMeeting = false }) => {

    const [uploadProgress, setUploadProgress] = useState(0);

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


    function uploadData() {
        // e.preventDefault();
        // Logic for Post and Put
        // Axios Request 
        const requestData = meetingInfo

        if (CreateMeeting) {
            API({ method: "post", endpoint: "meetings/", data: meetingInfo }).then(res => {
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
                const finalData = requestData;
                delete finalData["meeting_hosts"]
                delete finalData["meeting_speakers"]
                delete finalData["meeting_views"]
                API({ method: "put", endpoint: `meetings/${superState.meetingData["_id"]}`, data: meetingInfo }).then(res => {
                    history.push("/d/h");
                }).catch(err => {
                    // Display Error
                })

            }

        }



    }

    // useEffect(() => {
    //     console.log(meetingInfo)
    // })

    useEffect(() => {
        if (!CreateMeeting && meetingInfo.meeting_url !== undefined && meetingInfo.meeting_url !== superState.meetingData.meeting_url) {
            uploadData()
        }
    }, [meetingInfo.meeting_url])

    return (
        <>
            <section className="meeting-edit">

                <form action="" onSubmit={() => {
                }} >
                    <MeetingEditInput placeholder="Meeting Name" fieldData={["meeting_name", meetingInfo["meeting_name"]]} setMeetingInfo={setMeetingInfo} />
                    {CreateMeeting || <>
                        <VideoUploadInput setUploadVideo={setUploadVideo} uploadVideo={uploadVideo} setMeetingInfo={setMeetingInfo} uploadProgress={uploadProgress} setUploadProgress={setUploadProgress} meetingInfo={meetingInfo} />
                    </>
                    }
                    <MeetingEditTextArea placeholder="Description" fieldData={["meeting_description", meetingInfo["meeting_description"]]} setMeetingInfo={setMeetingInfo} />
                    {!CreateMeeting && <TimingComponent setMeetingInfo={setMeetingInfo} meetingInfo={meetingInfo} />}
                    <button onClick={(e) => {
                        e.preventDefault();
                        uploadData()
                    }} className="btn btn-secondary btn-long-xl">{CreateMeeting ? "Create Meeting" : "Save Meeting"}</button>
                </form>

            </section>
        </>
    )
}

const VideoUploadInput = ({ setUploadVideo, uploadVideo, setMeetingInfo, uploadProgress, setUploadProgress, meetingInfo, setDownloadUrl }) => {
    return (
        <div className="">

            <label className="file-upload">

                <input type="file" onChange={(e) => {
                    e.preventDefault();
                    setUploadVideo(e.target.files[0]);
                }} />
                <span>{uploadVideo ? ellipseText(uploadVideo.name) : "Choose File"}</span>
                <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); setUploadVideo('') }}>X</button>
            </label>

            {uploadProgress > 0 && <span className="percent"><p>{`${uploadProgress.toFixed(2)}%`}</p></span>}

            <button className="btn btn-secondary" onClick={async (e) => {
                e.preventDefault();
                uploadFirebase({ fileName: meetingInfo["_id"], uploadFile: uploadVideo, setUploadProgress, setMeetingInfo }).then((url) => {
                    setMeetingInfo((prevState) => {
                        return {
                            ...prevState,
                            meeting_url: url
                        }
                    })

                })
            }}>Upload</button>
        </div>
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

const ellipseText = (name) => {
    return name.length < 15 ? name : `${name.split("").filter((val, index) => index < 14).join("")}...`
}

export default MeetingEdit;