import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import JoinPage from './Pages/Join/join';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div><h1>Hey</h1></div>
        </Route>
        <Route path="/jn/:meeting_id" exact component={JoinPage} />
      </Switch>
    </Router>
  );
}

export default App;
