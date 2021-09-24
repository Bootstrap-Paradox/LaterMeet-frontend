import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useLocalStorage from '../../Hooks/useLocalStorage';

import useFetch from '../../Hooks/useFetch';
import BottomBar from '../../Components/bottomBar';


const JoinPage = () => {

    const [videoElement, setVideoElement] = useState(null);
    const [meetingStartTime, setmeetingStartTime] = useLocalStorage("x12", new Date().getTime()); // Time will be locally stored to provide a better Live Experience

    const { meeting_id } = useParams();
    const { data: meetingData, loading: meetingLoading, error: meetingError } = useFetch({ url: `http://0.0.0.0:8001/meetings/join/${meeting_id}` })

    const [inter, setInter] = useState(true);

    var checkLoop = meetingData && videoElement && setInterval(() => {
        if (meetingData && videoElement) {
            if (videoElement.currentTime >= videoElement.duration) {
                clearInterval(checkLoop)
            }
            if (videoElement && videoElement.currentTime <= videoElement.duration) {
                let currentTime = new Date().getTime()
                let currentDiff = (currentTime - meetingStartTime) / 1000;
                if (currentDiff < 0) {
                    videoElement.pause()
                    // TODO: Actions
                }
                else if (videoElement.paused) {
                    videoElement.play()
                }
                // if (meetingStartTime + (videoElement.duration * 1000) <= new Date().getTime()) {
                //     // The Meeting Has Ended
                //     if (videoElement) videoElement.pause();

                // }

                if ((videoElement.currentTime > (currentDiff + 10) || videoElement.currentTime < (currentDiff - 10)) && videoElement.currentTime < videoElement.duration) {
                    videoElement.currentTime = currentDiff;
                    videoElement.play()
                }

            }

        }
    }, 1 * 1000)

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
                    <VideoElement src_url={meetingData["meeting_url"]} />
                    <Description content={meetingData["meeting_description"]} />
                </div>
            }
            <BottomBar data={<JoinAudio videoElement={videoElement} />} />
        </>
    )
}

const JoinAudio = (props) => {
    return (
        <button className="btn btn-primary right" onClick={() => {
            props.videoElement.muted = false
        }} >Join Audio</button>
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
        <video width="320" height="auto" id="video-component" controls muted="muted" onWaiting={() => { console.log("hey") }} onTimeUpdate={() => { }} autoPlay={true} >
            <source src={src_url} type={type} />
            <p>Something Went Wrong</p>
        </video>
    )
}

export default JoinPage;