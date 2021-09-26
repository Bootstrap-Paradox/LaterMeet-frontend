import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BottomBar from '../../Components/bottomBar';
import NavBar from '../../Components/NavBar';
import MeetingDisplay from './meetingsDisplay';

export default ({ match }) => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path={`${match.path}/h`}>
                        <NavBar />
                        <MeetingDisplay />
                        <BottomBar />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}