import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Components/NavBar';
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
      </Switch>
    </Router>
  );
}

export default App;
