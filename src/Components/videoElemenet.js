import React from "react";
import useDimension from "../Hooks/useDimensions";

export default function VideoElement({ meeting_url, type = "video/mp4" }) {

    const dimensions = useDimension();

    return (
        <section className="video-component-block">
            <video style={{ pointerEvents: "none", maxHeight: 780 }} width={dimensions.width * 0.90} height="auto" id="video-component" muted="muted" onWaiting={() => { console.log("waiting") }} onTimeUpdate={() => { }} autoPlay={true} >
                <source src={meeting_url} type={type} />
                {/* <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" /> */}
                <p>Something Went Wrong</p>
            </video>
            <button id="fullscreen" onClick={() => {
                const videoElement = document.getElementById("video-component");

                if (videoElement.requestFullscreen) videoElement.requestFullscreen().then(lock());
                else if (videoElement.webkitRequestFullscreen) videoElement.webkitRequestFullscreen().then(lock());
                else if (videoElement.msRequestFullscreen) videoElement.msRequestFullscreen().then(lock());

                function lock() {
                    window.screen.orientation.lock("landscape").then().catch(
                        (err) => {
                            // console.log("Landscape is Not Supported on this device")
                        }
                    );
                }


            }} className="btn btn-primary">Full Screen</button>
        </section>
    )
}

export function EarlyStart({ text = "Meeting Yet to Start" }) {

    const dimension = useDimension();

    return (
        <>
            <div
                style={{
                    width: dimension.width * 0.90,
                    height: "auto",
                    border: "0.8px solid #ccc",
                    background: "#fff",
                    textAlign: "center",
                    margin: "auto",
                    paddingTop: "2rem",
                    paddingBottom: "2rem",
                    borderRadius: "16px"
                }}
            >
                <h1 style={{
                    fontSize: "72px",
                    marginBottom: "2rem"
                }}>👋🏻</h1>
                <p style={{
                    fontSize: "22px",
                    color: "#5c5c5c"
                }}>{text}</p>
            </div>
        </>
    )
}
