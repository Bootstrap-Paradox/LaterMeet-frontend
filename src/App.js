import React, { useEffect, useContext, createContext } from 'react';
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
import useModal, { ModalBlock } from './Hooks/showModal/useShowModal 2';
import { ConfirmationModal } from './Components/confirmationModal/confirmationModal';
import useConfirmModal from './Components/confirmationModal/confirmationModal';


const ModalContext = createContext();


function App() {
  const { state: modalState, dispatch: modalDispatch } = useModal();
  const { confirmModalState, confirmModalDispatch } = useConfirmModal();

  return (
    <ModalContext.Provider value={{ modalState, modalDispatch, confirmModalState, confirmModalDispatch }}>

      <Router>
        <NavBar />
        <ModalBlock modalState={modalState} modalDispatch={modalDispatch} />
        {confirmModalState.showConfirmModal && <ConfirmationModal title={confirmModalState.title} description={confirmModalState.description} Action={
          {
            cancel: () => { confirmModalDispatch({ type: "EXIT" }) },
            confirm: confirmModalState.confirm
          }
        } />}
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
    </ModalContext.Provider>
  );
}

export default App;
export { ModalContext };
