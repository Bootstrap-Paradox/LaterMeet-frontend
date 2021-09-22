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
                    <h1>{meetingData && meetingData["meeting_name"]}</h1>
                    <p>{meetingData && meetingData["meeting_description"]}</p>
                    {meetingData &&
                        <video width="320" height="240" id="video-component" controls autoPlay={true}>
                            <source src={meetingData["meeting_url"]} type="video/mp4" />
                            <p>Video Not Supported</p>
                        </video>

                    }
                    <button onClick={() => {
                        videoElement.currentTime = (new Date().getTime() - meetingStartTime) / 1000;
                        videoElement.play()
                        console.log(meetingStartTime);
                        console.log("Js time below");

                        console.log(new Date().getTime());

                    }} >UnPause</button>
                </div>
            }
        </>
    )
}

export default JoinPage;