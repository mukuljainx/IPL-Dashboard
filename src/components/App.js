import  React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Header from './Header';
import Menu from './Menu';


import Home from './Home';
import About from './About';
import Players from './Players';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/demo/ipl-dashboard">
        <div className="collapse expanded row app-wrapper">
          <div className="columns shrink hide-for-small-only">
            <Menu/>
          </div>
          <div className="columns ">
            <Header/>
            <Route exact path="/" component={Home}/>
            <Route path="/players" component={Players}/>
            <Route path="/about" component={About}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
