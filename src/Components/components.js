import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';


const InlineBlock = (props) => {
    return (
        <div className="box block">
            <h4 className="faded">{props.placeholder}</h4>
            <h4>{props.value}</h4>
        </div>
    )
}

const NewTimingComponent = ({ setMeetingInfo, meetingInfo }) => {

    const [timing, setTiming] = useState();
    const [finalTiming, setFinalTiming] = useState();


}

function conversion({ toConvert = new Date(), time = false, utc = false }) {
    console.log("What to convert")
    console.log(toConvert)
    if (utc) {

        if (time) {
            return toConvert.toISOString().split(":").splice(0, 2).join(":");

        } else {
            return toConvert.toISOString().split("T")[0];

        }

    } else {

        const fetchDate = () => toConvert.toLocaleDateString().split("/").reverse().join("-");

        if (time) {
            return `${fetchDate()}T${toConvert.toLocaleTimeString().split(":").splice(0, 2).join(":")}`;
        } else {
            return fetchDate();
        }
    }
}

class Timing {
    constructor({ date = new Date(), meta_data = null }) {

        if (meta_data && (meta_data["start_time"]["year"] !== null)) {
            this.timing = {
                start_time: this.fromMetaData(meta_data["start_time"]),
                end_date: this.fromMetaData(meta_data["end_date"])
            }
        } else {
            const currentTime = new Date()
            // const currentStartTime = `${currentTime.getFullYear()}-${safe(currentTime.getMonth() + 1)}-${currentTime.getDate() !== 0 ? currentTime.getDate() <= 9 ? `0${currentTime.getDate()}` : currentTime.getDate() : "01"}T00:00`
            const initialExpiryTime = new Date(currentTime.getTime() * 60000)
            // const endTime = `${initialExpiryTime.getFullYear()}-${initialExpiryTime.getMonth() + 1}-${initialExpiryTime.getDate() !== 0 ? initialExpiryTime.getDate() <= 9 ? `0${initialExpiryTime.getDate()}` : initialExpiryTime.getDate() : "01"}`
            this.timing = {
                start_time: currentTime,
                endTime: initialExpiryTime,
            }
        }

        this.date = date;
    }

    toLocaleDateString() {
        return conversion({ toConvert: this.date })
    }

    toLocaleTimeString() {
        return conversion({ toConvert: this.date, time: true })
    }

    toUTCDateString() {
        return conversion({ toConvert: this.date, utc: true })
    }

    toUTCTimeString() {
        return conversion({ toConvert: this.date, time: true, utc: true })
    }

    toTimingString() {
        return {
            start_time: conversion({ toConvert: this.timing["start_time"], time: true }),
            end_date: conversion({ toConvert: this.timing["end_date"] }),
        }
    }

    toTimingLocalString() {
        // console.log(this.timing["start_time"])
    }

    toUTCTimingString() {
        return {
            start_time: conversion({ toConvert: this.timing["start_time"], time: true, utc: true }),
            end_date: conversion({ toConvert: this.timing["end_date"], utc: true }),
        }
    }
    // Production Data to be updated in the database

    // productionReady(){

    //     let data = {
    //         year: undefined,
    //         month: undefined,
    //         day: undefined,
    //         hour: undefined,
    //         minute: undefined,
    //     }


    // }

    // conversion from Stored Meta_data to Date object
    fromMetaData(meta_data) {

        function safe(data) {
            return data < 10 ? `0${data}` : data.toString();
        }

        if (Object.keys(meta_data).length > 4 && meta_data["hour"]) {
            // console.log("What is the hour")
            // console.log(meta_data["hour"])
            return new Date(Date.UTC(
                meta_data["year"].toString(),
                safe(meta_data["month"] - 1),
                safe(meta_data["day"]),
                safe(meta_data["hour"]),
                safe(meta_data["minute"])
            ))
        } else {
            return new Date(Date.UTC(
                meta_data["year"].toString(),
                safe(meta_data["month"] - 1),
                safe(meta_data["day"]),
            ))

        }
    }
}

