import  React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Header from './Header';
import Menu from './Menu';


import Home from './Home';
import About from './About';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="collapse expanded row">
            <div className="columns shrink">
              <Menu/>
            </div>
            <div className="columns ">
              <Header/>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
