import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useLocalStorage from '../../Hooks/useLocalStorage';

import useFetch from '../../Hooks/useFetch';

// const Description = ({ description }) => {
//     return (
//         <div className="description-card">
//             <p>{description}</p>
//         </div>
//     )
// }



const JoinPage = () => {

    const [videoElement, setVideoElement] = useState(null);
    const [meetingStartTime, setmeetingStartTime] = useLocalStorage("x12", new Date().getTime()); // Time will be locally stored to provide a better Live Experience

    const { meeting_id } = useParams();
    const { data: meetingData, loading: meetingLoading, error: meetingError } = useFetch({ url: `http://0.0.0.0:8001/meetings/join/${meeting_id}` })


    // meetingData && setInterval(() => {
    //     if (videoElement) {
    //         if (meetingStartTime + (videoElement.duration * 1000) <= new Date().getTime()) {
    //             // The Meeting Has Ended
    //             if (videoElement) videoElement.pause();

    //         }

    //     }
    // }, 60 * 1000)

    useEffect(() => {
        setVideoElement(document.getElementById("video-component"));

    }, [])

    useEffect(() => {
        meetingData && setmeetingStartTime(meetingData["meeting_start_time"]);
        setVideoElement(document.getElementById("video-component"));
    }, [meetingData])
    // style={{ "pointerEvents": "none" }}
    return (
        <>
            {meetingLoading && <h1>Loading</h1>}
            {meetingError && <p>{meetingError.data.msg}</p>}
            {meetingData &&
                <div style={{ textAlign: "center" }} className="boundary">
                    <h1 style={{ marginTop: "57px" }}>{meetingData && meetingData["meeting_name"]}</h1>
                    {meetingData && <VideoElement src_url={meetingData["meeting_url"]} />}
                    <button onClick={() => {
                        videoElement.currentTime = (new Date().getTime() - meetingStartTime) / 1000;
                        videoElement.play()
                        // console.log(meetingStartTime);

                    }} >UnPause</button>
                    <Description content={meetingData["meeting_description"]} />
                </div>
            }
        </>
    )
}

const Description = ({ content = "" }) => {
    return (
        <>
            {content !== "" &&
                <div className="description-card" >
                    <p>
                        {content}
                    </p>

                </div>
            }
        </>
    )
}

const VideoElement = ({ src_url, type = "video/mp4" }) => {
    return (
        <video width="320" height="240" id="video-component" controls onWaiting={() => { console.log("hey") }} onTimeUpdate={() => { }} autoPlay={true} >
            <source src={src_url} type={type} />
            <p>Something Went Wrong</p>
        </video>
    )
}

export default JoinPage;