import  React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Header from './Header';
import Menu from './Menu';


import Home from './Home';
import About from './About';
import Season from './Season';
import Players from './Players';
import Bundle from './Bundle';

import playerList from '../data/playersList.json';
import players from '../data/players.json';

const playerGraphModeNames = ["Total Score", "Max Score", "Strike Rate", "Total 6s", "Total 4s", "Match Played", "Run When Non Striker", "Wickets", "Economy Rate", "Average Ball/Wicket"];

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="collapse expanded row">
            <div className="columns shrink hide-for-small-only">
              <Menu/>
            </div>
            <div className="columns ">
              <Header/>
              <Bundle objectsList={playerList} objects={players} graphModeNames={playerGraphModeNames}/>
              {/*<Route exact path="/" component={Home} />*/}
              {/*<Route path="/players" component={Players} />*/}
              {/*<Route path="/about" component={About} />*/}
              {/*<Route path="/season" component={Season} />*/}
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
