import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Components/NavBar';
import useLocalStorage from './Hooks/useLocalStorage';
import Authentication from './Pages/authentication/authentication';
import JoinPage from './Pages/Join/join';
import "./Static/styles.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <NavBar />
          <div className="boundary"><h1>Hey</h1></div>
        </Route>
        <Route path="/jn/:meeting_id" exact >
          <NavBar />
          <JoinPage />
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
