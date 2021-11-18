import React, { useReducer, useContext, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import EditUserInformation from '../editUserInformation';
import UserInformationDisplay from '../userInformationDisplay';
import MeetingEdit from './meetingEdit';
import MeetingDisplay from './meetingsDisplay';
import MeetingView from './meetingView';

const SuperReducer = (state, action) => {

    switch (action.type) {
        case "SET-MEETING":
            return {
                ...state,
                ...action.payload,
                meeting_id: action.payload.meetingData["_id"]
            }
        default:
            throw new Error("Type Not Matched");
    }
}

export const SuperContext = createContext();

export default ({ match }) => {

    const defaultState = {
        meetingData: {},
        meeting_id: "",
    }
    const [superState, superDispatch] = useReducer(SuperReducer, defaultState)


    return (
        <SuperContext.Provider value={{ superState, superDispatch }} >
            <Router>
                <Switch>
                    <Route exact path={`${match.path}/h`}>
                        <MeetingDisplay />
                    </Route>
                    <Route path={`${match.path}/view`} >

                        <MeetingView />
                    </Route>
                    <Route path={`${match.path}/edit`}>
                        <MeetingEdit />

                    </Route>
                    <Route path={`${match.path}/user`} exact>
                        <UserInformationDisplay />
                    </Route>
                    <Route path={`${match.path}/new`}>
                        <MeetingEdit CreateMeeting={true} />
                    </Route>
                </Switch>

            </Router>
        </SuperContext.Provider>
    )
}