const TimingComponent = ({ setMeetingInfo, meetingInfo }) => {

    const history = useHistory()
    // const currentTime = new Date()
    // const currentStartTime = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate() !== 0 ? currentTime.getDate() <= 9 ? `0${currentTime.getDate()}` : currentTime.getDate() : "01"}T00:00`
    // const initialExpiryTime = new Date(currentTime.getTime() + 60 * 24 * 30 * 60000)
    // const endTime = `${initialExpiryTime.getFullYear()}-${initialExpiryTime.getMonth() + 1}-${initialExpiryTime.getDate() !== 0 ? initialExpiryTime.getDate() <= 9 ? `0${initialExpiryTime.getDate()}` : initialExpiryTime.getDate() : "01"}`

    if (!meetingInfo) {
        meetingInfo = { "meeting_timings": [] }
    }

    const [timing, setTiming] = useState({
        start_time: "",
        end_date: ""
    });

    const [schedule, setSchedule] = useState(meetingInfo["meeting_timings"].hasOwnProperty('schedule') ? meetingInfo["meeting_timings"]["schedule"] : false);
    useEffect(() => {
        // console.log("What is the Timing")
        // console.log(timing)
        // console.log(conversion({ toConvert: new Date(), time: true }));
        const fetchedTiming = new Timing({ meta_data: meetingInfo["meeting_timings"] })

        setTiming({
            start_time: fetchedTiming.toTimingString()["start_time"],
            end_date: fetchedTiming.toTimingString()["end_date"]
        })
    }, [])

    // Start Date
    // Start Time
    // End Date
    // Pre-Set values for timing

    useEffect(() => {
        console.log(meetingInfo["meeting_timings"])
        console.log(schedule)

    })

    useEffect(() => {
        setMeetingInfo({
            ...meetingInfo,
            meeting_timings: {
                start_time: parseTime({ toParse: timing["start_time"] }),
                end_date: parseTime({ toParse: timing["end_date"] }),
                schedule: schedule,
            }
        })
        // console.log(parseTime({ toParse: timing["start_time"] }))

    }, [timing, schedule])

    return (
        <>
            <div>
                <div>
                    <label htmlFor="schedule">Schedule</label>
                    <input type="checkbox" onChange={() => {
                        setSchedule((prevState) => !prevState)
                    }} checked={schedule} />
                </div>
                {schedule &&
                    <>
                        <input className="box" name="startTime" onChange={(e) => {
                            // console.log(e.target.value)
                            setTiming({
                                ...timing,
                                start_time: e.target.value
                            })
                            // const pat = /[-:]/g
                            // console.log(pat.test("hithere"))
                        }} type="datetime-local" value={timing["start_time"]} />
                        <input className="box" onChange={(e) => {
                            console.log(e.target.value)
                            setTiming({
                                ...timing,
                                end_date: e.target.value
                            })

                        }} type="date" value={timing["end_date"]} />
                    </>
                }

            </div>
        </>
    )
}

function safe(data) {
    return data < 10 ? `0${data}` : data
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

        // console.log("String Convergent")
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
        console.log(currentUTC.getMonth() + 1)

        const newUTCTime = StringConvergent.length > 4 ? `${currentUTC.getMonth() == 0 ? currentUTC.getUTCFullYear() - 1 : currentUTC.getUTCFullYear()}-${currentUTC.getUTCMonth() == 0 ? 12 : currentUTC.getUTCMonth()}-${currentUTC.getUTCDate() !== 0 ? currentUTC.getUTCDate() <= 9 ? `0${currentUTC.getUTCDate()}` : currentUTC.getUTCDate() : "01"}T${currentUTC.getUTCHours() <= 9 ? `0${currentUTC.getUTCHours()}` : currentUTC.getUTCHours()}:${currentUTC.getUTCMinutes <= 9 ? `0${currentUTC.getUTCMinutes()}` : currentUTC.getUTCMinutes()}` : `${currentUTC.getMonth() == 0 ? currentUTC.getUTCFullYear() - 1 : currentUTC.getUTCFullYear()}-${currentUTC.getUTCMonth() == 0 ? 12 : currentUTC.getUTCMonth()}-${currentUTC.getUTCDate() !== 0 ? currentUTC.getUTCDate() <= 9 ? `0${currentUTC.getUTCDate()}` : currentUTC.getUTCDate() : "01"}`

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