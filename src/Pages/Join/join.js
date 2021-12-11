import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import useLocalStorage from '../../Hooks/useLocalStorage';

import useFetch from '../../Hooks/useFetch';
import BottomBar from '../../Components/bottomBar';
import { baseURL } from '../../url';
import useDimension from '../../Hooks/useDimensions';
import VideoElement, { EarlyStart } from '../../Components/videoElemenet';
import Loaders from '../../Components/loader';


const JoinPage = () => {

    const [videoElement, setVideoElement] = useState(null);
    const [meetingStartTime, setmeetingStartTime] = useLocalStorage("x12", new Date().getTime()); // Time will be locally stored to provide a better Live Experience

    const { meeting_id } = useParams();
    const { data: meetingData, loading: meetingLoading, error: meetingError } = useFetch({ url: `${baseURL}/meetings/join/${meeting_id}` })



    const [isLive, setIsLive] = useState({
        message: "Meeting Yet to Start",
        show: false,
        toStart: true,
    });

    var checkLoop = isLive.toStart && meetingData && videoElement && setInterval(() => {
        if (meetingData && videoElement) {
            if (videoElement.currentTime >= videoElement.duration) {
                // console.log("is this being triggred")
                clearInterval(checkLoop)
            }
            if (videoElement && videoElement.currentTime <= videoElement.duration) {
                // console.log("does this run then")
                let currentTime = new Date().getTime()
                let currentDiff = (currentTime - meetingStartTime) / 1000;

                // console.log(currentDiff)
                if (currentDiff < 0) {
                    videoElement.pause()
                    // TODO: Actions
                }
                else if (videoElement.paused) {
                    videoElement.play()
                }
                else if ((videoElement.currentTime > (currentDiff + 10) || videoElement.currentTime < (currentDiff - 10)) && videoElement.currentTime < videoElement.duration) {
                    setIsLive({
                        ...isLive,
                        message: "",
                        show: false,
                    })
                    videoElement.currentTime = currentDiff;
                    videoElement.play()
                }

                if (meetingStartTime > new Date().getTime()) {
                    // Meeting Yet To Start
                    setIsLive({
                        ...isLive,
                        message: "Meeting Yet To Start",
                        show: true,
                        toStart: false,
                    })
                    // console.log("Now the meeting is yet to start")
                    // console.log(meetingStartTime - new Date().getTime())
                    const meetingDifference = (meetingStartTime - new Date().getTime()) - 1000 * 60
                    setTimeout(() => {
                        setIsLive({
                            show: false,
                            toStart: true,
                        })
                    }, meetingDifference)
                    clearInterval(checkLoop)
                }

                if (meetingStartTime + (videoElement.duration * 1000) <= new Date().getTime()) {
                    // The Meeting Has Ended
                    clearInterval(checkLoop);
                    setIsLive({
                        ...isLive,
                        message: "Meeting Ended",
                        show: true,
                        toStart: false,
                    })
                    if (videoElement) videoElement.pause();

                }


            }

        }
    }, 1 * 1000)

    useEffect(() => {
        setVideoElement(document.getElementById("video-component"));

    }, [])

    useEffect(() => {
        // meetingData && console.log(meetingData["meeting_start_time"])
        meetingData && setmeetingStartTime(meetingData["meeting_start_time"]);
        setVideoElement(document.getElementById("video-component"));
    }, [meetingData])
    // style={{ "pointerEvents": "none" }}
    useEffect(() => {

    })
    return (
        <>
            {meetingLoading && <Loaders />}
            {meetingError && <p>{meetingError}</p>}
            {meetingData &&
                <div style={{ textAlign: "center" }} className="boundary">
                    <h1 style={{ marginTop: "57px" }}>{meetingData && meetingData["meeting_name"]}</h1>
                    {isLive.show && <EarlyStart text={isLive.message} />}
                    {isLive.show || <VideoElement meeting_url={meetingData["meeting_url"]} />}
                    <Description content={meetingData["meeting_description"]} />
                </div>
            }
            <BottomBar data={<JoinAudio videoElement={videoElement} />} />
        </>
    )
}

const JoinAudio = (props) => {

    const history = useHistory();

    return (
        <>
            <button className="btn btn-primary right" onClick={() => {
                props.videoElement.muted = false
            }} >Join Audio</button>

            <button onClick={() => { setTimeout(() => { window.location.href = "/exit" }, [300]) }} className="btn btn-secondary btn-long left">Leave</button>
        </>

    )
}

const Description = ({ content = "" }) => {
    return (
        <>
            {content !== "" &&
                <div className="description-card" >
                    <h2 className="title">Description</h2>
                    <p>
                        {content}
                    </p>

                </div>
            }
        </>
    )
}



export default JoinPage;