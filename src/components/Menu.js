import  React from 'react';
import {Link} from 'react-router-dom';


const Menu = () => {
  return (
    <section className="row expanded collapse menu-wrapper">
      <div className="columns medium-12">
        <div className="row align-middle logo">
          <div className="columns">
            <h3><img src={require("../media/humburger.svg")}/> Menu</h3>
          </div>
        </div>
        <ul className="vertical menu">
          <li className="active"><Link to="/"><h3>Home</h3></Link></li>
          <li><Link to="/season/2008"><h3>Seasons</h3></Link></li>
          <li><Link to="/players"><h3>Players</h3></Link></li>
          <li><Link to="/"><h3>Story So Far</h3></Link></li>
          <li><Link to="/about"><h3>About IPL</h3></Link></li>
        </ul>
      </div>
    </section>
  );
};

export default Menu;
