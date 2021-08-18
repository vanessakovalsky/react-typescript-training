import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Home }   from './pages/home'
import { AddGame }  from './pages/addGame';
import { ListGame } from './pages/listGame';
import { ShowGame } from './pages/showGame';
import { AppProvider } from './context';

const App = () =>  {
  return (
    <div className="App">
      <AppProvider>
        <Router>
            <nav>
              <Link to="/home">Home</Link>
              <Link to="/addGame">Add Game</Link>
              <Link to="/listGame">List Games</Link>
            </nav>
            <Route path="/home" component={Home} />
            <Route path="/addGame" component={AddGame} />
            <Route path="/listGame" component={ListGame} />
            <Route path="/game/:id" component={ShowGame} />
        </Router>
     </AppProvider>
    </div>
  );
}

export default App;