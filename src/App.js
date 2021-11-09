import React, { useEffect, useContext } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Components/NavBar';
import useLocalStorage from './Hooks/useLocalStorage';
import Authentication from './Pages/authentication/authentication';
import JoinPage from './Pages/Join/join';
import "./Static/CSS/styles.css";

import DashboardHome from './Pages/dashboard/dashboardHome';
import EnterCode from './Pages/authentication/enterCode';
import LeavePage from './Pages/Join/Leave';
import HomePage from './Pages/home';
import useModal, { Modal, ModalBlock } from './Hooks/showModal/useShowModal';

function App() {
  const { state: modalState, dispatch: modalDispatch } = useModal()
  useEffect(() => {
    console.log(modalState.showModal)
  })

  useEffect(() => {
    modalDispatch({
      type: "SHOW_MODAL", payload: {
        id: new Date().toString(),
        title: "Authentication Error",
        msg: "Email Incorrect",
        status: "warning",
        pop: false,
      }
    })
  }, [])
  return (
    <Router>
      <NavBar />
      <ModalBlock modalState={modalState} modalDispatch={modalDispatch} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/jn/:meeting_id" exact >
          <JoinPage />
        </Route>
        <Route path='/exit'>
          <LeavePage />
        </Route>
        <Route path="/d" component={DashboardHome} />
        <Route path="/confirmation">
          <EnterCode />

        </Route>
        <Route path="/signup">
          <Authentication title="SignUp" description="Accompany Audience even while away" apiEndpoint="signup" inputs={
            {
              "Email": {
                type: "text",
                name: "email",
                localValue: [useLocalStorage, "email", ""],
              },
              "Password": {
                type: "password",
                name: "password",
              },
              "Confirm Password": {
                type: "password",
                name: "confirmPassword",
              }
            }
          }
          />
        </Route>
        <Route path="/login">
          <Authentication title="Login" description="Participants have been waiting for you" apiEndpoint="login" inputs={
            {
              "Email": {
                name: "email",
                localValue: [useLocalStorage, "email", ""],
              },
              "Password": {
                name: "password",
                type: "password"
              }
            }
          } />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
