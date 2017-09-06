import  React from 'react';
import PropTypes from 'prop-types';


class Alert extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // alertClass: ""
      alertClass : {display : "none"}
    };
    this.showNotification = this.showNotification.bind(this);
    this.hideNotification = this.hideNotification.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
  }


  componentWillUnmount() {
    this.props.onRef(undefined);
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  showNotification() {
    // this.setState({alertClass: "animated fadeOutUp"});
    this.setState({alertClass: {display : "block"}});
    this.timer = setTimeout(() => {
      this.hideNotification();
    }, 4000);
  }

  hideNotification(){
    clearTimeout(this.timer);
    // this.setState({alertClass: ""});
    this.setState({alertClass: {display : "none"}});
  }


  render() {
    return (
      <section className="alert-wrapper" style={this.state.alertClass}>
        <div className={"alert-box animated fadeOutUp"}>
          <div className="row">
            <div className="columns small-12">
              <span>{this.props.alert}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


Alert.PropTypes = {
  alert: PropTypes.string.isRequired,
  onRef : PropTypes.string,
};

export default Alert;
