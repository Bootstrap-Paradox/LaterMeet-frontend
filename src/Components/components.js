import React, { useEffect, useState } from 'react';


const InlineBlock = (props) => {
    return (
        <div className="box block">
            <h4 className="faded">{props.placeholder}</h4>
            <h4>{props.value}</h4>
        </div>
    )
}

const TimingComponent = ({ setMeetingInfo, meetingInfo }) => {

    const currentTime = new Date()
    const currentStartTime = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate() !== 0 ? currentTime.getDate() <= 9 ? `0${currentTime.getDate()}` : currentTime.getDate() : "01"}T00:00`
    const initialExpiryTime = new Date(currentTime.getTime() + 60 * 24 * 30 * 60000)
    const endTime = `${initialExpiryTime.getFullYear()}-${initialExpiryTime.getMonth() + 1}-${initialExpiryTime.getDate() !== 0 ? initialExpiryTime.getDate() <= 9 ? `0${initialExpiryTime.getDate()}` : initialExpiryTime.getDate() : "01"}`

    const [timing, setTiming] = useState({
        start_time: convertToValue(meetingInfo["meeting_timings"]["start_time"]),
        end_date: convertToValue(meetingInfo["meeting_timings"]["end_date"])
    });
    useEffect(() => {
        console.log("What is the Timing")
        console.log(timing)
    })

    // Start Date
    // Start Time
    // End Date
    // Pre-Set values for timing

    useEffect(() => {
        setMeetingInfo({
            ...meetingInfo,
            meeting_timings: {
                start_time: parseTime({ toParse: timing["start_time"] }),
                end_date: parseTime({ toParse: timing["end_date"] })
            }
        })

    }, [timing])


    return (
        <>
            <div>
                <input name="startTime" onChange={(e) => {
                    setTiming({
                        ...timing,
                        start_time: e.target.value
                    })
                    // const pat = /[-:]/g
                    // console.log(pat.test("hithere"))
                }} type="datetime-local" value={timing["start_time"]} />
                <input onChange={(e) => {
                    setTiming({
                        ...timing,
                        end_date: e.target.value
                    })

                }} type="date" value={timing["end_date"]} />
            </div>
        </>
    )
}

function safe(data) {
    return data < 10 ? `0${data}` : data
}

function convertToValue(meta_data) {
    if (Object.keys(meta_data).length > 4 && meta_data["hour"]) {
        return `${safe(meta_data["year"])}-${meta_data["month"]}-${safe(meta_data["day"])}T${safe(meta_data["hour"])}:${safe(meta_data["minute"])}`

    } else {
        return `${safe(meta_data["year"])}-${meta_data["month"] == 0 ? "01" : safe(meta_data["month"])}-${safe(meta_data["day"])}`


    }
}

function parseTime({ toParse = "" }) {

    let data = {
        year: undefined,
        month: undefined,
        day: undefined,
        hour: undefined,
        minute: undefined,
    };
    function addElement(iterateOver) {
        Object.keys(data).map((key, index) => {
            data[key] = parseInt(iterateOver[index])
        })
    }

    function convertToUTC(StringConvergent) {

        console.log("String Convergent")
        let currentUTC;
        if (StringConvergent.length > 4) {

            currentUTC = new Date(
                StringConvergent[0],
                StringConvergent[1],
                StringConvergent[2],
                StringConvergent[3],
                StringConvergent[4],
            )
        } else {
            currentUTC = new Date(
                StringConvergent[0],
                StringConvergent[1],
                StringConvergent[2],
            )

        }
        console.log(currentUTC)

        const newUTCTime = StringConvergent.length > 4 ? `${currentUTC.getUTCFullYear()}-${currentUTC.getUTCMonth()}-${currentUTC.getUTCDate() !== 0 ? currentUTC.getUTCDate() <= 9 ? `0${currentUTC.getUTCDate()}` : currentUTC.getUTCDate() : "01"}T${currentUTC.getUTCHours() <= 9 ? `0${currentUTC.getUTCHours()}` : currentUTC.getUTCHours()}:${currentUTC.getUTCMinutes <= 9 ? `0${currentUTC.getUTCMinutes()}` : currentUTC.getUTCMinutes()}` : `${currentUTC.getUTCFullYear()}-${currentUTC.getUTCMonth()}-${currentUTC.getUTCDate() !== 0 ? currentUTC.getUTCDate() <= 9 ? `0${currentUTC.getUTCDate()}` : currentUTC.getUTCDate() : "01"}`

        return regex(newUTCTime)

    }

    function regex(toParse) {
        if (/[-T:]/g.test(toParse)) {
            return toParse.split(/[-T:]/)
        }
        else if (/:/g.test(toParse)) {
            return toParse.split(/[:]/)
        }
        else {
            return toParse.split(/[-]/)
        }
    }

    addElement(convertToUTC(regex(toParse)))

    return data
}

export { InlineBlock, TimingComponent };