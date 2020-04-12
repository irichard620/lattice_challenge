import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home'
import MovieDetail from "./MovieDetail";
import './App.css';
import CastDetail from "./CastDetail";

function App() {
  return (
    <Router>
      <div>
        <nav style={styles.navOutline}>
          <label>Ian's Movie Database API</label>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/cast/:castId">
            <CastDetail />
          </Route>
          <Route path="/:movieId">
            <MovieDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const styles = {
  navOutline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    backgroundColor: '#6d8cc9',
    marginBottom: 16,
  }
};

export default App;
