import  React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mobileMenuClass: "",
    };

    this.showMobileMenu = this.showMobileMenu.bind(this);
    this.hideMobileMenu = this.hideMobileMenu.bind(this);
  }

  showMobileMenu() {
    this.setState({mobileMenuClass: "in-out-animations"});
  }

  hideMobileMenu() {
    this.setState({mobileMenuClass: ""});
  }


  render() {
    return (
      <div className="row align-middle expanded nav-wrapper">
        <div className="columns">
          <h2 className="align-left">{this.props.heading}</h2>
        </div>
        <div className="columns text-right show-for-small-only">
          <img onClick={this.showMobileMenu} src={require("../media/humburger.svg")}/>
        </div>

        <div className={"row expanded collapse menu-mobile-wrapper menu-wrapper show-for-small-only " + this.state.mobileMenuClass}>
          <div className="columns medium-12">
            <div className="row align-middle logo">
              <div className="columns text-right">
                <h2 onClick={this.hideMobileMenu}>Menu <img src={require("../media/humburger.svg")}/></h2>
              </div>
            </div>
            <ul className="vertical menu text-right">
              <li className="active"><Link to="/"><h3>Home</h3></Link></li>
              <li><Link to="/players"><h3>Players</h3></Link></li>
              <li><Link to="/about"><h3>About IPL</h3></Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}



export default Header;
